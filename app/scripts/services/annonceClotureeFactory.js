'use strict';

/**
 * @ngdoc service
 * @name leSoukApp.AnnonceClotureeFactory
 * @description
 * # AnnonceClotureeFactory
 * Factory in the leSoukApp.
 */
angular.module('leSoukApp')
  .factory('AnnonceClotureeFactory', function ($resource) {
	return $resource('http://localhost:8080/api/annonces/cloturee/:idA',
      {idA : '@idA'}
    );
  });
