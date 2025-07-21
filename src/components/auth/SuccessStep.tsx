import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Heart, Calendar, User } from "lucide-react";

interface SuccessStepProps {
  onNext: () => void;
  formData: any;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ onNext, formData }) => {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      {/* Main Content */}
      <div className="text-center max-w-md mx-auto px-6">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

        </div>

        {/* Welcome Message */}
        <h1 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-luxury-maroon mb-4 text-center">
          Welcome to Wedding&nbsp;Ease!
        </h1>
        
        <p className="text-luxury-data-supporting text-base sm:text-lg mb-8 text-center max-w-md mx-auto">
          Your journey to the perfect wedding starts&nbsp;here, {formData.name?.split(' ')[0] || 'there'}!
        </p>

        {/* Beautiful Visual Elements */}
        <div className="flex items-center justify-center gap-8 mb-8 text-luxury-maroon/60">
          <div className="flex flex-col items-center">
            <Calendar className="w-8 h-8 mb-2" />
            <span className="text-luxury-caption">Plan</span>
          </div>
          <div className="w-12 border-t border-luxury-dusty-rose/30"></div>
          <div className="flex flex-col items-center">
            <Heart className="w-8 h-8 mb-2" />
            <span className="text-luxury-caption">Love</span>
          </div>
          <div className="w-12 border-t border-luxury-dusty-rose/30"></div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-8 h-8 mb-2" />
            <span className="text-luxury-caption">Celebrate</span>
          </div>
        </div>

        {/* Call to Action */}
        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-luxury-dusty-rose to-luxury-maroon hover:from-luxury-maroon hover:to-luxury-burgundy text-white py-4 text-lg font-luxury-sans font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          ✨ Enter My Account ✨
        </Button>


      </div>
    </div>
  );
};

export default SuccessStep; 