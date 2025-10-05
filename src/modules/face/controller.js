const service = require('./service');

exports.register = async function (req, res) {
  try {
    const result = await service.register(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verify = async function (req, res) {
  try {
    const result = await service.verify(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


