const Driver = require('../models/drivers');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  async create(req, res, next) {
    const driverProps = req.body;
    try {
      const driver = await Driver.create(driverProps);
      res.send(driver);
    } catch (err) {
      next();
    }
  },
};
