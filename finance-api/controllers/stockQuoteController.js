'use strict';
 
 var parse = require('papaparse'),
 	config = require('../config/config'),
    stockQuoteFields = require('../config/stockQuoteFields'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    request = require('request'),
     _ = require('lodash');

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.quoteUrl;
const defaultFieldKeys = config.financeAPI.quoteFields.keys;
const defaultFieldNames = config.financeAPI.quoteFields.names;

/**
 * @SwaggerDefinitions
 *   StockQuote:
 *     type: object
 *     properties:
 *       symbol:
 *         type: string
 *       name:
 *         type: string
 *       price:
 *         type: number
 *         format: double
 *       date:
 *         type: string
 *       time:
 *         type: string
 *       bid:
 *         type: number
 *         format: double
 *       ask:
 *         type: number
 *         format: double
 *       open:
 *         type: number
 *         format: double
 *       previousClose:
 *         type: number
 *         format: double
 *       change:
 *         type: string
 *       changePercent:
 *         type: string
 *       daysHigh:
 *         type: number
 *         format: double
 *       daysLow:
 *         type: number
 *         format: double
 *       high52Weeks:
 *         type: number
 *         format: double
 *       volume:
 *         type: number
 *         format: double
 */

/**
 * @SwaggerDefinitions
 *   StockQuoteResponse:
 *     type: object
 *     properties:
 *       outcome:
 *         type: object
 *         $ref: "#/definitions/Outcome"
 *       data:
 *         type: array
 *         items:
 *           $ref: "#/definitions/StockQuote"
 */

 /**
 * @SwaggerDefinitions
 *   StockQuoteView:
 *     type: object
 */

 /**
 * @SwaggerDefinitions
 *   StockQuoteViewResponse:
 *     type: object
 *     properties:
 *       outcome:
 *         type: object
 *         $ref: "#/definitions/Outcome"
 *       data:
 *         type: array
 *         items:
 *           $ref: "#/definitions/StockQuoteView"
 */

/**
 * @SwaggerPath
 *   /stocks/quotes:
 *     get:
 *       summary: Get Delayed Stock Quotes
 *       description: Get Delayed Stock Quotes for one or more symbol(s)
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: symbols
 *           in: query
 *           description: comma-delimited list of symbols
 *           required: true
 *           type : string
 *       tags:
 *         - StockQuote
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/StockQuoteResponse"
 *         500:
 *           description: error retrieving data
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.get = function(req, res, next) {
    request(processRequest(req, defaultFieldKeys), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = processResponse(body, defaultFieldNames);
            responseHandler.handleSuccess(req, res, next, data, 'quotes');
        } else {
            responseHandler.handleError(req, res, next, error, 'quotes');
        }
    });
};


/**
 * @SwaggerPath
 *   /stocks/quotes/views/{name}:
 *     get:
 *       summary: Get Stock Quote data by view name
 *       description: Get Stock Quote data by view name
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: name
 *           in: path
 *           description: view name
 *           required: true
 *           type : string
 *           enum: ['basic','details','fundamentals','movingAverages','estimates']
 *         - name: symbols
 *           in: query
 *           description: comma-delimited list of symbols
 *           required: true
 *           type : string
 *       tags:
 *         - StockQuote
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/StockQuoteViewResponse"
 *         500:
 *           description: error retrieving data
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.getView = function(req, res, next) {

    // Determine fields to request for the given view
    var fields = stockQuoteFields[req.params.name];
    if (!fields) {
        var error = {
            'status' : 400,
            'message' : 'Valid view names are: basic, fundamentals, details, estimates, movingAverages.'};
        responseHandler.handleError(req, res, next, error,'quotes');
        return;
    }
    var fieldNames = _.keys(fields).join(",");
    var fieldKeys = _.values(fields).join('');
    
    request(processRequest(req, fieldKeys), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = processResponse(body, fieldNames);
            responseHandler.handleSuccess(req, res, next, data, 'quotes');
        } else {
            responseHandler.handleError(req, res, next, error, 'quotes');
        }
    });
};



function processRequest(req, fieldKeys) {
	var options = {
        uri: baseUrl + '?s=' + req.query.symbols + '&f=' + fieldKeys,
        method : 'GET',
        timeout: timeout
    };
	return options;
}

function processResponse(body, fieldNames) {
	var csv = fieldNames + '\n' + body.trim();
    var data = parse.parse(csv, {'header' : true, dynamicTyping: true});
    return data['data'];
}

