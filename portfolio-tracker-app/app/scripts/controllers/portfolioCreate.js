'use strict';
angular.module('portfolioTrackerApp').controller('PortfolioCreateController', PortfolioCreateController);

function PortfolioCreateController($http, $location, portfolioService) {
    var vm = this;
    vm.name = null;
    vm.message = null;
  
    vm.create = function() {
        vm.message = null;
        console.log('PortfolioCreateController.create() - name:' + vm.name);
        /* portfolioService.createPortfolio(vm.name).then(function(response) {
            if (response.status === 201) {
                 console.log('portfolio created!!');
                 $location.path('/holdings');
            } else {
                vm.message = response.message;
            }
        }); */
        $location.path('/holdings');
    }
    
    vm.cancel = function() {
        vm.message = null;
        console.log('PortfolioCreateController.cancel()');
        $location.path('/holdings');
    }

}