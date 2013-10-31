# dcl-widget

>>> DEPRECATED: merged into  `dual.Widget`

Base class for DCL Widgets.

When creating new DCL widget, extend from this class.

```javascript
var D = require('dual');
var DCLWidget = require('dcl-widget');

var MyWidget = DCLWidget.extend({
    ATTRS : {
        size : {
            cssClass : {
                big: 'widget-size-big',
                small: 'widget-size-small'
            }
        },
        type : {
            cssClass : {
                success: 'label-color-success',
                error: 'label-color-error'
            },
            cssClassAsset : 'label'
        },
        helpUrl: {
            htmlAttribute : 'href',
            htmlAttributeAsset : 'link'
        },
        helpText: {
            textAsset : 'link'
        }
    },
    initStructure : function () {
        this.$ = D.fromJSON(['div', [
            ['span', {'ui:asset':'label'}],
            ['a', {'ui:asset':'link'}, ['Details...']],
        ]]);
    }
});

var w = new MyWidget();

w.setSize('big'); //will turn off CSS class `widget-size-small` and turn on `widget-size-big` of the root node (`'div'`)

w.setType('error'); //will turn off CSS class `label-color-success` and turn on `label-color-error` of `label` asset

w.setHelpUrl('http://example.com/'); //will set `href` attribute of `link` asset to `'http://example.com/'`

w.setHelpText('More...'); //will set text of `link` asset to `'More...'`
```

Differences between standard dual.Widget and DCLWidget:

 - new attribute description field `cssClass` `{Object|String}` - map of attribute values to CSS classes
 - new attribute description field `cssClassAsset` `{String}` - name of asset that `cssClass` is bound to
 - new attribute description field `htmlAttribute` `{String}` - bound html attribute
 - new attribute description field `htmlAttributeAsset` `{String}` - name of asset that `htmlAttribute` is bound to
 - new attribute description field `textAsset` `{String}` - name of asset that text will be bound to the attribute

Nothing more yet.

----

TODO: attribute-related sugar similar to above will be added to this base class.
