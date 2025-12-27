import express from 'express';
import { getTopics, getTopicById } from '../controllers/topicController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getTopics);
router.get('/:id', protect, getTopicById);

export default router;
