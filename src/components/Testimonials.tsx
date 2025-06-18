
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
      quote: "Wedding Ease turned our dream wedding into a reality beyond our wildest expectations. Every detail was perfect, and the day flowed seamlessly. We couldn't have asked for a better team.",
      author: "Sarah & Michael Johnson",
      location: "Tuscany, Italy",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=400&q=80"
    },
    {
      quote: "The attention to detail and level of service provided by Wedding Ease was exceptional. They handled everything with such professionalism and care. Our wedding was absolutely magical.",
      author: "Priya & Raj Patel",
      location: "Udaipur, India",
      image: "https://images.unsplash.com/photo-1606218628635-18dd9b70e6c2?auto=format&fit=crop&w=400&q=80"
    },
    {
      quote: "From the initial consultation to the last dance, Wedding Ease made our destination wedding stress-free and unforgettable. Their expertise in luxury planning is unmatched.",
      author: "Emma & James Wilson",
      location: "Santorini, Greece", 
      image: "https://images.unsplash.com/photo-1594736797933-d0c1fec3a96c?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            What Our Couples Say
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what some of our happy couples 
            have to say about their Wedding Ease experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-8 transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
              </div>
              
              <blockquote className="text-stone-700 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="text-center">
                <p className="font-semibold text-stone-900 mb-1">
                  {testimonial.author}
                </p>
                <p className="text-stone-500 text-sm">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
