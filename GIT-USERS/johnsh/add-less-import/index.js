var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');


// Format a .less file that only has comments and `@import` statements.
var format = function(str) {
  str = str.replace(/[\n\r]+/g, '\n');
  str = str.replace(/(^\/[^@]+)/gm, '\n$1\n');
  str = str.replace(/^\s*/, '');
  return str;
};


/**
 * Pass a string, the import statement to add, and a keyword in a code comment that indicates where you want the `@import` statement to be added.
 * Duplicates will only be _uniqued_ when they are in the same "section".
 *
 * **Example**
 *
 * Assuming you have a `.less` file and it looks something like this:
 *
 * ```less
 * // Variables and mixins
 * `@import "variables.less";
 * `@import "mixins.less";
 *
 * // Components
 * `@import "alerts.less";
 * ```
 *
 * Here is how you would add import statements:
 *
 * ```js
 * var addImport = require('add-less-import');
 * var str = fs.readFileSync('bootstrap.less', 'utf8');
 *
 * // obviously you would probably want to do this dynamically,
 * // like with command line arguments. this is just an example
 * addImport(str, 'components', '@import "nav.less";');
 * ```
 *
 * The result would be:
 *
 * ```less
 * // Variables and mixins
 * `@import "variables.less";
 * `@import "mixins.less";
 *
 * // Components
 * `@import "alerts.less";
 * `@import "nav.less";
 * ```
 *
 * @param   {String}  `str`
 * @param   {String}  `section` The code-comment keyword to search for.
 * @param   {String}  `statement` The full import statement.
 * @param   {Object}  `options`
 * @return  {String}
 */

module.exports = function(str, statement, section, options) {
  if (arguments.length === 2 || typeof section === 'object') {
    throw new Error('You must pass a section to add-less-import. e.g. just a keyword in a code comment before the insertion point.');
  }

  options = options || {};
  var imports = new RegExp('((^\\/[\\/\\*])(\\s*' + section + '\\s*)([^^@]+)([^\\/*\\/]+))', 'gmi');
  var output = str.replace(imports, function(match, $1, $2, $3, $4, components) {
    var comment = $2 + $3 + $4;
    var str = '';

    components = components.split('\n').filter(Boolean);
    components = _.union([comment], components, ['@import "' + statement + '.less";']);
    var uniqued = _.unique(components);

    // if `noDupes` is defined in the options, error if one is found
    if ((uniqued.length < components.length) && options.noDupes) {
      throw new Error(statement, 'already exits.');
    }
    return uniqued.join('\n');
  });


  if (options.format) {
    return format(output);
  }
  return output;
};
