import { getAllArtists as fetchAllArtists, getArtistById as fetchArtistById } from '../models/Artist.js';

export const getAllArtists = async (req, res, next) => {
  try {
    const artists = fetchAllArtists();
    res.status(200).json({
      success: true,
      count: artists.length,
      data: artists
    });
  } catch (err) {
    next(err);
  }
};

export const getArtistById = async (req, res, next) => {
  try {
    const artist = fetchArtistById(req.params.id);
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }
    res.status(200).json({
      success: true,
      data: artist
    });
  } catch (err) {
    next(err);
  }
};
