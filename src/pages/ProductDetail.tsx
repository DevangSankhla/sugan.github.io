import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ExternalLink, Star, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { allProducts } from '@/data/rooms';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find((p) => p.id === id);

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
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsCartOpen(true);
  };

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
            Back to Products
          </button>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-sugan-cream-dark rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-sugan-gold text-sm font-body uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-sugan-brown mb-4">
              {product.name}
            </h1>
            
            {/* Rating */}
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

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-3xl font-semibold text-sugan-brown">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-sugan-brown/40 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-sugan-gold text-white text-xs px-2 py-1 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sugan-brown/70 font-body leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-sugan-brown/60 font-body">
                <div className="w-2 h-2 bg-sugan-gold rounded-full" />
                Handcrafted in Jodhpur
              </div>
              <div className="flex items-center gap-2 text-sm text-sugan-brown/60 font-body">
                <div className="w-2 h-2 bg-sugan-gold rounded-full" />
                Premium Solid Wood
              </div>
              <div className="flex items-center gap-2 text-sm text-sugan-brown/60 font-body">
                <div className="w-2 h-2 bg-sugan-gold rounded-full" />
                Food-Safe Finish
              </div>
              <div className="flex items-center gap-2 text-sm text-sugan-brown/60 font-body">
                <div className="w-2 h-2 bg-sugan-gold rounded-full" />
                25+ Years Warranty
              </div>
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

              {/* Contact for Purchase */}
              <a
                href="https://wa.me/916367677255"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Inquire on WhatsApp
              </a>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-4 mb-8">
              <button className="flex items-center gap-2 text-sugan-brown/60 hover:text-sugan-gold transition-colors text-sm font-body">
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-sugan-brown/60 hover:text-sugan-gold transition-colors text-sm font-body">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-body ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl text-sugan-brown mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group bg-white rounded-lg overflow-hidden hover:shadow-gold transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg text-sugan-brown">{p.name}</h3>
                    <p className="text-sugan-gold font-semibold">₹{p.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
