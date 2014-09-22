namespace('ez.directives').Carousel = ez.base.BaseDirective.extend({
	directive: 'carousel',
	module: 'ez.directives',
	restrict: 'EA',
	templateUrl: 'partials/directives/carousel.html',
	replace: true,
	// scope: true,
	link: function(scope, element, attrs) {
		scope.carouselId = attrs['identity'] || 'carousel-'+ Math.uuid(8);
		// var dataName = attrs['data'] || 'slides';

		scope.itemChangeEventName = attrs['itemChange'] || 'itemChange';

		// scope.slides = scope.$parent[dataName];
		scope.carousel = {
			setData: function(data){
				scope.slides = data;
			},
		};
	}
});