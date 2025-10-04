import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../data/products';

interface CartItem extends Product {
  cart_id: string;
  quantity: number;
  added_at: string;
}

export function useCart() {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });

      if (error) throw error;

      const items: CartItem[] = (data || []).map((item) => ({
        cart_id: item.id,
        id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        originalPrice: item.product_original_price,
        discount: item.product_discount,
        rating: item.product_rating,
        image: item.product_image,
        category: item.product_category,
        quantity: item.quantity,
        added_at: item.added_at,
      }));

      setCart(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product: Product) => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return false;
    }

    try {
      const { error } = await supabase.from('cart').insert({
        user_id: user.id,
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_original_price: product.originalPrice,
        product_discount: product.discount,
        product_rating: product.rating,
        product_image: product.image,
        product_category: product.category,
        quantity: 1,
      });

      if (error) {
        if (error.code === '23505') {
          alert('Item already in cart');
          return false;
        }
        throw error;
      }

      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
      return false;
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove item from cart');
      return false;
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user || quantity < 1) return false;

    try {
      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
      return false;
    }
  };

  const isInCart = (productId: number) => {
    return cart.some((item) => item.id === productId);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    isInCart,
    cartTotal,
    cartCount,
  };
}
