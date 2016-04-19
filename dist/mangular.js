(function() {
  'use strict';
  angular.module('mangular', []).service('Categories', Service);
  Service.$inject = [ 'Restangular', '$log' ];
  function Service(Restangular, $log) {
    $log.info('--- Categories service start ---');
    var service = {
      getCategories: getCategories,
      getCategory: getCategory
    };
    return service;
    function getCategories() {
      $log.info('--- Featching categories start ---');
      $log.info('Featching categories:');
      $log.info('--- Featching categories end ---');
      return Restangular.all('categories').customGET();
    }
    function getCategory(id) {
      $log.info('--- Featching category start ---');
      $log.info('--- Featching category ' + id + ' ---');
      $log.info('--- Featching category end ---');
      return Restangular.one('category/' + id).customGET();
    }
  }
})();

(function() {
  'use strict';
  angular.module('mangular', []).service('Products', Service);
  Service.$inject = [ 'Restangular', '$stateParams', '$log' ];
  function Service(Restangular, $stateParams, $log) {
    $log.info('--- Products service start ---');
    var service = {
      getProducts: getProducts,
      getProduct: getProduct
    };
    return service;
    function getProducts(numberOfProducts, $stateParams) {
      $log.info('--- Featching products start ---');
      $log.info('Featching ' + numberOfProducts + ' products from ' + $stateParams);
      $log.info('--- Featching products end ---');
      return Restangular.all('/products?searchCriteria[page_size]=' + numberOfProducts).customGET();
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