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
});
