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
   if (!vm.username || !vm.userPassword) {
      vm.error = 'User and Password are both required.'
    } else  {
      var user = {
        username: vm.username,
        userPassword: vm.userPassword
      };
      $http.post(AppConfig.userAPI +"/tokens", user).then(function(response) {
        console.log(response);
        if (response.data.outcome.code == 200) {
          $window.sessionStorage.token = response.data.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          //var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = response.data.data.username;
          $window.sessionStorage.loggedInUser = response.data.data.username;
          $location.path('/holdings');
        }
      }).catch(function(error) {
        console.log(error);
        vm.error = 'Login failed, please try again.'
      })
    
    }
  }

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.loggedInUser;
    $location.path('/');
  }

  vm.isActiveTab = function(url, compareStartsWith) {
    var currentPath = $location.path().split('/')[1];
    if (url === currentPath) {
       return 'active';
    } else if (compareStartsWith && currentPath.startsWith(url)) {
      return 'active';
    } else {
      return '';
    }
  }
}
