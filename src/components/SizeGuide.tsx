import { Ruler, Info } from 'lucide-react';
import type { ProductDimensions } from '@/types';

interface SizeGuideProps {
  dimensions?: ProductDimensions;
}

const sizeReferences = [
  { size: 'Small', reference: 'Perfect for cats, small dogs, or compact spaces', dimensions: 'Up to 10"' },
  { size: 'Medium', reference: 'Ideal for medium breeds and standard use', dimensions: '10" - 14"' },
  { size: 'Large', reference: 'Best for large breeds and spacious areas', dimensions: '14"+' },
];

export default function SizeGuide({ dimensions }: SizeGuideProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-sugan-brown/10">
      <div className="flex items-center gap-2 mb-4">
        <Ruler className="w-5 h-5 text-sugan-gold" />
        <h3 className="font-display text-lg text-sugan-brown">Size Guide</h3>
      </div>

      {/* Product Dimensions */}
      {dimensions && (
        <div className="mb-6 p-4 bg-sugan-cream rounded-lg">
          <p className="text-sm font-body text-sugan-brown/60 mb-2">Product Dimensions:</p>
          <div className="grid grid-cols-3 gap-4">
            {dimensions.length && (
              <div>
                <span className="text-xs text-sugan-brown/50 block">Length</span>
                <span className="font-body font-medium text-sugan-brown">{dimensions.length}&quot;</span>
              </div>
            )}
            {dimensions.width && (
              <div>
                <span className="text-xs text-sugan-brown/50 block">Width</span>
                <span className="font-body font-medium text-sugan-brown">{dimensions.width}&quot;</span>
              </div>
            )}
            {dimensions.height && (
              <div>
                <span className="text-xs text-sugan-brown/50 block">Height</span>
                <span className="font-body font-medium text-sugan-brown">{dimensions.height}&quot;</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Size Reference Table */}
      <div className="space-y-3">
        <p className="text-sm font-body text-sugan-brown/60">Size Reference:</p>
        {sizeReferences.map((ref) => (
          <div
            key={ref.size}
            className="flex items-center justify-between p-3 bg-sugan-cream/50 rounded-lg"
          >
            <div>
              <span className="font-body font-medium text-sugan-brown">{ref.size}</span>
              <p className="text-xs text-sugan-brown/50">{ref.reference}</p>
            </div>
            <span className="text-sm font-body text-sugan-brown/70">{ref.dimensions}</span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 mt-4 pt-4 border-t border-sugan-brown/10">
        <Info className="w-4 h-4 text-sugan-gold flex-shrink-0 mt-0.5" />
        <p className="text-xs text-sugan-brown/60 font-body">
          Not sure about the size? Contact us on WhatsApp and we&apos;ll help you choose the perfect fit for your space.
        </p>
      </div>
    </div>
  );
}
