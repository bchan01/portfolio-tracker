var express = require('express');
var router = express.Router();

var config = require('../config/config');
var commonUtils = require('common-api-utils');
var authCheck = commonUtils.tokenValidator.validate(config['jwt']);

var portfoliosCtrl = require('../controllers/portfoliosController');
var holdingsCtrl = require('../controllers/holdingsController');

// Portfolio Routes
router
  .route('/portfolios')
  .get(authCheck, portfoliosCtrl.getAll)
  .post(authCheck, portfoliosCtrl.add);

router
  .route('/portfolios/:portfolioId')
  .get(authCheck, portfoliosCtrl.getById)
  .put(authCheck, portfoliosCtrl.update)
  .delete(authCheck, portfoliosCtrl.delete);

// Holding Routes
router
  .route('/portfolios/:portfolioId/holdings')
  .get(authCheck, holdingsCtrl.getAll)
  .post(authCheck, holdingsCtrl.add);

router
  .route('/portfolios/:portfolioId/holdings/:holdingId')
  .get(authCheck, holdingsCtrl.getById)
  .put(authCheck, holdingsCtrl.update)
  .delete(authCheck, holdingsCtrl.delete);

module.exports = router;
