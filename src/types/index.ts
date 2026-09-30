export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  shortDescription: string;
  specifications: Record<string, string>;
  stockStatus: StockStatus;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isSpecialOffer?: boolean;
  tags?: string[];
  warranty?: string;
  brand?: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  iconName: string;
  description: string;
  featuredProductImage?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  city: string;
  rating: number;
  comment: string;
  productMentioned?: string;
  date: string;
  verified: boolean;
}

export interface StoreInfo {
  name: string;
  address: string;
  landmark: string;
  cityStatePincode: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  businessHours: string;
  sundayHours: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  areaLocality: string;
  city: string;
  state: string;
  pincode: string;
  deliveryType: 'home_delivery' | 'store_pickup';
}

export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  streetAddress?: string;
  areaLocality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  createdAt: string;
}

export type OrderStatus = 'Confirmed' | 'Processing' | 'Packed' | 'Out for Delivery' | 'Delivered' | 'Ready for Pickup';

export interface OrderStatusEvent {
  status: OrderStatus;
  label: string;
  time: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  date: string;
  userEmail?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'UPI / QR' | 'Credit / Debit Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Pending' | 'Paid';
  orderStatus: OrderStatus;
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
  estimatedDelivery?: string;
  courierPartner?: string;
  timeline?: OrderStatusEvent[];
  upiTransactionId?: string;
  paymentDetails?: {
    upiApp?: string;
    cardLast4?: string;
    bankName?: string;
  };
}

