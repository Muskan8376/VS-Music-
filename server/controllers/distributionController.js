import { getDistributionChannels } from '../models/Feature.js';
import { createTrack } from '../models/Track.js';

export const getChannels = async (req, res, next) => {
  try {
    const channels = getDistributionChannels();
    res.status(200).json({
      success: true,
      data: channels
    });
  } catch (err) {
    next(err);
  }
};

export const submitTrack = async (req, res, next) => {
  try {
    const { trackTitle, artistName, email, genre } = req.body;

    if (!trackTitle || !artistName) {
      return res.status(400).json({
        success: false,
        message: 'Track title and artist name are required for submission.'
      });
    }

    const submission = createTrack({
      trackTitle,
      artistName,
      email,
      genre
    });

    res.status(201).json({
      success: true,
      message: 'Your track has been received and entered into the distribution pipeline.',
      submission
    });
  } catch (err) {
    next(err);
  }
};
