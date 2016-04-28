'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);
var express = require('express');
var router = express.Router();

// var proposals = require('./proposals');

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var routeName = file.slice(0, file.length - 3);
    var route = require(`./${routeName}`);
    router.use(`/${routeName}`, route);
  });

module.exports = router;