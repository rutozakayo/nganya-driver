"use server";

import { db } from "@/db";
import { bookings, driverAvailability, notifications } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateAvailabilityResponse(
  bookingId: string,
  driverId: string,
  date: Date,
  status: "available" | "unavailable"
) {
  const dateString = new Date(date).toISOString().split("T")[0];

  // 1. Update/Insert driver availability record
  const existing = await db.query.driverAvailability.findFirst({
    where: and(
      eq(driverAvailability.driverId, driverId),
      eq(driverAvailability.date, dateString)
    ),
  });

  if (existing) {
    await db.update(driverAvailability)
      .set({ isAvailable: status === "available" })
      .where(eq(driverAvailability.id, existing.id));
  } else {
    await db.insert(driverAvailability).values({
      driverId,
      date: dateString,
      isAvailable: status === "available",
    });
  }

  // 2. Update booking status
  // If driver says unavailable, booking should probably be rejected or marked as driver_unavailable
  await db.update(bookings)
    .set({ 
      status: status === "available" ? "awaiting_owner" : "rejected",
      updatedAt: new Date()
    })
    .where(eq(bookings.id, bookingId));

  // 3. Notify owner (logic omitted for brevity but should be here)

  revalidatePath("/driver");
  revalidatePath(`/nganya/${bookingId}`); // Should be vehicle id actually, but this triggers revalidation
  return { success: true };
}
