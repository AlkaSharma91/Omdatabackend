import express from 'express';
import { getCart, saveCart } from '../controllers/cartController.js';
import protect from '../middleware/authMiddleware.js';

const router=express.Router();
router.post('/add',protect,saveCart)
router.get('/',protect,getCart)
export default router;