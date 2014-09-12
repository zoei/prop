require([
	'utils/HTTPProxyUtil'
]);
namespace('App.controller').HTTPProxyCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'DianPingBusiness'],

	init: function($scope, DianPingBusiness) {
		$scope.foodlist = DianPingBusiness.getRegions({'keyword': '清真菜'}, function(){
			console.log($scope.foodlist);
			$scope.scroller.delayRefresh();
		}, 'ajax');
		$scope.clickItem = function(index, item) {
			console.log(item.data);
			window.location.href = '#/muslim/' + item.data.full + '-' + item.data.plug;
		};
		$scope.back = function() {
			window.history.go(-1);
		};
		$scope.formatName = function(name) {
			/(.*)\(.*\)/.test(name);
			return RegExp.$1 || name;
		};
	}
});