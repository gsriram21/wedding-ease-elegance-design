import { useEffect, useState } from "react";

const About = () => {
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

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    { number: "1200+", label: "Happy Couples" },
    { number: "1467+", label: "Weddings" },
    { number: "679+", label: "Decorations" },
    { number: "1608+", label: "Locations" }
  ];

  return (
    <section id="about" className="relative overflow-hidden luxury-spacing bg-white">
      {/* Background Floral Elements */}
      <img 
        src="/images/bg-flower.png" 
        alt="" 
        className="absolute top-1/4 right-0 translate-x-1/2 w-[30rem] opacity-25 transform -rotate-45"
      />
      <img 
        src="/images/bg-flower.png" 
        alt="" 
        className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-[40rem] opacity-30"
      />

      <div className="relative z-10 luxury-container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <img
                src="/images/wedding-portrait.jpg"
                alt="Beautiful Indian wedding couple portrait"
                className="rounded-lg shadow-2xl w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h2 className="font-luxury-serif font-bold text-5xl md:text-6xl text-luxury-maroon mb-8 tracking-tight">
              Why Choose Wedding Ease?
            </h2>
            <div className="w-24 h-px bg-luxury-dusty-rose mb-8" />
            <p className="font-luxury-sans text-xl md:text-2xl text-luxury-maroon/70 mb-12 leading-relaxed-luxury">
              With over 15 years of experience in luxury wedding planning, we bring unparalleled 
              expertise and attention to detail to every celebration. Our team of dedicated professionals 
              works tirelessly to ensure your special day exceeds every expectation.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-luxury-ivory to-luxury-soft-pink rounded-lg border border-luxury-taupe/20"
                >
                  <div className="font-luxury-serif text-4xl font-bold text-luxury-dusty-rose mb-2">
                    {stat.number}
                  </div>
                  <div className="font-luxury-sans text-luxury-maroon/70 font-medium tracking-wide uppercase text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full mt-3 mr-6 flex-shrink-0"></div>
                <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed text-lg">Personalized service tailored to your unique vision and style</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full mt-3 mr-6 flex-shrink-0"></div>
                <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed text-lg">Extensive network of premium vendors and exclusive venues</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full mt-3 mr-6 flex-shrink-0"></div>
                <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed text-lg">Seamless coordination and stress-free planning experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
