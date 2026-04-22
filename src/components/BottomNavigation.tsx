import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function BottomNavigation() {
  const location = useLocation();
  const { items } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  // Show only on mobile and when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide on certain pages
  const hiddenPaths = ['/checkout', '/admin', '/login', '/signup'];
  const shouldHide = hiddenPaths.some(path => location.pathname.startsWith(path));

  if (shouldHide) return null;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop' },
    { path: '/bulk-orders', icon: ShoppingBag, label: 'Bulk/Trade' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: items.length },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-sugan-brown/10 lg:hidden z-50 safe-area-inset transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                isActive 
                  ? 'text-sugan-gold' 
                  : 'text-sugan-brown/60 hover:text-sugan-brown'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge ? (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-sugan-gold text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-body mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
