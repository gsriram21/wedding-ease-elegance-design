import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen luxury-gradient">
      <Navigation />
      <Hero />
      <Services />
      <Packages />
      <About />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Index;
