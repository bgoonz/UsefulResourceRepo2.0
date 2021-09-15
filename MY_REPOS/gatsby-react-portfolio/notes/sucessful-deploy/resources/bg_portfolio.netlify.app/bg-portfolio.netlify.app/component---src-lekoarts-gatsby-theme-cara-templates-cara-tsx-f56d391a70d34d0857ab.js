(window.webpackJsonp = window.webpackJsonp || []).push([
  [3],
  {
    "7W2i": function (e, t, r) {
      var n = r("SksO");
      e.exports = function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0,
          },
        })),
          t && n(e, t);
      };
    },
    "8+s/": function (e, t, r) {
      "use strict";
      var n,
        o = r("q1tI"),
        i = (n = o) && "object" == typeof n && "default" in n ? n.default : n;

      function a(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var c = !(
        "undefined" == typeof window ||
        !window.document ||
        !window.document.createElement
      );
      e.exports = function (e, t, r) {
        if ("function" != typeof e)
          throw new Error("Expected reducePropsToState to be a function.");
        if ("function" != typeof t)
          throw new Error(
            "Expected handleStateChangeOnClient to be a function."
          );
        if (void 0 !== r && "function" != typeof r)
          throw new Error(
            "Expected mapStateOnServer to either be undefined or a function."
          );
        return function (n) {
          if ("function" != typeof n)
            throw new Error(
              "Expected WrappedComponent to be a React component."
            );
          var s,
            l = [];

          function u() {
            (s = e(
              l.map(function (e) {
                return e.props;
              })
            )),
              d.canUseDOM ? t(s) : r && (s = r(s));
          }
          var d = (function (e) {
            var t, r;

            function o() {
              return e.apply(this, arguments) || this;
            }
            (r = e),
              ((t = o).prototype = Object.create(r.prototype)),
              (t.prototype.constructor = t),
              (t.__proto__ = r),
              (o.peek = function () {
                return s;
              }),
              (o.rewind = function () {
                if (o.canUseDOM)
                  throw new Error(
                    "You may only call rewind() on the server. Call peek() to read the current state."
                  );
                var e = s;
                return (s = void 0), (l = []), e;
              });
            var a = o.prototype;
            return (
              (a.UNSAFE_componentWillMount = function () {
                l.push(this), u();
              }),
              (a.componentDidUpdate = function () {
                u();
              }),
              (a.componentWillUnmount = function () {
                var e = l.indexOf(this);
                l.splice(e, 1), u();
              }),
              (a.render = function () {
                return i.createElement(n, this.props);
              }),
              o
            );
          })(o.PureComponent);
          return (
            a(
              d,
              "displayName",
              "SideEffect(" +
                (function (e) {
                  return e.displayName || e.name || "Component";
                })(n) +
                ")"
            ),
            a(d, "canUseDOM", c),
            d
          );
        };
      };
    },
    Bnag: function (e, t) {
      e.exports = function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      };
    },
    EbDI: function (e, t) {
      e.exports = function (e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
          return Array.from(e);
      };
    },
    Ijbi: function (e, t, r) {
      var n = r("WkPL");
      e.exports = function (e) {
        if (Array.isArray(e)) return n(e);
      };
    },
    Nsbk: function (e, t) {
      function r(t) {
        return (
          (e.exports = r =
            Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
          r(t)
        );
      }
      e.exports = r;
    },
    P4c3: function (e, t, r) {
      "use strict";
      var n = r("lSNA"),
        o = r("RIqP"),
        i = r("PJYZ"),
        a = r("7W2i"),
        c = r("a1gu"),
        s = r("Nsbk"),
        l = r("lwsE"),
        u = r("W8MJ");

      function d(e, t) {
        var r =
          ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
          e["@@iterator"];
        if (!r) {
          if (
            Array.isArray(e) ||
            (r = (function (e, t) {
              if (!e) return;
              if ("string" == typeof e) return p(e, t);
              var r = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === r && e.constructor && (r = e.constructor.name);
              if ("Map" === r || "Set" === r) return Array.from(e);
              if (
                "Arguments" === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              )
                return p(e, t);
            })(e)) ||
            (t && e && "number" == typeof e.length)
          ) {
            r && (e = r);
            var n = 0,
              o = function () {};
            return {
              s: o,
              n: function () {
                return n >= e.length
                  ? {
                      done: !0,
                    }
                  : {
                      done: !1,
                      value: e[n++],
                    };
              },
              e: function (e) {
                throw e;
              },
              f: o,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var i,
          a = !0,
          c = !1;
        return {
          s: function () {
            r = r.call(e);
          },
          n: function () {
            var e = r.next();
            return (a = e.done), e;
          },
          e: function (e) {
            (c = !0), (i = e);
          },
          f: function () {
            try {
              a || null == r.return || r.return();
            } finally {
              if (c) throw i;
            }
          },
        };
      }

      function p(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n;
      }

      function f(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = s(e);
          if (t) {
            var o = s(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return c(this, r);
        };
      }

      function h(e) {
        return e && "object" == typeof e && "default" in e ? e.default : e;
      }
      Object.defineProperty(t, "__esModule", {
        value: !0,
      });
      var m = h(r("zLVn")),
        b = h(r("wx14")),
        g = h(r("q1tI")),
        y = h(r("i8i4")),
        v = void 0,
        w = void 0,
        O = [],
        j = function (e) {
          return (
            "undefined" != typeof window && window.requestAnimationFrame(e)
          );
        },
        x = function (e) {
          return "undefined" != typeof window && window.cancelAnimationFrame(e);
        },
        k = void 0,
        S = function () {
          return Date.now();
        },
        T = void 0,
        E = void 0,
        A = function (e, t) {
          return (w = {
            fn: e,
            transform: t,
          });
        },
        R = function (e) {
          return (O = e);
        },
        C = function (e) {
          return (v = e);
        },
        _ = function (e) {
          return (k = e);
        },
        P = function (e) {
          return (T = e);
        },
        L = function (e) {
          return (E = e);
        },
        M = Object.freeze({
          get bugfixes() {
            return v;
          },
          get applyAnimatedValues() {
            return w;
          },
          get colorNames() {
            return O;
          },
          get requestFrame() {
            return j;
          },
          get cancelFrame() {
            return x;
          },
          get interpolation() {
            return k;
          },
          get now() {
            return S;
          },
          get defaultElement() {
            return T;
          },
          get createAnimatedStyle() {
            return E;
          },
          injectApplyAnimatedValues: A,
          injectColorNames: R,
          injectBugfixes: C,
          injectInterpolation: _,
          injectFrame: function (e, t) {
            var r = [e, t];
            return (j = r[0]), (x = r[1]), r;
          },
          injectNow: function (e) {
            return (S = e);
          },
          injectDefaultElement: P,
          injectCreateAnimatedStyle: L,
        }),
        z = (function () {
          function e() {
            l(this, e);
          }
          return (
            u(e, [
              {
                key: "attach",
                value: function () {},
              },
              {
                key: "detach",
                value: function () {},
              },
              {
                key: "getValue",
                value: function () {},
              },
              {
                key: "getAnimatedValue",
                value: function () {
                  return this.getValue();
                },
              },
              {
                key: "addChild",
                value: function (e) {},
              },
              {
                key: "removeChild",
                value: function (e) {},
              },
              {
                key: "getChildren",
                value: function () {
                  return [];
                },
              },
            ]),
            e
          );
        })(),
        I = function (e) {
          return Object.keys(e).map(function (t) {
            return e[t];
          });
        },
        W = (function (e) {
          a(r, e);
          var t = f(r);

          function r() {
            var e, n;
            return (
              l(this, r),
              (e = t.apply(this, arguments)),
              (n = i(e)),
              (e.children = []),
              (e.getChildren = function () {
                return e.children;
              }),
              (e.getPayload = function (e) {
                return (
                  void 0 === e && (e = void 0),
                  void 0 !== e && n.payload ? n.payload[e] : n.payload || n
                );
              }),
              e
            );
          }
          return (
            u(r, [
              {
                key: "addChild",
                value: function (e) {
                  0 === this.children.length && this.attach(),
                    this.children.push(e);
                },
              },
              {
                key: "removeChild",
                value: function (e) {
                  var t = this.children.indexOf(e);
                  this.children.splice(t, 1),
                    0 === this.children.length && this.detach();
                },
              },
            ]),
            r
          );
        })(z),
        B = (function (e) {
          a(r, e);
          var t = f(r);

          function r() {
            var e;
            return (
              l(this, r),
              ((e = t.apply(this, arguments)).payload = []),
              (e.getAnimatedValue = function () {
                return e.getValue();
              }),
              (e.attach = function () {
                return e.payload.forEach(function (t) {
                  return t instanceof z && t.addChild(i(e));
                });
              }),
              (e.detach = function () {
                return e.payload.forEach(function (t) {
                  return t instanceof z && t.removeChild(i(e));
                });
              }),
              e
            );
          }
          return r;
        })(W),
        N = (function (e) {
          a(r, e);
          var t = f(r);

          function r() {
            var e;
            return (
              l(this, r),
              ((e = t.apply(this, arguments)).payload = {}),
              (e.getAnimatedValue = function () {
                return e.getValue(!0);
              }),
              (e.attach = function () {
                return I(e.payload).forEach(function (t) {
                  return t instanceof z && t.addChild(i(e));
                });
              }),
              (e.detach = function () {
                return I(e.payload).forEach(function (t) {
                  return t instanceof z && t.removeChild(i(e));
                });
              }),
              e
            );
          }
          return (
            u(r, [
              {
                key: "getValue",
                value: function (e) {
                  void 0 === e && (e = !1);
                  var t = {};
                  for (var r in this.payload) {
                    var n = this.payload[r];
                    (!e || n instanceof z) &&
                      (t[r] =
                        n instanceof z
                          ? n[e ? "getAnimatedValue" : "getValue"]()
                          : n);
                  }
                  return t;
                },
              },
            ]),
            r
          );
        })(W),
        F = (function (e) {
          a(r, e);
          var t = f(r);

          function r(e) {
            var n;
            return (
              l(this, r),
              (n = t.call(this)),
              !(e = e || {}).transform ||
                e.transform instanceof z ||
                (e = w.transform(e)),
              (n.payload = e),
              n
            );
          }
          return r;
        })(N),
        D = {
          transparent: 0,
          aliceblue: 4042850303,
          antiquewhite: 4209760255,
          aqua: 16777215,
          aquamarine: 2147472639,
          azure: 4043309055,
          beige: 4126530815,
          bisque: 4293182719,
          black: 255,
          blanchedalmond: 4293643775,
          blue: 65535,
          blueviolet: 2318131967,
          brown: 2771004159,
          burlywood: 3736635391,
          burntsienna: 3934150143,
          cadetblue: 1604231423,
          chartreuse: 2147418367,
          chocolate: 3530104575,
          coral: 4286533887,
          cornflowerblue: 1687547391,
          cornsilk: 4294499583,
          crimson: 3692313855,
          cyan: 16777215,
          darkblue: 35839,
          darkcyan: 9145343,
          darkgoldenrod: 3095792639,
          darkgray: 2846468607,
          darkgreen: 6553855,
          darkgrey: 2846468607,
          darkkhaki: 3182914559,
          darkmagenta: 2332068863,
          darkolivegreen: 1433087999,
          darkorange: 4287365375,
          darkorchid: 2570243327,
          darkred: 2332033279,
          darksalmon: 3918953215,
          darkseagreen: 2411499519,
          darkslateblue: 1211993087,
          darkslategray: 793726975,
          darkslategrey: 793726975,
          darkturquoise: 13554175,
          darkviolet: 2483082239,
          deeppink: 4279538687,
          deepskyblue: 12582911,
          dimgray: 1768516095,
          dimgrey: 1768516095,
          dodgerblue: 512819199,
          firebrick: 2988581631,
          floralwhite: 4294635775,
          forestgreen: 579543807,
          fuchsia: 4278255615,
          gainsboro: 3705462015,
          ghostwhite: 4177068031,
          gold: 4292280575,
          goldenrod: 3668254975,
          gray: 2155905279,
          green: 8388863,
          greenyellow: 2919182335,
          grey: 2155905279,
          honeydew: 4043305215,
          hotpink: 4285117695,
          indianred: 3445382399,
          indigo: 1258324735,
          ivory: 4294963455,
          khaki: 4041641215,
          lavender: 3873897215,
          lavenderblush: 4293981695,
          lawngreen: 2096890111,
          lemonchiffon: 4294626815,
          lightblue: 2916673279,
          lightcoral: 4034953471,
          lightcyan: 3774873599,
          lightgoldenrodyellow: 4210742015,
          lightgray: 3553874943,
          lightgreen: 2431553791,
          lightgrey: 3553874943,
          lightpink: 4290167295,
          lightsalmon: 4288707327,
          lightseagreen: 548580095,
          lightskyblue: 2278488831,
          lightslategray: 2005441023,
          lightslategrey: 2005441023,
          lightsteelblue: 2965692159,
          lightyellow: 4294959359,
          lime: 16711935,
          limegreen: 852308735,
          linen: 4210091775,
          magenta: 4278255615,
          maroon: 2147483903,
          mediumaquamarine: 1724754687,
          mediumblue: 52735,
          mediumorchid: 3126187007,
          mediumpurple: 2473647103,
          mediumseagreen: 1018393087,
          mediumslateblue: 2070474495,
          mediumspringgreen: 16423679,
          mediumturquoise: 1221709055,
          mediumvioletred: 3340076543,
          midnightblue: 421097727,
          mintcream: 4127193855,
          mistyrose: 4293190143,
          moccasin: 4293178879,
          navajowhite: 4292783615,
          navy: 33023,
          oldlace: 4260751103,
          olive: 2155872511,
          olivedrab: 1804477439,
          orange: 4289003775,
          orangered: 4282712319,
          orchid: 3664828159,
          palegoldenrod: 4008225535,
          palegreen: 2566625535,
          paleturquoise: 2951671551,
          palevioletred: 3681588223,
          papayawhip: 4293907967,
          peachpuff: 4292524543,
          peru: 3448061951,
          pink: 4290825215,
          plum: 3718307327,
          powderblue: 2967529215,
          purple: 2147516671,
          rebeccapurple: 1714657791,
          red: 4278190335,
          rosybrown: 3163525119,
          royalblue: 1097458175,
          saddlebrown: 2336560127,
          salmon: 4202722047,
          sandybrown: 4104413439,
          seagreen: 780883967,
          seashell: 4294307583,
          sienna: 2689740287,
          silver: 3233857791,
          skyblue: 2278484991,
          slateblue: 1784335871,
          slategray: 1887473919,
          slategrey: 1887473919,
          snow: 4294638335,
          springgreen: 16744447,
          steelblue: 1182971135,
          tan: 3535047935,
          teal: 8421631,
          thistle: 3636451583,
          tomato: 4284696575,
          turquoise: 1088475391,
          violet: 4001558271,
          wheat: 4125012991,
          white: 4294967295,
          whitesmoke: 4126537215,
          yellow: 4294902015,
          yellowgreen: 2597139199,
        },
        V = (function () {
          function e() {
            l(this, e);
          }
          return (
            u(e, null, [
              {
                key: "create",
                value: function (t, r, n) {
                  if ("function" == typeof t) return t;
                  if (k && t.output && "string" == typeof t.output[0])
                    return k(t);
                  if (Array.isArray(t))
                    return e.create({
                      range: t,
                      output: r,
                      extrapolate: n || "extend",
                    });
                  var o = t.output,
                    i = t.range || [0, 1],
                    a =
                      t.easing ||
                      function (e) {
                        return e;
                      },
                    c = "extend",
                    s = t.map;
                  void 0 !== t.extrapolateLeft
                    ? (c = t.extrapolateLeft)
                    : void 0 !== t.extrapolate && (c = t.extrapolate);
                  var l = "extend";
                  return (
                    void 0 !== t.extrapolateRight
                      ? (l = t.extrapolateRight)
                      : void 0 !== t.extrapolate && (l = t.extrapolate),
                    function (e) {
                      var t = (function (e, t) {
                        for (var r = 1; r < t.length - 1 && !(t[r] >= e); ++r);
                        return r - 1;
                      })(e, i);
                      return (function (e, t, r, n, o, i, a, c, s) {
                        var l = s ? s(e) : e;
                        if (l < t) {
                          if ("identity" === a) return l;
                          "clamp" === a && (l = t);
                        }
                        if (l > r) {
                          if ("identity" === c) return l;
                          "clamp" === c && (l = r);
                        }
                        if (n === o) return n;
                        if (t === r) return e <= t ? n : o;
                        t === -1 / 0
                          ? (l = -l)
                          : r === 1 / 0
                          ? (l -= t)
                          : (l = (l - t) / (r - t));
                        (l = i(l)),
                          n === -1 / 0
                            ? (l = -l)
                            : o === 1 / 0
                            ? (l += n)
                            : (l = l * (o - n) + n);
                        return l;
                      })(e, i[t], i[t + 1], o[t], o[t + 1], a, c, l, s);
                    }
                  );
                },
              },
            ]),
            e
          );
        })();
      var H = "[-+]?\\d*\\.?\\d+";

      function q() {
        return (
          "\\(\\s*(" +
          Array.prototype.slice.call(arguments).join(")\\s*,\\s*(") +
          ")\\s*\\)"
        );
      }
      var U = new RegExp("rgb" + q(H, H, H)),
        K = new RegExp("rgba" + q(H, H, H, H)),
        Y = new RegExp(
          "hsl" + q(H, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%")
        ),
        G = new RegExp(
          "hsla" + q(H, "[-+]?\\d*\\.?\\d+%", "[-+]?\\d*\\.?\\d+%", H)
        ),
        X = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        Z =
          /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        Q = /^#([0-9a-fA-F]{6})$/,
        J = /^#([0-9a-fA-F]{8})$/;

      function $(e, t, r) {
        return (
          r < 0 && (r += 1),
          r > 1 && (r -= 1),
          r < 1 / 6
            ? e + 6 * (t - e) * r
            : r < 0.5
            ? t
            : r < 2 / 3
            ? e + (t - e) * (2 / 3 - r) * 6
            : e
        );
      }

      function ee(e, t, r) {
        var n = r < 0.5 ? r * (1 + t) : r + t - r * t,
          o = 2 * r - n,
          i = $(o, n, e + 1 / 3),
          a = $(o, n, e),
          c = $(o, n, e - 1 / 3);
        return (
          (Math.round(255 * i) << 24) |
          (Math.round(255 * a) << 16) |
          (Math.round(255 * c) << 8)
        );
      }

      function te(e) {
        var t = parseInt(e, 10);
        return t < 0 ? 0 : t > 255 ? 255 : t;
      }

      function re(e) {
        return (((parseFloat(e) % 360) + 360) % 360) / 360;
      }

      function ne(e) {
        var t = parseFloat(e);
        return t < 0 ? 0 : t > 1 ? 255 : Math.round(255 * t);
      }

      function oe(e) {
        var t = parseFloat(e);
        return t < 0 ? 0 : t > 100 ? 1 : t / 100;
      }

      function ie(e) {
        var t,
          r,
          n =
            "number" == typeof (t = e)
              ? t >>> 0 === t && t >= 0 && t <= 4294967295
                ? t
                : null
              : (r = Q.exec(t))
              ? parseInt(r[1] + "ff", 16) >>> 0
              : D.hasOwnProperty(t)
              ? D[t]
              : (r = U.exec(t))
              ? ((te(r[1]) << 24) |
                  (te(r[2]) << 16) |
                  (te(r[3]) << 8) |
                  255) >>>
                0
              : (r = K.exec(t))
              ? ((te(r[1]) << 24) |
                  (te(r[2]) << 16) |
                  (te(r[3]) << 8) |
                  ne(r[4])) >>>
                0
              : (r = X.exec(t))
              ? parseInt(r[1] + r[1] + r[2] + r[2] + r[3] + r[3] + "ff", 16) >>>
                0
              : (r = J.exec(t))
              ? parseInt(r[1], 16) >>> 0
              : (r = Z.exec(t))
              ? parseInt(
                  r[1] + r[1] + r[2] + r[2] + r[3] + r[3] + r[4] + r[4],
                  16
                ) >>> 0
              : (r = Y.exec(t))
              ? (255 | ee(re(r[1]), oe(r[2]), oe(r[3]))) >>> 0
              : (r = G.exec(t))
              ? (ee(re(r[1]), oe(r[2]), oe(r[3])) | ne(r[4])) >>> 0
              : null;
        if (null === n) return e;
        var o = (16711680 & (n = n || 0)) >>> 16,
          i = (65280 & n) >>> 8,
          a = (255 & n) / 255;
        return "rgba("
          .concat((4278190080 & n) >>> 24, ", ")
          .concat(o, ", ")
          .concat(i, ", ")
          .concat(a, ")");
      }
      var ae = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        ce =
          /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
        se = new RegExp("(".concat(Object.keys(D).join("|"), ")"), "g");
      var le = (function (e) {
        a(r, e);
        var t = f(r);

        function r(e, n, a) {
          var c;
          return (
            l(this, r),
            ((c = t.call(this)).getValue = function () {
              var e;
              return (e = c).calc.apply(
                e,
                o(
                  c.payload.map(function (e) {
                    return e.getValue();
                  })
                )
              );
            }),
            (c.updateConfig = function (e, t) {
              return (c.calc = V.create(e, t));
            }),
            (c.interpolate = function (e, t) {
              return new r(i(c), e, t);
            }),
            (c.payload =
              e instanceof B && !e.updateConfig
                ? e.payload
                : Array.isArray(e)
                ? e
                : [e]),
            (c.calc = V.create(n, a)),
            c
          );
        }
        return r;
      })(B);
      var ue = (function (e) {
          a(r, e);
          var t = f(r);

          function r(e) {
            var n, o;
            return (
              l(this, r),
              (n = t.call(this)),
              (o = i(n)),
              (n.setValue = function (e, t) {
                void 0 === t && (t = !0), (o.value = e), t && o.flush();
              }),
              (n.getValue = function () {
                return n.value;
              }),
              (n.updateStyles = function () {
                return (function e(t, r) {
                  "function" == typeof t.update
                    ? r.add(t)
                    : t.getChildren().forEach(function (t) {
                        return e(t, r);
                      });
                })(i(n), n.animatedStyles);
              }),
              (n.updateValue = function (e) {
                return n.flush((n.value = e));
              }),
              (n.interpolate = function (e, t) {
                return new le(i(n), e, t);
              }),
              (n.value = e),
              (n.animatedStyles = new Set()),
              (n.done = !1),
              (n.startPosition = e),
              (n.lastPosition = e),
              (n.lastVelocity = void 0),
              (n.lastTime = void 0),
              (n.controller = void 0),
              n
            );
          }
          return (
            u(r, [
              {
                key: "flush",
                value: function () {
                  0 === this.animatedStyles.size && this.updateStyles(),
                    this.animatedStyles.forEach(function (e) {
                      return e.update();
                    });
                },
              },
              {
                key: "prepare",
                value: function (e) {
                  void 0 === this.controller && (this.controller = e),
                    this.controller === e &&
                      ((this.startPosition = this.value),
                      (this.lastPosition = this.value),
                      (this.lastVelocity = e.isActive
                        ? this.lastVelocity
                        : void 0),
                      (this.lastTime = e.isActive ? this.lastTime : void 0),
                      (this.done = !1),
                      this.animatedStyles.clear());
                },
              },
            ]),
            r
          );
        })(W),
        de = (function (e) {
          a(r, e);
          var t = f(r);

          function r(e) {
            var n, o;
            return (
              l(this, r),
              (n = t.call(this)),
              (o = i(n)),
              (n.setValue = function (e, t) {
                void 0 === t && (t = !0),
                  Array.isArray(e)
                    ? e.length === o.payload.length &&
                      e.forEach(function (e, r) {
                        return o.payload[r].setValue(e, t);
                      })
                    : o.payload.forEach(function (r, n) {
                        return o.payload[n].setValue(e, t);
                      });
              }),
              (n.getValue = function () {
                return n.payload.map(function (e) {
                  return e.getValue();
                });
              }),
              (n.interpolate = function (e, t) {
                return new le(i(n), e, t);
              }),
              (n.payload = e.map(function (e) {
                return new ue(e);
              })),
              n
            );
          }
          return r;
        })(B);

      function pe(e, t) {
        return null == e ? t : e;
      }

      function fe(e) {
        return void 0 !== e ? (Array.isArray(e) ? e : [e]) : [];
      }

      function he(e, t) {
        if (typeof e != typeof t) return !1;
        if ("string" == typeof e || "number" == typeof e) return e === t;
        var r;
        for (r in e) if (!(r in t)) return !1;
        for (r in t) if (e[r] !== t[r]) return !1;
        return void 0 !== r || e === t;
      }

      function me(e) {
        for (
          var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
          n < t;
          n++
        )
          r[n - 1] = arguments[n];
        return "function" == typeof e ? e.apply(void 0, r) : e;
      }

      function be(e) {
        return Object.keys(e).map(function (t) {
          return e[t];
        });
      }

      function ge(e) {
        var t = (function (e) {
            return (
              e.to,
              e.from,
              e.config,
              e.native,
              e.onStart,
              e.onRest,
              e.onFrame,
              e.children,
              e.reset,
              e.reverse,
              e.force,
              e.immediate,
              e.impl,
              e.inject,
              e.delay,
              e.attach,
              e.destroyed,
              e.interpolateTo,
              e.autoStart,
              e.ref,
              m(e, [
                "to",
                "from",
                "config",
                "native",
                "onStart",
                "onRest",
                "onFrame",
                "children",
                "reset",
                "reverse",
                "force",
                "immediate",
                "impl",
                "inject",
                "delay",
                "attach",
                "destroyed",
                "interpolateTo",
                "autoStart",
                "ref",
              ])
            );
          })(e),
          r = Object.keys(e).reduce(function (r, o) {
            return void 0 !== t[o] ? r : b({}, r, n({}, o, e[o]));
          }, {});
        return b(
          {
            to: t,
          },
          r
        );
      }

      function ye(e, t) {
        var r = t[0],
          o = t[1];
        return b({}, e, n({}, r, new (Array.isArray(o) ? de : ue)(o)));
      }

      function ve(e) {
        var t = e.from,
          r = e.to,
          n = e.native,
          o = Object.entries(b({}, t, r));
        return n ? o.reduce(ye, {}) : b({}, t, r);
      }

      function we(e, t) {
        return (
          t &&
            ("function" == typeof t
              ? t(e)
              : "object" == typeof t && (t.current = e)),
          e
        );
      }
      var Oe = function (e) {
        return "auto" === e;
      };
      var je = {
          animationIterationCount: !0,
          borderImageOutset: !0,
          borderImageSlice: !0,
          borderImageWidth: !0,
          boxFlex: !0,
          boxFlexGroup: !0,
          boxOrdinalGroup: !0,
          columnCount: !0,
          columns: !0,
          flex: !0,
          flexGrow: !0,
          flexPositive: !0,
          flexShrink: !0,
          flexNegative: !0,
          flexOrder: !0,
          gridRow: !0,
          gridRowEnd: !0,
          gridRowSpan: !0,
          gridRowStart: !0,
          gridColumn: !0,
          gridColumnEnd: !0,
          gridColumnSpan: !0,
          gridColumnStart: !0,
          fontWeight: !0,
          lineClamp: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          tabSize: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
          fillOpacity: !0,
          floodOpacity: !0,
          stopOpacity: !0,
          strokeDasharray: !0,
          strokeDashoffset: !0,
          strokeMiterlimit: !0,
          strokeOpacity: !0,
          strokeWidth: !0,
        },
        xe = ["Webkit", "Ms", "Moz", "O"];

      function ke(e, t, r) {
        return null == t || "boolean" == typeof t || "" === t
          ? ""
          : r ||
            "number" != typeof t ||
            0 === t ||
            (je.hasOwnProperty(e) && je[e])
          ? ("" + t).trim()
          : t + "px";
      }
      je = Object.keys(je).reduce(function (e, t) {
        return (
          xe.forEach(function (r) {
            return (e[
              (function (e, t) {
                return e + t.charAt(0).toUpperCase() + t.substring(1);
              })(r, t)
            ] = e[t]);
          }),
          e
        );
      }, je);
      var Se = {};
      L(function (e) {
        return new F(e);
      }),
        P("div"),
        _(function (e) {
          var t = e.output
              .map(function (e) {
                return e.replace(ce, ie);
              })
              .map(function (e) {
                return e.replace(se, ie);
              }),
            r = t[0].match(ae).map(function () {
              return [];
            });
          t.forEach(function (e) {
            e.match(ae).forEach(function (e, t) {
              return r[t].push(+e);
            });
          });
          var n = t[0].match(ae).map(function (t, n) {
            return V.create(
              b({}, e, {
                output: r[n],
              })
            );
          });
          return function (e) {
            var r = 0;
            return t[0]
              .replace(ae, function () {
                return n[r++](e);
              })
              .replace(
                /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
                function (e, t, r, n, o) {
                  return "rgba("
                    .concat(Math.round(t), ", ")
                    .concat(Math.round(r), ", ")
                    .concat(Math.round(n), ", ")
                    .concat(o, ")");
                }
              );
          };
        }),
        R(D),
        C(function (e, t) {
          var r = e.from,
            o = e.to,
            i = e.children;
          if (be(o).some(Oe) || be(r).some(Oe)) {
            var a = i(ve(e));
            if (a) {
              Array.isArray(a) &&
                (a = {
                  type: "div",
                  props: {
                    children: a,
                  },
                });
              var c = a.props.style;
              return g.createElement(
                a.type,
                b(
                  {
                    key: a.key ? a.key : void 0,
                  },
                  a.props,
                  {
                    style: b({}, c, {
                      position: "absolute",
                      visibility: "hidden",
                    }),
                    ref: function (i) {
                      if (i) {
                        var a,
                          c,
                          s = y.findDOMNode(i),
                          l = getComputedStyle(s);
                        if ("border-box" === l.boxSizing)
                          (a = s.offsetWidth), (c = s.offsetHeight);
                        else {
                          var u =
                              parseFloat(l.paddingLeft || 0) +
                              parseFloat(l.paddingRight || 0),
                            d =
                              parseFloat(l.paddingTop || 0) +
                              parseFloat(l.paddingBottom || 0),
                            p =
                              parseFloat(l.borderLeftWidth || 0) +
                              parseFloat(l.borderRightWidth || 0),
                            f =
                              parseFloat(l.borderTopWidth || 0) +
                              parseFloat(l.borderBottomWidth || 0);
                          (a = s.offsetWidth - u - p),
                            (c = s.offsetHeight - d - f);
                        }
                        var h = (function (e, t) {
                          return function (r, o) {
                            var i = o[0],
                              a = o[1];
                            return b(
                              {},
                              r,
                              n(
                                {},
                                i,
                                "auto" === a
                                  ? ~i.indexOf("height")
                                    ? t
                                    : e
                                  : a
                              )
                            );
                          };
                        })(a, c);
                        t(
                          b({}, e, {
                            from: Object.entries(r).reduce(h, r),
                            to: Object.entries(o).reduce(h, o),
                          })
                        );
                      }
                    },
                  }
                )
              );
            }
          }
        }),
        A(
          function (e, t) {
            if (!e.nodeType || void 0 === e.setAttribute) return !1;
            var r = t.style,
              n = t.children,
              o = t.scrollTop,
              i = t.scrollLeft,
              a = m(t, ["style", "children", "scrollTop", "scrollLeft"]);
            for (var c in (void 0 !== o && (e.scrollTop = o),
            void 0 !== i && (e.scrollLeft = i),
            void 0 !== n && (e.textContent = n),
            r))
              if (r.hasOwnProperty(c)) {
                var s = 0 === c.indexOf("--"),
                  l = ke(c, r[c], s);
                "float" === c && (c = "cssFloat"),
                  s ? e.style.setProperty(c, l) : (e.style[c] = l);
              }
            for (var u in a) {
              var d =
                Se[u] ||
                (Se[u] = u.replace(/([A-Z])/g, function (e) {
                  return "-" + e.toLowerCase();
                }));
              void 0 !== e.getAttribute(d) && e.setAttribute(d, a[u]);
            }
          },
          function (e) {
            return e;
          }
        );
      var Te = !1,
        Ee = new Set(),
        Ae = function e() {
          var t,
            r = S(),
            n = d(Ee);
          try {
            for (n.s(); !(t = n.n()).done; ) {
              for (
                var o = t.value, i = !0, a = !0, c = 0;
                c < o.configs.length;
                c++
              ) {
                for (
                  var s = o.configs[c], l = void 0, u = void 0, p = 0;
                  p < s.animatedValues.length;
                  p++
                ) {
                  var f = s.animatedValues[p];
                  if (!f.done) {
                    var h = s.fromValues[p],
                      m = s.toValues[p],
                      b = f.lastPosition,
                      g = m instanceof z,
                      y = Array.isArray(s.initialVelocity)
                        ? s.initialVelocity[p]
                        : s.initialVelocity;
                    if (
                      (g && (m = m.getValue()),
                      s.immediate || (!g && !s.decay && h === m))
                    )
                      f.updateValue(m), (f.done = !0);
                    else if (s.delay && r - o.startTime < s.delay) i = !1;
                    else if (
                      ((a = !1), "string" != typeof h && "string" != typeof m)
                    ) {
                      if (void 0 !== s.duration)
                        (b =
                          h +
                          s.easing((r - o.startTime - s.delay) / s.duration) *
                            (m - h)),
                          (l = r >= o.startTime + s.delay + s.duration);
                      else if (s.decay)
                        (b =
                          h +
                          (y / (1 - 0.998)) *
                            (1 - Math.exp(-(1 - 0.998) * (r - o.startTime)))),
                          (l = Math.abs(f.lastPosition - b) < 0.1) && (m = b);
                      else {
                        (u = void 0 !== f.lastTime ? f.lastTime : r),
                          (y =
                            void 0 !== f.lastVelocity
                              ? f.lastVelocity
                              : s.initialVelocity),
                          r > u + 64 && (u = r);
                        for (var v = Math.floor(r - u), w = 0; w < v; ++w) {
                          b +=
                            (1 *
                              (y +=
                                (1 *
                                  ((-s.tension * (b - m) + -s.friction * y) /
                                    s.mass)) /
                                1e3)) /
                            1e3;
                        }
                        var O =
                            !(!s.clamp || 0 === s.tension) &&
                            (h < m ? b > m : b < m),
                          x = Math.abs(y) <= s.precision,
                          k = 0 === s.tension || Math.abs(m - b) <= s.precision;
                        (l = O || (x && k)),
                          (f.lastVelocity = y),
                          (f.lastTime = r);
                      }
                      g && !s.toValues[p].done && (l = !1),
                        l
                          ? (f.value !== m && (b = m), (f.done = !0))
                          : (i = !1),
                        f.updateValue(b),
                        (f.lastPosition = b);
                    } else f.updateValue(m), (f.done = !0);
                  }
                }
                (!o.props.onFrame && o.props.native) ||
                  (o.animatedProps[s.name] = s.interpolation.getValue());
              }
              (!o.props.onFrame && o.props.native) ||
                (!o.props.native && o.onUpdate && o.onUpdate(),
                o.props.onFrame && o.props.onFrame(o.animatedProps)),
                i &&
                  (Ee.delete(o),
                  o.debouncedOnEnd({
                    finished: !0,
                    noChange: a,
                  }));
            }
          } catch (T) {
            n.e(T);
          } finally {
            n.f();
          }
          Ee.size ? j(e) : (Te = !1);
        },
        Re = function (e) {
          Ee.has(e) && Ee.delete(e);
        },
        Ce = (function () {
          function e(t, r) {
            var n = this;
            l(this, e),
              void 0 === r &&
                (r = {
                  native: !0,
                  interpolateTo: !0,
                  autoStart: !0,
                }),
              (this.getValues = function () {
                return n.props.native ? n.interpolations : n.animatedProps;
              }),
              (this.dependents = new Set()),
              (this.isActive = !1),
              (this.hasChanged = !1),
              (this.props = {}),
              (this.merged = {}),
              (this.animations = {}),
              (this.interpolations = {}),
              (this.animatedProps = {}),
              (this.configs = []),
              (this.frame = void 0),
              (this.startTime = void 0),
              (this.lastTime = void 0),
              this.update(b({}, t, r));
          }
          return (
            u(e, [
              {
                key: "update",
                value: function (e) {
                  var t = this;
                  this.props = b({}, this.props, e);
                  var r = this.props.interpolateTo
                      ? ge(this.props)
                      : this.props,
                    o = r.from,
                    i = void 0 === o ? {} : o,
                    a = r.to,
                    c = void 0 === a ? {} : a,
                    s = r.config,
                    l = void 0 === s ? {} : s,
                    u = r.delay,
                    d = void 0 === u ? 0 : u,
                    p = r.reverse,
                    f = r.attach,
                    h = r.reset,
                    m = r.immediate,
                    g = r.autoStart,
                    y = r.ref;
                  if (p) {
                    var v = [c, i];
                    (i = v[0]), (c = v[1]);
                  }
                  this.hasChanged = !1;
                  var w = f && f(this),
                    j = h ? {} : this.merged;
                  if (
                    ((this.merged = b({}, i, j, c)),
                    (this.animations = Object.entries(this.merged).reduce(
                      function (e, r, o) {
                        var a,
                          c,
                          s = r[0],
                          u = r[1],
                          p = (!h && e[s]) || {},
                          f = "number" == typeof u,
                          g =
                            "string" == typeof u &&
                            !u.startsWith("#") &&
                            !/\d/.test(u) &&
                            !O[u],
                          y = !f && !g && Array.isArray(u),
                          v = void 0 !== i[s] ? i[s] : u,
                          j = f || y || g ? u : 1,
                          x = me(l, s);
                        if (
                          (w && (j = w.animations[s].parent),
                          void 0 === x.decay && he(p.changes, u))
                        )
                          return e;
                        if (((t.hasChanged = !0), f || g))
                          a = c = p.parent || new ue(v);
                        else if (y) a = c = p.parent || new de(v);
                        else {
                          var k =
                            p.interpolation &&
                            p.interpolation.calc(p.parent.value);
                          p.parent
                            ? (a = p.parent).setValue(0, !1)
                            : (a = new ue(0));
                          var S = {
                            output: [void 0 !== k ? k : v, u],
                          };
                          p.interpolation
                            ? ((c = p.interpolation),
                              p.interpolation.updateConfig(S))
                            : (c = a.interpolate(S));
                        }
                        me(m, s) && a.setValue(u, !1);
                        var T = fe(a.getPayload());
                        return (
                          T.forEach(function (e) {
                            return e.prepare(t);
                          }),
                          b(
                            {},
                            e,
                            n(
                              {},
                              s,
                              b({}, p, {
                                name: s,
                                parent: a,
                                interpolation: c,
                                animatedValues: T,
                                changes: u,
                                fromValues: fe(a.getValue()),
                                toValues: fe(w ? j.getPayload() : j),
                                immediate: me(m, s),
                                delay: pe(x.delay, d || 0),
                                initialVelocity: pe(x.velocity, 0),
                                clamp: pe(x.clamp, !1),
                                precision: pe(x.precision, 0.01),
                                tension: pe(x.tension, 170),
                                friction: pe(x.friction, 26),
                                mass: pe(x.mass, 1),
                                duration: x.duration,
                                easing: pe(x.easing, function (e) {
                                  return e;
                                }),
                                decay: x.decay,
                              })
                            )
                          )
                        );
                      },
                      this.animations
                    )),
                    this.hasChanged)
                  )
                    for (var x in ((this.configs = be(this.animations)),
                    (this.animatedProps = {}),
                    (this.interpolations = {}),
                    this.animations))
                      (this.interpolations[x] =
                        this.animations[x].interpolation),
                        (this.animatedProps[x] =
                          this.animations[x].interpolation.getValue());
                  for (
                    var k = arguments.length,
                      S = new Array(k > 1 ? k - 1 : 0),
                      T = 1;
                    T < k;
                    T++
                  )
                    S[T - 1] = arguments[T];
                  y || (!g && !S.length) || this.start.apply(this, S);
                  var E = S[0],
                    A = S[1];
                  return (
                    (this.onEnd = "function" == typeof E && E),
                    (this.onUpdate = A),
                    this.getValues()
                  );
                },
              },
              {
                key: "start",
                value: function (e, t) {
                  var r,
                    n = this;
                  return (
                    (this.startTime = S()),
                    this.isActive && this.stop(),
                    (this.isActive = !0),
                    (this.onEnd = "function" == typeof e && e),
                    (this.onUpdate = t),
                    this.props.onStart && this.props.onStart(),
                    (r = this),
                    Ee.has(r) || (Ee.add(r), Te || j(Ae), (Te = !0)),
                    new Promise(function (e) {
                      return (n.resolve = e);
                    })
                  );
                },
              },
              {
                key: "stop",
                value: function (e) {
                  void 0 === e && (e = !1),
                    e &&
                      be(this.animations).forEach(function (e) {
                        return (e.changes = void 0);
                      }),
                    this.debouncedOnEnd({
                      finished: e,
                    });
                },
              },
              {
                key: "destroy",
                value: function () {
                  Re(this),
                    (this.props = {}),
                    (this.merged = {}),
                    (this.animations = {}),
                    (this.interpolations = {}),
                    (this.animatedProps = {}),
                    (this.configs = []);
                },
              },
              {
                key: "debouncedOnEnd",
                value: function (e) {
                  Re(this), (this.isActive = !1);
                  var t = this.onEnd;
                  (this.onEnd = null),
                    t && t(e),
                    this.resolve && this.resolve(),
                    (this.resolve = null);
                },
              },
            ]),
            e
          );
        })(),
        _e = (function (e) {
          a(r, e);
          var t = f(r);

          function r(e, n) {
            var o;
            return (
              l(this, r),
              (o = t.call(this)),
              e.style &&
                (e = b({}, e, {
                  style: E(e.style),
                })),
              (o.payload = e),
              (o.update = n),
              o.attach(),
              o
            );
          }
          return r;
        })(N);

      function Pe(e) {
        var t = (function (t) {
          a(n, t);
          var r = f(n);

          function n(e) {
            var t;
            return (
              l(this, n),
              ((t = r.call(this)).callback = function () {
                t.node &&
                  !1 ===
                    w.fn(t.node, t.propsAnimated.getAnimatedValue(), i(t)) &&
                  t.forceUpdate();
              }),
              t.attachProps(e),
              t
            );
          }
          return (
            u(n, [
              {
                key: "componentWillUnmount",
                value: function () {
                  this.propsAnimated && this.propsAnimated.detach();
                },
              },
              {
                key: "setNativeProps",
                value: function (e) {
                  !1 === w.fn(this.node, e, this) && this.forceUpdate();
                },
              },
              {
                key: "attachProps",
                value: function (e) {
                  e.forwardRef;
                  var t = m(e, ["forwardRef"]),
                    r = this.propsAnimated;
                  (this.propsAnimated = new _e(t, this.callback)),
                    r && r.detach();
                },
              },
              {
                key: "shouldComponentUpdate",
                value: function (e) {
                  var t = e.style,
                    r = m(e, ["style"]),
                    n = this.props,
                    o = n.style;
                  return (
                    (!he(m(n, ["style"]), r) || !he(o, t)) &&
                    (this.attachProps(e), !0)
                  );
                },
              },
              {
                key: "render",
                value: function () {
                  var t = this,
                    r = this.propsAnimated.getValue(),
                    n =
                      (r.scrollTop,
                      r.scrollLeft,
                      m(r, ["scrollTop", "scrollLeft"]));
                  return g.createElement(
                    e,
                    b({}, n, {
                      ref: function (e) {
                        return (t.node = we(e, t.props.forwardRef));
                      },
                    })
                  );
                },
              },
            ]),
            n
          );
        })(g.Component);
        return g.forwardRef(function (e, r) {
          return g.createElement(
            t,
            b({}, e, {
              forwardRef: r,
            })
          );
        });
      }
      var Le = {
          default: {
            tension: 170,
            friction: 26,
          },
          gentle: {
            tension: 120,
            friction: 14,
          },
          wobbly: {
            tension: 180,
            friction: 12,
          },
          stiff: {
            tension: 210,
            friction: 20,
          },
          slow: {
            tension: 280,
            friction: 60,
          },
          molasses: {
            tension: 280,
            friction: 120,
          },
        },
        Me = (function (e) {
          a(r, e);
          var t = f(r);

          function r() {
            var e;
            return (
              l(this, r),
              ((e = t.apply(this, arguments)).state = {
                lastProps: {
                  from: {},
                  to: {},
                },
                propsChanged: !1,
                internal: !1,
              }),
              (e.controller = new Ce(null, null)),
              (e.didUpdate = !1),
              (e.didInject = !1),
              (e.finished = !0),
              (e.start = function () {
                e.finished = !1;
                var t = e.mounted;
                e.controller.start(function (r) {
                  return e.finish(
                    b({}, r, {
                      wasMounted: t,
                    })
                  );
                }, e.update);
              }),
              (e.stop = function () {
                return e.controller.stop(!0);
              }),
              (e.update = function () {
                return (
                  e.mounted &&
                  e.setState({
                    internal: !0,
                  })
                );
              }),
              (e.finish = function (t) {
                var r = t.finished,
                  n = t.noChange,
                  o = t.wasMounted;
                (e.finished = !0),
                  e.mounted &&
                    r &&
                    (!e.props.onRest ||
                      (!o && n) ||
                      e.props.onRest(e.controller.merged),
                    e.mounted &&
                      e.didInject &&
                      ((e.afterInject = ve(e.props)),
                      e.setState({
                        internal: !0,
                      })),
                    e.mounted &&
                      (e.didInject || e.props.after) &&
                      e.setState({
                        internal: !0,
                      }),
                    (e.didInject = !1));
              }),
              e
            );
          }
          return (
            u(
              r,
              [
                {
                  key: "componentDidMount",
                  value: function () {
                    this.componentDidUpdate(), (this.mounted = !0);
                  },
                },
                {
                  key: "componentWillUnmount",
                  value: function () {
                    (this.mounted = !1), this.stop();
                  },
                },
                {
                  key: "render",
                  value: function () {
                    var e = this,
                      t = this.props.children,
                      r = this.state.propsChanged;
                    if (this.props.inject && r && !this.injectProps) {
                      var n = this.props.inject(this.props, function (t) {
                        (e.injectProps = t),
                          e.setState({
                            internal: !0,
                          });
                      });
                      if (n) return n;
                    }
                    (this.injectProps || r) &&
                      ((this.didInject = !1),
                      this.injectProps
                        ? (this.controller.update(this.injectProps),
                          (this.didInject = !0))
                        : r && this.controller.update(this.props),
                      (this.didUpdate = !0),
                      (this.afterInject = void 0),
                      (this.injectProps = void 0));
                    var o = b(
                      {},
                      this.controller.getValues(),
                      this.afterInject
                    );
                    return (
                      this.finished && (o = b({}, o, this.props.after)),
                      Object.keys(o).length ? t(o) : null
                    );
                  },
                },
                {
                  key: "componentDidUpdate",
                  value: function () {
                    this.didUpdate && this.start(), (this.didUpdate = !1);
                  },
                },
              ],
              [
                {
                  key: "getDerivedStateFromProps",
                  value: function (e, t) {
                    var r = t.internal,
                      n = t.lastProps,
                      o = e.from,
                      i = e.to,
                      a = e.reset,
                      c = e.force;
                    return {
                      propsChanged:
                        !he(i, n.to) ||
                        !he(o, n.from) ||
                        (a && !r) ||
                        (c && !r),
                      lastProps: e,
                      internal: !1,
                    };
                  },
                },
              ]
            ),
            r
          );
        })(g.Component);
      Me.defaultProps = {
        from: {},
        to: {},
        config: Le.default,
        native: !1,
        immediate: !1,
        reset: !1,
        force: !1,
        inject: v,
      };
      var ze = (function (e) {
        a(r, e);
        var t = f(r);

        function r() {
          var e;
          return (
            l(this, r),
            ((e = t.apply(this, arguments)).first = !0),
            (e.instances = new Set()),
            (e.hook = function (t, r, n, o) {
              return (
                e.instances.add(t),
                (o ? r === n - 1 : 0 === r)
                  ? void 0
                  : Array.from(e.instances)[o ? r + 1 : r - 1]
              );
            }),
            e
          );
        }
        return (
          u(r, [
            {
              key: "render",
              value: function () {
                var e = this,
                  t = this.props,
                  r = t.items,
                  n = t.children,
                  o = t.from,
                  i = void 0 === o ? {} : o,
                  a = t.initial,
                  c = t.reverse,
                  s = t.keys,
                  l = t.delay,
                  u = t.onRest,
                  d = m(t, [
                    "items",
                    "children",
                    "from",
                    "initial",
                    "reverse",
                    "keys",
                    "delay",
                    "onRest",
                  ]),
                  p = fe(r);
                return fe(p).map(function (t, r) {
                  return g.createElement(
                    Me,
                    b(
                      {
                        onRest: 0 === r ? u : null,
                        key: "function" == typeof s ? s(t) : fe(s)[r],
                        from: e.first && void 0 !== a ? a || {} : i,
                      },
                      d,
                      {
                        delay: (0 === r && l) || void 0,
                        attach: function (t) {
                          return e.hook(t, r, p.length, c);
                        },
                        children: function (e) {
                          var o = n(t, r);
                          return o ? o(e) : null;
                        },
                      }
                    )
                  );
                });
              },
            },
            {
              key: "componentDidUpdate",
              value: function (e) {
                (this.first = !1),
                  e.items !== this.props.items && this.instances.clear();
              },
            },
          ]),
          r
        );
      })(g.PureComponent);
      ze.defaultProps = {
        keys: function (e) {
          return e;
        },
      };
      var Ie = (function (e) {
        a(r, e);
        var t = f(r);

        function r() {
          var e, n;
          return (
            l(this, r),
            (e = t.apply(this, arguments)),
            (n = i(e)),
            (e.guid = 0),
            (e.state = {
              props: {},
              resolve: function () {
                return null;
              },
              last: !0,
              index: 0,
            }),
            (e.next = function (e, t, r) {
              return (
                void 0 === t && (t = !0),
                void 0 === r && (r = 0),
                (n.running = !0),
                new Promise(function (o) {
                  n.mounted &&
                    n.setState(
                      function (n) {
                        return {
                          props: e,
                          resolve: o,
                          last: t,
                          index: r,
                        };
                      },
                      function () {
                        return (n.running = !1);
                      }
                    );
                })
              );
            }),
            e
          );
        }
        return (
          u(r, [
            {
              key: "componentDidMount",
              value: function () {
                (this.mounted = !0), this.componentDidUpdate({});
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                this.mounted = !1;
              },
            },
            {
              key: "componentDidUpdate",
              value: function (e) {
                var t = this,
                  r = this,
                  n = this.props,
                  o = n.states,
                  i = n.filter,
                  a = n.state;
                (e.state !== this.props.state ||
                  (this.props.reset && !this.running) ||
                  !he(o[a], e.states[e.state])) &&
                  o &&
                  a &&
                  o[a] &&
                  (function () {
                    var e = ++t.guid,
                      n = o[a];
                    if (n)
                      if (Array.isArray(n))
                        for (
                          var c = Promise.resolve(),
                            s = function (r) {
                              var o = r,
                                a = n[o],
                                s = o === n.length - 1;
                              c = c.then(function () {
                                return e === t.guid && t.next(i(a), s, o);
                              });
                            },
                            l = 0;
                          l < n.length;
                          l++
                        )
                          s(l);
                      else if ("function" == typeof n) {
                        var u = 0;
                        n(
                          function (t, n) {
                            return (
                              void 0 === n && (n = !1),
                              e === r.guid && r.next(i(t), n, u++)
                            );
                          },
                          function () {
                            return j(function () {
                              return t.instance && t.instance.stop();
                            });
                          },
                          t.props
                        );
                      } else t.next(i(o[a]));
                  })();
              },
            },
            {
              key: "render",
              value: function () {
                var e = this,
                  t = this.state,
                  r = t.props,
                  n = t.resolve,
                  o = t.last,
                  i = t.index;
                if (!r || 0 === Object.keys(r).length) return null;
                var a = this.props,
                  c = (a.state, a.filter, a.states, a.config),
                  s = a.primitive,
                  l = a.onRest,
                  u = a.forwardRef,
                  d = m(a, [
                    "state",
                    "filter",
                    "states",
                    "config",
                    "primitive",
                    "onRest",
                    "forwardRef",
                  ]);
                return (
                  Array.isArray(c) && (c = c[i]),
                  g.createElement(
                    s,
                    b(
                      {
                        ref: function (t) {
                          return (e.instance = we(t, u));
                        },
                        config: c,
                      },
                      d,
                      r,
                      {
                        onRest: function (e) {
                          n(e), l && o && l(e);
                        },
                      }
                    )
                  )
                );
              },
            },
          ]),
          r
        );
      })(g.PureComponent);
      Ie.defaultProps = {
        state: "__default",
      };
      var We = g.forwardRef(function (e, t) {
        return g.createElement(
          Ie,
          b({}, e, {
            forwardRef: t,
          })
        );
      });
      (We.create = function (e) {
        return function (t, r) {
          return (
            void 0 === r &&
              (r = function (e) {
                return e;
              }),
            ("function" == typeof t || Array.isArray(t)) &&
              (t = n({}, "__default", t)),
            function (n) {
              return g.createElement(
                Ie,
                b(
                  {
                    primitive: e,
                    states: t,
                    filter: r,
                  },
                  n
                )
              );
            }
          );
        };
      }),
        (We.Spring = function (e) {
          return We.create(Me)(e, ge);
        }),
        (We.Trail = function (e) {
          return We.create(ze)(e, ge);
        });
      var Be = 0,
        Ne = function (e) {
          var t = e.items,
            r = e.keys,
            n = m(e, ["items", "keys"]);
          return (
            (t = fe(void 0 !== t ? t : null)),
            (r = "function" == typeof r ? t.map(r) : fe(r)),
            b(
              {
                items: t,
                keys: r.map(function (e) {
                  return String(e);
                }),
              },
              n
            )
          );
        },
        Fe = (function (e) {
          a(r, e);
          var t = f(r);

          function r(e) {
            var n;
            return (
              l(this, r),
              ((n = t.call(this, e)).destroyItem = function (e, t, r) {
                return function (o) {
                  var i = n.props,
                    a = i.onRest,
                    c = i.onDestroyed;
                  n.mounted &&
                    (c && c(e),
                    n.setState(function (e) {
                      return {
                        deleted: e.deleted.filter(function (e) {
                          return e.key !== t;
                        }),
                      };
                    }),
                    a && a(e, r, o));
                };
              }),
              (n.state = {
                first: !0,
                transitions: [],
                current: {},
                deleted: [],
                prevProps: e,
              }),
              n
            );
          }
          return (
            u(
              r,
              [
                {
                  key: "componentDidMount",
                  value: function () {
                    this.mounted = !0;
                  },
                },
                {
                  key: "componentWillUnmount",
                  value: function () {
                    this.mounted = !1;
                  },
                },
                {
                  key: "render",
                  value: function () {
                    var e = this,
                      t = this.props,
                      r =
                        (t.initial,
                        t.from,
                        t.enter,
                        t.leave,
                        t.update,
                        t.onDestroyed,
                        t.keys,
                        t.items,
                        t.onFrame),
                      o = t.onRest,
                      i = t.onStart,
                      a = (t.trail, t.config, t.children),
                      c = (t.unique, t.reset),
                      s = m(t, [
                        "initial",
                        "from",
                        "enter",
                        "leave",
                        "update",
                        "onDestroyed",
                        "keys",
                        "items",
                        "onFrame",
                        "onRest",
                        "onStart",
                        "trail",
                        "config",
                        "children",
                        "unique",
                        "reset",
                      ]);
                    return this.state.transitions.map(function (t, l) {
                      var u = t.state,
                        d = t.key,
                        p = t.item,
                        f = t.from,
                        h = t.to,
                        m = t.trail,
                        y = t.config,
                        v = t.destroyed;
                      return g.createElement(
                        We,
                        b(
                          {
                            reset: c && "enter" === u,
                            primitive: Me,
                            state: u,
                            filter: ge,
                            states: n({}, u, h),
                            key: d,
                            onRest: v
                              ? e.destroyItem(p, d, u)
                              : o &&
                                function (e) {
                                  return o(p, u, e);
                                },
                            onStart:
                              i &&
                              function () {
                                return i(p, u);
                              },
                            onFrame:
                              r &&
                              function (e) {
                                return r(p, u, e);
                              },
                            delay: m,
                            config: y,
                          },
                          s,
                          {
                            from: f,
                            children: function (e) {
                              var t = a(p, u, l);
                              return t ? t(e) : null;
                            },
                          }
                        )
                      );
                    });
                  },
                },
              ],
              [
                {
                  key: "getDerivedStateFromProps",
                  value: function (e, t) {
                    var r = t.first,
                      n = t.prevProps,
                      i = m(t, ["first", "prevProps"]),
                      a = Ne(e),
                      c = a.items,
                      s = a.keys,
                      l = a.initial,
                      u = a.from,
                      d = a.enter,
                      p = a.leave,
                      f = a.update,
                      h = a.trail,
                      g = void 0 === h ? 0 : h,
                      y = a.unique,
                      v = a.config,
                      w = Ne(n),
                      O = w.keys,
                      j = w.items,
                      x = b({}, i.current),
                      k = o(i.deleted),
                      S = Object.keys(x),
                      T = new Set(S),
                      E = new Set(s),
                      A = s.filter(function (e) {
                        return !T.has(e);
                      }),
                      R = i.transitions
                        .filter(function (e) {
                          return !e.destroyed && !E.has(e.originalKey);
                        })
                        .map(function (e) {
                          return e.originalKey;
                        }),
                      C = s.filter(function (e) {
                        return T.has(e);
                      }),
                      _ = 0;
                    A.forEach(function (e) {
                      y &&
                        k.find(function (t) {
                          return t.originalKey === e;
                        }) &&
                        (k = k.filter(function (t) {
                          return t.originalKey !== e;
                        }));
                      var t = s.indexOf(e),
                        n = c[t];
                      x[e] = {
                        state: "enter",
                        originalKey: e,
                        key: y ? String(e) : Be++,
                        item: n,
                        trail: (_ += g),
                        config: me(v, n, "enter"),
                        from: me(r && void 0 !== l ? l || {} : u, n),
                        to: me(d, n),
                      };
                    }),
                      R.forEach(function (e) {
                        var t = O.indexOf(e),
                          r = j[t];
                        k.push(
                          b({}, x[e], {
                            state: "leave",
                            destroyed: !0,
                            left: O[Math.max(0, t - 1)],
                            right: O[Math.min(O.length, t + 1)],
                            trail: (_ += g),
                            config: me(v, r, "leave"),
                            to: me(p, r),
                          })
                        ),
                          delete x[e];
                      }),
                      C.forEach(function (e) {
                        var t = s.indexOf(e),
                          r = c[t];
                        x[e] = b({}, x[e], {
                          item: r,
                          state: "update",
                          trail: (_ += g),
                          config: me(v, r, "update"),
                          to: me(f, r),
                        });
                      });
                    var P = s.map(function (e) {
                      return x[e];
                    });
                    return (
                      k.forEach(function (e) {
                        var t,
                          r = e.left,
                          n = e.right,
                          i = m(e, ["left", "right"]);
                        -1 !==
                          (t = P.findIndex(function (e) {
                            return e.originalKey === r;
                          })) && (t += 1),
                          -1 === t &&
                            (t = P.findIndex(function (e) {
                              return e.originalKey === n;
                            })),
                          -1 === t &&
                            (t = k.findIndex(function (e) {
                              return e.originalKey === r;
                            })),
                          -1 === t &&
                            (t = k.findIndex(function (e) {
                              return e.originalKey === n;
                            })),
                          (t = Math.max(0, t)),
                          (P = [].concat(o(P.slice(0, t)), [i], o(P.slice(t))));
                      }),
                      {
                        first: r && 0 === A.length,
                        transitions: P,
                        current: x,
                        deleted: k,
                        prevProps: e,
                      }
                    );
                  },
                },
              ]
            ),
            r
          );
        })(g.PureComponent);
      Fe.defaultProps = {
        keys: function (e) {
          return e;
        },
        unique: !1,
        reset: !1,
      };
      var De = [
        "a",
        "abbr",
        "address",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "base",
        "bdi",
        "bdo",
        "big",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "cite",
        "code",
        "col",
        "colgroup",
        "data",
        "datalist",
        "dd",
        "del",
        "details",
        "dfn",
        "dialog",
        "div",
        "dl",
        "dt",
        "em",
        "embed",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hgroup",
        "hr",
        "html",
        "i",
        "iframe",
        "img",
        "input",
        "ins",
        "kbd",
        "keygen",
        "label",
        "legend",
        "li",
        "link",
        "main",
        "map",
        "mark",
        "marquee",
        "menu",
        "menuitem",
        "meta",
        "meter",
        "nav",
        "noscript",
        "object",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "param",
        "picture",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "script",
        "section",
        "select",
        "small",
        "source",
        "span",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "title",
        "tr",
        "track",
        "u",
        "ul",
        "var",
        "video",
        "wbr",
        "circle",
        "clipPath",
        "defs",
        "ellipse",
        "foreignObject",
        "g",
        "image",
        "line",
        "linearGradient",
        "mask",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialGradient",
        "rect",
        "stop",
        "svg",
        "text",
        "tspan",
      ].reduce(function (e, t) {
        return (e[t] = Pe(t)), e;
      }, Pe);
      (t.Spring = Me),
        (t.Keyframes = We),
        (t.Transition = Fe),
        (t.Trail = ze),
        (t.Controller = Ce),
        (t.config = Le),
        (t.animated = De),
        (t.interpolate = function (e, t, r) {
          return e && new le(e, t, r);
        }),
        (t.Globals = M);
    },
    RIqP: function (e, t, r) {
      var n = r("Ijbi"),
        o = r("EbDI"),
        i = r("ZhPi"),
        a = r("Bnag");
      e.exports = function (e) {
        return n(e) || o(e) || i(e) || a();
      };
    },
    W8MJ: function (e, t) {
      function r(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      e.exports = function (e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e;
      };
    },
    WkPL: function (e, t) {
      e.exports = function (e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n;
      };
    },
    ZhPi: function (e, t, r) {
      var n = r("WkPL");
      e.exports = function (e, t) {
        if (e) {
          if ("string" == typeof e) return n(e, t);
          var r = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === r && e.constructor && (r = e.constructor.name),
            "Map" === r || "Set" === r
              ? Array.from(e)
              : "Arguments" === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? n(e, t)
              : void 0
          );
        }
      };
    },
    a1gu: function (e, t, r) {
      var n = r("cDf5"),
        o = r("PJYZ");
      e.exports = function (e, t) {
        return !t || ("object" !== n(t) && "function" != typeof t) ? o(e) : t;
      };
    },
    bmMU: function (e, t) {
      var r = "undefined" != typeof Element,
        n = "function" == typeof Map,
        o = "function" == typeof Set,
        i = "function" == typeof ArrayBuffer && !!ArrayBuffer.isView;
      e.exports = function (e, t) {
        try {
          return (function e(t, a) {
            if (t === a) return !0;
            if (t && a && "object" == typeof t && "object" == typeof a) {
              if (t.constructor !== a.constructor) return !1;
              var c, s, l, u;
              if (Array.isArray(t)) {
                if ((c = t.length) != a.length) return !1;
                for (s = c; 0 != s--; ) if (!e(t[s], a[s])) return !1;
                return !0;
              }
              if (n && t instanceof Map && a instanceof Map) {
                if (t.size !== a.size) return !1;
                for (u = t.entries(); !(s = u.next()).done; )
                  if (!a.has(s.value[0])) return !1;
                for (u = t.entries(); !(s = u.next()).done; )
                  if (!e(s.value[1], a.get(s.value[0]))) return !1;
                return !0;
              }
              if (o && t instanceof Set && a instanceof Set) {
                if (t.size !== a.size) return !1;
                for (u = t.entries(); !(s = u.next()).done; )
                  if (!a.has(s.value[0])) return !1;
                return !0;
              }
              if (i && ArrayBuffer.isView(t) && ArrayBuffer.isView(a)) {
                if ((c = t.length) != a.length) return !1;
                for (s = c; 0 != s--; ) if (t[s] !== a[s]) return !1;
                return !0;
              }
              if (t.constructor === RegExp)
                return t.source === a.source && t.flags === a.flags;
              if (t.valueOf !== Object.prototype.valueOf)
                return t.valueOf() === a.valueOf();
              if (t.toString !== Object.prototype.toString)
                return t.toString() === a.toString();
              if ((c = (l = Object.keys(t)).length) !== Object.keys(a).length)
                return !1;
              for (s = c; 0 != s--; )
                if (!Object.prototype.hasOwnProperty.call(a, l[s])) return !1;
              if (r && t instanceof Element) return !1;
              for (s = c; 0 != s--; )
                if (
                  (("_owner" !== l[s] && "__v" !== l[s] && "__o" !== l[s]) ||
                    !t.$$typeof) &&
                  !e(t[l[s]], a[l[s]])
                )
                  return !1;
              return !0;
            }
            return t != t && a != a;
          })(e, t);
        } catch (a) {
          if ((a.message || "").match(/stack|recursion/i))
            return (
              console.warn("react-fast-compare cannot handle circular refs"), !1
            );
          throw a;
        }
      };
    },
    jQH1: function (e, t, r) {
      "use strict";
      r.r(t);
      var n = r("q1tI"),
        o = r.n(n),
        i = r("rIun"),
        a = r("qKvR"),
        c = r("2A+t"),
        s = r("qhky"),
        l = r("Wbzz"),
        u = function () {
          return Object(l.useStaticQuery)("2601587176").site.siteMetadata;
        },
        d = function (e) {
          var t = e.title,
            r = void 0 === t ? "" : t,
            n = e.description,
            o = void 0 === n ? "" : n,
            i = e.pathname,
            c = void 0 === i ? "" : i,
            d = e.image,
            p = void 0 === d ? "" : d,
            f = e.children,
            h = void 0 === f ? null : f,
            m = u(),
            b = m.siteTitle,
            g = m.siteTitleAlt,
            y = m.siteUrl,
            v = m.siteDescription,
            w = m.siteLanguage,
            O = m.siteImage,
            j = m.author,
            x = {
              title: r || g,
              description: o || v,
              url: "" + y + (c || ""),
              image: "" + y + (p || O),
            };
          return Object(a.d)(
            s.a,
            {
              title: r,
              defaultTitle: g,
              titleTemplate: "%s | " + b,
            },
            Object(a.d)("html", {
              lang: w,
            }),
            Object(a.d)("meta", {
              name: "description",
              content: x.description,
            }),
            Object(a.d)("meta", {
              name: "image",
              content: x.image,
            }),
            Object(a.d)("meta", {
              property: "og:title",
              content: x.title,
            }),
            Object(a.d)("meta", {
              property: "og:url",
              content: x.url,
            }),
            Object(a.d)("meta", {
              property: "og:description",
              content: x.description,
            }),
            Object(a.d)("meta", {
              property: "og:image",
              content: x.image,
            }),
            Object(a.d)("meta", {
              property: "og:type",
              content: "website",
            }),
            Object(a.d)("meta", {
              property: "og:image:alt",
              content: x.description,
            }),
            Object(a.d)("meta", {
              name: "twitter:card",
              content: "summary_large_image",
            }),
            Object(a.d)("meta", {
              name: "twitter:title",
              content: x.title,
            }),
            Object(a.d)("meta", {
              name: "twitter:url",
              content: x.url,
            }),
            Object(a.d)("meta", {
              name: "twitter:description",
              content: x.description,
            }),
            Object(a.d)("meta", {
              name: "twitter:image",
              content: x.image,
            }),
            Object(a.d)("meta", {
              name: "twitter:image:alt",
              content: x.description,
            }),
            Object(a.d)("meta", {
              name: "twitter:creator",
              content: j,
            }),
            Object(a.d)("meta", {
              name: "gatsby-theme",
              content: "@lekoarts/gatsby-theme-cara",
            }),
            Object(a.d)("link", {
              rel: "icon",
              type: "image/png",
              sizes: "32x32",
              href: Object(l.withPrefix)("/favicon-32x32.png"),
            }),
            Object(a.d)("link", {
              rel: "icon",
              type: "image/png",
              sizes: "16x16",
              href: Object(l.withPrefix)("/favicon-16x16.png"),
            }),
            Object(a.d)("link", {
              rel: "apple-touch-icon",
              sizes: "180x180",
              href: Object(l.withPrefix)("/apple-touch-icon.png"),
            }),
            h
          );
        },
        p = function (e) {
          var t = e.children,
            r = e.className,
            n = void 0 === r ? "" : r;
          return Object(c.c)(
            o.a.Fragment,
            null,
            Object(c.c)(a.a, {
              styles: function (e) {
                return {
                  "*": {
                    boxSizing: "inherit",
                    "&:before": {
                      boxSizing: "inherit",
                    },
                    "&:after": {
                      boxSizing: "inherit",
                    },
                  },
                  html: {
                    fontSize: "18px",
                    WebkitTextSizeAdjust: "100%",
                  },
                  img: {
                    borderStyle: "none",
                  },
                  pre: {
                    fontFamily: "monospace",
                    fontSize: "1em",
                  },
                  "[hidden]": {
                    display: "none",
                  },
                  "::selection": {
                    backgroundColor: e.colors.primary,
                    color: e.colors.background,
                  },
                };
              },
            }),
            Object(c.c)(d, null),
            Object(c.c)(
              "main",
              {
                className: n,
              },
              t
            )
          );
        },
        f = function (e) {
          var t = e.speed,
            r = e.offset,
            n = e.factor,
            o = void 0 === n ? 1 : n,
            a = e.bg,
            s = void 0 === a ? "" : a,
            l = e.fill,
            u = void 0 === l ? "" : l,
            d = e.clipPath,
            p = void 0 === d ? "" : d,
            f = e.children,
            h = void 0 === f ? null : f,
            m = e.className,
            b = void 0 === m ? "" : m;
          return Object(c.c)(
            i.ParallaxLayer,
            {
              sx: {
                position: "absolute",
                width: "full",
                height: "full",
                background: s,
                backgroundColor: s,
                "#contact-wave": {
                  color: u,
                  fill: "currentColor",
                },
                clipPath: p,
              },
              speed: t,
              offset: r,
              factor: o,
              className: b,
            },
            h
          );
        },
        h = function (e) {
          var t = e.className,
            r = void 0 === t ? "" : t,
            n = e.children;
          return Object(c.c)(
            "div",
            {
              sx: {
                width: ["full", "full", "full", "full", "full", "2/3"],
                textAlign: "left",
              },
              className: r,
            },
            n
          );
        },
        m = function (e) {
          var t = e.speed,
            r = e.offset,
            n = e.children,
            o = e.className,
            a = void 0 === o ? "" : o,
            s = e.factor,
            l = void 0 === s ? 1 : s;
          return Object(c.c)(
            i.ParallaxLayer,
            {
              sx: {
                padding: [3, 4, 4, 5],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
              },
              speed: t,
              offset: r,
              factor: l,
              className: a,
            },
            n
          );
        },
        b = ["none", "none", "block"],
        g = {
          triangle: {
            shape: Object(c.c)("polygon", {
              strokeWidth: "1px",
              strokeLinejoin: "round",
              strokeMiterlimit: "10",
              points: "14.921,2.27 28.667,25.5 1.175,25.5 ",
            }),
            viewBox: "0 0 30 30",
          },
          circle: {
            shape: Object(c.c)("path", {
              d: "M15,30A15,15,0,1,1,30,15,15,15,0,0,1,15,30ZM15,6.23A8.77,8.77,0,1,0,23.77,15,8.77,8.77,0,0,0,15,6.23Z",
            }),
            viewBox: "0 0 30 30",
          },
          arrowUp: {
            shape: Object(c.c)(
              o.a.Fragment,
              null,
              Object(c.c)("path", {
                d: "M28.74,20.81H1.26a1.26,1.26,0,0,1-1-2L14.16.5a1.25,1.25,0,0,1,1-.5h0a1.24,1.24,0,0,1,1,.51L29.75,18.8a1.25,1.25,0,0,1-1,2ZM3.81,18.29H26.22L15.16,3.37Z",
              }),
              " ",
              Object(c.c)("path", {
                d: "M28.74,42H1.26a1.28,1.28,0,0,1-1.13-.71A1.26,1.26,0,0,1,.26,40l13.9-18.29a1.28,1.28,0,0,1,1-.5h0a1.24,1.24,0,0,1,1,.51L29.75,40a1.26,1.26,0,0,1,.12,1.32A1.28,1.28,0,0,1,28.74,42ZM3.81,39.47H26.22L15.16,24.55Z",
              })
            ),
            viewBox: "0 0 30 42",
          },
          upDown: {
            shape: Object(c.c)(
              o.a.Fragment,
              null,
              Object(c.c)("path", {
                d: "M28.74,44.58a1.28,1.28,0,0,1-1-.51L15.16,27.13l-12.89,17a1.26,1.26,0,1,1-2-1.53l13.9-18.29a1.34,1.34,0,0,1,1-.5,1.24,1.24,0,0,1,1,.51L29.75,42.56a1.27,1.27,0,0,1-1,2Z",
              }),
              Object(c.c)("path", {
                d: "M14.83,20.82h0a1.28,1.28,0,0,1-1-.52L.25,2a1.27,1.27,0,0,1,2-1.51L14.84,17.45,27.73.5a1.26,1.26,0,0,1,2,1.53L15.84,20.32A1.28,1.28,0,0,1,14.83,20.82Z",
              })
            ),
            viewBox: "0 0 30 44.58",
          },
          box: {
            shape: Object(c.c)("path", {
              d: "M28,2V28H2V2H28m.13-2H1.88A1.88,1.88,0,0,0,0,1.88V28.13A1.88,1.88,0,0,0,1.88,30H28.13A1.87,1.87,0,0,0,30,28.13V1.88A1.88,1.88,0,0,0,28.13,0Z",
            }),
            viewBox: "0 0 30 30",
          },
          hexa: {
            shape: Object(c.c)("polygon", {
              strokeLinejoin: "round",
              strokeMiterlimit: "10",
              points:
                "27.5,21.904 15,28.809  2.5,21.904 2.5,8.095 15,1.19 27.5,8.095 ",
            }),
            viewBox: "0 0 30 30",
          },
          cross: {
            shape: Object(c.c)("path", {
              strokeWidth: "3px",
              d: "M60.5,50l34.8-34.8c2.9-2.9,2.9-7.6,0-10.5c-2.9-2.9-7.6-2.9-10.5,0L50,39.5L15.2,4.7c-2.9-2.9-7.6-2.9-10.5,0    c-2.9,2.9-2.9,7.6,0,10.5L39.5,50L4.7,84.8c-2.9,2.9-2.9,7.6,0,10.5c1.4,1.4,3.3,2.2,5.2,2.2s3.8-0.7,5.2-2.2L50,60.5l34.8,34.8    c1.4,1.4,3.3,2.2,5.2,2.2c1.9,0,3.8-0.7,5.2-2.2c2.9-2.9,2.9-7.6,0-10.5L60.5,50z",
            }),
            viewBox: "0 0 100 100",
          },
        },
        y = function (e) {
          var t = e.stroke,
            r = void 0 !== t && t,
            n = e.color,
            o = void 0 === n ? "" : n,
            i = e.width,
            a = e.icon,
            s = e.left,
            l = e.top,
            u = e.hiddenMobile,
            d = void 0 !== u && u;
          return Object(c.c)(
            "svg",
            {
              sx: {
                position: "absolute",
                stroke: r ? "currentColor" : "none",
                fill: r ? "none" : "currentColor",
                display: d ? b : "block",
                color: o,
                width: i,
                left: s,
                top: l,
              },
              viewBox: g[a].viewBox,
            },
            g[a].shape
          );
        };

      function v(e, t) {
        return t || (t = e.slice(0)), (e.raw = t), e;
      }
      var w,
        O,
        j,
        x = r("wTIg"),
        k = Object(a.e)(
          w ||
            (w = v([
              '\n  0% {\n    d: path("M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z");\n  }\n  50% {\n    d: path("M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z");\n  }\n  100% {\n    d: path("M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 100 Z");\n  }\n',
            ]))
        ),
        S = Object(a.e)(
          O ||
            (O = v([
              "\n  from {\n    transform: translateY(0);\n  }\n  to {\n    transform: translateY(30px);\n  }\n",
            ]))
        ),
        T = Object(a.e)(
          j ||
            (j = v([
              "\n  from {\n    transform: translateY(0);\n  }\n  to {\n    transform: translateY(200px);\n  }\n",
            ]))
        ),
        E = Object(a.c)(S, " 4s ease-in-out infinite alternate;"),
        A = Object(a.c)(T, " 18s ease-in-out infinite alternate;"),
        R = Object(x.a)("div", {
          target: "e70u36t0",
        })(
          "animation:",
          E,
          ";position:absolute;top:0;left:0;right:0;bottom:0;"
        ),
        C = Object(x.a)("div", {
          target: "e70u36t1",
        })(
          "animation:",
          A,
          ";position:absolute;top:0;left:0;right:0;bottom:0;"
        ),
        _ = r("wx14"),
        P = r("zLVn"),
        L = r("7ljp"),
        M = {
          _frontmatter: {},
        };

      function z(e) {
        var t = e.components,
          r = Object(P.default)(e, ["components"]);
        return Object(L.b)(
          "wrapper",
          Object(_.default)({}, M, r, {
            components: t,
            mdxType: "MDXLayout",
          }),
          Object(L.b)("h1", null, "Hi, I'm Bryan Guner"),
          Object(L.b)(
            "p",
            null,
            "I'm an electrical engineer turned web developer who loves creating audio processing and web development education tools. "
          )
        );
      }
      z.isMDXComponent = !0;
      var I,
        W = function (e) {
          var t = e.offset,
            r = e.factor,
            n = void 0 === r ? 1 : r;
          return Object(c.c)(
            "div",
            null,
            Object(c.c)(
              f,
              {
                speed: 0.2,
                offset: t,
                factor: n,
              },
              Object(c.c)(
                R,
                null,
                Object(c.c)(y, {
                  icon: "triangle",
                  hiddenMobile: !0,
                  width: 48,
                  stroke: !0,
                  color: "icon_orange",
                  left: "10%",
                  top: "20%",
                }),
                Object(c.c)(y, {
                  icon: "hexa",
                  width: 48,
                  stroke: !0,
                  color: "icon_red",
                  left: "60%",
                  top: "70%",
                }),
                Object(c.c)(y, {
                  icon: "box",
                  width: 6,
                  color: "icon_darker",
                  left: "60%",
                  top: "15%",
                })
              ),
              Object(c.c)(
                C,
                null,
                Object(c.c)(y, {
                  icon: "arrowUp",
                  hiddenMobile: !0,
                  width: 16,
                  color: "icon_blue",
                  left: "80%",
                  top: "10%",
                }),
                Object(c.c)(y, {
                  icon: "triangle",
                  width: 12,
                  stroke: !0,
                  color: "icon_brightest",
                  left: "90%",
                  top: "50%",
                }),
                Object(c.c)(y, {
                  icon: "circle",
                  width: 16,
                  color: "icon_darker",
                  left: "70%",
                  top: "90%",
                }),
                Object(c.c)(y, {
                  icon: "triangle",
                  width: 16,
                  stroke: !0,
                  color: "icon_darkest",
                  left: "30%",
                  top: "65%",
                }),
                Object(c.c)(y, {
                  icon: "cross",
                  width: 16,
                  stroke: !0,
                  color: "icon_pink",
                  left: "28%",
                  top: "15%",
                }),
                Object(c.c)(y, {
                  icon: "circle",
                  width: 6,
                  color: "icon_darkest",
                  left: "75%",
                  top: "10%",
                }),
                Object(c.c)(y, {
                  icon: "upDown",
                  hiddenMobile: !0,
                  width: 8,
                  color: "icon_darkest",
                  left: "45%",
                  top: "10%",
                })
              ),
              Object(c.c)(y, {
                icon: "circle",
                hiddenMobile: !0,
                width: 24,
                color: "icon_darker",
                left: "5%",
                top: "70%",
              }),
              Object(c.c)(y, {
                icon: "circle",
                width: 6,
                color: "icon_darkest",
                left: "4%",
                top: "20%",
              }),
              Object(c.c)(y, {
                icon: "circle",
                width: 12,
                color: "icon_darkest",
                left: "50%",
                top: "60%",
              }),
              Object(c.c)(y, {
                icon: "upDown",
                width: 8,
                color: "icon_darkest",
                left: "95%",
                top: "90%",
              }),
              Object(c.c)(y, {
                icon: "upDown",
                hiddenMobile: !0,
                width: 24,
                color: "icon_darker",
                left: "40%",
                top: "80%",
              }),
              Object(c.c)(y, {
                icon: "triangle",
                width: 8,
                stroke: !0,
                color: "icon_darker",
                left: "25%",
                top: "5%",
              }),
              Object(c.c)(y, {
                icon: "circle",
                width: 64,
                color: "icon_green",
                left: "95%",
                top: "5%",
              }),
              Object(c.c)(y, {
                icon: "box",
                hiddenMobile: !0,
                width: 64,
                color: "icon_purple",
                left: "5%",
                top: "90%",
              }),
              Object(c.c)(y, {
                icon: "box",
                width: 6,
                color: "icon_darkest",
                left: "10%",
                top: "10%",
              }),
              Object(c.c)(y, {
                icon: "box",
                width: 12,
                color: "icon_darkest",
                left: "40%",
                top: "30%",
              }),
              Object(c.c)(y, {
                icon: "hexa",
                width: 16,
                stroke: !0,
                color: "icon_darker",
                left: "10%",
                top: "50%",
              }),
              Object(c.c)(y, {
                icon: "hexa",
                width: 8,
                stroke: !0,
                color: "icon_darker",
                left: "80%",
                top: "70%",
              })
            ),
            Object(c.c)(
              m,
              {
                sx: {
                  variant: "texts.bigger",
                },
                speed: 0.4,
                offset: t,
                factor: n,
              },
              Object(c.c)(h, null, Object(c.c)(z, null))
            )
          );
        },
        B =
          ((I = "ProjectCard"),
          function (e) {
            return (
              console.warn(
                "Component " +
                  I +
                  " was not imported, exported, or provided by MDXProvider as global scope"
              ),
              Object(L.b)("div", e)
            );
          }),
        N = {
          _frontmatter: {},
        };

      function F(e) {
        var t = e.components,
          r = Object(P.default)(e, ["components"]);
        return Object(L.b)(
          "wrapper",
          Object(_.default)({}, N, r, {
            components: t,
            mdxType: "MDXLayout",
          }),
          Object(L.b)("h2", null, "Projects"),
          Object(L.b)(
            B,
            {
              title: "Git Html Preview Tool",
              link: "https://githtmlpreview.netlify.app/",
              bg: "linear-gradient(to right, #D4145A 0%, #FBB03B 100%)",
              mdxType: "ProjectCard",
            },
            "Loads HTML using CORS proxy, then process all links, frames, scripts and styles, and load each of them using CORS proxy, so they can be evaluated by the browser."
          ),
          Object(L.b)(
            B,
            {
              title: "TetrisJS",
              link: "https://tetris42.netlify.app/",
              bg: "linear-gradient(to right, #662D8C 0%, #ED1E79 100%)",
              mdxType: "ProjectCard",
            },
            "The classic game of tetris implemented in plain javascipt and styled with a retro-futureistic theme"
          ),
          Object(L.b)(
            B,
            {
              title: "Mihir Beg Music",
              link: "https://mihirbegmusic.netlify.app/",
              bg: "linear-gradient(to right, #009245 0%, #FCEE21 100%)",
              mdxType: "ProjectCard",
            },
            "A responsive and mobile friendly content promotion site for an Audio Engineer to engage with fans and potential clients"
          ),
          Object(L.b)(
            B,
            {
              title: "Data Structures & Algorithms Interactive Learning Site",
              link: "https://trusting-dijkstra-4d3b17.netlify.app/",
              bg: "linear-gradient(to right, #D585FF 0%, #00FFEE 100%)",
              mdxType: "ProjectCard",
            },
            "A interactive and comprehensive guide and learning tool for DataStructures and Algorithms ... concentrated on JS but with some examples in Python, C++ and Java as well"
          )
        );
      }
      F.isMDXComponent = !0;
      var D = function (e) {
          var t = e.offset,
            r = e.factor,
            n = void 0 === r ? 2 : r;
          return Object(c.c)(
            "div",
            null,
            Object(c.c)(f, {
              bg: "linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%)",
              sx: {
                clipPath: "polygon(0 15%, 100% 25%, 100% 85%, 0 75%)",
              },
              speed: -0.2,
              offset: 1.1,
              factor: n,
            }),
            Object(c.c)(
              m,
              {
                speed: 0.4,
                offset: t + 0.2,
                factor: n,
              },
              Object(c.c)(
                h,
                null,
                Object(c.c)(
                  "div",
                  {
                    sx: {
                      display: "grid",
                      gridGap: [4, 4, 4, 5],
                      gridTemplateColumns: ["1fr", "1fr", "repeat(2, 1fr)"],
                      h2: {
                        gridColumn: "-1/1",
                        color: "white !important",
                      },
                    },
                  },
                  Object(c.c)(F, null)
                )
              )
            ),
            Object(c.c)(
              f,
              {
                speed: 0.1,
                offset: t,
                factor: n,
              },
              Object(c.c)(
                R,
                null,
                Object(c.c)(y, {
                  icon: "box",
                  width: 6,
                  color: "icon_brightest",
                  left: "85%",
                  top: "75%",
                }),
                Object(c.c)(y, {
                  icon: "upDown",
                  width: 8,
                  color: "icon_teal",
                  left: "70%",
                  top: "20%",
                }),
                Object(c.c)(y, {
                  icon: "triangle",
                  width: 8,
                  stroke: !0,
                  color: "icon_orange",
                  left: "25%",
                  top: "5%",
                }),
                Object(c.c)(y, {
                  icon: "circle",
                  hiddenMobile: !0,
                  width: 24,
                  color: "icon_brightest",
                  left: "17%",
                  top: "60%",
                })
              ),
              Object(c.c)(
                C,
                null,
                Object(c.c)(y, {
                  icon: "arrowUp",
                  hiddenMobile: !0,
                  width: 16,
                  color: "icon_green",
                  left: "20%",
                  top: "90%",
                }),
                Object(c.c)(y, {
                  icon: "triangle",
                  width: 12,
                  stroke: !0,
                  color: "icon_brightest",
                  left: "90%",
                  top: "30%",
                }),
                Object(c.c)(y, {
                  icon: "circle",
                  width: 16,
                  color: "icon_yellow",
                  left: "70%",
                  top: "90%",
                }),
                Object(c.c)(y, {
                  icon: "triangle",
                  hiddenMobile: !0,
                  width: 16,
                  stroke: !0,
                  color: "icon_teal",
                  left: "18%",
                  top: "75%",
                }),
                Object(c.c)(y, {
                  icon: "circle",
                  width: 6,
                  color: "icon_brightest",
                  left: "75%",
                  top: "10%",
                }),
                Object(c.c)(y, {
                  icon: "upDown",
                  hiddenMobile: !0,
                  width: 8,
                  color: "icon_green",
                  left: "45%",
                  top: "10%",
                })
              ),
              Object(c.c)(y, {
                icon: "circle",
                hiddenMobile: !0,
                width: 6,
                color: "icon_brightest",
                left: "4%",
                top: "20%",
              }),
              Object(c.c)(y, {
                icon: "circle",
                width: 12,
                color: "icon_pink",
                left: "80%",
                top: "60%",
              }),
              Object(c.c)(y, {
                icon: "box",
                width: 6,
                color: "icon_orange",
                left: "10%",
                top: "10%",
              }),
              Object(c.c)(y, {
                icon: "box",
                width: 12,
                color: "icon_yellow",
                left: "29%",
                top: "26%",
              }),
              Object(c.c)(y, {
                icon: "hexa",
                width: 16,
                stroke: !0,
                color: "icon_red",
                left: "75%",
                top: "30%",
              }),
              Object(c.c)(y, {
                icon: "hexa",
                width: 8,
                stroke: !0,
                color: "icon_yellow",
                left: "80%",
                top: "70%",
              })
            )
          );
        },
        V = {
          _frontmatter: {},
        };

      function H(e) {
        var t = e.components,
          r = Object(P.default)(e, ["components"]);
        return Object(L.b)(
          "wrapper",
          Object(_.default)({}, V, r, {
            components: t,
            mdxType: "MDXLayout",
          }),
          Object(L.b)("h2", null, "About"),
          Object(L.b)(
            "ul",
            null,
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "🔭 Contract Web Development ",
                Object(L.b)(
                  "strong",
                  {
                    parentName: "p",
                  },
                  "Relational Concepts"
                )
              )
            ),
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "🌱 I'm currently learning ",
                Object(L.b)(
                  "strong",
                  {
                    parentName: "p",
                  },
                  "React/Redux, Python, Java, Express, jQuery"
                )
              )
            ),
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "👯 I'm looking to collaborate on ",
                Object(L.b)(
                  "a",
                  {
                    parentName: "p",
                    href: "https://goofy-euclid-1cd736.netlify.app/core-site/index.html",
                  },
                  "Any web audio or open source educational tools."
                )
              )
            ),
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "🤝 I'm looking for help with ",
                Object(L.b)(
                  "a",
                  {
                    parentName: "p",
                    href: "https://github.com/bgoonz/React-Practice",
                  },
                  "Learning React"
                )
              )
            ),
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "👨‍💻 All of my projects are available at ",
                Object(L.b)(
                  "a",
                  {
                    parentName: "p",
                    href: "https://github.com/bgoonz",
                  },
                  "github"
                )
              )
            ),
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "📝 I regularly write articles on ",
                Object(L.b)(
                  "a",
                  {
                    parentName: "p",
                    href: "https://bryanguner.medium.com/",
                  },
                  "medium"
                ),
                " && ",
                Object(L.b)(
                  "a",
                  {
                    parentName: "p",
                    href: "https://web-dev-resource-hub.netlify.app/",
                  },
                  "Web-Dev-Resource-Hub"
                )
              )
            ),
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "💬 Ask me about ",
                Object(L.b)(
                  "strong",
                  {
                    parentName: "p",
                  },
                  "Anything:"
                )
              )
            ),
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "📫 How to reach me ",
                Object(L.b)(
                  "strong",
                  {
                    parentName: "p",
                  },
                  Object(L.b)(
                    "a",
                    {
                      parentName: "strong",
                      href: "mailto:bryan.guner@gmail.com",
                    },
                    "bryan.guner@gmail.com"
                  )
                )
              )
            ),
            Object(L.b)(
              "li",
              {
                parentName: "ul",
              },
              Object(L.b)(
                "p",
                {
                  parentName: "li",
                },
                "⚡ Fun fact ",
                Object(L.b)(
                  "strong",
                  {
                    parentName: "p",
                  },
                  "I played Bamboozle Music Festival at the Meadowlands Stadium Complex when I was 14."
                )
              )
            )
          ),
          Object(L.b)("h3", null, "i really like music :headphones:")
        );
      }
      H.isMDXComponent = !0;
      var q = function (e) {
          var t = e.offset,
            r = e.factor,
            n = void 0 === r ? 1 : r;
          return Object(c.c)(
            "div",
            null,
            Object(c.c)(f, {
              bg: "divider",
              clipPath: "polygon(0 16%, 100% 4%, 100% 82%, 0 94%)",
              speed: 0.2,
              offset: t,
              factor: n,
            }),
            Object(c.c)(
              f,
              {
                speed: 0.1,
                offset: t,
                factor: n,
              },
              Object(c.c)(
                R,
                null,
                Object(c.c)(y, {
                  icon: "box",
                  hiddenMobile: !0,
                  width: 6,
                  color: "icon_blue",
                  left: "50%",
                  top: "75%",
                }),
                Object(c.c)(y, {
                  icon: "upDown",
                  hiddenMobile: !0,
                  width: 8,
                  color: "icon_darkest",
                  left: "70%",
                  top: "20%",
                }),
                Object(c.c)(y, {
                  icon: "triangle",
                  width: 8,
                  stroke: !0,
                  color: "icon_darkest",
                  left: "25%",
                  top: "5%",
                }),
                Object(c.c)(y, {
                  icon: "upDown",
                  hiddenMobile: !0,
                  width: 24,
                  color: "icon_orange",
                  left: "80%",
                  top: "80%",
                })
              ),
              Object(c.c)(
                C,
                null,
                Object(c.c)(y, {
                  icon: "arrowUp",
                  hiddenMobile: !0,
                  width: 16,
                  color: "icon_purple",
                  left: "5%",
                  top: "80%",
                }),
                Object(c.c)(y, {
                  icon: "triangle",
                  width: 12,
                  stroke: !0,
                  color: "icon_brightest",
                  left: "95%",
                  top: "50%",
                }),
                Object(c.c)(y, {
                  icon: "circle",
                  hiddenMobile: !0,
                  width: 6,
                  color: "icon_brightest",
                  left: "85%",
                  top: "15%",
                }),
                Object(c.c)(y, {
                  icon: "upDown",
                  hiddenMobile: !0,
                  width: 8,
                  color: "icon_darkest",
                  left: "45%",
                  top: "10%",
                })
              ),
              Object(c.c)(y, {
                icon: "circle",
                hiddenMobile: !0,
                width: 6,
                color: "icon_brightest",
                left: "4%",
                top: "20%",
              }),
              Object(c.c)(y, {
                icon: "circle",
                width: 12,
                color: "icon_darkest",
                left: "70%",
                top: "60%",
              }),
              Object(c.c)(y, {
                icon: "box",
                width: 6,
                color: "icon_orange",
                left: "10%",
                top: "10%",
              }),
              Object(c.c)(y, {
                icon: "box",
                width: 12,
                color: "icon_darkest",
                left: "20%",
                top: "30%",
              }),
              Object(c.c)(y, {
                icon: "hexa",
                width: 8,
                stroke: !0,
                color: "icon_darkest",
                left: "80%",
                top: "70%",
              })
            ),
            Object(c.c)(
              m,
              {
                speed: 0.4,
                offset: t,
                factor: n,
              },
              Object(c.c)(h, null, Object(c.c)(H, null))
            )
          );
        },
        U = r("PcS7"),
        K = r("ZdEh"),
        Y = r("4qRI"),
        G = r("9uj6"),
        X = r("YVoz"),
        Z = r.n(X),
        Q = function (e, t) {
          var r = Z()({}, e, t);
          for (var n in e) {
            var o;
            e[n] &&
              "object" == typeof t[n] &&
              Z()(r, (((o = {})[n] = Z()(e[n], t[n])), o));
          }
          return r;
        },
        J = {
          breakpoints: [40, 52, 64].map(function (e) {
            return e + "em";
          }),
        },
        $ = function (e) {
          return "@media screen and (min-width: " + e + ")";
        },
        ee = function (e, t) {
          return te(t, e, e);
        },
        te = function (e, t, r, n, o) {
          for (t = t && t.split ? t.split(".") : [t], n = 0; n < t.length; n++)
            e = e ? e[t[n]] : o;
          return e === o ? r : e;
        },
        re = function e(t) {
          var r = {},
            n = function (e) {
              var n,
                o,
                i = {},
                a = !1,
                c = e.theme && e.theme.disableStyledSystemCache;
              for (var s in e)
                if (t[s]) {
                  var l = t[s],
                    u = e[s],
                    d = te(e.theme, l.scale, l.defaults);
                  if ("object" != typeof u) Z()(i, l(u, d, e));
                  else {
                    if (
                      ((r.breakpoints =
                        (!c && r.breakpoints) ||
                        te(e.theme, "breakpoints", J.breakpoints)),
                      Array.isArray(u))
                    ) {
                      (r.media =
                        (!c && r.media) || [null].concat(r.breakpoints.map($))),
                        (i = Q(i, ne(r.media, l, d, u, e)));
                      continue;
                    }
                    null !== u &&
                      ((i = Q(i, oe(r.breakpoints, l, d, u, e))), (a = !0));
                  }
                }
              return (
                a &&
                  ((n = i),
                  (o = {}),
                  Object.keys(n)
                    .sort(function (e, t) {
                      return e.localeCompare(t, void 0, {
                        numeric: !0,
                        sensitivity: "base",
                      });
                    })
                    .forEach(function (e) {
                      o[e] = n[e];
                    }),
                  (i = o)),
                i
              );
            };
          (n.config = t), (n.propNames = Object.keys(t)), (n.cache = r);
          var o = Object.keys(t).filter(function (e) {
            return "config" !== e;
          });
          return (
            o.length > 1 &&
              o.forEach(function (r) {
                var o;
                n[r] = e((((o = {})[r] = t[r]), o));
              }),
            n
          );
        },
        ne = function (e, t, r, n, o) {
          var i = {};
          return (
            n.slice(0, e.length).forEach(function (n, a) {
              var c,
                s = e[a],
                l = t(n, r, o);
              s ? Z()(i, (((c = {})[s] = Z()({}, i[s], l)), c)) : Z()(i, l);
            }),
            i
          );
        },
        oe = function (e, t, r, n, o) {
          var i = {};
          for (var a in n) {
            var c = e[a],
              s = t(n[a], r, o);
            if (c) {
              var l,
                u = $(c);
              Z()(i, (((l = {})[u] = Z()({}, i[u], s)), l));
            } else Z()(i, s);
          }
          return i;
        },
        ie = function (e) {
          var t = e.properties,
            r = e.property,
            n = e.scale,
            o = e.transform,
            i = void 0 === o ? ee : o,
            a = e.defaultScale;
          t = t || [r];
          var c = function (e, r, n) {
            var o = {},
              a = i(e, r, n);
            if (null !== a)
              return (
                t.forEach(function (e) {
                  o[e] = a;
                }),
                o
              );
          };
          return (c.scale = n), (c.defaults = a), c;
        },
        ae = function (e) {
          void 0 === e && (e = {});
          var t = {};
          return (
            Object.keys(e).forEach(function (r) {
              var n = e[r];
              t[r] =
                !0 !== n
                  ? "function" != typeof n
                    ? ie(n)
                    : n
                  : ie({
                      property: r,
                      scale: r,
                    });
            }),
            re(t)
          );
        },
        ce = function () {
          for (
            var e = {}, t = arguments.length, r = new Array(t), n = 0;
            n < t;
            n++
          )
            r[n] = arguments[n];
          r.forEach(function (t) {
            t && t.config && Z()(e, t.config);
          });
          var o = re(e);
          return o;
        },
        se = ae({
          width: {
            property: "width",
            scale: "sizes",
            transform: function (e, t) {
              return te(
                t,
                e,
                !(function (e) {
                  return "number" == typeof e && !isNaN(e);
                })(e) || e > 1
                  ? e
                  : 100 * e + "%"
              );
            },
          },
          height: {
            property: "height",
            scale: "sizes",
          },
          minWidth: {
            property: "minWidth",
            scale: "sizes",
          },
          minHeight: {
            property: "minHeight",
            scale: "sizes",
          },
          maxWidth: {
            property: "maxWidth",
            scale: "sizes",
          },
          maxHeight: {
            property: "maxHeight",
            scale: "sizes",
          },
          size: {
            properties: ["width", "height"],
            scale: "sizes",
          },
          overflow: !0,
          overflowX: !0,
          overflowY: !0,
          display: !0,
          verticalAlign: !0,
        }),
        le = se,
        ue = {
          color: {
            property: "color",
            scale: "colors",
          },
          backgroundColor: {
            property: "backgroundColor",
            scale: "colors",
          },
          opacity: !0,
        };
      ue.bg = ue.backgroundColor;
      var de = ae(ue),
        pe = de,
        fe = ae({
          fontFamily: {
            property: "fontFamily",
            scale: "fonts",
          },
          fontSize: {
            property: "fontSize",
            scale: "fontSizes",
            defaultScale: [12, 14, 16, 20, 24, 32, 48, 64, 72],
          },
          fontWeight: {
            property: "fontWeight",
            scale: "fontWeights",
          },
          lineHeight: {
            property: "lineHeight",
            scale: "lineHeights",
          },
          letterSpacing: {
            property: "letterSpacing",
            scale: "letterSpacings",
          },
          textAlign: !0,
          fontStyle: !0,
        }),
        he = fe,
        me = ae({
          alignItems: !0,
          alignContent: !0,
          justifyItems: !0,
          justifyContent: !0,
          flexWrap: !0,
          flexDirection: !0,
          flex: !0,
          flexGrow: !0,
          flexShrink: !0,
          flexBasis: !0,
          justifySelf: !0,
          alignSelf: !0,
          order: !0,
        }),
        be = me,
        ge = {
          space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
        },
        ye = ae({
          gridGap: {
            property: "gridGap",
            scale: "space",
            defaultScale: ge.space,
          },
          gridColumnGap: {
            property: "gridColumnGap",
            scale: "space",
            defaultScale: ge.space,
          },
          gridRowGap: {
            property: "gridRowGap",
            scale: "space",
            defaultScale: ge.space,
          },
          gridColumn: !0,
          gridRow: !0,
          gridAutoFlow: !0,
          gridAutoColumns: !0,
          gridAutoRows: !0,
          gridTemplateColumns: !0,
          gridTemplateRows: !0,
          gridTemplateAreas: !0,
          gridArea: !0,
        }),
        ve = ye,
        we = {
          border: {
            property: "border",
            scale: "borders",
          },
          borderWidth: {
            property: "borderWidth",
            scale: "borderWidths",
          },
          borderStyle: {
            property: "borderStyle",
            scale: "borderStyles",
          },
          borderColor: {
            property: "borderColor",
            scale: "colors",
          },
          borderRadius: {
            property: "borderRadius",
            scale: "radii",
          },
          borderTop: {
            property: "borderTop",
            scale: "borders",
          },
          borderTopLeftRadius: {
            property: "borderTopLeftRadius",
            scale: "radii",
          },
          borderTopRightRadius: {
            property: "borderTopRightRadius",
            scale: "radii",
          },
          borderRight: {
            property: "borderRight",
            scale: "borders",
          },
          borderBottom: {
            property: "borderBottom",
            scale: "borders",
          },
          borderBottomLeftRadius: {
            property: "borderBottomLeftRadius",
            scale: "radii",
          },
          borderBottomRightRadius: {
            property: "borderBottomRightRadius",
            scale: "radii",
          },
          borderLeft: {
            property: "borderLeft",
            scale: "borders",
          },
          borderX: {
            properties: ["borderLeft", "borderRight"],
            scale: "borders",
          },
          borderY: {
            properties: ["borderTop", "borderBottom"],
            scale: "borders",
          },
          borderTopWidth: {
            property: "borderTopWidth",
            scale: "borderWidths",
          },
          borderTopColor: {
            property: "borderTopColor",
            scale: "colors",
          },
          borderTopStyle: {
            property: "borderTopStyle",
            scale: "borderStyles",
          },
        };
      (we.borderTopLeftRadius = {
        property: "borderTopLeftRadius",
        scale: "radii",
      }),
        (we.borderTopRightRadius = {
          property: "borderTopRightRadius",
          scale: "radii",
        }),
        (we.borderBottomWidth = {
          property: "borderBottomWidth",
          scale: "borderWidths",
        }),
        (we.borderBottomColor = {
          property: "borderBottomColor",
          scale: "colors",
        }),
        (we.borderBottomStyle = {
          property: "borderBottomStyle",
          scale: "borderStyles",
        }),
        (we.borderBottomLeftRadius = {
          property: "borderBottomLeftRadius",
          scale: "radii",
        }),
        (we.borderBottomRightRadius = {
          property: "borderBottomRightRadius",
          scale: "radii",
        }),
        (we.borderLeftWidth = {
          property: "borderLeftWidth",
          scale: "borderWidths",
        }),
        (we.borderLeftColor = {
          property: "borderLeftColor",
          scale: "colors",
        }),
        (we.borderLeftStyle = {
          property: "borderLeftStyle",
          scale: "borderStyles",
        }),
        (we.borderRightWidth = {
          property: "borderRightWidth",
          scale: "borderWidths",
        }),
        (we.borderRightColor = {
          property: "borderRightColor",
          scale: "colors",
        }),
        (we.borderRightStyle = {
          property: "borderRightStyle",
          scale: "borderStyles",
        });
      var Oe = ae(we),
        je = Oe,
        xe = {
          background: !0,
          backgroundImage: !0,
          backgroundSize: !0,
          backgroundPosition: !0,
          backgroundRepeat: !0,
        };
      (xe.bgImage = xe.backgroundImage),
        (xe.bgSize = xe.backgroundSize),
        (xe.bgPosition = xe.backgroundPosition),
        (xe.bgRepeat = xe.backgroundRepeat);
      var ke = ae(xe),
        Se = ke,
        Te = {
          space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
        },
        Ee = ae({
          position: !0,
          zIndex: {
            property: "zIndex",
            scale: "zIndices",
          },
          top: {
            property: "top",
            scale: "space",
            defaultScale: Te.space,
          },
          right: {
            property: "right",
            scale: "space",
            defaultScale: Te.space,
          },
          bottom: {
            property: "bottom",
            scale: "space",
            defaultScale: Te.space,
          },
          left: {
            property: "left",
            scale: "space",
            defaultScale: Te.space,
          },
        }),
        Ae = Ee,
        Re = {
          space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
        },
        Ce = function (e) {
          return "number" == typeof e && !isNaN(e);
        },
        _e = function (e, t) {
          if (!Ce(e)) return te(t, e, e);
          var r = e < 0,
            n = Math.abs(e),
            o = te(t, n, n);
          return Ce(o) ? o * (r ? -1 : 1) : r ? "-" + o : o;
        },
        Pe = {};
      (Pe.margin = {
        margin: {
          property: "margin",
          scale: "space",
          transform: _e,
          defaultScale: Re.space,
        },
        marginTop: {
          property: "marginTop",
          scale: "space",
          transform: _e,
          defaultScale: Re.space,
        },
        marginRight: {
          property: "marginRight",
          scale: "space",
          transform: _e,
          defaultScale: Re.space,
        },
        marginBottom: {
          property: "marginBottom",
          scale: "space",
          transform: _e,
          defaultScale: Re.space,
        },
        marginLeft: {
          property: "marginLeft",
          scale: "space",
          transform: _e,
          defaultScale: Re.space,
        },
        marginX: {
          properties: ["marginLeft", "marginRight"],
          scale: "space",
          transform: _e,
          defaultScale: Re.space,
        },
        marginY: {
          properties: ["marginTop", "marginBottom"],
          scale: "space",
          transform: _e,
          defaultScale: Re.space,
        },
      }),
        (Pe.margin.m = Pe.margin.margin),
        (Pe.margin.mt = Pe.margin.marginTop),
        (Pe.margin.mr = Pe.margin.marginRight),
        (Pe.margin.mb = Pe.margin.marginBottom),
        (Pe.margin.ml = Pe.margin.marginLeft),
        (Pe.margin.mx = Pe.margin.marginX),
        (Pe.margin.my = Pe.margin.marginY),
        (Pe.padding = {
          padding: {
            property: "padding",
            scale: "space",
            defaultScale: Re.space,
          },
          paddingTop: {
            property: "paddingTop",
            scale: "space",
            defaultScale: Re.space,
          },
          paddingRight: {
            property: "paddingRight",
            scale: "space",
            defaultScale: Re.space,
          },
          paddingBottom: {
            property: "paddingBottom",
            scale: "space",
            defaultScale: Re.space,
          },
          paddingLeft: {
            property: "paddingLeft",
            scale: "space",
            defaultScale: Re.space,
          },
          paddingX: {
            properties: ["paddingLeft", "paddingRight"],
            scale: "space",
            defaultScale: Re.space,
          },
          paddingY: {
            properties: ["paddingTop", "paddingBottom"],
            scale: "space",
            defaultScale: Re.space,
          },
        }),
        (Pe.padding.p = Pe.padding.padding),
        (Pe.padding.pt = Pe.padding.paddingTop),
        (Pe.padding.pr = Pe.padding.paddingRight),
        (Pe.padding.pb = Pe.padding.paddingBottom),
        (Pe.padding.pl = Pe.padding.paddingLeft),
        (Pe.padding.px = Pe.padding.paddingX),
        (Pe.padding.py = Pe.padding.paddingY);
      var Le = ce(ae(Pe.margin), ae(Pe.padding)),
        Me = Le,
        ze = ae({
          boxShadow: {
            property: "boxShadow",
            scale: "shadows",
          },
          textShadow: {
            property: "textShadow",
            scale: "shadows",
          },
        });

      function Ie() {
        return (Ie =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];
              for (var n in r)
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      var We = function (e, t, r, n, o) {
          for (t = t && t.split ? t.split(".") : [t], n = 0; n < t.length; n++)
            e = e ? e[t[n]] : o;
          return e === o ? r : e;
        },
        Be = [40, 52, 64].map(function (e) {
          return e + "em";
        }),
        Ne = {
          space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
          fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
        },
        Fe = {
          bg: "backgroundColor",
          m: "margin",
          mt: "marginTop",
          mr: "marginRight",
          mb: "marginBottom",
          ml: "marginLeft",
          mx: "marginX",
          my: "marginY",
          p: "padding",
          pt: "paddingTop",
          pr: "paddingRight",
          pb: "paddingBottom",
          pl: "paddingLeft",
          px: "paddingX",
          py: "paddingY",
        },
        De = {
          marginX: ["marginLeft", "marginRight"],
          marginY: ["marginTop", "marginBottom"],
          paddingX: ["paddingLeft", "paddingRight"],
          paddingY: ["paddingTop", "paddingBottom"],
          size: ["width", "height"],
        },
        Ve = {
          color: "colors",
          backgroundColor: "colors",
          borderColor: "colors",
          margin: "space",
          marginTop: "space",
          marginRight: "space",
          marginBottom: "space",
          marginLeft: "space",
          marginX: "space",
          marginY: "space",
          padding: "space",
          paddingTop: "space",
          paddingRight: "space",
          paddingBottom: "space",
          paddingLeft: "space",
          paddingX: "space",
          paddingY: "space",
          top: "space",
          right: "space",
          bottom: "space",
          left: "space",
          gridGap: "space",
          gridColumnGap: "space",
          gridRowGap: "space",
          gap: "space",
          columnGap: "space",
          rowGap: "space",
          fontFamily: "fonts",
          fontSize: "fontSizes",
          fontWeight: "fontWeights",
          lineHeight: "lineHeights",
          letterSpacing: "letterSpacings",
          border: "borders",
          borderTop: "borders",
          borderRight: "borders",
          borderBottom: "borders",
          borderLeft: "borders",
          borderWidth: "borderWidths",
          borderStyle: "borderStyles",
          borderRadius: "radii",
          borderTopRightRadius: "radii",
          borderTopLeftRadius: "radii",
          borderBottomRightRadius: "radii",
          borderBottomLeftRadius: "radii",
          borderTopWidth: "borderWidths",
          borderTopColor: "colors",
          borderTopStyle: "borderStyles",
          borderBottomWidth: "borderWidths",
          borderBottomColor: "colors",
          borderBottomStyle: "borderStyles",
          borderLeftWidth: "borderWidths",
          borderLeftColor: "colors",
          borderLeftStyle: "borderStyles",
          borderRightWidth: "borderWidths",
          borderRightColor: "colors",
          borderRightStyle: "borderStyles",
          outlineColor: "colors",
          boxShadow: "shadows",
          textShadow: "shadows",
          zIndex: "zIndices",
          width: "sizes",
          minWidth: "sizes",
          maxWidth: "sizes",
          height: "sizes",
          minHeight: "sizes",
          maxHeight: "sizes",
          flexBasis: "sizes",
          size: "sizes",
          fill: "colors",
          stroke: "colors",
        },
        He = function (e, t) {
          if ("number" != typeof t || t >= 0) return We(e, t, t);
          var r = Math.abs(t),
            n = We(e, r, r);
          return "string" == typeof n ? "-" + n : -1 * n;
        },
        qe = [
          "margin",
          "marginTop",
          "marginRight",
          "marginBottom",
          "marginLeft",
          "marginX",
          "marginY",
          "top",
          "bottom",
          "left",
          "right",
        ].reduce(function (e, t) {
          var r;
          return Ie({}, e, (((r = {})[t] = He), r));
        }, {}),
        Ue = function e(t) {
          return function (r) {
            void 0 === r && (r = {});
            var n = Ie({}, Ne, {}, r.theme || r),
              o = {},
              i = (function (e) {
                return function (t) {
                  var r = {},
                    n = We(t, "breakpoints", Be),
                    o = [null].concat(
                      n.map(function (e) {
                        return "@media screen and (min-width: " + e + ")";
                      })
                    );
                  for (var i in e) {
                    var a = "function" == typeof e[i] ? e[i](t) : e[i];
                    if (null != a)
                      if (Array.isArray(a))
                        for (var c = 0; c < a.slice(0, o.length).length; c++) {
                          var s = o[c];
                          s
                            ? ((r[s] = r[s] || {}),
                              null != a[c] && (r[s][i] = a[c]))
                            : (r[i] = a[c]);
                        }
                      else r[i] = a;
                  }
                  return r;
                };
              })("function" == typeof t ? t(n) : t)(n);
            for (var a in i) {
              var c = i[a],
                s = "function" == typeof c ? c(n) : c;
              if ("variant" !== a)
                if (s && "object" == typeof s) o[a] = e(s)(n);
                else {
                  var l = We(Fe, a, a),
                    u = We(Ve, l),
                    d = We(n, u, We(n, l, {})),
                    p = We(qe, l, We)(d, s, s);
                  if (De[l])
                    for (var f = De[l], h = 0; h < f.length; h++) o[f[h]] = p;
                  else o[l] = p;
                }
              else o = Ie({}, o, {}, e(We(n, s))(n));
            }
            return o;
          };
        },
        Ke = function (e) {
          var t,
            r,
            n = e.scale,
            o = e.prop,
            i = void 0 === o ? "variant" : o,
            a = e.variants,
            c = void 0 === a ? {} : a,
            s = e.key;
          ((r = Object.keys(c).length
            ? function (e, t, r) {
                return Ue(te(t, e, null))(r.theme);
              }
            : function (e, t) {
                return te(t, e, null);
              }).scale = n || s),
            (r.defaults = c);
          var l = (((t = {})[i] = r), t);
          return re(l);
        },
        Ye = Ke({
          key: "buttons",
        }),
        Ge = Ke({
          key: "textStyles",
          prop: "textStyle",
        }),
        Xe = Ke({
          key: "colorStyles",
          prop: "colors",
        }),
        Ze =
          (le.width,
          le.height,
          le.minWidth,
          le.minHeight,
          le.maxWidth,
          le.maxHeight,
          le.size,
          le.verticalAlign,
          le.display,
          le.overflow,
          le.overflowX,
          le.overflowY,
          pe.opacity,
          he.fontSize,
          he.fontFamily,
          he.fontWeight,
          he.lineHeight,
          he.textAlign,
          he.fontStyle,
          he.letterSpacing,
          be.alignItems,
          be.alignContent,
          be.justifyItems,
          be.justifyContent,
          be.flexWrap,
          be.flexDirection,
          be.flex,
          be.flexGrow,
          be.flexShrink,
          be.flexBasis,
          be.justifySelf,
          be.alignSelf,
          be.order,
          ve.gridGap,
          ve.gridColumnGap,
          ve.gridRowGap,
          ve.gridColumn,
          ve.gridRow,
          ve.gridAutoFlow,
          ve.gridAutoColumns,
          ve.gridAutoRows,
          ve.gridTemplateColumns,
          ve.gridTemplateRows,
          ve.gridTemplateAreas,
          ve.gridArea,
          je.borderWidth,
          je.borderStyle,
          je.borderColor,
          je.borderTop,
          je.borderRight,
          je.borderBottom,
          je.borderLeft,
          je.borderRadius,
          Se.backgroundImage,
          Se.backgroundSize,
          Se.backgroundPosition,
          Se.backgroundRepeat,
          Ae.zIndex,
          Ae.top,
          Ae.right,
          Ae.bottom,
          Ae.left,
          function (e) {
            var t = new RegExp("^(" + e.join("|") + ")$");
            return Object(Y.a)(function (e) {
              return Object(G.a)(e) && !t.test(e);
            });
          }),
        Qe =
          (Ze(ce(Le, fe, de, se, me, Oe, ke, Ee, ye, ze, Ye, Ge, Xe).propNames),
          r("5D9J")),
        Je = Ze(Me.propNames.concat(pe.propNames)),
        $e = Object(Qe.a)("div", {
          shouldForwardProp: Je,
        })(
          {
            boxSizing: "border-box",
            margin: 0,
            minWidth: 0,
          },
          function (e) {
            return Object(K.a)(e.__css)(e.theme);
          },
          function (e) {
            var t = e.theme,
              r = e.variant,
              n = e.__themeKey;
            return (
              void 0 === n && (n = "variants"),
              Object(K.a)(Object(K.b)(t, n + "." + r, Object(K.b)(t, r)))
            );
          },
          Me,
          pe,
          function (e) {
            return Object(K.a)(e.sx)(e.theme);
          },
          function (e) {
            return e.css;
          }
        ),
        et = Object(Qe.a)($e)({
          display: "flex",
        });
      o.a.forwardRef(function (e, t) {
        var r = e.width,
          n = e.columns,
          i = e.gap;
        void 0 === i && (i = 3);
        var a = (function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                -1 === t.indexOf(n) &&
                (r[n] = e[n]);
            return r;
          })(e, ["width", "columns", "gap"]),
          c = r
            ? (function e(t) {
                return Array.isArray(t)
                  ? t.map(e)
                  : !!t &&
                      "repeat(auto-fit, minmax(" +
                        (("number" == typeof (r = t) ? r + "px" : r) +
                          ", 1fr))");
                var r;
              })(r)
            : (function e(t) {
                return Array.isArray(t)
                  ? t.map(e)
                  : !!t &&
                      ("number" == typeof t ? "repeat(" + t + ", 1fr)" : t);
              })(n);
        return o.a.createElement(
          $e,
          Object.assign(
            {},
            {
              ref: t,
            },
            a,
            {
              __themeKey: "grids",
              __css: {
                display: "grid",
                gridGap: i,
                gridTemplateColumns: c,
              },
            }
          )
        );
      }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                as: "button",
                variant: "primary",
              },
              e,
              {
                __themeKey: "buttons",
                __css: {
                  appearance: "none",
                  display: "inline-block",
                  textAlign: "center",
                  lineHeight: "inherit",
                  textDecoration: "none",
                  fontSize: "inherit",
                  px: 3,
                  py: 2,
                  color: "white",
                  bg: "primary",
                  border: 0,
                  borderRadius: 4,
                },
              }
            )
          );
        });
      var tt = o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                as: "a",
                variant: "styles.a",
              },
              e,
              {
                __themeKey: "links",
              }
            )
          );
        }),
        rt =
          (o.a.forwardRef(function (e, t) {
            return o.a.createElement(
              $e,
              Object.assign(
                {},
                {
                  ref: t,
                  variant: "default",
                },
                e,
                {
                  __themeKey: "text",
                }
              )
            );
          }),
          o.a.forwardRef(function (e, t) {
            return o.a.createElement(
              $e,
              Object.assign(
                {},
                {
                  ref: t,
                  as: "h2",
                  variant: "heading",
                },
                e,
                {
                  __themeKey: "text",
                  __css: {
                    fontFamily: "heading",
                    fontWeight: "heading",
                    lineHeight: "heading",
                  },
                }
              )
            );
          }),
          o.a.forwardRef(function (e, t) {
            return o.a.createElement(
              $e,
              Object.assign(
                {},
                {
                  ref: t,
                  as: "img",
                },
                e,
                {
                  __themeKey: "images",
                  __css: Object.assign(
                    {},
                    {
                      maxWidth: "100%",
                      height: "auto",
                    },
                    e.__css
                  ),
                }
              )
            );
          })),
        nt =
          (o.a.forwardRef(function (e, t) {
            return o.a.createElement(
              $e,
              Object.assign(
                {},
                {
                  ref: t,
                  variant: "primary",
                },
                e,
                {
                  __themeKey: "cards",
                }
              )
            );
          }),
          o.a.forwardRef(function (e, t) {
            return o.a.createElement(
              $e,
              Object.assign(
                {},
                {
                  ref: t,
                  as: "label",
                  variant: "label",
                },
                e,
                {
                  __themeKey: "forms",
                  __css: {
                    width: "100%",
                    display: "flex",
                  },
                }
              )
            );
          })),
        ot = o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                as: "input",
                variant: "input",
              },
              e,
              {
                __themeKey: "forms",
                __css: {
                  display: "block",
                  width: "100%",
                  p: 2,
                  appearance: "none",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  border: "1px solid",
                  borderRadius: 4,
                  color: "inherit",
                  bg: "transparent",
                },
              }
            )
          );
        });
      var it = function (e) {
          var t = e.size;
          void 0 === t && (t = 24);
          var r = (function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                -1 === t.indexOf(n) &&
                (r[n] = e[n]);
            return r;
          })(e, ["size"]);
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                as: "svg",
                xmlns: "http://www.w3.org/2000/svg",
                width: t + "",
                height: t + "",
                viewBox: "0 0 24 24",
                fill: "currentcolor",
              },
              r
            )
          );
        },
        at = function (e) {
          return function (t) {
            var r = {};
            for (var n in t) e(n || "") && (r[n] = t[n]);
            return r;
          };
        },
        ct = /^m[trblxy]?$/,
        st = at(function (e) {
          return ct.test(e);
        }),
        lt = at(function (e) {
          return !ct.test(e);
        }),
        ut = function (e) {
          return o.a.createElement(
            it,
            e,
            o.a.createElement("path", {
              d: "M7 10l5 5 5-5z",
            })
          );
        };
      o.a.forwardRef(function (e, t) {
        return o.a.createElement(
          $e,
          Object.assign({}, st(e), {
            sx: {
              display: "flex",
            },
          }),
          o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                as: "select",
                variant: "select",
              },
              lt(e),
              {
                __themeKey: "forms",
                __css: {
                  display: "block",
                  width: "100%",
                  p: 2,
                  appearance: "none",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  border: "1px solid",
                  borderRadius: 4,
                  color: "inherit",
                  bg: "transparent",
                },
              }
            )
          ),
          o.a.createElement(ut, {
            sx: {
              ml: -28,
              alignSelf: "center",
              pointerEvents: "none",
            },
          })
        );
      }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                as: "textarea",
                variant: "textarea",
              },
              e,
              {
                __themeKey: "forms",
                __css: {
                  display: "block",
                  width: "100%",
                  p: 2,
                  appearance: "none",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  border: "1px solid",
                  borderRadius: 4,
                  color: "inherit",
                  bg: "transparent",
                },
              }
            )
          );
        });
      var dt = function (e) {
          return o.a.createElement(
            it,
            e,
            o.a.createElement("path", {
              d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
            })
          );
        },
        pt = function (e) {
          return o.a.createElement(
            it,
            e,
            o.a.createElement("path", {
              d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
            })
          );
        },
        ft = function (e) {
          return o.a.createElement(
            o.a.Fragment,
            null,
            o.a.createElement(
              dt,
              Object.assign({}, e, {
                __css: {
                  display: "none",
                  "input:checked ~ &": {
                    display: "block",
                  },
                },
              })
            ),
            o.a.createElement(
              pt,
              Object.assign({}, e, {
                __css: {
                  display: "block",
                  "input:checked ~ &": {
                    display: "none",
                  },
                },
              })
            )
          );
        };
      o.a.forwardRef(function (e, t) {
        var r = e.className,
          n = e.sx,
          i = e.variant;
        void 0 === i && (i = "radio");
        var a = (function (e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              -1 === t.indexOf(n) &&
              (r[n] = e[n]);
          return r;
        })(e, ["className", "sx", "variant"]);
        return o.a.createElement(
          $e,
          null,
          o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                as: "input",
                type: "radio",
              },
              a,
              {
                sx: {
                  position: "absolute",
                  opacity: 0,
                  zIndex: -1,
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                },
              }
            )
          ),
          o.a.createElement($e, {
            as: ft,
            "aria-hidden": "true",
            __themeKey: "forms",
            variant: i,
            className: r,
            sx: n,
            __css: {
              mr: 2,
              borderRadius: 9999,
              color: "gray",
              "input:checked ~ &": {
                color: "primary",
              },
              "input:focus ~ &": {
                bg: "highlight",
              },
            },
          })
        );
      });
      var ht = function (e) {
          return o.a.createElement(
            it,
            e,
            o.a.createElement("path", {
              d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
            })
          );
        },
        mt = function (e) {
          return o.a.createElement(
            it,
            e,
            o.a.createElement("path", {
              d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z",
            })
          );
        },
        bt = function (e) {
          return o.a.createElement(
            o.a.Fragment,
            null,
            o.a.createElement(
              ht,
              Object.assign({}, e, {
                __css: {
                  display: "none",
                  "input:checked ~ &": {
                    display: "block",
                  },
                },
              })
            ),
            o.a.createElement(
              mt,
              Object.assign({}, e, {
                __css: {
                  display: "block",
                  "input:checked ~ &": {
                    display: "none",
                  },
                },
              })
            )
          );
        },
        gt =
          (o.a.forwardRef(function (e, t) {
            var r = e.className,
              n = e.sx,
              i = e.variant;
            void 0 === i && (i = "checkbox");
            var a = (function (e, t) {
              var r = {};
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) &&
                  -1 === t.indexOf(n) &&
                  (r[n] = e[n]);
              return r;
            })(e, ["className", "sx", "variant"]);
            return o.a.createElement(
              $e,
              null,
              o.a.createElement(
                $e,
                Object.assign(
                  {},
                  {
                    ref: t,
                    as: "input",
                    type: "checkbox",
                  },
                  a,
                  {
                    sx: {
                      position: "absolute",
                      opacity: 0,
                      zIndex: -1,
                      width: 1,
                      height: 1,
                      overflow: "hidden",
                    },
                  }
                )
              ),
              o.a.createElement($e, {
                as: bt,
                "aria-hidden": "true",
                __themeKey: "forms",
                variant: i,
                className: r,
                sx: n,
                __css: {
                  mr: 2,
                  borderRadius: 4,
                  color: "gray",
                  "input:checked ~ &": {
                    color: "primary",
                  },
                  "input:focus ~ &": {
                    color: "primary",
                    bg: "highlight",
                  },
                },
              })
            );
          }),
          {
            appearance: "none",
            width: 16,
            height: 16,
            bg: "currentcolor",
            border: 0,
            borderRadius: 9999,
            variant: "forms.slider.thumb",
          });
      o.a.forwardRef(function (e, t) {
        return o.a.createElement(
          $e,
          Object.assign(
            {},
            {
              ref: t,
              as: "input",
              type: "range",
              variant: "slider",
            },
            e,
            {
              __themeKey: "forms",
              __css: {
                display: "block",
                width: "100%",
                height: 4,
                my: 2,
                cursor: "pointer",
                appearance: "none",
                borderRadius: 9999,
                color: "inherit",
                bg: "gray",
                ":focus": {
                  outline: "none",
                  color: "primary",
                },
                "&::-webkit-slider-thumb": gt,
                "&::-moz-range-thumb": gt,
                "&::-ms-thumb": gt,
              },
            }
          )
        );
      });
      o.a.forwardRef(function (e, t) {
        var r = e.as;
        void 0 === r && (r = ot);
        var n = e.label,
          i = e.name,
          a = (function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                -1 === t.indexOf(n) &&
                (r[n] = e[n]);
            return r;
          })(e, ["as", "label", "name"]);
        return o.a.createElement(
          $e,
          st(a),
          o.a.createElement(
            nt,
            {
              htmlFor: i,
            },
            n
          ),
          o.a.createElement(
            r,
            Object.assign(
              {},
              {
                ref: t,
                id: i,
                name: i,
              },
              lt(a)
            )
          )
        );
      }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                as: "progress",
                variant: "styles.progress",
              },
              e,
              {
                __css: {
                  display: "block",
                  width: "100%",
                  height: "4px",
                  margin: 0,
                  padding: 0,
                  overflow: "hidden",
                  appearance: "none",
                  color: "primary",
                  bg: "gray",
                  borderRadius: 9999,
                  border: "none",
                  "&::-webkit-progress-bar": {
                    bg: "transparent",
                  },
                  "&::-webkit-progress-value": {
                    bg: "currentcolor",
                  },
                  "&::-moz-progress-bar": {
                    bg: "currentcolor",
                  },
                },
              }
            )
          );
        });
      o.a.forwardRef(function (e, t) {
        var r = e.size;
        void 0 === r && (r = 128);
        var n = e.strokeWidth;
        void 0 === n && (n = 2);
        var i = e.value;
        void 0 === i && (i = 0);
        var a = e.min;
        void 0 === a && (a = 0);
        var c = e.max;
        void 0 === c && (c = 1);
        var s = e.title,
          l = (function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                -1 === t.indexOf(n) &&
                (r[n] = e[n]);
            return r;
          })(e, ["size", "strokeWidth", "value", "min", "max", "title"]),
          u = 16 - n,
          d = 2 * u * Math.PI,
          p = d - ((i - a) / (c - a)) * d;
        return o.a.createElement(
          $e,
          Object.assign(
            {},
            {
              ref: t,
              as: "svg",
              viewBox: "0 0 32 32",
              width: r,
              height: r,
              strokeWidth: n,
              fill: "none",
              stroke: "currentcolor",
              role: "img",
              "aria-valuenow": i,
              "aria-valuemin": a,
              "aria-valuemax": c,
            },
            l,
            {
              __css: {
                color: "primary",
              },
            }
          ),
          s && o.a.createElement("title", null, s),
          o.a.createElement("circle", {
            cx: 16,
            cy: 16,
            r: u,
            opacity: 1 / 8,
          }),
          o.a.createElement("circle", {
            cx: 16,
            cy: 16,
            r: u,
            strokeDasharray: d,
            strokeDashoffset: p,
            transform: "rotate(-90 16 16)",
          })
        );
      });
      var yt = Object(a.e)({
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      });
      o.a.forwardRef(function (e, t) {
        var r = e.size;
        void 0 === r && (r = 48);
        var n = e.strokeWidth;
        void 0 === n && (n = 4);
        var i = e.title;
        void 0 === i && (i = "Loading...");
        var a = e.duration;
        void 0 === a && (a = 500);
        var c = (function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                -1 === t.indexOf(n) &&
                (r[n] = e[n]);
            return r;
          })(e, ["size", "strokeWidth", "max", "title", "duration"]),
          s = 16 - n,
          l = 2 * s * Math.PI,
          u = l - (1 / 4) * l;
        return o.a.createElement(
          $e,
          Object.assign(
            {},
            {
              ref: t,
              as: "svg",
              viewBox: "0 0 32 32",
              width: r,
              height: r,
              strokeWidth: n,
              fill: "none",
              stroke: "currentcolor",
              role: "img",
            },
            c,
            {
              __css: {
                color: "primary",
                overflow: "visible",
              },
            }
          ),
          o.a.createElement("title", null, i),
          o.a.createElement("circle", {
            cx: 16,
            cy: 16,
            r: s,
            opacity: 1 / 8,
          }),
          o.a.createElement($e, {
            as: "circle",
            cx: 16,
            cy: 16,
            r: s,
            strokeDasharray: l,
            strokeDashoffset: u,
            __css: {
              transformOrigin: "50% 50%",
              animationName: yt.toString(),
              animationTimingFunction: "linear",
              animationDuration: a + "ms",
              animationIterationCount: "infinite",
            },
          })
        );
      });
      o.a.forwardRef(function (e, t) {
        var r = e.size;
        void 0 === r && (r = 48);
        var n = (function (e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              -1 === t.indexOf(n) &&
              (r[n] = e[n]);
          return r;
        })(e, ["size"]);
        return o.a.createElement(
          rt,
          Object.assign(
            {},
            {
              ref: t,
              width: r,
              height: r,
              variant: "avatar",
            },
            n,
            {
              __css: {
                borderRadius: 9999,
              },
            }
          )
        );
      }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                variant: "primary",
              },
              e,
              {
                __themeKey: "badges",
                __css: {
                  display: "inline-block",
                  verticalAlign: "baseline",
                  fontSize: 0,
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  px: 1,
                  borderRadius: 2,
                  color: "white",
                  bg: "primary",
                },
              }
            )
          );
        });
      var vt = o.a.forwardRef(function (e, t) {
        var r = e.size;
        void 0 === r && (r = 32);
        var n = (function (e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              -1 === t.indexOf(n) &&
              (r[n] = e[n]);
          return r;
        })(e, ["size"]);
        return o.a.createElement(
          $e,
          Object.assign(
            {},
            {
              ref: t,
              as: "button",
              variant: "icon",
            },
            n,
            {
              __themeKey: "buttons",
              __css: {
                appearance: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 1,
                width: r,
                height: r,
                color: "inherit",
                bg: "transparent",
                border: "none",
                borderRadius: 4,
              },
            }
          )
        );
      });
      var wt = o.a.createElement(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "24",
          height: "24",
          fill: "currentcolor",
          viewBox: "0 0 24 24",
        },
        o.a.createElement("path", {
          d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
        })
      );
      o.a.forwardRef(function (e, t) {
        var r = (function (e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              -1 === t.indexOf(n) &&
              (r[n] = e[n]);
          return r;
        })(e, ["size"]);
        return o.a.createElement(
          vt,
          Object.assign(
            {},
            {
              ref: t,
              title: "Close",
              "aria-label": "Close",
              variant: "close",
            },
            r,
            {
              children: wt,
            }
          )
        );
      }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                variant: "primary",
              },
              e,
              {
                __themeKey: "alerts",
                __css: {
                  display: "flex",
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  fontWeight: "bold",
                  color: "white",
                  bg: "primary",
                  borderRadius: 4,
                },
              }
            )
          );
        }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                as: "hr",
                variant: "styles.hr",
              },
              e,
              {
                __css: {
                  color: "gray",
                  m: 0,
                  my: 2,
                  border: 0,
                  borderBottom: "1px solid",
                },
              }
            )
          );
        });
      o.a.forwardRef(function (e, t) {
        var r = e.ratio;
        void 0 === r && (r = 16 / 9);
        var n = e.src,
          i = e.frameBorder;
        void 0 === i && (i = 0);
        var a = e.allowFullScreen;
        void 0 === a && (a = !0);
        var c = e.width;
        void 0 === c && (c = 560);
        var s = e.height;
        void 0 === s && (s = 315);
        var l = e.allow,
          u = (function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                -1 === t.indexOf(n) &&
                (r[n] = e[n]);
            return r;
          })(e, [
            "ratio",
            "src",
            "frameBorder",
            "allowFullScreen",
            "width",
            "height",
            "allow",
          ]);
        return o.a.createElement(
          $e,
          Object.assign({}, u, {
            __css: {
              width: "100%",
              height: 0,
              paddingBottom: 100 / r + "%",
              position: "relative",
              overflow: "hidden",
            },
          }),
          o.a.createElement($e, {
            ref: t,
            as: "iframe",
            src: n,
            width: c,
            height: s,
            frameBorder: i,
            allowFullScreen: a,
            allow: l,
            __css: {
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              bottom: 0,
              left: 0,
              border: 0,
            },
          })
        );
      });
      var Ot = o.a.forwardRef(function (e, t) {
        var r = e.ratio;
        void 0 === r && (r = 4 / 3);
        var n = e.children,
          i = (function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                -1 === t.indexOf(n) &&
                (r[n] = e[n]);
            return r;
          })(e, ["ratio", "children"]);
        return o.a.createElement(
          $e,
          {
            ref: t,
            sx: {
              position: "relative",
              overflow: "hidden",
            },
          },
          o.a.createElement($e, {
            sx: {
              width: "100%",
              height: 0,
              paddingBottom: 100 / r + "%",
            },
          }),
          o.a.createElement(
            $e,
            Object.assign({}, i, {
              __css: {
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
            }),
            n
          )
        );
      });
      o.a.forwardRef(function (e, t) {
        var r = e.ratio,
          n = (function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                -1 === t.indexOf(n) &&
                (r[n] = e[n]);
            return r;
          })(e, ["ratio"]);
        return o.a.createElement(
          Ot,
          {
            ratio: r,
          },
          o.a.createElement(
            rt,
            Object.assign(
              {},
              {
                ref: t,
              },
              n,
              {
                __css: {
                  objectFit: "cover",
                },
              }
            )
          )
        );
      }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
                variant: "container",
              },
              e,
              {
                __themeKey: "layout",
                __css: {
                  width: "100%",
                  maxWidth: "container",
                  mx: "auto",
                },
              }
            )
          );
        }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            tt,
            Object.assign(
              {},
              {
                ref: t,
                variant: "nav",
              },
              e,
              {
                __css: {
                  color: "inherit",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "inline-block",
                  "&:hover, &:focus, &.active": {
                    color: "primary",
                  },
                },
              }
            )
          );
        }),
        o.a.forwardRef(function (e, t) {
          return o.a.createElement(
            $e,
            Object.assign(
              {},
              {
                ref: t,
              },
              e,
              {
                __themeKey: "messages",
                __css: {
                  padding: 3,
                  paddingLeft: function (e) {
                    return e.space[3] - e.space[1];
                  },
                  borderLeftWidth: function (e) {
                    return e.space[1];
                  },
                  borderLeftStyle: "solid",
                  borderLeftColor: "primary",
                  borderRadius: 4,
                  bg: "highlight",
                },
              }
            )
          );
        });
      var jt = function (e) {
          var t = e.size;
          return (
            void 0 === t && (t = 24),
            o.a.createElement(
              $e,
              {
                as: "svg",
                xmlns: "http://www.w3.org/2000/svg",
                width: t,
                height: t,
                fill: "currentcolor",
                viewBox: "0 0 24 24",
                sx: {
                  display: "block",
                  margin: 0,
                },
              },
              o.a.createElement("path", {
                d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
              })
            )
          );
        },
        xt =
          (o.a.forwardRef(function (e, t) {
            return o.a.createElement(
              vt,
              Object.assign(
                {},
                {
                  ref: t,
                  title: "Menu",
                  "aria-label": "Toggle Menu",
                  variant: "menu",
                },
                e
              ),
              o.a.createElement(jt, null)
            );
          }),
          function () {
            var e = Object(U.b)(),
              t = e[0],
              r = e[1],
              n = "dark" === t;
            return Object(c.c)(
              $e,
              {
                as: "footer",
                variant: "footer",
              },
              Object(c.c)(
                "button",
                {
                  sx: {
                    variant: "buttons.toggle",
                    fontWeight: "semibold",
                    display: "block",
                    mx: "auto",
                    mb: 3,
                  },
                  onClick: function (e) {
                    r(n ? "light" : "dark");
                  },
                  type: "button",
                  "aria-label": "Toggle dark mode",
                },
                n ? "Light" : "Dark"
              ),
              "Copyright  Bgoonz© ",
              new Date().getFullYear(),
              ". All rights reserved.",
              Object(c.c)("br", null),
              Object(c.c)(
                et,
                {
                  sx: {
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                    color: "text",
                    fontWeight: "semibold",
                    a: {
                      color: "text",
                    },
                  },
                },
                " ",
                " "
              )
            );
          }),
        kt = {
          _frontmatter: {},
        };

      function St(e) {
        var t = e.components,
          r = Object(P.default)(e, ["components"]);
        return Object(L.b)(
          "wrapper",
          Object(_.default)({}, kt, r, {
            components: t,
            mdxType: "MDXLayout",
          }),
          Object(L.b)("h2", null, "Get in touch"),
          Object(L.b)(
            "p",
            null,
            "Find me on GitHub ",
            Object(L.b)(
              "a",
              {
                parentName: "p",
                href: "https://github.com/bgoonz",
              },
              "GitHub"
            ),
            " or ",
            Object(L.b)(
              "a",
              {
                parentName: "p",
                href: "https://www.instagram.com/bgoonz/",
              },
              "Instagram"
            )
          )
        );
      }
      St.isMDXComponent = !0;
      var Tt,
        Et = Object(x.a)("div", {
          target: "eq3rn5o0",
        })(
          "path{",
          ((Tt = "20s"),
          Object(a.c)("animation:", k, " ", Tt, " linear infinite alternate;")),
          ";}"
        ),
        At = function (e) {
          var t = e.offset,
            r = e.factor,
            n = void 0 === r ? 1 : r;
          return Object(c.c)(
            "div",
            null,
            Object(c.c)(
              f,
              {
                fill: "divider",
                speed: 0.2,
                offset: t,
                factor: n,
              },
              Object(c.c)(
                "div",
                {
                  sx: {
                    position: "absolute",
                    bottom: 0,
                    width: "full",
                    transform: "matrix(1, 0, 0, -1, 0, 0)",
                  },
                },
                Object(c.c)(
                  Et,
                  {
                    sx: {
                      position: "relative",
                      height: "full",
                      svg: {
                        width: "100%",
                        height: "40vh",
                      },
                    },
                  },
                  Object(c.c)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      id: "contact-wave",
                      viewBox: "0 0 800 338.05",
                      preserveAspectRatio: "none",
                    },
                    Object(c.c)(
                      "path",
                      null,
                      Object(c.c)("animate", {
                        attributeName: "d",
                        values:
                          "M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 100 Z",
                        repeatCount: "indefinite",
                        dur: "30s",
                      })
                    )
                  )
                )
              )
            ),
            Object(c.c)(
              m,
              {
                speed: 0.4,
                offset: t,
                factor: n,
              },
              Object(c.c)(h, null, Object(c.c)(St, null)),
              Object(c.c)(xt, null)
            ),
            Object(c.c)(
              f,
              {
                speed: 0.1,
                offset: t,
                factor: n,
              },
              Object(c.c)(
                R,
                null,
                Object(c.c)(y, {
                  icon: "upDown",
                  hiddenMobile: !0,
                  width: 8,
                  color: "icon_darkest",
                  left: "70%",
                  top: "20%",
                }),
                Object(c.c)(y, {
                  icon: "triangle",
                  width: 8,
                  stroke: !0,
                  color: "icon_darkest",
                  left: "25%",
                  top: "5%",
                })
              ),
              Object(c.c)(
                C,
                null,
                Object(c.c)(y, {
                  icon: "triangle",
                  width: 12,
                  stroke: !0,
                  color: "icon_brightest",
                  left: "95%",
                  top: "50%",
                }),
                Object(c.c)(y, {
                  icon: "circle",
                  width: 6,
                  color: "icon_brightest",
                  left: "85%",
                  top: "15%",
                }),
                Object(c.c)(y, {
                  icon: "upDown",
                  hiddenMobile: !0,
                  width: 8,
                  color: "icon_darkest",
                  left: "45%",
                  top: "10%",
                })
              ),
              Object(c.c)(y, {
                icon: "circle",
                width: 6,
                color: "icon_brightest",
                left: "4%",
                top: "20%",
              }),
              Object(c.c)(y, {
                icon: "circle",
                width: 12,
                color: "icon_darkest",
                left: "70%",
                top: "60%",
              }),
              Object(c.c)(y, {
                icon: "box",
                width: 12,
                color: "icon_darkest",
                left: "20%",
                top: "30%",
              }),
              Object(c.c)(y, {
                icon: "hexa",
                width: 8,
                stroke: !0,
                color: "icon_darkest",
                left: "80%",
                top: "70%",
              })
            )
          );
        };
      t.default = function () {
        return Object(a.d)(
          p,
          null,
          Object(a.d)(
            i.Parallax,
            {
              pages: 5,
            },
            Object(a.d)(W, {
              offset: 0,
              factor: 1,
            }),
            Object(a.d)(D, {
              offset: 1,
              factor: 2,
            }),
            Object(a.d)(q, {
              offset: 3,
              factor: 1,
            }),
            Object(a.d)(At, {
              offset: 4,
              factor: 1,
            })
          )
        );
      };
    },
    lwsE: function (e, t) {
      e.exports = function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      };
    },
    qhky: function (e, t, r) {
      "use strict";
      (function (e) {
        r.d(t, "a", function () {
          return me;
        });
        var n,
          o,
          i,
          a,
          c = r("17x9"),
          s = r.n(c),
          l = r("8+s/"),
          u = r.n(l),
          d = r("bmMU"),
          p = r.n(d),
          f = r("q1tI"),
          h = r.n(f),
          m = r("YVoz"),
          b = r.n(m),
          g = "bodyAttributes",
          y = "htmlAttributes",
          v = "titleAttributes",
          w = {
            BASE: "base",
            BODY: "body",
            HEAD: "head",
            HTML: "html",
            LINK: "link",
            META: "meta",
            NOSCRIPT: "noscript",
            SCRIPT: "script",
            STYLE: "style",
            TITLE: "title",
          },
          O =
            (Object.keys(w).map(function (e) {
              return w[e];
            }),
            "charset"),
          j = "cssText",
          x = "href",
          k = "http-equiv",
          S = "innerHTML",
          T = "itemprop",
          E = "name",
          A = "property",
          R = "rel",
          C = "src",
          _ = "target",
          P = {
            accesskey: "accessKey",
            charset: "charSet",
            class: "className",
            contenteditable: "contentEditable",
            contextmenu: "contextMenu",
            "http-equiv": "httpEquiv",
            itemprop: "itemProp",
            tabindex: "tabIndex",
          },
          L = "defaultTitle",
          M = "defer",
          z = "encodeSpecialCharacters",
          I = "onChangeClientState",
          W = "titleTemplate",
          B = Object.keys(P).reduce(function (e, t) {
            return (e[P[t]] = t), e;
          }, {}),
          N = [w.NOSCRIPT, w.SCRIPT, w.STYLE],
          F =
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
                },
          D = function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          },
          V = (function () {
            function e(e, t) {
              for (var r = 0; r < t.length; r++) {
                var n = t[r];
                (n.enumerable = n.enumerable || !1),
                  (n.configurable = !0),
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(e, n.key, n);
              }
            }
            return function (t, r, n) {
              return r && e(t.prototype, r), n && e(t, n), t;
            };
          })(),
          H =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            },
          q = function (e, t) {
            var r = {};
            for (var n in e)
              t.indexOf(n) >= 0 ||
                (Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]));
            return r;
          },
          U = function (e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || ("object" != typeof t && "function" != typeof t)
              ? e
              : t;
          },
          K = function (e) {
            var t =
              !(arguments.length > 1 && void 0 !== arguments[1]) ||
              arguments[1];
            return !1 === t
              ? String(e)
              : String(e)
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#x27;");
          },
          Y = function (e) {
            var t = J(e, w.TITLE),
              r = J(e, W);
            if (r && t)
              return r.replace(/%s/g, function () {
                return Array.isArray(t) ? t.join("") : t;
              });
            var n = J(e, L);
            return t || n || void 0;
          },
          G = function (e) {
            return J(e, I) || function () {};
          },
          X = function (e, t) {
            return t
              .filter(function (t) {
                return void 0 !== t[e];
              })
              .map(function (t) {
                return t[e];
              })
              .reduce(function (e, t) {
                return H({}, e, t);
              }, {});
          },
          Z = function (e, t) {
            return t
              .filter(function (e) {
                return void 0 !== e[w.BASE];
              })
              .map(function (e) {
                return e[w.BASE];
              })
              .reverse()
              .reduce(function (t, r) {
                if (!t.length)
                  for (var n = Object.keys(r), o = 0; o < n.length; o++) {
                    var i = n[o].toLowerCase();
                    if (-1 !== e.indexOf(i) && r[i]) return t.concat(r);
                  }
                return t;
              }, []);
          },
          Q = function (e, t, r) {
            var n = {};
            return r
              .filter(function (t) {
                return (
                  !!Array.isArray(t[e]) ||
                  (void 0 !== t[e] &&
                    ne(
                      "Helmet: " +
                        e +
                        ' should be of type "Array". Instead found type "' +
                        F(t[e]) +
                        '"'
                    ),
                  !1)
                );
              })
              .map(function (t) {
                return t[e];
              })
              .reverse()
              .reduce(function (e, r) {
                var o = {};
                r.filter(function (e) {
                  for (
                    var r = void 0, i = Object.keys(e), a = 0;
                    a < i.length;
                    a++
                  ) {
                    var c = i[a],
                      s = c.toLowerCase();
                    -1 === t.indexOf(s) ||
                      (r === R && "canonical" === e[r].toLowerCase()) ||
                      (s === R && "stylesheet" === e[s].toLowerCase()) ||
                      (r = s),
                      -1 === t.indexOf(c) ||
                        (c !== S && c !== j && c !== T) ||
                        (r = c);
                  }
                  if (!r || !e[r]) return !1;
                  var l = e[r].toLowerCase();
                  return (
                    n[r] || (n[r] = {}),
                    o[r] || (o[r] = {}),
                    !n[r][l] && ((o[r][l] = !0), !0)
                  );
                })
                  .reverse()
                  .forEach(function (t) {
                    return e.push(t);
                  });
                for (var i = Object.keys(o), a = 0; a < i.length; a++) {
                  var c = i[a],
                    s = b()({}, n[c], o[c]);
                  n[c] = s;
                }
                return e;
              }, [])
              .reverse();
          },
          J = function (e, t) {
            for (var r = e.length - 1; r >= 0; r--) {
              var n = e[r];
              if (n.hasOwnProperty(t)) return n[t];
            }
            return null;
          },
          $ =
            ((n = Date.now()),
            function (e) {
              var t = Date.now();
              t - n > 16
                ? ((n = t), e(t))
                : setTimeout(function () {
                    $(e);
                  }, 0);
            }),
          ee = function (e) {
            return clearTimeout(e);
          },
          te =
            "undefined" != typeof window
              ? (window.requestAnimationFrame &&
                  window.requestAnimationFrame.bind(window)) ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                $
              : e.requestAnimationFrame || $,
          re =
            "undefined" != typeof window
              ? window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                ee
              : e.cancelAnimationFrame || ee,
          ne = function (e) {
            return (
              console && "function" == typeof console.warn && console.warn(e)
            );
          },
          oe = null,
          ie = function (e, t) {
            var r = e.baseTag,
              n = e.bodyAttributes,
              o = e.htmlAttributes,
              i = e.linkTags,
              a = e.metaTags,
              c = e.noscriptTags,
              s = e.onChangeClientState,
              l = e.scriptTags,
              u = e.styleTags,
              d = e.title,
              p = e.titleAttributes;
            se(w.BODY, n), se(w.HTML, o), ce(d, p);
            var f = {
                baseTag: le(w.BASE, r),
                linkTags: le(w.LINK, i),
                metaTags: le(w.META, a),
                noscriptTags: le(w.NOSCRIPT, c),
                scriptTags: le(w.SCRIPT, l),
                styleTags: le(w.STYLE, u),
              },
              h = {},
              m = {};
            Object.keys(f).forEach(function (e) {
              var t = f[e],
                r = t.newTags,
                n = t.oldTags;
              r.length && (h[e] = r), n.length && (m[e] = f[e].oldTags);
            }),
              t && t(),
              s(e, h, m);
          },
          ae = function (e) {
            return Array.isArray(e) ? e.join("") : e;
          },
          ce = function (e, t) {
            void 0 !== e && document.title !== e && (document.title = ae(e)),
              se(w.TITLE, t);
          },
          se = function (e, t) {
            var r = document.getElementsByTagName(e)[0];
            if (r) {
              for (
                var n = r.getAttribute("data-react-helmet"),
                  o = n ? n.split(",") : [],
                  i = [].concat(o),
                  a = Object.keys(t),
                  c = 0;
                c < a.length;
                c++
              ) {
                var s = a[c],
                  l = t[s] || "";
                r.getAttribute(s) !== l && r.setAttribute(s, l),
                  -1 === o.indexOf(s) && o.push(s);
                var u = i.indexOf(s);
                -1 !== u && i.splice(u, 1);
              }
              for (var d = i.length - 1; d >= 0; d--) r.removeAttribute(i[d]);
              o.length === i.length
                ? r.removeAttribute("data-react-helmet")
                : r.getAttribute("data-react-helmet") !== a.join(",") &&
                  r.setAttribute("data-react-helmet", a.join(","));
            }
          },
          le = function (e, t) {
            var r = document.head || document.querySelector(w.HEAD),
              n = r.querySelectorAll(e + "[data-react-helmet]"),
              o = Array.prototype.slice.call(n),
              i = [],
              a = void 0;
            return (
              t &&
                t.length &&
                t.forEach(function (t) {
                  var r = document.createElement(e);
                  for (var n in t)
                    if (t.hasOwnProperty(n))
                      if (n === S) r.innerHTML = t.innerHTML;
                      else if (n === j)
                        r.styleSheet
                          ? (r.styleSheet.cssText = t.cssText)
                          : r.appendChild(document.createTextNode(t.cssText));
                      else {
                        var c = void 0 === t[n] ? "" : t[n];
                        r.setAttribute(n, c);
                      }
                  r.setAttribute("data-react-helmet", "true"),
                    o.some(function (e, t) {
                      return (a = t), r.isEqualNode(e);
                    })
                      ? o.splice(a, 1)
                      : i.push(r);
                }),
              o.forEach(function (e) {
                return e.parentNode.removeChild(e);
              }),
              i.forEach(function (e) {
                return r.appendChild(e);
              }),
              {
                oldTags: o,
                newTags: i,
              }
            );
          },
          ue = function (e) {
            return Object.keys(e).reduce(function (t, r) {
              var n = void 0 !== e[r] ? r + '="' + e[r] + '"' : "" + r;
              return t ? t + " " + n : n;
            }, "");
          },
          de = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return Object.keys(e).reduce(function (t, r) {
              return (t[P[r] || r] = e[r]), t;
            }, t);
          },
          pe = function (e, t, r) {
            switch (e) {
              case w.TITLE:
                return {
                  toComponent: function () {
                    return (
                      (e = t.title),
                      (r = t.titleAttributes),
                      ((n = {
                        key: e,
                      })["data-react-helmet"] = !0),
                      (o = de(r, n)),
                      [h.a.createElement(w.TITLE, o, e)]
                    );
                    var e, r, n, o;
                  },
                  toString: function () {
                    return (function (e, t, r, n) {
                      var o = ue(r),
                        i = ae(t);
                      return o
                        ? "<" +
                            e +
                            ' data-react-helmet="true" ' +
                            o +
                            ">" +
                            K(i, n) +
                            "</" +
                            e +
                            ">"
                        : "<" +
                            e +
                            ' data-react-helmet="true">' +
                            K(i, n) +
                            "</" +
                            e +
                            ">";
                    })(e, t.title, t.titleAttributes, r);
                  },
                };
              case g:
              case y:
                return {
                  toComponent: function () {
                    return de(t);
                  },
                  toString: function () {
                    return ue(t);
                  },
                };
              default:
                return {
                  toComponent: function () {
                    return (function (e, t) {
                      return t.map(function (t, r) {
                        var n,
                          o =
                            (((n = {
                              key: r,
                            })["data-react-helmet"] = !0),
                            n);
                        return (
                          Object.keys(t).forEach(function (e) {
                            var r = P[e] || e;
                            if (r === S || r === j) {
                              var n = t.innerHTML || t.cssText;
                              o.dangerouslySetInnerHTML = {
                                __html: n,
                              };
                            } else o[r] = t[e];
                          }),
                          h.a.createElement(e, o)
                        );
                      });
                    })(e, t);
                  },
                  toString: function () {
                    return (function (e, t, r) {
                      return t.reduce(function (t, n) {
                        var o = Object.keys(n)
                            .filter(function (e) {
                              return !(e === S || e === j);
                            })
                            .reduce(function (e, t) {
                              var o =
                                void 0 === n[t]
                                  ? t
                                  : t + '="' + K(n[t], r) + '"';
                              return e ? e + " " + o : o;
                            }, ""),
                          i = n.innerHTML || n.cssText || "",
                          a = -1 === N.indexOf(e);
                        return (
                          t +
                          "<" +
                          e +
                          ' data-react-helmet="true" ' +
                          o +
                          (a ? "/>" : ">" + i + "</" + e + ">")
                        );
                      }, "");
                    })(e, t, r);
                  },
                };
            }
          },
          fe = function (e) {
            var t = e.baseTag,
              r = e.bodyAttributes,
              n = e.encode,
              o = e.htmlAttributes,
              i = e.linkTags,
              a = e.metaTags,
              c = e.noscriptTags,
              s = e.scriptTags,
              l = e.styleTags,
              u = e.title,
              d = void 0 === u ? "" : u,
              p = e.titleAttributes;
            return {
              base: pe(w.BASE, t, n),
              bodyAttributes: pe(g, r, n),
              htmlAttributes: pe(y, o, n),
              link: pe(w.LINK, i, n),
              meta: pe(w.META, a, n),
              noscript: pe(w.NOSCRIPT, c, n),
              script: pe(w.SCRIPT, s, n),
              style: pe(w.STYLE, l, n),
              title: pe(
                w.TITLE,
                {
                  title: d,
                  titleAttributes: p,
                },
                n
              ),
            };
          },
          he = u()(
            function (e) {
              return {
                baseTag: Z([x, _], e),
                bodyAttributes: X(g, e),
                defer: J(e, M),
                encode: J(e, z),
                htmlAttributes: X(y, e),
                linkTags: Q(w.LINK, [R, x], e),
                metaTags: Q(w.META, [E, O, k, A, T], e),
                noscriptTags: Q(w.NOSCRIPT, [S], e),
                onChangeClientState: G(e),
                scriptTags: Q(w.SCRIPT, [C, S], e),
                styleTags: Q(w.STYLE, [j], e),
                title: Y(e),
                titleAttributes: X(v, e),
              };
            },
            function (e) {
              oe && re(oe),
                e.defer
                  ? (oe = te(function () {
                      ie(e, function () {
                        oe = null;
                      });
                    }))
                  : (ie(e), (oe = null));
            },
            fe
          )(function () {
            return null;
          }),
          me =
            ((o = he),
            (a = i =
              (function (e) {
                function t() {
                  return D(this, t), U(this, e.apply(this, arguments));
                }
                return (
                  (function (e, t) {
                    if ("function" != typeof t && null !== t)
                      throw new TypeError(
                        "Super expression must either be null or a function, not " +
                          typeof t
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
                  })(t, e),
                  (t.prototype.shouldComponentUpdate = function (e) {
                    return !p()(this.props, e);
                  }),
                  (t.prototype.mapNestedChildrenToProps = function (e, t) {
                    if (!t) return null;
                    switch (e.type) {
                      case w.SCRIPT:
                      case w.NOSCRIPT:
                        return {
                          innerHTML: t,
                        };
                      case w.STYLE:
                        return {
                          cssText: t,
                        };
                    }
                    throw new Error(
                      "<" +
                        e.type +
                        " /> elements are self-closing and can not contain children. Refer to our API for more information."
                    );
                  }),
                  (t.prototype.flattenArrayTypeChildren = function (e) {
                    var t,
                      r = e.child,
                      n = e.arrayTypeChildren,
                      o = e.newChildProps,
                      i = e.nestedChildren;
                    return H(
                      {},
                      n,
                      (((t = {})[r.type] = [].concat(n[r.type] || [], [
                        H({}, o, this.mapNestedChildrenToProps(r, i)),
                      ])),
                      t)
                    );
                  }),
                  (t.prototype.mapObjectTypeChildren = function (e) {
                    var t,
                      r,
                      n = e.child,
                      o = e.newProps,
                      i = e.newChildProps,
                      a = e.nestedChildren;
                    switch (n.type) {
                      case w.TITLE:
                        return H(
                          {},
                          o,
                          (((t = {})[n.type] = a),
                          (t.titleAttributes = H({}, i)),
                          t)
                        );
                      case w.BODY:
                        return H({}, o, {
                          bodyAttributes: H({}, i),
                        });
                      case w.HTML:
                        return H({}, o, {
                          htmlAttributes: H({}, i),
                        });
                    }
                    return H({}, o, (((r = {})[n.type] = H({}, i)), r));
                  }),
                  (t.prototype.mapArrayTypeChildrenToProps = function (e, t) {
                    var r = H({}, t);
                    return (
                      Object.keys(e).forEach(function (t) {
                        var n;
                        r = H({}, r, (((n = {})[t] = e[t]), n));
                      }),
                      r
                    );
                  }),
                  (t.prototype.warnOnInvalidChildren = function (e, t) {
                    return !0;
                  }),
                  (t.prototype.mapChildrenToProps = function (e, t) {
                    var r = this,
                      n = {};
                    return (
                      h.a.Children.forEach(e, function (e) {
                        if (e && e.props) {
                          var o = e.props,
                            i = o.children,
                            a = (function (e) {
                              var t =
                                arguments.length > 1 && void 0 !== arguments[1]
                                  ? arguments[1]
                                  : {};
                              return Object.keys(e).reduce(function (t, r) {
                                return (t[B[r] || r] = e[r]), t;
                              }, t);
                            })(q(o, ["children"]));
                          switch ((r.warnOnInvalidChildren(e, i), e.type)) {
                            case w.LINK:
                            case w.META:
                            case w.NOSCRIPT:
                            case w.SCRIPT:
                            case w.STYLE:
                              n = r.flattenArrayTypeChildren({
                                child: e,
                                arrayTypeChildren: n,
                                newChildProps: a,
                                nestedChildren: i,
                              });
                              break;
                            default:
                              t = r.mapObjectTypeChildren({
                                child: e,
                                newProps: t,
                                newChildProps: a,
                                nestedChildren: i,
                              });
                          }
                        }
                      }),
                      (t = this.mapArrayTypeChildrenToProps(n, t))
                    );
                  }),
                  (t.prototype.render = function () {
                    var e = this.props,
                      t = e.children,
                      r = q(e, ["children"]),
                      n = H({}, r);
                    return (
                      t && (n = this.mapChildrenToProps(t, n)),
                      h.a.createElement(o, n)
                    );
                  }),
                  V(t, null, [
                    {
                      key: "canUseDOM",
                      set: function (e) {
                        o.canUseDOM = e;
                      },
                    },
                  ]),
                  t
                );
              })(h.a.Component)),
            (i.propTypes = {
              base: s.a.object,
              bodyAttributes: s.a.object,
              children: s.a.oneOfType([s.a.arrayOf(s.a.node), s.a.node]),
              defaultTitle: s.a.string,
              defer: s.a.bool,
              encodeSpecialCharacters: s.a.bool,
              htmlAttributes: s.a.object,
              link: s.a.arrayOf(s.a.object),
              meta: s.a.arrayOf(s.a.object),
              noscript: s.a.arrayOf(s.a.object),
              onChangeClientState: s.a.func,
              script: s.a.arrayOf(s.a.object),
              style: s.a.arrayOf(s.a.object),
              title: s.a.string,
              titleAttributes: s.a.object,
              titleTemplate: s.a.string,
            }),
            (i.defaultProps = {
              defer: !0,
              encodeSpecialCharacters: !0,
            }),
            (i.peek = o.peek),
            (i.rewind = function () {
              var e = o.rewind();
              return (
                e ||
                  (e = fe({
                    baseTag: [],
                    bodyAttributes: {},
                    encodeSpecialCharacters: !0,
                    htmlAttributes: {},
                    linkTags: [],
                    metaTags: [],
                    noscriptTags: [],
                    scriptTags: [],
                    styleTags: [],
                    title: "",
                    titleAttributes: {},
                  })),
                e
              );
            }),
            a);
        me.renderStatic = me.rewind;
      }.call(this, r("yLpj")));
    },
    rIun: function (e, t, r) {
      "use strict";

      function n(e) {
        return e && "object" == typeof e && "default" in e ? e.default : e;
      }
      Object.defineProperty(t, "__esModule", {
        value: !0,
      });
      var o = n(r("pVnL")),
        i = n(r("8OQS")),
        a = n(r("VbXa")),
        c = n(r("q1tI")),
        s = r("P4c3"),
        l = s.Globals.defaultElement,
        u = s.animated(l),
        d = c.createContext(null),
        p = d.Provider,
        f = d.Consumer;

      function h(e) {
        return e ? "scrollLeft" : "scrollTop";
      }
      var m = (function (e) {
        function t() {
          return e.apply(this, arguments) || this;
        }
        a(t, e);
        var r = t.prototype;
        return (
          (r.componentDidMount = function () {
            var e = this.parent;
            e && ((e.layers = e.layers.concat(this)), e.update());
          }),
          (r.componentWillUnmount = function () {
            var e = this,
              t = this.parent;
            t &&
              ((t.layers = t.layers.filter(function (t) {
                return t !== e;
              })),
              t.update());
          }),
          (r.setPosition = function (e, t, r) {
            void 0 === r && (r = !1);
            var n = this.parent.props.config,
              o = Math.floor(this.props.offset) * e,
              i = e * this.props.offset + o * this.props.speed,
              a = parseFloat(-t * this.props.speed + i);
            this.controller.update({
              translate: a,
              config: n,
              immediate: r,
            });
          }),
          (r.setHeight = function (e, t) {
            void 0 === t && (t = !1);
            var r = this.parent.props.config,
              n = parseFloat(e * this.props.factor);
            this.controller.update({
              space: n,
              config: r,
              immediate: t,
            });
          }),
          (r.initialize = function () {
            var e = this.props,
              t = this.parent,
              r = Math.floor(e.offset) * t.space,
              n = t.space * e.offset + r * e.speed,
              o = parseFloat(-t.current * e.speed + n);
            this.controller = new s.Controller({
              space: t.space * e.factor,
              translate: o,
            });
          }),
          (r.renderLayer = function () {
            var e,
              t = this.props,
              r = t.style,
              n = t.children,
              a = (t.offset, t.speed, t.factor, t.className),
              s = i(t, [
                "style",
                "children",
                "offset",
                "speed",
                "factor",
                "className",
              ]),
              l = this.parent.props.horizontal,
              d = this.controller.interpolations.translate.interpolate(
                function (e) {
                  return l
                    ? "translate3d(" + e + "px,0,0)"
                    : "translate3d(0," + e + "px,0)";
                }
              );
            return c.createElement(
              u,
              o({}, s, {
                className: a,
                style: o(
                  ((e = {
                    position: "absolute",
                    backgroundSize: "auto",
                    backgroundRepeat: "no-repeat",
                    willChange: "transform",
                  }),
                  (e[l ? "height" : "width"] = "100%"),
                  (e[l ? "width" : "height"] =
                    this.controller.interpolations.space),
                  (e.WebkitTransform = d),
                  (e.MsTransform = d),
                  (e.transform = d),
                  e),
                  r
                ),
              }),
              n
            );
          }),
          (r.render = function () {
            var e = this;
            return c.createElement(f, null, function (t) {
              return (
                t && !e.parent && ((e.parent = t), e.initialize()),
                e.renderLayer()
              );
            });
          }),
          t
        );
      })(c.PureComponent);
      m.defaultProps = {
        factor: 1,
        offset: 0,
        speed: 0,
      };
      var b = (function (e) {
        function t(t) {
          var r;
          return (
            ((r = e.call(this) || this).moveItems = function () {
              r.layers.forEach(function (e) {
                return e.setPosition(r.space, r.current);
              }),
                (r.busy = !1);
            }),
            (r.scrollerRaf = function () {
              return s.Globals.requestFrame(r.moveItems);
            }),
            (r.onScroll = function (e) {
              var t = r.props.horizontal;
              r.busy ||
                ((r.busy = !0), r.scrollerRaf(), (r.current = e.target[h(t)]));
            }),
            (r.update = function () {
              var e = r.props,
                t = e.scrolling,
                n = e.horizontal,
                o = h(n);
              r.container &&
                ((r.space = r.container[n ? "clientWidth" : "clientHeight"]),
                t
                  ? (r.current = r.container[o])
                  : (r.container[o] = r.current = r.offset * r.space),
                r.content &&
                  (r.content.style[n ? "width" : "height"] =
                    r.space * r.props.pages + "px"),
                r.layers.forEach(function (e) {
                  e.setHeight(r.space, !0),
                    e.setPosition(r.space, r.current, !0);
                }));
            }),
            (r.updateRaf = function () {
              s.Globals.requestFrame(r.update), setTimeout(r.update, 150);
            }),
            (r.scrollStop = function (e) {
              return r.controller.stop();
            }),
            (r.state = {
              ready: !1,
            }),
            (r.layers = []),
            (r.space = 0),
            (r.current = 0),
            (r.offset = 0),
            (r.busy = !1),
            (r.controller = new s.Controller({
              scroll: 0,
            })),
            r
          );
        }
        a(t, e);
        var r = t.prototype;
        return (
          (r.scrollTo = function (e) {
            var t = this.props,
              r = t.horizontal,
              n = t.config,
              o = h(r);
            this.scrollStop(), (this.offset = e);
            var i = this.container;
            this.controller.update({
              scroll: e * this.space,
              config: n,
              onFrame: function (e) {
                var t = e.scroll;
                return (i[o] = t);
              },
            });
          }),
          (r.componentDidMount = function () {
            window.addEventListener("resize", this.updateRaf, !1),
              this.update(),
              this.setState({
                ready: !0,
              });
          }),
          (r.componentWillUnmount = function () {
            window.removeEventListener("resize", this.updateRaf, !1);
          }),
          (r.componentDidUpdate = function () {
            this.update();
          }),
          (r.render = function () {
            var e,
              t = this,
              r = this.props,
              n = r.style,
              i = r.innerStyle,
              a = r.pages,
              s = r.id,
              u = r.className,
              d = r.scrolling,
              f = r.children,
              h = r.horizontal,
              m = d ? "scroll" : "hidden";
            return c.createElement(
              l,
              {
                ref: function (e) {
                  return (t.container = e);
                },
                onScroll: this.onScroll,
                onWheel: d ? this.scrollStop : null,
                onTouchStart: d ? this.scrollStop : null,
                style: o(
                  {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    overflow: m,
                    overflowY: h ? "hidden" : m,
                    overflowX: h ? m : "hidden",
                    WebkitOverflowScrolling: "touch",
                    WebkitTransform: "translate(0px,0px)",
                    MsTransform: "translate(0px,0px)",
                    transform: "translate3d(0px,0px,0px)",
                  },
                  n
                ),
                id: s,
                className: u,
              },
              this.state.ready &&
                c.createElement(
                  l,
                  {
                    ref: function (e) {
                      return (t.content = e);
                    },
                    style: o(
                      ((e = {
                        position: "absolute",
                      }),
                      (e[h ? "height" : "width"] = "100%"),
                      (e.WebkitTransform = "translate(0px,0px)"),
                      (e.MsTransform = "translate(0px,0px)"),
                      (e.transform = "translate3d(0px,0px,0px)"),
                      (e.overflow = "hidden"),
                      (e[h ? "width" : "height"] = this.space * a),
                      e),
                      i
                    ),
                  },
                  c.createElement(
                    p,
                    {
                      value: this,
                    },
                    f
                  )
                )
            );
          }),
          t
        );
      })(c.PureComponent);
      (b.Layer = m),
        (b.defaultProps = {
          config: s.config.slow,
          scrolling: !0,
          horizontal: !1,
        }),
        (t.Parallax = b),
        (t.ParallaxLayer = m);
    },
    yLpj: function (e, t) {
      var r;
      r = (function () {
        return this;
      })();
      try {
        r = r || new Function("return this")();
      } catch (n) {
        "object" == typeof window && (r = window);
      }
      e.exports = r;
    },
    zLVn: function (e, t, r) {
      "use strict";

      function n(e, t) {
        if (null == e) return {};
        var r,
          n,
          o = {},
          i = Object.keys(e);
        for (n = 0; n < i.length; n++)
          (r = i[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
        return o;
      }
      r.r(t),
        r.d(t, "default", function () {
          return n;
        });
    },
  },
]);
//# sourceMappingURL=component---src-lekoarts-gatsby-theme-cara-templates-cara-tsx-f56d391a70d34d0857ab.js.map
