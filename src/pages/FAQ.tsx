import { ArrowLeft, HelpCircle, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqCategories: { [key: string]: FAQItem[] } = {
  'Orders & Shipping': [
    {
      question: 'How long will it take to receive my order?',
      answer: 'Orders are typically processed within 24-48 hours and delivered within 5-9 business days depending on your location. You will receive a tracking number via email once your order is shipped.'
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free shipping on all orders above ₹1999. For orders below ₹1999, a flat shipping fee of ₹99 applies.'
    },
    {
      question: 'Do you deliver to my location?',
      answer: 'We deliver to all 29 states and 8 union territories across India, covering over 19,000 pin codes. If you can receive mail at your address, we can deliver to you.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive an email and SMS with your tracking number. You can also track your order through your account page on our website.'
    }
  ],
  'Returns & Refunds': [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day hassle-free return policy. If you are not satisfied with your purchase, you can return the item within 7 days of delivery for a refund (minus ₹100 processing fee), provided it is in unused condition with original packaging. For damaged/defective items, an unboxing video is mandatory as proof.'
    },
    {
      question: 'How do I initiate a return?',
      answer: 'To initiate a return, contact us at contact@sugan.shop or call +91 6367677255 within 7 days of delivery. Our team will guide you through the process and arrange a pickup. Note: A ₹100 processing fee will be deducted from your refund amount.'
    },
    {
      question: 'When will I receive my refund?',
      answer: 'Once we receive and inspect the returned item (quality check takes 1-2 days), your refund will be processed within 7-10 business days. The amount will be credited to your original payment method minus the ₹100 processing fee.'
    },
    {
      question: 'Are there any items that cannot be returned?',
      answer: 'Customized or personalized orders cannot be returned unless there is a manufacturing defect. Items that have been used, washed, or damaged due to misuse are also not eligible for return. Damaged items without unboxing video proof cannot be returned.'
    },
    {
      question: 'Is there a fee for returning items?',
      answer: 'Yes, a return processing fee of ₹100 is deducted from your refund amount for all returns. This fee covers inspection, restocking, and handling costs.'
    },
    {
      question: 'What is an unboxing video and why is it required?',
      answer: 'An unboxing video is a recording showing the package condition before opening and the product immediately after opening. It is mandatory for damaged/defective item claims as proof. Without this video, we cannot process returns for damaged items.'
    }
  ],
  'Products & Care': [
    {
      question: 'Are your products made from solid wood?',
      answer: 'Yes! All our products are handcrafted from 100% solid wood including acacia, mango, teak, and sheesham. We never use MDF, particle board, or veneers.'
    },
    {
      question: 'How do I care for my wooden products?',
      answer: 'Clean with a soft, damp cloth and mild soap. Avoid soaking or using harsh chemicals. Apply food-grade mineral oil periodically to maintain the natural finish and prevent drying.'
    },
    {
      question: 'Are your finishes food-safe?',
      answer: 'Absolutely! All our products are finished with food-safe, non-toxic mineral oil and natural waxes. They are completely safe for serving food and daily use.'
    },
    {
      question: 'Will the wood color vary from the photos?',
      answer: 'As each piece is handcrafted from natural wood, there may be slight variations in grain patterns and color. This is the beauty of handcrafted products - no two pieces are exactly alike!'
    }
  ],
  'Payment & Security': [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, wallets (PayTM, PhonePe, etc.), and Cash on Delivery (COD). COD orders above ₹5000 may require advance payment.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, all payments are processed through secure, encrypted connections. We use PayU as our payment gateway, which is PCI-DSS compliant. We never store your card details.'
    },
    {
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 12 hours of placing them, provided they haven\'t been processed for shipping. Contact us immediately for assistance.'
    },
    {
      question: 'Do you offer Cash on Delivery?',
      answer: 'Yes, we offer COD for orders up to ₹10,000. A COD fee of ₹50 applies to all cash on delivery orders.'
    }
  ],
  'Bulk & Custom Orders': [
    {
      question: 'Do you accept bulk orders?',
      answer: 'Yes! We specialize in bulk orders for hotels, restaurants, corporate gifting, and events. Visit our Bulk Orders page to request a custom quote, or contact us directly at contact@sugan.shop or +91 6367677255.'
    },
    {
      question: 'Can I customize products?',
      answer: 'Yes, we offer customization for bulk orders including engraving, custom sizes, and specific wood types. Custom orders require additional time and minimum order quantities.'
    },
    {
      question: 'Do you offer corporate gifting?',
      answer: 'Absolutely! Our handcrafted wooden products make excellent corporate gifts. We can add custom engraving with your company logo. Contact us for corporate gifting packages.'
    }
  ]
};

export default function FAQ() {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
            <HelpCircle className="w-8 h-8 text-sugan-gold" />
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Quick Links */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.keys(faqCategories).map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="px-4 py-2 bg-white rounded-full font-body text-sm text-sugan-ink hover:bg-sugan-gold hover:text-white transition-colors shadow-sm"
            >
              {category}
            </a>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {Object.entries(faqCategories).map(([category, items]) => (
            <div 
              key={category}
              id={category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="font-display text-xl text-sugan-ink mb-6">{category}</h2>
              <div className="space-y-4">
                {items.map((item, index) => {
                  const key = `${category}-${index}`;
                  const isOpen = openItems[key];
                  return (
                    <div 
                      key={key}
                      className="border border-sugan-ink/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-sugan-bone/50 transition-colors"
                      >
                        <span className="font-body font-medium text-sugan-ink pr-4">{item.question}</span>
                        {isOpen ? (
                          <Minus className="w-5 h-5 text-sugan-gold flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-sugan-gold flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-sugan-ink/70 font-body leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="bg-sugan-ink text-sugan-bone rounded-2xl p-8 mt-8 text-center">
          <h2 className="font-display text-2xl mb-4">Still Have Questions?</h2>
          <p className="text-sugan-bone/80 font-body mb-6">
            Can't find the answer you're looking for? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@sugan.shop"
              className="inline-flex items-center justify-center px-6 py-3 bg-sugan-gold text-white rounded-lg font-body hover:bg-sugan-gold/90 transition-colors"
            >
              Email Us
            </a>
            <a 
              href="tel:+916367677255"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-sugan-bone/30 text-sugan-bone rounded-lg font-body hover:bg-sugan-bone/10 transition-colors"
            >
              Call +91 6367677255
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
