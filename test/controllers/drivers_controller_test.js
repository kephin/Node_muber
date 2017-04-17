const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const Driver = mongoose.model('Driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', async() => {
    await request(app)
      .post('/api/drivers')
      .send({
        name: 'kevin',
        email: 'kevin@test.com',
      });
    const count = await Driver.count();
    assert(count === 1);
  });
  it('Post to /api/drivers requires name and email', async() => {
    const res = await request(app)
      .post('/api/drivers')
      .send({});
    assert(res.error);
  });
  it('Patch to /api/driver/id updates an existing driver', async() => {
    // driver will immediately get an _id field after new
    const driver = new Driver({ name: 'kevin', email: 'kevin@test.com', isAvailable: false });
    await driver.save();
    await request(app)
      .patch(`/api/drivers/${driver._id}`)
      .send({ isAvailable: true });
    const newDriver = await Driver.findOne({ name: 'kevin' });
    assert(newDriver.isAvailable === true);
  });
  it('Delete to /api/drivers/id deletes an existing driver', async() => {
    const driver = new Driver({ name: 'kevin', email: 'kevin@test.com' });
    await driver.save();
    await request(app)
      .delete(`/api/drivers/${driver._id}`);
    const deletedDriver = await Driver.findOne({ name: 'kevin' });
    assert(deletedDriver === null);
  });
  it('Get to /api/drivers finds drivers in a location', async() => {
    const hsinChuDriver = new Driver({
      name: 'Jason',
      email: 'jason@test.com',
      geometry: {
        type: 'Point',
        coordinates: [120.968093, 24.8022417],
      },
    });
    const taipeiDriver = new Driver({
      name: 'Allen',
      email: 'allen@test.com',
      geometry: {
        type: 'Point',
        coordinates: [121.5276713, 25.0423118],
      },
    });
    await Promise.all([hsinChuDriver.save(), taipeiDriver.save()]);
    const res = await request(app)
      .get('/api/drivers?lng=121.5343875&lat=25.0136385');
    assert(res.body.length === 1);
    assert(res.body[0].obj.name === 'Allen');
  });
});
