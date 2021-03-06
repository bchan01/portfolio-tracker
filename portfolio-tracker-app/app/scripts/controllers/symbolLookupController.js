'use strict';
angular.module('portfolioTrackerApp').controller('SymbolLookupController', SymbolLookupController);

function SymbolLookupController($http, financeDataService) {
  var vm = this;
  vm.getSymbol = function(isValid) {
    vm.results = [];
    vm.message = null;
    if (isValid) {
       financeDataService.lookupSymbols(vm.name).then(function(response) {
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

