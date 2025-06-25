import express from 'express'
import voteController from '../controllers/voteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:pollId', authMiddleware, voteController.vote);
router.delete('/:pollId', authMiddleware, voteController.unvote);

export default router;
