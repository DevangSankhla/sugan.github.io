import { ArrowLeft, RefreshCw, CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReturnsRefunds() {
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
            <RefreshCw className="w-8 h-8 text-sugan-gold" />
            Returns & Refunds
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Policy Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-2xl text-sugan-brown mb-4">Our Return Policy</h2>
          <p className="text-sugan-brown/70 font-body leading-relaxed mb-6">
            At Sugan, we stand behind the quality of our handcrafted products. If you're not completely 
            satisfied with your purchase, we offer a hassle-free return policy within 7 days of delivery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sugan-cream p-4 rounded-xl text-center">
              <Clock className="w-8 h-8 text-sugan-gold mx-auto mb-2" />
              <p className="font-display text-2xl text-sugan-brown">7 Days</p>
              <p className="text-sm text-sugan-brown/60 font-body">Return Window</p>
            </div>
            <div className="bg-sugan-cream p-4 rounded-xl text-center">
              <Package className="w-8 h-8 text-sugan-gold mx-auto mb-2" />
              <p className="font-display text-2xl text-sugan-brown">Free</p>
              <p className="text-sm text-sugan-brown/60 font-body">Return Shipping</p>
            </div>
            <div className="bg-sugan-cream p-4 rounded-xl text-center">
              <CheckCircle className="w-8 h-8 text-sugan-gold mx-auto mb-2" />
              <p className="font-display text-2xl text-sugan-brown">100%</p>
              <p className="text-sm text-sugan-brown/60 font-body">Refund</p>
            </div>
          </div>
        </div>

        {/* Eligible Items */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Eligible for Return
          </h2>
          <ul className="space-y-3 font-body text-sugan-brown/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Items in original, unused condition with all tags attached</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Products with manufacturing defects or damage</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Wrong item delivered</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Items that don't match the description</span>
            </li>
          </ul>
        </div>

        {/* Non-Eligible Items */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-6 flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            Not Eligible for Return
          </h2>
          <ul className="space-y-3 font-body text-sugan-brown/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-brown/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Items used, washed, or altered after delivery</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-brown/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Products damaged due to misuse or negligence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-brown/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Customized or personalized orders</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-brown/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Returns requested after 7 days of delivery</span>
            </li>
          </ul>
        </div>

        {/* How to Return */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-6">How to Return</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">1</div>
              <div>
                <h3 className="font-body font-medium text-sugan-brown mb-1">Contact Us</h3>
                <p className="text-sugan-brown/60 font-body text-sm">Email us at sac280422@gmail.com or call +91 6367677255 within 7 days of delivery</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">2</div>
              <div>
                <h3 className="font-body font-medium text-sugan-brown mb-1">Pack the Item</h3>
                <p className="text-sugan-brown/60 font-body text-sm">Pack the item securely in its original packaging with all tags and accessories</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">3</div>
              <div>
                <h3 className="font-body font-medium text-sugan-brown mb-1">Pickup or Ship</h3>
                <p className="text-sugan-brown/60 font-body text-sm">We'll arrange a free pickup from your address or provide a return shipping label</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">4</div>
              <div>
                <h3 className="font-body font-medium text-sugan-brown mb-1">Refund Processed</h3>
                <p className="text-sugan-brown/60 font-body text-sm">Once received and inspected, refund will be processed within 5-7 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Timeline */}
        <div className="bg-sugan-brown text-sugan-cream rounded-2xl p-8">
          <h2 className="font-display text-xl mb-4">Refund Timeline</h2>
          <div className="space-y-4 font-body">
            <div className="flex justify-between items-center py-2 border-b border-sugan-cream/10">
              <span className="text-sugan-cream/80">Product Pickup</span>
              <span className="font-medium">2-3 business days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sugan-cream/10">
              <span className="text-sugan-cream/80">Quality Inspection</span>
              <span className="font-medium">1-2 business days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sugan-cream/10">
              <span className="text-sugan-cream/80">Refund Processing</span>
              <span className="font-medium">3-5 business days</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sugan-cream/80">Total Time</span>
              <span className="font-medium text-sugan-gold">7-10 business days</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-12">
          <p className="text-sugan-brown/60 font-body mb-4">Need help with a return?</p>
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
