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
      description: "Curated selection of the most exclusive and breathtaking venues that perfectly complement your vision and style.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Vendor Coordination",
      description: "Access to our exclusive network of premium vendors, from renowned photographers to world-class caterers.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Design & Styling",
      description: "Bespoke design services that transform your venue into a stunning reflection of your personal style and cultural heritage.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    {
      title: "Day-of Coordination",
      description: "Seamless execution of your wedding day with our experienced team ensuring every moment unfolds perfectly.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const galleryImages = [
    {
      src: "/images/celebration-new-1.jpg",
      alt: "A couple holding hands affectionately during their wedding ceremony."
    },
    {
      src: "/images/celebration-new-2.jpg",
      alt: "An intimate close-up of a bride's hands, showcasing detailed henna and jewelry."
    },
    {
      src: "/images/celebration-new-3.jpg",
      alt: "A vibrant, colorful shot of a traditional wedding ritual with flower garlands."
    },
    {
      src: "/images/celebration-new-4.jpg",
      alt: "A beautiful portrait of a bride in her stunning wedding attire."
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
            Our Luxury Services
          </h2>
          <div className="w-24 h-px bg-luxury-dusty-rose mx-auto mb-8" />
          <p className="font-luxury-sans text-xl md:text-2xl text-luxury-maroon/70 max-w-4xl mx-auto leading-relaxed-luxury">
            From intimate ceremonies to grand celebrations, we craft bespoke experiences 
            that honor your traditions while creating timeless memories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-luxury-taupe/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="text-luxury-dusty-rose mb-6 group-hover:text-luxury-maroon transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="font-luxury-serif font-bold text-2xl text-luxury-maroon mb-4 group-hover:text-luxury-dusty-rose transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-luxury-sans text-luxury-maroon/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Section */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h3 className="font-luxury-serif font-bold text-4xl md:text-5xl text-luxury-maroon mb-6 tracking-tight">
              Our Recent Celebrations
            </h3>
            <div className="w-20 h-px bg-luxury-dusty-rose mx-auto mb-6" />
            <p className="font-luxury-sans text-lg md:text-xl text-luxury-maroon/70 max-w-3xl mx-auto leading-relaxed">
              Every wedding tells a unique story. Here are glimpses of the magical moments we've helped create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${index * 100 + 500}ms` }}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-maroon/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
