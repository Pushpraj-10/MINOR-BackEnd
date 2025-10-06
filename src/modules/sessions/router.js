const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/', controller.createSession);
router.post('/checkin', controller.checkin);
router.get('/professor', controller.getProfessorSessions);
router.get('/professor/:sessionId/attendance', controller.getSessionAttendance);

module.exports = router;


