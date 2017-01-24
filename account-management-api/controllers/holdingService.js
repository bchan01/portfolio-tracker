/**
 * Created by bchan on 12/31/2016.
 */
var Q               = require('q'),
    mongoose = require('mongoose'),
     _ = require('lodash'),
     moment = require('moment'),
    portfolio = require('../models/portfolio'),
    request = require("request"),
    quoteProcessor = require('./stockQuoteProcessor');

/**
 *  Get all holdings belonging to a Portfolio
 */
module.exports.getAll = function(portfolioId) {
    var defer = Q.defer();
    Q.ninvoke(portfolio, 'findById', portfolioId)
        .then(function(dbObj) {
            if (!dbObj) {
                defer.reject({status: 404, message: 'Porfolio not found.'});
            }
            var holdings = dbObj.holdings ? dbObj.holdings : [];
            return calculateHoldingGains(holdings);
        })
        .then(function(holdings) {
            if (!holdings  || holdings.length < 1) {
                defer.reject({status: 404, message: 'Holdings not found.'});
            } else {
                defer.resolve(holdings);
            }
        })
        .fail(function(err) {
            defer.reject(err);
        });
    return defer.promise;
};

/**
 * Get a Holding by Id
 */
module.exports.getById = function(portfolioId, holdingId) {
    var defer = Q.defer();
    Q.ninvoke(portfolio, 'findById', portfolioId)
        .then(function(dbObj) {
            if (!dbObj) {
                defer.reject({status: 404, message: 'Porfolio not found.'});
            }
            if (!dbObj.holdings) {
                defer.reject({status: 404, message: 'Holding not found.'});
            }
            var holding = dbObj.holdings.id(holdingId);
            if (holding) {
                return calculateHoldingGains([holding]);
            } else {
                return calculateHoldingGains([]);
            }
        })
        .then(function(holdings) {
           if (!holdings  || holdings.length < 1) {
                defer.reject({status: 404, message: 'Holdings not found.'});
            } else {
                defer.resolve(holdings[0]);
            }
        })
        .fail(function(err) {
            defer.reject(err);
        });
    return defer.promise;
};

/**
 * Add a new Holding to a given Portfolio
 */
module.exports.add = function(portfolioId, holding) {
    var defer = Q.defer();
    Q.ninvoke(portfolio, 'findById', portfolioId)
        .then(function(dbObj) {
            if (!dbObj) {
                defer.reject({status: 404, message: 'Porfolio not found.'});
            }
            if (!dbObj.holdings) {
                dbObj.holdings = [];
            }
            dbObj.holdings.push(holding);
            dbObj.save( function(err, result) {
                if(err) {
                    defer.reject(err);
                }
                defer.resolve(result.holdings[result.holdings.length - 1]);
            });
        })
        .fail(function(err) {
            defer.reject(err);
        });
    return defer.promise;
};

/**
 * Update an existing Holding within a Portfolio
 */
module.exports.update = function(portfolioId, holdingId, holding) {
    var defer = Q.defer();
    Q.ninvoke(portfolio, 'findById', portfolioId)
        .then(function(dbObj) {
            if (!dbObj) {
                defer.reject({status: 404, message: 'Porfolio not found.'});
            }
            if (!dbObj.holdings) {
                defer.reject({status: 404, message: 'Holding not found.'});
            }
            var currentHolding = dbObj.holdings.id(holdingId);
            if (!currentHolding) {
                defer.reject({status: 404, message: 'Holding not found.'});
            }
            for(var key in holding) {
                if (key !== "_id") { // don't update _id field
                    currentHolding[key] = holding[key];
                }
            }
            dbObj.save( function(err, result) {
                if(err) {
                    defer.reject(err);
                }
                defer.resolve(result.holdings.id(holdingId));
            });
        })
        .fail(function(err) {
            defer.reject(err);
        });
    return defer.promise;
};

/**
 * Delete an existing Holding within a Portfolio
 */
module.exports.delete = function(portfolioId, holdingId) {
    var defer = Q.defer();
    Q.ninvoke(portfolio, 'findById', portfolioId)
        .then(function(dbObj) {
            if (!dbObj) {
                defer.reject({status: 404, message: 'Porfolio not found.'});
            }
            if (!dbObj.holdings) {
                defer.reject({status: 404, message: 'Holding not found.'});
            }
            var currentHolding = dbObj.holdings.id(holdingId);
            if (!currentHolding) {
                defer.reject({status: 404, message: 'Holding not found.'});
            }
            // filter out holding with matching id
            var newHoldingList = _.filter(dbObj.holdings, function(currentObject) {
              return currentObject['_id'].toHexString() !== holdingId;
            });
            dbObj.holdings = newHoldingList;
            dbObj.save( function(err, result) {
                if(err) {
                    defer.reject(err);
                }
                defer.resolve(currentHolding);
            });
        })
        .fail(function(err) {
            defer.reject(err);
        });
    return defer.promise;
};

/**
 * Calculates Gain/Loss (based on current trade price) for each holding within a portfolio.
 */
var calculateHoldingGains = function(holdings) {
    var defer = Q.defer();
    if (!holdings || holdings.length < 1) {
         defer.resolve([]);
    } else {
        var symbols = _.map(holdings, 'symbol').join(',');
        
        request(quoteProcessor.processRequest(symbols), function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var stockQuotes = quoteProcessor.processResponse(body);
                // Build map of stock price keyed by symbol
                var priceBySymbol = _.zipObject(_.pluck(stockQuotes, 'symbol'), _.pluck(stockQuotes, 'price'));
                var changeBySymbol = _.zipObject(_.pluck(stockQuotes, 'symbol'), _.pluck(stockQuotes, 'change'));
                // Populate holdings ....
                var holdingValues  = [];
                holdings.forEach( function (holding) {
                    holding['change'] = changeBySymbol[holding.symbol];
                    var price = priceBySymbol[holding.symbol];
                    holding['price'] = parseFloat(price).toFixed(2);
                    holding['marketValue'] = (holding.shares * holding.price).toFixed(2);
                    holding['cost'] = (holding.shares * holding.purchasePrice + holding.commission).toFixed(2);
                    holding['gain'] = (holding.marketValue - holding.cost).toFixed(2);
                    holdingValues.push(holding);
                });
                console.log('calculateHoldingGains - in: ' + holdings.length + ',out:' + holdingValues.length);
                defer.resolve(holdingValues);
            } else {
                console.log('calculateHoldingGains - Error retrieving quotes: ' + JSON.stringify(error));
                defer.reject({status: 500, message: 'error retrieving stock quotes'});
            }
        });
    }
    return defer.promise;
};


/**
 * Helper function to parse holding creation and update input
 */
module.exports.parseHoldingInput = function(data) {
    var defer = Q.defer();
    var holding = { };
    var errors = [];
    if (data.symbol) {
        holding['symbol'] = data.symbol;
    }
    if (data.description) {
        holding['description'] = data.description;
    }
    if (data.shares) {
        holding['shares'] = data.shares;
    }
    if (data.purchasePrice) {
        holding['purchasePrice'] = data.purchasePrice;
    }
    if (data.commission) {
        holding['commission'] = data.commission;
    }
    if (data.tradeDate) {
        var tradeDate =  moment(data.tradeDate, 'YYYY-MM-DD');
        if (!tradeDate.isValid()) {
            errors.push({message : 'Invalid format for trade date (YYYY-MM-DD)', name : 'tradeDate'});
        } else {
            holding['tradeDate'] = tradeDate.format('YYYY-MM-DD');
        }
    }
    if (errors.length > 0) {
         defer.reject({status : 400, message : 'Invalid Input parameter(s)', errors : errors});
    } else {
        defer.resolve(holding);
    }
   
    return defer.promise;
};