'use strict';

/**
 * @ngdoc service
 * @name clientApp.commenterAnnonceFactory
 * @description
 * # commenterAnnonceFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('CommenterAnnonceFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/:idA',
      {idA : '@idA'},
      {update : {method:'PUT'}}
    );
  });
