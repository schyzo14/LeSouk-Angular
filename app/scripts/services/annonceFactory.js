'use strict';

/**
 * @ngdoc service
 * @name clientApp.AnnonceFactory
 * @description
 * # AnnonceFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('AnnonceFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/:idA', {
        idA : '@idA'
    });
  });