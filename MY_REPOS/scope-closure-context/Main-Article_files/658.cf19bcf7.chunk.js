(self.webpackChunklite = self.webpackChunklite || []).push([
  [658],
  {
    20386: (e, t, n) => {
      "use strict";
      n.d(t, { Z: () => i });
      var r = n(67294);
      function o() {
        return (o =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      var l = r.createElement("path", {
        d: "M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z",
      });
      const i = function (e) {
        return r.createElement("svg", o({ width: 29, height: 29 }, e), l);
      };
    },
    92013: (e, t, n) => {
      "use strict";
      n.d(t, { h: () => i });
      var r = n(76972),
        o = n(27003),
        l = n(95482);
      function i(e) {
        var t = e.hasPrefix,
          n = void 0 !== t && t,
          i = e.timestamp,
          a = Date.now(),
          c = (0, r.Z)(a, i);
        if (0 === c) return n ? "just now" : "Just now";
        if (c >= 1 && c < 24)
          return "".concat(c, " hour").concat(c > 1 ? "s" : "", " ago");
        var u = (0, o.Z)(a, i);
        return u >= 1 && u < 7
          ? "".concat(u, " day").concat(u > 1 ? "s" : "", " ago")
          : (0, l.E)({ timestamp: i });
      }
    },
    10963: (e, t, n) => {
      "use strict";
      n.d(t, { P: () => s, u: () => d });
      var r = n(98913),
        o = n.n(r),
        l = n(67294),
        i = n(85432),
        a = n(28309),
        c = function () {
          return l.createElement(
            i.xu,
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "16px",
              width: "100%",
            },
            l.createElement(
              i.xu,
              { width: "100%" },
              l.createElement(
                i.xu,
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "20px",
                },
                l.createElement(i.xu, {
                  height: "20px",
                  width: "20px",
                  backgroundColor: "BASE_NORMAL",
                  borderRadius: "10px",
                  marginRight: "8px",
                }),
                l.createElement(i.xu, {
                  height: "8px",
                  width: "82px",
                  backgroundColor: "BASE_NORMAL",
                })
              ),
              l.createElement(i.xu, {
                width: "80%",
                height: "16px",
                marginBottom: "12px",
                backgroundColor: "BASE_NORMAL",
              }),
              l.createElement(i.xu, {
                width: "65%",
                height: "16px",
                marginBottom: "12px",
                backgroundColor: "BASE_NORMAL",
              })
            ),
            l.createElement(i.xu, {
              height: "133px",
              width: "200px",
              backgroundColor: "BASE_NORMAL",
            })
          );
        },
        u = {
          "0%": { opacity: "0.8" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "0.8" },
        },
        s = function () {
          var e = (0, a.om)({ shimmerKeyframesName: u }).shimmerKeyframesName;
          return { animation: "".concat(e, " 1.2s ease-in-out infinite") };
        },
        d = function (e) {
          var t = e.numPlaceholders,
            n = void 0 === t ? 4 : t,
            r = (0, a.Iq)(),
            i = s();
          return l.createElement(
            "div",
            {
              className: r(function () {
                return i;
              }),
            },
            o()(n, function (e) {
              return l.createElement(c, { key: "placeholder-".concat(e) });
            })
          );
        };
    },
    88065: (e, t, n) => {
      "use strict";
      n.d(t, { e: () => r.e, z: () => r.z });
      var r = n(86753);
    },
    54415: (e, t, n) => {
      "use strict";
      n.d(t, { v: () => s, G: () => d });
      var r = n(28655),
        o = n.n(r),
        l = n(71439),
        i = n(67294),
        a = n(73882),
        c = n(98281);
      function u() {
        var e = o()([
          "\n  fragment PublisherAvatar_publisher on Publisher {\n    __typename\n    ... on Collection {\n      id\n      ...CollectionAvatar_collection\n    }\n    ... on User {\n      id\n      ...UserAvatar_user\n    }\n  }\n  ",
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
      var s = (0, l.Ps)(u(), a.d, c.WQ),
        d = function (e) {
          var t = e.link,
            n = void 0 !== t && t,
            r = e.scale,
            o = void 0 === r ? "M" : r,
            l = e.publisher;
          switch (l.__typename) {
            case "User":
              return i.createElement(c.Yt, { link: n, scale: o, user: l });
            case "Collection":
              return i.createElement(a.v, {
                link: n,
                size: c.wC[o],
                collection: l,
              });
            default:
              return null;
          }
        };
    },
    97297: (e, t, n) => {
      "use strict";
      n.d(t, { gp: () => m, DX: () => p, b5: () => f });
      var r = n(28655),
        o = n.n(r),
        l = n(71439),
        i = n(67294),
        a = n(22091),
        c = n(64504),
        u = n(27390),
        s = n(27952);
      function d() {
        var e = o()([
          "\n  fragment PublisherFollowingCount_publisher on Publisher {\n    __typename\n    id\n    ... on User {\n      socialStats {\n        followingCount\n      }\n      followedCollections\n      username\n    }\n  }\n",
        ]);
        return (
          (d = function () {
            return e;
          }),
          e
        );
      }
      var m = function (e) {
          var t,
            n,
            r =
              null !==
                (t =
                  "Collection" === e.__typename
                    ? 0
                    : (null === (n = e.socialStats) || void 0 === n
                        ? void 0
                        : n.followingCount) + e.followedCollections) &&
              void 0 !== t
                ? t
                : 0;
          return { followingCount: r, isFollowingCountVisible: r > 0 };
        },
        p = function (e) {
          var t,
            n = e.publisher,
            r = e.linkStyle,
            o = void 0 === r ? "SUBTLE" : r,
            l = m(n),
            d = l.followingCount,
            p = l.isFollowingCountVisible,
            f =
              "User" === n.__typename
                ? (0, s.MzF)(null !== (t = n.username) && void 0 !== t ? t : "")
                : "",
            g = !!f;
          if (!p) return null;
          var h = "".concat((0, u.pY)(d), " Following");
          return g
            ? i.createElement(a.rU, { linkStyle: o, href: f }, h)
            : i.createElement(
                c.F,
                { tag: "span", scale: "L", color: "DARKER" },
                h
              );
        },
        f = (0, l.Ps)(d());
    },
    78886: (e, t, n) => {
      "use strict";
      n.d(t, {
        KL: () => N,
        mK: () => U,
        Lk: () => M,
        eB: () => G,
        qy: () => z,
        FB: () => W,
      });
      var r = n(28655),
        o = n.n(r),
        l = n(59713),
        i = n.n(l),
        a = n(63038),
        c = n.n(a),
        u = n(46829),
        s = n(71439),
        d = n(67294),
        m = n(54415),
        p = n(97297),
        f = n(44935),
        g = n(53976),
        h = n(34675),
        v = n(68421),
        b = n(41832),
        x = n(22091),
        E = n(64504),
        w = n(67995),
        y = n(27599),
        S = n(27572),
        _ = n(28309),
        B = n(19551),
        C = n(14391),
        O = n(67297),
        L = n(27390),
        A = n(27952);
      function I() {
        var e = o()([
          "\n  query PublisherSidebarFollowsQuery($userId: ID!, $limit: Int) {\n    userFollows(userId: $userId, limit: $limit) {\n      ... on User {\n        hasDomain\n        ...UserMentionTooltip_user\n        ...PublisherSidebarFollows_followedEntity\n      }\n      ... on Collection {\n        ...CollectionTooltip_collection\n        ...PublisherSidebarFollows_followedEntity\n      }\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (I = function () {
            return e;
          }),
          e
        );
      }
      function F() {
        var e = o()([
          "\n  fragment PublisherSidebarFollows_followedEntity on Publisher {\n    __typename\n    id\n    name\n    ...PublisherAvatar_publisher\n  }\n  ",
          "\n",
        ]);
        return (
          (F = function () {
            return e;
          }),
          e
        );
      }
      function k() {
        var e = o()([
          "\n  fragment PublisherSidebarFollows_user on User {\n    id\n    name\n    username\n    ...PublisherFollowingCount_publisher\n    ...userUrl_user\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (k = function () {
            return e;
          }),
          e
        );
      }
      function P() {
        var e = o()([
          "\n  fragment PublisherSidebarFollows_customStyleSheet on CustomStyleSheet {\n    id\n    blogroll {\n      visibility\n    }\n  }\n",
        ]);
        return (
          (P = function () {
            return e;
          }),
          e
        );
      }
      function R(e, t) {
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
      function D(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? R(Object(n), !0).forEach(function (t) {
                i()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : R(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var T,
        N = function (e) {
          var t,
            n = (0, g.V)({ name: "enable_blogrolls", placeholder: !1 }),
            r =
              (null == e || null === (t = e.blogroll) || void 0 === t
                ? void 0
                : t.visibility) === C.n$.BLOGROLL_VISIBILITY_SIDEBAR;
          return { isBlogrollInSidebar: n && r };
        },
        U = function (e, t) {
          var n,
            r = (0, h.Hk)().value,
            o = "User" === e.__typename && e.id === (null == r ? void 0 : r.id),
            l =
              (null == t || null === (n = t.blogroll) || void 0 === n
                ? void 0
                : n.visibility) === C.n$.BLOGROLL_VISIBILITY_SIDEBAR,
            i = !(
              null == r || !r.dismissableFlags.includes(C.T3.BLOGROLL_ENABLE)
            );
          return { useGhostBlogroll: o && !i && !l };
        },
        M = d.createContext({ homepageUserId: null, postId: null });
      !(function (e) {
        (e[(e.Initial = 0)] = "Initial"),
          (e[(e.Secondary = 1)] = "Secondary"),
          (e[(e.Dismissed = 2)] = "Dismissed"),
          (e[(e.Navigating = 3)] = "Navigating"),
          (e[(e.Updated = 4)] = "Updated");
      })(T || (T = {}));
      var j = function (e) {
          return {
            backgroundColor: e.backgroundColor,
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: ".65",
          };
        },
        G = function (e) {
          var t,
            n,
            r = e.publisher,
            o = e.isVisible,
            l = e.customStyleSheet,
            i = e.withBottomBorder,
            a = void 0 !== i && i,
            s = (0, _.Iq)(),
            g = (0, h.Hk)().value,
            I = (0, O.v9)(function (e) {
              return e.config.authDomain;
            }),
            F = (0, O.p9)(function (e) {
              return e.config.isAmp;
            }),
            k = (0, O.v9)(function (e) {
              return e.navigation.currentLocation;
            }),
            P = (0, A.MzF)(null !== (t = r.username) && void 0 !== t ? t : ""),
            R = d.useState(T.Initial),
            N = c()(R, 2),
            G = N[0],
            z = N[1],
            W = (0, w.n)({
              name: "detail",
              scale: "S",
              clamp: 1,
              leadingTrim: !1,
              color: "LIGHTER",
            }),
            $ = s([W, { wordBreak: "break-all" }]),
            K = "User" === r.__typename && r.id === (null == g ? void 0 : g.id),
            Y =
              (null == l || null === (n = l.blogroll) || void 0 === n
                ? void 0
                : n.visibility) === C.n$.BLOGROLL_VISIBILITY_SIDEBAR,
            X = U(r, l).useGhostBlogroll,
            H =
              K &&
              Y &&
              !(null != g && g.dismissableFlags.includes(C.T3.BLOGROLL_UPDATE)),
            q = Y ? C.T3.BLOGROLL_UPDATE : C.T3.BLOGROLL_ENABLE,
            J = (0, y.Av)(),
            Z = d.useContext(M),
            Q = (0, B.g)({
              onPresentedFn: function () {
                return J.event(
                  "sidebar.blogrollViewed",
                  D(D({}, Z), {}, { viewerIsAuthor: K, showingGhost: X })
                );
              },
            }),
            ee = (0, u.useLazyQuery)(V, {
              ssr: !1,
              variables: { userId: r.id, limit: 5 },
            }),
            te = c()(ee, 2),
            ne = te[0],
            re = te[1],
            oe = re.called,
            le = re.loading,
            ie = re.error,
            ae = re.data,
            ce = (ae = void 0 === ae ? { userFollows: void 0 } : ae)
              .userFollows,
            ue = (0, p.gp)(r).followingCount,
            se = d.useCallback(
              function (e) {
                return function () {
                  var t =
                    G === T.Initial
                      ? "Blogrolls help your readers discover writers you follow. Writers who have published most recently show up at the top."
                      : "You can always turn on blogroll in your design editor. Until then, readers can get to your Following from the About page.";
                  H &&
                    (t =
                      "Your blogroll no longer includes publications, only writers who have published recently.");
                  var n = function (t, n) {
                    z(t), e(n);
                  };
                  return d.createElement(
                    x.xu,
                    { minWidth: "240px", padding: "20px" },
                    d.createElement(
                      E.F,
                      { scale: "S" },
                      H && d.createElement("b", null, "Update: "),
                      t
                    ),
                    d.createElement(
                      x.xu,
                      { marginTop: "20px" },
                      d.createElement(
                        E.F,
                        { scale: "S" },
                        G || H
                          ? d.createElement(
                              x.rU,
                              {
                                linkStyle: "OBVIOUS",
                                onClick: function () {
                                  return n(T.Dismissed, v.$S.DISMISSED);
                                },
                              },
                              "Got it"
                            )
                          : d.createElement(
                              d.Fragment,
                              null,
                              d.createElement(
                                x.rU,
                                {
                                  linkStyle: "OBVIOUS",
                                  href: (0, A.aLX)(I, {
                                    unfold: "Blogroll",
                                    action: "enableBlogroll",
                                  }),
                                  onClick: function () {
                                    return n(T.Navigating, v.$S.CTA);
                                  },
                                },
                                "Turn on"
                              ),
                              d.createElement(
                                "span",
                                { className: s({ marginLeft: "8px" }) },
                                d.createElement(
                                  x.rU,
                                  {
                                    linkStyle: "SUBTLE",
                                    onClick: function () {
                                      return z(T.Secondary);
                                    },
                                  },
                                  "Not now"
                                )
                              )
                            )
                      )
                    )
                  );
                };
              },
              [G]
            );
          return F || (!X && !Y) || (G === T.Dismissed && !H)
            ? null
            : oe
            ? le || ie || !ce || !ce.length || ue < 5
              ? null
              : d.createElement(
                  S.cW,
                  {
                    source: {
                      name: "blogrolls_sidebar",
                      postId: Z.postId || void 0,
                    },
                  },
                  d.createElement(
                    x.xu,
                    {
                      ref: Q,
                      position: "relative",
                      borderTop: "BASE_LIGHTER",
                      borderBottom: a ? "NONE" : void 0,
                    },
                    X ? d.createElement("div", { className: s([j]) }) : null,
                    d.createElement(
                      x.xu,
                      { marginTop: "32px", marginBottom: "32px" },
                      d.createElement(
                        v.oP,
                        {
                          flag: q,
                          isVisible: o && (X || H),
                          targetDistance: 15,
                          renderFn: se,
                        },
                        d.createElement(
                          "span",
                          {
                            className: s({
                              textTransform: "uppercase",
                              marginBottom: "8px",
                            }),
                          },
                          d.createElement(
                            E.F,
                            { scale: "S", tag: "span" },
                            "".concat(r.name, " Follows")
                          )
                        ),
                        d.createElement(
                          "ul",
                          { className: s({ marginTop: "8px" }) },
                          ce.map(function (e) {
                            var t =
                              "User" === e.__typename
                                ? (0, A.AWr)(e, I)
                                : (0, A.WGd)(e, k, I);
                            return d.createElement(
                              "li",
                              {
                                className: s({
                                  display: "grid",
                                  gridTemplateColumns: "auto 1fr auto",
                                }),
                                key: null == e ? void 0 : e.id,
                              },
                              d.createElement(
                                x.xu,
                                { paddingRight: "12px" },
                                d.createElement(m.G, {
                                  link: !0,
                                  publisher: e,
                                  scale: "XXXS",
                                })
                              ),
                              d.createElement(
                                "section",
                                { className: s({ wordBreak: "break-word" }) },
                                d.createElement(
                                  x.xu,
                                  {
                                    marginBottom: "8px",
                                    paddingRight: "10px",
                                    tag: "span",
                                  },
                                  d.createElement(
                                    x.rU,
                                    { href: t },
                                    d.createElement(
                                      x.$W,
                                      {
                                        placement: "right",
                                        targetDistance: 15,
                                        mouseEnterDelay: 500,
                                        mouseLeaveDelay: 0,
                                        noPortal: !1,
                                        disablePortalOverlay: !0,
                                        role: "tooltip",
                                        popoverRenderFn: function () {
                                          return "User" === e.__typename
                                            ? d.createElement(b.K$, { user: e })
                                            : d.createElement(f.L, {
                                                collection: e,
                                                buttonSize: "COMPACT",
                                                buttonStyleFn: function (e) {
                                                  return e
                                                    ? "OBVIOUS"
                                                    : "STRONG";
                                                },
                                              });
                                        },
                                      },
                                      d.createElement(
                                        "h4",
                                        { className: $ },
                                        e.name
                                      )
                                    )
                                  )
                                )
                              )
                            );
                          })
                        ),
                        d.createElement(
                          E.F,
                          { scale: "S" },
                          d.createElement(
                            x.rU,
                            { linkStyle: "SUBTLE", href: P },
                            "See all (".concat((0, L.rR)(ue), ")")
                          )
                        )
                      )
                    )
                  )
                )
            : (ne(), null);
        },
        z = (0, s.Ps)(P()),
        W = (0, s.Ps)(k(), p.b5, A.$mN),
        $ = (0, s.Ps)(F(), m.v),
        V = (0, s.Ps)(I(), b.OJ, f.g, $);
    },
    44935: (e, t, n) => {
      "use strict";
      n.d(t, { L: () => m, g: () => p });
      var r = n(28655),
        o = n.n(r),
        l = n(71439),
        i = n(67294),
        a = n(73882),
        c = n(84783),
        u = n(85432),
        s = n(64504);
      function d() {
        var e = o()([
          "\n  fragment CollectionTooltip_collection on Collection {\n    id\n    name\n    description\n    subscriberCount\n    ...CollectionAvatar_collection\n    ...CollectionFollowButton_collection\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (d = function () {
            return e;
          }),
          e
        );
      }
      var m = function (e) {
          var t = e.collection,
            n = e.buttonSize,
            r = e.buttonStyleFn,
            o = t.name,
            l = t.description;
          return i.createElement(
            u.xu,
            {
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              width: "300px",
            },
            i.createElement(
              u.xu,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                whiteSpace: "normal",
                borderBottom: "BASE_LIGHTER",
                paddingBottom: "10px",
                marginBottom: "10px",
              },
              i.createElement(
                u.xu,
                {
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: "5px",
                },
                i.createElement(s.X6, { scale: "S" }, o),
                i.createElement(s.F, { scale: "S" }, l)
              ),
              i.createElement(
                u.xu,
                null,
                i.createElement(a.v, { collection: t, link: !0 })
              )
            ),
            i.createElement(
              u.xu,
              {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
              i.createElement(
                s.F,
                { scale: "M" },
                "Followed by ",
                t.subscriberCount,
                " people"
              ),
              i.createElement(c.Fp, {
                collection: t,
                simpleButton: !0,
                buttonSize: n,
                buttonStyleFn: r,
                susiEntry: "follow_card",
              })
            )
          );
        },
        p = (0, l.Ps)(d(), a.d, c.Iq);
    },
    51684: (e, t, n) => {
      "use strict";
      n.d(t, { ZR: () => p, HX: () => g, b2: () => h, hE: () => v });
      var r = n(59713),
        o = n.n(r),
        l = n(67294),
        i = n(28859),
        a = n(43689),
        c = n(85432),
        u = n(28309),
        s = n(27108),
        d = n(89349),
        m = n(21146),
        p = 131,
        f = function (e) {
          return { pointerEvents: e ? "auto" : "none" };
        },
        g = function (e) {
          var t = e.children,
            n = e.disableTransition,
            r = e.isFixed,
            s = e.scrollableRef,
            m = e.sidebarRef,
            g = e.testId,
            h = e.topOffset,
            v = e.visible,
            b = e.fixedWidth,
            x = e.extraWide,
            E = void 0 !== x && x,
            w = (0, u.Iq)(),
            y = (function (e) {
              var t,
                n,
                r,
                c = e.isFixed,
                u = void 0 === c || c,
                s = e.disableTransition,
                m = void 0 !== s && s,
                p = e.scrollableRef,
                f = e.topOffset,
                g = e.visible,
                h = e.fixedWidth,
                v = e.extraWide,
                b = void 0 !== v && v,
                x = (r =
                  null ===
                    (t = l.useContext(i.u6).watchedBounds.get("header")) ||
                  void 0 === t ||
                  null === (n = t.ref) ||
                  void 0 === n
                    ? void 0
                    : n.current)
                  ? r.offsetTop + r.offsetHeight + 64
                  : a.Je + 54 + 40;
              return function (e) {
                return function (t) {
                  var n,
                    r = b
                      ? "@media all and (max-width: 1240px)"
                      : (0, d.uc)(
                          t,
                          e,
                          t.grid.xStep * t.grid.marginSteps.lg,
                          p && "current" in p ? p.current : null
                        ),
                    l = void 0 === f ? x : f;
                  return (
                    (n = {
                      opacity: g ? 1 : 0,
                      pointerEvents: "none",
                      position: u ? "fixed" : "absolute",
                      willChange: "opacity, transform",
                      width: h ? "".concat(h, "px") : "100%",
                      transform: "translateY(".concat(l, "px)"),
                      top: 0,
                    }),
                    o()(n, (0, d.nk)("no-preference"), {
                      transition: m ? "opacity 0s" : "opacity 200ms",
                    }),
                    o()(n, r, { display: "none" }),
                    n
                  );
                };
              };
            })({
              isFixed: r,
              scrollableRef: s,
              topOffset: h,
              visible: v,
              disableTransition: n,
              fixedWidth: b,
              extraWide: E,
            }),
            S = E ? 197 : p;
          return l.createElement(
            "div",
            { className: w(y(S)), "data-test-id": g },
            l.createElement(
              c.Pm,
              { size: "outset" },
              l.createElement(
                c.xu,
                {
                  display: "flex",
                  flexDirection: "column",
                  width: "".concat(S, "px"),
                  ref: m,
                },
                l.createElement("div", { className: w(f(v)) }, t)
              )
            )
          );
        },
        h = function (e, t, n, r) {
          var o = e.current;
          if (!o) return !1;
          var l = r.threshold || 10,
            i = Array.from(t.values())
              .filter(function (e) {
                var t,
                  r = e.ref,
                  o = e.opts;
                return (
                  n.includes(null !== (t = o.type) && void 0 !== t ? t : "") &&
                  !!r.current
                );
              })
              .map(function (e) {
                var t = e.ref,
                  n = e.opts,
                  r = n && n.offset,
                  o = (0, m.L6)(t.current);
                return (0, m.Dd)(o, r);
              }),
            a = (0, m.L6)(o),
            c = 0 === a.width;
          return (
            !i.some(function (e) {
              return (0, m.kK)(e, a, l);
            }) && !c
          );
        },
        v = function (e, t) {
          var n =
              !(arguments.length > 2 && void 0 !== arguments[2]) ||
              arguments[2],
            r = n ? "scroll_throttled" : "scroll";
          return function () {
            var n = (0, s.jC)(null != t ? t : void 0);
            return (
              n.on(r, e),
              n.on("scroll_end", e),
              n.on("resize_throttled", e),
              function () {
                n.off(r, e),
                  n.off("scroll_end", e),
                  n.off("resize_throttled", e);
              }
            );
          };
        };
    },
    41832: (e, t, n) => {
      "use strict";
      n.d(t, { u3: () => E, K$: () => w, OJ: () => y });
      var r = n(28655),
        o = n.n(r),
        l = n(71439),
        i = n(90584),
        a = n(23450),
        c = n.n(a),
        u = n(67294),
        s = n(12291),
        d = n(92013),
        m = n(10963),
        p = n(98281),
        f = n(31001),
        g = n(85432),
        h = n(64504),
        v = n(28309),
        b = n(27390);
      function x() {
        var e = o()([
          "\n  fragment UserMentionTooltip_user on User {\n    id\n    name\n    username\n    bio\n    imageId\n    mediumMemberAt\n    socialStats {\n      followerCount\n    }\n    viewerEdge {\n      createdAt\n      lastPostCreatedAt\n    }\n    ...UserAvatar_user\n    ...UserFollowButton_user\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (x = function () {
            return e;
          }),
          e
        );
      }
      var E = function () {
          var e = (0, v.Iq)(),
            t = (0, m.P)();
          return u.createElement(
            "div",
            {
              className: e(function () {
                return t;
              }),
            },
            u.createElement(
              g.xu,
              {
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: "12px",
                width: "280px",
                backgroundColor: "BACKGROUND",
              },
              u.createElement(
                g.xu,
                { width: "100%" },
                u.createElement(
                  g.xu,
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "20px",
                  },
                  u.createElement(g.xu, {
                    height: "20px",
                    width: "20px",
                    backgroundColor: "BASE_NORMAL",
                    borderRadius: "50%",
                    marginRight: "8px",
                  }),
                  u.createElement(g.xu, {
                    height: "8px",
                    width: "82px",
                    backgroundColor: "BASE_NORMAL",
                  })
                ),
                u.createElement(g.xu, {
                  width: "80%",
                  height: "8px",
                  marginBottom: "12px",
                  backgroundColor: "BASE_NORMAL",
                }),
                u.createElement(g.xu, {
                  width: "65%",
                  height: "8px",
                  marginBottom: "12px",
                  backgroundColor: "BASE_NORMAL",
                }),
                u.createElement(g.xu, {
                  width: "85%",
                  height: "8px",
                  marginBottom: "12px",
                  backgroundColor: "BASE_NORMAL",
                }),
                u.createElement(g.xu, {
                  width: "70%",
                  height: "8px",
                  marginBottom: "12px",
                  backgroundColor: "BASE_NORMAL",
                })
              )
            )
          );
        },
        w = (0, s.$j)(function (e) {
          return { productName: e.config.productName };
        })(function (e) {
          var t,
            n = e.user,
            r = e.productName,
            o = n.id,
            l = n.name,
            a = n.username,
            s = n.bio,
            m = n.imageId,
            v = n.mediumMemberAt,
            x = n.socialStats,
            E = n.hasSubdomain,
            w = n.customDomainState,
            y = n.viewerEdge,
            S = y.createdAt,
            _ = y.lastPostCreatedAt,
            B = (0, b.pY)(null == x ? void 0 : x.followerCount);
          if (
            ((null == x ? void 0 : x.followerCount) >= 100 &&
              (t = "Followed by ".concat(B, " people")),
            _)
          )
            t = u.createElement(
              u.Fragment,
              null,
              "Last published ",
              u.createElement(d.h, { timestamp: _, hasPrefix: !0 })
            );
          else if (!_ && (null == x ? void 0 : x.followerCount) > 0)
            t = "Followed by ".concat(B, " ").concat(c()("person", B));
          else if (S) {
            var C = (0, i.Z)(S, "LLL yyyy");
            t = "Joined ".concat(r, " ").concat(C);
          } else t = "";
          return u.createElement(
            g.xu,
            {
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              width: "300px",
            },
            u.createElement(
              g.xu,
              {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                whiteSpace: "normal",
              },
              u.createElement(p.Yt, {
                scale: "XS",
                user: {
                  __typename: "User",
                  mediumMemberAt: v,
                  username: a,
                  name: l,
                  imageId: m,
                  id: o,
                  hasSubdomain: E,
                  customDomainState: w,
                },
                link: !0,
              }),
              u.createElement(
                g.xu,
                {
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "12px",
                },
                u.createElement(h.X6, { scale: "S", clamp: 2 }, l)
              )
            ),
            s &&
              u.createElement(
                g.xu,
                { paddingTop: "12px" },
                u.createElement(h.F, { scale: "S", color: "DARKER" }, s)
              ),
            u.createElement(
              g.xu,
              {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "BASE_LIGHTER",
                marginTop: "10px",
                paddingTop: "10px",
              },
              u.createElement(h.F, { scale: "S" }, t),
              u.createElement(f.Bv, {
                user: n,
                buttonSize: "COMPACT",
                susiEntry: "follow_card",
              })
            )
          );
        }),
        y = (0, l.Ps)(x(), p.WQ, f.sj);
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/658.cf19bcf7.chunk.js.map
