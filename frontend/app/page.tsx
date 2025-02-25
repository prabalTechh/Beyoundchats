
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Plans } from "@/pages/Plans";
import { Services } from "@/pages/Services";

export default function Home() {
  return (
    <div className="  w-full bg-PrimaryBackground">
      
      <Navbar />
      <Hero />
      <Plans />
      <Services />



      <Footer />
    </div>
  );
}
