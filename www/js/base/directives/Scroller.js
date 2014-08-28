require(['base/utils/UUID']);

var directives = angular.module('prop.base.directives', []);
directives.directive('scroller', function() {
	return {
		restrict: 'EAC',
		replace: false,
		transclude: true,
		template: '<div>Hi there</div>',
		link: function(scope, element, attrs) {
			element.context.id = element.context.id || Math.uuid(8);
			var wrapper = document.getElementById(element.context.id);
			scope.scroller = new IScroll(wrapper, {
				zoom: true,
				scrollbars: false
			});
		}
	};
});