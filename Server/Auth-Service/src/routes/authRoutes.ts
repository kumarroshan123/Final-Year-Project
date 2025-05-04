import { Router } from 'express';
import {register,login,getMe,updateMe,logout } from '../controllers/authController';
import { protect } from '../middlwares/protect';
const router =Router();



router.post('/register',register)
router.post('/login',login);
router.get('/me',protect,getMe);
router.patch('/me',protect,updateMe);
router.post('/logout',protect,logout)

export default router;