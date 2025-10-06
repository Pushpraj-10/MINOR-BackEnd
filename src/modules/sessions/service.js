const jwt = require('jsonwebtoken');
const { customAlphabet } = require('nanoid');
const Session = require('../../models/session');
const Attendance = require('../../models/attendance');
const User = require('../../models/user');

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

function authzProfessor(authorization) {
  if (!authorization) throw new Error('missing Authorization header');
  const token = authorization.replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
  if (decoded.role !== 'professor') throw new Error('forbidden');
  return decoded;
}

class SessionsService {
  static async createSession(body, authorization) {
    const { title, durationMinutes = 30 } = body || {};
    const decoded = authzProfessor(authorization);
    const sessionId = 'sess_' + Date.now();
    const qrToken = nanoid();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);
    const doc = await Session.create({ sessionId, professorUid: decoded.uid, title: title || null, qrToken, createdAt: now, expiresAt });
    return { sessionId: doc.sessionId, qrToken: doc.qrToken, expiresAt: doc.expiresAt };
  }

  static async checkin(body) {
    const { qrToken, studentUid, embedding } = body || {};
    if (!qrToken) throw new Error('qrToken required');
    if (!studentUid) throw new Error('studentUid required');
    const sess = await Session.findOne({ qrToken });
    if (!sess) throw new Error('invalid qr');
    if (sess.expiresAt.getTime() < Date.now()) throw new Error('session expired');

    // Face verification prototype
    const user = await User.findOne({ uid: studentUid });
    if (!user) throw new Error('user not found');
    let verified = false;
    let method = 'none';
    if (embedding && Array.isArray(embedding) && Array.isArray(user.face?.embedding)) {
      method = 'face-embedding';
      const score = cosineSimilarity(embedding, user.face.embedding);
      const threshold = parseFloat(process.env.FACE_THRESHOLD || '0.75');
      verified = score >= threshold;
    }

    const update = {
      $setOnInsert: { sessionId: sess.sessionId, studentUid, method },
      $set: { timestamp: new Date(), verified },
    };

    const result = await Attendance.findOneAndUpdate(
      { sessionId: sess.sessionId, studentUid },
      update,
      { new: true, upsert: true }
    );
    return { ok: true, verified, attendance: { sessionId: result.sessionId, studentUid: result.studentUid, timestamp: result.timestamp, method: result.method } };
  }

  static async getProfessorSessions(authorization) {
    const decoded = authzProfessor(authorization);
    
    // Get all sessions created by this professor
    const sessions = await Session.find({ professorUid: decoded.uid })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to recent 50 sessions
    
    // For each session, get attendance statistics
    const sessionsWithStats = await Promise.all(
      sessions.map(async (session) => {
        // Count total attendance records for this session
        const totalAttendance = await Attendance.countDocuments({ sessionId: session.sessionId });
        
        // Count verified attendance (students who actually attended)
        const attendedStudents = await Attendance.countDocuments({ 
          sessionId: session.sessionId, 
          verified: true 
        });
        
        return {
          session_id: session.sessionId,
          title: session.title || 'Untitled Session',
          start_time: session.createdAt,
          end_time: session.expiresAt,
          total_students: totalAttendance,
          attended_students: attendedStudents
        };
      })
    );
    
    return { sessions: sessionsWithStats };
  }

  static async getSessionAttendance(sessionId, authorization) {
    const decoded = authzProfessor(authorization);
    
    // Verify the session belongs to this professor
    const session = await Session.findOne({ 
      sessionId, 
      professorUid: decoded.uid 
    });
    
    if (!session) {
      throw new Error('Session not found or access denied');
    }
    
    // Get all attendance records for this session
    const attendanceRecords = await Attendance.find({ sessionId })
      .sort({ timestamp: 1 });
    
    // Get student details for each attendance record
    const studentsWithAttendance = await Promise.all(
      attendanceRecords.map(async (record) => {
        const user = await User.findOne({ uid: record.studentUid });
        return {
          student_id: record.studentUid,
          name: user?.name || 'Unknown Student',
          email: user?.email || 'unknown@email.com',
          attendance_status: record.verified
        };
      })
    );
    
    return {
      session_id: sessionId,
      session_title: session.title || 'Untitled Session',
      students: studentsWithAttendance
    };
  }
}

function cosineSimilarity(a, b) {
  const n = Math.min(a.length, b.length);
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < n; i++) {
    const ai = a[i];
    const bi = b[i];
    dot += ai * bi;
    na += ai * ai;
    nb += bi * bi;
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb) || 1;
  return dot / denom;
}

module.exports = SessionsService;


