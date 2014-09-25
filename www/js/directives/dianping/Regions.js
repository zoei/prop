namespace('prop.directives.dianping').Regions = ez.base.BaseDirective.extend({
	$inject: ['$scope', 'DianPingApi'],
	directive: 'regions',
	module: 'prop.directives',
	restrict: 'EA',
	template: '<select ng-model="region" ng-options="r.name for r in regionlist" ng-change="regionChanged(region)"/>',
	scope: {
		regionChange2: '=regionChanged2'
	},
	replace: true,
	link: function(scope, element, attrs) {
		console.log(scope);
		scope.regionChangeEventName = attrs['regionChange'] || 'regionChange';
	},
	controller: function($scope, DianPingApi) {
		$scope.regionlist = DianPingApi.getRegions({city: '上海'}, function(data){
			$scope.region = data[0];
		});
		$scope.regionChanged = function(region){
			$scope.$emit($scope.regionChangeEventName, region);
		};
	}
});