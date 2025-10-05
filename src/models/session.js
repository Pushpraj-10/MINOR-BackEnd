const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  professorUid: { type: String, required: true },
  title: { type: String },
  qrToken: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: () => new Date() },
  expiresAt: { type: Date, required: true },
  meta: { type: Object, default: null },
});

// Unique indexes are already defined via schema paths (unique: true)
SessionSchema.index({ createdAt: 1 });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Session', SessionSchema);


