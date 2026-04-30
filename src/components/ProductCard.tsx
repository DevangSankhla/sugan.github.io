import { useState, useEffect, useMemo } from 'react';
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

// Build a short spec line from material + primary dimension if available.
function buildSpecLine(product: Product): string | null {
  const material = product.details?.materials?.split(',')[0]?.trim();
  const dims = product.details?.dimensions;
  let dimText: string | null = null;
  if (dims) {
    const parts = [dims.length, dims.width, dims.height].filter(Boolean);
    if (parts.length >= 2) dimText = parts.join('×') + (typeof parts[0] === 'string' ? '' : '"');
    else if (dims.diameter) dimText = `Ø${dims.diameter}`;
  }
  if (material && dimText) return `${material} · ${dimText}`;
  if (material) return material;
  if (dimText) return dimText;
  return null;
}

export default function ProductCard({
  product,
  showWishlist = true,
  baseName,
  sizeText,
}: ProductCardProps) {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);

  // Derive secondary image for dual-image hover (Aimé Leon Dore-style).
  const secondaryImage = useMemo(() => {
    if (product.image.includes('_01.png')) {
      return product.image.replace('_01.png', '_02.png');
    }
    return product.image;
  }, [product.image]);

  const specLine = useMemo(() => buildSpecLine(product), [product]);

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
    if (!user) return;

    if (isInWishlist && wishlistId) {
      await deleteDoc(doc(db, 'wishlists', wishlistId));
    } else {
      await addDoc(collection(db, 'wishlists'), {
        userId: user.uid,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        addedAt: new Date(),
      });
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      data-cursor="view"
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-sugan-bone-dark">
        {/* Primary image - fades out on hover */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-apple group-hover:opacity-0"
        />
        {/* Secondary image - fades in on hover, slightly larger settling to 1.0 */}
        <img
          src={secondaryImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-0 transition-opacity duration-700 ease-apple group-hover:opacity-100"
          onError={(e) => {
            // If _02 doesn't exist, fall back silently to the primary image
            const img = e.currentTarget;
            if (img.src !== product.image) img.src = product.image;
          }}
        />

        {/* Wishlist - persistent at low opacity, fills on active */}
        {showWishlist && (
          <button
            onClick={handleWishlistClick}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-opacity duration-300 ease-apple ${
              isInWishlist
                ? 'text-sugan-ink opacity-100'
                : 'text-sugan-ink/70 opacity-30 group-hover:opacity-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      <div className="pt-4">
        {product.category && (
          <p className="text-eyebrow font-body uppercase text-sugan-ink/40">
            {product.category}
          </p>
        )}
        <h4 className="mt-2 font-body text-[15px] text-sugan-ink line-clamp-2">
          {baseName || product.name}
        </h4>
        {(specLine || sizeText) && (
          <p className="mt-1 font-body text-body-sm text-sugan-ink-soft">
            {sizeText ?? specLine}
          </p>
        )}
        <p className="mt-2 font-body text-[15px] text-sugan-ink tabular-nums">
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
