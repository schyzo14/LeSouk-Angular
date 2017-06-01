'use strict';

/**
 * @ngdoc service
 * @name clientApp.rechercherAnnoncesFactory
 * @description
 * # RechercherAnnoncesFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('RechercherAnnoncesFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/rechercher/:idU/:motsCles',
      {idU : '@idU', motsCles : '@motsCles'},
      {query: {method:'GET', isArray:true}}
    );
  });
