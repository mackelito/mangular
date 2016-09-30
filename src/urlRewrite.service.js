(function () {
    'use strict';

    angular
        .module('mangular')
        .service('UrlRewrite', Service);

    Service.$inject = ['Restangular', '$localForage', '$filter'];

    /* @ngInject */
    function Service(Restangular, $localForage, $filter) {
        return {
            getUrlRewrite: getUrlRewrite,
            getUrlRewritesByTypes: getUrlRewritesByTypes
        };


        function getUrlRewrite(path) {
            return $localForage.getItem('urlRewrites').then(function (urlRewrites) {
                return $filter('filter')(urlRewrites, {
                    request_path: path
                })[0] || Restangular.one('url-rewrite/find-one-by-request-path/' + path).customGET();
            });

        }

        function getUrlRewritesByTypes(types) {
            return Restangular.one('url-rewrite/find-all-by-entity-type').customPOST({
                entity_types: types
            });
        }
    }
})();
