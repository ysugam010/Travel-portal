import { useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Play, Plane} from "lucide-react";

// --- Import your adventure images and video ---
import parisImg from '@/assets/61.jpg';
import newYorkImg from '@/assets/64.jpg';
import seoulImg from '@/assets/63.jpg';
import baliTempleImg from '@/assets/66.jpg';
import romeImg from '@/assets/65.jpg'; // Added new image
import sydneyImg from '@/assets/62.jpg'; // Added new image
import travelVideo from '@/assets/videos/travel-video.mp4';

// --- Added more destinations for a better slider experience ---
const adventures = [
  { name: "Paris", image: parisImg },
  { name: "New York", image: newYorkImg },
  { name: "Seoul", image: seoulImg },
  { name: "Bali", image: baliTempleImg },
  { name: "Rome", image: romeImg },
  { name: "Sydney", image: sydneyImg },
];

export function AdventureSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="bg-white py-24 px-4">
      <div className="container mx-auto">
        {/* === Top Part: Adventure Carousel === */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Let's go on an adventure</h2>
          <p className="text-gray-500 mt-2">Find and book a great experience.</p>
        </div>
        
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {adventures.map((adv, index) => (
              <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-4 group">
                  {/* Stamp-like Card */}
                  <div className="relative p-2 border-2 border-dashed border-gray-300 rounded-lg bg-white group-hover:border-blue-500 transition-colors duration-300">
                    <div className="absolute -top-4 -left-4 bg-blue-100 p-2 rounded-full shadow-md z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <Plane className="h-5 w-5 text-blue-600 -rotate-45" />
                    </div>
                    <div className="overflow-hidden rounded-sm">
                      <img 
                        src={adv.image} 
                        alt={adv.name} 
                        className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    </div>
                    <p className="text-center font-semibold mt-3 text-gray-800">{adv.name}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Centered Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <CarouselPrevious className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-100" />
            <CarouselNext className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-100" />
          </div>
        </Carousel>

        {/* === Bottom Part: Video Section === */}
       <div className="mt-24 flex flex-col items-center gap-12">
  <div className="text-center lg:text-center max-w-2xl">
    <h2 className="text-3xl md:text-4xl font-bold leading-tight">Book tickets and go now!</h2>
    <p className="text-gray-600 mt-4 mb-8">
      Don’t wait to create memories. Find the perfect trip and book your tickets today. A world of adventure is just a click away.
    </p>
    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg rounded-full px-8 py-6">
      Book Now
    </Button>
  </div>
  
  {/* Custom Video Player */}
  <div
  className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group w-full max-w-full lg:max-w-4xl mx-auto"
  onClick={handlePlayPause}
>
  <video
    ref={videoRef}
    src={travelVideo}
    loop
    muted
    playsInline
    className="w-full h-auto lg:h-[500px] object-cover"
    onPlay={() => setIsPlaying(true)}
    onPause={() => setIsPlaying(false)}
  />
  {!isPlaying && (
    <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white/30 backdrop-blur-sm p-5 rounded-full transition-transform duration-300 group-hover:scale-110">
        <Play className="h-10 w-10 text-white fill-white" />
      </div>
    </div>
  )}
</div>
</div>
      </div>
    </section>
  );
}