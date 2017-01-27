'use strict';
angular.module('portfolioTrackerApp').controller('PortfolioController', PortfolioController);

function PortfolioController($http, portfolioService) {
    var vm = this;
    vm.portfolios = [];
    vm.holdings = [];
    vm.message = null;
    vm.portfolio = null;

    portfolioService.getPortfolios().then(function(response) {
        console.log('PortfolioController.getPortfolios()');
        console.log(response);
        if (response.status === 200) {
            vm.portfolios = response.data;
            console.log('portfolio found - count:' + vm.portfolios.length);
        } else {
            vm.portfolios = [];
            vm.message = response.message;
            console.log('portfolio not found - count:' + vm.portfolios.length);
        }
    });

    function success(response) {
        console.log('portfolioService Success - status:' + response.status);
        console.log(response);
        return {status : response.status , data : response.data.data};
     }

    function error(response) {
        console.log('portfolioService Error - status:' + response.status);
        console.log(response);
        var res = {status: response.status};
        if (response.data.outcome) {
        if (response.data.outcome.message) {
            res.message = response.data.outcome.message;
        }
        if (response.data.outcome.errors) {
            res.errors = response.data.outcome.errors;
        }
        }
        return res;
    }

    /**
     * Load Holdings for selected portfolio
     */
    vm.getHoldings = function() {
        vm.holdings = [];
        vm.message = null;
        console.log('getHoldings for portfolio: ' + vm.portfolio.id);
        portfolioService.getHoldings(vm.portfolio.id).then(function(response) {
            if (response.status === 200) {
                vm.holdings = response.data
            } else {
                vm.holdings = [];
                vm.message = response.message;
            }
        });
    }

    function loadHolding(portfolioId) {
        vm.holdings = [];
        vm.message = null;
        console.log('getHoldings for portfolio: ' + portfolioId);
        portfolioService.getHoldings(portfolioId).then(function(response) {
            if (response.status === 200) {
                vm.holdings = response.data
            } else {
                vm.holdings = [];
                vm.message = response.message;
            }
        });
    }

    /**
     * Delete selected holding
     */
    vm.removeHolding = function(holdingId) {
        vm.message = null;
        console.log('removeHolding for id: ' + holdingId);
        var index = -1;		
        for( var i = 0; i < vm.holdings.length; i++ ) {
            if( vm.holdings[i]._id === holdingId ) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            portfolioService.deleteHolding(vm.portfolio.id, holdingId).then(function(response) {
                    if (response.status === 200) {
                        // Reload Holdings
                        console.log('holding removed, reloading holdings for portfolio:' + vm.portfolio.name);
                        loadHolding(vm.portfolio.id);
                    } else {
                        vm.message = response.message;
                    }
            });
        }
    }

    /**
     * Add new holding to a portfolio
     */
    vm.addHolding = function(result) {
        vm.message = null;
        var holding = {
            'symbol' : vm.symbol,
            'description' :  vm.description,
            'shares' : vm.shares,
            'purchasePrice' : vm.purchasePrice,
            'tradeDate' : vm.tradeDate,
            'commission' : vm.commission
        }
        portfolioService.addHolding(vm.portfolio.id, holding).then(function(response) {
            if (response.status === 201) {
                 console.log('holding added, reloading holdings for portfolio:' + vm.portfolio.name);
                // Reload Holdings
                loadHolding(vm.portfolio.id);
            } else {
                vm.message = response.message;
            }
        });
       
    }


}