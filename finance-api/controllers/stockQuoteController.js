'use strict';
 
 var parse = require('papaparse'),
 	config = require('../config/config'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    request = require("request");

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.quoteUrl;
const fieldKeys = config.financeAPI.quoteFields.keys;
const fieleNames = config.financeAPI.quoteFields.names;

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
    request(processRequest(req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = processResponse(body);
            responseHandler.handleSuccess(req, res, next, data, 'quotes');
        } else {
            responseHandler.handleError(req, res, next, error, 'quotes');
        }
    });
};

function processRequest(req) {
	var options = {
        uri: baseUrl + '?s=' + req.query.symbols + '&f=' + fieldKeys,
        method : 'GET',
        timeout: timeout
    };
	return options;
}

function processResponse(body) {
	var csv = fieleNames + '\n' + body.trim();
    var data = parse.parse(csv, {'header' : true, dynamicTyping: true});
    return data['data'];
}

