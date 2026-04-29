import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showWishlist?: boolean;
  baseName?: string;
  sizeText?: string;
}

export default function ProductCard({ product, showWishlist = true, baseName, sizeText }: ProductCardProps) {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);

  // Check if product is in wishlist
  useEffect(() => {
    if (!user || !showWishlist) return;

    const wishlistQuery = query(
      collection(db, 'wishlists'),
      where('userId', '==', user.uid),
      where('productId', '==', product.id)
    );

    const unsubscribe = onSnapshot(wishlistQuery, (snapshot) => {
      if (!snapshot.empty) {
        setIsInWishlist(true);
        setWishlistId(snapshot.docs[0].id);
      } else {
        setIsInWishlist(false);
        setWishlistId(null);
      }
    });

    return () => unsubscribe();
  }, [user, product.id, showWishlist]);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Could show login modal or redirect
      return;
    }

    if (isInWishlist && wishlistId) {
      await deleteDoc(doc(db, 'wishlists', wishlistId));
    } else {
      await addDoc(collection(db, 'wishlists'), {
        userId: user.uid,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        addedAt: new Date()
      });
    }
  };

  return (
    <div className="relative group">
      <Link
        to={`/product/${product.id}`}
        className="block bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <div className="aspect-square overflow-hidden bg-sugan-bone-dark relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          {/* Wishlist Button Overlay */}
          {showWishlist && (
            <button
              onClick={handleWishlistClick}
              className={`absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                isInWishlist
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white/90 text-sugan-ink/60 hover:text-red-500 opacity-0 group-hover:opacity-100'
              }`}
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        <div className="p-3">
          <p className="text-xs text-sugan-gold font-body uppercase">{product.category}</p>
          <h4 className="font-body text-sm text-sugan-ink line-clamp-2 group-hover:text-sugan-gold transition-colors">
            {baseName || product.name}
          </h4>
          <p className="font-display text-sugan-ink font-semibold mt-1">
            ₹{product.price.toLocaleString()}
          </p>
          {sizeText && (
            <p className="text-xs text-sugan-ink/50 font-body mt-1">{sizeText}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
