(self.webpackChunklite = self.webpackChunklite || []).push([
  [2238],
  {
    62238: (n, e, t) => {
      "use strict";
      t.d(e, { P: () => B, Z: () => k });
      var o = t(59713),
        r = t.n(o),
        i = t(67154),
        a = t.n(i),
        l = t(63038),
        s = t.n(l),
        d = t(6479),
        u = t.n(d),
        c = t(28655),
        p = t.n(c),
        f = t(82492),
        v = t.n(f),
        h = t(71439),
        g = t(46829),
        P = t(67294),
        y = t(2955),
        b = t(42963),
        m = t(30570),
        w = t(15789),
        O = t(34675),
        x = t(27599),
        E = t(72955),
        I = t(64227),
        C = t(19732);
      function M(n, e) {
        var t = Object.keys(n);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(n);
          e &&
            (o = o.filter(function (e) {
              return Object.getOwnPropertyDescriptor(n, e).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function S(n) {
        for (var e = 1; e < arguments.length; e++) {
          var t = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? M(Object(t), !0).forEach(function (e) {
                r()(n, e, t[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t))
            : M(Object(t)).forEach(function (e) {
                Object.defineProperty(
                  n,
                  e,
                  Object.getOwnPropertyDescriptor(t, e)
                );
              });
        }
        return n;
      }
      function _() {
        var n = p()([
          "\n  query InlineExpandingPostExpandedQuery($postId: ID!, $postMeteringOptions: PostMeteringOptions) {\n    postResult(id: $postId) {\n      __typename\n      ... on Post {\n        id\n        collection {\n          id\n          slug\n        }\n        content(postMeteringOptions: $postMeteringOptions) {\n          bodyModel {\n            paragraphs {\n              name\n              text\n            }\n          }\n        }\n        extendedPreviewContent(\n          truncationConfig: {\n            previewParagraphsWordCountThreshold: 100\n            minimumWordLengthForTruncation: 150\n            truncateAtEndOfSentence: true\n            showFullImageCaptions: true\n            shortformPreviewParagraphsWordCountThreshold: 30\n            shortformMinimumWordLengthForTruncation: 30\n          }\n        ) {\n          bodyModel {\n            ...InteractivePostBody_bodyModel\n          }\n        }\n        ...InteractivePostBody_post\n        ...InlineExpandingPost_post\n        ...InlineExpansionContext_post\n        ...PostReadTracker_post\n      }\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (_ = function () {
            return n;
          }),
          n
        );
      }
      function j() {
        var n = p()([
          "\n  fragment InlineExpandingPost_post on Post {\n    id\n    isShortform\n    mediumUrl\n    visibility\n    extendedPreviewContent(\n      truncationConfig: {\n        previewParagraphsWordCountThreshold: 100\n        minimumWordLengthForTruncation: 150\n        truncateAtEndOfSentence: true\n        showFullImageCaptions: true\n        shortformPreviewParagraphsWordCountThreshold: 30\n        shortformMinimumWordLengthForTruncation: 30\n      }\n    ) {\n      bodyModel {\n        ...InteractivePostBody_bodyModel\n      }\n    }\n    ...TruncatedPostCard_post\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (j = function () {
            return n;
          }),
          n
        );
      }
      var B = (0, h.Ps)(j(), y.Dn, w.$e),
        N = (0, h.Ps)(_(), w.Uw, B, m.q9, w.$e, E.WZ);
      function k(n) {
        var e,
          t = n.post,
          o = u()(n, ["post"]),
          r = !!(0, O.Hk)().value,
          i = P.useRef(null),
          l = P.useRef(null),
          d = P.useState(!1),
          c = s()(d, 2),
          p = c[0],
          f = c[1],
          h = (0, m.sK)(),
          M = h.expandedPostId,
          _ = h.setExpandedPostId,
          j = h.expandedPost,
          B = h.setExpandedPost,
          k = h.setPostInView,
          A = (null == j ? void 0 : j.id) === t.id,
          R = (0, x.Av)();
        (0, E.t2)(r, i, j);
        var T = (0, g.useLazyQuery)(N, {
            variables: { postId: t.id, postMeteringOptions: {} },
          }),
          D = s()(T, 2),
          L = D[0],
          $ = D[1],
          U = $.called,
          W = $.data,
          F = $.loading,
          H = $.error;
        P.useEffect(
          function () {
            if (!F && M === t.id)
              if ((H && f(!0), U)) {
                var n = null == W ? void 0 : W.postResult;
                if ((0, C.f)(n))
                  try {
                    var e = (function (n) {
                      var e, t, o, r, i, a, l, s;
                      if (
                        null == n ||
                        null === (e = n.extendedPreviewContent) ||
                        void 0 === e ||
                        null === (t = e.bodyModel) ||
                        void 0 === t ||
                        null === (o = t.paragraphs) ||
                        void 0 === o ||
                        !o.length
                      )
                        throw new Error(
                          "Expected post to have preview content."
                        );
                      var d = new Map();
                      null != n &&
                        null !== (r = n.extendedPreviewContent) &&
                        void 0 !== r &&
                        null !== (i = r.bodyModel) &&
                        void 0 !== i &&
                        null !== (a = i.paragraphs) &&
                        void 0 !== a &&
                        a.length &&
                        n.extendedPreviewContent.bodyModel.paragraphs.forEach(
                          function (n) {
                            d.set(n.name, n);
                          }
                        );
                      var u = [],
                        c = [];
                      return (
                        null != n &&
                          null !== (l = n.content) &&
                          void 0 !== l &&
                          null !== (s = l.bodyModel) &&
                          void 0 !== s &&
                          s.paragraphs &&
                          n.content.bodyModel.paragraphs.forEach(function (n) {
                            var e,
                              t = d.get(n.name);
                            t &&
                            t.text.length ===
                              (null === (e = n.text) || void 0 === e
                                ? void 0
                                : e.length)
                              ? u.push(t)
                              : c.push(n);
                          }),
                        v()({}, n, {
                          content: S(
                            S(S({}, n.extendedPreviewContent), n.content),
                            {},
                            {
                              isFullContent: !0,
                              bodyModel: S(
                                S(
                                  S({}, n.extendedPreviewContent.bodyModel),
                                  n.content.bodyModel
                                ),
                                {},
                                { paragraphs: [].concat(u, c) }
                              ),
                            }
                          ),
                        })
                      );
                    })(n);
                    _(e.id), B(e);
                  } catch (n) {
                    f(!0);
                  }
                else f(!0);
              } else L();
          },
          [M, U, F, W, H]
        ),
          P.useEffect(
            function () {
              var n, e;
              R.event("post.clientViewed", {
                postId: t.id,
                collectionId:
                  null === (n = t.collection) || void 0 === n ? void 0 : n.id,
                collectionSlug:
                  null === (e = t.collection) || void 0 === e ? void 0 : e.slug,
                context: 2,
              });
            },
            [j]
          );
        var V = P.useCallback(function (n) {
          var e;
          n.preventDefault();
          var o =
            null === (e = i.current) || void 0 === e
              ? void 0
              : e.getBoundingClientRect();
          null != o && o.top && (l.current = o.top), _(t.id);
        }, []);
        (0, I.L)(
          function () {
            var n,
              e =
                null === (n = i.current) || void 0 === n
                  ? void 0
                  : n.getBoundingClientRect();
            if (j && A && e) {
              var t = e.top - (l.current || 0);
              Boolean(t) && window.scrollBy(0, t);
            }
          },
          [j, A]
        );
        var z = P.useCallback(
            function (n) {
              if (j && n)
                if (n.intersectionRatio) {
                  k(!0);
                  var e = new URL(window.location.href);
                  e.searchParams.set("p", j.id),
                    window.history.pushState({}, "", e.toString());
                } else {
                  var t = new URL(window.location.href),
                    o = t.searchParams.get("p");
                  o &&
                    o === j.id &&
                    (k(!1),
                    t.searchParams.delete("p"),
                    window.history.pushState({}, "", t.toString()));
                }
            },
            [j]
          ),
          Q = P.useCallback(
            function () {
              return !A;
            },
            [A]
          );
        if (
          ((0, E.S1)({ onIntersect: z, target: i, disconnect: Q }, [j, A]),
          p && t.mediumUrl)
        )
          return P.createElement(b.l, { to: t.mediumUrl });
        if (
          null == t ||
          null === (e = t.extendedPreviewContent) ||
          void 0 === e ||
          !e.bodyModel
        )
          return null;
        var q = P.createElement(w.bl, {
          isAuroraPostPageEnabled: !0,
          post: A ? j : null,
          inlinePost: t,
          ref: i,
          richTextStyle: "CARD",
        });
        return P.createElement(
          y.Xc,
          a()(
            {
              customPostBody: q,
              onReadMore: V,
              showReadMore: !(A && j),
              post: t,
            },
            o
          )
        );
      }
    },
    30570: (n, e, t) => {
      "use strict";
      t.d(e, { sK: () => c, L0: () => p, q9: () => f });
      var o = t(28655),
        r = t.n(o),
        i = t(63038),
        a = t.n(i),
        l = t(71439),
        s = t(67294);
      function d() {
        var n = r()([
          "\n  fragment InlineExpansionContext_post on Post {\n    id\n    creator {\n      id\n      customStyleSheet {\n        id\n        blogroll {\n          visibility\n        }\n      }\n      isAuroraVisible\n      followedCollections\n      socialStats {\n        followingCount\n      }\n    }\n    collection {\n      id\n      canToggleEmail\n      description\n      isAuroraEligible\n      isAuroraVisible\n      viewerEdge {\n        id\n        isEditor\n      }\n      tagline\n    }\n    customStyleSheet {\n      id\n      blogroll {\n        visibility\n      }\n    }\n  }\n",
        ]);
        return (
          (d = function () {
            return n;
          }),
          n
        );
      }
      var u = s.createContext({
          expandedPostId: null,
          setExpandedPostId: function () {},
          postInView: !1,
          setPostInView: function () {},
          expandedPost: null,
          setExpandedPost: function () {},
        }),
        c = function () {
          return s.useContext(u);
        },
        p = function (n) {
          var e = n.children,
            t = s.useState(null),
            o = a()(t, 2),
            r = o[0],
            i = o[1],
            l = s.useState(!1),
            d = a()(l, 2),
            c = d[0],
            p = d[1],
            f = s.useState(null),
            v = a()(f, 2),
            h = v[0],
            g = v[1];
          return s.createElement(
            u.Provider,
            {
              value: {
                expandedPostId: r,
                setExpandedPostId: i,
                postInView: c,
                setPostInView: p,
                expandedPost: h,
                setExpandedPost: g,
              },
            },
            e
          );
        },
        f = (0, l.Ps)(d());
    },
    15789: (n, e, t) => {
      "use strict";
      t.d(e, { bl: () => R, $e: () => N, Uw: () => k });
      var o = t(67154),
        r = t.n(o),
        i = t(63038),
        a = t.n(i),
        l = t(28655),
        s = t.n(l),
        d = t(46829),
        u = t(71439),
        c = t(67294),
        p = t(25415),
        f = t(40820),
        v = t(69677),
        h = t(72846),
        g = t(91442),
        P = t(59713),
        y = t.n(P),
        b = t(11642);
      function m() {
        var n = s()([
          "\n  fragment NormalizeHighlights_paragraph on Paragraph {\n    name\n    text\n  }\n",
        ]);
        return (
          (m = function () {
            return n;
          }),
          n
        );
      }
      function w() {
        var n = s()([
          "\n  fragment NormalizeHighlights_highlight on Quote {\n    endOffset\n    startOffset\n    paragraphs {\n      name\n      text\n    }\n  }\n",
        ]);
        return (
          (w = function () {
            return n;
          }),
          n
        );
      }
      function O(n, e) {
        var t = Object.keys(n);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(n);
          e &&
            (o = o.filter(function (e) {
              return Object.getOwnPropertyDescriptor(n, e).enumerable;
            })),
            t.push.apply(t, o);
        }
        return t;
      }
      function x(n) {
        for (var e = 1; e < arguments.length; e++) {
          var t = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? O(Object(t), !0).forEach(function (e) {
                y()(n, e, t[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t))
            : O(Object(t)).forEach(function (e) {
                Object.defineProperty(
                  n,
                  e,
                  Object.getOwnPropertyDescriptor(t, e)
                );
              });
        }
        return n;
      }
      function E(n, e, t) {
        if (!n || "number" != typeof e || "number" != typeof t) return null;
        var o = e,
          r = t;
        return n.substr(o, r - o);
      }
      var I = (0, u.Ps)(w()),
        C = (0, u.Ps)(m()),
        M = t(34675),
        S = t(44059);
      function _() {
        var n = s()([
          "\n  query InteractivePostBodyQuery($postId: ID!, $showNotes: Boolean!) {\n    post(id: $postId) {\n      id\n      highlights {\n        id\n        ...ActiveSelectionContext_highlight\n        ...HighlighSegmentContext_highlight\n        ...NormalizeHighlights_highlight\n        ...PostBody_highlight\n      }\n      privateNotes @include(if: $showNotes) {\n        ...PostBody_privateNote\n      }\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (_ = function () {
            return n;
          }),
          n
        );
      }
      function j() {
        var n = s()([
          "\n  fragment InteractivePostBody_post on Post {\n    id\n    # please note that postMeteringOptions is defined in PostHandler, which uses InteractivePostBody\n    content(postMeteringOptions: $postMeteringOptions) {\n      isLockedPreviewOnly\n      bodyModel {\n        ...PostBody_bodyModel\n        paragraphs {\n          ...HighlighSegmentContext_paragraph\n          ...NormalizeHighlights_paragraph\n        }\n      }\n    }\n    creator {\n      id\n      allowNotes\n      ...PostBody_creator\n    }\n    ...ActiveSelectionContext_post\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (j = function () {
            return n;
          }),
          n
        );
      }
      function B() {
        var n = s()([
          "\n  fragment InteractivePostBody_bodyModel on RichText {\n    ...PostBody_bodyModel\n  }\n  ",
          "\n",
        ]);
        return (
          (B = function () {
            return n;
          }),
          n
        );
      }
      var N = (0, u.Ps)(B(), h.Pk),
        k = (0, u.Ps)(j(), f.iF, g.iB, C, h.Pk, h.v),
        A = (0, u.Ps)(_(), f.UW, g.g8, h.XV, h.w6, I),
        R = c.forwardRef(function (n, e) {
          var t,
            o,
            i,
            l = n.activeGrafId,
            s = n.activeNoteId,
            u = n.isAuroraPostPageEnabled,
            P = n.post,
            y = n.inlinePost,
            m = n.postBodyInserts,
            w = n.richTextStyle,
            O = (0, M.Hk)().value,
            I = y && !P,
            C = I
              ? null == y ||
                null === (t = y.extendedPreviewContent) ||
                void 0 === t
                ? void 0
                : t.bodyModel
              : null == P || null === (o = P.content) || void 0 === o
              ? void 0
              : o.bodyModel,
            _ = {
              creator: null == P ? void 0 : P.creator,
              isAuroraPostPageEnabled: u,
              postBodyInserts: m,
              ref: e,
              richTextStyle: I ? "CARD" : w || "FULL_PAGE",
            },
            j = (P && P.creator && P.creator.allowNotes) || !1,
            B = (0, d.useLazyQuery)(A, {
              ssr: !1,
              variables: {
                postId: (null == P ? void 0 : P.id) || "",
                showNotes: j,
              },
              notifyOnNetworkStatusChange: !0,
            }),
            N = a()(B, 2),
            k = N[0],
            R = N[1],
            T = R.called,
            D = R.data,
            L = null == D ? void 0 : D.post;
          if (
            (c.useEffect(
              function () {
                P && !T && k();
              },
              [P]
            ),
            !C)
          )
            return (
              S.t.log("Expected post to have content or preview content."), null
            );
          var $ =
              ((null == P || null === (i = P.content) || void 0 === i
                ? void 0
                : i.bodyModel) &&
                (null == P ? void 0 : P.content.bodyModel.paragraphs)) ||
              [],
            U = (function (n, e) {
              return n && e
                ? n
                    .map(function (n) {
                      var t = n.endOffset,
                        o = n.startOffset,
                        r = n.paragraphs && n.paragraphs[0],
                        i = (function (n, e) {
                          return n
                            ? e.find(function (e) {
                                var t = e.name;
                                return n === t;
                              })
                            : null;
                        })(r.name, e);
                      if (!r || !i) return null;
                      var a = E(r.text, o, t),
                        l = E(i.text, o, t);
                      if (!a || !l) return null;
                      if (a === l) return n;
                      var s = i.text ? i.text.indexOf(a) : null;
                      if ("number" != typeof s || s < 0) return null;
                      var d = s + a.length;
                      return x(x({}, n), {}, { endOffset: d, startOffset: s });
                    })
                    .filter(b.b)
                : n;
            })((L && L.highlights) || [], $),
            W = (L && L.privateNotes) || null;
          return c.createElement(
            v.yb,
            null,
            c.createElement(
              p.KN,
              { initialActivePrivateNoteId: s, initialActiveGrafName: l },
              c.createElement(
                f.Ms,
                { interactivePost: P, highlights: U, disableSelection: !P },
                c.createElement(
                  g.U7,
                  { highlights: U, paragraphs: $, viewer: O },
                  c.createElement(
                    h.yO,
                    r()({}, _, { bodyModel: C, highlights: U, privateNotes: W })
                  )
                )
              )
            )
          );
        });
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/2238.39c71555.chunk.js.map
