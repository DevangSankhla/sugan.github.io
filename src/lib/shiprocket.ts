// Shiprocket API Integration
// Documentation: https://apidocs.shiprocket.in/

import { db } from './firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Shiprocket API credentials - Add these to your .env file
const SHIPROCKET_EMAIL = import.meta.env.VITE_SHIPROCKET_EMAIL || '';
const SHIPROCKET_PASSWORD = import.meta.env.VITE_SHIPROCKET_PASSWORD || '';
const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external';

// Token storage
let authToken: string | null = null;
let tokenExpiry: number = 0;

interface ShiprocketAddress {
  address: string;
  address_2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  name: string;
}

interface ShiprocketProduct {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: number;
}

interface ShippingRate {
  courier_name: string;
  rate: number;
  cod: number;
  etd: string;
  rating: number;
}

// Get Shiprocket Auth Token
async function getAuthToken(): Promise<string | null> {
  // Return existing token if not expired
  if (authToken && Date.now() < tokenExpiry) {
    return authToken;
  }

  try {
    const response = await fetch(`${SHIPROCKET_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: SHIPROCKET_EMAIL,
        password: SHIPROCKET_PASSWORD,
      }),
    });

    if (!response.ok) throw new Error('Auth failed');

    const data = await response.json();
    authToken = data.token;
    // Token expires in 10 days, we'll refresh after 9 days
    tokenExpiry = Date.now() + (9 * 24 * 60 * 60 * 1000);
    
    return authToken;
  } catch (error) {
    console.error('Shiprocket auth error:', error);
    return null;
  }
}

// Calculate Shipping Rates
export async function calculateShippingRates(
  pickupPincode: string,
  deliveryPincode: string,
  weight: number = 500,
  cod: boolean = false
): Promise<ShippingRate[]> {
  // Mock rates for development - replace with actual API call when credentials are added
  if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
    return getMockRates(weight, cod);
  }

  try {
    const token = await getAuthToken();
    if (!token) return getMockRates(weight, cod);

    const response = await fetch(
      `${SHIPROCKET_API_URL}/courier/serviceability/?pickup_postcode=${pickupPincode}&delivery_postcode=${deliveryPincode}&weight=${weight}&cod=${cod ? 1 : 0}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch rates');

    const data = await response.json();
    return data.data?.available_courier_companies?.map((courier: any) => ({
      courier_name: courier.courier_name,
      rate: courier.rate,
      cod: courier.cod,
      etd: courier.etd,
      rating: courier.rating,
    })) || getMockRates(weight, cod);
  } catch (error) {
    console.error('Shipping calculation error:', error);
    return getMockRates(weight, cod);
  }
}

// Mock rates for development
function getMockRates(weight: number, cod: boolean): ShippingRate[] {
  const baseRate = Math.max(40, weight * 0.1);
  const codCharge = cod ? 50 : 0;
  
  return [
    {
      courier_name: 'Delhivery Surface',
      rate: Math.round(baseRate + codCharge),
      cod: codCharge,
      etd: '3-5 days',
      rating: 4.5,
    },
    {
      courier_name: 'DTDC Express',
      rate: Math.round(baseRate * 1.3 + codCharge),
      cod: codCharge,
      etd: '2-3 days',
      rating: 4.3,
    },
    {
      courier_name: 'Bluedart Standard',
      rate: Math.round(baseRate * 1.8 + codCharge),
      cod: codCharge,
      etd: '1-2 days',
      rating: 4.8,
    },
    {
      courier_name: 'Xpressbees',
      rate: Math.round(baseRate * 0.9 + codCharge),
      cod: codCharge,
      etd: '3-4 days',
      rating: 4.1,
    },
  ];
}

// Check pincode serviceability
export async function checkPincodeServiceability(
  pincode: string
): Promise<{ available: boolean; cod: boolean }> {
  if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
    // Mock: Assume all pincodes are serviceable
    return { available: true, cod: true };
  }

  try {
    const token = await getAuthToken();
    if (!token) return { available: true, cod: true };

    const response = await fetch(
      `${SHIPROCKET_API_URL}/courier/serviceability/?delivery_postcode=${pincode}&weight=500`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return { available: false, cod: false };

    const data = await response.json();
    const couriers = data.data?.available_courier_companies || [];
    
    return {
      available: couriers.length > 0,
      cod: couriers.some((c: any) => c.cod === 1),
    };
  } catch (error) {
    return { available: true, cod: true };
  }
}

// Create Shiprocket Order
export async function createShiprocketOrder(orderData: {
  orderId: string;
  items: ShiprocketProduct[];
  pickupLocation: ShiprocketAddress;
  shippingAddress: ShiprocketAddress;
  paymentMethod: 'COD' | 'Prepaid';
  totalAmount: number;
}): Promise<{ success: boolean; awb?: string; shipmentId?: string; label?: string }> {
  if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
    // Mock response
    return {
      success: true,
      awb: `AWB${Date.now()}`,
      shipmentId: `SHIP${Date.now()}`,
      label: '',
    };
  }

  try {
    const token = await getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const payload = {
      order_id: orderData.orderId,
      order_date: new Date().toISOString().split('T')[0],
      pickup_location: 'Jodhpur Warehouse', // Your registered pickup location
      channel_id: '',
      comment: 'Sugan Order',
      billing_customer_name: orderData.shippingAddress.name,
      billing_last_name: '',
      billing_address: orderData.shippingAddress.address,
      billing_address_2: orderData.shippingAddress.address_2 || '',
      billing_city: orderData.shippingAddress.city,
      billing_pincode: orderData.shippingAddress.pincode,
      billing_state: orderData.shippingAddress.state,
      billing_country: 'India',
      billing_email: '',
      billing_phone: orderData.shippingAddress.phone,
      shipping_is_billing: true,
      shipping_customer_name: orderData.shippingAddress.name,
      shipping_last_name: '',
      shipping_address: orderData.shippingAddress.address,
      shipping_address_2: orderData.shippingAddress.address_2 || '',
      shipping_city: orderData.shippingAddress.city,
      shipping_pincode: orderData.shippingAddress.pincode,
      shipping_state: orderData.shippingAddress.state,
      shipping_country: 'India',
      shipping_email: '',
      shipping_phone: orderData.shippingAddress.phone,
      order_items: orderData.items,
      payment_method: orderData.paymentMethod,
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: orderData.totalAmount,
      length: 10,
      breadth: 10,
      height: 5,
      weight: 0.5,
    };

    const response = await fetch(`${SHIPROCKET_API_URL}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Failed to create order');

    const data = await response.json();
    
    return {
      success: true,
      awb: data.awb_code,
      shipmentId: data.shipment_id?.toString(),
      label: data.label_url,
    };
  } catch (error) {
    console.error('Create order error:', error);
    return { success: false };
  }
}

// Track shipment
export async function trackShipment(awb: string): Promise<any[]> {
  if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
    // Mock tracking data
    return [
      { date: new Date().toISOString().split('T')[0], status: 'Picked Up', location: 'Jodhpur' },
    ];
  }

  try {
    const token = await getAuthToken();
    if (!token) return [];

    const response = await fetch(
      `${SHIPROCKET_API_URL}/courier/track/awb/${awb}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.tracking_data?.shipment_track || [];
  } catch (error) {
    return [];
  }
}

// Generate shipping label
export async function generateLabel(shipmentId: string): Promise<string | null> {
  if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) {
    return '';
  }

  try {
    const token = await getAuthToken();
    if (!token) return null;

    const response = await fetch(
      `${SHIPROCKET_API_URL}/courier/generate/label?shipment_id=${shipmentId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.label_url;
  } catch (error) {
    return null;
  }
}

// Update order with shipping details
export async function updateOrderShipping(
  orderId: string,
  shippingDetails: {
    courier: string;
    awb: string;
    shipmentId: string;
    label?: string;
    estimatedDelivery?: string;
  }
): Promise<void> {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    shippingDetails,
    status: 'shipped',
    shippedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
