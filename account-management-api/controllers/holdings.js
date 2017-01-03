/**
 * Created by bchan on 4/8/16.
 */
'use strict';
var Q 		= require('q'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    service = require('./holdingService');

var domainName = 'Portfolio Holdings';

/**
 * Get all Holdings belonging to a Portfolio
 */
module.exports.getAll = function(req, res, next) {
  	service.getAll(req.params.portfolioId)
		.then( function(data) {
      responseHandler.handleSuccess(req, res, next, data, domainName);
		})
		.fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
		})
		.done();
};

/**
 * Get Holding by ID
 */
module.exports.getById = function(req, res, next) {
    service.getById(req.params.portfolioId, req.params.holdingId)
        .then( function(data) {
      responseHandler.handleSuccess(req, res, next, data, domainName);
        })
        .fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
        })
        .done();
};

/**
 * Add a new Holding to a Portfolio
 */
module.exports.add = function(req, res, next) {
    service.add(req.params.portfolioId, req.body)
    .then(function(data) {
        responseHandler.handleCreateSuccess(req, res, next, data, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};

/**
 * Update an existing Holding within a Portfolio
 */
module.exports.update = function(req, res, next) {
    service.update(req.params.portfolioId, req.params.holdingId, req.body)
    .then(function(data) {
        responseHandler.handleUpdateSuccess(req, res, next, data, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};

/**
 * Delete an existing Holding within a Portfolio
 */
module.exports.delete = function(req, res, next) {
    service.delete(req.params.portfolioId, req.params.holdingId)
    .then(function() {
        responseHandler.handleDeleteSuccess(req, res, next, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};