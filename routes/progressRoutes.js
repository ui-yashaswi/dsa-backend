import express from 'express';
import { updateProgress, getUserProgress, getProgressBoard } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, updateProgress);
router.get('/', protect, getUserProgress);
router.get('/board', protect, getProgressBoard);

export default router;
