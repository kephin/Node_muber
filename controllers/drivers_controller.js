const Driver = require('../models/drivers');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  async create(req, res) {
    const driverProps = req.body;
    try {
      const driver = await Driver.create(driverProps);
      res.send(driver);
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  },
};
