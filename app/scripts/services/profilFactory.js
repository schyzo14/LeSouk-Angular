'use strict';

/**
 * Récupérer un utilisateur avec son pseudo
 * @ngdoc service
 * @name leSoukApp.ProfilFactory
 * @description
 * # ProfilFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('ProfilFactory', function ($resource) {
	return $resource('http://localhost:8080/api/utilisateurs/user/:pseudoU', {
        
    });
  });