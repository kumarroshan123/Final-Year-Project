import { Router } from 'express';
import {register,login } from '../controllers/authController';

const router =Router();

router.post('/register',register)
router.post('/login',login);
router.get('/me',);
router.patch('/me',);
router.post('/logout',)

export default router;