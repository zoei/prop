namespace('App.controller').DianPingCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingApi'],

	init: function($scope, DianPingApi) {
		var searchBusiness = function(){
			var region = $scope.region ? $scope.region.name : '黄浦区';
			$scope.foodlist = DianPingApi.getBusiness({region: region,'keyword': '菜'}, function(){
				if($scope.scroller){
					$scope.scroller.delayRefresh();
				}
			});
		};
		searchBusiness();

		$scope.regionChanged = function(){
        	console.log('regionChanged', $scope.region);
			searchBusiness();
		}
		$scope.clickItem = function(index, item) {
			console.log(item.data);
			window.location.href = '#/muslim/' + item.data.full + '-' + item.data.plug;
		};
		$scope.formatName = function(name) {
			/(.*)\(.*\)/.test(name);
			return RegExp.$1 || name;
		};
	}
});