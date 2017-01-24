'use strict';
angular.module('portfolioTrackerApp').controller('PortfolioController', PortfolioController);

function PortfolioController($http, portfolioService) {
  var vm = this;
  vm.portfolios = [];
  vm.message = null;
  portfolioService.getPortfolios().then(function(response) {
    console.log(response);
    if (response.status === 200) {
        vm.portfolios = response.data;
    } else {
        vm.portfolios = [];
        vm.message = response.message;
    }
  });

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
  
}