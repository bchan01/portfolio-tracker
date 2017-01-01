/**
 * Created by bchan on 4/8/16.
 */
'use strict';
var Q 		= require('q'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    model = require('../models/portfolio'),
    path = require('path');
var service = new  commonUtils.DataService(path.join(__dirname, '../models'),'portfolio', 'portfolio');
var domainName = 'Portfolio';

module.exports.getAll = function(req, res, next) {
    console.log('portfolios.getAll for user:' + res.locals.username);
	service.getAll({'userId' : res.locals.username})
		.then( function(data) {
      responseHandler.handleSuccess(req, res, next, data, domainName);
		})
		.fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
		})
		.done();
};

module.exports.getOne = function(req, res, next) {
    console.log('portfolios.getOne for user:' + res.locals.username + ',portfolioId:' + req.params.portfolioId);
    service.get({'_id' : req.params.portfolioId})
        .then( function(data) {
      responseHandler.handleSuccess(req, res, next, data, domainName);
        })
        .fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
        })
        .done();
};

module.exports.addOne = function(req, res, next) {
    console.log('portfolios.addOne for user:' + res.locals.username + ',name:' + req.body.name);
    var data = {'userId' : res.locals.username,  'name' : req.body.name};
    service.create(data, {'userId' : res.locals.username, 'name' : req.body.name})
    .then(function(data) {
        responseHandler.handleCreateSuccess(req, res, next, data, domainName);
    })
    .fail(function (error) {
        responseHandler.handleCreateError(req, res, next, error, domainName);
    })
    .done();
};

module.exports.updateOne = function(req, res, next) {
    console.log('portfolios.updateOne for user:' + res.locals.username 
        + ',portfolioId:' + req.params.portfolioId
        + ',name:' + req.body.name);
    var data = {'userId' : res.locals.username};
    if (req.body.name) {
      data['name'] = req.body.name;
    }
    service.update(data, {'_id' : req.params.portfolioId})
    .then(function(data) {
        responseHandler.handleUpdateSuccess(req, res, next, data, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};

module.exports.deleteOne = function(req, res, next) {
    console.log('portfolios.deleteOne for user:' + res.locals.username + ',portfolioId:' + req.params.portfolioId);
    service.delete({'_id' : req.params.portfolioId})
    .then(function() {
        responseHandler.handleDeleteSuccess(req, res, next, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};