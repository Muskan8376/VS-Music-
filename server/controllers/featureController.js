import { getFeatures as fetchFeatures } from '../models/Feature.js';

export const getFeatures = async (req, res, next) => {
  try {
    const features = fetchFeatures();
    res.status(200).json({
      success: true,
      count: features.length,
      data: features
    });
  } catch (err) {
    next(err);
  }
};
