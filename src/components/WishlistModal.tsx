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
}

const WishlistModal = ({
  isOpen,
  onClose,
  product,
  onAddToWishlist,
  onCreateWishlist,
  existingWishlists
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-luxury-taupe/20">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-luxury-dusty-rose" />
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
        <div className="px-6 py-3 bg-luxury-taupe/5 border-b border-luxury-taupe/10">
          <div className="flex items-center gap-3">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg shadow-sm"
            />
            <div className="flex-1">
              <h3 className="font-luxury-serif font-medium text-luxury-maroon text-sm">
                {product.name}
              </h3>
              <p className="text-luxury-maroon/60 text-xs font-luxury-sans">
                {product.price}
              </p>
            </div>
            <div className="text-xs text-luxury-maroon/40 font-luxury-sans">
              Adding to wishlist
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {!isCreating ? (
            <div className="space-y-6">
              {/* Create New Wishlist Card */}
              <div className="bg-gradient-to-br from-luxury-dusty-rose/5 to-luxury-dusty-rose/10 rounded-2xl p-6 border border-luxury-dusty-rose/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-luxury-dusty-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-luxury-dusty-rose" />
                  </div>
                  <h3 className="font-luxury-serif font-bold text-luxury-maroon text-xl mb-2">
                    Create New Wishlist
                  </h3>
                  <p className="text-luxury-maroon/60 text-sm font-luxury-sans mb-4">
                    Start a new collection for your favorite items
                  </p>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="bg-luxury-dusty-rose hover:bg-luxury-dusty-rose/90 text-white px-6 py-3 rounded-xl font-luxury-sans font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    Create New Wishlist
                  </button>
                </div>
              </div>

              {/* Existing Wishlists */}
              {existingWishlists.length > 0 && (
                <div>
                  <h3 className="font-luxury-serif font-bold text-luxury-maroon text-lg mb-4">
                    Add to Existing Wishlist
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {existingWishlists.map((wishlist) => (
                      <button
                        key={wishlist.id}
                        onClick={() => handleAddToExisting(wishlist.id)}
                        className="bg-white/80 backdrop-blur-sm border border-luxury-taupe/20 rounded-2xl p-4 hover:border-luxury-dusty-rose hover:shadow-lg transition-all duration-300 flex items-center gap-4 text-left group hover:scale-[1.02]"
                      >
                        <div className="relative">
                          {wishlist.coverImage ? (
                            <img
                              src={wishlist.coverImage}
                              alt={wishlist.name}
                              className="w-16 h-16 object-cover rounded-xl shadow-md"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-luxury-dusty-rose/10 rounded-xl flex items-center justify-center shadow-md">
                              <Grid className="w-8 h-8 text-luxury-dusty-rose" />
                            </div>
                          )}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-luxury-dusty-rose text-white rounded-full flex items-center justify-center text-xs font-luxury-sans font-bold shadow-lg">
                            {wishlist.products.length}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-luxury-serif font-bold text-luxury-maroon group-hover:text-luxury-dusty-rose transition-colors text-lg">
                            {wishlist.name}
                          </h4>
                          {wishlist.description && (
                            <p className="text-luxury-maroon/60 text-sm font-luxury-sans line-clamp-2 mt-1">
                              {wishlist.description}
                            </p>
                          )}
                        </div>
                        <div className="bg-luxury-dusty-rose/10 rounded-full p-3 group-hover:bg-luxury-dusty-rose group-hover:text-white transition-all duration-300">
                          <Plus className="w-6 h-6 text-luxury-dusty-rose group-hover:text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {existingWishlists.length === 0 && (
                <div className="text-center py-8 bg-luxury-taupe/5 rounded-2xl border border-luxury-taupe/10">
                  <div className="w-16 h-16 bg-luxury-dusty-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-luxury-dusty-rose" />
                  </div>
                  <p className="font-luxury-sans text-luxury-maroon/60">
                    You don't have any wishlists yet. Create your first one!
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Create New Wishlist Form */
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="p-1 hover:bg-luxury-taupe/10 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-luxury-maroon/70" />
                </button>
                <h3 className="font-luxury-serif font-semibold text-luxury-maroon">
                  Create New Wishlist
                </h3>
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
                    placeholder="e.g., Dream Wedding Outfits"
                    className="w-full px-4 py-3 border border-luxury-taupe/30 rounded-lg focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose font-luxury-sans"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-luxury-sans font-medium text-luxury-maroon mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newWishlistDescription}
                    onChange={(e) => setNewWishlistDescription(e.target.value)}
                    placeholder="Add a description for your wishlist..."
                    rows={3}
                    className="w-full px-4 py-3 border border-luxury-taupe/30 rounded-lg focus:ring-2 focus:ring-luxury-dusty-rose focus:border-luxury-dusty-rose font-luxury-sans resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleCreateWishlist}
                    disabled={!newWishlistName.trim()}
                    className="flex-1 bg-luxury-maroon hover:bg-luxury-burgundy text-white font-luxury-sans py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create & Add Item
                  </Button>
                  <Button
                    onClick={() => setIsCreating(false)}
                    variant="outline"
                    className="px-6 border-luxury-taupe/30 text-luxury-maroon hover:bg-luxury-taupe/10 font-luxury-sans py-3 rounded-xl"
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