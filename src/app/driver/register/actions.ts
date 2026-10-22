"use server";

import { db } from "@/db";
import { users, driverProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const schema = z.object({
  firstName: z.string().trim().min(2, "Enter your first name."),
  lastName: z.string().trim().min(2, "Enter your last name."),
  phone: z.string().trim().min(9, "Enter a valid phone number."),
  licenseNumber: z.string().trim().min(4, "Enter your driving licence number."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});

export type DriverRegisterState = { error?: string };

export async function registerDriverAction(
  _prev: DriverRegisterState,
  formData: FormData
): Promise<DriverRegisterState> {
  const parsed = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    licenseNumber: formData.get("licenseNumber"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details and try again." };
  }

  const { firstName, lastName, phone, licenseNumber, email, password } = parsed.data;

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) return { error: "An account with this email already exists. Try signing in." };

  const hashed = await bcrypt.hash(password, 10);

  try {
    const [user] = await db
      .insert(users)
      .values({ name: `${firstName} ${lastName}`, email, password: hashed, role: "driver" })
      .returning();

    // New drivers start unverified; an administrator must approve the application.
    await db.insert(driverProfiles).values({
      userId: user.id,
      licenseNumber,
      verificationStatus: "pending",
    });
  } catch (error) {
    console.error("driver register failed", error);
    return { error: "We could not create your driver account. Please try again." };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/post-login" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but sign-in failed. Please log in manually." };
    }
    throw error;
  }

  return {};
}
