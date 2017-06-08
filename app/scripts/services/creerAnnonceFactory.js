'use strict';

/**
 * @ngdoc service
 * @name leSoukApp.creerAnnonceFactory
 * @description
 * # creerAnnonceFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('creerAnnonceFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/'
          
    );
  });