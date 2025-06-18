
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { check } from "lucide-react";

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
    <section id="packages" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            Wedding Planning Packages
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect package for your special day. Each option is designed to provide 
            exceptional service and create the wedding of your dreams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.popular ? 'ring-2 ring-amber-800 scale-105' : ''
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-amber-800 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${pkg.popular ? 'pt-12' : ''}`}>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-stone-600 mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-amber-800 mb-6">
                  {pkg.price}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <check className="w-5 h-5 text-amber-800 mr-3 flex-shrink-0" />
                      <span className="text-stone-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 font-medium transition-all duration-300 ${
                    pkg.popular 
                      ? 'bg-amber-800 hover:bg-amber-900 text-white' 
                      : 'border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white'
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
