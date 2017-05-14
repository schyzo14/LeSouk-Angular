'use strict';

/**
 * @ngdoc service
 * @name leSoukApp.MyFactory
 * @description
 * # MyFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('MyFactory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
