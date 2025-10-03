export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  category: string;
  description?: string;
}

export const allProducts: Product[] = [
  // Electronics
  { id: 1, name: 'Premium Wireless Headphones', price: 2999, originalPrice: 4999, discount: 40, rating: 4.5, image: '🎧', category: 'Electronics', description: 'High-quality wireless headphones with noise cancellation' },
  { id: 2, name: 'Smart Fitness Watch', price: 3499, originalPrice: 5999, discount: 42, rating: 4.7, image: '⌚', category: 'Electronics', description: 'Track your fitness goals with style' },
  { id: 9, name: 'Bluetooth Speaker', price: 1999, originalPrice: 3499, discount: 43, rating: 4.6, image: '🔊', category: 'Electronics', description: 'Portable speaker with amazing sound quality' },
  { id: 11, name: 'Gaming Mouse', price: 1799, originalPrice: 2999, discount: 40, rating: 4.7, image: '🖱️', category: 'Electronics', description: 'Professional gaming mouse with RGB lighting' },
  { id: 13, name: 'Laptop Pro 15"', price: 45999, originalPrice: 65999, discount: 30, rating: 4.8, image: '💻', category: 'Electronics', description: 'Powerful laptop for professionals' },
  { id: 14, name: 'Smartphone 5G', price: 24999, originalPrice: 32999, discount: 24, rating: 4.6, image: '📱', category: 'Electronics', description: 'Latest 5G smartphone with amazing features' },
  { id: 15, name: 'Wireless Keyboard', price: 2499, originalPrice: 3999, discount: 38, rating: 4.4, image: '⌨️', category: 'Electronics', description: 'Mechanical wireless keyboard' },
  { id: 16, name: 'HD Webcam', price: 3999, originalPrice: 5999, discount: 33, rating: 4.5, image: '📹', category: 'Electronics', description: '1080p HD webcam for video calls' },
  { id: 17, name: 'Power Bank 20000mAh', price: 1499, originalPrice: 2499, discount: 40, rating: 4.3, image: '🔋', category: 'Electronics', description: 'Fast charging power bank' },
  { id: 18, name: 'USB-C Hub', price: 1999, originalPrice: 2999, discount: 33, rating: 4.6, image: '🔌', category: 'Electronics', description: 'Multi-port USB-C hub' },

  // Fashion
  { id: 3, name: 'Designer Handbag', price: 1999, originalPrice: 3999, discount: 50, rating: 4.3, image: '👜', category: 'Fashion', description: 'Elegant designer handbag' },
  { id: 4, name: 'Running Shoes', price: 2499, originalPrice: 4499, discount: 44, rating: 4.6, image: '👟', category: 'Fashion', description: 'Comfortable running shoes' },
  { id: 10, name: 'Sunglasses Collection', price: 1299, originalPrice: 2499, discount: 48, rating: 4.4, image: '🕶️', category: 'Fashion', description: 'Stylish UV protection sunglasses' },
  { id: 12, name: 'Casual Backpack', price: 1499, originalPrice: 2999, discount: 50, rating: 4.5, image: '🎒', category: 'Fashion', description: 'Trendy casual backpack' },
  { id: 19, name: 'Leather Jacket', price: 4999, originalPrice: 7999, discount: 38, rating: 4.7, image: '🧥', category: 'Fashion', description: 'Premium leather jacket' },
  { id: 20, name: 'Designer Watch', price: 5999, originalPrice: 9999, discount: 40, rating: 4.8, image: '⌚', category: 'Fashion', description: 'Luxury designer watch' },
  { id: 21, name: 'Cotton T-Shirt Pack', price: 999, originalPrice: 1999, discount: 50, rating: 4.2, image: '👕', category: 'Fashion', description: 'Pack of 3 cotton t-shirts' },
  { id: 22, name: 'Denim Jeans', price: 1799, originalPrice: 2999, discount: 40, rating: 4.5, image: '👖', category: 'Fashion', description: 'Comfortable denim jeans' },
  { id: 23, name: 'Formal Shoes', price: 2999, originalPrice: 4999, discount: 40, rating: 4.6, image: '👞', category: 'Fashion', description: 'Classic formal shoes' },
  { id: 24, name: 'Sports Cap', price: 599, originalPrice: 999, discount: 40, rating: 4.3, image: '🧢', category: 'Fashion', description: 'Breathable sports cap' },

  // Beauty
  { id: 5, name: 'Organic Skincare Set', price: 1499, originalPrice: 2499, discount: 40, rating: 4.8, image: '🧴', category: 'Beauty', description: 'Complete organic skincare routine' },
  { id: 6, name: 'Luxury Perfume', price: 3999, originalPrice: 5999, discount: 33, rating: 4.9, image: '🎁', category: 'Beauty', description: 'Premium luxury perfume' },
  { id: 25, name: 'Makeup Kit Professional', price: 2999, originalPrice: 4999, discount: 40, rating: 4.7, image: '💄', category: 'Beauty', description: 'Professional makeup kit' },
  { id: 26, name: 'Hair Care Set', price: 1799, originalPrice: 2999, discount: 40, rating: 4.6, image: '🧖', category: 'Beauty', description: 'Complete hair care solution' },
  { id: 27, name: 'Face Mask Collection', price: 899, originalPrice: 1499, discount: 40, rating: 4.5, image: '😌', category: 'Beauty', description: 'Variety pack of face masks' },
  { id: 28, name: 'Nail Polish Set', price: 699, originalPrice: 1199, discount: 42, rating: 4.4, image: '💅', category: 'Beauty', description: '12 colors nail polish set' },
  { id: 29, name: 'Essential Oils Kit', price: 1999, originalPrice: 3499, discount: 43, rating: 4.8, image: '🌿', category: 'Beauty', description: 'Natural essential oils' },
  { id: 30, name: 'Lip Care Combo', price: 799, originalPrice: 1299, discount: 38, rating: 4.6, image: '💋', category: 'Beauty', description: 'Complete lip care combo' },

  // Home & Living
  { id: 7, name: 'Coffee Maker Pro', price: 4999, originalPrice: 7999, discount: 38, rating: 4.4, image: '☕', category: 'Home & Living', description: 'Professional coffee maker' },
  { id: 31, name: 'Bedsheet Set King Size', price: 2499, originalPrice: 3999, discount: 38, rating: 4.5, image: '🛏️', category: 'Home & Living', description: 'Premium cotton bedsheet set' },
  { id: 32, name: 'Table Lamp Modern', price: 1499, originalPrice: 2499, discount: 40, rating: 4.6, image: '💡', category: 'Home & Living', description: 'Modern LED table lamp' },
  { id: 33, name: 'Wall Clock Designer', price: 999, originalPrice: 1799, discount: 44, rating: 4.3, image: '🕐', category: 'Home & Living', description: 'Designer wall clock' },
  { id: 34, name: 'Throw Pillows Set', price: 1299, originalPrice: 2199, discount: 41, rating: 4.7, image: '🛋️', category: 'Home & Living', description: 'Comfortable throw pillows' },
  { id: 35, name: 'Kitchen Utensils Set', price: 1999, originalPrice: 3499, discount: 43, rating: 4.5, image: '🍴', category: 'Home & Living', description: 'Complete kitchen utensils' },
  { id: 36, name: 'Vacuum Cleaner', price: 5999, originalPrice: 8999, discount: 33, rating: 4.8, image: '🧹', category: 'Home & Living', description: 'Powerful vacuum cleaner' },
  { id: 37, name: 'Air Purifier', price: 7999, originalPrice: 11999, discount: 33, rating: 4.6, image: '🌬️', category: 'Home & Living', description: 'HEPA air purifier' },

  // Sports
  { id: 8, name: 'Yoga Mat Premium', price: 999, originalPrice: 1999, discount: 50, rating: 4.5, image: '🧘', category: 'Sports', description: 'Anti-slip premium yoga mat' },
  { id: 38, name: 'Dumbbell Set', price: 2999, originalPrice: 4999, discount: 40, rating: 4.7, image: '🏋️', category: 'Sports', description: 'Adjustable dumbbell set' },
  { id: 39, name: 'Cricket Kit Complete', price: 4999, originalPrice: 7999, discount: 38, rating: 4.6, image: '🏏', category: 'Sports', description: 'Professional cricket kit' },
  { id: 40, name: 'Football Official', price: 1299, originalPrice: 1999, discount: 35, rating: 4.5, image: '⚽', category: 'Sports', description: 'Official size football' },
  { id: 41, name: 'Badminton Racket Pro', price: 2499, originalPrice: 3999, discount: 38, rating: 4.8, image: '🏸', category: 'Sports', description: 'Professional badminton racket' },
  { id: 42, name: 'Gym Bag Large', price: 1499, originalPrice: 2499, discount: 40, rating: 4.4, image: '🎽', category: 'Sports', description: 'Spacious gym bag' },
  { id: 43, name: 'Protein Shaker', price: 399, originalPrice: 699, discount: 43, rating: 4.3, image: '🥤', category: 'Sports', description: 'Leak-proof protein shaker' },
  { id: 44, name: 'Resistance Bands Set', price: 799, originalPrice: 1299, discount: 38, rating: 4.6, image: '💪', category: 'Sports', description: 'Complete resistance bands' },

  // Books
  { id: 45, name: 'Best Seller Novel Collection', price: 999, originalPrice: 1999, discount: 50, rating: 4.8, image: '📚', category: 'Books', description: 'Collection of bestselling novels' },
  { id: 46, name: 'Self-Help Guide', price: 499, originalPrice: 799, discount: 38, rating: 4.6, image: '📖', category: 'Books', description: 'Inspiring self-help guide' },
  { id: 47, name: 'Cookbook Deluxe', price: 799, originalPrice: 1299, discount: 38, rating: 4.7, image: '👨‍🍳', category: 'Books', description: '500+ recipes cookbook' },
  { id: 48, name: 'Kids Story Books Set', price: 1299, originalPrice: 1999, discount: 35, rating: 4.9, image: '📚', category: 'Books', description: 'Set of 10 kids story books' },
  { id: 49, name: 'Business Strategy Book', price: 699, originalPrice: 999, discount: 30, rating: 4.5, image: '📊', category: 'Books', description: 'Essential business strategies' },
  { id: 50, name: 'Science Fiction Classics', price: 899, originalPrice: 1499, discount: 40, rating: 4.8, image: '🚀', category: 'Books', description: 'Classic sci-fi collection' },
  { id: 51, name: 'Art & Design Portfolio', price: 1499, originalPrice: 2499, discount: 40, rating: 4.6, image: '🎨', category: 'Books', description: 'Inspiring art designs' },
  { id: 52, name: 'History Encyclopedia', price: 1999, originalPrice: 2999, discount: 33, rating: 4.7, image: '📜', category: 'Books', description: 'Complete world history' },

  // Toys
  { id: 53, name: 'Building Blocks Set', price: 1499, originalPrice: 2499, discount: 40, rating: 4.8, image: '🧱', category: 'Toys', description: '500+ pieces building blocks' },
  { id: 54, name: 'Remote Control Car', price: 2999, originalPrice: 4999, discount: 40, rating: 4.7, image: '🚗', category: 'Toys', description: 'High-speed RC car' },
  { id: 55, name: 'Doll House Deluxe', price: 3499, originalPrice: 5999, discount: 42, rating: 4.9, image: '🏠', category: 'Toys', description: 'Complete doll house set' },
  { id: 56, name: 'Puzzle 1000 Pieces', price: 699, originalPrice: 1199, discount: 42, rating: 4.5, image: '🧩', category: 'Toys', description: 'Challenging jigsaw puzzle' },
  { id: 57, name: 'Board Games Collection', price: 1999, originalPrice: 2999, discount: 33, rating: 4.6, image: '🎲', category: 'Toys', description: 'Family board games' },
  { id: 58, name: 'Educational Robot', price: 2499, originalPrice: 3999, discount: 38, rating: 4.8, image: '🤖', category: 'Toys', description: 'Learning robot for kids' },
  { id: 59, name: 'Art & Craft Kit', price: 999, originalPrice: 1699, discount: 41, rating: 4.7, image: '🎨', category: 'Toys', description: 'Complete art supplies' },
  { id: 60, name: 'Musical Instruments Set', price: 1799, originalPrice: 2999, discount: 40, rating: 4.6, image: '🎸', category: 'Toys', description: 'Kids musical instruments' },

  // Grocery
  { id: 61, name: 'Organic Rice 10kg', price: 899, originalPrice: 1199, discount: 25, rating: 4.6, image: '🌾', category: 'Grocery', description: 'Premium organic rice' },
  { id: 62, name: 'Cooking Oil Combo', price: 799, originalPrice: 999, discount: 20, rating: 4.5, image: '🛢️', category: 'Grocery', description: 'Healthy cooking oils' },
  { id: 63, name: 'Spices Gift Pack', price: 699, originalPrice: 999, discount: 30, rating: 4.7, image: '🌶️', category: 'Grocery', description: 'Essential Indian spices' },
  { id: 64, name: 'Dry Fruits Combo', price: 1499, originalPrice: 1999, discount: 25, rating: 4.8, image: '🥜', category: 'Grocery', description: 'Premium dry fruits mix' },
  { id: 65, name: 'Tea & Coffee Pack', price: 999, originalPrice: 1399, discount: 29, rating: 4.6, image: '🍵', category: 'Grocery', description: 'Assorted tea and coffee' },
  { id: 66, name: 'Breakfast Cereal Pack', price: 599, originalPrice: 799, discount: 25, rating: 4.4, image: '🥣', category: 'Grocery', description: 'Healthy breakfast cereals' },
  { id: 67, name: 'Organic Honey 1kg', price: 699, originalPrice: 999, discount: 30, rating: 4.9, image: '🍯', category: 'Grocery', description: 'Pure organic honey' },
  { id: 68, name: 'Pasta & Sauce Combo', price: 499, originalPrice: 699, discount: 29, rating: 4.5, image: '🍝', category: 'Grocery', description: 'Italian pasta combo' },
];
