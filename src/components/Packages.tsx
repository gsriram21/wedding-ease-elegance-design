import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Packages = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('packages');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const packages = [
    {
      name: "Essential",
      price: "From $5,000",
      description: "Perfect for intimate celebrations",
      features: [
        "Venue selection assistance",
        "Vendor recommendations",
        "Timeline creation",
        "Month-of coordination",
        "Emergency kit on wedding day"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "From $12,000", 
      description: "Comprehensive planning experience",
      features: [
        "Full-service planning",
        "Unlimited consultations",
        "Design & styling services",
        "Vendor management",
        "Rehearsal coordination",
        "Day-of coordination team"
      ],
      popular: true
    },
    {
      name: "Luxury",
      price: "From $25,000",
      description: "White-glove concierge service",
      features: [
        "Bespoke wedding design",
        "Destination wedding planning",
        "Guest accommodation coordination",
        "Custom stationery design", 
        "Dedicated planning team",
        "Post-wedding cleanup"
      ],
      popular: false
    }
  ];

  return (
    <section id="packages" className="relative overflow-hidden luxury-spacing luxury-gradient">
      {/* Background Floral Elements */}
      <img 
        src="/images/bg-flower.png" 
        alt="" 
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[30rem] opacity-25"
      />
      <img 
        src="/images/bg-flower.png" 
        alt="" 
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[25rem] opacity-25"
      />
      <img 
        src="/images/bg-branch.png" 
        alt="" 
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/2 w-[35rem] opacity-25"
      />

      <div className="relative z-10 luxury-container">
        <div className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-luxury-serif font-bold text-5xl md:text-6xl text-luxury-maroon mb-8 tracking-tight">
            Wedding Planning Packages
          </h2>
          <div className="w-24 h-px bg-luxury-dusty-rose mx-auto mb-8" />
          <p className="font-luxury-sans text-xl md:text-2xl text-luxury-maroon/70 max-w-4xl mx-auto leading-relaxed-luxury">
            Choose the perfect package for your special day. Each option is designed to provide 
            exceptional service and create the wedding of your dreams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative card-standard card-large card-grid-item transition-all duration-700 luxury-hover ${
                pkg.popular ? 'ring-2 ring-luxury-dusty-rose shadow-2xl scale-105' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-luxury-dusty-rose to-rose-400 text-white text-center py-3 font-luxury-sans font-medium tracking-wide uppercase text-sm rounded-t-xl">
                  Most Popular
                </div>
              )}
              
              <div className={`card-content-flex ${pkg.popular ? 'pt-8' : ''}`}>
                <div>
                  <h3 className="font-luxury-serif font-bold text-3xl md:text-4xl text-luxury-maroon mb-4 tracking-tight">
                    {pkg.name}
                  </h3>
                  <p className="font-luxury-sans text-luxury-maroon/70 mb-6 text-lg leading-relaxed">{pkg.description}</p>
                  <div className="font-luxury-serif text-4xl font-bold text-luxury-dusty-rose mb-10">
                    {pkg.price}
                  </div>
                  
                  <ul className="space-y-4 mb-12">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full mt-3 mr-4 flex-shrink-0" />
                        <span className="font-luxury-sans text-luxury-maroon/80 leading-relaxed text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className={`w-full py-4 font-luxury-sans font-medium tracking-wide uppercase text-sm transition-all duration-300 mt-auto ${
                    pkg.popular 
                      ? 'btn-luxury-primary' 
                      : 'btn-luxury-secondary'
                  }`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Select Package
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
