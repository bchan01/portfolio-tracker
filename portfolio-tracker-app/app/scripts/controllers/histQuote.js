'use strict';
angular.module('portfolioTrackerApp').controller('HistQuoteController', HistQuoteController);

function HistQuoteController($http, financeDataService) {
  var vm = this;

   vm.getData = function(symbol) {
    vm.results = [];
    if (vm.symbol) {
       financeDataService.getHistQuote(vm.symbol).then(function(response) {
          console.log(response);
          if (response.data.outcome.code == 200) {
              vm.results = response.data.data;
          }
      });
    } 
  }
}

