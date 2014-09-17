namespace('App.controller.dianping').RegionsCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingApi'],

	init: function($scope, DianPingApi) {
		$scope.regionlist = DianPingApi.getRegions({city: '上海'}, function(data){
			$scope.region = data[0];
		});
		$scope.regionChanged = function(region){
			$scope.$emit($scope.regionChangeEventName, region);
		};
	}
});