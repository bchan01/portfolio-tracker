'use strict';
angular.module('portfolioTrackerApp').controller('QuoteController', QuoteController);

function QuoteController($http) {
  var vm = this;
  
  vm.getData = function() {
    vm.results = [];
    if (vm.symbols) {
       var inputs = vm.symbols.split(",");
       for (var i in inputs) {
          vm.results.push({'entry': i, 'symbol':inputs[i]});
       }
    } 
   
  }
}

