import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Briefcase, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function BottomNavigation() {
  const location = useLocation();
  const { items } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hiddenPaths = ['/checkout', '/admin', '/login', '/signup', '/product/'];
  const shouldHide = hiddenPaths.some((path) => location.pathname.startsWith(path));
  if (shouldHide) return null;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop' },
    { path: '/bulk-orders', icon: Briefcase, label: 'Bulk' },
    { path: '/cart', icon: ShoppingCart, label: 'Bag', badge: items.length },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-sugan-bone/95 backdrop-blur-2xl border-t border-sugan-ink/10 lg:hidden z-50 safe-area-inset transition-transform duration-400 ease-apple ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-stretch justify-around">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-colors duration-300 ${
                isActive ? 'text-sugan-ink' : 'text-sugan-ink-soft hover:text-sugan-ink'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                {item.badge ? (
                  <span className="absolute -top-1 -right-2 font-body text-[10px] tabular-nums leading-none text-sugan-ink">
                    [{item.badge > 9 ? '9+' : item.badge}]
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-body uppercase tracking-[0.18em]">
                {item.label}
              </span>
              {/* 1px gold underline on active */}
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-sugan-gold transition-all duration-400 ease-apple ${
                  isActive ? 'w-8 opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
