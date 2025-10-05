const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  studentUid: { type: String, required: true },
  timestamp: { type: Date, required: true, default: () => new Date() },
  verified: { type: Boolean, required: true },
  method: { type: String },
  note: { type: String, default: null },
});

AttendanceSchema.index({ sessionId: 1, studentUid: 1 }, { unique: true });
AttendanceSchema.index({ studentUid: 1 });
AttendanceSchema.index({ timestamp: 1 });

module.exports = mongoose.model('Attendance', AttendanceSchema);


