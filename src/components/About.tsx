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
    <section id="about" className="relative overflow-hidden py-20 bg-white">
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
            <h2 className="font-luxury-serif font-bold text-4xl md:text-5xl text-luxury-maroon mb-6 tracking-tight">
              Why Choose Wedding Ease?
            </h2>
            <div className="w-16 h-px bg-luxury-dusty-rose mb-6" />
            <p className="font-luxury-sans text-lg md:text-xl text-luxury-maroon/70 mb-10 leading-relaxed">
              With over 15 years of experience in luxury wedding planning, we bring unparalleled 
              expertise and attention to detail to every celebration.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gradient-to-br from-luxury-ivory to-luxury-soft-pink rounded-lg border border-luxury-taupe/20"
                >
                  <div className="font-luxury-serif text-3xl font-bold text-luxury-dusty-rose mb-2">
                    {stat.number}
                  </div>
                  <div className="font-luxury-sans text-luxury-maroon/70 font-medium tracking-wide uppercase text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed">Personalized service tailored to your unique vision</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed">Extensive network of premium vendors and venues</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="font-luxury-sans text-luxury-maroon/80 leading-relaxed">Seamless coordination and stress-free planning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
