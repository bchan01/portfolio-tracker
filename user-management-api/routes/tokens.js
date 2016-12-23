'use strict';

var  express = require('express'),
    router 			= express.Router(),
     commonUtils = require('common-api-utils'),
     responseHandler = commonUtils.auditableResponseHandler,
     config       = require('../config/config'),
     Q = require('q'),
     path = require('path');

var service = new  commonUtils.DataService(path.join(__dirname, '../models'),'user', 'User');
var tokenService = new  commonUtils.JWTTokenService(config['jwt']);
var domainName = 'Token';

router.get('/', function(req, res, next) {
  var passwd = req.query.userPassword;
  service.get({'username' : req.query.username})
    .then( function(data) {
        return tokenService.authenticate(data, passwd);
    }).then(function(data) {
      var responseData = { token : data, username: req.query.username};
      res.locals.message = 'authenticated successfully';
      responseHandler.handleSuccess(req, res, next, responseData, domainName);
    }).fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
});

router.post('/', function(req, res, next) {
  var passwd = req.body.userPassword;
  service.get({'username' : req.body.username})
    .then( function(data) {
        return tokenService.authenticate(data, passwd);
    }).then(function(data) {
      var responseData = { token : data, username: req.body.username};
      res.locals.message = 'authenticated successfully';
      responseHandler.handleSuccess(req, res, next, responseData, domainName);
    }).fail(function (error) {
      responseHandler.handleError(req, res, next, error, domainName);
    })
    .done();
});


module.exports = router;