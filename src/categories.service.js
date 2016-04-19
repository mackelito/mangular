(function() {
  'use strict';

  angular
    .module('mangular', [])
    .service('Categories', Service);

  Service.$inject = ['Restangular', '$log'];

  /* @ngInject */
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

    $log.info('--- Categories service end ---');

  }
})();
