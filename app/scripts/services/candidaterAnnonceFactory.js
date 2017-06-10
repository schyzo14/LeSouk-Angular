'use strict';

/**
 * @ngdoc service
 * @name clientApp.CandidaterAnnonceFactory
 * @description
 * # CandidaterAnnonceFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('CandidaterAnnonceFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/candidater/:idA',
      {idA : '@idA'},
      {update : {method:'PUT'}}
    );
  });
