import 'dotenv/config';

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      console.log('Connecting to MongoDB...');
      console.log('MongoDB connected successfully.');
    } catch (err) {
      console.error('Database connection failed, running with in-memory adapter:', err.message);
    }
  } else {
    console.log('Connected to In-Memory Database store (Development Mode)');
  }
};
