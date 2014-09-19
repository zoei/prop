namespace('ez.directives').Scrollable = ez.base.BaseDirective.extend({
	directive: 'scrollable',
	module: 'ez.directives',
	restrict: 'EA',
	replace: false,
	transclude: true,
	template: '<div ng-transclude></div>',
	link: function(scope, element, attrs) {
		element.addClass('wrapper');
		var _scroller = new IScroll(element.context, {
			scrollbars: !!attrs.showScrollbar,
			// 滚动条不拖动时隐藏
			fadeScrollbars: true,
			// 滚动条是否可操作
			interactiveScrollbars: true,
			// 滚动条是否伸缩 clip/scale
			shrinkScrollbars: 'clip',
			preventDefaultException: {
				tagName: /^.*$/
			},
		});
		scope.scroller = {
			_scroller: _scroller,
			refresh: _scroller.refresh,
			delayRefresh: function(time) {
				setTimeout(function() {
					scope.scroller._scroller.refresh(true);
				}, time === undefined ? 200 : time);
			}
		};
	}
});