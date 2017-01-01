var express = require('express');
var router = express.Router();

var config = require('../config/config');
var commonUtils = require('common-api-utils');
var authCheck = commonUtils.tokenValidator.validate(config['jwt']);


var tokensCtrl = require('../controllers/tokens.js');
var usersCtrl = require('../controllers/users.js');

// Token Routes
router
  .route('/tokens')
  .get(tokensCtrl.tokenGet)
  .post(tokensCtrl.tokenPost);

// User Routes
router
  .route('/users')
  .get(usersCtrl.getAll)
  .post(authCheck, usersCtrl.addOne);
  
router
  .route('/users/:username')
  .get(usersCtrl.getByUsername)
  .put(authCheck, usersCtrl.updateByUsername)
  .delete(authCheck, usersCtrl.deleteByUsername);

module.exports = router;
