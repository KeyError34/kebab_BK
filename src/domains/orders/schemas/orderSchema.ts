import { Schema, model } from 'mongoose';
import { IOrder } from '../models/Order.js';

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true , default:1},
      },
    ],
    totalPrice: { type: Number, required: true },
    deliveryAddress: {
      street: { type: String, required: true , default:''},
      city: { type: String, required: true, default:'' },
      postalCode: { type: String, required: true, default:'' },
      country: { type: String, required: true , default:''},
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card'],
      required: true,
    },
    orderNumber: { type: Number, required: true, unique: true },
 
  },
  { timestamps: true }
);

export default model<IOrder>('Order', orderSchema);