angular.module('portfolioTrackerApp').factory('financeDataService', financeDataService);

function financeDataService($http, AppConfig) {
  return {
    getQuote: getQuote,
    getHistQuote: getHistQuote,
    getChart: getChart
  };

  function success(response) {
    console.log('financeDataService Success - status:' + response.status);
    console.log(response);
    return {status : response.status , data : response.data.data};
  }

  function error(response) {
    console.log('financeDataService Error - status:' + response.status);
    console.log(response);
    var res = {status: response.status};
    if (response.data.outcome) {
      if (response.data.outcome.message) {
         res.message = response.data.outcome.message;
      }
      if (response.data.outcome.errors) {
         res.errors = response.data.outcome.errors;
      }
    }
    return res;
  }

  /**
   * Get delayed quotes for a given list of symbols
   */
  function getQuote(symbols) {
    return $http.get(AppConfig.financeAPI + '/stocks/quotes?symbols=' + symbols)
      .then(success, error);
  }

  /**
   * Get historical quotes for a given symbol
   */
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
      ).then(success, error);
  }

  /**
   * Get chart as image for a given symbol
   */
  function getChart(symbol) {
    return $http.get(AppConfig.financeAPI + '/stocks/charts/url?symbol=' + symbol
       + '&range=max&type=line&scale=arithmetic&size=medium'
      ).then(success, error);
  }

}