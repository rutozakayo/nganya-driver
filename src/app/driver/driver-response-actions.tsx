"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { updateAvailabilityResponse } from "./actions";

export function DriverResponseActions({ bookingId, driverId, date }: { bookingId: string; driverId: string; date: Date }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleResponse = async (status: "available" | "unavailable") => {
    setIsLoading(true);
    try {
      await updateAvailabilityResponse(bookingId, driverId, date, status);
      alert("Response sent successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to send response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button 
        className="bg-green-600 hover:bg-green-700 text-white font-bold" 
        onClick={() => handleResponse("available")}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
        I am Available
      </Button>
      <Button 
        variant="destructive" 
        className="font-bold"
        onClick={() => handleResponse("unavailable")}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4" />}
        Not Available
      </Button>
    </div>
  );
}
