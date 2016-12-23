'use strict';
 
 var parse = require('papaparse'),
 	config = require('../config/config');

module.exports = {
    processRequest : processRequest,
    processResponse : processResponse
};

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.quoteUrl;
const fieldKeys = 'snxl1d1t1baopc1p2hgkjv';
const fieleNames = 'symbol,name,Stock Exchange,price,date,time,bid,ask,open,previousClose,change,changePercent,daysHigh,daysLow,high52Weeks,low52Weeks,volume';


function processRequest(req) {
	var options = {
        uri: baseUrl + '?s=' + req.query.symbols + '&f=' + fieldKeys,
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