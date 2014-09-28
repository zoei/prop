namespace('prop.directives').Navigation = ez.base.BaseDirective.extend({
	directive: 'navigation',
	module: 'prop.directives',
	restrict: 'EA',
	templateUrl: './partials/directives/navigation-bar.html',
	link: function(scope, element, attrs) {
		scope.back = function(){
			window.history.go(-1);
		};
	}
});