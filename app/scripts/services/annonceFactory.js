'use strict';

/**
 * @ngdoc service
 * @name leSoukApp.AnnonceFactory
 * @description
 * # AnnonceFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('AnnonceFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/:idA',
      {idA : '@idA'},
    );
  });
