require(['base/utils/UUID']);

var directives = angular.module('prop.base.directives', []);
directives.directive('scrollable', function() {
	return {
		restrict: 'EA',
		replace: false,
		transclude: true,
		template: '<div ng-transclude></div>',
		// compile: function(tElement, tAttrs, transclude) {　　　　
		// 	return {
		// 		pre: function preLink(scope, element, attrs, controller) {
		// 			console.debug('pre');
		// 		},
		// 		post: function postLink(scope, element, attrs, controller) {
		// 			console.debug('post');
		// 		}
		// 	}
		// }
		link: function(scope, element, attrs) {
			element.addClass('wrapper');
			scope.scroller = new IScroll(element.context, {
				preventDefault: true,
				scrollbars: true
			});
		}
	};
});