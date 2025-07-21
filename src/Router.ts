import express, { Request, Response } from 'express';

import userRouter from '../src/domains/user/routes/userRoutes.js';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response): void => {
  res.render('index', { title: 'Express' });
});


router.use('/', userRouter);

export default router;
