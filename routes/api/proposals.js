var express = require('express');
var models  = require('../../models');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
	models.proposal.findAndCountAll().then(function(result){
		res.json(result);
	}).catch(function(error){
		res.send(error);
	});
});

router.get('/:id', function(req, res, next) {
	models.proposal.findById(req.params.id).then(function(result){
		res.json(result);
	}).catch(function(error){
		res.send(error);
	});
});

module.exports = router;
