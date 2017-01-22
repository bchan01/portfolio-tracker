var express = require('express');
var router = express.Router();

var stockQuoteCtrl = require('../controllers/stockQuoteController');
var histQuoteCtrl = require('../controllers/historicalStockQuoteController');
var chartCtrl = require('../controllers/stockChartController');
var symbolLookupCtrl = require('../controllers/symbolLookupController');

// Stock Quote
router
  .route('/stocks/quotes')
  .get(stockQuoteCtrl.get);
router
  .route('/stocks/quotes/views/:name')
  .get(stockQuoteCtrl.getView);

// Historical Quote
router
  .route('/stocks/historicalQuotes')
  .get(histQuoteCtrl.get);

// Stock charts
router
  .route('/stocks/charts')
  .get(chartCtrl.get);
router
  .route('/stocks/charts/url')
  .get(chartCtrl.getURL);

// Symbol Lookup
router
  .route('/stocks/symbols')
  .get(symbolLookupCtrl.get);

module.exports = router;
