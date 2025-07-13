import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, User, Phone, CheckCircle, XCircle, BarChart3, Plus, MessageSquare, Star, ArrowLeft, ArrowRight, MapPin, Edit, Trash2, RotateCcw } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upcoming' | 'past' | 'analytics' | 'new'>('dashboard');
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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
      summary: 'Discussed 5 potential venues. Client interested in garden settings.',
      rating: 5,
      packageType: 'Venue Consultation'
    },
    {
      id: '3',
      title: 'Budget Planning Session',
      consultant: 'Anjali Patel',
      consultantImage: '/images/testimonial-3.jpg',
      date: new Date('2024-01-15'),
      time: '3:30 PM',
      duration: 90,
      type: 'phone',
      status: 'completed',
      platform: 'Phone Call',
      summary: 'Comprehensive budget breakdown completed. Next: vendor selection.',
      rating: 4,
      packageType: 'Financial Planning'
    }
  ];

  const consultants = [
    { id: '1', name: 'Priya Sharma', specialty: 'Wedding Planning', image: '/images/testimonial-1.jpg', rating: 4.9 },
    { id: '2', name: 'Rajesh Kumar', specialty: 'Venue Selection', image: '/images/testimonial-2.jpg', rating: 4.8 },
    { id: '3', name: 'Anjali Patel', specialty: 'Budget Planning', image: '/images/testimonial-3.jpg', rating: 4.7 },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (weekOffset * 7)));
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const filterBookings = (status: 'upcoming' | 'completed' | 'canceled') => {
    return bookings.filter(booking => booking.status === status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'canceled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-luxury-maroon">{filterBookings('upcoming').length}</p>
              <p className="text-sm text-luxury-maroon/60 font-luxury-sans">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-luxury-maroon">{filterBookings('completed').length}</p>
              <p className="text-sm text-luxury-maroon/60 font-luxury-sans">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-luxury-maroon">4.8</p>
              <p className="text-sm text-luxury-maroon/60 font-luxury-sans">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-luxury-dusty-rose/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-luxury-dusty-rose" />
            </div>
            <div>
              <p className="text-2xl font-bold text-luxury-maroon">{bookings.length}</p>
              <p className="text-sm text-luxury-maroon/60 font-luxury-sans">Total Sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-luxury-taupe/20">
        <div className="p-6 border-b border-luxury-taupe/20">
          <div className="flex items-center justify-between">
            <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon">Recent Sessions</h3>
            <Button
              onClick={() => setActiveTab('new')}
              className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Book New Session
            </Button>
          </div>
        </div>
        <div className="p-6">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 hover:bg-luxury-soft-pink/20 rounded-lg transition-all duration-200 cursor-pointer" onClick={() => setSelectedBooking(booking)}>
              <div className="flex items-center gap-4">
                <img
                  src={booking.consultantImage}
                  alt={booking.consultant}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-luxury-serif font-semibold text-luxury-maroon">{booking.title}</h4>
                  <p className="text-sm text-luxury-maroon/60 font-luxury-sans">
                    {booking.consultant} • {booking.date.toLocaleDateString()} at {booking.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                {booking.type === 'video' ? <Video className="w-4 h-4 text-luxury-maroon/60" /> : <Phone className="w-4 h-4 text-luxury-maroon/60" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNewBooking = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Calendly-style Header */}
      <div className="text-center">
        <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-4">
          Book Your Wedding Consultation
        </h2>
        <p className="font-luxury-sans text-luxury-maroon/70 text-lg max-w-2xl mx-auto">
          Select a time that works for you and get expert guidance for your special day
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Calendar and Time Selection */}
        <div className="space-y-6">
          {/* Date Selection */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
            <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-4">Select Date</h3>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedWeek(selectedWeek - 1)}
                className="p-2 hover:bg-luxury-taupe/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-luxury-maroon" />
              </button>
              <span className="font-luxury-sans font-medium text-luxury-maroon">
                {getWeekDates(selectedWeek)[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setSelectedWeek(selectedWeek + 1)}
                className="p-2 hover:bg-luxury-taupe/10 rounded-lg transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-luxury-maroon" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {getWeekDates(selectedWeek).map((date, index) => (
                <button
                  key={index}
                  className="p-3 text-center hover:bg-luxury-dusty-rose/20 rounded-lg transition-all duration-200 group"
                >
                  <div className="text-xs text-luxury-maroon/60 font-luxury-sans mb-1">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-sm font-medium text-luxury-maroon group-hover:text-luxury-dusty-rose">
                    {date.getDate()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
            <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-4">Available Times</h3>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTimeSlot(time)}
                  className={`p-3 rounded-lg border transition-all duration-200 font-luxury-sans ${
                    selectedTimeSlot === time
                      ? 'bg-luxury-dusty-rose text-white border-luxury-dusty-rose'
                      : 'bg-white border-luxury-taupe/30 text-luxury-maroon hover:border-luxury-dusty-rose/50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Consultant Selection and Booking Details */}
        <div className="space-y-6">
          {/* Consultant Selection */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
            <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-4">Choose Your Consultant</h3>
            <div className="space-y-3">
              {consultants.map((consultant) => (
                <button
                  key={consultant.id}
                  onClick={() => setSelectedConsultant(consultant.id)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                    selectedConsultant === consultant.id
                      ? 'bg-luxury-dusty-rose/10 border-luxury-dusty-rose'
                      : 'bg-white border-luxury-taupe/30 hover:border-luxury-dusty-rose/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={consultant.image}
                      alt={consultant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-luxury-serif font-semibold text-luxury-maroon">{consultant.name}</h4>
                      <p className="text-sm text-luxury-maroon/60 font-luxury-sans">{consultant.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-luxury-maroon/60">{consultant.rating}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          {selectedTimeSlot && selectedConsultant && (
            <div className="bg-luxury-dusty-rose/10 backdrop-blur-sm rounded-xl p-6 border border-luxury-dusty-rose/30">
              <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-4">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-luxury-maroon/70 font-luxury-sans">Consultant:</span>
                  <span className="font-medium text-luxury-maroon">
                    {consultants.find(c => c.id === selectedConsultant)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-maroon/70 font-luxury-sans">Time:</span>
                  <span className="font-medium text-luxury-maroon">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-maroon/70 font-luxury-sans">Duration:</span>
                  <span className="font-medium text-luxury-maroon">60 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-maroon/70 font-luxury-sans">Type:</span>
                  <span className="font-medium text-luxury-maroon">Video Call</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white">
                Confirm Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookingsList = (status: 'upcoming' | 'completed' | 'canceled') => {
    const filteredBookings = filterBookings(status);

    return (
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={booking.consultantImage}
                    alt={booking.consultant}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-1">
                          {booking.title}
                        </h3>
                        <p className="text-luxury-maroon/70 font-luxury-sans mb-2">
                          with {booking.consultant}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-luxury-maroon/60" />
                        <span className="text-sm text-luxury-maroon/70 font-luxury-sans">
                          {booking.date.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-luxury-maroon/60" />
                        <span className="text-sm text-luxury-maroon/70 font-luxury-sans">
                          {booking.time} ({booking.duration}min)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {booking.type === 'video' ? <Video className="w-4 h-4 text-luxury-maroon/60" /> : <Phone className="w-4 h-4 text-luxury-maroon/60" />}
                        <span className="text-sm text-luxury-maroon/70 font-luxury-sans">
                          {booking.platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-luxury-maroon/60" />
                        <span className="text-sm text-luxury-maroon/70 font-luxury-sans">
                          {booking.packageType}
                        </span>
                      </div>
                    </div>

                    {booking.summary && (
                      <div className="bg-luxury-soft-pink/20 rounded-lg p-3 mb-4">
                        <p className="text-sm text-luxury-maroon/80 font-luxury-sans">
                          <strong>Summary:</strong> {booking.summary}
                        </p>
                      </div>
                    )}

                    {booking.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-luxury-maroon/70 font-luxury-sans">Rating:</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {status === 'upcoming' && (
                    <>
                      <Button variant="outline" size="sm" className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white">
                        <Edit className="w-4 h-4 mr-1" />
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                  {status === 'canceled' && (
                    <Button variant="outline" size="sm" className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Rebook
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedBooking(booking)}
                    className="border-luxury-taupe/30 text-luxury-maroon hover:bg-luxury-taupe/10"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-xl border border-luxury-taupe/20">
            <div className="w-16 h-16 bg-luxury-taupe/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-luxury-taupe/60" />
            </div>
            <p className="text-luxury-maroon/60 font-luxury-sans">
              {status === 'upcoming' && "No upcoming bookings. Book your first consultation!"}
              {status === 'completed' && "No completed sessions yet."}
              {status === 'canceled' && "No canceled bookings."}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
          <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-4">Session History</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-luxury-maroon/70 font-luxury-sans">Total Sessions:</span>
              <span className="font-bold text-luxury-maroon">{bookings.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-luxury-maroon/70 font-luxury-sans">Completed:</span>
              <span className="font-bold text-green-600">{filterBookings('completed').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-luxury-maroon/70 font-luxury-sans">Upcoming:</span>
              <span className="font-bold text-blue-600">{filterBookings('upcoming').length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
          <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-4">Satisfaction</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-luxury-maroon mb-2">4.8</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-luxury-maroon/60 font-luxury-sans">Average Rating</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
          <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-4">Preferences</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-luxury-maroon/70 font-luxury-sans">Video Calls:</span>
              <span className="font-bold text-luxury-maroon">75%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-luxury-maroon/70 font-luxury-sans">Phone Calls:</span>
              <span className="font-bold text-luxury-maroon">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-luxury-maroon/70 font-luxury-sans">Avg Duration:</span>
              <span className="font-bold text-luxury-maroon">65 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-luxury-taupe/20">
        <h3 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-6">Session Timeline</h3>
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div key={booking.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-luxury-soft-pink/20 transition-colors">
              <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-luxury-serif font-medium text-luxury-maroon">{booking.title}</h4>
                  <span className="text-sm text-luxury-maroon/60 font-luxury-sans">
                    {booking.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-luxury-maroon/70 font-luxury-sans">
                  {booking.consultant} • {booking.duration} minutes • {booking.platform}
                </p>
              </div>
              {booking.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-luxury-maroon/70">{booking.rating}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Teams-style Navigation */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-1.5 shadow-lg border border-luxury-taupe/20 mb-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'upcoming', label: 'Upcoming', icon: Clock },
            { id: 'past', label: 'Past Sessions', icon: CheckCircle },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'new', label: 'Book Session', icon: Plus }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-luxury-sans font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-luxury-maroon text-white shadow-lg'
                    : 'text-luxury-maroon hover:bg-luxury-taupe/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'upcoming' && renderBookingsList('upcoming')}
        {activeTab === 'past' && renderBookingsList('completed')}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'new' && renderNewBooking()}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-luxury-taupe/20">
              <div className="flex items-center justify-between">
                <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon">
                  Session Details
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-8 h-8 bg-luxury-taupe/10 hover:bg-luxury-taupe/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <XCircle className="w-5 h-5 text-luxury-maroon" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={selectedBooking.consultantImage}
                  alt={selectedBooking.consultant}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-luxury-serif text-lg font-semibold text-luxury-maroon mb-1">
                    {selectedBooking.title}
                  </h4>
                  <p className="text-luxury-maroon/70 font-luxury-sans">
                    with {selectedBooking.consultant}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                  {selectedBooking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-luxury-maroon/70 font-luxury-sans">Date & Time</label>
                    <p className="text-luxury-maroon font-luxury-sans">
                      {selectedBooking.date.toLocaleDateString()} at {selectedBooking.time}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-luxury-maroon/70 font-luxury-sans">Duration</label>
                    <p className="text-luxury-maroon font-luxury-sans">{selectedBooking.duration} minutes</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-luxury-maroon/70 font-luxury-sans">Platform</label>
                    <p className="text-luxury-maroon font-luxury-sans">{selectedBooking.platform}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-luxury-maroon/70 font-luxury-sans">Package</label>
                    <p className="text-luxury-maroon font-luxury-sans">{selectedBooking.packageType}</p>
                  </div>
                </div>
              </div>

              {selectedBooking.summary && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-luxury-maroon/70 font-luxury-sans mb-2 block">Session Summary</label>
                  <div className="bg-luxury-soft-pink/20 rounded-lg p-4">
                    <p className="text-luxury-maroon font-luxury-sans">{selectedBooking.summary}</p>
                  </div>
                </div>
              )}

              {selectedBooking.rating && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-luxury-maroon/70 font-luxury-sans mb-2 block">Your Rating</label>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < selectedBooking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-luxury-maroon font-luxury-sans ml-2">{selectedBooking.rating}/5</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {selectedBooking.status === 'upcoming' && (
                  <>
                    <Button className="flex-1 bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
                {selectedBooking.status === 'completed' && (
                  <Button className="flex-1 bg-luxury-maroon hover:bg-luxury-maroon/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Book Follow-up
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings; 