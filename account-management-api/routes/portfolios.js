/**
 * Created by bchan on 4/8/16.
 */
'use strict';

var Q 		= require('q'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    router  = require('express').Router(),
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
  * @SwaggerDefinitions
  *   PortfolioRequest:
  *     type: object
  *     properties:
  *       name:
  *         type: string
  */


/**
 * @SwaggerPath
 *   /portfolios:
 *     get:
 *       summary: Get current user Portfolios
 *       description: Get current user Portfolios
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
router.get('/', function(req, res, next) {
  console.log('getPortfolios for user:' + res.locals.username);
	service.getAll({'userId' : res.locals.username})
		.then( function(data) {
      responseHandler.handleSuccess(req, res, next, data, domainName);
		})
		.fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
		})
		.done();
});

/**
 * @SwaggerPath
 *   /portfolios/{id}:
 *     get:
 *       summary: Get current user Portfolio by ID
 *       description: Get current user Portfolio by id
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: id
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
router.get('/:id', function(req, res, next) {
    service.get({'userId' : res.locals.userId, '_id' : req.params.id})
        .then( function(data) {
      responseHandler.handleSuccess(req, res, next, data, domainName);
        })
        .fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
        })
        .done();
});

/**
 * @SwaggerPath
 *   /portfolios:
 *     post:
 *       summary: Create Portfolio
 *       description: Create Portfolio
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
 *             $ref: "#/definitions/PortfolioRequest"
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
router.post('/', function(req, res, next) {
    var data = {'userId' : res.locals.username,  'name' : req.body.name};
    if (req.body.holdings) {
      data['holdings'] = req.body.holdings;
    }
    service.create(data, {'userId' : res.locals.username, 'name' : req.body.name})
    .then(function(data) {
        responseHandler.handleCreateSuccess(req, res, next, data, domainName);
    })
    .fail(function (error) {
        responseHandler.handleCreateError(req, res, next, error, domainName);
    })
    .done();
});

/**
 * @SwaggerPath
 *   /portfolios/{id}:
 *     put:
 *       summary: Update Portfolio
 *       description: update Portfolio
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: portfolio id
 *           required: true
 *           type: string
 *         - name: portfolio
 *           in: body
 *           description: portfolio entity
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Portfolio"
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
router.put('/:id', function(req, res, next) {
    var data = {'userId' : res.locals.username,  'name' : req.body.name};
    if (req.body.name) {
      data['name'] = req.body.name;
    }
    if (req.body.holdings) {
      if (Array.isArray(req.body.holdings)) {
          data['holdings'] = req.body.holdings;
      } else {
          data['holdings'] = [req.body.holdings];
      }
    }
    console.log('portfolio.update() - ' + JSON.stringify(data));
    service.update(data, {'_id' : req.params.id})
    .then(function(data) {
        responseHandler.handleUpdateSuccess(req, res, next, data, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
});

/**
 * @SwaggerPath
 *   /portfolios/{id}:
 *     delete:
 *       summary: Delete Portfolio
 *       description: delete Portfolio
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: portfolio id
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
router.delete('/:id',  function(req, res, next) {  
    service.delete({'_id' : req.params.id})
    .then(function() {
        responseHandler.handleDeleteSuccess(req, res, next, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
});


module.exports = router;