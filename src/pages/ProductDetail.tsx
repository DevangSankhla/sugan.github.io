import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Minus, Plus, Heart, Share2, Package, Ruler, Sparkles, Shield, Truck, ChevronDown, ChevronUp } from 'lucide-react';
import { allProducts } from '@/data/rooms';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import ImageGallery from '@/components/ImageGallery';
import TrustBadges from '@/components/TrustBadges';
import ArtisanStory from '@/components/ArtisanStory';
import SizeGuide from '@/components/SizeGuide';
import RatingBreakdown from '@/components/RatingBreakdown';
import CompleteTheLook from '@/components/CompleteTheLook';
import RecentlyViewed, { addToRecentlyViewed } from '@/components/RecentlyViewed';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState<string | null>(null);

  const product = allProducts.find((p) => p.id === id);

  // Check if product is in wishlist
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

  // Add to recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-sugan-cream pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-sugan-brown mb-4">Product Not Found</h1>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      price: product.details?.variants?.[selectedVariant]?.price || product.price,
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(itemToAdd);
    }
    setIsCartOpen(true);
  };

  // Get all images (main + additional)
  const allImages = [
    product.image,
    ...(product.details?.photos || [])
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Calculate display price
  const displayPrice = product.details?.variants?.[selectedVariant]?.price || product.price;
  const displaySku = product.details?.variants?.[selectedVariant]?.sku || product.id;

  return (
    <div className="min-h-screen bg-sugan-cream pt-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-sugan-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sugan-brown/60 hover:text-sugan-gold transition-colors text-sm font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {product.room.charAt(0).toUpperCase() + product.room.slice(1)}
          </button>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ImageGallery images={allImages} productName={product.name} />

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category & SKU */}
            <div className="flex items-center gap-3 mb-2">
              <p className="text-sugan-gold text-sm font-body uppercase tracking-wider">
                {product.category}
              </p>
              {displaySku && (
                <span className="text-sugan-brown/40 text-xs font-body">SKU: {displaySku}</span>
              )}
            </div>
            
            {/* Name */}
            <h1 className="font-display text-3xl sm:text-4xl text-sugan-brown mb-4">
              {product.name}
            </h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-sugan-gold text-sugan-gold'
                          : 'text-sugan-brown/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-sugan-brown/60 font-body">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-3xl font-semibold text-sugan-brown">
                ₹{displayPrice.toLocaleString()}
              </span>

            </div>

            {/* Short Description */}
            <p className="text-sugan-brown/70 font-body leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Variants Selection */}
            {product.details?.variants && product.details.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-sugan-brown mb-2">
                  Select Variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.details.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedVariant === idx
                          ? 'border-sugan-gold bg-sugan-gold/10'
                          : 'border-sugan-brown/20 hover:border-sugan-gold'
                      }`}
                    >
                      <span className="text-sm font-body text-sugan-brown">
                        {variant.size || variant.color}
                      </span>
                      <span className="text-sm font-semibold text-sugan-brown ml-2">
                        ₹{variant.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.details?.colors && product.details.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-sugan-brown mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.details.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-sugan-cream rounded-full text-sm font-body text-sugan-brown"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variants - Links to other sizes */}
            {product.relatedSizes && product.relatedSizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-sugan-brown mb-2">
                  Also Available In
                </label>
                <div className="flex flex-wrap gap-2">
                  {/* All sizes including current, sorted by price ascending */}
                  {[...product.relatedSizes, { size: product.name.match(/(Small|Medium|Large|Extra Small)/)?.[0] || 'Current', productId: product.id, price: product.price }]
                    .sort((a, b) => a.price - b.price)
                    .map((variant, idx) => (
                      variant.productId === product.id ? (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-lg border-2 border-sugan-gold bg-sugan-gold/10 text-sm font-body text-sugan-brown"
                        >
                          {variant.size}
                          <span className="font-semibold ml-2">₹{variant.price.toLocaleString()}</span>
                        </span>
                      ) : (
                        <Link
                          key={idx}
                          to={`/product/${variant.productId}`}
                          className="px-4 py-2 rounded-lg border-2 border-sugan-brown/20 hover:border-sugan-gold transition-colors text-sm font-body text-sugan-brown"
                        >
                          {variant.size}
                          <span className="font-semibold ml-2">₹{variant.price.toLocaleString()}</span>
                        </Link>
                      )
                    ))}
                </div>
              </div>
            )}

            {/* Quick Info Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {product.details?.materials && (
                <div className="flex items-center gap-2 text-sm text-sugan-brown/60 font-body bg-white px-3 py-2 rounded-lg">
                  <Package className="w-4 h-4 text-sugan-gold" />
                  {product.details.materials.split(',')[0]}
                </div>
              )}
              {product.details?.dimensions && (
                <div className="flex items-center gap-2 text-sm text-sugan-brown/60 font-body bg-white px-3 py-2 rounded-lg">
                  <Ruler className="w-4 h-4 text-sugan-gold" />
                  {product.details.dimensions.length} × {product.details.dimensions.width}
                </div>
              )}
              {product.details?.warranty && (
                <div className="flex items-center gap-2 text-sm text-sugan-brown/60 font-body bg-white px-3 py-2 rounded-lg">
                  <Shield className="w-4 h-4 text-sugan-gold" />
                  {product.details.warranty.split(' ')[0]} Warranty
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity */}
              <div className="flex items-center gap-3 border border-sugan-brown/20 rounded-lg px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-sugan-brown hover:text-sugan-gold transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-body text-sugan-brown">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-sugan-brown hover:text-sugan-gold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              {/* WhatsApp Inquire */}
              <a
                href={`https://wa.me/916367677255?text=Hi, I'm interested in ${product.name} (SKU: ${displaySku})`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2"
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={async () => {
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
                      addedAt: new Date()
                    });
                  }
                }}
                className={`flex items-center gap-2 transition-colors text-sm font-body ${
                  isInWishlist ? 'text-red-500' : 'text-sugan-brown/60 hover:text-sugan-gold'
                }`}
              >
                <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product?.name,
                      text: product?.description,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="flex items-center gap-2 text-sugan-brown/60 hover:text-sugan-gold transition-colors text-sm font-body"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm mb-8">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-body ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Information */}
          <div className="lg:col-span-2 space-y-4">
            {/* Description Section */}
            <div className="bg-white rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('description')}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-lg text-sugan-brown">Description</span>
                {expandedSection === 'description' ? (
                  <ChevronUp className="w-5 h-5 text-sugan-brown" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-sugan-brown" />
                )}
              </button>
              {expandedSection === 'description' && (
                <div className="px-6 pb-6">
                  <p className="text-sugan-brown/70 font-body leading-relaxed">
                    {product.description}
                  </p>
                  {product.details?.story && (
                    <div className="mt-4 p-4 bg-sugan-cream rounded-lg">
                      <h4 className="font-medium text-sugan-brown mb-2">The Story</h4>
                      <p className="text-sugan-brown/70 font-body text-sm">{product.details.story}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Materials & Dimensions */}
            {(product.details?.materials || product.details?.dimensions) && (
              <div className="bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('specs')}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg text-sugan-brown">Materials & Dimensions</span>
                  {expandedSection === 'specs' ? (
                    <ChevronUp className="w-5 h-5 text-sugan-brown" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-sugan-brown" />
                  )}
                </button>
                {expandedSection === 'specs' && (
                  <div className="px-6 pb-6 space-y-4">
                    {product.details.materials && (
                      <div>
                        <h4 className="font-medium text-sugan-brown mb-1">Materials</h4>
                        <p className="text-sugan-brown/70 font-body text-sm">{product.details.materials}</p>
                      </div>
                    )}
                    {product.details.construction && (
                      <div>
                        <h4 className="font-medium text-sugan-brown mb-1">Construction</h4>
                        <p className="text-sugan-brown/70 font-body text-sm">{product.details.construction}</p>
                      </div>
                    )}
                    {product.details.finish && (
                      <div>
                        <h4 className="font-medium text-sugan-brown mb-1">Finish</h4>
                        <p className="text-sugan-brown/70 font-body text-sm">{product.details.finish}</p>
                      </div>
                    )}
                    {product.details.dimensions && (
                      <div>
                        <h4 className="font-medium text-sugan-brown mb-2">Dimensions (inches)</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {product.details.dimensions.length && (
                            <div className="flex justify-between bg-sugan-cream px-3 py-2 rounded">
                              <span className="text-sugan-brown/60">Length</span>
                              <span className="text-sugan-brown font-medium">{product.details.dimensions.length}"</span>
                            </div>
                          )}
                          {product.details.dimensions.width && (
                            <div className="flex justify-between bg-sugan-cream px-3 py-2 rounded">
                              <span className="text-sugan-brown/60">Width</span>
                              <span className="text-sugan-brown font-medium">{product.details.dimensions.width}"</span>
                            </div>
                          )}
                          {product.details.dimensions.height && (
                            <div className="flex justify-between bg-sugan-cream px-3 py-2 rounded">
                              <span className="text-sugan-brown/60">Height</span>
                              <span className="text-sugan-brown font-medium">{product.details.dimensions.height}"</span>
                            </div>
                          )}
                          {product.details.dimensions.depth && (
                            <div className="flex justify-between bg-sugan-cream px-3 py-2 rounded">
                              <span className="text-sugan-brown/60">Depth</span>
                              <span className="text-sugan-brown font-medium">{product.details.dimensions.depth}"</span>
                            </div>
                          )}
                          {product.details.dimensions.diameter && (
                            <div className="flex justify-between bg-sugan-cream px-3 py-2 rounded">
                              <span className="text-sugan-brown/60">Diameter</span>
                              <span className="text-sugan-brown font-medium">{product.details.dimensions.diameter}"</span>
                            </div>
                          )}
                          {product.details.dimensions.weight && (
                            <div className="flex justify-between bg-sugan-cream px-3 py-2 rounded">
                              <span className="text-sugan-brown/60">Weight</span>
                              <span className="text-sugan-brown font-medium">{product.details.dimensions.weight}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Care Instructions */}
            {product.details?.care && (
              <div className="bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('care')}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg text-sugan-brown">Care Instructions</span>
                  {expandedSection === 'care' ? (
                    <ChevronUp className="w-5 h-5 text-sugan-brown" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-sugan-brown" />
                  )}
                </button>
                {expandedSection === 'care' && (
                  <div className="px-6 pb-6">
                    <p className="text-sugan-brown/70 font-body">{product.details.care}</p>
                    {product.details.maintenance && (
                      <div className="mt-4">
                        <h4 className="font-medium text-sugan-brown mb-1">Long-term Maintenance</h4>
                        <p className="text-sugan-brown/70 font-body text-sm">{product.details.maintenance}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Shipping & Returns */}
            <div className="bg-white rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-lg text-sugan-brown">Shipping & Returns</span>
                {expandedSection === 'shipping' ? (
                  <ChevronUp className="w-5 h-5 text-sugan-brown" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-sugan-brown" />
                )}
              </button>
              {expandedSection === 'shipping' && (
                <div className="px-6 pb-6 space-y-4">
                  {product.details?.shipping && (
                    <div>
                      <h4 className="font-medium text-sugan-brown mb-1">Shipping</h4>
                      <p className="text-sugan-brown/70 font-body text-sm">{product.details.shipping}</p>
                    </div>
                  )}
                  {product.details?.delivery && (
                    <div>
                      <h4 className="font-medium text-sugan-brown mb-1">Delivery Time</h4>
                      <p className="text-sugan-brown/70 font-body text-sm">{product.details.delivery}</p>
                    </div>
                  )}
                  {product.details?.returns && (
                    <div>
                      <h4 className="font-medium text-sugan-brown mb-1">Returns</h4>
                      <p className="text-sugan-brown/70 font-body text-sm">{product.details.returns}</p>
                    </div>
                  )}
                  {product.details?.warranty && (
                    <div>
                      <h4 className="font-medium text-sugan-brown mb-1">Warranty</h4>
                      <p className="text-sugan-brown/70 font-body text-sm">{product.details.warranty}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FAQ */}
            {product.details?.faq && product.details.faq.length > 0 && (
              <div className="bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('faq')}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg text-sugan-brown">FAQ</span>
                  {expandedSection === 'faq' ? (
                    <ChevronUp className="w-5 h-5 text-sugan-brown" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-sugan-brown" />
                  )}
                </button>
                {expandedSection === 'faq' && (
                  <div className="px-6 pb-6 space-y-4">
                    {product.details.faq.map((item, idx) => (
                      <div key={idx}>
                        <h4 className="font-medium text-sugan-brown mb-1">{item.question}</h4>
                        <p className="text-sugan-brown/70 font-body text-sm">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            {/* USP */}
            {product.details?.usp && product.details.usp.length > 0 && (
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-sugan-gold" />
                  <h3 className="font-display text-lg text-sugan-brown">Key Features</h3>
                </div>
                <ul className="space-y-3">
                  {product.details.usp.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-sugan-gold rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sugan-brown/70 font-body text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shipping Info */}
            <div className="bg-sugan-brown text-sugan-cream rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-sugan-gold" />
                <h3 className="font-display text-lg">Delivery</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sugan-gold rounded-full" />
                  Free shipping on orders above ₹1999
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sugan-gold rounded-full" />
                  Ships within 2-3 business days
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sugan-gold rounded-full" />
                  Pan India delivery
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sugan-gold rounded-full" />
                  Cash on delivery available
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div className="bg-sugan-gold/10 rounded-lg p-6">
              <h3 className="font-display text-lg text-sugan-brown mb-2">Need Help?</h3>
              <p className="text-sugan-brown/70 font-body text-sm mb-4">
                Have questions about this product? Contact us on WhatsApp.
              </p>
              <a
                href={`https://wa.me/916367677255?text=Hi, I have questions about ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust Badges */}
            <TrustBadges variant="vertical" />

            {/* Size Guide */}
            <SizeGuide dimensions={product.details?.dimensions} />

            {/* Rating Breakdown */}
            {product.rating && product.reviews && (
              <RatingBreakdown rating={product.rating} reviews={product.reviews} />
            )}

            {/* Complete the Look */}
            <CompleteTheLook currentProduct={product} />

            {/* Artisan Story */}
            <ArtisanStory 
              artisan={product.details?.artisan}
              story={product.details?.story}
              origin={product.details?.origin}
            />
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
}
