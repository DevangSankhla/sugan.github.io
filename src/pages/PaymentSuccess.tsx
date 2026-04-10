import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Mail, Phone } from 'lucide-react';
import { handlePaymentSuccess, getOrderDetails } from '@/lib/payu';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Get PayU response from URL params
        const response = {
          status: searchParams.get('status') as 'success' | 'failure',
          txnid: searchParams.get('txnid') || '',
          amount: searchParams.get('amount') || '',
          productinfo: searchParams.get('productinfo') || '',
          firstname: searchParams.get('firstname') || '',
          email: searchParams.get('email') || '',
          hash: searchParams.get('hash') || '',
          udf1: searchParams.get('udf1') || '', // orderId
          udf2: searchParams.get('udf2') || '', // userId
        };

        if (response.status === 'success' && response.udf1) {
          await handlePaymentSuccess(response);
          const order = await getOrderDetails(response.udf1);
          setOrderDetails(order);
        } else {
          setError('Payment verification failed');
        }
      } catch (err) {
        setError('Something went wrong while processing your payment');
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-sugan-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sugan-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-sugan-brown">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-sugan-cream pt-24 pb-12">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="font-display text-2xl text-sugan-brown mb-2">Payment Issue</h1>
              <p className="text-sugan-brown/60 font-body mb-6">{error}</p>
              <Link to="/account">
                <Button className="bg-sugan-brown hover:bg-sugan-brown/90 font-body">
                  View Orders
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-cream pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Card className="border-none shadow-xl">
          <CardContent className="p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-sugan-brown mb-2">
              Payment Successful!
            </h1>
            <p className="text-sugan-brown/60 font-body mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {/* Order Details */}
            {orderDetails && (
              <div className="bg-sugan-cream rounded-xl p-6 mb-8 text-left">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-sugan-brown/50 font-body">Order ID</p>
                    <p className="font-body font-medium text-sugan-brown">#{orderDetails.id?.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-sugan-brown/50 font-body">Amount Paid</p>
                    <p className="font-body font-medium text-sugan-brown">₹{orderDetails.total?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-sugan-brown/50 font-body">Transaction ID</p>
                    <p className="font-body font-medium text-sugan-brown">{orderDetails.txnid || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-sugan-brown/50 font-body">Payment Method</p>
                    <p className="font-body font-medium text-sugan-brown">Online (PayU)</p>
                  </div>
                </div>
                <div className="border-t border-sugan-brown/10 pt-4">
                  <p className="text-sm text-sugan-brown/50 font-body">Estimated Delivery</p>
                  <p className="font-body font-medium text-sugan-brown">5-7 business days</p>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-sugan-cream rounded-lg text-left">
                <Mail className="w-5 h-5 text-sugan-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-medium text-sugan-brown">Order Confirmation</p>
                  <p className="text-sm text-sugan-brown/60 font-body">We've sent a confirmation email with order details.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-sugan-cream rounded-lg text-left">
                <Phone className="w-5 h-5 text-sugan-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-medium text-sugan-brown">Need Help?</p>
                  <p className="text-sm text-sugan-brown/60 font-body">Contact us on WhatsApp for any queries.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/account" className="flex-1">
                <Button className="w-full bg-sugan-brown hover:bg-sugan-brown/90 font-body h-12">
                  <Package className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
              </Link>
              <Link to="/shop" className="flex-1">
                <Button variant="outline" className="w-full font-body h-12 border-sugan-brown/20">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* WhatsApp Support */}
            <div className="mt-8 pt-8 border-t border-sugan-brown/10">
              <p className="text-sm text-sugan-brown/60 font-body mb-2">
                Have questions about your order?
              </p>
              <a
                href={`https://wa.me/916367677255?text=Hi, I have a question about my order #${orderDetails?.id?.slice(-8).toUpperCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sugan-gold font-body hover:underline"
              >
                <Phone className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
