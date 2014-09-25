namespace('ez.directives').Container = ez.base.BaseDirective.extend({
	$inject: ['$scope'],
	directive: 'container',
	module: 'ez.directives',
	restrict: 'EA',
	template: '<div>'+
				'<navigation/>'+
				'<div ng-transclude replace="true"></div>'+
			  '</div>',
	replace: true,
	transclude: true,
	link: function(scope, element, attrs) {
	},
	controller: function($scope){
		$scope.search = {
			txt: 'a',
			doSearch: function(){
				return '123';
			}
		};
	}
});