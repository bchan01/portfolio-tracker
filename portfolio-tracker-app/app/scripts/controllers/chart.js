'use strict';
angular.module('portfolioTrackerApp').controller('ChartController', ChartController);

function ChartController($http) {
  var vm = this;
  vm.getData = function() {
    vm.result = '';
    if (vm.symbol) {
      vm.result = 'TODO -- show chart for ' + vm.symbol;
    } 
   
  }
   
}
