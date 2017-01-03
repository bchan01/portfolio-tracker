/**
 * Created by bchan on 4/8/16.
 */
'use strict';

var Q 		= require('q'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    queryBuilder  = commonUtils.queryBuilder,
    config       = require('../config/config'),
    path = require('path');

var service = new  commonUtils.DataService(path.join(__dirname, '../models'),'user', 'User');
var tokenService = new  commonUtils.JWTTokenService(config['jwt']);
var domainName = 'User';

/**
 * @SwaggerDefinitions
 *   UserResponse:
 *     type: object
 *     properties:
 *       outcome:
 *         type: object
 *         $ref: "#/definitions/Outcome"
 *       data:
 *         type: array
 *         items:
 *           $ref: "#/definitions/User"
 */


/**
 * @SwaggerPath
 *   /users/{username}:
 *     get:
 *       summary: Get User by username
 *       description: get User
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: username
 *           in: path
 *           description: username
 *           required: true
 *           type : string
 *       tags:
 *         - Users
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/UserResponse"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.getByUsername = function(req, res, next) {
	service.get({'username' : req.params.username}, {'userPassword' : 0})
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
 *   /users:
 *     get:
 *       summary: Get current User
 *       description: Get current User
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: email
 *           in: query
 *           description: email
 *           required: false
 *           type : string
 *         - name: username
 *           in: query
 *           description: username
 *           required: false
 *           type : string
 *         - name: lastName
 *           in: query
 *           description: last name
 *           required: false
 *           type : string
 *         - name: firstName
 *           in: query
 *           description: first name
 *           required: false
 *           type : string
 *         - name: city
 *           in: query
 *           description: city
 *           required: false
 *           type : string
 *         - name: state
 *           in: query
 *           description: state
 *           required: false
 *           type : string
 *         - name: postalCode
 *           in: query
 *           description: Postal Code
 *           required: false
 *           type : string
 *       tags:
 *         - Users
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/UserResponse"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.getAll = function(req, res, next) {
    var query = { };
    if (req.query.email) {
        query["email"] = queryBuilder.startWithRegExp(req.query.email);
    }
    if (req.query.username) {
        query["username"] = queryBuilder.startWithRegExp(req.query.username);
    }
    if (req.query.firstName) {
        query["firstName"] = queryBuilder.startWithRegExp(req.query.firstName);
    }
    if (req.query.lastName) {
        query["lastName"] = queryBuilder.startWithRegExp(req.query.lastName);
    }
    if (req.query.city) {
        query["city"] = queryBuilder.startWithRegExp(req.query.city);
    }
    if (req.query.state) {
        query["state"] = req.query.state;
    }
    if (req.query.postalCode) {
        query["postalCode"] = req.query.postalCode;
    }
    service.getAll(query,  {'userPassword' : 0})
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
 *   /users/{username}:
 *     delete:
 *       summary: Delete user
 *       description: delete User
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: username
 *           in: path
 *           description: username
 *           required: true
 *           type : string
 *       tags:
 *         - Users
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
module.exports.deleteByUsername = function(req, res, next) {  
    service.delete({'username' : req.params.username})
    .then(function() {
        responseHandler.handleDeleteSuccess(req, res, next, domainName);
    })
    .fail(function (error) {
        responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
};

/**
 * @SwaggerPath
 *   /users:
 *     post:
 *       summary: Create User
 *       description: Create User
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: user
 *           in: body
 *           description: user entity
 *           required: true
 *           schema:
 *             $ref: "#/definitions/User"
 *       tags:
 *         - Users
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/UserResponse"
 *         400:
 *           description: user Validation Error.
 *           schema:
 *             $ref: "#/definitions/Response"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.addOne  = function(req, res, next) {
    var input = req.body;
    var username = req.body.username; 
    Q.invoke(tokenService, 'encryptPassword', req.body.userPassword)  
    .then(function(encyptPassword) {
        input['userPassword'] = encyptPassword;
        return service.create(input, {'username' : username})
    })
    .then(function(data) {
        // Remove password
        data['userPassword'] = undefined;
        responseHandler.handleCreateSuccess(req, res, next, data, domainName);
    })
    .fail(function (error) {
        responseHandler.handleCreateError(req, res, next, error, domainName);
    })
    .done();
};


/**
 * @SwaggerPath
 *   /users/{username}:
 *     put:
 *       summary: Update User
 *       description: update User
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: username
 *           in: path
 *           description: username
 *           required: true
 *           type : string
 *         - name: user
 *           in: body
 *           description: user entity
 *           required: true
 *           schema:
 *             $ref: "#/definitions/User"
 *       tags:
 *         - Users
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/UserResponse"
 *         400:
 *           description: user Validation Error.
 *           schema:
 *             $ref: "#/definitions/Response"
 *         401:
 *           description: Unauthorized request
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.updateByUsername = function(req, res, next) {
    var data = req.body;
    // Sanize - remove fields not updatable
    if (data.userPassword) {
         delete data['userPassword'];
    }
    if (data.username) {
         delete data['username'];
    }
    service.update(req.body, {'username' :req.params.username})
        .then(function(data) {
            // Remove password
            data['userPassword'] = undefined;
            responseHandler.handleUpdateSuccess(req, res, next, data, domainName);
        })
        .fail(function (error) {
            responseHandler.handleError(req, res, next, error, domainName);
        })
        .done();
};