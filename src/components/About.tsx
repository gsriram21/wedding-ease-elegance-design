
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
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                alt="Wedding planning consultation"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-800 text-white p-6 rounded-lg">
                <p className="text-2xl font-bold">15+ Years</p>
                <p className="text-sm">Experience</p>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              Why Choose Wedding Ease?
            </h2>
            <p className="text-xl text-stone-600 mb-8 leading-relaxed">
              With over 15 years of experience in luxury wedding planning, we bring unparalleled 
              expertise and attention to detail to every celebration. Our team of dedicated professionals 
              works tirelessly to ensure your special day exceeds every expectation.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-stone-50 rounded-lg"
                >
                  <div className="text-3xl font-bold text-amber-800 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-stone-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-800 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-stone-700">Personalized service tailored to your unique vision and style</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-800 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-stone-700">Extensive network of premium vendors and exclusive venues</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-amber-800 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <p className="text-stone-700">Seamless coordination and stress-free planning experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
