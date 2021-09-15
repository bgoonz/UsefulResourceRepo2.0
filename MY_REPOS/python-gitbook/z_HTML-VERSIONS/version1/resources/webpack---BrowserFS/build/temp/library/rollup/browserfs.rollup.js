'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var buffer = require('buffer');
var path = require('path');

/**
 * Standard libc error codes. Add more to this enum and ErrorStrings as they are
 * needed.
 * @url http://www.gnu.org/software/libc/manual/html_node/Error-Codes.html
 */
var ErrorCode;
(function (ErrorCode) {
  ErrorCode[(ErrorCode['EPERM'] = 1)] = 'EPERM';
  ErrorCode[(ErrorCode['ENOENT'] = 2)] = 'ENOENT';
  ErrorCode[(ErrorCode['EIO'] = 5)] = 'EIO';
  ErrorCode[(ErrorCode['EBADF'] = 9)] = 'EBADF';
  ErrorCode[(ErrorCode['EACCES'] = 13)] = 'EACCES';
  ErrorCode[(ErrorCode['EBUSY'] = 16)] = 'EBUSY';
  ErrorCode[(ErrorCode['EEXIST'] = 17)] = 'EEXIST';
  ErrorCode[(ErrorCode['ENOTDIR'] = 20)] = 'ENOTDIR';
  ErrorCode[(ErrorCode['EISDIR'] = 21)] = 'EISDIR';
  ErrorCode[(ErrorCode['EINVAL'] = 22)] = 'EINVAL';
  ErrorCode[(ErrorCode['EFBIG'] = 27)] = 'EFBIG';
  ErrorCode[(ErrorCode['ENOSPC'] = 28)] = 'ENOSPC';
  ErrorCode[(ErrorCode['EROFS'] = 30)] = 'EROFS';
  ErrorCode[(ErrorCode['ENOTEMPTY'] = 39)] = 'ENOTEMPTY';
  ErrorCode[(ErrorCode['ENOTSUP'] = 95)] = 'ENOTSUP';
})(ErrorCode || (ErrorCode = {}));
/* tslint:disable:variable-name */
/**
 * Strings associated with each error code.
 * @hidden
 */
var ErrorStrings = {};
ErrorStrings[ErrorCode.EPERM] = 'Operation not permitted.';
ErrorStrings[ErrorCode.ENOENT] = 'No such file or directory.';
ErrorStrings[ErrorCode.EIO] = 'Input/output error.';
ErrorStrings[ErrorCode.EBADF] = 'Bad file descriptor.';
ErrorStrings[ErrorCode.EACCES] = 'Permission denied.';
ErrorStrings[ErrorCode.EBUSY] = 'Resource busy or locked.';
ErrorStrings[ErrorCode.EEXIST] = 'File exists.';
ErrorStrings[ErrorCode.ENOTDIR] = 'File is not a directory.';
ErrorStrings[ErrorCode.EISDIR] = 'File is a directory.';
ErrorStrings[ErrorCode.EINVAL] = 'Invalid argument.';
ErrorStrings[ErrorCode.EFBIG] = 'File is too big.';
ErrorStrings[ErrorCode.ENOSPC] = 'No space left on disk.';
ErrorStrings[ErrorCode.EROFS] = 'Cannot modify a read-only file system.';
ErrorStrings[ErrorCode.ENOTEMPTY] = 'Directory is not empty.';
ErrorStrings[ErrorCode.ENOTSUP] = 'Operation is not supported.';
/* tslint:enable:variable-name */
/**
 * Represents a BrowserFS error. Passed back to applications after a failed
 * call to the BrowserFS API.
 */
var ApiError = /*@__PURE__*/ (function (Error) {
  function ApiError(type, message, path) {
    if (message === void 0) message = ErrorStrings[type];

    Error.call(this, message);
    // Unsupported.
    this.syscall = '';
    this.errno = type;
    this.code = ErrorCode[type];
    this.path = path;
    this.stack = new Error().stack;
    this.message =
      'Error: ' +
      this.code +
      ': ' +
      message +
      (this.path ? ", '" + this.path + "'" : '');
  }

  if (Error) ApiError.__proto__ = Error;
  ApiError.prototype = Object.create(Error && Error.prototype);
  ApiError.prototype.constructor = ApiError;
  ApiError.fromJSON = function fromJSON(json) {
    var err = new ApiError(0);
    err.errno = json.errno;
    err.code = json.code;
    err.path = json.path;
    err.stack = json.stack;
    err.message = json.message;
    return err;
  };
  /**
   * Creates an ApiError object from a buffer.
   */
  ApiError.fromBuffer = function fromBuffer(buffer, i) {
    if (i === void 0) i = 0;

    return ApiError.fromJSON(
      JSON.parse(buffer.toString('utf8', i + 4, i + 4 + buffer.readUInt32LE(i)))
    );
  };
  ApiError.FileError = function FileError(code, p) {
    return new ApiError(code, ErrorStrings[code], p);
  };
  ApiError.ENOENT = function ENOENT(path) {
    return this.FileError(ErrorCode.ENOENT, path);
  };
  ApiError.EEXIST = function EEXIST(path) {
    return this.FileError(ErrorCode.EEXIST, path);
  };
  ApiError.EISDIR = function EISDIR(path) {
    return this.FileError(ErrorCode.EISDIR, path);
  };
  ApiError.ENOTDIR = function ENOTDIR(path) {
    return this.FileError(ErrorCode.ENOTDIR, path);
  };
  ApiError.EPERM = function EPERM(path) {
    return this.FileError(ErrorCode.EPERM, path);
  };
  ApiError.ENOTEMPTY = function ENOTEMPTY(path) {
    return this.FileError(ErrorCode.ENOTEMPTY, path);
  };
  /**
   * @return A friendly error message.
   */
  ApiError.prototype.toString = function toString() {
    return this.message;
  };
  ApiError.prototype.toJSON = function toJSON() {
    return {
      errno: this.errno,
      code: this.code,
      path: this.path,
      stack: this.stack,
      message: this.message,
    };
  };
  /**
   * Writes the API error into a buffer.
   */
  ApiError.prototype.writeToBuffer = function writeToBuffer(buffer, i) {
    if (buffer === void 0) buffer = Buffer.alloc(this.bufferSize());
    if (i === void 0) i = 0;

    var bytesWritten = buffer.write(JSON.stringify(this.toJSON()), i + 4);
    buffer.writeUInt32LE(bytesWritten, i);
    return buffer;
  };
  /**
   * The size of the API error in buffer-form in bytes.
   */
  ApiError.prototype.bufferSize = function bufferSize() {
    // 4 bytes for string length.
    return 4 + Buffer.byteLength(JSON.stringify(this.toJSON()));
  };

  return ApiError;
})(Error);

var api_error = /*#__PURE__*/ Object.freeze({
  get ErrorCode() {
    return ErrorCode;
  },
  ErrorStrings: ErrorStrings,
  ApiError: ApiError,
});

var ActionType;
(function (ActionType) {
  // Indicates that the code should not do anything.
  ActionType[(ActionType['NOP'] = 0)] = 'NOP';
  // Indicates that the code should throw an exception.
  ActionType[(ActionType['THROW_EXCEPTION'] = 1)] = 'THROW_EXCEPTION';
  // Indicates that the code should truncate the file, but only if it is a file.
  ActionType[(ActionType['TRUNCATE_FILE'] = 2)] = 'TRUNCATE_FILE';
  // Indicates that the code should create the file.
  ActionType[(ActionType['CREATE_FILE'] = 3)] = 'CREATE_FILE';
})(ActionType || (ActionType = {}));
/**
 * Represents one of the following file flags. A convenience object.
 *
 * * `'r'` - Open file for reading. An exception occurs if the file does not exist.
 * * `'r+'` - Open file for reading and writing. An exception occurs if the file does not exist.
 * * `'rs'` - Open file for reading in synchronous mode. Instructs the filesystem to not cache writes.
 * * `'rs+'` - Open file for reading and writing, and opens the file in synchronous mode.
 * * `'w'` - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
 * * `'wx'` - Like 'w' but opens the file in exclusive mode.
 * * `'w+'` - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
 * * `'wx+'` - Like 'w+' but opens the file in exclusive mode.
 * * `'a'` - Open file for appending. The file is created if it does not exist.
 * * `'ax'` - Like 'a' but opens the file in exclusive mode.
 * * `'a+'` - Open file for reading and appending. The file is created if it does not exist.
 * * `'ax+'` - Like 'a+' but opens the file in exclusive mode.
 *
 * Exclusive mode ensures that the file path is newly created.
 */
var FileFlag = function FileFlag(flagStr) {
  this.flagStr = flagStr;
  if (FileFlag.validFlagStrs.indexOf(flagStr) < 0) {
    throw new ApiError(ErrorCode.EINVAL, 'Invalid flag: ' + flagStr);
  }
};
/**
 * Get an object representing the given file flag.
 * @param modeStr The string representing the flag
 * @return The FileFlag object representing the flag
 * @throw when the flag string is invalid
 */
FileFlag.getFileFlag = function getFileFlag(flagStr) {
  // Check cache first.
  if (FileFlag.flagCache.hasOwnProperty(flagStr)) {
    return FileFlag.flagCache[flagStr];
  }
  return (FileFlag.flagCache[flagStr] = new FileFlag(flagStr));
};
/**
 * Get the underlying flag string for this flag.
 */
FileFlag.prototype.getFlagString = function getFlagString() {
  return this.flagStr;
};
/**
 * Returns true if the file is readable.
 */
FileFlag.prototype.isReadable = function isReadable() {
  return this.flagStr.indexOf('r') !== -1 || this.flagStr.indexOf('+') !== -1;
};
/**
 * Returns true if the file is writeable.
 */
FileFlag.prototype.isWriteable = function isWriteable() {
  return (
    this.flagStr.indexOf('w') !== -1 ||
    this.flagStr.indexOf('a') !== -1 ||
    this.flagStr.indexOf('+') !== -1
  );
};
/**
 * Returns true if the file mode should truncate.
 */
FileFlag.prototype.isTruncating = function isTruncating() {
  return this.flagStr.indexOf('w') !== -1;
};
/**
 * Returns true if the file is appendable.
 */
FileFlag.prototype.isAppendable = function isAppendable() {
  return this.flagStr.indexOf('a') !== -1;
};
/**
 * Returns true if the file is open in synchronous mode.
 */
FileFlag.prototype.isSynchronous = function isSynchronous() {
  return this.flagStr.indexOf('s') !== -1;
};
/**
 * Returns true if the file is open in exclusive mode.
 */
FileFlag.prototype.isExclusive = function isExclusive() {
  return this.flagStr.indexOf('x') !== -1;
};
/**
 * Returns one of the static fields on this object that indicates the
 * appropriate response to the path existing.
 */
FileFlag.prototype.pathExistsAction = function pathExistsAction() {
  if (this.isExclusive()) {
    return ActionType.THROW_EXCEPTION;
  } else if (this.isTruncating()) {
    return ActionType.TRUNCATE_FILE;
  } else {
    return ActionType.NOP;
  }
};
/**
 * Returns one of the static fields on this object that indicates the
 * appropriate response to the path not existing.
 */
FileFlag.prototype.pathNotExistsAction = function pathNotExistsAction() {
  if ((this.isWriteable() || this.isAppendable()) && this.flagStr !== 'r+') {
    return ActionType.CREATE_FILE;
  } else {
    return ActionType.THROW_EXCEPTION;
  }
};
// Contains cached FileMode instances.
FileFlag.flagCache = {};
// Array of valid mode strings.
FileFlag.validFlagStrs = [
  'r',
  'r+',
  'rs',
  'rs+',
  'w',
  'wx',
  'w+',
  'wx+',
  'a',
  'ax',
  'a+',
  'ax+',
];

/**
 * Indicates the type of the given file. Applied to 'mode'.
 */
var FileType;
(function (FileType) {
  FileType[(FileType['FILE'] = 32768)] = 'FILE';
  FileType[(FileType['DIRECTORY'] = 16384)] = 'DIRECTORY';
  FileType[(FileType['SYMLINK'] = 40960)] = 'SYMLINK';
})(FileType || (FileType = {}));
/**
 * Emulation of Node's `fs.Stats` object.
 *
 * Attribute descriptions are from `man 2 stat'
 * @see http://nodejs.org/api/fs.html#fs_class_fs_stats
 * @see http://man7.org/linux/man-pages/man2/stat.2.html
 */
var Stats = function Stats(
  itemType,
  size,
  mode,
  atimeMs,
  mtimeMs,
  ctimeMs,
  birthtimeMs
) {
  /**
   * UNSUPPORTED ATTRIBUTES
   * I assume no one is going to need these details, although we could fake
   * appropriate values if need be.
   */
  // ID of device containing file
  this.dev = 0;
  // inode number
  this.ino = 0;
  // device ID (if special file)
  this.rdev = 0;
  // number of hard links
  this.nlink = 1;
  // blocksize for file system I/O
  this.blksize = 4096;
  // @todo Maybe support these? atm, it's a one-user filesystem.
  // user ID of owner
  this.uid = 0;
  // group ID of owner
  this.gid = 0;
  // XXX: Some file systems stash data on stats objects.
  this.fileData = null;
  this.size = size;
  var currentTime = 0;
  if (typeof atimeMs !== 'number') {
    currentTime = Date.now();
    atimeMs = currentTime;
  }
  if (typeof mtimeMs !== 'number') {
    if (!currentTime) {
      currentTime = Date.now();
    }
    mtimeMs = currentTime;
  }
  if (typeof ctimeMs !== 'number') {
    if (!currentTime) {
      currentTime = Date.now();
    }
    ctimeMs = currentTime;
  }
  if (typeof birthtimeMs !== 'number') {
    if (!currentTime) {
      currentTime = Date.now();
    }
    birthtimeMs = currentTime;
  }
  this.atimeMs = atimeMs;
  this.ctimeMs = ctimeMs;
  this.mtimeMs = mtimeMs;
  this.birthtimeMs = birthtimeMs;
  if (!mode) {
    switch (itemType) {
      case FileType.FILE:
        this.mode = 0x1a4;
        break;
      case FileType.DIRECTORY:
      default:
        this.mode = 0x1ff;
    }
  } else {
    this.mode = mode;
  }
  // number of 512B blocks allocated
  this.blocks = Math.ceil(size / 512);
  // Check if mode also includes top-most bits, which indicate the file's
  // type.
  if (this.mode < 0x1000) {
    this.mode |= itemType;
  }
};

var prototypeAccessors = {
  atime: {
    configurable: true,
  },
  mtime: {
    configurable: true,
  },
  ctime: {
    configurable: true,
  },
  birthtime: {
    configurable: true,
  },
};
Stats.fromBuffer = function fromBuffer(buffer) {
  var size = buffer.readUInt32LE(0),
    mode = buffer.readUInt32LE(4),
    atime = buffer.readDoubleLE(8),
    mtime = buffer.readDoubleLE(16),
    ctime = buffer.readDoubleLE(24);
  return new Stats(mode & 0xf000, size, mode & 0xfff, atime, mtime, ctime);
};
/**
 * Clones the stats object.
 */
Stats.clone = function clone(s) {
  return new Stats(
    s.mode & 0xf000,
    s.size,
    s.mode & 0xfff,
    s.atimeMs,
    s.mtimeMs,
    s.ctimeMs,
    s.birthtimeMs
  );
};
prototypeAccessors.atime.get = function () {
  return new Date(this.atimeMs);
};
prototypeAccessors.mtime.get = function () {
  return new Date(this.mtimeMs);
};
prototypeAccessors.ctime.get = function () {
  return new Date(this.ctimeMs);
};
prototypeAccessors.birthtime.get = function () {
  return new Date(this.birthtimeMs);
};
Stats.prototype.toBuffer = function toBuffer() {
  var buffer = Buffer.alloc(32);
  buffer.writeUInt32LE(this.size, 0);
  buffer.writeUInt32LE(this.mode, 4);
  buffer.writeDoubleLE(this.atime.getTime(), 8);
  buffer.writeDoubleLE(this.mtime.getTime(), 16);
  buffer.writeDoubleLE(this.ctime.getTime(), 24);
  return buffer;
};
/**
 * @return [Boolean] True if this item is a file.
 */
Stats.prototype.isFile = function isFile() {
  return (this.mode & 0xf000) === FileType.FILE;
};
/**
 * @return [Boolean] True if this item is a directory.
 */
Stats.prototype.isDirectory = function isDirectory() {
  return (this.mode & 0xf000) === FileType.DIRECTORY;
};
/**
 * @return [Boolean] True if this item is a symbolic link (only valid through lstat)
 */
Stats.prototype.isSymbolicLink = function isSymbolicLink() {
  return (this.mode & 0xf000) === FileType.SYMLINK;
};
/**
 * Change the mode of the file. We use this helper function to prevent messing
 * up the type of the file, which is encoded in mode.
 */
Stats.prototype.chmod = function chmod(mode) {
  this.mode = (this.mode & 0xf000) | mode;
};
// We don't support the following types of files.
Stats.prototype.isSocket = function isSocket() {
  return false;
};
Stats.prototype.isBlockDevice = function isBlockDevice() {
  return false;
};
Stats.prototype.isCharacterDevice = function isCharacterDevice() {
  return false;
};
Stats.prototype.isFIFO = function isFIFO() {
  return false;
};

Object.defineProperties(Stats.prototype, prototypeAccessors);

/**
 * @hidden
 */
var toExport =
  typeof window !== 'undefined'
    ? window
    : typeof self !== 'undefined'
    ? self
    : global;

/**
 * @hidden
 */
var bfsSetImmediate;
if (typeof setImmediate !== 'undefined') {
  bfsSetImmediate = setImmediate;
} else {
  var gScope = toExport;
  var timeouts = [];
  var messageName = 'zero-timeout-message';
  var canUsePostMessage = function () {
    if (typeof gScope.importScripts !== 'undefined' || !gScope.postMessage) {
      return false;
    }
    var postMessageIsAsync = true;
    var oldOnMessage = gScope.onmessage;
    gScope.onmessage = function () {
      postMessageIsAsync = false;
    };
    gScope.postMessage('', '*');
    gScope.onmessage = oldOnMessage;
    return postMessageIsAsync;
  };
  if (canUsePostMessage()) {
    bfsSetImmediate = function (fn) {
      var args = [],
        len = arguments.length - 1;
      while (len-- > 0) args[len] = arguments[len + 1];

      timeouts.push({
        fn: fn,
        args: args,
      });
      gScope.postMessage(messageName, '*');
    };
    var handleMessage = function (event) {
      if (event.source === self && event.data === messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else {
          event.cancelBubble = true;
        }
        if (timeouts.length > 0) {
          var ref = timeouts.shift();
          var fn = ref.fn;
          var args = ref.args;
          return fn.apply(void 0, args);
        }
      }
    };
    if (gScope.addEventListener) {
      gScope.addEventListener('message', handleMessage, true);
    } else {
      gScope.attachEvent('onmessage', handleMessage);
    }
  } else if (gScope.MessageChannel) {
    // WebWorker MessageChannel
    var channel = new gScope.MessageChannel();
    channel.port1.onmessage = function (event) {
      if (timeouts.length > 0) {
        var ref = timeouts.shift();
        var fn = ref.fn;
        var args = ref.args;
        return fn.apply(void 0, args);
      }
    };
    bfsSetImmediate = function (fn) {
      var args = [],
        len = arguments.length - 1;
      while (len-- > 0) args[len] = arguments[len + 1];

      timeouts.push({
        fn: fn,
        args: args,
      });
      channel.port2.postMessage('');
    };
  } else {
    bfsSetImmediate = function (fn) {
      var args = [],
        len = arguments.length - 1;
      while (len-- > 0) args[len] = arguments[len + 1];

      return setTimeout.apply(void 0, [fn, 0].concat(args));
    };
  }
}
var setImmediate$1 = bfsSetImmediate;

var EventEmitter = require('events');
var FileWatcher = function FileWatcher() {
  this.watchEntries = [];
};
FileWatcher.prototype.triggerWatch = function triggerWatch(
  filename,
  event,
  newStats
) {
  var this$1 = this;

  var validEntries = this.watchEntries.filter(function (entry) {
    if (entry.filename === filename) {
      return true;
    }
    if (entry.recursive && filename.startsWith(entry.filename)) {
      return true;
    }
    return false;
  });
  validEntries.forEach(function (entry) {
    if (entry.callback) {
      entry.callback(event, filename);
    }
    var newStatsArg = newStats || entry.curr;
    var oldStatsArg = entry.curr || newStats;
    if (newStatsArg && oldStatsArg && entry.fileCallback) {
      entry.fileCallback(newStatsArg, oldStatsArg);
      entry.curr = newStatsArg;
    }
    entry.watcher.emit(event);
    if (!entry.persistent) {
      this$1.removeEntry(entry);
    }
  });
};
FileWatcher.prototype.watch = function watch(filename, arg2, listener) {
  var this$1 = this;
  if (listener === void 0) listener = function () {};

  var watcher = new EventEmitter();
  var watchEntry = {
    filename: filename,
    watcher: watcher,
  };
  watcher.close = function () {
    this$1.removeEntry(watchEntry);
  };
  if (typeof arg2 === 'object') {
    watchEntry.recursive = arg2.recursive;
    watchEntry.persistent =
      arg2.persistent === undefined ? true : arg2.persistent;
    watchEntry.callback = listener;
  } else if (typeof arg2 === 'function') {
    watchEntry.callback = arg2;
  }
  this.watchEntries.push(watchEntry);
  return watchEntry.watcher;
};
FileWatcher.prototype.watchFile = function watchFile(
  curr,
  filename,
  arg2,
  listener
) {
  var this$1 = this;
  if (listener === void 0) listener = function () {};

  var watcher = new EventEmitter();
  var watchEntry = {
    filename: filename,
    watcher: watcher,
    curr: curr,
  };
  watcher.close = function () {
    this$1.removeEntry(watchEntry);
  };
  if (typeof arg2 === 'object') {
    watchEntry.recursive = arg2.recursive;
    watchEntry.persistent =
      arg2.persistent === undefined ? true : arg2.persistent;
    watchEntry.fileCallback = listener;
  } else if (typeof arg2 === 'function') {
    watchEntry.fileCallback = arg2;
  }
  this.watchEntries.push(watchEntry);
  return watchEntry.watcher;
};
FileWatcher.prototype.unwatchFile = function unwatchFile(filename, listener) {
  this.watchEntries = this.watchEntries.filter(function (entry) {
    return entry.filename !== filename && entry.fileCallback !== listener;
  });
};
FileWatcher.prototype.removeEntry = function removeEntry(watchEntry) {
  this.watchEntries = this.watchEntries.filter(function (en) {
    return en !== watchEntry;
  });
};

/** Used for unit testing. Defaults to a NOP. */
var wrapCbHook = function (cb, numArgs) {
  return cb;
};
/**
 * Wraps a callback function, ensuring it is invoked through setImmediate.
 * @hidden
 */
function wrapCb(cb, numArgs) {
  if (typeof cb !== 'function') {
    throw new Error('Callback must be a function.');
  }
  var hookedCb = wrapCbHook(cb, numArgs);
  // We could use `arguments`, but Function.call/apply is expensive. And we only
  // need to handle 1-3 arguments
  switch (numArgs) {
    case 1:
      return function (arg1) {
        setImmediate$1(function () {
          return hookedCb(arg1);
        });
      };
    case 2:
      return function (arg1, arg2) {
        setImmediate$1(function () {
          return hookedCb(arg1, arg2);
        });
      };
    case 3:
      return function (arg1, arg2, arg3) {
        setImmediate$1(function () {
          return hookedCb(arg1, arg2, arg3);
        });
      };
    default:
      throw new Error('Invalid invocation of wrapCb.');
  }
}
/**
 * @hidden
 */
function assertRoot(fs) {
  if (fs) {
    return fs;
  }
  throw new ApiError(
    ErrorCode.EIO,
    'Initialize BrowserFS with a file system using BrowserFS.initialize(filesystem)'
  );
}
/**
 * @hidden
 */
function normalizeMode(mode, def) {
  switch (typeof mode) {
    case 'number':
      // (path, flag, mode, cb?)
      return mode;
    case 'string':
      // (path, flag, modeString, cb?)
      var trueMode = parseInt(mode, 8);
      if (!isNaN(trueMode)) {
        return trueMode;
      }
      // Invalid string.
      return def;
    default:
      return def;
  }
}
/**
 * @hidden
 */
function normalizeTime(time) {
  if (time instanceof Date) {
    return time;
  }
  if (typeof time === 'number') {
    return new Date(time * 1000);
  }
  throw new ApiError(ErrorCode.EINVAL, 'Invalid time.');
}
/**
 * @hidden
 */
function normalizePath(p) {
  // Node doesn't allow null characters in paths.
  if (p.indexOf('\u0000') >= 0) {
    throw new ApiError(
      ErrorCode.EINVAL,
      'Path must be a string without null bytes.'
    );
  } else if (p === '') {
    throw new ApiError(ErrorCode.EINVAL, 'Path must not be empty.');
  }
  return path.resolve(p);
}
/**
 * @hidden
 */
function normalizeOptions(options, defEnc, defFlag, defMode) {
  // typeof null === 'object' so special-case handing is needed.
  switch (options === null ? 'null' : typeof options) {
    case 'object':
      return {
        encoding:
          typeof options.encoding !== 'undefined' ? options.encoding : defEnc,
        flag: typeof options.flag !== 'undefined' ? options.flag : defFlag,
        mode: normalizeMode(options.mode, defMode),
      };
    case 'string':
      return {
        encoding: options,
        flag: defFlag,
        mode: defMode,
      };
    case 'null':
    case 'undefined':
    case 'function':
      return {
        encoding: defEnc,
        flag: defFlag,
        mode: defMode,
      };
    default:
      throw new TypeError(
        '"options" must be a string or an object, got ' +
          typeof options +
          ' instead.'
      );
  }
}
/**
 * The default callback is a NOP.
 * @hidden
 * @private
 */
function nopCb() {
  // NOP.
}
/**
 * The node frontend to all filesystems.
 * This layer handles:
 *
 * * Sanity checking inputs.
 * * Normalizing paths.
 * * Resetting stack depth for asynchronous operations which may not go through
 *   the browser by wrapping all input callbacks using `setImmediate`.
 * * Performing the requested operation through the filesystem or the file
 *   descriptor, as appropriate.
 * * Handling optional arguments and setting default arguments.
 * @see http://nodejs.org/api/fs.html
 */
var FS = function FS() {
  this.root = null;
  this.fdMap = {};
  this.nextFd = 100;
  this.fileWatcher = new FileWatcher();
};
FS.prototype.initialize = function initialize(rootFS) {
  if (!rootFS.constructor.isAvailable()) {
    throw new ApiError(
      ErrorCode.EINVAL,
      'Tried to instantiate BrowserFS with an unavailable file system.'
    );
  }
  return (this.root = rootFS);
};
/**
 * converts Date or number to a fractional UNIX timestamp
 * Grabbed from NodeJS sources (lib/fs.js)
 */
FS.prototype._toUnixTimestamp = function _toUnixTimestamp(time) {
  if (typeof time === 'number') {
    return time;
  }
  if (time instanceof Date) {
    return time.getTime() / 1000;
  }
  throw new Error('Cannot parse time: ' + time);
};
/**
 * **NONSTANDARD**: Grab the FileSystem instance that backs this API.
 * @return [BrowserFS.FileSystem | null] Returns null if the file system has
 *   not been initialized.
 */
FS.prototype.getRootFS = function getRootFS() {
  if (this.root) {
    return this.root;
  }
  return null;
};
// FILE OR DIRECTORY METHODS
/**
 * Asynchronous rename. No arguments other than a possible exception are given
 * to the completion callback.
 * @param oldPath
 * @param newPath
 * @param callback
 */
FS.prototype.rename = function rename(oldPath, newPath, cb) {
  var this$1 = this;
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    setImmediate$1(function () {
      this$1.fileWatcher.triggerWatch(oldPath, 'rename');
      this$1.stat(newPath, function (err, stat) {
        if (err) {
          return;
        }
        this$1.fileWatcher.triggerWatch(newPath, 'rename', stat);
      });
    });
    assertRoot(this.root).rename(
      normalizePath(oldPath),
      normalizePath(newPath),
      newCb
    );
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous rename.
 * @param oldPath
 * @param newPath
 */
FS.prototype.renameSync = function renameSync(oldPath, newPath) {
  var this$1 = this;

  setImmediate$1(function () {
    this$1.fileWatcher.triggerWatch(oldPath, 'rename');
    this$1.fileWatcher.triggerWatch(newPath, 'rename');
  });
  assertRoot(this.root).renameSync(
    normalizePath(oldPath),
    normalizePath(newPath)
  );
};
/**
 * Test whether or not the given path exists by checking with the file system.
 * Then call the callback argument with either true or false.
 * @example Sample invocation
 *   fs.exists('/etc/passwd', function (exists) {
 * util.debug(exists ? "it's there" : "no passwd!");
 *   });
 * @param path
 * @param callback
 */
FS.prototype.exists = function exists(path, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    return assertRoot(this.root).exists(normalizePath(path), newCb);
  } catch (e) {
    // Doesn't return an error. If something bad happens, we assume it just
    // doesn't exist.
    return newCb(false);
  }
};
/**
 * Test whether or not the given path exists by checking with the file system.
 * @param path
 * @return [boolean]
 */
FS.prototype.existsSync = function existsSync(path) {
  try {
    return assertRoot(this.root).existsSync(normalizePath(path));
  } catch (e) {
    // Doesn't return an error. If something bad happens, we assume it just
    // doesn't exist.
    return false;
  }
};
/**
 * Asynchronous `stat`.
 * @param path
 * @param callback
 */
FS.prototype.stat = function stat(path, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 2);
  try {
    return assertRoot(this.root).stat(normalizePath(path), false, newCb);
  } catch (e) {
    return newCb(e);
  }
};
/**
 * Synchronous `stat`.
 * @param path
 * @return [BrowserFS.node.fs.Stats]
 */
FS.prototype.statSync = function statSync(path) {
  return assertRoot(this.root).statSync(normalizePath(path), false);
};
/**
 * Asynchronous `lstat`.
 * `lstat()` is identical to `stat()`, except that if path is a symbolic link,
 * then the link itself is stat-ed, not the file that it refers to.
 * @param path
 * @param callback
 */
FS.prototype.lstat = function lstat(path, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 2);
  try {
    return assertRoot(this.root).stat(normalizePath(path), true, newCb);
  } catch (e) {
    return newCb(e);
  }
};
/**
 * Synchronous `lstat`.
 * `lstat()` is identical to `stat()`, except that if path is a symbolic link,
 * then the link itself is stat-ed, not the file that it refers to.
 * @param path
 * @return [BrowserFS.node.fs.Stats]
 */
FS.prototype.lstatSync = function lstatSync(path) {
  return assertRoot(this.root).statSync(normalizePath(path), true);
};
FS.prototype.truncate = function truncate(path, arg2, cb) {
  var this$1 = this;
  if (arg2 === void 0) arg2 = 0;
  if (cb === void 0) cb = nopCb;

  var len = 0;
  if (typeof arg2 === 'function') {
    cb = arg2;
  } else if (typeof arg2 === 'number') {
    len = arg2;
  }
  var newCb = wrapCb(cb, 1);
  try {
    if (len < 0) {
      throw new ApiError(ErrorCode.EINVAL);
    }
    setImmediate$1(function () {
      this$1.stat(path, function (err, stat) {
        this$1.fileWatcher.triggerWatch(path, 'change', stat);
      });
    });
    return assertRoot(this.root).truncate(normalizePath(path), len, newCb);
  } catch (e) {
    return newCb(e);
  }
};
/**
 * Synchronous `truncate`.
 * @param path
 * @param len
 */
FS.prototype.truncateSync = function truncateSync(path, len) {
  var this$1 = this;
  if (len === void 0) len = 0;

  if (len < 0) {
    throw new ApiError(ErrorCode.EINVAL);
  }
  setImmediate$1(function () {
    this$1.stat(path, function (err, stat) {
      this$1.fileWatcher.triggerWatch(path, 'change', stat);
    });
  });
  return assertRoot(this.root).truncateSync(normalizePath(path), len);
};
/**
 * Asynchronous `unlink`.
 * @param path
 * @param callback
 */
FS.prototype.unlink = function unlink(path, cb) {
  var this$1 = this;
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    setImmediate$1(function () {
      this$1.fileWatcher.triggerWatch(
        path,
        'rename',
        new Stats(FileType.FILE, 0, undefined, 0, 0, 0, 0)
      );
    });
    return assertRoot(this.root).unlink(normalizePath(path), newCb);
  } catch (e) {
    return newCb(e);
  }
};
/**
 * Synchronous `unlink`.
 * @param path
 */
FS.prototype.unlinkSync = function unlinkSync(path) {
  var this$1 = this;

  setImmediate$1(function () {
    this$1.fileWatcher.triggerWatch(
      path,
      'rename',
      new Stats(FileType.FILE, 0, undefined, 0, 0, 0, 0)
    );
  });
  return assertRoot(this.root).unlinkSync(normalizePath(path));
};
FS.prototype.open = function open(path, flag, arg2, cb) {
  var this$1 = this;
  if (cb === void 0) cb = nopCb;

  var mode = normalizeMode(arg2, 0x1a4);
  cb = typeof arg2 === 'function' ? arg2 : cb;
  var newCb = wrapCb(cb, 2);
  try {
    assertRoot(this.root).open(
      normalizePath(path),
      FileFlag.getFileFlag(flag),
      mode,
      function (e, file) {
        if (file) {
          newCb(e, this$1.getFdForFile(file));
        } else {
          newCb(e);
        }
      }
    );
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous file open.
 * @see http://www.manpagez.com/man/2/open/
 * @param path
 * @param flags
 * @param mode defaults to `0644`
 * @return [BrowserFS.File]
 */
FS.prototype.openSync = function openSync(path, flag, mode) {
  if (mode === void 0) mode = 0x1a4;

  return this.getFdForFile(
    assertRoot(this.root).openSync(
      normalizePath(path),
      FileFlag.getFileFlag(flag),
      normalizeMode(mode, 0x1a4)
    )
  );
};
FS.prototype.readFile = function readFile(filename, arg2, cb) {
  if (arg2 === void 0) arg2 = {};
  if (cb === void 0) cb = nopCb;

  var options = normalizeOptions(arg2, null, 'r', null);
  cb = typeof arg2 === 'function' ? arg2 : cb;
  var newCb = wrapCb(cb, 2);
  try {
    var flag = FileFlag.getFileFlag(options.flag);
    if (!flag.isReadable()) {
      return newCb(
        new ApiError(
          ErrorCode.EINVAL,
          'Flag passed to readFile must allow for reading.'
        )
      );
    }
    return assertRoot(this.root).readFile(
      normalizePath(filename),
      options.encoding,
      flag,
      newCb
    );
  } catch (e) {
    return newCb(e);
  }
};
FS.prototype.readFileSync = function readFileSync(filename, arg2) {
  if (arg2 === void 0) arg2 = {};

  var options = normalizeOptions(arg2, null, 'r', null);
  var flag = FileFlag.getFileFlag(options.flag);
  if (!flag.isReadable()) {
    throw new ApiError(
      ErrorCode.EINVAL,
      'Flag passed to readFile must allow for reading.'
    );
  }
  return assertRoot(this.root).readFileSync(
    normalizePath(filename),
    options.encoding,
    flag
  );
};
FS.prototype.writeFile = function writeFile(filename, data, arg3, cb) {
  var this$1 = this;
  if (arg3 === void 0) arg3 = {};
  if (cb === void 0) cb = nopCb;

  var options = normalizeOptions(arg3, 'utf8', 'w', 0x1a4);
  cb = typeof arg3 === 'function' ? arg3 : cb;
  var newCb = wrapCb(cb, 1);
  try {
    var flag = FileFlag.getFileFlag(options.flag);
    if (!flag.isWriteable()) {
      return newCb(
        new ApiError(
          ErrorCode.EINVAL,
          'Flag passed to writeFile must allow for writing.'
        )
      );
    }
    assertRoot(this.root).writeFile(
      normalizePath(filename),
      data,
      options.encoding,
      flag,
      options.mode,
      function () {
        var args = [],
          len = arguments.length;
        while (len--) args[len] = arguments[len];

        setImmediate$1(function () {
          this$1.stat(filename, function (_err, stat) {
            this$1.fileWatcher.triggerWatch(filename, 'change', stat);
          });
        });
        newCb.apply(void 0, args);
      }
    );
  } catch (e) {
    return newCb(e);
  }
};
FS.prototype.writeFileSync = function writeFileSync(filename, data, arg3) {
  var this$1 = this;

  var options = normalizeOptions(arg3, 'utf8', 'w', 0x1a4);
  var flag = FileFlag.getFileFlag(options.flag);
  if (!flag.isWriteable()) {
    throw new ApiError(
      ErrorCode.EINVAL,
      'Flag passed to writeFile must allow for writing.'
    );
  }
  setImmediate$1(function () {
    this$1.stat(filename, function (err, stat) {
      this$1.fileWatcher.triggerWatch(filename, 'change', stat);
    });
  });
  return assertRoot(this.root).writeFileSync(
    normalizePath(filename),
    data,
    options.encoding,
    flag,
    options.mode
  );
};
FS.prototype.appendFile = function appendFile(filename, data, arg3, cb) {
  var this$1 = this;
  if (cb === void 0) cb = nopCb;

  var options = normalizeOptions(arg3, 'utf8', 'a', 0x1a4);
  cb = typeof arg3 === 'function' ? arg3 : cb;
  var newCb = wrapCb(cb, 1);
  try {
    var flag = FileFlag.getFileFlag(options.flag);
    if (!flag.isAppendable()) {
      return newCb(
        new ApiError(
          ErrorCode.EINVAL,
          'Flag passed to appendFile must allow for appending.'
        )
      );
    }
    setImmediate$1(function () {
      this$1.stat(filename, function (err, stat) {
        this$1.fileWatcher.triggerWatch(filename, 'rename', stat);
      });
    });
    assertRoot(this.root).appendFile(
      normalizePath(filename),
      data,
      options.encoding,
      flag,
      options.mode,
      newCb
    );
  } catch (e) {
    newCb(e);
  }
};
FS.prototype.appendFileSync = function appendFileSync(filename, data, arg3) {
  var this$1 = this;

  var options = normalizeOptions(arg3, 'utf8', 'a', 0x1a4);
  var flag = FileFlag.getFileFlag(options.flag);
  if (!flag.isAppendable()) {
    throw new ApiError(
      ErrorCode.EINVAL,
      'Flag passed to appendFile must allow for appending.'
    );
  }
  setImmediate$1(function () {
    this$1.stat(filename, function (err, stat) {
      this$1.fileWatcher.triggerWatch(filename, 'change', stat);
    });
  });
  return assertRoot(this.root).appendFileSync(
    normalizePath(filename),
    data,
    options.encoding,
    flag,
    options.mode
  );
};
// FILE DESCRIPTOR METHODS
/**
 * Asynchronous `fstat`.
 * `fstat()` is identical to `stat()`, except that the file to be stat-ed is
 * specified by the file descriptor `fd`.
 * @param fd
 * @param callback
 */
FS.prototype.fstat = function fstat(fd, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 2);
  try {
    var file = this.fd2file(fd);
    file.stat(newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `fstat`.
 * `fstat()` is identical to `stat()`, except that the file to be stat-ed is
 * specified by the file descriptor `fd`.
 * @param fd
 * @return [BrowserFS.node.fs.Stats]
 */
FS.prototype.fstatSync = function fstatSync(fd) {
  return this.fd2file(fd).statSync();
};
/**
 * Asynchronous close.
 * @param fd
 * @param callback
 */
FS.prototype.close = function close(fd, cb) {
  var this$1 = this;
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    this.fd2file(fd).close(function (e) {
      if (!e) {
        this$1.closeFd(fd);
      }
      newCb(e);
    });
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous close.
 * @param fd
 */
FS.prototype.closeSync = function closeSync(fd) {
  this.fd2file(fd).closeSync();
  this.closeFd(fd);
};
FS.prototype.ftruncate = function ftruncate(fd, arg2, cb) {
  if (cb === void 0) cb = nopCb;

  var length = typeof arg2 === 'number' ? arg2 : 0;
  cb = typeof arg2 === 'function' ? arg2 : cb;
  var newCb = wrapCb(cb, 1);
  try {
    var file = this.fd2file(fd);
    if (length < 0) {
      throw new ApiError(ErrorCode.EINVAL);
    }
    file.truncate(length, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous ftruncate.
 * @param fd
 * @param len
 */
FS.prototype.ftruncateSync = function ftruncateSync(fd, len) {
  if (len === void 0) len = 0;

  var file = this.fd2file(fd);
  if (len < 0) {
    throw new ApiError(ErrorCode.EINVAL);
  }
  file.truncateSync(len);
};
/**
 * Asynchronous fsync.
 * @param fd
 * @param callback
 */
FS.prototype.fsync = function fsync(fd, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    this.fd2file(fd).sync(newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous fsync.
 * @param fd
 */
FS.prototype.fsyncSync = function fsyncSync(fd) {
  this.fd2file(fd).syncSync();
};
/**
 * Asynchronous fdatasync.
 * @param fd
 * @param callback
 */
FS.prototype.fdatasync = function fdatasync(fd, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    this.fd2file(fd).datasync(newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous fdatasync.
 * @param fd
 */
FS.prototype.fdatasyncSync = function fdatasyncSync(fd) {
  this.fd2file(fd).datasyncSync();
};
FS.prototype.write = function write(fd, arg2, arg3, arg4, arg5, cb) {
  if (cb === void 0) cb = nopCb;

  var buffer;
  var offset;
  var length;
  var position = null;
  if (typeof arg2 === 'string') {
    // Signature 1: (fd, string, [position?, [encoding?]], cb?)
    var encoding = 'utf8';
    switch (typeof arg3) {
      case 'function':
        // (fd, string, cb)
        cb = arg3;
        break;
      case 'number':
        // (fd, string, position, encoding?, cb?)
        position = arg3;
        encoding = typeof arg4 === 'string' ? arg4 : 'utf8';
        cb = typeof arg5 === 'function' ? arg5 : cb;
        break;
      default:
        // ...try to find the callback and get out of here!
        cb =
          typeof arg4 === 'function'
            ? arg4
            : typeof arg5 === 'function'
            ? arg5
            : cb;
        return cb(new ApiError(ErrorCode.EINVAL, 'Invalid arguments.'));
    }
    buffer = Buffer.from(arg2, encoding);
    offset = 0;
    length = buffer.length;
  } else {
    // Signature 2: (fd, buffer, offset, length, position?, cb?)
    buffer = arg2;
    offset = arg3;
    length = arg4;
    position = typeof arg5 === 'number' ? arg5 : null;
    cb = typeof arg5 === 'function' ? arg5 : cb;
  }
  var newCb = wrapCb(cb, 3);
  try {
    var file = this.fd2file(fd);
    if (position === undefined || position === null) {
      position = file.getPos();
    }
    file.write(buffer, offset, length, position, newCb);
  } catch (e) {
    newCb(e);
  }
};
FS.prototype.writeSync = function writeSync(fd, arg2, arg3, arg4, arg5) {
  var buffer;
  var offset = 0;
  var length;
  var position;
  if (typeof arg2 === 'string') {
    // Signature 1: (fd, string, [position?, [encoding?]])
    position = typeof arg3 === 'number' ? arg3 : null;
    var encoding = typeof arg4 === 'string' ? arg4 : 'utf8';
    offset = 0;
    buffer = Buffer.from(arg2, encoding);
    length = buffer.length;
  } else {
    // Signature 2: (fd, buffer, offset, length, position?)
    buffer = arg2;
    offset = arg3;
    length = arg4;
    position = typeof arg5 === 'number' ? arg5 : null;
  }
  var file = this.fd2file(fd);
  if (position === undefined || position === null) {
    position = file.getPos();
  }
  return file.writeSync(buffer, offset, length, position);
};
FS.prototype.read = function read(fd, arg2, arg3, arg4, arg5, cb) {
  if (cb === void 0) cb = nopCb;

  var position;
  var offset;
  var length;
  var buffer;
  var newCb;
  if (typeof arg2 === 'number') {
    // legacy interface
    // (fd, length, position, encoding, callback)
    length = arg2;
    position = arg3;
    var encoding = arg4;
    cb = typeof arg5 === 'function' ? arg5 : cb;
    offset = 0;
    buffer = Buffer.alloc(length);
    // XXX: Inefficient.
    // Wrap the cb so we shelter upper layers of the API from these
    // shenanigans.
    newCb = wrapCb(function (err, bytesRead, buf) {
      if (err) {
        return cb(err);
      }
      cb(err, buf.toString(encoding), bytesRead);
    }, 3);
  } else {
    buffer = arg2;
    offset = arg3;
    length = arg4;
    position = arg5;
    newCb = wrapCb(cb, 3);
  }
  try {
    var file = this.fd2file(fd);
    if (position === undefined || position === null) {
      position = file.getPos();
    }
    file.read(buffer, offset, length, position, newCb);
  } catch (e) {
    newCb(e);
  }
};
FS.prototype.readSync = function readSync(fd, arg2, arg3, arg4, arg5) {
  var shenanigans = false;
  var buffer;
  var offset;
  var length;
  var position;
  var encoding = 'utf8';
  if (typeof arg2 === 'number') {
    length = arg2;
    position = arg3;
    encoding = arg4;
    offset = 0;
    buffer = Buffer.alloc(length);
    shenanigans = true;
  } else {
    buffer = arg2;
    offset = arg3;
    length = arg4;
    position = arg5;
  }
  var file = this.fd2file(fd);
  if (position === undefined || position === null) {
    position = file.getPos();
  }
  var rv = file.readSync(buffer, offset, length, position);
  if (!shenanigans) {
    return rv;
  }
  return [buffer.toString(encoding), rv];
};
/**
 * Asynchronous `fchown`.
 * @param fd
 * @param uid
 * @param gid
 * @param callback
 */
FS.prototype.fchown = function fchown(fd, uid, gid, callback) {
  if (callback === void 0) callback = nopCb;

  var newCb = wrapCb(callback, 1);
  try {
    this.fd2file(fd).chown(uid, gid, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `fchown`.
 * @param fd
 * @param uid
 * @param gid
 */
FS.prototype.fchownSync = function fchownSync(fd, uid, gid) {
  this.fd2file(fd).chownSync(uid, gid);
};
/**
 * Asynchronous `fchmod`.
 * @param fd
 * @param mode
 * @param callback
 */
FS.prototype.fchmod = function fchmod(fd, mode, cb) {
  var newCb = wrapCb(cb, 1);
  try {
    var numMode = typeof mode === 'string' ? parseInt(mode, 8) : mode;
    this.fd2file(fd).chmod(numMode, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `fchmod`.
 * @param fd
 * @param mode
 */
FS.prototype.fchmodSync = function fchmodSync(fd, mode) {
  var numMode = typeof mode === 'string' ? parseInt(mode, 8) : mode;
  this.fd2file(fd).chmodSync(numMode);
};
/**
 * Change the file timestamps of a file referenced by the supplied file
 * descriptor.
 * @param fd
 * @param atime
 * @param mtime
 * @param callback
 */
FS.prototype.futimes = function futimes(fd, atime, mtime, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    var file = this.fd2file(fd);
    if (typeof atime === 'number') {
      atime = new Date(atime * 1000);
    }
    if (typeof mtime === 'number') {
      mtime = new Date(mtime * 1000);
    }
    file.utimes(atime, mtime, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Change the file timestamps of a file referenced by the supplied file
 * descriptor.
 * @param fd
 * @param atime
 * @param mtime
 */
FS.prototype.futimesSync = function futimesSync(fd, atime, mtime) {
  this.fd2file(fd).utimesSync(normalizeTime(atime), normalizeTime(mtime));
};
// DIRECTORY-ONLY METHODS
/**
 * Asynchronous `rmdir`.
 * @param path
 * @param callback
 */
FS.prototype.rmdir = function rmdir(path, cb) {
  var this$1 = this;
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    path = normalizePath(path);
    setImmediate$1(function () {
      this$1.fileWatcher.triggerWatch(path, 'rename');
    });
    assertRoot(this.root).rmdir(path, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `rmdir`.
 * @param path
 */
FS.prototype.rmdirSync = function rmdirSync(path) {
  var this$1 = this;

  path = normalizePath(path);
  setImmediate$1(function () {
    this$1.fileWatcher.triggerWatch(path, 'rename');
  });
  return assertRoot(this.root).rmdirSync(path);
};
/**
 * Asynchronous `mkdir`.
 * @param path
 * @param mode defaults to `0777`
 * @param callback
 */
FS.prototype.mkdir = function mkdir(path, mode, cb) {
  var this$1 = this;
  if (cb === void 0) cb = nopCb;

  if (typeof mode === 'function') {
    cb = mode;
    mode = 0x1ff;
  }
  var newCb = wrapCb(cb, 1);
  try {
    path = normalizePath(path);
    setImmediate$1(function () {
      this$1.fileWatcher.triggerWatch(path, 'rename');
    });
    assertRoot(this.root).mkdir(path, mode, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `mkdir`.
 * @param path
 * @param mode defaults to `0777`
 */
FS.prototype.mkdirSync = function mkdirSync(path, mode) {
  var this$1 = this;

  setImmediate$1(function () {
    this$1.fileWatcher.triggerWatch(path, 'rename');
  });
  assertRoot(this.root).mkdirSync(
    normalizePath(path),
    normalizeMode(mode, 0x1ff)
  );
};
/**
 * Asynchronous `readdir`. Reads the contents of a directory.
 * The callback gets two arguments `(err, files)` where `files` is an array of
 * the names of the files in the directory excluding `'.'` and `'..'`.
 * @param path
 * @param callback
 */
FS.prototype.readdir = function readdir(path, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 2);
  try {
    path = normalizePath(path);
    assertRoot(this.root).readdir(path, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `readdir`. Reads the contents of a directory.
 * @param path
 * @return [String[]]
 */
FS.prototype.readdirSync = function readdirSync(path) {
  path = normalizePath(path);
  return assertRoot(this.root).readdirSync(path);
};
// SYMLINK METHODS
/**
 * Asynchronous `link`.
 * @param srcpath
 * @param dstpath
 * @param callback
 */
FS.prototype.link = function link(srcpath, dstpath, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    srcpath = normalizePath(srcpath);
    dstpath = normalizePath(dstpath);
    assertRoot(this.root).link(srcpath, dstpath, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `link`.
 * @param srcpath
 * @param dstpath
 */
FS.prototype.linkSync = function linkSync(srcpath, dstpath) {
  srcpath = normalizePath(srcpath);
  dstpath = normalizePath(dstpath);
  return assertRoot(this.root).linkSync(srcpath, dstpath);
};
FS.prototype.symlink = function symlink(srcpath, dstpath, arg3, cb) {
  if (cb === void 0) cb = nopCb;

  var type = typeof arg3 === 'string' ? arg3 : 'file';
  cb = typeof arg3 === 'function' ? arg3 : cb;
  var newCb = wrapCb(cb, 1);
  try {
    if (type !== 'file' && type !== 'dir') {
      return newCb(new ApiError(ErrorCode.EINVAL, 'Invalid type: ' + type));
    }
    srcpath = normalizePath(srcpath);
    dstpath = normalizePath(dstpath);
    assertRoot(this.root).symlink(srcpath, dstpath, type, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `symlink`.
 * @param srcpath
 * @param dstpath
 * @param type can be either `'dir'` or `'file'` (default is `'file'`)
 */
FS.prototype.symlinkSync = function symlinkSync(srcpath, dstpath, type) {
  if (!type) {
    type = 'file';
  } else if (type !== 'file' && type !== 'dir') {
    throw new ApiError(ErrorCode.EINVAL, 'Invalid type: ' + type);
  }
  srcpath = normalizePath(srcpath);
  dstpath = normalizePath(dstpath);
  return assertRoot(this.root).symlinkSync(srcpath, dstpath, type);
};
/**
 * Asynchronous readlink.
 * @param path
 * @param callback
 */
FS.prototype.readlink = function readlink(path, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 2);
  try {
    path = normalizePath(path);
    assertRoot(this.root).readlink(path, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous readlink.
 * @param path
 * @return [String]
 */
FS.prototype.readlinkSync = function readlinkSync(path) {
  path = normalizePath(path);
  return assertRoot(this.root).readlinkSync(path);
};
// PROPERTY OPERATIONS
/**
 * Asynchronous `chown`.
 * @param path
 * @param uid
 * @param gid
 * @param callback
 */
FS.prototype.chown = function chown(path, uid, gid, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    path = normalizePath(path);
    assertRoot(this.root).chown(path, false, uid, gid, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `chown`.
 * @param path
 * @param uid
 * @param gid
 */
FS.prototype.chownSync = function chownSync(path, uid, gid) {
  path = normalizePath(path);
  assertRoot(this.root).chownSync(path, false, uid, gid);
};
/**
 * Asynchronous `lchown`.
 * @param path
 * @param uid
 * @param gid
 * @param callback
 */
FS.prototype.lchown = function lchown(path, uid, gid, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    path = normalizePath(path);
    assertRoot(this.root).chown(path, true, uid, gid, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `lchown`.
 * @param path
 * @param uid
 * @param gid
 */
FS.prototype.lchownSync = function lchownSync(path, uid, gid) {
  path = normalizePath(path);
  assertRoot(this.root).chownSync(path, true, uid, gid);
};
/**
 * Asynchronous `chmod`.
 * @param path
 * @param mode
 * @param callback
 */
FS.prototype.chmod = function chmod(path, mode, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    var numMode = normalizeMode(mode, -1);
    if (numMode < 0) {
      throw new ApiError(ErrorCode.EINVAL, 'Invalid mode.');
    }
    assertRoot(this.root).chmod(normalizePath(path), false, numMode, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `chmod`.
 * @param path
 * @param mode
 */
FS.prototype.chmodSync = function chmodSync(path, mode) {
  var numMode = normalizeMode(mode, -1);
  if (numMode < 0) {
    throw new ApiError(ErrorCode.EINVAL, 'Invalid mode.');
  }
  path = normalizePath(path);
  assertRoot(this.root).chmodSync(path, false, numMode);
};
/**
 * Asynchronous `lchmod`.
 * @param path
 * @param mode
 * @param callback
 */
FS.prototype.lchmod = function lchmod(path, mode, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    var numMode = normalizeMode(mode, -1);
    if (numMode < 0) {
      throw new ApiError(ErrorCode.EINVAL, 'Invalid mode.');
    }
    assertRoot(this.root).chmod(normalizePath(path), true, numMode, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `lchmod`.
 * @param path
 * @param mode
 */
FS.prototype.lchmodSync = function lchmodSync(path, mode) {
  var numMode = normalizeMode(mode, -1);
  if (numMode < 1) {
    throw new ApiError(ErrorCode.EINVAL, 'Invalid mode.');
  }
  assertRoot(this.root).chmodSync(normalizePath(path), true, numMode);
};
/**
 * Change file timestamps of the file referenced by the supplied path.
 * @param path
 * @param atime
 * @param mtime
 * @param callback
 */
FS.prototype.utimes = function utimes(path, atime, mtime, cb) {
  if (cb === void 0) cb = nopCb;

  var newCb = wrapCb(cb, 1);
  try {
    assertRoot(this.root).utimes(
      normalizePath(path),
      normalizeTime(atime),
      normalizeTime(mtime),
      newCb
    );
  } catch (e) {
    newCb(e);
  }
};
/**
 * Change file timestamps of the file referenced by the supplied path.
 * @param path
 * @param atime
 * @param mtime
 */
FS.prototype.utimesSync = function utimesSync(path, atime, mtime) {
  assertRoot(this.root).utimesSync(
    normalizePath(path),
    normalizeTime(atime),
    normalizeTime(mtime)
  );
};
FS.prototype.realpath = function realpath(path, arg2, cb) {
  if (cb === void 0) cb = nopCb;

  var cache = typeof arg2 === 'object' ? arg2 : {};
  cb = typeof arg2 === 'function' ? arg2 : nopCb;
  var newCb = wrapCb(cb, 2);
  try {
    path = normalizePath(path);
    assertRoot(this.root).realpath(path, cache, newCb);
  } catch (e) {
    newCb(e);
  }
};
/**
 * Synchronous `realpath`.
 * @param path
 * @param cache An object literal of mapped paths that can be used to
 *   force a specific path resolution or avoid additional `fs.stat` calls for
 *   known real paths.
 * @return [String]
 */
FS.prototype.realpathSync = function realpathSync(path, cache) {
  if (cache === void 0) cache = {};

  path = normalizePath(path);
  return assertRoot(this.root).realpathSync(path, cache);
};
FS.prototype.watchFile = function watchFile(filename, arg2, listener) {
  var this$1 = this;
  if (listener === void 0) listener = nopCb;

  this.stat(filename, function (err, stat) {
    var usedStat = stat;
    if (err) {
      usedStat = new Stats(FileType.FILE, 0, undefined, 0, 0, 0, 0);
    }
    this$1.fileWatcher.watchFile(usedStat, filename, arg2, listener);
  });
};
FS.prototype.unwatchFile = function unwatchFile(filename, listener) {
  if (listener === void 0) listener = nopCb;

  this.fileWatcher.unwatchFile(filename, listener);
};
FS.prototype.watch = function watch(filename, arg2, listener) {
  if (listener === void 0) listener = nopCb;

  return this.fileWatcher.watch(filename, arg2, listener);
};
FS.prototype.access = function access(path, arg2, cb) {
  if (cb === void 0) cb = nopCb;

  throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.accessSync = function accessSync(path, mode) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.createReadStream = function createReadStream(path, options) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
FS.prototype.createWriteStream = function createWriteStream(path, options) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * For unit testing. Passes all incoming callbacks to cbWrapper for wrapping.
 */
FS.prototype.wrapCallbacks = function wrapCallbacks(cbWrapper) {
  wrapCbHook = cbWrapper;
};
FS.prototype.getFdForFile = function getFdForFile(file) {
  var fd = this.nextFd++;
  this.fdMap[fd] = file;
  return fd;
};
FS.prototype.fd2file = function fd2file(fd) {
  var rv = this.fdMap[fd];
  if (rv) {
    return rv;
  }
  throw new ApiError(ErrorCode.EBADF, 'Invalid file descriptor.');
};
FS.prototype.closeFd = function closeFd(fd) {
  delete this.fdMap[fd];
};
/* tslint:disable:variable-name */
// Exported fs.Stats.
FS.Stats = Stats;
/* tslint:enable:variable-name */
FS.F_OK = 0;
FS.R_OK = 4;
FS.W_OK = 2;
FS.X_OK = 1;

// Manually export the individual public functions of fs.
// Required because some code will invoke functions off of the module.
// e.g.:
// let writeFile = fs.writeFile;
// writeFile(...)
/**
 * @hidden
 */
var fs = new FS();
/**
 * @hidden
 */
var _fsMock = {};
/**
 * @hidden
 */
var fsProto = FS.prototype;
Object.keys(fsProto).forEach(function (key) {
  if (typeof fs[key] === 'function') {
    _fsMock[key] = function () {
      return fs[key].apply(fs, arguments);
    };
  } else {
    _fsMock[key] = fs[key];
  }
});
_fsMock['changeFSModule'] = function (newFs) {
  fs = newFs;
};
_fsMock['getFSModule'] = function () {
  return fs;
};
_fsMock['FS'] = FS;
_fsMock['Stats'] = FS.Stats;
_fsMock['F_OK'] = 0;
_fsMock['R_OK'] = 4;
_fsMock['W_OK'] = 2;
_fsMock['X_OK'] = 1;

/*
 * Levenshtein distance, from the `js-levenshtein` NPM module.
 * Copied here to avoid complexity of adding another CommonJS module dependency.
 */
function _min(d0, d1, d2, bx, ay) {
  return d0 < d1 || d2 < d1
    ? d0 > d2
      ? d2 + 1
      : d0 + 1
    : bx === ay
    ? d1
    : d1 + 1;
}
/**
 * Calculates levenshtein distance.
 * @param a
 * @param b
 */
function levenshtein(a, b) {
  if (a === b) {
    return 0;
  }
  if (a.length > b.length) {
    var tmp = a;
    a = b;
    b = tmp;
  }
  var la = a.length;
  var lb = b.length;
  while (la > 0 && a.charCodeAt(la - 1) === b.charCodeAt(lb - 1)) {
    la--;
    lb--;
  }
  var offset = 0;
  while (offset < la && a.charCodeAt(offset) === b.charCodeAt(offset)) {
    offset++;
  }
  la -= offset;
  lb -= offset;
  if (la === 0 || lb === 1) {
    return lb;
  }
  var vector = new Array(la << 1);
  for (var y = 0; y < la; ) {
    vector[la + y] = a.charCodeAt(offset + y);
    vector[y] = ++y;
  }
  var x;
  var d0;
  var d1;
  var d2;
  var d3;
  for (x = 0; x + 3 < lb; ) {
    var bx0 = b.charCodeAt(offset + (d0 = x));
    var bx1 = b.charCodeAt(offset + (d1 = x + 1));
    var bx2 = b.charCodeAt(offset + (d2 = x + 2));
    var bx3 = b.charCodeAt(offset + (d3 = x + 3));
    var dd$1 = (x += 4);
    for (var y$1 = 0; y$1 < la; ) {
      var ay = vector[la + y$1];
      var dy = vector[y$1];
      d0 = _min(dy, d0, d1, bx0, ay);
      d1 = _min(d0, d1, d2, bx1, ay);
      d2 = _min(d1, d2, d3, bx2, ay);
      dd$1 = _min(d2, d3, dd$1, bx3, ay);
      vector[y$1++] = dd$1;
      d3 = d2;
      d2 = d1;
      d1 = d0;
      d0 = dy;
    }
  }
  var dd = 0;
  for (; x < lb; ) {
    var bx0$1 = b.charCodeAt(offset + (d0 = x));
    dd = ++x;
    for (var y$2 = 0; y$2 < la; y$2++) {
      var dy$1 = vector[y$2];
      vector[y$2] = dd =
        dy$1 < d0 || dd < d0
          ? dy$1 > dd
            ? dd + 1
            : dy$1 + 1
          : bx0$1 === vector[la + y$2]
          ? d0
          : d0 + 1;
      d0 = dy$1;
    }
  }
  return dd;
}

function deprecationMessage(print, fsName, opts) {
  if (print) {
    // tslint:disable-next-line:no-console
    console.warn(
      '[' +
        fsName +
        "] Direct file system constructor usage is deprecated for this file system, and will be removed in the next major version. Please use the '" +
        fsName +
        '.Create(' +
        JSON.stringify(opts) +
        ", callback)' method instead. See https://github.com/jvilk/BrowserFS/issues/176 for more details."
    );
    // tslint:enable-next-line:no-console
  }
}
/**
 * Checks for any IE version, including IE11 which removed MSIE from the
 * userAgent string.
 * @hidden
 */
var isIE =
  typeof navigator !== 'undefined' &&
  Boolean(
    /(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) ||
      navigator.userAgent.indexOf('Trident') !== -1
  );
/**
 * Check if we're in a web worker.
 * @hidden
 */
var isWebWorker = typeof window === 'undefined';
/**
 * Throws an exception. Called on code paths that should be impossible.
 * @hidden
 */
function fail() {
  throw new Error(
    'BFS has reached an impossible code path; please file a bug.'
  );
}
/**
 * Synchronous recursive makedir.
 * @hidden
 */
function mkdirpSync(p, mode, fs) {
  if (!fs.existsSync(p)) {
    mkdirpSync(path.dirname(p), mode, fs);
    fs.mkdirSync(p, mode);
  }
}
/**
 * Converts a buffer into an array buffer. Attempts to do so in a
 * zero-copy manner, e.g. the array references the same memory.
 * @hidden
 */
function buffer2ArrayBuffer(buff) {
  var u8 = buffer2Uint8array(buff),
    u8offset = u8.byteOffset,
    u8Len = u8.byteLength;
  if (u8offset === 0 && u8Len === u8.buffer.byteLength) {
    return u8.buffer;
  } else {
    return u8.buffer.slice(u8offset, u8offset + u8Len);
  }
}
/**
 * Converts a buffer into a Uint8Array. Attempts to do so in a
 * zero-copy manner, e.g. the array references the same memory.
 * @hidden
 */
function buffer2Uint8array(buff) {
  if (buff instanceof Uint8Array) {
    // BFS & Node v4.0 buffers *are* Uint8Arrays.
    return buff;
  } else {
    // Uint8Arrays can be constructed from arrayish numbers.
    // At this point, we assume this isn't a BFS array.
    return new Uint8Array(buff);
  }
}
/**
 * Converts the given arrayish object into a Buffer. Attempts to
 * be zero-copy.
 * @hidden
 */
function arrayish2Buffer(arr) {
  if (arr instanceof Buffer) {
    return arr;
  } else if (arr instanceof Uint8Array) {
    return uint8Array2Buffer(arr);
  } else {
    return Buffer.from(arr);
  }
}
/**
 * Converts the given Uint8Array into a Buffer. Attempts to be zero-copy.
 * @hidden
 */
function uint8Array2Buffer(u8) {
  if (u8 instanceof Buffer) {
    return u8;
  } else if (u8.byteOffset === 0 && u8.byteLength === u8.buffer.byteLength) {
    return arrayBuffer2Buffer(u8.buffer);
  } else {
    return Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength);
  }
}
/**
 * Converts the given array buffer into a Buffer. Attempts to be
 * zero-copy.
 * @hidden
 */
function arrayBuffer2Buffer(ab) {
  return Buffer.from(ab);
}
/**
 * Copies a slice of the given buffer
 * @hidden
 */
function copyingSlice(buff, start, end) {
  if (start === void 0) start = 0;
  if (end === void 0) end = buff.length;

  if (start < 0 || end < 0 || end > buff.length || start > end) {
    throw new TypeError(
      'Invalid slice bounds on buffer of length ' +
        buff.length +
        ': [' +
        start +
        ', ' +
        end +
        ']'
    );
  }
  if (buff.length === 0) {
    // Avoid s0 corner case in ArrayBuffer case.
    return emptyBuffer();
  } else {
    var u8 = buffer2Uint8array(buff),
      s0 = buff[0],
      newS0 = (s0 + 1) % 0xff;
    buff[0] = newS0;
    if (u8[0] === newS0) {
      // Same memory. Revert & copy.
      u8[0] = s0;
      return uint8Array2Buffer(u8.slice(start, end));
    } else {
      // Revert.
      buff[0] = s0;
      return uint8Array2Buffer(u8.subarray(start, end));
    }
  }
}
/**
 * @hidden
 */
var emptyBuff = null;
/**
 * Returns an empty buffer.
 * @hidden
 */
function emptyBuffer() {
  if (emptyBuff) {
    return emptyBuff;
  }
  return (emptyBuff = Buffer.alloc(0));
}
/**
 * Option validator for a Buffer file system option.
 * @hidden
 */
function bufferValidator(v, cb) {
  if (Buffer.isBuffer(v)) {
    cb();
  } else {
    cb(new ApiError(ErrorCode.EINVAL, 'option must be a Buffer.'));
  }
}
/**
 * Checks that the given options object is valid for the file system options.
 * @hidden
 */
function checkOptions(fsType, opts, cb) {
  var optsInfo = fsType.Options;
  var fsName = fsType.Name;
  var pendingValidators = 0;
  var callbackCalled = false;
  var loopEnded = false;

  function validatorCallback(e) {
    if (!callbackCalled) {
      if (e) {
        callbackCalled = true;
        cb(e);
      }
      pendingValidators--;
      if (pendingValidators === 0 && loopEnded) {
        cb();
      }
    }
  }
  // Check for required options.
  var loop = function (optName) {
    if (optsInfo.hasOwnProperty(optName)) {
      var opt = optsInfo[optName];
      var providedValue = opts[optName];
      if (providedValue === undefined || providedValue === null) {
        if (!opt.optional) {
          // Required option, not provided.
          // Any incorrect options provided? Which ones are close to the provided one?
          // (edit distance 5 === close)
          var incorrectOptions = Object.keys(opts)
            .filter(function (o) {
              return !(o in optsInfo);
            })
            .map(function (a) {
              return {
                str: a,
                distance: levenshtein(optName, a),
              };
            })
            .filter(function (o) {
              return o.distance < 5;
            })
            .sort(function (a, b) {
              return a.distance - b.distance;
            });
          // Validators may be synchronous.
          if (callbackCalled) {
            return {};
          }
          callbackCalled = true;
          return {
            v: cb(
              new ApiError(
                ErrorCode.EINVAL,
                '[' +
                  fsName +
                  "] Required option '" +
                  optName +
                  "' not provided." +
                  (incorrectOptions.length > 0
                    ? " You provided unrecognized option '" +
                      incorrectOptions[0].str +
                      "'; perhaps you meant to type '" +
                      optName +
                      "'."
                    : '') +
                  '\nOption description: ' +
                  opt.description
              )
            ),
          };
        }
        // Else: Optional option, not provided. That is OK.
      } else {
        // Option provided! Check type.
        var typeMatches = false;
        if (Array.isArray(opt.type)) {
          typeMatches = opt.type.indexOf(typeof providedValue) !== -1;
        } else {
          typeMatches = typeof providedValue === opt.type;
        }
        if (!typeMatches) {
          // Validators may be synchronous.
          if (callbackCalled) {
            return {};
          }
          callbackCalled = true;
          return {
            v: cb(
              new ApiError(
                ErrorCode.EINVAL,
                '[' +
                  fsName +
                  '] Value provided for option ' +
                  optName +
                  ' is not the proper type. Expected ' +
                  (Array.isArray(opt.type)
                    ? 'one of {' + opt.type.join(', ') + '}'
                    : opt.type) +
                  ', but received ' +
                  typeof providedValue +
                  '\nOption description: ' +
                  opt.description
              )
            ),
          };
        } else if (opt.validator) {
          pendingValidators++;
          opt.validator(providedValue, validatorCallback);
        }
        // Otherwise: All good!
      }
    }
  };

  for (var optName in optsInfo) {
    var returned = loop(optName);

    if (returned) return returned.v;
  }
  loopEnded = true;
  if (pendingValidators === 0 && !callbackCalled) {
    cb();
  }
}

var BFSUtils = /*#__PURE__*/ Object.freeze({
  deprecationMessage: deprecationMessage,
  isIE: isIE,
  isWebWorker: isWebWorker,
  fail: fail,
  mkdirpSync: mkdirpSync,
  buffer2ArrayBuffer: buffer2ArrayBuffer,
  buffer2Uint8array: buffer2Uint8array,
  arrayish2Buffer: arrayish2Buffer,
  uint8Array2Buffer: uint8Array2Buffer,
  arrayBuffer2Buffer: arrayBuffer2Buffer,
  copyingSlice: copyingSlice,
  emptyBuffer: emptyBuffer,
  bufferValidator: bufferValidator,
  checkOptions: checkOptions,
});

var BFSEmscriptenStreamOps = function BFSEmscriptenStreamOps(fs) {
  this.fs = fs;
  this.nodefs = fs.getNodeFS();
  this.FS = fs.getFS();
  this.PATH = fs.getPATH();
  this.ERRNO_CODES = fs.getERRNO_CODES();
};
BFSEmscriptenStreamOps.prototype.open = function open(stream) {
  var path = this.fs.realPath(stream.node);
  var FS = this.FS;
  try {
    if (FS.isFile(stream.node.mode)) {
      stream.nfd = this.nodefs.openSync(
        path,
        this.fs.flagsToPermissionString(stream.flags)
      );
    }
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenStreamOps.prototype.close = function close(stream) {
  var FS = this.FS;
  try {
    if (FS.isFile(stream.node.mode) && stream.nfd) {
      this.nodefs.closeSync(stream.nfd);
    }
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenStreamOps.prototype.read = function read(
  stream,
  buffer,
  offset,
  length,
  position
) {
  // Avoid copying overhead by reading directly into buffer.
  try {
    return this.nodefs.readSync(
      stream.nfd,
      uint8Array2Buffer(buffer),
      offset,
      length,
      position
    );
  } catch (e) {
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenStreamOps.prototype.write = function write(
  stream,
  buffer,
  offset,
  length,
  position
) {
  // Avoid copying overhead.
  try {
    return this.nodefs.writeSync(
      stream.nfd,
      uint8Array2Buffer(buffer),
      offset,
      length,
      position
    );
  } catch (e) {
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenStreamOps.prototype.llseek = function llseek(
  stream,
  offset,
  whence
) {
  var position = offset;
  if (whence === 1) {
    // SEEK_CUR.
    position += stream.position;
  } else if (whence === 2) {
    // SEEK_END.
    if (this.FS.isFile(stream.node.mode)) {
      try {
        var stat = this.nodefs.fstatSync(stream.nfd);
        position += stat.size;
      } catch (e) {
        throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
      }
    }
  }
  if (position < 0) {
    throw new this.FS.ErrnoError(this.ERRNO_CODES.EINVAL);
  }
  stream.position = position;
  return position;
};
var BFSEmscriptenNodeOps = function BFSEmscriptenNodeOps(fs) {
  this.fs = fs;
  this.nodefs = fs.getNodeFS();
  this.FS = fs.getFS();
  this.PATH = fs.getPATH();
  this.ERRNO_CODES = fs.getERRNO_CODES();
};
BFSEmscriptenNodeOps.prototype.getattr = function getattr(node) {
  var path = this.fs.realPath(node);
  var stat;
  try {
    stat = this.nodefs.lstatSync(path);
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
  return {
    dev: stat.dev,
    ino: stat.ino,
    mode: stat.mode,
    nlink: stat.nlink,
    uid: stat.uid,
    gid: stat.gid,
    rdev: stat.rdev,
    size: stat.size,
    atime: stat.atime,
    mtime: stat.mtime,
    ctime: stat.ctime,
    blksize: stat.blksize,
    blocks: stat.blocks,
  };
};
BFSEmscriptenNodeOps.prototype.setattr = function setattr(node, attr) {
  var path = this.fs.realPath(node);
  try {
    if (attr.mode !== undefined) {
      this.nodefs.chmodSync(path, attr.mode);
      // update the common node structure mode as well
      node.mode = attr.mode;
    }
    if (attr.timestamp !== undefined) {
      var date = new Date(attr.timestamp);
      this.nodefs.utimesSync(path, date, date);
    }
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    // Ignore not supported errors. Emscripten does utimesSync when it
    // writes files, but never really requires the value to be set.
    if (e.code !== 'ENOTSUP') {
      throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
  }
  if (attr.size !== undefined) {
    try {
      this.nodefs.truncateSync(path, attr.size);
    } catch (e) {
      if (!e.code) {
        throw e;
      }
      throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
    }
  }
};
BFSEmscriptenNodeOps.prototype.lookup = function lookup(parent, name) {
  var path = this.PATH.join2(this.fs.realPath(parent), name);
  var mode = this.fs.getMode(path);
  return this.fs.createNode(parent, name, mode);
};
BFSEmscriptenNodeOps.prototype.mknod = function mknod(parent, name, mode, dev) {
  var node = this.fs.createNode(parent, name, mode, dev);
  // create the backing node for this in the fs root as well
  var path = this.fs.realPath(node);
  try {
    if (this.FS.isDir(node.mode)) {
      this.nodefs.mkdirSync(path, node.mode);
    } else {
      this.nodefs.writeFileSync(path, '', {
        mode: node.mode,
      });
    }
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
  return node;
};
BFSEmscriptenNodeOps.prototype.rename = function rename(
  oldNode,
  newDir,
  newName
) {
  var oldPath = this.fs.realPath(oldNode);
  var newPath = this.PATH.join2(this.fs.realPath(newDir), newName);
  try {
    this.nodefs.renameSync(oldPath, newPath);
    // This logic is missing from the original NodeFS,
    // causing Emscripten's filesystem to think that the old file still exists.
    oldNode.name = newName;
    oldNode.parent = newDir;
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenNodeOps.prototype.unlink = function unlink(parent, name) {
  var path = this.PATH.join2(this.fs.realPath(parent), name);
  try {
    this.nodefs.unlinkSync(path);
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenNodeOps.prototype.rmdir = function rmdir(parent, name) {
  var path = this.PATH.join2(this.fs.realPath(parent), name);
  try {
    this.nodefs.rmdirSync(path);
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenNodeOps.prototype.readdir = function readdir(node) {
  var path = this.fs.realPath(node);
  try {
    // Node does not list . and .. in directory listings,
    // but Emscripten expects it.
    var contents = this.nodefs.readdirSync(path);
    contents.push('.', '..');
    return contents;
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenNodeOps.prototype.symlink = function symlink(
  parent,
  newName,
  oldPath
) {
  var newPath = this.PATH.join2(this.fs.realPath(parent), newName);
  try {
    this.nodefs.symlinkSync(oldPath, newPath);
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
BFSEmscriptenNodeOps.prototype.readlink = function readlink(node) {
  var path = this.fs.realPath(node);
  try {
    return this.nodefs.readlinkSync(path);
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
};
var BFSEmscriptenFS = function BFSEmscriptenFS(
  _FS,
  _PATH,
  _ERRNO_CODES,
  nodefs
) {
  if (_FS === void 0) _FS = self['FS'];
  if (_PATH === void 0) _PATH = self['PATH'];
  if (_ERRNO_CODES === void 0) _ERRNO_CODES = self['ERRNO_CODES'];
  if (nodefs === void 0) nodefs = _fsMock;

  // This maps the integer permission modes from http://linux.die.net/man/3/open
  // to node.js-specific file open permission strings at http://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback
  this.flagsToPermissionStringMap = {
    0 /*O_RDONLY*/: 'r',
    1 /*O_WRONLY*/: 'r+',
    2 /*O_RDWR*/: 'r+',
    64 /*O_CREAT*/: 'r',
    65 /*O_WRONLY|O_CREAT*/: 'r+',
    66 /*O_RDWR|O_CREAT*/: 'r+',
    129 /*O_WRONLY|O_EXCL*/: 'rx+',
    193 /*O_WRONLY|O_CREAT|O_EXCL*/: 'rx+',
    514 /*O_RDWR|O_TRUNC*/: 'w+',
    577 /*O_WRONLY|O_CREAT|O_TRUNC*/: 'w',
    578 /*O_CREAT|O_RDWR|O_TRUNC*/: 'w+',
    705 /*O_WRONLY|O_CREAT|O_EXCL|O_TRUNC*/: 'wx',
    706 /*O_RDWR|O_CREAT|O_EXCL|O_TRUNC*/: 'wx+',
    1024 /*O_APPEND*/: 'a',
    1025 /*O_WRONLY|O_APPEND*/: 'a',
    1026 /*O_RDWR|O_APPEND*/: 'a+',
    1089 /*O_WRONLY|O_CREAT|O_APPEND*/: 'a',
    1090 /*O_RDWR|O_CREAT|O_APPEND*/: 'a+',
    1153 /*O_WRONLY|O_EXCL|O_APPEND*/: 'ax',
    1154 /*O_RDWR|O_EXCL|O_APPEND*/: 'ax+',
    1217 /*O_WRONLY|O_CREAT|O_EXCL|O_APPEND*/: 'ax',
    1218 /*O_RDWR|O_CREAT|O_EXCL|O_APPEND*/: 'ax+',
    4096 /*O_RDONLY|O_DSYNC*/: 'rs',
    4098 /*O_RDWR|O_DSYNC*/: 'rs+',
  };
  this.nodefs = nodefs;
  this.FS = _FS;
  this.PATH = _PATH;
  this.ERRNO_CODES = _ERRNO_CODES;
  this.node_ops = new BFSEmscriptenNodeOps(this);
  this.stream_ops = new BFSEmscriptenStreamOps(this);
};
BFSEmscriptenFS.prototype.mount = function mount(m) {
  return this.createNode(null, '/', this.getMode(m.opts.root), 0);
};
BFSEmscriptenFS.prototype.createNode = function createNode(
  parent,
  name,
  mode,
  dev
) {
  var FS = this.FS;
  if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
    throw new FS.ErrnoError(this.ERRNO_CODES.EINVAL);
  }
  var node = FS.createNode(parent, name, mode);
  node.node_ops = this.node_ops;
  node.stream_ops = this.stream_ops;
  return node;
};
BFSEmscriptenFS.prototype.getMode = function getMode(path) {
  var stat;
  try {
    stat = this.nodefs.lstatSync(path);
  } catch (e) {
    if (!e.code) {
      throw e;
    }
    throw new this.FS.ErrnoError(this.ERRNO_CODES[e.code]);
  }
  return stat.mode;
};
BFSEmscriptenFS.prototype.realPath = function realPath(node) {
  var parts = [];
  while (node.parent !== node) {
    parts.push(node.name);
    node = node.parent;
  }
  parts.push(node.mount.opts.root);
  parts.reverse();
  return this.PATH.join.apply(null, parts);
};
BFSEmscriptenFS.prototype.flagsToPermissionString =
  function flagsToPermissionString(flags) {
    var parsedFlags = typeof flags === 'string' ? parseInt(flags, 10) : flags;
    parsedFlags &= 0x1fff;
    if (parsedFlags in this.flagsToPermissionStringMap) {
      return this.flagsToPermissionStringMap[parsedFlags];
    } else {
      return flags;
    }
  };
BFSEmscriptenFS.prototype.getNodeFS = function getNodeFS() {
  return this.nodefs;
};
BFSEmscriptenFS.prototype.getFS = function getFS() {
  return this.FS;
};
BFSEmscriptenFS.prototype.getPATH = function getPATH() {
  return this.PATH;
};
BFSEmscriptenFS.prototype.getERRNO_CODES = function getERRNO_CODES() {
  return this.ERRNO_CODES;
};

/**
 * Basic filesystem class. Most filesystems should extend this class, as it
 * provides default implementations for a handful of methods.
 */
var BaseFileSystem = function BaseFileSystem() {};

BaseFileSystem.prototype.supportsLinks = function supportsLinks() {
  return false;
};
BaseFileSystem.prototype.diskSpace = function diskSpace(p, cb) {
  cb(0, 0);
};
/**
 * Opens the file at path p with the given flag. The file must exist.
 * @param p The path to open.
 * @param flag The flag to use when opening the file.
 */
BaseFileSystem.prototype.openFile = function openFile(p, flag, cb) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * Create the file at path p with the given mode. Then, open it with the given
 * flag.
 */
BaseFileSystem.prototype.createFile = function createFile(p, flag, mode, cb) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.open = function open(p, flag, mode, cb) {
  var this$1 = this;

  var mustBeFile = function (e, stats) {
    if (e) {
      // File does not exist.
      switch (flag.pathNotExistsAction()) {
        case ActionType.CREATE_FILE:
          // Ensure parent exists.
          return this$1.stat(path.dirname(p), false, function (e, parentStats) {
            if (e) {
              cb(e);
            } else if (parentStats && !parentStats.isDirectory()) {
              cb(ApiError.ENOTDIR(path.dirname(p)));
            } else {
              this$1.createFile(p, flag, mode, cb);
            }
          });
        case ActionType.THROW_EXCEPTION:
          return cb(ApiError.ENOENT(p));
        default:
          return cb(new ApiError(ErrorCode.EINVAL, 'Invalid FileFlag object.'));
      }
    } else {
      // File exists.
      if (stats && stats.isDirectory()) {
        return cb(ApiError.EISDIR(p));
      }
      switch (flag.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
          return cb(ApiError.EEXIST(p));
        case ActionType.TRUNCATE_FILE:
          // NOTE: In a previous implementation, we deleted the file and
          // re-created it. However, this created a race condition if another
          // asynchronous request was trying to read the file, as the file
          // would not exist for a small period of time.
          return this$1.openFile(p, flag, function (e, fd) {
            if (e) {
              cb(e);
            } else if (fd) {
              fd.truncate(0, function () {
                fd.sync(function () {
                  cb(null, fd);
                });
              });
            } else {
              fail();
            }
          });
        case ActionType.NOP:
          return this$1.openFile(p, flag, cb);
        default:
          return cb(new ApiError(ErrorCode.EINVAL, 'Invalid FileFlag object.'));
      }
    }
  };
  this.stat(p, false, mustBeFile);
};
BaseFileSystem.prototype.rename = function rename(oldPath, newPath, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.renameSync = function renameSync(oldPath, newPath) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.stat = function stat(p, isLstat, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.statSync = function statSync(p, isLstat) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * Opens the file at path p with the given flag. The file must exist.
 * @param p The path to open.
 * @param flag The flag to use when opening the file.
 * @return A File object corresponding to the opened file.
 */
BaseFileSystem.prototype.openFileSync = function openFileSync(p, flag, mode) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * Create the file at path p with the given mode. Then, open it with the given
 * flag.
 */
BaseFileSystem.prototype.createFileSync = function createFileSync(
  p,
  flag,
  mode
) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.openSync = function openSync(p, flag, mode) {
  // Check if the path exists, and is a file.
  var stats;
  try {
    stats = this.statSync(p, false);
  } catch (e) {
    // File does not exist.
    switch (flag.pathNotExistsAction()) {
      case ActionType.CREATE_FILE:
        // Ensure parent exists.
        var parentStats = this.statSync(path.dirname(p), false);
        if (!parentStats.isDirectory()) {
          throw ApiError.ENOTDIR(path.dirname(p));
        }
        return this.createFileSync(p, flag, mode);
      case ActionType.THROW_EXCEPTION:
        throw ApiError.ENOENT(p);
      default:
        throw new ApiError(ErrorCode.EINVAL, 'Invalid FileFlag object.');
    }
  }
  // File exists.
  if (stats.isDirectory()) {
    throw ApiError.EISDIR(p);
  }
  switch (flag.pathExistsAction()) {
    case ActionType.THROW_EXCEPTION:
      throw ApiError.EEXIST(p);
    case ActionType.TRUNCATE_FILE:
      // Delete file.
      this.unlinkSync(p);
      // Create file. Use the same mode as the old file.
      // Node itself modifies the ctime when this occurs, so this action
      // will preserve that behavior if the underlying file system
      // supports those properties.
      return this.createFileSync(p, flag, stats.mode);
    case ActionType.NOP:
      return this.openFileSync(p, flag, mode);
    default:
      throw new ApiError(ErrorCode.EINVAL, 'Invalid FileFlag object.');
  }
};
BaseFileSystem.prototype.unlink = function unlink(p, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.unlinkSync = function unlinkSync(p) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.rmdir = function rmdir(p, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.rmdirSync = function rmdirSync(p) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.mkdir = function mkdir(p, mode, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.mkdirSync = function mkdirSync(p, mode) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.readdir = function readdir(p, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.readdirSync = function readdirSync(p) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.exists = function exists(p, cb) {
  this.stat(p, null, function (err) {
    cb(!err);
  });
};
BaseFileSystem.prototype.existsSync = function existsSync(p) {
  try {
    this.statSync(p, true);
    return true;
  } catch (e) {
    return false;
  }
};
BaseFileSystem.prototype.realpath = function realpath(p, cache, cb) {
  if (this.supportsLinks()) {
    // The path could contain symlinks. Split up the path,
    // resolve any symlinks, return the resolved string.
    var splitPath = p.split(path.sep);
    // TODO: Simpler to just pass through file, find sep and such.
    for (var i = 0; i < splitPath.length; i++) {
      var addPaths = splitPath.slice(0, i + 1);
      splitPath[i] = path.join.apply(null, addPaths);
    }
  } else {
    // No symlinks. We just need to verify that it exists.
    this.exists(p, function (doesExist) {
      if (doesExist) {
        cb(null, p);
      } else {
        cb(ApiError.ENOENT(p));
      }
    });
  }
};
BaseFileSystem.prototype.realpathSync = function realpathSync(p, cache) {
  if (this.supportsLinks()) {
    // The path could contain symlinks. Split up the path,
    // resolve any symlinks, return the resolved string.
    var splitPath = p.split(path.sep);
    // TODO: Simpler to just pass through file, find sep and such.
    for (var i = 0; i < splitPath.length; i++) {
      var addPaths = splitPath.slice(0, i + 1);
      splitPath[i] = path.join.apply(path, addPaths);
    }
    return splitPath.join(path.sep);
  } else {
    // No symlinks. We just need to verify that it exists.
    if (this.existsSync(p)) {
      return p;
    } else {
      throw ApiError.ENOENT(p);
    }
  }
};
BaseFileSystem.prototype.truncate = function truncate(p, len, cb) {
  this.open(p, FileFlag.getFileFlag('r+'), 0x1a4, function (er, fd) {
    if (er) {
      return cb(er);
    }
    fd.truncate(len, function (er) {
      fd.close(function (er2) {
        cb(er || er2);
      });
    });
  });
};
BaseFileSystem.prototype.truncateSync = function truncateSync(p, len) {
  var fd = this.openSync(p, FileFlag.getFileFlag('r+'), 0x1a4);
  // Need to safely close FD, regardless of whether or not truncate succeeds.
  try {
    fd.truncateSync(len);
  } catch (e) {
    throw e;
  } finally {
    fd.closeSync();
  }
};
BaseFileSystem.prototype.readFile = function readFile(
  fname,
  encoding,
  flag,
  cb
) {
  // Wrap cb in file closing code.
  var oldCb = cb;
  // Get file.
  this.open(fname, flag, 0x1a4, function (err, fd) {
    if (err) {
      return cb(err);
    }
    cb = function (err, arg) {
      fd.close(function (err2) {
        if (!err) {
          err = err2;
        }
        return oldCb(err, arg);
      });
    };
    fd.stat(function (err, stat) {
      if (err) {
        return cb(err);
      }
      // Allocate buffer.
      var buf = Buffer.alloc(stat.size);
      fd.read(buf, 0, stat.size, 0, function (err) {
        if (err) {
          return cb(err);
        } else if (encoding === null) {
          return cb(err, buf);
        }
        try {
          cb(null, buf.toString(encoding));
        } catch (e) {
          cb(e);
        }
      });
    });
  });
};
BaseFileSystem.prototype.readFileSync = function readFileSync(
  fname,
  encoding,
  flag
) {
  // Get file.
  var fd = this.openSync(fname, flag, 0x1a4);
  try {
    var stat = fd.statSync();
    // Allocate buffer.
    var buf = Buffer.alloc(stat.size);
    fd.readSync(buf, 0, stat.size, 0);
    fd.closeSync();
    if (encoding === null) {
      return buf;
    }
    return buf.toString(encoding);
  } finally {
    fd.closeSync();
  }
};
BaseFileSystem.prototype.writeFile = function writeFile(
  fname,
  data,
  encoding,
  flag,
  mode,
  cb
) {
  // Wrap cb in file closing code.
  var oldCb = cb;
  // Get file.
  this.open(fname, flag, 0x1a4, function (err, fd) {
    if (err) {
      return cb(err);
    }
    cb = function (err) {
      fd.close(function (err2) {
        oldCb(err ? err : err2);
      });
    };
    try {
      if (typeof data === 'string') {
        data = Buffer.from(data, encoding);
      }
    } catch (e) {
      return cb(e);
    }
    // Write into file.
    fd.write(data, 0, data.length, 0, cb);
  });
};
BaseFileSystem.prototype.writeFileSync = function writeFileSync(
  fname,
  data,
  encoding,
  flag,
  mode
) {
  // Get file.
  var fd = this.openSync(fname, flag, mode);
  try {
    if (typeof data === 'string') {
      data = Buffer.from(data, encoding);
    }
    // Write into file.
    fd.writeSync(data, 0, data.length, 0);
  } finally {
    fd.closeSync();
  }
};
BaseFileSystem.prototype.appendFile = function appendFile(
  fname,
  data,
  encoding,
  flag,
  mode,
  cb
) {
  // Wrap cb in file closing code.
  var oldCb = cb;
  this.open(fname, flag, mode, function (err, fd) {
    if (err) {
      return cb(err);
    }
    cb = function (err) {
      fd.close(function (err2) {
        oldCb(err ? err : err2);
      });
    };
    if (typeof data === 'string') {
      data = Buffer.from(data, encoding);
    }
    fd.write(data, 0, data.length, null, cb);
  });
};
BaseFileSystem.prototype.appendFileSync = function appendFileSync(
  fname,
  data,
  encoding,
  flag,
  mode
) {
  var fd = this.openSync(fname, flag, mode);
  try {
    if (typeof data === 'string') {
      data = Buffer.from(data, encoding);
    }
    fd.writeSync(data, 0, data.length, null);
  } finally {
    fd.closeSync();
  }
};
BaseFileSystem.prototype.chmod = function chmod(p, isLchmod, mode, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.chmodSync = function chmodSync(p, isLchmod, mode) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.chown = function chown(p, isLchown, uid, gid, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.chownSync = function chownSync(p, isLchown, uid, gid) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.utimes = function utimes(p, atime, mtime, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.utimesSync = function utimesSync(p, atime, mtime) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.link = function link(srcpath, dstpath, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.linkSync = function linkSync(srcpath, dstpath) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.symlink = function symlink(
  srcpath,
  dstpath,
  type,
  cb
) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.symlinkSync = function symlinkSync(
  srcpath,
  dstpath,
  type
) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFileSystem.prototype.readlink = function readlink(p, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFileSystem.prototype.readlinkSync = function readlinkSync(p) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
/**
 * Implements the asynchronous API in terms of the synchronous API.
 * @class SynchronousFileSystem
 */
var SynchronousFileSystem = /*@__PURE__*/ (function (BaseFileSystem) {
  function SynchronousFileSystem() {
    BaseFileSystem.apply(this, arguments);
  }

  if (BaseFileSystem) SynchronousFileSystem.__proto__ = BaseFileSystem;
  SynchronousFileSystem.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  SynchronousFileSystem.prototype.constructor = SynchronousFileSystem;

  SynchronousFileSystem.prototype.supportsSynch = function supportsSynch() {
    return true;
  };
  SynchronousFileSystem.prototype.rename = function rename(
    oldPath,
    newPath,
    cb
  ) {
    try {
      this.renameSync(oldPath, newPath);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.stat = function stat(p, isLstat, cb) {
    try {
      cb(null, this.statSync(p, isLstat));
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.open = function open(p, flags, mode, cb) {
    try {
      cb(null, this.openSync(p, flags, mode));
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.unlink = function unlink(p, cb) {
    try {
      this.unlinkSync(p);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.rmdir = function rmdir(p, cb) {
    try {
      this.rmdirSync(p);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.mkdir = function mkdir(p, mode, cb) {
    try {
      this.mkdirSync(p, mode);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.readdir = function readdir(p, cb) {
    try {
      cb(null, this.readdirSync(p));
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.chmod = function chmod(
    p,
    isLchmod,
    mode,
    cb
  ) {
    try {
      this.chmodSync(p, isLchmod, mode);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.chown = function chown(
    p,
    isLchown,
    uid,
    gid,
    cb
  ) {
    try {
      this.chownSync(p, isLchown, uid, gid);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.utimes = function utimes(
    p,
    atime,
    mtime,
    cb
  ) {
    try {
      this.utimesSync(p, atime, mtime);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.link = function link(srcpath, dstpath, cb) {
    try {
      this.linkSync(srcpath, dstpath);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.symlink = function symlink(
    srcpath,
    dstpath,
    type,
    cb
  ) {
    try {
      this.symlinkSync(srcpath, dstpath, type);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  SynchronousFileSystem.prototype.readlink = function readlink(p, cb) {
    try {
      cb(null, this.readlinkSync(p));
    } catch (e) {
      cb(e);
    }
  };

  return SynchronousFileSystem;
})(BaseFileSystem);

/**
 * Base class that contains shared implementations of functions for the file
 * object.
 */
var BaseFile = function BaseFile() {};

BaseFile.prototype.sync = function sync(cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFile.prototype.syncSync = function syncSync() {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFile.prototype.datasync = function datasync(cb) {
  this.sync(cb);
};
BaseFile.prototype.datasyncSync = function datasyncSync() {
  return this.syncSync();
};
BaseFile.prototype.chown = function chown(uid, gid, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFile.prototype.chownSync = function chownSync(uid, gid) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFile.prototype.chmod = function chmod(mode, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFile.prototype.chmodSync = function chmodSync(mode) {
  throw new ApiError(ErrorCode.ENOTSUP);
};
BaseFile.prototype.utimes = function utimes(atime, mtime, cb) {
  cb(new ApiError(ErrorCode.ENOTSUP));
};
BaseFile.prototype.utimesSync = function utimesSync(atime, mtime) {
  throw new ApiError(ErrorCode.ENOTSUP);
};

/**
 * An implementation of the File interface that operates on a file that is
 * completely in-memory. PreloadFiles are backed by a Buffer.
 *
 * This is also an abstract class, as it lacks an implementation of 'sync' and
 * 'close'. Each filesystem that wishes to use this file representation must
 * extend this class and implement those two methods.
 * @todo 'close' lever that disables functionality once closed.
 */
var PreloadFile = /*@__PURE__*/ (function (BaseFile) {
  function PreloadFile(_fs, _path, _flag, _stat, contents) {
    BaseFile.call(this);
    this._pos = 0;
    this._dirty = false;
    this._fs = _fs;
    this._path = _path;
    this._flag = _flag;
    this._stat = _stat;
    this._buffer = contents ? contents : emptyBuffer();
    // Note: This invariant is *not* maintained once the file starts getting
    // modified.
    // Note: Only actually matters if file is readable, as writeable modes may
    // truncate/append to file.
    if (this._stat.size !== this._buffer.length && this._flag.isReadable()) {
      throw new Error(
        'Invalid buffer: Buffer is ' +
          this._buffer.length +
          ' long, yet Stats object specifies that file is ' +
          this._stat.size +
          ' long.'
      );
    }
  }

  if (BaseFile) PreloadFile.__proto__ = BaseFile;
  PreloadFile.prototype = Object.create(BaseFile && BaseFile.prototype);
  PreloadFile.prototype.constructor = PreloadFile;
  /**
   * NONSTANDARD: Get the underlying buffer for this file. !!DO NOT MUTATE!! Will mess up dirty tracking.
   */
  PreloadFile.prototype.getBuffer = function getBuffer() {
    return this._buffer;
  };
  /**
   * NONSTANDARD: Get underlying stats for this file. !!DO NOT MUTATE!!
   */
  PreloadFile.prototype.getStats = function getStats() {
    return this._stat;
  };
  PreloadFile.prototype.getFlag = function getFlag() {
    return this._flag;
  };
  /**
   * Get the path to this file.
   * @return [String] The path to the file.
   */
  PreloadFile.prototype.getPath = function getPath() {
    return this._path;
  };
  /**
   * Get the current file position.
   *
   * We emulate the following bug mentioned in the Node documentation:
   * > On Linux, positional writes don't work when the file is opened in append
   *   mode. The kernel ignores the position argument and always appends the data
   *   to the end of the file.
   * @return [Number] The current file position.
   */
  PreloadFile.prototype.getPos = function getPos() {
    if (this._flag.isAppendable()) {
      return this._stat.size;
    }
    return this._pos;
  };
  /**
   * Advance the current file position by the indicated number of positions.
   * @param [Number] delta
   */
  PreloadFile.prototype.advancePos = function advancePos(delta) {
    return (this._pos += delta);
  };
  /**
   * Set the file position.
   * @param [Number] newPos
   */
  PreloadFile.prototype.setPos = function setPos(newPos) {
    return (this._pos = newPos);
  };
  /**
   * **Core**: Asynchronous sync. Must be implemented by subclasses of this
   * class.
   * @param [Function(BrowserFS.ApiError)] cb
   */
  PreloadFile.prototype.sync = function sync(cb) {
    try {
      this.syncSync();
      cb();
    } catch (e) {
      cb(e);
    }
  };
  /**
   * **Core**: Synchronous sync.
   */
  PreloadFile.prototype.syncSync = function syncSync() {
    throw new ApiError(ErrorCode.ENOTSUP);
  };
  /**
   * **Core**: Asynchronous close. Must be implemented by subclasses of this
   * class.
   * @param [Function(BrowserFS.ApiError)] cb
   */
  PreloadFile.prototype.close = function close(cb) {
    try {
      this.closeSync();
      cb();
    } catch (e) {
      cb(e);
    }
  };
  /**
   * **Core**: Synchronous close.
   */
  PreloadFile.prototype.closeSync = function closeSync() {
    throw new ApiError(ErrorCode.ENOTSUP);
  };
  /**
   * Asynchronous `stat`.
   * @param [Function(BrowserFS.ApiError, BrowserFS.node.fs.Stats)] cb
   */
  PreloadFile.prototype.stat = function stat(cb) {
    try {
      cb(null, Stats.clone(this._stat));
    } catch (e) {
      cb(e);
    }
  };
  /**
   * Synchronous `stat`.
   */
  PreloadFile.prototype.statSync = function statSync() {
    return Stats.clone(this._stat);
  };
  /**
   * Asynchronous truncate.
   * @param [Number] len
   * @param [Function(BrowserFS.ApiError)] cb
   */
  PreloadFile.prototype.truncate = function truncate(len, cb) {
    try {
      this.truncateSync(len);
      if (this._flag.isSynchronous() && !_fsMock.getRootFS().supportsSynch()) {
        this.sync(cb);
      }
      cb();
    } catch (e) {
      return cb(e);
    }
  };
  /**
   * Synchronous truncate.
   * @param [Number] len
   */
  PreloadFile.prototype.truncateSync = function truncateSync(len) {
    this._dirty = true;
    if (!this._flag.isWriteable()) {
      throw new ApiError(
        ErrorCode.EPERM,
        'File not opened with a writeable mode.'
      );
    }
    this._stat.mtimeMs = Date.now();
    if (len > this._buffer.length) {
      var buf = Buffer.alloc(len - this._buffer.length, 0);
      // Write will set @_stat.size for us.
      this.writeSync(buf, 0, buf.length, this._buffer.length);
      if (this._flag.isSynchronous() && _fsMock.getRootFS().supportsSynch()) {
        this.syncSync();
      }
      return;
    }
    this._stat.size = len;
    // Truncate buffer to 'len'.
    var newBuff = Buffer.alloc(len);
    this._buffer.copy(newBuff, 0, 0, len);
    this._buffer = newBuff;
    if (this._flag.isSynchronous() && _fsMock.getRootFS().supportsSynch()) {
      this.syncSync();
    }
  };
  /**
   * Write buffer to the file.
   * Note that it is unsafe to use fs.write multiple times on the same file
   * without waiting for the callback.
   * @param [BrowserFS.node.Buffer] buffer Buffer containing the data to write to
   *  the file.
   * @param [Number] offset Offset in the buffer to start reading data from.
   * @param [Number] length The amount of bytes to write to the file.
   * @param [Number] position Offset from the beginning of the file where this
   *   data should be written. If position is null, the data will be written at
   *   the current position.
   * @param [Function(BrowserFS.ApiError, Number, BrowserFS.node.Buffer)]
   *   cb The number specifies the number of bytes written into the file.
   */
  PreloadFile.prototype.write = function write(
    buffer,
    offset,
    length,
    position,
    cb
  ) {
    try {
      cb(null, this.writeSync(buffer, offset, length, position), buffer);
    } catch (e) {
      cb(e);
    }
  };
  /**
   * Write buffer to the file.
   * Note that it is unsafe to use fs.writeSync multiple times on the same file
   * without waiting for the callback.
   * @param [BrowserFS.node.Buffer] buffer Buffer containing the data to write to
   *  the file.
   * @param [Number] offset Offset in the buffer to start reading data from.
   * @param [Number] length The amount of bytes to write to the file.
   * @param [Number] position Offset from the beginning of the file where this
   *   data should be written. If position is null, the data will be written at
   *   the current position.
   * @return [Number]
   */
  PreloadFile.prototype.writeSync = function writeSync(
    buffer,
    offset,
    length,
    position
  ) {
    this._dirty = true;
    if (position === undefined || position === null) {
      position = this.getPos();
    }
    if (!this._flag.isWriteable()) {
      throw new ApiError(
        ErrorCode.EPERM,
        'File not opened with a writeable mode.'
      );
    }
    var endFp = position + length;
    if (endFp > this._stat.size) {
      this._stat.size = endFp;
      if (endFp > this._buffer.length) {
        // Extend the buffer!
        var newBuff = Buffer.alloc(endFp);
        this._buffer.copy(newBuff);
        this._buffer = newBuff;
      }
    }
    var len = buffer.copy(this._buffer, position, offset, offset + length);
    this._stat.mtimeMs = Date.now();
    if (this._flag.isSynchronous()) {
      this.syncSync();
      return len;
    }
    this.setPos(position + len);
    return len;
  };
  /**
   * Read data from the file.
   * @param [BrowserFS.node.Buffer] buffer The buffer that the data will be
   *   written to.
   * @param [Number] offset The offset within the buffer where writing will
   *   start.
   * @param [Number] length An integer specifying the number of bytes to read.
   * @param [Number] position An integer specifying where to begin reading from
   *   in the file. If position is null, data will be read from the current file
   *   position.
   * @param [Function(BrowserFS.ApiError, Number, BrowserFS.node.Buffer)] cb The
   *   number is the number of bytes read
   */
  PreloadFile.prototype.read = function read(
    buffer,
    offset,
    length,
    position,
    cb
  ) {
    try {
      cb(null, this.readSync(buffer, offset, length, position), buffer);
    } catch (e) {
      cb(e);
    }
  };
  /**
   * Read data from the file.
   * @param [BrowserFS.node.Buffer] buffer The buffer that the data will be
   *   written to.
   * @param [Number] offset The offset within the buffer where writing will
   *   start.
   * @param [Number] length An integer specifying the number of bytes to read.
   * @param [Number] position An integer specifying where to begin reading from
   *   in the file. If position is null, data will be read from the current file
   *   position.
   * @return [Number]
   */
  PreloadFile.prototype.readSync = function readSync(
    buffer,
    offset,
    length,
    position
  ) {
    if (!this._flag.isReadable()) {
      throw new ApiError(
        ErrorCode.EPERM,
        'File not opened with a readable mode.'
      );
    }
    if (position === undefined || position === null) {
      position = this.getPos();
    }
    var endRead = position + length;
    if (endRead > this._stat.size) {
      length = this._stat.size - position;
    }
    var rv = this._buffer.copy(buffer, offset, position, position + length);
    this._stat.atimeMs = Date.now();
    this._pos = position + length;
    return rv;
  };
  /**
   * Asynchronous `fchmod`.
   * @param [Number|String] mode
   * @param [Function(BrowserFS.ApiError)] cb
   */
  PreloadFile.prototype.chmod = function chmod(mode, cb) {
    try {
      this.chmodSync(mode);
      cb();
    } catch (e) {
      cb(e);
    }
  };
  /**
   * Asynchronous `fchmod`.
   * @param [Number] mode
   */
  PreloadFile.prototype.chmodSync = function chmodSync(mode) {
    if (!this._fs.supportsProps()) {
      throw new ApiError(ErrorCode.ENOTSUP);
    }
    this._dirty = true;
    this._stat.chmod(mode);
    this.syncSync();
  };
  PreloadFile.prototype.isDirty = function isDirty() {
    return this._dirty;
  };
  /**
   * Resets the dirty bit. Should only be called after a sync has completed successfully.
   */
  PreloadFile.prototype.resetDirty = function resetDirty() {
    this._dirty = false;
  };

  return PreloadFile;
})(BaseFile);
/**
 * File class for the InMemory and XHR file systems.
 * Doesn't sync to anything, so it works nicely for memory-only files.
 */
var NoSyncFile = /*@__PURE__*/ (function (PreloadFile) {
  function NoSyncFile(_fs, _path, _flag, _stat, contents) {
    PreloadFile.call(this, _fs, _path, _flag, _stat, contents);
  }

  if (PreloadFile) NoSyncFile.__proto__ = PreloadFile;
  NoSyncFile.prototype = Object.create(PreloadFile && PreloadFile.prototype);
  NoSyncFile.prototype.constructor = NoSyncFile;
  /**
   * Asynchronous sync. Doesn't do anything, simply calls the cb.
   * @param [Function(BrowserFS.ApiError)] cb
   */
  NoSyncFile.prototype.sync = function sync(cb) {
    cb();
  };
  /**
   * Synchronous sync. Doesn't do anything.
   */
  NoSyncFile.prototype.syncSync = function syncSync() {
    // NOP.
  };
  /**
   * Asynchronous close. Doesn't do anything, simply calls the cb.
   * @param [Function(BrowserFS.ApiError)] cb
   */
  NoSyncFile.prototype.close = function close(cb) {
    cb();
  };
  /**
   * Synchronous close. Doesn't do anything.
   */
  NoSyncFile.prototype.closeSync = function closeSync() {
    // NOP.
  };

  return NoSyncFile;
})(PreloadFile);

/**
 * We define our own file to interpose on syncSync() for mirroring purposes.
 */
var MirrorFile = /*@__PURE__*/ (function (PreloadFile) {
  function MirrorFile(fs, path, flag, stat, data) {
    PreloadFile.call(this, fs, path, flag, stat, data);
  }

  if (PreloadFile) MirrorFile.__proto__ = PreloadFile;
  MirrorFile.prototype = Object.create(PreloadFile && PreloadFile.prototype);
  MirrorFile.prototype.constructor = MirrorFile;
  MirrorFile.prototype.syncSync = function syncSync() {
    if (this.isDirty()) {
      this._fs._syncSync(this);
      this.resetDirty();
    }
  };
  MirrorFile.prototype.closeSync = function closeSync() {
    this.syncSync();
  };

  return MirrorFile;
})(PreloadFile);
/**
 * AsyncMirrorFS mirrors a synchronous filesystem into an asynchronous filesystem
 * by:
 *
 * * Performing operations over the in-memory copy, while asynchronously pipelining them
 *   to the backing store.
 * * During application loading, the contents of the async file system can be reloaded into
 *   the synchronous store, if desired.
 *
 * The two stores will be kept in sync. The most common use-case is to pair a synchronous
 * in-memory filesystem with an asynchronous backing store.
 *
 * Example: Mirroring an IndexedDB file system to an in memory file system. Now, you can use
 * IndexedDB synchronously.
 *
 * ```javascript
 * BrowserFS.configure({
 *   fs: "AsyncMirror",
 *   options: {
 *     sync: { fs: "InMemory" },
 *     async: { fs: "IndexedDB" }
 *   }
 * }, function(e) {
 *   // BrowserFS is initialized and ready-to-use!
 * });
 * ```
 *
 * Or, alternatively:
 *
 * ```javascript
 * BrowserFS.FileSystem.IndexedDB.Create(function(e, idbfs) {
 *   BrowserFS.FileSystem.InMemory.Create(function(e, inMemory) {
 *     BrowserFS.FileSystem.AsyncMirror({
 *       sync: inMemory, async: idbfs
 *     }, function(e, mirrored) {
 *       BrowserFS.initialize(mirrored);
 *     });
 *   });
 * });
 * ```
 */
var AsyncMirror = /*@__PURE__*/ (function (SynchronousFileSystem) {
  function AsyncMirror(sync, async) {
    SynchronousFileSystem.call(this);
    /**
     * Queue of pending asynchronous operations.
     */
    this._queue = [];
    this._queueRunning = false;
    this._isInitialized = false;
    this._initializeCallbacks = [];
    this._sync = sync;
    this._async = async;
  }

  if (SynchronousFileSystem) AsyncMirror.__proto__ = SynchronousFileSystem;
  AsyncMirror.prototype = Object.create(
    SynchronousFileSystem && SynchronousFileSystem.prototype
  );
  AsyncMirror.prototype.constructor = AsyncMirror;
  /**
   * Constructs and initializes an AsyncMirror file system with the given options.
   */
  AsyncMirror.Create = function Create(opts, cb) {
    try {
      var fs = new AsyncMirror(opts.sync, opts.async);
      fs._initialize(function (e) {
        if (e) {
          cb(e);
        } else {
          cb(null, fs);
        }
      });
    } catch (e) {
      cb(e);
    }
  };
  AsyncMirror.isAvailable = function isAvailable() {
    return true;
  };
  AsyncMirror.prototype.getName = function getName() {
    return AsyncMirror.Name;
  };
  AsyncMirror.prototype._syncSync = function _syncSync(fd) {
    this._sync.writeFileSync(
      fd.getPath(),
      fd.getBuffer(),
      null,
      FileFlag.getFileFlag('w'),
      fd.getStats().mode
    );
    this.enqueueOp({
      apiMethod: 'writeFile',
      arguments: [
        fd.getPath(),
        fd.getBuffer(),
        null,
        fd.getFlag(),
        fd.getStats().mode,
      ],
    });
  };
  AsyncMirror.prototype.isReadOnly = function isReadOnly() {
    return false;
  };
  AsyncMirror.prototype.supportsSynch = function supportsSynch() {
    return true;
  };
  AsyncMirror.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  AsyncMirror.prototype.supportsProps = function supportsProps() {
    return this._sync.supportsProps() && this._async.supportsProps();
  };
  AsyncMirror.prototype.renameSync = function renameSync(oldPath, newPath) {
    this._sync.renameSync(oldPath, newPath);
    this.enqueueOp({
      apiMethod: 'rename',
      arguments: [oldPath, newPath],
    });
  };
  AsyncMirror.prototype.statSync = function statSync(p, isLstat) {
    return this._sync.statSync(p, isLstat);
  };
  AsyncMirror.prototype.openSync = function openSync(p, flag, mode) {
    // Sanity check: Is this open/close permitted?
    var fd = this._sync.openSync(p, flag, mode);
    fd.closeSync();
    return new MirrorFile(
      this,
      p,
      flag,
      this._sync.statSync(p, false),
      this._sync.readFileSync(p, null, FileFlag.getFileFlag('r'))
    );
  };
  AsyncMirror.prototype.unlinkSync = function unlinkSync(p) {
    this._sync.unlinkSync(p);
    this.enqueueOp({
      apiMethod: 'unlink',
      arguments: [p],
    });
  };
  AsyncMirror.prototype.rmdirSync = function rmdirSync(p) {
    this._sync.rmdirSync(p);
    this.enqueueOp({
      apiMethod: 'rmdir',
      arguments: [p],
    });
  };
  AsyncMirror.prototype.mkdirSync = function mkdirSync(p, mode) {
    this._sync.mkdirSync(p, mode);
    this.enqueueOp({
      apiMethod: 'mkdir',
      arguments: [p, mode],
    });
  };
  AsyncMirror.prototype.readdirSync = function readdirSync(p) {
    return this._sync.readdirSync(p);
  };
  AsyncMirror.prototype.existsSync = function existsSync(p) {
    return this._sync.existsSync(p);
  };
  AsyncMirror.prototype.chmodSync = function chmodSync(p, isLchmod, mode) {
    this._sync.chmodSync(p, isLchmod, mode);
    this.enqueueOp({
      apiMethod: 'chmod',
      arguments: [p, isLchmod, mode],
    });
  };
  AsyncMirror.prototype.chownSync = function chownSync(p, isLchown, uid, gid) {
    this._sync.chownSync(p, isLchown, uid, gid);
    this.enqueueOp({
      apiMethod: 'chown',
      arguments: [p, isLchown, uid, gid],
    });
  };
  AsyncMirror.prototype.utimesSync = function utimesSync(p, atime, mtime) {
    this._sync.utimesSync(p, atime, mtime);
    this.enqueueOp({
      apiMethod: 'utimes',
      arguments: [p, atime, mtime],
    });
  };
  /**
   * Called once to load up files from async storage into sync storage.
   */
  AsyncMirror.prototype._initialize = function _initialize(userCb) {
    var this$1 = this;

    var callbacks = this._initializeCallbacks;
    var end = function (e) {
      this$1._isInitialized = !e;
      this$1._initializeCallbacks = [];
      callbacks.forEach(function (cb) {
        return cb(e);
      });
    };
    if (!this._isInitialized) {
      // First call triggers initialization, the rest wait.
      if (callbacks.push(userCb) === 1) {
        var copyDirectory = function (p, mode, cb) {
            if (p !== '/') {
              this$1._sync.mkdirSync(p, mode);
            }
            this$1._async.readdir(p, function (err, files) {
              var i = 0;
              // NOTE: This function must not be in a lexically nested statement,
              // such as an if or while statement. Safari refuses to run the
              // script since it is undefined behavior.
              function copyNextFile(err) {
                if (err) {
                  cb(err);
                } else if (i < files.length) {
                  copyItem(path.join(p, files[i]), copyNextFile);
                  i++;
                } else {
                  cb();
                }
              }
              if (err) {
                cb(err);
              } else {
                copyNextFile();
              }
            });
          },
          copyFile = function (p, mode, cb) {
            this$1._async.readFile(
              p,
              null,
              FileFlag.getFileFlag('r'),
              function (err, data) {
                if (err) {
                  cb(err);
                } else {
                  try {
                    this$1._sync.writeFileSync(
                      p,
                      data,
                      null,
                      FileFlag.getFileFlag('w'),
                      mode
                    );
                  } catch (e) {
                    err = e;
                  } finally {
                    cb(err);
                  }
                }
              }
            );
          },
          copyItem = function (p, cb) {
            this$1._async.stat(p, false, function (err, stats) {
              if (err) {
                cb(err);
              } else if (stats.isDirectory()) {
                copyDirectory(p, stats.mode, cb);
              } else {
                copyFile(p, stats.mode, cb);
              }
            });
          };
        copyDirectory('/', 0, end);
      }
    } else {
      userCb();
    }
  };
  AsyncMirror.prototype.enqueueOp = function enqueueOp(op) {
    var this$1 = this;

    this._queue.push(op);
    if (!this._queueRunning) {
      this._queueRunning = true;
      var doNextOp = function (err) {
        if (err) {
          throw new Error(
            'WARNING: File system has desynchronized. Received following error: ' +
              err +
              '\n$'
          );
        }
        if (this$1._queue.length > 0) {
          var op = this$1._queue.shift(),
            args = op.arguments;
          args.push(doNextOp);
          this$1._async[op.apiMethod].apply(this$1._async, args);
        } else {
          this$1._queueRunning = false;
        }
      };
      doNextOp();
    }
  };

  return AsyncMirror;
})(SynchronousFileSystem);
AsyncMirror.Name = 'AsyncMirror';
AsyncMirror.Options = {
  sync: {
    type: 'object',
    description:
      'The synchronous file system to mirror the asynchronous file system to.',
    validator: function (v, cb) {
      if (v && typeof v['supportsSynch'] === 'function' && v.supportsSynch()) {
        cb();
      } else {
        cb(
          new ApiError(
            ErrorCode.EINVAL,
            "'sync' option must be a file system that supports synchronous operations"
          )
        );
      }
    },
  },
  async: {
    type: 'object',
    description: 'The asynchronous file system to mirror.',
  },
};

/**
 * Contains utility methods for performing a variety of tasks with
 * XmlHttpRequest across browsers.
 */
var xhrIsAvailable =
  typeof XMLHttpRequest !== 'undefined' && XMLHttpRequest !== null;

function asyncDownloadFileModern(p, type, cb) {
  var req = new XMLHttpRequest();
  req.open('GET', p, true);
  var jsonSupported = true;
  switch (type) {
    case 'buffer':
      req.responseType = 'arraybuffer';
      break;
    case 'json':
      // Some browsers don't support the JSON response type.
      // They either reset responseType, or throw an exception.
      // @see https://github.com/Modernizr/Modernizr/blob/master/src/testXhrType.js
      try {
        req.responseType = 'json';
        jsonSupported = req.responseType === 'json';
      } catch (e) {
        jsonSupported = false;
      }
      break;
    default:
      return cb(
        new ApiError(ErrorCode.EINVAL, 'Invalid download type: ' + type)
      );
  }
  req.onreadystatechange = function (e) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        switch (type) {
          case 'buffer':
            // XXX: WebKit-based browsers return *null* when XHRing an empty file.
            return cb(
              null,
              req.response ? Buffer.from(req.response) : emptyBuffer()
            );
          case 'json':
            if (jsonSupported) {
              return cb(null, req.response);
            } else {
              return cb(null, JSON.parse(req.responseText));
            }
        }
      } else {
        return cb(
          new ApiError(
            ErrorCode.EIO,
            'XHR error: response returned code ' + req.status
          )
        );
      }
    }
  };
  req.send();
}

function syncDownloadFileModern(p, type) {
  var req = new XMLHttpRequest();
  req.open('GET', p, false);
  // On most platforms, we cannot set the responseType of synchronous downloads.
  // @todo Test for this; IE10 allows this, as do older versions of Chrome/FF.
  var data = null;
  var err = null;
  // Classic hack to download binary data as a string.
  req.overrideMimeType('text/plain; charset=x-user-defined');
  req.onreadystatechange = function (e) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        switch (type) {
          case 'buffer':
            // Convert the text into a buffer.
            var text = req.responseText;
            data = Buffer.alloc(text.length);
            // Throw away the upper bits of each character.
            for (var i = 0; i < text.length; i++) {
              // This will automatically throw away the upper bit of each
              // character for us.
              data[i] = text.charCodeAt(i);
            }
            return;
          case 'json':
            data = JSON.parse(req.responseText);
            return;
        }
      } else {
        err = new ApiError(
          ErrorCode.EIO,
          'XHR error: response returned code ' + req.status
        );
        return;
      }
    }
  };
  req.send();
  if (err) {
    throw err;
  }
  return data;
}

function syncDownloadFileIE10(p, type) {
  var req = new XMLHttpRequest();
  req.open('GET', p, false);
  switch (type) {
    case 'buffer':
      req.responseType = 'arraybuffer';
      break;
    case 'json':
      // IE10 does not support the JSON type.
      break;
    default:
      throw new ApiError(ErrorCode.EINVAL, 'Invalid download type: ' + type);
  }
  var data;
  var err;
  req.onreadystatechange = function (e) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        switch (type) {
          case 'buffer':
            data = Buffer.from(req.response);
            break;
          case 'json':
            data = JSON.parse(req.response);
            break;
        }
      } else {
        err = new ApiError(
          ErrorCode.EIO,
          'XHR error: response returned code ' + req.status
        );
      }
    }
  };
  req.send();
  if (err) {
    throw err;
  }
  return data;
}
/**
 * @hidden
 */
function getFileSize(async, p, cb) {
  var req = new XMLHttpRequest();
  req.open('HEAD', p, async);
  req.onreadystatechange = function (e) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        try {
          return cb(
            null,
            parseInt(req.getResponseHeader('Content-Length') || '-1', 10)
          );
        } catch (e) {
          // In the event that the header isn't present or there is an error...
          return cb(
            new ApiError(
              ErrorCode.EIO,
              'XHR HEAD error: Could not read content-length.'
            )
          );
        }
      } else {
        return cb(
          new ApiError(
            ErrorCode.EIO,
            'XHR HEAD error: response returned code ' + req.status
          )
        );
      }
    }
  };
  req.send();
}
/**
 * Asynchronously download a file as a buffer or a JSON object.
 * Note that the third function signature with a non-specialized type is
 * invalid, but TypeScript requires it when you specialize string arguments to
 * constants.
 * @hidden
 */
var asyncDownloadFile = asyncDownloadFileModern;
/**
 * Synchronously download a file as a buffer or a JSON object.
 * Note that the third function signature with a non-specialized type is
 * invalid, but TypeScript requires it when you specialize string arguments to
 * constants.
 * @hidden
 */
var syncDownloadFile =
  isIE && typeof Blob !== 'undefined'
    ? syncDownloadFileIE10
    : syncDownloadFileModern;
/**
 * Synchronously retrieves the size of the given file in bytes.
 * @hidden
 */
function getFileSizeSync(p) {
  var rv = -1;
  getFileSize(false, p, function (err, size) {
    if (err) {
      throw err;
    }
    rv = size;
  });
  return rv;
}
/**
 * Asynchronously retrieves the size of the given file in bytes.
 * @hidden
 */
function getFileSizeAsync(p, cb) {
  getFileSize(true, p, cb);
}

/**
 * Contains utility methods using 'fetch'.
 */
var fetchIsAvailable = typeof fetch !== 'undefined' && fetch !== null;

function fetchFileAsync(p, type, cb) {
  var request;
  try {
    request = fetch(p);
  } catch (e) {
    // XXX: fetch will throw a TypeError if the URL has credentials in it
    return cb(new ApiError(ErrorCode.EINVAL, e.message));
  }
  request
    .then(function (res) {
      if (!res.ok) {
        return cb(
          new ApiError(
            ErrorCode.EIO,
            'fetch error: response returned code ' + res.status
          )
        );
      } else {
        switch (type) {
          case 'buffer':
            res
              .arrayBuffer()
              .then(function (buf) {
                return cb(null, Buffer.from(buf));
              })
              .catch(function (err) {
                return cb(new ApiError(ErrorCode.EIO, err.message));
              });
            break;
          case 'json':
            res
              .json()
              .then(function (json) {
                return cb(null, json);
              })
              .catch(function (err) {
                return cb(new ApiError(ErrorCode.EIO, err.message));
              });
            break;
          default:
            cb(
              new ApiError(ErrorCode.EINVAL, 'Invalid download type: ' + type)
            );
        }
      }
    })
    .catch(function (err) {
      return cb(new ApiError(ErrorCode.EIO, err.message));
    });
}
/**
 * Asynchronously retrieves the size of the given file in bytes.
 * @hidden
 */
function fetchFileSizeAsync(p, cb) {
  fetch(p, {
    method: 'HEAD',
  })
    .then(function (res) {
      if (!res.ok) {
        return cb(
          new ApiError(
            ErrorCode.EIO,
            'fetch HEAD error: response returned code ' + res.status
          )
        );
      } else {
        return cb(
          null,
          parseInt(res.headers.get('Content-Length') || '-1', 10)
        );
      }
    })
    .catch(function (err) {
      return cb(new ApiError(ErrorCode.EIO, err.message));
    });
}

/**
 * A simple class for storing a filesystem index. Assumes that all paths passed
 * to it are *absolute* paths.
 *
 * Can be used as a partial or a full index, although care must be taken if used
 * for the former purpose, especially when directories are concerned.
 */
var FileIndex = function FileIndex() {
  // _index is a single-level key,value store that maps *directory* paths to
  // DirInodes. File information is only contained in DirInodes themselves.
  this._index = {};
  // Create the root directory.
  this.addPath('/', new DirInode());
};
/**
 * Static method for constructing indices from a JSON listing.
 * @param listing Directory listing generated by tools/XHRIndexer.coffee
 * @return A new FileIndex object.
 */
FileIndex.fromListing = function fromListing(listing) {
  var idx = new FileIndex();
  // Add a root DirNode.
  var rootInode = new DirInode();
  idx._index['/'] = rootInode;
  var queue = [['', listing, rootInode]];
  while (queue.length > 0) {
    var inode = void 0;
    var next = queue.pop();
    var pwd = next[0];
    var tree = next[1];
    var parent = next[2];
    for (var node in tree) {
      if (tree.hasOwnProperty(node)) {
        var children = tree[node];
        var name = pwd + '/' + node;
        if (children) {
          idx._index[name] = inode = new DirInode();
          queue.push([name, children, inode]);
        } else {
          // This inode doesn't have correct size information, noted with -1.
          inode = new FileInode(new Stats(FileType.FILE, -1, 0x16d));
        }
        if (parent) {
          parent._ls[node] = inode;
        }
      }
    }
  }
  return idx;
};
FileIndex.fromUnpkg = function fromUnpkg(listing) {
  var idx = new FileIndex();

  function handleDir(dirPath, entry) {
    var dirInode = new DirInode();
    entry.files.forEach(function (child) {
      var inode;
      if (child.type === 'file') {
        inode = new FileInode(new Stats(FileType.FILE, child.size));
        // @ts-ignore
        dirInode._ls[path.basename(child.path)] = inode;
      } else {
        idx._index[child.path] = inode = handleDir(child.path, child);
      }
    });
    return dirInode;
  }
  idx._index['/'] = handleDir('/', listing);
  return idx;
};
FileIndex.fromJSDelivr = function fromJSDelivr(listing) {
  var idx = new FileIndex();
  listing.files.forEach(function (file) {
    var inode = new FileInode(new Stats(FileType.FILE, file.size));
    idx.addPathFast(file.name, inode);
  });
  return idx;
};
/**
 * Runs the given function over all files in the index.
 */
FileIndex.prototype.fileIterator = function fileIterator(cb) {
  for (var path in this._index) {
    if (this._index.hasOwnProperty(path)) {
      var dir = this._index[path];
      var files = dir.getListing();
      for (var i = 0, list = files; i < list.length; i += 1) {
        var file = list[i];

        var item = dir.getItem(file);
        if (isFileInode(item)) {
          cb(item.getData(), path + '/' + file);
        }
      }
    }
  }
};
/**
 * Adds the given absolute path to the index if it is not already in the index.
 * Creates any needed parent directories.
 * @param path The path to add to the index.
 * @param inode The inode for the
 *   path to add.
 * @return 'True' if it was added or already exists, 'false' if there
 *   was an issue adding it (e.g. item in path is a file, item exists but is
 *   different).
 * @todo If adding fails and implicitly creates directories, we do not clean up
 *   the new empty directories.
 */
FileIndex.prototype.addPath = function addPath(path, inode) {
  if (!inode) {
    throw new Error('Inode must be specified');
  }
  if (path[0] !== '/') {
    throw new Error('Path must be absolute, got: ' + path);
  }
  // Check if it already exists.
  if (this._index.hasOwnProperty(path)) {
    return this._index[path] === inode;
  }
  var splitPath = this._split_path(path);
  var dirpath = splitPath[0];
  var itemname = splitPath[1];
  // Try to add to its parent directory first.
  var parent = this._index[dirpath];
  if (parent === undefined && path !== '/') {
    // Create parent.
    parent = new DirInode();
    if (!this.addPath(dirpath, parent)) {
      return false;
    }
  }
  // Add myself to my parent.
  if (path !== '/') {
    if (!parent.addItem(itemname, inode)) {
      return false;
    }
  }
  // If I'm a directory, add myself to the index.
  if (isDirInode(inode)) {
    this._index[path] = inode;
  }
  return true;
};
/**
 * Adds the given absolute path to the index if it is not already in the index.
 * The path is added without special treatment (no joining of adjacent separators, etc).
 * Creates any needed parent directories.
 * @param path The path to add to the index.
 * @param inode The inode for the
 *   path to add.
 * @return 'True' if it was added or already exists, 'false' if there
 *   was an issue adding it (e.g. item in path is a file, item exists but is
 *   different).
 * @todo If adding fails and implicitly creates directories, we do not clean up
 *   the new empty directories.
 */
FileIndex.prototype.addPathFast = function addPathFast(path, inode) {
  var itemNameMark = path.lastIndexOf('/');
  var parentPath = itemNameMark === 0 ? '/' : path.substring(0, itemNameMark);
  var itemName = path.substring(itemNameMark + 1);
  // Try to add to its parent directory first.
  var parent = this._index[parentPath];
  if (parent === undefined) {
    // Create parent.
    parent = new DirInode();
    this.addPathFast(parentPath, parent);
  }
  if (!parent.addItem(itemName, inode)) {
    return false;
  }
  // If adding a directory, add to the index as well.
  if (inode.isDir()) {
    this._index[path] = inode;
  }
  return true;
};
/**
 * Removes the given path. Can be a file or a directory.
 * @return The removed item,
 *   or null if it did not exist.
 */
FileIndex.prototype.removePath = function removePath(path) {
  var splitPath = this._split_path(path);
  var dirpath = splitPath[0];
  var itemname = splitPath[1];
  // Try to remove it from its parent directory first.
  var parent = this._index[dirpath];
  if (parent === undefined) {
    return null;
  }
  // Remove myself from my parent.
  var inode = parent.remItem(itemname);
  if (inode === null) {
    return null;
  }
  // If I'm a directory, remove myself from the index, and remove my children.
  if (isDirInode(inode)) {
    var children = inode.getListing();
    for (var i = 0, list = children; i < list.length; i += 1) {
      var child = list[i];

      this.removePath(path + '/' + child);
    }
    // Remove the directory from the index, unless it's the root.
    if (path !== '/') {
      delete this._index[path];
    }
  }
  return inode;
};
/**
 * Retrieves the directory listing of the given path.
 * @return An array of files in the given path, or 'null' if it does not exist.
 */
FileIndex.prototype.ls = function ls(path) {
  var item = this._index[path];
  if (item === undefined) {
    return null;
  }
  return item.getListing();
};
/**
 * Returns the inode of the given item.
 * @return Returns null if the item does not exist.
 */
FileIndex.prototype.getInode = function getInode(path) {
  var splitPath = this._split_path(path);
  var dirpath = splitPath[0];
  var itemname = splitPath[1];
  // Retrieve from its parent directory.
  var parent = this._index[dirpath];
  if (parent === undefined) {
    return null;
  }
  // Root case
  if (dirpath === path) {
    return parent;
  }
  return parent.getItem(itemname);
};
/**
 * Split into a (directory path, item name) pair
 */
FileIndex.prototype._split_path = function _split_path(p) {
  var dirpath = path.dirname(p);
  var itemname = p.substr(dirpath.length + (dirpath === '/' ? 0 : 1));
  return [dirpath, itemname];
};
/**
 * Inode for a file. Stores an arbitrary (filesystem-specific) data payload.
 */
var FileInode = function FileInode(data) {
  this.data = data;
};
FileInode.prototype.isFile = function isFile() {
  return true;
};
FileInode.prototype.isDir = function isDir() {
  return false;
};
FileInode.prototype.getData = function getData() {
  return this.data;
};
FileInode.prototype.setData = function setData(data) {
  this.data = data;
};
/**
 * Inode for a directory. Currently only contains the directory listing.
 */
var DirInode = function DirInode(data) {
  if (data === void 0) data = null;

  this.data = data;
  this._ls = {};
};
DirInode.prototype.isFile = function isFile() {
  return false;
};
DirInode.prototype.isDir = function isDir() {
  return true;
};
DirInode.prototype.getData = function getData() {
  return this.data;
};
/**
 * Return a Stats object for this inode.
 * @todo Should probably remove this at some point. This isn't the
 *   responsibility of the FileIndex.
 */
DirInode.prototype.getStats = function getStats() {
  return new Stats(FileType.DIRECTORY, 4096, 0x16d);
};
/**
 * Returns the directory listing for this directory. Paths in the directory are
 * relative to the directory's path.
 * @return The directory listing for this directory.
 */
DirInode.prototype.getListing = function getListing() {
  return Object.keys(this._ls);
};
/**
 * Returns the inode for the indicated item, or null if it does not exist.
 * @param p Name of item in this directory.
 */
DirInode.prototype.getItem = function getItem(p) {
  var item = this._ls[p];
  return item && this._ls.hasOwnProperty(p) ? item : null;
};
/**
 * Add the given item to the directory listing. Note that the given inode is
 * not copied, and will be mutated by the DirInode if it is a DirInode.
 * @param p Item name to add to the directory listing.
 * @param inode The inode for the
 *   item to add to the directory inode.
 * @return True if it was added, false if it already existed.
 */
DirInode.prototype.addItem = function addItem(p, inode) {
  if (p in this._ls) {
    return false;
  }
  this._ls[p] = inode;
  return true;
};
/**
 * Removes the given item from the directory listing.
 * @param p Name of item to remove from the directory listing.
 * @return Returns the item
 *   removed, or null if the item did not exist.
 */
DirInode.prototype.remItem = function remItem(p) {
  var item = this._ls[p];
  if (item === undefined) {
    return null;
  }
  delete this._ls[p];
  return item;
};
/**
 * @hidden
 */
function isFileInode(inode) {
  return !!inode && inode.isFile();
}
/**
 * @hidden
 */
function isDirInode(inode) {
  return !!inode && inode.isDir();
}

/**
 * Try to convert the given buffer into a string, and pass it to the callback.
 * Optimization that removes the needed try/catch into a helper function, as
 * this is an uncommon case.
 * @hidden
 */
function tryToString(buff, encoding, cb) {
  try {
    cb(null, buff.toString(encoding));
  } catch (e) {
    cb(e);
  }
}

function syncNotAvailableError() {
  throw new ApiError(
    ErrorCode.ENOTSUP,
    'Synchronous HTTP download methods are not available in this environment.'
  );
}
/**
 * A simple filesystem backed by HTTP downloads. You must create a directory listing using the
 * `make_http_index` tool provided by BrowserFS.
 *
 * If you install BrowserFS globally with `npm i -g browserfs`, you can generate a listing by
 * running `make_http_index` in your terminal in the directory you would like to index:
 *
 * ```
 * make_http_index > index.json
 * ```
 *
 * Listings objects look like the following:
 *
 * ```json
 * {
 *   "home": {
 *     "jvilk": {
 *       "someFile.txt": null,
 *       "someDir": {
 *         // Empty directory
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * *This example has the folder `/home/jvilk` with subfile `someFile.txt` and subfolder `someDir`.*
 */
var BundledHTTPRequest = /*@__PURE__*/ (function (BaseFileSystem) {
  function BundledHTTPRequest(index, bundle, prefixUrl, preferXHR, logReads) {
    if (bundle === void 0) bundle = {};
    if (prefixUrl === void 0) prefixUrl = '';
    if (preferXHR === void 0) preferXHR = false;
    if (logReads === void 0) logReads = false;

    BaseFileSystem.call(this);
    // prefix_url must end in a directory separator.
    if (
      prefixUrl.length > 0 &&
      prefixUrl.charAt(prefixUrl.length - 1) !== '/'
    ) {
      prefixUrl = prefixUrl + '/';
    }
    this.prefixUrl = prefixUrl;
    this._logReads = logReads;
    this._index = FileIndex.fromListing(index);
    this._index.fileIterator(function (file, path) {
      var bundleInfo = bundle[path];
      if (bundleInfo !== undefined) {
        if (typeof bundleInfo === 'number') {
          file.size = bundleInfo;
        } else if (!file.fileData) {
          var buffer = new Buffer(bundleInfo);
          file.size = buffer.length;
          file.fileData = buffer;
        }
      }
    });
    if (fetchIsAvailable && (!preferXHR || !xhrIsAvailable)) {
      this._requestFileAsyncInternal = fetchFileAsync;
      this._requestFileSizeAsyncInternal = fetchFileSizeAsync;
    } else {
      this._requestFileAsyncInternal = asyncDownloadFile;
      this._requestFileSizeAsyncInternal = getFileSizeAsync;
    }
    if (xhrIsAvailable) {
      this._requestFileSyncInternal = syncDownloadFile;
      this._requestFileSizeSyncInternal = getFileSizeSync;
    } else {
      this._requestFileSyncInternal = syncNotAvailableError;
      this._requestFileSizeSyncInternal = syncNotAvailableError;
    }
  }

  if (BaseFileSystem) BundledHTTPRequest.__proto__ = BaseFileSystem;
  BundledHTTPRequest.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  BundledHTTPRequest.prototype.constructor = BundledHTTPRequest;
  /**
   * Construct an HTTPRequest file system backend with the given options.
   */
  BundledHTTPRequest.Create = function Create(opts, cb) {
    if (opts.index === undefined) {
      opts.index = 'index.json';
    }
    if (typeof opts.index === 'string') {
      asyncDownloadFile(opts.index, 'json', function (e, data) {
        if (e) {
          cb(e);
        } else {
          if (typeof opts.bundle === 'string') {
            asyncDownloadFile(opts.bundle, 'json', function (e, bundleData) {
              if (e) {
                console.error("Couldn't preload bundle", e);
              }
              cb(
                null,
                new BundledHTTPRequest(
                  data,
                  bundleData || {},
                  opts.baseUrl,
                  opts.preferXHR,
                  opts.logReads
                )
              );
            });
          } else {
            cb(
              null,
              new BundledHTTPRequest(
                data,
                opts.bundle || {},
                opts.baseUrl,
                opts.preferXHR,
                opts.logReads
              )
            );
          }
        }
      });
    } else {
      var index = opts.index;
      if (typeof opts.bundle === 'string') {
        asyncDownloadFile(opts.bundle, 'json', function (e, bundleData) {
          if (e) {
            console.error("Couldn't preload bundle", e);
          }
          cb(
            null,
            new BundledHTTPRequest(
              index,
              bundleData || {},
              opts.baseUrl,
              opts.preferXHR,
              opts.logReads
            )
          );
        });
      } else {
        cb(
          null,
          new BundledHTTPRequest(
            index,
            opts.bundle || {},
            opts.baseUrl,
            opts.preferXHR,
            opts.logReads
          )
        );
      }
    }
  };
  BundledHTTPRequest.isAvailable = function isAvailable() {
    return xhrIsAvailable || fetchIsAvailable;
  };
  BundledHTTPRequest.prototype.empty = function empty() {
    this._index.fileIterator(function (file) {
      file.fileData = null;
    });
  };
  BundledHTTPRequest.prototype.getName = function getName() {
    return BundledHTTPRequest.Name;
  };
  BundledHTTPRequest.prototype.diskSpace = function diskSpace(path, cb) {
    // Read-only file system. We could calculate the total space, but that's not
    // important right now.
    cb(0, 0);
  };
  BundledHTTPRequest.prototype.isReadOnly = function isReadOnly() {
    return true;
  };
  BundledHTTPRequest.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  BundledHTTPRequest.prototype.supportsProps = function supportsProps() {
    return false;
  };
  BundledHTTPRequest.prototype.supportsSynch = function supportsSynch() {
    // Synchronous operations are only available via the XHR interface for now.
    return xhrIsAvailable;
  };
  BundledHTTPRequest.prototype.logRead = function logRead(path, content) {
    var ctx = self || global;
    ctx.fileReads = ctx.fileReads || {};
    if (!ctx.fileReads[path] || typeof ctx.fileReads[path] === 'number') {
      ctx.fileReads[path] = content;
    }
  };
  /**
   * Special HTTPFS function: Preload the given file into the index.
   * @param [String] path
   * @param [BrowserFS.Buffer] buffer
   */
  BundledHTTPRequest.prototype.preloadFile = function preloadFile(
    path,
    buffer
  ) {
    var inode = this._index.getInode(path);
    if (isFileInode(inode)) {
      if (inode === null) {
        throw ApiError.ENOENT(path);
      }
      var stats = inode.getData();
      stats.size = buffer.length;
      stats.fileData = buffer;
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  BundledHTTPRequest.prototype.stat = function stat(path, isLstat, cb) {
    var this$1 = this;

    var inode = this._index.getInode(path);
    if (inode === null) {
      return cb(ApiError.ENOENT(path));
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        this._requestFileSizeAsync(path, function (e, size) {
          if (e) {
            return cb(e);
          }
          if (this$1._logReads) {
            // Log the read
            this$1.logRead(path, size);
          }
          stats.size = size;
          cb(null, Stats.clone(stats));
        });
      } else {
        cb(null, Stats.clone(stats));
      }
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
      cb(null, stats);
    } else {
      cb(ApiError.FileError(ErrorCode.EINVAL, path));
    }
  };
  BundledHTTPRequest.prototype.statSync = function statSync(path, isLstat) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        var size = this._requestFileSizeSync(path);
        if (this._logReads) {
          // Log the read
          this.logRead(path, size);
        }
        stats.size = size;
      }
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
    } else {
      throw ApiError.FileError(ErrorCode.EINVAL, path);
    }
    return stats;
  };
  BundledHTTPRequest.prototype.open = function open(path, flags, mode, cb) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      return cb(new ApiError(ErrorCode.EPERM, path));
    }
    var self = this;
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (inode === null) {
      return cb(ApiError.ENOENT(path));
    }
    if (isFileInode(inode)) {
      var stats = inode.getData();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          return cb(ApiError.EEXIST(path));
        case ActionType.NOP:
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return cb(
              null,
              new NoSyncFile(
                self,
                path,
                flags,
                Stats.clone(stats),
                stats.fileData
              )
            );
          }
          // @todo be lazier about actually requesting the file
          this._requestFileAsync(path, 'buffer', function (err, buffer) {
            if (err) {
              return cb(err);
            }
            // we don't initially have file sizes
            stats.size = buffer.length;
            stats.fileData = buffer;
            return cb(
              null,
              new NoSyncFile(self, path, flags, Stats.clone(stats), buffer)
            );
          });
          break;
        default:
          return cb(new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.'));
      }
    } else {
      return cb(ApiError.EISDIR(path));
    }
  };
  BundledHTTPRequest.prototype.openSync = function openSync(path, flags, mode) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      throw new ApiError(ErrorCode.EPERM, path);
    }
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    if (isFileInode(inode)) {
      var stats = inode.getData();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          throw ApiError.EEXIST(path);
        case ActionType.NOP:
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return new NoSyncFile(
              this,
              path,
              flags,
              Stats.clone(stats),
              stats.fileData
            );
          }
          // @todo be lazier about actually requesting the file
          var buffer = this._requestFileSync(path, 'buffer');
          // we don't initially have file sizes
          stats.size = buffer.length;
          stats.fileData = buffer;
          return new NoSyncFile(this, path, flags, Stats.clone(stats), buffer);
        default:
          throw new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.');
      }
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  BundledHTTPRequest.prototype.readdir = function readdir(path, cb) {
    try {
      cb(null, this.readdirSync(path));
    } catch (e) {
      cb(e);
    }
  };
  BundledHTTPRequest.prototype.readdirSync = function readdirSync(path) {
    // Check if it exists.
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    } else if (isDirInode(inode)) {
      return inode.getListing();
    } else {
      throw ApiError.ENOTDIR(path);
    }
  };
  /**
   * We have the entire file as a buffer; optimize readFile.
   */
  BundledHTTPRequest.prototype.readFile = function readFile(
    fname,
    encoding,
    flag,
    cb
  ) {
    var this$1 = this;

    // Wrap cb in file closing code.
    var oldCb = cb;
    // Get file.
    this.open(fname, flag, 0x1a4, function (err, fd) {
      if (err) {
        return cb(err);
      }
      cb = function (err, arg) {
        fd.close(function (err2) {
          if (!err) {
            err = err2;
          }
          return oldCb(err, arg);
        });
      };
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (this$1._logReads) {
        // Log the read
        this$1.logRead(fname, fdBuff.toString());
      }
      if (encoding === null) {
        cb(err, copyingSlice(fdBuff));
      } else {
        tryToString(fdBuff, encoding, cb);
      }
    });
  };
  /**
   * Specially-optimized readfile.
   */
  BundledHTTPRequest.prototype.readFileSync = function readFileSync(
    fname,
    encoding,
    flag
  ) {
    // Get file.
    var fd = this.openSync(fname, flag, 0x1a4);
    try {
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (this._logReads) {
        // Log the read
        this.logRead(fname, fdBuff.toString());
      }
      if (encoding === null) {
        return copyingSlice(fdBuff);
      }
      return fdBuff.toString(encoding);
    } finally {
      fd.closeSync();
    }
  };
  BundledHTTPRequest.prototype._getHTTPPath = function _getHTTPPath(filePath) {
    if (filePath.charAt(0) === '/') {
      filePath = filePath.slice(1);
    }
    return this.prefixUrl + filePath;
  };
  BundledHTTPRequest.prototype._requestFileAsync = function _requestFileAsync(
    p,
    type,
    cb
  ) {
    this._requestFileAsyncInternal(this._getHTTPPath(p), type, cb);
  };
  BundledHTTPRequest.prototype._requestFileSync = function _requestFileSync(
    p,
    type
  ) {
    return this._requestFileSyncInternal(this._getHTTPPath(p), type);
  };
  /**
   * Only requests the HEAD content, for the file size.
   */
  BundledHTTPRequest.prototype._requestFileSizeAsync =
    function _requestFileSizeAsync(path, cb) {
      this._requestFileSizeAsyncInternal(this._getHTTPPath(path), cb);
    };
  BundledHTTPRequest.prototype._requestFileSizeSync =
    function _requestFileSizeSync(path) {
      return this._requestFileSizeSyncInternal(this._getHTTPPath(path));
    };

  return BundledHTTPRequest;
})(BaseFileSystem);
BundledHTTPRequest.Name = 'BundledHTTPRequest';
BundledHTTPRequest.Options = {
  index: {
    type: ['string', 'object'],
    optional: true,
    description:
      'URL to a file index as a JSON file or the file index object itself, generated with the make_http_index script. Defaults to `index.json`.',
  },
  bundle: {
    type: ['string', 'object'],
    optional: true,
    description: 'URL to a JSON file with the files preloaded.',
  },
  baseUrl: {
    type: 'string',
    optional: true,
    description:
      'Used as the URL prefix for fetched files. Default: Fetch files relative to the index.',
  },
  preferXHR: {
    type: 'boolean',
    optional: true,
    description:
      'Whether to prefer XmlHttpRequest or fetch for async operations if both are available. Default: false',
  },
  logReads: {
    type: 'boolean',
    optional: true,
    description:
      "Whether to log all reads of files and put them in an object, this is useful for getting initial bundles that you can put in 'bundle' option. Values are put on `global.readFiles`. Default: false.",
  },
};

function blobToBuffer(blob, cb) {
  if (typeof Blob === 'undefined' || !(blob instanceof Blob)) {
    throw new Error('first argument must be a Blob');
  }
  if (typeof cb !== 'function') {
    throw new Error('second argument must be a function');
  }
  var reader = new FileReader();

  function onLoadEnd(e) {
    reader.removeEventListener('loadend', onLoadEnd, false);
    if (e.error) {
      cb(e.error);
    } else {
      // @ts-ignore
      cb(null, Buffer.from(reader.result));
    }
  }
  reader.addEventListener('loadend', onLoadEnd, false);
  reader.readAsArrayBuffer(blob);
}

function getCode(savedCode, code) {
  if (savedCode === null) {
    return code || '';
  }
  return savedCode || '';
}
var CodeSandboxFile = /*@__PURE__*/ (function (PreloadFile) {
  function CodeSandboxFile(_fs, _path, _flag, _stat, contents) {
    PreloadFile.call(this, _fs, _path, _flag, _stat, contents);
  }

  if (PreloadFile) CodeSandboxFile.__proto__ = PreloadFile;
  CodeSandboxFile.prototype = Object.create(
    PreloadFile && PreloadFile.prototype
  );
  CodeSandboxFile.prototype.constructor = CodeSandboxFile;
  CodeSandboxFile.prototype.sync = function sync(cb) {
    var this$1 = this;

    if (this.isDirty()) {
      var buffer = this.getBuffer();
      this._fs._sync(this.getPath(), buffer, function (e, stat) {
        if (!e) {
          this$1.resetDirty();
        }
        cb(e);
      });
    } else {
      cb();
    }
  };
  CodeSandboxFile.prototype.close = function close(cb) {
    this.sync(cb);
  };
  CodeSandboxFile.prototype.syncSync = function syncSync() {
    if (this.isDirty()) {
      this._fs._syncSync(this.getPath(), this.getBuffer());
      this.resetDirty();
    }
  };
  CodeSandboxFile.prototype.closeSync = function closeSync() {
    this.syncSync();
  };

  return CodeSandboxFile;
})(PreloadFile);
var CodeSandboxEditorFS = /*@__PURE__*/ (function (SynchronousFileSystem) {
  function CodeSandboxEditorFS(api) {
    SynchronousFileSystem.call(this);
    this.api = api;
  }

  if (SynchronousFileSystem)
    CodeSandboxEditorFS.__proto__ = SynchronousFileSystem;
  CodeSandboxEditorFS.prototype = Object.create(
    SynchronousFileSystem && SynchronousFileSystem.prototype
  );
  CodeSandboxEditorFS.prototype.constructor = CodeSandboxEditorFS;
  /**
   * Creates an InMemoryFileSystem instance.
   */
  CodeSandboxEditorFS.Create = function Create(options, cb) {
    cb(null, new CodeSandboxEditorFS(options.api));
  };
  CodeSandboxEditorFS.isAvailable = function isAvailable() {
    return true;
  };
  CodeSandboxEditorFS.prototype.getName = function getName() {
    return 'CodeSandboxEditorFS';
  };
  CodeSandboxEditorFS.prototype.isReadOnly = function isReadOnly() {
    return false;
  };
  CodeSandboxEditorFS.prototype.supportsProps = function supportsProps() {
    return false;
  };
  CodeSandboxEditorFS.prototype.supportsSynch = function supportsSynch() {
    return true;
  };
  CodeSandboxEditorFS.prototype.empty = function empty(mainCb) {
    throw new Error('Empty not supported');
  };
  CodeSandboxEditorFS.prototype.renameSync = function renameSync(
    oldPath,
    newPath
  ) {
    throw new Error('Rename not supported');
  };
  CodeSandboxEditorFS.prototype.statSync = function statSync(p, isLstate) {
    var modules = this.api.getSandboxFs();
    var moduleInfo = modules[p];
    if (!moduleInfo) {
      var modulesStartingWithPath = Object.keys(modules).filter(function (pa) {
        return pa.startsWith(p.endsWith('/') ? p : p + '/') || pa === p;
      });
      if (modulesStartingWithPath.length > 0) {
        return new Stats(FileType.DIRECTORY, 0);
      } else {
        throw ApiError.FileError(ErrorCode.ENOENT, p);
      }
    }
    if (moduleInfo.type === 'directory') {
      return new Stats(
        FileType.DIRECTORY,
        4096,
        undefined,
        +new Date(),
        +new Date(moduleInfo.updatedAt),
        +new Date(moduleInfo.insertedAt)
      );
    } else {
      return new Stats(
        FileType.FILE,
        getCode(moduleInfo.savedCode, moduleInfo.code).length,
        undefined,
        +new Date(),
        +new Date(moduleInfo.updatedAt),
        +new Date(moduleInfo.insertedAt)
      );
    }
  };
  CodeSandboxEditorFS.prototype.createFileSync = function createFileSync(
    p,
    flag,
    mode
  ) {
    throw new Error('Create file not supported');
  };
  CodeSandboxEditorFS.prototype.open = function open(p, flag, mode, cb) {
    var this$1 = this;

    var moduleInfo = this.api.getSandboxFs()[p];
    if (!moduleInfo) {
      cb(ApiError.ENOENT(p));
      return;
    }
    if (moduleInfo.type === 'directory') {
      var stats = new Stats(
        FileType.DIRECTORY,
        4096,
        undefined,
        +new Date(),
        +new Date(moduleInfo.updatedAt),
        +new Date(moduleInfo.insertedAt)
      );
      cb(null, new CodeSandboxFile(this, p, flag, stats));
    } else {
      var isBinary = moduleInfo.isBinary;
      var savedCode = moduleInfo.savedCode;
      var code = moduleInfo.code;
      if (isBinary) {
        var url = getCode(savedCode, code);
        var jwt = this.api.getJwt && this.api.getJwt();
        var sendAuth = jwt && new URL(url).origin === document.location.origin;
        var headers = sendAuth
          ? {
              Authorization: 'Bearer ' + (this.api.getJwt && this.api.getJwt()),
            }
          : {};
        fetch(url, {
          headers: headers,
        })
          .then(function (x) {
            return x.blob();
          })
          .then(function (blob) {
            var stats = new Stats(
              FileType.FILE,
              blob.size,
              undefined,
              +new Date(),
              +new Date(moduleInfo.updatedAt),
              +new Date(moduleInfo.insertedAt)
            );
            blobToBuffer(blob, function (err, r) {
              if (err) {
                cb(err);
                return;
              }
              cb(undefined, new CodeSandboxFile(this$1, p, flag, stats, r));
            });
          });
        return;
      }
      var buffer = Buffer.from(getCode(savedCode, code));
      var stats$1 = new Stats(
        FileType.FILE,
        buffer.length,
        undefined,
        +new Date(),
        +new Date(moduleInfo.updatedAt),
        +new Date(moduleInfo.insertedAt)
      );
      cb(null, new CodeSandboxFile(this, p, flag, stats$1, buffer));
    }
  };
  CodeSandboxEditorFS.prototype.openFileSync = function openFileSync(
    p,
    flag,
    mode
  ) {
    var moduleInfo = this.api.getSandboxFs()[p];
    if (!moduleInfo) {
      throw ApiError.ENOENT(p);
    }
    if (moduleInfo.type === 'directory') {
      var stats = new Stats(
        FileType.DIRECTORY,
        4096,
        undefined,
        +new Date(),
        +new Date(moduleInfo.updatedAt),
        +new Date(moduleInfo.insertedAt)
      );
      return new CodeSandboxFile(this, p, flag, stats);
    } else {
      var savedCode = moduleInfo.savedCode;
      var code = moduleInfo.code;
      var buffer = Buffer.from(getCode(savedCode, code));
      var stats$1 = new Stats(
        FileType.FILE,
        buffer.length,
        undefined,
        +new Date(),
        +new Date(moduleInfo.updatedAt),
        +new Date(moduleInfo.insertedAt)
      );
      return new CodeSandboxFile(this, p, flag, stats$1, buffer);
    }
  };
  CodeSandboxEditorFS.prototype.writeFileSync = function writeFileSync() {
    // Stubbed
  };
  CodeSandboxEditorFS.prototype.rmdirSync = function rmdirSync(p) {
    // Stubbed
  };
  CodeSandboxEditorFS.prototype.mkdirSync = function mkdirSync(p) {
    // Stubbed
  };
  CodeSandboxEditorFS.prototype.unlinkSync = function unlinkSync(p) {
    // Stubbed
  };
  CodeSandboxEditorFS.prototype.readdirSync = function readdirSync(path) {
    var paths = Object.keys(this.api.getSandboxFs());
    var p = path.endsWith('/') ? path : path + '/';
    var pathsInDir = paths.filter(function (secondP) {
      return secondP.startsWith(p);
    });
    if (pathsInDir.length === 0) {
      return [];
    }
    var directChildren = new Set();
    var currentPathLength = p.split('/').length;
    pathsInDir
      .filter(function (np) {
        return np.split('/').length >= currentPathLength;
      })
      .forEach(function (np) {
        var parts = np.split('/');
        parts.length = currentPathLength;
        directChildren.add(parts.join('/'));
      });
    var pathArray = Array.from(directChildren).map(function (pa) {
      return pa.replace(p, '');
    });
    return pathArray;
  };
  CodeSandboxEditorFS.prototype._sync = function _sync(p, data, cb) {
    // Stubbed
    cb(null, undefined);
  };
  CodeSandboxEditorFS.prototype._syncSync = function _syncSync(p, data) {
    // Stubbed
  };

  return CodeSandboxEditorFS;
})(SynchronousFileSystem);
CodeSandboxEditorFS.Name = 'CodeSandboxEditorFS';
CodeSandboxEditorFS.Options = {
  api: {
    type: 'object',
    description: 'The CodeSandbox Editor',
    validator: function (opt, cb) {
      if (opt) {
        cb();
      } else {
        cb(new ApiError(ErrorCode.EINVAL, 'Manager is invalid'));
      }
    },
  },
};

var CodeSandboxFile$1 = /*@__PURE__*/ (function (PreloadFile) {
  function CodeSandboxFile(_fs, _path, _flag, _stat, contents) {
    PreloadFile.call(this, _fs, _path, _flag, _stat, contents);
  }

  if (PreloadFile) CodeSandboxFile.__proto__ = PreloadFile;
  CodeSandboxFile.prototype = Object.create(
    PreloadFile && PreloadFile.prototype
  );
  CodeSandboxFile.prototype.constructor = CodeSandboxFile;
  CodeSandboxFile.prototype.sync = function sync(cb) {
    var this$1 = this;

    if (this.isDirty()) {
      var buffer = this.getBuffer();
      this._fs._sync(this.getPath(), buffer, function (e, stat) {
        if (!e) {
          this$1.resetDirty();
        }
        cb(e);
      });
    } else {
      cb();
    }
  };
  CodeSandboxFile.prototype.close = function close(cb) {
    this.sync(cb);
  };
  CodeSandboxFile.prototype.syncSync = function syncSync() {
    if (this.isDirty()) {
      this._fs._syncSync(this.getPath(), this.getBuffer());
      this.resetDirty();
    }
  };
  CodeSandboxFile.prototype.closeSync = function closeSync() {
    this.syncSync();
  };

  return CodeSandboxFile;
})(PreloadFile);
var CodeSandboxFS = /*@__PURE__*/ (function (SynchronousFileSystem) {
  function CodeSandboxFS(manager) {
    SynchronousFileSystem.call(this);
    this.manager = manager;
  }

  if (SynchronousFileSystem) CodeSandboxFS.__proto__ = SynchronousFileSystem;
  CodeSandboxFS.prototype = Object.create(
    SynchronousFileSystem && SynchronousFileSystem.prototype
  );
  CodeSandboxFS.prototype.constructor = CodeSandboxFS;
  /**
   * Creates an InMemoryFileSystem instance.
   */
  CodeSandboxFS.Create = function Create(options, cb) {
    cb(null, new CodeSandboxFS(options.manager));
  };
  CodeSandboxFS.isAvailable = function isAvailable() {
    return true;
  };
  CodeSandboxFS.prototype.getName = function getName() {
    return 'CodeSandboxFS';
  };
  CodeSandboxFS.prototype.isReadOnly = function isReadOnly() {
    return false;
  };
  CodeSandboxFS.prototype.supportsProps = function supportsProps() {
    return false;
  };
  CodeSandboxFS.prototype.supportsSynch = function supportsSynch() {
    return true;
  };
  CodeSandboxFS.prototype.empty = function empty(mainCb) {
    var this$1 = this;

    var tModules = this.manager.getTranspiledModules();
    Object.keys(tModules).forEach(function (pa) {
      this$1.manager.removeModule(tModules[pa].module);
    });
    mainCb();
  };
  CodeSandboxFS.prototype.renameSync = function renameSync(oldPath, newPath) {
    var this$1 = this;

    var tModules = this.manager.getTranspiledModules();
    var modulesWithPath = Object.keys(tModules).filter(function (p) {
      return p.startsWith(oldPath) + '/' || p === oldPath;
    });
    if (modulesWithPath.length === 0) {
      throw ApiError.FileError(ErrorCode.ENOENT, oldPath);
    }
    modulesWithPath
      .map(function (p) {
        return {
          path: p,
          moduleInfo: tModules[p],
        };
      })
      .forEach(function (ref) {
        var path = ref.path;
        var moduleInfo = ref.moduleInfo;

        var module = moduleInfo.module;
        this$1.manager.moveModule(module, path.replace(oldPath, newPath));
      });
  };
  CodeSandboxFS.prototype.statSync = function statSync(p, isLstate) {
    var tModules = this.manager.getTranspiledModules();
    var moduleInfo = tModules[p];
    if (!moduleInfo) {
      var modulesStartingWithPath = Object.keys(tModules).filter(function (pa) {
        return pa.startsWith(p.endsWith('/') ? p : p + '/') || pa === p;
      });
      if (modulesStartingWithPath.length > 0) {
        return new Stats(FileType.DIRECTORY, 0);
      } else {
        throw ApiError.FileError(ErrorCode.ENOENT, p);
      }
    }
    var stats = new Stats(
      FileType.FILE,
      Buffer.byteLength(moduleInfo.module.code || '', 'utf8')
    );
    return stats;
  };
  CodeSandboxFS.prototype.createFileSync = function createFileSync(
    p,
    flag,
    mode
  ) {
    if (p === '/') {
      throw ApiError.EEXIST(p);
    }
    if (this.manager.getTranspiledModules()[p]) {
      throw ApiError.EEXIST(p);
    }
    var module = {
      path: p,
      code: '',
    };
    this.manager.addModule(module);
    var buffer = Buffer.from(module.code || '');
    var stats = new Stats(FileType.FILE, buffer.length);
    return new CodeSandboxFile$1(this, p, flag, stats, buffer);
  };
  CodeSandboxFS.prototype.openFileSync = function openFileSync(p, flag, mode) {
    var moduleInfo = this.manager.getTranspiledModules()[p];
    if (!moduleInfo) {
      throw ApiError.ENOENT(p);
    }
    var ref = moduleInfo.module;
    var code = ref.code;
    if (code === void 0) code = '';
    var buffer = Buffer.from(code || '');
    var stats = new Stats(FileType.FILE, buffer.length);
    return new CodeSandboxFile$1(this, p, flag, stats, buffer);
  };
  CodeSandboxFS.prototype.rmdirSync = function rmdirSync(p) {
    var this$1 = this;

    var tModules = this.manager.getTranspiledModules();
    Object.keys(tModules)
      .filter(function (pa) {
        return pa.startsWith(p + '/') || p === pa;
      })
      .forEach(function (pa) {
        var ref = tModules[pa];
        var module = ref.module;
        this$1.manager.removeModule(module);
      });
  };
  CodeSandboxFS.prototype.mkdirSync = function mkdirSync(p) {
    // CodeSandbox Manager doesn't have the concept of directories, like git.
    // For now we will do nothing, as we pretend that every directory already exists.
  };
  CodeSandboxFS.prototype.readdirSync = function readdirSync(path) {
    var paths = Object.keys(this.manager.getTranspiledModules());
    var p = path.endsWith('/') ? path : path + '/';
    var pathsInDir = paths.filter(function (secondP) {
      return secondP.startsWith(p);
    });
    if (pathsInDir.length === 0) {
      return [];
    }
    var directChildren = new Set();
    var currentPathLength = p.split('/').length;
    pathsInDir
      .filter(function (np) {
        return np.split('/').length >= currentPathLength;
      })
      .forEach(function (np) {
        var parts = np.split('/');
        parts.length = currentPathLength;
        directChildren.add(parts.join('/'));
      });
    var pathArray = Array.from(directChildren).map(function (pa) {
      return pa.replace(p, '');
    });
    return pathArray;
  };
  CodeSandboxFS.prototype._sync = function _sync(p, data, cb) {
    var this$1 = this;

    var parent = path.dirname(p);
    this.stat(parent, false, function (error, stat) {
      if (error) {
        cb(ApiError.FileError(ErrorCode.ENOENT, parent));
      } else {
        var module = this$1.manager.getTranspiledModules()[p].module;
        this$1.manager.updateModule(module);
        cb(null);
      }
    });
  };
  CodeSandboxFS.prototype._syncSync = function _syncSync(p, data) {
    var parent = path.dirname(p);
    this.statSync(parent, false);
    var module = this.manager.getTranspiledModules()[p].module;
    this.manager.updateModule(module);
  };

  return CodeSandboxFS;
})(SynchronousFileSystem);
CodeSandboxFS.Name = 'CodeSandboxFS';
CodeSandboxFS.Options = {
  manager: {
    type: 'object',
    description: 'The CodeSandbox Manager',
    validator: function (opt, cb) {
      if (opt) {
        cb();
      } else {
        cb(new ApiError(ErrorCode.EINVAL, 'Manager is invalid'));
      }
    },
  },
};

/**
 * Try to convert the given buffer into a string, and pass it to the callback.
 * Optimization that removes the needed try/catch into a helper function, as
 * this is an uncommon case.
 * @hidden
 */
function tryToString$1(buff, encoding, cb) {
  try {
    cb(null, buff.toString(encoding));
  } catch (e) {
    cb(e);
  }
}

function syncNotAvailableError$1() {
  throw new ApiError(
    ErrorCode.ENOTSUP,
    'Synchronous HTTP download methods are not available in this environment.'
  );
}
/**
 * A simple filesystem backed by HTTP downloads. You must create a directory listing using the
 * `make_http_index` tool provided by BrowserFS.
 *
 * If you install BrowserFS globally with `npm i -g browserfs`, you can generate a listing by
 * running `make_http_index` in your terminal in the directory you would like to index:
 *
 * ```
 * make_http_index > index.json
 * ```
 *
 * Listings objects look like the following:
 *
 * ```json
 * {
 *   "home": {
 *     "jvilk": {
 *       "someFile.txt": null,
 *       "someDir": {
 *         // Empty directory
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * *This example has the folder `/home/jvilk` with subfile `someFile.txt` and subfolder `someDir`.*
 */
var DynamicHTTPRequest = /*@__PURE__*/ (function (BaseFileSystem) {
  function DynamicHTTPRequest(prefixUrl, preferXHR) {
    if (prefixUrl === void 0) prefixUrl = '';
    if (preferXHR === void 0) preferXHR = false;

    BaseFileSystem.call(this);
    // prefix_url must end in a directory separator.
    if (
      prefixUrl.length > 0 &&
      prefixUrl.charAt(prefixUrl.length - 1) !== '/'
    ) {
      prefixUrl = prefixUrl + '/';
    }
    this.prefixUrl = prefixUrl;
    if (fetchIsAvailable && (!preferXHR || !xhrIsAvailable)) {
      this._requestFileAsyncInternal = fetchFileAsync;
      // this._requestFileSizeAsyncInternal = fetchFileSizeAsync;
    } else {
      this._requestFileAsyncInternal = asyncDownloadFile;
      // this._requestFileSizeAsyncInternal = getFileSizeAsync;
    }
    if (xhrIsAvailable) {
      this._requestFileSyncInternal = syncDownloadFile;
      // this._requestFileSizeSyncInternal = getFileSizeSync;
    } else {
      this._requestFileSyncInternal = syncNotAvailableError$1;
      // this._requestFileSizeSyncInternal = syncNotAvailableError;
    }
  }

  if (BaseFileSystem) DynamicHTTPRequest.__proto__ = BaseFileSystem;
  DynamicHTTPRequest.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  DynamicHTTPRequest.prototype.constructor = DynamicHTTPRequest;
  /**
   * Construct an DynamicHTTPRequest file system backend with the given options.
   */
  DynamicHTTPRequest.Create = function Create(opts, cb) {
    cb(null, new DynamicHTTPRequest(opts.baseUrl));
  };
  DynamicHTTPRequest.isAvailable = function isAvailable() {
    return xhrIsAvailable || fetchIsAvailable;
  };
  DynamicHTTPRequest.prototype.convertAPIError = function convertAPIError(
    error
  ) {
    return new ApiError(error.errno, error.message, error.path);
  };
  DynamicHTTPRequest.prototype.empty = function empty() {
    // this._index.fileIterator(function(file: Stats) {
    //   file.fileData = null;
    // });
  };
  DynamicHTTPRequest.prototype.getName = function getName() {
    return DynamicHTTPRequest.Name;
  };
  DynamicHTTPRequest.prototype.diskSpace = function diskSpace(path, cb) {
    // Read-only file system. We could calculate the total space, but that's not
    // important right now.
    cb(0, 0);
  };
  DynamicHTTPRequest.prototype.isReadOnly = function isReadOnly() {
    return true;
  };
  DynamicHTTPRequest.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  DynamicHTTPRequest.prototype.supportsProps = function supportsProps() {
    return false;
  };
  DynamicHTTPRequest.prototype.supportsSynch = function supportsSynch() {
    // Synchronous operations are only available via the XHR interface for now.
    return xhrIsAvailable;
  };
  DynamicHTTPRequest.prototype.stat = function stat(path, isLstat, cb) {
    var this$1 = this;

    this._requestFileAsync(path + '?stat', 'json', function (err, data) {
      if (err || data.error) {
        cb(err || this$1.convertAPIError(data.error));
      } else {
        cb(null, Stats.fromBuffer(Buffer.from(data.stats)));
      }
    });
  };
  DynamicHTTPRequest.prototype.statSync = function statSync(path, isLstat) {
    var data = this._requestFileSync(path + '?stat', 'json');
    if (data.error) {
      throw this.convertAPIError(data.error);
    }
    return Stats.fromBuffer(Buffer.from(data.stats));
  };
  DynamicHTTPRequest.prototype.open = function open(path, flags, mode, cb) {
    var this$1 = this;

    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      return cb(new ApiError(ErrorCode.EPERM, path));
    }
    var self = this;
    this._requestFileAsync(path, 'json', function (err, data) {
      if (err || data.error) {
        return cb(err || this$1.convertAPIError(data.error));
      }
      return cb(
        null,
        new NoSyncFile(
          self,
          path,
          flags,
          Stats.fromBuffer(Buffer.from(data.stats)),
          Buffer.from(data.result)
        )
      );
    });
  };
  DynamicHTTPRequest.prototype.openSync = function openSync(path, flags, mode) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      throw new ApiError(ErrorCode.EPERM, path);
    }
    var self = this;
    var data = this._requestFileSync(path, 'json');
    if (data.error) {
      throw this.convertAPIError(data.error);
    }
    return new NoSyncFile(
      self,
      path,
      flags,
      Stats.fromBuffer(Buffer.from(data.stats)),
      Buffer.from(data.result)
    );
  };
  DynamicHTTPRequest.prototype.readdir = function readdir(path, cb) {
    try {
      cb(null, this.readdirSync(path));
    } catch (e) {
      cb(e);
    }
  };
  DynamicHTTPRequest.prototype.readdirSync = function readdirSync(path) {
    // Check if it exists.
    var data = this._requestFileSync(path + '?meta', 'json');
    if (data.error) {
      throw this.convertAPIError(data.error);
    }
    return data.result;
  };
  /**
   * We have the entire file as a buffer; optimize readFile.
   */
  DynamicHTTPRequest.prototype.readFile = function readFile(
    fname,
    encoding,
    flag,
    cb
  ) {
    // Wrap cb in file closing code.
    var oldCb = cb;
    // Get file.
    this.open(fname, flag, 0x1a4, function (err, fd) {
      if (err) {
        return cb(err);
      }
      cb = function (err, arg) {
        fd.close(function (err2) {
          if (!err) {
            err = err2;
          }
          return oldCb(err, arg);
        });
      };
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        cb(err, copyingSlice(fdBuff));
      } else {
        tryToString$1(fdBuff, encoding, cb);
      }
    });
  };
  /**
   * Specially-optimized readfile.
   */
  DynamicHTTPRequest.prototype.readFileSync = function readFileSync(
    fname,
    encoding,
    flag
  ) {
    // Get file.
    var fd = this.openSync(fname, flag, 0x1a4);
    try {
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        return copyingSlice(fdBuff);
      }
      return fdBuff.toString(encoding);
    } finally {
      fd.closeSync();
    }
  };
  DynamicHTTPRequest.prototype._getHTTPPath = function _getHTTPPath(filePath) {
    if (filePath.charAt(0) === '/') {
      filePath = filePath.slice(1);
    }
    return this.prefixUrl + filePath;
  };
  DynamicHTTPRequest.prototype._requestFileAsync = function _requestFileAsync(
    p,
    type,
    cb
  ) {
    this._requestFileAsyncInternal(this._getHTTPPath(p), type, cb);
  };
  DynamicHTTPRequest.prototype._requestFileSync = function _requestFileSync(
    p,
    type
  ) {
    return this._requestFileSyncInternal(this._getHTTPPath(p), type);
  };

  return DynamicHTTPRequest;
})(BaseFileSystem);
DynamicHTTPRequest.Name = 'DynamicHTTPRequest';
DynamicHTTPRequest.Options = {
  baseUrl: {
    type: 'string',
    optional: true,
    description:
      'Used as the URL prefix for fetched files. Default: Fetch files relative to the index.',
  },
  preferXHR: {
    type: 'boolean',
    optional: true,
    description:
      'Whether to prefer XmlHttpRequest or fetch for async operations if both are available. Default: false',
  },
};

/**
 * The FolderAdapter file system wraps a file system, and scopes all interactions to a subfolder of that file system.
 *
 * Example: Given a file system `foo` with folder `bar` and file `bar/baz`...
 *
 * ```javascript
 * BrowserFS.configure({
 *   fs: "FolderAdapter",
 *   options: {
 *     folder: "bar",
 *     wrapped: foo
 *   }
 * }, function(e) {
 *   var fs = BrowserFS.BFSRequire('fs');
 *   fs.readdirSync('/'); // ['baz']
 * });
 * ```
 */
var FolderAdapter = /*@__PURE__*/ (function (BaseFileSystem) {
  function FolderAdapter(folder, wrapped) {
    BaseFileSystem.call(this);
    this._folder = folder;
    this._wrapped = wrapped;
  }

  if (BaseFileSystem) FolderAdapter.__proto__ = BaseFileSystem;
  FolderAdapter.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  FolderAdapter.prototype.constructor = FolderAdapter;
  /**
   * Creates a FolderAdapter instance with the given options.
   */
  FolderAdapter.Create = function Create(opts, cb) {
    var fa = new FolderAdapter(opts.folder, opts.wrapped);
    fa._initialize(function (e) {
      if (e) {
        cb(e);
      } else {
        cb(null, fa);
      }
    });
  };
  FolderAdapter.isAvailable = function isAvailable() {
    return true;
  };
  FolderAdapter.prototype.getName = function getName() {
    return this._wrapped.getName();
  };
  FolderAdapter.prototype.isReadOnly = function isReadOnly() {
    return this._wrapped.isReadOnly();
  };
  FolderAdapter.prototype.supportsProps = function supportsProps() {
    return this._wrapped.supportsProps();
  };
  FolderAdapter.prototype.supportsSynch = function supportsSynch() {
    return this._wrapped.supportsSynch();
  };
  FolderAdapter.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  /**
   * Initialize the file system. Ensures that the wrapped file system
   * has the given folder.
   */
  FolderAdapter.prototype._initialize = function _initialize(cb) {
    var this$1 = this;

    this._wrapped.exists(this._folder, function (exists) {
      if (exists) {
        cb();
      } else if (this$1._wrapped.isReadOnly()) {
        cb(ApiError.ENOENT(this$1._folder));
      } else {
        this$1._wrapped.mkdir(this$1._folder, 0x1ff, cb);
      }
    });
  };

  return FolderAdapter;
})(BaseFileSystem);
FolderAdapter.Name = 'FolderAdapter';
FolderAdapter.Options = {
  folder: {
    type: 'string',
    description: 'The folder to use as the root directory',
  },
  wrapped: {
    type: 'object',
    description: 'The file system to wrap',
  },
};
/**
 * @hidden
 */
function translateError(folder, e) {
  if (e !== null && typeof e === 'object') {
    var err = e;
    var p = err.path;
    if (p) {
      p = '/' + path.relative(folder, p);
      err.message = err.message.replace(err.path, p);
      err.path = p;
    }
  }
  return e;
}
/**
 * @hidden
 */
function wrapCallback(folder, cb) {
  if (typeof cb === 'function') {
    return function (err) {
      if (arguments.length > 0) {
        arguments[0] = translateError(folder, err);
      }
      cb.apply(null, arguments);
    };
  } else {
    return cb;
  }
}
/**
 * @hidden
 */
function wrapFunction(name, wrapFirst, wrapSecond) {
  if (name.slice(name.length - 4) !== 'Sync') {
    // Async function. Translate error in callback.
    return function () {
      if (arguments.length > 0) {
        if (wrapFirst) {
          arguments[0] = path.join(this._folder, arguments[0]);
        }
        if (wrapSecond) {
          arguments[1] = path.join(this._folder, arguments[1]);
        }
        arguments[arguments.length - 1] = wrapCallback(
          this._folder,
          arguments[arguments.length - 1]
        );
      }
      return this._wrapped[name].apply(this._wrapped, arguments);
    };
  } else {
    // Sync function. Translate error in catch.
    return function () {
      try {
        if (wrapFirst) {
          arguments[0] = path.join(this._folder, arguments[0]);
        }
        if (wrapSecond) {
          arguments[1] = path.join(this._folder, arguments[1]);
        }
        return this._wrapped[name].apply(this._wrapped, arguments);
      } catch (e) {
        throw translateError(this._folder, e);
      }
    };
  }
}
// First argument is a path.
[
  'diskSpace',
  'stat',
  'statSync',
  'open',
  'openSync',
  'unlink',
  'unlinkSync',
  'rmdir',
  'rmdirSync',
  'mkdir',
  'mkdirSync',
  'readdir',
  'readdirSync',
  'exists',
  'existsSync',
  'realpath',
  'realpathSync',
  'truncate',
  'truncateSync',
  'readFile',
  'readFileSync',
  'writeFile',
  'writeFileSync',
  'appendFile',
  'appendFileSync',
  'chmod',
  'chmodSync',
  'chown',
  'chownSync',
  'utimes',
  'utimesSync',
  'readlink',
  'readlinkSync',
].forEach(function (name) {
  FolderAdapter.prototype[name] = wrapFunction(name, true, false);
});
// First and second arguments are paths.
['rename', 'renameSync', 'link', 'linkSync', 'symlink', 'symlinkSync'].forEach(
  function (name) {
    FolderAdapter.prototype[name] = wrapFunction(name, true, true);
  }
);

/**
 * Try to convert the given buffer into a string, and pass it to the callback.
 * Optimization that removes the needed try/catch into a helper function, as
 * this is an uncommon case.
 * @hidden
 */
function tryToString$2(buff, encoding, cb) {
  try {
    cb(null, buff.toString(encoding));
  } catch (e) {
    cb(e);
  }
}

function syncNotAvailableError$2() {
  throw new ApiError(
    ErrorCode.ENOTSUP,
    'Synchronous HTTP download methods are not available in this environment.'
  );
}
/**
 * A simple filesystem backed by HTTP downloads. You must create a directory listing using the
 * `make_http_index` tool provided by BrowserFS.
 *
 * If you install BrowserFS globally with `npm i -g browserfs`, you can generate a listing by
 * running `make_http_index` in your terminal in the directory you would like to index:
 *
 * ```
 * make_http_index > index.json
 * ```
 *
 * Listings objects look like the following:
 *
 * ```json
 * {
 *   "home": {
 *     "jvilk": {
 *       "someFile.txt": null,
 *       "someDir": {
 *         // Empty directory
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * *This example has the folder `/home/jvilk` with subfile `someFile.txt` and subfolder `someDir`.*
 */
var HTTPRequest = /*@__PURE__*/ (function (BaseFileSystem) {
  function HTTPRequest(index, prefixUrl, preferXHR) {
    if (prefixUrl === void 0) prefixUrl = '';
    if (preferXHR === void 0) preferXHR = false;

    BaseFileSystem.call(this);
    // prefix_url must end in a directory separator.
    if (
      prefixUrl.length > 0 &&
      prefixUrl.charAt(prefixUrl.length - 1) !== '/'
    ) {
      prefixUrl = prefixUrl + '/';
    }
    this.prefixUrl = prefixUrl;
    this._index = FileIndex.fromListing(index);
    if (fetchIsAvailable && (!preferXHR || !xhrIsAvailable)) {
      this._requestFileAsyncInternal = fetchFileAsync;
      this._requestFileSizeAsyncInternal = fetchFileSizeAsync;
    } else {
      this._requestFileAsyncInternal = asyncDownloadFile;
      this._requestFileSizeAsyncInternal = getFileSizeAsync;
    }
    if (xhrIsAvailable) {
      this._requestFileSyncInternal = syncDownloadFile;
      this._requestFileSizeSyncInternal = getFileSizeSync;
    } else {
      this._requestFileSyncInternal = syncNotAvailableError$2;
      this._requestFileSizeSyncInternal = syncNotAvailableError$2;
    }
  }

  if (BaseFileSystem) HTTPRequest.__proto__ = BaseFileSystem;
  HTTPRequest.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  HTTPRequest.prototype.constructor = HTTPRequest;
  /**
   * Construct an HTTPRequest file system backend with the given options.
   */
  HTTPRequest.Create = function Create(opts, cb) {
    if (opts.index === undefined) {
      opts.index = 'index.json';
    }
    if (typeof opts.index === 'string') {
      asyncDownloadFile(opts.index, 'json', function (e, data) {
        if (e) {
          cb(e);
        } else {
          cb(null, new HTTPRequest(data, opts.baseUrl));
        }
      });
    } else {
      cb(null, new HTTPRequest(opts.index, opts.baseUrl));
    }
  };
  HTTPRequest.isAvailable = function isAvailable() {
    return xhrIsAvailable || fetchIsAvailable;
  };
  HTTPRequest.prototype.empty = function empty() {
    this._index.fileIterator(function (file) {
      file.fileData = null;
    });
  };
  HTTPRequest.prototype.getName = function getName() {
    return HTTPRequest.Name;
  };
  HTTPRequest.prototype.diskSpace = function diskSpace(path, cb) {
    // Read-only file system. We could calculate the total space, but that's not
    // important right now.
    cb(0, 0);
  };
  HTTPRequest.prototype.isReadOnly = function isReadOnly() {
    return true;
  };
  HTTPRequest.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  HTTPRequest.prototype.supportsProps = function supportsProps() {
    return false;
  };
  HTTPRequest.prototype.supportsSynch = function supportsSynch() {
    // Synchronous operations are only available via the XHR interface for now.
    return xhrIsAvailable;
  };
  /**
   * Special HTTPFS function: Preload the given file into the index.
   * @param [String] path
   * @param [BrowserFS.Buffer] buffer
   */
  HTTPRequest.prototype.preloadFile = function preloadFile(path, buffer) {
    var inode = this._index.getInode(path);
    if (isFileInode(inode)) {
      if (inode === null) {
        throw ApiError.ENOENT(path);
      }
      var stats = inode.getData();
      stats.size = buffer.length;
      stats.fileData = buffer;
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  HTTPRequest.prototype.stat = function stat(path, isLstat, cb) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      return cb(ApiError.ENOENT(path));
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        this._requestFileSizeAsync(path, function (e, size) {
          if (e) {
            return cb(e);
          }
          stats.size = size;
          cb(null, Stats.clone(stats));
        });
      } else {
        cb(null, Stats.clone(stats));
      }
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
      cb(null, stats);
    } else {
      cb(ApiError.FileError(ErrorCode.EINVAL, path));
    }
  };
  HTTPRequest.prototype.statSync = function statSync(path, isLstat) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        stats.size = this._requestFileSizeSync(path);
      }
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
    } else {
      throw ApiError.FileError(ErrorCode.EINVAL, path);
    }
    return stats;
  };
  HTTPRequest.prototype.open = function open(path, flags, mode, cb) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      return cb(new ApiError(ErrorCode.EPERM, path));
    }
    var self = this;
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (inode === null) {
      return cb(ApiError.ENOENT(path));
    }
    if (isFileInode(inode)) {
      var stats = inode.getData();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          return cb(ApiError.EEXIST(path));
        case ActionType.NOP:
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return cb(
              null,
              new NoSyncFile(
                self,
                path,
                flags,
                Stats.clone(stats),
                stats.fileData
              )
            );
          }
          // @todo be lazier about actually requesting the file
          this._requestFileAsync(path, 'buffer', function (err, buffer) {
            if (err) {
              return cb(err);
            }
            // we don't initially have file sizes
            stats.size = buffer.length;
            stats.fileData = buffer;
            return cb(
              null,
              new NoSyncFile(self, path, flags, Stats.clone(stats), buffer)
            );
          });
          break;
        default:
          return cb(new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.'));
      }
    } else {
      return cb(ApiError.EISDIR(path));
    }
  };
  HTTPRequest.prototype.openSync = function openSync(path, flags, mode) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      throw new ApiError(ErrorCode.EPERM, path);
    }
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    if (isFileInode(inode)) {
      var stats = inode.getData();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          throw ApiError.EEXIST(path);
        case ActionType.NOP:
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return new NoSyncFile(
              this,
              path,
              flags,
              Stats.clone(stats),
              stats.fileData
            );
          }
          // @todo be lazier about actually requesting the file
          var buffer = this._requestFileSync(path, 'buffer');
          // we don't initially have file sizes
          stats.size = buffer.length;
          stats.fileData = buffer;
          return new NoSyncFile(this, path, flags, Stats.clone(stats), buffer);
        default:
          throw new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.');
      }
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  HTTPRequest.prototype.readdir = function readdir(path, cb) {
    try {
      cb(null, this.readdirSync(path));
    } catch (e) {
      cb(e);
    }
  };
  HTTPRequest.prototype.readdirSync = function readdirSync(path) {
    // Check if it exists.
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    } else if (isDirInode(inode)) {
      return inode.getListing();
    } else {
      throw ApiError.ENOTDIR(path);
    }
  };
  /**
   * We have the entire file as a buffer; optimize readFile.
   */
  HTTPRequest.prototype.readFile = function readFile(
    fname,
    encoding,
    flag,
    cb
  ) {
    // Wrap cb in file closing code.
    var oldCb = cb;
    // Get file.
    this.open(fname, flag, 0x1a4, function (err, fd) {
      if (err) {
        return cb(err);
      }
      cb = function (err, arg) {
        fd.close(function (err2) {
          if (!err) {
            err = err2;
          }
          return oldCb(err, arg);
        });
      };
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        cb(err, copyingSlice(fdBuff));
      } else {
        tryToString$2(fdBuff, encoding, cb);
      }
    });
  };
  /**
   * Specially-optimized readfile.
   */
  HTTPRequest.prototype.readFileSync = function readFileSync(
    fname,
    encoding,
    flag
  ) {
    // Get file.
    var fd = this.openSync(fname, flag, 0x1a4);
    try {
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        return copyingSlice(fdBuff);
      }
      return fdBuff.toString(encoding);
    } finally {
      fd.closeSync();
    }
  };
  HTTPRequest.prototype._getHTTPPath = function _getHTTPPath(filePath) {
    if (filePath.charAt(0) === '/') {
      filePath = filePath.slice(1);
    }
    return this.prefixUrl + filePath;
  };
  HTTPRequest.prototype._requestFileAsync = function _requestFileAsync(
    p,
    type,
    cb
  ) {
    this._requestFileAsyncInternal(this._getHTTPPath(p), type, cb);
  };
  HTTPRequest.prototype._requestFileSync = function _requestFileSync(p, type) {
    return this._requestFileSyncInternal(this._getHTTPPath(p), type);
  };
  /**
   * Only requests the HEAD content, for the file size.
   */
  HTTPRequest.prototype._requestFileSizeAsync = function _requestFileSizeAsync(
    path,
    cb
  ) {
    this._requestFileSizeAsyncInternal(this._getHTTPPath(path), cb);
  };
  HTTPRequest.prototype._requestFileSizeSync = function _requestFileSizeSync(
    path
  ) {
    return this._requestFileSizeSyncInternal(this._getHTTPPath(path));
  };

  return HTTPRequest;
})(BaseFileSystem);
HTTPRequest.Name = 'HTTPRequest';
HTTPRequest.Options = {
  index: {
    type: ['string', 'object'],
    optional: true,
    description:
      'URL to a file index as a JSON file or the file index object itself, generated with the make_http_index script. Defaults to `index.json`.',
  },
  baseUrl: {
    type: 'string',
    optional: true,
    description:
      'Used as the URL prefix for fetched files. Default: Fetch files relative to the index.',
  },
  preferXHR: {
    type: 'boolean',
    optional: true,
    description:
      'Whether to prefer XmlHttpRequest or fetch for async operations if both are available. Default: false',
  },
};

/**
 * Generic inode definition that can easily be serialized.
 */
var Inode = function Inode(id, size, mode, atime, mtime, ctime) {
  this.id = id;
  this.size = size;
  this.mode = mode;
  this.atime = atime;
  this.mtime = mtime;
  this.ctime = ctime;
};
/**
 * Converts the buffer into an Inode.
 */
Inode.fromBuffer = function fromBuffer(buffer) {
  if (buffer === undefined) {
    throw new Error('NO');
  }
  return new Inode(
    buffer.toString('ascii', 30),
    buffer.readUInt32LE(0),
    buffer.readUInt16LE(4),
    buffer.readDoubleLE(6),
    buffer.readDoubleLE(14),
    buffer.readDoubleLE(22)
  );
};
/**
 * Handy function that converts the Inode to a Node Stats object.
 */
Inode.prototype.toStats = function toStats() {
  return new Stats(
    (this.mode & 0xf000) === FileType.DIRECTORY
      ? FileType.DIRECTORY
      : FileType.FILE,
    this.size,
    this.mode,
    this.atime,
    this.mtime,
    this.ctime
  );
};
/**
 * Get the size of this Inode, in bytes.
 */
Inode.prototype.getSize = function getSize() {
  // ASSUMPTION: ID is ASCII (1 byte per char).
  return 30 + this.id.length;
};
/**
 * Writes the inode into the start of the buffer.
 */
Inode.prototype.toBuffer = function toBuffer(buff) {
  if (buff === void 0) buff = Buffer.alloc(this.getSize());

  buff.writeUInt32LE(this.size, 0);
  buff.writeUInt16LE(this.mode, 4);
  buff.writeDoubleLE(this.atime, 6);
  buff.writeDoubleLE(this.mtime, 14);
  buff.writeDoubleLE(this.ctime, 22);
  buff.write(this.id, 30, this.id.length, 'ascii');
  return buff;
};
/**
 * Updates the Inode using information from the stats object. Used by file
 * systems at sync time, e.g.:
 * - Program opens file and gets a File object.
 * - Program mutates file. File object is responsible for maintaining
 *   metadata changes locally -- typically in a Stats object.
 * - Program closes file. File object's metadata changes are synced with the
 *   file system.
 * @return True if any changes have occurred.
 */
Inode.prototype.update = function update(stats) {
  var hasChanged = false;
  if (this.size !== stats.size) {
    this.size = stats.size;
    hasChanged = true;
  }
  if (this.mode !== stats.mode) {
    this.mode = stats.mode;
    hasChanged = true;
  }
  var atimeMs = stats.atime.getTime();
  if (this.atime !== atimeMs) {
    this.atime = atimeMs;
    hasChanged = true;
  }
  var mtimeMs = stats.mtime.getTime();
  if (this.mtime !== mtimeMs) {
    this.mtime = mtimeMs;
    hasChanged = true;
  }
  var ctimeMs = stats.ctime.getTime();
  if (this.ctime !== ctimeMs) {
    this.ctime = ctimeMs;
    hasChanged = true;
  }
  return hasChanged;
};
// XXX: Copied from Stats. Should reconcile these two into something more
//  compact.
/**
 * @return [Boolean] True if this item is a file.
 */
Inode.prototype.isFile = function isFile() {
  return (this.mode & 0xf000) === FileType.FILE;
};
/**
 * @return [Boolean] True if this item is a directory.
 */
Inode.prototype.isDirectory = function isDirectory() {
  return (this.mode & 0xf000) === FileType.DIRECTORY;
};

/**
 * @hidden
 */
var ROOT_NODE_ID = '/';
/**
 * @hidden
 */
var emptyDirNode = null;
/**
 * Returns an empty directory node.
 * @hidden
 */
function getEmptyDirNode() {
  if (emptyDirNode) {
    return emptyDirNode;
  }
  return (emptyDirNode = Buffer.from('{}'));
}
/**
 * Generates a random ID.
 * @hidden
 */
function GenerateRandomID() {
  // From http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 * Helper function. Checks if 'e' is defined. If so, it triggers the callback
 * with 'e' and returns false. Otherwise, returns true.
 * @hidden
 */
function noError(e, cb) {
  if (e) {
    cb(e);
    return false;
  }
  return true;
}
/**
 * Helper function. Checks if 'e' is defined. If so, it aborts the transaction,
 * triggers the callback with 'e', and returns false. Otherwise, returns true.
 * @hidden
 */
function noErrorTx(e, tx, cb) {
  if (e) {
    tx.abort(function () {
      cb(e);
    });
    return false;
  }
  return true;
}
var LRUNode = function LRUNode(key, value) {
  this.key = key;
  this.value = value;
  this.prev = null;
  this.next = null;
};
// Adapted from https://chrisrng.svbtle.com/lru-cache-in-javascript
var LRUCache = function LRUCache(limit) {
  this.limit = limit;
  this.size = 0;
  this.map = {};
  this.head = null;
  this.tail = null;
};
/**
 * Change or add a new value in the cache
 * We overwrite the entry if it already exists
 */
LRUCache.prototype.set = function set(key, value) {
  var node = new LRUNode(key, value);
  if (this.map[key]) {
    this.map[key].value = node.value;
    this.remove(node.key);
  } else {
    if (this.size >= this.limit) {
      delete this.map[this.tail.key];
      this.size--;
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }
  this.setHead(node);
};
/* Retrieve a single entry from the cache */
LRUCache.prototype.get = function get(key) {
  if (this.map[key]) {
    var value = this.map[key].value;
    var node = new LRUNode(key, value);
    this.remove(key);
    this.setHead(node);
    return value;
  } else {
    return null;
  }
};
/* Remove a single entry from the cache */
LRUCache.prototype.remove = function remove(key) {
  var node = this.map[key];
  if (!node) {
    return;
  }
  if (node.prev !== null) {
    node.prev.next = node.next;
  } else {
    this.head = node.next;
  }
  if (node.next !== null) {
    node.next.prev = node.prev;
  } else {
    this.tail = node.prev;
  }
  delete this.map[key];
  this.size--;
};
/* Resets the entire cache - Argument limit is optional to be reset */
LRUCache.prototype.removeAll = function removeAll() {
  this.size = 0;
  this.map = {};
  this.head = null;
  this.tail = null;
};
LRUCache.prototype.setHead = function setHead(node) {
  node.next = this.head;
  node.prev = null;
  if (this.head !== null) {
    this.head.prev = node;
  }
  this.head = node;
  if (this.tail === null) {
    this.tail = node;
  }
  this.size++;
  this.map[node.key] = node;
};
/**
 * A simple RW transaction for simple synchronous key-value stores.
 */
var SimpleSyncRWTransaction = function SimpleSyncRWTransaction(store) {
  this.store = store;
  /**
   * Stores data in the keys we modify prior to modifying them.
   * Allows us to roll back commits.
   */
  this.originalData = {};
  /**
   * List of keys modified in this transaction, if any.
   */
  this.modifiedKeys = [];
};
SimpleSyncRWTransaction.prototype.get = function get(key) {
  var val = this.store.get(key);
  this.stashOldValue(key, val);
  return val;
};
SimpleSyncRWTransaction.prototype.put = function put(key, data, overwrite) {
  this.markModified(key);
  return this.store.put(key, data, overwrite);
};
SimpleSyncRWTransaction.prototype.del = function del(key) {
  this.markModified(key);
  this.store.del(key);
};
SimpleSyncRWTransaction.prototype.commit = function commit() {};
SimpleSyncRWTransaction.prototype.abort = function abort() {
  // Rollback old values.
  for (var i = 0, list = this.modifiedKeys; i < list.length; i += 1) {
    var key = list[i];

    var value = this.originalData[key];
    if (!value) {
      // Key didn't exist.
      this.store.del(key);
    } else {
      // Key existed. Store old value.
      this.store.put(key, value, true);
    }
  }
};
/**
 * Stashes given key value pair into `originalData` if it doesn't already
 * exist. Allows us to stash values the program is requesting anyway to
 * prevent needless `get` requests if the program modifies the data later
 * on during the transaction.
 */
SimpleSyncRWTransaction.prototype.stashOldValue = function stashOldValue(
  key,
  value
) {
  // Keep only the earliest value in the transaction.
  if (!this.originalData.hasOwnProperty(key)) {
    this.originalData[key] = value;
  }
};
/**
 * Marks the given key as modified, and stashes its value if it has not been
 * stashed already.
 */
SimpleSyncRWTransaction.prototype.markModified = function markModified(key) {
  if (this.modifiedKeys.indexOf(key) === -1) {
    this.modifiedKeys.push(key);
    if (!this.originalData.hasOwnProperty(key)) {
      this.originalData[key] = this.store.get(key);
    }
  }
};
var SyncKeyValueFile = /*@__PURE__*/ (function (PreloadFile) {
  function SyncKeyValueFile(_fs, _path, _flag, _stat, contents) {
    PreloadFile.call(this, _fs, _path, _flag, _stat, contents);
  }

  if (PreloadFile) SyncKeyValueFile.__proto__ = PreloadFile;
  SyncKeyValueFile.prototype = Object.create(
    PreloadFile && PreloadFile.prototype
  );
  SyncKeyValueFile.prototype.constructor = SyncKeyValueFile;
  SyncKeyValueFile.prototype.syncSync = function syncSync() {
    if (this.isDirty()) {
      this._fs._syncSync(this.getPath(), this.getBuffer(), this.getStats());
      this.resetDirty();
    }
  };
  SyncKeyValueFile.prototype.closeSync = function closeSync() {
    this.syncSync();
  };

  return SyncKeyValueFile;
})(PreloadFile);
/**
 * A "Synchronous key-value file system". Stores data to/retrieves data from an
 * underlying key-value store.
 *
 * We use a unique ID for each node in the file system. The root node has a
 * fixed ID.
 * @todo Introduce Node ID caching.
 * @todo Check modes.
 */
var SyncKeyValueFileSystem = /*@__PURE__*/ (function (SynchronousFileSystem) {
  function SyncKeyValueFileSystem(options) {
    SynchronousFileSystem.call(this);
    this.store = options.store;
    // INVARIANT: Ensure that the root exists.
    this.makeRootDirectory();
  }

  if (SynchronousFileSystem)
    SyncKeyValueFileSystem.__proto__ = SynchronousFileSystem;
  SyncKeyValueFileSystem.prototype = Object.create(
    SynchronousFileSystem && SynchronousFileSystem.prototype
  );
  SyncKeyValueFileSystem.prototype.constructor = SyncKeyValueFileSystem;
  SyncKeyValueFileSystem.isAvailable = function isAvailable() {
    return true;
  };

  SyncKeyValueFileSystem.prototype.getName = function getName() {
    return this.store.name();
  };
  SyncKeyValueFileSystem.prototype.isReadOnly = function isReadOnly() {
    return false;
  };
  SyncKeyValueFileSystem.prototype.supportsSymlinks =
    function supportsSymlinks() {
      return false;
    };
  SyncKeyValueFileSystem.prototype.supportsProps = function supportsProps() {
    return false;
  };
  SyncKeyValueFileSystem.prototype.supportsSynch = function supportsSynch() {
    return true;
  };
  /**
   * Delete all contents stored in the file system.
   */
  SyncKeyValueFileSystem.prototype.empty = function empty() {
    this.store.clear();
    // INVARIANT: Root always exists.
    this.makeRootDirectory();
  };
  SyncKeyValueFileSystem.prototype.renameSync = function renameSync(
    oldPath,
    newPath
  ) {
    var tx = this.store.beginTransaction('readwrite'),
      oldParent = path.dirname(oldPath),
      oldName = path.basename(oldPath),
      newParent = path.dirname(newPath),
      newName = path.basename(newPath),
      // Remove oldPath from parent's directory listing.
      oldDirNode = this.findINode(tx, oldParent),
      oldDirList = this.getDirListing(tx, oldParent, oldDirNode);
    if (!oldDirList[oldName]) {
      throw ApiError.ENOENT(oldPath);
    }
    var nodeId = oldDirList[oldName];
    delete oldDirList[oldName];
    // Invariant: Can't move a folder inside itself.
    // This funny little hack ensures that the check passes only if oldPath
    // is a subpath of newParent. We append '/' to avoid matching folders that
    // are a substring of the bottom-most folder in the path.
    if ((newParent + '/').indexOf(oldPath + '/') === 0) {
      throw new ApiError(ErrorCode.EBUSY, oldParent);
    }
    // Add newPath to parent's directory listing.
    var newDirNode, newDirList;
    if (newParent === oldParent) {
      // Prevent us from re-grabbing the same directory listing, which still
      // contains oldName.
      newDirNode = oldDirNode;
      newDirList = oldDirList;
    } else {
      newDirNode = this.findINode(tx, newParent);
      newDirList = this.getDirListing(tx, newParent, newDirNode);
    }
    if (newDirList[newName]) {
      // If it's a file, delete it.
      var newNameNode = this.getINode(tx, newPath, newDirList[newName]);
      if (newNameNode.isFile()) {
        try {
          tx.del(newNameNode.id);
          tx.del(newDirList[newName]);
        } catch (e) {
          tx.abort();
          throw e;
        }
      } else {
        // If it's a directory, throw a permissions error.
        throw ApiError.EPERM(newPath);
      }
    }
    newDirList[newName] = nodeId;
    // Commit the two changed directory listings.
    try {
      tx.put(oldDirNode.id, Buffer.from(JSON.stringify(oldDirList)), true);
      tx.put(newDirNode.id, Buffer.from(JSON.stringify(newDirList)), true);
    } catch (e) {
      tx.abort();
      throw e;
    }
    tx.commit();
  };
  SyncKeyValueFileSystem.prototype.statSync = function statSync(p, isLstat) {
    // Get the inode to the item, convert it into a Stats object.
    return this.findINode(this.store.beginTransaction('readonly'), p).toStats();
  };
  SyncKeyValueFileSystem.prototype.createFileSync = function createFileSync(
    p,
    flag,
    mode
  ) {
    var tx = this.store.beginTransaction('readwrite'),
      data = emptyBuffer(),
      newFile = this.commitNewFile(tx, p, FileType.FILE, mode, data);
    // Open the file.
    return new SyncKeyValueFile(this, p, flag, newFile.toStats(), data);
  };
  SyncKeyValueFileSystem.prototype.openFileSync = function openFileSync(
    p,
    flag
  ) {
    var tx = this.store.beginTransaction('readonly'),
      node = this.findINode(tx, p),
      data = tx.get(node.id);
    if (data === undefined) {
      throw ApiError.ENOENT(p);
    }
    return new SyncKeyValueFile(this, p, flag, node.toStats(), data);
  };
  SyncKeyValueFileSystem.prototype.unlinkSync = function unlinkSync(p) {
    this.removeEntry(p, false);
  };
  SyncKeyValueFileSystem.prototype.rmdirSync = function rmdirSync(p) {
    // Check first if directory is empty.
    if (this.readdirSync(p).length > 0) {
      throw ApiError.ENOTEMPTY(p);
    } else {
      this.removeEntry(p, true);
    }
  };
  SyncKeyValueFileSystem.prototype.mkdirSync = function mkdirSync(p, mode) {
    var tx = this.store.beginTransaction('readwrite'),
      data = Buffer.from('{}');
    this.commitNewFile(tx, p, FileType.DIRECTORY, mode, data);
  };
  SyncKeyValueFileSystem.prototype.readdirSync = function readdirSync(p) {
    var tx = this.store.beginTransaction('readonly');
    return Object.keys(this.getDirListing(tx, p, this.findINode(tx, p)));
  };
  SyncKeyValueFileSystem.prototype._syncSync = function _syncSync(
    p,
    data,
    stats
  ) {
    // @todo Ensure mtime updates properly, and use that to determine if a data
    //       update is required.
    var tx = this.store.beginTransaction('readwrite'),
      // We use the _findInode helper because we actually need the INode id.
      fileInodeId = this._findINode(tx, path.dirname(p), path.basename(p)),
      fileInode = this.getINode(tx, p, fileInodeId),
      inodeChanged = fileInode.update(stats);
    try {
      // Sync data.
      tx.put(fileInode.id, data, true);
      // Sync metadata.
      if (inodeChanged) {
        tx.put(fileInodeId, fileInode.toBuffer(), true);
      }
    } catch (e) {
      tx.abort();
      throw e;
    }
    tx.commit();
  };
  /**
   * Checks if the root directory exists. Creates it if it doesn't.
   */
  SyncKeyValueFileSystem.prototype.makeRootDirectory =
    function makeRootDirectory() {
      var tx = this.store.beginTransaction('readwrite');
      if (tx.get(ROOT_NODE_ID) === undefined) {
        // Create new inode.
        var currTime = new Date().getTime(),
          // Mode 0666
          dirInode = new Inode(
            GenerateRandomID(),
            4096,
            511 | FileType.DIRECTORY,
            currTime,
            currTime,
            currTime
          );
        // If the root doesn't exist, the first random ID shouldn't exist,
        // either.
        tx.put(dirInode.id, getEmptyDirNode(), false);
        tx.put(ROOT_NODE_ID, dirInode.toBuffer(), false);
        tx.commit();
      }
    };
  /**
   * Helper function for findINode.
   * @param parent The parent directory of the file we are attempting to find.
   * @param filename The filename of the inode we are attempting to find, minus
   *   the parent.
   * @return string The ID of the file's inode in the file system.
   */
  SyncKeyValueFileSystem.prototype._findINode = function _findINode(
    tx,
    parent,
    filename
  ) {
    var this$1 = this;

    var readDirectory = function (inode) {
      // Get the root's directory listing.
      var dirList = this$1.getDirListing(tx, parent, inode);
      // Get the file's ID.
      if (dirList[filename]) {
        return dirList[filename];
      } else {
        throw ApiError.ENOENT(path.resolve(parent, filename));
      }
    };
    if (parent === '/') {
      if (filename === '') {
        // BASE CASE #1: Return the root's ID.
        return ROOT_NODE_ID;
      } else {
        // BASE CASE #2: Find the item in the root ndoe.
        return readDirectory(this.getINode(tx, parent, ROOT_NODE_ID));
      }
    } else {
      return readDirectory(
        this.getINode(
          tx,
          parent + path.sep + filename,
          this._findINode(tx, path.dirname(parent), path.basename(parent))
        )
      );
    }
  };
  /**
   * Finds the Inode of the given path.
   * @param p The path to look up.
   * @return The Inode of the path p.
   * @todo memoize/cache
   */
  SyncKeyValueFileSystem.prototype.findINode = function findINode(tx, p) {
    return this.getINode(
      tx,
      p,
      this._findINode(tx, path.dirname(p), path.basename(p))
    );
  };
  /**
   * Given the ID of a node, retrieves the corresponding Inode.
   * @param tx The transaction to use.
   * @param p The corresponding path to the file (used for error messages).
   * @param id The ID to look up.
   */
  SyncKeyValueFileSystem.prototype.getINode = function getINode(tx, p, id) {
    var inode = tx.get(id);
    if (inode === undefined) {
      throw ApiError.ENOENT(p);
    }
    return Inode.fromBuffer(inode);
  };
  /**
   * Given the Inode of a directory, retrieves the corresponding directory
   * listing.
   */
  SyncKeyValueFileSystem.prototype.getDirListing = function getDirListing(
    tx,
    p,
    inode
  ) {
    if (!inode.isDirectory()) {
      throw ApiError.ENOTDIR(p);
    }
    var data = tx.get(inode.id);
    if (data === undefined) {
      throw ApiError.ENOENT(p);
    }
    return JSON.parse(data.toString());
  };
  /**
   * Creates a new node under a random ID. Retries 5 times before giving up in
   * the exceedingly unlikely chance that we try to reuse a random GUID.
   * @return The GUID that the data was stored under.
   */
  SyncKeyValueFileSystem.prototype.addNewNode = function addNewNode(tx, data) {
    var retries = 0;
    var currId;
    while (retries < 5) {
      try {
        currId = GenerateRandomID();
        tx.put(currId, data, false);
        return currId;
      } catch (e) {
        // Ignore and reroll.
      }
    }
    throw new ApiError(
      ErrorCode.EIO,
      'Unable to commit data to key-value store.'
    );
  };
  /**
   * Commits a new file (well, a FILE or a DIRECTORY) to the file system with
   * the given mode.
   * Note: This will commit the transaction.
   * @param p The path to the new file.
   * @param type The type of the new file.
   * @param mode The mode to create the new file with.
   * @param data The data to store at the file's data node.
   * @return The Inode for the new file.
   */
  SyncKeyValueFileSystem.prototype.commitNewFile = function commitNewFile(
    tx,
    p,
    type,
    mode,
    data
  ) {
    var parentDir = path.dirname(p),
      fname = path.basename(p),
      parentNode = this.findINode(tx, parentDir),
      dirListing = this.getDirListing(tx, parentDir, parentNode),
      currTime = new Date().getTime();
    // Invariant: The root always exists.
    // If we don't check this prior to taking steps below, we will create a
    // file with name '' in root should p == '/'.
    if (p === '/') {
      throw ApiError.EEXIST(p);
    }
    // Check if file already exists.
    if (dirListing[fname]) {
      throw ApiError.EEXIST(p);
    }
    var fileNode;
    try {
      // Commit data.
      var dataId = this.addNewNode(tx, data);
      fileNode = new Inode(
        dataId,
        data.length,
        mode | type,
        currTime,
        currTime,
        currTime
      );
      // Commit file node.
      var fileNodeId = this.addNewNode(tx, fileNode.toBuffer());
      // Update and commit parent directory listing.
      dirListing[fname] = fileNodeId;
      tx.put(parentNode.id, Buffer.from(JSON.stringify(dirListing)), true);
    } catch (e) {
      tx.abort();
      throw e;
    }
    tx.commit();
    return fileNode;
  };
  /**
   * Remove all traces of the given path from the file system.
   * @param p The path to remove from the file system.
   * @param isDir Does the path belong to a directory, or a file?
   * @todo Update mtime.
   */
  SyncKeyValueFileSystem.prototype.removeEntry = function removeEntry(
    p,
    isDir
  ) {
    var tx = this.store.beginTransaction('readwrite'),
      parent = path.dirname(p),
      parentNode = this.findINode(tx, parent),
      parentListing = this.getDirListing(tx, parent, parentNode),
      fileName = path.basename(p);
    if (!parentListing[fileName]) {
      throw ApiError.ENOENT(p);
    }
    // Remove from directory listing of parent.
    var fileNodeId = parentListing[fileName];
    delete parentListing[fileName];
    // Get file inode.
    var fileNode = this.getINode(tx, p, fileNodeId);
    if (!isDir && fileNode.isDirectory()) {
      throw ApiError.EISDIR(p);
    } else if (isDir && !fileNode.isDirectory()) {
      throw ApiError.ENOTDIR(p);
    }
    try {
      // Delete data.
      tx.del(fileNode.id);
      // Delete node.
      tx.del(fileNodeId);
      // Update directory listing.
      tx.put(parentNode.id, Buffer.from(JSON.stringify(parentListing)), true);
    } catch (e) {
      tx.abort();
      throw e;
    }
    // Success.
    tx.commit();
  };

  return SyncKeyValueFileSystem;
})(SynchronousFileSystem);
var AsyncKeyValueFile = /*@__PURE__*/ (function (PreloadFile) {
  function AsyncKeyValueFile(_fs, _path, _flag, _stat, contents) {
    PreloadFile.call(this, _fs, _path, _flag, _stat, contents);
  }

  if (PreloadFile) AsyncKeyValueFile.__proto__ = PreloadFile;
  AsyncKeyValueFile.prototype = Object.create(
    PreloadFile && PreloadFile.prototype
  );
  AsyncKeyValueFile.prototype.constructor = AsyncKeyValueFile;
  AsyncKeyValueFile.prototype.sync = function sync(cb) {
    var this$1 = this;

    if (this.isDirty()) {
      this._fs._sync(
        this.getPath(),
        this.getBuffer(),
        this.getStats(),
        function (e) {
          if (!e) {
            this$1.resetDirty();
          }
          cb(e);
        }
      );
    } else {
      cb();
    }
  };
  AsyncKeyValueFile.prototype.close = function close(cb) {
    this.sync(cb);
  };

  return AsyncKeyValueFile;
})(PreloadFile);
/**
 * An "Asynchronous key-value file system". Stores data to/retrieves data from
 * an underlying asynchronous key-value store.
 */
var AsyncKeyValueFileSystem = /*@__PURE__*/ (function (BaseFileSystem) {
  function AsyncKeyValueFileSystem(cacheSize) {
    BaseFileSystem.call(this);
    this._cache = null;
    if (cacheSize > 0) {
      this._cache = new LRUCache(cacheSize);
    }
  }

  if (BaseFileSystem) AsyncKeyValueFileSystem.__proto__ = BaseFileSystem;
  AsyncKeyValueFileSystem.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  AsyncKeyValueFileSystem.prototype.constructor = AsyncKeyValueFileSystem;
  AsyncKeyValueFileSystem.isAvailable = function isAvailable() {
    return true;
  };
  /**
   * Initializes the file system. Typically called by subclasses' async
   * constructors.
   */
  AsyncKeyValueFileSystem.prototype.init = function init(store, cb) {
    this.store = store;
    // INVARIANT: Ensure that the root exists.
    this.makeRootDirectory(cb);
  };
  AsyncKeyValueFileSystem.prototype.getName = function getName() {
    return this.store.name();
  };
  AsyncKeyValueFileSystem.prototype.isReadOnly = function isReadOnly() {
    return false;
  };
  AsyncKeyValueFileSystem.prototype.supportsSymlinks =
    function supportsSymlinks() {
      return false;
    };
  AsyncKeyValueFileSystem.prototype.supportsProps = function supportsProps() {
    return false;
  };
  AsyncKeyValueFileSystem.prototype.supportsSynch = function supportsSynch() {
    return false;
  };
  /**
   * Delete all contents stored in the file system.
   */
  AsyncKeyValueFileSystem.prototype.empty = function empty(cb) {
    var this$1 = this;

    if (this._cache) {
      this._cache.removeAll();
    }
    this.store.clear(function (e) {
      if (noError(e, cb)) {
        // INVARIANT: Root always exists.
        this$1.makeRootDirectory(cb);
      }
    });
  };
  AsyncKeyValueFileSystem.prototype.rename = function rename(
    oldPath,
    newPath,
    cb
  ) {
    var this$1 = this;

    // TODO: Make rename compatible with the cache.
    if (this._cache) {
      // Clear and disable cache during renaming process.
      var c = this._cache;
      this._cache = null;
      c.removeAll();
      var oldCb = cb;
      cb = function (e) {
        // Restore empty cache.
        this$1._cache = c;
        oldCb(e);
      };
    }
    var tx = this.store.beginTransaction('readwrite');
    var oldParent = path.dirname(oldPath),
      oldName = path.basename(oldPath);
    var newParent = path.dirname(newPath),
      newName = path.basename(newPath);
    var inodes = {};
    var lists = {};
    var errorOccurred = false;
    // Invariant: Can't move a folder inside itself.
    // This funny little hack ensures that the check passes only if oldPath
    // is a subpath of newParent. We append '/' to avoid matching folders that
    // are a substring of the bottom-most folder in the path.
    if ((newParent + '/').indexOf(oldPath + '/') === 0) {
      return cb(new ApiError(ErrorCode.EBUSY, oldParent));
    }
    /**
     * Responsible for Phase 2 of the rename operation: Modifying and
     * committing the directory listings. Called once we have successfully
     * retrieved both the old and new parent's inodes and listings.
     */
    var theOleSwitcharoo = function () {
      // Sanity check: Ensure both paths are present, and no error has occurred.
      if (
        errorOccurred ||
        !lists.hasOwnProperty(oldParent) ||
        !lists.hasOwnProperty(newParent)
      ) {
        return;
      }
      var oldParentList = lists[oldParent],
        oldParentINode = inodes[oldParent],
        newParentList = lists[newParent],
        newParentINode = inodes[newParent];
      // Delete file from old parent.
      if (!oldParentList[oldName]) {
        cb(ApiError.ENOENT(oldPath));
      } else {
        var fileId = oldParentList[oldName];
        delete oldParentList[oldName];
        // Finishes off the renaming process by adding the file to the new
        // parent.
        var completeRename = function () {
          newParentList[newName] = fileId;
          // Commit old parent's list.
          tx.put(
            oldParentINode.id,
            Buffer.from(JSON.stringify(oldParentList)),
            true,
            function (e) {
              if (noErrorTx(e, tx, cb)) {
                if (oldParent === newParent) {
                  // DONE!
                  tx.commit(cb);
                } else {
                  // Commit new parent's list.
                  tx.put(
                    newParentINode.id,
                    Buffer.from(JSON.stringify(newParentList)),
                    true,
                    function (e) {
                      if (noErrorTx(e, tx, cb)) {
                        tx.commit(cb);
                      }
                    }
                  );
                }
              }
            }
          );
        };
        if (newParentList[newName]) {
          // 'newPath' already exists. Check if it's a file or a directory, and
          // act accordingly.
          this$1.getINode(
            tx,
            newPath,
            newParentList[newName],
            function (e, inode) {
              if (noErrorTx(e, tx, cb)) {
                if (inode.isFile()) {
                  // Delete the file and continue.
                  tx.del(inode.id, function (e) {
                    if (noErrorTx(e, tx, cb)) {
                      tx.del(newParentList[newName], function (e) {
                        if (noErrorTx(e, tx, cb)) {
                          completeRename();
                        }
                      });
                    }
                  });
                } else {
                  // Can't overwrite a directory using rename.
                  tx.abort(function (e) {
                    cb(ApiError.EPERM(newPath));
                  });
                }
              }
            }
          );
        } else {
          completeRename();
        }
      }
    };
    /**
     * Grabs a path's inode and directory listing, and shoves it into the
     * inodes and lists hashes.
     */
    var processInodeAndListings = function (p) {
      this$1.findINodeAndDirListing(tx, p, function (e, node, dirList) {
        if (e) {
          if (!errorOccurred) {
            errorOccurred = true;
            tx.abort(function () {
              cb(e);
            });
          }
          // If error has occurred already, just stop here.
        } else {
          inodes[p] = node;
          lists[p] = dirList;
          theOleSwitcharoo();
        }
      });
    };
    processInodeAndListings(oldParent);
    if (oldParent !== newParent) {
      processInodeAndListings(newParent);
    }
  };
  AsyncKeyValueFileSystem.prototype.stat = function stat(p, isLstat, cb) {
    var tx = this.store.beginTransaction('readonly');
    this.findINode(tx, p, function (e, inode) {
      if (noError(e, cb)) {
        cb(null, inode.toStats());
      }
    });
  };
  AsyncKeyValueFileSystem.prototype.createFile = function createFile(
    p,
    flag,
    mode,
    cb
  ) {
    var this$1 = this;

    var tx = this.store.beginTransaction('readwrite'),
      data = emptyBuffer();
    this.commitNewFile(tx, p, FileType.FILE, mode, data, function (e, newFile) {
      if (noError(e, cb)) {
        cb(
          null,
          new AsyncKeyValueFile(this$1, p, flag, newFile.toStats(), data)
        );
      }
    });
  };
  AsyncKeyValueFileSystem.prototype.openFile = function openFile(p, flag, cb) {
    var this$1 = this;

    var tx = this.store.beginTransaction('readonly');
    // Step 1: Grab the file's inode.
    this.findINode(tx, p, function (e, inode) {
      if (noError(e, cb)) {
        // Step 2: Grab the file's data.
        tx.get(inode.id, function (e, data) {
          if (noError(e, cb)) {
            if (data === undefined) {
              cb(ApiError.ENOENT(p));
            } else {
              cb(
                null,
                new AsyncKeyValueFile(this$1, p, flag, inode.toStats(), data)
              );
            }
          }
        });
      }
    });
  };
  AsyncKeyValueFileSystem.prototype.unlink = function unlink(p, cb) {
    this.removeEntry(p, false, cb);
  };
  AsyncKeyValueFileSystem.prototype.rmdir = function rmdir(p, cb) {
    var this$1 = this;

    // Check first if directory is empty.
    this.readdir(p, function (err, files) {
      if (err) {
        cb(err);
      } else if (files.length > 0) {
        cb(ApiError.ENOTEMPTY(p));
      } else {
        this$1.removeEntry(p, true, cb);
      }
    });
  };
  AsyncKeyValueFileSystem.prototype.mkdir = function mkdir(p, mode, cb) {
    var tx = this.store.beginTransaction('readwrite'),
      data = Buffer.from('{}');
    this.commitNewFile(tx, p, FileType.DIRECTORY, mode, data, cb);
  };
  AsyncKeyValueFileSystem.prototype.readdir = function readdir(p, cb) {
    var this$1 = this;

    var tx = this.store.beginTransaction('readonly');
    this.findINode(tx, p, function (e, inode) {
      if (noError(e, cb)) {
        this$1.getDirListing(tx, p, inode, function (e, dirListing) {
          if (noError(e, cb)) {
            cb(null, Object.keys(dirListing));
          }
        });
      }
    });
  };
  AsyncKeyValueFileSystem.prototype._sync = function _sync(p, data, stats, cb) {
    var this$1 = this;

    // @todo Ensure mtime updates properly, and use that to determine if a data
    //       update is required.
    var tx = this.store.beginTransaction('readwrite');
    // Step 1: Get the file node's ID.
    this._findINode(
      tx,
      path.dirname(p),
      path.basename(p),
      function (e, fileInodeId) {
        if (noErrorTx(e, tx, cb)) {
          // Step 2: Get the file inode.
          this$1.getINode(tx, p, fileInodeId, function (e, fileInode) {
            if (noErrorTx(e, tx, cb)) {
              var inodeChanged = fileInode.update(stats);
              // Step 3: Sync the data.
              tx.put(fileInode.id, data, true, function (e) {
                if (noErrorTx(e, tx, cb)) {
                  // Step 4: Sync the metadata (if it changed)!
                  if (inodeChanged) {
                    tx.put(
                      fileInodeId,
                      fileInode.toBuffer(),
                      true,
                      function (e) {
                        if (noErrorTx(e, tx, cb)) {
                          tx.commit(cb);
                        }
                      }
                    );
                  } else {
                    // No need to sync metadata; return.
                    tx.commit(cb);
                  }
                }
              });
            }
          });
        }
      }
    );
  };
  /**
   * Checks if the root directory exists. Creates it if it doesn't.
   */
  AsyncKeyValueFileSystem.prototype.makeRootDirectory =
    function makeRootDirectory(cb) {
      var tx = this.store.beginTransaction('readwrite');
      tx.get(ROOT_NODE_ID, function (e, data) {
        if (e || data === undefined) {
          // Create new inode.
          var currTime = new Date().getTime(),
            // Mode 0666
            dirInode = new Inode(
              GenerateRandomID(),
              4096,
              511 | FileType.DIRECTORY,
              currTime,
              currTime,
              currTime
            );
          // If the root doesn't exist, the first random ID shouldn't exist,
          // either.
          tx.put(dirInode.id, getEmptyDirNode(), false, function (e) {
            if (noErrorTx(e, tx, cb)) {
              tx.put(ROOT_NODE_ID, dirInode.toBuffer(), false, function (e) {
                if (e) {
                  tx.abort(function () {
                    cb(e);
                  });
                } else {
                  tx.commit(cb);
                }
              });
            }
          });
        } else {
          // We're good.
          tx.commit(cb);
        }
      });
    };
  /**
   * Helper function for findINode.
   * @param parent The parent directory of the file we are attempting to find.
   * @param filename The filename of the inode we are attempting to find, minus
   *   the parent.
   * @param cb Passed an error or the ID of the file's inode in the file system.
   */
  AsyncKeyValueFileSystem.prototype._findINode = function _findINode(
    tx,
    parent,
    filename,
    cb
  ) {
    var this$1 = this;

    if (this._cache) {
      var id = this._cache.get(path.join(parent, filename));
      if (id) {
        return cb(null, id);
      }
    }
    var handleDirectoryListings = function (e, inode, dirList) {
      if (e) {
        cb(e);
      } else if (dirList[filename]) {
        var id = dirList[filename];
        if (this$1._cache) {
          this$1._cache.set(path.join(parent, filename), id);
        }
        cb(null, id);
      } else {
        cb(ApiError.ENOENT(path.resolve(parent, filename)));
      }
    };
    if (parent === '/') {
      if (filename === '') {
        // BASE CASE #1: Return the root's ID.
        if (this._cache) {
          this._cache.set(path.join(parent, filename), ROOT_NODE_ID);
        }
        cb(null, ROOT_NODE_ID);
      } else {
        // BASE CASE #2: Find the item in the root node.
        this.getINode(tx, parent, ROOT_NODE_ID, function (e, inode) {
          if (noError(e, cb)) {
            this$1.getDirListing(tx, parent, inode, function (e, dirList) {
              // handle_directory_listings will handle e for us.
              handleDirectoryListings(e, inode, dirList);
            });
          }
        });
      }
    } else {
      // Get the parent directory's INode, and find the file in its directory
      // listing.
      this.findINodeAndDirListing(tx, parent, handleDirectoryListings);
    }
  };
  /**
   * Finds the Inode of the given path.
   * @param p The path to look up.
   * @param cb Passed an error or the Inode of the path p.
   * @todo memoize/cache
   */
  AsyncKeyValueFileSystem.prototype.findINode = function findINode(tx, p, cb) {
    var this$1 = this;

    this._findINode(tx, path.dirname(p), path.basename(p), function (e, id) {
      if (noError(e, cb)) {
        this$1.getINode(tx, p, id, cb);
      }
    });
  };
  /**
   * Given the ID of a node, retrieves the corresponding Inode.
   * @param tx The transaction to use.
   * @param p The corresponding path to the file (used for error messages).
   * @param id The ID to look up.
   * @param cb Passed an error or the inode under the given id.
   */
  AsyncKeyValueFileSystem.prototype.getINode = function getINode(
    tx,
    p,
    id,
    cb
  ) {
    tx.get(id, function (e, data) {
      if (noError(e, cb)) {
        if (data === undefined) {
          cb(ApiError.ENOENT(p));
        } else {
          cb(null, Inode.fromBuffer(data));
        }
      }
    });
  };
  /**
   * Given the Inode of a directory, retrieves the corresponding directory
   * listing.
   */
  AsyncKeyValueFileSystem.prototype.getDirListing = function getDirListing(
    tx,
    p,
    inode,
    cb
  ) {
    if (!inode.isDirectory()) {
      cb(ApiError.ENOTDIR(p));
    } else {
      tx.get(inode.id, function (e, data) {
        if (noError(e, cb)) {
          try {
            cb(null, JSON.parse(data.toString()));
          } catch (e) {
            // Occurs when data is undefined, or corresponds to something other
            // than a directory listing. The latter should never occur unless
            // the file system is corrupted.
            cb(ApiError.ENOENT(p));
          }
        }
      });
    }
  };
  /**
   * Given a path to a directory, retrieves the corresponding INode and
   * directory listing.
   */
  AsyncKeyValueFileSystem.prototype.findINodeAndDirListing =
    function findINodeAndDirListing(tx, p, cb) {
      var this$1 = this;

      this.findINode(tx, p, function (e, inode) {
        if (noError(e, cb)) {
          this$1.getDirListing(tx, p, inode, function (e, listing) {
            if (noError(e, cb)) {
              cb(null, inode, listing);
            }
          });
        }
      });
    };
  /**
   * Adds a new node under a random ID. Retries 5 times before giving up in
   * the exceedingly unlikely chance that we try to reuse a random GUID.
   * @param cb Passed an error or the GUID that the data was stored under.
   */
  AsyncKeyValueFileSystem.prototype.addNewNode = function addNewNode(
    tx,
    data,
    cb
  ) {
    var retries = 0,
      currId;
    var reroll = function () {
      if (++retries === 5) {
        // Max retries hit. Return with an error.
        cb(
          new ApiError(
            ErrorCode.EIO,
            'Unable to commit data to key-value store.'
          )
        );
      } else {
        // Try again.
        currId = GenerateRandomID();
        tx.put(currId, data, false, function (e, committed) {
          if (e || !committed) {
            reroll();
          } else {
            // Successfully stored under 'currId'.
            cb(null, currId);
          }
        });
      }
    };
    reroll();
  };
  /**
   * Commits a new file (well, a FILE or a DIRECTORY) to the file system with
   * the given mode.
   * Note: This will commit the transaction.
   * @param p The path to the new file.
   * @param type The type of the new file.
   * @param mode The mode to create the new file with.
   * @param data The data to store at the file's data node.
   * @param cb Passed an error or the Inode for the new file.
   */
  AsyncKeyValueFileSystem.prototype.commitNewFile = function commitNewFile(
    tx,
    p,
    type,
    mode,
    data,
    cb
  ) {
    var this$1 = this;

    var parentDir = path.dirname(p),
      fname = path.basename(p),
      currTime = new Date().getTime();
    // Invariant: The root always exists.
    // If we don't check this prior to taking steps below, we will create a
    // file with name '' in root should p == '/'.
    if (p === '/') {
      return cb(ApiError.EEXIST(p));
    }
    // Let's build a pyramid of code!
    // Step 1: Get the parent directory's inode and directory listing
    this.findINodeAndDirListing(
      tx,
      parentDir,
      function (e, parentNode, dirListing) {
        if (noErrorTx(e, tx, cb)) {
          if (dirListing[fname]) {
            // File already exists.
            tx.abort(function () {
              cb(ApiError.EEXIST(p));
            });
          } else {
            // Step 2: Commit data to store.
            this$1.addNewNode(tx, data, function (e, dataId) {
              if (noErrorTx(e, tx, cb)) {
                // Step 3: Commit the file's inode to the store.
                var fileInode = new Inode(
                  dataId,
                  data.length,
                  mode | type,
                  currTime,
                  currTime,
                  currTime
                );
                this$1.addNewNode(
                  tx,
                  fileInode.toBuffer(),
                  function (e, fileInodeId) {
                    if (noErrorTx(e, tx, cb)) {
                      // Step 4: Update parent directory's listing.
                      dirListing[fname] = fileInodeId;
                      tx.put(
                        parentNode.id,
                        Buffer.from(JSON.stringify(dirListing)),
                        true,
                        function (e) {
                          if (noErrorTx(e, tx, cb)) {
                            // Step 5: Commit and return the new inode.
                            tx.commit(function (e) {
                              if (noErrorTx(e, tx, cb)) {
                                cb(null, fileInode);
                              }
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        }
      }
    );
  };
  /**
   * Remove all traces of the given path from the file system.
   * @param p The path to remove from the file system.
   * @param isDir Does the path belong to a directory, or a file?
   * @todo Update mtime.
   */
  AsyncKeyValueFileSystem.prototype.removeEntry = function removeEntry(
    p,
    isDir,
    cb
  ) {
    var this$1 = this;

    // Eagerly delete from cache (harmless even if removal fails)
    if (this._cache) {
      this._cache.remove(p);
    }
    var tx = this.store.beginTransaction('readwrite'),
      parent = path.dirname(p),
      fileName = path.basename(p);
    // Step 1: Get parent directory's node and directory listing.
    this.findINodeAndDirListing(
      tx,
      parent,
      function (e, parentNode, parentListing) {
        if (noErrorTx(e, tx, cb)) {
          if (!parentListing[fileName]) {
            tx.abort(function () {
              cb(ApiError.ENOENT(p));
            });
          } else {
            // Remove from directory listing of parent.
            var fileNodeId = parentListing[fileName];
            delete parentListing[fileName];
            // Step 2: Get file inode.
            this$1.getINode(tx, p, fileNodeId, function (e, fileNode) {
              if (noErrorTx(e, tx, cb)) {
                if (!isDir && fileNode.isDirectory()) {
                  tx.abort(function () {
                    cb(ApiError.EISDIR(p));
                  });
                } else if (isDir && !fileNode.isDirectory()) {
                  tx.abort(function () {
                    cb(ApiError.ENOTDIR(p));
                  });
                } else {
                  // Step 3: Delete data.
                  tx.del(fileNode.id, function (e) {
                    if (noErrorTx(e, tx, cb)) {
                      // Step 4: Delete node.
                      tx.del(fileNodeId, function (e) {
                        if (noErrorTx(e, tx, cb)) {
                          // Step 5: Update directory listing.
                          tx.put(
                            parentNode.id,
                            Buffer.from(JSON.stringify(parentListing)),
                            true,
                            function (e) {
                              if (noErrorTx(e, tx, cb)) {
                                tx.commit(cb);
                              }
                            }
                          );
                        }
                      });
                    }
                  });
                }
              }
            });
          }
        }
      }
    );
  };

  return AsyncKeyValueFileSystem;
})(BaseFileSystem);

/**
 * Get the indexedDB constructor for the current browser.
 * @hidden
 */
var indexedDB =
  toExport.indexedDB ||
  toExport.mozIndexedDB ||
  toExport.webkitIndexedDB ||
  toExport.msIndexedDB;
/**
 * Converts a DOMException or a DOMError from an IndexedDB event into a
 * standardized BrowserFS API error.
 * @hidden
 */
function convertError(e, message) {
  if (message === void 0) message = e.toString();

  switch (e.name) {
    case 'NotFoundError':
      return new ApiError(ErrorCode.ENOENT, message);
    case 'QuotaExceededError':
      return new ApiError(ErrorCode.ENOSPC, message);
    default:
      // The rest do not seem to map cleanly to standard error codes.
      return new ApiError(ErrorCode.EIO, message);
  }
}
/**
 * Produces a new onerror handler for IDB. Our errors are always fatal, so we
 * handle them generically: Call the user-supplied callback with a translated
 * version of the error, and let the error bubble up.
 * @hidden
 */
function onErrorHandler(cb, code, message) {
  if (code === void 0) code = ErrorCode.EIO;
  if (message === void 0) message = null;

  return function (e) {
    // Prevent the error from canceling the transaction.
    e.preventDefault();
    cb(new ApiError(code, message !== null ? message : undefined));
  };
}
/**
 * @hidden
 */
var IndexedDBROTransaction = function IndexedDBROTransaction(tx, store) {
  this.tx = tx;
  this.store = store;
};
IndexedDBROTransaction.prototype.get = function get(key, cb) {
  try {
    var r = this.store.get(key);
    r.onerror = onErrorHandler(cb);
    r.onsuccess = function (event) {
      // IDB returns the value 'undefined' when you try to get keys that
      // don't exist. The caller expects this behavior.
      var result = event.target.result;
      if (result === undefined) {
        cb(null, result);
      } else {
        // IDB data is stored as an ArrayBuffer
        cb(null, arrayBuffer2Buffer(result));
      }
    };
  } catch (e) {
    cb(convertError(e));
  }
};
/**
 * @hidden
 */
var IndexedDBRWTransaction = /*@__PURE__*/ (function (IndexedDBROTransaction) {
  function IndexedDBRWTransaction(tx, store) {
    IndexedDBROTransaction.call(this, tx, store);
  }

  if (IndexedDBROTransaction)
    IndexedDBRWTransaction.__proto__ = IndexedDBROTransaction;
  IndexedDBRWTransaction.prototype = Object.create(
    IndexedDBROTransaction && IndexedDBROTransaction.prototype
  );
  IndexedDBRWTransaction.prototype.constructor = IndexedDBRWTransaction;
  IndexedDBRWTransaction.prototype.put = function put(
    key,
    data,
    overwrite,
    cb
  ) {
    try {
      var arraybuffer = buffer2ArrayBuffer(data);
      var r;
      // Note: 'add' will never overwrite an existing key.
      r = overwrite
        ? this.store.put(arraybuffer, key)
        : this.store.add(arraybuffer, key);
      // XXX: NEED TO RETURN FALSE WHEN ADD HAS A KEY CONFLICT. NO ERROR.
      r.onerror = onErrorHandler(cb);
      r.onsuccess = function (event) {
        cb(null, true);
      };
    } catch (e) {
      cb(convertError(e));
    }
  };
  IndexedDBRWTransaction.prototype.del = function del(key, cb) {
    try {
      // NOTE: IE8 has a bug with identifiers named 'delete' unless used as a string
      // like this.
      // http://stackoverflow.com/a/26479152
      var r = this.store['delete'](key);
      r.onerror = onErrorHandler(cb);
      r.onsuccess = function (event) {
        cb();
      };
    } catch (e) {
      cb(convertError(e));
    }
  };
  IndexedDBRWTransaction.prototype.commit = function commit(cb) {
    // Return to the event loop to commit the transaction.
    setTimeout(cb, 0);
  };
  IndexedDBRWTransaction.prototype.abort = function abort(cb) {
    var _e = null;
    try {
      this.tx.abort();
    } catch (e) {
      _e = convertError(e);
    } finally {
      cb(_e);
    }
  };

  return IndexedDBRWTransaction;
})(IndexedDBROTransaction);
var IndexedDBStore = function IndexedDBStore(db, storeName) {
  this.db = db;
  this.storeName = storeName;
};
IndexedDBStore.Create = function Create(storeName, cb) {
  var openReq = indexedDB.open(storeName, 1);
  openReq.onupgradeneeded = function (event) {
    var db = event.target.result;
    // Huh. This should never happen; we're at version 1. Why does another
    // database exist?
    if (db.objectStoreNames.contains(storeName)) {
      db.deleteObjectStore(storeName);
    }
    db.createObjectStore(storeName);
  };
  openReq.onsuccess = function (event) {
    cb(null, new IndexedDBStore(event.target.result, storeName));
  };
  openReq.onerror = onErrorHandler(cb, ErrorCode.EACCES);
};
IndexedDBStore.prototype.name = function name() {
  return IndexedDBFileSystem.Name + ' - ' + this.storeName;
};
IndexedDBStore.prototype.clear = function clear(cb) {
  try {
    var tx = this.db.transaction(this.storeName, 'readwrite'),
      objectStore = tx.objectStore(this.storeName),
      r = objectStore.clear();
    r.onsuccess = function (event) {
      // Use setTimeout to commit transaction.
      setTimeout(cb, 0);
    };
    r.onerror = onErrorHandler(cb);
  } catch (e) {
    cb(convertError(e));
  }
};
IndexedDBStore.prototype.beginTransaction = function beginTransaction(type) {
  if (type === void 0) type = 'readonly';

  var tx = this.db.transaction(this.storeName, type),
    objectStore = tx.objectStore(this.storeName);
  if (type === 'readwrite') {
    return new IndexedDBRWTransaction(tx, objectStore);
  } else if (type === 'readonly') {
    return new IndexedDBROTransaction(tx, objectStore);
  } else {
    throw new ApiError(ErrorCode.EINVAL, 'Invalid transaction type.');
  }
};
/**
 * A file system that uses the IndexedDB key value file system.
 */
var IndexedDBFileSystem = /*@__PURE__*/ (function (AsyncKeyValueFileSystem) {
  function IndexedDBFileSystem(cacheSize) {
    AsyncKeyValueFileSystem.call(this, cacheSize);
  }

  if (AsyncKeyValueFileSystem)
    IndexedDBFileSystem.__proto__ = AsyncKeyValueFileSystem;
  IndexedDBFileSystem.prototype = Object.create(
    AsyncKeyValueFileSystem && AsyncKeyValueFileSystem.prototype
  );
  IndexedDBFileSystem.prototype.constructor = IndexedDBFileSystem;
  /**
   * Constructs an IndexedDB file system with the given options.
   */
  IndexedDBFileSystem.Create = function Create(opts, cb) {
    IndexedDBStore.Create(
      opts.storeName ? opts.storeName : 'browserfs',
      function (e, store) {
        if (store) {
          var idbfs = new IndexedDBFileSystem(
            typeof opts.cacheSize === 'number' ? opts.cacheSize : 100
          );
          idbfs.init(store, function (e) {
            if (e) {
              cb(e);
            } else {
              cb(null, idbfs);
            }
          });
        } else {
          cb(e);
        }
      }
    );
  };
  IndexedDBFileSystem.isAvailable = function isAvailable() {
    // In Safari's private browsing mode, indexedDB.open returns NULL.
    // In Firefox, it throws an exception.
    // In Chrome, it "just works", and clears the database when you leave the page.
    // Untested: Opera, IE.
    try {
      return (
        typeof indexedDB !== 'undefined' &&
        null !== indexedDB.open('__browserfs_test__')
      );
    } catch (e) {
      return false;
    }
  };

  return IndexedDBFileSystem;
})(AsyncKeyValueFileSystem);
IndexedDBFileSystem.Name = 'IndexedDB';
IndexedDBFileSystem.Options = {
  storeName: {
    type: 'string',
    optional: true,
    description:
      'The name of this file system. You can have multiple IndexedDB file systems operating at once, but each must have a different name.',
  },
  cacheSize: {
    type: 'number',
    optional: true,
    description:
      'The size of the inode cache. Defaults to 100. A size of 0 or below disables caching.',
  },
};

/**
 * A simple in-memory key-value store backed by a JavaScript object.
 */
var InMemoryStore = function InMemoryStore() {
  this.store = {};
};
InMemoryStore.prototype.name = function name() {
  return InMemoryFileSystem.Name;
};
InMemoryStore.prototype.clear = function clear() {
  this.store = {};
};
InMemoryStore.prototype.beginTransaction = function beginTransaction(type) {
  return new SimpleSyncRWTransaction(this);
};
InMemoryStore.prototype.get = function get(key) {
  return this.store[key];
};
InMemoryStore.prototype.put = function put(key, data, overwrite) {
  if (!overwrite && this.store.hasOwnProperty(key)) {
    return false;
  }
  this.store[key] = data;
  return true;
};
InMemoryStore.prototype.del = function del(key) {
  delete this.store[key];
};
/**
 * A simple in-memory file system backed by an InMemoryStore.
 * Files are not persisted across page loads.
 */
var InMemoryFileSystem = /*@__PURE__*/ (function (SyncKeyValueFileSystem) {
  function InMemoryFileSystem() {
    SyncKeyValueFileSystem.call(this, {
      store: new InMemoryStore(),
    });
  }

  if (SyncKeyValueFileSystem)
    InMemoryFileSystem.__proto__ = SyncKeyValueFileSystem;
  InMemoryFileSystem.prototype = Object.create(
    SyncKeyValueFileSystem && SyncKeyValueFileSystem.prototype
  );
  InMemoryFileSystem.prototype.constructor = InMemoryFileSystem;
  /**
   * Creates an InMemoryFileSystem instance.
   */
  InMemoryFileSystem.Create = function Create(options, cb) {
    cb(null, new InMemoryFileSystem());
  };

  return InMemoryFileSystem;
})(SyncKeyValueFileSystem);
InMemoryFileSystem.Name = 'InMemory';
InMemoryFileSystem.Options = {};

/**
 * Some versions of FF and all versions of IE do not support the full range of
 * 16-bit numbers encoded as characters, as they enforce UTF-16 restrictions.
 * @url http://stackoverflow.com/questions/11170716/are-there-any-characters-that-are-not-allowed-in-localstorage/11173673#11173673
 * @hidden
 */
var supportsBinaryString = false,
  binaryEncoding;
try {
  toExport.localStorage.setItem('__test__', String.fromCharCode(0xd800));
  supportsBinaryString =
    toExport.localStorage.getItem('__test__') === String.fromCharCode(0xd800);
} catch (e) {
  // IE throws an exception.
  supportsBinaryString = false;
}
binaryEncoding = supportsBinaryString ? 'binary_string' : 'binary_string_ie';
if (!Buffer.isEncoding(binaryEncoding)) {
  // Fallback for non BrowserFS implementations of buffer that lack a
  // binary_string format.
  binaryEncoding = 'base64';
}
/**
 * A synchronous key-value store backed by localStorage.
 */
var LocalStorageStore = function LocalStorageStore() {};

LocalStorageStore.prototype.name = function name() {
  return LocalStorageFileSystem.Name;
};
LocalStorageStore.prototype.clear = function clear() {
  toExport.localStorage.clear();
};
LocalStorageStore.prototype.beginTransaction = function beginTransaction(type) {
  // No need to differentiate.
  return new SimpleSyncRWTransaction(this);
};
LocalStorageStore.prototype.get = function get(key) {
  try {
    var data = toExport.localStorage.getItem(key);
    if (data !== null) {
      return Buffer.from(data, binaryEncoding);
    }
  } catch (e) {
    // Do nothing.
  }
  // Key doesn't exist, or a failure occurred.
  return undefined;
};
LocalStorageStore.prototype.put = function put(key, data, overwrite) {
  try {
    if (!overwrite && toExport.localStorage.getItem(key) !== null) {
      // Don't want to overwrite the key!
      return false;
    }
    toExport.localStorage.setItem(key, data.toString(binaryEncoding));
    return true;
  } catch (e) {
    throw new ApiError(ErrorCode.ENOSPC, 'LocalStorage is full.');
  }
};
LocalStorageStore.prototype.del = function del(key) {
  try {
    toExport.localStorage.removeItem(key);
  } catch (e) {
    throw new ApiError(ErrorCode.EIO, 'Unable to delete key ' + key + ': ' + e);
  }
};
/**
 * A synchronous file system backed by localStorage. Connects our
 * LocalStorageStore to our SyncKeyValueFileSystem.
 */
var LocalStorageFileSystem = /*@__PURE__*/ (function (SyncKeyValueFileSystem) {
  function LocalStorageFileSystem() {
    SyncKeyValueFileSystem.call(this, {
      store: new LocalStorageStore(),
    });
  }

  if (SyncKeyValueFileSystem)
    LocalStorageFileSystem.__proto__ = SyncKeyValueFileSystem;
  LocalStorageFileSystem.prototype = Object.create(
    SyncKeyValueFileSystem && SyncKeyValueFileSystem.prototype
  );
  LocalStorageFileSystem.prototype.constructor = LocalStorageFileSystem;
  /**
   * Creates a LocalStorageFileSystem instance.
   */
  LocalStorageFileSystem.Create = function Create(options, cb) {
    cb(null, new LocalStorageFileSystem());
  };
  LocalStorageFileSystem.isAvailable = function isAvailable() {
    return typeof toExport.localStorage !== 'undefined';
  };

  return LocalStorageFileSystem;
})(SyncKeyValueFileSystem);
LocalStorageFileSystem.Name = 'LocalStorage';
LocalStorageFileSystem.Options = {};

/**
 * The MountableFileSystem allows you to mount multiple backend types or
 * multiple instantiations of the same backend into a single file system tree.
 * The file systems do not need to know about each other; all interactions are
 * automatically facilitated through this interface.
 *
 * For example, if a file system is mounted at /mnt/blah, and a request came in
 * for /mnt/blah/foo.txt, the file system would see a request for /foo.txt.
 *
 * You can mount file systems when you configure the file system:
 * ```javascript
 * BrowserFS.configure({
 *   fs: "MountableFileSystem",
 *   options: {
 *     '/data': { fs: 'HTTPRequest', options: { index: "http://mysite.com/files/index.json" } },
 *     '/home': { fs: 'LocalStorage' }
 *   }
 * }, function(e) {
 *
 * });
 * ```
 *
 * For advanced users, you can also mount file systems *after* MFS is constructed:
 * ```javascript
 * BrowserFS.FileSystem.HTTPRequest.Create({
 *   index: "http://mysite.com/files/index.json"
 * }, function(e, xhrfs) {
 *   BrowserFS.FileSystem.MountableFileSystem.Create({
 *     '/data': xhrfs
 *   }, function(e, mfs) {
 *     BrowserFS.initialize(mfs);
 *
 *     // Added after-the-fact...
 *     BrowserFS.FileSystem.LocalStorage.Create(function(e, lsfs) {
 *       mfs.mount('/home', lsfs);
 *     });
 *   });
 * });
 * ```
 *
 * Since MountableFileSystem simply proxies requests to mounted file systems, it supports all of the operations that the mounted file systems support.
 *
 * With no mounted file systems, `MountableFileSystem` acts as a simple `InMemory` filesystem.
 */
var MountableFileSystem = /*@__PURE__*/ (function (BaseFileSystem) {
  function MountableFileSystem(rootFs) {
    BaseFileSystem.call(this);
    // Contains the list of mount points in mntMap, sorted by string length in decreasing order.
    // Ensures that we scan the most specific mount points for a match first, which lets us
    // nest mount points.
    this.mountList = [];
    this.mntMap = {};
    this.rootFs = rootFs;
  }

  if (BaseFileSystem) MountableFileSystem.__proto__ = BaseFileSystem;
  MountableFileSystem.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  MountableFileSystem.prototype.constructor = MountableFileSystem;
  /**
   * Creates a MountableFileSystem instance with the given options.
   */
  MountableFileSystem.Create = function Create(opts, cb) {
    InMemoryFileSystem.Create({}, function (e, imfs) {
      if (imfs) {
        var fs = new MountableFileSystem(imfs);
        try {
          Object.keys(opts).forEach(function (mountPoint) {
            fs.mount(mountPoint, opts[mountPoint]);
          });
        } catch (e) {
          return cb(e);
        }
        cb(null, fs);
      } else {
        cb(e);
      }
    });
  };
  MountableFileSystem.isAvailable = function isAvailable() {
    return true;
  };
  /**
   * Mounts the file system at the given mount point.
   */
  MountableFileSystem.prototype.mount = function mount(mountPoint, fs) {
    if (mountPoint[0] !== '/') {
      mountPoint = '/' + mountPoint;
    }
    mountPoint = path.resolve(mountPoint);
    if (this.mntMap[mountPoint]) {
      throw new ApiError(
        ErrorCode.EINVAL,
        'Mount point ' + mountPoint + ' is already taken.'
      );
    }
    mkdirpSync(mountPoint, 0x1ff, this.rootFs);
    this.mntMap[mountPoint] = fs;
    this.mountList.push(mountPoint);
    this.mountList = this.mountList.sort(function (a, b) {
      return b.length - a.length;
    });
  };
  MountableFileSystem.prototype.umount = function umount(mountPoint) {
    if (mountPoint[0] !== '/') {
      mountPoint = '/' + mountPoint;
    }
    mountPoint = path.resolve(mountPoint);
    if (!this.mntMap[mountPoint]) {
      throw new ApiError(
        ErrorCode.EINVAL,
        'Mount point ' + mountPoint + ' is already unmounted.'
      );
    }
    delete this.mntMap[mountPoint];
    this.mountList.splice(this.mountList.indexOf(mountPoint), 1);
    while (mountPoint !== '/') {
      if (this.rootFs.readdirSync(mountPoint).length === 0) {
        this.rootFs.rmdirSync(mountPoint);
        mountPoint = path.dirname(mountPoint);
      } else {
        break;
      }
    }
  };
  /**
   * Returns the file system that the path points to.
   */
  MountableFileSystem.prototype._getFs = function _getFs(path) {
    var mountList = this.mountList,
      len = mountList.length;
    for (var i = 0; i < len; i++) {
      var mountPoint = mountList[i];
      // We know path is normalized, so it is a substring of the mount point.
      if (mountPoint.length <= path.length && path.indexOf(mountPoint) === 0) {
        path = path.substr(mountPoint.length > 1 ? mountPoint.length : 0);
        if (path === '') {
          path = '/';
        }
        return {
          fs: this.mntMap[mountPoint],
          path: path,
          mountPoint: mountPoint,
        };
      }
    }
    // Query our root file system.
    return {
      fs: this.rootFs,
      path: path,
      mountPoint: '/',
    };
  };
  // Global information methods
  MountableFileSystem.prototype.getName = function getName() {
    return MountableFileSystem.Name;
  };
  MountableFileSystem.prototype.diskSpace = function diskSpace(path, cb) {
    cb(0, 0);
  };
  MountableFileSystem.prototype.isReadOnly = function isReadOnly() {
    return false;
  };
  MountableFileSystem.prototype.supportsLinks = function supportsLinks() {
    // I'm not ready for cross-FS links yet.
    return false;
  };
  MountableFileSystem.prototype.supportsProps = function supportsProps() {
    return false;
  };
  MountableFileSystem.prototype.supportsSynch = function supportsSynch() {
    return true;
  };
  /**
   * Fixes up error messages so they mention the mounted file location relative
   * to the MFS root, not to the particular FS's root.
   * Mutates the input error, and returns it.
   */
  MountableFileSystem.prototype.standardizeError = function standardizeError(
    err,
    path,
    realPath
  ) {
    var index = err.message.indexOf(path);
    if (index !== -1) {
      err.message =
        err.message.substr(0, index) +
        realPath +
        err.message.substr(index + path.length);
      err.path = realPath;
    }
    return err;
  };
  // The following methods involve multiple file systems, and thus have custom
  // logic.
  // Note that we go through the Node API to use its robust default argument
  // processing.
  MountableFileSystem.prototype.rename = function rename(oldPath, newPath, cb) {
    var this$1 = this;

    // Scenario 1: old and new are on same FS.
    var fs1rv = this._getFs(oldPath);
    var fs2rv = this._getFs(newPath);
    if (fs1rv.fs === fs2rv.fs) {
      return fs1rv.fs.rename(fs1rv.path, fs2rv.path, function (e) {
        if (e) {
          this$1.standardizeError(
            this$1.standardizeError(e, fs1rv.path, oldPath),
            fs2rv.path,
            newPath
          );
        }
        cb(e);
      });
    }
    // Scenario 2: Different file systems.
    // Read old file, write new file, delete old file.
    return _fsMock.readFile(oldPath, function (err, data) {
      if (err) {
        return cb(err);
      }
      _fsMock.writeFile(newPath, data, function (err) {
        if (err) {
          return cb(err);
        }
        _fsMock.unlink(oldPath, cb);
      });
    });
  };
  MountableFileSystem.prototype.renameSync = function renameSync(
    oldPath,
    newPath
  ) {
    // Scenario 1: old and new are on same FS.
    var fs1rv = this._getFs(oldPath);
    var fs2rv = this._getFs(newPath);
    if (fs1rv.fs === fs2rv.fs) {
      try {
        return fs1rv.fs.renameSync(fs1rv.path, fs2rv.path);
      } catch (e) {
        this.standardizeError(
          this.standardizeError(e, fs1rv.path, oldPath),
          fs2rv.path,
          newPath
        );
        throw e;
      }
    }
    // Scenario 2: Different file systems.
    var data = _fsMock.readFileSync(oldPath);
    _fsMock.writeFileSync(newPath, data);
    return _fsMock.unlinkSync(oldPath);
  };
  MountableFileSystem.prototype.readdirSync = function readdirSync(p) {
    var fsInfo = this._getFs(p);
    // If null, rootfs did not have the directory
    // (or the target FS is the root fs).
    var rv = null;
    // Mount points are all defined in the root FS.
    // Ensure that we list those, too.
    if (fsInfo.fs !== this.rootFs) {
      try {
        rv = this.rootFs.readdirSync(p);
      } catch (e) {
        // Ignore.
      }
    }
    try {
      var rv2 = fsInfo.fs.readdirSync(fsInfo.path);
      if (rv === null) {
        return rv2;
      } else {
        // Filter out duplicates.
        return rv2.concat(
          rv.filter(function (val) {
            return rv2.indexOf(val) === -1;
          })
        );
      }
    } catch (e) {
      if (rv === null) {
        throw this.standardizeError(e, fsInfo.path, p);
      } else {
        // The root FS had something.
        return rv;
      }
    }
  };
  MountableFileSystem.prototype.readdir = function readdir(p, cb) {
    var this$1 = this;

    var fsInfo = this._getFs(p);
    fsInfo.fs.readdir(fsInfo.path, function (err, files) {
      if (fsInfo.fs !== this$1.rootFs) {
        try {
          var rv = this$1.rootFs.readdirSync(p);
          if (files) {
            // Filter out duplicates.
            files = files.concat(
              rv.filter(function (val) {
                return files.indexOf(val) === -1;
              })
            );
          } else {
            files = rv;
          }
        } catch (e) {
          // Root FS and target FS did not have directory.
          if (err) {
            return cb(this$1.standardizeError(err, fsInfo.path, p));
          }
        }
      } else if (err) {
        // Root FS and target FS are the same, and did not have directory.
        return cb(this$1.standardizeError(err, fsInfo.path, p));
      }
      cb(null, files);
    });
  };
  MountableFileSystem.prototype.realpathSync = function realpathSync(p, cache) {
    var fsInfo = this._getFs(p);
    try {
      var mountedPath = fsInfo.fs.realpathSync(fsInfo.path, {});
      // resolve is there to remove any trailing slash that may be present
      return path.resolve(path.join(fsInfo.mountPoint, mountedPath));
    } catch (e) {
      throw this.standardizeError(e, fsInfo.path, p);
    }
  };
  MountableFileSystem.prototype.realpath = function realpath(p, cache, cb) {
    var this$1 = this;

    var fsInfo = this._getFs(p);
    fsInfo.fs.realpath(fsInfo.path, {}, function (err, rv) {
      if (err) {
        cb(this$1.standardizeError(err, fsInfo.path, p));
      } else {
        // resolve is there to remove any trailing slash that may be present
        cb(null, path.resolve(path.join(fsInfo.mountPoint, rv)));
      }
    });
  };
  MountableFileSystem.prototype.rmdirSync = function rmdirSync(p) {
    var fsInfo = this._getFs(p);
    if (this._containsMountPt(p)) {
      throw ApiError.ENOTEMPTY(p);
    } else {
      try {
        fsInfo.fs.rmdirSync(fsInfo.path);
      } catch (e) {
        throw this.standardizeError(e, fsInfo.path, p);
      }
    }
  };
  MountableFileSystem.prototype.rmdir = function rmdir(p, cb) {
    var this$1 = this;

    var fsInfo = this._getFs(p);
    if (this._containsMountPt(p)) {
      cb(ApiError.ENOTEMPTY(p));
    } else {
      fsInfo.fs.rmdir(fsInfo.path, function (err) {
        cb(err ? this$1.standardizeError(err, fsInfo.path, p) : null);
      });
    }
  };
  /**
   * Returns true if the given path contains a mount point.
   */
  MountableFileSystem.prototype._containsMountPt = function _containsMountPt(
    p
  ) {
    var mountPoints = this.mountList,
      len = mountPoints.length;
    for (var i = 0; i < len; i++) {
      var pt = mountPoints[i];
      if (pt.length >= p.length && pt.slice(0, p.length) === p) {
        return true;
      }
    }
    return false;
  };

  return MountableFileSystem;
})(BaseFileSystem);
MountableFileSystem.Name = 'MountableFileSystem';
MountableFileSystem.Options = {};
/**
 * Tricky: Define all of the functions that merely forward arguments to the
 * relevant file system, or return/throw an error.
 * Take advantage of the fact that the *first* argument is always the path, and
 * the *last* is the callback function (if async).
 * @todo Can use numArgs to make proxying more efficient.
 * @hidden
 */
function defineFcn(name, isSync, numArgs) {
  if (isSync) {
    return function () {
      var args = [],
        len = arguments.length;
      while (len--) args[len] = arguments[len];

      var path = args[0];
      var rv = this._getFs(path);
      args[0] = rv.path;
      try {
        return rv.fs[name].apply(rv.fs, args);
      } catch (e) {
        this.standardizeError(e, rv.path, path);
        throw e;
      }
    };
  } else {
    return function () {
      var this$1 = this;
      var args = [],
        len = arguments.length;
      while (len--) args[len] = arguments[len];

      var path = args[0];
      var rv = this._getFs(path);
      args[0] = rv.path;
      if (typeof args[args.length - 1] === 'function') {
        var cb = args[args.length - 1];
        args[args.length - 1] = function () {
          var args = [],
            len = arguments.length;
          while (len--) args[len] = arguments[len];

          if (args.length > 0 && args[0] instanceof ApiError) {
            this$1.standardizeError(args[0], rv.path, path);
          }
          cb.apply(null, args);
        };
      }
      return rv.fs[name].apply(rv.fs, args);
    };
  }
}
/**
 * @hidden
 */
var fsCmdMap = [
  // 1 arg functions
  ['exists', 'unlink', 'readlink'],
  // 2 arg functions
  ['stat', 'mkdir', 'truncate'],
  // 3 arg functions
  ['open', 'readFile', 'chmod', 'utimes'],
  // 4 arg functions
  ['chown'],
  // 5 arg functions
  ['writeFile', 'appendFile'],
];
for (var i = 0; i < fsCmdMap.length; i++) {
  var cmds = fsCmdMap[i];
  for (var i$1 = 0, list = cmds; i$1 < list.length; i$1 += 1) {
    var fnName = list[i$1];

    MountableFileSystem.prototype[fnName] = defineFcn(fnName, false, i + 1);
    MountableFileSystem.prototype[fnName + 'Sync'] = defineFcn(
      fnName + 'Sync',
      true,
      i + 1
    );
  }
}

/**
 * Non-recursive mutex
 * @hidden
 */
var Mutex = function Mutex() {
  this._locked = false;
  this._waiters = [];
};
Mutex.prototype.lock = function lock(cb) {
  if (this._locked) {
    this._waiters.push(cb);
    return;
  }
  this._locked = true;
  cb();
};
Mutex.prototype.unlock = function unlock() {
  if (!this._locked) {
    throw new Error('unlock of a non-locked mutex');
  }
  var next = this._waiters.shift();
  // don't unlock - we want to queue up next for the
  // _end_ of the current task execution, but we don't
  // want it to be called inline with whatever the
  // current stack is.  This way we still get the nice
  // behavior that an unlock immediately followed by a
  // lock won't cause starvation.
  if (next) {
    setImmediate$1(next);
    return;
  }
  this._locked = false;
};
Mutex.prototype.tryLock = function tryLock() {
  if (this._locked) {
    return false;
  }
  this._locked = true;
  return true;
};
Mutex.prototype.isLocked = function isLocked() {
  return this._locked;
};

/**
 * This class serializes access to an underlying async filesystem.
 * For example, on an OverlayFS instance with an async lower
 * directory operations like rename and rmdir may involve multiple
 * requests involving both the upper and lower filesystems -- they
 * are not executed in a single atomic step.  OverlayFS uses this
 * LockedFS to avoid having to reason about the correctness of
 * multiple requests interleaving.
 */
var LockedFS = function LockedFS(fs) {
  this._fs = fs;
  this._mu = new Mutex();
};
LockedFS.prototype.getName = function getName() {
  return 'LockedFS<' + this._fs.getName() + '>';
};
LockedFS.prototype.getFSUnlocked = function getFSUnlocked() {
  return this._fs;
};
LockedFS.prototype.diskSpace = function diskSpace(p, cb) {
  // FIXME: should this lock?
  this._fs.diskSpace(p, cb);
};
LockedFS.prototype.isReadOnly = function isReadOnly() {
  return this._fs.isReadOnly();
};
LockedFS.prototype.supportsLinks = function supportsLinks() {
  return this._fs.supportsLinks();
};
LockedFS.prototype.supportsProps = function supportsProps() {
  return this._fs.supportsProps();
};
LockedFS.prototype.supportsSynch = function supportsSynch() {
  return this._fs.supportsSynch();
};
LockedFS.prototype.rename = function rename(oldPath, newPath, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.rename(oldPath, newPath, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.renameSync = function renameSync(oldPath, newPath) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.renameSync(oldPath, newPath);
};
LockedFS.prototype.stat = function stat(p, isLstat, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.stat(p, isLstat, function (err, stat) {
      this$1._mu.unlock();
      cb(err, stat);
    });
  });
};
LockedFS.prototype.statSync = function statSync(p, isLstat) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.statSync(p, isLstat);
};
LockedFS.prototype.open = function open(p, flag, mode, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.open(p, flag, mode, function (err, fd) {
      this$1._mu.unlock();
      cb(err, fd);
    });
  });
};
LockedFS.prototype.openSync = function openSync(p, flag, mode) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.openSync(p, flag, mode);
};
LockedFS.prototype.unlink = function unlink(p, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.unlink(p, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.unlinkSync = function unlinkSync(p) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.unlinkSync(p);
};
LockedFS.prototype.rmdir = function rmdir(p, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.rmdir(p, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.rmdirSync = function rmdirSync(p) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.rmdirSync(p);
};
LockedFS.prototype.mkdir = function mkdir(p, mode, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.mkdir(p, mode, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.mkdirSync = function mkdirSync(p, mode) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.mkdirSync(p, mode);
};
LockedFS.prototype.readdir = function readdir(p, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.readdir(p, function (err, files) {
      this$1._mu.unlock();
      cb(err, files);
    });
  });
};
LockedFS.prototype.readdirSync = function readdirSync(p) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.readdirSync(p);
};
LockedFS.prototype.exists = function exists(p, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.exists(p, function (exists) {
      this$1._mu.unlock();
      cb(exists);
    });
  });
};
LockedFS.prototype.existsSync = function existsSync(p) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.existsSync(p);
};
LockedFS.prototype.realpath = function realpath(p, cache, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.realpath(p, cache, function (err, resolvedPath) {
      this$1._mu.unlock();
      cb(err, resolvedPath);
    });
  });
};
LockedFS.prototype.realpathSync = function realpathSync(p, cache) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.realpathSync(p, cache);
};
LockedFS.prototype.truncate = function truncate(p, len, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.truncate(p, len, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.truncateSync = function truncateSync(p, len) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.truncateSync(p, len);
};
LockedFS.prototype.readFile = function readFile(fname, encoding, flag, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.readFile(fname, encoding, flag, function (err, data) {
      this$1._mu.unlock();
      cb(err, data);
    });
  });
};
LockedFS.prototype.readFileSync = function readFileSync(fname, encoding, flag) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.readFileSync(fname, encoding, flag);
};
LockedFS.prototype.writeFile = function writeFile(
  fname,
  data,
  encoding,
  flag,
  mode,
  cb
) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.writeFile(fname, data, encoding, flag, mode, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.writeFileSync = function writeFileSync(
  fname,
  data,
  encoding,
  flag,
  mode
) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.writeFileSync(fname, data, encoding, flag, mode);
};
LockedFS.prototype.appendFile = function appendFile(
  fname,
  data,
  encoding,
  flag,
  mode,
  cb
) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.appendFile(fname, data, encoding, flag, mode, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.appendFileSync = function appendFileSync(
  fname,
  data,
  encoding,
  flag,
  mode
) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.appendFileSync(fname, data, encoding, flag, mode);
};
LockedFS.prototype.chmod = function chmod(p, isLchmod, mode, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.chmod(p, isLchmod, mode, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.chmodSync = function chmodSync(p, isLchmod, mode) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.chmodSync(p, isLchmod, mode);
};
LockedFS.prototype.chown = function chown(p, isLchown, uid, gid, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.chown(p, isLchown, uid, gid, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.chownSync = function chownSync(p, isLchown, uid, gid) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.chownSync(p, isLchown, uid, gid);
};
LockedFS.prototype.utimes = function utimes(p, atime, mtime, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.utimes(p, atime, mtime, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.utimesSync = function utimesSync(p, atime, mtime) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.utimesSync(p, atime, mtime);
};
LockedFS.prototype.link = function link(srcpath, dstpath, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.link(srcpath, dstpath, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.linkSync = function linkSync(srcpath, dstpath) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.linkSync(srcpath, dstpath);
};
LockedFS.prototype.symlink = function symlink(srcpath, dstpath, type, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.symlink(srcpath, dstpath, type, function (err) {
      this$1._mu.unlock();
      cb(err);
    });
  });
};
LockedFS.prototype.symlinkSync = function symlinkSync(srcpath, dstpath, type) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.symlinkSync(srcpath, dstpath, type);
};
LockedFS.prototype.readlink = function readlink(p, cb) {
  var this$1 = this;

  this._mu.lock(function () {
    this$1._fs.readlink(p, function (err, linkString) {
      this$1._mu.unlock();
      cb(err, linkString);
    });
  });
};
LockedFS.prototype.readlinkSync = function readlinkSync(p) {
  if (this._mu.isLocked()) {
    throw new Error('invalid sync call');
  }
  return this._fs.readlinkSync(p);
};

/**
 * @hidden
 */
var deletionLogPath = '/.deletedFiles.log';
/**
 * Given a read-only mode, makes it writable.
 * @hidden
 */
function makeModeWritable(mode) {
  return 146 | mode;
}
/**
 * @hidden
 */
function getFlag(f) {
  return FileFlag.getFileFlag(f);
}
/**
 * Overlays a RO file to make it writable.
 */
var OverlayFile = /*@__PURE__*/ (function (PreloadFile) {
  function OverlayFile(fs, path, flag, stats, data) {
    PreloadFile.call(this, fs, path, flag, stats, data);
  }

  if (PreloadFile) OverlayFile.__proto__ = PreloadFile;
  OverlayFile.prototype = Object.create(PreloadFile && PreloadFile.prototype);
  OverlayFile.prototype.constructor = OverlayFile;
  OverlayFile.prototype.sync = function sync(cb) {
    var this$1 = this;

    if (!this.isDirty()) {
      cb(null);
      return;
    }
    this._fs._syncAsync(this, function (err) {
      this$1.resetDirty();
      cb(err);
    });
  };
  OverlayFile.prototype.syncSync = function syncSync() {
    if (this.isDirty()) {
      this._fs._syncSync(this);
      this.resetDirty();
    }
  };
  OverlayFile.prototype.close = function close(cb) {
    this.sync(cb);
  };
  OverlayFile.prototype.closeSync = function closeSync() {
    this.syncSync();
  };

  return OverlayFile;
})(PreloadFile);
/**
 * *INTERNAL, DO NOT USE DIRECTLY!*
 *
 * Core OverlayFS class that contains no locking whatsoever. We wrap these objects
 * in a LockedFS to prevent races.
 */
var UnlockedOverlayFS = /*@__PURE__*/ (function (BaseFileSystem) {
  function UnlockedOverlayFS(writable, readable) {
    BaseFileSystem.call(this);
    this._isInitialized = false;
    this._initializeCallbacks = [];
    this._deletedFiles = {};
    this._deleteLog = '';
    // If 'true', we have scheduled a delete log update.
    this._deleteLogUpdatePending = false;
    // If 'true', a delete log update is needed after the scheduled delete log
    // update finishes.
    this._deleteLogUpdateNeeded = false;
    // If there was an error updating the delete log...
    this._deleteLogError = null;
    this._writable = writable;
    this._readable = readable;
    if (this._writable.isReadOnly()) {
      throw new ApiError(
        ErrorCode.EINVAL,
        'Writable file system must be writable.'
      );
    }
  }

  if (BaseFileSystem) UnlockedOverlayFS.__proto__ = BaseFileSystem;
  UnlockedOverlayFS.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  UnlockedOverlayFS.prototype.constructor = UnlockedOverlayFS;
  UnlockedOverlayFS.isAvailable = function isAvailable() {
    return true;
  };
  UnlockedOverlayFS.prototype.getOverlayedFileSystems =
    function getOverlayedFileSystems() {
      return {
        readable: this._readable,
        writable: this._writable,
      };
    };
  UnlockedOverlayFS.prototype._syncAsync = function _syncAsync(file, cb) {
    var this$1 = this;

    this.createParentDirectoriesAsync(file.getPath(), function (err) {
      if (err) {
        return cb(err);
      }
      this$1._writable.writeFile(
        file.getPath(),
        file.getBuffer(),
        null,
        getFlag('w'),
        file.getStats().mode,
        cb
      );
    });
  };
  UnlockedOverlayFS.prototype._syncSync = function _syncSync(file) {
    this.createParentDirectories(file.getPath());
    this._writable.writeFileSync(
      file.getPath(),
      file.getBuffer(),
      null,
      getFlag('w'),
      file.getStats().mode
    );
  };
  UnlockedOverlayFS.prototype.getName = function getName() {
    return OverlayFS.Name;
  };
  /**
   * **INTERNAL METHOD**
   *
   * Called once to load up metadata stored on the writable file system.
   */
  UnlockedOverlayFS.prototype._initialize = function _initialize(cb) {
    var this$1 = this;

    var callbackArray = this._initializeCallbacks;
    var end = function (e) {
      this$1._isInitialized = !e;
      this$1._initializeCallbacks = [];
      callbackArray.forEach(function (cb) {
        return cb(e);
      });
    };
    // if we're already initialized, immediately invoke the callback
    if (this._isInitialized) {
      return cb();
    }
    callbackArray.push(cb);
    // The first call to initialize initializes, the rest wait for it to complete.
    if (callbackArray.length !== 1) {
      return;
    }
    // Read deletion log, process into metadata.
    this._writable.readFile(
      deletionLogPath,
      'utf8',
      getFlag('r'),
      function (err, data) {
        if (err) {
          // ENOENT === Newly-instantiated file system, and thus empty log.
          if (err.errno !== ErrorCode.ENOENT) {
            return end(err);
          }
        } else {
          this$1._deleteLog = data;
        }
        this$1._reparseDeletionLog();
        end();
      }
    );
  };
  UnlockedOverlayFS.prototype.isReadOnly = function isReadOnly() {
    return false;
  };
  UnlockedOverlayFS.prototype.supportsSynch = function supportsSynch() {
    return this._readable.supportsSynch() && this._writable.supportsSynch();
  };
  UnlockedOverlayFS.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  UnlockedOverlayFS.prototype.supportsProps = function supportsProps() {
    return this._readable.supportsProps() && this._writable.supportsProps();
  };
  UnlockedOverlayFS.prototype.getDeletionLog = function getDeletionLog() {
    return this._deleteLog;
  };
  UnlockedOverlayFS.prototype.restoreDeletionLog = function restoreDeletionLog(
    log
  ) {
    this._deleteLog = log;
    this._reparseDeletionLog();
    this.updateLog('');
  };
  UnlockedOverlayFS.prototype.rename = function rename(oldPath, newPath, cb) {
    var this$1 = this;

    if (
      !this.checkInitAsync(cb) ||
      this.checkPathAsync(oldPath, cb) ||
      this.checkPathAsync(newPath, cb)
    ) {
      return;
    }
    if (oldPath === deletionLogPath || newPath === deletionLogPath) {
      return cb(ApiError.EPERM('Cannot rename deletion log.'));
    }
    // nothing to do if paths match
    if (oldPath === newPath) {
      return cb();
    }
    this.stat(oldPath, false, function (oldErr, oldStats) {
      if (oldErr) {
        return cb(oldErr);
      }
      return this$1.stat(newPath, false, function (newErr, newStats) {
        var self = this$1;
        // precondition: both oldPath and newPath exist and are dirs.
        // decreases: |files|
        // Need to move *every file/folder* currently stored on
        // readable to its new location on writable.
        function copyDirContents(files) {
          var file = files.shift();
          if (!file) {
            return cb();
          }
          var oldFile = path.resolve(oldPath, file);
          var newFile = path.resolve(newPath, file);
          // Recursion! Should work for any nested files / folders.
          self.rename(oldFile, newFile, function (err) {
            if (err) {
              return cb(err);
            }
            copyDirContents(files);
          });
        }
        var mode = 511;
        // from linux's rename(2) manpage: oldpath can specify a
        // directory.  In this case, newpath must either not exist, or
        // it must specify an empty directory.
        if (oldStats.isDirectory()) {
          if (newErr) {
            if (newErr.errno !== ErrorCode.ENOENT) {
              return cb(newErr);
            }
            return this$1._writable.exists(oldPath, function (exists) {
              // simple case - both old and new are on the writable layer
              if (exists) {
                return this$1._writable.rename(oldPath, newPath, cb);
              }
              this$1._writable.mkdir(newPath, mode, function (mkdirErr) {
                if (mkdirErr) {
                  return cb(mkdirErr);
                }
                this$1._readable.readdir(oldPath, function (err, files) {
                  if (err) {
                    return cb();
                  }
                  copyDirContents(files);
                });
              });
            });
          }
          mode = newStats.mode;
          if (!newStats.isDirectory()) {
            return cb(ApiError.ENOTDIR(newPath));
          }
          this$1.readdir(newPath, function (readdirErr, files) {
            if (files && files.length) {
              return cb(ApiError.ENOTEMPTY(newPath));
            }
            this$1._readable.readdir(oldPath, function (err, files) {
              if (err) {
                return cb();
              }
              copyDirContents(files);
            });
          });
        }
        if (newStats && newStats.isDirectory()) {
          return cb(ApiError.EISDIR(newPath));
        }
        this$1.readFile(oldPath, null, getFlag('r'), function (err, data) {
          if (err) {
            return cb(err);
          }
          return this$1.writeFile(
            newPath,
            data,
            null,
            getFlag('w'),
            oldStats.mode,
            function (err) {
              if (err) {
                return cb(err);
              }
              return this$1.unlink(oldPath, cb);
            }
          );
        });
      });
    });
  };
  UnlockedOverlayFS.prototype.renameSync = function renameSync(
    oldPath,
    newPath
  ) {
    var this$1 = this;

    this.checkInitialized();
    this.checkPath(oldPath);
    this.checkPath(newPath);
    if (oldPath === deletionLogPath || newPath === deletionLogPath) {
      throw ApiError.EPERM('Cannot rename deletion log.');
    }
    // Write newPath using oldPath's contents, delete oldPath.
    var oldStats = this.statSync(oldPath, false);
    if (oldStats.isDirectory()) {
      // Optimization: Don't bother moving if old === new.
      if (oldPath === newPath) {
        return;
      }
      var mode = 511;
      if (this.existsSync(newPath)) {
        var stats = this.statSync(newPath, false);
        mode = stats.mode;
        if (stats.isDirectory()) {
          if (this.readdirSync(newPath).length > 0) {
            throw ApiError.ENOTEMPTY(newPath);
          }
        } else {
          throw ApiError.ENOTDIR(newPath);
        }
      }
      // Take care of writable first. Move any files there, or create an empty directory
      // if it doesn't exist.
      if (this._writable.existsSync(oldPath)) {
        this._writable.renameSync(oldPath, newPath);
      } else if (!this._writable.existsSync(newPath)) {
        this._writable.mkdirSync(newPath, mode);
      }
      // Need to move *every file/folder* currently stored on readable to its new location
      // on writable.
      if (this._readable.existsSync(oldPath)) {
        this._readable.readdirSync(oldPath).forEach(function (name) {
          // Recursion! Should work for any nested files / folders.
          this$1.renameSync(
            path.resolve(oldPath, name),
            path.resolve(newPath, name)
          );
        });
      }
    } else {
      if (
        this.existsSync(newPath) &&
        this.statSync(newPath, false).isDirectory()
      ) {
        throw ApiError.EISDIR(newPath);
      }
      this.writeFileSync(
        newPath,
        this.readFileSync(oldPath, null, getFlag('r')),
        null,
        getFlag('w'),
        oldStats.mode
      );
    }
    if (oldPath !== newPath && this.existsSync(oldPath)) {
      this.unlinkSync(oldPath);
    }
  };
  UnlockedOverlayFS.prototype.stat = function stat(p, isLstat, cb) {
    var this$1 = this;

    if (!this.checkInitAsync(cb)) {
      return;
    }
    this._writable.stat(p, isLstat, function (err, stat) {
      if (err && err.errno === ErrorCode.ENOENT) {
        if (this$1._deletedFiles[p]) {
          cb(ApiError.ENOENT(p));
        }
        this$1._readable.stat(p, isLstat, function (err, stat) {
          if (stat) {
            // Make the oldStat's mode writable. Preserve the topmost
            // part of the mode, which specifies if it is a file or a
            // directory.
            stat = Stats.clone(stat);
            stat.mode = makeModeWritable(stat.mode);
          }
          cb(err, stat);
        });
      } else {
        cb(err, stat);
      }
    });
  };
  UnlockedOverlayFS.prototype.statSync = function statSync(p, isLstat) {
    this.checkInitialized();
    try {
      return this._writable.statSync(p, isLstat);
    } catch (e) {
      if (this._deletedFiles[p]) {
        throw ApiError.ENOENT(p);
      }
      var oldStat = Stats.clone(this._readable.statSync(p, isLstat));
      // Make the oldStat's mode writable. Preserve the topmost part of the
      // mode, which specifies if it is a file or a directory.
      oldStat.mode = makeModeWritable(oldStat.mode);
      return oldStat;
    }
  };
  UnlockedOverlayFS.prototype.open = function open(p, flag, mode, cb) {
    var this$1 = this;

    if (!this.checkInitAsync(cb) || this.checkPathAsync(p, cb)) {
      return;
    }
    this.stat(p, false, function (err, stats) {
      if (stats) {
        switch (flag.pathExistsAction()) {
          case ActionType.TRUNCATE_FILE:
            return this$1.createParentDirectoriesAsync(p, function (err) {
              if (err) {
                return cb(err);
              }
              this$1._writable.open(p, flag, mode, cb);
            });
          case ActionType.NOP:
            return this$1._writable.exists(p, function (exists) {
              if (exists) {
                this$1._writable.open(p, flag, mode, cb);
              } else {
                // at this point we know the stats object we got is from
                // the readable FS.
                stats = Stats.clone(stats);
                stats.mode = mode;
                this$1._readable.readFile(
                  p,
                  null,
                  getFlag('r'),
                  function (readFileErr, data) {
                    if (readFileErr) {
                      return cb(readFileErr);
                    }
                    if (stats.size === -1) {
                      stats.size = data.length;
                    }
                    var f = new OverlayFile(this$1, p, flag, stats, data);
                    cb(null, f);
                  }
                );
              }
            });
          default:
            return cb(ApiError.EEXIST(p));
        }
      } else {
        switch (flag.pathNotExistsAction()) {
          case ActionType.CREATE_FILE:
            return this$1.createParentDirectoriesAsync(p, function (err) {
              if (err) {
                return cb(err);
              }
              return this$1._writable.open(p, flag, mode, cb);
            });
          default:
            return cb(ApiError.ENOENT(p));
        }
      }
    });
  };
  UnlockedOverlayFS.prototype.openSync = function openSync(p, flag, mode) {
    this.checkInitialized();
    this.checkPath(p);
    if (p === deletionLogPath) {
      throw ApiError.EPERM('Cannot open deletion log.');
    }
    if (this.existsSync(p)) {
      switch (flag.pathExistsAction()) {
        case ActionType.TRUNCATE_FILE:
          this.createParentDirectories(p);
          return this._writable.openSync(p, flag, mode);
        case ActionType.NOP:
          if (this._writable.existsSync(p)) {
            return this._writable.openSync(p, flag, mode);
          } else {
            // Create an OverlayFile.
            var buf = this._readable.readFileSync(p, null, getFlag('r'));
            var stats = Stats.clone(this._readable.statSync(p, false));
            stats.mode = mode;
            return new OverlayFile(this, p, flag, stats, buf);
          }
        default:
          throw ApiError.EEXIST(p);
      }
    } else {
      switch (flag.pathNotExistsAction()) {
        case ActionType.CREATE_FILE:
          this.createParentDirectories(p);
          return this._writable.openSync(p, flag, mode);
        default:
          throw ApiError.ENOENT(p);
      }
    }
  };
  UnlockedOverlayFS.prototype.unlink = function unlink(p, cb) {
    var this$1 = this;

    if (!this.checkInitAsync(cb) || this.checkPathAsync(p, cb)) {
      return;
    }
    this.exists(p, function (exists) {
      if (!exists) {
        return cb(ApiError.ENOENT(p));
      }
      this$1._writable.exists(p, function (writableExists) {
        if (writableExists) {
          return this$1._writable.unlink(p, function (err) {
            if (err) {
              return cb(err);
            }
            this$1.exists(p, function (readableExists) {
              if (readableExists) {
                this$1.deletePath(p);
              }
              cb(null);
            });
          });
        } else {
          // if this only exists on the readable FS, add it to the
          // delete map.
          this$1.deletePath(p);
          cb(null);
        }
      });
    });
  };
  UnlockedOverlayFS.prototype.unlinkSync = function unlinkSync(p) {
    this.checkInitialized();
    this.checkPath(p);
    if (this.existsSync(p)) {
      if (this._writable.existsSync(p)) {
        this._writable.unlinkSync(p);
      }
      // if it still exists add to the delete log
      if (this.existsSync(p)) {
        this.deletePath(p);
      }
    } else {
      throw ApiError.ENOENT(p);
    }
  };
  UnlockedOverlayFS.prototype.rmdir = function rmdir(p, cb) {
    var this$1 = this;

    if (!this.checkInitAsync(cb)) {
      return;
    }
    var rmdirLower = function () {
      this$1.readdir(p, function (err, files) {
        if (err) {
          return cb(err);
        }
        if (files.length) {
          return cb(ApiError.ENOTEMPTY(p));
        }
        this$1.deletePath(p);
        cb(null);
      });
    };
    this.exists(p, function (exists) {
      if (!exists) {
        return cb(ApiError.ENOENT(p));
      }
      this$1._writable.exists(p, function (writableExists) {
        if (writableExists) {
          this$1._writable.rmdir(p, function (err) {
            if (err) {
              return cb(err);
            }
            this$1._readable.exists(p, function (readableExists) {
              if (readableExists) {
                rmdirLower();
              } else {
                cb();
              }
            });
          });
        } else {
          rmdirLower();
        }
      });
    });
  };
  UnlockedOverlayFS.prototype.rmdirSync = function rmdirSync(p) {
    this.checkInitialized();
    if (this.existsSync(p)) {
      if (this._writable.existsSync(p)) {
        this._writable.rmdirSync(p);
      }
      if (this.existsSync(p)) {
        // Check if directory is empty.
        if (this.readdirSync(p).length > 0) {
          throw ApiError.ENOTEMPTY(p);
        } else {
          this.deletePath(p);
        }
      }
    } else {
      throw ApiError.ENOENT(p);
    }
  };
  UnlockedOverlayFS.prototype.mkdir = function mkdir(p, mode, cb) {
    var this$1 = this;

    if (!this.checkInitAsync(cb)) {
      return;
    }
    this.exists(p, function (exists) {
      if (exists) {
        return cb(ApiError.EEXIST(p));
      }
      // The below will throw should any of the parent directories
      // fail to exist on _writable.
      this$1.createParentDirectoriesAsync(p, function (err) {
        if (err) {
          return cb(err);
        }
        this$1._writable.mkdir(p, mode, cb);
      });
    });
  };
  UnlockedOverlayFS.prototype.mkdirSync = function mkdirSync(p, mode) {
    this.checkInitialized();
    if (this.existsSync(p)) {
      throw ApiError.EEXIST(p);
    } else {
      // The below will throw should any of the parent directories fail to exist
      // on _writable.
      this.createParentDirectories(p);
      this._writable.mkdirSync(p, mode);
    }
  };
  UnlockedOverlayFS.prototype.readdir = function readdir(p, cb) {
    var this$1 = this;

    if (!this.checkInitAsync(cb)) {
      return;
    }
    this.stat(p, false, function (err, dirStats) {
      if (err) {
        return cb(err);
      }
      if (!dirStats.isDirectory()) {
        return cb(ApiError.ENOTDIR(p));
      }
      this$1._writable.readdir(p, function (err, wFiles) {
        if (err && err.code !== 'ENOENT') {
          return cb(err);
        } else if (err || !wFiles) {
          wFiles = [];
        }
        this$1._readable.readdir(p, function (err, rFiles) {
          // if the directory doesn't exist on the lower FS set rFiles
          // here to simplify the following code.
          if (err || !rFiles) {
            rFiles = [];
          }
          // Readdir in both, check delete log on read-only file system's files, merge, return.
          var seenMap = {};
          var filtered = wFiles
            .concat(
              rFiles.filter(function (fPath) {
                return !this$1._deletedFiles[p + '/' + fPath];
              })
            )
            .filter(function (fPath) {
              // Remove duplicates.
              var result = !seenMap[fPath];
              seenMap[fPath] = true;
              return result;
            });
          cb(null, filtered);
        });
      });
    });
  };
  UnlockedOverlayFS.prototype.readdirSync = function readdirSync(p) {
    var this$1 = this;

    this.checkInitialized();
    var dirStats = this.statSync(p, false);
    if (!dirStats.isDirectory()) {
      throw ApiError.ENOTDIR(p);
    }
    // Readdir in both, check delete log on RO file system's listing, merge, return.
    var contents = [];
    try {
      contents = contents.concat(this._writable.readdirSync(p));
    } catch (e) {
      // NOP.
    }
    try {
      contents = contents.concat(
        this._readable.readdirSync(p).filter(function (fPath) {
          return !this$1._deletedFiles[p + '/' + fPath];
        })
      );
    } catch (e) {
      // NOP.
    }
    var seenMap = {};
    return contents.filter(function (fileP) {
      var result = !seenMap[fileP];
      seenMap[fileP] = true;
      return result;
    });
  };
  UnlockedOverlayFS.prototype.exists = function exists(p, cb) {
    var this$1 = this;

    // Cannot pass an error back to callback, so throw an exception instead
    // if not initialized.
    this.checkInitialized();
    this._writable.exists(p, function (existsWritable) {
      if (existsWritable) {
        return cb(true);
      }
      this$1._readable.exists(p, function (existsReadable) {
        cb(existsReadable && this$1._deletedFiles[p] !== true);
      });
    });
  };
  UnlockedOverlayFS.prototype.existsSync = function existsSync(p) {
    this.checkInitialized();
    return (
      this._writable.existsSync(p) ||
      (this._readable.existsSync(p) && this._deletedFiles[p] !== true)
    );
  };
  UnlockedOverlayFS.prototype.chmod = function chmod(p, isLchmod, mode, cb) {
    var this$1 = this;

    if (!this.checkInitAsync(cb)) {
      return;
    }
    this.operateOnWritableAsync(p, function (err) {
      if (err) {
        return cb(err);
      } else {
        this$1._writable.chmod(p, isLchmod, mode, cb);
      }
    });
  };
  UnlockedOverlayFS.prototype.chmodSync = function chmodSync(
    p,
    isLchmod,
    mode
  ) {
    var this$1 = this;

    this.checkInitialized();
    this.operateOnWritable(p, function () {
      this$1._writable.chmodSync(p, isLchmod, mode);
    });
  };
  UnlockedOverlayFS.prototype.chown = function chown(
    p,
    isLchmod,
    uid,
    gid,
    cb
  ) {
    var this$1 = this;

    if (!this.checkInitAsync(cb)) {
      return;
    }
    this.operateOnWritableAsync(p, function (err) {
      if (err) {
        return cb(err);
      } else {
        this$1._writable.chown(p, isLchmod, uid, gid, cb);
      }
    });
  };
  UnlockedOverlayFS.prototype.chownSync = function chownSync(
    p,
    isLchown,
    uid,
    gid
  ) {
    var this$1 = this;

    this.checkInitialized();
    this.operateOnWritable(p, function () {
      this$1._writable.chownSync(p, isLchown, uid, gid);
    });
  };
  UnlockedOverlayFS.prototype.utimes = function utimes(p, atime, mtime, cb) {
    var this$1 = this;

    if (!this.checkInitAsync(cb)) {
      return;
    }
    this.operateOnWritableAsync(p, function (err) {
      if (err) {
        return cb(err);
      } else {
        this$1._writable.utimes(p, atime, mtime, cb);
      }
    });
  };
  UnlockedOverlayFS.prototype.utimesSync = function utimesSync(
    p,
    atime,
    mtime
  ) {
    var this$1 = this;

    this.checkInitialized();
    this.operateOnWritable(p, function () {
      this$1._writable.utimesSync(p, atime, mtime);
    });
  };
  UnlockedOverlayFS.prototype.deletePath = function deletePath(p) {
    this._deletedFiles[p] = true;
    this.updateLog('d' + p + '\n');
  };
  UnlockedOverlayFS.prototype.updateLog = function updateLog(addition) {
    var this$1 = this;

    this._deleteLog += addition;
    if (this._deleteLogUpdatePending) {
      this._deleteLogUpdateNeeded = true;
    } else {
      this._deleteLogUpdatePending = true;
      this._writable.writeFile(
        deletionLogPath,
        this._deleteLog,
        'utf8',
        FileFlag.getFileFlag('w'),
        420,
        function (e) {
          this$1._deleteLogUpdatePending = false;
          if (e) {
            this$1._deleteLogError = e;
          } else if (this$1._deleteLogUpdateNeeded) {
            this$1._deleteLogUpdateNeeded = false;
            this$1.updateLog('');
          }
        }
      );
    }
  };
  UnlockedOverlayFS.prototype._reparseDeletionLog =
    function _reparseDeletionLog() {
      var this$1 = this;

      this._deletedFiles = {};
      this._deleteLog.split('\n').forEach(function (path) {
        // If the log entry begins w/ 'd', it's a deletion.
        this$1._deletedFiles[path.slice(1)] = path.slice(0, 1) === 'd';
      });
    };
  UnlockedOverlayFS.prototype.checkInitialized = function checkInitialized() {
    if (!this._isInitialized) {
      throw new ApiError(
        ErrorCode.EPERM,
        'OverlayFS is not initialized. Please initialize OverlayFS using its initialize() method before using it.'
      );
    } else if (this._deleteLogError !== null) {
      var e = this._deleteLogError;
      this._deleteLogError = null;
      throw e;
    }
  };
  UnlockedOverlayFS.prototype.checkInitAsync = function checkInitAsync(cb) {
    if (!this._isInitialized) {
      cb(
        new ApiError(
          ErrorCode.EPERM,
          'OverlayFS is not initialized. Please initialize OverlayFS using its initialize() method before using it.'
        )
      );
      return false;
    } else if (this._deleteLogError !== null) {
      var e = this._deleteLogError;
      this._deleteLogError = null;
      cb(e);
      return false;
    }
    return true;
  };
  UnlockedOverlayFS.prototype.checkPath = function checkPath(p) {
    if (p === deletionLogPath) {
      throw ApiError.EPERM(p);
    }
  };
  UnlockedOverlayFS.prototype.checkPathAsync = function checkPathAsync(p, cb) {
    if (p === deletionLogPath) {
      cb(ApiError.EPERM(p));
      return true;
    }
    return false;
  };
  UnlockedOverlayFS.prototype.createParentDirectoriesAsync =
    function createParentDirectoriesAsync(p, cb) {
      var parent = path.dirname(p);
      var toCreate = [];
      var self = this;
      this._writable.stat(parent, false, statDone);

      function statDone(err, stat) {
        if (err) {
          if (parent === '/') {
            cb(
              new ApiError(
                ErrorCode.EBUSY,
                'Invariant failed: root does not exist!'
              )
            );
          } else {
            toCreate.push(parent);
            parent = path.dirname(parent);
            self._writable.stat(parent, false, statDone);
          }
        } else {
          createParents();
        }
      }

      function createParents() {
        if (!toCreate.length) {
          return cb();
        }
        var dir = toCreate.pop();
        self._readable.stat(dir, false, function (err, stats) {
          // stop if we couldn't read the dir
          if (!stats) {
            return cb();
          }
          self._writable.mkdir(dir, stats.mode, function (err) {
            if (err) {
              return cb(err);
            }
            createParents();
          });
        });
      }
    };
  /**
   * With the given path, create the needed parent directories on the writable storage
   * should they not exist. Use modes from the read-only storage.
   */
  UnlockedOverlayFS.prototype.createParentDirectories =
    function createParentDirectories(p) {
      var this$1 = this;

      var parent = path.dirname(p),
        toCreate = [];
      while (!this._writable.existsSync(parent)) {
        toCreate.push(parent);
        parent = path.dirname(parent);
      }
      toCreate = toCreate.reverse();
      toCreate.forEach(function (p) {
        this$1._writable.mkdirSync(p, this$1.statSync(p, false).mode);
      });
    };
  /**
   * Helper function:
   * - Ensures p is on writable before proceeding. Throws an error if it doesn't exist.
   * - Calls f to perform operation on writable.
   */
  UnlockedOverlayFS.prototype.operateOnWritable = function operateOnWritable(
    p,
    f
  ) {
    if (this.existsSync(p)) {
      if (!this._writable.existsSync(p)) {
        // File is on readable storage. Copy to writable storage before
        // changing its mode.
        this.copyToWritable(p);
      }
      f();
    } else {
      throw ApiError.ENOENT(p);
    }
  };
  UnlockedOverlayFS.prototype.operateOnWritableAsync =
    function operateOnWritableAsync(p, cb) {
      var this$1 = this;

      this.exists(p, function (exists) {
        if (!exists) {
          return cb(ApiError.ENOENT(p));
        }
        this$1._writable.exists(p, function (existsWritable) {
          if (existsWritable) {
            cb();
          } else {
            return this$1.copyToWritableAsync(p, cb);
          }
        });
      });
    };
  /**
   * Copy from readable to writable storage.
   * PRECONDITION: File does not exist on writable storage.
   */
  UnlockedOverlayFS.prototype.copyToWritable = function copyToWritable(p) {
    var pStats = this.statSync(p, false);
    if (pStats.isDirectory()) {
      this._writable.mkdirSync(p, pStats.mode);
    } else {
      this.writeFileSync(
        p,
        this._readable.readFileSync(p, null, getFlag('r')),
        null,
        getFlag('w'),
        this.statSync(p, false).mode
      );
    }
  };
  UnlockedOverlayFS.prototype.copyToWritableAsync =
    function copyToWritableAsync(p, cb) {
      var this$1 = this;

      this.stat(p, false, function (err, pStats) {
        if (err) {
          return cb(err);
        }
        if (pStats.isDirectory()) {
          return this$1._writable.mkdir(p, pStats.mode, cb);
        }
        // need to copy file.
        this$1._readable.readFile(p, null, getFlag('r'), function (err, data) {
          if (err) {
            return cb(err);
          }
          this$1.writeFile(p, data, null, getFlag('w'), pStats.mode, cb);
        });
      });
    };

  return UnlockedOverlayFS;
})(BaseFileSystem);
/**
 * OverlayFS makes a read-only filesystem writable by storing writes on a second,
 * writable file system. Deletes are persisted via metadata stored on the writable
 * file system.
 */
var OverlayFS = /*@__PURE__*/ (function (LockedFS) {
  function OverlayFS(writable, readable) {
    LockedFS.call(this, new UnlockedOverlayFS(writable, readable));
  }

  if (LockedFS) OverlayFS.__proto__ = LockedFS;
  OverlayFS.prototype = Object.create(LockedFS && LockedFS.prototype);
  OverlayFS.prototype.constructor = OverlayFS;
  /**
   * Constructs and initializes an OverlayFS instance with the given options.
   */
  OverlayFS.Create = function Create(opts, cb) {
    try {
      var fs = new OverlayFS(opts.writable, opts.readable);
      fs._initialize(function (e) {
        cb(e, fs);
      });
    } catch (e) {
      cb(e);
    }
  };
  OverlayFS.isAvailable = function isAvailable() {
    return UnlockedOverlayFS.isAvailable();
  };
  OverlayFS.prototype.getOverlayedFileSystems =
    function getOverlayedFileSystems() {
      return LockedFS.prototype.getFSUnlocked
        .call(this)
        .getOverlayedFileSystems();
    };
  OverlayFS.prototype.unwrap = function unwrap() {
    return LockedFS.prototype.getFSUnlocked.call(this);
  };
  OverlayFS.prototype._initialize = function _initialize(cb) {
    LockedFS.prototype.getFSUnlocked.call(this)._initialize(cb);
  };

  return OverlayFS;
})(LockedFS);
OverlayFS.Name = 'OverlayFS';
OverlayFS.Options = {
  writable: {
    type: 'object',
    description: 'The file system to write modified files to.',
  },
  readable: {
    type: 'object',
    description: 'The file system that initially populates this file system.',
  },
};

/**
 * Try to convert the given buffer into a string, and pass it to the callback.
 * Optimization that removes the needed try/catch into a helper function, as
 * this is an uncommon case.
 * @hidden
 */
function tryToString$3(buff, encoding, cb) {
  try {
    cb(null, buff.toString(encoding));
  } catch (e) {
    cb(e);
  }
}

function syncNotAvailableError$3() {
  throw new ApiError(
    ErrorCode.ENOTSUP,
    'Synchronous HTTP download methods are not available in this environment.'
  );
}
/**
 * A simple filesystem backed by HTTP downloads. You must create a directory listing using the
 * `make_http_index` tool provided by BrowserFS.
 *
 * If you install BrowserFS globally with `npm i -g browserfs`, you can generate a listing by
 * running `make_http_index` in your terminal in the directory you would like to index:
 *
 * ```
 * make_http_index > index.json
 * ```
 *
 * Listings objects look like the following:
 *
 * ```json
 * {
 *   "home": {
 *     "jvilk": {
 *       "someFile.txt": null,
 *       "someDir": {
 *         // Empty directory
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * *This example has the folder `/home/jvilk` with subfile `someFile.txt` and subfolder `someDir`.*
 */
var UNPKGRequest = /*@__PURE__*/ (function (BaseFileSystem) {
  function UNPKGRequest(meta, dependency, version, preferXHR) {
    if (preferXHR === void 0) preferXHR = false;

    BaseFileSystem.call(this);
    this.dependency = dependency;
    this.version = version;
    this._index = FileIndex.fromUnpkg(meta);
    if (fetchIsAvailable && (!preferXHR || !xhrIsAvailable)) {
      this._requestFileAsyncInternal = fetchFileAsync;
      this._requestFileSizeAsyncInternal = fetchFileSizeAsync;
    } else {
      this._requestFileAsyncInternal = asyncDownloadFile;
      this._requestFileSizeAsyncInternal = getFileSizeAsync;
    }
    if (xhrIsAvailable) {
      this._requestFileSyncInternal = syncDownloadFile;
      this._requestFileSizeSyncInternal = getFileSizeSync;
    } else {
      this._requestFileSyncInternal = syncNotAvailableError$3;
      this._requestFileSizeSyncInternal = syncNotAvailableError$3;
    }
  }

  if (BaseFileSystem) UNPKGRequest.__proto__ = BaseFileSystem;
  UNPKGRequest.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  UNPKGRequest.prototype.constructor = UNPKGRequest;
  /**
   * Construct an HTTPRequest file system backend with the given options.
   */
  UNPKGRequest.Create = function Create(opts, cb) {
    var URL = 'https://unpkg.com/' + opts.dependency + '@' + opts.version;
    asyncDownloadFile(URL + '/?meta', 'json', function (e, data) {
      if (e) {
        cb(e);
      } else {
        cb(null, new UNPKGRequest(data, opts.dependency, opts.version));
      }
    });
  };
  UNPKGRequest.isAvailable = function isAvailable() {
    return xhrIsAvailable || fetchIsAvailable;
  };
  UNPKGRequest.prototype.empty = function empty() {
    this._index.fileIterator(function (file) {
      file.fileData = null;
    });
  };
  UNPKGRequest.prototype.getName = function getName() {
    return UNPKGRequest.Name;
  };
  UNPKGRequest.prototype.diskSpace = function diskSpace(path, cb) {
    // Read-only file system. We could calculate the total space, but that's not
    // important right now.
    cb(0, 0);
  };
  UNPKGRequest.prototype.isReadOnly = function isReadOnly() {
    return true;
  };
  UNPKGRequest.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  UNPKGRequest.prototype.supportsProps = function supportsProps() {
    return false;
  };
  UNPKGRequest.prototype.supportsSynch = function supportsSynch() {
    // Synchronous operations are only available via the XHR interface for now.
    return xhrIsAvailable;
  };
  /**
   * Special HTTPFS function: Preload the given file into the index.
   * @param [String] path
   * @param [BrowserFS.Buffer] buffer
   */
  UNPKGRequest.prototype.preloadFile = function preloadFile(path, buffer) {
    var inode = this._index.getInode(path);
    if (isFileInode(inode)) {
      if (inode === null) {
        throw ApiError.ENOENT(path);
      }
      var stats = inode.getData();
      stats.size = buffer.length;
      stats.fileData = buffer;
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  UNPKGRequest.prototype.stat = function stat(path, isLstat, cb) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      return cb(ApiError.ENOENT(path));
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        this._requestFileSizeAsync(path, function (e, size) {
          if (e) {
            return cb(e);
          }
          stats.size = size;
          cb(null, Stats.clone(stats));
        });
      } else {
        cb(null, Stats.clone(stats));
      }
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
      cb(null, stats);
    } else {
      cb(ApiError.FileError(ErrorCode.EINVAL, path));
    }
  };
  UNPKGRequest.prototype.statSync = function statSync(path, isLstat) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        stats.size = this._requestFileSizeSync(path);
      }
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
    } else {
      throw ApiError.FileError(ErrorCode.EINVAL, path);
    }
    return stats;
  };
  UNPKGRequest.prototype.open = function open(path, flags, mode, cb) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      return cb(new ApiError(ErrorCode.EPERM, path));
    }
    var self = this;
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (inode === null) {
      return cb(ApiError.ENOENT(path));
    }
    if (isFileInode(inode)) {
      var stats = inode.getData();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          return cb(ApiError.EEXIST(path));
        case ActionType.NOP:
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return cb(
              null,
              new NoSyncFile(
                self,
                path,
                flags,
                Stats.clone(stats),
                stats.fileData
              )
            );
          }
          // @todo be lazier about actually requesting the file
          this._requestFileAsync(path, 'buffer', function (err, buffer) {
            if (err) {
              return cb(err);
            }
            // we don't initially have file sizes
            stats.size = buffer.length;
            stats.fileData = buffer;
            return cb(
              null,
              new NoSyncFile(self, path, flags, Stats.clone(stats), buffer)
            );
          });
          break;
        default:
          return cb(new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.'));
      }
    } else {
      return cb(ApiError.EISDIR(path));
    }
  };
  UNPKGRequest.prototype.openSync = function openSync(path, flags, mode) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      throw new ApiError(ErrorCode.EPERM, path);
    }
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    if (isFileInode(inode)) {
      var stats = inode.getData();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          throw ApiError.EEXIST(path);
        case ActionType.NOP:
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return new NoSyncFile(
              this,
              path,
              flags,
              Stats.clone(stats),
              stats.fileData
            );
          }
          // @todo be lazier about actually requesting the file
          var buffer = this._requestFileSync(path, 'buffer');
          // we don't initially have file sizes
          stats.size = buffer.length;
          stats.fileData = buffer;
          return new NoSyncFile(this, path, flags, Stats.clone(stats), buffer);
        default:
          throw new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.');
      }
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  UNPKGRequest.prototype.readdir = function readdir(path, cb) {
    try {
      cb(null, this.readdirSync(path));
    } catch (e) {
      cb(e);
    }
  };
  UNPKGRequest.prototype.readdirSync = function readdirSync(path) {
    // Check if it exists.
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    } else if (isDirInode(inode)) {
      return inode.getListing();
    } else {
      throw ApiError.ENOTDIR(path);
    }
  };
  /**
   * We have the entire file as a buffer; optimize readFile.
   */
  UNPKGRequest.prototype.readFile = function readFile(
    fname,
    encoding,
    flag,
    cb
  ) {
    // Wrap cb in file closing code.
    var oldCb = cb;
    // Get file.
    this.open(fname, flag, 0x1a4, function (err, fd) {
      if (err) {
        return cb(err);
      }
      cb = function (err, arg) {
        fd.close(function (err2) {
          if (!err) {
            err = err2;
          }
          return oldCb(err, arg);
        });
      };
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        cb(err, copyingSlice(fdBuff));
      } else {
        tryToString$3(fdBuff, encoding, cb);
      }
    });
  };
  /**
   * Specially-optimized readfile.
   */
  UNPKGRequest.prototype.readFileSync = function readFileSync(
    fname,
    encoding,
    flag
  ) {
    // Get file.
    var fd = this.openSync(fname, flag, 0x1a4);
    try {
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        return copyingSlice(fdBuff);
      }
      return fdBuff.toString(encoding);
    } finally {
      fd.closeSync();
    }
  };
  UNPKGRequest.prototype._getHTTPPath = function _getHTTPPath(filePath) {
    if (filePath.charAt(0) === '/') {
      filePath = filePath.slice(1);
    }
    return (
      'https://unpkg.com/' +
      this.dependency +
      '@' +
      this.version +
      '/' +
      filePath
    );
  };
  UNPKGRequest.prototype._requestFileAsync = function _requestFileAsync(
    p,
    type,
    cb
  ) {
    this._requestFileAsyncInternal(this._getHTTPPath(p), type, cb);
  };
  UNPKGRequest.prototype._requestFileSync = function _requestFileSync(p, type) {
    return this._requestFileSyncInternal(this._getHTTPPath(p), type);
  };
  /**
   * Only requests the HEAD content, for the file size.
   */
  UNPKGRequest.prototype._requestFileSizeAsync = function _requestFileSizeAsync(
    path,
    cb
  ) {
    this._requestFileSizeAsyncInternal(this._getHTTPPath(path), cb);
  };
  UNPKGRequest.prototype._requestFileSizeSync = function _requestFileSizeSync(
    path
  ) {
    return this._requestFileSizeSyncInternal(this._getHTTPPath(path));
  };

  return UNPKGRequest;
})(BaseFileSystem);
UNPKGRequest.Name = 'UNPKGRequest';
UNPKGRequest.Options = {
  dependency: {
    type: 'string',
    description: 'Name of dependency',
  },
  version: {
    type: 'string',
    description: 'Version of dependency, can be semver',
  },
  preferXHR: {
    type: 'boolean',
    optional: true,
    description:
      'Whether to prefer XmlHttpRequest or fetch for async operations if both are available. Default: false',
  },
};

/**
 * Try to convert the given buffer into a string, and pass it to the callback.
 * Optimization that removes the needed try/catch into a helper function, as
 * this is an uncommon case.
 * @hidden
 */
function tryToString$4(buff, encoding, cb) {
  try {
    cb(null, buff.toString(encoding));
  } catch (e) {
    cb(e);
  }
}

function syncNotAvailableError$4() {
  throw new ApiError(
    ErrorCode.ENOTSUP,
    'Synchronous HTTP download methods are not available in this environment.'
  );
}
/**
 * A simple filesystem backed by HTTP downloads. You must create a directory listing using the
 * `make_http_index` tool provided by BrowserFS.
 *
 * If you install BrowserFS globally with `npm i -g browserfs`, you can generate a listing by
 * running `make_http_index` in your terminal in the directory you would like to index:
 *
 * ```
 * make_http_index > index.json
 * ```
 *
 * Listings objects look like the following:
 *
 * ```json
 * {
 *   "home": {
 *     "jvilk": {
 *       "someFile.txt": null,
 *       "someDir": {
 *         // Empty directory
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * *This example has the folder `/home/jvilk` with subfile `someFile.txt` and subfolder `someDir`.*
 */
var JSDelivrRequest = /*@__PURE__*/ (function (BaseFileSystem) {
  function JSDelivrRequest(meta, dependency, version, preferXHR) {
    if (preferXHR === void 0) preferXHR = false;

    BaseFileSystem.call(this);
    this.dependency = dependency;
    this.version = version;
    this._index = FileIndex.fromJSDelivr(meta);
    if (fetchIsAvailable && (!preferXHR || !xhrIsAvailable)) {
      this._requestFileAsyncInternal = fetchFileAsync;
      this._requestFileSizeAsyncInternal = fetchFileSizeAsync;
    } else {
      this._requestFileAsyncInternal = asyncDownloadFile;
      this._requestFileSizeAsyncInternal = getFileSizeAsync;
    }
    if (xhrIsAvailable) {
      this._requestFileSyncInternal = syncDownloadFile;
      this._requestFileSizeSyncInternal = getFileSizeSync;
    } else {
      this._requestFileSyncInternal = syncNotAvailableError$4;
      this._requestFileSizeSyncInternal = syncNotAvailableError$4;
    }
  }

  if (BaseFileSystem) JSDelivrRequest.__proto__ = BaseFileSystem;
  JSDelivrRequest.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  JSDelivrRequest.prototype.constructor = JSDelivrRequest;
  /**
   * Construct an HTTPRequest file system backend with the given options.
   */
  JSDelivrRequest.Create = function Create(opts, cb) {
    var URL =
      'https://data.jsdelivr.com/v1/package/npm/' +
      opts.dependency +
      '@' +
      opts.version +
      '/flat';
    asyncDownloadFile(URL, 'json', function (e, data) {
      if (e) {
        cb(e);
      } else {
        cb(null, new JSDelivrRequest(data, opts.dependency, opts.version));
      }
    });
  };
  JSDelivrRequest.isAvailable = function isAvailable() {
    return xhrIsAvailable || fetchIsAvailable;
  };
  JSDelivrRequest.prototype.empty = function empty() {
    this._index.fileIterator(function (file) {
      file.fileData = null;
    });
  };
  JSDelivrRequest.prototype.getName = function getName() {
    return JSDelivrRequest.Name;
  };
  JSDelivrRequest.prototype.diskSpace = function diskSpace(path, cb) {
    // Read-only file system. We could calculate the total space, but that's not
    // important right now.
    cb(0, 0);
  };
  JSDelivrRequest.prototype.isReadOnly = function isReadOnly() {
    return true;
  };
  JSDelivrRequest.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  JSDelivrRequest.prototype.supportsProps = function supportsProps() {
    return false;
  };
  JSDelivrRequest.prototype.supportsSynch = function supportsSynch() {
    // Synchronous operations are only available via the XHR interface for now.
    return xhrIsAvailable;
  };
  /**
   * Special HTTPFS function: Preload the given file into the index.
   * @param [String] path
   * @param [BrowserFS.Buffer] buffer
   */
  JSDelivrRequest.prototype.preloadFile = function preloadFile(path, buffer) {
    var inode = this._index.getInode(path);
    if (isFileInode(inode)) {
      if (inode === null) {
        throw ApiError.ENOENT(path);
      }
      var stats = inode.getData();
      stats.size = buffer.length;
      stats.fileData = buffer;
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  JSDelivrRequest.prototype.stat = function stat(path, isLstat, cb) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      return cb(ApiError.ENOENT(path));
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        this._requestFileSizeAsync(path, function (e, size) {
          if (e) {
            return cb(e);
          }
          stats.size = size;
          cb(null, Stats.clone(stats));
        });
      } else {
        cb(null, Stats.clone(stats));
      }
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
      cb(null, stats);
    } else {
      cb(ApiError.FileError(ErrorCode.EINVAL, path));
    }
  };
  JSDelivrRequest.prototype.statSync = function statSync(path, isLstat) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData();
      // At this point, a non-opened file will still have default stats from the listing.
      if (stats.size < 0) {
        stats.size = this._requestFileSizeSync(path);
      }
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
    } else {
      throw ApiError.FileError(ErrorCode.EINVAL, path);
    }
    return stats;
  };
  JSDelivrRequest.prototype.open = function open(path, flags, mode, cb) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      return cb(new ApiError(ErrorCode.EPERM, path));
    }
    var self = this;
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (inode === null) {
      return cb(ApiError.ENOENT(path));
    }
    if (isFileInode(inode)) {
      var stats = inode.getData();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          return cb(ApiError.EEXIST(path));
        case ActionType.NOP:
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return cb(
              null,
              new NoSyncFile(
                self,
                path,
                flags,
                Stats.clone(stats),
                stats.fileData
              )
            );
          }
          // @todo be lazier about actually requesting the file
          this._requestFileAsync(path, 'buffer', function (err, buffer) {
            if (err) {
              return cb(err);
            }
            // we don't initially have file sizes
            stats.size = buffer.length;
            stats.fileData = buffer;
            return cb(
              null,
              new NoSyncFile(self, path, flags, Stats.clone(stats), buffer)
            );
          });
          break;
        default:
          return cb(new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.'));
      }
    } else {
      return cb(ApiError.EISDIR(path));
    }
  };
  JSDelivrRequest.prototype.openSync = function openSync(path, flags, mode) {
    // INVARIANT: You can't write to files on this file system.
    if (flags.isWriteable()) {
      throw new ApiError(ErrorCode.EPERM, path);
    }
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    if (isFileInode(inode)) {
      var stats = inode.getData();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          throw ApiError.EEXIST(path);
        case ActionType.NOP:
          // Use existing file contents.
          // XXX: Uh, this maintains the previously-used flag.
          if (stats.fileData) {
            return new NoSyncFile(
              this,
              path,
              flags,
              Stats.clone(stats),
              stats.fileData
            );
          }
          // @todo be lazier about actually requesting the file
          var buffer = this._requestFileSync(path, 'buffer');
          // we don't initially have file sizes
          stats.size = buffer.length;
          stats.fileData = buffer;
          return new NoSyncFile(this, path, flags, Stats.clone(stats), buffer);
        default:
          throw new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.');
      }
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  JSDelivrRequest.prototype.readdir = function readdir(path, cb) {
    try {
      cb(null, this.readdirSync(path));
    } catch (e) {
      cb(e);
    }
  };
  JSDelivrRequest.prototype.readdirSync = function readdirSync(path) {
    // Check if it exists.
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    } else if (isDirInode(inode)) {
      return inode.getListing();
    } else {
      throw ApiError.ENOTDIR(path);
    }
  };
  /**
   * We have the entire file as a buffer; optimize readFile.
   */
  JSDelivrRequest.prototype.readFile = function readFile(
    fname,
    encoding,
    flag,
    cb
  ) {
    // Wrap cb in file closing code.
    var oldCb = cb;
    // Get file.
    this.open(fname, flag, 0x1a4, function (err, fd) {
      if (err) {
        return cb(err);
      }
      cb = function (err, arg) {
        fd.close(function (err2) {
          if (!err) {
            err = err2;
          }
          return oldCb(err, arg);
        });
      };
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        cb(err, copyingSlice(fdBuff));
      } else {
        tryToString$4(fdBuff, encoding, cb);
      }
    });
  };
  /**
   * Specially-optimized readfile.
   */
  JSDelivrRequest.prototype.readFileSync = function readFileSync(
    fname,
    encoding,
    flag
  ) {
    // Get file.
    var fd = this.openSync(fname, flag, 0x1a4);
    try {
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        return copyingSlice(fdBuff);
      }
      return fdBuff.toString(encoding);
    } finally {
      fd.closeSync();
    }
  };
  JSDelivrRequest.prototype._getHTTPPath = function _getHTTPPath(filePath) {
    if (filePath.charAt(0) === '/') {
      filePath = filePath.slice(1);
    }
    return (
      'https://cdn.jsdelivr.net/npm/' +
      this.dependency +
      '@' +
      this.version +
      '/' +
      filePath
    );
  };
  JSDelivrRequest.prototype._requestFileAsync = function _requestFileAsync(
    p,
    type,
    cb
  ) {
    this._requestFileAsyncInternal(this._getHTTPPath(p), type, cb);
  };
  JSDelivrRequest.prototype._requestFileSync = function _requestFileSync(
    p,
    type
  ) {
    return this._requestFileSyncInternal(this._getHTTPPath(p), type);
  };
  /**
   * Only requests the HEAD content, for the file size.
   */
  JSDelivrRequest.prototype._requestFileSizeAsync =
    function _requestFileSizeAsync(path, cb) {
      this._requestFileSizeAsyncInternal(this._getHTTPPath(path), cb);
    };
  JSDelivrRequest.prototype._requestFileSizeSync =
    function _requestFileSizeSync(path) {
      return this._requestFileSizeSyncInternal(this._getHTTPPath(path));
    };

  return JSDelivrRequest;
})(BaseFileSystem);
JSDelivrRequest.Name = 'JSDelivrRequest';
JSDelivrRequest.Options = {
  dependency: {
    type: 'string',
    description: 'Name of dependency',
  },
  version: {
    type: 'string',
    description: 'Version of dependency, has to be absolute',
  },
  preferXHR: {
    type: 'boolean',
    optional: true,
    description:
      'Whether to prefer XmlHttpRequest or fetch for async operations if both are available. Default: false',
  },
};

/* eslint-disable max-classes-per-file */
var WebsocketFS = /*@__PURE__*/ (function (SynchronousFileSystem) {
  function WebsocketFS(options) {
    SynchronousFileSystem.call(this);
    this.socket = options.socket;
  }

  if (SynchronousFileSystem) WebsocketFS.__proto__ = SynchronousFileSystem;
  WebsocketFS.prototype = Object.create(
    SynchronousFileSystem && SynchronousFileSystem.prototype
  );
  WebsocketFS.prototype.constructor = WebsocketFS;
  WebsocketFS.Create = function Create(options, cb) {
    cb(null, new WebsocketFS(options));
  };
  WebsocketFS.isAvailable = function isAvailable() {
    return true;
  };
  WebsocketFS.prototype.getName = function getName() {
    return 'WebsocketFS';
  };
  WebsocketFS.prototype.isReadOnly = function isReadOnly() {
    return false;
  };
  WebsocketFS.prototype.supportsProps = function supportsProps() {
    return false;
  };
  WebsocketFS.prototype.supportsSynch = function supportsSynch() {
    return true;
  };
  WebsocketFS.prototype.readFile = function readFile(
    fname,
    encoding,
    flag,
    cb
  ) {
    try {
      this.socket.emit(
        {
          method: 'readFile',
          args: {
            path: fname,
            encoding: encoding,
            flag: flag,
          },
        },
        function (ref) {
          var error = ref.error;
          var data = ref.data;

          if (data) {
            cb(null, Buffer.from(data));
          } else {
            cb(error);
          }
        }
      );
    } catch (e) {
      cb(e);
    }
  };
  WebsocketFS.prototype.stat = function stat(p, isLstat, cb) {
    try {
      this.socket.emit(
        {
          method: 'stat',
          args: {
            path: p,
            isLstat: isLstat,
          },
        },
        function (ref) {
          var error = ref.error;
          var data = ref.data;

          if (data) {
            cb(
              null,
              Object.assign({}, data, {
                atime: new Date(data.atime),
                mtime: new Date(data.mtime),
                ctime: new Date(data.ctime),
                birthtime: new Date(data.birthtime),
              })
            );
          } else {
            cb(error);
          }
        }
      );
    } catch (e) {
      cb(e);
    }
  };

  return WebsocketFS;
})(SynchronousFileSystem);
WebsocketFS.Name = 'WebsocketFS';
WebsocketFS.Options = {
  socket: {
    type: 'object',
    description: 'The socket emitter',
    validator: function (opt, cb) {
      if (opt) {
        cb();
      } else {
        cb(new ApiError(ErrorCode.EINVAL, 'Manager is invalid'));
      }
    },
  },
};
/*
this.statSync(p, isLstat || true)
*/

/**
 * @hidden
 */
var SpecialArgType;
(function (SpecialArgType) {
  // Callback
  SpecialArgType[(SpecialArgType['CB'] = 0)] = 'CB';
  // File descriptor
  SpecialArgType[(SpecialArgType['FD'] = 1)] = 'FD';
  // API error
  SpecialArgType[(SpecialArgType['API_ERROR'] = 2)] = 'API_ERROR';
  // Stats object
  SpecialArgType[(SpecialArgType['STATS'] = 3)] = 'STATS';
  // Initial probe for file system information.
  SpecialArgType[(SpecialArgType['PROBE'] = 4)] = 'PROBE';
  // FileFlag object.
  SpecialArgType[(SpecialArgType['FILEFLAG'] = 5)] = 'FILEFLAG';
  // Buffer object.
  SpecialArgType[(SpecialArgType['BUFFER'] = 6)] = 'BUFFER';
  // Generic Error object.
  SpecialArgType[(SpecialArgType['ERROR'] = 7)] = 'ERROR';
})(SpecialArgType || (SpecialArgType = {}));
/**
 * Converts callback arguments into ICallbackArgument objects, and back
 * again.
 * @hidden
 */
var CallbackArgumentConverter = function CallbackArgumentConverter() {
  this._callbacks = {};
  this._nextId = 0;
};
CallbackArgumentConverter.prototype.toRemoteArg = function toRemoteArg(cb) {
  var id = this._nextId++;
  this._callbacks[id] = cb;
  return {
    type: SpecialArgType.CB,
    id: id,
  };
};
CallbackArgumentConverter.prototype.toLocalArg = function toLocalArg(id) {
  var cb = this._callbacks[id];
  delete this._callbacks[id];
  return cb;
};
/**
 * @hidden
 */
var FileDescriptorArgumentConverter =
  function FileDescriptorArgumentConverter() {
    this._fileDescriptors = {};
    this._nextId = 0;
  };
FileDescriptorArgumentConverter.prototype.toRemoteArg = function toRemoteArg(
  fd,
  p,
  flag,
  cb
) {
  var id = this._nextId++;
  var data;
  var stat;
  this._fileDescriptors[id] = fd;
  // Extract needed information asynchronously.
  fd.stat(function (err, stats) {
    if (err) {
      cb(err);
    } else {
      stat = bufferToTransferrableObject(stats.toBuffer());
      // If it's a readable flag, we need to grab contents.
      if (flag.isReadable()) {
        fd.read(
          Buffer.alloc(stats.size),
          0,
          stats.size,
          0,
          function (err, bytesRead, buff) {
            if (err) {
              cb(err);
            } else {
              data = bufferToTransferrableObject(buff);
              cb(null, {
                type: SpecialArgType.FD,
                id: id,
                data: data,
                stat: stat,
                path: p,
                flag: flag.getFlagString(),
              });
            }
          }
        );
      } else {
        // File is not readable, which means writing to it will append or
        // truncate/replace existing contents. Return an empty arraybuffer.
        cb(null, {
          type: SpecialArgType.FD,
          id: id,
          data: new ArrayBuffer(0),
          stat: stat,
          path: p,
          flag: flag.getFlagString(),
        });
      }
    }
  });
};
FileDescriptorArgumentConverter.prototype.applyFdAPIRequest =
  function applyFdAPIRequest(request, cb) {
    var this$1 = this;

    var fdArg = request.args[0];
    this._applyFdChanges(fdArg, function (err, fd) {
      if (err) {
        cb(err);
      } else {
        // Apply method on now-changed file descriptor.
        fd[request.method](function (e) {
          if (request.method === 'close') {
            delete this$1._fileDescriptors[fdArg.id];
          }
          cb(e);
        });
      }
    });
  };
FileDescriptorArgumentConverter.prototype._applyFdChanges =
  function _applyFdChanges(remoteFd, cb) {
    var fd = this._fileDescriptors[remoteFd.id],
      data = transferrableObjectToBuffer(remoteFd.data),
      remoteStats = Stats.fromBuffer(
        transferrableObjectToBuffer(remoteFd.stat)
      );
    // Write data if the file is writable.
    var flag = FileFlag.getFileFlag(remoteFd.flag);
    if (flag.isWriteable()) {
      // Appendable: Write to end of file.
      // Writeable: Replace entire contents of file.
      fd.write(
        data,
        0,
        data.length,
        flag.isAppendable() ? fd.getPos() : 0,
        function (e) {
          function applyStatChanges() {
            // Check if mode changed.
            fd.stat(function (e, stats) {
              if (e) {
                cb(e);
              } else {
                if (stats.mode !== remoteStats.mode) {
                  fd.chmod(remoteStats.mode, function (e) {
                    cb(e, fd);
                  });
                } else {
                  cb(e, fd);
                }
              }
            });
          }
          if (e) {
            cb(e);
          } else {
            // If writeable & not appendable, we need to ensure file contents are
            // identical to those from the remote FD. Thus, we truncate to the
            // length of the remote file.
            if (!flag.isAppendable()) {
              fd.truncate(data.length, function () {
                applyStatChanges();
              });
            } else {
              applyStatChanges();
            }
          }
        }
      );
    } else {
      cb(null, fd);
    }
  };
/**
 * @hidden
 */
function apiErrorLocal2Remote(e) {
  return {
    type: SpecialArgType.API_ERROR,
    errorData: bufferToTransferrableObject(e.writeToBuffer()),
  };
}
/**
 * @hidden
 */
function apiErrorRemote2Local(e) {
  return ApiError.fromBuffer(transferrableObjectToBuffer(e.errorData));
}
/**
 * @hidden
 */
function errorLocal2Remote(e) {
  return {
    type: SpecialArgType.ERROR,
    name: e.name,
    message: e.message,
    stack: e.stack,
  };
}
/**
 * @hidden
 */
function errorRemote2Local(e) {
  var cnstr = toExport[e.name];
  if (typeof cnstr !== 'function') {
    cnstr = Error;
  }
  var err = new cnstr(e.message);
  err.stack = e.stack;
  return err;
}
/**
 * @hidden
 */
function statsLocal2Remote(stats) {
  return {
    type: SpecialArgType.STATS,
    statsData: bufferToTransferrableObject(stats.toBuffer()),
  };
}
/**
 * @hidden
 */
function statsRemote2Local(stats) {
  return Stats.fromBuffer(transferrableObjectToBuffer(stats.statsData));
}
/**
 * @hidden
 */
function fileFlagLocal2Remote(flag) {
  return {
    type: SpecialArgType.FILEFLAG,
    flagStr: flag.getFlagString(),
  };
}
/**
 * @hidden
 */
function fileFlagRemote2Local(remoteFlag) {
  return FileFlag.getFileFlag(remoteFlag.flagStr);
}
/**
 * @hidden
 */
function bufferToTransferrableObject(buff) {
  return buffer2ArrayBuffer(buff);
}
/**
 * @hidden
 */
function transferrableObjectToBuffer(buff) {
  return arrayBuffer2Buffer(buff);
}
/**
 * @hidden
 */
function bufferLocal2Remote(buff) {
  return {
    type: SpecialArgType.BUFFER,
    data: bufferToTransferrableObject(buff),
  };
}
/**
 * @hidden
 */
function bufferRemote2Local(buffArg) {
  return transferrableObjectToBuffer(buffArg.data);
}
/**
 * @hidden
 */
function isAPIRequest(data) {
  return (
    data &&
    typeof data === 'object' &&
    data.hasOwnProperty('browserfsMessage') &&
    data['browserfsMessage']
  );
}
/**
 * @hidden
 */
function isAPIResponse(data) {
  return (
    data &&
    typeof data === 'object' &&
    data.hasOwnProperty('browserfsMessage') &&
    data['browserfsMessage']
  );
}
/**
 * Represents a remote file in a different worker/thread.
 */
var WorkerFile = /*@__PURE__*/ (function (PreloadFile) {
  function WorkerFile(_fs, _path, _flag, _stat, remoteFdId, contents) {
    PreloadFile.call(this, _fs, _path, _flag, _stat, contents);
    this._remoteFdId = remoteFdId;
  }

  if (PreloadFile) WorkerFile.__proto__ = PreloadFile;
  WorkerFile.prototype = Object.create(PreloadFile && PreloadFile.prototype);
  WorkerFile.prototype.constructor = WorkerFile;
  WorkerFile.prototype.getRemoteFdId = function getRemoteFdId() {
    return this._remoteFdId;
  };
  /**
   * @hidden
   */
  WorkerFile.prototype.toRemoteArg = function toRemoteArg() {
    return {
      type: SpecialArgType.FD,
      id: this._remoteFdId,
      data: bufferToTransferrableObject(this.getBuffer()),
      stat: bufferToTransferrableObject(this.getStats().toBuffer()),
      path: this.getPath(),
      flag: this.getFlag().getFlagString(),
    };
  };
  WorkerFile.prototype.sync = function sync(cb) {
    this._syncClose('sync', cb);
  };
  WorkerFile.prototype.close = function close(cb) {
    this._syncClose('close', cb);
  };
  WorkerFile.prototype._syncClose = function _syncClose(type, cb) {
    var this$1 = this;

    if (this.isDirty()) {
      this._fs.syncClose(type, this, function (e) {
        if (!e) {
          this$1.resetDirty();
        }
        cb(e);
      });
    } else {
      cb();
    }
  };

  return WorkerFile;
})(PreloadFile);
/**
 * WorkerFS lets you access a BrowserFS instance that is running in a different
 * JavaScript context (e.g. access BrowserFS in one of your WebWorkers, or
 * access BrowserFS running on the main page from a WebWorker).
 *
 * For example, to have a WebWorker access files in the main browser thread,
 * do the following:
 *
 * MAIN BROWSER THREAD:
 *
 * ```javascript
 *   // Listen for remote file system requests.
 *   BrowserFS.FileSystem.WorkerFS.attachRemoteListener(webWorkerObject);
 * ```
 *
 * WEBWORKER THREAD:
 *
 * ```javascript
 *   // Set the remote file system as the root file system.
 *   BrowserFS.configure({ fs: "WorkerFS", options: { worker: self }}, function(e) {
 *     // Ready!
 *   });
 * ```
 *
 * Note that synchronous operations are not permitted on the WorkerFS, regardless
 * of the configuration option of the remote FS.
 */
var WorkerFS = /*@__PURE__*/ (function (BaseFileSystem) {
  function WorkerFS(worker) {
    var this$1 = this;

    BaseFileSystem.call(this);
    this._callbackConverter = new CallbackArgumentConverter();
    this._isInitialized = false;
    this._isReadOnly = false;
    this._supportLinks = false;
    this._supportProps = false;
    this._worker = worker;
    this._worker.addEventListener('message', function (e) {
      var resp = e.data;
      if (isAPIResponse(resp)) {
        var i;
        var args = resp.args;
        var fixedArgs = new Array(args.length);
        // Dispatch event to correct id.
        for (i = 0; i < fixedArgs.length; i++) {
          fixedArgs[i] = this$1._argRemote2Local(args[i]);
        }
        this$1._callbackConverter.toLocalArg(resp.cbId).apply(null, fixedArgs);
      }
    });
  }

  if (BaseFileSystem) WorkerFS.__proto__ = BaseFileSystem;
  WorkerFS.prototype = Object.create(
    BaseFileSystem && BaseFileSystem.prototype
  );
  WorkerFS.prototype.constructor = WorkerFS;
  WorkerFS.Create = function Create(opts, cb) {
    var fs = new WorkerFS(opts.worker);
    fs._initialize(function () {
      cb(null, fs);
    });
  };
  WorkerFS.isAvailable = function isAvailable() {
    return (
      typeof importScripts !== 'undefined' || typeof Worker !== 'undefined'
    );
  };
  /**
   * Attaches a listener to the remote worker for file system requests.
   */
  WorkerFS.attachRemoteListener = function attachRemoteListener(worker) {
    var fdConverter = new FileDescriptorArgumentConverter();

    function argLocal2Remote(arg, requestArgs, cb) {
      switch (typeof arg) {
        case 'object':
          if (arg instanceof Stats) {
            cb(null, statsLocal2Remote(arg));
          } else if (arg instanceof ApiError) {
            cb(null, apiErrorLocal2Remote(arg));
          } else if (arg instanceof BaseFile) {
            // Pass in p and flags from original request.
            cb(
              null,
              fdConverter.toRemoteArg(arg, requestArgs[0], requestArgs[1], cb)
            );
          } else if (arg instanceof FileFlag) {
            cb(null, fileFlagLocal2Remote(arg));
          } else if (arg instanceof Buffer) {
            cb(null, bufferLocal2Remote(arg));
          } else if (arg instanceof Error) {
            cb(null, errorLocal2Remote(arg));
          } else {
            cb(null, arg);
          }
          break;
        default:
          cb(null, arg);
          break;
      }
    }

    function argRemote2Local(arg, fixedRequestArgs) {
      if (!arg) {
        return arg;
      }
      switch (typeof arg) {
        case 'object':
          if (typeof arg['type'] === 'number') {
            var specialArg = arg;
            switch (specialArg.type) {
              case SpecialArgType.CB:
                var cbId = arg.id;
                return function () {
                  var arguments$1 = arguments;

                  var i;
                  var fixedArgs = new Array(arguments.length);
                  var message,
                    countdown = arguments.length;

                  function abortAndSendError(err) {
                    if (countdown > 0) {
                      countdown = -1;
                      message = {
                        browserfsMessage: true,
                        cbId: cbId,
                        args: [apiErrorLocal2Remote(err)],
                      };
                      worker.postMessage(message);
                    }
                  }
                  for (i = 0; i < arguments.length; i++) {
                    // Capture i and argument.
                    (function (i, arg) {
                      argLocal2Remote(
                        arg,
                        fixedRequestArgs,
                        function (err, fixedArg) {
                          fixedArgs[i] = fixedArg;
                          if (err) {
                            abortAndSendError(err);
                          } else if (--countdown === 0) {
                            message = {
                              browserfsMessage: true,
                              cbId: cbId,
                              args: fixedArgs,
                            };
                            worker.postMessage(message);
                          }
                        }
                      );
                    })(i, arguments$1[i]);
                  }
                  if (arguments.length === 0) {
                    message = {
                      browserfsMessage: true,
                      cbId: cbId,
                      args: fixedArgs,
                    };
                    worker.postMessage(message);
                  }
                };
              case SpecialArgType.API_ERROR:
                return apiErrorRemote2Local(specialArg);
              case SpecialArgType.STATS:
                return statsRemote2Local(specialArg);
              case SpecialArgType.FILEFLAG:
                return fileFlagRemote2Local(specialArg);
              case SpecialArgType.BUFFER:
                return bufferRemote2Local(specialArg);
              case SpecialArgType.ERROR:
                return errorRemote2Local(specialArg);
              default:
                // No idea what this is.
                return arg;
            }
          } else {
            return arg;
          }
        default:
          return arg;
      }
    }
    worker.addEventListener('message', function (e) {
      var request = e.data;
      if (isAPIRequest(request)) {
        var args = request.args,
          fixedArgs = new Array(args.length);
        switch (request.method) {
          case 'close':
          case 'sync':
            (function () {
              // File descriptor-relative methods.
              var remoteCb = args[1];
              fdConverter.applyFdAPIRequest(request, function (err) {
                // Send response.
                var response = {
                  browserfsMessage: true,
                  cbId: remoteCb.id,
                  args: err ? [apiErrorLocal2Remote(err)] : [],
                };
                worker.postMessage(response);
              });
            })();
            break;
          case 'probe':
            (function () {
              var rootFs = _fsMock.getRootFS(),
                remoteCb = args[1],
                probeResponse = {
                  type: SpecialArgType.PROBE,
                  isReadOnly: rootFs.isReadOnly(),
                  supportsLinks: rootFs.supportsLinks(),
                  supportsProps: rootFs.supportsProps(),
                },
                response = {
                  browserfsMessage: true,
                  cbId: remoteCb.id,
                  args: [probeResponse],
                };
              worker.postMessage(response);
            })();
            break;
          default:
            // File system methods.
            for (var i = 0; i < args.length; i++) {
              fixedArgs[i] = argRemote2Local(args[i], fixedArgs);
            }
            var rootFS = _fsMock.getRootFS();
            rootFS[request.method].apply(rootFS, fixedArgs);
            break;
        }
      }
    });
  };
  WorkerFS.prototype.getName = function getName() {
    return WorkerFS.Name;
  };
  WorkerFS.prototype.isReadOnly = function isReadOnly() {
    return this._isReadOnly;
  };
  WorkerFS.prototype.supportsSynch = function supportsSynch() {
    return false;
  };
  WorkerFS.prototype.supportsLinks = function supportsLinks() {
    return this._supportLinks;
  };
  WorkerFS.prototype.supportsProps = function supportsProps() {
    return this._supportProps;
  };
  WorkerFS.prototype.rename = function rename(oldPath, newPath, cb) {
    this._rpc('rename', arguments);
  };
  WorkerFS.prototype.stat = function stat(p, isLstat, cb) {
    this._rpc('stat', arguments);
  };
  WorkerFS.prototype.open = function open(p, flag, mode, cb) {
    this._rpc('open', arguments);
  };
  WorkerFS.prototype.unlink = function unlink(p, cb) {
    this._rpc('unlink', arguments);
  };
  WorkerFS.prototype.rmdir = function rmdir(p, cb) {
    this._rpc('rmdir', arguments);
  };
  WorkerFS.prototype.mkdir = function mkdir(p, mode, cb) {
    this._rpc('mkdir', arguments);
  };
  WorkerFS.prototype.readdir = function readdir(p, cb) {
    this._rpc('readdir', arguments);
  };
  WorkerFS.prototype.exists = function exists(p, cb) {
    this._rpc('exists', arguments);
  };
  WorkerFS.prototype.realpath = function realpath(p, cache, cb) {
    this._rpc('realpath', arguments);
  };
  WorkerFS.prototype.truncate = function truncate(p, len, cb) {
    this._rpc('truncate', arguments);
  };
  WorkerFS.prototype.readFile = function readFile(fname, encoding, flag, cb) {
    this._rpc('readFile', arguments);
  };
  WorkerFS.prototype.writeFile = function writeFile(
    fname,
    data,
    encoding,
    flag,
    mode,
    cb
  ) {
    this._rpc('writeFile', arguments);
  };
  WorkerFS.prototype.appendFile = function appendFile(
    fname,
    data,
    encoding,
    flag,
    mode,
    cb
  ) {
    this._rpc('appendFile', arguments);
  };
  WorkerFS.prototype.chmod = function chmod(p, isLchmod, mode, cb) {
    this._rpc('chmod', arguments);
  };
  WorkerFS.prototype.chown = function chown(p, isLchown, uid, gid, cb) {
    this._rpc('chown', arguments);
  };
  WorkerFS.prototype.utimes = function utimes(p, atime, mtime, cb) {
    this._rpc('utimes', arguments);
  };
  WorkerFS.prototype.link = function link(srcpath, dstpath, cb) {
    this._rpc('link', arguments);
  };
  WorkerFS.prototype.symlink = function symlink(srcpath, dstpath, type, cb) {
    this._rpc('symlink', arguments);
  };
  WorkerFS.prototype.readlink = function readlink(p, cb) {
    this._rpc('readlink', arguments);
  };
  WorkerFS.prototype.syncClose = function syncClose(method, fd, cb) {
    this._worker.postMessage({
      browserfsMessage: true,
      method: method,
      args: [fd.toRemoteArg(), this._callbackConverter.toRemoteArg(cb)],
    });
  };
  /**
   * Called once both local and remote sides are set up.
   */
  WorkerFS.prototype._initialize = function _initialize(cb) {
    var this$1 = this;

    if (!this._isInitialized) {
      var message = {
        browserfsMessage: true,
        method: 'probe',
        args: [
          this._argLocal2Remote(emptyBuffer()),
          this._callbackConverter.toRemoteArg(function (probeResponse) {
            this$1._isInitialized = true;
            this$1._isReadOnly = probeResponse.isReadOnly;
            this$1._supportLinks = probeResponse.supportsLinks;
            this$1._supportProps = probeResponse.supportsProps;
            cb();
          }),
        ],
      };
      this._worker.postMessage(message);
    } else {
      cb();
    }
  };
  WorkerFS.prototype._argRemote2Local = function _argRemote2Local(arg) {
    if (!arg) {
      return arg;
    }
    switch (typeof arg) {
      case 'object':
        if (typeof arg['type'] === 'number') {
          var specialArg = arg;
          switch (specialArg.type) {
            case SpecialArgType.API_ERROR:
              return apiErrorRemote2Local(specialArg);
            case SpecialArgType.FD:
              var fdArg = specialArg;
              return new WorkerFile(
                this,
                fdArg.path,
                FileFlag.getFileFlag(fdArg.flag),
                Stats.fromBuffer(transferrableObjectToBuffer(fdArg.stat)),
                fdArg.id,
                transferrableObjectToBuffer(fdArg.data)
              );
            case SpecialArgType.STATS:
              return statsRemote2Local(specialArg);
            case SpecialArgType.FILEFLAG:
              return fileFlagRemote2Local(specialArg);
            case SpecialArgType.BUFFER:
              return bufferRemote2Local(specialArg);
            case SpecialArgType.ERROR:
              return errorRemote2Local(specialArg);
            default:
              return arg;
          }
        } else {
          return arg;
        }
      default:
        return arg;
    }
  };
  WorkerFS.prototype._rpc = function _rpc(methodName, args) {
    var fixedArgs = new Array(args.length);
    for (var i = 0; i < args.length; i++) {
      fixedArgs[i] = this._argLocal2Remote(args[i]);
    }
    var message = {
      browserfsMessage: true,
      method: methodName,
      args: fixedArgs,
    };
    this._worker.postMessage(message);
  };
  /**
   * Converts a local argument into a remote argument. Public so WorkerFile objects can call it.
   */
  WorkerFS.prototype._argLocal2Remote = function _argLocal2Remote(arg) {
    if (!arg) {
      return arg;
    }
    switch (typeof arg) {
      case 'object':
        if (arg instanceof Stats) {
          return statsLocal2Remote(arg);
        } else if (arg instanceof ApiError) {
          return apiErrorLocal2Remote(arg);
        } else if (arg instanceof WorkerFile) {
          return arg.toRemoteArg();
        } else if (arg instanceof FileFlag) {
          return fileFlagLocal2Remote(arg);
        } else if (arg instanceof Buffer) {
          return bufferLocal2Remote(arg);
        } else if (arg instanceof Error) {
          return errorLocal2Remote(arg);
        } else {
          return 'Unknown argument';
        }
      case 'function':
        return this._callbackConverter.toRemoteArg(arg);
      default:
        return arg;
    }
  };

  return WorkerFS;
})(BaseFileSystem);
WorkerFS.Name = 'WorkerFS';
WorkerFS.Options = {
  worker: {
    type: 'object',
    description:
      'The target worker that you want to connect to, or the current worker if in a worker context.',
    validator: function (v, cb) {
      // Check for a `postMessage` function.
      if (v['postMessage']) {
        cb();
      } else {
        cb(
          new ApiError(
            ErrorCode.EINVAL,
            'option must be a Web Worker instance.'
          )
        );
      }
    },
  },
};

/**
 * (Nonstandard) String utility function for 8-bit ASCII with the extended
 * character set. Unlike the ASCII above, we do not mask the high bits.
 *
 * Placed into a separate file so it can be used with other Buffer implementations.
 * @see http://en.wikipedia.org/wiki/Extended_ASCII
 */
var ExtendedASCII = function ExtendedASCII() {};

ExtendedASCII.str2byte = function str2byte(str, buf) {
  var length = str.length > buf.length ? buf.length : str.length;
  for (var i = 0; i < length; i++) {
    var charCode = str.charCodeAt(i);
    if (charCode > 0x7f) {
      // Check if extended ASCII.
      var charIdx = ExtendedASCII.extendedChars.indexOf(str.charAt(i));
      if (charIdx > -1) {
        charCode = charIdx + 0x80;
      }
      // Otherwise, keep it as-is.
    }
    buf[charCode] = i;
  }
  return length;
};
ExtendedASCII.byte2str = function byte2str(buff) {
  var chars = new Array(buff.length);
  for (var i = 0; i < buff.length; i++) {
    var charCode = buff[i];
    if (charCode > 0x7f) {
      chars[i] = ExtendedASCII.extendedChars[charCode - 128];
    } else {
      chars[i] = String.fromCharCode(charCode);
    }
  }
  return chars.join('');
};
ExtendedASCII.byteLength = function byteLength(str) {
  return str.length;
};
ExtendedASCII.extendedChars = [
  '\u00C7',
  '\u00FC',
  '\u00E9',
  '\u00E2',
  '\u00E4',
  '\u00E0',
  '\u00E5',
  '\u00E7',
  '\u00EA',
  '\u00EB',
  '\u00E8',
  '\u00EF',
  '\u00EE',
  '\u00EC',
  '\u00C4',
  '\u00C5',
  '\u00C9',
  '\u00E6',
  '\u00C6',
  '\u00F4',
  '\u00F6',
  '\u00F2',
  '\u00FB',
  '\u00F9',
  '\u00FF',
  '\u00D6',
  '\u00DC',
  '\u00F8',
  '\u00A3',
  '\u00D8',
  '\u00D7',
  '\u0192',
  '\u00E1',
  '\u00ED',
  '\u00F3',
  '\u00FA',
  '\u00F1',
  '\u00D1',
  '\u00AA',
  '\u00BA',
  '\u00BF',
  '\u00AE',
  '\u00AC',
  '\u00BD',
  '\u00BC',
  '\u00A1',
  '\u00AB',
  '\u00BB',
  '_',
  '_',
  '_',
  '\u00A6',
  '\u00A6',
  '\u00C1',
  '\u00C2',
  '\u00C0',
  '\u00A9',
  '\u00A6',
  '\u00A6',
  '+',
  '+',
  '\u00A2',
  '\u00A5',
  '+',
  '+',
  '-',
  '-',
  '+',
  '-',
  '+',
  '\u00E3',
  '\u00C3',
  '+',
  '+',
  '-',
  '-',
  '\u00A6',
  '-',
  '+',
  '\u00A4',
  '\u00F0',
  '\u00D0',
  '\u00CA',
  '\u00CB',
  '\u00C8',
  'i',
  '\u00CD',
  '\u00CE',
  '\u00CF',
  '+',
  '+',
  '_',
  '_',
  '\u00A6',
  '\u00CC',
  '_',
  '\u00D3',
  '\u00DF',
  '\u00D4',
  '\u00D2',
  '\u00F5',
  '\u00D5',
  '\u00B5',
  '\u00FE',
  '\u00DE',
  '\u00DA',
  '\u00DB',
  '\u00D9',
  '\u00FD',
  '\u00DD',
  '\u00AF',
  '\u00B4',
  '\u00AD',
  '\u00B1',
  '_',
  '\u00BE',
  '\u00B6',
  '\u00A7',
  '\u00F7',
  '\u00B8',
  '\u00B0',
  '\u00A8',
  '\u00B7',
  '\u00B9',
  '\u00B3',
  '\u00B2',
  '_',
  ' ',
];

/**
 * @hidden
 */
var inflateRaw = require('pako/lib/inflate').inflateRaw;
/**
 * Maps CompressionMethod => function that decompresses.
 * @hidden
 */
var decompressionMethods = {};
/**
 * 4.4.2.2: Indicates the compatibiltiy of a file's external attributes.
 */
var ExternalFileAttributeType;
(function (ExternalFileAttributeType) {
  ExternalFileAttributeType[(ExternalFileAttributeType['MSDOS'] = 0)] = 'MSDOS';
  ExternalFileAttributeType[(ExternalFileAttributeType['AMIGA'] = 1)] = 'AMIGA';
  ExternalFileAttributeType[(ExternalFileAttributeType['OPENVMS'] = 2)] =
    'OPENVMS';
  ExternalFileAttributeType[(ExternalFileAttributeType['UNIX'] = 3)] = 'UNIX';
  ExternalFileAttributeType[(ExternalFileAttributeType['VM_CMS'] = 4)] =
    'VM_CMS';
  ExternalFileAttributeType[(ExternalFileAttributeType['ATARI_ST'] = 5)] =
    'ATARI_ST';
  ExternalFileAttributeType[(ExternalFileAttributeType['OS2_HPFS'] = 6)] =
    'OS2_HPFS';
  ExternalFileAttributeType[(ExternalFileAttributeType['MAC'] = 7)] = 'MAC';
  ExternalFileAttributeType[(ExternalFileAttributeType['Z_SYSTEM'] = 8)] =
    'Z_SYSTEM';
  ExternalFileAttributeType[(ExternalFileAttributeType['CP_M'] = 9)] = 'CP_M';
  ExternalFileAttributeType[(ExternalFileAttributeType['NTFS'] = 10)] = 'NTFS';
  ExternalFileAttributeType[(ExternalFileAttributeType['MVS'] = 11)] = 'MVS';
  ExternalFileAttributeType[(ExternalFileAttributeType['VSE'] = 12)] = 'VSE';
  ExternalFileAttributeType[(ExternalFileAttributeType['ACORN_RISC'] = 13)] =
    'ACORN_RISC';
  ExternalFileAttributeType[(ExternalFileAttributeType['VFAT'] = 14)] = 'VFAT';
  ExternalFileAttributeType[(ExternalFileAttributeType['ALT_MVS'] = 15)] =
    'ALT_MVS';
  ExternalFileAttributeType[(ExternalFileAttributeType['BEOS'] = 16)] = 'BEOS';
  ExternalFileAttributeType[(ExternalFileAttributeType['TANDEM'] = 17)] =
    'TANDEM';
  ExternalFileAttributeType[(ExternalFileAttributeType['OS_400'] = 18)] =
    'OS_400';
  ExternalFileAttributeType[(ExternalFileAttributeType['OSX'] = 19)] = 'OSX';
})(ExternalFileAttributeType || (ExternalFileAttributeType = {}));
/**
 * 4.4.5
 */
var CompressionMethod;
(function (CompressionMethod) {
  CompressionMethod[(CompressionMethod['STORED'] = 0)] = 'STORED';
  CompressionMethod[(CompressionMethod['SHRUNK'] = 1)] = 'SHRUNK';
  CompressionMethod[(CompressionMethod['REDUCED_1'] = 2)] = 'REDUCED_1';
  CompressionMethod[(CompressionMethod['REDUCED_2'] = 3)] = 'REDUCED_2';
  CompressionMethod[(CompressionMethod['REDUCED_3'] = 4)] = 'REDUCED_3';
  CompressionMethod[(CompressionMethod['REDUCED_4'] = 5)] = 'REDUCED_4';
  CompressionMethod[(CompressionMethod['IMPLODE'] = 6)] = 'IMPLODE';
  CompressionMethod[(CompressionMethod['DEFLATE'] = 8)] = 'DEFLATE';
  CompressionMethod[(CompressionMethod['DEFLATE64'] = 9)] = 'DEFLATE64';
  CompressionMethod[(CompressionMethod['TERSE_OLD'] = 10)] = 'TERSE_OLD';
  CompressionMethod[(CompressionMethod['BZIP2'] = 12)] = 'BZIP2';
  CompressionMethod[(CompressionMethod['LZMA'] = 14)] = 'LZMA';
  CompressionMethod[(CompressionMethod['TERSE_NEW'] = 18)] = 'TERSE_NEW';
  CompressionMethod[(CompressionMethod['LZ77'] = 19)] = 'LZ77';
  CompressionMethod[(CompressionMethod['WAVPACK'] = 97)] = 'WAVPACK';
  CompressionMethod[(CompressionMethod['PPMD'] = 98)] = 'PPMD'; // PPMd version I, Rev 1
})(CompressionMethod || (CompressionMethod = {}));
/**
 * Converts the input time and date in MS-DOS format into a JavaScript Date
 * object.
 * @hidden
 */
function msdos2date(time, date) {
  // MS-DOS Date
  // |0 0 0 0  0|0 0 0  0|0 0 0  0 0 0 0
  //   D (1-31)  M (1-23)  Y (from 1980)
  var day = date & 0x1f;
  // JS date is 0-indexed, DOS is 1-indexed.
  var month = ((date >> 5) & 0xf) - 1;
  var year = (date >> 9) + 1980;
  // MS DOS Time
  // |0 0 0 0  0|0 0 0  0 0 0|0  0 0 0 0
  //    Second      Minute       Hour
  var second = time & 0x1f;
  var minute = (time >> 5) & 0x3f;
  var hour = time >> 11;
  return new Date(year, month, day, hour, minute, second);
}
/**
 * Safely returns the string from the buffer, even if it is 0 bytes long.
 * (Normally, calling toString() on a buffer with start === end causes an
 * exception).
 * @hidden
 */
function safeToString(buff, useUTF8, start, length) {
  if (length === 0) {
    return '';
  } else if (useUTF8) {
    return buff.toString('utf8', start, start + length);
  } else {
    return ExtendedASCII.byte2str(buff.slice(start, start + length));
  }
}
/*
   4.3.6 Overall .ZIP file format:

      [local file header 1]
      [encryption header 1]
      [file data 1]
      [data descriptor 1]
      .
      .
      .
      [local file header n]
      [encryption header n]
      [file data n]
      [data descriptor n]
      [archive decryption header]
      [archive extra data record]
      [central directory header 1]
      .
      .
      .
      [central directory header n]
      [zip64 end of central directory record]
      [zip64 end of central directory locator]
      [end of central directory record]
*/
/**
 * 4.3.7  Local file header:
 *
 *     local file header signature     4 bytes  (0x04034b50)
 *     version needed to extract       2 bytes
 *     general purpose bit flag        2 bytes
 *     compression method              2 bytes
 *    last mod file time              2 bytes
 *    last mod file date              2 bytes
 *    crc-32                          4 bytes
 *    compressed size                 4 bytes
 *    uncompressed size               4 bytes
 *    file name length                2 bytes
 *    extra field length              2 bytes
 *
 *    file name (variable size)
 *    extra field (variable size)
 */
var FileHeader = function FileHeader(data) {
  this.data = data;
  if (data.readUInt32LE(0) !== 0x04034b50) {
    throw new ApiError(
      ErrorCode.EINVAL,
      'Invalid Zip file: Local file header has invalid signature: ' +
        this.data.readUInt32LE(0)
    );
  }
};
FileHeader.prototype.versionNeeded = function versionNeeded() {
  return this.data.readUInt16LE(4);
};
FileHeader.prototype.flags = function flags() {
  return this.data.readUInt16LE(6);
};
FileHeader.prototype.compressionMethod = function compressionMethod() {
  return this.data.readUInt16LE(8);
};
FileHeader.prototype.lastModFileTime = function lastModFileTime() {
  // Time and date is in MS-DOS format.
  return msdos2date(this.data.readUInt16LE(10), this.data.readUInt16LE(12));
};
FileHeader.prototype.rawLastModFileTime = function rawLastModFileTime() {
  return this.data.readUInt32LE(10);
};
FileHeader.prototype.crc32 = function crc32() {
  return this.data.readUInt32LE(14);
};
/**
 * These two values are COMPLETELY USELESS.
 *
 * Section 4.4.9:
 *If bit 3 of the general purpose bit flag is set,
 *these fields are set to zero in the local header and the
 *correct values are put in the data descriptor and
 *in the central directory.
 *
 * So we'll just use the central directory's values.
 */
// public compressedSize(): number { return this.data.readUInt32LE(18); }
// public uncompressedSize(): number { return this.data.readUInt32LE(22); }
FileHeader.prototype.fileNameLength = function fileNameLength() {
  return this.data.readUInt16LE(26);
};
FileHeader.prototype.extraFieldLength = function extraFieldLength() {
  return this.data.readUInt16LE(28);
};
FileHeader.prototype.fileName = function fileName() {
  return safeToString(this.data, this.useUTF8(), 30, this.fileNameLength());
};
FileHeader.prototype.extraField = function extraField() {
  var start = 30 + this.fileNameLength();
  return this.data.slice(start, start + this.extraFieldLength());
};
FileHeader.prototype.totalSize = function totalSize() {
  return 30 + this.fileNameLength() + this.extraFieldLength();
};
FileHeader.prototype.useUTF8 = function useUTF8() {
  return (this.flags() & 0x800) === 0x800;
};
/**
 * 4.3.8  File data
 *
 *   Immediately following the local header for a file
 *   SHOULD be placed the compressed or stored data for the file.
 *   If the file is encrypted, the encryption header for the file
 *   SHOULD be placed after the local header and before the file
 *   data. The series of [local file header][encryption header]
 *   [file data][data descriptor] repeats for each file in the
 *   .ZIP archive.
 *
 *   Zero-byte files, directories, and other file types that
 *   contain no content MUST not include file data.
 */
var FileData = function FileData(header, record, data) {
  this.header = header;
  this.record = record;
  this.data = data;
};
FileData.prototype.decompress = function decompress() {
  // Check the compression
  var compressionMethod = this.header.compressionMethod();
  var fcn = decompressionMethods[compressionMethod];
  if (fcn) {
    return fcn(
      this.data,
      this.record.compressedSize(),
      this.record.uncompressedSize(),
      this.record.flag()
    );
  } else {
    var name = CompressionMethod[compressionMethod];
    if (!name) {
      name = 'Unknown: ' + compressionMethod;
    }
    throw new ApiError(
      ErrorCode.EINVAL,
      "Invalid compression method on file '" +
        this.header.fileName() +
        "': " +
        name
    );
  }
};
FileData.prototype.getHeader = function getHeader() {
  return this.header;
};
FileData.prototype.getRecord = function getRecord() {
  return this.record;
};
FileData.prototype.getRawData = function getRawData() {
  return this.data;
};
/**
 * 4.3.12  Central directory structure:
 *
 *  central file header signature   4 bytes  (0x02014b50)
 *  version made by                 2 bytes
 *  version needed to extract       2 bytes
 *  general purpose bit flag        2 bytes
 *  compression method              2 bytes
 *  last mod file time              2 bytes
 *  last mod file date              2 bytes
 *  crc-32                          4 bytes
 *  compressed size                 4 bytes
 *  uncompressed size               4 bytes
 *  file name length                2 bytes
 *  extra field length              2 bytes
 *  file comment length             2 bytes
 *  disk number start               2 bytes
 *  internal file attributes        2 bytes
 *  external file attributes        4 bytes
 *  relative offset of local header 4 bytes
 *
 *  file name (variable size)
 *  extra field (variable size)
 *  file comment (variable size)
 */
var CentralDirectory = function CentralDirectory(zipData, data) {
  this.zipData = zipData;
  this.data = data;
  // Sanity check.
  if (this.data.readUInt32LE(0) !== 0x02014b50) {
    throw new ApiError(
      ErrorCode.EINVAL,
      'Invalid Zip file: Central directory record has invalid signature: ' +
        this.data.readUInt32LE(0)
    );
  }
  this._filename = this.produceFilename();
};
CentralDirectory.prototype.versionMadeBy = function versionMadeBy() {
  return this.data.readUInt16LE(4);
};
CentralDirectory.prototype.versionNeeded = function versionNeeded() {
  return this.data.readUInt16LE(6);
};
CentralDirectory.prototype.flag = function flag() {
  return this.data.readUInt16LE(8);
};
CentralDirectory.prototype.compressionMethod = function compressionMethod() {
  return this.data.readUInt16LE(10);
};
CentralDirectory.prototype.lastModFileTime = function lastModFileTime() {
  // Time and date is in MS-DOS format.
  return msdos2date(this.data.readUInt16LE(12), this.data.readUInt16LE(14));
};
CentralDirectory.prototype.rawLastModFileTime = function rawLastModFileTime() {
  return this.data.readUInt32LE(12);
};
CentralDirectory.prototype.crc32 = function crc32() {
  return this.data.readUInt32LE(16);
};
CentralDirectory.prototype.compressedSize = function compressedSize() {
  return this.data.readUInt32LE(20);
};
CentralDirectory.prototype.uncompressedSize = function uncompressedSize() {
  return this.data.readUInt32LE(24);
};
CentralDirectory.prototype.fileNameLength = function fileNameLength() {
  return this.data.readUInt16LE(28);
};
CentralDirectory.prototype.extraFieldLength = function extraFieldLength() {
  return this.data.readUInt16LE(30);
};
CentralDirectory.prototype.fileCommentLength = function fileCommentLength() {
  return this.data.readUInt16LE(32);
};
CentralDirectory.prototype.diskNumberStart = function diskNumberStart() {
  return this.data.readUInt16LE(34);
};
CentralDirectory.prototype.internalAttributes = function internalAttributes() {
  return this.data.readUInt16LE(36);
};
CentralDirectory.prototype.externalAttributes = function externalAttributes() {
  return this.data.readUInt32LE(38);
};
CentralDirectory.prototype.headerRelativeOffset =
  function headerRelativeOffset() {
    return this.data.readUInt32LE(42);
  };
CentralDirectory.prototype.produceFilename = function produceFilename() {
  /*
       4.4.17.1 claims:
       * All slashes are forward ('/') slashes.
       * Filename doesn't begin with a slash.
       * No drive letters or any nonsense like that.
       * If filename is missing, the input came from standard input.
    
       Unfortunately, this isn't true in practice. Some Windows zip utilities use
       a backslash here, but the correct Unix-style path in file headers.
    
       To avoid seeking all over the file to recover the known-good filenames
       from file headers, we simply convert '/' to '\' here.
     */
  var fileName = safeToString(
    this.data,
    this.useUTF8(),
    46,
    this.fileNameLength()
  );
  return fileName.replace(/\\/g, '/');
};
CentralDirectory.prototype.fileName = function fileName() {
  return this._filename;
};
CentralDirectory.prototype.rawFileName = function rawFileName() {
  return this.data.slice(46, 46 + this.fileNameLength());
};
CentralDirectory.prototype.extraField = function extraField() {
  var start = 44 + this.fileNameLength();
  return this.data.slice(start, start + this.extraFieldLength());
};
CentralDirectory.prototype.fileComment = function fileComment() {
  var start = 46 + this.fileNameLength() + this.extraFieldLength();
  return safeToString(
    this.data,
    this.useUTF8(),
    start,
    this.fileCommentLength()
  );
};
CentralDirectory.prototype.rawFileComment = function rawFileComment() {
  var start = 46 + this.fileNameLength() + this.extraFieldLength();
  return this.data.slice(start, start + this.fileCommentLength());
};
CentralDirectory.prototype.totalSize = function totalSize() {
  return (
    46 +
    this.fileNameLength() +
    this.extraFieldLength() +
    this.fileCommentLength()
  );
};
CentralDirectory.prototype.isDirectory = function isDirectory() {
  // NOTE: This assumes that the zip file implementation uses the lower byte
  //    of external attributes for DOS attributes for
  //    backwards-compatibility. This is not mandated, but appears to be
  //    commonplace.
  //    According to the spec, the layout of external attributes is
  //    platform-dependent.
  //    If that fails, we also check if the name of the file ends in '/',
  //    which is what Java's ZipFile implementation does.
  var fileName = this.fileName();
  return (
    (this.externalAttributes() & 0x10 ? true : false) ||
    fileName.charAt(fileName.length - 1) === '/'
  );
};
CentralDirectory.prototype.isFile = function isFile() {
  return !this.isDirectory();
};
CentralDirectory.prototype.useUTF8 = function useUTF8() {
  return (this.flag() & 0x800) === 0x800;
};
CentralDirectory.prototype.isEncrypted = function isEncrypted() {
  return (this.flag() & 0x1) === 0x1;
};
CentralDirectory.prototype.getFileData = function getFileData() {
  // Need to grab the header before we can figure out where the actual
  // compressed data starts.
  var start = this.headerRelativeOffset();
  var header = new FileHeader(this.zipData.slice(start));
  return new FileData(
    header,
    this,
    this.zipData.slice(start + header.totalSize())
  );
};
CentralDirectory.prototype.getData = function getData() {
  return this.getFileData().decompress();
};
CentralDirectory.prototype.getRawData = function getRawData() {
  return this.getFileData().getRawData();
};
CentralDirectory.prototype.getStats = function getStats() {
  return new Stats(
    FileType.FILE,
    this.uncompressedSize(),
    0x16d,
    Date.now(),
    this.lastModFileTime().getTime()
  );
};
/**
 * 4.3.16: end of central directory record
 *  end of central dir signature    4 bytes  (0x06054b50)
 *  number of this disk             2 bytes
 *  number of the disk with the
 *  start of the central directory  2 bytes
 *  total number of entries in the
 *  central directory on this disk  2 bytes
 *  total number of entries in
 *  the central directory           2 bytes
 *  size of the central directory   4 bytes
 *  offset of start of central
 *  directory with respect to
 *  the starting disk number        4 bytes
 *  .ZIP file comment length        2 bytes
 *  .ZIP file comment       (variable size)
 */
var EndOfCentralDirectory = function EndOfCentralDirectory(data) {
  this.data = data;
  if (this.data.readUInt32LE(0) !== 0x06054b50) {
    throw new ApiError(
      ErrorCode.EINVAL,
      'Invalid Zip file: End of central directory record has invalid signature: ' +
        this.data.readUInt32LE(0)
    );
  }
};
EndOfCentralDirectory.prototype.diskNumber = function diskNumber() {
  return this.data.readUInt16LE(4);
};
EndOfCentralDirectory.prototype.cdDiskNumber = function cdDiskNumber() {
  return this.data.readUInt16LE(6);
};
EndOfCentralDirectory.prototype.cdDiskEntryCount = function cdDiskEntryCount() {
  return this.data.readUInt16LE(8);
};
EndOfCentralDirectory.prototype.cdTotalEntryCount =
  function cdTotalEntryCount() {
    return this.data.readUInt16LE(10);
  };
EndOfCentralDirectory.prototype.cdSize = function cdSize() {
  return this.data.readUInt32LE(12);
};
EndOfCentralDirectory.prototype.cdOffset = function cdOffset() {
  return this.data.readUInt32LE(16);
};
EndOfCentralDirectory.prototype.cdZipCommentLength =
  function cdZipCommentLength() {
    return this.data.readUInt16LE(20);
  };
EndOfCentralDirectory.prototype.cdZipComment = function cdZipComment() {
  // Assuming UTF-8. The specification doesn't specify.
  return safeToString(this.data, true, 22, this.cdZipCommentLength());
};
EndOfCentralDirectory.prototype.rawCdZipComment = function rawCdZipComment() {
  return this.data.slice(22, 22 + this.cdZipCommentLength());
};
/**
 * Contains the table of contents of a Zip file.
 */
var ZipTOC = function ZipTOC(index, directoryEntries, eocd, data) {
  this.index = index;
  this.directoryEntries = directoryEntries;
  this.eocd = eocd;
  this.data = data;
};
/**
 * Zip file-backed filesystem
 * Implemented according to the standard:
 * http://www.pkware.com/documents/casestudies/APPNOTE.TXT
 *
 * While there are a few zip libraries for JavaScript (e.g. JSZip and zip.js),
 * they are not a good match for BrowserFS. In particular, these libraries
 * perform a lot of unneeded data copying, and eagerly decompress every file
 * in the zip file upon loading to check the CRC32. They also eagerly decode
 * strings. Furthermore, these libraries duplicate functionality already present
 * in BrowserFS (e.g. UTF-8 decoding and binary data manipulation).
 *
 * This filesystem takes advantage of BrowserFS's Buffer implementation, which
 * efficiently represents the zip file in memory (in both ArrayBuffer-enabled
 * browsers *and* non-ArrayBuffer browsers), and which can neatly be 'sliced'
 * without copying data. Each struct defined in the standard is represented with
 * a buffer slice pointing to an offset in the zip file, and has getters for
 * each field. As we anticipate that this data will not be read often, we choose
 * not to store each struct field in the JavaScript object; instead, to reduce
 * memory consumption, we retrieve it directly from the binary data each time it
 * is requested.
 *
 * When the filesystem is instantiated, we determine the directory structure
 * of the zip file as quickly as possible. We lazily decompress and check the
 * CRC32 of files. We do not cache decompressed files; if this is a desired
 * feature, it is best implemented as a generic file system wrapper that can
 * cache data from arbitrary file systems.
 *
 * For inflation, we use `pako`'s implementation:
 * https://github.com/nodeca/pako
 *
 * Current limitations:
 * * No encryption.
 * * No ZIP64 support.
 * * Read-only.
 *   Write support would require that we:
 *   - Keep track of changed/new files.
 *   - Compress changed files, and generate appropriate metadata for each.
 *   - Update file offsets for other files in the zip file.
 *   - Stream it out to a location.
 *   This isn't that bad, so we might do this at a later date.
 */
var ZipFS = /*@__PURE__*/ (function (SynchronousFileSystem) {
  function ZipFS(input, name) {
    if (name === void 0) name = '';

    SynchronousFileSystem.call(this);
    this.name = name;
    this._index = new FileIndex();
    this._directoryEntries = [];
    this._eocd = null;
    this._index = input.index;
    this._directoryEntries = input.directoryEntries;
    this._eocd = input.eocd;
    this.data = input.data;
  }

  if (SynchronousFileSystem) ZipFS.__proto__ = SynchronousFileSystem;
  ZipFS.prototype = Object.create(
    SynchronousFileSystem && SynchronousFileSystem.prototype
  );
  ZipFS.prototype.constructor = ZipFS;
  /**
   * Constructs a ZipFS instance with the given options.
   */
  ZipFS.Create = function Create(opts, cb) {
    try {
      ZipFS._computeIndex(opts.zipData, function (e, zipTOC) {
        if (zipTOC) {
          var fs = new ZipFS(zipTOC, opts.name);
          cb(null, fs);
        } else {
          cb(e);
        }
      });
    } catch (e) {
      cb(e);
    }
  };
  ZipFS.isAvailable = function isAvailable() {
    return true;
  };
  ZipFS.RegisterDecompressionMethod = function RegisterDecompressionMethod(
    m,
    fcn
  ) {
    decompressionMethods[m] = fcn;
  };
  /**
   * Locates the end of central directory record at the end of the file.
   * Throws an exception if it cannot be found.
   */
  ZipFS._getEOCD = function _getEOCD(data) {
    // Unfortunately, the comment is variable size and up to 64K in size.
    // We assume that the magic signature does not appear in the comment, and
    // in the bytes between the comment and the signature. Other ZIP
    // implementations make this same assumption, since the alternative is to
    // read thread every entry in the file to get to it. :(
    // These are *negative* offsets from the end of the file.
    var startOffset = 22;
    var endOffset = Math.min(startOffset + 0xffff, data.length - 1);
    // There's not even a byte alignment guarantee on the comment so we need to
    // search byte by byte. *grumble grumble*
    for (var i = startOffset; i < endOffset; i++) {
      // Magic number: EOCD Signature
      if (data.readUInt32LE(data.length - i) === 0x06054b50) {
        return new EndOfCentralDirectory(data.slice(data.length - i));
      }
    }
    throw new ApiError(
      ErrorCode.EINVAL,
      'Invalid ZIP file: Could not locate End of Central Directory signature.'
    );
  };
  ZipFS._addToIndex = function _addToIndex(cd, index) {
    // Paths must be absolute, yet zip file paths are always relative to the
    // zip root. So we append '/' and call it a day.
    var filename = cd.fileName();
    if (filename.charAt(0) === '/') {
      throw new ApiError(
        ErrorCode.EPERM,
        'Unexpectedly encountered an absolute path in a zip file. Please file a bug.'
      );
    }
    // XXX: For the file index, strip the trailing '/'.
    if (filename.charAt(filename.length - 1) === '/') {
      filename = filename.substr(0, filename.length - 1);
    }
    if (cd.isDirectory()) {
      index.addPathFast('/' + filename, new DirInode(cd));
    } else {
      index.addPathFast('/' + filename, new FileInode(cd));
    }
  };
  ZipFS._computeIndex = function _computeIndex(data, cb) {
    try {
      var index = new FileIndex();
      var eocd = ZipFS._getEOCD(data);
      if (eocd.diskNumber() !== eocd.cdDiskNumber()) {
        return cb(
          new ApiError(
            ErrorCode.EINVAL,
            'ZipFS does not support spanned zip files.'
          )
        );
      }
      var cdPtr = eocd.cdOffset();
      if (cdPtr === 0xffffffff) {
        return cb(
          new ApiError(ErrorCode.EINVAL, 'ZipFS does not support Zip64.')
        );
      }
      var cdEnd = cdPtr + eocd.cdSize();
      ZipFS._computeIndexResponsive(data, index, cdPtr, cdEnd, cb, [], eocd);
    } catch (e) {
      cb(e);
    }
  };
  ZipFS._computeIndexResponsiveTrampoline =
    function _computeIndexResponsiveTrampoline(
      data,
      index,
      cdPtr,
      cdEnd,
      cb,
      cdEntries,
      eocd
    ) {
      try {
        ZipFS._computeIndexResponsive(
          data,
          index,
          cdPtr,
          cdEnd,
          cb,
          cdEntries,
          eocd
        );
      } catch (e) {
        cb(e);
      }
    };
  ZipFS._computeIndexResponsive = function _computeIndexResponsive(
    data,
    index,
    cdPtr,
    cdEnd,
    cb,
    cdEntries,
    eocd
  ) {
    if (cdPtr < cdEnd) {
      var count = 0;
      while (count++ < 200 && cdPtr < cdEnd) {
        var cd = new CentralDirectory(data, data.slice(cdPtr));
        ZipFS._addToIndex(cd, index);
        cdPtr += cd.totalSize();
        cdEntries.push(cd);
      }
      setImmediate$1(function () {
        ZipFS._computeIndexResponsiveTrampoline(
          data,
          index,
          cdPtr,
          cdEnd,
          cb,
          cdEntries,
          eocd
        );
      });
    } else {
      cb(null, new ZipTOC(index, cdEntries, eocd, data));
    }
  };
  ZipFS.prototype.getName = function getName() {
    return ZipFS.Name + (this.name !== '' ? ' ' + this.name : '');
  };
  /**
   * Get the CentralDirectory object for the given path.
   */
  ZipFS.prototype.getCentralDirectoryEntry = function getCentralDirectoryEntry(
    path
  ) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    if (isFileInode(inode)) {
      return inode.getData();
    } else if (isDirInode(inode)) {
      return inode.getData();
    } else {
      // Should never occur.
      throw ApiError.EPERM('Invalid inode: ' + inode);
    }
  };
  ZipFS.prototype.getCentralDirectoryEntryAt =
    function getCentralDirectoryEntryAt(index) {
      var dirEntry = this._directoryEntries[index];
      if (!dirEntry) {
        throw new RangeError('Invalid directory index: ' + index + '.');
      }
      return dirEntry;
    };
  ZipFS.prototype.getNumberOfCentralDirectoryEntries =
    function getNumberOfCentralDirectoryEntries() {
      return this._directoryEntries.length;
    };
  ZipFS.prototype.getEndOfCentralDirectory =
    function getEndOfCentralDirectory() {
      return this._eocd;
    };
  ZipFS.prototype.diskSpace = function diskSpace(path, cb) {
    // Read-only file system.
    cb(this.data.length, 0);
  };
  ZipFS.prototype.isReadOnly = function isReadOnly() {
    return true;
  };
  ZipFS.prototype.supportsLinks = function supportsLinks() {
    return false;
  };
  ZipFS.prototype.supportsProps = function supportsProps() {
    return false;
  };
  ZipFS.prototype.supportsSynch = function supportsSynch() {
    return true;
  };
  ZipFS.prototype.statSync = function statSync(path, isLstat) {
    var inode = this._index.getInode(path);
    if (inode === null) {
      throw ApiError.ENOENT(path);
    }
    var stats;
    if (isFileInode(inode)) {
      stats = inode.getData().getStats();
    } else if (isDirInode(inode)) {
      stats = inode.getStats();
    } else {
      throw new ApiError(ErrorCode.EINVAL, 'Invalid inode.');
    }
    return stats;
  };
  ZipFS.prototype.openSync = function openSync(path, flags, mode) {
    // INVARIANT: Cannot write to RO file systems.
    if (flags.isWriteable()) {
      throw new ApiError(ErrorCode.EPERM, path);
    }
    // Check if the path exists, and is a file.
    var inode = this._index.getInode(path);
    if (!inode) {
      throw ApiError.ENOENT(path);
    } else if (isFileInode(inode)) {
      var cdRecord = inode.getData();
      var stats = cdRecord.getStats();
      switch (flags.pathExistsAction()) {
        case ActionType.THROW_EXCEPTION:
        case ActionType.TRUNCATE_FILE:
          throw ApiError.EEXIST(path);
        case ActionType.NOP:
          return new NoSyncFile(this, path, flags, stats, cdRecord.getData());
        default:
          throw new ApiError(ErrorCode.EINVAL, 'Invalid FileMode object.');
      }
    } else {
      throw ApiError.EISDIR(path);
    }
  };
  ZipFS.prototype.readdirSync = function readdirSync(path) {
    // Check if it exists.
    var inode = this._index.getInode(path);
    if (!inode) {
      throw ApiError.ENOENT(path);
    } else if (isDirInode(inode)) {
      return inode.getListing();
    } else {
      throw ApiError.ENOTDIR(path);
    }
  };
  /**
   * Specially-optimized readfile.
   */
  ZipFS.prototype.readFileSync = function readFileSync(fname, encoding, flag) {
    // Get file.
    var fd = this.openSync(fname, flag, 0x1a4);
    try {
      var fdCast = fd;
      var fdBuff = fdCast.getBuffer();
      if (encoding === null) {
        return copyingSlice(fdBuff);
      }
      return fdBuff.toString(encoding);
    } finally {
      fd.closeSync();
    }
  };

  return ZipFS;
})(SynchronousFileSystem);
ZipFS.Name = 'ZipFS';
ZipFS.Options = {
  zipData: {
    type: 'object',
    description: 'The zip file as a Buffer object.',
    validator: bufferValidator,
  },
  name: {
    type: 'string',
    optional: true,
    description: 'The name of the zip file (optional).',
  },
};
ZipFS.CompressionMethod = CompressionMethod;
ZipFS.RegisterDecompressionMethod(
  CompressionMethod.DEFLATE,
  function (data, compressedSize, uncompressedSize) {
    return arrayish2Buffer(
      inflateRaw(data.slice(0, compressedSize), {
        chunkSize: uncompressedSize,
      })
    );
  }
);
ZipFS.RegisterDecompressionMethod(
  CompressionMethod.STORED,
  function (data, compressedSize, uncompressedSize) {
    return copyingSlice(data, 0, uncompressedSize);
  }
);

// Monkey-patch `Create` functions to check options before file system initialization.
[
  AsyncMirror,
  InMemoryFileSystem,
  IndexedDBFileSystem,
  FolderAdapter,
  OverlayFS,
  LocalStorageFileSystem,
  MountableFileSystem,
  WorkerFS,
  BundledHTTPRequest,
  HTTPRequest,
  UNPKGRequest,
  JSDelivrRequest,
  ZipFS,
  CodeSandboxFS,
  CodeSandboxEditorFS,
  WebsocketFS,
  DynamicHTTPRequest,
].forEach(function (fsType) {
  var create = fsType.Create;
  fsType.Create = function (opts, cb) {
    var oneArg = typeof opts === 'function';
    var normalizedCb = oneArg ? opts : cb;
    var normalizedOpts = oneArg ? {} : opts;

    function wrappedCb(e) {
      if (e) {
        normalizedCb(e);
      } else {
        create.call(fsType, normalizedOpts, normalizedCb);
      }
    }
    checkOptions(fsType, normalizedOpts, wrappedCb);
  };
});
/**
 * @hidden
 */
var Backends = {
  AsyncMirror: AsyncMirror,
  FolderAdapter: FolderAdapter,
  InMemory: InMemoryFileSystem,
  IndexedDB: IndexedDBFileSystem,
  OverlayFS: OverlayFS,
  LocalStorage: LocalStorageFileSystem,
  MountableFileSystem: MountableFileSystem,
  WorkerFS: WorkerFS,
  BundledHTTPRequest: BundledHTTPRequest,
  HTTPRequest: HTTPRequest,
  UNPKGRequest: UNPKGRequest,
  JSDelivrRequest: JSDelivrRequest,
  XmlHttpRequest: HTTPRequest,
  ZipFS: ZipFS,
  CodeSandboxFS: CodeSandboxFS,
  CodeSandboxEditorFS: CodeSandboxEditorFS,
  WebsocketFS: WebsocketFS,
  DynamicHTTPRequest: DynamicHTTPRequest,
};

/**
 * BrowserFS's main module. This is exposed in the browser via the BrowserFS global.
 * Due to limitations in typedoc, we document these functions in ./typedoc.ts.
 */
if (process['initializeTTYs']) {
  process['initializeTTYs']();
}
/**
 * Installs BFSRequire as global `require`, a Node Buffer polyfill as the global `Buffer` variable,
 * and a Node process polyfill as the global `process` variable.
 */
function install(obj) {
  obj.Buffer = Buffer;
  obj.process = process;
  var oldRequire = obj.require ? obj.require : null;
  // Monkey-patch require for Node-style code.
  obj.require = function (arg) {
    var rv = BFSRequire(arg);
    if (!rv) {
      return oldRequire.apply(null, Array.prototype.slice.call(arguments, 0));
    } else {
      return rv;
    }
  };
}
/**
 * @hidden
 */
function registerFileSystem(name, fs) {
  Backends[name] = fs;
}

function BFSRequire(module) {
  switch (module) {
    case 'fs':
      return _fsMock;
    case 'path':
      return path;
    case 'buffer':
      // The 'buffer' module has 'Buffer' as a property.
      return buffer;
    case 'process':
      return process;
    case 'bfs_utils':
      return BFSUtils;
    default:
      return Backends[module];
  }
}
/**
 * Initializes BrowserFS with the given root file system.
 */
function initialize(rootfs) {
  return _fsMock.initialize(rootfs);
}
/**
 * Creates a file system with the given configuration, and initializes BrowserFS with it.
 * See the FileSystemConfiguration type for more info on the configuration object.
 */
function configure(config, cb) {
  getFileSystem(config, function (e, fs) {
    if (fs) {
      initialize(fs);
      cb();
    } else {
      cb(e);
    }
  });
}
/**
 * Retrieve a file system with the given configuration.
 * @param config A FileSystemConfiguration object. See FileSystemConfiguration for details.
 * @param cb Called when the file system is constructed, or when an error occurs.
 */
function getFileSystem(config, cb) {
  var fsName = config['fs'];
  if (!fsName) {
    return cb(
      new ApiError(
        ErrorCode.EPERM,
        'Missing "fs" property on configuration object.'
      )
    );
  }
  var options = config['options'];
  var waitCount = 0;
  var called = false;

  function finish() {
    if (!called) {
      called = true;
      var fsc = Backends[fsName];
      if (!fsc) {
        cb(
          new ApiError(
            ErrorCode.EPERM,
            'File system ' + fsName + ' is not available in BrowserFS.'
          )
        );
      } else {
        fsc.Create(options, cb);
      }
    }
  }
  if (options !== null && typeof options === 'object') {
    var finishedIterating = false;
    var props = Object.keys(options).filter(function (k) {
      return k !== 'fs';
    });
    // Check recursively if other fields have 'fs' properties.
    props.forEach(function (p) {
      var d = options[p];
      if (d !== null && typeof d === 'object' && d['fs']) {
        waitCount++;
        getFileSystem(d, function (e, fs) {
          waitCount--;
          if (e) {
            if (called) {
              return;
            }
            called = true;
            cb(e);
          } else {
            options[p] = fs;
            if (waitCount === 0 && finishedIterating) {
              finish();
            }
          }
        });
      }
    });
    finishedIterating = true;
  }
  if (waitCount === 0) {
    finish();
  }
}

/**
 * BrowserFS's main entry point.
 * It installs all of the needed polyfills, and requires() the main module.
 */
// IE substr does not support negative indices
if ('ab'.substr(-1) !== 'b') {
  String.prototype.substr = (function (substr) {
    return function (start, length) {
      // did we get a negative start, calculate how much it is from the
      // beginning of the string
      if (start < 0) {
        start = this.length + start;
      }
      // call the original function
      return substr.call(this, start, length);
    };
  })(String.prototype.substr);
}
// Polyfill for Uint8Array.prototype.slice.
// Safari and some other browsers do not define it.
if (typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined') {
  if (!Uint8Array.prototype['slice']) {
    Uint8Array.prototype.slice = function (start, end) {
      if (start === void 0) start = 0;
      if (end === void 0) end = this.length;

      var self = this;
      if (start < 0) {
        start = this.length + start;
        if (start < 0) {
          start = 0;
        }
      }
      if (end < 0) {
        end = this.length + end;
        if (end < 0) {
          end = 0;
        }
      }
      if (end < start) {
        end = start;
      }
      return new Uint8Array(self.buffer, self.byteOffset + start, end - start);
    };
  }
}

exports.BFSRequire = BFSRequire;
exports.EmscriptenFS = BFSEmscriptenFS;
exports.Errors = api_error;
exports.FileSystem = Backends;
exports.configure = configure;
exports.getFileSystem = getFileSystem;
exports.initialize = initialize;
exports.install = install;
exports.registerFileSystem = registerFileSystem;
exports.setImmediate = setImmediate$1;
