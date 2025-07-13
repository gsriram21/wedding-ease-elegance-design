import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, Plus, Edit2, Check, Grid, Image as ImageIcon } from "lucide-react";

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

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToWishlist: (wishlistId: string, product: Product) => void;
  onCreateWishlist: (name: string, description: string, product: Product) => void;
  existingWishlists: Wishlist[];
  onNavigateToAccount?: () => void;
}

const WishlistModal = ({
  isOpen,
  onClose,
  product,
  onAddToWishlist,
  onCreateWishlist,
  existingWishlists,
  onNavigateToAccount
}: WishlistModalProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [newWishlistDescription, setNewWishlistDescription] = useState("");
  const [selectedWishlistId, setSelectedWishlistId] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const handleCreateWishlist = () => {
    if (newWishlistName.trim()) {
      onCreateWishlist(newWishlistName.trim(), newWishlistDescription.trim(), product);
      setNewWishlistName("");
      setNewWishlistDescription("");
      setIsCreating(false);
      onClose();
    }
  };

  const handleAddToExisting = (wishlistId: string) => {
    onAddToWishlist(wishlistId, product);
    onClose();
  };

  const handleNavigateToWishlist = () => {
    if (onNavigateToAccount) {
      // Navigate to account with wishlist section active
      const url = new URL(window.location.href);
      url.pathname = '/account';
      url.searchParams.set('section', 'wishlist');
      window.history.pushState({}, '', url.toString());
      onNavigateToAccount();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content - Enhanced Pinterest Style */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-luxury-taupe/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-luxury-dusty-rose to-luxury-dusty-rose/80 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-luxury-serif font-bold text-xl text-luxury-maroon">
              Save to Wishlist
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-luxury-taupe/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-luxury-maroon/70" />
          </button>
        </div>

        {/* Compact Product Preview */}
        <div className="px-6 py-4 bg-gradient-to-r from-luxury-taupe/5 to-luxury-dusty-rose/5 border-b border-luxury-taupe/5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-14 h-14 object-cover rounded-2xl shadow-md border border-white"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-luxury-dusty-rose rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-luxury-serif font-semibold text-luxury-maroon text-base line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-luxury-maroon/60 font-luxury-sans capitalize">
                  {product.category} • {product.subcategory.replace('-', ' ')}
                </span>
                <span className="text-sm font-bold text-luxury-maroon font-luxury-sans">
                  {product.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {!isCreating ? (
            <div>
              {/* Enhanced Pinterest-Style Grid */}
              <div className="grid grid-cols-3 gap-5 max-h-80 overflow-y-auto">
                {/* Enhanced Create New Wishlist Card - No Dotted Lines */}
                <button
                  onClick={() => setIsCreating(true)}
                  className="aspect-square bg-gradient-to-br from-luxury-dusty-rose/5 via-luxury-dusty-rose/8 to-luxury-dusty-rose/12 rounded-3xl border border-luxury-dusty-rose/20 hover:border-luxury-dusty-rose/40 hover:bg-luxury-dusty-rose/10 transition-all duration-300 flex flex-col items-center justify-center gap-4 group hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-luxury-dusty-rose/15 to-luxury-dusty-rose/25 rounded-3xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-luxury-dusty-rose group-hover:to-luxury-dusty-rose/90 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                      <Plus className="w-10 h-10 text-luxury-dusty-rose group-hover:text-white transition-all duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-luxury-maroon rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-center px-2">
                    <h3 className="font-luxury-serif font-bold text-luxury-maroon group-hover:text-luxury-dusty-rose transition-colors text-base">
                      Create New Wishlist
                    </h3>
                    <p className="text-luxury-maroon/60 text-sm font-luxury-sans mt-1 leading-relaxed">
                      Organize your favorite items
                    </p>
                  </div>
                </button>

                {/* Enhanced Existing Wishlist Cards */}
                {existingWishlists.map((wishlist) => (
                  <button
                    key={wishlist.id}
                    onClick={() => handleAddToExisting(wishlist.id)}
                    className="aspect-square bg-white border border-luxury-taupe/15 rounded-3xl hover:border-luxury-dusty-rose/30 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:scale-[1.02]"
                  >
                    {/* Enhanced Pinterest-Style Image Display */}
                    <div className="flex-1 relative bg-gradient-to-br from-luxury-taupe/5 to-luxury-dusty-rose/5">
                      {wishlist.products.length > 0 ? (
                        <div className="w-full h-full">
                          {wishlist.products.length === 1 ? (
                            // Single large image
                            <img
                              src={wishlist.products[0].images[0]}
                              alt={wishlist.products[0].name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : wishlist.products.length === 2 ? (
                            // Two images: split vertically
                            <div className="w-full h-full grid grid-cols-2 gap-px">
                              {wishlist.products.slice(0, 2).map((product, idx) => (
                                <img
                                  key={idx}
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ))}
                            </div>
                          ) : wishlist.products.length === 3 ? (
                            // Three images: one large, two small
                            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-px">
                              <img
                                src={wishlist.products[0].images[0]}
                                alt={wishlist.products[0].name}
                                className="w-full h-full object-cover row-span-2 group-hover:scale-105 transition-transform duration-300"
                              />
                              {wishlist.products.slice(1, 3).map((product, idx) => (
                                <img
                                  key={idx}
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ))}
                            </div>
                          ) : (
                            // Four or more images: 2x2 grid
                            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-px">
                              {wishlist.products.slice(0, 4).map((product, idx) => (
                                <div key={idx} className="relative">
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  {idx === 3 && wishlist.products.length > 4 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                      <span className="text-white font-bold text-lg">
                                        +{wishlist.products.length - 4}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-luxury-dusty-rose/10 to-luxury-dusty-rose/20 flex items-center justify-center">
                          <Heart className="w-12 h-12 text-luxury-dusty-rose/30" />
                        </div>
                      )}
                      
                      {/* Clean Product Count Badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-luxury-maroon rounded-full px-3 py-1 text-xs font-luxury-sans font-bold shadow-lg border border-luxury-dusty-rose/20">
                        {wishlist.products.length}
                      </div>
                      
                      {/* Enhanced Plus Icon Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-luxury-dusty-rose rounded-full flex items-center justify-center shadow-xl border-2 border-white/50 backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0">
                          <Plus className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Wishlist Info - Removed Dots */}
                    <div className="p-4 bg-white space-y-2">
                      <h4 className="font-luxury-serif font-bold text-luxury-maroon group-hover:text-luxury-dusty-rose transition-colors text-sm line-clamp-1">
                        {wishlist.name}
                      </h4>
                      {wishlist.description && (
                        <p className="text-luxury-maroon/60 text-xs font-luxury-sans line-clamp-2 leading-relaxed">
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
              </div>

              {/* Fixed Navigation to Wishlist Section */}
              {existingWishlists.length > 0 && onNavigateToAccount && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleNavigateToWishlist}
                    className="inline-flex items-center gap-3 px-6 py-3 text-sm font-luxury-sans text-luxury-dusty-rose hover:text-white bg-gradient-to-r from-luxury-dusty-rose/5 to-luxury-dusty-rose/10 hover:from-luxury-dusty-rose hover:to-luxury-dusty-rose/90 border border-luxury-dusty-rose/30 hover:border-luxury-dusty-rose rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    <Heart className="w-4 h-4" />
                    <span>View all wishlists in account</span>
                  </button>
                </div>
              )}

              {/* Empty State */}
              {existingWishlists.length === 0 && (
                <div className="text-center py-12 bg-gradient-to-br from-luxury-taupe/5 to-luxury-dusty-rose/5 rounded-3xl border border-luxury-taupe/10 mt-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-luxury-dusty-rose/10 to-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-luxury-dusty-rose" />
                  </div>
                  <h3 className="font-luxury-serif font-semibold text-luxury-maroon text-lg mb-2">
                    Create your first wishlist!
                  </h3>
                  <p className="font-luxury-sans text-luxury-maroon/60 text-sm">
                    Save your favorite items for later
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Enhanced Create New Wishlist Form */
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setIsCreating(false)}
                  className="p-2 hover:bg-luxury-taupe/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-luxury-maroon/70" />
                </button>
                <h3 className="font-luxury-serif font-semibold text-luxury-maroon text-lg">
                  Create New Wishlist
                </h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-luxury-sans font-medium text-luxury-maroon mb-3">
                    Wishlist Name *
                  </label>
                  <input
                    type="text"
                    value={newWishlistName}
                    onChange={(e) => setNewWishlistName(e.target.value)}
                    placeholder="Enter wishlist name"
                    className="w-full px-4 py-4 border border-luxury-taupe/30 rounded-xl focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose font-luxury-sans transition-all duration-300"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-luxury-sans font-medium text-luxury-maroon mb-3">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newWishlistDescription}
                    onChange={(e) => setNewWishlistDescription(e.target.value)}
                    placeholder="Add a description (optional)"
                    rows={3}
                    className="w-full px-4 py-4 border border-luxury-taupe/30 rounded-xl focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose font-luxury-sans resize-none transition-all duration-300"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleCreateWishlist}
                    disabled={!newWishlistName.trim()}
                    className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                  >
                    Create Wishlist
                  </Button>
                  <Button
                    onClick={() => setIsCreating(false)}
                    variant="outline"
                    className="px-8 border-luxury-taupe/30 text-luxury-maroon hover:bg-luxury-taupe/10 font-luxury-sans py-4 rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal; 