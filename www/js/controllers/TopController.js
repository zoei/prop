namespace('App.controller');
App.controller.TopCtrl = ez.base.BaseController.extend({
	$inject: ['$scope', 'TopFact', 'DianPingApi'],
	init: function($scope, TopFact, DianPingApi) {
		var me = this;

		var searchBusiness = function(){
			var params = {};
			params.region = '黄浦区';
			params.category = '美食';
			params.limit = 5;

			DianPingApi.getBusiness(params, function(result){
				var cdata = [];
				for (var i=0;i<result.length;i++) {
					var item = result[i];
					cdata.push({
						title: me.formatName(item.name),
						image: item.icon,
						text: item.address,
						class: '',
					});
				};
				cdata[0].class = ' active';
				$scope.cdata = cdata;
			});
		};
		searchBusiness();
	},

	formatName: function(name) {
		/(.*)\(.*\)/.test(name);
		return RegExp.$1 || name;
	}
});