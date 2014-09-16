require([
	'utils/HTTPProxyUtil'
]);
prop.services.factory('DianPingApi', ['$rootScope', 'HTTPProxy',
	function($rootScope, HTTPProxy) {
		var factory = {};
		var way = 'server';
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
				// console.log(param);
				var sign = this.getSecretSign(param);
				param["sign"] = sign;
				param["appkey"] = common.appkey;
				return param;
			}
		};

		factory.getBusiness = function(params, callback) {
			var defaultParams = {
				city: "上海",
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

			var transform = function(data) {
				var items = [];

				if(typeof data === 'string'){
					data = JSON.parse(data);
				}
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

			var request = {
				url: 'http://api.dianping.com/v1/business/find_businesses',
				params: common.getQueryObject(defaultParams, params),
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

			factory._businessResource = factory._businessResource || HTTPProxy.init(config);
			if(way === 'jsonp' || way === 'server'){
				return factory._businessResource.request(App.util.HTTPProxyUtil.format(request), callback);
			} else {
				return factory._businessResource.request(request.params, callback);
			}
		};

		factory.getRegions = function(params, callback) {
			var jsonpResource, ajaxResource;
			var defaultParams = {
				city: "上海"
			};

			var transform = function(data) {
				var items = [];

				if(typeof data === 'string'){
					data = JSON.parse(data);
				}
				var datalist = data.cities[0].districts;
				for (var i in datalist) {
					var d = datalist[i];
					if (!d) continue;
					var item = {
						name: d.district_name,
						neighborhoods: d.neighborhoods
					};
					items.push(item);
				}
				return items;
			};

			var request = {
				url: 'http://api.dianping.com/v1/metadata/get_regions_with_businesses',
				params: common.getQueryObject(defaultParams, params)
			};

			var config = {
				uri: request.url,
				format: 'json',
				isArray: true,
				transformResponse: transform,
				way: way
			};

			factory._regionsResource = factory._regionsResource || HTTPProxy.init(config);
			if(way === 'jsonp' || way === 'server'){
				return factory._regionsResource.request(App.util.HTTPProxyUtil.format(request), callback);
			} else {
				return factory._regionsResource.request(request.params, callback);
			}
		};

		factory.getCategories = function(params, callback) {
			var jsonpResource, ajaxResource;
			var defaultParams = {
				city: "上海"
			};

			var transform = function(data) {
				var items = [];

				if(typeof data === 'string'){
					data = JSON.parse(data);
				}
				var datalist = data.categories;
				for (var i in datalist) {
					var d = datalist[i];
					if (!d) continue;
					var item = {
						name: d.category_name,
						neighborhoods: d.subcategoriess
					};
					items.push(item);
				}
				return items;
			};

			var request = {
				url: 'http://api.dianping.com/v1/metadata/get_categories_with_businesses',
				params: common.getQueryObject(defaultParams, params)
			};

			var config = {
				uri: request.url,
				format: 'json',
				isArray: true,
				transformResponse: transform,
				way: way
			};

			factory._categoriesResource = factory._categoriesResource || HTTPProxy.init(config);
			if(way === 'jsonp' || way === 'server'){
				return factory._categoriesResource.request(App.util.HTTPProxyUtil.format(request), callback);
			} else {
				return factory._categoriesResource.request(request.params, callback);
			}
		};

		return factory;
	}
]);