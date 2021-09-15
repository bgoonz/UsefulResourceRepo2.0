_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [20],
  {
    0: function (t, n, e) {
      e("EsJW"), (t.exports = e("7xIC"));
    },
    EsJW: function (t, n, e) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/_app",
        function () {
          return e("HaU7");
        },
      ]);
    },
    HaU7: function (t, n, e) {
      "use strict";
      var r = e("IebI"),
        u = e("zQIG"),
        a = e("8mBC"),
        o = e("I/kN"),
        c = e("cMav"),
        i = e("pSQP"),
        p = e("4mCN");
      function s(t) {
        var n = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var e,
            r = i(t);
          if (n) {
            var u = i(this).constructor;
            e = Reflect.construct(r, arguments, u);
          } else e = r.apply(this, arguments);
          return c(this, e);
        };
      }
      var f = e("Y3ZS");
      (n.__esModule = !0),
        (n.Container = function (t) {
          0;
          return t.children;
        }),
        (n.createUrl = P),
        (n.default = void 0);
      var l = f(e("ERkP")),
        h = e("fvxO");
      function _(t) {
        return v.apply(this, arguments);
      }
      function v() {
        return (v = p(
          r.mark(function t(n) {
            var e, u, a;
            return r.wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (e = n.Component),
                      (u = n.ctx),
                      (t.next = 3),
                      (0, h.loadGetInitialProps)(e, u)
                    );
                  case 3:
                    return (a = t.sent), t.abrupt("return", { pageProps: a });
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t);
          })
        )).apply(this, arguments);
      }
      (n.AppInitialProps = h.AppInitialProps),
        (n.NextWebVitalsMetric = h.NextWebVitalsMetric);
      var d = (function (t) {
        o(e, t);
        var n = s(e);
        function e() {
          return u(this, e), n.apply(this, arguments);
        }
        return (
          a(e, [
            {
              key: "componentDidCatch",
              value: function (t, n) {
                throw t;
              },
            },
            {
              key: "render",
              value: function () {
                var t = this.props,
                  n = t.router,
                  e = t.Component,
                  r = t.pageProps,
                  u = t.__N_SSG,
                  a = t.__N_SSP;
                return l.default.createElement(
                  e,
                  Object.assign({}, r, u || a ? {} : { url: P(n) })
                );
              },
            },
          ]),
          e
        );
      })(l.default.Component);
      function P(t) {
        var n = t.pathname,
          e = t.asPath,
          r = t.query;
        return {
          get query() {
            return r;
          },
          get pathname() {
            return n;
          },
          get asPath() {
            return e;
          },
          back: function () {
            t.back();
          },
          push: function (n, e) {
            return t.push(n, e);
          },
          pushTo: function (n, e) {
            var r = e ? n : "",
              u = e || n;
            return t.push(r, u);
          },
          replace: function (n, e) {
            return t.replace(n, e);
          },
          replaceTo: function (n, e) {
            var r = e ? n : "",
              u = e || n;
            return t.replace(r, u);
          },
        };
      }
      (n.default = d), (d.origGetInitialProps = _), (d.getInitialProps = _);
    },
  },
  [[0, 0, 2, 1]],
]);
