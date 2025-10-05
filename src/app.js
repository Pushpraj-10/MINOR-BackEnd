const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { connectToDatabase } = require('./config/db');
const apiRouter = require('./router');

const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Basic rate limit for critical endpoints
const authLimiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
app.use('/api/auth', authLimiter);
app.use('/api/sessions/checkin', rateLimit({ windowMs: 60 * 1000, max: 60 }));

// Routes
app.use('/api', apiRouter);

// Health (under basePath /api)
app.get('/api/', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

const PORT = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server listening on port ' + PORT);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });