require(['angular', 'angular.resource']);
var services = angular.module('prop.services', ['ngResource']);
services.factory('Phone', function($resource) {
	return $resource('data/phones/:phoneId.json', {}, {
		query: {
			method: 'GET',
			params: {
				phoneId: 'phones'
			},
			isArray: true
		},
		get: {
			method: 'GET',
			params: {
				phoneId: 'phones'
			},
			isArray: false
		}
	});
});