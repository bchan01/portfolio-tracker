'use strict';
angular.module('portfolioTrackerApp').controller('HistQuoteController', HistQuoteController);

function HistQuoteController($http) {
  var vm = this;

   vm.getData = function() {
    vm.results = [];
    if (vm.symbol) {
       for (var i = 0; i < 20; i++) { 
           vm.results.push({'entry' : i, 'price': 10+i});
        }
    } 
   
  }
}

