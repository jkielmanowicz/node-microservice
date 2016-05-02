"use strict";

var async = require('async');
var doctrine = require('doctrine');
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var _ = require('lodash');

class Swagger {
  constructor(config) {
    this.config = config;

    this.swaggerJson = JSON.parse(fs.readFileSync(this.config.swaggerFile));
    this.swaggerJson.paths = this.swaggerJson.paths || {};
    this.swaggerJson.definitions = this.swaggerJson.definitions || {};
  }

  generate() {
    _.each(this.config.apis, (api) => {
      this.processApi(api);
    });

    var pretty = JSON.stringify(this.swaggerJson, null, '  ');
    fs.writeFile(this.config.swaggerFile, pretty, function(err) {
      if (err) {
        throw err;
      }
    });
  }

  processApi(api) {
    console.log(this.swaggerJson);
    // return
    this.swaggerJson.paths[api.path] = this.swaggerJson.paths[api.path] || {};
    this.swaggerJson.paths[api.path].description = api.description;

    _.each(api.operations, (operation) => {
      let responses = {
        'responses' : {
          '200': {
            schema: {
              type: operation.type,
              "items": {
                "$ref": `#/definitions/${api.model.name}`
              }
            }
          }
        }
      };

    this.swaggerJson.definitions[api.model.name] = this.swaggerJson.definitions[api.model.name] || {};

    this.processModel(api.model);

    this.swaggerJson.paths[api.path][operation.method] = this.swaggerJson.paths[api.path][operation.method] || {};
    this.swaggerJson.paths[api.path][operation.method].description = this.swaggerJson.paths[api.path][operation.method].description || operation.description;
    _.merge(this.swaggerJson.paths[api.path][operation.method], responses);
      
    });
  }

  processModel(model) {
    let properties = {};

    _.each(model.attributes, (a) => {
      properties[a.field] = properties[a.field] || {};
      if (a.type.toString().search('VARCHAR') >= 0) {
        properties[a.field].type = 'string';
      }
      else {
        properties[a.field].type = a.type.toString().toLowerCase()
      }
    });

    let modelDefinition = {
      type: 'object',
      properties: properties
    };

    _.merge(this.swaggerJson.definitions[model.name], modelDefinition);
  }
}

module.exports = Swagger;