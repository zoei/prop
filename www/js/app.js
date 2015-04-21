define([
	'filters/filters',
	'services/__import',
	'directives/__import',
	'controllers/__import'
], function(){
	var prop = angular.module('prop', ['ngRoute', 'angular-gestures', 'ez', 'prop.directives', 'prop.filters', 'prop.services']);
	prop.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/m/top', {
				templateUrl: 'partials/m/top.html',
				controller: 'App.controller.mobile.TopCtrl'
			}).when('/boot', {
				templateUrl: 'partials/boot.html',
				controller: 'App.controller.BootCtrl'
			}).when('/dianpingtest', {
				templateUrl: 'partials/dianpingtest.html',
				controller: 'App.controller.DianPingCtrl'
			}).when('/top', {
				templateUrl: 'partials/top.html',
				controller: 'App.controller.TopCtrl'
			}).when('/list', {
				templateUrl: 'partials/list.html',
				controller: 'App.controller.ListCtrl'
			}).when('/detail/:business_id', {
				templateUrl: 'partials/detail.html',
				controller: 'App.controller.DetailCtrl'
			}).otherwise({
				redirectTo: '/m/top'
			});
		}
	]);
	return prop;
});
