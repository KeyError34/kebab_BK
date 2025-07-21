import { Request, Response } from 'express';
import { UserService } from '../services/userServise.js';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    const { userName, email, password, fullName, profile } = req.body;
    try {
      const user = await this.userService.createUser(userName, email, password, fullName, profile);
      res.status(201).json(user);
    } catch (error: any) {
      console.error('Create error:', error.message);
      res.status(400).json({ error: error.message });
    }
  };

  findUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.findUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };

  updateUserDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const updated = await this.userService.updateUserDetails(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User updated', updated });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedUser = await this.userService.deleteUser(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
}