
import { useEffect, useState } from "react";

const Services = () => {
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

    const element = document.getElementById('services');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const services = [
    {
      title: "Venue Selection",
      description: "Curated selection of the world's most exquisite wedding venues, from historic estates to luxury resorts.",
      icon: "🏛️"
    },
    {
      title: "Vendor Coordination", 
      description: "Expert coordination with premium vendors including photographers, florists, and caterers.",
      icon: "🤝"
    },
    {
      title: "Design & Styling",
      description: "Bespoke wedding design that reflects your unique style and creates an unforgettable atmosphere.",
      icon: "🎨"
    },
    {
      title: "Day-of Coordination",
      description: "Seamless execution of your special day, ensuring every detail is perfectly orchestrated.",
      icon: "✨"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            Our Exclusive Services
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we provide comprehensive wedding planning services 
            tailored to your vision and executed with unparalleled precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`text-center group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-stone-50 rounded-lg p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
