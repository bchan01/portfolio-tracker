/**
 * Created by bchan on 12/13/2016.
 */
'use strict';

var commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    router  = require('express').Router(),
    request = require("request"),
    quoteProcessor = require('./stockQuoteProcessor'),
    histQuoteProcessor = require('./historicalStockQuoteProcessor'),
    chartProcessor = require('./stockChartProcessor');

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
module.exports.getStockQuote = function(req, res, next) {
    request(quoteProcessor.processRequest(req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = quoteProcessor.processResponse(body);
            responseHandler.handleSuccess(req, res, next, data, 'quotes');
        } else {
            responseHandler.handleError(req, res, next, error, 'quotes');
        }
    });
};

/**
 * @SwaggerDefinitions
 *   HistQuoteItem:
 *     type: object
 *     properties:
 *       date:
 *         type: string
 *       open:
 *         type: number
 *         format: double
 *       high:
 *         type: number
 *         format: double
 *       low:
 *         type: number
 *         format: double
 *       close:
 *         type: number
 *         format: double
 *       volumne:
 *         type: number
 *         format: double
 *       adjustedClose:
 *         type: number
 *         format: double
 */

/**
 * @SwaggerDefinitions
 *   HistQuoteResponse:
 *     type: object
 *     properties:
 *       outcome:
 *         type: object
 *         $ref: "#/definitions/Outcome"
 *       data:
 *         type: array
 *         items:
 *           $ref: "#/definitions/HistQuoteItem"
 */

/**
 * @SwaggerPath
 *   /stocks/historicalQuotes:
 *     get:
 *       summary: Get Historical Stock Quotes
 *       description: Get Historical Stock Quotes for a given symbol
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: symbol
 *           in: query
 *           description: symbol
 *           required: true
 *           type : string
 *         - name: startDate
 *           in: query
 *           description: start date in the format of mm-dd-yyyy
 *           required: true
 *           type : string
 *         - name: endDate
 *           in: query
 *           description: end date in the format of mm-dd-yyyy
 *           required: true
 *           type : string
 *         - name: frequency
 *           in: query
 *           description: data frequency 
 *           required: false
 *           type: string
 *           enum: ['daily', 'weekly','monthly']
 *       tags:
 *         - HistoricalQuote
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/HistQuoteResponse"
 *         500:
 *           description: error retrieving data
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.getHistoricalStockQuote  = function(req, res, next) {
    request(histQuoteProcessor.processRequest(req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = histQuoteProcessor.processResponse(body);
            responseHandler.handleSuccess(req, res, next, data, 'historical quotes');
        } else {
            responseHandler.handleError(req, res, next, error, 'historical quotes');
        }
    });
};

/**
 * @SwaggerPath
 *   /stocks/charts:
 *     get:
 *       summary: Get Stock Price Chart
 *       description: Get Stock Price Chart for a given symbol
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: symbol
 *           in: query
 *           description: symbol
 *           required: true
 *           type : string
 *         - name: range
 *           in: query
 *           description: time range
 *           required: false
 *           type : string
 *           enum: ['1d','5d','3m','6m','ytd','1y','2y','5y','10y','max']
 *         - name: type
 *           in: query
 *           description: chart type
 *           required: false
 *           type : string
 *           enum: ['line','bar','candle']
 *         - name: scale
 *           in: query
 *           description: chart scale 
 *           required: false
 *           type: string
 *           enum: ['arithmetic', 'logarithmic']
 *         - name: size
 *           in: query
 *           description: chart size
 *           required: false
 *           type: string
 *           enum: ['small', 'medium','large']
 *         - name: compare
 *           in: query
 *           description: comma-delimited list of symbols to compare to
 *           required: false
 *           type : string
 *       tags:
 *         - StockChart
 *       responses:
 *         200:
 *           description: Successful operation
 *         500:
 *           description: error retrieving data
 */
module.exports.getStockChart = function(req, res, next) {
    request(chartProcessor.processRequest(req))
        .on('error', function(error) {
            responseHandler.handleError(req, res, next, error, 'chart');
        })
        .pipe(res)
};