angular.module('portfolioTrackerApp').factory('portfolioService', portfolioService);

function portfolioService($http, $window, AppConfig) {
  return {
    getPortfolios: getPortfolios,
    createPortfolio : createPortfolio, 
    getHoldings: getHoldings,
    deleteHolding: deleteHolding,
    addHolding : addHolding
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
   * Create a new portfolio
   */
  function createPortfolio(name) {
    var token = $window.sessionStorage.token;
    var username = $window.sessionStorage.loggedInUser;
    console.log('portfolioService.createPortfolio() with  name:' + name + ' and username:' + username);
    return $http({
      method: 'POST',
      url: AppConfig.accountAPI + '/portfolios/',
      data : {'name' : name, 'userId' : username},
      headers: {
        'x-access-token': token,
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
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