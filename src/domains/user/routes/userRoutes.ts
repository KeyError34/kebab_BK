import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticateJWT } from '../../../core/middlewares/authMiddleware.js';
import { checkAdminRole, checkSelfOrAdmin } from '../../../core/middlewares/checkAdminRole.js';

const router = Router();
const userController = new UserController();

router.get('/v1/getall', authenticateJWT,checkAdminRole, userController.getAllUsers);
router.post('/v2/create', userController.createUser);
router.put('/v2/update/:id', authenticateJWT, checkSelfOrAdmin, userController.updateUserDetails);
router.get('/v2/:id', authenticateJWT,checkAdminRole, userController.findUserById);
router.delete('/v2/:id', authenticateJWT, userController.deleteUser);

export default router;
