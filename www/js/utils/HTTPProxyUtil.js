namespace('App.util').HTTPProxyUtil = {
	format: function(params){
	    var base64Encoder = new Base64();  
      var paramsb64 = JSON.stringify(params);
      // console.debug('b64:', paramsb64);
      paramsb64 = base64Encoder.encode(paramsb64);
		return {_:paramsb64};
	},
};