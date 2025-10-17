import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

// Import your local images
import mindanouImg from '@/assets/22.jpg';
import disneylandImg from '@/assets/20.jpg';
import thousandIslandImg from '@/assets/23.jpg';
import basilikaImg from '@/assets/21.jpg';

const places = [
  {
    name: "SC. Mindanou",
    location: "Mindanou, Philippines",
    image: mindanouImg,
    wikiLink: "https://en.wikipedia.org/wiki/Mindanao",
    discount: "20% OFF",
  },
  {
    name: "Disneyland Tokyo",
    location: "Tokyo, Japan",
    image: disneylandImg,
    wikiLink: "https://en.wikipedia.org/wiki/Tokyo_Disneyland",
    discount: "20% OFF",
  },
  {
    name: "Thousand Island",
    location: "Java, Indonesia",
    image: thousandIslandImg,
    wikiLink: "https://en.wikipedia.org/wiki/Thousand_Islands_(Indonesia)",
    discount: "20% OFF",
  },
  {
    name: "Basilika Santo",
    location: "Venice, Italy",
    image: basilikaImg,
    wikiLink: "https://en.wikipedia.org/wiki/St_Mark%27s_Basilica",
    discount: "20% OFF",
  },
];

export function PopularPlace() {
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Popular Place</h2>
          <p className="text-gray-500 mt-1">Let's enjoy this heaven on earth</p>
        </div>
        <p className="text-gray-600 max-w-sm mt-4 md:mt-0">
          Many places are very famous, beautiful, clean, and will give a very deep impression to visitors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {places.map((place) => (
          <a href={place.wikiLink} target="_blank" rel="noopener noreferrer" key={place.name} className="group">
            <Card className="overflow-hidden rounded-2xl border-none shadow-none">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-80 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 right-4 bg-blue-500 text-white border-none">
                    {place.discount}
                  </Badge>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{place.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}