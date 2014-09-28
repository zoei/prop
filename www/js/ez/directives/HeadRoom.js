namespace('ez.directives').HeadRoom = ez.base.BaseDirective.extend({
	directive: 'headroom',
	module: 'ez.directives',
	restrict: 'EA',
	scope: {
		tolerance: '=',
		offset: '=',
		classes: '=',
		scroller: '@'
	},
	link: function(scope, element) {
		var options = {};
		angular.forEach(Headroom.options, function(value, key) {
			options[key] = scope[key] || Headroom.options[key];
		});
		if (options.scroller) {
			options.scroller = angular.element(options.scroller)[0];
	    }
		var headroom = new Headroom(element[0], options);
		headroom.init();
		scope.$on('destroy', function() {
			headroom.destroy();
		});
	  }
});