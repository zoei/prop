namespace('prop.directives').Footer = ez.base.BaseDirective.extend({
	directive: 'foot-content',
	module: 'prop.directives',
	restrict: 'EA',
	templateUrl: './partials/directives/footer.html',
	link: function(scope, element, attrs) {
	}
});