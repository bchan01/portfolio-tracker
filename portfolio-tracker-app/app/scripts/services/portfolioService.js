angular.module('portfolioTrackerApp').factory('portfolioService', portfolioService);

function portfolioService($http, $window, AppConfig) {
  return {
    getPortfolios: getPortfolios,
    createPortfolio : createPortfolio,
    updatePortfolio : updatePortfolio,
    deletePortfolio : deletePortfolio
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
    console.log('portfolioService.createPortfolio() with  name:' + name);
    return $http({
      method: 'POST',
      url: AppConfig.accountAPI + '/portfolios/',
      data : {'name' : name},
      headers: {
        'x-access-token': token,
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    }).then(success, error);
  }

  /**
   * Update the given portfolio
   */
  function updatePortfolio(id, name) {
    var token = $window.sessionStorage.token;
    var username = $window.sessionStorage.loggedInUser;
    console.log('portfolioService.updatePortfolio() with  id:' + id + ' and name:' + name);
    return $http({
      method: 'PUT',
      url: AppConfig.accountAPI + '/portfolios/' + id,
      data : {'name' : name},
      headers: {
        'x-access-token': token,
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    }).then(success, error);
  }

  /**
   * Delete the given portfolio
   */
  function deletePortfolio(id) {
    var token = $window.sessionStorage.token;
    var username = $window.sessionStorage.loggedInUser;
    console.log('portfolioService.deletePortfolio() with  id:' + id);
    return $http({
      method: 'DELETE',
      url: AppConfig.accountAPI + '/portfolios/' + id,
      headers: {
        'x-access-token': token,
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    }).then(success, error);
  }

}