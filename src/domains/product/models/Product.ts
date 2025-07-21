import { Document, Types } from 'mongoose';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  image: String,
  category: string;
  isAvailable: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}