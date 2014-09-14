require([
	'filters/filters',
	'services/__import',
	'directives/__import',
	'controllers/controllers'
]);

var prop = angular.module('prop', ['ngRoute', 'angular-gestures', 'ez', 'prop.directives', 'prop.filters', 'prop.services']);

prop.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/dianpingtest', {
			templateUrl: 'partials/dianpingtest.html',
			controller: 'App.controller.DianPingCtrl'
		});
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
			redirectTo: '/dianpingtest'
		});
	}
]);