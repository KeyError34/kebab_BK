import { Schema, model } from 'mongoose';
import { IUser } from '../models/User.js';

const userSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['administrator', 'user'],
      default: 'user',
    },
    profile: {
      type: Schema.Types.ObjectId,
      refPath: 'profileModel',
      required: true,
    },
  },
  { timestamps: true }
);



const User = model<IUser>('User', userSchema);

export default User;