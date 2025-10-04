import { ArrowLeft, Trash2, Plus, Minus, Star } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartPageProps {
  onClose: () => void;
}

export function CartPage({ onClose }: CartPageProps) {
  const { cart, loading, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
    } else {
      await updateQuantity(productId, newQuantity);
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
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
            <span className="text-gray-500">({cart.length} items)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to your cart to get started</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.cart_id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg flex items-center justify-center w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {item.discount > 0 && (
                        <span className="absolute top-1 left-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                          {item.discount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                          <h3 className="font-semibold text-gray-800 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-700">{item.rating}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
                        <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-sm text-gray-600 ml-auto">
                          Subtotal: <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-pink-600">₹{cartTotal}</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all mb-3">
                  Proceed to Checkout
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
