'use strict';
angular.module('portfolioTrackerApp').controller('PortfolioUpdateController', PortfolioUpdateController);

function PortfolioUpdateController($http, $routeParams, $location, portfolioService) {
    var vm = this;
    vm.portfolio = {'id' : $routeParams.id, 'name' : $routeParams.name};
    vm.message = null;
    console.log('PortfolioUpdateController entered with portfolio:' + JSON.stringify(vm.portfolio));
    vm.update = function() {
        vm.message = null;
        console.log('PortfolioUpdateController.update() with id:' + vm.portfolio.id + ' and name:' + vm.portfolio.name);
        /* portfolioService.updatePortfolio(vm.id, vm.name).then(function(response) {
            if (response.status === 200) {
                 console.log('portfolio updated!!');
                 $location.path('/holdings');
            } else {
                vm.message = response.message;
            }
        }); */
         $location.path('/holdings');
    }

     vm.cancel = function() {
        vm.message = null;
        console.log('PortfolioUpdateController.cancel()');
        $location.path('/holdings');
    }

}