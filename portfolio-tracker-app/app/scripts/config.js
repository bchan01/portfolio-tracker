'use strict';

angular.module('portfolioTrackerApp')
  .constant('AppConfig', {
  'financeAPI': '/finance/api',
  'userAPI' : '/user-management/api',
  'accountAPI' : '/account-management/api',
  'paginationSize' : 20
});