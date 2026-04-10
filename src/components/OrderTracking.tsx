import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { trackShipment } from '@/lib/shiprocket';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderTrackingProps {
  awb?: string;
  courier?: string;
  orderStatus?: string;
}

interface TrackingEvent {
  date: string;
  status: string;
  location: string;
  time?: string;
}

export default function OrderTracking({ awb, courier, orderStatus }: OrderTrackingProps) {
  const [trackingData, setTrackingData] = useState<TrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTracking = async () => {
      if (!awb) return;
      
      setIsLoading(true);
      try {
        const data = await trackShipment(awb);
        setTrackingData(data);
      } catch (error) {
        console.error('Tracking error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracking();
  }, [awb]);

  // Generate mock tracking based on order status
  const getMockTracking = (): TrackingEvent[] => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    switch (orderStatus) {
      case 'delivered':
        return [
          { date: today.toISOString().split('T')[0], status: 'Delivered', location: 'Customer Address' },
          { date: today.toISOString().split('T')[0], status: 'Out for Delivery', location: 'Local Hub' },
          { date: yesterday.toISOString().split('T')[0], status: 'In Transit', location: 'Mumbai Hub' },
          { date: yesterday.toISOString().split('T')[0], status: 'Picked Up', location: 'Jodhpur' },
        ];
      case 'shipped':
        return [
          { date: today.toISOString().split('T')[0], status: 'In Transit', location: 'Mumbai Hub' },
          { date: yesterday.toISOString().split('T')[0], status: 'Picked Up', location: 'Jodhpur' },
        ];
      default:
        return [
          { date: today.toISOString().split('T')[0], status: 'Order Placed', location: 'Jodhpur' },
        ];
    }
  };

  const displayData = trackingData.length > 0 ? trackingData : getMockTracking();

  const getStatusIcon = (status: string, index: number) => {
    const isLatest = index === 0;
    const isDelivered = status.toLowerCase().includes('delivered');
    const isOutForDelivery = status.toLowerCase().includes('out for delivery');
    const isInTransit = status.toLowerCase().includes('transit');
    
    if (isDelivered) return <CheckCircle className={`w-6 h-6 ${isLatest ? 'text-green-500' : 'text-sugan-brown/30'}`} />;
    if (isOutForDelivery) return <Truck className={`w-6 h-6 ${isLatest ? 'text-sugan-gold' : 'text-sugan-brown/30'}`} />;
    if (isInTransit) return <Package className={`w-6 h-6 ${isLatest ? 'text-sugan-gold' : 'text-sugan-brown/30'}`} />;
    return <Clock className={`w-6 h-6 ${isLatest ? 'text-sugan-gold' : 'text-sugan-brown/30'}`} />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl text-sugan-brown flex items-center gap-2">
          <Truck className="w-5 h-5 text-sugan-gold" />
          Order Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-sugan-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* AWB Info */}
            {awb && (
              <div className="bg-sugan-cream rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-sugan-brown/50 font-body">AWB Number</p>
                    <p className="font-body font-medium text-sugan-brown">{awb}</p>
                  </div>
                  <div>
                    <p className="text-xs text-sugan-brown/50 font-body">Courier</p>
                    <p className="font-body font-medium text-sugan-brown">{courier || 'Delhivery'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tracking Timeline */}
            <div className="relative pl-6">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-sugan-brown/10" />
              
              {displayData.map((event, index) => (
                <div key={index} className="relative mb-6 last:mb-0">
                  <div className="absolute -left-[25px] bg-sugan-cream p-1">
                    {getStatusIcon(event.status, index)}
                  </div>
                  <div>
                    <p className="font-body font-medium text-sugan-brown">{event.status}</p>
                    <div className="flex items-center gap-2 text-sm text-sugan-brown/60">
                      <MapPin className="w-3 h-3" />
                      <span className="font-body">{event.location}</span>
                      {event.time && (
                        <>
                          <span className="text-sugan-brown/30">•</span>
                          <Clock className="w-3 h-3" />
                          <span className="font-body">{event.time}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-sugan-brown/40 font-body mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Support */}
            <div className="mt-6 pt-6 border-t border-sugan-brown/10">
              <p className="text-sm text-sugan-brown/60 font-body mb-3">
                Need help with your delivery?
              </p>
              <a
                href={`https://wa.me/916367677255?text=Hi, I need help with tracking my order (AWB: ${awb || 'N/A'})`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sugan-gold font-body hover:underline"
              >
                <Phone className="w-4 h-4" />
                Contact Support
              </a>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
