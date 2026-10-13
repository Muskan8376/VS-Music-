import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = Number(process.env.PORT) || 5000;

// Initialize Server
const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Vusic Records API (ES Modules) on port ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`📡 Health: http://localhost:${PORT}/api/health`);
      console.log(`🔐 OTP Auth: http://localhost:${PORT}/api/auth/login`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
