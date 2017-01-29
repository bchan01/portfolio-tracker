'use strict';
angular.module('portfolioTrackerApp').controller('HomeController', HomeController);

function HomeController($http, financeDataService) {
  var vm = this;
  vm.results = [];
  vm.message = null;

  const symbolMappings = {
    '^IXIC' : 'S&P 500',
    '^GSPC' : 'Nasdaq',
    'GC=F' : 'Gold',
    'CL=F' : 'Crude Oil',
    'SI=F' : 'Silver',
    '^FTSE' : 'FTSE 100',
    '^N225' : 'Nikkei 225',
    '^RUT' : 'Russel 2000',
    'GBPUSD=X' : 'GBP/USD',
    'JPY=X' : 'USD/JPY',
    'EURUSD=X' : 'EUR/USD',
    '^TNX' : '10-Yr Bond'

  }
  const symbols = '^GSPC,^IXIC,^FTSE,^N225,^RUT,CL=F,GC=F,SI=F,^TNX,EURUSD=X,JPY=X,GBPUSD=X,';

  financeDataService.getQuote(symbols).then(function(response) {
    console.log(response);
    if (response.status === 200) {
        vm.results = [];
        var res = response.data;
        res.forEach( function (data) {
           var entry = {'name' : symbolMappings[data.symbol],
            'price' : data.price,
            'change' : data.change,
            'changePercent' : data.changePercent};
          vm.results.push(entry);
        });
    } else {
        vm.results = [];
        vm.message = response.message;
    }
  });

}

