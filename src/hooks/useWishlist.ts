import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../data/products';

interface WishlistItem extends Product {
  wishlist_id: string;
  added_at: string;
}

export function useWishlist() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });

      if (error) throw error;

      const items: WishlistItem[] = (data || []).map((item) => ({
        wishlist_id: item.id,
        id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        originalPrice: item.product_original_price,
        discount: item.product_discount,
        rating: item.product_rating,
        image: item.product_image,
        category: item.product_category,
        added_at: item.added_at,
      }));

      setWishlist(items);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product: Product) => {
    if (!user) {
      alert('Please sign in to add items to wishlist');
      return false;
    }

    try {
      const { error } = await supabase.from('wishlist').insert({
        user_id: user.id,
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        product_original_price: product.originalPrice,
        product_discount: product.discount,
        product_rating: product.rating,
        product_image: product.image,
        product_category: product.category,
      });

      if (error) {
        if (error.code === '23505') {
          alert('Item already in wishlist');
          return false;
        }
        throw error;
      }

      await fetchWishlist();
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add item to wishlist');
      return false;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchWishlist();
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to remove item from wishlist');
      return false;
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  return {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}
