angular.module('portfolioTrackerApp').factory('financeDataService', financeDataService);

function financeDataService($http, AppConfig) {
  return {
    getQuote: getQuote,
    getHistQuote: getHistQuote,
    getChart: getChart,
    lookupSymbols : lookupSymbols
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
  function getHistQuote(symbol, frequency, startDate, endDate) {

    var start = startDate || '01-01-2000';
    var end = endDate;
    if (!end) {
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
      end = mm+'-'+dd+'-'+yyyy;
    }
    var freq = frequency || 'daily';
    var requestUrl = AppConfig.financeAPI + '/stocks/historicalQuotes?symbol=' + symbol
       + '&frequency=' + freq
       + '&startDate=' + start
       + '&endDate=' + end;
    console.log('financeDataService.getHistQuote() - URL:' + requestUrl);
    return $http.get(requestUrl).then(success, error);
  }

  /**
   * Get chart as image for a given symbol
   */
  function getChart(symbol, range, type, scale, size, compareSymbols) {
    var rangeValue = range || 'max';
    var typeValue = type || 'line';
    var scaleValue = scale || 'arithmetic';
    var sizeValue = size || 'medium';
   
    var requestUrl = AppConfig.financeAPI + '/stocks/charts/url?symbol=' + symbol
       + '&range=' + rangeValue
       + '&type=' + typeValue
       + '&scale=' + scaleValue
       + '&size=' + sizeValue;
    if (compareSymbols) {
       requestUrl += '&compare=' + compareSymbols;
    }
    console.log('financeDataService.getChart() - URL:' + requestUrl);
    return $http.get(requestUrl).then(success, error);
  }


  /**
   * Lookup Symbol with given name
   */
  function lookupSymbols(name) {
    return $http.get(AppConfig.financeAPI + '/stocks/symbols?name=' + name)
      .then(success, error);
  }

}