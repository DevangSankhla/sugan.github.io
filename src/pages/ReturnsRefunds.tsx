import { ArrowLeft, RefreshCw, CheckCircle, XCircle, Clock, Package, AlertTriangle, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReturnsRefunds() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sugan-bone pt-20">
      {/* Header */}
      <div className="bg-sugan-ink py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sugan-bone/80 hover:text-sugan-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="font-display text-3xl sm:text-4xl text-sugan-bone flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-sugan-gold" />
            Returns & Refunds
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Processing Fee Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-medium text-amber-800 mb-1">Return Processing Fee</h3>
              <p className="text-amber-700 font-body text-sm">
                A processing fee will be deducted from your refund amount for all returns:{' '}
                <strong>₹100 for orders under ₹2,999</strong>, and{' '}
                <strong>10% of the order total for orders ₹2,999 and above</strong>.
                This fee covers inspection, restocking, and handling costs.
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Refund Notice */}
        <div className="bg-sugan-bone border border-sugan-gold/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-sugan-gold flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-medium text-sugan-ink mb-1">Refunds Credited to Your Sugan Wallet</h3>
              <p className="text-sugan-ink/70 font-body text-sm">
                All refunds are credited to the <strong>Sugan wallet linked to the account that placed the order</strong>.
                Wallet balance can be applied to any future order at checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-2xl text-sugan-ink mb-4">Our Return Policy</h2>
          <p className="text-sugan-ink/70 font-body leading-relaxed mb-6">
            At Sugan, we stand behind the quality of our handcrafted products. If you're not completely 
            satisfied with your purchase, we offer a hassle-free return policy within 7 days of delivery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sugan-bone p-4 rounded-xl text-center">
              <Clock className="w-8 h-8 text-sugan-gold mx-auto mb-2" />
              <p className="font-display text-2xl text-sugan-ink">7 Days</p>
              <p className="text-sm text-sugan-ink/60 font-body">Return Window</p>
            </div>
            <div className="bg-sugan-bone p-4 rounded-xl text-center">
              <Package className="w-8 h-8 text-sugan-gold mx-auto mb-2" />
              <p className="font-display text-2xl text-sugan-ink">Free</p>
              <p className="text-sm text-sugan-ink/60 font-body">Return Shipping</p>
            </div>
            <div className="bg-sugan-bone p-4 rounded-xl text-center">
              <CheckCircle className="w-8 h-8 text-sugan-gold mx-auto mb-2" />
              <p className="font-display text-2xl text-sugan-ink">₹100 / 10%</p>
              <p className="text-sm text-sugan-ink/60 font-body">Processing Fee</p>
            </div>
          </div>
        </div>

        {/* Unboxing Video Requirement */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Video className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-body font-medium text-red-800 mb-2">Important: Unboxing Video Required for Damaged Items</h3>
              <p className="text-red-700 font-body text-sm mb-2">
                For any claims regarding <strong>damaged, defective, or incorrect items</strong>, you must provide 
                an <strong>unboxing video</strong> as proof. Without this video, we will not be able to process 
                your return or refund request.
              </p>
              <ul className="text-red-700 font-body text-sm list-disc ml-4 space-y-1">
                <li>Video must show the package condition before opening</li>
                <li>Video must clearly show the damaged/defective product</li>
                <li>Video should be taken immediately upon delivery</li>
                <li>Upload the video when submitting your return request</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Eligible Items */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-ink mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Eligible for Return
          </h2>
          <ul className="space-y-3 font-body text-sugan-ink/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Items in original, unused condition with all tags attached</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Products with manufacturing defects or damage (with unboxing video proof)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Wrong item delivered</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Items that don't match the description</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Returns requested within 7 days of delivery</span>
            </li>
          </ul>
        </div>

        {/* Non-Eligible Items */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-ink mb-6 flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            Not Eligible for Return
          </h2>
          <ul className="space-y-3 font-body text-sugan-ink/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-ink/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Items used, washed, or altered after delivery</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-ink/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Products damaged due to misuse or negligence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-ink/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Customized or personalized orders</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-ink/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Returns requested after 7 days of delivery</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-ink/30 rounded-full mt-2 flex-shrink-0"></span>
              <span>Damaged items without unboxing video proof</span>
            </li>
          </ul>
        </div>

        {/* How to Return */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-ink mb-6">How to Return</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">1</div>
              <div>
                <h3 className="font-body font-medium text-sugan-ink mb-1">Contact Us Within 7 Days</h3>
                <p className="text-sugan-ink/60 font-body text-sm">Email us at contact@sugan.shop or call +91 6367677255 within 7 days of delivery. Include your order number and reason for return.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">2</div>
              <div>
                <h3 className="font-body font-medium text-sugan-ink mb-1">Submit Required Proof (if applicable)</h3>
                <p className="text-sugan-ink/60 font-body text-sm">For damaged/defective items, upload your unboxing video clearly showing the issue.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">3</div>
              <div>
                <h3 className="font-body font-medium text-sugan-ink mb-1">Pack the Item</h3>
                <p className="text-sugan-ink/60 font-body text-sm">Pack the item securely in its original packaging with all tags and accessories</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">4</div>
              <div>
                <h3 className="font-body font-medium text-sugan-ink mb-1">Pickup or Ship</h3>
                <p className="text-sugan-ink/60 font-body text-sm">We'll arrange a free pickup from your address or provide a return shipping label</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">5</div>
              <div>
                <h3 className="font-body font-medium text-sugan-ink mb-1">Quality Inspection</h3>
                <p className="text-sugan-ink/60 font-body text-sm">Once received, we inspect the item for condition (2 business days)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-sugan-gold text-white rounded-full flex items-center justify-center font-display flex-shrink-0">6</div>
              <div>
                <h3 className="font-body font-medium text-sugan-ink mb-1">Refund Credited to Wallet</h3>
                <p className="text-sugan-ink/60 font-body text-sm">After successful inspection, your refund will be credited to your Sugan wallet within 7-10 business days, minus the processing fee (₹100 for orders under ₹2,999, or 10% of the order total for orders ₹2,999 and above)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Timeline */}
        <div className="bg-sugan-ink text-sugan-bone rounded-2xl p-8">
          <h2 className="font-display text-xl mb-4">Refund Timeline</h2>
          <div className="space-y-4 font-body">
            <div className="flex justify-between items-center py-2 border-b border-sugan-bone/10">
              <span className="text-sugan-bone/80">Return Request</span>
              <span className="font-medium">Within 7 days of delivery</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sugan-bone/10">
              <span className="text-sugan-bone/80">Product Pickup</span>
              <span className="font-medium">2-3 business days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sugan-bone/10">
              <span className="text-sugan-bone/80">Quality Inspection</span>
              <span className="font-medium">1-2 business days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sugan-bone/10">
              <span className="text-sugan-bone/80">Refund Credit (Sugan Wallet)</span>
              <span className="font-medium">7-10 business days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-sugan-bone/10">
              <span className="text-sugan-bone/80">Processing Fee</span>
              <span className="font-medium text-sugan-gold">₹100 / 10%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sugan-bone/80">Total Time</span>
              <span className="font-medium text-sugan-gold">10-15 business days</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-12">
          <p className="text-sugan-ink/60 font-body mb-4">Need help with a return?</p>
          <a 
            href="mailto:contact@sugan.shop"
            className="inline-flex items-center gap-2 text-sugan-gold hover:underline font-body"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}
