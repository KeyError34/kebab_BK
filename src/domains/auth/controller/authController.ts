import { Request, Response } from 'express';
import { generateToken } from '../../../core/utils/jwt.js';
export const loginController = (req: Request, res: Response) => {
  const user = req.user as any;

  const token = generateToken({
    id: user._id,
    name: user.userName,
    role: user.role,
  });

  res.json({ token });
};
