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

        // TODO: Not needed?
        function getCartId() {
            return $localForage.getItem('cartId');
        }

        function getCart() {
            return Restangular.all('carts/my').withHttpConfig({
                cache: false
            }).customGET();
        }

        // TODO: remove
        function getTotals() {
            var getTotals = getCartId().then(function(id) {
                return Restangular.all('guest-carts/' + id + '/totals').withHttpConfig({
                    cache: false
                }).customGET();
            });
            return getTotals;
        }

        // TODO: Not needed?
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
            var cartItems = getCartId().then(function(cartId) {
                return Restangular.all('guest-carts/' + cartId + '/items/' + itemId).remove()
                    .then(function(response) {
                        $log.info('cartUpdated:');
                        $rootScope.$broadcast('cartUpdated', response);
                    });
            });
        }

        // TODO: Not needed?
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

        // function setPaymentInformation(paymentInformation) {
        //     var getPaymentInformation = getCartId().then(function(id) {
        //         return Restangular.all('guest-carts/' + id + '/payment-information').customPOST(paymentInformation);
        //     });
        //     return getPaymentInformation;
        // }

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
