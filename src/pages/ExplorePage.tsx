import React, { useState } from "react";
import { Navbar } from "@/components/custom/Navbar";
import { Footer } from "@/components/custom/Footer";
import { ExploreMore } from "@/components/custom/ExploreMore";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MountainIcon, Globe, Building, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Destination = {
  name: string;
  icon: React.ElementType;
  description: string;
  facts: string[];
};

const destinations: Destination[] = [
  {
    name: "Mountains",
    icon: MountainIcon,
    description: "Breathtaking views and adventurous trails.",
    facts: [
      "The Himalayas are still rising each year due to tectonic movement.",
      "Mountains store most of Earth’s freshwater in glaciers.",
      "Mount Everest stands at an incredible 8,848 meters tall.",
    ],
  },
  {
    name: "Beaches",
    icon: Globe,
    description: "Relax by the sea, enjoy sun and surf.",
    facts: [
      "Some beaches glow beautifully at night due to bioluminescent plankton.",
      "The color of sand depends on nearby coral and minerals.",
      "Coastal tides constantly reshape beaches every day.",
    ],
  },
  {
    name: "Cities",
    icon: Building,
    description: "Vibrant culture, history, and nightlife.",
    facts: [
      "Tokyo is the world’s most populated metropolitan area.",
      "Paris was one of the first cities to introduce street lighting.",
      "Dubai’s skyline features more than 150 modern skyscrapers.",
    ],
  },
  {
    name: "Forests",
    icon: Leaf,
    description: "Unique landscapes and starry nights.",
    facts: [
      "Forests cover nearly one-third of Earth’s land area.",
      "The Amazon produces around 20% of the planet’s oxygen.",
      "Old-growth forests are vital for carbon storage and wildlife.",
    ],
  },
];

export function ExplorePage() {
  const [unlocked, setUnlocked] = useState<string | null>(null);
  const [showExploreMore, setShowExploreMore] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold text-gray-800 mb-4"
          >
            Explore Beautiful Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600"
          >
            Swipe up to uncover the hidden stories of the world’s wonders.
          </motion.p>
        </div>

        {/* Cards Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {destinations.map((dest, index) => {
            const Icon = dest.icon;
            const isUnlocked = unlocked === dest.name;

            return (
              <div key={index} className="relative h-80 select-none">
                {/* Facts Background */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={
                    isUnlocked ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
                  }
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-white rounded-3xl shadow-inner z-0 p-6"
                >
                  {isUnlocked && (
                    <>
                      <h3 className="text-xl font-semibold mb-4 text-blue-700 tracking-tight">
                        {dest.name} Facts
                      </h3>
                      <ul className="text-gray-700 text-sm space-y-3 text-center leading-relaxed px-2">
                        {dest.facts.map((fact, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 * i }}
                          >
                            {fact}
                          </motion.li>
                        ))}
                      </ul>
                    </>
                  )}
                </motion.div>

                {/* Swipe Card */}
                <motion.div
                  drag="y"
                  dragConstraints={{ top: -150, bottom: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.y < -100) {
                      setUnlocked(dest.name);
                    } else {
                      setUnlocked(null);
                    }
                  }}
                  whileTap={{ scale: 0.97 }}
                  animate={
                    isUnlocked
                      ? { y: -160, scale: 0.95, rotateX: 10 }
                      : { y: 0, scale: 1, rotateX: 0 }
                  }
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="absolute inset-0 z-10 p-8 text-center bg-white shadow-xl rounded-3xl cursor-grab active:cursor-grabbing border border-gray-200"
                >
                  <div className="bg-blue-50 p-4 rounded-full inline-block mb-6 shadow-sm">
                    <Icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl mb-2 text-gray-800 font-semibold">
                    {dest.name}
                  </CardTitle>
                  <p className="text-gray-600 mb-4 text-sm">
                    {dest.description}
                  </p>
                  {!isUnlocked && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-blue-500 font-medium tracking-wide text-sm"
                    >
                       Swipe up to unlock
                    </motion.div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Start Exploring Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready To Embark?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Plan your next adventure today and discover incredible destinations
            with Tripco.
          </p>
          <Button
            onClick={() => setShowExploreMore((prev) => !prev)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-xl shadow-md transition-all duration-300"
          >
            {showExploreMore ? "Hide" : "Start Exploring"}
          </Button>
        </div>

        {/* ExploreMore Section Animation */}
        <AnimatePresence>
          {showExploreMore && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.6 }}
              className="mt-20"
            >
              <ExploreMore />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default ExplorePage;
