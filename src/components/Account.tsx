import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Heart, ShoppingBag, Calendar, LogOut, Phone, ChevronLeft, ChevronRight, Plus, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [activeSection, setActiveSection] = useState("enquiries");
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [wishlistItems, setWishlistItems] = useState<number[]>([1, 2, 3, 4, 5, 6]);
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
      'book-consultation': 'Consultation booking form opened!',
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
          <div className="py-8">
            <div className="text-center mb-8">
              <p className="font-luxury-sans text-lg text-luxury-maroon/70 max-w-3xl mx-auto leading-relaxed">
                Track all your consultation requests and enquiries in one place.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-lg border border-luxury-taupe/10 text-center">
              <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-luxury-dusty-rose" />
              </div>
              <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                No Enquiries Currently
              </h3>
              <p className="text-luxury-maroon/60 font-luxury-sans text-base leading-relaxed max-w-md mx-auto mb-8">
                Your enquiry history and consultation requests will appear here. Start your wedding planning journey by making your first enquiry.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => handleMockAction('make-enquiry')}
                  className="bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Make Enquiry
                </Button>
                <Button 
                  onClick={() => handleMockAction('schedule-consultation')}
                  variant="outline"
                  className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Schedule Call
                </Button>
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
                Save your favorite items and compare options for your special day.
              </p>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="text-luxury-maroon/60 font-luxury-sans">
                {wishlistItems.length} items in your wishlist
              </div>
              <Button 
                onClick={() => handleMockAction('add-products')}
                className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white font-luxury-sans tracking-wide uppercase text-sm px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Products
              </Button>
            </div>

            {/* Compact Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product, index) => {
                const isLiked = wishlistItems.includes(product.id);
                return (
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
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                      
                      {/* Heart Icon with Clear State */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ${
                          isLiked 
                            ? 'bg-luxury-dusty-rose/90 text-white hover:bg-luxury-dusty-rose' 
                            : 'bg-white/80 text-luxury-dusty-rose hover:bg-white hover:text-luxury-maroon'
                        }`}
                      >
                        <Heart className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-current' : ''}`} />
                      </Button>

                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3 bg-luxury-maroon/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                        <span className="font-luxury-sans text-xs font-medium">{product.category}</span>
                      </div>
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

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => viewProductDetails(product.name)}
                          className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-xs py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
                        >
                          View Details
                        </Button>
                        <Button 
                          onClick={() => handleMockAction('add-to-cart')}
                          variant="outline"
                          className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white font-luxury-sans tracking-wide uppercase text-xs py-2 px-3 rounded-lg transition-all duration-300"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 shadow-lg border border-luxury-taupe/10 text-center">
              <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-luxury-dusty-rose" />
              </div>
              <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                No bookings yet
              </h3>
              <p className="text-luxury-maroon/60 font-luxury-sans text-base leading-relaxed max-w-md mx-auto mb-8">
                Your consultation bookings and appointment history will appear here. Schedule a consultation with our wedding experts to get started.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => handleMockAction('book-consultation')}
                  className="bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Book Consultation
                </Button>
                <Button 
                  onClick={() => handleMockAction('contact-support')}
                  variant="outline"
                  className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-luxury-maroon text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Check className="w-5 h-5" />
          <span className="font-luxury-sans text-sm">{notificationMessage}</span>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-md shadow-xl border-r border-luxury-taupe/20 flex flex-col">
          {/* Logo Header - Match homepage navigation exactly */}
          <div className="flex items-center h-20 border-b border-luxury-taupe/20">
            <div className="flex-1 flex justify-start px-6">
              <div className="flex items-center">
                <button onClick={handleLogoClick} className="transition-all duration-300 hover:opacity-80">
                  <img 
                    src="/images/logo.png" 
                    alt="Wedding Ease Logo" 
                    className="h-12 w-auto cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>
          
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
          {/* Header - Match sidebar header height exactly */}
          <div className="bg-white/80 backdrop-blur-md border-b border-luxury-taupe/20 sticky top-0 z-20">
            <div className="flex items-center justify-center h-20 px-8">
              <div className="text-center">
                <h1 className="font-luxury-serif font-bold text-3xl text-luxury-maroon tracking-tight">
                  {currentPageTitle}
                </h1>
                <div className="w-16 h-px bg-luxury-dusty-rose mx-auto mt-2" />
              </div>
            </div>
          </div>

          {/* Content Area - Removed large section headers, improved spacing */}
          <div className={`flex-1 relative px-8 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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