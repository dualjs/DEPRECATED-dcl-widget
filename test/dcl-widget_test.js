'use strict';

var Widget = require('../lib/dcl-widget.js');
var D = require('dual');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['dcl-widget'] = {
    setUp: function(done) {
        // setup here
        done();
    },
    'cssClass': function(test) {
        test.expect(3);

        var W = Widget.extend({
            ATTRS: {
                foo: {
                    cssClass: {
                        '1': 'foo-one',
                        '2': 'foo-two',
                        '3': 'foo-three'
                    }
                }
            },

            initStructure: function() {
                this.$ = D.fromJSON(['div']);
            }
        });

        var w = new W();
        w.setFoo(1);
        test.equal(w.stringify(), '<div class="foo-one"></div>');
        w.setFoo(2);
        test.equal(w.stringify(), '<div class="foo-two"></div>');
        w.setFoo(5);
        test.equal(w.stringify(), '<div class=""></div>');


        test.done();
    },

    'cssClassAsset': function(test) {
        test.expect(3);

        var W = Widget.extend({
            ATTRS: {
                foo: {
                    cssClass: {
                        '1': 'foo-one',
                        '2': 'foo-two',
                        '3': 'foo-three'
                    },
                    cssClassAsset: 'foo' // <-- asset that would accept CSS class from cssClass
                }
            },

            initStructure: function() {
                this.$ = D.fromJSON(['div', [
                    ['ul', {
                        'ui:asset': 'foo'
                    }]
                ]]);
            }
        });

        var w = new W();
        w.setFoo(1);
        test.equal(w.stringify(), '<div><ul class="foo-one"></ul></div>');
        w.setFoo(2);
        test.equal(w.stringify(), '<div><ul class="foo-two"></ul></div>');
        w.setFoo(5);
        test.equal(w.stringify(), '<div><ul class=""></ul></div>');


        test.done();
    },

    'cssClass as string': function(test) {
        test.expect(2);

        var W = Widget.extend({
            ATTRS: {
                foo: {
                    cssClass: 'test'
                }
            },

            initStructure: function() {
                this.$ = D.fromJSON(['div']);
            }
        });

        var w = new W();
        w.setFoo(true);
        test.equal(w.stringify(), '<div class="test"></div>');
        w.setFoo(false);
        test.equal(w.stringify(), '<div class=""></div>');

        test.done();
    },

    'multiple attrs': function(test) {
        test.expect(2);

        var W = Widget.extend({
            ATTRS: {
                foo: {
                    cssClass: 'test'
                },
                bar: {
                    cssClass: 'example'
                }
            },

            initStructure: function() {
                this.$ = D.fromJSON(['div']);
            }
        });

        var w = new W();
        w.setFoo(true);
        test.equal(w.stringify(), '<div class="test"></div>');
        w.setBar(true);
        test.equal(w.stringify(), '<div class="test example"></div>');

        test.done();
    },

    'htmlAttribute': function(test) {
        test.expect(1);

        var W = Widget.extend({
            ATTRS: {
                url: {
                    htmlAttribute: 'href',
                    htmlAttributeAsset: 'link'
                }
            },

            initStructure: function() {
                this.$ = D.fromJSON([
                    'div', [
                        ['a', {
                            'ui:asset': 'link'
                        }]
                    ]
                ]);
            }
        });

        var w = new W();
        w.setUrl('http://example.com/');
        test.equal(w.stringify(), '<div><a href="http://example.com/"></a></div>');

        test.done();

    },

    'textAsset': function(test) {
        test.expect(1);

        var W = Widget.extend({
            ATTRS: {
                linkText: {
                    textAsset: 'link'
                }
            },

            initStructure: function() {
                this.$ = D.fromJSON([
                    'div', [
                        ['a', {
                            'ui:asset': 'link'
                        }]
                    ]
                ]);
            }
        });

        var w = new W();
        w.setLinkText('hello');
        test.equal(w.stringify(), '<div><a>hello</a></div>');

        test.done();

    },
    'textAssetRoot': function(test) {
        test.expect(1);

        var W = Widget.extend({
            ATTRS: {
                rootText: {
                    textAsset: false
                }
            },

            initStructure: function() {
                this.$ = D.fromJSON(['div']);
            }
        });

        var w = new W();
        w.setRootText('hello');
        test.equal(w.stringify(), '<div>hello</div>');

        test.done();

    }
};