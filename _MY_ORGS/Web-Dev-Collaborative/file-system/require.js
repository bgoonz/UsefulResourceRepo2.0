'use strict';

var fs = require( 'fs' );
var path = require( 'path' );

// Replacement for Object.assign() for node 0.10-0.12
//var assign = require('mini-assign');
var deepAssign = require( 'mini-deep-assign' );

//var parentFile;
//var parentDir;

var moduleParent = require( 'module-parent' );

//var getCallingModule(_parentsToSkip) {
//  _parentsToSkip = _parentsToSkip || 0;
//
//  var callingModule = module;
//  for (var i=0; i <= _parentsToSkip; i++) {
//    ////////////////////////////////////////////////////////////////////////////////
//    // Trick taken from https://github.com/aseemk/requireDir/blob/master/index.js //
//    //                                                                            //
//    // make a note of the calling file's path, so that we can resolve relative    //
//    // paths. this only works if a fresh version of this module is run on every   //
//    // require(), so important: we clear the require() cache each time!           //
//    //                                                                            //
//    delete require.cache[ callingModule.filename ];
//    //                                                                            //
//    ////////////////////////////////////////////////////////////////////////////////
//    callingModule = callingModule.parent;
//  }
//
//  parentFile   = callingModule.filename;
//  parentDir    = path.dirname(parentFile);
//
//
//  //////////////////////////////////////////////////////////////////////////////////
//  //// Trick taken from https://github.com/aseemk/requireDir/blob/master/index.js //
//  ////                                                                            //
//  //// make a note of the calling file's path, so that we can resolve relative    //
//  //// paths. this only works if a fresh version of this module is run on every   //
//  //// require(), so important: we clear the require() cache each time!           //
//  ////                                                                            //
//  //delete require.cache[ __filename ];
//  ////                                                                            //
//  //////////////////////////////////////////////////////////////////////////////////
//  //
//  //var parentModule = module.parent;
//  //var parentFile   = parentModule.filename;
//  //var parentDir    = path.dirname(parentFile);
//}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Require Module definition (passed to map function)
 *
 * @typedef {object} RequireModule
 * @property {string} filename     - filename with extension, without path
 * @property {string} ext          - file extension
 * @property {string} base         - filename without extension
 * @property {string} filepath     - full file path
 * @property {string} name         - module name
 * @property {{}} exports          - module's exports
 */

/**
 * Map function
 *
 * @callback RequireMap
 * @param {RequireModule} requireModule
 */

/**
 * Options for require-dir-all
 *
 * @typedef {object} RequireOptions
 * @property {boolean} [recursive=false]     - go recursively into subdirectories
 * @property {boolean} [indexAsParent=false] - exports of 'index' files will be added
 *                                     directly to object corresponding to the
 *                                     directory with this 'index' file, not to
 *                                     its child object named 'index'
 *                                     (as by default)
 * @property {boolean} [throwNoDir=true] - throw exception if require'ing directory does not exists (default: true)
 * @property {RegExp} [excludeDirs]    - RegExp to exclude directories
 * @property {RegExp} [includeFiles]   - RegExp to include files
 * @property {number} [_parentsToSkip]  - number of parent modules to skip in order to find calling module; optional; default: 0 (consider parent as calling)
 * @property {RequireMap} [map]        - map function to be called for each require'd module
 */

/**
 * Check if the module to be excluded according to RE
 *
 * @param {RequireModule} reqModule
 * @param {RegExp} reIncludeFiles
 * @returns {boolean}
 */
function isExcludedFileRe( reqModule, reIncludeFiles ) {
  return !!reIncludeFiles && !reqModule.filename.match( reIncludeFiles ); // Exclude files non-matched to pattern includeFiles
}


/**
 * Check if the module to be excluded because it is the same as require'ing file
 *
 * @param {RequireModule} reqModule
 * @param {object} originalModule
 * @returns {boolean}
 */
function isExcludedFileParent( reqModule, originalModule ) {
  return reqModule.filepath === originalModule.filename; // Exclude require'ing file
}


/**
 * Check if the directory to be excluded
 *
 * @param {RequireModule} reqModule
 * @param {RegExp} reExcludeDirs
 * @returns {boolean}
 */
function isExcludedDir( reqModule, reExcludeDirs ) {
  return !!( reExcludeDirs && reqModule.filename.match( reExcludeDirs ) );
}


/**
 * Main function. Recursively go through directories and require modules according to options
 *
 * @param   {object}  originalModule
 * @param   {string}  absDir
 * @param   {RequireOptions} options
 * @returns {object}
 * @private
 */
function _requireDirAll( originalModule, absDir, options ) {
  var modules = {};

  var files = [];
  try {
    files = fs.readdirSync( absDir );
  } catch ( e ) {
    if ( options.throwNoDir ) {
      throw e;
    }
  }

  for ( var length = files.length, i = 0; i < length; ++i ) {

    var reqModule = {};
    reqModule.filename = files[ i ]; // full filename without path
    reqModule.ext = path.extname( reqModule.filename ); // file extension
    reqModule.base = path.basename( reqModule.filename, reqModule.ext ); // filename without extension
    reqModule.filepath = path.join( absDir, reqModule.filename ); // full filename with absolute path

    //console.log('reqModule:', reqModule);

    // If this is subdirectory, then descend recursively into it (excluding matching patter excludeDirs)
    if ( fs.statSync( reqModule.filepath ).isDirectory() &&
      options.recursive &&
      !isExcludedDir( reqModule, options.excludeDirs ) ) {

      // use filename (with extension) instead of base name (without extension)
      // to keep complete directory name for directories with '.', like 'dir.1.2.3'
      reqModule.name = reqModule.filename;

      // go recursively into subdirectory
      //if (typeof modules === 'undefined') {
      //  modules = {};
      //}
      modules[ reqModule.name ] = _requireDirAll( originalModule, reqModule.filepath, options );

    } else if ( !isExcludedFileRe( reqModule, options.includeFiles ) && !isExcludedFileParent( reqModule, originalModule ) ) {
      reqModule.name = reqModule.base;
      reqModule.exports = require( reqModule.filepath );
      if ( options.map ) {
        options.map( reqModule );
      }

      var source = reqModule.exports;
      var target = ( reqModule.name === 'index' && options.indexAsParent ) ? modules : modules && modules[ reqModule.name ];

      var sourceIsObject = ( typeof source === 'object' );
      var targetIsObject = ( typeof target === 'object' );
      //var targetUnassigned = (typeof target === 'undefined');

      if ( sourceIsObject && targetIsObject ) {
        //if (Object.assign) {
        //  Object.assign(target, source);
        //} else {
        deepAssign( target, source );
        //}
      } else //if (
      //(!sourceIsObject && !targetIsObject) || // if source and target both are not objects  or...
      //(targetUnassigned)   // if target is not yet assigned, we may assign any type to it
      //)
      {
        target = source;
        //} else {
        //  console.log('!!!! ' +
        //    '  source:', source,
        //    '  target:', target,
        //    '; sourceIsObject:', sourceIsObject,
        //    '; targetIsObject:', targetIsObject,
        //    '; targetUnassigned:', targetUnassigned,
        //    '');
        //  throw 'Not possible to mix objects with scalar or array values: ' +
        //  'filepath: '+ reqModule.filepath + '; ' +
        //  'modules: '+ JSON.stringify(modules) + '; ' +
        //  'exports: '+ JSON.stringify(reqModule.exports)
        //    ;
      }

      if ( reqModule.name === 'index' && options.indexAsParent ) {
        modules = target;
      } else {
        //if (typeof modules === 'undefined') {
        //  modules = {};
        //}
        modules[ reqModule.name ] = target;
      }
    }

  }

  return modules;
}


/**
 * Main entry point. Analyse input parameters and invoke main function _requireDirAll()
 *
 * @param { string||string[] } [relOrAbsDir]  - Directory or array of directories to 'require'
 * @param {RequireOptions} [options]          - Set of options
 * @returns {object || object[]}              - Returns object with require'd modules or array of such objects
 * @public
 */
module.exports = function requireDirAll( relOrAbsDir, options ) {

  relOrAbsDir = relOrAbsDir || '.';
  options = options || {};
  options.recursive = options.recursive || false;
  options.indexAsParent = options.indexAsParent || false;
  options.includeFiles = options.includeFiles || /^.*\.(js|json|coffee)$/;
  options.excludeDirs = options.excludeDirs || /^(\.git|\.svn|node_modules)$/;
  options._parentsToSkip = options._parentsToSkip || 0;
  options.map = options.map || null;
  if ( typeof options.throwNoDir === 'undefined' ) options.throwNoDir = true;

  var absDir;

  var originalModule = moduleParent( module, options._parentsToSkip );
  //var parentFile   = originalModule.filename;
  //var parentDir    = path.dirname(parentFile);
  var parentDir = path.dirname( originalModule.filename );

  if ( typeof relOrAbsDir === 'string' ) {
    absDir = path.resolve( parentDir, relOrAbsDir );
    //console.log('relOrAbsDir:', relOrAbsDir, '; options:', options);
    return _requireDirAll( originalModule, absDir, options );

  } else { // Assume it is array
    var modulesArray = [];
    for ( var length = relOrAbsDir.length, i = 0; i < length; ++i ) {
      //console.log('relOrAbsDir:', relOrAbsDir, '; options:', options);
      absDir = path.resolve( parentDir, relOrAbsDir[ i ] );
      modulesArray.push( _requireDirAll( originalModule, absDir, options ) );
    }
    return modulesArray;
  }
};
