(self.webpackChunklite = self.webpackChunklite || []).push([
  [9972],
  {
    48793: (e, t, n) => {
      "use strict";
      n.d(t, { VC: () => f, GT: () => v });
      var o = n(28655),
        r = n.n(o),
        l = n(71439),
        i = n(67294),
        a = n(49925),
        c = n(8558),
        u = n(85432),
        m = n(67995),
        s = n(28309),
        h = n(14391),
        d = n(90038);
      function g() {
        var e = r()([
          "\n  fragment CollectionLogo_image on ImageMetadata {\n    id\n    originalHeight\n    originalWidth\n  }\n",
        ]);
        return (
          (g = function () {
            return e;
          }),
          e
        );
      }
      function p() {
        var e = r()([
          "\n  fragment CollectionLogo_collection on Collection {\n    ...auroraHooks_publisher\n    name\n    isAuroraVisible\n    logo {\n      id\n      originalWidth\n      originalHeight\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      function f(e) {
        var t = e.clamp,
          n = void 0 === t ? 1 : t,
          o = e.collection,
          r = e.maxWidth,
          l = e.maxHeight,
          g = e.textScale,
          p = void 0 === g ? "S" : g,
          f = e.withTextColorSubtle,
          v = void 0 !== f && f,
          b = e.customNameColor,
          E = e.customLogoImage,
          x = e.nameTreatment,
          C = (0, s.Iq)(),
          w = (0, m.n)({ name: "heading", scale: p, clamp: n }),
          I = (function (e, t) {
            return function (n) {
              return { color: t || n.baseColor.text[e] };
            };
          })(v ? "normal" : "dark", b),
          k = (0, a.Iq)(o) && void 0 !== E ? E : o.logo;
        if (!k || !k.id || x === h.m3.NAME_TREATMENT_TEXT)
          return i.createElement(
            "span",
            { className: C([w, I]) },
            o.name || ""
          );
        var S = k.id,
          L = k.originalWidth || 100,
          T = k.originalHeight || 100;
        if (r && L > r) {
          var y = L / r;
          (L = Math.floor(L / y)), (T = Math.floor(T / y));
        }
        if (l && T > l) {
          var N = T / l;
          (L = Math.floor(L / N)), (T = Math.floor(T / N));
        }
        return i.createElement(
          u.xu,
          { width: "".concat(L, "px"), height: "".concat(T, "px") },
          i.createElement(c.UV, {
            miroId: S,
            alt: o.name || "Publication logo",
            width: L,
            height: T,
            strategy: d._S.Resample,
          })
        );
      }
      var v = (0, l.Ps)(p(), a.C5);
      (0, l.Ps)(g());
    },
    9972: (e, t, n) => {
      "use strict";
      n.d(t, { NL: () => ne, XL: () => te, JE: () => oe });
      var o = n(28655),
        r = n.n(o),
        l = n(59713),
        i = n.n(l),
        a = n(63038),
        c = n.n(a),
        u = n(71439),
        m = n(67294),
        s = n(67154),
        h = n.n(s),
        d = n(12291),
        g = n(48793),
        p = n(85432),
        f = n(77714),
        v = n(15849),
        b = n(83249),
        E = n(98701),
        x = n(28309),
        C = function (e) {
          var t = e.fontConfig,
            n = e.scale,
            o = e.tag,
            r = e.children,
            l = e.additionalRules,
            i = e.clamp,
            a = e.leadingTrim,
            u = (0, x.Iq)(),
            s = o,
            h = { fontFamily: t.family, fontWeight: t.weight },
            d = (0, E.mu)(function (e) {
              var n = c()(e, 1)[0];
              return t.lineHeight[n];
            }, n),
            g = (0, b.M)({ fontConfig: t, scale: n }),
            p = i ? (0, f.V)({ clamp: i, lineHeight: d }) : void 0,
            C = a ? (0, v.KR)({ fontConfig: t, scale: n }) : void 0;
          return m.createElement(s, { className: u([h, g, p, C, l]) }, r);
        },
        w = n(80637);
      function I() {
        var e = r()([
          "\n  fragment CollectionNavItems_collection on Collection {\n    navItems {\n      title\n      url\n      type\n    }\n  }\n",
        ]);
        return (
          (I = function () {
            return e;
          }),
          e
        );
      }
      var k = function (e) {
          var t;
          return (
            (t = {
              listStyleType: "none",
              margin: 0,
              lineHeight: "40px",
              whiteSpace: "nowrap",
              overflowX: "auto",
              display: "flex",
              alignItems: "flex-start",
            }),
            i()(t, w.sm(e), { display: "none" }),
            i()(t, "marginTop", "".concat(20, "px")),
            i()(t, "paddingTop", "".concat(20, "px")),
            i()(t, "height", "".concat(80, "px")),
            t
          );
        },
        S = {
          display: "flex",
          alignItems: "center",
          height: "".concat(20, "px"),
          marginRight: "15px",
          marginLeft: "15px",
          ":first-child": { marginLeft: 0 },
        },
        L = function (e) {
          return {
            height: "".concat(20, "px"),
            minWidth: "1px",
            backgroundColor: e.baseColor.border.normal,
          };
        };
      function T(e) {
        var t = e.navItems,
          n = e.withTextColorSubtle,
          o = (0, x.Iq)(),
          r = (0, x.Fg)();
        return t
          ? m.createElement(
              "ul",
              { className: o(k) },
              t.map(function (e, t) {
                return (
                  e.url &&
                  m.createElement(
                    m.Fragment,
                    { key: t },
                    "EXTERNAL_LINK_NAV_ITEM" === e.type &&
                      m.createElement("span", { className: o(L) }),
                    m.createElement(
                      "li",
                      { className: o(S) },
                      m.createElement(
                        C,
                        {
                          fontConfig: r.newFonts.detail,
                          scale: "S",
                          tag: "span",
                          additionalRules:
                            ((l = n ? "lighter" : "normal"),
                            function (e) {
                              return {
                                color: e.baseColor.text[l],
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                              };
                            }),
                        },
                        m.createElement(p.rU, { href: e.url }, e.title)
                      )
                    )
                  )
                );
                var l;
              })
            )
          : null;
      }
      var y = (0, u.Ps)(I()),
        N = n(56862),
        O = n(41996),
        _ = n(27952),
        M = n(534);
      function A() {
        var e = r()([
          "\n  fragment CollectionMetabarBottom_collection on Collection {\n    slug\n    ...CollectionNavItems_collection\n    ...CollectionLogo_collection\n    ...collectionUrl_collection\n    ...ThemeUtilTintBackground_collection\n  }\n  ",
          "\n  ",
          "\n  ",
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
      var B = (0, u.Ps)(A(), y, g.GT, _.nfI, M.Uv),
        j = (0, d.$j)(function (e) {
          return { currentLocation: e.navigation.currentLocation };
        })(function (e) {
          var t = e.collection,
            n = e.currentLocation,
            o = e.shouldShowCollectionLogo,
            r = void 0 === o || o,
            l = e.withBorderTop,
            a = void 0 !== l && l,
            c = e.withTextColorSubtle,
            u = void 0 !== c && c,
            s = e.breakpoint,
            d = void 0 === s ? O.j.sm : s,
            f = t.navItems.slice().length > 0;
          return m.createElement(
            p.xu,
            h()(
              {
                backgroundColor: "BACKGROUND",
                display: f ? "block" : "none",
                borderTop: a ? "BASE_LIGHTER" : "NONE",
              },
              i()({}, d, { display: "block" })
            ),
            m.createElement(
              p.Pm,
              null,
              m.createElement(
                p.xu,
                {
                  display: "flex",
                  alignItems: "center",
                  height: "54px",
                  overflow: "hidden",
                },
                r
                  ? m.createElement(
                      p.xu,
                      { flexShrink: "0", marginRight: "40px" },
                      m.createElement(
                        N.e,
                        { href: (0, _.WGd)(t, n) },
                        m.createElement(g.VC, {
                          collection: t,
                          maxWidth: 300,
                          maxHeight: 36,
                          textScale: "S",
                          withTextColorSubtle: u,
                        })
                      )
                    )
                  : null,
                m.createElement(
                  p.xu,
                  { flexShrink: "1", overflow: "auto" },
                  m.createElement(T, {
                    navItems: t.navItems,
                    withTextColorSubtle: u,
                  })
                )
              )
            )
          );
        }),
        R = n(60046),
        P = n(32078),
        D = n(41850),
        F = n(6401),
        G = n(43689),
        H = n(34675),
        W = n(74465);
      function U() {
        var e = r()([
          "\n  fragment CollectionMetabarTop_collection on Collection {\n    slug\n    ...CollectionLogo_collection\n    ...collectionUrl_collection\n    ...MetabarActions_publisher\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (U = function () {
            return e;
          }),
          e
        );
      }
      var V = (0, u.Ps)(U(), g.GT, _.nfI, P.$R),
        K = (0, d.$j)(function (e) {
          return {
            authDomain: e.config.authDomain,
            currentLocation: e.navigation.currentLocation,
          };
        })(function (e) {
          var t = e.authDomain,
            n = e.collection,
            o = e.currentLocation,
            r = e.isAmp,
            l = e.post,
            a = e.shouldShowCollectionLogo,
            c = e.withMonogramDark,
            u = e.setIsMetabarLocked,
            s = e.breakpoint,
            d = void 0 === s ? O.j.sm : s,
            f = e.hideOpenInAppLink,
            v = void 0 !== f && f;
          return m.createElement(
            p.xu,
            { backgroundColor: "BACKGROUND" },
            m.createElement(
              p.Pm,
              null,
              m.createElement(
                p.xu,
                h()(
                  {
                    display: "flex",
                    alignItems: "center",
                    height: "".concat(G.Je, "px"),
                  },
                  i()({}, d, { display: "flex", height: "".concat(G.R2, "px") })
                ),
                m.createElement(
                  p.xu,
                  {
                    display: "flex",
                    alignItems: "center",
                    flexGrow: "1",
                    zIndex: W.ZP.metabar,
                  },
                  m.createElement(
                    N.e,
                    {
                      href: "https://".concat(t, "/"),
                      "aria-label": "Homepage",
                    },
                    m.createElement(R.YR, { contrast: c ? "dark" : "normal" })
                  ),
                  a &&
                    m.createElement(
                      m.Fragment,
                      null,
                      m.createElement(
                        p.xu,
                        h()(
                          {
                            height: "24px",
                            width: "1px",
                            marginLeft: "15px",
                            marginRight: "14px",
                            borderLeft: "BASE_LIGHT",
                          },
                          i()({}, d, { display: "none" })
                        )
                      ),
                      m.createElement(
                        p.xu,
                        i()({}, d, { display: "none" }),
                        m.createElement(
                          N.e,
                          { href: (0, _.WGd)(n, o) },
                          m.createElement(g.VC, {
                            collection: n,
                            maxWidth: 240,
                            maxHeight: 36,
                            textScale: "M",
                          })
                        )
                      )
                    ),
                  m.createElement(H.I8, null, function (e) {
                    return !v && e
                      ? m.createElement(F.a, {
                          postId: l && l.id,
                          collectionSlug: n.slug,
                        })
                      : m.createElement(m.Fragment, null);
                  })
                ),
                m.createElement(
                  p.xu,
                  { flexGrow: "0", zIndex: W.ZP.metabar },
                  r
                    ? m.createElement(D.p7, {
                        withoutConversionButton: !0,
                        post: l,
                        publisher: n,
                      })
                    : m.createElement(P.pJ, {
                        post: l,
                        publisher: n,
                        withoutConversionButton: !0,
                        setIsMetabarLocked: u,
                      })
                )
              )
            )
          );
        }),
        q = n(62872),
        J = n(60054),
        X = n(67297);
      function $() {
        var e = r()([
          "\n  fragment CollectionMetabar_collection on Collection {\n    id\n    colorBehavior\n    isAuroraVisible\n    favicon {\n      id\n    }\n    ...CollectionMetabarTop_collection\n    ...CollectionMetabarBottom_collection\n    ...collectionDefaultBackgroundTheme_collection\n    ...collectionTintBackgroundTheme_collection\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          ($ = function () {
            return e;
          }),
          e
        );
      }
      function z(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t &&
            (o = o.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, o);
        }
        return n;
      }
      function Z(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? z(Object(n), !0).forEach(function (t) {
                i()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : z(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function Y(e) {
        return G.Je + (e ? G.ls : 0);
      }
      function Q(e) {
        return G.R2 + (e ? G.ls : 0);
      }
      function ee(e) {
        var t,
          n = e.post,
          o = e.collection,
          r = e.isAmp,
          l = e.isFixed,
          i = e.behavior,
          a = e.shouldShowBottomMetabar,
          u = void 0 === a || a,
          s = e.hideOpenInAppLink,
          h = (0, x.Fg)(),
          d = m.useState(!1),
          g = c()(d, 2),
          f = g[0],
          v = g[1],
          b = m.useState(!1),
          E = c()(b, 2),
          C = E[0],
          w = E[1],
          I = (0, X.v9)(function (e) {
            return e.client.isNativeMedium;
          }),
          k = "ACCENT_COLOR" === o.colorBehavior,
          S = o.navItems && o.navItems.length > 0,
          L = u && S,
          T = !(L || C),
          y = k || L || C;
        if (
          (m.useEffect(function () {
            window.innerWidth < h.breakpoints.md && w(!0);
          }, []),
          I)
        )
          return null;
        var N =
          u &&
          m.createElement(
            p.f6,
            { theme: k ? (0, M.jN)(o, h) : (0, M.N9)(o, h) },
            m.createElement(j, {
              collection: o,
              withBorderTop: k,
              withTextColorSubtle: k,
            })
          );
        return m.createElement(
          m.Fragment,
          null,
          m.createElement(
            q.l,
            {
              height: Y(S && u),
              heightSm: Q(!C && u),
              isFixed: C || l,
              isLocked: C || f,
              behavior: i,
              marginBottom: 0,
              marginBottomSm: 0,
            },
            m.createElement(J.s, {
              faviconImageId:
                null == o || null === (t = o.favicon) || void 0 === t
                  ? void 0
                  : t.id,
            }),
            m.createElement(
              p.f6,
              { theme: y ? (0, M.jN)(o, h) : (0, M.N9)(o, h) },
              m.createElement(K, {
                post: n,
                collection: o,
                isAmp: r,
                shouldShowCollectionLogo: T,
                withMonogramDark: y,
                setIsMetabarLocked: v,
                hideOpenInAppLink: s,
              })
            ),
            !C && N
          ),
          C && N
        );
      }
      function te(e) {
        var t,
          n = e.post,
          o = e.collection,
          r = e.isAmp,
          l = e.isFixed,
          i = e.behavior,
          a = e.shouldShowCollectionLogo,
          u = void 0 === a || a,
          s = e.shouldShowBottomMetabar,
          h = void 0 === s || s,
          d = e.hideOpenInAppLink,
          g = (0, x.Fg)(),
          f = "ACCENT_COLOR" === o.colorBehavior,
          v = f ? (0, M.jN)(o, g) : (0, M.N9)(o, g),
          b = m.useState(!1),
          E = c()(b, 2),
          C = E[0],
          w = E[1],
          I = f ? "#E5E5E5" : v.baseColor.border.light,
          k = m.useState(!1),
          S = c()(k, 2),
          L = S[0],
          T = S[1],
          y = Z(Z({}, o), {}, { navItems: [] }),
          N = y.navItems && y.navItems.length > 0,
          _ = h && (u || N),
          A = (0, X.v9)(function (e) {
            return e.client.isNativeMedium;
          });
        if (
          (m.useEffect(function () {
            window.innerWidth < g.breakpoints.md && w(!0);
          }, []),
          A)
        )
          return null;
        var B = function (e) {
            return {
              borderTop: "1px solid ".concat(e.baseColor.border.lighter),
              opacity: 0.4,
            };
          },
          R = m.createElement(j, {
            collection: y,
            shouldShowCollectionLogo: u,
            withBorderTop: f,
            withTextColorSubtle: f,
            breakpoint: O.j.xs,
          });
        return m.createElement(
          m.Fragment,
          null,
          m.createElement(
            q.l,
            {
              borderColor: I,
              height: Y(N && h),
              heightSm: Q(!C && u && h),
              isFixed: C || l,
              isLocked: C || L,
              behavior: i,
              marginBottom: 0,
              marginBottomSm: 0,
              breakpoint: O.j.xs,
            },
            m.createElement(J.s, {
              faviconImageId:
                null == o || null === (t = o.favicon) || void 0 === t
                  ? void 0
                  : t.id,
            }),
            m.createElement(
              p.f6,
              { theme: v },
              m.createElement(
                p.xu,
                { backgroundColor: "BACKGROUND" },
                m.createElement(K, {
                  post: n,
                  collection: y,
                  isAmp: r,
                  shouldShowCollectionLogo: u && (!N || !h),
                  withMonogramDark: !f,
                  setIsMetabarLocked: T,
                  breakpoint: O.j.xs,
                  hideOpenInAppLink: d,
                }),
                _ && !f
                  ? m.createElement(x.hS, null, function (e) {
                      return m.createElement("div", { className: e(B) });
                    })
                  : null,
                !C && _ && R
              )
            )
          ),
          C &&
            _ &&
            m.createElement(
              p.f6,
              { theme: v },
              m.createElement(p.xu, { backgroundColor: "BACKGROUND" }, R)
            )
        );
      }
      function ne(e) {
        return e.collection.isAuroraVisible
          ? m.createElement(te, e)
          : m.createElement(ee, e);
      }
      var oe = (0, u.Ps)($(), V, B, M.Gi, M.VR);
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/9972.f6abd8ac.chunk.js.map
