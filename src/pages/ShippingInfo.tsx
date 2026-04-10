import { ArrowLeft, Truck, MapPin, Clock, Package, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ShippingInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sugan-cream pt-20">
      {/* Header */}
      <div className="bg-sugan-brown py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sugan-cream/80 hover:text-sugan-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="font-display text-3xl sm:text-4xl text-sugan-cream flex items-center gap-3">
            <Truck className="w-8 h-8 text-sugan-gold" />
            Shipping Information
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Free Shipping Banner */}
        <div className="bg-gradient-to-r from-sugan-gold/20 to-sugan-gold/5 rounded-2xl p-8 mb-8 border border-sugan-gold/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-sugan-gold rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-sugan-brown mb-1">Free Shipping Over ₹1999</h2>
              <p className="text-sugan-brown/70 font-body">
                Enjoy free delivery on all orders above ₹1999. For orders below ₹1999, 
                a flat shipping fee of ₹99 applies.
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-2xl text-sugan-brown mb-6">Delivery Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-sugan-cream rounded-xl">
              <Clock className="w-10 h-10 text-sugan-gold mx-auto mb-3" />
              <h3 className="font-display text-lg text-sugan-brown mb-2">Order Processing</h3>
              <p className="text-3xl font-display text-sugan-gold mb-1">24-48h</p>
              <p className="text-sm text-sugan-brown/60 font-body">Order confirmation to dispatch</p>
            </div>
            <div className="text-center p-6 bg-sugan-cream rounded-xl">
              <Truck className="w-10 h-10 text-sugan-gold mx-auto mb-3" />
              <h3 className="font-display text-lg text-sugan-brown mb-2">Transit Time</h3>
              <p className="text-3xl font-display text-sugan-gold mb-1">3-7 days</p>
              <p className="text-sm text-sugan-brown/60 font-body">Depending on your location</p>
            </div>
            <div className="text-center p-6 bg-sugan-cream rounded-xl">
              <Package className="w-10 h-10 text-sugan-gold mx-auto mb-3" />
              <h3 className="font-display text-lg text-sugan-brown mb-2">Total Delivery</h3>
              <p className="text-3xl font-display text-sugan-gold mb-1">5-9 days</p>
              <p className="text-sm text-sugan-brown/60 font-body">From order to doorstep</p>
            </div>
          </div>
        </div>

        {/* Shipping Rates */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-6">Shipping Rates</h2>
          <div className="overflow-hidden rounded-xl border border-sugan-brown/10">
            <table className="w-full">
              <thead className="bg-sugan-cream">
                <tr>
                  <th className="text-left py-4 px-6 font-body font-medium text-sugan-brown">Order Value</th>
                  <th className="text-left py-4 px-6 font-body font-medium text-sugan-brown">Shipping Cost</th>
                  <th className="text-left py-4 px-6 font-body font-medium text-sugan-brown">Delivery Time</th>
                </tr>
              </thead>
              <tbody className="font-body text-sugan-brown/70">
                <tr className="border-t border-sugan-brown/10">
                  <td className="py-4 px-6">Below ₹999</td>
                  <td className="py-4 px-6">₹99</td>
                  <td className="py-4 px-6">5-9 business days</td>
                </tr>
                <tr className="border-t border-sugan-brown/10 bg-sugan-cream/30">
                  <td className="py-4 px-6">₹999 - ₹1999</td>
                  <td className="py-4 px-6">₹99</td>
                  <td className="py-4 px-6">5-9 business days</td>
                </tr>
                <tr className="border-t border-sugan-brown/10">
                  <td className="py-4 px-6 font-medium text-sugan-brown">Above ₹1999</td>
                  <td className="py-4 px-6 text-sugan-gold font-medium">FREE</td>
                  <td className="py-4 px-6">5-9 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Delivery Locations */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-sugan-gold" />
            Delivery Coverage
          </h2>
          <p className="text-sugan-brown/70 font-body mb-4">
            We deliver to all pin codes across India. Whether you're in a metro city 
            or a remote town, we'll get your handcrafted products to you.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-sugan-cream p-4 rounded-lg text-center">
              <p className="font-display text-2xl text-sugan-brown">29</p>
              <p className="text-xs text-sugan-brown/60 font-body">States</p>
            </div>
            <div className="bg-sugan-cream p-4 rounded-lg text-center">
              <p className="font-display text-2xl text-sugan-brown">8</p>
              <p className="text-xs text-sugan-brown/60 font-body">Union Territories</p>
            </div>
            <div className="bg-sugan-cream p-4 rounded-lg text-center">
              <p className="font-display text-2xl text-sugan-brown">19,000+</p>
              <p className="text-xs text-sugan-brown/60 font-body">Pin Codes</p>
            </div>
            <div className="bg-sugan-cream p-4 rounded-lg text-center">
              <p className="font-display text-2xl text-sugan-brown">100%</p>
              <p className="text-xs text-sugan-brown/60 font-body">India Coverage</p>
            </div>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-4">Order Tracking</h2>
          <p className="text-sugan-brown/70 font-body mb-6">
            Once your order is shipped, you'll receive an email and SMS with your 
            tracking number. You can track your order in real-time through our 
            logistics partner's website or contact us for assistance.
          </p>
          <div className="bg-sugan-cream p-6 rounded-xl">
            <h3 className="font-body font-medium text-sugan-brown mb-2">Track Your Order</h3>
            <p className="text-sm text-sugan-brown/60 font-body mb-4">
              Enter your order ID in your account page or contact us directly
            </p>
            <div className="flex gap-4">
              <a 
                href="/account" 
                className="inline-flex items-center px-6 py-2 bg-sugan-brown text-sugan-cream rounded-lg font-body text-sm hover:bg-sugan-brown/90 transition-colors"
              >
                Go to My Account
              </a>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-sugan-brown text-sugan-cream rounded-2xl p-8">
          <h2 className="font-display text-xl mb-4">Important Notes</h2>
          <ul className="space-y-3 font-body text-sugan-cream/80">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Orders are processed within 24-48 hours (excluding weekends and holidays)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Delivery times may vary during festivals and peak seasons</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Cash on Delivery (COD) orders may require additional verification</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>For bulk orders or special shipping requirements, please contact us</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center mt-12">
          <p className="text-sugan-brown/60 font-body mb-4">Questions about shipping?</p>
          <a 
            href="mailto:sac280422@gmail.com" 
            className="inline-flex items-center gap-2 text-sugan-gold hover:underline font-body"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}
