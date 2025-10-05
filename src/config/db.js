const mongoose = require('mongoose');

async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  const mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
  };
  await mongoose.connect(mongoUri, mongooseOptions);
  console.log('MongoDB connection successful');
  return mongoose.connection;
}

module.exports = { connectToDatabase };


