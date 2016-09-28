(function () {
  'use strict';

  angular
    .module('mangular')
    .service('UrlRewrite', Service);

  Service.$inject = ['Restangular'];

  /* @ngInject */
  function Service(Restangular) {
    return {
      getUrlRewrite: function (path) {
        return Restangular.one('url-rewrite/find-one-by-request-path/' + path).customGET();
      }
    };
  }
})();
