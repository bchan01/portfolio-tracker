'use strict';
angular.module('portfolioTrackerApp').controller('ChartController', ChartController);

function ChartController($http, financeDataService) {
  var vm = this;
  vm.getData = function(symbol) {
    vm.result = null;
    vm.message = null;
    if (vm.symbol) {
       financeDataService.getChart(vm.symbol).then(function(response) {
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
