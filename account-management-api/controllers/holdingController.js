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
 * @SwaggerDefinitions
 *   HoldingResponse:
 *     type: object
 *     properties:
 *       outcome:
 *         type: object
 *         $ref: "#/definitions/Outcome"
 *       data:
 *         type: array
 *         items:
 *           $ref: "#/definitions/Holding"
 */

/**
 * @SwaggerPath
 *   /portfolios/{portfolioId}/holdings:
 *     get:
 *       summary: Get portolio holdings
 *       description: Get all Holdings belonging to a Portfolio
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: portfolioId
 *           in: path
 *           description: portfolio ID
 *           required: true
 *           type : string
 *       tags:
 *         - Portfolio Holdings
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/HoldingResponse"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
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
 * @SwaggerPath
 *   /portfolios/{portfolioId}/holdings/{holdingId}:
 *     get:
 *       summary: Get portolio holding
 *       description: Get portolio holding by ID
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: portfolioId
 *           in: path
 *           description: portfolio ID
 *           required: true
 *           type : string
 *         - name: holdingId
 *           in: path
 *           description: holding ID
 *           required: true
 *           type : string
 *       tags:
 *         - Portfolio Holdings
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/HoldingResponse"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
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
 * @SwaggerPath
 *   /portfolios/{portfolioId}/holdings:
 *     post:
 *       summary: Create Holding
 *       description: Add a new Holding to a Portfolio
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: portfolioId
 *           in: path
 *           description: portfolio ID
 *           required: true
 *           type : string
 *         - name: holding
 *           in: body
 *           description: holding entity
 *           required: true
 *           schema:
 *             $ref: "#/definitions/HoldingInput"
 *       tags:
 *         - Portfolio Holdings
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/HoldingResponse"
 *         400:
 *           description: user Validation Error.
 *           schema:
 *             $ref: "#/definitions/Response"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.add = function(req, res, next) {
     Q.invoke(service, 'parseHoldingInput', req.body) 
        .then(function(newHolding) {
             return service.add(req.params.portfolioId, newHolding);
        })
        .then(function(data) {
            responseHandler.handleCreateSuccess(req, res, next, data, domainName);
        })
        .fail(function (error) {
            responseHandler.handleError(req, res, next, error, domainName);
        })
        .done();
};

/**
 * @SwaggerPath
 *   /portfolios/{portfolioId}/holdings/{holdingId}:
 *     put:
 *       summary: Update Holding
 *       description: Update an existing Holding within a Portfolio
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: portfolioId
 *           in: path
 *           description: portfolio ID
 *           required: true
 *           type : string
 *         - name: holdingId
 *           in: path
 *           description: holding ID
 *           required: true
 *           type : string
 *         - name: holding
 *           in: body
 *           description: holding entity
 *           required: true
 *           schema:
 *             $ref: "#/definitions/HoldingInput"
 *       tags:
 *         - Portfolio Holdings
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/HoldingResponse"
 *         400:
 *           description: user Validation Error.
 *           schema:
 *             $ref: "#/definitions/Response"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.update = function(req, res, next) {
     Q.invoke(service, 'parseHoldingInput', req.body) 
        .then(function(updateHolding) {
             return service.update(req.params.portfolioId, req.params.holdingId, updateHolding);
        })
        .then(function(data) {
             responseHandler.handleUpdateSuccess(req, res, next, data, domainName);
        })
        .fail(function (error) {
            responseHandler.handleError(req, res, next, error, domainName);
        })
        .done();
};

/**
 * @SwaggerPath
 *   /portfolios/{portfolioId}/holdings/{holdingId}:
 *     delete:
 *       summary: Delete Porfolio
 *       description: Delete an existing Holding within a Portfolio
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: portfolioId
 *           in: path
 *           description: portfolio ID
 *           required: true
 *           type : string
 *         - name: holdingId
 *           in: path
 *           description: holding ID
 *           required: true
 *           type : string
 *       tags:
 *         - Portfolio Holdings
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/Response"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
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