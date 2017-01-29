'use strict';

angular
  .module('portfolioTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-jwt',
    'smart-table',
    'ui.bootstrap'
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
      .when('/lookup', {
        templateUrl: 'views/symbolLookup.html',
        controller: 'SymbolLookupController',
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
      .when('/holdings', {
        templateUrl: 'views/holdings.html',
        controller: 'HoldingController',
        controllerAs: 'vm',
        access: {
          restricted: true
        }
      })
      .when('/portfolio/create', {
        templateUrl: 'views/portfolioCreate.html',
        controller: 'PortfolioCreateController',
        controllerAs: 'vm',
        access: {
          restricted: true
        }
      })
      .when('/portfolio/update/:id/:name', {
        templateUrl: 'views/portfolioUpdate.html',
        controller: 'PortfolioUpdateController',
        controllerAs: 'vm',
        access: {
          restricted: true
        }
      })
      .when('/portfolio/delete/:id', {
        templateUrl: 'views/holdings.html',
        controller: 'PortfolioDeleteController',
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
