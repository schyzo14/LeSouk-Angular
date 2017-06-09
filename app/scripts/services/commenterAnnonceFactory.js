'use strict';

/**
 * Ajouter un commentaire à une annonce idA
 * @ngdoc service
 * @name leSoukApp.CommenterAnnonceFactory
 * @description
 * # CommenterAnnonceFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('CommenterAnnonceFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/:idA',
      {idA : '@idA'},
      {update : {method:'PUT'}}
    );
  });
