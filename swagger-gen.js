var Swagger = require('./lib/swagger');
var path = require('path');


var apiIndex = require('./routes/api');

var swagger = new Swagger({
  apiVersion: '1.0',
  apis: apiIndex.apis,
  swaggerFile: './public/swagger/swagger.json'
});

swagger.generate();