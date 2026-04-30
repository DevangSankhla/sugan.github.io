import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Briefcase, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type NavItem = {
  icon: typeof Home;
  label: string;
  badge?: number;
  path?: string;
  action?: () => void;
  activeWhen?: () => boolean;
};

export default function BottomNavigation() {
  const location = useLocation();
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hiddenPaths = ['/checkout', '/admin', '/login', '/signup', '/product/'];
  const shouldHide = hiddenPaths.some((path) => location.pathname.startsWith(path));
  if (shouldHide) return null;

  const navItems: NavItem[] = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop' },
    { path: '/bulk-orders', icon: Briefcase, label: 'Bulk' },
    {
      icon: ShoppingCart,
      label: 'Bag',
      badge: totalItems,
      action: () => setIsCartOpen(true),
      activeWhen: () => isCartOpen,
    },
    { path: '/account', icon: User, label: 'Account' },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-sugan-bone/95 backdrop-blur-2xl border-t border-sugan-ink/10 lg:hidden z-50 safe-area-inset transition-transform duration-400 ease-apple ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-stretch justify-around">
        {navItems.map((item, index) => {
          const isActive = item.path
            ? location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path))
            : item.activeWhen?.() ?? false;
          const Icon = item.icon;

          const inner = (
            <>
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
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-sugan-gold transition-all duration-400 ease-apple ${
                  isActive ? 'w-8 opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </>
          );

          const cls = `relative flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-colors duration-300 ${
            isActive ? 'text-sugan-ink' : 'text-sugan-ink-soft hover:text-sugan-ink'
          }`;

          if (item.action) {
            return (
              <button
                key={index}
                type="button"
                onClick={item.action}
                aria-label={item.label}
                className={cls}
              >
                {inner}
              </button>
            );
          }

          return (
            <Link key={index} to={item.path!} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
