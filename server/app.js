import express from 'express';
import cors from 'cors';

// Import Route Handlers
import authRoutes from './routes/authRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import distributionRoutes from './routes/distributionRoutes.js';
import featureRoutes from './routes/featureRoutes.js';
import pricingRoutes from './routes/pricingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Import Error Handler Middleware
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Vusic Records & Studio API',
    version: '1.0.0',
    type: 'ES Modules',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/distribution', distributionRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/payment', paymentRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found.`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
