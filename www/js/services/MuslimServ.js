prop.services.factory('MuslimFood', ['$resource', 
	function($resource){
		return $resource('http://api.dianping.com/v1/business/find_businesses', {}, {
			get : {
				method:'GET',
				isArray : true,
				params: getQueryObject(),
				transformResponse : function(data){
					console.log(data);
					var items = [];
					data = JSON.parse(data);
					var datalist = data.businesses;
					for(var i in datalist){
						var d = datalist[i];
						if(!d)continue;
						var item = {
							icon: d.photo_url,
							text: d.name,
							data: d
						};	
						items.push(item);
					}
					return items;
				}
			}
		});
	}]);

function formatPostData(postData){
	var str = [];
	for(var p in postData){
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(postData[p]));
	}
	return str.join("&");
}

function getApiParams(){
	var param = {};  
	param["city"]="上海";  
	param["latitude"]="31.218775";  
	param["longitude"]="121.464059";  
	param["category"]="美食";  
	param["region"]="黄浦区";  
	param["limit"]="20";  
	param["radius"]="5000";  
	param["offset_type"]="2";  
	param["has_coupon"]="1";  
	param["has_deal"]="1";  
	param["keyword"]="菜";
	param["sort"]="7";
	return param;
}

function getSecretSign(){
	var appkey = "86484869";
	var secret = "0c7c60d99eca4f7a9c02b1dcec69367c";

	var param = getApiParams();
	var array = new Array();
	for(var key in param){
		array.push(key);
	}
	array.sort();

	var paramArray = new Array();
	paramArray.push(appkey);
	for(var index in array){
		var key = array[index];
		paramArray.push(key + param[key]);
	}
	paramArray.push(secret);

	var shaSource = paramArray.join("");
	var sign = new String(CryptoJS.SHA1(shaSource)).toUpperCase();
	return sign;
}

function getQueryObject(){
	var appkey = "86484869";

	var param = getApiParams();
	param["appkey"] = appkey;
	param["sign"] = getSecretSign();
	return param;
}

function getUrl(){
	var serverUrl = "http://api.dianping.com/";
	var apiPath = "v1/business/find_businesses";

	var param = getQueryObject();
	var queryArray = new Array();
	for(var key in param){
		queryArray.push(key + "=" + param[key]);
	}
	var queryString = queryArray.join("&");

	var url = serverUrl + apiPath + "?" + queryString;
	return url;
}
