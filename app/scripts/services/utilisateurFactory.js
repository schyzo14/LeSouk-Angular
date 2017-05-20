'use strict';

/**
 * @ngdoc service
 * @name clientApp.AnnonceFactory
 * @description
 * # AnnonceFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('UtilisateurFactory', function ($resource) {
	return $resource('http://localhost:8080/api/utilisateurs/:idU', {
        idU : '@idU'
    });
  });