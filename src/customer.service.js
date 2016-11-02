(function() {
    'use strict';

    angular
        .module('mangular')
        .service('Customer', Service);

    Service.$inject = ['Restangular'];

    /* @ngInject */
    function Service(Restangular) {

        var loggedInCustomer;

        var service = {
            login: login,
            logout: logout,
            createAccount: createAccount,
            loggedInCustomer: function(){return loggedInCustomer;}
        };

        return service;

        function login(user) {
            return Restangular.one('/customers/login').customPOST(user).then(function (result){
                loggedInCustomer = result;
                return result;
            });
        }

        function logout(user) {
            return Restangular.one('/customers/logout').customGET(user).then(function (result){
                loggedInCustomer = null;
                return result;
            });
        }

        function createAccount(user) {
            return Restangular.one('/customers').customPOST({customer: user}).then(function (result){
                loggedInCustomer = result;
                return result;
            });
        }

    }
})();
