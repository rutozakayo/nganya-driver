"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { registerDriverAction, type DriverRegisterState } from "./actions";

const initial: DriverRegisterState = {};

export function DriverRegisterForm() {
  const [state, action, pending] = useActionState(registerDriverAction, initial);

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">First name</label>
          <Input id="firstName" name="firstName" placeholder="Peter" required
            className="border-border/50 bg-background/50" />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">Last name</label>
          <Input id="lastName" name="lastName" placeholder="Otieno" required
            className="border-border/50 bg-background/50" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">Phone number</label>
        <Input id="phone" name="phone" placeholder="+254 7XX XXX XXX" autoComplete="tel" required
          className="border-border/50 bg-background/50" />
      </div>
      <div className="space-y-2">
        <label htmlFor="licenseNumber" className="text-sm font-medium">Driving licence number</label>
        <Input id="licenseNumber" name="licenseNumber" placeholder="DL-XXXXXXXX" required
          className="border-border/50 bg-background/50" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input id="email" name="email" type="email" placeholder="driver@example.com" autoComplete="email" required
          className="border-border/50 bg-background/50" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <Input id="password" name="password" type="password" placeholder="At least 8 characters"
          autoComplete="new-password" required className="border-border/50 bg-background/50" />
      </div>

      {state.error && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        New driver accounts start as <strong>Pending Verification</strong>. You can sign in immediately,
        but you will not receive hire assignments until an administrator approves your licence and
        identity documents.
      </p>

      <Button type="submit" disabled={pending} className="h-12 w-full bg-primary font-bold text-primary-foreground">
        {pending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account…</>) : "Apply as a driver"}
      </Button>
    </form>
  );
}
