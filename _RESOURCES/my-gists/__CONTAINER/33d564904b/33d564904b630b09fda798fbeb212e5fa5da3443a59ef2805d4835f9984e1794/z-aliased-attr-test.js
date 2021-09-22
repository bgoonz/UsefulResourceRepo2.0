YUI.add("z-aliased-attr-test", function (Y) {

var suite = new Y.Test.Suite("z-aliased-attr"),

    testATTRS = {
        a: {
            aliased: 'alpha',
            value: 'A'
        },
        b: {
            value: 'B'
        },
        c: {
            aliased: 'gamma',
            lazyAdd: false,
            value: 'C'
        }
    },

    TestClass = Y.Base.create('testClass', Y.Base,  [Y.Z.AliasedAttr], {}, { ATTRS: testATTRS }),
    TestModel = Y.Base.create('testModel', Y.Model, [Y.Z.AliasedAttr], {}, { ATTRS: testATTRS });

suite.add(new Y.Test.Case({

    name: "Aliased Attribute Lifecycle",

    "_initAliasedAttrs should setup _attrNames property as an array": function () {
        var instance = new TestClass();

        Y.ObjectAssert.ownsKey('_attrNames', instance, "Didn't cache _attrNames property");
        Y.Assert.isArray(instance._attrNames, "_attrNames wasn't an array");
    },

    "_initAliasedAttrs (Base) should filter protected attributes out of _attrNames array": function () {
        var instance = new TestClass(),
            names = instance._attrNames;

        Y.ArrayAssert.containsItems(['a', 'b', 'c'], names, "Incorrect filtering: " + names);
    },

    "_initAliasedAttrs (Model) should filter protected attributes out of _attrNames array": function () {
        var instance = new TestModel(),
            names = instance._attrNames;

        Y.ArrayAssert.containsItems(['id', 'a', 'b', 'c'], names, "Incorrect filtering: " + names);
    },

    "_initAliasedAttrs (Model) should filter custom idAttribute out of _attrNames array": function () {
        // override Y.Model's default, 'id'
        TestModel.prototype.idAttribute = 'a';

        var instance = new TestModel(),
            names = instance._attrNames;

        Y.ArrayAssert.containsItems(['a', 'b', 'c'], names, "custom idAttribute not removed: " + names);

        // reset TestModel to Y.Model's default
        delete TestModel.prototype.idAttribute;
    },

    "_initAliasedAttrs should cache _getAliasedName function": function () {
        var instance = new TestClass();

        Y.ObjectAssert.ownsKey('_getAliasedName', instance, "Didn't cache _getAliasedName function");
        Y.Assert.isFunction(instance._getAliasedName, "_getAliasedName function not created");
    },

    "getAlias() should be provided on instance": function () {
        var instance = new TestClass();

        Y.Assert.isFunction(instance.getAliased, "getAliased() missing on instance");
    }

}));

suite.add(new Y.Test.Case({

    name: "Aliased Attribute Getters",

    "getAliased() should return value when valid alias passed in": function () {
        var instance = new TestClass();

        Y.Assert.areSame('A', instance.getAliased('alpha'), "getAliased('alpha') did not return 'A'");
    },

    "getAliased() should return undefined when invalid alias passed in": function () {
        var instance = new TestClass();

        Y.Assert.isUndefined(instance.getAliased('beta'), "getAliased('beta') should not return 'B'");
    },

    "getAliased() should return value when valid non-alias passed in": function () {
        var instance = new TestClass();

        Y.Assert.areSame('B', instance.getAliased('b'), "getAliased('b') did not return 'B'");
    },

    "getAliased() should return ad-hoc value when valid non-alias passed in": function () {
        var instance = new TestModel({
            delta: 'D'
        });

        Y.Assert.areSame('D', instance.getAliased('delta'), "getAliased('delta') did not return 'D'");
    },

    "getAliased() should return correct values over several calls": function () {
        var instance = new TestClass();

        Y.Assert.areSame('A', instance.getAliased('alpha'), "getAliased('alpha') did not return 'A'");
        Y.ArrayAssert.containsItems(['b', 'c'], instance._attrNames, "_attrNames 'a' not removed after success");

        // during development, the search was corrupted by multiple failed searches
        Y.Assert.isUndefined(instance.getAliased('beta'), "getAliased('beta') should not return 'B'");
        Y.Assert.isUndefined(instance.getAliased('beta'), "getAliased('beta') should not loop twice");
        Y.ArrayAssert.containsItems(['b', 'c'], instance._attrNames, "_attrNames changed after failures");

        Y.Assert.areSame('C', instance.getAliased('gamma'), "getAliased('gamma') did not return 'C'");
        Y.ArrayAssert.containsItems(['b'], instance._attrNames, "_attrNames 'c' not removed after success");
    },

    "stub": function () {
        // var instance = new TestClass();
    }

}));

Y.namespace("Z")["z-aliased-attr-test-suite"] = suite;

}, "@VERSION@", { requires: ["test-console", "z-aliased-attr", "model"] });
