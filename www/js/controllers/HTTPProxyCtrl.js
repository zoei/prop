require([
	'utils/HTTPProxyUtil'
]);
namespace('App.controller').DianPingCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingApi'],

	init: function($scope, DianPingApi) {
		$scope.foodlist = DianPingApi.getBusiness({'keyword': '菜'}, function(){
			$scope.scroller.delayRefresh();
		});
		// $scope.regionlist = DianPingApi.getRegions({city: '上海'}, function(data){
		// 	$scope.defaultRegion = data[0];
		// });
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