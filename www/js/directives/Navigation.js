namespace('prop.directives').Navigation = ez.base.BaseDirective.extend({
	directive: 'navigation',
	module: 'prop.directives',
	restrict: 'EA',
	templateUrl: './partials/navigation-bar.html',
	link: function(scope, element, attrs) {
		scope.back = function(){
			window.history.go(-1);
		};
	},
	// controller: function(scope, element, attrs){
	// 	scope.back = function(){
	// 		window.history.go(-1);
	// 	};
	// }
});