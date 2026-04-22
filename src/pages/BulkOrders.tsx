import { ArrowLeft, Building2, Users, Package, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function BulkOrders() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    orderType: '',
    quantity: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        type: 'bulk_order',
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        orderType: '',
        quantity: '',
        message: ''
      });
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to submit request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

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
          <h1 className="font-display text-3xl sm:text-4xl text-sugan-cream">
            Bulk/Trade Orders
          </h1>
          <p className="text-sugan-cream/70 font-body mt-2">
            Corporate gifting, hotel & restaurant supplies, resort & café furnishing, schools, interior projects, wholesale inquiries & more
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-sugan-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-sugan-gold" />
            </div>
            <h3 className="font-display text-lg text-sugan-brown mb-2">Corporate Gifting</h3>
            <p className="text-sugan-brown/60 font-body text-sm">
              Custom branded wooden products for employee gifts, client appreciation, and corporate events.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-sugan-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-7 h-7 text-sugan-gold" />
            </div>
            <h3 className="font-display text-lg text-sugan-brown mb-2">Hotel & Restaurant Supplies</h3>
            <p className="text-sugan-brown/60 font-body text-sm">
              Premium serveware, coasters, and décor for hospitality businesses at wholesale rates.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-sugan-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-sugan-gold" />
            </div>
            <h3 className="font-display text-lg text-sugan-brown mb-2">Wholesale Partnership</h3>
            <p className="text-sugan-brown/60 font-body text-sm">
              Become a reseller of Sugan products with exclusive wholesale pricing and marketing support.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-sugan-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-sugan-gold" />
            </div>
            <h3 className="font-display text-lg text-sugan-brown mb-2">Big Project Finishing</h3>
            <p className="text-sugan-brown/60 font-body text-sm">
              Custom orders for hotels, cafes, resorts, restaurants - complete interior woodwork solutions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Why Choose Us */}
          <div>
            <h2 className="font-display text-2xl text-sugan-brown mb-6">Why Choose Sugan for Bulk/Trade Orders?</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-sugan-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown">Volume Discounts</h3>
                  <p className="text-sugan-brown/60 font-body text-sm">Special pricing for orders above 50, 100, or 500+ units</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-sugan-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown">Custom Branding</h3>
                  <p className="text-sugan-brown/60 font-body text-sm">Logo engraving and custom packaging available</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-sugan-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown">Dedicated Support</h3>
                  <p className="text-sugan-brown/60 font-body text-sm">Personal account manager for all bulk inquiries</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-sugan-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown">Flexible Payment</h3>
                  <p className="text-sugan-brown/60 font-body text-sm">Credit terms available for verified businesses</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-sugan-brown text-sugan-cream rounded-2xl p-6">
              <h3 className="font-display text-xl mb-4">Prefer to Call or Email?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sugan-gold" />
                  <a href="tel:+916367677255" className="font-body hover:text-sugan-gold transition-colors">
                    +91 6367677255
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sugan-gold" />
                  <a href="mailto:sac280422@gmail.com" className="font-body hover:text-sugan-gold transition-colors">
                    sac280422@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-sugan-cream/60 font-body text-sm mt-4">
                We accept venture projects including resort/hotel/café furnishing, schools, offices, and interior woodwork. Our bulk order team is available Monday-Saturday, 10 AM - 7 PM IST
              </p>
            </div>
          </div>

          {/* Bulk Order Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="font-display text-2xl text-sugan-brown mb-6">Request a Quote</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-display text-lg text-green-800 mb-2">Request Submitted!</h3>
                <p className="text-green-700 font-body text-sm">
                  Thank you for your interest. Our bulk order team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 font-body text-sm">{error}</p>
                    <p className="text-red-600 font-body text-xs mt-2">
                      Please email us directly at{' '}
                      <a href="mailto:sac280422@gmail.com" className="underline">sac280422@gmail.com</a>
                      {' '}or call{' '}
                      <a href="tel:+916367677255" className="underline">+91 6367677252</a>
                    </p>
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block font-body text-sm text-sugan-brown mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block font-body text-sm text-sugan-brown mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold"
                    placeholder="Company name (if applicable)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block font-body text-sm text-sugan-brown mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-body text-sm text-sugan-brown mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="orderType" className="block font-body text-sm text-sugan-brown mb-2">
                      Order Type *
                    </label>
                    <select
                      id="orderType"
                      value={formData.orderType}
                      onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                      className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold bg-white"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="corporate_gifting">Corporate Gifting</option>
                      <option value="hotel_supplies">Hotel/Restaurant Supplies</option>
                      <option value="big_project_finishing">Big Project Finishing (Hotels/Cafes/Resorts)</option>
                      <option value="reseller">Reseller/Wholesale</option>
                      <option value="wedding_events">Wedding/Events</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block font-body text-sm text-sugan-brown mb-2">
                      Estimated Quantity *
                    </label>
                    <select
                      id="quantity"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold bg-white"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="20-50">20 - 50 units</option>
                      <option value="50-100">50 - 100 units</option>
                      <option value="100-500">100 - 500 units</option>
                      <option value="500+">500+ units</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-sm text-sugan-brown mb-2">
                    Message / Requirements
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold resize-none"
                    placeholder="Tell us about your requirements, preferred products, customization needs, timeline, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-sugan-brown text-sugan-cream rounded-lg font-body font-medium hover:bg-sugan-brown/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-sugan-cream/30 border-t-sugan-cream rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Quote
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
