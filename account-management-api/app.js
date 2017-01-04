'use strict';

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/config');
var commonUtils = require('common-api-utils');

// Routes
var routes = require('./routes');

var app = express();

var db = mongoose.connect(config.database);

app.use(initialize.handle); // initialize res.locals object

app.use(logger('dev'));

// Enable parsing of posted forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static directory before defining routes
//app.use(express.static(path.join(__dirname, 'public')));
app.use(config.baseUri + '/docs', express.static('./public/swagger'));

// ------------- add routes here
app.use(config.baseUri, routes);


module.exports = app;
