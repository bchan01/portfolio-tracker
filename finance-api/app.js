'use strict';

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config');

// Routes
var routes = require('./routes');

/**
 * @SwaggerHeader
 * info:
 *   title: Finance API
 *   version: 1.0.0
 *   description: Provide Financial Data
 * basePath: /finance/api
 */

var app = express();

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
