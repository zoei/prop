namespace('prop.directives').MainView = ez.base.BaseDirective.extend({
	$inject: ['$scope'],
	directive: 'mainView',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<navigation/>'+
				'<div ng-transclude/>'+
				'<foot-content/>',
	transclude: true
});