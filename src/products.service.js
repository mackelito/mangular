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
      //searchCriteria[page_size]=5&searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=2&searchCriteria[filter_groups][0][filters][0][condition_type]=in
      $log.info('--- Featching products start ---');
      $log.info('Featching ' + params.limit + ' products from category ' +
        $stateParams);
      $log.info('--- Featching products end ---');

      query += '?searchCriteria' + noOfProducts + catId;
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
