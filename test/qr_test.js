// Test for session token generation and websocket QR tick (1 minute logging)
// Usage: npm run test:qr

const axios = require('axios');
const io = require('socket.io-client');

const PORT = process.env.PORT || 4000;
const BASE = `http://localhost:${PORT}/api`;

async function registerAndLogin(email, password, role, name) {
  try {
    await axios.post(`${BASE}/auth/register`, { email, password, role, name });
  } catch (e) {
    // ignore if already exists
  }
  // Wait 500ms to avoid race condition
  await new Promise(r => setTimeout(r, 500));
  try {
    const { data } = await axios.post(`${BASE}/auth/login`, { email, password });
    return data;
  } catch (e) {
    console.error('Login failed:', e.response?.data || e.message);
    throw e;
  }
}

async function createSession(accessToken) {
  const { data } = await axios.post(
    `${BASE}/sessions`,
    { title: 'Test Session', durationMinutes: 2 },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return data;
}

function listenForQrTicks(sessionId, durationSeconds = 60) {
  return new Promise((resolve, reject) => {
    const socket = io(`http://localhost:${PORT}/sessions`, { transports: ['websocket'] });
    let count = 0;
    let startTs = null;
    socket.on('connect', () => {
      socket.emit('professor:join', { sessionId });
      console.log('WebSocket connected. Listening for QR tokens...');
    });
    socket.on('qr:tick', (payload) => {
      if (payload?.sessionId === sessionId && payload?.token) {
        if (!startTs) startTs = payload.ts;
        count++;
        const elapsed = payload.ts - startTs;
        console.log(`Tick #${count} [ts=${payload.ts}]: QR token = ${payload.token}`);
        if (count >= durationSeconds) {
          socket.disconnect();
          resolve();
        }
      }
    });
    socket.on('connect_error', (err) => {
      reject(err);
    });
    setTimeout(() => {
      socket.disconnect();
      reject(new Error('Timeout waiting for QR ticks'));
    }, (durationSeconds + 5) * 1000);
  });
}

(async () => {
  try {
    const profEmail = `prof_${Date.now()}@example.com`;
    const profPass = 'password123';
    const { accessToken, user } = await registerAndLogin(profEmail, profPass, 'professor', 'Prof Test');
    console.log('Professor UID:', user.uid);
    const { sessionId } = await createSession(accessToken);
    console.log('Session ID:', sessionId);
    await listenForQrTicks(sessionId, 60);
    console.log('Test passed: received 60 QR tokens (1 per second for 1 minute).');
    process.exit(0);
  } catch (err) {
    if (err.response) {
      console.error('Test failed:', err.response.data);
    } else {
      console.error('Test failed:', err.message || err);
    }
    process.exit(1);
  }
})();
