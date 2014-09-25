namespace('ez.directives').Carousel = ez.base.BaseDirective.extend({
	directive: 'carousel',
	module: 'ez.directives',
	restrict: 'EA',
	templateUrl: 'partials/directives/carousel.html',
	replace: true,
	scope: {
		dataName: '@data'
	},
	link: function(scope, element, attrs) {
		scope.carouselId = attrs['identity'] || 'carousel-'+ Math.uuid(8);

		scope.itemChangeEventName = attrs['itemChange'] || 'itemChange';

		scope.$parent.$watch(scope.dataName, function(d){
			scope.slides = d;
		});

		scope.setData = function(data){
			scope.slides = data;
		};
	}
});