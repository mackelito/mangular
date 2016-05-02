(function() {
  'use strict';

  angular
    .module('mangular')
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

    function getProducts(numberOfProducts, categoryId) {
      var query = 'products';
      var category = '';
      var defaultNumberOfProducts = '5';
      var catId = '';
      var noOfProducts = '';

      if (categoryId) {
        // query = '/categories/' + categoryId + '/' + query;
        catId = 'category_id=' + categoryId;
      }

      if (numberOfProducts) {
        noOfProducts = 'searchCriteria[page_size]=' + numberOfProducts;
      } else {
        noOfProducts = 'searchCriteria[page_size]=' + defaultNumberOfProducts;
      }

      $log.info('--- Featching products start ---');
      $log.info('Featching ' + numberOfProducts + ' products from category ' +
        $stateParams);
      $log.info('--- Featching products end ---');

      query += ['?',catId,noOfProducts].join('&');
      return Restangular.all(query).customGET();

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
