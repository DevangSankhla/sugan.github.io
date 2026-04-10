import { useEffect } from 'react';
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
import Shop from '@/pages/Shop';
import RoomShop from '@/pages/RoomShop';
import ProductDetail from '@/pages/ProductDetail';
import ShippingInfo from '@/pages/ShippingInfo';
import ReturnsRefunds from '@/pages/ReturnsRefunds';
import FAQ from '@/pages/FAQ';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import ContactUs from '@/pages/ContactUs';
import BulkOrders from '@/pages/BulkOrders';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Account from '@/pages/Account';
import Admin from '@/pages/Admin';
import Checkout from '@/pages/Checkout';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentFailure from '@/pages/PaymentFailure';
import MobileCartButton from '@/components/MobileCartButton';
import './App.css';

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
        <div className="relative min-h-screen bg-sugan-cream">
          {/* Grain Overlay */}
          <div className="grain-overlay" aria-hidden="true" />

          <ScrollToTop />
          
          {/* Navigation */}
          <Navigation />

          {/* Routes */}
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
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />
          </Routes>

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Mobile Cart Button */}
          <MobileCartButton />
        </div>
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
