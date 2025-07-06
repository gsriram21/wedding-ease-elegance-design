import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Filter, Grid3X3, List, Star, ChevronLeft, ChevronRight, Search, Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
      subcategories: ["trending", "new-arrivals", "best-sellers", "editors-choice"]
    },
    { 
      id: "attire", 
      name: "Wedding Attire", 
      description: "Exquisite clothing for your special day",
      subcategories: ["trousseau", "sherwani", "lehenga", "saree", "blazer", "gown"]
    },
    { 
      id: "jewelry", 
      name: "Luxury Jewelry", 
      description: "Premium jewelry and accessories",
      subcategories: ["necklaces", "earrings", "rings", "bracelets", "sets", "accessories"]
    },
    { 
      id: "decor", 
      name: "Wedding Decor", 
      description: "Beautiful decorations and arrangements",
      subcategories: ["flowers", "mandap", "lighting", "centerpieces", "backdrop", "table-setup"]
    },
    { 
      id: "collections", 
      name: "Special Collections", 
      description: "Curated seasonal and designer collections",
      subcategories: ["summer-2025", "royal-heritage", "modern-elegance", "traditional-grace"]
    }
  ];

  const products = [
    {
      id: 1,
      name: "Royal Maharani Lehenga",
      category: "attire",
      subcategory: "lehenga",
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
      subcategory: "sets",
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
      subcategory: "sherwani",
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
      category: "decor",
      subcategory: "stationery",
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
      subcategory: "saree",
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
      name: "Mandap Decoration Package",
      category: "decor",
      subcategory: "mandap",
      price: "₹2,50,000",
      originalPrice: "₹3,00,000",
      rating: 4.8,
      reviews: 67,
      images: [
        "/images/celebration-new-1.jpg",
        "/images/celebration-new-2.jpg",
        "/images/celebration-new-3.jpg"
      ],
      description: "Complete mandap decoration with flowers, drapes, and traditional elements",
      features: ["Fresh Flowers", "Designer Drapes", "Traditional Setup", "Full Service"],
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
      name: "Summer 2025 Cocktail Dress",
      category: "collections",
      subcategory: "summer-2025",
      price: "₹35,000",
      originalPrice: "₹42,000",
      rating: 4.7,
      reviews: 78,
      images: [
        "/images/khadija-yousaf-lKwp3-FQomY-unsplash.jpg",
        "/images/awesome-sauce-creative-ZQJzMDWyqEI-unsplash.jpg"
      ],
      description: "Contemporary cocktail dress from our exclusive Summer 2025 collection",
      features: ["Limited Edition", "Breathable Fabric", "Modern Cut", "Summer Collection"],
      trending: true,
      newArrival: true,
      bestSeller: false
    }
  ];

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

    return filtered;
  };

  const getCurrentSubcategories = () => {
    const category = categories.find(c => c.id === activeCategory);
    return category ? category.subcategories : [];
  };

  const toggleWishlist = (productId: number) => {
    setWishlistItems(prev => {
      const isLiked = prev.includes(productId);
      if (isLiked) {
        showToast("Removed from wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Added to wishlist");
        return [...prev, productId];
      }
    });
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
    showToast("Product details will be available soon!");
  };

  const handleAddToCart = (productName: string) => {
    showToast(`${productName} added to cart!`);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink">
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-luxury-maroon text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Heart className="w-5 h-5" />
          <span className="font-luxury-sans text-sm">{notificationMessage}</span>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar Filters */}
        <div className="w-80 bg-white/80 backdrop-blur-md shadow-xl border-r border-luxury-taupe/20 flex flex-col">
          {/* Header */}
          <div className="flex items-center h-20 border-b border-luxury-taupe/20">
            <div className="flex-1 flex justify-start px-6">
              <div className="flex items-center">
                <button onClick={() => navigate('/')} className="transition-all duration-300 hover:opacity-80">
                  <img 
                    src="/images/logo.png" 
                    alt="Wedding Ease Logo" 
                    className="h-12 w-auto cursor-pointer"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-luxury-taupe/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-maroon/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-luxury-taupe/30 focus:ring-2 focus:ring-luxury-dusty-rose focus:border-transparent transition-all duration-300 font-luxury-sans text-luxury-maroon bg-white/50"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div>
              <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setActiveSubcategory("all");
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-luxury-dusty-rose text-white shadow-lg"
                        : "text-luxury-maroon/70 hover:bg-luxury-soft-pink hover:text-luxury-maroon"
                    }`}
                  >
                    <div className="font-luxury-sans font-medium">{category.name}</div>
                    <div className="text-xs opacity-75 mt-1">{category.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories */}
            {activeCategory !== "all" && (
              <div>
                <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4">
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
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md border-b border-luxury-taupe/20 sticky top-0 z-20">
            <div className="flex items-center justify-between h-20 px-8">
              <div>
                <h1 className="font-luxury-serif font-bold text-3xl text-luxury-maroon tracking-tight">
                  {categories.find(c => c.id === activeCategory)?.name || "Products"}
                </h1>
                <div className="w-16 h-px bg-luxury-dusty-rose mt-2" />
              </div>
              <div className="flex items-center gap-4">
                <span className="font-luxury-sans text-luxury-maroon/70">
                  {filteredProducts.length} products
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="p-2"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="p-2"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Row */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-luxury-taupe/10 px-8 py-4">
            <div className="flex items-center gap-4 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setActiveSubcategory("all");
                  }}
                  className={`flex-shrink-0 px-6 py-2 rounded-full transition-all duration-300 font-luxury-sans font-medium whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-luxury-maroon text-white shadow-lg"
                      : "bg-white/80 text-luxury-maroon hover:bg-luxury-dusty-rose hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={`flex-1 relative px-8 py-8 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Background Elements */}
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
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-8 h-8 text-luxury-dusty-rose" />
                  </div>
                  <h3 className="font-luxury-serif text-2xl font-bold text-luxury-maroon mb-4">
                    No products found
                  </h3>
                  <p className="text-luxury-maroon/60 font-luxury-sans text-base">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-6"
                }>
                  {filteredProducts.map((product, index) => {
                    const isLiked = wishlistItems.includes(product.id);
                    const currentImg = currentImageIndex[product.id] || 0;
                    
                    return (
                      <div
                        key={product.id}
                        className={`relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group ${
                          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        } ${viewMode === "list" ? "flex gap-6 p-6" : ""}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        {/* Product Image */}
                        <div className={`relative group/image ${viewMode === "list" ? "w-48 h-48 flex-shrink-0" : "aspect-[4/3]"}`}>
                          <img
                            src={product.images[currentImg]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                          
                          {/* Image Navigation */}
                          {product.images.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevImage(product.id, product.images.length);
                                }}
                                className="bg-white/80 text-luxury-maroon hover:bg-white rounded-full p-2"
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
                                className="bg-white/80 text-luxury-maroon hover:bg-white rounded-full p-2"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                          )}

                          {/* Wishlist Heart */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className={`absolute top-3 right-3 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ${
                              isLiked 
                                ? 'bg-luxury-dusty-rose/90 text-white hover:bg-luxury-dusty-rose' 
                                : 'bg-white/80 text-luxury-dusty-rose hover:bg-white hover:text-luxury-maroon'
                            }`}
                          >
                            <Heart className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-current' : ''}`} />
                          </Button>

                          {/* Badge */}
                          {(product.trending || product.newArrival || product.bestSeller) && (
                            <div className="absolute top-3 left-3">
                              {product.trending && (
                                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-luxury-sans font-medium">
                                  Trending
                                </span>
                              )}
                              {product.newArrival && !product.trending && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-luxury-sans font-medium">
                                  New
                                </span>
                              )}
                              {product.bestSeller && !product.trending && !product.newArrival && (
                                <span className="bg-luxury-maroon text-white px-2 py-1 rounded-full text-xs font-luxury-sans font-medium">
                                  Best Seller
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className={viewMode === "list" ? "flex-1" : "p-4"}>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon line-clamp-2 cursor-pointer hover:text-luxury-dusty-rose transition-colors duration-300"
                                onClick={() => handleProductClick(product.id)}>
                              {product.name}
                            </h3>
                            {viewMode === "list" && (
                              <div className="flex items-center gap-1 ml-4">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-luxury-sans text-sm text-luxury-maroon/70">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <p className="font-luxury-sans text-luxury-maroon/70 text-sm mb-3 leading-relaxed line-clamp-2">
                            {product.description}
                          </p>

                          {/* Features */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {product.features.slice(0, viewMode === "list" ? 4 : 2).map((feature, i) => (
                              <span key={i} className="bg-luxury-taupe/20 text-luxury-maroon px-2 py-1 rounded-full text-xs font-luxury-sans">
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* Rating and Price */}
                          <div className="flex items-center justify-between mb-4">
                            {viewMode === "grid" && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-luxury-sans text-sm text-luxury-maroon/70">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <span className="font-luxury-serif text-lg font-bold text-luxury-dusty-rose">
                                {product.price}
                              </span>
                              <span className="font-luxury-sans text-sm text-luxury-maroon/50 line-through">
                                {product.originalPrice}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleProductClick(product.id)}
                              className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans tracking-wide uppercase text-xs py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
                            >
                              View Details
                            </Button>
                            <Button 
                              onClick={() => handleAddToCart(product.name)}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 