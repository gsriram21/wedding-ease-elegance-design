
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-serif font-bold text-stone-900">Wedding Ease</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-stone-700 hover:text-amber-800 transition-colors duration-200 font-medium">Home</a>
              <a href="#services" className="text-stone-700 hover:text-amber-800 transition-colors duration-200 font-medium">Services</a>
              <a href="#packages" className="text-stone-700 hover:text-amber-800 transition-colors duration-200 font-medium">Packages</a>
              <a href="#about" className="text-stone-700 hover:text-amber-800 transition-colors duration-200 font-medium">About</a>
              <a href="#contact" className="text-stone-700 hover:text-amber-800 transition-colors duration-200 font-medium">Contact</a>
            </div>
          </div>

          <div className="hidden md:block">
            <Button className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-sm transition-all duration-200 font-medium">
              Book Consultation
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700 hover:text-amber-800 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-stone-700 hover:text-amber-800">Home</a>
            <a href="#services" className="block px-3 py-2 text-stone-700 hover:text-amber-800">Services</a>
            <a href="#packages" className="block px-3 py-2 text-stone-700 hover:text-amber-800">Packages</a>
            <a href="#about" className="block px-3 py-2 text-stone-700 hover:text-amber-800">About</a>
            <a href="#contact" className="block px-3 py-2 text-stone-700 hover:text-amber-800">Contact</a>
            <div className="px-3 py-2">
              <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
