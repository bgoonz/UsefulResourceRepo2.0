(self.webpackChunklite = self.webpackChunklite || []).push([
  [9152],
  {
    76668: (n, e, t) => {
      "use strict";
      t.r(e), t.d(e, { NavigationTimingReporter: () => f });
      var r = t(67294),
        a = t(34675),
        i = t(72351),
        o = t(44059),
        u = t(61250),
        l = t(67297),
        c = t(67616),
        m = function (n) {
          return Math.round(1e3 * n);
        };
      function f(n) {
        var e = n.to,
          t = n.from,
          f = r.useRef(null),
          d = (0, i.Av)(),
          g = (0, u.dh)(),
          v = (0, l.v9)(function (n) {
            return n.debug.originalSpanCarrier;
          }),
          p = (0, l.v9)(function (n) {
            return n.tracing;
          }),
          h = p.originalSpan,
          s = p.tracer,
          w = (0, a.rZ)(),
          k = w.loading,
          b = w.viewerId;
        return (
          r.useEffect(
            function () {
              if (s && !k && b)
                if (f.current || e.pathname === t.pathname) {
                  if (f.current) {
                    var n,
                      r,
                      i,
                      u,
                      l = f.current.pathname,
                      p = f.current.time,
                      w = Date.now();
                    f.current = null;
                    var C = {
                        to:
                          null !==
                            (n =
                              null === (r = g(e.pathname)) || void 0 === r
                                ? void 0
                                : r.route.name) && void 0 !== n
                            ? n
                            : "unknown",
                        from:
                          null !==
                            (i =
                              null === (u = g(l)) || void 0 === u
                                ? void 0
                                : u.route.name) && void 0 !== i
                            ? i
                            : "unknown",
                        loggedIn: (0, a.QM)(b),
                      },
                      I = { tags: C };
                    v && (I.childOf = h),
                      s
                        .startSpan("client.navigation", I)
                        .setBeginMicros(m(p))
                        .setEndMicros(m(w))
                        .finish(),
                      d && d.reportClientNav(C, new c.jb(p, w)),
                      o.t.log("client navigation", {
                        duration: w - p,
                        to: e.pathname,
                        toRouteName: C.to,
                        from: l,
                        fromRouteName: C.from,
                        loggedIn: C.loggedIn,
                      });
                  }
                } else f.current = { pathname: t.pathname, time: Date.now() };
            },
            [s, e.pathname, t.pathname, k, b]
          ),
          null
        );
      }
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/reporting.65aadb14.chunk.js.map
