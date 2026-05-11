import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Star, Minus, Plus, Heart, Share2, MapPin, Ruler, Truck, Sparkles } from 'lucide-react';
import { allProducts, getAllSizeVariants, getBaseProductName, hasSizeVariants } from '@/data/rooms';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { addToRecentlyViewed } from '@/components/RecentlyViewed';
import RecentlyViewed from '@/components/RecentlyViewed';
import RelatedProducts from '@/components/RelatedProducts';

type SpecRow = { label: string; value: string };

function ExpandableDescription({ product }: { product: import('@/types').Product }) {
  const description = product.description;
  const story = product.details?.story;
  const hasMore = !!story && story.trim() !== description.trim();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <p className="font-body text-body text-sugan-ink-soft leading-relaxed whitespace-pre-line">
        {expanded && hasMore ? `${description}\n\n${story}` : description}
      </p>
      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="self-start text-eyebrow font-body uppercase text-sugan-ink border-b border-sugan-ink/30 pb-0.5 hover:border-sugan-ink transition-colors"
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from as string | undefined;
  const { addToCart, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);

  const product = allProducts.find((p) => p.id === id);

  useEffect(() => {
    if (!user || !product) return;
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
    return unsubscribe;
  }, [user, product]);

  useEffect(() => {
    if (product) addToRecentlyViewed(product.id);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-sugan-bone pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-display-lg font-light text-sugan-ink mb-6">
            Product not found
          </h1>
          <Link to="/shop" className="btn-outline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/product/${product.id}`)}`);
      return;
    }
    if (!product.inStock && !product.preOrder) return;
    const itemToAdd = {
      ...product,
      price: product.details?.variants?.[selectedVariant]?.price || product.price,
    };
    for (let i = 0; i < quantity; i++) addToCart(itemToAdd);
    setIsCartOpen(true);
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isInWishlist && wishlistId) {
      await deleteDoc(doc(db, 'wishlists', wishlistId));
    } else if (product) {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getAllImages = (): string[] => {
    const images: string[] = [product.image];
    if (product.image.includes('_01.png')) {
      images.push(product.image.replace('_01.png', '_02.png'));
    }
    if (product.details?.photos) images.push(...product.details.photos);
    return images;
  };

  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const allImages = getAllImages();
  const heroImage = allImages[0];
  const galleryImages = allImages.slice(1).filter((src) => !failedImages.has(src));
  const galleryVideos: string[] = product.details?.videos ?? [];

  const displayPrice =
    product.details?.variants?.[selectedVariant]?.price || product.price;
  const displaySku =
    product.details?.variants?.[selectedVariant]?.sku || product.id;

  // Build the specifications table
  const specs: SpecRow[] = [];
  const d = product.details;
  if (d?.materials) specs.push({ label: 'Material', value: d.materials });
  if (d?.construction) specs.push({ label: 'Construction', value: d.construction });
  if (d?.finish) specs.push({ label: 'Finish', value: d.finish });
  if (d?.dimensions) {
    const parts: string[] = [];
    if (d.dimensions.height) parts.push(`H ${d.dimensions.height}`);
    if (d.dimensions.length) parts.push(`L ${d.dimensions.length}`);
    if (d.dimensions.width) parts.push(`W ${d.dimensions.width}`);
    if (d.dimensions.depth) parts.push(`D ${d.dimensions.depth}`);
    if (d.dimensions.diameter) parts.push(`Ø ${d.dimensions.diameter}`);
    if (parts.length) specs.push({ label: 'Dimensions', value: parts.join(' · ') });
    if (d.dimensions.weight) specs.push({ label: 'Weight', value: String(d.dimensions.weight) });
  }
  if (d?.usesAndMeasurements) specs.push({ label: 'Size Guide', value: d.usesAndMeasurements });
  if (d?.care) specs.push({ label: 'Care', value: d.care });
  if (d?.shipping) specs.push({ label: 'Shipping', value: d.shipping });
  if (d?.warranty) specs.push({ label: 'Warranty', value: d.warranty });

  const isHot = ['SAC048S', 'SAC048M', 'SAC048L'].includes(product.id);

  const backLabel = (() => {
    if (fromPage?.includes('/shop/')) {
      const slug = fromPage.split('/shop/')[1];
      return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
    if (product.room) {
      return product.room.charAt(0).toUpperCase() + product.room.slice(1);
    }
    return 'Shop';
  })();

  return (
    <div className="bg-sugan-bone pb-24 lg:pb-0">
      {/* Above the fold: full-viewport image, no overlay */}
      <div className="relative h-[70vh] sm:h-screen min-h-[400px] sm:min-h-[640px] w-full overflow-hidden bg-sugan-bone-dark">
        <img
          src={heroImage}
          alt={product.name}
          data-cursor="view"
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* Soft gradient at the bottom only - no text overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sugan-bone via-sugan-bone/30 to-transparent pointer-events-none" />

        {/* Floating back chip - bone/85 frosted, hairline border, sits below the nav */}
        <button
          onClick={() => {
            if (fromPage) navigate(fromPage);
            else if (window.history.length > 1) navigate(-1);
            else if (product.room) navigate(`/shop/${product.room}`);
            else navigate('/shop');
          }}
          className="absolute top-24 left-section-x inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-sugan-bone/85 backdrop-blur-md border border-sugan-ink/10 text-eyebrow font-body uppercase text-sugan-ink hover:bg-sugan-bone transition-colors duration-300 ease-apple"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {backLabel}
        </button>
      </div>

      {/* Editorial layout: gallery left, sticky info right */}
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
        {/* Vertical image + video stack */}
        <div className="bg-sugan-bone-dark">
          {galleryImages.length > 0 ? (
            galleryImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative w-full aspect-square lg:aspect-[4/5] overflow-hidden bg-sugan-bone-dark"
              >
                <img
                  src={src}
                  alt={`${product.name} - view ${i + 2}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain"
                  onError={() =>
                    setFailedImages((prev) => {
                      if (prev.has(src)) return prev;
                      const next = new Set(prev);
                      next.add(src);
                      return next;
                    })
                  }
                />
              </div>
            ))
          ) : (
            <div className="relative w-full aspect-square lg:aspect-[4/5] overflow-hidden bg-sugan-bone-dark">
              <img
                src={heroImage}
                alt={product.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          )}

          {/* Videos */}
          {galleryVideos.map((src, i) => (
            <div
              key={`video-${i}`}
              className="relative w-full aspect-square lg:aspect-[4/5] overflow-hidden bg-sugan-bone-dark"
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Info panel — scrolls with the page so the photos and the info move together */}
        <div>
          <div className="section-padding pt-8 pb-12 lg:pt-16 flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 text-eyebrow font-body uppercase text-sugan-ink-soft">
              {product.category && <span>{product.category}</span>}
              <span aria-hidden="true" className="text-sugan-ink/30">·</span>
              <span className="tabular-nums">SKU {displaySku}</span>
            </div>

            {/* Name */}
            <h1 className="font-display text-display-lg font-light text-sugan-ink leading-tight">
              {getBaseProductName(product.name)}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-sugan-gold text-sugan-gold'
                          : 'text-sugan-ink/15'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-eyebrow font-body uppercase text-sugan-ink-soft">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>
            )}

            {/* Price */}
            <p className="font-body text-display-md font-light text-sugan-ink tabular-nums">
              {displayPrice === 0 ? 'Coming soon' : `₹${displayPrice.toLocaleString()}`}
            </p>

            {/* Description — visible immediately, expandable if details.story is longer */}
            <ExpandableDescription product={product} />

            {/* Stock + hot tag */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span
                className={`inline-flex items-center gap-2 text-eyebrow font-body uppercase ${
                  product.price === 0 ? 'text-sugan-ink/50' : product.inStock ? 'text-sugan-ink' : 'text-sugan-ink/50'
                }`}
              >
                <span
                  className={`block w-1.5 h-1.5 rounded-full ${
                    product.price === 0 ? 'bg-sugan-gold/40' : product.inStock ? 'bg-sugan-gold' : 'bg-sugan-ink/30'
                  }`}
                  aria-hidden="true"
                />
                {product.price === 0 ? 'Coming soon' : product.inStock ? 'In stock' : 'Out of stock'}
              </span>
              {isHot && product.inStock && (
                <span className="inline-flex items-center gap-2 text-eyebrow font-body uppercase text-sugan-gold">
                  <span aria-hidden="true">·</span> Best-seller
                </span>
              )}
            </div>

            {/* Size variants — ABOVE description so they're always in view */}
            {hasSizeVariants(product) && (
              <div className="flex flex-col gap-3">
                <p className="text-eyebrow font-body uppercase text-sugan-ink-soft">Size</p>
                <div className="flex flex-wrap gap-2">
                  {getAllSizeVariants(product).map((variant) => {
                    const isActive = variant.product.id === product.id;
                    const cls = `px-4 py-2 rounded-pill border font-body text-eyebrow uppercase transition-colors duration-300 ease-apple tabular-nums ${
                      isActive
                        ? 'border-sugan-ink bg-sugan-ink text-sugan-bone'
                        : 'border-sugan-ink/20 text-sugan-ink hover:border-sugan-ink'
                    }`;
                    const priceLabel = variant.product.price === 0
                      ? 'Coming soon'
                      : `₹${variant.product.price.toLocaleString()}`;
                    if (isActive) {
                      return (
                        <span key={variant.product.id} className={cls}>
                          {variant.size} · {priceLabel}
                        </span>
                      );
                    }
                    return (
                      <Link
                        key={variant.product.id}
                        to={`/product/${variant.product.id}`}
                        state={{ from: fromPage || `/shop/${product.room}` }}
                        className={cls}
                      >
                        {variant.size} · {priceLabel}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Variant pricing (size/color from details) */}
            {product.details?.variants && product.details.variants.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-eyebrow font-body uppercase text-sugan-ink-soft">Option</p>
                <div className="flex flex-wrap gap-2">
                  {product.details.variants.map((v, idx) => {
                    const active = selectedVariant === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(idx)}
                        className={`px-4 py-2 rounded-pill border font-body text-eyebrow uppercase transition-colors duration-300 ease-apple tabular-nums ${
                          active
                            ? 'border-sugan-ink bg-sugan-ink text-sugan-bone'
                            : 'border-sugan-ink/20 text-sugan-ink hover:border-sugan-ink'
                        }`}
                      >
                        {v.size || v.color} · ₹{v.price.toLocaleString()}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + Add to bag */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-3">
                <p className="text-eyebrow font-body uppercase text-sugan-ink-soft">Quantity</p>
                <div className="inline-flex items-center border border-sugan-ink/20 rounded-pill">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-9 h-9 inline-flex items-center justify-center text-sugan-ink hover:text-sugan-gold transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-body text-[15px] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-9 h-9 inline-flex items-center justify-center text-sugan-ink hover:text-sugan-gold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || product.price === 0}
                className={`btn-primary w-full ${
                  (!product.inStock || product.price === 0) ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {product.price === 0 ? 'Coming soon' : product.inStock ? 'Add to bag' : 'Out of stock'}
              </button>

              {/* Perks under the buy button — universal across products */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-start gap-2 font-body text-body-sm text-sugan-ink-soft leading-relaxed">
                  <Truck className="w-4 h-4 mt-0.5 shrink-0 text-sugan-gold" />
                  <span>Free delivery on every order, no minimum.</span>
                </div>
                <div className="flex items-start gap-2 font-body text-body-sm text-sugan-ink-soft leading-relaxed">
                  <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-sugan-gold" />
                  <span>
                    First order? Use code{' '}
                    <span className="font-medium tracking-wide text-sugan-ink">FIRST10</span>{' '}
                    for 10% off at checkout.
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/916367677255?text=${encodeURIComponent(
                  `Hi, I'm interested in ${product.name} (SKU: ${displaySku})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full"
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* Wishlist + share */}
            <div className="flex items-center gap-6">
              <button
                onClick={handleWishlistToggle}
                className="inline-flex items-center gap-2 text-eyebrow font-body uppercase text-sugan-ink-soft hover:text-sugan-ink transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-current text-sugan-ink' : ''}`} />
                {isInWishlist ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-eyebrow font-body uppercase text-sugan-ink-soft hover:text-sugan-ink transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>

            {/* Size guide reminder */}
            {product.details?.usesAndMeasurements && (
              <button
                type="button"
                onClick={() => {
                  document.getElementById('size-guide')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-start gap-3 text-left bg-sugan-bone-dark/60 border border-sugan-ink/10 rounded-md px-4 py-3 hover:bg-sugan-bone-dark transition-colors"
              >
                <Ruler className="w-4 h-4 mt-0.5 shrink-0 text-sugan-ink" />
                <span className="font-body text-body-sm text-sugan-ink-soft leading-relaxed">
                  Please check the <span className="text-sugan-ink underline underline-offset-2">size guide</span> below before ordering so your pet gets the feeder best suited to their breed and weight.
                </span>
              </button>
            )}

            {/* Out of stock fallback */}
            {!product.inStock && product.price !== 0 && (
              <div className="border-t border-sugan-ink/10 pt-6 flex flex-col gap-3">
                <p className="font-body text-body-sm text-sugan-ink-soft">
                  Currently restocking. Request a notification by email.
                </p>
                <a
                  href={`mailto:contact@sugan.shop?subject=${encodeURIComponent(
                    `Restock request - ${product.name}`
                  )}&body=${encodeURIComponent(
                    `Please notify me when ${product.name} (SKU: ${product.id}) is back in stock.`
                  )}`}
                  className="btn-outline self-start"
                >
                  Request restock notice
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Specifications */}
      {specs.length > 0 && (
        <section className="section-padding section-y border-t border-sugan-ink/10">
          <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-6">
            Specifications
          </p>
          <h2 className="font-display text-display-lg font-light text-sugan-ink mb-12 max-w-2xl">
            Made to be inspected.
          </h2>

          <div className="max-w-3xl">
            {specs.map((row, i) => (
              <div
                key={row.label}
                id={row.label === 'Size Guide' ? 'size-guide' : undefined}
                className={`grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] gap-6 py-5 scroll-mt-24 ${
                  i === 0 ? 'border-y' : 'border-b'
                } border-sugan-ink/10`}
              >
                <span className="text-eyebrow font-body uppercase text-sugan-ink-soft tabular-nums">
                  {row.label}
                </span>
                <span className={`font-body text-body text-sugan-ink leading-relaxed ${row.label === 'Size Guide' ? 'whitespace-pre-line' : ''}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Crafted by */}
      <section className="border-t border-sugan-ink/10 bg-sugan-bone">
        <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr]">
          <div className="relative aspect-[4/5] lg:aspect-auto bg-sugan-bone-dark overflow-hidden">
            <img
              src="/images/Crafting Excellence hero.jpeg"
              alt="The Sugan workshop, Jodhpur"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="section-padding py-section-y flex flex-col gap-8 max-w-2xl">
            <p className="text-eyebrow font-body uppercase text-sugan-ink-soft inline-flex items-center gap-3">
              <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
              Crafted by
            </p>
            <h2 className="font-display text-display-lg font-light text-sugan-ink">
              {product.details?.artisan || 'Master craftsman'}
            </h2>
            <div className="flex items-center gap-2 text-eyebrow font-body uppercase text-sugan-ink-soft">
              <MapPin className="w-3.5 h-3.5" />
              {product.details?.origin || 'Jodhpur, Rajasthan'}
            </div>
            <p className="font-body text-body-lg text-sugan-ink-soft leading-relaxed">
              {product.details?.story ||
                'Each piece is hand-shaped by artisans whose families have worked the same wood for generations. The grain is read, the joinery cut by hand, the finish raised over days - never minutes.'}
            </p>
          </div>
        </div>
      </section>

      {/* Related products */}
      <RelatedProducts currentProduct={product} />

      {/* Recently viewed */}
      <RecentlyViewed />

      {/* Sticky mobile add-to-cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-sugan-bone/90 backdrop-blur-xl border-t border-sugan-ink/10 p-4 lg:hidden z-40 safe-area-inset">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="inline-flex items-center border border-sugan-ink/20 rounded-pill">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="w-9 h-9 inline-flex items-center justify-center text-sugan-ink"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center font-body text-[15px] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="w-9 h-9 inline-flex items-center justify-center text-sugan-ink"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || product.price === 0}
            className={`btn-primary flex-1 tabular-nums ${
              (!product.inStock || product.price === 0) ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {product.price === 0
              ? 'Coming soon'
              : product.inStock
              ? `Add · ₹${(displayPrice * quantity).toLocaleString()}`
              : 'Out of stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
