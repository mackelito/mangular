(function() {
  'use strict';
  angular.module('mangular', [ 'LocalForageModule' ]).run(runBlock);
  function runBlock($log, $localForage, Cart, UrlRewrite) {
    $localForage.getItem('cartId').then(function(data) {
      if (!data) {
        Cart.createNewCart().then(function(cartId) {
          $localForage.setItem('cartId', cartId);
        });
      }
    });
    UrlRewrite.getUrlRewritesByTypes([ 'cms-page', 'category' ]).then(function(urlRewrites) {
      $localForage.setItem('urlRewrites', urlRewrites);
    });
    $log.debug('mangular runBlock end');
  }
})();

(function() {
  'use strict';
  angular.module('mangular').factory('Cart', Factory);
  Factory.$inject = [ 'Restangular', '$log', '$localForage', '$rootScope' ];
  function Factory(Restangular, $log, $localForage, $rootScope) {
    var service = {
      getCartId: getCartId,
      getCart: getCart,
      getItems: getItems,
      addItem: addItem,
      removeItem: removeItem,
      createNewCart: createNewCart,
      getPaymentInformation: getPaymentInformation,
      placeOrder: placeOrder
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
    function getCart() {
      return Restangular.all('carts/my').withHttpConfig({
        cache: false
      }).customGET();
    }
    function getTotals() {
      var getTotals = getCartId().then(function(id) {
        return Restangular.all('guest-carts/' + id + '/totals').withHttpConfig({
          cache: false
        }).customGET();
      });
      return getTotals;
    }
    function getItems() {
      var cartItems = getCartId().then(function(id) {
        return Restangular.all('guest-carts/' + id + '/items').withHttpConfig({
          cache: false
        }).customGET();
      });
      return cartItems;
    }
    function addItem(product, cartId) {
      $localForage.getItem('cartId').then(function(cartId) {
        var data = {
          cartItem: {
            sku: product.sku,
            qty: 1,
            quote_id: cartId
          }
        };
        Restangular.one('guest-carts').one(cartId).one('items').customPOST(data).then(function(response) {
          $log.info('cartUpdated:');
          $rootScope.$broadcast('cartUpdated', response);
        });
      });
    }
    function removeItem(itemId) {
      var cartItems = getCartId().then(function(cartId) {
        return Restangular.all('guest-carts/' + cartId + '/items/' + itemId).remove().then(function(response) {
          $log.info('cartUpdated:');
          $rootScope.$broadcast('cartUpdated', response);
        });
      });
    }
    function createNewCart() {
      var createNewCart = Restangular.all('guest-carts');
      var cartId = createNewCart.post();
      return cartId;
    }
    function getPaymentInformation(cartId) {
      var getPaymentInformation = getCartId().then(function(id) {
        return Restangular.all('guest-carts/' + id + '/payment-information').customGET();
      });
      return getPaymentInformation;
    }
    function placeOrder(cartId) {
      var placeOrder = getCartId().then(function(id) {
        cartId = id;
        var orderData = getPaymentInformation().then(function(paymentinformation) {
          return Restangular.one('guest-carts/' + cartId + '/order').customPUT(paymentinformation);
        });
        return orderData;
      });
      return placeOrder;
    }
    $log.info('--- Cart service end ---');
  }
})();

(function() {
  'use strict';
  angular.module('mangular').service('Categories', Service);
  Service.$inject = [ 'Restangular', '$log' ];
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
      return Restangular.one('categories/' + id).customGET();
    }
  }
})();

(function() {
  'use strict';
  angular.module('mangular').factory('ContentRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('magento/');
    });
  }).service('Content', Service);
  Service.$inject = [ 'ContentRestangular' ];
  function Service(ContentRestangular) {
    var service = {
      getContent: getContent
    };
    return service;
    function getContent(url) {
      return ContentRestangular.one(url + '/content').customGET();
    }
  }
})();

(function() {
  'use strict';
  angular.module('mangular').service('Customer', Service);
  Service.$inject = [ 'Restangular' ];
  function Service(Restangular) {
    var loggedInCustomer;
    Restangular.one('/customers/me').customGET().then(function(result) {
      loggedInCustomer = result;
    });
    var service = {
      login: login,
      logout: logout,
      createAccount: createAccount,
      loggedInCustomer: function() {
        return loggedInCustomer;
      },
      setNewPassword: setNewPassword,
      resetPassword: resetPassword
    };
    return service;
    function login(user) {
      return Restangular.one('/customers/login').customPOST(user).then(function(result) {
        loggedInCustomer = result;
        return result;
      });
    }
    function logout(user) {
      return Restangular.one('/customers/logout').customGET(user).then(function(result) {
        loggedInCustomer = null;
        return result;
      });
    }
    function createAccount(user) {
      return Restangular.one('/customers').customPOST({
        customer: user
      }).then(function(result) {
        loggedInCustomer = result;
        return result;
      });
    }
    function setNewPassword(form) {
      return Restangular.one('/customers/reset-password').customPUT(form).then(function(result) {
        loggedInCustomer = result;
        return result;
      });
    }
    function resetPassword(email) {
      return Restangular.one('/customers/password').customPUT({
        email: email,
        template: 'email_reset'
      });
    }
  }
})();

(function() {
  'use strict';
  angular.module('mangular').factory('_', Factory);
  Factory.$inject = [ '$window' ];
  function Factory($window) {
    var _ = $window._;
    return _;
  }
})();

(function() {
  'use strict';
  angular.module('mangular').service('Menu', Service);
  Service.$inject = [ 'Restangular' ];
  function Service(Restangular) {
    var service = {
      getMenu: getMenu
    };
    return service;
    function getMenu(url) {
      return Restangular.one('store/1/menu/').customGET();
    }
  }
})();

(function() {
  'use strict';
  angular.module('mangular').service('Products', Service);
  Service.$inject = [ 'Restangular', '$stateParams' ];
  function Service(Restangular, $stateParams, $log) {
    var service = {
      getProducts: getProducts,
      getProduct: getProduct,
      getProductById: getProductById,
      getSimpleProduct: getSimpleProduct
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
        catId = '&searchCriteria[filter_groups][0][filters][0][field]=' + 'category_id&searchCriteria[filter_groups][0][filters][0][value]=' + params.category;
      }
      if (params.limit) {
        noOfProducts = '[page_size]=' + params.limit;
      } else {
        noOfProducts = '[page_size]=' + defaultNumberOfProducts;
      }
      query += '?searchCriteria' + noOfProducts + catId;
      return Restangular.all(query).customGET();
    }
    function getProduct(sku) {
      return Restangular.one('product-views/' + sku).customGET();
    }
    function getProductById(id) {
      return Restangular.one('product-views/id/' + id).customGET();
    }
    function getSimpleProduct(configurableProductId, options) {
      var attributes = {};
      for (var i = 0; i < options.length; i++) {
        var key = 'attributes[' + options[i].code + ']';
        attributes[key] = options[i].id;
      }
      return Restangular.one('product-views/id/', configurableProductId).customGET('simple-product', attributes);
    }
  }
})();

(function() {
  'use strict';
  angular.module('mangular').service('UrlRewrite', Service);
  Service.$inject = [ 'Restangular', '$localForage', '$filter' ];
  function Service(Restangular, $localForage, $filter) {
    return {
      getUrlRewrite: getUrlRewrite,
      getUrlRewritesByTypes: getUrlRewritesByTypes
    };
    function getUrlRewrite(path) {
      return $localForage.getItem('urlRewrites').then(function(urlRewrites) {
        return $filter('filter')(urlRewrites, {
          request_path: path
        })[0] || Restangular.one('url-rewrite/find-one-by-request-path/' + path).customGET();
      });
    }
    function getUrlRewritesByTypes(types) {
      return Restangular.one('url-rewrite/find-all-by-entity-type').customPOST({
        entity_types: types
      });
    }
  }
})();