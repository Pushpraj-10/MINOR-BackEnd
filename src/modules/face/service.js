const User = require('../../models/user');

class FaceService {
  static async register(body) {
    const { uid, embedding, embeddingVersion = 'v1' } = body || {};
    if (!uid || !Array.isArray(embedding)) throw new Error('uid and embedding required');
    const update = {
      face: { embedding, embeddingVersion, registeredAt: new Date() },
      updatedAt: new Date(),
    };
    const user = await User.findOneAndUpdate({ uid }, update, { new: true });
    if (!user) throw new Error('user not found');
    return { ok: true };
  }

  static async verify(body) {
    const { uid, embedding, threshold } = body || {};
    if (!uid || !Array.isArray(embedding)) throw new Error('uid and embedding required');
    const user = await User.findOne({ uid });
    if (!user || !user.face?.embedding) throw new Error('no stored embedding');
    const score = cosineSimilarity(embedding, user.face.embedding);
    const t = parseFloat(threshold ?? process.env.FACE_THRESHOLD ?? '0.3');
    const match = score >= t;
    return { match, score, threshold: t };
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

module.exports = FaceService;