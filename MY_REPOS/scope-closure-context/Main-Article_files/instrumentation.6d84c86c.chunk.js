(self.webpackChunklite = self.webpackChunklite || []).push([
  [118],
  {
    8538: (e, n, r) => {
      "use strict";
      r.r(n), r.d(n, { default: () => M });
      var t = r(94725),
        o = r(67294),
        i = r(12291),
        s = r(85740),
        a = r(34675),
        u = r(72351),
        c = r(52837),
        l = r(61250),
        f = r(31235),
        d = r(31117),
        p = r(67297),
        v = r(67616),
        g = r(29035),
        m = r(63038),
        _ = r.n(m),
        h = r(59713),
        b = r.n(h),
        w = r(44059),
        E = r(14034);
      function P() {
        for (
          var e = new E.y(), n = arguments.length, r = new Array(n), t = 0;
          t < n;
          t++
        )
          r[t] = arguments[t];
        if (0 === r.length) return e;
        var o = r.map(function () {
          return [];
        });
        return (
          r.forEach(function (n, r) {
            n.observe(function (n) {
              o[r].push(n),
                o.every(function (e) {
                  return e.length > 0;
                }) &&
                  e.set(
                    o.map(function (e) {
                      return e.shift();
                    })
                  );
            });
          }),
          e
        );
      }
      var T = function (e) {
        return function (n) {
          return b()({}, e, n);
        };
      };
      const M = function () {
        var e, n, r, m, h, b, E, M, A, S, y, C, k, L, O, F, x, q;
        return (
          o.useEffect(function () {
            var e = P(v.sY, v.wZ, v.vY).map(function (e) {
                var n = _()(e, 3),
                  r = n[0],
                  t = n[1],
                  o = n[2];
                return {
                  responseEndToLCP: new v.jb(r.response.end, t.end),
                  responseEndToFCP: new v.jb(r.response.end, o.end),
                };
              }),
              n = P(
                v.sY,
                v.qH.map(T("fid")),
                v.vY.map(T("fcp")),
                v.wZ.map(T("lcp")),
                e
              );
            v.cA.observe(function (e) {
              e ||
                n.observe(function (e) {
                  var n = e.reduce(function (e, n) {
                      return Object.assign(e, n);
                    }, {}),
                    r = Object.keys(n).reduce(function (e, r) {
                      var t = n[r].duration;
                      return (e[r] = t % 1 == 0 ? t : Number(t.toFixed(1))), e;
                    }, {}),
                    t = document.children[0],
                    o = {
                      html: null == t ? void 0 : t.innerHTML.length,
                      redux: JSON.stringify(window.__PRELOADED_STATE__).length,
                      apollo: JSON.stringify(window.__APOLLO_STATE__).length,
                    };
                  w.t.log("client hydrated", { perf: r, sizes: o });
                });
            }),
              v.Df.observe(function (e) {
                return w.t.log("client resource sizes", { resources: e });
              });
          }, []),
          (e = (0, p.v9)(function (e) {
            return e.tracing;
          })),
          (n = e.originalSpan),
          (r = e.tracer),
          (m = (0, a.cD)()),
          (h = m.loading),
          (b = m.isBot),
          (E = (0, p.v9)(function (e) {
            return e.client.routingEntity;
          })),
          (M = (0, p.v9)(function (e) {
            return e.auroraPage.isAuroraPageEnabled;
          })),
          (A = (0, a.rZ)()),
          (S = A.loading),
          (y = A.viewerId),
          (C = (0, f.xg)()),
          (k = (0, f.f$)()),
          (L = (0, s.P5)("enable_medium_dot_com")),
          (O = (0, s.P5)("enable_medium_app")),
          (F = (0, i.I0)()),
          (x = (0, l.dh)()),
          (q = (0, u.Av)()),
          o.useEffect(
            function () {
              var e;
              if (r && q && !h && !b && !S && y) {
                var o = x(window.location.pathname),
                  i =
                    null !== (e = null == o ? void 0 : o.route.metricName) &&
                    void 0 !== e
                      ? e
                      : "unidentified",
                  s = (0, a.QM)(y),
                  u = (0, g.ic)(navigator.userAgent),
                  l = [];
                C
                  ? l.push("edge_cache_enabled")
                  : k && l.push("edge_cache_control"),
                  O
                    ? l.push("enable_medium_app")
                    : L &&
                      s &&
                      "homepage" === i &&
                      l.push("enable_medium_dot_com");
                var f = l.join(","),
                  p = {
                    "user.logged_in": s,
                    "user.experiment": f,
                    "device.mobile_or_tablet": u,
                    "req.route_name": i,
                    "req.route": i,
                    "req.router": (null == E ? void 0 : E.type) || c.Cr.DEFAULT,
                  },
                  m = {
                    auroraPage: M,
                    loggedIn: s,
                    mobileOrTablet: u,
                    experiment: f,
                    route: i,
                  },
                  _ = function (e) {
                    return Math.round(1e3 * e);
                  },
                  w = function (e, n, t, o) {
                    var i = t.start,
                      s = t.end,
                      a = r
                        .startSpan("timing.".concat(n), { childOf: e, tags: p })
                        .setBeginMicros(_(i))
                        .setEndMicros(_(s));
                    return null != o && o(a), a.finish(), a;
                  };
                v.sY.observe(function (e) {
                  var o, i, s, a;
                  q.reportRender(m, e);
                  var u = r
                    .startSpan("timing.navigation", {
                      references: n ? [(0, t.followsFrom)(n)] : void 0,
                      tags: p,
                    })
                    .setBeginMicros(_(e.load.start))
                    .setEndMicros(_(e.load.end))
                    .log({
                      redirect_count:
                        null !==
                          (o =
                            null === (i = window) ||
                            void 0 === i ||
                            null === (s = i.performance) ||
                            void 0 === s ||
                            null === (a = s.navigation) ||
                            void 0 === a
                              ? void 0
                              : a.redirectCount) && void 0 !== o
                          ? o
                          : 0,
                    });
                  w(u, "beforeDomainLookup", e.before_domain_lookup),
                    w(u, "domainLookup", e.domain_lookup),
                    w(u, "connect", e.connect),
                    w(u, "request", e.request),
                    w(u, "response", e.response),
                    w(u, "processing", e.processing);
                  var c = e.overall_fcp,
                    l = e.client,
                    f = e.render;
                  null != c && w(u, "firstContentfulPaint", c),
                    null != l &&
                      w(u, "client", l, function (e) {
                        null != f && w(e, "render", f);
                      }),
                    u.finish(),
                    F((0, d.YU)(u.generateTraceURL()));
                }),
                  v.vY.observe(function (e) {
                    q.reportFirstContentfulPaint(m, e),
                      r
                        .startSpan("timing.firstContentfulPaint.v2", {
                          references: n ? [(0, t.followsFrom)(n)] : void 0,
                          tags: p,
                        })
                        .setBeginMicros(_(e.start))
                        .setEndMicros(_(e.end))
                        .finish();
                  }),
                  v.wZ.observe(function (e) {
                    q.reportLargestContentfulPaint(m, e),
                      r
                        .startSpan("timing.largestContentfulPaint", {
                          references: n ? [(0, t.followsFrom)(n)] : void 0,
                          tags: p,
                        })
                        .setBeginMicros(_(e.start))
                        .setEndMicros(_(e.end))
                        .finish();
                  }),
                  v.yI.observe(function (e) {
                    q.reportCumulativeLayoutShift(m, e);
                  }),
                  v.cA.observe(function (e) {
                    e && q.reportUnsupportedPerfObserver(m);
                  }),
                  v.qH.observe(function (e) {
                    q.reportInput(m, e),
                      r
                        .startSpan("timing.input.first.delay", {
                          references: n ? [(0, t.followsFrom)(n)] : void 0,
                          tags: p,
                        })
                        .setBeginMicros(_(e.start))
                        .setEndMicros(_(e.end))
                        .finish();
                  });
              }
            },
            [r, S, y, h, b, L, O]
          ),
          null
        );
      };
    },
    72864: (e, n, r) => {
      "use strict";
      r.r(n), r.d(n, { init: () => i, extractSpan: () => s });
      var t = r(45573),
        o = r(94725),
        i = function (e) {
          var n = e.name,
            r = e.host,
            i = e.token,
            s = e.appVersion,
            a = new t.Tracer({
              component_name: n,
              xhr_instrumentation: !1,
              access_token: i,
              collector_host: r,
              default_span_tags: { "component.version": s },
            });
          return (0, o.initGlobalTracer)(a), a;
        },
        s = function (e, n) {
          if (n) return e.extract(o.FORMAT_HTTP_HEADERS, n);
        };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/instrumentation.6d84c86c.chunk.js.map
