'use strict';

/**
 * @ngdoc service
 * @name leSoukApp.annoncesCreesFactory
 * @description
 * # annoncesCreesFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('AnnoncesCreesFactory', function ($resource) {
	return $resource('http://localhost:8080/api/utilisateurs/:idU/annoncesCrees', {
         idU: '@idU'
    });
});