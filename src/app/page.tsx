import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CalendarCheck, Wallet, Smartphone } from "lucide-react";

export default function DriverLanding() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
      <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary">DRIVER PORTAL</Badge>
      <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
        Drive the city&apos;s <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">best nganyas</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        Confirm the dates you can work, see every hire detail before you accept, and never get
        double-booked. Verification takes one review by our team.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/driver/register" className={buttonVariants({ className: "h-12 bg-primary px-7 font-bold text-primary-foreground" })}>
          Apply as a driver
        </Link>
        <Link href="/login" className={buttonVariants({ variant: "outline", className: "h-12 px-7 font-bold" })}>
          Driver login
        </Link>
      </div>

      <div className="mt-16 grid gap-6 text-left sm:grid-cols-3">
        {[
          { icon: ShieldCheck, t: "Verified identity", d: "Licence and ID checked once, then you're cleared for assignments." },
          { icon: CalendarCheck, t: "You control dates", d: "Block any day you're unavailable — the calendar respects it." },
          { icon: Wallet, t: "Clear hire details", d: "See the venue, times and passenger count before confirming." },
        ].map((f) => (
          <div key={f.t} className="rounded-xl border border-border/50 bg-card/30 p-6">
            <f.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-bold">{f.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <Smartphone className="h-4 w-4" /> Install this portal to your home screen for instant job alerts.
      </p>
    </div>
  );
}
