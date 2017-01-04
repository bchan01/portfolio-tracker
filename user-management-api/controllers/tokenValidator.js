'use strict';

var  Q = require('q');

module.exports.validateUserCredential = function(username, userPassword) {
    var defer = Q.defer();
    var validationErrors = [];
    if (!username) {
        validationErrors.push({'message' : 'user name is required', name: 'username'})
    }
    if (!userPassword) {
        validationErrors.push({'message' : 'user password is required', name: 'userPassword'})
    }
    if (validationErrors.length > 0) {
         defer.reject({status : 400, message : 'Invalid Input parameter(s)',
            errors : validationErrors});
    } else {
        defer.resolve({});
    }
    return defer.promise;
};


