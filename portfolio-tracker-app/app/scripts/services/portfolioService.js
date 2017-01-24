angular.module('portfolioTrackerApp').factory('portfolioService', portfolioService);

function portfolioService($http, $window, AppConfig) {
  return {
    getPortfolios: getPortfolios,
    getHoldings: getHoldings
  };

  function success(response) {
    console.log('portfolioService Success - status:' + response.status);
    console.log(response);
    return {status : response.status , data : response.data.data};
  }

  function error(response) {
    console.log('portfolioService Error - status:' + response.status);
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
   * Get all portfolios for a given user
   */
  function getPortfolios() {
    console.log('portfolioService.getPortfolios()');
    var token = $window.sessionStorage.token;
    return $http({
      method: 'GET',
      url: AppConfig.accountAPI + '/portfolios',
      headers: {
        'x-access-token': token,
        'Accept': 'application/json'
      }
    }).then(success, error);
  }

  /**
   * Get holdings for a given portfolio
   */
  function getHoldings(portfolioId) {
    console.log('portfolioService.getHoldings() for portfolio:' + portfolioId);
    var token = $window.sessionStorage.token;
    return $http({
      method: 'GET',
      url: AppConfig.accountAPI + '/portfolios/' + portfolioId + '/holdings',
      headers: {
        'x-access-token': token,
        'Accept': 'application/json'
      }
    }).then(success, error);
  }

 

}