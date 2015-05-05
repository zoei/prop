namespace('prop.directives').MainView = ez.base.BaseDirective.extend({
	$inject: ['$scope'],
	directive: 'mainView',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<title-bar class="panel" ng-show="titleVisible"></title-bar>'+
				'<div ng-transclude/>'+
				'<foot-content/>',
	transclude: true
});