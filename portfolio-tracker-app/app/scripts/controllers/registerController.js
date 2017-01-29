'use strict';
angular.module('portfolioTrackerApp').controller('RegisterController', RegisterController);

function RegisterController($http, AppConfig) {
  var vm = this;

  vm.register = function() {
    var user = {
      username: vm.username,
      userPassword: vm.userPassword,
      email : vm.email,
      firstName : vm.firstName,
      lastName : vm.lastName
    };

    if (!vm.username || !vm.userPassword) {
      vm.error = 'username and password are required.';
    } else {
      if (vm.userPassword !== vm.userPasswordRepeat) {
        vm.error = 'passwords do not match.';
      } else {
        $http.post(AppConfig.userAPI + '/users', user).then(function(result) {
          console.log(result);
          vm.message = 'Successful registration, please login.';
          vm.error = '';
        }).catch(function(error) {
          console.log(error);
          vm.error = 'Registration failed.';
        });
      }
    }
  }
 
};