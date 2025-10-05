const Attendance = require('../../models/attendance');

class AttendanceService {
  static async getBySession(sessionId) {
    if (!sessionId) throw new Error('sessionId required');
    const list = await Attendance.find({ sessionId }).sort({ timestamp: 1 }).limit(1000);
    return { sessionId, count: list.length, attendance: list };
  }
}

module.exports = AttendanceService;


