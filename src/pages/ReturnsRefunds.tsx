import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReturnsRefunds() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sugan-cream">
      {/* Header */}
      <div className="bg-sugan-brown py-8">
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
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <p className="text-sugan-brown/60 font-body text-center py-12">
            Returns and refunds policy will be updated soon.
          </p>
        </div>
      </div>
    </div>
  );
}
