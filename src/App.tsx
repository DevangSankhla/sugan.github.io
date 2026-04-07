import { useEffect } from 'react';
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
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-sugan-cream">
        {/* Grain Overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <Hero />
          <Features />
          <Products />
          <About />
          <Testimonials />
          <CTA />
        </main>

        {/* Footer */}
        <Footer />

        {/* Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
