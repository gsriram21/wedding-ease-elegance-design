import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, User, Phone, CheckCircle, XCircle, BarChart3, Plus, MessageSquare, Star, ArrowLeft, ArrowRight } from "lucide-react";
import Navigation from "./Navigation";

interface Booking {
  id: string;
  title: string;
  consultant: string;
  consultantImage: string;
  date: Date;
  time: string;
  duration: number;
  type: 'video' | 'phone';
  status: 'upcoming' | 'completed' | 'canceled';
  platform: string;
  summary?: string;
  rating?: number;
  notes?: string;
  packageType: string;
}

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'canceled' | 'analytics' | 'new'>('upcoming');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);

  // Mock data for bookings
  const bookings: Booking[] = [
    {
      id: '1',
      title: 'Wedding Planning Consultation',
      consultant: 'Priya Sharma',
      consultantImage: '/images/testimonial-1.jpg',
      date: new Date('2024-01-25'),
      time: '2:00 PM',
      duration: 60,
      type: 'video',
      status: 'upcoming',
      platform: 'Microsoft Teams',
      packageType: 'Premium Planning'
    },
    {
      id: '2',
      title: 'Venue Selection Discussion',
      consultant: 'Rajesh Kumar',
      consultantImage: '/images/testimonial-2.jpg',
      date: new Date('2024-01-20'),
      time: '10:00 AM',
      duration: 45,
      type: 'video',
      status: 'completed',
      platform: 'Zoom',
      summary: 'Discussed 5 potential venues. Client loved Heritage Palace and Grand Ballroom. Next steps: site visits scheduled.',
      rating: 5,
      notes: 'Client preferred traditional venues with garden spaces.',
      packageType: 'Venue Advisory'
    },
    {
      id: '3',
      title: 'Catering Menu Planning',
      consultant: 'Meera Patel',
      consultantImage: '/images/testimonial-3.jpg',
      date: new Date('2024-01-18'),
      time: '4:00 PM',
      duration: 30,
      type: 'phone',
      status: 'completed',
      platform: 'Phone Call',
      summary: 'Finalized multi-cuisine menu with emphasis on regional specialties. Dietary restrictions noted.',
      rating: 4,
      packageType: 'Catering Consultation'
    },
    {
      id: '4',
      title: 'Budget Planning Session',
      consultant: 'Ankit Verma',
      consultantImage: '/images/testimonial-1.jpg',
      date: new Date('2024-01-15'),
      time: '11:00 AM',
      duration: 60,
      type: 'video',
      status: 'canceled',
      platform: 'Microsoft Teams',
      notes: 'Client had to cancel due to family emergency. Rescheduling requested.',
      packageType: 'Budget Advisory'
    }
  ];

  // Mock consultants
  const consultants = [
    {
      id: 'priya',
      name: 'Priya Sharma',
      image: '/images/testimonial-1.jpg',
      specialty: 'Full Wedding Planning',
      rating: 4.9,
      experience: '8+ years'
    },
    {
      id: 'rajesh',
      name: 'Rajesh Kumar',
      image: '/images/testimonial-2.jpg',
      specialty: 'Venue & Decor',
      rating: 4.8,
      experience: '6+ years'
    },
    {
      id: 'meera',
      name: 'Meera Patel',
      image: '/images/testimonial-3.jpg',
      specialty: 'Catering & Menu',
      rating: 4.9,
      experience: '5+ years'
    }
  ];

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Generate week dates
  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedWeek);

  const filterBookings = (status: 'upcoming' | 'completed' | 'canceled') => {
    return bookings.filter(booking => booking.status === status);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'canceled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-luxury-taupe/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon">Total Consultations</h3>
              <p className="text-luxury-maroon/60 text-sm">This month</p>
            </div>
          </div>
          <div className="text-3xl font-luxury-serif font-bold text-luxury-maroon mb-2">12</div>
          <div className="text-sm text-green-600">+3 from last month</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-luxury-taupe/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon">Completed Sessions</h3>
              <p className="text-luxury-maroon/60 text-sm">Success rate</p>
            </div>
          </div>
          <div className="text-3xl font-luxury-serif font-bold text-luxury-maroon mb-2">89%</div>
          <div className="text-sm text-green-600">+5% improvement</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-luxury-taupe/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon">Average Rating</h3>
              <p className="text-luxury-maroon/60 text-sm">Client satisfaction</p>
            </div>
          </div>
          <div className="text-3xl font-luxury-serif font-bold text-luxury-maroon mb-2">4.8</div>
          <div className="text-sm text-green-600">+0.2 from last month</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-luxury-taupe/20">
        <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon mb-4">Booking Trends</h3>
        <div className="h-64 bg-gradient-to-r from-luxury-taupe/10 to-luxury-dusty-rose/10 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-luxury-dusty-rose mx-auto mb-4" />
            <p className="text-luxury-maroon/60 font-luxury-sans">Analytics visualization would appear here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewBooking = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Consultant Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-luxury-taupe/20">
        <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon mb-6">Choose Your Consultant</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {consultants.map((consultant) => (
            <button
              key={consultant.id}
              onClick={() => setSelectedConsultant(consultant.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedConsultant === consultant.id
                  ? 'border-luxury-dusty-rose bg-luxury-dusty-rose/5'
                  : 'border-luxury-taupe/30 hover:border-luxury-dusty-rose/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={consultant.image}
                  alt={consultant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-luxury-serif font-semibold text-luxury-maroon">{consultant.name}</h4>
                  <p className="text-sm text-luxury-maroon/60">{consultant.specialty}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-luxury-maroon/60">{consultant.experience}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-luxury-maroon/80">{consultant.rating}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-luxury-taupe/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon">Select Date & Time</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedWeek(prev => prev - 1)}
              className="border-luxury-taupe/30"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedWeek(prev => prev + 1)}
              className="border-luxury-taupe/30"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="grid grid-cols-7 gap-4 mb-6">
          {weekDates.map((date, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-luxury-maroon/60 font-luxury-sans mb-2">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-lg font-luxury-serif font-semibold text-luxury-maroon">
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-4 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTimeSlot(time)}
              className={`p-3 rounded-lg border transition-all duration-300 font-luxury-sans ${
                selectedTimeSlot === time
                  ? 'border-luxury-dusty-rose bg-luxury-dusty-rose text-white'
                  : 'border-luxury-taupe/30 text-luxury-maroon hover:border-luxury-dusty-rose'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Summary */}
      {selectedConsultant && selectedTimeSlot && (
        <div className="bg-gradient-to-r from-luxury-dusty-rose/10 to-luxury-maroon/10 rounded-2xl p-6 border border-luxury-dusty-rose/30">
          <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon mb-4">Booking Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-luxury-maroon/70">Consultant:</span>
              <span className="font-semibold text-luxury-maroon">
                {consultants.find(c => c.id === selectedConsultant)?.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-luxury-maroon/70">Date:</span>
              <span className="font-semibold text-luxury-maroon">
                {weekDates[0].toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-luxury-maroon/70">Time:</span>
              <span className="font-semibold text-luxury-maroon">{selectedTimeSlot}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-luxury-maroon/70">Duration:</span>
              <span className="font-semibold text-luxury-maroon">60 minutes</span>
            </div>
          </div>
          <Button className="w-full mt-6 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans py-3 rounded-xl">
            Confirm Booking
          </Button>
        </div>
      )}
    </div>
  );

  const renderBookingsList = (status: 'upcoming' | 'completed' | 'canceled') => {
    const statusBookings = filterBookings(status);

    return (
      <div className="space-y-4">
        {statusBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-lg border border-luxury-taupe/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={booking.consultantImage}
                  alt={booking.consultant}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-1">
                    {booking.title}
                  </h3>
                  <p className="text-luxury-maroon/70 font-luxury-sans mb-2">
                    with {booking.consultant}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-luxury-maroon/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {booking.date.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {booking.time}
                    </div>
                    <div className="flex items-center gap-1">
                      {booking.type === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                      {booking.platform}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(booking.status)}
                <span className="text-sm font-luxury-sans capitalize">{booking.status}</span>
              </div>
            </div>

            {booking.summary && (
              <div className="bg-luxury-taupe/10 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-luxury-dusty-rose" />
                  <span className="font-luxury-sans font-semibold text-luxury-maroon">Session Summary</span>
                </div>
                <p className="text-luxury-maroon/80 font-luxury-sans text-sm leading-relaxed">
                  {booking.summary}
                </p>
              </div>
            )}

            {booking.rating && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-luxury-maroon/70 font-luxury-sans">Your Rating:</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-luxury-maroon/60 bg-luxury-taupe/20 px-3 py-1 rounded-full">
                {booking.packageType}
              </span>
              {booking.status === 'upcoming' && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-luxury-taupe/30">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}

        {statusBookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-luxury-taupe/20">
            <Calendar className="w-16 h-16 text-luxury-dusty-rose/40 mx-auto mb-4" />
            <h3 className="font-luxury-serif font-semibold text-lg text-luxury-maroon mb-2">
              No {status} bookings
            </h3>
            <p className="text-luxury-maroon/60 font-luxury-sans">
              {status === 'upcoming' && "You don't have any upcoming consultations scheduled."}
              {status === 'completed' && "You haven't completed any consultations yet."}
              {status === 'canceled' && "No canceled bookings to show."}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      <Navigation />
      
      <div className="pt-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-luxury-serif font-bold text-4xl text-luxury-maroon mb-2">
              My Bookings
            </h1>
            <p className="text-luxury-maroon/70 font-luxury-sans text-lg">
              Manage your consultation appointments and view session history
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-luxury-taupe/20 mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'upcoming', label: 'Upcoming', icon: Clock },
                { id: 'past', label: 'Past Sessions', icon: CheckCircle },
                { id: 'canceled', label: 'Canceled', icon: XCircle },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'new', label: 'New Booking', icon: Plus }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-luxury-sans font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-luxury-maroon text-white shadow-lg'
                        : 'text-luxury-maroon hover:bg-luxury-taupe/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            {activeTab === 'upcoming' && renderBookingsList('upcoming')}
            {activeTab === 'past' && renderBookingsList('completed')}
            {activeTab === 'canceled' && renderBookingsList('canceled')}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'new' && renderNewBooking()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings; 