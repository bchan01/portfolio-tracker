var express = require('express');
var router = express.Router();

var config = require('../config/config');
var commonUtils = require('common-api-utils');
var authCheck = commonUtils.tokenValidator.validate(config['jwt']);

var portfoliosCtrl = require('../controllers/portfolios.js');

// Portfolio Routes
router
  .route('/portfolios')
  .get(authCheck, portfoliosCtrl.getAll)
  .post(authCheck, portfoliosCtrl.addOne);

router
  .route('/portfolios/:portfolioId')
  .get(authCheck, portfoliosCtrl.getOne)
  .put(authCheck, portfoliosCtrl.updateOne)
  .delete(authCheck, portfoliosCtrl.deleteOne);

module.exports = router;
