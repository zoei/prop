namespace('App.controller');
App.controller.DetailCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', '$routeParams', 'DianPingApi'],

	init: function($scope, $routeParams, DianPingApi) {
		var searchDetail = function(){
			$scope.item = DianPingApi.getDetail({business_id: $routeParams.business_id, platform: 2});
		};
		searchDetail();

		var searchReviews = function(){
			$scope.reviews = DianPingApi.getReviews({business_id: $routeParams.business_id, platform: 2});
		};
		searchReviews();
	},


});