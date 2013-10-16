# dcl-widget

Base class for DCL Widgets.

When creating new DCL widget, extend from this class.

```javascript
var D = require('dual');
var DCLWidget = require('dcl-widget');

var MyWidget = DCLWidget.extend({
	ATTRS : {/*attributes*/},
	initStructure : function () {
		this.$ = D.fromJSON(/*your widget structure*/);
	}
});

var w = new MyWidget();

```

Differences between standard dual.Widget and DCLWidget:

 - new attribute description field `cssClass` - map of attribute values to CSS classes
 - new attribute description field `cssClassAsset` - name of asset that accepts CSS classes from `cssClass`
 
Nothing more yet.

----

TODO: attribute-related sugar similar to above will be added to this base class.
