prop.services.factory('DianPingBusiness', ['$rootScope', 'HTTPProxy',
	function($rootScope, HTTPProxy) {
		var factory = {};
		var common = {
			appkey: '86484869',
			secret: '0c7c60d99eca4f7a9c02b1dcec69367c',
			getSecretSign: function(param) {
				var array = new Array();
				for (var key in param) {
					array.push(key);
				}
				array.sort();

				var paramArray = new Array();
				paramArray.push(this.appkey);
				for (var index in array) {
					var key = array[index];
					paramArray.push(key + param[key]);
				}
				paramArray.push(this.secret);

				var shaSource = paramArray.join("");
				var sign = new String(CryptoJS.SHA1(shaSource)).toUpperCase();
				return sign;
			},
			getQueryObject: function(param, extraParams) {
				for (var p in extraParams) {
					param[p] = extraParams[p];
				}
				console.log(param);
				var sign = this.getSecretSign(param);
				param["sign"] = sign;
				param["appkey"] = common.appkey;
				return param;
			}
		};

		factory.getRegions = function(params, callback, way) {
			var jsonpResource, ajaxResource;
			var defaultParams = {
				city: "上海",
				latitude: "31.218775",
				longitude: "121.464059",
				category: "美食",
				region: "黄浦区",
				limit: "20",
				radius: "5000",
				offset_type: "2",
				has_coupon: "1",
				has_deal: "1",
				keyword: "菜",
				sort: "7",
			};
			var config = {
				url: 'http://api.dianping.com/v1/business/find_businesses',
				params: common.getQueryObject(defaultParams, params),
				postData: {},
				headers: {
					'X-Contract': true
				}
			};

			var transform = function(data) {
				console.log(data);
				var items = [];

				data = JSON.parse(data);
				var datalist = data.businesses;
				for (var i in datalist) {
					var d = datalist[i];
					if (!d) continue;
					var item = {
						icon: d.photo_url,
						text: d.name,
						data: d
					};
					items.push(item);
				}
				return items;
			};

			if (way === 'ajax') {
				ajaxResource = ajaxResource ? ajaxResource : HTTPProxy.ajax(config, transform, true);
				return ajaxResource.request(callback);
			} else {
				jsonpResource = jsonpResource ? jsonpResource : HTTPProxy.jsonp(true, transform);
				return jsonpResource.request(App.util.HTTPProxyUtil.format(config), callback);
			}
		};
		return factory;
	}
]);