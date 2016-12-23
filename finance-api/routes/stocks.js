/**
 * Created by bchan on 12/13/2016.
 */
'use strict';

var commonUtils = require('common-api-utils'),
    responseHandler = commonUtils.auditableResponseHandler,
    router  = require('express').Router(),
    request = require("request"),
    quoteService = require('../controllers/stockQuoteController'),
    histQuoteService = require('../controllers/historicalStockQuoteController'),
    chartService = require('../controllers/stockChartController');


router.get('/quotes', function(req, res, next) {
    request(quoteService.processRequest(req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = quoteService.processResponse(body);
            responseHandler.handleSuccess(req, res, next, data, 'quotes');
        } else {
            responseHandler.handleError(req, res, next, error, 'quotes');
        }
    });
});

router.get('/historicalQuotes', function(req, res, next) {
    request(histQuoteService.processRequest(req), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = histQuoteService.processResponse(body);
            responseHandler.handleSuccess(req, res, next, data, 'historical quotes');
        } else {
            responseHandler.handleError(req, res, next, error, 'historical quotes');
        }
    });
});


router.get('/charts', function(req, res, next) {
    request(chartService.processRequest(req))
        .on('error', function(error) {
            responseHandler.handleError(req, res, next, error, 'chart');
        })
        .pipe(res)
});


module.exports = router;