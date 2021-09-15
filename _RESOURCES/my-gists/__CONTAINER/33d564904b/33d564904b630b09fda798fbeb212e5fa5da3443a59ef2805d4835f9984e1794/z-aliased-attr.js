YUI.add('z-aliased-attr', function (Y) {

/**
Aliased Attribute Extension

This extension provides the "aliased" property to Attribute config.
This is largely a convenience for referring to attributes internally
by more descriptive names than their URL parameter-safe name.

    var PieModel = Y.Base.create('pieModel', Y.Model, [Y.Z.AliasedAttr], {}, {
        ATTRS: {
            c: {
                aliased: 'crust',
                value: 'flaky'
            },
            slices: {
                value: 8
            }
        }
    });

    var applePie = new PieModel({ flavor: 'apple' });

    applePie.get('c');              // => 'flaky'
    applePie.getAliased('crust');   // => 'flaky'

    applePie.getAliased('slices');  // => 8         (note fall-through)
    applePie.getAliased('s');       // => undefined

    applePie.getAliased('flavor');  // => 'apple'   (supports ad-hoc attributes)

    var appleJSON = applePie.toJSON();
    //  appleJSON = {
    //      flavor: 'apple',
    //      c: 'flaky',
    //      slices: 8
    //  }

@author Daniel Stockman
@since 2012/09
**/

var hasOwn = Object.prototype.hasOwnProperty,
    hashArray = Y.Array.hash,
    objectKeys = Y.Object.keys,
    YBase = Y.Base;

// add "aliased" to attribute config whitelist
YBase._ATTR_CFG = YBase._ATTR_CFG.concat("aliased");
YBase._ATTR_CFG_HASH = hashArray(YBase._ATTR_CFG);

/**
@class AliasedAttr
@namespace Z
@extensionfor Base
**/
function AliasedAttr() {}

AliasedAttr.prototype = {
    /**
    Call _initAliasedAttrs during initializer. This must
    be run after the host class initializer, therefore it
    cannot be called from this extension's constructor.

    @method initializer
    @protected
    **/
    initializer: function () {
        this._initAliasedAttrs();
    },

    /**
    Cache attribute names and bind a memoized _getAliased
    method into _getAliasedName.

    @method _initAliasedAttrs
    @private
    **/
    _initAliasedAttrs: function () {
        Y.log('_initAliasedAttrs', 'debug', 'AliasedAttr');
        this._attrNames = this._getAttrNames();
        this._getAliasedName = Y.cached(Y.bind(this._getAliased, this));
    },

    /**
    Caches the list of attribute names that we may need
    to operate on. Protected class attributes are removed
    from this list, as they will never be aliased.

    @method _getAttrNames
    @private
    **/
    _getAttrNames: function () {
        Y.log('_getAttrNames', 'debug', 'AliasedAttr');
        var attrNames = objectKeys(this._state.data);

        return this._filterAttrNames(attrNames);
    },

    /**
    Duplicate Model's toJSON() filtering when caching the
    list of attribute names. The initialized and destroyed
    attribute names are always removed, and the Model-specific
    values only if the host is a Model.

    @method _filterModelAttrs
    @param {Array} attrNames
    @return {Array} with the undesired attribute names removed.
    @private
    **/
    _filterAttrNames: function (attrNames) {
        Y.log('_filterAttrNames', 'debug', 'AliasedAttr');
        var hashed = hashArray(attrNames);

        // remove default attributes that are never aliased
        delete hashed.destroyed;
        delete hashed.initialized;

        // remove model metadata if necessary
        if (this._isYUIModel) {
            delete hashed.clientId;

            if (this.idAttribute !== 'id') {
                delete hashed.id;
            }
        }

        return objectKeys(hashed);
    },

    /**
    Utility method to retrieve the attribute name associated
    with a given alias. This method is bound to the instance
    during initialization, wrapped in a Y.Cached() function.

    Each time an attribute name is successfully matched, that
    name is removed from the private _attrNames array to prevent
    redundant searching (the value is cached, anyway).

    @method _getAliased
    @param {String} alias
    @return {String} the aliased attribute name, if any
    @private
    **/
    _getAliased: function (alias) {
        Y.log('_getAliased ' + alias, 'debug', 'AliasedAttr');
        var stateData = this._state.data,
            attrNames = this._attrNames,
            attrName,
            datum,
            idx = 0,
            len = attrNames.length;

        for (; idx < len; idx += 1) {
            attrName = attrNames[idx];
            // ensure that the state object actually owns the property
            if (hasOwn.call(stateData, attrName)) {
                // get the data directly, bypassing State#getAll(name, true)
                datum = stateData[attrName];
                // check for the 'aliased' property, regardless of laziness
                if (datum && (datum.lazy && datum.lazy.aliased === alias || datum.aliased === alias)) {
                    // remove attrName from filtering array, so it is no longer tested
                    attrNames.splice(idx, 1);
                    return attrName;
                }
            }
        }
    },

    /**
    Retrieve an aliased attribute value by it's alias
    instead of the actual name.

    If the alias does not exist, attempt to retrieve the
    attribute value with the alias provided.

    @method getAliased
    @param {String} alias
    @return {Mixed}
    **/
    getAliased: function (alias) {
        Y.log('getAliased ' + alias, 'debug', 'AliasedAttr');

        var attrName = this._getAliasedName(alias);
        if (attrName) {
            return this.get(attrName);
        }

        return this.get(alias);
    }
};

Y.namespace('Z').AliasedAttr = AliasedAttr;

}, '3.7.3', {
    requires: [
        'base-build'
    ]
});
