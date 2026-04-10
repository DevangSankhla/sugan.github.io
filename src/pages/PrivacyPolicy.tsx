import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
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
            <Shield className="w-8 h-8 text-sugan-gold" />
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <p className="text-sugan-brown/70 font-body leading-relaxed mb-6">
            At Sugan, we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you visit 
            our website or make a purchase.
          </p>
          <p className="text-sm text-sugan-brown/50 font-body">
            Last updated: April 2025
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-sugan-gold" />
            Information We Collect
          </h2>
          <div className="space-y-4 font-body text-sugan-brown/70">
            <div>
              <h3 className="font-medium text-sugan-brown mb-2">Personal Information</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sugan-gold rounded-full mt-2"></span>
                  <span>Name, email address, and phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sugan-gold rounded-full mt-2"></span>
                  <span>Shipping and billing addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sugan-gold rounded-full mt-2"></span>
                  <span>Payment information (processed securely through PayU)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sugan-brown mb-2">Non-Personal Information</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sugan-gold rounded-full mt-2"></span>
                  <span>Browser type and version</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sugan-gold rounded-full mt-2"></span>
                  <span>Device information and IP address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-sugan-gold rounded-full mt-2"></span>
                  <span>Pages visited and time spent on our website</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-sugan-gold" />
            How We Use Your Information
          </h2>
          <ul className="space-y-3 font-body text-sugan-brown/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Process and fulfill your orders</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Communicate about your orders and provide customer support</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Send order confirmations and shipping updates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Improve our website and services</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Send promotional offers (with your consent)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Prevent fraud and ensure security</span>
            </li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-sugan-gold" />
            Data Security
          </h2>
          <p className="text-sugan-brown/70 font-body leading-relaxed mb-4">
            We implement appropriate technical and organizational security measures to protect 
            your personal information against unauthorized access, alteration, disclosure, or 
            destruction. These measures include:
          </p>
          <ul className="space-y-3 font-body text-sugan-brown/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>SSL encryption for all data transmission</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Secure payment processing through PCI-DSS compliant gateways</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Regular security audits and updates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Limited access to personal data within our organization</span>
            </li>
          </ul>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-4">Third-Party Services</h2>
          <p className="text-sugan-brown/70 font-body leading-relaxed mb-4">
            We may share your information with trusted third-party service providers who assist 
            us in operating our website and conducting our business:
          </p>
          <ul className="space-y-3 font-body text-sugan-brown/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Payment Processors:</strong> PayU for secure payment processing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Shipping Partners:</strong> Shiprocket and courier services for delivery</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Analytics:</strong> Tools to help us understand website usage</span>
            </li>
          </ul>
          <p className="text-sugan-brown/70 font-body mt-4">
            These providers have access to personal information only to perform specific tasks 
            on our behalf and are obligated to protect your information.
          </p>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-4">Your Rights</h2>
          <p className="text-sugan-brown/70 font-body leading-relaxed mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="space-y-3 font-body text-sugan-brown/70">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Access and receive a copy of your personal data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Correct inaccurate or incomplete information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Request deletion of your personal data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Opt-out of marketing communications</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-sugan-gold rounded-full mt-2 flex-shrink-0"></span>
              <span>Withdraw consent where processing is based on consent</span>
            </li>
          </ul>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="font-display text-xl text-sugan-brown mb-4">Cookies</h2>
          <p className="text-sugan-brown/70 font-body leading-relaxed">
            We use cookies to enhance your browsing experience, analyze website traffic, 
            and understand where our visitors are coming from. You can choose to disable 
            cookies through your browser settings, but this may affect the functionality 
            of our website.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-sugan-brown text-sugan-cream rounded-2xl p-8">
          <h2 className="font-display text-xl mb-4">Contact Us</h2>
          <p className="text-sugan-cream/80 font-body mb-4">
            If you have any questions about this Privacy Policy or how we handle your data, 
            please contact us:
          </p>
          <div className="space-y-2 font-body">
            <p><strong>Email:</strong> sac280422@gmail.com</p>
            <p><strong>Phone:</strong> +91 6367677255</p>
            <p><strong>Address:</strong> III Phase, Boranada, Jodhpur, Rajasthan 342012</p>
          </div>
        </div>
      </div>
    </div>
  );
}
