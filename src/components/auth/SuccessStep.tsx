import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Heart, Calendar, User } from "lucide-react";

interface SuccessStepProps {
  onNext: () => void;
  formData: any;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ onNext, formData }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[500px] flex items-center justify-center">
      {/* Simple Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `2s`
              }}
            >
              <Sparkles className="w-6 h-6 text-luxury-dusty-rose opacity-40" />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="text-center max-w-md mx-auto px-6">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="flex items-center justify-center gap-2 text-luxury-dusty-rose">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-luxury-sans text-sm">Welcome to the family!</span>
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-4">
          Welcome to Wedding Ease!
        </h1>
        
        <p className="font-luxury-sans text-luxury-maroon/70 text-lg mb-8 leading-relaxed">
          Your journey to the perfect wedding starts here, {formData.name?.split(' ')[0] || 'there'}! 
          Let's create something magical together.
        </p>

        {/* Beautiful Visual Elements */}
        <div className="flex items-center justify-center gap-8 mb-8 text-luxury-maroon/60">
          <div className="flex flex-col items-center">
            <Calendar className="w-8 h-8 mb-2" />
            <span className="font-luxury-sans text-xs">Plan</span>
          </div>
          <div className="w-12 border-t border-luxury-dusty-rose/30"></div>
          <div className="flex flex-col items-center">
            <Heart className="w-8 h-8 mb-2" />
            <span className="font-luxury-sans text-xs">Love</span>
          </div>
          <div className="w-12 border-t border-luxury-dusty-rose/30"></div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-8 h-8 mb-2" />
            <span className="font-luxury-sans text-xs">Celebrate</span>
          </div>
        </div>

        {/* Call to Action */}
        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-luxury-dusty-rose to-luxury-maroon hover:from-luxury-maroon hover:to-luxury-burgundy text-white py-4 text-lg font-luxury-sans font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          ✨ Enter My Account ✨
        </Button>

        {/* Subtle footer message */}
        <p className="font-luxury-sans text-xs text-luxury-maroon/50 mt-6">
          Your dream wedding awaits inside
        </p>
      </div>
    </div>
  );
};

export default SuccessStep; 