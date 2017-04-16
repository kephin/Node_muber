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
});
