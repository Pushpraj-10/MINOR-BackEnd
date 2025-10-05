const mongoose = require('mongoose');

const FaceSchema = new mongoose.Schema({
  embedding: { type: [Number], default: null },
  embeddingVersion: { type: String },
  registeredAt: { type: Date },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'professor'], required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  passwordHash: { type: String },
  face: { type: FaceSchema, default: null },
  createdAt: { type: Date, required: true, default: () => new Date() },
  updatedAt: { type: Date, default: null },
});

// Unique indexes are already defined via schema paths (unique: true)
UserSchema.index({ role: 1 });

module.exports = mongoose.model('User', UserSchema);


