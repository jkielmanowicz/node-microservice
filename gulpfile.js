var gulp = require('gulp');
var swagger = require('./lib/swagger');
var path = require('path');

gulp.task('swagger', function() {

	var apis = require('./routes/api');
	console.log(apis);
	
  var swag = new swagger({
    apiVersion: '1.0',
    apiDirectory: './routes/api',
    swaggerFile: './public/swagger/swagger.json'
  });

  swag.generate();
});