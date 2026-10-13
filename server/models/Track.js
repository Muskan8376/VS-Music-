const tracks = [];

export const createTrack = ({ trackTitle, artistName, email, genre }) => {
  const track = {
    id: tracks.length + 1,
    trackTitle,
    artistName,
    email: email?.toLowerCase(),
    genre: genre || 'Bollywood',
    status: 'In Review',
    submittedAt: new Date().toISOString()
  };
  tracks.push(track);
  return track;
};

export const getAllTracks = () => tracks;

export const getTracksByEmail = (email) => 
  tracks.filter((t) => t.email?.toLowerCase() === email?.toLowerCase());
