(function() {
  'use strict';

  angular
    .module('mangular')
    .service('Categories', Service);

  Service.$inject = ['Restangular', '$log'];

  /* @ngInject */
  function Service(Restangular, $log) {

    var service = {
      getCategories: getCategories,
      getCategory: getCategory
    };

    return service;

    function getCategories() {
      return Restangular.all('categories').customGET();
    }

    function getCategory(id) {
      return Restangular.one('category/' + id).customGET();
    }

  }
})();
