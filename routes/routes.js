const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  app.get('/api', DriversController.greeting);
  app.post('/api/drivers', DriversController.create);
  app.patch('/api/drivers/:id', DriversController.update);
  app.delete('/api/drivers/:id', DriversController.delete);
};
