import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, ChevronLeft, ChevronRight, Star, ShoppingBag, DollarSign } from "lucide-react";
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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onWishlistToggle: (productId: number) => void;
  isWishlisted: boolean;
  onBuyNow: (product: Product) => void;
  onGetPrice: (product: Product) => void;
  allProducts: Product[];
  onSimilarProductClick: (product: Product) => void;
}

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onWishlistToggle, 
  isWishlisted,
  onBuyNow,
  onGetPrice,
  allProducts,
  onSimilarProductClick 
}: ProductDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const whatsIncluded = [
    "Professional consultation and measurement",
    "Premium packaging and protective covering",
    "Custom fitting and alterations (up to 3 sessions)",
    "Quality certificate and authenticity guarantee",
    "Complimentary styling guide",
    "12-month warranty on craftsmanship",
    "Free delivery within city limits",
    "After-purchase support and care instructions"
  ];

  // Get similar products (same category or subcategory, excluding current product)
  const getSimilarProducts = () => {
    if (!product) return [];
    
    return allProducts
      .filter(p => 
        p.id !== product.id && 
        (p.category === product.category || p.subcategory === product.subcategory)
      )
      .slice(0, 4); // Show up to 4 similar products
  };

  const similarProducts = getSimilarProducts();

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink overflow-y-auto">
      {/* Navigation - Ensure it's accessible */}
      <Navigation />
      
        {/* Product Detail View */}
        <div className="min-h-screen pt-20"> {/* Add top padding for navigation */}
          <div className="relative bg-white/90 backdrop-blur-sm max-w-6xl mx-auto">
          {/* Back to Products Button */}
          <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-luxury-taupe/20 px-8 py-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-luxury-maroon hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Products
            </button>
          </div>

          <div className="flex flex-col lg:flex-row p-6 gap-6 min-h-[calc(100vh-160px)]">
            {/* Image Gallery - Reduced Size */}
            <div className="lg:w-2/5 relative">
              <div className="relative aspect-[4/5] max-h-[500px] overflow-hidden rounded-xl shadow-lg">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5 text-luxury-maroon" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5 text-luxury-maroon" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Badge */}
                {(product.trending || product.newArrival || product.bestSeller) && (
                  <div className="absolute top-4 left-4">
                    {product.trending && (
                      <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-luxury-sans font-medium shadow-md">
                        🔥 Trending
                      </span>
                    )}
                    {product.newArrival && !product.trending && (
                      <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-luxury-sans font-medium shadow-md">
                        ✨ New Arrival
                      </span>
                    )}
                    {product.bestSeller && !product.trending && !product.newArrival && (
                      <span className="bg-luxury-maroon text-white px-3 py-1.5 rounded-full text-sm font-luxury-sans font-medium shadow-md">
                        ⭐ Bestseller
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details - Expanded */}
            <div className="lg:w-3/5 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Header */}
                <div>
                  <h1 className="font-luxury-serif font-bold text-2xl text-luxury-maroon mb-2">
                    {product.name}
                  </h1>
                  <p className="font-luxury-sans text-luxury-maroon/70 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="font-luxury-serif text-2xl font-bold text-luxury-dusty-rose">
                    {product.price}
                  </span>
                  <span className="font-luxury-sans text-luxury-maroon/50 line-through">
                    {product.originalPrice}
                  </span>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-2">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-luxury-taupe/15 text-luxury-maroon/80 px-2 py-1 rounded-full text-xs font-luxury-sans"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* What's Included - Expanded */}
                <div>
                  <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-3">
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {whatsIncluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-luxury-dusty-rose rounded-full mt-2 flex-shrink-0" />
                        <span className="font-luxury-sans text-luxury-maroon/70 text-sm leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* See Similar Products */}
                {similarProducts.length > 0 && (
                  <div className="border-t border-luxury-taupe/20 pt-4">
                    <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-4">
                      See Similar Products
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {similarProducts.map((similarProduct) => (
                        <div
                          key={similarProduct.id}
                          onClick={() => onSimilarProductClick(similarProduct)}
                          className="cursor-pointer group bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-luxury-taupe/20 hover:border-luxury-dusty-rose/40 hover:shadow-md transition-all duration-300"
                        >
                          <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                            <img
                              src={similarProduct.images[0]}
                              alt={similarProduct.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h4 className="font-luxury-sans font-medium text-sm text-luxury-maroon mb-1 line-clamp-2">
                            {similarProduct.name}
                          </h4>
                          <p className="font-luxury-serif font-bold text-luxury-dusty-rose text-sm">
                            {similarProduct.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons - Always visible at bottom */}
              <div className="flex gap-3 mt-4 pt-3 border-t border-luxury-taupe/20 sticky bottom-0 bg-white/95">
                <Button
                  onClick={() => onBuyNow(product)}
                  className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans text-base py-3 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Buy Now
                </Button>
                
                <Button
                  onClick={() => onGetPrice(product)}
                  variant="outline"
                  className="flex-1 border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white font-luxury-sans text-base py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-5 h-5" />
                  Get Price
                </Button>
                
                <Button
                  onClick={() => onWishlistToggle(product.id)}
                  variant="outline"
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isWishlisted
                      ? "bg-red-500 text-white border-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25"
                      : "border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <Heart className={`w-5 h-5 transition-all duration-500 ${isWishlisted ? "fill-current" : "hover:scale-110"}`} />
                </Button>
              </div>
            </div>
          </div>
          </div>
        </div>
    </div>
  );
};

export default ProductDetailModal; 