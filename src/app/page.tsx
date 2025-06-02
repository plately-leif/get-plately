import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import SocialLogos from "@/components/SocialLogos/SocialLogos";
import ProcessDemoNew from "@/components/Process/ProcessDemoNew";
import Benefits from "@/components/Benefits/Benefits";
import RestaurantSection from "@/components/Restaurant/RestaurantSection";
import FinalCTA from "@/components/FinalCTA/FinalCTA";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col gap-0">
        <Hero />
        <SocialLogos />
        <ProcessDemoNew />
        <Benefits />
        <RestaurantSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
