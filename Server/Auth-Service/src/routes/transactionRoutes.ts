import express from 'express';
import { storeRows } from '../controllers/transactionController';
import { protect } from '../middlwares/protect';

const router = express.Router();

// POST /api/transactions/store
router.post('/store', protect, storeRows);

export default router;