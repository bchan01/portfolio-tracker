angular.module('portfolioTrackerApp').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
  var vm = this;

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.login = function() {
    if (vm.username && vm.userPassword) {
      var user = {
        username: vm.username,
        password: vm.userPassword
      };
      
      $window.sessionStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiUFQgQWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwidXNlcklkIjoiNTg2YmUxYWEwODQwMWE0MjNiMzZjZmQ2Iiwicm9sZXMiOlsiUmVhZFdyaXRlIl0sImlhdCI6MTQ4MzQ4OTk2MCwiZXhwIjoxNDgzNTE4NzYwLCJhdWQiOiJQb3J0Zm9saW9UcmFja2VyIiwiaXNzIjoiYjJtY29tcHV0aW5nIiwic3ViIjoiYWRtaW4ifQ.82bylzgZWlhpIspILxYYYHDPy7X9wFd0aMZqU13xEwU';
      AuthFactory.isLoggedIn = true;
      var token = $window.sessionStorage.token;
      var decodedToken = jwtHelper.decodeToken(token);
      vm.loggedInUser = vm.username;

      /*
      $http.post('/api/users/login', user).then(function(response) {
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.username;
        }
      }).catch(function(error) {
        console.log(error);
      })
      */

    }
  }

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
  }

  vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }
}
