function extend(Child, Parent) {　　
	var F = function() {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
}

function __default__(obj, defaults) {
	for(var p in defaults){
		if(!(p in obj))
			obj[p] = defaults[p];
	}
	return obj;
}