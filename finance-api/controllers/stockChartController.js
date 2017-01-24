'use strict';

var config = require('../config/config'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.responseHandler,
    request = require("request");

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.chartUrl;

const type = {
	"line" : "l",
	"bar" : "b",
	"candle" : "c"
}

const size = {
	"small" : "s",
	"medium" : "m",
	"large" : "l"
}

const scale = {
	"arithmetic" : "off",
	"logarithmic" : "on"
}

const range = {
	"1d" : "1d",
	"5d" : "5d",
	"3m" : "3m",
	"6m" : "6m",
	"ytd" : "ytd",
	"1y" : "1y",
	"2y" : "2y",
	"5y" : "5y",
	"10y" : "10y",
	"max" : "my"
}

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
module.exports.get = function(req, res, next) {
    request(processRequest(req))
        .on('error', function(error) {
            responseHandler.handleError(req, res, next, error, 'chart');
        })
        .pipe(res)
};


function processRequest(req) {
	 var options = {
        uri: baseUrl + buildQueryParams(req),
        method : 'GET',
        timeout: timeout
    };
	return options;
}

function buildQueryParams(req) {

	var query = '?s=' + req.query.symbol;

	// Time Range
	if (req.query.range) {
		query += '&t=' + range[req.query.range];
    }
    // Type - Line("l"), Bar("b"), Candle("c");
    if (req.query.type) {
		query += '&q=' + type[req.query.type];
    }
	// Scale - arithmetic, logarithmic
	if (req.query.scale) {
		query += '&l=' + scale[req.query.scale];
	}
	// Size - small, medium, large
	if (req.query.size) {
		query += '&z=' + size[req.query.size];
	}
	//Compare symbol
	if (req.query.compare) {
		query += '&c=' + req.query.compare;
	}

	return query;

}


/**
 * @SwaggerPath
 *   /stocks/charts/url:
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
module.exports.getURL = function(req, res, next) {
    var imageUrl = processRequest(req).uri;
  	responseHandler.handleSuccess(req, res, next, imageUrl, 'charts');
};