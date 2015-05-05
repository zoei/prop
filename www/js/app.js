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
			}).when('/game', {
				templateUrl: 'partials/game.html',
				controller: 'App.controller.GameCtrl'
			}).when('/grapes', {
				templateUrl: 'partials/grapes/home.html',
				controller: 'App.controller.GrapesHomeCtrl'
			}).when('/grapes_detail/:act_id', {
				templateUrl: 'partials/grapes/detail.html',
				controller: 'App.controller.GrapesDetailCtrl'
			}).when('/grapes_user_login', {
				templateUrl: 'partials/grapes/login.html',
				controller: 'App.controller.GrapesUserLoginCtrl'
			}).when('/grapes_user_reg', {
				templateUrl: 'partials/grapes/register.html',
				controller: 'App.controller.GrapesUserRegCtrl'
			}).when('/grapes_user_console', {
				templateUrl: 'partials/grapes/user_console.html',
				controller: 'App.controller.GrapesUserConsoleCtrl'
			}).when('/grapes_new_activity', {
				templateUrl: 'partials/grapes/new_activity.html',
				controller: 'App.controller.GrapesNewActivityCtrl'
			}).otherwise({
				redirectTo: '/grapes'
			});
		}
	]);
	return prop;
});