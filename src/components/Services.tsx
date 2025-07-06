import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

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

  const handleServiceClick = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  const services = [
    {
      title: "Wedding Attire",
      description: "Exquisite collection of bridal lehengas, sherwanis, sarees, and designer outfits for your special day.",
      category: "attire",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Luxury Jewelry",
      description: "Premium jewelry collection featuring traditional and contemporary designs with precious metals and stones.",
      category: "jewelry",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Wedding Decor",
      description: "Bespoke decoration services including mandap designs, floral arrangements, and stunning venue transformations.",
      category: "decor",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    {
      title: "Special Collections",
      description: "Curated seasonal collections and limited edition pieces from renowned designers and artisans.",
      category: "collections",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  const galleryImages = [
    {
      src: "/images/celebration-new-1.jpg",
      alt: "A couple holding hands affectionately during their wedding ceremony.",
      category: "attire"
    },
    {
      src: "/images/celebration-new-2.jpg",
      alt: "An intimate close-up of a bride's hands, showcasing detailed henna and jewelry.",
      category: "jewelry"
    },
    {
      src: "/images/celebration-new-3.jpg",
      alt: "A vibrant, colorful shot of a traditional wedding ritual with flower garlands.",
      category: "decor"
    },
    {
      src: "/images/celebration-new-4.jpg",
      alt: "A beautiful portrait of a bride in her stunning wedding attire.",
      category: "collections"
    }
  ];

  return (
    <section id="services" className="relative overflow-hidden luxury-spacing bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      {/* Background Floral Elements */}
      <img 
        src="/images/bg-branch.png" 
        alt="" 
        className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/4 w-[40rem] opacity-25"
      />
      <img 
        src="/images/bg-flower.png" 
        alt="" 
        className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 w-[40rem] opacity-25 scale-x-[-1]"
      />
      <img 
        src="/images/bg-flower.png" 
        alt="" 
        className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/3 w-[30rem] opacity-30"
      />

      <div className="relative z-10 luxury-container">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-luxury-serif font-bold text-5xl md:text-6xl text-luxury-maroon mb-8 tracking-tight">
            Our Luxury Offerings
          </h2>
          <div className="w-24 h-px bg-luxury-dusty-rose mx-auto mb-8" />
          <p className="font-luxury-sans text-xl md:text-2xl text-luxury-maroon/70 max-w-4xl mx-auto leading-relaxed-luxury">
            Discover our curated collection of wedding essentials, from exquisite attire to stunning jewelry, 
            each piece chosen to make your special day unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => handleServiceClick(service.category)}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-luxury-taupe/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="text-luxury-dusty-rose mb-6 group-hover:text-luxury-maroon transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="font-luxury-serif font-bold text-2xl text-luxury-maroon mb-4 group-hover:text-luxury-dusty-rose transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-luxury-sans text-luxury-maroon/70 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-luxury-dusty-rose group-hover:text-luxury-maroon transition-colors duration-300">
                  <span className="font-luxury-sans text-sm font-medium">Shop Now</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h3 className="font-luxury-serif font-bold text-4xl md:text-5xl text-luxury-maroon mb-6 tracking-tight">
              Featured Collections
            </h3>
            <div className="w-20 h-px bg-luxury-dusty-rose mx-auto mb-6" />
            <p className="font-luxury-sans text-lg md:text-xl text-luxury-maroon/70 max-w-3xl mx-auto leading-relaxed">
              Explore our carefully curated collections showcasing the finest in wedding fashion and accessories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
                onClick={() => handleServiceClick(image.category)}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-maroon/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="font-luxury-sans text-sm font-medium text-luxury-maroon">View Collection</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
