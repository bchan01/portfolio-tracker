var express = require('express');
var router = express.Router();

var stocksCtrl = require('../controllers/stocks.js');

// Stock Quote
router
  .route('/stocks/quotes')
  .get(stocksCtrl.getStockQuote);

// Historical Quote
router
  .route('/stocks/historicalQuotes')
  .get(stocksCtrl.getHistoricalStockQuote);

// Stock charts
router
  .route('/stocks/charts')
  .get(stocksCtrl.getStockChart);

module.exports = router;
