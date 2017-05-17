'use strict';

/**
 * @ngdoc service
 * @name leSoukApp.annoncesCandidateesFactory
 * @description
 * # annoncesCandidateesFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('annoncesCandidateesFactory', function ($resource) {
	return $resource('http://localhost:8080/api/lesouk/utilisateurs/:id/annoncesCandidatees', {
         id: '@id'
    });
});