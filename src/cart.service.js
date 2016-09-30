(function() {
  'use strict';

  angular
    .module('mangular')
    .factory('Cart', Factory);

  Factory.$inject = ['Restangular', '$log', '$localForage', '$rootScope'];

  /* @ngInject */
  function Factory(Restangular, $log, $localForage, $rootScope) {

    var service = {
      getCartId: getCartId,
      getTotals: getTotals,
      getItems: getItems,
      addItem: addItem,
      removeItem: removeItem,
      createNewCart: createNewCart
    };

    $localForage.getItem('cartId').then(function(id) {
      service.cartId = id;
    });

    var cart = {};
    $localForage.getItem('cartId').then(function(id) {
      cart.id = id;
      service.cartId = id;
    });

    return service;

    function getCartId() {
      return $localForage.getItem('cartId');
    }

    function getTotals() {
      var getTotals = getCartId().then(function(id){
        return Restangular.all('guest-carts/'+ id + '/totals').withHttpConfig({cache: false}).customGET();
      });
      return getTotals;
    }

    function getItems() {
      var cartItems = getCartId().then(function(id){
        return Restangular.all('guest-carts/'+ id + '/items').withHttpConfig({cache: false}).customGET();
      });
      return cartItems;
    }

    function addItem(product, cartId) {
      $localForage.getItem('cartId').then(function(cartId) {
        var data = {
              'cartItem': {
                'sku': product.sku,
                'qty': 1,
                'quote_id': cartId
              }
            };
        Restangular.one('guest-carts').one(cartId).one('items').customPOST(data)
        .then(function(response) {
          $log.info('cartUpdated:');
          $rootScope.$broadcast('cartUpdated', response);
        });
      });
    }

    function removeItem(itemId) {
      console.log(itemId);
      var cartItems = getCartId().then(function(cartId){
        return Restangular.all('guest-carts/'+ cartId + '/items/' + itemId).remove()
        .then(function(response) {
          $log.info('cartUpdated:');
          $rootScope.$broadcast('cartUpdated', response);
        });
      });
      // return cartItems;
    }

    function createNewCart() {
      var createNewCart = Restangular.all('guest-carts');
      var cartId = createNewCart.post();
      return cartId;
    }

    $log.info('--- Cart service end ---');
  }
})();
