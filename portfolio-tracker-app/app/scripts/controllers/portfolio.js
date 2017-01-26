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
        //if( index === -1 ) {
       //     alert( "Something gone wrong" );
       // }
       // vm.holdings.splice( index, 1 );	
       if (index === -1) {
           return;
       }
       portfolioService.deleteHolding(vm.portfolio.id, holdingId).then(function(response) {
            if (response.status === 200) {
                vm.message = null;
            } else {
                vm.message = response.message;
            }
        });
        // Reload Holdings
        vm.getHoldings();
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
        console.log('addHolding: ' + JSON.stringify(holding));
        vm.holdings.push(holding);
    }


}