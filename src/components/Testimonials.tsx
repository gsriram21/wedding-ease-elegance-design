import { useEffect, useState } from "react";

const Testimonials = () => {
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

    const element = document.getElementById('testimonials');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const testimonials = [
    {
      quote: "The team at Wedding Ease exceeded all our expectations. Their attention to detail and ability to bring our vision to life was incredible. Our wedding was absolutely perfect!",
      author: "Ananya & Vikram",
      location: "Delhi",
      image: "/images/Jun 17, 2025 at 07_46_55 PM.png"
    },
    {
      quote: "Wedding Ease made our dream wedding come true! Every detail was perfect, from the stunning venue to the flawless coordination. Our guests are still talking about how magical everything was.",
      author: "Priya & Rajesh",
      location: "Mumbai",
      image: "/images/aastha-bansal-W1wkx5kcaBk-unsplash.jpg"
    },
    {
      quote: "From our first consultation to the last dance, Wedding Ease handled everything with such professionalism and care. They made our special day stress-free and unforgettable.",
      author: "Kavya & Arjun",
      location: "Bangalore",
      image: "/images/51CB7100-724A-4F77-9B92-753CB27F47F9.png"
    }
  ];

  return (
    <section id="testimonials" className="luxury-spacing bg-gradient-to-br from-luxury-ivory via-luxury-soft-pink to-luxury-ivory">
      <div className="luxury-container">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-luxury-serif font-bold text-5xl md:text-6xl text-luxury-maroon mb-8 tracking-tight">
            What Our Couples Say
          </h2>
          <div className="w-24 h-px bg-luxury-dusty-rose mx-auto mb-8" />
          <p className="font-luxury-sans text-xl md:text-2xl text-luxury-maroon/70 max-w-3xl mx-auto leading-relaxed-luxury">
            Hear from the couples who trusted us to make their wedding dreams come true
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-luxury-taupe/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="mb-8">
                  <img
                    src={testimonial.image}
                    alt={`Wedding photo of ${testimonial.author}`}
                    className={`w-full h-64 object-cover rounded-lg shadow-lg ${
                      index === 0 ? 'object-[center_25%]' : 
                      index === 1 ? 'object-[center_40%]' : 'object-top'
                    }`}
                  />
                </div>
                
                <div className="mb-8">
                  <svg className="w-8 h-8 text-luxury-dusty-rose mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="font-luxury-sans text-luxury-maroon/80 text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="border-t border-luxury-taupe/20 pt-6">
                  <p className="font-luxury-serif text-luxury-maroon font-semibold text-xl mb-1">
                    {testimonial.author}
                  </p>
                  <p className="font-luxury-sans text-luxury-maroon/60 text-sm tracking-wide uppercase">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
