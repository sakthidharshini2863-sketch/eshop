import { ArrowLeft, Trash2, ShoppingCart, Star } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';

interface WishlistPageProps {
  onClose: () => void;
}

export function WishlistPage({ onClose }: WishlistPageProps) {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (product: any) => {
    const success = await addToCart(product);
    if (success) {
      await removeFromWishlist(product.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
            <span className="text-gray-500">({wishlist.length} items)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">💝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Add items you love to your wishlist</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.wishlist_id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 p-6 flex items-center justify-center h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {item.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {item.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-800">₹{item.price}</span>
                    <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
