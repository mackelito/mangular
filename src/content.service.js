(function () {
    'use strict';

    angular
        .module('mangular')
        .factory('ContentRestangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {
                RestangularConfigurer.setBaseUrl('magento/');
            });
        })
        .service('Content', Service);

    Service.$inject = ['ContentRestangular'];

    /* @ngInject */
    function Service(ContentRestangular) {

        var service = {
            getContent: getContent
        };

        return service;

        function getContent(url) {
            return ContentRestangular.one(url + '/content').customGET();
        }
    }
})();
