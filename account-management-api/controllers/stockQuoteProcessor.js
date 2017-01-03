/**
 * Created by bchan on 1/2/2017.
 */
'use strict';
 
 var parse = require('papaparse'),
 	config = require('../config/config');

module.exports = {
    processRequest : processRequest,
    processResponse : processResponse
};

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.quoteUrl;
const fieldKeys = config.financeAPI.quoteFields.keys;
const fieleNames = config.financeAPI.quoteFields.names;


function processRequest(symbols) {
	var options = {
        uri: baseUrl + '?s=' + symbols + '&f=' + fieldKeys,
        method : 'GET',
        timeout: timeout
    };
	return options;
}

function processResponse(body) {
	var csv = fieleNames + '\n' + body.trim();
    var data = parse.parse(csv, {'header' : true, dynamicTyping: true});
    return data['data'];
}