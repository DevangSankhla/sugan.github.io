import { useState, useEffect, useRef, useMemo } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { allProducts } from '@/data/rooms';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as typeof allProducts;
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Stagger mobile menu items in
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const items = mobileMenuRef.current.querySelectorAll('[data-menu-item]');
      gsap.fromTo(
        items,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
      );
    }
  }, [isMobileMenuOpen]);

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

  // On the home transparent state, the hero gradient sits on bone - solid ink reads
  // cleanly across the wood-tone hero photography without needing a panel.
  const transparentOverHero = isHomePage && !isScrolled;

  const desktopLinks = isHomePage ? (
    <>
      <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
      <Link to="/shop" className="nav-link">Shop</Link>
      <Link to="/bulk-orders" className="nav-link">Bulk/Trade</Link>
      <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
      <Link to="/contact" className="nav-link">Contact</Link>
    </>
  ) : (
    <>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/shop" className="nav-link">Shop</Link>
      <Link to="/bulk-orders" className="nav-link">Bulk/Trade</Link>
      <Link to="/#about" className="nav-link">About</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 text-sugan-ink transition-[background-color,backdrop-filter,padding] duration-400 ease-apple ${
          transparentOverHero
            ? 'bg-transparent py-6'
            : isScrolled
              ? 'bg-sugan-bone/80 backdrop-blur-xl border-b border-sugan-ink/[0.08] py-3'
              : 'bg-sugan-bone/80 backdrop-blur-xl border-b border-sugan-ink/[0.08] py-4'
        }`}
      >
        <div className="w-full section-padding">
          <div className="flex items-center justify-between">
            {/* Logo - Cormorant Garamond wordmark with a single gold dot */}
            <Link
              to="/"
              className="font-logo text-3xl md:text-4xl font-semibold leading-none inline-flex items-baseline text-sugan-ink"
            >
              Sugan
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-sugan-gold ml-1 align-middle translate-y-[-0.1em]"
                aria-hidden="true"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {desktopLinks}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 md:gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 transition-colors hover:text-sugan-gold"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-1.5 p-2 transition-colors hover:text-sugan-gold"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="font-body text-[13px] tabular-nums leading-none">
                    [{totalItems}]
                  </span>
                )}
              </button>
              <Link
                to={user ? '/account' : '/login'}
                className="p-2 transition-colors hover:text-sugan-gold"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - left-aligned full-bleed editorial list */}
      <div
        className={`fixed inset-0 z-40 bg-sugan-bone transition-transform duration-400 ease-apple md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          ref={mobileMenuRef}
          className="flex flex-col h-full pt-28 pb-12 section-padding"
        >
          {[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/shop' },
            { label: 'Bulk / Trade', to: '/bulk-orders' },
            { label: 'About', to: '/#about' },
            { label: 'Contact', to: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              data-menu-item
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-5 font-display text-display-lg font-light text-sugan-ink border-b border-sugan-ink/10 transition-colors hover:text-sugan-gold"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-sugan-ink/95 backdrop-blur-2xl flex items-start justify-center pt-24 px-4 sm:px-6">
          <div className="w-full max-w-2xl bg-sugan-bone rounded-none overflow-hidden shadow-lift">
            <form onSubmit={handleSearchSubmit} className="relative border-b border-sugan-ink/10">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-sugan-ink/40" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-6 bg-transparent font-display font-light text-display-md text-sugan-ink placeholder:text-sugan-ink/30 focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-sugan-ink/40 hover:text-sugan-ink transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            <div className="max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full px-5 py-4 flex items-center gap-4 hover:bg-sugan-bone-dark transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <p className="font-body text-[15px] text-sugan-ink">{product.name}</p>
                        <p className="text-[12px] text-sugan-ink-soft tabular-nums mt-0.5">
                          ₹{product.price.toLocaleString()}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-sugan-ink/40" />
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="py-10 text-center">
                  <p className="text-sugan-ink-soft font-body text-[13px] tracking-[0.04em]">
                    No products found
                  </p>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-sugan-ink/40 font-body text-[11px] uppercase tracking-[0.18em]">
                    Type to search
                  </p>
                </div>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="border-t border-sugan-ink/10 p-4">
                <Link
                  to="/shop"
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center justify-center gap-2 text-sugan-ink font-body text-[11px] uppercase tracking-[0.18em] hover:text-sugan-gold transition-colors"
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
