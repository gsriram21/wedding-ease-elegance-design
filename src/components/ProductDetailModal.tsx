import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, ChevronLeft, ChevronRight, Star, ShoppingBag, DollarSign } from "lucide-react";

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
}

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onWishlistToggle, 
  isWishlisted,
  onBuyNow,
  onGetPrice 
}: ProductDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-luxury-ivory via-white to-luxury-soft-pink overflow-y-auto">
      {/* Product Detail View - No Background Blur */}
      <div className="min-h-screen">
        <div className="relative bg-white/90 backdrop-blur-sm max-w-7xl mx-auto">
          {/* Back to Products Button */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-luxury-taupe/20 px-8 py-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-luxury-maroon hover:text-luxury-dusty-rose transition-colors duration-300 font-luxury-sans"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Products
            </button>
          </div>

          <div className="flex flex-col lg:flex-row p-6 gap-6 min-h-[calc(100vh-120px)]">
            {/* Image Gallery */}
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
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

            {/* Product Details */}
            <div className="lg:w-1/2 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <h1 className="font-luxury-serif font-bold text-2xl text-luxury-maroon mb-2">
                    {product.name}
                  </h1>
                  <p className="font-luxury-sans text-luxury-maroon/70 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Rating and Price */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-luxury-sans font-semibold text-luxury-maroon">
                        {product.rating}
                      </span>
                    </div>
                    <span className="font-luxury-sans text-luxury-maroon/60 text-sm">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-luxury-serif text-2xl font-bold text-luxury-dusty-rose">
                      {product.price}
                    </span>
                    <span className="font-luxury-sans text-luxury-maroon/50 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
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

                {/* What's Included - Condensed */}
                <div>
                  <h3 className="font-luxury-serif font-bold text-lg text-luxury-maroon mb-2">
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                    {whatsIncluded.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-luxury-dusty-rose rounded-full mt-1.5 flex-shrink-0" />
                        <span className="font-luxury-sans text-luxury-maroon/70 text-xs leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                    {whatsIncluded.length > 4 && (
                      <span className="font-luxury-sans text-luxury-maroon/50 text-xs">
                        +{whatsIncluded.length - 4} more benefits included
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons - Always visible at bottom */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-luxury-taupe/20 sticky bottom-0 bg-white/95">
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
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isWishlisted
                      ? "bg-luxury-dusty-rose text-white border-luxury-dusty-rose hover:bg-luxury-dusty-rose/90"
                      : "border-luxury-dusty-rose text-luxury-dusty-rose hover:bg-luxury-dusty-rose hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
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