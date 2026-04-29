import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Products from '@/sections/Products';
import About from '@/sections/About';
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';
import CartDrawer from '@/sections/CartDrawer';
import MobileCartButton from '@/components/MobileCartButton';
import BottomNavigation from '@/components/BottomNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import './App.css';

// Lazy-load all pages so each route only loads its JS when visited
const Shop = lazy(() => import('@/pages/Shop'));
const RoomShop = lazy(() => import('@/pages/RoomShop'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const ShippingInfo = lazy(() => import('@/pages/ShippingInfo'));
const ReturnsRefunds = lazy(() => import('@/pages/ReturnsRefunds'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const ContactUs = lazy(() => import('@/pages/ContactUs'));
const BulkOrders = lazy(() => import('@/pages/BulkOrders'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const Account = lazy(() => import('@/pages/Account'));
const Admin = lazy(() => import('@/pages/Admin'));
const AdminOrders = lazy(() => import('@/pages/AdminOrders'));
const AffiliateDashboard = lazy(() => import('@/pages/AffiliateDashboard'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const PaymentSuccess = lazy(() => import('@/pages/PaymentSuccess'));
const PaymentFailure = lazy(() => import('@/pages/PaymentFailure'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sugan-bone">
      <div className="w-8 h-8 border-2 border-sugan-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Home page component
function HomePage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <main>
        <Hero />
        <Features />
        <Products />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-sugan-bone">
          {/* Grain Overlay */}
          <div className="grain-overlay" aria-hidden="true" />

          <ScrollToTop />
          
          {/* Navigation */}
          <Navigation />

          {/* Routes */}
          <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<><Shop /><Footer /></>} />
            <Route path="/shop/:roomId" element={<><RoomShop /><Footer /></>} />
            <Route path="/product/:id" element={<><ProductDetail /><Footer /></>} />
            <Route path="/shipping" element={<><ShippingInfo /><Footer /></>} />
            <Route path="/returns" element={<><ReturnsRefunds /><Footer /></>} />
            <Route path="/faq" element={<><FAQ /><Footer /></>} />
            <Route path="/privacy" element={<><PrivacyPolicy /><Footer /></>} />
            <Route path="/contact" element={<><ContactUs /><Footer /></>} />
            <Route path="/bulk-orders" element={<><BulkOrders /><Footer /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/affiliate" element={<AffiliateDashboard />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />
          </Routes>
          </Suspense>
          </ErrorBoundary>

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Mobile Cart Button */}
          <MobileCartButton />

          {/* Bottom Navigation (Mobile) */}
          <BottomNavigation />
        </div>
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
