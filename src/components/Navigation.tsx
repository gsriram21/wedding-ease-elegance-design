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
            <div className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Wedding Ease Logo" 
                className="h-12 w-auto"
              />
            </div>
          </div>
          
          {/* Centered navigation links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-baseline space-x-12">
              <a href="#home" className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm">
                Home
              </a>
              <a href="#services" className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm">
                Services
              </a>
              <a href="#packages" className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm">
                Packages
              </a>
              <a href="#about" className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm">
                About
              </a>
              <a href="#contact" className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* Right side - Account and Ease Bot buttons */}
          <div className="flex justify-end flex-1 gap-4">
            <Button 
              onClick={() => navigate('/account')}
              className="bg-transparent text-luxury-maroon font-luxury-sans tracking-wide uppercase text-sm px-4 py-2 rounded-lg border-2 border-luxury-maroon hover:bg-luxury-maroon hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <span className="hidden sm:inline">Account</span>
            </Button>
            <Button 
              className="text-white font-luxury-sans tracking-wide uppercase text-sm px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:bg-opacity-90"
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
