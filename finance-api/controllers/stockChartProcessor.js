'use strict';

 var config = require('../config/config');

module.exports = {
    processRequest : processRequest
};

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.chartUrl;

const type = {
	"line" : "l",
	"bar" : "b",
	"candle" : "c"
}

const size = {
	"small" : "s",
	"medium" : "m",
	"large" : "l"
}

const scale = {
	"arithmetic" : "off",
	"logarithmic" : "on"
}

const range = {
	"1d" : "1d",
	"5d" : "5d",
	"3m" : "3m",
	"6m" : "6m",
	"ytd" : "ytd",
	"1y" : "1y",
	"2y" : "2y",
	"5y" : "5y",
	"10y" : "10y",
	"max" : "my"
}

function processRequest(req) {
	 var options = {
        uri: baseUrl + buildQueryParams(req),
        method : 'GET',
        timeout: timeout
    };
	return options;
}


function buildQueryParams(req) {

	var query = '?s=' + req.query.symbol;

	// Time Range
	if (req.query.range) {
		query += '&t=' + range[req.query.range];
    }
    // Type - Line("l"), Bar("b"), Candle("c");
    if (req.query.type) {
		query += '&q=' + type[req.query.type];
    }
	// Scale - arithmetic, logarithmic
	if (req.query.scale) {
		query += '&l=' + scale[req.query.scale];
	}
	// Size - small, medium, large
	if (req.query.size) {
		query += '&z=' + size[req.query.size];
	}
	//Compare symbol
	if (req.query.compare) {
		query += '&c=' + req.query.compare;
	}

	return query;

}