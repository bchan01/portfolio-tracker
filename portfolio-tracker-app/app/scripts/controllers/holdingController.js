'use strict';
angular.module('portfolioTrackerApp').controller('HoldingController', HoldingController);

function HoldingController($http, $location, portfolioService, holdingService) {
    var vm = this;
    vm.portfolios = [];
    vm.holdings = [];
    vm.message = null;
    vm.portfolio = null;

    // Load portfolios for existing user
    console.log('HoldingController entered, loading portfolios for current user');
    loaddPortfolios();

    /**
     * Load Holdings for selected portfolio
     */
    vm.handlePortfolioChange = function() {
        getHoldingsByPortfolioId(vm.portfolio.id);
    }

    /**
     * Refresh Holdings for selected portfolio
     */
    vm.refreshHoldings = function(portfolioId) {
        getHoldingsByPortfolioId(portfolioId);
    }

    /**
     * Loads portfolios for the curret user
     */
    function loaddPortfolios() {
        portfolioService.getPortfolios().then(function(response) {
            console.log('PortfolioController.loaddPortfolios()');
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
    }

    /**
     * Load holdings for a given portfolio Id
     */
    function getHoldingsByPortfolioId(portfolioId) {
        vm.holdings = [];
        vm.message = null;
        console.log('getHoldings for portfolio: ' + portfolioId);
        holdingService.getHoldings(portfolioId).then(function(response) {
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
            holdingService.deleteHolding(vm.portfolio.id, holdingId).then(function(response) {
                    if (response.status === 200) {
                        // Reload Holdings
                        console.log('holding removed, reloading holdings for portfolio with name' + vm.portfolio.name);
                        getHoldingsByPortfolioId(vm.portfolio.id);
                    } else {
                        vm.message = response.message;
                    }
            });
        }
    }

    /**
     * Add new holding to a portfolio
     */
    vm.addHolding = function(isValid) {
        if (isValid) {
            vm.message = null;
            var holding = {
                'symbol' : vm.symbol,
                'description' :  vm.description,
                'shares' : vm.shares,
                'purchasePrice' : vm.purchasePrice,
                'tradeDate' : vm.tradeDate,
                'commission' : vm.commission
            }
            holdingService.addHolding(vm.portfolio.id, holding).then(function(response) {
                if (response.status === 201) {
                    console.log('holding added, reloading holdings for portfolio with name:' + vm.portfolio.name);
                    // Reload Holdings
                    getHoldingsByPortfolioId(vm.portfolio.id);
                } else {
                    vm.message = response.message;
                }
            }); 
        }
    }

    /**
     * Redirect to Portfolio views
     */
    vm.gotoPortfolioRoute = function(action, id, name) {
        var routePath = '/portfolio/' + action;
        if (id) {
            routePath += '/' + id;
        } 
        if (name) {
            routePath += '/' + name;
        }
        console.log('HoldingController.gotoPortfolioRoute() with path:' + routePath);
        $location.path(routePath);
    }

}