import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from '@/context/CartContext';
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
import ProductDetail from '@/pages/ProductDetail';
import ShippingInfo from '@/pages/ShippingInfo';
import ReturnsRefunds from '@/pages/ReturnsRefunds';
import FAQ from '@/pages/FAQ';
import AmazonStore from '@/pages/AmazonStore';
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
            <Route path="/product/:id" element={<><ProductDetail /><Footer /></>} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/returns" element={<ReturnsRefunds />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/amazon-store" element={<AmazonStore />} />
          </Routes>

          {/* Cart Drawer */}
          <CartDrawer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
