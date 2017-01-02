var Q               = require('q'),
    mongoose = require('mongoose'),
     _ = require('lodash')
    portfolio = require('../models/portfolio');

module.exports.getAll = function(portfolioId) {
    var defer = Q.defer();
    Q.ninvoke(portfolio, 'findById', portfolioId)
        .then(function(dbObj) {
            if (!dbObj) {
                defer.reject({status: 404, message: 'Porfolio not found.'});
            }
            var holdings = dbObj.holdings ? dbObj.holdings : []
            defer.resolve(holdings);
        })
        .fail(function(err) {
            defer.reject(err);
        });
    return defer.promise;
};

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
            if (!holding) {
                defer.reject({status: 404, message: 'Holding not found.'});
            }
            defer.resolve(holding);
        })
        .fail(function(err) {
            defer.reject(err);
        });
    return defer.promise;
};

var parseHoldingInput = function(data) {
    var holding = { };
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
        holding['tradeDate'] = data.tradeDate;
    }
    return holding;
};

module.exports.add = function(portfolioId, data) {
    var defer = Q.defer();
    var holding = parseHoldingInput(data);
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
module.exports.update = function(portfolioId, holdingId, data) {
    var defer = Q.defer();
    var holding = parseHoldingInput(data);
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

module.exports.deleteOne = function(portfolioId, holdingId) {
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

