
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
    <section id="contact" className="py-24 bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Let's Create Your Perfect Wedding
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              Ready to begin planning the wedding of your dreams? Contact us today 
              for a complimentary consultation and let's start bringing your vision to life.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="opacity-90">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="opacity-90">hello@weddingease.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="font-semibold">Office</p>
                  <p className="opacity-90">Beverly Hills, California</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-2xl font-serif font-bold mb-6">
                Book Your Consultation
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white/50"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white/50"
                    required
                  />
                </div>
                
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white/50"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white/50"
                />
                
                <input
                  type="date"
                  placeholder="Wedding Date"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white/50"
                />
                
                <textarea
                  placeholder="Tell us about your dream wedding..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/70 text-white focus:outline-none focus:border-white/50 resize-none"
                ></textarea>
                
                <Button 
                  type="submit"
                  className="w-full bg-white text-amber-900 hover:bg-stone-100 py-3 text-lg font-semibold transition-all duration-300"
                >
                  Schedule Consultation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-16 pt-8 border-t border-white/20 text-center">
        <p className="opacity-70">
          © 2024 Wedding Ease. All rights reserved. Creating luxury weddings worldwide.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
