import { IUser } from '../../domains/user/models/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}