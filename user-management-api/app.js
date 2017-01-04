'use strict';

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');

// Routes
var routes = require('./routes');

/**
 * @SwaggerHeader
 * info:
 *   title: User Management API
 *   version: 1.0.0
 *   description: Manage Users
 * basePath: /user-management/api
 */

var app = express();

// connect to mongo db
var db = mongoose.connect(config.database);

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
