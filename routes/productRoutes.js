import express from 'express';
import { addProduct, deleteProductWithId, getAllProducts, updateProductWithId } from '../controllers/productController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/add',protect,addProduct)
router.get('/',protect,getAllProducts)
router.delete('/delete/:id',protect,deleteProductWithId)
router.patch('/update/:id',updateProductWithId)
export default router;