angular.module('portfolioTrackerApp').factory('holdingService', holdingService);

function holdingService($http, $window, AppConfig) {
  return { 
    getHoldings: getHoldings,
    deleteHolding: deleteHolding,
    addHolding : addHolding
  };

  function success(response) {
    console.log('holdingService Success - status:' + response.status);
    console.log(response);
    return {status : response.status , data : response.data.data};
  }

  function error(response) {
    console.log('holdingService Error - status:' + response.status);
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

  /**
   * Delete a holding from a given portfolio
   */
  function deleteHolding(portfolioId, holdingId) {
    console.log('portfolioService.deleteHolding() for portfolio:' + portfolioId + ' and holdingId:' + holdingId);
    var token = $window.sessionStorage.token;
    return $http({
      method: 'DELETE',
      url: AppConfig.accountAPI + '/portfolios/' + portfolioId + '/holdings/' + holdingId,
      headers: {
        'x-access-token': token,
        'Accept': 'application/json'
      }
    }).then(success, error);
  }

  /**
   * Add a new holding to a given portfolio
   */
  function addHolding(portfolioId, newHolding) {
    console.log('portfolioService.addHolding() for portfolio:' + portfolioId + ' with data:');
    console.log(JSON.stringify(newHolding));
    var token = $window.sessionStorage.token;
    return $http({
      method: 'POST',
      url: AppConfig.accountAPI + '/portfolios/' + portfolioId + '/holdings',
      data : newHolding,
      headers: {
        'x-access-token': token,
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    }).then(success, error);
  }



}