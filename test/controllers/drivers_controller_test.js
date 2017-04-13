const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const Driver = mongoose.model('Driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', async() => {
    try {
      const beforeCount = await Driver.count();
      const res = await request(app)
        .post('/api/drivers')
        .send({
          name: 'kevin',
          email: 'kevin@test.com',
        });
      const newCount = await Driver.count();
      assert(beforeCount + 1 === newCount);
    } catch (err) {
      console.log(err);
    }
  });
});
