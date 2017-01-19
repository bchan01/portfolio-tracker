'use strict';
angular.module('portfolioTrackerApp').controller('RegisterController', RegisterController);

function RegisterController($http) {
  var vm = this;
  vm.title = 'Register New User';
}