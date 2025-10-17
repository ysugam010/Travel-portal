import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

// ---------- IMAGE IMPORTS ----------
import amalfi from "@/assets/24.jpg";
import tajmahal from "@/assets/25.jpg";
import baliHotAir from "@/assets/26.jpg";
import osakaCastle from "@/assets/27.jpg";
import capeReinga from "@/assets/28.jpg";
import sorrento from "@/assets/29.jpg";
import boraBora from "@/assets/30.jpg";
import santorini from "@/assets/31.jpg";
import paris from "@/assets/56.jpg";
import london from "@/assets/57.jpg";
import dubai from "@/assets/58.jpg";
import singapore from "@/assets/59.jpg";
import mauiIsland from "@/assets/32.jpg";
import baliIsland from "@/assets/33.jpg";
import bondiBeach from "@/assets/34.jpg";
import waikikiBeach from "@/assets/35.jpg";
import jeffreysBay from "@/assets/36.jpg";
import uluwatu from "@/assets/54.jpg";
import yosemite from "@/assets/38.jpg";
import banff from "@/assets/39.jpg";
import kruger from "@/assets/53.jpg";
import yellowstone from "@/assets/40.jpg";
import lakeComo from "@/assets/42.jpg";
import lakeLouise from "@/assets/43.jpg";
import lakeTahoe from "@/assets/44.jpg";
import lakeBled from "@/assets/45.jpg";
import maldivesBeach from "@/assets/46.jpg";
import copacabana from "@/assets/48.jpg";
import pinkBeach from "@/assets/47.jpg";
import navagioBeach from "@/assets/60.jpg";
import saharaCamp from "@/assets/49.jpg";
import mountCookCamp from "@/assets/51.jpg";
import yosemiteCamp from "@/assets/52.jpg";
import zionCamp from "@/assets/55.jpg";

// ---------- DESTINATION DATA ----------
const allDestinations = [
  { name: "Amalfi Coast", location: "Amalfi, Italy", price: 148, rating: 4.9, image: amalfi, category: "Popular" },
  { name: "Taj Mahal", location: "Agra, India", price: 140, rating: 4.9, image: tajmahal, category: "Popular" },
  { name: "Tanah Gajah", location: "Bali, Indonesia", price: 148, rating: 4.9, image: baliHotAir, category: "Popular" },
  { name: "Osaka Castle", location: "Osaka, Japan", price: 156, rating: 4.9, image: osakaCastle, category: "Popular" },
  { name: "Cape Reinga", location: "Northland, New Zealand", price: 164, rating: 4.9, image: capeReinga, category: "Popular" },
  { name: "Sorrento", location: "Amalfi, Italy", price: 172, rating: 4.9, image: sorrento, category: "Popular" },
  { name: "Bora Bora", location: "French Polynesia", price: 350, rating: 4.9, image: boraBora, category: "Popular" },
  { name: "Santorini", location: "Greece", price: 280, rating: 4.8, image: santorini, category: "Popular" },
  { name: "Paris", location: "France", price: 260, rating: 4.8, image: paris, category: "Popular" },
  { name: "London", location: "United Kingdom", price: 250, rating: 4.9, image: london, category: "Popular" },
  { name: "Dubai", location: "UAE", price: 290, rating: 4.9, image: dubai, category: "Popular" },
  { name: "Singapore", location: "Singapore", price: 270, rating: 4.8, image: singapore, category: "Popular" },

  // ISLANDS
  { name: "Bora Bora", location: "French Polynesia", price: 350, rating: 4.9, image: boraBora, category: "Islands" },
  { name: "Santorini", location: "Greece", price: 280, rating: 4.8, image: santorini, category: "Islands" },
  { name: "Maui Island", location: "Hawaii, USA", price: 310, rating: 4.9, image: mauiIsland, category: "Islands" },
  { name: "Bali Island", location: "Indonesia", price: 270, rating: 4.9, image: baliIsland, category: "Islands" },

  // SURFING
  { name: "Bondi Beach", location: "Sydney, Australia", price: 190, rating: 4.8, image: bondiBeach, category: "Surfing" },
  { name: "Waikiki Beach", location: "Honolulu, Hawaii", price: 210, rating: 4.9, image: waikikiBeach, category: "Surfing" },
  { name: "Jeffreys Bay", location: "South Africa", price: 200, rating: 4.9, image: jeffreysBay, category: "Surfing" },
  { name: "Uluwatu", location: "Bali, Indonesia", price: 230, rating: 4.9, image: uluwatu, category: "Surfing" },

  // NATION PARKS
  { name: "Yosemite", location: "California, USA", price: 180, rating: 4.8, image: yosemite, category: "Nation Parks" },
  { name: "Banff", location: "Canada", price: 220, rating: 4.9, image: banff, category: "Nation Parks" },
  { name: "Kruger Park", location: "South Africa", price: 250, rating: 4.9, image: kruger, category: "Nation Parks" },
  { name: "Yellowstone", location: "USA", price: 230, rating: 4.9, image: yellowstone, category: "Nation Parks" },

  // LAKE
  { name: "Lake Como", location: "Italy", price: 210, rating: 4.9, image: lakeComo, category: "Lake" },
  { name: "Lake Louise", location: "Canada", price: 230, rating: 4.9, image: lakeLouise, category: "Lake" },
  { name: "Lake Tahoe", location: "USA", price: 190, rating: 4.8, image: lakeTahoe, category: "Lake" },
  { name: "Lake Bled", location: "Slovenia", price: 200, rating: 4.9, image: lakeBled, category: "Lake" },

  // BEACH
  { name: "Maldives Beach", location: "Maldives", price: 320, rating: 4.9, image: maldivesBeach, category: "Beach" },
  { name: "Copacabana", location: "Brazil", price: 280, rating: 4.8, image: copacabana, category: "Beach" },
  { name: "Pink Beach", location: "Indonesia", price: 260, rating: 4.9, image: pinkBeach, category: "Beach" },
  { name: "Navagio Beach", location: "Greece", price: 290, rating: 4.9, image: navagioBeach, category: "Beach" },

  // CAMP
  { name: "Sahara Camp", location: "Morocco", price: 240, rating: 4.8, image: saharaCamp, category: "Camp" },
  { name: "Mount Cook Camp", location: "New Zealand", price: 260, rating: 4.9, image: mountCookCamp, category: "Camp" },
  { name: "Yosemite Camp", location: "California, USA", price: 220, rating: 4.9, image: yosemiteCamp, category: "Camp" },
  { name: "Zion Camp", location: "Utah, USA", price: 210, rating: 4.9, image: zionCamp, category: "Camp" },
];

const categories = ["Popular", "Islands", "Surfing", "Nation Parks", "Lake", "Beach", "Camp"];

export function ExploreMore() {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [visibleItems, setVisibleItems] = useState(8);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  // 🔹 Preload all images on first render
  useEffect(() => {
    allDestinations.forEach((dest) => {
      const img = new Image();
      img.src = dest.image;
    });
  }, []);

  const filteredDestinations = allDestinations.filter((dest) => dest.category === activeCategory);

  const handleShowMore = () => {
    setVisibleItems((prev) => Math.min(prev + 4, filteredDestinations.length));
  };

  const handleShowLess = () => {
    setVisibleItems((prev) => Math.max(prev - 4, 8));
  };

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Explore more</h2>
        <p className="text-gray-500 mt-1">Let's go on an adventure</p>
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleItems(8);
            }}
            className={`px-5 py-2 rounded-full border transition-all duration-300 font-medium ${
              activeCategory === cat
                ? "bg-black text-white border-black shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-black hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DESTINATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {filteredDestinations.slice(0, visibleItems).map((dest) => (
          <Card
            key={dest.name}
            className="overflow-hidden rounded-2xl border shadow-sm hover:shadow-lg transition-shadow duration-300 group"
          >
            <div className="relative">
              {/* Skeleton while image loads */}
              {!loadedImages[dest.name] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />
                
              )}

              <img
                src={dest.image}
                alt={dest.name}
                loading="lazy"
                onLoad={() => setLoadedImages((prev) => ({ ...prev, [dest.name]: true }))}
                className={`w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105 ${
                  loadedImages[dest.name] ? "opacity-100" : "opacity-0"
                }`}
              />

              <Badge className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-slate-900">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                {dest.rating}
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">{dest.name}</h3>
                <p className="text-lg font-bold text-gray-800">
                  ${dest.price}
                  <span className="text-sm font-normal text-gray-500">/Pax</span>
                </p>
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin className="mr-1 h-4 w-4" />
                {dest.location}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SHOW MORE / LESS BUTTONS */}
      <div className="text-center flex justify-center gap-4">
        {visibleItems < filteredDestinations.length && (
          <Button
            onClick={handleShowMore}
            className="rounded-full px-6 border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Show more
          </Button>
        )}

        {visibleItems > 8 && (
          <Button
            onClick={handleShowLess}
            className="rounded-full px-6 border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Show less
          </Button>
        )}
      </div>
    </section>
  );
}
