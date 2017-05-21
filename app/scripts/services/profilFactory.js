'use strict';

/**
 * @ngdoc service
 * @name clientApp.ProfilFactory
 * @description
 * # ProfilFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('ProfilFactory', function ($resource) {
	return $resource('http://localhost:8080/api/utilisateurs/user/:pseudoU', {
        
    })
  });