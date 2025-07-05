import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your inquiry!",
      description: "We'll get back to you within 24 hours to schedule your consultation.",
    });
  };

  return (
    <section id="contact" className="luxury-spacing bg-luxury-dark-brown text-luxury-ivory">
      <div className="luxury-container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="font-luxury-serif font-bold text-5xl md:text-6xl mb-8 tracking-tight">
              Let's Create Your Perfect Wedding
            </h2>
            <div className="w-24 h-px bg-luxury-dusty-rose mb-8" />
            <p className="font-luxury-sans text-xl md:text-2xl mb-12 leading-relaxed-luxury text-luxury-ivory/80">
              Ready to begin planning the wedding of your dreams? Contact us today 
              for a complimentary consultation and let's start bringing your vision to life.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-lg flex items-center justify-center mr-6">
                  <svg className="w-6 h-6 text-luxury-dusty-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-luxury-sans font-semibold text-luxury-ivory tracking-wide uppercase text-sm mb-1">Phone</p>
                  <p className="font-luxury-sans text-luxury-ivory/80 text-lg">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-lg flex items-center justify-center mr-6">
                  <svg className="w-6 h-6 text-luxury-dusty-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-luxury-sans font-semibold text-luxury-ivory tracking-wide uppercase text-sm mb-1">Email</p>
                  <p className="font-luxury-sans text-luxury-ivory/80 text-lg">hello@weddingease.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-lg flex items-center justify-center mr-6">
                  <svg className="w-6 h-6 text-luxury-dusty-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-luxury-sans font-semibold text-luxury-ivory tracking-wide uppercase text-sm mb-1">Office</p>
                  <p className="font-luxury-sans text-luxury-ivory/80 text-lg">Beverly Hills, California</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-luxury-ivory/10 backdrop-blur-sm rounded-lg p-12 border border-luxury-dusty-rose/20">
              <h3 className="font-luxury-serif font-bold text-3xl md:text-4xl text-luxury-ivory mb-8 tracking-tight">
                Book Your Consultation
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-6 py-4 bg-luxury-ivory/10 border border-luxury-ivory/20 rounded-lg placeholder-luxury-ivory/70 text-luxury-ivory font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose/50 transition-colors duration-300"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-6 py-4 bg-luxury-ivory/10 border border-luxury-ivory/20 rounded-lg placeholder-luxury-ivory/70 text-luxury-ivory font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose/50 transition-colors duration-300"
                    required
                  />
                </div>
                
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-luxury-ivory/10 border border-luxury-ivory/20 rounded-lg placeholder-luxury-ivory/70 text-luxury-ivory font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose/50 transition-colors duration-300"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 bg-luxury-ivory/10 border border-luxury-ivory/20 rounded-lg placeholder-luxury-ivory/70 text-luxury-ivory font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose/50 transition-colors duration-300"
                />
                
                <input
                  type="date"
                  placeholder="Wedding Date"
                  className="w-full px-6 py-4 bg-luxury-ivory/10 border border-luxury-ivory/20 rounded-lg placeholder-luxury-ivory/70 text-luxury-ivory font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose/50 transition-colors duration-300"
                />
                
                <textarea
                  placeholder="Tell us about your dream wedding..."
                  rows={4}
                  className="w-full px-6 py-4 bg-luxury-ivory/10 border border-luxury-ivory/20 rounded-lg placeholder-luxury-ivory/70 text-luxury-ivory font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose/50 resize-none transition-colors duration-300"
                ></textarea>
                
                <Button 
                  type="submit"
                  className="w-full bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white py-4 text-lg font-luxury-sans font-semibold tracking-wide uppercase transition-all duration-300 hover:shadow-xl"
                >
                  Schedule Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-24 pt-12 border-t border-luxury-ivory/20 text-center">
        <p className="font-luxury-sans text-luxury-ivory/70 tracking-wide">
          © 2024 Wedding Ease. All rights reserved. Creating luxury weddings worldwide.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
