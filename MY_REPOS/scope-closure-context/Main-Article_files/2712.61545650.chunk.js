(self.webpackChunklite = self.webpackChunklite || []).push([
  [2712],
  {
    73004: (e, n, t) => {
      "use strict";
      t.d(n, { Z: () => i });
      var r = t(67294);
      function l() {
        return (l =
          Object.assign ||
          function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      var o = r.createElement("path", {
        d: "M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z",
        fillRule: "evenodd",
      });
      const i = function (e) {
        return r.createElement(
          "svg",
          l({ width: 21, height: 21, viewBox: "0 0 21 21" }, e),
          o
        );
      };
    },
    84783: (e, n, t) => {
      "use strict";
      t.d(n, { b3: () => T, Iq: () => R, Fp: () => U });
      var r = t(63038),
        l = t.n(r),
        o = t(28655),
        i = t.n(o),
        a = t(71439),
        u = t(46829),
        c = t(67294),
        s = t(34664),
        d = t(34675),
        m = t(73891),
        g = t(324),
        h = t(62181),
        v = t(85432),
        f = t(25597),
        p = t(64504),
        E = t(27599),
        b = t(27572),
        S = t(28309),
        _ = t(72955),
        x = t(67297),
        y = t(73004),
        w = t(27952);
      function C() {
        var e = i()([
          "\n  mutation UnsubscribeCollectionEmailsMutation($id: ID!) {\n    unsubscribeCollectionEmails(collectionId: $id) {\n      __typename\n      id\n      viewerEdge {\n        __typename\n        id\n        isSubscribedToEmails\n      }\n    }\n  }\n",
        ]);
        return (
          (C = function () {
            return e;
          }),
          e
        );
      }
      function L() {
        var e = i()([
          "\n  mutation SubscribeCollectionEmailsMutation($id: ID!) {\n    subscribeCollectionEmails(collectionId: $id) {\n      __typename\n      id\n      viewerEdge {\n        __typename\n        id\n        isSubscribedToEmails\n      }\n    }\n  }\n",
        ]);
        return (
          (L = function () {
            return e;
          }),
          e
        );
      }
      function k() {
        var e = i()([
          "\n  mutation UnfollowCollectionMutation($id: ID!) {\n    unfollowCollection(targetCollectionId: $id) {\n      __typename\n      id\n      viewerEdge {\n        __typename\n        id\n        isFollowing\n      }\n    }\n  }\n",
        ]);
        return (
          (k = function () {
            return e;
          }),
          e
        );
      }
      function M() {
        var e = i()([
          "\n  mutation FollowCollectionMutation($id: ID!) {\n    followCollection(targetCollectionId: $id) {\n      __typename\n      id\n      viewerEdge {\n        __typename\n        id\n        isFollowing\n      }\n    }\n  }\n",
        ]);
        return (
          (M = function () {
            return e;
          }),
          e
        );
      }
      function I() {
        var e = i()([
          "\n  fragment CollectionFollowButton_collection on Collection {\n    __typename\n    id\n    name\n    canToggleEmail\n    slug\n    ...collectionUrl_collection\n    ...SusiClickable_collection\n  }\n  ",
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
      function A() {
        var e = i()([
          "\n  fragment CollectionFollowButton_post on Post {\n    __typename\n    id\n  }\n",
        ]);
        return (
          (A = function () {
            return e;
          }),
          e
        );
      }
      var P = "collectionFollowPopover",
        T = (0, a.Ps)(A()),
        R = (0, a.Ps)(I(), w.nfI, h.Os),
        H = "follow_card",
        N = function (e) {
          var n = e.children,
            t = e.extraTopPadding,
            r = e.extraBottomPadding,
            l = e.padding,
            o = e.margin,
            i = e.borderTop;
          return c.createElement(
            v.xu,
            {
              padding:
                l ||
                ""
                  .concat(t ? "20px" : "5px", " 20px ")
                  .concat(r ? "20px" : "5px", " 20px"),
              margin: o,
              borderTop: i ? "BASE_LIGHTER" : "NONE",
            },
            n
          );
        },
        D = (0, a.Ps)(M()),
        F = (0, a.Ps)(k()),
        B = (0, a.Ps)(L()),
        O = (0, a.Ps)(C()),
        V = function (e) {
          return function (n) {
            return e
              ? {
                  fill: n.baseColor.text.lighter,
                  marginLeft: "2px",
                  width: "18px",
                  height: "auto",
                  position: "absolute",
                  bottom: "0",
                }
              : { fill: "inherit", marginLeft: "6px" };
          };
        },
        U = function (e) {
          var n = e.buttonSize,
            t = e.buttonStyleFn,
            r = e.collection,
            o = e.isPopoverVisible,
            i = e.isToastVisible,
            a = e.post,
            w = e.simpleButton,
            C = e.isLinkStyle,
            L = e.susiEntry,
            k = (0, S.Iq)(),
            M = (0, x.v9)(function (e) {
              return e.config.authDomain;
            }),
            I = (0, x.p9)(function (e) {
              return e.config.isAmp;
            }),
            A = (0, d.rZ)().viewerId,
            T = r && r.name ? r.name : "",
            R = (0, E.Av)(),
            H = (0, b.pK)(),
            U = (0, m.g)(r.id),
            z = U.loading,
            j = U.viewerEdge,
            Y = c.useState(!!o),
            X = l()(Y, 2),
            $ = X[0],
            q = X[1],
            Q = c.useState(!!i),
            K = l()(Q, 2),
            Z = K[0],
            J = K[1],
            ee = (function (e, n) {
              var t = (0, u.useMutation)(D),
                r = l()(t, 1)[0];
              return c.useCallback(
                function () {
                  return r({
                    variables: { id: e },
                    optimisticResponse: {
                      followCollection: {
                        __typename: "Collection",
                        id: e,
                        viewerEdge: {
                          __typename: "CollectionViewerEdge",
                          id: "collectionId:".concat(e, "-viewerId:").concat(n),
                          isFollowing: !0,
                        },
                      },
                    },
                  });
                },
                [e]
              );
            })(r.id, A),
            ne = (function (e, n) {
              var t = (0, u.useMutation)(F),
                r = l()(t, 1)[0];
              return c.useCallback(
                function () {
                  return r({
                    variables: { id: e },
                    optimisticResponse: {
                      unfollowCollection: {
                        __typename: "Collection",
                        id: e,
                        viewerEdge: {
                          __typename: "CollectionViewerEdge",
                          id: "collectionId:".concat(e, "-viewerId:").concat(n),
                          isFollowing: !1,
                        },
                      },
                    },
                  });
                },
                [e]
              );
            })(r.id, A),
            te = (function (e, n) {
              var t = (0, u.useMutation)(B),
                r = l()(t, 1)[0];
              return c.useCallback(
                function () {
                  return r({
                    variables: { id: e },
                    optimisticResponse: {
                      subscribeCollectionEmails: {
                        __typename: "Collection",
                        id: e,
                        viewerEdge: {
                          __typename: "CollectionViewerEdge",
                          id: "collectionId:".concat(e, "-viewerId:").concat(n),
                          isSubscribedToEmails: !0,
                        },
                      },
                    },
                  });
                },
                [e]
              );
            })(r.id, A),
            re = (function (e, n) {
              var t = (0, u.useMutation)(O),
                r = l()(t, 1)[0];
              return c.useCallback(
                function () {
                  return r({
                    variables: { id: e },
                    optimisticResponse: {
                      unsubscribeCollectionEmails: {
                        __typename: "Collection",
                        id: e,
                        viewerEdge: {
                          __typename: "CollectionViewerEdge",
                          id: "collectionId:".concat(e, "-viewerId:").concat(n),
                          isSubscribedToEmails: !1,
                        },
                      },
                    },
                  });
                },
                [e]
              );
            })(r.id, A),
            le = c.useCallback(function () {
              q(!1);
            }, []);
          c.useEffect(
            function () {
              return (
                _.V6.on("scroll", le),
                function () {
                  _.V6.off("scroll", le);
                }
              );
            },
            [le]
          );
          var oe = c.useCallback(
              function () {
                (null != j && j.isFollowing) ||
                  (R.event("collection.followed", {
                    collectionId: r.id,
                    followSource: H,
                  }),
                  ee()),
                  q(!0);
              },
              [r]
            ),
            ie = c.useCallback(function () {
              R.event("collection.unfollowed", {
                collectionId: r.id,
                followSource: H,
              }),
                ne(),
                q(!1);
            }, []),
            ae = c.useCallback(function () {
              q(!1);
            }, []),
            ue = c.useCallback(function (e) {
              R.event("client.action", {
                action: "toggle-subscribe-collection-emails",
                eventType: "click",
                classAttribute: "checkbox",
              }),
                e.target.checked ? te() : re(),
                J(!0);
            }, []),
            ce = c.useCallback(function () {
              J(!1);
            }, []);
          if (I || z) return null;
          if (w) return G(M, r, a, oe, ie, n, t, j);
          var se = function (e) {
              var n = e.children,
                t = e.buttonSize,
                l = void 0 === t ? "SMALL" : t,
                o = e.buttonStyle,
                i = e.isPopoverVisible,
                u = e.linkStyle,
                s = void 0 === u ? null : u;
              return c.createElement(d.I8, null, function (e) {
                return e
                  ? null != s
                    ? c.createElement(
                        v.rU,
                        {
                          ariaControls: P,
                          ariaExpanded: i ? "true" : "false",
                          onClick: oe,
                          linkStyle: s,
                        },
                        n
                      )
                    : c.createElement(
                        v.zx,
                        {
                          ariaControls: P,
                          ariaExpanded: i ? "true" : "false",
                          size: l,
                          onClick: oe,
                          buttonStyle: o,
                        },
                        n
                      )
                  : c.createElement(
                      h.R9,
                      {
                        collection: r,
                        buttonStyle: "STRONG",
                        linkStyle: "OBVIOUS",
                        isButton: !C,
                        buttonSize: l,
                        operation: "register",
                        actionUrl: W(M, r, a) || "",
                        susiEntry: L,
                      },
                      n
                    );
              });
            },
            de = !(null == j || !j.isSubscribedToEmails),
            me = !(null == j || !j.isFollowing);
          return c.createElement(
            s.f,
            null,
            c.createElement(
              v.J2,
              {
                ariaId: P,
                isVisible: !!$,
                hide: ae,
                popoverRenderFn: function () {
                  return c.createElement(
                    v.xu,
                    {
                      width: "280px",
                      display: "flex",
                      flexDirection: "column",
                    },
                    c.createElement(
                      N,
                      { extraTopPadding: !0 },
                      c.createElement(
                        p.X6,
                        { scale: "XS" },
                        "You‘re following ",
                        T
                      )
                    ),
                    c.createElement(
                      N,
                      null,
                      c.createElement(
                        p.F,
                        { scale: "M" },
                        "You‘ll now see more stories from ",
                        T,
                        " across Medium."
                      )
                    ),
                    r.canToggleEmail &&
                      c.createElement(
                        N,
                        null,
                        c.createElement(
                          p.F,
                          { scale: "M" },
                          c.createElement(
                            "label",
                            null,
                            c.createElement(
                              v.xu,
                              { display: "inline", marginRight: "5px" },
                              c.createElement("input", {
                                type: "checkbox",
                                onChange: ue,
                                checked: de,
                              })
                            ),
                            "Receive emails from this publication"
                          )
                        )
                      ),
                    c.createElement(
                      N,
                      { extraBottomPadding: !0 },
                      c.createElement(
                        p.F,
                        { scale: "M" },
                        c.createElement(
                          v.rU,
                          { onClick: ie, linkStyle: "OBVIOUS", inline: !0 },
                          "Unfollow publication"
                        )
                      )
                    )
                  );
                },
              },
              c.createElement(
                se,
                {
                  isPopoverVisible: !!$,
                  buttonStyle: me ? "OBVIOUS" : "STRONG",
                  linkStyle: C
                    ? null != j && j.isFollowing
                      ? "SUBTLE"
                      : "OBVIOUS"
                    : null,
                  buttonSize: n,
                },
                c.createElement(
                  v.xu,
                  { display: "flex", flexDirection: "row" },
                  me ? "Following" : "Follow",
                  me &&
                    c.createElement(
                      "span",
                      {
                        className: k({
                          marginBottom: C ? null : "-6px",
                          position: "relative",
                        }),
                      },
                      c.createElement(y.Z, { className: k(V(C)) })
                    )
                )
              )
            ),
            c.createElement(
              g.N8,
              null,
              c.createElement(
                f.F,
                { isVisible: !!Z, hide: ce, duration: 2e3 },
                c.createElement(
                  p.F,
                  { scale: "M" },
                  de
                    ? "You‘ll now receive emails from ".concat(T, ".")
                    : "You‘ll no longer receive emails from ".concat(T, ".")
                )
              )
            )
          );
        },
        W = function (e, n, t) {
          return (
            n.slug &&
            (t && t.id ? (0, w.TAb)(e, n.slug, t.id) : (0, w.LlO)(e, n.slug))
          );
        },
        G = function (e, n, t, r, l) {
          var o =
              arguments.length > 5 && void 0 !== arguments[5]
                ? arguments[5]
                : "REGULAR",
            i =
              arguments.length > 6 && void 0 !== arguments[6]
                ? arguments[6]
                : function (e) {
                    return e ? "STRONG" : "OBVIOUS";
                  },
            a = arguments.length > 7 ? arguments[7] : void 0,
            u = !(null == a || !a.isFollowing),
            s = i(!!u);
          return c.createElement(d.I8, null, function (i) {
            return i
              ? c.createElement(
                  v.zx,
                  { size: o, onClick: u ? l : r, buttonStyle: s },
                  u ? "Following" : "Follow"
                )
              : c.createElement(
                  h.R9,
                  {
                    collection: n,
                    buttonStyle: "OBVIOUS",
                    isButton: !0,
                    buttonSize: "REGULAR",
                    operation: "register",
                    actionUrl: W(e, n, t) || "",
                    susiEntry: H,
                  },
                  u ? "Following" : "Follow"
                );
          });
        };
    },
    2330: (e, n, t) => {
      "use strict";
      t.d(n, { r: () => g, f: () => h });
      var r = t(28655),
        l = t.n(r),
        o = t(71439),
        i = t(67294),
        a = t(8558),
        u = t(85432),
        c = t(67995),
        s = t(28309),
        d = t(90038);
      function m() {
        var e = l()([
          "\n  fragment PublisherLogo_image on ImageMetadata {\n    id\n    originalHeight\n    originalWidth\n  }\n",
        ]);
        return (
          (m = function () {
            return e;
          }),
          e
        );
      }
      function g(e) {
        var n = e.clamp,
          t = void 0 === n ? 1 : n,
          r = e.maxWidth,
          l = e.maxHeight,
          o = e.textScale,
          m = void 0 === o ? "S" : o,
          g = e.withTextColorSubtle,
          h = void 0 !== g && g,
          v = e.customNameColor,
          f = e.name,
          p = e.logo,
          E = e.shouldShowLogo,
          b = e.leadingTrim,
          S = void 0 !== b && b,
          _ = e.withWordBreak,
          x = void 0 !== _ && _,
          y = (0, s.Iq)(),
          w = (0, c.n)({ name: "heading", scale: m, clamp: t, leadingTrim: S }),
          C = (function (e, n) {
            return function (t) {
              return { color: n || t.baseColor.text[e] };
            };
          })(h ? "normal" : "dark", v),
          L = x ? { wordBreak: "break-word" } : {};
        if (!p || !p.id || !E)
          return i.createElement("span", { className: y([w, C, L]) }, f || "");
        var k = p.id,
          M = p.originalWidth || 100,
          I = p.originalHeight || 100;
        if (r && M > r) {
          var A = M / r;
          (M = Math.floor(M / A)), (I = Math.floor(I / A));
        }
        if (l && I > l) {
          var P = I / l;
          (M = Math.floor(M / P)), (I = Math.floor(I / P));
        }
        return i.createElement(
          u.xu,
          { width: "".concat(M, "px"), height: "".concat(I, "px") },
          i.createElement(a.UV, {
            miroId: k,
            alt: f || "Publication logo",
            width: M,
            height: I,
            strategy: d._S.Resample,
          })
        );
      }
      var h = (0, o.Ps)(m());
    },
    52872: (e, n, t) => {
      "use strict";
      function r(e, n, t) {
        var r = t / n || 0,
          l = {
            xs: { maxHeight: 32, maxWidth: 320 },
            md: { maxHeight: 40, maxWidth: 400 },
            xl: { maxHeight: 60, maxWidth: 600 },
          };
        return (
          r <= 2.5
            ? (l = {
                xs: { maxHeight: 50, maxWidth: 125 },
                md: { maxHeight: 70, maxWidth: 175 },
                xl: { maxHeight: 90, maxWidth: 225 },
              })
            : r < 5 &&
              (l = {
                xs: { maxHeight: 40, maxWidth: 200 },
                md: { maxHeight: 50, maxWidth: 250 },
                xl: { maxHeight: 70, maxWidth: 350 },
              }),
          l[e]
        );
      }
      t.d(n, { p: () => r });
    },
    85446: (e, n, t) => {
      "use strict";
      t.d(n, { r: () => s });
      var r = t(67294),
        l = t(28309);
      function o() {
        return (o =
          Object.assign ||
          function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      var i = r.createElement("path", { d: "M0 .5h14M0 7h14M0 13.5h14" });
      const a = function (e) {
        return r.createElement("svg", o({ width: 14, height: 14 }, e), i);
      };
      var u = function (e) {
          return { stroke: e.baseColor.fill.lighter };
        },
        c = {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0px",
          border: "0px",
          padding: "0px",
          cursor: "pointer",
        };
      function s(e) {
        var n = e.onClick,
          t = e.ariaLabel,
          o = void 0 === t ? "expand" : t,
          i = (0, l.Iq)();
        return r.createElement(
          "button",
          { className: i(c), onClick: n, "aria-label": o },
          r.createElement(a, { className: i(u) })
        );
      }
    },
    82712: (e, n, t) => {
      "use strict";
      t.d(n, { Go: () => Ke, aU: () => Je, Mv: () => Ze, I_: () => nn });
      var r = t(28655),
        l = t.n(r),
        o = t(63038),
        i = t.n(o),
        a = t(59713),
        u = t.n(a),
        c = t(71439),
        s = t(67294),
        d = t(46197),
        m = t(60046),
        g = t(56862),
        h = t(51562),
        v = t(85446),
        f = t(73882),
        p = t(61722),
        E = t(65357),
        b = t(47700),
        S = t(60295),
        _ = t(39555),
        x = t(88584),
        y = t(85274),
        w = t(28309),
        C = t(25885),
        L = function (e) {
          var n,
            t,
            r,
            l,
            o,
            a,
            u = e.children,
            c = e.rules,
            d = void 0 === c ? {} : c,
            m = (0, w.Iq)(),
            g = {
              borderRadius: "1000px",
              backgroundColor:
                ((n = (0, w.Fg)()),
                (t = (0, C.n2)(n.backgroundColor)),
                (r = i()(t, 3)),
                (l = r[0]),
                (o = r[1]),
                (a = r[2]),
                (0, C.JX)([l, o, a, 0.8])),
            };
          return s.createElement("div", { className: m([g, d]) }, u);
        },
        k = t(89431),
        M = t(34675),
        I = t(98281),
        A = t(68421),
        P = t(85432),
        T = t(27572),
        R = t(14391);
      function H() {
        var e = l()([
          "\n  fragment MetaHeaderActions_post on Post {\n    ...MetabarButtonConversionLI_post\n    isLocked\n    pendingCollection {\n      ...MetaHeaderActions_collection_common\n    }\n    ...MetabarPostMenuButton_post\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (H = function () {
            return e;
          }),
          e
        );
      }
      function N() {
        var e = l()([
          "\n  fragment MetaHeaderActions_publisher on Publisher {\n    __typename\n    ...MetaHeaderPubMenu_publisher\n    ...SearchWidget_publisher\n    ... on Collection {\n      id\n      creator {\n        id\n      }\n      customStyleSheet {\n        navigation {\n          navItems {\n            name\n          }\n        }\n      }\n      viewerEdge {\n        id\n        isEditor\n      }\n      ...CollectionAvatar_collection\n      ...CollectionMetabarActionsPopover_collection\n      ...MetaHeaderActions_collection_common\n    }\n    ... on User {\n      id\n      ...UserAvatar_user\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (N = function () {
            return e;
          }),
          e
        );
      }
      function D() {
        var e = l()([
          "\n  fragment MetaHeaderActions_collection_common on Collection {\n    creator {\n      id\n    }\n    viewerEdge {\n      id\n      isEditor\n    }\n  }\n",
        ]);
        return (
          (D = function () {
            return e;
          }),
          e
        );
      }
      var F,
        B = "12px",
        O = function (e) {
          var n,
            t,
            r,
            l = e.publisher,
            o = e.post,
            i = e.hideAboutLink,
            a = void 0 !== i && i,
            u = e.shouldShowStyleReminder,
            c = void 0 === u || u,
            d = (0, M.Hk)().value,
            m = "Collection" === l.__typename ? l : null,
            g = "User" === (null == l ? void 0 : l.__typename) ? l : null,
            v = !(null == d || !d.mediumMemberAt),
            _ = m && m.creator && m.creator.id === (null == d ? void 0 : d.id),
            w = m && m.viewerEdge.isEditor,
            C = _ || w,
            H = o && o.creator && o.creator.id === (null == d ? void 0 : d.id),
            N = g && g.id === (null == d ? void 0 : d.id),
            D = !!g && (null == d ? void 0 : d.id) === g.id,
            F = C || D,
            O = d && !v && !C && !N && !H,
            V = (0, y.N)().isNewPostButtonVisible,
            U = !(
              null == m ||
              null === (n = m.customStyleSheet) ||
              void 0 === n ||
              null === (t = n.navigation) ||
              void 0 === t ||
              null === (r = t.navItems) ||
              void 0 === r ||
              !r.length
            );
          return s.createElement(
            P.xu,
            {
              display: "flex",
              alignItems: "center",
              marginRight: F ? "24px" : "12px",
              height: "32px",
              overflow: "visible",
            },
            d &&
              !F &&
              s.createElement(
                L,
                null,
                s.createElement(E.Q, { publisher: l, hideAboutLink: a })
              ),
            d &&
              s.createElement(
                T.cW,
                { source: { name: "search-popover" } },
                s.createElement(
                  P.xu,
                  { marginLeft: "8px", marginRight: "10px" },
                  s.createElement(
                    L,
                    null,
                    s.createElement(k.Rh, {
                      publisher: l,
                      setIsMetabarLocked: function () {},
                    })
                  )
                )
              ),
            m &&
              C &&
              s.createElement(
                s.Fragment,
                null,
                s.createElement(
                  P.xu,
                  { marginLeft: B, marginRight: B },
                  s.createElement(
                    A.oP,
                    {
                      flag: R.T3.AURORA_NAV_AVAILABLE,
                      isVisible: m.isAuroraEligible && !U,
                      targetDistance: 15,
                      padding: 12,
                      text: "You can now add sections to your publication. Go to ‘Design your publication’ to get started.",
                    },
                    s.createElement(
                      p.o,
                      {
                        collection: m,
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      },
                      s.createElement(f.v, { collection: m, size: 32 })
                    )
                  )
                ),
                V &&
                  s.createElement(x.F, {
                    collection: m,
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    marginLeft: B,
                  })
              ),
            O &&
              s.createElement(
                h.W,
                {
                  featureString: "li-post-page-navbar",
                  target: "upsell-button",
                },
                s.createElement(
                  P.xu,
                  { marginRight: B, sm: { display: "none" } },
                  s.createElement(S.G, { post: o })
                )
              ),
            d &&
              D &&
              s.createElement(
                s.Fragment,
                null,
                s.createElement(
                  P.xu,
                  {
                    marginLeft: B,
                    marginRight: B,
                    display: "flex",
                    alignItems: "center",
                  },
                  s.createElement(
                    b.W,
                    {
                      setIsMetabarLocked: function () {},
                      shouldShowStyleReminder: c,
                    },
                    s.createElement(I.Yt, { user: d, scale: "XS" })
                  )
                ),
                V &&
                  s.createElement(
                    P.xu,
                    { marginLeft: B },
                    s.createElement(y.Q, null)
                  )
              )
          );
        },
        V = (0, c.Ps)(D()),
        U = (0, c.Ps)(N(), E.f, k.Aw, f.d, p.s, V, I.WQ),
        W = (0, c.Ps)(H(), S.V, V, _.R),
        G = t(70405),
        z = t(85489),
        j = t(65849),
        Y = t(90038);
      function X() {
        var e = l()([
          "\n  fragment MetaHeaderBackground_customStyleSheet on CustomStyleSheet {\n    id\n    header {\n      headerScale\n      backgroundImageDisplayMode\n      backgroundImageVerticalAlignment\n      backgroundColorDisplayMode\n      backgroundColor {\n        ...getHexFromColorValue_colorValue\n        ...getOpaqueHexFromColorValue_colorValue\n      }\n      secondaryBackgroundColor {\n        ...getHexFromColorValue_colorValue\n      }\n      postBackgroundColor {\n        ...getHexFromColorValue_colorValue\n      }\n      backgroundImage {\n        ...MetaHeaderBackground_imageMetadata\n      }\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (X = function () {
            return e;
          }),
          e
        );
      }
      function $() {
        var e = l()([
          "\n  fragment MetaHeaderBackground_imageMetadata on ImageMetadata {\n    id\n    originalWidth\n  }\n",
        ]);
        return (
          ($ = function () {
            return e;
          }),
          e
        );
      }
      var q =
          ((F = {}),
          u()(F, R.v2.START, "top"),
          u()(F, R.v2.END, "bottom"),
          u()(F, R.v2.CENTER, "center"),
          F),
        Q = function (e) {
          return (0, Y.W6)({
            miroId: e.id,
            width: e.originalWidth || 2e3,
            strategy: Y._S.Resample,
            freezeGifs: !1,
          });
        },
        K = function (e, n) {
          var t = (e || {}).header,
            r = n
              ? (0, z.eQ)(null == t ? void 0 : t.postBackgroundColor)
              : null,
            l = n
              ? (0, z.Z)(null == t ? void 0 : t.backgroundColor)
              : (0, z.eQ)(null == t ? void 0 : t.backgroundColor);
          return { altHex: r, primaryHex: l, backgroundColor: r || l };
        },
        Z = function (e, n) {
          var t,
            r,
            l = (e || {}).header,
            o = (0, j.jb)(),
            i =
              null !==
                (t =
                  null == e || null === (r = e.header) || void 0 === r
                    ? void 0
                    : r.headerScale) && void 0 !== t
                ? t
                : o.headerScale;
          return n || i === R.w6.HEADER_SCALE_SMALL
            ? null
            : null == l
            ? void 0
            : l.backgroundImage;
        },
        J = function (e) {
          var n,
            t = e.customStyleSheet,
            r = e.withAltBackground,
            l = void 0 !== r && r,
            o = e.children,
            i = (0, w.Iq)(),
            a = (function (e, n) {
              var t,
                r,
                l,
                o,
                i = (e || {}).header,
                a = (0, j.jb)(),
                u =
                  null !==
                    (t =
                      null == e || null === (r = e.header) || void 0 === r
                        ? void 0
                        : r.backgroundImageDisplayMode) && void 0 !== t
                    ? t
                    : a.backgroundColorDisplayMode,
                c = n
                  ? R.PG.COLOR_DISPLAY_MODE_SOLID
                  : null !==
                      (l =
                        null == e || null === (o = e.header) || void 0 === o
                          ? void 0
                          : o.backgroundColorDisplayMode) && void 0 !== l
                  ? l
                  : a.backgroundColorDisplayMode,
                d = Z(e, n),
                m = d ? Q(d) : "",
                g = K(e, n),
                h = g.altHex,
                v = g.primaryHex,
                f = g.backgroundColor;
              return s.useMemo(
                function () {
                  return function (n) {
                    var t = (0, z.eQ)(
                        null == i ? void 0 : i.secondaryBackgroundColor
                      ),
                      r = { display: "flex", flexDirection: "column" };
                    if (
                      (!d &&
                        f &&
                        c === R.PG.COLOR_DISPLAY_MODE_SOLID &&
                        (r.backgroundColor = f || n.backgroundColor),
                      h)
                    )
                      return r;
                    var l = [];
                    if (
                      (d && c === R.PG.COLOR_DISPLAY_MODE_SOLID
                        ? l.push(
                            "linear-gradient(to bottom, "
                              .concat(v || "transparent", ", ")
                              .concat(v || "transparent", ")")
                          )
                        : c === R.PG.COLOR_DISPLAY_MODE_VERTICAL_GRADIENT &&
                          l.push(
                            "linear-gradient(to bottom, "
                              .concat(v || "transparent", ", ")
                              .concat(t || "transparent", ")")
                          ),
                      d)
                    ) {
                      var o, s;
                      l.push("url(".concat(m, ")"));
                      var g =
                          null !==
                            (o =
                              null == e ||
                              null === (s = e.header) ||
                              void 0 === s
                                ? void 0
                                : s.backgroundImageVerticalAlignment) &&
                          void 0 !== o
                            ? o
                            : a.backgroundImageVerticalAlignment,
                        p = q[g];
                      switch (((r.backgroundPosition = p), u)) {
                        case R.zc.IMAGE_DISPLAY_MODE_FILL:
                          r.backgroundSize = "cover";
                          break;
                        case R.zc.IMAGE_DISPLAY_MODE_TILE:
                          (r.backgroundRepeatX = "repeat"),
                            (r.backgroundRepeatY = "repeat"),
                            (r.backgroundSize = "auto");
                          break;
                        case R.zc.IMAGE_DISPLAY_MODE_FIT:
                          (r.backgroundRepeatX = "no-repeat"),
                            (r.backgroundRepeatY = "no-repeat"),
                            (r.backgroundSize = "contain");
                          break;
                        case R.zc.IMAGE_DISPLAY_MODE_AUTO:
                          (r.backgroundRepeatX = "no-repeat"),
                            (r.backgroundRepeatY = "no-repeat"),
                            (r.backgroundSize = "auto");
                      }
                    }
                    return (
                      l.length > 0 && (r.backgroundImage = l.join(", ")), r
                    );
                  };
                },
                [e, m]
              );
            })(t, l),
            u = (
              null !== (n = null == t ? void 0 : t.header) && void 0 !== n
                ? n
                : {}
            ).backgroundImage;
          return s.createElement(
            s.Fragment,
            null,
            u &&
              s.createElement(
                G.q,
                null,
                s.createElement("link", {
                  rel: "preload",
                  href: Q(u),
                  as: "image",
                })
              ),
            s.createElement("div", { className: i(a) }, o)
          );
        },
        ee = (0, c.Ps)($()),
        ne = (0, c.Ps)(X(), ee, z.xW, z.hB),
        te = t(35741),
        re = t(55014),
        le = t(84014),
        oe = t(65393),
        ie = t(62117),
        ae = t(22091),
        ue = t(64504),
        ce = t(51064);
      function se() {
        var e = l()([
          "\n  fragment MetaHeaderNavVertical_publisher on Publisher {\n    id\n    ...PublisherAboutLink_publisher\n    ...MetaHeaderNav_publisher\n    ...MetaHeaderNavLink_publisher\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (se = function () {
            return e;
          }),
          e
        );
      }
      function de() {
        var e = l()([
          "\n  fragment MetaHeaderNavVertical_customStyleSheet on CustomStyleSheet {\n    id\n    navigation {\n      navItems {\n        ...MetaHeaderNavLink_headerNavigationItem\n      }\n    }\n    ...MetaHeaderNav_customStyleSheet\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (de = function () {
            return e;
          }),
          e
        );
      }
      var me = s.forwardRef(function (e, n) {
          var t = e.customStyleSheet,
            r = e.publisher,
            l = (0, le.yR)(t, r),
            o = l.navItems;
          return l.isNavVisible
            ? s.createElement(
                ae.xu,
                {
                  display: "none",
                  sm: { display: "flex" },
                  flexDirection: "column",
                  tag: "nav",
                  width: "100%",
                  padding: "8px 0 16px 0",
                  ref: n,
                },
                s.createElement(
                  ue.F,
                  { scale: "XL", tag: "span" },
                  o.map(function (e, n) {
                    return s.createElement(
                      ae.xu,
                      { key: n, tag: "span", margin: "14px 0" },
                      s.createElement(oe.d9, { navItem: e, publisher: r })
                    );
                  }),
                  s.createElement(
                    ae.xu,
                    { tag: "span", margin: "14px 0" },
                    s.createElement(ie.w, { publisher: r })
                  )
                )
              )
            : null;
        }),
        ge = (0, c.Ps)(de(), le.Qc, oe.Ze),
        he = (0, c.Ps)(se(), ie.u, le.Y$, oe.ud),
        ve = t(22669),
        fe = t(67995);
      function pe() {
        var e = l()([
          "\n  fragment MetaHeaderTagline_publisher on Publisher {\n    __typename\n    ... on Collection {\n      tagline\n    }\n    ... on User {\n      bio\n    }\n  }\n",
        ]);
        return (
          (pe = function () {
            return e;
          }),
          e
        );
      }
      function Ee() {
        var e = l()([
          "\n  fragment MetaHeaderTagline_customStyleSheet on CustomStyleSheet {\n    id\n    header {\n      taglineColor {\n        ...getHexFromColorValue_colorValue\n      }\n      taglineTreatment\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (Ee = function () {
            return e;
          }),
          e
        );
      }
      var be = function (e) {
          var n,
            t = e.publisher,
            r = e.customStyleSheet,
            l = e.color,
            o = void 0 === l ? "LIGHTER" : l,
            i = (0, w.Iq)(),
            a = (0, fe.n)({ name: "subtitle", scale: "M", color: o }),
            u = (
              null !== (n = null == r ? void 0 : r.header) && void 0 !== n
                ? n
                : {}
            ).taglineColor,
            c = (0, z.eQ)(u),
            d = c ? { color: c } : {},
            m = Se(r, t),
            g = m.tagline;
          return m.isTaglineVisible
            ? s.createElement(
                "span",
                { className: i([a, d]) },
                s.createElement(ve.P, null, g)
              )
            : null;
        },
        Se = function (e, n) {
          var t,
            r,
            l = (0, j.jb)(),
            o =
              null !==
                (t =
                  null == e || null === (r = e.header) || void 0 === r
                    ? void 0
                    : r.taglineTreatment) && void 0 !== t
                ? t
                : l.taglineTreatment,
            i = "Collection" === n.__typename ? n.tagline : n.bio;
          return {
            tagline: i,
            isTaglineVisible: !!i && o === R.KI.TAGLINE_TREATMENT_HEADER,
          };
        },
        _e = (0, c.Ps)(Ee(), z.xW),
        xe = (0, c.Ps)(pe()),
        ye = t(3658),
        we = t(6401),
        Ce = t(62181),
        Le = t(24438),
        ke = t(67297),
        Me = t(74465);
      function Ie() {
        var e = l()([
          "\n  fragment MetaHeaderTop_publisher on Publisher {\n    __typename\n    ... on Collection {\n      slug\n      ...CollectionMetabarActionsPopover_collection\n      ...CollectionAvatar_collection\n      ...MetaHeaderTop_collection\n    }\n    ... on User {\n      username\n      id\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (Ie = function () {
            return e;
          }),
          e
        );
      }
      function Ae() {
        var e = l()([
          "\n  fragment MetaHeaderTop_post on Post {\n    id\n    collection {\n      ...MetaHeaderTop_collection\n    }\n    pendingCollection {\n      ...MetaHeaderTop_collection\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (Ae = function () {
            return e;
          }),
          e
        );
      }
      function Pe() {
        var e = l()([
          "\n  fragment MetaHeaderTop_collection on Collection {\n    id\n    creator {\n      id\n    }\n    viewerEdge {\n      id\n      isEditor\n    }\n  }\n",
        ]);
        return (
          (Pe = function () {
            return e;
          }),
          e
        );
      }
      var Te,
        Re = "16px",
        He = "10px",
        Ne = function (e) {
          var n,
            t,
            r = e.publisher,
            l = e.post,
            o = e.withBottomBorder,
            i = e.shouldShowStyleReminder,
            a = (0, ke.v9)(function (e) {
              return e.config.authDomain;
            }),
            u = (0, M.Hk)().value,
            c =
              "Collection" === (null == r ? void 0 : r.__typename)
                ? r.slug
                : void 0,
            d =
              "User" === (null == r ? void 0 : r.__typename)
                ? r.username
                : null,
            v =
              "Collection" === (null == r ? void 0 : r.__typename)
                ? r
                : null !== (n = null == l ? void 0 : l.pendingCollection) &&
                  void 0 !== n
                ? n
                : null == l
                ? void 0
                : l.collection,
            E =
              u &&
              v &&
              (null == v || null === (t = v.creator) || void 0 === t
                ? void 0
                : t.id) === (null == u ? void 0 : u.id),
            S = null == v ? void 0 : v.viewerEdge.isEditor,
            _ = E || S,
            x =
              u &&
              "User" === (null == r ? void 0 : r.__typename) &&
              u.id === r.id;
          return s.createElement(
            ae.xu,
            {
              zIndex: Me.ZP.metabar,
              position: "relative",
              borderBottom: o ? "BASE_LIGHTER" : "NONE",
            },
            s.createElement(
              ae.Pm,
              null,
              s.createElement(
                ae.xu,
                {
                  height: (0, Le.a)(62),
                  display: "flex",
                  alignItems: "center",
                },
                s.createElement(
                  ae.xu,
                  {
                    flexGrow: "1",
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  },
                  !u &&
                    s.createElement(
                      h.W,
                      {
                        featureString: "lo-meta-header",
                        target: "sign-up-button",
                      },
                      s.createElement(
                        ae.xu,
                        { marginRight: "16px" },
                        s.createElement(
                          Ce.R9,
                          {
                            susiEntry: "nav_reg",
                            isButton: !0,
                            buttonStyle: "OBVIOUS",
                            operation: "register",
                          },
                          "Get started"
                        )
                      )
                    ),
                  s.createElement(we.a, {
                    removeSpacing: !0,
                    isButton: !1,
                    collectionSlug: c,
                    postId: null == l ? void 0 : l.id,
                    username: d,
                  })
                ),
                "Collection" === (null == r ? void 0 : r.__typename) &&
                  _ &&
                  s.createElement(
                    ae.xu,
                    { marginRight: Re, sm: { marginRight: He } },
                    s.createElement(
                      p.o,
                      { collection: r },
                      s.createElement(f.v, { collection: r, size: 32 })
                    )
                  ),
                "User" === (null == r ? void 0 : r.__typename) &&
                  u &&
                  x &&
                  s.createElement(
                    ae.xu,
                    { marginRight: Re, sm: { marginRight: He } },
                    s.createElement(
                      b.W,
                      {
                        shouldShowStyleReminder: i,
                        setIsMetabarLocked: function () {},
                      },
                      s.createElement(I.Yt, { user: u, scale: "XS" })
                    )
                  ),
                s.createElement(
                  g.e,
                  { href: "https://".concat(a, "/"), ariaLabel: "Homepage" },
                  s.createElement(m.YR, null)
                )
              )
            )
          );
        },
        De = (0, c.Ps)(Pe()),
        Fe = (0, c.Ps)(Ae(), De),
        Be = (0, c.Ps)(Ie(), p.s, f.d, De),
        Oe = t(78820),
        Ve = t(34664),
        Ue = t(82395),
        We = t(15849),
        Ge = t(98701),
        ze = t(60054);
      function je() {
        var e = l()([
          "\n  fragment MetaHeader_post on Post {\n    id\n    ...SusiClickable_post\n    ...MetaHeaderTop_post\n    ...MetaHeaderActions_post\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (je = function () {
            return e;
          }),
          e
        );
      }
      function Ye() {
        var e = l()([
          "\n  fragment MetaHeader_customStyleSheet on CustomStyleSheet {\n    id\n    header {\n      headerScale\n      horizontalAlignment\n    }\n    ...MetaHeaderBackground_customStyleSheet\n    ...MetaHeaderEngagement_customStyleSheet\n    ...MetaHeaderLogo_customStyleSheet\n    ...MetaHeaderNavVertical_customStyleSheet\n    ...MetaHeaderTagline_customStyleSheet\n    ...MetaHeaderThemeProvider_customStyleSheet\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (Ye = function () {
            return e;
          }),
          e
        );
      }
      function Xe() {
        var e = l()([
          "\n  fragment MetaHeader_publisher on Publisher {\n    __typename\n    name\n    ...MetaHeaderEngagement_publisher\n    ...MetaHeaderLogo_publisher\n    ...MetaHeaderNavVertical_publisher\n    ...MetaHeaderTagline_publisher\n    ...MetaHeaderThemeProvider_publisher\n    ...MetaHeaderActions_publisher\n    ...MetaHeaderTop_publisher\n    ... on Collection {\n      id\n      favicon {\n        id\n      }\n      tagline\n      ...CollectionNavigationContextProvider_collection\n    }\n    ... on User {\n      id\n      bio\n    }\n  }\n  ",
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
          (Xe = function () {
            return e;
          }),
          e
        );
      }
      var $e = {
          overflowX: "scroll",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
          "::-webkit-scrollbar": { display: "none" },
        },
        qe =
          ((Te = {}),
          u()(Te, R.v2.START, "flex-start"),
          u()(Te, R.v2.END, "flex-end"),
          u()(Te, R.v2.CENTER, "center"),
          Te),
        Qe = function (e) {
          return {
            maxWidth: (0, Le.a)(e.maxWidths.inset),
            minWidth: "0",
            width: "100%",
            marginTop: "12px",
          };
        },
        Ke = function (e) {
          var n,
            t,
            r,
            l = e.publisher,
            o = e.customStyleSheet,
            a = e.post,
            u = e.forceSmall,
            c = void 0 !== u && u,
            f = e.disableAboutLink,
            p = void 0 !== f && f,
            E = e.disableFollowersLink,
            b = void 0 !== E && E,
            S = e.shouldShowStyleReminder,
            _ = void 0 === S || S,
            x = (0, re.uP)(o, l, c).shouldShowLogo,
            y = (0, w.Iq)(),
            C = (0, w.Fg)(),
            L = (0, ke.v9)(function (e) {
              return e.config.authDomain;
            }),
            k = (0, ke.p9)(function (e) {
              return e.config.isAmp;
            }),
            I = (0, M.Hk)(),
            A = I.loading,
            P = I.value,
            T = (0, j.jb)(),
            H = en({ customStyleSheet: o, forceSmall: c }),
            N = nn({ publisher: l, customStyleSheet: o, forceSmall: c }),
            D = (0, le.yR)(o, l).isNavVisible,
            F = (function () {
              var e = (0, ce.O)(!1),
                n = i()(e, 3),
                t = n[0],
                r = n[1],
                l = n[2],
                o = s.useRef(null),
                a = function (e) {
                  var n = o.current,
                    t = e.target;
                  n && t && !n.contains(t) && l();
                };
              return (
                s.useEffect(function () {
                  return (
                    document.addEventListener("click", a, !0),
                    document.addEventListener("touch", a, !0),
                    function () {
                      document.removeEventListener("click", a, !0),
                        document.removeEventListener("touch", a, !0);
                    }
                  );
                }, []),
                {
                  verticalNavRef: o,
                  isVerticalNavVisible: t,
                  showVerticalNav: r,
                  hideVerticalNav: l,
                }
              );
            })(),
            B = F.verticalNavRef,
            V = F.isVerticalNavVisible,
            U = F.showVerticalNav,
            W = F.hideVerticalNav,
            G = H === R.w6.HEADER_SCALE_SMALL,
            z = G && x,
            Y = C.newFonts.heading,
            X = z
              ? void 0
              : (0, Ge.mu)(function (e) {
                  var n = i()(e, 1)[0];
                  return (0, Le.a)(-1 * n);
                }, (0, We.AC)(Y, "XS")),
            $ = G
              ? R.v2.START
              : null !==
                  (n =
                    null == o || null === (t = o.header) || void 0 === t
                      ? void 0
                      : t.horizontalAlignment) && void 0 !== n
              ? n
              : T.horizontalAlignment,
            q = !!Z(o, c),
            Q = !G || D,
            ee = G ? (D ? 184 : 115) : 334,
            ne = G ? 115 : ee - (Q ? 70 : 0),
            oe = (0, Oe.PB)(l, L),
            ie = "".concat((0, Oe.Zu)(l), " Homepage"),
            se = !!K(o, c).backgroundColor,
            de = !(q || se) || Q,
            ge = "Collection" === l.__typename ? l : null;
          return s.createElement(
            d.Jr,
            { collection: ge },
            ge &&
              s.createElement(ze.s, {
                faviconImageId:
                  null == ge || null === (r = ge.favicon) || void 0 === r
                    ? void 0
                    : r.id,
              }),
            s.createElement(
              ae.xu,
              {
                boxShadow: de
                  ? "inset 0 -1px 0 ".concat(C.baseColor.border.lighter)
                  : void 0,
                minHeight: (0, Le.a)(ee),
                sm: {
                  boxShadow: "inset 0 -1px 0 ".concat(
                    C.baseColor.border.lighter
                  ),
                  minHeight: (0, Le.a)(230),
                },
              },
              s.createElement(
                ye.OD,
                { publisher: l, customStyleSheet: o, withAltBackground: c },
                s.createElement(
                  J,
                  { customStyleSheet: o, withAltBackground: c },
                  s.createElement(
                    ae.xu,
                    { display: "none", sm: { display: "block" } },
                    s.createElement(Ne, {
                      withBottomBorder: !(q || se),
                      post: a,
                      publisher: l,
                      shouldShowStyleReminder: _,
                    })
                  ),
                  s.createElement(
                    ae.Pm,
                    null,
                    s.createElement(
                      ae.xu,
                      {
                        display: "flex",
                        flexDirection: G ? "row" : "column",
                        alignItems: G ? "center" : void 0,
                        justifyContent: "space-between",
                        minHeight: (0, Le.a)(ne),
                        sm: {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "flex-start",
                          minHeight: (0, Le.a)(98),
                        },
                      },
                      !G &&
                        s.createElement(
                          "div",
                          {
                            className: y({
                              display: {
                                xl: "flex",
                                lg: "flex",
                                md: "flex",
                                sm: "none",
                                xs: "none",
                              },
                              justifyContent: "flex-end",
                              alignItems: "center",
                              marginTop: (0, Le.a)(41),
                              zIndex: Me.ZP.metabar,
                              visibility: A ? "hidden" : "visible",
                            }),
                          },
                          s.createElement(
                            Ve.f,
                            null,
                            (!P || k) &&
                              s.createElement(
                                s.Fragment,
                                null,
                                s.createElement(
                                  h.W,
                                  {
                                    featureString: "lo-meta-header",
                                    target: "sign-in-link",
                                  },
                                  s.createElement(
                                    ue.F,
                                    { scale: "M" },
                                    s.createElement(
                                      Ce.R9,
                                      {
                                        linkStyle: "OBVIOUS",
                                        operation: "login",
                                        susiEntry: "nav_reg",
                                      },
                                      "Sign in"
                                    )
                                  )
                                ),
                                s.createElement(
                                  h.W,
                                  {
                                    featureString: "lo-meta-header",
                                    target: "sign-up-button",
                                  },
                                  s.createElement(
                                    ae.xu,
                                    { marginLeft: "14px", marginRight: "24px" },
                                    s.createElement(
                                      Ce.R9,
                                      {
                                        buttonSize: "REGULAR",
                                        isButton: !0,
                                        buttonStyle: "OBVIOUS",
                                        operation: "register",
                                        post: a,
                                        susiEntry: "nav_reg",
                                      },
                                      "Get started"
                                    )
                                  )
                                )
                              ),
                            P &&
                              s.createElement(O, {
                                publisher: l,
                                post: a,
                                hideAboutLink: p,
                                shouldShowStyleReminder: _,
                              })
                          ),
                          s.createElement(
                            g.e,
                            {
                              href: "https://".concat(L, "/"),
                              ariaLabel: "Homepage",
                            },
                            s.createElement(m.YR, {
                              contrast: se ? "darker" : "normal",
                            })
                          )
                        ),
                      s.createElement(
                        ae.xu,
                        {
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "flex-start",
                        },
                        s.createElement(
                          "div",
                          {
                            className: y({
                              paddingTop: X,
                              display: "flex",
                              width: "100%",
                            }),
                          },
                          s.createElement(
                            ae.xu,
                            {
                              width: "100%",
                              display: "flex",
                              flexDirection: G ? "row" : "column",
                              alignItems: G
                                ? x
                                  ? "center"
                                  : "flex-end"
                                : qe[$],
                              marginBottom: G ? "0px" : "38px",
                              marginTop: G ? "-32px" : "25px",
                              textAlign: $ === R.v2.CENTER ? "center" : void 0,
                              flexWrap: "wrap",
                              sm: {
                                display: "flex",
                                alignItems: G ? "flex-start" : void 0,
                                flexDirection: G ? "column" : void 0,
                                marginBottom: "28px",
                                marginTop: "0px",
                              },
                            },
                            s.createElement(
                              ae.xu,
                              {
                                marginLeft:
                                  $ === R.v2.START ? void 0 : (0, Le.a)(24),
                                marginRight: (0, Le.a)(24),
                                sm: { marginTop: "28px" },
                                marginTop: "32px",
                              },
                              s.createElement(
                                g.e,
                                { href: oe, ariaLabel: ie },
                                s.createElement(re.fI, {
                                  publisher: l,
                                  customStyleSheet: o,
                                  forcedTextScale: G ? "XS" : void 0,
                                  withTextColorSubtle: !1,
                                  forceSmall: c,
                                })
                              )
                            ),
                            N &&
                              s.createElement(
                                "div",
                                { className: y(Qe) },
                                s.createElement(be, {
                                  customStyleSheet: o,
                                  publisher: l,
                                })
                              ),
                            !Q &&
                              s.createElement(
                                ae.xu,
                                { sm: { display: "none" }, marginTop: "32px" },
                                s.createElement(te.i_, {
                                  customStyleSheet: o,
                                  publisher: l,
                                  disableAboutLink: p,
                                  disableFollowersLink: b,
                                })
                              )
                          )
                        ),
                        G &&
                          s.createElement(
                            "div",
                            {
                              className: y({
                                display: {
                                  xl: "flex",
                                  lg: "flex",
                                  md: "flex",
                                  sm: "none",
                                  xs: "none",
                                },
                                flex: "0 0 auto",
                                justifySelf: "flex-end",
                                alignItems: "center",
                                zIndex: Me.ZP.metabar,
                                visibility: A ? "hidden" : "visible",
                              }),
                            },
                            s.createElement(
                              Ve.f,
                              null,
                              (!P || k) &&
                                s.createElement(
                                  s.Fragment,
                                  null,
                                  s.createElement(
                                    h.W,
                                    {
                                      featureString: "lo-meta-header",
                                      target: "sign-in-link",
                                    },
                                    s.createElement(
                                      ue.F,
                                      { scale: "M" },
                                      s.createElement(
                                        Ce.R9,
                                        {
                                          linkStyle: "OBVIOUS",
                                          operation: "login",
                                          susiEntry: "nav_reg",
                                        },
                                        "Sign in"
                                      )
                                    )
                                  ),
                                  s.createElement(
                                    h.W,
                                    {
                                      featureString: "lo-meta-header",
                                      target: "sign-up-button",
                                    },
                                    s.createElement(
                                      ae.xu,
                                      {
                                        marginLeft: "14px",
                                        marginRight: "24px",
                                        marginTop: "-3px",
                                        marginBottom: "-3px",
                                      },
                                      s.createElement(
                                        Ce.R9,
                                        {
                                          isButton: !0,
                                          buttonSize: "REGULAR",
                                          buttonStyle: "OBVIOUS",
                                          operation: "register",
                                          post: a,
                                          susiEntry: "nav_reg",
                                        },
                                        "Get started"
                                      )
                                    )
                                  )
                                ),
                              P &&
                                s.createElement(O, {
                                  publisher: l,
                                  hideAboutLink: p,
                                  shouldShowStyleReminder: _,
                                })
                            ),
                            s.createElement(
                              g.e,
                              {
                                href: "https://".concat(L, "/"),
                                ariaLabel: "Homepage",
                              },
                              s.createElement(m.YR, {
                                contrast: se ? "darker" : "normal",
                              })
                            )
                          )
                      )
                    )
                  )
                )
              ),
              s.createElement(
                ae.xu,
                { display: Q ? "block" : "none", sm: { display: "block" } },
                s.createElement(
                  ae.Pm,
                  null,
                  s.createElement(
                    "div",
                    { className: D ? y($e) : void 0 },
                    s.createElement(
                      ae.xu,
                      {
                        height: (0, Le.a)(70),
                        display: "flex",
                        alignItems: "center",
                        paddingTop: "1px",
                      },
                      s.createElement(
                        ae.xu,
                        {
                          margin: $ === R.v2.CENTER ? "0 auto" : void 0,
                          sm: D ? { margin: "0" } : void 0,
                        },
                        s.createElement(te.i_, {
                          customStyleSheet: o,
                          publisher: l,
                          disableAboutLink: p,
                          disableFollowersLink: b,
                          followersLinkInFront: !0,
                        })
                      ),
                      D &&
                        s.createElement(
                          ae.xu,
                          {
                            display: "none",
                            sm: { display: "block" },
                            position: "absolute",
                            right: "24px",
                          },
                          V
                            ? s.createElement(Ue.R, {
                                onClick: W,
                                ariaLabel: "Collapse navbar",
                              })
                            : s.createElement(v.r, {
                                onClick: U,
                                ariaLabel: "Expand navbar",
                              })
                        )
                    )
                  )
                )
              )
            ),
            D &&
              V &&
              s.createElement(
                ae.xu,
                { borderBottom: "BASE_LIGHTER" },
                s.createElement(
                  ae.Pm,
                  null,
                  s.createElement(me, {
                    ref: B,
                    customStyleSheet: o,
                    publisher: l,
                  })
                )
              )
          );
        },
        Ze = (0, c.Ps)(Xe(), d.hD, te.QP, re.XN, he, xe, ye.k8, U, Be),
        Je = (0, c.Ps)(Ye(), ne, te.Al, re.Ig, ge, _e, ye.a6),
        en =
          ((0, c.Ps)(je(), Ce.qU, Fe, W),
          function (e) {
            var n,
              t,
              r = e.customStyleSheet,
              l = e.forceSmall,
              o = void 0 !== l && l,
              i = (0, j.jb)();
            return o
              ? R.w6.HEADER_SCALE_SMALL
              : null !==
                  (n =
                    null == r || null === (t = r.header) || void 0 === t
                      ? void 0
                      : t.headerScale) && void 0 !== n
              ? n
              : i.headerScale;
          }),
        nn = function (e) {
          var n = e.publisher,
            t = e.customStyleSheet,
            r = e.forceSmall,
            l = void 0 !== r && r,
            o = Se(t, n).isTaglineVisible,
            i = en({ customStyleSheet: t, forceSmall: l });
          return o && i !== R.w6.HEADER_SCALE_SMALL;
        };
    },
    35741: (e, n, t) => {
      "use strict";
      t.d(n, { i_: () => W, Al: () => G, QP: () => z });
      var r = t(28655),
        l = t.n(r),
        o = t(71439),
        i = t(67294),
        a = t(63038),
        u = t.n(a),
        c = t(46829),
        s = t(64235),
        d = t(34675),
        m = t(32589),
        g = t(85432),
        h = t(80362),
        v = t(64504),
        f = t(27599),
        p = t(27572),
        E = t(8403);
      function b() {
        var e = l()([
          "\n  fragment AutoFollowWrapper_user on User {\n    id\n    name\n  }\n",
        ]);
        return (
          (b = function () {
            return e;
          }),
          e
        );
      }
      var S = function (e) {
          var n = e.user,
            t = e.children,
            r = (0, p.Qi)(),
            l = (0, f.Av)(),
            o = (0, m.P)(null == n ? void 0 : n.id).viewerEdge,
            a = null == o ? void 0 : o.isFollowing,
            b = null == o ? void 0 : o.isAllowEdsEnabled,
            S = i.useState(!1),
            _ = u()(S, 2),
            x = _[0],
            y = _[1],
            w = (0, E.Wd)("subscribeToUserId"),
            C = (0, d.rZ)().viewerId,
            L = (0, c.useMutation)(s.L, {
              onCompleted: function () {
                y(!0),
                  l.event("user.followed", {
                    targetUserId: n.id,
                    followSource: r,
                  });
              },
            }),
            k = u()(L, 1)[0];
          i.useEffect(
            function () {
              w &&
                !a &&
                b &&
                k({
                  variables: { targetUserId: n.id },
                  optimisticResponse: {
                    followUser: {
                      __typename: "User",
                      id: n.id,
                      viewerEdge: {
                        id: "userId:".concat(n.id, "-viewerId:").concat(C),
                        isFollowing: !0,
                        __typename: "UserViewerEdge",
                      },
                    },
                  },
                });
            },
            [w, a, b]
          );
          var M = function () {
            y(!1);
          };
          return i.createElement(
            "div",
            null,
            i.createElement(
              h.J,
              {
                placement: "bottom",
                targetDistance: 15,
                noPortal: !0,
                isVisible: !!x,
                hide: M,
                popoverRenderFn: function () {
                  return i.createElement(
                    g.xu,
                    { padding: "20px", maxWidth: "225px" },
                    i.createElement(
                      g.xu,
                      { marginBottom: "8px" },
                      i.createElement(
                        v.F,
                        { scale: "L", color: "DARKER" },
                        i.createElement(
                          "strong",
                          null,
                          "You're following ",
                          n.name
                        )
                      )
                    ),
                    i.createElement(
                      g.xu,
                      { marginBottom: "8px" },
                      i.createElement(
                        v.F,
                        { scale: "S", color: "DARKER" },
                        "You'll see more stories from them accross Medium."
                      )
                    ),
                    i.createElement(
                      v.F,
                      { scale: "S" },
                      i.createElement(
                        g.rU,
                        { linkStyle: "OBVIOUS", onClick: M },
                        "Got it"
                      )
                    )
                  );
                },
              },
              t
            )
          );
        },
        _ = (0, o.Ps)(b()),
        x = t(84014),
        y = t(42691),
        w = t(62117),
        C = t(45755),
        L = t(15886),
        k = t(5977),
        M = t(85740),
        I = t(22091),
        A = t(61250),
        P = t(67297),
        T = t(27952);
      function R() {
        var e = l()([
          "\n  fragment UserProfileBooksLink_publisher on Publisher {\n    __typename\n    id\n    ... on User {\n      ...userUrl_user\n      bookAuthor {\n        ... on Author {\n          id\n        }\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      var H = function () {
          return null;
        },
        N = function (e) {
          var n = e.publisher,
            t = (0, P.v9)(function (e) {
              return e.config.authDomain;
            }),
            r = (0, k.TH)().pathname,
            l = (0, A.$B)(r);
          if ("User" !== n.__typename || !n.bookAuthor) return null;
          var o = "ShowUserBooks" === (null == l ? void 0 : l.route.name);
          return i.createElement(
            M.bZ,
            { name: "enable_lite_book_experience", placeholder: H },
            function (e) {
              return e
                ? i.createElement(
                    I.xu,
                    { marginLeft: "12px", display: "block" },
                    o
                      ? i.createElement(
                          v.F,
                          { tag: "span", scale: "L", color: "DARKER" },
                          "Books"
                        )
                      : i.createElement(
                          I.rU,
                          { href: (0, T.ssx)(n, t) },
                          "Books"
                        )
                  )
                : null;
            }
          );
        },
        D = (0, o.Ps)(R(), T.$mN),
        F = t(68421),
        B = t(14391);
      function O() {
        var e = l()([
          "\n  fragment MetaHeaderEngagement_publisher on Publisher {\n    __typename\n    ...MetaHeaderNav_publisher\n    ...PublisherAboutLink_publisher\n    ...PublisherFollowButton_publisher\n    ...PublisherFollowerCount_publisher\n    ...UserProfileBooksLink_publisher\n    ... on Collection {\n      creator {\n        id\n      }\n    }\n    ... on User {\n      ...AutoFollowWrapper_user\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (O = function () {
            return e;
          }),
          e
        );
      }
      function V() {
        var e = l()([
          "\n  fragment MetaHeaderEngagement_customStyleSheet on CustomStyleSheet {\n    ...MetaHeaderNav_customStyleSheet\n  }\n  ",
          "\n",
        ]);
        return (
          (V = function () {
            return e;
          }),
          e
        );
      }
      var U = function (e) {
          var n = e.publisher;
          return "User" === n.__typename
            ? i.createElement(
                S,
                { user: n },
                i.createElement(C.D, {
                  publisher: n,
                  susiEntry: "follow_profile",
                  buttonSize: "REGULAR",
                })
              )
            : i.createElement(
                i.Fragment,
                null,
                i.createElement(C.D, {
                  publisher: n,
                  susiEntry: "follow_header",
                  buttonSize: "REGULAR",
                })
              );
        },
        W = function (e) {
          var n = e.customStyleSheet,
            t = e.publisher,
            r = e.disableAboutLink,
            l = void 0 !== r && r,
            o = e.disableFollowersLink,
            a = void 0 !== o && o,
            u = e.followersLinkInFront,
            c = void 0 !== u && u,
            s = (0, d.Hk)().value,
            m = (function (e) {
              var n,
                t = (0, d.Hk)(),
                r = t.loading,
                l = t.value,
                o = !!l && "User" === e.__typename && l.id === e.id,
                i =
                  !!l &&
                  "Collection" === e.__typename &&
                  l.id ===
                    (null == e || null === (n = e.creator) || void 0 === n
                      ? void 0
                      : n.id);
              return {
                isFollowButtonVisible: !o && !i && !r,
                isFollowerCountVisible: (0, L.ds)(e).isFollowerCountVisible,
              };
            })(t),
            g = m.isFollowButtonVisible,
            h = m.isFollowerCountVisible,
            f = (0, x.yR)(n, t).isNavVisible,
            p = i.createElement(
              I.xu,
              { marginTop: "-14px", marginBottom: "-16px" },
              i.createElement(U, { publisher: t })
            );
          return i.createElement(
            v.F,
            { tag: "span", scale: "L", leadingTrim: !0 },
            i.createElement(
              I.xu,
              { display: "flex", alignItems: "center" },
              g && c && i.createElement(I.xu, { marginRight: "32px" }, p),
              h &&
                i.createElement(
                  i.Fragment,
                  null,
                  i.createElement(
                    I.xu,
                    {
                      display: "inline-flex",
                      flexDirection: "column",
                      marginRight: "12px",
                    },
                    i.createElement(
                      F.oP,
                      {
                        flag: B.T3.FOLLOWERS_TOOLTIP,
                        isVisible:
                          "User" === t.__typename &&
                          t.id === (null == s ? void 0 : s.id),
                        targetDistance: 15,
                        text: "You can now see a full list of your followers here, and people you follow from the About page.",
                      },
                      i.createElement(L.Jh, { publisher: t, disableLink: a })
                    ),
                    f && a && i.createElement(y.t, null)
                  ),
                  f &&
                    i.createElement(
                      I.xu,
                      {
                        marginLeft: "12px",
                        display: "block",
                        sm: { display: "none" },
                      },
                      "·"
                    )
                ),
              f &&
                i.createElement(
                  I.xu,
                  {
                    marginLeft: "12px",
                    display: "block",
                    sm: { display: "none" },
                  },
                  i.createElement(x.Ex, { customStyleSheet: n, publisher: t })
                ),
              i.createElement(N, { publisher: t }),
              i.createElement(
                I.xu,
                {
                  marginLeft: "12px",
                  display: "flex",
                  flexDirection: "column",
                  sm: f ? { display: "none" } : void 0,
                },
                i.createElement(w.w, { publisher: t, disableLink: l }),
                f && l && i.createElement(y.t, null)
              ),
              g &&
                !c &&
                i.createElement(
                  I.xu,
                  {
                    marginLeft: "24px",
                    sm: { marginLeft: f ? "0px" : "24px" },
                  },
                  p
                )
            )
          );
        },
        G = (0, o.Ps)(V(), x.Qc),
        z = (0, o.Ps)(O(), x.Y$, w.u, C.f, L.jS, _, D);
    },
    55014: (e, n, t) => {
      "use strict";
      t.d(n, { fI: () => H, uP: () => N, Ig: () => F, XN: () => B });
      var r,
        l,
        o,
        i,
        a = t(28655),
        u = t.n(a),
        c = t(59713),
        s = t.n(c),
        d = t(71439),
        m = t(67294),
        g = t(2330),
        h = t(52872),
        v = t(49925),
        f = t(85489),
        p = t(65849),
        E = t(8558),
        b = t(67995),
        S = t(28309),
        _ = t(14391),
        x = t(90038);
      function y() {
        var e = u()([
          "\n  fragment MetaHeaderLogo_publisher on Publisher {\n    __typename\n    id\n    name\n    ... on Collection {\n      logo {\n        ...MetaHeaderLogo_imageMetadata\n        ...PublisherLogo_image\n      }\n    }\n    ...auroraHooks_publisher\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (y = function () {
            return e;
          }),
          e
        );
      }
      function w() {
        var e = u()([
          "\n  fragment MetaHeaderLogo_customStyleSheet on CustomStyleSheet {\n    id\n    header {\n      nameColor {\n        ...getHexFromColorValue_colorValue\n      }\n      nameTreatment\n      postNameTreatment\n      logoImage {\n        ...MetaHeaderLogo_imageMetadata\n      }\n      logoScale\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (w = function () {
            return e;
          }),
          e
        );
      }
      function C() {
        var e = u()([
          "\n  fragment MetaHeaderLogo_imageMetadata on ImageMetadata {\n    id\n    originalWidth\n    originalHeight\n    ...PublisherLogo_image\n  }\n  ",
          "\n",
        ]);
        return (
          (C = function () {
            return e;
          }),
          e
        );
      }
      var L = function (e, n) {
          var t,
            r,
            l =
              null !== (t = null == n ? void 0 : n.originalWidth) &&
              void 0 !== t
                ? t
                : 0,
            o =
              null !== (r = null == n ? void 0 : n.originalHeight) &&
              void 0 !== r
                ? r
                : 0,
            i = Math.min(e.width / l, e.height / o);
          return { width: Math.floor(i * l), height: Math.floor(i * o) };
        },
        k =
          ((r = {}),
          s()(r, _.w6.HEADER_SCALE_SMALL, {
            small: { width: 175, height: 70 },
            large: { width: 175, height: 70 },
          }),
          s()(r, _.w6.HEADER_SCALE_MEDIUM, {
            small: { width: 225, height: 90 },
            large: { width: 225, height: 90 },
          }),
          s()(r, _.w6.HEADER_SCALE_LARGE, {
            small: { width: 275, height: 110 },
            large: { width: 275, height: 110 },
          }),
          r),
        M =
          ((l = {}),
          s()(l, _.w6.HEADER_SCALE_SMALL, {
            small: { width: 160, height: 32 },
            large: { width: 240, height: 48 },
          }),
          s()(l, _.w6.HEADER_SCALE_MEDIUM, {
            small: { width: 280, height: 56 },
            large: { width: 360, height: 72 },
          }),
          s()(l, _.w6.HEADER_SCALE_LARGE, {
            small: { width: 280, height: 64 },
            large: { width: 520, height: 104 },
          }),
          l),
        I =
          ((o = {}),
          s()(o, _.w6.HEADER_SCALE_SMALL, {
            small: { width: 280, height: 24 },
            large: { width: 320, height: 32 },
          }),
          s()(o, _.w6.HEADER_SCALE_MEDIUM, {
            small: { width: 280, height: 40 },
            large: { width: 600, height: 60 },
          }),
          s()(o, _.w6.HEADER_SCALE_LARGE, {
            small: { width: 280, height: 60 },
            large: { width: 680, height: 80 },
          }),
          o),
        A = function (e, n) {
          var t,
            r,
            l =
              (null !== (t = null == n ? void 0 : n.originalWidth) &&
              void 0 !== t
                ? t
                : 0) /
              (null !== (r = null == n ? void 0 : n.originalHeight) &&
              void 0 !== r
                ? r
                : 0);
          return l <= 2.5 ? k[e] : l < 5 ? M[e] : I[e];
        },
        P = function (e, n) {
          var t = A(e, n),
            r = L(t.small, n),
            l = L(t.large, n);
          return {
            width: {
              xs: "".concat(r.width, "px"),
              sm: "".concat(r.width, "px"),
              md: "".concat(l.width, "px"),
              lg: "".concat(l.width, "px"),
              xl: "".concat(l.width, "px"),
            },
            height: {
              xs: "".concat(r.height, "px"),
              sm: "".concat(r.height, "px"),
              md: "".concat(l.height, "px"),
              lg: "".concat(l.height, "px"),
              xl: "".concat(l.height, "px"),
            },
          };
        },
        T =
          ((i = {}),
          s()(i, _.w6.HEADER_SCALE_SMALL, {
            xs: "XS",
            sm: "XS",
            md: "M",
            lg: "M",
            xl: "M",
          }),
          s()(i, _.w6.HEADER_SCALE_MEDIUM, {
            xs: "XS",
            sm: "XS",
            md: "L",
            lg: "L",
            xl: "L",
          }),
          s()(i, _.w6.HEADER_SCALE_LARGE, {
            xs: "XS",
            sm: "XS",
            md: "XL",
            lg: "XL",
            xl: "XL",
          }),
          i),
        R = { wordBreak: "break-word" },
        H = function (e) {
          var n,
            t,
            r,
            l = e.customStyleSheet,
            o = e.publisher,
            i = e.withTextColorSubtle,
            a = void 0 !== i && i,
            u = e.forcedTextScale,
            c = e.forceSmall,
            s = void 0 !== c && c,
            d = (0, S.Iq)(),
            v = (
              null !== (n = null == l ? void 0 : l.header) && void 0 !== n
                ? n
                : {}
            ).nameColor,
            y = (0, f.eQ)(v),
            w = (0, p.jb)(),
            C = s
              ? _.w6.HEADER_SCALE_SMALL
              : null !==
                  (t =
                    null == l || null === (r = l.header) || void 0 === r
                      ? void 0
                      : r.logoScale) && void 0 !== t
              ? t
              : w.logoScale,
            k = [
              (0, b.n)({ name: "heading", scale: T[C], leadingTrim: !0 }),
              function (e) {
                return { color: y || e.baseColor.text[a ? "normal" : "dark"] };
              },
              R,
            ],
            M = N(l, o, s),
            I = M.logo,
            H = M.shouldShowLogo,
            D = (null == I ? void 0 : I.originalHeight) || 0,
            F = (null == I ? void 0 : I.originalWidth) || 0,
            B = (0, h.p)("xs", D, F);
          if (u)
            return m.createElement(g.r, {
              withTextColorSubtle: a,
              customNameColor: y,
              shouldShowLogo: H,
              maxHeight: 35,
              maxWidth: B.maxWidth,
              textScale: u,
              logo: I,
              name: o.name,
              clamp: 0,
              leadingTrim: !0,
              withWordBreak: !0,
            });
          if (!H || !I)
            return m.createElement("span", { className: d(k) }, o.name || "");
          var O = A(C, I),
            V = L(O.large, I);
          return m.createElement(E.UV, {
            miroId: I.id,
            alt: o.name || "Publication logo",
            width: V.width,
            height: V.height,
            strategy: x._S.Resample,
            rules: P(null != C ? C : w.logoScale, I),
          });
        },
        N = function (e, n, t) {
          var r,
            l,
            o,
            i,
            a,
            u = (0, p.jb)(),
            c =
              null == e || null === (r = e.header) || void 0 === r
                ? void 0
                : r.logoImage,
            s =
              null !==
                (l =
                  null == e || null === (o = e.header) || void 0 === o
                    ? void 0
                    : o.nameTreatment) && void 0 !== l
                ? l
                : u.nameTreatment,
            d =
              null !==
                (i =
                  null == e || null === (a = e.header) || void 0 === a
                    ? void 0
                    : a.postNameTreatment) && void 0 !== i
                ? i
                : u.postNameTreatment,
            m = (0, v.Iq)(n),
            g = void 0 !== c,
            h = "Collection" === n.__typename ? n.logo : null,
            f = m && g ? c : h,
            E = !(null == f || !f.id) && s === _.m3.NAME_TREATMENT_LOGO,
            b = E && d === _.m3.NAME_TREATMENT_LOGO;
          return { logo: f, shouldShowLogo: t ? b : E };
        },
        D = (0, d.Ps)(C(), g.f),
        F = (0, d.Ps)(w(), f.xW, D),
        B = (0, d.Ps)(y(), D, g.f, v.C5);
    },
    84014: (e, n, t) => {
      "use strict";
      t.d(n, {
        yR: () => p,
        Ex: () => E,
        Qc: () => S,
        Y$: () => _,
        BD: () => x,
      });
      var r = t(28655),
        l = t.n(r),
        o = t(71439),
        i = t(67294),
        a = t(5977),
        u = t(42691),
        c = t(65393),
        s = t(22091),
        d = t(64504),
        m = t(14391),
        g = t(87598);
      function h() {
        var e = l()([
          "\n  fragment MetaHeaderNav_publisher on Publisher {\n    id\n    ...MetaHeaderNavLink_publisher\n  }\n  ",
          "\n",
        ]);
        return (
          (h = function () {
            return e;
          }),
          e
        );
      }
      function v() {
        var e = l()([
          "\n  fragment MetaHeaderNav_customStyleSheet on CustomStyleSheet {\n    id\n    navigation {\n      navItems {\n        ...MetaHeaderNav_headerNavigationItem\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (v = function () {
            return e;
          }),
          e
        );
      }
      function f() {
        var e = l()([
          "\n  fragment MetaHeaderNav_headerNavigationItem on HeaderNavigationItem {\n    name\n    tagSlugs\n    ...MetaHeaderNavLink_headerNavigationItem\n  }\n  ",
          "\n",
        ]);
        return (
          (f = function () {
            return e;
          }),
          e
        );
      }
      var p = function (e, n) {
          var t,
            r = (
              (null == e || null === (t = e.navigation) || void 0 === t
                ? void 0
                : t.navItems) || []
            ).filter(function (e) {
              var n;
              return !(null === (n = e.name) || void 0 === n || !n.trim());
            });
          return {
            isNavVisible: r.length > 0 && "Collection" === n.__typename,
            navItems: r,
          };
        },
        E = function (e) {
          var n = e.customStyleSheet,
            t = e.publisher,
            r = x(),
            l = p(n, t),
            o = l.navItems;
          if (!l.isNavVisible) return null;
          var a = !1;
          return i.createElement(
            s.xu,
            { display: "flex", alignItems: "center", tag: "nav" },
            o.map(function (e, n) {
              var l = r(e) && !a;
              return (
                l && (a = !0),
                i.createElement(
                  s.xu,
                  {
                    key: n,
                    tag: "span",
                    margin: "0 12px",
                    display: "flex",
                    flexDirection: "column",
                  },
                  l
                    ? i.createElement(
                        d.F,
                        { scale: "L", color: "DARKER" },
                        e.name
                      )
                    : i.createElement(c.d9, { navItem: e, publisher: t }),
                  l && i.createElement(u.t, null)
                )
              );
            })
          );
        },
        b = (0, o.Ps)(f(), c.Ze),
        S = (0, o.Ps)(v(), b),
        _ = (0, o.Ps)(h(), c.ud),
        x = function () {
          var e = (0, g.G)(),
            n = (0, a.TH)();
          return function (t) {
            var r, l;
            switch (t.type) {
              case m.Me.NAV_TYPE_LINK:
                return e(null !== (r = t.href) && void 0 !== r ? r : "");
              case m.Me.NAV_TYPE_TAG:
                return (
                  !(null === (l = t.tagSlugs) || void 0 === l || !l.length) &&
                  n.pathname.includes("tagged/".concat(t.tagSlugs[0]))
                );
            }
            return !1;
          };
        };
    },
    42691: (e, n, t) => {
      "use strict";
      t.d(n, { t: () => o });
      var r = t(67294),
        l = t(22091),
        o = function () {
          return r.createElement(
            l.xu,
            { position: "relative", width: "100%" },
            r.createElement(l.xu, {
              position: "absolute",
              width: "100%",
              top: "23px",
              borderBottom: "BASE_DARKER",
            })
          );
        };
    },
    65393: (e, n, t) => {
      "use strict";
      t.d(n, { d9: () => m, Ze: () => g, ud: () => h });
      var r = t(28655),
        l = t.n(r),
        o = t(71439),
        i = t(67294),
        a = t(72214),
        u = t(22091),
        c = t(67297);
      function s() {
        var e = l()([
          "\n  fragment MetaHeaderNavLink_publisher on Publisher {\n    id\n    ...getNavItemHref_publisher\n  }\n  ",
          "\n",
        ]);
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      function d() {
        var e = l()([
          "\n  fragment MetaHeaderNavLink_headerNavigationItem on HeaderNavigationItem {\n    name\n    ...getNavItemHref_headerNavigationItem\n  }\n  ",
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
          var n = e.publisher,
            t = e.navItem,
            r = (0, c.v9)(function (e) {
              return e.config.authDomain;
            }),
            l = (0, c.v9)(function (e) {
              return e.navigation.hostname;
            }),
            o = (0, a.hl)(n, t, r),
            s =
              o.startsWith("/") ||
              o.startsWith("#") ||
              o.includes(r) ||
              o.includes(l);
          return i.createElement(
            u.rU,
            { href: o, target: s ? void 0 : "_blank" },
            t.name
          );
        },
        g = (0, o.Ps)(d(), a.qQ),
        h = (0, o.Ps)(s(), a.EV);
    },
    3658: (e, n, t) => {
      "use strict";
      t.d(n, {
        _5: () => v,
        OD: () => p,
        XL: () => E,
        a6: () => b,
        k8: () => S,
      });
      var r = t(28655),
        l = t.n(r),
        o = t(82492),
        i = t.n(o),
        a = t(71439),
        u = t(67294),
        c = t(28309),
        s = t(534);
      function d() {
        var e = l()([
          "\n  fragment MetaHeaderThemeProvider_publisher on Publisher {\n    __typename\n    customStyleSheet {\n      ...MetaHeaderThemeProvider_customStyleSheet\n    }\n    ... on Collection {\n      colorPalette {\n        ...customDefaultBackgroundTheme_colorPalette\n      }\n    }\n  }\n  ",
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
      function m() {
        var e = l()([
          "\n  fragment MetaHeaderThemeProvider_customStyleSheet on CustomStyleSheet {\n    id\n    ...useMetaHeaderTheme_customStyleSheet\n  }\n  ",
          "\n",
        ]);
        return (
          (m = function () {
            return e;
          }),
          e
        );
      }
      function g() {
        var e = l()([
          "\n  fragment useMetaHeaderTheme_customStyleSheet on CustomStyleSheet {\n    ...customDefaultBackgroundTheme_customStyleSheet\n    global {\n      colorPalette {\n        primary {\n          colorPalette {\n            tintBackgroundSpectrum {\n              ...ThemeUtil_colorSpectrum\n            }\n          }\n        }\n      }\n    }\n    header {\n      backgroundColor {\n        colorPalette {\n          tintBackgroundSpectrum {\n            ...ThemeUtil_colorSpectrum\n          }\n        }\n      }\n      postBackgroundColor {\n        colorPalette {\n          tintBackgroundSpectrum {\n            ...ThemeUtil_colorSpectrum\n          }\n        }\n      }\n      backgroundImage {\n        id\n      }\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (g = function () {
            return e;
          }),
          e
        );
      }
      var h = function (e, n) {
          var t,
            r,
            l,
            o,
            i,
            a,
            u =
              null == e ||
              null === (t = e.header) ||
              void 0 === t ||
              null === (r = t.backgroundColor) ||
              void 0 === r ||
              null === (l = r.colorPalette) ||
              void 0 === l
                ? void 0
                : l.tintBackgroundSpectrum,
            c =
              null == e ||
              null === (o = e.header) ||
              void 0 === o ||
              null === (i = o.postBackgroundColor) ||
              void 0 === i ||
              null === (a = i.colorPalette) ||
              void 0 === a
                ? void 0
                : a.tintBackgroundSpectrum;
          return n && null != c ? c : u;
        },
        v = function (e) {
          var n,
            t,
            r,
            l,
            o,
            i,
            a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            u = arguments.length > 2 ? arguments[2] : void 0,
            d = (0, c.Fg)(),
            m = h(e, a),
            g =
              (null == e ||
              null === (n = e.header) ||
              void 0 === n ||
              null === (t = n.backgroundImage) ||
              void 0 === t
                ? void 0
                : t.id) || m,
            v =
              null == e ||
              null === (r = e.global) ||
              void 0 === r ||
              null === (l = r.colorPalette) ||
              void 0 === l ||
              null === (o = l.primary) ||
              void 0 === o ||
              null === (i = o.colorPalette) ||
              void 0 === i
                ? void 0
                : i.tintBackgroundSpectrum,
            p = m
              ? (0, s.yd)({ tint: m, accentTint: g ? null : v }, d)
              : (0, s.zI)(e, d, u);
          return f(p);
        },
        f = function (e) {
          return i()({}, e, {
            newFonts: {
              heading: {
                fontSize: { XL: 80, L: 64, M: 48, S: 36, XS: 27 },
                lineHeight: { XL: 88, L: 72, M: 56, S: 40, XS: 34 },
                weight: 700,
              },
            },
          });
        },
        p = function (e) {
          var n = e.publisher,
            t = e.customStyleSheet,
            r = e.children,
            l = e.withAltBackground,
            o = "Collection" === n.__typename ? n.colorPalette : null,
            i = v(t, l, o);
          return u.createElement(c.f6, { theme: i }, r);
        },
        E = (0, a.Ps)(g(), s.Ui, s.zK),
        b = (0, a.Ps)(m(), E),
        S = (0, a.Ps)(d(), b, s.L9);
    },
    62117: (e, n, t) => {
      "use strict";
      t.d(n, { w: () => g, u: () => h });
      var r = t(28655),
        l = t.n(r),
        o = t(71439),
        i = t(67294),
        a = t(22091),
        u = t(64504),
        c = t(61250),
        s = t(67297),
        d = t(27952);
      function m() {
        var e = l()([
          "\n  fragment PublisherAboutLink_publisher on Publisher {\n    __typename\n    id\n    ... on Collection {\n      slug\n    }\n    ... on User {\n      ...userUrl_user\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (m = function () {
            return e;
          }),
          e
        );
      }
      var g = function (e) {
          var n,
            t = e.publisher,
            r = e.disableLink,
            l = void 0 !== r && r,
            o = (0, s.v9)(function (e) {
              return e.config.authDomain;
            }),
            m = (0, c.GE)("ShowCollectionMasthead", {
              collectionSlug:
                "Collection" === t.__typename &&
                null !== (n = t.slug) &&
                void 0 !== n
                  ? n
                  : "",
            }),
            g = "User" === t.__typename ? (0, d.JqW)(t, o) : "",
            h = "Collection" === t.__typename ? m : g;
          return l
            ? i.createElement(
                u.F,
                { tag: "span", scale: "L", color: "DARKER" },
                "About"
              )
            : i.createElement(a.rU, { href: h }, "About");
        },
        h = (0, o.Ps)(m(), d.$mN);
    },
    45755: (e, n, t) => {
      "use strict";
      t.d(n, { D: () => s, f: () => d });
      var r = t(28655),
        l = t.n(r),
        o = t(71439),
        i = t(67294),
        a = t(84783),
        u = t(31001);
      function c() {
        var e = l()([
          "\n  fragment PublisherFollowButton_publisher on Publisher {\n    __typename\n    ... on Collection {\n      ...CollectionFollowButton_collection\n    }\n    ... on User {\n      ...UserFollowButton_user\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (c = function () {
            return e;
          }),
          e
        );
      }
      var s = function (e) {
          var n = e.publisher,
            t = e.buttonSize,
            r = e.isLinkStyle,
            l = void 0 !== r && r,
            o = e.susiEntry;
          return "Collection" === n.__typename
            ? i.createElement(a.Fp, {
                buttonSize: t,
                collection: n,
                isLinkStyle: l,
                susiEntry: o,
              })
            : i.createElement(u.Bv, {
                buttonSize: t,
                user: n,
                isLinkStyle: l,
                susiEntry: o,
              });
        },
        d = (0, o.Ps)(c(), a.Iq, u.sj);
    },
    15886: (e, n, t) => {
      "use strict";
      t.d(n, { ds: () => g, Jh: () => h, jS: () => v });
      var r = t(28655),
        l = t.n(r),
        o = t(71439),
        i = t(67294),
        a = t(22091),
        u = t(64504),
        c = t(61250),
        s = t(27390),
        d = t(27952);
      function m() {
        var e = l()([
          "\n  fragment PublisherFollowerCount_publisher on Publisher {\n    __typename\n    id\n    ... on Collection {\n      slug\n      subscriberCount\n    }\n    ... on User {\n      socialStats {\n        followerCount\n      }\n      username\n    }\n  }\n",
        ]);
        return (
          (m = function () {
            return e;
          }),
          e
        );
      }
      var g = function (e) {
          var n,
            t,
            r =
              null !==
                (n =
                  "Collection" === e.__typename
                    ? e.subscriberCount
                    : null === (t = e.socialStats) || void 0 === t
                    ? void 0
                    : t.followerCount) && void 0 !== n
                ? n
                : 0;
          return { followerCount: r, isFollowerCountVisible: r > 0 };
        },
        h = function (e) {
          var n,
            t,
            r = e.publisher,
            l = e.disableLink,
            o = void 0 !== l && l,
            m = e.linkStyle,
            h = void 0 === m ? "SUBTLE" : m,
            v = g(r),
            f = v.followerCount,
            p = v.isFollowerCountVisible,
            E = (0, c.GE)("ShowLiteCollectionFollowers", {
              collectionSlug:
                "Collection" === r.__typename &&
                null !== (n = r.slug) &&
                void 0 !== n
                  ? n
                  : "",
            }),
            b =
              "User" === r.__typename
                ? (0, d.olC)(null !== (t = r.username) && void 0 !== t ? t : "")
                : E,
            S = !o;
          if (!p) return null;
          var _ = ""
            .concat((0, s.pY)(f), " Follower")
            .concat(1 === f ? "" : "s");
          return S
            ? i.createElement(a.rU, { href: b, linkStyle: h }, _)
            : i.createElement(
                u.F,
                { tag: "span", scale: "L", color: "DARKER" },
                _
              );
        },
        v = (0, o.Ps)(m());
    },
    82395: (e, n, t) => {
      "use strict";
      t.d(n, { R: () => h });
      var r = t(67294),
        l = t(28309);
      function o() {
        return (o =
          Object.assign ||
          function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      var i = r.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.08.32L5.78 4.6 1.5.3.88.94l4.3 4.29L.88 9.5l.62.61 4.29-4.29 4.29 4.29.61-.61L6.4 5.2 10.69.94",
      });
      function a() {
        return (a =
          Object.assign ||
          function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      var u = r.createElement("path", {
        d: "M12.6.59L7 6.19 1.39.6l-.8.8L6.19 7 .6 12.61l.8.8L7 7.81l5.61 5.6.8-.8L7.81 7l5.6-5.61",
      });
      function c() {
        return (c =
          Object.assign ||
          function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      var s = r.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M8.08.89l-3.5 3.5-3.5-3.5-.5.5 3.5 3.5-3.5 3.5.5.5 3.5-3.5 3.5 3.5.5-.5-3.5-3.5 3.5-3.5",
        }),
        d = {
          EXTRA_SMALL: function (e) {
            return r.createElement("svg", c({ width: 9, height: 9 }, e), s);
          },
          SMALL: function (e) {
            return r.createElement(
              "svg",
              o({ width: 11, height: 11, fill: "none" }, e),
              i
            );
          },
          MEDIUM: function (e) {
            return r.createElement("svg", a({ width: 14, height: 14 }, e), u);
          },
        },
        m = function (e) {
          return {
            fill: e.baseColor.fill.lighter,
            ":hover": { fill: e.baseColor.fill.darker },
            ":focus": { fill: e.baseColor.fill.darker },
          };
        },
        g = function (e) {
          return {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "EXTRA_SMALL" === e ? "4px" : "0px",
            margin: "0px",
            border: "0px",
            cursor: "pointer",
          };
        };
      function h(e) {
        var n = e.onClick,
          t = e.size,
          o = void 0 === t ? "MEDIUM" : t,
          i = e.ariaLabel,
          a = void 0 === i ? "close" : i,
          u = (0, l.Iq)(),
          c = d[o];
        return r.createElement(
          "button",
          { className: u(g(o)), onClick: n, "aria-label": a },
          r.createElement(c, { className: u(m) })
        );
      }
    },
    85489: (e, n, t) => {
      "use strict";
      t.d(n, {
        eQ: () => I,
        xW: () => A,
        Z: () => P,
        hB: () => T,
        MQ: () => R,
        BH: () => H,
        fl: () => N,
        zO: () => W,
        _3: () => G,
      });
      var r = t(50008),
        l = t.n(r),
        o = t(63038),
        i = t.n(o),
        a = t(28655),
        u = t.n(a),
        c = t(14176),
        s = t.n(c),
        d = t(45220),
        m = t.n(d),
        g = t(18446),
        h = t.n(g),
        v = t(1469),
        f = t.n(v),
        p = t(71439);
      function E() {
        var e = u()([
          "\n  fragment SupportedTypeStyles_styleNode on StyleNode {\n    type {\n      color\n      fontSize {\n        phone\n        tablet\n        desktop\n      }\n      fontStyle\n      letterSpacing\n      lineHeight {\n        phone\n        tablet\n        desktop\n      }\n      textAlign\n      textDecoration\n      textTransform\n      weight\n    }\n  }\n",
        ]);
        return (
          (E = function () {
            return e;
          }),
          e
        );
      }
      function b() {
        var e = u()([
          "\n  fragment SupportedContainerStyles_styleNode on StyleNode {\n    container {\n      backgroundColor\n      borderColor\n      borderRadius\n      borderStyle\n      borderWidth\n      marginBottom\n      marginLeft\n      marginRight\n      marginTop\n      paddingBottom\n      paddingLeft\n      paddingRight\n      paddingTop\n    }\n  }\n",
        ]);
        return (
          (b = function () {
            return e;
          }),
          e
        );
      }
      function S() {
        var e = u()([
          "\n  fragment getHasCustomBackgroundColor_publisher on Publisher {\n    customStyleSheet {\n      ...getHasCustomBackgroundColor_customStyleSheet\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (S = function () {
            return e;
          }),
          e
        );
      }
      function _() {
        var e = u()([
          "\n  fragment getHasCustomBackgroundColor_customStyleSheet on CustomStyleSheet {\n    id\n    global {\n      colorPalette {\n        background {\n          rgb\n        }\n      }\n    }\n  }\n",
        ]);
        return (
          (_ = function () {
            return e;
          }),
          e
        );
      }
      function x() {
        var e = u()([
          "\n  fragment getHasCustomPrimaryColor_publisher on Publisher {\n    customStyleSheet {\n      ...getHasCustomPrimaryColor_customStyleSheet\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (x = function () {
            return e;
          }),
          e
        );
      }
      function y() {
        var e = u()([
          "\n  fragment getHasCustomPrimaryColor_customStyleSheet on CustomStyleSheet {\n    id\n    global {\n      colorPalette {\n        primary {\n          rgb\n        }\n      }\n    }\n  }\n",
        ]);
        return (
          (y = function () {
            return e;
          }),
          e
        );
      }
      function w() {
        var e = u()([
          "\n  fragment getOpaqueHexFromColorValue_colorValue on ColorValue {\n    rgb\n  }\n",
        ]);
        return (
          (w = function () {
            return e;
          }),
          e
        );
      }
      function C() {
        var e = u()([
          "\n  fragment getHexFromColorValue_colorValue on ColorValue {\n    rgb\n    alpha\n  }\n",
        ]);
        return (
          (C = function () {
            return e;
          }),
          e
        );
      }
      var L,
        k,
        M =
          /^#?([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$|^#?([0-9a-fA-F]{3})([0-9a-fA-F]{1})?$/;
      !(function (e) {
        (e.FULL_WIDTH = "FULL_WIDTH"), (e.HALF_WIDTH = "HALF_WIDTH");
      })(L || (L = {})),
        (function (e) {
          (e.TEXT = "TEXT"), (e.COLOR_PICKER = "COLOR_PICKER");
        })(k || (k = {}));
      var I = function (e) {
          if (!e) return e;
          var n = e.rgb,
            t = e.alpha,
            r = "#".concat(n).concat(t || "");
          return M.exec(r) ? r : null;
        },
        A = (0, p.Ps)(C()),
        P = function (e, n) {
          if (!e) return e;
          var t = e.rgb,
            r = "#".concat(t).concat(null != n ? n : "");
          return M.exec(r) ? r : null;
        },
        T = (0, p.Ps)(w()),
        R = function (e) {
          var n = M.exec(e);
          if (!n) return null;
          var t = i()(n, 5),
            r = t[1],
            l = t[2],
            o = t[3],
            a = t[4];
          return { rgb: r || o, alpha: l || a || null };
        },
        H = function (e) {
          if (!e) return null;
          var n =
              /rgba?\((\d+),(\d+),(\d+),?(\d*\.?\d+)?\)/.exec(
                e.replace(/\s+/g, "")
              ) || [],
            t = i()(n, 5),
            r = [t[1], t[2], t[3], t[4]];
          return (
            (r[3] = r[3] ? Math.round(255 * +r[3]).toString() : "255"),
            {
              rgb: (r = r.map(function (e) {
                return (+e).toString(16).padStart(2, "0");
              }))
                .slice(0, 3)
                .join(""),
              alpha: r[3] || null,
            }
          );
        },
        N = function (e) {
          var n = null == e ? void 0 : e.container;
          if (!e || !n)
            return function () {
              return {};
            };
          var t = s()(n, m());
          return (
            delete t.__typename,
            function (e) {
              return D(t);
            }
          );
        },
        D = function (e) {
          var n = Object.entries(e).map(function (e) {
            var n = i()(e, 2),
              t = n[0],
              r = n[1];
            return [t, "object" === l()(r) ? r : F(r)];
          });
          return B(n);
        },
        F = function (e) {
          return e ? { xs: e, sm: e, md: e, lg: e, xl: e } : e;
        },
        B = function (e) {
          return e.reduce(function (e, n) {
            return (e[n[0]] = n[1]), e;
          }, {});
        },
        O = (0, p.Ps)(y()),
        V = ((0, p.Ps)(x(), O), (0, p.Ps)(_())),
        U =
          ((0, p.Ps)(S(), V),
          function e(n) {
            if ("object" === l()(n) && null !== n) {
              for (var t = 0, r = Object.values(n); t < r.length; t++)
                if (!e(r[t])) return !1;
              return !0;
            }
            return null == n || "" === n;
          }),
        W = function e(n, t) {
          var r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
          if (!n && !t) return U(n) && U(t);
          if (!t) return U(n);
          if (!n) return U(t);
          if ("object" !== l()(n)) return n === t;
          if (f()(n) && f()(t)) return h()(n, t);
          for (var o = 0, a = Object.entries(n); o < a.length; o++) {
            var u = i()(a[o], 2),
              c = u[0],
              s = u[1];
            if (!r.includes(c)) {
              var d = t[c];
              if (!e(s, d)) return !1;
            }
          }
          return !0;
        },
        G = (0, p.Ps)(b());
      (0, p.Ps)(E());
    },
    65849: (e, n, t) => {
      "use strict";
      t.d(n, { jb: () => l, Jq: () => i });
      var r = t(14391),
        l = function () {
          return o();
        },
        o = function () {
          return {
            horizontalAlignment: r.v2.START,
            headerScale: r.w6.HEADER_SCALE_SMALL,
            logoScale: r.w6.HEADER_SCALE_MEDIUM,
            backgroundColorDisplayMode: r.PG.COLOR_DISPLAY_MODE_SOLID,
            backgroundImageDisplayMode: r.zc.IMAGE_DISPLAY_MODE_FILL,
            backgroundImageVerticalAlignment: r.v2.START,
            nameTreatment: r.m3.NAME_TREATMENT_TEXT,
            postNameTreatment: r.m3.NAME_TREATMENT_LOGO,
            taglineTreatment: r.KI.TAGLINE_TREATMENT_SIDEBAR,
            backgroundColor: null,
            secondaryBackgroundColor: null,
            postBackgroundColor: null,
            taglineColor: null,
            backgroundImage: null,
            logoImage: null,
            nameColor: null,
          };
        },
        i = function () {
          return a();
        },
        a = function () {
          return {
            font1: { name: r.G7.SANS_SERIF_1 },
            font2: { name: r.G7.SANS_SERIF_1 },
            font3: { name: r.G7.SERIF_2 },
          };
        };
    },
    96210: (e, n, t) => {
      "use strict";
      t.d(n, { w: () => l, f: () => o });
      var r = t(67294),
        l = r.createContext({ isWorkingPreview: !1 }),
        o = function () {
          return r.useContext(l);
        };
    },
    72214: (e, n, t) => {
      "use strict";
      t.d(n, {
        hl: () => d,
        qQ: () => m,
        EV: () => g,
        w7: () => h,
        u6: () => f,
      });
      var r = t(28655),
        l = t.n(r),
        o = t(71439),
        i = t(14391),
        a = t(27952);
      function u() {
        var e = l()([
          "\n  fragment getNavItemHref_publisher on Publisher {\n    id\n    ...publisherUrl_publisher\n  }\n  ",
          "\n",
        ]);
        return (
          (u = function () {
            return e;
          }),
          e
        );
      }
      function c() {
        var e = l()([
          "\n  fragment getNavItemHref_headerNavigationItem on HeaderNavigationItem {\n    href\n    type\n    tags {\n      id\n      normalizedTagSlug\n    }\n  }\n",
        ]);
        return (
          (c = function () {
            return e;
          }),
          e
        );
      }
      var s,
        d = function (e, n, t) {
          var r;
          switch (n.type) {
            case i.Me.NAV_TYPE_LINK:
              return n.href || "#";
            case i.Me.NAV_TYPE_TAG:
              var l = null === (r = n.tags) || void 0 === r ? void 0 : r[0],
                o =
                  (null == l ? void 0 : l.normalizedTagSlug) ||
                  (null == l ? void 0 : l.id) ||
                  "";
              return (0, a.Whg)(e, o, t);
          }
          return "#";
        },
        m = (0, o.Ps)(c()),
        g = (0, o.Ps)(u(), a.uID);
      !(function (e) {
        (e.MissingName = "Please enter a section name"),
          (e.MissingTag = "Please add a tag"),
          (e.MissingLink = "Please enter a link"),
          (e.MissingNameAndTag = "Please enter a section name and a tag"),
          (e.MissingNameAndLink = "Please enter a section name and a link");
      })(s || (s = {}));
      var h = function (e) {
          var n;
          switch (e.type) {
            case i.Me.NAV_TYPE_TAG:
              if (null === (n = e.tagSlugs) || void 0 === n || !n.length)
                return e.name ? s.MissingTag : s.MissingNameAndTag;
              break;
            case i.Me.NAV_TYPE_LINK:
              if (null == e || !e.href)
                return e.name ? s.MissingLink : s.MissingNameAndLink;
          }
          return e.name ? null : s.MissingName;
        },
        v = function (e) {
          return !h(e);
        },
        f = function (e) {
          return 0 === e.length || (null == e ? void 0 : e.every(v));
        };
    },
    68421: (e, n, t) => {
      "use strict";
      t.d(n, { $S: () => r, JN: () => w, oP: () => L });
      var r,
        l = t(67154),
        o = t.n(l),
        i = t(63038),
        a = t.n(i),
        u = t(6479),
        c = t.n(u),
        s = t(28655),
        d = t.n(s),
        m = t(71439),
        g = t(46829),
        h = t(67294),
        v = t(96210),
        f = t(34675),
        p = t(22091),
        E = t(82318),
        b = t(80362),
        S = t(64504),
        _ = t(24438),
        x = t(27599);
      function y() {
        var e = d()([
          "\n  mutation DismissFlagMutation($userId: ID!, $flag: UserDismissableFlags!) {\n    userDismissFlag(userId: $userId, flag: $flag)\n  }\n",
        ]);
        return (
          (y = function () {
            return e;
          }),
          e
        );
      }
      !(function (e) {
        (e.CTA = "CTA"), (e.DISMISSED = "DISMISSED");
      })(r || (r = {}));
      var w = (0, m.Ps)(y()),
        C = function (e) {
          var n = e.children,
            t = e.flag,
            l = e.text,
            i = e.renderFn,
            u = e.viewer,
            s = e.padding,
            d = void 0 === s ? 20 : s,
            m = c()(e, [
              "children",
              "flag",
              "text",
              "renderFn",
              "viewer",
              "padding",
            ]),
            v = (0, x.Av)(),
            f = h.useState(!1),
            y = a()(f, 2),
            C = y[0],
            L = y[1],
            k = (0, g.useMutation)(w, { variables: { userId: u.id, flag: t } }),
            M = a()(k, 1)[0],
            I = h.useCallback(
              function () {
                var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : r.DISMISSED;
                L(!1),
                  M(),
                  v.event("user.dismissedPopover", { flag: t, action: e });
              },
              [C]
            );
          h.useEffect(function () {
            return L(!0);
          }, []);
          var A = h.useCallback(
            function () {
              return h.createElement(
                p.xu,
                { minWidth: "200px", padding: (0, _.a)(d) },
                h.createElement(S.F, { scale: "S" }, l),
                h.createElement(
                  p.xu,
                  { marginTop: "20px" },
                  h.createElement(
                    S.F,
                    { scale: "S" },
                    h.createElement(
                      E.r,
                      {
                        linkStyle: "OBVIOUS",
                        onClick: function () {
                          return I(r.DISMISSED);
                        },
                      },
                      "Got it"
                    )
                  )
                )
              );
            },
            [I, d, l]
          );
          return h.createElement(
            b.J,
            o()(
              {
                disablePortalOverlay: !0,
                hide: I,
                isVisible: C,
                popoverRenderFn: i ? i(I) : A,
              },
              m
            ),
            n
          );
        },
        L = function (e) {
          var n = e.children,
            t = e.flag,
            r = e.isVisible,
            l = void 0 === r || r,
            i = c()(e, ["children", "flag", "isVisible"]),
            a = (0, v.f)().isWorkingPreview,
            u = (0, f.Hk)().value;
          return a || (null != u && u.dismissableFlags.includes(t)) || !u || !l
            ? n
            : h.createElement(C, o()({ flag: t, viewer: u }, i), n);
        };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/2712.61545650.chunk.js.map
