const express = require('express');

// Sub-routers
const authRouter = require('./modules/auth/router');
const sessionsRouter = require('./modules/sessions/router');
const faceRouter = require('./modules/face/router');
const attendanceRouter = require('./modules/attendance/router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/sessions', sessionsRouter);
router.use('/face', faceRouter);
router.use('/attendance', attendanceRouter);

module.exports = router;


