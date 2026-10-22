import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PostLoginPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const role = (session.user as { role?: string }).role;
  redirect(role === "admin" ? "/admin" : "/driver");
}
