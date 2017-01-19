'use strict';
angular.module('portfolioTrackerApp').controller('QuoteController', QuoteController);

function QuoteController($http) {
  var vm = this;
  vm.title = 'Delayed Stock Quote';
}

