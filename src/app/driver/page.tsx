export const dynamic = "force-dynamic";

import { db } from "@/db";
import { auth } from "@/auth";
import { bookings, driverProfiles, vehicles, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { DriverResponseActions } from "./driver-response-actions";

export default async function DriverDashboard() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const driverProfile = await db.query.driverProfiles.findFirst({
    where: eq(driverProfiles.userId, session.user.id),
  });

  if (!driverProfile) {
    return (
      <div className="container mx-auto p-12 text-center">
        <h1 className="text-2xl font-bold">Driver profile not found.</h1>
        <p className="text-muted-foreground">Please register as a driver first.</p>
      </div>
    );
  }

  const driverBookings = await db.query.bookings.findMany({
    where: eq(bookings.driverId, driverProfile.id),
    orderBy: [desc(bookings.createdAt)],
    with: {
      vehicle: true,
      customer: {
        with: {
          user: true
        }
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Driver Portal</h1>
        <p className="text-muted-foreground">Manage your availability and booking requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Statistics or Status */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle>Your Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Verification</span>
                <Badge variant={driverProfile.verificationStatus === "verified" ? "default" : "outline"} className="bg-green-500/20 text-green-500 border-green-500/50">
                  {driverProfile.verificationStatus.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Bookings</span>
                <span className="font-bold">{driverBookings.filter(b => b.status === "approved").length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Requests */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Booking Requests</h2>
          {driverBookings.length === 0 ? (
            <p className="text-muted-foreground">No booking requests yet.</p>
          ) : (
            <div className="space-y-4">
              {driverBookings.map((booking) => (
                <Card key={booking.id} className="border-border/50 bg-card/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold">{(booking as any).vehicle?.name ?? "Nganya"}</h3>
                          <Badge className="bg-primary/20 text-primary border-primary/50">{booking.status.toUpperCase()}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4 text-primary" />
                            {format(new Date(booking.startDate), "PPP")}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4 text-primary" />
                            Full Day Hire
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4 text-primary" />
                            {booking.pickupLocation}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <User className="mr-2 h-4 w-4 text-primary" />
                            {(booking as any).customer?.user?.name ?? "Customer"}
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                          <strong>Event:</strong> {booking.eventType} | {booking.requirements || "No special requirements."}
                        </p>
                      </div>

                      <div className="flex flex-col justify-center space-y-2 md:w-48">
                        {booking.status === "pending" || booking.status === "awaiting_driver" ? (
                          <DriverResponseActions bookingId={booking.id} driverId={driverProfile.id} date={booking.startDate} />
                        ) : (
                          <p className="text-center text-sm font-medium text-muted-foreground">
                            Action Completed
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
