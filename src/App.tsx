import { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronRight,
  Star,
  Heart,
  Gift,
  MapPin,
  Smartphone,
  HelpCircle,
  ArrowLeft,
  LogOut,
} from 'lucide-react';
import { allProducts, type Product } from './data/products';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useWishlist } from './hooks/useWishlist';
import { useCart } from './hooks/useCart';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';

type FilterType = 'category' | 'sale' | 'flash' | 'gift' | 'weekend' | null;
type ViewType = 'home' | 'wishlist' | 'cart';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authStep, setAuthStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>(null);
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const { user, signInWithOTP, verifyOTP, signInWithGoogle, signOut } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlist } = useWishlist();
  const { addToCart, cartCount } = useCart();

  const categories = [
    'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books', 'Toys', 'Grocery'
  ];

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType === 'sale') {
      products = products.filter(p => p.discount >= 40);
    } else if (filterType === 'flash') {
      products = products.filter(p => p.discount >= 35 && ['Electronics', 'Fashion'].includes(p.category));
    } else if (filterType === 'gift') {
      products = products.filter(p => ['Beauty', 'Books', 'Toys'].includes(p.category));
    } else if (filterType === 'weekend') {
      products = products.filter(p => p.price >= 2000);
    }

    return products;
  }, [selectedCategory, searchQuery, filterType]);

  const featuredProducts = useMemo(() => {
    if (selectedCategory || searchQuery || filterType) return [];
    return allProducts.slice(0, 8);
  }, [selectedCategory, searchQuery, filterType]);

  const trendingProducts = useMemo(() => {
    if (selectedCategory || searchQuery || filterType) return [];
    return allProducts.slice(8, 12);
  }, [selectedCategory, searchQuery, filterType]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setFilterType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setFilterType(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory(null);
    setFilterType(null);
  };

  const handleFilterClick = (filter: FilterType) => {
    setFilterType(filter);
    setSelectedCategory(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendOTP = async () => {
    if (!phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    const { error } = await signInWithOTP(phone);
    if (error) {
      alert('Failed to send OTP: ' + error.message);
    } else {
      setAuthStep('otp');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      alert('Please enter the OTP');
      return;
    }
    const { error } = await verifyOTP(phone, otp);
    if (error) {
      alert('Failed to verify OTP: ' + error.message);
    } else {
      setShowAuthModal(false);
      setAuthStep('phone');
      setPhone('');
      setOtp('');
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      alert('Failed to sign in with Google: ' + error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleWishlistClick = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (currentView === 'wishlist') {
    return <WishlistPage onClose={() => setCurrentView('home')} />;
  }

  if (currentView === 'cart') {
    return <CartPage onClose={() => setCurrentView('home')} />;
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
      <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 p-4 flex items-center justify-center h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistClick(product);
          }}
          className={`absolute top-2 right-2 rounded-full p-2 shadow-md transition-colors ${
            isInWishlist(product.id)
              ? 'bg-pink-600 text-white'
              : 'bg-white text-pink-600 hover:bg-pink-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
        </button>
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            {product.discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-800">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all group-hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-2 px-4 text-center text-sm font-medium overflow-hidden">
        <div className="animate-pulse">
          MEGA SALE IS LIVE! FREE SHIPPING ON ALL ORDERS ABOVE ₹299. LIMITED TIME OFFER!
        </div>
      </div>

      <div className="bg-pink-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end items-center gap-6 text-sm">
          <button className="flex items-center gap-2 hover:text-pink-600 transition-colors">
            <Smartphone className="w-4 h-4" />
            <span>Get App</span>
          </button>
          <button className="flex items-center gap-2 hover:text-pink-600 transition-colors">
            <MapPin className="w-4 h-4" />
            <span>Store Locator</span>
          </button>
          <button className="flex items-center gap-2 hover:text-pink-600 transition-colors">
            <Gift className="w-4 h-4" />
            <span>Gift Card</span>
          </button>
          <button className="flex items-center gap-2 hover:text-pink-600 transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
        </div>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button onClick={handleBackToHome}>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform">
                  e shop
                </h1>
              </button>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={handleBackToHome}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Categories
              </button>
              <button className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Brands</button>
              <button className="text-gray-700 hover:text-pink-600 font-medium transition-colors">Deals</button>
              <button className="text-gray-700 hover:text-pink-600 font-medium transition-colors">New Arrivals</button>
            </nav>

            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-sm text-gray-600">Hi, {user.email?.split('@')[0]}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="hidden md:block bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Sign In
                </button>
              )}
              <button
                onClick={() => setCurrentView('wishlist')}
                className="relative hover:text-pink-600 transition-colors"
              >
                <Heart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                className="relative hover:text-pink-600 transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-pink-50 border-t border-pink-100">
          <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
            <div className="flex items-center gap-6 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? 'text-pink-600 font-bold'
                      : 'text-gray-700 hover:text-pink-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-64 h-full p-6" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => {
                  handleBackToHome();
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-pink-600 font-medium"
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    handleCategoryClick(category);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors ${
                    selectedCategory === category
                      ? 'text-pink-600 font-bold'
                      : 'text-gray-700 hover:text-pink-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {(selectedCategory || searchQuery || filterType) && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedCategory ||
                (searchQuery && `Search Results for "${searchQuery}"`) ||
                (filterType === 'sale' && 'Mega Sale Products') ||
                (filterType === 'flash' && 'Flash Deals') ||
                (filterType === 'gift' && 'Gift Sets') ||
                (filterType === 'weekend' && 'Weekend Special Offers')}
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try searching for something else</p>
              <button
                onClick={handleBackToHome}
                className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>
      )}

      {!selectedCategory && !searchQuery && !filterType && (
        <>
          <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                <div className="p-8 h-80 flex flex-col justify-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">MEGA SALE</h2>
                  <p className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
                    Up to 60% OFF
                  </p>
                  <p className="text-gray-600 text-lg mb-4">On your favorite brands</p>
                  <button
                    onClick={() => handleFilterClick('sale')}
                    className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all w-fit group-hover:scale-105"
                  >
                    Shop Now <ChevronRight className="inline w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-rows-2 gap-6">
                <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                  <div className="p-6 h-full flex flex-col justify-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Flash Deals</h3>
                    <p className="text-gray-600 mb-3">Limited time offers</p>
                    <button
                      onClick={() => handleFilterClick('flash')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all w-fit group-hover:scale-105"
                    >
                      Grab Now
                    </button>
                  </div>
                </div>
                <div className="relative bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                  <div className="p-6 h-full flex flex-col justify-center">
                    <div className="text-4xl mb-2">🎁</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Gift Sets</h3>
                    <p className="text-gray-600 mb-3">Perfect for every occasion</p>
                    <button
                      onClick={() => handleFilterClick('gift')}
                      className="bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all w-fit group-hover:scale-105"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
              <button className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12 text-center text-white">
                <div className="text-5xl mb-4">🎊</div>
                <h2 className="text-4xl font-bold mb-3">Weekend Special</h2>
                <p className="text-xl mb-6 opacity-90">Get extra 20% off on orders above ₹2999</p>
                <button
                  onClick={() => handleFilterClick('weekend')}
                  className="bg-white text-teal-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Trending Now</h2>
              <button className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const categoryProduct = allProducts.find(p => p.category === category);
                const gradients = [
                  'from-blue-100 to-indigo-100',
                  'from-pink-100 to-rose-100',
                  'from-green-100 to-emerald-100',
                  'from-orange-100 to-red-100',
                  'from-slate-100 to-gray-100',
                  'from-yellow-100 to-amber-100',
                  'from-teal-100 to-cyan-100',
                  'from-lime-100 to-green-100',
                ];
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`bg-gradient-to-br ${gradients[index]} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group`}
                  >
                    <div className="w-full h-32 mb-3 overflow-hidden rounded-lg">
                      <img
                        src={categoryProduct?.image || ''}
                        alt={category}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                      {category}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {allProducts.filter(p => p.category === category).length} items
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-4">
                e shop
              </h3>
              <p className="text-sm">Your one-stop destination for all your shopping needs.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Newsletter</h4>
              <p className="text-sm mb-3">Subscribe for exclusive offers</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                />
                <button className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2024 e shop. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowAuthModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
              <button onClick={() => setShowAuthModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">Sign in to access exclusive deals and offers!</p>

            {authStep === 'phone' ? (
              <>
                <input
                  type="tel"
                  placeholder="Mobile Number (+91)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
                />
                <button
                  onClick={handleSendOTP}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all mb-4"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
                />
                <button
                  onClick={handleVerifyOTP}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all mb-4"
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => {
                    setAuthStep('phone');
                    setOtp('');
                  }}
                  className="text-pink-600 text-sm hover:underline"
                >
                  Change Phone Number
                </button>
              </>
            )}

            <div className="text-center text-gray-500 text-sm mb-4">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
