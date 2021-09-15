(function () {
  window.PARSELY = window.PARSELY || {};
  window.PARSELY.version = "2.0.0-rc.1";
  window.PARSELY.majorVersion = 2;
  window.PARSELY.hotfixName = "";
  window.PARSELY.flavor = "engagedtime-slots";
  window.PARSELY.__template_track_ips = true;
  window.PARSELY.__template_heartbeat_should_honor_autotrack = undefined;
  window.PARSELY.__template_limit_et_sample_len = false;
  window.PARSELY.__template_apikey = "medium.com";
  window.PARSELY.__template_is_first_party = false;
  window.PARSELY.__template_pixelhost = "";
  window.PARSELY.__template_customizations = null;
})();

/*! parsely-js-api - v2.0.0-rc.1 - 2021-03-10
 * http://www.parsely.com/
 * 2021 Parsely, Inc. */

function _typeof(e) {
  "@babel/helpers - typeof";
  return (_typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        })(e);
}
(window.PARSELY = window.PARSELY || {}),
  (function () {
    var e = function () {
      return function (e) {
        this !== window &&
          void 0 !== this &&
          (this.msgs.length >= 100 && (this.msgs = this.msgs.slice(0, 100)),
          this.msgs.push(e));
      };
    };
    PARSELY.console = { msgs: [], log: e(), dir: e() };
  })(),
  (function () {
    var e,
      t = PARSELY.console;
    try {
      e = document
        .getElementById("parsely-cfg")
        .getAttribute("data-parsely-site");
    } catch (r) {
      e = null;
    }
    var n =
        PARSELY.site || e || PARSELY.__template_apikey || "missing.parsely.com",
      i =
        document.location.protocol +
        "//" +
        (PARSELY.pixelhost || PARSELY.__template_pixelhost || "p1.parsely.com");
    (PARSELY.pInit = function (e) {
      if (e.error === undefined) {
        if (
          (t.log("Static configuration loaded"),
          "object" === _typeof(PARSELY.config))
        )
          for (var n in PARSELY.config)
            PARSELY.config.hasOwnProperty(n) && (e[n] = PARSELY.config[n]);
        (PARSELY.config = e),
          (PARSELY.urls = { static: null, config: null, pixel: i }),
          (PARSELY._sync = !0),
          (PARSELY.is_first_party = PARSELY.__template_is_first_party || !1);
      } else t.log("Unable to load static configuration");
    }),
      t.log("Loading configuration statically");
    var o = {
      apikey: n,
      uuid: null,
      network_uuid: null,
      apikey_uuid: null,
      settings: {
        debug: !1,
        widget: !1,
        tracker: !0,
        test: window._parselyIsTest || !1,
      },
      bundle: null,
      customizations: PARSELY.__template_customizations || null,
      track_ip_addresses: PARSELY.__template_track_ips || !0,
      heartbeat_should_honor_autotrack:
        PARSELY.__template_heartbeat_should_honor_autotrack || !1,
      limit_et_sample_len: PARSELY.__template_limit_et_sample_len || !1,
      is_remote_config: !1,
    };
    PARSELY.pInit(o);
  })(),
  "object" !== ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) &&
    (JSON = {}),
  (function () {
    "use strict";
    function e(e) {
      return e < 10 ? "0" + e : e;
    }
    function t() {
      return this.valueOf();
    }
    function n(e) {
      return (
        (r.lastIndex = 0),
        r.test(e)
          ? '"' +
            e.replace(r, function (e) {
              var t = u[e];
              return "string" == typeof t
                ? t
                : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + e + '"'
      );
    }
    function i(e, t) {
      var o,
        r,
        u,
        l,
        f,
        d = a,
        p = t[e];
      switch (
        (p &&
          "object" === _typeof(p) &&
          "function" == typeof p.toJSON &&
          (p = p.toJSON(e)),
        "function" == typeof c && (p = c.call(t, e, p)),
        _typeof(p))
      ) {
        case "string":
          return n(p);
        case "number":
          return isFinite(p) ? String(p) : "null";
        case "boolean":
        case "null":
          return String(p);
        case "object":
          if (!p) return "null";
          if (
            ((a += s),
            (f = []),
            "[object Array]" === Object.prototype.toString.apply(p))
          ) {
            for (l = p.length, o = 0; o < l; o += 1) f[o] = i(o, p) || "null";
            return (
              (u =
                0 === f.length
                  ? "[]"
                  : a
                  ? "[\n" + a + f.join(",\n" + a) + "\n" + d + "]"
                  : "[" + f.join(",") + "]"),
              (a = d),
              u
            );
          }
          if (c && "object" === _typeof(c))
            for (l = c.length, o = 0; o < l; o += 1)
              "string" == typeof c[o] &&
                (u = i((r = c[o]), p)) &&
                f.push(n(r) + (a ? ": " : ":") + u);
          else
            for (r in p)
              Object.prototype.hasOwnProperty.call(p, r) &&
                (u = i(r, p)) &&
                f.push(n(r) + (a ? ": " : ":") + u);
          return (
            (u =
              0 === f.length
                ? "{}"
                : a
                ? "{\n" + a + f.join(",\n" + a) + "\n" + d + "}"
                : "{" + f.join(",") + "}"),
            (a = d),
            u
          );
      }
    }
    window.PARSELY || (window.PARSELY = {});
    var o = window.PARSELY;
    o.JSON || (o.JSON = window.JSON || {});
    var r =
      /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function () {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              e(this.getUTCMonth() + 1) +
              "-" +
              e(this.getUTCDate()) +
              "T" +
              e(this.getUTCHours()) +
              ":" +
              e(this.getUTCMinutes()) +
              ":" +
              e(this.getUTCSeconds()) +
              "Z"
          : null;
      }),
      (Boolean.prototype.toJSON = t),
      (Number.prototype.toJSON = t),
      (String.prototype.toJSON = t));
    var a, s, u, c;
    "function" != typeof JSON.stringify &&
      ((u = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      }),
      (JSON.stringify = function (e, t, n) {
        var o;
        if (((a = ""), (s = ""), "number" == typeof n))
          for (o = 0; o < n; o += 1) s += " ";
        else "string" == typeof n && (s = n);
        if (
          ((c = t),
          t &&
            "function" != typeof t &&
            ("object" !== _typeof(t) || "number" != typeof t.length))
        )
          throw new Error("JSON.stringify");
        return i("", { "": e });
      })),
      "function" != typeof JSON.parse &&
        (JSON.parse = (function () {
          function e(e) {
            return e.replace(/\\(?:u(.{4})|([^u]))/g, function (e, t, n) {
              return t ? String.fromCharCode(parseInt(t, 16)) : a[n];
            });
          }
          var t,
            n,
            i,
            o,
            r,
            a = {
              "\\": "\\",
              '"': '"',
              "/": "/",
              t: "\t",
              n: "\n",
              r: "\r",
              f: "\f",
              b: "\b",
            },
            s = {
              go: function () {
                t = "ok";
              },
              firstokey: function () {
                (o = r), (t = "colon");
              },
              okey: function () {
                (o = r), (t = "colon");
              },
              ovalue: function () {
                t = "ocomma";
              },
              firstavalue: function () {
                t = "acomma";
              },
              avalue: function () {
                t = "acomma";
              },
            },
            u = {
              go: function () {
                t = "ok";
              },
              ovalue: function () {
                t = "ocomma";
              },
              firstavalue: function () {
                t = "acomma";
              },
              avalue: function () {
                t = "acomma";
              },
            },
            c = {
              "{": {
                go: function () {
                  n.push({ state: "ok" }), (i = {}), (t = "firstokey");
                },
                ovalue: function () {
                  n.push({ container: i, state: "ocomma", key: o }),
                    (i = {}),
                    (t = "firstokey");
                },
                firstavalue: function () {
                  n.push({ container: i, state: "acomma" }),
                    (i = {}),
                    (t = "firstokey");
                },
                avalue: function () {
                  n.push({ container: i, state: "acomma" }),
                    (i = {}),
                    (t = "firstokey");
                },
              },
              "}": {
                firstokey: function () {
                  var e = n.pop();
                  (r = i), (i = e.container), (o = e.key), (t = e.state);
                },
                ocomma: function () {
                  var e = n.pop();
                  (i[o] = r),
                    (r = i),
                    (i = e.container),
                    (o = e.key),
                    (t = e.state);
                },
              },
              "[": {
                go: function () {
                  n.push({ state: "ok" }), (i = []), (t = "firstavalue");
                },
                ovalue: function () {
                  n.push({ container: i, state: "ocomma", key: o }),
                    (i = []),
                    (t = "firstavalue");
                },
                firstavalue: function () {
                  n.push({ container: i, state: "acomma" }),
                    (i = []),
                    (t = "firstavalue");
                },
                avalue: function () {
                  n.push({ container: i, state: "acomma" }),
                    (i = []),
                    (t = "firstavalue");
                },
              },
              "]": {
                firstavalue: function () {
                  var e = n.pop();
                  (r = i), (i = e.container), (o = e.key), (t = e.state);
                },
                acomma: function () {
                  var e = n.pop();
                  i.push(r),
                    (r = i),
                    (i = e.container),
                    (o = e.key),
                    (t = e.state);
                },
              },
              ":": {
                colon: function () {
                  if (Object.hasOwnProperty.call(i, o))
                    throw new SyntaxError("Duplicate key '" + o + '"');
                  t = "ovalue";
                },
              },
              ",": {
                ocomma: function () {
                  (i[o] = r), (t = "okey");
                },
                acomma: function () {
                  i.push(r), (t = "avalue");
                },
              },
              true: {
                go: function () {
                  (r = !0), (t = "ok");
                },
                ovalue: function () {
                  (r = !0), (t = "ocomma");
                },
                firstavalue: function () {
                  (r = !0), (t = "acomma");
                },
                avalue: function () {
                  (r = !0), (t = "acomma");
                },
              },
              false: {
                go: function () {
                  (r = !1), (t = "ok");
                },
                ovalue: function () {
                  (r = !1), (t = "ocomma");
                },
                firstavalue: function () {
                  (r = !1), (t = "acomma");
                },
                avalue: function () {
                  (r = !1), (t = "acomma");
                },
              },
              null: {
                go: function () {
                  (r = null), (t = "ok");
                },
                ovalue: function () {
                  (r = null), (t = "ocomma");
                },
                firstavalue: function () {
                  (r = null), (t = "acomma");
                },
                avalue: function () {
                  (r = null), (t = "acomma");
                },
              },
            };
          return function (i, o) {
            var a,
              l =
                /^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;
            (t = "go"), (n = []);
            try {
              for (;;) {
                if (!(a = l.exec(i))) break;
                a[1]
                  ? c[a[1]][t]()
                  : a[2]
                  ? ((r = +a[2]), u[t]())
                  : ((r = e(a[3])), s[t]()),
                  (i = i.slice(a[0].length));
              }
            } catch (f) {
              t = f;
            }
            if ("ok" !== t || /[^\u0020\t\n\r]/.test(i))
              throw t instanceof SyntaxError ? t : new SyntaxError("JSON");
            return "function" == typeof o
              ? (function d(e, t) {
                  var n,
                    i,
                    a = e[t];
                  if (a && "object" === _typeof(a))
                    for (n in r)
                      Object.prototype.hasOwnProperty.call(a, n) &&
                        ((i = d(a, n)) !== undefined
                          ? (a[n] = i)
                          : delete a[n]);
                  return o.call(e, t, a);
                })({ "": r }, "")
              : r;
          };
        })());
  })(),
  (function () {
    this.PARSELY || (this.PARSELY = {});
    var e = this.PARSELY,
      t = !1,
      n = /xyz/.test(function () {
        xyz;
      })
        ? /\b_super\b/
        : /.*/;
    (e.Class = function () {}),
      (e.Class.extend = function (e) {
        function i() {
          !t && this.init && this.init.apply(this, arguments);
        }
        var o = this.prototype;
        t = !0;
        var r = new this();
        t = !1;
        for (var a in e)
          r[a] =
            "function" == typeof e[a] &&
            "function" == typeof o[a] &&
            n.test(e[a])
              ? (function (e, t) {
                  return function () {
                    var n = this._super;
                    this._super = o[e];
                    var i = t.apply(this, arguments);
                    return (this._super = n), i;
                  };
                })(a, e[a])
              : e[a];
        return (
          (i.prototype = r),
          (i.constructor = i),
          (i.extend = arguments.callee),
          i
        );
      });
  })(),
  (function (e, t) {
    "undefined" == typeof PARSELY && (PARSELY = {}),
      "object" ===
        ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
      "object" === _typeof(module.exports)
        ? ((module.exports = e.document
            ? t(e, !0)
            : function (e) {
                if (!e.document)
                  throw new Error("jQuery requires a window with a document");
                return t(e);
              }),
          (PARSELY.$ = PARSELY.jQuery = t(e, !0)))
        : (PARSELY.$ = PARSELY.jQuery = t(e, !1));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
      var t = e.length,
        n = v.type(e);
      return (
        "function" !== n &&
        !v.isWindow(e) &&
        (!(1 !== e.nodeType || !t) ||
          "array" === n ||
          0 === t ||
          ("number" == typeof t && t > 0 && t - 1 in e))
      );
    }
    function i(e) {
      var t;
      for (t in e)
        if (("data" !== t || !v.isEmptyObject(e[t])) && "toJSON" !== t)
          return !1;
      return !0;
    }
    function o(e, t, n, i) {
      if (v.acceptData(e)) {
        var o,
          r,
          a = v.expando,
          s = e.nodeType,
          u = s ? v.cache : e,
          l = s ? e[a] : e[a] && a;
        if (
          (l && u[l] && (i || u[l].data)) ||
          n !== undefined ||
          "string" != typeof t
        )
          return (
            l || (l = s ? (e[a] = c.pop() || v.guid++) : a),
            u[l] || (u[l] = s ? {} : { toJSON: v.noop }),
            ("object" !== _typeof(t) && "function" != typeof t) ||
              (i
                ? (u[l] = v.extend(u[l], t))
                : (u[l].data = v.extend(u[l].data, t))),
            (r = u[l]),
            i || (r.data || (r.data = {}), (r = r.data)),
            n !== undefined && (r[v.camelCase(t)] = n),
            "string" == typeof t
              ? null == (o = r[t]) && (o = r[v.camelCase(t)])
              : (o = r),
            o
          );
      }
    }
    function r() {
      return !0;
    }
    function a() {
      return !1;
    }
    function s() {
      try {
        return w.activeElement;
      } catch (e) {}
    }
    function u(e, t, n, i) {
      var o;
      if (v.isArray(t))
        v.each(t, function (t, o) {
          n || Y.test(e)
            ? i(e, o)
            : u(e + "[" + ("object" === _typeof(o) ? t : "") + "]", o, n, i);
        });
      else if (n || "object" !== v.type(t)) i(e, t);
      else for (o in t) u(e + "[" + o + "]", t[o], n, i);
    }
    var c = [],
      l = c.slice,
      f = (c.concat, c.push),
      d = (c.indexOf, {}),
      p = d.toString,
      g = d.hasOwnProperty,
      h = {},
      y =
        "1.11.1 -deprecated,-css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-dimensions,-offset,-ajax,-ajax/jsonp,-ajax/load,-ajax/parseJSON,-ajax/parseXML,-ajax/script,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl",
      v = function D(e, t) {
        return new D.fn.init(e, t);
      },
      m = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      _ = /^-ms-/,
      S = /-([\da-z])/gi,
      b = function (e, t) {
        return t.toUpperCase();
      };
    (v.fn = v.prototype =
      {
        jquery: y,
        constructor: v,
        selector: "",
        length: 0,
        toArray: function () {
          return l.call(this);
        },
        get: function (e) {
          return null != e
            ? e < 0
              ? this[e + this.length]
              : this[e]
            : l.call(this);
        },
        pushStack: function (e) {
          var t = v.merge(this.constructor(), e);
          return (t.prevObject = this), (t.context = this.context), t;
        },
        each: function (e, t) {
          return v.each(this, e, t);
        },
        map: function (e) {
          return this.pushStack(
            v.map(this, function (t, n) {
              return e.call(t, n, t);
            })
          );
        },
        slice: function () {
          return this.pushStack(l.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (e) {
          var t = this.length,
            n = +e + (e < 0 ? t : 0);
          return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor(null);
        },
        push: f,
        sort: c.sort,
        splice: c.splice,
      }),
      (v.extend = v.fn.extend =
        function () {
          var e,
            t,
            n,
            i,
            o,
            r,
            a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            c = !1;
          for (
            "boolean" == typeof a && ((c = a), (a = arguments[s] || {}), s++),
              "object" === _typeof(a) || v.isFunction(a) || (a = {}),
              s === u && ((a = this), s--);
            s < u;
            s++
          )
            if (null != (o = arguments[s]))
              for (i in o)
                (e = a[i]),
                  a !== (n = o[i]) &&
                    (c && n && (v.isPlainObject(n) || (t = v.isArray(n)))
                      ? (t
                          ? ((t = !1), (r = e && v.isArray(e) ? e : []))
                          : (r = e && v.isPlainObject(e) ? e : {}),
                        (a[i] = v.extend(c, r, n)))
                      : n !== undefined && (a[i] = n));
          return a;
        }),
      v.extend({
        expando: "jQuery" + (y + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw new Error(e);
        },
        noop: function () {},
        isFunction: function (e) {
          return "function" === v.type(e);
        },
        isArray:
          Array.isArray ||
          function (e) {
            return "array" === v.type(e);
          },
        isWindow: function (e) {
          return null != e && e == e.window;
        },
        isNumeric: function (e) {
          return !v.isArray(e) && e - parseFloat(e) >= 0;
        },
        isEmptyObject: function (e) {
          var t;
          for (t in e) return !1;
          return !0;
        },
        isPlainObject: function (e) {
          var t;
          if (!e || "object" !== v.type(e) || e.nodeType || v.isWindow(e))
            return !1;
          try {
            if (
              e.constructor &&
              !g.call(e, "constructor") &&
              !g.call(e.constructor.prototype, "isPrototypeOf")
            )
              return !1;
          } catch (n) {
            return !1;
          }
          if (h.ownLast) for (t in e) return g.call(e, t);
          for (t in e);
          return t === undefined || g.call(e, t);
        },
        type: function (e) {
          return null == e
            ? e + ""
            : "object" === _typeof(e) || "function" == typeof e
            ? d[p.call(e)] || "object"
            : _typeof(e);
        },
        camelCase: function (e) {
          return e.replace(_, "ms-").replace(S, b);
        },
        nodeName: function (e, t) {
          return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function (e, t, i) {
          var o = 0,
            r = e.length,
            a = n(e);
          if (i) {
            if (a) for (; o < r && !1 !== t.apply(e[o], i); o++);
            else for (o in e) if (!1 === t.apply(e[o], i)) break;
          } else if (a) for (; o < r && !1 !== t.call(e[o], o, e[o]); o++);
          else for (o in e) if (!1 === t.call(e[o], o, e[o])) break;
          return e;
        },
        trim: function (e) {
          return null == e ? "" : (e + "").replace(m, "");
        },
        makeArray: function (e, t) {
          var i = t || [];
          return (
            null != e &&
              (n(Object(e))
                ? v.merge(i, "string" == typeof e ? [e] : e)
                : f.call(i, e)),
            i
          );
        },
        guid: 1,
        now: function () {
          return +new Date();
        },
        support: h,
      }),
      v.each(
        "Boolean Number String Function Array Date RegExp Object Error".split(
          " "
        ),
        function (e, t) {
          d["[object " + t + "]"] = t.toLowerCase();
        }
      );
    var E,
      x = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      w = e.document,
      k = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    ((v.fn.init = function (e, t) {
      var n, i;
      if (!e) return this;
      if ("string" == typeof e) {
        if (
          (n =
            "<" === e.charAt(0) &&
            ">" === e.charAt(e.length - 1) &&
            e.length >= 3
              ? [null, e, null]
              : k.exec(e)) &&
          (n[1] || !t)
        ) {
          if (n[1]) {
            if (
              ((t = t instanceof v ? t[0] : t),
              v.merge(
                this,
                v.parseHTML(
                  n[1],
                  t && t.nodeType ? t.ownerDocument || t : w,
                  !0
                )
              ),
              x.test(n[1]) && v.isPlainObject(t))
            )
              for (n in t)
                v.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
            return this;
          }
          return (
            (i = w.getElementById(n[2])) &&
              i.parentNode &&
              ((this.length = 1), (this[0] = i)),
            (this.context = w),
            (this.selector = e),
            this
          );
        }
      } else {
        if (e.nodeType)
          return (this.context = this[0] = e), (this.length = 1), this;
        if (v.isFunction(e))
          return "undefined" != typeof E.ready ? E.ready(e) : e(v);
      }
      return (
        e.selector !== undefined &&
          ((this.selector = e.selector), (this.context = e.context)),
        v.makeArray(e, this)
      );
    }).prototype = v.fn),
      (E = v(w));
    var P,
      A = /\S+/g,
      R = "undefined" == typeof undefined ? "undefined" : _typeof(undefined);
    for (P in v(h)) break;
    (h.ownLast = "0" !== P),
      (v.acceptData = function (e) {
        var t = v.noData[(e.nodeName + " ").toLowerCase()],
          n = +e.nodeType || 1;
        return (
          (1 === n || 9 === n) &&
          (!t || (!0 !== t && e.getAttribute("classid") === t))
        );
      });
    v.extend({
      cache: {},
      noData: {
        "applet ": !0,
        "embed ": !0,
        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      },
      hasData: function (e) {
        return (
          !!(e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando]) && !i(e)
        );
      },
      data: function (e, t, n) {
        return o(e, t, n);
      },
      _data: function (e, t, n) {
        return o(e, t, n, !0);
      },
    });
    !(function () {
      var t,
        n,
        i = w.createElement("div");
      for (t in { submit: !0, change: !0, focusin: !0 })
        (n = "on" + t),
          (h[t + "Bubbles"] = n in e) ||
            (i.setAttribute(n, "t"),
            (h[t + "Bubbles"] = !1 === i.attributes[n].expando));
      i = null;
    })();
    var L = /^key/,
      C = /^(?:mouse|pointer|contextmenu)|click/,
      T = /^(?:focusinfocus|focusoutblur)$/,
      O = /^([^.]*)(?:\.(.+)|)$/;
    (v.event = {
      global: {},
      add: function (e, t, n, i, o) {
        var r,
          a,
          s,
          u,
          c,
          l,
          f,
          d,
          p,
          g,
          h,
          y = v._data(e);
        if (y) {
          for (
            n.handler && ((n = (u = n).handler), (o = u.selector)),
              n.guid || (n.guid = v.guid++),
              (a = y.events) || (a = y.events = {}),
              (l = y.handle) ||
                ((l = y.handle =
                  function (e) {
                    return _typeof(v) === R ||
                      (e && v.event.triggered === e.type)
                      ? undefined
                      : v.event.dispatch.apply(l.elem, arguments);
                  }).elem = e),
              s = (t = (t || "").match(A) || [""]).length;
            s--;

          )
            (p = h = (r = O.exec(t[s]) || [])[1]),
              (g = (r[2] || "").split(".").sort()),
              p &&
                ((c = v.event.special[p] || {}),
                (p = (o ? c.delegateType : c.bindType) || p),
                (c = v.event.special[p] || {}),
                (f = v.extend(
                  {
                    type: p,
                    origType: h,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && v.expr.match.needsContext.test(o),
                    namespace: g.join("."),
                  },
                  u
                )),
                (d = a[p]) ||
                  (((d = a[p] = []).delegateCount = 0),
                  (c.setup && !1 !== c.setup.call(e, i, g, l)) ||
                    (e.addEventListener
                      ? e.addEventListener(p, l, !1)
                      : e.attachEvent && e.attachEvent("on" + p, l))),
                c.add &&
                  (c.add.call(e, f),
                  f.handler.guid || (f.handler.guid = n.guid)),
                o ? d.splice(d.delegateCount++, 0, f) : d.push(f),
                (v.event.global[p] = !0));
          e = null;
        }
      },
      trigger: function (t, n, i, o) {
        var r,
          a,
          s,
          u,
          c,
          l,
          f,
          d = [i || w],
          p = g.call(t, "type") ? t.type : t,
          h = g.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((s = l = i = i || w),
          3 !== i.nodeType &&
            8 !== i.nodeType &&
            !T.test(p + v.event.triggered) &&
            (p.indexOf(".") >= 0 &&
              ((p = (h = p.split(".")).shift()), h.sort()),
            (a = p.indexOf(":") < 0 && "on" + p),
            (t = t[v.expando]
              ? t
              : new v.Event(p, "object" === _typeof(t) && t)),
            (t.isTrigger = o ? 2 : 3),
            (t.namespace = h.join(".")),
            (t.namespace_re = t.namespace
              ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = undefined),
            t.target || (t.target = i),
            (n = null == n ? [t] : v.makeArray(n, [t])),
            (c = v.event.special[p] || {}),
            o || !c.trigger || !1 !== c.trigger.apply(i, n)))
        ) {
          if (!o && !c.noBubble && !v.isWindow(i)) {
            for (
              u = c.delegateType || p, T.test(u + p) || (s = s.parentNode);
              s;
              s = s.parentNode
            )
              d.push(s), (l = s);
            l === (i.ownerDocument || w) &&
              d.push(l.defaultView || l.parentWindow || e);
          }
          for (f = 0; (s = d[f++]) && !t.isPropagationStopped(); )
            (t.type = f > 1 ? u : c.bindType || p),
              (r =
                (v._data(s, "events") || {})[t.type] && v._data(s, "handle")) &&
                r.apply(s, n),
              (r = a && s[a]) &&
                r.apply &&
                v.acceptData(s) &&
                ((t.result = r.apply(s, n)),
                !1 === t.result && t.preventDefault());
          if (
            ((t.type = p),
            !o &&
              !t.isDefaultPrevented() &&
              (!c._default || !1 === c._default.apply(d.pop(), n)) &&
              v.acceptData(i) &&
              a &&
              i[p] &&
              !v.isWindow(i))
          ) {
            (l = i[a]) && (i[a] = null), (v.event.triggered = p);
            try {
              i[p]();
            } catch (y) {}
            (v.event.triggered = undefined), l && (i[a] = l);
          }
          return t.result;
        }
      },
      dispatch: function (e) {
        e = v.event.fix(e);
        var t,
          n,
          i,
          o,
          r,
          a = [],
          s = l.call(arguments),
          u = (v._data(this, "events") || {})[e.type] || [],
          c = v.event.special[e.type] || {};
        if (
          ((s[0] = e),
          (e.delegateTarget = this),
          !c.preDispatch || !1 !== c.preDispatch.call(this, e))
        ) {
          for (
            a = v.event.handlers.call(this, e, u), t = 0;
            (o = a[t++]) && !e.isPropagationStopped();

          )
            for (
              e.currentTarget = o.elem, r = 0;
              (i = o.handlers[r++]) && !e.isImmediatePropagationStopped();

            )
              (e.namespace_re && !e.namespace_re.test(i.namespace)) ||
                ((e.handleObj = i),
                (e.data = i.data),
                (n = (
                  (v.event.special[i.origType] || {}).handle || i.handler
                ).apply(o.elem, s)) !== undefined &&
                  !1 === (e.result = n) &&
                  (e.preventDefault(), e.stopPropagation()));
          return c.postDispatch && c.postDispatch.call(this, e), e.result;
        }
      },
      handlers: function (e, t) {
        var n,
          i,
          o,
          r,
          a = [],
          s = t.delegateCount,
          u = e.target;
        if (s && u.nodeType && (!e.button || "click" !== e.type))
          for (; u != this; u = u.parentNode || this)
            if (1 === u.nodeType && (!0 !== u.disabled || "click" !== e.type)) {
              for (o = [], r = 0; r < s; r++)
                o[(n = (i = t[r]).selector + " ")] === undefined &&
                  (o[n] = i.needsContext
                    ? v(n, this).index(u) >= 0
                    : v.find(n, this, null, [u]).length),
                  o[n] && o.push(i);
              o.length && a.push({ elem: u, handlers: o });
            }
        return s < t.length && a.push({ elem: this, handlers: t.slice(s) }), a;
      },
      fix: function (e) {
        if (e[v.expando]) return e;
        var t,
          n,
          i,
          o = e.type,
          r = e,
          a = this.fixHooks[o];
        for (
          a ||
            (this.fixHooks[o] = a =
              C.test(o) ? this.mouseHooks : L.test(o) ? this.keyHooks : {}),
            i = a.props ? this.props.concat(a.props) : this.props,
            e = new v.Event(r),
            t = i.length;
          t--;

        )
          e[(n = i[t])] = r[n];
        return (
          e.target || (e.target = r.srcElement || w),
          3 === e.target.nodeType && (e.target = e.target.parentNode),
          (e.metaKey = !!e.metaKey),
          a.filter ? a.filter(e, r) : e
        );
      },
      props:
        "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
          " "
        ),
      fixHooks: {},
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== s() && this.focus)
              try {
                return this.focus(), !1;
              } catch (e) {}
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            if (this === s() && this.blur) return this.blur(), !1;
          },
          delegateType: "focusout",
        },
      },
    }),
      (v.Event = function (e, t) {
        if (!(this instanceof v.Event)) return new v.Event(e, t);
        e && e.type
          ? ((this.originalEvent = e),
            (this.type = e.type),
            (this.isDefaultPrevented =
              e.defaultPrevented ||
              (e.defaultPrevented === undefined && !1 === e.returnValue)
                ? r
                : a))
          : (this.type = e),
          t && v.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || v.now()),
          (this[v.expando] = !0);
      }),
      (v.Event.prototype = {
        isDefaultPrevented: a,
        isPropagationStopped: a,
        isImmediatePropagationStopped: a,
        stopPropagation: function () {
          var e = this.originalEvent;
          (this.isPropagationStopped = r),
            e &&
              (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          (this.isImmediatePropagationStopped = r),
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      v.fn.extend({
        on: function (e, t, n, i, o) {
          var r, s;
          if ("object" === _typeof(e)) {
            "string" != typeof t && ((n = n || t), (t = undefined));
            for (r in e) this.on(r, t, n, e[r], o);
            return this;
          }
          if (
            (null == n && null == i
              ? ((i = t), (n = t = undefined))
              : null == i &&
                ("string" == typeof t
                  ? ((i = n), (n = undefined))
                  : ((i = n), (n = t), (t = undefined))),
            !1 === i)
          )
            i = a;
          else if (!i) return this;
          return (
            1 === o &&
              ((s = i),
              ((i = function (e) {
                return v().off(e), s.apply(this, arguments);
              }).guid = s.guid || (s.guid = v.guid++))),
            this.each(function () {
              v.event.add(this, e, i, n, t);
            })
          );
        },
        trigger: function (e, t) {
          return this.each(function () {
            v.event.trigger(e, t, this);
          });
        },
        triggerHandler: function (e, t) {
          var n = this[0];
          if (n) return v.event.trigger(e, t, n, !0);
        },
      });
    h.getSetAttribute, h.input;
    v.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
        " "
      ),
      function (e, t) {
        v.fn[t] = function (e, n) {
          return arguments.length > 0
            ? this.on(t, null, e, n)
            : this.trigger(t);
        };
      }
    );
    var N = /%20/g,
      Y = /\[\]$/;
    v.param = function (e, t) {
      var n,
        i = [],
        o = function (e, t) {
          (t = v.isFunction(t) ? t() : null == t ? "" : t),
            (i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
        };
      if (
        (t === undefined && (t = v.ajaxSettings && v.ajaxSettings.traditional),
        v.isArray(e) || (e.jquery && !v.isPlainObject(e)))
      )
        v.each(e, function () {
          o(this.name, this.value);
        });
      else for (n in e) u(n, e[n], t, o);
      return i.join("&").replace(N, "+");
    };
    var j = e.jQuery,
      I = e.$;
    return (
      (v.noConflict = function (t) {
        return e.$ === v && (e.$ = I), t && e.jQuery === v && (e.jQuery = j), v;
      }),
      _typeof(t) === R && (e.jQuery = e.$ = v),
      v
    );
  }),
  "undefined" == typeof window.PARSELY && (window.PARSELY = {}),
  (function (e, t) {
    window.PARSELY._lifecycle = t();
  })(0, function () {
    "use strict";
    var e = void 0;
    try {
      new EventTarget(), (e = !1);
    } catch (t) {
      e = !1;
    }
    var t =
        "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator)
          ? function (e) {
              return _typeof(e);
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : _typeof(e);
            },
      n = function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      },
      i = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, i.key, i);
          }
        }
        return function (t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t;
        };
      })(),
      o = function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              _typeof(t)
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      },
      r = function (e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ("object" != _typeof(t) && "function" != typeof t) ? e : t;
      },
      a = (function () {
        function e() {
          n(this, e), (this._registry = {});
        }
        return (
          i(e, [
            {
              key: "addEventListener",
              value: function (e, t) {
                this._getRegistry(e).push(t);
              },
            },
            {
              key: "removeEventListener",
              value: function (e, t) {
                var n = this._getRegistry(e),
                  i = n.indexOf(t);
                i > -1 && n.splice(i, 1);
              },
            },
            {
              key: "dispatchEvent",
              value: function (e) {
                return (
                  (e.target = this),
                  Object.freeze(e),
                  this._getRegistry(e.type).forEach(function (t) {
                    return t(e);
                  }),
                  !0
                );
              },
            },
            {
              key: "_getRegistry",
              value: function (e) {
                return (this._registry[e] = this._registry[e] || []);
              },
            },
          ]),
          e
        );
      })(),
      s = e ? EventTarget : a,
      u = e
        ? Event
        : function S(e) {
            n(this, S), (this.type = e);
          },
      c = (function (e) {
        function t(e, i) {
          n(this, t);
          var o = r(
            this,
            (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
          );
          return (
            (o.newState = i.newState),
            (o.oldState = i.oldState),
            (o.originalEvent = i.originalEvent),
            o
          );
        }
        return o(t, u), t;
      })(),
      l = "active",
      f = "passive",
      d = "hidden",
      p = "frozen",
      g = "terminated",
      h =
        "object" === ("undefined" == typeof safari ? "undefined" : t(safari)) &&
        safari.pushNotification,
      y = [
        "focus",
        "blur",
        "visibilitychange",
        "freeze",
        "resume",
        "pageshow",
        "onpageshow" in self ? "pagehide" : "unload",
      ],
      v = function (e) {
        return e.preventDefault(), (e.returnValue = "Are you sure?");
      },
      m = [
        [l, f, d, g],
        [l, f, d, p],
        [d, f, l],
        [p, d],
        [p, l],
        [p, f],
      ].map(function (e) {
        return e.reduce(function (e, t, n) {
          return (e[t] = n), e;
        }, {});
      }),
      _ = function () {
        return document.visibilityState === d ? d : document.hasFocus() ? l : f;
      };
    return new ((function (e) {
      function t() {
        n(this, t);
        var e = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this)),
          i = _();
        return (
          (e._state = i),
          (e._unsavedChanges = []),
          (e._handleEvents = e._handleEvents.bind(e)),
          y.forEach(function (t) {
            return addEventListener(t, e._handleEvents, !0);
          }),
          h &&
            addEventListener("beforeunload", function (t) {
              e._safariBeforeUnloadTimeout = setTimeout(function () {
                t.defaultPrevented ||
                  t.returnValue.length > 0 ||
                  e._dispatchChangesIfNeeded(t, d);
              }, 0);
            }),
          e
        );
      }
      return (
        o(t, s),
        i(t, [
          {
            key: "addUnsavedChanges",
            value: function (e) {
              !this._unsavedChanges.indexOf(e) > -1 &&
                (0 === this._unsavedChanges.length &&
                  addEventListener("beforeunload", v),
                this._unsavedChanges.push(e));
            },
          },
          {
            key: "removeUnsavedChanges",
            value: function (e) {
              var t = this._unsavedChanges.indexOf(e);
              t > -1 &&
                (this._unsavedChanges.splice(t, 1),
                0 === this._unsavedChanges.length &&
                  removeEventListener("beforeunload", v));
            },
          },
          {
            key: "_dispatchChangesIfNeeded",
            value: function (e, t) {
              if (t !== this._state)
                for (
                  var n = (function (e, t) {
                      for (var n, i = 0; (n = m[i]); ++i) {
                        var o = n[e],
                          r = n[t];
                        if (o >= 0 && r >= 0 && r > o)
                          return Object.keys(n).slice(o, r + 1);
                      }
                      return [];
                    })(this._state, t),
                    i = 0;
                  i < n.length - 1;
                  ++i
                ) {
                  var o = n[i],
                    r = n[i + 1];
                  (this._state = r),
                    this.dispatchEvent(
                      new c("statechange", {
                        oldState: o,
                        newState: r,
                        originalEvent: e,
                      })
                    );
                }
            },
          },
          {
            key: "_handleEvents",
            value: function (e) {
              switch (
                (h && clearTimeout(this._safariBeforeUnloadTimeout), e.type)
              ) {
                case "pageshow":
                case "resume":
                  this._dispatchChangesIfNeeded(e, _());
                  break;
                case "focus":
                  this._dispatchChangesIfNeeded(e, l);
                  break;
                case "blur":
                  this._state === l && this._dispatchChangesIfNeeded(e, _());
                  break;
                case "pagehide":
                case "unload":
                  this._dispatchChangesIfNeeded(e, e.persisted ? p : g);
                  break;
                case "visibilitychange":
                  this._state !== p &&
                    this._state !== g &&
                    this._dispatchChangesIfNeeded(e, _());
                  break;
                case "freeze":
                  this._dispatchChangesIfNeeded(e, p);
              }
            },
          },
          {
            key: "state",
            get: function () {
              return this._state;
            },
          },
          {
            key: "pageWasDiscarded",
            get: function () {
              return document.wasDiscarded || !1;
            },
          },
        ]),
        t
      );
    })())();
  }),
  (function () {
    this.PARSELY = this.PARSELY || {};
    var e,
      t = this.PARSELY;
    (t.util = {}),
      ((e = t.util).getWindow = function () {
        if (t.getWindow && "function" == typeof t.getWindow)
          return t.getWindow();
        try {
          return window.top.document.cookie, window.top;
        } catch (e) {
          try {
            return window.parent.document.cookie, window.parent;
          } catch (n) {
            return window;
          }
        }
      }),
      (e.windowSetFunction = function (t, n) {
        var i = e.getWindow(),
          o = i[t];
        i[t] = function () {
          n(), "function" == typeof o && o();
        };
      }),
      (e.windowAddEventListener = function (e, t) {
        var n = !1;
        try {
          addEventListener(
            "test",
            null,
            Object.defineProperty({}, "passive", {
              get: function () {
                n = !0;
              },
            })
          );
        } catch (o) {}
        var i = !1;
        return (
          n && (i = { passive: !0, capture: !1 }),
          "undefined" != typeof window.addEventListener
            ? window.addEventListener(e, t, i)
            : "undefined" != typeof document.attachEvent &&
              document.attachEvent("on" + e, t)
        );
      }),
      (e.objAddEventListener = function (e, t, n, i) {
        return (
          (i = void 0 !== i && i),
          "undefined" != typeof e.addEventListener
            ? e.addEventListener(t, n, i)
            : "undefined" != typeof e.attachEvent && e.attachEvent("on" + t, n)
        );
      }),
      (e.getRandomInt = function (e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e;
      }),
      (e.getEventUrl = function () {
        return t.config.eventUrl
          ? t.config.eventUrl
          : t.lastRequest
          ? t.lastRequest.url
          : e.getWindow().location.href;
      }),
      (e.isSafari = function () {
        return (
          navigator.vendor &&
          navigator.vendor.indexOf("Apple") > -1 &&
          navigator.userAgent &&
          -1 === navigator.userAgent.indexOf("CriOS") &&
          -1 === navigator.userAgent.indexOf("FxiOS")
        );
      }),
      (e.isFirefox = function () {
        return "undefined" != typeof InstallTrigger;
      }),
      (e.makeUUID = function () {
        return "pid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(
          /x/g,
          function () {
            return ((16 * Math.random()) | 0).toString(16);
          }
        );
      }),
      (e.now = function () {
        return "undefined" != typeof performance &&
          "function" == typeof performance.now
          ? Math.round(performance.timing.navigationStart + performance.now())
          : new Date().getTime();
      });
  })(),
  (function (e) {
    "use strict";
    e.Cookies = (function (t) {
      var n = function i(e, t, n) {
        return 1 === arguments.length ? i.get(e) : i.set(e, t, n);
      };
      return (
        (n._document = t.document),
        (n._cacheKeyPrefix = "cookey."),
        (n._maxExpireDate = new Date("Fri, 31 Dec 9999 23:59:59 UTC")),
        (n.defaults = { path: "/", secure: !1 }),
        (n.get = function (e) {
          return n._renewCache(), n._cache[n._cacheKeyPrefix + e];
        }),
        (n.getJSON = function (t) {
          var i = n.get(t);
          return i === undefined ? i : e.JSON.parse(i);
        }),
        (n.set = function (t, i, o) {
          (o = n._getExtendedOptions(o)).expires = n._getExpiresDate(
            i === undefined ? -1 : o.expires
          );
          try {
            n._document.cookie = n._generateCookieString(t, i, o);
          } catch (r) {
            e.console.log(r);
          }
          return n;
        }),
        (n.setJSON = function (t, i, o) {
          return n.set(t, e.JSON.stringify(i), o), n;
        }),
        (n.extendExpiry = function (e, t) {
          var i = n.get(e);
          if (i === undefined) return !1;
          n.set(e, i, t);
        }),
        (n.expire = function (e, t) {
          if (e.constructor !== Array) return n.set(e, undefined, t);
          for (var i = 0; i < e.length; i++) n.set(e[i], undefined, t);
        }),
        (n._getExtendedOptions = function (e) {
          return {
            path: (e && e.path) || n.defaults.path,
            domain: (e && e.domain) || n.defaults.domain,
            expires: (e && e.expires) || n.defaults.expires,
            secure: e && e.secure !== undefined ? e.secure : n.defaults.secure,
          };
        }),
        (n._isValidDate = function (e) {
          return (
            "[object Date]" === Object.prototype.toString.call(e) &&
            !isNaN(e.getTime())
          );
        }),
        (n._getExpiresDate = function (e, t) {
          if (
            ((t = t || new Date()),
            "number" == typeof e
              ? (e =
                  e === Infinity
                    ? n._maxExpireDate
                    : new Date(t.getTime() + 1e3 * e))
              : "string" == typeof e && (e = new Date(e)),
            e && !n._isValidDate(e))
          )
            throw new Error(
              "`expires` parameter cannot be converted to a valid Date instance"
            );
          return e;
        }),
        (n._generateCookieString = function (t, i, o) {
          (t = (t = t.replace(/[^#$&+\^`|]/g, encodeURIComponent))
            .replace(/\(/g, "%28")
            .replace(/\)/g, "%29")),
            (i = (i + "").replace(
              /[^!#$&-+\--:<-\[\]-~]/g,
              encodeURIComponent
            ));
          var r = (o = o || {}).domain || e.cookieDomain || n._autoCookieDomain,
            a = t + "=" + i;
          return (
            (a += o.path ? ";path=" + o.path : ""),
            (a += r ? ";domain=" + r : ""),
            (a += o.expires ? ";expires=" + o.expires.toUTCString() : ""),
            (a += o.secure ? ";secure" : "")
          );
        }),
        (n._getCacheFromString = function (e) {
          for (
            var t = {}, i = e ? e.split("; ") : [], o = 0;
            o < i.length;
            o++
          ) {
            var r = n._getKeyValuePairFromCookieString(i[o]);
            if (null != r) {
              var a = n._cacheKeyPrefix + r.key;
              t[a] === undefined && (t[a] = r.value);
            }
          }
          return t;
        }),
        (n._getKeyValuePairFromCookieString = function (e) {
          var t = e.indexOf("=");
          t = t < 0 ? e.length : t;
          var n = e.substr(0, t),
            i = e.substr(t + 1);
          try {
            (n = decodeURIComponent(n)), (i = decodeURIComponent(i));
          } catch (o) {
            return null;
          }
          return { key: n, value: i };
        }),
        (n._renewCache = function () {
          try {
            n._cachedDocumentCookie !== n._document.cookie &&
              ((n._cache = n._getCacheFromString(n._document.cookie)),
              (n._cachedDocumentCookie = n._document.cookie));
          } catch (t) {
            e.console.log(t);
          }
        }),
        (n._isValidDomain = function (e) {
          var t = "cookies.js_dtest",
            i = "1" === n.set(t, 1, { domain: e }).get(t);
          return n.expire(t, { domain: e }), i;
        }),
        (n._getAutoCookieDomain = function () {
          var t = e.util.getWindow().location.hostname;
          if (!isNaN(parseInt(t.replace(".", ""), 10)))
            return n._isValidDomain(t) ? t : null;
          var i = t.split(".");
          if (1 === i.length) return t;
          for (var o, r = 2; r <= i.length; r++) {
            var a = i.slice(-r).join(".");
            if (n._isValidDomain(a)) {
              o = a;
              break;
            }
          }
          return o || t;
        }),
        (n._autoCookieDomain = n._getAutoCookieDomain()),
        n
      );
    })(e.util.getWindow());
  })(this.PARSELY),
  (function (e) {
    "use strict";
    var t = function () {};
    t.prototype = (function () {
      var t = function i(e, t, n) {
        return 1 === arguments.length ? i.get(e) : i.set(e, t, n);
      };
      (t._keyPrefix = "pStore-"), (t._delimiter = "|^");
      try {
        t._store = e.util.getWindow().localStorage;
      } catch (n) {
        t._store = undefined;
      }
      return (
        (t._baseDomain = null),
        (t._quotaErrors = [
          "NS_ERROR_DOM_QUOTA_REACHED",
          "QUOTA_EXCEEDED_ERR",
          "QuotaExceededError",
          "W3CException_DOM_QUOTA_EXCEEDED_ERR",
        ]),
        (t.get = function (n) {
          t._migrateCookie(n);
          var i = t._store[t._keyPrefix + n];
          if (void 0 === i) return undefined;
          try {
            i = t._deserialize(i);
          } catch (r) {
            return (
              console.log("Error deserializing stored data for key " + n),
              t.expire(n),
              undefined
            );
          }
          if ("undefined" != typeof i.expires) {
            var o = parseInt(i.expires, 10);
            if (!isNaN(o) && e.util.now() > o) return t.expire(n), undefined;
          }
          return i.value;
        }),
        (t.getJSON = function (n) {
          var i = t.get(n);
          return void 0 === i ? i : e.JSON.parse(i);
        }),
        (t.set = function (n, i, o) {
          var r = t._keyPrefix + n;
          if (void 0 === i) return delete t._store[r], t;
          o = e.Cookies._getExtendedOptions(o);
          var a,
            s = e.Cookies._getExpiresDate(o.expires);
          void 0 !== s && (s = s.getTime());
          try {
            a = t._serialize({ value: i, expires: s });
          } catch (u) {
            return console.log("Error serializing stored data for key " + n), t;
          }
          try {
            t._store[r] = a;
          } catch (u) {
            console.log("Error storing data for key " + r + " in localStorage"),
              -1 !== t._quotaErrors.indexOf(u.name) &&
                console.log("quota exceeded");
          }
          return t;
        }),
        (t.setJSON = function (n, i, o) {
          return t.set(n, e.JSON.stringify(i), o), t;
        }),
        (t.extendExpiry = function (e, n) {
          var i = t.get(e);
          if (void 0 === i) return !1;
          t.set(e, i, n);
        }),
        (t.expire = function (e, n) {
          return t.set(e, undefined, n);
        }),
        (t._serialize = function (e) {
          return e.value + t._delimiter + e.expires;
        }),
        (t._deserialize = function (e) {
          var n = e.split(t._delimiter),
            i = { value: n[0] };
          return n.length > 1 && (i.expires = n[1]), i;
        }),
        (t._migrateCookie = function (n) {
          var i = e.Cookies.get(n);
          if ((e.Cookies.expire(n), void 0 !== i)) {
            var o = e.ParselyStorage.defaults[n],
              r = {};
            void 0 !== o && (r.expires = o), t.set(n, i, r);
          }
        }),
        {
          constructor: t,
          get: t.get,
          getJSON: t.getJSON,
          set: t.set,
          setJSON: t.setJSON,
          extendExpiry: t.extendExpiry,
          expire: t.expire,
        }
      );
    })();
    var n = function () {};
    (n.prototype = (function () {
      var n = new t(),
        i =
          (function () {
            var t = n._keyPrefix;
            try {
              return (
                e.util.getWindow().localStorage.setItem(t, t),
                e.util.getWindow().localStorage.removeItem(t),
                !0
              );
            } catch (i) {
              return !1;
            }
          })() &&
          (function () {
            var t = !1,
              n = e.Cookies.get("_parsely_visitor");
            return (
              void 0 !== n && "{" !== n.charAt(0) && (t = !0),
              !!e.util.isSafari() || (!0 === e.use_localstorage && !t)
            );
          })()
            ? n
            : e.Cookies;
      return {
        supportsCookies:
          "cookie" in document &&
          (document.cookie.length > 0 ||
            (document.cookie = "test").indexOf.call(document.cookie, "test") >
              -1),
        get: i.get,
        getJSON: i.getJSON,
        set: i.set,
        setJSON: i.setJSON,
        extendExpiry: i.extendExpiry,
        expire: i.expire,
        defaults: {
          visitor: { key: "_parsely_visitor", expires: 34164e3, secure: !1 },
          session: { key: "_parsely_session", expires: 1800, secure: !1 },
        },
      };
    })()),
      (e.ParselyStorage = new n());
  })(this.PARSELY),
  (function () {
    var e = this.PARSELY,
      t = e.Class,
      n = e.ParselyStorage,
      i = e.console,
      o = e.JSON,
      r = ["id"],
      a = t.extend({
        init: function () {
          (this.visitorCookieName =
            e.visitorCookieName || n.defaults.visitor.key),
            (this.visitorCookieTimeoutSecs =
              e.visitorCookieTimeoutSecs || n.defaults.visitor.expires),
            (this.visitorCookieSecure =
              e.visitorCookieSecure || n.defaults.visitor.secure),
            (this.legacyVisitorCookieName =
              e.legacyVisitorCookieName || "parsely_uuid");
        },
        getVisitorInfo: function (t) {
          t = t || !1;
          var r = n.get(this.visitorCookieName);
          if (void 0 === r) {
            var a = n.get(this.legacyVisitorCookieName),
              s = e.config.apikey_uuid || e.config.uuid;
            !1 !== e.optout_disabled_cookies &&
              void 0 === a &&
              !1 === n.supportsCookies &&
              ((a = "OPTOUT"), i.log("Setting visitor ID to OPTOUT")),
              void 0 === a && null !== s
                ? ((a = s),
                  i.log(
                    "No existing visitor ID found, using UUID from config: " + a
                  ))
                : i.log("Using existing value for visitor ID: " + a),
              (r = this.initVisitor(a)),
              n.expire("parsely_uuid");
          } else {
            var u = !1;
            try {
              (r = o.parse(r)), (u = !0);
            } catch (c) {
              i.log(
                'Unable to JSON parse visitorInfo "' + r + '", assuming ampid.'
              ),
                (r = this.initVisitor(r));
            }
            u && t && this.extendVisitorExpiry();
          }
          return (e.config.parsely_site_uuid = r.id), r;
        },
        initVisitor: function (e) {
          return this.setVisitorInfo({
            id: e,
            session_count: 0,
            last_session_ts: 0,
          });
        },
        setVisitorInfo: function (e) {
          for (var t = 0; t < r.length; t++) {
            var i = r[t];
            if ("undefined" == typeof e[i] || null === e[i]) return !1;
          }
          return (
            n.setJSON(this.visitorCookieName, e, {
              expires: this.visitorCookieTimeoutSecs,
              secure: this.visitorCookieSecure,
            }),
            e
          );
        },
        extendVisitorExpiry: function () {
          n.extendExpiry(this.visitorCookieName, {
            expires: this.visitorCookieTimeoutSecs,
            secure: this.visitorCookieSecure,
          });
        },
      });
    e.visitorManager = new a();
  })(),
  (function () {
    var e = this.PARSELY,
      t = e.util,
      n = e.Class,
      i = e.ParselyStorage,
      o = e.console,
      r = e.visitorManager,
      a = n.extend({
        init: function () {
          (this.windowAlias = t.getWindow()),
            (this.documentAlias = this.windowAlias.document),
            (this.sessionCookieName =
              e.sessionCookieName || i.defaults.session.key),
            (this.sessionCookieTimeoutSecs = i.defaults.session.expires),
            (this.sessionCookieSecure =
              e.sessionCookieSecure || i.defaults.session.secure),
            o.log("Initializing session."),
            this.getSession(!1);
        },
        getSession: function (n) {
          n = n || !1;
          var a = r.getVisitorInfo(),
            s = i.getJSON(this.sessionCookieName);
          if (void 0 === s) {
            var u, c;
            !1 === a
              ? ((u = 1), (c = 0))
              : (a.session_count++,
                (u = a.session_count),
                (c = a.last_session_ts));
            var l = new Date();
            (s = {
              sid: u,
              surl: t.getEventUrl(),
              sref: e.lastRequest
                ? e.lastRequest.urlref
                : this.documentAlias.referrer,
              sts: l.getTime(),
              slts: c,
            }),
              o.log(
                "Session expired/never existed, creating new session with " +
                  this.sessionCookieTimeoutSecs +
                  "s timeout: " +
                  e.JSON.stringify(s)
              ),
              i.setJSON(this.sessionCookieName, s, {
                expires: this.sessionCookieTimeoutSecs,
                secure: this.sessionCookieSecure,
              }),
              (a.last_session_ts = s.sts),
              r.setVisitorInfo(a);
          } else n && this.extendSessionExpiry();
          return s;
        },
        extendSessionExpiry: function () {
          i.extendExpiry(this.sessionCookieName, {
            expires: this.sessionCookieTimeoutSecs,
            secure: this.sessionCookieSecure,
          });
        },
      });
    e.sessionManager = new a();
  })(),
  (function () {
    var e = this.PARSELY,
      t = e.util,
      n = e.JSON,
      i = e.$,
      o = t.getWindow().document;
    (PARSELY.getLdJsonMetas = function () {
      for (var e = o.getElementsByTagName("script"), t = 0; t < e.length; t++) {
        var i = e[t];
        if ("application/ld+json" === i.getAttribute("type")) {
          var r;
          try {
            r = n.parse(i.innerHTML);
          } catch (a) {
            return null;
          }
          return {
            type: "NewsArticle" === r["@type"] ? "post" : "sectionpage",
            title: r.headline,
            link: r.url,
            image_url: r.thumbnailUrl,
            pub_date: r.dateCreated,
            section: r.articleSection,
            authors: r.creator,
            tags: r.keywords,
          };
        }
      }
      return null;
    }),
      (PARSELY.getRepeatedMetaMetas = function () {
        for (
          var e = {},
            t = o.getElementsByTagName("meta"),
            n = {
              "parsely-title": "title",
              "parsely-link": "link",
              "parsely-image-url": "image_url",
              "parsely-type": "type",
              "parsely-post-id": "post_id",
              "parsely-pub-date": "pub_date",
              "parsely-section": "section",
              "parsely-author": "authors",
              "parsely-tags": "tags",
            },
            r = 0;
          r < t.length;
          r++
        ) {
          var a = t[r],
            s = n[a.getAttribute("name")];
          if (void 0 !== s) {
            var u = a.getAttribute("content");
            "authors" === s
              ? "undefined" == typeof e[s]
                ? (e[s] = [u])
                : e[s].push(u)
              : (e[s] = "tags" === s ? u.split(",") : u);
          }
        }
        return i.isEmptyObject(e) ? null : e;
      }),
      (PARSELY.getParselyPageMetas = function () {
        for (var e = o.getElementsByTagName("meta"), t = 0; t < e.length; t++) {
          var i = e[t];
          if ("parsely-page" === i.getAttribute("name")) {
            var r = i.getAttribute("value") || i.getAttribute("content");
            try {
              return n.parse(r);
            } catch (a) {
              return null;
            }
          }
        }
        return null;
      }),
      (PARSELY.getMetas = function () {
        return (
          this.getRepeatedMetaMetas() ||
          this.getParselyPageMetas() ||
          this.getLdJsonMetas()
        );
      });
  })(),
  (function () {
    function e(e) {
      for (var t = 0, n = 0; e; )
        (t += e.offsetLeft), (n += e.offsetTop), (e = e.offsetParent);
      return [t, n];
    }
    function t(e) {
      var n = r.slots.hasParselySlots ? u : "id";
      if (null !== e.getAttribute(n))
        return "//*[@" + n + '="' + e.getAttribute(n) + '"]';
      if (e === document.body) return "//" + e.tagName.toLowerCase();
      for (var i = 0, o = e.parentNode.childNodes, a = 0; a < o.length; a++) {
        var s = o[a];
        if (s === e)
          return (
            t(e.parentNode) +
            "/" +
            e.tagName.toLowerCase() +
            "[" +
            (i + 1) +
            "]"
          );
        s.nodeType === c && s.tagName === e.tagName && i++;
      }
    }
    function n(e) {
      if (!e || 0 === e.indexOf("#") || 0 === e.indexOf("javascript"))
        return !0;
      var t = window.location.href;
      return e === t || 0 === e.indexOf(t + "#");
    }
    function i(e, t) {
      function n(e, t) {
        return e === document || t >= i || !e
          ? null
          : "A" === e.nodeName
          ? e
          : n(e.parentNode, t + 1);
      }
      var i = (t = t || {}).maxHeight || 5;
      return n(e, 0);
    }
    function o(e) {
      return e.getAttribute("parsely-target") || e.href;
    }
    var r = this.PARSELY,
      a = r.util,
      s = r.ParselyStorage,
      u = "data-parsely-slot";
    if (((r.slots = r.slots || {}), document.querySelector)) {
      (r.slots.discoverSlots = function () {
        (r.slots.hasParselySlots = !!document.querySelector("[" + u + "]")),
          (r.slots.discoveryTime = a.now());
      }),
        r.slots.discoverSlots(),
        (r.slots.reset = function () {
          r.slots.discoverSlots();
        });
      var c = 1;
      a.objAddEventListener(document.body, "click", function (a) {
        var u = i(a.target ? a.target : a.srcElement);
        if (null === u) return !0;
        if (!n(u.getAttribute("href"))) {
          var c = e(u),
            l = t(u),
            f = {
              url: r.util.getEventUrl(),
              x: c[0],
              y: c[1],
              xpath: l,
              href: o(u),
            };
          s.setJSON("_parsely_slot_click", f);
        }
      });
    } else r.console("Slot tracking not supported on this browser");
  })(),
  (function (e) {
    "use strict";
    var t = e.$;
    e.Sampler = (function (n) {
      var i = {};
      if (
        ((i._hasStartedSampling = !1),
        (i._accumulators = {}),
        (i._baseHeartbeatInterval = 15e4),
        (i._jitterRange = 5e3),
        (i._jitterFloor = 0 - i._jitterRange / 2),
        t.isNumeric(e.secondsBetweenHeartbeats))
      ) {
        var o = i._baseHeartbeatInterval / 1e3,
          r = e.secondsBetweenHeartbeats < o && !0 === n._parselyIsTest;
        (e.secondsBetweenHeartbeats > o || r) &&
          (i._baseHeartbeatInterval = 1e3 * e.secondsBetweenHeartbeats);
      }
      return (
        (i.trackKey = function (t, o, r) {
          if ((void 0 === o || "function" == typeof o) && void 0 !== r) {
            if (!i._accumulators.hasOwnProperty(t)) {
              var a = i._baseHeartbeatInterval;
              i._accumulators[t] = {
                ms: 0,
                totalMs: 0,
                firstSampleTime: e.util.now(),
                lastSampleTime: e.util.now(),
                lastActiveSampleTime: undefined,
                sampleFn: o,
                heartbeatFn: r,
                heartbeatInterval: a,
                heartbeatTimer: undefined,
                baseHeartbeatInterval: a,
              };
            }
            !1 === i._hasStartedSampling &&
              (n.setInterval(i._sample, 100), (i._hasStartedSampling = !0)),
              i._setHeartbeatTimeout(t);
          }
        }),
        (i._setHeartbeatTimeout = function (e) {
          var t = i._accumulators[e];
          "undefined" != typeof t.heartbeatTimer && i._unsetHeartbeatTimeout(e);
          var o = Math.random() * i._jitterRange + i._jitterFloor,
            r = t.heartbeatInterval + o;
          t.heartbeatTimer = n.setTimeout(function () {
            i.sendHeartbeat(e);
          }, r);
        }),
        (i._unsetHeartbeatTimeout = function (e) {
          var t = i._accumulators[e];
          n.clearTimeout(t.heartbeatTimer), (t.heartbeatTimer = undefined);
        }),
        (i._backoff = function (t, n) {
          var i =
              0.3 *
              ((n = void 0 === n ? e.util.now() - t.firstSampleTime : n) / 1e3 +
                35),
            o = Math.min(36e5, i);
          t.heartbeatInterval = 1e3 * o;
        }),
        (i.dropKey = function (e) {
          delete i._accumulators[e];
        }),
        (i._sample = function (t, n) {
          t = void 0 === t ? e.util.now() : t;
          var o, r, a, s;
          for (var u in i._accumulators)
            (o = i._accumulators[u]),
              (a = t - (void 0 === n ? o.lastSampleTime : n)),
              (r = "undefined" == typeof o.sampleFn || o.sampleFn(t)),
              e.config.limit_et_sample_len &&
                ((s = a > 0 && a < 200), (r = r && s)),
              (o.ms += r ? a : 0),
              (o.totalMs += r ? a : 0),
              (o.lastSampleTime = t),
              r &&
                (t - o.lastActiveSampleTime > o.baseHeartbeatInterval &&
                  ((o.heartbeatInterval = o.baseHeartbeatInterval),
                  i._setHeartbeatTimeout(u)),
                (o.lastActiveSampleTime = t));
        }),
        (i.sendHeartbeat = function (e, t, n, o) {
          var r = i._accumulators[e];
          if (void 0 !== r) {
            var a = void 0 === t ? r.ms / 1e3 : t,
              s = Math.round(a);
            s > 0 && s <= 3600 && r.heartbeatFn(s, undefined, r.totalMs, o),
              (r.ms = 0),
              o || i._backoff(r, n),
              i._setHeartbeatTimeout(e);
          }
        }),
        (i._sendHeartbeats = function (e, t) {
          for (var n in i._accumulators) i.sendHeartbeat(n, e, t, !0);
        }),
        (i._setUnloadListeners = function () {
          e._lifecycle.addEventListener("statechange", function (e) {
            "hidden" === e.newState.toLowerCase() && i._sendHeartbeats();
          });
        }),
        i._setUnloadListeners(),
        i
      );
    })(e.util.getWindow());
  })(this.PARSELY),
  (function () {
    var e = this.PARSELY,
      t = e.config.settings,
      n = e.Sampler,
      i = e.$,
      o = e.util;
    if ("boolean" != typeof e.enableHeartbeats || e.enableHeartbeats) {
      var r = [
          "focus",
          "mousedown",
          "mouseup",
          "mousemove",
          "scroll",
          "keyup",
          "keydown",
        ],
        a = ["active", "passive"],
        s = 5;
      i.isNumeric(e.activeTimeout) &&
        e.activeTimeout >= 1 &&
        e.activeTimeout <= 60 &&
        (s = e.activeTimeout);
      var u = o.now();
      (e.engagedTime = e.engagedTime || {}),
        (e._lastEventTime = u),
        (e.isEngaged = !0),
        (e.isInteracting = !0),
        (e.focused = !0),
        (e.videoPlaying = !1),
        (e.ENGAGED_TIME_SAMPLER_KEY = "engagedTime"),
        !0 === t.test && (e._handleEngagementActivityCalls = 0),
        !0 !== e.fbInstantArticles &&
          e._lifecycle.addEventListener("statechange", function (t) {
            var n = t.newState.toLowerCase();
            -1 !== a.indexOf(n) ? (e.focused = !0) : (e.focused = !1);
          });
      var c = function () {
        (e._lastEventTime = o.now()),
          !0 === t.test && e._handleEngagementActivityCalls++;
      };
      !0 !== e.fbInstantArticles
        ? i.each(r, function (e, t) {
            o.windowAddEventListener(t, c);
          })
        : setInterval(c, 1e3 * s),
        (e.engagedTime.getParams = function () {
          return {
            minActiveTimeout: 1,
            maxActiveTimeout: 60,
            activeTimeout: s,
          };
        }),
        (e.engagedTime.sample = function (t, n, i, r) {
          return (
            (t = void 0 === t ? o.now() : t),
            (n = void 0 === n ? e._lastEventTime : n),
            (i = void 0 === i ? e.videoPlaying : i),
            (r = void 0 === r ? e.focused : r),
            (e.isInteracting = t - n < 1e3 * s),
            (e.isEngaged = (e.isInteracting && r) || i),
            e.isEngaged
          );
        }),
        (e.engagedTime.sendHeartbeat = function (t, n, r, a) {
          (t = void 0 === t ? 0 : t),
            (n = void 0 === n ? e.enableHeartbeats : n),
            (a = void 0 !== a && a),
            (void 0 === n || !0 === n) &&
              (!0 !== e.config.heartbeat_should_honor_autotrack ||
                e.autotrack) &&
              (PARSELY.beacon.pixel.beacon(
                {
                  date: new Date().toString(),
                  action: "heartbeat",
                  inc: t,
                  tt: r,
                  url: o.getEventUrl(),
                  urlref: e.lastRequest
                    ? e.lastRequest.urlref
                    : o.getWindow().document.referrer,
                },
                undefined,
                a
              ),
              i.isFunction(e.onHeartbeat) && e.onHeartbeat(t));
        }),
        (e.engagedTime.startTracking = function () {
          var t = !0 === e.fbInstantArticles ? undefined : e.engagedTime.sample;
          n.trackKey(
            e.ENGAGED_TIME_SAMPLER_KEY,
            t,
            e.engagedTime.sendHeartbeat
          );
        }),
        (e.engagedTime.stopTracking = function () {
          n.dropKey(e.ENGAGED_TIME_SAMPLER_KEY);
        }),
        (e.engagedTime.initNewPage = function () {
          e.engagedTime.stopTracking(), e.engagedTime.startTracking();
        }),
        e.engagedTime.startTracking();
    }
  })(),
  (function () {
    var e = this.PARSELY,
      t = e.$,
      n = e.Class,
      i = e.JSON,
      o = e.console,
      r = e.config,
      a = e.urls,
      s = e.visitorManager,
      u = e.sessionManager,
      c = e.ParselyStorage,
      l = e.util.getWindow(),
      f = l.document,
      d = l.screen;
    PARSELY.Pixel = n.extend({
      init: function () {
        var t = e.util.getEventUrl(),
          n =
            d.width +
            "x" +
            d.height +
            "|" +
            (d.availWidth + "x" + d.availHeight) +
            "|" +
            d.colorDepth;
        (this.correlationIds = { pageview: "pvid", videostart: "vsid" }),
          (this.callbackName = "parselyStartCallback"),
          (this.data = {
            idsite: r.apikey,
            url: t,
            urlref: f.referrer,
            screen: n,
            data: {},
          }),
          (r.hasOwnProperty("is_remote_config") && !0 !== r.is_remote_config) ||
            ((this.data.data.parsely_uuid = r.network_uuid || r.uuid),
            (this.data.data.parsely_site_uuid = r.parsely_site_uuid)),
          (this.remoteEndpoint = a.pixel + this.selectEndpoint()),
          (this.thirdPartyBlockedCookieSettings = {
            name: "_parsely_tpa_blocked",
            timeoutSecs: 43200,
            flagAttribute: "tpab",
          });
      },
      selectEndpoint: function () {
        return !1 === r.track_ip_addresses ? "/px/" : "/plogger/";
      },
      isThirdPartyAnalyticsBlocked: function () {
        if (!e.is_first_party) return undefined;
        var t = this.thirdPartyBlockedCookieSettings,
          n = c.getJSON(t.name);
        if (
          (void 0 !== n &&
            (this.third_party_analytics_is_blocked = n[t.flagAttribute]),
          "undefined" == typeof this.third_party_analytics_is_blocked &&
            "undefined" == typeof this.third_party_analytics_checked)
        ) {
          this.third_party_analytics_checked = !0;
          var i = this,
            o = function (e) {
              i.third_party_analytics_is_blocked = e;
              var n = {};
              (n[t.flagAttribute] = e),
                c.setJSON(t.name, n, { expires: t.timeoutSecs });
            },
            r = new Image();
          (r.onerror = function () {
            o(!0);
          }),
            (r.onload = function () {
              o(!1);
            }),
            (r.src = "https://p1.parsely.com/plogger/");
        }
        return this.third_party_analytics_is_blocked;
      },
      addDefaults: function (e) {
        t.extend(!0, this.data, e);
      },
      shouldGenerateVisitorID: function (e) {
        return (
          !(
            !r.hasOwnProperty("is_remote_config") || !0 === r.is_remote_config
          ) && !e
        );
      },
      saveVisitorID: function (e) {
        var t = u.getSession(),
          n = { id: e, session_count: t.sid, last_session_ts: t.sts };
        c.setJSON(s.visitorCookieName, n, {
          expires: s.visitorCookieTimeoutSecs,
          secure: s.visitorCookieSecure,
        }),
          u.getSession();
      },
      generateVisitorID: function () {
        (r.uuid = e.util.makeUUID()), this.saveVisitorID(r.uuid);
      },
      sendEvent: function (n, i) {
        o.log("beaconing to endpoint: " + this.remoteEndpoint),
          (n.u = i),
          (new Image().src = this.buildEventRequestUrl(n)),
          t.isFunction(e.onBeacon) && e.onBeacon(n);
      },
      requestFetch: function (n, i) {
        return (
          o.log("fetching endpoint: " + this.remoteEndpoint),
          "undefined" != typeof l.fetch &&
            ((n.u = i),
            fetch(this.buildEventRequestUrl(n), {
              method: "GET",
              mode: "no-cors",
              keepalive: !0,
            })["catch"](function (e) {
              o.log(e);
            }),
            t.isFunction(e.onBeacon) && e.onBeacon(n),
            !0)
        );
      },
      buildEventRequestUrl: function (e) {
        var n = t.param(e);
        return this.remoteEndpoint + "?" + n;
      },
      generatePageloadId: function () {
        return (
          "undefined" == typeof e.pageload_id &&
            (e.pageload_id = Math.floor(99999999 * Math.random())),
          e.pageload_id
        );
      },
      getCorrelationIdKey: function (e) {
        return "_" + e + "_correlation_id";
      },
      generateEventCorrelationId: function (t, n) {
        var i = this.getCorrelationIdKey(t);
        return !0 === n && (e[i] = Math.floor(99999999 * Math.random())), e[i];
      },
      beacon: function (n, o, c) {
        var l = u.getSession(!0),
          f = e.util.now(),
          d = this.generatePageloadId() || 0,
          p = t.extend(!0, { rand: f, plid: d }, this.data, l, n),
          g = e.visitorManager.getVisitorInfo();
        !0 === this.isThirdPartyAnalyticsBlocked() &&
          ((p.tpab = 1), (p.data.flashlight = 1)),
          s.extendVisitorExpiry();
        var h;
        for (var y in this.correlationIds)
          void 0 !== (h = this.generateEventCorrelationId(y, y === p.action)) &&
            (p[this.correlationIds[y]] = h);
        (p.data = i.stringify(p.data)),
          !0 !== o && (PARSELY.lastRequest = p),
          (r.uuid = g.id),
          this.shouldGenerateVisitorID(g.id) && this.generateVisitorID(),
          !0 === c && (e.util.isFirefox() || e.util.isSafari()) && (c = !1),
          (this.remoteEndpoint = a.pixel + this.selectEndpoint());
        var v = !1;
        !0 === c && (v = this.requestFetch(p, r.uuid)),
          !1 === v && this.sendEvent(p, r.uuid);
      },
    });
  })(),
  (function () {
    var e = this.PARSELY,
      t = e.$,
      n = e.console,
      i = e.Class,
      o = e.JSON,
      r = e.ParselyStorage,
      a = e.util.getWindow().document;
    PARSELY.Beacon = i.extend({
      init: function () {
        this.pixel = new PARSELY.Pixel();
      },
      trackPageView: function (i, s) {
        (void 0 !== i &&
          "undefined" != typeof i.action &&
          "pageview" !== i.action) ||
          e.initNewPage(!1);
        var u = {
          title: a.title,
          date: new Date().toString(),
          action: "pageview",
          url: e.util.getEventUrl(),
          urlref: a.referrer,
        };
        e.hasOwnProperty("metadata") &&
          (u.hasOwnProperty("metadata")
            ? (u.metadata = o.stringify(t.extend(u.metadata, e.metadata.get())))
            : (u.metadata = o.stringify(e.metadata.get())));
        var c = r.getJSON("_parsely_slot_click");
        c &&
          (r.expire("_parsely_slot_click"),
          n.log("Valid slot click found"),
          (u.sl_xp = c.xpath),
          (u.sl_x = c.x),
          (u.sl_y = c.y),
          (u.sl_h = c.href),
          c.url !== u.urlref &&
            n.log("urlref overridden by slot data as " + c.url),
          (u.urlref = c.url)),
          i && t.extend(u, i),
          this.pixel.beacon(u, s);
      },
      trackConversion: function (e) {
        window.console.warn(
          "[WARN] `PARSELY.beacon.trackConversion()` is being deprecated."
        ),
          window.console.warn(
            "[WARN] Please consult https://www.parse.ly/help/integration/conversions/ to update to the new Conversions js-API."
          );
        var i = ["active", "lead", "customer"],
          o = { label: undefined };
        e && e.category
          ? -1 === i.indexOf(e.category)
            ? n.log(
                "'" +
                  e.category +
                  "' is not a valid conversion category; must be one of: " +
                  i.join(", ")
              )
            : (t.extend(o, e),
              this.trackPageView({
                action: "conversion",
                data: {
                  _conversion_type: e.category,
                  _conversion_label: e.label,
                },
              }))
          : n.log(
              "No category specified; category required for conversion events"
            );
      },
      start: function () {
        (this.startTime = e.util.now()),
          (this.autotrack =
            "undefined" == typeof PARSELY.autotrack || PARSELY.autotrack),
          this.autotrack
            ? (n.log("autotrack enabled; doing automatic pageview beacon"),
              this.trackPageView())
            : n.log("autotrack disabled; beacon loaded but no data sent");
      },
    });
  })(),
  (function () {
    var e = PARSELY.config.settings,
      t = PARSELY.console,
      n = PARSELY.$;
    (PARSELY.updateDefaults = function (e) {
      return PARSELY.beacon.pixel.addDefaults(e);
    }),
      (PARSELY.setConfigOptions = function (e) {
        e.hasOwnProperty("track_ip_addresses") &&
          (PARSELY.config.track_ip_addresses = e.track_ip_addresses);
      }),
      (PARSELY.initNewPage = function (e) {
        "undefined" != typeof PARSELY &&
          ("undefined" != typeof PARSELY.Sampler &&
            "function" == typeof PARSELY.Sampler._sendHeartbeats &&
            PARSELY.Sampler._sendHeartbeats(),
          "undefined" != typeof PARSELY.engagedTime &&
            "function" == typeof PARSELY.engagedTime.initNewPage &&
            PARSELY.engagedTime.initNewPage(),
          "undefined" != typeof PARSELY.video &&
            "function" == typeof PARSELY.video.clear &&
            PARSELY.video.clear(),
          "undefined" != typeof PARSELY.slots &&
            "function" == typeof PARSELY.slots.reset &&
            PARSELY.slots.reset(),
          "undefined" != typeof PARSELY.lastRequest &&
            delete PARSELY.lastRequest,
          !1 !== e &&
            "undefined" != typeof PARSELY.beacon &&
            "function" == typeof PARSELY.beacon.start &&
            PARSELY.beacon.start(),
          PARSELY.autotrack &&
            PARSELY.video &&
            !1 !== PARSELY.video.autotrack &&
            "function" == typeof PARSELY.video.detectVideos &&
            PARSELY.video.detectVideos());
      }),
      (PARSELY.onStart = function (e) {
        "function" == typeof e && e();
      }),
      (PARSELY.isFlashlight = function () {
        return PARSELY.beacon.pixel.isThirdPartyAnalyticsBlocked();
      });
    var i;
    if (
      (e.tracker &&
        (t.log("tracker enabled, create Beacon"),
        (i = new PARSELY.Beacon()),
        (PARSELY.beacon = i)),
      "undefined" != typeof PARSELY._stubs)
    ) {
      var o, r;
      for (o in PARSELY._stubs)
        if (PARSELY._stubs.hasOwnProperty(o) && "function" == typeof PARSELY[o])
          for (r = 0; r < PARSELY._stubs[o].length; r++)
            PARSELY[o].apply(null, PARSELY._stubs[o][r]);
    }
    void 0 !== i &&
      (i.start(), n.isFunction(PARSELY.onReady) && PARSELY.onReady());
    try {
      if (
        "undefined" != typeof Storage &&
        localStorage.getItem("parsely-overlay")
      ) {
        var a = document.createElement("script");
        a.setAttribute(
          "src",
          "https://dash.parsely.com/static/build/overlay.js?v=" +
            PARSELY.util.now()
        ),
          document.body.appendChild(a);
      }
    } catch (s) {
      PARSELY.console.log(s);
    }
  })(),
  (function () {
    var e = PARSELY.onload,
      t = PARSELY.console;
    if ("function" == typeof e)
      try {
        e();
      } catch (n) {
        t.dir({ info: "hook threw exception", error: n });
      }
    t.log("Final load stage completed successfully"), (PARSELY.loaded = !0);
  })();
