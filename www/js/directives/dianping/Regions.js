require([
	'controllers/dianping/RegionsCtrl'
]);
namespace('prop.directives.dianping').Regions = ez.base.BaseDirective.extend({
	directive: 'regions',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<select ng-model="region" ng-options="r.name for r in regionlist" ng-change="regionChanged(region)"/>',
	replace: true,
	link: function(scope, element, attrs) {
		scope.regionChangeEventName = attrs['regionChange'] || 'regionChange';
	},
	controller: App.controller.dianping.RegionsCtrl
});