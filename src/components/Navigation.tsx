import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Heart, User, Gem, FileText, Gift, Calendar } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const aboutMenuItems = [
    {
      title: "Founder's Story",
      description: "Our journey and company philosophy",
      icon: User,
      path: "/about/founder-story"
    },
    {
      title: "Blogs",
      description: "Latest insights and wedding trends", 
      icon: FileText,
      path: "/blog"
    },
    {
      title: "Our Luxury Offerings",
      description: "",
      icon: null,
      isCategory: true
    },
    {
      title: "Wedding Attire",
      description: "Bridal gowns and groom's wear",
      icon: Heart,
      path: "/products?category=attire",
      isSubItem: true
    },
    {
      title: "Luxury Jewellery", 
      description: "Exquisite bridal jewelry collections",
      icon: Gem,
      path: "/products?category=jewelry",
      isSubItem: true
    },
    {
      title: "Invites & Stationery",
      description: "Elegant wedding invitations",
      icon: FileText,
      path: "/products?category=invites",
      isSubItem: true
    },
    {
      title: "Gifts & Favours",
      description: "Wedding gifts and guest favors",
      icon: Gift,
      path: "/products?category=gifts",
      isSubItem: true
    },
    {
      title: "Accessories",
      description: "Complete your perfect look",
      icon: Gem,
      path: "/products?category=accessories",
      isSubItem: true
    },
    {
      title: "Wedding Planning Packages",
      description: "Full-service wedding planning",
      icon: Calendar,
      path: "/#packages",
      isSubItem: true
    }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-luxury-taupe/30">
      <div className="luxury-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo on the left */}
          <div className="flex-1 flex justify-start">
            <div className="flex items-center mr-12">
              <img 
                src="/images/logo.png" 
                alt="Wedding Ease Logo" 
                className="h-12 w-auto cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>
          </div>
          
          {/* Centered navigation links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-baseline space-x-8">
              <button 
                onClick={() => navigate('/products')}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                Products
              </button>
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                Packages
              </button>
              
              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button 
                  className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm flex items-center gap-1"
                >
                  About
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ${aboutDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                  <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-luxury-taupe/20 p-6 min-w-[320px] max-w-[400px]">
                    <div className="space-y-1">
                      {aboutMenuItems.map((item, index) => {
                        if (item.isCategory) {
                          return (
                            <div key={index} className="pt-4 pb-2 border-t border-luxury-taupe/20 mt-4 first:mt-0 first:pt-0 first:border-t-0">
                              <h3 className="font-luxury-serif font-bold text-luxury-maroon text-sm tracking-wide uppercase">
                                {item.title}
                              </h3>
                            </div>
                          );
                        }
                        
                        const Icon = item.icon;
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              setAboutDropdownOpen(false);
                              if (item.path?.startsWith('/#')) {
                                navigate('/');
                                setTimeout(() => {
                                  document.getElementById(item.path.split('#')[1])?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              } else {
                                navigate(item.path || '/');
                              }
                            }}
                            className={`w-full text-left p-3 rounded-lg hover:bg-luxury-soft-pink/20 transition-all duration-200 group ${item.isSubItem ? 'ml-4' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              {Icon && (
                                <div className="w-8 h-8 bg-luxury-dusty-rose/10 rounded-md flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white transition-all duration-200">
                                  <Icon className="w-4 h-4 text-luxury-dusty-rose group-hover:text-white" />
                                </div>
                              )}
                              <div className="flex-1">
                                <h4 className="font-luxury-serif font-semibold text-luxury-maroon group-hover:text-luxury-dusty-rose transition-colors duration-200">
                                  {item.title}
                                </h4>
                                {item.description && (
                                  <p className="text-xs text-luxury-maroon/60 mt-1 font-luxury-sans">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Right side - Account and Ease Bot buttons */}
          <div className="flex justify-end flex-1 items-center gap-6">
            <Button 
              onClick={() => navigate('/account')}
              variant="outline"
              className="bg-transparent text-luxury-maroon font-luxury-sans tracking-wide uppercase text-sm px-6 py-2 rounded-lg border-2 border-luxury-maroon hover:bg-luxury-maroon hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ml-12"
            >
              <span className="hidden sm:inline">Account</span>
            </Button>
            
            <Button 
              className="text-white font-luxury-sans tracking-wide uppercase text-sm px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:bg-opacity-90"
              style={{ backgroundColor: '#1a0000' }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Ease Bot</span>
              <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-md">AI</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
