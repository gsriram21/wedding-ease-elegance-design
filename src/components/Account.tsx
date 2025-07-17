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
  // Chat Messages state with improved welcome message
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string, 
    type: 'user' | 'assistant' | 'bot', 
    content: string, 
    timestamp: Date | string, 
    action?: string, 
    products?: any[]
  }>>([
    {
      id: 'welcome',
      type: 'bot',
      content: '👋 Welcome to WeddingEase! I\'m here to help you plan your perfect wedding. I can assist you with packages, consultations, product browsing, and personalized quotes.',
      action: 'welcome-actions',
      timestamp: new Date().toISOString()
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

  // Address management state
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      type: "Home",
      street: "A-123, Green Park Extension",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110016",
      country: "India",
      isDefault: true
    },
    {
      id: "2",
      type: "Wedding Venue",
      street: "The Grand Palace Resort",
      city: "Udaipur",
      state: "Rajasthan",
      postalCode: "313001",
      country: "India",
      isDefault: false
    }
  ]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [newAddressType, setNewAddressType] = useState("");
  const [newAddressStreet, setNewAddressStreet] = useState("");
  const [newAddressCity, setNewAddressCity] = useState("");
  const [newAddressState, setNewAddressState] = useState("");
  const [newAddressPostalCode, setNewAddressPostalCode] = useState("");
  const [newAddressCountry, setNewAddressCountry] = useState("");

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

  // Update URL when section changes and handle browser navigation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    // Listen for browser navigation (back/forward buttons)
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const section = urlParams.get('section') || "enquiries";
      setActiveSection(section);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Update URL when activeSection changes
  const handleSectionChange = (newSection: string) => {
    setActiveSection(newSection);
    
    // Update URL without triggering navigation
    const newUrl = `/account?section=${newSection}`;
    window.history.pushState({ section: newSection }, '', newUrl);
  };

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

  // Use the same products as Products.tsx to ensure consistency
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "Royal Maharani Lehenga",
      category: "attire",
      subcategory: "bridal-lehengas",
      price: "₹1,25,000",
      originalPrice: "₹1,50,000",
      rating: 4.9,
      reviews: 127,
      images: [
        "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg",
        "/images/khadija-yousaf-lKwp3-FQomY-unsplash.jpg",
        "/images/awesome-sauce-creative-ZQJzMDWyqEI-unsplash.jpg"
      ],
      description: "Handcrafted silk lehenga with intricate gold embroidery and traditional motifs",
      features: ["Pure Silk", "Hand Embroidered", "Custom Fitting", "Heritage Collection"],
      trending: true,
      newArrival: false,
      bestSeller: true
    },
    {
      id: 3,
      name: "Premium Sherwani Collection",
      category: "attire",
      subcategory: "grooms-sherwanis",
      price: "₹45,000",
      originalPrice: "₹55,000",
      rating: 4.7,
      reviews: 156,
      images: [
        "/images/pablo-heimplatz-fVL0zZdk-R4-unsplash.jpg",
        "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg"
      ],
      description: "Elegant silk sherwani with detailed embroidery and perfect tailoring",
      features: ["Silk Fabric", "Custom Tailoring", "Designer Embroidery", "Occasion Wear"],
      trending: true,
      newArrival: false,
      bestSeller: true
    },
    {
      id: 6,
      name: "Elegant Bridal Maang Tikka",
      category: "jewelry",
      subcategory: "bridal-jewelry-sets",
      price: "₹25,000",
      originalPrice: "₹30,000",
      rating: 4.6,
      reviews: 78,
      images: ["/images/accesories1.png"],
      description: "Traditional gold maang tikka with intricate design",
      features: ["22K Gold", "Traditional Design", "Lightweight", "Handcrafted"],
      trending: false,
      newArrival: true,
      bestSeller: false
    }
  ];

  const jewelryProducts: Product[] = [
    {
      id: 2,
      name: "Heritage Gold Necklace Set",
      category: "jewelry",
      subcategory: "bridal-jewelry-sets",
      price: "₹85,000",
      originalPrice: "₹95,000",
      rating: 4.8,
      reviews: 89,
      images: [
        "/images/accesories1.png",
        "/images/51CB7100-724A-4F77-9B92-753CB27F47F9.png"
      ],
      description: "Exquisite 22k gold necklace set with traditional kundan work",
      features: ["22K Gold", "Kundan Work", "Handcrafted", "Traditional Design"],
      trending: false,
      newArrival: true,
      bestSeller: false
    },
    {
      id: 5,
      name: "Designer Pearl Bracelet",
      category: "jewelry",
      subcategory: "bridal-jewelry-sets",
      price: "₹18,000",
      originalPrice: "₹22,000",
      rating: 4.6,
      reviews: 45,
      images: ["/images/accesories1.png"],
      description: "Elegant pearl bracelet with gold accents",
      features: ["Freshwater Pearls", "Gold Accents", "Adjustable Size", "Luxury Finish"],
      trending: false,
      newArrival: false,
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

  const viewProductDetails = (productId: number, productName: string) => {
    // Navigate to specific product page instead of all products
    navigate(`/products?product=${productId}&name=${encodeURIComponent(productName)}`);
  };

  // Address management functions
  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setNewAddressType(address.type);
    setNewAddressStreet(address.street);
    setNewAddressCity(address.city);
    setNewAddressState(address.state);
    setNewAddressPostalCode(address.postalCode);
    setNewAddressCountry(address.country);
    setIsAddingAddress(true); // Open the add/edit modal
  };

  const handleDeleteAddress = (addressId: string) => {
    // Find the address to be deleted
    const addressToDelete = addresses.find(addr => addr.id === addressId);
    if (!addressToDelete) return;

    // If it's the default address, set another address as default first
    if (addressToDelete.isDefault && addresses.length > 1) {
      const remainingAddresses = addresses.filter(addr => addr.id !== addressId);
      setAddresses(prev => prev.map(addr => 
        addr.id === remainingAddresses[0].id 
          ? { ...addr, isDefault: true }
          : addr.id === addressId 
            ? null 
            : addr
      ).filter(Boolean) as any[]);
    } else {
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    }
    showToast('Address deleted successfully!');
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
    showToast('Default address updated!');
  };

  const handleSaveAddress = () => {
    if (!newAddressType.trim() || !newAddressStreet.trim() || !newAddressCity.trim() || 
        !newAddressState.trim() || !newAddressPostalCode.trim() || !newAddressCountry.trim()) {
      showToast('Please fill all address fields');
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? {
              ...addr,
              type: newAddressType.trim(),
              street: newAddressStreet.trim(),
              city: newAddressCity.trim(),
              state: newAddressState.trim(),
              postalCode: newAddressPostalCode.trim(),
              country: newAddressCountry.trim()
            }
          : addr
      ));
      showToast('Address updated successfully!');
    } else {
      // Add new address
      const newAddress = {
        id: Date.now().toString(),
        type: newAddressType.trim(),
        street: newAddressStreet.trim(),
        city: newAddressCity.trim(),
        state: newAddressState.trim(),
        postalCode: newAddressPostalCode.trim(),
        country: newAddressCountry.trim(),
        isDefault: addresses.length === 0 // Make first address default
      };
      setAddresses(prev => [...prev, newAddress]);
      showToast('Address added successfully!');
    }

    // Clear form and close modal
    setIsAddingAddress(false);
    setEditingAddress(null);
    setNewAddressType("");
    setNewAddressStreet("");
    setNewAddressCity("");
    setNewAddressState("");
    setNewAddressPostalCode("");
    setNewAddressCountry("");
  };

  const handleCloseAddressModal = () => {
    setIsAddingAddress(false);
    setEditingAddress(null);
    setNewAddressType("");
    setNewAddressStreet("");
    setNewAddressCity("");
    setNewAddressState("");
    setNewAddressPostalCode("");
    setNewAddressCountry("");
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
    navigate('/');
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
    // Smart Schedule Meeting logic based on user status - direct redirect without alerts
    switch (userStatus) {
      case 'new':
        // First free consultation: redirect to calendar booking
        handleSectionChange('bookings');
        break;
      case 'used-free':
        // Returning users who used free consultation: redirect to buy package page
        navigate('/?section=packages');
        break;
      case 'has-package':
        // Users with package: redirect to calendar booking
        handleSectionChange('bookings');
        break;
      default:
        handleSectionChange('bookings');
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

  // Handle quick question clicks
  const handleQuickQuestion = (question: string) => {
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date().toISOString()
    }]);

    // Simulate AI response
    setTimeout(() => {
      let assistantContent = "Thank you for asking! I'm here to help you with your wedding planning.";
      let action = undefined;
      
      if (question.includes('packages')) {
        assistantContent = "We offer comprehensive wedding packages including Full-Service Planning, Partial Planning, and Day-of Coordination. Each package is customizable to your needs and budget.";
        action = 'show-options';
      } else if (question.includes('consultation')) {
        assistantContent = "Our consultation service is complimentary! We'll discuss your vision, budget, timeline, and how we can make your dream wedding a reality.";
      } else if (question.includes('destination')) {
        assistantContent = "Absolutely! We specialize in destination weddings across beautiful locations. From beach ceremonies to mountain venues, we handle all logistics for your special day.";
      }
      
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: assistantContent,
        timestamp: new Date().toISOString(),
        action
      }]);
    }, 1000);
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
    // Actions with actual functionality - execute directly without alerts
    const functionalActions = {
      'book-consultation': () => handleScheduleMeeting(),
      'save-booking': () => {
        showToast('Booking saved successfully!');
        handleBookingSubmit();
      },
      'show-products': () => handleShowProducts(),
      'view-selected': () => handleViewSelectedProducts(),
      'browse-products': () => handleShowProducts(),
      'save-profile': () => showToast('Profile saved successfully!')
    };

    // Actions without functionality - show alert
    const nonFunctionalMessages = {
      'ask-question': 'AI assistant integration coming soon!',
      'get-quote': 'Custom quote generation coming soon!',
      'upload-photo': 'Photo upload feature coming soon!',
      'change-password': 'Password change feature coming soon!',
      'browse-packages': 'Package viewing coming soon!',
      'track-order': 'Order tracking feature coming soon!',
      'add-shopper': 'Add shopper feature coming soon!',
      'add-address': 'Address management coming soon!',
      'edit-address': 'Address editing coming soon!',
      'delete-address': 'Address deletion coming soon!',
      'two-factor': 'Two-factor authentication coming soon!'
    };
    
    // Execute functional actions directly
    if (functionalActions[action as keyof typeof functionalActions]) {
      functionalActions[action as keyof typeof functionalActions]();
      return;
    }
    
    // Show alert for non-functional actions
    if (nonFunctionalMessages[action as keyof typeof nonFunctionalMessages]) {
      showToast(nonFunctionalMessages[action as keyof typeof nonFunctionalMessages]);
      return;
    }
    
    // Default fallback
    showToast('Feature coming soon!');
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

                        {/* Welcome Actions - Embedded in the welcome message */}
                        {message.action === 'welcome-actions' && (
                          <div className="mt-4 space-y-3">
                            {/* Quick Action Cards - Compact Design */}
                            <div className="grid grid-cols-2 gap-2">
                              <button 
                                onClick={() => handleMockAction('book-consultation')}
                                className="bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-luxury-taupe/20 hover:bg-white/40 text-left group transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-luxury-dusty-rose/20 rounded-md flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white">
                                    <Calendar className="w-3 h-3 text-luxury-dusty-rose group-hover:text-white" />
                                  </div>
                                  <div>
                                    <span className="font-luxury-serif font-bold text-luxury-maroon text-xs block">Book Consultation</span>
                                    <span className="font-luxury-sans text-xs text-luxury-maroon/60">Free consultation</span>
                                  </div>
                                </div>
                              </button>
                              <button 
                                onClick={() => handleMockAction('browse-packages')}
                                className="bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-luxury-taupe/20 hover:bg-white/40 text-left group transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-luxury-dusty-rose/20 rounded-md flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white">
                                    <ShoppingBag className="w-3 h-3 text-luxury-maroon group-hover:text-white" />
                                  </div>
                                  <div>
                                    <span className="font-luxury-serif font-bold text-luxury-maroon text-xs block">View Packages</span>
                                    <span className="font-luxury-sans text-xs text-luxury-maroon/60">Explore options</span>
                                  </div>
                                </div>
                              </button>
                              <button 
                                onClick={() => navigate('/products')}
                                className="bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-luxury-taupe/20 hover:bg-white/40 text-left group transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-luxury-dusty-rose/20 rounded-md flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white">
                                    <Heart className="w-3 h-3 text-luxury-dusty-rose group-hover:text-white" />
                                  </div>
                                  <div>
                                    <span className="font-luxury-serif font-bold text-luxury-maroon text-xs block">Browse Products</span>
                                    <span className="font-luxury-sans text-xs text-luxury-maroon/60">View collection</span>
                                  </div>
                                </div>
                              </button>
                              <button 
                                onClick={() => handleMockAction('get-quote')}
                                className="bg-white/30 backdrop-blur-sm rounded-lg p-2 border border-luxury-taupe/20 hover:bg-white/40 text-left group transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-luxury-dusty-rose/20 rounded-md flex items-center justify-center group-hover:bg-luxury-dusty-rose group-hover:text-white">
                                    <User className="w-3 h-3 text-luxury-maroon group-hover:text-white" />
                                  </div>
                                  <div>
                                    <span className="font-luxury-serif font-bold text-luxury-maroon text-xs block">Get Quote</span>
                                    <span className="font-luxury-sans text-xs text-luxury-maroon/60">Custom pricing</span>
                                  </div>
                                </div>
                              </button>
                            </div>

                            {/* Suggested Questions - Compact */}
                            <div className="border-t border-luxury-taupe/20 pt-3">
                              <p className="font-luxury-sans text-luxury-maroon/80 text-xs mb-2">
                                💬 Quick questions:
                              </p>
                              <div className="space-y-1">
                                {[
                                  "What wedding packages do you offer?",
                                  "How do I book a venue consultation?",
                                  "Can you help with destination weddings?"
                                ].map((question, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleQuickQuestion(question)}
                                    className="block w-full text-left p-2 rounded-md bg-luxury-soft-pink/20 hover:bg-luxury-dusty-rose/20 text-xs font-luxury-sans text-luxury-maroon/80 hover:text-luxury-maroon transition-all"
                                  >
                                    {question}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

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
                        {typeof message.timestamp === 'string' 
                          ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
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
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-luxury-taupe/10">
                <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-6">Personal Information</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                        First Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                        placeholder="First name"
                        defaultValue="Priya"
                      />
                    </div>
                    <div>
                      <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                        placeholder="Last name"
                        defaultValue="Sharma"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Gender
                    </label>
                    <div className="relative">
                      <select className="appearance-none w-full bg-white border border-luxury-taupe/30 rounded-xl px-4 py-3 pr-10 font-luxury-sans text-luxury-maroon focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md bg-white/50">
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-maroon/50 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                      placeholder="Enter your email"
                      defaultValue="priya.sharma@example.com"
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
                      defaultValue="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-3 tracking-wide uppercase text-sm">
                      Wedding Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
                      defaultValue="2024-12-15"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
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
                </div>
              </div>

              {/* Address Management */}
              <div className="space-y-6">
                {/* Current Package Details */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-luxury-taupe/10">
                  <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-4">Active Package Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-luxury-sans text-luxury-maroon/70">Package:</span>
                      <span className="font-luxury-serif font-bold text-luxury-maroon">Royal Package</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-luxury-sans text-luxury-maroon/70">Gender:</span>
                      <span className="font-luxury-sans text-luxury-maroon">Female</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-luxury-sans text-luxury-maroon/70">Services Included:</span>
                      <span className="font-luxury-sans text-luxury-maroon">Full Planning</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-luxury-sans text-luxury-maroon/70">Consultant:</span>
                      <span className="font-luxury-sans text-luxury-maroon">Meera Patel</span>
                    </div>
                    <Button 
                      onClick={() => handleMockAction('add-shopper')}
                      variant="outline"
                      className="w-full mt-4 border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white font-luxury-sans tracking-wide uppercase text-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Shopper
                    </Button>
                  </div>
                </div>

                {/* Address Management */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-luxury-taupe/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon">Addresses</h3>
                    <Button 
                      onClick={() => setIsAddingAddress(true)}
                      size="sm"
                      className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-luxury-taupe/20 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-luxury-maroon" />
                              <span className="font-luxury-serif font-bold text-luxury-maroon">{address.type}</span>
                              {address.isDefault && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Default</span>
                              )}
                            </div>
                            <p className="font-luxury-sans text-luxury-maroon/70 text-sm">
                              {address.street}<br />
                              {address.city}, {address.state} {address.postalCode}<br />
                              {address.country}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleEditAddress(address)}
                              variant="outline" 
                              size="sm"
                              className="border-luxury-taupe/20 text-luxury-maroon hover:bg-luxury-taupe/10"
                            >
                              Edit
                            </Button>
                            <Button 
                              onClick={() => handleDeleteAddress(address.id)}
                              variant="outline" 
                              size="sm"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                              disabled={address.isDefault && addresses.length === 1}
                            >
                              Delete
                            </Button>
                            {!address.isDefault && (
                              <Button 
                                onClick={() => handleSetDefaultAddress(address.id)}
                                variant="outline" 
                                size="sm"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                Set Default
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Account Security */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-luxury-taupe/10">
                  <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-4">Account Security</h3>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => handleMockAction('change-password')}
                      variant="outline"
                      className="w-full border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white font-luxury-sans tracking-wide uppercase text-sm"
                    >
                      Change Password
                    </Button>
                    <Button 
                      onClick={() => handleMockAction('two-factor')}
                      variant="outline"
                      className="w-full border-luxury-taupe/20 text-luxury-maroon hover:bg-luxury-taupe/10 font-luxury-sans tracking-wide uppercase text-sm"
                    >
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
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
              {/* Create New Wishlist Card - Elegant Style */}
              <div 
                onClick={() => setIsCreatingWishlist(true)}
                className="bg-gradient-to-br from-white via-luxury-ivory/50 to-luxury-soft-pink/20 backdrop-blur-sm rounded-xl shadow-lg border border-luxury-dusty-rose/30 hover:border-luxury-dusty-rose hover:shadow-xl hover:from-luxury-ivory hover:to-luxury-soft-pink/40 transition-all duration-300 cursor-pointer group text-center relative overflow-hidden p-6"
              >
                <div className="h-full flex items-center justify-center">
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
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" style={{ left: '320px', right: 0, top: 0, bottom: 0 }}>
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
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" style={{ left: '320px', right: 0, top: 0, bottom: 0 }}>
                <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto mx-auto">
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
                                  onClick={() => viewProductDetails(product.id, product.name)}
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
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" style={{ left: '320px', right: 0, top: 0, bottom: 0 }}>
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
          {/* Active Package Information */}
          <div className="p-6 border-b border-luxury-taupe/20">
            <div className="bg-gradient-to-r from-luxury-dusty-rose/10 to-luxury-maroon/10 rounded-xl p-4 border border-luxury-taupe/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-luxury-dusty-rose to-luxury-maroon rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-luxury-serif font-bold text-luxury-maroon text-sm">Shilpa Parikh</h3>
                  <p className="font-luxury-sans text-xs text-luxury-maroon/60">Active Member</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-luxury-sans text-xs text-luxury-maroon/70">Current Package:</span>
                  <span className="font-luxury-serif font-bold text-xs text-luxury-maroon">Royal Package</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-luxury-sans text-xs text-luxury-maroon/70">Status:</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-luxury-sans text-xs text-luxury-maroon/70">Wedding Date:</span>
                  <span className="font-luxury-sans text-xs text-luxury-maroon">Dec 15, 2024</span>
                </div>
                <Button
                  variant="outline" 
                  size="sm"
                  className="w-full mt-3 border-luxury-maroon/20 text-luxury-maroon hover:bg-luxury-maroon hover:text-white text-xs"
                  onClick={() => handleSectionChange('profile')}
                >
                  View Package Details
                </Button>
              </div>
            </div>
          </div>
          
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
                      handleSectionChange(item.id);
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

      {/* Add/Edit Address Modal */}
      {isAddingAddress && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-luxury-taupe/20">
              <div className="flex items-center justify-between">
                <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button
                  onClick={handleCloseAddressModal}
                  className="w-8 h-8 bg-luxury-taupe/10 hover:bg-luxury-taupe/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-luxury-maroon" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-2">Address Type</label>
                <input 
                  type="text" 
                  value={newAddressType}
                  onChange={(e) => setNewAddressType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent"
                  placeholder="e.g., Home, Office, Wedding Venue"
                />
              </div>
              <div>
                <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-2">Street Address</label>
                <input 
                  type="text" 
                  value={newAddressStreet}
                  onChange={(e) => setNewAddressStreet(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent"
                  placeholder="Enter street address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-2">City</label>
                  <input 
                    type="text" 
                    value={newAddressCity}
                    onChange={(e) => setNewAddressCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-2">State</label>
                  <input 
                    type="text" 
                    value={newAddressState}
                    onChange={(e) => setNewAddressState(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent"
                    placeholder="State"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    value={newAddressPostalCode}
                    onChange={(e) => setNewAddressPostalCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent"
                    placeholder="Postal Code"
                  />
                </div>
                <div>
                  <label className="block text-luxury-maroon/80 font-luxury-sans font-medium mb-2">Country</label>
                  <input 
                    type="text" 
                    value={newAddressCountry}
                    onChange={(e) => setNewAddressCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent"
                    placeholder="Country"
                    defaultValue="India"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleSaveAddress}
                  className="flex-1 bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white"
                >
                  {editingAddress ? 'Update Address' : 'Add Address'}
                </Button>
                <Button 
                  onClick={handleCloseAddressModal}
                  variant="outline"
                  className="border-luxury-taupe/20 text-luxury-maroon hover:bg-luxury-taupe/10"
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
};

export default Account; 