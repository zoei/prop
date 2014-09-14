namespace('App.util').HTTPProxyUtil = {
	format: function(params){
	    var base64Encoder = new Base64();  
        var paramsb64 = JSON.stringify(params);
        paramsb64 = base64Encoder.encode(paramsb64);
		return {_:paramsb64};
	},
};