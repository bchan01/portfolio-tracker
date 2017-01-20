'use strict';

angular
  .module('portfolioTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-jwt'
  ]).config(config).run(run);

function config($httpProvider, $routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        access: {
          restricted: false
        }
      })
      .when('/quote', {
        templateUrl: 'views/quote.html',
        controller: 'QuoteController',
        controllerAs: 'vm',
        access: {
          restricted: false
        }
      })
      .when('/histQuote', {
        templateUrl: 'views/histQuote.html',
        controller: 'HistQuoteController',
        controllerAs: 'vm',
        access: {
          restricted: false
        }
      })
      .when('/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ChartController',
        controllerAs: 'vm',
        access: {
          restricted: false
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        access: {
          restricted: false
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        access: {
          restricted: false
        }
      })
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioController',
        controllerAs: 'vm',
        access: {
          restricted: true
        }
      })
      .otherwise({
        redirectTo: '/'
      });
      // Fix Hashbang in path
      $locationProvider.hashPrefix('');
  }


function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
