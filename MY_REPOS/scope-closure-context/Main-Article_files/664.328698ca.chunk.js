(self.webpackChunklite = self.webpackChunklite || []).push([
  [664],
  {
    638: (e, t, n) => {
      "use strict";
      n.d(t, { u: () => p });
      var r = n(63038),
        o = n.n(r),
        a = n(67294),
        l = n(85740),
        i = n(34675),
        c = n(51512),
        u = n(8403),
        s = n(67297),
        m = n(15412),
        f = n(92154),
        d = function () {
          return null;
        },
        p = function () {
          var e = (0, s.p9)(function (e) {
            return e.config.isAmp;
          });
          return (0, i.cD)().isBot || e
            ? null
            : a.createElement(
                l.bZ,
                { name: "dont_track_user", placeholder: d },
                function (e) {
                  return e
                    ? null
                    : a.createElement(
                        a.Fragment,
                        null,
                        a.createElement(
                          "script",
                          null,
                          "window.PARSELY = window.PARSELY || {autotrack: false}"
                        ),
                        a.createElement(i.I8, null, function (e) {
                          return a.createElement(h, { viewer: e });
                        })
                      );
                }
              );
        },
        h = function (e) {
          var t = e.viewer,
            n = (0, s.v9)(function (e) {
              return e.navigation.currentLocation;
            }),
            r = (0, s.v9)(function (e) {
              return e.navigation.referrer;
            }),
            o = (function (e) {
              return e ? (e.mediumMemberAt ? "member" : "user") : "visitor";
            })(t),
            a = (0, u.PM)();
          return g(n, r, a, o), null;
        },
        g = function (e, t, n, r) {
          var l = (0, m.G)(
              "//d1z2jf7jlzjs58.cloudfront.net/keys/medium.com/p.js",
              { id: "parsely-cf" }
            ),
            i = o()(l, 2),
            c = i[0],
            u = i[1],
            s = (0, f.l)();
          a.useEffect(
            function () {
              c &&
                !u &&
                s({
                  resource: function () {
                    return window.PARSELY.beacon;
                  },
                  callback: function () {
                    return window.PARSELY.beacon.trackPageView({
                      url: y(e, n),
                      urlref: t,
                      js: 1,
                      data: { viewerStatus: r },
                    });
                  },
                  max: 10,
                });
            },
            [e, t, c, u]
          );
        };
      function y(e, t) {
        if (!e) return "";
        if (!t) return e;
        var n = new URL(e),
          r = (0, c.P7)(t),
          a = r.name,
          l = r.dimension;
        if ((a && n.searchParams.set("utm_medium", a), l)) {
          var i = l.split("."),
            u = o()(i, 3),
            s = u[0],
            m = u[1],
            f = u[2];
          s && n.searchParams.set("utm_source", s),
            m && n.searchParams.set("utm_term", m),
            f && n.searchParams.set("utm_content", f);
        }
        return n.toString();
      }
    },
    94132: (e, t, n) => {
      "use strict";
      n.d(t, { T: () => b });
      var r = n(59713),
        o = n.n(r),
        a = n(67294),
        l = n(60046),
        i = n(82418),
        c = n(97145),
        u = n(85432),
        s = n(64504),
        m = n(28309),
        f = n(67297),
        d = n(67122),
        p = n(27952);
      function h(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function g(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? h(Object(n), !0).forEach(function (t) {
                o()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : h(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var y = function (e) {
          var t = e.authDomain,
            n = e.productName;
          return a.createElement(
            u.xu,
            {
              flexGrow: "1",
              flexShrink: "1",
              flexBasis: "0",
              margin: "0 12px",
            },
            a.createElement(
              u.xu,
              { paddingBottom: "8px" },
              a.createElement(
                u.rU,
                { href: (0, p.GMb)(t, n) },
                a.createElement(s.X6, { scale: "S" }, "Share your thinking.")
              )
            ),
            a.createElement(
              s.F,
              { scale: "M" },
              "If you have a story to tell, knowledge to share, or a perspective to offer — welcome home. It’s easy and free to post your thinking on any topic.",
              " ",
              a.createElement(
                u.rU,
                { href: (0, p.GMb)(t, n), inline: !0, linkStyle: "OBVIOUS" },
                "Write on ",
                n
              )
            )
          );
        },
        b = function (e) {
          var t = e.slimFooter,
            n = (0, f.v9)(function (e) {
              return e.config.authDomain;
            }),
            r = (0, f.v9)(function (e) {
              return e.config.productName;
            }),
            o = (0, m.Fg)(),
            h = g(
              g({}, o),
              {},
              {
                baseColor: g(
                  g({}, o.baseColor),
                  {},
                  {
                    background: {
                      light: d.Uy(0.76),
                      normal: d.Uy(0.84),
                      dark: d.Uy(0.9),
                    },
                    border: {
                      lighter: d.l9(0.1),
                      light: d.l9(0.2),
                      normal: d.l9(0.34),
                      dark: d.l9(0.54),
                      darker: d.l9(0.84),
                    },
                    fill: {
                      lighter: d.l9(0.7),
                      light: d.l9(0.8),
                      normal: d.l9(0.98),
                      dark: d.l9(0.99),
                      darker: d.l9(1),
                    },
                    text: {
                      lighter: d.l9(0.7),
                      light: d.l9(0.8),
                      normal: d.l9(0.98),
                      dark: d.l9(0.99),
                      darker: d.l9(1),
                    },
                  }
                ),
              }
            );
          return a.createElement(
            u.f6,
            { theme: h },
            a.createElement(
              u.xu,
              {
                backgroundColor: "BASE_DARK",
                padding: "".concat(t ? "32px" : "60px", " 0"),
                sm: { padding: "32px 0" },
              },
              a.createElement(
                u.Pm,
                null,
                t
                  ? null
                  : a.createElement(
                      u.xu,
                      {
                        borderBottom: "BASE_DARK",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "32px",
                        paddingBottom: "48px",
                        sm: { display: "none" },
                      },
                      a.createElement(
                        u.xu,
                        {
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "0 -12px",
                        },
                        a.createElement(
                          u.xu,
                          {
                            flexGrow: "1",
                            flexShrink: "1",
                            flexBasis: "0",
                            margin: "0 12px",
                          },
                          a.createElement(
                            u.xu,
                            { paddingBottom: "8px" },
                            a.createElement(
                              u.rU,
                              {
                                href: (0, p.jQk)({
                                  authDomain: n,
                                  autoplay: !0,
                                }),
                              },
                              a.createElement(
                                s.X6,
                                { scale: "S" },
                                "Learn more."
                              )
                            )
                          ),
                          a.createElement(
                            s.F,
                            { scale: "M" },
                            r,
                            " is an open platform where 170 million readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface.",
                            " ",
                            a.createElement(
                              u.rU,
                              {
                                href: (0, p.jQk)({
                                  authDomain: n,
                                  autoplay: !0,
                                }),
                                inline: !0,
                                linkStyle: "OBVIOUS",
                              },
                              "Learn more"
                            )
                          )
                        ),
                        a.createElement(
                          u.xu,
                          {
                            flexGrow: "1",
                            flexShrink: "1",
                            flexBasis: "0",
                            margin: "0 12px",
                          },
                          a.createElement(
                            u.xu,
                            { paddingBottom: "8px" },
                            a.createElement(
                              u.rU,
                              { href: (0, p.a4F)(n) },
                              a.createElement(
                                s.X6,
                                { scale: "S" },
                                "Make ",
                                r,
                                " yours."
                              )
                            )
                          ),
                          a.createElement(
                            s.F,
                            { scale: "M" },
                            "Follow the writers, publications, and topics that matter to you, and you’ll see them on your homepage and in your inbox.",
                            " ",
                            a.createElement(
                              u.rU,
                              {
                                href: (0, p.a4F)(n),
                                inline: !0,
                                linkStyle: "OBVIOUS",
                              },
                              "Explore"
                            )
                          )
                        ),
                        a.createElement(y, { authDomain: n, productName: r })
                      )
                    ),
                a.createElement(
                  u.xu,
                  { display: "flex", flexDirection: "column" },
                  a.createElement(
                    u.xu,
                    {
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                    },
                    a.createElement(
                      u.rU,
                      {
                        href: "https://".concat(n, "/"),
                        ariaLabel: "Go to homepage",
                      },
                      a.createElement(l.Rv, { fill: d.ix })
                    ),
                    a.createElement(
                      u.xu,
                      {
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "8px",
                        width: "200px",
                        sm: { display: "flex", width: "140px" },
                      },
                      a.createElement(
                        s.F,
                        { color: "DARKER", scale: "L" },
                        a.createElement(
                          u.rU,
                          { href: (0, p.jQk)({ authDomain: n }), inline: !0 },
                          "About"
                        )
                      ),
                      a.createElement(
                        s.F,
                        { color: "DARKER", scale: "L" },
                        a.createElement(
                          u.rU,
                          { href: (0, p.XpN)(), inline: !0 },
                          "Help"
                        )
                      ),
                      a.createElement(
                        s.F,
                        { color: "DARKER", scale: "L" },
                        a.createElement(
                          u.rU,
                          { href: (0, p.xBX)(), inline: !0 },
                          "Legal"
                        )
                      )
                    )
                  ),
                  a.createElement(
                    a.Fragment,
                    null,
                    a.createElement(
                      u.xu,
                      {
                        display: "none",
                        sm: {
                          display: "flex",
                          marginBottom: "16px",
                          marginTop: "30px",
                        },
                      },
                      a.createElement(
                        s.F,
                        { color: "LIGHTER", scale: "L" },
                        "Get the Medium app"
                      )
                    ),
                    a.createElement(
                      u.xu,
                      {
                        display: "none",
                        sm: {
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: "16px",
                          width: "100%",
                        },
                      },
                      a.createElement(
                        u.xu,
                        { marginRight: "16px" },
                        a.createElement(c.E, { entryPoint: "postPageFooter" })
                      ),
                      a.createElement(
                        u.xu,
                        null,
                        a.createElement(i.H, { entryPoint: "postPageFooter" })
                      )
                    )
                  )
                )
              )
            )
          );
        };
    },
    55127: (e, t, n) => {
      "use strict";
      n.d(t, { z: () => ee });
      var r = n(319),
        o = n.n(r),
        a = n(67154),
        l = n.n(a),
        i = n(63038),
        c = n.n(i),
        u = n(59713),
        s = n.n(u),
        m = n(67294),
        f = n(60046),
        d = n(43689),
        p = n(56862),
        h = n(47578),
        g = n(28655),
        y = n.n(g),
        b = n(71439),
        E = n(51562),
        v = n(35741),
        x = n(55014),
        S = n(78820),
        k = n(34675),
        w = n(62181),
        _ = n(22091),
        P = n(67297);
      function A() {
        var e = y()([
          "\n  fragment StickyMetaDesktopActions_customStyleSheet on CustomStyleSheet {\n    id\n    ...MetaHeaderEngagement_customStyleSheet\n    ...MetaHeaderLogo_customStyleSheet\n    header {\n      headerScale\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (A = function () {
            return e;
          }),
          e
        );
      }
      function C() {
        var e = y()([
          "\n  fragment StickyMetaDesktopActions_publisher on Publisher {\n    __typename\n    id\n    name\n    ...MetaHeaderLogo_publisher\n    ...MetaHeaderEngagement_publisher\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (C = function () {
            return e;
          }),
          e
        );
      }
      var O = function (e) {
          var t = e.publisher,
            n = e.customStyleSheet,
            r = (0, k.Hk)().value,
            o = (0, P.v9)(function (e) {
              return e.config.authDomain;
            }),
            a = "".concat((0, S.Zu)(t), " Homepage"),
            l = (0, S.PB)(t, o);
          return m.createElement(
            _.xu,
            {
              display: "flex",
              alignItems: "center",
              flexGrow: "1",
              justifyContent: "space-between",
              flexDirection: "row",
              sm: { display: "none" },
            },
            !r &&
              m.createElement(
                m.Fragment,
                null,
                m.createElement(
                  _.xu,
                  {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  },
                  m.createElement(
                    _.xu,
                    { paddingRight: "24px" },
                    m.createElement(
                      p.e,
                      { href: l, ariaLabel: a },
                      m.createElement(x.fI, {
                        publisher: t,
                        customStyleSheet: n,
                        withTextColorSubtle: !1,
                        forceSmall: !0,
                      })
                    )
                  ),
                  m.createElement(v.i_, {
                    customStyleSheet: n,
                    followersLinkInFront: !1,
                    publisher: t,
                  })
                ),
                m.createElement(
                  _.xu,
                  {
                    display: "flex",
                    alignItems: "flex-end",
                    paddingRight: "24px",
                  },
                  m.createElement(
                    E.W,
                    {
                      featureString: "lo-sticky-header",
                      target: "sign-up-button",
                    },
                    m.createElement(
                      w.R9,
                      {
                        buttonSize: "REGULAR",
                        buttonStyle: "OBVIOUS",
                        isButton: !0,
                        operation: "register",
                        susiEntry: "nav_reg",
                      },
                      "Get started"
                    )
                  )
                )
              )
          );
        },
        D = ((0, b.Ps)(C(), v.QP, x.XN), (0, b.Ps)(A(), v.Al, x.Ig), n(6401));
      function j() {
        var e = y()([
          "\n  fragment StickyMetaMobileActions_publisher on Publisher {\n    __typename\n    ... on Collection {\n      slug\n      ...StickyMetaMobileActions_collection\n    }\n    ... on User {\n      username\n      id\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (j = function () {
            return e;
          }),
          e
        );
      }
      function M() {
        var e = y()([
          "\n  fragment StickyMetaMobileActions_post on Post {\n    id\n    collection {\n      ...StickyMetaMobileActions_collection\n    }\n    pendingCollection {\n      ...StickyMetaMobileActions_collection\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (M = function () {
            return e;
          }),
          e
        );
      }
      function I() {
        var e = y()([
          "\n  fragment StickyMetaMobileActions_collection on Collection {\n    id\n    creator {\n      id\n    }\n    viewerEdge {\n      id\n      isEditor\n    }\n  }\n",
        ]);
        return (
          (I = function () {
            return e;
          }),
          e
        );
      }
      var B = function (e) {
          var t = e.post,
            n = e.publisher,
            r = (0, k.Hk)().value,
            o =
              "Collection" === (null == n ? void 0 : n.__typename)
                ? n.slug
                : void 0,
            a =
              "User" === (null == n ? void 0 : n.__typename)
                ? n.username
                : null;
          return m.createElement(
            _.xu,
            {
              display: "none",
              sm: { display: "flex", alignItems: "center", flexGrow: "1" },
            },
            !r &&
              m.createElement(
                E.W,
                { featureString: "lo-sticky-header", target: "sign-up-button" },
                m.createElement(
                  w.R9,
                  {
                    buttonSize: "REGULAR",
                    buttonStyle: "OBVIOUS",
                    isButton: !0,
                    operation: "register",
                    susiEntry: "nav_reg",
                  },
                  "Get started"
                )
              ),
            m.createElement(D.a, {
              collectionSlug: o,
              postId: null == t ? void 0 : t.id,
              removeSpacing: !!r,
              username: a,
            })
          );
        },
        L = (0, b.Ps)(I()),
        U = ((0, b.Ps)(M(), L), (0, b.Ps)(j(), L), n(65849)),
        R = n(85740),
        F = n(27599),
        G = n(28309),
        H = n(72955),
        T = n(14391),
        V = n(80637),
        N = n(89349),
        z = n(74465),
        K = n(41996),
        Y = n(82482);
      function W(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      var X = Object.values(K.j),
        Z = n(27952),
        J = function (e, t, n, r, o) {
          return function (a) {
            var l;
            return (
              (l = {}),
              s()(l, V.sm(a), {
                borderTop: "1px solid ".concat(a.baseColor.border.lighter),
                borderBottom: "1px solid ".concat(a.baseColor.border.lighter),
              }),
              s()(
                l,
                "borderTop",
                o ? "1px solid ".concat(a.baseColor.border.lighter) : "none"
              ),
              s()(
                l,
                "borderBottom",
                o ? "1px solid ".concat(a.baseColor.border.lighter) : "none"
              ),
              s()(l, "backgroundColor", a.backgroundColor),
              s()(l, "left", "0"),
              s()(l, "opacity", e ? 1 : 0),
              s()(l, "position", "fixed"),
              s()(l, "right", "0"),
              s()(l, "top", "0"),
              s()(l, "visibility", t ? "hidden" : "visible"),
              s()(l, "zIndex", "".concat(z.ZP.metabar)),
              s()(l, (0, N.nk)("no-preference"), {
                animation: "".concat(e ? n : r, " .2s ease-in-out both"),
              }),
              l
            );
          };
        },
        Q = {
          "0%": { opacity: "0", transform: "translateY(-60px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        $ = {
          "0%": { opacity: "1", transform: "translateY(0px)" },
          "100%": { opacity: "0", transform: "translateY(-60px)" },
        },
        q = function (e) {
          var t = e.enabledOnDesktop,
            n = e.headerScale,
            r = e.post,
            o = e.publisher,
            a = e.variantLoaded,
            i = (0, P.v9)(function (e) {
              return e.config.authDomain;
            }),
            u = (0, G.Iq)(),
            s = m.useState(!1),
            g = c()(s, 2),
            y = g[0],
            b = g[1],
            E = m.useState(!0),
            v = c()(E, 2),
            x = v[0],
            S = v[1],
            w = (0, G.om)({ slideDownKeyframesName: Q }).slideDownKeyframesName,
            A = (0, G.om)({ slideUpKeyframesName: $ }).slideUpKeyframesName,
            C = (0, U.jb)(),
            D = (0, F.Av)(),
            j = (0, k.Hk)().value,
            M = (function () {
              var e = (0, G.Fg)(),
                t = m.useCallback(
                  function () {
                    if ("undefined" != typeof window && window.matchMedia) {
                      var t,
                        n = (function (e, t) {
                          var n;
                          if (
                            "undefined" == typeof Symbol ||
                            null == e[Symbol.iterator]
                          ) {
                            if (
                              Array.isArray(e) ||
                              (n = (function (e, t) {
                                if (e) {
                                  if ("string" == typeof e) return W(e, t);
                                  var n = Object.prototype.toString
                                    .call(e)
                                    .slice(8, -1);
                                  return (
                                    "Object" === n &&
                                      e.constructor &&
                                      (n = e.constructor.name),
                                    "Map" === n || "Set" === n
                                      ? Array.from(e)
                                      : "Arguments" === n ||
                                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                          n
                                        )
                                      ? W(e, t)
                                      : void 0
                                  );
                                }
                              })(e)) ||
                              (t && e && "number" == typeof e.length)
                            ) {
                              n && (e = n);
                              var r = 0,
                                o = function () {};
                              return {
                                s: o,
                                n: function () {
                                  return r >= e.length
                                    ? { done: !0 }
                                    : { done: !1, value: e[r++] };
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
                          var a,
                            l = !0,
                            i = !1;
                          return {
                            s: function () {
                              n = e[Symbol.iterator]();
                            },
                            n: function () {
                              var e = n.next();
                              return (l = e.done), e;
                            },
                            e: function (e) {
                              (i = !0), (a = e);
                            },
                            f: function () {
                              try {
                                l || null == n.return || n.return();
                              } finally {
                                if (i) throw a;
                              }
                            },
                          };
                        })(X);
                      try {
                        for (n.s(); !(t = n.n()).done; ) {
                          var r = t.value;
                          if (
                            window.matchMedia(
                              Y[r](e).replace("@media all and ", "")
                            ).matches
                          )
                            return r;
                        }
                      } catch (e) {
                        n.e(e);
                      } finally {
                        n.f();
                      }
                    }
                  },
                  [e]
                ),
                n = m.useState(function () {
                  return t();
                }),
                r = c()(n, 2),
                o = r[0],
                a = r[1];
              return (
                m.useEffect(function () {
                  var e = function () {
                    a(t());
                  };
                  return (
                    H.V6.on("resize", e),
                    function () {
                      return H.V6.off("resize", e);
                    }
                  );
                }, []),
                o
              );
            })(),
            I = (n || C.headerScale) === T.w6.HEADER_SCALE_SMALL;
          return (
            m.useEffect(
              function () {
                ["md", "lg", "xl"].includes(M || "") &&
                  D.event("experiment.eligible", {
                    experimentId: "ca24bb15e06f",
                  });
              },
              [M]
            ),
            m.useEffect(
              function () {
                a && (0, h.uI)("enableDesktopAuroraStickyNav", t);
              },
              [t, a]
            ),
            m.useEffect(function () {
              var e;
              H.V6.on("scroll_down", function () {
                (e = I ? d.Je + 160 : d.Je + 230),
                  window.pageYOffset > e && (b(!0), S(!1));
              }),
                H.V6.on("scroll_up", function () {
                  (e = I ? d.Je + 160 : d.Je + 230),
                    window.pageYOffset <= e && b(!1);
                });
            }),
            m.createElement(
              "div",
              { className: u(J(y, x, w, A, t && !j && y)) },
              m.createElement(
                _.Pm,
                { size: "outset" },
                m.createElement(
                  _.xu,
                  l()(
                    {
                      sm: { display: "flex", alignItems: "center" },
                      height: "60px",
                      top: "0",
                      width: "100%",
                      zIndex: z.ZP.metabar,
                    },
                    t && !j
                      ? { display: "flex", alignItems: "center" }
                      : { display: "none" }
                  ),
                  m.createElement(B, { post: r, publisher: o }),
                  t && m.createElement(O, { publisher: o }),
                  m.createElement(
                    p.e,
                    { href: (0, Z.cWJ)(i), ariaLabel: "Homepage" },
                    m.createElement(f.YR, null)
                  )
                )
              )
            )
          );
        },
        ee = function (e) {
          var t = m.useCallback(function () {
            return m.createElement(
              q,
              l()({}, e, { enabledOnDesktop: !1, variantLoaded: !1 })
            );
          }, o()(Object.values(e)));
          return m.createElement(
            R.bZ,
            { name: "enable_desktop_aurora_sticky_nav", placeholder: t },
            function (t) {
              return m.createElement(
                q,
                l()({}, e, { enabledOnDesktop: !!t, variantLoaded: !0 })
              );
            }
          );
        };
    },
    56365: (e, t, n) => {
      "use strict";
      n.d(t, { f: () => p, w: () => h });
      var r = n(28655),
        o = n.n(r),
        a = n(67154),
        l = n.n(a),
        i = n(6479),
        c = n.n(i),
        u = n(71439),
        s = n(67294),
        m = n(85489),
        f = n(42933);
      function d() {
        var e = o()([
          "\n  fragment CustomBackgroundWrapper_customStyleSheet on CustomStyleSheet {\n    id\n    global {\n      colorPalette {\n        background {\n          ...getHexFromColorValue_colorValue\n        }\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (d = function () {
            return e;
          }),
          e
        );
      }
      var p = function (e) {
          var t = e.children,
            n = e.customStyleSheet,
            r = c()(e, ["children", "customStyleSheet"]);
          return s.useMemo(
            function () {
              var e, t;
              return (0, m.eQ)(
                null == n ||
                  null === (e = n.global) ||
                  void 0 === e ||
                  null === (t = e.colorPalette) ||
                  void 0 === t
                  ? void 0
                  : t.background
              );
            },
            [n]
          )
            ? s.createElement(f.x, l()({ backgroundColor: "BACKGROUND" }, r), t)
            : s.createElement(f.x, r, t);
        },
        h = (0, u.Ps)(d(), m.xW);
    },
    10103: (e, t, n) => {
      "use strict";
      n.d(t, { v$: () => m, G8: () => f, Ps: () => d, Kc: () => p });
      var r = n(28655),
        o = n.n(r),
        a = n(71439),
        l = n(67294),
        i = n(28309),
        c = n(534);
      function u() {
        var e = o()([
          "\n  fragment CustomThemeProvider_customStyleSheet on CustomStyleSheet {\n    id\n    ...customDefaultBackgroundTheme_customStyleSheet\n    ...customStyleSheetFontTheme_customStyleSheet\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (u = function () {
            return e;
          }),
          e
        );
      }
      function s() {
        var e = o()([
          "\n  fragment CustomThemeProvider_publisher on Publisher {\n    id\n    __typename\n    ... on Collection {\n      colorPalette {\n        ...customDefaultBackgroundTheme_colorPalette\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      var m = function (e, t) {
          var n = (0, i.Fg)(),
            r =
              "Collection" === (null == t ? void 0 : t.__typename)
                ? null == t
                  ? void 0
                  : t.colorPalette
                : null;
          return (0, c.ZI)(e, (0, c.zI)(e, n, r));
        },
        f = function (e) {
          var t = e.customStyleSheet,
            n = e.publisher,
            r = e.children,
            o = m(t, n);
          return l.createElement(i.f6, { theme: o }, r);
        },
        d = (0, a.Ps)(s(), c.L9),
        p = (0, a.Ps)(u(), c.Ui, c.VE);
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/664.328698ca.chunk.js.map
