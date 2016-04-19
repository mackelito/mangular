(function() {
  'use strict';

  angular
    .module('mangular', [])
    .service('Products', Service);

  Service.$inject = ['Restangular','$stateParams','$log'];

  /* @ngInject */
  function Service(Restangular, $stateParams, $log) {
    $log.info('--- Products service start ---');

    var service = {
      getProducts: getProducts,
      getProduct: getProduct
    };

    return service;

    function getProducts(numberOfProducts, $stateParams) {
      $log.info('--- Featching products start ---');
      $log.info('Featching ' + numberOfProducts + ' products from category ' +
        $stateParams);
      // var categoryId = '/categories/' + $stateParams.categoryId;
      $log.info('--- Featching products end ---');

      return Restangular.all('/products?searchCriteria[page_size]=' +
        numberOfProducts).customGET();
    }

    function getProduct(sku) {
      $log.info('--- Featching product start ---');
      $log.info('Featching product ' + sku);
      $log.info('--- Featching product end ---');

      return Restangular.one('products/' + sku).customGET();
    }

    $log.info('--- Products service end ---');

  }
})();
