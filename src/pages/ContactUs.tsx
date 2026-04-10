import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, Instagram, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        type: 'general_contact',
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
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
            Contact Us
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-2xl text-sugan-brown mb-6">Get in Touch</h2>
            <p className="text-sugan-brown/70 font-body mb-8">
              We'd love to hear from you! Whether you have a question about our products, 
              need help with an order, or want to discuss a bulk purchase, our team is here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sugan-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-sugan-gold" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown mb-1">Phone</h3>
                  <a href="tel:+916367677255" className="text-sugan-brown/70 font-body hover:text-sugan-gold transition-colors">
                    +91 6367677255
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sugan-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-sugan-gold" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown mb-1">Email</h3>
                  <a href="mailto:sac280422@gmail.com" className="text-sugan-brown/70 font-body hover:text-sugan-gold transition-colors">
                    sac280422@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sugan-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-sugan-gold" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown mb-1">Address</h3>
                  <p className="text-sugan-brown/70 font-body">
                    III Phase, Boranada<br />
                    Jodhpur, Rajasthan<br />
                    India 342012
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sugan-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-sugan-gold" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown mb-1">Business Hours</h3>
                  <p className="text-sugan-brown/70 font-body">
                    Monday - Saturday: 10:00 AM - 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sugan-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-6 h-6 text-sugan-gold" />
                </div>
                <div>
                  <h3 className="font-body font-medium text-sugan-brown mb-1">Instagram</h3>
                  <a 
                    href="https://instagram.com/sugan.india" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sugan-brown/70 font-body hover:text-sugan-gold transition-colors"
                  >
                    @sugan.india
                  </a>
                </div>
              </div>
            </div>

            {/* Bulk Orders Card */}
            <div className="mt-8 bg-sugan-brown text-sugan-cream rounded-2xl p-6">
              <h3 className="font-display text-xl mb-2">Bulk Orders?</h3>
              <p className="text-sugan-cream/80 font-body text-sm mb-4">
                For hotel supplies, corporate gifting, or wholesale inquiries, 
                get special pricing and custom solutions:
              </p>
              <Link 
                to="/bulk-orders"
                className="inline-flex items-center gap-2 text-sugan-gold hover:underline font-body"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="font-display text-2xl text-sugan-brown mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-display text-lg text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 font-body text-sm">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-body text-sm text-sugan-brown mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-body text-sm text-sugan-brown mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-body text-sm text-sugan-brown mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold bg-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="return">Return/Refund</option>
                    <option value="product">Product Question</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-sm text-sugan-brown mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-sugan-brown/20 rounded-lg font-body text-sugan-brown focus:outline-none focus:border-sugan-gold resize-none"
                    placeholder="How can we help you?"
                    required
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
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
