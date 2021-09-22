(function () {
  "use strict";

  const g =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global
        ? global
        : this;

  const h =
    "function" == typeof Object.create
      ? Object.create
      : a => {
          function c() {}
          c.prototype = a;
          return new c();
        };

  let k;
  if ("function" == typeof Object.setPrototypeOf) k = Object.setPrototypeOf;
  else {
    let l;
    a: {
      const m = { V: !0 }, n = {};
      try {
        n.__proto__ = m;
        l = n.V;
        break a;
      } catch (a) {}
      l = !1;
    }
    k = l
      ? (a, c) => {
          a.__proto__ = c;
          if (a.__proto__ !== c) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  const p = k;
  function q(a, c) {
    function b() {}
    b.prototype = c.prototype;
    a.$ = c.prototype;
    a.prototype = new b();
    a.prototype.constructor = a;
    a.ga = function (a, b, d) {
      for (
        var e = Array(arguments.length - 2), f = 2;
        f < arguments.length;
        f++
      )
        e[f - 2] = arguments[f];
      return c.prototype[b].apply(a, e);
    };
  }

  const r = {
      F: ["BC", "AD"],
      D: ["Before Christ", "Anno Domini"],
      H: "JFMAMJJASOND".split(""),
      N: "JFMAMJJASOND".split(""),
      G: "January February March April May June July August September October November December".split(
        " "
      ),
      M: "January February March April May June July August September October November December".split(
        " "
      ),
      J: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
      P: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
      T: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
      S: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
      L: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
      R: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
      ca: "SMTWTFS".split(""),
      O: "SMTWTFS".split(""),
      K: ["Q1", "Q2", "Q3", "Q4"],
      I: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
      B: ["AM", "PM"],
      aa: ["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"],
      ea: ["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"],
      ba: ["{1} 'at' {0}", "{1} 'at' {0}", "{1}, {0}", "{1}, {0}"],
      j: 6,
      fa: [5, 6],
      l: 5,
    };

  let t = r;
  t = r;
  function u(a) {
    if (!v.test(a)) return a;
    -1 != a.indexOf("&") && (a = a.replace(x, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(y, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(z, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(A, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(B, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(C, "&#0;"));
    return a;
  }
  var x = /&/g;
  var y = /</g;
  var z = />/g;
  var A = /"/g;
  var B = /'/g;
  var C = /\x00/g;
  var v = /[\x00&<>"']/;

  const aa = String.prototype.repeat
    ? (a, c) => {
        return a.repeat(c);
      }
    : (a, c) => {
        return Array(c + 1).join(a);
      };

  function D(a, c) {
    a = String(a);
    let b = a.indexOf(".");
    -1 == b && (b = a.length);
    return aa("0", Math.max(0, c - b)) + a;
  }
  function E(a, c, b, f, e) {
    a = new Date(a, c, b);
    e = e || 0;
    return (
      a.valueOf() +
      864e5 *
        ((((void 0 !== f ? f : 3) - e + 7) % 7) -
          ((((a.getDay() + 6) % 7) - e + 7) % 7))
    );
  }
  function F() {}
  function G(a) {
    if ("number" == typeof a) {
      var c = new F();
      c.f = a;
      let b = a;
      if (0 == b) b = "Etc/GMT";
      else {
        var f = ["Etc/GMT", 0 > b ? "-" : "+"];
        b = Math.abs(b);
        f.push(Math.floor(b / 60) % 100);
        b %= 60;
        0 != b && f.push(":", D(b, 2));
        b = f.join("");
      }
      c.g = b;
      b = a;
      0 == b
        ? (b = "UTC")
        : ((f = ["UTC", 0 > b ? "+" : "-"]),
          (b = Math.abs(b)),
          f.push(Math.floor(b / 60) % 100),
          (b %= 60),
          0 != b && f.push(":", b),
          (b = f.join("")));
      a = H(a);
      c.i = [b, b];
      c.a = { da: a, m: a };
      c.b = [];
      return c;
    }
    c = new F();
    c.g = a.id;
    c.f = -a.std_offset;
    c.i = a.names;
    c.a = a.names_ext;
    c.b = a.transitions;
    return c;
  }
  function H(a) {
    const c = ["GMT"];
    c.push(0 >= a ? "+" : "-");
    a = Math.abs(a);
    c.push(D(Math.floor(a / 60) % 100, 2), ":", D(a % 60, 2));
    return c.join("");
  }
  function I(a, c) {
    c =
      Date.UTC(
        c.getUTCFullYear(),
        c.getUTCMonth(),
        c.getUTCDate(),
        c.getUTCHours(),
        c.getUTCMinutes()
      ) / 36e5;
    for (var b = 0; b < a.b.length && c >= a.b[b]; ) b += 2;
    return 0 == b ? 0 : a.b[b - 1];
  }
  function ba() {
    this.b = [];
    this.a = t;
    let a = "MMM d, yyyy";
    for (ca && (a = a.replace(/\u200f/g, "")); a; ) {
      for (var c = a, b = 0; b < J.length; ++b) {
        const f = a.match(J[b]);
        if (f) {
          let e = f[0];
          a = a.substring(e.length);
          0 == b &&
            ("''" == e
              ? (e = "'")
              : ((e = e.substring(1, "'" == f[1] ? e.length - 1 : e.length)),
                (e = e.replace(/''/g, "'"))));
          this.b.push({ text: e, type: b });
          break;
        }
      }
      if (c === a) throw Error("Malformed pattern part: " + a);
    }
  }
  var J = [
    /^'(?:[^']|'')*('|$)/,
    /^(?:G+|y+|Y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|V+|w+|z+|Z+)/,
    /^[^'GyYMkSEahKHcLQdmsvVwzZ]+/,
  ];
  function K(a) {
    return a.getHours ? a.getHours() : 0;
  }
  function L(a, c) {
    c = String(c);
    a = a.a || t;
    if (void 0 !== a.U) {
      for (var b = [], f = 0; f < c.length; f++) {
        const e = c.charCodeAt(f);
        b.push(
          48 <= e && 57 >= e ? String.fromCharCode(a.U + e - 48) : c.charAt(f)
        );
      }
      c = b.join("");
    }
    return c;
  }
  var ca = !1;
  function M(a) {
    if (!(a.getHours && a.getSeconds && a.getMinutes))
      throw Error(
        "The date to format has no time (probably a goog.date.Date). Use Date or goog.date.DateTime, or use a pattern without time fields."
      );
  }
  function da(a, c, b, f, e) {
    let d = c.length;
    switch (c.charAt(0)) {
      case "G":
        return (b = 0 < f.getFullYear() ? 1 : 0), 4 <= d ? a.a.D[b] : a.a.F[b];
      case "y":
        return (
          (b = f.getFullYear()),
          0 > b && (b = -b),
          2 == d && (b %= 100),
          L(a, D(b, d))
        );
      case "Y":
        return (
          (b = new Date(
            E(f.getFullYear(), f.getMonth(), f.getDate(), a.a.l, a.a.j)
          ).getFullYear()),
          0 > b && (b = -b),
          2 == d && (b %= 100),
          L(a, D(b, d))
        );
      case "M":
        a: switch (((b = f.getMonth()), d)) {
          case 5:
            d = a.a.H[b];
            break a;
          case 4:
            d = a.a.G[b];
            break a;
          case 3:
            d = a.a.J[b];
            break a;
          default:
            d = L(a, D(b + 1, d));
        }
        return d;
      case "k":
        return M(e), L(a, D(K(e) || 24, d));
      case "S":
        return L(
          a,
          (e.getMilliseconds() / 1e3).toFixed(Math.min(3, d)).substr(2) +
            (3 < d ? D(0, d - 3) : "")
        );
      case "E":
        return (b = f.getDay()), 4 <= d ? a.a.T[b] : a.a.L[b];
      case "a":
        return M(e), (d = K(e)), a.a.B[12 <= d && 24 > d ? 1 : 0];
      case "h":
        return M(e), L(a, D(K(e) % 12 || 12, d));
      case "K":
        return M(e), L(a, D(K(e) % 12, d));
      case "H":
        return M(e), L(a, D(K(e), d));
      case "c":
        a: switch (((b = f.getDay()), d)) {
          case 5:
            d = a.a.O[b];
            break a;
          case 4:
            d = a.a.S[b];
            break a;
          case 3:
            d = a.a.R[b];
            break a;
          default:
            d = L(a, D(b, 1));
        }
        return d;
      case "L":
        a: switch (((b = f.getMonth()), d)) {
          case 5:
            d = a.a.N[b];
            break a;
          case 4:
            d = a.a.M[b];
            break a;
          case 3:
            d = a.a.P[b];
            break a;
          default:
            d = L(a, D(b + 1, d));
        }
        return d;
      case "Q":
        return (b = Math.floor(f.getMonth() / 3)), 4 > d ? a.a.K[b] : a.a.I[b];
      case "d":
        return L(a, D(f.getDate(), d));
      case "m":
        return M(e), L(a, D(e.getMinutes(), d));
      case "s":
        return M(e), L(a, D(e.getSeconds(), d));
      case "v":
        return (d = G(b.getTimezoneOffset())), d.g;
      case "V":
        return (
          (a = G(b.getTimezoneOffset())),
          2 >= d
            ? a.g
            : 0 < I(a, b)
            ? void 0 !== a.a.C
              ? a.a.C
              : a.a.DST_GENERIC_LOCATION
            : void 0 !== a.a.m
            ? a.a.m
            : a.a.STD_GENERIC_LOCATION
        );
      case "w":
        return (
          (b = E(e.getFullYear(), e.getMonth(), e.getDate(), a.a.l, a.a.j)),
          L(
            a,
            D(
              Math.floor(
                Math.round(
                  (b - new Date(new Date(b).getFullYear(), 0, 1).valueOf()) /
                    864e5
                ) / 7
              ) + 1,
              d
            )
          )
        );
      case "z":
        return (
          (a = G(b.getTimezoneOffset())),
          4 > d ? a.i[0 < I(a, b) ? 2 : 0] : a.i[0 < I(a, b) ? 3 : 1]
        );
      case "Z":
        return (
          (c = G(b.getTimezoneOffset())),
          4 > d
            ? ((d = -(c.f - I(c, b))),
              (a = [0 > d ? "-" : "+"]),
              (d = Math.abs(d)),
              a.push(D(Math.floor(d / 60) % 100, 2), D(d % 60, 2)),
              (d = a.join("")))
            : (d = L(a, H(c.f - I(c, b)))),
          d
        );
      default:
        return "";
    }
  }
  function N() {
    this.a = O;
  }
  var O = {};
  const P = {}, ea = {};
  function Q() {
    throw Error("Do not instantiate directly");
  }
  Q.prototype.v = null;
  Q.prototype.toString = function () {
    return this.h;
  };
  function R() {
    Q.call(this);
  }
  q(R, Q);
  R.prototype.c = P;
  function fa(a) {
    if (null != a)
      switch (a.v) {
        case 1:
          return 1;
        case -1:
          return -1;
        case 0:
          return 0;
      }
    return null;
  }
  function T(a) {
    return null != a && a.c === P
      ? a
      : a instanceof N
      ? U(
          a instanceof N && a.constructor === N && a.a === O
            ? ""
            : "type_error:SafeHtml",
          null
        )
      : U(u(String(String(a))), fa(a));
  }
  var U = (a => {
    function c(a) {
      this.h = a;
    }
    c.prototype = a.prototype;
    return (a, f) => {
      a = new c(String(a));
      void 0 !== f && (a.v = f);
      return a;
    };
  })(R);
  const ha = (a => {
    let c = !1, b;
    return () => {
      c || ((b = a()), (c = !0));
      return b;
    };
  })(() => {
    const a = document.createElement("div");
    a.innerHTML = "<div><div></div></div>";
    const c = a.firstChild.firstChild;
    a.innerHTML = "";
    return !c.parentElement;
  });/*

Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
  function V() {
    const a = HTMLElement.call(this) || this;
    a.o = null;
    a.u = null;
    a.w = !1;
    a.A = null;
    a.s = null;
    return a;
  }
  const W = HTMLElement;
  V.prototype = h(W.prototype);
  V.prototype.constructor = V;
  if (p) p(V, W);
  else
    for (const X in W)
      if ("prototype" != X)
        if (Object.defineProperties) {
          const Y = Object.getOwnPropertyDescriptor(W, X);
          Y && Object.defineProperty(V, X, Y);
        } else V[X] = W[X];
  V.$ = W.prototype;
  V.prototype.connectedCallback = function () {
    this.w || Z(this);
  };
  V.prototype.connectedCallback = V.prototype.connectedCallback;
  V.prototype.attributeChangedCallback = function (a) {
    switch (a) {
      case "last-updated":
        this.hasAttribute("last-updated") &&
          (this.A = this.getAttribute("last-updated"));
        break;
      case "authors":
        this.hasAttribute("authors") && (this.o = this.getAttribute("authors"));
        break;
      case "codelab-title":
        this.hasAttribute("codelab-title") &&
          (this.u = this.getAttribute("codelab-title"));
        break;
      case "badge-id":
        this.hasAttribute("badge-id") &&
          (this.s = this.getAttribute("badge-id"));
    }
    Z(this);
  };
  V.prototype.attributeChangedCallback = V.prototype.attributeChangedCallback;
  function Z(a) {
    let c = a.A;
    if (c) {
      c = new Date(c);
      var b = new ba();
      if (!c) throw Error("The date to format must be non-null.");
      for (var f = [], e = 0; e < b.b.length; ++e) {
        var d = b.b[e].text;
        1 == b.b[e].type ? f.push(da(b, d, c, c, c)) : f.push(d);
      }
      c = f.join("");
    } else c = null;
    e = e = { Z: c, W: a.o, Y: a.u.split(":").join(":||").split("||"), X: a.s };
    c = e.Y;
    b = e.Z;
    f = e.W;
    e = e.X;
    d = "";
    if (c) {
      d += '<div class="codelab-title">';
      for (let S = c.length, w = 0; w < S; w++)
        d += '<div class="token">' + T(c[w]) + "</div>";
      d += "</div>";
    }
    d +=
      '<div class="about-card"><h2 class="title">About this codelab</h2>' +
      (b
        ? '<div class="last-updated"><i class="material-icons">subject</i>Last updated ' +
          T(b) +
          "</div>"
        : "") +
      '<div class="authors"><i class="material-icons">account_circle</i>' +
      (f ? "Written by " + T(f) : "Written by a Googler") +
      "</div>" +
      (e
        ? '<devsite-badge-to-earn badge-id="$badgeId"></devsite-badge-to-earn>'
        : "") +
      "</div>";
    c = U(d);
    a: {
      if (c instanceof Q) {
        if (c.c === P) {
          c = c.h;
          break a;
        }
        if (c.c === ea) {
          c = u(c.h);
          break a;
        }
      }
      c = "zSoyz";
    }
    if (ha()) for (; a.lastChild; ) a.removeChild(a.lastChild);
    a.innerHTML = c;
    a.w = !0;
  }
  g.Object.defineProperties(V, {
    observedAttributes: {
      configurable: !0,
      enumerable: !0,
      get() {
        return ["authors", "last-updated", "codelab-title"];
      },
    },
  });
  try {
    window.customElements.define("google-codelab-about", V);
  } catch (a) {
    console.warn("googlecodelabs.CodelabAbout", a);
  }
}.call(this));
(function () {
  "use strict";
  const aa =
            "function" == typeof Object.defineProperties
              ? Object.defineProperty
              : (a, b, c) => {
                  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
                },
        h =
          "undefined" != typeof window && window === this
            ? this
            : "undefined" != typeof global && null != global
            ? global
            : this;
  function ba() {
    ba = () => {};
    h.Symbol || (h.Symbol = ca);
  }
  var ca = (() => {
    let a = 0;
    return b => {
      return "jscomp_symbol_" + (b || "") + a++;
    };
  })();
  function k() {
    ba();
    let a = h.Symbol.iterator;
    a || (a = h.Symbol.iterator = h.Symbol("iterator"));
    "function" != typeof Array.prototype[a] &&
      aa(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value() {
          return da(this);
        },
      });
    k = () => {};
  }
  function da(a) {
    let b = 0;
    return ea(() => {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }
  function ea(a) {
    k();
    a = { next: a };
    a[h.Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  function fa(a) {
    k();
    const b = a[Symbol.iterator];
    return b ? b.call(a) : da(a);
  }
  function ha(a, b) {
    if (b) {
      let c = h;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        const e = a[d];
        e in c || (c[e] = {});
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d &&
        null != b &&
        aa(c, a, { configurable: !0, writable: !0, value: b });
    }
  }
  ha("Promise", a => {
    function b(a) {
      this.b = 0;
      this.g = void 0;
      this.a = [];
      const b = this.c();
      try {
        a(b.resolve, b.reject);
      } catch (G) {
        b.reject(G);
      }
    }
    function c() {
      this.a = null;
    }
    function d(a) {
      return a instanceof b
        ? a
        : new b(b => {
            b(a);
          });
    }
    if (a) return a;
    c.prototype.b = function (a) {
      null == this.a && ((this.a = []), this.f());
      this.a.push(a);
    };
    c.prototype.f = function () {
      const a = this;
      this.c(() => {
        a.h();
      });
    };
    const e = h.setTimeout;
    c.prototype.c = a => {
      e(a, 0);
    };
    c.prototype.h = function () {
      for (; this.a && this.a.length; ) {
        const a = this.a;
        this.a = [];
        for (let b = 0; b < a.length; ++b) {
          const c = a[b];
          a[b] = null;
          try {
            c();
          } catch (H) {
            this.g(H);
          }
        }
      }
      this.a = null;
    };
    c.prototype.g = function (a) {
      this.c(() => {
        throw a;
      });
    };
    b.prototype.c = function () {
      class a extends c {
        constructor(a) {
          return d => {
            c || ((c = !0), a.call(b, d));
          };
        }

        static M(a, c, f) {
          for (
            var d = Array(arguments.length - 2), e = 2;
            e < arguments.length;
            e++
          )
            d[e - 2] = arguments[e];
          return b.prototype[c].apply(a, d);
        }

        static onload() {
          return b(a);
        }

        static onerror() {
          a.parentNode && a.parentNode.removeChild(a);
          c();
        }

        static D(a, d, f) {
          for (
            var c = Array(arguments.length - 2), e = 2;
            e < arguments.length;
            e++
          )
            c[e - 2] = arguments[e];
          return b.prototype[d].apply(a, c);
        }

        static G(a, c, f) {
          for (
            var d = Array(arguments.length - 2), e = 2;
            e < arguments.length;
            e++
          )
            d[e - 2] = arguments[e];
          return b.prototype[c].apply(a, d);
        }

        static ma(a, c, f) {
          for (
            var d = Array(arguments.length - 2), e = 2;
            e < arguments.length;
            e++
          )
            d[e - 2] = arguments[e];
          return b.prototype[c].apply(a, d);
        }
      }

      var b = this,
        c = !1;
      return { resolve: a(this.J), reject: a(this.f) };
    };
    b.prototype.J = function (a) {
      if (a === this)
        this.f(new TypeError("A Promise cannot resolve to itself"));
      else if (a instanceof b) this.K(a);
      else {
        a: switch (typeof a) {
          case "object":
            let c = null != a;
            break a;
          case "function":
            c = !0;
            break a;
          default:
            c = !1;
        }
        c ? this.H(a) : this.h(a);
      }
    };
    b.prototype.H = function (a) {
      let b = void 0;
      try {
        b = a.then;
      } catch (G) {
        this.f(G);
        return;
      }
      "function" == typeof b ? this.L(b, a) : this.h(a);
    };
    b.prototype.f = function (a) {
      this.i(2, a);
    };
    b.prototype.h = function (a) {
      this.i(1, a);
    };
    b.prototype.i = function (a, b) {
      if (0 != this.b)
        throw Error(
          "Cannot settle(" +
            a +
            ", " +
            b +
            "): Promise already settled in state" +
            this.b
        );
      this.b = a;
      this.g = b;
      this.u();
    };
    b.prototype.u = function () {
      if (null != this.a) {
        for (let a = 0; a < this.a.length; ++a) f.b(this.a[a]);
        this.a = null;
      }
    };
    var f = new c();
    b.prototype.K = function (a) {
      const b = this.c();
      a.m(b.resolve, b.reject);
    };
    b.prototype.L = function (a, b) {
      const c = this.c();
      try {
        a.call(b, c.resolve, c.reject);
      } catch (H) {
        c.reject(H);
      }
    };
    b.prototype.then = function (a, c) {
      function d(a, b) {
        return "function" == typeof a
          ? b => {
              try {
                e(a(b));
              } catch ($a) {
                f($a);
              }
            }
          : b;
      }
      var e;
      var f;

      const g = new b((a, b) => {
        e = a;
        f = b;
      });

      this.m(d(a, e), d(c, f));
      return g;
    };
    b.prototype.catch = function (a) {
      return this.then(void 0, a);
    };
    b.prototype.m = function (a, b) {
      function c() {
        switch (d.b) {
          case 1:
            a(d.g);
            break;
          case 2:
            b(d.g);
            break;
          default:
            throw Error("Unexpected state: " + d.b);
        }
      }
      var d = this;
      null == this.a ? f.b(c) : this.a.push(c);
    };
    b.resolve = d;
    b.reject = a => {
      return new b((b, c) => {
        c(a);
      });
    };
    b.race = a => {
      return new b((b, c) => {
        for (let e = fa(a), f = e.next(); !f.done; f = e.next())
          d(f.value).m(b, c);
      });
    };
    b.all = a => {
      const c = fa(a);
      let e = c.next();
      return e.done
        ? d([])
        : new b((a, b) => {
            function f(b) {
              return c => {
                g[b] = c;
                l--;
                0 == l && a(g);
              };
            }
            var g = [],
              l = 0;
            do
              g.push(void 0),
                l++,
                d(e.value).m(f(g.length - 1), b),
                (e = c.next());
            while (!e.done);
          });
    };
    return b;
  });
  ha("Promise.prototype.finally", a => {
    return a
      ? a
      : function (a) {
          return this.then(
            b => {
              return Promise.resolve(a()).then(() => {
                return b;
              });
            },
            b => {
              return Promise.resolve(a()).then(() => {
                throw b;
              });
            }
          );
        };
  });
  let m;
  if ("function" == typeof Object.setPrototypeOf) m = Object.setPrototypeOf;
  else {
    let n;
    a: {
      const ia = { D: !0 }, ja = {};
      try {
        ja.__proto__ = ia;
        n = ja.D;
        break a;
      } catch (a) {}
      n = !1;
    }
    m = n
      ? (a, b) => {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  const ka = m;
  function p() {
    this.f = !1;
    this.a = null;
    this.i = void 0;
    this.c = 1;
    this.u = this.h = 0;
    this.b = null;
  }
  function q(a) {
    if (a.f) throw new TypeError("Generator is already running");
    a.f = !0;
  }
  p.prototype.g = function (a) {
    this.i = a;
  };
  function r(a, b) {
    a.b = { F: b, G: !0 };
    a.c = a.h || a.u;
  }
  p.prototype.return = function (a) {
    this.b = { return: a };
    this.c = this.u;
  };
  function la(a) {
    const b = ma();
    a.c = 4;
    return { value: b };
  }
  function na(a) {
    a.h = 0;
    a.b = null;
  }
  function oa(a) {
    this.a = new p();
    this.b = a;
  }
  function pa(a, b) {
    q(a.a);
    const c = a.a.a;
    if (c)
      return t(
        a,
        "return" in c
          ? c["return"]
          : a => {
              return { value: a, done: !0 };
            },
        b,
        a.a.return
      );
    a.a.return(b);
    return u(a);
  }
  function t(a, b, c, d) {
    try {
      const e = b.call(a.a.a, c);
      if (!(e instanceof Object))
        throw new TypeError("Iterator result " + e + " is not an object");
      if (!e.done) return (a.a.f = !1), e;
      var f = e.value;
    } catch (g) {
      return (a.a.a = null), r(a.a, g), u(a);
    }
    a.a.a = null;
    d.call(a.a, f);
    return u(a);
  }
  function u(a) {
    for (; a.a.c; )
      try {
        var b = a.b(a.a);
        if (b) return (a.a.f = !1), { value: b.value, done: !1 };
      } catch (c) {
        (a.a.i = void 0), r(a.a, c);
      }
    a.a.f = !1;
    if (a.a.b) {
      b = a.a.b;
      a.a.b = null;
      if (b.G) throw b.F;
      return { value: b.return, done: !0 };
    }
    return { value: void 0, done: !0 };
  }
  function qa(a) {
    this.next = b => {
      q(a.a);
      a.a.a ? (b = t(a, a.a.a.next, b, a.a.g)) : (a.a.g(b), (b = u(a)));
      return b;
    };
    this.throw = b => {
      q(a.a);
      a.a.a ? (b = t(a, a.a.a["throw"], b, a.a.g)) : (r(a.a, b), (b = u(a)));
      return b;
    };
    this.return = b => {
      return pa(a, b);
    };
    k();
    this[Symbol.iterator] = function () {
      return this;
    };
  }
  function ra(a) {
    function b(b) {
      return a.next(b);
    }
    function c(b) {
      return a.throw(b);
    }
    return new Promise((d, e) => {
      function f(a) {
        a.done ? d(a.value) : Promise.resolve(a.value).then(b, c).then(f, e);
      }
      f(a.next());
    });
  }
  const sa =
            "function" == typeof Object.create
              ? Object.create
              : a => {
                  function b() {}
                  b.prototype = a;
                  return new b();
                },
        v = this;
  function w() {}
  function x(a) {
    const b = typeof a;
    if ("object" == b)
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return b;
        const c = Object.prototype.toString.call(a);
        if ("[object Window]" == c) return "object";
        if (
          "[object Array]" == c ||
          ("number" == typeof a.length &&
            "undefined" != typeof a.splice &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("splice"))
        )
          return "array";
        if (
          "[object Function]" == c ||
          ("undefined" != typeof a.call &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("call"))
        )
          return "function";
      } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  }
  function y(a) {
    const b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  const ta = "closure_uid_" + ((1e9 * Math.random()) >>> 0);
  let ua = 0;
  function va(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.C = b.prototype;
  }
  function wa() {
    0 != xa && (this[ta] || (this[ta] = ++ua));
  }
  var xa = 0;
  const ya = Array.prototype.indexOf
    ? (a, b) => {
        return Array.prototype.indexOf.call(a, b, void 0);
      }
    : (a, b) => {
        if ("string" == typeof a)
          return "string" == typeof b && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (let c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1;
      };
  const za = String.prototype.trim
    ? a => {
        return a.trim();
      }
    : a => {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
      };
  function z(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  let A;
  a: {
    const Aa = v.navigator;
    if (Aa) {
      const Ba = Aa.userAgent;
      if (Ba) {
        A = Ba;
        break a;
      }
    }
    A = "";
  }
  function Ca(a, b, c) {
    for (const d in a) b.call(c, a[d], d, a);
  }
  function B(a) {
    B[" "](a);
    return a;
  }
  B[" "] = w;
  const Da = -1 != A.indexOf("Opera"),
        C = -1 != A.indexOf("Trident") || -1 != A.indexOf("MSIE"),
        Ea = -1 != A.indexOf("Edge"),
        Fa =
          -1 != A.indexOf("Gecko") &&
          !(-1 != A.toLowerCase().indexOf("webkit") && -1 == A.indexOf("Edge")) &&
          !(-1 != A.indexOf("Trident") || -1 != A.indexOf("MSIE")) &&
          -1 == A.indexOf("Edge"),
        Ga = -1 != A.toLowerCase().indexOf("webkit") && -1 == A.indexOf("Edge");
  function Ha() {
    const a = v.document;
    return a ? a.documentMode : void 0;
  }
  var D;
  a: {
    let E = "";

    const F = (() => {
      const a = A;
      if (Fa) return /rv:([^\);]+)(\)|;)/.exec(a);
      if (Ea) return /Edge\/([\d\.]+)/.exec(a);
      if (C) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      if (Ga) return /WebKit\/(\S+)/.exec(a);
      if (Da) return /(?:Version)[ \/]?(\S+)/.exec(a);
    })();

    F && (E = F ? F[1] : "");
    if (C) {
      const I = Ha();
      if (null != I && I > parseFloat(E)) {
        D = String(I);
        break a;
      }
    }
    D = E;
  }
  const J = {};
  let Ia;
  const Ja = v.document;
  Ia =
    Ja && C
      ? Ha() || ("CSS1Compat" == Ja.compatMode ? parseInt(D, 10) : 5)
      : void 0;
  let K;
  (K = !C) || (K = 9 <= Number(Ia));
  const Ka = K;
  let L;
  if ((L = C)) {
    var M;
    if (Object.prototype.hasOwnProperty.call(J, "9")) M = J["9"];
    else {
      for (
        var N = 0,
          La = za(String(D)).split("."),
          Ma = za("9").split("."),
          Na = Math.max(La.length, Ma.length),
          O = 0;
        0 == N && O < Na;
        O++
      ) {
        let Oa = La[O] || "", Pa = Ma[O] || "";
        do {
          const P = /(\d*)(\D*)(.*)/.exec(Oa) || ["", "", "", ""], Q = /(\d*)(\D*)(.*)/.exec(Pa) || ["", "", "", ""];
          if (0 == P[0].length && 0 == Q[0].length) break;
          N =
            z(
              0 == P[1].length ? 0 : parseInt(P[1], 10),
              0 == Q[1].length ? 0 : parseInt(Q[1], 10)
            ) ||
            z(0 == P[2].length, 0 == Q[2].length) ||
            z(P[2], Q[2]);
          Oa = P[3];
          Pa = Q[3];
        } while (0 == N);
      }
      M = J["9"] = 0 <= N;
    }
    L = !M;
  }
  const Qa = L,
        Ra = (() => {
          if (!v.addEventListener || !Object.defineProperty) return !1;
          let a = !1;

          const b = Object.defineProperty({}, "passive", {
            get() {
              a = !0;
            },
          });

          v.addEventListener("test", w, b);
          v.removeEventListener("test", w, b);
          return a;
        })();
  function R(a, b) {
    this.type = a;
    this.a = this.target = b;
  }
  R.prototype.b = () => {};
  function S(a, b) {
    R.call(this, a ? a.type : "");
    this.relatedTarget = this.a = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.pointerId = 0;
    this.pointerType = "";
    this.o = null;
    if (a) {
      const c = (this.type = a.type), d = a.changedTouches ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.a = b;
      if ((b = a.relatedTarget)) {
        if (Fa) {
          a: {
            try {
              B(b.nodeName);
              var e = !0;
              break a;
            } catch (f) {}
            e = !1;
          }
          e || (b = null);
        }
      } else
        "mouseover" == c
          ? (b = a.fromElement)
          : "mouseout" == c && (b = a.toElement);
      this.relatedTarget = b;
      null === d
        ? ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0))
        : ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
          (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
          (this.screenX = d.screenX || 0),
          (this.screenY = d.screenY || 0));
      this.button = a.button;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType =
        "string" == typeof a.pointerType
          ? a.pointerType
          : Sa[a.pointerType] || "";
      this.o = a;
      a.defaultPrevented && this.b();
    }
  }
  va(S, R);
  var Sa = { 2: "touch", 3: "pen", 4: "mouse" };
  S.prototype.b = function () {
    S.C.b.call(this);
    const a = this.o;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), Qa))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  const Ta = "closure_listenable_" + ((1e6 * Math.random()) | 0);
  let Ua = 0;
  function Va(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.a = e;
    this.key = ++Ua;
    this.j = this.v = !1;
  }
  function Wa(a) {
    a.j = !0;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.a = null;
  }
  function Xa(a) {
    this.src = a;
    this.a = {};
    this.b = 0;
  }
  Xa.prototype.add = function (a, b, c, d, e) {
    const f = a.toString();
    a = this.a[f];
    a || ((a = this.a[f] = []), this.b++);
    let g;
    a: {
      for (g = 0; g < a.length; ++g) {
        const l = a[g];
        if (!l.j && l.listener == b && l.capture == !!d && l.a == e) break a;
      }
      g = -1;
    }
    -1 < g
      ? ((b = a[g]), c || (b.v = !1))
      : ((b = new Va(b, this.src, f, !!d, e)), (b.v = c), a.push(b));
    return b;
  };
  const Ya = "closure_lm_" + ((1e6 * Math.random()) | 0);
  const Za = {};
  let ab = 0;
  function bb(a, b, c, d, e) {
    if (d && d.once) return cb(a, b, c, d, e);
    if ("array" == x(b)) {
      for (let f = 0; f < b.length; f++) bb(a, b[f], c, d, e);
      return null;
    }
    c = db(c);
    return a && a[Ta]
      ? a.b(b, c, y(d) ? !!d.capture : !!d, e)
      : eb(a, b, c, !1, d, e);
  }
  function eb(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    const g = y(e) ? !!e.capture : !!e;
    let l = fb(a);
    l || (a[Ya] = l = new Xa(a));
    c = l.add(b, c, d, g, f);
    if (c.proxy) return c;
    d = gb();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener)
      Ra || (e = g),
        void 0 === e && (e = !1),
        a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(hb(b.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    ab++;
    return c;
  }
  function gb() {
    const a = ib,
          b = Ka
            ? c => {
                return a.call(b.src, b.listener, c);
              }
            : c => {
                c = a.call(b.src, b.listener, c);
                if (!c) return c;
              };
    return b;
  }
  function cb(a, b, c, d, e) {
    if ("array" == x(b)) {
      for (let f = 0; f < b.length; f++) cb(a, b[f], c, d, e);
      return null;
    }
    c = db(c);
    return a && a[Ta]
      ? a.c(b, c, y(d) ? !!d.capture : !!d, e)
      : eb(a, b, c, !0, d, e);
  }
  function jb(a) {
    if ("number" != typeof a && a && !a.j) {
      const b = a.src;
      if (b && b[Ta]) b.a(a);
      else {
        let c = a.type, d = a.proxy;
        b.removeEventListener
          ? b.removeEventListener(c, d, a.capture)
          : b.detachEvent
          ? b.detachEvent(hb(c), d)
          : b.addListener && b.removeListener && b.removeListener(d);
        ab--;
        if ((c = fb(b))) {
          d = a.type;
          if (d in c.a) {
            const e = c.a[d];
            const f = ya(e, a);
            let g;
            (g = 0 <= f) && Array.prototype.splice.call(e, f, 1);
            g && (Wa(a), 0 == c.a[d].length && (delete c.a[d], c.b--));
          }
          0 == c.b && ((c.src = null), (b[Ya] = null));
        } else Wa(a);
      }
    }
  }
  function hb(a) {
    return a in Za ? Za[a] : (Za[a] = "on" + a);
  }
  function kb(a, b, c, d) {
    let e = !0;
    if ((a = fb(a)))
      if ((b = a.a[b.toString()]))
        for (b = b.concat(), a = 0; a < b.length; a++) {
          let f = b[a];
          f && f.capture == c && !f.j && ((f = lb(f, d)), (e = e && !1 !== f));
        }
    return e;
  }
  function lb(a, b) {
    const c = a.listener, d = a.a || a.src;
    a.v && jb(a);
    return c.call(d, b);
  }
  function ib(a, b) {
    if (a.j) return !0;
    if (!Ka) {
      if (!b)
        a: {
          b = ["window", "event"];
          for (var c = v, d = 0; d < b.length; d++)
            if (((c = c[b[d]]), null == c)) {
              b = null;
              break a;
            }
          b = c;
        }
      d = b;
      b = new S(d, this);
      c = !0;
      if (!(0 > d.keyCode || void 0 != d.returnValue)) {
        a: {
          var e = !1;
          if (0 == d.keyCode)
            try {
              d.keyCode = -1;
              break a;
            } catch (g) {
              e = !0;
            }
          if (e || void 0 == d.returnValue) d.returnValue = !0;
        }
        d = [];
        for (e = b.a; e; e = e.parentNode) d.push(e);
        a = a.type;
        for (e = d.length - 1; 0 <= e; e--) {
          b.a = d[e];
          var f = kb(d[e], a, !0, b);
          c = c && f;
        }
        for (e = 0; e < d.length; e++)
          (b.a = d[e]), (f = kb(d[e], a, !1, b)), (c = c && f);
      }
      return c;
    }
    return lb(a, new S(b, this));
  }
  function fb(a) {
    a = a[Ya];
    return a instanceof Xa ? a : null;
  }
  const mb = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
  function db(a) {
    if ("function" == x(a)) return a;
    a[mb] ||
      (a[mb] = b => {
        return a.handleEvent(b);
      });
    return a[mb];
  }
  function T(a) {
    wa.call(this);
    this.b = a;
    this.a = {};
  }
  va(T, wa);
  const nb = [];
  function ob(a, b, c) {
    const d = document.body;
    "array" != x(b) && (b && (nb[0] = b.toString()), (b = nb));
    for (let e = 0; e < b.length; e++) {
      const f = bb(d, b[e], c || a.handleEvent, !1, a.b || a);
      if (!f) break;
      a.a[f.key] = f;
    }
  }
  function pb(a) {
    Ca(
      a.a,
      function (a, c) {
        this.a.hasOwnProperty(c) && jb(a);
      },
      a
    );
    a.a = {};
  }
  T.prototype.handleEvent = () => {
    throw Error("EventHandler.handleEvent not implemented");
  };/*

Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
  const qb = ["google-codelab"];
  function U() {
    const a = HTMLElement.call(this) || this;
    a.s = !1;
    a.B = new T();
    a.I = new T();
    a.w = a.getAttribute("category") || "";
    a.A = a.getAttribute("environment") || "";
    return a;
  }
  const V = HTMLElement;
  U.prototype = sa(V.prototype);
  U.prototype.constructor = U;
  if (ka) ka(U, V);
  else
    for (const W in V)
      if ("prototype" != W)
        if (Object.defineProperties) {
          const rb = Object.getOwnPropertyDescriptor(V, W);
          rb && Object.defineProperty(U, W, rb);
        } else U[W] = V[W];
  U.C = V.prototype;
  U.prototype.connectedCallback = function () {
    const a = this;
    this.a = this.getAttribute("gaid") || "";
    !this.s &&
      this.a &&
      (void 0 !== window.ga
        ? (sb(this), tb(this), ub(), (this.s = !0))
        : vb().then(b => {
            b && (sb(a), tb(a), ub(), (a.s = !0));
          }));
  };
  U.prototype.connectedCallback = U.prototype.connectedCallback;
  function tb(a) {
    ob(a.B, "google-codelab-action", b => {
      b = b.o.detail;
      wb({
        hitType: "event",
        dimension1: a.A,
        dimension2: a.w,
        eventCategory: b.category,
        eventAction: b.action || "",
        eventLabel: b.label || "",
        eventValue: b.value || "",
      });
    });
    ob(a.I, "google-codelab-pageview", b => {
      b = b.o.detail;
      wb({
        hitType: "pageview",
        dimension1: a.A,
        dimension2: a.w,
        page: b.page || "",
        title: b.title || "",
      });
    });
  }
  U.prototype.attributeChangedCallback = function (a, b, c) {
    switch (a) {
      case "gaid":
        this.a = c;
        break;
      case "codelab-gaid":
        c && this.s && xb(this);
        break;
      case "environment":
        this.A = c;
        break;
      case "category":
        this.w = c;
    }
  };
  U.prototype.attributeChangedCallback = U.prototype.attributeChangedCallback;
  function ub() {
    qb.forEach(a => {
      document.querySelectorAll(a).forEach(a => {
        a.setAttribute("anayltics-ready", "anayltics-ready");
      });
    });
  }
  function wb(a) {
    window.ga(() => {
      window.ga.getAll().forEach(b => {
        b.send(a);
      });
    });
  }
  U.prototype.disconnectedCallback = function () {
    pb(this.B);
  };
  U.prototype.disconnectedCallback = U.prototype.disconnectedCallback;
  function ma() {
    const a = document.createElement("script");
    a.src = "https://www.google-analytics.com/analytics.js";
    a.async = !1;
    return new Promise((b, c) => {
      document.head && document.head.appendChild(a);
    });
  }
  const yb = ma;
  const X = ["module$exports$googlecodelabs$CodelabAnalytics", "injectGAScript"];
  let Y = v;
  X[0] in Y ||
    "undefined" == typeof Y.execScript ||
    Y.execScript("var " + X[0]);
  for (let Z; X.length && (Z = X.shift()); )
    X.length || void 0 === yb
      ? Y[Z] && Y[Z] !== Object.prototype[Z]
        ? (Y = Y[Z])
        : (Y = Y[Z] = {})
      : (Y[Z] = yb);
  function vb() {
    return ra(
      new qa(
        new oa(a => {
          if (1 == a.c)
            return (
              (window.GoogleAnalyticsObject = "ga"),
              (window.ga =
                window.ga ||
                function () {
                  (window.ga.q = window.ga.q || []).push(arguments);
                }),
              (window.ga.l = new Date().valueOf()),
              (a.h = 2),
              la(a)
            );
          if (2 != a.c) return a.return(a.i);
          na(a);
          return a.return();
        })
      )
    );
  }
  function sb(a) {
    a.a && !zb(a.a) && window.ga("create", a.a, "auto");
    a: {
      var b = location.search.substring(1).split("&");
      for (let c = 0; c < b.length; c++) {
        const d = b[c].split("=");
        if ("viewga" === d[0]) {
          b = d[1];
          break a;
        }
      }
      b = "";
    }
    b &&
      !zb(b) &&
      (window.ga("create", b, "auto", "view"),
      window.ga("view.send", "pageview"));
    xb(a);
  }
  function xb(a) {
    (a = a.getAttribute("codelab-gaid")) &&
      !zb(a) &&
      window.ga("create", a, "auto", "codelabAccount");
  }
  function zb(a) {
    let b = !1;
    window.ga.getAll().forEach(c => {
      c.get("trackingId") == a && (b = !0);
    });
    return b;
  }
  h.Object.defineProperties(U, {
    observedAttributes: {
      configurable: !0,
      enumerable: !0,
      get() {
        return ["codelab-gaid", "environment", "category"];
      },
    },
  });
  try {
    window.customElements.define("google-codelab-analytics", U);
  } catch (a) {
    console.warn("googlecodelabs.CodelabAnalytics", a);
  }
}.call(this));
(function () {
  "use strict";

  const aa =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global
        ? global
        : this;

  const ba =
    "function" == typeof Object.create
      ? Object.create
      : a => {
          function b() {}
          b.prototype = a;
          return new b();
        };

  let k;
  if ("function" == typeof Object.setPrototypeOf) k = Object.setPrototypeOf;
  else {
    let l;
    a: {
      const ca = { B: !0 }, da = {};
      try {
        da.__proto__ = ca;
        l = da.B;
        break a;
      } catch (a) {}
      l = !1;
    }
    k = l
      ? (a, b) => {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  const ea = k, m = this;
  function n() {}
  function p(a) {
    const b = typeof a;
    if ("object" == b)
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return b;
        const d = Object.prototype.toString.call(a);
        if ("[object Window]" == d) return "object";
        if (
          "[object Array]" == d ||
          ("number" == typeof a.length &&
            "undefined" != typeof a.splice &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("splice"))
        )
          return "array";
        if (
          "[object Function]" == d ||
          ("undefined" != typeof a.call &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("call"))
        )
          return "function";
      } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  }
  function q(a) {
    const b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  const fa = "closure_uid_" + ((1e9 * Math.random()) >>> 0);
  let ha = 0;
  function r(a, b) {
    function d() {}
    d.prototype = b.prototype;
    a.A = b.prototype;
  }
  function ia() {
    0 != ja && (this[fa] || (this[fa] = ++ha));
  }
  var ja = 0;
  let ka;
  const la = Array.prototype.indexOf
    ? (a, b) => {
        return Array.prototype.indexOf.call(a, b, void 0);
      }
    : (a, b) => {
        if ("string" == typeof a)
          return "string" == typeof b && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (let d = 0; d < a.length; d++) if (d in a && a[d] === b) return d;
        return -1;
      };
  const ma = String.prototype.trim
    ? a => {
        return a.trim();
      }
    : a => {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
      };
  function na(a) {
    if (!oa.test(a)) return a;
    -1 != a.indexOf("&") && (a = a.replace(pa, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(qa, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(ra, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(sa, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(ta, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(ua, "&#0;"));
    return a;
  }
  var pa = /&/g,
    qa = /</g,
    ra = />/g,
    sa = /"/g,
    ta = /'/g,
    ua = /\x00/g,
    oa = /[\x00&<>"']/;
  function t(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  let u;
  a: {
    const va = m.navigator;
    if (va) {
      const wa = va.userAgent;
      if (wa) {
        u = wa;
        break a;
      }
    }
    u = "";
  }
  function v(a) {
    v[" "](a);
    return a;
  }
  v[" "] = n;
  const xa = -1 != u.indexOf("Opera"),
        w = -1 != u.indexOf("Trident") || -1 != u.indexOf("MSIE"),
        ya = -1 != u.indexOf("Edge"),
        za =
          -1 != u.indexOf("Gecko") &&
          !(-1 != u.toLowerCase().indexOf("webkit") && -1 == u.indexOf("Edge")) &&
          !(-1 != u.indexOf("Trident") || -1 != u.indexOf("MSIE")) &&
          -1 == u.indexOf("Edge"),
        Aa = -1 != u.toLowerCase().indexOf("webkit") && -1 == u.indexOf("Edge");
  function Ba() {
    const a = m.document;
    return a ? a.documentMode : void 0;
  }
  let x;
  a: {
    let y = "";

    const z = (() => {
      const a = u;
      if (za) return /rv:([^\);]+)(\)|;)/.exec(a);
      if (ya) return /Edge\/([\d\.]+)/.exec(a);
      if (w) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      if (Aa) return /WebKit\/(\S+)/.exec(a);
      if (xa) return /(?:Version)[ \/]?(\S+)/.exec(a);
    })();

    z && (y = z ? z[1] : "");
    if (w) {
      const A = Ba();
      if (null != A && A > parseFloat(y)) {
        x = String(A);
        break a;
      }
    }
    x = y;
  }
  const B = {};
  let Ea;
  const Fa = m.document;
  Ea =
    Fa && w
      ? Ba() || ("CSS1Compat" == Fa.compatMode ? parseInt(x, 10) : 5)
      : void 0;
  let C;
  (C = !w) || (C = 9 <= Number(Ea));
  const Ga = C;
  let D;
  if ((D = w)) {
    let E;
    if (Object.prototype.hasOwnProperty.call(B, "9")) E = B["9"];
    else {
      for (
        var F = 0,
          Ha = ma(String(x)).split("."),
          Ia = ma("9").split("."),
          Ja = Math.max(Ha.length, Ia.length),
          G = 0;
        0 == F && G < Ja;
        G++
      ) {
        let Ka = Ha[G] || "", La = Ia[G] || "";
        do {
          const H = /(\d*)(\D*)(.*)/.exec(Ka) || ["", "", "", ""], I = /(\d*)(\D*)(.*)/.exec(La) || ["", "", "", ""];
          if (0 == H[0].length && 0 == I[0].length) break;
          F =
            t(
              0 == H[1].length ? 0 : parseInt(H[1], 10),
              0 == I[1].length ? 0 : parseInt(I[1], 10)
            ) ||
            t(0 == H[2].length, 0 == I[2].length) ||
            t(H[2], I[2]);
          Ka = H[3];
          La = I[3];
        } while (0 == F);
      }
      E = B["9"] = 0 <= F;
    }
    D = !E;
  }
  const Ma = D,
        Na = (() => {
          if (!m.addEventListener || !Object.defineProperty) return !1;
          let a = !1;

          const b = Object.defineProperty({}, "passive", {
            get() {
              a = !0;
            },
          });

          m.addEventListener("test", n, b);
          m.removeEventListener("test", n, b);
          return a;
        })();
  function J(a, b) {
    this.type = a;
    this.a = this.target = b;
  }
  J.prototype.b = () => {};
  function K(a, b) {
    J.call(this, a ? a.type : "");
    this.relatedTarget = this.a = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.pointerId = 0;
    this.pointerType = "";
    this.m = null;
    if (a) {
      const d = (this.type = a.type), c = a.changedTouches ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.a = b;
      if ((b = a.relatedTarget)) {
        if (za) {
          a: {
            try {
              v(b.nodeName);
              var e = !0;
              break a;
            } catch (f) {}
            e = !1;
          }
          e || (b = null);
        }
      } else
        "mouseover" == d
          ? (b = a.fromElement)
          : "mouseout" == d && (b = a.toElement);
      this.relatedTarget = b;
      null === c
        ? ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0))
        : ((this.clientX = void 0 !== c.clientX ? c.clientX : c.pageX),
          (this.clientY = void 0 !== c.clientY ? c.clientY : c.pageY),
          (this.screenX = c.screenX || 0),
          (this.screenY = c.screenY || 0));
      this.button = a.button;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType =
        "string" == typeof a.pointerType
          ? a.pointerType
          : Oa[a.pointerType] || "";
      this.m = a;
      a.defaultPrevented && this.b();
    }
  }
  r(K, J);
  var Oa = { 2: "touch", 3: "pen", 4: "mouse" };
  K.prototype.b = function () {
    K.A.b.call(this);
    const a = this.m;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), Ma))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  const L = "closure_listenable_" + ((1e6 * Math.random()) | 0);
  let Pa = 0;
  function Qa(a, b, d, c, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = d;
    this.capture = !!c;
    this.a = e;
    this.key = ++Pa;
    this.g = this.j = !1;
  }
  function Ra(a) {
    a.g = !0;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.a = null;
  }
  function M(a) {
    this.src = a;
    this.a = {};
    this.b = 0;
  }
  M.prototype.add = function (a, b, d, c, e) {
    const f = a.toString();
    a = this.a[f];
    a || ((a = this.a[f] = []), this.b++);
    let g;
    a: {
      for (g = 0; g < a.length; ++g) {
        const h = a[g];
        if (!h.g && h.listener == b && h.capture == !!c && h.a == e) break a;
      }
      g = -1;
    }
    -1 < g
      ? ((b = a[g]), d || (b.j = !1))
      : ((b = new Qa(b, this.src, f, !!c, e)), (b.j = d), a.push(b));
    return b;
  };
  const N = "closure_lm_" + ((1e6 * Math.random()) | 0);
  const O = {};
  let Sa = 0;
  function Ta(a, b, d, c, e) {
    if (c && c.once) return Ua(a, b, d, c, e);
    if ("array" == p(b)) {
      for (let f = 0; f < b.length; f++) Ta(a, b[f], d, c, e);
      return null;
    }
    d = Va(d);
    return a && a[L]
      ? a.a(b, d, q(c) ? !!c.capture : !!c, e)
      : Wa(a, b, d, !1, c, e);
  }
  function Wa(a, b, d, c, e, f) {
    if (!b) throw Error("Invalid event type");
    const g = q(e) ? !!e.capture : !!e;
    let h = P(a);
    h || (a[N] = h = new M(a));
    d = h.add(b, d, c, g, f);
    if (d.proxy) return d;
    c = Xa();
    d.proxy = c;
    c.src = a;
    c.listener = d;
    if (a.addEventListener)
      Na || (e = g),
        void 0 === e && (e = !1),
        a.addEventListener(b.toString(), c, e);
    else if (a.attachEvent) a.attachEvent(Ya(b.toString()), c);
    else if (a.addListener && a.removeListener) a.addListener(c);
    else throw Error("addEventListener and attachEvent are unavailable.");
    Sa++;
    return d;
  }
  function Xa() {
    const a = Za,
          b = Ga
            ? d => {
                return a.call(b.src, b.listener, d);
              }
            : d => {
                d = a.call(b.src, b.listener, d);
                if (!d) return d;
              };
    return b;
  }
  function Ua(a, b, d, c, e) {
    if ("array" == p(b)) {
      for (let f = 0; f < b.length; f++) Ua(a, b[f], d, c, e);
      return null;
    }
    d = Va(d);
    return a && a[L]
      ? a.b(b, d, q(c) ? !!c.capture : !!c, e)
      : Wa(a, b, d, !0, c, e);
  }
  function Ya(a) {
    return a in O ? O[a] : (O[a] = "on" + a);
  }
  function $a(a, b, d, c) {
    let e = !0;
    if ((a = P(a)))
      if ((b = a.a[b.toString()]))
        for (b = b.concat(), a = 0; a < b.length; a++) {
          let f = b[a];
          f && f.capture == d && !f.g && ((f = ab(f, c)), (e = e && !1 !== f));
        }
    return e;
  }
  function ab(a, b) {
    const d = a.listener, c = a.a || a.src;
    if (a.j && "number" != typeof a && a && !a.g) {
      const e = a.src;
      if (e && e[L]) e.m(a);
      else {
        let f = a.type, g = a.proxy;
        e.removeEventListener
          ? e.removeEventListener(f, g, a.capture)
          : e.detachEvent
          ? e.detachEvent(Ya(f), g)
          : e.addListener && e.removeListener && e.removeListener(g);
        Sa--;
        if ((f = P(e))) {
          g = a.type;
          let h;
          if ((h = g in f.a)) {
            h = f.a[g];
            const Ca = la(h, a);
            let Da;
            (Da = 0 <= Ca) && Array.prototype.splice.call(h, Ca, 1);
            h = Da;
          }
          h && (Ra(a), 0 == f.a[g].length && (delete f.a[g], f.b--));
          0 == f.b && ((f.src = null), (e[N] = null));
        } else Ra(a);
      }
    }
    return d.call(c, b);
  }
  function Za(a, b) {
    if (a.g) return !0;
    if (!Ga) {
      if (!b)
        a: {
          b = ["window", "event"];
          for (var d = m, c = 0; c < b.length; c++)
            if (((d = d[b[c]]), null == d)) {
              b = null;
              break a;
            }
          b = d;
        }
      c = b;
      b = new K(c, this);
      d = !0;
      if (!(0 > c.keyCode || void 0 != c.returnValue)) {
        a: {
          var e = !1;
          if (0 == c.keyCode)
            try {
              c.keyCode = -1;
              break a;
            } catch (g) {
              e = !0;
            }
          if (e || void 0 == c.returnValue) c.returnValue = !0;
        }
        c = [];
        for (e = b.a; e; e = e.parentNode) c.push(e);
        a = a.type;
        for (e = c.length - 1; 0 <= e; e--) {
          b.a = c[e];
          var f = $a(c[e], a, !0, b);
          d = d && f;
        }
        for (e = 0; e < c.length; e++)
          (b.a = c[e]), (f = $a(c[e], a, !1, b)), (d = d && f);
      }
      return d;
    }
    return ab(a, new K(b, this));
  }
  function P(a) {
    a = a[N];
    return a instanceof M ? a : null;
  }
  const Q = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
  function Va(a) {
    if ("function" == p(a)) return a;
    a[Q] ||
      (a[Q] = b => {
        return a.handleEvent(b);
      });
    return a[Q];
  }

  class R {
    constructor(a) {
      ia.call(this);
      this.a = a;
      this.b = {};
    }

    handleEvent() {
      throw Error("EventHandler.handleEvent not implemented");
    }
  }

  r(R, ia);
  const bb = [];
  function cb(a, b, d) {
    let c = "copy";
    "array" != p(c) && (c && (bb[0] = c.toString()), (c = bb));
    for (let e = 0; e < c.length; e++) {
      const f = Ta(b, c[e], d || a.handleEvent, !1, a.a || a);
      if (!f) break;
      a.b[f.key] = f;
    }
  }
  function S() {
    this.a = db;
  }
  var db = {};
  const T = {}, eb = {};
  function U() {
    throw Error("Do not instantiate directly");
  }
  U.prototype.v = null;
  U.prototype.toString = function () {
    return this.o;
  };
  function V() {
    U.call(this);
  }
  r(V, U);
  V.prototype.l = T;
  function fb(a) {
    if (null != a)
      switch (a.v) {
        case 1:
          return 1;
        case -1:
          return -1;
        case 0:
          return 0;
      }
    return null;
  }
  function gb(a) {
    return null != a && a.l === T
      ? a
      : a instanceof S
      ? W(
          a instanceof S && a.constructor === S && a.a === db
            ? ""
            : "type_error:SafeHtml",
          null
        )
      : W(na(String(String(a))), fb(a));
  }
  var W = (a => {
    function b(a) {
      this.o = a;
    }
    b.prototype = a.prototype;
    return (a, c) => {
      a = new b(String(a));
      void 0 !== c && (a.v = c);
      return a;
    };
  })(V);
  const hb = (a => {
    let b = !1, d;
    return () => {
      b || ((d = a()), (b = !0));
      return d;
    };
  })(() => {
    const a = document.createElement("div");
    a.innerHTML = "<div><div></div></div>";
    const b = a.firstChild.firstChild;
    a.innerHTML = "";
    return !b.parentElement;
  });
  function ib(a) {
    for (let b; (b = a.firstChild); ) a.removeChild(b);
  }
  function jb(a, b) {
    a.insertBefore(b, a.childNodes[0] || null);
  }
  function kb() {
    this.a = m.document || document;
  }
  function lb(a) {
    a = a || mb;
    let b = a.label;
    b = W(
      '<h2 is-upgraded class="step-title">' +
        gb(a.step) +
        ". " +
        gb(b) +
        "</h2>"
    );
    a = (ka || (ka = new kb())).a.createElement("DIV");
    b: {
      if (b instanceof U) {
        if (b.l === T) {
          b = b.o;
          break b;
        }
        if (b.l === eb) {
          b = na(b.o);
          break b;
        }
      }
      b = "zSoyz";
    }
    if (hb()) for (; a.lastChild; ) a.removeChild(a.lastChild);
    a.innerHTML = b;
    1 == a.childNodes.length &&
      ((b = a.firstChild), 1 == b.nodeType && (a = b));
    return a;
  }
  var mb = {};/*

Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
  function X() {
    const a = HTMLElement.call(this) || this;
    a.h = null;
    a.c = null;
    a.w = !1;
    a.u = "0";
    a.s = "";
    a.i = null;
    a.f = null;
    a.C = new R();
    return a;
  }
  const Y = HTMLElement;
  X.prototype = ba(Y.prototype);
  X.prototype.constructor = X;
  if (ea) ea(X, Y);
  else
    for (const Z in Y)
      if ("prototype" != Z)
        if (Object.defineProperties) {
          const nb = Object.getOwnPropertyDescriptor(Y, Z);
          nb && Object.defineProperty(X, Z, nb);
        } else X[Z] = Y[Z];
  X.A = Y.prototype;
  X.prototype.connectedCallback = function () {
    ob(this);
  };
  X.prototype.connectedCallback = X.prototype.connectedCallback;
  X.prototype.attributeChangedCallback = function (a) {
    if ("label" === a || "step" === a)
      if (
        (this.hasAttribute("label") && (this.s = this.getAttribute("label")),
        this.hasAttribute("step") && (this.u = this.getAttribute("step")),
        this.i)
      ) {
        a = lb({ step: this.u, label: this.s });
        const b = this.i, d = b.parentNode;
        d && d.replaceChild(a, b);
        this.i = a;
      }
  };
  X.prototype.attributeChangedCallback = X.prototype.attributeChangedCallback;
  function ob(a) {
    if (!a.w) {
      let b = a.getElementsByTagName("google-codelab-about");
      0 < b.length && ((a.f = b[0]), a.f.parentNode.removeChild(a.f));
      a.h = document.createElement("div");
      a.h.classList.add("instructions");
      a.c = document.createElement("div");
      a.c.classList.add("inner");
      a.c.innerHTML = a.innerHTML;
      a.h.appendChild(a.c);
      ib(a);
      b = lb({ step: a.u, label: a.s });
      a.i = b;
      jb(a.c, b);
      a.c.querySelectorAll("pre code").forEach(b => {
        const c = window.prettyPrintOne(b.innerHTML);
        b.innerHTML = c;
        cb(a.C, b, () => {
          const a = new CustomEvent("google-codelab-action", {
            detail: {
              category: "snippet",
              action: "copy",
              label: b.textContent.substring(0, 500),
            },
          });
          document.body.dispatchEvent(a);
        });
      });
      a.f && a.appendChild(a.f);
      a.appendChild(a.h);
      a.w = !0;
    }
  }
  aa.Object.defineProperties(X, {
    observedAttributes: {
      configurable: !0,
      enumerable: !0,
      get() {
        return ["label", "step"];
      },
    },
  });
  try {
    window.customElements.define("google-codelab-step", X);
  } catch (a) {
    console.warn("googlecodelabs.CodelabStep", a);
  }
}.call(this));
(function () {
  "use strict";

  const aa =
      "function" == typeof Object.create
        ? Object.create
        : a => {
            function b() {}
            b.prototype = a;
            return new b();
          };

  let h;
  if ("function" == typeof Object.setPrototypeOf) h = Object.setPrototypeOf;
  else {
    let k;
    a: {
      const ba = { B: !0 }, ca = {};
      try {
        ca.__proto__ = ba;
        k = ca.B;
        break a;
      } catch (a) {}
      k = !1;
    }
    h = k
      ? (a, b) => {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  const da = h, m = this;
  function n(a) {
    return "string" == typeof a;
  }
  function p() {}
  function q(a) {
    const b = typeof a;
    if ("object" == b)
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return b;
        const c = Object.prototype.toString.call(a);
        if ("[object Window]" == c) return "object";
        if (
          "[object Array]" == c ||
          ("number" == typeof a.length &&
            "undefined" != typeof a.splice &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("splice"))
        )
          return "array";
        if (
          "[object Function]" == c ||
          ("undefined" != typeof a.call &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("call"))
        )
          return "function";
      } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  }
  function r(a) {
    const b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  const ea = "closure_uid_" + ((1e9 * Math.random()) >>> 0);
  let fa = 0;
  function t(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.A = b.prototype;
  }
  function ha() {
    0 != ia && (this[ea] || (this[ea] = ++fa));
  }
  var ia = 0;
  let ja;
  const ka = Array.prototype.indexOf
    ? (a, b) => {
        return Array.prototype.indexOf.call(a, b, void 0);
      }
    : (a, b) => {
        if (n(a)) return n(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (let c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1;
      };
  const la = String.prototype.trim
    ? a => {
        return a.trim();
      }
    : a => {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
      };
  function u(a) {
    if (!ma.test(a)) return a;
    -1 != a.indexOf("&") && (a = a.replace(na, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(oa, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(pa, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(qa, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(ra, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(sa, "&#0;"));
    return a;
  }
  var na = /&/g,
    oa = /</g,
    pa = />/g,
    qa = /"/g,
    ra = /'/g,
    sa = /\x00/g,
    ma = /[\x00&<>"']/;
  function v(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  let w;
  a: {
    const ta = m.navigator;
    if (ta) {
      const ua = ta.userAgent;
      if (ua) {
        w = ua;
        break a;
      }
    }
    w = "";
  }
  function va(a, b, c) {
    for (const d in a) b.call(c, a[d], d, a);
  }
  function x(a) {
    x[" "](a);
    return a;
  }
  x[" "] = p;
  const wa = -1 != w.indexOf("Opera"),
        y = -1 != w.indexOf("Trident") || -1 != w.indexOf("MSIE"),
        xa = -1 != w.indexOf("Edge"),
        ya =
          -1 != w.indexOf("Gecko") &&
          !(-1 != w.toLowerCase().indexOf("webkit") && -1 == w.indexOf("Edge")) &&
          !(-1 != w.indexOf("Trident") || -1 != w.indexOf("MSIE")) &&
          -1 == w.indexOf("Edge"),
        za = -1 != w.toLowerCase().indexOf("webkit") && -1 == w.indexOf("Edge");
  function Aa() {
    const a = m.document;
    return a ? a.documentMode : void 0;
  }
  let z;
  a: {
    let A = "";

    const B = (() => {
      const a = w;
      if (ya) return /rv:([^\);]+)(\)|;)/.exec(a);
      if (xa) return /Edge\/([\d\.]+)/.exec(a);
      if (y) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      if (za) return /WebKit\/(\S+)/.exec(a);
      if (wa) return /(?:Version)[ \/]?(\S+)/.exec(a);
    })();

    B && (A = B ? B[1] : "");
    if (y) {
      const C = Aa();
      if (null != C && C > parseFloat(A)) {
        z = String(C);
        break a;
      }
    }
    z = A;
  }
  const D = {};
  let Ba;
  const Ca = m.document;
  Ba =
    Ca && y
      ? Aa() || ("CSS1Compat" == Ca.compatMode ? parseInt(z, 10) : 5)
      : void 0;
  let E;
  (E = !y) || (E = 9 <= Number(Ba));
  const Da = E;
  let G;
  if ((G = y)) {
    let H;
    if (Object.prototype.hasOwnProperty.call(D, "9")) H = D["9"];
    else {
      for (
        var I = 0,
          Ea = la(String(z)).split("."),
          Fa = la("9").split("."),
          Ga = Math.max(Ea.length, Fa.length),
          J = 0;
        0 == I && J < Ga;
        J++
      ) {
        let Ha = Ea[J] || "", Ia = Fa[J] || "";
        do {
          const K = /(\d*)(\D*)(.*)/.exec(Ha) || ["", "", "", ""], L = /(\d*)(\D*)(.*)/.exec(Ia) || ["", "", "", ""];
          if (0 == K[0].length && 0 == L[0].length) break;
          I =
            v(
              0 == K[1].length ? 0 : parseInt(K[1], 10),
              0 == L[1].length ? 0 : parseInt(L[1], 10)
            ) ||
            v(0 == K[2].length, 0 == L[2].length) ||
            v(K[2], L[2]);
          Ha = K[3];
          Ia = L[3];
        } while (0 == I);
      }
      H = D["9"] = 0 <= I;
    }
    G = !H;
  }
  const Ja = G,
        Ka = (() => {
          if (!m.addEventListener || !Object.defineProperty) return !1;
          let a = !1;

          const b = Object.defineProperty({}, "passive", {
            get() {
              a = !0;
            },
          });

          m.addEventListener("test", p, b);
          m.removeEventListener("test", p, b);
          return a;
        })();
  function M(a, b) {
    this.type = a;
    this.a = this.target = b;
  }
  M.prototype.b = () => {};
  function N(a, b) {
    M.call(this, a ? a.type : "");
    this.relatedTarget = this.a = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.pointerId = 0;
    this.pointerType = "";
    this.m = null;
    if (a) {
      const c = (this.type = a.type), d = a.changedTouches ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.a = b;
      if ((b = a.relatedTarget)) {
        if (ya) {
          a: {
            try {
              x(b.nodeName);
              var e = !0;
              break a;
            } catch (f) {}
            e = !1;
          }
          e || (b = null);
        }
      } else
        "mouseover" == c
          ? (b = a.fromElement)
          : "mouseout" == c && (b = a.toElement);
      this.relatedTarget = b;
      null === d
        ? ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0))
        : ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
          (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
          (this.screenX = d.screenX || 0),
          (this.screenY = d.screenY || 0));
      this.button = a.button;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType = n(a.pointerType)
        ? a.pointerType
        : La[a.pointerType] || "";
      this.m = a;
      a.defaultPrevented && this.b();
    }
  }
  t(N, M);
  var La = { 2: "touch", 3: "pen", 4: "mouse" };
  N.prototype.b = function () {
    N.A.b.call(this);
    const a = this.m;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), Ja))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  const O = "closure_listenable_" + ((1e6 * Math.random()) | 0);
  let Ma = 0;
  function Na(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.a = e;
    this.key = ++Ma;
    this.i = this.l = !1;
  }
  function Oa(a) {
    a.i = !0;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.a = null;
  }
  function P(a) {
    this.src = a;
    this.a = {};
    this.b = 0;
  }
  P.prototype.add = function (a, b, c, d, e) {
    const f = a.toString();
    a = this.a[f];
    a || ((a = this.a[f] = []), this.b++);
    let g;
    a: {
      for (g = 0; g < a.length; ++g) {
        const l = a[g];
        if (!l.i && l.listener == b && l.capture == !!d && l.a == e) break a;
      }
      g = -1;
    }
    -1 < g
      ? ((b = a[g]), c || (b.l = !1))
      : ((b = new Na(b, this.src, f, !!d, e)), (b.l = c), a.push(b));
    return b;
  };
  const Q = "closure_lm_" + ((1e6 * Math.random()) | 0);
  const R = {};
  let Pa = 0;
  function Qa(a, b, c, d, e) {
    if (d && d.once) return Ra(a, b, c, d, e);
    if ("array" == q(b)) {
      for (let f = 0; f < b.length; f++) Qa(a, b[f], c, d, e);
      return null;
    }
    c = Sa(c);
    return a && a[O]
      ? a.a(b, c, r(d) ? !!d.capture : !!d, e)
      : Ta(a, b, c, !1, d, e);
  }
  function Ta(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    const g = r(e) ? !!e.capture : !!e;
    let l = S(a);
    l || (a[Q] = l = new P(a));
    c = l.add(b, c, d, g, f);
    if (c.proxy) return c;
    d = Ua();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener)
      Ka || (e = g),
        void 0 === e && (e = !1),
        a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(Va(b.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    Pa++;
    return c;
  }
  function Ua() {
    const a = Wa,
          b = Da
            ? c => {
                return a.call(b.src, b.listener, c);
              }
            : c => {
                c = a.call(b.src, b.listener, c);
                if (!c) return c;
              };
    return b;
  }
  function Ra(a, b, c, d, e) {
    if ("array" == q(b)) {
      for (let f = 0; f < b.length; f++) Ra(a, b[f], c, d, e);
      return null;
    }
    c = Sa(c);
    return a && a[O]
      ? a.b(b, c, r(d) ? !!d.capture : !!d, e)
      : Ta(a, b, c, !0, d, e);
  }
  function Xa(a) {
    if ("number" != typeof a && a && !a.i) {
      const b = a.src;
      if (b && b[O]) b.m(a);
      else {
        let c = a.type, d = a.proxy;
        b.removeEventListener
          ? b.removeEventListener(c, d, a.capture)
          : b.detachEvent
          ? b.detachEvent(Va(c), d)
          : b.addListener && b.removeListener && b.removeListener(d);
        Pa--;
        if ((c = S(b))) {
          d = a.type;
          if (d in c.a) {
            const e = c.a[d];
            const f = ka(e, a);
            let g;
            (g = 0 <= f) && Array.prototype.splice.call(e, f, 1);
            g && (Oa(a), 0 == c.a[d].length && (delete c.a[d], c.b--));
          }
          0 == c.b && ((c.src = null), (b[Q] = null));
        } else Oa(a);
      }
    }
  }
  function Va(a) {
    return a in R ? R[a] : (R[a] = "on" + a);
  }
  function Ya(a, b, c, d) {
    let e = !0;
    if ((a = S(a)))
      if ((b = a.a[b.toString()]))
        for (b = b.concat(), a = 0; a < b.length; a++) {
          let f = b[a];
          f && f.capture == c && !f.i && ((f = Za(f, d)), (e = e && !1 !== f));
        }
    return e;
  }
  function Za(a, b) {
    const c = a.listener, d = a.a || a.src;
    a.l && Xa(a);
    return c.call(d, b);
  }
  function Wa(a, b) {
    if (a.i) return !0;
    if (!Da) {
      if (!b)
        a: {
          b = ["window", "event"];
          for (var c = m, d = 0; d < b.length; d++)
            if (((c = c[b[d]]), null == c)) {
              b = null;
              break a;
            }
          b = c;
        }
      d = b;
      b = new N(d, this);
      c = !0;
      if (!(0 > d.keyCode || void 0 != d.returnValue)) {
        a: {
          var e = !1;
          if (0 == d.keyCode)
            try {
              d.keyCode = -1;
              break a;
            } catch (g) {
              e = !0;
            }
          if (e || void 0 == d.returnValue) d.returnValue = !0;
        }
        d = [];
        for (e = b.a; e; e = e.parentNode) d.push(e);
        a = a.type;
        for (e = d.length - 1; 0 <= e; e--) {
          b.a = d[e];
          var f = Ya(d[e], a, !0, b);
          c = c && f;
        }
        for (e = 0; e < d.length; e++)
          (b.a = d[e]), (f = Ya(d[e], a, !1, b)), (c = c && f);
      }
      return c;
    }
    return Za(a, new N(b, this));
  }
  function S(a) {
    a = a[Q];
    return a instanceof P ? a : null;
  }
  const $a = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
  function Sa(a) {
    if ("function" == q(a)) return a;
    a[$a] ||
      (a[$a] = b => {
        return a.handleEvent(b);
      });
    return a[$a];
  }

  class ab {
    constructor(a) {
      ha.call(this);
      this.b = a;
      this.a = {};
    }

    handleEvent() {
      throw Error("EventHandler.handleEvent not implemented");
    }
  }

  t(ab, ha);
  const bb = [];
  function cb(a, b) {
    const c = document.body;
    let d = "click";
    "array" != q(d) && (d && (bb[0] = d.toString()), (d = bb));
    for (let e = 0; e < d.length; e++) {
      const f = Qa(c, d[e], b || a.handleEvent, !1, a.b || a);
      if (!f) break;
      a.a[f.key] = f;
    }
  }
  function db(a) {
    va(
      a.a,
      function (a, c) {
        this.a.hasOwnProperty(c) && Xa(a);
      },
      a
    );
    a.a = {};
  }
  function eb() {}
  function fb() {}
  t(fb, eb);
  function T(a) {
    this.c = a;
  }
  t(T, fb);
  T.prototype.set = function (a, b) {
    try {
      this.c.setItem(a, b);
    } catch (c) {
      if (0 == this.c.length) throw "Storage mechanism: Storage disabled";
      throw "Storage mechanism: Quota exceeded";
    }
  };
  T.prototype.get = function (a) {
    a = this.c.getItem(a);
    if (!n(a) && null !== a)
      throw "Storage mechanism: Invalid value was encountered";
    return a;
  };
  T.prototype.key = function (a) {
    return this.c.key(a);
  };
  function gb() {
    let a = null;
    try {
      a = window.localStorage || null;
    } catch (b) {}
    this.c = a;
  }
  t(gb, T);
  function hb() {
    this.a = ib;
  }
  var ib = {};
  const U = {}, jb = {};
  function V() {
    throw Error("Do not instantiate directly");
  }
  V.prototype.s = null;
  V.prototype.toString = function () {
    return this.h;
  };
  function kb() {
    V.call(this);
  }
  t(kb, V);
  kb.prototype.g = U;
  function lb(a) {
    if (null != a)
      switch (a.s) {
        case 1:
          return 1;
        case -1:
          return -1;
        case 0:
          return 0;
      }
    return null;
  }
  function mb(a) {
    return null != a && a.g === U
      ? a
      : a instanceof hb
      ? nb(
          a instanceof hb && a.constructor === hb && a.a === ib
            ? ""
            : "type_error:SafeHtml",
          null
        )
      : nb(u(String(String(a))), lb(a));
  }
  var nb = (a => {
    function b(a) {
      this.h = a;
    }
    b.prototype = a.prototype;
    return (a, d) => {
      a = new b(String(a));
      void 0 !== d && (a.s = d);
      return a;
    };
  })(kb);
  function W(a) {
    return null != a && a.g === U
      ? String(String(a.h).replace(ob, "").replace(pb, "&lt;")).replace(qb, rb)
      : u(String(a));
  }
  const sb = {
    "\x00": "&#0;",
    "\t": "&#9;",
    "\n": "&#10;",
    "\x0B": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "-": "&#45;",
    "/": "&#47;",
    "<": "&lt;",
    "=": "&#61;",
    ">": "&gt;",
    "`": "&#96;",
    "\u0085": "&#133;",
    "\u00a0": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;",
  };
  function rb(a) {
    return sb[a];
  }
  var qb = /[\x00\x22\x27\x3c\x3e]/g;
  const tb = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
  const ub = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
  var ob = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
  var pb = /</g;
  const vb = (a => {
    let b = !1, c;
    return () => {
      b || ((c = a()), (b = !0));
      return c;
    };
  })(() => {
    const a = document.createElement("div");
    a.innerHTML = "<div><div></div></div>";
    const b = a.firstChild.firstChild;
    a.innerHTML = "";
    return !b.parentElement;
  });
  function wb(a) {
    a && a.parentNode && a.parentNode.removeChild(a);
  }
  function xb() {
    this.a = m.document || document;
  }
  function yb(a) {
    let b = a || zb;
    a = b.F;
    b = b.D;
    b =
      '<div class="survey-questions" survey-name=' +
      (null != b && b.g === U
        ? String(String(b.h).replace(ob, "").replace(pb, "&lt;")).replace(
            ub,
            rb
          )
        : String(b).replace(tb, rb)) +
      ">";
    for (let c = a.length, d = 0; d < c; d++) {
      const e = a[d];
      b += '<div class="survey-question-wrapper"><h4>' + mb(e.v) + "</h4>";
      if (e.options.length) {
        b += '<div class="survey-question-options">';
        for (let f = e.options, g = f.length, l = 0; l < g; l++) {
          const F = f[l];
          b +=
            '<label class="survey-option-wrapper" id="' +
            W(F.o) +
            '-label" for="' +
            W(F.o) +
            '"><span class="option-text">' +
            mb(F.C) +
            '</span><input type="radio" id="' +
            W(F.o) +
            '" name="' +
            W(e.v) +
            '"><span class="custom-radio-button"></span></label>';
        }
        b += "</div>";
      }
      b += "</div>";
    }
    b = nb(b + "</div>");
    a = (ja || (ja = new xb())).a.createElement("DIV");
    b: {
      if (b instanceof V) {
        if (b.g === U) {
          b = b.h;
          break b;
        }
        if (b.g === jb) {
          b = u(b.h);
          break b;
        }
      }
      b = "zSoyz";
    }
    if (vb()) for (; a.lastChild; ) a.removeChild(a.lastChild);
    a.innerHTML = b;
    1 == a.childNodes.length &&
      ((b = a.firstChild), 1 == b.nodeType && (a = b));
    return a;
  }
  var zb = {};

  /*

Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
  class X {
    constructor() {
      const a = HTMLElement.call(this) || this;
      a.f = a.getAttribute("survey-id") || "default-codelabs-survey";
      a.c = new gb();
      a.w = "codelab-survey-" + a.f;
      a.j = {};
      a.u = new ab();
      return a;
    }

    connectedCallback() {
      const a = this.c.get(this.w);
      this.j[this.f] = a ? JSON.parse(a) : {};
      Bb(this);
      Cb(this);
    }

    disconnectedCallback() {
      db(this.u);
    }
  }

  const Y = HTMLElement;
  X.prototype = aa(Y.prototype);
  X.prototype.constructor = X;
  if (da) da(X, Y);
  else
    for (const Z in Y)
      if ("prototype" != Z)
        if (Object.defineProperties) {
          const Ab = Object.getOwnPropertyDescriptor(Y, Z);
          Ab && Object.defineProperty(X, Z, Ab);
        } else X[Z] = Y[Z];
  X.A = Y.prototype;
  X.prototype.connectedCallback = X.prototype.connectedCallback;
  function Cb(a) {
    cb(a.u, b => {
      let c = b.target;
      const d = c.classList.contains("survey-option-wrapper");
      b = c.parentElement;
      let e = !1;
      b && (e = b.classList.contains("survey-option-wrapper"));
      if (d || e)
        if (
          (e && (c = b),
          c &&
            ((e = c.querySelector(".option-text")),
            (b = ""),
            e && (b = e.textContent),
            (e = c.querySelector("input"))))
        )
          (e.checked = !0),
            (e = e.name),
            (a.j[a.f][e] = b),
            a.c.set(a.w, JSON.stringify(a.j[a.f])),
            (b = new CustomEvent("google-codelab-action", {
              detail: {
                category: "survey",
                action: e.substring(0, 500),
                label: b.substring(0, 500),
              },
            })),
            document.body.dispatchEvent(b);
    });
  }
  function Bb(a) {
    let b = a.querySelectorAll("paper-radio-group");
    const c = a.querySelectorAll("h4");
    const d = [];
    b.length &&
      c.length == b.length &&
      (b.forEach((a, b) => {
        const e = [], f = a.querySelectorAll("paper-radio-button");
        wb(a);
        f.forEach(a => {
          a = a.textContent;
          e.push({ o: Db(c[b].textContent, a), C: a });
        });
        d.push({ v: c[b].textContent, options: e });
        wb(c[b]);
      }),
      (b = yb({ D: a.f, F: d })),
      a.appendChild(b));
    Eb(a);
    a.setAttribute("upgraded", "");
  }
  function Eb(a) {
    const b = a.j[a.f];
    b &&
      Object.keys(b).forEach(c => {
        if ((c = a.querySelector("#" + Db(c, b[c])))) c.checked = !0;
      });
  }
  function Db(a, b) {
    return (a + "--" + b)
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9 \-]/g, "")
      .toLowerCase();
  }
  X.prototype.disconnectedCallback = X.prototype.disconnectedCallback;
  try {
    window.customElements.define("google-codelab-survey", X);
  } catch (a) {
    console.warn("googlecodelabs.CodelabSurvey", a);
  }
}.call(this));
(function () {
  "use strict";

  const aa =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global
        ? global
        : this;

  const ba =
    "function" == typeof Object.create
      ? Object.create
      : a => {
          function b() {}
          b.prototype = a;
          return new b();
        };

  let ca;
  if ("function" == typeof Object.setPrototypeOf) ca = Object.setPrototypeOf;
  else {
    let da;
    a: {
      const ea = { da: !0 }, fa = {};
      try {
        fa.__proto__ = ea;
        da = fa.da;
        break a;
      } catch (a) {}
      da = !1;
    }
    ca = da
      ? (a, b) => {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  const ha = ca, h = this;
  function l(a) {
    return "string" == typeof a;
  }
  function ia() {}
  function ja(a) {
    const b = typeof a;
    if ("object" == b)
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return b;
        const c = Object.prototype.toString.call(a);
        if ("[object Window]" == c) return "object";
        if (
          "[object Array]" == c ||
          ("number" == typeof a.length &&
            "undefined" != typeof a.splice &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("splice"))
        )
          return "array";
        if (
          "[object Function]" == c ||
          ("undefined" != typeof a.call &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("call"))
        )
          return "function";
      } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  }
  function m(a) {
    return "array" == ja(a);
  }
  function n(a) {
    const b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  const ka = "closure_uid_" + ((1e9 * Math.random()) >>> 0);
  let la = 0;
  function ma(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function na(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      const d = Array.prototype.slice.call(arguments, 2);
      return function () {
        const c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function p(a, b, c) {
    Function.prototype.bind &&
    -1 != Function.prototype.bind.toString().indexOf("native code")
      ? (p = ma)
      : (p = na);
    return p.apply(null, arguments);
  }
  const oa =
    Date.now ||
    (() => {
      return +new Date();
    });
  function q(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.V = b.prototype;
  }
  function r() {
    0 != pa && (this[ka] || (this[ka] = ++la));
  }
  var pa = 0;
  let qa;
  const ra = Array.prototype.indexOf
            ? (a, b) => {
                return Array.prototype.indexOf.call(a, b, void 0);
              }
            : (a, b) => {
                if (l(a)) return l(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
                for (let c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
                return -1;
              },
        sa = Array.prototype.forEach
          ? (a, b) => {
              Array.prototype.forEach.call(a, b, void 0);
            }
          : (a, b) => {
              for (let c = a.length, d = l(a) ? a.split("") : a, e = 0; e < c; e++)
                e in d && b.call(void 0, d[e], e, a);
            },
        ta = Array.prototype.map
          ? (a, b) => {
              return Array.prototype.map.call(a, b, void 0);
            }
          : (a, b) => {
              for (
                var c = a.length, d = Array(c), e = l(a) ? a.split("") : a, f = 0;
                f < c;
                f++
              )
                f in e && (d[f] = b.call(void 0, e[f], f, a));
              return d;
            };
  const ua = String.prototype.trim
    ? a => {
        return a.trim();
      }
    : a => {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
      };
  function t(a) {
    if (!va.test(a)) return a;
    -1 != a.indexOf("&") && (a = a.replace(wa, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(xa, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(ya, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(za, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(Aa, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(Ba, "&#0;"));
    return a;
  }
  var wa = /&/g,
    xa = /</g,
    ya = />/g,
    za = /"/g,
    Aa = /'/g,
    Ba = /\x00/g,
    va = /[\x00&<>"']/;
  function Ca(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function Da(a) {
    return String(a).replace(/\-([a-z])/g, (a, c) => {
      return c.toUpperCase();
    });
  }
  function Ea(a) {
    const b = l(void 0)
      ? "undefined"
          .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
          .replace(/\x08/g, "\\x08")
      : "\\s";
    return a.replace(
      new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"),
      (a, b, e) => {
        return b + e.toUpperCase();
      }
    );
  }
  let u;
  a: {
    const Fa = h.navigator;
    if (Fa) {
      const Ga = Fa.userAgent;
      if (Ga) {
        u = Ga;
        break a;
      }
    }
    u = "";
  }
  function Ha(a, b, c) {
    for (const d in a) b.call(c, a[d], d, a);
  }
  const Ia =
    "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
      " "
    );
  function Ja(a, b) {
    for (let c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];
      for (c in d) a[c] = d[c];
      for (let f = 0; f < Ia.length; f++)
        (c = Ia[f]),
          Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
  function Ka(a) {
    Ka[" "](a);
    return a;
  }
  Ka[" "] = ia;
  function La(a, b) {
    const c = Ma;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : (c[a] = b(a));
  }
  const Na = -1 != u.indexOf("Opera"),
        v = -1 != u.indexOf("Trident") || -1 != u.indexOf("MSIE"),
        Oa = -1 != u.indexOf("Edge"),
        w =
          -1 != u.indexOf("Gecko") &&
          !(-1 != u.toLowerCase().indexOf("webkit") && -1 == u.indexOf("Edge")) &&
          !(-1 != u.indexOf("Trident") || -1 != u.indexOf("MSIE")) &&
          -1 == u.indexOf("Edge"),
        z = -1 != u.toLowerCase().indexOf("webkit") && -1 == u.indexOf("Edge");
  function Pa() {
    const a = h.document;
    return a ? a.documentMode : void 0;
  }
  let A;
  a: {
    let Qa = "";

    const Ra = (() => {
      const a = u;
      if (w) return /rv:([^\);]+)(\)|;)/.exec(a);
      if (Oa) return /Edge\/([\d\.]+)/.exec(a);
      if (v) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      if (z) return /WebKit\/(\S+)/.exec(a);
      if (Na) return /(?:Version)[ \/]?(\S+)/.exec(a);
    })();

    Ra && (Qa = Ra ? Ra[1] : "");
    if (v) {
      const Sa = Pa();
      if (null != Sa && Sa > parseFloat(Qa)) {
        A = String(Sa);
        break a;
      }
    }
    A = Qa;
  }
  var Ma = {};
  function Ta(a) {
    return La(a, () => {
      for (
        var b = 0,
          c = ua(String(A)).split("."),
          d = ua(String(a)).split("."),
          e = Math.max(c.length, d.length),
          f = 0;
        0 == b && f < e;
        f++
      ) {
        let g = c[f] || "", k = d[f] || "";
        do {
          g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
          k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
          if (0 == g[0].length && 0 == k[0].length) break;
          b =
            Ca(
              0 == g[1].length ? 0 : parseInt(g[1], 10),
              0 == k[1].length ? 0 : parseInt(k[1], 10)
            ) ||
            Ca(0 == g[2].length, 0 == k[2].length) ||
            Ca(g[2], k[2]);
          g = g[3];
          k = k[3];
        } while (0 == b);
      }
      return 0 <= b;
    });
  }
  let Ua;
  const Va = h.document;
  Ua =
    Va && v
      ? Pa() || ("CSS1Compat" == Va.compatMode ? parseInt(A, 10) : 5)
      : void 0;
  let Wa;
  (Wa = !v) || (Wa = 9 <= Number(Ua));
  const Xa = Wa,
        Ya = v && !Ta("9"),
        Za = (() => {
          if (!h.addEventListener || !Object.defineProperty) return !1;
          let a = !1;

          const b = Object.defineProperty({}, "passive", {
            get() {
              a = !0;
            },
          });

          h.addEventListener("test", ia, b);
          h.removeEventListener("test", ia, b);
          return a;
        })();

  class B {
    constructor(a, b) {
      this.type = a;
      this.a = this.target = b;
      this.f = !1;
      this.aa = !0;
    }

    stopPropagation() {
      this.f = !0;
    }

    preventDefault() {
      this.aa = !1;
    }
  }

  class C {
    constructor(a, b) {
      B.call(this, a ? a.type : "");
      this.relatedTarget = this.a = this.target = null;
      this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
      this.key = "";
      this.C = 0;
      this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
      this.pointerId = 0;
      this.pointerType = "";
      this.b = null;
      if (a) {
        const c = (this.type = a.type), d = a.changedTouches ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.a = b;
        if ((b = a.relatedTarget)) {
          if (w) {
            a: {
              try {
                Ka(b.nodeName);
                var e = !0;
                break a;
              } catch (f) {}
              e = !1;
            }
            e || (b = null);
          }
        } else
          "mouseover" == c
            ? (b = a.fromElement)
            : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        null === d
          ? ((this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
            (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
            (this.screenX = a.screenX || 0),
            (this.screenY = a.screenY || 0))
          : ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
            (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
            (this.screenX = d.screenX || 0),
            (this.screenY = d.screenY || 0));
        this.button = a.button;
        this.C = a.keyCode || 0;
        this.key = a.key || "";
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = l(a.pointerType)
          ? a.pointerType
          : $a[a.pointerType] || "";
        this.b = a;
        a.defaultPrevented && this.preventDefault();
      }
    }

    stopPropagation() {
      C.V.stopPropagation.call(this);
      this.b.stopPropagation
        ? this.b.stopPropagation()
        : (this.b.cancelBubble = !0);
    }

    preventDefault() {
      C.V.preventDefault.call(this);
      const a = this.b;
      if (a.preventDefault) a.preventDefault();
      else if (((a.returnValue = !1), Ya))
        try {
          if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
        } catch (b) {}
    }
  }

  q(C, B);
  var $a = { 2: "touch", 3: "pen", 4: "mouse" };
  const D = "closure_listenable_" + ((1e6 * Math.random()) | 0);
  let ab = 0;
  function bb(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.L = e;
    this.key = ++ab;
    this.B = this.G = !1;
  }
  function cb(a) {
    a.B = !0;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.L = null;
  }

  class E {
    constructor(a) {
      this.src = a;
      this.a = {};
      this.b = 0;
    }

    add(a, b, c, d, e) {
      const f = a.toString();
      a = this.a[f];
      a || ((a = this.a[f] = []), this.b++);
      const g = db(a, b, d, e);
      -1 < g
        ? ((b = a[g]), c || (b.G = !1))
        : ((b = new bb(b, this.src, f, !!d, e)), (b.G = c), a.push(b));
      return b;
    }
  }

  function eb(a, b) {
    const c = b.type;
    if (c in a.a) {
      const d = a.a[c];
      const e = ra(d, b);
      let f;
      (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
      f && (cb(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
    }
  }
  function db(a, b, c, d) {
    for (let e = 0; e < a.length; ++e) {
      const f = a[e];
      if (!f.B && f.listener == b && f.capture == !!c && f.L == d) return e;
    }
    return -1;
  }
  const fb = "closure_lm_" + ((1e6 * Math.random()) | 0);
  const gb = {};
  let hb = 0;
  function ib(a, b, c, d, e) {
    if (d && d.once) return jb(a, b, c, d, e);
    if (m(b)) {
      for (let f = 0; f < b.length; f++) ib(a, b[f], c, d, e);
      return null;
    }
    c = kb(c);
    return a && a[D]
      ? a.b.add(String(b), c, !1, n(d) ? !!d.capture : !!d, e)
      : lb(a, b, c, !1, d, e);
  }
  function lb(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    const g = n(e) ? !!e.capture : !!e;
    let k = F(a);
    k || (a[fb] = k = new E(a));
    c = k.add(b, c, d, g, f);
    if (c.proxy) return c;
    d = mb();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener)
      Za || (e = g),
        void 0 === e && (e = !1),
        a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent) a.attachEvent(nb(b.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    hb++;
    return c;
  }
  function mb() {
    const a = ob,
          b = Xa
            ? c => {
                return a.call(b.src, b.listener, c);
              }
            : c => {
                c = a.call(b.src, b.listener, c);
                if (!c) return c;
              };
    return b;
  }
  function jb(a, b, c, d, e) {
    if (m(b)) {
      for (let f = 0; f < b.length; f++) jb(a, b[f], c, d, e);
      return null;
    }
    c = kb(c);
    return a && a[D]
      ? a.b.add(String(b), c, !0, n(d) ? !!d.capture : !!d, e)
      : lb(a, b, c, !0, d, e);
  }
  function pb(a, b, c, d, e) {
    if (m(b)) for (var f = 0; f < b.length; f++) pb(a, b[f], c, d, e);
    else
      ((d = n(d) ? !!d.capture : !!d), (c = kb(c)), a && a[D])
        ? ((a = a.b),
          (b = String(b).toString()),
          b in a.a &&
            ((f = a.a[b]),
            (c = db(f, c, d, e)),
            -1 < c &&
              (cb(f[c]),
              Array.prototype.splice.call(f, c, 1),
              0 == f.length && (delete a.a[b], a.b--))))
        : a &&
          (a = F(a)) &&
          ((b = a.a[b.toString()]),
          (a = -1),
          b && (a = db(b, c, d, e)),
          (c = -1 < a ? b[a] : null) && qb(c));
  }
  function qb(a) {
    if ("number" != typeof a && a && !a.B) {
      const b = a.src;
      if (b && b[D]) eb(b.b, a);
      else {
        let c = a.type;
        const d = a.proxy;
        b.removeEventListener
          ? b.removeEventListener(c, d, a.capture)
          : b.detachEvent
          ? b.detachEvent(nb(c), d)
          : b.addListener && b.removeListener && b.removeListener(d);
        hb--;
        (c = F(b))
          ? (eb(c, a), 0 == c.b && ((c.src = null), (b[fb] = null)))
          : cb(a);
      }
    }
  }
  function nb(a) {
    return a in gb ? gb[a] : (gb[a] = "on" + a);
  }
  function rb(a, b, c, d) {
    let e = !0;
    if ((a = F(a)))
      if ((b = a.a[b.toString()]))
        for (b = b.concat(), a = 0; a < b.length; a++) {
          let f = b[a];
          f && f.capture == c && !f.B && ((f = sb(f, d)), (e = e && !1 !== f));
        }
    return e;
  }
  function sb(a, b) {
    const c = a.listener, d = a.L || a.src;
    a.G && qb(a);
    return c.call(d, b);
  }
  function ob(a, b) {
    if (a.B) return !0;
    if (!Xa) {
      if (!b)
        a: {
          b = ["window", "event"];
          for (var c = h, d = 0; d < b.length; d++)
            if (((c = c[b[d]]), null == c)) {
              b = null;
              break a;
            }
          b = c;
        }
      d = b;
      b = new C(d, this);
      c = !0;
      if (!(0 > d.keyCode || void 0 != d.returnValue)) {
        a: {
          var e = !1;
          if (0 == d.keyCode)
            try {
              d.keyCode = -1;
              break a;
            } catch (g) {
              e = !0;
            }
          if (e || void 0 == d.returnValue) d.returnValue = !0;
        }
        d = [];
        for (e = b.a; e; e = e.parentNode) d.push(e);
        a = a.type;
        for (e = d.length - 1; !b.f && 0 <= e; e--) {
          b.a = d[e];
          var f = rb(d[e], a, !0, b);
          c = c && f;
        }
        for (e = 0; !b.f && e < d.length; e++)
          (b.a = d[e]), (f = rb(d[e], a, !1, b)), (c = c && f);
      }
      return c;
    }
    return sb(a, new C(b, this));
  }
  function F(a) {
    a = a[fb];
    return a instanceof E ? a : null;
  }
  const tb = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
  function kb(a) {
    if ("function" == ja(a)) return a;
    a[tb] ||
      (a[tb] = b => {
        return a.handleEvent(b);
      });
    return a[tb];
  }

  class G {
    constructor(a) {
      r.call(this);
      this.b = a;
      this.a = {};
    }

    handleEvent() {
      throw Error("EventHandler.handleEvent not implemented");
    }
  }

  q(G, r);
  const ub = [];
  function H(a, b, c, d) {
    m(c) || (c && (ub[0] = c.toString()), (c = ub));
    for (let e = 0; e < c.length; e++) {
      const f = ib(b, c[e], d || a.handleEvent, !1, a.b || a);
      if (!f) break;
      a.a[f.key] = f;
    }
  }
  function vb(a, b, c) {
    wb(a, b, ["finish", "stop"], c, void 0);
  }
  function wb(a, b, c, d, e, f) {
    if (m(c)) for (let g = 0; g < c.length; g++) wb(a, b, c[g], d, e, f);
    else
      (b = jb(b, c, d || a.handleEvent, e, f || a.b || a)) && (a.a[b.key] = b);
  }
  function xb(a) {
    Ha(
      a.a,
      function (a, c) {
        this.a.hasOwnProperty(c) && qb(a);
      },
      a
    );
    a.a = {};
  }
  function yb(a) {
    let b = !1, c;
    return () => {
      b || ((c = a()), (b = !0));
      return c;
    };
  }
  function zb() {}
  function Ab() {}
  q(Ab, zb);

  class I {
    constructor(a) {
      this.m = a;
    }

    set(a, b) {
      try {
        this.m.setItem(a, b);
      } catch (c) {
        if (0 == this.m.length) throw "Storage mechanism: Storage disabled";
        throw "Storage mechanism: Quota exceeded";
      }
    }

    get(a) {
      a = this.m.getItem(a);
      if (!l(a) && null !== a)
        throw "Storage mechanism: Invalid value was encountered";
      return a;
    }

    key(a) {
      return this.m.key(a);
    }
  }

  q(I, Ab);
  function Bb() {
    let a = null;
    try {
      a = window.localStorage || null;
    } catch (b) {}
    this.m = a;
  }
  q(Bb, I);
  const Cb = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  };

  class J {
    constructor() {
      this.a = Db;
    }

    j() {
      return "";
    }

    toString() {
      return "Const{}";
    }
  }

  J.prototype.o = !0;
  function Eb(a) {
    return a instanceof J && a.constructor === J && a.a === Db
      ? ""
      : "type_error:Const";
  }
  var Db = {};

  class K {
    constructor() {
      this.a = Fb;
    }

    j() {
      return "";
    }

    v() {
      return 1;
    }
  }

  K.prototype.o = !0;
  K.prototype.R = !0;
  function Gb(a) {
    return a instanceof K && a.constructor === K && a.a === Fb
      ? ""
      : "type_error:TrustedResourceUrl";
  }
  var Fb = {};

  class L {
    constructor() {
      this.a = "";
      this.b = Hb;
    }

    j() {
      return this.a;
    }

    v() {
      return 1;
    }
  }

  L.prototype.o = !0;
  L.prototype.R = !0;
  function Ib(a) {
    return a instanceof L && a.constructor === L && a.b === Hb
      ? a.a
      : "type_error:SafeUrl";
  }
  const Jb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
  function Kb(a) {
    if (a instanceof L) return a;
    a = "object" == typeof a && a.o ? a.j() : String(a);
    Jb.test(a) || (a = "about:invalid#zClosurez");
    return Lb(a);
  }
  var Hb = {};
  function Lb(a) {
    const b = new L();
    b.a = a;
    return b;
  }
  Lb("about:blank");

  class M {
    constructor() {
      this.a = "";
      this.b = Mb;
    }

    j() {
      return this.a;
    }
  }

  M.prototype.o = !0;
  var Mb = {};
  function Nb(a) {
    const b = new M();
    b.a = a;
    return b;
  }
  const Ob = Nb("");
  function Pb(a) {
    if (a instanceof L)
      a = 'url("' + Ib(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
    else if (a instanceof J) a = Eb(a);
    else {
      a = String(a);
      let b = a.replace(Qb, "$1").replace(Qb, "$1").replace(Rb, "url");
      if (Sb.test(b)) {
        if ((b = !Tb.test(a))) {
          for (var c = (b = !0), d = 0; d < a.length; d++) {
            const e = a.charAt(d);
            "'" == e && c ? (b = !b) : '"' == e && b && (c = !c);
          }
          b = b && c && Ub(a);
        }
        a = b ? Vb(a) : "zClosurez";
      } else a = "zClosurez";
    }
    return a;
  }
  function Ub(a) {
    for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
      const e = a.charAt(d);
      if ("]" == e) {
        if (b) return !1;
        b = !0;
      } else if ("[" == e) {
        if (!b) return !1;
        b = !1;
      } else if (!b && !c.test(e)) return !1;
    }
    return b;
  }
  var Sb = /^[-,."'%_!# a-zA-Z0-9\[\]]+$/,
    Rb =
      /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g,
    Qb =
      /\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g,
    Tb = /\/\*/;
  function Vb(a) {
    return a.replace(Rb, (a, c, d, e) => {
      let b = "";
      d = d.replace(/^(['"])(.*)\1$/, (a, c, d) => {
        b = c;
        return d;
      });
      a = Kb(d).j();
      return c + b + a + b + e;
    });
  }

  class N {
    constructor() {
      this.a = "";
      this.f = Wb;
      this.b = null;
    }

    v() {
      return this.b;
    }

    j() {
      return this.a;
    }
  }

  N.prototype.R = !0;
  N.prototype.o = !0;
  function O(a) {
    return a instanceof N && a.constructor === N && a.f === Wb
      ? a.a
      : "type_error:SafeHtml";
  }
  const Xb = /^[a-zA-Z0-9-]+$/,
        Yb = {
          action: !0,
          cite: !0,
          data: !0,
          formaction: !0,
          href: !0,
          manifest: !0,
          poster: !0,
          src: !0,
        },
        Zb = {
          APPLET: !0,
          BASE: !0,
          EMBED: !0,
          IFRAME: !0,
          LINK: !0,
          MATH: !0,
          META: !0,
          OBJECT: !0,
          SCRIPT: !0,
          STYLE: !0,
          SVG: !0,
          TEMPLATE: !0,
        };
  function $b(a) {
    function b(a) {
      if (m(a)) sa(a, b);
      else {
        if (a instanceof N) let e = a;
        else {
          const g = "object" == typeof a;
          e = null;
          g && a.R && (e = a.v());
          a = t(g && a.o ? a.j() : String(a));
          e = P(a, e);
        }
        d += O(e);
        e = e.v();
        0 == c ? (c = e) : 0 != e && c != e && (c = null);
      }
    }
    var c = 0,
      d = "";
    sa(arguments, b);
    return P(d, c);
  }
  var Wb = {};
  function P(a, b) {
    const c = new N();
    c.a = a;
    c.b = b;
    return c;
  }
  P("<!DOCTYPE html>", 0);
  P("", 0);
  P("<br>", 0);
  const ac = {}, bc = {}, cc = {}, dc = {};

  class Q {
    constructor() {
      throw Error("Do not instantiate directly");
    }

    toString() {
      return this.K;
    }
  }

  Q.prototype.W = null;
  function ec() {
    Q.call(this);
  }
  q(ec, Q);
  ec.prototype.u = ac;
  function fc(a) {
    if (null != a)
      switch (a.W) {
        case 1:
          return 1;
        case -1:
          return -1;
        case 0:
          return 0;
      }
    return null;
  }
  function gc(a) {
    return null != a && a.u === ac
      ? a
      : a instanceof N
      ? R(O(a), a.v())
      : R(t(String(String(a))), fc(a));
  }
  var R = (a => {
    function b(a) {
      this.K = a;
    }
    b.prototype = a.prototype;
    return (a, d) => {
      a = new b(String(a));
      void 0 !== d && (a.W = d);
      return a;
    };
  })(ec);
  function hc(a) {
    return null != a && a.u === ac
      ? String(String(a.K).replace(ic, "").replace(jc, "&lt;")).replace(kc, lc)
      : t(String(a));
  }
  function mc(a) {
    (null != a && a.u === bc) || (null != a && a.u === cc)
      ? (a = String(a).replace(nc, oc))
      : a instanceof L
      ? (a = String(Ib(a)).replace(nc, oc))
      : a instanceof K
      ? (a = String(Gb(a)).replace(nc, oc))
      : ((a = String(a)),
        (a = pc.test(a) ? a.replace(nc, oc) : "about:invalid#zSoyz"));
    return a;
  }
  const qc = {
    "\x00": "&#0;",
    "\t": "&#9;",
    "\n": "&#10;",
    "\x0B": "&#11;",
    "\f": "&#12;",
    "\r": "&#13;",
    " ": "&#32;",
    '"': "&quot;",
    "&": "&amp;",
    "'": "&#39;",
    "-": "&#45;",
    "/": "&#47;",
    "<": "&lt;",
    "=": "&#61;",
    ">": "&gt;",
    "`": "&#96;",
    "\u0085": "&#133;",
    "\u00a0": "&#160;",
    "\u2028": "&#8232;",
    "\u2029": "&#8233;",
  };
  function lc(a) {
    return qc[a];
  }
  const rc = {
    "\x00": "%00",
    "\u0001": "%01",
    "\u0002": "%02",
    "\u0003": "%03",
    "\u0004": "%04",
    "\u0005": "%05",
    "\u0006": "%06",
    "\u0007": "%07",
    "\b": "%08",
    "\t": "%09",
    "\n": "%0A",
    "\x0B": "%0B",
    "\f": "%0C",
    "\r": "%0D",
    "\u000e": "%0E",
    "\u000f": "%0F",
    "\u0010": "%10",
    "\u0011": "%11",
    "\u0012": "%12",
    "\u0013": "%13",
    "\u0014": "%14",
    "\u0015": "%15",
    "\u0016": "%16",
    "\u0017": "%17",
    "\u0018": "%18",
    "\u0019": "%19",
    "\u001a": "%1A",
    "\u001b": "%1B",
    "\u001c": "%1C",
    "\u001d": "%1D",
    "\u001e": "%1E",
    "\u001f": "%1F",
    " ": "%20",
    '"': "%22",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "<": "%3C",
    ">": "%3E",
    "\\": "%5C",
    "{": "%7B",
    "}": "%7D",
    "\u007f": "%7F",
    "\u0085": "%C2%85",
    "\u00a0": "%C2%A0",
    "\u2028": "%E2%80%A8",
    "\u2029": "%E2%80%A9",
    "\uff01": "%EF%BC%81",
    "\uff03": "%EF%BC%83",
    "\uff04": "%EF%BC%84",
    "\uff06": "%EF%BC%86",
    "\uff07": "%EF%BC%87",
    "\uff08": "%EF%BC%88",
    "\uff09": "%EF%BC%89",
    "\uff0a": "%EF%BC%8A",
    "\uff0b": "%EF%BC%8B",
    "\uff0c": "%EF%BC%8C",
    "\uff0f": "%EF%BC%8F",
    "\uff1a": "%EF%BC%9A",
    "\uff1b": "%EF%BC%9B",
    "\uff1d": "%EF%BC%9D",
    "\uff1f": "%EF%BC%9F",
    "\uff20": "%EF%BC%A0",
    "\uff3b": "%EF%BC%BB",
    "\uff3d": "%EF%BC%BD",
  };
  function oc(a) {
    return rc[a];
  }
  var kc = /[\x00\x22\x27\x3c\x3e]/g,
    nc =
      /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,
    pc =
      /^(?![^#?]*\/(?:\.|%2E){2}(?:[\/?#]|$))(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,
    ic = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
    jc = /</g;
  function sc(a) {
    a = a.ga;
    return R(
      '<div id="drawer">Drawer</div><div id="codelab-title"><div id="codelab-nav-buttons"><a href="' +
        hc(mc(a)) +
        '" id="arrow-back"><i class="material-icons">close</i></a><a href="#" id="menu"><i class="material-icons">menu</i></a></div><div id="codelab-time-container"></div><devsite-user></devsite-user></div><div id="main"><div id="steps"></div><div id="controls"><div id="fabs"><a href="#" id="previous-step" title="Previous step">Back</a><div class="spacer"></div><a href="#" id="next-step" title="Next step">Next</a><a href="' +
        hc(mc(a)) +
        '" id="done" hidden title="Codelab complete">Done</a></div></div></div>'
    );
  }
  function tc(a) {
    return R('<h1 class="title">' + gc(a.title) + "</h1>");
  }
  function uc(a) {
    a = a.time;
    return R(
      '<div id="time-remaining" title="Time remaining"><i class="material-icons">access_time</i>' +
        (1 == a ? gc(a) + " min remaining" : gc(a) + " mins remaining") +
        "</div>"
    );
  }
  function vc(a) {
    const b = a.steps;
    a = a.fa;
    for (var c = '<div class="steps"><ol>', d = b.length, e = 0; e < d; e++) {
      const f = b[e];
      c +=
        '<li><a href="#' +
        hc(e) +
        '"><span class="step"><span>' +
        gc(f) +
        "</span></span></a></li>";
    }
    c +=
      "</ol></div>" +
      (a
        ? '<div class="metadata"><a target="_blank" href="' +
          hc(mc(a)) +
          '"><i class="material-icons">bug_report</i> Report a mistake</a></div>'
        : "");
    return R(c);
  }

  class S {
    constructor() {
      r.call(this);
      this.b = new E(this);
      this.f = this;
    }

    removeEventListener(a, b, c, d) {
      pb(this, a, b, c, d);
    }
  }

  q(S, r);
  S.prototype[D] = !0;
  function wc(a, b, c, d) {
    b = a.b.a[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      const g = b[f];
      if (g && !g.B && g.capture == c) {
        const k = g.listener, x = g.L || g.src;
        g.G && eb(a.b, g);
        e = !1 !== k.call(x, d) && e;
      }
    }
    return e && 0 != d.aa;
  }
  function T(a, b) {
    const c = b.type || b;
    if (l(b)) b = new B(b, a);
    else if (b instanceof B) b.target = b.target || a;
    else {
      const d = b;
      b = new B(c, a);
      Ja(b, d);
    }
    b.f || ((a = b.a = a), wc(a, c, !0, b), b.f || wc(a, c, !1, b));
  }
  function xc(a, b, c) {
    if ("function" == ja(a)) c && (a = p(a, c));
    else if (a && "function" == typeof a.handleEvent) a = p(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : h.setTimeout(a, b || 0);
  }
  function yc() {
    S.call(this);
    this.J = zc;
  }
  q(yc, S);
  var zc = 0;
  const Ac = yb(() => {
    const a = document.createElement("div");
    a.innerHTML = "<div><div></div></div>";
    const b = a.firstChild.firstChild;
    a.innerHTML = "";
    return !b.parentElement;
  });
  function Bc(a, b) {
    if (Ac()) for (; a.lastChild; ) a.removeChild(a.lastChild);
    a.innerHTML = b;
  }
  function Cc(a, b) {
    for (; a && 1 != a.nodeType; ) a = b ? a.nextSibling : a.previousSibling;
    return a;
  }
  function Dc() {
    this.a = h.document || document;
  }
  function U(a, b, c) {
    if (l(b)) (b = Ec(a, b)) && (a.style[b] = c);
    else
      for (const d in b) {
        c = a;
        const e = b[d], f = Ec(c, d);
        f && (c.style[f] = e);
      }
  }
  const Fc = {};
  function Ec(a, b) {
    let c = Fc[b];
    if (!c) {
      let d = Da(b);
      c = d;
      void 0 === a.style[d] &&
        ((d = (z ? "Webkit" : w ? "Moz" : v ? "ms" : Na ? "O" : null) + Ea(d)),
        void 0 !== a.style[d] && (c = d));
      Fc[b] = c;
    }
    return c;
  }
  function Gc(a) {
    const b = a.offsetWidth;
    let c = a.offsetHeight;
    c = z && !b && !c;
    if ((void 0 === b || c) && a.getBoundingClientRect)
      a: {
        try {
          var d = a.getBoundingClientRect();
        } catch (e) {
          break a;
        }
        v &&
          a.ownerDocument.body &&
          ((a = a.ownerDocument),
          (d.left -= a.documentElement.clientLeft + a.body.clientLeft),
          (d.top -= a.documentElement.clientTop + a.body.clientTop));
      }
  }
  function Hc(a, b) {
    m(b) || (b = [b]);
    b = ta(b, a => {
      return l(a)
        ? a
        : a.ka + " " + a.duration + "s " + a.timing + " " + a.ea + "s";
    });
    U(a, "transition", b.join(","));
  }
  const Ic = yb(() => {
    if (v) return Ta("10.0");
    let a = document.createElement("DIV");
    let b = z ? "-webkit" : w ? "-moz" : v ? "-ms" : Na ? "-o" : null, c = { transition: "opacity 1s linear" };
    b && (c[b + "-transition"] = "opacity 1s linear");
    b = { style: c };
    if (!Xb.test("div")) throw Error("Invalid tag name <div>.");
    if ("DIV" in Zb) throw Error("Tag name <div> is not allowed for SafeHtml.");
    c = null;
    let d = "";
    if (b)
      for (y in b) {
        if (!Xb.test(y)) throw Error('Invalid attribute name "' + y + '".');
        let e = b[y];
        if (null != e) {
          let f = y;
          let g = e;
          if (g instanceof J) g = Eb(g);
          else if ("style" == f.toLowerCase()) {
            e = void 0;
            if (!n(g))
              throw Error(
                'The "style" attribute requires goog.html.SafeStyle or map of style properties, ' +
                  typeof g +
                  " given: " +
                  g
              );
            if (!(g instanceof M)) {
              let k = "";
              for (e in g) {
                if (!/^[-_a-zA-Z0-9]+$/.test(e))
                  throw Error("Name allows only [-_a-zA-Z0-9], got: " + e);
                let x = g[e];
                null != x &&
                  ((x = m(x) ? ta(x, Pb).join(" ") : Pb(x)),
                  (k += e + ":" + x + ";"));
              }
              g = k ? Nb(k) : Ob;
            }
            g =
              g instanceof M && g.constructor === M && g.b === Mb
                ? g.a
                : "type_error:SafeStyle";
          } else {
            if (/^on/i.test(f))
              throw Error(
                'Attribute "' +
                  f +
                  '" requires goog.string.Const value, "' +
                  g +
                  '" given.'
              );
            if (f.toLowerCase() in Yb)
              if (g instanceof K) g = Gb(g);
              else if (g instanceof L) g = Ib(g);
              else if (l(g)) g = Kb(g).j();
              else
                throw Error(
                  'Attribute "' +
                    f +
                    '" on tag "div" requires goog.html.SafeUrl, goog.string.Const, or string, value "' +
                    g +
                    '" given.'
                );
          }
          g.o && (g = g.j());
          f = f + '="' + t(String(g)) + '"';
          d += " " + f;
        }
      }
    var y = "<div" + d;
    d = void 0;
    null != d ? m(d) || (d = [d]) : (d = []);
    !0 === Cb.div
      ? (y += ">")
      : ((c = $b(d)), (y += ">" + O(c) + "</div>"), (c = c.v()));
    (b = b && b.dir) && (/^(ltr|rtl|auto)$/i.test(b) ? (c = 0) : (c = null));
    b = P(y, c);
    Bc(a, O(b));
    a = a.firstChild;
    b = a.style[Da("transition")];
    return (
      "" != ("undefined" !== typeof b ? b : a.style[Ec(a, "transition")] || "")
    );
  });

  class V {
    constructor(a, b, c, d, e) {
      yc.call(this);
      this.a = a;
      this.ha = b;
      this.ia = c;
      this.Y = d;
      this.la = m(e) ? e : [e];
    }

    ja() {
      const a = this.a;
      b: {
        var b = 9 == a.nodeType ? a : a.ownerDocument || a.document;
        if (
          b.defaultView &&
          b.defaultView.getComputedStyle &&
          (b = b.defaultView.getComputedStyle(a, null))
        ) {
          b = b.display || b.getPropertyValue("display") || "";
          break b;
        }
        b = "";
      }
      if (
        "none" !=
        (b ||
          (a.currentStyle ? a.currentStyle.display : null) ||
          (a.style && a.style.display))
      )
        Gc(a);
      else {
        b = a.style;
        const c = b.display, d = b.visibility, e = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        Gc(a);
        b.display = c;
        b.position = e;
        b.visibility = d;
      }
      Hc(this.a, this.la);
      U(this.a, this.Y);
      this.Z = xc(p(this.P, this, !1), 1e3 * this.ha);
    }

    P(a) {
      U(this.a, "transition", "");
      h.clearTimeout(this.Z);
      U(this.a, this.Y);
      oa();
      this.J = zc;
      a ? T(this.f, "stop") : T(this.f, "finish");
      T(this.f, "end");
    }
  }

  q(V, yc);
  function Jc(a) {
    1 != a.J &&
      (T(a.f, "begin"),
      T(a.f, "play"),
      oa(),
      (a.J = 1),
      Ic() ? (U(a.a, a.ia), (a.Z = xc(a.ja, void 0, a))) : a.P(!1));
  }
  function Kc(a) {
    1 == a.J && a.P(!0);
  }
  function Lc(a, b, c) {
    Bc(a, Mc(b(c || Nc, void 0, void 0)));
  }
  function Oc(a, b) {
    b = a(b || Nc, void 0, void 0);
    a = (qa || (qa = new Dc())).a.createElement("DIV");
    b = Mc(b);
    Bc(a, b);
    1 == a.childNodes.length &&
      ((b = a.firstChild), 1 == b.nodeType && (a = b));
    return a;
  }
  function Mc(a) {
    if (a instanceof Q) {
      if (a.u === ac) return a.K;
      if (a.u === dc) return t(a.K);
    }
    return "zSoyz";
  }
  var Nc = {};

  /*

Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
  class W {
    constructor() {
      const a = HTMLElement.call(this) || this;
      a.g = null;
      a.ba = null;
      a.N = null;
      a.l = null;
      a.w = null;
      a.A = null;
      a.H = null;
      a.I = null;
      a.M = "";
      a.s = "";
      a.c = [];
      a.h = -1;
      a.i = new G();
      a.O = new G();
      a.X = !1;
      a.S = !1;
      a.D = null;
      a.F = null;
      a.$ = !1;
      a.m = new Bb();
      return a;
    }

    connectedCallback() {
      this.X || Qc(this);
      Rc(this);
      const a = document.querySelector("google-codelab-analytics");
      if (a) {
        const b = this.getAttribute("codelab-gaid");
        b && a.setAttribute("codelab-gaid", b);
        a.setAttribute("environment", this.getAttribute("environment"));
        a.setAttribute("category", this.getAttribute("category"));
      }
      Sc(this);
      Tc(this);
      Uc(this);
      Vc(this);
      this.$ && console.log("resumed");
      this.S ||
        ((this.S = !0),
        Z(this, "google-codelab-ready"),
        this.setAttribute("google-codelab-ready", ""));
    }

    disconnectedCallback() {
      xb(this.i);
      xb(this.O);
    }

    attributeChangedCallback(a) {
      const b = this;
      switch (a) {
        case "title":
          this.hasAttribute("title") &&
            ((this.s = this.getAttribute("title")),
            this.removeAttribute("title"),
            this.setAttribute("codelab-title", this.s));
          break;
        case "codelab-title":
          this.s = this.getAttribute("codelab-title");
          Tc(this);
          break;
        case "selected":
          Sc(this);
          break;
        case "no-toolbar":
          Vc(this);
          break;
        case "no-arrows":
          Uc(this);
          break;
        case "anayltics-ready":
          this.hasAttribute("anayltics-ready") &&
            (this.S
              ? Wc(this)
              : this.addEventListener("google-codelab-ready", () => {
                  return Wc(b);
                }));
      }
    }

    T() {
      this.setAttribute("selected", this.h + 1);
    }

    U() {
      this.setAttribute("selected", this.h - 1);
    }

    select(a) {
      this.setAttribute("selected", a);
    }

    ca(a, b) {
      (void 0 === b ? 0 : b)
        ? window.history.replaceState({ path: a }, document.title, a)
        : window.history.pushState({ path: a }, document.title, a);
    }
  }

  const X = HTMLElement;
  W.prototype = ba(X.prototype);
  W.prototype.constructor = W;
  if (ha) ha(W, X);
  else
    for (const Y in X)
      if ("prototype" != Y)
        if (Object.defineProperties) {
          const Pc = Object.getOwnPropertyDescriptor(X, Y);
          Pc && Object.defineProperty(W, Y, Pc);
        } else W[Y] = X[Y];
  W.V = X.prototype;
  W.prototype.connectedCallback = W.prototype.connectedCallback;
  W.prototype.disconnectedCallback = W.prototype.disconnectedCallback;
  W.prototype.attributeChangedCallback = W.prototype.attributeChangedCallback;
  W.prototype.selectNext = W.prototype.T;
  W.prototype.selectPrevious = W.prototype.U;
  W.prototype.select = W.prototype.select;
  function Rc(a) {
    a.A &&
      H(a.i, a.A, "click", b => {
        b.preventDefault();
        b.stopPropagation();
        a.U();
      });
    a.w &&
      H(a.i, a.w, "click", b => {
        b.preventDefault();
        b.stopPropagation();
        a.T();
      });
    a.g &&
      (H(a.i, a.g, "click", b => {
        for (var c = b.target; c !== a.g && "A" !== c.tagName.toUpperCase(); )
          b.preventDefault(), b.stopPropagation(), (c = c.parentNode);
        c !== a.g &&
          ((b = new URL(
            c.getAttribute("href"),
            document.location.origin
          ).hash.substring(1)),
          a.setAttribute("selected", b));
      }),
      H(a.i, a.g, "keydown", b => {
        if (a.g) {
          const c = a.g.querySelector(":focus");
          let e;
          c ? (e = c.parentNode) : (e = a.g.querySelector("[selected]"));
          if (e) {
            let f;
            38 == b.C
              ? (f =
                  void 0 !== e.previousElementSibling
                    ? e.previousElementSibling
                    : Cc(e.previousSibling, !1))
              : 40 == b.C &&
                (f =
                  void 0 !== e.nextElementSibling
                    ? e.nextElementSibling
                    : Cc(e.nextSibling, !0));
            f && (b = f.querySelector("a")) && b.focus();
          }
        }
      }));
    if (a.l) {
      const b = a.l.querySelector("#menu");
      b &&
        (H(a.i, b, "click", b => {
          b.preventDefault();
          b.stopPropagation();
          a.hasAttribute("drawer--open")
            ? a.removeAttribute("drawer--open")
            : a.setAttribute("drawer--open", "");
        }),
        H(a.i, document.body, "click", () => {
          a.hasAttribute("drawer--open") && a.removeAttribute("drawer--open");
        }));
    }
    H(a.i, window, "popstate", () => {
      document.location.hash &&
        (a.setAttribute("dsh", ""),
        a.setAttribute("selected", document.location.hash.substring(1)),
        a.removeAttribute("dsh"));
    });
    H(a.i, document.body, "keydown", b => {
      37 == b.C
        ? (document.activeElement && document.activeElement.blur(), a.U())
        : 39 == b.C &&
          (document.activeElement && document.activeElement.blur(), a.T());
    });
  }
  function Vc(a) {
    a.l &&
      (a.hasAttribute("no-toolbar")
        ? a.l.setAttribute("hidden", "")
        : a.l.removeAttribute("hidden"));
  }
  function Uc(a) {
    a.H &&
      (a.hasAttribute("no-arrows")
        ? a.H.setAttribute("hidden", "")
        : a.H.removeAttribute("hidden"));
  }
  W.prototype.updateHistoryState = W.prototype.ca;
  function Tc(a) {
    if (a.s && a.l) {
      const b = Oc(tc, { title: a.s });
      document.title = a.s;
      const c = a.l.querySelector("h1");
      a = a.l.querySelector("#codelab-nav-buttons");
      c
        ? (a = c.parentNode) && a.replaceChild(b, c)
        : a.parentNode && a.parentNode.insertBefore(b, a.nextSibling);
    }
  }
  function Xc(a) {
    if (a.N) {
      for (var b = 0, c = a.h; c < a.c.length; c++) {
        const d = parseInt(a.c[c].getAttribute("duration"), 10);
        d && (b += d);
      }
      b = Oc(uc, { time: b });
      (c = a.N.querySelector("#time-remaining"))
        ? (a = c.parentNode) && a.replaceChild(b, c)
        : a.N.appendChild(b);
    }
  }
  function Yc(a) {
    a.c.forEach((a, c) => {
      a.setAttribute("step", c + 1);
    });
  }
  function Sc(a) {
    let b = 0;
    if (a.hasAttribute("selected")) {
      if (
        ((b = parseInt(a.getAttribute("selected"), 0)),
        (b = Math.min(Math.max(0, parseInt(b, 10)), a.c.length - 1)),
        a.h !== b && !isNaN(b))
      ) {
        let c = a.c[b].querySelector(".step-title");
        Z(a, "google-codelab-pageview", {
          page: location.pathname + "#" + b,
          title: (c ? c.textContent : "")
            .replace(new RegExp(b + 1 + ".", "g"), "")
            .trim(),
        });
        if (-1 === a.h) a.c[b].setAttribute("selected", "");
        else {
          a.D && Kc(a.D);
          a.F && Kc(a.F);
          xb(a.O);
          c = {};
          const d = {}, e = a.c[b], f = a.c[a.h];
          e.setAttribute("animating", "");
          a.h < b
            ? ((c.transform = "translate3d(110%, 0, 0)"),
              (d.transform = "translate3d(-110%, 0, 0)"))
            : ((c.transform = "translate3d(-110%, 0, 0)"),
              (d.transform = "translate3d(110%, 0, 0)"));
          const g = [
            {
              ka: "transform",
              duration: 0.5,
              ea: 0,
              timing: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
          ];
          a.D = new V(e, 0.5, c, { transform: "translate3d(0, 0, 0)" }, g);
          a.F = new V(f, 0.5, { transform: "translate3d(0, 0, 0)" }, d, g);
          Jc(a.D);
          Jc(a.F);
          vb(a.O, a.D, () => {
            e.setAttribute("selected", "");
            e.removeAttribute("animating");
          });
          vb(a.O, a.F, () => {
            f.removeAttribute("selected");
          });
        }
        a.h = b;
        a.w &&
          a.A &&
          a.I &&
          (0 === b
            ? a.A.setAttribute("disappear", "")
            : a.A.removeAttribute("disappear"),
          b === a.c.length - 1
            ? (a.w.setAttribute("hidden", ""),
              a.I.removeAttribute("hidden"),
              Z(a, "google-codelab-action", {
                category: "codelab",
                action: "complete",
                label: a.s,
              }))
            : (a.w.removeAttribute("hidden"), a.I.setAttribute("hidden", "")));
        a.g &&
          a.g.querySelectorAll("li").forEach((a, c) => {
            c <= b
              ? a.setAttribute("completed", "")
              : a.removeAttribute("completed");
            c === b
              ? a.setAttribute("selected", "")
              : a.removeAttribute("selected");
          });
        Xc(a);
        a.hasAttribute("dsh") || a.ca("#" + b, !0);
        a.M && a.m.set("progress_" + a.M, String(a.h));
      }
    } else a.setAttribute("selected", b);
  }
  function Zc(a) {
    const b = a.getAttribute("feedback-link"),
          c = a.c.map(a => {
            return a.getAttribute("label");
          });
    Lc(a.g, vc, { steps: c, fa: b });
  }
  function $c() {
    let a = new URL(document.location.toString()).searchParams.get("index");
    if (!a) return "/";
    a = a.replace(/[^a-z0-9\-]+/gi, "");
    if (!a || "" === a.trim()) return "/";
    "index" === a && (a = "");
    return new URL(a, document.location.origin).pathname;
  }
  function Z(a, b, c) {
    c = void 0 === c ? {} : c;
    b = new CustomEvent(b, { detail: c, bubbles: !0 });
    a.dispatchEvent(b);
  }
  function Wc(a) {
    Z(a, "google-codelab-pageview", {
      page: location.pathname + "#" + a.h,
      title: a.c[a.h].getAttribute("label"),
    });
    window.requestAnimationFrame(() => {
      document.body.removeAttribute("unresolved");
      Z(a, "google-codelab-action", { category: "codelab", action: "ready" });
    });
  }
  function Qc(a) {
    a.c = Array.from(a.querySelectorAll("google-codelab-step"));
    Lc(a, sc, { ga: $c() });
    a.g = a.querySelector("#drawer");
    a.l = a.querySelector("#codelab-title");
    a.N = a.querySelector("#codelab-time-container");
    a.ba = a.querySelector("#steps");
    a.H = a.querySelector("#controls");
    a.A = a.querySelector("#controls #previous-step");
    a.w = a.querySelector("#controls #next-step");
    a.I = a.querySelector("#controls #done");
    a.c.forEach(b => {
      a.ba.appendChild(b);
    });
    Yc(a);
    Zc(a);
    if (document.location.hash) {
      var b = parseInt(document.location.hash.substring(1), 10);
      !isNaN(b) &&
        b &&
        a.setAttribute("selected", document.location.hash.substring(1));
    }
    a.M = a.getAttribute("id");
    (b = a.m.get("progress_" + a.M)) &&
      "0" !== b &&
      ((a.$ = !0), a.setAttribute("selected", b));
    a.X = !0;
  }
  aa.Object.defineProperties(W.prototype, {
    eventHandler: {
      configurable: !0,
      enumerable: !0,
      get() {
        return this.i;
      },
    },
    steps: {
      configurable: !0,
      enumerable: !0,
      get() {
        return this.c;
      },
    },
  });
  aa.Object.defineProperties(W, {
    observedAttributes: {
      configurable: !0,
      enumerable: !0,
      get() {
        return "title codelab-title environment category feedback-link selected last-updated no-toolbar no-arrows anayltics-ready".split(
          " "
        );
      },
    },
  });
  try {
    window.customElements.define("google-codelab", W);
  } catch (a) {
    console.warn("googlecodelabs.Codelab", a);
  }
}.call(this));
