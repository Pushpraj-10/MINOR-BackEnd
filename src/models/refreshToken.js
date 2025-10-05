const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  createdAt: { type: Date, required: true, default: () => new Date() },
  expiresAt: { type: Date, required: true },
});

// Unique index already via schema path (unique: true)
RefreshTokenSchema.index({ uid: 1 });
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);


