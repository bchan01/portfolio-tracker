'use strict';
angular.module('portfolioTrackerApp').controller('HistQuoteController', HistQuoteController);

function HistQuoteController($http) {
  var vm = this;
  vm.title = 'Historical Stock Prices';
}

