import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
                onClick={() => navigate('/')}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                Home
              </button>
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
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                Services
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
              <button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                About
              </button>
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
