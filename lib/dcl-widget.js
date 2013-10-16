/*
 * dcl-widget
 * https://github.com/dualjs/dcl-widget
 *
 * Copyright (c) 2013 Mark
 * Licensed under the MIT license.
 */


'use strict';
var D = require('dual');


function applySingleClass(proto, attrName, applierName, cssClass, classAsset) {
	applierName = applierName || 'applyAttribute_' + attrName;
	if ('function' === typeof(proto[applierName])) {
		return; //already exists
	}

	proto[applierName] = function(value) {
		var asset = classAsset ? this.assets[classAsset] : this.$;
		if(value) {
			asset.addClass(cssClass);
		} else {
			asset.removeClass(cssClass);
		}
	};
}

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

		for (var i = 0; i < valuesToClasses.length; i++) {
			var valueToClass = valuesToClasses[i];
			var matchValue = valueToClass[0];
			var className = valueToClass[1];
			if ('' + matchValue === '' + value) {
				asset.addClass(className);
			} else {
				asset.removeClass(className);
			}
		}
	};
}


function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
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
				if (desc.cssClass) {
					if(isString(desc.cssClass)) {
						applySingleClass(newConstructor.prototype, attr, desc.apply, desc.cssClass, desc.cssClassAsset);
					} else {
						applyClassMap(newConstructor.prototype, attr, desc.apply, desc.cssClass, desc.cssClassAsset);
					}
				}
			}
		}
		return newConstructor;
	}
});