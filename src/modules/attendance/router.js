const express = require('express');
const service = require('./service');

const router = express.Router();

router.get('/:sessionId', async (req, res) => {
  try {
    const result = await service.getBySession(req.params.sessionId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


