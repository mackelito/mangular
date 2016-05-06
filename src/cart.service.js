(function() {
  'use strict';

  angular
    .module('mangular')
    .factory('Cart', Service);

  Service.$inject = ['Restangular','$log'];

  /* @ngInject */
  function Service(Restangular, $log) {
    $log.info('--- Cart service start ---');

    var cart = {};
    var createNewCart = Restangular.all('guest-carts');
    var cartId = createNewCart.post().then(function(cartId) {
      return cartId;
    });

    var service = {
      getItems: getItems,
      addItem: addItem
    };

    return service;

    function getItems() {
      $log.info('--- Featching cart start ---');
      $log.info('Featching cart');
      $log.info('--- Featching cart end ---');

      var cartItems = cartId.then(function(id) {
        cart = Restangular.all('guest-carts').one(id).one('items').customGET();
        return cart;
      });

      return cartItems;

    }

    function addItem(product) {
      $log.info('--- Add to cart start ---');
      $log.info('Adding to cart');
      $log.info('--- Add to cart end ---');
      cartId.then(function(id) {
        console.log('Adding item to cart:');
        console.log(cart);
        var data = {
              'cartItem': {
                'sku': product.sku,
                'qty': 1,
                'quote_id': id
              }
            };
        Restangular.one('guest-carts').one(id).one('items').customPOST(data)
        .then(function(response) {
          var cartItems = cartId.then(function(id) {
              cart = Restangular.all('guest-carts').one(id).one('items').customGET();
              return cart;
            });
          return cartItems;
        });
      });
    }

    $log.info('--- Cart service end ---');

  }
})();
