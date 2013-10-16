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
    'classMap': function(test) {
        test.expect(3);

        var W = Widget.extend({
            ATTRS: {
                foo: {
                    classMap: {
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

    'classAsset': function(test) {
        test.expect(3);

        var W = Widget.extend({
            ATTRS: {
                foo: {
                    classMap: {
                        '1': 'foo-one',
                        '2': 'foo-two',
                        '3': 'foo-three'
                    },
                    classAsset : 'foo' // <-- asset that would accept CSS class from classMap
                }
            },

            initStructure: function() {
                this.$ = D.fromJSON(['div', [
                    ['ul', {'ui:asset':'foo'}]
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
    }
};