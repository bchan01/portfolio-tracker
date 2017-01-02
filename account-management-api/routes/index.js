var express = require('express');
var router = express.Router();

var config = require('../config/config');
var commonUtils = require('common-api-utils');
var authCheck = commonUtils.tokenValidator.validate(config['jwt']);

var portfoliosCtrl = require('../controllers/portfolios');
var holdingsCtrl = require('../controllers/holdings');

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
