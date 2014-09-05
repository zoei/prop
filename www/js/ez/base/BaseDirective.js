namespace('ez.base')
ez.base.BaseDirective = Class.extend({});
ez.base.BaseDirective.extend = function(prop) {
	var newClass = function() {};
	extend(newClass, this);
	newClass.extend = arguments.callee;

	for (var p in prop) {
		newClass.prototype[p] = prop[p];
	}

	var directive = newClass.prototype.directive,
		module;
	if (typeof newClass.prototype.module === 'string') {
		module = namespace(newClass.prototype.module);
	} else if (typeof newClass.prototype.module === 'object') {
		module = newClass.prototype.module;
	}

	module.directive(directive, function() {
		return newClass.prototype;
	});

	if (newClass.init)
		newClass.init.apply(newClass, arguments);
	return newClass;
}