const Driver = require('../models/drivers');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  async index(req, res, next) {
    const { lng, lat } = req.query;
    try {
      const drivers = await Driver.geoNear({ type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }, { spherical: true, maxDistance: 50000 });
      res.send(drivers);
    } catch (err) {
      next();
    }
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
  async update(req, res, next) {
    const driverProps = req.body;
    const driverId = req.params.id;
    try {
      await Driver.findByIdAndUpdate(driverId, driverProps);
      const newDriver = await Driver.findById(driverId);
      res.send(newDriver);
    } catch (err) {
      next();
    }
  },
  async delete(req, res, next) {
    const driverId = req.params.id;
    try {
      const driver = await Driver.findByIdAndRemove(driverId);
      res.status(204).send(driver);
    } catch (err) {
      next();
    }
  },
};
