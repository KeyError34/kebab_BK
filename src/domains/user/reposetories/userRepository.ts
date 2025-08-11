import User from '../schemas/userSchema.js';
import { IUser } from '../models/User.js';
import { Types } from 'mongoose';

export class UserRepository {
   async checkFieldUniqueness(field: keyof IUser, value: string, excludeId?: string): Promise<boolean> {
    const query: any = { [field]: value };

    if (excludeId && Types.ObjectId.isValid(excludeId)) {
      query._id = { $ne: new Types.ObjectId(excludeId) };
    }

    const user = await User.findOne(query).lean();
    return !!user;
  }

  async findUserByID(id: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return await User.findById(id).select('_id userName email role fullName createdAt updatedAt');
  }

  async findByLogin(login: string): Promise<IUser | null> {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    const query = isEmail ? { email: login } : { userName: login };
    return await User.findOne(query).lean();
  }

  async insert(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    return await newUser.save();
  }

  async delete(_id: string): Promise<void> {
    await User.findByIdAndDelete(_id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return await User.find()
      .select('_id userName email role fullName createdAt updatedAt')
      .lean();
  }
}