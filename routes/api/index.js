'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);
var express = require('express');
var router = express.Router();

var apis = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var routeName = file.slice(0, file.length - 3);
    var api = require(`./${routeName}`);

    if (api.swagger) {
      apis[api.swagger.id] = api.swagger;
    }
    else {
      console.warn(`Missing Swagger configuration for API: ${routeName}.`);
    }

    if (api.router) {
      router.use(`/${routeName}`, api.router);
    }
    else {
      console.warn(`Missing router for API: ${routeName}.`);
    }
      
  });

module.exports = {
  apis: apis,
  router: router
};