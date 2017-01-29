'use strict';
angular.module('portfolioTrackerApp').controller('HistQuoteController', HistQuoteController);

function HistQuoteController($http, financeDataService) {
  var vm = this;

   vm.getData = function(isValid) {
    vm.results = [];
    vm.message = null;
    if (isValid) {
      financeDataService.getHistQuote(vm.symbol, vm.frequency, vm.startDate, vm.endDate).then(function(response) {
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

