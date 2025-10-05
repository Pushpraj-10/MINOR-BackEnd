const service = require('./service');

exports.createSession = async function (req, res) {
  try {
    const result = await service.createSession(req.body, req.headers.authorization);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.checkin = async function (req, res) {
  try {
    const result = await service.checkin(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


