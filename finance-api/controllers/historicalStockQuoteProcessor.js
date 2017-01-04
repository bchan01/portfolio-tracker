'use strict';

 var parse = require('papaparse'),
    config = require('../config/config');

module.exports = {
    processRequest : processRequest,
    processResponse : processResponse
};

const timeout = config.financeAPI.requestTimeout;
const baseUrl = config.financeAPI.histQuoteUrl;
// Daily 12/12/1980 - 12/14/2016
//http://chart.finance.yahoo.com/table.csv?s=AAPL&a=11&b=12&c=1980&d=11&e=14&f=2016&g=d&ignore=.csv
var HIST_QUOTE_FREQ = {
    "daily" : "d",
    "weekly" : "w",
    "monthly" : "m"
};
const HIST_QUOTE_CSV_HEADERS = 'Date,Open,High,Low,Close,Volume,Adj Close';
const HIST_QUOTE_JSON_FIELDS = 'date,open,high,low,close,volume,adjustedClose';

function processRequest(req) {
	var symbol = req.query.symbol;
    var startDate = req.query.startDate; //mm-dd-yyyy
    var endDate = req.query.endDate; //mm-dd-yyyy
    var frequency = req.query.frequency; //daily,weekly,monthly
    var options = {
        uri: baseUrl + '?s=' + symbol + '&' + buildDateQueryForHistQuote(startDate,endDate) 
            + '&g=' + HIST_QUOTE_FREQ[frequency] + '&ignore=.csv',
        method : 'GET',
        timeout: timeout
    };
    return options;
}

function buildDateQueryForHistQuote(startDate, endDate) {
    var startDateParts = startDate.split('-'); //mm-dd-yyyy
    var endDateParts = endDate.split('-'); //mm-dd-yyyy
    var query = 'a=' + (startDateParts[0] -1) + '&b=' + startDateParts[1] + '&c=' + startDateParts[2]
       + '&d=' + (endDateParts[0] -1) + '&e=' + endDateParts[1] + '&f=' + endDateParts[2];
    return query;
}

function processResponse(body) {
	var csv = body.trim();
    csv = csv.replace(HIST_QUOTE_CSV_HEADERS , HIST_QUOTE_JSON_FIELDS);
    var data = parse.parse(csv, {'header' : true, dynamicTyping: true});
    return data['data'];
}