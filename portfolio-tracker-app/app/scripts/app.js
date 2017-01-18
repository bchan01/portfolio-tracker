'use strict';

angular
  .module('portfolioTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl',
        controllerAs: 'portfolio'
      })
      .when('/quote', {
        templateUrl: 'views/quote.html',
        controller: 'QuoteCtrl',
        controllerAs: 'quote'
      })
      .when('/histQuote', {
        templateUrl: 'views/histQuote.html',
        controller: 'HistQuoteCtrl',
        controllerAs: 'histQuote'
      })
      .when('/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl',
        controllerAs: 'chart'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .otherwise({
        redirectTo: '/'
      });
      // Fix Hashbang in path
      $locationProvider.hashPrefix('');
  });
