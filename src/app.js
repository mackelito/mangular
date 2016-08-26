(function() {
  'use strict';
  angular
    .module('mangular', [
        'LocalForageModule'
    ])
    .run(runBlock);

    /** @ngInject */
      function runBlock($log, $localForage, Cart) {
        $localForage.getItem('cartId').then(function(data) {
          //If no data then createNewCart and save cartId to localForage
          if (!data) {
            Cart.createNewCart().then(function(cartId) {
              $localForage.setItem('cartId', cartId);
            });
          }
        });

        $log.debug('mangular runBlock end');
    }
})();
