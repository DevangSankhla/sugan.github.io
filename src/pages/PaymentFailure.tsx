import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { XCircle, RefreshCcw, Phone, ShoppingCart } from 'lucide-react';
import { handlePaymentFailure } from '@/lib/payu';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentFailure() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const processFailure = async () => {
      const response = {
        status: 'failure' as const,
        txnid: searchParams.get('txnid') || '',
        amount: searchParams.get('amount') || '',
        productinfo: searchParams.get('productinfo') || '',
        firstname: searchParams.get('firstname') || '',
        email: searchParams.get('email') || '',
        hash: searchParams.get('hash') || '',
        udf1: searchParams.get('udf1') || '',
        error: searchParams.get('error') || '',
        error_Message: searchParams.get('error_Message') || 'Payment failed',
      };

      if (response.udf1) {
        await handlePaymentFailure(response);
      }
    };

    processFailure();
  }, [searchParams]);

  const errorMessage = searchParams.get('error_Message') || searchParams.get('error') || 'Your payment could not be processed';

  return (
    <div className="min-h-screen bg-sugan-cream pt-24 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <Card className="border-none shadow-xl">
          <CardContent className="p-8 text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>

            <h1 className="font-display text-3xl text-sugan-brown mb-2">
              Payment Failed
            </h1>
            <p className="text-sugan-brown/60 font-body mb-6">
              {errorMessage}
            </p>

            {/* Possible Reasons */}
            <div className="bg-sugan-cream rounded-xl p-4 mb-6 text-left">
              <p className="font-body font-medium text-sugan-brown mb-2">Common reasons:</p>
              <ul className="text-sm text-sugan-brown/60 font-body space-y-1">
                <li>• Insufficient funds in account</li>
                <li>• Bank server temporarily unavailable</li>
                <li>• Transaction timed out</li>
                <li>• Card/UPI limit exceeded</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link to="/checkout">
                <Button className="w-full bg-sugan-brown hover:bg-sugan-brown/90 font-body h-12">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="outline" className="w-full font-body h-12 border-sugan-brown/20">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Back to Cart
                </Button>
              </Link>
            </div>

            {/* Support */}
            <div className="mt-8 pt-6 border-t border-sugan-brown/10">
              <p className="text-sm text-sugan-brown/60 font-body mb-3">
                Need help with payment?
              </p>
              <a
                href="https://wa.me/916367677255?text=Hi, I'm having trouble with payment. Can you help?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-body hover:bg-green-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Get Help on WhatsApp
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
