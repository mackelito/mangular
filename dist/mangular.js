(function() {
  'use strict';
  angular.module('mangular', []);
})();

(function() {
  'use strict';
  angular.module('mangular').service('Cart', Service);
  Service.$inject = [ 'Restangular', '$log' ];
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
    }
    function addItem(product) {
      console.log('product');
      console.log(product);
      $log.info('--- Add to cart start ---');
      $log.info('Adding to cart');
      $log.info('--- Add to cart end ---');
      cartId.then(function(id) {
        console.log(id);
        console.log(cart);
        var data = {
          cartItem: {
            sku: product.sku,
            qty: 1,
            quote_id: id
          }
        };
        Restangular.one('guest-carts').one(id).one('items').customPOST(data);
      });
    }
    $log.info('--- Cart service end ---');
  }
})();

(function() {
  'use strict';
  angular.module('mangular').service('Categories', Service);
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
      $log.info('--- Featching categories: ---');
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

(function() {
  'use strict';
  angular.module('mangular').service('Products', Service);
  Service.$inject = [ 'Restangular', '$stateParams', '$log' ];
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
        catId = 'category_id=' + categoryId;
      }
      if (numberOfProducts) {
        noOfProducts = 'searchCriteria[page_size]=' + numberOfProducts;
      } else {
        noOfProducts = 'searchCriteria[page_size]=' + defaultNumberOfProducts;
      }
      $log.info('--- Featching products start ---');
      $log.info('Featching ' + numberOfProducts + ' products from category ' + $stateParams);
      $log.info('--- Featching products end ---');
      query += [ '?', catId, noOfProducts ].join('&');
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