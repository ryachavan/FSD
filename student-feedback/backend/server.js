import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get current directory (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Initialize Express app
const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL || 'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (same-origin requests like forms, same-server frontend)
      // Allow localhost for development
      // Allow configured frontend URL
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else if (process.env.NODE_ENV === 'production') {
        // In production, allow all origins since frontend is served from same server
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend server is running',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Serve React static files (production build)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// React Router fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
