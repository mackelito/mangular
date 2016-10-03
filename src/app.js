(function () {
    'use strict';
    angular
        .module('mangular', [
            'LocalForageModule'
        ])
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $localForage, Cart, UrlRewrite) { //}, UrlRewrite) {
        $localForage.getItem('cartId').then(function (data) {
            //If no data then createNewCart and save cartId to localForage
            if (!data) {
                Cart.createNewCart().then(function (cartId) {
                    $localForage.setItem('cartId', cartId);
                });
            }
        });

        // Keep the cache up to date. Could probably be cached longer. 
        UrlRewrite.getUrlRewritesByTypes(['cms-page', 'category']).then(function (urlRewrites) {
            $localForage.setItem('urlRewrites', urlRewrites);
        });

        $log.debug('mangular runBlock end');
    }
})();
