import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-sugan-cream/90 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className={`font-display text-2xl md:text-3xl font-semibold text-sugan-brown transition-all duration-500 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Sugan
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <button
                onClick={() => scrollToSection('home')}
                className="nav-link"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="nav-link"
              >
                Shop
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="nav-link"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="nav-link"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link"
              >
                Contact
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
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
              <button
                className="md:hidden p-2 text-sugan-brown"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
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
          <button
            onClick={() => scrollToSection('home')}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('products')}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="font-display text-3xl text-sugan-brown hover:text-sugan-gold transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
}
