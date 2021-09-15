(window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [4],
  {
    "+fUG": function (e, t, r) {
      var n = r("5pfJ"),
        o = "__lodash_hash_undefined__",
        i = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        var t = this.__data__;
        if (n) {
          var r = t[e];
          return r === o ? void 0 : r;
        }
        return i.call(t, e) ? t[e] : void 0;
      };
    },
    "+ooz": function (e, t, r) {
      var n = r("8Zrg"),
        o = r("kwr2"),
        i = r("5VYK"),
        a = r("Coc+"),
        c = r("LzM7");
      function s(e) {
        var t = -1,
          r = null == e ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      (s.prototype.clear = n),
        (s.prototype.delete = o),
        (s.prototype.get = i),
        (s.prototype.has = a),
        (s.prototype.set = c),
        (e.exports = s);
    },
    "+wNj": function (e, t, r) {
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
      r.d(t, "a", function () {
        return n;
      });
    },
    "/30y": function (e, t, r) {
      var n = r("Dhk8"),
        o = r("tLQN"),
        i = "[object Arguments]";
      e.exports = function (e) {
        return o(e) && n(e) == i;
      };
    },
    "0+aC": function (e, t, r) {
      var n = r("pFSi"),
        o = 500;
      e.exports = function (e) {
        var t = n(e, function (e) {
            return r.size === o && r.clear(), e;
          }),
          r = t.cache;
        return t;
      };
    },
    "00EI": function (e, t) {
      var r = "https://res.cloudinary.com/dyd911kmh/image/fetch/",
        n = {
          cheatSheet: "".concat(r, "t_cs_thumbnail/"),
          tutorial: "".concat(r, "t_all_tutorial_thumbnail/"),
          avatar: r + "t_avatar_thumbnail/",
          avatar120: r + "t_avatar_120_thumbnail/",
        },
        o =
          "https://s3.amazonaws.com/datacamp-community-prod/social-share-news.jpg",
        i =
          "https://s3.amazonaws.com/datacamp-community-prod/social-share-tutorials.jpg",
        a =
          "https://s3.amazonaws.com/datacamp-community-prod/social-share-open-courses.jpg",
        c =
          "https://s3.amazonaws.com/datacamp-community-prod/social-share-podcast.jpg",
        s =
          "https://s3.amazonaws.com/datacamp-community-prod/social-share-official-blog.jpg",
        u =
          "https://s3.amazonaws.com/datacamp-community-prod/social-share-tech-thoughts.jpg",
        f = {
          placeholder:
            "https://cdn.datacamp.com/community/logos/medium/placeholder.jpg",
          "News Page": o,
          "News Index": o,
          "Tutorial Page": i,
          "Tutorials Index": i,
          "Cheat Sheets Index":
            "https://s3.amazonaws.com/datacamp-community-prod/social-share-cheat-sheets.jpg",
          "Course Page": a,
          "Course Index Page": a,
          "Podcast Page": c,
          "Podcast Index": c,
          "Blog Page": s,
          "Blogs Index": s,
          "Tech Thought Page": u,
          "Tech Thoughts Index": u,
        };
      e.exports = {
        LOCAL_PART_PREFIX: "/community",
        DATACAMP_URL: "https://www.datacamp.com",
        DATACAMP_SIGN_IN_URL: "https://www.datacamp.com/users/sign_in",
        DATACAMP_CONTENT_POLICY:
          "https://docs.google.com/document/d/14pET72l9yNPGvPvWksuAalnoMRAHewEQ4cT6AqzJ5G0/edit#",
        CLOUDINARY_PREFIX: n,
        POST_LIMIT: {
          NewsItem: 20,
          Tutorial: 15,
          CheatSheet: 5,
          OpenCourse: 8,
          Episode: 10,
          Blog: 8,
          Tech: 8,
          Tags: 1e4,
          Notification: 30,
        },
        PAGINATOR_PAGE_LIMIT: 7,
        NEWS_LINK_UTM_PARAMS:
          "utm_campaign=News&utm_medium=Community&utm_source=DataCamp.com",
        SENTRY_KEY: "https://c0fd3ff0b3a84964ad431e9b3909b3ac@sentry.io/226607",
        SENTRY_CONFIG: { autoBreadcrumbs: !0, captureUnhandledRejections: !0 },
        socialShareImages: f,
        CHROME_EXTENSION_URL:
          "https://chrome.google.com/webstore/detail/lbbhbkehmgbndgfdbncbmikooblghdbi",
      };
    },
    "1Fob": function (e, t, r) {
      "use strict";
      var n = new RegExp("%[a-f0-9]{2}", "gi"),
        o = new RegExp("(%[a-f0-9]{2})+", "gi");
      function i(e, t) {
        try {
          return decodeURIComponent(e.join(""));
        } catch (o) {}
        if (1 === e.length) return e;
        t = t || 1;
        var r = e.slice(0, t),
          n = e.slice(t);
        return Array.prototype.concat.call([], i(r), i(n));
      }
      function a(e) {
        try {
          return decodeURIComponent(e);
        } catch (o) {
          for (var t = e.match(n), r = 1; r < t.length; r++)
            t = (e = i(t, r).join("")).match(n);
          return e;
        }
      }
      e.exports = function (e) {
        if ("string" !== typeof e)
          throw new TypeError(
            "Expected `encodedURI` to be of type `string`, got `" +
              typeof e +
              "`"
          );
        try {
          return (e = e.replace(/\+/g, " ")), decodeURIComponent(e);
        } catch (t) {
          return (function (e) {
            for (
              var r = { "%FE%FF": "\ufffd\ufffd", "%FF%FE": "\ufffd\ufffd" },
                n = o.exec(e);
              n;

            ) {
              try {
                r[n[0]] = decodeURIComponent(n[0]);
              } catch (t) {
                var i = a(n[0]);
                i !== n[0] && (r[n[0]] = i);
              }
              n = o.exec(e);
            }
            r["%C2"] = "\ufffd";
            for (var c = Object.keys(r), s = 0; s < c.length; s++) {
              var u = c[s];
              e = e.replace(new RegExp(u, "g"), r[u]);
            }
            return e;
          })(e);
        }
      };
    },
    "2Fbm": function (e, t, r) {
      var n = r("5pfJ");
      e.exports = function () {
        (this.__data__ = n ? n(null) : {}), (this.size = 0);
      };
    },
    "2Lg3": function (e, t) {
      e.exports = function (e) {
        return null == e;
      };
    },
    "2ZvR": function (e, t) {
      e.exports = function (e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
      };
    },
    "2q8g": function (e, t, r) {
      var n = r("Dhk8"),
        o = r("tQYX"),
        i = "[object AsyncFunction]",
        a = "[object Function]",
        c = "[object GeneratorFunction]",
        s = "[object Proxy]";
      e.exports = function (e) {
        if (!o(e)) return !1;
        var t = n(e);
        return t == a || t == c || t == i || t == s;
      };
    },
    "3KBa": function (e, t, r) {
      var n = r("IBsm")["__core-js_shared__"];
      e.exports = n;
    },
    "3ajY": function (e, t, r) {
      (function (e) {
        var n = r("IBsm"),
          o = r("DjCF"),
          i = t && !t.nodeType && t,
          a = i && "object" == typeof e && e && !e.nodeType && e,
          c = a && a.exports === i ? n.Buffer : void 0,
          s = (c ? c.isBuffer : void 0) || o;
        e.exports = s;
      }.call(this, r("aYSr")(e)));
    },
    "4+Vk": function (e, t, r) {
      var n = r("vxC8")(r("IBsm"), "WeakMap");
      e.exports = n;
    },
    "4/ik": function (e, t, r) {
      var n = r("+ooz"),
        o = r("qeCs"),
        i = r("hyzI"),
        a = 200;
      e.exports = function (e, t) {
        var r = this.__data__;
        if (r instanceof n) {
          var c = r.__data__;
          if (!o || c.length < a - 1)
            return c.push([e, t]), (this.size = ++r.size), this;
          r = this.__data__ = new i(c);
        }
        return r.set(e, t), (this.size = r.size), this;
      };
    },
    "4p/L": function (e, t) {
      e.exports = function (e, t) {
        return null == e ? void 0 : e[t];
      };
    },
    "4uJK": function (e, t, r) {
      var n = r("CbIe"),
        o = r("OtNC"),
        i = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        if (!n(e)) return o(e);
        var t = [];
        for (var r in Object(e))
          i.call(e, r) && "constructor" != r && t.push(r);
        return t;
      };
    },
    "4wDe": function (e, t, r) {
      "use strict";
      function n(e) {
        return (n =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      r.d(t, "a", function () {
        return n;
      });
    },
    "5VYK": function (e, t, r) {
      var n = r("6QIk");
      e.exports = function (e) {
        var t = this.__data__,
          r = n(t, e);
        return r < 0 ? void 0 : t[r][1];
      };
    },
    "5nKN": function (e, t, r) {
      var n = r("2q8g"),
        o = r("9vbJ"),
        i = r("tQYX"),
        a = r("c18h"),
        c = /^\[object .+?Constructor\]$/,
        s = Function.prototype,
        u = Object.prototype,
        f = s.toString,
        p = u.hasOwnProperty,
        l = RegExp(
          "^" +
            f
              .call(p)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );
      e.exports = function (e) {
        return !(!i(e) || o(e)) && (n(e) ? l : c).test(a(e));
      };
    },
    "5pfJ": function (e, t, r) {
      var n = r("vxC8")(Object, "create");
      e.exports = n;
    },
    "6OdC": function (e, t, r) {
      var n = r("NYSw");
      e.exports = function (e, t, r) {
        var o = (r = "function" == typeof r ? r : void 0) ? r(e, t) : void 0;
        return void 0 === o ? n(e, t, void 0, r) : !!o;
      };
    },
    "6QIk": function (e, t, r) {
      var n = r("pPzx");
      e.exports = function (e, t) {
        for (var r = e.length; r--; ) if (n(e[r][0], t)) return r;
        return -1;
      };
    },
    "6UKJ": function (e, t) {
      e.exports = function (e) {
        var t = typeof e;
        return "string" == t || "number" == t || "symbol" == t || "boolean" == t
          ? "__proto__" !== e
          : null === e;
      };
    },
    "7/jS": function (e, t, r) {
      var n = r("Dhk8"),
        o = r("t0L4"),
        i = r("tLQN"),
        a = {};
      (a["[object Float32Array]"] =
        a["[object Float64Array]"] =
        a["[object Int8Array]"] =
        a["[object Int16Array]"] =
        a["[object Int32Array]"] =
        a["[object Uint8Array]"] =
        a["[object Uint8ClampedArray]"] =
        a["[object Uint16Array]"] =
        a["[object Uint32Array]"] =
          !0),
        (a["[object Arguments]"] =
          a["[object Array]"] =
          a["[object ArrayBuffer]"] =
          a["[object Boolean]"] =
          a["[object DataView]"] =
          a["[object Date]"] =
          a["[object Error]"] =
          a["[object Function]"] =
          a["[object Map]"] =
          a["[object Number]"] =
          a["[object Object]"] =
          a["[object RegExp]"] =
          a["[object Set]"] =
          a["[object String]"] =
          a["[object WeakMap]"] =
            !1),
        (e.exports = function (e) {
          return i(e) && o(e.length) && !!a[n(e)];
        });
    },
    "70Le": function (e, t, r) {
      var n = r("W0vE"),
        o = r("X4R2"),
        i = Object.prototype.propertyIsEnumerable,
        a = Object.getOwnPropertySymbols,
        c = a
          ? function (e) {
              return null == e
                ? []
                : ((e = Object(e)),
                  n(a(e), function (t) {
                    return i.call(e, t);
                  }));
            }
          : o;
      e.exports = c;
    },
    "8K1b": function (e, t, r) {
      "use strict";
      function n(e, t) {
        return (n =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function o(e, t) {
        if ("function" !== typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && n(e, t);
      }
      r.d(t, "a", function () {
        return o;
      });
    },
    "8Zrg": function (e, t) {
      e.exports = function () {
        (this.__data__ = []), (this.size = 0);
      };
    },
    "97Jx": function (e, t) {
      function r() {
        return (
          (e.exports = r =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
          r.apply(this, arguments)
        );
      }
      e.exports = r;
    },
    "9OUN": function (e, t, r) {
      "use strict";
      r.d(t, "a", function () {
        return _;
      }),
        r.d(t, "b", function () {
          return p;
        }),
        r.d(t, "c", function () {
          return u;
        }),
        r.d(t, "d", function () {
          return c;
        });
      var n = r("hE+J"),
        o = function () {
          return Math.random().toString(36).substring(7).split("").join(".");
        },
        i = {
          INIT: "@@redux/INIT" + o(),
          REPLACE: "@@redux/REPLACE" + o(),
          PROBE_UNKNOWN_ACTION: function () {
            return "@@redux/PROBE_UNKNOWN_ACTION" + o();
          },
        };
      function a(e) {
        if ("object" !== typeof e || null === e) return !1;
        for (var t = e; null !== Object.getPrototypeOf(t); )
          t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t;
      }
      function c(e, t, r) {
        var o;
        if (
          ("function" === typeof t && "function" === typeof r) ||
          ("function" === typeof r && "function" === typeof arguments[3])
        )
          throw new Error(
            "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function."
          );
        if (
          ("function" === typeof t &&
            "undefined" === typeof r &&
            ((r = t), (t = void 0)),
          "undefined" !== typeof r)
        ) {
          if ("function" !== typeof r)
            throw new Error("Expected the enhancer to be a function.");
          return r(c)(e, t);
        }
        if ("function" !== typeof e)
          throw new Error("Expected the reducer to be a function.");
        var s = e,
          u = t,
          f = [],
          p = f,
          l = !1;
        function d() {
          p === f && (p = f.slice());
        }
        function E() {
          if (l)
            throw new Error(
              "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store."
            );
          return u;
        }
        function O(e) {
          if ("function" !== typeof e)
            throw new Error("Expected the listener to be a function.");
          if (l)
            throw new Error(
              "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details."
            );
          var t = !0;
          return (
            d(),
            p.push(e),
            function () {
              if (t) {
                if (l)
                  throw new Error(
                    "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details."
                  );
                (t = !1), d();
                var r = p.indexOf(e);
                p.splice(r, 1), (f = null);
              }
            }
          );
        }
        function _(e) {
          if (!a(e))
            throw new Error(
              "Actions must be plain objects. Use custom middleware for async actions."
            );
          if ("undefined" === typeof e.type)
            throw new Error(
              'Actions may not have an undefined "type" property. Have you misspelled a constant?'
            );
          if (l) throw new Error("Reducers may not dispatch actions.");
          try {
            (l = !0), (u = s(u, e));
          } finally {
            l = !1;
          }
          for (var t = (f = p), r = 0; r < t.length; r++) {
            (0, t[r])();
          }
          return e;
        }
        return (
          _({ type: i.INIT }),
          ((o = {
            dispatch: _,
            subscribe: O,
            getState: E,
            replaceReducer: function (e) {
              if ("function" !== typeof e)
                throw new Error("Expected the nextReducer to be a function.");
              (s = e), _({ type: i.REPLACE });
            },
          })[n.a] = function () {
            var e,
              t = O;
            return (
              ((e = {
                subscribe: function (e) {
                  if ("object" !== typeof e || null === e)
                    throw new TypeError(
                      "Expected the observer to be an object."
                    );
                  function r() {
                    e.next && e.next(E());
                  }
                  return r(), { unsubscribe: t(r) };
                },
              })[n.a] = function () {
                return this;
              }),
              e
            );
          }),
          o
        );
      }
      function s(e, t) {
        var r = t && t.type;
        return (
          "Given " +
          ((r && 'action "' + String(r) + '"') || "an action") +
          ', reducer "' +
          e +
          '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
        );
      }
      function u(e) {
        for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
          var o = t[n];
          0, "function" === typeof e[o] && (r[o] = e[o]);
        }
        var a,
          c = Object.keys(r);
        try {
          !(function (e) {
            Object.keys(e).forEach(function (t) {
              var r = e[t];
              if ("undefined" === typeof r(void 0, { type: i.INIT }))
                throw new Error(
                  'Reducer "' +
                    t +
                    "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."
                );
              if (
                "undefined" ===
                typeof r(void 0, { type: i.PROBE_UNKNOWN_ACTION() })
              )
                throw new Error(
                  'Reducer "' +
                    t +
                    "\" returned undefined when probed with a random type. Don't try to handle " +
                    i.INIT +
                    ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.'
                );
            });
          })(r);
        } catch (u) {
          a = u;
        }
        return function (e, t) {
          if ((void 0 === e && (e = {}), a)) throw a;
          for (var n = !1, o = {}, i = 0; i < c.length; i++) {
            var u = c[i],
              f = r[u],
              p = e[u],
              l = f(p, t);
            if ("undefined" === typeof l) {
              var d = s(u, t);
              throw new Error(d);
            }
            (o[u] = l), (n = n || l !== p);
          }
          return (n = n || c.length !== Object.keys(e).length) ? o : e;
        };
      }
      function f(e, t) {
        return function () {
          return t(e.apply(this, arguments));
        };
      }
      function p(e, t) {
        if ("function" === typeof e) return f(e, t);
        if ("object" !== typeof e || null === e)
          throw new Error(
            "bindActionCreators expected an object or a function, instead received " +
              (null === e ? "null" : typeof e) +
              '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
          );
        var r = {};
        for (var n in e) {
          var o = e[n];
          "function" === typeof o && (r[n] = f(o, t));
        }
        return r;
      }
      function l(e, t, r) {
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
      function d(e, t) {
        var r = Object.keys(e);
        return (
          Object.getOwnPropertySymbols &&
            r.push.apply(r, Object.getOwnPropertySymbols(e)),
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
          r
        );
      }
      function E(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? d(r, !0).forEach(function (t) {
                l(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : d(r).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function O() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return 0 === t.length
          ? function (e) {
              return e;
            }
          : 1 === t.length
          ? t[0]
          : t.reduce(function (e, t) {
              return function () {
                return e(t.apply(void 0, arguments));
              };
            });
      }
      function _() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return function (e) {
          return function () {
            var r = e.apply(void 0, arguments),
              n = function () {
                throw new Error(
                  "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch."
                );
              },
              o = {
                getState: r.getState,
                dispatch: function () {
                  return n.apply(void 0, arguments);
                },
              },
              i = t.map(function (e) {
                return e(o);
              });
            return E({}, r, { dispatch: (n = O.apply(void 0, i)(r.dispatch)) });
          };
        };
      }
    },
    "9SKQ": function (e, t, r) {
      var n = r("JNqh");
      e.exports = function (e) {
        return n(this, e).has(e);
      };
    },
    "9fIP": function (e, t, r) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      r.d(t, "a", function () {
        return n;
      });
    },
    "9vbJ": function (e, t, r) {
      var n = r("3KBa"),
        o = (function () {
          var e = /[^.]+$/.exec((n && n.keys && n.keys.IE_PROTO) || "");
          return e ? "Symbol(src)_1." + e : "";
        })();
      e.exports = function (e) {
        return !!o && o in e;
      };
    },
    "9y2L": function (e, t, r) {
      var n = r("2q8g"),
        o = r("t0L4");
      e.exports = function (e) {
        return null != e && o(e.length) && !n(e);
      };
    },
    BSqe: function (e, t) {
      e.exports = function (e) {
        return this.__data__.get(e);
      };
    },
    BlJA: function (e, t, r) {
      var n = r("rmhs"),
        o = r("4uJK"),
        i = r("9y2L");
      e.exports = function (e) {
        return i(e) ? n(e) : o(e);
      };
    },
    BqUW: function (e, t, r) {
      var n = r("HsnV"),
        o = r("ZZ+W"),
        i = r("R3gn"),
        a = r("yZHP"),
        c = r("kkM+"),
        s = r("wxYD"),
        u = r("3ajY"),
        f = r("Qd2C"),
        p = 1,
        l = "[object Arguments]",
        d = "[object Array]",
        E = "[object Object]",
        O = Object.prototype.hasOwnProperty;
      e.exports = function (e, t, r, _, S, v) {
        var h = s(e),
          y = s(t),
          T = h ? d : c(e),
          g = y ? d : c(t),
          b = (T = T == l ? E : T) == E,
          m = (g = g == l ? E : g) == E,
          C = T == g;
        if (C && u(e)) {
          if (!u(t)) return !1;
          (h = !0), (b = !1);
        }
        if (C && !b)
          return (
            v || (v = new n()),
            h || f(e) ? o(e, t, r, _, S, v) : i(e, t, T, r, _, S, v)
          );
        if (!(r & p)) {
          var A = b && O.call(e, "__wrapped__"),
            R = m && O.call(t, "__wrapped__");
          if (A || R) {
            var j = A ? e.value() : e,
              I = R ? t.value() : t;
            return v || (v = new n()), S(j, I, r, _, v);
          }
        }
        return !!C && (v || (v = new n()), a(e, t, r, _, S, v));
      };
    },
    CbIe: function (e, t) {
      var r = Object.prototype;
      e.exports = function (e) {
        var t = e && e.constructor;
        return e === (("function" == typeof t && t.prototype) || r);
      };
    },
    "Coc+": function (e, t, r) {
      var n = r("6QIk");
      e.exports = function (e) {
        return n(this.__data__, e) > -1;
      };
    },
    Dhk8: function (e, t, r) {
      var n = r("Syyo"),
        o = r("KCLV"),
        i = r("kHoZ"),
        a = "[object Null]",
        c = "[object Undefined]",
        s = n ? n.toStringTag : void 0;
      e.exports = function (e) {
        return null == e
          ? void 0 === e
            ? c
            : a
          : s && s in Object(e)
          ? o(e)
          : i(e);
      };
    },
    DjCF: function (e, t) {
      e.exports = function () {
        return !1;
      };
    },
    E4ao: function (e, t) {
      e.exports = function (e) {
        var t = this.__data__,
          r = t.delete(e);
        return (this.size = t.size), r;
      };
    },
    F63i: function (e, t) {
      var r,
        n,
        o = (e.exports = {});
      function i() {
        throw new Error("setTimeout has not been defined");
      }
      function a() {
        throw new Error("clearTimeout has not been defined");
      }
      function c(e) {
        if (r === setTimeout) return setTimeout(e, 0);
        if ((r === i || !r) && setTimeout)
          return (r = setTimeout), setTimeout(e, 0);
        try {
          return r(e, 0);
        } catch (t) {
          try {
            return r.call(null, e, 0);
          } catch (t) {
            return r.call(this, e, 0);
          }
        }
      }
      !(function () {
        try {
          r = "function" === typeof setTimeout ? setTimeout : i;
        } catch (e) {
          r = i;
        }
        try {
          n = "function" === typeof clearTimeout ? clearTimeout : a;
        } catch (e) {
          n = a;
        }
      })();
      var s,
        u = [],
        f = !1,
        p = -1;
      function l() {
        f &&
          s &&
          ((f = !1), s.length ? (u = s.concat(u)) : (p = -1), u.length && d());
      }
      function d() {
        if (!f) {
          var e = c(l);
          f = !0;
          for (var t = u.length; t; ) {
            for (s = u, u = []; ++p < t; ) s && s[p].run();
            (p = -1), (t = u.length);
          }
          (s = null),
            (f = !1),
            (function (e) {
              if (n === clearTimeout) return clearTimeout(e);
              if ((n === a || !n) && clearTimeout)
                return (n = clearTimeout), clearTimeout(e);
              try {
                n(e);
              } catch (t) {
                try {
                  return n.call(null, e);
                } catch (t) {
                  return n.call(this, e);
                }
              }
            })(e);
        }
      }
      function E(e, t) {
        (this.fun = e), (this.array = t);
      }
      function O() {}
      (o.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        u.push(new E(e, t)), 1 !== u.length || f || c(d);
      }),
        (E.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (o.title = "browser"),
        (o.browser = !0),
        (o.env = {}),
        (o.argv = []),
        (o.version = ""),
        (o.versions = {}),
        (o.on = O),
        (o.addListener = O),
        (o.once = O),
        (o.off = O),
        (o.removeListener = O),
        (o.removeAllListeners = O),
        (o.emit = O),
        (o.prependListener = O),
        (o.prependOnceListener = O),
        (o.listeners = function (e) {
          return [];
        }),
        (o.binding = function (e) {
          throw new Error("process.binding is not supported");
        }),
        (o.cwd = function () {
          return "/";
        }),
        (o.chdir = function (e) {
          throw new Error("process.chdir is not supported");
        }),
        (o.umask = function () {
          return 0;
        });
    },
    H87J: function (e, t) {
      e.exports = function (e, t) {
        for (var r = -1, n = null == e ? 0 : e.length, o = Array(n); ++r < n; )
          o[r] = t(e[r], r, e);
        return o;
      };
    },
    HbGN: function (e, t, r) {
      "use strict";
      r.d(t, "a", function () {
        return o;
      });
      var n = r("+wNj");
      function o(e, t) {
        if (null == e) return {};
        var r,
          o,
          i = Object(n.a)(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (o = 0; o < a.length; o++)
            (r = a[o]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) &&
                  (i[r] = e[r]));
        }
        return i;
      }
    },
    HsnV: function (e, t, r) {
      var n = r("+ooz"),
        o = r("RNlM"),
        i = r("E4ao"),
        a = r("BSqe"),
        c = r("L6um"),
        s = r("4/ik");
      function u(e) {
        var t = (this.__data__ = new n(e));
        this.size = t.size;
      }
      (u.prototype.clear = o),
        (u.prototype.delete = i),
        (u.prototype.get = a),
        (u.prototype.has = c),
        (u.prototype.set = s),
        (e.exports = u);
    },
    I0vN: function (e, t, r) {
      "use strict";
      (t.Headers = self.Headers),
        (t.Request = self.Request),
        (t.Response = self.Response),
        (t.fetch = self.fetch);
    },
    IBsm: function (e, t, r) {
      var n = r("e93E"),
        o = "object" == typeof self && self && self.Object === Object && self,
        i = n || o || Function("return this")();
      e.exports = i;
    },
    IS0S: function (e, t, r) {
      var n = r("vxC8")(r("IBsm"), "Promise");
      e.exports = n;
    },
    Ij73: function (e, t, r) {
      "use strict";
      var n = r("9OUN"),
        o = r("yT0s"),
        i = r("zjfJ");
      function a(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function c(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : a(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var s = {
        isFetching: !1,
        isFetched: !1,
        statusMessage: "",
        content: {},
        form: {
          isSaving: !1,
          isSucceeded: !1,
          statusMessage: "",
          isAdminFormModalOpen: !1,
          previewSlug: "",
        },
        delete: {
          isDeleting: !1,
          isSucceeded: !1,
          statusMessage: "",
          isDeleteAdminContentModalOpen: !1,
        },
        update: {
          isApprovingArticle: !1,
          isSucceeded: !1,
          statusMessage: "",
          isApproveArticleModalOpen: !1,
        },
      };
      var u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.FETCH_ADMIN_CONTENT_REQUEST:
            return c(
              c({}, e),
              {},
              {
                isFetching: !0,
                isFetched: !1,
                statusMessage: s.statusMessage,
                content: s.content,
                form: s.form,
                delete: s.delete,
              }
            );
          case o.a.FETCH_ADMIN_CONTENT_SUCCESS:
            return c(
              c({}, e),
              {},
              { isFetching: !1, isFetched: !0, content: t.content }
            );
          case o.a.FETCH_ADMIN_CONTENT_FAILURE:
            return c(
              c({}, e),
              {},
              { isFetching: !1, isFetched: !1, statusMessage: t.error }
            );
          case o.a.UPDATE_ADMIN_CONTENT_REQUEST:
            return c(
              c({}, e),
              {},
              {
                form: {
                  isSaving: !0,
                  isSucceeded: !1,
                  statusMessage: s.form.statusMessage,
                  isAdminFormModalOpen: s.form.isAdminFormModalOpen,
                  previewSlug: s.form.previewSlug,
                },
              }
            );
          case o.a.UPDATE_ADMIN_CONTENT_SUCCESS:
            return c(
              c({}, e),
              {},
              {
                form: c(
                  c({}, e.form),
                  {},
                  { isSaving: !1, isSucceeded: !0, previewSlug: t.previewSlug }
                ),
              }
            );
          case o.a.UPDATE_ADMIN_CONTENT_FAILURE:
            return c(
              c({}, e),
              {},
              {
                form: c(
                  c({}, e.form),
                  {},
                  {
                    isSaving: !1,
                    isSucceeded: !1,
                    statusMessage: t.error,
                    statusDetails: t.details,
                  }
                ),
              }
            );
          case o.a.TOGGLE_ADMIN_FORM_MODAL:
            return c(
              c({}, e),
              {},
              {
                form: c(
                  c({}, e.form),
                  {},
                  { isAdminFormModalOpen: !e.form.isAdminFormModalOpen }
                ),
              }
            );
          case o.a.APPROVE_ARTICLE_REQUEST:
            return c(
              c({}, e),
              {},
              {
                update: {
                  isApprovingArticle: !0,
                  isSucceeded: !1,
                  statusMessage: s.update.statusMessage,
                  isApproveArticleModalOpen: s.update.isApproveArticleModalOpen,
                },
              }
            );
          case o.a.APPROVE_ARTICLE_SUCCESS:
            return c(
              c({}, e),
              {},
              {
                update: c(
                  c({}, e.update),
                  {},
                  { isApprovingArticle: !1, isSucceeded: !0 }
                ),
              }
            );
          case o.a.APPROVE_ARTICLE_FAILURE:
            return c(
              c({}, e),
              {},
              {
                update: c(
                  c({}, e.update),
                  {},
                  {
                    isApprovingArticle: !1,
                    isSucceeded: !1,
                    statusMessage: t.error,
                    statusDetails: t.details,
                  }
                ),
              }
            );
          case o.a.TOGGLE_APPROVE_ARTICLE_MODAL:
            return c(
              c({}, e),
              {},
              {
                update: c(
                  c({}, e.update),
                  {},
                  {
                    isApproveArticleModalOpen:
                      !e.update.isApproveArticleModalOpen,
                  }
                ),
              }
            );
          case o.a.DELETE_ADMIN_CONTENT_REQUEST:
            return c(
              c({}, e),
              {},
              {
                delete: {
                  isDeleting: !0,
                  isSucceeded: !1,
                  statusMessage: s.delete.statusMessage,
                  isDeleteAdminContentModalOpen:
                    s.delete.isDeleteAdminContentModalOpen,
                },
              }
            );
          case o.a.DELETE_ADMIN_CONTENT_SUCCESS:
            return c(
              c({}, e),
              {},
              {
                delete: c(
                  c({}, e.delete),
                  {},
                  { isDeleting: !1, isSucceeded: !0 }
                ),
              }
            );
          case o.a.DELETE_ADMIN_CONTENT_FAILURE:
            return c(
              c({}, e),
              {},
              {
                delete: c(
                  c({}, e.delete),
                  {},
                  { isDeleting: !1, isSucceeded: !1, statusMessage: t.error }
                ),
              }
            );
          case o.a.TOGGLE_DELETE_ADMIN_CONTENT_MODAL:
            return c(
              c({}, e),
              {},
              {
                delete: c(
                  c({}, e.delete),
                  {},
                  {
                    statusMessage: s.delete.statusMessage,
                    isDeleteAdminContentModalOpen:
                      !e.delete.isDeleteAdminContentModalOpen,
                  }
                ),
              }
            );
          default:
            return e;
        }
      };
      function f(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function p(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? f(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : f(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var l = { isFetched: !1, isFetching: !1, statusMessage: "" };
      var d = function () {
        var e,
          t,
          r =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l,
          n = arguments.length > 1 ? arguments[1] : void 0;
        switch (n.type) {
          case o.a.FETCH_ADMIN_LIST_REQUEST:
            return p(
              p({}, r),
              {},
              ((e = {
                isFetched: !1,
                isFetching: !0,
                statusMessage: l.statusMessage,
              }),
              Object(i.a)(e, n.modelName, []),
              Object(i.a)(e, "".concat(n.modelName, "Total"), 0),
              e)
            );
          case o.a.FETCH_ADMIN_LIST_SUCCESS:
            return p(
              p({}, r),
              {},
              ((t = { isFetched: !0, isFetching: !1 }),
              Object(i.a)(t, n.modelName, n.listAndTotal.list),
              Object(i.a)(
                t,
                "".concat(n.modelName, "Total"),
                n.listAndTotal.total
              ),
              t)
            );
          case o.a.FETCH_ADMIN_LIST_FAILURE:
            return p(
              p({}, r),
              {},
              { isFetched: !1, isFetching: !1, statusMessage: n.error }
            );
          default:
            return r;
        }
      };
      function E(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function O(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? E(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : E(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var _ = {
        isAuthModalOpen: !1,
        isLogin: !1,
        isAuthorized: !1,
        isSubscriber: !1,
        user: {},
        loginTitle: "",
        signUpTitle: "",
      };
      var S = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.TOGGLE_AUTH_MODAL:
            return O(
              O({}, e),
              {},
              {
                isAuthModalOpen: !e.isAuthModalOpen,
                isLogin: t.isLogin,
                loginTitle: t.loginTitle,
                signUpTitle: t.signUpTitle,
              }
            );
          case o.a.SWITCH_AUTH_MODAL:
            return O(O({}, e), {}, { isLogin: !e.isLogin });
          case o.a.SET_USER:
            return O(
              O({}, e),
              {},
              {
                user: t.user,
                isAuthorized: Boolean(t.user && t.user.id),
                isSubscriber: Boolean(t.user && t.user.has_active_subscription),
              }
            );
          default:
            return e;
        }
      };
      function v(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function h(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? v(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : v(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var y = {
        isFetching: !1,
        isFetched: !1,
        statusMessage: "",
        comments: [],
        commentsTotal: 0,
        form: {
          isSaving: !1,
          isSucceeded: !1,
          statusMessage: "",
          id: "new",
          parentId: null,
          commentText: "",
        },
        delete: {
          isDeleting: !1,
          isSucceeded: !1,
          statusMessage: "",
          isDeleteCommentModalOpen: !1,
        },
        isBottomBarOpen: !1,
        bottomBarView: "bar",
      };
      var T = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y,
          t = arguments.length > 1 ? arguments[1] : void 0,
          r = -1 === ["bar", "editor"].indexOf(t.view) ? "bar" : t.view,
          n = "bar" === r;
        switch (t.type) {
          case o.a.FETCH_CONTENT_REQUEST:
            return h(
              h({}, e),
              {},
              { comments: y.comments, commentsTotal: y.commentsTotal }
            );
          case o.a.FETCH_COMMENTS_REQUEST:
            return h(
              h({}, e),
              {},
              { isFetching: !0, isFetched: !1, statusMessage: y.statusMessage }
            );
          case o.a.FETCH_COMMENTS_SUCCESS:
            return h(
              h({}, e),
              {},
              {
                isFetching: !1,
                isFetched: !0,
                comments: t.comments.roots,
                commentsTotal: t.comments.total,
              }
            );
          case o.a.FETCH_COMMENTS_FAILURE:
            return h(
              h({}, e),
              {},
              { isFetching: !1, isFetched: !1, statusMessage: t.error }
            );
          case o.a.UPDATE_COMMENT_REQUEST:
            return h(
              h({}, e),
              {},
              {
                form: h(
                  h({}, e.form),
                  {},
                  {
                    isSaving: !0,
                    isSucceeded: !1,
                    statusMessage: y.form.statusMessage,
                  }
                ),
              }
            );
          case o.a.UPDATE_COMMENT_SUCCESS:
            return h(
              h({}, e),
              {},
              { form: h(h({}, y.form), {}, { isSaving: !1, isSucceeded: !0 }) }
            );
          case o.a.UPDATE_COMMENT_FAILURE:
            return h(
              h({}, e),
              {},
              {
                form: h(
                  h({}, e.form),
                  {},
                  { isSaving: !1, isSucceeded: !1, statusMessage: t.error }
                ),
              }
            );
          case o.a.DELETE_COMMENT_REQUEST:
            return h(
              h({}, e),
              {},
              {
                delete: {
                  isDeleting: !0,
                  isSucceeded: !1,
                  statusMessage: y.delete.statusMessage,
                  isDeleteCommentModalOpen: y.delete.isDeleteCommentModalOpen,
                },
              }
            );
          case o.a.DELETE_COMMENT_SUCCESS:
            return h(
              h({}, e),
              {},
              {
                delete: h(
                  h({}, e.delete),
                  {},
                  { isDeleting: !1, isSucceeded: !0 }
                ),
              }
            );
          case o.a.DELETE_COMMENT_FAILURE:
            return h(
              h({}, e),
              {},
              {
                delete: h(
                  h({}, e.delete),
                  {},
                  { isDeleting: !1, isSucceeded: !1, statusMessage: t.error }
                ),
              }
            );
          case o.a.TOGGLE_DELETE_COMMENT_MODAL:
            return h(
              h({}, e),
              {},
              {
                delete: h(
                  h({}, e.delete),
                  {},
                  {
                    statusMessage: y.delete.statusMessage,
                    isDeleteCommentModalOpen:
                      !e.delete.isDeleteCommentModalOpen,
                  }
                ),
              }
            );
          case o.a.SHOW_BOTTOM_BAR:
            return h(h({}, e), {}, { isBottomBarOpen: !0 });
          case o.a.HIDE_BOTTOM_BAR:
            return h(h({}, e), {}, { isBottomBarOpen: !1 });
          case o.a.SWITCH_BOTTOM_BAR_VIEW:
            return h(
              h({}, e),
              {},
              {
                bottomBarView: r,
                form: h(
                  h({}, e.form),
                  {},
                  {
                    id: n ? y.form.id : t.id,
                    parentId: n ? y.form.parentId : t.parentId,
                    commentText: n ? y.form.commentText : t.commentText,
                    statusMessage:
                      n || t.id === y.form.id
                        ? y.form.statusMessage
                        : e.form.statusMessage,
                  }
                ),
              }
            );
          default:
            return e;
        }
      };
      function g(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function b(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? g(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : g(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var m = {
        content: { tags: [], author: {} },
        isFetched: !1,
        isFetching: !1,
        statusMessage: "",
      };
      var C = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : m,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case o.a.FETCH_CONTENT_REQUEST:
              return b(
                b({}, e),
                {},
                {
                  isFetched: !1,
                  isFetching: !0,
                  statusMessage: m.statusMessage,
                  content: m.content,
                }
              );
            case o.a.FETCH_CONTENT_SUCCESS:
              return b(
                b({}, e),
                {},
                { isFetched: !0, isFetching: !1, content: t.content }
              );
            case o.a.FETCH_CONTENT_FAILURE:
              return b(
                b({}, e),
                {},
                { isFetched: !1, isFetching: !1, statusMessage: t.error }
              );
            default:
              return e;
          }
        },
        A = r("LdEA"),
        R = r.n(A),
        j = r("2q8g"),
        I = r.n(j),
        N = r("kCXf"),
        w = r("ND9x"),
        M = r.n(w);
      var U = function (e) {
          var t = function (e) {
              return function (t, r) {
                return void 0 !== e.getIn(t, r);
              };
            },
            r = e.deepEqual,
            n = e.empty,
            o = e.getIn,
            i = e.deleteIn,
            a = e.setIn;
          return function (c) {
            void 0 === c && (c = t);
            return function t(s, u) {
              if ("]" === u[u.length - 1]) {
                var f = M()(u);
                return f.pop(), o(s, f.join(".")) ? a(s, u) : s;
              }
              var p = s;
              c(e)(s, u) && (p = i(s, u));
              var l = u.lastIndexOf(".");
              if (l > 0) {
                var d = u.substring(0, l);
                if ("]" !== d[d.length - 1]) {
                  var E = o(p, d);
                  if (r(E, n)) return t(p, d);
                }
              }
              return p;
            };
          };
        },
        P = r("rieb"),
        F = function (e) {
          var t = e.getIn;
          return function (e, r) {
            var n = null;
            /^values/.test(r) && (n = r.replace("values", "initial"));
            var o = !n || void 0 === t(e, n);
            return void 0 !== t(e, r) && o;
          };
        },
        D = function (e) {
          return (
            e &&
            e.type &&
            e.type.length > N.J.length &&
            e.type.substring(0, N.J.length) === N.J
          );
        };
      var L = (function (e) {
        var t,
          r = e.deepEqual,
          n = e.empty,
          o = e.forEach,
          i = e.getIn,
          a = e.setIn,
          c = e.deleteIn,
          s = e.fromJS,
          u = e.keys,
          f = e.size,
          p = e.some,
          l = e.splice,
          d = U(e)(F),
          E = U(P.a)(F),
          O = function (e, t, r, n, o, c, s) {
            var u = i(e, t + "." + r);
            return u || s ? a(e, t + "." + r, l(u, n, o, c)) : e;
          },
          _ = function (e, t, r, n, o, c, s) {
            var u = i(e, t),
              f = P.a.getIn(u, r);
            return f || s
              ? a(e, t, P.a.setIn(u, r, P.a.splice(f, n, o, c)))
              : e;
          },
          S = ["values", "fields", "submitErrors", "asyncErrors"],
          v = function (e, t, r, o, i) {
            var a = e,
              c = null != i ? n : void 0;
            return (
              (a = O(a, "values", t, r, o, i, !0)),
              (a = O(a, "fields", t, r, o, c)),
              (a = _(a, "syncErrors", t, r, o, void 0)),
              (a = _(a, "syncWarnings", t, r, o, void 0)),
              (a = O(a, "submitErrors", t, r, o, void 0)),
              (a = O(a, "asyncErrors", t, r, o, void 0))
            );
          },
          h =
            (((t = {})[N.a] = function (e, t) {
              var r = t.meta,
                n = r.field,
                o = r.index,
                i = t.payload;
              return v(e, n, o, 0, i);
            }),
            (t[N.b] = function (e, t) {
              var r = t.meta,
                n = r.field,
                o = r.from,
                c = r.to,
                s = i(e, "values." + n),
                u = s ? f(s) : 0,
                p = e;
              return (
                u &&
                  S.forEach(function (e) {
                    var t = e + "." + n;
                    if (i(p, t)) {
                      var r = i(p, t + "[" + o + "]");
                      (p = a(p, t, l(i(p, t), o, 1))),
                        (p = a(p, t, l(i(p, t), c, 0, r)));
                    }
                  }),
                p
              );
            }),
            (t[N.c] = function (e, t) {
              var r = t.meta.field,
                n = i(e, "values." + r),
                o = n ? f(n) : 0;
              return o ? v(e, r, o - 1, 1) : e;
            }),
            (t[N.d] = function (e, t) {
              var r = t.meta.field,
                n = t.payload,
                o = i(e, "values." + r),
                a = o ? f(o) : 0;
              return v(e, r, a, 0, n);
            }),
            (t[N.e] = function (e, t) {
              var r = t.meta,
                n = r.field,
                o = r.index;
              return v(e, n, o, 1);
            }),
            (t[N.f] = function (e, t) {
              var r = t.meta.field,
                n = i(e, "values." + r),
                o = n ? f(n) : 0;
              return o ? v(e, r, 0, o) : e;
            }),
            (t[N.g] = function (e, t) {
              var r = t.meta.field;
              return v(e, r, 0, 1);
            }),
            (t[N.h] = function (e, t) {
              var r = t.meta,
                n = r.field,
                o = r.index,
                i = r.removeNum,
                a = t.payload;
              return v(e, n, o, i, a);
            }),
            (t[N.i] = function (e, t) {
              var r = t.meta,
                n = r.field,
                o = r.indexA,
                c = r.indexB,
                s = e;
              return (
                S.forEach(function (e) {
                  var t = i(s, e + "." + n + "[" + o + "]"),
                    r = i(s, e + "." + n + "[" + c + "]");
                  (void 0 === t && void 0 === r) ||
                    ((s = a(s, e + "." + n + "[" + o + "]", r)),
                    (s = a(s, e + "." + n + "[" + c + "]", t)));
                }),
                s
              );
            }),
            (t[N.j] = function (e, t) {
              var r = t.meta.field,
                n = t.payload;
              return v(e, r, 0, 0, n);
            }),
            (t[N.k] = function (e, t) {
              var r = t.meta.field,
                n = t.payload,
                o = e;
              return (
                (o = d(o, "asyncErrors." + r)),
                (o = d(o, "submitErrors." + r)),
                (o = a(o, "fields." + r + ".autofilled", !0)),
                (o = a(o, "values." + r, n))
              );
            }),
            (t[N.l] = function (e, t) {
              var r = t.meta,
                n = r.field,
                o = r.touch,
                s = t.payload,
                u = e;
              return (
                void 0 === i(u, "initial." + n) && "" === s
                  ? (u = d(u, "values." + n))
                  : void 0 !== s && (u = a(u, "values." + n, s)),
                n === i(u, "active") && (u = c(u, "active")),
                (u = c(u, "fields." + n + ".active")),
                o &&
                  ((u = a(u, "fields." + n + ".touched", !0)),
                  (u = a(u, "anyTouched", !0))),
                u
              );
            }),
            (t[N.m] = function (e, t) {
              var r = t.meta,
                n = r.field,
                o = r.touch,
                c = r.persistentSubmitErrors,
                s = t.payload,
                u = e;
              if ((void 0 === i(u, "initial." + n) && "" === s) || void 0 === s)
                u = d(u, "values." + n);
              else if (I()(s)) {
                var f = i(e, "values." + n);
                u = a(u, "values." + n, s(f, e.values));
              } else u = a(u, "values." + n, s);
              return (
                (u = d(u, "asyncErrors." + n)),
                c || (u = d(u, "submitErrors." + n)),
                (u = d(u, "fields." + n + ".autofilled")),
                o &&
                  ((u = a(u, "fields." + n + ".touched", !0)),
                  (u = a(u, "anyTouched", !0))),
                u
              );
            }),
            (t[N.p] = function (e) {
              return c(e, "triggerSubmit");
            }),
            (t[N.q] = function (e) {
              var t = e;
              return (t = d(t, "submitErrors")), (t = c(t, "error"));
            }),
            (t[N.n] = function (e, t) {
              var r = t.meta.field;
              return c(e, "asyncErrors." + r);
            }),
            (t[N.o] = function (e, t) {
              var r = t.meta,
                n = r.keepTouched,
                o = r.persistentSubmitErrors,
                s = r.fields,
                f = e;
              s.forEach(function (t) {
                (f = d(f, "asyncErrors." + t)),
                  o || (f = d(f, "submitErrors." + t)),
                  (f = d(f, "fields." + t + ".autofilled")),
                  n || (f = c(f, "fields." + t + ".touched"));
                var r = i(e, "initial." + t);
                f = r ? a(f, "values." + t, r) : d(f, "values." + t);
              });
              var l = p(u(i(f, "registeredFields")), function (e) {
                return i(f, "fields." + e + ".touched");
              });
              return (f = l ? a(f, "anyTouched", !0) : c(f, "anyTouched"));
            }),
            (t[N.s] = function (e, t) {
              var r = t.meta.field,
                n = e,
                o = i(e, "active");
              return (
                (n = c(n, "fields." + o + ".active")),
                (n = a(n, "fields." + r + ".visited", !0)),
                (n = a(n, "fields." + r + ".active", !0)),
                (n = a(n, "active", r))
              );
            }),
            (t[N.t] = function (e, t) {
              var c = t.payload,
                f = t.meta,
                p = f.keepDirty,
                l = f.keepSubmitSucceeded,
                d = f.updateUnregisteredFields,
                E = f.keepValues,
                O = s(c),
                _ = n,
                S = i(e, "warning");
              S && (_ = a(_, "warning", S));
              var v = i(e, "syncWarnings");
              v && (_ = a(_, "syncWarnings", v));
              var h = i(e, "error");
              h && (_ = a(_, "error", h));
              var y = i(e, "syncErrors");
              y && (_ = a(_, "syncErrors", y));
              var T = i(e, "registeredFields");
              T && (_ = a(_, "registeredFields", T));
              var g = i(e, "values"),
                b = i(e, "initial"),
                m = O,
                C = g;
              if (p && T) {
                if (!r(m, b)) {
                  var A = function (e) {
                    var t = i(b, e),
                      n = i(g, e);
                    if (r(n, t)) {
                      var o = i(m, e);
                      i(C, e) !== o && (C = a(C, e, o));
                    }
                  };
                  d ||
                    o(u(T), function (e) {
                      return A(e);
                    }),
                    o(u(m), function (e) {
                      if ("undefined" === typeof i(b, e)) {
                        var t = i(m, e);
                        C = a(C, e, t);
                      }
                      d && A(e);
                    });
                }
              } else C = m;
              return (
                E &&
                  (o(u(g), function (e) {
                    var t = i(g, e);
                    C = a(C, e, t);
                  }),
                  o(u(b), function (e) {
                    var t = i(b, e);
                    m = a(m, e, t);
                  })),
                l &&
                  i(e, "submitSucceeded") &&
                  (_ = a(_, "submitSucceeded", !0)),
                (_ = a(_, "values", C)),
                (_ = a(_, "initial", m))
              );
            }),
            (t[N.u] = function (e, t) {
              var r = t.payload,
                n = r.name,
                o = r.type,
                c = "registeredFields['" + n + "']",
                u = i(e, c);
              if (u) {
                var f = i(u, "count") + 1;
                u = a(u, "count", f);
              } else u = s({ name: n, type: o, count: 1 });
              return a(e, c, u);
            }),
            (t[N.v] = function (e) {
              var t = n,
                r = i(e, "registeredFields");
              r && (t = a(t, "registeredFields", r));
              var o = i(e, "initial");
              return (
                o && ((t = a(t, "values", o)), (t = a(t, "initial", o))), t
              );
            }),
            (t[N.w] = function (e, t) {
              var r = t.meta.sections,
                n = e;
              r.forEach(function (t) {
                (n = d(n, "asyncErrors." + t)),
                  (n = d(n, "submitErrors." + t)),
                  (n = d(n, "fields." + t));
                var r = i(e, "initial." + t);
                n = r ? a(n, "values." + t, r) : d(n, "values." + t);
              });
              var o = p(u(i(n, "registeredFields")), function (e) {
                return i(n, "fields." + e + ".touched");
              });
              return (n = o ? a(n, "anyTouched", !0) : c(n, "anyTouched"));
            }),
            (t[N.D] = function (e) {
              return a(e, "triggerSubmit", !0);
            }),
            (t[N.z] = function (e, t) {
              var r = t.meta.field;
              return a(e, "asyncValidating", r || !0);
            }),
            (t[N.A] = function (e) {
              return a(e, "submitting", !0);
            }),
            (t[N.B] = function (e, t) {
              var r = t.payload,
                n = e;
              if (((n = c(n, "asyncValidating")), r && Object.keys(r).length)) {
                var o = r._error,
                  i = R()(r, ["_error"]);
                o && (n = a(n, "error", o)),
                  Object.keys(i).length && (n = a(n, "asyncErrors", s(i)));
              } else (n = c(n, "error")), (n = c(n, "asyncErrors"));
              return n;
            }),
            (t[N.C] = function (e, t) {
              var r = t.payload,
                n = e;
              if (
                ((n = c(n, "submitting")),
                (n = c(n, "submitFailed")),
                (n = c(n, "submitSucceeded")),
                r && Object.keys(r).length)
              ) {
                var o = r._error,
                  i = R()(r, ["_error"]);
                (n = o ? a(n, "error", o) : c(n, "error")),
                  (n = Object.keys(i).length
                    ? a(n, "submitErrors", s(i))
                    : c(n, "submitErrors")),
                  (n = a(n, "submitFailed", !0));
              } else (n = c(n, "error")), (n = c(n, "submitErrors"));
              return n;
            }),
            (t[N.x] = function (e, t) {
              var r = t.meta.fields,
                n = e;
              return (
                (n = a(n, "submitFailed", !0)),
                (n = c(n, "submitSucceeded")),
                (n = c(n, "submitting")),
                r.forEach(function (e) {
                  return (n = a(n, "fields." + e + ".touched", !0));
                }),
                r.length && (n = a(n, "anyTouched", !0)),
                n
              );
            }),
            (t[N.y] = function (e) {
              var t = e;
              return (
                (t = c(t, "submitFailed")), (t = a(t, "submitSucceeded", !0))
              );
            }),
            (t[N.E] = function (e, t) {
              var r = t.meta.fields,
                n = e;
              return (
                r.forEach(function (e) {
                  return (n = a(n, "fields." + e + ".touched", !0));
                }),
                (n = a(n, "anyTouched", !0))
              );
            }),
            (t[N.F] = function (e, t) {
              var o = t.payload,
                s = o.name,
                u = o.destroyOnUnmount,
                f = e,
                p = "registeredFields['" + s + "']",
                l = i(f, p);
              if (!l) return f;
              var O = i(l, "count") - 1;
              if (O <= 0 && u) {
                (f = c(f, p)),
                  r(i(f, "registeredFields"), n) &&
                    (f = c(f, "registeredFields"));
                var _ = i(f, "syncErrors");
                _ &&
                  ((_ = E(_, s)),
                  (f = P.a.deepEqual(_, P.a.empty)
                    ? c(f, "syncErrors")
                    : a(f, "syncErrors", _)));
                var S = i(f, "syncWarnings");
                S &&
                  ((S = E(S, s)),
                  (f = P.a.deepEqual(S, P.a.empty)
                    ? c(f, "syncWarnings")
                    : a(f, "syncWarnings", S))),
                  (f = d(f, "submitErrors." + s)),
                  (f = d(f, "asyncErrors." + s));
              } else (l = a(l, "count", O)), (f = a(f, p, l));
              return f;
            }),
            (t[N.G] = function (e, t) {
              var r = t.meta.fields,
                n = e;
              r.forEach(function (e) {
                return (n = c(n, "fields." + e + ".touched"));
              });
              var o = p(u(i(n, "registeredFields")), function (e) {
                return i(n, "fields." + e + ".touched");
              });
              return (n = o ? a(n, "anyTouched", !0) : c(n, "anyTouched"));
            }),
            (t[N.H] = function (e, t) {
              var r = t.payload,
                n = r.syncErrors,
                o = r.error,
                i = e;
              return (
                o
                  ? ((i = a(i, "error", o)), (i = a(i, "syncError", !0)))
                  : ((i = c(i, "error")), (i = c(i, "syncError"))),
                (i = Object.keys(n).length
                  ? a(i, "syncErrors", n)
                  : c(i, "syncErrors"))
              );
            }),
            (t[N.I] = function (e, t) {
              var r = t.payload,
                n = r.syncWarnings,
                o = r.warning,
                i = e;
              return (
                (i = o ? a(i, "warning", o) : c(i, "warning")),
                (i = Object.keys(n).length
                  ? a(i, "syncWarnings", n)
                  : c(i, "syncWarnings"))
              );
            }),
            t);
        return (function e(t) {
          return (
            (t.plugin = function (t, r) {
              var o = this;
              return (
                void 0 === r && (r = {}),
                e(function (e, c) {
                  void 0 === e && (e = n),
                    void 0 === c && (c = { type: "NONE" });
                  var s = function (r, n) {
                      var o = i(r, n),
                        s = t[n](o, c, i(e, n));
                      return s !== o ? a(r, n, s) : r;
                    },
                    u = o(e, c),
                    f = c && c.meta && c.meta.form;
                  return f && !r.receiveAllFormActions
                    ? t[f]
                      ? s(u, f)
                      : u
                    : Object.keys(t).reduce(s, u);
                })
              );
            }),
            t
          );
        })(
          (function (e) {
            return function (t, r) {
              void 0 === t && (t = n), void 0 === r && (r = { type: "NONE" });
              var o = r && r.meta && r.meta.form;
              if (!o || !D(r)) return t;
              if (r.type === N.r && r.meta && r.meta.form)
                return r.meta.form.reduce(function (e, t) {
                  return d(e, t);
                }, t);
              var c = i(t, o),
                s = e(c, r);
              return s === c ? t : a(t, o, s);
            };
          })(function (e, t) {
            void 0 === e && (e = n);
            var r = h[t.type];
            return r ? r(e, t) : e;
          })
        );
      })(P.a).plugin({
        addTag: function (e, t) {
          switch (t.type) {
            case o.a.ADD_TAG_SUCCESS:
            case o.a.ADD_TAG_FAILURE:
              return;
            default:
              return e;
          }
        },
      });
      function x(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function H(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? x(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : x(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var B = { isFetched: !1, isFetching: !1, statusMessage: "" };
      var G = function () {
        var e,
          t,
          r =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : B,
          n = arguments.length > 1 ? arguments[1] : void 0;
        switch (n.type) {
          case o.a.FETCH_LIST_REQUEST:
            return H(H({}, r), {}, { isFetched: !1, isFetching: !0 });
          case o.a.FETCH_LIST_SUCCESS:
            return H(
              H({}, r),
              {},
              ((e = { isFetched: !0, isFetching: !1 }),
              Object(i.a)(e, n.modelName, n.listAndTotal.list),
              Object(i.a)(
                e,
                "".concat(n.modelName, "Total"),
                n.listAndTotal.total
              ),
              e)
            );
          case o.a.FETCH_LIST_FAILURE:
            return H(
              H({}, r),
              {},
              ((t = { isFetched: !1, isFetching: !1, statusMessage: n.error }),
              Object(i.a)(t, n.modelName, []),
              Object(i.a)(t, "".concat(n.modelName, "Total"), 0),
              t)
            );
          default:
            return r;
        }
      };
      function k(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function Q(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? k(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : k(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var V = { isSidebarMenuOpen: !1 };
      var q = function () {
        var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : V;
        switch ((arguments.length > 1 ? arguments[1] : void 0).type) {
          case o.a.TOGGLE_SIDEBAR_MENU:
            return Q(Q({}, e), {}, { isSidebarMenuOpen: !e.isSidebarMenuOpen });
          case o.a.CLOSE_SIDEBAR_MENU:
            return Q(Q({}, e), {}, { isSidebarMenuOpen: !1 });
          default:
            return e;
        }
      };
      function W(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function z(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? W(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : W(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var J = {
        isFetched: !1,
        isFetching: !1,
        isReadFetched: !1,
        isReadFetching: !1,
        statusMessage: "",
        readStatusMessage: "",
        Notifications: [],
        NotificationsTotal: 0,
        unReadCount: 0,
      };
      var Y = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : J,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.FETCH_NOTIFICATIONS_REQUEST:
            return z(z({}, e), {}, { isFetched: !1, isFetching: !0 });
          case o.a.FETCH_NOTIFICATIONS_SUCCESS:
            return z(
              z({}, e),
              {},
              {
                isFetched: !0,
                isFetching: !1,
                Notifications: t.response.list,
                NotificationsTotal: t.response.total,
                unReadCount: t.response.unReadCount,
              }
            );
          case o.a.FETCH_NOTIFICATIONS_FAILURE:
            return z(
              z({}, e),
              {},
              { isFetched: !1, isFetching: !1, statusMessage: t.error }
            );
          case o.a.READ_NOTIFICATION_REQUEST:
            return z(z({}, e), {}, { isFetched: !1, isFetching: !0 });
          case o.a.READ_NOTIFICATION_SUCCESS:
            return z(z({}, e), {}, { isFetched: !0, isFetching: !1 });
          case o.a.READ_NOTIFICATION_FAILURE:
            return z(
              z({}, e),
              {},
              { isFetched: !1, isFetching: !1, statusMessage: t.error }
            );
          case o.a.READ_NOTIFICATIONS_REQUEST:
            return z(z({}, e), {}, { isReadFetched: !1, isReadFetching: !0 });
          case o.a.READ_NOTIFICATIONS_SUCCESS:
            return z(z({}, e), {}, { isReadFetched: !0, isReadFetching: !1 });
          case o.a.READ_NOTIFICATIONS_FAILURE:
            return z(
              z({}, e),
              {},
              {
                isReadFetched: !1,
                isReadFetching: !1,
                readStatusMessage: t.error,
              }
            );
          default:
            return e;
        }
      };
      function $(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function K(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? $(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : $(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var X = { isFetching: !1, isFetched: !1, statusMessage: "", content: {} };
      var Z = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : X,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.FETCH_PREVIEW_REQUEST:
            return K(
              K({}, e),
              {},
              { isFetched: !1, isFetching: !0, content: X.content }
            );
          case o.a.FETCH_PREVIEW_SUCCESS:
            return K(
              K({}, e),
              {},
              { isFetched: !0, isFetching: !1, content: t.content }
            );
          case o.a.FETCH_PREVIEW_FAILURE:
            return K(
              K({}, e),
              {},
              { isFetched: !1, isFetching: !1, statusMessage: t.error }
            );
          default:
            return e;
        }
      };
      function ee(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ee(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : ee(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var re = {
        isPosting: !1,
        isPosted: !1,
        statusMessage: "",
        isModalOpen: !1,
        currentStep: "form",
      };
      var ne = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : re,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.TOGGLE_RECOMMEND_CS_MODAL:
            return te(
              te({}, e),
              {},
              { currentStep: "form", isModalOpen: !e.isModalOpen }
            );
          case o.a.POST_RECOMMEND_CS_REQUEST:
            return te(
              te({}, e),
              {},
              { isPosting: !0, isPosted: !1, statusMessage: re.statusMessage }
            );
          case o.a.POST_RECOMMEND_CS_SUCCESS:
            return te(
              te({}, e),
              {},
              { isPosting: !1, isPosted: !0, currentStep: "done" }
            );
          case o.a.POST_RECOMMEND_CS_FAILURE:
            return te(
              te({}, e),
              {},
              { isPosting: !1, isPosted: !1, statusMessage: t.error }
            );
          default:
            return e;
        }
      };
      function oe(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function ie(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? oe(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : oe(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var ae = {
        isFlagging: !1,
        isSucceeded: !1,
        statusMessage: "",
        isSpamModalOpen: !1,
        isUnSpamModalOpen: !1,
      };
      var ce = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ae,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.TOGGLE_SPAM_MODAL:
            return ie(
              ie({}, e),
              {},
              {
                statusMessage: ae.statusMessage,
                isSpamModalOpen: !e.isSpamModalOpen,
              }
            );
          case o.a.TOGGLE_UNSPAM_MODAL:
            return ie(
              ie({}, e),
              {},
              {
                statusMessage: ae.statusMessage,
                isUnSpamModalOpen: !e.isUnSpamModalOpen,
              }
            );
          case o.a.FLAG_AS_SPAM_REQUEST:
            return ie(
              ie({}, e),
              {},
              {
                isFlaggingAsSpam: !0,
                isSucceeded: !1,
                statusMessage: ae.statusMessage,
                isSpamModalOpen: ae.isSpamModalOpen,
              }
            );
          case o.a.FLAG_AS_SPAM_SUCCESS:
            return ie(ie({}, e), {}, { isFlaggingAsSpam: !1, isSucceeded: !0 });
          case o.a.FLAG_AS_SPAM_FAILURE:
            return ie(
              ie({}, e),
              {},
              { isFlaggingAsSpam: !1, isSucceeded: !1, statusMessage: t.error }
            );
          case o.a.UNSPAM_REQUEST:
            return ie(
              ie({}, e),
              {},
              {
                isFlagging: !0,
                isSucceeded: !1,
                statusMessage: ae.statusMessage,
                isSpamModalOpen: ae.isSpamModalOpen,
                isUnSpamModalOpen: ae.isUnSpamModalOpen,
              }
            );
          case o.a.UNSPAM_SUCCESS:
            return ie(ie({}, e), {}, { isFlagging: !1, isSucceeded: !0 });
          case o.a.UNSPAM_FAILURE:
            return ie(
              ie({}, e),
              {},
              { isFlagging: !1, isSucceeded: !1, statusMessage: t.error }
            );
          default:
            return e;
        }
      };
      function se(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function ue(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? se(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : se(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var fe = {
        isRequesting: !1,
        isSucceeded: !1,
        statusMessage: "",
        isDeleteTagModalOpen: !1,
      };
      var pe = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : fe,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.ADD_TAG_REQUEST:
          case o.a.DELETE_TAG_REQUEST:
            return ue(
              ue({}, e),
              {},
              {
                isRequesting: !0,
                isSucceeded: !1,
                statusMessage: fe.statusMessage,
                isDeleteTagModalOpen: fe.isDeleteTagModalOpen,
              }
            );
          case o.a.ADD_TAG_SUCCESS:
          case o.a.DELETE_TAG_SUCCESS:
            return ue(ue({}, e), {}, { isRequesting: !1, isSucceeded: !0 });
          case o.a.ADD_TAG_FAILURE:
          case o.a.DELETE_TAG_FAILURE:
            return ue(
              ue({}, e),
              {},
              { isRequesting: !1, isSucceeded: !1, statusMessage: t.error }
            );
          case o.a.TOGGLE_DELETE_TAG_MODAL:
            return ue(
              ue({}, e),
              {},
              { isDeleteTagModalOpen: !e.isDeleteTagModalOpen }
            );
          default:
            return e;
        }
      };
      function le(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function de(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? le(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : le(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var Ee = {
        isFetched: !1,
        isFetching: !1,
        statusMessage: "",
        list: [],
        total: 0,
      };
      var Oe = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ee,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.FETCH_TAG_LIST_REQUEST:
            return de(
              de({}, e),
              {},
              { isFetched: !1, isFetching: !0, list: Ee.list, total: Ee.total }
            );
          case o.a.FETCH_TAG_LIST_SUCCESS:
            return de(
              de({}, e),
              {},
              {
                isFetched: !0,
                isFetching: !1,
                list: t.listAndTotal.list,
                total: t.listAndTotal.total,
              }
            );
          case o.a.FETCH_TAG_LIST_FAILURE:
            return de(
              de({}, e),
              {},
              { isFetched: !1, isFetching: !1, statusMessage: t.error }
            );
          default:
            return e;
        }
      };
      function _e(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function Se(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? _e(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : _e(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var ve = {
        isFetching: !1,
        isFetched: !1,
        statusMessage: "",
        content: {},
      };
      var he = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ve,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.FETCH_TAG_SEARCH_REQUEST:
            return Se(
              Se({}, e),
              {},
              {
                isFetched: !1,
                isFetching: !0,
                statusMessage: ve.statusMessage,
                content: ve.content,
              }
            );
          case o.a.FETCH_TAG_SEARCH_SUCCESS:
            return Se(
              Se({}, e),
              {},
              { isFetched: !0, isFetching: !1, content: t.content }
            );
          case o.a.FETCH_TAG_SEARCH_FAILURE:
            return Se(
              Se({}, e),
              {},
              { isFetched: !1, isFetching: !1, statusMessage: t.error }
            );
          default:
            return e;
        }
      };
      function ye(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function Te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ye(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : ye(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var ge = {
        isFetching: !1,
        isFetched: !1,
        statusMessage: "",
        unBan: {
          isUnBanning: !1,
          isSucceeded: !1,
          statusMessage: "",
          isUnBanUserModalOpen: !1,
        },
        ban: {
          isBanning: !1,
          isSucceeded: !1,
          statusMessage: "",
          isBanUserModalOpen: !1,
        },
      };
      var be = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : ge,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case o.a.UNBAN_USER_REQUEST:
              return Te(
                Te({}, e),
                {},
                {
                  unBan: Te(
                    Te({}, e.unBan),
                    {},
                    {
                      isUnBanning: !0,
                      isSucceeded: !1,
                      statusMessage: ge.unBan.statusMessage,
                      isUnBanUserModalOpen: ge.unBan.isUnBanUserModalOpen,
                    }
                  ),
                }
              );
            case o.a.UNBAN_USER_SUCCESS:
              return Te(
                Te({}, e),
                {},
                {
                  unBan: Te(
                    Te({}, e.unBan),
                    {},
                    { isUnBanning: !1, isSucceeded: !0, statusMessage: "" }
                  ),
                }
              );
            case o.a.UNBAN_USER_FAILURE:
              return Te(
                Te({}, e),
                {},
                {
                  unBan: Te(
                    Te({}, e.unBan),
                    {},
                    { isUnBanning: !1, isSucceeded: !1, statusMessage: t.error }
                  ),
                }
              );
            case o.a.TOGGLE_UNBAN_USER_MODAL:
              return Te(
                Te({}, e),
                {},
                {
                  unBan: Te(
                    Te({}, e.unBan),
                    {},
                    {
                      statusMessage: ge.unBan.statusMessage,
                      isUnBanUserModalOpen: !e.unBan.isUnBanUserModalOpen,
                    }
                  ),
                }
              );
            case o.a.BAN_USER_REQUEST:
              return Te(
                Te({}, e),
                {},
                {
                  ban: Te(
                    Te({}, e.unBan),
                    {},
                    {
                      isBanning: !0,
                      isSucceeded: !1,
                      statusMessage: ge.ban.banStatusMessage,
                      isBanUserModalOpen: ge.ban.isBanUserModalOpen,
                    }
                  ),
                }
              );
            case o.a.BAN_USER_SUCCESS:
              return Te(
                Te({}, e),
                {},
                {
                  ban: Te(
                    Te({}, e.ban),
                    {},
                    { isBanning: !1, isSucceeded: !0, statusMessage: "" }
                  ),
                }
              );
            case o.a.BAN_USER_FAILURE:
              return Te(
                Te({}, e),
                {},
                {
                  ban: Te(
                    Te({}, e.ban),
                    {},
                    { isBanning: !1, isSucceeded: !1, statusMessage: t.error }
                  ),
                }
              );
            case o.a.TOGGLE_BAN_USER_MODAL:
              return Te(
                Te({}, e),
                {},
                {
                  ban: Te(
                    Te({}, e.ban),
                    {},
                    {
                      statusMessage: ge.ban.statusMessage,
                      isBanUserModalOpen: !e.ban.isBanUserModalOpen,
                    }
                  ),
                }
              );
            case o.a.FETCH_USER_LIST_REQUEST:
              return Te(
                Te({}, e),
                {},
                {
                  isFetched: !1,
                  isFetching: !0,
                  statusMessage: ge.statusMessage,
                  User: [],
                  UserTotal: 0,
                }
              );
            case o.a.FETCH_USER_LIST_SUCCESS:
              return Te(
                Te({}, e),
                {},
                {
                  isFetched: !0,
                  isFetching: !1,
                  User: t.listAndTotal.list,
                  UserTotal: t.listAndTotal.total,
                  statusMessage: ge.statusMessage,
                }
              );
            case o.a.FETCH_USER_LIST_FAILURE:
              return Te(
                Te({}, e),
                {},
                { isFetched: !1, isFetching: !1, statusMessage: t.error }
              );
            default:
              return e;
          }
        },
        me = {};
      var Ce = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : me,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.SET_CLIENT_CONFIG:
            return t.clientConfig;
          default:
            return e;
        }
      };
      function Ae(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function Re(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ae(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : Ae(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var je = {
        isPosting: !1,
        isPosted: !1,
        statusMessage: "",
        timer: 0,
        articleSlug: "",
        isModalOpen: !1,
        currentStep: "form",
        slug: "",
        externalUrl: "",
      };
      var Ie = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : je,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.TOGGLE_SUBMIT_ARTICLE_MODAL:
            return Re(Re({}, je), {}, { isModalOpen: !e.isModalOpen });
          case o.a.POST_SUBMIT_ARTICLE_REQUEST:
            return Re(
              Re({}, e),
              {},
              { isPosting: !0, isPosted: !1, statusMessage: je.statusMessage }
            );
          case o.a.POST_SUBMIT_ARTICLE_SUCCESS:
            return Re(
              Re({}, e),
              {},
              {
                isPosting: !1,
                isPosted: !0,
                currentStep: t.status || "pending",
                slug: t.slug,
                externalUrl: t.externalUrl,
              }
            );
          case o.a.POST_SUBMIT_ARTICLE_FAILURE:
            return Re(
              Re({}, e),
              {},
              {
                isPosting: !1,
                isPosted: !1,
                statusMessage: t.error,
                timer: t.timer,
                articleSlug: t.articleSlug,
              }
            );
          default:
            return e;
        }
      };
      function Ne(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function we(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ne(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : Ne(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var Me = { isCreating: !1, isSucceeded: !1, statusMessage: "" };
      var Ue = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Me,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.RSS_FEED_CREATE_REQUEST:
            return we(
              we({}, e),
              {},
              {
                isCreating: !0,
                isSucceeded: !1,
                statusMessage: Me.statusMessage,
              }
            );
          case o.a.RSS_FEED_CREATE_SUCCESS:
            return we(we({}, e), {}, { isCreating: !1, isSucceeded: !0 });
          case o.a.RSS_FEED_CREATE_FAILURE:
            return we(
              we({}, e),
              {},
              { isCreating: !1, isSucceeded: !1, statusMessage: t.error }
            );
          default:
            return e;
        }
      };
      function Pe(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function Fe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Pe(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : Pe(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var De = {
        isFetched: !1,
        isFetching: !1,
        statusMessage: "",
        list: [],
        disconnectModal: {
          isFetched: !0,
          isFetching: !1,
          isOpen: !1,
          rssFeedIdToDisconnect: null,
          statusMessage: "",
        },
      };
      var Le = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : De,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.a.FETCH_RSS_FEED_LIST_REQUEST:
            return Fe(
              Fe({}, e),
              {},
              { isFetched: !1, isFetching: !0, list: De.list }
            );
          case o.a.FETCH_RSS_FEED_LIST_SUCCESS:
            return Fe(
              Fe({}, e),
              {},
              { isFetched: !0, isFetching: !1, list: t.rssFeeds }
            );
          case o.a.FETCH_RSS_FEED_LIST_FAILURE:
            return Fe(
              Fe({}, e),
              {},
              { isFetched: !1, isFetching: !1, statusMessage: t.error }
            );
          case o.a.TOGGLE_DISCONNECT_RSS_FEED_MODAL:
            var r = e.disconnectModal.isOpen;
            return Fe(
              Fe({}, e),
              {},
              {
                disconnectModal: Fe(
                  Fe({}, e.disconnectModal),
                  {},
                  {
                    isOpen: !r,
                    rssFeedIdToDisconnect: r ? null : t.rssFeedIdToDisconnect,
                  }
                ),
              }
            );
          case o.a.DISCONNECT_RSS_FEED_REQUEST:
            return Fe(
              Fe({}, e),
              {},
              {
                disconnectModal: Fe(
                  Fe({}, e.disconnectModal),
                  {},
                  { isFetched: !1, isFetching: !0 }
                ),
              }
            );
          case o.a.DISCONNECT_RSS_FEED_SUCCESS:
            return Fe(
              Fe({}, e),
              {},
              {
                disconnectModal: Fe(
                  Fe({}, e.disconnectModal),
                  {},
                  {
                    isOpen: !1,
                    rssFeedIdToDisconnect: null,
                    isFetched: !0,
                    isFetching: !1,
                  }
                ),
              }
            );
          case o.a.DISCONNECT_RSS_FEED_FAILURE:
            return Fe(
              Fe({}, e),
              {},
              {
                disconnectModal: Fe(
                  Fe({}, e.disconnectModal),
                  {},
                  {
                    isOpen: !1,
                    rssFeedIdToDisconnect: null,
                    isFetched: !1,
                    isFetching: !1,
                    statusMessage: t.errorMessage,
                  }
                ),
              }
            );
          default:
            return e;
        }
      };
      function xe(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function He(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? xe(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : xe(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var Be = { isSetAsHomePageModalOpen: !1 };
      var Ge = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Be;
          switch ((arguments.length > 1 ? arguments[1] : void 0).type) {
            case o.a.TOGGLE_SET_AS_HOMEPAGE_MODAL:
              return He(
                He({}, e),
                {},
                { isSetAsHomePageModalOpen: !e.isSetAsHomePageModalOpen }
              );
            default:
              return e;
          }
        },
        ke = r("slGX"),
        Qe = {};
      var Ve = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : Qe,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case o.a.FIRE_GOOGLE_ANALYTICS_EVENT:
              return (
                Object(ke.a)({
                  clientConfig: t.clientConfig,
                  eventName: t.eventName,
                  properties: t.properties,
                  url: t.url,
                }),
                { eventName: t.eventName, properties: t.properties, url: t.url }
              );
            default:
              return e;
          }
        },
        qe = Object(n.c)({
          adminContent: u,
          adminList: d,
          auth: S,
          clientConfig: Ce,
          comment: T,
          content: C,
          form: L,
          list: G,
          menu: q,
          notifications: Y,
          preview: Z,
          recommendCS: ne,
          spam: ce,
          tag: pe,
          tagList: Oe,
          tagSearch: he,
          user: be,
          submitArticle: Ie,
          rss: Ue,
          rssFeedList: Le,
          setAsHomePage: Ge,
          analytics: Ve,
        }),
        We = function (e, t) {
          return t.type === o.a.CLEAR_STORE && (e = void 0), qe(e, t);
        };
      function ze(e) {
        return function (t) {
          var r = t.dispatch,
            n = t.getState;
          return function (t) {
            return function (o) {
              return "function" === typeof o ? o(r, n, e) : t(o);
            };
          };
        };
      }
      var Je = ze();
      Je.withExtraArgument = ze;
      var Ye = Je,
        $e = r("HbGN"),
        Ke = r("lyo6"),
        Xe = r("tNLw"),
        Ze = r.n(Xe),
        et = r("JBtm"),
        tt = r.n(et),
        rt = r("00EI");
      function nt(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function ot(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? nt(Object(r), !0).forEach(function (t) {
                Object(i.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : nt(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var it = {
          Blog: "official-blog-posts",
          CheatSheet: "cheat-sheets",
          Tech: "tech-thoughts",
          Tutorial: "tutorials",
          OpenCourse: "open-courses",
          Episode: "podcast",
          Tags: "tags",
          NewsItem: "news",
          Comment: "comment",
        },
        at = { "Content-Type": "application/json", Accept: "application/json" },
        ct = function (e) {
          return encodeURI("".concat(Ke.a).concat(e));
        },
        st = function (e) {
          var t = e.modelName,
            r = e.mustRead,
            n = e.trending,
            o = e.page,
            i = e.tag;
          if ("Tags" === t) return ct("/tags");
          var a = rt.POST_LIMIT[t],
            c = "/".concat(it[t]),
            s = {
              tag: i || void 0,
              offset: o ? (o - 1) * a : void 0,
              limit: o ? a : void 0,
            };
          return (
            ct(c + (r ? "/mustread" : "") + (n ? "/trending" : "")) +
            "?" +
            tt.a.stringify(s)
          );
        },
        ut = function (e) {
          var t = e.modelName,
            r = e.slug;
          return ct("/".concat(it[t], "/").concat(r));
        },
        ft = function (e) {
          var t = e.modelName,
            r = { isSpam: e.isSpam || void 0, status: e.status || void 0 };
          return ct(
            "Tags" === t
              ? "/admin/tags"
              : "/admin/contents/".concat(t) + "?" + tt.a.stringify(r)
          );
        },
        pt = function (e) {
          var t = e.isBanned;
          return ct("/admin/users?isBanned=".concat(t));
        },
        lt = function (e) {
          var t = e.id;
          return ct("/admin/users/unBan/".concat(t));
        },
        dt = function (e) {
          var t = e.id;
          return ct("/admin/users/ban/".concat(t));
        },
        Et = function (e) {
          var t = e.id;
          return ct("/admin/content/".concat(t));
        },
        Ot = function (e) {
          var t = e.id;
          return ct("/admin/content/".concat(t, "/unSpam"));
        },
        _t = function (e) {
          var t = e.id;
          return ct("/admin/comment/".concat(t, "/unSpam"));
        },
        St = function (e) {
          var t = e.id;
          return ct("/admin/content/".concat(t, "/publish"));
        },
        vt = function (e) {
          var t = e.tag;
          return ct("/admin/tags/".concat(t));
        },
        ht = function (e) {
          var t = e.previewSlug;
          return ct("/content/preview/".concat(t));
        },
        yt = function (e) {
          var t = e.votedId,
            r = e.votedModel;
          return ct("/".concat(it[r], "/").concat(t, "/vote"));
        },
        Tt = function (e) {
          return ct("/content/tagged/".concat(e));
        },
        gt = function () {
          return ct("/".concat(it.CheatSheet, "/recommend"));
        },
        bt = function () {
          return ct("/".concat(it.NewsItem, "/submit"));
        },
        mt = function (e) {
          var t = e.id;
          return ct("/content/".concat(t, "/spam"));
        },
        Ct = function (e) {
          var t = e.id;
          return ct("/comment/".concat(t, "/spam"));
        },
        At = function (e) {
          var t = rt.POST_LIMIT.Notification,
            r = { offset: e ? (e - 1) * t : void 0, limit: e ? t : void 0 };
          return ct("/notifications?".concat(tt.a.stringify(r)));
        },
        Rt = function (e) {
          return ct("/notifications/".concat(e, "/read"));
        },
        jt = function () {
          return ct("/notifications/read");
        },
        It = function (e) {
          return ct("/comment/".concat(e));
        },
        Nt = function (e) {
          return ct("/comments/".concat(e));
        },
        wt = function () {
          return ct("/admin/rssFeeds/new");
        },
        Mt = function () {
          return ct("/admin/rssFeeds");
        },
        Ut = function (e) {
          return ct("/admin/rssFeeds/remove/".concat(e));
        };
      var Pt = function (e) {
        var t = e.cookie,
          r = function (e, r) {
            var n = r.body,
              o = Object($e.a)(r, ["body"]);
            return Ze()(
              e,
              ot(
                {
                  headers: Object.assign({}, at, t && { Cookie: t }),
                  credentials: "include",
                  body: JSON.stringify(n),
                },
                o
              )
            );
          },
          n = function (e, r) {
            var n = r.body,
              o = Object($e.a)(r, ["body"]),
              i = new FormData();
            return (
              Object.keys(n).forEach(function (e) {
                if (null === n[e] || void 0 === n[e]) return !1;
                Array.isArray(n[e])
                  ? n[e].forEach(function (t, r) {
                      return i.append("".concat(e, "[").concat(r, "]"), t);
                    })
                  : i.append(e, n[e]);
              }),
              Ze()(
                e,
                ot(
                  {
                    headers: Object.assign({}, t && { Cookie: t }),
                    credentials: "include",
                    body: i,
                  },
                  o
                )
              )
            );
          };
        return {
          fetchList: function (e) {
            var t = e.modelName,
              n = e.mustRead,
              o = e.trending,
              i = e.page,
              a = e.tag;
            return r(
              st({ modelName: t, mustRead: n, trending: o, page: i, tag: a }),
              {}
            );
          },
          fetchContent: function (e) {
            var t = e.modelName,
              n = e.slug;
            return r(ut({ modelName: t, slug: n }), {});
          },
          fetchAdminList: function (e) {
            var t = e.modelName,
              n = e.isSpam,
              o = e.status;
            return r(ft({ modelName: t, isSpam: n, status: o }), {});
          },
          fetchUserList: function (e) {
            var t = e.isBanned;
            return r(pt({ isBanned: t }), {});
          },
          unBanUser: function (e) {
            var t = e.id;
            return r(lt({ id: t }), { method: "POST" });
          },
          banUser: function (e) {
            var t = e.id;
            return r(dt({ id: t }), { method: "POST" });
          },
          fetchAdminContent: function (e) {
            var t = e.id;
            return r(Et({ id: t }), {});
          },
          updateAdminContent: function (e) {
            var t = e.id,
              r = e.formData;
            return n(Et({ id: t }), { body: r, method: "POST" });
          },
          createRSSFeed: function (e) {
            var t = e.formData;
            return r(wt(), { method: "POST", body: t });
          },
          fetchRSSFeedList: function () {
            return r(Mt(), { method: "GET" });
          },
          disconnectRSSFeed: function (e) {
            var t = e.id;
            return r(Ut(t), { method: "DELETE" });
          },
          approveArticle: function (e) {
            var t = e.id;
            return r(St({ id: t }), { method: "POST" });
          },
          flagAsSpam: function (e) {
            var t = e.id;
            return r(mt({ id: t }), { method: "POST" });
          },
          flagCommentAsSpam: function (e) {
            var t = e.id;
            return r(Ct({ id: t }), { method: "POST" });
          },
          unSpamRequest: function (e) {
            var t = e.id;
            return r(Ot({ id: t }), { method: "POST" });
          },
          unSpamCommentRequest: function (e) {
            var t = e.id;
            return r(_t({ id: t }), { method: "POST" });
          },
          deleteAdminContent: function (e) {
            var t = e.id;
            return r(Et({ id: t }), { method: "DELETE" });
          },
          addTag: function (e) {
            var t = e.tag;
            return r(vt({ tag: t }), { method: "POST" });
          },
          deleteTag: function (e) {
            var t = e.tag;
            return r(vt({ tag: t }), { method: "DELETE" });
          },
          fetchPreview: function (e) {
            var t = e.previewSlug;
            return r(ht({ previewSlug: t }), {});
          },
          addVote: function (e) {
            var t = e.votedId,
              n = e.votedModel;
            return r(yt({ votedId: t, votedModel: n }), { method: "POST" });
          },
          removeVote: function (e) {
            var t = e.votedId,
              n = e.votedModel;
            return r(yt({ votedId: t, votedModel: n }), { method: "DELETE" });
          },
          postRecommendCS: function (e) {
            var t = e.formData;
            return n(gt(), { body: t, method: "POST" });
          },
          postSubmitAnArticle: function (e) {
            var t = e.formData;
            return r(bt(), { body: t, method: "POST" });
          },
          fetchTagSearch: function (e) {
            var t = e.tag;
            return r(Tt(t), {});
          },
          fetchComments: function (e) {
            var t = e.contentId;
            return r(Nt(t), {});
          },
          updateComment: function (e) {
            var t = e.id,
              n = e.contentId,
              o = e.parentId,
              i = e.formData;
            return r(It(t), {
              body: ot({ contentId: n, parentId: o }, i),
              method: "POST",
            });
          },
          deleteComment: function (e) {
            var t = e.id;
            return r(It(t), { method: "DELETE" });
          },
          fetchNotifications: function (e) {
            var t = e.page;
            return r(At(t), {});
          },
          readNotification: function (e) {
            return r(Rt(e), { method: "POST" });
          },
          readNotifications: function () {
            return r(jt(), { method: "POST" });
          },
        };
      };
      t.a = function (e, t) {
        var r = t.isServer,
          o = t.req,
          i = Pt({ cookie: r && o && o.headers ? o.headers.cookie : void 0 }),
          a = Ye.withExtraArgument({ api: i });
        return Object(n.a)(a)(n.d)(We, e);
      };
    },
    "JBn+": function (e, t, r) {
      var n = r("hyzI"),
        o = r("qjF7"),
        i = r("cEmw");
      function a(e) {
        var t = -1,
          r = null == e ? 0 : e.length;
        for (this.__data__ = new n(); ++t < r; ) this.add(e[t]);
      }
      (a.prototype.add = a.prototype.push = o),
        (a.prototype.has = i),
        (e.exports = a);
    },
    JBtm: function (e, t, r) {
      "use strict";
      const n = r("UM5q"),
        o = r("1Fob"),
        i = r("p/97");
      function a(e) {
        if ("string" !== typeof e || 1 !== e.length)
          throw new TypeError(
            "arrayFormatSeparator must be single character string"
          );
      }
      function c(e, t) {
        return t.encode ? (t.strict ? n(e) : encodeURIComponent(e)) : e;
      }
      function s(e, t) {
        return t.decode ? o(e) : e;
      }
      function u(e) {
        const t = e.indexOf("#");
        return -1 !== t && (e = e.slice(0, t)), e;
      }
      function f(e) {
        const t = (e = u(e)).indexOf("?");
        return -1 === t ? "" : e.slice(t + 1);
      }
      function p(e, t) {
        return (
          t.parseNumbers &&
          !Number.isNaN(Number(e)) &&
          "string" === typeof e &&
          "" !== e.trim()
            ? (e = Number(e))
            : !t.parseBooleans ||
              null === e ||
              ("true" !== e.toLowerCase() && "false" !== e.toLowerCase()) ||
              (e = "true" === e.toLowerCase()),
          e
        );
      }
      function l(e, t) {
        a(
          (t = Object.assign(
            {
              decode: !0,
              sort: !0,
              arrayFormat: "none",
              arrayFormatSeparator: ",",
              parseNumbers: !1,
              parseBooleans: !1,
            },
            t
          )).arrayFormatSeparator
        );
        const r = (function (e) {
            let t;
            switch (e.arrayFormat) {
              case "index":
                return (e, r, n) => {
                  (t = /\[(\d*)\]$/.exec(e)),
                    (e = e.replace(/\[\d*\]$/, "")),
                    t
                      ? (void 0 === n[e] && (n[e] = {}), (n[e][t[1]] = r))
                      : (n[e] = r);
                };
              case "bracket":
                return (e, r, n) => {
                  (t = /(\[\])$/.exec(e)),
                    (e = e.replace(/\[\]$/, "")),
                    t
                      ? void 0 !== n[e]
                        ? (n[e] = [].concat(n[e], r))
                        : (n[e] = [r])
                      : (n[e] = r);
                };
              case "comma":
              case "separator":
                return (t, r, n) => {
                  const o =
                    "string" === typeof r &&
                    r.split("").indexOf(e.arrayFormatSeparator) > -1
                      ? r.split(e.arrayFormatSeparator).map((t) => s(t, e))
                      : null === r
                      ? r
                      : s(r, e);
                  n[t] = o;
                };
              default:
                return (e, t, r) => {
                  void 0 !== r[e] ? (r[e] = [].concat(r[e], t)) : (r[e] = t);
                };
            }
          })(t),
          n = Object.create(null);
        if ("string" !== typeof e) return n;
        if (!(e = e.trim().replace(/^[?#&]/, ""))) return n;
        for (const o of e.split("&")) {
          let [e, a] = i(t.decode ? o.replace(/\+/g, " ") : o, "=");
          (a =
            void 0 === a
              ? null
              : ["comma", "separator"].includes(t.arrayFormat)
              ? a
              : s(a, t)),
            r(s(e, t), a, n);
        }
        for (const o of Object.keys(n)) {
          const e = n[o];
          if ("object" === typeof e && null !== e)
            for (const r of Object.keys(e)) e[r] = p(e[r], t);
          else n[o] = p(e, t);
        }
        return !1 === t.sort
          ? n
          : (!0 === t.sort
              ? Object.keys(n).sort()
              : Object.keys(n).sort(t.sort)
            ).reduce((e, t) => {
              const r = n[t];
              return (
                Boolean(r) && "object" === typeof r && !Array.isArray(r)
                  ? (e[t] = (function e(t) {
                      return Array.isArray(t)
                        ? t.sort()
                        : "object" === typeof t
                        ? e(Object.keys(t))
                            .sort((e, t) => Number(e) - Number(t))
                            .map((e) => t[e])
                        : t;
                    })(r))
                  : (e[t] = r),
                e
              );
            }, Object.create(null));
      }
      (t.extract = f),
        (t.parse = l),
        (t.stringify = (e, t) => {
          if (!e) return "";
          a(
            (t = Object.assign(
              {
                encode: !0,
                strict: !0,
                arrayFormat: "none",
                arrayFormatSeparator: ",",
              },
              t
            )).arrayFormatSeparator
          );
          const r = (r) =>
              (t.skipNull && ((e) => null === e || void 0 === e)(e[r])) ||
              (t.skipEmptyString && "" === e[r]),
            n = (function (e) {
              switch (e.arrayFormat) {
                case "index":
                  return (t) => (r, n) => {
                    const o = r.length;
                    return void 0 === n ||
                      (e.skipNull && null === n) ||
                      (e.skipEmptyString && "" === n)
                      ? r
                      : null === n
                      ? [...r, [c(t, e), "[", o, "]"].join("")]
                      : [...r, [c(t, e), "[", c(o, e), "]=", c(n, e)].join("")];
                  };
                case "bracket":
                  return (t) => (r, n) =>
                    void 0 === n ||
                    (e.skipNull && null === n) ||
                    (e.skipEmptyString && "" === n)
                      ? r
                      : null === n
                      ? [...r, [c(t, e), "[]"].join("")]
                      : [...r, [c(t, e), "[]=", c(n, e)].join("")];
                case "comma":
                case "separator":
                  return (t) => (r, n) =>
                    null === n || void 0 === n || 0 === n.length
                      ? r
                      : 0 === r.length
                      ? [[c(t, e), "=", c(n, e)].join("")]
                      : [[r, c(n, e)].join(e.arrayFormatSeparator)];
                default:
                  return (t) => (r, n) =>
                    void 0 === n ||
                    (e.skipNull && null === n) ||
                    (e.skipEmptyString && "" === n)
                      ? r
                      : null === n
                      ? [...r, c(t, e)]
                      : [...r, [c(t, e), "=", c(n, e)].join("")];
              }
            })(t),
            o = {};
          for (const a of Object.keys(e)) r(a) || (o[a] = e[a]);
          const i = Object.keys(o);
          return (
            !1 !== t.sort && i.sort(t.sort),
            i
              .map((r) => {
                const o = e[r];
                return void 0 === o
                  ? ""
                  : null === o
                  ? c(r, t)
                  : Array.isArray(o)
                  ? o.reduce(n(r), []).join("&")
                  : c(r, t) + "=" + c(o, t);
              })
              .filter((e) => e.length > 0)
              .join("&")
          );
        }),
        (t.parseUrl = (e, t) => {
          t = Object.assign({ decode: !0 }, t);
          const [r, n] = i(e, "#");
          return Object.assign(
            { url: r.split("?")[0] || "", query: l(f(e), t) },
            t && t.parseFragmentIdentifier && n
              ? { fragmentIdentifier: s(n, t) }
              : {}
          );
        }),
        (t.stringifyUrl = (e, r) => {
          r = Object.assign({ encode: !0, strict: !0 }, r);
          const n = u(e.url).split("?")[0] || "",
            o = t.extract(e.url),
            i = t.parse(o, { sort: !1 }),
            a = Object.assign(i, e.query);
          let s = t.stringify(a, r);
          s && (s = `?${s}`);
          let f = (function (e) {
            let t = "";
            const r = e.indexOf("#");
            return -1 !== r && (t = e.slice(r)), t;
          })(e.url);
          return (
            e.fragmentIdentifier && (f = `#${c(e.fragmentIdentifier, r)}`),
            `${n}${s}${f}`
          );
        });
    },
    JNqh: function (e, t, r) {
      var n = r("6UKJ");
      e.exports = function (e, t) {
        var r = e.__data__;
        return n(t) ? r["string" == typeof t ? "string" : "hash"] : r.map;
      };
    },
    JcJ6: function (e, t, r) {
      var n = r("Syyo"),
        o = r("H87J"),
        i = r("wxYD"),
        a = r("a88S"),
        c = 1 / 0,
        s = n ? n.prototype : void 0,
        u = s ? s.toString : void 0;
      e.exports = function e(t) {
        if ("string" == typeof t) return t;
        if (i(t)) return o(t, e) + "";
        if (a(t)) return u ? u.call(t) : "";
        var r = t + "";
        return "0" == r && 1 / t == -c ? "-0" : r;
      };
    },
    "K/z8": function (e, t, r) {
      "use strict";
      r.d(t, "a", function () {
        return i;
      });
      var n = r("4wDe"),
        o = r("pWxA");
      function i(e, t) {
        return !t || ("object" !== Object(n.a)(t) && "function" !== typeof t)
          ? Object(o.a)(e)
          : t;
      }
    },
    KCLV: function (e, t, r) {
      var n = r("Syyo"),
        o = Object.prototype,
        i = o.hasOwnProperty,
        a = o.toString,
        c = n ? n.toStringTag : void 0;
      e.exports = function (e) {
        var t = i.call(e, c),
          r = e[c];
        try {
          e[c] = void 0;
          var n = !0;
        } catch (s) {}
        var o = a.call(e);
        return n && (t ? (e[c] = r) : delete e[c]), o;
      };
    },
    KrFp: function (e, t, r) {
      "use strict";
      function n(e) {
        var t,
          r = e.Symbol;
        return (
          "function" === typeof r
            ? r.observable
              ? (t = r.observable)
              : ((t = r("observable")), (r.observable = t))
            : (t = "@@observable"),
          t
        );
      }
      r.d(t, "a", function () {
        return n;
      });
    },
    L6um: function (e, t) {
      e.exports = function (e) {
        return this.__data__.has(e);
      };
    },
    LdEA: function (e, t) {
      e.exports = function (e, t) {
        if (null == e) return {};
        var r,
          n,
          o = {},
          i = Object.keys(e);
        for (n = 0; n < i.length; n++)
          (r = i[n]), t.indexOf(r) >= 0 || (o[r] = e[r]);
        return o;
      };
    },
    LzM7: function (e, t, r) {
      var n = r("6QIk");
      e.exports = function (e, t) {
        var r = this.__data__,
          o = n(r, e);
        return o < 0 ? (++this.size, r.push([e, t])) : (r[o][1] = t), this;
      };
    },
    MMYH: function (e, t, r) {
      "use strict";
      function n(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function o(e, t, r) {
        return t && n(e.prototype, t), r && n(e, r), e;
      }
      r.d(t, "a", function () {
        return o;
      });
    },
    ND9x: function (e, t, r) {
      var n = r("H87J"),
        o = r("QT01"),
        i = r("wxYD"),
        a = r("a88S"),
        c = r("SoOq"),
        s = r("Ypsa"),
        u = r("dw5g");
      e.exports = function (e) {
        return i(e) ? n(e, s) : a(e) ? [e] : o(c(u(e)));
      };
    },
    NYSw: function (e, t, r) {
      var n = r("BqUW"),
        o = r("tLQN");
      e.exports = function e(t, r, i, a, c) {
        return (
          t === r ||
          (null == t || null == r || (!o(t) && !o(r))
            ? t !== t && r !== r
            : n(t, r, i, a, e, c))
        );
      };
    },
    OBn4: function (e, t, r) {
      var n = r("vxC8")(r("IBsm"), "Set");
      e.exports = n;
    },
    OtNC: function (e, t, r) {
      var n = r("TAtK")(Object.keys, Object);
      e.exports = n;
    },
    P1d9: function (e, t, r) {
      "use strict";
      r.d(t, "d", function () {
        return u;
      }),
        r.d(t, "a", function () {
          return f;
        }),
        r.d(t, "c", function () {
          return p;
        }),
        r.d(t, "b", function () {
          return l;
        });
      var n = r("zjfJ"),
        o = r("7xIC"),
        i = r.n(o),
        a = r("00EI");
      function c(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? c(Object(r), !0).forEach(function (t) {
                Object(n.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : c(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var u = function (e) {
          var t = e.res,
            r = e.code,
            n = e.pathname;
          t ? (t.writeHead(r, { Location: n }), t.end()) : i.a.replace(n);
        },
        f = function (e) {
          var t = e.modelName,
            r = e.status,
            n = e.res,
            o = e.content || {},
            i = o.connectedInternalContentId,
            c = o.externalUrl,
            f = o.redirectSlug,
            p = {
              Tutorial: "/tutorials",
              OpenCourse: "/open-courses",
              Blog: "/blog",
              Tech: "/tech",
              Episode: "/podcast",
              NewsItem: "",
            },
            l = s(s({}, p), {}, { NewsItem: "/news" }),
            d = "".concat(a.LOCAL_PART_PREFIX).concat(p[t]),
            E = "".concat(a.LOCAL_PART_PREFIX).concat(l[t]);
          "NewsItem" === t && i && u({ res: n, code: 301, pathname: c }),
            f &&
              u({ res: n, code: 301, pathname: "".concat(E, "/").concat(f) }),
            404 === r && u({ res: n, code: 303, pathname: d }),
            401 === r && u({ res: n, code: 200, pathname: "/community" }),
            999 === r && u({ res: n, code: 301, pathname: d });
        },
        p = function (e) {
          var t = e.clientConfig;
          return t && t.isNewsActive ? "news" : "tutorials";
        },
        l = function (e) {
          var t = e.clientConfig;
          return "/community".concat(
            "news" === p({ clientConfig: t }) ? "" : "/tutorials"
          );
        };
    },
    QF3D: function (e, t, r) {
      var n = r("vxC8")(r("IBsm"), "DataView");
      e.exports = n;
    },
    QMz8: function (e, t, r) {
      var n = r("5pfJ"),
        o = Object.prototype.hasOwnProperty;
      e.exports = function (e) {
        var t = this.__data__;
        return n ? void 0 !== t[e] : o.call(t, e);
      };
    },
    QT01: function (e, t) {
      e.exports = function (e, t) {
        var r = -1,
          n = e.length;
        for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
        return t;
      };
    },
    Qd2C: function (e, t, r) {
      var n = r("7/jS"),
        o = r("SU8Q"),
        i = r("T6vp"),
        a = i && i.isTypedArray,
        c = a ? o(a) : n;
      e.exports = c;
    },
    "QsI/": function (e, t, r) {
      "use strict";
      function n(e, t, r, n, o, i, a) {
        try {
          var c = e[i](a),
            s = c.value;
        } catch (u) {
          return void r(u);
        }
        c.done ? t(s) : Promise.resolve(s).then(n, o);
      }
      function o(e) {
        return function () {
          var t = this,
            r = arguments;
          return new Promise(function (o, i) {
            var a = e.apply(t, r);
            function c(e) {
              n(a, o, i, c, s, "next", e);
            }
            function s(e) {
              n(a, o, i, c, s, "throw", e);
            }
            c(void 0);
          });
        };
      }
      r.d(t, "a", function () {
        return o;
      });
    },
    R3gn: function (e, t, r) {
      var n = r("Syyo"),
        o = r("mGzy"),
        i = r("pPzx"),
        a = r("ZZ+W"),
        c = r("aURW"),
        s = r("XlL0"),
        u = 1,
        f = 2,
        p = "[object Boolean]",
        l = "[object Date]",
        d = "[object Error]",
        E = "[object Map]",
        O = "[object Number]",
        _ = "[object RegExp]",
        S = "[object Set]",
        v = "[object String]",
        h = "[object Symbol]",
        y = "[object ArrayBuffer]",
        T = "[object DataView]",
        g = n ? n.prototype : void 0,
        b = g ? g.valueOf : void 0;
      e.exports = function (e, t, r, n, g, m, C) {
        switch (r) {
          case T:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            (e = e.buffer), (t = t.buffer);
          case y:
            return !(e.byteLength != t.byteLength || !m(new o(e), new o(t)));
          case p:
          case l:
          case O:
            return i(+e, +t);
          case d:
            return e.name == t.name && e.message == t.message;
          case _:
          case v:
            return e == t + "";
          case E:
            var A = c;
          case S:
            var R = n & u;
            if ((A || (A = s), e.size != t.size && !R)) return !1;
            var j = C.get(e);
            if (j) return j == t;
            (n |= f), C.set(e, t);
            var I = a(A(e), A(t), n, g, m, C);
            return C.delete(e), I;
          case h:
            if (b) return b.call(e) == b.call(t);
        }
        return !1;
      };
    },
    RNlM: function (e, t, r) {
      var n = r("+ooz");
      e.exports = function () {
        (this.__data__ = new n()), (this.size = 0);
      };
    },
    S0iI: function (e, t) {
      e.exports = function (e, t) {
        return e.has(t);
      };
    },
    SU8Q: function (e, t) {
      e.exports = function (e) {
        return function (t) {
          return e(t);
        };
      };
    },
    SoOq: function (e, t, r) {
      var n = r("0+aC"),
        o =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        i = /\\(\\)?/g,
        a = n(function (e) {
          var t = [];
          return (
            46 === e.charCodeAt(0) && t.push(""),
            e.replace(o, function (e, r, n, o) {
              t.push(n ? o.replace(i, "$1") : r || e);
            }),
            t
          );
        });
      e.exports = a;
    },
    Syyo: function (e, t, r) {
      var n = r("IBsm").Symbol;
      e.exports = n;
    },
    T6vp: function (e, t, r) {
      (function (e) {
        var n = r("e93E"),
          o = t && !t.nodeType && t,
          i = o && "object" == typeof e && e && !e.nodeType && e,
          a = i && i.exports === o && n.process,
          c = (function () {
            try {
              var e = i && i.require && i.require("util").types;
              return e || (a && a.binding && a.binding("util"));
            } catch (t) {}
          })();
        e.exports = c;
      }.call(this, r("aYSr")(e)));
    },
    TAtK: function (e, t) {
      e.exports = function (e, t) {
        return function (r) {
          return e(t(r));
        };
      };
    },
    Tv3l: function (e, t, r) {
      var n = r("2Fbm"),
        o = r("VPai"),
        i = r("+fUG"),
        a = r("QMz8"),
        c = r("mUsV");
      function s(e) {
        var t = -1,
          r = null == e ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      (s.prototype.clear = n),
        (s.prototype.delete = o),
        (s.prototype.get = i),
        (s.prototype.has = a),
        (s.prototype.set = c),
        (e.exports = s);
    },
    UM5q: function (e, t, r) {
      "use strict";
      e.exports = (e) =>
        encodeURIComponent(e).replace(
          /[!'()*]/g,
          (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`
        );
    },
    VPai: function (e, t) {
      e.exports = function (e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
      };
    },
    VtSi: function (e, t, r) {
      e.exports = r("3yYM");
    },
    W0vE: function (e, t) {
      e.exports = function (e, t) {
        for (
          var r = -1, n = null == e ? 0 : e.length, o = 0, i = [];
          ++r < n;

        ) {
          var a = e[r];
          t(a, r, e) && (i[o++] = a);
        }
        return i;
      };
    },
    X4R2: function (e, t) {
      e.exports = function () {
        return [];
      };
    },
    XlL0: function (e, t) {
      e.exports = function (e) {
        var t = -1,
          r = Array(e.size);
        return (
          e.forEach(function (e) {
            r[++t] = e;
          }),
          r
        );
      };
    },
    Ypsa: function (e, t, r) {
      var n = r("a88S"),
        o = 1 / 0;
      e.exports = function (e) {
        if ("string" == typeof e || n(e)) return e;
        var t = e + "";
        return "0" == t && 1 / e == -o ? "-0" : t;
      };
    },
    "ZZ+W": function (e, t, r) {
      var n = r("JBn+"),
        o = r("myUI"),
        i = r("S0iI"),
        a = 1,
        c = 2;
      e.exports = function (e, t, r, s, u, f) {
        var p = r & a,
          l = e.length,
          d = t.length;
        if (l != d && !(p && d > l)) return !1;
        var E = f.get(e);
        if (E && f.get(t)) return E == t;
        var O = -1,
          _ = !0,
          S = r & c ? new n() : void 0;
        for (f.set(e, t), f.set(t, e); ++O < l; ) {
          var v = e[O],
            h = t[O];
          if (s) var y = p ? s(h, v, O, t, e, f) : s(v, h, O, e, t, f);
          if (void 0 !== y) {
            if (y) continue;
            _ = !1;
            break;
          }
          if (S) {
            if (
              !o(t, function (e, t) {
                if (!i(S, t) && (v === e || u(v, e, r, s, f))) return S.push(t);
              })
            ) {
              _ = !1;
              break;
            }
          } else if (v !== h && !u(v, h, r, s, f)) {
            _ = !1;
            break;
          }
        }
        return f.delete(e), f.delete(t), _;
      };
    },
    a88S: function (e, t, r) {
      var n = r("Dhk8"),
        o = r("tLQN"),
        i = "[object Symbol]";
      e.exports = function (e) {
        return "symbol" == typeof e || (o(e) && n(e) == i);
      };
    },
    aURW: function (e, t) {
      e.exports = function (e) {
        var t = -1,
          r = Array(e.size);
        return (
          e.forEach(function (e, n) {
            r[++t] = [n, e];
          }),
          r
        );
      };
    },
    aYSr: function (e, t) {
      e.exports = function (e) {
        return (
          e.webpackPolyfill ||
            ((e.deprecate = function () {}),
            (e.paths = []),
            e.children || (e.children = []),
            Object.defineProperty(e, "loaded", {
              enumerable: !0,
              get: function () {
                return e.l;
              },
            }),
            Object.defineProperty(e, "id", {
              enumerable: !0,
              get: function () {
                return e.i;
              },
            }),
            (e.webpackPolyfill = 1)),
          e
        );
      };
    },
    bvyN: function (e, t, r) {
      var n = r("/30y"),
        o = r("tLQN"),
        i = Object.prototype,
        a = i.hasOwnProperty,
        c = i.propertyIsEnumerable,
        s = n(
          (function () {
            return arguments;
          })()
        )
          ? n
          : function (e) {
              return o(e) && a.call(e, "callee") && !c.call(e, "callee");
            };
      e.exports = s;
    },
    c18h: function (e, t) {
      var r = Function.prototype.toString;
      e.exports = function (e) {
        if (null != e) {
          try {
            return r.call(e);
          } catch (t) {}
          try {
            return e + "";
          } catch (t) {}
        }
        return "";
      };
    },
    cEmw: function (e, t) {
      e.exports = function (e) {
        return this.__data__.has(e);
      };
    },
    cxan: function (e, t, r) {
      "use strict";
      function n() {
        return (n =
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
      r.d(t, "a", function () {
        return n;
      });
    },
    cyaT: function (e, t) {
      e.exports = function (e) {
        if (!e.webpackPolyfill) {
          var t = Object.create(e);
          t.children || (t.children = []),
            Object.defineProperty(t, "loaded", {
              enumerable: !0,
              get: function () {
                return t.l;
              },
            }),
            Object.defineProperty(t, "id", {
              enumerable: !0,
              get: function () {
                return t.i;
              },
            }),
            Object.defineProperty(t, "exports", { enumerable: !0 }),
            (t.webpackPolyfill = 1);
        }
        return t;
      };
    },
    d0UJ: function (e, t, r) {
      var n = r("JNqh");
      e.exports = function (e) {
        var t = n(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
      };
    },
    dw5g: function (e, t, r) {
      var n = r("JcJ6");
      e.exports = function (e) {
        return null == e ? "" : n(e);
      };
    },
    e63W: function (e, t, r) {
      var n = r("JNqh");
      e.exports = function (e, t) {
        var r = n(this, e),
          o = r.size;
        return r.set(e, t), (this.size += r.size == o ? 0 : 1), this;
      };
    },
    e93E: function (e, t, r) {
      (function (t) {
        var r = "object" == typeof t && t && t.Object === Object && t;
        e.exports = r;
      }.call(this, r("fRV1")));
    },
    eask: function (e, t, r) {
      var n = r("JNqh");
      e.exports = function (e) {
        return n(this, e).get(e);
      };
    },
    fRV1: function (e, t) {
      var r;
      r = (function () {
        return this;
      })();
      try {
        r = r || new Function("return this")();
      } catch (n) {
        "object" === typeof window && (r = window);
      }
      e.exports = r;
    },
    "hE+J": function (e, t, r) {
      "use strict";
      (function (e, n) {
        var o,
          i = r("KrFp");
        o =
          "undefined" !== typeof self
            ? self
            : "undefined" !== typeof window
            ? window
            : "undefined" !== typeof e
            ? e
            : n;
        var a = Object(i.a)(o);
        t.a = a;
      }.call(this, r("fRV1"), r("cyaT")(e)));
    },
    hTPx: function (e, t, r) {
      "use strict";
      var n = "function" === typeof Symbol && Symbol.for,
        o = n ? Symbol.for("react.element") : 60103,
        i = n ? Symbol.for("react.portal") : 60106,
        a = n ? Symbol.for("react.fragment") : 60107,
        c = n ? Symbol.for("react.strict_mode") : 60108,
        s = n ? Symbol.for("react.profiler") : 60114,
        u = n ? Symbol.for("react.provider") : 60109,
        f = n ? Symbol.for("react.context") : 60110,
        p = n ? Symbol.for("react.async_mode") : 60111,
        l = n ? Symbol.for("react.concurrent_mode") : 60111,
        d = n ? Symbol.for("react.forward_ref") : 60112,
        E = n ? Symbol.for("react.suspense") : 60113,
        O = n ? Symbol.for("react.suspense_list") : 60120,
        _ = n ? Symbol.for("react.memo") : 60115,
        S = n ? Symbol.for("react.lazy") : 60116,
        v = n ? Symbol.for("react.block") : 60121,
        h = n ? Symbol.for("react.fundamental") : 60117,
        y = n ? Symbol.for("react.responder") : 60118,
        T = n ? Symbol.for("react.scope") : 60119;
      function g(e) {
        if ("object" === typeof e && null !== e) {
          var t = e.$$typeof;
          switch (t) {
            case o:
              switch ((e = e.type)) {
                case p:
                case l:
                case a:
                case s:
                case c:
                case E:
                  return e;
                default:
                  switch ((e = e && e.$$typeof)) {
                    case f:
                    case d:
                    case S:
                    case _:
                    case u:
                      return e;
                    default:
                      return t;
                  }
              }
            case i:
              return t;
          }
        }
      }
      function b(e) {
        return g(e) === l;
      }
      (t.AsyncMode = p),
        (t.ConcurrentMode = l),
        (t.ContextConsumer = f),
        (t.ContextProvider = u),
        (t.Element = o),
        (t.ForwardRef = d),
        (t.Fragment = a),
        (t.Lazy = S),
        (t.Memo = _),
        (t.Portal = i),
        (t.Profiler = s),
        (t.StrictMode = c),
        (t.Suspense = E),
        (t.isAsyncMode = function (e) {
          return b(e) || g(e) === p;
        }),
        (t.isConcurrentMode = b),
        (t.isContextConsumer = function (e) {
          return g(e) === f;
        }),
        (t.isContextProvider = function (e) {
          return g(e) === u;
        }),
        (t.isElement = function (e) {
          return "object" === typeof e && null !== e && e.$$typeof === o;
        }),
        (t.isForwardRef = function (e) {
          return g(e) === d;
        }),
        (t.isFragment = function (e) {
          return g(e) === a;
        }),
        (t.isLazy = function (e) {
          return g(e) === S;
        }),
        (t.isMemo = function (e) {
          return g(e) === _;
        }),
        (t.isPortal = function (e) {
          return g(e) === i;
        }),
        (t.isProfiler = function (e) {
          return g(e) === s;
        }),
        (t.isStrictMode = function (e) {
          return g(e) === c;
        }),
        (t.isSuspense = function (e) {
          return g(e) === E;
        }),
        (t.isValidElementType = function (e) {
          return (
            "string" === typeof e ||
            "function" === typeof e ||
            e === a ||
            e === l ||
            e === s ||
            e === c ||
            e === E ||
            e === O ||
            ("object" === typeof e &&
              null !== e &&
              (e.$$typeof === S ||
                e.$$typeof === _ ||
                e.$$typeof === u ||
                e.$$typeof === f ||
                e.$$typeof === d ||
                e.$$typeof === h ||
                e.$$typeof === y ||
                e.$$typeof === T ||
                e.$$typeof === v))
          );
        }),
        (t.typeOf = g);
    },
    hyzI: function (e, t, r) {
      var n = r("m5o6"),
        o = r("d0UJ"),
        i = r("eask"),
        a = r("9SKQ"),
        c = r("e63W");
      function s(e) {
        var t = -1,
          r = null == e ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      (s.prototype.clear = n),
        (s.prototype.delete = o),
        (s.prototype.get = i),
        (s.prototype.has = a),
        (s.prototype.set = c),
        (e.exports = s);
    },
    kCXf: function (e, t, r) {
      "use strict";
      r.d(t, "J", function () {
        return n;
      }),
        r.d(t, "a", function () {
          return o;
        }),
        r.d(t, "b", function () {
          return i;
        }),
        r.d(t, "c", function () {
          return a;
        }),
        r.d(t, "d", function () {
          return c;
        }),
        r.d(t, "e", function () {
          return s;
        }),
        r.d(t, "f", function () {
          return u;
        }),
        r.d(t, "g", function () {
          return f;
        }),
        r.d(t, "h", function () {
          return p;
        }),
        r.d(t, "j", function () {
          return l;
        }),
        r.d(t, "i", function () {
          return d;
        }),
        r.d(t, "k", function () {
          return E;
        }),
        r.d(t, "l", function () {
          return O;
        }),
        r.d(t, "m", function () {
          return _;
        }),
        r.d(t, "o", function () {
          return S;
        }),
        r.d(t, "p", function () {
          return v;
        }),
        r.d(t, "q", function () {
          return h;
        }),
        r.d(t, "n", function () {
          return y;
        }),
        r.d(t, "r", function () {
          return T;
        }),
        r.d(t, "s", function () {
          return g;
        }),
        r.d(t, "t", function () {
          return b;
        }),
        r.d(t, "u", function () {
          return m;
        }),
        r.d(t, "v", function () {
          return C;
        }),
        r.d(t, "w", function () {
          return A;
        }),
        r.d(t, "x", function () {
          return R;
        }),
        r.d(t, "y", function () {
          return j;
        }),
        r.d(t, "z", function () {
          return I;
        }),
        r.d(t, "A", function () {
          return N;
        }),
        r.d(t, "B", function () {
          return w;
        }),
        r.d(t, "C", function () {
          return M;
        }),
        r.d(t, "D", function () {
          return U;
        }),
        r.d(t, "E", function () {
          return P;
        }),
        r.d(t, "F", function () {
          return F;
        }),
        r.d(t, "G", function () {
          return D;
        }),
        r.d(t, "H", function () {
          return L;
        }),
        r.d(t, "I", function () {
          return x;
        });
      var n = "@@redux-form/",
        o = n + "ARRAY_INSERT",
        i = n + "ARRAY_MOVE",
        a = n + "ARRAY_POP",
        c = n + "ARRAY_PUSH",
        s = n + "ARRAY_REMOVE",
        u = n + "ARRAY_REMOVE_ALL",
        f = n + "ARRAY_SHIFT",
        p = n + "ARRAY_SPLICE",
        l = n + "ARRAY_UNSHIFT",
        d = n + "ARRAY_SWAP",
        E = n + "AUTOFILL",
        O = n + "BLUR",
        _ = n + "CHANGE",
        S = n + "CLEAR_FIELDS",
        v = n + "CLEAR_SUBMIT",
        h = n + "CLEAR_SUBMIT_ERRORS",
        y = n + "CLEAR_ASYNC_ERROR",
        T = n + "DESTROY",
        g = n + "FOCUS",
        b = n + "INITIALIZE",
        m = n + "REGISTER_FIELD",
        C = n + "RESET",
        A = n + "RESET_SECTION",
        R = n + "SET_SUBMIT_FAILED",
        j = n + "SET_SUBMIT_SUCCEEDED",
        I = n + "START_ASYNC_VALIDATION",
        N = n + "START_SUBMIT",
        w = n + "STOP_ASYNC_VALIDATION",
        M = n + "STOP_SUBMIT",
        U = n + "SUBMIT",
        P = n + "TOUCH",
        F = n + "UNREGISTER_FIELD",
        D = n + "UNTOUCH",
        L = n + "UPDATE_SYNC_ERRORS",
        x = n + "UPDATE_SYNC_WARNINGS";
    },
    kHoZ: function (e, t) {
      var r = Object.prototype.toString;
      e.exports = function (e) {
        return r.call(e);
      };
    },
    "kkM+": function (e, t, r) {
      var n = r("QF3D"),
        o = r("qeCs"),
        i = r("IS0S"),
        a = r("OBn4"),
        c = r("4+Vk"),
        s = r("Dhk8"),
        u = r("c18h"),
        f = u(n),
        p = u(o),
        l = u(i),
        d = u(a),
        E = u(c),
        O = s;
      ((n && "[object DataView]" != O(new n(new ArrayBuffer(1)))) ||
        (o && "[object Map]" != O(new o())) ||
        (i && "[object Promise]" != O(i.resolve())) ||
        (a && "[object Set]" != O(new a())) ||
        (c && "[object WeakMap]" != O(new c()))) &&
        (O = function (e) {
          var t = s(e),
            r = "[object Object]" == t ? e.constructor : void 0,
            n = r ? u(r) : "";
          if (n)
            switch (n) {
              case f:
                return "[object DataView]";
              case p:
                return "[object Map]";
              case l:
                return "[object Promise]";
              case d:
                return "[object Set]";
              case E:
                return "[object WeakMap]";
            }
          return t;
        }),
        (e.exports = O);
    },
    kvVz: function (e, t, r) {
      "use strict";
      e.exports = r("hTPx");
    },
    kwr2: function (e, t, r) {
      var n = r("6QIk"),
        o = Array.prototype.splice;
      e.exports = function (e) {
        var t = this.__data__,
          r = n(t, e);
        return (
          !(r < 0) &&
          (r == t.length - 1 ? t.pop() : o.call(t, r, 1), --this.size, !0)
        );
      };
    },
    lyo6: function (e, t, r) {
      "use strict";
      (function (e) {
        r.d(t, "a", function () {
          return o;
        });
        var n = (function () {
            try {
              return "".concat(window.location.origin, "/community");
            } catch (t) {
              return "http://localhost:".concat(
                e.env.PORT || 3e3,
                "/community"
              );
            }
          })(),
          o = "".concat(n).concat("/api");
      }.call(this, r("F63i")));
    },
    m5o6: function (e, t, r) {
      var n = r("Tv3l"),
        o = r("+ooz"),
        i = r("qeCs");
      e.exports = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new n(),
            map: new (i || o)(),
            string: new n(),
          });
      };
    },
    mGzy: function (e, t, r) {
      var n = r("IBsm").Uint8Array;
      e.exports = n;
    },
    mUsV: function (e, t, r) {
      var n = r("5pfJ"),
        o = "__lodash_hash_undefined__";
      e.exports = function (e, t) {
        var r = this.__data__;
        return (
          (this.size += this.has(e) ? 0 : 1),
          (r[e] = n && void 0 === t ? o : t),
          this
        );
      };
    },
    myUI: function (e, t) {
      e.exports = function (e, t) {
        for (var r = -1, n = null == e ? 0 : e.length; ++r < n; )
          if (t(e[r], r, e)) return !0;
        return !1;
      };
    },
    oXkQ: function (e, t, r) {
      "use strict";
      var n = r("kvVz"),
        o = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0,
        },
        i = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0,
        },
        a = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0,
        },
        c = {};
      function s(e) {
        return n.isMemo(e) ? a : c[e.$$typeof] || o;
      }
      (c[n.ForwardRef] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      }),
        (c[n.Memo] = a);
      var u = Object.defineProperty,
        f = Object.getOwnPropertyNames,
        p = Object.getOwnPropertySymbols,
        l = Object.getOwnPropertyDescriptor,
        d = Object.getPrototypeOf,
        E = Object.prototype;
      e.exports = function e(t, r, n) {
        if ("string" !== typeof r) {
          if (E) {
            var o = d(r);
            o && o !== E && e(t, o, n);
          }
          var a = f(r);
          p && (a = a.concat(p(r)));
          for (var c = s(t), O = s(r), _ = 0; _ < a.length; ++_) {
            var S = a[_];
            if (!i[S] && (!n || !n[S]) && (!O || !O[S]) && (!c || !c[S])) {
              var v = l(r, S);
              try {
                u(t, S, v);
              } catch (h) {}
            }
          }
        }
        return t;
      };
    },
    "p/5q": function (e, t, r) {
      var n,
        o = r("ERkP"),
        i = r("uDfI"),
        a = r("u/d6"),
        c = i.connect,
        s = i.Provider,
        u = !1,
        f = ["initialState", "initialProps", "isServer", "store"],
        p = "undefined" !== typeof window;
      function l(e, t, r, n) {
        var o = r.req,
          i = !!o && !p,
          c = n.storeKey,
          s = a({}, n, { isServer: i, req: o, res: r.res, query: r.query });
        return i
          ? (o._store || (o._store = e(t, s)), o._store)
          : p
          ? (window[c] || (window[c] = e(t, s)), window[c])
          : null;
      }
      (e.exports = function (e) {
        var t,
          r = { storeKey: "__NEXT_REDUX_STORE__", debug: u };
        if ("object" === typeof e) {
          var i = e;
          if (!{}.hasOwnProperty.call(i, "createStore"))
            throw new Error("Missing createStore function");
          (e = i.createStore),
            {}.hasOwnProperty.call(i, "debug") && (r.debug = i.debug),
            {}.hasOwnProperty.call(i, "storeKey") && (r.storeKey = i.storeKey),
            (t = [
              i.mapStateToProps || void 0,
              i.mapDispatchToProps || void 0,
              i.mergeProps || void 0,
              i.connectOptions || void 0,
            ]);
        } else t = [].slice.call(arguments).slice(1);
        return function (i) {
          var a = c.apply(null, t)(i);
          function u(t) {
            var n = (t = t || {}).initialState || {},
              c = t.initialProps || {},
              u = t.store && t.store.dispatch && t.store.getState,
              p = u ? t.store : l(e, n, {}, r);
            if (!p)
              return (
                console.error(
                  "Attention, withRedux has to be used only for top level pages, all other components must be wrapped with React Redux connect!"
                ),
                console.error("Check " + i.name + " component."),
                console.error(
                  "Automatic fallback to connect has been performed, please check your code."
                ),
                o.createElement(a, t)
              );
            r.debug &&
              console.log(
                i.name,
                "- 4. WrappedCmp.render",
                u ? "picked up existing one," : "created new store with",
                "initialState",
                n
              );
            var d = {};
            return (
              Object.keys(t).forEach(function (e) {
                ~f.indexOf(e) || (d[e] = t[e]);
              }),
              Object.keys(c || {}).forEach(function (e) {
                d[e] = c[e];
              }),
              o.createElement(s, { store: p }, o.createElement(a, d))
            );
          }
          return (
            (u.getInitialProps = function (t) {
              return new n(function (o) {
                (t = t || {}),
                  r.debug &&
                    console.log(
                      i.name,
                      "- 1. WrappedCmp.getInitialProps wrapper",
                      t.req && t.req._store
                        ? "takes the req store"
                        : "creates the store"
                    ),
                  (t.isServer = !!t.req),
                  (t.store = l(
                    e,
                    void 0,
                    { req: t.req, query: t.query, res: t.res },
                    r
                  )),
                  o(
                    n.all([
                      t.isServer,
                      t.store,
                      t.req,
                      i.getInitialProps ? i.getInitialProps.call(i, t) : {},
                    ])
                  );
              }).then(function (e) {
                return (
                  r.debug &&
                    console.log(
                      i.name,
                      "- 3. WrappedCmp.getInitialProps has store state",
                      e[1].getState()
                    ),
                  {
                    isServer: e[0],
                    store: e[1],
                    initialState: e[1].getState(),
                    initialProps: e[3],
                  }
                );
              });
            }),
            u
          );
        };
      }),
        (e.exports.setPromise = function (e) {
          n = e;
        }),
        (e.exports.setDebug = function (e) {
          u = e;
        }),
        e.exports.setPromise(Promise);
    },
    "p/97": function (e, t, r) {
      "use strict";
      e.exports = (e, t) => {
        if ("string" !== typeof e || "string" !== typeof t)
          throw new TypeError("Expected the arguments to be of type `string`");
        if ("" === t) return [e];
        const r = e.indexOf(t);
        return -1 === r ? [e] : [e.slice(0, r), e.slice(r + t.length)];
      };
    },
    pFSi: function (e, t, r) {
      var n = r("hyzI"),
        o = "Expected a function";
      function i(e, t) {
        if ("function" != typeof e || (null != t && "function" != typeof t))
          throw new TypeError(o);
        var r = function () {
          var n = arguments,
            o = t ? t.apply(this, n) : n[0],
            i = r.cache;
          if (i.has(o)) return i.get(o);
          var a = e.apply(this, n);
          return (r.cache = i.set(o, a) || i), a;
        };
        return (r.cache = new (i.Cache || n)()), r;
      }
      (i.Cache = n), (e.exports = i);
    },
    pIod: function (e, t, r) {
      var n = r("y/9h"),
        o = r("wxYD");
      e.exports = function (e, t, r) {
        var i = t(e);
        return o(e) ? i : n(i, r(e));
      };
    },
    pPzx: function (e, t) {
      e.exports = function (e, t) {
        return e === t || (e !== e && t !== t);
      };
    },
    pWxA: function (e, t, r) {
      "use strict";
      function n(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      r.d(t, "a", function () {
        return n;
      });
    },
    pnw1: function (e, t) {
      var r = 9007199254740991,
        n = /^(?:0|[1-9]\d*)$/;
      e.exports = function (e, t) {
        var o = typeof e;
        return (
          !!(t = null == t ? r : t) &&
          ("number" == o || ("symbol" != o && n.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
        );
      };
    },
    qeCs: function (e, t, r) {
      var n = r("vxC8")(r("IBsm"), "Map");
      e.exports = n;
    },
    qjF7: function (e, t) {
      var r = "__lodash_hash_undefined__";
      e.exports = function (e) {
        return this.__data__.set(e, r), this;
      };
    },
    rieb: function (e, t, r) {
      "use strict";
      var n = function (e, t, r, n) {
          if (t < (e = e || []).length) {
            if (void 0 === n && !r) {
              var o = [].concat(e);
              return o.splice(t, 0, !0), (o[t] = void 0), o;
            }
            if (null != n) {
              var i = [].concat(e);
              return i.splice(t, r, n), i;
            }
            var a = [].concat(e);
            return a.splice(t, r), a;
          }
          if (r) return e;
          var c = [].concat(e);
          return (c[t] = n), c;
        },
        o = r("ND9x"),
        i = r.n(o),
        a = function (e, t) {
          if (!e) return e;
          var r = i()(t),
            n = r.length;
          if (n) {
            for (var o = e, a = 0; a < n && o; ++a) o = o[r[a]];
            return o;
          }
        },
        c = r("97Jx"),
        s = r.n(c),
        u = function (e, t, r) {
          return (function e(t, r, n, o) {
            var i;
            if (o >= n.length) return r;
            var a = n[o],
              c = e(t && (Array.isArray(t) ? t[Number(a)] : t[a]), r, n, o + 1);
            if (!t) {
              var u;
              if (isNaN(a)) return ((u = {})[a] = c), u;
              var f = [];
              return (f[parseInt(a, 10)] = c), f;
            }
            if (Array.isArray(t)) {
              var p = [].concat(t);
              return (p[parseInt(a, 10)] = c), p;
            }
            return s()({}, t, (((i = {})[a] = c), i));
          })(e, r, i()(t), 0);
        },
        f = r("2Lg3"),
        p = r.n(f),
        l = r("6OdC"),
        d = r.n(l),
        E = r("ERkP"),
        O = r.n(E),
        _ = function (e) {
          return p()(e) || "" === e || isNaN(e);
        },
        S = function (e, t) {
          return (
            e === t ||
            (e || t
              ? (!e || !t || e._error === t._error) &&
                (!e || !t || e._warning === t._warning) &&
                !O.a.isValidElement(e) &&
                !O.a.isValidElement(t) &&
                void 0
              : _(e) === _(t))
          );
        };
      function v(e, t) {
        if (void 0 === e || null === e || void 0 === t || null === t) return e;
        for (
          var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), o = 2;
          o < r;
          o++
        )
          n[o - 2] = arguments[o];
        if (n.length) {
          if (Array.isArray(e)) {
            if (isNaN(t))
              throw new Error(
                'Must access array elements with a number, not "' +
                  String(t) +
                  '".'
              );
            var i = Number(t);
            if (i < e.length) {
              var a = v.apply(void 0, [e && e[i]].concat(n));
              if (a !== e[i]) {
                var c = [].concat(e);
                return (c[i] = a), c;
              }
            }
            return e;
          }
          if (t in e) {
            var u,
              f = v.apply(void 0, [e && e[t]].concat(n));
            return e[t] === f ? e : s()({}, e, (((u = {})[t] = f), u));
          }
          return e;
        }
        if (Array.isArray(e)) {
          if (isNaN(t))
            throw new Error(
              'Cannot delete non-numerical index from an array. Given: "' +
                String(t)
            );
          var p = Number(t);
          if (p < e.length) {
            var l = [].concat(e);
            return l.splice(p, 1), l;
          }
          return e;
        }
        if (t in e) {
          var d = s()({}, e);
          return delete d[t], d;
        }
        return e;
      }
      var h = {
        allowsArrayErrors: !0,
        empty: {},
        emptyList: [],
        getIn: a,
        setIn: u,
        deepEqual: function (e, t) {
          return d()(e, t, S);
        },
        deleteIn: function (e, t) {
          return v.apply(void 0, [e].concat(i()(t)));
        },
        forEach: function (e, t) {
          return e.forEach(t);
        },
        fromJS: function (e) {
          return e;
        },
        keys: function (e) {
          return e
            ? Array.isArray(e)
              ? e.map(function (e) {
                  return e.name;
                })
              : Object.keys(e)
            : [];
        },
        size: function (e) {
          return e ? e.length : 0;
        },
        some: function (e, t) {
          return e.some(t);
        },
        splice: n,
        equals: function (e, t) {
          return t.every(function (t) {
            return ~e.indexOf(t);
          });
        },
        orderChanged: function (e, t) {
          return t.some(function (t, r) {
            return t !== e[r];
          });
        },
        toJS: function (e) {
          return e;
        },
      };
      t.a = h;
    },
    rmhs: function (e, t, r) {
      var n = r("2ZvR"),
        o = r("bvyN"),
        i = r("wxYD"),
        a = r("3ajY"),
        c = r("pnw1"),
        s = r("Qd2C"),
        u = Object.prototype.hasOwnProperty;
      e.exports = function (e, t) {
        var r = i(e),
          f = !r && o(e),
          p = !r && !f && a(e),
          l = !r && !f && !p && s(e),
          d = r || f || p || l,
          E = d ? n(e.length, String) : [],
          O = E.length;
        for (var _ in e)
          (!t && !u.call(e, _)) ||
            (d &&
              ("length" == _ ||
                (p && ("offset" == _ || "parent" == _)) ||
                (l &&
                  ("buffer" == _ || "byteLength" == _ || "byteOffset" == _)) ||
                c(_, O))) ||
            E.push(_);
        return E;
      };
    },
    s9SB: function (e, t, r) {
      "use strict";
      (t.parse = function (e, t) {
        if ("string" !== typeof e)
          throw new TypeError("argument str must be a string");
        for (
          var r = {}, o = t || {}, a = e.split(i), s = o.decode || n, u = 0;
          u < a.length;
          u++
        ) {
          var f = a[u],
            p = f.indexOf("=");
          if (!(p < 0)) {
            var l = f.substr(0, p).trim(),
              d = f.substr(++p, f.length).trim();
            '"' == d[0] && (d = d.slice(1, -1)),
              void 0 == r[l] && (r[l] = c(d, s));
          }
        }
        return r;
      }),
        (t.serialize = function (e, t, r) {
          var n = r || {},
            i = n.encode || o;
          if ("function" !== typeof i)
            throw new TypeError("option encode is invalid");
          if (!a.test(e)) throw new TypeError("argument name is invalid");
          var c = i(t);
          if (c && !a.test(c)) throw new TypeError("argument val is invalid");
          var s = e + "=" + c;
          if (null != n.maxAge) {
            var u = n.maxAge - 0;
            if (isNaN(u) || !isFinite(u))
              throw new TypeError("option maxAge is invalid");
            s += "; Max-Age=" + Math.floor(u);
          }
          if (n.domain) {
            if (!a.test(n.domain))
              throw new TypeError("option domain is invalid");
            s += "; Domain=" + n.domain;
          }
          if (n.path) {
            if (!a.test(n.path)) throw new TypeError("option path is invalid");
            s += "; Path=" + n.path;
          }
          if (n.expires) {
            if ("function" !== typeof n.expires.toUTCString)
              throw new TypeError("option expires is invalid");
            s += "; Expires=" + n.expires.toUTCString();
          }
          n.httpOnly && (s += "; HttpOnly");
          n.secure && (s += "; Secure");
          if (n.sameSite) {
            switch (
              "string" === typeof n.sameSite
                ? n.sameSite.toLowerCase()
                : n.sameSite
            ) {
              case !0:
                s += "; SameSite=Strict";
                break;
              case "lax":
                s += "; SameSite=Lax";
                break;
              case "strict":
                s += "; SameSite=Strict";
                break;
              case "none":
                s += "; SameSite=None";
                break;
              default:
                throw new TypeError("option sameSite is invalid");
            }
          }
          return s;
        });
      var n = decodeURIComponent,
        o = encodeURIComponent,
        i = /; */,
        a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function c(e, t) {
        try {
          return t(e);
        } catch (r) {
          return e;
        }
      }
    },
    sRHE: function (e, t, r) {
      "use strict";
      function n(e) {
        return (n = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      r.d(t, "a", function () {
        return n;
      });
    },
    slGX: function (e, t, r) {
      "use strict";
      r.d(t, "b", function () {
        return f;
      }),
        r.d(t, "a", function () {
          return p;
        });
      var n = r("zjfJ"),
        o = r("s9SB");
      function i(e, t) {
        void 0 === t && (t = {});
        var r = (function (e) {
          if (e && "j" === e[0] && ":" === e[1]) return e.substr(2);
          return e;
        })(e);
        if (
          (function (e, t) {
            return (
              "undefined" === typeof t &&
                (t = !e || ("{" !== e[0] && "[" !== e[0] && '"' !== e[0])),
              !t
            );
          })(r, t.doNotParse)
        )
          try {
            return JSON.parse(r);
          } catch (n) {}
        return e;
      }
      var a = r("Km8e"),
        c = (function () {
          function e(e, t) {
            var r = this;
            (this.changeListeners = []),
              (this.HAS_DOCUMENT_COOKIE = !1),
              (this.cookies = (function (e, t) {
                return "string" === typeof e
                  ? o.parse(e, t)
                  : "object" === typeof e && null !== e
                  ? e
                  : {};
              })(e, t)),
              new Promise(function () {
                r.HAS_DOCUMENT_COOKIE =
                  "object" === typeof document &&
                  "string" === typeof document.cookie;
              }).catch(function () {});
          }
          return (
            (e.prototype._updateBrowserValues = function (e) {
              this.HAS_DOCUMENT_COOKIE &&
                (this.cookies = o.parse(document.cookie, e));
            }),
            (e.prototype._emitChange = function (e) {
              for (var t = 0; t < this.changeListeners.length; ++t)
                this.changeListeners[t](e);
            }),
            (e.prototype.get = function (e, t, r) {
              return (
                void 0 === t && (t = {}),
                this._updateBrowserValues(r),
                i(this.cookies[e], t)
              );
            }),
            (e.prototype.getAll = function (e, t) {
              void 0 === e && (e = {}), this._updateBrowserValues(t);
              var r = {};
              for (var n in this.cookies) r[n] = i(this.cookies[n], e);
              return r;
            }),
            (e.prototype.set = function (e, t, r) {
              var n;
              "object" === typeof t && (t = JSON.stringify(t)),
                (this.cookies = a({}, this.cookies, (((n = {})[e] = t), n))),
                this.HAS_DOCUMENT_COOKIE &&
                  (document.cookie = o.serialize(e, t, r)),
                this._emitChange({ name: e, value: t, options: r });
            }),
            (e.prototype.remove = function (e, t) {
              var r = (t = a({}, t, {
                expires: new Date(1970, 1, 1, 0, 0, 1),
                maxAge: 0,
              }));
              (this.cookies = a({}, this.cookies)),
                delete this.cookies[e],
                this.HAS_DOCUMENT_COOKIE &&
                  (document.cookie = o.serialize(e, "", r)),
                this._emitChange({ name: e, value: void 0, options: t });
            }),
            (e.prototype.addChangeListener = function (e) {
              this.changeListeners.push(e);
            }),
            (e.prototype.removeChangeListener = function (e) {
              var t = this.changeListeners.indexOf(e);
              t >= 0 && this.changeListeners.splice(t, 1);
            }),
            e
          );
        })();
      function s(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? s(Object(r), !0).forEach(function (t) {
                Object(n.a)(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : s(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      var f = function (e) {
          var t = e.clientConfig,
            r = e.auth;
          if (
            t.ANALYTICS_SNOWPLOW_ENDPOINT &&
            "function" === typeof window.snowplow
          ) {
            var n = new c(),
              o = {
                schema: "iglu:com.datacamp/user/jsonschema/1-0-0",
                data: {
                  userId: r.user.id && r.user.id.toString(),
                  anonId: n.get("dc_aid"),
                },
              };
            r.isAuthorized || delete o.data.userId,
              window.snowplow("trackPageView", null, [o]);
          }
        },
        p = function (e) {
          e.clientConfig;
          var t = e.gtmEvent;
          window.dataLayer || (window.dataLayer = []),
            window.dataLayer.push(
              u(u({ gtm_version: 2 }, window.dataLayer[0]), t)
            );
        };
    },
    t0L4: function (e, t) {
      var r = 9007199254740991;
      e.exports = function (e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= r;
      };
    },
    tLQN: function (e, t) {
      e.exports = function (e) {
        return null != e && "object" == typeof e;
      };
    },
    tNLw: function (e, t, r) {
      r("I0vN"), (e.exports = self.fetch.bind(self));
    },
    tQYX: function (e, t) {
      e.exports = function (e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t);
      };
    },
    tlBq: function (e, t, r) {
      var n = r("pIod"),
        o = r("70Le"),
        i = r("BlJA");
      e.exports = function (e) {
        return n(e, i, o);
      };
    },
    "u/d6": function (e, t, r) {
      "use strict";
      var n = Object.assign.bind(Object);
      function o() {
        return n;
      }
      Object.defineProperties(o(), {
        implementation: { get: o },
        shim: { value: o },
        getPolyfill: { value: o },
      }),
        (e.exports = o());
    },
    uDfI: function (e, t, r) {
      "use strict";
      r.r(t),
        r.d(t, "Provider", function () {
          return f;
        }),
        r.d(t, "connectAdvanced", function () {
          return m;
        }),
        r.d(t, "ReactReduxContext", function () {
          return i;
        }),
        r.d(t, "connect", function () {
          return G;
        }),
        r.d(t, "batch", function () {
          return K.unstable_batchedUpdates;
        }),
        r.d(t, "useDispatch", function () {
          return W;
        }),
        r.d(t, "createDispatchHook", function () {
          return q;
        }),
        r.d(t, "useSelector", function () {
          return $;
        }),
        r.d(t, "createSelectorHook", function () {
          return J;
        }),
        r.d(t, "useStore", function () {
          return V;
        }),
        r.d(t, "createStoreHook", function () {
          return Q;
        }),
        r.d(t, "shallowEqual", function () {
          return A;
        });
      var n = r("ERkP"),
        o = r.n(n),
        i = (r("aWzz"), o.a.createContext(null));
      var a = function (e) {
          e();
        },
        c = function () {
          return a;
        },
        s = { notify: function () {} };
      var u = (function () {
        function e(e, t) {
          (this.store = e),
            (this.parentSub = t),
            (this.unsubscribe = null),
            (this.listeners = s),
            (this.handleChangeWrapper = this.handleChangeWrapper.bind(this));
        }
        var t = e.prototype;
        return (
          (t.addNestedSub = function (e) {
            return this.trySubscribe(), this.listeners.subscribe(e);
          }),
          (t.notifyNestedSubs = function () {
            this.listeners.notify();
          }),
          (t.handleChangeWrapper = function () {
            this.onStateChange && this.onStateChange();
          }),
          (t.isSubscribed = function () {
            return Boolean(this.unsubscribe);
          }),
          (t.trySubscribe = function () {
            this.unsubscribe ||
              ((this.unsubscribe = this.parentSub
                ? this.parentSub.addNestedSub(this.handleChangeWrapper)
                : this.store.subscribe(this.handleChangeWrapper)),
              (this.listeners = (function () {
                var e = c(),
                  t = null,
                  r = null;
                return {
                  clear: function () {
                    (t = null), (r = null);
                  },
                  notify: function () {
                    e(function () {
                      for (var e = t; e; ) e.callback(), (e = e.next);
                    });
                  },
                  get: function () {
                    for (var e = [], r = t; r; ) e.push(r), (r = r.next);
                    return e;
                  },
                  subscribe: function (e) {
                    var n = !0,
                      o = (r = { callback: e, next: null, prev: r });
                    return (
                      o.prev ? (o.prev.next = o) : (t = o),
                      function () {
                        n &&
                          null !== t &&
                          ((n = !1),
                          o.next ? (o.next.prev = o.prev) : (r = o.prev),
                          o.prev ? (o.prev.next = o.next) : (t = o.next));
                      }
                    );
                  },
                };
              })()));
          }),
          (t.tryUnsubscribe = function () {
            this.unsubscribe &&
              (this.unsubscribe(),
              (this.unsubscribe = null),
              this.listeners.clear(),
              (this.listeners = s));
          }),
          e
        );
      })();
      var f = function (e) {
          var t = e.store,
            r = e.context,
            a = e.children,
            c = Object(n.useMemo)(
              function () {
                var e = new u(t);
                return (
                  (e.onStateChange = e.notifyNestedSubs),
                  { store: t, subscription: e }
                );
              },
              [t]
            ),
            s = Object(n.useMemo)(
              function () {
                return t.getState();
              },
              [t]
            );
          Object(n.useEffect)(
            function () {
              var e = c.subscription;
              return (
                e.trySubscribe(),
                s !== t.getState() && e.notifyNestedSubs(),
                function () {
                  e.tryUnsubscribe(), (e.onStateChange = null);
                }
              );
            },
            [c, s]
          );
          var f = r || i;
          return o.a.createElement(f.Provider, { value: c }, a);
        },
        p = r("cxan"),
        l = r("+wNj"),
        d = r("oXkQ"),
        E = r.n(d),
        O = r("kvVz"),
        _ =
          "undefined" !== typeof window &&
          "undefined" !== typeof window.document &&
          "undefined" !== typeof window.document.createElement
            ? n.useLayoutEffect
            : n.useEffect,
        S = [],
        v = [null, null];
      function h(e, t) {
        var r = e[1];
        return [t.payload, r + 1];
      }
      function y(e, t, r) {
        _(function () {
          return e.apply(void 0, t);
        }, r);
      }
      function T(e, t, r, n, o, i, a) {
        (e.current = n),
          (t.current = o),
          (r.current = !1),
          i.current && ((i.current = null), a());
      }
      function g(e, t, r, n, o, i, a, c, s, u) {
        if (e) {
          var f = !1,
            p = null,
            l = function () {
              if (!f) {
                var e,
                  r,
                  l = t.getState();
                try {
                  e = n(l, o.current);
                } catch (d) {
                  (r = d), (p = d);
                }
                r || (p = null),
                  e === i.current
                    ? a.current || s()
                    : ((i.current = e),
                      (c.current = e),
                      (a.current = !0),
                      u({ type: "STORE_UPDATED", payload: { error: r } }));
              }
            };
          (r.onStateChange = l), r.trySubscribe(), l();
          return function () {
            if (((f = !0), r.tryUnsubscribe(), (r.onStateChange = null), p))
              throw p;
          };
        }
      }
      var b = function () {
        return [null, 0];
      };
      function m(e, t) {
        void 0 === t && (t = {});
        var r = t,
          a = r.getDisplayName,
          c =
            void 0 === a
              ? function (e) {
                  return "ConnectAdvanced(" + e + ")";
                }
              : a,
          s = r.methodName,
          f = void 0 === s ? "connectAdvanced" : s,
          d = r.renderCountProp,
          _ = void 0 === d ? void 0 : d,
          m = r.shouldHandleStateChanges,
          C = void 0 === m || m,
          A = r.storeKey,
          R = void 0 === A ? "store" : A,
          j = (r.withRef, r.forwardRef),
          I = void 0 !== j && j,
          N = r.context,
          w = void 0 === N ? i : N,
          M = Object(l.a)(r, [
            "getDisplayName",
            "methodName",
            "renderCountProp",
            "shouldHandleStateChanges",
            "storeKey",
            "withRef",
            "forwardRef",
            "context",
          ]),
          U = w;
        return function (t) {
          var r = t.displayName || t.name || "Component",
            i = c(r),
            a = Object(p.a)({}, M, {
              getDisplayName: c,
              methodName: f,
              renderCountProp: _,
              shouldHandleStateChanges: C,
              storeKey: R,
              displayName: i,
              wrappedComponentName: r,
              WrappedComponent: t,
            }),
            s = M.pure;
          var d = s
            ? n.useMemo
            : function (e) {
                return e();
              };
          function m(r) {
            var i = Object(n.useMemo)(
                function () {
                  var e = r.reactReduxForwardedRef,
                    t = Object(l.a)(r, ["reactReduxForwardedRef"]);
                  return [r.context, e, t];
                },
                [r]
              ),
              c = i[0],
              s = i[1],
              f = i[2],
              E = Object(n.useMemo)(
                function () {
                  return c &&
                    c.Consumer &&
                    Object(O.isContextConsumer)(
                      o.a.createElement(c.Consumer, null)
                    )
                    ? c
                    : U;
                },
                [c, U]
              ),
              _ = Object(n.useContext)(E),
              m =
                Boolean(r.store) &&
                Boolean(r.store.getState) &&
                Boolean(r.store.dispatch);
            Boolean(_) && Boolean(_.store);
            var A = m ? r.store : _.store,
              R = Object(n.useMemo)(
                function () {
                  return (function (t) {
                    return e(t.dispatch, a);
                  })(A);
                },
                [A]
              ),
              j = Object(n.useMemo)(
                function () {
                  if (!C) return v;
                  var e = new u(A, m ? null : _.subscription),
                    t = e.notifyNestedSubs.bind(e);
                  return [e, t];
                },
                [A, m, _]
              ),
              I = j[0],
              N = j[1],
              w = Object(n.useMemo)(
                function () {
                  return m ? _ : Object(p.a)({}, _, { subscription: I });
                },
                [m, _, I]
              ),
              M = Object(n.useReducer)(h, S, b),
              P = M[0][0],
              F = M[1];
            if (P && P.error) throw P.error;
            var D = Object(n.useRef)(),
              L = Object(n.useRef)(f),
              x = Object(n.useRef)(),
              H = Object(n.useRef)(!1),
              B = d(
                function () {
                  return x.current && f === L.current
                    ? x.current
                    : R(A.getState(), f);
                },
                [A, P, f]
              );
            y(T, [L, D, H, f, B, x, N]),
              y(g, [C, A, I, R, L, D, H, x, N, F], [A, I, R]);
            var G = Object(n.useMemo)(
              function () {
                return o.a.createElement(t, Object(p.a)({}, B, { ref: s }));
              },
              [s, t, B]
            );
            return Object(n.useMemo)(
              function () {
                return C ? o.a.createElement(E.Provider, { value: w }, G) : G;
              },
              [E, G, w]
            );
          }
          var A = s ? o.a.memo(m) : m;
          if (((A.WrappedComponent = t), (A.displayName = i), I)) {
            var j = o.a.forwardRef(function (e, t) {
              return o.a.createElement(
                A,
                Object(p.a)({}, e, { reactReduxForwardedRef: t })
              );
            });
            return (j.displayName = i), (j.WrappedComponent = t), E()(j, t);
          }
          return E()(A, t);
        };
      }
      function C(e, t) {
        return e === t
          ? 0 !== e || 0 !== t || 1 / e === 1 / t
          : e !== e && t !== t;
      }
      function A(e, t) {
        if (C(e, t)) return !0;
        if (
          "object" !== typeof e ||
          null === e ||
          "object" !== typeof t ||
          null === t
        )
          return !1;
        var r = Object.keys(e),
          n = Object.keys(t);
        if (r.length !== n.length) return !1;
        for (var o = 0; o < r.length; o++)
          if (
            !Object.prototype.hasOwnProperty.call(t, r[o]) ||
            !C(e[r[o]], t[r[o]])
          )
            return !1;
        return !0;
      }
      var R = r("9OUN");
      function j(e) {
        return function (t, r) {
          var n = e(t, r);
          function o() {
            return n;
          }
          return (o.dependsOnOwnProps = !1), o;
        };
      }
      function I(e) {
        return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps
          ? Boolean(e.dependsOnOwnProps)
          : 1 !== e.length;
      }
      function N(e, t) {
        return function (t, r) {
          r.displayName;
          var n = function (e, t) {
            return n.dependsOnOwnProps ? n.mapToProps(e, t) : n.mapToProps(e);
          };
          return (
            (n.dependsOnOwnProps = !0),
            (n.mapToProps = function (t, r) {
              (n.mapToProps = e), (n.dependsOnOwnProps = I(e));
              var o = n(t, r);
              return (
                "function" === typeof o &&
                  ((n.mapToProps = o),
                  (n.dependsOnOwnProps = I(o)),
                  (o = n(t, r))),
                o
              );
            }),
            n
          );
        };
      }
      var w = [
        function (e) {
          return "function" === typeof e ? N(e) : void 0;
        },
        function (e) {
          return e
            ? void 0
            : j(function (e) {
                return { dispatch: e };
              });
        },
        function (e) {
          return e && "object" === typeof e
            ? j(function (t) {
                return Object(R.b)(e, t);
              })
            : void 0;
        },
      ];
      var M = [
        function (e) {
          return "function" === typeof e ? N(e) : void 0;
        },
        function (e) {
          return e
            ? void 0
            : j(function () {
                return {};
              });
        },
      ];
      function U(e, t, r) {
        return Object(p.a)({}, r, {}, e, {}, t);
      }
      var P = [
        function (e) {
          return "function" === typeof e
            ? (function (e) {
                return function (t, r) {
                  r.displayName;
                  var n,
                    o = r.pure,
                    i = r.areMergedPropsEqual,
                    a = !1;
                  return function (t, r, c) {
                    var s = e(t, r, c);
                    return (
                      a ? (o && i(s, n)) || (n = s) : ((a = !0), (n = s)), n
                    );
                  };
                };
              })(e)
            : void 0;
        },
        function (e) {
          return e
            ? void 0
            : function () {
                return U;
              };
        },
      ];
      function F(e, t, r, n) {
        return function (o, i) {
          return r(e(o, i), t(n, i), i);
        };
      }
      function D(e, t, r, n, o) {
        var i,
          a,
          c,
          s,
          u,
          f = o.areStatesEqual,
          p = o.areOwnPropsEqual,
          l = o.areStatePropsEqual,
          d = !1;
        function E(o, d) {
          var E = !p(d, a),
            O = !f(o, i);
          return (
            (i = o),
            (a = d),
            E && O
              ? ((c = e(i, a)),
                t.dependsOnOwnProps && (s = t(n, a)),
                (u = r(c, s, a)))
              : E
              ? (e.dependsOnOwnProps && (c = e(i, a)),
                t.dependsOnOwnProps && (s = t(n, a)),
                (u = r(c, s, a)))
              : O
              ? (function () {
                  var t = e(i, a),
                    n = !l(t, c);
                  return (c = t), n && (u = r(c, s, a)), u;
                })()
              : u
          );
        }
        return function (o, f) {
          return d
            ? E(o, f)
            : ((c = e((i = o), (a = f))),
              (s = t(n, a)),
              (u = r(c, s, a)),
              (d = !0),
              u);
        };
      }
      function L(e, t) {
        var r = t.initMapStateToProps,
          n = t.initMapDispatchToProps,
          o = t.initMergeProps,
          i = Object(l.a)(t, [
            "initMapStateToProps",
            "initMapDispatchToProps",
            "initMergeProps",
          ]),
          a = r(e, i),
          c = n(e, i),
          s = o(e, i);
        return (i.pure ? D : F)(a, c, s, e, i);
      }
      function x(e, t, r) {
        for (var n = t.length - 1; n >= 0; n--) {
          var o = t[n](e);
          if (o) return o;
        }
        return function (t, n) {
          throw new Error(
            "Invalid value of type " +
              typeof e +
              " for " +
              r +
              " argument when connecting component " +
              n.wrappedComponentName +
              "."
          );
        };
      }
      function H(e, t) {
        return e === t;
      }
      function B(e) {
        var t = void 0 === e ? {} : e,
          r = t.connectHOC,
          n = void 0 === r ? m : r,
          o = t.mapStateToPropsFactories,
          i = void 0 === o ? M : o,
          a = t.mapDispatchToPropsFactories,
          c = void 0 === a ? w : a,
          s = t.mergePropsFactories,
          u = void 0 === s ? P : s,
          f = t.selectorFactory,
          d = void 0 === f ? L : f;
        return function (e, t, r, o) {
          void 0 === o && (o = {});
          var a = o,
            s = a.pure,
            f = void 0 === s || s,
            E = a.areStatesEqual,
            O = void 0 === E ? H : E,
            _ = a.areOwnPropsEqual,
            S = void 0 === _ ? A : _,
            v = a.areStatePropsEqual,
            h = void 0 === v ? A : v,
            y = a.areMergedPropsEqual,
            T = void 0 === y ? A : y,
            g = Object(l.a)(a, [
              "pure",
              "areStatesEqual",
              "areOwnPropsEqual",
              "areStatePropsEqual",
              "areMergedPropsEqual",
            ]),
            b = x(e, i, "mapStateToProps"),
            m = x(t, c, "mapDispatchToProps"),
            C = x(r, u, "mergeProps");
          return n(
            d,
            Object(p.a)(
              {
                methodName: "connect",
                getDisplayName: function (e) {
                  return "Connect(" + e + ")";
                },
                shouldHandleStateChanges: Boolean(e),
                initMapStateToProps: b,
                initMapDispatchToProps: m,
                initMergeProps: C,
                pure: f,
                areStatesEqual: O,
                areOwnPropsEqual: S,
                areStatePropsEqual: h,
                areMergedPropsEqual: T,
              },
              g
            )
          );
        };
      }
      var G = B();
      function k() {
        return Object(n.useContext)(i);
      }
      function Q(e) {
        void 0 === e && (e = i);
        var t =
          e === i
            ? k
            : function () {
                return Object(n.useContext)(e);
              };
        return function () {
          return t().store;
        };
      }
      var V = Q();
      function q(e) {
        void 0 === e && (e = i);
        var t = e === i ? V : Q(e);
        return function () {
          return t().dispatch;
        };
      }
      var W = q(),
        z = function (e, t) {
          return e === t;
        };
      function J(e) {
        void 0 === e && (e = i);
        var t =
          e === i
            ? k
            : function () {
                return Object(n.useContext)(e);
              };
        return function (e, r) {
          void 0 === r && (r = z);
          var o = t(),
            i = (function (e, t, r, o) {
              var i,
                a = Object(n.useReducer)(function (e) {
                  return e + 1;
                }, 0)[1],
                c = Object(n.useMemo)(
                  function () {
                    return new u(r, o);
                  },
                  [r, o]
                ),
                s = Object(n.useRef)(),
                f = Object(n.useRef)(),
                p = Object(n.useRef)(),
                l = Object(n.useRef)(),
                d = r.getState();
              try {
                i =
                  e !== f.current || d !== p.current || s.current
                    ? e(d)
                    : l.current;
              } catch (E) {
                throw (
                  (s.current &&
                    (E.message +=
                      "\nThe error may be correlated with this previous error:\n" +
                      s.current.stack +
                      "\n\n"),
                  E)
                );
              }
              return (
                _(function () {
                  (f.current = e),
                    (p.current = d),
                    (l.current = i),
                    (s.current = void 0);
                }),
                _(
                  function () {
                    function e() {
                      try {
                        var e = f.current(r.getState());
                        if (t(e, l.current)) return;
                        l.current = e;
                      } catch (E) {
                        s.current = E;
                      }
                      a();
                    }
                    return (
                      (c.onStateChange = e),
                      c.trySubscribe(),
                      e(),
                      function () {
                        return c.tryUnsubscribe();
                      }
                    );
                  },
                  [r, c]
                ),
                i
              );
            })(e, r, o.store, o.subscription);
          return Object(n.useDebugValue)(i), i;
        };
      }
      var Y,
        $ = J(),
        K = r("7nmT");
      (Y = K.unstable_batchedUpdates), (a = Y);
    },
    vxC8: function (e, t, r) {
      var n = r("5nKN"),
        o = r("4p/L");
      e.exports = function (e, t) {
        var r = o(e, t);
        return n(r) ? r : void 0;
      };
    },
    wxYD: function (e, t) {
      var r = Array.isArray;
      e.exports = r;
    },
    "y/9h": function (e, t) {
      e.exports = function (e, t) {
        for (var r = -1, n = t.length, o = e.length; ++r < n; ) e[o + r] = t[r];
        return e;
      };
    },
    yT0s: function (e, t, r) {
      "use strict";
      t.a = {
        CLEAR_STORE: "CLEAR_STORE",
        TOGGLE_SIDEBAR_MENU: "TOGGLE_SIDEBAR_MENU",
        CLOSE_SIDEBAR_MENU: "CLOSE_SIDEBAR_MENU",
        TOGGLE_AUTH_MODAL: "TOGGLE_AUTH_MODAL",
        SWITCH_AUTH_MODAL: "SWITCH_AUTH_MODAL",
        SET_USER: "SET_USER",
        SET_CLIENT_CONFIG: "SET_CLIENT_CONFIG",
        FETCH_LIST_REQUEST: "FETCH_LIST_REQUEST",
        FETCH_LIST_SUCCESS: "FETCH_LIST_SUCCESS",
        FETCH_LIST_FAILURE: "FETCH_LIST_FAILURE",
        FETCH_CONTENT_REQUEST: "FETCH_CONTENT_REQUEST",
        FETCH_CONTENT_SUCCESS: "FETCH_CONTENT_SUCCESS",
        FETCH_CONTENT_FAILURE: "FETCH_CONTENT_FAILURE",
        ADD_VOTE_REQUEST: "ADD_VOTE_REQUEST",
        ADD_VOTE_SUCCESS: "ADD_VOTE_SUCCESS",
        ADD_VOTE_FAILURE: "ADD_VOTE_FAILURE",
        REMOVE_VOTE_REQUEST: "REMOVE_VOTE_REQUEST",
        REMOVE_VOTE_SUCCESS: "REMOVE_VOTE_SUCCESS",
        REMOVE_VOTE_FAILURE: "REMOVE_VOTE_FAILURE",
        ADD_TAG_REQUEST: "ADD_TAG_REQUEST",
        ADD_TAG_SUCCESS: "ADD_TAG_SUCCESS",
        ADD_TAG_FAILURE: "ADD_TAG_FAILURE",
        UNBAN_USER_REQUEST: "UNBAN_USER_REQUEST",
        UNBAN_USER_SUCCESS: "UNBAN_USER_SUCCESS",
        UNBAN_USER_FAILURE: "UNBAN_USER_FAILURE",
        TOGGLE_UNBAN_USER_MODAL: "TOGGLE_UNBAN_USER_MODAL",
        BAN_USER_REQUEST: "BAN_USER_REQUEST",
        BAN_USER_SUCCESS: "BAN_USER_SUCCESS",
        BAN_USER_FAILURE: "BAN_USER_FAILURE",
        TOGGLE_BAN_USER_MODAL: "TOGGLE_BAN_USER_MODAL",
        CLEAR_ADD_TAG_MESSAGE: "CLEAR_ADD_TAG_MESSAGE",
        DELETE_TAG_REQUEST: "DELETE_TAG_REQUEST",
        DELETE_TAG_SUCCESS: "DELETE_TAG_SUCCESS",
        DELETE_TAG_FAILURE: "DELETE_TAG_FAILURE",
        TOGGLE_DELETE_TAG_MODAL: "TOGGLE_DELETE_TAG_MODAL",
        TOGGLE_RECOMMEND_CS_MODAL: "TOGGLE_RECOMMEND_CS_MODAL",
        POST_RECOMMEND_CS_REQUEST: "POST_RECOMMEND_CS_REQUEST",
        POST_RECOMMEND_CS_SUCCESS: "POST_RECOMMEND_CS_SUCCESS",
        POST_RECOMMEND_CS_FAILURE: "POST_RECOMMEND_CS_FAILURE",
        FETCH_ADMIN_LIST_REQUEST: "FETCH_ADMIN_LIST_REQUEST",
        FETCH_ADMIN_LIST_SUCCESS: "FETCH_ADMIN_LIST_SUCCESS",
        FETCH_ADMIN_LIST_FAILURE: "FETCH_ADMIN_LIST_FAILURE",
        FETCH_USER_LIST_REQUEST: "FETCH_USER_LIST_REQUEST",
        FETCH_USER_LIST_SUCCESS: "FETCH_USER_LIST_SUCCESS",
        FETCH_USER_LIST_FAILURE: "FETCH_USER_LIST_FAILURE",
        FLAG_AS_SPAM_REQUEST: "FLAG_AS_SPAM_REQUEST",
        FLAG_AS_SPAM_SUCCESS: "FLAG_AS_SPAM_SUCCESS",
        FLAG_AS_SPAM_FAILURE: "FLAG_AS_SPAM_FAILURE",
        UNSPAM_REQUEST: "UNSPAM_REQUEST",
        UNSPAM_SUCCESS: "UNSPAM_SUCCESS",
        UNSPAM_FAILURE: "UNSPAM_FAILURE",
        TOGGLE_SPAM_MODAL: "TOGGLE_SPAM_MODAL",
        TOGGLE_UNSPAM_MODAL: "TOGGLE_UNSPAM_MODAL",
        APPROVE_ARTICLE_REQUEST: "APPROVE_ARTICLE_REQUEST",
        APPROVE_ARTICLE_SUCCESS: "APPROVE_ARTICLE_SUCCESS",
        APPROVE_ARTICLE_FAILURE: "APPROVE_ARTICLE_FAILURE",
        TOGGLE_APPROVE_ARTICLE_MODAL: "TOGGLE_APPROVE_ARTICLE_MODAL",
        FETCH_ADMIN_CONTENT_REQUEST: "FETCH_ADMIN_CONTENT_REQUEST",
        FETCH_ADMIN_CONTENT_SUCCESS: "FETCH_ADMIN_CONTENT_SUCCESS",
        FETCH_ADMIN_CONTENT_FAILURE: "FETCH_ADMIN_CONTENT_FAILURE",
        UPDATE_ADMIN_CONTENT_REQUEST: "UPDATE_ADMIN_CONTENT_REQUEST",
        UPDATE_ADMIN_CONTENT_SUCCESS: "UPDATE_ADMIN_CONTENT_SUCCESS",
        UPDATE_ADMIN_CONTENT_FAILURE: "UPDATE_ADMIN_CONTENT_FAILURE",
        TOGGLE_ADMIN_FORM_MODAL: "TOGGLE_ADMIN_FORM_MODAL",
        DELETE_ADMIN_CONTENT_REQUEST: "DELETE_ADMIN_CONTENT_REQUEST",
        DELETE_ADMIN_CONTENT_SUCCESS: "DELETE_ADMIN_CONTENT_SUCCESS",
        DELETE_ADMIN_CONTENT_FAILURE: "DELETE_ADMIN_CONTENT_FAILURE",
        TOGGLE_DELETE_ADMIN_CONTENT_MODAL: "TOGGLE_DELETE_ADMIN_CONTENT_MODAL",
        FETCH_PREVIEW_REQUEST: "FETCH_PREVIEW_REQUEST",
        FETCH_PREVIEW_SUCCESS: "FETCH_PREVIEW_SUCCESS",
        FETCH_PREVIEW_FAILURE: "FETCH_PREVIEW_FAILURE",
        FETCH_TAG_SEARCH_REQUEST: "FETCH_TAG_SEARCH_REQUEST",
        FETCH_TAG_SEARCH_SUCCESS: "FETCH_TAG_SEARCH_SUCCESS",
        FETCH_TAG_SEARCH_FAILURE: "FETCH_TAG_SEARCH_FAILURE",
        FETCH_TAG_LIST_REQUEST: "FETCH_TAG_LIST_REQUEST",
        FETCH_TAG_LIST_SUCCESS: "FETCH_TAG_LIST_SUCCESS",
        FETCH_TAG_LIST_FAILURE: "FETCH_TAG_LIST_FAILURE",
        FETCH_COUNTDOWN_BANNER_REQUEST: "FETCH_COUNTDOWN_BANNER_REQUEST",
        FETCH_COUNTDOWN_BANNER_SUCCESS: "FETCH_COUNTDOWN_BANNER_SUCCESS",
        FETCH_COUNTDOWN_BANNER_FAILURE: "FETCH_COUNTDOWN_BANNER_FAILURE",
        HIDE_COUNTDOWN_BANNER: "HIDE_COUNTDOWN_BANNER",
        TOGGLE_SUBMIT_ARTICLE_MODAL: "TOGGLE_SUBMIT_ARTICLE_MODAL",
        POST_SUBMIT_ARTICLE_REQUEST: "POST_SUBMIT_ARTICLE_REQUEST",
        POST_SUBMIT_ARTICLE_SUCCESS: "POST_SUBMIT_ARTICLE_SUCCESS",
        POST_SUBMIT_ARTICLE_FAILURE: "POST_SUBMIT_ARTICLE_FAILURE",
        SHOW_BOTTOM_BAR: "SHOW_BOTTOM_BAR",
        HIDE_BOTTOM_BAR: "HIDE_BOTTOM_BAR",
        SWITCH_BOTTOM_BAR_VIEW: "SWITCH_BOTTOM_BAR_VIEW",
        FETCH_COMMENTS_REQUEST: "FETCH_COMMENTS_REQUEST",
        FETCH_COMMENTS_SUCCESS: "FETCH_COMMENTS_SUCCESS",
        FETCH_COMMENTS_FAILURE: "FETCH_COMMENTS_FAILURE",
        FETCH_COMMENT_REQUEST: "FETCH_COMMENT_REQUEST",
        FETCH_COMMENT_SUCCESS: "FETCH_COMMENT_SUCCESS",
        FETCH_COMMENT_FAILURE: "FETCH_COMMENT_FAILURE",
        UPDATE_COMMENT_REQUEST: "UPDATE_COMMENT_REQUEST",
        UPDATE_COMMENT_SUCCESS: "UPDATE_COMMENT_SUCCESS",
        UPDATE_COMMENT_FAILURE: "UPDATE_COMMENT_FAILURE",
        DELETE_COMMENT_REQUEST: "DELETE_COMMENT_REQUEST",
        DELETE_COMMENT_SUCCESS: "DELETE_COMMENT_SUCCESS",
        DELETE_COMMENT_FAILURE: "DELETE_COMMENT_FAILURE",
        TOGGLE_DELETE_COMMENT_MODAL: "TOGGLE_DELETE_COMMENT_MODAL",
        FETCH_NOTIFICATIONS_REQUEST: "FETCH_NOTIFICATIONS_REQUEST",
        FETCH_NOTIFICATIONS_SUCCESS: "FETCH_NOTIFICATIONS_SUCCESS",
        FETCH_NOTIFICATIONS_FAILURE: "FETCH_NOTIFICATIONS_FAILURE",
        READ_NOTIFICATION_REQUEST: "READ_NOTIFICATION_REQUEST",
        READ_NOTIFICATION_SUCCESS: "READ_NOTIFICATION_SUCCESS",
        READ_NOTIFICATION_FAILURE: "READ_NOTIFICATION_FAILURE",
        READ_NOTIFICATIONS_REQUEST: "READ_NOTIFICATIONS_REQUEST",
        READ_NOTIFICATIONS_SUCCESS: "READ_NOTIFICATIONS_SUCCESS",
        READ_NOTIFICATIONS_FAILURE: "READ_NOTIFICATIONS_FAILURE",
        RSS_FEED_CREATE_REQUEST: "RSS_FEED_CREATE_REQUEST",
        RSS_FEED_CREATE_SUCCESS: "RSS_FEED_CREATE_SUCCESS",
        RSS_FEED_CREATE_FAILURE: "RSS_FEED_CREATE_FAILURE",
        FETCH_RSS_FEED_LIST_REQUEST: "FETCH_RSS_FEED_LIST_REQUEST",
        FETCH_RSS_FEED_LIST_SUCCESS: "FETCH_RSS_FEED_LIST_SUCCESS",
        FETCH_RSS_FEED_LIST_FAILURE: "FETCH_RSS_FEED_LIST_FAILURE",
        TOGGLE_DISCONNECT_RSS_FEED_MODAL: "TOGGLE_DISCONNECT_RSS_FEED_MODAL",
        DISCONNECT_RSS_FEED_REQUEST: "DISCONNECT_RSS_FEED_REQUEST",
        DISCONNECT_RSS_FEED_SUCCESS: "DISCONNECT_RSS_FEED_SUCCESS",
        DISCONNECT_RSS_FEED_FAILURE: "DISCONNECT_RSS_FEED_FAILURE",
        TOGGLE_SET_AS_HOMEPAGE_MODAL: "TOGGLE_SET_AS_HOMEPAGE_MODAL",
        FIRE_GOOGLE_ANALYTICS_EVENT: "FIRE_GOOGLE_ANALYTICS_EVENT",
      };
    },
    yZHP: function (e, t, r) {
      var n = r("tlBq"),
        o = 1,
        i = Object.prototype.hasOwnProperty;
      e.exports = function (e, t, r, a, c, s) {
        var u = r & o,
          f = n(e),
          p = f.length;
        if (p != n(t).length && !u) return !1;
        for (var l = p; l--; ) {
          var d = f[l];
          if (!(u ? d in t : i.call(t, d))) return !1;
        }
        var E = s.get(e);
        if (E && s.get(t)) return E == t;
        var O = !0;
        s.set(e, t), s.set(t, e);
        for (var _ = u; ++l < p; ) {
          var S = e[(d = f[l])],
            v = t[d];
          if (a) var h = u ? a(v, S, d, t, e, s) : a(S, v, d, e, t, s);
          if (!(void 0 === h ? S === v || c(S, v, r, a, s) : h)) {
            O = !1;
            break;
          }
          _ || (_ = "constructor" == d);
        }
        if (O && !_) {
          var y = e.constructor,
            T = t.constructor;
          y != T &&
            "constructor" in e &&
            "constructor" in t &&
            !(
              "function" == typeof y &&
              y instanceof y &&
              "function" == typeof T &&
              T instanceof T
            ) &&
            (O = !1);
        }
        return s.delete(e), s.delete(t), O;
      };
    },
    zjfJ: function (e, t, r) {
      "use strict";
      function n(e, t, r) {
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
      r.d(t, "a", function () {
        return n;
      });
    },
  },
]);
