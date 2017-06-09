'use strict';

/**
 * Récupérer un utilisateur avec son idU
 * @ngdoc service
 * @name leSoukApp.UtilisateurFactory
 * @description
 * # UtilisateurFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('UtilisateurFactory', function ($resource) {
	return $resource('http://localhost:8080/api/utilisateurs/:idU', {
        idU : '@idU'
    });
  });