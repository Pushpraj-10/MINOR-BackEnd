const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/', controller.createSession);
router.post('/checkin', controller.checkin);

module.exports = router;


