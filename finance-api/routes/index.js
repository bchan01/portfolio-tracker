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

// Historical Quote
router
  .route('/stocks/historicalQuotes')
  .get(histQuoteCtrl.get);

// Stock charts
router
  .route('/stocks/charts')
  .get(chartCtrl.get);

// Symbol Lookup
router
  .route('/stocks/symbols')
  .get(symbolLookupCtrl.get);

module.exports = router;
