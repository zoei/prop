namespace('App.controller');
App.controller.AppCtrl = ez.base.BaseController.extend({
	$inject: ['$scope'],
	init: function($scope) {
        $scope.setTitle = function(options){
            $scope.title = options.title || '';
            $scope.leftText = options.leftText || '';
            $scope.leftAction = options.leftAction;
            $scope.rightText = options.rightText || '';
            $scope.rightAction = options.rightAction;
            $scope.titleVisible = options.visible;
        };
	}
});