import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { DriverRegisterForm } from "./register-form";

export const metadata = { title: "Driver Application | NGANYA HIRE" };

export default function DriverRegisterPage() {
  return (
    <div className="container mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-2 md:items-start">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Drive for NGANYA HIRE</h1>
        <p className="mt-4 text-muted-foreground">
          Get assigned to premium nganyas, confirm the dates you can work, and see every hire detail
          before you accept.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          <li>• You control your calendar — block any date you are not free.</li>
          <li>• You are notified the moment a customer requests your vehicle.</li>
          <li>• Verification is required before your first assignment.</li>
        </ul>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Driver application</CardTitle>
          <CardDescription>Step 1 of 2 — basic details. Documents are uploaded after approval.</CardDescription>
        </CardHeader>
        <CardContent>
          <DriverRegisterForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already applied?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">Log in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
