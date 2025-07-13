import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Phone, User, Calendar, LogOut, ChevronLeft, ChevronRight, Plus, X, Check, Clock, Video, MapPin, BarChart3, Users, CalendarPlus, Timer, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  features: string[];
  trending?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
}

interface Wishlist {
  id: string;
  name: string;
  description?: string;
  products: Product[];
  createdAt: Date;
  coverImage?: string;
}

interface Booking {
  id: string;
  title: string;
  type: 'consultation' | 'venue-visit' | 'tasting' | 'planning' | 'follow-up';
  status: 'upcoming' | 'completed' | 'canceled';
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  attendees: string[];
  location: string;
  isVirtual: boolean;
  meetingLink?: string;
  notes?: string;
  summary?: string;
  recordingUrl?: string;
  createdAt: Date;
}

const Account = () => {
  // Check URL params for section to activate
  const urlParams = new URLSearchParams(window.location.search);
  const initialSection = urlParams.get('section') || "enquiries";
  
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isVisible, setIsVisible] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(null);
  const [isCreatingWishlist, setIsCreatingWishlist] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [newWishlistDescription, setNewWishlistDescription] = useState("");
  const [wishlists, setWishlists] = useState<Wishlist[]>([
    {
      id: "1",
      name: "Dream Wedding Collection",
      description: "My favorite items for the big day",
      products: [],
      createdAt: new Date(),
      coverImage: "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg"
    },
    {
      id: "2", 
      name: "Jewelry Selection",
      description: "Beautiful jewelry pieces",
      products: [],
      createdAt: new Date(),
      coverImage: "/images/accesories1.png"
    }
  ]);
  
  // Bookings state and sample data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      title: "Initial Wedding Consultation",
      type: "consultation",
      status: "upcoming",
      date: new Date(2024, 11, 28, 14, 0), // Dec 28, 2024, 2:00 PM
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      duration: 60,
      attendees: ["Sarah Johnson - Wedding Planner", "You"],
      location: "Virtual Meeting",
      isVirtual: true,
      meetingLink: "https://teams.microsoft.com/l/meetup-join/123",
      notes: "Discuss overall wedding vision, budget, and timeline",
      createdAt: new Date()
    },
    {
      id: "2",
      title: "Venue Visit - Grand Ballroom",
      type: "venue-visit",
      status: "upcoming",
      date: new Date(2024, 11, 30, 10, 0), // Dec 30, 2024, 10:00 AM
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      duration: 90,
      attendees: ["Michael Chen - Venue Manager", "Sarah Johnson", "You"],
      location: "Grand Ballroom, 123 Elegant St",
      isVirtual: false,
      notes: "Tour of ceremony and reception spaces",
      createdAt: new Date()
    },
    {
      id: "3",
      title: "Catering Tasting Session",
      type: "tasting",
      status: "completed",
      date: new Date(2024, 11, 15, 16, 0), // Dec 15, 2024, 4:00 PM
      startTime: "4:00 PM",
      endTime: "5:30 PM",
      duration: 90,
      attendees: ["Chef Antonio Rivera", "Sarah Johnson", "You", "Partner"],
      location: "WeddingEase Culinary Studio",
      isVirtual: false,
      summary: "Tasted 6 menu options. Decided on Mediterranean fusion with vegetarian alternatives. Chef will prepare detailed proposal by Dec 20th.",
      recordingUrl: "/recordings/catering-tasting-dec15.mp4",
      createdAt: new Date()
    }
  ]);
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingView, setBookingView] = useState<'list' | 'calendar' | 'analytics'>('list');
  
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const removeFromWishlist = (wishlistId: string, productId: number) => {
    setWishlists(prev => prev.map(wishlist => {
      if (wishlist.id === wishlistId) {
        return {
          ...wishlist,
          products: wishlist.products.filter(p => p.id !== productId)
        };
      }
      return wishlist;
    }));
    showToast("Product removed from wishlist");
  };

  const handleCreateWishlist = () => {
    if (!newWishlistName.trim()) return;
    
    const newWishlist: Wishlist = {
      id: Date.now().toString(),
      name: newWishlistName.trim(),
      description: newWishlistDescription.trim() || undefined,
      products: [],
      createdAt: new Date()
    };
    
    setWishlists(prev => [...prev, newWishlist]);
    setIsCreatingWishlist(false);
    setNewWishlistName("");
    setNewWishlistDescription("");
    showToast(`Created wishlist "${newWishlist.name}"`);
  };

  const wishlistProducts = [
    {
      id: 1,
      name: "Royal Sherwani",
      category: "Groom's Attire",
      image: "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg",
      price: "₹25,000",
      originalPrice: "₹30,000",
      description: "Elegant gold embroidered sherwani with intricate traditional work"
    },
    {
      id: 2,
      name: "Bridal Lehenga",
      category: "Bride's Attire",
      image: "/images/khadija-yousaf-lKwp3-FQomY-unsplash.jpg",
      price: "₹45,000",
      originalPrice: "₹55,000",
      description: "Traditional red lehenga with exquisite gold zari work"
    },
    {
      id: 3,
      name: "Kundan Jewelry Set",
      category: "Accessories",
      image: "/images/accesories1.png",
      price: "₹15,000",
      originalPrice: "₹20,000",
      description: "Elegant kundan jewelry set with matching earrings and necklace"
    },
    {
      id: 4,
      name: "Luxury Wedding Invitations",
      category: "Stationery",
      image: "/images/invites1.png",
      price: "₹8,000",
      originalPrice: "₹10,000",
      description: "Premium wedding invitations with gold foil detailing"
    },
    {
      id: 5,
      name: "Silk Saree",
      category: "Bride's Attire",
      image: "/images/awesome-sauce-creative-ZQJzMDWyqEI-unsplash.jpg",
      price: "₹35,000",
      originalPrice: "₹40,000",
      description: "Pure silk saree with traditional handwoven border work"
    },
    {
      id: 6,
      name: "Handcrafted Mojaris",
      category: "Footwear",
      image: "/images/pablo-heimplatz-fVL0zZdk-R4-unsplash.jpg",
      price: "₹12,000",
      originalPrice: "₹15,000",
      description: "Handcrafted leather mojaris with traditional embroidery"
    }
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(wishlistProducts.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const toggleWishlist = (productId: number) => {
    setWishlistItems(prev => {
      const isLiked = prev.includes(productId);
      if (isLiked) {
        showToast("Item removed from wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Item added to wishlist");
        return [...prev, productId];
      }
    });
  };

  const viewProductDetails = (productName: string) => {
    showToast(`Viewing details for ${productName}`);
  };

  const sidebarItems = [
    { id: "enquiries", label: "Enquire Session", title: "Enquiries", icon: Phone, active: true },
    { id: "profile", label: "Profile", title: "Profile", icon: User, active: false },
    { id: "wishlist", label: "Wishlist", title: "Wishlist", icon: Heart, active: false },
    { id: "order", label: "Order", title: "Orders", icon: ShoppingBag, active: false },
    { id: "bookings", label: "Bookings", title: "Bookings", icon: Calendar, active: false },
    { id: "logout", label: "Logout", title: "Logout", icon: LogOut, active: false }
  ];

  const currentPageTitle = sidebarItems.find(item => item.id === activeSection)?.title || "Account";

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    showToast("Logging out...");
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleMockAction = (action: string) => {
    const messages = {
      'make-enquiry': 'Enquiry form opened! We will contact you soon.',
      'update-profile': 'Profile updated successfully!',
      'add-products': 'Redirecting to product catalog...',
      'browse-products': 'Opening product catalog...',
      'book-consultation': 'Consultation booking initiated! Our team will contact you shortly.',
      'browse-packages': 'Loading wedding packages and pricing information...',
      'get-quote': 'Custom quote request started! Please share your wedding details below.',
      'ask-question': 'Great question! Our wedding experts are here to help.',
      'add-to-cart': 'Item added to cart successfully!',
      'schedule-consultation': 'Consultation scheduled for next week!',
      'view-order-details': 'Order details will be displayed here.',
      'track-order': 'Order tracking information loaded.',
      'contact-support': 'Support team will contact you within 24 hours.',
      'save-profile': 'Profile information saved successfully!',
      'change-password': 'Password updated successfully!',
      'upload-photo': 'Profile photo uploaded successfully!'
    };
    showToast(messages[action] || 'Action completed!');
  };

  const renderContent = () => {
    switch (activeSection) {
      case "enquiries":
        return (
          <div className="h-full flex flex-col">
            {/* Chat Interface Header */}
            <div className="bg-white/90 backdrop-blur-sm border-b border-luxury-taupe/20 p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-luxury-dusty-rose to-luxury-maroon rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon">
                  Wedding Planning Assistant
                </h3>
                <div className="flex items-center gap-2 text-sm text-luxury-maroon/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-luxury-sans">Online • Typically replies instantly</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white"
                >
                  Video Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white"
                >
                  Schedule Meeting
                </Button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-luxury-soft-pink/10 to-white/50">
              {/* Welcome Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-luxury-dusty-rose to-luxury-maroon rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-luxury-taupe/10 max-w-md">
                    <p className="font-luxury-sans text-luxury-maroon mb-2">
                      Welcome to WeddingEase! 🌸 I'm here to help you plan your perfect wedding.
                    </p>
                    <p className="font-luxury-sans text-luxury-maroon/70 text-sm">
                      You can ask me about our services, book consultations, or get personalized recommendations!
                    </p>
                  </div>
                  <span className="text-xs text-luxury-maroon/50 font-luxury-sans mt-1 block">
                    Just now
                  </span>
                </div>
            </div>
            
              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <button 
                  onClick={() => handleMockAction('book-consultation')}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-luxury-taupe/20 hover:border-luxury-dusty-rose/40 hover:shadow-md transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-luxury-dusty-rose/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white transition-all duration-300">
                      <Calendar className="w-5 h-5 text-luxury-dusty-rose group-hover:text-white" />
              </div>
                    <h4 className="font-luxury-serif font-bold text-luxury-maroon">Book Consultation</h4>
                  </div>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/70">
                    Schedule a free 30-minute consultation with our wedding experts
                  </p>
                </button>

                <button 
                  onClick={() => handleMockAction('browse-packages')}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-luxury-taupe/20 hover:border-luxury-dusty-rose/40 hover:shadow-md transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-luxury-maroon/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-maroon group-hover:text-white transition-all duration-300">
                      <ShoppingBag className="w-5 h-5 text-luxury-maroon group-hover:text-white" />
                    </div>
                    <h4 className="font-luxury-serif font-bold text-luxury-maroon">View Packages</h4>
                  </div>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/70">
                    Explore our curated wedding packages and pricing options
                  </p>
                </button>

                <button 
                  onClick={() => navigate('/products')}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-luxury-taupe/20 hover:border-luxury-dusty-rose/40 hover:shadow-md transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-luxury-dusty-rose/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white transition-all duration-300">
                      <Heart className="w-5 h-5 text-luxury-dusty-rose group-hover:text-white" />
                    </div>
                    <h4 className="font-luxury-serif font-bold text-luxury-maroon">Browse Products</h4>
                  </div>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/70">
                    Discover our exclusive collection of wedding attire and accessories
                  </p>
                </button>

                <button 
                  onClick={() => handleMockAction('get-quote')}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-luxury-taupe/20 hover:border-luxury-dusty-rose/40 hover:shadow-md transition-all duration-300 text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-luxury-maroon/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-maroon group-hover:text-white transition-all duration-300">
                      <User className="w-5 h-5 text-luxury-maroon group-hover:text-white" />
                    </div>
                    <h4 className="font-luxury-serif font-bold text-luxury-maroon">Get Custom Quote</h4>
                  </div>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/70">
                    Tell us about your dream wedding and get a personalized quote
                  </p>
                </button>
              </div>

              {/* Suggested Questions */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-luxury-dusty-rose to-luxury-maroon rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-luxury-taupe/10 max-w-md">
                    <p className="font-luxury-sans text-luxury-maroon mb-3">
                      Here are some questions I can help you with:
                    </p>
                    <div className="space-y-2">
                      {[
                        "What wedding packages do you offer?",
                        "How do I book a venue consultation?",
                        "Can you help with destination weddings?",
                        "What's included in the premium package?"
                      ].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleMockAction('ask-question')}
                          className="block w-full text-left p-2 rounded-lg bg-luxury-soft-pink/20 hover:bg-luxury-dusty-rose/20 text-sm font-luxury-sans text-luxury-maroon/80 hover:text-luxury-maroon transition-all duration-200"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-luxury-maroon/50 font-luxury-sans mt-1 block">
                    Just now
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Input Area */}
            <div className="bg-white/90 backdrop-blur-sm border-t border-luxury-taupe/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message or question..."
                    className="w-full px-4 py-3 pr-12 rounded-2xl border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 transition-all duration-300 font-luxury-sans text-luxury-maroon placeholder:text-luxury-maroon/50 outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-luxury-dusty-rose rounded-full flex items-center justify-center hover:bg-luxury-dusty-rose/90 transition-colors duration-200">
                    <span className="text-white text-lg">→</span>
                  </button>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white px-4"
                >
                  📎 Attach
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-luxury-maroon/50 font-luxury-sans">
                <span>Powered by AI • Responses are typically instant</span>
                <span>Press Enter to send</span>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="py-8">
            <div className="text-center mb-8">
              <p className="font-luxury-sans text-lg text-luxury-maroon/70 max-w-3xl mx-auto leading-relaxed">
                Manage your personal information and preferences to enhance your wedding planning experience.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-luxury-taupe/10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleMockAction('save-profile')}
                      className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                    >
                      Save Profile
                    </Button>
                    <Button 
                      onClick={() => handleMockAction('upload-photo')}
                      variant="outline"
                      className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white font-luxury-sans tracking-wide uppercase text-sm px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Upload Photo
                    </Button>
                  </div>
                  <Button 
                    onClick={() => handleMockAction('change-password')}
                    variant="outline"
                    className="w-full border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white font-luxury-sans tracking-wide uppercase text-sm px-6 py-3 rounded-lg transition-all duration-300 mt-3"
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case "wishlist":
        return (
          <div className="py-8">
            <div className="text-center mb-8">
              <p className="font-luxury-sans text-lg text-luxury-maroon/70 max-w-3xl mx-auto leading-relaxed">
                Manage your Pinterest-style wishlist collections for your special day.
              </p>
            </div>

                          {!selectedWishlist ? (
              // Wishlist Boards View - Pinterest Style
              <div>
            <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
              <div className="text-luxury-maroon/60 font-luxury-sans">
                      {wishlists.length} wishlist{wishlists.length !== 1 ? 's' : ''} created
              </div>
              <Button 
                      onClick={() => navigate('/products')}
                      variant="outline"
                      className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white font-luxury-sans text-sm px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      Browse Products
                    </Button>
                  </div>
                  <Button 
                    onClick={() => setIsCreatingWishlist(true)}
                className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white font-luxury-sans tracking-wide uppercase text-sm px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    Create Wishlist
                  </Button>
                </div>

                {/* Pinterest-Style Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {wishlists.map((wishlist, index) => (
                    <button
                      key={wishlist.id}
                      onClick={() => setSelectedWishlist(wishlist)}
                      className={`aspect-square bg-white border border-luxury-taupe/20 rounded-2xl hover:border-luxury-dusty-rose hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group hover:scale-105 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Cover Image */}
                      <div className="flex-1 relative">
                        {wishlist.coverImage ? (
                          <img
                            src={wishlist.coverImage}
                            alt={wishlist.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-luxury-dusty-rose/5 flex items-center justify-center">
                            <Heart className="w-12 h-12 text-luxury-dusty-rose/30" />
                          </div>
                        )}
                        
                        {/* Product Count Badge */}
                        <div className="absolute top-3 right-3 w-8 h-8 bg-luxury-maroon text-white rounded-full flex items-center justify-center text-xs font-luxury-sans font-bold shadow-lg">
                          {wishlist.products.length}
                        </div>
                        
                                              {/* Enhanced Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                        <div className="text-white text-center">
                          <p className="font-luxury-serif font-bold text-sm mb-1">View Collection</p>
                          <p className="font-luxury-sans text-xs opacity-90">
                            {wishlist.products.length} item{wishlist.products.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      </div>
                      
                      {/* Enhanced Wishlist Info */}
                      <div className="p-4 bg-white">
                        <h4 className="font-luxury-serif font-bold text-luxury-maroon group-hover:text-luxury-dusty-rose transition-colors text-base line-clamp-1 mb-2">
                          {wishlist.name}
                        </h4>
                        {wishlist.description && (
                          <p className="text-luxury-maroon/60 text-sm font-luxury-sans line-clamp-2 leading-relaxed mb-3">
                            {wishlist.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-luxury-maroon/50 font-luxury-sans">
                          <span>
                            {new Date(wishlist.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="text-luxury-dusty-rose">
                            Wishlist
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Enhanced Create New Wishlist Card */}
                  <button
                    onClick={() => setIsCreatingWishlist(true)}
                    className="aspect-square bg-gradient-to-br from-luxury-dusty-rose/5 to-luxury-dusty-rose/15 rounded-2xl border border-luxury-dusty-rose/20 hover:border-luxury-dusty-rose/40 hover:bg-luxury-dusty-rose/10 transition-all duration-300 flex flex-col items-center justify-center gap-4 group hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-luxury-dusty-rose/15 to-luxury-dusty-rose/25 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-luxury-dusty-rose group-hover:to-luxury-dusty-rose/90 transition-all duration-300 shadow-lg">
                      <Plus className="w-8 h-8 text-luxury-dusty-rose group-hover:text-white transition-all duration-300" />
                    </div>
                    <div className="text-center px-2">
                      <p className="font-luxury-serif font-bold text-luxury-maroon text-base group-hover:text-luxury-dusty-rose transition-colors">
                        Create New
                      </p>
                      <p className="text-sm text-luxury-maroon/60 font-luxury-sans mt-1">
                        Wishlist Collection
                      </p>
                    </div>
                  </button>
                </div>

                {/* Empty State */}
                {wishlists.length === 0 && (
                  <div className="text-center py-16 bg-luxury-taupe/5 rounded-2xl border border-luxury-taupe/10 mt-8">
                    <div className="w-16 h-16 bg-luxury-dusty-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-luxury-dusty-rose" />
                    </div>
                    <h3 className="font-luxury-serif font-bold text-luxury-maroon text-xl mb-2">
                      No wishlists yet
                    </h3>
                    <p className="font-luxury-sans text-luxury-maroon/60 mb-6">
                      Create your first wishlist to start saving your favorite items
                    </p>
                    <Button 
                      onClick={() => setIsCreatingWishlist(true)}
                      className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white font-luxury-sans px-6 py-3 rounded-lg"
                    >
                      Create First Wishlist
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              // Individual Wishlist Products View
              <div>
                {/* Enhanced Back Button and Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setSelectedWishlist(null)}
                      variant="outline"
                      className="flex items-center gap-2 border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white transition-all duration-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to Collections
                    </Button>
                    <div>
                      <h2 className="font-luxury-serif font-bold text-3xl text-luxury-maroon mb-1">
                        {selectedWishlist.name}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-luxury-maroon/60 font-luxury-sans">
                        <span>{selectedWishlist.products.length} item{selectedWishlist.products.length !== 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span>Created {new Date(selectedWishlist.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => navigate('/products')}
                    className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white font-luxury-sans px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Products
              </Button>
            </div>

                {/* Products Grid */}
                {selectedWishlist.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedWishlist.products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] group">
                      <img
                            src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                          {/* Remove from Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                            onClick={() => removeFromWishlist(selectedWishlist.id, product.id)}
                            className="absolute top-3 right-3 bg-red-500/90 text-white hover:bg-red-600 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300"
                          >
                            <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="font-luxury-sans text-luxury-maroon/70 text-sm mb-3 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Pricing */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-luxury-serif text-lg font-bold text-luxury-dusty-rose">
                          {product.price}
                        </span>
                        <span className="font-luxury-sans text-sm text-luxury-maroon/50 line-through">
                          {product.originalPrice}
                        </span>
                      </div>

                          {/* Enhanced Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                              onClick={() => {
                                navigate('/products');
                                // Could add specific product navigation here
                              }}
                              className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans text-sm py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg"
                            >
                              View Product
                        </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-luxury-taupe/5 rounded-2xl border border-luxury-taupe/10">
                    <div className="w-16 h-16 bg-luxury-dusty-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8 text-luxury-dusty-rose" />
                    </div>
                    <h3 className="font-luxury-serif font-bold text-luxury-maroon text-xl mb-2">
                      No products in this wishlist
                    </h3>
                    <p className="font-luxury-sans text-luxury-maroon/60 mb-6">
                      Browse products and add them to this wishlist
                    </p>
                        <Button 
                      onClick={() => navigate('/products')}
                      className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white font-luxury-sans px-6 py-3 rounded-lg"
                    >
                      Browse Products
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Create Wishlist Modal */}
            {isCreatingWishlist && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
                  <h3 className="font-luxury-serif font-bold text-luxury-maroon text-xl mb-4">
                    Create New Wishlist
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-luxury-sans font-medium text-luxury-maroon mb-2">
                        Wishlist Name *
                      </label>
                      <input
                        type="text"
                        value={newWishlistName}
                        onChange={(e) => setNewWishlistName(e.target.value)}
                        placeholder="Enter wishlist name"
                        className="w-full px-4 py-3 border border-luxury-taupe/30 rounded-lg focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose font-luxury-sans"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-luxury-sans font-medium text-luxury-maroon mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        value={newWishlistDescription}
                        onChange={(e) => setNewWishlistDescription(e.target.value)}
                        placeholder="Add a description"
                        rows={3}
                        className="w-full px-4 py-3 border border-luxury-taupe/30 rounded-lg focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose font-luxury-sans resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleCreateWishlist}
                        disabled={!newWishlistName.trim()}
                        className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Create Wishlist
                      </Button>
                      <Button
                        onClick={() => {
                          setIsCreatingWishlist(false);
                          setNewWishlistName('');
                          setNewWishlistDescription('');
                        }}
                          variant="outline"
                        className="px-6 border-luxury-taupe/30 text-luxury-maroon hover:bg-luxury-taupe/10 font-luxury-sans py-3 rounded-xl"
                        >
                        Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
            </div>
            )}
          </div>
        );
      case "order":
        return (
          <div className="py-8">
            <div className="text-center mb-8">
              <p className="font-luxury-sans text-lg text-luxury-maroon/70 max-w-3xl mx-auto leading-relaxed">
                Track your wedding purchases and delivery status.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-lg border border-luxury-taupe/10 text-center">
              <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-luxury-dusty-rose" />
              </div>
              <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                No orders yet
              </h3>
              <p className="text-luxury-maroon/60 font-luxury-sans text-base leading-relaxed max-w-md mx-auto mb-8">
                When you make a purchase, your order history will appear here. Start exploring our collection to find your perfect wedding essentials.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => handleMockAction('browse-products')}
                  className="bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Browse Products
                </Button>
                <Button 
                  onClick={() => handleMockAction('track-order')}
                  variant="outline"
                  className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Track Order
                </Button>
              </div>
            </div>
          </div>
        );
      case "bookings":
        return (
          <div className="py-8">
            <div className="text-center mb-8">
              <p className="font-luxury-sans text-lg text-luxury-maroon/70 max-w-3xl mx-auto leading-relaxed">
                Manage your consultation appointments and wedding planning sessions with our expert team.
              </p>
            </div>
            
            {/* Header with View Toggle and New Booking */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <h3 className="font-luxury-serif font-bold text-2xl text-luxury-maroon">
                  My Bookings
                </h3>
                <div className="flex bg-white/80 rounded-xl p-1 border border-luxury-taupe/20">
                  {(['list', 'calendar', 'analytics'] as const).map((view) => (
                    <button
                      key={view}
                      onClick={() => setBookingView(view)}
                      className={`px-4 py-2 rounded-lg text-sm font-luxury-sans transition-all duration-300 capitalize ${
                        bookingView === view
                          ? 'bg-luxury-dusty-rose text-white shadow-md'
                          : 'text-luxury-maroon hover:bg-luxury-taupe/10'
                      }`}
                    >
                      {view === 'analytics' ? 'Analytics' : view}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={() => setShowBookingModal(true)}
                className="bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center gap-2"
              >
                <CalendarPlus className="w-5 h-5" />
                New Booking
              </Button>
            </div>

            {bookingView === 'list' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-blue-600 font-luxury-sans text-sm">Upcoming</p>
                        <p className="font-luxury-serif font-bold text-2xl text-blue-800">
                          {bookings.filter(b => b.status === 'upcoming').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-green-600 font-luxury-sans text-sm">Completed</p>
                        <p className="font-luxury-serif font-bold text-2xl text-green-800">
                          {bookings.filter(b => b.status === 'completed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <Timer className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-purple-600 font-luxury-sans text-sm">Total Hours</p>
                        <p className="font-luxury-serif font-bold text-2xl text-purple-800">
                          {Math.round(bookings.reduce((acc, b) => acc + b.duration, 0) / 60)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <div
                      key={booking.id}
                      className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-luxury-taupe/10 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className={`w-3 h-3 rounded-full ${
                              booking.status === 'upcoming' ? 'bg-blue-500' :
                              booking.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            <h4 className="font-luxury-serif font-bold text-lg text-luxury-maroon">
                              {booking.title}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-luxury-sans font-medium ${
                              booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                              booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-luxury-maroon/70 font-luxury-sans">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{booking.date.toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{booking.startTime} - {booking.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {booking.isVirtual ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                              <span className="truncate">{booking.location}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-luxury-maroon/50" />
                            <span className="text-sm text-luxury-maroon/70 font-luxury-sans">
                              {booking.attendees.length} attendees
                            </span>
                            {booking.attendees.length > 2 && (
                              <span className="text-sm text-luxury-maroon/50 font-luxury-sans">
                                ({booking.attendees.slice(0, 2).join(', ')} +{booking.attendees.length - 2} more)
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {booking.status === 'upcoming' && booking.isVirtual && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(booking.meetingLink, '_blank');
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-luxury-sans flex items-center gap-2"
                            >
                              <Video className="w-4 h-4" />
                              Join
                            </Button>
                          )}
                          
                          {booking.status === 'completed' && booking.summary && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBooking(booking);
                              }}
                              variant="outline"
                              className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white px-4 py-2 rounded-lg text-sm font-luxury-sans"
                            >
                              View Summary
                            </Button>
                          )}
                          
                          <ChevronRight className="w-5 h-5 text-luxury-maroon/40" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {bookings.length === 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-lg border border-luxury-taupe/10 text-center">
              <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-luxury-dusty-rose" />
              </div>
              <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                No bookings yet
              </h3>
              <p className="text-luxury-maroon/60 font-luxury-sans text-base leading-relaxed max-w-md mx-auto mb-8">
                      Schedule your first consultation with our wedding experts to get started on your dream wedding journey.
              </p>
                <Button 
                      onClick={() => setShowBookingModal(true)}
                      className="bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                      Book Your First Consultation
                </Button>
                  </div>
                )}
              </div>
            )}

            {bookingView === 'calendar' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-luxury-taupe/10">
                <div className="text-center py-16">
                  <Calendar className="w-16 h-16 text-luxury-dusty-rose mx-auto mb-4" />
                  <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-2">
                    Calendar View
                  </h3>
                  <p className="text-luxury-maroon/60 font-luxury-sans">
                    Calendar integration coming soon! View your bookings in a beautiful calendar layout.
                  </p>
                </div>
              </div>
            )}

            {bookingView === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-luxury-taupe/10">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-luxury-dusty-rose" />
                      <h4 className="font-luxury-serif font-bold text-lg text-luxury-maroon">
                        Booking Analytics
                      </h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-luxury-maroon/70 font-luxury-sans">Total Meetings</span>
                        <span className="font-bold text-luxury-maroon">{bookings.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-luxury-maroon/70 font-luxury-sans">Average Duration</span>
                        <span className="font-bold text-luxury-maroon">
                          {bookings.length > 0 ? Math.round(bookings.reduce((acc, b) => acc + b.duration, 0) / bookings.length) : 0} min
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-luxury-maroon/70 font-luxury-sans">Completion Rate</span>
                        <span className="font-bold text-green-600">
                          {bookings.length > 0 ? Math.round((bookings.filter(b => b.status === 'completed').length / bookings.length) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-luxury-taupe/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-6 h-6 text-luxury-dusty-rose" />
                      <h4 className="font-luxury-serif font-bold text-lg text-luxury-maroon">
                        Meeting Types
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {Array.from(new Set(bookings.map(b => b.type))).map(type => (
                        <div key={type} className="flex justify-between items-center">
                          <span className="text-luxury-maroon/70 font-luxury-sans capitalize">
                            {type.replace('-', ' ')}
                          </span>
                          <span className="font-bold text-luxury-maroon">
                            {bookings.filter(b => b.type === type).length}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Detail Modal */}
            {selectedBooking && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[85vh] overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-luxury-taupe/20">
                    <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon">
                      {selectedBooking.title}
                    </h3>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="p-2 hover:bg-luxury-taupe/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-luxury-maroon/70" />
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-luxury-sans text-luxury-maroon/70 mb-1 block">Date & Time</label>
                        <p className="font-luxury-sans font-medium text-luxury-maroon">
                          {selectedBooking.date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="font-luxury-sans text-luxury-maroon/70">
                          {selectedBooking.startTime} - {selectedBooking.endTime} ({selectedBooking.duration} min)
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-luxury-sans text-luxury-maroon/70 mb-1 block">Location</label>
                        <p className="font-luxury-sans font-medium text-luxury-maroon flex items-center gap-2">
                          {selectedBooking.isVirtual ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                          {selectedBooking.location}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-luxury-sans text-luxury-maroon/70 mb-2 block">Attendees</label>
                      <div className="space-y-2">
                        {selectedBooking.attendees.map((attendee, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-luxury-dusty-rose rounded-full" />
                            <span className="font-luxury-sans text-luxury-maroon">{attendee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedBooking.notes && (
                      <div>
                        <label className="text-sm font-luxury-sans text-luxury-maroon/70 mb-2 block">Notes</label>
                        <p className="font-luxury-sans text-luxury-maroon bg-luxury-taupe/5 p-4 rounded-xl">
                          {selectedBooking.notes}
                        </p>
                      </div>
                    )}
                    
                    {selectedBooking.summary && (
                      <div>
                        <label className="text-sm font-luxury-sans text-luxury-maroon/70 mb-2 block">Meeting Summary</label>
                        <p className="font-luxury-sans text-luxury-maroon bg-green-50 p-4 rounded-xl border border-green-200">
                          {selectedBooking.summary}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 border-t border-luxury-taupe/20 flex gap-3">
                    {selectedBooking.status === 'upcoming' && selectedBooking.isVirtual && (
                <Button 
                        onClick={() => window.open(selectedBooking.meetingLink, '_blank')}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </Button>
                    )}
                    
                    {selectedBooking.recordingUrl && (
                      <Button
                        onClick={() => window.open(selectedBooking.recordingUrl, '_blank')}
                  variant="outline"
                        className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white"
                      >
                        View Recording
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => setSelectedBooking(null)}
                      variant="outline"
                      className="ml-auto border-luxury-taupe/30 text-luxury-maroon hover:bg-luxury-taupe/10"
                    >
                      Close
                </Button>
              </div>
            </div>
              </div>
            )}

            {/* New Booking Modal - Calendly Style */}
            {showBookingModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-luxury-taupe/20">
                    <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon">
                      Schedule New Consultation
                    </h3>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="p-2 hover:bg-luxury-taupe/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-luxury-maroon/70" />
                    </button>
                  </div>
                  
                  <div className="p-8 text-center">
                    <CalendarPlus className="w-16 h-16 text-luxury-dusty-rose mx-auto mb-4" />
                    <h4 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-4">
                      Book Your Consultation
                    </h4>
                    <p className="text-luxury-maroon/70 font-luxury-sans mb-8 max-w-md mx-auto">
                      Choose from our available consultation types and select a time that works best for you.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {[
                        { type: 'consultation', title: 'Initial Consultation', duration: '60 min', desc: 'Discuss your vision and budget' },
                        { type: 'venue-visit', title: 'Venue Tour', duration: '90 min', desc: 'Visit and explore wedding venues' },
                        { type: 'tasting', title: 'Catering Tasting', duration: '90 min', desc: 'Sample menu options' },
                        { type: 'planning', title: 'Planning Session', duration: '120 min', desc: 'Detail wedding timeline and logistics' }
                      ].map((option) => (
                        <button
                          key={option.type}
                          onClick={() => {
                            showToast(`Booking ${option.title} - Integration coming soon!`);
                            setShowBookingModal(false);
                          }}
                          className="p-6 border border-luxury-taupe/20 rounded-xl hover:border-luxury-dusty-rose hover:shadow-lg transition-all duration-300 text-left"
                        >
                          <h5 className="font-luxury-serif font-bold text-luxury-maroon mb-2">
                            {option.title}
                          </h5>
                          <p className="text-luxury-dusty-rose font-luxury-sans text-sm mb-2">
                            {option.duration}
                          </p>
                          <p className="text-luxury-maroon/70 font-luxury-sans text-sm">
                            {option.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      {/* Navigation - Keep main banner visible */}
      <Navigation />
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-luxury-maroon text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Check className="w-5 h-5" />
          <span className="font-luxury-sans text-sm">{notificationMessage}</span>
        </div>
      )}

      <div className="flex min-h-screen pt-20">
        {/* Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-md shadow-xl border-r border-luxury-taupe/20 flex flex-col">
          {/* Navigation Items */}
          <div className="flex-1 p-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "logout") {
                      handleLogout();
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left hover:shadow-md ${
                    (item.id === "enquiries" && activeSection === "enquiries") || 
                    (item.id === activeSection)
                      ? "bg-luxury-dusty-rose text-white shadow-lg" 
                      : "text-luxury-maroon/70 hover:bg-luxury-soft-pink hover:text-luxury-maroon"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-luxury-sans font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header - Positioned below navigation */}
          <div className="bg-white/80 backdrop-blur-md border-b border-luxury-taupe/20 sticky top-20 z-20">
            <div className="flex items-center justify-center h-20 px-8">
              <div className="text-center">
                <h1 className="font-luxury-serif font-bold text-3xl text-luxury-maroon tracking-tight">
                  {currentPageTitle}
                </h1>
                <div className="w-16 h-px bg-luxury-dusty-rose mx-auto mt-2" />
              </div>
            </div>
          </div>

          {/* Content Area - Full height for chat interface */}
          <div className={`flex-1 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${activeSection === 'enquiries' ? '' : 'px-8'}`}>
            {/* Background Floral Elements */}
            <img 
              src="/images/bg-flower.png" 
              alt="" 
              className="absolute top-1/4 right-0 translate-x-1/2 w-[30rem] opacity-10 transform rotate-45 pointer-events-none"
            />
            <img 
              src="/images/bg-branch.png" 
              alt="" 
              className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/4 w-[35rem] opacity-10 pointer-events-none"
            />
            
            <div className="relative z-10 max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 