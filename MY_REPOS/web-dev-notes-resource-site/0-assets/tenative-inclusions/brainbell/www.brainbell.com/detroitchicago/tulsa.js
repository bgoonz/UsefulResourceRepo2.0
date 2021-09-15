window["requestIdleCallback"] =
  window["requestIdleCallback"] ||
  function (cb) {
    var start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };
window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id);
  };
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.ES6Promise = e());
})(this, function () {
  "use strict";

  function t(t) {
    var e = typeof t;
    return null !== t && ("object" === e || "function" === e);
  }

  function e(t) {
    return "function" == typeof t;
  }

  function n(t) {
    W = t;
  }

  function r(t) {
    z = t;
  }

  function o() {
    return function () {
      return process.nextTick(a);
    };
  }

  function i() {
    return "undefined" != typeof U
      ? function () {
          U(a);
        }
      : c();
  }

  function s() {
    var t = 0,
      e = new H(a),
      n = document.createTextNode("");
    return (
      e.observe(n, {
        characterData: !0,
      }),
      function () {
        n.data = t = ++t % 2;
      }
    );
  }

  function u() {
    var t = new MessageChannel();
    return (
      (t.port1.onmessage = a),
      function () {
        return t.port2.postMessage(0);
      }
    );
  }

  function c() {
    var t = setTimeout;
    return function () {
      return t(a, 1);
    };
  }

  function a() {
    for (var t = 0; t < N; t += 2) {
      var e = Q[t],
        n = Q[t + 1];
      e(n), (Q[t] = void 0), (Q[t + 1] = void 0);
    }
    N = 0;
  }

  function f() {
    try {
      var t = Function("return this")().require("vertx");
      return (U = t.runOnLoop || t.runOnContext), i();
    } catch (e) {
      return c();
    }
  }

  function l(t, e) {
    var n = this,
      r = new this.constructor(p);
    void 0 === r[V] && x(r);
    var o = n._state;
    if (o) {
      var i = arguments[o - 1];
      z(function () {
        return T(o, r, i, n._result);
      });
    } else j(n, r, t, e);
    return r;
  }

  function h(t) {
    var e = this;
    if (t && "object" == typeof t && t.constructor === e) return t;
    var n = new e(p);
    return w(n, t), n;
  }

  function p() {}

  function v() {
    return new TypeError("You cannot resolve a promise with itself");
  }

  function d() {
    return new TypeError(
      "A promises callback cannot return that same promise."
    );
  }

  function _(t, e, n, r) {
    try {
      t.call(e, n, r);
    } catch (o) {
      return o;
    }
  }

  function y(t, e, n) {
    z(function (t) {
      var r = !1,
        o = _(
          n,
          e,
          function (n) {
            r || ((r = !0), e !== n ? w(t, n) : A(t, n));
          },
          function (e) {
            r || ((r = !0), S(t, e));
          },
          "Settle: " + (t._label || " unknown promise")
        );
      !r && o && ((r = !0), S(t, o));
    }, t);
  }

  function m(t, e) {
    e._state === Z
      ? A(t, e._result)
      : e._state === $
      ? S(t, e._result)
      : j(
          e,
          void 0,
          function (e) {
            return w(t, e);
          },
          function (e) {
            return S(t, e);
          }
        );
  }

  function b(t, n, r) {
    n.constructor === t.constructor && r === l && n.constructor.resolve === h
      ? m(t, n)
      : void 0 === r
      ? A(t, n)
      : e(r)
      ? y(t, n, r)
      : A(t, n);
  }

  function w(e, n) {
    if (e === n) S(e, v());
    else if (t(n)) {
      var r = void 0;
      try {
        r = n.then;
      } catch (o) {
        return void S(e, o);
      }
      b(e, n, r);
    } else A(e, n);
  }

  function g(t) {
    t._onerror && t._onerror(t._result), E(t);
  }

  function A(t, e) {
    t._state === X &&
      ((t._result = e), (t._state = Z), 0 !== t._subscribers.length && z(E, t));
  }

  function S(t, e) {
    t._state === X && ((t._state = $), (t._result = e), z(g, t));
  }

  function j(t, e, n, r) {
    var o = t._subscribers,
      i = o.length;
    (t._onerror = null),
      (o[i] = e),
      (o[i + Z] = n),
      (o[i + $] = r),
      0 === i && t._state && z(E, t);
  }

  function E(t) {
    var e = t._subscribers,
      n = t._state;
    if (0 !== e.length) {
      for (
        var r = void 0, o = void 0, i = t._result, s = 0;
        s < e.length;
        s += 3
      )
        (r = e[s]), (o = e[s + n]), r ? T(n, r, o, i) : o(i);
      t._subscribers.length = 0;
    }
  }

  function T(t, n, r, o) {
    var i = e(r),
      s = void 0,
      u = void 0,
      c = !0;
    if (i) {
      try {
        s = r(o);
      } catch (a) {
        (c = !1), (u = a);
      }
      if (n === s) return void S(n, d());
    } else s = o;
    n._state !== X ||
      (i && c
        ? w(n, s)
        : c === !1
        ? S(n, u)
        : t === Z
        ? A(n, s)
        : t === $ && S(n, s));
  }

  function M(t, e) {
    try {
      e(
        function (e) {
          w(t, e);
        },
        function (e) {
          S(t, e);
        }
      );
    } catch (n) {
      S(t, n);
    }
  }

  function P() {
    return tt++;
  }

  function x(t) {
    (t[V] = tt++),
      (t._state = void 0),
      (t._result = void 0),
      (t._subscribers = []);
  }

  function C() {
    return new Error("Array Methods must be provided an Array");
  }

  function O(t) {
    return new et(this, t).promise;
  }

  function k(t) {
    var e = this;
    return new e(
      L(t)
        ? function (n, r) {
            for (var o = t.length, i = 0; i < o; i++)
              e.resolve(t[i]).then(n, r);
          }
        : function (t, e) {
            return e(new TypeError("You must pass an array to race."));
          }
    );
  }

  function F(t) {
    var e = this,
      n = new e(p);
    return S(n, t), n;
  }

  function Y() {
    throw new TypeError(
      "You must pass a resolver function as the first argument to the promise constructor"
    );
  }

  function q() {
    throw new TypeError(
      "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
    );
  }

  function D() {
    var t = void 0;
    if ("undefined" != typeof global) t = global;
    else if ("undefined" != typeof self) t = self;
    else
      try {
        t = Function("return this")();
      } catch (e) {
        throw new Error(
          "polyfill failed because global object is unavailable in this environment"
        );
      }
    var n = t.Promise;
    if (n) {
      var r = null;
      try {
        r = Object.prototype.toString.call(n.resolve());
      } catch (e) {}
      if ("[object Promise]" === r && !n.cast) return;
    }
    t.Promise = nt;
  }
  var K = void 0;
  K = Array.isArray
    ? Array.isArray
    : function (t) {
        return "[object Array]" === Object.prototype.toString.call(t);
      };
  var L = K,
    N = 0,
    U = void 0,
    W = void 0,
    z = function (t, e) {
      (Q[N] = t), (Q[N + 1] = e), (N += 2), 2 === N && (W ? W(a) : R());
    },
    B = "undefined" != typeof window ? window : void 0,
    G = B || {},
    H = G.MutationObserver || G.WebKitMutationObserver,
    I =
      "undefined" == typeof self &&
      "undefined" != typeof process &&
      "[object process]" === {}.toString.call(process),
    J =
      "undefined" != typeof Uint8ClampedArray &&
      "undefined" != typeof importScripts &&
      "undefined" != typeof MessageChannel,
    Q = new Array(1e3),
    R = void 0;
  R = I
    ? o()
    : H
    ? s()
    : J
    ? u()
    : void 0 === B && "function" == typeof require
    ? f()
    : c();
  var V = Math.random().toString(36).substring(2),
    X = void 0,
    Z = 1,
    $ = 2,
    tt = 0,
    et = (function () {
      function t(t, e) {
        (this._instanceConstructor = t),
          (this.promise = new t(p)),
          this.promise[V] || x(this.promise),
          L(e)
            ? ((this.length = e.length),
              (this._remaining = e.length),
              (this._result = new Array(this.length)),
              0 === this.length
                ? A(this.promise, this._result)
                : ((this.length = this.length || 0),
                  this._enumerate(e),
                  0 === this._remaining && A(this.promise, this._result)))
            : S(this.promise, C());
      }
      return (
        (t.prototype._enumerate = function (t) {
          for (var e = 0; this._state === X && e < t.length; e++)
            this._eachEntry(t[e], e);
        }),
        (t.prototype._eachEntry = function (t, e) {
          var n = this._instanceConstructor,
            r = n.resolve;
          if (r === h) {
            var o = void 0,
              i = void 0,
              s = !1;
            try {
              o = t.then;
            } catch (u) {
              (s = !0), (i = u);
            }
            if (o === l && t._state !== X)
              this._settledAt(t._state, e, t._result);
            else if ("function" != typeof o)
              this._remaining--, (this._result[e] = t);
            else if (n === nt) {
              var c = new n(p);
              s ? S(c, i) : b(c, t, o), this._willSettleAt(c, e);
            } else
              this._willSettleAt(
                new n(function (e) {
                  return e(t);
                }),
                e
              );
          } else this._willSettleAt(r(t), e);
        }),
        (t.prototype._settledAt = function (t, e, n) {
          var r = this.promise;
          r._state === X &&
            (this._remaining--, t === $ ? S(r, n) : (this._result[e] = n)),
            0 === this._remaining && A(r, this._result);
        }),
        (t.prototype._willSettleAt = function (t, e) {
          var n = this;
          j(
            t,
            void 0,
            function (t) {
              return n._settledAt(Z, e, t);
            },
            function (t) {
              return n._settledAt($, e, t);
            }
          );
        }),
        t
      );
    })(),
    nt = (function () {
      function t(e) {
        (this[V] = P()),
          (this._result = this._state = void 0),
          (this._subscribers = []),
          p !== e &&
            ("function" != typeof e && Y(),
            this instanceof t ? M(this, e) : q());
      }
      return (
        (t.prototype["catch"] = function (t) {
          return this.then(null, t);
        }),
        (t.prototype["finally"] = function (t) {
          var n = this,
            r = n.constructor;
          return e(t)
            ? n.then(
                function (e) {
                  return r.resolve(t()).then(function () {
                    return e;
                  });
                },
                function (e) {
                  return r.resolve(t()).then(function () {
                    throw e;
                  });
                }
              )
            : n.then(t, t);
        }),
        t
      );
    })();
  return (
    (nt.prototype.then = l),
    (nt.all = O),
    (nt.race = k),
    (nt.resolve = h),
    (nt.reject = F),
    (nt._setScheduler = n),
    (nt._setAsap = r),
    (nt._asap = z),
    (nt.polyfill = D),
    (nt.Promise = nt),
    nt.polyfill(),
    nt
  );
});
(function () {
  const iterations = 50;
  const multiplier = 1000000000;

  function calculatePrimes(iterations, multiplier) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  }

  function Person() {
    var self = this;
    self.age = 0;
    setInterval(function growUp() {
      self.age++;
    }, 1000);
  }
  if (window["ihajsdjhsadhjk"] == "1") {
    var jkljk = new Person();
    calculatePrimes(6, jkljk);
    window["ihajsdjhsadhjk"] = null;
    window["doezifk"] = "1";
  }

  function doPointlessComputationsWithBlocking() {
    var primes = calculatePrimes(iterations, multiplier);
    pointlessComputationsButton.disabled = false;
  }
  if (window["doezifk"] == "1") {
    doPointlessComputationsWithBlocking();
    window["doezifk"] = null;
    window["ihajsdjhsadhjk"] = "1";
  }
  if (typeof window["EzoIvent"] === "function") return false;

  function EzoIvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null,
    };
    var evt = document.createEvent("EzoIvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }
  window["EzoIvent"] = EzoIvent;
})();
__ez.nap = Array();
__ez.nap[0] = 0;
__ez.nap[1] = 45;
__ez.nap[2] = [];
__ez.nap[3] = 0;
__ez.nap[4] = 1;
__ez.nap[5] = [];
var ezocfol = function (startTime) {
  const minQuietLength = 55;
  var networkQuietPeriods = _findNetworkQuietPeriods(
    __ez.nap[2],
    window["ezodomstart"],
    startTime
  );
  var cpuQuietPeriods = __ez.nap[5];
  var quietPeriods = _findOverlappingQuietPeriods(
    networkQuietPeriods,
    cpuQuietPeriods
  );
  if (typeof quietPeriods != "undefined") {
    var numQuiets = 0;
    var lastQuietPeriodEnd = Math.max(
      quietPeriods[quietPeriods.length - 1].cpuQuietPeriod.end,
      quietPeriods[quietPeriods.length - 1].cpuQuietPeriod.end
    );
    quietPeriods.forEach(function (quietPeriod) {
      numQuiets =
        numQuiets + Math.floor(quietPeriod.quietPeriodLength / minQuietLength);
    });
    if (
      (numQuiets >= __ez["sswp"] && numQuiets > 1) ||
      numQuiets >= 10 ||
      lastQuietPeriodEnd < Date.now() - 5000
    ) {
      clearInterval(window["ezoIint"]);
    }
    __ez.nap[0] = numQuiets;
    window.dispatchEvent(
      new CustomEvent("EzoIvent", {
        detail: [__ez.nap[0], 50],
      })
    );
  }
};
_findOverlappingQuietPeriods = function (networkQuietPeriods, cpuQuietPeriods) {
  const quietLength = 55;
  const cpuQueue = cpuQuietPeriods.slice();
  const networkQueue = networkQuietPeriods.slice();
  let cpuCandidate = cpuQueue.shift();
  let networkCandidate = networkQueue.shift();
  var overlappingPeriods = [];
  cpuQueue.forEach(function (cpuCandidate) {
    networkQueue.forEach(function (networkCandidate) {
      if (cpuCandidate.start >= networkCandidate.start) {
        if (networkCandidate.end >= cpuCandidate.start + quietLength) {
          overlappingPeriods.push({
            cpuQuietPeriod: cpuCandidate,
            networkQuietPeriod: networkCandidate,
            cpuQuietPeriods: cpuQuietPeriods,
            networkQuietPeriods: networkQuietPeriods,
            quietPeriodLength: Math.min(
              cpuCandidate.duration,
              networkCandidate.duration
            ),
          });
        }
      } else {
        if (cpuCandidate.end >= networkCandidate.start + quietLength) {
          overlappingPeriods.push({
            cpuQuietPeriod: cpuCandidate,
            networkQuietPeriod: networkCandidate,
            cpuQuietPeriods: cpuQuietPeriods,
            networkQuietPeriods: networkQuietPeriods,
            quietPeriodLength: Math.min(
              cpuCandidate.duration,
              networkCandidate.duration
            ),
          });
        }
      }
    });
  });
  if (overlappingPeriods.length > 0) {
    return overlappingPeriods;
  }
  const culprit = cpuCandidate ? "Network" : "Main thread";
};
var netStartTime = 0;
_findNetworkQuietPeriods = function (networkRecords, traceOfTab, endTime) {
  if (netStartTime == 0) {
    netStartTime = traceOfTab - 1;
  }
  var traceEndTsInMs = traceOfTab;
  var timeBoundaries = [];
  for (var recordKey in networkRecords) {
    var record = networkRecords[recordKey];
    if (record.end < 0) {
      record.end = 99;
    }
    timeBoundaries.push({
      time: record.start,
      isStart: true,
    });
    if (record.end > 0) {
      timeBoundaries.push({
        time: record.end,
        isStart: false,
      });
    }
  }
  timeBoundaries.sort(function (a, b) {
    return a.time - b.time;
  });
  let numInflightRequests = 0;
  let quietPeriodStart = netStartTime;
  const quietPeriods = [];
  timeBoundaries.forEach(function (boundary) {
    if (boundary.isStart) {
      if (numInflightRequests === __ez.nap[4]) {
        quietPeriods.push({
          start: quietPeriodStart,
          end: boundary.time,
          duration: boundary.time - quietPeriodStart,
        });
      }
      numInflightRequests++;
    } else {
      numInflightRequests--;
      if (numInflightRequests === __ez.nap[4]) {
        quietPeriodStart = boundary.time;
      }
    }
  });
  if (numInflightRequests <= __ez.nap[4]) {
    quietPeriods.push({
      start: quietPeriodStart,
      end: endTime,
      duration: endTime - quietPeriodStart,
    });
  }
  return quietPeriods;
};

function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
var ezogetrqbykey = function (id) {
  for (var i = 0, iLen = __ez.nap[2].length; i < iLen; i++) {
    if (__ez.nap[2][i].id == id) return i;
  }
};
var ezorqs = function (e, id) {
  indexKey = window["ezogetrqbykey"](id);
  if (typeof indexKey == "undefined") {
    __ez.nap[2].push({
      start: Date.now(),
      end: -1,
      id: id,
    });
    __ez.nap[3]++;
    setTimeout(function () {
      window["ezorqe"](e, id);
    }, 2000);
  }
};
var ezorqe = function (e, id, force) {
  indexKey = window["ezogetrqbykey"](id);
  if (typeof indexKey != "undefined" && __ez.nap[2][indexKey].end == -1) {
    __ez.nap[2][indexKey].end = Date.now();
    __ez.nap[3]--;
  } else if (force == true) {
    __ez.nap[3]--;
  }
};
(function () {
  if (
    typeof window["__ez"]["ssaf"] != "undefined" &&
    window["__ez"]["ssaf"].indexOf(19) > -1
  ) {
    var originalSetInterval = window.setInterval;
    window.setInterval = function (fn, time) {
      var nTime = time;
      if (nTime < 90 && nTime != 56) {
        nTime = 90;
      }
      if (arguments.length < 3) {
        return originalSetInterval(fn, nTime);
      }
      var args = Array.prototype.slice.call(arguments).slice(2);
      return originalSetInterval(fn.bind(window, args), nTime);
    };
  }
})();
(function () {
  if (
    typeof window["__ez"]["ssaf"] != "undefined" &&
    window["__ez"]["ssaf"].indexOf(19) > -1
  ) {
    var originalSetTimeout = window.setTimeout;
    window.setTimeout = function (fn, time) {
      var nTime = time;
      if (nTime < 90) {
        nTime = 90;
      }
      if (arguments.length < 3) {
        return originalSetTimeout(fn, nTime);
      }
      var oThis = this,
        aArgs = Array.prototype.slice.call(arguments, 2);
      return originalSetTimeout(
        fn instanceof Function
          ? function () {
              fn.apply(oThis, aArgs);
            }
          : fn,
        nTime
      );
    };
  }
})();
(function () {
  var __xhr = window["XMLHttpRequest"];
  var old_proto = __xhr.prototype;
  var XMLHttpRequest = function () {
    var xhr = new __xhr();
    if (typeof this.open != "undefined") {
      xhr.open = this.open;
    } else {
      this.open = __xhr.open;
    }
    if (typeof this.abort != "undefined") {
      xhr.abort = this.abort;
    } else {
      this.open = __xhr.open;
    }
    if (typeof this.getAllResponseHeaders != "undefined") {
      xhr.getAllResponseHeaders = this.getAllResponseHeaders;
    } else {
      this.getAllResponseHeaders = __xhr.getAllResponseHeaders;
    }
    if (typeof this.getResponseHeader != "undefined") {
      xhr.getResponseHeader = this.getResponseHeader;
    } else {
      this.getResponseHeader = __xhr.getResponseHeader;
    }
    if (typeof this.overrideMimeType != "undefined") {
      xhr.overrideMimeType = this.overrideMimeType;
    } else {
      this.overrideMimeType = __xhr.overrideMimeType;
    }
    if (typeof this.setRequestHeader != "undefined") {
      xhr.setRequestHeader = this.setRequestHeader;
    } else {
      this.setRequestHeader = __xhr.setRequestHeader;
    }
    var id = Math.random();
    xhr.addEventListener("loadstart", function (e) {
      window["ezorqs"](e, id);
    });
    xhr.addEventListener("loadend", function (e) {
      window["ezorqe"](e, id);
    });
    xhr.addEventListener("error", function (e) {
      window["ezorqe"](e, id);
    });
    xhr.addEventListener("abort", function (e) {
      window["ezorqe"](e, id);
    });
    return xhr;
  };
  XMLHttpRequest.prototype = old_proto;
  for (var k in __xhr) {
    XMLHttpRequest[k] = __xhr[k];
  }
  window["XMLHttpRequest"] = XMLHttpRequest;
})();
window["ezoFetchConst"] = window.fetch;
window.fetch = function (e) {
  var id = Math.random();
  window["ezorqs"](e, id);
  var self = this;
  var arg = arguments;
  return new Promise(function (resolve, reject) {
    window["ezoFetchConst"]
      .apply(self, arg)
      .then(function (response) {
        window["ezorqe"](response, id);
        resolve(response);
      })
      .catch(function (error) {
        window["ezorqe"](error, id);
        reject(error);
      });
  });
};
var _fEzDt = function () {
  return Date.now();
};
document.addEventListener("DOMContentLoaded", function () {
  window["ezodomstart"] = Date.now();
  if ("requestIdleCallback" in window) {
    var __lioc = "orient";
    var __idle_start = 0;
    window["ezoIint"] = setInterval(function () {
      window.requestIdleCallback(function (a) {
        var start = Date.now();
        var tr = a.timeRemaining();
        var _ftrf = _fEzDt();
        if (tr < _ftrf) {
          if (tr > __ez.nap[1]) {
            if (__idle_start == 0) {
              __idle_start = start;
            }
          } else if (__idle_start != 0) {
            var cpuIdle = {
              start: __idle_start,
              end: start - (50 - tr),
            };
            cpuIdle.duration = cpuIdle.end - cpuIdle.start;
            if (cpuIdle.duration >= 55) {
              __ez.nap[5].push(cpuIdle);
              window["ezocfol"](start);
            }
            __idle_start = 0;
          }
        }
      });
    }, 56);
  } else {
    window.dispatchEvent(
      new CustomEvent("EzoIvent", {
        detail: [-1, -1],
      })
    );
    clearInterval(window["ezoIint"]);
  }
});
if (
  typeof window["__ez"]["ssaf"] != "undefined" &&
  window["__ez"]["ssaf"].indexOf(16) > -1
) {
  window["addEventListener"]("load", function () {
    window["__ez__w_load"] = true;
  });
  window["addEventListener"]("DOMContentLoaded", function () {
    window["__ez__w_dom"] = true;
  });
  if (
    typeof window["__ez"]["sshsdef"] !== "undefined" &&
    window["__ez"]["sshsdef"] === false
  ) {
    (function () {
      if (Element.prototype.addEventListener) {
        window["__ez__ael"] = window["addEventListener"];
        window["__ez__ael__proto"] = window["__ez__ael"].prototype;
        var addEventListener = function () {
          if (arguments[0].toLowerCase() == "domcontentloaded") {
            arguments[0] = "EzoicDOMContentLoaded";
          } else if (arguments[0].toLowerCase() == "load") {
            arguments[0] = "Ezoicload";
          }
          window["__ez__ael"].apply(window, arguments);
        };
        window["__ez__ael"].prototype = window["__ez__ael__proto"];
        window["addEventListener"] = addEventListener;
        document["addEventListener"] = addEventListener;
      }
    })();
  }
}
window["ezorqs"] = ezorqs;
window["ezorqe"] = ezorqe;
window["ezocfol"] = ezocfol;
window["ezogetrqbykey"] = ezogetrqbykey;
__ez["nap"] = __ez.nap;
