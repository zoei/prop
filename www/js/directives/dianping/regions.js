namespace('prop.directives.dianping').Regions = ez.base.BaseDirective.extend({
	directive: 'regions',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<select ng-model="region" ng-options="r.name for r in regionlist"></select>',
	link: function(scope, element, attrs) {
	},
	controller: function(scope, element, attrs, DianPingApi){
		$scope.regionlist = DianPingApi.getRegions({city: '上海'}, function(data){
			$scope.defaultRegion = data[0];
		});
	}
});