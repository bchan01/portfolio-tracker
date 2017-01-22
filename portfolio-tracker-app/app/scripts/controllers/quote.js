'use strict';
angular.module('portfolioTrackerApp').controller('QuoteController', QuoteController);

function QuoteController($http, financeDataService) {
  var vm = this;
  
  vm.getData = function() {
    vm.results = [];
    if (vm.symbols) {
       financeDataService.getQuote(vm.symbols).then(function(response) {
          console.log(response);
          if (response.data.outcome.code == 200) {
              vm.results = response.data.data;
          }
      });
    } 
  }
}

