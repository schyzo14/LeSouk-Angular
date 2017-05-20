'use strict';

/**
 * @ngdoc service
 * @name leSoukApp.annoncesCandidateesFactory
 * @description
 * # annoncesCandidateesFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('AnnoncesCandidateesFactory', function ($resource) {
	return $resource('http://localhost:8080/api/utilisateurs/:idU/annoncesCandidatees', {
         idU: '@idU'
    });
});