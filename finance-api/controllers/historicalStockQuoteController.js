'use strict';

 var parse = require('papaparse'),
 	config = require('../config/config'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    request = require("request");

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.histQuoteUrl;
// Daily 12/12/1980 - 12/14/2016
//http://chart.finance.yahoo.com/table.csv?s=AAPL&a=11&b=12&c=1980&d=11&e=14&f=2016&g=d&ignore=.csv
var HIST_QUOTE_FREQ = {
    "daily" : "d",
    "weekly" : "w",
    "monthly" : "m"
};
const HIST_QUOTE_CSV_HEADERS = 'Date,Open,High,Low,Close,Volume,Adj Close';
const HIST_QUOTE_JSON_FIELDS = 'date,open,high,low,close,volume,adjustedClose';



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
module.exports.get  = function(req, res, next) {
    request(processRequest(req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = processResponse(body);
            responseHandler.handleSuccess(req, res, next, data, 'historical quotes');
        } else {
            responseHandler.handleError(req, res, next, error, 'historical quotes');
        }
    });
};

function processRequest(req) {
	var symbol = req.query.symbol;
    var startDate = req.query.startDate; //mm-dd-yyyy
    var endDate = req.query.endDate; //mm-dd-yyyy
    var frequency = req.query.frequency; //daily,weekly,monthly
    var options = {
        uri: baseUrl + '?s=' + symbol + '&' + buildDateQueryForHistQuote(startDate,endDate) 
            + '&g=' + HIST_QUOTE_FREQ[frequency] + '&ignore=.csv',
        method : 'GET',
        timeout: timeout
    };
    return options;
}

function buildDateQueryForHistQuote(startDate, endDate) {
    var startDateParts = startDate.split('-'); //mm-dd-yyyy
    var endDateParts = endDate.split('-'); //mm-dd-yyyy
    var query = 'a=' + (startDateParts[0] -1) + '&b=' + startDateParts[1] + '&c=' + startDateParts[2]
       + '&d=' + (endDateParts[0] -1) + '&e=' + endDateParts[1] + '&f=' + endDateParts[2];
    return query;
}

function processResponse(body) {
	var csv = body.trim();
    csv = csv.replace(HIST_QUOTE_CSV_HEADERS , HIST_QUOTE_JSON_FIELDS);
    var data = parse.parse(csv, {'header' : true, dynamicTyping: true});
    return data['data'];
}