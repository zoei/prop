namespace('ez.directives').T = ez.base.BaseDirective.extend({
	directive: 't',
	module: 'ez.directives',
	restrict: 'EA',
	template: '<div>1234</div>'
});
ez.directives.D = ez.directives.T.extend({
	directive: 'd'
});