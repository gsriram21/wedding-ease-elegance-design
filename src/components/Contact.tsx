import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    weddingDate: '',
    message: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is already authenticated
    if (user) {
      // User is already signed in, just show success message and handle booking
    toast({
      title: "Thank you for your inquiry!",
      description: "We'll get back to you within 24 hours to schedule your consultation.",
    });
      // Could redirect to account/bookings or open booking modal here
      navigate('/account?section=bookings');
    } else {
      // User is not signed in, store form data and redirect to signup
      const signupData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        weddingDate: formData.weddingDate,
        message: formData.message,
        source: 'contact_consultation' // To identify this came from contact form
      };

      // Store in localStorage for the signup process to pick up
      localStorage.setItem('weddingease_contact_data', JSON.stringify(signupData));
      
      // Show transitional message
      toast({
        title: "Almost there!",
        description: "We'll help you create an account to schedule your consultation.",
      });

      // Redirect to signup with a special parameter
      navigate('/auth?mode=signup&source=contact');
    }
  };

  return (
    <section id="contact" className="pt-24 lg:pt-32 pb-0 bg-white text-luxury-maroon">
      <div className="luxury-container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="font-luxury-serif font-bold text-5xl md:text-6xl mb-8 tracking-tight text-luxury-maroon">
              Let's Create Your Perfect Wedding
            </h2>
            <div className="w-24 h-px bg-luxury-dusty-rose mb-8" />
            <p className="font-luxury-sans text-xl md:text-2xl mb-12 leading-relaxed-luxury text-luxury-maroon/80">
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
                  <p className="font-luxury-sans font-semibold text-luxury-maroon tracking-wide uppercase text-sm mb-1">Phone</p>
                  <p className="font-luxury-sans text-luxury-maroon/80 text-lg">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-lg flex items-center justify-center mr-6">
                  <svg className="w-6 h-6 text-luxury-dusty-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-luxury-sans font-semibold text-luxury-maroon tracking-wide uppercase text-sm mb-1">Email</p>
                  <p className="font-luxury-sans text-luxury-maroon/80 text-lg">hello@weddingease.com</p>
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
                  <p className="font-luxury-sans font-semibold text-luxury-maroon tracking-wide uppercase text-sm mb-1">Office</p>
                  <p className="font-luxury-sans text-luxury-maroon/80 text-lg">Beverly Hills, California</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-12 border border-luxury-dusty-rose/20 shadow-xl">
              <h3 className="font-luxury-serif font-bold text-3xl md:text-4xl text-luxury-maroon mb-8 tracking-tight">
                Book Your Consultation
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-white/80 border border-luxury-maroon/20 rounded-lg placeholder-luxury-maroon/60 text-luxury-maroon font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/30 transition-colors duration-300"
                    required
                  />
                
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-white/80 border border-luxury-maroon/20 rounded-lg placeholder-luxury-maroon/60 text-luxury-maroon font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/30 transition-colors duration-300"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-white/80 border border-luxury-maroon/20 rounded-lg placeholder-luxury-maroon/60 text-luxury-maroon font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/30 transition-colors duration-300"
                />
                
                <input
                  type="date"
                  placeholder="Wedding Date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-white/80 border border-luxury-maroon/20 rounded-lg placeholder-luxury-maroon/60 text-luxury-maroon font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/30 transition-colors duration-300"
                />
                
                <textarea
                  placeholder="Tell us about your dream wedding..."
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-6 py-4 bg-white/80 border border-luxury-maroon/20 rounded-lg placeholder-luxury-maroon/60 text-luxury-maroon font-luxury-sans focus:outline-none focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/30 resize-none transition-colors duration-300"
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
      
      <footer className="mt-24 pt-16 pb-8 mb-0 bg-gradient-to-br from-luxury-ivory via-luxury-soft-pink to-luxury-blush relative overflow-hidden border-t border-luxury-maroon/10">
        {/* Elegant Wedding Rings Watermark - Positioned at top */}
        <div className="absolute top-8 right-8 pointer-events-none overflow-hidden opacity-15">
          <div className="relative">
            {/* Main Ring Composition */}
            <svg 
              className="w-48 h-48 text-luxury-maroon/60" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Elegant Overlapping Rings */}
              {/* First Ring - Engagement Ring */}
              <circle 
                cx="130" 
                cy="150" 
                r="45" 
                strokeWidth="2.5" 
                className="opacity-80"
                strokeLinecap="round"
              />
              <circle 
                cx="130" 
                cy="150" 
                r="38" 
                strokeWidth="1.5" 
                className="opacity-60"
              />
              
              {/* Second Ring - Wedding Band */}
              <circle 
                cx="170" 
                cy="150" 
                r="42" 
                strokeWidth="2.5" 
                className="opacity-80"
                strokeLinecap="round"
              />
              <circle 
                cx="170" 
                cy="150" 
                r="35" 
                strokeWidth="1.5" 
                className="opacity-60"
              />
              
              {/* Elegant Diamond Accent */}
              <g className="opacity-70">
                <polygon 
                  points="130,105 136,115 130,125 124,115" 
                  fill="currentColor" 
                  className="opacity-80"
                />
                <circle cx="130" cy="115" r="2" fill="currentColor" className="opacity-90" />
              </g>
            </svg>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12 relative z-10">
          {/* Newsletter Signup Section */}
          <div className="mb-16 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-luxury-maroon/10 shadow-xl">
            <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
              Stay Connected with Wedding Ease
            </h3>
            <p className="font-luxury-sans text-lg text-luxury-maroon/80 mb-6 max-w-2xl mx-auto">
              Get exclusive wedding inspiration, vendor spotlights, and early access to new products delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-luxury-maroon placeholder:text-luxury-maroon/60 border border-luxury-maroon/20 focus:ring-2 focus:ring-luxury-dusty-rose/30 focus:border-luxury-dusty-rose"
              />
              <button className="bg-luxury-maroon text-white px-6 py-3 rounded-lg hover:bg-luxury-burgundy transition-colors duration-300 font-luxury-sans font-medium">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            {/* Get to Know Us */}
            <div>
              <h4 className="font-luxury-serif text-lg font-bold text-luxury-maroon mb-6">
                Get to Know Us
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="/about/founder-story" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    About Wedding Ease
                  </a>
                </li>
                <li>
                  <a 
                    href="/about/founder-story" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Founder's Story
                  </a>
                </li>
                <li>
                  <a 
                    href="/blog" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Wedding Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:careers@weddingease.com" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:press@weddingease.com" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Press & Media
                  </a>
                </li>
                <li>
                  <a 
                    href="/sustainability" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Sustainability
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect with Us */}
            <div>
              <h4 className="font-luxury-serif text-lg font-bold text-luxury-maroon mb-6">
                Connect with Us
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://www.facebook.com/weddingease.io" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/weddingease" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="https://x.com/TheWeddingEase" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://tiktok.com/@weddingease" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </div>

            {/* Sell with Wedding Ease */}
            <div>
              <h4 className="font-luxury-serif text-lg font-bold text-luxury-maroon mb-6">
                Sell with Wedding Ease
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="/vendor/apply" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Become a Vendor
                  </a>
                </li>
                <li>
                  <a 
                    href="/vendor/marketplace" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Marketplace Program
                  </a>
                </li>
                <li>
                  <a 
                    href="/vendor/accelerator" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Vendor Accelerator
                  </a>
                </li>
                <li>
                  <a 
                    href="/vendor/fulfillment" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Fulfillment Services
                  </a>
                </li>
                <li>
                  <a 
                    href="/vendor/advertising" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Advertise Your Products
                  </a>
                </li>
                <li>
                  <a 
                    href="/vendor/support" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Vendor Support Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Help & Support */}
            <div>
              <h4 className="font-luxury-serif text-lg font-bold text-luxury-maroon mb-6">
                Help & Support
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="/account" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Your Account
                  </a>
                </li>
                <li>
                  <a 
                    href="/account?section=order" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Order History
                  </a>
                </li>
                <li>
                  <a 
                    href="/returns" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a 
                    href="/shipping" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Shipping Information
                  </a>
                </li>
                <li>
                  <a 
                    href="/help" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    FAQ & Help Center
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    className="font-luxury-sans text-luxury-maroon/70 hover:text-luxury-maroon transition-colors duration-300 text-sm"
                  >
                    Contact Customer Care
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-luxury-maroon/20 pt-8">
            {/* Legal Links & Copyright */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-wrap gap-6">
                <a 
                  href="/terms" 
                  className="font-luxury-sans text-luxury-maroon/60 hover:text-luxury-maroon text-xs transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a 
                  href="/privacy" 
                  className="font-luxury-sans text-luxury-maroon/60 hover:text-luxury-maroon text-xs transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/cookies" 
                  className="font-luxury-sans text-luxury-maroon/60 hover:text-luxury-maroon text-xs transition-colors duration-300"
                >
                  Cookie Policy
                </a>
                <a 
                  href="/accessibility" 
                  className="font-luxury-sans text-luxury-maroon/60 hover:text-luxury-maroon text-xs transition-colors duration-300"
                >
                  Accessibility
                </a>
                <a 
                  href="/intellectual-property" 
                  className="font-luxury-sans text-luxury-maroon/60 hover:text-luxury-maroon text-xs transition-colors duration-300"
                >
                  Intellectual Property
                </a>
              </div>

              <div className="text-center lg:text-right">
                <p className="font-luxury-sans text-luxury-maroon/60 text-xs mb-1">
                  © 2024 Wedding Ease. All rights reserved.
                </p>
                <p className="font-luxury-sans text-luxury-maroon/50 text-xs">
                  Creating luxury weddings worldwide with love and dedication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
