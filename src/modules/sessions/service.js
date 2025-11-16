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
    // qrSeed is a longer random value used to derive per-second rotating tokens via HMAC/time slices
    const qrSeed = nanoid() + nanoid();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);
    const doc = await Session.create({ sessionId, professorUid: decoded.uid, title: title || null, qrSeed, createdAt: now, expiresAt });
    return { sessionId: doc.sessionId, expiresAt: doc.expiresAt };
  }

  static async checkin(body) {
    const { qrToken, studentUid, embedding, sessionId } = body || {};
    if (!qrToken) throw new Error('qrToken required');
    if (!studentUid) throw new Error('studentUid required');
    // Accept either direct lookup (legacy) or derived rotating token validation
    let sess = null;
    if (sessionId) {
      sess = await Session.findOne({ sessionId });
    }
    if (!sess) {
      // fallback legacy static token flow
      sess = await Session.findOne({ qrToken });
    }
    if (!sess) throw new Error('session not found');
    if (sess.expiresAt.getTime() < Date.now()) throw new Error('session expired');

    // Validate rotating token if qrSeed exists
    if (sess.qrSeed) {
      const valid = this.isRotatingTokenValid(qrToken, sess.qrSeed, sess.sessionId);
      if (!valid) throw new Error('invalid qr');
    }

    // Face verification prototype
    const user = await User.findOne({ uid: studentUid });
    if (!user) throw new Error('user not found');
    let verified = false;
    let method = 'none';
    if (embedding && Array.isArray(embedding) && Array.isArray(user.face?.embedding)) {
      method = 'face-embedding';
      const score = cosineSimilarity(embedding, user.face.embedding);
      const threshold = parseFloat(process.env.FACE_THRESHOLD || '0.3');
      verified = score >= threshold;
      console.log(`Face verification: score=${score.toFixed(3)}, threshold=${threshold}, verified=${verified}`);
    } else {
      console.log('Face verification skipped: missing embedding or user face data');
    }

    const update = {
      $setOnInsert: { sessionId: sess.sessionId, studentUid },
      $set: { timestamp: new Date(), verified, method },
    };

    const result = await Attendance.findOneAndUpdate(
      { sessionId: sess.sessionId, studentUid },
      update,
      { new: true, upsert: true }
    );
    console.log(`Attendance saved: sessionId=${result.sessionId}, studentUid=${result.studentUid}, verified=${result.verified}, method=${result.method}`);
    return { ok: true, verified, attendance: { sessionId: result.sessionId, studentUid: result.studentUid, timestamp: result.timestamp, method: result.method, verified: result.verified } };
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

  static deriveRotatingToken(qrSeed, sessionId, seconds) {
    const crypto = require('crypto');
    const h = crypto.createHmac('sha256', qrSeed + sessionId);
    h.update(String(seconds));
    // Shorten for QR compactness
    return h.digest('base64').replace(/[^A-Za-z0-9]/g, '').slice(0, 16);
  }

  static isRotatingTokenValid(candidate, qrSeed, sessionId) {
    const nowSec = Math.floor(Date.now() / 1000);
    // Allow small clock skew window +/-1 second
    for (let s = nowSec - 1; s <= nowSec + 1; s++) {
      if (SessionsService.deriveRotatingToken(qrSeed, sessionId, s) === candidate) return true;
    }
    return false;
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