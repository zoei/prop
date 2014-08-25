require([
	'angular',
	'angular.resource',
	'angular.route',
	'filters/filters',
	'services/services',
	'controllers/controllers'
]);

var prop = angular.module('prop', ['ngRoute', 'prop.filters', 'prop.services']);

prop.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/list', {
			templateUrl: 'partials/list.html',
			controller: 'App.controller.ListCtrl'
		});
		$routeProvider.when('/detail/:phoneId', {
			templateUrl: 'partials/detail.html',
			controller: 'App.controller.DetailCtrl'
		});
		$routeProvider.otherwise({
			redirectTo: '/list'
		});
	}
]);