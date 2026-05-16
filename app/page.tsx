import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />

      <HeroSection />

      <FeaturesSection />

      <Footer />
    </main>
  );
}
