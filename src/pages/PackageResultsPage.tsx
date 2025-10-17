import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuthDialog } from "@/context/AuthDialogContext";
import { Navbar } from "@/components/custom/Navbar";

// --- Import all package slideshow images ---
import amalfi from "@/assets/67.jpg";
import amalfi2 from "@/assets/68.jpg";
import amalfi3 from "@/assets/69.jpg";
import amalfi4 from "@/assets/70.jpg";

import santorini from "@/assets/71.jpg";
import santorini1 from "@/assets/73.jpg";
import santorini2 from "@/assets/72.jpg";
import santorini3 from "@/assets/74.jpg";
import santorini4 from "@/assets/75.jpg";

import fjords from "@/assets/76.jpg";
import fjords2 from "@/assets/77.jpg";
import fjords3 from "@/assets/78.jpg";
import fjords4 from "@/assets/79.jpg";

const packageImages: Record<string, string[]> = {
  amalfi: [amalfi, amalfi2, amalfi3, amalfi4],
  santorini: [santorini, santorini1, santorini2, santorini3, santorini4],
  fjords: [fjords, fjords2, fjords3, fjords4],
};

type PackageItem = {
  id: number | string;
  slug?: string;
  name: string;
  location: string;
  price: number;
  rating?: number;
  nights: number;
  itinerary: string[];
  images: string[];
};

export default function PackageResultsPage() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const nights = Number(searchParams.get("nights") || 3);
  const { user } = useAuth();
  const { openDialog } = useAuthDialog();
  const { convertPrice, getSymbol } = useCurrency();

  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});
  const timers = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!destination) return;
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/packages?location_like=${destination}`);
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setPackages(data);

        const indexMap: Record<string, number> = {};
        data.forEach((p: PackageItem) => (indexMap[p.id] = 0));
        setCurrentImageIndex(indexMap);
      } catch (e) {
        setError("Failed to fetch package data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [destination]);

  const handleBookPackage = async (pkg: PackageItem) => {
    if (!user) return openDialog("signin");

    try {
      const res = await fetch(`http://localhost:3001/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(),
          userEmail: user.email,
          type: "Package",
          name: pkg.name,
          location: pkg.location,
          bookingDate: new Date().toISOString().split("T")[0],
        }),
      });
      if (!res.ok) throw new Error();
      alert(`Successfully booked ${pkg.name}!`);
    } catch {
      alert("Booking failed.");
    }
  };

  const onMouseEnterImage = (pkg: PackageItem) => {
    const imgs = pkg.slug && packageImages[pkg.slug] ? packageImages[pkg.slug] : pkg.images;
    if (!imgs || imgs.length <= 1 || timers.current[pkg.id]) return;

    timers.current[pkg.id] = window.setInterval(() => {
      setCurrentImageIndex((prev) => {
        const curr = prev[pkg.id] ?? 0;
        const next = (curr + 1) % imgs.length;
        return { ...prev, [pkg.id]: next };
      });
    }, 2000) as unknown as number;
  };

  const onMouseLeaveImage = (pkg: PackageItem) => {
    if (timers.current[pkg.id]) {
      clearInterval(timers.current[pkg.id]);
      delete timers.current[pkg.id];
    }
    setCurrentImageIndex((prev) => ({ ...prev, [pkg.id]: 0 }));
  };

  if (!destination) return <div className="text-center mt-20 text-gray-500">Invalid search. Please go back.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <main className="container mx-auto py-16 px-4">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800 text-center">
          Package Results for "{destination}"
        </h1>
        <p className="text-center text-gray-600 mb-8">Showing packages for ~{nights} night(s)</p>

        {loading && <p className="text-center text-gray-500">Loading packages...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.length > 0 ? (
              packages.map((pkg) => {
                const imgs = (pkg.slug && packageImages[pkg.slug]) || pkg.images || [];
                const displayImg = imgs[(currentImageIndex[pkg.id] ?? 0) % imgs.length] || imgs[0];

                return (
                  <Card
                    key={pkg.id}
                    className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-blue-100"
                  >
                    <div
                      className="w-full h-64 relative overflow-hidden"
                      onMouseEnter={() => onMouseEnterImage(pkg)}
                      onMouseLeave={() => onMouseLeaveImage(pkg)}
                    >
                      <img
                        src={displayImg}
                        alt={pkg.name}
                        className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 bg-white/90 px-3 py-1 rounded flex items-center gap-2 shadow">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{pkg.rating ?? 4.7}</span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col justify-between h-72">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{pkg.name}</h3>
                        <div className="flex items-center text-gray-500 mt-1 mb-2">
                          <MapPin className="mr-1 h-4 w-4 text-blue-500" />
                          <p className="text-sm">{pkg.location}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Itinerary</p>
                        <ul className="text-sm mt-2 space-y-1">
                          {pkg.itinerary.slice(0, 4).map((day, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="font-semibold">Day {idx + 1}:</span>
                              <span className="text-gray-700">{day}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-gray-900">
                            {getSymbol()}
                            {convertPrice(pkg.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </p>
                          <p className="text-xs text-gray-500">Per package</p>
                        </div>
                        <Button onClick={() => handleBookPackage(pkg)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md px-4 py-2">
                          Select Deal
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <p className="text-center text-gray-500">No packages found for "{destination}".</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
