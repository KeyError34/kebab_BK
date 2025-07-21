import express, { Request, Response } from 'express';

import userRouter from '../src/domains/user/routes/userRoutes.js';
import loginRouter from './domains/auth/routes/authRouter.js';
import passwordRouter from './domains/auth/routes/passwordRoutes.js';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response): void => {
  res.render('index', { title: 'Express' });
});


router.use('/', userRouter);
router.use('/v2', loginRouter);
router.use('/v2', passwordRouter);
export default router;
