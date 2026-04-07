import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sugan-brown text-sugan-cream">
      {/* Main Footer */}
      <div className="section-padding py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <a
                href="#"
                className="font-display text-3xl font-semibold text-sugan-cream mb-4 block"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Sugan
              </a>
              <p className="text-sugan-cream/60 font-body text-sm leading-relaxed mb-6">
                Handcrafted solid wood furniture from Jodhpur, India. Bringing
                25+ years of heritage craftsmanship to modern homes.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/sugan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-sugan-cream/10 flex items-center justify-center hover:bg-sugan-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/sugan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-sugan-cream/10 flex items-center justify-center hover:bg-sugan-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/sugan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-sugan-cream/10 flex items-center justify-center hover:bg-sugan-gold transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-medium text-sugan-cream mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() =>
                      document
                        .getElementById('home')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      document
                        .getElementById('products')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      document
                        .getElementById('about')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      document
                        .getElementById('testimonials')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-display text-lg font-medium text-sugan-cream mb-6">
                Customer Service
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.amazon.in/gp/help/customer/display.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.amazon.in/gp/help/customer/display.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    Returns & Refunds
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.amazon.in/gp/help/customer/display.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.amazon.in/s?me=SUGAN_SELLER_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors hover:translate-x-1 inline-block"
                  >
                    Amazon Store
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-medium text-sugan-cream mb-6">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sugan-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sugan-cream/60 font-body text-sm">
                    Sardarpura, Jodhpur
                    <br />
                    Rajasthan, India 342001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sugan-gold flex-shrink-0" />
                  <a
                    href="tel:+919876543210"
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sugan-gold flex-shrink-0" />
                  <a
                    href="mailto:hello@sugan.in"
                    className="text-sugan-cream/60 font-body text-sm hover:text-sugan-gold transition-colors"
                  >
                    hello@sugan.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sugan-cream/10">
        <div className="section-padding py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sugan-cream/40 font-body text-xs text-center sm:text-left">
              © {currentYear} Sugan. All rights reserved. Crafted with love in
              Jodhpur.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.amazon.in/s?me=SUGAN_SELLER_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sugan-cream/40 font-body text-xs hover:text-sugan-gold transition-colors"
              >
                Shop on Amazon
              </a>
              <span className="text-sugan-cream/20">|</span>
              <button
                onClick={() =>
                  document
                    .getElementById('home')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="text-sugan-cream/40 font-body text-xs hover:text-sugan-gold transition-colors"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
