// This file was automatically generated from "index.lmd.json"
(function(global,main,modules,modules_options,options){var initialized_modules={},global_eval=function(code){return global.Function("return "+code)()},global_document=global.document,local_undefined,register_module=function(moduleName,module){var output={exports:{}};initialized_modules[moduleName]=1;modules[moduleName]=output.exports;if(!module){module=module||global[moduleName]}else if(typeof module==="function"){var module_require=lmd_require;if(modules_options[moduleName]&&modules_options[moduleName].sandbox&&typeof module_require==="function"){module_require=local_undefined}module=module(module_require,output.exports,output)||output.exports}module=module;return modules[moduleName]=module},lmd_require=function(moduleName){var module=modules[moduleName];var replacement=[moduleName,module];if(replacement){moduleName=replacement[0];module=replacement[1]}if(initialized_modules[moduleName]&&module){return module}if(typeof module==="string"&&module.indexOf("(function(")===0){module=global_eval(module)}return register_module(moduleName,module)},output={exports:{}};for(var moduleName in modules){initialized_modules[moduleName]=0}main(lmd_require,output.exports,output)})
(this,(function (require, exports, module) { /* wrapped by builder */
var jQuery = require('jQuery'); // MyJquery;

console.log(jQuery !== window.jQuery); // true
console.log(typeof jQuery.fn.asEventStream === "function"); // true
console.log(typeof window.jQuery.fn.asEventStream === "undefined"); // true

}),{
"jQuery": (function (require, exports, module) { /* wrapped by builder */
// myjQuery.js
var jQuery = require('_jQuery'),
    myjQuery = jQuery.noConflict(true);

// Пробрасываем для Bacon на время инициализации
window.jQuery = myjQuery;

require('_Bacon');

// Возвращаем
window.jQuery = jQuery;

module.exports = myjQuery;

}),
"_jQuery": (function (require) { /* wrapped by builder */
// Mock jQuery
(function () {
    var id = 0;
    var jQueryFactory = function () {
        var jQuery = function () {};
        jQuery.fn = {};
        jQuery.id = ++id;

        return jQuery;
    };

    window.$ = window.jQuery = jQueryFactory();

    window.$.noConflict = function () {
        return jQueryFactory();
    };
}());



/* added by builder */
return jQuery;
}),
"_Bacon": (function (require, exports, module) { /* wrapped by builder */
// Mock Bacon
(this.jQuery || this.Zepto).fn.asEventStream = function () {

};

})
},{},{});
