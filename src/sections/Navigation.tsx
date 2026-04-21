import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { allProducts } from '@/data/rooms';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.category || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop');
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'bg-sugan-cream/95 backdrop-blur-md py-4 shadow-sm border-b border-sugan-gold/15'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className={`font-display text-2xl md:text-3xl font-semibold text-sugan-brown transition-all duration-500 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
            >
              Sugan
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {isHomePage ? (
                <>
                  <button onClick={() => scrollToSection('home')} className="nav-link">
                    Home
                  </button>
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                  <button onClick={() => scrollToSection('about')} className="nav-link">
                    About
                  </button>
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                  <Link to="/#about" className="nav-link">
                    About
                  </Link>
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-sugan-brown hover:text-sugan-gold transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-sugan-brown hover:text-sugan-gold transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sugan-gold text-white text-xs rounded-full flex items-center justify-center font-medium animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link
                to={user ? "/account" : "/login"}
                className="p-2 text-sugan-brown hover:text-sugan-gold transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                className="md:hidden p-2 text-sugan-brown"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-sugan-cream transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            Shop
          </Link>
          <button
            onClick={() => scrollToSection('about')}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            About
          </button>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-sugan-brown/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl bg-sugan-cream rounded-lg shadow-2xl overflow-hidden">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative border-b border-sugan-brown/10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sugan-brown/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-transparent font-body text-sugan-brown placeholder:text-sugan-brown/40 focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sugan-brown/40 hover:text-sugan-brown"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full px-4 py-3 flex items-center gap-4 hover:bg-white transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <p className="font-body text-sm text-sugan-brown">{product.name}</p>
                        <p className="text-xs text-sugan-gold">₹{product.price.toLocaleString()}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-sugan-brown/40" />
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="py-8 text-center">
                  <p className="text-sugan-brown/60 font-body">No products found</p>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sugan-brown/40 font-body text-sm">Type to search products</p>
                </div>
              )}
            </div>

            {/* View All Button */}
            {searchResults.length > 0 && (
              <div className="border-t border-sugan-brown/10 p-4">
                <Link
                  to="/shop"
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center justify-center gap-2 text-sugan-gold font-body text-sm hover:underline"
                >
                  View all products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
