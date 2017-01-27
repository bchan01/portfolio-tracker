'use strict';
angular.module('portfolioTrackerApp').controller('ChartController', ChartController);

function ChartController($http, financeDataService) {
  var vm = this;
  vm.result = null;
  vm.message = null;
  vm.getData = function() {
    vm.result = null;
    vm.message = null;
    if (vm.symbol) {
       financeDataService.getChart(vm.symbol, vm.range, vm.type, vm.scale, vm.size, vm.compare).then(function(response) {
          console.log(response);
          if (response.status === 200) {
              vm.result = response.data;
          } else {
              vm.message = response.message;
        }
      });
    } 
  }
}
