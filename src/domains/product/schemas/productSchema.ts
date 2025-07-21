import { Schema, model } from 'mongoose';
import { IProduct } from '../models/Product.js';

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    category: { type: String, enum: ['main', 'drink', 'dessert'], required: true },
    isAvailable: { type: Boolean, default: true },
  },
{ timestamps: true }
);

const Product = model<IProduct>('Product', productSchema);
export default Product