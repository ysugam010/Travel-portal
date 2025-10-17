import { useEffect, useState } from "react";
import { Navbar } from "@/components/custom/Navbar";
import { useSearchParams } from "react-router-dom";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthDialog } from "@/context/AuthDialogContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import indigoLogo from "@/assets/logos/indigo.png";
import vistaraLogo from "@/assets/logos/vistara.png";
import airIndiaLogo from "@/assets/logos/air-india.png";
import emiratesLogo from "@/assets/logos/emirates.png";

const airlineLogos: Record<string, string> = {
  "indigo.png": indigoLogo,
  "vistara.png": vistaraLogo,
  "air-india.png": airIndiaLogo,
  "emirates.png": emiratesLogo,
};

type Flight = {
  id: number;
  airline: string;
  airline_logo: string;
  flight_number: string;
  origin: string;
  origin_code: string;
  destination: string;
  destination_code: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  price: number;
  stops: number;
};

const formatTime = (dateString: string) =>
  new Date(dateString).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export function FlightResultsPage() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const { user } = useAuth();
  const { openDialog } = useAuthDialog();
  const { convertPrice, getSymbol } = useCurrency();

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!from || !to) return;
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3001/flights?origin_like=${from}&destination_like=${to}`
        );
        const data = await res.json();
        setFlights(data);
      } catch {
        setError("Failed to fetch flights.");
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [from, to]);

  const handleBookFlight = async (flight: Flight) => {
    if (!user) {
      openDialog("signin");
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      userEmail: user.email,
      type: "Flight",
      name: `${flight.airline} - ${flight.flight_number}`,
      location: `${flight.origin_code} → ${flight.destination_code}`,
      bookingDate: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(`http://localhost:3001/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      if (!res.ok) throw new Error();
      alert(`Successfully booked ${flight.flight_number}!`);
    } catch {
      alert("Booking failed.");
    }
  };

  if (!from || !to)
    return (
      <div className="text-center mt-20 text-gray-500">
        Invalid search. Please go back and try again.
      </div>
    );

  return (
     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navbar with automatic color change */}
      <Navbar />
      <main className="container mx-auto py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-3 text-gray-800"
        >
          Available Flights
        </motion.h1>
        <p className="text-center text-gray-600 mb-10">
          Showing flights from <strong>{from}</strong> to{" "}
          <strong>{to}</strong>
        </p>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && flights.length > 0 && (
          <div className="space-y-6">
            {flights.map((f, index) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-blue-100">
                  <div className="grid grid-cols-12 items-center gap-6">
                    <div className="col-span-12 md:col-span-3 flex items-center gap-4">
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <img
                          src={airlineLogos[f.airline_logo]}
                          alt={f.airline}
                          className="h-10"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {f.airline}
                        </p>
                        <p className="text-xs text-gray-500">
                          {f.flight_number}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-2 text-center md:text-left">
                      <p className="text-xl font-bold text-gray-800">
                        {formatTime(f.departure_time)}
                      </p>
                      <p className="text-gray-600">{f.origin_code}</p>
                    </div>

                    <div className="col-span-12 md:col-span-2 text-center">
                      <p className="text-sm text-gray-500 mb-1">{f.duration}</p>
                      <div className="flex justify-center items-center">
                        <div className="w-full h-px bg-gray-300"></div>
                        <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
                        <div className="w-full h-px bg-gray-300"></div>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">
                        {f.stops === 0 ? "Non-stop" : `${f.stops} Stop(s)`}
                      </p>
                    </div>

                    <div className="col-span-6 md:col-span-2 text-center md:text-left">
                      <p className="text-xl font-bold text-gray-800">
                        {formatTime(f.arrival_time)}
                      </p>
                      <p className="text-gray-600">{f.destination_code}</p>
                    </div>

                    <div className="col-span-12 md:col-span-3 text-right">
                      <p className="text-2xl font-bold text-gray-800">
                        {getSymbol()}
                        {convertPrice(f.price).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <Button
                        onClick={() => handleBookFlight(f)}
                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all shadow-md"
                      >
                        Select Flight
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && flights.length === 0 && (
          <p className="text-center text-gray-500">
            No flights found for your route.
          </p>
        )}
      </main>
    </div>
  );
}
