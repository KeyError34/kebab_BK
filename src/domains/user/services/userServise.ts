import { hashPassword } from "../../../core/utils/hash.js";
import { UserRepository } from "../reposetories/userRepository.js";
import { IUser } from '../models/User.js';
import mongoose from 'mongoose';

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async createUser(userName: string, email: string, password: string, fullName: string, profile: mongoose.Types.ObjectId) {
    if (await this.userRepo.checkFieldUniqueness('userName', userName, '')) {
      throw new Error('Username already taken');
    }
    if (await this.userRepo.checkFieldUniqueness('email', email, '')) {
      throw new Error('Email already registered');
    }
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const passwordHash = await hashPassword(password);

    const userData: Partial<IUser> = {
      userName,
      email,
      fullName,
      passwordHash,
      role: 'user',
      profile,
    };

    const createdUser = await this.userRepo.insert(userData as IUser);

    const { _id, userName: uName, fullName: fName, role, createdAt, updatedAt } = createdUser;
    return { _id, userName: uName, fullName: fName, role, createdAt, updatedAt };
  }

  async findUserById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const user = await this.userRepo.findUserByID(id);
    return user || null;
  }

  async findUserByLogin(login: string) {
    return await this.userRepo.findByLogin(login);
  }

  async updateUserDetails(
    id: string,
    updateData: { userName?: string; email?: string; fullName?: string; password?: string },
  ) {
    const user = await this.userRepo.findUserByID(id);
    if (!user) return null;

    const { userName, email, fullName, password } = updateData;

    if (userName && (await this.userRepo.checkFieldUniqueness('userName', userName, id))) {
      throw new Error(`User with name ${userName} already exists`);
    }

    if (email && (await this.userRepo.checkFieldUniqueness('email', email, id))) {
      throw new Error(`User with email ${email} already exists`);
    }

    if (fullName && (await this.userRepo.checkFieldUniqueness('fullName', fullName, id))) {
      throw new Error(`User with fullName ${fullName} already exists`);
    }

    if (password && password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (password) user.passwordHash = await hashPassword(password);

    user.updatedAt = new Date();

    await this.userRepo.insert(user); // Mongoose save() переиспользуется
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepo.findUserByID(id);
    if (!user) return null;

    await this.userRepo.delete(user._id.toString());
    return user;
  }

  async getAllUsers() {
    return await this.userRepo.getAllUsers();
  }
}