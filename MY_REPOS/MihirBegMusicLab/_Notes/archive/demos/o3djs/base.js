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
o3djs.base.glsl = false;
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
    o3djs.base.glsl = plugin.client.clientInfo.glsl;
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
  o3djs.base.glsl = b.client.clientInfo.glsl;
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
    k = undefined,
    j,
    l = o3djs.math,
    n;
  j = b.getParam("collada.eyePosition");
  var m = b.getParam("collada.targetPosition"),
    o = b.getParam("collada.upVector");
  if (j != null && m != null && o != null) {
    h = j.value;
    i = m.value;
    k = o.value;
    j = l.matrix4.lookAt(h, i, k);
  } else j = l.inverse(b.getUpdatedWorldMatrix());
  if ((m = b.getParam("collada.projectionType"))) {
    f = b.getParam("collada.projectionNearZ").value;
    g = b.getParam("collada.projectionFarZ").value;
    if (m.value == "orthographic") {
      m = b.getParam("collada.projectionMagX").value;
      b = b.getParam("collada.projectionMagY").value;
      n = new o3djs.camera.CameraInfo(j, f, g);
      n.setAsOrthographic(m, b);
    } else if (m.value == "perspective")
      e = b.getParam("collada.perspectiveFovY").value;
  }
  if (!n) {
    n = new o3djs.camera.CameraInfo(j, f, g, h, i, k);
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
  this.sphereShape_ = o3djs.lineprimitives.createLineSphere(
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
  this.cubeShape_ = o3djs.lineprimitives.createLineCube(
    b,
    this.axisMaterial_,
    1
  );
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
o3djs.effect.o3d = {
  FLOAT2: "float2",
  FLOAT3: "float3",
  FLOAT4: "float4",
  MATRIX4: "float4x4",
  MATRIX3: "float3x3",
  MOD: "fmod",
  ATTRIBUTE: "  ",
  ATTRIBUTE_PREFIX: "input.",
  VARYING: "  ",
  VARYING_DECLARATION_PREFIX: "",
  VERTEX_VARYING_PREFIX: "output.",
  PIXEL_VARYING_PREFIX: "input.",
  TEXTURE: "tex",
  BEGIN_IN_STRUCT: "struct InVertex {\n",
  BEGIN_OUT_STRUCT: "struct OutVertex {\n",
  END_STRUCT: "};\n",
};
o3djs.effect.glsl = {
  FLOAT2: "vec2",
  FLOAT3: "vec3",
  FLOAT4: "vec4",
  MATRIX4: "mat4",
  MATRIX3: "mat3",
  MOD: "mod",
  ATTRIBUTE: "attribute ",
  ATTRIBUTE_PREFIX: "",
  VARYING: "varying ",
  VARYING_DECLARATION_PREFIX: "v_",
  VERTEX_VARYING_PREFIX: "v_",
  PIXEL_VARYING_PREFIX: "v_",
  TEXTURE: "texture",
  BEGIN_IN_STRUCT: "",
  BEGIN_OUT_STRUCT: "",
  END_STRUCT: "",
  semanticNameMap: {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    BINORMAL: "binormal",
    COLOR: "color",
    TEXCOORD0: "texCoord0",
    TEXCOORD1: "texCoord1",
    TEXCOORD2: "texCoord2",
    TEXCOORD3: "texCoord3",
    TEXCOORD4: "texCoord4",
    TEXCOORD5: "texCoord5",
    TEXCOORD6: "texCoord6",
    TEXCOORD7: "texCoord7",
  },
};
o3djs.effect.glsl.semanticSuffix = function () {
  return "";
};
o3djs.effect.o3d.semanticSuffix = function (b) {
  return " : " + b;
};
o3djs.effect.glsl.getAttributeName_ = function (b, c) {
  b = o3djs.effect;
  return b.semanticNameMap[c];
};
o3djs.effect.o3d.getAttributeName_ = function (b) {
  return b;
};
o3djs.effect.glsl.mul = function (b, c) {
  return "(" + c + " * " + b + ")";
};
o3djs.effect.o3d.mul = function (b, c) {
  return "mul(" + b + ", " + c + ")";
};
o3djs.effect.glsl.utilityFunctions = function () {
  return "vec4 lit(float l ,float h, float m) {\n  return vec4(1.0,\n              max(l, 0.0),\n              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,\n              1.0);\n}\n";
};
o3djs.effect.o3d.utilityFunctions = function () {
  return "";
};
o3djs.effect.glsl.beginVertexShaderMain = function () {
  return "void main() {\n";
};
o3djs.effect.o3d.beginVertexShaderMain = function () {
  return "OutVertex vertexShaderFunction(InVertex input) {\n  OutVertex output;\n";
};
o3djs.effect.glsl.endVertexShaderMain = function () {
  return (
    "  gl_Position = " + o3djs.effect.VERTEX_VARYING_PREFIX + "position;\n}\n"
  );
};
o3djs.effect.o3d.endVertexShaderMain = function () {
  return "  return output;\n}\n";
};
o3djs.effect.glsl.pixelShaderHeader = function () {
  return "\n// #o3d SplitMarker\n";
};
o3djs.effect.o3d.pixelShaderHeader = function () {
  return "";
};
o3djs.effect.glsl.repeatVaryingDecls = function (b) {
  return (b || o3djs.effect.varying_decls_ || o3djs.buildVaryingDecls()) + "\n";
};
o3djs.effect.o3d.repeatVaryingDecls = function () {
  return "";
};
o3djs.effect.glsl.beginPixelShaderMain = function () {
  return "void main() {\n";
};
o3djs.effect.o3d.beginPixelShaderMain = function () {
  return "float4 pixelShaderFunction(OutVertex input) : COLOR {\n";
};
o3djs.effect.o3d.endPixelShaderMain = function (b) {
  return "  return " + b + ";\n}\n";
};
o3djs.effect.glsl.endPixelShaderMain = function (b) {
  return "  gl_FragColor = " + b + ";\n}\n";
};
o3djs.effect.o3d.entryPoints = function () {
  return "// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n";
};
o3djs.effect.glsl.entryPoints = function () {
  return "";
};
o3djs.effect.glsl.matrixLoadOrder = o3djs.effect.o3d.matrixLoadOrder =
  function () {
    return "// #o3d MatrixLoadOrder RowMajor\n";
  };
o3djs.effect.setLanguage = function (b) {
  var c = o3djs.effect.o3d;
  if (b == "glsl") c = o3djs.effect.glsl;
  for (var d in o3djs.effect.glsl) o3djs.effect[d] = c[d];
  o3djs.effect.TWO_COLOR_CHECKER_FXSTRING =
    o3djs.effect.buildCheckerShaderString();
};
o3djs.effect.buildAttributeDecls = function (b, c, d, e) {
  var f =
    o3djs.effect.BEGIN_IN_STRUCT +
    o3djs.effect.ATTRIBUTE +
    o3djs.effect.FLOAT4 +
    " position" +
    o3djs.effect.semanticSuffix("POSITION") +
    ";\n";
  if (c || d)
    f +=
      o3djs.effect.ATTRIBUTE +
      o3djs.effect.FLOAT3 +
      " normal" +
      o3djs.effect.semanticSuffix("NORMAL") +
      ";\n";
  f +=
    o3djs.effect.buildTexCoords(b, false) +
    o3djs.effect.buildBumpInputCoords(e) +
    o3djs.effect.END_STRUCT;
  return f;
};
o3djs.effect.varying_decls_ = "";
o3djs.effect.buildVaryingDecls = function (b, c, d, e) {
  var f = o3djs.effect;
  b =
    f.BEGIN_OUT_STRUCT +
    f.VARYING +
    f.FLOAT4 +
    " " +
    f.VARYING_DECLARATION_PREFIX +
    "position" +
    f.semanticSuffix("POSITION") +
    ";\n" +
    f.buildTexCoords(b, true) +
    f.buildBumpOutputCoords(e);
  if (c || d)
    b +=
      f.VARYING +
      f.FLOAT3 +
      " " +
      f.VARYING_DECLARATION_PREFIX +
      "normal" +
      f.semanticSuffix("TEXCOORD" + f.interpolant_++ + "") +
      ";\n" +
      f.VARYING +
      f.FLOAT3 +
      " " +
      f.VARYING_DECLARATION_PREFIX +
      "surfaceToLight" +
      f.semanticSuffix("TEXCOORD" + f.interpolant_++ + "") +
      ";\n";
  if (d)
    b +=
      f.VARYING +
      f.FLOAT3 +
      " " +
      f.VARYING_DECLARATION_PREFIX +
      "surfaceToView" +
      f.semanticSuffix("TEXCOORD" + f.interpolant_++ + "") +
      ";\n";
  b += f.END_STRUCT;
  return (f.varying_decls_ = b);
};
o3djs.effect.interpolant_ = 0;
o3djs.effect.buildTexCoord = function (b, c, d) {
  var e = o3djs.effect;
  if (b.getParam(d + "Sampler"))
    if (c)
      return (
        "  " +
        e.VARYING +
        e.FLOAT2 +
        " " +
        e.VARYING_DECLARATION_PREFIX +
        d +
        "UV" +
        e.semanticSuffix("TEXCOORD" + e.interpolant_++ + "") +
        ";\n"
      );
    else {
      b = d + "UV";
      c = "TEXCOORD" + e.interpolant_++;
      d = e.getAttributeName_(b, c);
      if (e.semanticNameMap) e.nameToSemanticMap_[b] = c;
      return (
        "  " + e.ATTRIBUTE + e.FLOAT2 + " " + d + e.semanticSuffix(c) + ";\n"
      );
    }
  else return "";
};
o3djs.effect.buildTexCoords = function (b, c) {
  var d = o3djs.effect;
  d.interpolant_ = 0;
  if (!c) d.nameToSemanticMap_ = {};
  return (
    d.buildTexCoord(b, c, "emissive") +
    d.buildTexCoord(b, c, "ambient") +
    d.buildTexCoord(b, c, "diffuse") +
    d.buildTexCoord(b, c, "specular")
  );
};
o3djs.effect.buildUVPassthrough = function (b, c) {
  var d = o3djs.effect;
  if (b.getParam(c + "Sampler")) {
    c = b = c + "UV";
    var e = d.nameToSemanticMap_[b];
    if (e) b = d.getAttributeName_(b, e);
    return (
      "  " +
      d.VERTEX_VARYING_PREFIX +
      c +
      " = " +
      d.ATTRIBUTE_PREFIX +
      b +
      ";\n"
    );
  } else return "";
};
o3djs.effect.buildUVPassthroughs = function (b) {
  var c = o3djs.effect;
  return (
    c.buildUVPassthrough(b, "emissive") +
    c.buildUVPassthrough(b, "ambient") +
    c.buildUVPassthrough(b, "diffuse") +
    c.buildUVPassthrough(b, "specular") +
    c.buildUVPassthrough(b, "bump")
  );
};
o3djs.effect.buildBumpInputCoords = function (b) {
  var c = o3djs.effect;
  return b
    ? "  " +
        c.FLOAT3 +
        " tangent" +
        c.semanticSuffix("TANGENT") +
        ";\n  " +
        c.FLOAT3 +
        " binormal" +
        c.semanticSuffix("BINORMAL") +
        ";\n  " +
        c.FLOAT2 +
        " bumpUV" +
        c.semanticSuffix("TEXCOORD" + c.interpolant_++) +
        ";\n"
    : "";
};
o3djs.effect.buildBumpOutputCoords = function (b) {
  var c = o3djs.effect;
  return b
    ? "  " +
        c.FLOAT3 +
        " tangent" +
        c.semanticSuffix("TEXCOORD" + c.interpolant_++) +
        ";\n  " +
        c.FLOAT3 +
        " binormal" +
        c.semanticSuffix("TEXCOORD" + c.interpolant_++) +
        ";\n  " +
        c.FLOAT2 +
        " bumpUV" +
        c.semanticSuffix("TEXCOORD" + c.interpolant_++) +
        ";\n"
    : "";
};
o3djs.effect.buildCheckerShaderString = function () {
  var b = o3djs.effect,
    c =
      b.BEGIN_OUT_STRUCT +
      b.VARYING +
      b.FLOAT4 +
      " " +
      b.VERTEX_VARYING_PREFIX +
      "position" +
      b.semanticSuffix("POSITION") +
      ";\n" +
      b.VARYING +
      b.FLOAT2 +
      " " +
      b.VERTEX_VARYING_PREFIX +
      "texCoord" +
      b.semanticSuffix("TEXCOORD0") +
      ";\n" +
      b.VARYING +
      b.FLOAT3 +
      " " +
      b.VERTEX_VARYING_PREFIX +
      "normal" +
      b.semanticSuffix("TEXCOORD1") +
      ";\n" +
      b.VARYING +
      b.FLOAT3 +
      " " +
      b.VERTEX_VARYING_PREFIX +
      "worldPosition" +
      b.semanticSuffix("TEXCOORD2") +
      ";\n" +
      b.END_STRUCT;
  return (
    "uniform " +
    b.MATRIX4 +
    " worldViewProjection" +
    b.semanticSuffix("WORLDVIEWPROJECTION") +
    ";\nuniform " +
    b.MATRIX4 +
    " worldInverseTranspose" +
    b.semanticSuffix("WORLDINVERSETRANSPOSE") +
    ";\nuniform " +
    b.MATRIX4 +
    " world" +
    b.semanticSuffix("WORLD") +
    ";\n\n" +
    b.BEGIN_IN_STRUCT +
    b.ATTRIBUTE +
    b.FLOAT4 +
    " position" +
    b.semanticSuffix("POSITION") +
    ";\n" +
    b.ATTRIBUTE +
    b.FLOAT3 +
    " normal" +
    b.semanticSuffix("NORMAL") +
    ";\n" +
    b.ATTRIBUTE +
    b.FLOAT2 +
    " texCoord0" +
    b.semanticSuffix("TEXCOORD0") +
    ";\n" +
    b.END_STRUCT +
    "\n" +
    c +
    "\n" +
    b.beginVertexShaderMain() +
    "  " +
    b.VERTEX_VARYING_PREFIX +
    "position = " +
    b.mul(b.ATTRIBUTE_PREFIX + "position", "worldViewProjection") +
    ";\n  " +
    b.VERTEX_VARYING_PREFIX +
    "normal = " +
    b.mul(
      b.FLOAT4 + "(" + b.ATTRIBUTE_PREFIX + "normal, 0.0)",
      "worldInverseTranspose"
    ) +
    ".xyz;\n  " +
    b.VERTEX_VARYING_PREFIX +
    "worldPosition = " +
    b.mul(b.ATTRIBUTE_PREFIX + "position", "world") +
    ".xyz;\n  " +
    b.VERTEX_VARYING_PREFIX +
    "texCoord = " +
    b.ATTRIBUTE_PREFIX +
    "texCoord0;\n" +
    b.endVertexShaderMain() +
    "\n" +
    b.pixelShaderHeader() +
    "uniform " +
    b.FLOAT4 +
    " color1;\nuniform " +
    b.FLOAT4 +
    " color2;\nuniform float checkSize;\nuniform " +
    b.FLOAT3 +
    " lightWorldPos;\nuniform " +
    b.FLOAT3 +
    " lightColor;\n\n" +
    b.repeatVaryingDecls(c) +
    b.FLOAT4 +
    " checker(" +
    b.FLOAT2 +
    " uv) {\n  float fmodResult = " +
    b.MOD +
    "(    floor(checkSize * uv.x) + \n    floor(checkSize * uv.y), 2.0);\n  return (fmodResult < 1.0) ? color1 : color2;\n}\n\n" +
    b.beginPixelShaderMain() +
    "  " +
    b.FLOAT3 +
    " surfaceToLight = \n      normalize(lightWorldPos - " +
    b.PIXEL_VARYING_PREFIX +
    "worldPosition);\n  " +
    b.FLOAT3 +
    " worldNormal = normalize(" +
    b.PIXEL_VARYING_PREFIX +
    "normal);\n  " +
    b.FLOAT4 +
    " check = checker(" +
    b.PIXEL_VARYING_PREFIX +
    "texCoord);\n  float directionalIntensity = \n      clamp(dot(worldNormal, surfaceToLight), 0.0, 1.0);\n  " +
    b.FLOAT4 +
    " outColor = directionalIntensity * check;\n" +
    b.endPixelShaderMain(b.FLOAT4 + "(outColor.rgb, check.a)") +
    "\n" +
    b.entryPoints() +
    b.matrixLoadOrder()
  );
};
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
  var c = o3djs.effect,
    d = c.getColladaLightingType(b);
  if (!c.isColladaLightingType(d)) throw "not a collada standard material";
  c = c.COLLADA_SAMPLER_PARAMETER_PREFIXES;
  for (var e = (d = 0); e < c.length; ++e) {
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
  var d = o3djs.effect,
    e = b.getObjects(c, "o3d.Effect")[0];
  if (!e) {
    e = b.createObject("Effect");
    d.loadEffect(e, c);
    e.name = c;
  }
  return e;
};
o3djs.effect.buildStandardShaderString = function (b, c) {
  var d = o3djs.effect,
    e = b.getParam("bumpSampler"),
    f = function (q) {
      q = q.value;
      if (!q) return "2D";
      switch (q.className) {
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
    g = function (q) {
      q = q.value;
      if (!q) return "2D";
      return (q = q.getParam("Texture")) ? f(q) : "2D";
    },
    h = function () {
      return (
        "uniform " +
        d.MATRIX4 +
        " worldViewProjection" +
        d.semanticSuffix("WORLDVIEWPROJECTION") +
        ";\nuniform " +
        d.FLOAT3 +
        " lightWorldPos;\n"
      );
    },
    i = function () {
      return "uniform " + d.FLOAT4 + " lightColor;\n";
    },
    k = function () {
      return (
        "uniform " +
        d.MATRIX4 +
        " world" +
        d.semanticSuffix("WORLD") +
        ";\nuniform " +
        d.MATRIX4 +
        " viewInverse" +
        d.semanticSuffix("VIEWINVERSE") +
        ";\nuniform " +
        d.MATRIX4 +
        " worldInverseTranspose" +
        d.semanticSuffix("WORLDINVERSETRANSPOSE") +
        ";\n"
      );
    },
    j = function (q, v, B, C) {
      if (C === undefined) C = true;
      if ((q = q.getParam(B + "Sampler"))) {
        C = g(q);
        v.push(B + C + "Texture");
        return "uniform sampler" + C + " " + B + "Sampler;\n";
      } else if (C) {
        v.push(B + "Color");
        return "uniform " + d.FLOAT4 + " " + B + ";\n";
      } else return "";
    },
    l = function (q, v) {
      if ((q = q.getParam(v + "Sampler"))) {
        q = g(q);
        return (
          "  " +
          d.FLOAT4 +
          " " +
          v +
          " = " +
          d.TEXTURE +
          q +
          "(" +
          v +
          "Sampler, " +
          d.PIXEL_VARYING_PREFIX +
          v +
          "UV);\n"
        );
      } else return "";
    },
    n = function (q, v) {
      v.push("constant");
      return (
        h() +
        x(q, false, false) +
        d.beginVertexShaderMain() +
        s() +
        d.buildUVPassthroughs(q) +
        d.endVertexShaderMain() +
        d.pixelShaderHeader(q, false, false, e) +
        i() +
        d.repeatVaryingDecls() +
        j(q, v, "emissive") +
        d.beginPixelShaderMain() +
        l(q, "emissive") +
        d.endPixelShaderMain("emissive") +
        d.entryPoints() +
        d.matrixLoadOrder()
      );
    },
    m = function (q, v) {
      v.push("lambert");
      return (
        h() +
        k() +
        x(q, true, false) +
        d.beginVertexShaderMain() +
        d.buildUVPassthroughs(q) +
        s() +
        p() +
        t() +
        y() +
        d.endVertexShaderMain() +
        d.pixelShaderHeader(q, true, false) +
        i() +
        d.repeatVaryingDecls() +
        j(q, v, "emissive") +
        j(q, v, "ambient") +
        j(q, v, "diffuse") +
        j(q, v, "bump", false) +
        d.utilityFunctions() +
        d.beginPixelShaderMain() +
        l(q, "emissive") +
        l(q, "ambient") +
        l(q, "diffuse") +
        w() +
        "  " +
        d.FLOAT3 +
        " surfaceToLight = normalize(" +
        d.PIXEL_VARYING_PREFIX +
        "surfaceToLight);\n  " +
        d.FLOAT4 +
        " litR = lit(dot(normal, surfaceToLight), 0.0, 0.0);\n" +
        d.endPixelShaderMain(
          d.FLOAT4 +
            "((emissive +\n      lightColor * (ambient * diffuse + diffuse * litR.y)).rgb,\n          diffuse.a)"
        ) +
        d.entryPoints() +
        d.matrixLoadOrder()
      );
    },
    o = function (q, v) {
      v.push("phong");
      return (
        h() +
        k() +
        x(q, true, true) +
        d.beginVertexShaderMain() +
        d.buildUVPassthroughs(q) +
        s() +
        p() +
        t() +
        u() +
        y() +
        d.endVertexShaderMain() +
        d.pixelShaderHeader(q, true, true) +
        i() +
        d.repeatVaryingDecls() +
        j(q, v, "emissive") +
        j(q, v, "ambient") +
        j(q, v, "diffuse") +
        j(q, v, "specular") +
        j(q, v, "bump", false) +
        "uniform float shininess;\nuniform float specularFactor;\n" +
        d.utilityFunctions() +
        d.beginPixelShaderMain() +
        l(q, "emissive") +
        l(q, "ambient") +
        l(q, "diffuse") +
        l(q, "specular") +
        w() +
        "  " +
        d.FLOAT3 +
        " surfaceToLight = normalize(" +
        d.PIXEL_VARYING_PREFIX +
        "surfaceToLight);\n  " +
        d.FLOAT3 +
        " surfaceToView = normalize(" +
        d.PIXEL_VARYING_PREFIX +
        "surfaceToView);\n  " +
        d.FLOAT3 +
        " halfVector = normalize(surfaceToLight + " +
        d.PIXEL_VARYING_PREFIX +
        "surfaceToView);\n  " +
        d.FLOAT4 +
        " litR = lit(dot(normal, surfaceToLight), \n                    dot(normal, halfVector), shininess);\n" +
        d.endPixelShaderMain(
          d.FLOAT4 +
            "((emissive +\n  lightColor * (ambient * diffuse + diffuse * litR.y +\n                        + specular * litR.z * specularFactor)).rgb,\n      diffuse.a)"
        ) +
        d.entryPoints() +
        d.matrixLoadOrder()
      );
    },
    r = function (q, v) {
      v.push("phong");
      return (
        h() +
        k() +
        x(q, true, true) +
        d.beginVertexShaderMain() +
        d.buildUVPassthroughs(q) +
        s() +
        p() +
        t() +
        u() +
        y() +
        d.endVertexShaderMain() +
        d.pixelShaderHeader(q, true, true) +
        i() +
        d.repeatVaryingDecls() +
        j(q, v, "emissive") +
        j(q, v, "ambient") +
        j(q, v, "diffuse") +
        j(q, v, "specular") +
        j(q, v, "bump", false) +
        "uniform float shininess;\nuniform float specularFactor;\n" +
        d.utilityFunctions() +
        d.beginPixelShaderMain() +
        l(q, "emissive") +
        l(q, "ambient") +
        l(q, "diffuse") +
        l(q, "specular") +
        w() +
        "  " +
        d.FLOAT3 +
        " surfaceToLight = normalize(" +
        d.PIXEL_VARYING_PREFIX +
        "surfaceToLight);\n  " +
        d.FLOAT3 +
        " surfaceToView = normalize(" +
        d.PIXEL_VARYING_PREFIX +
        "surfaceToView);\n  " +
        d.FLOAT3 +
        " halfVector = normalize(surfaceToLight + surfaceToView);\n  " +
        d.FLOAT4 +
        " litR = lit(dot(normal, surfaceToLight), \n                    dot(normal, halfVector), shininess);\n" +
        d.endPixelShaderMain(
          d.FLOAT4 +
            "((emissive +\n  lightColor * (ambient * diffuse + diffuse * litR.y +\n                        + specular * litR.z * specularFactor)).rgb,\n      diffuse.a)"
        ) +
        d.entryPoints() +
        d.matrixLoadOrder()
      );
    },
    s = function () {
      return (
        "  " +
        d.VERTEX_VARYING_PREFIX +
        "position = " +
        d.mul(d.ATTRIBUTE_PREFIX + "position", "worldViewProjection") +
        ";\n"
      );
    },
    p = function () {
      return (
        "  " +
        d.VERTEX_VARYING_PREFIX +
        "normal = " +
        d.mul(
          d.FLOAT4 + "(" + d.ATTRIBUTE_PREFIX + "normal, 0)",
          "worldInverseTranspose"
        ) +
        ".xyz;\n"
      );
    },
    t = function () {
      return (
        "  " +
        d.VERTEX_VARYING_PREFIX +
        "surfaceToLight = lightWorldPos - \n                          " +
        d.mul(d.ATTRIBUTE_PREFIX + "position", "world") +
        ".xyz;\n"
      );
    },
    u = function () {
      return (
        "  " +
        d.VERTEX_VARYING_PREFIX +
        "surfaceToView = (viewInverse[3] - " +
        d.mul(d.ATTRIBUTE_PREFIX + "position", "world") +
        ").xyz;\n"
      );
    },
    y = function () {
      return e
        ? "  " +
            d.VERTEX_VARYING_PREFIX +
            "binormal = " +
            d.mul(
              d.FLOAT4 + "(" + d.ATTRIBUTE_PREFIX + "binormal, 0)",
              "worldInverseTranspose"
            ) +
            ".xyz;\n  " +
            d.VERTEX_VARYING_PREFIX +
            "tangent = " +
            d.mul(
              d.FLOAT4 + "(" + d.ATTRIBUTE_PREFIX + "tangent, 0)",
              "worldInverseTranspose"
            ) +
            ".xyz;\n"
        : "";
    },
    w = function () {
      return e
        ? d.MATRIX3 +
            " tangentToWorld = " +
            d.MATRIX3 +
            "(" +
            d.ATTRIBUTE_PREFIX +
            "tangent,\n                                   " +
            d.ATTRIBUTE_PREFIX +
            "binormal,\n                                   " +
            d.ATTRIBUTE_PREFIX +
            "normal);\n" +
            d.FLOAT3 +
            " tangentNormal = tex2D(bumpSampler, " +
            d.ATTRIBUTE_PREFIX +
            "bumpUV.xy).xyz -\n                       " +
            d.FLOAT3 +
            "(0.5, 0.5, 0.5);\n" +
            d.FLOAT3 +
            " normal = " +
            d.mul("tangentNormal", "tangentToWorld") +
            ";\nnormal = normalize(" +
            d.PIXEL_VARYING_PREFIX +
            "normal);\n"
        : "  " +
            d.FLOAT3 +
            " normal = normalize(" +
            d.PIXEL_VARYING_PREFIX +
            "normal);\n";
    },
    x = function (q, v, B) {
      return (
        d.buildAttributeDecls(q, v, B, e) + d.buildVaryingDecls(q, v, B, e)
      );
    },
    A = [];
  if (c == "phong") b = r(b, A);
  else if (c == "lambert") b = m(b, A);
  else if (c == "blinn") b = o(b, A);
  else if (c == "constant") b = n(b, A);
  else throw 'unknown effect type "' + c + '"';
  return { description: A.join("_"), shader: b };
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
o3djs.effect.setLanguage("o3d");
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
    k = o3djs.event.getKeyIdentifier(c, d);
  if (document.createEvent) {
    i = document.createEvent("KeyboardEvent");
    if (i.initKeyboardEvent) {
      i.initKeyboardEvent(b, true, true, window, k, 0, e, f, g, h);
      i.charCode = c;
      i.keyCode = b == "keypress" ? c : d;
    } else if (i.initKeyEvent) {
      i.initKeyEvent(b, true, true, window, e, f, g, h, d, c);
      i.keyIdentifier = k;
    }
  } else if (document.createEventObject) {
    i = document.createEventObject();
    i.ctrlKey = e;
    i.altKey = f;
    i.shiftKey = g;
    i.metaKey = h;
    i.keyCode = c;
    i.keyIdentifier = k;
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
o3djs.fps.ColorRect = function (b, c, d, e, f, g, h, i, k) {
  this.transform_ = b.createObject("Transform");
  this.colorParam_ = this.transform_.createParam("color", "ParamFloat4");
  this.transform_.addShape(c);
  this.transform_.parent = d;
  this.y_ = this.x_ = this.height_ = this.width_ = 0;
  this.z_ = g;
  this.setPosition(e, f);
  this.setSize(h, i);
  this.setColor(k);
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
o3djs.provide("o3djs.gpu2d");
o3djs.gpu2d = o3djs.gpu2d || {};
o3djs.gpu2d.createPath = function (b, c) {
  return new o3djs.gpu2d.Path(b, c);
};
o3djs.gpu2d.Path = function (b, c) {
  this.pack_ = b;
  this.drawList_ = c;
  this.path_ = b.createObject("ProcessedPath");
  var d = b.createObject("State");
  d.getStateParam("o3d.AlphaBlendEnable").value = true;
  d.getStateParam("o3d.SourceBlendFunction").value =
    o3djs.base.o3d.State.BLENDFUNC_SOURCE_ALPHA;
  d.getStateParam("o3d.DestinationBlendFunction").value =
    o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_ALPHA;
  d.getStateParam("o3d.CullMode").value = o3djs.base.o3d.State.CULL_NONE;
  var e = b.createObject("State");
  e.getStateParam("o3d.CullMode").value = o3djs.base.o3d.State.CULL_NONE;
  this.exteriorMaterial_ = b.createObject("Material");
  this.exteriorMaterial_.name = "ExteriorMaterial";
  this.exteriorMaterial_.state = d;
  this.exteriorMaterial_.drawList = c;
  this.interiorMaterial_ = b.createObject("Material");
  this.interiorMaterial_.name = "InteriorMaterial";
  this.interiorMaterial_.state = e;
  this.interiorMaterial_.drawList = c;
  this.shape = b.createObject("Shape");
  c = b.createObject("Primitive");
  d = b.createObject("StreamBank");
  var f = b.createObject("VertexBuffer");
  this.exteriorVertices_ = e = f.createField("FloatField", 2);
  this.exteriorTexCoords_ = f = f.createField("FloatField", 3);
  d.setVertexStream(o3djs.base.o3d.Stream.POSITION, 0, e, 0);
  d.setVertexStream(o3djs.base.o3d.Stream.TEXCOORD, 0, f, 0);
  c.streamBank = d;
  c.primitiveType = o3djs.base.o3d.Primitive.TRIANGLELIST;
  c.material = this.exteriorMaterial_;
  c.owner = this.shape;
  this.exteriorTriangles_ = c;
  c = b.createObject("Primitive");
  d = b.createObject("StreamBank");
  f = b.createObject("VertexBuffer");
  this.interiorVertices_ = e = f.createField("FloatField", 2);
  d.setVertexStream(o3djs.base.o3d.Stream.POSITION, 0, e, 0);
  c.streamBank = d;
  c.primitiveType = o3djs.base.o3d.Primitive.TRIANGLELIST;
  c.material = this.interiorMaterial_;
  c.owner = this.shape;
  this.interiorTriangles_ = c;
  this.setFill(o3djs.gpu2d.createColor(b, 0, 0, 0, 1));
  this.shape.createDrawElements(b, null);
};
a = o3djs.gpu2d.Path.prototype;
a.clear = function () {
  this.path_.clear();
};
a.moveTo = function (b, c) {
  this.path_.moveTo(b, c);
};
a.lineTo = function (b, c) {
  this.path_.lineTo(b, c);
};
a.quadraticTo = function (b, c, d, e) {
  this.path_.quadraticTo(b, c, d, e);
};
a.cubicTo = function (b, c, d, e, f, g) {
  this.path_.cubicTo(b, c, d, e, f, g);
};
a.close = function () {
  this.path_.close();
};
a.update = function () {
  this.path_.createMesh(
    this.exteriorVertices_,
    this.exteriorTexCoords_,
    this.interiorVertices_
  );
  var b = this.exteriorVertices_.buffer.numElements;
  if (b == 1) {
    this.exteriorTriangles_.numberVertices = 0;
    this.exteriorTriangles_.numberPrimitives = 0;
  } else {
    this.exteriorTriangles_.numberVertices = b;
    this.exteriorTriangles_.numberPrimitives = b / 3;
  }
  b = this.interiorVertices_.buffer.numElements;
  if (b == 1) {
    this.interiorTriangles_.numberVertices = 0;
    this.interiorTriangles_.numberPrimitives = 0;
  } else {
    this.interiorTriangles_.numberVertices = b;
    this.interiorTriangles_.numberPrimitives = b / 3;
  }
};
a.setPolygonOffset = function (b, c) {
  this.exteriorMaterial_.state.getStateParam("o3d.PolygonOffset1").value = b;
  this.exteriorMaterial_.state.getStateParam("o3d.PolygonOffset2").value = c;
  this.interiorMaterial_.state.getStateParam("o3d.PolygonOffset1").value = b;
  this.interiorMaterial_.state.getStateParam("o3d.PolygonOffset2").value = c;
};
a.setFill = function (b) {
  this.fill_ && this.fill_.detach_(this);
  this.interiorMaterial_.effect = b.interiorEffect;
  this.exteriorMaterial_.effect = b.exteriorEffect;
  this.fill_ = b;
  b.attach_(this);
};
o3djs.gpu2d.Fill = function (b) {
  this.pack_ = b;
  this.attachedPaths_ = [];
};
o3djs.gpu2d.Fill.prototype.attach_ = function (b) {
  this.attachedPaths_.indexOf(b) < 0 && this.attachedPaths_.push(b);
  this.apply_(b);
};
o3djs.gpu2d.Fill.prototype.detach_ = function (b) {
  b = this.attachedPaths_.indexOf(b);
  b >= 0 && this.attachedPaths_.splice(b, b);
};
o3djs.gpu2d.Fill.prototype.applyToPaths_ = function () {
  for (var b = 0; b < this.attachedPaths_.length; b++)
    this.apply_(this.attachedPaths_[b]);
};
o3djs.gpu2d.Fill.prototype.apply_ = function () {};
o3djs.gpu2d.Color = function (b) {
  o3djs.gpu2d.Fill.call(this, b);
  this.interiorEffect = o3djs.gpu2d.loadEffect_(
    b,
    o3djs.gpu2d.FillTypes_.COLOR,
    true
  );
  this.exteriorEffect = o3djs.gpu2d.loadEffect_(
    b,
    o3djs.gpu2d.FillTypes_.COLOR,
    false
  );
  this.b_ = this.g_ = this.r_ = 0;
  this.a_ = 1;
};
o3djs.base.inherit(o3djs.gpu2d.Color, o3djs.gpu2d.Fill);
o3djs.gpu2d.Color.prototype.set = function (b, c, d, e) {
  this.r_ = b;
  this.g_ = c;
  this.b_ = d;
  this.a_ = e;
  this.applyToPaths_();
};
o3djs.gpu2d.Color.prototype.get = function () {
  return [this.r_, this.g_, this.b_, this.a_];
};
o3djs.gpu2d.Color.prototype.apply_ = function (b) {
  this.applyToMaterial_(b.interiorMaterial_);
  this.applyToMaterial_(b.exteriorMaterial_);
};
o3djs.gpu2d.Color.prototype.applyToMaterial_ = function (b) {
  var c = "color",
    d = "ParamFloat4",
    e = b.getParam(c);
  e || (e = b.createParam(c, d));
  e.set(this.r_, this.g_, this.b_, this.a_);
};
o3djs.gpu2d.createColor = function (b, c, d, e, f) {
  b = new o3djs.gpu2d.Color(b);
  b.set(c, d, e, f);
  return b;
};
o3djs.gpu2d.generateLoopBlinnShaderSource_ = function (b, c, d) {
  c =
    "uniform float4x4 worldViewProjection : WORLDVIEWPROJECTION;\n" +
    c +
    "\nstruct VertexShaderInput {\n  float2 position : POSITION;\n  float3 klm : TEXCOORD0;\n};\n\nstruct PixelShaderInput {\n  float4 position : POSITION;\n  float3 klm : TEXCOORD0;\n};\n\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n\n  output.position = mul(float4(input.position, 0, 1),\n                        worldViewProjection);\n  output.klm = input.klm;\n  return output;\n}\n\nfloat4 pixelShaderFunction(PixelShaderInput input) : COLOR {\n  float3 klm = input.klm;\n";
  b = b
    ? "  // Gradients\n  float3 px = ddx(input.klm);\n  float3 py = ddy(input.klm);\n\n  // Chain rule\n  float k2 = klm.x * klm.x;\n  float c = k2 * klm.x - klm.y * klm.z;\n  float k23 = 3.0 * k2;\n  float cx = k23 * px.x - klm.z * px.y - klm.y * px.z;\n  float cy = k23 * py.x - klm.z * py.y - klm.y * py.z;\n\n  // Signed distance\n  float sd = c / sqrt(cx * cx + cy * cy);\n\n  // Linear alpha\n  float alpha = clamp(0.5 - sd, 0.0, 1.0);\n"
    : "  float t = klm.x * klm.x * klm.x - klm.y * klm.z;\n  float alpha = clamp(sign(t), 0.0, 1.0);\n";
  return (
    c +
    b +
    "\n" +
    d +
    "}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n"
  );
};
o3djs.gpu2d.generateSolidShaderSource_ = function (b, c) {
  return (b =
    "uniform float4x4 worldViewProjection : WORLDVIEWPROJECTION;\n" +
    b +
    "\nstruct VertexShaderInput {\n  float2 position : POSITION;\n};\n\nstruct PixelShaderInput {\n  float4 position : POSITION;\n};\n\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n\n  output.position = mul(float4(input.position, 0, 1),\n                        worldViewProjection);\n  return output;\n}\n\nfloat4 pixelShaderFunction(PixelShaderInput input) : COLOR {\n  float alpha = 1.0;\n" +
    c +
    "}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n");
};
o3djs.gpu2d.FillTypes_ = { COLOR: 0 };
o3djs.gpu2d.FILL_CODE_ = [
  {
    uniforms: "uniform float4 color;\n",
    source: "return float4(color.r, color.g, color.b, color.a * alpha);\n",
  },
];
o3djs.gpu2d.interiorEffectCache_ = [];
o3djs.gpu2d.exteriorEffectCache_ = [];
o3djs.gpu2d.loadEffect_ = function (b, c, d) {
  var e;
  e = d ? o3djs.gpu2d.interiorEffectCache_ : o3djs.gpu2d.exteriorEffectCache_;
  e = o3djs.gpu2d.getEffectList_(b, e);
  var f = e[c];
  if (!f) {
    f = b.createObject("Effect");
    b = false;
    b = o3djs.gpu2d.FILL_CODE_[c];
    (b = d
      ? f.loadFromFXString(
          o3djs.gpu2d.generateSolidShaderSource_(b.uniforms, b.source)
        )
      : f.loadFromFXString(
          o3djs.gpu2d.generateLoopBlinnShaderSource_(
            false,
            b.uniforms,
            b.source
          )
        )) || alert("Error loading shader: interior = " + d);
    e[c] = f;
  }
  return f;
};
o3djs.gpu2d.getEffectList_ = function (b, c) {
  var d = c[b.clientId];
  if (!d) {
    d = [];
    c[b.clientId] = d;
  }
  return d;
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
  function g(h, i, k) {
    var j = null;
    if (!k) {
      j = o3djs.texture.createTextureFromRawData(b, i, e, f);
      b.removeObject(h);
    }
    d(j, k);
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
    function (i, k, j) {
      f && f(i, k, j);
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
o3djs.material.attachStandardEffectEx = function (b, c, d) {
  if (!c.effect)
    if (!o3djs.effect.attachStandardShader(b, c, [0, 0, 0], d))
      throw "Could not attach a standard effect";
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
o3djs.material.createConstantMaterialEx = function (b, c, d) {
  var e = b.createObject("Material");
  e.drawList = c;
  if (d.length) e.createParam("emissive", "ParamFloat4").value = d;
  else {
    c = e.createParam("emissiveSampler", "ParamSampler");
    var f = b.createObject("Sampler");
    c.value = f;
    f.texture = d;
  }
  o3djs.material.attachStandardEffectEx(b, e, "constant");
  return e;
};
o3djs.material.createConstantMaterial = function (b, c, d, e) {
  return o3djs.material.createConstantMaterialEx(
    b,
    e ? c.zOrderedDrawList : c.performanceDrawList,
    d
  );
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
o3djs.provide("o3djs.manipulators");
o3djs.manipulators = o3djs.manipulators || {};
o3djs.manipulators.createManager = function (b, c, d, e, f) {
  return new o3djs.manipulators.Manager(b, c, d, e, f);
};
o3djs.manipulators.Line_ = function (b, c) {
  this.direction_ = o3djs.math.copyVector(b || [1, 0, 0]);
  this.point_ = o3djs.math.copyVector(c || [0, 0, 0]);
  this.recalc_();
};
o3djs.manipulators.Line_.prototype.setDirection = function (b) {
  this.direction_ = o3djs.math.copyVector(b);
  this.recalc_();
};
o3djs.manipulators.Line_.prototype.getDirection = function () {
  return this.direction_;
};
o3djs.manipulators.Line_.prototype.setPoint = function (b) {
  this.point_ = o3djs.math.copyVector(b);
  this.recalc_();
};
o3djs.manipulators.Line_.prototype.getPoint = function () {
  return this.point_;
};
o3djs.manipulators.EPSILON = 1.0e-5;
o3djs.manipulators.X_AXIS = [1, 0, 0];
o3djs.manipulators.Z_AXIS = [0, 0, 1];
o3djs.manipulators.Line_.prototype.closestPointToRay = function (b, c) {
  c = o3djs.math.subVector(c, b);
  var d = o3djs.math.dot(this.direction_, c);
  d = [
    [-o3djs.math.lengthSquared(this.direction_), d],
    [d, -o3djs.math.lengthSquared(c)],
  ];
  var e = o3djs.math.det2(d);
  if (Math.abs(e) < o3djs.manipulators.EPSILON) return null;
  d = o3djs.math.inverse2(d);
  c = [
    o3djs.math.dot(this.point_, this.direction_) -
      o3djs.math.dot(b, this.direction_),
    o3djs.math.dot(b, c) - o3djs.math.dot(this.point_, c),
  ];
  c = o3djs.math.mulMatrixVector(d, c);
  return c[1] < 0
    ? b
    : o3djs.math.addVector(
        this.point_,
        o3djs.math.mulScalarVector(c[0], this.direction_)
      );
};
o3djs.manipulators.Line_.prototype.recalc_ = function () {
  var b = o3djs.math.lengthSquared(this.direction_);
  if (b == 0)
    throw "Line_.recalc_: ERROR: direction was the zero vector (not allowed)";
  this.alongVec_ = o3djs.math.subVector(
    this.point_,
    o3djs.math.mulScalarVector(
      o3djs.math.dot(this.point_, this.direction_),
      this.direction_
    )
  );
};
o3djs.manipulators.DEFAULT_COLOR = [0.8, 0.8, 0.8, 1];
o3djs.manipulators.HIGHLIGHTED_COLOR = [0.9, 0.9, 0, 1];
o3djs.manipulators.Plane_ = function (b, c) {
  this.point_ = o3djs.math.copyVector(c || [0, 0, 0]);
  this.setNormal(b || [0, 1, 0]);
};
a = o3djs.manipulators.Plane_.prototype;
a.setNormal = function (b) {
  var c = o3djs.math.lengthSquared(b);
  if (c == 0)
    throw "Plane_.setNormal: ERROR: normal was the zero vector (not allowed)";
  this.normal_ = o3djs.math.normalize(b);
  this.recalc_();
};
a.setPoint = function (b) {
  this.point_ = o3djs.math.copyVector(b);
  this.recalc_();
};
a.getPoint = function () {
  return this.point_;
};
a.intersectRay = function (b, c) {
  var d = this.normalDotPoint_ - o3djs.math.dot(this.normal_, b),
    e = o3djs.math.dot(this.normal_, c);
  if (e == 0) return null;
  d = d / e;
  return o3djs.math.addVector(b, o3djs.math.mulScalarVector(d, c));
};
a.recalc_ = function () {
  this.normalDotPoint_ = o3djs.math.dot(this.normal_, this.point_);
};
o3djs.manipulators.Manager = function (b, c, d, e, f) {
  this.pack = b;
  this.viewInfo = o3djs.rendergraph.createView(
    b,
    c,
    d,
    undefined,
    e,
    undefined,
    undefined,
    undefined,
    f
  );
  this.viewInfo.clearBuffer.active = false;
  b = this.viewInfo.zOrderedState;
  b.getStateParam("ZComparisonFunction").value =
    o3djs.base.o3d.State.CMP_GREATER;
  b.getStateParam("ZWriteEnable").value = false;
  b = this.viewInfo.performanceDrawPassInfo.root.priority;
  this.viewInfo.performanceDrawPassInfo.root.priority =
    this.viewInfo.zOrderedDrawPassInfo.root.priority;
  this.viewInfo.zOrderedDrawPassInfo.root.priority = b;
  this.unobscuredDrawList_ = this.viewInfo.performanceDrawList;
  this.obscuredDrawList_ = this.viewInfo.zOrderedDrawList;
  this.parentTransform = c;
  this.manipsByClientId = [];
  this.pickManager = o3djs.picking.createPickManager(this.parentTransform);
  this.draggedManip_ = this.highlightedManip = null;
};
a = o3djs.manipulators.Manager.prototype;
a.getUnobscuredConstantMaterial = function () {
  if (!this.unobscuredConstantMaterial_)
    this.unobscuredConstantMaterial_ =
      o3djs.manipulators.createConstantMaterial(
        this.pack,
        this.unobscuredDrawList_,
        [1, 1, 1, 0.8]
      );
  return this.unobscuredConstantMaterial_;
};
a.getObscuredConstantMaterial = function () {
  if (!this.obscuredConstantMaterial_)
    this.obscuredConstantMaterial_ = o3djs.manipulators.createConstantMaterial(
      this.pack,
      this.obscuredDrawList_,
      [1, 1, 1, 0.3]
    );
  return this.obscuredConstantMaterial_;
};
a.getUnobscuredLineRingMaterial = function () {
  if (!this.unobscuredLineRingMaterial_)
    this.unobscuredLineRingMaterial_ =
      o3djs.manipulators.createLineRingMaterial(
        this.pack,
        this.unobscuredDrawList_,
        [1, 1, 1, 1],
        [1, 1, 1, 0.6],
        false
      );
  return this.unobscuredLineRingMaterial_;
};
a.getObscuredLineRingMaterial = function () {
  if (!this.obscuredLineRingMaterial_)
    this.obscuredLineRingMaterial_ = o3djs.manipulators.createLineRingMaterial(
      this.pack,
      this.obscuredDrawList_,
      [1, 1, 1, 0.5],
      [1, 1, 1, 0.3],
      true
    );
  return this.obscuredLineRingMaterial_;
};
a.createTranslate1 = function () {
  var b = new o3djs.manipulators.Translate1(this);
  this.add_(b);
  return b;
};
a.createTranslate2 = function () {
  var b = new o3djs.manipulators.Translate2(this);
  this.add_(b);
  return b;
};
a.createRotate1 = function () {
  var b = new o3djs.manipulators.Rotate1(this);
  this.add_(b);
  return b;
};
a.add_ = function (b) {
  b.getTransform().createDrawElements(this.pack, null);
  this.manipsByClientId[b.getTransform().clientId] = b;
};
a.handleMouse_ = function (b, c, d, e, f, g, h) {
  this.pickManager.update();
  b = o3djs.picking.clientPositionToWorldRayEx(b, c, d, e, f, g);
  b = this.pickManager.pick(b);
  if (b != null) {
    c =
      this.manipsByClientId[b.shapeInfo.parent.transform.clientId] ||
      this.manipsByClientId[b.shapeInfo.parent.parent.transform.clientId];
    h(this, b, c);
  } else h(this, null, null);
};
o3djs.manipulators.mouseDownCallback_ = function (b, c, d) {
  if (d != null) {
    b.draggedManip_ = d;
    d.makeActive(c);
  }
};
o3djs.manipulators.hoverCallback_ = function (b, c, d) {
  if (b.highlightedManip != null && b.highlightedManip != d) {
    b.highlightedManip.clearHighlight();
    b.highlightedManip = null;
  }
  if (d != null) {
    d.highlight(c);
    b.highlightedManip = d;
  }
};
o3djs.manipulators.Manager.prototype.mousedown = function (b, c, d, e, f, g) {
  this.handleMouse_(b, c, d, e, f, g, o3djs.manipulators.mouseDownCallback_);
};
o3djs.manipulators.Manager.prototype.mousemove = function (b, c, d, e, f, g) {
  if (this.draggedManip_ != null) {
    var h = o3djs.picking.clientPositionToWorldRayEx(b, c, d, e, f, g);
    this.draggedManip_.drag(h.near, h.far, b, c, d, e, f, g);
  } else this.handleMouse_(b, c, d, e, f, g, o3djs.manipulators.hoverCallback_);
};
o3djs.manipulators.Manager.prototype.mouseup = function () {
  if (this.draggedManip_ != null) {
    this.draggedManip_.makeInactive();
    this.draggedManip_ = null;
  }
};
o3djs.manipulators.Manager.prototype.updateInactiveManipulators = function () {
  for (var b in this.manipsByClientId) {
    var c = this.manipsByClientId[b];
    c.isActive() || c.updateBaseTransformFromAttachedTransform_();
  }
};
o3djs.manipulators.Manip = function (b) {
  this.manager_ = b;
  var c = b.pack;
  this.localTransform_ = c.createObject("Transform");
  this.offsetTransform_ = c.createObject("Transform");
  this.baseTransform_ = c.createObject("Transform");
  this.invisibleTransform_ = c.createObject("Transform");
  this.invisibleTransform_.visible = false;
  this.invisibleTransform_.parent = this.localTransform_;
  this.localTransform_.parent = this.offsetTransform_;
  this.offsetTransform_.parent = this.baseTransform_;
  this.baseTransform_.parent = b.parentTransform;
  b.pickManager.update();
  b = b.pickManager.getTransformInfo(this.invisibleTransform_);
  b.pickableEvenIfInvisible = true;
  this.attachedTransform_ = null;
  this.active_ = false;
};
a = o3djs.manipulators.Manip.prototype;
a.addShapes_ = function (b, c) {
  if (c == undefined) c = true;
  for (var d = 0; d < b.length; d++)
    c
      ? this.localTransform_.addShape(b[d])
      : this.invisibleTransform_.addShape(b[d]);
};
a.getOffsetTransform = function () {
  return this.offsetTransform_;
};
a.getTransform = function () {
  return this.localTransform_;
};
a.setOffsetTranslation = function (b) {
  this.getOffsetTransform().localMatrix = o3djs.math.matrix4.setTranslation(
    this.getOffsetTransform().localMatrix,
    b
  );
};
a.setOffsetRotation = function (b) {
  b = o3djs.quaternions.quaternionToRotation(b);
  this.getOffsetTransform().localMatrix = o3djs.math.matrix4.setUpper3x3(
    this.getOffsetTransform().localMatrix,
    b
  );
};
a.setTranslation = function (b) {
  this.getTransform().localMatrix = o3djs.math.matrix4.setTranslation(
    this.getTransform().localMatrix,
    b
  );
};
a.setRotation = function (b) {
  b = o3djs.quaternions.quaternionToRotation(b);
  this.getTransform().localMatrix = o3djs.math.matrix4.setUpper3x3(
    this.getTransform().localMatrix,
    b
  );
};
a.attachTo = function (b) {
  this.attachedTransform_ = b;
  this.updateBaseTransformFromAttachedTransform_();
};
a.highlight = function () {};
a.clearHighlight = function () {};
a.makeActive = function () {
  this.active_ = true;
};
a.makeInactive = function () {
  this.active_ = false;
};
a.drag = function () {};
a.isActive = function () {
  return this.active_;
};
a.updateBaseTransformFromAttachedTransform_ = function () {
  if (this.attachedTransform_ != null) {
    var b = this.attachedTransform_.worldMatrix,
      c = this.manager_.parentTransform.worldMatrix;
    c = o3djs.math.matrix4.inverse(c);
    this.baseTransform_.localMatrix = o3djs.math.matrix4.mul(b, c);
    this.localTransform_.localMatrix = o3djs.math.matrix4.identity();
  }
};
a.updateAttachedTransformFromLocalTransform_ = function () {
  if (this.attachedTransform_ != null) {
    var b = this.baseTransform_.worldMatrix,
      c = this.offsetTransform_.localMatrix,
      d = this.localTransform_.localMatrix,
      e = o3djs.math.matrix4.inverse(c);
    d = o3djs.math.matrix4.mul(e, d);
    d = o3djs.math.matrix4.mul(d, c);
    d = o3djs.math.matrix4.mul(d, b);
    b = this.attachedTransform_.worldMatrix;
    c = this.attachedTransform_.localMatrix;
    b = o3djs.math.matrix4.mul(o3djs.math.matrix4.inverse(c), b);
    b = o3djs.math.matrix4.inverse(b);
    d = o3djs.math.matrix4.mul(d, b);
    this.attachedTransform_.localMatrix = d;
  }
};
o3djs.manipulators.createArrowVertices_ = function (b) {
  var c = o3djs.math.matrix4,
    d = o3djs.primitives.createTruncatedConeVertices(
      0.15,
      0,
      0.3,
      4,
      1,
      c.mul(c.translation([0, 0.85, 0]), b)
    );
  d.append(o3djs.primitives.createCylinderVertices(0.06, 1.4, 4, 1, b));
  d.append(
    o3djs.primitives.createTruncatedConeVertices(
      0,
      0.15,
      0.3,
      4,
      1,
      c.mul(c.translation([0, -0.85, 0]), b)
    )
  );
  return d;
};
o3djs.manipulators.Translate1 = function (b) {
  o3djs.manipulators.Manip.call(this, b);
  var c = b.pack,
    d = b.translate1Shape_;
  if (!d) {
    d = o3djs.manipulators.createArrowVertices_(
      o3djs.math.matrix4.rotationZ(Math.PI / 2)
    );
    d = d.createShape(c, b.getUnobscuredConstantMaterial());
    d.createDrawElements(c, b.getObscuredConstantMaterial());
    b.translate1Shape_ = d;
  }
  this.addShapes_([d]);
  this.colorParam_ = this.getTransform().createParam(
    "highlightColor",
    "ParamFloat4"
  );
  this.clearHighlight();
  this.dragLine_ = new o3djs.manipulators.Line_();
};
o3djs.base.inherit(o3djs.manipulators.Translate1, o3djs.manipulators.Manip);
a = o3djs.manipulators.Translate1.prototype;
a.highlight = function () {
  this.colorParam_.value = o3djs.manipulators.HIGHLIGHTED_COLOR;
};
a.clearHighlight = function () {
  this.colorParam_.value = o3djs.manipulators.DEFAULT_COLOR;
};
a.makeActive = function (b) {
  o3djs.manipulators.Manip.prototype.makeActive.call(this, b);
  this.highlight(b);
  var c = this.getTransform().worldMatrix;
  this.dragLine_.setDirection(
    o3djs.math.matrix4.transformDirection(c, o3djs.manipulators.X_AXIS)
  );
  this.dragLine_.setPoint(b.worldIntersectionPosition);
};
a.makeInactive = function () {
  o3djs.manipulators.Manip.prototype.makeInactive.call(this);
  this.clearHighlight();
  this.updateAttachedTransformFromLocalTransform_();
  this.updateBaseTransformFromAttachedTransform_();
};
a.drag = function (b, c) {
  b = this.dragLine_.closestPointToRay(b, c);
  if (b != null) {
    b = o3djs.math.subVector(b, this.dragLine_.getPoint());
    c = o3djs.math.matrix4.inverse(this.getTransform().worldMatrix);
    this.getTransform().localMatrix = o3djs.math.matrix4.setTranslation(
      this.getTransform().localMatrix,
      o3djs.math.matrix4.transformDirection(c, b)
    );
    this.updateAttachedTransformFromLocalTransform_();
  }
};
o3djs.manipulators.Translate2 = function (b) {
  o3djs.manipulators.Manip.call(this, b);
  var c = b.pack,
    d = b.Translate2Shape_;
  if (!d) {
    d = o3djs.manipulators.createArrowVertices_(
      o3djs.math.matrix4.rotationZ(Math.PI / 2)
    );
    d.append(
      o3djs.manipulators.createArrowVertices_(o3djs.math.matrix4.rotationZ(0))
    );
    d = d.createShape(c, b.getUnobscuredConstantMaterial());
    d.createDrawElements(c, b.getObscuredConstantMaterial());
    b.Translate2Shape_ = d;
  }
  this.addShapes_([d]);
  this.colorParam_ = this.getTransform().createParam(
    "highlightColor",
    "ParamFloat4"
  );
  this.clearHighlight();
  this.dragPlane_ = new o3djs.manipulators.Plane_();
};
o3djs.base.inherit(o3djs.manipulators.Translate2, o3djs.manipulators.Manip);
a = o3djs.manipulators.Translate2.prototype;
a.highlight = function () {
  this.colorParam_.value = o3djs.manipulators.HIGHLIGHTED_COLOR;
};
a.clearHighlight = function () {
  this.colorParam_.value = o3djs.manipulators.DEFAULT_COLOR;
};
a.makeActive = function (b) {
  o3djs.manipulators.Manip.prototype.makeActive.call(this, b);
  this.highlight(b);
  var c = this.getTransform().worldMatrix;
  this.dragPlane_.setNormal(
    o3djs.math.matrix4.transformDirection(c, o3djs.manipulators.Z_AXIS)
  );
  this.dragPlane_.setPoint(b.worldIntersectionPosition);
};
a.makeInactive = function () {
  o3djs.manipulators.Manip.prototype.makeInactive.call(this);
  this.clearHighlight();
  this.updateAttachedTransformFromLocalTransform_();
  this.updateBaseTransformFromAttachedTransform_();
};
a.drag = function (b, c) {
  b = this.dragPlane_.intersectRay(b, o3djs.math.subVector(c, b));
  if (b != null) {
    b = o3djs.math.subVector(b, this.dragPlane_.getPoint());
    c = o3djs.math.matrix4.inverse(this.getTransform().worldMatrix);
    this.getTransform().localMatrix = o3djs.math.matrix4.setTranslation(
      this.getTransform().localMatrix,
      o3djs.math.matrix4.transformDirection(c, b)
    );
    this.updateAttachedTransformFromLocalTransform_();
  }
};
o3djs.manipulators.Rotate1 = function (b) {
  o3djs.manipulators.Manip.call(this, b);
  var c = b.pack,
    d = b.Rotate1PickShape_;
  if (!d) {
    var e = o3djs.primitives.createTorusVertices(
      1,
      0.1,
      16,
      6,
      o3djs.math.matrix4.rotationZ(Math.PI / 2)
    );
    d = e.createShape(c, b.getUnobscuredConstantMaterial());
    b.Rotate1PickShape_ = d;
  }
  e = b.Rotate1VisibleShape_;
  if (!e) {
    e = o3djs.lineprimitives.createLineRingVertices(
      1,
      32,
      120,
      o3djs.math.matrix4.rotationZ(Math.PI / 2)
    );
    e = e.createShape(c, b.getUnobscuredLineRingMaterial());
    e.createDrawElements(c, b.getObscuredLineRingMaterial());
    b.Rotate1VisibleShape_ = e;
  }
  this.addShapes_([d], false);
  this.addShapes_([e]);
  this.colorParam_ = this.getTransform().createParam(
    "highlightColor",
    "ParamFloat4"
  );
  this.clearHighlight();
  this.dragLine_ = new o3djs.manipulators.Line_();
};
o3djs.base.inherit(o3djs.manipulators.Rotate1, o3djs.manipulators.Manip);
o3djs.manipulators.Rotate1.prototype.highlight = function () {
  this.colorParam_.value = o3djs.manipulators.HIGHLIGHTED_COLOR;
};
o3djs.manipulators.Rotate1.prototype.clearHighlight = function () {
  this.colorParam_.value = o3djs.manipulators.DEFAULT_COLOR;
};
o3djs.manipulators.Rotate1.prototype.makeActive = function (b) {
  o3djs.manipulators.Manip.prototype.makeActive.call(this, b);
  this.highlight(b);
  var c = this.getTransform().worldMatrix,
    d = o3djs.math.matrix4.inverse(c);
  d = o3djs.math.matrix4.transformPoint(d, b.worldIntersectionPosition);
  d = o3djs.math.cross(d, o3djs.manipulators.X_AXIS);
  this.dragLine_.setDirection(o3djs.math.matrix4.transformDirection(c, d));
  this.dragLine_.setPoint(b.worldIntersectionPosition);
};
o3djs.manipulators.Rotate1.prototype.makeInactive = function () {
  o3djs.manipulators.Manip.prototype.makeInactive.call(this);
  this.clearHighlight();
  this.updateAttachedTransformFromLocalTransform_();
  this.updateBaseTransformFromAttachedTransform_();
};
o3djs.manipulators.frustumPositionToClientPosition_ = function (b, c, d) {
  return [((b[0] + 1) * c) / 2, ((-b[1] + 1) * d) / 2];
};
o3djs.manipulators.Rotate1.prototype.drag = function (b, c, d, e, f, g, h, i) {
  c = o3djs.math.matrix4.mul(f, g);
  b = o3djs.manipulators.frustumPositionToClientPosition_(
    o3djs.math.matrix4.transformPoint(c, this.dragLine_.getPoint()),
    h,
    i
  );
  c = o3djs.manipulators.frustumPositionToClientPosition_(
    o3djs.math.matrix4.transformPoint(
      c,
      o3djs.math.addVector(
        this.dragLine_.getPoint(),
        this.dragLine_.getDirection()
      )
    ),
    h,
    i
  );
  c = o3djs.math.normalize(o3djs.math.subVector(c, b));
  d = [d, e];
  d = o3djs.math.dot(c, d) - o3djs.math.dot(c, b);
  h = (d / Math.max(h, i)) * 2 * Math.PI;
  this.getTransform().localMatrix = o3djs.math.matrix4.rotationX(-h);
  this.updateAttachedTransformFromLocalTransform_();
};
o3djs.manipulators.phongFXString_ =
  "uniform float4x4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform float3 lightWorldPos;\nuniform float4 lightColor;\nuniform float4x4 world : WORLD;\nuniform float4x4 viewInverse : VIEWINVERSE;\nuniform float4x4 worldInverseTranspose : WORLDINVERSETRANSPOSE;\nuniform float4 emissive;\nuniform float4 ambient;\nuniform float4 diffuse;\nuniform float4 highlightColor;\nuniform float4 specular;\nuniform float shininess;\nuniform float specularFactor;\nstruct InVertex {\n  float4 position : POSITION;\n  float3 normal : NORMAL;\n};\nstruct OutVertex {\n  float4 position : POSITION;\n  float3 normal : TEXCOORD0;\n  float3 surfaceToLight: TEXCOORD1;\n  float3 surfaceToView : TEXCOORD2;\n};\nOutVertex vertexShaderFunction(InVertex input) {\n  OutVertex output;\n  output.position = mul(input.position, worldViewProjection);\n  output.normal = mul(float4(input.normal, 0),\n                      worldInverseTranspose).xyz;\n  output.surfaceToLight = lightWorldPos - \n      mul(input.position, world).xyz;\n  output.surfaceToView = (viewInverse[3] - mul(input.position,\n      world)).xyz;\n  return output;\n}\nfloat4 pixelShaderFunction(OutVertex input) : COLOR {\n  float4 newDiffuse = diffuse * highlightColor;\n  float3 normal = normalize(input.normal);\n  float3 surfaceToLight = normalize(input.surfaceToLight);\n  float3 surfaceToView = normalize(input.surfaceToView);\n  float3 halfVector = normalize(surfaceToLight + surfaceToView);\n  float4 litR = lit(dot(normal, surfaceToLight), \n                    dot(normal, halfVector), shininess);\n  return float4((emissive +\n      lightColor * (ambient * newDiffuse + newDiffuse * litR.y +\n      + specular * litR.z * specularFactor)).rgb, newDiffuse.a);\n}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n";
o3djs.manipulators.constantFXString_ =
  "uniform float4x4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform float4 color;\nuniform float4 highlightColor;\n\nstruct VertexShaderInput {\n  float4 position : POSITION;\n};\n\nstruct PixelShaderInput {\n  float4 position : POSITION;\n};\n\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n\n  output.position = mul(input.position, worldViewProjection);\n  return output;\n}\n\nfloat4 pixelShaderFunction(PixelShaderInput input): COLOR {\n  return color * highlightColor;\n}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n";
o3djs.manipulators.getLineRingFXString_ = function (b) {
  var c = "";
  if (b)
    c =
      "  // Use the texCoord to do stippling.\n  if (input.texCoord.x % 2 > 1) return float4(0, 0, 0, 0);\n";
  return (
    'uniform float4x4 worldViewProjection : WORLDVIEWPROJECTION;\n// NOTE: We transform the normals through the\n// worldViewProjectionInverseTranspose instead of the\n// worldViewInverseTranspose. The projection matrix warps the\n// normals in strange ways. One result of this is that the "front\n// face" color of the ring can extend around more than 50% of the\n// ring. This may be good or bad. If we dont include the projection\n// matrix, we always get a 50% split, but we do not account for\n// perspective. An alternative would be to get a little more\n// complicated, using the positions of the camera and the center\n// of the ring.\nuniform float4x4 worldViewProjectionInverseTranspose :\n    WORLDVIEWPROJECTIONINVERSETRANSPOSE;\nuniform float4 color1;\nuniform float4 color2;\nuniform float4 highlightColor;\n\nstruct VertexShaderInput {\n  float4 position : POSITION;\n  float4 normal : NORMAL;\n  float1 texCoord : TEXCOORD0;\n};\n\nstruct PixelShaderInput {\n  float4 position : POSITION;\n  float3 normal : TEXCOORD0;\n  float1 texCoord : TEXCOORD1;\n};\n\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n\n  output.position = mul(input.position, worldViewProjection);\n  output.normal = mul(input.normal,\n                      worldViewProjectionInverseTranspose).xyz;\n  output.texCoord = input.texCoord;\n  return output;\n}\n\nfloat4 pixelShaderFunction(PixelShaderInput input): COLOR {\n' +
    c +
    "  if (input.normal.z < 0) {\n    return color1 * highlightColor; // Front face of the ring.\n  } else {\n    return color2 * highlightColor; // Back face of the ring.\n  }\n}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n"
  );
};
o3djs.manipulators.enableAlphaBlendingOnMaterial = function (b, c, d) {
  if (!c.state) c.state = b.createObject("State");
  b = c.state;
  b.getStateParam("AlphaBlendEnable").value = true;
  b.getStateParam("SourceBlendFunction").value =
    o3djs.base.o3d.State.BLENDFUNC_SOURCE_ALPHA;
  b.getStateParam("DestinationBlendFunction").value =
    o3djs.base.o3d.State.BLENDFUNC_INVERSE_SOURCE_ALPHA;
  b.getStateParam("AlphaTestEnable").value = d;
  b.getStateParam("AlphaComparisonFunction").value =
    o3djs.base.o3d.State.CMP_GREATER;
  b.getStateParam("AlphaReference").value = 0;
};
o3djs.manipulators.createLineRingMaterial = function (b, c, d, e, f) {
  var g = b.createObject("Material");
  g.effect = b.createObject("Effect");
  g.effect.loadFromFXString(o3djs.manipulators.getLineRingFXString_(f));
  g.drawList = c;
  g.createParam("color1", "ParamFloat4").value = d;
  g.createParam("color2", "ParamFloat4").value = e;
  o3djs.manipulators.enableAlphaBlendingOnMaterial(b, g, true);
  return g;
};
o3djs.manipulators.createConstantMaterial = function (b, c, d) {
  var e = b.createObject("Material");
  e.effect = b.createObject("Effect");
  e.effect.loadFromFXString(o3djs.manipulators.constantFXString_);
  e.drawList = c;
  e.createParam("color", "ParamFloat4").value = d;
  o3djs.manipulators.enableAlphaBlendingOnMaterial(b, e, false);
  return e;
};
o3djs.manipulators.createPhongMaterial = function (b, c, d) {
  var e = b.createObject("Material");
  e.effect = b.createObject("Effect");
  e.effect.loadFromFXString(o3djs.manipulators.phongFXString_);
  e.drawList = c;
  e.createParam("diffuse", "ParamFloat4").value = d;
  e.createParam("emissive", "ParamFloat4").value = [0, 0, 0, 1];
  e.createParam("ambient", "ParamFloat4").value = [0.5, 0.5, 0.5, 1];
  e.createParam("specular", "ParamFloat4").value = [1, 1, 1, 1];
  e.createParam("shininess", "ParamFloat").value = 50;
  e.createParam("specularFactor", "ParamFloat").value = 1;
  e.createParam("lightColor", "ParamFloat4").value = [1, 1, 1, 1];
  e.createParam("lightWorldPos", "ParamFloat3").value = [1000, 2000, 3000];
  o3djs.manipulators.enableAlphaBlendingOnMaterial(b, e, false);
  return e;
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
    for (var h = [], i = b[g], k = c[g], j = 0; j < f; ++j) h[j] = i[j] + k[j];
    d[g] = h;
  }
  return d;
};
o3djs.math.subMatrix = function (b, c) {
  for (var d = [], e = b.length, f = b[0].length, g = 0; g < e; ++g) {
    for (var h = [], i = b[g], k = c[g], j = 0; j < f; ++j) h[j] = i[j] - k[j];
    d[g] = h;
  }
  return d;
};
o3djs.math.lerpMatrix = function (b, c, d) {
  for (var e = [], f = b.length, g = b[0].length, h = 0; h < f; ++h) {
    for (var i = [], k = b[h], j = c[h], l = 0; l < g; ++l)
      i[l] = (1 - d) * k[l] + d * j[l];
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
  var k = e[0],
    j = e[1];
  e = e[2];
  var l = f[0],
    n = f[1];
  f = f[2];
  var m = g[0],
    o = g[1];
  g = g[2];
  var r = h[0],
    s = h[1];
  h = h[2];
  var p = i[0],
    t = i[1];
  i = i[2];
  return [
    [c * m + b * r + d * p, c * o + b * s + d * t, c * g + b * h + d * i],
    [k * m + j * r + e * p, k * o + j * s + e * t, k * g + j * h + e * i],
    [l * m + n * r + f * p, l * o + n * s + f * t, l * g + n * h + f * i],
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
  var k = e[0],
    j = e[1];
  e = e[2];
  var l = f[0],
    n = f[1];
  f = f[2];
  var m = g[0],
    o = g[1];
  g = g[2];
  var r = h[0],
    s = h[1];
  h = h[2];
  var p = i[0],
    t = i[1];
  i = i[2];
  return [
    [c * m + k * o + l * g, b * m + j * o + n * g, d * m + e * o + f * g],
    [c * r + k * s + l * h, b * r + j * s + n * h, d * r + e * s + f * h],
    [c * p + k * t + l * i, b * p + j * t + n * i, d * p + e * t + f * i],
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
    k = c[2],
    j = c[3];
  c = d[0];
  b = d[1];
  var l = d[2];
  d = d[3];
  var n = e[0],
    m = e[1],
    o = e[2];
  e = e[3];
  var r = f[0],
    s = f[1],
    p = f[2];
  f = f[3];
  var t = g[0],
    u = g[1],
    y = g[2];
  g = g[3];
  var w = h[0],
    x = h[1],
    A = h[2];
  h = h[3];
  var q = i[0],
    v = i[1],
    B = i[2];
  i = i[3];
  var C = k[0],
    E = k[1],
    D = k[2];
  k = k[3];
  var z = j[0],
    F = j[1],
    G = j[2];
  j = j[3];
  return [
    [
      c * w + b * q + l * C + d * z,
      c * x + b * v + l * E + d * F,
      c * A + b * B + l * D + d * G,
      c * h + b * i + l * k + d * j,
    ],
    [
      n * w + m * q + o * C + e * z,
      n * x + m * v + o * E + e * F,
      n * A + m * B + o * D + e * G,
      n * h + m * i + o * k + e * j,
    ],
    [
      r * w + s * q + p * C + f * z,
      r * x + s * v + p * E + f * F,
      r * A + s * B + p * D + f * G,
      r * h + s * i + p * k + f * j,
    ],
    [
      t * w + u * q + y * C + g * z,
      t * x + u * v + y * E + g * F,
      t * A + u * B + y * D + g * G,
      t * h + u * i + y * k + g * j,
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
    k = c[2],
    j = c[3];
  c = d[0];
  b = d[1];
  var l = d[2];
  d = d[3];
  var n = e[0],
    m = e[1],
    o = e[2];
  e = e[3];
  var r = f[0],
    s = f[1],
    p = f[2];
  f = f[3];
  var t = g[0],
    u = g[1],
    y = g[2];
  g = g[3];
  var w = h[0],
    x = h[1],
    A = h[2];
  h = h[3];
  var q = i[0],
    v = i[1],
    B = i[2];
  i = i[3];
  var C = k[0],
    E = k[1],
    D = k[2];
  k = k[3];
  var z = j[0],
    F = j[1],
    G = j[2];
  j = j[3];
  return [
    [
      c * w + n * x + r * A + t * h,
      b * w + m * x + s * A + u * h,
      l * w + o * x + p * A + y * h,
      d * w + e * x + f * A + g * h,
    ],
    [
      c * q + n * v + r * B + t * i,
      b * q + m * v + s * B + u * i,
      l * q + o * v + p * B + y * i,
      d * q + e * v + f * B + g * i,
    ],
    [
      c * C + n * E + r * D + t * k,
      b * C + m * E + s * D + u * k,
      l * C + o * E + p * D + y * k,
      d * C + e * E + f * D + g * k,
    ],
    [
      c * z + n * F + r * G + t * j,
      b * z + m * F + s * G + u * j,
      l * z + o * F + p * G + y * j,
      d * z + e * F + f * G + g * j,
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
    for (var i = [], k = b[h], j = 0; j < f; ++j)
      for (var l = (i[j] = 0); l < g; ++l) i[j] += k[l] * c[l][j];
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
    for (var i = [], k = c[h], j = 0; j < f; ++j)
      for (var l = (i[j] = 0); l < g; ++l) i[j] += k[l] * b[l][j];
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
    k = b[3][2] * b[0][3],
    j = b[0][2] * b[2][3],
    l = b[2][2] * b[0][3],
    n = b[0][2] * b[1][3],
    m = b[1][2] * b[0][3],
    o = b[2][0] * b[3][1],
    r = b[3][0] * b[2][1],
    s = b[1][0] * b[3][1],
    p = b[3][0] * b[1][1],
    t = b[1][0] * b[2][1],
    u = b[2][0] * b[1][1],
    y = b[0][0] * b[3][1],
    w = b[3][0] * b[0][1],
    x = b[0][0] * b[2][1],
    A = b[2][0] * b[0][1],
    q = b[0][0] * b[1][1],
    v = b[1][0] * b[0][1],
    B =
      c * b[1][1] +
      f * b[2][1] +
      g * b[3][1] -
      (d * b[1][1] + e * b[2][1] + h * b[3][1]),
    C =
      d * b[0][1] +
      i * b[2][1] +
      l * b[3][1] -
      (c * b[0][1] + k * b[2][1] + j * b[3][1]),
    E =
      e * b[0][1] +
      k * b[1][1] +
      n * b[3][1] -
      (f * b[0][1] + i * b[1][1] + m * b[3][1]),
    D =
      h * b[0][1] +
      j * b[1][1] +
      m * b[2][1] -
      (g * b[0][1] + l * b[1][1] + n * b[2][1]),
    z = 1 / (b[0][0] * B + b[1][0] * C + b[2][0] * E + b[3][0] * D);
  B = [z * B, z * C, z * E, z * D];
  c = [
    z *
      (d * b[1][0] +
        e * b[2][0] +
        h * b[3][0] -
        (c * b[1][0] + f * b[2][0] + g * b[3][0])),
    z *
      (c * b[0][0] +
        k * b[2][0] +
        j * b[3][0] -
        (d * b[0][0] + i * b[2][0] + l * b[3][0])),
    z *
      (f * b[0][0] +
        i * b[1][0] +
        m * b[3][0] -
        (e * b[0][0] + k * b[1][0] + n * b[3][0])),
    z *
      (g * b[0][0] +
        l * b[1][0] +
        n * b[2][0] -
        (h * b[0][0] + j * b[1][0] + m * b[2][0])),
  ];
  d = [
    z *
      (o * b[1][3] +
        p * b[2][3] +
        t * b[3][3] -
        (r * b[1][3] + s * b[2][3] + u * b[3][3])),
    z *
      (r * b[0][3] +
        y * b[2][3] +
        A * b[3][3] -
        (o * b[0][3] + w * b[2][3] + x * b[3][3])),
    z *
      (s * b[0][3] +
        w * b[1][3] +
        q * b[3][3] -
        (p * b[0][3] + y * b[1][3] + v * b[3][3])),
    z *
      (u * b[0][3] +
        x * b[1][3] +
        v * b[2][3] -
        (t * b[0][3] + A * b[1][3] + q * b[2][3])),
  ];
  b = [
    z *
      (s * b[2][2] +
        u * b[3][2] +
        r * b[1][2] -
        (t * b[3][2] + o * b[1][2] + p * b[2][2])),
    z *
      (x * b[3][2] +
        o * b[0][2] +
        w * b[2][2] -
        (y * b[2][2] + A * b[3][2] + r * b[0][2])),
    z *
      (y * b[1][2] +
        v * b[3][2] +
        p * b[0][2] -
        (q * b[3][2] + s * b[0][2] + w * b[1][2])),
    z *
      (q * b[2][2] +
        t * b[0][2] +
        A * b[1][2] -
        (x * b[1][2] + v * b[2][2] + u * b[0][2])),
  ];
  return [B, c, d, b];
};
o3djs.math.codet = function (b, c, d) {
  for (var e = b.length, f = [], g = 0, h = 0; h < e - 1; ++h) {
    g == c && g++;
    f[h] = [];
    for (var i = 0, k = 0; k < e - 1; ++k) {
      i == d && i++;
      f[h][k] = b[g][i];
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
    k = f - g;
  return [
    [(2 * f) / h, 0, 0, 0],
    [0, (2 * f) / i, 0, 0],
    [(b + c) / h, (e + d) / i, g / k, -1],
    [0, 0, (f * g) / k, 0],
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
    k = c[2],
    j = c[3];
  c = d[0];
  b = d[1];
  var l = d[2];
  d = d[3];
  var n = e[0],
    m = e[1],
    o = e[2];
  e = e[3];
  var r = f[0],
    s = f[1],
    p = f[2];
  f = f[3];
  var t = g[0],
    u = g[1],
    y = g[2];
  g = g[3];
  var w = h[0],
    x = h[1],
    A = h[2];
  h = h[3];
  var q = i[0],
    v = i[1],
    B = i[2];
  i = i[3];
  var C = k[0],
    E = k[1],
    D = k[2];
  k = k[3];
  var z = j[0],
    F = j[1],
    G = j[2];
  j = j[3];
  return [
    [
      c * w + n * x + r * A + t * h,
      b * w + m * x + s * A + u * h,
      l * w + o * x + p * A + y * h,
      d * w + e * x + f * A + g * h,
    ],
    [
      c * q + n * v + r * B + t * i,
      b * q + m * v + s * B + u * i,
      l * q + o * v + p * B + y * i,
      d * q + e * v + f * B + g * i,
    ],
    [
      c * C + n * E + r * D + t * k,
      b * C + m * E + s * D + u * k,
      l * C + o * E + p * D + y * k,
      d * C + e * E + f * D + g * k,
    ],
    [
      c * z + n * F + r * G + t * j,
      b * z + m * F + s * G + u * j,
      l * z + o * F + p * G + y * j,
      d * z + e * F + f * G + g * j,
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
    k = c[2],
    j = c[3];
  c = d[0];
  var l = d[1],
    n = d[2];
  d = d[3];
  var m = e[0],
    o = e[1],
    r = e[2];
  e = e[3];
  var s = f[0],
    p = f[1],
    t = f[2];
  f = f[3];
  var u = g[0],
    y = g[1],
    w = g[2];
  g = g[3];
  var x = h[0],
    A = h[1],
    q = h[2];
  h = h[3];
  var v = i[0],
    B = i[1],
    C = i[2];
  i = i[3];
  var E = k[0],
    D = k[1],
    z = k[2];
  k = k[3];
  var F = j[0],
    G = j[1],
    H = j[2];
  j = j[3];
  b[0].splice(
    0,
    4,
    c * x + m * A + s * q + u * h,
    l * x + o * A + p * q + y * h,
    n * x + r * A + t * q + w * h,
    d * x + e * A + f * q + g * h
  );
  b[1].splice(
    0,
    4,
    c * v + m * B + s * C + u * i,
    l * v + o * B + p * C + y * i,
    n * v + r * B + t * C + w * i,
    d * v + e * B + f * C + g * i
  );
  b[2].splice(
    0,
    4,
    c * E + m * D + s * z + u * k,
    l * E + o * D + p * z + y * k,
    n * E + r * D + t * z + w * k,
    d * E + e * D + f * z + g * k
  ),
    b[3].splice(
      0,
      4,
      c * F + m * G + s * H + u * j,
      l * F + o * G + p * H + y * j,
      n * F + r * G + t * H + w * j,
      d * F + e * G + f * H + g * j
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
    k = f[0],
    j = f[1],
    l = f[2];
  f = f[3];
  var n = g[0],
    m = g[1],
    o = g[2];
  g = g[3];
  var r = h[0],
    s = h[1],
    p = h[2];
  h = h[3];
  var t = i[0],
    u = i[1],
    y = i[2],
    w = i[3];
  i.splice(
    0,
    4,
    k * d + n * e + r * c + t,
    j * d + m * e + s * c + u,
    l * d + o * e + p * c + y,
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
    k = e[0],
    j = e[1],
    l = e[2],
    n = e[3],
    m = Math.cos(c);
  c = Math.sin(c);
  d.splice(0, 4, m * f + c * k, m * g + c * j, m * h + c * l, m * i + c * n);
  e.splice(0, 4, m * k - c * f, m * j - c * g, m * l - c * h, m * n - c * i);
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
    k = e[0],
    j = e[1],
    l = e[2],
    n = e[3],
    m = Math.cos(c);
  c = Math.sin(c);
  d.splice(0, 4, m * f - c * k, m * g - c * j, m * h - c * l, m * i - c * n);
  e.splice(0, 4, m * k + c * f, m * j + c * g, m * l + c * h, m * n + c * i);
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
    k = e[0],
    j = e[1],
    l = e[2],
    n = e[3],
    m = Math.cos(c);
  c = Math.sin(c);
  d.splice(0, 4, m * f + c * k, m * g + c * j, m * h + c * l, m * i + c * n);
  e.splice(0, 4, m * k - c * f, m * j - c * g, m * l - c * h, m * n - c * i);
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
    k = i * f,
    j = h * f;
  c = i * g;
  var l = h * g;
  f = -f;
  var n = k * d - h * e,
    m = j * d + i * e,
    o = g * d;
  h = k * e + h * d;
  d = j * e - i * d;
  e = g * e;
  g = b[0];
  i = b[1];
  j = b[2];
  k = g[0];
  var r = g[1],
    s = g[2],
    p = g[3],
    t = i[0],
    u = i[1],
    y = i[2],
    w = i[3],
    x = j[0],
    A = j[1],
    q = j[2],
    v = j[3];
  g.splice(
    0,
    4,
    c * k + l * t + f * x,
    c * r + l * u + f * A,
    c * s + l * y + f * q,
    c * p + l * w + f * v
  );
  i.splice(
    0,
    4,
    n * k + m * t + o * x,
    n * r + m * u + o * A,
    n * s + m * y + o * q,
    n * p + m * w + o * v
  );
  j.splice(
    0,
    4,
    h * k + d * t + e * x,
    h * r + d * u + e * A,
    h * s + d * y + e * q,
    h * p + d * w + e * v
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
  var k = 1 - i;
  return [
    [f + (1 - f) * i, d * e * k + b * c, d * b * k - e * c, 0],
    [d * e * k - b * c, g + (1 - g) * i, e * b * k + d * c, 0],
    [d * b * k + e * c, e * b * k - d * c, h + (1 - h) * i, 0],
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
    k = Math.cos(d),
    j = Math.sin(d),
    l = 1 - k;
  d = c + (1 - c) * k;
  c = e * f * l + g * j;
  var n = e * g * l - f * j,
    m = e * f * l - g * j;
  h = h + (1 - h) * k;
  var o = f * g * l + e * j,
    r = e * g * l + f * j;
  e = f * g * l - e * j;
  f = i + (1 - i) * k;
  g = b[0];
  i = b[1];
  k = b[2];
  j = g[0];
  l = g[1];
  var s = g[2],
    p = g[3],
    t = i[0],
    u = i[1],
    y = i[2],
    w = i[3],
    x = k[0],
    A = k[1],
    q = k[2],
    v = k[3];
  g.splice(
    0,
    4,
    d * j + c * t + n * x,
    d * l + c * u + n * A,
    d * s + c * y + n * q,
    d * p + c * w + n * v
  );
  i.splice(
    0,
    4,
    m * j + h * t + o * x,
    m * l + h * u + o * A,
    m * s + h * y + o * q,
    m * p + h * w + o * v
  );
  k.splice(
    0,
    4,
    r * j + e * t + f * x,
    r * l + e * u + f * A,
    r * s + e * y + f * q,
    r * p + e * w + f * v
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
      "float4x4 viewProjection : VIEWPROJECTION;\nfloat4x4 world : WORLD;\nfloat4x4 viewInverse : VIEWINVERSE;\nfloat3 worldVelocity;\nfloat3 worldAcceleration;\nfloat timeRange;\nfloat time;\nfloat timeOffset;\nfloat frameDuration;\nfloat numFrames;\n\n// We need to implement 1D!\nsampler rampSampler;\nsampler colorSampler;\n\nstruct VertexShaderInput {\n  float4 uvLifeTimeFrameStart : POSITION; // uv, lifeTime, frameStart\n  float4 positionStartTime : TEXCOORD0;    // position.xyz, startTime\n  float4 velocityStartSize : TEXCOORD1;   // velocity.xyz, startSize\n  float4 accelerationEndSize : TEXCOORD2; // acceleration.xyz, endSize\n  float4 spinStartSpinSpeed : TEXCOORD3;  // spinStart.x, spinSpeed.y\n  float4 colorMult : COLOR; //\n};\n\nstruct PixelShaderInput {\n  float4 position : POSITION;\n  float2 texcoord : TEXCOORD0;\n  float1 percentLife : TEXCOORD1;\n  float4 colorMult: TEXCOORD2;\n};\n\nPixelShaderInput vertexShaderFunction(VertexShaderInput input) {\n  PixelShaderInput output;\n\n  float2 uv = input.uvLifeTimeFrameStart.xy;\n  float lifeTime = input.uvLifeTimeFrameStart.z;\n  float frameStart = input.uvLifeTimeFrameStart.w;\n  float3 position = mul(float4(input.positionStartTime.xyz, 1),\n                        world).xyz;\n  float startTime = input.positionStartTime.w;\n  float3 velocity = mul(float4(input.velocityStartSize.xyz, 0),\n                        world).xyz + worldVelocity;\n  float startSize = input.velocityStartSize.w;\n  float3 acceleration = mul(float4(input.accelerationEndSize.xyz, 0),\n                            world).xyz + worldAcceleration;\n  float endSize = input.accelerationEndSize.w;\n  float spinStart = input.spinStartSpinSpeed.x;\n  float spinSpeed = input.spinStartSpinSpeed.y;\n\n  float localTime = fmod((time - timeOffset - startTime), timeRange);\n  float percentLife = localTime / lifeTime;\n\n  float frame = fmod(floor(localTime / frameDuration + frameStart),\n                     numFrames);\n  float uOffset = frame / numFrames;\n  float u = uOffset + (uv.x + 0.5) * (1 / numFrames);\n\n  output.texcoord = float2(u, uv.y + 0.5);\n  output.colorMult = input.colorMult;\n\n  float3 basisX = viewInverse[0].xyz;\n  float3 basisZ = viewInverse[1].xyz;\n\n  float size = lerp(startSize, endSize, percentLife);\n  size = (percentLife < 0 || percentLife > 1) ? 0 : size;\n  float s = sin(spinStart + spinSpeed * localTime);\n  float c = cos(spinStart + spinSpeed * localTime);\n\n  float2 rotatedPoint = float2(uv.x * c + uv.y * s, \n                               -uv.x * s + uv.y * c);\n  float3 localPosition = float3(basisX * rotatedPoint.x +\n                                basisZ * rotatedPoint.y) * size +\n                         velocity * localTime +\n                         acceleration * localTime * localTime + \n                         position;\n\n  output.position = mul(float4(localPosition, 1), \n                        viewProjection);\n  output.percentLife = percentLife;\n  return output;\n}\n\nfloat4 pixelShaderFunction(PixelShaderInput input): COLOR {\n  float4 colorMult = tex2D(rampSampler, \n                           float2(input.percentLife, 0.5)) *\n                     input.colorMult;\n  float4 color = tex2D(colorSampler, input.texcoord) * colorMult;\n  return color;\n}\n\n// #o3d VertexShaderEntryPoint vertexShaderFunction\n// #o3d PixelShaderEntryPoint pixelShaderFunction\n// #o3d MatrixLoadOrder RowMajor\n",
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
    var k = o3djs.particles.FX_STRINGS[i],
      j = b.createObject("Effect");
    j.name = k.name;
    j.loadFromFXString(k.fxString);
    h.push(j);
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
    j = b.createObject("State");
    k = o3djs.particles.ParticleStateIds[l];
    g[k] = j;
    j.getStateParam("ZWriteEnable").value = false;
    j.getStateParam("CullMode").value = f.State.CULL_NONE;
    k = i[k];
    for (var n in k) j.getStateParam(n).value = k[n];
  }
  l = b.createTexture2D(8, 8, f.Texture.ARGB8, 1, false);
  n = [0, 0.2, 0.7, 1, 0.7, 0.2, 0, 0];
  k = [];
  for (i = 0; i < 8; ++i)
    for (j = 0; j < 8; ++j) {
      var m = n[j] * n[i];
      k.push(m, m, m, m);
    }
  l.set(0, k);
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
  var k = c.createField("FloatField", 4),
    j = c.createField("FloatField", 4),
    l = c.createField("FloatField", 4),
    n = c.createField("FloatField", 4),
    m = c.createField("FloatField", 4),
    o = c.createField("FloatField", 4),
    r = c.createField("FloatField", 4),
    s = f.createObject("IndexBuffer"),
    p = f.createObject("StreamBank");
  p.setVertexStream(e.Stream.POSITION, 0, k, 0);
  p.setVertexStream(e.Stream.TEXCOORD, 0, j, 0);
  p.setVertexStream(e.Stream.TEXCOORD, 1, l, 0);
  p.setVertexStream(e.Stream.TEXCOORD, 2, n, 0);
  p.setVertexStream(e.Stream.TEXCOORD, 3, m, 0);
  p.setVertexStream(e.Stream.TEXCOORD, 4, o, 0);
  p.setVertexStream(e.Stream.COLOR, 0, r, 0);
  var t = f.createObject("Shape"),
    u = f.createObject("Primitive");
  u.material = h;
  u.owner = t;
  u.streamBank = p;
  u.indexBuffer = s;
  u.primitiveType = e.Primitive.TRIANGLELIST;
  u.createDrawElement(f, null);
  this.vertexBuffer_ = c;
  this.uvLifeTimeFrameStartField_ = k;
  this.positionStartTimeField_ = j;
  this.velocityStartSizeField_ = l;
  this.accelerationEndSizeField_ = n;
  this.spinStartSpinSpeedField_ = m;
  this.orientationField_ = o;
  this.colorMultField_ = r;
  this.indexBuffer_ = s;
  this.streamBank_ = p;
  this.primitive_ = u;
  this.rampSampler_ = g;
  this.rampTexture_ = b.defaultRampTexture;
  this.colorSampler_ = i;
  this.particleSystem = b;
  this.shape = t;
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
    k = this.spinStartSpinSpeed_,
    j = this.orientation_,
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
      r = 0;
    r < c;
    ++r
  ) {
    e && e(r, d);
    for (
      var s = d.lifeTime,
        p = d.startTime === null ? (r * d.lifeTime) / c : d.startTime,
        t = d.frameStart + m(d.frameStartRange),
        u = o3djs.math.addVector(d.position, o(d.positionRange)),
        y = o3djs.math.addVector(d.velocity, o(d.velocityRange)),
        w = o3djs.math.addVector(d.acceleration, o(d.accelerationRange)),
        x = o3djs.math.addVector(d.colorMult, o(d.colorMultRange)),
        A = d.spinStart + m(d.spinStartRange),
        q = d.spinSpeed + m(d.spinSpeedRange),
        v = d.startSize + m(d.startSizeRange),
        B = d.endSize + m(d.endSizeRange),
        C = d.orientation,
        E = 0;
      E < 4;
      ++E
    ) {
      var D = (r * 4 + E) * 4,
        z = D + 1,
        F = D + 2,
        G = D + 3;
      f[D] = o3djs.particles.CORNERS_[E][0];
      f[z] = o3djs.particles.CORNERS_[E][1];
      f[F] = s;
      f[G] = t;
      g[D] = u[0];
      g[z] = u[1];
      g[F] = u[2];
      g[G] = p;
      h[D] = y[0];
      h[z] = y[1];
      h[F] = y[2];
      h[G] = v;
      i[D] = w[0];
      i[z] = w[1];
      i[F] = w[2];
      i[G] = B;
      k[D] = A;
      k[z] = q;
      k[F] = 0;
      k[G] = 0;
      j[D] = C[0];
      j[z] = C[1];
      j[F] = C[2];
      j[G] = C[3];
      l[D] = x[0];
      l[z] = x[1];
      l[F] = x[2];
      l[G] = x[3];
    }
  }
  b *= 4;
  this.uvLifeTimeFrameStartField_.setAt(b, f);
  this.positionStartTimeField_.setAt(b, g);
  this.velocityStartSizeField_.setAt(b, h);
  this.accelerationEndSizeField_.setAt(b, i);
  this.spinStartSpinSpeedField_.setAt(b, k);
  this.orientationField_.setAt(b, j);
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
o3djs.picking.ShapeInfo = function (b, c, d) {
  this.shape = b;
  this.parent = c;
  this.boundingBox = null;
  this.pickManager = d;
  this.update();
};
a = o3djs.picking.ShapeInfo.prototype;
a.isPickable = function () {
  return true;
};
a.getBoundingBox = function () {
  return this.boundingBox;
};
a.update = function () {
  var b = this.shape.elements;
  if (b.length > 0) {
    this.boundingBox = b[0].getBoundingBox(0);
    for (var c = 1; c < b.length; c++)
      this.boundingBox = this.boundingBox.add(b[c].getBoundingBox(0));
  }
};
a.pick = function (b) {
  if (this.isPickable()) {
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
  }
  return null;
};
a.dump = function (b) {
  b = b || "";
  o3djs.picking.dprint(b + "SHAPE: " + this.shape.name + "\n");
  o3djs.picking.dprintPoint3("bb min", this.boundingBox.minExtent, b + "    ");
  o3djs.picking.dprintPoint3("bb max", this.boundingBox.maxExtent, b + "    ");
};
o3djs.picking.TransformInfo = function (b, c, d) {
  this.childTransformInfos = {};
  this.shapeInfos = {};
  this.transform = b;
  this.parent = c;
  this.boundingBox = null;
  this.pickManager = d;
  this.pickableEvenIfInvisible = false;
};
a = o3djs.picking.TransformInfo.prototype;
a.getBoundingBox = function () {
  return this.boundingBox;
};
a.isPickable = function () {
  return this.transform.visible || this.pickableEvenIfInvisible;
};
a.update = function () {
  for (
    var b = {}, c = {}, d = this.transform.children, e = 0;
    e < d.length;
    e++
  ) {
    var f = d[e],
      g = this.childTransformInfos[f.clientId];
    if (g) g.boundingBox = null;
    else g = this.pickManager.createTransformInfo(f, this);
    g.update();
    b[f.clientId] = g;
  }
  d = this.transform.shapes;
  for (e = 0; e < d.length; e++) {
    f = d[e];
    (g = this.shapeInfos[f.clientId]) ||
      (g = this.pickManager.createShapeInfo(f, this));
    c[f.clientId] = g;
  }
  for (var h in this.childTransformInfos) {
    var i = h;
    b[i] || this.pickManager.removeTransformInfo(this.childTransformInfos[i]);
  }
  this.childTransformInfos = b;
  this.shapeInfos = c;
  h = null;
  for (i in c) {
    g = c[i];
    if (g.isPickable()) {
      g = g.getBoundingBox().mul(this.transform.localMatrix);
      if (h) {
        if (g) h = h.add(g);
      } else h = g;
    }
  }
  for (i in b) {
    g = b[i];
    if (g.isPickable())
      if ((g = g.getBoundingBox()))
        h = h
          ? h.add(g.mul(this.transform.localMatrix))
          : g.mul(this.transform.localMatrix);
  }
  this.boundingBox = h;
};
a.pick = function (b) {
  if (this.isPickable() && this.boundingBox) {
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
        var f = e;
        f = this.childTransformInfos[f];
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
        f = e;
        f = this.shapeInfos[f];
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
a.dump = function (b) {
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
    var d = c;
    d = this.shapeInfos[d];
    d.dump(b + "    ");
  }
  o3djs.picking.dprint(b + "--Children--\n");
  for (c in this.childTransformInfos) {
    d = c;
    d = this.childTransformInfos[d];
    d.dump(b + "    ");
  }
};
o3djs.picking.PickManager = function (b) {
  this.transformInfosByClientId = {};
  this.rootTransformInfo = this.createTransformInfo(b, null);
};
a = o3djs.picking.PickManager.prototype;
a.createShapeInfo = function (b, c) {
  return new o3djs.picking.ShapeInfo(b, c, this);
};
a.createTransformInfo = function (b, c) {
  b = new o3djs.picking.TransformInfo(b, c, this);
  this.addTransformInfo(b);
  return b;
};
a.addTransformInfo = function (b) {
  this.transformInfosByClientId[b.transform.clientId] = b;
};
a.removeTransformInfo = function (b) {
  delete this.transformInfosByClientId[b.transform.clientId];
};
a.getTransformInfo = function (b) {
  return this.transformInfosByClientId[b.clientId];
};
a.update = function () {
  this.rootTransformInfo.update();
};
a.dump = function () {
  this.rootTransformInfo.dump();
};
a.pick = function (b) {
  return this.rootTransformInfo.pick(b);
};
o3djs.picking.createPickManager = function (b) {
  return new o3djs.picking.PickManager(b);
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
o3djs.primitives.VertexInfoBase = function () {
  this.streams = [];
  this.indices = [];
};
a = o3djs.primitives.VertexInfoBase.prototype;
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
a.createShapeByType = function (b, c, d) {
  this.validate();
  var e = this.indices.length,
    f;
  switch (d) {
    case o3djs.base.o3d.Primitive.POINTLIST:
      f = e / 1;
      break;
    case o3djs.base.o3d.Primitive.LINELIST:
      f = e / 2;
      break;
    case o3djs.base.o3d.Primitive.LINESTRIP:
      f = e - 1;
      break;
    case o3djs.base.o3d.Primitive.TRIANGLELIST:
      f = e / 3;
      break;
    case o3djs.base.o3d.Primitive.TRIANGLESTRIP:
    case o3djs.base.o3d.Primitive.TRIANGLEFAN:
      f = e - 2;
      break;
    default:
      throw "unknown primitive type";
  }
  e = this.findStream(o3djs.base.o3d.Stream.POSITION);
  var g = e.numElements();
  e = b.createObject("Shape");
  var h = b.createObject("Primitive"),
    i = b.createObject("StreamBank");
  h.owner = e;
  h.streamBank = i;
  h.material = c;
  h.numberPrimitives = f;
  h.primitiveType = d;
  h.numberVertices = g;
  h.createDrawElement(b, null);
  f = c.effect.getStreamInfo();
  for (c = 0; c < f.length; ++c) {
    var k = f[c].semantic,
      j = f[c].semanticIndex,
      l = this.findStream(k, j);
    if (!l)
      switch (k) {
        case o3djs.base.o3d.Stream.TANGENT:
        case o3djs.base.o3d.Stream.BINORMAL:
          if (d == o3djs.base.o3d.Primitive.TRIANGLELIST)
            this.addTangentStreams(j);
          else
            throw (
              "Can not create tangents and binormals for primitive type" + d
            );
          break;
        case o3djs.base.o3d.Stream.COLOR:
          l = this.addStream(4, k, j);
          for (k = 0; k < g; ++k) l.addElement(1, 1, 1, 1);
          break;
        default:
          throw (
            "Missing stream for semantic " + k + " with semantic index " + j
          );
      }
  }
  d = b.createObject("VertexBuffer");
  f = [];
  for (c = 0; c < this.streams.length; ++c) {
    l = this.streams[c];
    k =
      l.semantic == o3djs.base.o3d.Stream.COLOR && l.numComponents == 4
        ? "UByteNField"
        : "FloatField";
    f[c] = d.createField(k, l.numComponents);
    i.setVertexStream(l.semantic, l.semanticIndex, f[c], 0);
  }
  d.allocateElements(g);
  for (c = 0; c < this.streams.length; ++c)
    f[c].setAt(0, this.streams[c].elements);
  b = b.createObject("IndexBuffer");
  b.set(this.indices);
  h.indexBuffer = b;
  o3djs.primitives.setCullingInfo(h);
  return e;
};
o3djs.primitives.VertexInfo = function () {
  o3djs.primitives.VertexInfoBase.call(this);
};
o3djs.base.inherit(
  o3djs.primitives.VertexInfo,
  o3djs.primitives.VertexInfoBase
);
a = o3djs.primitives.VertexInfo.prototype;
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
a.createShape = function (b, c) {
  return this.createShapeByType(b, c, o3djs.base.o3d.Primitive.TRIANGLELIST);
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
  function k(w, x, A, q) {
    w = i(w, x);
    (x = g[w]) ||
      (x = [
        [0, 0, 0],
        [0, 0, 0],
      ]);
    x = c.addMatrix(x, [A, q]);
    g[w] = x;
  }
  function j(w, x) {
    w = i(w, x);
    return g[w];
  }
  for (var l = this.numTriangles(), n = 0; n < l; ++n) {
    for (
      var m = this.getTriangle(n), o = [], r = [], s = [], p = 0;
      p < 3;
      ++p
    ) {
      var t = m[p];
      o[p] = f.getElementVector(t);
      r[p] = d.getElementVector(t);
      s[p] = e.getElementVector(t);
    }
    m = [0, 0, 0];
    var u = [0, 0, 0];
    for (t = 0; t < 3; ++t) {
      p = [r[1][t] - r[0][t], o[1][0] - o[0][0], o[1][1] - o[0][1]];
      var y = [r[2][t] - r[0][t], o[2][0] - o[0][0], o[2][1] - o[0][1]];
      p = c.normalize(c.cross(p, y));
      if (p[0] == 0) p[0] = 1;
      m[t] = -p[1] / p[0];
      u[t] = -p[2] / p[0];
    }
    o = c.length(m);
    if (o > 0.001) m = c.mulVectorScalar(m, 1 / o);
    o = c.length(u);
    if (o > 0.001) u = c.mulVectorScalar(u, 1 / o);
    for (p = 0; p < 3; ++p) k(r[p], s[p], m, u);
  }
  f = this.addStream(3, o3djs.base.o3d.Stream.TANGENT, b);
  b = this.addStream(3, o3djs.base.o3d.Stream.BINORMAL, b);
  l = d.numElements();
  for (t = 0; t < l; ++t) {
    m = d.getElementVector(t);
    n = e.getElementVector(t);
    u = j(m, n);
    m = u[0];
    m = c.subVector(m, c.mulVectorScalar(n, c.dot(n, m)));
    o = c.length(m);
    if (o > 0.001) m = c.mulVectorScalar(m, 1 / o);
    u = u[1];
    u = c.subVector(u, c.mulVectorScalar(m, c.dot(m, u)));
    u = c.subVector(u, c.mulVectorScalar(n, c.dot(n, u)));
    o = c.length(u);
    if (o > 0.001) u = c.mulVectorScalar(u, 1 / o);
    f.setElementVector(t, m);
    b.setElementVector(t, u);
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
      k = 0;
    k <= d;
    k++
  )
    for (var j = 0; j <= c; j++) {
      var l = j / c,
        n = k / d,
        m = 2 * Math.PI * l,
        o = Math.PI * n,
        r = Math.sin(m),
        s = Math.cos(m);
      m = Math.sin(o);
      var p = Math.cos(o);
      o = s * m;
      s = p;
      r = r * m;
      g.addElement(b * o, b * s, b * r);
      h.addElement(o, s, r);
      i.addElement(1 - l, 1 - n);
    }
  b = c + 1;
  for (j = 0; j < c; j++)
    for (k = 0; k < d; k++) {
      f.addTriangle((k + 0) * b + j, (k + 0) * b + j + 1, (k + 1) * b + j);
      f.addTriangle((k + 1) * b + j, (k + 0) * b + j + 1, (k + 1) * b + j + 1);
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
      k = 0;
    k < 6;
    ++k
  )
    for (var j = o3djs.primitives.CUBE_FACE_INDICES_[k], l = 0; l < 4; ++l) {
      var n = b[j[l]],
        m = d[k],
        o = e[l];
      g.addElementVector(n);
      h.addElementVector(m);
      i.addElementVector(o);
      n = 4 * k;
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
      var k = f[h[i]];
      e.addElementVector(k);
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
    k = h.addStream(3, o3djs.base.o3d.Stream.NORMAL),
    j = h.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
    l = 0;
  if (e == 0) {
    i.addElement(0, 0, 0);
    k.addElement(0, 1, 0);
    j.addElement(0, 0);
    l++;
  }
  for (var n = Math.max(e, 1); n <= d; ++n) {
    for (var m = b * Math.pow(n / d, f), o = 0; o < c; ++o) {
      var r = (2 * Math.PI * o) / c,
        s = m * Math.cos(r);
      r = m * Math.sin(r);
      i.addElement(s, 0, r);
      k.addElement(0, 1, 0);
      j.addElement(s, r);
      if (n > e) {
        s = l + ((o + 1) % c);
        r = l + o;
        if (n > 1) {
          var p = l + o - c,
            t = l + ((o + 1) % c) - c;
          h.addTriangle(s, r, p);
          h.addTriangle(s, p, t);
        } else h.addTriangle(0, s, r);
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
  if (e < 3) throw Error("radialSubdivisions must be 3 or greater");
  if (f < 1) throw Error("verticalSubdivisions must be 1 or greater");
  var h = o3djs.primitives.createVertexInfo(),
    i = h.addStream(3, o3djs.base.o3d.Stream.POSITION),
    k = h.addStream(3, o3djs.base.o3d.Stream.NORMAL),
    j = h.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
    l = e + 1,
    n = Math.atan2(b - c, d),
    m = Math.cos(n);
  n = Math.sin(n);
  for (var o = -2; o <= f + 2; ++o) {
    var r = o / f,
      s = d * r,
      p;
    if (o < 0) {
      s = 0;
      r = 1;
      p = b;
    } else if (o > f) {
      s = d;
      r = 1;
      p = c;
    } else p = b + (c - b) * (o / f);
    if (o == -2 || o == f + 2) r = p = 0;
    s -= d / 2;
    for (var t = 0; t < l; ++t) {
      var u = Math.sin((t * Math.PI * 2) / e),
        y = Math.cos((t * Math.PI * 2) / e);
      i.addElement(u * p, s, y * p);
      k.addElement(
        o < 0 || o > f ? 0 : u * m,
        o < 0 ? -1 : o > f ? 1 : n,
        o < 0 || o > f ? 0 : y * m
      );
      j.addElement(t / e, r);
    }
  }
  for (o = 0; o < f + 4; ++o)
    for (t = 0; t < e; ++t) {
      h.addTriangle(
        l * (o + 0) + 0 + t,
        l * (o + 0) + 1 + t,
        l * (o + 1) + 1 + t
      );
      h.addTriangle(
        l * (o + 0) + 0 + t,
        l * (o + 1) + 1 + t,
        l * (o + 1) + 0 + t
      );
    }
  g && h.reorient(g);
  return h;
};
o3djs.primitives.createTruncatedCone = function (b, c, d, e, f, g, h, i) {
  d = o3djs.primitives.createTruncatedConeVertices(d, e, f, g, h, i);
  return d.createShape(b, c);
};
o3djs.primitives.createTorusVertices = function (b, c, d, e, f) {
  if (d < 3) throw Error("tubeLengthSubdivisions must be 3 or greater");
  if (e < 3) throw Error("circleSubdivisions must be 3 or greater");
  for (
    var g = o3djs.primitives.createVertexInfo(),
      h = g.addStream(3, o3djs.base.o3d.Stream.POSITION),
      i = g.addStream(3, o3djs.base.o3d.Stream.NORMAL),
      k = g.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
      j = 0;
    j < d;
    ++j
  )
    for (var l = (j / d) * 2 * Math.PI, n = 0; n < e; ++n) {
      var m = (n / e) * 2 * Math.PI,
        o = Math.sin(l),
        r = Math.cos(l),
        s = Math.sin(m);
      m = Math.cos(m);
      h.addElement((b + c * m) * r, c * s, (b + c * m) * o);
      i.addElement(m * r, s, m * o);
      k.addElement(j / d, n / e);
    }
  for (j = 0; j < d; ++j)
    for (n = 0; n < e; ++n) {
      i = (j + 1) % d;
      k = (n + 1) % e;
      b = e * j + n;
      c = e * i + n;
      h = e * j + k;
      i = e * i + k;
      g.addTriangle(b, i, c);
      g.addTriangle(b, h, i);
    }
  f && g.reorient(f);
  return g;
};
o3djs.primitives.createTorus = function (b, c, d, e, f, g, h) {
  d = o3djs.primitives.createTorusVertices(d, e, f, g, h);
  return d.createShape(b, c);
};
o3djs.primitives.createWedgeVertices = function (b, c, d) {
  var e = o3djs.math,
    f = o3djs.primitives.createVertexInfo(),
    g = f.addStream(3, o3djs.base.o3d.Stream.POSITION),
    h = f.addStream(3, o3djs.base.o3d.Stream.NORMAL),
    i = f.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
    k = -c * 0.5;
  c = c * 0.5;
  var j = [];
  b = [
    [b[0][0], b[0][1]],
    [b[1][0], b[1][1]],
    [b[2][0], b[2][1]],
  ];
  j[0] = e.cross(
    e.normalize([b[1][0] - b[0][0], b[1][1] - b[0][1], k - k]),
    e.normalize([b[1][0] - b[1][0], b[1][1] - b[1][1], c - k])
  );
  j[1] = e.cross(
    e.normalize([b[2][0] - b[1][0], b[2][1] - b[1][1], k - k]),
    e.normalize([b[2][0] - b[2][0], b[2][1] - b[2][1], c - k])
  );
  j[2] = e.cross(
    [b[0][0] - b[2][0], b[0][1] - b[2][1], k - k],
    [b[0][0] - b[0][0], b[0][1] - b[0][1], c - k]
  );
  g.addElement(b[0][0], b[0][1], k);
  h.addElement(0, 0, -1);
  i.addElement(0, 1);
  g.addElement(b[1][0], b[1][1], k);
  h.addElement(0, 0, -1);
  i.addElement(1, 0);
  g.addElement(b[2][0], b[2][1], k);
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
  g.addElement(b[0][0], b[0][1], k);
  h.addElement(j[0][0], j[0][1], j[0][2]);
  i.addElement(0, 1);
  g.addElement(b[1][0], b[1][1], k);
  h.addElement(j[0][0], j[0][1], j[0][2]);
  i.addElement(0, 0);
  g.addElement(b[1][0], b[1][1], c);
  h.addElement(j[0][0], j[0][1], j[0][2]);
  i.addElement(1, 0);
  g.addElement(b[0][0], b[0][1], c);
  h.addElement(j[0][0], j[0][1], j[0][2]);
  i.addElement(1, 1);
  g.addElement(b[1][0], b[1][1], k);
  h.addElement(j[1][0], j[1][1], j[1][2]);
  i.addElement(0, 1);
  g.addElement(b[2][0], b[2][1], k);
  h.addElement(j[1][0], j[1][1], j[1][2]);
  i.addElement(0, 0);
  g.addElement(b[2][0], b[2][1], c);
  h.addElement(j[1][0], j[1][1], j[1][2]);
  i.addElement(1, 0);
  g.addElement(b[1][0], b[1][1], c);
  h.addElement(j[1][0], j[1][1], j[1][2]);
  i.addElement(1, 1);
  g.addElement(b[2][0], b[2][1], k);
  h.addElement(j[2][0], j[2][1], j[2][2]);
  i.addElement(0, 1);
  g.addElement(b[0][0], b[0][1], k);
  h.addElement(j[2][0], j[2][1], j[2][2]);
  i.addElement(0, 0);
  g.addElement(b[0][0], b[0][1], c);
  h.addElement(j[2][0], j[2][1], j[2][2]);
  i.addElement(1, 0);
  g.addElement(b[2][0], b[2][1], c);
  h.addElement(j[2][0], j[2][1], j[2][2]);
  i.addElement(1, 1);
  f.addTriangle(0, 2, 1);
  f.addTriangle(3, 4, 5);
  f.addTriangle(6, 7, 8);
  f.addTriangle(6, 8, 9);
  f.addTriangle(10, 11, 12);
  f.addTriangle(10, 12, 13);
  f.addTriangle(14, 15, 16);
  f.addTriangle(14, 16, 17);
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
      k = g.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
      j = b.length,
      l = 0;
    l < j;
    ++l
  ) {
    var n = (l + 1) % j,
      m = b[n][0] - b[l][0],
      o = b[n][1] - b[l][1];
    n = Math.sqrt(m * m + o * o);
    f[l] = [o / n, -m / n, 0];
  }
  n = b[0][0];
  var r = b[0][1],
    s = b[0][0],
    p = b[0][1];
  for (l = 1; l < j; ++l) {
    m = b[l][0];
    o = b[l][1];
    n = Math.min(n, m);
    r = Math.min(r, o);
    s = Math.max(s, m);
    p = Math.max(p, o);
  }
  m = [];
  o = [];
  var t = s - n;
  p = p - r;
  for (l = 0; l < j; ++l) {
    m[l] = [(b[l][0] - n) / t, (b[l][1] - r) / p];
    o[l] = [(s - b[l][0]) / t, (b[l][1] - r) / p];
  }
  for (l = 0; l < j; ++l) {
    n = (l + 1) % j;
    h.addElement(b[l][0], b[l][1], e);
    i.addElement(0, 0, -1);
    k.addElement(o[l][0], o[l][1]);
    h.addElement(b[l][0], b[l][1], c), i.addElement(0, 0, 1);
    k.addElement(m[l][0], m[l][1]);
    h.addElement(b[l][0], b[l][1], e), i.addElement(f[l][0], f[l][1], f[l][2]);
    k.addElement(0, 1);
    h.addElement(b[n][0], b[n][1], e), i.addElement(f[l][0], f[l][1], f[l][2]);
    k.addElement(0, 0);
    h.addElement(b[n][0], b[n][1], c), i.addElement(f[l][0], f[l][1], f[l][2]);
    k.addElement(1, 0);
    h.addElement(b[l][0], b[l][1], c), i.addElement(f[l][0], f[l][1], f[l][2]);
    k.addElement(1, 1);
    if (l > 0 && l < j - 1) {
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
      k = g.addStream(2, o3djs.base.o3d.Stream.TEXCOORD, 0),
      j = 0;
    j <= e;
    j++
  )
    for (var l = 0; l <= d; l++) {
      var n = l / d,
        m = j / e;
      h.addElement(b * n - b * 0.5, 0, c * m - c * 0.5);
      i.addElement(0, 1, 0);
      k.addElement(n, 1 - m);
    }
  b = d + 1;
  for (j = 0; j < e; j++)
    for (l = 0; l < d; l++) {
      g.addTriangle((j + 0) * b + l, (j + 1) * b + l, (j + 0) * b + l + 1);
      g.addTriangle((j + 1) * b + l, (j + 1) * b + l + 1, (j + 0) * b + l + 1);
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
    for (var i = h / g, k = 0; k <= f; k++) e.addElement(1, 1, 1, i);
  return d.createShape(b, c);
};
o3djs.provide("o3djs.lineprimtives");
o3djs.lineprimitives = o3djs.lineprimitives || {};
o3djs.lineprimitives.LineVertexInfo = function () {
  o3djs.primitives.VertexInfoBase.call(this);
};
o3djs.base.inherit(
  o3djs.lineprimitives.LineVertexInfo,
  o3djs.primitives.VertexInfoBase
);
a = o3djs.lineprimitives.LineVertexInfo.prototype;
a.numLines = function () {
  return this.indices.length / 2;
};
a.addLine = function (b, c) {
  this.indices.push(b, c);
};
a.getLine = function (b) {
  b = b * 3;
  return [this.indices[b + 0], this.indices[b + 1], this.indices[b + 2]];
};
a.setLine = function (b, c, d) {
  b = b * 2;
  this.indices[b + 0] = c;
  this.indices[b + 1] = d;
};
a.createShape = function (b, c) {
  return this.createShapeByType(b, c, o3djs.base.o3d.Primitive.LINELIST);
};
o3djs.lineprimitives.createLineVertexInfo = function () {
  return new o3djs.lineprimitives.LineVertexInfo();
};
o3djs.lineprimitives.createLineCubeVertices = function (b, c) {
  b = b / 2;
  var d = [
    [-b, -b, -b],
    [+b, -b, -b],
    [-b, +b, -b],
    [+b, +b, -b],
    [-b, -b, +b],
    [+b, -b, +b],
    [-b, +b, +b],
    [+b, +b, +b],
  ];
  b = [
    [0, 1],
    [1, 3],
    [3, 2],
    [2, 0],
    [4, 5],
    [5, 7],
    [7, 6],
    [6, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  for (
    var e = o3djs.lineprimitives.createLineVertexInfo(),
      f = e.addStream(3, o3djs.base.o3d.Stream.POSITION),
      g = 0;
    g < d.length;
    ++g
  )
    f.addElementVector(d[g]);
  for (d = 0; d < b.length; ++d) e.addLine(b[d][0], b[d][1]);
  c && e.reorient(c);
  return e;
};
o3djs.lineprimitives.createLineCube = function (b, c, d, e) {
  d = o3djs.lineprimitives.createLineCubeVertices(d, e);
  return d.createShape(b, c);
};
o3djs.lineprimitives.createLineSphereVertices = function (b, c, d, e) {
  if (c <= 0 || d <= 0)
    throw Error("subdivisionAxis and subdivisionHeight must be > 0");
  for (
    var f = o3djs.lineprimitives.createLineVertexInfo(),
      g = f.addStream(3, o3djs.base.o3d.Stream.POSITION),
      h = 0;
    h <= d;
    h++
  )
    for (var i = 0; i <= c; i++) {
      var k = i / c,
        j = h / d;
      k = 2 * Math.PI * k;
      var l = Math.PI * j;
      j = Math.sin(k);
      var n = Math.cos(k);
      k = Math.sin(l);
      var m = Math.cos(l);
      l = n * k;
      n = m;
      j = j * k;
      g.addElement(b * l, b * n, b * j);
    }
  b = c + 1;
  for (i = 0; i < c; i++)
    for (h = 0; h < d; h++) {
      f.addLine((h + 0) * b + i, (h + 0) * b + i + 1);
      f.addLine((h + 0) * b + i, (h + 1) * b + i);
    }
  e && f.reorient(e);
  return f;
};
o3djs.lineprimitives.createLineSphere = function (b, c, d, e, f, g) {
  d = o3djs.lineprimitives.createLineSphereVertices(d, e, f, g);
  return d.createShape(b, c);
};
o3djs.lineprimitives.createLineRingVertices = function (b, c, d, e) {
  if (c < 3) throw Error("subdivisions must be >= 3");
  for (
    var f = o3djs.lineprimitives.createLineVertexInfo(),
      g = f.addStream(3, o3djs.base.o3d.Stream.POSITION),
      h = f.addStream(3, o3djs.base.o3d.Stream.NORMAL),
      i = f.addStream(1, o3djs.base.o3d.Stream.TEXCOORD, 0),
      k = 0;
    k <= c;
    k++
  ) {
    var j = (2 * Math.PI * k) / c;
    g.addElement(b * Math.cos(j), 0, b * Math.sin(j));
    h.addElement(Math.cos(j), 0, Math.sin(j));
    i.addElement((d * k) / c);
  }
  for (k = 0; k < c; k++) f.addLine(k, k + 1);
  e && f.reorient(e);
  return f;
};
o3djs.lineprimitives.createLineRing = function (b, c, d, e, f, g) {
  d = o3djs.lineprimitives.createLineRingVertices(d, e, f, g);
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
  var k = 1 / (c * c + g * g + h * h + i * i);
  return [
    (d * c - b * g - e * i + f * h) * k,
    (d * i - b * h + e * c - f * g) * k,
    (e * g + f * c - b * i - d * h) * k,
    (b * c + d * g + e * h + f * i) * k,
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
    k = c * d;
  c = c * e;
  var j = d * d;
  d = d * e;
  e = e * e;
  var l = b + i + j + e;
  return [
    [(b + i - j - e) / l, (2 * (f + k)) / l, (2 * (c - h)) / l, 0],
    [(2 * (k - f)) / l, (b - i + j - e) / l, (2 * (g + d)) / l, 0],
    [(2 * (h + c)) / l, (2 * (d - g)) / l, (b - i - j + e) / l, 0],
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
o3djs.rendergraph.createView = function (b, c, d, e, f, g, h, i, k) {
  return new o3djs.rendergraph.ViewInfo(b, c, d, e, f, g, h, i, k);
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
o3djs.rendergraph.ViewInfo = function (b, c, d, e, f, g, h, i, k) {
  var j = this;
  e = e || [0.5, 0.5, 0.5, 1];
  var l = f || 0;
  f = 0;
  var n = b.createObject("Viewport");
  if (g) n.viewport = g;
  n.priority = l;
  g = b.createObject("ClearBuffer");
  g.clearColor = e;
  g.priority = f++;
  g.parent = n;
  e = b.createObject("TreeTraversal");
  e.priority = f++;
  e.parent = n;
  e.transform = c;
  this.drawPassInfos_ = [];
  this.pack = b;
  this.renderGraphRoot = d;
  this.treeRoot = c;
  this.viewport = this.root = n;
  this.clearBuffer = g;
  this.drawContext = b = k || b.createObject("DrawContext");
  this.treeTraversal = e;
  this.priority = f;
  function m(o, r) {
    return j.createDrawPass(o, undefined, undefined, undefined, r);
  }
  h = m(o3djs.base.o3d.DrawList.BY_PERFORMANCE, h);
  b = h.state;
  i = m(o3djs.base.o3d.DrawList.BY_Z_ORDER, i);
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
  this.ownDrawContext_ = k ? false : true;
};
o3djs.rendergraph.ViewInfo.prototype.destroy = function (b) {
  if (b === undefined) b = true;
  for (var c = 0; c < this.drawPassInfos_.length; ++c)
    this.drawPassInfos_[c].destroy();
  this.pack.removeObject(this.viewport);
  this.pack.removeObject(this.clearBuffer);
  b && this.ownDrawContext_ && this.pack.removeObject(this.drawContext);
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
    this.drawPass.drawList = null;
    this.pack.removeObject(this.drawList);
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
  function h(i, k) {
    if (k) {
      i.destroy();
      f(c, d, k);
    } else {
      k = function (j, l, n) {
        i.destroy();
        f(j, l, n);
      };
      o3djs.serialization.deserializeArchive(i, "scene.json", b, c, d, k, g);
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
          for (var k = 0; k < g.length; ++k) {
            var j = g[k],
              l = h.createField(j.type, j.numComponents);
            i.push(l);
            f.addObject(j.id, l);
          }
          f = g[0];
          f = f.data.length / f.numComponents;
          h.allocateElements(f);
          for (k = 0; k < g.length; ++k) {
            j = g[k];
            i[k].setAt(0, j.data);
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
          var k = g.custom.fields[i],
            j = h.createField(k.type, k.numComponents);
          f.addObject(k.id, j);
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
      if ("o3d.negx_uri" in g.params) {
        for (
          var h = [
              "o3d.posx_uri",
              "o3d.negx_uri",
              "o3d.posy_uri",
              "o3d.negy_uri",
              "o3d.posz_uri",
              "o3d.negz_uri",
            ],
            i = [],
            k = 0;
          k < h.length;
          k++
        ) {
          var j = g.params[h[k]].value,
            l = f.archiveInfo.getFileByURI(j);
          if (!l) throw "Could not find texture " + j + " in the archive";
          i.push(l);
        }
        return o3djs.texture.createTextureFromRawDataArray(b, i, true, false);
      } else if ("o3d.uri" in g.params) {
        j = g.params["o3d.uri"].value;
        l = f.archiveInfo.getFileByURI(j);
        if (!l) throw "Could not find texture " + j + " in the archive";
        return o3djs.texture.createTextureFromRawData(b, l, true);
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
              k = o3djs.serialization.CURVE_KEY_TYPES.bezier,
              j = 0;
            j < h.length;
            ++j
          ) {
            var l = h[j];
            switch (l[0]) {
              case f:
                g.addStepKeys(l.slice(1));
                break;
              case i:
                g.addLinearKeys(l.slice(1));
                break;
              case k:
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
          var k = h.custom.vertexStreams[i],
            j = f.getObjectById(k.stream.field);
          g.setVertexStream(
            k.stream.semantic,
            k.stream.semanticIndex,
            j,
            k.stream.startIndex
          );
          if ("bind" in k) {
            j = f.getObjectById(k.bind);
            g.bindStream(j, k.stream.semantic, k.stream.semanticIndex);
          }
        }
    },
    "o3d.StreamBank": function (f, g, h) {
      if ("custom" in h)
        for (var i = 0; i < h.custom.vertexStreams.length; ++i) {
          var k = h.custom.vertexStreams[i],
            j = f.getObjectById(k.stream.field);
          g.setVertexStream(
            k.stream.semantic,
            k.stream.semanticIndex,
            j,
            k.stream.startIndex
          );
          if ("bind" in k) {
            j = f.getObjectById(k.bind);
            g.bindStream(j, k.stream.semantic, k.stream.semanticIndex);
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
          for (var k in f.params) {
            i = f.params[k];
            this.createAndIdentifyParam_(g, k, i);
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
            var k = f.params[i];
            this.setParamValue_(g, i, k);
          }
        else
          for (var j in f.params) {
            k = f.params[j];
            this.setParamValue_(g, j, k);
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
  function k() {
    var j = null,
      l = false,
      n = o3djs.error.createErrorCollector(b);
    try {
      l = !i.run(g);
    } catch (m) {
      l = true;
      j = m;
    }
    if (n.errors.length > 0) {
      l = true;
      j = n.errors.join("\n") + (j ? "\n" + j.toString() : "");
    }
    n.finish();
    if (l) {
      window.clearInterval(h);
      e(c, j);
    }
  }
  h = window.setInterval(k, 1000 / 60);
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
  b = function (j, l) {
    if (!l) {
      var n = j.getObjects("o3d.animSourceOwner", "o3d.ParamObject");
      if (n.length > 0) {
        if (h.opt_animSource) {
          var m = n[0].getParam("animSource");
          m = m.outputConnections;
          for (var o = 0; o < m.length; ++o) m[o].bind(h.opt_animSource);
        }
        for (o = 0; o < n.length; ++o) j.removeObject(n[o]);
      }
    }
    g(j, f, l);
  };
  if (h.opt_async) c.runBackground(d, e, 5, b);
  else {
    i = null;
    d = o3djs.error.createErrorCollector(d);
    try {
      c.run();
    } catch (k) {
      i = k;
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
    i = function (k, j, l) {
      var n = null;
      if (l) k.destroy();
      else n = new o3djs.simple.SimpleScene(h, b, k, j, f);
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
o3djs.texture.createTextureFromRawDataArray = function (b, c, d, e) {
  for (var f = [], g = 0; g < c.length; ++g)
    f = f.concat(b.createBitmapsFromRawData(c[g]));
  if (e || typeof e === "undefined")
    for (g = 0; g < f.length; ++g) {
      c = f[g];
      c.semantic == o3djs.base.o3d.Bitmap.IMAGE && f[g].flipVertically();
    }
  d = o3djs.texture.createTextureFromBitmaps(b, f, d);
  for (g = 0; g < f.length; ++g) b.removeObject(f[g]);
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
    k = h,
    j = e,
    l = f;
  if (
    (typeof d === "undefined" || d) &&
    o3djs.texture.canMakeMipsAndScale(g) &&
    h == 1 &&
    i > 1
  )
    k = i;
  for (d = 0; d < c.length; ++d) {
    var n = c[d];
    if (n.width != e || n.height != f || n.format != g || n.numMipmaps != h)
      throw "bitmaps must all be the same width, height, mips and format";
    k != h && n.generateMips(0, k - 1);
  }
  n.numMipmaps > 1 || o3djs.texture.computeNumLevels(j, l);
  var m;
  if (c.length == 6 && c[0].semantic != o3djs.base.o3d.Bitmap.SLICE) {
    if (e != f || e != j || f != l) throw "Cubemaps must be square";
    m = b.createTextureCUBE(j, g, k, false);
    for (d = 0; d < 6; ++d) m.setFromBitmap(d, c[d]);
  } else if (c.length == 1) {
    m = b.createTexture2D(j, l, g, k, false);
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
o3djs.util.REQUIRED_VERSION = "0.1.42.4";
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
    d = /.*version:\s*(\d+)\.(\d+)\.(\d+)\.(\d+).*/;
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
    h = function (k) {
      var j = "";
      if (k.length > 0) j = "<br/><br/><div>More Info:<br/>" + k + "</div>";
      return j;
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
    for (var i = null, k = 0; k < d.length; ++k) {
      var j = d[k],
        l = c;
      if (!l) l = (l = j.getAttribute("o3d_features")) ? l : "";
      l = o3djs.util.createClient(j, l);
      h.push(l);
      if (j.id === "o3d") i = l;
    }
    var n = window.setInterval(function () {
      for (var m = 0, o = "", r, s = 0; s < h.length; ++s) {
        var p = h[s];
        p =
          (r = p.o3d) &&
          p.client &&
          p.client.rendererInitStatus >
            o3djs.util.rendererInitStatus.UNINITIALIZED;
        if (!p) return;
        p = h[s].client.rendererInitStatus;
        if (p > m) {
          m = p;
          o = h[s].client.lastError;
        }
      }
      window.clearInterval(n);
      if (m > 0 && m != r.Renderer.SUCCESS) {
        for (s = 0; s < h.length; ++s) {
          r = h[s];
          r.parentNode.removeChild(r);
        }
        e(m, o, f, g);
      } else {
        o3djs.base.snapshotProvidedNamespaces();
        for (s = 0; s < h.length; ++s) {
          o3djs.base.initV8(h[s]);
          o3djs.event.startKeyboardEventSynthesis(h[s]);
          o3djs.error.setDefaultErrorHandler(h[s].client);
        }
        o3djs.base.init(h[0]);
        switch (o3djs.util.mainEngine_) {
          case o3djs.util.Engine.BROWSER:
            b(h);
            break;
          case o3djs.util.Engine.V8:
            if (!i)
              throw 'V8 engine was requested but there is no element with the id "o3d"';
            m = o3djs.util.getScriptTagText_();
            i.eval(m);
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
o3djs.require("o3djs.lineprimitives");
o3djs.require("o3djs.quaternions");
o3djs.require("o3djs.dump");
o3djs.require("o3djs.effect");
o3djs.require("o3djs.rendergraph");
o3djs.require("o3djs.serialization");
o3djs.require("o3djs.texture");
o3djs.require("o3djs.shape");
o3djs.require("o3djs.element");
o3djs.require("o3djs.canvas");
o3djs.require("o3djs.math");
o3djs.require("o3djs.camera");
o3djs.require("o3djs.scene");
o3djs.require("o3djs.picking");
o3djs.require("o3djs.material");
o3djs.require("o3djs.event");
o3djs.require("o3djs.io");
o3djs.require("o3djs.pack");
o3djs.require("o3djs.util");
