'use strict';
angular.module('portfolioTrackerApp').controller('PortfolioDeleteController', PortfolioDeleteController);

function PortfolioDeleteController($http, $routeParams, $location, portfolioService) {
    var vm = this;
    vm.id = $routeParams.id;
    vm.message = null;
    console.log('PortfolioDeleteController entered with id:' + vm.id); 
    portfolioService.deletePortfolio(vm.id).then(function(response) {
        if (response.status === 200) {
                console.log('portfolio deleted, reloading portfolios');
                $location.path('/holdings');
        } else {
            vm.message = response.message;
            $location.path('/holdings');
        }
    });
}