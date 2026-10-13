import express from 'express';
import { getChannels, submitTrack } from '../controllers/distributionController.js';

const router = express.Router();

router.get('/', getChannels);
router.post('/submit', submitTrack);

export default router;
