import React, { useState } from 'react';
import { Calendar, Clock, User, Star, ArrowLeft, ArrowRight, Video, CheckCircle } from 'lucide-react';

interface BookingStepProps {
  formData: {
    email: string;
    phone: string;
    name: string;
    authMethod: 'email' | 'phone' | 'google';
  };
  onNext: () => void;
  onPrevious: () => void;
  bookingContext?: {
    weddingDate?: string;
    message?: string;
    source?: string;
  } | null;
}

const BookingStep: React.FC<BookingStepProps> = ({ formData, onNext, onPrevious, bookingContext }) => {
  const [selectedConsultationType, setSelectedConsultationType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    // Pre-populate with wedding date from contact form if available
    bookingContext?.weddingDate ? new Date(bookingContext.weddingDate) : null
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedConsultant, setSelectedConsultant] = useState('');
  const [specialRequests, setSpecialRequests] = useState(
    // Pre-populate with message from contact form if available
    bookingContext?.message || ''
  );
  const [selectedWeek, setSelectedWeek] = useState(0);

  // DEBUGGING: This will show in browser console
  console.log('🚀 NEW BOOKING STEP COMPONENT LOADED!', { formData });

  const consultationTypes = [
    {
      id: 'complete-planning',
      title: 'Complete Wedding Planning',
      description: 'Full planning session • 60 min',
      duration: '60 min'
    },
    {
      id: 'design-decor',
      title: 'Design & Decor',
      description: 'Themes & styling focus • 45 min',
      duration: '45 min'
    },
    {
      id: 'venue-selection',
      title: 'Venue Selection',
      description: 'Location recommendations • 30 min',
      duration: '30 min'
    },
    {
      id: 'budget-planning',
      title: 'Budget Planning',
      description: 'Financial planning session • 45 min',
      duration: '45 min'
    }
  ];

  const consultants = [
    {
      id: 'sarah',
      name: 'Sarah Chen',
      title: 'Lead Wedding Planner',
      specialty: 'Luxury & Traditional Weddings',
      rating: 4.9,
      image: '/images/testimonial-1.jpg'
    },
    {
      id: 'michael',
      name: 'Michael Rodriguez',
      title: 'Design Specialist',
      specialty: 'Modern & Destination Weddings',
      rating: 4.8,
      image: '/images/testimonial-2.jpg'
    },
    {
      id: 'priya',
      name: 'Priya Sharma',
      title: 'Cultural Specialist',
      specialty: 'Indian & Multicultural Weddings',
      rating: 4.9,
      image: '/images/testimonial-3.jpg'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  const generateWeekDates = (weekOffset: number) => {
    const dates = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + (weekOffset * 7) + 1);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const weekDates = generateWeekDates(selectedWeek);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatWeekRange = () => {
    if (weekDates.length === 0) return '';
    const firstDate = weekDates[0];
    const lastDate = weekDates[weekDates.length - 1];
    return `${formatShortDate(firstDate)} - ${formatShortDate(lastDate)}`;
  };

  const handleBookingSubmit = () => {
    const bookingData = {
      consultationType: selectedConsultationType,
      date: selectedDate?.toISOString(),
      time: selectedTimeSlot,
      consultant: selectedConsultant,
      specialRequests,
      userInfo: formData
    };

    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    onNext();
  };

  const selectedTypeData = consultationTypes.find(type => type.id === selectedConsultationType);
  const selectedConsultantData = consultants.find(consultant => consultant.id === selectedConsultant);
  const isBookingComplete = selectedConsultationType && selectedDate && selectedTimeSlot && selectedConsultant;

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-soft-pink/10 via-white to-luxury-dusty-rose/5 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-4">
            Book Your Free Consultation
          </h1>
          <p className="font-luxury-sans text-luxury-maroon/70 text-lg max-w-2xl mx-auto mb-4">
            Schedule a complimentary consultation with one of our expert wedding planners.
          </p>
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-luxury-maroon/60">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Account Created</span>
            <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full"></div>
            <span className="font-medium text-luxury-maroon">Book Consultation</span>
          </div>
        </div>

        {/* Main Content - Compact 2-column layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left Column: Consultation Type */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20 shadow-lg">
            <h2 className="font-luxury-serif text-xl font-semibold text-luxury-maroon mb-6">
              Choose Your Consultation Type
            </h2>
            <div className="space-y-4">
              {consultationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedConsultationType(type.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                    selectedConsultationType === type.id
                      ? 'border-luxury-dusty-rose bg-luxury-dusty-rose/10 shadow-md'
                      : 'border-luxury-taupe/20 hover:border-luxury-taupe/40 hover:shadow-sm'
                  }`}
                >
                  <h3 className="font-luxury-serif font-semibold text-luxury-maroon mb-1">
                    {type.title}
                  </h3>
                  <p className="text-sm text-luxury-maroon/60 font-luxury-sans">
                    {type.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Date & Time Selection */}
          <div className="space-y-6">
            {/* Date Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20 shadow-lg">
              <h2 className="font-luxury-serif text-xl font-semibold text-luxury-maroon mb-4">
                Select Your Preferred Date
              </h2>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setSelectedWeek(selectedWeek - 1)}
                  className="p-2 hover:bg-luxury-taupe/10 rounded-lg transition-colors"
                  disabled={selectedWeek <= 0}
                >
                  <ArrowLeft className="w-4 h-4 text-luxury-maroon" />
                </button>
                <span className="font-luxury-sans font-medium text-luxury-maroon">
                  {formatWeekRange()}
                </span>
                <button
                  onClick={() => setSelectedWeek(selectedWeek + 1)}
                  className="p-2 hover:bg-luxury-taupe/10 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-luxury-maroon" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {weekDates.slice(0, 4).map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? 'border-luxury-dusty-rose bg-luxury-dusty-rose/10'
                        : 'border-luxury-taupe/20 hover:border-luxury-taupe/40'
                    }`}
                  >
                    <div className="text-xs font-luxury-sans mb-1 opacity-75">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-lg font-medium">
                      {date.getDate()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection - Always visible */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20 shadow-lg">
              <h2 className="font-luxury-serif text-xl font-semibold text-luxury-maroon mb-4">
                Available Times
              </h2>
              {!selectedDate ? (
                <p className="text-luxury-maroon/60 font-luxury-sans text-center py-8">
                  Please select a date to view available times
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`p-3 rounded-lg border text-center font-luxury-sans transition-all duration-300 ${
                        selectedTimeSlot === time
                          ? 'border-luxury-dusty-rose bg-luxury-dusty-rose/10 text-luxury-maroon'
                          : 'border-luxury-taupe/20 hover:border-luxury-taupe/40 text-luxury-maroon/70'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Summary & Action */}
        {selectedConsultationType && selectedDate && selectedTimeSlot && (
          <div className="bg-luxury-dusty-rose/10 backdrop-blur-sm rounded-xl p-6 border border-luxury-dusty-rose/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-2">
                  Booking Summary
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-luxury-maroon" />
                    <span className="font-luxury-sans text-luxury-maroon/70">
                      {selectedTypeData?.title} • {formatDate(selectedDate)} at {selectedTimeSlot}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleBookingSubmit}
                className="bg-luxury-maroon hover:bg-luxury-burgundy text-white px-8 py-3 rounded-lg font-luxury-sans font-medium transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingStep; 