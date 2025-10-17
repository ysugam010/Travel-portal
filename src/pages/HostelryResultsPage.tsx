import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, BedDouble, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuthDialog } from "@/context/AuthDialogContext";
import { motion } from "motion/react";
import { Navbar } from "@/components/custom/Navbar";
import { format } from "date-fns";

import grandBali from "@/assets/18.jpg";
import ubudVilla from "@/assets/16.jpg";
import seminyakBeach from "@/assets/17.jpg";
import cangguSurf from "@/assets/19.jpg";

const hotelImages: Record<string, string> = {
  "grand-bali.jpg": grandBali,
  "ubud-villa.jpg": ubudVilla,
  "seminyak-beach.jpg": seminyakBeach,
  "canggu-surf.jpg": cangguSurf,
};

type Hotel = {
  id: number;
  name: string;
  location: string;
  price_per_night: number;
  rating: number;
  amenities: string[];
  image: string;
};

function FilterSidebar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();

  // Extract params cleanly
  const initialSearch = {
    destination: searchParams.get("destination") || "",
    rooms: searchParams.get("rooms") || "1",
    adults: searchParams.get("adults") || "1",
    children: searchParams.get("children") || "0",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
  };

  // Handle backward compatibility when guests param is combined (like guests=10)
  const guestsParam = searchParams.get("guests");
  if (guestsParam && (!searchParams.get("adults") || !searchParams.get("children"))) {
    const totalGuests = parseInt(guestsParam, 10);
    // Default: assume half adults, half children if only guests given
    initialSearch.adults = Math.ceil(totalGuests / 2).toString();
    initialSearch.children = Math.floor(totalGuests / 2).toString();
  }

  const [searchValues, setSearchValues] = useState(initialSearch);
  const [isEditing, setIsEditing] = useState(false);

  const handleApplyChanges = () => {
    const query = new URLSearchParams({
      destination: searchValues.destination,
      rooms: searchValues.rooms,
      adults: searchValues.adults,
      children: searchValues.children,
      checkIn: searchValues.checkIn,
      checkOut: searchValues.checkOut,
    }).toString();

    navigate(`?${query}`);
    setIsEditing(false);
  };

  return (
    <Card className="sticky top-24 bg-white/90 backdrop-blur shadow-md rounded-2xl border border-blue-100">
      <CardContent className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Search</h3>

        {/* Destination */}
        <div>
          <p className="text-gray-500 text-sm mb-1">Destination</p>
          {isEditing ? (
            <input
              type="text"
              value={searchValues.destination}
              onChange={(e) =>
                setSearchValues({ ...searchValues, destination: e.target.value })
              }
              className="w-full border border-blue-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter destination"
            />
          ) : (
            <p className="font-medium text-gray-800 capitalize">
              {initialSearch.destination || "-"}
            </p>
          )}
        </div>

        <Separator />

        {/* Rooms / Adults / Children */}
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Rooms", key: "rooms", icon: BedDouble, min: 1 },
            { label: "Adults", key: "adults", icon: User, min: 1 },
            { label: "Children", key: "children", icon: User, min: 0 },
          ].map(({ label, key, icon: Icon, min }) => (
            <div className="flex-1" key={key}>
              <p className="text-gray-500 text-sm mb-1">{label}</p>
              {isEditing ? (
                <input
                  type="number"
                  min={min}
                  value={(searchValues as any)[key]}
                  onChange={(e) =>
                    setSearchValues({ ...searchValues, [key]: e.target.value })
                  }
                  className="w-full border border-blue-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-blue-500" />
                  <p className="font-medium">{(initialSearch as any)[key]}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator />

        {/* Check-in / Check-out */}
        <div className="flex justify-between gap-3">
          {[
            { label: "Check-In", key: "checkIn" },
            { label: "Check-Out", key: "checkOut" },
          ].map(({ label, key }) => (
            <div className="flex-1" key={key}>
              <p className="text-gray-500 text-sm mb-1">{label}</p>
              {isEditing ? (
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={(searchValues as any)[key]}
                  onChange={(e) =>
                    setSearchValues({ ...searchValues, [key]: e.target.value })
                  }
                  className="w-full border border-blue-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <p className="font-medium">
                    {(initialSearch as any)[key]
                      ? format(new Date((initialSearch as any)[key]), "dd MMM yyyy")
                      : "-"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator />

        {/* Currency */}
        <div>
          <p className="text-gray-500 text-sm mb-1">Currency</p>
          {isEditing ? (
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="w-full border border-blue-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          ) : (
            <p className="font-medium text-gray-800">{currency}</p>
          )}
        </div>

        <Button
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all"
          onClick={() => (isEditing ? handleApplyChanges() : setIsEditing(true))}
        >
          {isEditing ? "Apply Changes" : "Modify Search"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function HostelryResultsPage() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const { user } = useAuth();
  const { openDialog } = useAuthDialog();
  const { convertPrice, getSymbol } = useCurrency();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!destination) return;
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/hostelry?location_like=${destination}`
        );
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        setHotels(data);
      } catch {
        setError("Failed to fetch hotel data.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [destination]);

  const handleBookHotel = async (hotel: Hotel) => {
    if (!user) {
      openDialog("signin");
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      userEmail: user.email,
      type: "Hotel",
      name: hotel.name,
      location: hotel.location,
      bookingDate: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(`http://localhost:3001/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      if (!res.ok) throw new Error();
      alert(`Successfully booked ${hotel.name}!`);
    } catch {
      alert("Booking failed.");
    }
  };

  if (!destination)
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-gray-500">
          Invalid search. Please go back and try again.
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
        <main className="container mx-auto py-16 px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-800 mb-8 text-center"
          >
            Hotels in "{destination}"
          </motion.h1>

          {loading && <p className="text-center text-gray-500">Loading results...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
              <div className="hidden lg:block lg:col-span-1">
                <FilterSidebar />
              </div>

              <div className="lg:col-span-3 space-y-6">
                {hotels.length > 0 ? (
                  hotels.map((hotel, index) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 bg-white hover:scale-[1.01]">
                        <div className="flex flex-col md:flex-row">
                          <img
                            src={hotelImages[hotel.image]}
                            alt={hotel.name}
                            className="w-full md:w-1/3 h-64 object-cover md:h-64"
                          />
                          <div className="p-6 flex flex-col justify-between flex-grow">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-800">
                                  {hotel.name}
                                </h3>
                                <div className="flex items-center gap-1 font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  {hotel.rating}
                                </div>
                              </div>
                              <div className="flex items-center text-gray-500 mt-1 mb-4">
                                <MapPin className="mr-1 h-4 w-4 text-blue-500" />
                                <p className="text-sm">{hotel.location}</p>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {hotel.amenities.slice(0, 4).map((amenity) => (
                                  <Badge
                                    key={amenity}
                                    variant="outline"
                                    className="border-blue-200 text-blue-700"
                                  >
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <div>
                                <p className="text-xl font-bold text-gray-900">
                                  {getSymbol()}
                                  {convertPrice(hotel.price_per_night).toLocaleString(
                                    undefined,
                                    { maximumFractionDigits: 2 }
                                  )}
                                </p>
                                <p className="text-xs text-gray-500">/night</p>
                              </div>
                              <Button
                                onClick={() => handleBookHotel(hotel)}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
                              >
                                Select Deal
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No properties found for "{destination}".
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
