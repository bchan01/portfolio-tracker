'use strict';
angular.module('portfolioTrackerApp').controller('ChartController', ChartController);

function ChartController($http) {
  var vm = this;
  vm.title = 'Stock Price Chart and Trends';
}
