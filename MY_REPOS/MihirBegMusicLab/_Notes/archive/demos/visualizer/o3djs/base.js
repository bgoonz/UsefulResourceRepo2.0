/*
 * Copyright 2009, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var a,
  o3djs = o3djs || {},
  goog = goog || {};
goog.typedef = true;
o3djs.global = this;
o3djs.BROWSER_ONLY = true;
o3djs.provided_ = [];
o3djs.provide = function (b) {
  if (o3djs.getObjectByName(b) && !o3djs.implicitNamespaces_[b])
    throw 'Namespace "' + b + '" already declared.';
  for (var c = b; (c = c.substring(0, c.lastIndexOf("."))); )
    o3djs.implicitNamespaces_[c] = true;
  o3djs.exportPath_(b);
  o3djs.provided_.push(b);
};
o3djs.implicitNamespaces_ = {};
o3djs.exportPath_ = function (b, c, d) {
  b = b.split(".");
  d = d || o3djs.global;
  var e;
  !(b[0] in d) && d.execScript && d.execScript("var " + b[0]);
  for (; b.length && (e = b.shift()); )
    if (!b.length && o3djs.isDef(c)) d[e] = c;
    else d = d[e] ? d[e] : (d[e] = {});
};
o3djs.getObjectByName = function (b, c) {
  b = b.split(".");
  c = c || o3djs.global;
  for (var d = 0; d < b.length; ++d) {
    var e = b[d];
    if (c[e]) c = c[e];
    else return null;
  }
  return c;
};
o3djs.require = function (b) {
  document.getElementsByTagName("script").length;
  if (!o3djs.getObjectByName(b)) {
    var c = o3djs.getPathFromRule_(b);
    if (c) {
      o3djs.included_[c] = true;
      o3djs.writeScripts_();
    } else throw new Error("o3djs.require could not find: " + b);
  }
};
o3djs.basePath = "";
o3djs.included_ = {};
o3djs.dependencies_ = { visited: {}, written: {} };
o3djs.findBasePath_ = function () {
  var b = o3djs.global.document;
  if (typeof b != "undefined")
    if (o3djs.global.BASE_PATH) o3djs.basePath = o3djs.global.BASE_PATH;
    else {
      o3djs.global.BASE_PATH = null;
      b = b.getElementsByTagName("script");
      for (var c, d = 0; (c = b[d]); d++) {
        c = c.src;
        var e = c.length;
        if (c.substr(e - 13) == "o3djs/base.js") {
          o3djs.basePath = c.substr(0, e - 13);
          return;
        }
      }
    }
};
o3djs.writeScriptTag_ = function (b) {
  var c = o3djs.global.document;
  if (typeof c != "undefined" && !o3djs.dependencies_.written[b]) {
    o3djs.dependencies_.written[b] = true;
    c.write('<script type="text/javascript" src="' + b + '"></script>');
  }
};
o3djs.writeScripts_ = function () {
  var b = [],
    c = {},
    d = o3djs.dependencies_;
  function e(g) {
    if (!(g in d.written))
      if (g in d.visited) {
        if (!(g in c)) {
          c[g] = true;
          b.push(g);
        }
      } else {
        d.visited[g] = true;
        if (!(g in c)) {
          c[g] = true;
          b.push(g);
        }
      }
  }
  for (var f in o3djs.included_) d.written[f] || e(f);
  for (f = 0; f < b.length; f++)
    if (b[f]) o3djs.writeScriptTag_(o3djs.basePath + b[f]);
    else throw Error("Undefined script input");
};
o3djs.getPathFromRule_ = function (b) {
  b = b.split(".");
  return b.join("/") + ".js";
};
o3djs.findBasePath_();
o3djs.isDef = function (b) {
  return typeof b != "undefined";
};
o3djs.exportSymbol = function (b, c, d) {
  o3djs.exportPath_(b, c, d);
};
o3djs.v8Initializer_ = "";
o3djs.v8InitializerArgs_ = [];
o3djs.valueToString_ = function (b) {
  switch (typeof b) {
    case "undefined":
      return "undefined";
    case "string":
      var c = escape(b);
      return c === b ? '"' + b + '"' : 'unescape("' + c + '")';
    case "object":
      if (b === null) return "null";
      else if (b instanceof RegExp) {
        c = "new RegExp(" + o3djs.valueToString_(b.source) + ', "';
        if (b.global) c += "g";
        if (b.ignoreCase) c += "i";
        if (b.multiline) c += "m";
        c += '")';
        return c;
      } else if (o3djs.base.isArray(b)) {
        var d = b;
        c = "[";
        b = "";
        for (var e = 0; e < d.length; ++e) {
          c += b + o3djs.valueToString_(d[e]);
          b = ",";
        }
        c += "]\n";
        return c;
      } else {
        e = b;
        c = "{\n";
        b = "";
        for (d in e) {
          c += b + '"' + d + '": ' + o3djs.valueToString_(e[d]);
          b = ",";
        }
        c += "}\n";
        return c;
      }
    default:
      return b.toString();
  }
};
o3djs.namespaceInitializer_ = function (b, c, d) {
  var e = c + " = {};\n";
  for (var f in b) {
    var g = c + "." + f,
      h = b[f];
    if (
      typeof h === "object" &&
      h !== null &&
      !o3djs.base.isArray(h) &&
      !(h instanceof RegExp)
    )
      e += o3djs.namespaceInitializer_(h, g);
    else {
      var i = o3djs.valueToString_(h);
      if (typeof h == "function" && i.indexOf("o3djs.BROWSER_ONLY") != -1) {
        i = "args_[" + d.length + "]";
        d.push(h);
      }
      e += g + " = " + i + ";\n";
      if (typeof h === "function" && h.prototype)
        e += o3djs.namespaceInitializer_(h.prototype, g + ".prototype");
    }
  }
  return e;
};
o3djs.provide("o3djs.base");
o3djs.base = o3djs.base || {};
o3djs.base.o3d = null;
o3djs.base.snapshotProvidedNamespaces = function () {
  o3djs.v8Initializer_ = "function(args_) {\n";
  o3djs.v8InitializerArgs_ = [];
  for (var b = 0; b < o3djs.provided_.length; ++b) {
    var c = o3djs.getObjectByName(o3djs.provided_[b]);
    o3djs.v8Initializer_ += o3djs.namespaceInitializer_(
      c,
      o3djs.provided_[b],
      o3djs.v8InitializerArgs_
    );
  }
  o3djs.v8Initializer_ += "}\n";
};
o3djs.base.initV8 = function (b) {
  var c = function (d, e) {
    var f = o3djs;
    o3djs = {};
    o3djs.browser = f;
    o3djs.global = (function () {
      return this;
    })();
    o3djs.require = function () {};
    o3djs.provide = function () {};
    eval("(" + d + ")")(e);
    o3djs.base.o3d = plugin.o3d;
  };
  b.eval(c.toString())(o3djs.v8Initializer_, o3djs.v8InitializerArgs_);
};
o3djs.base.init = function (b) {
  function c(e) {
    var f = {},
      g = false;
    for (var h in e) {
      var i = e[h];
      if (typeof i == "object" || typeof i == "function") i = c(i);
      if (typeof i != "undefined") {
        f[h] = i;
        g = true;
      }
    }
    return g ? f : undefined;
  }
  try {
    o3djs.base.o3d = c(b.o3d);
  } catch (d) {
    o3djs.base.o3d = b.o3d;
  }
  o3djs.base.o3d = o3djs.base.o3d || b.o3d;
};
o3djs.base.isArray = function (b) {
  var c = b;
  return typeof b === "object" && b !== null && "length" in c && "splice" in c;
};
o3djs.base.ready = function () {
  return o3djs.base.o3d != null;
};
o3djs.base.maybeDeobfuscateFunctionName_ = function (b) {
  return b;
};
o3djs.base.inherit = function (b, c) {
  var d = function () {};
  d.prototype = c.prototype;
  b.prototype = new d();
};
o3djs.base.parseErrorStack = function (b) {
  var c = [],
    d;
  if (!b || !b.stack) return c;
  for (var e = b.stack.split("\n"), f = 0; f < e.length - 1; f++) {
    d = e[f];
    b = (b = d.match(/^([a-zA-Z0-9_$]*)/)[1])
      ? o3djs.base.maybeDeobfuscateFunctionName_(b)
      : "anonymous";
    (d = (d = d.match(/(.*:[0-9]+)$/)) && d[1]) || (d = "(unknown)");
    c[c.length] = b + " : " + d;
  }
  for (b = /^anonymous :/; c.length && b.exec(c[c.length - 1]); )
    c.length = c.length - 1;
  return c;
};
o3djs.base.getFunctionName = function (b) {
  if ((b = b.toString().match(/function(\s*)(\w*)/)) && b.length >= 2 && b[2])
    return o3djs.base.maybeDeobfuscateFunctionName_(b[2]);
  return "anonymous";
};
o3djs.base.formatErrorStack = function (b) {
  for (var c = "", d = 0; d < b.length; d++) c += "> " + b[d] + "\n";
  return c;
};
o3djs.base.getStackTrace = function (b) {
  var c = "";
  if (typeof arguments.caller != "undefined")
    for (var d = arguments.caller; d != null; d = d.caller) {
      c += "> " + o3djs.base.getFunctionName(d.callee) + "\n";
      if (d.caller == d) {
        c += "*";
        break;
      }
    }
  else
    try {
      eval("var var;");
    } catch (e) {
      d = o3djs.base.parseErrorStack(e);
      c += o3djs.base.formatErrorStack(d.slice(3 + b, d.length));
    }
  return c;
};
o3djs.base.setErrorHandler = function (b) {
  b.setErrorCallback(function (c) {
    b.clearErrorCallback();
    alert("ERROR: " + c + "\n" + o3djs.base.getStackTrace(1));
  });
};
o3djs.base.IsMSIE = function () {
  var b = navigator.userAgent.toLowerCase();
  return (b = /msie/.test(b) && !/opera/.test(b));
};
o3djs.base.IsChrome10 = function () {
  return navigator.userAgent.indexOf("Chrome/1.0") >= 0;
};
o3djs.provide("o3djs.arcball");
o3djs.arcball = o3djs.arcball || {};
o3djs.arcball.create = function (b, c) {
  return new o3djs.arcball.ArcBall(b, c);
};
o3djs.arcball.ArcBall = function (b, c) {
  this.startVector_ = [0, 0, 0];
  this.endVector_ = [0, 0, 0];
  this.areaWidth_ = b;
  this.areaHeight_ = c;
};
o3djs.arcball.ArcBall.prototype.setAreaSize = function (b, c) {
  this.areaWidth_ = b;
  this.areaHeight_ = c;
};
o3djs.arcball.ArcBall.prototype.mapToSphere = function (b) {
  b = o3djs.math.copyVector(b);
  b[0] = (b[0] / this.areaWidth_) * 2 - 1;
  b[1] = 1 - (b[1] / this.areaHeight_) * 2;
  var c = o3djs.math.lengthSquared(b);
  return c > 1 ? o3djs.math.normalize(b).concat(0) : b.concat(Math.sqrt(1 - c));
};
o3djs.arcball.ArcBall.prototype.click = function (b) {
  this.startVector_ = this.mapToSphere(b);
};
o3djs.arcball.ArcBall.prototype.drag = function (b) {
  this.endVector_ = this.mapToSphere(b);
  return o3djs.math
    .cross(this.startVector_, this.endVector_)
    .concat(o3djs.math.dot(this.startVector_, this.endVector_));
};
o3djs.provide("o3djs.camera");
o3djs.camera = o3djs.camera || {};
o3djs.camera.CameraInfo = function (b, c, d, e, f, g) {
  this.view = b;
  this.projection = o3djs.math.matrix4.identity();
  this.orthographic = false;
  this.zNear = c;
  this.zFar = d;
  this.fieldOfViewRadians = o3djs.math.degToRad(30);
  this.eye = e;
  this.target = f;
  this.up = g;
  this.magY = this.magX = undefined;
};
o3djs.camera.CameraInfo.prototype.setAsOrthographic = function (b, c) {
  this.orthographic = true;
  this.magX = b;
  this.magY = c;
};
o3djs.camera.CameraInfo.prototype.setAsPerspective = function (b) {
  this.orthographic = false;
  this.fieldOfViewRadians = b;
};
o3djs.camera.CameraInfo.prototype.computeProjection = function (b, c) {
  if (this.orthographic) {
    b = this.magX;
    c = this.magY;
    this.projection = o3djs.math.matrix4.orthographic(
      -b,
      b,
      -c,
      c,
      this.zNear,
      this.zFar
    );
  } else
    this.projection = o3djs.math.matrix4.perspective(
      this.fieldOfViewRadians,
      b / c,
      this.zNear,
      this.zFar
    );
  return this.projection;
};
o3djs.camera.findCameras = function (b) {
  return o3djs.util.getTransformsInTreeByTags(b, "camera");
};
o3djs.camera.getViewAndProjectionFromCamera = function (b, c, d) {
  var e = 30,
    f = 1,
    g = 5000,
    h = undefined,
    i = undefined,
    j = undefined,
    k,
    l = o3djs.math,
    n;
  k = b.getParam("collada.eyePosition");
  var m = b.getParam("collada.targetPosition"),
    o = b.getParam("collada.upVector");
  if (k != null && m != null && o != null) {
    h = k.value;
    i = m.value;
    j = o.value;
    k = l.matrix4.lookAt(h, i, j);
  } else k = l.inverse(b.getUpdatedWorldMatrix());
  if ((m = b.getParam("collada.projectionType"))) {
    f = b.getParam("collada.projectionNearZ").value;
    g = b.getParam("collada.projectionFarZ").value;
    if (m.value == "orthographic") {
      m = b.getParam("collada.projectionMagX").value;
      b = b.getParam("collada.projectionMagY").value;
      n = new o3djs.camera.CameraInfo(k, f, g);
      n.setAsOrthographic(m, b);
    } else if (m.value == "perspective")
      e = b.getParam("collada.perspectiveFovY").value;
  }
  if (!n) {
    n = new o3djs.camera.CameraInfo(k, f, g, h, i, j);
    n.setAsPerspective(l.degToRad(e));
  }
  n.computeProjection(c, d);
  return n;
};
o3djs.camera.getCameraFitToScene = function (b, c, d) {
  var e = o3djs.math,
    f = o3djs.util.getBoundingBoxOfTree(b);
  b = e.lerpVector(f.minExtent, f.maxExtent, 0.5);
  var g = e.subVector(f.maxExtent, f.minExtent),
    h = o3djs.math.distance(f.minExtent, f.maxExtent);
  g = e.addVector(b, [g[0] * 0.3, g[1] * 0.7, h * 1.5]);
  f = h / 1000;
  h = h * 10;
  var i = [0, 1, 0];
  b = new o3djs.camera.CameraInfo(e.matrix4.lookAt(g, b, i), f, h);
  b.setAsPerspective(e.degToRad(45));
  b.computeProjection(c, d);
  return b;
};
o3djs.camera.getViewAndProjectionFromCameras = function (b, c, d) {
  var e = o3djs.camera.findCameras(b);
  return e.length > 0
    ? o3djs.camera.getViewAndProjectionFromCamera(e[0], c, d)
    : o3djs.camera.getCameraFitToScene(b, c, d);
};
o3djs.camera.getCameraInfos = function (b, c, d) {
  b = o3djs.camera.findCameras(b);
  for (var e = [], f = 0; f < b.length; ++f)
    e.push(o3djs.camera.getViewAndProjectionFromCamera(b[f], c, d));
  return e;
};
o3djs.camera.fitContextToScene = function (b, c, d, e) {
  b = o3djs.camera.getCameraFitToScene(b, c, d);
  e.view = b.view;
  e.projection = b.projection;
};
o3djs.provide("o3djs.canvas");
o3djs.canvas = o3djs.canvas || {};
o3djs.canvas.create = function (b, c, d) {
  return new o3djs.canvas.CanvasInfo(b, c, d);
};
o3djs.canvas.FX_STRING =
  "float4x4 worldViewProjection : WORLDVIEWPROJECTION;\nsampler texSampler0;\nstruct VertexShaderInput {\n float4 position : POSITION;\n float2 texcoord : TEXCOORD0;\n};\nstruct PixelShaderInput {\n  float4 position : POSITION;\n  float2 texcoord : TEXCOORD0;\n};\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n  output.position = mul(input.position, worldViewProjection);\n  output.texcoord = input.texcoord;\n  return output;\n}\nfloat4 pixelShaderFunction(PixelShaderInput input): COLOR {\n  return tex2D(texSampler0, input.texcoord);\n}\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n";
o3djs.canvas.CanvasInfo = function (b, c, d) {
  this.pack = b;
  this.viewInfo = d;
  this.root = c;
  this.effect_ = this.pack.createObject("Effect");
  this.effect_.loadFromFXString(o3djs.canvas.FX_STRING);
  this.transparentMaterial_ = this.pack.createObject("Material");
  this.opaqueMaterial_ = this.pack.createObject("Material");
  this.transparentMaterial_.effect = this.effect_;
  this.opaqueMaterial_.effect = this.effect_;
  this.transparentMaterial_.drawList = d.zOrderedDrawList;
  this.opaqueMaterial_.drawList = d.performanceDrawList;
  this.transparentState_ = this.pack.createObject("State");
  this.transparentState_.getStateParam("AlphaBlendEnable").value = true;
  this.transparentState_.getStateParam("SourceBlendFunction").value =
    o3djs.base.o3d.State.BLENDFUNC_ONE;
  this.transparentState_.getStateParam("DestinationBlendFunction").value =
    o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_ALPHA;
  this.transparentMaterial_.state = this.transparentState_;
  this.transparentQuadShape = o3djs.primitives.createPlane(
    this.pack,
    this.transparentMaterial_,
    1,
    1,
    1,
    1,
    [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, -1, 0, 0],
      [0, 0, 0, 1],
    ]
  );
  this.opaqueQuadShape = o3djs.primitives.createPlane(
    this.pack,
    this.opaqueMaterial_,
    1,
    1,
    1,
    1,
    [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, -1, 0, 0],
      [0, 0, 0, 1],
    ]
  );
};
o3djs.canvas.CanvasQuad = function (b, c, d, e, f) {
  this.canvasInfo = b;
  f = f || b.root;
  this.transform = b.pack.createObject("Transform");
  this.transform.parent = f;
  this.scaleTransform = b.pack.createObject("Transform");
  this.scaleTransform.parent = this.transform;
  this.texture = b.pack.createTexture2D(
    c,
    d,
    o3djs.base.o3d.Texture.ARGB8,
    1,
    false
  );
  this.canvas = b.pack.createObject("Canvas");
  this.canvas.setSize(c, d);
  this.sampler = b.pack.createObject("Sampler");
  this.sampler.addressModeU = o3djs.base.o3d.Sampler.CLAMP;
  this.sampler.addressModeV = o3djs.base.o3d.Sampler.CLAMP;
  this.paramSampler_ = this.scaleTransform.createParam(
    "texSampler0",
    "ParamSampler"
  );
  this.paramSampler_.value = this.sampler;
  this.sampler.texture = this.texture;
  e
    ? this.scaleTransform.addShape(b.transparentQuadShape)
    : this.scaleTransform.addShape(b.opaqueQuadShape);
  this.scaleTransform.translate(c / 2, d / 2, 0);
  this.scaleTransform.scale(c, -d, 1);
};
o3djs.canvas.CanvasQuad.prototype.updateTexture = function () {
  var b = this.texture.width,
    c = this.texture.height;
  this.texture.drawImage(this.canvas, 0, c - 1, b, -c, 0, 0, 0, b, c);
};
o3djs.canvas.CanvasInfo.prototype.createXYQuad = function (
  b,
  c,
  d,
  e,
  f,
  g,
  h
) {
  e = new o3djs.canvas.CanvasQuad(this, e, f, g, h);
  e.transform.translate(b, c, d);
  return e;
};
o3djs.canvas.CanvasInfo.prototype.createQuad = function (b, c, d, e) {
  return new o3djs.canvas.CanvasQuad(this, b, c, d, e);
};
o3djs.provide("o3djs.debug");
var O3D_DEBUG_AXIS_INFO_ = [
  { offset: [1, 0, 0], color: [1, 0, 0, 1] },
  { offset: [0, 1, 0], color: [0, 1, 0, 1] },
  { offset: [0, 0, 1], color: [0, 0, 1, 1] },
];
o3djs.debug.isDebugTransform = function (b) {
  b = b.name;
  return (b = b.length >= 9 && b.substr(0, 9) == "o3dDebug_");
};
o3djs.debug.getDebugTransform_ = function (b, c) {
  if (b.name == c) return b;
  else {
    b = b.children;
    for (var d = 0; d < b.length; ++d) if (b[d].name == c) return b[d];
  }
  return null;
};
o3djs.debug.createColorShaders_ = function (b) {
  return (b =
    "uniform float4 " +
    b +
    ";\nuniform float4x4 worldViewProjection: WORLDVIEWPROJECTION;\nstruct VertexShaderInput {\n  float4 position : POSITION;\n};\nstruct PixelShaderInput {\n  float4 position : POSITION;\n};\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n  output.position = mul(input.position, worldViewProjection);\n  return output;\n}\nfloat4 pixelShaderFunction(PixelShaderInput input) : COLOR {\n  return " +
    b +
    ";\n}\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n");
};
o3djs.debug.createScaleShaders_ = function (b, c) {
  return (b =
    "uniform float4 " +
    b +
    ";\nuniform float3 " +
    c +
    ";\nuniform float4x4 worldViewProjection: WORLDVIEWPROJECTION;\nstruct VertexShaderInput {\n  float4 position : POSITION;\n};\nstruct PixelShaderInput {\n  float4 position : POSITION;\n};\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n  float4 position = float4(\n      input.position.x * " +
    c +
    ".x,\n      input.position.y * " +
    c +
    ".y,\n      input.position.z * " +
    c +
    ".z,\n      1);\n  output.position = mul(position, worldViewProjection);\n  return output;\n}\nfloat4 pixelShaderFunction(PixelShaderInput input) : COLOR {\n  return " +
    b +
    ";\n}\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n");
};
o3djs.debug = o3djs.debug || {};
o3djs.debug.createLineShape = function (b, c, d, e) {
  var f = b.createObject("Shape"),
    g = b.createObject("Primitive"),
    h = b.createObject("StreamBank");
  g.owner = f;
  g.streamBank = h;
  g.material = c;
  g.numberPrimitives = e.length / 2;
  g.primitiveType = o3djs.base.o3d.Primitive.LINELIST;
  g.numberVertices = d.length / 3;
  g.createDrawElement(b, null);
  c = b.createObject("VertexBuffer");
  var i = c.createField("FloatField", 3);
  c.set(d);
  h.setVertexStream(o3djs.base.o3d.Stream.POSITION, 0, i, 0);
  b = b.createObject("IndexBuffer");
  b.set(e);
  g.indexBuffer = b;
  return f;
};
o3djs.debug.VertexInfo = function (b, c) {
  this.vertices = b || [];
  this.indices = c || [];
};
o3djs.debug.createVertexInfo = function (b, c) {
  return new o3djs.debug.VertexInfo(b, c);
};
a = o3djs.debug.VertexInfo.prototype;
a.Offset = { X: 0, Y: 1, Z: 2 };
a.numVertices = function () {
  return this.vertices.length / 3;
};
a.vertexIndex = function (b) {
  return b * 3;
};
a.addVertex = function (b, c, d) {
  this.vertices.push(b, c, d);
};
a.addLine = function (b, c) {
  this.indices.push(b, c);
};
a.createShape = function (b, c) {
  return o3djs.debug.createLineShape(b, c, this.vertices, this.indices);
};
a.reorient = function (b) {
  for (var c = o3djs.math, d = this.numVertices(), e = 0; e < d; ++e) {
    var f = this.vertexIndex(e),
      g = [
        this.vertices[f + this.Offset.X],
        this.vertices[f + this.Offset.Y],
        this.vertices[f + this.Offset.Z],
        1,
      ];
    g = c.mulVectorMatrix(g, b);
    this.vertices[f + this.Offset.X] = g[0];
    this.vertices[f + this.Offset.Y] = g[1];
    this.vertices[f + this.Offset.Z] = g[2];
  }
};
o3djs.debug.createLineCubeVertices = function (b, c) {
  b = b / 2;
  b = [
    -b,
    -b,
    -b,
    +b,
    -b,
    -b,
    -b,
    +b,
    -b,
    +b,
    +b,
    -b,
    -b,
    -b,
    +b,
    +b,
    -b,
    +b,
    -b,
    +b,
    +b,
    +b,
    +b,
    +b,
  ];
  var d = [
    0, 1, 1, 3, 3, 2, 2, 0, 4, 5, 5, 7, 7, 6, 6, 4, 0, 4, 1, 5, 2, 6, 3, 7,
  ];
  b = o3djs.debug.createVertexInfo(b, d);
  c && b.reorient(c);
  return b;
};
o3djs.debug.createLineCube = function (b, c, d, e) {
  d = o3djs.debug.createLineCubeVertices(d, e);
  return d.createShape(b, c);
};
o3djs.debug.createLineSphereVertices = function (b, c, d, e) {
  if (c <= 0 || d <= 0)
    throw Error("subdivisionAxis and subdivisionHeight must be > 0");
  for (var f = o3djs.debug.createVertexInfo(), g = 0; g <= d; g++)
    for (var h = 0; h <= c; h++) {
      var i = h / c,
        j = g / d;
      i = 2 * Math.PI * i;
      var k = Math.PI * j;
      j = Math.sin(i);
      var l = Math.cos(i);
      i = Math.sin(k);
      var n = Math.cos(k);
      k = l * i;
      l = n;
      j = j * i;
      f.addVertex(b * k, b * l, b * j);
    }
  b = c + 1;
  for (h = 0; h < c; h++)
    for (g = 0; g < d; g++) {
      f.addLine((g + 0) * b + h, (g + 0) * b + h + 1);
      f.addLine((g + 0) * b + h, (g + 1) * b + h);
    }
  e && f.reorient(e);
  return f;
};
o3djs.debug.createLineSphere = function (b, c, d, e, f, g) {
  d = o3djs.debug.createLineSphereVertices(d, e, f, g);
  return d.createShape(b, c);
};
o3djs.debug.DebugLine = function (b) {
  this.debugLineGroup_ = b;
  var c = b.getPack();
  this.transform_ = c.createObject("Transform");
  this.transform_.name = "o3dDebug_LineShape";
  this.transform_.addShape(b.getLineShape());
  this.start_ = [0, 0, 0];
  this.end_ = [0, 0, 0];
  this.colorParam_ = this.transform_.createParam(
    "o3dDebug_Color",
    "ParamFloat4"
  );
  this.colorParam_.value = b.getColor();
};
a = o3djs.debug.DebugLine.prototype;
a.destroy = function () {
  this.debugLineGroup_.getPack().removeObject(this.transform_);
};
a.getId = function () {
  return this.transform_.clientId;
};
a.update_ = function () {
  var b = o3djs.math,
    c = b.subVector(this.end_, this.start_),
    d = b.normalize(c),
    e = b.dot(d, [0, 1, 0]),
    f;
  if (e > 0.99) {
    f = b.cross([1, 0, 0], d);
    e = b.cross(f, d);
  } else {
    e = b.cross([0, 1, 0], d);
    f = b.cross(e, d);
  }
  this.transform_.localMatrix = [
    f.concat(0),
    d.concat(0),
    e.concat(0),
    this.start_.concat(1),
  ];
  this.transform_.scale(1, b.length(c), 1);
};
a.setEndPoints = function (b, c) {
  this.start_ = b;
  this.end_ = c;
  this.update_();
};
a.setStart = function (b) {
  this.start_ = b;
  this.update_();
};
a.setEnd = function (b) {
  this.end_ = b;
  this.update_();
};
a.setColor = function (b) {
  this.colorParam_.value = b;
};
a.setVisible = function (b) {
  this.transform_.parent = b ? this.debugLineGroup_.getRoot() : null;
};
a.remove = function () {
  this.transform_.parent = null;
  this.debugLineGroup_.remove(this);
};
o3djs.debug.DebugLineGroup = function (b, c) {
  this.currentColor_ = [1, 1, 1, 1];
  this.lineTransforms_ = {};
  this.freeLineTransforms_ = {};
  this.debugHelper_ = b;
  this.root_ = c;
};
a = o3djs.debug.DebugLineGroup.prototype;
a.getRoot = function () {
  return this.root_;
};
a.getPack = function () {
  return this.debugHelper_.getPack();
};
a.getLineShape = function () {
  return this.debugHelper_.getLineShape();
};
a.getColor = function () {
  return this.currentColor_;
};
a.setColor = function (b) {
  this.currentColor_ = b;
};
a.getLine_ = function () {
  for (var b in this.freeLineTransforms_) {
    b = b;
    var c = this.freeLineTransforms_[b];
    delete this.freeLineTransforms_[b];
    return c;
  }
  return new o3djs.debug.DebugLine(this);
};
a.addLine = function (b, c, d) {
  var e = this.getLine_();
  e.setEndPoints(b || [0, 0, 0], c || [0, 0, 0]);
  e.setColor(d || this.currentColor_);
  e.setVisible(true);
  return (this.lineTransforms_[e.getId()] = e);
};
a.clear = function () {
  for (var b in this.lineTransforms_) {
    var c = b,
      d = this.lineTransforms_[c];
    d.setVisible(false);
    this.freeLineTransforms_[c] = d;
  }
  this.lineTransforms_ = {};
};
a.destroy = function () {
  this.clear();
  for (var b in this.freeLineTransforms_) {
    var c = b;
    this.freeLineTransforms_[c].destroy();
  }
  this.freeLineTransforms_ = {};
};
a.remove = function (b) {
  var c = b.getId();
  delete this.lineTransforms_[c];
  this.freeLineTransforms_[c] = b;
};
o3djs.debug.DebugHelper = function (b, c) {
  this.pack_ = b;
  this.viewInfo_ = c;
  this.axisPrimitives_ = [];
  this.axisShape_ = b.createObject("Shape");
  this.axisShape_.name = "o3dDebug_AxisShape";
  this.lineShape_ = b.createObject("Shape");
  this.lineShape_.name = "o3dDebug_LineShape";
  var d = b.createObject("Effect"),
    e = o3djs.debug.createScaleShaders_(
      "o3dDebug_Color",
      "o3dDebug_VectorScale"
    );
  d.loadFromFXString(e);
  e = b.createObject("Material");
  e.effect = d;
  e.drawList = c.performanceDrawList;
  d.createUniformParameters(e);
  e.getParam("o3dDebug_Color").value = [1, 1, 1, 1];
  e.getParam("o3dDebug_VectorScale").value = [1, 1, 1];
  for (d = 0; d < O3D_DEBUG_AXIS_INFO_.length; ++d) {
    var f = O3D_DEBUG_AXIS_INFO_[d],
      g = o3djs.primitives.createCube(b, e, 1, [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [f.offset[0] * 0.5, f.offset[1] * 0.5, f.offset[2] * 0.5, 1],
      ]),
      h = g.elements[0];
    h.owner = this.axisShape_;
    b.removeObject(g);
    h.createParam("o3dDebug_Color", "ParamFloat4").value = f.color;
    h.createParam("o3dDebug_VectorScale", "ParamFloat3");
    this.axisPrimitives_[d] = h;
  }
  this.axisMaterial_ = e;
  this.setAxisScale(10, 1);
  d = b.createObject("Effect");
  e = o3djs.debug.createColorShaders_("o3dDebug_Color");
  d.loadFromFXString(e);
  e = b.createObject("Material");
  e.effect = d;
  e.drawList = c.performanceDrawList;
  d.createUniformParameters(e);
  e.getParam("o3dDebug_Color").value = [1, 1, 1, 1];
  c = [0, 0, 0, 0, 1, 0];
  d = b.createObject("StreamBank");
  f = b.createObject("Primitive");
  g = b.createObject("Shape");
  h = b.createObject("VertexBuffer");
  var i = h.createField("FloatField", 3);
  h.set(c);
  f.owner = g;
  f.createDrawElement(b, null);
  f.streamBank = d;
  f.material = e;
  f.numberVertices = 2;
  f.numberPrimitives = 1;
  f.primitiveType = o3djs.base.o3d.Primitive.LINELIST;
  d.setVertexStream(o3djs.base.o3d.Stream.POSITION, 0, i, 0);
  this.lineShape_ = g;
  this.lineShape_.name = "o3dDebug_LineShape";
  this.lineMaterial_ = e;
  this.sphereShape_ = o3djs.debug.createLineSphere(
    b,
    this.axisMaterial_,
    0.5,
    8,
    8
  );
  this.sphereShape_.name = "o3dDebug_SphereShape";
  f = this.sphereShape_.elements[0];
  this.sphereScaleParam_ = f.createParam(
    "o3dDebug_VectorScale",
    "ParamFloat3"
  ).value = [1, 1, 1];
  this.cubeShape_ = o3djs.debug.createLineCube(b, this.axisMaterial_, 1);
  this.cubeShape_.name = "o3dDebug_CubeShape";
  f = this.cubeShape_.elements[0];
  this.cubeScaleParam_ = f.createParam(
    "o3dDebug_VectorScale",
    "ParamFloat3"
  ).value = [1, 1, 1];
};
a = o3djs.debug.DebugHelper.prototype;
a.getPack = function () {
  return this.pack_;
};
a.getLineShape = function () {
  return this.lineShape_;
};
a.setAxisScale = function (b, c) {
  for (var d = 0; d < O3D_DEBUG_AXIS_INFO_.length; ++d) {
    var e = O3D_DEBUG_AXIS_INFO_[d];
    this.axisPrimitives_[d].getParam("o3dDebug_VectorScale").value = [
      e.offset[0] ? b : c,
      e.offset[1] ? b : c,
      e.offset[2] ? b : c,
    ];
  }
};
a.createShape_ = function (b, c) {
  var d = this.getPack().createObject("Transform");
  d.name = c.name;
  d.addShape(c);
  d.parent = this.viewInfo_.treeRoot;
  d.translate(b);
  return d;
};
a.addShape_ = function (b, c) {
  var d = o3djs.debug.getDebugTransform_(b, c.name);
  if (!d) {
    d = this.getPack().createObject("Transform");
    d.name = c.name;
    d.addShape(c);
    d.parent = b;
  }
};
a.removeShape_ = function (b, c) {
  if ((b = o3djs.debug.getDebugTransform_(b, c.name))) {
    b.parent = null;
    this.getPack().removeObject(b);
  }
};
a.addShapes_ = function (b, c) {
  this.addShape_(b, c);
  b = b.children;
  for (var d = 0; d < b.length; ++d) {
    var e = b[d];
    o3djs.debug.isDebugTransform(e) || this.addShapes_(e, c);
  }
};
a.removeShapes_ = function (b, c) {
  this.removeShape_(b, c);
  b = b.children;
  for (var d = 0; d < b.length; ++d) {
    var e = b[d];
    o3djs.debug.isDebugTransform(e) || this.removeShapes_(e, c);
  }
};
a.addSetDebugTransformParam_ = function (b, c, d, e, f) {
  if ((b = o3djs.debug.getDebugTransform_(b, c))) {
    (c = b.getParam(d)) || (c = b.createParam(d, e));
    c.value = f;
  }
};
a.addAxis = function (b) {
  this.addShape_(b, this.axisShape_);
};
a.removeAxis = function (b) {
  this.removeShape_(b, this.axisShape_);
};
a.addAxes = function (b) {
  this.addShapes_(b, this.axisShape_);
};
a.removeAxes = function (b) {
  this.removeShapes_(b, this.axisShape_);
};
a.setAxisColor = function (b, c) {
  this.addSetDebugTransformParam_(
    b,
    "o3dDebug_AxisShape",
    "o3dDebug_Color",
    "ParamFloat4",
    c
  );
};
a.clearAxisColor = function (b) {
  if ((b = o3djs.debug.getDebugTransform_(b, "o3dDebug_AxisShape"))) {
    var c = b.getParam("o3dDebug_Color");
    c && b.removeParam(c);
  }
};
a.createSphere = function (b, c, d) {
  b = this.createShape_(b, this.sphereShape_);
  c && this.setSphereColor(b, c);
  d && this.setSphereScale(b, d);
  return b;
};
a.addSphere = function (b, c, d) {
  this.addShape_(b, this.sphereShape_);
  c && this.setSphereColor(b, c);
  d && this.setSphereScale(b, d);
};
a.removeSphere = function (b) {
  this.removeShape_(b, this.sphereShape_);
};
a.addSpheres = function (b) {
  this.addShapes_(b, this.sphereShape_);
};
a.removeSpheres = function (b) {
  this.removeShapes_(b, this.sphereShape_);
};
a.setSphereColor = function (b, c) {
  this.addSetDebugTransformParam_(
    b,
    "o3dDebug_SphereShape",
    "o3dDebug_Color",
    "ParamFloat4",
    c
  );
};
a.setSphereScale = function (b, c) {
  this.addSetDebugTransformParam_(
    b,
    "o3dDebug_SphereShape",
    "o3dDebug_VectorScale",
    "ParamFloat3",
    [c, c, c]
  );
};
a.createCube = function (b, c, d) {
  b = this.createShape_(b, this.cubeShape_);
  c && this.setCubeColor(b, c);
  d && this.setCubeScale(b, d);
  return b;
};
a.addCube = function (b, c, d) {
  this.addShape_(b, this.cubeShape_);
  c && this.setCubeColor(b, c);
  d && this.setCubeScale(b, d);
};
a.removeCube = function (b) {
  this.removeShape_(b, this.cubeShape_);
};
a.addCubes = function (b) {
  this.addShapes_(b, this.cubeShape_);
};
a.removeCubes = function (b) {
  this.removeShapes_(b, this.cubeShape_);
};
a.setCubeColor = function (b, c) {
  this.addSetDebugTransformParam_(
    b,
    "o3dDebug_CubeShape",
    "o3dDebug_Color",
    "ParamFloat4",
    c
  );
};
a.setCubeScale = function (b, c) {
  this.addSetDebugTransformParam_(
    b,
    "o3dDebug_CubeShape",
    "o3dDebug_VectorScale",
    "ParamFloat3",
    [c, c, c]
  );
};
a.createDebugLineGroup = function (b) {
  return new o3djs.debug.DebugLineGroup(this, b);
};
o3djs.debug.createDebugHelper = function (b, c) {
  return new o3djs.debug.DebugHelper(b, c);
};
o3djs.provide("o3djs.dump");
o3djs.dump = o3djs.dump || {};
o3djs.dump.dumpXYZ_ = function (b, c, d) {
  d = d || "";
  o3djs.dump.dump(d + b + " : " + c[0] + ", " + c[1] + ", " + c[2] + "\n");
};
o3djs.dump.dumpXYZW_ = function (b, c, d) {
  d = d || "";
  o3djs.dump.dump(
    d + b + " : " + c[0] + ", " + c[1] + ", " + c[2] + ", " + c[3] + "\n"
  );
};
o3djs.dump.getFunctionName_ = function (b) {
  if (b.name) return b.name;
  b = b.toString();
  if ((b = b.substring(b.indexOf("function") + 8, b.indexOf("(")))) return b;
  return "*anonymous*";
};
o3djs.dump.getSignature_ = function (b) {
  var c = o3djs.dump.getFunctionName_(b);
  c += "(";
  for (var d = 0; d < b.arguments.length; d++) {
    var e = b.arguments[d];
    if (e.length > 30) e = e.substring(0, 30) + "...";
    c += "'" + e + "'";
    if (d < b.arguments.length - 1) c += ", ";
  }
  c += ")";
  return c;
};
o3djs.dump.dump = function (b) {
  o3djs.BROWSER_ONLY = true;
  if (window.dump) window.dump(b);
  else window.console && window.console.log && window.console.log(b);
};
o3djs.dump.getMatrixAsString = function (b, c) {
  c = c || "";
  for (var d = c + "[", e = 0; 1; ++e) {
    var f = b[e];
    d += "[";
    for (var g = 0; 1; ++g) {
      d += f[g];
      if (g < f.length - 1) d += ", ";
      else {
        d += "]";
        break;
      }
    }
    if (e < b.length - 1) {
      d += "\n";
      d += c;
    } else break;
  }
  d += "]";
  return d;
};
o3djs.dump.dumpFloat3 = function (b, c, d) {
  d = d || "";
  o3djs.dump.dumpXYZ_(b, c, d);
};
o3djs.dump.dumpFloat4 = function (b, c, d) {
  d = d || "";
  o3djs.dump.dumpXYZW_(b, c, d);
};
o3djs.dump.dumpVector4 = function (b, c, d) {
  d = d || "";
  o3djs.dump.dumpXYZW_(b, c, d);
};
o3djs.dump.dumpMatrix = function (b, c, d) {
  d = d || "";
  o3djs.dump.dump(
    d + b + " :\n" + o3djs.dump.getMatrixAsString(c, d + "    ") + "\n"
  );
};
o3djs.dump.dumpBoundingBox = function (b, c, d) {
  d = d || "";
  o3djs.dump.dump(d + b + " :\n");
  o3djs.dump.dumpFloat3("min : ", c.minExtent, d + "    ");
  o3djs.dump.dumpFloat3("max : ", c.maxExtent, d + "    ");
};
o3djs.dump.getParamValueAsString = function (b, c) {
  c = c || "";
  var d = "*unknown*";
  if (b.isAClassName("o3d.ParamFloat")) d = b.value.toString();
  else if (b.isAClassName("o3d.ParamFloat2"))
    d = "[" + b.value[0] + ", " + b.value[1] + "]";
  else if (b.isAClassName("o3d.ParamFloat3"))
    d = "[" + b.value[0] + ", " + b.value[1] + ", " + b.value[2] + "]";
  else if (b.isAClassName("o3d.ParamFloat4"))
    d =
      "[" +
      b.value[0] +
      ", " +
      b.value[1] +
      ", " +
      b.value[2] +
      ", " +
      b.value[3] +
      "]";
  else if (b.isAClassName("o3d.ParamInteger")) d = b.value.toString();
  else if (b.isAClassName("o3d.ParamBoolean")) d = b.value.toString();
  else if (b.isAClassName("o3d.ParamMatrix4"))
    d = "\n" + o3djs.dump.getMatrixAsString(b.value, c + "    ");
  else if (b.isAClassName("o3d.ParamString")) d = b.value;
  else if (b.isAClassName("o3d.ParamTexture")) {
    d = b.value;
    d = 'texture : "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamSampler")) {
    d = b.value;
    d = 'sampler : "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamMaterial")) {
    d = b.value;
    d = 'material : "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamEffect")) {
    d = b.value;
    d = 'effect : "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamState")) {
    d = b.value;
    d = 'state : "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamTransform")) {
    d = b.value;
    d = 'transform : "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamDrawList")) {
    d = b.value;
    d = 'drawlist : "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamRenderSurface")) {
    d = b.value;
    d = 'renderSurface : "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamRenderDepthStencilSurface")) {
    d = b.value;
    d = 'renderDepthStencilSurface: "' + (d ? d.name : "NULL") + '"';
  } else if (b.isAClassName("o3d.ParamDrawContext")) {
    d = b.value;
    d = 'drawcontext : "' + (d ? d.name : "NULL") + '"';
  }
  return d;
};
o3djs.dump.dumpParam = function (b, c) {
  c = c || "";
  o3djs.dump.dump(
    c +
      b.className +
      ' : "' +
      b.name +
      '" : ' +
      o3djs.dump.getParamValueAsString(b, c) +
      "\n"
  );
};
o3djs.dump.dumpParams = function (b, c) {
  c = c || "";
  b = b.params;
  for (var d = 0; d < b.length; d++) o3djs.dump.dumpParam(b[d], c);
};
o3djs.dump.dumpParamObject = function (b, c) {
  c = c || "";
  o3djs.dump.dump(c + b.className + ' : "' + b.name + '"\n');
  o3djs.dump.dumpParams(b, c + "    ");
};
o3djs.dump.dumpStream = function (b, c) {
  c = c || "";
  o3djs.dump.dump(
    c +
      "semantic: " +
      b.semantic +
      ", index: " +
      b.semanticIndex +
      ", dataType: " +
      b.dataType +
      ", field: " +
      b.field.name +
      "\n"
  );
};
o3djs.dump.dumpElement = function (b, c) {
  c = c || "";
  o3djs.dump.dump(c + "------------ Element --------------\n");
  o3djs.dump.dump(c + 'Element: "' + b.name + '"\n');
  o3djs.dump.dump(c + "  --Params--\n");
  o3djs.dump.dumpParams(b, c + "  ");
  o3djs.dump.dump(c + "  --DrawElements--\n");
  for (var d = b.drawElements, e = 0; e < d.length; e++) {
    var f = d[e];
    o3djs.dump.dumpParamObject(f, c + "    ");
  }
  if (b.isAClassName("o3d.Primitive")) {
    o3djs.dump.dump(c + "  primitive type: " + b.primitiveType + "\n");
    o3djs.dump.dump(c + "  number vertices: " + b.numberVertices + "\n");
    o3djs.dump.dump(c + "  number primitives: " + b.numberPrimitives + "\n");
    if ((b = b.streamBank)) {
      b = b.vertexStreams;
      for (d = 0; d < b.length; d++) {
        e = b[d];
        o3djs.dump.dump(c + "  stream " + d + ": ");
        o3djs.dump.dumpStream(e);
      }
    }
  }
};
o3djs.dump.dumpShape = function (b, c) {
  c = c || "";
  o3djs.dump.dump(c + "------------ Shape --------------\n");
  o3djs.dump.dump(c + 'Shape: "' + b.name + '"\n');
  o3djs.dump.dump(c + "  --Params--\n");
  o3djs.dump.dumpParams(b, c + "  ");
  o3djs.dump.dump(c + "  --Elements--\n");
  b = b.elements;
  for (var d = 0; d < b.length; d++) {
    var e = b[d];
    o3djs.dump.dumpElement(e, c + "    ");
  }
};
o3djs.dump.dumpTexture = function (b, c) {
  c = c || "";
  var d = "",
    e = b.getParam("uri");
  if (e) d = e.value;
  o3djs.dump.dump(
    c +
      b.className +
      ' : "' +
      b.name +
      '" uri : "' +
      d +
      '" width: ' +
      b.width +
      " height: " +
      b.height +
      " alphaIsOne: " +
      b.alphaIsOne +
      "\n"
  );
};
o3djs.dump.dumpTransform = function (b, c) {
  c = c || "";
  o3djs.dump.dump(c + "----------- Transform -------------\n");
  o3djs.dump.dump(c + "Transform: " + b.name + '"\n');
  o3djs.dump.dump(c + "  --Local Matrix--\n");
  o3djs.dump.dump(
    o3djs.dump.getMatrixAsString(b.localMatrix, c + "    ") + "\n"
  );
  o3djs.dump.dump(c + "  --Params--\n");
  o3djs.dump.dumpParams(b, c + "  ");
  o3djs.dump.dump(c + "  --Shapes--\n");
  b = b.shapes;
  for (var d = 0; d < b.length; d++) {
    var e = b[d];
    o3djs.dump.dumpNamedObjectName(e, c + "  ");
  }
};
o3djs.dump.dumpTransformTree = function (b, c) {
  c = c || "";
  o3djs.dump.dumpTransform(b, c);
  c = c + "    ";
  b = b.children;
  for (var d = 0; d < b.length; d++) o3djs.dump.dumpTransformTree(b[d], c);
};
o3djs.dump.dumpTransformList = function (b) {
  o3djs.dump.dump(b.length + " transforms in list!!!\n");
  for (var c = 0; c < b.length; c++) o3djs.dump.dumpTransform(b[c]);
};
o3djs.dump.dumpNamedObjectName = function (b, c) {
  c = c || "";
  o3djs.dump.dump(c + b.className + ' : "' + b.name + '"\n');
};
o3djs.dump.dumpRenderNode = function (b, c) {
  c = c || "";
  o3djs.dump.dump(c + "----------- Render Node -----------\n");
  o3djs.dump.dumpNamedObjectName(b, c);
  o3djs.dump.dump(c + "  --Params--\n");
  o3djs.dump.dumpParams(b, c + "  ");
};
o3djs.dump.dumpRenderNodeTree = function (b, c) {
  c = c || "";
  o3djs.dump.dumpRenderNode(b, c);
  c = c + "    ";
  b = b.children.sort(function (e, f) {
    return e.priority - f.priority;
  });
  for (var d = 0; d < b.length; d++) o3djs.dump.dumpRenderNodeTree(b[d], c);
};
o3djs.dump.dumpStackTrace = function () {
  o3djs.dump.dump("Stack trace:\n");
  for (var b = arguments.callee.caller; b; ) {
    o3djs.dump.dump(o3djs.dump.getSignature_(b) + "\n");
    b = b.caller;
  }
  o3djs.dump.dump("\n\n");
};
o3djs.provide("o3djs.effect");
o3djs.effect = o3djs.effect || {};
o3djs.effect.TWO_COLOR_CHECKER_EFFECT_NAME =
  "o3djs.effect.twoColorCheckerEffect";
o3djs.effect.TWO_COLOR_CHECKER_FXSTRING =
  "float4x4 worldViewProjection : WORLDVIEWPROJECTION;\nfloat4x4 worldInverseTranspose : WORLDINVERSETRANSPOSE;\nfloat4x4 world : WORLD;\nfloat4 color1;\nfloat4 color2;\nfloat checkSize;\nfloat3 lightWorldPos;\nfloat3 lightColor;\n\nstruct VertexShaderInput {\n  float4 position : POSITION;\n  float4 normal : NORMAL;\n  float2 texcoord : TEXCOORD0;\n};\n\nstruct PixelShaderInput {\n  float4 position : POSITION;\n  float2 texcoord : TEXCOORD0;\n  float3 normal : TEXCOORD1;\n  float3 worldPosition : TEXCOORD2;\n};\n\nfloat4 checker(float2 uv) {\n  float fmodResult = fmod(floor(checkSize * uv.x) + \n                          floor(checkSize * uv.y), 2.0);\n  return (fmodResult < 1) ? color1 : color2;\n}\n\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n\n  output.position = mul(input.position, worldViewProjection);\n  output.normal = mul(input.normal, worldInverseTranspose).xyz;\n  output.worldPosition = mul(input.position, world).xyz;\n  output.texcoord = input.texcoord;\n  return output;\n}\n\nfloat4 pixelShaderFunction(PixelShaderInput input): COLOR {\n  float3 surfaceToLight = \n      normalize(lightWorldPos - input.worldPosition);\n  float3 worldNormal = normalize(input.normal);\n  float4 check = checker(input.texcoord);\n  float4 directionalIntensity = \n      saturate(dot(worldNormal, surfaceToLight));\n  float4 outColor = directionalIntensity * check;\n  return float4(outColor.rgb, check.a);\n}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n";
o3djs.effect.COLLADA_LIGHTING_TYPE_PARAM_NAME = "collada.lightingType";
o3djs.effect.COLLADA_LIGHTING_TYPES = {
  phong: 1,
  lambert: 1,
  blinn: 1,
  constant: 1,
};
o3djs.effect.COLLADA_SAMPLER_PARAMETER_PREFIXES = [
  "emissive",
  "ambient",
  "diffuse",
  "specular",
  "bump",
];
o3djs.effect.isColladaLightingType = function (b) {
  return o3djs.effect.COLLADA_LIGHTING_TYPES[b.toLowerCase()] == 1;
};
o3djs.effect.getColladaLightingType = function (b) {
  if ((b = b.getParam(o3djs.effect.COLLADA_LIGHTING_TYPE_PARAM_NAME))) {
    b = b.value.toLowerCase();
    if (o3djs.effect.isColladaLightingType(b)) return b;
  }
  return "";
};
o3djs.effect.getNumTexCoordStreamsNeeded = function (b) {
  var c = o3djs.effect.getColladaLightingType(b);
  if (!o3djs.effect.isColladaLightingType(c))
    throw "not a collada standard material";
  c = o3djs.effect.COLLADA_SAMPLER_PARAMETER_PREFIXES;
  for (var d = 0, e = 0; e < c.length; ++e) {
    var f = c[e];
    (f = b.getParam(f + "Sampler")) && ++d;
  }
  return d;
};
o3djs.effect.loadEffect = function (b, c) {
  c = o3djs.io.loadTextFileSynchronous(c);
  b.loadFromFXString(c);
};
o3djs.effect.createEffectFromFile = function (b, c) {
  var d = b.getObjects(c, "o3d.Effect")[0];
  if (!d) {
    d = b.createObject("Effect");
    o3djs.effect.loadEffect(d, c);
    d.name = c;
  }
  return d;
};
o3djs.effect.buildStandardShaderString = function (b, c) {
  var d = b.getParam("bumpSampler"),
    e = function (p) {
      p = p.value;
      if (!p) return "2D";
      switch (p.className) {
        case "o3d.Texture1D":
          return "1D";
        case "o3d.Texture2D":
          return "2D";
        case "o3d.Texture3D":
          return "3D";
        case "o3d.TextureCUBE":
          return "CUBE";
        default:
          return "2D";
      }
    },
    f = function (p) {
      p = p.value;
      if (!p) return "2D";
      return (p = p.getParam("Texture")) ? e(p) : "2D";
    },
    g = function () {
      return "uniform float4x4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform float3 lightWorldPos;\nuniform float4 lightColor;\n";
    },
    h = function () {
      return "uniform float4x4 world : WORLD;\nuniform float4x4 viewInverse : VIEWINVERSE;\nuniform float4x4 worldInverseTranspose : WORLDINVERSETRANSPOSE;\n";
    },
    i = function (p, v, C, H) {
      if (H === undefined) H = true;
      if ((p = p.getParam(C + "Sampler"))) {
        H = f(p);
        v.push(C + H + "Texture");
        return "sampler" + H + " " + C + "Sampler;\n";
      } else if (H) {
        v.push(C + "Color");
        return "uniform float4 " + C + ";\n";
      } else return "";
    },
    j = function (p, v) {
      if ((p = p.getParam(v + "Sampler"))) {
        p = f(p);
        return (
          "  float4 " +
          v +
          " = tex" +
          p +
          "(" +
          v +
          "Sampler, input." +
          v +
          "UV);\n"
        );
      } else return "";
    },
    k = function () {
      return "  // #o3d VertexShaderEntryPoint vertexShaderFunction\n  // #o3d PixelShaderEntryPoint pixelShaderFunction\n  // #o3d MatrixLoadOrder RowMajor\n";
    },
    l = function (p, v) {
      v.push("constant");
      return (
        g() +
        i(p, v, "emissive") +
        E(p, false, false) +
        "OutVertex vertexShaderFunction(InVertex input) {\n  OutVertex output;\n" +
        x() +
        u(p) +
        "  return output;\n}\nfloat4 pixelShaderFunction(OutVertex input) : COLOR {\n" +
        j(p, "emissive") +
        "  return emissive;\n}\n\n" +
        k()
      );
    },
    n = function (p, v) {
      v.push("lambert");
      return (
        g() +
        h() +
        i(p, v, "emissive") +
        i(p, v, "ambient") +
        i(p, v, "diffuse") +
        i(p, v, "bump", false) +
        E(p, true, false) +
        "OutVertex vertexShaderFunction(InVertex input) {\n  OutVertex output;\n" +
        u(p) +
        x() +
        z() +
        A() +
        G() +
        "  return output;\n}\nfloat4 pixelShaderFunction(OutVertex input) : COLOR\n{\n" +
        j(p, "emissive") +
        j(p, "ambient") +
        j(p, "diffuse") +
        F() +
        "  float3 surfaceToLight = normalize(input.surfaceToLight);\n  float4 litR = lit(dot(normal, surfaceToLight), 0, 0);\n  return float4((emissive +\n      lightColor * (ambient * diffuse + diffuse * litR.y)).rgb,      diffuse.a);\n}\n\n" +
        k()
      );
    },
    m = function (p, v) {
      v.push("blinn");
      return (
        g() +
        h() +
        i(p, v, "emissive") +
        i(p, v, "ambient") +
        i(p, v, "diffuse") +
        i(p, v, "specular") +
        i(p, v, "bump", false) +
        "uniform float shininess;\nuniform float specularFactor;\n" +
        E(p, true, true) +
        "OutVertex vertexShaderFunction(InVertex input) {\n  OutVertex output;\n" +
        u(p) +
        x() +
        z() +
        A() +
        D() +
        G() +
        "  return output;\n}\nfloat4 pixelShaderFunction(OutVertex input) : COLOR\n{\n" +
        j(p, "emissive") +
        j(p, "ambient") +
        j(p, "diffuse") +
        j(p, "specular") +
        F() +
        "  float3 surfaceToLight = normalize(input.surfaceToLight);\n  float3 surfaceToView = normalize(input.surfaceToView);\n  float3 halfVector = normalize(surfaceToLight + surfaceToView);\n  float4 litR = lit(dot(normal, surfaceToLight), \n                    dot(normal, halfVector), shininess);\n  return float4((emissive +\n  lightColor * (ambient * diffuse + diffuse * litR.y +\n                        + specular * litR.z * specularFactor)).rgb,      diffuse.a);\n}\n\n" +
        k()
      );
    },
    o = function (p, v) {
      v.push("phong");
      return (
        g() +
        h() +
        i(p, v, "emissive") +
        i(p, v, "ambient") +
        i(p, v, "diffuse") +
        i(p, v, "specular") +
        i(p, v, "bump", false) +
        "uniform float shininess;\nuniform float specularFactor;\n" +
        E(p, true, true) +
        "OutVertex vertexShaderFunction(InVertex input) {\n  OutVertex output;\n" +
        u(p) +
        x() +
        z() +
        A() +
        D() +
        G() +
        "  return output;\n}\nfloat4 pixelShaderFunction(OutVertex input) : COLOR\n{\n" +
        j(p, "emissive") +
        j(p, "ambient") +
        j(p, "diffuse") +
        j(p, "specular") +
        F() +
        "  float3 surfaceToLight = normalize(input.surfaceToLight);\n  float3 surfaceToView = normalize(input.surfaceToView);\n  float3 halfVector = normalize(surfaceToLight + surfaceToView);\n  float4 litR = lit(dot(normal, surfaceToLight), \n                    dot(normal, halfVector), shininess);\n  return float4((emissive +\n  lightColor * (ambient * diffuse + diffuse * litR.y +\n                        + specular * litR.z * specularFactor)).rgb,      diffuse.a);\n}\n\n" +
        k()
      );
    },
    s,
    t = function (p, v) {
      return p.getParam(v + "Sampler")
        ? "  float2 " + v + "UV : TEXCOORD" + s++ + ";\n"
        : "";
    },
    q = function (p) {
      s = 0;
      return (
        t(p, "emissive") + t(p, "ambient") + t(p, "diffuse") + t(p, "specular")
      );
    },
    r = function (p, v) {
      return p.getParam(v + "Sampler")
        ? "  output." + v + "UV = input." + v + "UV;\n"
        : "";
    },
    u = function (p) {
      return (
        r(p, "emissive") +
        r(p, "ambient") +
        r(p, "diffuse") +
        r(p, "specular") +
        r(p, "bump")
      );
    },
    y = function () {
      return d
        ? "  float3 tangent      : TANGENT;\n  float3 binormal     : BINORMAL;\n  float2 bumpUV       : TEXCOORD" +
            s++ +
            ";\n"
        : "";
    },
    w = function () {
      return d
        ? "  float3 tangent      : TEXCOORD" +
            s++ +
            ";\n  float3 binormal     : TEXCOORD" +
            s++ +
            ";\n  float2 bumpUV       : TEXCOORD" +
            s++ +
            ";\n"
        : "";
    },
    x = function () {
      return "  output.position = mul(input.position, worldViewProjection);\n";
    },
    z = function () {
      return "  output.normal = mul(float4(input.normal, 0),\n                      worldInverseTranspose).xyz;\n";
    },
    A = function () {
      return "  output.surfaceToLight = lightWorldPos - \n                          mul(input.position, world).xyz;\n";
    },
    D = function () {
      return "  output.surfaceToView = (viewInverse[3] - mul(input.position,\n                                               world)).xyz;\n";
    },
    G = function () {
      return d
        ? "  output.binormal = mul(float4(input.binormal, 0), worldInverseTranspose).xyz;\n  output.tangent = mul(float4(input.tangent, 0), worldInverseTranspose).xyz;\n"
        : "";
    },
    F = function () {
      return d
        ? "float3x3 tangentToWorld = float3x3(input.tangent,\n                                   input.binormal,\n                                   input.normal);\nfloat3 tangentNormal = tex2D(bumpSampler, input.bumpUV.xy).xyz -\n                       float3(0.5, 0.5, 0.5);\nfloat3 normal = mul(tangentNormal, tangentToWorld);\nnormal = normalize(normal);\n"
        : "  float3 normal = normalize(input.normal);\n";
    },
    E = function (p, v, C) {
      var H = "struct InVertex {\n  float4 position     : POSITION;\n";
      if (v || C) H += "  float3 normal       : NORMAL;\n";
      H +=
        q(p) +
        y() +
        "};\nstruct OutVertex {\n  float4 position     : POSITION;\n" +
        q(p) +
        w();
      if (v || C)
        H +=
          "  float3 normal        : TEXCOORD" +
          s++ +
          ";\n  float3 surfaceToLight: TEXCOORD" +
          s++ +
          ";\n";
      if (C) H += "  float3 surfaceToView : TEXCOORD" + s++ + ";\n";
      H += "};\n";
      return H;
    },
    B = [];
  if (c == "phong") b = o(b, B);
  else if (c == "lambert") b = n(b, B);
  else if (c == "blinn") b = m(b, B);
  else if (c == "constant") b = l(b, B);
  else throw 'unknown effect type "' + c + '"';
  return { description: B.join("_"), shader: b };
};
o3djs.effect.getStandardShader = function (b, c, d) {
  c = o3djs.effect.buildStandardShaderString(c, d);
  d = b.getObjectsByClassName("o3d.Effect");
  for (var e = 0; e < d.length; ++e)
    if (d[e].name == c.description && d[e].source == c.shader) return d[e];
  if ((d = b.createObject("Effect"))) {
    d.name = c.description;
    if (d.loadFromFXString(c.shader)) return d;
    b.removeObject(d);
  }
  return null;
};
o3djs.effect.attachStandardShader = function (b, c, d, e) {
  if ((b = o3djs.effect.getStandardShader(b, c, e))) {
    c.effect = b;
    b.createUniformParameters(c);
    b = c.getParam("lightWorldPos");
    if (!b.inputConnection) b.value = d;
    b = c.getParam("lightColor");
    if (!b.inputConnection) b.value = [1, 1, 1, 1];
    return true;
  } else return false;
};
o3djs.effect.createUniformParameters = function (b, c, d) {
  c.createUniformParameters(d);
  c = c.getParameterInfo();
  for (var e = 0; e < c.length; ++e) {
    var f = c[e];
    if (f.sasClassName.length == 0)
      if (f.numElements > 0) {
        var g = b.createObject("ParamArray"),
          h = d.getParam(f.name);
        h.value = g;
        g.resize(f.numElements, f.className);
        if (f.className == "o3d.ParamSampler")
          for (h = 0; h < f.numElements; ++h) {
            var i = b.createObject("Sampler");
            g.getParam(h).value = i;
          }
      } else if (f.className == "o3d.ParamSampler") {
        i = b.createObject("Sampler");
        h = d.getParam(f.name);
        h.value = i;
      }
  }
};
o3djs.effect.createCheckerEffect = function (b) {
  var c = b.getObjects(
    o3djs.effect.TWO_COLOR_CHECKER_EFFECT_NAME,
    "o3d.Effect"
  );
  if (c.length > 0) return c[0];
  b = b.createObject("Effect");
  b.loadFromFXString(o3djs.effect.TWO_COLOR_CHECKER_FXSTRING);
  b.name = o3djs.effect.TWO_COLOR_CHECKER_EFFECT_NAME;
  return b;
};
o3djs.provide("o3djs.element");
o3djs.element = o3djs.element || {};
o3djs.element.setBoundingBoxAndZSortPoint = function (b) {
  var c = b.getBoundingBox(0),
    d = c.minExtent,
    e = c.maxExtent;
  b.boundingBox = c;
  b.cull = true;
  b.zSortPoint = o3djs.math.divVectorScalar(o3djs.math.addVector(d, e), 2);
};
o3djs.element.addMissingTexCoordStreams = function (b) {
  if (b.isAClassName("o3d.Primitive")) {
    var c = b.material;
    b = b.streamBank;
    var d = o3djs.effect.getColladaLightingType(c);
    if (d) {
      c = o3djs.effect.getNumTexCoordStreamsNeeded(c);
      d = b.vertexStreams;
      for (var e = null, f = 0, g = 0; g < d.length; ++g) {
        var h = d[g];
        if (h.semantic == o3djs.base.o3d.Stream.TEXCOORD) {
          e = h;
          ++f;
        }
      }
      for (g = f; g < c; ++g)
        b.setVertexStream(
          e.semantic,
          e.semanticIndex + g - f + 1,
          e.field,
          e.startIndex
        );
    }
  }
};
o3djs.element.duplicateElement = function (b, c) {
  b = b.createObject(c.className);
  b.copyParams(c);
  if (c.isAClassName("o3d.Primitive")) {
    b.indexBuffer = c.indexBuffer;
    b.startIndex = c.startIndex;
    b.primitiveType = c.primitiveType;
    b.numberVertices = c.numberVertices;
    b.numberPrimitives = c.numberPrimitives;
  }
  return b;
};
o3djs.element.getNormalForTriangle = function (b, c, d) {
  var e = b.primitiveType;
  if (
    e != o3djs.base.o3d.Primitive.TRIANGLELIST &&
    e != o3djs.base.o3d.Primitive.TRIANGLESTRIP
  )
    throw "primitive is not a TRIANGLELIST or TRIANGLESTRIP";
  var f = b.indexBuffer;
  c = e == o3djs.base.o3d.Primitive.TRIANGLELIST ? c * 3 : c + 2;
  if (f) {
    f = f.fields[0];
    f = f.getAt(c, 3);
  } else f = [c, c + 1, c + 2];
  if ((c = b.streamBank.getVertexStream(o3djs.base.o3d.Stream.NORMAL, 0))) {
    d = c.field;
    c = [0, 0, 0];
    for (b = 0; b < 3; ++b) {
      e = d.getAt(f[b], 1);
      c = o3djs.math.addVector(c, e);
    }
    return o3djs.math.normalize(c);
  } else {
    b = b.streamBank.getVertexStream(o3djs.base.o3d.Stream.POSITION, 0);
    if (!b) throw "no POSITION,0 stream in primitive";
    e = b.field;
    c = [];
    for (b = 0; b < 3; ++b) c[b] = e.getAt(f[b], 1);
    f = o3djs.math.normalize(o3djs.math.subVector(c[1], c[0]));
    b = o3djs.math.normalize(o3djs.math.subVector(c[2], c[1]));
    return d ? o3djs.math.cross(b, f) : o3djs.math.cross(f, b);
  }
};
o3djs.provide("o3djs.error");
o3djs.error = o3djs.error || {};
o3djs.error.callbacks_ = [];
o3djs.error.setErrorHandler = function (b, c) {
  var d = b.clientId,
    e = o3djs.error.callbacks_[d];
  (o3djs.error.callbacks_[d] = c)
    ? b.setErrorCallback(c)
    : b.clearErrorCallback();
  return e;
};
o3djs.error.setDefaultErrorHandler = function (b) {
  o3djs.error.setErrorHandler(b, function (c) {
    o3djs.error.setErrorHandler(b, null);
    alert("ERROR: " + c);
  });
};
o3djs.error.createErrorCollector = function (b) {
  return new o3djs.error.ErrorCollector(b);
};
o3djs.error.ErrorCollector = function (b) {
  var c = this;
  this.client_ = b;
  this.errors = [];
  this.oldCallback_ = o3djs.error.setErrorHandler(b, function (d) {
    c.errors.push(d);
  });
};
o3djs.error.ErrorCollector.prototype.finish = function () {
  o3djs.error.setErrorHandler(this.client_, this.oldCallback_);
};
o3djs.provide("o3djs.event");
o3djs.event = o3djs.event || {};
o3djs.event.appendWithSpace = function (b, c) {
  return b.length == 0 ? c : b + " " + c;
};
o3djs.event.appendWithSpaceIf = function (b, c, d) {
  return b ? o3djs.event.appendWithSpace(c, d) : c;
};
o3djs.event.getModifierString = function (b, c, d, e) {
  b = o3djs.event.appendWithSpaceIf(b, "", "Control");
  b = o3djs.event.appendWithSpaceIf(c, b, "Alt");
  b = o3djs.event.appendWithSpaceIf(d, b, "Shift");
  return o3djs.event.appendWithSpaceIf(e, b, "Meta");
};
o3djs.event.padWithLeadingZeroes = function (b, c) {
  for (; b.length < c; ) b = "0" + b;
  return b;
};
o3djs.event.getKeyIdentifier = function (b, c) {
  b || (b = c);
  switch (b) {
    case 3:
    case 13:
      return "Enter";
    case 37:
      return "Left";
    case 39:
      return "Right";
    case 38:
      return "Up";
    case 40:
      return "Down";
  }
  b = b >= 97 && b <= 122 ? b - 32 : b;
  b = b.toString(16).toUpperCase();
  return "U+" + o3djs.event.padWithLeadingZeroes(b, 4);
};
o3djs.event.keyIdentifierToChar = function (b) {
  if (b && typeof b == "string") {
    switch (b) {
      case "Enter":
        return 13;
      case "Left":
        return 37;
      case "Right":
        return 39;
      case "Up":
        return 38;
      case "Down":
        return 40;
    }
    if (b.indexOf("U+") == 0) return parseInt(b.substr(2).toUpperCase(), 16);
  }
  return 0;
};
o3djs.event.getEventKeyChar = function (b) {
  if (!b) b = window.event;
  var c = 0;
  if (b.keyIdentifier) c = o3djs.event.keyIdentifierToChar(b.keyIdentifier);
  c || (c = window.event ? window.event.keyCode : b.charCode);
  if (!c) c = b.keyCode;
  return c;
};
o3djs.event.cancel = function (b) {
  if (!b) b = window.event;
  b.cancelBubble = true;
  b.stopPropagation && b.stopPropagation();
  b.preventDefault && b.preventDefault();
};
o3djs.event.startKeyboardEventSynthesis = function (b) {
  var c = function (d) {
    o3djs.event.onKey(d, b);
  };
  o3djs.event.addEventListener(b, "keypress", c);
  o3djs.event.addEventListener(b, "keydown", c);
  o3djs.event.addEventListener(b, "keyup", c);
};
o3djs.event.onKey = function (b, c) {
  var d = o3djs.event.createKeyEvent(
    b.type,
    b.charCode,
    b.keyCode,
    b.ctrlKey,
    b.altKey,
    b.shiftKey,
    b.metaKey
  );
  if (d)
    if (c.parentNode.dispatchEvent) c.parentNode.dispatchEvent(d);
    else c.fireEvent && c.fireEvent("on" + b.type, d);
};
o3djs.event.createKeyEvent = function (b, c, d, e, f, g, h) {
  var i,
    j = o3djs.event.getKeyIdentifier(c, d);
  if (document.createEvent) {
    i = document.createEvent("KeyboardEvent");
    if (i.initKeyboardEvent) {
      i.initKeyboardEvent(b, true, true, window, j, 0, e, f, g, h);
      i.charCode = c;
      i.keyCode = b == "keypress" ? c : d;
    } else if (i.initKeyEvent) {
      i.initKeyEvent(b, true, true, window, e, f, g, h, d, c);
      i.keyIdentifier = j;
    }
  } else if (document.createEventObject) {
    i = document.createEventObject();
    i.ctrlKey = e;
    i.altKey = f;
    i.shiftKey = g;
    i.metaKey = h;
    i.keyCode = c;
    i.keyIdentifier = j;
  }
  i.synthetic = true;
  return i;
};
o3djs.event.createEventHandler = function (b) {
  return function (c) {
    for (var d = b.length, e = 0; e < d; ++e) {
      var f = b[e];
      typeof f.handleEvent == "function" ? f.handleEvent(c) : f(c);
    }
  };
};
o3djs.event.addEventListener = function (b, c, d) {
  if (
    !d ||
    typeof c != "string" ||
    (typeof d != "function" && typeof d.handleEvent != "function")
  )
    throw new Error("Invalid argument.");
  b.o3d_eventRegistry = b.o3d_eventRegistry || [];
  var e = b.o3d_eventRegistry,
    f = e[c];
  if (!f || f.length == 0) {
    f = e[c] = [];
    b.client.setEventCallback(c, o3djs.event.createEventHandler(f));
  } else for (var g in f) if (f[g] == d) return;
  f.push(d);
};
o3djs.event.removeEventListener = function (b, c, d) {
  var e = b.o3d_eventRegistry;
  if (e)
    if ((e = e[c]))
      for (var f in e)
        if (e[f] == d) {
          e.length == 1 && b.client.clearEventCallback(c);
          e.splice(f, 1);
          break;
        }
};
o3djs.provide("o3djs.fps");
o3djs.fps = o3djs.fps || {};
o3djs.fps.NUM_FRAMES_TO_AVERAGE = 16;
o3djs.fps.PERF_BAR_COLORS = [
  [0, 0, 1, 1],
  [0, 1, 0, 1],
  [1, 1, 0, 1],
  [1, 0.5, 0, 1],
  [1, 0, 0, 1],
];
o3djs.fps.CONST_COLOR_EFFECT =
  "float4x4 worldViewProjection : WorldViewProjection;\nfloat4 color;\nstruct a2v {\n float4 pos : POSITION;\n};\nstruct v2f {\n  float4 pos : POSITION;\n};\nv2f vsMain(a2v IN) {\n  v2f OUT;\n  OUT.pos = mul(IN.pos, worldViewProjection);\n  return OUT;\n}\nfloat4 psMain(v2f IN): COLOR {\n  return color;\n}\n// #o3d VertexShaderEntryPoint vsMain\n// #o3d PixelShaderEntryPoint psMain\n// #o3d MatrixLoadOrder RowMajor\n";
o3djs.fps.createFPSManager = function (b, c, d, e) {
  return new o3djs.fps.FPSManager(b, c, d, e);
};
o3djs.fps.FPSManager = function (b, c, d, e) {
  this.totalActiveTime_ = this.totalTime_ = 0;
  this.timeTable_ = [];
  this.activeTimeTable_ = [];
  for (
    var f = (this.timeTableCursor_ = 0);
    f < o3djs.fps.NUM_FRAMES_TO_AVERAGE;
    ++f
  ) {
    this.timeTable_[f] = 0;
    this.activeTimeTable_[f] = 0;
  }
  this.root_ = b.createObject("Transform");
  this.viewInfo = o3djs.rendergraph.createBasicView(b, this.root_, e);
  this.viewInfo.root.priority = 100000;
  this.viewInfo.clearBuffer.clearColorFlag = false;
  this.viewInfo.zOrderedState.getStateParam("CullMode").value =
    o3djs.base.o3d.State.CULL_NONE;
  this.viewInfo.drawContext.view = o3djs.math.matrix4.lookAt(
    [0, 0, 1],
    [0, 0, 0],
    [0, 1, 0]
  );
  this.canvasLib_ = o3djs.canvas.create(b, this.root_, this.viewInfo);
  this.paint_ = b.createObject("CanvasPaint");
  this.fpsQuad = this.canvasLib_.createXYQuad(0, 0, -1, 64, 32, true);
  this.colorEffect_ = b.createObject("Effect");
  this.colorEffect_.loadFromFXString(o3djs.fps.CONST_COLOR_EFFECT);
  this.colorMaterial_ = b.createObject("Material");
  this.colorMaterial_.effect = this.colorEffect_;
  this.colorMaterial_.drawList = this.viewInfo.zOrderedDrawList;
  this.colorEffect_.createUniformParameters(this.colorMaterial_);
  this.colorMaterial_.getParam("color").value = [1, 1, 1, 1];
  this.colorQuadShape_ = o3djs.primitives.createPlane(
    b,
    this.colorMaterial_,
    1,
    1,
    1,
    1,
    [
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, -1, 0, 0],
      [0.5, 0.5, 0, 1],
    ]
  );
  e = 10;
  f = 2;
  var g = c - e * 2,
    h = 7;
  this.numPerfBars_ = o3djs.fps.PERF_BAR_COLORS.length - 1;
  this.perfBarRoot_ = b.createObject("Transform");
  this.perfBarRoot_.parent = this.root_;
  this.perfBarBack_ = new o3djs.fps.ColorRect(
    b,
    this.colorQuadShape_,
    this.perfBarRoot_,
    e,
    f,
    -3,
    g,
    h,
    [0, 0, 0, 1]
  );
  this.perfMarker_ = [];
  for (var i = 0; i < this.numPerfBars_; ++i)
    this.perfMarker_[i] = new o3djs.fps.ColorRect(
      b,
      this.colorQuadShape_,
      this.perfBarRoot_,
      e + (g / (this.numPerfBars_ + 1)) * (i + 1),
      f - 1,
      -1,
      1,
      h + 2,
      [1, 1, 1, 1]
    );
  this.perfBar_ = new o3djs.fps.ColorRect(
    b,
    this.colorQuadShape_,
    this.perfBarRoot_,
    e + 1,
    f + 1,
    -2,
    1,
    h - 2,
    [1, 1, 0, 1]
  );
  this.perfBarWidth_ = g - 2;
  this.perfBarHeight_ = h - 2;
  this.perfBarXOffset_ = e;
  this.perfBarYOffset_ = f;
  this.resize(c, d);
  this.setPosition(10, 10);
};
a = o3djs.fps.FPSManager.prototype;
a.setPosition = function (b, c) {
  this.fpsQuad.transform.identity();
  this.fpsQuad.transform.translate(b, c, -1);
};
a.setVisible = function (b) {
  this.viewInfo.root.active = b;
};
a.setPerfVisible = function (b) {
  this.perfBarRoot_.visible = b;
};
a.resize = function (b, c) {
  this.viewInfo.drawContext.projection = o3djs.math.matrix4.orthographic(
    0.5,
    b + 0.5,
    c + 0.5,
    0.5,
    0.001,
    1000
  );
  b = b - this.perfBarXOffset_ * 2;
  this.perfBarBack_.setSize(b, this.perfBarHeight_);
  for (c = 0; c < this.numPerfBars_; ++c)
    this.perfMarker_[c].setPosition(
      this.perfBarXOffset_ + (b / (this.numPerfBars_ + 1)) * (c + 1),
      this.perfBarYOffset_ - 1
    );
  this.perfBarWidth_ = b - 2;
};
a.update = function (b) {
  var c = b.elapsedTime;
  b = b.activeTime;
  this.totalTime_ += c - this.timeTable_[this.timeTableCursor_];
  this.totalActiveTime_ += b - this.activeTimeTable_[this.timeTableCursor_];
  this.timeTable_[this.timeTableCursor_] = c;
  this.activeTimeTable_[this.timeTableCursor_] = b;
  ++this.timeTableCursor_;
  if (this.timeTableCursor_ == o3djs.fps.NUM_FRAMES_TO_AVERAGE)
    this.timeTableCursor_ = 0;
  c =
    "" +
    Math.floor(1 / (this.totalTime_ / o3djs.fps.NUM_FRAMES_TO_AVERAGE) + 0.5) +
    " : " +
    Math.floor(1 / c + 0.5);
  b = this.fpsQuad.canvas;
  b.clear([0, 0, 0, 0]);
  var d = this.paint_;
  b.saveMatrix();
  d.setOutline(3, [0, 0, 0, 1]);
  d.textAlign = o3djs.base.o3d.CanvasPaint.LEFT;
  d.textSize = 12;
  d.textTypeface = "Arial";
  d.color = [1, 1, 0, 1];
  b.drawText(c, 2, 16, d);
  b.restoreMatrix();
  this.fpsQuad.updateTexture();
  c = this.totalActiveTime_ / o3djs.fps.NUM_FRAMES_TO_AVERAGE / (1 / 60);
  b = Math.min(c, o3djs.fps.PERF_BAR_COLORS.length - 1);
  b = Math.floor(Math.max(b, 0));
  if (!isNaN(b)) {
    this.perfBar_.setColor(o3djs.fps.PERF_BAR_COLORS[b]);
    this.perfBar_.setSize(
      (c * this.perfBarWidth_) / this.numPerfBars_,
      this.perfBarHeight_
    );
  }
};
o3djs.fps.ColorRect = function (b, c, d, e, f, g, h, i, j) {
  this.transform_ = b.createObject("Transform");
  this.colorParam_ = this.transform_.createParam("color", "ParamFloat4");
  this.transform_.addShape(c);
  this.transform_.parent = d;
  this.y_ = this.x_ = this.height_ = this.width_ = 0;
  this.z_ = g;
  this.setPosition(e, f);
  this.setSize(h, i);
  this.setColor(j);
};
o3djs.fps.ColorRect.prototype.updateTransform_ = function () {
  this.transform_.identity();
  this.transform_.translate(this.x_, this.y_, this.z_);
  this.transform_.scale(this.width_, this.height_, 1);
};
o3djs.fps.ColorRect.prototype.setPosition = function (b, c) {
  this.x_ = b;
  this.y_ = c;
  this.updateTransform_();
};
o3djs.fps.ColorRect.prototype.setSize = function (b, c) {
  this.width_ = b;
  this.height_ = c;
  this.updateTransform_();
};
o3djs.fps.ColorRect.prototype.setColor = function (b) {
  this.colorParam_.value = b;
};
o3djs.provide("o3djs.io");
o3djs.io = o3djs.io || {};
o3djs.io.createLoadInfo = function (b, c) {
  return new o3djs.io.LoadInfo(b, c);
};
o3djs.io.LoadInfo = function (b, c) {
  this.request_ = b;
  this.hasStatus_ = c;
  this.streamLength_ = 0;
  this.children_ = [];
};
a = o3djs.io.LoadInfo.prototype;
a.addChild = function (b) {
  this.children_.push(b);
};
a.finish = function () {
  if (this.request_) {
    if (this.hasStatus_) this.streamLength_ = this.request_.streamLength;
    this.request_ = null;
  }
};
a.getTotalKnownBytesToStreamSoFar = function () {
  if (!this.streamLength_ && this.request_ && this.hasStatus_)
    this.streamLength_ = this.request_.streamLength;
  for (var b = this.streamLength_, c = 0; c < this.children_.length; ++c)
    b += this.children_[c].getTotalKnownBytesToStreamSoFar();
  return b;
};
a.getTotalBytesDownloaded = function () {
  for (
    var b =
        this.request_ && this.hasStatus_
          ? this.request_.bytesReceived
          : this.streamLength_,
      c = 0;
    c < this.children_.length;
    ++c
  )
    b += this.children_[c].getTotalBytesDownloaded();
  return b;
};
a.getTotalKnownRequestsToStreamSoFar = function () {
  for (var b = 1, c = 0; c < this.children_.length; ++c)
    b += this.children_[c].getTotalKnownRequestToStreamSoFar();
  return b;
};
a.getTotalRequestsDownloaded = function () {
  for (var b = this.request_ ? 0 : 1, c = 0; c < this.children_.length; ++c)
    b += this.children_[c].getTotalRequestsDownloaded();
  return b;
};
a.getKnownProgressInfoSoFar = function () {
  var b = 0,
    c = this.getTotalKnownBytesToStreamSoFar(),
    d = this.getTotalBytesDownloaded();
  if (c > 0) b = Math.floor((d / c) * 100);
  var e = c < 1048576 ? 1024 : 1048576;
  return {
    percent: b,
    downloaded: (d / e).toFixed(2),
    totalBytes: (c / e).toFixed(2),
    base: e,
    suffix: e == 1024 ? "kb" : "mb",
  };
};
o3djs.io.loadTextFileSynchronous = function (b) {
  o3djs.BROWSER_ONLY = true;
  var c = 'loadTextFileSynchronous failed to load url "' + b + '"',
    d;
  if (!o3djs.base.IsMSIE() && window.XMLHttpRequest) {
    d = new XMLHttpRequest();
    d.overrideMimeType && d.overrideMimeType("text/plain");
  } else if (window.ActiveXObject) d = new ActiveXObject("MSXML2.XMLHTTP.3.0");
  else throw "XMLHttpRequest is disabled";
  d.open("GET", b, false);
  d.send(null);
  if (d.readyState != 4) throw c;
  return d.responseText;
};
o3djs.io.loadTextFile = function (b, c) {
  o3djs.BROWSER_ONLY = true;
  var d;
  if (!o3djs.base.IsMSIE() && window.XMLHttpRequest) {
    d = new XMLHttpRequest();
    d.overrideMimeType && d.overrideMimeType("text/plain");
  } else if (window.ActiveXObject) d = new ActiveXObject("MSXML2.XMLHTTP.3.0");
  else throw "XMLHttpRequest is disabled";
  var e = o3djs.io.createLoadInfo(d, false);
  d.open("GET", b, true);
  var f = function () {
    if (d.readyState == 4) {
      var g = "",
        h = d.status == 200 || d.status == 0;
      if (h) g = d.responseText;
      e.finish();
      c(g, h ? null : "could not load: " + b);
    }
  };
  d.onreadystatechange = f;
  d.send(null);
  return e;
};
o3djs.io.ArchiveInfo = function (b, c, d) {
  var e = this;
  this.files = {};
  this.pack = b;
  this.destroyed = false;
  this.request_ = null;
  function f(g) {
    e.files[g.uri] = g;
  }
  this.loadInfo = o3djs.io.loadArchiveAdvanced(b, c, f, function (g, h) {
    e.request_ = g;
    d(e, h);
  });
};
o3djs.io.ArchiveInfo.prototype.destroy = function () {
  if (!this.destroyed) {
    this.pack.removeObject(this.request_);
    this.destroyed = true;
    this.files = {};
  }
};
o3djs.io.ArchiveInfo.prototype.getFiles = function (b, c) {
  if (!(b instanceof RegExp)) {
    b = b.replace(/(\W)/g, "\\$&");
    b = b.replace(/\\\*/g, ".*");
    b = b.replace(/\\\?/g, ".");
    b = new RegExp(b, c ? "i" : "");
  }
  c = [];
  for (var d in this.files) b.test(d) && c.push(this.files[d]);
  return c;
};
o3djs.io.ArchiveInfo.prototype.getFileByURI = function (b, c) {
  if (c) {
    b = b.toLowerCase();
    for (var d in this.files) if (d.toLowerCase() == b) return this.files[d];
    return undefined;
  } else return this.files[b];
};
o3djs.io.loadArchive = function (b, c, d) {
  b = new o3djs.io.ArchiveInfo(b, c, d);
  return b.loadInfo;
};
o3djs.io.loadArchiveAdvanced = function (b, c, d, e) {
  var f = b.createArchiveRequest(),
    g = o3djs.io.createLoadInfo(f, true);
  f.open("GET", c);
  f.onfileavailable = d;
  f.onreadystatechange = function () {
    if (f.done) {
      g.finish();
      var h = f.success,
        i = null;
      if (!h) (i = f.error) || (i = "unknown error loading archive");
      e(f, i);
    }
  };
  f.send();
  return g;
};
o3djs.io.loadRawData = function (b, c, d) {
  var e = b.createFileRequest("RAWDATA"),
    f = o3djs.io.createLoadInfo(e, false);
  e.open("GET", c, true);
  e.onreadystatechange = function () {
    if (e.done) {
      var g = e.data,
        h = e.success,
        i = e.error;
      f.finish();
      if (!h && !i) i = "unknown error loading RawData: " + c;
      d(e, g, h ? null : i);
    }
  };
  e.send();
  return f;
};
o3djs.io.loadBitmaps = function (b, c, d, e) {
  if (typeof e === "undefined") e = true;
  return o3djs.io.loadRawData(b, c, function (f, g, h) {
    var i = [];
    if (!h) {
      i = b.createBitmapsFromRawData(g);
      b.removeObject(f);
    }
    d(i, h);
  });
};
o3djs.io.loadTexture = function (b, c, d, e, f) {
  function g(h, i, j) {
    var k = null;
    if (!j) {
      k = o3djs.texture.createTextureFromRawData(b, i, e, f);
      b.removeObject(h);
    }
    d(k, j);
  }
  return o3djs.io.loadRawData(b, c, g);
};
o3djs.provide("o3djs.loader");
o3djs.loader = o3djs.loader || {};
o3djs.loader.Loader = function (b) {
  this.count_ = 1;
  this.onFinished_ = b;
  this.loadInfo = o3djs.io.createLoadInfo();
};
o3djs.loader.createLoader = function (b) {
  return new o3djs.loader.Loader(b);
};
a = o3djs.loader.Loader.prototype;
a.loadTexture = function (b, c, d) {
  var e = this;
  ++this.count_;
  b = o3djs.io.loadTexture(b, c, function (f, g) {
    d && d(f, g);
    e.countDown_();
  });
  this.loadInfo.addChild(b);
};
a.loadRawData = function (b, c, d) {
  var e = this;
  ++this.count_;
  b = o3djs.io.loadRawData(b, c, function (f, g, h) {
    d(f, g, h);
    e.countDown_();
  });
  this.loadInfo.addChild(b);
};
a.loadBitmaps = function (b, c, d) {
  var e = this;
  ++this.count_;
  b = o3djs.io.loadBitmaps(b, c, function (f, g) {
    d(f, g);
    e.countDown_();
  });
  this.loadInfo.addChild(b);
};
a.loadScene = function (b, c, d, e, f, g) {
  var h = this;
  ++this.count_;
  b = o3djs.scene.loadScene(
    b,
    c,
    d,
    e,
    function (i, j, k) {
      f && f(i, j, k);
      h.countDown_();
    },
    g
  );
  this.loadInfo.addChild(b);
};
a.loadTextFile = function (b, c) {
  var d = this;
  ++this.count_;
  b = o3djs.io.loadTextFile(b, function (e, f) {
    c(e, f);
    d.countDown_();
  });
  this.loadInfo.addChild(b);
};
a.createLoader = function (b) {
  var c = this;
  ++this.count_;
  var d = o3djs.loader.createLoader(function () {
    b();
    c.countDown_();
  });
  this.loadInfo.addChild(d.loadInfo);
  return d;
};
a.countDown_ = function () {
  --this.count_;
  this.count_ === 0 && this.onFinished_();
};
a.finish = function () {
  this.countDown_();
};
o3djs.provide("o3djs.material");
o3djs.material = o3djs.material || {};
o3djs.material.hasNonOneAlpha_ = function (b, c) {
  var d = false,
    e = false,
    f = null,
    g = b.getParam(c + "Sampler");
  if (g && g.isAClassName("o3d.ParamSampler")) {
    d = true;
    if ((g = g.value)) f = g.texture;
  } else if (
    (g = b.getParam(c + "Texture")) &&
    g.isAClassName("o3d.ParamTexture")
  ) {
    d = true;
    f = g.value;
  }
  if (f && !f.alphaIsOne) e = true;
  if (!d)
    if ((b = b.getParam(c)) && b.isAClassName("o3d.ParamFloat4")) d = true;
  return { found: d, nonOneAlpha: e };
};
o3djs.material.prepareMaterial = function (b, c, d, e) {
  var f = c.performanceDrawList;
  if (!d.drawList) {
    var g = d.getParam("collada.transparent");
    if (g && g.className == "o3d.ParamBoolean")
      d.drawList = g.value ? c.zOrderedDrawList : c.performanceDrawList;
  }
  if (!d.effect) {
    if (!e) if ((g = o3djs.effect.getColladaLightingType(d))) e = g;
    if (e) {
      o3djs.material.attachStandardEffect(b, d, c, e);
      if (d.drawList == null) {
        b = o3djs.material.hasNonOneAlpha_(d, "diffuse");
        b.found || (b = o3djs.material.hasNonOneAlpha_(d, "emissive"));
        if (b.nonOneAlpha) f = c.zOrderedDrawList;
      }
    }
  }
  if (!d.drawList) d.drawList = f;
};
o3djs.material.prepareMaterials = function (b, c, d) {
  for (
    var e = b.getObjectsByClassName("o3d.Material"), f = 0;
    f < e.length;
    f++
  )
    o3djs.material.prepareMaterial(d || b, c, e[f]);
};
o3djs.material.attachStandardEffect = function (b, c, d, e) {
  if (!c.effect) {
    d = o3djs.math.matrix4.getTranslation(
      o3djs.math.inverse(d.drawContext.view)
    );
    if (!o3djs.effect.attachStandardShader(b, c, d, e))
      throw "Could not attach a standard effect";
  }
};
o3djs.material.setDrawListOnMaterials = function (b, c) {
  b = b.getObjectsByClassName("o3d.Material");
  for (var d = 0; d < b.length; d++) {
    var e = b[d];
    e.drawList = c;
  }
};
o3djs.material.createBasicMaterial = function (b, c, d, e) {
  var f = b.createObject("Material");
  f.drawList = e ? c.zOrderedDrawList : c.performanceDrawList;
  if (d.length) f.createParam("diffuse", "ParamFloat4").value = d;
  else {
    e = f.createParam("diffuseSampler", "ParamSampler");
    var g = b.createObject("Sampler");
    e.value = g;
    g.texture = d;
  }
  f.createParam("emissive", "ParamFloat4").value = [0, 0, 0, 1];
  f.createParam("ambient", "ParamFloat4").value = [0, 0, 0, 1];
  f.createParam("specular", "ParamFloat4").value = [1, 1, 1, 1];
  f.createParam("shininess", "ParamFloat").value = 50;
  f.createParam("specularFactor", "ParamFloat").value = 1;
  f.createParam("lightColor", "ParamFloat4").value = [1, 1, 1, 1];
  d = f.createParam("lightWorldPos", "ParamFloat3");
  o3djs.material.attachStandardEffect(b, f, c, "phong");
  d.value = [1000, 2000, 3000];
  return f;
};
o3djs.material.createConstantMaterial = function (b, c, d, e) {
  var f = b.createObject("Material");
  f.drawList = e ? c.zOrderedDrawList : c.performanceDrawList;
  if (d.length) f.createParam("emissive", "ParamFloat4").value = d;
  else {
    e = f.createParam("emissiveSampler", "ParamSampler");
    var g = b.createObject("Sampler");
    e.value = g;
    g.texture = d;
  }
  o3djs.material.attachStandardEffect(b, f, c, "constant");
  return f;
};
o3djs.material.createCheckerMaterial = function (b, c, d, e, f, g) {
  d = d || [0.4, 0.5, 0.5, 1];
  e = e || [0.6, 0.8, 0.8, 1];
  g = g || 10;
  var h = o3djs.effect.createCheckerEffect(b),
    i = b.createObject("Material");
  i.effect = h;
  i.drawList = f ? c.zOrderedDrawList : c.performanceDrawList;
  o3djs.effect.createUniformParameters(b, h, i);
  i.getParam("color1").value = d;
  i.getParam("color2").value = e;
  i.getParam("checkSize").value = g;
  return i;
};
o3djs.material.createMaterialFromFile = function (b, c, d) {
  c = o3djs.effect.createEffectFromFile(b, c);
  var e = b.createObject("Material");
  e.effect = c;
  e.drawList = d;
  o3djs.effect.createUniformParameters(b, c, e);
  return e;
};
o3djs.material.bindParamsOnMaterial = function (b, c) {
  for (var d in c) {
    var e = c[d],
      f = b.getParam(d);
    f && e.isAClassName(f.className) && f.bind(e);
  }
};
o3djs.material.bindParams = function (b, c) {
  b = b.getObjectsByClassName("o3d.Material");
  for (var d = 0; d < b.length; ++d)
    o3djs.material.bindParamsOnMaterial(b[d], c);
};
o3djs.material.createParams = function (b, c) {
  b = b.createObject("ParamObject");
  var d = {};
  for (var e in c) d[e] = b.createParam(e, c[e]);
  return d;
};
o3djs.material.createStandardParams = function (b) {
  var c = { lightColor: "ParamFloat4", lightWorldPos: "ParamFloat3" };
  return o3djs.material.createParams(b, c);
};
o3djs.material.createAndBindStandardParams = function (b) {
  var c = o3djs.material.createStandardParams(b);
  o3djs.material.bindParams(b, c);
  return c;
};
o3djs.provide("o3djs.math");
o3djs.math = o3djs.math || {};
o3djs.math.randomSeed_ = 0;
o3djs.math.RANDOM_RANGE_ = Math.pow(2, 32);
o3djs.math.matrix4 = o3djs.math.matrix4 || {};
o3djs.math.rowMajor = o3djs.math.rowMajor || {};
o3djs.math.columnMajor = o3djs.math.columnMajor || {};
o3djs.math.errorCheck = o3djs.math.errorCheck || {};
o3djs.math.errorCheckFree = o3djs.math.errorCheckFree || {};
o3djs.math.Vector2 = goog.typedef;
o3djs.math.Vector3 = goog.typedef;
o3djs.math.Vector4 = goog.typedef;
o3djs.math.Vector = goog.typedef;
o3djs.math.Matrix1 = goog.typedef;
o3djs.math.Matrix2 = goog.typedef;
o3djs.math.Matrix3 = goog.typedef;
o3djs.math.Matrix4 = goog.typedef;
o3djs.math.Matrix = goog.typedef;
o3djs.math.pseudoRandom = function () {
  var b = o3djs.math;
  return (
    (b.randomSeed_ = (134775813 * b.randomSeed_ + 1) % b.RANDOM_RANGE_) /
    b.RANDOM_RANGE_
  );
};
o3djs.math.resetPseudoRandom = function () {
  o3djs.math.randomSeed_ = 0;
};
o3djs.math.degToRad = function (b) {
  return (b * Math.PI) / 180;
};
o3djs.math.radToDeg = function (b) {
  return (b * 180) / Math.PI;
};
o3djs.math.lerpScalar = function (b, c, d) {
  return (1 - d) * b + d * c;
};
o3djs.math.addVector = function (b, c) {
  for (var d = [], e = b.length, f = 0; f < e; ++f) d[f] = b[f] + c[f];
  return d;
};
o3djs.math.subVector = function (b, c) {
  for (var d = [], e = b.length, f = 0; f < e; ++f) d[f] = b[f] - c[f];
  return d;
};
o3djs.math.lerpVector = function (b, c, d) {
  for (var e = [], f = b.length, g = 0; g < f; ++g)
    e[g] = (1 - d) * b[g] + d * c[g];
  return e;
};
o3djs.math.modClamp = function (b, c, d) {
  d = d || 0;
  if (c < 1.0e-5) return d;
  b -= d;
  if (b < 0) b -= Math.floor(b / c) * c;
  else b = b % c;
  return b + d;
};
o3djs.math.lerpCircular = function (b, c, d, e) {
  b = o3djs.math.modClamp(b, e);
  c = o3djs.math.modClamp(c, e);
  var f = c - b;
  if (Math.abs(f) > e * 0.5)
    if (f > 0) c -= e;
    else c += e;
  return o3djs.math.modClamp(o3djs.math.lerpScalar(b, c, d), e);
};
o3djs.math.lerpRadian = function (b, c, d) {
  return o3djs.math.lerpCircular(b, c, d, Math.PI * 2);
};
o3djs.math.divVectorScalar = function (b, c) {
  for (var d = [], e = b.length, f = 0; f < e; ++f) d[f] = b[f] / c;
  return d;
};
o3djs.math.dot = function (b, c) {
  for (var d = 0, e = b.length, f = 0; f < e; ++f) d += b[f] * c[f];
  return d;
};
o3djs.math.cross = function (b, c) {
  return [
    b[1] * c[2] - b[2] * c[1],
    b[2] * c[0] - b[0] * c[2],
    b[0] * c[1] - b[1] * c[0],
  ];
};
o3djs.math.length = function (b) {
  for (var c = 0, d = b.length, e = 0; e < d; ++e) c += b[e] * b[e];
  return Math.sqrt(c);
};
o3djs.math.lengthSquared = function (b) {
  for (var c = 0, d = b.length, e = 0; e < d; ++e) c += b[e] * b[e];
  return c;
};
o3djs.math.distance = function (b, c) {
  for (var d = 0, e = b.length, f = 0; f < e; ++f) {
    var g = b[f] - c[f];
    d += g * g;
  }
  return Math.sqrt(d);
};
o3djs.math.distanceSquared = function (b, c) {
  for (var d = 0, e = b.length, f = 0; f < e; ++f) {
    var g = b[f] - c[f];
    d += g * g;
  }
  return d;
};
o3djs.math.normalize = function (b) {
  for (var c = [], d = 0, e = b.length, f = 0; f < e; ++f) d += b[f] * b[f];
  d = Math.sqrt(d);
  for (f = 0; f < e; ++f) c[f] = b[f] / d;
  return c;
};
o3djs.math.addMatrix = function (b, c) {
  for (var d = [], e = b.length, f = b[0].length, g = 0; g < e; ++g) {
    for (var h = [], i = b[g], j = c[g], k = 0; k < f; ++k) h[k] = i[k] + j[k];
    d[g] = h;
  }
  return d;
};
o3djs.math.subMatrix = function (b, c) {
  for (var d = [], e = b.length, f = b[0].length, g = 0; g < e; ++g) {
    for (var h = [], i = b[g], j = c[g], k = 0; k < f; ++k) h[k] = i[k] - j[k];
    d[g] = h;
  }
  return d;
};
o3djs.math.lerpMatrix = function (b, c, d) {
  for (var e = [], f = b.length, g = b[0].length, h = 0; h < f; ++h) {
    for (var i = [], j = b[h], k = c[h], l = 0; l < g; ++l)
      i[l] = (1 - d) * j[l] + d * k[l];
    e[h] = i;
  }
  return e;
};
o3djs.math.divMatrixScalar = function (b, c) {
  for (var d = [], e = b.length, f = b[0].length, g = 0; g < e; ++g) {
    d[g] = [];
    for (var h = 0; h < f; ++h) d[g][h] = b[g][h] / c;
  }
  return d;
};
o3djs.math.negativeScalar = function (b) {
  return -b;
};
o3djs.math.negativeVector = function (b) {
  for (var c = [], d = b.length, e = 0; e < d; ++e) c[e] = -b[e];
  return c;
};
o3djs.math.negativeMatrix = function (b) {
  for (var c = [], d = b.length, e = b[0].length, f = 0; f < d; ++f) {
    c[f] = [];
    for (var g = 0; g < e; ++g) c[f][g] = -b[f][g];
  }
  return c;
};
o3djs.math.copyScalar = function (b) {
  return b;
};
o3djs.math.copyVector = function (b) {
  for (var c = [], d = 0; d < b.length; d++) c[d] = b[d];
  return c;
};
o3djs.math.copyMatrix = function (b) {
  for (var c = [], d = b.length, e = 0; e < d; ++e) {
    c[e] = [];
    for (var f = 0; f < b[e].length; f++) c[e][f] = b[e][f];
  }
  return c;
};
o3djs.math.getMatrixElements = function (b) {
  for (var c = [], d = b.length, e = 0, f = 0; f < d; f++)
    for (var g = 0; g < b[f].length; g++) c[e++] = b[f][g];
  return c;
};
o3djs.math.mulScalarScalar = function (b, c) {
  return b * c;
};
o3djs.math.mulScalarVector = function (b, c) {
  for (var d = [], e = c.length, f = 0; f < e; ++f) d[f] = b * c[f];
  return d;
};
o3djs.math.mulVectorScalar = function (b, c) {
  return o3djs.math.mulScalarVector(c, b);
};
o3djs.math.mulScalarMatrix = function (b, c) {
  for (var d = [], e = c.length, f = c[0].length, g = 0; g < e; ++g) {
    d[g] = [];
    for (var h = 0; h < f; ++h) d[g][h] = b * c[g][h];
  }
  return d;
};
o3djs.math.mulMatrixScalar = function (b, c) {
  return o3djs.math.mulScalarMatrix(c, b);
};
o3djs.math.mulVectorVector = function (b, c) {
  for (var d = [], e = b.length, f = 0; f < e; ++f) d[f] = b[f] * c[f];
  return d;
};
o3djs.math.divVectorVector = function (b, c) {
  for (var d = [], e = b.length, f = 0; f < e; ++f) d[f] = b[f] / c[f];
  return d;
};
o3djs.math.rowMajor.mulVectorMatrix = function (b, c) {
  for (var d = [], e = c[0].length, f = b.length, g = 0; g < e; ++g)
    for (var h = (d[g] = 0); h < f; ++h) d[g] += b[h] * c[h][g];
  return d;
};
o3djs.math.columnMajor.mulVectorMatrix = function (b, c) {
  for (var d = [], e = c.length, f = b.length, g = 0; g < e; ++g) {
    d[g] = 0;
    for (var h = c[g], i = 0; i < f; ++i) d[g] += b[i] * h[i];
  }
  return d;
};
o3djs.math.mulVectorMatrix = null;
o3djs.math.rowMajor.mulMatrixVector = function (b, c) {
  for (var d = [], e = b.length, f = b[0].length, g = 0; g < e; ++g) {
    d[g] = 0;
    for (var h = b[g], i = 0; i < f; ++i) d[g] += h[i] * c[i];
  }
  return d;
};
o3djs.math.columnMajor.mulMatrixVector = function (b, c) {
  for (var d = [], e = b[0].length, f = c.length, g = 0; g < e; ++g)
    for (var h = (d[g] = 0); h < f; ++h) d[g] += c[h] * b[h][g];
  return d;
};
o3djs.math.mulMatrixVector = null;
o3djs.math.rowMajor.mulMatrixMatrix2 = function (b, c) {
  var d = b[0],
    e = b[1],
    f = c[0];
  b = c[1];
  c = d[0];
  d = d[1];
  var g = e[0];
  e = e[1];
  var h = f[0];
  f = f[1];
  var i = b[0];
  b = b[1];
  return [
    [c * h + d * i, c * f + d * b],
    [g * h + e * i, g * f + e * b],
  ];
};
o3djs.math.columnMajor.mulMatrixMatrix2 = function (b, c) {
  var d = b[0],
    e = b[1],
    f = c[0];
  b = c[1];
  c = d[0];
  d = d[1];
  var g = e[0];
  e = e[1];
  var h = f[0];
  f = f[1];
  var i = b[0];
  b = b[1];
  return [
    [c * h + g * f, d * h + e * f],
    [c * i + g * b, d * i + e * b],
  ];
};
o3djs.math.mulMatrixMatrix2 = null;
o3djs.math.rowMajor.mulMatrixMatrix3 = function (b, c) {
  var d = b[0],
    e = b[1],
    f = b[2],
    g = c[0],
    h = c[1],
    i = c[2];
  c = d[0];
  b = d[1];
  d = d[2];
  var j = e[0],
    k = e[1];
  e = e[2];
  var l = f[0],
    n = f[1];
  f = f[2];
  var m = g[0],
    o = g[1];
  g = g[2];
  var s = h[0],
    t = h[1];
  h = h[2];
  var q = i[0],
    r = i[1];
  i = i[2];
  return [
    [c * m + b * s + d * q, c * o + b * t + d * r, c * g + b * h + d * i],
    [j * m + k * s + e * q, j * o + k * t + e * r, j * g + k * h + e * i],
    [l * m + n * s + f * q, l * o + n * t + f * r, l * g + n * h + f * i],
  ];
};
o3djs.math.columnMajor.mulMatrixMatrix3 = function (b, c) {
  var d = b[0],
    e = b[1],
    f = b[2],
    g = c[0],
    h = c[1],
    i = c[2];
  c = d[0];
  b = d[1];
  d = d[2];
  var j = e[0],
    k = e[1];
  e = e[2];
  var l = f[0],
    n = f[1];
  f = f[2];
  var m = g[0],
    o = g[1];
  g = g[2];
  var s = h[0],
    t = h[1];
  h = h[2];
  var q = i[0],
    r = i[1];
  i = i[2];
  return [
    [c * m + j * o + l * g, b * m + k * o + n * g, d * m + e * o + f * g],
    [c * s + j * t + l * h, b * s + k * t + n * h, d * s + e * t + f * h],
    [c * q + j * r + l * i, b * q + k * r + n * i, d * q + e * r + f * i],
  ];
};
o3djs.math.mulMatrixMatrix3 = null;
o3djs.math.rowMajor.mulMatrixMatrix4 = function (b, c) {
  var d = b[0],
    e = b[1],
    f = b[2],
    g = b[3],
    h = c[0],
    i = c[1],
    j = c[2],
    k = c[3];
  c = d[0];
  b = d[1];
  var l = d[2];
  d = d[3];
  var n = e[0],
    m = e[1],
    o = e[2];
  e = e[3];
  var s = f[0],
    t = f[1],
    q = f[2];
  f = f[3];
  var r = g[0],
    u = g[1],
    y = g[2];
  g = g[3];
  var w = h[0],
    x = h[1],
    z = h[2];
  h = h[3];
  var A = i[0],
    D = i[1],
    G = i[2];
  i = i[3];
  var F = j[0],
    E = j[1],
    B = j[2];
  j = j[3];
  var p = k[0],
    v = k[1],
    C = k[2];
  k = k[3];
  return [
    [
      c * w + b * A + l * F + d * p,
      c * x + b * D + l * E + d * v,
      c * z + b * G + l * B + d * C,
      c * h + b * i + l * j + d * k,
    ],
    [
      n * w + m * A + o * F + e * p,
      n * x + m * D + o * E + e * v,
      n * z + m * G + o * B + e * C,
      n * h + m * i + o * j + e * k,
    ],
    [
      s * w + t * A + q * F + f * p,
      s * x + t * D + q * E + f * v,
      s * z + t * G + q * B + f * C,
      s * h + t * i + q * j + f * k,
    ],
    [
      r * w + u * A + y * F + g * p,
      r * x + u * D + y * E + g * v,
      r * z + u * G + y * B + g * C,
      r * h + u * i + y * j + g * k,
    ],
  ];
};
o3djs.math.columnMajor.mulMatrixMatrix4 = function (b, c) {
  var d = b[0],
    e = b[1],
    f = b[2],
    g = b[3],
    h = c[0],
    i = c[1],
    j = c[2],
    k = c[3];
  c = d[0];
  b = d[1];
  var l = d[2];
  d = d[3];
  var n = e[0],
    m = e[1],
    o = e[2];
  e = e[3];
  var s = f[0],
    t = f[1],
    q = f[2];
  f = f[3];
  var r = g[0],
    u = g[1],
    y = g[2];
  g = g[3];
  var w = h[0],
    x = h[1],
    z = h[2];
  h = h[3];
  var A = i[0],
    D = i[1],
    G = i[2];
  i = i[3];
  var F = j[0],
    E = j[1],
    B = j[2];
  j = j[3];
  var p = k[0],
    v = k[1],
    C = k[2];
  k = k[3];
  return [
    [
      c * w + n * x + s * z + r * h,
      b * w + m * x + t * z + u * h,
      l * w + o * x + q * z + y * h,
      d * w + e * x + f * z + g * h,
    ],
    [
      c * A + n * D + s * G + r * i,
      b * A + m * D + t * G + u * i,
      l * A + o * D + q * G + y * i,
      d * A + e * D + f * G + g * i,
    ],
    [
      c * F + n * E + s * B + r * j,
      b * F + m * E + t * B + u * j,
      l * F + o * E + q * B + y * j,
      d * F + e * E + f * B + g * j,
    ],
    [
      c * p + n * v + s * C + r * k,
      b * p + m * v + t * C + u * k,
      l * p + o * v + q * C + y * k,
      d * p + e * v + f * C + g * k,
    ],
  ];
};
o3djs.math.mulMatrixMatrix4 = null;
o3djs.math.rowMajor.mulMatrixMatrix = function (b, c) {
  for (
    var d = [], e = b.length, f = c[0].length, g = c.length, h = 0;
    h < e;
    ++h
  ) {
    for (var i = [], j = b[h], k = 0; k < f; ++k)
      for (var l = (i[k] = 0); l < g; ++l) i[k] += j[l] * c[l][k];
    d[h] = i;
  }
  return d;
};
o3djs.math.columnMajor.mulMatrixMatrix = function (b, c) {
  for (
    var d = [], e = c.length, f = b[0].length, g = b.length, h = 0;
    h < e;
    ++h
  ) {
    for (var i = [], j = c[h], k = 0; k < f; ++k)
      for (var l = (i[k] = 0); l < g; ++l) i[k] += j[l] * b[l][k];
    d[h] = i;
  }
  return d;
};
o3djs.math.mulMatrixMatrix = null;
o3djs.math.rowMajor.column = function (b, c) {
  for (var d = [], e = b.length, f = 0; f < e; ++f) d[f] = b[f][c];
  return d;
};
o3djs.math.columnMajor.column = function (b, c) {
  return b[c].slice();
};
o3djs.math.column = null;
o3djs.math.rowMajor.row = function (b, c) {
  return b[c].slice();
};
o3djs.math.columnMajor.row = function (b, c) {
  for (var d = [], e = b.length, f = 0; f < e; ++f) d[f] = b[f][c];
  return d;
};
o3djs.math.row = null;
o3djs.math.identity = function (b) {
  for (var c = [], d = 0; d < b; ++d) {
    c[d] = [];
    for (var e = 0; e < b; ++e) c[d][e] = e == d ? 1 : 0;
  }
  return c;
};
o3djs.math.transpose = function (b) {
  for (var c = [], d = b[0].length, e = b.length, f = 0; f < d; ++f) {
    c[f] = [];
    for (var g = 0; g < e; ++g) c[f][g] = b[g][f];
  }
  return c;
};
o3djs.math.trace = function (b) {
  for (var c = 0, d = b.length, e = 0; e < d; ++e) c += b[e][e];
  return c;
};
o3djs.math.det1 = function (b) {
  return b[0][0];
};
o3djs.math.det2 = function (b) {
  return b[0][0] * b[1][1] - b[0][1] * b[1][0];
};
o3djs.math.det3 = function (b) {
  return (
    b[2][2] * (b[0][0] * b[1][1] - b[0][1] * b[1][0]) -
    b[2][1] * (b[0][0] * b[1][2] - b[0][2] * b[1][0]) +
    b[2][0] * (b[0][1] * b[1][2] - b[0][2] * b[1][1])
  );
};
o3djs.math.det4 = function (b) {
  var c = b[0][0] * b[1][1] - b[0][1] * b[1][0],
    d = b[0][0] * b[1][2] - b[0][2] * b[1][0],
    e = b[0][0] * b[1][3] - b[0][3] * b[1][0],
    f = b[0][1] * b[1][2] - b[0][2] * b[1][1],
    g = b[0][1] * b[1][3] - b[0][3] * b[1][1],
    h = b[0][2] * b[1][3] - b[0][3] * b[1][2];
  return (
    b[3][3] * (b[2][2] * c - b[2][1] * d + b[2][0] * f) -
    b[3][2] * (b[2][3] * c - b[2][1] * e + b[2][0] * g) +
    b[3][1] * (b[2][3] * d - b[2][2] * e + b[2][0] * h) -
    b[3][0] * (b[2][3] * f - b[2][2] * g + b[2][1] * h)
  );
};
o3djs.math.inverse1 = function (b) {
  return [[1 / b[0][0]]];
};
o3djs.math.inverse2 = function (b) {
  var c = 1 / (b[0][0] * b[1][1] - b[0][1] * b[1][0]);
  return [
    [c * b[1][1], -c * b[0][1]],
    [-c * b[1][0], c * b[0][0]],
  ];
};
o3djs.math.inverse3 = function (b) {
  var c = b[1][1] * b[2][2] - b[1][2] * b[2][1],
    d = b[0][1] * b[2][2] - b[0][2] * b[2][1],
    e = b[0][1] * b[1][2] - b[0][2] * b[1][1],
    f = 1 / (b[0][0] * c - b[1][0] * d + b[2][0] * e);
  return [
    [f * c, -f * d, f * e],
    [
      -f * (b[1][0] * b[2][2] - b[1][2] * b[2][0]),
      f * (b[0][0] * b[2][2] - b[0][2] * b[2][0]),
      -f * (b[0][0] * b[1][2] - b[0][2] * b[1][0]),
    ],
    [
      f * (b[1][0] * b[2][1] - b[1][1] * b[2][0]),
      -f * (b[0][0] * b[2][1] - b[0][1] * b[2][0]),
      f * (b[0][0] * b[1][1] - b[0][1] * b[1][0]),
    ],
  ];
};
o3djs.math.inverse4 = function (b) {
  var c = b[2][2] * b[3][3],
    d = b[3][2] * b[2][3],
    e = b[1][2] * b[3][3],
    f = b[3][2] * b[1][3],
    g = b[1][2] * b[2][3],
    h = b[2][2] * b[1][3],
    i = b[0][2] * b[3][3],
    j = b[3][2] * b[0][3],
    k = b[0][2] * b[2][3],
    l = b[2][2] * b[0][3],
    n = b[0][2] * b[1][3],
    m = b[1][2] * b[0][3],
    o = b[2][0] * b[3][1],
    s = b[3][0] * b[2][1],
    t = b[1][0] * b[3][1],
    q = b[3][0] * b[1][1],
    r = b[1][0] * b[2][1],
    u = b[2][0] * b[1][1],
    y = b[0][0] * b[3][1],
    w = b[3][0] * b[0][1],
    x = b[0][0] * b[2][1],
    z = b[2][0] * b[0][1],
    A = b[0][0] * b[1][1],
    D = b[1][0] * b[0][1],
    G =
      c * b[1][1] +
      f * b[2][1] +
      g * b[3][1] -
      (d * b[1][1] + e * b[2][1] + h * b[3][1]),
    F =
      d * b[0][1] +
      i * b[2][1] +
      l * b[3][1] -
      (c * b[0][1] + j * b[2][1] + k * b[3][1]),
    E =
      e * b[0][1] +
      j * b[1][1] +
      n * b[3][1] -
      (f * b[0][1] + i * b[1][1] + m * b[3][1]),
    B =
      h * b[0][1] +
      k * b[1][1] +
      m * b[2][1] -
      (g * b[0][1] + l * b[1][1] + n * b[2][1]),
    p = 1 / (b[0][0] * G + b[1][0] * F + b[2][0] * E + b[3][0] * B);
  G = [p * G, p * F, p * E, p * B];
  c = [
    p *
      (d * b[1][0] +
        e * b[2][0] +
        h * b[3][0] -
        (c * b[1][0] + f * b[2][0] + g * b[3][0])),
    p *
      (c * b[0][0] +
        j * b[2][0] +
        k * b[3][0] -
        (d * b[0][0] + i * b[2][0] + l * b[3][0])),
    p *
      (f * b[0][0] +
        i * b[1][0] +
        m * b[3][0] -
        (e * b[0][0] + j * b[1][0] + n * b[3][0])),
    p *
      (g * b[0][0] +
        l * b[1][0] +
        n * b[2][0] -
        (h * b[0][0] + k * b[1][0] + m * b[2][0])),
  ];
  d = [
    p *
      (o * b[1][3] +
        q * b[2][3] +
        r * b[3][3] -
        (s * b[1][3] + t * b[2][3] + u * b[3][3])),
    p *
      (s * b[0][3] +
        y * b[2][3] +
        z * b[3][3] -
        (o * b[0][3] + w * b[2][3] + x * b[3][3])),
    p *
      (t * b[0][3] +
        w * b[1][3] +
        A * b[3][3] -
        (q * b[0][3] + y * b[1][3] + D * b[3][3])),
    p *
      (u * b[0][3] +
        x * b[1][3] +
        D * b[2][3] -
        (r * b[0][3] + z * b[1][3] + A * b[2][3])),
  ];
  b = [
    p *
      (t * b[2][2] +
        u * b[3][2] +
        s * b[1][2] -
        (r * b[3][2] + o * b[1][2] + q * b[2][2])),
    p *
      (x * b[3][2] +
        o * b[0][2] +
        w * b[2][2] -
        (y * b[2][2] + z * b[3][2] + s * b[0][2])),
    p *
      (y * b[1][2] +
        D * b[3][2] +
        q * b[0][2] -
        (A * b[3][2] + t * b[0][2] + w * b[1][2])),
    p *
      (A * b[2][2] +
        r * b[0][2] +
        z * b[1][2] -
        (x * b[1][2] + D * b[2][2] + u * b[0][2])),
  ];
  return [G, c, d, b];
};
o3djs.math.codet = function (b, c, d) {
  for (var e = b.length, f = [], g = 0, h = 0; h < e - 1; ++h) {
    g == c && g++;
    f[h] = [];
    for (var i = 0, j = 0; j < e - 1; ++j) {
      i == d && i++;
      f[h][j] = b[g][i];
      i++;
    }
    g++;
  }
  return o3djs.math.det(f);
};
o3djs.math.det = function (b) {
  var c = b.length;
  if (c <= 4) return o3djs.math["det" + c](b);
  c = 0;
  for (var d = 1, e = b[0], f = b.length, g = 0; g < f; g++) {
    c += d * e[g] * o3djs.math.codet(b, 0, g);
    d *= -1;
  }
  return c;
};
o3djs.math.inverse = function (b) {
  var c = b.length;
  if (c <= 4) return o3djs.math["inverse" + c](b);
  c = [];
  for (var d = b.length, e = 0; e < d; ++e) {
    c[e] = [];
    for (var f = 0; f < d; ++f)
      c[e][f] = ((f + e) % 2 ? -1 : 1) * o3djs.math.codet(b, f, e);
  }
  return o3djs.math.divMatrixScalar(c, o3djs.math.det(b));
};
o3djs.math.orthonormalize = function (b) {
  for (var c = [], d = b.length, e = 0; e < d; ++e) {
    for (var f = b[e], g = 0; g < e; ++g)
      f = o3djs.math.subVector(
        f,
        o3djs.math.mulScalarVector(o3djs.math.dot(c[g], b[e]), c[g])
      );
    c[e] = o3djs.math.normalize(f);
  }
  return c;
};
o3djs.math.matrix4.inverse = function (b) {
  return o3djs.math.inverse4(b);
};
o3djs.math.matrix4.mul = function (b, c) {
  return o3djs.math.mulMatrixMatrix4(b, c);
};
o3djs.math.matrix4.det = function (b) {
  return o3djs.math.det4(b);
};
o3djs.math.matrix4.copy = function (b) {
  return o3djs.math.copyMatrix(b);
};
o3djs.math.matrix4.setUpper3x3 = function (b, c) {
  var d = c[0],
    e = c[1];
  c = c[2];
  b[0].splice(0, 3, d[0], d[1], d[2]);
  b[1].splice(0, 3, e[0], e[1], e[2]);
  b[2].splice(0, 3, c[0], c[1], c[2]);
  return b;
};
o3djs.math.matrix4.getUpper3x3 = function (b) {
  return [b[0].slice(0, 3), b[1].slice(0, 3), b[2].slice(0, 3)];
};
o3djs.math.matrix4.setTranslation = function (b, c) {
  b[3].splice(0, 4, c[0], c[1], c[2], 1);
  return b;
};
o3djs.math.matrix4.getTranslation = function (b) {
  return b[3].slice(0, 3);
};
o3djs.math.matrix4.transformPoint = function (b, c) {
  var d = c[0],
    e = c[1];
  c = c[2];
  var f = b[0],
    g = b[1],
    h = b[2];
  b = b[3];
  var i = d * f[3] + e * g[3] + c * h[3] + b[3];
  return [
    (d * f[0] + e * g[0] + c * h[0] + b[0]) / i,
    (d * f[1] + e * g[1] + c * h[1] + b[1]) / i,
    (d * f[2] + e * g[2] + c * h[2] + b[2]) / i,
  ];
};
o3djs.math.matrix4.transformVector4 = function (b, c) {
  var d = c[0],
    e = c[1],
    f = c[2];
  c = c[3];
  var g = b[0],
    h = b[1],
    i = b[2];
  b = b[3];
  return [
    d * g[0] + e * h[0] + f * i[0] + c * b[0],
    d * g[1] + e * h[1] + f * i[1] + c * b[1],
    d * g[2] + e * h[2] + f * i[2] + c * b[2],
    d * g[3] + e * h[3] + f * i[3] + c * b[3],
  ];
};
o3djs.math.matrix4.transformDirection = function (b, c) {
  var d = c[0],
    e = c[1];
  c = c[2];
  var f = b[0],
    g = b[1];
  b = b[2];
  return [
    d * f[0] + e * g[0] + c * b[0],
    d * f[1] + e * g[1] + c * b[1],
    d * f[2] + e * g[2] + c * b[2],
  ];
};
o3djs.math.matrix4.transformNormal = function (b, c) {
  var d = o3djs.math.inverse4(b);
  b = c[0];
  var e = c[1];
  c = c[2];
  var f = d[0],
    g = d[1];
  d = d[2];
  return [
    b * f[0] + e * f[1] + c * f[2],
    b * g[0] + e * g[1] + c * g[2],
    b * d[0] + e * d[1] + c * d[2],
  ];
};
o3djs.math.matrix4.identity = function () {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
};
o3djs.math.matrix4.setIdentity = function (b) {
  for (var c = 0; c < 4; c++)
    for (var d = 0; d < 4; d++) b[c][d] = c == d ? 1 : 0;
  return b;
};
o3djs.math.matrix4.perspective = function (b, c, d, e) {
  b = Math.tan(0.5 * (Math.PI - b));
  var f = d - e;
  return [
    [b / c, 0, 0, 0],
    [0, b, 0, 0],
    [0, 0, e / f, -1],
    [0, 0, (d * e) / f, 0],
  ];
};
o3djs.math.matrix4.orthographic = function (b, c, d, e, f, g) {
  return [
    [2 / (c - b), 0, 0, 0],
    [0, 2 / (e - d), 0, 0],
    [0, 0, 1 / (f - g), 0],
    [(b + c) / (b - c), (d + e) / (d - e), f / (f - g), 1],
  ];
};
o3djs.math.matrix4.frustum = function (b, c, d, e, f, g) {
  var h = c - b,
    i = e - d,
    j = f - g;
  return [
    [(2 * f) / h, 0, 0, 0],
    [0, (2 * f) / i, 0, 0],
    [(b + c) / h, (e + d) / i, g / j, -1],
    [0, 0, (f * g) / j, 0],
  ];
};
o3djs.math.matrix4.lookAt = function (b, c, d) {
  c = o3djs.math.normalize(o3djs.math.subVector(b, c).slice(0, 3)).concat(0);
  d = o3djs.math.normalize(o3djs.math.cross(d, c)).concat(0);
  var e = o3djs.math.cross(c, d).concat(0);
  return o3djs.math.inverse([d, e, c, b.concat(1)]);
};
o3djs.math.matrix4.composition = function (b, c) {
  var d = b[0],
    e = b[1],
    f = b[2],
    g = b[3],
    h = c[0],
    i = c[1],
    j = c[2],
    k = c[3];
  c = d[0];
  b = d[1];
  var l = d[2];
  d = d[3];
  var n = e[0],
    m = e[1],
    o = e[2];
  e = e[3];
  var s = f[0],
    t = f[1],
    q = f[2];
  f = f[3];
  var r = g[0],
    u = g[1],
    y = g[2];
  g = g[3];
  var w = h[0],
    x = h[1],
    z = h[2];
  h = h[3];
  var A = i[0],
    D = i[1],
    G = i[2];
  i = i[3];
  var F = j[0],
    E = j[1],
    B = j[2];
  j = j[3];
  var p = k[0],
    v = k[1],
    C = k[2];
  k = k[3];
  return [
    [
      c * w + n * x + s * z + r * h,
      b * w + m * x + t * z + u * h,
      l * w + o * x + q * z + y * h,
      d * w + e * x + f * z + g * h,
    ],
    [
      c * A + n * D + s * G + r * i,
      b * A + m * D + t * G + u * i,
      l * A + o * D + q * G + y * i,
      d * A + e * D + f * G + g * i,
    ],
    [
      c * F + n * E + s * B + r * j,
      b * F + m * E + t * B + u * j,
      l * F + o * E + q * B + y * j,
      d * F + e * E + f * B + g * j,
    ],
    [
      c * p + n * v + s * C + r * k,
      b * p + m * v + t * C + u * k,
      l * p + o * v + q * C + y * k,
      d * p + e * v + f * C + g * k,
    ],
  ];
};
o3djs.math.matrix4.compose = function (b, c) {
  var d = b[0],
    e = b[1],
    f = b[2],
    g = b[3],
    h = c[0],
    i = c[1],
    j = c[2],
    k = c[3];
  c = d[0];
  var l = d[1],
    n = d[2];
  d = d[3];
  var m = e[0],
    o = e[1],
    s = e[2];
  e = e[3];
  var t = f[0],
    q = f[1],
    r = f[2];
  f = f[3];
  var u = g[0],
    y = g[1],
    w = g[2];
  g = g[3];
  var x = h[0],
    z = h[1],
    A = h[2];
  h = h[3];
  var D = i[0],
    G = i[1],
    F = i[2];
  i = i[3];
  var E = j[0],
    B = j[1],
    p = j[2];
  j = j[3];
  var v = k[0],
    C = k[1],
    H = k[2];
  k = k[3];
  b[0].splice(
    0,
    4,
    c * x + m * z + t * A + u * h,
    l * x + o * z + q * A + y * h,
    n * x + s * z + r * A + w * h,
    d * x + e * z + f * A + g * h
  );
  b[1].splice(
    0,
    4,
    c * D + m * G + t * F + u * i,
    l * D + o * G + q * F + y * i,
    n * D + s * G + r * F + w * i,
    d * D + e * G + f * F + g * i
  );
  b[2].splice(
    0,
    4,
    c * E + m * B + t * p + u * j,
    l * E + o * B + q * p + y * j,
    n * E + s * B + r * p + w * j,
    d * E + e * B + f * p + g * j
  ),
    b[3].splice(
      0,
      4,
      c * v + m * C + t * H + u * k,
      l * v + o * C + q * H + y * k,
      n * v + s * C + r * H + w * k,
      d * v + e * C + f * H + g * k
    );
  return b;
};
o3djs.math.matrix4.translation = function (b) {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [b[0], b[1], b[2], 1],
  ];
};
o3djs.math.matrix4.translate = function (b, c) {
  var d = c[0],
    e = c[1];
  c = c[2];
  var f = b[0],
    g = b[1],
    h = b[2],
    i = b[3],
    j = f[0],
    k = f[1],
    l = f[2];
  f = f[3];
  var n = g[0],
    m = g[1],
    o = g[2];
  g = g[3];
  var s = h[0],
    t = h[1],
    q = h[2];
  h = h[3];
  var r = i[0],
    u = i[1],
    y = i[2],
    w = i[3];
  i.splice(
    0,
    4,
    j * d + n * e + s * c + r,
    k * d + m * e + t * c + u,
    l * d + o * e + q * c + y,
    f * d + g * e + h * c + w
  );
  return b;
};
o3djs.math.matrix4.scaling = function (b) {
  return [
    [b[0], 0, 0, 0],
    [0, b[1], 0, 0],
    [0, 0, b[2], 0],
    [0, 0, 0, 1],
  ];
};
o3djs.math.matrix4.scale = function (b, c) {
  var d = c[0],
    e = c[1];
  c = c[2];
  var f = b[0],
    g = b[1],
    h = b[2];
  f.splice(0, 4, d * f[0], d * f[1], d * f[2], d * f[3]);
  g.splice(0, 4, e * g[0], e * g[1], e * g[2], e * g[3]);
  h.splice(0, 4, c * h[0], c * h[1], c * h[2], c * h[3]);
  return b;
};
o3djs.math.matrix4.rotationX = function (b) {
  var c = Math.cos(b);
  b = Math.sin(b);
  return [
    [1, 0, 0, 0],
    [0, c, b, 0],
    [0, -b, c, 0],
    [0, 0, 0, 1],
  ];
};
o3djs.math.matrix4.rotateX = function (b, c) {
  var d = b[1],
    e = b[2],
    f = d[0],
    g = d[1],
    h = d[2],
    i = d[3],
    j = e[0],
    k = e[1],
    l = e[2],
    n = e[3],
    m = Math.cos(c);
  c = Math.sin(c);
  d.splice(0, 4, m * f + c * j, m * g + c * k, m * h + c * l, m * i + c * n);
  e.splice(0, 4, m * j - c * f, m * k - c * g, m * l - c * h, m * n - c * i);
  return b;
};
o3djs.math.matrix4.rotationY = function (b) {
  var c = Math.cos(b);
  b = Math.sin(b);
  return [
    [c, 0, -b, 0],
    [0, 1, 0, 0],
    [b, 0, c, 0],
    [0, 0, 0, 1],
  ];
};
o3djs.math.matrix4.rotateY = function (b, c) {
  var d = b[0],
    e = b[2],
    f = d[0],
    g = d[1],
    h = d[2],
    i = d[3],
    j = e[0],
    k = e[1],
    l = e[2],
    n = e[3],
    m = Math.cos(c);
  c = Math.sin(c);
  d.splice(0, 4, m * f - c * j, m * g - c * k, m * h - c * l, m * i - c * n);
  e.splice(0, 4, m * j + c * f, m * k + c * g, m * l + c * h, m * n + c * i);
  return b;
};
o3djs.math.matrix4.rotationZ = function (b) {
  var c = Math.cos(b);
  b = Math.sin(b);
  return [
    [c, b, 0, 0],
    [-b, c, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
};
o3djs.math.matrix4.rotateZ = function (b, c) {
  var d = b[0],
    e = b[1],
    f = d[0],
    g = d[1],
    h = d[2],
    i = d[3],
    j = e[0],
    k = e[1],
    l = e[2],
    n = e[3],
    m = Math.cos(c);
  c = Math.sin(c);
  d.splice(0, 4, m * f + c * j, m * g + c * k, m * h + c * l, m * i + c * n);
  e.splice(0, 4, m * j - c * f, m * k - c * g, m * l - c * h, m * n - c * i);
  return b;
};
o3djs.math.matrix4.rotationZYX = function (b) {
  var c = Math.sin(b[0]),
    d = Math.cos(b[0]),
    e = Math.sin(b[1]),
    f = Math.cos(b[1]),
    g = Math.sin(b[2]);
  b = Math.cos(b[2]);
  var h = b * e,
    i = g * e;
  return [
    [b * f, g * f, -e, 0],
    [h * c - g * d, i * c + b * d, f * c, 0],
    [h * d + g * c, i * d - b * c, f * d, 0],
    [0, 0, 0, 1],
  ];
};
o3djs.math.matrix4.rotateZYX = function (b, c) {
  var d = Math.sin(c[0]),
    e = Math.cos(c[0]),
    f = Math.sin(c[1]),
    g = Math.cos(c[1]),
    h = Math.sin(c[2]),
    i = Math.cos(c[2]),
    j = i * f,
    k = h * f;
  c = i * g;
  var l = h * g;
  f = -f;
  var n = j * d - h * e,
    m = k * d + i * e,
    o = g * d;
  h = j * e + h * d;
  d = k * e - i * d;
  e = g * e;
  g = b[0];
  i = b[1];
  k = b[2];
  j = g[0];
  var s = g[1],
    t = g[2],
    q = g[3],
    r = i[0],
    u = i[1],
    y = i[2],
    w = i[3],
    x = k[0],
    z = k[1],
    A = k[2],
    D = k[3];
  g.splice(
    0,
    4,
    c * j + l * r + f * x,
    c * s + l * u + f * z,
    c * t + l * y + f * A,
    c * q + l * w + f * D
  );
  i.splice(
    0,
    4,
    n * j + m * r + o * x,
    n * s + m * u + o * z,
    n * t + m * y + o * A,
    n * q + m * w + o * D
  );
  k.splice(
    0,
    4,
    h * j + d * r + e * x,
    h * s + d * u + e * z,
    h * t + d * y + e * A,
    h * q + d * w + e * D
  );
  return b;
};
o3djs.math.matrix4.axisRotation = function (b, c) {
  var d = b[0],
    e = b[1];
  b = b[2];
  var f = Math.sqrt(d * d + e * e + b * b);
  d /= f;
  e /= f;
  b /= f;
  f = d * d;
  var g = e * e,
    h = b * b,
    i = Math.cos(c);
  c = Math.sin(c);
  var j = 1 - i;
  return [
    [f + (1 - f) * i, d * e * j + b * c, d * b * j - e * c, 0],
    [d * e * j - b * c, g + (1 - g) * i, e * b * j + d * c, 0],
    [d * b * j + e * c, e * b * j - d * c, h + (1 - h) * i, 0],
    [0, 0, 0, 1],
  ];
};
o3djs.math.matrix4.axisRotate = function (b, c, d) {
  var e = c[0],
    f = c[1],
    g = c[2];
  c = Math.sqrt(e * e + f * f + g * g);
  e /= c;
  f /= c;
  g /= c;
  c = e * e;
  var h = f * f,
    i = g * g,
    j = Math.cos(d),
    k = Math.sin(d),
    l = 1 - j;
  d = c + (1 - c) * j;
  c = e * f * l + g * k;
  var n = e * g * l - f * k,
    m = e * f * l - g * k;
  h = h + (1 - h) * j;
  var o = f * g * l + e * k,
    s = e * g * l + f * k;
  e = f * g * l - e * k;
  f = i + (1 - i) * j;
  g = b[0];
  i = b[1];
  j = b[2];
  k = g[0];
  l = g[1];
  var t = g[2],
    q = g[3],
    r = i[0],
    u = i[1],
    y = i[2],
    w = i[3],
    x = j[0],
    z = j[1],
    A = j[2],
    D = j[3];
  g.splice(
    0,
    4,
    d * k + c * r + n * x,
    d * l + c * u + n * z,
    d * t + c * y + n * A,
    d * q + c * w + n * D
  );
  i.splice(
    0,
    4,
    m * k + h * r + o * x,
    m * l + h * u + o * z,
    m * t + h * y + o * A,
    m * q + h * w + o * D
  );
  j.splice(
    0,
    4,
    s * k + e * r + f * x,
    s * l + e * u + f * z,
    s * t + e * y + f * A,
    s * q + e * w + f * D
  );
  return b;
};
o3djs.math.installRowMajorFunctions = function () {
  for (var b in o3djs.math.rowMajor) o3djs.math[b] = o3djs.math.rowMajor[b];
};
o3djs.math.installColumnMajorFunctions = function () {
  for (var b in o3djs.math.columnMajor)
    o3djs.math[b] = o3djs.math.columnMajor[b];
};
o3djs.math.installErrorCheckFunctions = function () {
  for (var b in o3djs.math.errorCheck) o3djs.math[b] = o3djs.math.errorCheck[b];
};
o3djs.math.installErrorCheckFreeFunctions = function () {
  for (var b in o3djs.math.errorCheckFree)
    o3djs.math[b] = o3djs.math.errorCheckFree[b];
};
o3djs.math.installRowMajorFunctions();
o3djs.math.installErrorCheckFunctions();
o3djs.provide("o3djs.pack");
o3djs.pack = o3djs.pack || {};
o3djs.pack.preparePack = function (b, c, d) {
  o3djs.material.prepareMaterials(b, c, d);
  o3djs.shape.prepareShapes(b);
};
o3djs.provide("o3djs.particles");
o3djs.particles = o3djs.particles || {};
o3djs.particles.ParticleStateIds = {
  BLEND: 0,
  ADD: 1,
  BLEND_PREMULTIPLY: 2,
  BLEND_NO_ALPHA: 3,
  SUBTRACT: 4,
  INVERSE: 5,
};
o3djs.particles.FX_STRINGS = [
  {
    name: "particle3d",
    fxString:
      "float4x4 worldViewProjection : WORLDVIEWPROJECTION;\nfloat4x4 world : WORLD;\nfloat3 worldVelocity;\nfloat3 worldAcceleration;\nfloat timeRange;\nfloat time;\nfloat timeOffset;\nfloat frameDuration;\nfloat numFrames;\n\n// We need to implement 1D!\nsampler rampSampler;\nsampler colorSampler;\n\nstruct VertexShaderInput {\n  float4 uvLifeTimeFrameStart : POSITION; // uv, lifeTime, frameStart\n  float4 positionStartTime : TEXCOORD0;    // position.xyz, startTime\n  float4 velocityStartSize : TEXCOORD1;   // velocity.xyz, startSize\n  float4 accelerationEndSize : TEXCOORD2; // acceleration.xyz, endSize\n  float4 spinStartSpinSpeed : TEXCOORD3;  // spinStart.x, spinSpeed.y\n  float4 orientation : TEXCOORD4;  // orientation\n  float4 colorMult : COLOR; //\n};\n\nstruct PixelShaderInput {\n  float4 position : POSITION;\n  float2 texcoord : TEXCOORD0;\n  float1 percentLife : TEXCOORD1;\n  float4 colorMult: TEXCOORD2;\n};\n\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n\n  float2 uv = input.uvLifeTimeFrameStart.xy;\n  float lifeTime = input.uvLifeTimeFrameStart.z;\n  float frameStart = input.uvLifeTimeFrameStart.w;\n  float3 position = input.positionStartTime.xyz;\n  float startTime = input.positionStartTime.w;\n  float3 velocity = mul(float4(input.velocityStartSize.xyz, 0),\n                        world).xyz + worldVelocity;\n  float startSize = input.velocityStartSize.w;\n  float3 acceleration = mul(float4(input.accelerationEndSize.xyz, 0),\n                            world).xyz + worldAcceleration;\n  float endSize = input.accelerationEndSize.w;\n  float spinStart = input.spinStartSpinSpeed.x;\n  float spinSpeed = input.spinStartSpinSpeed.y;\n\n  float localTime = fmod((time - timeOffset - startTime), timeRange);\n  float percentLife = localTime / lifeTime;\n\n  float frame = fmod(floor(localTime / frameDuration + frameStart),\n                     numFrames);\n  float uOffset = frame / numFrames;\n  float u = uOffset + (uv.x + 0.5) * (1 / numFrames);\n\n  output.texcoord = float2(u, uv.y + 0.5);\n  output.colorMult = input.colorMult;\n\n  float size = lerp(startSize, endSize, percentLife);\n  size = (percentLife < 0 || percentLife > 1) ? 0 : size;\n  float s = sin(spinStart + spinSpeed * localTime);\n  float c = cos(spinStart + spinSpeed * localTime);\n\n  float4 rotatedPoint = float4((uv.x * c + uv.y * s) * size, 0,\n                               (uv.x * s - uv.y * c) * size, 1);\n  float3 center = velocity * localTime +\n                  acceleration * localTime * localTime + \n                  position;\n  \n      float4 q2 = input.orientation + input.orientation;\n      float4 qx = input.orientation.xxxw * q2.xyzx;\n      float4 qy = input.orientation.xyyw * q2.xyzy;\n      float4 qz = input.orientation.xxzw * q2.xxzz;\n  \n      float4x4 localMatrix = float4x4(\n        (1.0f - qy.y) - qz.z, \n        qx.y + qz.w, \n        qx.z - qy.w,\n        0,\n  \n        qx.y - qz.w, \n        (1.0f - qx.x) - qz.z, \n        qy.z + qx.w,\n        0,\n  \n        qx.z + qy.w, \n        qy.z - qx.w, \n        (1.0f - qx.x) - qy.y,\n        0,\n  \n        center.x, center.y, center.z, 1);\n  rotatedPoint = mul(rotatedPoint, localMatrix);\n  output.position = mul(rotatedPoint, worldViewProjection);\n  output.percentLife = percentLife;\n  return output;\n}\n\nfloat4 pixelShaderFunction(PixelShaderInput input): COLOR {\n  float4 colorMult = tex2D(rampSampler, \n                           float2(input.percentLife, 0.5)) *\n                     input.colorMult;\n  float4 color = tex2D(colorSampler, input.texcoord) * colorMult;\n  return color;\n}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n",
  },
  {
    name: "particle2d",
    fxString:
      "float4x4 viewProjection : VIEWPROJECTION;\nfloat4x4 world : WORLD;\nfloat4x4 viewInverse : VIEWINVERSE;\nfloat3 worldVelocity;\nfloat3 worldAcceleration;\nfloat timeRange;\nfloat time;\nfloat timeOffset;\nfloat frameDuration;\nfloat numFrames;\n\n// We need to implement 1D!\nsampler rampSampler;\nsampler colorSampler;\n\nstruct VertexShaderInput {\n  float4 uvLifeTimeFrameStart : POSITION; // uv, lifeTime, frameStart\n  float4 positionStartTime : TEXCOORD0;    // position.xyz, startTime\n  float4 velocityStartSize : TEXCOORD1;   // velocity.xyz, startSize\n  float4 accelerationEndSize : TEXCOORD2; // acceleration.xyz, endSize\n  float4 spinStartSpinSpeed : TEXCOORD3;  // spinStart.x, spinSpeed.y\n  float4 colorMult : COLOR; //\n};\n\nstruct PixelShaderInput {\n  float4 position : POSITION;\n  float2 texcoord : TEXCOORD0;\n  float1 percentLife : TEXCOORD1;\n  float4 colorMult: TEXCOORD2;\n};\n\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n\n  float2 uv = input.uvLifeTimeFrameStart.xy;\n  float lifeTime = input.uvLifeTimeFrameStart.z;\n  float frameStart = input.uvLifeTimeFrameStart.w;\n  float3 position = input.positionStartTime.xyz;\n  float startTime = input.positionStartTime.w;\n  float3 velocity = mul(float4(input.velocityStartSize.xyz, 0),\n                        world).xyz + worldVelocity;\n  float startSize = input.velocityStartSize.w;\n  float3 acceleration = mul(float4(input.accelerationEndSize.xyz, 0),\n                            world).xyz + worldAcceleration;\n  float endSize = input.accelerationEndSize.w;\n  float spinStart = input.spinStartSpinSpeed.x;\n  float spinSpeed = input.spinStartSpinSpeed.y;\n\n  float localTime = fmod((time - timeOffset - startTime), timeRange);\n  float percentLife = localTime / lifeTime;\n\n  float frame = fmod(floor(localTime / frameDuration + frameStart),\n                     numFrames);\n  float uOffset = frame / numFrames;\n  float u = uOffset + (uv.x + 0.5) * (1 / numFrames);\n\n  output.texcoord = float2(u, uv.y + 0.5);\n  output.colorMult = input.colorMult;\n\n  float3 basisX = viewInverse[0].xyz;\n  float3 basisZ = viewInverse[1].xyz;\n\n  float size = lerp(startSize, endSize, percentLife);\n  size = (percentLife < 0 || percentLife > 1) ? 0 : size;\n  float s = sin(spinStart + spinSpeed * localTime);\n  float c = cos(spinStart + spinSpeed * localTime);\n\n  float2 rotatedPoint = float2(uv.x * c + uv.y * s, \n                               -uv.x * s + uv.y * c);\n  float3 localPosition = float3(basisX * rotatedPoint.x +\n                                basisZ * rotatedPoint.y) * size +\n                         velocity * localTime +\n                         acceleration * localTime * localTime + \n                         position;\n\n  output.position = mul(float4(localPosition + world[3].xyz, 1), \n                        viewProjection);\n  output.percentLife = percentLife;\n  return output;\n}\n\nfloat4 pixelShaderFunction(PixelShaderInput input): COLOR {\n  float4 colorMult = tex2D(rampSampler, \n                           float2(input.percentLife, 0.5)) *\n                     input.colorMult;\n  float4 color = tex2D(colorSampler, input.texcoord) * colorMult;\n  return color;\n}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n",
  },
];
o3djs.particles.CORNERS_ = [
  [-0.5, -0.5],
  [+0.5, -0.5],
  [+0.5, +0.5],
  [-0.5, +0.5],
];
o3djs.particles.createParticleSystem = function (b, c, d, e) {
  return new o3djs.particles.ParticleSystem(b, c, d, e);
};
o3djs.particles.ParticleSystem = function (b, c, d, e) {
  for (
    var f = o3djs.base.o3d, g = [], h = [], i = 0;
    i < o3djs.particles.FX_STRINGS.length;
    ++i
  ) {
    var j = o3djs.particles.FX_STRINGS[i],
      k = b.createObject("Effect");
    k.name = j.name;
    k.loadFromFXString(j.fxString);
    h.push(k);
  }
  i = {};
  i[o3djs.particles.ParticleStateIds.BLEND] = {
    SourceBlendFunction: o3djs.base.o3d.State.BLENDFUNC_SOURCE_ALPHA,
    DestinationBlendFunction:
      o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_ALPHA,
  };
  i[o3djs.particles.ParticleStateIds.ADD] = {
    SourceBlendFunction: o3djs.base.o3d.State.BLENDFUNC_SOURCE_ALPHA,
    DestinationBlendFunction: o3djs.base.o3d.State.BLENDFUNC_ONE,
  };
  i[o3djs.particles.ParticleStateIds.BLEND_PREMULTIPLY] = {
    SourceBlendFunction: o3djs.base.o3d.State.BLENDFUNC_ONE,
    DestinationBlendFunction:
      o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_ALPHA,
  };
  i[o3djs.particles.ParticleStateIds.BLEND_NO_ALPHA] = {
    SourceBlendFunction: o3djs.base.o3d.State.BLENDFUNC_SOURCE_COLOR,
    DestinationBlendFunction:
      o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_COLOR,
  };
  i[o3djs.particles.ParticleStateIds.SUBTRACT] = {
    SourceBlendFunction: o3djs.base.o3d.State.BLENDFUNC_SOURCE_ALPHA,
    DestinationBlendFunction:
      o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_ALPHA,
    BlendEquation: o3djs.base.o3d.State.BLEND_REVERSE_SUBTRACT,
  };
  i[o3djs.particles.ParticleStateIds.INVERSE] = {
    SourceBlendFunction:
      o3djs.base.o3d.State.BLENDFUNC_INVERSE_DESTINATION_COLOR,
    DestinationBlendFunction:
      o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_COLOR,
  };
  for (var l in o3djs.particles.ParticleStateIds) {
    k = b.createObject("State");
    j = o3djs.particles.ParticleStateIds[l];
    g[j] = k;
    k.getStateParam("ZWriteEnable").value = false;
    k.getStateParam("CullMode").value = f.State.CULL_NONE;
    j = i[j];
    for (var n in j) k.getStateParam(n).value = j[n];
  }
  l = b.createTexture2D(8, 8, f.Texture.ARGB8, 1, false);
  n = [0, 0.2, 0.7, 1, 0.7, 0.2, 0, 0];
  j = [];
  for (i = 0; i < 8; ++i)
    for (k = 0; k < 8; ++k) {
      var m = n[k] * n[i];
      j.push(m, m, m, m);
    }
  l.set(0, j);
  f = b.createTexture2D(3, 1, f.Texture.ARGB8, 1, false);
  f.set(0, [1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 0]);
  if (!d) {
    this.counter_ = b.createObject("SecondCounter");
    d = this.counter_.getParam("count");
  }
  this.randomFunction_ =
    e ||
    function () {
      return Math.random();
    };
  this.particleStates = g;
  this.clockParam = d;
  this.pack = b;
  this.viewInfo = c;
  this.effects = h;
  this.defaultColorTexture = l;
  this.defaultRampTexture = f;
};
o3djs.particles.ParticleSpec = function () {
  this.frameDuration = this.numFrames = this.numParticles = 1;
  this.frameStartRange = this.frameStart = 0;
  this.timeRange = 99999999;
  this.startTime = null;
  this.lifeTime = 1;
  this.lifeTimeRange = 0;
  this.startSize = 1;
  this.startSizeRange = 0;
  this.endSize = 1;
  this.endSizeRange = 0;
  this.position = [0, 0, 0];
  this.positionRange = [0, 0, 0];
  this.velocity = [0, 0, 0];
  this.velocityRange = [0, 0, 0];
  this.acceleration = [0, 0, 0];
  this.accelerationRange = [0, 0, 0];
  this.spinSpeedRange =
    this.spinSpeed =
    this.spinStartRange =
    this.spinStart =
      0;
  this.colorMult = [1, 1, 1, 1];
  this.colorMultRange = [0, 0, 0, 0];
  this.worldVelocity = [0, 0, 0];
  this.worldAcceleration = [0, 0, 0];
  this.billboard = true;
  this.orientation = [0, 0, 0, 1];
};
o3djs.particles.ParticleSystem.prototype.createParticleEmitter = function (
  b,
  c
) {
  return new o3djs.particles.ParticleEmitter(this, b, c);
};
o3djs.particles.ParticleSystem.prototype.createTrail = function (
  b,
  c,
  d,
  e,
  f,
  g
) {
  return new o3djs.particles.Trail(this, b, c, d, e, f, g);
};
o3djs.particles.ParticleEmitter = function (b, c, d) {
  d = d || b.clockParam;
  var e = o3djs.base.o3d,
    f = b.pack,
    g = b.viewInfo,
    h = f.createObject("Material");
  h.name = "particles";
  h.drawList = g.zOrderedDrawList;
  h.effect = b.effects[1];
  b.effects[1].createUniformParameters(h);
  h.getParam("time").bind(d);
  g = f.createObject("Sampler");
  g.texture = b.defaultRampTexture;
  g.addressModeU = e.Sampler.CLAMP;
  var i = f.createObject("Sampler");
  i.texture = c || b.defaultColorTexture;
  i.addressModeU = e.Sampler.CLAMP;
  i.addressModeV = e.Sampler.CLAMP;
  h.getParam("rampSampler").value = g;
  h.getParam("colorSampler").value = i;
  c = f.createObject("VertexBuffer");
  var j = c.createField("FloatField", 4),
    k = c.createField("FloatField", 4),
    l = c.createField("FloatField", 4),
    n = c.createField("FloatField", 4),
    m = c.createField("FloatField", 4),
    o = c.createField("FloatField", 4),
    s = c.createField("FloatField", 4),
    t = f.createObject("IndexBuffer"),
    q = f.createObject("StreamBank");
  q.setVertexStream(e.Stream.POSITION, 0, j, 0);
  q.setVertexStream(e.Stream.TEXCOORD, 0, k, 0);
  q.setVertexStream(e.Stream.TEXCOORD, 1, l, 0);
  q.setVertexStream(e.Stream.TEXCOORD, 2, n, 0);
  q.setVertexStream(e.Stream.TEXCOORD, 3, m, 0);
  q.setVertexStream(e.Stream.TEXCOORD, 4, o, 0);
  q.setVertexStream(e.Stream.COLOR, 0, s, 0);
  var r = f.createObject("Shape"),
    u = f.createObject("Primitive");
  u.material = h;
  u.owner = r;
  u.streamBank = q;
  u.indexBuffer = t;
  u.primitiveType = e.Primitive.TRIANGLELIST;
  u.createDrawElement(f, null);
  this.vertexBuffer_ = c;
  this.uvLifeTimeFrameStartField_ = j;
  this.positionStartTimeField_ = k;
  this.velocityStartSizeField_ = l;
  this.accelerationEndSizeField_ = n;
  this.spinStartSpinSpeedField_ = m;
  this.orientationField_ = o;
  this.colorMultField_ = s;
  this.indexBuffer_ = t;
  this.streamBank_ = q;
  this.primitive_ = u;
  this.rampSampler_ = g;
  this.rampTexture_ = b.defaultRampTexture;
  this.colorSampler_ = i;
  this.particleSystem = b;
  this.shape = r;
  this.material = h;
  this.clockParam = d;
};
a = o3djs.particles.ParticleEmitter.prototype;
a.setState = function (b) {
  this.material.state = this.particleSystem.particleStates[b];
};
a.setColorRamp = function (b) {
  var c = b.length / 4;
  if (c % 1 != 0) throw "colorRamp must have multiple of 4 entries";
  if (this.rampTexture_ == this.particleSystem.defaultRampTexture)
    this.rampTexture_ = null;
  if (this.rampTexture_ && this.rampTexture_.width != c) {
    this.particleSystem.pack.removeObject(this.rampTexture_);
    this.rampTexture_ = null;
  }
  if (!this.rampTexture_)
    this.rampTexture_ = this.particleSystem.pack.createTexture2D(
      c,
      1,
      o3djs.base.o3d.Texture.ARGB8,
      1,
      false
    );
  this.rampTexture_.set(0, b);
  this.rampSampler_.texture = this.rampTexture_;
};
a.validateParameters = function (b) {
  var c = new o3djs.particles.ParticleSpec();
  for (var d in b)
    if (typeof c[d] === "undefined")
      throw 'unknown particle parameter "' + d + '"';
  for (d in c) if (typeof b[d] === "undefined") b[d] = c[d];
};
a.createParticles_ = function (b, c, d, e) {
  var f = this.uvLifeTimeFrameStart_,
    g = this.positionStartTime_,
    h = this.velocityStartSize_,
    i = this.accelerationEndSize_,
    j = this.spinStartSpinSpeed_,
    k = this.orientation_,
    l = this.colorMults_;
  this.material.effect = this.particleSystem.effects[d.billboard ? 1 : 0];
  this.material.getParam("timeRange").value = d.timeRange;
  this.material.getParam("numFrames").value = d.numFrames;
  this.material.getParam("frameDuration").value = d.frameDuration;
  this.material.getParam("worldVelocity").value = d.worldVelocity;
  this.material.getParam("worldAcceleration").value = d.worldAcceleration;
  for (
    var n = this.particleSystem.randomFunction_,
      m = function (H) {
        return (n() - 0.5) * H * 2;
      },
      o = function (H) {
        for (var J = [], I = 0; I < H.length; ++I) J.push(m(H[I]));
        return J;
      },
      s = 0;
    s < c;
    ++s
  ) {
    e && e(s, d);
    for (
      var t = d.lifeTime,
        q = d.startTime === null ? (s * d.lifeTime) / c : d.startTime,
        r = d.frameStart + m(d.frameStartRange),
        u = o3djs.math.addVector(d.position, o(d.positionRange)),
        y = o3djs.math.addVector(d.velocity, o(d.velocityRange)),
        w = o3djs.math.addVector(d.acceleration, o(d.accelerationRange)),
        x = o3djs.math.addVector(d.colorMult, o(d.colorMultRange)),
        z = d.spinStart + m(d.spinStartRange),
        A = d.spinSpeed + m(d.spinSpeedRange),
        D = d.startSize + m(d.startSizeRange),
        G = d.endSize + m(d.endSizeRange),
        F = d.orientation,
        E = 0;
      E < 4;
      ++E
    ) {
      var B = (s * 4 + E) * 4,
        p = B + 1,
        v = B + 2,
        C = B + 3;
      f[B] = o3djs.particles.CORNERS_[E][0];
      f[p] = o3djs.particles.CORNERS_[E][1];
      f[v] = t;
      f[C] = r;
      g[B] = u[0];
      g[p] = u[1];
      g[v] = u[2];
      g[C] = q;
      h[B] = y[0];
      h[p] = y[1];
      h[v] = y[2];
      h[C] = D;
      i[B] = w[0];
      i[p] = w[1];
      i[v] = w[2];
      i[C] = G;
      j[B] = z;
      j[p] = A;
      j[v] = 0;
      j[C] = 0;
      k[B] = F[0];
      k[p] = F[1];
      k[v] = F[2];
      k[C] = F[3];
      l[B] = x[0];
      l[p] = x[1];
      l[v] = x[2];
      l[C] = x[3];
    }
  }
  b *= 4;
  this.uvLifeTimeFrameStartField_.setAt(b, f);
  this.positionStartTimeField_.setAt(b, g);
  this.velocityStartSizeField_.setAt(b, h);
  this.accelerationEndSizeField_.setAt(b, i);
  this.spinStartSpinSpeedField_.setAt(b, j);
  this.orientationField_.setAt(b, k);
  this.colorMultField_.setAt(b, l);
};
a.allocateParticles_ = function (b) {
  if (this.vertexBuffer_.numElements != b * 4) {
    this.vertexBuffer_.allocateElements(b * 4);
    for (var c = [], d = 0; d < b; ++d) {
      var e = d * 4;
      c.push(e + 0, e + 1, e + 2);
      c.push(e + 0, e + 2, e + 3);
    }
    this.indexBuffer_.set(c);
    this.uvLifeTimeFrameStart_ = [];
    this.positionStartTime_ = [];
    this.velocityStartSize_ = [];
    this.accelerationEndSize_ = [];
    this.spinStartSpinSpeed_ = [];
    this.orientation_ = [];
    this.colorMults_ = [];
  }
  this.primitive_.numberPrimitives = b * 2;
  this.primitive_.numberVertices = b * 4;
};
a.setParameters = function (b, c) {
  this.validateParameters(b);
  var d = b.numParticles;
  this.allocateParticles_(d);
  this.createParticles_(0, d, b, c);
};
a.createOneShot = function (b) {
  return new o3djs.particles.OneShot(this, b);
};
o3djs.particles.OneShot = function (b, c) {
  var d = b.particleSystem.pack;
  this.emitter_ = b;
  this.transform = d.createObject("Transform");
  this.transform.visible = false;
  this.transform.addShape(b.shape);
  this.timeOffsetParam_ = this.transform.createParam(
    "timeOffset",
    "ParamFloat"
  );
  c && this.setParent(c);
};
o3djs.particles.OneShot.prototype.setParent = function (b) {
  this.transform.parent = b;
};
o3djs.particles.OneShot.prototype.trigger = function (b, c) {
  c && this.setParent(c);
  if (b) {
    this.transform.identity();
    this.transform.translate(b);
  }
  this.transform.visible = true;
  this.timeOffsetParam_.value = this.emitter_.clockParam.value;
};
o3djs.particles.Trail = function (b, c, d, e, f, g, h) {
  o3djs.particles.ParticleEmitter.call(this, b, f, h);
  b = b.pack;
  this.allocateParticles_(d);
  this.validateParameters(e);
  this.parameters = e;
  this.perParticleParamSetter = g;
  this.birthIndex_ = 0;
  this.maxParticles_ = d;
  this.transform = b.createObject("Transform");
  this.transform.addShape(this.shape);
  this.transform.parent = c;
};
o3djs.base.inherit(o3djs.particles.Trail, o3djs.particles.ParticleEmitter);
o3djs.particles.Trail.prototype.birthParticles = function (b) {
  var c = this.parameters.numParticles;
  this.parameters.startTime = this.clockParam.value;
  for (
    this.parameters.position = b;
    this.birthIndex_ + c >= this.maxParticles_;

  ) {
    b = this.maxParticles_ - this.birthIndex_;
    this.createParticles_(
      this.birthIndex_,
      b,
      this.parameters,
      this.perParticleParamSetter
    );
    c -= b;
    this.birthIndex_ = 0;
  }
  this.createParticles_(
    this.birthIndex_,
    c,
    this.parameters,
    this.perParticleParamSetter
  );
  this.birthIndex_ += c;
};
o3djs.provide("o3djs.performance");
o3djs.performance = o3djs.performance || {};
o3djs.performance.createPerformanceMonitor = function (b, c, d, e, f) {
  return new o3djs.performance.PerformanceMonitor(b, c, d, e, f);
};
o3djs.performance.PerformanceMonitor = function (b, c, d, e, f) {
  f = f || {};
  this.increaseQuality = d;
  this.decreaseQuality = e;
  this.sampleCount = this.meanFrameTime = 0;
  this.minSamples = f.opt_minSamples || 60;
  this.damping = f.opt_damping || 120;
  this.delayCycles = f.opt_delayCycles || 2 * this.minSamples;
  this.targetFrameTimeMax_ = 1 / b;
  this.targetFrameTimeMin_ = 1 / c;
  this.scaleInput_ = 1 / this.minSamples;
  this.scaleMean_ = 1;
  this.delayCyclesLeft_ = 0;
  if (this.damping < this.minSamples)
    throw Error("Damping must be at least minSamples.");
};
o3djs.performance.PerformanceMonitor.Options = goog.typedef;
o3djs.performance.PerformanceMonitor.prototype.onRender = function (b) {
  var c = true;
  if (this.sampleCount < this.damping) {
    if (this.sampleCount >= this.minSamples) {
      this.scaleInput_ = 1 / (this.sampleCount + 1);
      this.scaleMean_ = this.sampleCount * this.scaleInput_;
    } else c = false;
    this.sampleCount += 1;
  }
  this.meanFrameTime =
    this.meanFrameTime * this.scaleMean_ + b * this.scaleInput_;
  if (this.delayCyclesLeft_ > 0) this.delayCyclesLeft_ -= 1;
  else if (c)
    if (this.meanFrameTime < this.targetFrameTimeMin_) {
      this.increaseQuality();
      this.delayCyclesLeft_ = this.delayCycles;
    } else if (this.meanFrameTime > this.targetFrameTimeMax_) {
      this.decreaseQuality();
      this.delayCyclesLeft_ = this.delayCycles;
    }
};
o3djs.provide("o3djs.picking");
o3djs.picking = o3djs.picking || {};
o3djs.picking.Ray = goog.typedef;
o3djs.picking.createPickInfo = function (b, c, d, e) {
  return new o3djs.picking.PickInfo(b, c, d, e);
};
o3djs.picking.createShapeInfo = function (b, c) {
  return new o3djs.picking.ShapeInfo(b, c);
};
o3djs.picking.createTransformInfo = function (b, c) {
  return new o3djs.picking.TransformInfo(b, c);
};
o3djs.picking.clientPositionToWorldRayEx = function (b, c, d, e, f, g) {
  d = o3djs.math.inverse(o3djs.math.matrix4.composition(e, d));
  b = b / (f * 0.5) - 1;
  c = -(c / (g * 0.5) - 1);
  return {
    near: o3djs.math.matrix4.transformPoint(d, [b, c, 0]),
    far: o3djs.math.matrix4.transformPoint(d, [b, c, 1]),
  };
};
o3djs.picking.clientPositionToWorldRay = function (b, c, d, e, f) {
  return o3djs.picking.clientPositionToWorldRayEx(
    b,
    c,
    d.view,
    d.projection,
    e,
    f
  );
};
o3djs.picking.dprint = function () {};
o3djs.picking.dprintPoint3 = function () {};
o3djs.picking.dprintBoundingBox = function () {};
o3djs.picking.dumpRayIntersectionInfo = function (b, c) {
  o3djs.picking.dprint(
    b + " : valid = " + c.valid + " : intersected = " + c.intersected
  );
  c.intersected &&
    o3djs.picking.dprint(
      " : pos: " +
        c.position[0] +
        ", " +
        c.position[1] +
        ", " +
        c.position[2] +
        ", "
    );
  o3djs.picking.dprint("\n");
};
o3djs.picking.PickInfo = function (b, c, d, e) {
  this.element = b;
  this.shapeInfo = c;
  this.rayIntersectionInfo = d;
  this.worldIntersectionPosition = e;
};
o3djs.picking.ShapeInfo = function (b, c) {
  this.shape = b;
  this.parent = c;
  this.boundingBox = null;
  this.update();
};
o3djs.picking.ShapeInfo.prototype.getBoundingBox = function () {
  return this.boundingBox;
};
o3djs.picking.ShapeInfo.prototype.update = function () {
  var b = this.shape.elements;
  if (b.length > 0) {
    this.boundingBox = b[0].getBoundingBox(0);
    for (var c = 1; c < b.length; c++)
      this.boundingBox = this.boundingBox.add(b[c].getBoundingBox(0));
  }
};
o3djs.picking.ShapeInfo.prototype.pick = function (b) {
  var c = this.parent.transform.getUpdatedWorldMatrix(),
    d = o3djs.math.inverse(c),
    e = o3djs.math.matrix4.transformPoint(d, b.near),
    f = o3djs.math.matrix4.transformPoint(d, b.far);
  b = this.boundingBox.intersectRay(e, f);
  o3djs.picking.dumpRayIntersectionInfo("SHAPE(box): " + this.shape.name, b);
  if (b.intersected)
    for (var g = this.shape.elements, h = 0; h < g.length; h++) {
      d = g[h];
      b = d.intersectRay(0, o3djs.base.o3d.State.CULL_CCW, e, f);
      o3djs.picking.dumpRayIntersectionInfo(
        "SHAPE(tris): " + this.shape.name + " : element " + d.name,
        b
      );
      if (b.intersected) {
        c = o3djs.math.matrix4.transformPoint(c, b.position);
        return o3djs.picking.createPickInfo(d, this, b, c);
      }
    }
  return null;
};
o3djs.picking.ShapeInfo.prototype.dump = function (b) {
  o3djs.picking.dprint(b + "SHAPE: " + this.shape.name + "\n");
  o3djs.picking.dprintPoint3("bb min", this.boundingBox.minExtent, b + "    ");
  o3djs.picking.dprintPoint3("bb max", this.boundingBox.maxExtent, b + "    ");
};
o3djs.picking.TransformInfo = function (b, c) {
  this.childTransformInfos = {};
  this.shapeInfos = {};
  this.transform = b;
  this.parent = c;
  this.boundingBox = null;
};
o3djs.picking.TransformInfo.prototype.getBoundingBox = function () {
  return this.boundingBox;
};
o3djs.picking.TransformInfo.prototype.update = function () {
  for (
    var b = {}, c = {}, d = this.transform.children, e = 0;
    e < d.length;
    e++
  ) {
    var f = d[e],
      g = this.childTransformInfos[f.clientId];
    if (g) g.boundingBox = null;
    else g = o3djs.picking.createTransformInfo(f, this);
    g.update();
    b[f.clientId] = g;
  }
  d = this.transform.shapes;
  for (e = 0; e < d.length; e++) {
    f = d[e];
    (g = this.shapeInfos[f.clientId]) ||
      (g = o3djs.picking.createShapeInfo(f, this));
    c[f.clientId] = g;
  }
  this.childTransformInfos = b;
  this.shapeInfos = c;
  d = null;
  for (var h in c) {
    g = c[h];
    g = g.getBoundingBox().mul(this.transform.localMatrix);
    if (d) {
      if (g) d = d.add(g);
    } else d = g;
  }
  for (h in b) {
    g = b[h];
    if ((g = g.getBoundingBox()))
      d = d
        ? d.add(g.mul(this.transform.localMatrix))
        : g.mul(this.transform.localMatrix);
  }
  this.boundingBox = d;
};
o3djs.picking.TransformInfo.prototype.pick = function (b) {
  if (this.boundingBox) {
    var c = o3djs.math.matrix4.identity();
    if (this.parent)
      c = o3djs.math.inverse(this.parent.transform.getUpdatedWorldMatrix());
    var d = o3djs.math.matrix4.transformPoint(c, b.near);
    c = o3djs.math.matrix4.transformPoint(c, b.far);
    d = this.boundingBox.intersectRay(d, c);
    o3djs.picking.dumpRayIntersectionInfo(
      "TRANSFORM(box): " + this.transform.name,
      d
    );
    if (d.intersected) {
      d = null;
      c = -1;
      for (var e in this.childTransformInfos) {
        var f = this.childTransformInfos[e];
        if ((f = f.pick(b))) {
          var g = o3djs.math.lengthSquared(
            o3djs.math.subVector(b.near, f.worldIntersectionPosition)
          );
          if (!d || g < c) {
            c = g;
            d = f;
          }
        }
      }
      for (e in this.shapeInfos) {
        f = this.shapeInfos[e];
        if ((f = f.pick(b))) {
          g = o3djs.math.lengthSquared(
            o3djs.math.subVector(b.near, f.worldIntersectionPosition)
          );
          if (!d || g < c) {
            c = g;
            d = f;
          }
        }
      }
      return d;
    }
  }
  return null;
};
o3djs.picking.TransformInfo.prototype.dump = function (b) {
  b = b || "";
  o3djs.picking.dprint(b + "TRANSFORM: " + this.transform.name + "\n");
  if (this.boundingBox) {
    o3djs.picking.dprintPoint3(
      "bb min",
      this.boundingBox.minExtent,
      b + "    "
    );
    o3djs.picking.dprintPoint3(
      "bb max",
      this.boundingBox.maxExtent,
      b + "    "
    );
  } else o3djs.picking.dprint(b + "    bb *NA*\n");
  o3djs.picking.dprint(b + "--Shapes--\n");
  for (var c in this.shapeInfos) {
    var d = this.shapeInfos[c];
    d.dump(b + "    ");
  }
  o3djs.picking.dprint(b + "--Children--\n");
  for (c in this.childTransformInfos) {
    d = this.childTransformInfos[c];
    d.dump(b + "    ");
  }
};
o3djs.provide("o3djs.primitives");
o3djs.primitives = o3djs.primitives || {};
o3djs.primitives.setCullingInfo = function (b) {
  var c = b.getBoundingBox(0);
  b.boundingBox = c;
  var d = c.minExtent;
  c = c.maxExtent;
  b.zSortPoint = o3djs.math.divVectorScalar(o3djs.math.addVector(d, c), 2);
};
o3djs.primitives.VertexStreamInfo = function (b, c, d) {
  this.numComponents = b;
  this.semantic = c;
  this.semanticIndex = d || 0;
  this.elements = [];
  this.addElement = function () {};
  this.setElement = function () {};
  this.addElementVector = function () {};
  this.setElementVector = function () {};
  this.getElementVector = function () {
    return [];
  };
  switch (b) {
    case 1:
      this.addElement = function (e) {
        this.elements.push(e);
      };
      this.getElement = function (e) {
        return this.elements[e];
      };
      this.setElement = function (e, f) {
        this.elements[e] = f;
      };
      break;
    case 2:
      this.addElement = function (e, f) {
        this.elements.push(e, f);
      };
      this.addElementVector = function (e) {
        this.elements.push(e[0], e[1]);
      };
      this.getElementVector = function (e) {
        return this.elements.slice(e * b, (e + 1) * b);
      };
      this.setElement = function (e, f, g) {
        this.elements[e * b + 0] = f;
        this.elements[e * b + 1] = g;
      };
      this.setElementVector = function (e, f) {
        this.elements[e * b + 0] = f[0];
        this.elements[e * b + 1] = f[1];
      };
      break;
    case 3:
      this.addElement = function (e, f, g) {
        this.elements.push(e, f, g);
      };
      this.addElementVector = function (e) {
        this.elements.push(e[0], e[1], e[2]);
      };
      this.getElementVector = function (e) {
        return this.elements.slice(e * b, (e + 1) * b);
      };
      this.setElement = function (e, f, g, h) {
        this.elements[e * b + 0] = f;
        this.elements[e * b + 1] = g;
        this.elements[e * b + 2] = h;
      };
      this.setElementVector = function (e, f) {
        this.elements[e * b + 0] = f[0];
        this.elements[e * b + 1] = f[1];
        this.elements[e * b + 2] = f[2];
      };
      break;
    case 4:
      this.addElement = function (e, f, g, h) {
        this.elements.push(e, f, g, h);
      };
      this.addElementVector = function (e) {
        this.elements.push(e[0], e[1], e[2], e[3]);
      };
      this.getElementVector = function (e) {
        return this.elements.slice(e * b, (e + 1) * b);
      };
      this.setElement = function (e, f, g, h, i) {
        this.elements[e * b + 0] = f;
        this.elements[e * b + 1] = g;
        this.elements[e * b + 2] = h;
        this.elements[e * b + 3] = i;
      };
      this.setElementVector = function (e, f) {
        this.elements[e * b + 0] = f[0];
        this.elements[e * b + 1] = f[1];
        this.elements[e * b + 2] = f[2];
        this.elements[e * b + 3] = f[3];
      };
      break;
    default:
      throw "A stream must contain between 1 and 4 components";
  }
};
o3djs.primitives.VertexStreamInfo.prototype.numElements = function () {
  return this.elements.length / this.numComponents;
};
o3djs.primitives.createVertexStreamInfo = function (b, c, d) {
  return new o3djs.primitives.VertexStreamInfo(b, c, d);
};
o3djs.primitives.VertexInfo = function () {
  this.streams = [];
  this.indices = [];
};
a = o3djs.primitives.VertexInfo.prototype;
a.addStream = function (b, c, d) {
  this.removeStream(c, d);
  b = o3djs.primitives.createVertexStreamInfo(b, c, d);
  this.streams.push(b);
  return b;
};
a.findStream = function (b, c) {
  c = c || 0;
  for (var d = 0; d < this.streams.length; ++d)
    if (this.streams[d].semantic === b && this.streams[d].semanticIndex == c)
      return this.streams[d];
  return null;
};
a.removeStream = function (b, c) {
  c = c || 0;
  for (var d = 0; d < this.streams.length; ++d)
    if (this.streams[d].semantic === b && this.streams[d].semanticIndex == c) {
      this.streams.splice(d, 1);
      return;
    }
};
a.numTriangles = function () {
  return this.indices.length / 3;
};
a.addTriangle = function (b, c, d) {
  this.indices.push(b, c, d);
};
a.getTriangle = function (b) {
  b = b * 3;
  return [this.indices[b + 0], this.indices[b + 1], this.indices[b + 2]];
};
a.setTriangle = function (b, c, d, e) {
  b = b * 3;
  this.indices[b + 0] = c;
  this.indices[b + 1] = d;
  this.indices[b + 2] = e;
};
a.append = function (b) {
  if (this.streams.length == 0 && b.streams.length != 0) {
    for (var c = 0; c < b.streams.length; c++) {
      var d = b.streams[c],
        e = this.addStream(d.numComponents, d.semantic, d.semanticIndex);
      e.elements = e.elements.concat(d.elements);
    }
    this.indices = this.indices.concat(b.indices);
  } else {
    if (this.streams.length != b.streams.length)
      throw "Number of VertexInfoStreams did not match";
    for (c = 0; c < this.streams.length; c++) {
      d = false;
      e = this.streams[c].semantic;
      for (
        var f = this.streams[c].numComponents,
          g = this.streams[c].semanticIndex,
          h = 0;
        h < b.streams.length;
        h++
      ) {
        var i = b.streams[h];
        if (i.semantic === e && i.numComponents == f && i.semanticIndex == g) {
          d = true;
          break;
        }
      }
      if (!d)
        throw (
          "Did not find stream with semantic=" +
          e +
          ", numComponents=" +
          f +
          ", and semantic index=" +
          g +
          " in given VertexInfo"
        );
    }
    c = this.findStream(o3djs.base.o3d.Stream.POSITION);
    if (!c) throw "POSITION stream is missing";
    f = c.numElements();
    for (c = 0; c < this.streams.length; c++) {
      e = this.streams[c];
      d = b.findStream(e.semantic, e.semanticIndex);
      e.elements = e.elements.concat(d.elements);
    }
    for (c = 0; c < b.indices.length; c++) this.indices.push(b.indices[c] + f);
  }
};
a.validate = function () {
  var b = this.findStream(o3djs.base.o3d.Stream.POSITION);
  if (!b) throw "POSITION stream is missing";
  b = b.numElements();
  for (var c = 0; c < this.streams.length; ++c)
    if (this.streams[c].numElements() !== b)
      throw (
        "Stream " +
        c +
        " contains " +
        this.streams[c].numElements() +
        " elements whereas the POSITION stream contains " +
        b
      );
  for (c = 0; c < this.indices.length; ++c)
    if (this.indices[c] < 0 || this.indices[c] >= b)
      throw "The index " + this.indices[c] + " is out of range [0, " + b + "]";
};
a.createShape = function (b, c) {
  this.validate();
  var d = this.findStream(o3djs.base.o3d.Stream.POSITION),
    e = d.numElements();
  d = b.createObject("Shape");
  var f = b.createObject("Primitive"),
    g = b.createObject("StreamBank");
  f.owner = d;
  f.streamBank = g;
  f.material = c;
  f.numberPrimitives = this.indices.length / 3;
  f.primitiveType = o3djs.base.o3d.Primitive.TRIANGLELIST;
  f.numberVertices = e;
  f.createDrawElement(b, null);
  var h = c.effect.getStreamInfo();
  for (c = 0; c < h.length; ++c) {
    var i = h[c].semantic,
      j = h[c].semanticIndex,
      k = this.findStream(i, j);
    if (!k)
      switch (i) {
        case o3djs.base.o3d.Stream.TANGENT:
        case o3djs.base.o3d.Stream.BINORMAL:
          this.addTangentStreams(j);
          break;
        case o3djs.base.o3d.Stream.COLOR:
          k = this.addStream(4, i, j);
          for (i = 0; i < e; ++i) k.addElement(1, 1, 1, 1);
          break;
        default:
          throw (
            "Missing stream for semantic " + i + " with semantic index " + j
          );
      }
  }
  h = b.createObject("VertexBuffer");
  k = [];
  for (c = 0; c < this.streams.length; ++c) {
    i = this.streams[c];
    j =
      i.semantic == o3djs.base.o3d.Stream.COLOR && i.numComponents == 4
        ? "UByteNField"
        : "FloatField";
    k[c] = h.createField(j, i.numComponents);
    g.setVertexStream(i.semantic, i.semanticIndex, k[c], 0);
  }
  h.allocateElements(e);
  for (c = 0; c < this.streams.length; ++c)
    k[c].setAt(0, this.streams[c].elements);
  b = b.createObject("IndexBuffer");
  b.set(this.indices);
  f.indexBuffer = b;
  o3djs.primitives.setCullingInfo(f);
  return d;
};
a.reorient = function (b) {
  var c = o3djs.math;
  c.inverse(c.matrix4.getUpper3x3(b));
  for (var d = 0; d < this.streams.length; ++d) {
    var e = this.streams[d];
    if (e.numComponents == 3) {
      var f = e.numElements();
      switch (e.semantic) {
        case o3djs.base.o3d.Stream.POSITION:
          for (var g = 0; g < f; ++g)
            e.setElementVector(
              g,
              c.matrix4.transformPoint(b, e.getElementVector(g))
            );
          break;
        case o3djs.base.o3d.Stream.NORMAL:
          for (g = 0; g < f; ++g)
            e.setElementVector(
              g,
              c.matrix4.transformNormal(b, e.getElementVector(g))
            );
          break;
        case o3djs.base.o3d.Stream.TANGENT:
        case o3djs.base.o3d.Stream.BINORMAL:
          for (g = 0; g < f; ++g)
            e.setElementVector(
              g,
              c.matrix4.transformDirection(b, e.getElementVector(g))
            );
          break;
      }
    }
  }
};
a.addTangentStreams = function (b) {
  b = b || 0;
  var c = o3djs.math;
  this.validate();
  var d = this.findStream(o3djs.base.o3d.Stream.POSITION);
  if (!d)
    throw "Cannot calculate tangent frame because POSITION stream is missing";
  if (d.numComponents != 3)
    throw "Cannot calculate tangent frame because POSITION stream is not 3D";
  var e = this.findStream(o3djs.base.o3d.Stream.NORMAL);
  if (!e)
    throw "Cannot calculate tangent frame because NORMAL stream is missing";
  if (e.numComponents != 3)
    throw "Cannot calculate tangent frame because NORMAL stream is not 3D";
  var f = this.findStream(o3djs.base.o3d.Stream.TEXCOORD, b);
  if (!f)
    throw (
      "Cannot calculate tangent frame because TEXCOORD stream " +
      b +
      " is missing"
    );
  var g = {};
  function h(w) {
    return [Math.round(w[0]), Math.round(w[1]), Math.round(w[2])];
  }
  function i(w, x) {
    return h(c.mulVectorScalar(w, 100)) + "," + h(c.mulVectorScalar(x, 100));
  }
  function j(w, x, z, A) {
    w = i(w, x);
    (x = g[w]) ||
      (x = [
        [0, 0, 0],
        [0, 0, 0],
      ]);
    x = c.addMatrix(x, [z, A]);
    g[w] = x;
  }
  function k(w, x) {
    w = i(w, x);
    return g[w];
  }
  for (var l = this.numTriangles(), n = 0; n < l; ++n) {
    for (
      var m = this.getTriangle(n), o = [], s = [], t = [], q = 0;
      q < 3;
      ++q
    ) {
      var r = m[q];
      o[q] = f.getElementVector(r);
      s[q] = d.getElementVector(r);
      t[q] = e.getElementVector(r);
    }
    m = [0, 0, 0];
    var u = [0, 0, 0];
    for (r = 0; r < 3; ++r) {
      q = [s[1][r] - s[0][r], o[1][0] - o[0][0], o[1][1] - o[0][1]];
      var y = [s[2][r] - s[0][r], o[2][0] - o[0][0], o[2][1] - o[0][1]];
      q = c.normalize(c.cross(q, y));
      if (q[0] == 0) q[0] = 1;
      m[r] = -q[1] / q[0];
      u[r] = -q[2] / q[0];
    }
    o = c.length(m);
    if (o > 0.001) m = c.mulVectorScalar(m, 1 / o);
    o = c.length(u);
    if (o > 0.001) u = c.mulVectorScalar(u, 1 / o);
    for (q = 0; q < 3; ++q) j(s[q], t[q], m, u);
  }
  f = this.addStream(3, o3djs.base.o3d.Stream.TANGENT, b);
  b = this.addStream(3, o3djs.base.o3d.Stream.BINORMAL, b);
  l = d.numElements();
  for (r = 0; r < l; ++r) {
    m = d.getElementVector(r);
    n = e.getElementVector(r);
    u = k(m, n);
    m = u[0];
    m = c.subVector(m, c.mulVectorScalar(n, c.dot(n, m)));
    o = c.length(m);
    if (o > 0.001) m = c.mulVectorScalar(m, 1 / o);
    u = u[1];
    u = c.subVector(u, c.mulVectorScalar(m, c.dot(m, u)));
    u = c.subVector(u, c.mulVectorScalar(n, c.dot(n, u)));
    o = c.length(u);
    if (o > 0.001) u = c.mulVectorScalar(u, 1 / o);
    f.setElementVector(r, m);
    b.setElementVector(r, u);
  }
};
o3djs.primitives.createVertexInfo = function () {
  return new o3djs.primitives.VertexInfo();
};
o3djs.primitives.createSphereVertices = function (b, c, d, e) {
  if (c <= 0 || d <= 0)
    throw Error("subdivisionAxis and subdivisionHeight must be > 0");
  for (
    var f = o3djs.primitives.createVertexInfo(),
      g = f.addStream(3, o3djs.base.o3d.Stream.POSITION),
      h = f.addStream(3, o3djs.base.o3d.Stream.NORMAL),
      i = f.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
      j = 0;
    j <= d;
    j++
  )
    for (var k = 0; k <= c; k++) {
      var l = k / c,
        n = j / d,
        m = 2 * Math.PI * l,
        o = Math.PI * n,
        s = Math.sin(m),
        t = Math.cos(m);
      m = Math.sin(o);
      var q = Math.cos(o);
      o = t * m;
      t = q;
      s = s * m;
      g.addElement(b * o, b * t, b * s);
      h.addElement(o, t, s);
      i.addElement(1 - l, 1 - n);
    }
  b = c + 1;
  for (k = 0; k < c; k++)
    for (j = 0; j < d; j++) {
      f.addTriangle((j + 0) * b + k, (j + 0) * b + k + 1, (j + 1) * b + k);
      f.addTriangle((j + 1) * b + k, (j + 0) * b + k + 1, (j + 1) * b + k + 1);
    }
  e && f.reorient(e);
  return f;
};
o3djs.primitives.createSphere = function (b, c, d, e, f, g) {
  d = o3djs.primitives.createSphereVertices(d, e, f, g);
  return d.createShape(b, c);
};
o3djs.primitives.CUBE_FACE_INDICES_ = [
  [3, 7, 5, 1],
  [0, 4, 6, 2],
  [6, 7, 3, 2],
  [0, 1, 5, 4],
  [5, 7, 6, 4],
  [2, 3, 1, 0],
];
o3djs.primitives.createCubeVertices = function (b, c) {
  b = b / 2;
  b = [
    [-b, -b, -b],
    [+b, -b, -b],
    [-b, +b, -b],
    [+b, +b, -b],
    [-b, -b, +b],
    [+b, -b, +b],
    [-b, +b, +b],
    [+b, +b, +b],
  ];
  for (
    var d = [
        [+1, +0, +0],
        [-1, +0, +0],
        [+0, +1, +0],
        [+0, -1, +0],
        [+0, +0, +1],
        [+0, +0, -1],
      ],
      e = [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ],
      f = o3djs.primitives.createVertexInfo(),
      g = f.addStream(3, o3djs.base.o3d.Stream.POSITION),
      h = f.addStream(3, o3djs.base.o3d.Stream.NORMAL),
      i = f.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
      j = 0;
    j < 6;
    ++j
  )
    for (var k = o3djs.primitives.CUBE_FACE_INDICES_[j], l = 0; l < 4; ++l) {
      var n = b[k[l]],
        m = d[j],
        o = e[l];
      g.addElementVector(n);
      h.addElementVector(m);
      i.addElementVector(o);
      n = 4 * j;
      f.addTriangle(n + 0, n + 1, n + 2);
      f.addTriangle(n + 0, n + 2, n + 3);
    }
  c && f.reorient(c);
  return f;
};
o3djs.primitives.createCube = function (b, c, d, e) {
  d = o3djs.primitives.createCubeVertices(d, e);
  return d.createShape(b, c);
};
o3djs.primitives.createBox = function (b, c, d, e, f, g) {
  var h = o3djs.primitives.createCubeVertices(1);
  h.reorient([
    [d, 0, 0, 0],
    [0, e, 0, 0],
    [0, 0, f, 0],
    [0, 0, 0, 1],
  ]);
  g && h.reorient(g);
  return h.createShape(b, c);
};
o3djs.primitives.createRainbowCube = function (b, c, d, e) {
  d = o3djs.primitives.createCubeVertices(d, e);
  e = d.addStream(4, o3djs.base.o3d.Stream.COLOR);
  for (
    var f = [
        [1, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 1, 1],
        [1, 1, 0, 1],
        [0, 1, 1, 1],
        [1, 0, 1, 1],
        [0, 0.5, 0.3, 1],
        [0.3, 0, 0.5, 1],
      ],
      g = 0;
    g < 6;
    ++g
  )
    for (var h = o3djs.primitives.CUBE_FACE_INDICES_[g], i = 0; i < 4; ++i) {
      var j = f[h[i]];
      e.addElementVector(j);
    }
  return d.createShape(b, c);
};
o3djs.primitives.createDiscVertices = function (b, c, d, e, f, g) {
  if (c < 3) throw Error("divisions must be at least 3");
  d = d ? d : 1;
  e = e ? e : 0;
  f = f ? f : 1;
  var h = o3djs.primitives.createVertexInfo(),
    i = h.addStream(3, o3djs.base.o3d.Stream.POSITION),
    j = h.addStream(3, o3djs.base.o3d.Stream.NORMAL),
    k = h.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
    l = 0;
  if (e == 0) {
    i.addElement(0, 0, 0);
    j.addElement(0, 1, 0);
    k.addElement(0, 0);
    l++;
  }
  for (var n = Math.max(e, 1); n <= d; ++n) {
    for (var m = b * Math.pow(n / d, f), o = 0; o < c; ++o) {
      var s = (2 * Math.PI * o) / c,
        t = m * Math.cos(s);
      s = m * Math.sin(s);
      i.addElement(t, 0, s);
      j.addElement(0, 1, 0);
      k.addElement(t, s);
      if (n > e) {
        t = l + ((o + 1) % c);
        s = l + o;
        if (n > 1) {
          var q = l + o - c,
            r = l + ((o + 1) % c) - c;
          h.addTriangle(t, s, q);
          h.addTriangle(t, q, r);
        } else h.addTriangle(0, t, s);
      }
    }
    l += c;
  }
  g && h.reorient(g);
  return h;
};
o3djs.primitives.createDisc = function (b, c, d, e, f, g, h, i) {
  d = o3djs.primitives.createDiscVertices(d, e, f, g, h, i);
  return d.createShape(b, c);
};
o3djs.primitives.createCylinderVertices = function (b, c, d, e, f) {
  return o3djs.primitives.createTruncatedConeVertices(b, b, c, d, e, f);
};
o3djs.primitives.createCylinder = function (b, c, d, e, f, g, h) {
  d = o3djs.primitives.createCylinderVertices(d, e, f, g, h);
  return d.createShape(b, c);
};
o3djs.primitives.createTruncatedConeVertices = function (b, c, d, e, f, g) {
  if (e < 1) throw Error("radialSubdivisions must be 1 or greater");
  if (f < 1) throw Error("verticalSubdivisions must be 1 or greater");
  var h = o3djs.primitives.createVertexInfo(),
    i = h.addStream(3, o3djs.base.o3d.Stream.POSITION),
    j = h.addStream(3, o3djs.base.o3d.Stream.NORMAL),
    k = h.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
    l = e + 1,
    n = Math.atan2(b - c, d),
    m = Math.cos(n);
  n = Math.sin(n);
  for (var o = -2; o <= f + 2; ++o) {
    var s = o / f,
      t = d * s,
      q;
    if (o < 0) {
      t = 0;
      s = 1;
      q = b;
    } else if (o > f) {
      t = d;
      s = 1;
      q = c;
    } else q = b + (c - b) * (o / f);
    if (o == -2 || o == f + 2) s = q = 0;
    t -= d / 2;
    for (var r = 0; r < l; ++r) {
      var u = Math.sin((r * Math.PI * 2) / e),
        y = Math.cos((r * Math.PI * 2) / e);
      i.addElement(u * q, t, y * q);
      j.addElement(
        o < 0 || o > f ? 0 : u * m,
        o < 0 ? -1 : o > f ? 1 : n,
        o < 0 || o > f ? 0 : y * m
      );
      k.addElement(r / e, s);
    }
  }
  for (o = 0; o < f + 4; ++o)
    for (r = 0; r < e; ++r) {
      h.addTriangle(
        l * (o + 0) + 0 + r,
        l * (o + 0) + 1 + r,
        l * (o + 1) + 1 + r
      );
      h.addTriangle(
        l * (o + 0) + 0 + r,
        l * (o + 1) + 1 + r,
        l * (o + 1) + 0 + r
      );
    }
  g && h.reorient(g);
  return h;
};
o3djs.primitives.createTruncatedCone = function (b, c, d, e, f, g, h, i) {
  d = o3djs.primitives.createTruncatedConeVertices(d, e, f, g, h, i);
  return d.createShape(b, c);
};
o3djs.primitives.createWedgeVertices = function (b, c, d) {
  var e = o3djs.math,
    f = o3djs.primitives.createVertexInfo(),
    g = f.addStream(3, o3djs.base.o3d.Stream.POSITION),
    h = f.addStream(3, o3djs.base.o3d.Stream.NORMAL),
    i = f.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
    j = -c * 0.5;
  c = c * 0.5;
  var k = [];
  b = [
    [b[0][0], b[0][1]],
    [b[1][0], b[1][1]],
    [b[2][0], b[2][1]],
  ];
  k[0] = e.cross(
    e.normalize([b[1][0] - b[0][0], b[1][1] - b[0][1], j - j]),
    e.normalize([b[1][0] - b[1][0], b[1][1] - b[1][1], c - j])
  );
  k[1] = e.cross(
    e.normalize([b[2][0] - b[1][0], b[2][1] - b[1][1], j - j]),
    e.normalize([b[2][0] - b[2][0], b[2][1] - b[2][1], c - j])
  );
  k[2] = e.cross(
    [b[0][0] - b[2][0], b[0][1] - b[2][1], j - j],
    [b[0][0] - b[0][0], b[0][1] - b[0][1], c - j]
  );
  g.addElement(b[0][0], b[0][1], j);
  h.addElement(0, 0, -1);
  i.addElement(0, 1);
  g.addElement(b[1][0], b[1][1], j);
  h.addElement(0, 0, -1);
  i.addElement(1, 0);
  g.addElement(b[2][0], b[2][1], j);
  h.addElement(0, 0, -1);
  i.addElement(0, 0);
  g.addElement(b[0][0], b[0][1], c);
  h.addElement(0, 0, 1);
  i.addElement(0, 1);
  g.addElement(b[1][0], b[1][1], c);
  h.addElement(0, 0, 1);
  i.addElement(1, 0);
  g.addElement(b[2][0], b[2][1], c);
  h.addElement(0, 0, 1);
  i.addElement(0, 0);
  g.addElement(b[0][0], b[0][1], j);
  h.addElement(k[0][0], k[0][1], k[0][2]);
  i.addElement(0, 1);
  g.addElement(b[1][0], b[1][1], j);
  h.addElement(k[0][0], k[0][1], k[0][2]);
  i.addElement(0, 0);
  g.addElement(b[1][0], b[1][1], c);
  h.addElement(k[0][0], k[0][1], k[0][2]);
  i.addElement(1, 0);
  g.addElement(b[0][0], b[0][1], c);
  h.addElement(k[0][0], k[0][1], k[0][2]);
  i.addElement(1, 1);
  g.addElement(b[1][0], b[1][1], j);
  h.addElement(k[1][0], k[1][1], k[1][2]);
  i.addElement(0, 1);
  g.addElement(b[2][0], b[2][1], j);
  h.addElement(k[1][0], k[1][1], k[1][2]);
  i.addElement(0, 0);
  g.addElement(b[2][0], b[2][1], c);
  h.addElement(k[1][0], k[1][1], k[1][2]);
  i.addElement(1, 0);
  g.addElement(b[1][0], b[1][1], c);
  h.addElement(k[1][0], k[1][1], k[1][2]);
  i.addElement(1, 1);
  g.addElement(b[2][0], b[2][1], j);
  h.addElement(k[2][0], k[2][1], k[2][2]);
  i.addElement(0, 1);
  g.addElement(b[0][0], b[0][1], j);
  h.addElement(k[2][0], k[2][1], k[2][2]);
  i.addElement(0, 0);
  g.addElement(b[0][0], b[0][1], c);
  h.addElement(k[2][0], k[2][1], k[2][2]);
  i.addElement(1, 0);
  g.addElement(b[2][0], b[2][1], c);
  h.addElement(k[2][0], k[2][1], k[2][2]);
  i.addElement(1, 1);
  d && f.reorient(d);
  return f;
};
o3djs.primitives.createWedge = function (b, c, d, e, f) {
  d = o3djs.primitives.createWedgeVertices(d, e, f);
  return d.createShape(b, c);
};
o3djs.primitives.createPrismVertices = function (b, c, d) {
  if (b.length < 3) throw Error("there must be 3 or more points");
  var e = -0.5 * c;
  c = 0.5 * c;
  for (
    var f = [],
      g = o3djs.primitives.createVertexInfo(),
      h = g.addStream(3, o3djs.base.o3d.Stream.POSITION),
      i = g.addStream(3, o3djs.base.o3d.Stream.NORMAL),
      j = g.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
      k = b.length,
      l = 0;
    l < k;
    ++l
  ) {
    var n = (l + 1) % k,
      m = b[n][0] - b[l][0],
      o = b[n][1] - b[l][1];
    n = Math.sqrt(m * m + o * o);
    f[l] = [o / n, -m / n, 0];
  }
  n = b[0][0];
  var s = b[0][1],
    t = b[0][0],
    q = b[0][1];
  for (l = 1; l < k; ++l) {
    m = b[l][0];
    o = b[l][1];
    n = Math.min(n, m);
    s = Math.min(s, o);
    t = Math.max(t, m);
    q = Math.max(q, o);
  }
  m = [];
  o = [];
  var r = t - n;
  q = q - s;
  for (l = 0; l < k; ++l) {
    m[l] = [(b[l][0] - n) / r, (b[l][1] - s) / q];
    o[l] = [(t - b[l][0]) / r, (b[l][1] - s) / q];
  }
  for (l = 0; l < k; ++l) {
    n = (l + 1) % k;
    h.addElement(b[l][0], b[l][1], e);
    i.addElement(0, 0, -1);
    j.addElement(o[l][0], o[l][1]);
    h.addElement(b[l][0], b[l][1], c), i.addElement(0, 0, 1);
    j.addElement(m[l][0], m[l][1]);
    h.addElement(b[l][0], b[l][1], e), i.addElement(f[l][0], f[l][1], f[l][2]);
    j.addElement(0, 1);
    h.addElement(b[n][0], b[n][1], e), i.addElement(f[l][0], f[l][1], f[l][2]);
    j.addElement(0, 0);
    h.addElement(b[n][0], b[n][1], c), i.addElement(f[l][0], f[l][1], f[l][2]);
    j.addElement(1, 0);
    h.addElement(b[l][0], b[l][1], c), i.addElement(f[l][0], f[l][1], f[l][2]);
    j.addElement(1, 1);
    if (l > 0 && l < k - 1) {
      g.addTriangle(0, 6 * (l + 1), 6 * l);
      g.addTriangle(1, 6 * l + 1, 6 * (l + 1) + 1);
    }
    g.addTriangle(6 * l + 2, 6 * l + 3, 6 * l + 4);
    g.addTriangle(6 * l + 2, 6 * l + 4, 6 * l + 5);
  }
  d && g.reorient(d);
  return g;
};
o3djs.primitives.createPrism = function (b, c, d, e, f) {
  d = o3djs.primitives.createPrismVertices(d, e, f);
  return d.createShape(b, c);
};
o3djs.primitives.createPlaneVertices = function (b, c, d, e, f) {
  if (d <= 0 || e <= 0)
    throw Error("subdivisionWidth and subdivisionDepth must be > 0");
  for (
    var g = o3djs.primitives.createVertexInfo(),
      h = g.addStream(3, o3djs.base.o3d.Stream.POSITION),
      i = g.addStream(3, o3djs.base.o3d.Stream.NORMAL),
      j = g.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
      k = 0;
    k <= e;
    k++
  )
    for (var l = 0; l <= d; l++) {
      var n = l / d,
        m = k / e;
      h.addElement(b * n - b * 0.5, 0, c * m - c * 0.5);
      i.addElement(0, 1, 0);
      j.addElement(n, 1 - m);
    }
  b = d + 1;
  for (k = 0; k < e; k++)
    for (l = 0; l < d; l++) {
      g.addTriangle((k + 0) * b + l, (k + 1) * b + l, (k + 0) * b + l + 1);
      g.addTriangle((k + 1) * b + l, (k + 1) * b + l + 1, (k + 0) * b + l + 1);
    }
  f && g.reorient(f);
  return g;
};
o3djs.primitives.createPlane = function (b, c, d, e, f, g, h) {
  d = o3djs.primitives.createPlaneVertices(d, e, f, g, h);
  return d.createShape(b, c);
};
o3djs.primitives.createFadePlane = function (b, c, d, e, f, g, h) {
  d = o3djs.primitives.createPlaneVertices(d, e, f, g, h);
  e = d.addStream(4, o3djs.base.o3d.Stream.COLOR);
  for (h = 0; h <= g; h++)
    for (var i = h / g, j = 0; j <= f; j++) e.addElement(1, 1, 1, i);
  return d.createShape(b, c);
};
o3djs.provide("o3djs.quaternions");
o3djs.quaternions = o3djs.quaternions || {};
o3djs.quaternions.Quaternion = goog.typedef;
o3djs.quaternions.mathType = function (b) {
  if (typeof b === "number") return "Scalar";
  return "Quaternion";
};
o3djs.quaternions.copy = function (b) {
  return b.slice();
};
o3djs.quaternions.negative = function (b) {
  return [-b[0], -b[1], -b[2], -b[3]];
};
o3djs.quaternions.addQuaternionQuaternion = function (b, c) {
  return [b[0] + c[0], b[1] + c[1], b[2] + c[2], b[3] + c[3]];
};
o3djs.quaternions.addQuaternionScalar = function (b, c) {
  return b.slice(0, 3).concat(b[3] + c);
};
o3djs.quaternions.addScalarQuaternion = function (b, c) {
  return c.slice(0, 3).concat(b + c[3]);
};
o3djs.quaternions.subQuaternionQuaternion = function (b, c) {
  return [b[0] - c[0], b[1] - c[1], b[2] - c[2], b[3] - c[3]];
};
o3djs.quaternions.subQuaternionScalar = function (b, c) {
  return b.slice(0, 3).concat(b[3] - c);
};
o3djs.quaternions.subScalarQuaternion = function (b, c) {
  return [-c[0], -c[1], -c[2], b - c[3]];
};
o3djs.quaternions.mulScalarQuaternion = function (b, c) {
  return [b * c[0], b * c[1], b * c[2], b * c[3]];
};
o3djs.quaternions.mulQuaternionScalar = function (b, c) {
  return [c * b[0], c * b[1], c * b[2], c * b[3]];
};
o3djs.quaternions.mulQuaternionQuaternion = function (b, c) {
  var d = b[0],
    e = b[1],
    f = b[2];
  b = b[3];
  var g = c[0],
    h = c[1],
    i = c[2];
  c = c[3];
  return [
    b * g + d * c + e * i - f * h,
    b * h + e * c + f * g - d * i,
    b * i + f * c + d * h - e * g,
    b * c - d * g - e * h - f * i,
  ];
};
o3djs.quaternions.divQuaternionQuaternion = function (b, c) {
  var d = b[0],
    e = b[1],
    f = b[2];
  b = b[3];
  var g = c[0],
    h = c[1],
    i = c[2];
  c = c[3];
  var j = 1 / (c * c + g * g + h * h + i * i);
  return [
    (d * c - b * g - e * i + f * h) * j,
    (d * i - b * h + e * c - f * g) * j,
    (e * g + f * c - b * i - d * h) * j,
    (b * c + d * g + e * h + f * i) * j,
  ];
};
o3djs.quaternions.divQuaternionScalar = function (b, c) {
  return [b[0] / c, b[1] / c, b[2] / c, b[3] / c];
};
o3djs.quaternions.divScalarQuaternion = function (b, c) {
  var d = c[0],
    e = c[1],
    f = c[2];
  c = c[3];
  var g = 1 / (d * d + e * e + f * f + c * c);
  return [-b * d * g, -b * e * g, -b * f * g, b * c * g];
};
o3djs.quaternions.inverse = function (b) {
  var c = b[0],
    d = b[1],
    e = b[2];
  b = b[3];
  var f = 1 / (c * c + d * d + e * e + b * b);
  return [-c * f, -d * f, -e * f, b * f];
};
o3djs.quaternions.mul = function (b, c) {
  return o3djs.quaternions[
    "mul" + o3djs.quaternions.mathType(b) + o3djs.quaternions.mathType(c)
  ](b, c);
};
o3djs.quaternions.div = function (b, c) {
  return o3djs.quaternions[
    "div" + o3djs.quaternions.mathType(b) + o3djs.quaternions.mathType(c)
  ](b, c);
};
o3djs.quaternions.add = function (b, c) {
  return o3djs.quaternions[
    "add" + o3djs.quaternions.mathType(b) + o3djs.quaternions.mathType(c)
  ](b, c);
};
o3djs.quaternions.sub = function (b, c) {
  return o3djs.quaternions[
    "sub" + o3djs.quaternions.mathType(b) + o3djs.quaternions.mathType(c)
  ](b, c);
};
o3djs.quaternions.length = function (b) {
  return Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2] + b[3] * b[3]);
};
o3djs.quaternions.lengthSquared = function (b) {
  return b[0] * b[0] + b[1] * b[1] + b[2] * b[2] + b[3] * b[3];
};
o3djs.quaternions.normalize = function (b) {
  var c = 1 / Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2] + b[3] * b[3]);
  return [b[0] * c, b[1] * c, b[2] * c, b[3] * c];
};
o3djs.quaternions.conjugate = function (b) {
  return [-b[0], -b[1], -b[2], b[3]];
};
o3djs.quaternions.rotationX = function (b) {
  return [Math.sin(b / 2), 0, 0, Math.cos(b / 2)];
};
o3djs.quaternions.rotationY = function (b) {
  return [0, Math.sin(b / 2), 0, Math.cos(b / 2)];
};
o3djs.quaternions.rotationZ = function (b) {
  return [0, 0, Math.sin(b / 2), Math.cos(b / 2)];
};
o3djs.quaternions.axisRotation = function (b, c) {
  var d = 1 / Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2]),
    e = Math.sin(c / 2);
  c = Math.cos(c / 2);
  return [e * b[0] * d, e * b[1] * d, e * b[2] * d, c];
};
o3djs.quaternions.quaternionToRotation = function (b) {
  var c = b[0],
    d = b[1],
    e = b[2],
    f = b[3];
  b = f * f;
  var g = f * c,
    h = f * d;
  f = f * e;
  var i = c * c,
    j = c * d;
  c = c * e;
  var k = d * d;
  d = d * e;
  e = e * e;
  var l = b + i + k + e;
  return [
    [(b + i - k - e) / l, (2 * (f + j)) / l, (2 * (c - h)) / l, 0],
    [(2 * (j - f)) / l, (b - i + k - e) / l, (2 * (g + d)) / l, 0],
    [(2 * (h + c)) / l, (2 * (d - g)) / l, (b - i - k + e) / l, 0],
    [0, 0, 0, 1],
  ];
};
o3djs.quaternions.rotationToQuaternion = function (b) {
  var c, d, e;
  if (b[0][0] > b[1][1] && b[0][0] > b[2][2]) {
    c = 0;
    d = 1;
    e = 2;
  } else if (b[1][1] > b[0][0] && b[1][1] > b[2][2]) {
    c = 1;
    d = 2;
    e = 0;
  } else {
    c = 2;
    d = 0;
    e = 1;
  }
  var f = Math.sqrt(1 + b[c][c] - b[d][d] - b[e][e]),
    g = [];
  g[c] = 0.5 * f;
  g[d] = (0.5 * (b[d][c] + b[c][d])) / f;
  g[e] = (0.5 * (b[c][e] + b[e][c])) / f;
  g[3] = (0.5 * (b[d][e] - b[e][d])) / f;
  return g;
};
o3djs.provide("o3djs.rendergraph");
o3djs.rendergraph = o3djs.rendergraph || {};
o3djs.rendergraph.createView = function (b, c, d, e, f, g, h, i) {
  return new o3djs.rendergraph.ViewInfo(b, c, d, e, f, g, h, i);
};
o3djs.rendergraph.createBasicView = function (b, c, d, e, f, g) {
  return o3djs.rendergraph.createView(b, c, d, e, f, g);
};
o3djs.rendergraph.createExtraView = function (b, c, d, e) {
  return o3djs.rendergraph.createView(
    b.pack,
    b.treeRoot,
    b.renderGraphRoot,
    d,
    e,
    c,
    b.performanceDrawList,
    b.zOrderedDrawList
  );
};
o3djs.rendergraph.ViewInfo = function (b, c, d, e, f, g, h, i) {
  var j = this;
  e = e || [0.5, 0.5, 0.5, 1];
  var k = f || 0;
  f = 0;
  var l = b.createObject("Viewport");
  if (g) l.viewport = g;
  l.priority = k;
  g = b.createObject("ClearBuffer");
  g.clearColor = e;
  g.priority = f++;
  g.parent = l;
  e = b.createObject("TreeTraversal");
  e.priority = f++;
  e.parent = l;
  e.transform = c;
  this.drawPassInfos_ = [];
  this.pack = b;
  this.renderGraphRoot = d;
  this.treeRoot = c;
  this.viewport = this.root = l;
  this.clearBuffer = g;
  this.drawContext = b = b.createObject("DrawContext");
  this.treeTraversal = e;
  this.priority = f;
  function n(m, o) {
    return j.createDrawPass(m, undefined, undefined, undefined, o);
  }
  h = n(o3djs.base.o3d.DrawList.BY_PERFORMANCE, h);
  b = h.state;
  i = n(o3djs.base.o3d.DrawList.BY_Z_ORDER, i);
  c = i.state;
  c.getStateParam("AlphaBlendEnable").value = true;
  c.getStateParam("SourceBlendFunction").value =
    o3djs.base.o3d.State.BLENDFUNC_SOURCE_ALPHA;
  c.getStateParam("DestinationBlendFunction").value =
    o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_ALPHA;
  c.getStateParam("AlphaTestEnable").value = true;
  c.getStateParam("AlphaComparisonFunction").value =
    o3djs.base.o3d.State.CMP_GREATER;
  if (d) this.root.parent = d;
  this.performanceDrawPassInfo = h;
  this.zOrderedDrawPassInfo = i;
  this.performanceStateSet = h.stateSet;
  this.performanceState = b;
  this.performanceDrawList = h.drawList;
  this.zOrderedStateSet = i.stateSet;
  this.zOrderedState = c;
  this.zOrderedDrawList = i.drawList;
  this.performanceDrawPass = h.drawPass;
  this.zOrderedDrawPass = i.drawPass;
};
o3djs.rendergraph.ViewInfo.prototype.destroy = function (b) {
  if (b === undefined) b = true;
  for (var c = 0; c < this.drawPassInfos_.length; ++c)
    this.drawPassInfos_[c].destroy();
  this.pack.removeObject(this.viewport);
  this.pack.removeObject(this.clearBuffer);
  b && this.pack.removeObject(this.drawContext);
  this.pack.removeObject(this.treeTraversal);
  this.viewport.parent = null;
};
o3djs.rendergraph.ViewInfo.prototype.createDrawPass = function (b, c, d, e, f) {
  c = c || this.drawContext;
  e = e || this.viewport;
  d = typeof d !== "undefined" ? d : this.priority++;
  b = o3djs.rendergraph.createDrawPassInfo(this.pack, c, b, e, f);
  b.root.priority = d;
  this.treeTraversal.registerDrawList(b.drawList, c, true);
  this.drawPassInfos_.push(b);
  return b;
};
o3djs.rendergraph.createDrawPassInfo = function (b, c, d, e, f) {
  return new o3djs.rendergraph.DrawPassInfo(b, c, d, e, f);
};
o3djs.rendergraph.DrawPassInfo = function (b, c, d, e, f) {
  c = f ? false : true;
  e = e || null;
  f = f || b.createObject("DrawList");
  var g = b.createObject("StateSet"),
    h = b.createObject("State");
  g.state = h;
  g.parent = e;
  e = b.createObject("DrawPass");
  e.drawList = f;
  e.sortMethod = d;
  e.parent = g;
  this.pack = b;
  this.state = h;
  this.stateSet = g;
  this.drawPass = e;
  this.drawList = f;
  this.root = g;
  this.ownDrawList_ = c;
};
o3djs.rendergraph.DrawPassInfo.prototype.destroy = function () {
  if (this.ownDrawList_) {
    this.drawList.parent = null;
    this.pack_.removeObject(this.drawList);
  }
  this.drawPass.parent = null;
  this.stateSet.parent = null;
  this.pack.removeObject(this.drawPass);
  this.pack.removeObject(this.stateSet);
  this.pack.removeObject(this.state);
};
o3djs.provide("o3djs.scene");
o3djs.scene = o3djs.scene || {};
o3djs.scene.loadScene = function (b, c, d, e, f, g) {
  function h(i, j) {
    if (j) {
      i.destroy();
      f(c, d, j);
    } else {
      j = function (k, l, n) {
        i.destroy();
        f(k, l, n);
      };
      o3djs.serialization.deserializeArchive(i, "scene.json", b, c, d, j, g);
    }
  }
  return o3djs.io.loadArchive(c, e, h);
};
o3djs.provide("o3djs.serialization");
o3djs.serialization = o3djs.serialization || {};
o3djs.serialization.supportedVersion = 5;
o3djs.serialization.CURVE_KEY_TYPES = { step: 1, linear: 2, bezier: 3 };
o3djs.serialization.Options = goog.typedef;
o3djs.serialization.Deserializer = function (b, c) {
  this.pack = b;
  this.json = c;
  this.archiveInfo = null;
  function d(f, g, h, i) {
    h = f.pack.createObject(h);
    if ("custom" in g)
      if ("fieldData" in g.custom) {
        g = g.custom.fieldData;
        if (g.length > 0) {
          i = [];
          for (var j = 0; j < g.length; ++j) {
            var k = g[j],
              l = h.createField(k.type, k.numComponents);
            i.push(l);
            f.addObject(k.id, l);
          }
          f = g[0];
          f = f.data.length / f.numComponents;
          h.allocateElements(f);
          for (j = 0; j < g.length; ++j) {
            k = g[j];
            i[j].setAt(0, k.data);
          }
        }
      } else {
        i = f.archiveInfo.getFileByURI(i);
        h.set(
          i,
          g.custom.binaryRange[0],
          g.custom.binaryRange[1] - g.custom.binaryRange[0]
        );
        for (i = 0; i < g.custom.fields.length; ++i)
          f.addObject(g.custom.fields[i], h.fields[i]);
      }
    return h;
  }
  this.createCallbacks = {
    "o3djs.DestinationBuffer": function (f, g) {
      var h = f.pack.createObject("o3d.VertexBuffer");
      if ("custom" in g) {
        for (var i = 0; i < g.custom.fields.length; ++i) {
          var j = g.custom.fields[i],
            k = h.createField(j.type, j.numComponents);
          f.addObject(j.id, k);
        }
        h.allocateElements(g.custom.numElements);
      }
      return h;
    },
    "o3d.VertexBuffer": function (f, g) {
      return d(f, g, "o3d.VertexBuffer", "vertex-buffers.bin");
    },
    "o3d.SourceBuffer": function (f, g) {
      return d(f, g, "o3d.SourceBuffer", "vertex-buffers.bin");
    },
    "o3d.IndexBuffer": function (f, g) {
      return d(f, g, "o3d.IndexBuffer", "index-buffers.bin");
    },
    "o3d.Texture2D": function (f, g) {
      if ("o3d.uri" in g.params) {
        g = g.params["o3d.uri"].value;
        f = f.archiveInfo.getFileByURI(g);
        if (!f) throw "Could not find texture " + g + " in the archive";
        return o3djs.texture.createTextureFromRawData(b, f, true);
      } else
        return f.pack.createTexture2D(
          g.custom.width,
          g.custom.height,
          g.custom.format,
          g.custom.levels,
          g.custom.renderSurfacesEnabled
        );
    },
    "o3d.TextureCUBE": function (f, g) {
      if ("o3d.uri" in g.params) {
        g = g.params["o3d.uri"].value;
        f = f.archiveInfo.getFileByURI(g);
        if (!f) throw "Could not find texture " + g + " in the archive";
        return o3djs.texture.createTextureFromRawData(b, f, true);
      } else
        return f.pack.createTextureCUBE(
          g.custom.edgeLength,
          g.custom.format,
          g.custom.levels,
          g.custom.renderSurfacesEnabled
        );
    },
  };
  this.initCallbacks = {
    "o3d.Curve": function (f, g, h) {
      if ("custom" in h)
        if ("keys" in h.custom) {
          h = h.custom.keys;
          f = o3djs.serialization.CURVE_KEY_TYPES.step;
          for (
            var i = o3djs.serialization.CURVE_KEY_TYPES.linear,
              j = o3djs.serialization.CURVE_KEY_TYPES.bezier,
              k = 0;
            k < h.length;
            ++k
          ) {
            var l = h[k];
            switch (l[0]) {
              case f:
                g.addStepKeys(l.slice(1));
                break;
              case i:
                g.addLinearKeys(l.slice(1));
                break;
              case j:
                g.addBezierKeys(l.slice(1));
                break;
            }
          }
        } else {
          f = f.archiveInfo.getFileByURI("curve-keys.bin");
          g.set(
            f,
            h.custom.binaryRange[0],
            h.custom.binaryRange[1] - h.custom.binaryRange[0]
          );
        }
    },
    "o3d.Effect": function (f, g) {
      var h = g.getParam("o3d.uri");
      if (h) {
        f = f.archiveInfo.getFileByURI(h.value);
        if (!f) throw "Cannot find shader " + h.value + " in archive.";
        if (!g.loadFromFXString(f.stringValue))
          throw "Cannot load shader " + h.value + " in archive.";
      }
    },
    "o3d.Skin": function (f, g, h) {
      if ("custom" in h) {
        f = f.archiveInfo.getFileByURI("skins.bin");
        g.set(
          f,
          h.custom.binaryRange[0],
          h.custom.binaryRange[1] - h.custom.binaryRange[0]
        );
      }
    },
    "o3d.SkinEval": function (f, g, h) {
      if ("custom" in h)
        for (var i = 0; i < h.custom.vertexStreams.length; ++i) {
          var j = h.custom.vertexStreams[i],
            k = f.getObjectById(j.stream.field);
          g.setVertexStream(
            j.stream.semantic,
            j.stream.semanticIndex,
            k,
            j.stream.startIndex
          );
          if ("bind" in j) {
            k = f.getObjectById(j.bind);
            g.bindStream(k, j.stream.semantic, j.stream.semanticIndex);
          }
        }
    },
    "o3d.StreamBank": function (f, g, h) {
      if ("custom" in h)
        for (var i = 0; i < h.custom.vertexStreams.length; ++i) {
          var j = h.custom.vertexStreams[i],
            k = f.getObjectById(j.stream.field);
          g.setVertexStream(
            j.stream.semantic,
            j.stream.semanticIndex,
            k,
            j.stream.startIndex
          );
          if ("bind" in j) {
            k = f.getObjectById(j.bind);
            g.bindStream(k, j.stream.semantic, j.stream.semanticIndex);
          }
        }
    },
  };
  if (!("version" in c)) throw "Version in JSON file was missing.";
  if (c.version < o3djs.serialization.supportedVersion)
    throw (
      "Version in JSON file was " +
      c.version +
      " but expected at least version " +
      o3djs.serialization.supportedVersion +
      "."
    );
  if (!("objects" in c)) throw "Objects array in JSON file was missing.";
  this.objectsById_ = [null];
  this.objectsByIndex_ = [];
  this.classNames_ = [];
  for (var e in c.objects) this.classNames_.push(e);
  this.globalObjectIndex_ =
    this.nextObjectIndex_ =
    this.nextClassIndex_ =
    this.phase_ =
      0;
};
a = o3djs.serialization.Deserializer.prototype;
a.getObjectById = function (b) {
  return this.objectsById_[b];
};
a.addObject = function (b, c) {
  this.objectsById_[b] = c;
};
a.deserializeValue = function (b) {
  if (typeof b === "object") {
    if (b === null) return null;
    var c = b;
    if ("length" in c) {
      for (b = 0; b != c.length; ++b) c[b] = this.deserializeValue(c[b]);
      return c;
    }
    c = c.ref;
    if (c !== undefined) {
      b = this.objectsById_[c];
      if (b === undefined) throw "Could not find object with id " + c + ".";
      return b;
    }
  }
  return b;
};
a.setParamValue_ = function (b, c, d) {
  b = b.getParam(c);
  if (b !== null) {
    c = d.value;
    if (c !== undefined) b.value = this.deserializeValue(c);
    d = d.bind;
    if (d !== undefined) {
      c = this.objectsById_[d];
      if (c === undefined)
        throw "Could not find output param with id " + d + ".";
      b.bind(c);
    }
  }
};
a.createAndIdentifyParam_ = function (b, c, d) {
  var e = d["class"];
  b = e !== undefined ? b.createParam(c, e) : b.getParam(c);
  d = d.id;
  if (d !== undefined && b !== null) this.objectsById_[d] = b;
};
a.createObjectsPhase_ = function (b) {
  for (
    ;
    this.nextClassIndex_ < this.classNames_.length;
    ++this.nextClassIndex_
  ) {
    for (
      var c = this.classNames_[this.nextClassIndex_],
        d = this.json.objects[c],
        e = d.length;
      this.nextObjectIndex_ < e;
      ++this.nextObjectIndex_
    ) {
      if (b-- <= 0) return;
      var f = d[this.nextObjectIndex_],
        g = undefined;
      if ("id" in f) g = this.objectsById_[f.id];
      if (g === undefined)
        g =
          c in this.createCallbacks
            ? this.createCallbacks[c](this, f)
            : this.pack.createObject(c);
      this.objectsByIndex_[this.globalObjectIndex_++] = g;
      if ("id" in f) this.objectsById_[f.id] = g;
      if ("params" in f)
        if ("length" in f.params)
          for (var h = 0; h != f.params.length; ++h) {
            var i = f.params[h];
            this.createAndIdentifyParam_(g, h, i);
          }
        else
          for (var j in f.params) {
            i = f.params[j];
            this.createAndIdentifyParam_(g, j, i);
          }
    }
    this.nextObjectIndex_ = 0;
  }
  if (this.nextClassIndex_ === this.classNames_.length) {
    this.globalObjectIndex_ = this.nextObjectIndex_ = this.nextClassIndex_ = 0;
    ++this.phase_;
  }
};
a.setPropertiesPhase_ = function (b) {
  for (
    ;
    this.nextClassIndex_ < this.classNames_.length;
    ++this.nextClassIndex_
  ) {
    for (
      var c = this.classNames_[this.nextClassIndex_],
        d = this.json.objects[c],
        e = d.length;
      this.nextObjectIndex_ < e;
      ++this.nextObjectIndex_
    ) {
      if (b-- <= 0) return;
      var f = d[this.nextObjectIndex_],
        g = this.objectsByIndex_[this.globalObjectIndex_++];
      if ("properties" in f)
        for (var h in f.properties)
          if (h in g) {
            var i = f.properties[h];
            i = this.deserializeValue(i);
            g[h] = i;
          }
      if ("params" in f)
        if ("length" in f.params)
          for (i = 0; i != f.params.length; ++i) {
            var j = f.params[i];
            this.setParamValue_(g, i, j);
          }
        else
          for (var k in f.params) {
            j = f.params[k];
            this.setParamValue_(g, k, j);
          }
      c in this.initCallbacks && this.initCallbacks[c](this, g, f);
    }
    this.nextObjectIndex_ = 0;
  }
  if (this.nextClassIndex_ === this.classNames_.length) {
    this.globalObjectIndex_ = this.nextObjectIndex_ = this.nextClassIndex_ = 0;
    ++this.phase_;
  }
};
a.run = function (b) {
  if (b) {
    switch (this.phase_) {
      case 0:
        this.createObjectsPhase_(b);
        break;
      case 1:
        this.setPropertiesPhase_(b);
        break;
    }
    return this.phase_ < 2;
  } else {
    for (; this.run(10000); );
    return false;
  }
};
a.runBackground = function (b, c, d, e) {
  var f = this.json.objects.length * 2;
  d = d * 60;
  var g = f / d,
    h,
    i = this;
  function j() {
    var k = null,
      l = false,
      n = o3djs.error.createErrorCollector(b);
    try {
      l = !i.run(g);
    } catch (m) {
      l = true;
      k = m;
    }
    if (n.errors.length > 0) {
      l = true;
      k = n.errors.join("\n") + (k ? "\n" + k.toString() : "");
    }
    n.finish();
    if (l) {
      window.clearInterval(h);
      e(c, k);
    }
  }
  h = window.setInterval(j, 1000 / 60);
};
o3djs.serialization.createDeserializer = function (b, c) {
  return new o3djs.serialization.Deserializer(b, c);
};
o3djs.serialization.deserialize = function (b, c) {
  b = o3djs.serialization.createDeserializer(b, c);
  b.run();
};
o3djs.serialization.deserializeArchive = function (b, c, d, e, f, g, h) {
  h = h || {};
  var i = b.getFileByURI(c);
  if (!i) throw "Could not find " + c + " in archive";
  i = eval("(" + i.stringValue + ")");
  c = o3djs.serialization.createDeserializer(e, i);
  c.addObject(i.o3d_rootObject_root, f);
  c.archiveInfo = b;
  b = function (k, l) {
    if (!l) {
      var n = k.getObjects("o3d.animSourceOwner", "o3d.ParamObject");
      if (n.length > 0) {
        if (h.opt_animSource) {
          var m = n[0].getParam("animSource");
          m = m.outputConnections;
          for (var o = 0; o < m.length; ++o) m[o].bind(h.opt_animSource);
        }
        for (o = 0; o < n.length; ++o) k.removeObject(n[o]);
      }
    }
    g(k, f, l);
  };
  if (h.opt_async) c.runBackground(d, e, 5, b);
  else {
    i = null;
    d = o3djs.error.createErrorCollector(d);
    try {
      c.run();
    } catch (j) {
      i = j;
    }
    if (d.errors.length > 0)
      i = d.errors.join("\n") + (i ? "\n" + i.toString() : "");
    d.finish();
    b(e, i);
  }
};
o3djs.provide("o3djs.shape");
o3djs.shape = o3djs.shape || {};
o3djs.shape.addMissingTexCoordStreams = function (b) {
  b = b.elements;
  for (var c = 0; c < b.length; ++c) {
    var d = b[c];
    o3djs.element.addMissingTexCoordStreams(d);
  }
};
o3djs.shape.setBoundingBoxesAndZSortPoints = function (b) {
  b = b.elements;
  for (var c = 0; c < b.length; ++c) {
    var d = b[c];
    o3djs.element.setBoundingBoxAndZSortPoint(d);
  }
};
o3djs.shape.prepareShape = function (b, c) {
  c.createDrawElements(b, null);
  o3djs.shape.setBoundingBoxesAndZSortPoints(c);
  o3djs.shape.addMissingTexCoordStreams(c);
};
o3djs.shape.prepareShapes = function (b) {
  for (var c = b.getObjectsByClassName("o3d.Shape"), d = 0; d < c.length; ++d)
    o3djs.shape.prepareShape(b, c[d]);
};
o3djs.shape.deleteDuplicateShape = function (b, c) {
  for (var d = b.elements, e = 0; e < d.length; e++) {
    for (var f = d[e], g = f.drawElements, h = 0; h < g.length; h++) {
      var i = g[h];
      c.removeObject(i);
    }
    c.removeObject(f);
  }
  c.removeObject(b);
};
o3djs.shape.duplicateShape = function (b, c) {
  var d = b.createObject("Shape");
  c = c.elements;
  for (var e = 0; e < c.length; e++) {
    var f = o3djs.element.duplicateElement(b, c[e]);
    f.owner = d;
  }
  d.createDrawElements(b, null);
  return d;
};
o3djs.provide("o3djs.simple");
o3djs.simple = o3djs.simple || {};
o3djs.simple.create = function (b) {
  return new o3djs.simple.SimpleInfo(b);
};
o3djs.simple.SimpleInfo = function (b) {
  this.clientObject = b;
  this.o3d = b.o3d;
  this.client = b.client;
  this.pack = this.client.createPack();
  this.root = this.pack.createObject("Transform");
  this.viewInfo = o3djs.rendergraph.createBasicView(
    this.pack,
    this.root,
    this.client.renderGraphRoot
  );
  this.updateObjects_ = {};
  this.nextId_ = 1;
  b = this.pack.createObject("Material");
  o3djs.effect.attachStandardShader(this.pack, b, [0, 0, 0], "phong");
  this.nonTexturedEffect_ = b.effect;
  this.pack.removeObject(b);
  b = this.pack.createObject("Material");
  b.createParam("diffuseSampler", "ParamSampler");
  o3djs.effect.attachStandardShader(this.pack, b, [0, 0, 0], "phong");
  this.texturedEffect_ = b.effect;
  this.pack.removeObject(b);
  this.globalParamObject = this.pack.createObject("ParamObject");
  this.lightWorldPosParam = this.globalParamObject.createParam(
    "lightWorldPos",
    "ParamFloat3"
  );
  this.lightColorParam = this.globalParamObject.createParam(
    "lightColor",
    "ParamFloat4"
  );
  this.setLightColor(1, 1, 1, 1);
  this.setLightPosition(255, 150, 150);
  this.zNear = 0.1;
  this.zFar = 1000;
  this.fieldOfView = o3djs.math.degToRad(45);
  this.setPerspectiveMatrix_();
  this.cameraPosition = [250, 150, 150];
  this.cameraTarget = [0, 0, 0];
  this.cameraUp = [0, 1, 0];
  this.setViewMatrix_();
  var c = this;
  this.client.setRenderCallback(function (d) {
    d = Math.min(d.elapsedTime, 0.1);
    c.onRender_(d);
  });
};
a = o3djs.simple.SimpleInfo.prototype;
a.getNextId = function () {
  return this.nextId_++;
};
a.createSimpleShape = function (b) {
  b.createDrawElements(this.pack, null);
  var c = this.pack.createObject("Transform");
  c.parent = this.root;
  c.addShape(b);
  return new o3djs.simple.SimpleShape(this, c);
};
a.onRender_ = function (b) {
  for (var c in this.updateObjects_) {
    var d = c;
    this.updateObjects_[d].onUpdate(b);
  }
};
a.registerObjectForUpdate = function (b) {
  this.updateObjects_[b.id] = b;
};
a.unregisterObjectForUpdate = function (b) {
  delete this.updateObjects_[b.id];
};
a.setPerspectiveMatrix_ = function () {
  this.viewInfo.drawContext.projection = o3djs.math.matrix4.perspective(
    this.fieldOfView,
    this.client.width / this.client.height,
    this.zNear,
    this.zFar
  );
};
a.setViewMatrix_ = function () {
  this.viewInfo.drawContext.view = o3djs.math.matrix4.lookAt(
    this.cameraPosition,
    this.cameraTarget,
    this.cameraUp
  );
};
a.setFieldOfView = function (b) {
  this.fieldOfView = b;
  this.setPerspectiveMatrix_();
};
a.setZClip = function (b, c) {
  this.zNear = b;
  this.zFar = c;
  this.setPerspectiveMatrix_();
};
a.setLightPosition = function (b, c, d) {
  this.lightWorldPosParam.set(b, c, d);
};
a.setLightColor = function (b, c, d, e) {
  this.lightColorParam.set(b, c, d, e);
};
a.setCameraPosition = function (b, c, d) {
  this.cameraPosition = [b, c, d];
  this.setViewMatrix_();
};
a.setCameraTarget = function (b, c, d) {
  this.cameraTarget = [b, c, d];
  this.setViewMatrix_();
};
a.setCameraUp = function (b, c, d) {
  this.cameraUp = [b, c, d];
  this.setViewMatrix_();
};
a.createMaterialFromEffect = function (b) {
  var c = this.pack.createObject("Material");
  c.drawList = this.viewInfo.performanceDrawList;
  c.effect = b;
  b.createUniformParameters(c);
  c.getParam("lightWorldPos").bind(this.lightWorldPosParam);
  c.getParam("lightColor").bind(this.lightColorParam);
  return c;
};
a.createNonTexturedMaterial = function () {
  var b = this.createMaterialFromEffect(this.nonTexturedEffect_);
  b.getParam("diffuse").set(1, 1, 1, 1);
  b.getParam("emissive").set(0, 0, 0, 1);
  b.getParam("ambient").set(0, 0, 0, 1);
  b.getParam("specular").set(1, 1, 1, 1);
  b.getParam("shininess").value = 20;
  return b;
};
a.createTexturedMaterial = function () {
  var b = this.createMaterialFromEffect(this.texturedEffect_),
    c = b.getParam("diffuseSampler"),
    d = this.pack.createObject("Sampler");
  c.value = d;
  return b;
};
a.createCube = function (b) {
  var c = this.createNonTexturedMaterial("phong");
  b = o3djs.primitives.createCube(this.pack, c, b);
  return this.createSimpleShape(b);
};
a.createBox = function (b, c, d) {
  var e = this.createNonTexturedMaterial("phong");
  b = o3djs.primitives.createBox(this.pack, e, b, c, d);
  return this.createSimpleShape(b);
};
a.createSphere = function (b, c) {
  var d = this.createNonTexturedMaterial("phong");
  b = o3djs.primitives.createSphere(this.pack, d, b, c * 2, c);
  return this.createSimpleShape(b);
};
a.loadScene = function (b, c) {
  var d = this.client.createPack(),
    e = d.createObject("Transform"),
    f = d.createObject("ParamObject"),
    g = f.createParam("animTime", "ParamFloat"),
    h = this,
    i = function (j, k, l) {
      var n = null;
      if (l) j.destroy();
      else n = new o3djs.simple.SimpleScene(h, b, j, k, f);
      c(n, l);
    };
  return o3djs.scene.loadScene(this.client, d, e, b, i, { opt_animSource: g });
};
a.viewAll = function () {
  var b = o3djs.util.getBoundingBoxOfTree(this.root),
    c = o3djs.math.lerpVector(b.minExtent, b.maxExtent, 0.5);
  this.setCameraTarget(c[0], c[1], c[2]);
  var d = o3djs.math.distance(b.minExtent, b.maxExtent);
  b = o3djs.math.addVector(c, [
    b.maxExtent[0],
    b.minExtent[1] + 0.5 * d,
    b.maxExtent[2],
  ]);
  this.setCameraPosition(b[0], b[1], b[2]);
  this.setZClip(d / 1000, d * 10);
};
o3djs.simple.SimpleObject = function () {};
o3djs.simple.SimpleObject.prototype.init = function (b, c) {
  this.simpleInfo = b;
  this.id = b.getNextId();
  this.transform = c;
  this.pickCallback_ = this.updateCallback_ = null;
};
o3djs.simple.SimpleObject.prototype.onPicked = function () {
  throw "not implemented";
};
o3djs.simple.SimpleObject.prototype.onUpdate = function (b) {
  this.updateCallback_ && this.updateCallback_(b);
};
o3djs.simple.SimpleObject.prototype.setOnUpdate = function (b) {
  b
    ? this.simpleInfo.registerObjectForUpdate(this)
    : this.simpleInfo.unregisterObjectForUpdate(this);
  var c = this.updateCallback_;
  this.updateCallback_ = b;
  return c;
};
o3djs.simple.SimpleShape = function (b, c) {
  this.init(b, c);
};
o3djs.simple.SimpleShape.prototype = new o3djs.simple.SimpleObject();
a = o3djs.simple.SimpleShape.prototype;
a.getMaterial = function () {
  return this.transform.shapes[0].elements[0].material;
};
a.setMaterial = function (b) {
  var c = this.getMaterial();
  c != null && this.simpleInfo.pack.removeObject(c);
  this.transform.shapes[0].elements[0].material = b;
};
a.setDiffuseColor = function (b, c, d, e) {
  var f = this.getMaterial();
  f.getParam("diffuse").set(b, c, d, e);
  f.drawList =
    e < 1
      ? this.simpleInfo.viewInfo.zOrderedDrawList
      : this.simpleInfo.viewInfo.performanceDrawList;
};
a.getTexture = function () {
  var b = this.getMaterial();
  b = b.getParam("diffuseSampler");
  if (b.className == "o3d.ParamSampler") return b.texture;
  return null;
};
a.loadTexture = function (b) {
  var c = this;
  o3djs.io.loadTexture(this.simpleInfo.pack, b, function (d, e) {
    if (e) alert("Load texture file returned failure. \n" + e);
    else {
      e = c.getMaterial();
      if (e.effect != c.simpleInfo.texturedEffect_) {
        var f = c.simpleInfo.createTexturedMaterial("phong");
        f.copyParams(e);
        f.effect = c.simpleInfo.texturedEffect_;
        c.setMaterial(f);
        e = f;
      }
      e = e.getParam("diffuseSampler");
      e.value.texture = d;
    }
  });
};
o3djs.simple.SimpleScene = function (b, c, d, e, f) {
  this.init(b, e);
  this.url = c;
  this.pack = d;
  this.paramObject = f;
  this.animTimeParam = f.getParam("animTime");
  o3djs.pack.preparePack(d, b.viewInfo);
  this.cameraInfos_ = o3djs.camera.getCameraInfos(
    e,
    b.client.width,
    b.client.height
  );
  c = function (g, h, i) {
    (g = g.getParam(h)) && g.bind(i);
  };
  d = d.getObjectsByClassName("o3d.Material");
  for (e = 0; e < d.length; ++e) {
    f = d[e];
    c(f, "lightWorldPos", b.lightWorldPosParam);
    c(f, "lightColor", b.lightColorParam);
  }
  this.transform.parent = this.simpleInfo.root;
};
o3djs.simple.SimpleScene.prototype = new o3djs.simple.SimpleObject();
o3djs.simple.SimpleScene.prototype.setAnimTime = function (b) {
  this.animTimeParam.value = b;
};
o3djs.provide("o3djs.test");
o3djs.test = o3djs.test || {};
o3djs.test.AssertionError = function (b) {
  this.message = b;
  this.toString = function () {
    return b;
  };
};
o3djs.test.runTests = function (b, c) {
  try {
    c = c || o3djs.test.documentReporter;
    var d = 0,
      e = 0;
    for (var f in b)
      if (f.substring(0, 4) === "test")
        if (typeof b[f] === "function") {
          try {
            b[f]();
          } catch (g) {
            ++e;
            c.reportFail(f, String(g));
            continue;
          }
          ++d;
          c.reportPass(f);
        }
    c.reportSummary(d, e);
    return e == 0;
  } catch (h) {
    return false;
  }
};
o3djs.test.valueToString_ = function (b, c) {
  if (c === undefined) c = 3;
  if (typeof b === "object")
    if (b !== null)
      if (c === 0) b = "?";
      else if (o3djs.base.isArray(b)) {
        var d = b;
        b = "[";
        for (var e = "", f = 0; f < d.length; ++f) {
          b += e + o3djs.test.valueToString_(d[f], c - 1);
          e = ", ";
        }
        b += "]";
      } else {
        f = b;
        b = "{";
        e = "";
        for (d in f)
          if (typeof f[d] !== "function") {
            b += e + d + ": " + o3djs.test.valueToString_(f[d], c - 1);
            e = ", ";
          }
        b += "}";
      }
    else b = "null";
  else b = typeof b === "string" ? '"' + b + '"' : String(b);
  return b;
};
o3djs.test.assertTrue = function (b) {
  if (!b)
    throw new o3djs.test.AssertionError(
      "assertTrue failed for " + o3djs.test.valueToString_(b)
    );
};
o3djs.test.assertFalse = function (b) {
  if (b)
    throw new o3djs.test.AssertionError(
      "assertFalse failed for " + o3djs.test.valueToString_(b)
    );
};
o3djs.test.assertNull = function (b) {
  if (b !== null)
    throw new o3djs.test.AssertionError(
      "assertNull failed for " + o3djs.test.valueToString_(b)
    );
};
o3djs.test.assertEquals = function (b, c) {
  if (b !== c)
    throw new o3djs.test.AssertionError(
      "assertEquals failed: expected " +
        o3djs.test.valueToString_(b) +
        " but got " +
        o3djs.test.valueToString_(c)
    );
};
o3djs.test.assertClose = function (b, c) {
  if (c < b - 0.001 || c > b + 0.001)
    throw new o3djs.test.AssertionError(
      "assertClose failed: expected " +
        o3djs.test.valueToString_(b) +
        " but got " +
        o3djs.test.valueToString_(c)
    );
};
o3djs.test.compareArrays_ = function (b, c) {
  if (b.length !== c.length) return false;
  for (var d = 0; d != b.length; ++d)
    if (o3djs.base.isArray(b[d]) && o3djs.base.isArray(c[d])) {
      var e = b[d],
        f = c[d];
      if (!o3djs.test.compareArrays_(e, f)) return false;
    } else if (b[d] !== c[d]) return false;
  return true;
};
o3djs.test.assertArrayEquals = function (b, c) {
  if (!o3djs.base.isArray(b))
    throw new o3djs.test.AssertionError(
      "assertArrayEquals failed: expected value " +
        o3djs.test.valueToString_(b) +
        " is not an array"
    );
  if (!o3djs.base.isArray(c))
    throw new o3djs.test.AssertionError(
      "assertArrayEquals failed: actual value " +
        o3djs.test.valueToString_(c) +
        " is not an array"
    );
  if (!o3djs.test.compareArrays_(b, c))
    throw new o3djs.test.AssertionError(
      "assertArrayEquals failed: expected " +
        o3djs.test.valueToString_(b) +
        " but got " +
        o3djs.test.valueToString_(c)
    );
};
o3djs.test.createReportParagraph_ = function (b, c) {
  b = document.createTextNode(b);
  var d = document.createElement("p");
  d.appendChild(b);
  if (c !== undefined) d.style.color = c;
  return d;
};
o3djs.test.documentReporter = {
  getReportDiv_: function () {
    if (!this.reportDiv_) {
      this.reportDiv_ = document.createElement("div");
      document.body.appendChild(this.reportDiv_);
    }
    return this.reportDiv_;
  },
  reportPass: function (b) {
    b = o3djs.test.createReportParagraph_(b + " : PASS", "green");
    this.getReportDiv_().appendChild(b);
  },
  reportFail: function (b, c) {
    b = o3djs.test.createReportParagraph_(b + " : FAIL : " + c, "red");
    c = this.getReportDiv_();
    c.insertBefore(b, c.firstChild);
  },
  reportSummary: function (b, c) {
    b = o3djs.test.createReportParagraph_(
      b + " passed, " + c + " failed",
      "blue"
    );
    c = this.getReportDiv_();
    c.insertBefore(b, c.firstChild);
  },
};
o3djs.provide("o3djs.texture");
o3djs.texture = o3djs.texture || {};
o3djs.texture.MAX_TEXTURE_DIMENSION = 2048;
o3djs.texture.computeNumLevels = function (b, c) {
  if (b == 0 || c == 0) return 0;
  b = Math.max(b, c);
  for (c = 0; b > 0; ) {
    ++c;
    b = b >> 1;
  }
  return c;
};
o3djs.texture.createTextureFromRawData = function (b, c, d, e) {
  c = b.createBitmapsFromRawData(c);
  if (e || typeof e === "undefined")
    for (e = 0; e < c.length; ++e) {
      var f = c[e];
      f.semantic == o3djs.base.o3d.Bitmap.IMAGE && c[e].flipVertically();
    }
  d = o3djs.texture.createTextureFromBitmaps(b, c, d);
  for (e = 0; e < c.length; ++e) b.removeObject(c[e]);
  return d;
};
o3djs.texture.canMakeMipsAndScale = function (b) {
  switch (b) {
    case o3djs.base.o3d.Texture.XRGB8:
    case o3djs.base.o3d.Texture.ARGB8:
    case o3djs.base.o3d.Texture.ABGR16F:
    case o3djs.base.o3d.Texture.R32F:
    case o3djs.base.o3d.Texture.ABGR32F:
      return true;
    case o3djs.base.o3d.Texture.DXT1:
    case o3djs.base.o3d.Texture.DXT3:
    case o3djs.base.o3d.Texture.DXT5:
      return false;
  }
  return false;
};
o3djs.texture.createTextureFromBitmaps = function (b, c, d) {
  if (c.length == 0) throw "no bitmaps";
  var e = c[0].width,
    f = c[0].height,
    g = c[0].format,
    h = c[0].numMipmaps,
    i = o3djs.texture.computeNumLevels(e, f),
    j = h,
    k = e,
    l = f;
  if (
    (typeof d === "undefined" || d) &&
    o3djs.texture.canMakeMipsAndScale(g) &&
    h == 1 &&
    i > 1
  )
    j = i;
  for (d = 0; d < c.length; ++d) {
    var n = c[d];
    if (n.width != e || n.height != f || n.format != g || n.numMipmaps != h)
      throw "bitmaps must all be the same width, height, mips and format";
    j != h && n.generateMips(0, j - 1);
  }
  n.numMipmaps > 1 || o3djs.texture.computeNumLevels(k, l);
  var m;
  if (c.length == 6 && c[0].semantic != o3djs.base.o3d.Bitmap.SLICE) {
    if (e != f || e != k || f != l) throw "Cubemaps must be square";
    m = b.createTextureCUBE(k, g, j, false);
    for (d = 0; d < 6; ++d) m.setFromBitmap(d, c[d]);
  } else if (c.length == 1) {
    m = b.createTexture2D(k, l, g, j, false);
    m.setFromBitmap(c[0]);
  }
  return m;
};
o3djs.texture.createCubeTextureFrom6Bitmaps = function (b, c, d) {
  var e = o3djs.texture.computeNumLevels(c, c);
  b = b.createTextureCUBE(c, d[0].format, e, false);
  for (var f = 0; f < 6; ++f) {
    var g = d[f];
    b.drawImage(g, 0, 0, 0, g.width, g.height, f, 0, 0, c, c);
  }
  b.generateMips(0, e - 1);
  return b;
};
o3djs.provide("o3djs.util");
o3djs.util = o3djs.util || {};
o3djs.util.PLUGIN_NAME = "O3D Plugin";
o3djs.util.REQUIRED_VERSION = "0.1.42.0";
o3djs.util.MINIMUM_WIDTH_FOR_MESSAGE = 200;
o3djs.util.MINIMUM_HEIGHT_FOR_MESSAGE = 200;
o3djs.util.PLUGIN_DOWNLOAD_URL = "http://tools.google.com/dlpage/o3d";
o3djs.util.rendererInitStatus = {
  NO_PLUGIN: -1,
  UNINITIALIZED: 0,
  SUCCESS: 1,
  OUT_OF_RESOURCES: 2,
  GPU_NOT_UP_TO_SPEC: 3,
  INITIALIZATION_ERROR: 4,
};
o3djs.util.curry = function (b) {
  for (var c = [], d = 1; d < arguments.length; ++d) c.push(arguments[d]);
  return function () {
    for (var e = c.slice(), f = 0; f < arguments.length; ++f)
      e.push(arguments[f]);
    return b.apply(this, e);
  };
};
o3djs.util.getCurrentURI = function () {
  var b = window.location.href,
    c = b.lastIndexOf("/");
  return b.substring(0, c + 1);
};
o3djs.util.getAbsoluteURI = function (b) {
  return o3djs.util.getCurrentURI() + b;
};
o3djs.util.arrayContains = function (b, c) {
  for (var d = 0; d < b.length; d++) if (b[d] == c) return true;
  return false;
};
o3djs.util.getTransformsInTreeByTags = function (b, c) {
  c = c.split(",");
  b = b.getTransformsInTree();
  for (var d = [], e = 0; e < b.length; e++) {
    var f = b[e].getParam("collada.tags");
    if (f) {
      f = f.value.split(",");
      for (var g = 0; g < f.length; g++)
        if (o3djs.util.arrayContains(c, f[g])) {
          d[d.length] = b[e];
          break;
        }
    }
  }
  return d;
};
o3djs.util.getTransformsInTreeByPrefix = function (b, c) {
  var d = [];
  b = b.getTransformsInTree();
  for (var e = 0; e < b.length; e++) {
    var f = b[e];
    if (f.name.indexOf(c) == 0) d[d.length] = f;
  }
  return d;
};
o3djs.util.getBoundingBoxOfTree = function (b) {
  var c = b.boundingBox;
  if (c.valid) return c;
  for (var d = b.children, e = 0; e < d.length; ++e) {
    var f = d[e],
      g = o3djs.util.getBoundingBoxOfTree(f);
    if (g.valid) {
      g = g.mul(f.localMatrix);
      c = c.valid ? c.add(g) : g;
    }
  }
  b = b.shapes;
  for (e = 0; e < b.length; ++e) {
    d = b[e].elements;
    for (f = 0; f < d.length; ++f) {
      g = d[f].boundingBox;
      g.valid || (g = d[f].getBoundingBox(0));
      c = c.valid ? c.add(g) : g;
    }
  }
  return c;
};
o3djs.util.getPowerOfTwoSize = function (b) {
  for (var c = 1; b; ) {
    b = b >> 1;
    c = c << 1;
  }
  return c;
};
o3djs.util.getPluginVersion = function () {
  var b = null,
    c = null;
  if (navigator.plugins != null && navigator.plugins.length > 0) {
    var d = navigator.plugins[o3djs.util.PLUGIN_NAME];
    if (d) c = d.description;
  } else if (o3djs.base.IsMSIE())
    try {
      d = new ActiveXObject("o3d_host.O3DHostControl");
      c = d.description;
    } catch (e) {}
  if (c) {
    d = /.*version:(\d+)\.(\d+)\.(\d+)\.(\d+).*/;
    if ((c = d.exec(c)) && c.length == 5)
      b =
        "" +
        parseInt(c[1], 10) +
        "." +
        parseInt(c[2], 10) +
        "." +
        parseInt(c[3], 10) +
        "." +
        parseInt(c[4], 10);
  }
  return b;
};
o3djs.util.requiredVersionAvailable = function (b) {
  var c = o3djs.util.getPluginVersion();
  if (!c) return false;
  c = c.split(".");
  b = b.split(".");
  if (b.length > 4) throw Error("requiredVersion has more than 4 parts!");
  for (var d = 0; d < b.length; ++d) {
    var e = parseInt(c[d], 10),
      f = parseInt(b[d], 10);
    if (e < f) return false;
    if (e > f) return true;
  }
  return true;
};
o3djs.util.getElementsByTagAndId = function (b, c) {
  var d = [];
  b = document.getElementsByTagName(b);
  for (var e = 0; e < b.length; ++e) {
    var f = b[e];
    f.id && f.id.match(c) && d.push(f);
  }
  return d;
};
o3djs.util.getO3DContainerElements = function (b, c) {
  c = c || "div";
  b = b || "^o3d";
  return o3djs.util.getElementsByTagAndId(c, b);
};
o3djs.util.offerPlugin = function (b, c) {
  var d = o3djs.util.requiredVersionAvailable("");
  b = o3djs.util.getO3DContainerElements(b, c);
  c = false;
  d = d
    ? "This page requires a newer version of the O3D plugin."
    : "This page requires the O3D plugin to be installed.";
  for (
    var e =
        '<div style="background: lightblue; width: 100%; height: 100%; text-align:center;"><br/><br/>' +
        d +
        '<br/><a href="' +
        o3djs.util.PLUGIN_DOWNLOAD_URL +
        '">Click here to download.</a></div>',
      f = 0;
    f < b.length;
    ++f
  ) {
    var g = b[f];
    if (
      g.clientWidth >= o3djs.util.MINIMUM_WIDTH_FOR_MESSAGE &&
      g.clientHeight >= o3djs.util.MINIMUM_HEIGHT_FOR_MESSAGE &&
      g.style.display.toLowerCase() != "none" &&
      g.style.visibility.toLowerCase() != "hidden"
    ) {
      c = true;
      g.innerHTML = e;
    }
  }
  if (!c)
    if (confirm(d + "\n\nClick OK to download."))
      window.location = o3djs.util.PLUGIN_DOWNLOAD_URL;
};
o3djs.util.informNoGraphics = function (b, c, d, e) {
  d = o3djs.util.getO3DContainerElements(d, e);
  e = false;
  var f = "",
    g = function () {},
    h = function (j) {
      var k = "";
      if (j.length > 0) k = "<br/><br/><div>More Info:<br/>" + j + "</div>";
      return k;
    };
  if (b == o3djs.util.rendererInitStatus.GPU_NOT_UP_TO_SPEC) {
    b =
      "We are terribly sorry but it appears your graphics card is not able to run o3d. We are working on a solution.";
    c =
      '<div style="background: lightgray; width: 100%; height: 100%; text-align: center;"><br/><br/>' +
      b +
      '<br/><br/><a href="' +
      o3djs.util.PLUGIN_DOWNLOAD_URL +
      '">Click Here to go the O3D website</a>' +
      h(c) +
      "</div>";
    f = "\n\nClick OK to go to the o3d website.";
    g = function () {
      window.location = o3djs.util.PLUGIN_DOWNLOAD_URL;
    };
  } else if (b == o3djs.util.rendererInitStatus.OUT_OF_RESOURCES) {
    b =
      "Your graphics system appears to be out of resources. Try closing some applications and then refreshing this page.";
    c =
      '<div style="background: lightgray; width: 100%; height: 100%; text-align: center;"><br/><br/>' +
      b +
      h(c) +
      "</div>";
  } else {
    b =
      "A unknown error has prevented O3D from starting. Try downloading new drivers or checking for OS updates.";
    c =
      '<div style="background: lightgray; width: 100%; height: 100%; text-align: center;"><br/><br/>' +
      b +
      h(c) +
      "</div>";
  }
  for (h = 0; h < d.length; ++h) {
    var i = d[h];
    if (
      i.clientWidth >= o3djs.util.MINIMUM_WIDTH_FOR_MESSAGE &&
      i.clientHeight >= o3djs.util.MINIMUM_HEIGHT_FOR_MESSAGE &&
      i.style.display.toLowerCase() != "none" &&
      i.style.visibility.toLowerCase() != "hidden"
    ) {
      e = true;
      i.innerHTML = c;
    }
  }
  e || (confirm(b + f) && g());
};
o3djs.util.informPluginFailure = function (b, c, d, e) {
  b == o3djs.util.rendererInitStatus.NO_PLUGIN
    ? o3djs.util.offerPlugin(d, e)
    : o3djs.util.informNoGraphics(b, c, d, e);
};
o3djs.util.getElementContentById = function (b) {
  o3djs.BROWSER_ONLY = true;
  var c = document.getElementById(b);
  if (!c) throw "getElementContentById could not find node with id " + b;
  switch (c.tagName) {
    case "TEXTAREA":
      return c.value;
    case "SCRIPT":
      return c.text;
    default:
      throw (
        "getElementContentById does not no how to get content from a " +
        c.tagName +
        " element"
      );
  }
};
o3djs.util.getElementById = function (b) {
  o3djs.BROWSER_ONLY = true;
  return document.getElementById(b);
};
o3djs.util.Engine = { BROWSER: 0, V8: 1 };
o3djs.util.mainEngine_ = o3djs.util.Engine.BROWSER;
o3djs.util.setMainEngine = function (b) {
  o3djs.util.mainEngine_ = b;
};
o3djs.util.fixFunctionString_ = /^\s*function\s+[^\s]+\s*\(([^)]*)\)/;
o3djs.util.callV8 = function (b, c, d, e) {
  c = c.toString();
  c = c.replace(o3djs.util.fixFunctionString_, "function($1)");
  c =
    "function(thisArg, args) {\n  var localArgs = [];\n  var numArgs = args.length;\n  for (var i = 0; i < numArgs; ++i) {\n    localArgs.push(args[i]);\n  }\n  var func = " +
    c +
    ";\n  return func.apply(thisArg, localArgs);\n}\n";
  b = b.eval(c);
  return b(d, e);
};
o3djs.util.stripDotDot_ = /\/[^\/]+\/\.\./;
o3djs.util.toAbsoluteUri = function (b) {
  if (b.indexOf("://") == -1) {
    var c = document.location.toString(),
      d = c.lastIndexOf("/");
    if (d != -1) c = c.substring(0, d);
    b = c + "/" + b;
  }
  do {
    c = b;
    b = b.replace(o3djs.util.stripDotDot_, "");
  } while (c !== b);
  return b;
};
o3djs.util.scriptUris_ = [];
o3djs.util.addScriptUri = function (b) {
  o3djs.util.scriptUris_.push(o3djs.util.toAbsoluteUri(b));
};
o3djs.util.isScriptUri = function (b) {
  b = o3djs.util.toAbsoluteUri(b);
  for (var c = 0; c < o3djs.util.scriptUris_.length; ++c) {
    var d = o3djs.util.scriptUris_[c];
    if (b.substring(0, d.length) === d) return true;
  }
  return false;
};
o3djs.util.isWantedScriptTag_ = function (b) {
  return b.id && b.id.match(/^o3dscript/);
};
o3djs.util.getScriptTagText_ = function () {
  for (
    var b = "", c = document.getElementsByTagName("script"), d = 0;
    d < c.length;
    ++d
  ) {
    var e = c[d];
    if (e.type === "" || e.type === "text/javascript") {
      if ("text" in e && e.text && o3djs.util.isWantedScriptTag_(e))
        b += e.text;
      if ("src" in e && e.src && o3djs.util.isScriptUri(e.src))
        b += o3djs.io.loadTextFileSynchronous(e.src);
    }
  }
  return b;
};
o3djs.util.createClient = function (b, c, d) {
  c = c || "";
  d = d || o3djs.util.REQUIRED_VERSION;
  if (!o3djs.util.requiredVersionAvailable(d)) return null;
  c += (c ? "," : "") + "APIVersion=" + d;
  if (o3djs.base.IsMSIE()) {
    b.innerHTML =
      '<OBJECT WIDTH="100%" HEIGHT="100%"CLASSID="CLSID:9666A772-407E-4F90-BC37-982E8160EB2D"><PARAM name="o3d_features" value="' +
      c +
      '"/></OBJECT>';
    d = b.childNodes[0];
  } else {
    d = document.createElement("object");
    d.type = "application/vnd.o3d.auto";
    d.style.width = "100%";
    d.style.height = "100%";
    d.setAttribute("o3d_features", c);
    b.appendChild(d);
  }
  return d;
};
o3djs.util.makeClients = function (b, c, d, e, f, g) {
  e = e || o3djs.util.informPluginFailure;
  d = d || o3djs.util.REQUIRED_VERSION;
  if (o3djs.util.requiredVersionAvailable(d)) {
    var h = [];
    d = o3djs.util.getO3DContainerElements(f, g);
    for (var i = null, j = 0; j < d.length; ++j) {
      var k = d[j],
        l = c;
      if (!l) l = (l = k.getAttribute("o3d_features")) ? l : "";
      l = o3djs.util.createClient(k, l);
      h.push(l);
      if (k.id === "o3d") i = l;
    }
    var n = o3djs.base.IsChrome10(),
      m = window.setInterval(function () {
        for (var o = 0, s = "", t, q = 0; q < h.length; ++q) {
          var r = h[q];
          var u =
            (t = r.o3d) &&
            r.client &&
            r.client.rendererInitStatus >
              o3djs.util.rendererInitStatus.UNINITIALIZED;
          if (!u) {
            if (n) r.style.width = r.style.width != "100%" ? "100%" : "1px";
            return;
          }
          if (n && r.style.width != "100%") {
            r.style.width = "100%";
            return;
          }
          r = h[q].client.rendererInitStatus;
          if (r > o) {
            o = r;
            s = h[q].client.lastError;
          }
        }
        window.clearInterval(m);
        if (o > 0 && o != t.Renderer.SUCCESS) {
          for (q = 0; q < h.length; ++q) {
            t = h[q];
            t.parentNode.removeChild(t);
          }
          e(o, s, f, g);
        } else {
          o3djs.base.snapshotProvidedNamespaces();
          for (q = 0; q < h.length; ++q) {
            o3djs.base.initV8(h[q]);
            o3djs.event.startKeyboardEventSynthesis(h[q]);
            o3djs.error.setDefaultErrorHandler(h[q].client);
          }
          o3djs.base.init(h[0]);
          switch (o3djs.util.mainEngine_) {
            case o3djs.util.Engine.BROWSER:
              b(h);
              break;
            case o3djs.util.Engine.V8:
              if (!i)
                throw 'V8 engine was requested but there is no element with the id "o3d"';
              o = o3djs.util.getScriptTagText_();
              i.eval(o);
              o3djs.util.callV8(i, b, o3djs.global, [h]);
              break;
            default:
              throw "Unknown engine " + o3djs.util.mainEngine_;
          }
        }
      }, 10);
  } else e(o3djs.util.rendererInitStatus.NO_PLUGIN, "", f, g);
};

o3djs.require("o3djs.error");
o3djs.require("o3djs.primitives");
o3djs.require("o3djs.math");
o3djs.require("o3djs.quaternions");
o3djs.require("o3djs.util");
o3djs.require("o3djs.pack");
o3djs.require("o3djs.effect");
o3djs.require("o3djs.rendergraph");
o3djs.require("o3djs.element");
o3djs.require("o3djs.texture");
o3djs.require("o3djs.shape");
o3djs.require("o3djs.serialization");
o3djs.require("o3djs.dump");
o3djs.require("o3djs.camera");
o3djs.require("o3djs.scene");
o3djs.require("o3djs.material");
o3djs.require("o3djs.event");
o3djs.require("o3djs.canvas");
o3djs.require("o3djs.io");
