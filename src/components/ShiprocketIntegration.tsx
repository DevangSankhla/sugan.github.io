import { useState } from 'react';
import { Truck, Package, MapPin, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ShippingRate {
  courier: string;
  service: string;
  price: number;
  etd: string;
  rating: number;
}

interface TrackingEvent {
  date: string;
  time: string;
  status: string;
  location: string;
}

// Mock shipping rates - in production, this would call Shiprocket API
const mockShippingRates: ShippingRate[] = [
  { courier: 'Delhivery', service: 'Surface', price: 65, etd: '3-5 days', rating: 4.5 },
  { courier: 'DTDC', service: 'Express', price: 85, etd: '2-3 days', rating: 4.3 },
  { courier: 'Bluedart', service: 'Standard', price: 120, etd: '1-2 days', rating: 4.8 },
];

// Mock tracking data
const mockTracking: TrackingEvent[] = [
  { date: '2026-04-10', time: '14:30', status: 'Out for Delivery', location: 'Mumbai' },
  { date: '2026-04-10', time: '08:00', status: 'Arrived at Hub', location: 'Mumbai' },
  { date: '2026-04-09', time: '22:15', status: 'In Transit', location: 'Pune' },
  { date: '2026-04-09', time: '16:00', status: 'Picked Up', location: 'Jodhpur' },
];

interface ShiprocketRateCalculatorProps {
  pincode: string;
  weight?: number;
  onSelectRate?: (rate: ShippingRate) => void;
}

export function ShiprocketRateCalculator({ 
  pincode, 
  weight = 500, 
  onSelectRate 
}: ShiprocketRateCalculatorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [showRates, setShowRates] = useState(false);

  const calculateRates = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRates(mockShippingRates);
    setShowRates(true);
    setIsLoading(false);
  };

  const handleSelect = (rate: ShippingRate) => {
    setSelectedRate(rate);
    onSelectRate?.(rate);
  };

  if (!showRates) {
    return (
      <button
        onClick={calculateRates}
        disabled={isLoading || pincode.length !== 6}
        className="w-full py-2 px-4 bg-sugan-ink text-sugan-bone rounded-lg font-body hover:bg-sugan-ink/90 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Calculating...' : 'Calculate Shipping'}
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-body text-sugan-ink/60">
        Shipping to: {pincode} • Weight: {weight}g
      </p>
      {rates.map((rate) => (
        <div
          key={rate.courier}
          onClick={() => handleSelect(rate)}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedRate?.courier === rate.courier
              ? 'border-sugan-gold bg-sugan-gold/5'
              : 'border-sugan-ink/10 hover:border-sugan-ink/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sugan-gold" />
                <span className="font-body font-medium text-sugan-ink">{rate.courier}</span>
                <span className="text-xs text-sugan-ink/50">({rate.service})</span>
              </div>
              <p className="text-sm text-sugan-ink/60 font-body mt-1">
                Delivery: {rate.etd}
              </p>
            </div>
            <div className="text-right">
              <span className="font-display text-lg text-sugan-ink">₹{rate.price}</span>
              {selectedRate?.courier === rate.courier && (
                <CheckCircle className="w-5 h-5 text-sugan-gold mt-1 ml-auto" />
              )}
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => setShowRates(false)}
        className="text-sm text-sugan-gold font-body hover:underline"
      >
        Recalculate
      </button>
    </div>
  );
}

interface ShiprocketTrackingProps {
  trackingNumber: string;
}

export function ShiprocketTracking({ trackingNumber }: ShiprocketTrackingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-sugan-ink/10 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sugan-gold/10 rounded-full flex items-center justify-center">
            <Package className="w-5 h-5 text-sugan-gold" />
          </div>
          <div className="text-left">
            <p className="font-body font-medium text-sugan-ink">Track Order</p>
            <p className="text-sm text-sugan-ink/50 font-body">AWB: {trackingNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-body rounded-full">
            In Transit
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="relative pl-6 border-l-2 border-sugan-ink/10 space-y-6">
            {mockTracking.map((event, index) => (
              <div key={index} className="relative">
                <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 ${
                  index === 0 
                    ? 'bg-sugan-gold border-sugan-gold' 
                    : 'bg-white border-sugan-ink/30'
                }`} />
                <div>
                  <p className="font-body font-medium text-sugan-ink">{event.status}</p>
                  <div className="flex items-center gap-2 text-sm text-sugan-ink/60">
                    <MapPin className="w-3 h-3" />
                    <span className="font-body">{event.location}</span>
                    <span className="text-sugan-ink/30">•</span>
                    <Clock className="w-3 h-3" />
                    <span className="font-body">{event.date} at {event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// COD Availability Checker
interface CODCheckProps {
  pincode: string;
}

export function CODAvailability({ pincode }: CODCheckProps) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkCOD = async () => {
    setIsChecking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock: COD available for most pincodes
    setIsAvailable(pincode.startsWith('1') || pincode.startsWith('4') || pincode.startsWith('5'));
    setIsChecking(false);
  };

  if (isAvailable === null) {
    return (
      <button
        onClick={checkCOD}
        disabled={isChecking || pincode.length !== 6}
        className="text-sm text-sugan-gold font-body hover:underline disabled:opacity-50"
      >
        {isChecking ? 'Checking...' : 'Check COD availability'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isAvailable ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 font-body">COD Available</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600 font-body">COD Not Available</span>
        </>
      )}
    </div>
  );
}
