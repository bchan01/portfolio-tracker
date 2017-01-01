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

module.exports.getStockChart = function(req, res, next) {
    request(chartProcessor.processRequest(req))
        .on('error', function(error) {
            responseHandler.handleError(req, res, next, error, 'chart');
        })
        .pipe(res)
};