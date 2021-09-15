(self.webpackChunklite = self.webpackChunklite || []).push([
  [7209],
  {
    62182: (e, t, n) => {
      "use strict";
      n.r(t),
        n.d(t, {
          PostSidebarContent: () => U,
          PostSidebar: () => V,
          PostSidebar_customStyleSheet: () => Y,
          PostSidebar_collection: () => M,
          PostSidebar_post: () => $,
        });
      var o = n(28655),
        r = n.n(o),
        i = n(50008),
        a = n.n(i),
        l = n(63038),
        s = n.n(l),
        c = n(59713),
        u = n.n(c),
        d = n(71439),
        p = n(67294),
        m = n(28859),
        f = n(84783),
        v = n(22669),
        x = n(43689),
        g = n(50493),
        h = n(88065),
        E = n(47713),
        b = n(99046),
        S = n(78886),
        w = n(49925),
        y = n(93125),
        P = n(33819),
        _ = n(34675),
        R = n(51684),
        I = n(31001),
        C = n(85432),
        O = n(64504),
        k = n(67995),
        B = n(27572),
        D = n(28309),
        A = n(67297),
        j = n(89349),
        L = n(21146),
        N = n(27952);
      function T() {
        var e = r()([
          "\n  fragment PostSidebar_post on Post {\n    id\n    clapCount\n    collection {\n      ...auroraHooks_publisher\n      ...PostSidebar_collection\n    }\n    creator {\n      bio\n      name\n      ...UserFollowButton_user\n      ...auroraHooks_publisher\n      ...userUrl_user\n      ...PublisherSidebarFollows_user\n    }\n    isShortform\n    ...BookmarkButton_post\n    ...CollectionFollowButton_post\n    ...MultiVote_post\n    ...ResponsesIconButton_post\n    ...UserFollowButton_post\n    ...TableOfContents_post\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (T = function () {
            return e;
          }),
          e
        );
      }
      function F() {
        var e = r()([
          "\n  fragment PostSidebar_collection on Collection {\n    id\n    description\n    tagline\n    ...CollectionFollowButton_collection\n    ...collectionUrl_collection\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (F = function () {
            return e;
          }),
          e
        );
      }
      function H() {
        var e = r()([
          "\n  fragment PostSidebar_customStyleSheet on CustomStyleSheet {\n    ...PublisherSidebarFollows_customStyleSheet\n  }\n  ",
          "\n",
        ]);
        return (
          (H = function () {
            return e;
          }),
          e
        );
      }
      var U = function (e) {
          var t,
            n = e.customStyleSheet,
            o = e.maxHeight,
            r = void 0 === o ? 0 : o,
            i = e.post,
            a = e.showResponsesSidebar,
            l = e.visible,
            s = p.useRef(null),
            c = (0, D.Iq)(),
            u = (0, A.v9)(function (e) {
              return e.navigation.currentLocation;
            }),
            d = (0, w.GT)(i.collection || i.creator)
              ? p.createElement(G, {
                  post: i,
                  customStyleSheet: n,
                  isVisible: l,
                })
              : i.collection &&
                p.createElement(W, { post: i, currentLocation: u }),
            m = {
              maxHeight: "".concat(r, "px"),
              overflowY: "scroll",
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
              "::-webkit-scrollbar": { display: "none" },
            };
          return p.createElement(
            p.Fragment,
            null,
            i.isShortform
              ? d
              : p.createElement(
                  p.Fragment,
                  null,
                  p.createElement(
                    "div",
                    { ref: s },
                    r ? p.createElement("div", { className: c(m) }, d) : d,
                    p.createElement(
                      C.xu,
                      {
                        display: "flex",
                        flexDirection: "row",
                        borderTop: "BASE_LIGHTER",
                        paddingTop: "32px",
                        justifyContent: "flex-start",
                      },
                      p.createElement(
                        C.xu,
                        {
                          display: "flex",
                          marginTop: "-7px",
                          marginBottom: "19px",
                          marginLeft: "-3px",
                          marginRight: "27px",
                        },
                        p.createElement(b.S, {
                          post: i,
                          buttonStyle: "SUBTLE_PADDED",
                          susiEntry: "clap_sidebar",
                          hasDialog: !0,
                        })
                      ),
                      p.createElement(
                        B.cW,
                        { source: { postId: i.id }, extendSource: !0 },
                        p.createElement(
                          C.xu,
                          { marginBottom: "19px", marginRight: "16px" },
                          p.createElement(P.h, {
                            responsesCount:
                              null === (t = i.postResponses) || void 0 === t
                                ? void 0
                                : t.count,
                            location: "sidebar",
                            showResponsesSidebar: a,
                            allowResponses: i.allowResponses,
                            postId: i.id,
                            isLimitedState: i.isLimitedState,
                          })
                        ),
                        p.createElement(E.o, {
                          post: i,
                          susiEntry: "bookmark_sidebar",
                        })
                      )
                    )
                  ),
                  p.createElement(g.o5, {
                    post: i,
                    mode: "SIDEBAR",
                    heightRef: s,
                  })
                )
          );
        },
        q = { wordBreak: "break-word" },
        X = function (e) {
          var t;
          return (
            (t = {
              opacity: e ? 1 : 0,
              pointerEvents: e ? "auto" : "none",
              willChange: "opacity",
              position: "fixed",
              width: "188px",
              left: "50%",
              transform: "translateX(406px)",
              top: "calc(".concat(x.Je, "px + 54px + 14px)"),
            }),
            u()(t, (0, j.nk)("no-preference"), { transition: "opacity 200ms" }),
            u()(t, "@media all and (max-width: 1230px)", { display: "none" }),
            t
          );
        },
        V = p.forwardRef(function (e, t) {
          var n = e.isClearOfBounds,
            o = e.isOnPage,
            r = e.customStyleSheet,
            i = e.post,
            l = e.showResponsesSidebar,
            c = e.extraWide,
            u = (0, D.Iq)(),
            d = p.useContext(m.u6).watchedBounds,
            f = p.useState(o || !1),
            v = s()(f, 2),
            x = v[0],
            g = v[1],
            h = p.useState(0),
            E = s()(h, 2),
            b = E[0],
            S = E[1],
            w = p.useState(n || !1),
            P = s()(w, 2),
            _ = P[0],
            I = P[1],
            C = p.useRef(null),
            O = p.useRef(null),
            k = (function (e, t) {
              var n,
                o,
                r,
                i,
                a =
                  null === (n = e.get("byline")) ||
                  void 0 === n ||
                  null === (o = n.ref) ||
                  void 0 === o
                    ? void 0
                    : o.current,
                l =
                  null === (r = e.get("ghost-track")) ||
                  void 0 === r ||
                  null === (i = r.ref) ||
                  void 0 === i
                    ? void 0
                    : i.current,
                s =
                  (l &&
                    (0, L.L6)(l).top + window.scrollY - window.innerHeight) ||
                  0;
              if (a && l) {
                var c = a.offsetTop + a.offsetHeight + 10;
                return c - s;
              }
            })(d);
          p.useEffect(z(d, g), [d]);
          var A = p.useCallback(
            function () {
              var e, t;
              if (
                ((function (e, t, n, o, r) {
                  if (e.current) {
                    var i = t.current,
                      a = [
                        "image",
                        "bgimage",
                        "footer",
                        "byline",
                        "title",
                        "header",
                      ],
                      l = (0, R.b2)(e, n, a, r),
                      s = !i || (0, R.b2)(t, n, a, r);
                    o(l && s);
                  }
                })(C, O, d, I, { threshold: 10 }),
                null != C &&
                  null !== (e = C.current) &&
                  void 0 !== e &&
                  e.clientHeight &&
                  null !== (t = window) &&
                  void 0 !== t &&
                  t.innerHeight &&
                  k)
              ) {
                var n,
                  o,
                  r = window.innerHeight - k - 80;
                b &&
                (null == C || null === (n = C.current) || void 0 === n
                  ? void 0
                  : n.clientHeight) <= r
                  ? S(0)
                  : r <=
                      (null == C || null === (o = C.current) || void 0 === o
                        ? void 0
                        : o.clientHeight) && S(Math.max(r, 150));
              }
            },
            [d, I, b]
          );
          p.useEffect(function () {
            A();
          }, []);
          var j = "object" === a()(t) ? t : null;
          p.useEffect((0, R.hE)(A, null == j ? void 0 : j.current), [
            A,
            null == j ? void 0 : j.current,
          ]);
          var N = _ && x;
          return p.createElement(
            B.cW,
            { source: { susiEntry: "post_sidebar", name: "post_sidebar" } },
            p.createElement(
              R.HX,
              {
                testId: "post-sidebar",
                isFixed: !0,
                scrollableRef: t,
                sidebarRef: C,
                topOffset: k,
                visible: N,
                extraWide: c,
              },
              p.createElement(U, {
                customStyleSheet: r,
                maxHeight: b,
                post: i,
                showResponsesSidebar: l,
                visible: N,
              })
            ),
            p.createElement(
              "div",
              { className: u(X(N)), ref: O },
              p.createElement(y._U, { postId: i.id, isVisible: N })
            )
          );
        }),
        W = function (e) {
          var t = e.post,
            n = e.currentLocation,
            o = (0, D.Iq)(),
            r = (0, k.n)({ name: "heading", scale: "XS" }),
            i = (0, A.v9)(function (e) {
              return e.config.authDomain;
            }),
            a = t.collection;
          return a
            ? p.createElement(
                C.xu,
                { marginBottom: "32px" },
                (null == a ? void 0 : a.name) &&
                  p.createElement(
                    C.rU,
                    { href: (0, N.WGd)(a, n, i) },
                    p.createElement("h2", { className: o([r, q]) }, a.name)
                  ),
                (a.tagline || a.description) &&
                  p.createElement(
                    C.xu,
                    { paddingTop: "2px", paddingBottom: "20px" },
                    p.createElement(
                      O.F,
                      { scale: "M", clamp: 6 },
                      a.tagline || a.description
                    )
                  ),
                p.createElement(f.Fp, {
                  buttonSize: "REGULAR",
                  collection: a,
                  post: t,
                  susiEntry: "follow_sidebar",
                })
              )
            : null;
        },
        G = function (e) {
          var t = e.post,
            n = e.customStyleSheet,
            o = e.isVisible,
            r = (0, _.Hk)().value,
            i = (0, A.v9)(function (e) {
              return e.config.authDomain;
            }),
            a = (0, D.Iq)(),
            l = (0, k.n)({ name: "heading", scale: "XS" }),
            s = t.creator;
          if (!s || !s.name) return null;
          var c = p.createElement("h2", { className: a([l, q]) }, s.name),
            u = s ? p.createElement(C.rU, { href: (0, N.AWr)(s, i) }, c) : c;
          return p.createElement(
            p.Fragment,
            null,
            p.createElement(
              C.xu,
              { marginBottom: "32px" },
              p.createElement(C.xu, { paddingBottom: "5px" }, u),
              s.bio &&
                p.createElement(
                  C.xu,
                  { paddingTop: "2px" },
                  p.createElement(
                    O.F,
                    { scale: "M" },
                    p.createElement(v.P, { wrapLinks: !0 }, s.bio)
                  )
                ),
              (null == r ? void 0 : r.id) !== s.id &&
                p.createElement(
                  C.xu,
                  { paddingTop: "14px" },
                  p.createElement(I.Bv, {
                    buttonSize: "REGULAR",
                    post: t,
                    user: s,
                    susiEntry: "follow_card",
                  })
                )
            ),
            p.createElement(
              S.Lk.Provider,
              { value: { postId: t.id } },
              p.createElement(S.eB, {
                withBottomBorder: !0,
                publisher: s,
                customStyleSheet: n,
                isVisible: o,
              })
            )
          );
        },
        z = function (e, t) {
          return function () {
            var n = new IntersectionObserver(function (n) {
              var o = e.get("ghost-track");
              if (o) {
                var r = n.find(function (e) {
                  return e.target === o.ref.current;
                });
                r && t(r.isIntersecting);
              } else t(!1);
            });
            return (
              e.forEach(function (e) {
                e.ref.current && n.observe(e.ref.current);
              }),
              function () {
                n.disconnect();
              }
            );
          };
        },
        Y = (0, d.Ps)(H(), S.qy),
        M = (0, d.Ps)(F(), f.Iq, N.nfI),
        $ = (0, d.Ps)(
          T(),
          w.C5,
          M,
          I.sj,
          h.z,
          f.b3,
          b.x,
          P.K,
          I.S$,
          g.tA,
          N.$mN,
          S.FB
        );
    },
    93125: (e, t, n) => {
      "use strict";
      n.d(t, { _U: () => L, Dk: () => N });
      var o = n(28655),
        r = n.n(o),
        i = n(59713),
        a = n.n(i),
        l = n(63038),
        s = n.n(l),
        c = n(46829),
        u = n(71439),
        d = n(67294),
        p = n(12291),
        m = n(8558),
        f = n(85432),
        v = n(98024),
        x = n(86021),
        g = n(28309),
        h = n(90038),
        E = n(27952);
      function b() {
        var e = r()([
          "\n  fragment ReadNextPostCard_post on Post {\n    id\n    title\n    mediumUrl\n    primaryTopic {\n      name\n      slug\n    }\n    collection {\n      id\n      name\n    }\n    previewImage {\n      id\n      alt\n      focusPercentX\n      focusPercentY\n    }\n  }\n",
        ]);
        return (
          (b = function () {
            return e;
          }),
          e
        );
      }
      var S = (0, u.Ps)(b()),
        w = (0, p.$j)(function (e) {
          return {
            mediumOwnedAndOperatedCollectionIds:
              e.config.mediumOwnedAndOperatedCollectionIds,
            isCustomDomain: e.client.isCustomDomain,
          };
        })(function (e) {
          var t = e.isCustomDomain,
            n = e.mediumOwnedAndOperatedCollectionIds,
            o = e.post,
            r = (o && o.previewImage) || {},
            i = r.focusPercentX,
            a = r.focusPercentY,
            l = r.id,
            s = r.alt,
            c = o.collection || {},
            u = c.name,
            p = c.id,
            b = o.primaryTopic && o.primaryTopic.name,
            S = (p && (n.includes(p) ? u : b)) || "",
            w = (o && o.title) || "",
            y = (0, E.jVf)(o, t),
            P = (0, g.Iq)(),
            _ = d.createElement(
              f.xu,
              { marginBottom: "4px" },
              d.createElement(
                x.Lh,
                { tag: "span" },
                d.createElement(
                  v.F,
                  { scale: "S", color: "DARKER" },
                  d.createElement(
                    "div",
                    {
                      className: P({
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }),
                    },
                    S
                  )
                )
              )
            );
          return d.createElement(
            f.P3,
            { href: y },
            d.createElement(
              f.xu,
              {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "20px",
              },
              _,
              d.createElement(
                f.xu,
                { display: "flex", flexDirection: "row" },
                d.createElement(m.UV, {
                  miroId: l || "",
                  alt: s || "",
                  height: 50,
                  width: 50,
                  freezeGifs: !0,
                  strategy: h._S.Crop,
                  rules: { marginRight: "9px", marginTop: "4px" },
                  focusPercentX: i || 50,
                  focusPercentY: a || 50,
                }),
                d.createElement(
                  f.xu,
                  { display: "flex", flexDirection: "column", width: "130px" },
                  d.createElement(
                    v.F,
                    { scale: "S", color: "DARKER", clamp: 3 },
                    w
                  )
                )
              )
            )
          );
        }),
        y = n(34675),
        P = n(3149),
        _ = n(64504),
        R = n(27599),
        I = n(27572),
        C = n(11348),
        O = n(6522);
      function k() {
        var e = r()([
          "\n  query ReadNextQuery($postId: ID!) {\n    post(id: $postId) {\n      id\n      readNext {\n        ... on ReadNextItem {\n          reason\n          post {\n            ... on Post {\n              ...ReadNextPostCard_post\n            }\n          }\n        }\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (k = function () {
            return e;
          }),
          e
        );
      }
      function B(e, t) {
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
      function D(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? B(Object(n), !0).forEach(function (t) {
                a()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : B(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var A = { display: "none" },
        j = {
          ":last-of-type": {
            xs: A,
            sm: A,
            md: A,
            lg: A,
            xl: { display: "block" },
          },
        },
        L = function (e) {
          var t = e.isVisible,
            n = void 0 === t || t,
            o = e.postId,
            r = d.useState(!1),
            i = s()(r, 2),
            a = i[0],
            l = i[1],
            u = (0, y.Hk)().value,
            p = (0, c.useLazyQuery)(T),
            m = s()(p, 2),
            v = m[0],
            x = m[1],
            h = x.called,
            E = x.loading,
            b = x.error,
            S = x.data,
            O = (S = void 0 === S ? { post: void 0 } : S).post,
            k = u && N(u) && !((0, C.yd)() || a),
            B = (0, R.Av)(),
            A = (0, g.Iq)(),
            L = (0, I.Lk)(),
            F = O && O.readNext;
          return (
            d.useEffect(
              function () {
                E ||
                  !b ||
                  (F && F.length) ||
                  B.event("readNextError", {
                    post: O,
                    postId: o,
                    error: b,
                    readNextLength: (F && F.length) || 0,
                  });
              },
              [E]
            ),
            d.useEffect(
              function () {
                n &&
                  F &&
                  (B.event("readNext.viewed", { position: "sidebar" }),
                  F.slice(0, 4).map(function (e, t) {
                    var n = e.post,
                      o = e.reason;
                    return (
                      B.event("post.clientPresented", {
                        source: (0, I.f0)(
                          D(
                            D({}, L),
                            {},
                            { index: t, postFeedReason: o || void 0 }
                          )
                        ),
                        location: "post/".concat(n && n.id),
                      }),
                      !0
                    );
                  }));
              },
              [n, F]
            ),
            !h && k && v({ variables: { postId: o || "" } }),
            h && !E && !b && O && F && F.length && k
              ? d.createElement(
                  I.cW,
                  {
                    source: {
                      name: "read_next",
                      sectionType: I.bA.READ_NEXT_SIDEBAR,
                    },
                    extendSource: !0,
                  },
                  d.createElement(
                    f.xu,
                    { width: "188px" },
                    d.createElement(
                      f.xu,
                      {
                        md: { display: "none" },
                        lg: { width: "780px", margin: "0 24px" },
                        position: "relative",
                        backgroundColor: "BACKGROUND",
                        paddingBottom: "24px",
                        paddingTop: "24px",
                        width: "100%",
                      },
                      d.createElement(
                        f.xu,
                        { position: "absolute", right: "0", top: "-4px" },
                        d.createElement(P.P, {
                          onClick: function () {
                            (0, C.Ph)(), l(!0);
                          },
                          size: "SMALL",
                          isPositionAbsolute: !1,
                        })
                      ),
                      d.createElement(
                        f.xu,
                        { width: "200px" },
                        d.createElement(
                          _.F1,
                          { scale: "XS" },
                          "Your journey starts here."
                        )
                      ),
                      d.createElement(
                        f.xu,
                        {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        },
                        O.readNext.slice(0, 4).map(function (e, t) {
                          var n = e.post;
                          return n
                            ? d.createElement(
                                "div",
                                { className: A(j), key: t },
                                d.createElement(w, { key: t, post: n })
                              )
                            : null;
                        })
                      )
                    )
                  )
                )
              : null
          );
        };
      function N(e) {
        return e && e.createdAt + O.pU > Date.now();
      }
      var T = (0, u.Ps)(k(), S);
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/PostSidebar.26a868b7.chunk.js.map
