require([
	'utils/HTTPProxyUtil'
]);
prop.services.factory('GrapesServ', ['HTTPProxy',
	function(HTTPProxy) {
		var factory = {};
		var way = 'server';

		var common = {
			getQueryObject: function(param, extraParams) {
				for (var p in extraParams) {
					param[p] = extraParams[p];
				}
				// console.log(param);
				var sign = this.getSecretSign(param);
				param["sign"] = sign;
				param["appkey"] = common.appkey;
				return param;
			}
		};

		factory.getUserActivities = function(params, callback) {
			var defaultParams = {
				_id: 1,
				api: 'user_acts',
				user: params.user,
				res: 'json'
			};

			var transform = function(result) {
				if(typeof result === 'string'){
					result = JSON.parse(result);
				}
				return result.data;
			};

			var request = {
				url: 'http://happymuslim.net/wx/db.php',
				params: defaultParams,
				postData: {},
				headers: {
					'X-Contract': true
				}
			};

			var config = {
				uri: request.url,
				format: 'json',
				isArray: true,
				transformResponse: transform,
				way: way
			};

			factory.userActivitiesResource = factory.userActivitiesResource || HTTPProxy.init(config);
			if(way === 'jsonp' || way === 'server'){
				return factory.userActivitiesResource.request(App.util.HTTPProxyUtil.format(request), callback);
			} else {
				return factory.userActivitiesResource.request(request.params, callback);
			}
		};

		return factory;
	}
]);