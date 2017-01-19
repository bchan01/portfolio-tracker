angular.module('portfolioTrackerApp').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper, AppConfig) {
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
        userPassword: vm.userPassword
      };
      $http.post(AppConfig.userAPI +"/tokens", user).then(function(response) {
        console.log(response);
        if (response.data.outcome.code == 200) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          //var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = response.data.data.username;
        }
      }).catch(function(error) {
        console.log(error);
      })
    
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
