require([
	'utils/HTTPProxyUtil'
]);
prop.services.factory('DianPingApi', ['HTTPProxy',
	function(HTTPProxy) {
		var factory = {};
		var way = 'server';
		var common = {
			appkey: '5589931241',//86484869',
			secret: '16adbf199c38458f847f4c99d25cab4d',//'0c7c60d99eca4f7a9c02b1dcec69367c',
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
				// region: "黄浦区",
				latitude: '31.18268013000488',
				longitude: '121.42769622802734',
				limit: "20",
				radius: "5000",
				offset_type: "1",
				out_offset_type: "1",
				has_deal: "1",
				// keyword: "菜",
				sort: "1",
				platform: 2
			};

			var transform = function(data) {
				var items = [];

				if(typeof data === 'string'){
					data = JSON.parse(data);
				}
				var datalist = data.businesses;
				console.log(datalist);
				for (var i in datalist) {
					var d = datalist[i];
					if (!d) continue;
					var item = {
						business_id: d.business_id,
						icon: d.photo_url,
						name: d.name,
						address: d.address,
						tel: d.telephone,
						link: d.business_url
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
					// var item = {
					// 	category_name: d.category_name,
					// 	subcategories: d.subcategoriess
					// };
					items.push(d);
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

		factory.getDetail = function(params, callback) {
			var jsonpResource, ajaxResource;
			var defaultParams = {};

			var transform = function(data) {

				if(typeof data === 'string'){
					data = JSON.parse(data);
				}
				var d = data.businesses[0];
				var item = {
					business_id: d.business_id,
					icon: d.photo_url,
					name: d.name,
					address: d.address,
					tel: d.telephone
				};
				return item;
			};

			var request = {
				url: 'http://api.dianping.com/v1/business/get_single_business',
				params: common.getQueryObject(defaultParams, params)
			};

			var config = {
				uri: request.url,
				format: 'json',
				isArray: false,
				transformResponse: transform,
				way: way
			};

			factory._detailResource = factory._detailResource || HTTPProxy.init(config);
			if(way === 'jsonp' || way === 'server'){
				return factory._detailResource.request(App.util.HTTPProxyUtil.format(request), callback);
			} else {
				return factory._detailResource.request(request.params, callback);
			}
		};

		factory.getReviews = function(params, callback) {
			var jsonpResource, ajaxResource;
			var defaultParams = {};

			var transform = function(data) {
				var items = [];

				if(typeof data === 'string'){
					data = JSON.parse(data);
				}
				var datalist = data.reviews;
				for (var i in datalist) {
					var d = datalist[i];
					if (!d) continue;
					var item = d;
					items.push(item);
				}
				return items;
			};

			var request = {
				url: 'http://api.dianping.com/v1/review/get_recent_reviews',
				params: common.getQueryObject(defaultParams, params)
			};

			var config = {
				uri: request.url,
				format: 'json',
				isArray: true,
				transformResponse: transform,
				way: way
			};

			factory._reviewsResource = factory._reviewsResource || HTTPProxy.init(config);
			if(way === 'jsonp' || way === 'server'){
				return factory._reviewsResource.request(App.util.HTTPProxyUtil.format(request), callback);
			} else {
				return factory._reviewsResource.request(request.params, callback);
			}
		};

		return factory;
	}
]);