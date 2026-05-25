import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  showWishlist?: boolean;
  baseName?: string;
  sizeText?: string;
}

// Build a short spec line from material only — dimensions belong on the
// product detail page, not on the shop/category cards.
function buildSpecLine(product: Product): string | null {
  const material = product.details?.materials?.split(',')[0]?.trim();
  return material ?? null;
}

export default function ProductCard({
  product,
  showWishlist = true,
  baseName,
  sizeText,
}: ProductCardProps) {
  const { user } = useAuth();
  const location = useLocation();
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
      state={{ from: location.pathname + location.search }}
      data-cursor="view"
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-sugan-bone-dark">
        {/* Primary image - fades out on hover */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-apple group-hover:opacity-0"
        />
        {/* Secondary image - fades in on hover, slightly larger settling to 1.0 */}
        <img
          src={secondaryImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain scale-105 opacity-0 transition-opacity duration-700 ease-apple group-hover:opacity-100"
          onError={(e) => {
            // If _02 doesn't exist, fall back silently to the primary image
            const img = e.currentTarget;
            if (img.src !== product.image) img.src = product.image;
          }}
        />

        {/* Pre-order badge */}
        {product.preOrder && !product.inStock && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white font-body text-[10px] tracking-[0.1em] uppercase px-2 py-1 z-10">
            Pre-order
          </span>
        )}

        {(product.isPremium || product.isBestSeller) && (
          <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10">
            {product.isPremium && (
              <span className="bg-sugan-ink-soft text-sugan-bone font-body text-[9px] tracking-[0.12em] uppercase px-2 py-1 w-fit">
                Premium
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-emerald-700 text-sugan-bone font-body text-[9px] tracking-[0.12em] uppercase px-2 py-1 w-fit">
                Best Seller
              </span>
            )}
          </div>
        )}

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
        <p className="mt-2 font-body text-[15px] text-sugan-ink tabular-nums flex items-baseline gap-2">
          {formatPrice(product.price)}
          {product.onSale && product.originalPrice && product.price > 0 && (
            <span className="text-[13px] text-sugan-ink/40 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
