'use strict';
angular.module('portfolioTrackerApp').controller('QuoteController', QuoteController);

function QuoteController($http, financeDataService) {
  var vm = this;
  
  vm.getData = function(isValid) {
    vm.results = [];
    vm.message = null;
    if (isValid) {
       financeDataService.getQuote(vm.symbols).then(function(response) {
          console.log(response);
          if (response.status === 200) {
              vm.results = response.data;
          } else {
            vm.message = response.message;
        }
      });
    } 
  }
}

