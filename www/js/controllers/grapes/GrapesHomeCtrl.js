namespace('App.controller');
App.controller.GrapesHomeCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', '$rootScope', 'GrapesServ'],
	init: function($scope, $rootScope, GrapesServ) {
        $scope.$parent.setTitle({
            title: 'Grapes',
            leftText: '',
            rightText: $rootScope.currentUser ? 'New' : '',
            rightAction: function(){
                window.location.hash = '#/grapes_new_activity';
            },
            visible: true
        });

        $rootScope.userActivities = GrapesServ.getUserActivities({user: $rootScope.currentUser}, function(acts){
            // $scope.scroller.delayRefresh();
        });

        $scope.pub_acts = GrapesServ.getPublicActivities({count: 20}, function(acts){
            // $scope.scroller.delayRefresh();
        });

        $scope.onActTap = function(act){
            window.location.hash = '#/grapes_detail/' + act.id;
        };
        $scope.goLogin = function(){
            window.location.hash = '#/grapes_user_login';
        };
        $scope.goRegister = function(){
            window.location.hash = '#/grapes_user_reg';
        };
        $scope.logout = function(){
            $rootScope.currentUser = null;
            window.history.go(0);
        };
	}
});