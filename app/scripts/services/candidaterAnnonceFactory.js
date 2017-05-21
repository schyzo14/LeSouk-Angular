'use strict';

/**
 * @ngdoc service
 * @name clientApp.AnnonceFactory
 * @description
 * # AnnonceFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('CandidaterAnnonceFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/candidater/:idA',
      {idA : '@idA'},
      {update : {method:'PUT'}}
    );
  });
