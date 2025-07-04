import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Image with Moderately Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('/images/hero-wedding-image.jpg')`
        }}
      />
      
      {/* Moderate Dark Pattern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/35" />
      
      {/* Absolutely centered content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-6xl mx-auto px-6 lg:px-8 w-full">
          <div className={`transition-all duration-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Main heading */}
            <h1 className="font-luxury-serif font-bold text-4xl md:text-6xl lg:text-7xl mb-12 leading-luxury tracking-tight text-white">
              All-in-One Wedding Shopping
            </h1>
            
            {/* Elegant Description */}
            <p className="text-luxury-ivory/90 font-luxury-sans font-light text-xl md:text-2xl mb-16 max-w-4xl mx-auto leading-relaxed-luxury">
              Exclusive Indian selections with personalized consultations for a seamless shopping experience accessible worldwide. 
              From traditional attire to modern celebrations, we bring India's finest to your doorstep.
            </p>
            
            {/* Two CTA Buttons side by side */}
            <div className="flex justify-center gap-6 flex-wrap">
              <Button 
                size="lg" 
                className="text-white font-luxury-sans tracking-wide uppercase text-lg px-8 py-4 rounded-xl border-2 border-white bg-transparent hover:bg-white hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
              >
                <span>Book Consultation</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              
              <Button 
                size="lg" 
                className="text-white font-luxury-sans tracking-wide uppercase text-lg px-8 py-4 rounded-xl border-2 border-white bg-transparent hover:bg-white hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 group"
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Explore</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
