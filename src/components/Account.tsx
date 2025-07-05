import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Heart, ShoppingBag, Calendar, LogOut, Phone, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [activeSection, setActiveSection] = useState("enquiries");
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const wishlistProducts = [
    {
      id: 1,
      name: "Sherwani",
      category: "Groom's Attire",
      image: "/images/ui/attire1.png",
      price: "₹25,000",
      originalPrice: "₹30,000",
      description: "Elegant gold embroidered sherwani with intricate work"
    },
    {
      id: 2,
      name: "Lehenga",
      category: "Bride's Attire",
      image: "/images/ui/khadija-yousaf-lKwp3-FQomY-unsplash.jpg",
      price: "₹45,000",
      originalPrice: "₹55,000",
      description: "Traditional red lehenga with gold zari work"
    },
    {
      id: 3,
      name: "Jewelry Set",
      category: "Accessories",
      image: "/images/ui/accesories1.png",
      price: "₹15,000",
      originalPrice: "₹20,000",
      description: "Kundan jewelry set with matching earrings"
    },
    {
      id: 4,
      name: "Wedding Invitations",
      category: "Stationery",
      image: "/images/ui/invites1.png",
      price: "₹8,000",
      originalPrice: "₹10,000",
      description: "Luxury wedding invitations with gold foil"
    },
    {
      id: 5,
      name: "Saree",
      category: "Bride's Attire",
      image: "/images/ui/awesome-sauce-creative-ZQJzMDWyqEI-unsplash.jpg",
      price: "₹35,000",
      originalPrice: "₹40,000",
      description: "Silk saree with traditional border work"
    },
    {
      id: 6,
      name: "Groom's Shoes",
      category: "Footwear",
      image: "/images/ui/pablo-heimplatz-fVL0zZdk-R4-unsplash.jpg",
      price: "₹12,000",
      originalPrice: "₹15,000",
      description: "Handcrafted leather mojaris with embroidery"
    }
  ];

  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(wishlistProducts.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const sidebarItems = [
    { id: "enquiries", label: "Enquire Session", icon: Phone, active: true },
    { id: "profile", label: "Profile", icon: User, active: false },
    { id: "wishlist", label: "Wishlist", icon: Heart, active: false },
    { id: "order", label: "Order", icon: ShoppingBag, active: false },
    { id: "bookings", label: "Bookings", icon: Calendar, active: false },
    { id: "logout", label: "Logout", icon: LogOut, active: false }
  ];

  const handleBack = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case "enquiries":
        return (
          <div className="py-8">
            <h2 className="font-luxury-serif font-bold text-4xl md:text-5xl text-luxury-maroon mb-8 tracking-tight">
              My Enquiries
            </h2>
            <div className="w-24 h-px bg-luxury-dusty-rose mb-12" />
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-16 shadow-xl border border-luxury-taupe/20 text-center">
              <div className="w-20 h-20 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-luxury-dusty-rose" />
              </div>
              <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                No Enquiries Currently
              </h3>
              <p className="text-luxury-maroon/60 font-luxury-sans text-lg leading-relaxed max-w-md mx-auto">
                Your enquiry history and consultation requests will appear here. Start your wedding planning journey by making your first enquiry.
              </p>
              <Button className="mt-8 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300">
                Make Enquiry
              </Button>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="py-8">
            <h2 className="font-luxury-serif font-bold text-4xl md:text-5xl text-luxury-maroon mb-8 tracking-tight">
              Profile
            </h2>
            <div className="w-24 h-px bg-luxury-dusty-rose mb-12" />
            
            <div className="max-w-2xl">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-luxury-taupe/20">
                <div className="space-y-6">
                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-6 py-4 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-6 py-4 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <Button className="w-full bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-4 rounded-lg transition-all duration-300 mt-8">
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case "wishlist":
        return (
          <div className="py-8">
            {/* Header with Add Products Button */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-luxury-serif font-bold text-3xl text-luxury-maroon">
                Wishlist
              </h2>
              <Button 
                className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white font-luxury-sans tracking-wide uppercase text-sm px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add products
              </Button>
            </div>

            {/* Product Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="min-w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                        {wishlistProducts
                          .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                          .map((product, index) => (
                            <div
                              key={product.id}
                              className={`relative bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 luxury-hover ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                              }`}
                              style={{ transitionDelay: `${index * 200}ms` }}
                            >
                              {/* Product Image */}
                              <div className="relative aspect-square group">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                
                                {/* Heart Icon */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white text-luxury-dusty-rose hover:text-luxury-maroon rounded-full shadow-lg"
                                >
                                  <Heart className="w-5 h-5 fill-current" />
                                </Button>

                                {/* Category Badge */}
                                <div className="absolute bottom-4 left-4 bg-luxury-maroon/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                                  <span className="font-luxury-sans text-sm font-medium">{product.category}</span>
                                </div>
                              </div>

                              {/* Product Info */}
                              <div className="p-6">
                                <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon mb-2">
                                  {product.name}
                                </h3>
                                <p className="font-luxury-sans text-luxury-maroon/70 text-sm mb-4 leading-relaxed">
                                  {product.description}
                                </p>
                                
                                {/* Pricing */}
                                <div className="flex items-center gap-3 mb-4">
                                  <span className="font-luxury-serif text-2xl font-bold text-luxury-dusty-rose">
                                    {product.price}
                                  </span>
                                  <span className="font-luxury-sans text-lg text-luxury-maroon/50 line-through">
                                    {product.originalPrice}
                                  </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                  <Button 
                                    className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm py-3 rounded-lg transition-all duration-300"
                                  >
                                    View Details
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white font-luxury-sans tracking-wide uppercase text-sm py-3 px-4 rounded-lg transition-all duration-300"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {totalSlides > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-luxury-maroon rounded-full shadow-lg z-10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-luxury-maroon rounded-full shadow-lg z-10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Pagination Dots */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-luxury-maroon scale-125' 
                        : 'bg-luxury-taupe hover:bg-luxury-dusty-rose'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case "order":
        return (
          <div className="py-8">
            <h2 className="font-luxury-serif font-bold text-4xl md:text-5xl text-luxury-maroon mb-8 tracking-tight">
              Orders
            </h2>
            <div className="w-24 h-px bg-luxury-dusty-rose mb-12" />
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-16 shadow-xl border border-luxury-taupe/20 text-center">
              <div className="w-20 h-20 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-luxury-dusty-rose" />
              </div>
              <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                No orders yet
              </h3>
              <p className="text-luxury-maroon/60 font-luxury-sans text-lg leading-relaxed max-w-md mx-auto">
                When you make a purchase, your order history will appear here. Start exploring our collection to find your perfect wedding essentials.
              </p>
              <Button className="mt-8 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300">
                Browse Products
              </Button>
            </div>
          </div>
        );
      case "bookings":
        return (
          <div className="py-8">
            <h2 className="font-luxury-serif font-bold text-4xl md:text-5xl text-luxury-maroon mb-8 tracking-tight">
              Bookings
            </h2>
            <div className="w-24 h-px bg-luxury-dusty-rose mb-12" />
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-16 shadow-xl border border-luxury-taupe/20 text-center">
              <div className="w-20 h-20 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-luxury-dusty-rose" />
              </div>
              <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                No bookings yet
              </h3>
              <p className="text-luxury-maroon/60 font-luxury-sans text-lg leading-relaxed max-w-md mx-auto">
                Your consultation bookings and appointment history will appear here. Schedule a consultation with our wedding experts to get started.
              </p>
              <Button className="mt-8 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-sm px-8 py-3 rounded-lg transition-all duration-300">
                Book Consultation
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white/90 backdrop-blur-md shadow-xl h-screen fixed left-0 top-0 z-10 border-r border-luxury-taupe/30">
          <div className="p-6 border-b border-luxury-taupe/20">
            <img 
              src="/images/logo.png" 
              alt="Wedding Ease Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="p-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "logout") {
                      // Handle logout
                      console.log("Logout clicked");
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                    (item.id === "enquiries" && activeSection === "enquiries") || 
                    (item.id === activeSection)
                      ? "bg-luxury-dusty-rose text-white" 
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
        <div className="flex-1 ml-80">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-md border-b border-luxury-taupe/30 sticky top-0 z-20">
            <div className="flex items-center justify-between h-20 px-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-luxury-maroon/80 hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium tracking-wide uppercase text-sm"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <h1 className="font-luxury-serif font-bold text-3xl text-luxury-maroon tracking-tight">
                Account
              </h1>
              <div className="w-16"></div> {/* Spacer */}
            </div>
          </div>

          {/* Content Area */}
          <div className={`relative px-8 py-12 min-h-screen luxury-gradient overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Background Floral Elements */}
            <img 
              src="/images/bg-flower.png" 
              alt="" 
              className="absolute top-1/4 right-0 translate-x-1/2 w-[20rem] opacity-10 transform rotate-45"
            />
            <img 
              src="/images/bg-branch.png" 
              alt="" 
              className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/4 w-[25rem] opacity-10"
            />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account; 