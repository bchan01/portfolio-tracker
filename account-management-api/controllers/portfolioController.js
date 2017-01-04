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
 * @SwaggerDefinitions
 *   PortfolioResponse:
 *     type: object
 *     properties:
 *       outcome:
 *         type: object
 *         $ref: "#/definitions/Outcome"
 *       data:
 *         type: array
 *         items:
 *           $ref: "#/definitions/Portfolio"
 */

/**
 * @SwaggerPath
 *   /portfolios:
 *     get:
 *       summary: Get all portolios
 *       description: Get all portolios associated with the current user
 *       produces:
 *         - application/json
 *       tags:
 *         - Portfolios
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/PortfolioResponse"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
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
 * @SwaggerPath
 *   /portfolios/{portfolioId}:
 *     get:
 *       summary: Get Porfolio by ID
 *       description: Get portolio with a given ID
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: portfolioId
 *           in: path
 *           description: portfolio ID
 *           required: true
 *           type : string
 *       tags:
 *         - Portfolios
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/PortfolioResponse"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
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
 * @SwaggerPath
 *   /portfolios:
 *     post:
 *       summary: Create Portfolio
 *       description: Create new portfolio
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: portfolio
 *           in: body
 *           description: portfolio entity
 *           required: true
 *           schema:
 *             $ref: "#/definitions/PortfolioInput"
 *       tags:
 *         - Portfolios
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/PortfolioResponse"
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
 * @SwaggerPath
 *   /portfolios/{portfolioId}:
 *     put:
 *       summary: Update Portfolio
 *       description: Update an existing Portfolio
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
 *         - name: portfolio
 *           in: body
 *           description: portfolio entity
 *           required: true
 *           schema:
 *             $ref: "#/definitions/PortfolioInput"
 *       tags:
 *         - Portfolios
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/PortfolioResponse"
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
 * @SwaggerPath
 *   /portfolios/{portfolioId}:
 *     delete:
 *       summary: Delete Porfolio
 *       description: Delete an existing Portfolio
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: portfolioId
 *           in: path
 *           description: portfolio ID
 *           required: true
 *           type : string
 *       tags:
 *         - Portfolios
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
    service.delete({'_id' : req.params.portfolioId})
    .then(function() {
        responseHandler.handleDeleteSuccess(req, res, next, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};