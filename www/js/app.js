require([
	'filters/filters',
	'services/services',
	'directives/directives',
	'controllers/controllers'
]);

var prop = angular.module('prop', ['ngRoute', 'angular-gestures', 'ez', 'prop.filters', 'prop.services']);

prop.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/top', {
			templateUrl: 'partials/top.html',
			controller: 'App.controller.TopCtrl'
		});
		$routeProvider.when('/list', {
			templateUrl: 'partials/list.html',
			controller: 'App.controller.ListCtrl'
		});
		$routeProvider.when('/detail/:phoneId', {
			templateUrl: 'partials/detail.html',
			controller: 'App.controller.DetailCtrl'
		});
		$routeProvider.otherwise({
			redirectTo: '/top'
		});
	}
]);