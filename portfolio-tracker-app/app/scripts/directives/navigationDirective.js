angular.module('portfolioTrackerApp').directive('ptNavigation', ptNavigation);

function ptNavigation() {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directives/navigationDirective.html'
  };
}
