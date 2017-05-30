'use strict';

/**
 * @ngdoc service
 * @name clientApp.creerAnnonceFactory
 * @description
 * # creerAnnonceFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('creerAnnonceFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/'
          
    );
  });