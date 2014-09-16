require([
	'controllers/dianping/RegionsCtrl'
]);
namespace('prop.directives.dianping').Regions = ez.base.BaseDirective.extend({
	directive: 'regions',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<select ng-model="region" ng-options="r.name for r in regionlist" ng-change="regionChanged(region)">' +
				'<option value="{{defaultRegion.name}}">{{defaultRegion.name}}</option>' +
				'</select>',
	replace: true,
	link: function(scope, element, attrs) {
	},
	controller: App.controller.dianping.RegionsCtrl
});