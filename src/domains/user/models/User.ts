import { Document, Types } from 'mongoose';
import { UserRole } from '../entities/types/userRole.js';
export interface IUser extends Document {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}
