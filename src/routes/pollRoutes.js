import express from 'express';
import pollController from '../controllers/pollController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), pollController.createPoll);
router.get('/', authMiddleware, pollController.getPolls);
router.get('/:id', authMiddleware, pollController.getPollById);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), pollController.updatePoll);
router.put('/:id/lock', authMiddleware, roleMiddleware(['admin']), pollController.lockPoll);
router.put('/:id/unlock', authMiddleware, roleMiddleware(['admin']), pollController.unlockPoll);
router.post('/:id/options', authMiddleware, roleMiddleware(['admin']), pollController.addOption);
router.delete('/:id/options', authMiddleware, roleMiddleware(['admin']), pollController.removeOption);

export default router;