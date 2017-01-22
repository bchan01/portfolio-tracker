angular.module('portfolioTrackerApp').factory('financeDataService', financeDataService);

function financeDataService($http, AppConfig) {
  return {
    getQuote: getQuote,
    getHistQuote: getHistQuote,
    getChart: getChart
  };

  function getQuote(symbols) {
    return $http.get(AppConfig.financeAPI + '/stocks/quotes?symbols=' + symbols).then(complete).catch(failed);
  }

  function getHistQuote(symbol) {
    //TODO -- refactor hacky codes below
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var endDate = mm+'-'+dd+'-'+yyyy;

    return $http.get(AppConfig.financeAPI + '/stocks/historicalQuotes?symbol=' + symbol
       + '&frequency=daily&startDate=01-01-2000&endDate=' + endDate
      ).then(complete)
      .catch(failed);
  }

  function getChart(symbol) {
    //return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}