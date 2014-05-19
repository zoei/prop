prop.services.factory('TopFact', ['$resource', 
	function($resource){
		return $resource('data/top_config.json', {}, {
			get : {
				method:'GET',
				isArray : false,
				transformResponse : function(data){
					data = JSON.parse(data);
					return data;
				}
			}
		});
	}]);