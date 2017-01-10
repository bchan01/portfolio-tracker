'use strict';
 
 var config = require('../config/config'),
    commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    request = require("request"),
     _ = require('lodash');

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.symbolLookupUrl;

/**
 * @SwaggerDefinitions
 *   SymbolInfo:
 *     type: object
 *     properties:
 *       symbol:
 *         type: string
 *       name:
 *         type: string
 *       typeCode:
 *         type: string
 *       type:
 *         type: string
 *       exchangeCode:
 *         type: string
 *       exchange:
 *         type: string
 */

/**
 * @SwaggerDefinitions
 *   SymbolLookupResponse:
 *     type: object
 *     properties:
 *       outcome:
 *         type: object
 *         $ref: "#/definitions/Outcome"
 *       data:
 *         type: array
 *         items:
 *           $ref: "#/definitions/SymbolInfo"
 */

/**
 * @SwaggerPath
 *   /stocks/symbols:
 *     get:
 *       summary: Lookup symbol
 *       description: Lookup symbol(s) by name
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: name
 *           in: query
 *           description: name of the stock, mutual fund, index, etc.
 *           required: true
 *           type : string
 *       tags:
 *         - SymbolLookup
 *       responses:
 *         200:
 *           description: Successful operation
 *           schema:
 *             $ref: "#/definitions/SymbolLookupResponse"
 *         500:
 *           description: error retrieving data
 *           schema:
 *             $ref: "#/definitions/Response"
 */
module.exports.get = function(req, res, next) {
    request(processRequest(req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = processResponse(body);
            responseHandler.handleSuccess(req, res, next, data, 'symbols');
        } else {
            responseHandler.handleError(req, res, next, error, 'symbols');
        }
    });
};

function processRequest(req) {
	var options = {
        uri: baseUrl + '&query=' + req.query.name,
        method : 'GET',
        timeout: timeout
    };
	return options;
}

function processResponse(body) {
    if (!body) {
        return [];
    }
	var rawResponse =JSON.parse(body);
     //Sample Output:
     /* {"ResultSet": {
            "Query": "VBINX",
            "Result": [
                {
                    "symbol": "VBINX",
                    "name": "Vanguard Balanced Index Inv",
                    "exch": "NAS",
                    "type": "M",
                    "exchDisp": "NASDAQ",
                    "typeDisp": "Fund"
                }
            ]
        } }
     */
    console.log(rawResponse['ResultSet']['Result']);
    var results = [];
    if (rawResponse['ResultSet'] && rawResponse['ResultSet']['Result']) {
        _.forEach(rawResponse['ResultSet']['Result'], function(result){
            var symbolInfo = {
                'symbol' : result['symbol'],
                'name' : result['name'],
                'typeCode' : result['type'],
                'type' : result['typeDisp'],
                'exchangeCode' : result['exch'],
                'exchange' : result['exchDisp']
            };
            results.push(symbolInfo);
    })};
    return results;
}

