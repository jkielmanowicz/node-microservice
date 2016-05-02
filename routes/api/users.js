var express = require('express');
var models = require('../../models');
var router = express.Router();

swagger = {
  id: 'users',
  model: models.user,
  path: '/users',
  operations: [
    {
      path: '/:id',
      description: 'Returns all users from the Users table.',
      method: 'get',
      type: 'array',
      parameters: []
    }
  ]
};

router.get('/', function (req, res, next) {
  models.user.findAndCountAll({limit: 25}).then(function (result) {
    res.json(result);
  }).catch(function (error) {
    res.send(error);
  });
});

router.get('/:id', function (req, res, next) {
  models.user.findById(req.params.id).then(function (result) {
    res.json(result);
  }).catch(function (error) {
    res.send(error);
  });
});

module.exports = {
  router: router,
  swagger: swagger
};