(function () {
    'use strict';

    angular
        .module('mangular')
        .service('Menu', Service);

    Service.$inject = ['Restangular'];

    /* @ngInject */
    function Service(Restangular) {

        var service = {
            getMenu: getMenu
        };

        return service;

        function getMenu(url) {
            return Restangular.one('store/1/menu/').customGET();
        }
    }
})();
