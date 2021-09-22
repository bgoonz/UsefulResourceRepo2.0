(function () {
  var Module = {};
  var Module;
  if (!Module) Module = (typeof Module !== "undefined" ? Module : null) || {};
  var moduleOverrides = {};
  for (var key in Module) {
    if (Module.hasOwnProperty(key)) {
      moduleOverrides[key] = Module[key];
    }
  }
  var ENVIRONMENT_IS_WEB = false;
  var ENVIRONMENT_IS_WORKER = false;
  var ENVIRONMENT_IS_NODE = false;
  var ENVIRONMENT_IS_SHELL = false;
  if (Module["ENVIRONMENT"]) {
    if (Module["ENVIRONMENT"] === "WEB") {
      ENVIRONMENT_IS_WEB = true;
    } else if (Module["ENVIRONMENT"] === "WORKER") {
      ENVIRONMENT_IS_WORKER = true;
    } else if (Module["ENVIRONMENT"] === "NODE") {
      ENVIRONMENT_IS_NODE = true;
    } else if (Module["ENVIRONMENT"] === "SHELL") {
      ENVIRONMENT_IS_SHELL = true;
    } else {
      throw new Error(
        "The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL."
      );
    }
  } else {
    ENVIRONMENT_IS_WEB = typeof window === "object";
    ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
    ENVIRONMENT_IS_NODE =
      typeof process === "object" &&
      typeof require === "function" &&
      !ENVIRONMENT_IS_WEB &&
      !ENVIRONMENT_IS_WORKER;
    ENVIRONMENT_IS_SHELL =
      !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
  }
  if (ENVIRONMENT_IS_NODE) {
    if (!Module["print"]) Module["print"] = console.log;
    if (!Module["printErr"]) Module["printErr"] = console.warn;
    var nodeFS;
    var nodePath;
    Module["read"] = function read(filename, binary) {
      if (!nodeFS) nodeFS = require("fs");
      if (!nodePath) nodePath = require("path");
      filename = nodePath["normalize"](filename);
      var ret = nodeFS["readFileSync"](filename);
      return binary ? ret : ret.toString();
    };
    Module["readBinary"] = function readBinary(filename) {
      var ret = Module["read"](filename, true);
      if (!ret.buffer) {
        ret = new Uint8Array(ret);
      }
      assert(ret.buffer);
      return ret;
    };
    Module["load"] = function load(f) {
      globalEval(read(f));
    };
    if (!Module["thisProgram"]) {
      if (process["argv"].length > 1) {
        Module["thisProgram"] = process["argv"][1].replace(/\\/g, "/");
      } else {
        Module["thisProgram"] = "unknown-program";
      }
    }
    Module["arguments"] = process["argv"].slice(2);
    if (typeof module !== "undefined") {
      module["exports"] = Module;
    }
    process["on"]("uncaughtException", function (ex) {
      if (!(ex instanceof ExitStatus)) {
        throw ex;
      }
    });
    Module["inspect"] = function () {
      return "[Emscripten Module object]";
    };
  } else if (ENVIRONMENT_IS_SHELL) {
    if (!Module["print"]) Module["print"] = print;
    if (typeof printErr != "undefined") Module["printErr"] = printErr;
    if (typeof read != "undefined") {
      Module["read"] = read;
    } else {
      Module["read"] = function read() {
        throw "no read() available";
      };
    }
    Module["readBinary"] = function readBinary(f) {
      if (typeof readbuffer === "function") {
        return new Uint8Array(readbuffer(f));
      }
      var data = read(f, "binary");
      assert(typeof data === "object");
      return data;
    };
    if (typeof scriptArgs != "undefined") {
      Module["arguments"] = scriptArgs;
    } else if (typeof arguments != "undefined") {
      Module["arguments"] = arguments;
    }
    if (typeof quit === "function") {
      Module["quit"] = function (status, toThrow) {
        quit(status);
      };
    }
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    Module["read"] = function read(url) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.send(null);
      return xhr.responseText;
    };
    if (ENVIRONMENT_IS_WORKER) {
      Module["readBinary"] = function read(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
        return xhr.response;
      };
    }
    Module["readAsync"] = function readAsync(url, onload, onerror) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function xhr_onload() {
        if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
          onload(xhr.response);
        } else {
          onerror();
        }
      };
      xhr.onerror = onerror;
      xhr.send(null);
    };
    if (typeof arguments != "undefined") {
      Module["arguments"] = arguments;
    }
    if (typeof console !== "undefined") {
      if (!Module["print"])
        Module["print"] = function print(x) {
          console.log(x);
        };
      if (!Module["printErr"])
        Module["printErr"] = function printErr(x) {
          console.warn(x);
        };
    } else {
      var TRY_USE_DUMP = false;
      if (!Module["print"])
        Module["print"] =
          TRY_USE_DUMP && typeof dump !== "undefined"
            ? function (x) {
                dump(x);
              }
            : function (x) {};
    }
    if (ENVIRONMENT_IS_WORKER) {
      Module["load"] = importScripts;
    }
    if (typeof Module["setWindowTitle"] === "undefined") {
      Module["setWindowTitle"] = function (title) {
        document.title = title;
      };
    }
  } else {
    throw "Unknown runtime environment. Where are we?";
  }
  function globalEval(x) {
    eval.call(null, x);
  }
  if (!Module["load"] && Module["read"]) {
    Module["load"] = function load(f) {
      globalEval(Module["read"](f));
    };
  }
  if (!Module["print"]) {
    Module["print"] = function () {};
  }
  if (!Module["printErr"]) {
    Module["printErr"] = Module["print"];
  }
  if (!Module["arguments"]) {
    Module["arguments"] = [];
  }
  if (!Module["thisProgram"]) {
    Module["thisProgram"] = "./this.program";
  }
  if (!Module["quit"]) {
    Module["quit"] = function (status, toThrow) {
      throw toThrow;
    };
  }
  Module.print = Module["print"];
  Module.printErr = Module["printErr"];
  Module["preRun"] = [];
  Module["postRun"] = [];
  for (var key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key];
    }
  }
  moduleOverrides = undefined;
  var Runtime = {
    setTempRet0: function (value) {
      tempRet0 = value;
      return value;
    },
    getTempRet0: function () {
      return tempRet0;
    },
    stackSave: function () {
      return STACKTOP;
    },
    stackRestore: function (stackTop) {
      STACKTOP = stackTop;
    },
    getNativeTypeSize: function (type) {
      switch (type) {
        case "i1":
        case "i8":
          return 1;
        case "i16":
          return 2;
        case "i32":
          return 4;
        case "i64":
          return 8;
        case "float":
          return 4;
        case "double":
          return 8;
        default: {
          if (type[type.length - 1] === "*") {
            return Runtime.QUANTUM_SIZE;
          } else if (type[0] === "i") {
            var bits = parseInt(type.substr(1));
            assert(bits % 8 === 0);
            return bits / 8;
          } else {
            return 0;
          }
        }
      }
    },
    getNativeFieldSize: function (type) {
      return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
    },
    STACK_ALIGN: 16,
    prepVararg: function (ptr, type) {
      if (type === "double" || type === "i64") {
        if (ptr & 7) {
          assert((ptr & 7) === 4);
          ptr += 4;
        }
      } else {
        assert((ptr & 3) === 0);
      }
      return ptr;
    },
    getAlignSize: function (type, size, vararg) {
      if (!vararg && (type == "i64" || type == "double")) return 8;
      if (!type) return Math.min(size, 8);
      return Math.min(
        size || (type ? Runtime.getNativeFieldSize(type) : 0),
        Runtime.QUANTUM_SIZE
      );
    },
    dynCall: function (sig, ptr, args) {
      if (args && args.length) {
        return Module["dynCall_" + sig].apply(null, [ptr].concat(args));
      } else {
        return Module["dynCall_" + sig].call(null, ptr);
      }
    },
    functionPointers: [],
    addFunction: function (func) {
      for (var i = 0; i < Runtime.functionPointers.length; i++) {
        if (!Runtime.functionPointers[i]) {
          Runtime.functionPointers[i] = func;
          return 2 * (1 + i);
        }
      }
      throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
    },
    removeFunction: function (index) {
      Runtime.functionPointers[(index - 2) / 2] = null;
    },
    warnOnce: function (text) {
      if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
      if (!Runtime.warnOnce.shown[text]) {
        Runtime.warnOnce.shown[text] = 1;
        Module.printErr(text);
      }
    },
    funcWrappers: {},
    getFuncWrapper: function (func, sig) {
      assert(sig);
      if (!Runtime.funcWrappers[sig]) {
        Runtime.funcWrappers[sig] = {};
      }
      var sigCache = Runtime.funcWrappers[sig];
      if (!sigCache[func]) {
        if (sig.length === 1) {
          sigCache[func] = function dynCall_wrapper() {
            return Runtime.dynCall(sig, func);
          };
        } else if (sig.length === 2) {
          sigCache[func] = function dynCall_wrapper(arg) {
            return Runtime.dynCall(sig, func, [arg]);
          };
        } else {
          sigCache[func] = function dynCall_wrapper() {
            return Runtime.dynCall(
              sig,
              func,
              Array.prototype.slice.call(arguments)
            );
          };
        }
      }
      return sigCache[func];
    },
    getCompilerSetting: function (name) {
      throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
    },
    stackAlloc: function (size) {
      var ret = STACKTOP;
      STACKTOP = (STACKTOP + size) | 0;
      STACKTOP = (STACKTOP + 15) & -16;
      return ret;
    },
    staticAlloc: function (size) {
      var ret = STATICTOP;
      STATICTOP = (STATICTOP + size) | 0;
      STATICTOP = (STATICTOP + 15) & -16;
      return ret;
    },
    dynamicAlloc: function (size) {
      var ret = HEAP32[DYNAMICTOP_PTR >> 2];
      var end = ((ret + size + 15) | 0) & -16;
      HEAP32[DYNAMICTOP_PTR >> 2] = end;
      if (end >= TOTAL_MEMORY) {
        var success = enlargeMemory();
        if (!success) {
          HEAP32[DYNAMICTOP_PTR >> 2] = ret;
          return 0;
        }
      }
      return ret;
    },
    alignMemory: function (size, quantum) {
      var ret = (size =
        Math.ceil(size / (quantum ? quantum : 16)) * (quantum ? quantum : 16));
      return ret;
    },
    makeBigInt: function (low, high, unsigned) {
      var ret = unsigned
        ? +(low >>> 0) + +(high >>> 0) * +4294967296
        : +(low >>> 0) + +(high | 0) * +4294967296;
      return ret;
    },
    GLOBAL_BASE: 8,
    QUANTUM_SIZE: 4,
    __dummy__: 0,
  };
  Module["Runtime"] = Runtime;
  var ABORT = 0;
  var EXITSTATUS = 0;
  function assert(condition, text) {
    if (!condition) {
      abort("Assertion failed: " + text);
    }
  }
  function getCFunc(ident) {
    var func = Module["_" + ident];
    if (!func) {
      try {
        func = eval("_" + ident);
      } catch (e) {}
    }
    assert(
      func,
      "Cannot call unknown function " +
        ident +
        " (perhaps LLVM optimizations or closure removed it?)"
    );
    return func;
  }
  var cwrap, ccall;
  (function () {
    var JSfuncs = {
      stackSave: function () {
        Runtime.stackSave();
      },
      stackRestore: function () {
        Runtime.stackRestore();
      },
      arrayToC: function (arr) {
        var ret = Runtime.stackAlloc(arr.length);
        writeArrayToMemory(arr, ret);
        return ret;
      },
      stringToC: function (str) {
        var ret = 0;
        if (str !== null && str !== undefined && str !== 0) {
          var len = (str.length << 2) + 1;
          ret = Runtime.stackAlloc(len);
          stringToUTF8(str, ret, len);
        }
        return ret;
      },
    };
    var toC = { string: JSfuncs["stringToC"], array: JSfuncs["arrayToC"] };
    ccall = function ccallFunc(ident, returnType, argTypes, args, opts) {
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = Runtime.stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      if (returnType === "string") ret = Pointer_stringify(ret);
      if (stack !== 0) {
        if (opts && opts.async) {
          EmterpreterAsync.asyncFinalizers.push(function () {
            Runtime.stackRestore(stack);
          });
          return;
        }
        Runtime.stackRestore(stack);
      }
      return ret;
    };
    var sourceRegex =
      /^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
    function parseJSFunc(jsfunc) {
      var parsed = jsfunc.toString().match(sourceRegex).slice(1);
      return { arguments: parsed[0], body: parsed[1], returnValue: parsed[2] };
    }
    var JSsource = null;
    function ensureJSsource() {
      if (!JSsource) {
        JSsource = {};
        for (var fun in JSfuncs) {
          if (JSfuncs.hasOwnProperty(fun)) {
            JSsource[fun] = parseJSFunc(JSfuncs[fun]);
          }
        }
      }
    }
    cwrap = function cwrap(ident, returnType, argTypes) {
      argTypes = argTypes || [];
      var cfunc = getCFunc(ident);
      var numericArgs = argTypes.every(function (type) {
        return type === "number";
      });
      var numericRet = returnType !== "string";
      if (numericRet && numericArgs) {
        return cfunc;
      }
      var argNames = argTypes.map(function (x, i) {
        return "$" + i;
      });
      var funcstr = "(function(" + argNames.join(",") + ") {";
      var nargs = argTypes.length;
      if (!numericArgs) {
        ensureJSsource();
        funcstr += "var stack = " + JSsource["stackSave"].body + ";";
        for (var i = 0; i < nargs; i++) {
          var arg = argNames[i],
            type = argTypes[i];
          if (type === "number") continue;
          var convertCode = JSsource[type + "ToC"];
          funcstr += "var " + convertCode.arguments + " = " + arg + ";";
          funcstr += convertCode.body + ";";
          funcstr += arg + "=(" + convertCode.returnValue + ");";
        }
      }
      var cfuncname = parseJSFunc(function () {
        return cfunc;
      }).returnValue;
      funcstr += "var ret = " + cfuncname + "(" + argNames.join(",") + ");";
      if (!numericRet) {
        var strgfy = parseJSFunc(function () {
          return Pointer_stringify;
        }).returnValue;
        funcstr += "ret = " + strgfy + "(ret);";
      }
      if (!numericArgs) {
        ensureJSsource();
        funcstr += JSsource["stackRestore"].body.replace("()", "(stack)") + ";";
      }
      funcstr += "return ret})";
      return eval(funcstr);
    };
  })();
  Module["ccall"] = ccall;
  Module["cwrap"] = cwrap;
  function setValue(ptr, value, type, noSafe) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") type = "i32";
    switch (type) {
      case "i1":
        HEAP8[ptr >> 0] = value;
        break;
      case "i8":
        HEAP8[ptr >> 0] = value;
        break;
      case "i16":
        HEAP16[ptr >> 1] = value;
        break;
      case "i32":
        HEAP32[ptr >> 2] = value;
        break;
      case "i64":
        (tempI64 = [
          value >>> 0,
          ((tempDouble = value),
          +Math_abs(tempDouble) >= +1
            ? tempDouble > +0
              ? (Math_min(+Math_floor(tempDouble / +4294967296), +4294967295) |
                  0) >>>
                0
              : ~~+Math_ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / +4294967296
                ) >>> 0
            : 0),
        ]),
          (HEAP32[ptr >> 2] = tempI64[0]),
          (HEAP32[(ptr + 4) >> 2] = tempI64[1]);
        break;
      case "float":
        HEAPF32[ptr >> 2] = value;
        break;
      case "double":
        HEAPF64[ptr >> 3] = value;
        break;
      default:
        abort("invalid type for setValue: " + type);
    }
  }
  Module["setValue"] = setValue;
  function getValue(ptr, type, noSafe) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") type = "i32";
    switch (type) {
      case "i1":
        return HEAP8[ptr >> 0];
      case "i8":
        return HEAP8[ptr >> 0];
      case "i16":
        return HEAP16[ptr >> 1];
      case "i32":
        return HEAP32[ptr >> 2];
      case "i64":
        return HEAP32[ptr >> 2];
      case "float":
        return HEAPF32[ptr >> 2];
      case "double":
        return HEAPF64[ptr >> 3];
      default:
        abort("invalid type for setValue: " + type);
    }
    return null;
  }
  Module["getValue"] = getValue;
  var ALLOC_NORMAL = 0;
  var ALLOC_STACK = 1;
  var ALLOC_STATIC = 2;
  var ALLOC_DYNAMIC = 3;
  var ALLOC_NONE = 4;
  Module["ALLOC_NORMAL"] = ALLOC_NORMAL;
  Module["ALLOC_STACK"] = ALLOC_STACK;
  Module["ALLOC_STATIC"] = ALLOC_STATIC;
  Module["ALLOC_DYNAMIC"] = ALLOC_DYNAMIC;
  Module["ALLOC_NONE"] = ALLOC_NONE;
  function allocate(slab, types, allocator, ptr) {
    var zeroinit, size;
    if (typeof slab === "number") {
      zeroinit = true;
      size = slab;
    } else {
      zeroinit = false;
      size = slab.length;
    }
    var singleType = typeof types === "string" ? types : null;
    var ret;
    if (allocator == ALLOC_NONE) {
      ret = ptr;
    } else {
      ret = [
        typeof _malloc === "function" ? _malloc : Runtime.staticAlloc,
        Runtime.stackAlloc,
        Runtime.staticAlloc,
        Runtime.dynamicAlloc,
      ][allocator === undefined ? ALLOC_STATIC : allocator](
        Math.max(size, singleType ? 1 : types.length)
      );
    }
    if (zeroinit) {
      var ptr = ret,
        stop;
      assert((ret & 3) == 0);
      stop = ret + (size & ~3);
      for (; ptr < stop; ptr += 4) {
        HEAP32[ptr >> 2] = 0;
      }
      stop = ret + size;
      while (ptr < stop) {
        HEAP8[ptr++ >> 0] = 0;
      }
      return ret;
    }
    if (singleType === "i8") {
      if (slab.subarray || slab.slice) {
        HEAPU8.set(slab, ret);
      } else {
        HEAPU8.set(new Uint8Array(slab), ret);
      }
      return ret;
    }
    var i = 0,
      type,
      typeSize,
      previousType;
    while (i < size) {
      var curr = slab[i];
      if (typeof curr === "function") {
        curr = Runtime.getFunctionIndex(curr);
      }
      type = singleType || types[i];
      if (type === 0) {
        i++;
        continue;
      }
      if (type == "i64") type = "i32";
      setValue(ret + i, curr, type);
      if (previousType !== type) {
        typeSize = Runtime.getNativeTypeSize(type);
        previousType = type;
      }
      i += typeSize;
    }
    return ret;
  }
  Module["allocate"] = allocate;
  function getMemory(size) {
    if (!staticSealed) return Runtime.staticAlloc(size);
    if (!runtimeInitialized) return Runtime.dynamicAlloc(size);
    return _malloc(size);
  }
  Module["getMemory"] = getMemory;
  function Pointer_stringify(ptr, length) {
    if (length === 0 || !ptr) return "";
    var hasUtf = 0;
    var t;
    var i = 0;
    while (1) {
      t = HEAPU8[(ptr + i) >> 0];
      hasUtf |= t;
      if (t == 0 && !length) break;
      i++;
      if (length && i == length) break;
    }
    if (!length) length = i;
    var ret = "";
    if (hasUtf < 128) {
      var MAX_CHUNK = 1024;
      var curr;
      while (length > 0) {
        curr = String.fromCharCode.apply(
          String,
          HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK))
        );
        ret = ret ? ret + curr : curr;
        ptr += MAX_CHUNK;
        length -= MAX_CHUNK;
      }
      return ret;
    }
    return Module["UTF8ToString"](ptr);
  }
  Module["Pointer_stringify"] = Pointer_stringify;
  function AsciiToString(ptr) {
    var str = "";
    while (1) {
      var ch = HEAP8[ptr++ >> 0];
      if (!ch) return str;
      str += String.fromCharCode(ch);
    }
  }
  Module["AsciiToString"] = AsciiToString;
  function stringToAscii(str, outPtr) {
    return writeAsciiToMemory(str, outPtr, false);
  }
  Module["stringToAscii"] = stringToAscii;
  var UTF8Decoder =
    typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
  function UTF8ArrayToString(u8Array, idx) {
    var endPtr = idx;
    while (u8Array[endPtr]) ++endPtr;
    if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
    } else {
      var u0, u1, u2, u3, u4, u5;
      var str = "";
      while (1) {
        u0 = u8Array[idx++];
        if (!u0) return str;
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        u1 = u8Array[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1);
          continue;
        }
        u2 = u8Array[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u3 = u8Array[idx++] & 63;
          if ((u0 & 248) == 240) {
            u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3;
          } else {
            u4 = u8Array[idx++] & 63;
            if ((u0 & 252) == 248) {
              u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4;
            } else {
              u5 = u8Array[idx++] & 63;
              u0 =
                ((u0 & 1) << 30) |
                (u1 << 24) |
                (u2 << 18) |
                (u3 << 12) |
                (u4 << 6) |
                u5;
            }
          }
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023));
        }
      }
    }
  }
  Module["UTF8ArrayToString"] = UTF8ArrayToString;
  function UTF8ToString(ptr) {
    return UTF8ArrayToString(HEAPU8, ptr);
  }
  Module["UTF8ToString"] = UTF8ToString;
  function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i);
      if (u >= 55296 && u <= 57343)
        u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        outU8Array[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        outU8Array[outIdx++] = 192 | (u >> 6);
        outU8Array[outIdx++] = 128 | (u & 63);
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        outU8Array[outIdx++] = 224 | (u >> 12);
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 128 | (u & 63);
      } else if (u <= 2097151) {
        if (outIdx + 3 >= endIdx) break;
        outU8Array[outIdx++] = 240 | (u >> 18);
        outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 128 | (u & 63);
      } else if (u <= 67108863) {
        if (outIdx + 4 >= endIdx) break;
        outU8Array[outIdx++] = 248 | (u >> 24);
        outU8Array[outIdx++] = 128 | ((u >> 18) & 63);
        outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 128 | (u & 63);
      } else {
        if (outIdx + 5 >= endIdx) break;
        outU8Array[outIdx++] = 252 | (u >> 30);
        outU8Array[outIdx++] = 128 | ((u >> 24) & 63);
        outU8Array[outIdx++] = 128 | ((u >> 18) & 63);
        outU8Array[outIdx++] = 128 | ((u >> 12) & 63);
        outU8Array[outIdx++] = 128 | ((u >> 6) & 63);
        outU8Array[outIdx++] = 128 | (u & 63);
      }
    }
    outU8Array[outIdx] = 0;
    return outIdx - startIdx;
  }
  Module["stringToUTF8Array"] = stringToUTF8Array;
  function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  }
  Module["stringToUTF8"] = stringToUTF8;
  function lengthBytesUTF8(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i);
      if (u >= 55296 && u <= 57343)
        u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023);
      if (u <= 127) {
        ++len;
      } else if (u <= 2047) {
        len += 2;
      } else if (u <= 65535) {
        len += 3;
      } else if (u <= 2097151) {
        len += 4;
      } else if (u <= 67108863) {
        len += 5;
      } else {
        len += 6;
      }
    }
    return len;
  }
  Module["lengthBytesUTF8"] = lengthBytesUTF8;
  var UTF16Decoder =
    typeof TextDecoder !== "undefined"
      ? new TextDecoder("utf-16le")
      : undefined;
  function demangle(func) {
    var __cxa_demangle_func =
      Module["___cxa_demangle"] || Module["__cxa_demangle"];
    if (__cxa_demangle_func) {
      try {
        var s = func.substr(1);
        var len = lengthBytesUTF8(s) + 1;
        var buf = _malloc(len);
        stringToUTF8(s, buf, len);
        var status = _malloc(4);
        var ret = __cxa_demangle_func(buf, 0, 0, status);
        if (getValue(status, "i32") === 0 && ret) {
          return Pointer_stringify(ret);
        }
      } catch (e) {
      } finally {
        if (buf) _free(buf);
        if (status) _free(status);
        if (ret) _free(ret);
      }
      return func;
    }
    Runtime.warnOnce(
      "warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"
    );
    return func;
  }
  function demangleAll(text) {
    var regex = /__Z[\w\d_]+/g;
    return text.replace(regex, function (x) {
      var y = demangle(x);
      return x === y ? x : x + " [" + y + "]";
    });
  }
  function jsStackTrace() {
    var err = new Error();
    if (!err.stack) {
      try {
        throw new Error(0);
      } catch (e) {
        err = e;
      }
      if (!err.stack) {
        return "(no stack trace available)";
      }
    }
    return err.stack.toString();
  }
  function stackTrace() {
    var js = jsStackTrace();
    if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
    return demangleAll(js);
  }
  Module["stackTrace"] = stackTrace;
  var HEAP;
  var buffer;
  var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
  function updateGlobalBufferViews() {
    Module["HEAP8"] = HEAP8 = new Int8Array(buffer);
    Module["HEAP16"] = HEAP16 = new Int16Array(buffer);
    Module["HEAP32"] = HEAP32 = new Int32Array(buffer);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buffer);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(buffer);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(buffer);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(buffer);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(buffer);
  }
  var STATIC_BASE, STATICTOP, staticSealed;
  var STACK_BASE, STACKTOP, STACK_MAX;
  var DYNAMIC_BASE, DYNAMICTOP_PTR;
  STATIC_BASE =
    STATICTOP =
    STACK_BASE =
    STACKTOP =
    STACK_MAX =
    DYNAMIC_BASE =
    DYNAMICTOP_PTR =
      0;
  staticSealed = false;
  function abortOnCannotGrowMemory() {
    abort(
      "Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " +
        TOTAL_MEMORY +
        ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "
    );
  }
  function enlargeMemory() {
    abortOnCannotGrowMemory();
  }
  var TOTAL_STACK = Module["TOTAL_STACK"] || 5242880;
  var TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 33554432;
  if (TOTAL_MEMORY < TOTAL_STACK)
    Module.printErr(
      "TOTAL_MEMORY should be larger than TOTAL_STACK, was " +
        TOTAL_MEMORY +
        "! (TOTAL_STACK=" +
        TOTAL_STACK +
        ")"
    );
  if (Module["buffer"]) {
    buffer = Module["buffer"];
  } else {
    {
      buffer = new ArrayBuffer(TOTAL_MEMORY);
    }
  }
  updateGlobalBufferViews();
  function getTotalMemory() {
    return TOTAL_MEMORY;
  }
  HEAP32[0] = 1668509029;
  HEAP16[1] = 25459;
  if (HEAPU8[2] !== 115 || HEAPU8[3] !== 99)
    throw "Runtime error: expected the system to be little-endian!";
  Module["HEAP"] = HEAP;
  Module["buffer"] = buffer;
  Module["HEAP8"] = HEAP8;
  Module["HEAP16"] = HEAP16;
  Module["HEAP32"] = HEAP32;
  Module["HEAPU8"] = HEAPU8;
  Module["HEAPU16"] = HEAPU16;
  Module["HEAPU32"] = HEAPU32;
  Module["HEAPF32"] = HEAPF32;
  Module["HEAPF64"] = HEAPF64;
  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift();
      if (typeof callback == "function") {
        callback();
        continue;
      }
      var func = callback.func;
      if (typeof func === "number") {
        if (callback.arg === undefined) {
          Module["dynCall_v"](func);
        } else {
          Module["dynCall_vi"](func, callback.arg);
        }
      } else {
        func(callback.arg === undefined ? null : callback.arg);
      }
    }
  }
  var __ATPRERUN__ = [];
  var __ATINIT__ = [];
  var __ATMAIN__ = [];
  var __ATEXIT__ = [];
  var __ATPOSTRUN__ = [];
  var runtimeInitialized = false;
  var runtimeExited = false;
  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function")
        Module["preRun"] = [Module["preRun"]];
      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPRERUN__);
  }
  function ensureInitRuntime() {
    if (runtimeInitialized) return;
    runtimeInitialized = true;
    callRuntimeCallbacks(__ATINIT__);
  }
  function preMain() {
    callRuntimeCallbacks(__ATMAIN__);
  }
  function exitRuntime() {
    callRuntimeCallbacks(__ATEXIT__);
    runtimeExited = true;
  }
  function postRun() {
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function")
        Module["postRun"] = [Module["postRun"]];
      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
  }
  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
  }
  Module["addOnPreRun"] = addOnPreRun;
  function addOnInit(cb) {
    __ATINIT__.unshift(cb);
  }
  Module["addOnInit"] = addOnInit;
  function addOnPreMain(cb) {
    __ATMAIN__.unshift(cb);
  }
  Module["addOnPreMain"] = addOnPreMain;
  function addOnExit(cb) {
    __ATEXIT__.unshift(cb);
  }
  Module["addOnExit"] = addOnExit;
  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
  }
  Module["addOnPostRun"] = addOnPostRun;
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(
      stringy,
      u8array,
      0,
      u8array.length
    );
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  Module["intArrayFromString"] = intArrayFromString;
  function intArrayToString(array) {
    var ret = [];
    for (var i = 0; i < array.length; i++) {
      var chr = array[i];
      if (chr > 255) {
        chr &= 255;
      }
      ret.push(String.fromCharCode(chr));
    }
    return ret.join("");
  }
  Module["intArrayToString"] = intArrayToString;
  function writeStringToMemory(string, buffer, dontAddNull) {
    Runtime.warnOnce(
      "writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!"
    );
    var lastChar, end;
    if (dontAddNull) {
      end = buffer + lengthBytesUTF8(string);
      lastChar = HEAP8[end];
    }
    stringToUTF8(string, buffer, Infinity);
    if (dontAddNull) HEAP8[end] = lastChar;
  }
  Module["writeStringToMemory"] = writeStringToMemory;
  function writeArrayToMemory(array, buffer) {
    HEAP8.set(array, buffer);
  }
  Module["writeArrayToMemory"] = writeArrayToMemory;
  function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
      HEAP8[buffer++ >> 0] = str.charCodeAt(i);
    }
    if (!dontAddNull) HEAP8[buffer >> 0] = 0;
  }
  Module["writeAsciiToMemory"] = writeAsciiToMemory;
  if (!Math["imul"] || Math["imul"](4294967295, 5) !== -5)
    Math["imul"] = function imul(a, b) {
      var ah = a >>> 16;
      var al = a & 65535;
      var bh = b >>> 16;
      var bl = b & 65535;
      return (al * bl + ((ah * bl + al * bh) << 16)) | 0;
    };
  Math.imul = Math["imul"];
  if (!Math["clz32"])
    Math["clz32"] = function (x) {
      x = x >>> 0;
      for (var i = 0; i < 32; i++) {
        if (x & (1 << (31 - i))) return i;
      }
      return 32;
    };
  Math.clz32 = Math["clz32"];
  if (!Math["trunc"])
    Math["trunc"] = function (x) {
      return x < 0 ? Math.ceil(x) : Math.floor(x);
    };
  Math.trunc = Math["trunc"];
  var Math_abs = Math.abs;
  var Math_cos = Math.cos;
  var Math_sin = Math.sin;
  var Math_tan = Math.tan;
  var Math_acos = Math.acos;
  var Math_asin = Math.asin;
  var Math_atan = Math.atan;
  var Math_atan2 = Math.atan2;
  var Math_exp = Math.exp;
  var Math_log = Math.log;
  var Math_sqrt = Math.sqrt;
  var Math_ceil = Math.ceil;
  var Math_floor = Math.floor;
  var Math_pow = Math.pow;
  var Math_imul = Math.imul;
  var Math_fround = Math.fround;
  var Math_round = Math.round;
  var Math_min = Math.min;
  var Math_clz32 = Math.clz32;
  var Math_trunc = Math.trunc;
  var runDependencies = 0;
  var runDependencyWatcher = null;
  var dependenciesFulfilled = null;
  function addRunDependency(id) {
    runDependencies++;
    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
  }
  Module["addRunDependency"] = addRunDependency;
  function removeRunDependency(id) {
    runDependencies--;
    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  }
  Module["removeRunDependency"] = removeRunDependency;
  Module["preloadedImages"] = {};
  Module["preloadedAudios"] = {};
  var ASM_CONSTS = [];
  STATIC_BASE = 8;
  STATICTOP = STATIC_BASE + 6272;
  __ATINIT__.push();
  allocate(
    [
      0, 0, 0, 0, 0, 0, 0, 0, 254, 58, 10, 254, 252, 54, 16, 254, 250, 46, 28,
      252, 252, 36, 36, 252, 252, 28, 46, 250, 254, 16, 54, 252, 254, 10, 58,
      254, 0, 0, 0, 0, 255, 4, 246, 58, 17, 251, 1, 0, 255, 4, 246, 58, 17, 251,
      1, 0, 255, 4, 245, 40, 40, 245, 4, 255, 255, 4, 245, 40, 40, 245, 4, 255,
      0, 1, 251, 17, 58, 246, 4, 255, 0, 1, 251, 17, 58, 246, 4, 255, 29, 0, 0,
      0, 30, 0, 0, 0, 31, 0, 0, 0, 32, 0, 0, 0, 33, 0, 0, 0, 33, 0, 0, 0, 34, 0,
      0, 0, 34, 0, 0, 0, 35, 0, 0, 0, 35, 0, 0, 0, 36, 0, 0, 0, 36, 0, 0, 0, 37,
      0, 0, 0, 37, 0, 0, 0, 246, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 53, 54, 50,
      72, 34, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      255, 255, 255, 127, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 0, 36, 56, 37, 56,
      38, 56, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 16, 36, 56, 37,
      56, 38, 56, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 16, 36, 56,
      37, 56, 38, 56, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 36,
      56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1,
      0, 0, 0, 1, 0, 0, 0, 0, 240, 154, 249, 114, 252, 138, 253, 30, 254, 122,
      254, 197, 254, 0, 255, 197, 254, 122, 254, 30, 254, 138, 253, 114, 252,
      154, 249, 0, 240, 0, 0, 1, 0, 1, 2, 0, 1, 2, 3, 1, 2, 3, 2, 3, 3, 0, 1, 0,
      2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 3, 2, 3, 0, 0, 1, 0, 1, 2, 0, 1, 2, 3, 0, 1,
      2, 3, 4, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6, 7, 1,
      2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6, 7, 4, 5, 6, 7, 5, 6, 7, 6,
      7, 7, 0, 1, 0, 2, 1, 0, 3, 2, 1, 0, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0, 6, 5,
      4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 7, 6, 5, 4, 3,
      2, 7, 6, 5, 4, 3, 7, 6, 5, 4, 7, 6, 5, 7, 6, 7, 40, 45, 51, 57, 64, 72, 0,
      1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1,
      2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2,
      3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4,
      4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8,
      8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11,
      11, 12, 12, 0, 0, 0, 2, 5, 9, 1, 4, 8, 12, 3, 7, 11, 14, 6, 10, 13, 15, 0,
      2, 1, 3, 0, 2, 5, 9, 14, 20, 27, 35, 1, 4, 8, 13, 19, 26, 34, 42, 3, 7,
      12, 18, 25, 33, 41, 48, 6, 11, 17, 24, 32, 40, 47, 53, 10, 16, 23, 31, 39,
      46, 52, 57, 15, 22, 30, 38, 45, 51, 56, 60, 21, 29, 37, 44, 50, 55, 59,
      62, 28, 36, 43, 49, 54, 58, 61, 63, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 2, 3, 0,
      1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3,
      3, 3, 0, 1, 2, 3, 16, 17, 18, 19, 4, 5, 6, 7, 20, 21, 22, 23, 8, 9, 10,
      11, 24, 25, 26, 27, 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 34, 35, 48,
      49, 50, 51, 36, 37, 38, 39, 52, 53, 54, 55, 40, 41, 42, 43, 56, 57, 58,
      59, 44, 45, 46, 47, 60, 61, 62, 63, 0, 1, 4, 5, 2, 3, 4, 5, 6, 6, 8, 8, 7,
      7, 8, 8, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 2, 1, 0,
      0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 153, 200, 139, 141,
      157, 154, 154, 154, 154, 154, 154, 154, 154, 184, 154, 154, 154, 184, 63,
      139, 154, 154, 154, 154, 154, 154, 154, 154, 154, 154, 154, 154, 154, 154,
      154, 154, 154, 153, 138, 138, 111, 141, 94, 138, 182, 154, 139, 139, 139,
      139, 139, 139, 110, 110, 124, 125, 140, 153, 125, 127, 140, 109, 111, 143,
      127, 111, 79, 108, 123, 63, 110, 110, 124, 125, 140, 153, 125, 127, 140,
      109, 111, 143, 127, 111, 79, 108, 123, 63, 91, 171, 134, 141, 111, 111,
      125, 110, 110, 94, 124, 108, 124, 107, 125, 141, 179, 153, 125, 107, 125,
      141, 179, 153, 125, 107, 125, 141, 179, 153, 125, 140, 139, 182, 182, 152,
      136, 152, 136, 153, 136, 139, 111, 136, 139, 111, 141, 111, 140, 92, 137,
      138, 140, 152, 138, 139, 153, 74, 149, 92, 139, 107, 122, 152, 140, 179,
      166, 182, 140, 227, 122, 197, 138, 153, 136, 167, 152, 152, 154, 154, 154,
      154, 154, 154, 154, 154, 154, 154, 154, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 153, 185, 107, 139, 126, 154, 197, 185,
      201, 154, 154, 154, 149, 154, 139, 154, 154, 154, 152, 139, 110, 122, 95,
      79, 63, 31, 31, 153, 153, 153, 153, 140, 198, 140, 198, 168, 79, 124, 138,
      94, 153, 111, 149, 107, 167, 154, 139, 139, 139, 139, 139, 139, 125, 110,
      94, 110, 95, 79, 125, 111, 110, 78, 110, 111, 111, 95, 94, 108, 123, 108,
      125, 110, 94, 110, 95, 79, 125, 111, 110, 78, 110, 111, 111, 95, 94, 108,
      123, 108, 121, 140, 61, 154, 155, 154, 139, 153, 139, 123, 123, 63, 153,
      166, 183, 140, 136, 153, 154, 166, 183, 140, 136, 153, 154, 166, 183, 140,
      136, 153, 154, 170, 153, 123, 123, 107, 121, 107, 121, 167, 151, 183, 140,
      151, 183, 140, 140, 140, 154, 196, 196, 167, 154, 152, 167, 182, 182, 134,
      149, 136, 153, 121, 136, 137, 169, 194, 166, 167, 154, 167, 137, 182, 107,
      167, 91, 122, 107, 167, 154, 154, 154, 154, 154, 154, 154, 154, 154, 154,
      154, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      153, 160, 107, 139, 126, 154, 197, 185, 201, 154, 154, 154, 134, 154, 139,
      154, 154, 183, 152, 139, 154, 137, 95, 79, 63, 31, 31, 153, 153, 153, 153,
      169, 198, 169, 198, 168, 79, 224, 167, 122, 153, 111, 149, 92, 167, 154,
      139, 139, 139, 139, 139, 139, 125, 110, 124, 110, 95, 94, 125, 111, 111,
      79, 125, 126, 111, 111, 79, 108, 123, 93, 125, 110, 124, 110, 95, 94, 125,
      111, 111, 79, 125, 126, 111, 111, 79, 108, 123, 93, 121, 140, 61, 154,
      170, 154, 139, 153, 139, 123, 123, 63, 124, 166, 183, 140, 136, 153, 154,
      166, 183, 140, 136, 153, 154, 166, 183, 140, 136, 153, 154, 170, 153, 138,
      138, 122, 121, 122, 121, 167, 151, 183, 140, 151, 183, 140, 140, 140, 154,
      196, 167, 167, 154, 152, 167, 182, 182, 134, 149, 136, 153, 121, 136, 122,
      169, 208, 166, 167, 154, 152, 167, 182, 107, 167, 91, 107, 107, 167, 154,
      154, 154, 154, 154, 154, 154, 154, 154, 154, 154, 154, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22,
      24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58,
      60, 62, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 9,
      10, 11, 13, 14, 16, 18, 20, 22, 24, 29, 30, 31, 32, 33, 33, 34, 34, 35,
      35, 36, 36, 37, 37, 0, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5, 0,
      0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 104,
      101, 118, 99, 0, 0, 26, 10, 1, 0, 1, 2, 2, 2, 2, 3, 5, 7, 8, 10, 12, 13,
      15, 17, 18, 19, 20, 21, 22, 23, 23, 24, 24, 25, 25, 26, 27, 27, 28, 28,
      29, 29, 30, 31, 32, 26, 21, 17, 13, 9, 5, 2, 0, 254, 251, 247, 243, 239,
      235, 230, 224, 230, 235, 239, 243, 247, 251, 254, 0, 2, 5, 9, 13, 17, 21,
      26, 32, 64, 90, 90, 90, 89, 88, 87, 85, 83, 82, 80, 78, 75, 73, 70, 67,
      64, 61, 57, 54, 50, 46, 43, 38, 36, 31, 25, 22, 18, 13, 9, 4, 255, 0, 1,
      0, 0, 255, 0, 1, 255, 255, 1, 1, 1, 255, 255, 1, 1, 2, 0, 3, 4, 0, 1, 1,
      0, 0, 2, 2, 0, 1, 2, 2, 1, 0, 3, 3, 0, 1, 3, 3, 1, 2, 3, 3, 2, 16, 16, 16,
      16, 17, 18, 21, 24, 16, 16, 16, 16, 17, 19, 22, 25, 16, 16, 17, 18, 20,
      22, 25, 29, 16, 16, 18, 21, 24, 27, 31, 36, 17, 17, 20, 24, 30, 35, 41,
      47, 18, 19, 22, 27, 35, 44, 54, 65, 21, 22, 25, 31, 41, 54, 70, 88, 24,
      25, 29, 36, 47, 65, 88, 115, 16, 16, 16, 16, 17, 18, 20, 24, 16, 16, 16,
      17, 18, 20, 24, 25, 16, 16, 17, 18, 20, 24, 25, 28, 16, 17, 18, 20, 24,
      25, 28, 33, 17, 18, 20, 24, 25, 28, 33, 41, 18, 20, 24, 25, 28, 33, 41,
      54, 20, 24, 25, 28, 33, 41, 54, 71, 24, 25, 28, 33, 41, 54, 71, 91, 128,
      176, 208, 240, 128, 167, 197, 227, 128, 158, 187, 216, 123, 150, 178, 205,
      116, 142, 169, 195, 111, 135, 160, 185, 105, 128, 152, 175, 100, 122, 144,
      166, 95, 116, 137, 158, 90, 110, 130, 150, 85, 104, 123, 142, 81, 99, 117,
      135, 77, 94, 111, 128, 73, 89, 105, 122, 69, 85, 100, 116, 66, 80, 95,
      110, 62, 76, 90, 104, 59, 72, 86, 99, 56, 69, 81, 94, 53, 65, 77, 89, 51,
      62, 73, 85, 48, 59, 69, 80, 46, 56, 66, 76, 43, 53, 63, 72, 41, 50, 59,
      69, 39, 48, 56, 65, 37, 45, 54, 62, 35, 43, 51, 59, 33, 41, 48, 56, 32,
      39, 46, 53, 30, 37, 43, 50, 29, 35, 41, 48, 27, 33, 39, 45, 26, 31, 37,
      43, 24, 30, 35, 41, 23, 28, 33, 39, 22, 27, 32, 37, 21, 26, 30, 35, 20,
      24, 29, 33, 19, 23, 27, 31, 18, 22, 26, 30, 17, 21, 25, 28, 16, 20, 23,
      27, 15, 19, 22, 25, 14, 18, 21, 24, 14, 17, 20, 23, 13, 16, 19, 22, 12,
      15, 18, 21, 12, 14, 17, 20, 11, 14, 16, 19, 11, 13, 15, 18, 10, 12, 15,
      17, 10, 12, 14, 16, 9, 11, 13, 15, 9, 11, 12, 14, 8, 10, 12, 14, 8, 9, 11,
      13, 7, 9, 11, 12, 7, 9, 10, 12, 7, 8, 10, 11, 6, 8, 9, 11, 6, 7, 9, 10, 6,
      7, 8, 9, 2, 2, 2, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 62, 63, 0, 0, 1, 2, 2, 4, 4,
      5, 6, 7, 8, 9, 9, 11, 11, 12, 13, 13, 15, 15, 16, 16, 18, 18, 19, 19, 21,
      21, 22, 22, 23, 24, 24, 25, 26, 26, 27, 27, 28, 29, 29, 30, 30, 30, 31,
      32, 32, 33, 33, 33, 34, 34, 35, 35, 35, 36, 36, 36, 37, 37, 37, 38, 38,
      63, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
      5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3,
      3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    ],
    "i8",
    ALLOC_NONE,
    Runtime.GLOBAL_BASE
  );
  var tempDoublePtr = STATICTOP;
  STATICTOP += 16;
  Module["_bitshift64Ashr"] = _bitshift64Ashr;
  Module["_i64Subtract"] = _i64Subtract;
  function ___setErrNo(value) {
    if (Module["___errno_location"])
      HEAP32[Module["___errno_location"]() >> 2] = value;
    return value;
  }
  Module["_sbrk"] = _sbrk;
  Module["_i64Add"] = _i64Add;
  Module["_memset"] = _memset;
  Module["_bitshift64Shl"] = _bitshift64Shl;
  function _abort() {
    Module["abort"]();
  }
  Module["_llvm_bswap_i32"] = _llvm_bswap_i32;
  Module["___muldsi3"] = ___muldsi3;
  Module["___muldi3"] = ___muldi3;
  function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
    return dest;
  }
  Module["_memcpy"] = _memcpy;
  DYNAMICTOP_PTR = allocate(1, "i32", ALLOC_STATIC);
  STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);
  STACK_MAX = STACK_BASE + TOTAL_STACK;
  DYNAMIC_BASE = Runtime.alignMemory(STACK_MAX);
  HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
  staticSealed = true;
  function invoke_iiii(index, a1, a2, a3) {
    try {
      return Module["dynCall_iiii"](index, a1, a2, a3);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiiii(
    index,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a11
  ) {
    try {
      Module["dynCall_viiiiiiiiiii"](
        index,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11
      );
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    try {
      Module["dynCall_viiiiiiiiii"](
        index,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10
      );
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viiiii(index, a1, a2, a3, a4, a5) {
    try {
      Module["dynCall_viiiii"](index, a1, a2, a3, a4, a5);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_vi(index, a1) {
    try {
      Module["dynCall_vi"](index, a1);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_vii(index, a1, a2) {
    try {
      Module["dynCall_vii"](index, a1, a2);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
    try {
      return Module["dynCall_iiiiiii"](index, a1, a2, a3, a4, a5, a6);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    try {
      Module["dynCall_viiiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiiiiiii(
    index,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
    a10,
    a11,
    a12
  ) {
    try {
      Module["dynCall_viiiiiiiiiiii"](
        index,
        a1,
        a2,
        a3,
        a4,
        a5,
        a6,
        a7,
        a8,
        a9,
        a10,
        a11,
        a12
      );
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_ii(index, a1) {
    try {
      return Module["dynCall_ii"](index, a1);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viii(index, a1, a2, a3) {
    try {
      Module["dynCall_viii"](index, a1, a2, a3);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    try {
      Module["dynCall_viiiiiiii"](index, a1, a2, a3, a4, a5, a6, a7, a8);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_iiiii(index, a1, a2, a3, a4) {
    try {
      return Module["dynCall_iiiii"](index, a1, a2, a3, a4);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
    try {
      Module["dynCall_viiiiii"](index, a1, a2, a3, a4, a5, a6);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_iii(index, a1, a2) {
    try {
      return Module["dynCall_iii"](index, a1, a2);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
    try {
      return Module["dynCall_iiiiii"](index, a1, a2, a3, a4, a5);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
    try {
      Module["dynCall_viiiiiii"](index, a1, a2, a3, a4, a5, a6, a7);
    } catch (e) {
      if (typeof e !== "number" && e !== "longjmp") throw e;
      Module["setThrew"](1, 0);
    }
  }
  Module.asmGlobalArg = {
    Math: Math,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    NaN: NaN,
    Infinity: Infinity,
  };
  Module.asmLibraryArg = {
    abort: abort,
    assert: assert,
    enlargeMemory: enlargeMemory,
    getTotalMemory: getTotalMemory,
    abortOnCannotGrowMemory: abortOnCannotGrowMemory,
    invoke_iiii: invoke_iiii,
    invoke_viiiiiiiiiii: invoke_viiiiiiiiiii,
    invoke_viiiiiiiiii: invoke_viiiiiiiiii,
    invoke_viiiii: invoke_viiiii,
    invoke_vi: invoke_vi,
    invoke_vii: invoke_vii,
    invoke_iiiiiii: invoke_iiiiiii,
    invoke_viiiiiiiii: invoke_viiiiiiiii,
    invoke_viiiiiiiiiiii: invoke_viiiiiiiiiiii,
    invoke_ii: invoke_ii,
    invoke_viii: invoke_viii,
    invoke_viiiiiiii: invoke_viiiiiiii,
    invoke_iiiii: invoke_iiiii,
    invoke_viiiiii: invoke_viiiiii,
    invoke_iii: invoke_iii,
    invoke_iiiiii: invoke_iiiiii,
    invoke_viiiiiii: invoke_viiiiiii,
    ___setErrNo: ___setErrNo,
    _emscripten_memcpy_big: _emscripten_memcpy_big,
    _abort: _abort,
    DYNAMICTOP_PTR: DYNAMICTOP_PTR,
    tempDoublePtr: tempDoublePtr,
    ABORT: ABORT,
    STACKTOP: STACKTOP,
    STACK_MAX: STACK_MAX,
  }; // EMSCRIPTEN_START_ASM
  var asm = (function (global, env, buffer) {
    "use asm";
    var a = new global.Int8Array(buffer);
    var b = new global.Int16Array(buffer);
    var c = new global.Int32Array(buffer);
    var d = new global.Uint8Array(buffer);
    var e = new global.Uint16Array(buffer);
    var f = new global.Uint32Array(buffer);
    var g = new global.Float32Array(buffer);
    var h = new global.Float64Array(buffer);
    var i = env.DYNAMICTOP_PTR | 0;
    var j = env.tempDoublePtr | 0;
    var k = env.ABORT | 0;
    var l = env.STACKTOP | 0;
    var m = env.STACK_MAX | 0;
    var n = 0;
    var o = 0;
    var p = 0;
    var q = 0;
    var r = global.NaN,
      s = global.Infinity;
    var t = 0,
      u = 0,
      v = 0,
      w = 0,
      x = 0.0,
      y = 0,
      z = 0,
      A = 0,
      B = 0.0;
    var C = 0;
    var D = global.Math.floor;
    var E = global.Math.abs;
    var F = global.Math.sqrt;
    var G = global.Math.pow;
    var H = global.Math.cos;
    var I = global.Math.sin;
    var J = global.Math.tan;
    var K = global.Math.acos;
    var L = global.Math.asin;
    var M = global.Math.atan;
    var N = global.Math.atan2;
    var O = global.Math.exp;
    var P = global.Math.log;
    var Q = global.Math.ceil;
    var R = global.Math.imul;
    var S = global.Math.min;
    var T = global.Math.max;
    var U = global.Math.clz32;
    var V = env.abort;
    var W = env.assert;
    var X = env.enlargeMemory;
    var Y = env.getTotalMemory;
    var Z = env.abortOnCannotGrowMemory;
    var _ = env.invoke_iiii;
    var $ = env.invoke_viiiiiiiiiii;
    var aa = env.invoke_viiiiiiiiii;
    var ba = env.invoke_viiiii;
    var ca = env.invoke_vi;
    var da = env.invoke_vii;
    var ea = env.invoke_iiiiiii;
    var fa = env.invoke_viiiiiiiii;
    var ga = env.invoke_viiiiiiiiiiii;
    var ha = env.invoke_ii;
    var ia = env.invoke_viii;
    var ja = env.invoke_viiiiiiii;
    var ka = env.invoke_iiiii;
    var la = env.invoke_viiiiii;
    var ma = env.invoke_iii;
    var na = env.invoke_iiiiii;
    var oa = env.invoke_viiiiiii;
    var pa = env.___setErrNo;
    var qa = env._emscripten_memcpy_big;
    var ra = env._abort;
    var sa = 0.0;
    // EMSCRIPTEN_START_FUNCS
    function Ka(a) {
      a = a | 0;
      var b = 0;
      b = l;
      l = (l + a) | 0;
      l = (l + 15) & -16;
      return b | 0;
    }
    function La() {
      return l | 0;
    }
    function Ma(a) {
      a = a | 0;
      l = a;
    }
    function Na(a, b) {
      a = a | 0;
      b = b | 0;
      l = a;
      m = b;
    }
    function Oa(a, b) {
      a = a | 0;
      b = b | 0;
      if (!n) {
        n = a;
        o = b;
      }
    }
    function Pa(a) {
      a = a | 0;
      C = a;
    }
    function Qa() {
      return C | 0;
    }
    function Ra(b, d) {
      b = b | 0;
      d = d | 0;
      var e = 0;
      do
        if (a[((c[(b + 204) >> 2] | 0) + 43) >> 0] | 0) {
          e = c[((c[(b + 200) >> 2] | 0) + 13128) >> 2] | 0;
          d = (d | 0) % (e | 0) | 0;
          if ((d | 0) != 2 ? !(((e | 0) == 2) & ((d | 0) == 0)) : 0) break;
          fh(c[(b + 152) >> 2] | 0, c[(b + 136) >> 2] | 0, 199) | 0;
        }
      while (0);
      return;
    }
    function Sa(b, d) {
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;
      g = (b + 204) | 0;
      e = c[g >> 2] | 0;
      do
        if (
          (c[((c[(e + 1668) >> 2] | 0) + (c[(b + 3488) >> 2] << 2)) >> 2] |
            0) ==
          (d | 0)
        ) {
          Ta(b);
          e = (b + 2437) | 0;
          if (a[e >> 0] | 0) {
            f = c[g >> 2] | 0;
            if (
              a[(f + 42) >> 0] | 0
                ? ((f = c[(f + 1676) >> 2] | 0),
                  (c[(f + (d << 2)) >> 2] | 0) !=
                    (c[(f + ((d + -1) << 2)) >> 2] | 0))
                : 0
            )
              i = 5;
          } else i = 5;
          if ((i | 0) == 5) Ua(b);
          if (
            (
              (a[(b + 2436) >> 0] | 0) == 0
                ? a[((c[g >> 2] | 0) + 43) >> 0] | 0
                : 0
            )
              ? ((h = c[((c[(b + 200) >> 2] | 0) + 13128) >> 2] | 0),
                ((d | 0) % (h | 0) | 0 | 0) == 0)
              : 0
          ) {
            if ((h | 0) == 1) {
              Ua(b);
              break;
            }
            if ((a[e >> 0] | 0) == 1) Va(b);
          }
        } else {
          if (
            (a[(e + 42) >> 0] | 0) != 0
              ? ((i = c[(e + 1676) >> 2] | 0),
                (c[(i + (d << 2)) >> 2] | 0) !=
                  (c[(i + ((d + -1) << 2)) >> 2] | 0))
              : 0
          ) {
            if ((a[(b + 141) >> 0] | 0) == 1) Wa(c[(b + 136) >> 2] | 0);
            else Ta(b);
            Ua(b);
            e = c[g >> 2] | 0;
          }
          if (
            a[(e + 43) >> 0] | 0
              ? ((f = (b + 200) | 0),
                ((d | 0) % (c[((c[f >> 2] | 0) + 13128) >> 2] | 0) | 0 | 0) ==
                  0)
              : 0
          ) {
            e = (b + 136) | 0;
            Xa(((c[e >> 2] | 0) + 224) | 0) | 0;
            if ((a[(b + 141) >> 0] | 0) == 1) Wa(c[e >> 2] | 0);
            else Ta(b);
            if ((c[((c[f >> 2] | 0) + 13128) >> 2] | 0) == 1) {
              Ua(b);
              break;
            } else {
              Va(b);
              break;
            }
          }
        }
      while (0);
      return;
    }
    function Ta(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      d = (a + 136) | 0;
      a = ((c[d >> 2] | 0) + 204) | 0;
      Ve(a, 1);
      Jb(a);
      d = ((c[d >> 2] | 0) + 224) | 0;
      b = c[a >> 2] | 0;
      b = (b + (((Kb(a) | 0) / 8) | 0)) | 0;
      Qe(d, b, ((((Lb(a) | 0) + 7) | 0) / 8) | 0);
      return;
    }
    function Ua(b) {
      b = b | 0;
      var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
      g = c[(b + 2428) >> 2] | 0;
      e = (2 - g) | 0;
      e = ((g | 0) == 2) | ((a[(b + 3048) >> 0] | 0) == 0) ? e : e ^ 3;
      g = (b + 3100) | 0;
      f = (b + 136) | 0;
      b = 0;
      do {
        h = d[(1e3 + ((e * 199) | 0) + b) >> 0] | 0;
        j = a[g >> 0] | 0;
        i = (j << 24) >> 24;
        h =
          (((((h << 3) & 120) +
            -16 +
            ((R(
              (j << 24) >> 24 < 0 ? 0 : (i | 0) < 51 ? i : 51,
              ((((h >>> 4) * 5) | 0) + -45) | 0
            ) |
              0) >>
              4)) <<
            1) +
            -127) |
          0;
        h = (h >> 31) ^ h;
        a[((c[f >> 2] | 0) + b) >> 0] = (h | 0) > 124 ? (h & 1) | 124 : h;
        b = (b + 1) | 0;
      } while ((b | 0) != 199);
      b = 0;
      do {
        a[((c[f >> 2] | 0) + 199 + b) >> 0] = 0;
        b = (b + 1) | 0;
      } while ((b | 0) != 4);
      return;
    }
    function Va(a) {
      a = a | 0;
      fh(c[(a + 136) >> 2] | 0, c[(a + 152) >> 2] | 0, 199) | 0;
      return;
    }
    function Wa(a) {
      a = a | 0;
      Mb((a + 224) | 0);
      return;
    }
    function Xa(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      d = (a + 4) | 0;
      b = ((c[d >> 2] | 0) + -2) | 0;
      c[d >> 2] = b;
      if ((c[a >> 2] | 0) < ((b << 17) | 0)) {
        Nb(a);
        a = 0;
      } else a = ((c[(a + 16) >> 2] | 0) - (c[(a + 12) >> 2] | 0)) | 0;
      return a | 0;
    }
    function Ya(a) {
      a = a | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, a) | 0;
    }
    function Za(b, e) {
      b = b | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0;
      f = d[e >> 0] | 0;
      g = (b + 4) | 0;
      i = c[g >> 2] | 0;
      j = d[(5429 + (((i << 1) & 384) + f)) >> 0] | 0;
      i = (i - j) | 0;
      k = i << 17;
      l = c[b >> 2] | 0;
      h = (k - l) >> 31;
      c[b >> 2] = l - (h & k);
      c[g >> 2] = (h & (j - i)) + i;
      f = h ^ f;
      a[e >> 0] = a[(6069 + f) >> 0] | 0;
      h = c[g >> 2] | 0;
      e = d[(4917 + h) >> 0] | 0;
      c[g >> 2] = h << e;
      e = c[b >> 2] << e;
      c[b >> 2] = e;
      if (!(e & 65535)) Pb(b);
      return (f & 1) | 0;
    }
    function _a(a) {
      a = a | 0;
      var b = 0;
      a = (a + 136) | 0;
      b = c[a >> 2] | 0;
      if (!(Za((b + 224) | 0, (b + 1) | 0) | 0)) a = 0;
      else {
        a = ($a(((c[a >> 2] | 0) + 224) | 0) | 0) == 0;
        a = a ? 1 : 2;
      }
      return a | 0;
    }
    function $a(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      b = c[a >> 2] << 1;
      c[a >> 2] = b;
      if (!(b & 65534)) {
        Ob(a);
        b = c[a >> 2] | 0;
      }
      d = c[(a + 4) >> 2] << 17;
      if ((b | 0) < (d | 0)) b = 0;
      else {
        c[a >> 2] = b - d;
        b = 1;
      }
      return b | 0;
    }
    function ab(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      d = (a + 136) | 0;
      a = 0;
      b = $a(((c[d >> 2] | 0) + 224) | 0) | 0;
      do {
        b = $a(((c[d >> 2] | 0) + 224) | 0) | 0 | (b << 1);
        a = (a + 1) | 0;
      } while ((a | 0) != 4);
      return b | 0;
    }
    function bb(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      d = c[((c[(a + 200) >> 2] | 0) + 52) >> 2] | 0;
      d = (d | 0) > 10 ? 31 : ((1 << (d + -5)) + -1) | 0;
      b = (a + 136) | 0;
      a: do
        if ((d | 0) > 0) {
          a = 0;
          do {
            if (!($a(((c[b >> 2] | 0) + 224) | 0) | 0)) break a;
            a = (a + 1) | 0;
          } while ((a | 0) < (d | 0));
        } else a = 0;
      while (0);
      return a | 0;
    }
    function cb(a) {
      a = a | 0;
      return $a(((c[(a + 136) >> 2] | 0) + 224) | 0) | 0;
    }
    function db(a) {
      a = a | 0;
      var b = 0;
      b = (a + 136) | 0;
      a = ($a(((c[b >> 2] | 0) + 224) | 0) | 0) << 1;
      return $a(((c[b >> 2] | 0) + 224) | 0) | 0 | a | 0;
    }
    function eb(a) {
      a = a | 0;
      return Xa(((c[(a + 136) >> 2] | 0) + 224) | 0) | 0;
    }
    function fb(a) {
      a = a | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + 5) | 0) | 0;
    }
    function gb(b, d, e, f, g) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0;
      h = c[(b + 200) >> 2] | 0;
      i = c[(h + 13140) >> 2] | 0;
      h = ((1 << c[(h + 13080) >> 2]) + -1) | 0;
      j = c[(b + 136) >> 2] | 0;
      if (((a[(j + 308) >> 0] | 0) != 0) | (((h & d) | 0) != 0))
        d =
          ((a[((c[(b + 7584) >> 2] | 0) + (f + -1 + (R(i, g) | 0))) >> 0] |
            0) !=
            0) &
          1;
      else d = 0;
      if ((((h & e) | 0) != 0) | ((a[(j + 309) >> 0] | 0) != 0))
        d =
          ((((a[
            ((c[(b + 7584) >> 2] | 0) + ((R(i, (g + -1) | 0) | 0) + f)) >> 0
          ] |
            0) !=
            0) &
            1) +
            d) |
          0;
      return Za((j + 224) | 0, (j + (d + 6)) | 0) | 0;
    }
    function hb(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0,
        f = 0;
      e = (a + 136) | 0;
      a = 9;
      b = 0;
      while (1) {
        d = c[e >> 2] | 0;
        if (!(Za((d + 224) | 0, (d + a) | 0) | 0)) {
          a = 0;
          break;
        }
        b = (b + 1) | 0;
        if ((b | 0) >= 5) {
          a = 0;
          d = 0;
          f = 4;
          break;
        } else a = 10;
      }
      do
        if ((f | 0) == 4) {
          while (1) {
            f = 0;
            if (!($a(((c[e >> 2] | 0) + 224) | 0) | 0)) {
              f = 5;
              break;
            }
            a = ((1 << d) + a) | 0;
            d = (d + 1) | 0;
            if ((d | 0) < 31) f = 4;
            else {
              d = 31;
              break;
            }
          }
          if ((f | 0) == 5) if (!d) break;
          do {
            d = (d + -1) | 0;
            a = ((($a(((c[e >> 2] | 0) + 224) | 0) | 0) << d) + a) | 0;
          } while ((d | 0) != 0);
        }
      while (0);
      return (a + b) | 0;
    }
    function ib(a) {
      a = a | 0;
      return $a(((c[(a + 136) >> 2] | 0) + 224) | 0) | 0;
    }
    function jb(a) {
      a = a | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + 176) | 0) | 0;
    }
    function kb(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0;
      f = a[((c[(b + 204) >> 2] | 0) + 1633) >> 0] | 0;
      f = (f & 255) > 5 ? f : 5;
      e = f & 255;
      d = (b + 136) | 0;
      a: do
        if (!((f << 24) >> 24)) b = 0;
        else {
          b = 0;
          do {
            f = c[d >> 2] | 0;
            if (!(Za((f + 224) | 0, (f + 177) | 0) | 0)) break a;
            b = (b + 1) | 0;
          } while ((b | 0) < (e | 0));
        }
      while (0);
      return b | 0;
    }
    function lb(a) {
      a = a | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + 12) | 0) | 0;
    }
    function mb(b, e, f, g) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
      k = c[(b + 200) >> 2] | 0;
      l = ((1 << c[(k + 13080) >> 2]) + -1) | 0;
      j = c[(k + 13064) >> 2] | 0;
      i = f >> j;
      j = g >> j;
      m = c[(b + 136) >> 2] | 0;
      if (((a[(m + 308) >> 0] | 0) != 0) | (((l & f) | 0) != 0))
        h =
          d[
            ((c[(b + 7588) >> 2] | 0) +
              (i + -1 + (R(c[(k + 13140) >> 2] | 0, j) | 0))) >>
              0
          ] | 0;
      else h = 0;
      if ((((l & g) | 0) != 0) | ((a[(m + 309) >> 0] | 0) != 0))
        f =
          d[
            ((c[(b + 7588) >> 2] | 0) +
              ((R(c[(k + 13140) >> 2] | 0, (j + -1) | 0) | 0) + i)) >>
              0
          ] | 0;
      else f = 0;
      return (
        Za(
          (m + 224) | 0,
          (m + (((h | 0) > (e | 0) ? 3 : 2) + (((f | 0) > (e | 0)) & 1))) | 0
        ) | 0
      );
    }
    function nb(b, d) {
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0;
      e = (b + 136) | 0;
      f = c[e >> 2] | 0;
      do
        if (!(Za((f + 224) | 0, (f + 13) | 0) | 0)) {
          b = c[(b + 200) >> 2] | 0;
          if ((c[(b + 13064) >> 2] | 0) == (d | 0)) {
            b = c[e >> 2] | 0;
            if ((c[(b + 31244) >> 2] | 0) == 1) {
              b = 3;
              break;
            }
            if (Za((b + 224) | 0, (b + 14) | 0) | 0) {
              b = 1;
              break;
            }
            if ((d | 0) == 3) {
              b = 2;
              break;
            }
            b = c[e >> 2] | 0;
            b = (Za((b + 224) | 0, (b + 15) | 0) | 0) == 0;
            b = b ? 3 : 2;
            break;
          }
          f = (a[(b + 12940) >> 0] | 0) == 0;
          b = c[e >> 2] | 0;
          b = (Za((b + 224) | 0, (b + 14) | 0) | 0) != 0;
          if (f) {
            b = b ? 1 : 2;
            break;
          }
          d = c[e >> 2] | 0;
          d = (Za((d + 224) | 0, (d + 16) | 0) | 0) != 0;
          if (b) {
            if (d) {
              b = 1;
              break;
            }
            b = ($a(((c[e >> 2] | 0) + 224) | 0) | 0) == 0;
            b = b ? 4 : 5;
            break;
          } else {
            if (d) {
              b = 2;
              break;
            }
            b = ($a(((c[e >> 2] | 0) + 224) | 0) | 0) == 0;
            b = b ? 6 : 7;
            break;
          }
        } else b = 0;
      while (0);
      return b | 0;
    }
    function ob(a) {
      a = a | 0;
      return Xa(((c[(a + 136) >> 2] | 0) + 224) | 0) | 0;
    }
    function pb(a) {
      a = a | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + 17) | 0) | 0;
    }
    function qb(a) {
      a = a | 0;
      var b = 0;
      b = (a + 136) | 0;
      a = 0;
      do {
        if (!($a(((c[b >> 2] | 0) + 224) | 0) | 0)) break;
        a = (a + 1) | 0;
      } while ((a | 0) < 2);
      return a | 0;
    }
    function rb(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      d = (a + 136) | 0;
      a = 0;
      b = $a(((c[d >> 2] | 0) + 224) | 0) | 0;
      do {
        b = $a(((c[d >> 2] | 0) + 224) | 0) | 0 | (b << 1);
        a = (a + 1) | 0;
      } while ((a | 0) != 4);
      return b | 0;
    }
    function sb(a) {
      a = a | 0;
      var b = 0;
      a = (a + 136) | 0;
      b = c[a >> 2] | 0;
      if (!(Za((b + 224) | 0, (b + 18) | 0) | 0)) a = 4;
      else {
        b = ($a(((c[a >> 2] | 0) + 224) | 0) | 0) << 1;
        a = $a(((c[a >> 2] | 0) + 224) | 0) | 0 | b;
      }
      return a | 0;
    }
    function tb(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      d = (a + 136) | 0;
      b = c[d >> 2] | 0;
      b = Za((b + 224) | 0, (b + 21) | 0) | 0;
      a: do
        if (b) {
          a = (a + 3080) | 0;
          if (b >>> 0 < (((c[a >> 2] | 0) + -1) | 0) >>> 0)
            do {
              if (!($a(((c[d >> 2] | 0) + 224) | 0) | 0)) break a;
              b = (b + 1) | 0;
            } while (b >>> 0 < (((c[a >> 2] | 0) + -1) | 0) >>> 0);
        } else b = 0;
      while (0);
      return b | 0;
    }
    function ub(a) {
      a = a | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + 20) | 0) | 0;
    }
    function vb(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0,
        g = 0;
      f = (a + 136) | 0;
      a = c[f >> 2] | 0;
      e = (a + 224) | 0;
      if (((d + b) | 0) != 12)
        if (!(Za(e, (a + ((c[(a + 31232) >> 2] | 0) + 22)) | 0) | 0)) {
          a = c[f >> 2] | 0;
          e = (a + 224) | 0;
          g = 4;
        } else a = 2;
      else g = 4;
      if ((g | 0) == 4) a = Za(e, (a + 26) | 0) | 0;
      return a | 0;
    }
    function wb(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0;
      f = (b + -1) | 0;
      d = (f | 0) < 2 ? f : 2;
      e = (a + 136) | 0;
      a: do
        if ((b | 0) > 1) {
          a = 0;
          do {
            b = c[e >> 2] | 0;
            if (!(Za((b + 224) | 0, (b + (a + 27)) | 0) | 0)) break;
            a = (a + 1) | 0;
          } while ((a | 0) < (d | 0));
          if ((a | 0) == 2)
            if ((f | 0) > 2) {
              a = 2;
              do {
                if (!($a(((c[e >> 2] | 0) + 224) | 0) | 0)) break a;
                a = (a + 1) | 0;
              } while ((a | 0) < (f | 0));
            } else a = 2;
        } else a = 0;
      while (0);
      return a | 0;
    }
    function xb(a) {
      a = a | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + 35) | 0) | 0;
    }
    function yb(a) {
      a = a | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + 36) | 0) | 0;
    }
    function zb(a, b) {
      a = a | 0;
      b = b | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + (42 - b)) | 0) | 0;
    }
    function Ab(a, b) {
      a = a | 0;
      b = b | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + (b + 42)) | 0) | 0;
    }
    function Bb(a, b) {
      a = a | 0;
      b = b | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + ((b | 0) == 0 ? 41 : 40)) | 0) | 0;
    }
    function Cb(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0;
      d = (a + 136) | 0;
      b = ((b << 2) + 166) | 0;
      a = 0;
      do {
        e = c[d >> 2] | 0;
        if (!(Za((e + 224) | 0, (e + (b + a)) | 0) | 0)) break;
        a = (a + 1) | 0;
      } while ((a | 0) < 4);
      return a | 0;
    }
    function Db(a, b) {
      a = a | 0;
      b = b | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + (b + 174)) | 0) | 0;
    }
    function Eb(f, g, h, i, j, k) {
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        _ = 0,
        $ = 0,
        aa = 0,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0,
        fa = 0,
        ga = 0,
        ha = 0,
        ia = 0,
        ja = 0,
        ka = 0,
        la = 0,
        ma = 0,
        na = 0,
        oa = 0,
        pa = 0,
        qa = 0,
        ra = 0,
        sa = 0,
        ta = 0,
        ua = 0,
        va = 0,
        wa = 0,
        za = 0,
        Aa = 0,
        Ba = 0,
        Ca = 0,
        Ea = 0,
        Fa = 0,
        Ga = 0,
        Ha = 0,
        Ia = 0,
        Ja = 0,
        Ka = 0,
        La = 0,
        Ma = 0,
        Na = 0,
        Oa = 0,
        Pa = 0,
        Qa = 0,
        Ra = 0,
        Sa = 0;
      Sa = l;
      l = (l + 96) | 0;
      Ga = (Sa + 24) | 0;
      Ha = (Sa + 8) | 0;
      Ia = Sa;
      Ja = (f + 136) | 0;
      Oa = c[Ja >> 2] | 0;
      Qa = c[(f + 160) >> 2] | 0;
      Ra = c[(Qa + 32 + (k << 2)) >> 2] | 0;
      La = (f + 200) | 0;
      z = c[La >> 2] | 0;
      Pa = R(h >> c[(z + 13180 + (k << 2)) >> 2], Ra) | 0;
      Pa =
        ((c[(Qa + (k << 2)) >> 2] | 0) +
          (((g >> c[(z + 13168 + (k << 2)) >> 2]) << c[(z + 56) >> 2]) + Pa)) |
        0;
      z = (k | 0) != 0;
      Qa = (Oa + 320) | 0;
      Na = z ? (Oa + 11680) | 0 : Qa;
      g = Ga;
      h = (g + 64) | 0;
      do {
        a[g >> 0] = 0;
        g = (g + 1) | 0;
      } while ((g | 0) < (h | 0));
      y = 1 << i;
      Ea = (k | 0) == 0;
      Ka = c[(Ea ? (Oa + 288) | 0 : (Oa + 292) | 0) >> 2] | 0;
      Ma = y << i;
      ah(Na | 0, 0, (Ma << 1) | 0) | 0;
      Ca = (Oa + 31256) | 0;
      if (!(a[Ca >> 0] | 0)) {
        m = a[(Oa + 272) >> 0] | 0;
        o = (f + 204) | 0;
        Ba = c[o >> 2] | 0;
        if (
          (a[(Ba + 21) >> 0] | 0) != 0
            ? (d[(Ba + 1629) >> 0] | 0) >= (i | 0)
            : 0
        )
          q = Fb(f, k) | 0;
        else q = 0;
        do
          if (!Ea) {
            g = c[o >> 2] | 0;
            if ((k | 0) == 1) {
              g = ((c[(f + 3060) >> 2] | 0) + (c[(g + 28) >> 2] | 0)) | 0;
              h = (Oa + 302) | 0;
            } else {
              g = ((c[(f + 3064) >> 2] | 0) + (c[(g + 32) >> 2] | 0)) | 0;
              h = (Oa + 303) | 0;
            }
            g = (g + m + (a[h >> 0] | 0)) | 0;
            m = c[La >> 2] | 0;
            h = c[(m + 13192) >> 2] | 0;
            Ba = (0 - h) | 0;
            g = (g | 0) < (Ba | 0) ? Ba : (g | 0) < 57 ? g : 57;
            if ((c[(m + 4) >> 2] | 0) != 1) {
              g = (g | 0) < 51 ? g : 51;
              break;
            }
            if ((g | 0) >= 30)
              if ((g | 0) > 43) {
                g = (g + -6) | 0;
                break;
              } else {
                g = c[(96 + ((g + -30) << 2)) >> 2] | 0;
                break;
              }
          } else {
            Ba = c[La >> 2] | 0;
            g = m;
            h = c[(Ba + 13192) >> 2] | 0;
            m = Ba;
          }
        while (0);
        n = (h + g) | 0;
        h = ((c[(m + 52) >> 2] | 0) + i) | 0;
        g = (h + -5) | 0;
        h = 1 << (h + -6);
        n = d[(574 + (d[(580 + n) >> 0] | 0)) >> 0] << d[(656 + n) >> 0];
        if (
          (a[(m + 634) >> 0] | 0) != 0 ? !(((i | 0) > 2) & ((q | 0) != 0)) : 0
        ) {
          o = c[o >> 2] | 0;
          o = (a[(o + 68) >> 0] | 0) == 0 ? (m + 635) | 0 : (o + 69) | 0;
          p = (((c[(Oa + 31244) >> 2] | 0) != 1 ? 3 : 0) + k) | 0;
          m = (o + ((((i + -2) | 0) * 384) | 0) + (p << 6)) | 0;
          if ((i | 0) > 3) {
            Aa = g;
            wa = q;
            x = a[(o + 1536 + ((((i + -4) | 0) * 6) | 0) + p) >> 0] | 0;
          } else {
            Aa = g;
            wa = q;
            x = 16;
          }
        } else {
          Aa = g;
          wa = q;
          m = 0;
          x = 16;
        }
      } else {
        Aa = 0;
        h = 0;
        n = 0;
        wa = 0;
        m = 0;
        x = 0;
      }
      za = (Oa + 31244) | 0;
      do
        if (
          (c[za >> 2] | 0) == 0
            ? (c[((c[La >> 2] | 0) + 13108) >> 2] | 0) != 0
            : 0
        ) {
          if ((wa | 0) == 0 ? (a[Ca >> 0] | 0) == 0 : 0) {
            ua = 0;
            va = 0;
            break;
          }
          g = Gb(f, k) | 0;
          if (g) {
            ua = g;
            va = Hb(f, k) | 0;
          } else {
            ua = 0;
            va = 0;
          }
        } else {
          ua = 0;
          va = 0;
        }
      while (0);
      ta = i << 1;
      s = (ta + -1) | 0;
      Ba = (i + -2) | 0;
      p = Ea ? (((Ba * 3) | 0) + ((i + -1) >> 2)) | 0 : 15;
      r = Ea ? (i + 1) >> 2 : Ba;
      if ((ta | 0) > 1) {
        o = (p + 52) | 0;
        g = 0;
        while (1) {
          ta = c[Ja >> 2] | 0;
          if (!(Za((ta + 224) | 0, (ta + (o + (g >> r))) | 0) | 0)) {
            q = g;
            break;
          }
          g = (g + 1) | 0;
          if ((g | 0) >= (s | 0)) {
            q = g;
            break;
          }
        }
        o = (p + 70) | 0;
        g = 0;
        while (1) {
          ta = c[Ja >> 2] | 0;
          if (!(Za((ta + 224) | 0, (ta + (o + (g >> r))) | 0) | 0)) {
            r = g;
            break;
          }
          g = (g + 1) | 0;
          if ((g | 0) >= (s | 0)) {
            r = g;
            break;
          }
        }
        if ((q | 0) > 3) {
          p = ((q >>> 1) + -1) | 0;
          g = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0;
          if ((p | 0) > 1) {
            o = 1;
            do {
              g = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0 | (g << 1);
              o = (o + 1) | 0;
            } while ((o | 0) != (p | 0));
          }
          q = (g + (((q & 1) | 2) << p)) | 0;
        }
        if ((r | 0) > 3) {
          p = ((r >>> 1) + -1) | 0;
          g = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0;
          if ((p | 0) > 1) {
            o = 1;
            do {
              g = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0 | (g << 1);
              o = (o + 1) | 0;
            } while ((o | 0) != (p | 0));
          }
          v = (g + (((r & 1) | 2) << p)) | 0;
        } else v = r;
      } else {
        v = 0;
        q = 0;
      }
      a: do
        if ((j | 0) == 2) {
          s = q;
          t = v;
          u = q >> 2;
          g = v >> 2;
          Fa = 50;
        } else {
          w = q >> 2;
          u = v >> 2;
          switch (j | 0) {
            case 0:
              break;
            case 1: {
              sa = 824;
              ta = 840;
              o = d[(856 + (v << 3) + q) >> 0] | 0;
              p = 816;
              r = 820;
              s = v;
              g = w;
              break a;
            }
            default: {
              s = v;
              t = q;
              g = w;
              Fa = 50;
              break a;
            }
          }
          o = d[((q & 3) + (732 + ((v & 3) << 2))) >> 0] | 0;
          switch (i | 0) {
            case 2: {
              sa = 414;
              ta = 430;
              p = 3892;
              r = 3892;
              s = v;
              g = w;
              break a;
            }
            case 3: {
              p = 820;
              r = 816;
              g = (748 + (u << 1) + w) | 0;
              break;
            }
            case 4: {
              p = 414;
              r = 430;
              g = (732 + (u << 2) + w) | 0;
              break;
            }
            default: {
              p = 446;
              r = 510;
              g = (752 + (u << 3) + w) | 0;
            }
          }
          sa = 414;
          ta = 430;
          o = ((d[g >> 0] << 4) + o) | 0;
          s = v;
          g = w;
        }
      while (0);
      if ((Fa | 0) == 50) {
        sa = 840;
        ta = 824;
        o = d[(856 + (t << 3) + s) >> 0] | 0;
        p = 820;
        r = 816;
        q = t;
      }
      ra = (o + 1) | 0;
      pa = o >> 4;
      if ((pa | 0) > -1) {
        qa = ((1 << Ba) + -1) | 0;
        na = (k | 0) > 0;
        oa = na ? 90 : 88;
        ma = (y + -1) >> 2;
        ia = z ? 27 : 0;
        ja = (i | 0) == 2;
        ka = (i | 0) == 3;
        la = (ia + 3) | 0;
        _ = (j | 0) == 0 ? 9 : 15;
        Z = Ea ? 0 : 27;
        $ = (wa | 0) == 0;
        Y = Ea ? 42 : 43;
        X = Ea ? 40 : 41;
        aa = (ua | 0) != 0;
        ba = (wa | 0) != 0;
        ga = ((Ka | 16 | 0) == 26) | aa;
        ca = (f + 204) | 0;
        da = (((n | 0) < 0) << 31) >> 31;
        ea = (((h | 0) < 0) << 31) >> 31;
        ha = ((i | 0) > 2) & ba;
        fa = (i | 0) < 4;
        U = x & 255;
        V = (Ea & 1) << 1;
        W = V | 1;
        T = (ia + (ka ? 9 : 12)) | 0;
        v = 1;
        S = pa;
        t = 0;
        o = 16;
        while (1) {
          y = S << 4;
          j = a[(p + S) >> 0] | 0;
          E = j & 255;
          B = a[(r + S) >> 0] | 0;
          F = B & 255;
          D = (S | 0) != 0;
          if (((S | 0) < (pa | 0)) & D) {
            if ((E | 0) < (qa | 0)) w = d[(Ga + ((E + 1) << 3) + F) >> 0] | 0;
            else w = 0;
            if ((F | 0) < (qa | 0))
              x = ((d[(F + 1 + (Ga + (E << 3))) >> 0] | 0) + w) | 0;
            else x = w;
            k = c[Ja >> 2] | 0;
            w = 1;
            k =
              (Za((k + 224) | 0, (k + (((x | 0) < 1 ? x : 1) + oa)) | 0) | 0) &
              255;
          } else {
            w = 0;
            k =
              ((((B | j) << 24) >> 24 == 0) |
                (((E | 0) == (g | 0)) & ((F | 0) == (u | 0)))) &
              1;
          }
          a[(Ga + (E << 3) + F) >> 0] = k;
          x = (ra - y) | 0;
          if ((S | 0) == (pa | 0)) {
            a[Ha >> 0] = x + 255;
            A = (x + -2) | 0;
            x = 1;
          } else {
            A = 15;
            x = 0;
          }
          if ((E | 0) < (ma | 0))
            y = ((a[(Ga + ((E + 1) << 3) + F) >> 0] | 0) != 0) & 1;
          else y = 0;
          if ((F | 0) < (ma | 0))
            y = ((((a[(F + 1 + (Ga + (E << 3))) >> 0] | 0) != 0) & 1) << 1) | y;
          do
            if (((A | 0) > -1) & ((k << 24) >> 24 != 0)) {
              if (!(c[((c[La >> 2] | 0) + 13100) >> 2] | 0))
                if (ja) {
                  k = 920;
                  j = ia;
                } else Fa = 71;
              else if ($) {
                z = (a[Ca >> 0] | 0) != 0;
                if (z | ja) {
                  k = z ? 984 : 920;
                  j = z ? X : ia;
                } else Fa = 71;
              } else {
                k = 984;
                j = X;
              }
              do
                if ((Fa | 0) == 71) {
                  Fa = 0;
                  k = (920 + ((y << 4) + 16)) | 0;
                  if (Ea) {
                    y = ((B | j) << 24) >> 24 == 0 ? ia : la;
                    if (ka) {
                      j = (y + _) | 0;
                      break;
                    } else {
                      j = (y + 21) | 0;
                      break;
                    }
                  } else j = T;
                }
              while (0);
              if ((A | 0) > 0) {
                z = (j + 92) | 0;
                y = A;
                while (1) {
                  Q = c[Ja >> 2] | 0;
                  if (
                    Za(
                      (Q + 224) | 0,
                      (Q +
                        (z +
                          (d[
                            (k +
                              ((d[(ta + y) >> 0] << 2) +
                                (d[(sa + y) >> 0] | 0))) >>
                              0
                          ] |
                            0))) |
                        0
                    ) | 0
                  ) {
                    a[(Ha + (x & 255)) >> 0] = y;
                    x = ((x + 1) << 24) >> 24;
                    w = 0;
                  }
                  if ((y | 0) > 1) y = (y + -1) | 0;
                  else break;
                }
              }
              if (!w) {
                if (c[((c[La >> 2] | 0) + 13100) >> 2] | 0)
                  if ($ ? (a[Ca >> 0] | 0) == 0 : 0) Fa = 84;
                  else w = Y;
                else Fa = 84;
                if ((Fa | 0) == 84) {
                  Fa = 0;
                  w = (S | 0) == 0 ? Z : (j + 2) | 0;
                }
                Q = c[Ja >> 2] | 0;
                if ((Za((Q + 224) | 0, (Q + (w + 92)) | 0) | 0) != 1) break;
              }
              a[(Ha + (x & 255)) >> 0] = 0;
              x = ((x + 1) << 24) >> 24;
            }
          while (0);
          Q = x & 255;
          if ((x << 24) >> 24) {
            w = Ea & D ? 2 : 0;
            if (!(c[((c[La >> 2] | 0) + 13116) >> 2] | 0)) D = 0;
            else {
              if ($ ? (a[Ca >> 0] | 0) == 0 : 0) t = V;
              else t = W;
              D = ((d[(Oa + 199 + t) >> 0] | 0) >>> 2) & 255;
            }
            A = (((S | 0) != (pa | 0)) & ((v | 0) == 0) & 1) | w;
            B = a[Ha >> 0] | 0;
            j = B & 255;
            k = Q >>> 0 < 8 ? Q : 8;
            if ((k | 0) > 0) {
              z = A << 2;
              w = -1;
              y = 0;
              v = 1;
              do {
                P = (v + z) | 0;
                O = c[Ja >> 2] | 0;
                P =
                  (Za(
                    (O + 224) | 0,
                    (O + ((na ? (P + 16) | 0 : P) + 136)) | 0
                  ) |
                    0) &
                  255;
                a[(Ia + y) >> 0] = P;
                if (!((P << 24) >> 24))
                  v = (((((v + -1) | 0) >>> 0 < 2) & 1) + v) | 0;
                else {
                  w = (w | 0) == -1 ? y : w;
                  v = 0;
                }
                y = (y + 1) | 0;
              } while ((y | 0) < (k | 0));
              P = w;
            } else {
              P = -1;
              v = 1;
            }
            y = (Q + -1) | 0;
            O = a[(Ha + y) >> 0] | 0;
            w = O & 255;
            b: do
              if (!(a[Ca >> 0] | 0)) {
                do
                  if ((c[za >> 2] | 0) == 1) {
                    if (
                      !(ba & ((c[((c[La >> 2] | 0) + 13104) >> 2] | 0) != 0))
                    ) {
                      Fa = 103;
                      break;
                    }
                    if (ga) {
                      w = 0;
                      break b;
                    }
                  } else Fa = 103;
                while (0);
                if ((Fa | 0) == 103 ? ((Fa = 0), aa) : 0) {
                  w = 0;
                  break;
                }
                w = (((j - w) | 0) > 3) & 1;
              } else w = 0;
            while (0);
            if ((P | 0) != -1) {
              M = c[Ja >> 2] | 0;
              M = Za((M + 224) | 0, (M + ((na ? A | 4 : A) | 160)) | 0) | 0;
              N = (Ia + P) | 0;
              a[N >> 0] = (d[N >> 0] | 0) + M;
            }
            N = (w | 0) != 0;
            k = N & ((a[((c[ca >> 2] | 0) + 4) >> 0] | 0) != 0);
            M = k ? y & 255 : x;
            k = k ? 17 : 16;
            y = M & 255;
            if (!((M << 24) >> 24)) w = 0;
            else {
              x = 0;
              w = 0;
              do {
                w = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0 | (w << 1);
                x = (x + 1) | 0;
              } while ((x | 0) != (y | 0));
            }
            M = E << 2;
            K = F << 2;
            L = (Oa + 199 + t) | 0;
            F = 0;
            E = 0;
            G = w << (k - Q);
            j = D;
            J = 0;
            D = B;
            while (1) {
              I = D & 255;
              H = ((d[(sa + I) >> 0] | 0) + M) | 0;
              I = ((d[(ta + I) >> 0] | 0) + K) | 0;
              do
                if ((J | 0) < 8) {
                  B = ((d[(Ia + J) >> 0] | 0) + 1) | 0;
                  A = (J | 0) == (P | 0);
                  if (((B | 0) == ((A ? 3 : 2) | 0)) & (0 == ((A ? 0 : 0) | 0)))
                    w = 0;
                  else {
                    A = E;
                    z = j;
                    w = B;
                    x = 0;
                    break;
                  }
                  while (1) {
                    if (!($a(((c[Ja >> 2] | 0) + 224) | 0) | 0)) {
                      Fa = 114;
                      break;
                    }
                    w = (w + 1) | 0;
                    if ((w | 0) >= 31) {
                      Fa = 117;
                      break;
                    }
                  }
                  do
                    if ((Fa | 0) == 114) {
                      Fa = 0;
                      if ((w | 0) >= 3) {
                        Fa = 117;
                        break;
                      }
                      if ((j | 0) > 0) {
                        y = 0;
                        x = 0;
                      } else {
                        x = 0;
                        break;
                      }
                      do {
                        x = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0 | (x << 1);
                        y = (y + 1) | 0;
                      } while ((y | 0) != (j | 0));
                    }
                  while (0);
                  if ((Fa | 0) == 117) {
                    Fa = 0;
                    k = (w + -3) | 0;
                    y = (k + j) | 0;
                    if ((y | 0) > 0) {
                      w = 0;
                      x = 0;
                      do {
                        w = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0 | (w << 1);
                        x = (x + 1) | 0;
                      } while ((x | 0) != (y | 0));
                    } else w = 0;
                    x = w;
                    w = ((1 << k) + 2) | 0;
                  }
                  A = ((w << j) + x) | 0;
                  w =
                    $g(A | 0, ((((A | 0) < 0) << 31) >> 31) | 0, B | 0, 0) | 0;
                  x = C;
                  B = 3 << j;
                  z = (((B | 0) < 0) << 31) >> 31;
                  y = c[((c[La >> 2] | 0) + 13116) >> 2] | 0;
                  if (
                    ((x | 0) > (z | 0)) |
                    (((x | 0) == (z | 0)) & (w >>> 0 > B >>> 0))
                  ) {
                    z = (j + 1) | 0;
                    z = (y | 0) == 0 ? ((z | 0) < 4 ? z : 4) : z;
                  } else z = j;
                  if (((E | 0) != 0) | ((y | 0) == 0)) {
                    A = E;
                    break;
                  }
                  k = a[L >> 0] | 0;
                  y = ((k & 255) >>> 2) & 255;
                  if ((A | 0) < ((3 << y) | 0))
                    if (
                      ((k << 24) >> 24 == 0) |
                      (((A << 1) | 0) >= ((1 << y) | 0))
                    ) {
                      A = 1;
                      break;
                    } else y = -1;
                  else y = 1;
                  a[L >> 0] = ((y + k) << 24) >> 24;
                  A = 1;
                } else {
                  w = 0;
                  while (1) {
                    if (!($a(((c[Ja >> 2] | 0) + 224) | 0) | 0)) {
                      Fa = 128;
                      break;
                    }
                    w = (w + 1) | 0;
                    if ((w | 0) >= 31) {
                      Fa = 131;
                      break;
                    }
                  }
                  do
                    if ((Fa | 0) == 128) {
                      Fa = 0;
                      if ((w | 0) >= 3) {
                        Fa = 131;
                        break;
                      }
                      if ((j | 0) > 0) {
                        y = 0;
                        x = 0;
                      } else {
                        x = 0;
                        break;
                      }
                      do {
                        x = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0 | (x << 1);
                        y = (y + 1) | 0;
                      } while ((y | 0) != (j | 0));
                    }
                  while (0);
                  if ((Fa | 0) == 131) {
                    Fa = 0;
                    k = (w + -3) | 0;
                    y = (k + j) | 0;
                    if ((y | 0) > 0) {
                      w = 0;
                      x = 0;
                      do {
                        w = $a(((c[Ja >> 2] | 0) + 224) | 0) | 0 | (w << 1);
                        x = (x + 1) | 0;
                      } while ((x | 0) != (y | 0));
                    } else w = 0;
                    x = w;
                    w = ((1 << k) + 2) | 0;
                  }
                  z = ((w << j) + x) | 0;
                  w = (z + 1) | 0;
                  x = (((w | 0) < 0) << 31) >> 31;
                  y = c[((c[La >> 2] | 0) + 13116) >> 2] | 0;
                  if ((z | 0) >= ((3 << j) | 0)) {
                    j = (j + 1) | 0;
                    j = (y | 0) == 0 ? ((j | 0) < 4 ? j : 4) : j;
                  }
                  if (((E | 0) != 0) | ((y | 0) == 0)) {
                    A = E;
                    z = j;
                    break;
                  }
                  k = a[L >> 0] | 0;
                  y = ((k & 255) >>> 2) & 255;
                  if ((z | 0) < ((3 << y) | 0))
                    if (
                      ((k << 24) >> 24 == 0) |
                      (((z << 1) | 0) >= ((1 << y) | 0))
                    ) {
                      A = 1;
                      z = j;
                      break;
                    } else y = -1;
                  else y = 1;
                  a[L >> 0] = ((y + k) << 24) >> 24;
                  A = 1;
                  z = j;
                }
              while (0);
              if (N & ((a[((c[ca >> 2] | 0) + 4) >> 0] | 0) != 0)) {
                j = $g(w | 0, x | 0, F | 0, 0) | 0;
                F = ((j & 1) | 0) == 0 ? 1 : (D << 24) >> 24 != (O << 24) >> 24;
                E = Zg(0, 0, w | 0, x | 0) | 0;
                w = F ? w : E;
                x = F ? x : C;
              } else j = F;
              k = ((G & 32768) | 0) == 0;
              y = Zg(0, 0, w | 0, x | 0) | 0;
              y = k ? w : y;
              x = k ? x : C;
              k = (G << 1) & 131070;
              w = y & 65535;
              do
                if (!(a[Ca >> 0] | 0)) {
                  do
                    if (!(((a[((c[La >> 2] | 0) + 634) >> 0] | 0) == 0) | ha)) {
                      if (!(fa | ((I | H | 0) != 0))) {
                        o = U;
                        break;
                      }
                      switch (i | 0) {
                        case 3: {
                          o = ((I << 3) + H) | 0;
                          break;
                        }
                        case 4: {
                          o = (((I >>> 1) << 3) + (H >>> 1)) | 0;
                          break;
                        }
                        case 5: {
                          o = (((I >>> 2) << 3) + (H >>> 2)) | 0;
                          break;
                        }
                        default:
                          o = ((I << 2) + H) | 0;
                      }
                      o = d[(m + o) >> 0] | 0;
                    }
                  while (0);
                  w = eh(y | 0, x | 0, n | 0, da | 0) | 0;
                  w =
                    eh(w | 0, C | 0, o | 0, ((((o | 0) < 0) << 31) >> 31) | 0) |
                    0;
                  w = $g(w | 0, C | 0, h | 0, ea | 0) | 0;
                  w = Yg(w | 0, C | 0, Aa | 0) | 0;
                  x = C;
                  if ((x | 0) < 0) {
                    w =
                      (((w & -32768) | 0) == -32768) &
                      (((x & 268435455) | 0) == 268435455)
                        ? w & 65535
                        : -32768;
                    break;
                  } else {
                    G = (x >>> 0 < 0) | (((x | 0) == 0) & (w >>> 0 < 32767));
                    w = G ? w : 32767;
                    w = w & 65535;
                    break;
                  }
                }
              while (0);
              b[(Na + (((I << i) + H) << 1)) >> 1] = w;
              w = (J + 1) | 0;
              if ((w | 0) == (Q | 0)) break;
              F = j;
              E = A;
              G = k;
              j = z;
              J = w;
              D = a[(Ha + w) >> 0] | 0;
            }
          }
          if ((S | 0) > 0) S = (S + -1) | 0;
          else break;
        }
      }
      do
        if (!(a[Ca >> 0] | 0)) {
          g = (i | 0) == 2;
          if (wa | 0) {
            if (
              g & ((c[((c[La >> 2] | 0) + 13096) >> 2] | 0) != 0)
                ? (c[za >> 2] | 0) == 1
                : 0
            ) {
              g = 0;
              do {
                Ha = (Na + ((15 - g) << 1)) | 0;
                Ia = b[Ha >> 1] | 0;
                Ja = (Na + (g << 1)) | 0;
                b[Ha >> 1] = b[Ja >> 1] | 0;
                b[Ja >> 1] = Ia;
                g = (g + 1) | 0;
              } while ((g | 0) != 8);
            }
            h = i & 65535;
            ya[c[(f + 5872) >> 2] & 15](Na, h);
            g = (ua | 0) != 0;
            if (!g) {
              if (!(c[((c[La >> 2] | 0) + 13104) >> 2] | 0)) break;
              if (!(((Ka | 16 | 0) == 26) & ((c[za >> 2] | 0) == 1))) break;
            }
            Da[c[(f + 5876) >> 2] & 7](Na, h, g ? va : ((Ka | 0) == 26) & 1);
            break;
          }
          if (g & (Ea & ((c[za >> 2] | 0) == 1))) {
            xa[c[(f + 5880) >> 2] & 7](Na);
            break;
          }
          h = (q | 0) > (s | 0) ? q : s;
          if (!h) {
            xa[c[(f + 5900 + (Ba << 2)) >> 2] & 7](Na);
            break;
          }
          g = (s + 4 + q) | 0;
          do
            if ((h | 0) >= 4)
              if ((h | 0) < 8) {
                g = (g | 0) < 8 ? g : 8;
                break;
              } else {
                g = (h | 0) < 12 ? ((g | 0) < 24 ? g : 24) : g;
                break;
              }
            else g = (g | 0) < 4 ? g : 4;
          while (0);
          ya[c[(f + 5884 + (Ba << 2)) >> 2] & 15](Na, g);
        } else {
          g = (c[((c[La >> 2] | 0) + 13104) >> 2] | 0) != 0;
          if ((ua | 0) == 0 ? !(((Ka | 16 | 0) == 26) & g) : 0) break;
          Da[c[(f + 5876) >> 2] & 7](
            Na,
            i & 65535,
            g ? ((Ka | 0) == 26) & 1 : va
          );
        }
      while (0);
      if (a[(Oa + 304) >> 0] | 0 ? (Ma | 0) > 0 : 0) {
        h = c[(Oa + 284) >> 2] | 0;
        g = 0;
        do {
          Oa = (Na + (g << 1)) | 0;
          b[Oa >> 1] =
            ((R(b[(Qa + (g << 1)) >> 1] | 0, h) | 0) >>> 3) + (e[Oa >> 1] | 0);
          g = (g + 1) | 0;
        } while ((g | 0) != (Ma | 0));
      }
      Da[c[(f + 5856 + (Ba << 2)) >> 2] & 7](Pa, Na, Ra);
      l = Sa;
      return;
    }
    function Fb(a, b) {
      a = a | 0;
      b = b | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + (b | 0 ? 47 : 46)) | 0) | 0;
    }
    function Gb(a, b) {
      a = a | 0;
      b = b | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + (b | 0 ? 49 : 48)) | 0) | 0;
    }
    function Hb(a, b) {
      a = a | 0;
      b = b | 0;
      a = c[(a + 136) >> 2] | 0;
      return Za((a + 224) | 0, (a + (b | 0 ? 51 : 50)) | 0) | 0;
    }
    function Ib(a, d, e, f) {
      a = a | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0;
      i = (a + 136) | 0;
      j = c[i >> 2] | 0;
      a = Za((j + 224) | 0, (j + 31) | 0) | 0;
      d = c[i >> 2] | 0;
      d = Za((d + 224) | 0, (d + 31) | 0) | 0;
      if (!a) a = 0;
      else {
        h = c[i >> 2] | 0;
        a = ((Za((h + 224) | 0, (h + 34) | 0) | 0) + a) | 0;
      }
      if (!d) h = 0;
      else {
        h = c[i >> 2] | 0;
        h = ((Za((h + 224) | 0, (h + 34) | 0) | 0) + d) | 0;
      }
      switch (a | 0) {
        case 2: {
          a = 2;
          d = 1;
          do {
            if (!($a(((c[i >> 2] | 0) + 224) | 0) | 0)) break;
            a = ((1 << d) + a) | 0;
            d = (d + 1) | 0;
          } while ((d | 0) < 31);
          e = ((c[i >> 2] | 0) + 224) | 0;
          do {
            d = (d + -1) | 0;
            a = ((($a(e) | 0) << d) + a) | 0;
            f = c[i >> 2] | 0;
            e = (f + 224) | 0;
          } while ((d | 0) != 0);
          d = c[e >> 2] << 1;
          c[e >> 2] = d;
          if (!(d & 65534)) {
            Ob(e);
            d = c[e >> 2] | 0;
          }
          k = c[(f + 228) >> 2] << 17;
          f = (d - k) | 0;
          g = f >> 31;
          c[e >> 2] = (g & k) + f;
          a = ((g ^ (0 - a)) - g) & 65535;
          g = 16;
          break;
        }
        case 1: {
          d = c[i >> 2] | 0;
          e = (d + 224) | 0;
          a = c[e >> 2] << 1;
          c[e >> 2] = a;
          if (!(a & 65534)) {
            Ob(e);
            a = c[e >> 2] | 0;
          }
          k = c[(d + 228) >> 2] << 17;
          g = (a - k) | 0;
          a = g >> 31;
          c[e >> 2] = (a & k) + g;
          a = ((a ^ 65535) - a) & 65535;
          g = 16;
          break;
        }
        case 0: {
          a = 0;
          g = 16;
          break;
        }
        default: {
        }
      }
      if ((g | 0) == 16) b[(j + 31272) >> 1] = a;
      switch (h | 0) {
        case 2: {
          a = 2;
          d = 1;
          do {
            if (!($a(((c[i >> 2] | 0) + 224) | 0) | 0)) break;
            a = ((1 << d) + a) | 0;
            d = (d + 1) | 0;
          } while ((d | 0) < 31);
          e = ((c[i >> 2] | 0) + 224) | 0;
          do {
            d = (d + -1) | 0;
            a = ((($a(e) | 0) << d) + a) | 0;
            f = c[i >> 2] | 0;
            e = (f + 224) | 0;
          } while ((d | 0) != 0);
          d = c[e >> 2] << 1;
          c[e >> 2] = d;
          if (!(d & 65534)) {
            Ob(e);
            d = c[e >> 2] | 0;
          }
          i = c[(f + 228) >> 2] << 17;
          k = (d - i) | 0;
          g = k >> 31;
          c[e >> 2] = (g & i) + k;
          a = ((g ^ (0 - a)) - g) & 65535;
          g = 28;
          break;
        }
        case 1: {
          d = c[i >> 2] | 0;
          e = (d + 224) | 0;
          a = c[e >> 2] << 1;
          c[e >> 2] = a;
          if (!(a & 65534)) {
            Ob(e);
            a = c[e >> 2] | 0;
          }
          k = c[(d + 228) >> 2] << 17;
          g = (a - k) | 0;
          a = g >> 31;
          c[e >> 2] = (a & k) + g;
          a = ((a ^ 65535) - a) & 65535;
          g = 28;
          break;
        }
        case 0: {
          a = 0;
          g = 28;
          break;
        }
        default: {
        }
      }
      if ((g | 0) == 28) b[(j + 31274) >> 1] = a;
      return;
    }
    function Jb(a) {
      a = a | 0;
      var b = 0;
      b = (0 - (Kb(a) | 0)) & 7;
      if (b | 0) Ve(a, b);
      return;
    }
    function Kb(a) {
      a = a | 0;
      return c[(a + 8) >> 2] | 0;
    }
    function Lb(a) {
      a = a | 0;
      var b = 0;
      b = c[(a + 12) >> 2] | 0;
      return (b - (Kb(a) | 0)) | 0;
    }
    function Mb(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      b = c[(a + 16) >> 2] | 0;
      d = c[a >> 2] | 0;
      b = ((d & 1) | 0) == 0 ? b : (b + -1) | 0;
      b = ((d & 511) | 0) == 0 ? b : (b + -1) | 0;
      d = ((c[(a + 20) >> 2] | 0) - b) | 0;
      if ((d | 0) >= 0) Qe(a, b, d);
      return;
    }
    function Nb(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0;
      d = (a + 4) | 0;
      e = c[d >> 2] | 0;
      b = ((e + -256) | 0) >>> 31;
      c[d >> 2] = e << b;
      b = c[a >> 2] << b;
      c[a >> 2] = b;
      if (!(b & 65535)) Ob(a);
      return;
    }
    function Ob(a) {
      a = a | 0;
      var b = 0,
        e = 0;
      b = (a + 16) | 0;
      e = c[b >> 2] | 0;
      c[a >> 2] =
        (c[a >> 2] | 0) +
        -65535 +
        (((d[(e + 1) >> 0] | 0) << 1) | ((d[e >> 0] | 0) << 9));
      if (e >>> 0 < (c[(a + 20) >> 2] | 0) >>> 0) c[b >> 2] = e + 2;
      return;
    }
    function Pb(a) {
      a = a | 0;
      var b = 0,
        e = 0,
        f = 0;
      f = c[a >> 2] | 0;
      e = (a + 16) | 0;
      b = c[e >> 2] | 0;
      c[a >> 2] =
        (((((d[(b + 1) >> 0] | 0) << 1) | ((d[b >> 0] | 0) << 9)) + -65535) <<
          (7 - (d[(4917 + (((f + -1) ^ f) >> 15)) >> 0] | 0))) +
        f;
      if (b >>> 0 < (c[(a + 20) >> 2] | 0) >>> 0) c[e >> 2] = b + 2;
      return;
    }
    function Qb(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0;
      d = Rb(b, d, e) | 0;
      f = c[(b + 136) >> 2] | 0;
      e = c[(f + 280) >> 2] | 0;
      if (e) {
        g = c[((c[(b + 200) >> 2] | 0) + 13192) >> 2] | 0;
        b = (d + 52 + e + (g << 1)) | 0;
        d = (b + ((b | 0) > 0 ? 0 : (-52 - g + 1) | 0)) | 0;
        d = (((d | 0) % ((g + 52) | 0) | 0) - g + b - d) | 0;
      }
      a[(f + 272) >> 0] = d;
      return;
    }
    function Rb(b, d, e) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
      g = c[(b + 136) >> 2] | 0;
      m = c[(b + 200) >> 2] | 0;
      j = c[(m + 13080) >> 2] | 0;
      i = ((1 << j) + -1) | 0;
      j = -1 << (j - (c[((c[(b + 204) >> 2] | 0) + 24) >> 2] | 0));
      h = j & d;
      j = j & e;
      k = c[(m + 13140) >> 2] | 0;
      m = c[(m + 13064) >> 2] | 0;
      l = h >> m;
      m = j >> m;
      f = (g + 203) | 0;
      if (((a[f >> 0] | 0) != 0) | ((h | j | 0) == 0)) {
        a[f >> 0] = ((a[(g + 300) >> 0] | 0) == 0) & 1;
        f = a[(b + 3100) >> 0] | 0;
      } else f = c[(g + 276) >> 2] | 0;
      if ((((i & d) | 0) != 0) & (((h & i) | 0) != 0)) {
        g = (l + -1 + (R(m, k) | 0)) | 0;
        g = a[((c[(b + 7568) >> 2] | 0) + g) >> 0] | 0;
      } else g = f;
      if ((((i & e) | 0) != 0) & (((j & i) | 0) != 0)) {
        f = ((R((m + -1) | 0, k) | 0) + l) | 0;
        f = a[((c[(b + 7568) >> 2] | 0) + f) >> 0] | 0;
      }
      return ((g + 1 + f) >> 1) | 0;
    }
    function Sb(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0;
      w = c[(b + 136) >> 2] | 0;
      x = (b + 200) | 0;
      j = c[x >> 2] | 0;
      F = c[(j + 13084) >> 2] | 0;
      y = c[(j + 13072) >> 2] | 0;
      D = c[(j + 13156) >> 2] | 0;
      z = c[(j + 13148) >> 2] | 0;
      A = (b + 3508) | 0;
      k = c[A >> 2] | 0;
      E = c[(k + 16) >> 2] | 0;
      v = R(D, e >> F) | 0;
      B = d >> F;
      C = (a[(E + ((((v + B) | 0) * 12) | 0) + 10) >> 0] | 0) == 0;
      i = ((e | 0) > 0) & (((e & 7) | 0) == 0);
      do
        if (i) {
          if (
            ((a[(b + 3050) >> 0] | 0) == 0 ? (c[(w + 31312) >> 2] & 4) | 0 : 0)
              ? ((e | 0) % ((1 << c[(j + 13080) >> 2]) | 0) | 0 | 0) == 0
              : 0
          )
            break;
          if (
            (a[((c[(b + 204) >> 2] | 0) + 53) >> 0] | 0) == 0
              ? ((h = c[(w + 31312) >> 2] | 0), ((h & 8) | 0) != 0)
              : 0
          ) {
            if (!((e | 0) % ((1 << c[(j + 13080) >> 2]) | 0) | 0)) break;
          } else {
            if (!i) break;
            h = c[(w + 31312) >> 2] | 0;
          }
          i = (e + -1) | 0;
          if (!(h & 4)) u = c[(k + 20) >> 2] | 0;
          else u = Wc(b, k, d, i) | 0;
          r = 1 << f;
          if ((f | 0) != 31) {
            s = R(D, i >> F) | 0;
            t = (b + 7596) | 0;
            m = R(z, i >> y) | 0;
            n = R(z, e >> y) | 0;
            o = (b + 7572) | 0;
            p = (b + 5840) | 0;
            l = 0;
            do {
              q = (l + d) | 0;
              H = q >> F;
              k = q >> y;
              G = (H + s) | 0;
              h = (E + ((G * 12) | 0)) | 0;
              H = (H + v) | 0;
              i = (E + ((H * 12) | 0)) | 0;
              I = c[t >> 2] | 0;
              j = a[(I + (k + m)) >> 0] | 0;
              k = a[(I + (k + n)) >> 0] | 0;
              if (
                (a[(E + ((H * 12) | 0) + 10) >> 0] | 0) != 0
                  ? (a[(E + ((G * 12) | 0) + 10) >> 0] | 0) != 0
                  : 0
              )
                if (!(((k | j) << 24) >> 24)) h = Tb(b, i, h, u) | 0;
                else h = 1;
              else h = 2;
              a[
                ((c[o >> 2] | 0) + (((R(c[p >> 2] | 0, e) | 0) + q) >> 2)) >> 0
              ] = h;
              l = (l + 4) | 0;
            } while ((l | 0) < (r | 0));
          }
        }
      while (0);
      h = ((d | 0) > 0) & (((d & 7) | 0) == 0);
      do
        if (h) {
          if (
            ((a[(b + 3050) >> 0] | 0) == 0 ? (c[(w + 31312) >> 2] & 1) | 0 : 0)
              ? ((d | 0) % ((1 << c[((c[x >> 2] | 0) + 13080) >> 2]) | 0) |
                  0 |
                  0) ==
                0
              : 0
          )
            break;
          if (
            (a[((c[(b + 204) >> 2] | 0) + 53) >> 0] | 0) == 0
              ? ((g = c[(w + 31312) >> 2] | 0), ((g & 2) | 0) != 0)
              : 0
          ) {
            if (!((d | 0) % ((1 << c[((c[x >> 2] | 0) + 13080) >> 2]) | 0) | 0))
              break;
          } else {
            if (!h) break;
            g = c[(w + 31312) >> 2] | 0;
          }
          i = (d + -1) | 0;
          h = c[A >> 2] | 0;
          if (!(g & 1)) t = c[(h + 20) >> 2] | 0;
          else t = Wc(b, h, i, e) | 0;
          s = i >> F;
          l = i >> y;
          m = d >> y;
          n = 1 << f;
          if ((f | 0) != 31) {
            o = (b + 7596) | 0;
            p = (b + 7576) | 0;
            q = (b + 5840) | 0;
            k = 0;
            do {
              r = (k + e) | 0;
              H = R(r >> F, D) | 0;
              I = (H + s) | 0;
              g = (E + ((I * 12) | 0)) | 0;
              H = (H + B) | 0;
              h = (E + ((H * 12) | 0)) | 0;
              G = c[o >> 2] | 0;
              j = R(r >> y, z) | 0;
              i = a[(G + (j + l)) >> 0] | 0;
              j = a[(G + (j + m)) >> 0] | 0;
              if (
                (a[(E + ((H * 12) | 0) + 10) >> 0] | 0) != 0
                  ? (a[(E + ((I * 12) | 0) + 10) >> 0] | 0) != 0
                  : 0
              )
                if (!(((j | i) << 24) >> 24)) g = Tb(b, h, g, t) | 0;
                else g = 1;
              else g = 2;
              a[
                ((c[p >> 2] | 0) + (((R(c[q >> 2] | 0, r) | 0) + d) >> 2)) >> 0
              ] = g;
              k = (k + 4) | 0;
            } while ((k | 0) < (n | 0));
          }
        }
      while (0);
      if (!(((F | 0) >= (f | 0)) | C)) {
        n = c[((c[A >> 2] | 0) + 20) >> 2] | 0;
        o = 1 << f;
        p = (o | 0) > 8;
        if (p) {
          i = (b + 7572) | 0;
          j = (b + 5840) | 0;
          g = 8;
          do {
            k = (g + e) | 0;
            l = R((k + -1) >> F, D) | 0;
            m = R(k >> F, D) | 0;
            h = 0;
            do {
              I = (h + d) | 0;
              H = I >> F;
              H =
                (Tb(
                  b,
                  (E + ((((H + m) | 0) * 12) | 0)) | 0,
                  (E + ((((H + l) | 0) * 12) | 0)) | 0,
                  n
                ) |
                  0) &
                255;
              a[
                ((c[i >> 2] | 0) + (((R(c[j >> 2] | 0, k) | 0) + I) >> 2)) >> 0
              ] = H;
              h = (h + 4) | 0;
            } while ((h | 0) < (o | 0));
            g = (g + 8) | 0;
          } while ((g | 0) < (o | 0));
        }
        if ((f | 0) != 31) {
          i = (b + 7576) | 0;
          j = (b + 5840) | 0;
          g = 0;
          do {
            k = (g + e) | 0;
            if (p) {
              l = R(k >> F, D) | 0;
              h = 8;
              do {
                I = (h + d) | 0;
                H =
                  (Tb(
                    b,
                    (E + (((((I >> F) + l) | 0) * 12) | 0)) | 0,
                    (E + ((((((I + -1) >> F) + l) | 0) * 12) | 0)) | 0,
                    n
                  ) |
                    0) &
                  255;
                a[
                  ((c[i >> 2] | 0) + (((R(c[j >> 2] | 0, k) | 0) + I) >> 2)) >>
                    0
                ] = H;
                h = (h + 8) | 0;
              } while ((h | 0) < (o | 0));
            }
            g = (g + 4) | 0;
          } while ((g | 0) < (o | 0));
        }
      }
      return;
    }
    function Tb(d, e, f, g) {
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0;
      l = a[(e + 10) >> 0] | 0;
      m = a[(f + 10) >> 0] | 0;
      n = (m << 24) >> 24 == 3;
      a: do
        if ((l << 24) >> 24 == 3)
          if (n) {
            d = c[((c[(d + 3508) >> 2] | 0) + 20) >> 2] | 0;
            j = c[(d + 64 + (a[(e + 8) >> 0] << 2)) >> 2] | 0;
            k = c[(g + 64 + (a[(f + 8) >> 0] << 2)) >> 2] | 0;
            do
              if ((j | 0) == (k | 0)) {
                i = c[(d + 260 + (a[(e + 9) >> 0] << 2)) >> 2] | 0;
                h = c[(g + 260 + (a[(f + 9) >> 0] << 2)) >> 2] | 0;
                if (!(((j | 0) == (i | 0)) & ((j | 0) == (h | 0)))) {
                  if ((h | 0) != (i | 0)) break;
                  g = ((b[f >> 1] | 0) - (b[e >> 1] | 0)) | 0;
                  if ((((g | 0) > -1 ? g : (0 - g) | 0) | 0) > 3) {
                    h = 1;
                    break a;
                  }
                  g = ((b[(f + 2) >> 1] | 0) - (b[(e + 2) >> 1] | 0)) | 0;
                  if ((((g | 0) > -1 ? g : (0 - g) | 0) | 0) > 3) {
                    h = 1;
                    break a;
                  }
                  g = ((b[(f + 4) >> 1] | 0) - (b[(e + 4) >> 1] | 0)) | 0;
                  if ((((g | 0) > -1 ? g : (0 - g) | 0) | 0) > 3) {
                    h = 1;
                    break a;
                  }
                  f = ((b[(f + 6) >> 1] | 0) - (b[(e + 6) >> 1] | 0)) | 0;
                  return ((((f | 0) > -1 ? f : (0 - f) | 0) | 0) > 3) | 0;
                }
                h = b[f >> 1] | 0;
                i = b[e >> 1] | 0;
                g = (h - i) | 0;
                if (
                  !((
                    (
                      (((g | 0) > -1 ? g : (0 - g) | 0) | 0) <= 3
                        ? ((g =
                            ((b[(f + 2) >> 1] | 0) - (b[(e + 2) >> 1] | 0)) |
                            0),
                          (((g | 0) > -1 ? g : (0 - g) | 0) | 0) <= 3)
                        : 0
                    )
                      ? ((g =
                          ((b[(f + 4) >> 1] | 0) - (b[(e + 4) >> 1] | 0)) | 0),
                        (((g | 0) > -1 ? g : (0 - g) | 0) | 0) <= 3)
                      : 0
                  )
                    ? ((g =
                        ((b[(f + 6) >> 1] | 0) - (b[(e + 6) >> 1] | 0)) | 0),
                      (((g | 0) > -1 ? g : (0 - g) | 0) | 0) <= 3)
                    : 0)
                ) {
                  g = ((b[(f + 4) >> 1] | 0) - i) | 0;
                  if ((((g | 0) > -1 ? g : (0 - g) | 0) | 0) > 3) {
                    h = 1;
                    break a;
                  }
                  g = ((b[(f + 6) >> 1] | 0) - (b[(e + 2) >> 1] | 0)) | 0;
                  if ((((g | 0) > -1 ? g : (0 - g) | 0) | 0) > 3) {
                    h = 1;
                    break a;
                  }
                  g = (h - (b[(e + 4) >> 1] | 0)) | 0;
                  if ((((g | 0) > -1 ? g : (0 - g) | 0) | 0) > 3) {
                    h = 1;
                    break a;
                  }
                  f = ((b[(f + 2) >> 1] | 0) - (b[(e + 6) >> 1] | 0)) | 0;
                  if ((((f | 0) > -1 ? f : (0 - f) | 0) | 0) > 3) {
                    h = 1;
                    break a;
                  }
                }
                h = 0;
                break a;
              } else h = c[(g + 260 + (a[(f + 9) >> 0] << 2)) >> 2] | 0;
            while (0);
            if (
              (
                (
                  (
                    (h | 0) == (j | 0)
                      ? (k | 0) ==
                        (c[(d + 260 + (a[(e + 9) >> 0] << 2)) >> 2] | 0)
                      : 0
                  )
                    ? ((g = ((b[(f + 4) >> 1] | 0) - (b[e >> 1] | 0)) | 0),
                      (((g | 0) > -1 ? g : (0 - g) | 0) | 0) <= 3)
                    : 0
                )
                  ? ((g = ((b[(f + 6) >> 1] | 0) - (b[(e + 2) >> 1] | 0)) | 0),
                    (((g | 0) > -1 ? g : (0 - g) | 0) | 0) <= 3)
                  : 0
              )
                ? ((g = ((b[f >> 1] | 0) - (b[(e + 4) >> 1] | 0)) | 0),
                  (((g | 0) > -1 ? g : (0 - g) | 0) | 0) <= 3)
                : 0
            ) {
              h = ((b[(f + 2) >> 1] | 0) - (b[(e + 6) >> 1] | 0)) | 0;
              h = (((h | 0) > -1 ? h : (0 - h) | 0) | 0) > 3;
            } else h = 1;
          } else h = 1;
        else if (
          (
            !n
              ? ((j = ((l & 1) ^ 1) & 255),
                (i = b[(e + (j << 2) + 2) >> 1] | 0),
                (k = ((m & 1) ^ 1) & 255),
                (h = b[(f + (k << 2) + 2) >> 1] | 0),
                (c[
                  ((c[((c[(d + 3508) >> 2] | 0) + 20) >> 2] | 0) +
                    ((j * 196) | 0) +
                    64 +
                    (a[(e + 8 + j) >> 0] << 2)) >>
                    2
                ] |
                  0) ==
                  (c[
                    (g + ((k * 196) | 0) + 64 + (a[(f + 8 + k) >> 0] << 2)) >> 2
                  ] |
                    0))
              : 0
          )
            ? ((f =
                ((b[(e + (j << 2)) >> 1] | 0) - (b[(f + (k << 2)) >> 1] | 0)) |
                0),
              (((f | 0) > -1 ? f : (0 - f) | 0) | 0) <= 3)
            : 0
        ) {
          h = (((i << 16) >> 16) - ((h << 16) >> 16)) | 0;
          h = (((h | 0) > -1 ? h : (0 - h) | 0) | 0) > 3;
        } else h = 1;
      while (0);
      return (h & 1) | 0;
    }
    function Ub(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0;
      g = (b + 200) | 0;
      j = (((c[((c[g >> 2] | 0) + 13120) >> 2] | 0) - f) | 0) <= (d | 0);
      Vb(b, d, e);
      g = c[g >> 2] | 0;
      if (!(a[(g + 12941) >> 0] | 0)) {
      } else {
        g = (((c[(g + 13124) >> 2] | 0) - f) | 0) <= (e | 0);
        h = (e | 0) != 0;
        i = (d | 0) != 0;
        if (i & h) Wb(b, (d - f) | 0, (e - f) | 0);
        if (i & g) Wb(b, (d - f) | 0, e);
        h & j ? (Wb(b, d, (e - f) | 0), a[(b + 140) >> 0] & 1) : 0;
        j & g ? (Wb(b, d, e), a[(b + 140) >> 0] & 1) : 0;
      }
      return;
    }
    function Vb(e, f, g) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        _ = 0;
      _ = l;
      l = (l + 32) | 0;
      U = (_ + 8) | 0;
      N = _;
      X = (_ + 18) | 0;
      Y = (_ + 16) | 0;
      b[X >> 1] = 0;
      b[Y >> 1] = 0;
      Z = (e + 200) | 0;
      k = c[Z >> 2] | 0;
      h = c[(k + 13080) >> 2] | 0;
      j = 1 << h;
      h = ((R(g >> h, c[(k + 13128) >> 2] | 0) | 0) + (f >> h)) | 0;
      i = c[(e + 3496) >> 2] | 0;
      T = c[(i + (h << 3) + 4) >> 2] | 0;
      M = c[(i + (h << 3)) >> 2] | 0;
      if ((c[(k + 68) >> 2] | 0) != 0 ? (a[(k + 13056) >> 0] | 0) != 0 : 0)
        W = 1;
      else W = (a[((c[(e + 204) >> 2] | 0) + 40) >> 0] | 0) != 0;
      V = (f | 0) != 0;
      if (V) {
        L = (h + -1) | 0;
        O = c[(i + (L << 3) + 4) >> 2] | 0;
        L = c[(i + (L << 3)) >> 2] | 0;
      } else {
        O = 0;
        L = 0;
      }
      K = (j + f) | 0;
      Q = c[(k + 13120) >> 2] | 0;
      S = (K | 0) > (Q | 0) ? Q : K;
      P = (j + g) | 0;
      J = c[(k + 13124) >> 2] | 0;
      P = (P | 0) > (J | 0) ? J : P;
      K = (Q | 0) <= (K | 0) ? S : (S + -8) | 0;
      Q = (P | 0) > (g | 0);
      if (Q) {
        w = V ? f : 8;
        x = (w | 0) < (S | 0);
        y = V ? (f + -8) | 0 : 0;
        z = (e + 7572) | 0;
        A = (e + 5840) | 0;
        B = (N + 4) | 0;
        C = (e + 160) | 0;
        D = (X + 1) | 0;
        E = (Y + 1) | 0;
        F = (e + 7544) | 0;
        G = (e + 7528) | 0;
        H = (e + 7576) | 0;
        I = (e + 7548) | 0;
        J = (e + 7532) | 0;
        v = (y | 0) >= (K | 0);
        u = g;
        i = T;
        h = M;
        do {
          if (x) {
            q = (u + 4) | 0;
            r = (i + -2) & -2;
            p = w;
            do {
              m = c[H >> 2] | 0;
              t = c[A >> 2] | 0;
              j = a[(m + (((R(t, u) | 0) + p) >> 2)) >> 0] | 0;
              k = j & 255;
              t = a[(m + (((R(t, q) | 0) + p) >> 2)) >> 0] | 0;
              m = t & 255;
              n = (t << 24) >> 24 == 0;
              do
                if (((t | j) << 24) >> 24) {
                  s = (p + -1) | 0;
                  o = ac(e, s, u) | 0;
                  o = (o + 1 + (ac(e, p, u) | 0)) >> 1;
                  t = (o + h) | 0;
                  t =
                    d[(1597 + ((t | 0) < 0 ? 0 : (t | 0) < 51 ? t : 51)) >> 0] |
                    0;
                  if (!((j << 24) >> 24)) j = 0;
                  else {
                    j = (r + (k << 1) + o) | 0;
                    j =
                      d[
                        (1649 + ((j | 0) < 0 ? 0 : (j | 0) < 53 ? j : 53)) >> 0
                      ] | 0;
                  }
                  c[N >> 2] = j;
                  if (n) j = 0;
                  else {
                    j = (r + (m << 1) + o) | 0;
                    j =
                      d[
                        (1649 + ((j | 0) < 0 ? 0 : (j | 0) < 53 ? j : 53)) >> 0
                      ] | 0;
                  }
                  c[B >> 2] = j;
                  o = c[C >> 2] | 0;
                  j = c[(o + 32) >> 2] | 0;
                  k = R(j, u) | 0;
                  k =
                    ((c[o >> 2] | 0) +
                      ((p << c[((c[Z >> 2] | 0) + 56) >> 2]) + k)) |
                    0;
                  if (W) {
                    a[X >> 0] = bc(e, s, u) | 0;
                    a[D >> 0] = bc(e, s, q) | 0;
                    a[Y >> 0] = bc(e, p, u) | 0;
                    a[E >> 0] = bc(e, p, q) | 0;
                    Ga[c[I >> 2] & 3](k, j, t, N, X, Y);
                    break;
                  } else {
                    Ga[c[J >> 2] & 3](k, j, t, N, X, Y);
                    break;
                  }
                }
              while (0);
              p = (p + 8) | 0;
            } while ((p | 0) < (S | 0));
          }
          if (!(((u | 0) == 0) | v)) {
            s = (u + -1) | 0;
            r = y;
            do {
              n = c[z >> 2] | 0;
              t = R(c[A >> 2] | 0, u) | 0;
              j = a[(n + ((t + r) >> 2)) >> 0] | 0;
              m = j & 255;
              q = (r + 4) | 0;
              t = a[(n + ((t + q) >> 2)) >> 0] | 0;
              n = t & 255;
              o = (t << 24) >> 24 == 0;
              do
                if (((t | j) << 24) >> 24) {
                  k = ac(e, r, s) | 0;
                  k = (k + 1 + (ac(e, r, u) | 0)) >> 1;
                  h = (r | 0) >= (f | 0);
                  i = h ? T : O;
                  h = h ? M : L;
                  p = (k + h) | 0;
                  p =
                    d[(1597 + ((p | 0) < 0 ? 0 : (p | 0) < 51 ? p : 51)) >> 0] |
                    0;
                  if (!((j << 24) >> 24)) j = 0;
                  else {
                    j = (((i + -2) & -2) + (m << 1) + k) | 0;
                    j =
                      d[
                        (1649 + ((j | 0) < 0 ? 0 : (j | 0) < 53 ? j : 53)) >> 0
                      ] | 0;
                  }
                  c[N >> 2] = j;
                  if (o) j = 0;
                  else {
                    j = (((i + -2) & -2) + (n << 1) + k) | 0;
                    j =
                      d[
                        (1649 + ((j | 0) < 0 ? 0 : (j | 0) < 53 ? j : 53)) >> 0
                      ] | 0;
                  }
                  c[B >> 2] = j;
                  t = c[C >> 2] | 0;
                  j = c[(t + 32) >> 2] | 0;
                  k = R(j, u) | 0;
                  k =
                    ((c[t >> 2] | 0) +
                      ((r << c[((c[Z >> 2] | 0) + 56) >> 2]) + k)) |
                    0;
                  if (W) {
                    a[X >> 0] = bc(e, r, s) | 0;
                    a[D >> 0] = bc(e, q, s) | 0;
                    a[Y >> 0] = bc(e, r, u) | 0;
                    a[E >> 0] = bc(e, q, u) | 0;
                    Ga[c[F >> 2] & 3](k, j, p, N, X, Y);
                    break;
                  } else {
                    Ga[c[G >> 2] & 3](k, j, p, N, X, Y);
                    break;
                  }
                }
              while (0);
              r = (r + 8) | 0;
            } while ((r | 0) < (K | 0));
          }
          u = (u + 8) | 0;
        } while ((u | 0) < (P | 0));
        k = c[Z >> 2] | 0;
      } else i = T;
      a: do
        if (c[(k + 4) >> 2] | 0) {
          z = V ? O : T;
          A = (e + 7572) | 0;
          B = (e + 5840) | 0;
          C = (U + 4) | 0;
          D = (e + 160) | 0;
          E = (X + 1) | 0;
          F = (Y + 1) | 0;
          G = (e + 7552) | 0;
          H = (e + 7536) | 0;
          I = (e + 7576) | 0;
          J = (e + 7556) | 0;
          K = (e + 7540) | 0;
          h = 1;
          while (1) {
            j = 1 << c[(k + 13168 + (h << 2)) >> 2];
            k = 1 << c[(k + 13180 + (h << 2)) >> 2];
            if (Q) {
              u = j << 3;
              v = V ? f : u;
              w = (v | 0) < (S | 0);
              x = k << 3;
              y = V ? (f - u) | 0 : 0;
              t = j << 2;
              s = k << 2;
              r = g;
              do {
                if (w) {
                  o = (r + s) | 0;
                  n = v;
                  do {
                    O = c[I >> 2] | 0;
                    k = c[B >> 2] | 0;
                    j = a[(O + (((R(k, r) | 0) + n) >> 2)) >> 0] | 0;
                    j = (j << 24) >> 24 == 2;
                    k = (a[(O + (((R(k, o) | 0) + n) >> 2)) >> 0] | 0) == 2;
                    do
                      if (j | k) {
                        p = (n + -1) | 0;
                        m = ac(e, p, o) | 0;
                        m = (m + 1 + (ac(e, n, o) | 0)) >> 1;
                        if (j) {
                          j = ac(e, p, r) | 0;
                          j = cc(e, (j + 1 + (ac(e, n, r) | 0)) >> 1, h, i) | 0;
                        } else j = 0;
                        c[U >> 2] = j;
                        if (k) j = cc(e, m, h, i) | 0;
                        else j = 0;
                        c[C >> 2] = j;
                        N = c[D >> 2] | 0;
                        O = c[Z >> 2] | 0;
                        j = c[(N + 32 + (h << 2)) >> 2] | 0;
                        k = R(r >> c[(O + 13180 + (h << 2)) >> 2], j) | 0;
                        k =
                          ((c[(N + (h << 2)) >> 2] | 0) +
                            (((n >> c[(O + 13168 + (h << 2)) >> 2]) <<
                              c[(O + 56) >> 2]) +
                              k)) |
                          0;
                        if (W) {
                          a[X >> 0] = bc(e, p, r) | 0;
                          a[E >> 0] = bc(e, p, o) | 0;
                          a[Y >> 0] = bc(e, n, r) | 0;
                          a[F >> 0] = bc(e, n, o) | 0;
                          wa[c[J >> 2] & 3](k, j, U, X, Y);
                          break;
                        } else {
                          wa[c[K >> 2] & 3](k, j, U, X, Y);
                          break;
                        }
                      }
                    while (0);
                    n = (n + u) | 0;
                  } while ((n | 0) < (S | 0));
                }
                if (r) {
                  n =
                    (S -
                      ((S | 0) == (c[((c[Z >> 2] | 0) + 13120) >> 2] | 0)
                        ? 0
                        : u)) |
                    0;
                  if ((y | 0) < (n | 0)) {
                    p = (r + -1) | 0;
                    o = y;
                    do {
                      O = c[A >> 2] | 0;
                      k = R(c[B >> 2] | 0, r) | 0;
                      q = (o + t) | 0;
                      i = (a[(O + ((k + o) >> 2)) >> 0] | 0) == 2;
                      k = (a[(O + ((k + q) >> 2)) >> 0] | 0) == 2;
                      do
                        if (i | k) {
                          if (i) {
                            j = ac(e, o, p) | 0;
                            j = (j + 1 + (ac(e, o, r) | 0)) >> 1;
                          } else j = 0;
                          if (k) {
                            m = ac(e, q, p) | 0;
                            m = (m + 1 + (ac(e, q, r) | 0)) >> 1;
                          } else m = 0;
                          if (i) i = cc(e, j, h, z) | 0;
                          else i = 0;
                          c[U >> 2] = i;
                          if (k) i = cc(e, m, h, T) | 0;
                          else i = 0;
                          c[C >> 2] = i;
                          N = c[D >> 2] | 0;
                          O = c[Z >> 2] | 0;
                          i = c[(N + 32 + (h << 2)) >> 2] | 0;
                          j = R(r >> c[(O + 13184) >> 2], i) | 0;
                          j =
                            ((c[(N + (h << 2)) >> 2] | 0) +
                              (((o >> c[(O + 13172) >> 2]) <<
                                c[(O + 56) >> 2]) +
                                j)) |
                            0;
                          if (W) {
                            a[X >> 0] = bc(e, o, p) | 0;
                            a[E >> 0] = bc(e, q, p) | 0;
                            a[Y >> 0] = bc(e, o, r) | 0;
                            a[F >> 0] = bc(e, q, r) | 0;
                            wa[c[G >> 2] & 3](j, i, U, X, Y);
                            break;
                          } else {
                            wa[c[H >> 2] & 3](j, i, U, X, Y);
                            break;
                          }
                        }
                      while (0);
                      o = (o + u) | 0;
                    } while ((o | 0) < (n | 0));
                    i = z;
                  } else i = z;
                }
                r = (r + x) | 0;
              } while ((r | 0) < (P | 0));
            }
            h = (h + 1) | 0;
            if ((h | 0) == 3) break a;
            k = c[Z >> 2] | 0;
          }
        }
      while (0);
      l = _;
      return;
    }
    function Wb(d, e, f) {
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        _ = 0,
        $ = 0,
        aa = 0,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0,
        fa = 0,
        ga = 0;
      ga = l;
      l = (l + 48) | 0;
      Z = (ga + 16) | 0;
      _ = (ga + 34) | 0;
      ba = (ga + 32) | 0;
      da = (ga + 8) | 0;
      ea = ga;
      fa = (d + 200) | 0;
      x = c[fa >> 2] | 0;
      y = c[(x + 13080) >> 2] | 0;
      T = e >> y;
      U = f >> y;
      s = c[(x + 13128) >> 2] | 0;
      i = R(U, s) | 0;
      V = (i + T) | 0;
      k = c[(d + 204) >> 2] | 0;
      m = c[(k + 1668) >> 2] | 0;
      n = c[(m + (V << 2)) >> 2] | 0;
      W = (d + 3492) | 0;
      X = c[W >> 2] | 0;
      Y = (X + ((V * 148) | 0)) | 0;
      b[_ >> 1] = 0;
      b[ba >> 1] = 0;
      c[da >> 2] = 0;
      if (!(a[(k + 42) >> 0] | 0)) o = 0;
      else o = (a[(k + 53) >> 0] | 0) == 0;
      t = (a[((c[(d + 7604) >> 2] | 0) + V) >> 0] | 0) == 0;
      w = t | o;
      u = (T | 0) == 0;
      c[Z >> 2] = u & 1;
      q = (U | 0) == 0;
      $ = (Z + 4) | 0;
      c[$ >> 2] = q & 1;
      r = (T | 0) == ((s + -1) | 0);
      aa = (Z + 8) | 0;
      c[aa >> 2] = r & 1;
      v = (U | 0) == (((c[(x + 13132) >> 2] | 0) + -1) | 0);
      ca = (Z + 12) | 0;
      c[ca >> 2] = v & 1;
      if (w) {
        if (u) p = 0;
        else {
          if (o) {
            g = c[(k + 1676) >> 2] | 0;
            g =
              (c[(g + (n << 2)) >> 2] | 0) !=
              (c[(g + (c[(m + ((V + -1) << 2)) >> 2] << 2)) >> 2] | 0);
          } else g = 0;
          h = g & 1;
          if (
            t
              ? ((Q = c[(d + 7580) >> 2] | 0),
                (c[(Q + (V << 2)) >> 2] | 0) !=
                  (c[(Q + ((T + -1 + i) << 2)) >> 2] | 0))
              : 0
          )
            g = 1;
          a[_ >> 0] = g & 1;
          p = h;
        }
        if (r) j = 0;
        else {
          if (o) {
            g = c[(k + 1676) >> 2] | 0;
            g =
              (c[(g + (n << 2)) >> 2] | 0) !=
              (c[(g + (c[(m + ((V + 1) << 2)) >> 2] << 2)) >> 2] | 0);
          } else g = 0;
          h = g & 1;
          if (
            t
              ? ((Q = c[(d + 7580) >> 2] | 0),
                (c[(Q + (V << 2)) >> 2] | 0) !=
                  (c[(Q + ((T + 1 + i) << 2)) >> 2] | 0))
              : 0
          )
            g = 1;
          a[(_ + 1) >> 0] = g & 1;
          j = h;
        }
        if (q) h = 0;
        else {
          if (o) {
            g = c[(k + 1676) >> 2] | 0;
            g =
              (c[(g + (n << 2)) >> 2] | 0) !=
              (c[(g + (c[(m + ((V - s) << 2)) >> 2] << 2)) >> 2] | 0);
          } else g = 0;
          h = g & 1;
          if (
            t
              ? ((Q = c[(d + 7580) >> 2] | 0),
                (c[(Q + (V << 2)) >> 2] | 0) !=
                  (c[(Q + (((R(s, (U + -1) | 0) | 0) + T) << 2)) >> 2] | 0))
              : 0
          )
            g = 1;
          a[ba >> 0] = g & 1;
        }
        if (v) g = 0;
        else {
          if (o) {
            i = c[(k + 1676) >> 2] | 0;
            i =
              (c[(i + (n << 2)) >> 2] | 0) !=
              (c[(i + (c[(m + ((s + V) << 2)) >> 2] << 2)) >> 2] | 0);
          } else i = 0;
          g = i & 1;
          if (
            t
              ? ((Q = c[(d + 7580) >> 2] | 0),
                (c[(Q + (V << 2)) >> 2] | 0) !=
                  (c[(Q + (((R(s, (U + 1) | 0) | 0) + T) << 2)) >> 2] | 0))
              : 0
          )
            i = 1;
          a[(ba + 1) >> 0] = i & 1;
        }
        if (!(q | u)) {
          if (t) {
            Q = c[(d + 7580) >> 2] | 0;
            if (
              (p << 24) >> 24 == 0
                ? (c[(Q + (V << 2)) >> 2] | 0) ==
                  (c[(Q + ((T + -1 + (R(s, (U + -1) | 0) | 0)) << 2)) >> 2] | 0)
                : 0
            )
              S = 36;
            else i = 1;
          } else if (!((p << 24) >> 24)) S = 36;
          else i = 1;
          if ((S | 0) == 36) i = h;
          a[da >> 0] = i;
        }
        if (!(r | q)) {
          if (t) {
            Q = c[(d + 7580) >> 2] | 0;
            if (
              (j << 24) >> 24 == 0
                ? (c[(Q + (V << 2)) >> 2] | 0) ==
                  (c[(Q + ((T + 1 + (R(s, (U + -1) | 0) | 0)) << 2)) >> 2] | 0)
                : 0
            )
              S = 42;
            else h = 1;
          } else if (!((j << 24) >> 24)) S = 42;
          else h = 1;
          a[(da + 1) >> 0] = h;
        }
        if (!(v | r)) {
          if (t) {
            Q = c[(d + 7580) >> 2] | 0;
            if (
              (j << 24) >> 24 == 0
                ? (c[(Q + (V << 2)) >> 2] | 0) ==
                  (c[(Q + ((T + 1 + (R(s, (U + 1) | 0) | 0)) << 2)) >> 2] | 0)
                : 0
            )
              S = 48;
            else h = 1;
          } else if (!((j << 24) >> 24)) S = 48;
          else h = 1;
          if ((S | 0) == 48) h = g;
          a[(da + 2) >> 0] = h;
        }
        if (!(v | u)) {
          if (t) {
            Q = c[(d + 7580) >> 2] | 0;
            if (
              (p << 24) >> 24 == 0
                ? (c[(Q + (V << 2)) >> 2] | 0) ==
                  (c[(Q + ((T + -1 + (R(s, (U + 1) | 0) | 0)) << 2)) >> 2] | 0)
                : 0
            )
              S = 54;
            else g = 1;
          } else if (!((p << 24) >> 24)) S = 54;
          else g = 1;
          a[(da + 3) >> 0] = g;
        }
      }
      D = c[(x + 4) >> 2] | 0 ? 3 : 1;
      E = (d + 160) | 0;
      F = (d + 168) | 0;
      G = (d + 5916) | 0;
      M = U << 1;
      H = (M + -1) | 0;
      I = (ea + 4) | 0;
      J = (U + -1) | 0;
      K = (T + 1) | 0;
      L = (T + -1) | 0;
      M = (M + 2) | 0;
      N = (ea + 4) | 0;
      O = (U + 1) | 0;
      Q = T << 1;
      P = (Q + -1) | 0;
      Q = (Q + 2) | 0;
      C = (d + 5920 + ((w & 1) << 2)) | 0;
      g = 0;
      i = x;
      h = y;
      while (1) {
        n = c[(i + 13168 + (g << 2)) >> 2] | 0;
        z = e >> n;
        q = c[(i + 13180 + (g << 2)) >> 2] | 0;
        A = f >> q;
        r = c[E >> 2] | 0;
        B = c[(r + 32 + (g << 2)) >> 2] | 0;
        w = 1 << h;
        s = w >> n;
        t = w >> q;
        n = c[(i + 13120) >> 2] >> n;
        v = (n - z) | 0;
        s = (s | 0) > (v | 0) ? v : s;
        q = c[(i + 13124) >> 2] >> q;
        v = (q - A) | 0;
        t = (t | 0) > (v | 0) ? v : t;
        v = R(B, A) | 0;
        u = c[(i + 56) >> 2] | 0;
        v = ((c[(r + (g << 2)) >> 2] | 0) + ((z << u) + v)) | 0;
        w = (w + 2) << u;
        r = 1 << u;
        x = ((c[F >> 2] | 0) + w + r) | 0;
        y = (X + ((V * 148) | 0) + 142 + g) | 0;
        switch (a[y >> 0] | 0) {
          case 1: {
            Xb(x, v, s << u, t, w, B);
            Yb(d, v, B, z, A, s, t, g, T, U);
            Aa[c[G >> 2] & 1](v, x, B, w, Y, Z, s, t, g);
            Zb(d, v, x, B, w, e, f, s, t, g);
            S = 78;
            break;
          }
          case 2: {
            o = c[Z >> 2] | 0;
            p = c[aa >> 2] | 0;
            k = c[ca >> 2] | 0;
            if (!(c[$ >> 2] | 0)) {
              S = (1 - o) | 0;
              j = (0 - (S << u)) | 0;
              m = (x + (0 - w) + j) | 0;
              c[ea >> 2] = v + (0 - B) + j;
              c[I >> 2] =
                (c[(d + 172 + (g << 2)) >> 2] | 0) +
                (((R(n, H) | 0) + z - S) << u);
              if (!S) {
                j = 0;
                h = i;
              } else {
                _b(
                  m,
                  c[
                    (ea +
                      ((((a[
                        ((c[W >> 2] | 0) +
                          ((((L + (R(c[(i + 13128) >> 2] | 0, J) | 0)) | 0) *
                            148) |
                            0) +
                          142 +
                          g) >>
                          0
                      ] |
                        0) ==
                        3) &
                        1) <<
                        2)) >>
                      2
                  ] | 0,
                  u
                );
                j = r;
                h = c[fa >> 2] | 0;
              }
              i = s << u;
              fh(
                (m + j) | 0,
                ((c[
                  (ea +
                    ((((a[
                      ((c[W >> 2] | 0) +
                        (((((R(c[(h + 13128) >> 2] | 0, J) | 0) + T) | 0) *
                          148) |
                          0) +
                        142 +
                        g) >>
                        0
                    ] |
                      0) ==
                      3) &
                      1) <<
                      2)) >>
                    2
                ] |
                  0) +
                  j) |
                  0,
                i | 0
              ) | 0;
              if ((p | 0) != 1) {
                S = (j + i) | 0;
                _b(
                  (m + S) | 0,
                  ((c[
                    (ea +
                      ((((a[
                        ((c[W >> 2] | 0) +
                          ((((K +
                            (R(c[((c[fa >> 2] | 0) + 13128) >> 2] | 0, J) |
                              0)) |
                            0) *
                            148) |
                            0) +
                          142 +
                          g) >>
                          0
                      ] |
                        0) ==
                        3) &
                        1) <<
                        2)) >>
                      2
                  ] |
                    0) +
                    S) |
                    0,
                  u
                );
              }
            }
            if (!k) {
              S = (1 - o) | 0;
              m = (0 - (S << u)) | 0;
              j = (x + (R(t, w) | 0) + m) | 0;
              c[ea >> 2] = v + (R(t, B) | 0) + m;
              c[N >> 2] =
                (c[(d + 172 + (g << 2)) >> 2] | 0) +
                (((R(n, M) | 0) + z - S) << u);
              if (!S) h = 0;
              else {
                _b(
                  j,
                  c[
                    (ea +
                      ((((a[
                        ((c[W >> 2] | 0) +
                          ((((L +
                            (R(c[((c[fa >> 2] | 0) + 13128) >> 2] | 0, O) |
                              0)) |
                            0) *
                            148) |
                            0) +
                          142 +
                          g) >>
                          0
                      ] |
                        0) ==
                        3) &
                        1) <<
                        2)) >>
                      2
                  ] | 0,
                  u
                );
                h = r;
              }
              i = s << u;
              fh(
                (j + h) | 0,
                ((c[
                  (ea +
                    ((((a[
                      ((c[W >> 2] | 0) +
                        (((((R(c[((c[fa >> 2] | 0) + 13128) >> 2] | 0, O) | 0) +
                          T) |
                          0) *
                          148) |
                          0) +
                        142 +
                        g) >>
                        0
                    ] |
                      0) ==
                      3) &
                      1) <<
                      2)) >>
                    2
                ] |
                  0) +
                  h) |
                  0,
                i | 0
              ) | 0;
              if ((p | 0) != 1) {
                S = (h + i) | 0;
                _b(
                  (j + S) | 0,
                  ((c[
                    (ea +
                      ((((a[
                        ((c[W >> 2] | 0) +
                          ((((K +
                            (R(c[((c[fa >> 2] | 0) + 13128) >> 2] | 0, O) |
                              0)) |
                            0) *
                            148) |
                            0) +
                          142 +
                          g) >>
                          0
                      ] |
                        0) ==
                        3) &
                        1) <<
                        2)) >>
                      2
                  ] |
                    0) +
                    S) |
                    0,
                  u
                );
              }
            }
            if (!o)
              if (
                (a[
                  ((c[W >> 2] | 0) +
                    ((((L +
                      (R(c[((c[fa >> 2] | 0) + 13128) >> 2] | 0, U) | 0)) |
                      0) *
                      148) |
                      0) +
                    142 +
                    g) >>
                    0
                ] |
                  0) ==
                3
              ) {
                i = ((R(q, P) | 0) + A) << u;
                $b(
                  (x + (0 - r)) | 0,
                  ((c[(d + 184 + (g << 2)) >> 2] | 0) + i) | 0,
                  u,
                  t,
                  w,
                  r
                );
                i = 0;
              } else i = 1;
            else i = 0;
            if (!p)
              if (
                (a[
                  ((c[W >> 2] | 0) +
                    ((((K +
                      (R(c[((c[fa >> 2] | 0) + 13128) >> 2] | 0, U) | 0)) |
                      0) *
                      148) |
                      0) +
                    142 +
                    g) >>
                    0
                ] |
                  0) ==
                3
              ) {
                h = ((R(q, Q) | 0) + A) << u;
                $b(
                  (x + (s << u)) | 0,
                  ((c[(d + 184 + (g << 2)) >> 2] | 0) + h) | 0,
                  u,
                  t,
                  w,
                  r
                );
                h = 0;
              } else h = 1;
            else h = 0;
            S = (0 - (i << u)) | 0;
            Xb((x + S) | 0, (v + S) | 0, (i + s + h) << u, t, w, B);
            Yb(d, v, B, z, A, s, t, g, T, U);
            Ba[c[C >> 2] & 3](v, x, B, w, Y, Z, s, t, g, _, ba, da);
            Zb(d, v, x, B, w, e, f, s, t, g);
            S = 78;
            break;
          }
          default: {
          }
        }
        if ((S | 0) == 78) {
          S = 0;
          a[y >> 0] = 3;
        }
        g = (g + 1) | 0;
        if ((g | 0) >= (D | 0)) break;
        h = c[fa >> 2] | 0;
        i = h;
        h = c[(h + 13080) >> 2] | 0;
      }
      l = ga;
      return;
    }
    function Xb(a, b, c, d, e, f) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0;
      if ((d | 0) > 0) {
        g = 0;
        while (1) {
          fh(a | 0, b | 0, c | 0) | 0;
          g = (g + 1) | 0;
          if ((g | 0) == (d | 0)) break;
          else {
            a = (a + e) | 0;
            b = (b + f) | 0;
          }
        }
      }
      return;
    }
    function Yb(a, b, d, e, f, g, h, i, j, k) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
      m = c[(a + 200) >> 2] | 0;
      l = c[(m + 56) >> 2] | 0;
      o = c[(m + 13120) >> 2] >> c[(m + 13168 + (i << 2)) >> 2];
      m = c[(m + 13124) >> 2] >> c[(m + 13180 + (i << 2)) >> 2];
      p = (a + 172 + (i << 2)) | 0;
      n = k << 1;
      k = g << l;
      fh(((c[p >> 2] | 0) + (((R(o, n) | 0) + e) << l)) | 0, b | 0, k | 0) | 0;
      fh(
        ((c[p >> 2] | 0) + (((R(o, n | 1) | 0) + e) << l)) | 0,
        (b + (R((h + -1) | 0, d) | 0)) | 0,
        k | 0
      ) | 0;
      i = (a + 184 + (i << 2)) | 0;
      j = j << 1;
      k = 1 << l;
      $b(((c[i >> 2] | 0) + (((R(m, j) | 0) + f) << l)) | 0, b, l, h, k, d);
      $b(
        ((c[i >> 2] | 0) + (((R(m, j | 1) | 0) + f) << l)) | 0,
        (b + ((g + -1) << l)) | 0,
        l,
        h,
        k,
        d
      );
      return;
    }
    function Zb(b, d, e, f, g, h, i, j, k, l) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      var m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0;
      t = (b + 200) | 0;
      m = c[t >> 2] | 0;
      if (!(a[((c[(b + 204) >> 2] | 0) + 40) >> 0] | 0)) {
        if (a[(m + 13056) >> 0] | 0 ? c[(m + 68) >> 2] | 0 : 0) n = 4;
      } else n = 4;
      if (
        (n | 0) == 4
          ? ((y = c[(m + 13084) >> 2] | 0),
            (o = 1 << y),
            (u = c[(m + 13168 + (l << 2)) >> 2] | 0),
            (v = c[(m + 13180 + (l << 2)) >> 2] | 0),
            (w = h >> y),
            (p = i >> y),
            (x = (j + h) >> y),
            (y = (k + i) >> y),
            (z = (o >> u) << c[(m + 56) >> 2]),
            (p | 0) < (y | 0))
          : 0
      ) {
        s = (w | 0) < (x | 0);
        r = (b + 7600) | 0;
        o = o >> v;
        q = (o | 0) > 0;
        n = p;
        do {
          if (s) {
            b = (n - i) | 0;
            l = w;
            do {
              m = c[t >> 2] | 0;
              if (
                a[
                  ((c[r >> 2] | 0) +
                    ((R(c[(m + 13156) >> 2] | 0, n) | 0) + l)) >>
                    0
                ] | 0
                  ? ((B = c[(m + 13084) >> 2] | 0),
                    (A = (b << B) >> v),
                    (B = (((l - h) << B) >> u) << c[(m + 56) >> 2]),
                    q)
                  : 0
              ) {
                m = (d + (R(A, f) | 0) + B) | 0;
                j = 0;
                k = (e + (R(A, g) | 0) + B) | 0;
                while (1) {
                  fh(m | 0, k | 0, z | 0) | 0;
                  j = (j + 1) | 0;
                  if ((j | 0) == (o | 0)) break;
                  else {
                    m = (m + f) | 0;
                    k = (k + g) | 0;
                  }
                }
              }
              l = (l + 1) | 0;
            } while ((l | 0) != (x | 0));
          }
          n = (n + 1) | 0;
        } while ((n | 0) != (y | 0));
      }
      return;
    }
    function _b(c, d, e) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      if (!e) a[c >> 0] = a[d >> 0] | 0;
      else b[c >> 1] = b[d >> 1] | 0;
      return;
    }
    function $b(c, d, e, f, g, h) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0;
      i = (f | 0) > 0;
      if (!e) {
        if (i) {
          e = 0;
          while (1) {
            a[c >> 0] = a[d >> 0] | 0;
            e = (e + 1) | 0;
            if ((e | 0) == (f | 0)) break;
            else {
              c = (c + g) | 0;
              d = (d + h) | 0;
            }
          }
        }
      } else if (i) {
        e = 0;
        while (1) {
          b[c >> 1] = b[d >> 1] | 0;
          e = (e + 1) | 0;
          if ((e | 0) == (f | 0)) break;
          else {
            c = (c + g) | 0;
            d = (d + h) | 0;
          }
        }
      }
      return;
    }
    function ac(b, d, e) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0;
      g = c[(b + 200) >> 2] | 0;
      f = c[(g + 13064) >> 2] | 0;
      return (
        a[
          ((c[(b + 7568) >> 2] | 0) +
            ((R(c[(g + 13140) >> 2] | 0, e >> f) | 0) + (d >> f))) >>
            0
        ] | 0
      );
    }
    function bc(a, b, e) {
      a = a | 0;
      b = b | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
      h = c[(a + 200) >> 2] | 0;
      i = c[(h + 13084) >> 2] | 0;
      if (
        (
          (e | b | 0) >= 0
            ? ((j = b >> i),
              (f = e >> i),
              (g = c[(h + 13156) >> 2] | 0),
              (j | 0) < (g | 0))
            : 0
        )
          ? (f | 0) < (c[(h + 13160) >> 2] | 0)
          : 0
      ) {
        j = ((R(g, f) | 0) + j) | 0;
        a = d[((c[(a + 7600) >> 2] | 0) + j) >> 0] | 0;
      } else a = 2;
      return a | 0;
    }
    function cc(a, b, e, f) {
      a = a | 0;
      b = b | 0;
      e = e | 0;
      f = f | 0;
      var g = 0;
      g = c[(a + 204) >> 2] | 0;
      b = ((c[((e | 0) == 1 ? (g + 28) | 0 : (g + 32) | 0) >> 2] | 0) + b) | 0;
      b = (b | 0) < 0 ? 0 : (b | 0) < 57 ? b : 57;
      do
        if ((c[((c[(a + 200) >> 2] | 0) + 4) >> 2] | 0) == 1) {
          if ((b | 0) >= 30)
            if ((b | 0) > 43) {
              b = (b + -6) | 0;
              break;
            } else {
              b = d[(1703 + (b + -30)) >> 0] | 0;
              break;
            }
        } else b = (b | 0) < 0 ? 0 : (b | 0) < 51 ? b : 51;
      while (0);
      g = (f + 2 + b) | 0;
      return d[(1649 + ((g | 0) < 0 ? 0 : (g | 0) < 53 ? g : 53)) >> 0] | 0 | 0;
    }
    function dc(a, b, d, e) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0;
      f = c[(a + 200) >> 2] | 0;
      i = (((c[(f + 13120) >> 2] | 0) - e) | 0) <= (b | 0);
      f = (((c[(f + 13124) >> 2] | 0) - e) | 0) <= (d | 0);
      g = (d | 0) != 0;
      h = (b | 0) != 0;
      if (h & g) Ub(a, (b - e) | 0, (d - e) | 0, e);
      if (g & i) Ub(a, b, (d - e) | 0, e);
      if (h & f) Ub(a, (b - e) | 0, d, e);
      return;
    }
    function ec(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0;
      f = c[(b + 60) >> 2] | 0;
      Re();
      kd();
      d = Qc(b) | 0;
      if ((d | 0) >= 0) {
        c[(f + 7620) >> 2] = 0;
        c[(f + 7772) >> 2] = 0;
        e = c[(b + 808) >> 2] | 0;
        if (!(e & 2)) d = 1;
        else d = c[(b + 800) >> 2] & 255;
        a[(f + 141) >> 0] = d;
        if (((e & 1) | 0) != 0 ? (c[(b + 800) >> 2] | 0) > 1 : 0) d = 1;
        else d = 2;
        a[(f + 140) >> 0] = d;
        d = 0;
      }
      return d | 0;
    }
    function fc(a, d, f, g) {
      a = a | 0;
      d = d | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0;
      h = c[(a + 60) >> 2] | 0;
      j = (g + 28) | 0;
      a = c[j >> 2] | 0;
      if (!a) {
        a = $c(h, d, 1) | 0;
        if ((a | 0) >= 0) {
          c[f >> 2] = a;
          a = 0;
        }
      } else {
        c[(h + 3508) >> 2] = 0;
        i = (h + 7776) | 0;
        b[i >> 1] = 1;
        a = jc(h, c[(g + 24) >> 2] | 0, a) | 0;
        if ((a | 0) >= 0) {
          a = (h + 5848) | 0;
          if (c[a >> 2] | 0) c[a >> 2] = 0;
          a = c[(h + 164) >> 2] | 0;
          if (c[(a + 304) >> 2] | 0) {
            h = (a + 128) | 0;
            c[h >> 2] = e[i >> 1];
            c[(h + 4) >> 2] = 0;
            Qf(d, a);
            c[f >> 2] = 1;
          }
          a = c[j >> 2] | 0;
        }
      }
      return a | 0;
    }
    function gc(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
      g = c[(b + 60) >> 2] | 0;
      ic(g);
      h = (g + 7664) | 0;
      d = (g + 7644) | 0;
      if ((c[h >> 2] | 0) > 0) {
        b = 0;
        do {
          hf(((c[d >> 2] | 0) + (b << 2)) | 0);
          b = (b + 1) | 0;
        } while ((b | 0) < (c[h >> 2] | 0));
      }
      hf((g + 7648) | 0);
      hf((g + 7640) | 0);
      hf(d);
      hf((g + 152) | 0);
      hf((g + 168) | 0);
      b = 0;
      do {
        hf((g + 172 + (b << 2)) | 0);
        hf((g + 184 + (b << 2)) | 0);
        b = (b + 1) | 0;
      } while ((b | 0) != 3);
      Of((g + 164) | 0);
      b = 0;
      do {
        f = (g + 3512 + ((b * 72) | 0)) | 0;
        Vc(g, f, -1);
        Of(f);
        b = (b + 1) | 0;
      } while ((b | 0) != 32);
      b = 0;
      do {
        wf((g + 208 + (b << 2)) | 0);
        b = (b + 1) | 0;
      } while ((b | 0) != 16);
      b = 0;
      do {
        wf((g + 272 + (b << 2)) | 0);
        b = (b + 1) | 0;
      } while ((b | 0) != 32);
      b = 0;
      do {
        wf((g + 400 + (b << 2)) | 0);
        b = (b + 1) | 0;
      } while ((b | 0) != 256);
      c[(g + 200) >> 2] = 0;
      c[(g + 204) >> 2] = 0;
      c[(g + 196) >> 2] = 0;
      wf((g + 1424) | 0);
      hf((g + 3084) | 0);
      hf((g + 3088) | 0);
      hf((g + 3092) | 0);
      f = (g + 141) | 0;
      b = a[f >> 0] | 0;
      if ((b & 255) > 1) {
        e = 1;
        do {
          d = (g + 72 + (e << 2)) | 0;
          if (c[d >> 2] | 0) {
            hf(d);
            hf((g + 8 + (e << 2)) | 0);
            b = a[f >> 0] | 0;
          }
          e = (e + 1) | 0;
        } while ((e | 0) < ((b & 255) | 0));
      }
      b = (g + 136) | 0;
      d = (g + 72) | 0;
      if ((c[b >> 2] | 0) == (c[d >> 2] | 0)) c[b >> 2] = 0;
      hf(d);
      d = (g + 7656) | 0;
      if ((c[h >> 2] | 0) > 0) {
        b = 0;
        do {
          hf(((c[d >> 2] | 0) + (b << 4)) | 0);
          b = (b + 1) | 0;
        } while ((b | 0) < (c[h >> 2] | 0));
      }
      hf(d);
      c[h >> 2] = 0;
      return 0;
    }
    function hc(a) {
      a = a | 0;
      a = c[(a + 60) >> 2] | 0;
      Yc(a);
      c[(a + 5836) >> 2] = 2147483647;
      return;
    }
    function ic(a) {
      a = a | 0;
      hf((a + 3492) | 0);
      hf((a + 3496) | 0);
      hf((a + 7584) | 0);
      hf((a + 7588) | 0);
      hf((a + 7592) | 0);
      hf((a + 7596) | 0);
      hf((a + 7600) | 0);
      hf((a + 7568) | 0);
      hf((a + 7580) | 0);
      hf((a + 7604) | 0);
      hf((a + 7572) | 0);
      hf((a + 7576) | 0);
      hf((a + 3084) | 0);
      hf((a + 3092) | 0);
      hf((a + 3088) | 0);
      Af((a + 1428) | 0);
      Af((a + 1432) | 0);
      return;
    }
    function jc(b, e, f) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0;
      y = (b + 3508) | 0;
      c[y >> 2] = 0;
      u = (b + 5828) | 0;
      c[(b + 5832) >> 2] = c[u >> 2];
      c[u >> 2] = 0;
      x = (b + 7660) | 0;
      c[x >> 2] = 0;
      a: do
        if ((f | 0) > 3) {
          v = (b + 7722) | 0;
          k = (b + 7664) | 0;
          l = (b + 7648) | 0;
          m = (b + 7636) | 0;
          n = (b + 7644) | 0;
          o = (b + 7632) | 0;
          p = (b + 7656) | 0;
          q = (b + 7628) | 0;
          w = (b + 7640) | 0;
          r = (b + 136) | 0;
          s = (b + 3500) | 0;
          t = (b + 7732) | 0;
          while (1) {
            j = (a[v >> 0] | 0) == 0;
            if (!j) {
              i = c[t >> 2] | 0;
              if ((i | 0) > 0) {
                h = 0;
                g = 0;
                do {
                  g = d[(e + h) >> 0] | (g << 8);
                  h = (h + 1) | 0;
                } while ((h | 0) < (i | 0));
              } else g = 0;
              f = (f - i) | 0;
              if ((g | 0) > (f | 0)) {
                e = -1094995529;
                break a;
              } else {
                i = (e + i) | 0;
                h = f;
              }
            } else {
              while (1) {
                g = (e + 1) | 0;
                if (
                  ((a[e >> 0] | 0) == 0 ? (a[g >> 0] | 0) == 0 : 0)
                    ? (a[(e + 2) >> 0] | 0) == 1
                    : 0
                )
                  break;
                if ((f | 0) < 5) {
                  e = -1094995529;
                  break a;
                } else {
                  e = g;
                  f = (f + -1) | 0;
                }
              }
              g = 0;
              i = (e + 3) | 0;
              h = (f + -3) | 0;
            }
            g = j ? h : g;
            e = c[k >> 2] | 0;
            f = c[x >> 2] | 0;
            if ((e | 0) <= (f | 0)) {
              e = (e + 1) | 0;
              f = jf(c[p >> 2] | 0, e, 16) | 0;
              if (!f) {
                e = -12;
                break a;
              }
              c[p >> 2] = f;
              j = c[k >> 2] | 0;
              ah((f + (j << 4)) | 0, 0, ((e - j) << 4) | 0) | 0;
              kf(w, e, 4) | 0;
              kf(l, e, 4) | 0;
              kf(n, e, 4) | 0;
              f = c[l >> 2] | 0;
              c[(f + (c[k >> 2] << 2)) >> 2] = 1024;
              f = of(c[(f + (c[k >> 2] << 2)) >> 2] | 0, 4) | 0;
              c[((c[n >> 2] | 0) + (c[k >> 2] << 2)) >> 2] = f;
              c[k >> 2] = e;
              f = c[x >> 2] | 0;
            }
            c[m >> 2] = c[((c[l >> 2] | 0) + (f << 2)) >> 2];
            c[o >> 2] = c[((c[n >> 2] | 0) + (f << 2)) >> 2];
            e = c[p >> 2] | 0;
            g = kc(b, i, g, (e + (f << 4)) | 0) | 0;
            c[((c[w >> 2] | 0) + (c[x >> 2] << 2)) >> 2] = c[q >> 2];
            c[((c[l >> 2] | 0) + (c[x >> 2] << 2)) >> 2] = c[m >> 2];
            A = c[o >> 2] | 0;
            z = c[n >> 2] | 0;
            j = c[x >> 2] | 0;
            c[x >> 2] = j + 1;
            c[(z + (j << 2)) >> 2] = A;
            if ((g | 0) < 0) {
              e = g;
              break a;
            }
            e =
              lc(
                ((c[r >> 2] | 0) + 204) | 0,
                c[(e + (f << 4) + 12) >> 2] | 0,
                c[(e + (f << 4) + 8) >> 2] | 0
              ) | 0;
            if ((e | 0) < 0) break a;
            mc(b) | 0;
            if (((c[s >> 2] & -2) | 0) == 36) c[u >> 2] = 1;
            f = (h - g) | 0;
            if ((f | 0) <= 3) break;
            else e = (i + g) | 0;
          }
          if ((c[x >> 2] | 0) > 0) {
            g = (b + 7628) | 0;
            h = (b + 7644) | 0;
            i = (b + 7632) | 0;
            j = (b + 7656) | 0;
            f = 0;
            do {
              c[g >> 2] = c[((c[w >> 2] | 0) + (f << 2)) >> 2];
              c[i >> 2] = c[((c[h >> 2] | 0) + (f << 2)) >> 2];
              A = c[j >> 2] | 0;
              if (
                (nc(
                  b,
                  c[(A + (f << 4) + 12) >> 2] | 0,
                  c[(A + (f << 4) + 8) >> 2] | 0
                ) |
                  0) <
                0
              )
                break a;
              f = (f + 1) | 0;
            } while ((f | 0) < (c[x >> 2] | 0));
          }
        } else e = 0;
      while (0);
      return e | 0;
    }
    function kc(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
      n = (b + 7628) | 0;
      c[n >> 2] = 0;
      a: do
        if ((e | 0) > 1) {
          g = 0;
          while (1) {
            if (!(a[(d + g) >> 0] | 0)) {
              h = (g + -1) | 0;
              if ((g | 0) > 0) g = (a[(d + h) >> 0] | 0) == 0 ? h : g;
              h = (g + 2) | 0;
              if (
                ((h | 0) < (e | 0) ? (a[(d + (g + 1)) >> 0] | 0) == 0 : 0)
                  ? ((i = a[(d + h) >> 0] | 0), (i & 255) < 4)
                  : 0
              )
                break;
            }
            h = (g + 2) | 0;
            if (((g + 3) | 0) < (e | 0)) g = h;
            else break a;
          }
          e = (i << 24) >> 24 == 3 ? e : g;
          h = g;
        } else h = 0;
      while (0);
      b: do
        if ((h | 0) < ((e + -1) | 0)) {
          mf(f, (f + 4) | 0, (e + 32) | 0);
          o = c[f >> 2] | 0;
          if (!o) e = -12;
          else {
            fh(o | 0, d | 0, h | 0) | 0;
            i = (h + 2) | 0;
            c: do
              if ((i | 0) < (e | 0)) {
                m = (b + 7636) | 0;
                l = (b + 7632) | 0;
                g = h;
                b = h;
                while (1) {
                  k = (d + i) | 0;
                  j = a[k >> 0] | 0;
                  h = a[(d + b) >> 0] | 0;
                  do
                    if ((j & 255) <= 3)
                      if (!((h << 24) >> 24))
                        if (!(a[(d + (b + 1)) >> 0] | 0)) {
                          if ((j << 24) >> 24 != 3) {
                            i = g;
                            e = b;
                            break c;
                          }
                          i = (g + 1) | 0;
                          a[(o + g) >> 0] = 0;
                          g = (g + 2) | 0;
                          a[(o + i) >> 0] = 0;
                          b = (b + 3) | 0;
                          k = c[n >> 2] | 0;
                          c[n >> 2] = k + 1;
                          h = c[m >> 2] | 0;
                          if ((h | 0) > (k | 0)) {
                            h = c[l >> 2] | 0;
                            if (!h) break;
                          } else {
                            h = h << 1;
                            c[m >> 2] = h;
                            kf(l, h, 4) | 0;
                            h = c[l >> 2] | 0;
                            if (!h) {
                              e = -12;
                              break b;
                            }
                          }
                          c[(h + (((c[n >> 2] | 0) + -1) << 2)) >> 2] = i;
                        } else {
                          h = 0;
                          p = 26;
                        }
                      else p = 26;
                    else {
                      a[(o + g) >> 0] = h;
                      a[(o + (g + 1)) >> 0] = a[(d + (b + 1)) >> 0] | 0;
                      g = (g + 2) | 0;
                      b = i;
                      h = a[k >> 0] | 0;
                      p = 26;
                    }
                  while (0);
                  if ((p | 0) == 26) {
                    p = 0;
                    a[(o + g) >> 0] = h;
                    g = (g + 1) | 0;
                    b = (b + 1) | 0;
                  }
                  i = (b + 2) | 0;
                  if ((i | 0) >= (e | 0)) {
                    p = 15;
                    break;
                  }
                }
              } else {
                g = h;
                b = h;
                p = 15;
              }
            while (0);
            if ((p | 0) == 15)
              if ((b | 0) < (e | 0)) {
                i = (e + g) | 0;
                h = b;
                while (1) {
                  a[(o + g) >> 0] = a[(d + h) >> 0] | 0;
                  h = (h + 1) | 0;
                  if ((h | 0) == (e | 0)) break;
                  else g = (g + 1) | 0;
                }
                i = (i - b) | 0;
              } else {
                i = g;
                e = b;
              }
            g = (o + i) | 0;
            h = (g + 32) | 0;
            do {
              a[g >> 0] = 0;
              g = (g + 1) | 0;
            } while ((g | 0) < (h | 0));
            c[(f + 12) >> 2] = o;
            c[(f + 8) >> 2] = i;
          }
        } else {
          c[(f + 12) >> 2] = d;
          c[(f + 8) >> 2] = e;
        }
      while (0);
      return e | 0;
    }
    function lc(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      return Gc(a, b, c >>> 0 > 268435455 ? -8 : c << 3) | 0;
    }
    function mc(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      b = ((c[(a + 136) >> 2] | 0) + 204) | 0;
      if (!(We(b) | 0)) {
        c[(a + 3500) >> 2] = Te(b, 6) | 0;
        d = Te(b, 6) | 0;
        b = ((Te(b, 3) | 0) + -1) | 0;
        c[(a + 3504) >> 2] = b;
        return ((b | 0) < 0 ? -1094995529 : ((d | 0) == 0) & 1) | 0;
      } else return -1094995529;
      return 0;
    }
    function nc(d, f, g) {
      d = d | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0;
      f = lc(((c[(d + 136) >> 2] | 0) + 204) | 0, f, g) | 0;
      a: do
        if ((f | 0) >= 0) {
          f = mc(d) | 0;
          b: do
            if ((f | 0) >= 0) {
              if (!f) {
                f = 0;
                break a;
              }
              k = (d + 3500) | 0;
              switch (c[k >> 2] | 0) {
                case 48: {
                  f = ie(d) | 0;
                  if ((f | 0) < 0) break b;
                  else {
                    f = 0;
                    break a;
                  }
                }
                case 34: {
                  f = me(d) | 0;
                  if ((f | 0) < 0) break b;
                  else {
                    f = 0;
                    break a;
                  }
                }
                case 40:
                case 39: {
                  f = se(d) | 0;
                  if ((f | 0) < 0) break b;
                  else {
                    f = 0;
                    break a;
                  }
                }
                case 9:
                case 8:
                case 7:
                case 6:
                case 21:
                case 20:
                case 19:
                case 18:
                case 17:
                case 16:
                case 5:
                case 4:
                case 3:
                case 2:
                case 0:
                case 1: {
                  f = oc(d) | 0;
                  if ((f | 0) < 0) break a;
                  i = (d + 5836) | 0;
                  g = c[i >> 2] | 0;
                  j = c[k >> 2] | 0;
                  c: do
                    if ((g | 0) == 2147483647) {
                      switch (j | 0) {
                        case 18:
                        case 16:
                        case 17:
                        case 21: {
                          g = c[(d + 5816) >> 2] | 0;
                          break;
                        }
                        case 20:
                        case 19: {
                          g = -2147483648;
                          break;
                        }
                        default: {
                          g = 2147483647;
                          break c;
                        }
                      }
                      c[i >> 2] = g;
                    }
                  while (0);
                  h = (j | 0) == 9;
                  if (((j & -2) | 0) == 8) {
                    if ((c[(d + 5816) >> 2] | 0) <= (g | 0)) {
                      c[(d + 5848) >> 2] = 0;
                      f = 0;
                      break a;
                    }
                    if (h) c[i >> 2] = -2147483648;
                  }
                  if (!(a[(d + 2436) >> 0] | 0))
                    if (!(c[(d + 3508) >> 2] | 0)) break b;
                    else f = j;
                  else {
                    f = pc(d) | 0;
                    if ((f | 0) < 0) break a;
                    f = c[k >> 2] | 0;
                  }
                  if ((f | 0) != (c[(d + 7668) >> 2] | 0)) {
                    f = -1094995529;
                    break a;
                  }
                  if (
                    (
                      (a[(d + 2437) >> 0] | 0) == 0
                        ? (c[(d + 2428) >> 2] | 0) != 2
                        : 0
                    )
                      ? ((l = bd(d) | 0), (l | 0) < 0)
                      : 0
                  ) {
                    f = l;
                    break b;
                  }
                  f = qc(d) | 0;
                  l = c[(d + 200) >> 2] | 0;
                  if (
                    (f | 0) >=
                    (R(c[(l + 13132) >> 2] | 0, c[(l + 13128) >> 2] | 0) | 0)
                  )
                    c[(d + 5848) >> 2] = 1;
                  if ((f | 0) < 0) break b;
                  else {
                    f = 0;
                    break a;
                  }
                }
                case 37:
                case 36: {
                  f = (d + 7616) | 0;
                  b[f >> 1] = ((e[f >> 1] | 0) + 1) & 255;
                  c[(d + 5836) >> 2] = 2147483647;
                  f = 0;
                  break a;
                }
                default: {
                  f = 0;
                  break a;
                }
              }
            }
          while (0);
          f = ((c[((c[(d + 4) >> 2] | 0) + 688) >> 2] & 8) | 0) == 0 ? 0 : f;
        }
      while (0);
      return f | 0;
    }
    function oc(f) {
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0;
      v = (f + 136) | 0;
      w = ((c[v >> 2] | 0) + 204) | 0;
      u = (We(w) | 0) & 255;
      n = (f + 2436) | 0;
      a[n >> 0] = u;
      q = (f + 3500) | 0;
      g = c[q >> 2] | 0;
      if (
        !(((u << 24) >> 24 == 0) | (((g + -16) | 0) >>> 0 > 4))
          ? ((u = (f + 7616) | 0),
            (b[u >> 1] = ((e[u >> 1] | 0) + 1) & 255),
            (c[(f + 5836) >> 2] = 2147483647),
            ((g + -19) | 0) >>> 0 < 2)
          : 0
      ) {
        Xc(f);
        g = c[q >> 2] | 0;
      }
      l = (f + 3034) | 0;
      a[l >> 0] = 0;
      if (((g & -8) | 0) == 16) a[l >> 0] = We(w) | 0;
      g = Ye(w) | 0;
      c[(f + 2416) >> 2] = g;
      a: do
        if (
          g >>> 0 <= 255
            ? ((h = c[(f + 400 + (g << 2)) >> 2] | 0), (h | 0) != 0)
            : 0
        ) {
          k = a[n >> 0] | 0;
          if (!((k << 24) >> 24)) {
            g = (f + 204) | 0;
            h = c[(h + 4) >> 2] | 0;
            if ((c[g >> 2] | 0) != (h | 0)) {
              g = -1094995529;
              break;
            }
            u = g;
          } else {
            u = (f + 204) | 0;
            h = c[(h + 4) >> 2] | 0;
          }
          c[u >> 2] = h;
          i = c[q >> 2] | 0;
          j = (i | 0) == 21;
          if (j ? (c[(f + 5832) >> 2] | 0) == 1 : 0) a[l >> 0] = 1;
          t = (f + 200) | 0;
          g = c[t >> 2] | 0;
          h = c[((c[(f + 272 + (c[h >> 2] << 2)) >> 2] | 0) + 4) >> 2] | 0;
          if ((g | 0) == (h | 0)) h = k;
          else {
            c[t >> 2] = h;
            do
              if (g | 0 ? !(j | (((i & -8) | 0) != 16)) : 0) {
                if (
                  (
                    (c[(h + 13120) >> 2] | 0) == (c[(g + 13120) >> 2] | 0)
                      ? (c[(h + 13124) >> 2] | 0) == (c[(g + 13124) >> 2] | 0)
                      : 0
                  )
                    ? (c[
                        (h +
                          76 +
                          (((((c[(h + 72) >> 2] | 0) + -1) | 0) * 12) | 0)) >>
                          2
                      ] |
                        0) ==
                      (c[
                        (g +
                          76 +
                          (((((c[(g + 72) >> 2] | 0) + -1) | 0) * 12) | 0)) >>
                          2
                      ] |
                        0)
                    : 0
                )
                  break;
                a[l >> 0] = 0;
              }
            while (0);
            Xc(f);
            g = Jc(f, c[t >> 2] | 0) | 0;
            if ((g | 0) < 0) break;
            g = (f + 7616) | 0;
            b[g >> 1] = ((e[g >> 1] | 0) + 1) & 255;
            c[(f + 5836) >> 2] = 2147483647;
            g = c[t >> 2] | 0;
            h = a[n >> 0] | 0;
          }
          i = (f + 4) | 0;
          s = c[i >> 2] | 0;
          c[(s + 832) >> 2] = d[(g + 302) >> 0];
          c[(s + 836) >> 2] = d[(g + 335) >> 0];
          s = (f + 2437) | 0;
          a[s >> 0] = 0;
          do
            if (!((h << 24) >> 24)) {
              if (a[((c[u >> 2] | 0) + 41) >> 0] | 0) {
                a[s >> 0] = We(w) | 0;
                g = c[t >> 2] | 0;
              }
              g =
                ((R(c[(g + 13128) >> 2] << 1, c[(g + 13132) >> 2] | 0) | 0) +
                  -2) |
                0;
              o = g >>> 0 > 65535;
              g = o ? g >>> 16 : g;
              o = o ? 16 : 0;
              p = ((g & 65280) | 0) == 0;
              g =
                Te(
                  w,
                  ((p ? o : o | 8) + (d[(2511 + (p ? g : g >>> 8)) >> 0] | 0)) |
                    0
                ) | 0;
              c[(f + 2420) >> 2] = g;
              p = c[t >> 2] | 0;
              if (
                g >>> 0 >=
                (R(c[(p + 13132) >> 2] | 0, c[(p + 13128) >> 2] | 0) | 0) >>> 0
              ) {
                g = -1094995529;
                break a;
              }
              if (a[s >> 0] | 0) {
                g = (f + 156) | 0;
                if (!(a[g >> 0] | 0)) {
                  g = -1094995529;
                  break a;
                } else {
                  p = g;
                  break;
                }
              } else {
                c[(f + 2424) >> 2] = g;
                p = (f + 5824) | 0;
                c[p >> 2] = (c[p >> 2] | 0) + 1;
                p = (f + 156) | 0;
                r = 31;
                break;
              }
            } else {
              c[(f + 2424) >> 2] = 0;
              c[(f + 2420) >> 2] = 0;
              c[(f + 5824) >> 2] = 0;
              p = (f + 156) | 0;
              a[p >> 0] = 0;
              r = 31;
            }
          while (0);
          if ((r | 0) == 31) {
            a[p >> 0] = 0;
            if ((c[((c[u >> 2] | 0) + 1624) >> 2] | 0) > 0) {
              g = 0;
              do {
                Ve(w, 1);
                g = (g + 1) | 0;
              } while ((g | 0) < (c[((c[u >> 2] | 0) + 1624) >> 2] | 0));
            }
            g = Ye(w) | 0;
            o = (f + 2428) | 0;
            c[o >> 2] = g;
            if (g >>> 0 >= 3) {
              g = -1094995529;
              break;
            }
            if (!((g | 0) == 2 ? 1 : ((c[q >> 2] & -8) | 0) != 16)) {
              g = -1094995529;
              break;
            }
            g = (f + 2438) | 0;
            a[g >> 0] = 1;
            if (a[((c[u >> 2] | 0) + 39) >> 0] | 0) a[g >> 0] = We(w) | 0;
            if (a[((c[t >> 2] | 0) + 8) >> 0] | 0)
              a[(f + 2439) >> 0] = Te(w, 2) | 0;
            if ((((c[q >> 2] | 0) + -19) | 0) >>> 0 < 2) {
              c[(f + 2608) >> 2] = 0;
              c[(f + 5816) >> 2] = 0;
            } else {
              g = Te(w, c[((c[t >> 2] | 0) + 64) >> 2] | 0) | 0;
              c[(f + 2432) >> 2] = g;
              g = id(f, g) | 0;
              h = (f + 5816) | 0;
              if (
                (a[n >> 0] | 0) == 0
                  ? ((m = c[h >> 2] | 0), (g | 0) != (m | 0))
                  : 0
              )
                if (!(c[((c[i >> 2] | 0) + 688) >> 2] & 8)) g = m;
                else {
                  g = -1094995529;
                  break;
                }
              c[h >> 2] = g;
              if (!(We(w) | 0)) {
                h = (f + 2440) | 0;
                g = he(f, h, c[t >> 2] | 0, 1) | 0;
                if ((g | 0) < 0) break;
                else g = h;
              } else {
                h = c[t >> 2] | 0;
                g = c[(h + 2184) >> 2] | 0;
                if (!g) {
                  g = -1094995529;
                  break;
                }
                m = ((g << 1) + -2) | 0;
                g = m >>> 0 > 65535;
                m = g ? m >>> 16 : m;
                g = g ? 16 : 0;
                n = ((m & 65280) | 0) == 0;
                g =
                  ((d[(2511 + (n ? m : m >>> 8)) >> 0] | 0) + (n ? g : g | 8)) |
                  0;
                if (!g) {
                  g = h;
                  h = 0;
                } else {
                  h = Te(w, g) | 0;
                  g = c[t >> 2] | 0;
                }
                g = (g + 2188 + ((h * 168) | 0)) | 0;
              }
              c[(f + 2608) >> 2] = g;
              if (
                (Kc(f, (f + 2612) | 0, w) | 0) < 0
                  ? (c[((c[i >> 2] | 0) + 688) >> 2] & 8) | 0
                  : 0
              ) {
                g = -1094995529;
                break;
              }
              if (!(a[((c[t >> 2] | 0) + 13060) >> 0] | 0)) g = 0;
              else g = (We(w) | 0) & 255;
              a[(f + 3035) >> 0] = g;
            }
            b: do
              if (!(c[(f + 3504) >> 2] | 0)) {
                switch (c[q >> 2] | 0) {
                  case 9:
                  case 8:
                  case 7:
                  case 6:
                  case 4:
                  case 2:
                  case 0:
                    break b;
                  default: {
                  }
                }
                c[(f + 5820) >> 2] = c[(f + 5816) >> 2];
              }
            while (0);
            do
              if (a[((c[t >> 2] | 0) + 12941) >> 0] | 0) {
                a[(f + 3044) >> 0] = We(w) | 0;
                if (!(c[((c[t >> 2] | 0) + 4) >> 2] | 0)) {
                  a[(f + 3045) >> 0] = 0;
                  a[(f + 3046) >> 0] = 0;
                  break;
                } else {
                  q = (We(w) | 0) & 255;
                  a[(f + 3046) >> 0] = q;
                  a[(f + 3045) >> 0] = q;
                  break;
                }
              } else {
                a[(f + 3044) >> 0] = 0;
                a[(f + 3045) >> 0] = 0;
                a[(f + 3046) >> 0] = 0;
              }
            while (0);
            l = (f + 3040) | 0;
            c[l >> 2] = 0;
            k = (f + 3036) | 0;
            c[k >> 2] = 0;
            g = c[o >> 2] | 0;
            if (g >>> 0 < 2) {
              h = c[u >> 2] | 0;
              c[k >> 2] = c[(h + 8) >> 2];
              if (!g) c[l >> 2] = c[(h + 12) >> 2];
              do
                if (!(We(w) | 0)) r = 69;
                else {
                  g = ((Ye(w) | 0) + 1) | 0;
                  c[k >> 2] = g;
                  if (c[o >> 2] | 0) break;
                  c[l >> 2] = (Ye(w) | 0) + 1;
                  r = 69;
                }
              while (0);
              if ((r | 0) == 69) g = c[k >> 2] | 0;
              if (g >>> 0 > 16) {
                g = -1094995529;
                break;
              }
              if ((c[l >> 2] | 0) >>> 0 > 16) {
                g = -1094995529;
                break;
              }
              g = (f + 3032) | 0;
              a[g >> 0] = 0;
              i = (f + 3033) | 0;
              a[i >> 0] = 0;
              j = jd(f) | 0;
              if (!j) {
                g = -1094995529;
                break;
              }
              do
                if (
                  (j | 0) > 1 ? (a[((c[u >> 2] | 0) + 1617) >> 0] | 0) != 0 : 0
                ) {
                  q = (We(w) | 0) & 255;
                  a[g >> 0] = q;
                  do
                    if ((q << 24) >> 24) {
                      if (!(c[k >> 2] | 0)) break;
                      q = ((j << 1) + -2) | 0;
                      h = q >>> 0 > 65535;
                      q = h ? q >>> 16 : q;
                      h = h ? 16 : 0;
                      g = ((q & 65280) | 0) == 0;
                      h =
                        ((d[(2511 + (g ? q : q >>> 8)) >> 0] | 0) +
                          (g ? h : h | 8)) |
                        0;
                      g = 0;
                      do {
                        c[(f + 2776 + (g << 2)) >> 2] = Te(w, h) | 0;
                        g = (g + 1) | 0;
                      } while (g >>> 0 < (c[k >> 2] | 0) >>> 0);
                    }
                  while (0);
                  if (c[o >> 2] | 0) break;
                  r = We(w) | 0;
                  a[i >> 0] = r;
                  if (((r & 255) | 0) != 1) {
                    r = 83;
                    break;
                  }
                  if (!(c[l >> 2] | 0)) {
                    r = 83;
                    break;
                  }
                  r = ((j << 1) + -2) | 0;
                  h = r >>> 0 > 65535;
                  r = h ? r >>> 16 : r;
                  h = h ? 16 : 0;
                  g = ((r & 65280) | 0) == 0;
                  h =
                    ((d[(2511 + (g ? r : r >>> 8)) >> 0] | 0) +
                      (g ? h : h | 8)) |
                    0;
                  g = 0;
                  do {
                    c[(f + 2904 + (g << 2)) >> 2] = Te(w, h) | 0;
                    g = (g + 1) | 0;
                  } while (g >>> 0 < (c[l >> 2] | 0) >>> 0);
                  r = 83;
                } else r = 83;
              while (0);
              do
                if ((r | 0) == 83) {
                  if (c[o >> 2] | 0) break;
                  a[(f + 3047) >> 0] = We(w) | 0;
                }
              while (0);
              if (!(a[((c[u >> 2] | 0) + 5) >> 0] | 0)) g = 0;
              else g = (We(w) | 0) & 255;
              a[(f + 3048) >> 0] = g;
              g = (f + 3052) | 0;
              c[g >> 2] = 0;
              do
                if (a[(f + 3035) >> 0] | 0) {
                  h = (f + 3051) | 0;
                  a[h >> 0] = 0;
                  if (!(c[o >> 2] | 0)) {
                    i = ((We(w) | 0) == 0) & 1;
                    a[h >> 0] = i;
                  } else i = 0;
                  if ((c[(f + 3036 + ((i & 255) << 2)) >> 2] | 0) >>> 0 <= 1)
                    break;
                  r = Ye(w) | 0;
                  c[g >> 2] = r;
                  if (
                    r >>> 0 >=
                    (c[(f + 3036 + (d[h >> 0] << 2)) >> 2] | 0) >>> 0
                  ) {
                    g = -1094995529;
                    break a;
                  }
                }
              while (0);
              g = c[u >> 2] | 0;
              if ((a[(g + 37) >> 0] | 0) != 0 ? (c[o >> 2] | 0) == 1 : 0)
                r = 96;
              else r = 94;
              do
                if ((r | 0) == 94) {
                  if (!(a[(g + 38) >> 0] | 0)) break;
                  if (!(c[o >> 2] | 0)) r = 96;
                }
              while (0);
              if ((r | 0) == 96) Lc(f, w);
              q = (5 - (Ye(w) | 0)) | 0;
              c[(f + 3080) >> 2] = q;
              if (((q + -1) | 0) >>> 0 > 4) {
                g = -1094995529;
                break;
              }
            }
            c[(f + 3056) >> 2] = Mc(w) | 0;
            g = c[u >> 2] | 0;
            if (!(a[(g + 36) >> 0] | 0)) {
              c[(f + 3060) >> 2] = 0;
              h = 0;
            } else {
              c[(f + 3060) >> 2] = Mc(w) | 0;
              h = Mc(w) | 0;
              g = c[u >> 2] | 0;
            }
            c[(f + 3064) >> 2] = h;
            if (!(a[(g + 1631) >> 0] | 0)) h = 0;
            else {
              h = (We(w) | 0) & 255;
              g = c[u >> 2] | 0;
            }
            a[(f + 3068) >> 0] = h;
            c: do
              if (!(a[(g + 55) >> 0] | 0)) {
                a[(f + 3049) >> 0] = 0;
                c[(f + 3072) >> 2] = 0;
                g = 0;
                r = 111;
              } else {
                do
                  if (a[(g + 56) >> 0] | 0) {
                    if (!(We(w) | 0)) {
                      g = c[u >> 2] | 0;
                      break;
                    }
                    q = (We(w) | 0) & 255;
                    a[(f + 3049) >> 0] = q;
                    if ((q << 24) >> 24) break c;
                    c[(f + 3072) >> 2] = (Mc(w) | 0) << 1;
                    g = (Mc(w) | 0) << 1;
                    r = 111;
                    break c;
                  }
                while (0);
                a[(f + 3049) >> 0] = a[(g + 57) >> 0] | 0;
                c[(f + 3072) >> 2] = c[(g + 60) >> 2];
                g = c[(g + 64) >> 2] | 0;
                r = 111;
              }
            while (0);
            if ((r | 0) == 111) c[(f + 3076) >> 2] = g;
            g = a[((c[u >> 2] | 0) + 54) >> 0] | 0;
            d: do
              if (!((g << 24) >> 24)) g = 0;
              else {
                do
                  if (!(a[(f + 3044) >> 0] | 0)) {
                    if (a[(f + 3045) >> 0] | 0) break;
                    if (a[(f + 3049) >> 0] | 0) break d;
                  }
                while (0);
                g = (We(w) | 0) & 255;
              }
            while (0);
            a[(f + 3050) >> 0] = g;
          }
          o = (f + 3096) | 0;
          c[o >> 2] = 0;
          q = c[u >> 2] | 0;
          if (!((a[(q + 42) >> 0] | 0) == 0 ? !(a[(q + 43) >> 0] | 0) : 0))
            r = 121;
          e: do
            if ((r | 0) == 121) {
              r = Ye(w) | 0;
              c[o >> 2] = r;
              if ((r | 0) <= 0) {
                c[(f + 7620) >> 2] = 0;
                break;
              }
              k = ((Ye(w) | 0) + 1) | 0;
              j = k >> 4;
              k = k & 15;
              l = (f + 3084) | 0;
              hf(l);
              r = (f + 3088) | 0;
              hf(r);
              n = (f + 3092) | 0;
              hf(n);
              c[l >> 2] = of(c[o >> 2] | 0, 4) | 0;
              c[r >> 2] = of(c[o >> 2] | 0, 4) | 0;
              q = of(c[o >> 2] | 0, 4) | 0;
              c[n >> 2] = q;
              if (
                c[l >> 2] | 0 ? !(((q | 0) == 0) | ((c[r >> 2] | 0) == 0)) : 0
              ) {
                if ((c[o >> 2] | 0) > 0) {
                  m = (j | 0) > 0;
                  n = (k | 0) == 0;
                  i = 0;
                  do {
                    if (m) {
                      g = 0;
                      h = 0;
                      do {
                        g = ((Te(w, 16) | 0) + (g << 16)) | 0;
                        h = (h + 1) | 0;
                      } while ((h | 0) != (j | 0));
                    } else g = 0;
                    if (!n) g = ((Te(w, k) | 0) + (g << k)) | 0;
                    c[((c[l >> 2] | 0) + (i << 2)) >> 2] = g + 1;
                    i = (i + 1) | 0;
                  } while ((i | 0) < (c[o >> 2] | 0));
                }
                g = (f + 141) | 0;
                do
                  if ((d[g >> 0] | 0) > 1) {
                    r = c[u >> 2] | 0;
                    if (
                      (c[(r + 48) >> 2] | 0) <= 1
                        ? (c[(r + 44) >> 2] | 0) <= 1
                        : 0
                    )
                      break;
                    c[(f + 7620) >> 2] = 0;
                    a[g >> 0] = 1;
                    break e;
                  }
                while (0);
                c[(f + 7620) >> 2] = 0;
                break;
              }
              c[o >> 2] = 0;
              g = -12;
              break a;
            }
          while (0);
          if (a[((c[u >> 2] | 0) + 1628) >> 0] | 0) {
            h = Ye(w) | 0;
            q = bh(h | 0, 0, 3) | 0;
            n = C;
            r = Nc(w) | 0;
            o = (((r | 0) < 0) << 31) >> 31;
            if (
              ((n | 0) > (o | 0)) |
              (((n | 0) == (o | 0)) & (q >>> 0 > r >>> 0))
            ) {
              g = -1094995529;
              break;
            }
            if (h | 0) {
              g = 0;
              do {
                Ve(w, 8);
                g = (g + 1) | 0;
              } while ((g | 0) != (h | 0));
            }
          }
          h = c[u >> 2] | 0;
          u = ((c[(h + 16) >> 2] | 0) + 26 + (c[(f + 3056) >> 2] | 0)) | 0;
          i = u & 255;
          a[(f + 3100) >> 0] = i;
          u = u << 24;
          if (
            (u | 0) <= 855638016
              ? ((u >> 24) | 0) >=
                ((0 - (c[((c[t >> 2] | 0) + 13192) >> 2] | 0)) | 0)
              : 0
          ) {
            u = c[(f + 2420) >> 2] | 0;
            c[(f + 3488) >> 2] = u;
            if ((u | 0) == 0 ? a[s >> 0] | 0 : 0) {
              g = -1094995529;
              break;
            }
            if ((Nc(w) | 0) >= 0) {
              g = c[v >> 2] | 0;
              a[(g + 203) >> 0] = ((a[s >> 0] | 0) == 0) & 1;
              if (!(a[(h + 22) >> 0] | 0)) a[(g + 272) >> 0] = i;
              a[p >> 0] = 1;
              a[(g + 302) >> 0] = 0;
              a[(g + 303) >> 0] = 0;
              g = 0;
            } else g = -1094995529;
          } else g = -1094995529;
        } else g = -1094995529;
      while (0);
      return g | 0;
    }
    function pc(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
      d = c[(b + 136) >> 2] | 0;
      e = (b + 200) | 0;
      i = c[e >> 2] | 0;
      g = c[(i + 13064) >> 2] | 0;
      f = c[(i + 13120) >> 2] >> g;
      g = ((c[(i + 13124) >> 2] >> g) + 1) | 0;
      i = (b + 5840) | 0;
      j = (b + 5844) | 0;
      ah(c[(b + 7572) >> 2] | 0, 0, R(c[j >> 2] | 0, c[i >> 2] | 0) | 0) | 0;
      ah(c[(b + 7576) >> 2] | 0, 0, R(c[j >> 2] | 0, c[i >> 2] | 0) | 0) | 0;
      i = c[e >> 2] | 0;
      ah(
        c[(b + 7596) >> 2] | 0,
        0,
        R(c[(i + 13152) >> 2] | 0, c[(i + 13148) >> 2] | 0) | 0
      ) | 0;
      i = c[e >> 2] | 0;
      ah(
        c[(b + 7600) >> 2] | 0,
        0,
        R(
          ((c[(i + 13160) >> 2] | 0) + 1) | 0,
          ((c[(i + 13156) >> 2] | 0) + 1) | 0
        ) | 0
      ) | 0;
      ah(c[(b + 7580) >> 2] | 0, -1, R(((f << 2) + 4) | 0, g) | 0) | 0;
      c[(b + 5848) >> 2] = 0;
      g = (b + 3500) | 0;
      c[(b + 7668) >> 2] = c[g >> 2];
      f = c[(b + 204) >> 2] | 0;
      if (a[(f + 42) >> 0] | 0)
        c[(d + 312) >> 2] =
          c[c[(f + 1648) >> 2] >> 2] << c[((c[e >> 2] | 0) + 13080) >> 2];
      e = (b + 160) | 0;
      d = Zc(b, e, c[(b + 5816) >> 2] | 0) | 0;
      if ((d | 0) >= 0) {
        d = dd(b) | 0;
        if ((d | 0) >= 0) {
          j = ((c[g >> 2] & -8) | 0) == 16;
          c[((c[c[(b + 3508) >> 2] >> 2] | 0) + 80) >> 2] = j & 1;
          c[((c[e >> 2] | 0) + 84) >> 2] = 3 - (c[(b + 2428) >> 2] | 0);
          if (!j) ad(b);
          d = (b + 164) | 0;
          Pf(c[d >> 2] | 0);
          d = $c(b, c[d >> 2] | 0, 0) | 0;
          if ((d | 0) < 0) h = 9;
          else d = 0;
        } else h = 9;
      } else h = 9;
      if ((h | 0) == 9) {
        e = (b + 3508) | 0;
        c[e >> 2] = 0;
      }
      return d | 0;
    }
    function qc(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0;
      d = l;
      l = (l + 16) | 0;
      e = (d + 8) | 0;
      b = d;
      c[e >> 2] = 0;
      c[(e + 4) >> 2] = 1;
      a = c[(a + 4) >> 2] | 0;
      za[c[(a + 816) >> 2] & 1](a, 1, e, b, 1, 4) | 0;
      l = d;
      return c[b >> 2] | 0;
    }
    function rc(b, d) {
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0;
      r = c[(b + 60) >> 2] | 0;
      p = (r + 200) | 0;
      h = c[p >> 2] | 0;
      s = 1 << c[(h + 13080) >> 2];
      q = (r + 204) | 0;
      d = c[q >> 2] | 0;
      b = c[((c[(d + 1668) >> 2] | 0) + (c[(r + 3488) >> 2] << 2)) >> 2] | 0;
      e = (a[(r + 2437) >> 0] | 0) == 0;
      do
        if (((b | 0) != 0) | e) {
          if (
            !e
              ? (c[
                  ((c[(r + 7580) >> 2] | 0) +
                    (c[((c[(d + 1672) >> 2] | 0) + ((b + -1) << 2)) >> 2] <<
                      2)) >>
                    2
                ] |
                  0) !=
                (c[(r + 2424) >> 2] | 0)
              : 0
          ) {
            b = -1094995529;
            break;
          }
          j = (s + -1) | 0;
          k = (r + 3072) | 0;
          l = (r + 3496) | 0;
          m = (r + 3076) | 0;
          n = (r + 3050) | 0;
          o = (r + 7604) | 0;
          g = 0;
          f = 0;
          e = h;
          d = c[(h + 13120) >> 2] | 0;
          do {
            if ((b | 0) >= (c[(e + 13136) >> 2] | 0)) break;
            h = c[((c[((c[q >> 2] | 0) + 1672) >> 2] | 0) + (b << 2)) >> 2] | 0;
            g = c[(e + 13080) >> 2] | 0;
            i = (j + d) >> g;
            f = ((h | 0) % (i | 0) | 0) << g;
            g = (((h | 0) / (i | 0)) | 0) << g;
            sc(r, f, g, b);
            Sa(r, b);
            i = c[((c[p >> 2] | 0) + 13080) >> 2] | 0;
            tc(r, f >> i, g >> i);
            i = c[l >> 2] | 0;
            c[(i + (h << 3)) >> 2] = c[k >> 2];
            c[(i + (h << 3) + 4) >> 2] = c[m >> 2];
            a[((c[o >> 2] | 0) + h) >> 0] = a[n >> 0] | 0;
            i = uc(r, f, g, c[((c[p >> 2] | 0) + 13080) >> 2] | 0, 0) | 0;
            if ((i | 0) < 0) {
              t = 8;
              break;
            }
            b = (b + 1) | 0;
            Ra(r, b);
            dc(r, f, g, s);
            e = c[p >> 2] | 0;
            d = c[(e + 13120) >> 2] | 0;
          } while ((i | 0) != 0);
          if ((t | 0) == 8) {
            c[((c[(r + 7580) >> 2] | 0) + (h << 2)) >> 2] = -1;
            b = i;
            break;
          }
          if (
            ((f + s) | 0) >= (d | 0)
              ? ((g + s) | 0) >= (c[(e + 13124) >> 2] | 0)
              : 0
          )
            Ub(r, f, g, s);
        } else b = -1094995529;
      while (0);
      return b | 0;
    }
    function sc(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
      o = c[(b + 136) >> 2] | 0;
      k = c[(b + 200) >> 2] | 0;
      g = (k + 13080) | 0;
      h = 1 << c[g >> 2];
      l = c[(b + 204) >> 2] | 0;
      m = c[((c[(l + 1672) >> 2] | 0) + (f << 2)) >> 2] | 0;
      p = c[(b + 2424) >> 2] | 0;
      n = (m - p) | 0;
      i = c[(b + 7580) >> 2] | 0;
      j = (i + (m << 2)) | 0;
      c[j >> 2] = p;
      do
        if (!(a[(l + 43) >> 0] | 0)) {
          b = a[(l + 42) >> 0] | 0;
          if (!((b << 24) >> 24)) {
            c[(o + 312) >> 2] = c[(k + 13120) >> 2];
            b = 0;
            break;
          }
          if (
            (f | 0) != 0
              ? ((p = c[(l + 1676) >> 2] | 0),
                (c[(p + (f << 2)) >> 2] | 0) !=
                  (c[(p + ((f + -1) << 2)) >> 2] | 0))
              : 0
          ) {
            p = c[g >> 2] | 0;
            c[(o + 312) >> 2] =
              (c[
                ((c[(l + 1648) >> 2] | 0) +
                  (c[((c[(l + 1664) >> 2] | 0) + ((d >> p) << 2)) >> 2] <<
                    2)) >>
                  2
              ] <<
                p) +
              d;
            a[(o + 203) >> 0] = 1;
          }
        } else {
          if ((d | 0) == 0 ? (((h + -1) & e) | 0) == 0 : 0)
            a[(o + 203) >> 0] = 1;
          c[(o + 312) >> 2] = c[(k + 13120) >> 2];
          b = a[(l + 42) >> 0] | 0;
        }
      while (0);
      h = (h + e) | 0;
      p = c[(k + 13124) >> 2] | 0;
      c[(o + 316) >> 2] = (h | 0) > (p | 0) ? p : h;
      h = (o + 31312) | 0;
      c[h >> 2] = 0;
      if (!((b << 24) >> 24)) {
        if (!n) {
          c[h >> 2] = 1;
          b = 1;
        } else b = 0;
        if ((n | 0) < (c[(k + 13128) >> 2] | 0)) {
          b = b | 4;
          c[h >> 2] = b;
        }
      } else {
        if ((d | 0) > 0) {
          p = c[(l + 1676) >> 2] | 0;
          g = (m + -1) | 0;
          if (
            (c[(p + (f << 2)) >> 2] | 0) ==
            (c[
              (p + (c[((c[(l + 1668) >> 2] | 0) + (g << 2)) >> 2] << 2)) >> 2
            ] |
              0)
          )
            b = 0;
          else {
            c[h >> 2] = 2;
            b = 2;
          }
          if ((c[j >> 2] | 0) != (c[(i + (g << 2)) >> 2] | 0)) {
            b = b | 1;
            c[h >> 2] = b;
          }
        } else b = 0;
        if ((e | 0) > 0) {
          p = c[(l + 1676) >> 2] | 0;
          g = (m - (c[(k + 13128) >> 2] | 0)) | 0;
          if (
            (c[(p + (f << 2)) >> 2] | 0) !=
            (c[
              (p + (c[((c[(l + 1668) >> 2] | 0) + (g << 2)) >> 2] << 2)) >> 2
            ] |
              0)
          ) {
            b = b | 8;
            c[h >> 2] = b;
          }
          if ((c[j >> 2] | 0) != (c[(i + (g << 2)) >> 2] | 0)) {
            b = b | 4;
            c[h >> 2] = b;
          }
        }
      }
      h = (d | 0) > 0;
      if (h & ((n | 0) > 0)) g = (((b >>> 1) & 1) ^ 1) & 255;
      else g = 0;
      a[(o + 308) >> 0] = g;
      if ((e | 0) > 0) {
        g = c[(k + 13128) >> 2] | 0;
        if ((n | 0) < (g | 0)) b = 0;
        else b = (((b >>> 3) & 1) ^ 1) & 255;
        a[(o + 309) >> 0] = b;
        if (((n + 1) | 0) < (g | 0)) b = 0;
        else {
          b = c[(l + 1676) >> 2] | 0;
          b =
            ((c[(b + (f << 2)) >> 2] | 0) ==
              (c[
                (b +
                  (c[((c[(l + 1668) >> 2] | 0) + ((m + 1 - g) << 2)) >> 2] <<
                    2)) >>
                  2
              ] |
                0)) &
            1;
        }
        a[(o + 310) >> 0] = b;
        if (h & ((n | 0) > (g | 0))) {
          b = c[(l + 1676) >> 2] | 0;
          b =
            ((c[(b + (f << 2)) >> 2] | 0) ==
              (c[
                (b +
                  (c[((c[(l + 1668) >> 2] | 0) + ((m + -1 - g) << 2)) >> 2] <<
                    2)) >>
                  2
              ] |
                0)) &
            1;
        } else b = 0;
      } else {
        a[(o + 309) >> 0] = 0;
        a[(o + 310) >> 0] = 0;
        b = 0;
      }
      a[(o + 311) >> 0] = b;
      return;
    }
    function tc(e, f, g) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0;
      h = c[(e + 136) >> 2] | 0;
      B = (e + 3492) | 0;
      C = c[B >> 2] | 0;
      D = (e + 200) | 0;
      A = ((R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, g) | 0) + f) | 0;
      if ((a[(e + 3044) >> 0] | 0) == 0 ? (a[(e + 3045) >> 0] | 0) == 0 : 0) {
        h = 0;
        i = 0;
      } else {
        if ((f | 0) > 0 ? (a[(h + 308) >> 0] | 0) != 0 : 0) i = Ya(e) | 0;
        else i = 0;
        if (!(((g | 0) < 1) | ((i | 0) != 0)))
          if (!(a[(h + 309) >> 0] | 0)) {
            h = 0;
            i = 0;
          } else {
            h = Ya(e) | 0;
            i = 0;
          }
        else h = 0;
      }
      t = c[((c[D >> 2] | 0) + 4) >> 2] | 0 ? 3 : 1;
      u = (e + 204) | 0;
      v = (C + ((A * 148) | 0) + 143) | 0;
      w = (C + ((A * 148) | 0) + 144) | 0;
      x = (C + ((A * 148) | 0) + 104) | 0;
      y = (C + ((A * 148) | 0) + 108) | 0;
      z = (h | 0) == 0;
      s = (i | h | 0) == 0;
      o = (i | 0) == 0;
      p = (g + -1) | 0;
      q = (f + -1) | 0;
      m = (C + ((A * 148) | 0) + 144) | 0;
      l = 0;
      do {
        r = c[u >> 2] | 0;
        r = d[((l | 0) == 0 ? (r + 1644) | 0 : (r + 1645) | 0) >> 0] | 0;
        if (a[(e + 3044 + l) >> 0] | 0) {
          j = (l | 0) == 2;
          do
            if (j) {
              h = a[v >> 0] | 0;
              a[w >> 0] = h;
              c[y >> 2] = c[x >> 2];
              n = m;
            } else {
              if (s) {
                h = (_a(e) | 0) & 255;
                n = (C + ((A * 148) | 0) + 142 + l) | 0;
                a[n >> 0] = h;
                break;
              }
              if (!o) {
                h =
                  a[
                    ((c[B >> 2] | 0) +
                      ((((q +
                        (R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, g) | 0)) |
                        0) *
                        148) |
                        0) +
                      142 +
                      l) >>
                      0
                  ] | 0;
                n = (C + ((A * 148) | 0) + 142 + l) | 0;
                a[n >> 0] = h;
                break;
              }
              if (z) h = 0;
              else
                h =
                  a[
                    ((c[B >> 2] | 0) +
                      (((((R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, p) | 0) +
                        f) |
                        0) *
                        148) |
                        0) +
                      142 +
                      l) >>
                      0
                  ] | 0;
              n = (C + ((A * 148) | 0) + 142 + l) | 0;
              a[n >> 0] = h;
            }
          while (0);
          if ((h << 24) >> 24) {
            h = 0;
            do {
              do
                if (!s) {
                  if (!o) {
                    i =
                      c[
                        ((c[B >> 2] | 0) +
                          ((((q +
                            (R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, g) | 0)) |
                            0) *
                            148) |
                            0) +
                          (l << 4) +
                          (h << 2)) >>
                          2
                      ] | 0;
                    break;
                  }
                  if (z) i = 0;
                  else
                    i =
                      c[
                        ((c[B >> 2] | 0) +
                          (((((R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, p) |
                            0) +
                            f) |
                            0) *
                            148) |
                            0) +
                          (l << 4) +
                          (h << 2)) >>
                          2
                      ] | 0;
                } else i = bb(e) | 0;
              while (0);
              c[(C + ((A * 148) | 0) + (l << 4) + (h << 2)) >> 2] = i;
              h = (h + 1) | 0;
            } while ((h | 0) != 4);
            do
              if ((a[n >> 0] | 0) != 1) {
                if (!j) {
                  if (s) {
                    c[(C + ((A * 148) | 0) + 100 + (l << 2)) >> 2] = db(e) | 0;
                    break;
                  }
                  if (!o) {
                    c[(C + ((A * 148) | 0) + 100 + (l << 2)) >> 2] =
                      c[
                        ((c[B >> 2] | 0) +
                          ((((q +
                            (R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, g) | 0)) |
                            0) *
                            148) |
                            0) +
                          100 +
                          (l << 2)) >>
                          2
                      ];
                    break;
                  }
                  if (z) h = 0;
                  else
                    h =
                      c[
                        ((c[B >> 2] | 0) +
                          (((((R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, p) |
                            0) +
                            f) |
                            0) *
                            148) |
                            0) +
                          100 +
                          (l << 2)) >>
                          2
                      ] | 0;
                  c[(C + ((A * 148) | 0) + 100 + (l << 2)) >> 2] = h;
                }
              } else {
                h = 0;
                do {
                  do
                    if (
                      c[(C + ((A * 148) | 0) + (l << 4) + (h << 2)) >> 2] | 0
                    ) {
                      if (s) {
                        i = cb(e) | 0;
                        break;
                      }
                      if (!o) {
                        i =
                          c[
                            ((c[B >> 2] | 0) +
                              ((((q +
                                (R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, g) |
                                  0)) |
                                0) *
                                148) |
                                0) +
                              48 +
                              (l << 4) +
                              (h << 2)) >>
                              2
                          ] | 0;
                        break;
                      }
                      if (!z)
                        i =
                          c[
                            ((c[B >> 2] | 0) +
                              (((((R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, p) |
                                0) +
                                f) |
                                0) *
                                148) |
                                0) +
                              48 +
                              (l << 4) +
                              (h << 2)) >>
                              2
                          ] | 0;
                      else i = 0;
                    } else i = 0;
                  while (0);
                  c[(C + ((A * 148) | 0) + 48 + (l << 4) + (h << 2)) >> 2] = i;
                  h = (h + 1) | 0;
                } while ((h | 0) != 4);
                if (s) {
                  a[(C + ((A * 148) | 0) + 96 + l) >> 0] = ab(e) | 0;
                  break;
                }
                if (!o) {
                  a[(C + ((A * 148) | 0) + 96 + l) >> 0] =
                    a[
                      ((c[B >> 2] | 0) +
                        ((((q +
                          (R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, g) | 0)) |
                          0) *
                          148) |
                          0) +
                        96 +
                        l) >>
                        0
                    ] | 0;
                  break;
                }
                if (z) h = 0;
                else
                  h =
                    a[
                      ((c[B >> 2] | 0) +
                        (((((R(c[((c[D >> 2] | 0) + 13128) >> 2] | 0, p) | 0) +
                          f) |
                          0) *
                          148) |
                          0) +
                        96 +
                        l) >>
                        0
                    ] | 0;
                a[(C + ((A * 148) | 0) + 96 + l) >> 0] = h;
              }
            while (0);
            b[(C + ((A * 148) | 0) + 112 + ((l * 10) | 0)) >> 1] = 0;
            j = 0;
            do {
              h = c[(C + ((A * 148) | 0) + (l << 4) + (j << 2)) >> 2] | 0;
              i = j;
              j = (j + 1) | 0;
              k = (C + ((A * 148) | 0) + 112 + ((l * 10) | 0) + (j << 1)) | 0;
              b[k >> 1] = h;
              if ((a[n >> 0] | 0) == 2) {
                if ((i | 0) > 1) {
                  h = (0 - h) | 0;
                  b[k >> 1] = h;
                }
              } else if (
                c[(C + ((A * 148) | 0) + 48 + (l << 4) + (i << 2)) >> 2] | 0
              ) {
                h = (0 - h) | 0;
                b[k >> 1] = h;
              }
              b[k >> 1] = ((h << 16) >> 16) << r;
            } while ((j | 0) != 4);
          }
        } else a[(C + ((A * 148) | 0) + 142 + l) >> 0] = 0;
        l = (l + 1) | 0;
      } while ((l | 0) < (t | 0));
      return;
    }
    function uc(b, e, f, g, h) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0;
      p = c[(b + 136) >> 2] | 0;
      s = 1 << g;
      q = (b + 200) | 0;
      j = c[q >> 2] | 0;
      k = (b + 204) | 0;
      i = c[k >> 2] | 0;
      o =
        ((1 << ((c[(j + 13080) >> 2] | 0) - (c[(i + 24) >> 2] | 0))) + -1) | 0;
      c[(p + 31232) >> 2] = h;
      r = (s + e) | 0;
      if (
        (
          (r | 0) <= (c[(j + 13120) >> 2] | 0)
            ? ((s + f) | 0) <= (c[(j + 13124) >> 2] | 0)
            : 0
        )
          ? (c[(j + 13064) >> 2] | 0) >>> 0 < g >>> 0
          : 0
      ) {
        j = mb(b, h, e, f) | 0;
        i = c[k >> 2] | 0;
      } else j = ((c[(j + 13064) >> 2] | 0) >>> 0 < g >>> 0) & 1;
      if (
        a[(i + 22) >> 0] | 0
          ? (((c[((c[q >> 2] | 0) + 13080) >> 2] | 0) -
              (c[(i + 24) >> 2] | 0)) |
              0) >>>
              0 <=
            g >>> 0
          : 0
      ) {
        a[(p + 300) >> 0] = 0;
        c[(p + 280) >> 2] = 0;
      }
      if (
        a[(b + 3068) >> 0] | 0
          ? (((c[((c[q >> 2] | 0) + 13080) >> 2] | 0) -
              (d[(i + 1632) >> 0] | 0)) |
              0) >>>
              0 <=
            g >>> 0
          : 0
      )
        a[(p + 301) >> 0] = 0;
      a: do
        if (!j) {
          i = vc(b, e, f, g) | 0;
          if ((i | 0) >= 0) {
            i = c[q >> 2] | 0;
            j = 1 << c[(i + 13080) >> 2];
            if (
              (r | 0) % (j | 0) | 0 | 0
                ? (r | 0) < (c[(i + 13120) >> 2] | 0)
                : 0
            ) {
              i = 1;
              break;
            }
            s = (s + f) | 0;
            if (
              (s | 0) % (j | 0) | 0 | 0
                ? (s | 0) < (c[(i + 13124) >> 2] | 0)
                : 0
            ) {
              i = 1;
              break;
            }
            i = ((eb(b) | 0) == 0) & 1;
          }
        } else {
          l = s >> 1;
          m = (l + e) | 0;
          n = (l + f) | 0;
          g = (g + -1) | 0;
          k = (h + 1) | 0;
          i = uc(b, e, f, g, k) | 0;
          if ((i | 0) >= 0) {
            do
              if (i) {
                j = c[q >> 2] | 0;
                if ((m | 0) < (c[(j + 13120) >> 2] | 0)) {
                  i = uc(b, m, f, g, k) | 0;
                  if ((i | 0) < 0) break a;
                  if (!i) {
                    i = 0;
                    break;
                  }
                  j = c[q >> 2] | 0;
                }
                if ((n | 0) < (c[(j + 13124) >> 2] | 0)) {
                  i = uc(b, e, n, g, k) | 0;
                  if ((i | 0) < 0) break a;
                  if (!i) {
                    i = 0;
                    break;
                  }
                  j = c[q >> 2] | 0;
                }
                if (
                  (m | 0) < (c[(j + 13120) >> 2] | 0)
                    ? (n | 0) < (c[(j + 13124) >> 2] | 0)
                    : 0
                ) {
                  i = uc(b, m, n, g, k) | 0;
                  if ((i | 0) < 0) break a;
                }
              } else i = 0;
            while (0);
            if (((o & r) | 0) == 0 ? ((o & (s + f)) | 0) == 0 : 0)
              c[(p + 276) >> 2] = a[(p + 272) >> 0];
            if (!i) i = 0;
            else {
              i = c[q >> 2] | 0;
              if (((m + l) | 0) < (c[(i + 13120) >> 2] | 0)) i = 1;
              else i = ((n + l) | 0) < (c[(i + 13124) >> 2] | 0);
              i = i & 1;
            }
          }
        }
      while (0);
      return i | 0;
    }
    function vc(b, e, f, g) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0;
      z = c[(b + 136) >> 2] | 0;
      C = (b + 200) | 0;
      x = c[C >> 2] | 0;
      w = c[(x + 13064) >> 2] | 0;
      v = c[(x + 13140) >> 2] | 0;
      h = e >> w;
      i = f >> w;
      t = (b + 204) | 0;
      x =
        1 << ((c[(x + 13080) >> 2] | 0) - (c[((c[t >> 2] | 0) + 24) >> 2] | 0));
      c[(z + 31236) >> 2] = e;
      c[(z + 31240) >> 2] = f;
      o = (z + 31252) | 0;
      a[o >> 0] = 1;
      r = (z + 31244) | 0;
      c[r >> 2] = 1;
      p = (z + 31248) | 0;
      c[p >> 2] = 0;
      s = (z + 31254) | 0;
      a[s >> 0] = 0;
      q = (z + 31253) | 0;
      a[q >> 0] = 0;
      l = (b + 7584) | 0;
      u = ((R(i, v) | 0) + h) | 0;
      a[((c[l >> 2] | 0) + u) >> 0] = 0;
      y = (z + 31268) | 0;
      a[y >> 0] = 1;
      a[(y + 1) >> 0] = 1;
      a[(y + 2) >> 0] = 1;
      a[(y + 3) >> 0] = 1;
      y = 1 << g;
      w = y >> w;
      x = (x + -1) | 0;
      if (a[((c[t >> 2] | 0) + 40) >> 0] | 0) {
        m = (fb(b) | 0) & 255;
        a[(z + 31256) >> 0] = m;
        if ((m << 24) >> 24) wc(b, e, f, g);
      } else a[(z + 31256) >> 0] = 0;
      m = (b + 2428) | 0;
      if ((c[m >> 2] | 0) == 2) {
        if ((w | 0) > 0) {
          h = 0;
          i = u;
          while (1) {
            ah(((c[l >> 2] | 0) + i) | 0, 0, w | 0) | 0;
            h = (h + 1) | 0;
            if ((h | 0) == (w | 0)) break;
            else i = (i + v) | 0;
          }
        }
      } else {
        j = gb(b, e, f, h, i) | 0;
        k = j & 255;
        if ((w | 0) > 0) {
          h = 0;
          i = u;
          while (1) {
            ah(((c[l >> 2] | 0) + i) | 0, k | 0, w | 0) | 0;
            h = (h + 1) | 0;
            if ((h | 0) == (w | 0)) break;
            else i = (i + v) | 0;
          }
        }
        c[r >> 2] = (j & 255) | 0 ? 2 : 0;
      }
      a: do
        if (!(a[((c[l >> 2] | 0) + u) >> 0] | 0)) {
          if ((c[m >> 2] | 0) == 2) h = c[r >> 2] | 0;
          else {
            h = lb(b) | 0;
            c[r >> 2] = h;
          }
          if (
            (h | 0) == 1
              ? (c[((c[C >> 2] | 0) + 13064) >> 2] | 0) != (g | 0)
              : 0
          )
            i = 20;
          else i = 19;
          b: do
            if ((i | 0) == 19) {
              l = nb(b, g) | 0;
              c[p >> 2] = l;
              m = c[r >> 2] | 0;
              a[s >> 0] = ((l | 0) == 3) & ((m | 0) == 1) & 1;
              if ((m | 0) == 1) i = 20;
              else {
                yc(b, e, f, g);
                switch (c[p >> 2] | 0) {
                  case 0: {
                    xc(b, e, f, y, y, g, 0);
                    break b;
                  }
                  case 1: {
                    n = ((y | 0) / 2) | 0;
                    xc(b, e, f, y, n, g, 0);
                    xc(b, e, (n + f) | 0, y, n, g, 1);
                    break b;
                  }
                  case 2: {
                    n = ((y | 0) / 2) | 0;
                    xc(b, e, f, n, y, g, 0);
                    xc(b, (n + e) | 0, f, n, y, g, 1);
                    break b;
                  }
                  case 4: {
                    n = ((y | 0) / 4) | 0;
                    xc(b, e, f, y, n, g, 0);
                    xc(b, e, (n + f) | 0, y, (((3 << g) | 0) / 4) | 0, g, 1);
                    break b;
                  }
                  case 5: {
                    n = (((3 << g) | 0) / 4) | 0;
                    xc(b, e, f, y, n, g, 0);
                    xc(b, e, (n + f) | 0, y, ((y | 0) / 4) | 0, g, 1);
                    break b;
                  }
                  case 6: {
                    n = ((y | 0) / 4) | 0;
                    xc(b, e, f, n, y, g, 0);
                    xc(b, (n + e) | 0, f, (((3 << g) | 0) / 4) | 0, y, g, 1);
                    break b;
                  }
                  case 7: {
                    n = (((3 << g) | 0) / 4) | 0;
                    xc(b, e, f, n, y, g, 0);
                    xc(b, (n + e) | 0, f, ((y | 0) / 4) | 0, y, g, 1);
                    break b;
                  }
                  case 3: {
                    n = ((y | 0) / 2) | 0;
                    xc(b, e, f, n, n, g, 0);
                    l = (n + e) | 0;
                    xc(b, l, f, n, n, g, 1);
                    m = (n + f) | 0;
                    xc(b, e, m, n, n, g, 2);
                    xc(b, l, m, n, n, g, 3);
                    break b;
                  }
                  default:
                    break b;
                }
              }
            }
          while (0);
          do
            if ((i | 0) == 20) {
              if (
                (
                  (
                    (c[p >> 2] | 0) == 0
                      ? ((n = c[C >> 2] | 0), (c[(n + 68) >> 2] | 0) != 0)
                      : 0
                  )
                    ? (c[(n + 13048) >> 2] | 0) >>> 0 <= g >>> 0
                    : 0
                )
                  ? (c[(n + 13052) >> 2] | 0) >>> 0 >= g >>> 0
                  : 0
              ) {
                h = (ob(b) | 0) & 255;
                a[q >> 0] = h;
              } else h = a[q >> 0] | 0;
              if (!((h << 24) >> 24)) {
                Ac(b, e, f, g);
                break;
              }
              yc(b, e, f, g);
              h = zc(b, e, f, g) | 0;
              if (a[((c[C >> 2] | 0) + 13056) >> 0] | 0) wc(b, e, f, g);
              if ((h | 0) < 0) break a;
            }
          while (0);
          if (!(a[q >> 0] | 0)) {
            do
              if ((c[r >> 2] | 0) == 1) i = 45;
              else {
                if ((c[p >> 2] | 0) == 0 ? a[(z + 31276) >> 0] | 0 : 0) {
                  i = 45;
                  break;
                }
                h = (yb(b) | 0) & 255;
                a[o >> 0] = h;
              }
            while (0);
            if ((i | 0) == 45) h = a[o >> 0] | 0;
            if (!((h << 24) >> 24)) {
              if (a[(b + 3049) >> 0] | 0) {
                i = 53;
                break;
              }
              Sb(b, e, f, g);
              i = 53;
              break;
            }
            h = c[C >> 2] | 0;
            if ((c[r >> 2] | 0) == 1)
              h = ((d[s >> 0] | 0) + (c[(h + 13092) >> 2] | 0)) | 0;
            else h = c[(h + 13088) >> 2] | 0;
            a[(z + 31255) >> 0] = h;
            h = Bc(b, e, f, e, f, e, f, g, g, 0, 0, 2768, 2768) | 0;
            if ((h | 0) >= 0) i = 53;
          } else i = 53;
        } else {
          xc(b, e, f, y, y, g, 0);
          yc(b, e, f, g);
          if (!(a[(b + 3049) >> 0] | 0)) {
            Sb(b, e, f, g);
            i = 53;
          } else i = 53;
        }
      while (0);
      if ((i | 0) == 53) {
        if (
          a[((c[t >> 2] | 0) + 22) >> 0] | 0 ? (a[(z + 300) >> 0] | 0) == 0 : 0
        )
          Qb(b, e, f, g);
        if ((w | 0) > 0) {
          j = (b + 7568) | 0;
          k = (z + 272) | 0;
          i = 0;
          h = u;
          while (1) {
            ah(((c[j >> 2] | 0) + h) | 0, a[k >> 0] | 0, w | 0) | 0;
            i = (i + 1) | 0;
            if ((i | 0) == (w | 0)) break;
            else h = (h + v) | 0;
          }
        }
        if (((x & (y + e)) | 0) == 0 ? ((x & (y + f)) | 0) == 0 : 0)
          c[(z + 276) >> 2] = a[(z + 272) >> 0];
        h = c[C >> 2] | 0;
        i = c[(h + 13064) >> 2] | 0;
        k = y >> i;
        j = e >> i;
        i = f >> i;
        if (
          (k | 0) > 0
            ? ((A = (b + 7588) | 0),
              (B = c[(z + 31232) >> 2] & 255),
              ah(
                ((c[A >> 2] | 0) + ((R(c[(h + 13140) >> 2] | 0, i) | 0) + j)) |
                  0,
                B | 0,
                k | 0
              ) | 0,
              (k | 0) != 1)
            : 0
        ) {
          h = 1;
          do {
            ah(
              ((c[A >> 2] | 0) +
                ((R(c[((c[C >> 2] | 0) + 13140) >> 2] | 0, (h + i) | 0) | 0) +
                  j)) |
                0,
              B | 0,
              k | 0
            ) | 0;
            h = (h + 1) | 0;
          } while ((h | 0) != (k | 0));
          h = 0;
        } else h = 0;
      }
      return h | 0;
    }
    function wc(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0;
      k = 1 << f;
      j = c[(b + 200) >> 2] | 0;
      h = c[(j + 13084) >> 2] | 0;
      l = c[(j + 13156) >> 2] | 0;
      f = (k + d) | 0;
      g = c[(j + 13120) >> 2] | 0;
      k = (k + e) | 0;
      j = c[(j + 13124) >> 2] | 0;
      e = e >> h;
      k = ((k | 0) > (j | 0) ? j : k) >> h;
      if ((e | 0) < (k | 0)) {
        j = d >> h;
        h = ((f | 0) > (g | 0) ? g : f) >> h;
        i = (j | 0) < (h | 0);
        g = (b + 7600) | 0;
        do {
          if (i) {
            d = R(e, l) | 0;
            f = j;
            do {
              a[((c[g >> 2] | 0) + (f + d)) >> 0] = 2;
              f = (f + 1) | 0;
            } while ((f | 0) != (h | 0));
          }
          e = (e + 1) | 0;
        } while ((e | 0) != (k | 0));
      }
      return;
    }
    function xc(f, g, h, i, j, k, m) {
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      m = m | 0;
      var n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0;
      B = l;
      l = (l + 16) | 0;
      A = B;
      q = c[(f + 136) >> 2] | 0;
      c[A >> 2] = 0;
      c[(A + 4) >> 2] = 0;
      c[(A + 8) >> 2] = 0;
      v = (f + 200) | 0;
      o = c[v >> 2] | 0;
      r = c[(o + 13156) >> 2] | 0;
      u = c[(f + 3508) >> 2] | 0;
      s = c[(u + 16) >> 2] | 0;
      u = c[(u + 20) >> 2] | 0;
      x = (f + 160) | 0;
      n = c[x >> 2] | 0;
      w = R(h >> c[(o + 13180) >> 2], c[(n + 32) >> 2] | 0) | 0;
      p = c[(o + 56) >> 2] | 0;
      w = ((c[n >> 2] | 0) + (((g >> c[(o + 13168) >> 2]) << p) + w)) | 0;
      y = R(h >> c[(o + 13184) >> 2], c[(n + 36) >> 2] | 0) | 0;
      y = ((c[(n + 4) >> 2] | 0) + (((g >> c[(o + 13172) >> 2]) << p) + y)) | 0;
      z = R(h >> c[(o + 13188) >> 2], c[(n + 40) >> 2] | 0) | 0;
      z = ((c[(n + 8) >> 2] | 0) + (((g >> c[(o + 13176) >> 2]) << p) + z)) | 0;
      p = c[(o + 13064) >> 2] | 0;
      a: do
        if (
          !(
            a[
              ((c[(f + 7584) >> 2] | 0) +
                ((R(h >> p, c[(o + 13140) >> 2] | 0) | 0) + (g >> p))) >>
                0
            ] | 0
          )
        ) {
          p = (ub(f) | 0) & 255;
          a[(q + 31276) >> 0] = p;
          if ((p << 24) >> 24) {
            if ((c[(f + 3080) >> 2] | 0) >>> 0 > 1) n = tb(f) | 0;
            else n = 0;
            $d(f, g, h, i, j, k, m, n, A);
            n = c[((c[v >> 2] | 0) + 13084) >> 2] | 0;
            k = g >> n;
            m = h >> n;
            if (((j >> n) | 0) > 0) q = 0;
            else break;
            while (1) {
              if (((i >> n) | 0) > 0) {
                p = ((R((q + m) | 0, r) | 0) + k) | 0;
                o = 0;
                do {
                  n = (s + ((((p + o) | 0) * 12) | 0)) | 0;
                  c[n >> 2] = c[A >> 2];
                  c[(n + 4) >> 2] = c[(A + 4) >> 2];
                  c[(n + 8) >> 2] = c[(A + 8) >> 2];
                  o = (o + 1) | 0;
                  n = c[((c[v >> 2] | 0) + 13084) >> 2] | 0;
                } while ((o | 0) < ((i >> n) | 0));
              }
              q = (q + 1) | 0;
              if ((q | 0) >= ((j >> n) | 0)) break a;
            }
          }
          _d(f, g, h, i, j);
          p = (A + 10) | 0;
          a[p >> 0] = 0;
          if (!(c[(f + 2428) >> 2] | 0)) {
            n = vb(f, i, j) | 0;
            if ((n | 0) == 1) {
              n = 1;
              t = 22;
            } else t = 19;
          } else {
            n = 0;
            t = 19;
          }
          if ((t | 0) == 19) {
            o = c[(f + 3036) >> 2] | 0;
            if (o | 0) a[(A + 8) >> 0] = wb(f, o) | 0;
            a[p >> 0] = 1;
            Ib(f, g, h, 0);
            ee(f, g, h, i, j, k, m, 0, A, xb(f) | 0, 0);
            b[A >> 1] = (e[A >> 1] | 0) + (e[(q + 31272) >> 1] | 0);
            o = (A + 2) | 0;
            b[o >> 1] = (e[o >> 1] | 0) + (e[(q + 31274) >> 1] | 0);
            if (n | 0) t = 22;
          }
          if ((t | 0) == 22) {
            o = c[(f + 3040) >> 2] | 0;
            if (o | 0) a[(A + 9) >> 0] = wb(f, o) | 0;
            if (((n | 0) == 2) & ((a[(f + 3047) >> 0] | 0) == 1))
              c[(q + 31272) >> 2] = 0;
            else Ib(f, g, h, 1);
            a[p >> 0] = (d[p >> 0] | 0) + 2;
            ee(f, g, h, i, j, k, m, 0, A, xb(f) | 0, 1);
            m = (A + 4) | 0;
            b[m >> 1] = (e[m >> 1] | 0) + (e[(q + 31272) >> 1] | 0);
            m = (A + 6) | 0;
            b[m >> 1] = (e[m >> 1] | 0) + (e[(q + 31274) >> 1] | 0);
          }
          n = c[((c[v >> 2] | 0) + 13084) >> 2] | 0;
          k = g >> n;
          m = h >> n;
          if (((j >> n) | 0) > 0) {
            q = 0;
            do {
              if (((i >> n) | 0) > 0) {
                p = ((R((q + m) | 0, r) | 0) + k) | 0;
                o = 0;
                do {
                  n = (s + ((((p + o) | 0) * 12) | 0)) | 0;
                  c[n >> 2] = c[A >> 2];
                  c[(n + 4) >> 2] = c[(A + 4) >> 2];
                  c[(n + 8) >> 2] = c[(A + 8) >> 2];
                  o = (o + 1) | 0;
                  n = c[((c[v >> 2] | 0) + 13084) >> 2] | 0;
                } while ((o | 0) < ((i >> n) | 0));
              }
              q = (q + 1) | 0;
            } while ((q | 0) < ((j >> n) | 0));
          }
        } else {
          if ((c[(f + 3080) >> 2] | 0) >>> 0 > 1) n = tb(f) | 0;
          else n = 0;
          q = 1 << k;
          $d(f, g, h, q, q, k, m, n, A);
          n = c[((c[v >> 2] | 0) + 13084) >> 2] | 0;
          k = g >> n;
          m = h >> n;
          if (((j >> n) | 0) > 0) {
            q = 0;
            do {
              if (((i >> n) | 0) > 0) {
                p = ((R((q + m) | 0, r) | 0) + k) | 0;
                o = 0;
                do {
                  n = (s + ((((p + o) | 0) * 12) | 0)) | 0;
                  c[n >> 2] = c[A >> 2];
                  c[(n + 4) >> 2] = c[(A + 4) >> 2];
                  c[(n + 8) >> 2] = c[(A + 8) >> 2];
                  o = (o + 1) | 0;
                  n = c[((c[v >> 2] | 0) + 13084) >> 2] | 0;
                } while ((o | 0) < ((i >> n) | 0));
              }
              q = (q + 1) | 0;
            } while ((q | 0) < ((j >> n) | 0));
          }
        }
      while (0);
      q = a[(A + 10) >> 0] | 0;
      o = (q << 24) >> 24;
      if (o & 1) {
        n = c[(u + (a[(A + 8) >> 0] << 2)) >> 2] | 0;
        if (n | 0) {
          k = n;
          t = 35;
        }
      } else {
        k = 0;
        t = 35;
      }
      b: do
        if ((t | 0) == 35) {
          if (o & 2) {
            n = c[(u + 196 + (a[(A + 9) >> 0] << 2)) >> 2] | 0;
            if (!n) break;
            else p = n;
          } else p = 0;
          switch ((q << 24) >> 24) {
            case 1: {
              o = (A + 8) | 0;
              n = a[o >> 0] | 0;
              Hc(
                f,
                w,
                c[((c[x >> 2] | 0) + 32) >> 2] | 0,
                c[k >> 2] | 0,
                A,
                g,
                h,
                i,
                j,
                b[(f + 3104 + (n << 1)) >> 1] | 0,
                b[(f + 3296 + (n << 1)) >> 1] | 0
              );
              n = c[v >> 2] | 0;
              if (!(c[(n + 4) >> 2] | 0)) break b;
              w = c[(n + 13172) >> 2] | 0;
              g = g >> w;
              v = c[(n + 13184) >> 2] | 0;
              h = h >> v;
              i = i >> w;
              j = j >> v;
              v = c[k >> 2] | 0;
              w = a[o >> 0] | 0;
              Ic(
                f,
                y,
                c[((c[x >> 2] | 0) + 36) >> 2] | 0,
                c[(v + 4) >> 2] | 0,
                c[(v + 36) >> 2] | 0,
                0,
                g,
                h,
                i,
                j,
                A,
                b[(f + 3136 + (w << 2)) >> 1] | 0,
                b[(f + 3328 + (w << 2)) >> 1] | 0
              );
              w = c[k >> 2] | 0;
              y = a[o >> 0] | 0;
              Ic(
                f,
                z,
                c[((c[x >> 2] | 0) + 40) >> 2] | 0,
                c[(w + 8) >> 2] | 0,
                c[(w + 40) >> 2] | 0,
                0,
                g,
                h,
                i,
                j,
                A,
                b[(f + 3136 + (y << 2) + 2) >> 1] | 0,
                b[(f + 3328 + (y << 2) + 2) >> 1] | 0
              );
              break b;
            }
            case 2: {
              o = (A + 9) | 0;
              n = a[o >> 0] | 0;
              Hc(
                f,
                w,
                c[((c[x >> 2] | 0) + 32) >> 2] | 0,
                c[p >> 2] | 0,
                (A + 4) | 0,
                g,
                h,
                i,
                j,
                b[(f + 3264 + (n << 1)) >> 1] | 0,
                b[(f + 3392 + (n << 1)) >> 1] | 0
              );
              n = c[v >> 2] | 0;
              if (!(c[(n + 4) >> 2] | 0)) break b;
              w = c[(n + 13172) >> 2] | 0;
              g = g >> w;
              v = c[(n + 13184) >> 2] | 0;
              h = h >> v;
              i = i >> w;
              j = j >> v;
              v = c[p >> 2] | 0;
              w = a[o >> 0] | 0;
              Ic(
                f,
                y,
                c[((c[x >> 2] | 0) + 36) >> 2] | 0,
                c[(v + 4) >> 2] | 0,
                c[(v + 36) >> 2] | 0,
                1,
                g,
                h,
                i,
                j,
                A,
                b[(f + 3200 + (w << 2)) >> 1] | 0,
                b[(f + 3424 + (w << 2)) >> 1] | 0
              );
              w = c[p >> 2] | 0;
              y = a[o >> 0] | 0;
              Ic(
                f,
                z,
                c[((c[x >> 2] | 0) + 40) >> 2] | 0,
                c[(w + 8) >> 2] | 0,
                c[(w + 40) >> 2] | 0,
                1,
                g,
                h,
                i,
                j,
                A,
                b[(f + 3200 + (y << 2) + 2) >> 1] | 0,
                b[(f + 3424 + (y << 2) + 2) >> 1] | 0
              );
              break b;
            }
            case 3: {
              ra();
              break;
            }
            default:
              break b;
          }
        }
      while (0);
      l = B;
      return;
    }
    function yc(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0;
      i = c[(b + 136) >> 2] | 0;
      k = c[(b + 200) >> 2] | 0;
      h = c[(k + 13084) >> 2] | 0;
      g = (1 << f) >> h;
      k = c[(k + 13156) >> 2] | 0;
      l = c[((c[(b + 3508) >> 2] | 0) + 16) >> 2] | 0;
      j = d >> h;
      h = e >> h;
      g = (g | 0) == 0 ? 1 : g;
      e = (g | 0) > 0;
      if (e) {
        d = (b + 7592) | 0;
        f = 0;
        do {
          ah(((c[d >> 2] | 0) + ((R((f + h) | 0, k) | 0) + j)) | 0, 1, g | 0) |
            0;
          f = (f + 1) | 0;
        } while ((f | 0) < (g | 0));
        if (((c[(i + 31244) >> 2] | 0) == 1) & e) {
          d = 0;
          do {
            e = ((R((d + h) | 0, k) | 0) + j) | 0;
            f = 0;
            do {
              a[(l + ((((e + f) | 0) * 12) | 0) + 10) >> 0] = 0;
              f = (f + 1) | 0;
            } while ((f | 0) < (g | 0));
            d = (d + 1) | 0;
          } while ((d | 0) < (g | 0));
        }
      }
      return;
    }
    function zc(b, e, f, g) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
      t = l;
      l = (l + 32) | 0;
      q = t;
      s = 1 << g;
      y = c[(b + 160) >> 2] | 0;
      j = c[(y + 32) >> 2] | 0;
      m = R(j, f) | 0;
      k = (b + 200) | 0;
      i = c[k >> 2] | 0;
      h = c[(i + 56) >> 2] | 0;
      m = ((c[y >> 2] | 0) + ((e << h) + m)) | 0;
      n = c[(y + 36) >> 2] | 0;
      u = c[(i + 13184) >> 2] | 0;
      o = R(f >> u, n) | 0;
      v = c[(i + 13172) >> 2] | 0;
      o = ((c[(y + 4) >> 2] | 0) + (((e >> v) << h) + o)) | 0;
      p = c[(y + 40) >> 2] | 0;
      w = c[(i + 13188) >> 2] | 0;
      r = R(f >> w, p) | 0;
      x = c[(i + 13176) >> 2] | 0;
      r = ((c[(y + 8) >> 2] | 0) + (((e >> x) << h) + r)) | 0;
      h = R(d[(i + 13044) >> 0] | 0, s << g) | 0;
      u = ((R(s >> x, s >> w) | 0) + (R(s >> v, s >> u) | 0)) | 0;
      h = ((R(u, d[(i + 13045) >> 0] | 0) | 0) + h) | 0;
      i = Fc(((c[(b + 136) >> 2] | 0) + 224) | 0, (h + 7) >> 3) | 0;
      if (!(a[(b + 3049) >> 0] | 0)) Sb(b, e, f, g);
      e = Gc(q, i, h) | 0;
      if ((e | 0) >= 0) {
        y = (b + 5852) | 0;
        Ga[c[y >> 2] & 3](m, j, s, s, q, d[((c[k >> 2] | 0) + 13044) >> 0] | 0);
        e = c[k >> 2] | 0;
        Ga[c[y >> 2] & 3](
          o,
          n,
          s >> c[(e + 13172) >> 2],
          s >> c[(e + 13184) >> 2],
          q,
          d[(e + 13045) >> 0] | 0
        );
        e = c[k >> 2] | 0;
        Ga[c[y >> 2] & 3](
          r,
          p,
          s >> c[(e + 13176) >> 2],
          s >> c[(e + 13188) >> 2],
          q,
          d[(e + 13045) >> 0] | 0
        );
        e = 0;
      }
      l = t;
      return e | 0;
    }
    function Ac(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0;
      s = l;
      l = (l + 16) | 0;
      p = s;
      r = c[(b + 136) >> 2] | 0;
      j = (c[(r + 31248) >> 2] | 0) == 3;
      h = 1 << f;
      q = j ? 2 : 1;
      g = 0;
      do {
        i = g << 1;
        f = 0;
        do {
          a[(p + (f + i)) >> 0] = pb(b) | 0;
          f = (f + 1) | 0;
        } while ((f | 0) < (q | 0));
        g = (g + 1) | 0;
      } while ((g | 0) < (q | 0));
      h = h >> (j & 1);
      i = (r + 31264) | 0;
      j = (r + 31260) | 0;
      f = 0;
      do {
        k = f << 1;
        m = ((R(f, h) | 0) + e) | 0;
        g = 0;
        do {
          n = (g + k) | 0;
          o = a[(p + n) >> 0] | 0;
          if (!((o << 24) >> 24)) c[i >> 2] = rb(b) | 0;
          else c[j >> 2] = qb(b) | 0;
          a[(r + 31268 + n) >> 0] =
            Ec(b, ((R(g, h) | 0) + d) | 0, m, h, o & 255) | 0;
          g = (g + 1) | 0;
        } while ((g | 0) < (q | 0));
        f = (f + 1) | 0;
      } while ((f | 0) < (q | 0));
      switch (c[((c[(b + 200) >> 2] | 0) + 4) >> 2] | 0) {
        case 3: {
          h = 0;
          do {
            j = h << 1;
            i = 0;
            do {
              g = sb(b) | 0;
              k = (i + j) | 0;
              a[(r + 31281 + k) >> 0] = g;
              f = a[(r + 31268 + k) >> 0] | 0;
              if ((g | 0) != 4) {
                p = a[(1787 + g) >> 0] | 0;
                f = (f << 24) >> 24 == (p << 24) >> 24 ? 34 : p;
              }
              a[(r + 31277 + k) >> 0] = f;
              i = (i + 1) | 0;
            } while ((i | 0) < (q | 0));
            h = (h + 1) | 0;
          } while ((h | 0) < (q | 0));
          break;
        }
        case 2: {
          g = sb(b) | 0;
          a[(r + 31281) >> 0] = g;
          f = a[(r + 31268) >> 0] | 0;
          if ((g | 0) != 4) {
            b = a[(1787 + g) >> 0] | 0;
            f = (f << 24) >> 24 == (b << 24) >> 24 ? 34 : b;
          }
          a[(r + 31277) >> 0] = a[(1791 + (f & 255)) >> 0] | 0;
          break;
        }
        case 0:
          break;
        default: {
          g = sb(b) | 0;
          f = a[(r + 31268) >> 0] | 0;
          if ((g | 0) != 4) {
            b = a[(1787 + g) >> 0] | 0;
            f = (f << 24) >> 24 == (b << 24) >> 24 ? 34 : b;
          }
          a[(r + 31277) >> 0] = f;
        }
      }
      l = s;
      return;
    }
    function Bc(b, e, f, g, h, i, j, k, m, n, o, p, q) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      m = m | 0;
      n = n | 0;
      o = o | 0;
      p = p | 0;
      q = q | 0;
      var r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0;
      E = l;
      l = (l + 16) | 0;
      B = (E + 8) | 0;
      C = E;
      A = c[(b + 136) >> 2] | 0;
      r = c[p >> 2] | 0;
      c[B >> 2] = r;
      s = c[(p + 4) >> 2] | 0;
      v = (B + 4) | 0;
      c[v >> 2] = s;
      x = c[q >> 2] | 0;
      c[C >> 2] = x;
      q = c[(q + 4) >> 2] | 0;
      w = (C + 4) | 0;
      c[w >> 2] = q;
      u = a[(A + 31254) >> 0] | 0;
      if ((u << 24) >> 24) {
        if ((n | 0) == 1) {
          c[(A + 288) >> 2] = d[(A + 31268 + o) >> 0];
          p = (c[((c[(b + 200) >> 2] | 0) + 4) >> 2] | 0) == 3 ? o : 0;
          D = 5;
        }
      } else {
        c[(A + 288) >> 2] = d[(A + 31268) >> 0];
        p = 0;
        D = 5;
      }
      if ((D | 0) == 5) {
        c[(A + 292) >> 2] = d[(A + 31277 + p) >> 0];
        c[(A + 296) >> 2] = d[(A + 31281 + p) >> 0];
      }
      y = (b + 200) | 0;
      p = c[y >> 2] | 0;
      t = (c[(p + 13076) >> 2] | 0) >>> 0 < m >>> 0;
      if (
        (
          (!t ? (c[(p + 13072) >> 2] | 0) >>> 0 < m >>> 0 : 0)
            ? (d[(A + 31255) >> 0] | 0) > (n | 0)
            : 0
        )
          ? !(((n | 0) == 0) & ((u << 24) >> 24 != 0))
          : 0
      )
        t = (zb(b, m) | 0) & 255;
      else {
        if ((c[(p + 13088) >> 2] | 0) == 0 ? (c[(A + 31244) >> 2] | 0) == 0 : 0)
          p = ((n | 0) == 0) & ((c[(A + 31248) >> 2] | 0) != 0);
        else p = 0;
        if (t) p = 1;
        else p = p | (((n | 0) == 0) & ((u << 24) >> 24 != 0));
        t = p & 1;
      }
      p = c[((c[y >> 2] | 0) + 4) >> 2] | 0;
      if ((m | 0) > 2)
        if (!p) p = x;
        else D = 20;
      else if ((p | 0) == 3) D = 20;
      else p = x;
      if ((D | 0) == 20) {
        p = (n | 0) != 0;
        if (!(p & ((r | 0) == 0))) {
          r = Ab(b, n) | 0;
          c[B >> 2] = r;
          if (
            (c[((c[y >> 2] | 0) + 4) >> 2] | 0) == 2
              ? ((m | 0) == 3) | ((t << 24) >> 24 == 0)
              : 0
          ) {
            s = Ab(b, n) | 0;
            c[v >> 2] = s;
          }
        } else r = 0;
        if (!(p & ((x | 0) == 0))) {
          p = Ab(b, n) | 0;
          c[C >> 2] = p;
          if (
            (c[((c[y >> 2] | 0) + 4) >> 2] | 0) == 2
              ? ((m | 0) == 3) | ((t << 24) >> 24 == 0)
              : 0
          ) {
            q = Ab(b, n) | 0;
            c[w >> 2] = q;
          }
        } else p = 0;
      }
      if (!((t << 24) >> 24)) {
        y = c[y >> 2] | 0;
        t = c[(y + 13072) >> 2] | 0;
        u = 1 << t;
        v = c[(y + 13148) >> 2] | 0;
        if (
          ((r | n | p | 0) == 0 ? (c[(A + 31244) >> 2] | 0) != 1 : 0)
            ? (q | s | 0) == 0
              ? 1
              : (c[(y + 4) >> 2] | 0) != 2
            : 0
        )
          q = 1;
        else q = Bb(b, n) | 0;
        p = Cc(b, e, f, g, h, i, j, k, m, o, q, B, C) | 0;
        if ((p | 0) >= 0) {
          if (q | 0 ? ((z = 1 << m), (m | 0) != 31) : 0) {
            r = (b + 7596) | 0;
            q = 0;
            do {
              s = R((q + f) >> t, v) | 0;
              p = 0;
              do {
                a[((c[r >> 2] | 0) + (((p + e) >> t) + s)) >> 0] = 1;
                p = (p + u) | 0;
              } while ((p | 0) < (z | 0));
              q = (q + u) | 0;
            } while ((q | 0) < (z | 0));
          }
          if (
            (
              (a[(b + 3049) >> 0] | 0) == 0
                ? (Sb(b, e, f, m),
                  (a[((c[(b + 204) >> 2] | 0) + 40) >> 0] | 0) != 0)
                : 0
            )
              ? (a[(A + 31256) >> 0] | 0) != 0
              : 0
          ) {
            wc(b, e, f, m);
            D = 47;
          } else D = 47;
        }
      } else {
        r = (m + -1) | 0;
        t = 1 << r;
        s = (t + e) | 0;
        t = (t + f) | 0;
        q = (n + 1) | 0;
        p = Bc(b, e, f, e, f, i, j, k, r, q, 0, B, C) | 0;
        if ((p | 0) >= 0) {
          p = Bc(b, s, f, e, f, i, j, k, r, q, 1, B, C) | 0;
          if ((p | 0) >= 0) {
            p = Bc(b, e, t, e, f, i, j, k, r, q, 2, B, C) | 0;
            if ((p | 0) >= 0) {
              p = Bc(b, s, t, e, f, i, j, k, r, q, 3, B, C) | 0;
              if ((p | 0) > -1) D = 47;
            }
          }
        }
      }
      if ((D | 0) == 47) p = 0;
      l = E;
      return p | 0;
    }
    function Cc(d, e, f, g, h, i, j, k, l, m, n, o, p) {
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      n = n | 0;
      o = o | 0;
      p = p | 0;
      var q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0;
      B = c[(d + 136) >> 2] | 0;
      E = (d + 200) | 0;
      C = (l - (c[((c[E >> 2] | 0) + 13172) >> 2] | 0)) | 0;
      D = (B + 31244) | 0;
      r = 1 << l;
      if ((c[D >> 2] | 0) == 1) {
        _d(d, e, f, r, r);
        Rc(d, e, f, l, 0);
      }
      z = (n | 0) != 0;
      n = (c[o >> 2] | 0) == 0;
      do
        if (z)
          if (n) w = 10;
          else {
            r = 1;
            w = 14;
          }
        else if (n ? (c[p >> 2] | 0) == 0 : 0) {
          q = c[E >> 2] | 0;
          n = c[(q + 4) >> 2] | 0;
          if ((n | 0) == 2) {
            if (c[(o + 4) >> 2] | 0) {
              w = 10;
              break;
            }
            if (c[(p + 4) >> 2] | 0) {
              w = 10;
              break;
            }
          }
          if (!(((n | 0) == 0) | ((c[D >> 2] | 0) != 1))) {
            if (((l | 0) > 2) | ((n | 0) == 3)) {
              r = 1 << ((c[(q + 13172) >> 2] | 0) + C);
              q = 1 << ((c[(q + 13184) >> 2] | 0) + C);
              _d(d, e, f, r, q);
              Rc(d, e, f, C, 1);
              Rc(d, e, f, C, 2);
              n = ((1 << C) + f) | 0;
              if ((c[((c[E >> 2] | 0) + 4) >> 2] | 0) != 2) {
                n = 0;
                break;
              }
              _d(d, e, n, r, q);
              Rc(d, e, n, C, 1);
              Rc(d, e, n, C, 2);
              n = 0;
              break;
            }
            if (
              (m | 0) == 3
                ? ((s = 1 << (l + 1)),
                  (t = 1 << ((c[(q + 13184) >> 2] | 0) + l)),
                  _d(d, g, h, s, t),
                  Rc(d, g, h, l, 1),
                  Rc(d, g, h, l, 2),
                  (u = (r + h) | 0),
                  (c[((c[E >> 2] | 0) + 4) >> 2] | 0) == 2)
                : 0
            ) {
              _d(d, g, u, s, t);
              Rc(d, g, u, l, 1);
              Rc(d, g, u, l, 2);
              n = 0;
            } else n = 0;
          } else n = 0;
        } else {
          r = 1;
          w = 14;
        }
      while (0);
      if ((w | 0) == 10)
        if (!(c[p >> 2] | 0))
          if ((c[((c[E >> 2] | 0) + 4) >> 2] | 0) == 2)
            if (!(c[(o + 4) >> 2] | 0)) {
              r = (c[(p + 4) >> 2] | 0) != 0;
              w = 14;
            } else {
              r = 1;
              w = 14;
            }
          else {
            r = 0;
            w = 14;
          }
        else {
          r = 1;
          w = 14;
        }
      a: do
        if ((w | 0) == 14) {
          s = (d + 204) | 0;
          if (
            a[((c[s >> 2] | 0) + 22) >> 0] | 0
              ? ((v = (B + 300) | 0), (a[v >> 0] | 0) == 0)
              : 0
          ) {
            A = hb(d) | 0;
            q = (B + 280) | 0;
            c[q >> 2] = A;
            if (A) {
              A = (ib(d) | 0) == 1;
              n = c[q >> 2] | 0;
              if (A) {
                n = (0 - n) | 0;
                c[q >> 2] = n;
              }
            } else n = 0;
            a[v >> 0] = 1;
            A = ((c[((c[E >> 2] | 0) + 13192) >> 2] | 0) / 2) | 0;
            if (((n | 0) < ((-26 - A) | 0)) | ((n | 0) > ((A + 25) | 0))) {
              n = -1094995529;
              break;
            }
            Qb(d, i, j, k);
          }
          if (
            (
              r & ((a[(d + 3068) >> 0] | 0) != 0)
                ? (a[(B + 31256) >> 0] | 0) == 0
                : 0
            )
              ? ((x = (B + 301) | 0), (a[x >> 0] | 0) == 0)
              : 0
          ) {
            if (!(jb(d) | 0)) {
              a[(B + 302) >> 0] = 0;
              n = 0;
            } else {
              n = c[s >> 2] | 0;
              if (!(a[(n + 1633) >> 0] | 0)) q = 0;
              else {
                q = kb(d) | 0;
                n = c[s >> 2] | 0;
              }
              a[(B + 302) >> 0] = a[(n + 1634 + q) >> 0] | 0;
              n = a[(n + 1639 + q) >> 0] | 0;
            }
            a[(B + 303) >> 0] = n;
            a[x >> 0] = 1;
          }
          if (((l | 0) < 4) & ((c[D >> 2] | 0) == 1)) {
            n = c[(B + 288) >> 2] | 0;
            A = c[(B + 292) >> 2] | 0;
            A = ((A + -6) | 0) >>> 0 < 9 ? 2 : (((A + -22) | 0) >>> 0 < 9) & 1;
            n = ((n + -6) | 0) >>> 0 < 9 ? 2 : (((n + -22) | 0) >>> 0 < 9) & 1;
          } else {
            A = 0;
            n = 0;
          }
          y = (B + 304) | 0;
          a[y >> 0] = 0;
          if (z) Eb(d, e, f, l, n, 0);
          q = c[E >> 2] | 0;
          n = c[(q + 4) >> 2] | 0;
          if (!n) n = 0;
          else {
            if (!(((l | 0) > 2) | ((n | 0) == 3))) {
              if ((m | 0) != 3) {
                n = 0;
                break;
              }
              s = 1 << (l + 1);
              r = 1 << ((c[(q + 13184) >> 2] | 0) + l);
              n = 0;
              do {
                q = ((n << l) + h) | 0;
                if ((c[D >> 2] | 0) == 1) {
                  _d(d, g, q, s, r);
                  Rc(d, g, q, l, 1);
                }
                if (c[(o + (n << 2)) >> 2] | 0) Eb(d, g, q, l, A, 1);
                n = (n + 1) | 0;
              } while (
                (n | 0) <
                (((c[((c[E >> 2] | 0) + 4) >> 2] | 0) == 2 ? 2 : 1) | 0)
              );
              n = 0;
              while (1) {
                q = ((n << l) + h) | 0;
                if ((c[D >> 2] | 0) == 1) {
                  _d(d, g, q, s, r);
                  Rc(d, g, q, l, 2);
                }
                if (c[(p + (n << 2)) >> 2] | 0) Eb(d, g, q, l, A, 2);
                n = (n + 1) | 0;
                if (
                  (n | 0) >=
                  (((c[((c[E >> 2] | 0) + 4) >> 2] | 0) == 2 ? 2 : 1) | 0)
                ) {
                  n = 0;
                  break a;
                }
              }
            }
            x = 1 << ((c[(q + 13172) >> 2] | 0) + C);
            w = 1 << ((c[(q + 13184) >> 2] | 0) + C);
            do
              if (z & ((a[((c[s >> 2] | 0) + 1630) >> 0] | 0) != 0)) {
                if (c[D >> 2] | 0) {
                  l = (c[(B + 296) >> 2] | 0) == 4;
                  a[y >> 0] = l & 1;
                  if (!l) break;
                } else a[y >> 0] = 1;
                Dc(d, 0);
              } else a[y >> 0] = 0;
            while (0);
            t = (d + 160) | 0;
            u = (B + 320) | 0;
            i = (B + 11680) | 0;
            v = (1 << C) << C;
            j = (v | 0) > 0;
            k = (d + 5856 + ((C + -2) << 2)) | 0;
            s = (B + 284) | 0;
            n = 0;
            do {
              q = ((n << C) + f) | 0;
              if ((c[D >> 2] | 0) == 1) {
                _d(d, e, q, x, w);
                Rc(d, e, q, C, 1);
              }
              if (!(c[(o + (n << 2)) >> 2] | 0)) {
                if (a[y >> 0] | 0) {
                  l = c[t >> 2] | 0;
                  q = c[(l + 36) >> 2] | 0;
                  B = c[E >> 2] | 0;
                  r = R(f >> c[(B + 13184) >> 2], q) | 0;
                  r =
                    ((c[(l + 4) >> 2] | 0) +
                      (((e >> c[(B + 13172) >> 2]) << c[(B + 56) >> 2]) + r)) |
                    0;
                  if (j) {
                    n = 0;
                    do {
                      b[(i + (n << 1)) >> 1] =
                        (R(b[(u + (n << 1)) >> 1] | 0, c[s >> 2] | 0) | 0) >>>
                        3;
                      n = (n + 1) | 0;
                    } while ((n | 0) != (v | 0));
                    n = v;
                  } else n = 0;
                  Da[c[k >> 2] & 7](r, i, q);
                }
              } else Eb(d, e, q, C, A, 1);
              n = (n + 1) | 0;
            } while (
              (n | 0) <
              (((c[((c[E >> 2] | 0) + 4) >> 2] | 0) == 2 ? 2 : 1) | 0)
            );
            if (!(a[y >> 0] | 0)) n = 0;
            else {
              Dc(d, 1);
              n = 0;
            }
            do {
              q = ((n << C) + f) | 0;
              if ((c[D >> 2] | 0) == 1) {
                _d(d, e, q, x, w);
                Rc(d, e, q, C, 2);
              }
              if (!(c[(p + (n << 2)) >> 2] | 0)) {
                if (a[y >> 0] | 0) {
                  B = c[t >> 2] | 0;
                  q = c[(B + 40) >> 2] | 0;
                  o = c[E >> 2] | 0;
                  r = R(f >> c[(o + 13188) >> 2], q) | 0;
                  r =
                    ((c[(B + 8) >> 2] | 0) +
                      (((e >> c[(o + 13176) >> 2]) << c[(o + 56) >> 2]) + r)) |
                    0;
                  if (j) {
                    n = 0;
                    do {
                      b[(i + (n << 1)) >> 1] =
                        (R(b[(u + (n << 1)) >> 1] | 0, c[s >> 2] | 0) | 0) >>>
                        3;
                      n = (n + 1) | 0;
                    } while ((n | 0) != (v | 0));
                    n = v;
                  } else n = 0;
                  Da[c[k >> 2] & 7](r, i, q);
                }
              } else Eb(d, e, q, C, A, 2);
              n = (n + 1) | 0;
            } while (
              (n | 0) <
              (((c[((c[E >> 2] | 0) + 4) >> 2] | 0) == 2 ? 2 : 1) | 0)
            );
            n = 0;
          }
        }
      while (0);
      return n | 0;
    }
    function Dc(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0;
      e = c[(a + 136) >> 2] | 0;
      d = Cb(a, b) | 0;
      if (!d) a = 0;
      else a = (1 - ((Db(a, b) | 0) << 1)) << (d + -1);
      c[(e + 284) >> 2] = a;
      return;
    }
    function Ec(b, e, f, g, h) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0;
      t = l;
      l = (l + 16) | 0;
      o = t;
      m = c[(b + 136) >> 2] | 0;
      i = c[(b + 200) >> 2] | 0;
      n = c[(i + 13084) >> 2] | 0;
      q = e >> n;
      r = f >> n;
      s = c[(i + 13156) >> 2] | 0;
      n = g >> n;
      i = c[(i + 13080) >> 2] | 0;
      g = ((1 << i) + -1) | 0;
      if (((a[(m + 309) >> 0] | 0) != 0) | (((g & f) | 0) != 0)) {
        j = ((R((r + -1) | 0, s) | 0) + q) | 0;
        j = d[((c[(b + 7592) >> 2] | 0) + j) >> 0] | 0;
      } else j = 1;
      if ((((g & e) | 0) != 0) | ((a[(m + 308) >> 0] | 0) != 0)) {
        e = (q + -1 + (R(r, s) | 0)) | 0;
        e = d[((c[(b + 7592) >> 2] | 0) + e) >> 0] | 0;
      } else e = 1;
      p = c[((c[(b + 3508) >> 2] | 0) + 16) >> 2] | 0;
      g = (((f >> i) << i) | 0) < (f | 0) ? j : 1;
      do
        if ((e | 0) == (g | 0))
          if (e >>> 0 < 2) {
            c[o >> 2] = 0;
            c[(o + 4) >> 2] = 1;
            i = 26;
            j = 0;
            g = 1;
            break;
          } else {
            c[o >> 2] = e;
            g = (((e + 29) & 31) + 2) | 0;
            c[(o + 4) >> 2] = g;
            i = (((e + 31) & 31) + 2) | 0;
            j = e;
            break;
          }
        else {
          c[o >> 2] = e;
          c[(o + 4) >> 2] = g;
          if (((g | 0) == 0) | ((e | 0) == 0)) {
            i = (e | 0) == 1 ? 26 : (g | 0) != 1 ? 1 : 26;
            j = e;
          } else {
            i = 0;
            j = e;
          }
        }
      while (0);
      k = (o + 8) | 0;
      c[k >> 2] = i;
      if (!h) {
        f = (o + 4) | 0;
        if ((j | 0) > (g | 0)) {
          e = g & 255;
          c[f >> 2] = j;
          c[o >> 2] = e;
          g = j;
        } else e = j;
        if ((e | 0) > (i | 0)) {
          h = i & 255;
          c[k >> 2] = e;
          c[o >> 2] = h;
          i = e;
          e = h;
        }
        if ((g | 0) > (i | 0)) {
          c[k >> 2] = g;
          c[f >> 2] = i & 255;
        }
        g = c[(m + 31264) >> 2] | 0;
        g = ((((g | 0) >= (e | 0)) & 1) + g) | 0;
        e = 1;
        do {
          g = ((((g | 0) >= (c[(o + (e << 2)) >> 2] | 0)) & 1) + g) | 0;
          e = (e + 1) | 0;
        } while ((e | 0) != 3);
      } else g = c[(o + (c[(m + 31260) >> 2] << 2)) >> 2] | 0;
      h = (n | 0) == 0 ? 1 : n;
      if ((h | 0) > 0) {
        k = (b + 7592) | 0;
        j = g & 255;
        i = 0;
        do {
          ah(
            ((c[k >> 2] | 0) + ((R((i + r) | 0, s) | 0) + q)) | 0,
            j | 0,
            h | 0
          ) | 0;
          f = (i + q) | 0;
          e = 0;
          do {
            a[
              (p + ((((f + (R((e + r) | 0, s) | 0)) | 0) * 12) | 0) + 10) >> 0
            ] = 0;
            e = (e + 1) | 0;
          } while ((e | 0) < (h | 0));
          i = (i + 1) | 0;
        } while ((i | 0) < (h | 0));
      }
      l = t;
      return g | 0;
    }
    function Fc(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0;
      d = c[(a + 16) >> 2] | 0;
      e = c[a >> 2] | 0;
      d = ((e & 1) | 0) == 0 ? d : (d + -1) | 0;
      d = ((e & 511) | 0) == 0 ? d : (d + -1) | 0;
      e = ((c[(a + 20) >> 2] | 0) - d) | 0;
      if ((e | 0) < (b | 0)) d = 0;
      else Qe(a, (d + b) | 0, (e - b) | 0);
      return d | 0;
    }
    function Gc(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0;
      e = ((b | 0) != 0) & (d >>> 0 < 2147483640);
      d = e ? d : 0;
      b = e ? b : 0;
      c[a >> 2] = b;
      c[(a + 12) >> 2] = d;
      c[(a + 16) >> 2] = d + 8;
      c[(a + 4) >> 2] = b + ((d + 7) >> 3);
      c[(a + 8) >> 2] = 0;
      return (e ? 0 : -1094995529) | 0;
    }
    function Hc(e, f, g, h, i, j, k, l, m, n, o) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      n = n | 0;
      o = o | 0;
      var p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0;
      v = c[(e + 136) >> 2] | 0;
      s = c[h >> 2] | 0;
      h = c[(h + 32) >> 2] | 0;
      r = c[(e + 200) >> 2] | 0;
      t = c[(r + 13120) >> 2] | 0;
      u = c[(r + 13124) >> 2] | 0;
      p = b[i >> 1] | 0;
      z = p & 3;
      i = b[(i + 2) >> 1] | 0;
      w = i & 3;
      switch (c[(e + 2428) >> 2] | 0) {
        case 1: {
          y = (a[((c[(e + 204) >> 2] | 0) + 37) >> 0] | 0) != 0;
          break;
        }
        case 0: {
          y = (a[((c[(e + 204) >> 2] | 0) + 38) >> 0] | 0) != 0;
          break;
        }
        default:
          y = 0;
      }
      x = d[(1717 + l) >> 0] | 0;
      q = ((p >> 2) + j) | 0;
      p = ((i >> 2) + k) | 0;
      j = R(p, h) | 0;
      i = c[(r + 56) >> 2] | 0;
      j = (s + ((q << i) + j)) | 0;
      if (
        !((!(((q | 0) < 3) | ((p | 0) < 4)) ? (q | 0) < ((-4 - l + t) | 0) : 0)
          ? (p | 0) < ((-4 - m + u) | 0)
          : 0)
      ) {
        s = 80 << i;
        k = 3 << i;
        va[c[(e + 7560) >> 2] & 1](
          (v + 320) | 0,
          (j + (0 - (((h * 3) | 0) + k))) | 0,
          s,
          h,
          (l + 7) | 0,
          (m + 7) | 0,
          (q + -3) | 0,
          (p + -3) | 0,
          t,
          u
        );
        j = (((s * 3) | 0) + k + (v + 320)) | 0;
        h = s;
      }
      i = ((w | 0) != 0) & 1;
      p = ((z | 0) != 0) & 1;
      if (y)
        ua[c[(e + 6248 + (x << 4) + (i << 3) + (p << 2)) >> 2] & 7](
          f,
          g,
          j,
          h,
          m,
          d[(e + 3101) >> 0] | 0,
          n,
          o,
          z,
          w,
          l
        );
      else
        Ea[c[(e + 6088 + (x << 4) + (i << 3) + (p << 2)) >> 2] & 7](
          f,
          g,
          j,
          h,
          m,
          z,
          w,
          l
        );
      return;
    }
    function Ic(e, f, g, h, i, j, k, l, m, n, o, p, q) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      n = n | 0;
      o = o | 0;
      p = p | 0;
      q = q | 0;
      var r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0;
      u = c[(e + 136) >> 2] | 0;
      t = c[(e + 200) >> 2] | 0;
      r = c[(t + 13172) >> 2] | 0;
      v = c[(t + 13120) >> 2] >> r;
      s = c[(t + 13184) >> 2] | 0;
      w = c[(t + 13124) >> 2] >> s;
      switch (c[(e + 2428) >> 2] | 0) {
        case 1: {
          B = (a[((c[(e + 204) >> 2] | 0) + 37) >> 0] | 0) != 0;
          break;
        }
        case 0: {
          B = (a[((c[(e + 204) >> 2] | 0) + 38) >> 0] | 0) != 0;
          break;
        }
        default:
          B = 0;
      }
      C = d[(1717 + m) >> 0] | 0;
      E = b[(o + (j << 2)) >> 1] | 0;
      D = (r + 2) | 0;
      A = E & ((1 << D) + -1);
      o = b[(o + (j << 2) + 2) >> 1] | 0;
      j = (s + 2) | 0;
      y = o & ((1 << j) + -1);
      z = A << (1 - r);
      x = y << (1 - s);
      s = ((E >> D) + k) | 0;
      j = ((o >> j) + l) | 0;
      r = R(j, i) | 0;
      o = c[(t + 56) >> 2] | 0;
      r = (h + (r + (s << o))) | 0;
      if (
        !((!(((s | 0) < 1) | ((j | 0) < 2)) ? (s | 0) < ((-2 - m + v) | 0) : 0)
          ? (j | 0) < ((-2 - n + w) | 0)
          : 0)
      ) {
        E = 80 << o;
        D = 1 << o;
        va[c[(e + 7560) >> 2] & 1](
          (u + 320) | 0,
          (r + (0 - (D + i))) | 0,
          E,
          i,
          (m + 3) | 0,
          (n + 3) | 0,
          (s + -1) | 0,
          (j + -1) | 0,
          v,
          w
        );
        r = (E + D + (u + 320)) | 0;
        i = E;
      }
      j = ((A | 0) != 0) & 1;
      o = ((y | 0) != 0) & 1;
      if (B)
        ua[c[(e + 7048 + (C << 4) + (o << 3) + (j << 2)) >> 2] & 7](
          f,
          g,
          r,
          i,
          n,
          b[(e + 3102) >> 1] | 0,
          p,
          q,
          z,
          x,
          m
        );
      else
        Ea[c[(e + 6888 + (C << 4) + (o << 3) + (j << 2)) >> 2] & 7](
          f,
          g,
          r,
          i,
          n,
          z,
          x,
          m
        );
      return;
    }
    function Jc(b, e) {
      b = b | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0;
      j = l;
      l = (l + 16) | 0;
      g = j;
      ic(b);
      f = Pc(b, e) | 0;
      if ((f | 0) < 0) {
        ic(b);
        c[(b + 200) >> 2] = 0;
      } else {
        h = (b + 4) | 0;
        i = c[h >> 2] | 0;
        c[(i + 124) >> 2] = c[(e + 13120) >> 2];
        c[(i + 128) >> 2] = c[(e + 13124) >> 2];
        c[(i + 116) >> 2] = c[(e + 12) >> 2];
        c[(i + 120) >> 2] = c[(e + 16) >> 2];
        c[(i + 136) >> 2] = c[(e + 60) >> 2];
        c[(i + 172) >> 2] =
          c[
            (e + 76 + (((((c[(e + 72) >> 2] | 0) + -1) | 0) * 12) | 0) + 4) >> 2
          ];
        i = (e + 160) | 0;
        c[g >> 2] = c[i >> 2];
        c[(g + 4) >> 2] = c[(i + 4) >> 2];
        if (!(c[(e + 176) >> 2] | 0)) f = 1;
        else f = c[(e + 184) >> 2] | 0 ? 2 : 1;
        i = c[h >> 2] | 0;
        c[(i + 392) >> 2] = f;
        if (!(c[(e + 188) >> 2] | 0)) {
          f = 2;
          g = 2;
          h = 2;
        } else {
          f = d[(e + 194) >> 0] | 0;
          g = d[(e + 193) >> 0] | 0;
          h = d[(e + 192) >> 0] | 0;
        }
        c[(i + 380) >> 2] = h;
        c[(i + 384) >> 2] = g;
        c[(i + 388) >> 2] = f;
        g = (e + 52) | 0;
        ld((b + 5852) | 0, c[g >> 2] | 0);
        bf((b + 7560) | 0, c[g >> 2] | 0);
        g = (b + 200) | 0;
        if (a[(e + 12941) >> 0] | 0) {
          f = c[g >> 2] | 0;
          h = c[(f + 4) >> 2] | 0 ? 3 : 1;
          i = ((1 << c[(f + 13080) >> 2]) + 2) | 0;
          i = R(i, i) | 0;
          c[(b + 168) >> 2] = cf(i << c[(f + 56) >> 2]) | 0;
          f = 0;
          do {
            i = c[g >> 2] | 0;
            k = c[(i + 13124) >> 2] >> c[(i + 13180 + (f << 2)) >> 2];
            m =
              R(
                (c[(i + 13120) >> 2] >> c[(i + 13168 + (f << 2)) >> 2]) << 1,
                c[(i + 13132) >> 2] | 0
              ) | 0;
            c[(b + 172 + (f << 2)) >> 2] = cf(m << c[(i + 56) >> 2]) | 0;
            i = c[g >> 2] | 0;
            k = R(k << 1, c[(i + 13128) >> 2] | 0) | 0;
            c[(b + 184 + (f << 2)) >> 2] = cf(k << c[(i + 56) >> 2]) | 0;
            f = (f + 1) | 0;
          } while ((f | 0) < (h | 0));
        }
        c[g >> 2] = e;
        c[(b + 196) >> 2] =
          c[((c[(b + 208 + (c[e >> 2] << 2)) >> 2] | 0) + 4) >> 2];
        f = 0;
      }
      l = j;
      return f | 0;
    }
    function Kc(b, f, g) {
      b = b | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0;
      n = c[(b + 200) >> 2] | 0;
      o = (n + 64) | 0;
      p = c[o >> 2] | 0;
      q = (f + 160) | 0;
      a[q >> 0] = 0;
      if (a[(n + 12942) >> 0] | 0) {
        m = (n + 13040) | 0;
        if (!(a[m >> 0] | 0)) l = 0;
        else l = Ye(g) | 0;
        h = Ye(g) | 0;
        k = $g(h | 0, 0, l | 0, 0) | 0;
        j = C;
        if (!((j >>> 0 > 0) | (((j | 0) == 0) & (k >>> 0 > 32)))) {
          k = (h + l) | 0;
          a[q >> 0] = k;
          if (!(k & 255)) h = 0;
          else {
            k = (b + 5816) | 0;
            j = (b + 2432) | 0;
            i = 0;
            h = 0;
            do {
              if (i >>> 0 < l >>> 0) {
                b = a[m >> 0] | 0;
                if ((b & 255) > 1) {
                  s = (((b & 255) << 1) + -2) | 0;
                  b = s >>> 0 > 65535;
                  s = b ? s >>> 16 : s;
                  b = b ? 16 : 0;
                  r = ((s & 65280) | 0) == 0;
                  b =
                    Te(
                      g,
                      ((d[(2511 + (r ? s : s >>> 8)) >> 0] | 0) +
                        (r ? b : b | 8)) |
                        0
                    ) | 0;
                } else b = 0;
                b = b & 255;
                c[(f + (i << 2)) >> 2] = e[(n + 12944 + (b << 1)) >> 1];
                b = a[(n + 13008 + b) >> 0] | 0;
              } else {
                c[(f + (i << 2)) >> 2] = Te(g, c[o >> 2] | 0) | 0;
                b = (We(g) | 0) & 255;
              }
              a[(f + 128 + i) >> 0] = b;
              if ((((We(g) | 0) & 255) << 24) >> 24) {
                s = Ye(g) | 0;
                h = (s + (((i | 0) == 0) | ((i | 0) == (l | 0)) ? 0 : h)) | 0;
                s = (f + (i << 2)) | 0;
                c[s >> 2] =
                  (c[k >> 2] | 0) -
                  (h << p) -
                  (c[j >> 2] | 0) +
                  (c[s >> 2] | 0);
              }
              i = (i + 1) | 0;
            } while ((i | 0) < (d[q >> 0] | 0));
            h = 0;
          }
        } else h = -1094995529;
      } else h = 0;
      return h | 0;
    }
    function Lc(e, f) {
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
      p = l;
      l = (l + 32) | 0;
      k = (p + 16) | 0;
      n = p;
      o = (e + 3101) | 0;
      a[o >> 0] = Ye(f) | 0;
      i = (e + 200) | 0;
      if (c[((c[i >> 2] | 0) + 4) >> 2] | 0) {
        m = Mc(f) | 0;
        m = ((d[o >> 0] | 0) + m) | 0;
        b[(e + 3102) >> 1] = (m | 0) < 0 ? 0 : ((m | 0) < 7 ? m : 7) & 65535;
      }
      m = (e + 3036) | 0;
      if (!(c[m >> 2] | 0)) h = 0;
      else {
        g = 0;
        do {
          h = (We(f) | 0) & 255;
          a[(k + g) >> 0] = h;
          if (!((h << 24) >> 24)) {
            b[(e + 3104 + (g << 1)) >> 1] = 1 << d[o >> 0];
            b[(e + 3296 + (g << 1)) >> 1] = 0;
          }
          g = (g + 1) | 0;
          h = c[m >> 2] | 0;
        } while (g >>> 0 < h >>> 0);
      }
      g = (h | 0) != 0;
      if (!(c[((c[i >> 2] | 0) + 4) >> 2] | 0)) {
        if (g) {
          ah(n | 0, 0, h | 0) | 0;
          j = 12;
        }
      } else if (g) {
        g = 0;
        do {
          a[(n + g) >> 0] = We(f) | 0;
          g = (g + 1) | 0;
          h = c[m >> 2] | 0;
        } while (g >>> 0 < h >>> 0);
        if (h | 0) j = 12;
      }
      if ((j | 0) == 12) {
        i = (e + 3102) | 0;
        h = 0;
        do {
          if (a[(k + h) >> 0] | 0) {
            j = Mc(f) | 0;
            b[(e + 3104 + (h << 1)) >> 1] = (1 << d[o >> 0]) + j;
            b[(e + 3296 + (h << 1)) >> 1] = Mc(f) | 0;
          }
          if (!(a[(n + h) >> 0] | 0)) {
            j = (1 << b[i >> 1]) & 65535;
            b[(e + 3136 + (h << 2)) >> 1] = j;
            b[(e + 3328 + (h << 2)) >> 1] = 0;
            b[(e + 3136 + (h << 2) + 2) >> 1] = j;
            b[(e + 3328 + (h << 2) + 2) >> 1] = 0;
          } else {
            g = 0;
            do {
              j = Mc(f) | 0;
              q = Mc(f) | 0;
              j = ((1 << b[i >> 1]) + j) | 0;
              b[(e + 3136 + (h << 2) + (g << 1)) >> 1] = j;
              j = (q - (((j << 16) >> 9) >> b[i >> 1]) + 128) | 0;
              b[(e + 3328 + (h << 2) + (g << 1)) >> 1] =
                (j | 0) < -128 ? -128 : ((j | 0) < 127 ? j : 127) & 65535;
              g = (g + 1) | 0;
            } while ((g | 0) != 2);
          }
          h = (h + 1) | 0;
        } while (h >>> 0 < (c[m >> 2] | 0) >>> 0);
      }
      l = p;
      return;
    }
    function Mc(a) {
      a = a | 0;
      return $e(a) | 0;
    }
    function Nc(a) {
      a = a | 0;
      var b = 0;
      b = c[(a + 12) >> 2] | 0;
      return (b - (Oc(a) | 0)) | 0;
    }
    function Oc(a) {
      a = a | 0;
      return c[(a + 8) >> 2] | 0;
    }
    function Pc(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
      d = c[(b + 13064) >> 2] | 0;
      j = c[(b + 13120) >> 2] | 0;
      o = c[(b + 13124) >> 2] | 0;
      d = R(((o >> d) + 1) | 0, ((j >> d) + 1) | 0) | 0;
      e = R(c[(b + 13132) >> 2] | 0, c[(b + 13128) >> 2] | 0) | 0;
      f = (b + 13156) | 0;
      g = (b + 13160) | 0;
      h = R(c[g >> 2] | 0, c[f >> 2] | 0) | 0;
      i = (a + 5840) | 0;
      c[i >> 2] = (j >> 2) + 1;
      j = (a + 5844) | 0;
      c[j >> 2] = (o >> 2) + 1;
      o = (a + 3492) | 0;
      c[o >> 2] = pf(e, 148) | 0;
      p = pf(e, 8) | 0;
      c[(a + 3496) >> 2] = p;
      if (
        (
          (
            (
              (
                (
                  (
                    (
                      !(((p | 0) == 0) | ((c[o >> 2] | 0) == 0))
                        ? ((q = (b + 13144) | 0),
                          (o = (b + 13140) | 0),
                          (p = (a + 7584) | 0),
                          (c[p >> 2] =
                            cf(R(c[o >> 2] | 0, c[q >> 2] | 0) | 0) | 0),
                          (o = of(c[q >> 2] | 0, c[o >> 2] | 0) | 0),
                          (c[(a + 7588) >> 2] = o),
                          !(((o | 0) == 0) | ((c[p >> 2] | 0) == 0)))
                        : 0
                    )
                      ? ((k = (a + 7596) | 0),
                        (c[k >> 2] =
                          of(c[(b + 13148) >> 2] | 0, c[(b + 13152) >> 2] | 0) |
                          0),
                        (q = (a + 7592) | 0),
                        (c[q >> 2] = lf(h) | 0),
                        (l =
                          cf(
                            R(
                              ((c[g >> 2] | 0) + 1) | 0,
                              ((c[f >> 2] | 0) + 1) | 0
                            ) | 0
                          ) | 0),
                        (c[(a + 7600) >> 2] = l),
                        (c[q >> 2] | 0) != 0)
                      : 0
                  )
                    ? !(((l | 0) == 0) | ((c[k >> 2] | 0) == 0))
                    : 0
                )
                  ? ((m = (a + 7604) | 0),
                    (c[m >> 2] = cf(e) | 0),
                    (n = (a + 7580) | 0),
                    (c[n >> 2] = of(d, 4) | 0),
                    (q = of(d, 1) | 0),
                    (c[(a + 7568) >> 2] = q),
                    (q | 0) != 0)
                  : 0
              )
                ? (c[m >> 2] | 0) != 0
                : 0
            )
              ? (c[n >> 2] | 0) != 0
              : 0
          )
            ? ((q = (a + 7572) | 0),
              (c[q >> 2] = pf(c[i >> 2] | 0, c[j >> 2] | 0) | 0),
              (p = pf(c[i >> 2] | 0, c[j >> 2] | 0) | 0),
              (c[(a + 7576) >> 2] = p),
              !(((p | 0) == 0) | ((c[q >> 2] | 0) == 0)))
            : 0
        )
          ? ((q = (a + 1428) | 0),
            (c[q >> 2] = yf((h * 12) | 0, 3) | 0),
            (p = yf((e * 392) | 0, 3) | 0),
            (c[(a + 1432) >> 2] = p),
            !(((p | 0) == 0) | ((c[q >> 2] | 0) == 0)))
          : 0
      )
        a = 0;
      else {
        ic(a);
        a = -12;
      }
      return a | 0;
    }
    function Qc(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0;
      f = c[(b + 60) >> 2] | 0;
      c[(f + 4) >> 2] = b;
      d = lf(31328) | 0;
      c[(f + 136) >> 2] = d;
      a: do
        if (
          (
            (d | 0) != 0
              ? ((c[(f + 72) >> 2] = d),
                (c[(f + 8) >> 2] = f),
                (e = cf(199) | 0),
                (c[(f + 152) >> 2] = e),
                (e | 0) != 0)
              : 0
          )
            ? ((e = Mf() | 0), (c[(f + 164) >> 2] = e), (e | 0) != 0)
            : 0
        ) {
          d = 0;
          do {
            e = Mf() | 0;
            c[(f + 3512 + ((d * 72) | 0)) >> 2] = e;
            if (!e) {
              g = 7;
              break a;
            }
            c[(f + 3512 + ((d * 72) | 0) + 4) >> 2] = e;
            d = (d + 1) | 0;
          } while (d >>> 0 < 32);
          c[(f + 5836) >> 2] = 2147483647;
          a[(f + 7721) >> 0] = 1;
          c[(f + 5828) >> 2] = 0;
          d = 0;
        } else g = 7;
      while (0);
      if ((g | 0) == 7) {
        gc(b) | 0;
        d = -12;
      }
      return d | 0;
    }
    function Rc(b, e, f, g, h) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        _ = 0,
        $ = 0,
        aa = 0,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0,
        fa = 0,
        ga = 0,
        ha = 0,
        ia = 0,
        ja = 0,
        ka = 0,
        la = 0,
        ma = 0,
        na = 0,
        oa = 0,
        pa = 0,
        qa = 0,
        ra = 0,
        sa = 0;
      sa = l;
      l = (l + 272) | 0;
      ga = (sa + 195) | 0;
      ia = (sa + 130) | 0;
      ca = (sa + 65) | 0;
      ja = sa;
      ma = c[(b + 136) >> 2] | 0;
      na = c[(b + 200) >> 2] | 0;
      X = c[(na + 13168 + (h << 2)) >> 2] | 0;
      W = c[(na + 13180 + (h << 2)) >> 2] | 0;
      oa = 1 << g;
      u = oa << X;
      i = c[(na + 13072) >> 2] | 0;
      t = oa << W;
      m = c[(na + 13164) >> 2] | 0;
      n = (e >> i) & m;
      o = (f >> i) & m;
      s = c[(b + 204) >> 2] | 0;
      p = c[(s + 1684) >> 2] | 0;
      q = (m + 2) | 0;
      r = c[(p + (((R(o, q) | 0) + n) << 2)) >> 2] | 0;
      qa = c[(b + 160) >> 2] | 0;
      pa = c[(qa + 32 + (h << 2)) >> 2] | 0;
      F = (0 - pa) | 0;
      qa = ((c[(qa + (h << 2)) >> 2] | 0) + (e >> X) + (R(pa, f >> W) | 0)) | 0;
      Y = c[(na + 13156) >> 2] | 0;
      aa = (h | 0) == 0;
      ra = c[(aa ? (ma + 288) | 0 : (ma + 292) | 0) >> 2] | 0;
      k = (ga + 1) | 0;
      j = (ca + 1) | 0;
      ka = (ia + 1) | 0;
      la = (ja + 1) | 0;
      if (!(c[(ma + 31288) >> 2] | 0)) v = 0;
      else
        v =
          (r | 0) >
          (c[(p + ((n + -1 + (R((o + (t >> i)) & m, q) | 0)) << 2)) >> 2] | 0);
      w = v & 1;
      x = c[(ma + 31292) >> 2] | 0;
      z = c[(ma + 31300) >> 2] | 0;
      C = c[(ma + 31296) >> 2] | 0;
      if (!(c[(ma + 31304) >> 2] | 0)) A = 0;
      else
        A =
          (r | 0) >
          (c[
            (p + (((R(q, (o + -1) | 0) | 0) + (m & (n + (u >> i)))) << 2)) >> 2
          ] |
            0);
      n = A & 1;
      N = ((t << 1) + f) | 0;
      L = (na + 13124) | 0;
      D = c[L >> 2] | 0;
      M = (t + f) | 0;
      N = (((N | 0) > (D | 0) ? D : N) - M) >> W;
      D = ((u << 1) + e) | 0;
      J = (na + 13120) | 0;
      I = c[J >> 2] | 0;
      K = (u + e) | 0;
      D = (((D | 0) > (I | 0) ? I : D) - K) >> X;
      I = (s + 20) | 0;
      if ((a[I >> 0] | 0) == 1) {
        B = c[(na + 13084) >> 2] | 0;
        t = t >> B;
        y = u >> B;
        u = ((1 << B) + -1) | 0;
        s = ((u & e) | 0) == 0;
        u = ((u & f) | 0) == 0;
        y = ((((y | 0) == 0) & 1) + y) | 0;
        if (v & s) {
          p = (e + -1) >> B;
          q = M >> B;
          o = ((c[(na + 13160) >> 2] | 0) - q) | 0;
          o = (t | 0) > (o | 0) ? o : t;
          if ((o | 0) > 0) {
            r = c[((c[(b + 3508) >> 2] | 0) + 16) >> 2] | 0;
            m = 0;
            i = 0;
            do {
              i =
                ((a[
                  (r + (((((R((m + q) | 0, Y) | 0) + p) | 0) * 12) | 0) + 10) >>
                    0
                ] |
                  0) ==
                  0) |
                i;
              m = (m + 2) | 0;
            } while ((m | 0) < (o | 0));
            w = i;
          } else w = 0;
        }
        if (((x | 0) == 1) & s) {
          q = (e + -1) >> B;
          r = f >> B;
          o = ((c[(na + 13160) >> 2] | 0) - r) | 0;
          o = (t | 0) > (o | 0) ? o : t;
          if ((o | 0) > 0) {
            p = c[((c[(b + 3508) >> 2] | 0) + 16) >> 2] | 0;
            i = 0;
            m = 0;
            do {
              i =
                ((a[
                  (p + (((((R((m + r) | 0, Y) | 0) + q) | 0) * 12) | 0) + 10) >>
                    0
                ] |
                  0) ==
                  0) |
                i;
              m = (m + 2) | 0;
            } while ((m | 0) < (o | 0));
            s = i;
          } else s = 0;
        } else s = x;
        if ((z | 0) == 1)
          r =
            ((a[
              ((c[((c[(b + 3508) >> 2] | 0) + 16) >> 2] | 0) +
                (((((R((f + -1) >> B, Y) | 0) + ((e + -1) >> B)) | 0) * 12) |
                  0) +
                10) >>
                0
            ] |
              0) ==
              0) &
            1;
        else r = z;
        if (((C | 0) == 1) & u) {
          i = e >> B;
          p = (Y - i) | 0;
          p = (y | 0) > (p | 0) ? p : y;
          if ((p | 0) > 0) {
            q = c[((c[(b + 3508) >> 2] | 0) + 16) >> 2] | 0;
            o = ((R((f + -1) >> B, Y) | 0) + i) | 0;
            i = 0;
            m = 0;
            do {
              i =
                ((a[(q + ((((o + m) | 0) * 12) | 0) + 10) >> 0] | 0) == 0) | i;
              m = (m + 2) | 0;
            } while ((m | 0) < (p | 0));
            q = i;
          } else q = 0;
        } else q = C;
        if (A & u) {
          i = K >> B;
          o = (Y - i) | 0;
          o = (y | 0) > (o | 0) ? o : y;
          if ((o | 0) > 0) {
            p = c[((c[(b + 3508) >> 2] | 0) + 16) >> 2] | 0;
            n = ((R((f + -1) >> B, Y) | 0) + i) | 0;
            i = 0;
            m = 0;
            do {
              i =
                ((a[(p + ((((n + m) | 0) * 12) | 0) + 10) >> 0] | 0) == 0) | i;
              m = (m + 2) | 0;
            } while ((m | 0) < (o | 0));
            n = i;
          } else n = 0;
        }
        i = k;
        m = (i + 64) | 0;
        do {
          a[i >> 0] = 128;
          i = (i + 1) | 0;
        } while ((i | 0) < (m | 0));
        i = ca;
        m = (i + 65) | 0;
        do {
          a[i >> 0] = 128;
          i = (i + 1) | 0;
        } while ((i | 0) < (m | 0));
        z = r;
        x = s;
        C = q;
        p = n;
      } else p = n;
      B = (z | 0) != 0;
      if (B) {
        T = a[(qa + ~pa) >> 0] | 0;
        a[ga >> 0] = T;
        a[ca >> 0] = T;
      }
      P = (C | 0) != 0;
      if (P) fh(j | 0, (qa + F) | 0, oa | 0) | 0;
      T = (p | 0) != 0;
      if (
        T
          ? ((E = (j + oa) | 0),
            fh(E | 0, (qa + F + oa) | 0, oa | 0) | 0,
            (G = R(d[(qa + (oa + -1 - pa + D)) >> 0] | 0, 16843009) | 0),
            (H = (oa - D) | 0),
            (H | 0) > 0)
          : 0
      ) {
        m = (E + D) | 0;
        i = 0;
        do {
          F = (m + i) | 0;
          a[F >> 0] = G;
          a[(F + 1) >> 0] = G >> 8;
          a[(F + 2) >> 0] = G >> 16;
          a[(F + 3) >> 0] = G >> 24;
          i = (i + 4) | 0;
        } while ((i | 0) < (H | 0));
      }
      A = (x | 0) != 0;
      if (A & ((g | 0) != 31)) {
        i = 0;
        do {
          a[(k + i) >> 0] = a[(qa + ((R(i, pa) | 0) + -1)) >> 0] | 0;
          i = (i + 1) | 0;
        } while ((i | 0) < (oa | 0));
      }
      y = (w | 0) != 0;
      if (y) {
        m = (N + oa) | 0;
        if ((N | 0) > 0) {
          i = oa;
          do {
            a[(k + i) >> 0] = a[(qa + ((R(i, pa) | 0) + -1)) >> 0] | 0;
            i = (i + 1) | 0;
          } while ((i | 0) < (m | 0));
        }
        m =
          R(d[(qa + ((R((m + -1) | 0, pa) | 0) + -1)) >> 0] | 0, 16843009) | 0;
        n = (oa - N) | 0;
        if ((n | 0) > 0) {
          o = (k + oa + N) | 0;
          i = 0;
          do {
            H = (o + i) | 0;
            a[H >> 0] = m;
            a[(H + 1) >> 0] = m >> 8;
            a[(H + 2) >> 0] = m >> 16;
            a[(H + 3) >> 0] = m >> 24;
            i = (i + 4) | 0;
          } while ((i | 0) < (n | 0));
        }
      }
      if (
        (a[I >> 0] | 0) == 1
          ? ((O = w | x), (Q = (O | 0) != 0), (O = O | z), C | p | O | 0)
          : 0
      ) {
        I = oa << 1;
        J = c[J >> 2] | 0;
        w = (J - e) >> X;
        L = c[L >> 2] | 0;
        v = (L - f) >> W;
        w = T
          ? (((I << X) + e) | 0) < (J | 0)
            ? I
            : w
          : (K | 0) < (J | 0)
          ? oa
          : w;
        v = y
          ? (((I << W) + f) | 0) < (L | 0)
            ? I
            : v
          : (M | 0) < (L | 0)
          ? oa
          : v;
        a: do
          if (!O)
            if ((w | 0) > 0) {
              m = c[((c[(b + 3508) >> 2] | 0) + 16) >> 2] | 0;
              n = c[(na + 13084) >> 2] | 0;
              o = R(((-1 << W) + f) >> n, Y) | 0;
              i = 0;
              do {
                if (
                  !(
                    a[
                      (m +
                        ((((o + (((i << X) + e) >> n)) | 0) * 12) | 0) +
                        10) >>
                        0
                    ] | 0
                  )
                )
                  break;
                i = (i + 1) | 0;
              } while ((i | 0) < (w | 0));
              if ((i | 0) > 0) {
                n = ((c[(b + 3508) >> 2] | 0) + 16) | 0;
                o = (na + 13084) | 0;
                p = ((-1 << W) + f) | 0;
                if ((e | 0) > 0)
                  while (1) {
                    m = i;
                    i = (i + -1) | 0;
                    V = c[o >> 2] | 0;
                    if (
                      a[
                        ((c[n >> 2] | 0) +
                          (((((R(p >> V, Y) | 0) + (((i << X) + e) >> V)) | 0) *
                            12) |
                            0) +
                          10) >>
                          0
                      ] | 0
                    )
                      a[(j + i) >> 0] = a[(j + m) >> 0] | 0;
                    if ((m | 0) <= 0) {
                      V = 71;
                      break a;
                    }
                  }
                do {
                  m = i;
                  i = (i + -1) | 0;
                  V = c[o >> 2] | 0;
                  if (
                    a[
                      ((c[n >> 2] | 0) +
                        (((((R(p >> V, Y) | 0) + (((i << X) + e) >> V)) | 0) *
                          12) |
                          0) +
                        10) >>
                        0
                    ] | 0
                  )
                    a[(j + i) >> 0] = a[(j + m) >> 0] | 0;
                } while ((m | 0) > 1);
                a[ca >> 0] = a[j >> 0] | 0;
                V = 71;
              } else V = 71;
            } else V = 71;
          else {
            q = (na + 13084) | 0;
            o = c[q >> 2] | 0;
            r = ((c[(b + 3508) >> 2] | 0) + 16) | 0;
            n = c[r >> 2] | 0;
            p = ((-1 << X) + e) >> o;
            i = ((y ? N : 0) + oa) | 0;
            do {
              O = i;
              i = (i + -1) | 0;
              m =
                (a[
                  (n +
                    (((((R(((i << W) + f) >> o, Y) | 0) + p) | 0) * 12) | 0) +
                    10) >>
                    0
                ] |
                  0) ==
                0;
            } while (!(((O | 0) < 1) | m));
            if (m) {
              i = a[ca >> 0] | 0;
              break;
            }
            if ((w | 0) > 0) {
              m = R(((-1 << W) + f) >> o, Y) | 0;
              i = 0;
              do {
                if (
                  !(
                    a[
                      (n +
                        ((((m + (((i << X) + e) >> o)) | 0) * 12) | 0) +
                        10) >>
                        0
                    ] | 0
                  )
                )
                  break;
                i = (i + 1) | 0;
              } while ((i | 0) < (w | 0));
              if ((i | 0) <= -1) {
                V = 71;
                break;
              }
            } else i = 0;
            p = ((-1 << W) + f) | 0;
            while (1) {
              m = (i + -1) | 0;
              if (
                a[
                  (n +
                    (((((R(p >> o, Y) | 0) + (((m << X) + e) >> o)) | 0) * 12) |
                      0) +
                    10) >>
                    0
                ] | 0
              )
                a[(j + m) >> 0] = a[(j + i) >> 0] | 0;
              if ((i | 0) <= 0) {
                V = 71;
                break a;
              }
              i = m;
              o = c[q >> 2] | 0;
              n = c[r >> 2] | 0;
            }
          }
        while (0);
        if ((V | 0) == 71) {
          i = a[ca >> 0] | 0;
          a[ga >> 0] = i;
        }
        a[ga >> 0] = i;
        if (Q & ((v | 0) > 0)) {
          i = R(i & 255, 16843009) | 0;
          n = ((c[(b + 3508) >> 2] | 0) + 16) | 0;
          o = ((-1 << X) + e) | 0;
          p = (na + 13084) | 0;
          m = 0;
          do {
            Q = c[p >> 2] | 0;
            if (
              !(
                a[
                  ((c[n >> 2] | 0) +
                    (((((R(((m << W) + f) >> Q, Y) | 0) + (o >> Q)) | 0) * 12) |
                      0) +
                    10) >>
                    0
                ] | 0
              )
            )
              i = R(d[(k + (m | 3)) >> 0] | 0, 16843009) | 0;
            else {
              Q = (k + m) | 0;
              a[Q >> 0] = i;
              a[(Q + 1) >> 0] = i >> 8;
              a[(Q + 2) >> 0] = i >> 16;
              a[(Q + 3) >> 0] = i >> 24;
            }
            m = (m + 4) | 0;
          } while ((m | 0) < (v | 0));
        }
        if (!A ? ((S = R(d[ga >> 0] | 0, 16843009) | 0), (g | 0) != 31) : 0) {
          i = 0;
          do {
            Q = (k + i) | 0;
            a[Q >> 0] = S;
            a[(Q + 1) >> 0] = S >> 8;
            a[(Q + 2) >> 0] = S >> 16;
            a[(Q + 3) >> 0] = S >> 24;
            i = (i + 4) | 0;
          } while ((i | 0) < (oa | 0));
        }
        if (
          !y
            ? ((U = R(d[(k + (oa + -1)) >> 0] | 0, 16843009) | 0),
              (g | 0) != 31)
            : 0
        ) {
          m = (k + oa) | 0;
          i = 0;
          do {
            S = (m + i) | 0;
            a[S >> 0] = U;
            a[(S + 1) >> 0] = U >> 8;
            a[(S + 2) >> 0] = U >> 16;
            a[(S + 3) >> 0] = U >> 24;
            i = (i + 4) | 0;
          } while ((i | 0) < (oa | 0));
        }
        u = (f | 0) != 0;
        do
          if (((e | 0) != 0) & u) {
            o = (v + -1) | 0;
            r = ((c[(b + 3508) >> 2] | 0) + 16) | 0;
            i = c[r >> 2] | 0;
            s = ((-1 << X) + e) | 0;
            t = (na + 13084) | 0;
            m = c[t >> 2] | 0;
            n = s >> m;
            if ((v | 0) > 0) {
              q = o;
              p = R(d[(k + o) >> 0] | 0, 16843009) | 0;
              while (1) {
                U = (q + -3) | 0;
                o = (k + U) | 0;
                if (
                  !(
                    a[
                      (i +
                        (((((R(((U << W) + f) >> m, Y) | 0) + n) | 0) * 12) |
                          0) +
                        10) >>
                        0
                    ] | 0
                  )
                )
                  o = R(d[o >> 0] | 0, 16843009) | 0;
                else {
                  a[o >> 0] = p;
                  a[(o + 1) >> 0] = p >> 8;
                  a[(o + 2) >> 0] = p >> 16;
                  a[(o + 3) >> 0] = p >> 24;
                  o = p;
                  m = c[t >> 2] | 0;
                  i = c[r >> 2] | 0;
                }
                q = (q + -4) | 0;
                n = s >> m;
                if ((q | 0) <= -1) break;
                else p = o;
              }
            }
            if (
              a[
                (i +
                  (((((R(((-1 << W) + f) >> m, Y) | 0) + n) | 0) * 12) | 0) +
                  10) >>
                  0
              ] | 0
            )
              a[ga >> 0] = a[k >> 0] | 0;
          } else {
            if (!e) {
              if ((v | 0) <= 0) break;
              ah(k | 0, 0, ((v + 3) & -4) | 0) | 0;
              break;
            }
            i = (v + -1) | 0;
            if ((v | 0) > 0) {
              U = R(d[(k + i) >> 0] | 0, 16843009) | 0;
              o = ((c[(b + 3508) >> 2] | 0) + 16) | 0;
              p = ((-1 << X) + e) | 0;
              q = (na + 13084) | 0;
              n = i;
              i = U;
              do {
                U = c[q >> 2] | 0;
                S = (n + -3) | 0;
                m = (k + S) | 0;
                if (
                  !(
                    a[
                      ((c[o >> 2] | 0) +
                        (((((R(((S << W) + f) >> U, Y) | 0) + (p >> U)) | 0) *
                          12) |
                          0) +
                        10) >>
                        0
                    ] | 0
                  )
                )
                  i = R(d[m >> 0] | 0, 16843009) | 0;
                else {
                  a[m >> 0] = i;
                  a[(m + 1) >> 0] = i >> 8;
                  a[(m + 2) >> 0] = i >> 16;
                  a[(m + 3) >> 0] = i >> 24;
                }
                n = (n + -4) | 0;
              } while ((n | 0) > -1);
            }
          }
        while (0);
        i = a[ga >> 0] | 0;
        a[ca >> 0] = i;
        if (u & ((w | 0) > 0)) {
          i = R(i & 255, 16843009) | 0;
          o = ((c[(b + 3508) >> 2] | 0) + 16) | 0;
          p = (na + 13084) | 0;
          n = ((-1 << W) + f) | 0;
          m = 0;
          do {
            f = c[p >> 2] | 0;
            if (
              !(
                a[
                  ((c[o >> 2] | 0) +
                    (((((R(n >> f, Y) | 0) + (((m << X) + e) >> f)) | 0) * 12) |
                      0) +
                    10) >>
                    0
                ] | 0
              )
            )
              i = R(d[(j + (m | 3)) >> 0] | 0, 16843009) | 0;
            else {
              f = (j + m) | 0;
              a[f >> 0] = i;
              a[(f + 1) >> 0] = i >> 8;
              a[(f + 2) >> 0] = i >> 16;
              a[(f + 3) >> 0] = i >> 24;
            }
            m = (m + 4) | 0;
          } while ((m | 0) < (w | 0));
        }
      }
      b: do
        if (!y) {
          if (A) {
            m = R(d[(k + (oa + -1)) >> 0] | 0, 16843009) | 0;
            if ((g | 0) == 31) {
              V = 132;
              break;
            }
            n = (k + oa) | 0;
            i = 0;
            while (1) {
              Y = (n + i) | 0;
              a[Y >> 0] = m;
              a[(Y + 1) >> 0] = m >> 8;
              a[(Y + 2) >> 0] = m >> 16;
              a[(Y + 3) >> 0] = m >> 24;
              i = (i + 4) | 0;
              if ((i | 0) >= (oa | 0)) {
                V = 129;
                break b;
              }
            }
          }
          if (B) {
            m = R(d[ga >> 0] | 0, 16843009) | 0;
            n = oa << 1;
            if ((g | 0) == 31) {
              V = 134;
              break;
            } else i = 0;
            while (1) {
              Z = (k + i) | 0;
              a[Z >> 0] = m;
              a[(Z + 1) >> 0] = m >> 8;
              a[(Z + 2) >> 0] = m >> 16;
              a[(Z + 3) >> 0] = m >> 24;
              i = (i + 4) | 0;
              if ((i | 0) >= (n | 0)) {
                V = 132;
                break b;
              }
            }
          }
          if (P) {
            m = a[j >> 0] | 0;
            a[ga >> 0] = m;
            m = R(m & 255, 16843009) | 0;
            n = oa << 1;
            if ((g | 0) == 31) {
              V = 137;
              break;
            } else i = 0;
            while (1) {
              Z = (k + i) | 0;
              a[Z >> 0] = m;
              a[(Z + 1) >> 0] = m >> 8;
              a[(Z + 2) >> 0] = m >> 16;
              a[(Z + 3) >> 0] = m >> 24;
              i = (i + 4) | 0;
              if ((i | 0) >= (n | 0)) {
                V = 134;
                break b;
              }
            }
          }
          if (!T) {
            a[ga >> 0] = -128;
            m = oa << 1;
            if ((g | 0) == 31) {
              V = 133;
              break;
            }
            ah(j | 0, -128, ((((m | 0) > 4 ? m : 4) + 3) & -4) | 0) | 0;
            i = 0;
            while (1) {
              Y = (k + i) | 0;
              a[Y >> 0] = -2139062144;
              a[(Y + 1) >> 0] = -2139062144 >> 8;
              a[(Y + 2) >> 0] = -2139062144 >> 16;
              a[(Y + 3) >> 0] = -2139062144 >> 24;
              i = (i + 4) | 0;
              if ((i | 0) >= (m | 0)) {
                V = 129;
                break b;
              }
            }
          }
          m = (j + oa) | 0;
          i = a[m >> 0] | 0;
          n = R(i & 255, 16843009) | 0;
          o = (g | 0) == 31;
          if (o) {
            a[ga >> 0] = i;
            break;
          } else i = 0;
          do {
            _ = (j + i) | 0;
            a[_ >> 0] = n;
            a[(_ + 1) >> 0] = n >> 8;
            a[(_ + 2) >> 0] = n >> 16;
            a[(_ + 3) >> 0] = n >> 24;
            i = (i + 4) | 0;
          } while ((i | 0) < (oa | 0));
          m = a[m >> 0] | 0;
          a[ga >> 0] = m;
          m = R(m & 255, 16843009) | 0;
          n = oa << 1;
          if (o) V = 137;
          else {
            i = 0;
            do {
              _ = (k + i) | 0;
              a[_ >> 0] = m;
              a[(_ + 1) >> 0] = m >> 8;
              a[(_ + 2) >> 0] = m >> 16;
              a[(_ + 3) >> 0] = m >> 24;
              i = (i + 4) | 0;
            } while ((i | 0) < (n | 0));
            V = 137;
          }
        } else V = 129;
      while (0);
      if ((V | 0) == 129)
        if (
          (x | 0) == 0
            ? ((Z = R(d[(k + oa) >> 0] | 0, 16843009) | 0), (g | 0) != 31)
            : 0
        ) {
          i = 0;
          do {
            Y = (k + i) | 0;
            a[Y >> 0] = Z;
            a[(Y + 1) >> 0] = Z >> 8;
            a[(Y + 2) >> 0] = Z >> 16;
            a[(Y + 3) >> 0] = Z >> 24;
            i = (i + 4) | 0;
          } while ((i | 0) < (oa | 0));
          V = 132;
        } else V = 132;
      if ((V | 0) == 132)
        if (!z) V = 133;
        else V = 134;
      if ((V | 0) == 133) {
        a[ga >> 0] = a[k >> 0] | 0;
        V = 134;
      }
      if ((V | 0) == 134)
        if (
          (C | 0) == 0
            ? ((_ = R(d[ga >> 0] | 0, 16843009) | 0), (g | 0) != 31)
            : 0
        ) {
          i = 0;
          do {
            Z = (j + i) | 0;
            a[Z >> 0] = _;
            a[(Z + 1) >> 0] = _ >> 8;
            a[(Z + 2) >> 0] = _ >> 16;
            a[(Z + 3) >> 0] = _ >> 24;
            i = (i + 4) | 0;
          } while ((i | 0) < (oa | 0));
          V = 137;
        } else V = 137;
      if (
        ((V | 0) == 137 ? !T : 0)
          ? (($ = R(d[(j + (oa + -1)) >> 0] | 0, 16843009) | 0), (g | 0) != 31)
          : 0
      ) {
        m = (j + oa) | 0;
        i = 0;
        do {
          _ = (m + i) | 0;
          a[_ >> 0] = $;
          a[(_ + 1) >> 0] = $ >> 8;
          a[(_ + 2) >> 0] = $ >> 16;
          a[(_ + 3) >> 0] = $ >> 24;
          i = (i + 4) | 0;
        } while ((i | 0) < (oa | 0));
      }
      s = a[ga >> 0] | 0;
      a[ca >> 0] = s;
      c: do
        if (!(c[(na + 13112) >> 2] | 0)) {
          if (!aa ? (c[(na + 4) >> 2] | 0) != 3 : 0) break;
          if (
            ((g | 0) != 2) & ((ra | 0) != 1)
              ? (($ = (ra + -26) | 0),
                ($ = ($ | 0) > -1 ? $ : (26 - ra) | 0),
                (_ = (ra + -10) | 0),
                (_ = (_ | 0) > -1 ? _ : (10 - ra) | 0),
                ((($ | 0) > (_ | 0) ? _ : $) | 0) >
                  (c[(252 + ((g + -3) << 2)) >> 2] | 0))
              : 0
          ) {
            if (
              (
                ((g | 0) == 5) & (aa & ((a[(na + 13061) >> 0] | 0) != 0))
                  ? ((da = s & 255),
                    (ba = a[(ca + 64) >> 0] | 0),
                    (ea = ba & 255),
                    (ca = (ea + da - (d[(ca + 32) >> 0] << 1)) | 0),
                    (((ca | 0) > -1 ? ca : (0 - ca) | 0) | 0) < 8)
                  : 0
              )
                ? ((ha = (ga + 64) | 0),
                  (fa = a[ha >> 0] | 0),
                  (ca = ((fa & 255) + da - (d[(ga + 32) >> 0] << 1)) | 0),
                  (((ca | 0) > -1 ? ca : (0 - ca) | 0) | 0) < 8)
                : 0
            ) {
              a[ja >> 0] = s;
              a[(ja + 64) >> 0] = ba;
              i = 0;
              do {
                ka = i;
                i = (i + 1) | 0;
                a[(la + ka) >> 0] =
                  (((R(i, ea) | 0) + 32 + (R((63 - ka) | 0, da) | 0)) | 0) >>>
                  6;
              } while ((i | 0) != 63);
              a[k >> 0] =
                (((((s & 255) * 63) | 0) + 32 + (fa & 255)) | 0) >>> 6;
              i = 1;
              while (1) {
                ka = i;
                i = (i + 1) | 0;
                a[(k + ka) >> 0] =
                  (((R(d[ga >> 0] | 0, (63 - ka) | 0) | 0) +
                    32 +
                    (R(d[ha >> 0] | 0, i) | 0)) |
                    0) >>>
                  6;
                if ((i | 0) == 63) {
                  j = la;
                  break c;
                }
              }
            }
            r = oa << 1;
            q = (r + -1) | 0;
            i = a[(k + q) >> 0] | 0;
            a[(ka + q) >> 0] = i;
            m = a[(j + q) >> 0] | 0;
            a[(la + q) >> 0] = m;
            r = (r + -2) | 0;
            q = (r | 0) > -1;
            if (q) {
              p = r;
              n = a[(k + r) >> 0] | 0;
              while (1) {
                ha = p;
                p = (p + -1) | 0;
                o = a[(k + p) >> 0] | 0;
                a[(ka + ha) >> 0] =
                  (((i & 255) + 2 + ((n & 255) << 1) + (o & 255)) | 0) >>> 2;
                if ((ha | 0) <= 0) break;
                else {
                  i = n;
                  n = o;
                }
              }
            }
            ha =
              ((((d[k >> 0] | 0) + 2 + ((s & 255) << 1) + (d[j >> 0] | 0)) |
                0) >>>
                2) &
              255;
            a[ia >> 0] = ha;
            a[ja >> 0] = ha;
            if (q) {
              n = r;
              i = a[(j + r) >> 0] | 0;
              while (1) {
                ja = n;
                n = (n + -1) | 0;
                k = a[(j + n) >> 0] | 0;
                a[(la + ja) >> 0] =
                  (((m & 255) + 2 + ((i & 255) << 1) + (k & 255)) | 0) >>> 2;
                if ((ja | 0) <= 0) {
                  k = ka;
                  j = la;
                  break;
                } else {
                  m = i;
                  i = k;
                }
              }
            } else {
              k = ka;
              j = la;
            }
          }
        }
      while (0);
      switch (ra | 0) {
        case 0: {
          Sc(qa, j, k, pa, g);
          break;
        }
        case 1: {
          Tc(qa, j, k, pa, g, h);
          break;
        }
        default: {
          if (!(c[(na + 13104) >> 2] | 0)) i = 0;
          else i = (a[(ma + 31256) >> 0] | 0) != 0;
          Uc(qa, j, k, pa, h, ra, oa, i & 1);
        }
      }
      l = sa;
      return;
    }
    function Sc(b, c, e, f, g) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0;
      m = 1 << g;
      if ((g | 0) != 31) {
        n = (m + -1) | 0;
        o = (c + m) | 0;
        p = (e + m) | 0;
        i = (g + 1) | 0;
        g = 0;
        do {
          j = (e + g) | 0;
          k = (n - g) | 0;
          l = R(g, f) | 0;
          g = (g + 1) | 0;
          h = 0;
          do {
            t = R(d[j >> 0] | 0, (n - h) | 0) | 0;
            q = h;
            h = (h + 1) | 0;
            s = R(d[o >> 0] | 0, h) | 0;
            r = R(d[(c + q) >> 0] | 0, k) | 0;
            a[(b + (q + l)) >> 0] =
              (t + m + s + r + (R(d[p >> 0] | 0, g) | 0)) >> i;
          } while ((h | 0) < (m | 0));
        } while ((g | 0) < (m | 0));
      }
      return;
    }
    function Tc(b, c, e, f, g, h) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0;
      n = 1 << g;
      k = (g | 0) == 31;
      if (!k) {
        i = n;
        j = 0;
        do {
          i = ((d[(e + j) >> 0] | 0) + i + (d[(c + j) >> 0] | 0)) | 0;
          j = (j + 1) | 0;
        } while ((j | 0) < (n | 0));
        g = i >> (g + 1);
        l = R(g, 16843009) | 0;
        if (!k) {
          j = 0;
          do {
            k = R(j, f) | 0;
            i = 0;
            do {
              o = (b + (i + k)) | 0;
              a[o >> 0] = l;
              a[(o + 1) >> 0] = l >> 8;
              a[(o + 2) >> 0] = l >> 16;
              a[(o + 3) >> 0] = l >> 24;
              i = (i + 4) | 0;
            } while ((i | 0) < (n | 0));
            j = (j + 1) | 0;
          } while ((j | 0) < (n | 0));
        }
      } else g = n >> (g + 1);
      if (
        ((h | 0) == 0) & ((n | 0) < 32)
          ? ((a[b >> 0] =
              (((g << 1) + 2 + (d[e >> 0] | 0) + (d[c >> 0] | 0)) | 0) >>> 2),
            (m = (n | 0) > 1),
            m)
          : 0
      ) {
        j = (((g * 3) | 0) + 2) | 0;
        i = 1;
        do {
          a[(b + i) >> 0] = ((j + (d[(c + i) >> 0] | 0)) | 0) >>> 2;
          i = (i + 1) | 0;
        } while ((i | 0) != (n | 0));
        if (m) {
          j = (((g * 3) | 0) + 2) | 0;
          i = 1;
          do {
            a[(b + (R(i, f) | 0)) >> 0] =
              ((j + (d[(e + i) >> 0] | 0)) | 0) >>> 2;
            i = (i + 1) | 0;
          } while ((i | 0) != (n | 0));
        }
      }
      return;
    }
    function Uc(c, e, f, g, h, i, j, k) {
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
      v = l;
      l = (l + 112) | 0;
      u = a[(1826 + (i + -2)) >> 0] | 0;
      q = (v + j) | 0;
      m = (R(u, j) | 0) >> 5;
      o = (i + -11) | 0;
      p = (o >>> 0 < 15) & ((m | 0) < -1);
      if ((i | 0) > 17) {
        n = (e + -1) | 0;
        if (p) {
          if ((j | 0) >= 0) fh(q | 0, n | 0, ((j + 4) & -4) | 0) | 0;
          n = b[(384 + (o << 1)) >> 1] | 0;
          while (1) {
            a[(q + m) >> 0] =
              a[(f + ((((R(n, m) | 0) + 128) >> 8) + -1)) >> 0] | 0;
            if ((m | 0) < -1) m = (m + 1) | 0;
            else {
              n = q;
              break;
            }
          }
        }
        t = (j | 0) > 0;
        if (t) {
          s = 0;
          do {
            m = s;
            s = (s + 1) | 0;
            q = R(s, u) | 0;
            p = q >> 5;
            q = q & 31;
            if (!q) {
              p = (p + 1) | 0;
              o = R(m, g) | 0;
              m = 0;
              do {
                q = (n + (p + m)) | 0;
                q =
                  d[q >> 0] |
                  (d[(q + 1) >> 0] << 8) |
                  (d[(q + 2) >> 0] << 16) |
                  (d[(q + 3) >> 0] << 24);
                r = (c + (m + o)) | 0;
                a[r >> 0] = q;
                a[(r + 1) >> 0] = q >> 8;
                a[(r + 2) >> 0] = q >> 16;
                a[(r + 3) >> 0] = q >> 24;
                m = (m + 4) | 0;
              } while ((m | 0) < (j | 0));
            } else {
              r = (32 - q) | 0;
              o = R(m, g) | 0;
              m = 0;
              do {
                w = (m + p) | 0;
                x = R(d[(n + (w + 1)) >> 0] | 0, r) | 0;
                a[(c + (m + o)) >> 0] =
                  ((x + 16 + (R(d[(n + (w + 2)) >> 0] | 0, q) | 0)) | 0) >>> 5;
                w = m | 1;
                x = (w + p) | 0;
                y = R(d[(n + (x + 1)) >> 0] | 0, r) | 0;
                a[(c + (w + o)) >> 0] =
                  ((y + 16 + (R(d[(n + (x + 2)) >> 0] | 0, q) | 0)) | 0) >>> 5;
                w = m | 2;
                x = (w + p) | 0;
                y = R(d[(n + (x + 1)) >> 0] | 0, r) | 0;
                a[(c + (w + o)) >> 0] =
                  ((y + 16 + (R(d[(n + (x + 2)) >> 0] | 0, q) | 0)) | 0) >>> 5;
                w = m | 3;
                x = (w + p) | 0;
                y = R(d[(n + (x + 1)) >> 0] | 0, r) | 0;
                a[(c + (w + o)) >> 0] =
                  ((y + 16 + (R(d[(n + (x + 2)) >> 0] | 0, q) | 0)) | 0) >>> 5;
                m = (m + 4) | 0;
              } while ((m | 0) < (j | 0));
            }
          } while ((s | 0) != (j | 0));
        }
        if (
          ((h | 0) == 0) &
          ((i | 0) == 26) &
          ((j | 0) < 32) &
          ((k | 0) == 0) &
          t
        ) {
          n = (f + -1) | 0;
          m = 0;
          do {
            y =
              ((((d[(f + m) >> 0] | 0) - (d[n >> 0] | 0)) >> 1) +
                (d[e >> 0] | 0)) |
              0;
            a[(c + (R(m, g) | 0)) >> 0] = y >>> 0 > 255 ? (0 - y) >> 31 : y;
            m = (m + 1) | 0;
          } while ((m | 0) != (j | 0));
        }
      } else {
        n = (f + -1) | 0;
        if (p) {
          if ((j | 0) >= 0) fh(q | 0, n | 0, ((j + 4) & -4) | 0) | 0;
          n = b[(384 + (o << 1)) >> 1] | 0;
          while (1) {
            a[(q + m) >> 0] =
              a[(e + ((((R(n, m) | 0) + 128) >> 8) + -1)) >> 0] | 0;
            if ((m | 0) < -1) m = (m + 1) | 0;
            else {
              n = q;
              break;
            }
          }
        }
        t = (j | 0) > 0;
        if (t) {
          r = 0;
          do {
            s = r;
            r = (r + 1) | 0;
            p = R(r, u) | 0;
            o = p >> 5;
            p = p & 31;
            if (!p) {
              o = (o + 1) | 0;
              m = 0;
              do {
                a[(c + ((R(m, g) | 0) + s)) >> 0] = a[(n + (o + m)) >> 0] | 0;
                m = (m + 1) | 0;
              } while ((m | 0) != (j | 0));
            } else {
              q = (32 - p) | 0;
              m = 0;
              do {
                y = (m + o) | 0;
                x = R(d[(n + (y + 1)) >> 0] | 0, q) | 0;
                a[(c + ((R(m, g) | 0) + s)) >> 0] =
                  ((x + 16 + (R(d[(n + (y + 2)) >> 0] | 0, p) | 0)) | 0) >>> 5;
                m = (m + 1) | 0;
              } while ((m | 0) != (j | 0));
            }
          } while ((r | 0) != (j | 0));
        }
        if (
          ((h | 0) == 0) &
          ((i | 0) == 10) &
          ((j | 0) < 32) &
          ((k | 0) == 0) &
          t
        ) {
          n = (e + -1) | 0;
          m = 0;
          do {
            y =
              ((((d[(e + m) >> 0] | 0) - (d[n >> 0] | 0)) >> 1) +
                (d[f >> 0] | 0)) |
              0;
            a[(c + m) >> 0] = y >>> 0 > 255 ? (0 - y) >> 31 : y;
            y = m | 1;
            x =
              ((((d[(e + y) >> 0] | 0) - (d[n >> 0] | 0)) >> 1) +
                (d[f >> 0] | 0)) |
              0;
            a[(c + y) >> 0] = x >>> 0 > 255 ? (0 - x) >> 31 : x;
            y = m | 2;
            x =
              ((((d[(e + y) >> 0] | 0) - (d[n >> 0] | 0)) >> 1) +
                (d[f >> 0] | 0)) |
              0;
            a[(c + y) >> 0] = x >>> 0 > 255 ? (0 - x) >> 31 : x;
            y = m | 3;
            x =
              ((((d[(e + y) >> 0] | 0) - (d[n >> 0] | 0)) >> 1) +
                (d[f >> 0] | 0)) |
              0;
            a[(c + y) >> 0] = x >>> 0 > 255 ? (0 - x) >> 31 : x;
            m = (m + 4) | 0;
          } while ((m | 0) < (j | 0));
        }
      }
      l = v;
      return;
    }
    function Vc(b, e, f) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0;
      g = c[e >> 2] | 0;
      if (
        (g | 0 ? c[(g + 304) >> 2] | 0 : 0)
          ? ((h = (e + 70) | 0),
            (g = (d[h >> 0] | 0) & (f ^ 255) & 255),
            (a[h >> 0] = g),
            (g << 24) >> 24 == 0)
          : 0
      ) {
        Le(c[(b + 4) >> 2] | 0, (e + 4) | 0);
        wf((e + 56) | 0);
        c[(e + 16) >> 2] = 0;
        wf((e + 64) | 0);
        wf((e + 60) | 0);
        c[(e + 24) >> 2] = 0;
        c[(e + 20) >> 2] = 0;
        c[(e + 36) >> 2] = 0;
      }
      return;
    }
    function Wc(a, b, d, e) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0;
      g = c[(a + 200) >> 2] | 0;
      f = c[(g + 13080) >> 2] | 0;
      e =
        c[
          ((c[((c[(a + 204) >> 2] | 0) + 1668) >> 2] | 0) +
            (((R(e >> f, c[(g + 13128) >> 2] | 0) | 0) + (d >> f)) << 2)) >>
            2
        ] | 0;
      return c[((c[(b + 24) >> 2] | 0) + (e << 2)) >> 2] | 0;
    }
    function Xc(a) {
      a = a | 0;
      var b = 0;
      b = 0;
      do {
        Vc(a, (a + 3512 + ((b * 72) | 0)) | 0, 6);
        b = (b + 1) | 0;
      } while ((b | 0) != 32);
      return;
    }
    function Yc(a) {
      a = a | 0;
      var b = 0;
      b = 0;
      do {
        Vc(a, (a + 3512 + ((b * 72) | 0)) | 0, -1);
        b = (b + 1) | 0;
      } while ((b | 0) != 32);
      return;
    }
    function Zc(d, e, f) {
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0;
      h = (d + 7616) | 0;
      g = 0;
      while (1) {
        if (
          (
            c[((c[(d + 3512 + ((g * 72) | 0)) >> 2] | 0) + 304) >> 2] | 0
              ? (b[(d + 3512 + ((g * 72) | 0) + 68) >> 1] | 0) ==
                (b[h >> 1] | 0)
              : 0
          )
            ? (c[(d + 3512 + ((g * 72) | 0) + 32) >> 2] | 0) == (f | 0)
            : 0
        ) {
          g = -1094995529;
          break;
        }
        g = (g + 1) | 0;
        if (g >>> 0 >= 32) {
          i = 6;
          break;
        }
      }
      if ((i | 0) == 6) {
        g = _c(d) | 0;
        if (!g) g = -12;
        else {
          c[e >> 2] = c[g >> 2];
          c[(d + 3508) >> 2] = g;
          a[(g + 70) >> 0] = a[(d + 2438) >> 0] | 0 ? 3 : 2;
          c[(g + 32) >> 2] = f;
          b[(g + 68) >> 1] = b[h >> 1] | 0;
          g = (g + 40) | 0;
          i = ((c[(d + 200) >> 2] | 0) + 20) | 0;
          c[g >> 2] = c[i >> 2];
          c[(g + 4) >> 2] = c[(i + 4) >> 2];
          c[(g + 8) >> 2] = c[(i + 8) >> 2];
          c[(g + 12) >> 2] = c[(i + 12) >> 2];
          g = 0;
        }
      }
      return g | 0;
    }
    function _c(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;
      e = 0;
      while (1) {
        b = (a + 3512 + ((e * 72) | 0)) | 0;
        if (!(c[((c[b >> 2] | 0) + 304) >> 2] | 0)) {
          d = 3;
          break;
        }
        b = (e + 1) | 0;
        if (b >>> 0 < 32) e = b;
        else {
          b = 0;
          break;
        }
      }
      do
        if ((d | 0) == 3)
          if (
            (Ke(c[(a + 4) >> 2] | 0, (a + 3512 + ((e * 72) | 0) + 4) | 0, 1) |
              0) <
            0
          )
            b = 0;
          else {
            d = c[(a + 200) >> 2] | 0;
            g = (a + 3512 + ((e * 72) | 0) + 28) | 0;
            c[g >> 2] = R(c[(d + 13132) >> 2] | 0, c[(d + 13128) >> 2] | 0) | 0;
            d = tf(((c[(a + 7660) >> 2] | 0) * 392) | 0) | 0;
            i = (a + 3512 + ((e * 72) | 0) + 64) | 0;
            c[i >> 2] = d;
            if (
              (
                d | 0
                  ? ((f = Cf(c[(a + 1428) >> 2] | 0) | 0),
                    (c[(a + 3512 + ((e * 72) | 0) + 56) >> 2] = f),
                    f | 0)
                  : 0
              )
                ? ((c[(a + 3512 + ((e * 72) | 0) + 16) >> 2] = c[(f + 4) >> 2]),
                  (h = Cf(c[(a + 1432) >> 2] | 0) | 0),
                  (c[(a + 3512 + ((e * 72) | 0) + 60) >> 2] = h),
                  h | 0)
                : 0
            ) {
              d = c[(h + 4) >> 2] | 0;
              f = (a + 3512 + ((e * 72) | 0) + 24) | 0;
              c[f >> 2] = d;
              e = c[g >> 2] | 0;
              if (
                (e | 0) > 0
                  ? ((c[d >> 2] = c[((c[i >> 2] | 0) + 4) >> 2]), (e | 0) != 1)
                  : 0
              ) {
                d = 1;
                do {
                  c[((c[f >> 2] | 0) + (d << 2)) >> 2] =
                    c[((c[i >> 2] | 0) + 4) >> 2];
                  d = (d + 1) | 0;
                } while ((d | 0) < (e | 0));
              }
              i = c[(a + 7772) >> 2] | 0;
              a = c[b >> 2] | 0;
              c[(a + 244) >> 2] = ((i | 0) == 1) & 1;
              c[(a + 240) >> 2] = (((i + -1) | 0) >>> 0 < 2) & 1;
              break;
            }
            Vc(a, b, -1);
            b = 0;
          }
      while (0);
      return b | 0;
    }
    function $c(d, e, f) {
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0;
      n = (d + 3034) | 0;
      o = (d + 7618) | 0;
      j = (f | 0) == 0;
      k = (d + 7616) | 0;
      l = (d + 200) | 0;
      m = (d + 5816) | 0;
      h = 0;
      while (1) {
        if ((a[n >> 0] | 0) == 1) {
          f = 0;
          do {
            g = (d + 3512 + ((f * 72) | 0)) | 0;
            if (
              (
                (a[(d + 3512 + ((f * 72) | 0) + 70) >> 0] & 8) == 0
                  ? (c[(d + 3512 + ((f * 72) | 0) + 32) >> 2] | 0) !=
                    (c[m >> 2] | 0)
                  : 0
              )
                ? (b[(d + 3512 + ((f * 72) | 0) + 68) >> 1] | 0) ==
                  (b[o >> 1] | 0)
                : 0
            )
              Vc(d, g, 1);
            f = (f + 1) | 0;
          } while ((f | 0) != 32);
          f = 0;
          g = 2147483647;
          i = 0;
        } else {
          f = 0;
          g = 2147483647;
          i = 0;
        }
        do {
          if (
            (a[(d + 3512 + ((i * 72) | 0) + 70) >> 0] & 1) != 0
              ? (b[(d + 3512 + ((i * 72) | 0) + 68) >> 1] | 0) ==
                (b[o >> 1] | 0)
              : 0
          ) {
            s = c[(d + 3512 + ((i * 72) | 0) + 32) >> 2] | 0;
            r = (s | 0) < (g | 0);
            f = (f + 1) | 0;
            g = r ? s : g;
            h = r ? i : h;
          }
          i = (i + 1) | 0;
        } while ((i | 0) != 32);
        if (
          (
            (j ? (b[o >> 1] | 0) == (b[k >> 1] | 0) : 0)
              ? ((p = c[l >> 2] | 0), p | 0)
              : 0
          )
            ? (f | 0) <=
              (c[
                (p +
                  76 +
                  (((((c[(p + 72) >> 2] | 0) + -1) | 0) * 12) | 0) +
                  4) >>
                  2
              ] |
                0)
            : 0
        ) {
          f = 0;
          break;
        }
        if (f | 0) {
          q = 17;
          break;
        }
        f = b[o >> 1] | 0;
        if ((f << 16) >> 16 == (b[k >> 1] | 0)) {
          f = 0;
          break;
        }
        b[o >> 1] = ((f & 65535) + 1) & 255;
      }
      if ((q | 0) == 17) {
        g = (d + 3512 + ((h * 72) | 0)) | 0;
        f = Rf(e, c[g >> 2] | 0) | 0;
        if (!(a[(d + 3512 + ((h * 72) | 0) + 70) >> 0] & 8)) Vc(d, g, 1);
        else Vc(d, g, 9);
        f = (f | 0) < 0 ? f : 1;
      }
      return f | 0;
    }
    function ad(e) {
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0;
      j = (e + 7618) | 0;
      i = (e + 5816) | 0;
      g = 0;
      f = 0;
      do {
        if (
          (a[(e + 3512 + ((g * 72) | 0) + 70) >> 0] | 0) != 0
            ? (b[(e + 3512 + ((g * 72) | 0) + 68) >> 1] | 0) == (b[j >> 1] | 0)
            : 0
        )
          f =
            ((((c[(e + 3512 + ((g * 72) | 0) + 32) >> 2] | 0) !=
              (c[i >> 2] | 0)) &
              1) +
              f) |
            0;
        g = (g + 1) | 0;
      } while ((g | 0) != 32);
      h = c[(e + 200) >> 2] | 0;
      if (
        h | 0
          ? (f | 0) >=
            (c[
              (h + 76 + (((((c[(h + 72) >> 2] | 0) + -1) | 0) * 12) | 0)) >> 2
            ] |
              0)
          : 0
      ) {
        f = 2147483647;
        h = 0;
        do {
          g = a[(e + 3512 + ((h * 72) | 0) + 70) >> 0] | 0;
          if (
            (g << 24) >> 24 != 0
              ? (b[(e + 3512 + ((h * 72) | 0) + 68) >> 1] | 0) ==
                (b[j >> 1] | 0)
              : 0
          ) {
            k = c[(e + 3512 + ((h * 72) | 0) + 32) >> 2] | 0;
            f =
              ((k | 0) < (f | 0)) &
              ((g << 24) >> 24 == 1 ? (k | 0) != (c[i >> 2] | 0) : 0)
                ? k
                : f;
          }
          h = (h + 1) | 0;
        } while ((h | 0) != 32);
        g = 0;
        do {
          h = (e + 3512 + ((g * 72) | 0) + 70) | 0;
          i = d[h >> 0] | 0;
          if (
            (
              (i & 1) | 0
                ? (b[(e + 3512 + ((g * 72) | 0) + 68) >> 1] | 0) ==
                  (b[j >> 1] | 0)
                : 0
            )
              ? (c[(e + 3512 + ((g * 72) | 0) + 32) >> 2] | 0) <= (f | 0)
              : 0
          )
            a[h >> 0] = i | 8;
          g = (g + 1) | 0;
        } while ((g | 0) != 32);
      }
      return;
    }
    function bd(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0;
      A = l;
      l = (l + 208) | 0;
      x = (A + 12) | 0;
      y = A;
      e = (c[(b + 2428) >> 2] | 0) == 0;
      d = cd(b) | 0;
      a: do
        if ((d | 0) >= 0)
          if (
            (((c[(b + 1824) >> 2] | 0) + (c[(b + 1628) >> 2] | 0)) | 0) ==
            ((0 - (c[(b + 2216) >> 2] | 0)) | 0)
          )
            d = -1094995529;
          else {
            n = e ? 2 : 1;
            o = (b + 3508) | 0;
            p = (y + 4) | 0;
            q = (y + 8) | 0;
            r = (x + 192) | 0;
            s = (b + 3051) | 0;
            t = (b + 3052) | 0;
            m = 0;
            v = 0;
            b: while (1) {
              ah(x | 0, 0, 196) | 0;
              u = c[((c[o >> 2] | 0) + 20) >> 2] | 0;
              j = (u + ((v * 196) | 0)) | 0;
              w = (m << 24) >> 24 != 0;
              c[y >> 2] = w & 1;
              c[p >> 2] = (w ^ 1) & 1;
              c[q >> 2] = 3;
              w = (b + 3036 + (v << 2)) | 0;
              k = c[w >> 2] | 0;
              if (!k) g = 0;
              else {
                d = 0;
                do {
                  i = 0;
                  do {
                    f = c[(y + (i << 2)) >> 2] | 0;
                    g = c[(b + 1436 + ((f * 196) | 0) + 192) >> 2] | 0;
                    if (((g | 0) > 0) & ((d | 0) < 16)) {
                      h = ((i | 0) == 2) & 1;
                      e = 0;
                      do {
                        c[(x + 64 + (d << 2)) >> 2] =
                          c[(b + 1436 + ((f * 196) | 0) + 64 + (e << 2)) >> 2];
                        c[(x + (c[r >> 2] << 2)) >> 2] =
                          c[(b + 1436 + ((f * 196) | 0) + (e << 2)) >> 2];
                        c[(x + 128 + (c[r >> 2] << 2)) >> 2] = h;
                        d = ((c[r >> 2] | 0) + 1) | 0;
                        c[r >> 2] = d;
                        e = (e + 1) | 0;
                      } while (((e | 0) < (g | 0)) & ((d | 0) < 16));
                    }
                    i = (i + 1) | 0;
                  } while ((i | 0) != 3);
                } while (d >>> 0 < k >>> 0);
                g = d;
              }
              if (a[(b + 3032 + v) >> 0] | 0) {
                if (k | 0) {
                  e = (u + ((v * 196) | 0) + 192) | 0;
                  d = 0;
                  do {
                    f = c[(b + 2776 + (v << 7) + (d << 2)) >> 2] | 0;
                    if ((f | 0) >= (g | 0)) break b;
                    c[(u + ((v * 196) | 0) + 64 + (d << 2)) >> 2] =
                      c[(x + 64 + (f << 2)) >> 2];
                    c[(u + ((v * 196) | 0) + (d << 2)) >> 2] =
                      c[(x + (f << 2)) >> 2];
                    c[(u + ((v * 196) | 0) + 128 + (d << 2)) >> 2] =
                      c[(x + 128 + (f << 2)) >> 2];
                    c[e >> 2] = (c[e >> 2] | 0) + 1;
                    d = (d + 1) | 0;
                  } while (d >>> 0 < (c[w >> 2] | 0) >>> 0);
                }
              } else {
                fh(j | 0, x | 0, 196) | 0;
                k = (u + ((v * 196) | 0) + 192) | 0;
                j = c[k >> 2] | 0;
                w = c[w >> 2] | 0;
                c[k >> 2] = j >>> 0 > w >>> 0 ? w : j;
              }
              if (
                (a[s >> 0] | 0) == (m << 24) >> 24
                  ? ((z = c[t >> 2] | 0),
                    z >>> 0 < (c[(u + ((v * 196) | 0) + 192) >> 2] | 0) >>> 0)
                  : 0
              )
                c[((c[o >> 2] | 0) + 36) >> 2] =
                  c[(u + ((v * 196) | 0) + (z << 2)) >> 2];
              m = ((m + 1) << 24) >> 24;
              v = m & 255;
              if (v >>> 0 >= n >>> 0) {
                d = 0;
                break a;
              }
            }
            d = -1094995529;
          }
      while (0);
      l = A;
      return d | 0;
    }
    function cd(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;
      i = c[(a + 3508) >> 2] | 0;
      g = c[(i + 28) >> 2] | 0;
      h =
        c[
          ((c[((c[(a + 204) >> 2] | 0) + 1668) >> 2] | 0) +
            (c[(a + 2420) >> 2] << 2)) >>
            2
        ] | 0;
      d = c[(a + 5824) >> 2] | 0;
      e = (i + 64) | 0;
      b = c[e >> 2] | 0;
      if (d >>> 0 < ((((c[(b + 8) >> 2] | 0) >>> 0) / 392) | 0) >>> 0) {
        f = (i + 24) | 0;
        a = c[f >> 2] | 0;
        if ((h | 0) < (g | 0)) {
          c[(a + (h << 2)) >> 2] = (c[(b + 4) >> 2] | 0) + ((d * 392) | 0);
          b = (h + 1) | 0;
          a = c[f >> 2] | 0;
          if ((b | 0) != (g | 0))
            do {
              c[(a + (b << 2)) >> 2] =
                (c[((c[e >> 2] | 0) + 4) >> 2] | 0) + ((d * 392) | 0);
              b = (b + 1) | 0;
              a = c[f >> 2] | 0;
            } while ((b | 0) != (g | 0));
        }
        c[(i + 20) >> 2] = c[(a + (h << 2)) >> 2];
        a = 0;
      } else a = -1094995529;
      return a | 0;
    }
    function dd(b) {
      b = b | 0;
      var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;
      i = c[(b + 2608) >> 2] | 0;
      a: do
        if (!i) {
          c[(b + 1824) >> 2] = 0;
          c[(b + 1628) >> 2] = 0;
          e = 0;
        } else {
          f = (b + 3508) | 0;
          e = 0;
          do {
            g = (b + 3512 + ((e * 72) | 0)) | 0;
            if ((g | 0) != (c[f >> 2] | 0)) ed(g, 0);
            e = (e + 1) | 0;
          } while ((e | 0) != 32);
          e = 0;
          do {
            c[(b + 1436 + ((e * 196) | 0) + 192) >> 2] = 0;
            e = (e + 1) | 0;
          } while ((e | 0) != 5);
          g = (i + 4) | 0;
          if ((c[g >> 2] | 0) > 0) {
            h = (b + 5816) | 0;
            f = 0;
            do {
              if (!(a[(i + 136 + f) >> 0] | 0)) e = 2;
              else e = (f >>> 0 >= (c[i >> 2] | 0) >>> 0) & 1;
              e =
                fd(
                  b,
                  (b + 1436 + ((e * 196) | 0)) | 0,
                  ((c[(i + 8 + (f << 2)) >> 2] | 0) + (c[h >> 2] | 0)) | 0,
                  2
                ) | 0;
              f = (f + 1) | 0;
              if ((e | 0) < 0) break a;
            } while ((f | 0) < (c[g >> 2] | 0));
          }
          g = (b + 2772) | 0;
          if (!(a[g >> 0] | 0)) e = 0;
          else {
            f = 0;
            while (1) {
              e =
                fd(
                  b,
                  (b +
                    1436 +
                    (((a[(b + 2740 + f) >> 0] | 0 ? 3 : 4) * 196) | 0)) |
                    0,
                  c[(b + 2612 + (f << 2)) >> 2] | 0,
                  4
                ) | 0;
              f = (f + 1) | 0;
              if ((e | 0) < 0) break a;
              if ((f | 0) >= (d[g >> 0] | 0)) {
                e = 0;
                break;
              }
            }
          }
          do {
            Vc(b, (b + 3512 + ((e * 72) | 0)) | 0, 0);
            e = (e + 1) | 0;
          } while ((e | 0) != 32);
          e = 0;
        }
      while (0);
      return e | 0;
    }
    function ed(b, c) {
      b = b | 0;
      c = c | 0;
      b = (b + 70) | 0;
      a[b >> 0] = (a[b >> 0] & -7 & 255) | c;
      return;
    }
    function fd(a, b, d, e) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0;
      f = gd(a, d) | 0;
      do
        if ((f | 0) == (c[(a + 3508) >> 2] | 0)) f = -1094995529;
        else {
          if (!f) {
            f = hd(a, d) | 0;
            if (!f) {
              f = -12;
              break;
            }
          }
          d = (b + 192) | 0;
          c[(b + 64 + (c[d >> 2] << 2)) >> 2] = c[(f + 32) >> 2];
          c[(b + (c[d >> 2] << 2)) >> 2] = f;
          c[d >> 2] = (c[d >> 2] | 0) + 1;
          ed(f, e);
          f = 0;
        }
      while (0);
      return f | 0;
    }
    function gd(a, d) {
      a = a | 0;
      d = d | 0;
      var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0;
      g = ((1 << c[((c[(a + 200) >> 2] | 0) + 64) >> 2]) + -1) | 0;
      h = (a + 7616) | 0;
      f = 0;
      while (1) {
        e = (a + 3512 + ((f * 72) | 0)) | 0;
        if (
          (
            c[((c[e >> 2] | 0) + 304) >> 2] | 0
              ? (b[(a + 3512 + ((f * 72) | 0) + 68) >> 1] | 0) ==
                (b[h >> 1] | 0)
              : 0
          )
            ? ((c[(a + 3512 + ((f * 72) | 0) + 32) >> 2] & g) | 0) == (d | 0)
            : 0
        )
          break;
        f = (f + 1) | 0;
        if (f >>> 0 >= 32) {
          f = 0;
          i = 6;
          break;
        }
      }
      a: do
        if ((i | 0) == 6)
          while (1) {
            e = (a + 3512 + ((f * 72) | 0)) | 0;
            if (
              (
                c[((c[e >> 2] | 0) + 304) >> 2] | 0
                  ? (b[(a + 3512 + ((f * 72) | 0) + 68) >> 1] | 0) ==
                    (b[h >> 1] | 0)
                  : 0
              )
                ? ((i = c[(a + 3512 + ((f * 72) | 0) + 32) >> 2] | 0),
                  ((i | 0) == (d | 0)) | (((i & g) | 0) == (d | 0)))
                : 0
            )
              break a;
            f = (f + 1) | 0;
            if (f >>> 0 >= 32) {
              e = 0;
              break;
            } else i = 6;
          }
      while (0);
      return e | 0;
    }
    function hd(d, e) {
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0;
      f = _c(d) | 0;
      if (f) {
        k = (d + 200) | 0;
        i = c[k >> 2] | 0;
        h = c[f >> 2] | 0;
        if (!(c[(i + 56) >> 2] | 0)) {
          h = c[(h + 304) >> 2] | 0;
          if (
            h | 0
              ? (ah(
                  c[(h + 4) >> 2] | 0,
                  ((1 << ((c[(i + 52) >> 2] | 0) + -1)) & 255) | 0,
                  c[(h + 8) >> 2] | 0
                ) | 0,
                (g = c[((c[f >> 2] | 0) + 308) >> 2] | 0),
                g | 0)
              : 0
          ) {
            h = 1;
            do {
              ah(
                c[(g + 4) >> 2] | 0,
                ((1 << ((c[((c[k >> 2] | 0) + 52) >> 2] | 0) + -1)) & 255) | 0,
                c[(g + 8) >> 2] | 0
              ) | 0;
              h = (h + 1) | 0;
              g = c[((c[f >> 2] | 0) + 304 + (h << 2)) >> 2] | 0;
            } while ((g | 0) != 0);
          }
        } else if (c[h >> 2] | 0) {
          j = 0;
          g = i;
          do {
            if (
              ((c[(g + 13124) >> 2] >> c[(g + 13180 + (j << 2)) >> 2]) | 0) >
              0
            ) {
              i = 0;
              do {
                if (
                  ((c[(g + 13120) >> 2] >> c[(g + 13168 + (j << 2)) >> 2]) |
                    0) >
                  0
                ) {
                  h = 0;
                  do {
                    l = (1 << ((c[(g + 52) >> 2] | 0) + -1)) & 65535;
                    g = c[f >> 2] | 0;
                    g =
                      ((c[(g + (j << 2)) >> 2] | 0) +
                        (R(c[(g + 32 + (j << 2)) >> 2] | 0, i) | 0) +
                        (h << 1)) |
                      0;
                    a[g >> 0] = l;
                    a[(g + 1) >> 0] = l >> 8;
                    h = (h + 1) | 0;
                    g = c[k >> 2] | 0;
                  } while (
                    (h | 0) <
                    ((c[(g + 13120) >> 2] >> c[(g + 13168 + (j << 2)) >> 2]) |
                      0)
                  );
                }
                i = (i + 1) | 0;
              } while (
                (i | 0) <
                ((c[(g + 13124) >> 2] >> c[(g + 13180 + (j << 2)) >> 2]) | 0)
              );
              h = c[f >> 2] | 0;
            }
            j = (j + 1) | 0;
          } while ((c[(h + (j << 2)) >> 2] | 0) != 0);
        }
        c[(f + 32) >> 2] = e;
        b[(f + 68) >> 1] = b[(d + 7616) >> 1] | 0;
        a[(f + 70) >> 0] = 0;
      } else f = 0;
      return f | 0;
    }
    function id(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0;
      e = 1 << c[((c[(a + 200) >> 2] | 0) + 64) >> 2];
      d = c[(a + 5820) >> 2] | 0;
      f = (d | 0) % (e | 0) | 0;
      d = (d - f) | 0;
      if ((f | 0) > (b | 0) ? ((f - b) | 0) >= (((e | 0) / 2) | 0 | 0) : 0)
        d = (d + e) | 0;
      else if ((f | 0) < (b | 0))
        d = (d - (((b - f) | 0) > (((e | 0) / 2) | 0 | 0) ? e : 0)) | 0;
      return (
        (((((c[(a + 3500) >> 2] | 0) + -16) | 0) >>> 0 < 3 ? 0 : d) + b) | 0
      );
    }
    function jd(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0;
      g = c[(b + 2608) >> 2] | 0;
      if (g) {
        f = c[g >> 2] | 0;
        if (!f) {
          d = 0;
          e = 0;
        } else {
          e = 0;
          d = 0;
          do {
            d = ((((a[(g + 136 + e) >> 0] | 0) != 0) & 1) + d) | 0;
            e = (e + 1) | 0;
          } while (e >>> 0 < f >>> 0);
        }
        f = c[(g + 4) >> 2] | 0;
        if ((e | 0) < (f | 0))
          do {
            d = ((((a[(g + 136 + e) >> 0] | 0) != 0) & 1) + d) | 0;
            e = (e + 1) | 0;
          } while ((e | 0) < (f | 0));
      } else d = 0;
      e = a[(b + 2772) >> 0] | 0;
      if ((e << 24) >> 24) {
        f = e & 255;
        e = 0;
        do {
          d = ((((a[(b + 2740 + e) >> 0] | 0) != 0) & 1) + d) | 0;
          e = (e + 1) | 0;
        } while ((e | 0) < (f | 0));
      }
      return d | 0;
    }
    function kd() {
      var b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = 0;
      if (!(a[3893] | 0)) {
        c = 0;
        do {
          b = 0;
          do {
            f = (R((b << 1) | 1, c) | 0) & 127;
            d = f >>> 0 > 63;
            f = d ? (f + -64) | 0 : f;
            d = d ? -1 : 1;
            e = (f | 0) > 31;
            a[(3893 + (c << 5) + b) >> 0] =
              R(
                a[(1859 + (e ? (64 - f) | 0 : f)) >> 0] | 0,
                e ? (0 - d) | 0 : d
              ) | 0;
            b = (b + 1) | 0;
          } while ((b | 0) != 32);
          c = (c + 1) | 0;
        } while ((c | 0) != 32);
      }
      return;
    }
    function ld(a, b) {
      a = a | 0;
      b = b | 0;
      c[a >> 2] = 1;
      c[(a + 4) >> 2] = 1;
      c[(a + 8) >> 2] = 2;
      c[(a + 12) >> 2] = 3;
      c[(a + 16) >> 2] = 4;
      c[(a + 20) >> 2] = 1;
      c[(a + 24) >> 2] = 5;
      c[(a + 28) >> 2] = 2;
      c[(a + 32) >> 2] = 2;
      c[(a + 36) >> 2] = 3;
      c[(a + 40) >> 2] = 4;
      c[(a + 44) >> 2] = 5;
      c[(a + 48) >> 2] = 3;
      c[(a + 52) >> 2] = 4;
      c[(a + 56) >> 2] = 5;
      c[(a + 60) >> 2] = 6;
      b = 0;
      do {
        c[(a + 236 + (b << 4)) >> 2] = 1;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 236 + (b << 4) + 4) >> 2] = 2;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 236 + (b << 4) + 8) >> 2] = 3;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 236 + (b << 4) + 12) >> 2] = 4;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 396 + (b << 4)) >> 2] = 1;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 396 + (b << 4) + 4) >> 2] = 2;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 396 + (b << 4) + 8) >> 2] = 3;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 396 + (b << 4) + 12) >> 2] = 4;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 1036 + (b << 4)) >> 2] = 1;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 1036 + (b << 4) + 4) >> 2] = 5;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 1036 + (b << 4) + 8) >> 2] = 6;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 1036 + (b << 4) + 12) >> 2] = 7;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 1196 + (b << 4)) >> 2] = 1;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 1196 + (b << 4) + 4) >> 2] = 5;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 1196 + (b << 4) + 8) >> 2] = 6;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      b = 0;
      do {
        c[(a + 1196 + (b << 4) + 12) >> 2] = 7;
        b = (b + 1) | 0;
      } while ((b | 0) != 10);
      c[(a + 64) >> 2] = 1;
      c[(a + 68) >> 2] = 1;
      c[(a + 72) >> 2] = 2;
      c[(a + 1676) >> 2] = 2;
      c[(a + 1680) >> 2] = 3;
      c[(a + 1684) >> 2] = 1;
      c[(a + 1688) >> 2] = 2;
      c[(a + 1692) >> 2] = 2;
      c[(a + 1696) >> 2] = 3;
      c[(a + 1700) >> 2] = 1;
      c[(a + 1704) >> 2] = 2;
      return;
    }
    function md(b, c, d, e, f, g) {
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0;
      if ((e | 0) > 0) {
        j = (d | 0) > 0;
        k = (8 - g) | 0;
        i = 0;
        while (1) {
          if (j) {
            h = 0;
            do {
              a[(b + h) >> 0] = (Te(f, g) | 0) << k;
              h = (h + 1) | 0;
            } while ((h | 0) != (d | 0));
          }
          i = (i + 1) | 0;
          if ((i | 0) == (e | 0)) break;
          else b = (b + c) | 0;
        }
      }
      return;
    }
    function nd(c, e, f) {
      c = c | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0;
      i = 0;
      while (1) {
        g = 0;
        h = e;
        while (1) {
          j = (c + g) | 0;
          k = ((b[h >> 1] | 0) + (d[j >> 0] | 0)) | 0;
          a[j >> 0] = k >>> 0 > 255 ? (0 - k) >> 31 : k;
          g = (g + 1) | 0;
          if ((g | 0) == 4) break;
          else h = (h + 2) | 0;
        }
        i = (i + 1) | 0;
        if ((i | 0) == 4) break;
        else {
          e = (e + 8) | 0;
          c = (c + f) | 0;
        }
      }
      return;
    }
    function od(c, e, f) {
      c = c | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0;
      i = 0;
      while (1) {
        g = 0;
        h = e;
        while (1) {
          j = (c + g) | 0;
          k = ((b[h >> 1] | 0) + (d[j >> 0] | 0)) | 0;
          a[j >> 0] = k >>> 0 > 255 ? (0 - k) >> 31 : k;
          g = (g + 1) | 0;
          if ((g | 0) == 8) break;
          else h = (h + 2) | 0;
        }
        i = (i + 1) | 0;
        if ((i | 0) == 8) break;
        else {
          e = (e + 16) | 0;
          c = (c + f) | 0;
        }
      }
      return;
    }
    function pd(c, e, f) {
      c = c | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0;
      i = 0;
      while (1) {
        g = 0;
        h = e;
        while (1) {
          j = (c + g) | 0;
          k = ((b[h >> 1] | 0) + (d[j >> 0] | 0)) | 0;
          a[j >> 0] = k >>> 0 > 255 ? (0 - k) >> 31 : k;
          g = (g + 1) | 0;
          if ((g | 0) == 16) break;
          else h = (h + 2) | 0;
        }
        i = (i + 1) | 0;
        if ((i | 0) == 16) break;
        else {
          e = (e + 32) | 0;
          c = (c + f) | 0;
        }
      }
      return;
    }
    function qd(c, e, f) {
      c = c | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0;
      i = 0;
      while (1) {
        g = 0;
        h = e;
        while (1) {
          j = (c + g) | 0;
          k = ((b[h >> 1] | 0) + (d[j >> 0] | 0)) | 0;
          a[j >> 0] = k >>> 0 > 255 ? (0 - k) >> 31 : k;
          g = (g + 1) | 0;
          if ((g | 0) == 32) break;
          else h = (h + 2) | 0;
        }
        i = (i + 1) | 0;
        if ((i | 0) == 32) break;
        else {
          e = (e + 64) | 0;
          c = (c + f) | 0;
        }
      }
      return;
    }
    function rd(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0;
      g = (c << 16) >> 16;
      e = (7 - g) | 0;
      g = 1 << g;
      if ((e | 0) > 0) {
        f = 1 << (e + -1);
        if ((c << 16) >> 16 != 31) {
          c = 0;
          do {
            d = 0;
            do {
              b[a >> 1] = ((b[a >> 1] | 0) + f) >> e;
              a = (a + 2) | 0;
              d = (d + 1) | 0;
            } while ((d | 0) < (g | 0));
            c = (c + 1) | 0;
          } while ((c | 0) < (g | 0));
        }
      } else if ((c << 16) >> 16 != 31) {
        e = (0 - e) | 0;
        d = 0;
        do {
          c = 0;
          do {
            b[a >> 1] = b[a >> 1] << e;
            a = (a + 2) | 0;
            c = (c + 1) | 0;
          } while ((c | 0) < (g | 0));
          d = (d + 1) | 0;
        } while ((d | 0) < (g | 0));
      }
      return;
    }
    function sd(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0;
      i = 1 << ((c << 16) >> 16);
      if (!d) {
        if ((c << 16) >> 16 != 31) {
          h = (i | 0) > 1;
          g = 0;
          d = a;
          while (1) {
            if (h) {
              c = 1;
              f = b[d >> 1] | 0;
              do {
                a = (d + (c << 1)) | 0;
                f = ((e[a >> 1] | 0) + (f & 65535)) & 65535;
                b[a >> 1] = f;
                c = (c + 1) | 0;
              } while ((c | 0) != (i | 0));
            }
            g = (g + 1) | 0;
            if ((g | 0) >= (i | 0)) break;
            else d = (d + (i << 1)) | 0;
          }
        }
      } else {
        g = (i + -1) | 0;
        if ((i | 0) > 1) {
          f = 0;
          d = a;
          do {
            d = (d + (i << 1)) | 0;
            c = 0;
            do {
              a = (d + (c << 1)) | 0;
              b[a >> 1] = (e[a >> 1] | 0) + (e[(d + ((c - i) << 1)) >> 1] | 0);
              c = (c + 1) | 0;
            } while ((c | 0) != (i | 0));
            f = (f + 1) | 0;
          } while ((f | 0) != (g | 0));
        }
      }
      return;
    }
    function td(a) {
      a = a | 0;
      var c = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0;
      c = 0;
      d = a;
      while (1) {
        n = b[d >> 1] | 0;
        l = (d + 16) | 0;
        j = b[l >> 1] | 0;
        h = (j + n) | 0;
        e = (d + 24) | 0;
        m = b[e >> 1] | 0;
        k = (m + j) | 0;
        f = (n - m) | 0;
        i = (d + 8) | 0;
        g = ((b[i >> 1] | 0) * 74) | 0;
        m = (((((n - j + m) | 0) * 74) | 0) + 64) | 0;
        j = m >> 7;
        b[l >> 1] = ((j + 32768) | 0) >>> 0 > 65535 ? (m >> 31) ^ 32767 : j;
        l = (((h * 29) | 0) + 64 + ((k * 55) | 0) + g) | 0;
        j = l >> 7;
        b[d >> 1] = ((j + 32768) | 0) >>> 0 > 65535 ? (l >> 31) ^ 32767 : j;
        k = ((R(k, -29) | 0) + 64 + ((f * 55) | 0) + g) | 0;
        j = k >> 7;
        b[i >> 1] = ((j + 32768) | 0) >>> 0 > 65535 ? (k >> 31) ^ 32767 : j;
        g = (((h * 55) | 0) + 64 + ((f * 29) | 0) - g) | 0;
        f = g >> 7;
        b[e >> 1] = ((f + 32768) | 0) >>> 0 > 65535 ? (g >> 31) ^ 32767 : f;
        c = (c + 1) | 0;
        if ((c | 0) == 4) {
          c = 0;
          break;
        } else d = (d + 2) | 0;
      }
      while (1) {
        e = b[a >> 1] | 0;
        g = (a + 4) | 0;
        i = b[g >> 1] | 0;
        k = (i + e) | 0;
        n = (a + 6) | 0;
        f = b[n >> 1] | 0;
        h = (f + i) | 0;
        m = (e - f) | 0;
        j = (a + 2) | 0;
        l = ((b[j >> 1] | 0) * 74) | 0;
        f = (((((e - i + f) | 0) * 74) | 0) + 2048) | 0;
        i = f >> 12;
        b[g >> 1] = ((i + 32768) | 0) >>> 0 > 65535 ? (f >> 31) ^ 32767 : i;
        g = (((k * 29) | 0) + 2048 + ((h * 55) | 0) + l) | 0;
        i = g >> 12;
        b[a >> 1] = ((i + 32768) | 0) >>> 0 > 65535 ? (g >> 31) ^ 32767 : i;
        h = ((R(h, -29) | 0) + 2048 + ((m * 55) | 0) + l) | 0;
        i = h >> 12;
        b[j >> 1] = ((i + 32768) | 0) >>> 0 > 65535 ? (h >> 31) ^ 32767 : i;
        l = (((k * 55) | 0) + 2048 + ((m * 29) | 0) - l) | 0;
        m = l >> 12;
        b[n >> 1] = ((m + 32768) | 0) >>> 0 > 65535 ? (l >> 31) ^ 32767 : m;
        c = (c + 1) | 0;
        if ((c | 0) == 4) break;
        else a = (a + 8) | 0;
      }
      return;
    }
    function ud(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
      c = 0;
      d = a;
      while (1) {
        k = b[d >> 1] << 6;
        h = (d + 16) | 0;
        i = b[h >> 1] << 6;
        f = (i + k) | 0;
        i = (k - i) | 0;
        k = (d + 8) | 0;
        j = b[k >> 1] | 0;
        e = (d + 24) | 0;
        l = b[e >> 1] | 0;
        g = (((l * 36) | 0) + ((j * 83) | 0)) | 0;
        j = ((R(l, -83) | 0) + ((j * 36) | 0)) | 0;
        l = (f + 64 + g) | 0;
        m = l >> 7;
        b[d >> 1] = ((m + 32768) | 0) >>> 0 > 65535 ? (l >> 31) ^ 32767 : m;
        m = (i + 64 + j) | 0;
        l = m >> 7;
        b[k >> 1] = ((l + 32768) | 0) >>> 0 > 65535 ? (m >> 31) ^ 32767 : l;
        j = (i - j + 64) | 0;
        i = j >> 7;
        b[h >> 1] = ((i + 32768) | 0) >>> 0 > 65535 ? (j >> 31) ^ 32767 : i;
        g = (f - g + 64) | 0;
        f = g >> 7;
        b[e >> 1] = ((f + 32768) | 0) >>> 0 > 65535 ? (g >> 31) ^ 32767 : f;
        c = (c + 1) | 0;
        if ((c | 0) == 4) {
          c = 0;
          break;
        } else d = (d + 2) | 0;
      }
      while (1) {
        g = b[a >> 1] << 6;
        j = (a + 4) | 0;
        i = b[j >> 1] << 6;
        l = (i + g) | 0;
        i = (g - i) | 0;
        g = (a + 2) | 0;
        h = b[g >> 1] | 0;
        m = (a + 6) | 0;
        f = b[m >> 1] | 0;
        k = (((f * 36) | 0) + ((h * 83) | 0)) | 0;
        h = ((R(f, -83) | 0) + ((h * 36) | 0)) | 0;
        f = (l + 2048 + k) | 0;
        e = f >> 12;
        b[a >> 1] = ((e + 32768) | 0) >>> 0 > 65535 ? (f >> 31) ^ 32767 : e;
        e = (i + 2048 + h) | 0;
        f = e >> 12;
        b[g >> 1] = ((f + 32768) | 0) >>> 0 > 65535 ? (e >> 31) ^ 32767 : f;
        h = (i - h + 2048) | 0;
        i = h >> 12;
        b[j >> 1] = ((i + 32768) | 0) >>> 0 > 65535 ? (h >> 31) ^ 32767 : i;
        k = (l - k + 2048) | 0;
        l = k >> 12;
        b[m >> 1] = ((l + 32768) | 0) >>> 0 > 65535 ? (k >> 31) ^ 32767 : l;
        c = (c + 1) | 0;
        if ((c | 0) == 4) break;
        else a = (a + 8) | 0;
      }
      return;
    }
    function vd(d, e) {
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0;
      u = l;
      l = (l + 32) | 0;
      s = (u + 16) | 0;
      t = u;
      p = (e | 0) < 8;
      n = (e + 4) | 0;
      q = (s + 4) | 0;
      r = (s + 8) | 0;
      o = (s + 12) | 0;
      k = 0;
      m = d;
      n = (n | 0) < 8 ? n : 8;
      while (1) {
        c[t >> 2] = 0;
        c[(t + 4) >> 2] = 0;
        c[(t + 8) >> 2] = 0;
        c[(t + 12) >> 2] = 0;
        h = (n | 0) > 1;
        f = 0;
        do {
          if (h) {
            i = (t + (f << 2)) | 0;
            g = 1;
            j = c[i >> 2] | 0;
            do {
              j =
                ((R(
                  b[(m + ((g << 3) << 1)) >> 1] | 0,
                  a[(3893 + ((g << 2) << 5) + f) >> 0] | 0
                ) |
                  0) +
                  j) |
                0;
              g = (g + 2) | 0;
            } while ((g | 0) < (n | 0));
            c[i >> 2] = j;
          }
          f = (f + 1) | 0;
        } while ((f | 0) != 4);
        i = b[m >> 1] << 6;
        h = b[(m + 64) >> 1] << 6;
        j = (h + i) | 0;
        h = (i - h) | 0;
        i = b[(m + 32) >> 1] | 0;
        f = b[(m + 96) >> 1] | 0;
        g = (((f * 36) | 0) + ((i * 83) | 0)) | 0;
        i = ((R(f, -83) | 0) + ((i * 36) | 0)) | 0;
        f = (g + j) | 0;
        c[s >> 2] = f;
        c[q >> 2] = i + h;
        c[r >> 2] = h - i;
        c[o >> 2] = j - g;
        g = 0;
        while (1) {
          j = c[(t + (g << 2)) >> 2] | 0;
          h = (f + 64 + j) | 0;
          i = h >> 7;
          b[(m + ((g << 3) << 1)) >> 1] =
            ((i + 32768) | 0) >>> 0 > 65535 ? (h >> 31) ^ 32767 : i;
          j = (f - j + 64) | 0;
          f = j >> 7;
          b[(m + (((7 - g) << 3) << 1)) >> 1] =
            ((f + 32768) | 0) >>> 0 > 65535 ? (j >> 31) ^ 32767 : f;
          f = (g + 1) | 0;
          if ((f | 0) == 4) break;
          g = f;
          f = c[(s + (f << 2)) >> 2] | 0;
        }
        n =
          ((n | 0) < 8) & (((k | 0) != 0) & (((k & 3) | 0) == 0))
            ? (n + -4) | 0
            : n;
        k = (k + 1) | 0;
        if ((k | 0) == 8) break;
        else m = (m + 2) | 0;
      }
      k = p ? e : 8;
      m = (k | 0) > 1;
      n = (s + 4) | 0;
      e = (s + 8) | 0;
      o = (s + 12) | 0;
      j = 0;
      while (1) {
        c[t >> 2] = 0;
        c[(t + 4) >> 2] = 0;
        c[(t + 8) >> 2] = 0;
        c[(t + 12) >> 2] = 0;
        g = 0;
        do {
          if (m) {
            h = (t + (g << 2)) | 0;
            f = 1;
            i = c[h >> 2] | 0;
            do {
              i =
                ((R(
                  b[(d + (f << 1)) >> 1] | 0,
                  a[(3893 + ((f << 2) << 5) + g) >> 0] | 0
                ) |
                  0) +
                  i) |
                0;
              f = (f + 2) | 0;
            } while ((f | 0) < (k | 0));
            c[h >> 2] = i;
          }
          g = (g + 1) | 0;
        } while ((g | 0) != 4);
        q = b[d >> 1] << 6;
        p = b[(d + 8) >> 1] << 6;
        r = (p + q) | 0;
        p = (q - p) | 0;
        q = b[(d + 4) >> 1] | 0;
        f = b[(d + 12) >> 1] | 0;
        g = (((f * 36) | 0) + ((q * 83) | 0)) | 0;
        q = ((R(f, -83) | 0) + ((q * 36) | 0)) | 0;
        f = (g + r) | 0;
        c[s >> 2] = f;
        c[n >> 2] = q + p;
        c[e >> 2] = p - q;
        c[o >> 2] = r - g;
        g = 0;
        while (1) {
          r = c[(t + (g << 2)) >> 2] | 0;
          p = (f + 2048 + r) | 0;
          q = p >> 12;
          b[(d + (g << 1)) >> 1] =
            ((q + 32768) | 0) >>> 0 > 65535 ? (p >> 31) ^ 32767 : q;
          r = (f - r + 2048) | 0;
          f = r >> 12;
          b[(d + ((7 - g) << 1)) >> 1] =
            ((f + 32768) | 0) >>> 0 > 65535 ? (r >> 31) ^ 32767 : f;
          f = (g + 1) | 0;
          if ((f | 0) == 4) break;
          g = f;
          f = c[(s + (f << 2)) >> 2] | 0;
        }
        j = (j + 1) | 0;
        if ((j | 0) == 8) break;
        else d = (d + 16) | 0;
      }
      l = u;
      return;
    }
    function wd(d, e) {
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0;
      x = l;
      l = (l + 96) | 0;
      t = (x + 64) | 0;
      u = (x + 32) | 0;
      v = (x + 16) | 0;
      w = x;
      s = (e | 0) < 16;
      n = (e + 4) | 0;
      o = (v + 4) | 0;
      p = (v + 8) | 0;
      q = (v + 12) | 0;
      r = (t + 28) | 0;
      k = 0;
      m = d;
      n = (n | 0) < 16 ? n : 16;
      while (1) {
        c[u >> 2] = 0;
        c[(u + 4) >> 2] = 0;
        c[(u + 8) >> 2] = 0;
        c[(u + 12) >> 2] = 0;
        c[(u + 16) >> 2] = 0;
        c[(u + 20) >> 2] = 0;
        c[(u + 24) >> 2] = 0;
        c[(u + 28) >> 2] = 0;
        h = (n | 0) > 1;
        f = 0;
        do {
          if (h) {
            i = (u + (f << 2)) | 0;
            g = 1;
            j = c[i >> 2] | 0;
            do {
              j =
                ((R(
                  b[(m + ((g << 4) << 1)) >> 1] | 0,
                  a[(3893 + ((g << 1) << 5) + f) >> 0] | 0
                ) |
                  0) +
                  j) |
                0;
              g = (g + 2) | 0;
            } while ((g | 0) < (n | 0));
            c[i >> 2] = j;
          }
          f = (f + 1) | 0;
        } while ((f | 0) != 8);
        c[w >> 2] = 0;
        c[(w + 4) >> 2] = 0;
        c[(w + 8) >> 2] = 0;
        c[(w + 12) >> 2] = 0;
        g = 0;
        do {
          h = (w + (g << 2)) | 0;
          f = 1;
          i = c[h >> 2] | 0;
          do {
            i =
              ((R(
                b[(m + ((f << 5) << 1)) >> 1] | 0,
                a[(3893 + ((f << 2) << 5) + g) >> 0] | 0
              ) |
                0) +
                i) |
              0;
            f = (f + 2) | 0;
          } while ((f | 0) < 8);
          c[h >> 2] = i;
          g = (g + 1) | 0;
        } while ((g | 0) != 4);
        h = b[m >> 1] << 6;
        g = b[(m + 256) >> 1] << 6;
        i = (g + h) | 0;
        g = (h - g) | 0;
        h = b[(m + 128) >> 1] | 0;
        j = b[(m + 384) >> 1] | 0;
        f = (((j * 36) | 0) + ((h * 83) | 0)) | 0;
        h = ((R(j, -83) | 0) + ((h * 36) | 0)) | 0;
        j = (f + i) | 0;
        c[v >> 2] = j;
        c[o >> 2] = h + g;
        c[p >> 2] = g - h;
        c[q >> 2] = i - f;
        f = c[w >> 2] | 0;
        c[t >> 2] = f + j;
        c[r >> 2] = j - f;
        f = 1;
        do {
          i = c[(v + (f << 2)) >> 2] | 0;
          j = c[(w + (f << 2)) >> 2] | 0;
          c[(t + (f << 2)) >> 2] = j + i;
          c[(t + ((7 - f) << 2)) >> 2] = i - j;
          f = (f + 1) | 0;
        } while ((f | 0) != 4);
        f = 0;
        do {
          j = c[(t + (f << 2)) >> 2] | 0;
          i = c[(u + (f << 2)) >> 2] | 0;
          g = (j + 64 + i) | 0;
          h = g >> 7;
          b[(m + ((f << 4) << 1)) >> 1] =
            ((h + 32768) | 0) >>> 0 > 65535 ? (g >> 31) ^ 32767 : h;
          i = (j - i + 64) | 0;
          j = i >> 7;
          b[(m + (((15 - f) << 4) << 1)) >> 1] =
            ((j + 32768) | 0) >>> 0 > 65535 ? (i >> 31) ^ 32767 : j;
          f = (f + 1) | 0;
        } while ((f | 0) != 8);
        n =
          ((n | 0) < 16) & (((k | 0) != 0) & (((k & 3) | 0) == 0))
            ? (n + -4) | 0
            : n;
        k = (k + 1) | 0;
        if ((k | 0) == 16) break;
        else m = (m + 2) | 0;
      }
      m = s ? e : 16;
      n = (m | 0) > 1;
      e = (v + 4) | 0;
      o = (v + 8) | 0;
      p = (v + 12) | 0;
      q = (t + 28) | 0;
      j = d;
      k = 0;
      while (1) {
        c[u >> 2] = 0;
        c[(u + 4) >> 2] = 0;
        c[(u + 8) >> 2] = 0;
        c[(u + 12) >> 2] = 0;
        c[(u + 16) >> 2] = 0;
        c[(u + 20) >> 2] = 0;
        c[(u + 24) >> 2] = 0;
        c[(u + 28) >> 2] = 0;
        g = 0;
        do {
          if (n) {
            h = (u + (g << 2)) | 0;
            f = 1;
            i = c[h >> 2] | 0;
            do {
              i =
                ((R(
                  b[(j + (f << 1)) >> 1] | 0,
                  a[(3893 + ((f << 1) << 5) + g) >> 0] | 0
                ) |
                  0) +
                  i) |
                0;
              f = (f + 2) | 0;
            } while ((f | 0) < (m | 0));
            c[h >> 2] = i;
          }
          g = (g + 1) | 0;
        } while ((g | 0) != 8);
        c[w >> 2] = 0;
        c[(w + 4) >> 2] = 0;
        c[(w + 8) >> 2] = 0;
        c[(w + 12) >> 2] = 0;
        g = 0;
        do {
          h = (w + (g << 2)) | 0;
          f = 1;
          i = c[h >> 2] | 0;
          do {
            i =
              ((R(
                b[(j + ((f << 1) << 1)) >> 1] | 0,
                a[(3893 + ((f << 2) << 5) + g) >> 0] | 0
              ) |
                0) +
                i) |
              0;
            f = (f + 2) | 0;
          } while ((f | 0) < 8);
          c[h >> 2] = i;
          g = (g + 1) | 0;
        } while ((g | 0) != 4);
        r = b[j >> 1] << 6;
        i = b[(j + 16) >> 1] << 6;
        s = (i + r) | 0;
        i = (r - i) | 0;
        r = b[(j + 8) >> 1] | 0;
        d = b[(j + 24) >> 1] | 0;
        f = (((d * 36) | 0) + ((r * 83) | 0)) | 0;
        r = ((R(d, -83) | 0) + ((r * 36) | 0)) | 0;
        d = (f + s) | 0;
        c[v >> 2] = d;
        c[e >> 2] = r + i;
        c[o >> 2] = i - r;
        c[p >> 2] = s - f;
        f = c[w >> 2] | 0;
        c[t >> 2] = f + d;
        c[q >> 2] = d - f;
        f = 1;
        do {
          s = c[(v + (f << 2)) >> 2] | 0;
          d = c[(w + (f << 2)) >> 2] | 0;
          c[(t + (f << 2)) >> 2] = d + s;
          c[(t + ((7 - f) << 2)) >> 2] = s - d;
          f = (f + 1) | 0;
        } while ((f | 0) != 4);
        f = 0;
        do {
          d = c[(t + (f << 2)) >> 2] | 0;
          s = c[(u + (f << 2)) >> 2] | 0;
          i = (d + 2048 + s) | 0;
          r = i >> 12;
          b[(j + (f << 1)) >> 1] =
            ((r + 32768) | 0) >>> 0 > 65535 ? (i >> 31) ^ 32767 : r;
          s = (d - s + 2048) | 0;
          d = s >> 12;
          b[(j + ((15 - f) << 1)) >> 1] =
            ((d + 32768) | 0) >>> 0 > 65535 ? (s >> 31) ^ 32767 : d;
          f = (f + 1) | 0;
        } while ((f | 0) != 8);
        k = (k + 1) | 0;
        if ((k | 0) == 16) break;
        else j = (j + 32) | 0;
      }
      l = x;
      return;
    }
    function xd(d, e) {
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0;
      A = l;
      l = (l + 224) | 0;
      u = (A + 160) | 0;
      v = (A + 96) | 0;
      w = (A + 64) | 0;
      x = (A + 32) | 0;
      y = (A + 16) | 0;
      z = A;
      t = (e | 0) < 32;
      o = (e + 4) | 0;
      p = (y + 4) | 0;
      q = (y + 8) | 0;
      r = (y + 12) | 0;
      s = (w + 28) | 0;
      m = 0;
      n = d;
      o = (o | 0) < 32 ? o : 32;
      while (1) {
        f = v;
        g = (f + 64) | 0;
        do {
          c[f >> 2] = 0;
          f = (f + 4) | 0;
        } while ((f | 0) < (g | 0));
        h = (o | 0) > 1;
        f = 0;
        do {
          if (h) {
            i = (v + (f << 2)) | 0;
            g = 1;
            j = c[i >> 2] | 0;
            do {
              j =
                ((R(
                  b[(n + ((g << 5) << 1)) >> 1] | 0,
                  a[(3893 + (g << 5) + f) >> 0] | 0
                ) |
                  0) +
                  j) |
                0;
              g = (g + 2) | 0;
            } while ((g | 0) < (o | 0));
            c[i >> 2] = j;
          }
          f = (f + 1) | 0;
        } while ((f | 0) != 16);
        c[x >> 2] = 0;
        c[(x + 4) >> 2] = 0;
        c[(x + 8) >> 2] = 0;
        c[(x + 12) >> 2] = 0;
        c[(x + 16) >> 2] = 0;
        c[(x + 20) >> 2] = 0;
        c[(x + 24) >> 2] = 0;
        c[(x + 28) >> 2] = 0;
        h = ((o | 0) / 2) | 0;
        i = (o | 0) > 3;
        g = 0;
        do {
          if (i) {
            j = (x + (g << 2)) | 0;
            f = 1;
            k = c[j >> 2] | 0;
            do {
              k =
                ((R(
                  b[(n + ((f << 6) << 1)) >> 1] | 0,
                  a[(3893 + ((f << 1) << 5) + g) >> 0] | 0
                ) |
                  0) +
                  k) |
                0;
              f = (f + 2) | 0;
            } while ((f | 0) < (h | 0));
            c[j >> 2] = k;
          }
          g = (g + 1) | 0;
        } while ((g | 0) != 8);
        c[z >> 2] = 0;
        c[(z + 4) >> 2] = 0;
        c[(z + 8) >> 2] = 0;
        c[(z + 12) >> 2] = 0;
        g = 0;
        do {
          h = (z + (g << 2)) | 0;
          f = 1;
          i = c[h >> 2] | 0;
          do {
            i =
              ((R(
                b[(n + ((f << 7) << 1)) >> 1] | 0,
                a[(3893 + ((f << 2) << 5) + g) >> 0] | 0
              ) |
                0) +
                i) |
              0;
            f = (f + 2) | 0;
          } while ((f | 0) < 8);
          c[h >> 2] = i;
          g = (g + 1) | 0;
        } while ((g | 0) != 4);
        i = b[n >> 1] << 6;
        h = b[(n + 1024) >> 1] << 6;
        j = (h + i) | 0;
        h = (i - h) | 0;
        i = b[(n + 512) >> 1] | 0;
        k = b[(n + 1536) >> 1] | 0;
        f = (((k * 36) | 0) + ((i * 83) | 0)) | 0;
        i = ((R(k, -83) | 0) + ((i * 36) | 0)) | 0;
        k = (f + j) | 0;
        c[y >> 2] = k;
        c[p >> 2] = i + h;
        c[q >> 2] = h - i;
        c[r >> 2] = j - f;
        f = c[z >> 2] | 0;
        c[w >> 2] = f + k;
        c[s >> 2] = k - f;
        f = 1;
        do {
          j = c[(y + (f << 2)) >> 2] | 0;
          k = c[(z + (f << 2)) >> 2] | 0;
          c[(w + (f << 2)) >> 2] = k + j;
          c[(w + ((7 - f) << 2)) >> 2] = j - k;
          f = (f + 1) | 0;
        } while ((f | 0) != 4);
        f = 0;
        do {
          j = c[(w + (f << 2)) >> 2] | 0;
          k = c[(x + (f << 2)) >> 2] | 0;
          c[(u + (f << 2)) >> 2] = k + j;
          c[(u + ((15 - f) << 2)) >> 2] = j - k;
          f = (f + 1) | 0;
        } while ((f | 0) != 8);
        f = 0;
        do {
          k = c[(u + (f << 2)) >> 2] | 0;
          j = c[(v + (f << 2)) >> 2] | 0;
          h = (k + 64 + j) | 0;
          i = h >> 7;
          b[(n + ((f << 5) << 1)) >> 1] =
            ((i + 32768) | 0) >>> 0 > 65535 ? (h >> 31) ^ 32767 : i;
          j = (k - j + 64) | 0;
          k = j >> 7;
          b[(n + (((31 - f) << 5) << 1)) >> 1] =
            ((k + 32768) | 0) >>> 0 > 65535 ? (j >> 31) ^ 32767 : k;
          f = (f + 1) | 0;
        } while ((f | 0) != 16);
        o =
          ((o | 0) < 32) & (((m | 0) != 0) & (((m & 3) | 0) == 0))
            ? (o + -4) | 0
            : o;
        m = (m + 1) | 0;
        if ((m | 0) == 32) break;
        else n = (n + 2) | 0;
      }
      m = t ? e : 32;
      n = (m | 0) > 1;
      o = ((m | 0) / 2) | 0;
      e = (m | 0) > 3;
      p = (y + 4) | 0;
      q = (y + 8) | 0;
      r = (y + 12) | 0;
      s = (w + 28) | 0;
      j = d;
      k = 0;
      while (1) {
        f = v;
        g = (f + 64) | 0;
        do {
          c[f >> 2] = 0;
          f = (f + 4) | 0;
        } while ((f | 0) < (g | 0));
        g = 0;
        do {
          if (n) {
            h = (v + (g << 2)) | 0;
            f = 1;
            i = c[h >> 2] | 0;
            do {
              i =
                ((R(
                  b[(j + (f << 1)) >> 1] | 0,
                  a[(3893 + (f << 5) + g) >> 0] | 0
                ) |
                  0) +
                  i) |
                0;
              f = (f + 2) | 0;
            } while ((f | 0) < (m | 0));
            c[h >> 2] = i;
          }
          g = (g + 1) | 0;
        } while ((g | 0) != 16);
        c[x >> 2] = 0;
        c[(x + 4) >> 2] = 0;
        c[(x + 8) >> 2] = 0;
        c[(x + 12) >> 2] = 0;
        c[(x + 16) >> 2] = 0;
        c[(x + 20) >> 2] = 0;
        c[(x + 24) >> 2] = 0;
        c[(x + 28) >> 2] = 0;
        g = 0;
        do {
          if (e) {
            h = (x + (g << 2)) | 0;
            f = 1;
            i = c[h >> 2] | 0;
            do {
              d = f << 1;
              i =
                ((R(
                  b[(j + (d << 1)) >> 1] | 0,
                  a[(3893 + (d << 5) + g) >> 0] | 0
                ) |
                  0) +
                  i) |
                0;
              f = (f + 2) | 0;
            } while ((f | 0) < (o | 0));
            c[h >> 2] = i;
          }
          g = (g + 1) | 0;
        } while ((g | 0) != 8);
        c[z >> 2] = 0;
        c[(z + 4) >> 2] = 0;
        c[(z + 8) >> 2] = 0;
        c[(z + 12) >> 2] = 0;
        g = 0;
        do {
          h = (z + (g << 2)) | 0;
          f = 1;
          i = c[h >> 2] | 0;
          do {
            d = f << 2;
            i =
              ((R(
                b[(j + (d << 1)) >> 1] | 0,
                a[(3893 + (d << 5) + g) >> 0] | 0
              ) |
                0) +
                i) |
              0;
            f = (f + 2) | 0;
          } while ((f | 0) < 8);
          c[h >> 2] = i;
          g = (g + 1) | 0;
        } while ((g | 0) != 4);
        i = b[j >> 1] << 6;
        h = b[(j + 32) >> 1] << 6;
        t = (h + i) | 0;
        h = (i - h) | 0;
        i = b[(j + 16) >> 1] | 0;
        d = b[(j + 48) >> 1] | 0;
        f = (((d * 36) | 0) + ((i * 83) | 0)) | 0;
        i = ((R(d, -83) | 0) + ((i * 36) | 0)) | 0;
        d = (f + t) | 0;
        c[y >> 2] = d;
        c[p >> 2] = i + h;
        c[q >> 2] = h - i;
        c[r >> 2] = t - f;
        f = c[z >> 2] | 0;
        c[w >> 2] = f + d;
        c[s >> 2] = d - f;
        f = 1;
        do {
          t = c[(y + (f << 2)) >> 2] | 0;
          d = c[(z + (f << 2)) >> 2] | 0;
          c[(w + (f << 2)) >> 2] = d + t;
          c[(w + ((7 - f) << 2)) >> 2] = t - d;
          f = (f + 1) | 0;
        } while ((f | 0) != 4);
        f = 0;
        do {
          t = c[(w + (f << 2)) >> 2] | 0;
          d = c[(x + (f << 2)) >> 2] | 0;
          c[(u + (f << 2)) >> 2] = d + t;
          c[(u + ((15 - f) << 2)) >> 2] = t - d;
          f = (f + 1) | 0;
        } while ((f | 0) != 8);
        f = 0;
        do {
          d = c[(u + (f << 2)) >> 2] | 0;
          t = c[(v + (f << 2)) >> 2] | 0;
          h = (d + 2048 + t) | 0;
          i = h >> 12;
          b[(j + (f << 1)) >> 1] =
            ((i + 32768) | 0) >>> 0 > 65535 ? (h >> 31) ^ 32767 : i;
          t = (d - t + 2048) | 0;
          d = t >> 12;
          b[(j + ((31 - f) << 1)) >> 1] =
            ((d + 32768) | 0) >>> 0 > 65535 ? (t >> 31) ^ 32767 : d;
          f = (f + 1) | 0;
        } while ((f | 0) != 16);
        k = (k + 1) | 0;
        if ((k | 0) == 32) break;
        else j = (j + 64) | 0;
      }
      l = A;
      return;
    }
    function yd(a) {
      a = a | 0;
      var c = 0,
        d = 0,
        e = 0,
        f = 0;
      e = (((((((b[a >> 1] | 0) + 1) | 0) >>> 1) + 32) | 0) >>> 6) & 65535;
      c = 0;
      do {
        f = c << 2;
        d = 0;
        do {
          b[(a + ((d + f) << 1)) >> 1] = e;
          d = (d + 1) | 0;
        } while ((d | 0) != 4);
        c = (c + 1) | 0;
      } while ((c | 0) != 4);
      return;
    }
    function zd(a) {
      a = a | 0;
      var c = 0,
        d = 0,
        e = 0,
        f = 0;
      e = (((((((b[a >> 1] | 0) + 1) | 0) >>> 1) + 32) | 0) >>> 6) & 65535;
      c = 0;
      do {
        f = c << 3;
        d = 0;
        do {
          b[(a + ((d + f) << 1)) >> 1] = e;
          d = (d + 1) | 0;
        } while ((d | 0) != 8);
        c = (c + 1) | 0;
      } while ((c | 0) != 8);
      return;
    }
    function Ad(a) {
      a = a | 0;
      var c = 0,
        d = 0,
        e = 0,
        f = 0;
      e = (((((((b[a >> 1] | 0) + 1) | 0) >>> 1) + 32) | 0) >>> 6) & 65535;
      c = 0;
      do {
        f = c << 4;
        d = 0;
        do {
          b[(a + ((d + f) << 1)) >> 1] = e;
          d = (d + 1) | 0;
        } while ((d | 0) != 16);
        c = (c + 1) | 0;
      } while ((c | 0) != 16);
      return;
    }
    function Bd(a) {
      a = a | 0;
      var c = 0,
        d = 0,
        e = 0,
        f = 0;
      e = (((((((b[a >> 1] | 0) + 1) | 0) >>> 1) + 32) | 0) >>> 6) & 65535;
      c = 0;
      do {
        f = c << 5;
        d = 0;
        do {
          b[(a + ((d + f) << 1)) >> 1] = e;
          d = (d + 1) | 0;
        } while ((d | 0) != 32);
        c = (c + 1) | 0;
      } while ((c | 0) != 32);
      return;
    }
    function Cd(a, b, c, d, e, f, g, h) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      if ((e | 0) > 0) {
        f = 0;
        while (1) {
          fh(a | 0, c | 0, h | 0) | 0;
          f = (f + 1) | 0;
          if ((f | 0) == (e | 0)) break;
          else {
            a = (a + b) | 0;
            c = (c + d) | 0;
          }
        }
      }
      return;
    }
    function Dd(b, c, e, f, g, h, i, j) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0;
      h = (h + -1) | 0;
      A = (48 + (h << 4)) | 0;
      if ((g | 0) > 0) {
        t = (j | 0) > 0;
        u = (48 + (h << 4) + 1) | 0;
        v = (48 + (h << 4) + 2) | 0;
        w = (48 + (h << 4) + 3) | 0;
        x = (48 + (h << 4) + 4) | 0;
        y = (48 + (h << 4) + 5) | 0;
        z = (48 + (h << 4) + 6) | 0;
        s = (48 + (h << 4) + 7) | 0;
        r = 0;
        while (1) {
          if (t) {
            i = a[A >> 0] | 0;
            k = a[u >> 0] | 0;
            l = a[v >> 0] | 0;
            m = a[w >> 0] | 0;
            n = a[x >> 0] | 0;
            o = a[y >> 0] | 0;
            p = a[z >> 0] | 0;
            q = a[s >> 0] | 0;
            h = 0;
            do {
              I = R(d[(e + (h + -3)) >> 0] | 0, i) | 0;
              H = R(d[(e + (h + -2)) >> 0] | 0, k) | 0;
              G = R(d[(e + (h + -1)) >> 0] | 0, l) | 0;
              F = R(d[(e + h) >> 0] | 0, m) | 0;
              B = h;
              h = (h + 1) | 0;
              E = R(d[(e + h) >> 0] | 0, n) | 0;
              D = R(d[(e + (B + 2)) >> 0] | 0, o) | 0;
              C = R(d[(e + (B + 3)) >> 0] | 0, p) | 0;
              C =
                (I +
                  32 +
                  H +
                  G +
                  F +
                  E +
                  D +
                  C +
                  (R(d[(e + (B + 4)) >> 0] | 0, q) | 0)) >>
                6;
              a[(b + B) >> 0] = C >>> 0 > 255 ? (0 - C) >> 31 : C;
            } while ((h | 0) != (j | 0));
          }
          r = (r + 1) | 0;
          if ((r | 0) == (g | 0)) break;
          else {
            e = (e + f) | 0;
            b = (b + c) | 0;
          }
        }
      }
      return;
    }
    function Ed(b, c, e, f, g, h, i, j) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0;
      h = (i + -1) | 0;
      D = (48 + (h << 4)) | 0;
      if ((g | 0) > 0) {
        u = (j | 0) > 0;
        v = (f * 3) | 0;
        w = (48 + (h << 4) + 1) | 0;
        x = f << 1;
        y = (48 + (h << 4) + 2) | 0;
        z = (48 + (h << 4) + 3) | 0;
        A = (48 + (h << 4) + 4) | 0;
        B = (48 + (h << 4) + 5) | 0;
        C = (48 + (h << 4) + 6) | 0;
        s = (48 + (h << 4) + 7) | 0;
        t = f << 2;
        r = 0;
        while (1) {
          if (u) {
            i = a[D >> 0] | 0;
            k = a[w >> 0] | 0;
            l = a[y >> 0] | 0;
            m = a[z >> 0] | 0;
            n = a[A >> 0] | 0;
            o = a[B >> 0] | 0;
            p = a[C >> 0] | 0;
            q = a[s >> 0] | 0;
            h = 0;
            do {
              K = R(d[(e + (h - v)) >> 0] | 0, i) | 0;
              J = R(d[(e + (h - x)) >> 0] | 0, k) | 0;
              I = R(d[(e + (h - f)) >> 0] | 0, l) | 0;
              H = R(d[(e + h) >> 0] | 0, m) | 0;
              G = R(d[(e + (h + f)) >> 0] | 0, n) | 0;
              F = R(d[(e + (h + x)) >> 0] | 0, o) | 0;
              E = R(d[(e + (h + v)) >> 0] | 0, p) | 0;
              E =
                (K +
                  32 +
                  J +
                  I +
                  H +
                  G +
                  F +
                  E +
                  (R(d[(e + (h + t)) >> 0] | 0, q) | 0)) >>
                6;
              a[(b + h) >> 0] = E >>> 0 > 255 ? (0 - E) >> 31 : E;
              h = (h + 1) | 0;
            } while ((h | 0) != (j | 0));
          }
          r = (r + 1) | 0;
          if ((r | 0) == (g | 0)) break;
          else {
            e = (e + f) | 0;
            b = (b + c) | 0;
          }
        }
      }
      return;
    }
    function Fd(c, d, e, f, g, h, i, j) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        S = 0,
        T = 0,
        U = 0;
      N = l;
      l = (l + 9088) | 0;
      M = N;
      h = (h + -1) | 0;
      E = (48 + (h << 4)) | 0;
      if ((g | 0) > -7) {
        F = (j | 0) > 0;
        G = (48 + (h << 4) + 1) | 0;
        H = (48 + (h << 4) + 2) | 0;
        I = (48 + (h << 4) + 3) | 0;
        J = (48 + (h << 4) + 4) | 0;
        K = (48 + (h << 4) + 5) | 0;
        L = (48 + (h << 4) + 6) | 0;
        C = (48 + (h << 4) + 7) | 0;
        D = (g + 6) | 0;
        B = M;
        e = (e + (R(f, -3) | 0)) | 0;
        m = 0;
        while (1) {
          if (F) {
            n = a[E >> 0] | 0;
            o = a[G >> 0] | 0;
            p = a[H >> 0] | 0;
            q = a[I >> 0] | 0;
            r = a[J >> 0] | 0;
            s = a[K >> 0] | 0;
            t = a[L >> 0] | 0;
            u = a[C >> 0] | 0;
            k = 0;
            h = a[(e + -3) >> 0] | 0;
            v = a[(e + -2) >> 0] | 0;
            w = a[(e + -1) >> 0] | 0;
            x = a[e >> 0] | 0;
            y = a[(e + 1) >> 0] | 0;
            z = a[(e + 2) >> 0] | 0;
            A = a[(e + 3) >> 0] | 0;
            while (1) {
              O =
                ((R(v & 255, o) | 0) +
                  (R(h & 255, n) | 0) +
                  (R(w & 255, p) | 0) +
                  (R(x & 255, q) | 0) +
                  (R(y & 255, r) | 0) +
                  (R(z & 255, s) | 0) +
                  (R(A & 255, t) | 0)) |
                0;
              h = a[(e + (k + 4)) >> 0] | 0;
              b[(B + (k << 1)) >> 1] = O + (R(h & 255, u) | 0);
              k = (k + 1) | 0;
              if ((k | 0) == (j | 0)) break;
              else {
                U = A;
                T = z;
                S = y;
                Q = x;
                P = w;
                O = v;
                A = h;
                z = U;
                y = T;
                x = S;
                w = Q;
                v = P;
                h = O;
              }
            }
          }
          if ((m | 0) < (D | 0)) {
            B = (B + 128) | 0;
            e = (e + f) | 0;
            m = (m + 1) | 0;
          } else break;
        }
        h = (i + -1) | 0;
        v = (48 + (h << 4)) | 0;
        if ((g | 0) > 0) {
          w = (j | 0) > 0;
          x = (48 + (h << 4) + 1) | 0;
          y = (48 + (h << 4) + 2) | 0;
          z = (48 + (h << 4) + 3) | 0;
          A = (48 + (h << 4) + 4) | 0;
          B = (48 + (h << 4) + 5) | 0;
          C = (48 + (h << 4) + 6) | 0;
          u = (48 + (h << 4) + 7) | 0;
          t = 0;
          h = (M + 384) | 0;
          while (1) {
            if (w) {
              p = a[v >> 0] | 0;
              q = a[x >> 0] | 0;
              r = a[y >> 0] | 0;
              s = a[z >> 0] | 0;
              k = a[A >> 0] | 0;
              m = a[B >> 0] | 0;
              n = a[C >> 0] | 0;
              o = a[u >> 0] | 0;
              e = 0;
              do {
                U = R(b[(h + ((e + -192) << 1)) >> 1] | 0, p) | 0;
                U = ((R(b[(h + ((e + -128) << 1)) >> 1] | 0, q) | 0) + U) | 0;
                U = (U + (R(b[(h + ((e + -64) << 1)) >> 1] | 0, r) | 0)) | 0;
                U = (U + (R(b[(h + (e << 1)) >> 1] | 0, s) | 0)) | 0;
                U = (U + (R(b[(h + ((e + 64) << 1)) >> 1] | 0, k) | 0)) | 0;
                U = (U + (R(b[(h + ((e + 128) << 1)) >> 1] | 0, m) | 0)) | 0;
                U = (U + (R(b[(h + ((e + 192) << 1)) >> 1] | 0, n) | 0)) | 0;
                U =
                  (((U + (R(b[(h + ((e + 256) << 1)) >> 1] | 0, o) | 0)) >> 6) +
                    32) >>
                  6;
                a[(c + e) >> 0] = U >>> 0 > 255 ? (0 - U) >> 31 : U;
                e = (e + 1) | 0;
              } while ((e | 0) != (j | 0));
            }
            t = (t + 1) | 0;
            if ((t | 0) == (g | 0)) break;
            else {
              c = (c + d) | 0;
              h = (h + 128) | 0;
            }
          }
        }
      }
      l = N;
      return;
    }
    function Gd(b, c, e, f, g, h, i, j, k, l, m) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      var n = 0,
        o = 0,
        p = 0,
        q = 0;
      o = (h + 6) | 0;
      p = (1 << o) >> 1;
      if ((g | 0) > 0) {
        q = (m | 0) > 0;
        n = i << 6;
        i = 0;
        l = b;
        h = e;
        while (1) {
          if (q) {
            k = 0;
            do {
              e = ((((R(n, d[(h + k) >> 0] | 0) | 0) + p) >> o) + j) | 0;
              a[(l + k) >> 0] = e >>> 0 > 255 ? (0 - e) >> 31 : e;
              k = (k + 1) | 0;
            } while ((k | 0) != (m | 0));
          }
          i = (i + 1) | 0;
          if ((i | 0) == (g | 0)) break;
          else {
            l = (l + c) | 0;
            h = (h + f) | 0;
          }
        }
      }
      return;
    }
    function Hd(b, c, e, f, g, h, i, j, k, l, m) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      var n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0;
      k = (k + -1) | 0;
      E = (48 + (k << 4)) | 0;
      v = (h + 6) | 0;
      w = (1 << v) >> 1;
      if ((g | 0) > 0) {
        x = (m | 0) > 0;
        y = (48 + (k << 4) + 1) | 0;
        z = (48 + (k << 4) + 2) | 0;
        A = (48 + (k << 4) + 3) | 0;
        B = (48 + (k << 4) + 4) | 0;
        C = (48 + (k << 4) + 5) | 0;
        D = (48 + (k << 4) + 6) | 0;
        u = (48 + (k << 4) + 7) | 0;
        t = 0;
        while (1) {
          if (x) {
            l = a[E >> 0] | 0;
            h = a[y >> 0] | 0;
            n = a[z >> 0] | 0;
            o = a[A >> 0] | 0;
            p = a[B >> 0] | 0;
            q = a[C >> 0] | 0;
            r = a[D >> 0] | 0;
            s = a[u >> 0] | 0;
            k = 0;
            do {
              G = R(d[(e + (k + -3)) >> 0] | 0, l) | 0;
              G = ((R(d[(e + (k + -2)) >> 0] | 0, h) | 0) + G) | 0;
              G = (G + (R(d[(e + (k + -1)) >> 0] | 0, n) | 0)) | 0;
              G = (G + (R(d[(e + k) >> 0] | 0, o) | 0)) | 0;
              F = k;
              k = (k + 1) | 0;
              G = (G + (R(d[(e + k) >> 0] | 0, p) | 0)) | 0;
              G = (G + (R(d[(e + (F + 2)) >> 0] | 0, q) | 0)) | 0;
              G = (G + (R(d[(e + (F + 3)) >> 0] | 0, r) | 0)) | 0;
              G =
                ((((R((G + (R(d[(e + (F + 4)) >> 0] | 0, s) | 0)) | 0, i) | 0) +
                  w) >>
                  v) +
                  j) |
                0;
              a[(b + F) >> 0] = G >>> 0 > 255 ? (0 - G) >> 31 : G;
            } while ((k | 0) != (m | 0));
          }
          t = (t + 1) | 0;
          if ((t | 0) == (g | 0)) break;
          else {
            e = (e + f) | 0;
            b = (b + c) | 0;
          }
        }
      }
      return;
    }
    function Id(b, c, e, f, g, h, i, j, k, l, m) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      var n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0;
      k = (l + -1) | 0;
      H = (48 + (k << 4)) | 0;
      w = (h + 6) | 0;
      x = (1 << w) >> 1;
      if ((g | 0) > 0) {
        y = (m | 0) > 0;
        z = (f * 3) | 0;
        A = (48 + (k << 4) + 1) | 0;
        B = f << 1;
        C = (48 + (k << 4) + 2) | 0;
        D = (48 + (k << 4) + 3) | 0;
        E = (48 + (k << 4) + 4) | 0;
        F = (48 + (k << 4) + 5) | 0;
        G = (48 + (k << 4) + 6) | 0;
        u = (48 + (k << 4) + 7) | 0;
        v = f << 2;
        t = 0;
        while (1) {
          if (y) {
            l = a[H >> 0] | 0;
            h = a[A >> 0] | 0;
            n = a[C >> 0] | 0;
            o = a[D >> 0] | 0;
            p = a[E >> 0] | 0;
            q = a[F >> 0] | 0;
            r = a[G >> 0] | 0;
            s = a[u >> 0] | 0;
            k = 0;
            do {
              I = R(d[(e + (k - z)) >> 0] | 0, l) | 0;
              I = ((R(d[(e + (k - B)) >> 0] | 0, h) | 0) + I) | 0;
              I = (I + (R(d[(e + (k - f)) >> 0] | 0, n) | 0)) | 0;
              I = (I + (R(d[(e + k) >> 0] | 0, o) | 0)) | 0;
              I = (I + (R(d[(e + (k + f)) >> 0] | 0, p) | 0)) | 0;
              I = (I + (R(d[(e + (k + B)) >> 0] | 0, q) | 0)) | 0;
              I = (I + (R(d[(e + (k + z)) >> 0] | 0, r) | 0)) | 0;
              I =
                ((((R((I + (R(d[(e + (k + v)) >> 0] | 0, s) | 0)) | 0, i) | 0) +
                  x) >>
                  w) +
                  j) |
                0;
              a[(b + k) >> 0] = I >>> 0 > 255 ? (0 - I) >> 31 : I;
              k = (k + 1) | 0;
            } while ((k | 0) != (m | 0));
          }
          t = (t + 1) | 0;
          if ((t | 0) == (g | 0)) break;
          else {
            e = (e + f) | 0;
            b = (b + c) | 0;
          }
        }
      }
      return;
    }
    function Jd(c, d, e, f, g, h, i, j, k, m, n) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      m = m | 0;
      n = n | 0;
      var o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0;
      S = l;
      l = (l + 9088) | 0;
      O = S;
      P = (h + 6) | 0;
      Q = (1 << P) >> 1;
      h = (k + -1) | 0;
      G = (48 + (h << 4)) | 0;
      if ((g | 0) > -7) {
        H = (n | 0) > 0;
        I = (48 + (h << 4) + 1) | 0;
        J = (48 + (h << 4) + 2) | 0;
        K = (48 + (h << 4) + 3) | 0;
        L = (48 + (h << 4) + 4) | 0;
        M = (48 + (h << 4) + 5) | 0;
        N = (48 + (h << 4) + 6) | 0;
        E = (48 + (h << 4) + 7) | 0;
        F = (g + 6) | 0;
        C = O;
        D = 0;
        k = (e + (R(f, -3) | 0)) | 0;
        while (1) {
          if (H) {
            o = a[G >> 0] | 0;
            p = a[I >> 0] | 0;
            q = a[J >> 0] | 0;
            r = a[K >> 0] | 0;
            s = a[L >> 0] | 0;
            t = a[M >> 0] | 0;
            u = a[N >> 0] | 0;
            v = a[E >> 0] | 0;
            e = 0;
            h = a[(k + -3) >> 0] | 0;
            w = a[(k + -2) >> 0] | 0;
            x = a[(k + -1) >> 0] | 0;
            y = a[k >> 0] | 0;
            z = a[(k + 1) >> 0] | 0;
            A = a[(k + 2) >> 0] | 0;
            B = a[(k + 3) >> 0] | 0;
            while (1) {
              T =
                ((R(w & 255, p) | 0) +
                  (R(h & 255, o) | 0) +
                  (R(x & 255, q) | 0) +
                  (R(y & 255, r) | 0) +
                  (R(z & 255, s) | 0) +
                  (R(A & 255, t) | 0) +
                  (R(B & 255, u) | 0)) |
                0;
              h = a[(k + (e + 4)) >> 0] | 0;
              b[(C + (e << 1)) >> 1] = T + (R(h & 255, v) | 0);
              e = (e + 1) | 0;
              if ((e | 0) == (n | 0)) break;
              else {
                Y = B;
                X = A;
                W = z;
                V = y;
                U = x;
                T = w;
                B = h;
                A = Y;
                z = X;
                y = W;
                x = V;
                w = U;
                h = T;
              }
            }
          }
          if ((D | 0) < (F | 0)) {
            C = (C + 128) | 0;
            D = (D + 1) | 0;
            k = (k + f) | 0;
          } else break;
        }
        h = (m + -1) | 0;
        x = (48 + (h << 4)) | 0;
        if ((g | 0) > 0) {
          y = (n | 0) > 0;
          z = (48 + (h << 4) + 1) | 0;
          A = (48 + (h << 4) + 2) | 0;
          B = (48 + (h << 4) + 3) | 0;
          C = (48 + (h << 4) + 4) | 0;
          D = (48 + (h << 4) + 5) | 0;
          E = (48 + (h << 4) + 6) | 0;
          w = (48 + (h << 4) + 7) | 0;
          h = (O + 384) | 0;
          k = 0;
          while (1) {
            if (y) {
              v = a[x >> 0] | 0;
              o = a[z >> 0] | 0;
              p = a[A >> 0] | 0;
              q = a[B >> 0] | 0;
              r = a[C >> 0] | 0;
              s = a[D >> 0] | 0;
              t = a[E >> 0] | 0;
              u = a[w >> 0] | 0;
              e = 0;
              do {
                Y = R(b[(h + ((e + -192) << 1)) >> 1] | 0, v) | 0;
                Y = ((R(b[(h + ((e + -128) << 1)) >> 1] | 0, o) | 0) + Y) | 0;
                Y = (Y + (R(b[(h + ((e + -64) << 1)) >> 1] | 0, p) | 0)) | 0;
                Y = (Y + (R(b[(h + (e << 1)) >> 1] | 0, q) | 0)) | 0;
                Y = (Y + (R(b[(h + ((e + 64) << 1)) >> 1] | 0, r) | 0)) | 0;
                Y = (Y + (R(b[(h + ((e + 128) << 1)) >> 1] | 0, s) | 0)) | 0;
                Y = (Y + (R(b[(h + ((e + 192) << 1)) >> 1] | 0, t) | 0)) | 0;
                Y =
                  ((((R(
                    (Y + (R(b[(h + ((e + 256) << 1)) >> 1] | 0, u) | 0)) >> 6,
                    i
                  ) |
                    0) +
                    Q) >>
                    P) +
                    j) |
                  0;
                a[(c + e) >> 0] = Y >>> 0 > 255 ? (0 - Y) >> 31 : Y;
                e = (e + 1) | 0;
              } while ((e | 0) != (n | 0));
            }
            k = (k + 1) | 0;
            if ((k | 0) == (g | 0)) break;
            else {
              c = (c + d) | 0;
              h = (h + 128) | 0;
            }
          }
        }
      }
      l = S;
      return;
    }
    function Kd(b, c, e, f, g, h, i, j) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0;
      h = (h + -1) | 0;
      s = (16 + (h << 2)) | 0;
      if ((g | 0) > 0) {
        p = (j | 0) > 0;
        q = (16 + (h << 2) + 1) | 0;
        r = (16 + (h << 2) + 2) | 0;
        o = (16 + (h << 2) + 3) | 0;
        n = 0;
        while (1) {
          if (p) {
            i = a[s >> 0] | 0;
            k = a[q >> 0] | 0;
            l = a[r >> 0] | 0;
            m = a[o >> 0] | 0;
            h = 0;
            do {
              w = R(d[(e + (h + -1)) >> 0] | 0, i) | 0;
              v = R(d[(e + h) >> 0] | 0, k) | 0;
              t = h;
              h = (h + 1) | 0;
              u = R(d[(e + h) >> 0] | 0, l) | 0;
              u = (w + 32 + v + u + (R(d[(e + (t + 2)) >> 0] | 0, m) | 0)) >> 6;
              a[(b + t) >> 0] = u >>> 0 > 255 ? (0 - u) >> 31 : u;
            } while ((h | 0) != (j | 0));
          }
          n = (n + 1) | 0;
          if ((n | 0) == (g | 0)) break;
          else {
            e = (e + f) | 0;
            b = (b + c) | 0;
          }
        }
      }
      return;
    }
    function Ld(b, c, e, f, g, h, i, j) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0;
      h = (i + -1) | 0;
      t = (16 + (h << 2)) | 0;
      if ((g | 0) > 0) {
        q = (j | 0) > 0;
        r = (16 + (h << 2) + 1) | 0;
        s = (16 + (h << 2) + 2) | 0;
        o = (16 + (h << 2) + 3) | 0;
        p = f << 1;
        n = 0;
        while (1) {
          if (q) {
            i = a[t >> 0] | 0;
            k = a[r >> 0] | 0;
            l = a[s >> 0] | 0;
            m = a[o >> 0] | 0;
            h = 0;
            do {
              w = R(d[(e + (h - f)) >> 0] | 0, i) | 0;
              v = R(d[(e + h) >> 0] | 0, k) | 0;
              u = R(d[(e + (h + f)) >> 0] | 0, l) | 0;
              u = (w + 32 + v + u + (R(d[(e + (h + p)) >> 0] | 0, m) | 0)) >> 6;
              a[(b + h) >> 0] = u >>> 0 > 255 ? (0 - u) >> 31 : u;
              h = (h + 1) | 0;
            } while ((h | 0) != (j | 0));
          }
          n = (n + 1) | 0;
          if ((n | 0) == (g | 0)) break;
          else {
            e = (e + f) | 0;
            b = (b + c) | 0;
          }
        }
      }
      return;
    }
    function Md(c, d, e, f, g, h, i, j) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0;
      B = l;
      l = (l + 8576) | 0;
      A = B;
      h = (h + -1) | 0;
      w = (16 + (h << 2)) | 0;
      if ((g | 0) > -3) {
        x = (j | 0) > 0;
        y = (16 + (h << 2) + 1) | 0;
        z = (16 + (h << 2) + 2) | 0;
        u = (16 + (h << 2) + 3) | 0;
        v = (g + 2) | 0;
        s = 0;
        t = A;
        e = (e + (0 - f)) | 0;
        while (1) {
          if (x) {
            m = a[w >> 0] | 0;
            n = a[y >> 0] | 0;
            o = a[z >> 0] | 0;
            p = a[u >> 0] | 0;
            k = 0;
            h = a[(e + -1) >> 0] | 0;
            q = a[e >> 0] | 0;
            r = a[(e + 1) >> 0] | 0;
            while (1) {
              C =
                ((R(q & 255, n) | 0) +
                  (R(h & 255, m) | 0) +
                  (R(r & 255, o) | 0)) |
                0;
              h = a[(e + (k + 2)) >> 0] | 0;
              b[(t + (k << 1)) >> 1] = C + (R(h & 255, p) | 0);
              k = (k + 1) | 0;
              if ((k | 0) == (j | 0)) break;
              else {
                D = r;
                C = q;
                r = h;
                q = D;
                h = C;
              }
            }
          }
          if ((s | 0) < (v | 0)) {
            s = (s + 1) | 0;
            t = (t + 128) | 0;
            e = (e + f) | 0;
          } else break;
        }
        h = (i + -1) | 0;
        r = (16 + (h << 2)) | 0;
        if ((g | 0) > 0) {
          s = (j | 0) > 0;
          t = (16 + (h << 2) + 1) | 0;
          u = (16 + (h << 2) + 2) | 0;
          q = (16 + (h << 2) + 3) | 0;
          p = 0;
          h = (A + 128) | 0;
          while (1) {
            if (s) {
              k = a[r >> 0] | 0;
              m = a[t >> 0] | 0;
              n = a[u >> 0] | 0;
              o = a[q >> 0] | 0;
              e = 0;
              do {
                D = R(b[(h + ((e + -64) << 1)) >> 1] | 0, k) | 0;
                D = ((R(b[(h + (e << 1)) >> 1] | 0, m) | 0) + D) | 0;
                D = (D + (R(b[(h + ((e + 64) << 1)) >> 1] | 0, n) | 0)) | 0;
                D =
                  (((D + (R(b[(h + ((e + 128) << 1)) >> 1] | 0, o) | 0)) >> 6) +
                    32) >>
                  6;
                a[(c + e) >> 0] = D >>> 0 > 255 ? (0 - D) >> 31 : D;
                e = (e + 1) | 0;
              } while ((e | 0) != (j | 0));
            }
            p = (p + 1) | 0;
            if ((p | 0) == (g | 0)) break;
            else {
              c = (c + d) | 0;
              h = (h + 128) | 0;
            }
          }
        }
      }
      l = B;
      return;
    }
    function Nd(b, c, e, f, g, h, i, j, k, l, m) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      var n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
      k = (k + -1) | 0;
      w = (16 + (k << 2)) | 0;
      r = (h + 6) | 0;
      s = (1 << r) >> 1;
      if ((g | 0) > 0) {
        t = (m | 0) > 0;
        u = (16 + (k << 2) + 1) | 0;
        v = (16 + (k << 2) + 2) | 0;
        q = (16 + (k << 2) + 3) | 0;
        p = 0;
        k = b;
        while (1) {
          if (t) {
            h = a[w >> 0] | 0;
            b = a[u >> 0] | 0;
            n = a[v >> 0] | 0;
            o = a[q >> 0] | 0;
            l = 0;
            do {
              y = R(d[(e + (l + -1)) >> 0] | 0, h) | 0;
              y = ((R(d[(e + l) >> 0] | 0, b) | 0) + y) | 0;
              x = l;
              l = (l + 1) | 0;
              y = (y + (R(d[(e + l) >> 0] | 0, n) | 0)) | 0;
              y =
                ((((R((y + (R(d[(e + (x + 2)) >> 0] | 0, o) | 0)) | 0, i) | 0) +
                  s) >>
                  r) +
                  j) |
                0;
              a[(k + x) >> 0] = y >>> 0 > 255 ? (0 - y) >> 31 : y;
            } while ((l | 0) != (m | 0));
          }
          p = (p + 1) | 0;
          if ((p | 0) == (g | 0)) break;
          else {
            e = (e + f) | 0;
            k = (k + c) | 0;
          }
        }
      }
      return;
    }
    function Od(b, c, e, f, g, h, i, j, k, l, m) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      var n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
      k = (l + -1) | 0;
      x = (16 + (k << 2)) | 0;
      s = (h + 6) | 0;
      t = (1 << s) >> 1;
      if ((g | 0) > 0) {
        u = (m | 0) > 0;
        v = (16 + (k << 2) + 1) | 0;
        w = (16 + (k << 2) + 2) | 0;
        q = (16 + (k << 2) + 3) | 0;
        r = f << 1;
        p = 0;
        k = b;
        while (1) {
          if (u) {
            h = a[x >> 0] | 0;
            b = a[v >> 0] | 0;
            n = a[w >> 0] | 0;
            o = a[q >> 0] | 0;
            l = 0;
            do {
              y = R(d[(e + (l - f)) >> 0] | 0, h) | 0;
              y = ((R(d[(e + l) >> 0] | 0, b) | 0) + y) | 0;
              y = (y + (R(d[(e + (l + f)) >> 0] | 0, n) | 0)) | 0;
              y =
                ((((R((y + (R(d[(e + (l + r)) >> 0] | 0, o) | 0)) | 0, i) | 0) +
                  t) >>
                  s) +
                  j) |
                0;
              a[(k + l) >> 0] = y >>> 0 > 255 ? (0 - y) >> 31 : y;
              l = (l + 1) | 0;
            } while ((l | 0) != (m | 0));
          }
          p = (p + 1) | 0;
          if ((p | 0) == (g | 0)) break;
          else {
            e = (e + f) | 0;
            k = (k + c) | 0;
          }
        }
      }
      return;
    }
    function Pd(c, d, e, f, g, h, i, j, k, m, n) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      m = m | 0;
      n = n | 0;
      var o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0;
      F = l;
      l = (l + 8576) | 0;
      C = F;
      k = (k + -1) | 0;
      B = (16 + (k << 2)) | 0;
      D = (h + 6) | 0;
      E = (1 << D) >> 1;
      if ((g | 0) > -3) {
        y = (n | 0) > 0;
        z = (16 + (k << 2) + 1) | 0;
        A = (16 + (k << 2) + 2) | 0;
        w = (16 + (k << 2) + 3) | 0;
        x = (g + 2) | 0;
        u = C;
        v = 0;
        h = (e + (0 - f)) | 0;
        while (1) {
          if (y) {
            o = a[B >> 0] | 0;
            p = a[z >> 0] | 0;
            q = a[A >> 0] | 0;
            r = a[w >> 0] | 0;
            e = 0;
            k = a[(h + -1) >> 0] | 0;
            s = a[h >> 0] | 0;
            t = a[(h + 1) >> 0] | 0;
            while (1) {
              G =
                ((R(s & 255, p) | 0) +
                  (R(k & 255, o) | 0) +
                  (R(t & 255, q) | 0)) |
                0;
              k = a[(h + (e + 2)) >> 0] | 0;
              b[(u + (e << 1)) >> 1] = G + (R(k & 255, r) | 0);
              e = (e + 1) | 0;
              if ((e | 0) == (n | 0)) break;
              else {
                H = t;
                G = s;
                t = k;
                s = H;
                k = G;
              }
            }
          }
          if ((v | 0) < (x | 0)) {
            u = (u + 128) | 0;
            v = (v + 1) | 0;
            h = (h + f) | 0;
          } else break;
        }
        k = (m + -1) | 0;
        t = (16 + (k << 2)) | 0;
        if ((g | 0) > 0) {
          u = (n | 0) > 0;
          v = (16 + (k << 2) + 1) | 0;
          w = (16 + (k << 2) + 2) | 0;
          s = (16 + (k << 2) + 3) | 0;
          k = (C + 128) | 0;
          h = 0;
          while (1) {
            if (u) {
              o = a[t >> 0] | 0;
              p = a[v >> 0] | 0;
              q = a[w >> 0] | 0;
              r = a[s >> 0] | 0;
              e = 0;
              do {
                H = R(b[(k + ((e + -64) << 1)) >> 1] | 0, o) | 0;
                H = ((R(b[(k + (e << 1)) >> 1] | 0, p) | 0) + H) | 0;
                H = (H + (R(b[(k + ((e + 64) << 1)) >> 1] | 0, q) | 0)) | 0;
                H =
                  ((((R(
                    (H + (R(b[(k + ((e + 128) << 1)) >> 1] | 0, r) | 0)) >> 6,
                    i
                  ) |
                    0) +
                    E) >>
                    D) +
                    j) |
                  0;
                a[(c + e) >> 0] = H >>> 0 > 255 ? (0 - H) >> 31 : H;
                e = (e + 1) | 0;
              } while ((e | 0) != (n | 0));
            }
            h = (h + 1) | 0;
            if ((h | 0) == (g | 0)) break;
            else {
              c = (c + d) | 0;
              k = (k + 128) | 0;
            }
          }
        }
      }
      l = F;
      return;
    }
    function Qd(e, f, g, h, i, j, k, m, n) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      m = m | 0;
      n = n | 0;
      var o = 0,
        p = 0,
        q = 0,
        r = 0;
      q = l;
      l = (l + 128) | 0;
      p = q;
      j = p;
      o = (j + 128) | 0;
      do {
        c[j >> 2] = 0;
        j = (j + 4) | 0;
      } while ((j | 0) < (o | 0));
      o = d[(i + 96 + n) >> 0] | 0;
      j = 0;
      do {
        r = j;
        j = (j + 1) | 0;
        c[(p + (((r + o) & 31) << 2)) >> 2] =
          b[(i + 112 + ((n * 10) | 0) + (j << 1)) >> 1];
      } while ((j | 0) != 4);
      if ((m | 0) > 0) {
        i = (k | 0) > 0;
        o = 0;
        while (1) {
          if (i) {
            j = 0;
            do {
              r = d[(f + j) >> 0] | 0;
              r = (r + (c[(p + ((r >>> 3) << 2)) >> 2] | 0)) | 0;
              a[(e + j) >> 0] = r >>> 0 > 255 ? (0 - r) >> 31 : r;
              j = (j + 1) | 0;
            } while ((j | 0) != (k | 0));
          }
          o = (o + 1) | 0;
          if ((o | 0) == (m | 0)) break;
          else {
            f = (f + h) | 0;
            e = (e + g) | 0;
          }
        }
      }
      l = q;
      return;
    }
    function Rd(e, f, g, h, i, j, k, l, m, n, o, p) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      n = n | 0;
      o = o | 0;
      p = p | 0;
      var q = 0,
        r = 0,
        s = 0,
        t = 0;
      r = (i + 112 + ((m * 10) | 0)) | 0;
      q = c[(i + 100 + (m << 2)) >> 2] | 0;
      if ((q | 0) != 1) {
        if (c[j >> 2] | 0) {
          p = b[r >> 1] | 0;
          if ((l | 0) > 0) {
            o = 0;
            do {
              s = ((d[(f + (R(o, h) | 0)) >> 0] | 0) + p) | 0;
              a[(e + (R(o, g) | 0)) >> 0] = s >>> 0 > 255 ? (0 - s) >> 31 : s;
              o = (o + 1) | 0;
            } while ((o | 0) != (l | 0));
            o = 1;
          } else o = 1;
        } else o = 0;
        if (c[(j + 8) >> 2] | 0) {
          n = b[r >> 1] | 0;
          k = (k + -1) | 0;
          if ((l | 0) > 0) {
            p = 0;
            do {
              s = ((d[(f + ((R(p, h) | 0) + k)) >> 0] | 0) + n) | 0;
              a[(e + ((R(p, g) | 0) + k)) >> 0] =
                s >>> 0 > 255 ? (0 - s) >> 31 : s;
              p = (p + 1) | 0;
            } while ((p | 0) != (l | 0));
          }
        }
        if (!q) {
          n = k;
          p = l;
          k = 0;
        } else {
          s = k;
          t = 9;
        }
      } else {
        s = k;
        o = 0;
        t = 9;
      }
      if ((t | 0) == 9) {
        if (c[(j + 4) >> 2] | 0) {
          p = b[r >> 1] | 0;
          if ((o | 0) < (s | 0)) {
            k = o;
            do {
              t = ((d[(f + k) >> 0] | 0) + p) | 0;
              a[(e + k) >> 0] = t >>> 0 > 255 ? (0 - t) >> 31 : t;
              k = (k + 1) | 0;
            } while ((k | 0) != (s | 0));
            k = 1;
          } else k = 1;
        } else k = 0;
        if (c[(j + 12) >> 2] | 0) {
          j = b[r >> 1] | 0;
          p = (l + -1) | 0;
          q = R(p, g) | 0;
          r = R(p, h) | 0;
          if ((o | 0) < (s | 0)) {
            n = o;
            do {
              l = ((d[(f + (n + r)) >> 0] | 0) + j) | 0;
              a[(e + (n + q)) >> 0] = l >>> 0 > 255 ? (0 - l) >> 31 : l;
              n = (n + 1) | 0;
            } while ((n | 0) != (s | 0));
            n = s;
          } else n = s;
        } else {
          n = s;
          p = l;
        }
      }
      Zd(e, f, g, h, i, n, p, m, o, k);
      return;
    }
    function Sd(e, f, g, h, i, j, k, l, m, n, o, p) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      n = n | 0;
      o = o | 0;
      p = p | 0;
      var q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0;
      v = (i + 112 + ((m * 10) | 0)) | 0;
      z = c[(i + 100 + (m << 2)) >> 2] | 0;
      G = (z | 0) != 1;
      if (G) {
        if (c[j >> 2] | 0) {
          t = b[v >> 1] | 0;
          if ((l | 0) > 0) {
            s = 0;
            do {
              D = ((d[(f + (R(s, h) | 0)) >> 0] | 0) + t) | 0;
              a[(e + (R(s, g) | 0)) >> 0] = D >>> 0 > 255 ? (0 - D) >> 31 : D;
              s = (s + 1) | 0;
            } while ((s | 0) != (l | 0));
            u = 1;
          } else u = 1;
        } else u = 0;
        if (c[(j + 8) >> 2] | 0) {
          t = b[v >> 1] | 0;
          k = (k + -1) | 0;
          if ((l | 0) > 0) {
            s = 0;
            do {
              D = ((d[(f + ((R(s, h) | 0) + k)) >> 0] | 0) + t) | 0;
              a[(e + ((R(s, g) | 0) + k)) >> 0] =
                D >>> 0 > 255 ? (0 - D) >> 31 : D;
              s = (s + 1) | 0;
            } while ((s | 0) != (l | 0));
          }
        }
        if (!z) {
          D = k;
          w = 0;
          B = 0;
        } else {
          x = u;
          y = 9;
        }
      } else {
        x = 0;
        y = 9;
      }
      if ((y | 0) == 9) {
        if (c[(j + 4) >> 2] | 0) {
          t = b[v >> 1] | 0;
          if ((x | 0) < (k | 0)) {
            s = x;
            do {
              D = ((d[(f + s) >> 0] | 0) + t) | 0;
              a[(e + s) >> 0] = D >>> 0 > 255 ? (0 - D) >> 31 : D;
              s = (s + 1) | 0;
            } while ((s | 0) != (k | 0));
            w = 1;
          } else w = 1;
        } else w = 0;
        if (c[(j + 12) >> 2] | 0) {
          v = b[v >> 1] | 0;
          l = (l + -1) | 0;
          t = R(l, g) | 0;
          u = R(l, h) | 0;
          if ((x | 0) < (k | 0)) {
            s = x;
            do {
              D = ((d[(f + (s + u)) >> 0] | 0) + v) | 0;
              a[(e + (s + t)) >> 0] = D >>> 0 > 255 ? (0 - D) >> 31 : D;
              s = (s + 1) | 0;
            } while ((s | 0) != (k | 0));
            D = k;
            u = x;
            B = 1;
          } else {
            D = k;
            u = x;
            B = 1;
          }
        } else {
          D = k;
          u = x;
          B = 1;
        }
      }
      Zd(e, f, g, h, i, D, l, m, u, w);
      C = (z | 0) == 2;
      if (!(C & ((a[p >> 0] | 0) == 0))) {
        s = (p + 1) | 0;
        k = (z | 0) == 3;
        if (k & ((a[s >> 0] | 0) == 0))
          if (!(c[(j + 4) >> 2] | 0)) {
            t = (c[(j + 8) >> 2] | 0) == 0;
            A = 1;
            y = 0;
            z = s;
          } else {
            t = 0;
            A = 1;
            y = 0;
            z = s;
          }
        else {
          t = 0;
          A = k;
          y = 0;
          z = s;
        }
      } else {
        if (!(c[j >> 2] | 0)) k = (c[(j + 4) >> 2] | 0) == 0;
        else k = 0;
        t = 0;
        A = 0;
        y = k & 1;
        z = (p + 1) | 0;
      }
      v = t & 1;
      m = (p + 2) | 0;
      if (C & ((a[m >> 0] | 0) == 0) ? (c[(j + 8) >> 2] | 0) == 0 : 0)
        k = (c[(j + 12) >> 2] | 0) == 0;
      else k = 0;
      x = k & 1;
      i = (p + 3) | 0;
      if (A & ((a[i >> 0] | 0) == 0) ? (c[j >> 2] | 0) == 0 : 0)
        k = (c[(j + 12) >> 2] | 0) == 0;
      else k = 0;
      t = k & 1;
      if (
        G & ((a[n >> 0] | 0) != 0)
          ? ((E = (y + w) | 0), (F = (l - t) | 0), (E | 0) < (F | 0))
          : 0
      ) {
        k = E;
        do {
          a[(e + (R(k, g) | 0)) >> 0] = a[(f + (R(k, h) | 0)) >> 0] | 0;
          k = (k + 1) | 0;
        } while ((k | 0) != (F | 0));
      }
      if (
        G & ((a[(n + 1) >> 0] | 0) != 0)
          ? ((H = (v + w) | 0), (I = (l - x) | 0), (H | 0) < (I | 0))
          : 0
      ) {
        s = (D + -1) | 0;
        k = H;
        do {
          a[(e + (s + (R(k, g) | 0))) >> 0] =
            a[(f + (s + (R(k, h) | 0))) >> 0] | 0;
          k = (k + 1) | 0;
        } while ((k | 0) != (I | 0));
      }
      if (
        B & ((a[o >> 0] | 0) != 0)
          ? ((r = (y + u) | 0), (J = (D - v) | 0), (r | 0) < (J | 0))
          : 0
      )
        do {
          a[(e + r) >> 0] = a[(f + r) >> 0] | 0;
          r = (r + 1) | 0;
        } while ((r | 0) != (J | 0));
      if (
        B & ((a[(o + 1) >> 0] | 0) != 0)
          ? ((q = (t + u) | 0), (K = (D - x) | 0), (q | 0) < (K | 0))
          : 0
      ) {
        k = (l + -1) | 0;
        r = R(k, h) | 0;
        k = R(k, g) | 0;
        do {
          a[(e + (q + k)) >> 0] = a[(f + (q + r)) >> 0] | 0;
          q = (q + 1) | 0;
        } while ((q | 0) != (K | 0));
      }
      if (C & ((a[p >> 0] | 0) != 0)) a[e >> 0] = a[f >> 0] | 0;
      r = (D + -1) | 0;
      if (A & ((a[z >> 0] | 0) != 0)) a[(e + r) >> 0] = a[(f + r) >> 0] | 0;
      q = (l + -1) | 0;
      if (C & ((a[m >> 0] | 0) != 0)) {
        K = (e + (r + (R(q, g) | 0))) | 0;
        a[K >> 0] = a[(f + (r + (R(q, h) | 0))) >> 0] | 0;
      }
      if (A & ((a[i >> 0] | 0) != 0)) {
        g = (e + (R(q, g) | 0)) | 0;
        a[g >> 0] = a[(f + (R(q, h) | 0)) >> 0] | 0;
      }
      return;
    }
    function Td(a, b, c, d, e, f) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      Yd(a, b, 1, c, d, e, f);
      return;
    }
    function Ud(a, b, c, d, e, f) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      Yd(a, 1, b, c, d, e, f);
      return;
    }
    function Vd(a, b, c, d, e) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      Xd(a, b, 1, c, d, e);
      return;
    }
    function Wd(a, b, c, d, e) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      Xd(a, 1, b, c, d, e);
      return;
    }
    function Xd(b, e, f, g, h, i) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      var j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0;
      u = f << 2;
      v = R(e, -2) | 0;
      w = (0 - e) | 0;
      t = 0;
      while (1) {
        p = c[(g + (t << 2)) >> 2] | 0;
        if ((p | 0) >= 1) {
          q = (0 - p) | 0;
          r = (a[(h + t) >> 0] | 0) == 0;
          s = (a[(i + t) >> 0] | 0) == 0;
          n = 0;
          o = b;
          while (1) {
            k = (o + w) | 0;
            m = d[k >> 0] | 0;
            l = d[o >> 0] | 0;
            j =
              ((d[(o + v) >> 0] | 0) +
                4 -
                (d[(o + e) >> 0] | 0) +
                ((l - m) << 2)) >>
              3;
            j = (j | 0) < (q | 0) ? q : (j | 0) > (p | 0) ? p : j;
            m = (j + m) | 0;
            if (r) a[k >> 0] = m >>> 0 > 255 ? (0 - m) >> 31 : m;
            j = (l - j) | 0;
            if (s) a[o >> 0] = j >>> 0 > 255 ? (0 - j) >> 31 : j;
            n = (n + 1) | 0;
            if ((n | 0) == 4) break;
            else o = (o + f) | 0;
          }
        }
        t = (t + 1) | 0;
        if ((t | 0) == 2) break;
        else b = (b + u) | 0;
      }
      return;
    }
    function Yd(b, e, f, g, h, i, j) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        _ = 0,
        $ = 0,
        aa = 0,
        ba = 0,
        ca = 0;
      aa = R(e, -3) | 0;
      ba = R(e, -2) | 0;
      ca = (0 - e) | 0;
      M = e << 1;
      N = (f * 3) | 0;
      O = (N + aa) | 0;
      P = (N + ba) | 0;
      Q = (N - e) | 0;
      S = (N + M) | 0;
      T = (N + e) | 0;
      U = g >> 3;
      V = g >> 2;
      W = R(e, -4) | 0;
      X = (e * 3) | 0;
      Y = (N + W) | 0;
      Z = (N + X) | 0;
      _ = ((g >> 1) + g) >> 3;
      $ = f << 2;
      L = 0;
      while (1) {
        m = a[(b + aa) >> 0] | 0;
        n = a[(b + ba) >> 0] | 0;
        o = a[(b + ca) >> 0] | 0;
        k = o & 255;
        z = ((m & 255) - ((n & 255) << 1) + k) | 0;
        z = (z | 0) > -1 ? z : (0 - z) | 0;
        u = a[(b + M) >> 0] | 0;
        t = a[(b + e) >> 0] | 0;
        s = a[b >> 0] | 0;
        l = s & 255;
        B = ((u & 255) - ((t & 255) << 1) + l) | 0;
        B = (B | 0) > -1 ? B : (0 - B) | 0;
        p = d[(b + Q) >> 0] | 0;
        A = ((d[(b + O) >> 0] | 0) - ((d[(b + P) >> 0] | 0) << 1) + p) | 0;
        A = (A | 0) > -1 ? A : (0 - A) | 0;
        q = d[(b + N) >> 0] | 0;
        C = ((d[(b + S) >> 0] | 0) - ((d[(b + T) >> 0] | 0) << 1) + q) | 0;
        C = (C | 0) > -1 ? C : (0 - C) | 0;
        v = (B + z) | 0;
        w = (C + A) | 0;
        K = c[(h + (L << 2)) >> 2] | 0;
        y = a[(i + L) >> 0] | 0;
        D = a[(j + L) >> 0] | 0;
        a: do
          if (((w + v) | 0) < (g | 0)) {
            x = (((K * 5) | 0) + 1) >> 1;
            J = ((d[(b + W) >> 0] | 0) - k) | 0;
            r = a[(b + X) >> 0] | 0;
            I = ((r & 255) - l) | 0;
            if (
              (
                (
                  ((((I | 0) > -1 ? I : (0 - I) | 0) +
                    ((J | 0) > -1 ? J : (0 - J) | 0)) |
                    0) <
                  (U | 0)
                    ? ((J = (k - l) | 0),
                      (((J | 0) > -1 ? J : (0 - J) | 0) | 0) < (x | 0))
                    : 0
                )
                  ? ((J = ((d[(b + Y) >> 0] | 0) - p) | 0),
                    (I = ((d[(b + Z) >> 0] | 0) - q) | 0),
                    ((((I | 0) > -1 ? I : (0 - I) | 0) +
                      ((J | 0) > -1 ? J : (0 - J) | 0)) |
                      0) <
                      (U | 0))
                  : 0
              )
                ? ((J = (p - q) | 0),
                  (((v << 1) | 0) < (V | 0)
                    ? (((J | 0) > -1 ? J : (0 - J) | 0) | 0) < (x | 0)
                    : 0) &
                    (((w << 1) | 0) < (V | 0)))
                : 0
            ) {
              z = K << 1;
              x = (y << 24) >> 24 == 0;
              y = (0 - z) | 0;
              w = (D << 24) >> 24 == 0;
              k = 0;
              v = b;
              while (1) {
                q = m & 255;
                p = n & 255;
                o = o & 255;
                n = s & 255;
                m = t & 255;
                l = u & 255;
                if (x) {
                  K = d[(v + W) >> 0] | 0;
                  J = ((((q + 4 + m + ((o + p + n) << 1)) | 0) >>> 3) - o) | 0;
                  a[(v + ca) >> 0] =
                    ((J | 0) < (y | 0) ? y : (J | 0) > (z | 0) ? z : J) + o;
                  J = ((((q + 2 + p + o + n) | 0) >>> 2) - p) | 0;
                  a[(v + ba) >> 0] =
                    ((J | 0) < (y | 0) ? y : (J | 0) > (z | 0) ? z : J) + p;
                  K =
                    (((((q * 3) | 0) + 4 + p + o + n + (K << 1)) >> 3) - q) | 0;
                  a[(v + aa) >> 0] =
                    ((K | 0) < (y | 0) ? y : (K | 0) > (z | 0) ? z : K) + q;
                }
                if (w) {
                  K = ((((p + 4 + l + ((n + o + m) << 1)) | 0) >>> 3) - n) | 0;
                  a[v >> 0] =
                    ((K | 0) < (y | 0) ? y : (K | 0) > (z | 0) ? z : K) + n;
                  K = ((((o + 2 + n + m + l) | 0) >>> 2) - m) | 0;
                  a[(v + e) >> 0] =
                    ((K | 0) < (y | 0) ? y : (K | 0) > (z | 0) ? z : K) + m;
                  K =
                    ((((o + 4 + n + m + ((l * 3) | 0) + ((r & 255) << 1)) |
                      0) >>>
                      3) -
                      l) |
                    0;
                  a[(v + M) >> 0] =
                    ((K | 0) < (y | 0) ? y : (K | 0) > (z | 0) ? z : K) + l;
                }
                l = (v + f) | 0;
                k = (k + 1) | 0;
                if ((k | 0) == 4) break a;
                v = l;
                m = a[(l + aa) >> 0] | 0;
                n = a[(l + ba) >> 0] | 0;
                o = a[(l + ca) >> 0] | 0;
                s = a[l >> 0] | 0;
                t = a[(l + e) >> 0] | 0;
                u = a[(l + M) >> 0] | 0;
                r = a[(l + X) >> 0] | 0;
              }
            }
            H = K >> 1;
            I = (K * 10) | 0;
            J = (0 - K) | 0;
            G = (y << 24) >> 24 == 0;
            F = (D << 24) >> 24 == 0;
            E = G & (((A + z) | 0) < (_ | 0));
            D = (0 - H) | 0;
            A = F & (((C + B) | 0) < (_ | 0));
            k = 0;
            z = b;
            while (1) {
              x = m & 255;
              y = (z + ba) | 0;
              w = n & 255;
              r = (z + ca) | 0;
              v = o & 255;
              p = s & 255;
              q = (z + e) | 0;
              o = t & 255;
              n = u & 255;
              l =
                (((((p - v) | 0) * 9) | 0) + 8 + (R((o - w) | 0, -3) | 0)) >> 4;
              if ((((l | 0) > -1 ? l : (0 - l) | 0) | 0) < (I | 0)) {
                m = (l | 0) < (J | 0) ? J : (l | 0) > (K | 0) ? K : l;
                l = (m + v) | 0;
                if (G) a[r >> 0] = l >>> 0 > 255 ? (0 - l) >> 31 : l;
                l = (p - m) | 0;
                if (F) a[z >> 0] = l >>> 0 > 255 ? (0 - l) >> 31 : l;
                if (E) {
                  C = ((((x + 1 + v) | 0) >>> 1) - w + m) >> 1;
                  C =
                    (((C | 0) < (D | 0) ? D : (C | 0) > (H | 0) ? H : C) + w) |
                    0;
                  a[y >> 0] = C >>> 0 > 255 ? (0 - C) >> 31 : C;
                }
                if (A) {
                  C = ((((p + 1 + n) | 0) >>> 1) - o - m) >> 1;
                  C =
                    (((C | 0) < (D | 0) ? D : (C | 0) > (H | 0) ? H : C) + o) |
                    0;
                  a[q >> 0] = C >>> 0 > 255 ? (0 - C) >> 31 : C;
                }
              }
              l = (z + f) | 0;
              k = (k + 1) | 0;
              if ((k | 0) == 4) break a;
              z = l;
              m = a[(l + aa) >> 0] | 0;
              n = a[(l + ba) >> 0] | 0;
              o = a[(l + ca) >> 0] | 0;
              s = a[l >> 0] | 0;
              t = a[(l + e) >> 0] | 0;
              u = a[(l + M) >> 0] | 0;
            }
          }
        while (0);
        L = (L + 1) | 0;
        if ((L | 0) == 2) break;
        else b = (b + $) | 0;
      }
      return;
    }
    function Zd(e, f, g, h, i, j, k, l, m, n) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      n = n | 0;
      var o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0;
      o = c[(i + 100 + (l << 2)) >> 2] | 0;
      v = a[(1891 + (o << 2)) >> 0] | 0;
      w = a[(1891 + (o << 2) + 2) >> 0] | 0;
      if ((n | 0) < (k | 0)) {
        u = R(((a[(1891 + (o << 2) + 3) >> 0] | 0) + n) | 0, h) | 0;
        x = (m | 0) < (j | 0);
        t = R(n, g) | 0;
        r = R(((a[(1891 + (o << 2) + 1) >> 0] | 0) + n) | 0, h) | 0;
        s = n;
        n = R(n, h) | 0;
        while (1) {
          if (x) {
            p = (r + v) | 0;
            q = (u + w) | 0;
            o = m;
            do {
              y = a[(f + (o + n)) >> 0] | 0;
              A = a[(f + (p + o)) >> 0] | 0;
              z = a[(f + (q + o)) >> 0] | 0;
              y =
                ((b[
                  (i +
                    112 +
                    ((l * 10) | 0) +
                    (d[
                      (1907 +
                        (((y & 255) > (A & 255)
                          ? 3
                          : (((((y << 24) >> 24 != (A << 24) >> 24) << 31) >>
                              31) +
                              2) |
                            0) +
                          ((y & 255) > (z & 255)
                            ? 1
                            : (((y << 24) >> 24 != (z << 24) >> 24) << 31) >>
                              31))) >>
                        0
                    ] <<
                      1)) >>
                    1
                ] |
                  0) +
                  (y & 255)) |
                0;
              a[(e + (o + t)) >> 0] = y >>> 0 > 255 ? (0 - y) >> 31 : y;
              o = (o + 1) | 0;
            } while ((o | 0) != (j | 0));
          }
          s = (s + 1) | 0;
          if ((s | 0) == (k | 0)) break;
          else {
            t = (t + g) | 0;
            u = (u + h) | 0;
            r = (r + h) | 0;
            n = (n + h) | 0;
          }
        }
      }
      return;
    }
    function _d(b, e, f, g, h) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0;
      n = c[(b + 136) >> 2] | 0;
      j = 1 << c[((c[(b + 200) >> 2] | 0) + 13080) >> 2];
      o = (j + -1) | 0;
      k = o & e;
      l = ((o & f) | 0) != 0;
      i = ((a[(n + 309) >> 0] | 0) != 0) | l;
      b = i & 1;
      c[(n + 31296) >> 2] = b;
      m = ((a[(n + 308) >> 0] | 0) != 0) | ((k | 0) != 0);
      c[(n + 31292) >> 2] = m & 1;
      if (!(o & (f | e))) i = d[(n + 311) >> 0] | 0;
      else i = m & i & 1;
      c[(n + 31300) >> 2] = i;
      if (((k + g) | 0) == (j | 0))
        b = ((a[(n + 310) >> 0] | 0) != 0) & (l ^ 1) & 1;
      c[(n + 31308) >> 2] = b;
      if (!b) b = 0;
      else b = ((g + e) | 0) < (c[(n + 312) >> 2] | 0);
      c[(n + 31304) >> 2] = b & 1;
      c[(n + 31288) >> 2] = (((h + f) | 0) < (c[(n + 316) >> 2] | 0)) & m & 1;
      return;
    }
    function $d(b, d, e, f, g, h, i, j, k) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
      q = l;
      l = (l + 64) | 0;
      m = 1 << h;
      p = (q + 3) & -4;
      if (
        (h | 0) == 3 ? (c[((c[(b + 204) >> 2] | 0) + 1620) >> 2] | 0) > 2 : 0
      ) {
        n = c[(b + 136) >> 2] | 0;
        d = c[(n + 31236) >> 2] | 0;
        n = c[(n + 31240) >> 2] | 0;
        o = m;
        h = 0;
        e = 1;
      } else {
        n = e;
        o = f;
        m = g;
        h = i;
        e = 0;
      }
      _d(b, d, n, o, m);
      ae(b, d, n, o, m, e, h, j, p);
      h = (p + ((j * 12) | 0)) | 0;
      d = (p + ((j * 12) | 0) + 10) | 0;
      if ((((g + f) | 0) == 12) & ((a[d >> 0] | 0) == 3)) a[d >> 0] = 1;
      c[k >> 2] = c[h >> 2];
      c[(k + 4) >> 2] = c[(h + 4) >> 2];
      c[(k + 8) >> 2] = c[(h + 8) >> 2];
      l = q;
      return;
    }
    function ae(e, f, g, h, i, j, k, m, n) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      m = m | 0;
      n = n | 0;
      var o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0,
        N = 0,
        O = 0,
        P = 0,
        Q = 0,
        S = 0,
        T = 0,
        U = 0,
        V = 0,
        W = 0,
        X = 0,
        Y = 0,
        Z = 0,
        _ = 0,
        $ = 0,
        aa = 0,
        ba = 0,
        ca = 0,
        da = 0,
        ea = 0,
        fa = 0,
        ga = 0,
        ha = 0,
        ia = 0,
        ja = 0,
        ka = 0,
        la = 0,
        ma = 0,
        na = 0,
        oa = 0,
        pa = 0,
        qa = 0,
        ra = 0,
        sa = 0,
        ta = 0,
        ua = 0,
        va = 0,
        wa = 0,
        xa = 0,
        ya = 0,
        za = 0,
        Aa = 0,
        Ba = 0,
        Ca = 0,
        Da = 0,
        Ea = 0,
        Fa = 0;
      Fa = l;
      l = (l + 16) | 0;
      Ba = (Fa + 4) | 0;
      Aa = Fa;
      r = c[(e + 136) >> 2] | 0;
      ya = c[(e + 3508) >> 2] | 0;
      Ca = c[(ya + 20) >> 2] | 0;
      ya = c[(ya + 16) >> 2] | 0;
      na = (e + 200) | 0;
      p = c[na >> 2] | 0;
      oa = c[(p + 13156) >> 2] | 0;
      T = c[(r + 31288) >> 2] | 0;
      q = c[(r + 31292) >> 2] | 0;
      qa = c[(r + 31300) >> 2] | 0;
      s = c[(r + 31296) >> 2] | 0;
      D = c[(r + 31308) >> 2] | 0;
      ra = (f + -1) | 0;
      U = (i + g) | 0;
      sa = (U + -1) | 0;
      E = (h + f) | 0;
      wa = (E + -1) | 0;
      ta = (g + -1) | 0;
      Ea = (e + 2428) | 0;
      o = c[(e + 3036) >> 2] | 0;
      if ((c[Ea >> 2] | 0) == 1) Da = o;
      else
        Da =
          c[
            (e +
              3036 +
              (((o >>> 0 > (c[(e + 3040) >> 2] | 0) >>> 0) & 1) << 2)) >>
              2
          ] | 0;
      k = ((j | 0) == 0) & ((k | 0) == 1);
      if (k) {
        j = c[(r + 31248) >> 2] | 0;
        switch (j | 0) {
          case 7:
          case 6:
          case 2: {
            o = 0;
            p = 0;
            t = 10;
            break;
          }
          default:
            t = 5;
        }
      } else t = 5;
      do
        if ((t | 0) == 5) {
          j = (e + 204) | 0;
          o = c[((c[j >> 2] | 0) + 1620) >> 2] & 255;
          if (
            !(
              ((q | 0) == 0) |
              (((ra >> o) | 0) == ((f >> o) | 0)
                ? ((sa >> o) | 0) == ((g >> o) | 0)
                : 0)
            )
          ) {
            o = c[(p + 13084) >> 2] | 0;
            o = ((R(sa >> o, oa) | 0) + (ra >> o)) | 0;
            q = (a[(ya + ((o * 12) | 0) + 10) >> 0] | 0) != 0;
            p = q & 1;
            if (q) {
              q = (ya + ((o * 12) | 0)) | 0;
              c[n >> 2] = c[q >> 2];
              c[(n + 4) >> 2] = c[(q + 4) >> 2];
              c[(n + 8) >> 2] = c[(q + 8) >> 2];
              if (!m) break;
              else o = 1;
            } else o = 0;
          } else {
            o = 0;
            p = 0;
          }
          if (k) {
            j = c[(r + 31248) >> 2] | 0;
            t = 10;
          } else t = 12;
        }
      while (0);
      a: do
        if ((t | 0) == 10) {
          switch (j | 0) {
            case 5:
            case 4:
            case 1: {
              q = 0;
              t = 24;
              break a;
            }
            default: {
            }
          }
          j = (e + 204) | 0;
          t = 12;
        }
      while (0);
      b: do
        if ((t | 0) == 12) {
          r = c[((c[j >> 2] | 0) + 1620) >> 2] & 255;
          if (
            !(
              ((s | 0) == 0) |
              (((wa >> r) | 0) == ((f >> r) | 0)
                ? ((ta >> r) | 0) == ((g >> r) | 0)
                : 0)
            )
          ) {
            j = c[((c[na >> 2] | 0) + 13084) >> 2] | 0;
            k = ((R(ta >> j, oa) | 0) + (wa >> j)) | 0;
            r = a[(ya + ((k * 12) | 0) + 10) >> 0] | 0;
            s = (r << 24) >> 24 != 0;
            q = s & 1;
            if (s) {
              s = (ya + ((k * 12) | 0)) | 0;
              c: do
                if (
                  p | 0
                    ? ((j = ((R(sa >> j, oa) | 0) + (ra >> j)) | 0),
                      (v = (ya + ((j * 12) | 0)) | 0),
                      (v =
                        d[v >> 0] |
                        (d[(v + 1) >> 0] << 8) |
                        (d[(v + 2) >> 0] << 16) |
                        (d[(v + 3) >> 0] << 24)),
                      (x = (ya + ((j * 12) | 0) + 4) | 0),
                      (x =
                        d[x >> 0] |
                        (d[(x + 1) >> 0] << 8) |
                        (d[(x + 2) >> 0] << 16) |
                        (d[(x + 3) >> 0] << 24)),
                      (z = a[(ya + ((j * 12) | 0) + 8) >> 0] | 0),
                      (B = a[(ya + ((j * 12) | 0) + 9) >> 0] | 0),
                      (u =
                        d[s >> 0] |
                        (d[(s + 1) >> 0] << 8) |
                        (d[(s + 2) >> 0] << 16) |
                        (d[(s + 3) >> 0] << 24)),
                      (w = (ya + ((k * 12) | 0) + 4) | 0),
                      (w =
                        d[w >> 0] |
                        (d[(w + 1) >> 0] << 8) |
                        (d[(w + 2) >> 0] << 16) |
                        (d[(w + 3) >> 0] << 24)),
                      (y = a[(ya + ((k * 12) | 0) + 8) >> 0] | 0),
                      (A = a[(ya + ((k * 12) | 0) + 9) >> 0] | 0),
                      (r << 24) >> 24 ==
                        (a[(ya + ((j * 12) | 0) + 10) >> 0] | 0))
                    : 0
                ) {
                  switch ((r << 24) >> 24) {
                    case 3: {
                      if (
                        !((u | 0) == (v | 0)
                          ? (y << 24) >> 24 == (z << 24) >> 24
                          : 0)
                      )
                        break c;
                      if ((A << 24) >> 24 == (B << 24) >> 24)
                        j = (w | 0) == (x | 0);
                      else break c;
                      break;
                    }
                    case 1: {
                      if ((y << 24) >> 24 == (z << 24) >> 24)
                        j = (u | 0) == (v | 0);
                      else break c;
                      break;
                    }
                    case 2: {
                      if ((A << 24) >> 24 == (B << 24) >> 24)
                        j = (w | 0) == (x | 0);
                      else break c;
                      break;
                    }
                    default:
                      break c;
                  }
                  if (j) {
                    t = 24;
                    break b;
                  }
                }
              while (0);
              B = (n + ((o * 12) | 0)) | 0;
              c[B >> 2] = c[s >> 2];
              c[(B + 4) >> 2] = c[(s + 4) >> 2];
              c[(B + 8) >> 2] = c[(s + 8) >> 2];
              if ((o | 0) != (m | 0)) {
                o = (o + 1) | 0;
                t = 24;
              }
            } else t = 24;
          } else {
            q = 0;
            t = 24;
          }
        }
      while (0);
      d: do
        if ((t | 0) == 24) {
          e: do
            if (
              (
                (D | 0) != 0
                  ? ((C = c[na >> 2] | 0),
                    (N = c[(C + 13084) >> 2] | 0),
                    (O = R(ta >> N, oa) | 0),
                    (P = (O + (E >> N)) | 0),
                    (Q = a[(ya + ((P * 12) | 0) + 10) >> 0] | 0),
                    (Q << 24) >> 24 != 0)
                  : 0
              )
                ? (E | 0) < (c[(C + 13120) >> 2] | 0)
                : 0
            ) {
              D = c[(C + 13080) >> 2] | 0;
              if (
                (
                  ((ta >> D) | 0) >= ((g >> D) | 0)
                    ? ((E >> D) | 0) >= ((f >> D) | 0)
                    : 0
                )
                  ? ((z = c[((c[(e + 204) >> 2] | 0) + 1684) >> 2] | 0),
                    (B = c[(C + 13072) >> 2] | 0),
                    (C = c[(C + 13164) >> 2] | 0),
                    (A = (C + 2) | 0),
                    (D =
                      c[
                        (z +
                          (((R((g >> B) & C, A) | 0) + ((f >> B) & C)) << 2)) >>
                          2
                      ] | 0),
                    (c[
                      (z +
                        (((R((ta >> B) & C, A) | 0) + ((E >> B) & C)) << 2)) >>
                        2
                    ] |
                      0) >
                      (D | 0))
                  : 0
              )
                break;
              D = c[((c[(e + 204) >> 2] | 0) + 1620) >> 2] & 255;
              if (
                !(((E >> D) | 0) == ((f >> D) | 0)
                  ? ((ta >> D) | 0) == ((g >> D) | 0)
                  : 0)
              ) {
                k = (ya + ((P * 12) | 0)) | 0;
                f: do
                  if (
                    q | 0
                      ? ((O = (O + (wa >> N)) | 0),
                        (G = (ya + ((O * 12) | 0)) | 0),
                        (G =
                          d[G >> 0] |
                          (d[(G + 1) >> 0] << 8) |
                          (d[(G + 2) >> 0] << 16) |
                          (d[(G + 3) >> 0] << 24)),
                        (I = (ya + ((O * 12) | 0) + 4) | 0),
                        (I =
                          d[I >> 0] |
                          (d[(I + 1) >> 0] << 8) |
                          (d[(I + 2) >> 0] << 16) |
                          (d[(I + 3) >> 0] << 24)),
                        (K = a[(ya + ((O * 12) | 0) + 8) >> 0] | 0),
                        (M = a[(ya + ((O * 12) | 0) + 9) >> 0] | 0),
                        (F =
                          d[k >> 0] |
                          (d[(k + 1) >> 0] << 8) |
                          (d[(k + 2) >> 0] << 16) |
                          (d[(k + 3) >> 0] << 24)),
                        (H = (ya + ((P * 12) | 0) + 4) | 0),
                        (H =
                          d[H >> 0] |
                          (d[(H + 1) >> 0] << 8) |
                          (d[(H + 2) >> 0] << 16) |
                          (d[(H + 3) >> 0] << 24)),
                        (J = a[(ya + ((P * 12) | 0) + 8) >> 0] | 0),
                        (L = a[(ya + ((P * 12) | 0) + 9) >> 0] | 0),
                        (Q << 24) >> 24 ==
                          (a[(ya + ((O * 12) | 0) + 10) >> 0] | 0))
                      : 0
                  ) {
                    switch ((Q << 24) >> 24) {
                      case 3: {
                        if (
                          !((F | 0) == (G | 0)
                            ? (J << 24) >> 24 == (K << 24) >> 24
                            : 0)
                        )
                          break f;
                        if ((L << 24) >> 24 == (M << 24) >> 24)
                          j = (H | 0) == (I | 0);
                        else break f;
                        break;
                      }
                      case 1: {
                        if ((J << 24) >> 24 == (K << 24) >> 24)
                          j = (F | 0) == (G | 0);
                        else break f;
                        break;
                      }
                      case 2: {
                        if ((L << 24) >> 24 == (M << 24) >> 24)
                          j = (H | 0) == (I | 0);
                        else break f;
                        break;
                      }
                      default:
                        break f;
                    }
                    if (j) break e;
                  }
                while (0);
                Q = (n + ((o * 12) | 0)) | 0;
                c[Q >> 2] = c[k >> 2];
                c[(Q + 4) >> 2] = c[(k + 4) >> 2];
                c[(Q + 8) >> 2] = c[(k + 8) >> 2];
                if ((o | 0) == (m | 0)) break d;
                o = (o + 1) | 0;
              }
            }
          while (0);
          g: do
            if (
              (
                (T | 0) != 0
                  ? ((S = c[na >> 2] | 0),
                    (ba = c[(S + 13084) >> 2] | 0),
                    (ca = ra >> ba),
                    (da = ((R(U >> ba, oa) | 0) + ca) | 0),
                    (ea = a[(ya + ((da * 12) | 0) + 10) >> 0] | 0),
                    (ea << 24) >> 24 != 0)
                  : 0
              )
                ? (U | 0) < (c[(S + 13124) >> 2] | 0)
                : 0
            ) {
              T = c[(S + 13080) >> 2] | 0;
              if (
                (
                  ((U >> T) | 0) >= ((g >> T) | 0)
                    ? ((ra >> T) | 0) >= ((f >> T) | 0)
                    : 0
                )
                  ? ((O = c[((c[(e + 204) >> 2] | 0) + 1684) >> 2] | 0),
                    (Q = c[(S + 13072) >> 2] | 0),
                    (S = c[(S + 13164) >> 2] | 0),
                    (P = (S + 2) | 0),
                    (T =
                      c[
                        (O +
                          (((R((g >> Q) & S, P) | 0) + ((f >> Q) & S)) << 2)) >>
                          2
                      ] | 0),
                    (c[
                      (O +
                        (((R((U >> Q) & S, P) | 0) + ((ra >> Q) & S)) << 2)) >>
                        2
                    ] |
                      0) >
                      (T | 0))
                  : 0
              )
                break;
              T = c[((c[(e + 204) >> 2] | 0) + 1620) >> 2] & 255;
              if (
                !(((ra >> T) | 0) == ((f >> T) | 0)
                  ? ((U >> T) | 0) == ((g >> T) | 0)
                  : 0)
              ) {
                k = (ya + ((da * 12) | 0)) | 0;
                h: do
                  if (
                    p | 0
                      ? ((ca = ((R(sa >> ba, oa) | 0) + ca) | 0),
                        (W = (ya + ((ca * 12) | 0)) | 0),
                        (W =
                          d[W >> 0] |
                          (d[(W + 1) >> 0] << 8) |
                          (d[(W + 2) >> 0] << 16) |
                          (d[(W + 3) >> 0] << 24)),
                        (Y = (ya + ((ca * 12) | 0) + 4) | 0),
                        (Y =
                          d[Y >> 0] |
                          (d[(Y + 1) >> 0] << 8) |
                          (d[(Y + 2) >> 0] << 16) |
                          (d[(Y + 3) >> 0] << 24)),
                        (_ = a[(ya + ((ca * 12) | 0) + 8) >> 0] | 0),
                        (aa = a[(ya + ((ca * 12) | 0) + 9) >> 0] | 0),
                        (V =
                          d[k >> 0] |
                          (d[(k + 1) >> 0] << 8) |
                          (d[(k + 2) >> 0] << 16) |
                          (d[(k + 3) >> 0] << 24)),
                        (X = (ya + ((da * 12) | 0) + 4) | 0),
                        (X =
                          d[X >> 0] |
                          (d[(X + 1) >> 0] << 8) |
                          (d[(X + 2) >> 0] << 16) |
                          (d[(X + 3) >> 0] << 24)),
                        (Z = a[(ya + ((da * 12) | 0) + 8) >> 0] | 0),
                        ($ = a[(ya + ((da * 12) | 0) + 9) >> 0] | 0),
                        (ea << 24) >> 24 ==
                          (a[(ya + ((ca * 12) | 0) + 10) >> 0] | 0))
                      : 0
                  ) {
                    switch ((ea << 24) >> 24) {
                      case 3: {
                        if (
                          !((V | 0) == (W | 0)
                            ? (Z << 24) >> 24 == (_ << 24) >> 24
                            : 0)
                        )
                          break h;
                        if (($ << 24) >> 24 == (aa << 24) >> 24)
                          j = (X | 0) == (Y | 0);
                        else break h;
                        break;
                      }
                      case 1: {
                        if ((Z << 24) >> 24 == (_ << 24) >> 24)
                          j = (V | 0) == (W | 0);
                        else break h;
                        break;
                      }
                      case 2: {
                        if (($ << 24) >> 24 == (aa << 24) >> 24)
                          j = (X | 0) == (Y | 0);
                        else break h;
                        break;
                      }
                      default:
                        break h;
                    }
                    if (j) break g;
                  }
                while (0);
                ea = (n + ((o * 12) | 0)) | 0;
                c[ea >> 2] = c[k >> 2];
                c[(ea + 4) >> 2] = c[(k + 4) >> 2];
                c[(ea + 8) >> 2] = c[(k + 8) >> 2];
                if ((o | 0) == (m | 0)) break d;
                o = (o + 1) | 0;
              }
            }
          while (0);
          i: do
            if (
              (
                (qa | 0) != 0
                  ? ((ua = c[((c[na >> 2] | 0) + 13084) >> 2] | 0),
                    (va = R(ta >> ua, oa) | 0),
                    (pa = ra >> ua),
                    (xa = (va + pa) | 0),
                    (za = a[(ya + ((xa * 12) | 0) + 10) >> 0] | 0),
                    (za << 24) >> 24 != 0)
                  : 0
              )
                ? ((qa = c[((c[(e + 204) >> 2] | 0) + 1620) >> 2] & 255),
                  !(((ra >> qa) | 0) == ((f >> qa) | 0)
                    ? ((ta >> qa) | 0) == ((g >> qa) | 0)
                    : 0))
                : 0
            ) {
              j: do
                if (
                  p | 0
                    ? ((ga = (ya + ((xa * 12) | 0)) | 0),
                      (ta = ((R(sa >> ua, oa) | 0) + pa) | 0),
                      (fa = (ya + ((ta * 12) | 0)) | 0),
                      (fa =
                        d[fa >> 0] |
                        (d[(fa + 1) >> 0] << 8) |
                        (d[(fa + 2) >> 0] << 16) |
                        (d[(fa + 3) >> 0] << 24)),
                      (ha = (ya + ((ta * 12) | 0) + 4) | 0),
                      (ha =
                        d[ha >> 0] |
                        (d[(ha + 1) >> 0] << 8) |
                        (d[(ha + 2) >> 0] << 16) |
                        (d[(ha + 3) >> 0] << 24)),
                      (ja = a[(ya + ((ta * 12) | 0) + 8) >> 0] | 0),
                      (la = a[(ya + ((ta * 12) | 0) + 9) >> 0] | 0),
                      (ga =
                        d[ga >> 0] |
                        (d[(ga + 1) >> 0] << 8) |
                        (d[(ga + 2) >> 0] << 16) |
                        (d[(ga + 3) >> 0] << 24)),
                      (ia = (ya + ((xa * 12) | 0) + 4) | 0),
                      (ia =
                        d[ia >> 0] |
                        (d[(ia + 1) >> 0] << 8) |
                        (d[(ia + 2) >> 0] << 16) |
                        (d[(ia + 3) >> 0] << 24)),
                      (ka = a[(ya + ((xa * 12) | 0) + 8) >> 0] | 0),
                      (ma = a[(ya + ((xa * 12) | 0) + 9) >> 0] | 0),
                      (za << 24) >> 24 ==
                        (a[(ya + ((ta * 12) | 0) + 10) >> 0] | 0))
                    : 0
                ) {
                  switch ((za << 24) >> 24) {
                    case 3: {
                      if (
                        !((ga | 0) == (fa | 0)
                          ? (ka << 24) >> 24 == (ja << 24) >> 24
                          : 0)
                      )
                        break j;
                      if ((ma << 24) >> 24 == (la << 24) >> 24)
                        j = (ia | 0) == (ha | 0);
                      else break j;
                      break;
                    }
                    case 1: {
                      if ((ka << 24) >> 24 == (ja << 24) >> 24)
                        j = (ga | 0) == (fa | 0);
                      else break j;
                      break;
                    }
                    case 2: {
                      if ((ma << 24) >> 24 == (la << 24) >> 24)
                        j = (ia | 0) == (ha | 0);
                      else break j;
                      break;
                    }
                    default:
                      break j;
                  }
                  if (j) break i;
                }
              while (0);
              if (q) {
                j = (ya + ((xa * 12) | 0)) | 0;
                wa = (va + (wa >> ua)) | 0;
                q = (ya + ((wa * 12) | 0)) | 0;
                q =
                  d[q >> 0] |
                  (d[(q + 1) >> 0] << 8) |
                  (d[(q + 2) >> 0] << 16) |
                  (d[(q + 3) >> 0] << 24);
                s = (ya + ((wa * 12) | 0) + 4) | 0;
                s =
                  d[s >> 0] |
                  (d[(s + 1) >> 0] << 8) |
                  (d[(s + 2) >> 0] << 16) |
                  (d[(s + 3) >> 0] << 24);
                u = a[(ya + ((wa * 12) | 0) + 8) >> 0] | 0;
                v = a[(ya + ((wa * 12) | 0) + 9) >> 0] | 0;
                p =
                  d[j >> 0] |
                  (d[(j + 1) >> 0] << 8) |
                  (d[(j + 2) >> 0] << 16) |
                  (d[(j + 3) >> 0] << 24);
                r = (ya + ((xa * 12) | 0) + 4) | 0;
                r =
                  d[r >> 0] |
                  (d[(r + 1) >> 0] << 8) |
                  (d[(r + 2) >> 0] << 16) |
                  (d[(r + 3) >> 0] << 24);
                t = a[(ya + ((xa * 12) | 0) + 8) >> 0] | 0;
                k = a[(ya + ((xa * 12) | 0) + 9) >> 0] | 0;
                k: do
                  if (
                    (za << 24) >> 24 ==
                    (a[(ya + ((wa * 12) | 0) + 10) >> 0] | 0)
                  )
                    switch ((za << 24) >> 24) {
                      case 3: {
                        if (
                          !((p | 0) == (q | 0)
                            ? (t << 24) >> 24 == (u << 24) >> 24
                            : 0)
                        ) {
                          k = 0;
                          break k;
                        }
                        k =
                          (r | 0) == (s | 0)
                            ? (k << 24) >> 24 == (v << 24) >> 24
                            : 0;
                        break k;
                      }
                      case 1: {
                        k =
                          (p | 0) == (q | 0)
                            ? (t << 24) >> 24 == (u << 24) >> 24
                            : 0;
                        break k;
                      }
                      case 2: {
                        k =
                          (r | 0) == (s | 0)
                            ? (k << 24) >> 24 == (v << 24) >> 24
                            : 0;
                        break k;
                      }
                      default: {
                        k = 0;
                        break k;
                      }
                    }
                  else k = 0;
                while (0);
                if (!(((o | 0) != 4) & (k ^ 1))) break;
              } else {
                if ((o | 0) == 4) {
                  o = 4;
                  break;
                }
                j = (ya + ((xa * 12) | 0)) | 0;
              }
              za = (n + ((o * 12) | 0)) | 0;
              c[za >> 2] = c[j >> 2];
              c[(za + 4) >> 2] = c[(j + 4) >> 2];
              c[(za + 8) >> 2] = c[(j + 8) >> 2];
              if ((o | 0) == (m | 0)) break d;
              o = (o + 1) | 0;
            }
          while (0);
          do
            if (
              (a[(e + 3035) >> 0] | 0) != 0
                ? o >>> 0 < (c[(e + 3080) >> 2] | 0) >>> 0
                : 0
            ) {
              c[Ba >> 2] = 0;
              c[Aa >> 2] = 0;
              k = be(e, f, g, h, i, 0, Ba, 0) | 0;
              if (!(c[Ea >> 2] | 0)) j = be(e, f, g, h, i, 0, Aa, 1) | 0;
              else j = 0;
              if (j | k) {
                a[(n + ((o * 12) | 0) + 10) >> 0] = (j << 1) + k;
                b[(n + ((o * 12) | 0) + 8) >> 1] = 0;
                j = (n + ((o * 12) | 0)) | 0;
                Ba = c[Ba >> 2] | 0;
                b[j >> 1] = Ba;
                b[(j + 2) >> 1] = Ba >>> 16;
                j = (n + ((o * 12) | 0) + 4) | 0;
                Ba = c[Aa >> 2] | 0;
                b[j >> 1] = Ba;
                b[(j + 2) >> 1] = Ba >>> 16;
                j = (o | 0) == (m | 0);
                if (j) break d;
                else {
                  o = (((j ^ 1) & 1) + o) | 0;
                  break;
                }
              } else break;
            }
          while (0);
          u = (e + 3080) | 0;
          j = c[u >> 2] | 0;
          l: do
            if (((o | 0) > 1) & ((c[Ea >> 2] | 0) == 0) & (o >>> 0 < j >>> 0)) {
              t = R((o + -1) | 0, o) | 0;
              s = 0;
              while (1) {
                if ((s | 0) >= (t | 0)) break l;
                Ba = d[(1912 + (s << 1)) >> 0] | 0;
                e = d[(1912 + (s << 1) + 1) >> 0] | 0;
                k = c[(n + ((Ba * 12) | 0)) >> 2] | 0;
                r = a[(n + ((Ba * 12) | 0) + 8) >> 0] | 0;
                p = c[(n + ((e * 12) | 0) + 4) >> 2] | 0;
                q = a[(n + ((e * 12) | 0) + 9) >> 0] | 0;
                if (
                  (
                    (a[(n + ((Ba * 12) | 0) + 10) >> 0] & 1) != 0
                      ? (a[(n + ((e * 12) | 0) + 10) >> 0] & 2) != 0
                      : 0
                  )
                    ? !((k | 0) == (p | 0)
                        ? (c[(Ca + 64 + (((r << 24) >> 24) << 2)) >> 2] | 0) ==
                          (c[(Ca + 260 + (((q << 24) >> 24) << 2)) >> 2] | 0)
                        : 0)
                    : 0
                ) {
                  a[(n + ((o * 12) | 0) + 8) >> 0] = r;
                  a[(n + ((o * 12) | 0) + 9) >> 0] = q;
                  a[(n + ((o * 12) | 0) + 10) >> 0] = 3;
                  c[(n + ((o * 12) | 0)) >> 2] = k;
                  c[(n + ((o * 12) | 0) + 4) >> 2] = p;
                  if ((o | 0) == (m | 0)) break d;
                  o = (o + 1) | 0;
                  j = c[u >> 2] | 0;
                }
                if (o >>> 0 < j >>> 0) s = (s + 1) | 0;
                else break;
              }
            }
          while (0);
          if (o >>> 0 < j >>> 0) {
            j = 0;
            while (1) {
              a[(n + ((o * 12) | 0) + 10) >> 0] =
                ((((c[Ea >> 2] | 0) == 0) & 1) << 1) | 1;
              c[(n + ((o * 12) | 0)) >> 2] = 0;
              c[(n + ((o * 12) | 0) + 4) >> 2] = 0;
              Ca = (j | 0) < (Da | 0) ? j & 255 : 0;
              a[(n + ((o * 12) | 0) + 8) >> 0] = Ca;
              a[(n + ((o * 12) | 0) + 9) >> 0] = Ca;
              if ((o | 0) == (m | 0)) break d;
              o = (o + 1) | 0;
              if (o >>> 0 >= (c[u >> 2] | 0) >>> 0) break;
              else j = (j + 1) | 0;
            }
          }
        }
      while (0);
      l = Fa;
      return;
    }
    function be(d, e, f, g, h, i, j, k) {
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0;
      x = l;
      l = (l + 32) | 0;
      q = (x + 12) | 0;
      v = x;
      w = (d + 200) | 0;
      o = c[w >> 2] | 0;
      r = c[(o + 13156) >> 2] | 0;
      s = c[((c[(d + 3508) >> 2] | 0) + 36) >> 2] | 0;
      do
        if (s) {
          t = c[(s + 16) >> 2] | 0;
          u = c[(s + 32) >> 2] | 0;
          m = (g + e) | 0;
          n = (h + f) | 0;
          if (!t) m = 0;
          else {
            p = c[(o + 13080) >> 2] | 0;
            if (
              (
                ((f >> p) | 0) == ((n >> p) | 0)
                  ? (n | 0) < (c[(o + 13124) >> 2] | 0)
                  : 0
              )
                ? (m | 0) < (c[(o + 13120) >> 2] | 0)
                : 0
            ) {
              p = m & -16;
              n = n & -16;
              if ((a[(d + 140) >> 0] | 0) == 1) m = c[w >> 2] | 0;
              else m = o;
              m = c[(m + 13084) >> 2] | 0;
              m = (t + (((((R(n >> m, r) | 0) + (p >> m)) | 0) * 12) | 0)) | 0;
              c[v >> 2] = c[m >> 2];
              c[(v + 4) >> 2] = c[(m + 4) >> 2];
              c[(v + 8) >> 2] = c[(m + 8) >> 2];
              m = Wc(d, s, p, n) | 0;
              c[q >> 2] = c[v >> 2];
              c[(q + 4) >> 2] = c[(v + 4) >> 2];
              c[(q + 8) >> 2] = c[(v + 8) >> 2];
              m = ce(d, q, i, j, k, u, m) | 0;
              if (m | 0) break;
            }
            n = ((g >> 1) + e) & -16;
            m = ((h >> 1) + f) & -16;
            w = c[((c[w >> 2] | 0) + 13084) >> 2] | 0;
            w = (t + (((((R(m >> w, r) | 0) + (n >> w)) | 0) * 12) | 0)) | 0;
            c[v >> 2] = c[w >> 2];
            c[(v + 4) >> 2] = c[(w + 4) >> 2];
            c[(v + 8) >> 2] = c[(w + 8) >> 2];
            m = Wc(d, s, n, m) | 0;
            c[q >> 2] = c[v >> 2];
            c[(q + 4) >> 2] = c[(v + 4) >> 2];
            c[(q + 8) >> 2] = c[(v + 8) >> 2];
            m = ce(d, q, i, j, k, u, m) | 0;
          }
        } else {
          b[j >> 1] = 0;
          b[(j + 2) >> 1] = 0 >>> 16;
          m = 0;
        }
      while (0);
      l = x;
      return m | 0;
    }
    function ce(b, d, e, f, g, h, i) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      var j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
      p = c[((c[(b + 3508) >> 2] | 0) + 20) >> 2] | 0;
      j = a[(d + 10) >> 0] | 0;
      a: do
        if ((j << 24) >> 24) {
          if (!(j & 1)) {
            j =
              de(
                f,
                (d + 4) | 0,
                h,
                c[(b + 5816) >> 2] | 0,
                p,
                g,
                e,
                i,
                1,
                a[(d + 9) >> 0] | 0
              ) | 0;
            break;
          }
          switch ((j << 24) >> 24) {
            case 1: {
              j =
                de(
                  f,
                  d,
                  h,
                  c[(b + 5816) >> 2] | 0,
                  p,
                  g,
                  e,
                  i,
                  0,
                  a[(d + 8) >> 0] | 0
                ) | 0;
              break a;
            }
            case 3:
              break;
            default: {
              j = 0;
              break a;
            }
          }
          o = (b + 5816) | 0;
          k = 0;
          n = 0;
          do {
            l = c[(p + ((n * 196) | 0) + 192) >> 2] | 0;
            b: do
              if ((l | 0) > 0) {
                m = c[o >> 2] | 0;
                j = 0;
                while (1) {
                  if (
                    (c[(p + ((n * 196) | 0) + 64 + (j << 2)) >> 2] | 0) >
                    (m | 0)
                  )
                    break;
                  j = (j + 1) | 0;
                  if ((j | 0) >= (l | 0)) break b;
                }
                k = (k + 1) | 0;
              }
            while (0);
            n = (n + 1) | 0;
          } while ((n | 0) != 2);
          j = c[o >> 2] | 0;
          if (!k)
            if (!g) {
              j = de(f, d, h, j, p, 0, e, i, 0, a[(d + 8) >> 0] | 0) | 0;
              break;
            } else {
              j =
                de(f, (d + 4) | 0, h, j, p, g, e, i, 1, a[(d + 9) >> 0] | 0) |
                0;
              break;
            }
          else if ((a[(b + 3051) >> 0] | 0) == 1) {
            j = de(f, d, h, j, p, g, e, i, 0, a[(d + 8) >> 0] | 0) | 0;
            break;
          } else {
            j =
              de(f, (d + 4) | 0, h, j, p, g, e, i, 1, a[(d + 9) >> 0] | 0) | 0;
            break;
          }
        } else j = 0;
      while (0);
      return j | 0;
    }
    function de(a, d, e, f, g, h, i, j, k, l) {
      a = a | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      var m = 0;
      m = c[(g + ((h * 196) | 0) + 128 + (i << 2)) >> 2] | 0;
      do
        if ((m | 0) == (c[(j + ((k * 196) | 0) + 128 + (l << 2)) >> 2] | 0)) {
          j = (e - (c[(j + ((k * 196) | 0) + 64 + (l << 2)) >> 2] | 0)) | 0;
          e = (f - (c[(g + ((h * 196) | 0) + 64 + (i << 2)) >> 2] | 0)) | 0;
          if ((m | 0) == 0 ? ((j | 0) != 0) & ((j | 0) != (e | 0)) : 0) {
            i = ((j + 128) | 0) >>> 0 > 255 ? (j >> 31) ^ 127 : j;
            m = (i << 24) >> 24;
            j = ((m | 0) / 2) | 0;
            e =
              ((R(
                ((((((i & 255) << 24) >> 24 > -2 ? j : (0 - j) | 0) + 16384) |
                  0) /
                  (m | 0)) |
                  0,
                ((((e + 128) | 0) >>> 0 > 255 ? (e >> 31) ^ 127 : e) << 24) >>
                  24
              ) |
                0) +
                32) >>
              6;
            e = (e | 0) < -4096 ? -4096 : (e | 0) < 4095 ? e : 4095;
            m = R(e, b[d >> 1] | 0) | 0;
            m = (m + 127 + (m >>> 31)) | 0;
            j = m >> 8;
            b[a >> 1] = ((j + 32768) | 0) >>> 0 > 65535 ? (m >> 31) ^ 32767 : j;
            d = R(e, b[(d + 2) >> 1] | 0) | 0;
            d = (d + 127 + (d >>> 31)) | 0;
            e = d >> 8;
            j = 1;
            e =
              (((e + 32768) | 0) >>> 0 > 65535 ? (d >> 31) ^ 32767 : e) & 65535;
            break;
          }
          b[a >> 1] = b[d >> 1] | 0;
          j = 1;
          e = b[(d + 2) >> 1] | 0;
        } else {
          b[a >> 1] = 0;
          j = 0;
          e = 0;
        }
      while (0);
      b[(a + 2) >> 1] = e;
      return j | 0;
    }
    function ee(d, e, f, g, h, i, j, k, m, n, o) {
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      m = m | 0;
      n = n | 0;
      o = o | 0;
      var p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0;
      J = l;
      l = (l + 32) | 0;
      E = J;
      F = (J + 16) | 0;
      G = (J + 12) | 0;
      H = (J + 8) | 0;
      A = c[(d + 136) >> 2] | 0;
      w = c[((c[(d + 3508) >> 2] | 0) + 16) >> 2] | 0;
      B = (d + 200) | 0;
      q = c[B >> 2] | 0;
      x = c[(q + 13156) >> 2] | 0;
      j = E;
      c[j >> 2] = 0;
      c[(j + 4) >> 2] = 0;
      j = c[(A + 31292) >> 2] | 0;
      y = c[(A + 31300) >> 2] | 0;
      v = c[(A + 31296) >> 2] | 0;
      s = c[(A + 31308) >> 2] | 0;
      I = a[(m + 8 + o) >> 0] | 0;
      C = ((o | 0) == 0) & 1;
      D = (e + -1) | 0;
      r = (h + f) | 0;
      if (
        (
          (c[(A + 31288) >> 2] | 0) != 0
            ? ((A = c[(q + 13084) >> 2] | 0),
              (a[
                (w + (((((R(r >> A, x) | 0) + (D >> A)) | 0) * 12) | 0) + 10) >>
                  0
              ] |
                0) !=
                0)
            : 0
        )
          ? (r | 0) < (c[(q + 13124) >> 2] | 0)
          : 0
      ) {
        A = c[(q + 13080) >> 2] | 0;
        if (
          ((r >> A) | 0) >= ((f >> A) | 0)
            ? ((D >> A) | 0) >= ((e >> A) | 0)
            : 0
        ) {
          p = c[((c[(d + 204) >> 2] | 0) + 1684) >> 2] | 0;
          z = c[(q + 13072) >> 2] | 0;
          A = c[(q + 13164) >> 2] | 0;
          t = (A + 2) | 0;
          i =
            c[(p + (((R((f >> z) & A, t) | 0) + ((e >> z) & A)) << 2)) >> 2] |
            0;
          i =
            ((c[(p + (((R((r >> z) & A, t) | 0) + ((D >> z) & A)) << 2)) >> 2] |
              0) <=
              (i | 0)) &
            1;
        } else i = 1;
        k = (i | 0) != 0;
      } else k = 0;
      p = (r + -1) | 0;
      if (!j) i = 0;
      else {
        i = c[(q + 13084) >> 2] | 0;
        i =
          (a[
            (w + (((((R(p >> i, x) | 0) + (D >> i)) | 0) * 12) | 0) + 10) >> 0
          ] |
            0) !=
          0;
      }
      z = k | i;
      if (k) {
        A = c[(q + 13084) >> 2] | 0;
        if (
          (fe(d, D >> A, r >> A, o, F, o, I) | 0) == 0
            ? ((A = c[((c[B >> 2] | 0) + 13084) >> 2] | 0),
              (fe(d, D >> A, r >> A, C, F, o, I) | 0) == 0)
            : 0
        )
          L = 13;
        else i = 1;
      } else L = 13;
      do
        if ((L | 0) == 13) {
          if (i) {
            A = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (fe(d, D >> A, p >> A, o, F, o, I) | 0) {
              i = 1;
              break;
            }
            A = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (fe(d, D >> A, p >> A, C, F, o, I) | 0) {
              i = 1;
              break;
            }
          }
          if (k) {
            A = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (ge(d, D >> A, r >> A, o, F, o, I) | 0) {
              i = 1;
              break;
            }
            A = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (ge(d, D >> A, r >> A, C, F, o, I) | 0) {
              i = 1;
              break;
            }
          }
          if (i) {
            A = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (ge(d, D >> A, p >> A, o, F, o, I) | 0) {
              i = 1;
              break;
            }
            A = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (ge(d, D >> A, p >> A, C, F, o, I) | 0) {
              i = 1;
              break;
            }
          }
          i = 0;
        }
      while (0);
      t = (g + e) | 0;
      A = (f + -1) | 0;
      if (
        (
          (s | 0) != 0
            ? ((u = c[B >> 2] | 0),
              (s = c[(u + 13084) >> 2] | 0),
              (a[
                (w + (((((R(A >> s, x) | 0) + (t >> s)) | 0) * 12) | 0) + 10) >>
                  0
              ] |
                0) !=
                0)
            : 0
        )
          ? (t | 0) < (c[(u + 13120) >> 2] | 0)
          : 0
      ) {
        s = c[(u + 13080) >> 2] | 0;
        if (
          ((A >> s) | 0) >= ((f >> s) | 0)
            ? ((t >> s) | 0) >= ((e >> s) | 0)
            : 0
        ) {
          q = c[((c[(d + 204) >> 2] | 0) + 1684) >> 2] | 0;
          s = c[(u + 13072) >> 2] | 0;
          u = c[(u + 13164) >> 2] | 0;
          r = (u + 2) | 0;
          j =
            c[(q + (((R((f >> s) & u, r) | 0) + ((e >> s) & u)) << 2)) >> 2] |
            0;
          j =
            ((c[(q + (((R((A >> s) & u, r) | 0) + ((t >> s) & u)) << 2)) >> 2] |
              0) <=
              (j | 0)) &
            1;
        } else j = 1;
        p = (j | 0) != 0;
      } else p = 0;
      r = (t + -1) | 0;
      if (!v) q = 0;
      else {
        q = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
        q =
          (a[
            (w + (((((R(A >> q, x) | 0) + (r >> q)) | 0) * 12) | 0) + 10) >> 0
          ] |
            0) !=
          0;
      }
      if (!y) j = 0;
      else {
        j = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
        j =
          (a[
            (w + (((((R(A >> j, x) | 0) + (D >> j)) | 0) * 12) | 0) + 10) >> 0
          ] |
            0) !=
          0;
      }
      if (p) {
        y = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
        if (
          (fe(d, t >> y, A >> y, o, G, o, I) | 0) == 0
            ? ((y = c[((c[B >> 2] | 0) + 13084) >> 2] | 0),
              (fe(d, t >> y, A >> y, C, G, o, I) | 0) == 0)
            : 0
        )
          L = 37;
        else k = 1;
      } else L = 37;
      do
        if ((L | 0) == 37) {
          if (q) {
            y = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (fe(d, r >> y, A >> y, o, G, o, I) | 0) {
              k = 1;
              break;
            }
            y = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (fe(d, r >> y, A >> y, C, G, o, I) | 0) {
              k = 1;
              break;
            }
          }
          if (j) {
            y = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (fe(d, D >> y, A >> y, o, G, o, I) | 0) {
              k = 1;
              break;
            }
            y = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            if (fe(d, D >> y, A >> y, C, G, o, I) | 0) {
              k = 1;
              break;
            }
          }
          k = 0;
        }
      while (0);
      do
        if (!z) {
          if (k) {
            c[F >> 2] = c[G >> 2];
            i = 1;
          }
          if (p) {
            k = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            k = ge(d, t >> k, A >> k, o, G, o, I) | 0;
            if (k | 0) break;
            k = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            k = ge(d, t >> k, A >> k, C, G, o, I) | 0;
          } else k = 0;
          if (!(((k | 0) != 0) | (q ^ 1))) {
            k = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            k = ge(d, r >> k, A >> k, o, G, o, I) | 0;
            if (k | 0) break;
            k = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            k = ge(d, r >> k, A >> k, C, G, o, I) | 0;
          }
          if (!(((k | 0) != 0) | (j ^ 1))) {
            k = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
            k = ge(d, D >> k, A >> k, o, G, o, I) | 0;
            if (!k) {
              k = c[((c[B >> 2] | 0) + 13084) >> 2] | 0;
              k = ge(d, D >> k, A >> k, C, G, o, I) | 0;
            }
          }
        }
      while (0);
      j = (i | 0) != 0;
      if (j) {
        c[E >> 2] = c[F >> 2];
        i = 1;
      } else i = 0;
      do
        if (k) {
          if (
            (j ? (b[F >> 1] | 0) == (b[G >> 1] | 0) : 0)
              ? (b[(F + 2) >> 1] | 0) == (b[(G + 2) >> 1] | 0)
              : 0
          ) {
            K = i;
            L = 63;
            break;
          }
          c[(E + (i << 2)) >> 2] = c[G >> 2];
          if (((i + 1) | 0) >>> 0 < 2) {
            K = 1;
            L = 63;
          }
        } else {
          K = i;
          L = 63;
        }
      while (0);
      if (
        (
          (L | 0) == 63
            ? ((K | 0) == (n | 0)) & ((a[(d + 3035) >> 0] | 0) != 0)
            : 0
        )
          ? be(d, e, f, g, h, I, H, o) | 0
          : 0
      )
        c[(E + (n << 2)) >> 2] = c[H >> 2];
      L = (m + (o << 2)) | 0;
      n = c[(E + (n << 2)) >> 2] | 0;
      b[L >> 1] = n;
      b[(L + 2) >> 1] = n >>> 16;
      l = J;
      return;
    }
    function fe(d, f, g, h, i, j, k) {
      d = d | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var l = 0,
        m = 0;
      m = c[(d + 3508) >> 2] | 0;
      l = c[(m + 16) >> 2] | 0;
      m = c[(m + 20) >> 2] | 0;
      d = ((R(c[((c[(d + 200) >> 2] | 0) + 13156) >> 2] | 0, g) | 0) + f) | 0;
      if (
        ((a[(l + ((d * 12) | 0) + 10) >> 0] & (1 << h)) | 0) != 0
          ? (c[
              (m +
                ((h * 196) | 0) +
                64 +
                (a[(l + ((d * 12) | 0) + 8 + h) >> 0] << 2)) >>
                2
            ] |
              0) ==
            (c[(m + ((j * 196) | 0) + 64 + (k << 2)) >> 2] | 0)
          : 0
      ) {
        d = (l + ((d * 12) | 0) + (h << 2)) | 0;
        d = e[d >> 1] | (e[(d + 2) >> 1] << 16);
        b[i >> 1] = d;
        b[(i + 2) >> 1] = d >>> 16;
        d = 1;
      } else d = 0;
      return d | 0;
    }
    function ge(d, f, g, h, i, j, k) {
      d = d | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
      q = (d + 3508) | 0;
      m = c[q >> 2] | 0;
      l = c[(m + 16) >> 2] | 0;
      m = c[(m + 20) >> 2] | 0;
      g = ((R(c[((c[(d + 200) >> 2] | 0) + 13156) >> 2] | 0, g) | 0) + f) | 0;
      if (
        ((a[(l + ((g * 12) | 0) + 10) >> 0] & (1 << h)) | 0) != 0
          ? ((n = c[(m + ((j * 196) | 0) + 128 + (k << 2)) >> 2] | 0),
            (c[
              (m +
                ((h * 196) | 0) +
                128 +
                (a[(l + ((g * 12) | 0) + 8 + h) >> 0] << 2)) >>
                2
            ] |
              0) ==
              (n | 0))
          : 0
      ) {
        f = (l + ((g * 12) | 0) + (h << 2)) | 0;
        f = e[f >> 1] | (e[(f + 2) >> 1] << 16);
        b[i >> 1] = f;
        b[(i + 2) >> 1] = f >>> 16;
        if (
          (n | 0) == 0
            ? ((o = c[q >> 2] | 0),
              (p = c[(o + 20) >> 2] | 0),
              (o =
                c[
                  (p +
                    ((h * 196) | 0) +
                    64 +
                    (a[
                      ((c[(o + 16) >> 2] | 0) + ((g * 12) | 0) + 8 + h) >> 0
                    ] <<
                      2)) >>
                    2
                ] | 0),
              (p = c[(p + ((j * 196) | 0) + 64 + (k << 2)) >> 2] | 0),
              (o | 0) != (p | 0))
            : 0
        ) {
          q = c[(d + 5816) >> 2] | 0;
          k = (q - o) | 0;
          k = k | 0 ? k : 1;
          p = (q - p) | 0;
          k = ((k + 128) | 0) >>> 0 > 255 ? (k >> 31) ^ 127 : k;
          q = (k << 24) >> 24;
          j = ((q | 0) / 2) | 0;
          q =
            ((R(
              ((((p + 128) | 0) >>> 0 > 255 ? (p >> 31) ^ 127 : p) << 24) >> 24,
              ((((((k & 255) << 24) >> 24 > -2 ? j : (0 - j) | 0) + 16384) |
                0) /
                (q | 0)) |
                0
            ) |
              0) +
              32) >>
            6;
          q = (q | 0) < -4096 ? -4096 : (q | 0) < 4095 ? q : 4095;
          j = R(q, (f << 16) >> 16) | 0;
          j = (j + 127 + (j >>> 31)) | 0;
          k = j >> 8;
          b[i >> 1] = ((k + 32768) | 0) >>> 0 > 65535 ? (j >> 31) ^ 32767 : k;
          q = R(q, f >> 16) | 0;
          q = (q + 127 + (q >>> 31)) | 0;
          f = q >> 8;
          b[(i + 2) >> 1] =
            ((f + 32768) | 0) >>> 0 > 65535 ? (q >> 31) ^ 32767 : f;
          f = 1;
        } else f = 1;
      } else f = 0;
      return f | 0;
    }
    function he(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
      l = ((c[(b + 136) >> 2] | 0) + 204) | 0;
      b = (e + 2188) | 0;
      do
        if (
          (
            (b | 0) != (d | 0)
              ? ((g = (e + 2184) | 0), (c[g >> 2] | 0) != 0)
              : 0
          )
            ? (((We(l) | 0) & 255) << 24) >> 24 != 0
            : 0
        ) {
          if (f) {
            f = ((Ye(l) | 0) + 1) | 0;
            b = c[g >> 2] | 0;
            if (b >>> 0 < f >>> 0) {
              b = -1094995529;
              break;
            } else k = (b - f) | 0;
          } else k = (((((d - b) | 0) / 168) | 0) + -1) | 0;
          b = We(l) | 0;
          f = Ye(l) | 0;
          if (f >>> 0 <= 32767) {
            i = R((1 - ((b << 1) & 510)) | 0, (f + 1) | 0) | 0;
            j = (e + 2188 + ((k * 168) | 0) + 4) | 0;
            if ((c[j >> 2] | 0) < 0) {
              c[(d + 4) >> 2] = 0;
              c[d >> 2] = 0;
              b = 0;
              break;
            } else {
              b = 0;
              f = 0;
              h = 0;
            }
            while (1) {
              g = We(l) | 0;
              a[(d + 136 + f) >> 0] = g;
              if (
                !(((g & 255) | 0) == 0
                  ? (((We(l) | 0) & 255) << 24) >> 24 == 0
                  : 0)
              ) {
                if ((h | 0) < (c[j >> 2] | 0))
                  g =
                    ((c[(e + 2188 + ((k * 168) | 0) + 8 + (h << 2)) >> 2] | 0) +
                      i) |
                    0;
                else g = i;
                c[(d + 8 + (f << 2)) >> 2] = g;
                f = (f + 1) | 0;
                b = ((g >>> 31) + b) | 0;
              }
              if ((h | 0) < (c[j >> 2] | 0)) h = (h + 1) | 0;
              else break;
            }
            e = (d + 4) | 0;
            c[e >> 2] = f;
            c[d >> 2] = b;
            if ((f | 0) > 1) {
              b = 1;
              do {
                h = c[(d + 8 + (b << 2)) >> 2] | 0;
                i = a[(d + 136 + b) >> 0] | 0;
                f = b;
                do {
                  g = f;
                  f = (f + -1) | 0;
                  j = (d + 8 + (f << 2)) | 0;
                  k = c[j >> 2] | 0;
                  if ((h | 0) < (k | 0)) {
                    c[(d + 8 + (g << 2)) >> 2] = k;
                    l = (d + 136 + f) | 0;
                    a[(d + 136 + g) >> 0] = a[l >> 0] | 0;
                    c[j >> 2] = h;
                    a[l >> 0] = i;
                  }
                } while ((g | 0) > 1);
                b = (b + 1) | 0;
              } while ((b | 0) < (c[e >> 2] | 0));
              b = c[d >> 2] | 0;
            }
            if (b >>> 0 > 1) {
              f = 0;
              do {
                b = (b + -1) | 0;
                l = (d + 8 + (f << 2)) | 0;
                j = c[l >> 2] | 0;
                i = (d + 136 + f) | 0;
                e = a[i >> 0] | 0;
                k = (d + 8 + (b << 2)) | 0;
                c[l >> 2] = c[k >> 2];
                l = (d + 136 + b) | 0;
                a[i >> 0] = a[l >> 0] | 0;
                c[k >> 2] = j;
                a[l >> 0] = e;
                f = (f + 1) | 0;
              } while (f >>> 0 < ((c[d >> 2] | 0) >>> 1) >>> 0);
              b = 0;
            } else b = 0;
          } else b = -1094995529;
        } else m = 25;
      while (0);
      if ((m | 0) == 25) {
        c[d >> 2] = Ye(l) | 0;
        g = Ye(l) | 0;
        b = c[d >> 2] | 0;
        if ((b | g) >>> 0 <= 15) {
          m = (b + g) | 0;
          c[(d + 4) >> 2] = m;
          if (m) {
            if (b | 0) {
              b = 0;
              f = 0;
              do {
                b = (b + -1 - (Ye(l) | 0)) | 0;
                c[(d + 8 + (f << 2)) >> 2] = b;
                a[(d + 136 + f) >> 0] = We(l) | 0;
                f = (f + 1) | 0;
              } while (f >>> 0 < (c[d >> 2] | 0) >>> 0);
            }
            if (g) {
              b = 0;
              f = 0;
              do {
                b = (b + 1 + (Ye(l) | 0)) | 0;
                c[(d + 8 + (((c[d >> 2] | 0) + f) << 2)) >> 2] = b;
                m = (We(l) | 0) & 255;
                a[((c[d >> 2] | 0) + f + (d + 136)) >> 0] = m;
                f = (f + 1) | 0;
              } while ((f | 0) != (g | 0));
              b = 0;
            } else b = 0;
          } else b = 0;
        } else b = -1094995529;
      }
      return b | 0;
    }
    function ie(b) {
      b = b | 0;
      var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
      v = l;
      l = (l + 16) | 0;
      t = v;
      p = ((c[(b + 136) >> 2] | 0) + 204) | 0;
      r = tf(13196) | 0;
      c[t >> 2] = r;
      u = r;
      a: do
        if (r) {
          s = (r + 4) | 0;
          q = c[s >> 2] | 0;
          e = je(b) | 0;
          if ((e | 0) >= 0) {
            c[q >> 2] = 0;
            g = (q + 72) | 0;
            c[g >> 2] = 1;
            o = Te(p, 8) | 0;
            f = (q + 4) | 0;
            c[f >> 2] = o;
            do
              if ((o | 0) <= 3) {
                a[(q + 8) >> 0] = 0;
                m = (q + 13120) | 0;
                c[m >> 2] = Xe(p, 32) | 0;
                e = Xe(p, 32) | 0;
                n = (q + 13124) | 0;
                c[n >> 2] = e;
                e = Ge(c[m >> 2] | 0, e, 0, c[(b + 4) >> 2] | 0) | 0;
                if ((e | 0) >= 0) {
                  k = Te(p, 8) | 0;
                  o = (q + 52) | 0;
                  c[o >> 2] = k + 8;
                  if (!k) {
                    switch (c[f >> 2] | 0) {
                      case 0: {
                        f = 8;
                        break;
                      }
                      case 1: {
                        f = 0;
                        break;
                      }
                      case 2: {
                        f = 4;
                        break;
                      }
                      default:
                        f = 5;
                    }
                    c[(q + 60) >> 2] = f;
                    c[(q + 56) >> 2] = 0;
                    f = Sf(f) | 0;
                    if (f) {
                      c[(q + 13180) >> 2] = 0;
                      c[(q + 13168) >> 2] = 0;
                      k = d[(f + 5) >> 0] | 0;
                      c[(q + 13172) >> 2] = k;
                      c[(q + 13176) >> 2] = k;
                      k = d[(f + 6) >> 0] | 0;
                      c[(q + 13184) >> 2] = k;
                      c[(q + 13188) >> 2] = k;
                      c[(q + 64) >> 2] = 8;
                      if ((c[g >> 2] | 0) > 0) {
                        f = 0;
                        do {
                          c[(q + 76 + ((f * 12) | 0)) >> 2] = 1;
                          c[(q + 76 + ((f * 12) | 0) + 4) >> 2] = 0;
                          c[(q + 76 + ((f * 12) | 0) + 8) >> 2] = -1;
                          f = (f + 1) | 0;
                        } while ((f | 0) < (c[g >> 2] | 0));
                      }
                      g = ((Ye(p) | 0) + 3) | 0;
                      f = (q + 13064) | 0;
                      c[f >> 2] = g;
                      g = 1 << g;
                      h = (g + -1) | 0;
                      g = (0 - g) | 0;
                      c[m >> 2] = (h + (c[m >> 2] | 0)) & g;
                      c[n >> 2] = ((c[n >> 2] | 0) + h) & g;
                      g = (q + 13068) | 0;
                      c[g >> 2] = Ye(p) | 0;
                      h = (q + 13072) | 0;
                      c[h >> 2] = (Ye(p) | 0) + 2;
                      j = Ye(p) | 0;
                      k = c[h >> 2] | 0;
                      i = (q + 13076) | 0;
                      c[i >> 2] = k + j;
                      if (k >>> 0 < (c[f >> 2] | 0) >>> 0) {
                        w = Ye(p) | 0;
                        j = (q + 13092) | 0;
                        c[j >> 2] = w;
                        k = (q + 13088) | 0;
                        c[k >> 2] = w;
                        a[(q + 12940) >> 0] = 1;
                        a[(q + 12941) >> 0] = We(p) | 0;
                        w = We(p) | 0;
                        c[(q + 68) >> 2] = w;
                        if (w | 0) {
                          w = (q + 13044) | 0;
                          a[w >> 0] = (Te(p, 4) | 0) + 1;
                          a[(q + 13045) >> 0] = (Te(p, 4) | 0) + 1;
                          x = ((Ye(p) | 0) + 3) | 0;
                          c[(q + 13048) >> 2] = x;
                          c[(q + 13052) >> 2] = (Ye(p) | 0) + x;
                          if ((d[w >> 0] | 0 | 0) > (c[o >> 2] | 0)) {
                            e = -1094995529;
                            break;
                          }
                          a[(q + 13056) >> 0] = We(p) | 0;
                        }
                        c[(q + 2184) >> 2] = 0;
                        a[(q + 12942) >> 0] = 0;
                        a[(q + 13060) >> 0] = 1;
                        a[(q + 13061) >> 0] = We(p) | 0;
                        c[(q + 160) >> 2] = 0;
                        c[(q + 164) >> 2] = 1;
                        if (
                          We(p) | 0 ? ((x = We(p) | 0), Ve(p, 7), x | 0) : 0
                        ) {
                          c[(q + 13096) >> 2] = We(p) | 0;
                          c[(q + 13100) >> 2] = We(p) | 0;
                          c[(q + 13104) >> 2] = We(p) | 0;
                          c[(q + 13108) >> 2] = We(p) | 0;
                          We(p) | 0;
                          c[(q + 13112) >> 2] = We(p) | 0;
                          We(p) | 0;
                          c[(q + 13116) >> 2] = We(p) | 0;
                          We(p) | 0;
                        }
                        m = c[m >> 2] | 0;
                        c[(q + 12) >> 2] = m;
                        n = c[n >> 2] | 0;
                        c[(q + 16) >> 2] = n;
                        f = c[f >> 2] | 0;
                        x = ((c[g >> 2] | 0) + f) | 0;
                        c[(q + 13080) >> 2] = x;
                        g = (f + -1) | 0;
                        c[(q + 13084) >> 2] = g;
                        w = 1 << x;
                        y = (m + -1 + w) >> x;
                        c[(q + 13128) >> 2] = y;
                        w = (n + -1 + w) >> x;
                        c[(q + 13132) >> 2] = w;
                        c[(q + 13136) >> 2] = R(y, w) | 0;
                        c[(q + 13140) >> 2] = m >> f;
                        c[(q + 13144) >> 2] = n >> f;
                        w = c[h >> 2] | 0;
                        c[(q + 13148) >> 2] = m >> w;
                        c[(q + 13152) >> 2] = n >> w;
                        c[(q + 13156) >> 2] = m >> g;
                        c[(q + 13160) >> 2] = n >> g;
                        w = (x - w) | 0;
                        c[(q + 13164) >> 2] = (1 << w) + -1;
                        c[(q + 13192) >> 2] = (((c[o >> 2] | 0) * 6) | 0) + -48;
                        if (
                          (
                            (
                              (
                                !(x >>> 0 > 6
                                  ? 1
                                  : ((((1 << f) + -1) & (n | m)) | 0) != 0)
                                  ? (c[k >> 2] | 0) >>> 0 <= w >>> 0
                                  : 0
                              )
                                ? (c[j >> 2] | 0) >>> 0 <= w >>> 0
                                : 0
                            )
                              ? (c[i >> 2] | 0) >>> 0 <=
                                (x >>> 0 < 5 ? x : 5) >>> 0
                              : 0
                          )
                            ? (ke(p) | 0) >= 0
                            : 0
                        ) {
                          h = (b + 272) | 0;
                          e = c[h >> 2] | 0;
                          if (
                            (e | 0) != 0
                              ? (Sg(
                                  c[(e + 4) >> 2] | 0,
                                  c[s >> 2] | 0,
                                  c[(r + 8) >> 2] | 0
                                ) |
                                  0) ==
                                0
                              : 0
                          ) {
                            wf(t);
                            e = 0;
                            break a;
                          } else e = 0;
                          do {
                            f = (b + 400 + (e << 2)) | 0;
                            g = c[f >> 2] | 0;
                            do
                              if (g | 0) {
                                if (c[c[(g + 4) >> 2] >> 2] | 0) break;
                                wf(f);
                              }
                            while (0);
                            e = (e + 1) | 0;
                          } while ((e | 0) != 256);
                          e = c[h >> 2] | 0;
                          do
                            if (e | 0) {
                              f = (b + 200) | 0;
                              if ((c[f >> 2] | 0) != (c[(e + 4) >> 2] | 0))
                                break;
                              x = (b + 1424) | 0;
                              wf(x);
                              y = uf(c[h >> 2] | 0) | 0;
                              c[x >> 2] = y;
                              if (y | 0) break;
                              c[f >> 2] = 0;
                            }
                          while (0);
                          wf(h);
                          c[h >> 2] = u;
                          e = 0;
                          break a;
                        }
                      } else e = -1094995529;
                    } else e = -22;
                  } else e = -1094995529;
                }
              } else e = -1094995529;
            while (0);
            wf(t);
          }
        } else e = -12;
      while (0);
      l = v;
      return e | 0;
    }
    function je(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0;
      e = tf(468) | 0;
      if (!e) d = -12;
      else {
        f = c[(e + 4) >> 2] | 0;
        c[(f + 4) >> 2] = 1;
        g = (f + 8) | 0;
        c[g >> 2] = 1;
        a[f >> 0] = 0;
        c[(f + 348) >> 2] = 1;
        d = 0;
        do {
          c[(f + 352 + (d << 2)) >> 2] = 1;
          c[(f + 380 + (d << 2)) >> 2] = 0;
          c[(f + 408 + (d << 2)) >> 2] = -1;
          d = (d + 1) | 0;
        } while ((d | 0) < (c[g >> 2] | 0));
        c[(f + 436) >> 2] = 0;
        c[(f + 440) >> 2] = 1;
        a[(f + 444) >> 0] = 0;
        d = (b + 208) | 0;
        wf(d);
        c[d >> 2] = e;
        d = 0;
      }
      return d | 0;
    }
    function ke(a) {
      a = a | 0;
      var b = 0;
      b = c[(a + 12) >> 2] | 0;
      return (b - (le(a) | 0)) | 0;
    }
    function le(a) {
      a = a | 0;
      return c[(a + 8) >> 2] | 0;
    }
    function me(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0,
        K = 0,
        L = 0,
        M = 0;
      M = l;
      l = (l + 16) | 0;
      L = (M + 4) | 0;
      H = M;
      K = ((c[(b + 136) >> 2] | 0) + 204) | 0;
      i = lf(1692) | 0;
      c[H >> 2] = i;
      a: do
        if (!i) d = -12;
        else {
          J = qf(i, 1692, 6, 0, 0) | 0;
          c[L >> 2] = J;
          I = J;
          if (!J) {
            hf(H);
            d = -12;
            break;
          }
          a[(i + 53) >> 0] = 1;
          f = (i + 44) | 0;
          c[f >> 2] = 1;
          g = (i + 48) | 0;
          c[g >> 2] = 1;
          h = (i + 52) | 0;
          a[h >> 0] = 1;
          a[(i + 57) >> 0] = 0;
          c[(i + 60) >> 2] = 0;
          c[(i + 64) >> 2] = 0;
          a[(i + 1629) >> 0] = 2;
          J = Ye(K) | 0;
          b: do
            if (
              (
                J >>> 0 <= 255
                  ? ((d = Ye(K) | 0), (c[i >> 2] = d), d >>> 0 <= 31)
                  : 0
              )
                ? ((e = c[(b + 272 + (d << 2)) >> 2] | 0), (e | 0) != 0)
                : 0
            ) {
              G = c[(e + 4) >> 2] | 0;
              a[(i + 41) >> 0] = We(K) | 0;
              a[(i + 39) >> 0] = We(K) | 0;
              c[(i + 1624) >> 2] = Te(K, 3) | 0;
              a[(i + 4) >> 0] = We(K) | 0;
              a[(i + 5) >> 0] = We(K) | 0;
              c[(i + 8) >> 2] = (Ye(K) | 0) + 1;
              c[(i + 12) >> 2] = (Ye(K) | 0) + 1;
              c[(i + 16) >> 2] = oe(K) | 0;
              a[(i + 20) >> 0] = We(K) | 0;
              a[(i + 21) >> 0] = We(K) | 0;
              F = (We(K) | 0) & 255;
              a[(i + 22) >> 0] = F;
              d = (i + 24) | 0;
              c[d >> 2] = 0;
              if ((F << 24) >> 24) c[d >> 2] = Ye(K) | 0;
              F = oe(K) | 0;
              c[(i + 28) >> 2] = F;
              if (
                ((F + 12) | 0) >>> 0 <= 24
                  ? ((F = oe(K) | 0),
                    (c[(i + 32) >> 2] = F),
                    ((F + 12) | 0) >>> 0 <= 24)
                  : 0
              ) {
                a[(i + 36) >> 0] = We(K) | 0;
                a[(i + 37) >> 0] = We(K) | 0;
                a[(i + 38) >> 0] = We(K) | 0;
                a[(i + 40) >> 0] = We(K) | 0;
                F = (i + 42) | 0;
                a[F >> 0] = We(K) | 0;
                a[(i + 43) >> 0] = We(K) | 0;
                if (!(a[F >> 0] | 0)) o = c[H >> 2] | 0;
                else {
                  c[f >> 2] = (Ye(K) | 0) + 1;
                  d = ((Ye(K) | 0) + 1) | 0;
                  c[g >> 2] = d;
                  e = c[f >> 2] | 0;
                  if (!e) {
                    d = -1094995529;
                    break;
                  }
                  if ((d | 0) == 0 ? 1 : (e | 0) >= (c[(G + 13120) >> 2] | 0)) {
                    d = -1094995529;
                    break;
                  }
                  if ((d | 0) >= (c[(G + 13124) >> 2] | 0)) {
                    d = -1094995529;
                    break;
                  }
                  E = (i + 1648) | 0;
                  c[E >> 2] = of(e, 4) | 0;
                  F = of(c[g >> 2] | 0, 4) | 0;
                  c[(i + 1652) >> 2] = F;
                  if (((c[E >> 2] | 0) == 0) | ((F | 0) == 0)) {
                    d = -12;
                    break;
                  }
                  F = (We(K) | 0) & 255;
                  a[h >> 0] = F;
                  if (!((F << 24) >> 24)) {
                    F = c[f >> 2] | 0;
                    d = (F + -1) | 0;
                    if ((F | 0) > 1) {
                      i = c[H >> 2] | 0;
                      f = (i + 1648) | 0;
                      j = (i + 44) | 0;
                      e = 0;
                      g = 0;
                      d = 0;
                      while (1) {
                        h = ((Ye(K) | 0) + 1) | 0;
                        c[((c[f >> 2] | 0) + (e << 2)) >> 2] = h;
                        g = $g(h | 0, 0, g | 0, d | 0) | 0;
                        h = C;
                        e = (e + 1) | 0;
                        d = ((c[j >> 2] | 0) + -1) | 0;
                        if ((e | 0) >= (d | 0)) break;
                        else d = h;
                      }
                    } else {
                      h = 0;
                      g = 0;
                    }
                    e = c[(G + 13128) >> 2] | 0;
                    f = (((e | 0) < 0) << 31) >> 31;
                    if (
                      !(
                        (f >>> 0 > h >>> 0) |
                        (((f | 0) == (h | 0)) & (e >>> 0 > g >>> 0))
                      )
                    ) {
                      d = -1094995529;
                      break;
                    }
                    j = Zg(e | 0, f | 0, g | 0, h | 0) | 0;
                    c[((c[(i + 1648) >> 2] | 0) + (d << 2)) >> 2] = j;
                    j = c[H >> 2] | 0;
                    i = (j + 48) | 0;
                    F = c[i >> 2] | 0;
                    d = (F + -1) | 0;
                    if ((F | 0) > 1) {
                      f = (j + 1652) | 0;
                      e = 0;
                      g = 0;
                      d = 0;
                      while (1) {
                        h = ((Ye(K) | 0) + 1) | 0;
                        c[((c[f >> 2] | 0) + (e << 2)) >> 2] = h;
                        g = $g(h | 0, 0, g | 0, d | 0) | 0;
                        h = C;
                        e = (e + 1) | 0;
                        d = ((c[i >> 2] | 0) + -1) | 0;
                        if ((e | 0) >= (d | 0)) break;
                        else d = h;
                      }
                    } else {
                      h = 0;
                      g = 0;
                    }
                    e = c[(G + 13132) >> 2] | 0;
                    f = (((e | 0) < 0) << 31) >> 31;
                    if (
                      !(
                        (f >>> 0 > h >>> 0) |
                        (((f | 0) == (h | 0)) & (e >>> 0 > g >>> 0))
                      )
                    ) {
                      d = -1094995529;
                      break;
                    }
                    F = Zg(e | 0, f | 0, g | 0, h | 0) | 0;
                    c[((c[(j + 1652) >> 2] | 0) + (d << 2)) >> 2] = F;
                  }
                  F = (We(K) | 0) & 255;
                  o = c[H >> 2] | 0;
                  a[(o + 53) >> 0] = F;
                }
                a[(o + 54) >> 0] = We(K) | 0;
                F = (We(K) | 0) & 255;
                a[(o + 55) >> 0] = F;
                if (
                  (
                    (F << 24) >> 24
                      ? ((a[(o + 56) >> 0] = We(K) | 0),
                        (F = (We(K) | 0) & 255),
                        (a[(o + 57) >> 0] = F),
                        (F << 24) >> 24 == 0)
                      : 0
                  )
                    ? ((F = (o + 60) | 0),
                      (c[F >> 2] = (oe(K) | 0) << 1),
                      (E = (oe(K) | 0) << 1),
                      (c[(o + 64) >> 2] = E),
                      ((E + 13) | 0) >>> 0 > 26
                        ? 1
                        : (((c[F >> 2] | 0) + 13) | 0) >>> 0 > 26)
                    : 0
                ) {
                  d = -1094995529;
                  break;
                }
                F = (We(K) | 0) & 255;
                a[(o + 68) >> 0] = F;
                if ((F << 24) >> 24) {
                  d = (o + 69) | 0;
                  pe(d);
                  d = qe(b, d, G) | 0;
                  if ((d | 0) < 0) break;
                } else d = 0;
                a[(o + 1617) >> 0] = We(K) | 0;
                F = ((Ye(K) | 0) + 2) | 0;
                c[(o + 1620) >> 2] = F;
                E = (G + 13080) | 0;
                if (F >>> 0 <= (c[E >> 2] | 0) >>> 0) {
                  a[(o + 1628) >> 0] = We(K) | 0;
                  if (We(K) | 0 ? ((F = We(K) | 0), Te(K, 7) | 0, F | 0) : 0)
                    re(b, o);
                  j = (o + 44) | 0;
                  i = (o + 1656) | 0;
                  c[i >> 2] = of(((c[j >> 2] | 0) + 1) | 0, 4) | 0;
                  m = (o + 48) | 0;
                  k = (o + 1660) | 0;
                  c[k >> 2] = of(((c[m >> 2] | 0) + 1) | 0, 4) | 0;
                  F = (G + 13128) | 0;
                  D = of(c[F >> 2] | 0, 4) | 0;
                  n = (o + 1664) | 0;
                  c[n >> 2] = D;
                  if (
                    (c[i >> 2] | 0) != 0
                      ? !(((c[k >> 2] | 0) == 0) | ((D | 0) == 0))
                      : 0
                  ) {
                    do
                      if (a[(o + 52) >> 0] | 0) {
                        f = (o + 1648) | 0;
                        e = c[f >> 2] | 0;
                        if (!e) {
                          c[f >> 2] = of(c[j >> 2] | 0, 4) | 0;
                          c[(o + 1652) >> 2] = of(c[m >> 2] | 0, 4) | 0;
                          e = c[f >> 2] | 0;
                          if (!e) {
                            d = -12;
                            break b;
                          }
                        }
                        h = c[(o + 1652) >> 2] | 0;
                        if (!h) {
                          d = -12;
                          break b;
                        }
                        f = c[j >> 2] | 0;
                        if ((f | 0) > 0) {
                          g = 0;
                          do {
                            D = g;
                            g = (g + 1) | 0;
                            B = c[F >> 2] | 0;
                            c[(e + (D << 2)) >> 2] =
                              (((R(B, g) | 0) / (f | 0)) | 0) -
                              (((R(B, D) | 0) / (f | 0)) | 0);
                            f = c[j >> 2] | 0;
                          } while ((g | 0) < (f | 0));
                        }
                        e = c[m >> 2] | 0;
                        if ((e | 0) <= 0) break;
                        g = (G + 13132) | 0;
                        f = 0;
                        do {
                          D = f;
                          f = (f + 1) | 0;
                          B = c[g >> 2] | 0;
                          c[(h + (D << 2)) >> 2] =
                            (((R(B, f) | 0) / (e | 0)) | 0) -
                            (((R(B, D) | 0) / (e | 0)) | 0);
                          e = c[m >> 2] | 0;
                        } while ((f | 0) < (e | 0));
                      }
                    while (0);
                    i = c[i >> 2] | 0;
                    c[i >> 2] = 0;
                    if ((c[j >> 2] | 0) > 0) {
                      f = c[(o + 1648) >> 2] | 0;
                      e = 0;
                      g = 0;
                      do {
                        g = ((c[(f + (e << 2)) >> 2] | 0) + g) | 0;
                        e = (e + 1) | 0;
                        c[(i + (e << 2)) >> 2] = g;
                      } while ((e | 0) < (c[j >> 2] | 0));
                    }
                    g = c[k >> 2] | 0;
                    c[g >> 2] = 0;
                    if ((c[m >> 2] | 0) > 0) {
                      f = c[(o + 1652) >> 2] | 0;
                      e = 0;
                      h = 0;
                      do {
                        h = ((c[(f + (e << 2)) >> 2] | 0) + h) | 0;
                        e = (e + 1) | 0;
                        c[(g + (e << 2)) >> 2] = h;
                      } while ((e | 0) < (c[m >> 2] | 0));
                    }
                    e = c[F >> 2] | 0;
                    if ((e | 0) > 0) {
                      h = c[n >> 2] | 0;
                      f = 0;
                      g = 0;
                      do {
                        f =
                          (((g >>> 0 > (c[(i + (f << 2)) >> 2] | 0) >>> 0) &
                            1) +
                            f) |
                          0;
                        c[(h + (g << 2)) >> 2] = f;
                        g = (g + 1) | 0;
                        e = c[F >> 2] | 0;
                      } while ((g | 0) < (e | 0));
                    }
                    B = R(c[(G + 13132) >> 2] | 0, e) | 0;
                    A = (o + 1668) | 0;
                    c[A >> 2] = of(B, 4) | 0;
                    e = (o + 1672) | 0;
                    c[e >> 2] = of(B, 4) | 0;
                    f = (o + 1676) | 0;
                    c[f >> 2] = of(B, 4) | 0;
                    D = (G + 13164) | 0;
                    g = ((c[D >> 2] | 0) + 2) | 0;
                    g = of(R(g, g) | 0, 4) | 0;
                    c[(o + 1688) >> 2] = g;
                    if (!(c[A >> 2] | 0)) {
                      d = -12;
                      break;
                    }
                    if (!(c[e >> 2] | 0)) {
                      d = -12;
                      break;
                    }
                    if (((c[f >> 2] | 0) == 0) | ((g | 0) == 0)) {
                      d = -12;
                      break;
                    }
                    if ((B | 0) > 0) {
                      y = c[H >> 2] | 0;
                      n = (y + 44) | 0;
                      o = (y + 1656) | 0;
                      p = (y + 48) | 0;
                      q = (y + 1660) | 0;
                      r = (y + 1652) | 0;
                      s = c[q >> 2] | 0;
                      t = c[(y + 1648) >> 2] | 0;
                      u = c[o >> 2] | 0;
                      v = c[(y + 1668) >> 2] | 0;
                      w = c[(y + 1672) >> 2] | 0;
                      x = (y + 1652) | 0;
                      y = (y + 1648) | 0;
                      m = 0;
                      do {
                        k = c[F >> 2] | 0;
                        z = (m | 0) % (k | 0) | 0;
                        A = ((m | 0) / (k | 0)) | 0;
                        f = c[n >> 2] | 0;
                        e = 0;
                        while (1) {
                          if ((e | 0) >= (f | 0)) {
                            j = 0;
                            break;
                          }
                          g = (e + 1) | 0;
                          if (
                            z >>> 0 <
                            (c[((c[o >> 2] | 0) + (g << 2)) >> 2] | 0) >>> 0
                          ) {
                            j = e;
                            break;
                          } else e = g;
                        }
                        f = c[p >> 2] | 0;
                        e = 0;
                        while (1) {
                          if ((e | 0) >= (f | 0)) {
                            i = 0;
                            break;
                          }
                          g = (e + 1) | 0;
                          if (
                            A >>> 0 <
                            (c[((c[q >> 2] | 0) + (g << 2)) >> 2] | 0) >>> 0
                          ) {
                            i = e;
                            break;
                          } else e = g;
                        }
                        if ((j | 0) > 0) {
                          g = c[((c[x >> 2] | 0) + (i << 2)) >> 2] | 0;
                          h = c[y >> 2] | 0;
                          e = 0;
                          f = 0;
                          do {
                            e =
                              ((R(c[(h + (f << 2)) >> 2] | 0, g) | 0) + e) | 0;
                            f = (f + 1) | 0;
                          } while ((f | 0) != (j | 0));
                        } else e = 0;
                        if ((i | 0) > 0) {
                          g = c[r >> 2] | 0;
                          f = 0;
                          do {
                            e =
                              ((R(c[(g + (f << 2)) >> 2] | 0, k) | 0) + e) | 0;
                            f = (f + 1) | 0;
                          } while ((f | 0) != (i | 0));
                        }
                        A =
                          R(
                            c[(t + (j << 2)) >> 2] | 0,
                            (A - (c[(s + (i << 2)) >> 2] | 0)) | 0
                          ) | 0;
                        A = (e + z + A - (c[(u + (j << 2)) >> 2] | 0)) | 0;
                        c[(v + (m << 2)) >> 2] = A;
                        c[(w + (A << 2)) >> 2] = m;
                        m = (m + 1) | 0;
                      } while ((m | 0) != (B | 0));
                    }
                    f = c[H >> 2] | 0;
                    u = (f + 48) | 0;
                    g = c[u >> 2] | 0;
                    if ((g | 0) > 0) {
                      v = (f + 44) | 0;
                      w = (f + 1660) | 0;
                      t = (f + 1656) | 0;
                      x = (f + 1676) | 0;
                      s = (f + 1668) | 0;
                      e = 0;
                      h = 0;
                      f = c[v >> 2] | 0;
                      do
                        if ((f | 0) > 0) {
                          p = c[w >> 2] | 0;
                          r = (h + 1) | 0;
                          q = (p + (r << 2)) | 0;
                          p = (p + (h << 2)) | 0;
                          o = 0;
                          g = c[q >> 2] | 0;
                          do {
                            i = c[p >> 2] | 0;
                            h = o;
                            o = (o + 1) | 0;
                            if (i >>> 0 < g >>> 0) {
                              m = c[t >> 2] | 0;
                              n = (m + (o << 2)) | 0;
                              m = (m + (h << 2)) | 0;
                              f = c[n >> 2] | 0;
                              do {
                                h = c[m >> 2] | 0;
                                if (h >>> 0 < f >>> 0) {
                                  j = c[x >> 2] | 0;
                                  k = c[s >> 2] | 0;
                                  g = h;
                                  do {
                                    c[
                                      (j +
                                        (c[
                                          (k +
                                            (((R(c[F >> 2] | 0, i) | 0) + g) <<
                                              2)) >>
                                            2
                                        ] <<
                                          2)) >>
                                        2
                                    ] = e;
                                    g = (g + 1) | 0;
                                    f = c[n >> 2] | 0;
                                  } while (g >>> 0 < f >>> 0);
                                  g = c[q >> 2] | 0;
                                }
                                i = (i + 1) | 0;
                              } while (i >>> 0 < g >>> 0);
                              f = c[v >> 2] | 0;
                            }
                            e = (e + 1) | 0;
                          } while ((o | 0) < (f | 0));
                          h = r;
                          g = c[u >> 2] | 0;
                        } else h = (h + 1) | 0;
                      while ((h | 0) < (g | 0));
                      f = c[H >> 2] | 0;
                    } else e = 0;
                    m = of(e, 4) | 0;
                    c[(f + 1680) >> 2] = m;
                    if (!m) {
                      d = -12;
                      break;
                    }
                    n = (f + 48) | 0;
                    e = c[n >> 2] | 0;
                    if ((e | 0) > 0) {
                      k = (f + 44) | 0;
                      o = (f + 1660) | 0;
                      p = (f + 1656) | 0;
                      j = 0;
                      g = c[k >> 2] | 0;
                      do {
                        if ((g | 0) > 0) {
                          h = ((c[o >> 2] | 0) + (j << 2)) | 0;
                          i = c[p >> 2] | 0;
                          e = 0;
                          do {
                            B = R(c[F >> 2] | 0, c[h >> 2] | 0) | 0;
                            c[(m + (((R(g, j) | 0) + e) << 2)) >> 2] =
                              (c[(i + (e << 2)) >> 2] | 0) + B;
                            e = (e + 1) | 0;
                            g = c[k >> 2] | 0;
                          } while ((e | 0) < (g | 0));
                          e = c[n >> 2] | 0;
                        }
                        j = (j + 1) | 0;
                      } while ((j | 0) < (e | 0));
                    }
                    r = ((c[E >> 2] | 0) - (c[(G + 13072) >> 2] | 0)) | 0;
                    g = c[(f + 1688) >> 2] | 0;
                    e = c[D >> 2] | 0;
                    c[(f + 1684) >> 2] = g + ((e + 3) << 2);
                    do
                      if ((e | 0) > -2) {
                        f = 0;
                        e = (e + 2) | 0;
                        do {
                          c[(g + ((R(e, f) | 0) << 2)) >> 2] = -1;
                          c[(g + (f << 2)) >> 2] = -1;
                          f = (f + 1) | 0;
                          h = c[D >> 2] | 0;
                          e = (h + 2) | 0;
                        } while ((f | 0) < (e | 0));
                        if ((h | 0) < 0) break;
                        q = c[H >> 2] | 0;
                        n = (q + 1668) | 0;
                        o = r << 1;
                        p = (r | 0) > 0;
                        q = (q + 1684) | 0;
                        m = 0;
                        e = h;
                        while (1) {
                          if ((e | 0) >= 0) {
                            i = m >> r;
                            j = c[n >> 2] | 0;
                            k = c[q >> 2] | 0;
                            h = 0;
                            while (1) {
                              f =
                                c[
                                  (j +
                                    (((R(c[F >> 2] | 0, i) | 0) + (h >> r)) <<
                                      2)) >>
                                    2
                                ] << o;
                              if (p) {
                                g = 0;
                                do {
                                  H = 1 << g;
                                  f =
                                    ((((H & m) | 0) == 0 ? 0 : (H << 1) << g) +
                                      f +
                                      (((H & h) | 0) == 0 ? 0 : H << g)) |
                                    0;
                                  g = (g + 1) | 0;
                                } while ((g | 0) != (r | 0));
                              }
                              c[
                                (k + (((R((e + 2) | 0, m) | 0) + h) << 2)) >> 2
                              ] = f;
                              e = c[D >> 2] | 0;
                              if ((h | 0) < (e | 0)) h = (h + 1) | 0;
                              else break;
                            }
                          }
                          if ((m | 0) < (e | 0)) m = (m + 1) | 0;
                          else break;
                        }
                      }
                    while (0);
                    if ((ke(K) | 0) < 0) break;
                    d = (b + 400 + (J << 2)) | 0;
                    wf(d);
                    c[d >> 2] = I;
                    d = 0;
                    break a;
                  } else d = -12;
                } else d = -1094995529;
              } else d = -1094995529;
            } else d = -1094995529;
          while (0);
          wf(L);
        }
      while (0);
      l = M;
      return d | 0;
    }
    function ne(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0;
      a = l;
      l = (l + 16) | 0;
      d = a;
      c[d >> 2] = b;
      hf((b + 1648) | 0);
      hf((b + 1652) | 0);
      hf((b + 1656) | 0);
      hf((b + 1660) | 0);
      hf((b + 1664) | 0);
      hf((b + 1668) | 0);
      hf((b + 1672) | 0);
      hf((b + 1680) | 0);
      hf((b + 1676) | 0);
      hf((b + 1688) | 0);
      hf(d);
      l = a;
      return;
    }
    function oe(a) {
      a = a | 0;
      return $e(a) | 0;
    }
    function pe(b) {
      b = b | 0;
      var c = 0,
        d = 0,
        e = 0;
      c = 0;
      do {
        d = (b + (c << 6)) | 0;
        e = (d + 16) | 0;
        do {
          a[d >> 0] = 16;
          d = (d + 1) | 0;
        } while ((d | 0) < (e | 0));
        a[(b + 1536 + c) >> 0] = 16;
        a[(b + 1542 + c) >> 0] = 16;
        c = (c + 1) | 0;
      } while ((c | 0) != 6);
      d = (b + 384) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 448) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 512) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 576) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 640) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 704) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 768) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 832) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 896) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 960) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 1024) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 1088) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 1152) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 1216) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 1280) | 0;
      c = 1936;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 1344) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 1408) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      d = (b + 1472) | 0;
      c = 2e3;
      e = (d + 64) | 0;
      do {
        a[d >> 0] = a[c >> 0] | 0;
        d = (d + 1) | 0;
        c = (c + 1) | 0;
      } while ((d | 0) < (e | 0));
      return;
    }
    function qe(b, e, f) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0;
      o = ((c[(b + 136) >> 2] | 0) + 204) | 0;
      l = 0;
      a: while (1) {
        p = (l | 0) > 0 ? 64 : 16;
        q = (l | 0) > 1;
        r = (l + -2) | 0;
        m = (l | 0) == 3 ? 3 : 1;
        j = 1 << ((l << 1) + 4);
        j = (j | 0) < 64 ? j : 64;
        n = (l | 0) == 0;
        k = 0;
        do {
          if (!((((We(o) | 0) & 255) << 24) >> 24)) {
            b = Ye(o) | 0;
            if (b | 0) {
              if (k >>> 0 < b >>> 0) {
                b = -1094995529;
                break a;
              }
              b = (k - b) | 0;
              fh(
                (e + ((l * 384) | 0) + (k << 6)) | 0,
                (e + ((l * 384) | 0) + (b << 6)) | 0,
                p | 0
              ) | 0;
              if (q)
                a[(e + 1536 + ((r * 6) | 0) + k) >> 0] =
                  a[(e + 1536 + ((r * 6) | 0) + b) >> 0] | 0;
            }
          } else {
            if (q) {
              g = ((oe(o) | 0) + 8) | 0;
              a[(e + 1536 + ((r * 6) | 0) + k) >> 0] = g;
              b = 0;
            } else {
              b = 0;
              g = 8;
            }
            do {
              if (n) {
                h = (d[(430 + b) >> 0] | 0) << 2;
                i = (414 + b) | 0;
              } else {
                h = (d[(510 + b) >> 0] | 0) << 3;
                i = (446 + b) | 0;
              }
              i = ((d[i >> 0] | 0) + h) | 0;
              g = ((g + 256 + (oe(o) | 0)) | 0) % 256 | 0;
              a[(e + ((l * 384) | 0) + (k << 6) + i) >> 0] = g;
              b = (b + 1) | 0;
            } while ((b | 0) < (j | 0));
          }
          k = (k + m) | 0;
        } while ((k | 0) < 6);
        l = (l + 1) | 0;
        if ((l | 0) >= 4) {
          s = 16;
          break;
        }
      }
      if ((s | 0) == 16)
        if ((c[(f + 4) >> 2] | 0) == 3) {
          b = 0;
          do {
            a[(e + 1216 + b) >> 0] = a[(e + 832 + b) >> 0] | 0;
            a[(e + 1280 + b) >> 0] = a[(e + 896 + b) >> 0] | 0;
            a[(e + 1408 + b) >> 0] = a[(e + 1024 + b) >> 0] | 0;
            a[(e + 1472 + b) >> 0] = a[(e + 1088 + b) >> 0] | 0;
            b = (b + 1) | 0;
          } while ((b | 0) != 64);
          a[(e + 1543) >> 0] = a[(e + 1537) >> 0] | 0;
          a[(e + 1544) >> 0] = a[(e + 1538) >> 0] | 0;
          a[(e + 1546) >> 0] = a[(e + 1540) >> 0] | 0;
          a[(e + 1547) >> 0] = a[(e + 1541) >> 0] | 0;
          b = 0;
        } else b = 0;
      return b | 0;
    }
    function re(b, e) {
      b = b | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0;
      g = ((c[(b + 136) >> 2] | 0) + 204) | 0;
      if (a[(e + 21) >> 0] | 0) a[(e + 1629) >> 0] = (Ye(g) | 0) + 2;
      a[(e + 1630) >> 0] = We(g) | 0;
      f = (We(g) | 0) & 255;
      a[(e + 1631) >> 0] = f;
      if ((f << 24) >> 24) {
        a[(e + 1632) >> 0] = Ye(g) | 0;
        b = Ye(g) | 0;
        f = (e + 1633) | 0;
        a[f >> 0] = b;
        if ((b & 255) >>> 0 < 5) {
          b = 0;
          while (1) {
            a[(e + 1634 + b) >> 0] = $e(g) | 0;
            a[(e + 1639 + b) >> 0] = $e(g) | 0;
            if ((b | 0) < (d[f >> 0] | 0)) b = (b + 1) | 0;
            else {
              h = 6;
              break;
            }
          }
        }
      } else h = 6;
      if ((h | 0) == 6) {
        a[(e + 1644) >> 0] = Ye(g) | 0;
        a[(e + 1645) >> 0] = Ye(g) | 0;
      }
      return;
    }
    function se(a) {
      a = a | 0;
      var b = 0;
      b = (a + 136) | 0;
      do te(a);
      while ((ue(((c[b >> 2] | 0) + 204) | 0) | 0) != 0);
      return 1;
    }
    function te(a) {
      a = a | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0;
      f = ((c[(a + 136) >> 2] | 0) + 204) | 0;
      e = 0;
      do {
        d = Te(f, 8) | 0;
        e = (d + e) | 0;
      } while ((d | 0) == 255);
      d = 0;
      do {
        g = Te(f, 8) | 0;
        d = (g + d) | 0;
      } while ((g | 0) == 255);
      a: do
        if ((c[(a + 3500) >> 2] | 0) != 39)
          if ((e | 0) == 132) {
            xe(a);
            break;
          } else {
            Ve(f, d << 3);
            break;
          }
        else
          switch (e | 0) {
            case 256: {
              xe(a);
              break a;
            }
            case 257: {
              b[(a + 7776) >> 1] = Te(f, 16) | 0;
              break a;
            }
            default: {
              Ve(f, d << 3);
              break a;
            }
          }
      while (0);
      return;
    }
    function ue(a) {
      a = a | 0;
      if ((ve(a) | 0) > 0) a = (Ue(a, 8) | 0) != 128;
      else a = 0;
      return (a & 1) | 0;
    }
    function ve(a) {
      a = a | 0;
      var b = 0;
      b = c[(a + 12) >> 2] | 0;
      return (b - (we(a) | 0)) | 0;
    }
    function we(a) {
      a = a | 0;
      return c[(a + 8) >> 2] | 0;
    }
    function xe(b) {
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
      f = ((c[(b + 136) >> 2] | 0) + 204) | 0;
      h = (Te(f, 8) | 0) & 255;
      g = (b + 7720) | 0;
      e = 0;
      do {
        switch ((h << 24) >> 24) {
          case 0: {
            a[g >> 0] = 1;
            d = 0;
            do {
              a[(b + 7672 + (e << 4) + d) >> 0] = Te(f, 8) | 0;
              d = (d + 1) | 0;
            } while ((d | 0) != 16);
            break;
          }
          case 1: {
            Ve(f, 16);
            break;
          }
          case 2: {
            Ve(f, 32);
            break;
          }
          default: {
          }
        }
        e = (e + 1) | 0;
      } while ((e | 0) != 3);
      return;
    }
    function ye(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0;
      d = c[(b + 52) >> 2] | 0;
      f = (a + 60) | 0;
      if ((d | 0) > 0)
        if (
          (c[f >> 2] | 0) == 0
            ? ((d = lf(d) | 0), (c[f >> 2] = d), (d | 0) == 0)
            : 0
        )
          d = -12;
        else e = 5;
      else {
        c[f >> 2] = 0;
        e = 5;
      }
      if ((e | 0) == 5) {
        e = (a + 12) | 0;
        c[e >> 2] = b;
        c[(a + 424) >> 2] = 0;
        c[(a + 800) >> 2] = 1;
        d = (a + 912) | 0;
        c[d >> 2] = 0;
        c[(d + 4) >> 2] = 0;
        c[(d + 8) >> 2] = 0;
        c[(d + 12) >> 2] = 0;
        d = (a + 936) | 0;
        c[d >> 2] = 0;
        c[(d + 4) >> 2] = -2147483648;
        d = (a + 928) | 0;
        c[d >> 2] = 0;
        c[(d + 4) >> 2] = -2147483648;
        d = Ca[c[(b + 76) >> 2] & 7](a) | 0;
        if ((d | 0) < 0) {
          hf(f);
          c[e >> 2] = 0;
        } else d = 0;
      }
      return d | 0;
    }
    function ze(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0;
      if (a | 0) {
        b = (a + 12) | 0;
        d = c[b >> 2] | 0;
        if (d | 0 ? ((e = c[(d + 92) >> 2] | 0), e | 0) : 0) Ca[e & 7](a) | 0;
        c[(a + 796) >> 2] = 0;
        hf((a + 60) | 0);
        c[b >> 2] = 0;
        c[(a + 808) >> 2] = 0;
      }
      return 0;
    }
    function Ae(a, b, d, e, f, g) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0;
      if ((f | 0) > 0) {
        j = (e | 0) == 0;
        h = 0;
        do {
          i = (d + (R(h, g) | 0)) | 0;
          i = Ha[b & 1](a, i) | 0;
          if (!j) c[(e + (h << 2)) >> 2] = i;
          h = (h + 1) | 0;
        } while ((h | 0) != (f | 0));
      }
      return 0;
    }
    function Be(a, b, d, e, f) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0;
      if ((f | 0) > 0) {
        h = (e | 0) == 0;
        g = 0;
        do {
          i = Fa[b & 1](a, d, g, 0) | 0;
          if (!h) c[(e + (g << 2)) >> 2] = i;
          g = (g + 1) | 0;
        } while ((g | 0) != (f | 0));
      }
      return 0;
    }
    function Ce(b, f, g) {
      b = b | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0;
      l = Sf(c[(f + 76) >> 2] | 0) | 0;
      m = (l + 4) | 0;
      a: do
        if (!(a[m >> 0] | 0)) b = 0;
        else {
          n = (f + 64) | 0;
          i = (l + 5) | 0;
          j = (f + 68) | 0;
          k = (l + 6) | 0;
          h = 0;
          while (1) {
            b =
              ((R(
                (((((e[(l + 8 + (h << 1)) >> 1] | 0) >>> 11) & 15) + 8) &
                  65535) >>>
                  3,
                c[n >> 2] | 0
              ) |
                0) +
                31) &
              -32;
            if (((h + -1) | 0) >>> 0 < 2) {
              b = (0 - ((0 - b) >> d[i >> 0])) | 0;
              c[(f + 32 + (h << 2)) >> 2] = b;
              g = (0 - ((0 - (((c[j >> 2] | 0) + 31) & -32)) >> d[k >> 0])) | 0;
            } else {
              c[(f + 32 + (h << 2)) >> 2] = b;
              g = ((c[j >> 2] | 0) + 31) & -32;
            }
            b = sf(((R(b, g) | 0) + 32) | 0) | 0;
            c[(f + 304 + (h << 2)) >> 2] = b;
            if (!b) {
              b = -1;
              break a;
            }
            c[(f + (h << 2)) >> 2] = c[(b + 4) >> 2];
            h = (h + 1) | 0;
            if ((h | 0) >= (d[m >> 0] | 0)) {
              b = 0;
              break;
            }
          }
        }
      while (0);
      return b | 0;
    }
    function De(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0;
      ah(a | 0, 0, 976) | 0;
      e = (b | 0) != 0;
      if (e) {
        d = c[(b + 8) >> 2] | 0;
        c[(a + 48) >> 2] = c[(b + 12) >> 2];
      } else d = -1;
      c[(a + 8) >> 2] = d;
      c[(a + 100) >> 2] = 0;
      c[(a + 104) >> 2] = 1;
      c[(a + 888) >> 2] = 0;
      c[(a + 892) >> 2] = 1;
      c[(a + 896) >> 2] = 0;
      c[(a + 900) >> 2] = 1;
      c[(a + 476) >> 2] = 1;
      c[(a + 816) >> 2] = 1;
      c[(a + 820) >> 2] = 1;
      c[(a + 220) >> 2] = 0;
      c[(a + 224) >> 2] = 1;
      c[(a + 136) >> 2] = -1;
      c[(a + 416) >> 2] = -1;
      d = (a + 696) | 0;
      c[d >> 2] = 0;
      c[(d + 4) >> 2] = -2147483648;
      if (
        (e ? ((f = c[(b + 52) >> 2] | 0), (f | 0) != 0) : 0)
          ? ((f = lf(f) | 0), (c[(a + 60) >> 2] = f), (f | 0) == 0)
          : 0
      )
        d = -12;
      else d = 0;
      return d | 0;
    }
    function Ee(a) {
      a = a | 0;
      var b = 0;
      b = cf(976) | 0;
      if (b) {
        if ((De(b, a) | 0) < 0) {
          gf(b);
          b = 0;
        }
      } else b = 0;
      return b | 0;
    }
    function Fe(a, b, d, e) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
      j = l;
      l = (l + 80) | 0;
      i = j;
      f = i;
      g = e;
      h = (f + 80) | 0;
      do {
        c[f >> 2] = c[g >> 2];
        f = (f + 4) | 0;
        g = (g + 4) | 0;
      } while ((f | 0) < (h | 0));
      h = (a + 12) | 0;
      g = c[h >> 2] | 0;
      do
        if ((g | 0) != 0 ? (c[(g + 8) >> 2] | 0) == 0 : 0) {
          c[d >> 2] = 0;
          f = c[(a + 124) >> 2] | 0;
          g = c[(a + 128) >> 2] | 0;
          if (g | f | 0 ? Ge(f, g, 0, 0) | 0 : 0) {
            f = -22;
            break;
          }
          Pf(b);
          f = c[h >> 2] | 0;
          if (
            (
              ((c[(f + 16) >> 2] & 32) | 0) == 0
                ? (c[(e + 28) >> 2] | 0) == 0
                : 0
            )
              ? ((c[(a + 808) >> 2] & 1) | 0) == 0
              : 0
          ) {
            f = 0;
            break;
          }
          f = Fa[c[(f + 88) >> 2] & 1](a, b, d, i) | 0;
          if (!(c[d >> 2] | 0)) {
            Pf(b);
            break;
          } else {
            d = (a + 424) | 0;
            c[d >> 2] = (c[d >> 2] | 0) + 1;
            break;
          }
        } else f = -22;
      while (0);
      l = j;
      return f | 0;
    }
    function Ge(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      if (
        ((a | 0) > 0) & ((b | 0) > 0)
          ? ((a + 128) | 0) >>> 0 <
            ((268435455 / (((b + 128) | 0) >>> 0)) | 0) >>> 0
          : 0
      )
        a = 0;
      else a = -22;
      return a | 0;
    }
    function He(a, b) {
      a = a | 0;
      b = b | 0;
      return 0;
    }
    function Ie(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      return Je(a, b, c) | 0;
    }
    function Je(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0;
      k = (a + 8) | 0;
      if (!(c[k >> 2] | 0)) {
        g = c[(a + 116) >> 2] | 0;
        h = c[(a + 120) >> 2] | 0;
        if (
          (Ge(g, h, 0, 0) | 0) >= 0
            ? ((j = c[(a + 136) >> 2] | 0), (j | 0) >= 0)
            : 0
        ) {
          f = (b + 64) | 0;
          e = (b + 68) | 0;
          if ((c[f >> 2] | 0) >= 1 ? (c[e >> 2] | 0) >= 1 : 0) e = 1;
          else {
            i = c[(a + 792) >> 2] | 0;
            l = (0 - ((0 - (c[(a + 124) >> 2] | 0)) >> i)) | 0;
            c[f >> 2] = (g | 0) > (l | 0) ? g : l;
            i = (0 - ((0 - (c[(a + 128) >> 2] | 0)) >> i)) | 0;
            c[e >> 2] = (h | 0) > (i | 0) ? h : i;
            e = 0;
          }
          c[(b + 76) >> 2] = j;
          f = e;
          i = 8;
        } else e = -22;
      } else {
        f = 1;
        i = 8;
      }
      if ((i | 0) == 8) {
        e = ta[c[(a + 476) >> 2] & 1](a, b, d) | 0;
        if (!(c[k >> 2] | f)) {
          c[(b + 64) >> 2] = c[(a + 116) >> 2];
          c[(b + 68) >> 2] = c[(a + 120) >> 2];
        }
      }
      return e | 0;
    }
    function Ke(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      c[(b + 4) >> 2] = a;
      return Ie(a, c[b >> 2] | 0, d) | 0;
    }
    function Le(a, b) {
      a = a | 0;
      b = b | 0;
      a = c[b >> 2] | 0;
      if (a | 0) Pf(a);
      return;
    }
    function Me(a) {
      a = a | 0;
      return;
    }
    function Ne(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      return;
    }
    function Oe(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      return;
    }
    function Pe(a) {
      a = a | 0;
      var b = 0;
      b = (a + 8) | 0;
      c[b >> 2] = 0;
      c[(b + 4) >> 2] = -2147483648;
      b = (a + 16) | 0;
      c[b >> 2] = 0;
      c[(b + 4) >> 2] = -2147483648;
      b = (a + 64) | 0;
      c[b >> 2] = -1;
      c[(b + 4) >> 2] = -1;
      b = (a + 72) | 0;
      c[b >> 2] = 0;
      c[(b + 4) >> 2] = 0;
      b = (a + 32) | 0;
      c[a >> 2] = 0;
      c[b >> 2] = 0;
      c[(b + 4) >> 2] = 0;
      c[(b + 8) >> 2] = 0;
      c[(b + 12) >> 2] = 0;
      c[(b + 16) >> 2] = 0;
      return;
    }
    function Qe(a, b, e) {
      a = a | 0;
      b = b | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0;
      g = (a + 16) | 0;
      c[(a + 12) >> 2] = b;
      c[(a + 20) >> 2] = b + e;
      h = (b + 1) | 0;
      c[g >> 2] = h;
      e = (d[b >> 0] | 0) << 18;
      c[a >> 2] = e;
      f = (b + 2) | 0;
      c[g >> 2] = f;
      e = ((d[h >> 0] | 0) << 10) | e;
      c[a >> 2] = e;
      c[g >> 2] = b + 3;
      c[a >> 2] = ((d[f >> 0] | 0) << 2) | e | 2;
      c[(a + 4) >> 2] = 510;
      return;
    }
    function Re() {
      if (!(c[694] | 0)) {
        Se();
        c[694] = 1;
      }
      return;
    }
    function Se() {
      var b = 0,
        c = 0,
        e = 0,
        f = 0,
        g = 0;
      b = 0;
      while (1)
        if (b) {
          f = ((b & 65280) | 0) == 0;
          a[(4917 + b) >> 0] =
            (f ? 8 : 0) - (d[(2511 + (f ? b : b >>> 8)) >> 0] | 0);
          b = (b + 1) | 0;
          if ((b | 0) == 512) {
            f = 0;
            break;
          } else continue;
        } else {
          a[(4917 + b) >> 0] = 9;
          b = 1;
          continue;
        }
      do {
        c = f << 1;
        b = 0;
        do {
          g = a[(2064 + (f << 2) + b) >> 0] | 0;
          e = ((b << 7) + c) | 0;
          a[(5429 + (e | 1)) >> 0] = g;
          a[(5429 + e) >> 0] = g;
          b = (b + 1) | 0;
        } while ((b | 0) != 4);
        e = (d[(2320 + f) >> 0] | 0) << 1;
        a[(5941 + (c + 128)) >> 0] = e;
        a[(5941 + (c + 129)) >> 0] = e | 1;
        e = (128 - c) | 0;
        if (!f) {
          b = 0;
          c = 1;
        } else {
          c = (d[(2384 + f) >> 0] | 0) << 1;
          b = (c | 1) & 255;
          c = c & 255;
        }
        a[(5941 + (e + -1)) >> 0] = c;
        a[(5941 + (e + -2)) >> 0] = b;
        f = (f + 1) | 0;
      } while ((f | 0) != 64);
      b = 6197;
      c = 2448;
      e = (b + 63) | 0;
      do {
        a[b >> 0] = a[c >> 0] | 0;
        b = (b + 1) | 0;
        c = (c + 1) | 0;
      } while ((b | 0) < (e | 0));
      return;
    }
    function Te(a, b) {
      a = a | 0;
      b = b | 0;
      var e = 0,
        f = 0,
        g = 0;
      e = (a + 8) | 0;
      g = c[e >> 2] | 0;
      f = c[(a + 16) >> 2] | 0;
      a = ((c[a >> 2] | 0) + (g >>> 3)) | 0;
      a =
        ((ch(
          d[a >> 0] |
            (d[(a + 1) >> 0] << 8) |
            (d[(a + 2) >> 0] << 16) |
            (d[(a + 3) >> 0] << 24) |
            0
        ) |
          0) <<
          (g & 7)) >>>
        ((32 - b) | 0);
      b = (g + b) | 0;
      c[e >> 2] = f >>> 0 > b >>> 0 ? b : f;
      return a | 0;
    }
    function Ue(a, b) {
      a = a | 0;
      b = b | 0;
      var e = 0;
      e = c[(a + 8) >> 2] | 0;
      a = ((c[a >> 2] | 0) + (e >>> 3)) | 0;
      return (
        (((ch(
          d[a >> 0] |
            (d[(a + 1) >> 0] << 8) |
            (d[(a + 2) >> 0] << 16) |
            (d[(a + 3) >> 0] << 24) |
            0
        ) |
          0) <<
          (e & 7)) >>>
          ((32 - b) | 0)) |
        0
      );
    }
    function Ve(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0;
      d = (a + 8) | 0;
      a = c[(a + 16) >> 2] | 0;
      b = ((c[d >> 2] | 0) + b) | 0;
      c[d >> 2] = a >>> 0 > b >>> 0 ? b : a;
      return;
    }
    function We(a) {
      a = a | 0;
      var b = 0,
        e = 0,
        f = 0;
      e = (a + 8) | 0;
      f = c[e >> 2] | 0;
      b = (((d[((c[a >> 2] | 0) + (f >>> 3)) >> 0] | 0) << (f & 7)) >>> 7) & 1;
      c[e >> 2] = (((f | 0) < (c[(a + 16) >> 2] | 0)) & 1) + f;
      return b | 0;
    }
    function Xe(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0;
      do
        if (b)
          if ((b | 0) < 26) {
            a = Te(a, b) | 0;
            break;
          } else {
            b = (b + -16) | 0;
            c = (Te(a, 16) | 0) << b;
            a = c | (Te(a, b) | 0);
            break;
          }
        else a = 0;
      while (0);
      return a | 0;
    }
    function Ye(a) {
      a = a | 0;
      var b = 0,
        c = 0,
        e = 0;
      e = Ze(a) | 0;
      b = e >>> 0 > 65535;
      e = b ? e >>> 16 : e;
      b = b ? 16 : 0;
      c = ((e & 65280) | 0) == 0;
      b = (31 - (d[(2511 + (c ? e : e >>> 8)) >> 0] | 0) - (c ? b : b | 8)) | 0;
      _e(a, b);
      return ((Xe(a, (b + 1) | 0) | 0) + -1) | 0;
    }
    function Ze(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      b = l;
      l = (l + 32) | 0;
      d = b;
      c[d >> 2] = c[a >> 2];
      c[(d + 4) >> 2] = c[(a + 4) >> 2];
      c[(d + 8) >> 2] = c[(a + 8) >> 2];
      c[(d + 12) >> 2] = c[(a + 12) >> 2];
      c[(d + 16) >> 2] = c[(a + 16) >> 2];
      a = Xe(d, 32) | 0;
      l = b;
      return a | 0;
    }
    function _e(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0;
      d = (a + 8) | 0;
      e = c[d >> 2] | 0;
      f = (0 - e) | 0;
      a = ((c[(a + 16) >> 2] | 0) - e) | 0;
      c[d >> 2] = ((b | 0) < (f | 0) ? f : (a | 0) < (b | 0) ? a : b) + e;
      return;
    }
    function $e(a) {
      a = a | 0;
      a = Ye(a) | 0;
      return (
        (((a & 1) | 0) == 0 ? (0 - (a >>> 1)) | 0 : ((a + 1) | 0) >>> 1) | 0
      );
    }
    function af(b, c, d, e, f, g, h, i, j, k) {
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0;
      if (((j | 0) != 0) & ((k | 0) != 0)) {
        if ((i | 0) < (k | 0)) {
          s = (i | 0) > ((0 - g) | 0);
          m = (1 - g) | 0;
          r = (c + (R((0 - e) | 0, i) | 0) + (R(m, e) | 0)) | 0;
          c = s ? c : r;
          m = s ? i : m;
        } else {
          m = (k + -1) | 0;
          c = (c + (R((0 - e) | 0, i) | 0) + (R(m, e) | 0)) | 0;
        }
        if ((h | 0) < (j | 0)) {
          r = (h | 0) > ((0 - f) | 0);
          s = (1 - f) | 0;
          i = r ? h : s;
          c = r ? c : (c + (s - h)) | 0;
        } else {
          s = (j + -1) | 0;
          i = s;
          c = (c + (s - h)) | 0;
        }
        t = (m | 0) < 0;
        l = t ? (0 - m) | 0 : 0;
        r = (i | 0) < 0;
        s = r ? (0 - i) | 0 : 0;
        h = (k - m) | 0;
        h = (h | 0) < (g | 0) ? h : g;
        p = (j - i) | 0;
        q = (p | 0) < (f | 0);
        o = q ? p : f;
        n = (o - s) | 0;
        i = (c + (s + (R(l, e) | 0))) | 0;
        c = (b + s) | 0;
        if (t) {
          j = 0;
          do {
            fh(c | 0, i | 0, n | 0) | 0;
            c = (c + d) | 0;
            j = (j + 1) | 0;
          } while ((j | 0) < (l | 0));
        } else j = 0;
        if ((j | 0) < (h | 0)) {
          b = (m + -1 - k) | 0;
          l = ~g;
          l = R((~j - ((b | 0) > (l | 0) ? b : l)) | 0, d) | 0;
          b = c;
          while (1) {
            fh(b | 0, i | 0, n | 0) | 0;
            i = (i + e) | 0;
            j = (j + 1) | 0;
            if ((j | 0) >= (h | 0)) break;
            else b = (b + d) | 0;
          }
          c = (c + l) | 0;
        } else h = j;
        j = (i + (0 - e)) | 0;
        if ((h | 0) < (g | 0)) {
          b = R((g - h) | 0, d) | 0;
          i = h;
          h = c;
          while (1) {
            fh(h | 0, j | 0, n | 0) | 0;
            i = (i + 1) | 0;
            if ((i | 0) == (g | 0)) break;
            else h = (h + d) | 0;
          }
          c = (c + b) | 0;
        }
        if (g | 0) {
          j = (o + -1) | 0;
          h = (c + (0 - ((R(g, d) | 0) + s))) | 0;
          while (1) {
            g = (g + -1) | 0;
            if (r) {
              i = (h + s) | 0;
              c = 0;
              do {
                a[(h + c) >> 0] = a[i >> 0] | 0;
                c = (c + 1) | 0;
              } while ((c | 0) < (s | 0));
            }
            if (q) {
              i = (h + j) | 0;
              c = p;
              do {
                a[(h + c) >> 0] = a[i >> 0] | 0;
                c = (c + 1) | 0;
              } while ((c | 0) < (f | 0));
            }
            if (!g) break;
            else h = (h + d) | 0;
          }
        }
      }
      return;
    }
    function bf(a, b) {
      a = a | 0;
      b = b | 0;
      c[a >> 2] = 1;
      return;
    }
    function cf(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      d = ((c[66] | 0) + -32) | 0;
      b = a;
      while (1) {
        if (d >>> 0 < b >>> 0) {
          a = 0;
          break;
        }
        a = Ig(b) | 0;
        if (((b | 0) != 0) | ((a | 0) != 0)) break;
        else b = 1;
      }
      return a | 0;
    }
    function df(a, b) {
      a = a | 0;
      b = b | 0;
      if ((((c[66] | 0) + -32) | 0) >>> 0 < b >>> 0) a = 0;
      else a = Qg(a, ((((b | 0) == 0) & 1) + b) | 0) | 0;
      return a | 0;
    }
    function ef(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0,
        g = 0;
      g = l;
      l = (l + 16) | 0;
      f = g;
      if (
        !((ff(d, b, f) | 0) == 0
          ? ((f = c[f >> 2] | 0),
            (e = df(a, f) | 0),
            !(((f | 0) != 0) & ((e | 0) == 0)))
          : 0)
      ) {
        gf(a);
        e = 0;
      }
      l = g;
      return e | 0;
    }
    function ff(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0;
      e = R(b, a) | 0;
      if (
        ((a | 0) != 0) & ((b | a) >>> 0 > 65535)
          ? (((e >>> 0) / (a >>> 0)) | 0 | 0) != (b | 0)
          : 0
      )
        a = -22;
      else {
        c[d >> 2] = e;
        a = 0;
      }
      return a | 0;
    }
    function gf(a) {
      a = a | 0;
      Og(a);
      return;
    }
    function hf(a) {
      a = a | 0;
      gf(c[a >> 2] | 0);
      c[a >> 2] = 0;
      return;
    }
    function jf(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      if ((c | 0) != 0 ? ((2147483647 / (c >>> 0)) | 0) >>> 0 > b >>> 0 : 0)
        a = df(a, R(c, b) | 0) | 0;
      else a = 0;
      return a | 0;
    }
    function kf(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0;
      e = ef(c[a >> 2] | 0, b, d) | 0;
      c[a >> 2] = e;
      return (((d | 0) != 0) & (((b | 0) != 0) & ((e | 0) == 0)) ? -12 : 0) | 0;
    }
    function lf(a) {
      a = a | 0;
      var b = 0;
      b = cf(a) | 0;
      if (b | 0) ah(b | 0, 0, a | 0) | 0;
      return b | 0;
    }
    function mf(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      nf(a, b, c);
      return;
    }
    function nf(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0;
      if ((c[b >> 2] | 0) >>> 0 <= d >>> 0) {
        e = ((((d * 17) | 0) >>> 4) + 32) | 0;
        d = e >>> 0 > d >>> 0 ? e : d;
        gf(c[a >> 2] | 0);
        e = cf(d) | 0;
        c[a >> 2] = e;
        c[b >> 2] = (e | 0) == 0 ? 0 : d;
      }
      return;
    }
    function of(a, b) {
      a = a | 0;
      b = b | 0;
      if ((b | 0) != 0 ? ((2147483647 / (b >>> 0)) | 0) >>> 0 > a >>> 0 : 0)
        a = cf(R(b, a) | 0) | 0;
      else a = 0;
      return a | 0;
    }
    function pf(a, b) {
      a = a | 0;
      b = b | 0;
      if ((b | 0) != 0 ? ((2147483647 / (b >>> 0)) | 0) >>> 0 > a >>> 0 : 0)
        a = lf(R(b, a) | 0) | 0;
      else a = 0;
      return a | 0;
    }
    function qf(a, b, d, e, f) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0;
      j = l;
      l = (l + 16) | 0;
      h = j;
      g = lf(24) | 0;
      c[h >> 2] = g;
      i = g;
      do
        if (g) {
          c[g >> 2] = a;
          c[(g + 4) >> 2] = b;
          c[(g + 12) >> 2] = d | 0 ? d : 7;
          c[(g + 16) >> 2] = e;
          c[(g + 8) >> 2] = 1;
          if ((f & 1) | 0) {
            g = (g + 20) | 0;
            c[g >> 2] = c[g >> 2] | 1;
          }
          d = lf(12) | 0;
          if (!d) {
            hf(h);
            d = 0;
            break;
          } else {
            c[d >> 2] = i;
            c[(d + 4) >> 2] = a;
            c[(d + 8) >> 2] = b;
            break;
          }
        } else d = 0;
      while (0);
      l = j;
      return d | 0;
    }
    function rf(a, b) {
      a = a | 0;
      b = b | 0;
      gf(b);
      return;
    }
    function sf(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0;
      e = l;
      l = (l + 16) | 0;
      d = e;
      b = cf(a) | 0;
      c[d >> 2] = b;
      if (b) {
        a = qf(b, a, 7, 0, 0) | 0;
        if (!a) {
          hf(d);
          a = 0;
        }
      } else a = 0;
      l = e;
      return a | 0;
    }
    function tf(a) {
      a = a | 0;
      var b = 0;
      b = sf(a) | 0;
      if (!b) b = 0;
      else ah(c[(b + 4) >> 2] | 0, 0, a | 0) | 0;
      return b | 0;
    }
    function uf(a) {
      a = a | 0;
      var b = 0;
      b = lf(12) | 0;
      if (!b) b = 0;
      else {
        c[b >> 2] = c[a >> 2];
        c[(b + 4) >> 2] = c[(a + 4) >> 2];
        c[(b + 8) >> 2] = c[(a + 8) >> 2];
        vf(((c[a >> 2] | 0) + 8) | 0, 1) | 0;
      }
      return b | 0;
    }
    function vf(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0;
      d = c[a >> 2] | 0;
      c[a >> 2] = d + b;
      return (d + b) | 0;
    }
    function wf(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0,
        f = 0;
      f = l;
      l = (l + 16) | 0;
      d = f;
      if (
        (a | 0 ? ((e = c[a >> 2] | 0), e | 0) : 0)
          ? ((b = c[e >> 2] | 0),
            (c[d >> 2] = b),
            hf(a),
            b,
            (vf((b + 8) | 0, -1) | 0) == 0)
          : 0
      ) {
        ya[c[(b + 12) >> 2] & 15](c[(b + 16) >> 2] | 0, c[b >> 2] | 0);
        hf(d);
      }
      l = f;
      return;
    }
    function xf(a) {
      a = a | 0;
      return c[a >> 2] | 0;
    }
    function yf(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0;
      d = lf(20) | 0;
      if (!d) d = 0;
      else {
        c[(d + 12) >> 2] = a;
        c[(d + 16) >> 2] = b | 0 ? b : 4;
        zf((d + 4) | 0);
      }
      return d | 0;
    }
    function zf(a) {
      a = a | 0;
      c[a >> 2] = 1;
      return;
    }
    function Af(a) {
      a = a | 0;
      var b = 0;
      if (
        (a | 0 ? ((b = c[a >> 2] | 0), b | 0) : 0)
          ? ((c[a >> 2] = 0), (vf((b + 4) | 0, -1) | 0) == 0)
          : 0
      )
        Bf(b);
      return;
    }
    function Bf(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0,
        f = 0;
      e = l;
      l = (l + 16) | 0;
      b = e;
      d = (e + 4) | 0;
      c[b >> 2] = a;
      if (c[a >> 2] | 0)
        do {
          f = c[a >> 2] | 0;
          c[d >> 2] = f;
          c[a >> 2] = c[(f + 16) >> 2];
          f = c[d >> 2] | 0;
          ya[c[(f + 8) >> 2] & 15](c[(f + 4) >> 2] | 0, c[f >> 2] | 0);
          hf(d);
          a = c[b >> 2] | 0;
        } while ((c[a >> 2] | 0) != 0);
      hf(b);
      l = e;
      return;
    }
    function Cf(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0,
        f = 0;
      b = Df(a) | 0;
      a: do
        if (!b) {
          b = (a + 4) | 0;
          e = (a + 8) | 0;
          b: do
            if ((c[b >> 2] | 0) <= (c[e >> 2] | 0))
              while (1) {
                d = xf(b) | 0;
                if ((d | 0) > (xf(e) | 0)) break b;
                d = Df(a) | 0;
                if (d | 0) {
                  f = 6;
                  break a;
                }
              }
          while (0);
          b = Ef(a) | 0;
        } else {
          d = b;
          f = 6;
        }
      while (0);
      do
        if ((f | 0) == 6) {
          b = (d + 16) | 0;
          Ff(c[b >> 2] | 0);
          c[b >> 2] = 0;
          b = qf(c[d >> 2] | 0, c[(a + 12) >> 2] | 0, 8, d, 0) | 0;
          if (!b) {
            Ff(d);
            b = 0;
            break;
          } else {
            vf((a + 4) | 0, 1) | 0;
            break;
          }
        }
      while (0);
      return b | 0;
    }
    function Df(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0;
      b = 0;
      d = c[a >> 2] | 0;
      while (1) {
        if ((d | 0) == (b | 0)) break;
        b = Hf(a, d, 0) | 0;
        if (!b) {
          b = 0;
          break;
        } else {
          e = d;
          d = b;
          b = e;
        }
      }
      return b | 0;
    }
    function Ef(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0;
      f = l;
      l = (l + 16) | 0;
      d = f;
      b = Ca[c[(a + 16) >> 2] & 7](c[(a + 12) >> 2] | 0) | 0;
      c[d >> 2] = b;
      do
        if (b) {
          e = lf(20) | 0;
          if (!e) {
            wf(d);
            b = 0;
            break;
          } else {
            d = c[b >> 2] | 0;
            c[e >> 2] = c[d >> 2];
            g = (d + 16) | 0;
            c[(e + 4) >> 2] = c[g >> 2];
            d = (d + 12) | 0;
            c[(e + 8) >> 2] = c[d >> 2];
            c[(e + 12) >> 2] = a;
            c[g >> 2] = e;
            c[d >> 2] = 8;
            vf((a + 4) | 0, 1) | 0;
            vf((a + 8) | 0, 1) | 0;
            break;
          }
        } else b = 0;
      while (0);
      l = f;
      return b | 0;
    }
    function Ff(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0;
      if (a | 0) {
        e = c[(a + 12) >> 2] | 0;
        b = (a + 16) | 0;
        if (!(c[b >> 2] | 0)) b = a;
        else {
          d = b;
          do {
            b = c[d >> 2] | 0;
            d = (b + 16) | 0;
          } while ((c[d >> 2] | 0) != 0);
        }
        if (Hf(e, 0, a) | 0)
          do {
            d = (b + 16) | 0;
            c[d >> 2] = Df(e) | 0;
            if (c[d >> 2] | 0)
              do {
                b = c[d >> 2] | 0;
                d = (b + 16) | 0;
              } while ((c[d >> 2] | 0) != 0);
          } while ((Hf(e, 0, a) | 0) != 0);
      }
      return;
    }
    function Gf(a, b) {
      a = a | 0;
      b = b | 0;
      b = c[(a + 12) >> 2] | 0;
      Ff(a);
      if (!(vf((b + 4) | 0, -1) | 0)) Bf(b);
      return;
    }
    function Hf(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0;
      e = c[a >> 2] | 0;
      if ((e | 0) == (b | 0)) c[a >> 2] = d;
      return e | 0;
    }
    function If(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      a = (a + 360) | 0;
      c[a >> 2] = b;
      c[(a + 4) >> 2] = d;
      return;
    }
    function Jf(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      a = (a + 376) | 0;
      c[a >> 2] = b;
      c[(a + 4) >> 2] = d;
      return;
    }
    function Kf(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      a = (a + 368) | 0;
      c[a >> 2] = b;
      c[(a + 4) >> 2] = d;
      return;
    }
    function Lf(a, b) {
      a = a | 0;
      b = b | 0;
      c[(a + 392) >> 2] = b;
      return;
    }
    function Mf() {
      var a = 0;
      a = lf(400) | 0;
      if (!a) a = 0;
      else Nf(a);
      return a | 0;
    }
    function Nf(a) {
      a = a | 0;
      var b = 0;
      ah(a | 0, 0, 400) | 0;
      b = (a + 136) | 0;
      c[b >> 2] = 0;
      c[(b + 4) >> 2] = -2147483648;
      b = (a + 144) | 0;
      c[b >> 2] = 0;
      c[(b + 4) >> 2] = -2147483648;
      b = (a + 128) | 0;
      c[b >> 2] = 0;
      c[(b + 4) >> 2] = -2147483648;
      If(a, 0, -2147483648);
      Jf(a, 0, 0);
      Kf(a, -1, -1);
      Lf(a, -1);
      c[(a + 80) >> 2] = 1;
      c[(a + 120) >> 2] = 0;
      c[(a + 124) >> 2] = 1;
      c[(a + 76) >> 2] = -1;
      c[(a + 344) >> 2] = 2;
      c[(a + 348) >> 2] = 2;
      c[(a + 352) >> 2] = 2;
      c[(a + 340) >> 2] = 0;
      c[(a + 356) >> 2] = 0;
      return;
    }
    function Of(a) {
      a = a | 0;
      var b = 0;
      if (a | 0 ? ((b = c[a >> 2] | 0), b | 0) : 0) {
        Pf(b);
        hf(a);
      }
      return;
    }
    function Pf(a) {
      a = a | 0;
      var b = 0;
      b = 0;
      do {
        wf((a + 304 + (b << 2)) | 0);
        b = (b + 1) | 0;
      } while ((b | 0) != 8);
      Nf(a);
      return;
    }
    function Qf(a, b) {
      a = a | 0;
      b = b | 0;
      fh(a | 0, b | 0, 400) | 0;
      ah(b | 0, 0, 400) | 0;
      Nf(b);
      return;
    }
    function Rf(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
      c[(a + 76) >> 2] = c[(b + 76) >> 2];
      c[(a + 64) >> 2] = c[(b + 64) >> 2];
      c[(a + 68) >> 2] = c[(b + 68) >> 2];
      c[(a + 388) >> 2] = c[(b + 388) >> 2];
      h = (b + 296) | 0;
      g = c[(h + 4) >> 2] | 0;
      d = (a + 296) | 0;
      c[d >> 2] = c[h >> 2];
      c[(d + 4) >> 2] = g;
      c[(a + 72) >> 2] = c[(b + 72) >> 2];
      d = c[(b + 304) >> 2] | 0;
      if (!d) ra();
      else {
        f = 0;
        e = d;
      }
      while (1) {
        if (
          e | 0
            ? ((h = uf(e) | 0),
              (c[(a + 304 + (f << 2)) >> 2] = h),
              (h | 0) == 0)
            : 0
        ) {
          e = 5;
          break;
        }
        d = (f + 1) | 0;
        if (d >>> 0 >= 8) {
          e = 8;
          break;
        }
        f = d;
        e = c[(b + 304 + (d << 2)) >> 2] | 0;
      }
      if ((e | 0) == 5) {
        Pf(a);
        d = -12;
      } else if ((e | 0) == 8) {
        c[a >> 2] = c[b >> 2];
        c[(a + 4) >> 2] = c[(b + 4) >> 2];
        c[(a + 8) >> 2] = c[(b + 8) >> 2];
        c[(a + 12) >> 2] = c[(b + 12) >> 2];
        c[(a + 16) >> 2] = c[(b + 16) >> 2];
        c[(a + 20) >> 2] = c[(b + 20) >> 2];
        c[(a + 24) >> 2] = c[(b + 24) >> 2];
        c[(a + 28) >> 2] = c[(b + 28) >> 2];
        d = (a + 32) | 0;
        h = (b + 32) | 0;
        c[d >> 2] = c[h >> 2];
        c[(d + 4) >> 2] = c[(h + 4) >> 2];
        c[(d + 8) >> 2] = c[(h + 8) >> 2];
        c[(d + 12) >> 2] = c[(h + 12) >> 2];
        c[(d + 16) >> 2] = c[(h + 16) >> 2];
        c[(d + 20) >> 2] = c[(h + 20) >> 2];
        c[(d + 24) >> 2] = c[(h + 24) >> 2];
        c[(d + 28) >> 2] = c[(h + 28) >> 2];
        d = 0;
      }
      return d | 0;
    }
    function Sf(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      b = 0;
      while (1) {
        if ((c[(268 + ((b * 24) | 0)) >> 2] | 0) == (a | 0)) {
          d = 3;
          break;
        }
        b = (b + 1) | 0;
        if (b >>> 0 >= 4) {
          b = 0;
          break;
        }
      }
      if ((d | 0) == 3) b = (268 + ((b * 24) | 0) + 4) | 0;
      return b | 0;
    }
    function Tf(b, d, e) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0;
      f = (c[(b + 24) >> 2] | 0) == 0 ? 1 : 3;
      do
        if ((f | 0) <= (e | 0))
          if (((f | 0) == (e | 0)) & ((a[(b + 29) >> 0] | 0) != 0)) {
            f = c[(b + 12) >> 2] | 0;
            c[d >> 2] = c[(f + 32) >> 2];
            f = c[f >> 2] | 0;
            break;
          } else {
            c[d >> 2] = 0;
            f = 0;
            break;
          }
        else {
          f = c[(b + 8) >> 2] | 0;
          c[d >> 2] = c[(f + 32 + (e << 2)) >> 2];
          f = c[(f + (e << 2)) >> 2] | 0;
        }
      while (0);
      return f | 0;
    }
    function Uf(d, e) {
      d = d | 0;
      e = e | 0;
      var f = 0;
      if (!(c[(d + 8) >> 2] | 0)) d = -1;
      else {
        c[e >> 2] = c[(d + 16) >> 2];
        c[(e + 4) >> 2] = c[(d + 20) >> 2];
        a[(e + 8) >> 0] = c[(d + 24) >> 2];
        f = a[(d + 31) >> 0] | 0;
        a[(e + 9) >> 0] =
          ((a[(d + 29) >> 0] | 0) != 0) & ((f << 24) >> 24 == 0) & 1;
        a[(e + 12) >> 0] = a[(d + 33) >> 0] | 0;
        a[(e + 13) >> 0] = f;
        a[(e + 14) >> 0] = a[(d + 32) >> 0] | 0;
        a[(e + 10) >> 0] = c[(d + 36) >> 2];
        a[(e + 11) >> 0] = a[(d + 30) >> 0] | 0;
        a[(e + 15) >> 0] = a[(d + 34) >> 0] | 0;
        b[(e + 16) >> 1] = b[(d + 48) >> 1] | 0;
        d = 0;
      }
      return d | 0;
    }
    function Vf(b, d) {
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0;
      do
        if (!(c[(b + 8) >> 2] | 0)) e = -1;
        else {
          f = (b + 68) | 0;
          if (!(a[f >> 0] | 0)) {
            e = Wf(b, d) | 0;
            if (e | 0) break;
            a[f >> 0] = 1;
            c[(b + 72) >> 2] = d;
          } else {
            if (!(a[(b + 34) >> 0] | 0)) {
              e = -1;
              break;
            }
            if (!(a[(b + 41) >> 0] | 0)) {
              e = -1;
              break;
            }
            if ((c[(b + 72) >> 2] | 0) != (d | 0)) {
              e = -1;
              break;
            }
            f = (b + 60) | 0;
            e = c[f >> 2] | 0;
            d = c[(b + 64) >> 2] | 0;
            if ((d | 0) <= (e | 0)) {
              e = -1;
              break;
            }
            e = Xf(b, ((c[(b + 56) >> 2] | 0) + e) | 0, (d - e) | 0) | 0;
            if ((e | 0) < 0) {
              e = -1;
              break;
            }
            c[f >> 2] = (c[f >> 2] | 0) + e;
          }
          c[(b + 92) >> 2] = Tf(b, (b + 108) | 0, 0) | 0;
          if (!(c[(b + 24) >> 2] | 0)) e = 1;
          else {
            c[(b + 96) >> 2] = Tf(b, (b + 112) | 0, 1) | 0;
            c[(b + 100) >> 2] = Tf(b, (b + 116) | 0, 2) | 0;
            e = 3;
          }
          if (!(a[(b + 29) >> 0] | 0)) e = 0;
          else e = Tf(b, (b + 120) | 0, e) | 0;
          c[(b + 104) >> 2] = e;
          c[(b + 80) >> 2] = 0;
          e = 0;
        }
      while (0);
      return e | 0;
    }
    function Wf(b, e) {
      b = b | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0;
      if (e >>> 0 > 1) e = -1;
      else {
        a[(b + 76) >> 0] = ((e | 0) == 1) & 1;
        g = (b + 77) | 0;
        a[g >> 0] = 0;
        a[(b + 78) >> 0] = 0;
        h = (b + 24) | 0;
        if (
          (((c[h >> 2] | 0) + -1) | 0) >>> 0 < 2
            ? ((e = (b + 16) | 0),
              (i = c[e >> 2] | 0),
              (f = (b + 84) | 0),
              (c[f >> 2] = (((i + 1) | 0) / 2) | 0),
              (c[(b + 88) >> 2] = ((((c[(b + 20) >> 2] | 0) + 1) | 0) / 2) | 0),
              (c[(b + 124) >> 2] = cf(i) | 0),
              (c[(b + 128) >> 2] = cf(c[e >> 2] | 0) | 0),
              (c[(b + 196) >> 2] = cf(((c[f >> 2] << 1) + 14) | 0) | 0),
              (c[h >> 2] | 0) == 1)
            : 0
        ) {
          e = 0;
          do {
            c[(b + 132 + (e << 2)) >> 2] = cf(c[f >> 2] | 0) | 0;
            c[(b + 164 + (e << 2)) >> 2] = cf(c[f >> 2] | 0) | 0;
            e = (e + 1) | 0;
          } while ((e | 0) != 8);
        }
        e = (b + 36) | 0;
        bg(
          (b + 200) | 0,
          d[(b + 30) >> 0] | 0,
          a[g >> 0] | 0 ? 16 : 8,
          c[e >> 2] | 0,
          d[(b + 32) >> 0] | 0
        );
        if (!(c[h >> 2] | 0)) e = 4;
        else e = c[(364 + (c[e >> 2] << 2)) >> 2] | 0;
        c[(b + 248) >> 2] = e;
        e = 0;
      }
      return e | 0;
    }
    function Xf(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0,
        f = 0,
        g = 0;
      e = l;
      l = (l + 32) | 0;
      g = (e + 12) | 0;
      f = e;
      Yf(g);
      Yf(f);
      d = Zf(a, g, f, b, d, 0) | 0;
      gf(c[g >> 2] | 0);
      gf(c[f >> 2] | 0);
      l = e;
      return d | 0;
    }
    function Yf(a) {
      a = a | 0;
      c[a >> 2] = 0;
      c[(a + 4) >> 2] = 0;
      c[(a + 8) >> 2] = 0;
      return;
    }
    function Zf(b, e, f, g, h, i) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      var j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
      y = l;
      l = (l + 16) | 0;
      u = y;
      x = (b + 4) | 0;
      j = c[x >> 2] | 0;
      v = (j | 0) != 0;
      c[u >> 2] = 0;
      c[(u + 4) >> 2] = 0;
      a: do
        if ((h | 0) > 0) {
          s = (u + ((v & 1) << 2)) | 0;
          m = (i | 0) != 0;
          j = h;
          while (1) {
            if ((j | 0) < ((m ? 5 : 2) | 0)) {
              j = -1;
              break a;
            }
            if (m) k = 0;
            else k = (a[(g + 2) >> 0] | 0) == 0 ? 4 : 3;
            if ((j | 0) < ((k + 3) | 0)) {
              j = -1;
              break a;
            }
            q = (g + k) | 0;
            r = d[q >> 0] | 0;
            n = ((r << 5) & 32) | ((d[(g + (k + 1)) >> 0] | 0) >>> 3);
            r = r >>> 1;
            i = r & 63;
            if ((i >>> 0 > 40) | ((((r & 60) | 0) == 32) | ((i | 0) == 39))) {
              if (c[u >> 2] | 0 ? c[s >> 2] | 0 : 0) break;
            } else if (
              (
                (i >>> 0 < 10) | (((i + -16) | 0) >>> 0 < 6)
                  ? ((t = (k + 2) | 0), (t | 0) < (j | 0))
                  : 0
              )
                ? (a[(g + t) >> 0] | 0) < 0
                : 0
            ) {
              if (c[u >> 2] | 0 ? c[s >> 2] | 0 : 0) break;
              c[(u + ((v & ((n | 0) == 1) & 1) << 2)) >> 2] = 1;
            }
            r = _f(g, j, (m ^ 1) & 1) | 0;
            if ((r | 0) < 0) {
              j = -1;
              break a;
            }
            o = (r - k) | 0;
            p = (o + 3) | 0;
            m = v & ((n | 0) == 1);
            i = m ? e : f;
            k = (i + 8) | 0;
            if (($f(i, ((c[k >> 2] | 0) + p) | 0) | 0) < 0) {
              j = -1;
              break a;
            }
            i = ((c[i >> 2] | 0) + (c[k >> 2] | 0)) | 0;
            a[i >> 0] = 0;
            a[(i + 1) >> 0] = 0;
            a[(i + 2) >> 0] = 1;
            fh((i + 3) | 0, q | 0, o | 0) | 0;
            if (m) {
              q = (i + 4) | 0;
              a[q >> 0] = a[q >> 0] & 7;
            }
            c[k >> 2] = (c[k >> 2] | 0) + p;
            j = (j - r) | 0;
            if ((j | 0) > 0) {
              m = 0;
              g = (g + r) | 0;
            } else break;
          }
          i = j;
          j = c[x >> 2] | 0;
          w = 22;
        } else {
          i = h;
          w = 22;
        }
      while (0);
      do
        if ((w | 0) == 22) {
          if (j | 0) {
            j = (e + 8) | 0;
            if (($f(e, ((c[j >> 2] | 0) + 32) | 0) | 0) < 0) {
              j = -1;
              break;
            }
            if (
              (ag(
                c[x >> 2] | 0,
                c[(b + 12) >> 2] | 0,
                c[e >> 2] | 0,
                c[j >> 2] | 0
              ) |
                0) <
              0
            ) {
              j = -1;
              break;
            }
          }
          j = (f + 8) | 0;
          if (($f(f, ((c[j >> 2] | 0) + 32) | 0) | 0) < 0) j = -1;
          else {
            j =
              (ag(
                c[b >> 2] | 0,
                c[(b + 8) >> 2] | 0,
                c[f >> 2] | 0,
                c[j >> 2] | 0
              ) |
                0) <
              0;
            j = j ? -1 : (h - i) | 0;
          }
        }
      while (0);
      l = y;
      return j | 0;
    }
    function _f(b, c, d) {
      b = b | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
        f = 0,
        g = 0,
        h = 0;
      do
        if (d) {
          if ((c | 0) > 3) {
            if (a[b >> 0] | 0) {
              d = -1;
              break;
            }
            if (
              ((a[(b + 1) >> 0] | 0) == 0 ? (a[(b + 2) >> 0] | 0) == 0 : 0)
                ? (a[(b + 3) >> 0] | 0) == 1
                : 0
            ) {
              d = 4;
              e = 11;
              break;
            }
          } else {
            if ((c | 0) != 3) {
              d = -1;
              break;
            }
            if (a[b >> 0] | 0) {
              d = -1;
              break;
            }
          }
          if ((a[(b + 1) >> 0] | 0) == 0 ? (a[(b + 2) >> 0] | 0) == 1 : 0) {
            d = 3;
            e = 11;
          } else d = -1;
        } else {
          d = 0;
          e = 11;
        }
      while (0);
      a: do
        if ((e | 0) == 11) {
          e = (d + 2) | 0;
          if ((e | 0) <= (c | 0))
            if ((e | 0) < (c | 0)) {
              h = d;
              while (1) {
                d = h;
                h = (h + 1) | 0;
                if (!(a[(b + d) >> 0] | 0)) {
                  f = (a[(b + h) >> 0] | 0) == 0;
                  if (f ? (a[(b + e) >> 0] | 0) == 1 : 0) break a;
                  g = (d + 3) | 0;
                  if (
                    (
                      !(((g | 0) >= (c | 0)) | (f ^ 1))
                        ? (a[(b + e) >> 0] | 0) == 0
                        : 0
                    )
                      ? (a[(b + g) >> 0] | 0) == 1
                      : 0
                  )
                    break a;
                  else d = g;
                } else d = (d + 3) | 0;
                if ((d | 0) >= (c | 0)) {
                  d = c;
                  break;
                } else e = d;
              }
            } else d = c;
          else d = -1;
        }
      while (0);
      return d | 0;
    }
    function $f(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0;
      e = (a + 4) | 0;
      d = c[e >> 2] | 0;
      if ((d | 0) < (b | 0)) {
        d = (((d * 3) | 0) / 2) | 0;
        b = (d | 0) < (b | 0) ? b : d;
        d = df(c[a >> 2] | 0, b) | 0;
        if (!d) b = -1;
        else {
          c[a >> 2] = d;
          c[e >> 2] = b;
          b = 0;
        }
      } else b = 0;
      return b | 0;
    }
    function ag(b, d, e, f) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0;
      i = l;
      l = (l + 96) | 0;
      g = i;
      h = (i + 80) | 0;
      Pe(g);
      c[(g + 24) >> 2] = e;
      c[(g + 28) >> 2] = f;
      e = (e + f) | 0;
      f = (e + 32) | 0;
      do {
        a[e >> 0] = 0;
        e = (e + 1) | 0;
      } while ((e | 0) < (f | 0));
      g = Fe(b, d, h, g) | 0;
      l = i;
      return (((((g | 0) < 0) | ((c[h >> 2] | 0) == 0)) << 31) >> 31) | 0;
    }
    function bg(a, b, d, e, f) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0.0,
        h = 0.0,
        i = 0.0,
        j = 0.0,
        k = 0.0,
        l = 0,
        m = 0,
        n = 0,
        o = 0.0,
        p = 0.0,
        q = 0.0;
      n = (30 - d) | 0;
      g = +(((1 << d) + -1) | 0) * +((1 << n) | 0);
      j = g / +(((1 << b) + -1) | 0);
      m = (f | 0) != 0;
      if (m) {
        d = (b + -8) | 0;
        i = g / +((224 << d) | 0);
        k = g / +((219 << d) | 0);
      } else {
        i = j;
        k = j;
      }
      switch (e | 0) {
        case 0: {
          g = 0.114;
          h = 0.299;
          l = 6;
          break;
        }
        case 3: {
          g = 0.0722;
          h = 0.2126;
          l = 6;
          break;
        }
        case 4: {
          g = 0.0593;
          h = 0.2627;
          l = 6;
          break;
        }
        default: {
        }
      }
      if ((l | 0) == 6) {
        q = 1.0 - h;
        c[(a + 20) >> 2] = Vg(i * (q * 2.0)) | 0;
        o = 1.0 - g;
        p = o - h;
        c[(a + 24) >> 2] = Vg(i * ((g * 2.0 * o) / p)) | 0;
        c[(a + 28) >> 2] = Vg(i * ((h * 2.0 * q) / p)) | 0;
        c[(a + 32) >> 2] = Vg(i * (o * 2.0)) | 0;
      }
      d = Vg(j) | 0;
      c[(a + 8) >> 2] = d;
      c[a >> 2] = n;
      e = 1 << (n + -1);
      c[(a + 4) >> 2] = e;
      c[(a + 36) >> 2] = 1 << (b + -1);
      if (m) {
        d = Vg(k) | 0;
        e = ((R(d, -16 << (b + -8)) | 0) + e) | 0;
      }
      c[(a + 12) >> 2] = d;
      c[(a + 16) >> 2] = e;
      c[(a + 40) >> 2] = b;
      c[(a + 44) >> 2] = f;
      return;
    }
    function cg(b, e, f, g, h, i, j) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0;
      if ((c[(b + 40) >> 2] | 0) == 8 ? (c[(b + 44) >> 2] | 0) == 0 : 0) {
        if ((i | 0) > 0) {
          g = 0;
          h = e;
          while (1) {
            o = a[(f + g) >> 0] | 0;
            a[h >> 0] = o;
            a[(h + 1) >> 0] = o;
            a[(h + 2) >> 0] = o;
            g = (g + 1) | 0;
            if ((g | 0) == (i | 0)) break;
            else h = (h + j) | 0;
          }
        }
      } else k = 5;
      if (
        (k | 0) == 5
          ? ((l = c[(b + 12) >> 2] | 0),
            (m = c[(b + 16) >> 2] | 0),
            (n = c[b >> 2] | 0),
            (i | 0) > 0)
          : 0
      ) {
        g = 0;
        while (1) {
          o = (dg(((R(d[(f + g) >> 0] | 0, l) | 0) + m) >> n) | 0) & 255;
          a[e >> 0] = o;
          a[(e + 1) >> 0] = o;
          a[(e + 2) >> 0] = o;
          g = (g + 1) | 0;
          if ((g | 0) == (i | 0)) break;
          else e = (e + j) | 0;
        }
      }
      return;
    }
    function dg(a) {
      a = a | 0;
      return ((a | 0) < 0 ? 0 : (a | 0) < 255 ? a : 255) | 0;
    }
    function eg(b, e, f, g, h, i, j) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0;
      s = c[(b + 20) >> 2] | 0;
      m = c[(b + 24) >> 2] | 0;
      n = c[(b + 28) >> 2] | 0;
      o = c[(b + 32) >> 2] | 0;
      p = c[(b + 12) >> 2] | 0;
      q = c[(b + 16) >> 2] | 0;
      r = c[b >> 2] | 0;
      l = c[(b + 36) >> 2] | 0;
      if ((i | 0) > 0) {
        k = 0;
        b = e;
        while (1) {
          t = R(d[(f + k) >> 0] | 0, p) | 0;
          e = ((d[(g + k) >> 0] | 0) - l) | 0;
          u = ((d[(h + k) >> 0] | 0) - l) | 0;
          t = (t + q) | 0;
          a[b >> 0] = dg((t + (R(u, s) | 0)) >> r) | 0;
          a[(b + 1) >> 0] = dg((t - ((R(u, n) | 0) + (R(e, m) | 0))) >> r) | 0;
          a[(b + 2) >> 0] = dg((t + (R(e, o) | 0)) >> r) | 0;
          k = (k + 1) | 0;
          if ((k | 0) == (i | 0)) break;
          else b = (b + j) | 0;
        }
      }
      return;
    }
    function fg(b, e, f, g, h, i, j) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
      if ((c[(b + 40) >> 2] | 0) == 8 ? (c[(b + 44) >> 2] | 0) == 0 : 0) {
        if ((i | 0) > 0) {
          k = 0;
          l = e;
          while (1) {
            a[l >> 0] = a[(h + k) >> 0] | 0;
            a[(l + 1) >> 0] = a[(f + k) >> 0] | 0;
            a[(l + 2) >> 0] = a[(g + k) >> 0] | 0;
            k = (k + 1) | 0;
            if ((k | 0) == (i | 0)) break;
            else l = (l + j) | 0;
          }
        }
      } else m = 5;
      if (
        (m | 0) == 5
          ? ((n = c[(b + 12) >> 2] | 0),
            (o = c[(b + 16) >> 2] | 0),
            (p = c[b >> 2] | 0),
            (i | 0) > 0)
          : 0
      ) {
        k = 0;
        while (1) {
          a[e >> 0] = dg(((R(d[(h + k) >> 0] | 0, n) | 0) + o) >> p) | 0;
          a[(e + 1) >> 0] = dg(((R(d[(f + k) >> 0] | 0, n) | 0) + o) >> p) | 0;
          a[(e + 2) >> 0] = dg(((R(d[(g + k) >> 0] | 0, n) | 0) + o) >> p) | 0;
          k = (k + 1) | 0;
          if ((k | 0) == (i | 0)) break;
          else e = (e + j) | 0;
        }
      }
      return;
    }
    function gg(b, e, f, g, h, i, j) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0;
      o = c[(b + 12) >> 2] | 0;
      m = c[(b + 16) >> 2] | 0;
      n = c[b >> 2] | 0;
      l = c[(b + 36) >> 2] | 0;
      if ((i | 0) > 0) {
        k = 0;
        b = e;
        while (1) {
          q = d[(f + k) >> 0] | 0;
          r = ((d[(g + k) >> 0] | 0) - l) | 0;
          e = ((d[(h + k) >> 0] | 0) - l) | 0;
          p = (q - r) | 0;
          a[b >> 0] = dg(((R((p + e) | 0, o) | 0) + m) >> n) | 0;
          a[(b + 1) >> 0] = dg(((R((r + q) | 0, o) | 0) + m) >> n) | 0;
          a[(b + 2) >> 0] = dg(((R((p - e) | 0, o) | 0) + m) >> n) | 0;
          k = (k + 1) | 0;
          if ((k | 0) == (i | 0)) break;
          else b = (b + j) | 0;
        }
      }
      return;
    }
    function hg(b, d, f) {
      b = b | 0;
      d = d | 0;
      f = f | 0;
      var g = 0;
      g = c[(b + 8) >> 2] | 0;
      if ((g | 0) != 0 ? (a[(b + 34) >> 0] | 0) != 0 : 0) {
        g = (g + 128) | 0;
        g = eh(e[(b + 50) >> 1] | 0, 0, c[g >> 2] | 0, c[(g + 4) >> 2] | 0) | 0;
        c[d >> 2] = g;
        b = e[(b + 52) >> 1] | 0;
      } else {
        c[d >> 2] = 0;
        b = 1;
      }
      c[f >> 2] = b;
      return;
    }
    function ig(b, e) {
      b = b | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0;
      p = (b + 80) | 0;
      r = c[p >> 2] | 0;
      a: do
        if (r >>> 0 < (c[(b + 20) >> 2] | 0) >>> 0) {
          s = c[(b + 16) >> 2] | 0;
          n = ((c[(b + 92) >> 2] | 0) + (R(c[(b + 108) >> 2] | 0, r) | 0)) | 0;
          o = (b + 76) | 0;
          if (!(a[o >> 0] | 0)) q = a[(b + 78) >> 0] | 0 ? 4 : 3;
          else q = 4;
          switch (c[(b + 24) >> 2] | 0) {
            case 0: {
              Ja[c[(b + 248) >> 2] & 7]((b + 200) | 0, e, n, 0, 0, s, q);
              break;
            }
            case 1: {
              if (!r) {
                h = (b + 96) | 0;
                i = (b + 112) | 0;
                j = (b + 100) | 0;
                k = (b + 116) | 0;
                l = (b + 84) | 0;
                m = (b + 88) | 0;
                g = 0;
                do {
                  f = (g | 0) > 4 ? (g + -8) | 0 : g;
                  if ((f | 0) < 0) f = 0;
                  else {
                    t = c[m >> 2] | 0;
                    f = (f | 0) < (t | 0) ? f : (t + -1) | 0;
                  }
                  u = ((c[h >> 2] | 0) + (R(c[i >> 2] | 0, f) | 0)) | 0;
                  t = ((c[j >> 2] | 0) + (R(c[k >> 2] | 0, f) | 0)) | 0;
                  fh(c[(b + 132 + (g << 2)) >> 2] | 0, u | 0, c[l >> 2] | 0) |
                    0;
                  fh(c[(b + 164 + (g << 2)) >> 2] | 0, t | 0, c[l >> 2] | 0) |
                    0;
                  g = (g + 1) | 0;
                } while ((g | 0) != 8);
              }
              f = r >> 1;
              g = (f | 0) % 8 | 0;
              u = r & 1;
              h = (b + 124) | 0;
              l = (b + 196) | 0;
              m = (b + 30) | 0;
              t = (b + 28) | 0;
              jg(
                c[h >> 2] | 0,
                (b + 132) | 0,
                s,
                g,
                c[l >> 2] | 0,
                d[m >> 0] | 0,
                u,
                d[t >> 0] | 0
              );
              i = (b + 128) | 0;
              jg(
                c[i >> 2] | 0,
                (b + 164) | 0,
                s,
                g,
                c[l >> 2] | 0,
                d[m >> 0] | 0,
                u,
                d[t >> 0] | 0
              );
              if (u | 0) {
                m = ((g + 5) | 0) % 8 | 0;
                l = (f + 5) | 0;
                t = c[(b + 88) >> 2] | 0;
                t = (l | 0) < (t | 0) ? l : (t + -1) | 0;
                l =
                  ((c[(b + 96) >> 2] | 0) + (R(t, c[(b + 112) >> 2] | 0) | 0)) |
                  0;
                t =
                  ((c[(b + 100) >> 2] | 0) +
                    (R(c[(b + 116) >> 2] | 0, t) | 0)) |
                  0;
                u = (b + 84) | 0;
                fh(c[(b + 132 + (m << 2)) >> 2] | 0, l | 0, c[u >> 2] | 0) | 0;
                fh(c[(b + 164 + (m << 2)) >> 2] | 0, t | 0, c[u >> 2] | 0) | 0;
              }
              Ja[c[(b + 248) >> 2] & 7](
                (b + 200) | 0,
                e,
                n,
                c[h >> 2] | 0,
                c[i >> 2] | 0,
                s,
                q
              );
              break;
            }
            case 2: {
              u =
                ((c[(b + 96) >> 2] | 0) + (R(c[(b + 112) >> 2] | 0, r) | 0)) |
                0;
              j =
                ((c[(b + 100) >> 2] | 0) + (R(c[(b + 116) >> 2] | 0, r) | 0)) |
                0;
              t = (b + 124) | 0;
              k = (b + 30) | 0;
              l = (b + 28) | 0;
              m = (b + 196) | 0;
              kg(
                c[t >> 2] | 0,
                u,
                s,
                d[k >> 0] | 0,
                d[l >> 0] | 0,
                c[m >> 2] | 0
              );
              u = (b + 128) | 0;
              kg(
                c[u >> 2] | 0,
                j,
                s,
                d[k >> 0] | 0,
                d[l >> 0] | 0,
                c[m >> 2] | 0
              );
              Ja[c[(b + 248) >> 2] & 7](
                (b + 200) | 0,
                e,
                n,
                c[t >> 2] | 0,
                c[u >> 2] | 0,
                s,
                q
              );
              break;
            }
            case 3: {
              t =
                ((c[(b + 96) >> 2] | 0) + (R(c[(b + 112) >> 2] | 0, r) | 0)) |
                0;
              u =
                ((c[(b + 100) >> 2] | 0) + (R(c[(b + 116) >> 2] | 0, r) | 0)) |
                0;
              Ja[c[(b + 248) >> 2] & 7]((b + 200) | 0, e, n, t, u, s, q);
              break;
            }
            default: {
              f = -1;
              break a;
            }
          }
          do
            if (!(a[(b + 31) >> 0] | 0)) {
              if (a[o >> 0] | 0) {
                if (!(a[(b + 29) >> 0] | 0)) {
                  mg((e + 3) | 0, s);
                  break;
                }
                ng(
                  (b + 200) | 0,
                  (e + 3) | 0,
                  ((c[(b + 104) >> 2] | 0) +
                    (R(c[(b + 120) >> 2] | 0, r) | 0)) |
                    0,
                  s
                );
                if (a[(b + 33) >> 0] | 0) og(e, s);
              }
            } else {
              lg(
                (b + 200) | 0,
                e,
                ((c[(b + 104) >> 2] | 0) + (R(c[(b + 120) >> 2] | 0, r) | 0)) |
                  0,
                s,
                q
              );
              if (a[o >> 0] | 0) mg((e + 3) | 0, s);
            }
          while (0);
          c[p >> 2] = (c[p >> 2] | 0) + 1;
          f = 0;
        } else f = -1;
      while (0);
      return f | 0;
    }
    function jg(a, e, f, g, h, i, j, k) {
      a = a | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      var l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0;
      n = c[(e + (((g + 5) & 7) << 2)) >> 2] | 0;
      o = c[(e + (((g + 6) & 7) << 2)) >> 2] | 0;
      p = c[(e + (((g + 7) & 7) << 2)) >> 2] | 0;
      q = c[(e + ((g & 7) << 2)) >> 2] | 0;
      r = c[(e + (((g + 1) & 7) << 2)) >> 2] | 0;
      s = c[(e + (((g + 2) & 7) << 2)) >> 2] | 0;
      g = c[(e + (((g + 3) & 7) << 2)) >> 2] | 0;
      l = (i + -8) | 0;
      m = (1 << l) >> 1;
      t = (((f + 1) | 0) / 2) | 0;
      e = (f | 0) > 0;
      if (!j) {
        if (e) {
          e = 0;
          do {
            u = R(d[(o + e) >> 0] | 0, -6) | 0;
            j = R(d[(r + e) >> 0] | 0, -10) | 0;
            b[(h + ((e + 3) << 1)) >> 1] =
              (((d[(n + e) >> 0] | 0) << 1) +
                m +
                u +
                (((d[(p + e) >> 0] | 0) * 18) | 0) +
                (((d[(q + e) >> 0] | 0) * 57) | 0) +
                j +
                ((d[(s + e) >> 0] | 0) << 2) -
                (d[(g + e) >> 0] | 0)) >>
              l;
            e = (e + 1) | 0;
          } while ((e | 0) < (t | 0));
        }
      } else if (e) {
        e = 0;
        do {
          j = R(d[(p + e) >> 0] | 0, -10) | 0;
          u = R(d[(s + e) >> 0] | 0, -6) | 0;
          b[(h + ((e + 3) << 1)) >> 1] =
            (m -
              (d[(n + e) >> 0] | 0) +
              ((d[(o + e) >> 0] | 0) << 2) +
              j +
              (((d[(q + e) >> 0] | 0) * 57) | 0) +
              (((d[(r + e) >> 0] | 0) * 18) | 0) +
              u +
              ((d[(g + e) >> 0] | 0) << 1)) >>
            l;
          e = (e + 1) | 0;
        } while ((e | 0) < (t | 0));
      }
      m = (h + 6) | 0;
      g = b[m >> 1] | 0;
      e = 0;
      do {
        b[(h + (e << 1)) >> 1] = g;
        e = (e + 1) | 0;
      } while ((e | 0) != 3);
      l = (t + 3) | 0;
      g = b[(h + ((t + 2) << 1)) >> 1] | 0;
      e = 0;
      do {
        b[(h + ((l + e) << 1)) >> 1] = g;
        e = (e + 1) | 0;
      } while ((e | 0) != 4);
      if (!k) ug(a, m, f, i);
      else vg(a, m, f, i);
      return;
    }
    function kg(b, c, d, e, f, g) {
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0;
      i = (((d + 1) | 0) / 2) | 0;
      h = (g + 3) | 0;
      fh(h | 0, c | 0, i | 0) | 0;
      ah(g | 0, a[c >> 0] | 0, 3) | 0;
      ah((g + (i + 3)) | 0, a[(c + (i + -1)) >> 0] | 0, 4) | 0;
      if (!f) rg(b, h, d, e);
      else sg(b, h, d, e);
      return;
    }
    function lg(b, e, f, g, h) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0,
        j = 0,
        k = 0,
        l = 0;
      j = c[(b + 40) >> 2] | 0;
      k = 1 << (j + -1);
      if ((g | 0) > 0) {
        i = 0;
        b = e;
        while (1) {
          l = d[(f + i) >> 0] | 0;
          a[b >> 0] = ((R(d[b >> 0] | 0, l) | 0) + k) >> j;
          e = (b + 1) | 0;
          a[e >> 0] = ((R(d[e >> 0] | 0, l) | 0) + k) >> j;
          e = (b + 2) | 0;
          a[e >> 0] = ((R(d[e >> 0] | 0, l) | 0) + k) >> j;
          i = (i + 1) | 0;
          if ((i | 0) == (g | 0)) break;
          else b = (b + h) | 0;
        }
      }
      return;
    }
    function mg(b, c) {
      b = b | 0;
      c = c | 0;
      var d = 0;
      if ((c | 0) > 0) {
        d = 0;
        while (1) {
          a[b >> 0] = -1;
          d = (d + 1) | 0;
          if ((d | 0) == (c | 0)) break;
          else b = (b + 4) | 0;
        }
      }
      return;
    }
    function ng(b, e, f, g) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0;
      if ((c[(b + 40) >> 2] | 0) == 8) {
        if ((g | 0) > 0) {
          b = 0;
          while (1) {
            a[e >> 0] = a[(f + b) >> 0] | 0;
            b = (b + 1) | 0;
            if ((b | 0) == (g | 0)) break;
            else e = (e + 4) | 0;
          }
        }
      } else {
        i = c[(b + 8) >> 2] | 0;
        j = c[(b + 4) >> 2] | 0;
        h = c[b >> 2] | 0;
        if ((g | 0) > 0) {
          b = 0;
          while (1) {
            a[e >> 0] = ((R(d[(f + b) >> 0] | 0, i) | 0) + j) >> h;
            b = (b + 1) | 0;
            if ((b | 0) == (g | 0)) break;
            else e = (e + 4) | 0;
          }
        }
      }
      return;
    }
    function og(b, e) {
      b = b | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
      if (!(c[695] | 0)) {
        c[695] = 1;
        pg();
      }
      if ((e | 0) > 0) {
        h = 0;
        while (1) {
          g = a[(b + 3) >> 0] | 0;
          f = g & 255;
          if (!((g << 24) >> 24)) {
            a[b >> 0] = -1;
            a[(b + 1) >> 0] = -1;
            g = (b + 2) | 0;
            f = -1;
          } else {
            i = c[(2784 + (f << 2)) >> 2] | 0;
            a[b >> 0] = qg(d[b >> 0] | 0, f, i) | 0;
            j = (b + 1) | 0;
            a[j >> 0] = qg(d[j >> 0] | 0, f, i) | 0;
            j = (b + 2) | 0;
            g = j;
            f = (qg(d[j >> 0] | 0, f, i) | 0) & 255;
          }
          a[g >> 0] = f;
          h = (h + 1) | 0;
          if ((h | 0) == (e | 0)) break;
          else b = (b + 4) | 0;
        }
      }
      return;
    }
    function pg() {
      var a = 0;
      a = 1;
      do {
        c[(2784 + (a << 2)) >> 2] =
          ((((((a | 0) / 2) | 0) + 16711808) | 0) / (a | 0)) | 0;
        a = (a + 1) | 0;
      } while ((a | 0) != 256);
      return;
    }
    function qg(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      c = (((R(c, a) | 0) + 32768) | 0) >>> 16;
      return (a >>> 0 < b >>> 0 ? c : 255) | 0;
    }
    function rg(b, c, e, f) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0;
      i = ((1 << f) + -1) | 0;
      if ((e | 0) > 1) {
        l = (e + -2) | 0;
        k = l >>> 1;
        j = (k + 1) | 0;
        k = k << 1;
        h = (k + 2) | 0;
        g = c;
        f = b;
        while (1) {
          a[f >> 0] = a[g >> 0] | 0;
          n = R(((d[(g + 2) >> 0] | 0) + (d[(g + -1) >> 0] | 0)) | 0, -11) | 0;
          m = g;
          g = (g + 1) | 0;
          a[(f + 1) >> 0] =
            tg(
              (32 -
                (d[(m + -3) >> 0] | 0) -
                (d[(m + 4) >> 0] | 0) +
                (((d[(m + 3) >> 0] | 0) + (d[(m + -2) >> 0] | 0)) << 2) +
                n +
                (((((d[g >> 0] | 0) + (d[m >> 0] | 0)) | 0) * 40) | 0)) >>
                6,
              i
            ) | 0;
          e = (e + -2) | 0;
          if ((e | 0) <= 1) break;
          else f = (f + 2) | 0;
        }
        b = (b + h) | 0;
        f = (c + j) | 0;
        e = (l - k) | 0;
      } else f = c;
      if (e | 0) a[b >> 0] = a[f >> 0] | 0;
      return;
    }
    function sg(b, c, e, f) {
      b = b | 0;
      c = c | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0;
      s = ((1 << f) + -1) | 0;
      k = d[(c + -3) >> 0] | 0;
      g = d[(c + -2) >> 0] | 0;
      j = d[(c + -1) >> 0] | 0;
      h = d[c >> 0] | 0;
      f = d[(c + 1) >> 0] | 0;
      i = d[(c + 2) >> 0] | 0;
      if ((e | 0) > 1) {
        q = (e + -2) | 0;
        p = q >>> 1;
        r = p << 1;
        o = (r + 2) | 0;
        p = (p + 1) | 0;
        n = h;
        l = b;
        m = c;
        while (1) {
          h = d[(m + 3) >> 0] | 0;
          t = (n * 57) | 0;
          a[l >> 0] =
            tg(
              ((k << 1) +
                32 +
                (R(g, -6) | 0) +
                ((j * 18) | 0) +
                t +
                (R(f, -10) | 0) +
                (i << 2) -
                h) >>
                6,
              s
            ) | 0;
          a[(l + 1) >> 0] =
            tg(
              (32 -
                k +
                (g << 2) +
                (R(j, -10) | 0) +
                t +
                ((f * 18) | 0) +
                (R(i, -6) | 0) +
                (h << 1)) >>
                6,
              s
            ) | 0;
          e = (e + -2) | 0;
          if ((e | 0) <= 1) break;
          else {
            t = i;
            l = (l + 2) | 0;
            m = (m + 1) | 0;
            i = h;
            k = g;
            g = j;
            j = n;
            n = f;
            f = t;
          }
        }
        m = h;
        h = f;
        l = n;
        b = (b + o) | 0;
        c = (c + p) | 0;
        f = (q - r) | 0;
      } else {
        m = i;
        i = f;
        l = j;
        j = g;
        g = k;
        f = e;
      }
      if (f | 0)
        a[b >> 0] =
          tg(
            ((g << 1) +
              32 +
              (R(j, -6) | 0) +
              ((l * 18) | 0) +
              ((h * 57) | 0) +
              (R(i, -10) | 0) +
              (m << 2) -
              (d[(c + 3) >> 0] | 0)) >>
              6,
            s
          ) | 0;
      return;
    }
    function tg(a, b) {
      a = a | 0;
      b = b | 0;
      return ((a | 0) < 0 ? 0 : (a | 0) > (b | 0) ? b : a) | 0;
    }
    function ug(c, d, e, f) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0;
      n = ((1 << f) + -1) | 0;
      o = (14 - f) | 0;
      p = (1 << o) >> 1;
      j = (20 - f) | 0;
      h = 1 << (j + -1);
      if ((e | 0) > 1) {
        l = (e + -2) | 0;
        m = l >>> 1;
        k = (m + 1) | 0;
        m = m << 1;
        i = (m + 2) | 0;
        g = d;
        f = c;
        while (1) {
          a[f >> 0] = tg(((b[g >> 1] | 0) + p) >> o, n) | 0;
          r = R(((b[(g + 4) >> 1] | 0) + (b[(g + -2) >> 1] | 0)) | 0, -11) | 0;
          q = g;
          g = (g + 2) | 0;
          a[(f + 1) >> 0] =
            tg(
              (h -
                (b[(q + -6) >> 1] | 0) -
                (b[(q + 8) >> 1] | 0) +
                (((b[(q + 6) >> 1] | 0) + (b[(q + -4) >> 1] | 0)) << 2) +
                r +
                (((((b[g >> 1] | 0) + (b[q >> 1] | 0)) | 0) * 40) | 0)) >>
                j,
              n
            ) | 0;
          e = (e + -2) | 0;
          if ((e | 0) <= 1) break;
          else f = (f + 2) | 0;
        }
        c = (c + i) | 0;
        f = (d + (k << 1)) | 0;
        e = (l - m) | 0;
      } else f = d;
      if (e | 0) a[c >> 0] = tg(((b[f >> 1] | 0) + p) >> o, n) | 0;
      return;
    }
    function vg(c, d, e, f) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0;
      u = ((1 << f) + -1) | 0;
      s = (20 - f) | 0;
      t = 1 << (s + -1);
      k = b[(d + -6) >> 1] | 0;
      g = b[(d + -4) >> 1] | 0;
      j = b[(d + -2) >> 1] | 0;
      h = b[d >> 1] | 0;
      f = b[(d + 2) >> 1] | 0;
      i = b[(d + 4) >> 1] | 0;
      if ((e | 0) > 1) {
        q = (e + -2) | 0;
        p = q >>> 1;
        r = p << 1;
        o = (r + 2) | 0;
        p = (p + 1) | 0;
        n = h;
        l = c;
        m = d;
        while (1) {
          h = b[(m + 6) >> 1] | 0;
          v = (n * 57) | 0;
          a[l >> 0] =
            tg(
              ((k << 1) +
                t +
                (R(g, -6) | 0) +
                ((j * 18) | 0) +
                v +
                (R(f, -10) | 0) +
                (i << 2) -
                h) >>
                s,
              u
            ) | 0;
          a[(l + 1) >> 0] =
            tg(
              (t -
                k +
                (g << 2) +
                (R(j, -10) | 0) +
                v +
                ((f * 18) | 0) +
                (R(i, -6) | 0) +
                (h << 1)) >>
                s,
              u
            ) | 0;
          e = (e + -2) | 0;
          if ((e | 0) <= 1) break;
          else {
            v = i;
            l = (l + 2) | 0;
            m = (m + 2) | 0;
            i = h;
            k = g;
            g = j;
            j = n;
            n = f;
            f = v;
          }
        }
        m = h;
        h = f;
        l = n;
        c = (c + o) | 0;
        d = (d + (p << 1)) | 0;
        f = (q - r) | 0;
      } else {
        m = i;
        i = f;
        l = j;
        j = g;
        g = k;
        f = e;
      }
      if (f | 0)
        a[c >> 0] =
          tg(
            ((g << 1) +
              t +
              (R(j, -6) | 0) +
              ((l * 18) | 0) +
              ((h * 57) | 0) +
              (R(i, -10) | 0) +
              (m << 2) -
              (b[(d + 6) >> 1] | 0)) >>
              s,
            u
          ) | 0;
      return;
    }
    function wg() {
      return lf(252) | 0;
    }
    function xg(e, f, g) {
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0;
      y = l;
      l = (l + 48) | 0;
      t = y;
      h = yg(t, f, g, d[(e + 40) >> 0] | 0) | 0;
      a: do
        if ((h | 0) >= 0) {
          v = c[t >> 2] | 0;
          q = c[(t + 4) >> 2] | 0;
          k = a[(t + 12) >> 0] | 0;
          r = k & 255;
          n = c[(t + 24) >> 2] | 0;
          o = a[(t + 13) >> 0] | 0;
          s = o & 255;
          w = (e + 16) | 0;
          c[w >> 2] = v;
          x = (e + 20) | 0;
          c[x >> 2] = q;
          i = c[(t + 8) >> 2] | 0;
          j = (e + 24) | 0;
          c[j >> 2] = i;
          switch (i | 0) {
            case 5: {
              i = 2;
              p = 4;
              break;
            }
            case 4: {
              i = 1;
              p = 4;
              break;
            }
            default: {
              j = 1;
              m = i;
            }
          }
          if ((p | 0) == 4) {
            c[j >> 2] = i;
            j = 0;
            m = i;
          }
          a[(e + 28) >> 0] = j;
          a[(e + 29) >> 0] = k;
          a[(e + 33) >> 0] = a[(t + 15) >> 0] | 0;
          a[(e + 31) >> 0] = a[(t + 14) >> 0] | 0;
          a[(e + 32) >> 0] = a[(t + 16) >> 0] | 0;
          c[(e + 36) >> 2] = n;
          a[(e + 30) >> 0] = o;
          i = (e + 34) | 0;
          a[i >> 0] = a[(t + 17) >> 0] | 0;
          b[(e + 48) >> 1] = b[(t + 18) >> 1] | 0;
          b[(e + 50) >> 1] = b[(t + 20) >> 1] | 0;
          b[(e + 52) >> 1] = b[(t + 22) >> 1] | 0;
          k = (e + 44) | 0;
          c[k >> 2] = c[(t + 32) >> 2];
          do
            if (
              (((c[(t + 28) >> 2] | 0) + h) | 0) >>> 0 <= g >>> 0
                ? ((u = zg(e, (f + h) | 0, (g - h) | 0, v, q, m, s, r) | 0),
                  (u | 0) >= 0)
                : 0
            ) {
              j = (u + h) | 0;
              a[(e + 41) >> 0] = 1;
              if (!(a[i >> 0] | 0)) Ag(e);
              else {
                h = (g - j) | 0;
                i = cf(h) | 0;
                c[(e + 56) >> 2] = i;
                if (!i) break;
                fh(i | 0, (f + j) | 0, h | 0) | 0;
                c[(e + 64) >> 2] = h;
                c[(e + 60) >> 2] = 0;
              }
              f = c[(e + 8) >> 2] | 0;
              if (
                (c[(f + 64) >> 2] | 0) >= (c[w >> 2] | 0)
                  ? (c[(f + 68) >> 2] | 0) >= (c[x >> 2] | 0)
                  : 0
              ) {
                c[(e + 80) >> 2] = -1;
                h = 0;
                break a;
              }
            }
          while (0);
          Of((e + 8) | 0);
          Of((e + 12) | 0);
          c[k >> 2] = 0;
          h = -1;
        }
      while (0);
      l = y;
      return h | 0;
    }
    function yg(d, e, f, g) {
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
        i = 0,
        j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0,
        r = 0,
        s = 0,
        t = 0,
        u = 0,
        v = 0,
        w = 0,
        x = 0,
        y = 0,
        z = 0,
        A = 0,
        B = 0,
        C = 0,
        D = 0,
        E = 0,
        F = 0,
        G = 0,
        H = 0,
        I = 0,
        J = 0;
      J = l;
      l = (l + 32) | 0;
      x = (J + 20) | 0;
      A = (J + 16) | 0;
      C = (J + 8) | 0;
      D = (J + 12) | 0;
      E = (J + 4) | 0;
      F = J;
      a: do
        if (
          (
            (
              (
                (
                  ((f | 0) >= 6 ? (a[e >> 0] | 0) == 66 : 0)
                    ? (a[(e + 1) >> 0] | 0) == 80
                    : 0
                )
                  ? (a[(e + 2) >> 0] | 0) == 71
                  : 0
              )
                ? (a[(e + 3) >> 0] | 0) == -5
                : 0
            )
              ? ((H = a[(e + 4) >> 0] | 0),
                (h = H & 255),
                (n = h >>> 5),
                (c[(d + 8) >> 2] = n),
                (H & 255) <= 191)
              : 0
          )
            ? ((H = ((h & 15) + 8) | 0), (a[(d + 13) >> 0] = H), H >>> 0 <= 14)
            : 0
        ) {
          o = a[(e + 5) >> 0] | 0;
          z = o & 255;
          p = z >>> 4;
          c[(d + 24) >> 2] = p;
          w = z & 8;
          i = (z >>> 2) & 1;
          a[(d + 16) >> 0] = (z >>> 1) & 1;
          G = (d + 17) | 0;
          a[G >> 0] = z & 1;
          z = (d + 18) | 0;
          b[z >> 1] = 0;
          H = (d + 20) | 0;
          b[H >> 1] = 0;
          B = (d + 22) | 0;
          b[B >> 1] = 0;
          j = (d + 12) | 0;
          a[j >> 0] = 0;
          k = (d + 14) | 0;
          a[k >> 0] = 0;
          m = (d + 15) | 0;
          a[m >> 0] = 0;
          if (!(h & 16))
            if (!i) h = 0;
            else {
              a[j >> 0] = 1;
              a[k >> 0] = 1;
              h = 1;
            }
          else {
            a[j >> 0] = 1;
            a[m >> 0] = i;
            h = 0;
          }
          if (
            (
              (
                (
                  (
                    (
                      (o & 255) <= 79
                        ? (((p | 0) == 0) & ((h << 24) >> 24 == 0)) |
                          ((n | 0) != 0)
                        : 0
                    )
                      ? ((q = Eg(d, (e + 6) | 0, (f + -6) | 0) | 0),
                        (q | 0) >= 0)
                      : 0
                  )
                    ? ((r = (q + 6) | 0),
                      (s = (d + 4) | 0),
                      (t = Eg(s, (e + r) | 0, (f - r) | 0) | 0),
                      (t | 0) >= 0)
                    : 0
                )
                  ? ((u = (t + r) | 0), (c[d >> 2] | 0) != 0)
                  : 0
              )
                ? (c[s >> 2] | 0) != 0
                : 0
            )
              ? ((I = (d + 28) | 0),
                (v = Eg(I, (e + u) | 0, (f - u) | 0) | 0),
                (v | 0) >= 0)
              : 0
          ) {
            h = (v + u) | 0;
            c[x >> 2] = 0;
            b: do
              if (!w) {
                c[(d + 32) >> 2] = 0;
                y = 43;
              } else {
                i = Eg(x, (e + h) | 0, (f - h) | 0) | 0;
                if ((i | 0) < 0) {
                  h = -1;
                  break a;
                }
                h = (i + h) | 0;
                i = (d + 32) | 0;
                c[i >> 2] = 0;
                r = ((c[x >> 2] | 0) + h) | 0;
                if ((r | 0) > (f | 0)) {
                  h = -1;
                  break a;
                }
                q = (g | 0) != 0;
                if (!q ? (a[G >> 0] | 0) == 0 : 0) {
                  h = r;
                  break;
                }
                if ((r | 0) <= (h | 0)) {
                  y = 43;
                  break;
                }
                while (1) {
                  j = Fg(A, (e + h) | 0, (r - h) | 0) | 0;
                  if ((j | 0) < 0) {
                    h = -1;
                    break a;
                  }
                  h = (j + h) | 0;
                  j = Eg(C, (e + h) | 0, (r - h) | 0) | 0;
                  if ((j | 0) < 0) {
                    h = -1;
                    break a;
                  }
                  n = (j + h) | 0;
                  o = c[C >> 2] | 0;
                  h = (o + n) | 0;
                  if (h >>> 0 > r >>> 0) {
                    h = -1;
                    break a;
                  }
                  p = c[A >> 2] | 0;
                  if (((a[G >> 0] | 0) != 0) & ((p | 0) == 5)) {
                    j = Eg(D, (e + n) | 0, (r - n) | 0) | 0;
                    if ((j | 0) < 0) break;
                    j = (j + n) | 0;
                    k = Eg(E, (e + j) | 0, (r - j) | 0) | 0;
                    if ((k | 0) < 0) break;
                    y = (k + j) | 0;
                    if ((Eg(F, (e + y) | 0, (r - y) | 0) | 0) < 0) break;
                    j = c[E >> 2] | 0;
                    k = c[F >> 2] | 0;
                    if (((j | 0) == 0) | ((k | 0) == 0)) break;
                    if (((j & 65535) | 0) != (j | 0)) break;
                    if (((k & 65535) | 0) != (k | 0)) break;
                    m = c[D >> 2] | 0;
                    if (((m & 65535) | 0) != (m | 0)) break;
                    b[z >> 1] = m;
                    b[H >> 1] = j;
                    b[B >> 1] = k;
                  }
                  if (q) {
                    x = cf(16) | 0;
                    c[x >> 2] = p;
                    g = (x + 4) | 0;
                    c[g >> 2] = o;
                    y = (x + 12) | 0;
                    c[y >> 2] = 0;
                    c[i >> 2] = x;
                    i = cf(o) | 0;
                    c[(x + 8) >> 2] = i;
                    fh(i | 0, (e + n) | 0, c[g >> 2] | 0) | 0;
                    i = y;
                  }
                  if ((r | 0) <= (h | 0)) {
                    y = 43;
                    break b;
                  }
                }
                h = -1;
                break a;
              }
            while (0);
            if ((y | 0) == 43)
              if ((a[G >> 0] | 0) != 0 ? (b[H >> 1] | 0) == 0 : 0) {
                h = -1;
                break;
              }
            if (!(c[I >> 2] | 0)) c[I >> 2] = f - h;
          } else h = -1;
        } else h = -1;
      while (0);
      l = J;
      return h | 0;
    }
    function zg(a, b, d, e, f, g, h, i) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      var j = 0,
        k = 0,
        m = 0,
        n = 0,
        o = 0;
      o = l;
      l = (l + 32) | 0;
      k = (o + 12) | 0;
      m = o;
      Yf(k);
      Yf(m);
      if (i) {
        i = Bg(k, (a + 12) | 0, (a + 4) | 0, b, d, e, f, 0, h) | 0;
        if ((i | 0) < 0) i = -1;
        else {
          j = (b + i) | 0;
          b = (d - i) | 0;
          n = 4;
        }
      } else {
        j = b;
        b = d;
        n = 4;
      }
      if ((n | 0) == 4) {
        i = Bg(m, (a + 8) | 0, a, j, b, e, f, g, h) | 0;
        if ((i | 0) < 0) i = -1;
        else {
          n = (b - i) | 0;
          i = Zf(a, k, m, (j + i) | 0, n, 1) | 0;
          gf(c[k >> 2] | 0);
          gf(c[m >> 2] | 0);
          i = (i | 0) < 0 ? -1 : (d - n + i) | 0;
        }
      }
      l = o;
      return i | 0;
    }
    function Ag(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      b = (a + 4) | 0;
      d = c[b >> 2] | 0;
      if (d | 0) {
        ze(d) | 0;
        gf(c[b >> 2] | 0);
        c[b >> 2] = 0;
      }
      b = c[a >> 2] | 0;
      if (b | 0) {
        ze(b) | 0;
        gf(c[a >> 2] | 0);
        c[a >> 2] = 0;
      }
      return;
    }
    function Bg(a, b, d, e, f, g, h, i, j) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
      q = l;
      l = (l + 16) | 0;
      p = (q + 8) | 0;
      k = (q + 4) | 0;
      m = q;
      e = Cg(k, m, e, f, g, h, i, j) | 0;
      do
        if (
          (
            (
              (e | 0) >= 0
                ? ((k = c[k >> 2] | 0),
                  (m = Dg(a, k, c[m >> 2] | 0) | 0),
                  gf(k),
                  (m | 0) >= 0)
                : 0
            )
              ? ((n = Ee(152) | 0), (n | 0) != 0)
              : 0
          )
            ? ((m = Mf() | 0), (c[p >> 2] = m), (o = m), (m | 0) != 0)
            : 0
        ) {
          m = (n + 688) | 0;
          c[m >> 2] = c[m >> 2] | 1;
          if ((ye(n, 152, 0) | 0) < 0) {
            Of(p);
            e = -1;
            break;
          } else {
            c[d >> 2] = n;
            c[b >> 2] = o;
            break;
          }
        } else e = -1;
      while (0);
      l = q;
      return e | 0;
    }
    function Cg(b, d, e, f, g, h, i, j) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      var k = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0,
        q = 0;
      q = l;
      l = (l + 16) | 0;
      k = q;
      c[b >> 2] = 0;
      p = Eg(k, e, f) | 0;
      if (
        (p | 0) >= 0 ? ((o = c[k >> 2] | 0), o >>> 0 <= ((f - p) | 0) >>> 0) : 0
      ) {
        m = (o + 10) | 0;
        n = cf(m) | 0;
        i = i & 255;
        a[n >> 0] = i;
        a[(n + 1) >> 0] = g >>> 24;
        a[(n + 2) >> 0] = g >>> 16;
        a[(n + 3) >> 0] = g >>> 8;
        a[(n + 4) >> 0] = g;
        a[(n + 5) >> 0] = h >>> 24;
        a[(n + 6) >> 0] = h >>> 16;
        a[(n + 7) >> 0] = h >>> 8;
        a[(n + 8) >> 0] = h;
        a[(n + 9) >> 0] = j + 248;
        fh((n + 10) | 0, (e + p) | 0, o | 0) | 0;
        g = cf(((m << 1) + 6) | 0) | 0;
        a[g >> 0] = 0;
        a[(g + 1) >> 0] = 0;
        a[(g + 2) >> 0] = 0;
        a[(g + 3) >> 0] = 1;
        a[(g + 4) >> 0] = 96;
        a[(g + 5) >> 0] = 1;
        if ((m | 0) > 0) {
          e = 0;
          f = 6;
          while (1) {
            k = (e + 1) | 0;
            if (
              ((k | 0) < (m | 0)) & ((i << 24) >> 24 == 0)
                ? (a[(n + k) >> 0] | 0) == 0
                : 0
            ) {
              a[(g + f) >> 0] = 0;
              a[(g + (f + 1)) >> 0] = 0;
              a[(g + (f + 2)) >> 0] = 3;
              k = (e + 2) | 0;
              f = (f + 3) | 0;
            } else {
              a[(g + f) >> 0] = i;
              f = (f + 1) | 0;
            }
            if ((k | 0) >= (m | 0)) break;
            e = k;
            i = a[(n + k) >> 0] | 0;
          }
          if (!f) {
            f = 0;
            k = 12;
          } else k = 11;
        } else {
          f = 6;
          k = 11;
        }
        if ((k | 0) == 11) if (!(a[(g + (f + -1)) >> 0] | 0)) k = 12;
        if ((k | 0) == 12) {
          a[(g + f) >> 0] = -128;
          f = (f + 1) | 0;
        }
        gf(n);
        c[d >> 2] = f;
        c[b >> 2] = g;
        f = (p + o) | 0;
      } else f = -1;
      l = q;
      return f | 0;
    }
    function Dg(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      var e = 0;
      e = (a + 8) | 0;
      if (($f(a, ((c[e >> 2] | 0) + d) | 0) | 0) < 0) a = -1;
      else {
        fh(((c[a >> 2] | 0) + (c[e >> 2] | 0)) | 0, b | 0, d | 0) | 0;
        c[e >> 2] = (c[e >> 2] | 0) + d;
        a = 0;
      }
      return a | 0;
    }
    function Eg(a, b, d) {
      a = a | 0;
      b = b | 0;
      d = d | 0;
      b = Fg(a, b, d) | 0;
      if ((b | 0) >= 0) b = (c[a >> 2] | 0) >>> 0 > 1073741823 ? -1 : b;
      return b | 0;
    }
    function Fg(b, e, f) {
      b = b | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
        h = 0,
        i = 0;
      a: do
        if ((f | 0) >= 1) {
          g = a[e >> 0] | 0;
          h = g & 255;
          if ((g << 24) >> 24 > -1) {
            c[b >> 2] = h;
            f = 1;
            break;
          }
          if ((g << 24) >> 24 != -128) {
            g = h & 127;
            h = (e + 1) | 0;
            while (1) {
              if ((f | 0) < 2) {
                f = -1;
                break a;
              }
              i = h;
              h = (h + 1) | 0;
              i = d[i >> 0] | 0;
              g = (i & 127) | (g << 7);
              if (!(i & 128)) break;
              else f = (f + -1) | 0;
            }
            c[b >> 2] = g;
            f = (h - e) | 0;
          } else f = -1;
        } else f = -1;
      while (0);
      return f | 0;
    }
    function Gg(a) {
      a = a | 0;
      Hg(a);
      gf(c[(a + 56) >> 2] | 0);
      Ag(a);
      Of((a + 8) | 0);
      Of((a + 12) | 0);
      gf(a);
      return;
    }
    function Hg(a) {
      a = a | 0;
      var b = 0;
      gf(c[(a + 124) >> 2] | 0);
      gf(c[(a + 128) >> 2] | 0);
      b = 0;
      do {
        gf(c[(a + 132 + (b << 2)) >> 2] | 0);
        gf(c[(a + 164 + (b << 2)) >> 2] | 0);
        b = (b + 1) | 0;
      } while ((b | 0) != 8);
      gf(c[(a + 196) >> 2] | 0);
      return;
    }
    function Ig(a) {
      a = a | 0;
      var b = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 0,
        j = 0;
      a: do
        if (((a + -1) | 0) >>> 0 > 2147483582) b = 0;
        else {
          b = c[953] | 0;
          if (!b) {
            b = _g(64) | 0;
            if ((b | 0) == (-1 | 0)) {
              b = 0;
              break;
            }
            c[954] = _g(0) | 0;
            c[953] = 3808;
            c[952] = 3808;
            c[956] = 3820;
            c[955] = 3820;
            i = (b + 16) | 0;
            Jg(i, 170);
            Kg(i, 3820);
            Kg((b + 24) | 0, 3808);
            b = c[953] | 0;
          }
          i = Lg(a) | 0;
          g = (b + -8) | 0;
          a = Mg(g) | 0;
          b: do
            if (i >>> 0 < a >>> 0) {
              e = g;
              d = g;
              a = g;
              j = 10;
            } else {
              h = c[952] | 0;
              e = a;
              a = g;
              f = g;
              d = g;
              while (1) {
                if ((b | 0) == (h | 0)) break;
                if ((i | 0) == (e | 0)) {
                  j = 13;
                  break;
                }
                b = c[(b + 4) >> 2] | 0;
                g = (b + -8) | 0;
                a = Mg(g) | 0;
                if (i >>> 0 < a >>> 0) {
                  e = g;
                  d = g;
                  a = g;
                  j = 10;
                  break b;
                } else {
                  e = a;
                  a = g;
                  f = g;
                  d = g;
                }
              }
              if ((j | 0) == 13) {
                Ng(b);
                break;
              }
              if ((_g((i + 32 - e) | 0) | 0) == (-1 | 0)) {
                b = 0;
                break a;
              }
              c[954] = _g(0) | 0;
              b = h;
              e = f;
              j = 10;
            }
          while (0);
          if ((j | 0) == 10) {
            j = (e + i) | 0;
            Kg(j, d);
            Kg((j + 8) | 0, b);
            Jg(j, 170);
            Ng(b);
          }
          Jg(a, 85);
        }
      while (0);
      return b | 0;
    }
    function Jg(b, c) {
      b = b | 0;
      c = c | 0;
      a[(b + -1) >> 0] = c;
      return;
    }
    function Kg(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0;
      e = (b + 4) | 0;
      d = c[e >> 2] | 0;
      c[e >> 2] = a;
      c[a >> 2] = b;
      c[(a + 4) >> 2] = d;
      c[d >> 2] = a;
      return;
    }
    function Lg(a) {
      a = a | 0;
      return ((a + 40) & -32) | 0;
    }
    function Mg(a) {
      a = a | 0;
      var b = 0;
      b = c[(a + 4) >> 2] | 0;
      return (((b | 0) == 3820 ? c[954] | 0 : b) - a) | 0;
    }
    function Ng(a) {
      a = a | 0;
      var b = 0;
      b = c[a >> 2] | 0;
      a = c[(a + 4) >> 2] | 0;
      c[(b + 4) >> 2] = a;
      c[a >> 2] = b;
      return;
    }
    function Og(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      if (a | 0) {
        b = (a + -8) | 0;
        Kg(a, 3808);
        Jg(b, 170);
        d = c[b >> 2] | 0;
        if ((d | 0) != 3820 ? (Pg(d) | 0) == 170 : 0) {
          Ng(b);
          Ng(a);
          b = d;
        }
        a = c[(b + 4) >> 2] | 0;
        if ((a | 0) != 3820 ? (Pg(a) | 0) == 170 : 0) {
          Ng(a);
          b = (b + 8) | 0;
          Ng(b);
          d = (a + 8) | 0;
          Kg(b, d);
          Ng(d);
        }
      }
      return;
    }
    function Pg(a) {
      a = a | 0;
      return d[(a + -1) >> 0] | 0 | 0;
    }
    function Qg(a, b) {
      a = a | 0;
      b = b | 0;
      var d = 0,
        e = 0;
      do
        if (a) {
          if (!b) {
            Og(a);
            d = 0;
            break;
          }
          d = Ig(b) | 0;
          if (!d) d = 0;
          else {
            e = ((c[(a + -4) >> 2] | 0) - a + -1) | 0;
            fh(d | 0, a | 0, (e >>> 0 > b >>> 0 ? b : e) | 0) | 0;
            Og(a);
          }
        } else d = Ig(b) | 0;
      while (0);
      return d | 0;
    }
    function Rg() {
      return 3828;
    }
    function Sg(b, c, d) {
      b = b | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
        f = 0;
      a: do
        if (!d) b = 0;
        else {
          while (1) {
            e = a[b >> 0] | 0;
            f = a[c >> 0] | 0;
            if ((e << 24) >> 24 != (f << 24) >> 24) break;
            d = (d + -1) | 0;
            if (!d) {
              b = 0;
              break a;
            } else {
              b = (b + 1) | 0;
              c = (c + 1) | 0;
            }
          }
          b = ((e & 255) - (f & 255)) | 0;
        }
      while (0);
      return b | 0;
    }
    function Tg(a) {
      a = a | 0;
      return 0;
    }
    function Ug(a) {
      a = a | 0;
      return 0;
    }
    function Vg(a) {
      a = +a;
      var b = 0;
      b = Ug(32) | 0;
      a = +Wg(a);
      return ~~a | 0;
    }
    function Wg(a) {
      a = +a;
      var b = 0,
        d = 0;
      h[j >> 3] = a;
      b = c[(j + 4) >> 2] | 0;
      d = b & 2146435072;
      if (!((d >>> 0 > 1126170624) | (((d | 0) == 1126170624) & (0 > 0)))) {
        b = (b | 0) < 0;
        a =
          (b ? 4503599627370496.0 : -4503599627370496.0) +
          ((b ? -4503599627370496.0 : 4503599627370496.0) + a);
        if (a == 0.0) a = b ? -0.0 : 0.0;
      }
      return +a;
    }
    function Xg() {}
    function Yg(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      if ((c | 0) < 32) {
        C = b >> c;
        return (a >>> c) | ((b & ((1 << c) - 1)) << (32 - c));
      }
      C = (b | 0) < 0 ? -1 : 0;
      return (b >> (c - 32)) | 0;
    }
    function Zg(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      d = (b - d - ((c >>> 0 > a >>> 0) | 0)) >>> 0;
      return ((C = d), ((a - c) >>> 0) | 0) | 0;
    }
    function _g(a) {
      a = a | 0;
      var b = 0,
        d = 0;
      d = ((a + 15) & -16) | 0;
      b = c[i >> 2] | 0;
      a = (b + d) | 0;
      if ((((d | 0) > 0) & ((a | 0) < (b | 0))) | ((a | 0) < 0)) {
        Z() | 0;
        pa(12);
        return -1;
      }
      c[i >> 2] = a;
      if ((a | 0) > (Y() | 0) ? (X() | 0) == 0 : 0) {
        pa(12);
        c[i >> 2] = b;
        return -1;
      }
      return b | 0;
    }
    function $g(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      c = (a + c) >>> 0;
      return ((C = (b + d + ((c >>> 0 < a >>> 0) | 0)) >>> 0), c | 0) | 0;
    }
    function ah(b, d, e) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0,
        i = 0;
      h = (b + e) | 0;
      d = d & 255;
      if ((e | 0) >= 67) {
        while (b & 3) {
          a[b >> 0] = d;
          b = (b + 1) | 0;
        }
        f = (h & -4) | 0;
        g = (f - 64) | 0;
        i = d | (d << 8) | (d << 16) | (d << 24);
        while ((b | 0) <= (g | 0)) {
          c[b >> 2] = i;
          c[(b + 4) >> 2] = i;
          c[(b + 8) >> 2] = i;
          c[(b + 12) >> 2] = i;
          c[(b + 16) >> 2] = i;
          c[(b + 20) >> 2] = i;
          c[(b + 24) >> 2] = i;
          c[(b + 28) >> 2] = i;
          c[(b + 32) >> 2] = i;
          c[(b + 36) >> 2] = i;
          c[(b + 40) >> 2] = i;
          c[(b + 44) >> 2] = i;
          c[(b + 48) >> 2] = i;
          c[(b + 52) >> 2] = i;
          c[(b + 56) >> 2] = i;
          c[(b + 60) >> 2] = i;
          b = (b + 64) | 0;
        }
        while ((b | 0) < (f | 0)) {
          c[b >> 2] = i;
          b = (b + 4) | 0;
        }
      }
      while ((b | 0) < (h | 0)) {
        a[b >> 0] = d;
        b = (b + 1) | 0;
      }
      return (h - e) | 0;
    }
    function bh(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      if ((c | 0) < 32) {
        C = (b << c) | ((a & (((1 << c) - 1) << (32 - c))) >>> (32 - c));
        return a << c;
      }
      C = a << (c - 32);
      return 0;
    }
    function ch(a) {
      a = a | 0;
      return (
        ((a & 255) << 24) |
        (((a >> 8) & 255) << 16) |
        (((a >> 16) & 255) << 8) |
        (a >>> 24) |
        0
      );
    }
    function dh(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
        d = 0,
        e = 0,
        f = 0;
      f = a & 65535;
      e = b & 65535;
      c = R(e, f) | 0;
      d = a >>> 16;
      a = ((c >>> 16) + (R(e, d) | 0)) | 0;
      e = b >>> 16;
      b = R(e, f) | 0;
      return (
        ((C =
          ((a >>> 16) + (R(e, d) | 0) + ((((a & 65535) + b) | 0) >>> 16)) | 0),
        ((a + b) << 16) | (c & 65535) | 0) | 0
      );
    }
    function eh(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
        f = 0;
      e = a;
      f = c;
      c = dh(e, f) | 0;
      a = C;
      return (
        ((C = ((R(b, f) | 0) + (R(d, e) | 0) + a) | (a & 0)), c | 0 | 0) | 0
      );
    }
    function fh(b, d, e) {
      b = b | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
        g = 0,
        h = 0;
      if ((e | 0) >= 8192) return qa(b | 0, d | 0, e | 0) | 0;
      h = b | 0;
      g = (b + e) | 0;
      if ((b & 3) == (d & 3)) {
        while (b & 3) {
          if (!e) return h | 0;
          a[b >> 0] = a[d >> 0] | 0;
          b = (b + 1) | 0;
          d = (d + 1) | 0;
          e = (e - 1) | 0;
        }
        e = (g & -4) | 0;
        f = (e - 64) | 0;
        while ((b | 0) <= (f | 0)) {
          c[b >> 2] = c[d >> 2];
          c[(b + 4) >> 2] = c[(d + 4) >> 2];
          c[(b + 8) >> 2] = c[(d + 8) >> 2];
          c[(b + 12) >> 2] = c[(d + 12) >> 2];
          c[(b + 16) >> 2] = c[(d + 16) >> 2];
          c[(b + 20) >> 2] = c[(d + 20) >> 2];
          c[(b + 24) >> 2] = c[(d + 24) >> 2];
          c[(b + 28) >> 2] = c[(d + 28) >> 2];
          c[(b + 32) >> 2] = c[(d + 32) >> 2];
          c[(b + 36) >> 2] = c[(d + 36) >> 2];
          c[(b + 40) >> 2] = c[(d + 40) >> 2];
          c[(b + 44) >> 2] = c[(d + 44) >> 2];
          c[(b + 48) >> 2] = c[(d + 48) >> 2];
          c[(b + 52) >> 2] = c[(d + 52) >> 2];
          c[(b + 56) >> 2] = c[(d + 56) >> 2];
          c[(b + 60) >> 2] = c[(d + 60) >> 2];
          b = (b + 64) | 0;
          d = (d + 64) | 0;
        }
        while ((b | 0) < (e | 0)) {
          c[b >> 2] = c[d >> 2];
          b = (b + 4) | 0;
          d = (d + 4) | 0;
        }
      } else {
        e = (g - 4) | 0;
        while ((b | 0) < (e | 0)) {
          a[b >> 0] = a[d >> 0] | 0;
          a[(b + 1) >> 0] = a[(d + 1) >> 0] | 0;
          a[(b + 2) >> 0] = a[(d + 2) >> 0] | 0;
          a[(b + 3) >> 0] = a[(d + 3) >> 0] | 0;
          b = (b + 4) | 0;
          d = (d + 4) | 0;
        }
      }
      while ((b | 0) < (g | 0)) {
        a[b >> 0] = a[d >> 0] | 0;
        b = (b + 1) | 0;
        d = (d + 1) | 0;
      }
      return h | 0;
    }
    function gh(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      return ta[a & 1](b | 0, c | 0, d | 0) | 0;
    }
    function hh(a, b, c, d, e, f, g, h, i, j, k, l) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      ua[a & 7](
        b | 0,
        c | 0,
        d | 0,
        e | 0,
        f | 0,
        g | 0,
        h | 0,
        i | 0,
        j | 0,
        k | 0,
        l | 0
      );
    }
    function ih(a, b, c, d, e, f, g, h, i, j, k) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      va[a & 1](
        b | 0,
        c | 0,
        d | 0,
        e | 0,
        f | 0,
        g | 0,
        h | 0,
        i | 0,
        j | 0,
        k | 0
      );
    }
    function jh(a, b, c, d, e, f) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      wa[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0);
    }
    function kh(a, b) {
      a = a | 0;
      b = b | 0;
      xa[a & 7](b | 0);
    }
    function lh(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      ya[a & 15](b | 0, c | 0);
    }
    function mh(a, b, c, d, e, f, g) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      return za[a & 1](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0) | 0;
    }
    function nh(a, b, c, d, e, f, g, h, i, j) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      Aa[a & 1](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0, h | 0, i | 0, j | 0);
    }
    function oh(a, b, c, d, e, f, g, h, i, j, k, l, m) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      m = m | 0;
      Ba[a & 3](
        b | 0,
        c | 0,
        d | 0,
        e | 0,
        f | 0,
        g | 0,
        h | 0,
        i | 0,
        j | 0,
        k | 0,
        l | 0,
        m | 0
      );
    }
    function ph(a, b) {
      a = a | 0;
      b = b | 0;
      return Ca[a & 7](b | 0) | 0;
    }
    function qh(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      Da[a & 7](b | 0, c | 0, d | 0);
    }
    function rh(a, b, c, d, e, f, g, h, i) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      Ea[a & 7](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0, h | 0, i | 0);
    }
    function sh(a, b, c, d, e) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      return Fa[a & 1](b | 0, c | 0, d | 0, e | 0) | 0;
    }
    function th(a, b, c, d, e, f, g) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      Ga[a & 3](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0);
    }
    function uh(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      return Ha[a & 1](b | 0, c | 0) | 0;
    }
    function vh(a, b, c, d, e, f) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      return Ia[a & 1](b | 0, c | 0, d | 0, e | 0, f | 0) | 0;
    }
    function wh(a, b, c, d, e, f, g, h) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      Ja[a & 7](b | 0, c | 0, d | 0, e | 0, f | 0, g | 0, h | 0);
    }
    function xh(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      V(0);
      return 0;
    }
    function yh(a, b, c, d, e, f, g, h, i, j, k) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      V(1);
    }
    function zh(a, b, c, d, e, f, g, h, i, j) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      V(2);
    }
    function Ah(a, b, c, d, e) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      V(3);
    }
    function Bh(a) {
      a = a | 0;
      V(4);
    }
    function Ch(a, b) {
      a = a | 0;
      b = b | 0;
      V(5);
    }
    function Dh(a, b, c, d, e, f) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      V(6);
      return 0;
    }
    function Eh(a, b, c, d, e, f, g, h, i) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      V(7);
    }
    function Fh(a, b, c, d, e, f, g, h, i, j, k, l) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      i = i | 0;
      j = j | 0;
      k = k | 0;
      l = l | 0;
      V(8);
    }
    function Gh(a) {
      a = a | 0;
      V(9);
      return 0;
    }
    function Hh(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      V(10);
    }
    function Ih(a, b, c, d, e, f, g, h) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      V(11);
    }
    function Jh(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      V(12);
      return 0;
    }
    function Kh(a, b, c, d, e, f) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      V(13);
    }
    function Lh(a, b) {
      a = a | 0;
      b = b | 0;
      V(14);
      return 0;
    }
    function Mh(a, b, c, d, e) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      V(15);
      return 0;
    }
    function Nh(a, b, c, d, e, f, g) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      V(16);
    }

    // EMSCRIPTEN_END_FUNCS
    var ta = [xh, Ce];
    var ua = [yh, Gd, Hd, Id, Jd, Nd, Od, Pd];
    var va = [zh, af];
    var wa = [Ah, Vd, Wd, Ah];
    var xa = [Bh, hc, td, yd, zd, Ad, Bd, Bh];
    var ya = [Ch, rd, ud, vd, wd, xd, ne, rf, Gf, Ch, Ch, Ch, Ch, Ch, Ch, Ch];
    var za = [Dh, Ae];
    var Aa = [Eh, Qd];
    var Ba = [Fh, Rd, Sd, Fh];
    var Ca = [Gh, ec, gc, tf, sf, Gh, Gh, Gh];
    var Da = [Hh, nd, od, pd, qd, sd, Hh, Hh];
    var Ea = [Ih, Cd, Dd, Ed, Fd, Kd, Ld, Md];
    var Fa = [Jh, fc];
    var Ga = [Kh, md, Td, Ud];
    var Ha = [Lh, rc];
    var Ia = [Mh, Be];
    var Ja = [Nh, eg, fg, gg, cg, Nh, Nh, Nh];
    return {
      ___muldsi3: dh,
      _sbrk: _g,
      _i64Subtract: Zg,
      _free: Og,
      _bpg_decoder_decode: xg,
      _bpg_decoder_start: Vf,
      _i64Add: $g,
      _bpg_decoder_open: wg,
      _bitshift64Ashr: Yg,
      _memset: ah,
      _bpg_decoder_get_info: Uf,
      _malloc: Ig,
      _emscripten_get_global_libc: Rg,
      _memcpy: fh,
      _bpg_decoder_get_line: ig,
      _bpg_decoder_close: Gg,
      _bpg_decoder_get_frame_duration: hg,
      ___muldi3: eh,
      _llvm_bswap_i32: ch,
      _bitshift64Shl: bh,
      runPostSets: Xg,
      stackAlloc: Ka,
      stackSave: La,
      stackRestore: Ma,
      establishStackSpace: Na,
      setTempRet0: Pa,
      getTempRet0: Qa,
      setThrew: Oa,
      stackAlloc: Ka,
      stackSave: La,
      stackRestore: Ma,
      establishStackSpace: Na,
      setThrew: Oa,
      setTempRet0: Pa,
      getTempRet0: Qa,
      dynCall_iiii: gh,
      dynCall_viiiiiiiiiii: hh,
      dynCall_viiiiiiiiii: ih,
      dynCall_viiiii: jh,
      dynCall_vi: kh,
      dynCall_vii: lh,
      dynCall_iiiiiii: mh,
      dynCall_viiiiiiiii: nh,
      dynCall_viiiiiiiiiiii: oh,
      dynCall_ii: ph,
      dynCall_viii: qh,
      dynCall_viiiiiiii: rh,
      dynCall_iiiii: sh,
      dynCall_viiiiii: th,
      dynCall_iii: uh,
      dynCall_iiiiii: vh,
      dynCall_viiiiiii: wh,
    };
  })(
    // EMSCRIPTEN_END_ASM
    Module.asmGlobalArg,
    Module.asmLibraryArg,
    buffer
  );
  var _bpg_decoder_decode = (Module["_bpg_decoder_decode"] =
    asm["_bpg_decoder_decode"]);
  var _bpg_decoder_start = (Module["_bpg_decoder_start"] =
    asm["_bpg_decoder_start"]);
  var stackSave = (Module["stackSave"] = asm["stackSave"]);
  var getTempRet0 = (Module["getTempRet0"] = asm["getTempRet0"]);
  var setThrew = (Module["setThrew"] = asm["setThrew"]);
  var _bpg_decoder_get_line = (Module["_bpg_decoder_get_line"] =
    asm["_bpg_decoder_get_line"]);
  var _bitshift64Shl = (Module["_bitshift64Shl"] = asm["_bitshift64Shl"]);
  var _bitshift64Ashr = (Module["_bitshift64Ashr"] = asm["_bitshift64Ashr"]);
  var _memset = (Module["_memset"] = asm["_memset"]);
  var _bpg_decoder_get_info = (Module["_bpg_decoder_get_info"] =
    asm["_bpg_decoder_get_info"]);
  var _sbrk = (Module["_sbrk"] = asm["_sbrk"]);
  var _memcpy = (Module["_memcpy"] = asm["_memcpy"]);
  var stackAlloc = (Module["stackAlloc"] = asm["stackAlloc"]);
  var ___muldi3 = (Module["___muldi3"] = asm["___muldi3"]);
  var _i64Subtract = (Module["_i64Subtract"] = asm["_i64Subtract"]);
  var setTempRet0 = (Module["setTempRet0"] = asm["setTempRet0"]);
  var _i64Add = (Module["_i64Add"] = asm["_i64Add"]);
  var _emscripten_get_global_libc = (Module["_emscripten_get_global_libc"] =
    asm["_emscripten_get_global_libc"]);
  var _llvm_bswap_i32 = (Module["_llvm_bswap_i32"] = asm["_llvm_bswap_i32"]);
  var ___muldsi3 = (Module["___muldsi3"] = asm["___muldsi3"]);
  var _free = (Module["_free"] = asm["_free"]);
  var runPostSets = (Module["runPostSets"] = asm["runPostSets"]);
  var establishStackSpace = (Module["establishStackSpace"] =
    asm["establishStackSpace"]);
  var _bpg_decoder_open = (Module["_bpg_decoder_open"] =
    asm["_bpg_decoder_open"]);
  var stackRestore = (Module["stackRestore"] = asm["stackRestore"]);
  var _bpg_decoder_close = (Module["_bpg_decoder_close"] =
    asm["_bpg_decoder_close"]);
  var _malloc = (Module["_malloc"] = asm["_malloc"]);
  var _bpg_decoder_get_frame_duration = (Module[
    "_bpg_decoder_get_frame_duration"
  ] = asm["_bpg_decoder_get_frame_duration"]);
  var dynCall_iiii = (Module["dynCall_iiii"] = asm["dynCall_iiii"]);
  var dynCall_viiiiiiiiiii = (Module["dynCall_viiiiiiiiiii"] =
    asm["dynCall_viiiiiiiiiii"]);
  var dynCall_viiiiiiiiii = (Module["dynCall_viiiiiiiiii"] =
    asm["dynCall_viiiiiiiiii"]);
  var dynCall_viiiii = (Module["dynCall_viiiii"] = asm["dynCall_viiiii"]);
  var dynCall_vi = (Module["dynCall_vi"] = asm["dynCall_vi"]);
  var dynCall_vii = (Module["dynCall_vii"] = asm["dynCall_vii"]);
  var dynCall_iiiiiii = (Module["dynCall_iiiiiii"] = asm["dynCall_iiiiiii"]);
  var dynCall_viiiiiiiii = (Module["dynCall_viiiiiiiii"] =
    asm["dynCall_viiiiiiiii"]);
  var dynCall_viiiiiiiiiiii = (Module["dynCall_viiiiiiiiiiii"] =
    asm["dynCall_viiiiiiiiiiii"]);
  var dynCall_ii = (Module["dynCall_ii"] = asm["dynCall_ii"]);
  var dynCall_viii = (Module["dynCall_viii"] = asm["dynCall_viii"]);
  var dynCall_viiiiiiii = (Module["dynCall_viiiiiiii"] =
    asm["dynCall_viiiiiiii"]);
  var dynCall_iiiii = (Module["dynCall_iiiii"] = asm["dynCall_iiiii"]);
  var dynCall_viiiiii = (Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"]);
  var dynCall_iii = (Module["dynCall_iii"] = asm["dynCall_iii"]);
  var dynCall_iiiiii = (Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"]);
  var dynCall_viiiiiii = (Module["dynCall_viiiiiii"] = asm["dynCall_viiiiiii"]);
  Runtime.stackAlloc = Module["stackAlloc"];
  Runtime.stackSave = Module["stackSave"];
  Runtime.stackRestore = Module["stackRestore"];
  Runtime.establishStackSpace = Module["establishStackSpace"];
  Runtime.setTempRet0 = Module["setTempRet0"];
  Runtime.getTempRet0 = Module["getTempRet0"];
  Module["asm"] = asm;
  function ExitStatus(status) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + status + ")";
    this.status = status;
  }
  ExitStatus.prototype = new Error();
  ExitStatus.prototype.constructor = ExitStatus;
  var initialStackTop;
  var preloadStartTime = null;
  var calledMain = false;
  dependenciesFulfilled = function runCaller() {
    if (!Module["calledRun"]) run();
    if (!Module["calledRun"]) dependenciesFulfilled = runCaller;
  };
  Module["callMain"] = Module.callMain = function callMain(args) {
    args = args || [];
    ensureInitRuntime();
    var argc = args.length + 1;
    function pad() {
      for (var i = 0; i < 4 - 1; i++) {
        argv.push(0);
      }
    }
    var argv = [
      allocate(intArrayFromString(Module["thisProgram"]), "i8", ALLOC_NORMAL),
    ];
    pad();
    for (var i = 0; i < argc - 1; i = i + 1) {
      argv.push(allocate(intArrayFromString(args[i]), "i8", ALLOC_NORMAL));
      pad();
    }
    argv.push(0);
    argv = allocate(argv, "i32", ALLOC_NORMAL);
    try {
      var ret = Module["_main"](argc, argv, 0);
      exit(ret, true);
    } catch (e) {
      if (e instanceof ExitStatus) {
        return;
      } else if (e == "SimulateInfiniteLoop") {
        Module["noExitRuntime"] = true;
        return;
      } else {
        var toLog = e;
        if (e && typeof e === "object" && e.stack) {
          toLog = [e, e.stack];
        }
        Module.printErr("exception thrown: " + toLog);
        Module["quit"](1, e);
      }
    } finally {
      calledMain = true;
    }
  };
  function run(args) {
    args = args || Module["arguments"];
    if (preloadStartTime === null) preloadStartTime = Date.now();
    if (runDependencies > 0) {
      return;
    }
    preRun();
    if (runDependencies > 0) return;
    if (Module["calledRun"]) return;
    function doRun() {
      if (Module["calledRun"]) return;
      Module["calledRun"] = true;
      if (ABORT) return;
      ensureInitRuntime();
      preMain();
      if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
      if (Module["_main"] && shouldRunNow) Module["callMain"](args);
      postRun();
    }
    if (Module["setStatus"]) {
      Module["setStatus"]("Running...");
      setTimeout(function () {
        setTimeout(function () {
          Module["setStatus"]("");
        }, 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
  }
  Module["run"] = Module.run = run;
  function exit(status, implicit) {
    if (implicit && Module["noExitRuntime"]) {
      return;
    }
    if (Module["noExitRuntime"]) {
    } else {
      ABORT = true;
      EXITSTATUS = status;
      STACKTOP = initialStackTop;
      exitRuntime();
      if (Module["onExit"]) Module["onExit"](status);
    }
    if (ENVIRONMENT_IS_NODE) {
      process["exit"](status);
    }
    Module["quit"](status, new ExitStatus(status));
  }
  Module["exit"] = Module.exit = exit;
  var abortDecorators = [];
  function abort(what) {
    if (what !== undefined) {
      Module.print(what);
      Module.printErr(what);
      what = JSON.stringify(what);
    } else {
      what = "";
    }
    ABORT = true;
    EXITSTATUS = 1;
    var extra =
      "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
    var output = "abort(" + what + ") at " + stackTrace() + extra;
    if (abortDecorators) {
      abortDecorators.forEach(function (decorator) {
        output = decorator(output, what);
      });
    }
    throw output;
  }
  Module["abort"] = Module.abort = abort;
  if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function")
      Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
      Module["preInit"].pop()();
    }
  }
  var shouldRunNow = true;
  if (Module["noInitialRun"]) {
    shouldRunNow = false;
  }
  run();
  window["BPGDecoder"] = function (ctx) {
    this.ctx = ctx;
    this["imageData"] = null;
    this["onload"] = null;
    this["frames"] = null;
    this["loop_count"] = 0;
  };
  window["BPGDecoder"].prototype = {
    malloc: Module["cwrap"]("malloc", "number", ["number"]),
    free: Module["cwrap"]("free", "void", ["number"]),
    bpg_decoder_open: Module["cwrap"]("bpg_decoder_open", "number", []),
    bpg_decoder_decode: Module["cwrap"]("bpg_decoder_decode", "number", [
      "number",
      "array",
      "number",
    ]),
    bpg_decoder_get_info: Module["cwrap"]("bpg_decoder_get_info", "number", [
      "number",
      "number",
    ]),
    bpg_decoder_start: Module["cwrap"]("bpg_decoder_start", "number", [
      "number",
      "number",
    ]),
    bpg_decoder_get_frame_duration: Module["cwrap"](
      "bpg_decoder_get_frame_duration",
      "void",
      ["number", "number", "number"]
    ),
    bpg_decoder_get_line: Module["cwrap"]("bpg_decoder_get_line", "number", [
      "number",
      "number",
    ]),
    bpg_decoder_close: Module["cwrap"]("bpg_decoder_close", "void", ["number"]),
    load: function (url) {
      var request = new XMLHttpRequest();
      var this1 = this;
      request.open("get", url, true);
      request.responseType = "arraybuffer";
      request.onload = function (event) {
        this1._onload(request, event);
      };
      request.send();
    },
    _onload: function (request, event) {
      var data = request.response;
      var array = new Uint8Array(data);
      var img, w, h, img_info_buf, cimg, p0, rgba_line, w4, frame_count;
      var heap8, heap16, heap32, dst, i, y, duration, frames, loop_count;
      img = this.bpg_decoder_open();
      if (this.bpg_decoder_decode(img, array, array.length) < 0) {
        console.log("could not decode image");
        return;
      }
      img_info_buf = this.malloc(5 * 4);
      this.bpg_decoder_get_info(img, img_info_buf);
      heap8 = Module["HEAPU8"];
      heap16 = Module["HEAPU16"];
      heap32 = Module["HEAPU32"];
      w = heap32[img_info_buf >> 2];
      h = heap32[(img_info_buf + 4) >> 2];
      loop_count = heap16[(img_info_buf + 16) >> 1];
      w4 = w * 4;
      rgba_line = this.malloc(w4);
      frame_count = 0;
      frames = [];
      for (;;) {
        if (this.bpg_decoder_start(img, 1) < 0) break;
        this.bpg_decoder_get_frame_duration(
          img,
          img_info_buf,
          img_info_buf + 4
        );
        duration =
          (heap32[img_info_buf >> 2] * 1e3) / heap32[(img_info_buf + 4) >> 2];
        cimg = this.ctx.createImageData(w, h);
        dst = cimg.data;
        p0 = 0;
        for (y = 0; y < h; y++) {
          this.bpg_decoder_get_line(img, rgba_line);
          for (i = 0; i < w4; i = (i + 1) | 0) {
            dst[p0] = heap8[(rgba_line + i) | 0] | 0;
            p0 = (p0 + 1) | 0;
          }
        }
        frames[frame_count++] = { img: cimg, duration: duration };
      }
      this.free(rgba_line);
      this.free(img_info_buf);
      this.bpg_decoder_close(img);
      this["loop_count"] = loop_count;
      this["frames"] = frames;
      this["imageData"] = frames[0]["img"];
      if (this["onload"]) this["onload"]();
    },
  };
  window.onload = function () {
    var i, n, el, tab, tab1, url, dec, canvas, ctx, dw, dh;
    tab = document.images;
    n = tab.length;
    tab1 = [];
    for (i = 0; i < n; i++) {
      el = tab[i];
      url = el.src;
      if (url.substr(-4, 4).toLowerCase() == ".bpg") {
        tab1[tab1.length] = el;
      }
    }
    n = tab1.length;
    for (i = 0; i < n; i++) {
      el = tab1[i];
      url = el.src;
      canvas = document.createElement("canvas");
      if (el.id) canvas.id = el.id;
      if (el.className) canvas.className = el.className;
      dw = el.getAttribute("width") | 0;
      if (dw) {
        canvas.style.width = dw + "px";
      }
      dh = el.getAttribute("height") | 0;
      if (dh) {
        canvas.style.height = dh + "px";
      }
      el.parentNode.replaceChild(canvas, el);
      ctx = canvas.getContext("2d");
      dec = new BPGDecoder(ctx);
      dec.onload = function (canvas, ctx) {
        var dec = this;
        var frames = this["frames"];
        var imageData = frames[0]["img"];
        function next_frame() {
          var frame_index = dec.frame_index;
          if (++frame_index >= frames.length) {
            if (
              dec["loop_count"] == 0 ||
              dec.loop_counter < dec["loop_count"]
            ) {
              frame_index = 0;
              dec.loop_counter++;
            } else {
              frame_index = -1;
            }
          }
          if (frame_index >= 0) {
            dec.frame_index = frame_index;
            ctx.putImageData(frames[frame_index]["img"], 0, 0);
            setTimeout(next_frame, frames[frame_index]["duration"]);
          }
        }
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
        if (frames.length > 1) {
          dec.frame_index = 0;
          dec.loop_counter = 0;
          setTimeout(next_frame, frames[0]["duration"]);
        }
      }.bind(dec, canvas, ctx);
      dec.load(url);
    }
  };
})();
