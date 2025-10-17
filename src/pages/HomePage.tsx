import { Navbar } from "@/components/custom/Navbar";
import { HeroSection } from "@/components/custom/HeroSection";
import { PopularPlace } from "@/components/custom/PopularPlace";
import { SweetMemories } from "@/components/custom/SweetMemories";
import { ExploreMore } from "@/components/custom/ExploreMore";
import { AdventureSection } from "@/components/custom/AdventureSection";
import { Footer } from "@/components/custom/Footer";

export function HomePage() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <PopularPlace />
        <SweetMemories />
        <ExploreMore />
        <AdventureSection />
      </main>
      <Footer />
    </div>
  );
}