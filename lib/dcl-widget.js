/*
 * dcl-widget
 * https://github.com/dualjs/dcl-widget
 *
 * Copyright (c) 2013 Mark
 * Licensed under the MIT license.
 */


'use strict';
var D = require('dual');


function applyClassMap(proto, attrName, applierName, classMap, classAsset) {
	applierName = applierName || 'applyAttribute_' + attrName;
	if ('function' === typeof(proto[applierName])) {
		return; //already exists
	}

	var valuesToClasses = [];
	for (var cssClass in classMap) {
		if (!classMap.hasOwnProperty(cssClass)) {
			continue;
		}

		valuesToClasses.push([cssClass, classMap[cssClass]]);
	}

	proto[applierName] = function(value) {
		var asset = classAsset ? this.assets[classAsset] : this.$;

		valuesToClasses.forEach(function(valueToClass) {
			var matchValue = valueToClass[0];
			var className = valueToClass[1];
			if ('' + matchValue === '' + value) {
				asset.addClass(className);
			} else {
				asset.removeClass(className);
			}
		}.bind(this));
	};
}

//--------------------------------------------------------------------

module.exports = D.Widget.extend({

}, {
	extend: function(protoProps, staticProps) {
		var newConstructor = D.Widget.extend.call(this, protoProps, staticProps);
		var attrs = newConstructor.prototype.ATTRS || {};
		for (var attr in attrs) {
			var desc = attrs[attr];
			if (desc) {
				if (desc.classMap) {
					// console.log(desc.classMap);
					applyClassMap(newConstructor.prototype, attr, desc.apply, desc.classMap, desc.classAsset);
				}
			}
		}
		return newConstructor;
	}
});