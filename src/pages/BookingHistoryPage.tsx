import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Plane, Hotel, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import indigoLogo from "@/assets/logos/indigo.png";
import vistaraLogo from "@/assets/logos/vistara.png";
import airIndiaLogo from "@/assets/logos/air-india.png";
import emiratesLogo from "@/assets/logos/emirates.png";

const airlineLogos: Record<string, string> = {
  "IndiGo": indigoLogo,
  "Vistara": vistaraLogo,
  "Air India": airIndiaLogo,
  "Emirates": emiratesLogo,
};

type Booking = {
  id: string;
  userEmail: string;
  type: "Hotel" | "Flight" | "Package";
  name: string;
  location?: string;
  bookingDate: string;
};

export function BookingHistoryPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      const res = await fetch(
        `http://localhost:3001/bookings?userEmail=${user.email}`
      );
      const data = await res.json();
      setBookings(data);
    };
    fetchBookings();
  }, [user]);

  const hotelBookings = bookings.filter((b) => b.type === "Hotel");
  const flightBookings = bookings.filter((b) => b.type === "Flight");
  const packageBookings = bookings.filter((b) => b.type === "Package");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gray-800 shadow-md"></div>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-2">My Booking History</h1>
        <p className="text-gray-600 mb-10">
          A record of all your trips with{" "}
          <span className="font-semibold text-blue-600">Tripco</span>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Hotel Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Hotel className="text-blue-600 h-6 w-6" />
              <h2 className="text-2xl font-semibold">Hotel Stays</h2>
            </div>
            <div className="space-y-4">
              {hotelBookings.length > 0 ? (
                hotelBookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold text-gray-900">
                        {booking.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {booking.location}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        Booked on:{" "}
                        <span className="font-medium">
                          {booking.bookingDate}
                        </span>
                      </p>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500">No hotel bookings yet.</p>
              )}
            </div>
          </section>

          {/* Flight Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="text-blue-600 h-6 w-6" />
              <h2 className="text-2xl font-semibold">Flights</h2>
            </div>
            <div className="space-y-4">
              {flightBookings.length > 0 ? (
                flightBookings.map((booking) => {
                  const airlineName = booking.name.split(" - ")[0];
                  const logo = airlineLogos[airlineName];
                  return (
                    <Card
                      key={booking.id}
                      className="p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow bg-white"
                    >
                      <div className="flex items-center gap-4">
                        {logo && (
                          <img
                            src={logo}
                            alt={airlineName}
                            className="h-10 w-10 object-contain"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-gray-900">
                            {booking.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {booking.location}
                          </p>
                          <p className="text-gray-500 text-xs mt-2">
                            Booked on:{" "}
                            <span className="font-medium">
                              {booking.bookingDate}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <p className="text-gray-500">No flight bookings yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Package Section */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="text-blue-600 h-6 w-6" />
            <h2 className="text-2xl font-semibold">Holiday Packages</h2>
          </div>
          <div className="space-y-4">
            {packageBookings.length > 0 ? (
              packageBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow bg-white"
                >
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.name}
                    </p>
                    <p className="text-gray-600 text-sm">{booking.location}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      Booked on:{" "}
                      <span className="font-medium">{booking.bookingDate}</span>
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No package bookings yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
