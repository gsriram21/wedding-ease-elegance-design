import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, Plus, Edit2, Check, Grid, Image as ImageIcon, Sparkles } from "lucide-react";

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
    onNavigateToAccount?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-luxury-taupe/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-luxury-taupe/20 bg-gradient-to-r from-luxury-ivory to-luxury-soft-pink/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-luxury-dusty-rose to-luxury-maroon rounded-full flex items-center justify-center">
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
              {/* Wishlist Grid - Matching Account Page Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {/* Create New Wishlist Card - Matching Account Style */}
                <div 
                  onClick={() => setIsCreating(true)}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-dashed border-luxury-dusty-rose/40 hover:border-luxury-dusty-rose hover:bg-white/80 transition-all duration-300 cursor-pointer group text-center"
                >
                  <div className="w-12 h-12 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-luxury-dusty-rose/30 transition-all duration-300">
                    <Plus className="w-6 h-6 text-luxury-dusty-rose" />
                  </div>
                  <h3 className="font-luxury-serif text-lg font-bold text-luxury-maroon mb-1">
                    Create New Wishlist
                  </h3>
                  <p className="font-luxury-sans text-luxury-maroon/60 text-sm">
                    Start a new collection
                  </p>
                </div>

                {/* Existing Wishlists - Matching Account Style */}
                {existingWishlists.map((wishlist) => (
                  <div
                    key={wishlist.id}
                    onClick={() => handleAddToExisting(wishlist.id)}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-luxury-taupe/10 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  >
                    {/* Cover Image */}
                    <div className="relative h-32 bg-gradient-to-br from-luxury-soft-pink to-luxury-dusty-rose/20 overflow-hidden">
                      {wishlist.coverImage ? (
                        <img 
                          src={wishlist.coverImage} 
                          alt={wishlist.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Heart className="w-10 h-10 text-luxury-dusty-rose/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-luxury-serif text-base font-bold text-luxury-maroon mb-1 line-clamp-1">
                        {wishlist.name}
                      </h3>
                      {wishlist.description && (
                        <p className="font-luxury-sans text-luxury-maroon/70 text-xs mb-2 line-clamp-2">
                          {wishlist.description}
                        </p>
                      )}
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <span className="font-luxury-sans text-luxury-maroon/60 text-xs">
                          {wishlist.products.length} items
                        </span>
                        <span className="font-luxury-sans text-luxury-dusty-rose text-xs font-medium">
                          Add to Collection →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation to Account */}
              <div className="mt-6 pt-4 border-t border-luxury-taupe/20">
                <button
                  onClick={handleNavigateToWishlist}
                  className="w-full text-center py-3 px-4 bg-gradient-to-r from-luxury-dusty-rose/10 to-luxury-maroon/10 hover:from-luxury-dusty-rose/20 hover:to-luxury-maroon/20 border border-luxury-dusty-rose/30 rounded-lg transition-all duration-300 group"
                >
                  <span className="font-luxury-sans text-luxury-maroon group-hover:text-luxury-dusty-rose font-medium">
                    View all wishlists in account →
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* Create New Wishlist Form - Matching Account Style */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-luxury-dusty-rose to-luxury-maroon rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-luxury-serif font-bold text-xl text-luxury-maroon mb-2">
                  Create New Wishlist
                </h3>
                <p className="font-luxury-sans text-luxury-maroon/70">
                  Give your collection a name and description
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-luxury-sans font-medium text-luxury-maroon mb-2">
                    Wishlist Name *
                  </label>
                  <input
                    type="text"
                    value={newWishlistName}
                    onChange={(e) => setNewWishlistName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-200 font-luxury-sans"
                    placeholder="e.g., Dream Wedding Dresses"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block text-sm font-luxury-sans font-medium text-luxury-maroon mb-2">
                    Description
                  </label>
                  <textarea
                    value={newWishlistDescription}
                    onChange={(e) => setNewWishlistDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-luxury-taupe/30 focus:border-luxury-dusty-rose focus:ring-2 focus:ring-luxury-dusty-rose/20 outline-none transition-all duration-200 font-luxury-sans resize-none"
                    rows={3}
                    placeholder="Describe what this wishlist is for..."
                    maxLength={200}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setIsCreating(false)}
                  variant="outline"
                  className="flex-1 border-luxury-taupe/30 text-luxury-maroon hover:bg-luxury-taupe/10 font-luxury-sans"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateWishlist}
                  disabled={!newWishlistName.trim()}
                  className="flex-1 bg-gradient-to-r from-luxury-dusty-rose to-luxury-maroon hover:from-luxury-dusty-rose/90 hover:to-luxury-maroon/90 text-white font-luxury-sans disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Wishlist
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal; 