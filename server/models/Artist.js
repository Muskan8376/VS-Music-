import { artists as initialArtists } from '../data/seedData.js';

let artists = [...initialArtists];

export const getAllArtists = () => artists;

export const getArtistById = (id) => artists.find((a) => a.id === Number(id));

export const createArtist = (artistData) => {
  const newArtist = {
    id: artists.length + 1,
    ...artistData
  };
  artists.push(newArtist);
  return newArtist;
};
