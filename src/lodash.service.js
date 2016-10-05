(function() {
    'use strict';

    angular
        .module('mangular')
        .factory('_', Factory);

    Factory.$inject = ['$window'];

    /* @ngInject */
    function Factory($window) {
        // Get a local handle on the global lodash reference.
        var _ = $window._;
        console.log('_ (lodash loaded)');

        // Delete the global reference to make sure
        // that no one gets lazy and tried to reference the library
        // without injecting it.
        // delete($window._); // Right now we cant do this due to how restangular calls lodash without injection
        return(_);
    }
})();
