import { pricingPlans, comparisonFeatures, comparisonColumns, calculateCreditCost, calculateArtistCredits, customLabelPlans } from '../data/pricingData.js';
import { findUserByEmail } from './User.js';

export const getPricingPlans = () => pricingPlans;

export const getComparisonSheet = () => ({
  columns: comparisonColumns,
  features: comparisonFeatures
});

export const getCustomLabelPlans = () => customLabelPlans;

export const computeCredits = (quantity) => calculateCreditCost(quantity);

export const computeArtistCredits = (quantity) => calculateArtistCredits(quantity);

export const addCreditsToUser = (email, creditsToAdd) => {
  const user = findUserByEmail(email);
  if (user) {
    user.credits = (user.credits || 0) + Number(creditsToAdd);
    return user;
  }
  return null;
};

