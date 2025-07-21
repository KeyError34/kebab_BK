import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
import { authenticateJWT } from '../../../core/middlewares/authMiddleware.js';
import { checkAdminRole } from '../../../core/middlewares/checkAdminRole.js';

const router = Router();
const controller = new ProductController();

router.get('/all', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/v1/create',authenticateJWT, checkAdminRole, controller.create);
router.put('v1/update/:id',authenticateJWT, checkAdminRole, controller.update);
router.delete('v1/del/:id',authenticateJWT, checkAdminRole, controller.delete);

export default router;