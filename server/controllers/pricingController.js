import {
  getPricingPlans,
  getComparisonSheet,
  getCustomLabelPlans,
  computeCredits,
  computeArtistCredits,
  addCreditsToUser
} from '../models/Pricing.js';

/**
 * GET /api/pricing/plans
 */
export const getPlans = async (req, res, next) => {
  try {
    const plans = getPricingPlans();
    res.status(200).json({
      success: true,
      data: plans
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/pricing/comparison
 */
export const getComparison = async (req, res, next) => {
  try {
    const sheet = getComparisonSheet();
    res.status(200).json({
      success: true,
      data: sheet
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/pricing/custom-labels
 */
export const getCustomLabels = async (req, res, next) => {
  try {
    const labels = getCustomLabelPlans();
    res.status(200).json({
      success: true,
      data: labels
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/pricing/calculate
 */
export const calculateCredits = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const calculation = computeCredits(quantity || 1);
    res.status(200).json({
      success: true,
      data: calculation
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/pricing/calculate-artist
 */
export const calculateArtistCreditsHandler = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const calculation = computeArtistCredits(quantity || 1);
    res.status(200).json({
      success: true,
      data: calculation
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/pricing/purchase
 */
export const purchaseCredits = async (req, res, next) => {
  try {
    const { email, quantity } = req.body;
    const credits = Number(quantity) || 1;
    const calculation = computeCredits(credits);

    const updatedUser = addCreditsToUser(email, credits);

    res.status(200).json({
      success: true,
      message: `Successfully purchased ${credits} song credit(s)!`,
      credits: updatedUser?.credits || credits,
      calculation
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/pricing/purchase-artist
 */
export const purchaseArtistCredits = async (req, res, next) => {
  try {
    const { email, quantity } = req.body;
    const count = Number(quantity) || 1;
    const calculation = computeArtistCredits(count);

    res.status(200).json({
      success: true,
      message: `Successfully enrolled ${count} Artist(s) into Artist Unlimited!`,
      calculation
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/pricing/purchase-label
 */
export const purchaseCustomLabel = async (req, res, next) => {
  try {
    const { email, planId } = req.body;
    const labels = getCustomLabelPlans();
    const selected = labels.find((l) => l.id === planId) || labels[0];

    res.status(200).json({
      success: true,
      message: `Successfully activated ${selected.name}!`,
      plan: selected
    });
  } catch (err) {
    next(err);
  }
};

