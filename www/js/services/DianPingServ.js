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
				console.log(items);
				// if(callback)callback(items);
				return items;
			};

			if (way === 'ajax') {
				return HTTPProxy.ajax(config, transform, true).request(callback);
			} else {
				return HTTPProxy.jsonp(true, transform).request(App.util.HTTPProxyUtil.format(config), callback);
				// return JSONPProxy.request(App.util.HTTPProxyUtil.format(config), transform);
			}
		};
		return factory;
	}
]);
// prop.services.factory('DianPingBusiness', ['$resource',
// 	function($resource) {
// 		return $resource('./php/DianPingApi.php', {}, {
// 			get: {
// 				method: 'GET',
// 				isArray: true,
// 				params: getQueryObject(),
// 				transformResponse: function(data) {
// 					console.log(data);
// 					var items = [];

// 					data = JSON.parse(data);
// 					var datalist = data.businesses;
// 					for (var i in datalist) {
// 						var d = datalist[i];
// 						if (!d) continue;
// 						var item = {
// 							icon: d.photo_url,
// 							text: d.name,
// 							data: d
// 						};
// 						items.push(item);
// 					}
// 					console.log(items);
// 					return items;
// 				}
// 			},
// 			regions: {
// 				method: 'GET',
// 				isArray: true,
// 				params: getQueryObject()
// 			}
// 		});
// 	}
// ]);

// function formatPostData(postData) {
// 	var str = [];
// 	for (var p in postData) {
// 		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(postData[p]));
// 	}
// 	return str.join("&");
// }

// function getApiParams() {
// 	var param = {};
// 	param["city"] = "上海";
// 	param["latitude"] = "31.218775";
// 	param["longitude"] = "121.464059";
// 	param["category"] = "美食";
// 	param["region"] = "黄浦区";
// 	param["limit"] = "20";
// 	param["radius"] = "5000";
// 	param["offset_type"] = "2";
// 	param["has_coupon"] = "1";
// 	param["has_deal"] = "1";
// 	param["keyword"] = "菜";
// 	param["sort"] = "7";
// 	return param;
// }

// function getSecretSign() {
// 	var appkey = "86484869";
// 	var secret = "0c7c60d99eca4f7a9c02b1dcec69367c";

// 	var param = getApiParams();
// 	var array = new Array();
// 	for (var key in param) {
// 		array.push(key);
// 	}
// 	array.sort();

// 	var paramArray = new Array();
// 	paramArray.push(appkey);
// 	for (var index in array) {
// 		var key = array[index];
// 		paramArray.push(key + param[key]);
// 	}
// 	paramArray.push(secret);

// 	var shaSource = paramArray.join("");
// 	var sign = new String(CryptoJS.SHA1(shaSource)).toUpperCase();
// 	return sign;
// }

// function getQueryObject() {
// 	var appkey = "86484869";

// 	var param = getApiParams();
// 	param["appkey"] = appkey;
// 	param["sign"] = getSecretSign();
// 	return param;
// }

// function getUrl() {
// 	var serverUrl = "./php/HTTPProxy.php";
// 	var apiPath = "v1/business/find_businesses";

// 	var param = getQueryObject();
// 	var queryArray = new Array();
// 	for (var key in param) {
// 		queryArray.push(key + "=" + param[key]);
// 	}
// 	var queryString = queryArray.join("&");

// 	var url = serverUrl + apiPath + "?" + queryString;
// 	return url;
// }