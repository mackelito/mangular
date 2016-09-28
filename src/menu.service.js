(function () {
    'use strict';

    angular
        .module('mangular')
        .service('Menu', Service);

    Service.$inject = ['Restangular'];

    /* @ngInject */
    function Service(Restangular) {

        var service = {
            getMenuItem: getMenuItem,
            getMenu: getMenu
        };

        return service;

        function getMenuItem(url) {
            return Restangular.one('store/1/menu/').customGET().then(function (menu) {
                var result;
                angular.forEach(menu, function (item) {
                    if (item.url_key === url) {
                        result = item;
                    }
                });
                return result;
            });
        }

        function getMenu(url) {
            return Restangular.one('store/1/menu/').customGET();
        }
    }
})();
