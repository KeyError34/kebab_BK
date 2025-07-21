import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  deliveryAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'online';
  orderNumber: number;
  createdAt: Date;
  updatedAt: Date;
}