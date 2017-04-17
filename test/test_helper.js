const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/muber_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn('Warning', err));
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    // create 2dsphere indexes of dirvers.geometry.coordinates
    .then(() => drivers.createIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    // the very first when the database runs, we do not yet have drivers collection
    .catch(() => done());
});
