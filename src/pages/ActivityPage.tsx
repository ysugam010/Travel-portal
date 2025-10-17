import { Navbar } from "@/components/custom/Navbar";
import { Footer } from "@/components/custom/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, Sunset, UtensilsCrossed } from "lucide-react";

// ✅ Import local images from assets
import hikingImg from "@/assets/82.jpg";
import cruiseImg from "@/assets/81.jpg";
import cookingImg from "@/assets/83.jpg";

// ✅ Activities data
const activities = [
  {
    id: 1,
    name: "Hiking Tour in Himalayas",
    description: "A guided trek through scenic mountain paths.",
    icon: Mountain,
    image: hikingImg,
  },
  {
    id: 2,
    name: "Sunset Cruise",
    description: "Enjoy breathtaking views on a relaxing evening cruise.",
    icon: Sunset,
    image: cruiseImg,
  },
  {
    id: 3,
    name: "Local Cooking Class",
    description: "Learn to cook authentic dishes from local chefs.",
    icon: UtensilsCrossed,
    image: cookingImg,
  },
];

export function ActivityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="flex-grow container mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
          Exciting Experiences Await
        </h1>
        <p className="text-lg text-center text-gray-600 mb-16">
          Choose from unique adventures curated for every traveler.
        </p>

        {/* Activity Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl"
            >
              <div className="relative h-60">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
                {/* Hover Overlay with Button */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Book Now
                  </Button>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{activity.name}</CardTitle>
                <CardDescription className="text-gray-500 flex items-center gap-2">
                  <activity.icon className="h-4 w-4" /> Experience
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600">{activity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
