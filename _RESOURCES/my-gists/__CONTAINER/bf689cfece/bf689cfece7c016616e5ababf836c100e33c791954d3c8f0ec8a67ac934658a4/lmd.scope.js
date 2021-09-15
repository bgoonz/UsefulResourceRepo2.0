/**
 *
 * @param {String} moduleName module name or path to file
 */
function require(moduleName) {}

/**
 * Matches in-package modules
 *
 * @param {RegExp} regExp
 * @returns {Object} {module_name: module_content}
 */
require.match = function(regExp) {};

/**
 * Get list of declared module
 *
 * @param {RegExp} [regExp] optional
 * @returns {Array} [moduleName, moduleName, etc]
 */
require.modulesList = function(regExp) {};

/**
 * Loads any image
 *
 * @param {String|Array} moduleName path to file
 * @param {Function}     [callback]   callback(result) undefined on error HTMLImageElement on success
 */
require.image = function (moduleName, callback) {};

/**
 * RequireJS & AMD-style define
 *
 * (function (require) {
 *     var define = require.define;
 *
 *     define(["a"], function (a) {
 *          return a + 2;
 *     });
 * })
 *
 * @param name
 * @param deps
 * @param module
 */
require.define = function (name, deps, module) {};

/**
 * Load off-package LMD module
 *
 * @param {String|Array} moduleName same origin path to LMD module
 * @param {Function}     [callback]   callback(result) undefined on error others on success
 */
require.async = function (moduleName, callback) {};

/**
 * Loads LMD bundle
 *
 * @param {String|Array} bundleSrc path to file
 * @param {Function}     [callback]   callback(result) undefined on error HTMLScriptElement on success
 */
require.bundle = function (bundleSrc, callback) {};

/**
 * Loads any CSS file
 *
 * Inspired by yepnope.css.js
 *
 * @see https://github.com/SlexAxton/yepnope.js/blob/master/plugins/yepnope.css.js
 *
 * @param {String|Array} moduleName path to css file
 * @param {Function}     [callback]   callback(result) undefined on error HTMLLinkElement on success
 */
require.css = function (moduleName, callback) {};

/**
 * Loads any image
 *
 * @param {String|Array} moduleName path to file
 * @param {Function}     [callback]   callback(result) undefined on error HTMLImageElement on success
 */
require.image = function (moduleName, callback) {};

/**
 * Loads any JavaScript file a non-LMD module
 *
 * @param {String|Array} moduleName path to file
 * @param {Function}     [callback]   callback(result) undefined on error HTMLScriptElement on success
 */
require.js = function (moduleName, callback) {};

/**
 * Load off-package LMD module
 *
 * @param {String|Array} moduleName same origin path to LMD module
 * @param {Function}     [callback]   callback(result) undefined on error others on success
 */
require.preload = function (moduleName, callback) {};

/**
 * Returns module statistics or all statistics
 *
 * @param {String} [moduleName]
 * @return {Object}
 */
require.stats = function (moduleName) {};

/**
 * Line counter
 *
 * @private
 */
require.coverage_line = function (moduleName, lineId) {};

/**
 * Function call counter
 *
 * @private
 */
require.coverage_function = function (moduleName, lineId) {};

/**
 * Condition counter
 *
 * @private
 */
require.coverage_condition = function (moduleName, lineId, condition) {};

/**
 *
 * @param host
 */
require.stats.sendTo = function (host) {};

var exports = {};

var module = {
    exports:exports
};