(function() {
    'use strict';

    angular
        .module('mangular')
        .service('Customer', Service);

    Service.$inject = ['Restangular'];

    /* @ngInject */
    function Service(Restangular) {

        var service = {
            login: login,
            logout: logout,
            createAccount: createAccount
        };

        return service;

        function login(user) {
            console.log(user);
            return Restangular.one('/customers/login').customPOST(user);
        }

        function logout(user) {
            return Restangular.one('/customers/logout').customGET(user);
        }

        function createAccount(user) {
            return Restangular.one('/customers/create-account').customPOST(user);
        }
    }
})();
