import { Button } from "@/components/ui/button";
import memoriesBg from '@/assets/4.jpg';
import { Star } from "lucide-react";

// A small component for the floating testimonials
function TestimonialCard({ name, rating, avatar, position }: { name: string, rating: number, avatar: string, position: string }) {
  return (
    <div className={`absolute ${position} bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center gap-3 transition-transform duration-300 hover:scale-110`}>
      <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <div className="flex items-center text-xs text-gray-600">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
}

export function SweetMemories() {
  return (
    <section className="bg-slate-50 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Travel to make sweet memories</h2>
          <p className="text-gray-500 mt-2">Find trips that fit a flexible lifestyle</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 h-10 w-10 rounded-lg flex items-center justify-center font-bold">01</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Find trips that fit your freedom</h3>
                <p className="text-gray-600">Travelling offers freedom, solitude, spontaneity, and privacy and purpose.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-green-100 text-green-600 h-10 w-10 rounded-lg flex items-center justify-center font-bold">02</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get back to nature by travel</h3>
                <p className="text-gray-600">The world is a playground and you can finally explore Mother Nature's inimitable canvas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-orange-100 text-orange-600 h-10 w-10 rounded-lg flex items-center justify-center font-bold">03</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reignite those travel tastebuds</h3>
                <p className="text-gray-600">There are infinite reasons to love travel, one of them being the food, glorious food.</p>
              </div>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 mt-6">Start your explore</Button>
          </div>
          {/* Right Column: Image with Testimonials */}
          <div className="relative">
            <img src={memoriesBg} alt="Sweet memories background" className="rounded-2xl shadow-2xl w-full h-full object-cover"/>
            <TestimonialCard name="Kamelia Diana" rating={4.9} avatar="https://i.pravatar.cc/150?img=36" position="top-10 -left-10" />
            <TestimonialCard name="Haika Adam" rating={4.8} avatar="https://i.pravatar.cc/150?img=47" position="bottom-1/2 -right-12" />
            <TestimonialCard name="Joe Zefrano" rating={4.9} avatar="https://i.pravatar.cc/150?img=12" position="bottom-10 -left-12" />
          </div>
        </div>
      </div>
    </section>
  );
}