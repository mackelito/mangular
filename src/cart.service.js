(function() {
  'use strict';

  angular
    .module('mangular')
    .factory('Cart', Factory);

  Factory.$inject = ['Restangular', '$log'];

  /* @ngInject */
  function Factory(Restangular, $log) {
    $log.info('--- Cart service start ---');

    var service = {
      getCart: getCart,
      getItems: getItems,
      addItem: addItem,
      createNewCart: createNewCart
    };

    var cart = {};

    return service;

    function getCart(cartId) {
      $log.info('--- Featching cart ---');
      // var cart = Restangular.all('guest-carts').one(cartId).customGET().then(function(cartData) {
      //   console.log('cartData');
      //   console.log(cartData);
      //   return cartData;
      // });
      return Restangular.all('guest-carts').one(cartId).customGET();
    }

    function getItems(cartId) {
      $log.info('--- Featching cart items ---');
      var cartItems = cartId.then(function(id) {
        cart = Restangular.all('guest-carts').one(id).one('items').customGET();
        return cart;
      });

      return cartItems;

    }

    function addItem(product, cartId) {
      $log.info('--- Add to cart ---');
      cartId.then(function(cartId) {
        $log.info('Adding item to cart:');
        var data = {
              'cartItem': {
                'sku': product.sku,
                'qty': 1,
                'quote_id': cartId
              }
            };
        Restangular.one('guest-carts').one(cartId).one('items').customPOST(data)
        .then(function(response) {
          $log.info('Added item to cart:');
          // cart = Restangular.all('guest-carts').one(cartId).customGET();
          // $log.info(cart);
          // return cart;
          cart = Restangular.all('guest-carts').one(cartId).customGET();
        });
      });
    }

    function createNewCart() {
      var createNewCart = Restangular.all('guest-carts');
      var cartId = createNewCart.post();
      return cartId;
    }

    $log.info('--- Cart service end ---');
  }
})();
