'use strict';

/**
 * @ngdoc service
 * @name clientApp.GeoLocalisationFactory
 * @description
 * # GeoLocalisationFactory
 * Factory in the clientApp.
 */
angular.module('leSoukApp')
  .factory('GeoLocalisationFactory', function ($resource) {
	return $resource('http://localhost:8081/geosorter/api/geosort');
  });
