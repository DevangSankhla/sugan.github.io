import { Shield, Leaf, Truck, Award } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Handmade in Jodhpur',
    description: 'Crafted by skilled artisans'
  },
  {
    icon: Leaf,
    title: 'Sustainable Wood',
    description: 'Eco-friendly sourcing'
  },
  {
    icon: Truck,
    title: 'Pan India Delivery',
    description: 'Free shipping above ₹1999'
  },
  {
    icon: Award,
    title: '25+ Years Heritage',
    description: 'Quality guaranteed'
  }
];

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export default function TrustBadges({ variant = 'horizontal', className = '' }: TrustBadgesProps) {
  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-start gap-3">
            <div className="w-10 h-10 bg-sugan-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <badge.icon className="w-5 h-5 text-sugan-gold" />
            </div>
            <div>
              <h4 className="font-body font-medium text-sugan-ink text-sm">{badge.title}</h4>
              <p className="text-xs text-sugan-ink/60 font-body">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge) => (
        <div key={badge.title} className="flex flex-col items-center text-center p-4 bg-sugan-bone rounded-xl">
          <div className="w-12 h-12 bg-sugan-gold/10 rounded-full flex items-center justify-center mb-3">
            <badge.icon className="w-6 h-6 text-sugan-gold" />
          </div>
          <h4 className="font-body font-medium text-sugan-ink text-sm">{badge.title}</h4>
          <p className="text-xs text-sugan-ink/60 font-body mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
