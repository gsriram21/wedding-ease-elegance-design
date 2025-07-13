import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Filter, Grid3X3, List, Star, ChevronLeft, ChevronRight, Search, Plus, Sparkles, SlidersHorizontal } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "./Navigation";
import ProductDetailModal from "./ProductDetailModal";
import WishlistModal from "./WishlistModal";

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

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [wishlistItems, setWishlistItems] = useState<number[]>([1, 3, 7]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [wishlists, setWishlists] = useState<Wishlist[]>([
    {
      id: "1",
      name: "Dream Wedding Collection",
      description: "My favorite items for the big day",
      products: [],
      createdAt: new Date(),
      coverImage: "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg"
    }
  ]);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [wishlistSelectedProduct, setWishlistSelectedProduct] = useState<Product | null>(null);
  const [activeFilters, setActiveFilters] = useState<{
    priceRange: [number, number];
    ratings: number[];
    colors: string[];
    brands: string[];
    sizes: string[];
  }>({
    priceRange: [0, 200000],
    ratings: [],
    colors: [],
    brands: [],
    sizes: []
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    // Check if we came from homepage with a pre-selected category
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
    
    return () => clearTimeout(timer);
  }, [searchParams]);

  const showToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const categories = [
    { 
      id: "all", 
      name: "Featured", 
      description: "Curated selection of our finest pieces",
      subcategories: ["trending", "new-arrivals", "best-sellers", "editors-choice"],
      banner: "/images/celebration-new-1.jpg"
    },
    { 
      id: "stationery", 
      name: "Wedding Stationery", 
      description: "Beautiful invitations, cards & stationery",
      subcategories: ["invitations", "save-the-dates", "rsvp-cards", "menu-cards", "place-cards", "thank-you-cards", "programs", "signage"],
      banner: "/images/invites-bg.png"
    },
    { 
      id: "attire", 
      name: "Wedding Attire", 
      description: "Exquisite clothing for your special day",
      subcategories: ["bridal-lehengas", "grooms-sherwanis", "bridal-sarees", "grooms-suits", "cocktail-dresses", "bridesmaid-dresses", "groomsmen-attire", "reception-wear"],
      banner: "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg"
    },
    { 
      id: "gifts-favors", 
      name: "Gifts & Favors", 
      description: "Thoughtful gifts and wedding favors",
      subcategories: ["wedding-favors", "gift-boxes", "return-gifts", "bridesmaid-gifts", "groomsmen-gifts", "parent-gifts", "anniversary-gifts", "personalized-gifts"],
      banner: "/images/celebration-new-2.jpg"
    },
    { 
      id: "jewelry", 
      name: "Jewelry & Accessories", 
      description: "Premium jewelry and elegant accessories",
      subcategories: ["bridal-jewelry-sets", "necklaces", "earrings", "bangles", "rings", "hair-accessories", "handbags", "shoes", "watches"],
      banner: "/images/accesories1.png"
    }
  ];

  const products = [
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
      id: 4,
      name: "Luxury Wedding Invitations",
      category: "stationery",
      subcategory: "invitations",
      price: "₹15,000",
      originalPrice: "₹18,000",
      rating: 4.6,
      reviews: 234,
      images: [
        "/images/invites1.png",
        "/images/invites-bg.png"
      ],
      description: "Premium wedding invitations with gold foil detailing and custom design",
      features: ["Premium Paper", "Gold Foil", "Custom Design", "Luxury Packaging"],
      trending: false,
      newArrival: true,
      bestSeller: false
    },
    {
      id: 5,
      name: "Designer Bridal Saree",
      category: "attire",
      subcategory: "bridal-sarees",
      price: "₹65,000",
      originalPrice: "₹75,000",
      rating: 4.9,
      reviews: 98,
      images: [
        "/images/awesome-sauce-creative-ZQJzMDWyqEI-unsplash.jpg",
        "/images/khadija-yousaf-lKwp3-FQomY-unsplash.jpg"
      ],
      description: "Silk saree with traditional handwoven border and contemporary blouse",
      features: ["Pure Silk", "Handwoven", "Designer Blouse", "Traditional Craft"],
      trending: true,
      newArrival: true,
      bestSeller: false
    },
    {
      id: 6,
      name: "Elegant Gift Hamper Set",
      category: "gifts-favors",
      subcategory: "gift-boxes",
      price: "₹8,500",
      originalPrice: "₹10,000",
      rating: 4.5,
      reviews: 67,
      images: [
        "/images/celebration-new-1.jpg",
        "/images/celebration-new-2.jpg",
        "/images/celebration-new-3.jpg"
      ],
      description: "Luxury gift hamper with sweets, dry fruits, and traditional items",
      features: ["Premium Packaging", "Traditional Sweets", "Dry Fruits", "Custom Message"],
      trending: false,
      newArrival: false,
      bestSeller: true
    },
    {
      id: 7,
      name: "Diamond Earring Collection",
      category: "jewelry",
      subcategory: "earrings",
      price: "₹95,000",
      originalPrice: "₹1,10,000",
      rating: 4.9,
      reviews: 145,
      images: [
        "/images/accesories1.png",
        "/images/51CB7100-724A-4F77-9B92-753CB27F47F9.png"
      ],
      description: "Stunning diamond earrings with traditional design and modern craftsmanship",
      features: ["Natural Diamonds", "18K Gold", "Certified Quality", "Designer Collection"],
      trending: true,
      newArrival: true,
      bestSeller: true
    },
    {
      id: 8,
      name: "Wedding Favor Box Set",
      category: "gifts-favors",
      subcategory: "wedding-favors",
      price: "₹2,500",
      originalPrice: "₹3,000",
      rating: 4.4,
      reviews: 78,
      images: [
        "/images/celebration-new-4.jpg",
        "/images/celebration-new-3.jpg"
      ],
      description: "Beautiful favor boxes with traditional sweets and small gifts",
      features: ["Set of 50 Boxes", "Assorted Sweets", "Gift Items", "Custom Labels"],
      trending: false,
      newArrival: true,
      bestSeller: false
    }
  ];

  const getDynamicFilters = () => {
    const baseFilters = {
      priceRange: { min: 0, max: 200000, step: 5000 },
      ratings: [4.5, 4.0, 3.5, 3.0],
      brands: ['Wedding Ease', 'Luxury Collection', 'Heritage Designs', 'Royal Crafts', 'Elegant Touch']
    };

    const categoryFilters = {
      all: {
        ...baseFilters,
        colors: ['red', 'blue', 'gold', 'silver', 'pink', 'green', 'purple', 'black'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        materials: ['Silk', 'Cotton', 'Satin', 'Velvet', 'Chiffon']
      },
      stationery: {
        ...baseFilters,
        colors: ['white', 'ivory', 'gold', 'silver', 'pink', 'blue', 'green', 'black'],
        sizes: ['A4', 'A5', '5x7', '4x6', 'Square', 'Custom'],
        materials: ['Paper', 'Cardstock', 'Vellum', 'Handmade Paper', 'Foil']
      },
      attire: {
        ...baseFilters,
        colors: ['red', 'maroon', 'gold', 'silver', 'pink', 'green', 'blue', 'black'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'],
        materials: ['Silk', 'Cotton', 'Velvet', 'Georgette', 'Chiffon']
      },
      'gifts-favors': {
        ...baseFilters,
        colors: ['gold', 'silver', 'pink', 'blue', 'green', 'purple', 'white', 'black'],
        sizes: ['Small', 'Medium', 'Large', 'Set of 10', 'Set of 25', 'Set of 50'],
        materials: ['Metal', 'Glass', 'Fabric', 'Wood', 'Ceramic']
      },
      jewelry: {
        ...baseFilters,
        colors: ['gold', 'silver', 'rose-gold', 'white-gold', 'platinum', 'copper'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'Adjustable'],
        materials: ['22K Gold', '18K Gold', 'Sterling Silver', 'Kundan', 'Pearls']
      }
    };

    return categoryFilters[activeCategory as keyof typeof categoryFilters] || categoryFilters.all;
  };

  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by category
    if (activeCategory !== "all") {
      if (activeCategory === "all" && activeSubcategory === "trending") {
        filtered = filtered.filter(p => p.trending);
      } else if (activeCategory === "all" && activeSubcategory === "new-arrivals") {
        filtered = filtered.filter(p => p.newArrival);
      } else if (activeCategory === "all" && activeSubcategory === "best-sellers") {
        filtered = filtered.filter(p => p.bestSeller);
      } else {
        filtered = filtered.filter(p => p.category === activeCategory);
      }
    }

    // Filter by subcategory
    if (activeSubcategory !== "all" && !["trending", "new-arrivals", "best-sellers", "editors-choice"].includes(activeSubcategory)) {
      filtered = filtered.filter(p => p.subcategory === activeSubcategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
          const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
          const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
          return priceB - priceA;
        });
        break;
      case "newest":
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default: // featured
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return 0;
        });
    }

    return filtered;
  };

  const getCurrentSubcategories = () => {
    const category = categories.find(c => c.id === activeCategory);
    return category ? category.subcategories : [];
  };

  const toggleWishlist = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setWishlistSelectedProduct(product);
      setIsWishlistModalOpen(true);
    }
  };

  const handleAddToWishlist = (wishlistId: string, product: Product) => {
    setWishlists(prev => prev.map(wishlist => {
      if (wishlist.id === wishlistId) {
        const isAlreadyAdded = wishlist.products.some(p => p.id === product.id);
        if (isAlreadyAdded) {
          showToast(`${product.name} is already in ${wishlist.name}`);
          return wishlist;
        }
        showToast(`Added ${product.name} to ${wishlist.name}`);
        return {
          ...wishlist,
          products: [...wishlist.products, product],
          coverImage: wishlist.coverImage || product.images[0]
        };
      }
      return wishlist;
    }));
    
    // Update wishlistItems for heart state
    setWishlistItems(prev => [...prev, product.id]);
  };

  const handleCreateWishlist = (name: string, description: string, product: Product) => {
    const newWishlist: Wishlist = {
      id: Date.now().toString(),
      name,
      description,
      products: [product],
      createdAt: new Date(),
      coverImage: product.images[0]
    };
    
    setWishlists(prev => [...prev, newWishlist]);
    setWishlistItems(prev => [...prev, product.id]);
    showToast(`Created wishlist "${name}" and added ${product.name}`);
  };

  const nextImage = (productId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (productId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const handleProductClick = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleAddToCart = (productName: string) => {
    showToast(`${productName} added to cart!`);
  };

  const handleBuyNow = (product: Product) => {
    showToast(`Proceeding to checkout for ${product.name}`);
    setIsModalOpen(false);
  };

  const handleGetPrice = (product: Product) => {
    showToast(`Price inquiry sent for ${product.name}. We'll contact you soon!`);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      {/* Navigation */}
      <Navigation />
      
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-luxury-maroon text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Heart className="w-5 h-5" />
          <span className="font-luxury-sans text-sm">{notificationMessage}</span>
        </div>
      )}

      {/* Sleek Search Bar */}
      <div className="sticky top-20 z-30 bg-white shadow-sm mt-20 border-b border-luxury-taupe/10">
        <div className="max-w-4xl mx-auto px-8 py-5">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-dusty-rose/60 group-focus-within:text-luxury-dusty-rose transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search wedding products, categories, or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-14 py-4 text-base rounded-2xl border-2 border-luxury-dusty-rose/20 bg-white/80 focus:bg-white focus:border-luxury-dusty-rose/50 focus:ring-2 focus:ring-luxury-dusty-rose/20 focus:shadow-lg transition-all duration-300 font-luxury-sans text-luxury-maroon placeholder:text-luxury-maroon/40 outline-none shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-luxury-maroon/10 text-luxury-maroon/60 hover:bg-luxury-maroon/20 hover:text-luxury-maroon transition-all duration-200"
              >
                ✕
                </button>
            )}
              </div>
            </div>
          </div>

      <div className="flex min-h-screen overflow-hidden">
        {/* Traditional Sidebar Filters */}
        <div className="w-80 min-w-[280px] max-w-[280px] bg-white/80 backdrop-blur-md shadow-xl border-r border-luxury-taupe/20 flex flex-col">
          {/* Header */}
          <div className="flex items-center h-20 border-b border-luxury-taupe/20 px-6">
            <h2 className="font-luxury-serif font-bold text-xl text-luxury-maroon">
              Filters
            </h2>
          </div>

          {/* Modern Filters */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {(() => {
              const filters = getDynamicFilters();
              return (
                <>
                  {/* Price Range Filter */}
                  <div>
                    <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4 flex items-center gap-2">
                      <span>💰</span>
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
              <input
                          type="range" 
                          min={filters.priceRange.min} 
                          max={filters.priceRange.max} 
                          step={filters.priceRange.step}
                          value={activeFilters.priceRange[1]}
                          onChange={(e) => setActiveFilters(prev => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                          }))}
                          className="flex-1 h-2 bg-luxury-taupe/20 rounded-lg appearance-none slider"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-luxury-maroon/70 font-luxury-sans">
                        <span>₹{filters.priceRange.min.toLocaleString()}</span>
                        <span>₹{filters.priceRange.max.toLocaleString()}+</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs text-luxury-maroon/70 font-luxury-sans">Min Price</label>
                          <input 
                            type="number" 
                            placeholder={`₹${filters.priceRange.min}`}
                            value={activeFilters.priceRange[0]}
                            onChange={(e) => setActiveFilters(prev => ({
                              ...prev,
                              priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                            }))}
                            className="w-full px-3 py-2 border border-luxury-taupe/30 rounded-lg text-sm focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-luxury-maroon/70 font-luxury-sans">Max Price</label>
                          <input 
                            type="number" 
                            placeholder={`₹${filters.priceRange.max}`}
                            value={activeFilters.priceRange[1]}
                            onChange={(e) => setActiveFilters(prev => ({
                              ...prev,
                              priceRange: [prev.priceRange[0], parseInt(e.target.value) || filters.priceRange.max]
                            }))}
                            className="w-full px-3 py-2 border border-luxury-taupe/30 rounded-lg text-sm focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose"
                          />
                        </div>
                      </div>
            </div>
          </div>

                  {/* Customer Rating Filter */}
            <div>
              <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4 flex items-center gap-2">
                      <span>⭐</span>
                      Customer Rating
              </h3>
              <div className="space-y-2">
                      {filters.ratings.map((rating) => (
                        <label key={rating} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={activeFilters.ratings.includes(rating)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setActiveFilters(prev => ({
                                  ...prev,
                                  ratings: [...prev.ratings, rating]
                                }));
                              } else {
                                setActiveFilters(prev => ({
                                  ...prev,
                                  ratings: prev.ratings.filter(r => r !== rating)
                                }));
                              }
                            }}
                            className="rounded border-luxury-taupe/30 text-luxury-dusty-rose focus:ring-luxury-dusty-rose" 
                          />
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-luxury-taupe/30'}`} />
                            ))}
                            <span className="text-sm text-luxury-maroon/70 ml-1 font-luxury-sans">{rating}+ ({Math.floor(Math.random() * 50) + 10})</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Color Filter */}
            {(() => {
              const filters = getDynamicFilters();
              return (
                <div>
                  <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4 flex items-center gap-2">
                    <span>🎨</span>
                    Color
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {filters.colors.map((color) => (
                  <button
                        key={color}
                    onClick={() => {
                          if (activeFilters.colors.includes(color)) {
                            setActiveFilters(prev => ({
                              ...prev,
                              colors: prev.colors.filter(c => c !== color)
                            }));
                          } else {
                            setActiveFilters(prev => ({
                              ...prev,
                              colors: [...prev.colors, color]
                            }));
                          }
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                          activeFilters.colors.includes(color) 
                            ? 'border-luxury-dusty-rose ring-2 ring-luxury-dusty-rose/30' 
                            : 'border-luxury-taupe/30 hover:border-luxury-dusty-rose'
                        } ${
                          color === 'gold' ? 'bg-yellow-400' :
                          color === 'silver' ? 'bg-gray-300' :
                          color === 'black' ? 'bg-black' :
                          color === 'white' ? 'bg-white' :
                          color === 'ivory' ? 'bg-amber-50' :
                          color === 'rose-gold' ? 'bg-rose-300' :
                          color === 'white-gold' ? 'bg-gray-100' :
                          color === 'platinum' ? 'bg-gray-200' :
                          color === 'copper' ? 'bg-amber-600' :
                          color === 'maroon' ? 'bg-red-800' :
                          `bg-${color}-500`
                        }`}
                        title={color.charAt(0).toUpperCase() + color.slice(1).replace('-', ' ')}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Brand Filter */}
            {(() => {
              const filters = getDynamicFilters();
              return (
                <div>
                  <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4 flex items-center gap-2">
                    <span>🏷️</span>
                    Brand
                  </h3>
                  <div className="space-y-2">
                    {filters.brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={activeFilters.brands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setActiveFilters(prev => ({
                                ...prev,
                                brands: [...prev.brands, brand]
                              }));
                            } else {
                              setActiveFilters(prev => ({
                                ...prev,
                                brands: prev.brands.filter(b => b !== brand)
                              }));
                            }
                          }}
                          className="rounded border-luxury-taupe/30 text-luxury-dusty-rose focus:ring-luxury-dusty-rose" 
                        />
                        <span className="text-sm text-luxury-maroon/70 font-luxury-sans">{brand} ({Math.floor(Math.random() * 30) + 5})</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Size Filter */}
            {(() => {
              const filters = getDynamicFilters();
              return (
                <div>
                  <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4 flex items-center gap-2">
                    <span>📏</span>
                    Size
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {filters.sizes.map((size) => (
                      <button 
                        key={size}
                        onClick={() => {
                          if (activeFilters.sizes.includes(size)) {
                            setActiveFilters(prev => ({
                              ...prev,
                              sizes: prev.sizes.filter(s => s !== size)
                            }));
                          } else {
                            setActiveFilters(prev => ({
                              ...prev,
                              sizes: [...prev.sizes, size]
                            }));
                          }
                        }}
                        className={`px-3 py-2 border rounded-lg text-sm font-luxury-sans transition-all duration-300 ${
                          activeFilters.sizes.includes(size)
                            ? 'border-luxury-dusty-rose bg-luxury-dusty-rose text-white'
                            : 'border-luxury-taupe/30 text-luxury-maroon/70 hover:border-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white'
                        }`}
                      >
                        {size}
                  </button>
                ))}
              </div>
            </div>
              );
            })()}

            {/* Subcategories - Only show when category is selected */}
            {activeCategory !== "all" && (
              <div>
                <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4 flex items-center gap-2">
                  <span>📂</span>
                  {categories.find(c => c.id === activeCategory)?.name} Types
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveSubcategory("all")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 font-luxury-sans ${
                      activeSubcategory === "all"
                        ? "bg-luxury-maroon text-white"
                        : "text-luxury-maroon/70 hover:bg-luxury-taupe/10"
                    }`}
                  >
                    All Types
                  </button>
                  {getCurrentSubcategories().map((subcategory) => (
                    <button
                      key={subcategory}
                      onClick={() => setActiveSubcategory(subcategory)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 font-luxury-sans capitalize ${
                        activeSubcategory === subcategory
                          ? "bg-luxury-maroon text-white"
                          : "text-luxury-maroon/70 hover:bg-luxury-taupe/10"
                      }`}
                    >
                      {subcategory.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Two-Level Banner System */}
          {/* Banner 1: Main Categories */}
          <div className="bg-white/90 backdrop-blur-sm border-b border-luxury-taupe/20">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-4 overflow-x-auto">
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveSubcategory("all");
                  }}
                  className={`flex-shrink-0 px-6 py-3 rounded-full transition-all duration-300 font-luxury-sans font-medium whitespace-nowrap ${
                    activeCategory === "all"
                      ? "bg-luxury-maroon text-white shadow-lg"
                      : "bg-white text-luxury-maroon hover:bg-luxury-dusty-rose hover:text-white border border-luxury-taupe/30"
                  }`}
                >
                  All Products
                </button>
                {categories.slice(1).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setActiveSubcategory("all");
                    }}
                    className={`flex-shrink-0 px-6 py-3 rounded-full transition-all duration-300 font-luxury-sans font-medium whitespace-nowrap ${
                      activeCategory === category.id
                        ? "bg-luxury-maroon text-white shadow-lg"
                        : "bg-white text-luxury-maroon hover:bg-luxury-dusty-rose hover:text-white border border-luxury-taupe/30"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Banner 2: Subcategories (only show when a specific category is selected) */}
          {activeCategory !== "all" && (
            <div className="bg-white/80 backdrop-blur-sm border-b border-luxury-taupe/10">
              <div className="max-w-7xl mx-auto px-6 py-3">
                <div className="relative">
                  {/* Left Arrow */}
                  <button
                    onClick={() => {
                      const container = document.getElementById('subcategory-container');
                      if (container) {
                        container.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 border border-luxury-taupe/20"
                  >
                    <ChevronLeft className="w-4 h-4 text-luxury-maroon" />
                  </button>
                  
                  {/* Subcategory Container */}
                  <div
                    id="subcategory-container"
                    className="flex items-center gap-3 overflow-x-auto px-8 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <button
                      onClick={() => setActiveSubcategory("all")}
                      className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 font-luxury-sans text-sm whitespace-nowrap ${
                        activeSubcategory === "all"
                          ? "bg-luxury-dusty-rose text-white shadow-md"
                          : "bg-white/80 text-luxury-maroon hover:bg-luxury-taupe/20 border border-luxury-taupe/20"
                      }`}
                    >
                      All Types
                    </button>
                    {getCurrentSubcategories().map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => setActiveSubcategory(subcategory)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 font-luxury-sans text-sm capitalize whitespace-nowrap ${
                          activeSubcategory === subcategory
                            ? "bg-luxury-dusty-rose text-white shadow-md"
                            : "bg-white/80 text-luxury-maroon hover:bg-luxury-taupe/20 border border-luxury-taupe/20"
                        }`}
                      >
                        {subcategory.replace('-', ' ')}
                      </button>
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={() => {
                      const container = document.getElementById('subcategory-container');
                      if (container) {
                        container.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 border border-luxury-taupe/20"
                  >
                    <ChevronRight className="w-4 h-4 text-luxury-maroon" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Header Bar with Product Count and Actions */}
          <div className="bg-white/90 backdrop-blur-md border-b border-luxury-taupe/20 sticky top-36 z-20 overflow-hidden">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4 min-w-0">
              <div>
                <span className="font-luxury-sans text-lg font-medium text-luxury-maroon">
                  {filteredProducts.length} products found
                </span>
              </div>
              
              <div className="flex items-center gap-2 lg:gap-4 overflow-hidden">
                {/* Modern Sorting Dropdown - Right Side */}
                <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                  <span className="font-luxury-sans text-sm text-luxury-maroon/70 hidden lg:block">Sort by:</span>
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-luxury-taupe/30 rounded-xl px-3 py-2.5 pr-8 font-luxury-sans text-sm text-luxury-maroon focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md min-w-[140px]"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="rating">Highest Rated</option>
                      <option value="popular">Most Popular</option>
                    </select>
                    <SlidersHorizontal className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-maroon/50 pointer-events-none" />
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-white/80 rounded-xl p-1 border border-luxury-taupe/20 shadow-sm">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="p-2 h-8 w-8 rounded-lg"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="p-2 h-8 w-8 rounded-lg"
                  >
                    <List className="w-4 h-4" />
                  </Button>
          </div>

                {/* Filter Toggle for Mobile */}
                <Button
                  variant="outline"
                  size="sm" 
                  className="md:hidden border-luxury-taupe/30 text-luxury-maroon hover:bg-luxury-taupe/10 rounded-xl px-3 py-2.5"
                >
                  <Filter className="w-4 h-4 mr-1" />
                  Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Products Grid/List */}
          <div className={`flex-1 relative px-6 md:px-8 py-6 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Subtle Background Elements */}
            <img 
              src="/images/bg-flower.png" 
              alt="" 
              className="absolute top-1/4 right-0 translate-x-1/2 w-[25rem] opacity-5 transform rotate-45 pointer-events-none"
            />
            <img 
              src="/images/bg-branch.png" 
              alt="" 
              className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/4 w-[30rem] opacity-5 pointer-events-none"
            />

            <div className="relative z-10 max-w-7xl mx-auto">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-luxury-dusty-rose/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-luxury-dusty-rose" />
                  </div>
                  <h3 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-4">
                    No products found
                  </h3>
                  <p className="text-luxury-maroon/60 font-luxury-sans text-lg max-w-md mx-auto">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {filteredProducts.map((product, index) => {
                    const isLiked = wishlistItems.includes(product.id);
                    const currentImg = currentImageIndex[product.id] || 0;
                    
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-luxury-taupe/10 hover:border-luxury-dusty-rose/30 cursor-pointer ${
                          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        } ${viewMode === "list" ? "flex gap-6 p-6" : "hover:-translate-y-1"}`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {/* Cleaner Product Image */}
                        <div className={`relative group/image overflow-hidden ${viewMode === "list" ? "w-40 h-40 flex-shrink-0 rounded-xl" : "aspect-[3/4]"}`}>
                          <img
                            src={product.images[currentImg]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 cursor-pointer group-hover:scale-110"
                            onClick={() => handleProductClick(product.id)}
                          />
                          
                          {/* Simplified Image Navigation */}
                          {product.images.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevImage(product.id, product.images.length);
                                }}
                                className="bg-white/90 text-luxury-maroon hover:bg-white rounded-full p-1.5 h-8 w-8 shadow-lg"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextImage(product.id, product.images.length);
                                }}
                                className="bg-white/90 text-luxury-maroon hover:bg-white rounded-full p-1.5 h-8 w-8 shadow-lg"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                          )}

                          {/* Elegant Wishlist Heart */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className={`absolute top-3 right-3 rounded-full transition-all duration-300 h-8 w-8 ${
                              isLiked 
                                ? 'bg-luxury-dusty-rose text-white hover:bg-luxury-dusty-rose/90 shadow-lg' 
                                : 'bg-white/90 text-luxury-dusty-rose hover:bg-white shadow-lg'
                            }`}
                          >
                            <Heart className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-current' : ''}`} />
                          </Button>

                          {/* Simplified Badge */}
                          {(product.trending || product.newArrival || product.bestSeller) && (
                            <div className="absolute top-3 left-3">
                              {product.trending && (
                                <span className="bg-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-luxury-sans font-medium shadow-md">
                                  🔥 Trending
                                </span>
                              )}
                              {product.newArrival && !product.trending && (
                                <span className="bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-luxury-sans font-medium shadow-md">
                                  ✨ New
                                </span>
                              )}
                              {product.bestSeller && !product.trending && !product.newArrival && (
                                <span className="bg-luxury-maroon text-white px-2.5 py-1 rounded-full text-xs font-luxury-sans font-medium shadow-md">
                                  ⭐ Bestseller
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Cleaner Product Info */}
                        <div className={viewMode === "list" ? "flex-1 py-2" : "p-5"}>
                          <div className="mb-3">
                                                      <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon line-clamp-2 hover:text-luxury-dusty-rose transition-colors duration-300 mb-1">
                              {product.name}
                            </h3>
                            <p className="font-luxury-sans text-luxury-maroon/60 text-sm leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                          </div>

                          {/* Streamlined Features */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {product.features.slice(0, 2).map((feature, i) => (
                              <span key={i} className="bg-luxury-taupe/15 text-luxury-maroon/70 px-2.5 py-1 rounded-full text-xs font-luxury-sans">
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* Price and Rating */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="font-luxury-serif text-xl font-bold text-luxury-dusty-rose">
                                {product.price}
                              </span>
                              <span className="font-luxury-sans text-sm text-luxury-maroon/40 line-through">
                                {product.originalPrice}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-luxury-sans text-sm text-luxury-maroon/70 font-medium">
                                {product.rating}
                              </span>
                            </div>
                          </div>

                          {/* Simplified Action Buttons */}
                          <div className="flex gap-2">
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProductClick(product.id);
                              }}
                              className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans text-sm py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onWishlistToggle={toggleWishlist}
        isWishlisted={selectedProduct ? wishlistItems.includes(selectedProduct.id) : false}
        onBuyNow={handleBuyNow}
        onGetPrice={handleGetPrice}
      />

      {/* Pinterest-style Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => {
          setIsWishlistModalOpen(false);
          setWishlistSelectedProduct(null);
        }}
        product={wishlistSelectedProduct}
        onAddToWishlist={handleAddToWishlist}
        onCreateWishlist={handleCreateWishlist}
        existingWishlists={wishlists}
      />
    </div>
  );
};

export default Products; 