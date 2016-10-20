(function () {
    'use strict';

    angular
        .module('mangular')
        .service('Products', Service);

    Service.$inject = ['Restangular', '$stateParams', '$log'];

    /* @ngInject */
    function Service(Restangular, $stateParams, $log) {

        var service = {
            getProducts: getProducts,
            getProduct: getProduct,
            getProductById: getProductById
        };

        return service;

        function getProducts(paramsData) {
            var params = paramsData;
            var query = 'products';
            var category = '';
            var defaultNumberOfProducts = '50';
            var catId = '';
            var noOfProducts = '';

            if (params.category) {
                catId = '&searchCriteria[filter_groups][0][filters][0][field]=' +
                    'category_id&searchCriteria[filter_groups][0][filters][0][value]=' +
                    params.category;
            }

            if (params.limit) {
                noOfProducts = '[page_size]=' + params.limit;
            } else {
                noOfProducts = '[page_size]=' + defaultNumberOfProducts;
            }

            query += '?searchCriteria' + noOfProducts + catId;
            return Restangular.all(query).customGET();

        }

        function getProduct(sku) {
            return Restangular.one('product-views/' + sku).customGET();
        }

        function getProductById(id) {
            return Restangular.one('product-views/id/' + id).customGET();
        }


    }
})();
