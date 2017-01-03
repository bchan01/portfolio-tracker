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

/**
 * Get all Portfolios belonging to a user
 */
module.exports.getAll = function(req, res, next) {
  	service.getAll({'userId' : res.locals.username}, {'holdings' : 0})
		.then( function(data) {
      responseHandler.handleSuccess(req, res, next, data, domainName);
		})
		.fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
		})
		.done();
};

/**
 * Get Portfolio by ID
 */
module.exports.getById = function(req, res, next) {
    service.get({'_id' : req.params.portfolioId}, {'holdings' : 0})
        .then( function(data) {
      responseHandler.handleSuccess(req, res, next, data, domainName);
        })
        .fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
        })
        .done();
};

/**
 * Add a new Portfolio
 */
module.exports.add = function(req, res, next) {
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

/**
 * Update an existing Portfolio
 */
module.exports.update = function(req, res, next) {
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

/**
 * Delete an existing Portfolio
 */
module.exports.delete = function(req, res, next) {
    service.delete({'_id' : req.params.portfolioId})
    .then(function() {
        responseHandler.handleDeleteSuccess(req, res, next, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};