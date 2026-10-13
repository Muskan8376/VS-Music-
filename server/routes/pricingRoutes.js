import express from 'express';
import {
  getPlans,
  getComparison,
  getCustomLabels,
  calculateCredits,
  calculateArtistCreditsHandler,
  purchaseCredits,
  purchaseArtistCredits,
  purchaseCustomLabel
} from '../controllers/pricingController.js';

const router = express.Router();

router.get('/plans', getPlans);
router.get('/comparison', getComparison);
router.get('/custom-labels', getCustomLabels);
router.post('/calculate', calculateCredits);
router.post('/calculate-artist', calculateArtistCreditsHandler);
router.post('/purchase', purchaseCredits);
router.post('/purchase-artist', purchaseArtistCredits);
router.post('/purchase-label', purchaseCustomLabel);

export default router;

