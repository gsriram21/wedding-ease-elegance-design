import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, MessageCircle, User, Calendar, LogOut, ChevronLeft, ChevronRight, Plus, X, Check, Truck, Package, Clock, MapPin, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Bookings from "./Bookings";
import UnifiedCheckout from "./UnifiedCheckout";

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

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category: string;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: string;
  items: OrderItem[];
  shippingAddress: string;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  paymentMethod: string;
  shippingMethod: string;
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
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'assistant', content: string, timestamp: Date, action?: string, products?: any[]}>>([
    {
      id: '1',
      type: 'assistant',
      content: "Welcome to WeddingEase! 🌸 I'm here to help you plan your perfect wedding. You can ask me about our services, book consultations, or get personalized recommendations!",
      timestamp: new Date(),
      action: 'welcome'
    }
  ]);
  const [selectedChatProducts, setSelectedChatProducts] = useState<number[]>([]);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
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

  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'WE-2024-001',
      date: new Date('2024-01-20'),
      status: 'delivered',
      total: '₹85,000',
      items: [
        {
          id: 1,
          name: 'Elegant Bridal Gown',
          price: '₹45,000',
          quantity: 1,
          image: '/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg',
          category: 'Attire',
          size: 'M',
          color: 'Ivory'
        },
        {
          id: 2,
          name: 'Pearl Wedding Shoes',
          price: '₹12,000',
          quantity: 1,
          image: '/images/awesome-sauce-creative-ZQJzMDWyqEI-unsplash.jpg',
          category: 'Footwear',
          size: '7',
          color: 'White'
        },
        {
          id: 3,
          name: 'Diamond Necklace Set',
          price: '₹28,000',
          quantity: 1,
          image: '/images/accesories1.png',
          category: 'Jewelry'
        }
      ],
      shippingAddress: '123 Wedding Lane, Mumbai, Maharashtra 400001',
      estimatedDelivery: new Date('2024-01-22'),
      trackingNumber: 'WE1234567890',
      paymentMethod: 'Credit Card',
      shippingMethod: 'Express Delivery'
    },
    {
      id: '2',
      orderNumber: 'WE-2024-002',
      date: new Date('2024-01-25'),
      status: 'shipped',
      total: '₹35,500',
      items: [
        {
          id: 4,
          name: 'Vintage Veil',
          price: '₹8,500',
          quantity: 1,
          image: '/images/celebration-new-1.jpg',
          category: 'Accessories'
        },
        {
          id: 5,
          name: 'Pearl Earrings',
          price: '₹15,000',
          quantity: 1,
          image: '/images/accesories1.png',
          category: 'Jewelry'
        },
        {
          id: 6,
          name: 'Wedding Invitation Set',
          price: '₹12,000',
          quantity: 1,
          image: '/images/invites1.png',
          category: 'Invitations'
        }
      ],
      shippingAddress: '456 Celebration Street, Delhi, Delhi 110001',
      estimatedDelivery: new Date('2024-01-28'),
      trackingNumber: 'WE0987654321',
      paymentMethod: 'UPI',
      shippingMethod: 'Standard Delivery'
    },
    {
      id: '3',
      orderNumber: 'WE-2024-003',
      date: new Date('2024-01-26'),
      status: 'processing',
      total: '₹22,000',
      items: [
        {
          id: 7,
          name: 'Groom\'s Sherwani',
          price: '₹22,000',
          quantity: 1,
          image: '/images/celebration-new-2.jpg',
          category: 'Attire',
          size: 'L',
          color: 'Gold'
        }
      ],
      shippingAddress: '789 Royal Avenue, Bangalore, Karnataka 560001',
      estimatedDelivery: new Date('2024-01-30'),
      paymentMethod: 'Debit Card',
      shippingMethod: 'Express Delivery'
    }
  ]);
  
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

  // Sample products for demonstration
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "Elegant Bridal Gown",
      category: "Attire",
      subcategory: "Bridal Gowns",
      price: "₹45,000",
      originalPrice: "₹55,000",
      rating: 4.8,
      reviews: 124,
      images: ["/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg"],
      description: "A stunning floor-length gown with intricate lace detailing and a flowing train.",
      features: ["Hand-embroidered lace", "Silk lining", "Custom sizing available"],
      trending: true
    },
    {
      id: 2,
      name: "Pearl Wedding Shoes",
      category: "Footwear",
      subcategory: "Bridal Shoes",
      price: "₹12,000",
      originalPrice: "₹15,000",
      rating: 4.6,
      reviews: 89,
      images: ["/images/awesome-sauce-creative-ZQJzMDWyqEI-unsplash.jpg"],
      description: "Elegant pearl-adorned heels perfect for your special day.",
      features: ["Pearl detailing", "Comfortable padding", "Non-slip sole"],
      bestSeller: true
    },
    {
      id: 3,
      name: "Vintage Veil",
      category: "Accessories",
      subcategory: "Veils",
      price: "₹8,500",
      originalPrice: "₹10,000",
      rating: 4.9,
      reviews: 156,
      images: ["/images/celebration-new-1.jpg"],
      description: "A timeless cathedral-length veil with delicate lace edging.",
      features: ["Cathedral length", "Lace trim", "Handcrafted"],
      newArrival: true
    }
  ];

  const jewelryProducts: Product[] = [
    {
      id: 4,
      name: "Diamond Necklace Set",
      category: "Jewelry",
      subcategory: "Necklaces",
      price: "₹85,000",
      originalPrice: "₹95,000",
      rating: 4.9,
      reviews: 67,
      images: ["/images/accesories1.png"],
      description: "Exquisite diamond necklace with matching earrings.",
      features: ["18k Gold", "Natural diamonds", "Lifetime warranty"],
      trending: true
    },
    {
      id: 5,
      name: "Pearl Earrings",
      category: "Jewelry",
      subcategory: "Earrings",
      price: "₹15,000",
      originalPrice: "₹18,000",
      rating: 4.7,
      reviews: 43,
      images: ["/images/accesories1.png"],
      description: "Classic pearl drop earrings for the elegant bride.",
      features: ["Freshwater pearls", "Sterling silver", "Hypoallergenic"],
      bestSeller: true
    }
  ];

  // Add sample products to wishlists for demonstration
  const populatedWishlists = wishlists.map(wishlist => ({
    ...wishlist,
    products: wishlist.id === "1" ? sampleProducts : wishlist.id === "2" ? jewelryProducts : []
  }));

  const totalSlides = Math.ceil(wishlistItems.length / 4);

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
    { id: "enquiries", label: "Chat", title: "Chat", icon: MessageCircle, active: true },
    { id: "wishlist", label: "Wishlist", title: "Wishlist", icon: Heart, active: false },
    { id: "order", label: "Order", title: "Orders", icon: ShoppingBag, active: false },
    { id: "bookings", label: "Bookings", title: "Bookings", icon: Calendar, active: false },
    { id: "profile", label: "Profile", title: "Profile", icon: User, active: false },
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

  // Mock user status for smart scheduling logic
  const [userStatus] = useState<'new' | 'used-free' | 'has-package'>('new');

  // Mock products for chat selection
  const chatProducts = [
    { id: 1, name: "Elegant Bridal Gown", price: "₹85,000", category: "Wedding Attire", image: "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg" },
    { id: 2, name: "Diamond Wedding Ring", price: "₹1,25,000", category: "Jewelry", image: "/images/accesories1.png" },
    { id: 3, name: "Wedding Invitation Suite", price: "₹15,000", category: "Stationery", image: "/images/invites1.png" },
    { id: 4, name: "Bridal Jewelry Set", price: "₹95,000", category: "Jewelry", image: "/images/awesome-sauce-creative-ZQJzMDWyqEI-unsplash.jpg" }
  ];
  
  const handleScheduleMeeting = () => {
    // Smart Schedule Meeting logic based on user status
    switch (userStatus) {
      case 'new':
        // First free consultation: redirect to calendar booking
        showToast('Redirecting to book your free consultation...');
        setTimeout(() => setActiveSection('bookings'), 500);
        break;
      case 'used-free':
        // Returning users who used free consultation: redirect to buy package page
        showToast('Please select a package to book additional consultations...');
        setTimeout(() => navigate('/?section=packages'), 1000);
        break;
      case 'has-package':
        // Users with package: redirect to calendar booking
        showToast('Redirecting to schedule your consultation...');
        setTimeout(() => setActiveSection('bookings'), 500);
        break;
      default:
        showToast('Redirecting to consultation booking...');
        setTimeout(() => setActiveSection('bookings'), 500);
    }
  };

  const handleBookingSubmit = () => {
    showToast('Consultation booking saved! You will receive a confirmation email shortly.');
    
    // Add a confirmation message to chat
    const confirmationMessage = {
      id: Date.now().toString(),
      type: 'assistant' as const,
      content: "Perfect! Your consultation booking has been saved. You'll receive a confirmation email with all the details shortly. Is there anything else I can help you with?",
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, confirmationMessage]);
  };

  const handleShowProducts = () => {
    const productMessage = {
      id: Date.now().toString(),
      type: 'assistant' as const,
      content: "Here are some of our featured products! You can select items you're interested in and I'll help you with pricing and availability.",
      timestamp: new Date(),
      action: 'show-products',
      products: chatProducts
    };
    setChatMessages(prev => [...prev, productMessage]);
  };

  const handleProductSelect = (productId: number) => {
    setSelectedChatProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    
    const product = chatProducts.find(p => p.id === productId);
    if (product) {
      const isAdding = !selectedChatProducts.includes(productId);
      showToast(`${product.name} ${isAdding ? 'added to' : 'removed from'} selection`);
    }
  };

  const handleViewSelectedProducts = () => {
    if (selectedChatProducts.length === 0) {
      showToast('No products selected yet. Please select products from the list above.');
      return;
    }
    
    const selectedProducts = chatProducts.filter(p => selectedChatProducts.includes(p.id));
    const totalPrice = selectedProducts.reduce((sum, product) => {
      return sum + parseInt(product.price.replace(/[₹,]/g, ''));
    }, 0);
    
    const selectionMessage = {
      id: Date.now().toString(),
      type: 'assistant' as const,
      content: `You have selected ${selectedProducts.length} products with a total value of ₹${totalPrice.toLocaleString()}. Would you like to proceed to checkout or need more information about these items?`,
      timestamp: new Date(),
      action: 'show-selected-products',
      products: selectedProducts
    };
    setChatMessages(prev => [...prev, selectionMessage]);
  };

  const handleProceedToCheckout = () => {
    if (selectedChatProducts.length === 0) {
      showToast('No products selected for checkout.');
      return;
    }
    setShowCheckout(true);
  };

  const handleMockAction = (action: string) => {
    const messages = {
      'book-consultation': 'Redirecting to calendar...',
      'browse-packages': 'Viewing packages - Redirecting to packages page...',
      'ask-question': 'AI assistant integration coming soon!',
      'get-quote': 'Custom quote generation coming soon!',
      'save-profile': 'Profile saved successfully!',
      'upload-photo': 'Photo upload feature coming soon!',
      'change-password': 'Password change feature coming soon!',
      'browse-products': 'Redirecting to products...',
      'track-order': 'Order tracking feature coming soon!',
      'save-booking': 'Booking saved successfully!',
      'show-products': 'Showing product selection...',
      'view-selected': 'Viewing selected products...'
    };
    
    showToast(messages[action as keyof typeof messages] || 'Feature coming soon!');
    
    if (action === 'browse-products') {
      setTimeout(() => handleShowProducts(), 500);
    }
    
    if (action === 'book-consultation') {
      handleScheduleMeeting();
    }
    
    if (action === 'save-booking') {
      handleBookingSubmit();
    }
    
    if (action === 'show-products') {
      handleShowProducts();
    }
    
    if (action === 'view-selected') {
      handleViewSelectedProducts();
    }
  };

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: chatInput.trim(),
      timestamp: new Date()
    };
    
    const userInput = chatInput.toLowerCase();
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    
    // Mock AI response based on user input
    setTimeout(() => {
      let assistantContent = "Thank you for your message! I'm here to help you with your wedding planning.";
      let action = undefined;
      
      // Check if this is the first message (only show options for first interaction)
      const isFirstUserMessage = chatMessages.filter(msg => msg.type === 'user').length === 0;
      
      if (userInput.includes('book') || userInput.includes('consultation') || userInput.includes('appointment') || userInput.includes('visit')) {
        assistantContent = "I'd be happy to help you book a consultation! We offer various consultation types to help plan your perfect wedding.";
        action = isFirstUserMessage ? 'show-options' : undefined;
      } else if (userInput.includes('package') || userInput.includes('pricing') || userInput.includes('cost') || userInput.includes('price')) {
        assistantContent = "Let me show you our wedding packages and services! We have options for every budget and style.";
        action = isFirstUserMessage ? 'show-options' : undefined;
      } else if (userInput.includes('product') || userInput.includes('dress') || userInput.includes('attire') || userInput.includes('shop')) {
        assistantContent = "Would you like to browse our exclusive collection of wedding attire and accessories? I can help you find the perfect items!";
        action = isFirstUserMessage ? 'show-options' : undefined;
      } else if (userInput.includes('quote') || userInput.includes('estimate') || userInput.includes('budget')) {
        assistantContent = "I can help you get a personalized quote for your wedding! Let me show you the available options.";
        action = isFirstUserMessage ? 'show-options' : undefined;
      } else {
        assistantContent = "I'm here to help with all your wedding planning needs! Would you like to explore our services?";
        action = isFirstUserMessage ? 'show-options' : undefined;
      }
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: assistantContent,
        timestamp: new Date(),
        action
      };
      setChatMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <Check className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "enquiries":
        return (
          <div className="h-full flex flex-col bg-gradient-to-b from-luxury-soft-pink/10 to-white/50">
            {/* Chat Interface Header - Fixed */}
            <div className="bg-white/95 backdrop-blur-sm border-b border-luxury-taupe/20 p-4 flex items-center gap-4 shadow-sm flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-luxury-dusty-rose to-luxury-maroon rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon">
                  Wedding Planning Assistant
                </h3>
                <div className="flex items-center gap-2 text-sm text-luxury-maroon/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-luxury-sans">Online • Typically replies instantly</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white"
                  onClick={handleScheduleMeeting}
                >
                  Schedule Meeting
                </Button>
              </div>
            </div>

            {/* Chat Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
              <div className="p-6 space-y-4">
                {/* Show initial actions only when there's just the welcome message */}
                {chatMessages.length === 1 && (
                  <>
                    {/* Quick Action Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
                      <button 
                        onClick={() => handleMockAction('book-consultation')}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 text-left group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-luxury-dusty-rose/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white">
                            <Calendar className="w-4 h-4 text-luxury-dusty-rose group-hover:text-white" />
                          </div>
                          <span className="font-luxury-serif font-bold text-luxury-maroon text-xs">Book Consultation</span>
                        </div>
                        <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                          Schedule free consultation
                        </p>
                      </button>
                      <button 
                        onClick={() => handleMockAction('browse-packages')}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 text-left group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-luxury-dusty-rose/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white">
                            <ShoppingBag className="w-4 h-4 text-luxury-maroon group-hover:text-white" />
                          </div>
                          <span className="font-luxury-serif font-bold text-luxury-maroon text-xs">View Packages</span>
                        </div>
                        <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                          Explore our packages
                        </p>
                      </button>
                      <button 
                        onClick={() => navigate('/products')}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 text-left group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-luxury-dusty-rose/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white">
                            <Heart className="w-4 h-4 text-luxury-dusty-rose group-hover:text-white" />
                          </div>
                          <span className="font-luxury-serif font-bold text-luxury-maroon text-xs">Browse Products</span>
                        </div>
                        <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                          Discover collection
                        </p>
                      </button>
                      <button 
                        onClick={() => handleMockAction('get-quote')}
                        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 text-left group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-luxury-dusty-rose/10 rounded-lg flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white">
                            <User className="w-4 h-4 text-luxury-maroon group-hover:text-white" />
                          </div>
                          <span className="font-luxury-serif font-bold text-luxury-maroon text-xs">Get Quote</span>
                        </div>
                        <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                          Get personalized pricing
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
                                className="block w-full text-left p-2 rounded-lg bg-luxury-soft-pink/20 hover:bg-luxury-dusty-rose/20 text-sm font-luxury-sans text-luxury-maroon/80 hover:text-luxury-maroon"
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
                  </>
                )}

                {/* Chat Messages */}
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-luxury-dusty-rose' 
                        : 'bg-gradient-to-br from-luxury-dusty-rose to-luxury-maroon'
                    }`}>
                      <span className="text-white text-sm font-bold">
                        {message.type === 'user' ? 'Y' : 'W'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className={`rounded-2xl p-4 shadow-sm border max-w-md ${
                        message.type === 'user'
                          ? 'bg-luxury-dusty-rose text-white rounded-tr-md ml-auto'
                          : 'bg-white border-luxury-taupe/10 rounded-tl-md'
                      }`}>
                        <p className={`font-luxury-sans ${
                          message.type === 'user' ? 'text-white' : 'text-luxury-maroon'
                        }`}>
                          {message.content}
                        </p>

                        {/* Message Actions */}
                        {message.action === 'show-options' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            <button 
                              onClick={() => handleMockAction('book-consultation')}
                              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 text-left"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-4 h-4 text-luxury-dusty-rose" />
                                <span className="font-luxury-serif font-bold text-luxury-maroon text-sm">Book Consultation</span>
                              </div>
                              <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                                Schedule a free consultation
                              </p>
                            </button>
                            <button 
                              onClick={() => handleMockAction('browse-packages')}
                              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 text-left"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <ShoppingBag className="w-4 h-4 text-luxury-maroon" />
                                <span className="font-luxury-serif font-bold text-luxury-maroon text-sm">View Packages</span>
                              </div>
                              <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                                Explore our packages
                              </p>
                            </button>
                            <button 
                              onClick={() => handleMockAction('show-products')}
                              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 text-left"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Heart className="w-4 h-4 text-luxury-dusty-rose" />
                                <span className="font-luxury-serif font-bold text-luxury-maroon text-sm">Browse Products</span>
                              </div>
                              <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                                Discover our collection
                              </p>
                            </button>
                            <button 
                              onClick={() => handleMockAction('get-quote')}
                              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 text-left"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <User className="w-4 h-4 text-luxury-maroon" />
                                <span className="font-luxury-serif font-bold text-luxury-maroon text-sm">Get Quote</span>
                              </div>
                              <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                                Get personalized pricing
                              </p>
                            </button>
                          </div>
                        )}

                        {/* Product Display */}
                        {message.action === 'show-products' && message.products && (
                          <div className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                              {message.products.map((product: any) => (
                                <div
                                  key={product.id}
                                  className={`bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 cursor-pointer ${
                                    selectedChatProducts.includes(product.id) ? 'ring-2 ring-luxury-dusty-rose bg-luxury-dusty-rose/10' : ''
                                  }`}
                                  onClick={() => handleProductSelect(product.id)}
                                >
                                  <div className="flex items-start gap-3">
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-luxury-serif font-bold text-luxury-maroon text-sm mb-1">
                                        {product.name}
                                      </h4>
                                      <p className="font-luxury-sans text-xs text-luxury-maroon/70 mb-1">
                                        {product.category}
                                      </p>
                                      <p className="font-luxury-sans text-sm font-bold text-luxury-dusty-rose">
                                        {product.price}
                                      </p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 ${
                                      selectedChatProducts.includes(product.id) 
                                        ? 'bg-luxury-dusty-rose border-luxury-dusty-rose' 
                                        : 'border-luxury-taupe/40'
                                    }`}>
                                      {selectedChatProducts.includes(product.id) && (
                                        <Check className="w-4 h-4 text-white m-0.5" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {selectedChatProducts.length > 0 && (
                              <button 
                                onClick={() => handleMockAction('view-selected')}
                                className="w-full bg-luxury-dusty-rose text-white rounded-lg p-3 font-luxury-serif font-bold text-sm hover:bg-luxury-dusty-rose/90"
                              >
                                View Selected Items ({selectedChatProducts.length})
                              </button>
                            )}
                          </div>
                        )}

                        {/* Selected Products Summary */}
                        {message.action === 'show-selected-products' && message.products && (
                          <div className="mt-4">
                            <div className="space-y-3 mb-4">
                              {message.products.map((product: any) => (
                                <div
                                  key={product.id}
                                  className="bg-luxury-dusty-rose/10 backdrop-blur-sm rounded-lg p-3 border border-luxury-dusty-rose/30"
                                >
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="w-12 h-12 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-luxury-serif font-bold text-luxury-maroon text-sm">
                                        {product.name}
                                      </h4>
                                      <p className="font-luxury-sans text-xs text-luxury-maroon/70">
                                        {product.category}
                                      </p>
                                    </div>
                                    <p className="font-luxury-sans text-sm font-bold text-luxury-dusty-rose">
                                      {product.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <button 
                                onClick={() => handleProceedToCheckout()}
                                className="bg-luxury-maroon text-white rounded-lg p-3 font-luxury-serif font-bold text-sm hover:bg-luxury-maroon/90"
                              >
                                Proceed to Checkout
                              </button>
                              <button 
                                onClick={() => handleMockAction('get-quote')}
                                className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:bg-white/30 font-luxury-serif font-bold text-luxury-maroon text-sm"
                              >
                                Get Custom Quote
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-luxury-maroon/50 font-luxury-sans mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Scroll to bottom reference */}
                <div ref={chatMessagesEndRef} />
              </div>
            </div>

            {/* Chat Input Area - Fixed at bottom */}
            <div className="bg-white/95 backdrop-blur-sm border-t border-luxury-taupe/20 p-4 shadow-lg flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message or question..."
                    className="w-full px-4 py-3 pr-12 rounded-2xl border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 font-luxury-sans text-luxury-maroon placeholder:text-luxury-maroon/50 outline-none"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-luxury-dusty-rose rounded-full flex items-center justify-center hover:bg-luxury-dusty-rose/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-white text-lg">→</span>
                  </button>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-luxury-maroon text-luxury-maroon hover:bg-luxury-maroon hover:text-white px-4 hidden md:flex"
                  onClick={() => showToast('Attach feature coming soon!')}
                >
                  📎 Attach
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-luxury-maroon/50 font-luxury-sans">
                <span>Powered by AI • Responses are typically instant</span>
                <span className="hidden sm:block">Press Enter to send</span>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="h-full">
            <div className="mb-8">
              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">Profile Settings</h2>
              <p className="font-luxury-sans text-lg text-luxury-maroon/70 max-w-3xl leading-relaxed">
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
          <div className="h-full">
            <div className="mb-8">
              <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">Your Wishlists</h2>
              <p className="font-luxury-sans text-lg text-luxury-maroon/70 max-w-3xl leading-relaxed">
                Curate your perfect wedding collection. Save your favorite items and create themed wishlists for different aspects of your special day.
              </p>
            </div>
            
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Create New Wishlist Card */}
              <div 
                onClick={() => setIsCreatingWishlist(true)}
                className="card-standard card-medium border-2 border-dashed border-luxury-dusty-rose/40 hover:border-luxury-dusty-rose cursor-pointer group text-center"
              >
                <div className="card-content-flex items-center justify-center">
                  <div>
                    <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-dusty-rose/30 transition-all duration-300">
                      <Plus className="w-8 h-8 text-luxury-dusty-rose" />
                    </div>
                    <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-2">
                      Create New Wishlist
                    </h3>
                    <p className="font-luxury-sans text-luxury-maroon/60 text-sm">
                      Start a new collection for your special day
                    </p>
                  </div>
                </div>
              </div>

              {/* Existing Wishlists */}
              {populatedWishlists.map((wishlist) => (
                <div
                  key={wishlist.id}
                  onClick={() => setSelectedWishlist(wishlist)}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-luxury-taupe/10 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 bg-gradient-to-br from-luxury-soft-pink to-luxury-dusty-rose/20 overflow-hidden">
                    {wishlist.coverImage ? (
                      <img 
                        src={wishlist.coverImage} 
                        alt={wishlist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Heart className="w-16 h-16 text-luxury-dusty-rose/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-2 line-clamp-1">
                      {wishlist.name}
                    </h3>
                    {wishlist.description && (
                      <p className="font-luxury-sans text-luxury-maroon/70 text-sm mb-4 line-clamp-2">
                        {wishlist.description}
                      </p>
                    )}
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <span className="font-luxury-sans text-luxury-maroon/60 text-sm">
                        {wishlist.products.length} items
                      </span>
                      <span className="font-luxury-sans text-luxury-dusty-rose text-sm font-medium">
                        View Collection →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Wishlist Modal */}
            {isCreatingWishlist && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                  <div className="p-6 border-b border-luxury-taupe/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon">
                        Create New Wishlist
                      </h3>
                      <button
                        onClick={() => setIsCreatingWishlist(false)}
                        className="w-8 h-8 bg-luxury-taupe/10 hover:bg-luxury-taupe/20 rounded-full flex items-center justify-center transition-colors duration-200"
                      >
                        <X className="w-5 h-5 text-luxury-maroon" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-2">
                        Wishlist Name
                      </label>
                      <input
                        type="text"
                        value={newWishlistName}
                        onChange={(e) => setNewWishlistName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon"
                        placeholder="e.g., Bridal Accessories"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        value={newWishlistDescription}
                        onChange={(e) => setNewWishlistDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon resize-none"
                        rows={3}
                        placeholder="Describe what this wishlist is for..."
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 border-t border-luxury-taupe/20 flex gap-3">
                    <Button
                      onClick={() => setIsCreatingWishlist(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateWishlist}
                      className="flex-1 bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white"
                    >
                      Create Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Detail Modal */}
            {selectedWishlist && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="p-6 border-b border-luxury-taupe/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-luxury-serif font-bold text-2xl text-luxury-maroon">
                          {selectedWishlist.name}
                        </h3>
                        {selectedWishlist.description && (
                          <p className="font-luxury-sans text-luxury-maroon/70 mt-1">
                            {selectedWishlist.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedWishlist(null)}
                        className="w-8 h-8 bg-luxury-taupe/10 hover:bg-luxury-taupe/20 rounded-full flex items-center justify-center transition-colors duration-200"
                      >
                        <X className="w-5 h-5 text-luxury-maroon" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {selectedWishlist.products.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedWishlist.products.map((product, index) => (
                          <div key={product.id} className="bg-white/80 rounded-xl shadow-md border border-luxury-taupe/10 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 bg-gradient-to-br from-luxury-soft-pink to-luxury-dusty-rose/20">
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => removeFromWishlist(selectedWishlist.id, product.id)}
                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md"
                              >
                                <X className="w-4 h-4 text-luxury-maroon" />
                              </button>
                            </div>
                            
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
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="w-8 h-8 text-luxury-dusty-rose" />
                        </div>
                        <h4 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-2">
                          Your wishlist is empty
                        </h4>
                        <p className="font-luxury-sans text-luxury-maroon/60 mb-6">
                          Start adding items to create your perfect wedding collection
                        </p>
                        <Button 
                          onClick={() => {
                            setSelectedWishlist(null);
                            navigate('/products');
                          }}
                          className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white"
                        >
                          Browse Products
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "order":
        return (
          <div className="h-full">
            <div className="space-y-6">
              {/* Orders Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-luxury-serif text-2xl font-bold text-luxury-maroon">Your Orders</h2>
                <Button
                  onClick={() => navigate('/products')}
                  className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-luxury-taupe/20 overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Order Header */}
                  <div className="p-6 border-b border-luxury-taupe/20 bg-luxury-soft-pink/10">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-4">
                          <h3 className="font-luxury-serif font-bold text-luxury-maroon">Order #{order.orderNumber}</h3>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                            {getOrderStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-luxury-maroon/60 font-luxury-sans">
                          <span>Placed on {order.date.toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Total: {order.total}</span>
                          {order.estimatedDelivery && (
                            <>
                              <span>•</span>
                              <span>Delivery by {order.estimatedDelivery.toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedOrder(order)}
                        variant="outline"
                        className="border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-luxury-sans font-medium text-luxury-maroon truncate">{item.name}</h4>
                            <p className="text-sm text-luxury-maroon/60">Qty: {item.quantity}</p>
                            <p className="text-sm font-bold text-luxury-dusty-rose">{item.price}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex items-center justify-center text-luxury-maroon/60 font-luxury-sans text-sm">
                          +{order.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-luxury-taupe/20">
                    <div className="flex items-center justify-between">
                      <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon">
                        Order Details - #{selectedOrder.orderNumber}
                      </h3>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="w-8 h-8 bg-luxury-taupe/10 hover:bg-luxury-taupe/20 rounded-full flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5 text-luxury-maroon" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Order Status and Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-luxury-serif font-semibold text-luxury-maroon mb-2">Order Status</h4>
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${getOrderStatusColor(selectedOrder.status)}`}>
                            {getOrderStatusIcon(selectedOrder.status)}
                            <span className="font-medium">{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</span>
                          </div>
                        </div>
                        {selectedOrder.trackingNumber && (
                          <div>
                            <h4 className="font-luxury-serif font-semibold text-luxury-maroon mb-2">Tracking Number</h4>
                            <p className="font-luxury-sans text-luxury-maroon bg-luxury-soft-pink/20 px-3 py-2 rounded-lg inline-block">
                              {selectedOrder.trackingNumber}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-luxury-serif font-semibold text-luxury-maroon mb-2">Shipping Address</h4>
                          <p className="font-luxury-sans text-luxury-maroon/70">{selectedOrder.shippingAddress}</p>
                        </div>
                        <div>
                          <h4 className="font-luxury-serif font-semibold text-luxury-maroon mb-2">Payment Method</h4>
                          <p className="font-luxury-sans text-luxury-maroon/70">{selectedOrder.paymentMethod}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-luxury-serif font-semibold text-luxury-maroon mb-4">Items Ordered</h4>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-4 bg-luxury-soft-pink/10 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h5 className="font-luxury-sans font-semibold text-luxury-maroon">{item.name}</h5>
                              <p className="text-sm text-luxury-maroon/60 font-luxury-sans">{item.category}</p>
                              {item.size && <p className="text-sm text-luxury-maroon/60 font-luxury-sans">Size: {item.size}</p>}
                              {item.color && <p className="text-sm text-luxury-maroon/60 font-luxury-sans">Color: {item.color}</p>}
                            </div>
                            <div className="text-right">
                              <p className="font-luxury-sans font-semibold text-luxury-maroon">Qty: {item.quantity}</p>
                              <p className="font-luxury-serif font-bold text-luxury-dusty-rose">{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="border-t border-luxury-taupe/20 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-luxury-serif text-lg font-semibold text-luxury-maroon">Order Total:</span>
                        <span className="font-luxury-serif text-xl font-bold text-luxury-dusty-rose">{selectedOrder.total}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {selectedOrder.status === 'shipped' && (
                        <Button className="flex-1 bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white">
                          <Truck className="w-4 h-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                      {selectedOrder.status === 'delivered' && (
                        <Button className="flex-1 bg-luxury-maroon hover:bg-luxury-maroon/90 text-white">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Reorder Items
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="border-luxury-taupe/20 text-luxury-maroon hover:bg-luxury-taupe/10"
                      >
                        Download Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        );
      case "bookings":
        return (
          <div className="h-[calc(100vh-5rem)]">
            <Bookings />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink overflow-hidden">
      {/* Navigation - Keep main banner visible */}
      <Navigation />
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-luxury-maroon text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Check className="w-5 h-5" />
          <span className="font-luxury-sans text-sm">{notificationMessage}</span>
        </div>
      )}

      <div className="flex h-screen pt-20 overflow-hidden">
        {/* Sidebar - Fixed height from top of viewport */}
        <div className="w-80 bg-white/80 backdrop-blur-md shadow-xl border-r border-luxury-taupe/20 flex flex-col fixed top-20 bottom-0 left-0 z-30 overflow-hidden">
          {/* Navigation Items */}
          <div className="flex-1 p-6 space-y-2 overflow-y-auto overflow-x-hidden">
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
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-medium ${
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

        {/* Main Content - Offset by sidebar width */}
        <div className="flex-1 ml-80">
          {/* Content Area */}
          <div className={`relative h-[calc(100vh-5rem)] ${activeSection === 'enquiries' ? '' : 'overflow-y-auto px-8 py-8'}`}>
            {/* Background Floral Elements - Only for non-chat sections */}
            {activeSection !== 'enquiries' && (
              <>
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
              </>
            )}
            
            <div className={`relative z-10 max-w-7xl mx-auto h-full ${activeSection === 'enquiries' ? '' : ''}`}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Unified Checkout Modal */}
      {showCheckout && (
        <UnifiedCheckout
          products={chatProducts.filter(p => selectedChatProducts.includes(p.id))}
          onClose={() => setShowCheckout(false)}
          source="chat"
        />
      )}
    </div>
  );
};

export default Account; 