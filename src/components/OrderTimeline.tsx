import { Check, Package, Truck, Home, Clock } from 'lucide-react';

interface OrderTimelineProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

const steps = [
  { key: 'pending', label: 'Ordered', icon: Package },
  { key: 'processing', label: 'Processing', icon: Clock },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

export default function OrderTimeline({ status, createdAt, shippedAt, deliveredAt }: OrderTimelineProps) {
  const currentStepIndex = steps.findIndex(step => step.key === status);

  const getStepDate = (stepKey: string) => {
    switch (stepKey) {
      case 'pending':
        return createdAt;
      case 'shipped':
        return shippedAt;
      case 'delivered':
        return deliveredAt;
      default:
        return undefined;
    }
  };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-sugan-brown/10 rounded-full" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-sugan-gold rounded-full transition-all duration-500"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />
        
        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const date = getStepDate(step.key);
          const Icon = step.icon;
          
          return (
            <div key={step.key} className="relative flex flex-col items-center z-10">
              {/* Icon Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-sugan-gold text-white shadow-md'
                    : 'bg-white text-sugan-brown/40 border-2 border-sugan-brown/10'
                } ${isCurrent ? 'ring-4 ring-sugan-gold/20 scale-110' : ''}`}
              >
                {isCompleted ? (
                  index < currentStepIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              
              {/* Label */}
              <div className="mt-2 text-center">
                <p className={`text-xs font-body font-medium ${isCompleted ? 'text-sugan-brown' : 'text-sugan-brown/40'}`}>
                  {step.label}
                </p>
                {date && (
                  <p className="text-[10px] text-sugan-brown/50 font-body">
                    {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
