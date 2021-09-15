(self.webpackChunklite = self.webpackChunklite || []).push([
  [2176],
  {
    71254: (t, n, e) => {
      "use strict";
      e.d(n, { Z: () => a });
      var r = e(67294);
      function o() {
        return (o =
          Object.assign ||
          function (t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n];
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            }
            return t;
          }).apply(this, arguments);
      }
      var i = r.createElement("path", {
        d: "M19 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14.66h.01c.01.1.05.2.12.28a.5.5 0 0 0 .7.03l5.67-4.12 5.66 4.13a.5.5 0 0 0 .71-.03.5.5 0 0 0 .12-.29H19V6zm-6.84 9.97L7 19.64V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v13.64l-5.16-3.67a.49.49 0 0 0-.68 0z",
        fillRule: "evenodd",
      });
      const a = function (t) {
        return r.createElement(
          "svg",
          o({ width: 25, height: 25, viewBox: "0 0 25 25" }, t),
          i
        );
      };
    },
    6106: (t, n, e) => {
      "use strict";
      e.d(n, { Z: () => a });
      var r = e(67294);
      function o() {
        return (o =
          Object.assign ||
          function (t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n];
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            }
            return t;
          }).apply(this, arguments);
      }
      var i = r.createElement("path", {
        d: "M19 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14.66h.01c.01.1.05.2.12.28a.5.5 0 0 0 .7.03l5.67-4.12 5.66 4.13c.2.18.52.17.71-.03a.5.5 0 0 0 .12-.29H19V6z",
      });
      const a = function (t) {
        return r.createElement(
          "svg",
          o({ width: 25, height: 25, viewBox: "0 0 25 25" }, t),
          i
        );
      };
    },
    33241: (t, n, e) => {
      "use strict";
      e.d(n, { g: () => d, H: () => p });
      var r = e(28655),
        o = e.n(r),
        i = e(71439),
        a = e(80439),
        s = e(67294),
        u = e(12291),
        l = e(85277);
      function c() {
        var t = o()([
          "\n  mutation UserReportStoryMutation(\n    $targetPostId: ID!\n    $targetAuthorId: ID!\n    $alsoBlockAuthor: Boolean!\n    $reason: String!\n  ) {\n    reportStoryAndMaybeBlockAuthor(\n      targetPostId: $targetPostId\n      targetAuthorId: $targetAuthorId\n      alsoBlockAuthor: $alsoBlockAuthor\n      reason: $reason\n    ) {\n      id\n      viewerEdge {\n        id\n        isBlocking\n      }\n    }\n  }\n",
        ]);
        return (
          (c = function () {
            return t;
          }),
          t
        );
      }
      var d = (0, i.Ps)(c()),
        p = (0, u.$j)()(function (t) {
          var n = t.targetAuthorId,
            e = t.targetPostId,
            r = t.dispatch,
            o = t.children,
            i = t.onOptimisticComplete,
            u = t.isBlocking,
            c = t.viewerId;
          return s.createElement(
            a.mm,
            {
              mutation: d,
              onCompleted: function () {
                r((0, l.Dx)({ message: "Successfully reported post." }));
              },
            },
            function (t) {
              return o({
                mutate: function (r, o) {
                  var a = t({
                    variables: {
                      targetAuthorId: n,
                      targetPostId: e,
                      alsoBlockAuthor: r,
                      reason: o,
                    },
                    optimisticResponse: {
                      __typename: "Mutation",
                      reportStoryAndMaybeBlockAuthor: {
                        __typename: "User",
                        id: n,
                        viewerEdge: {
                          id: "userId:".concat(n, "-viewerId:").concat(c),
                          isBlocking: u || r,
                        },
                      },
                    },
                  });
                  return i && i(), a;
                },
              });
            }
          );
        });
    },
    86753: (t, n, e) => {
      "use strict";
      e.d(n, { e: () => w, z: () => R });
      var r = e(63038),
        o = e.n(r),
        i = e(28655),
        a = e.n(i),
        s = e(71439),
        u = e(67294),
        l = e(3021),
        c = e(34675),
        d = e(62181),
        p = e(267),
        f = e(85432),
        m = e(33914),
        g = e(27599),
        v = e(27572),
        E = e(28309),
        I = e(14391),
        _ = e(67297),
        h = e(71254),
        y = e(6106);
      function b() {
        return (b =
          Object.assign ||
          function (t) {
            for (var n = 1; n < arguments.length; n++) {
              var e = arguments[n];
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            }
            return t;
          }).apply(this, arguments);
      }
      var P = u.createElement("path", {
        d: "M19 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14.66h.01c.01.1.05.2.12.28a.5.5 0 0 0 .7.03l5.67-4.12 5.66 4.13c.2.18.52.17.71-.03a.5.5 0 0 0 .12-.29H19V6z",
      });
      const A = function (t) {
        return u.createElement(
          "svg",
          b({ width: 25, height: 25, viewBox: "0 0 25 25" }, t),
          P
        );
      };
      var S = e(27952);
      function C() {
        var t = a()([
          "\n  fragment BookmarkButton_post on Post {\n    ...SusiClickable_post\n    ...WithSetReadingList_post\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (C = function () {
            return t;
          }),
          t
        );
      }
      var R = (0, s.Ps)(C(), d.qU, l.jy),
        k = function (t) {
          return { fill: t.baseColor.fill.light };
        },
        x = function (t) {
          return { fill: t.baseColor.border.light, cursor: "default" };
        },
        D = function () {
          var t = (0, E.Iq)();
          return u.createElement(A, { className: t(x) });
        };
      function w(t) {
        var n = t.post,
          e = t.withTooltip,
          r = void 0 === e || e,
          i = t.susiEntry,
          a = n.id,
          s = n.viewerEdge.readingList,
          b = (0, E.Iq)(),
          P = (0, _.v9)(function (t) {
            return t.config.authDomain;
          }),
          A = (0, g.Av)(),
          C = (0, v.pK)(),
          R = (0, p.XC)(),
          x = null == R ? void 0 : R.READING_LIST_UPDATED,
          w = u.useState(r),
          N = o()(w, 2),
          L = N[0],
          O = N[1],
          T = u.useState(s || I.sx.READING_LIST_NONE),
          U = o()(T, 2),
          $ = U[0],
          B = U[1];
        u.useEffect(
          function () {
            B(s || I.sx.READING_LIST_NONE);
          },
          [s]
        );
        var G = u.useCallback(
          function () {
            r && O(!0);
          },
          [r]
        );
        return u.createElement(c.I8, null, function (t) {
          return t
            ? s
              ? u.createElement(
                  "div",
                  { className: b(k) },
                  u.createElement(l.sN, { post: n }, function (t) {
                    return u.createElement(
                      m._,
                      {
                        isVisible: L,
                        targetDistance: 10,
                        tooltipText:
                          ((e = s),
                          {
                            READING_LIST_NONE: "Save story",
                            READING_LIST_ARCHIVE: "Archived",
                            READING_LIST_QUEUE: "Unsave Story",
                          }[e]),
                        onMouseLeave: G,
                      },
                      u.createElement(
                        f.rU,
                        {
                          onClick: function () {
                            return (function (t) {
                              if (s) {
                                var e =
                                  ((o = s),
                                  {
                                    READING_LIST_NONE: I.sx.READING_LIST_QUEUE,
                                    READING_LIST_ARCHIVE: null,
                                    READING_LIST_QUEUE: I.sx.READING_LIST_NONE,
                                  }[o]);
                                if (!e) return;
                                B(e),
                                  A.event(
                                    (function (t) {
                                      return {
                                        READING_LIST_NONE: "post.addedBookmark",
                                        READING_LIST_ARCHIVE:
                                          "post.addedArchive",
                                        READING_LIST_QUEUE:
                                          "post.removedBookmark",
                                      }[t];
                                    })(s),
                                    { postId: a, source: C }
                                  ),
                                  t(e)().catch(function () {
                                    B(s);
                                  }),
                                  r && O(!1),
                                  x && x(n, e);
                              }
                              var o;
                            })(t);
                          },
                          ariaLabel: "Bookmark Post",
                        },
                        (function (t) {
                          return {
                            READING_LIST_NONE: u.createElement(h.Z, null),
                            READING_LIST_ARCHIVE: u.createElement(D, null),
                            READING_LIST_QUEUE: u.createElement(y.Z, null),
                          }[t];
                        })($)
                      )
                    );
                    var e;
                  })
                )
              : null
            : u.createElement(
                m._,
                {
                  isVisible: L,
                  placement: "top",
                  targetDistance: 10,
                  tooltipText: "Bookmark story",
                },
                u.createElement(
                  d.R9,
                  {
                    post: n,
                    operation: "register",
                    actionUrl: (0, S.XET)(P, a),
                    susiEntry: i,
                  },
                  u.createElement(h.Z, { className: b(k) })
                )
              );
        });
      }
    },
    3021: (t, n, e) => {
      "use strict";
      e.d(n, { jy: () => y, sN: () => b });
      var r = e(63038),
        o = e.n(r),
        i = e(28655),
        a = e.n(i),
        s = e(71439),
        u = e(46829),
        l = e(14391);
      function c() {
        var t = a()([
          "\n  fragment WithSetReadingList_post on Post {\n    ...ReadingList_post\n  }\n  ",
          "\n",
        ]);
        return (
          (c = function () {
            return t;
          }),
          t
        );
      }
      function d() {
        var t = a()([
          "\n  mutation UnarchivePostDefault($targetPostId: ID!) {\n    unarchivePost(targetPostId: $targetPostId) {\n      ...ReadingList_post\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (d = function () {
            return t;
          }),
          t
        );
      }
      function p() {
        var t = a()([
          "\n  mutation ArchivePostDefault($targetPostId: ID!) {\n    archivePost(targetPostId: $targetPostId) {\n      ...ReadingList_post\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (p = function () {
            return t;
          }),
          t
        );
      }
      function f() {
        var t = a()([
          "\n  mutation UnbookmarkPostDefault($targetPostId: ID!) {\n    unbookmarkPost(targetPostId: $targetPostId) {\n      ...ReadingList_post\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (f = function () {
            return t;
          }),
          t
        );
      }
      function m() {
        var t = a()([
          "\n  mutation BookmarkPostDefault($targetPostId: ID!) {\n    bookmarkPost(targetPostId: $targetPostId) {\n      ...ReadingList_post\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (m = function () {
            return t;
          }),
          t
        );
      }
      function g() {
        var t = a()([
          "\n  fragment ReadingList_post on Post {\n    __typename\n    id\n    viewerEdge {\n      id\n      readingList\n    }\n  }\n",
        ]);
        return (
          (g = function () {
            return t;
          }),
          t
        );
      }
      var v = (0, s.Ps)(g()),
        E = (0, s.Ps)(m(), v),
        I = (0, s.Ps)(f(), v),
        _ = (0, s.Ps)(p(), v),
        h = (0, s.Ps)(d(), v),
        y = (0, s.Ps)(c(), v),
        b = function (t) {
          var n = t.children,
            e = t.post,
            r = e.id,
            i = (function (t) {
              var n = (0, u.useMutation)(E, {
                variables: { targetPostId: t },
                optimisticResponse: {
                  bookmarkPost: {
                    __typename: "Post",
                    id: t,
                    viewerEdge: {
                      id: "test-post-viewer-edge-id",
                      readingList: l.sx.READING_LIST_QUEUE,
                    },
                  },
                },
              });
              return o()(n, 1)[0];
            })(r),
            a = (function (t) {
              var n = (0, u.useMutation)(I, {
                variables: { targetPostId: t },
                optimisticResponse: {
                  unbookmarkPost: {
                    __typename: "Post",
                    id: t,
                    viewerEdge: {
                      id: "test-post-viewer-edge-id",
                      readingList: l.sx.READING_LIST_NONE,
                    },
                  },
                },
              });
              return o()(n, 1)[0];
            })(r),
            s = (function (t) {
              var n = (0, u.useMutation)(_, {
                variables: { targetPostId: t },
                optimisticResponse: {
                  archivePost: {
                    __typename: "Post",
                    id: t,
                    viewerEdge: {
                      id: "test-post-viewer-edge-id",
                      readingList: l.sx.READING_LIST_ARCHIVE,
                    },
                  },
                },
              });
              return o()(n, 1)[0];
            })(r),
            c = (function (t) {
              var n = (0, u.useMutation)(h, {
                variables: { targetPostId: t },
                optimisticResponse: {
                  unarchivePost: {
                    __typename: "Post",
                    id: t,
                    viewerEdge: {
                      id: "test-post-viewer-edge-id",
                      readingList: l.sx.READING_LIST_QUEUE,
                    },
                  },
                },
              });
              return o()(n, 1)[0];
            })(r);
          return r
            ? n(function (t) {
                return function () {
                  switch (e.viewerEdge.readingList) {
                    case l.sx.READING_LIST_NONE:
                      if ("READING_LIST_QUEUE" === t) return i();
                      break;
                    case l.sx.READING_LIST_QUEUE:
                      if ("READING_LIST_NONE" === t) return a();
                      if ("READING_LIST_ARCHIVE" === t) return s();
                      break;
                    case l.sx.READING_LIST_ARCHIVE:
                      if (!t) return r;
                      if ("READING_LIST_NONE" === t) return a();
                      if ("READING_LIST_QUEUE" === t) return c();
                  }
                  throw new Error(
                    'Invalid reading list change from "'
                      .concat(e.viewerEdge.readingList || "unkown", '" to "')
                      .concat(t, '".')
                  );
                };
              })
            : null;
        };
    },
    71245: (t, n, e) => {
      "use strict";
      e.d(n, { Lf: () => g, h3: () => v, yb: () => E });
      var r = e(63038),
        o = e.n(r),
        i = e(28655),
        a = e.n(i),
        s = e(71439),
        u = e(46829),
        l = e(67294),
        c = e(14391);
      function d() {
        var t = a()([
          "\n  mutation RejectPostFromPubMutation(\n    $postId: ID!\n    $collectionSlug: String!\n    $status: CollectionPostStatus!\n  ) {\n    manageCollectionPostStatus(postId: $postId, collectionSlug: $collectionSlug, status: $status) {\n      __typename\n      id\n      statusForCollection\n      collection {\n        id\n      }\n      pendingCollection {\n        id\n        slug\n      }\n    }\n  }\n",
        ]);
        return (
          (d = function () {
            return t;
          }),
          t
        );
      }
      function p() {
        var t = a()([
          "\n  mutation ManageCollectionPostStatusMutation(\n    $postId: ID!\n    $collectionSlug: String!\n    $status: CollectionPostStatus!\n  ) {\n    manageCollectionPostStatus(postId: $postId, collectionSlug: $collectionSlug, status: $status) {\n      __typename\n      id\n      statusForCollection\n      pendingCollection {\n        id\n        slug\n      }\n    }\n  }\n",
        ]);
        return (
          (p = function () {
            return t;
          }),
          t
        );
      }
      var f = (0, s.Ps)(p()),
        m = (0, s.Ps)(d()),
        g = function (t) {
          var n = (0, u.useMutation)(f),
            e = o()(n, 1)[0];
          return (0, l.useCallback)(
            function (n) {
              return e({
                variables: {
                  collectionSlug: (null == n ? void 0 : n.slug) || "",
                  postId: t.id,
                  status: c.Zj.PENDING,
                },
                optimisticResponse: {
                  manageCollectionPostStatus: {
                    __typename: "Post",
                    id: t.id,
                    statusForCollection: c.Zj.PENDING,
                    pendingCollection: n,
                  },
                },
              });
            },
            [t]
          );
        },
        v = function (t) {
          var n = (0, u.useMutation)(f),
            e = o()(n, 1)[0];
          return (0, l.useCallback)(
            function (n) {
              return e({
                variables: {
                  collectionSlug: (null == n ? void 0 : n.slug) || "",
                  postId: t.id,
                  status: c.Zj.APPROVED,
                },
              });
            },
            [t]
          );
        },
        E = function (t) {
          var n = (0, u.useMutation)(m),
            e = o()(n, 1)[0];
          return (0, l.useCallback)(
            function (n) {
              return e({
                variables: {
                  collectionSlug: (null == n ? void 0 : n.slug) || "",
                  postId: t.id,
                  status: c.Zj.REMOVED,
                },
                optimisticResponse: {
                  manageCollectionPostStatus: {
                    __typename: "Post",
                    id: t.id,
                    statusForCollection: null,
                    collection: null,
                    pendingCollection: null,
                  },
                },
              }).then(function (t) {
                if (t.errors && t.errors[0]) throw t.errors[0];
                return t;
              });
            },
            [t]
          );
        };
    },
    49925: (t, n, e) => {
      "use strict";
      e.d(n, {
        UL: () => s,
        GT: () => u,
        KW: () => l,
        Iq: () => c,
        C5: () => d,
      });
      var r = e(28655),
        o = e.n(r),
        i = e(71439);
      function a() {
        var t = o()([
          "\n  fragment auroraHooks_publisher on Publisher {\n    __typename\n    ... on Collection {\n      isAuroraEligible\n      isAuroraVisible\n      viewerEdge {\n        id\n        isEditor\n      }\n    }\n    ... on User {\n      isAuroraVisible\n    }\n  }\n",
        ]);
        return (
          (a = function () {
            return t;
          }),
          t
        );
      }
      var s = function (t) {
          return (
            !!t &&
            (t.isAuroraVisible ||
              ("Collection" === t.__typename &&
                t.isAuroraEligible &&
                t.viewerEdge.isEditor))
          );
        },
        u = function (t) {
          return !!t && t.isAuroraVisible;
        },
        l = function (t) {
          return !!t && t.isAuroraVisible;
        },
        c = function (t) {
          return (
            !!t &&
            ("Collection" === t.__typename
              ? t.isAuroraVisible ||
                (t.isAuroraEligible && t.viewerEdge.isEditor)
              : t.isAuroraVisible)
          );
        },
        d = (0, i.Ps)(a());
    },
    78820: (t, n, e) => {
      "use strict";
      e.d(n, {
        Zu: () => b,
        n_: () => h,
        xt: () => E,
        KQ: () => I,
        In: () => _,
        PB: () => y,
      });
      var r = e(63038),
        o = e.n(r),
        i = e(28655),
        a = e.n(i),
        s = e(46829),
        u = e(71439),
        l = e(67294);
      function c() {
        var t = a()([
          "\n  mutation postSetPinnedByCreatorAt($postId: ID!, $isPinned: Boolean!) {\n    postSetPinnedByCreatorAt(targetPostId: $postId, isPinned: $isPinned) {\n      __typename\n      ... on Post {\n        id\n        pinnedByCreatorAt\n      }\n    }\n  }\n",
        ]);
        return (
          (c = function () {
            return t;
          }),
          t
        );
      }
      function d() {
        var t = a()([
          "\n  mutation setPinnedAt($postId: ID!, $collectionId: ID!, $pinnedAt: Boolean!) {\n    __typename\n    setPinnedAt(targetPostId: $postId, targetCollectionId: $collectionId, pinnedAt: $pinnedAt) {\n      __typename\n      ... on Post {\n        id\n        collection {\n          id\n        }\n        pendingCollection {\n          id\n        }\n        pinnedAt\n      }\n    }\n  }\n",
        ]);
        return (
          (d = function () {
            return t;
          }),
          t
        );
      }
      var p = (0, u.Ps)(d()),
        f = (0, u.Ps)(c()),
        m = e(61250),
        g = e(27952);
      function v() {
        var t = a()([
          "\n  fragment useIsPinnedInContext_post on Post {\n    id\n    collection {\n      id\n    }\n    pendingCollection {\n      id\n    }\n    pinnedAt\n    pinnedByCreatorAt\n  }\n",
        ]);
        return (
          (v = function () {
            return t;
          }),
          t
        );
      }
      var E = (0, u.Ps)(v()),
        I = function (t) {
          var n = t.id,
            e = t.collection,
            r = t.pendingCollection,
            i = t.pinnedAt,
            a = (e || r || { id: "" }).id,
            u = (0, s.useMutation)(p, {
              optimisticResponse: {
                __typename: "Mutation",
                setPinnedAt: {
                  __typename: "Post",
                  id: n,
                  collection: e,
                  pendingCollection: r,
                  pinnedAt: i ? 0 : Date.now(),
                },
              },
            }),
            c = o()(u, 1)[0],
            d = l.useCallback(
              function () {
                return c({
                  variables: { postId: n, collectionId: a, pinnedAt: !i },
                });
              },
              [n, a, i, c]
            );
          return [i, d];
        },
        _ = function (t) {
          var n = t.id,
            e = t.pinnedByCreatorAt,
            r = (0, s.useMutation)(f, {
              optimisticResponse: {
                postSetPinnedByCreatorAt: {
                  __typename: "Post",
                  id: n,
                  pinnedByCreatorAt: e ? 0 : Date.now(),
                },
              },
            }),
            i = o()(r, 1)[0],
            a = l.useCallback(
              function () {
                return i({ variables: { postId: n, isPinned: !e } });
              },
              [n, i, e]
            );
          return [e, a];
        },
        h = function (t, n) {
          var e = I(t),
            r = o()(e, 2),
            i = r[0],
            a = r[1],
            s = _(t),
            u = o()(s, 2),
            c = u[0],
            d = u[1],
            p = l.useCallback(
              function () {
                return "Collection" === n ? a() : d();
              },
              [n, a, d]
            );
          return ["Collection" === n ? i : c, p];
        },
        y = function (t, n) {
          var e = "Collection" === t.__typename ? t.slug : null,
            r = (0, m.GE)(
              "ShowCollectionHome",
              e ? { collectionSlug: e } : { collectionSlug: "" }
            );
          return "Collection" === t.__typename
            ? r
            : "User" === t.__typename && t.username
            ? (0, g.AWr)(t, n)
            : "";
        },
        b = function (t) {
          switch (t.__typename) {
            case "Collection":
              return "Publication";
            case "User":
              return "Author";
            default:
              return "Publisher";
          }
        };
    },
    73232: (t, n, e) => {
      "use strict";
      e.d(n, { Q: () => r, t: () => o });
      var r =
          "This story is also a response to another story. Are you sure you want to delete this story?",
        o =
          "This story is also a response to another story. Any edits are applied to both.";
    },
    90639: (t, n, e) => {
      "use strict";
      e.d(n, { $: () => u });
      var r = e(63038),
        o = e.n(r),
        i = e(67294),
        a = e(85432),
        s = e(64504),
        u = function (t) {
          var n = t.isVisible,
            e = t.hide,
            r = t.onSubmit,
            u = t.isResponse,
            l = i.useState(!1),
            c = o()(l, 2),
            d = c[0],
            p = c[1],
            f = i.useState("Spam"),
            m = o()(f, 2),
            g = m[0],
            v = m[1],
            E = i.useCallback(function (t, n) {
              return v(n);
            }, []);
          return i.createElement(
            a.Vq,
            {
              isVisible: n,
              hide: e,
              noPortal: u,
              withCloseButton: !1,
              customBackgroundColor: u
                ? "rgba(255, 255, 255, 0.97)"
                : "rgba(255, 255, 255, 0.94)",
            },
            i.createElement(
              a.xu,
              {
                height: "550px",
                width: u ? "100%" : "900px",
                background: u ? "none" : "white",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: u ? "none" : "rgba(0, 0, 0, 0.15) 0px 2px 10px",
                padding: "18px",
                position: "relative",
                sm: { boxShadow: "none", background: "none" },
                xs: { boxShadow: "none", background: "none" },
              },
              i.createElement(
                a.xu,
                {
                  display: "flex",
                  margin: "auto",
                  flexDirection: "column",
                  alignItems: u ? "flex-start" : "center",
                },
                i.createElement(
                  s.X6,
                  { scale: "M" },
                  "Report ",
                  u ? "Response" : "Story"
                ),
                i.createElement(
                  a.xu,
                  {
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    paddingRight: "5px",
                    marginBottom: "30px",
                  },
                  i.createElement(
                    a.xu,
                    {
                      marginTop: "25px",
                      marginBottom: "30px",
                      padding: "5px 0",
                    },
                    i.createElement(a.Ee, {
                      onChange: E,
                      value: g,
                      radioStyle: "SUBTLE",
                      options: [
                        { name: "Spam", value: "Spam" },
                        { name: "Harassment", value: "Harassment" },
                        { name: "Rules Violation", value: "Other" },
                      ],
                    })
                  ),
                  i.createElement(
                    a.XZ,
                    {
                      checked: d,
                      onChange: function () {
                        p(!d);
                      },
                    },
                    i.createElement(
                      a.xu,
                      { paddingTop: u ? "16px" : "0" },
                      "Also block the author of this ",
                      u ? "response" : "story"
                    )
                  )
                ),
                i.createElement(
                  a.xu,
                  {
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  },
                  i.createElement(
                    a.xu,
                    { marginRight: "8px" },
                    i.createElement(a.zx, { onClick: e }, "Cancel")
                  ),
                  i.createElement(
                    a.zx,
                    {
                      buttonStyle: "ERROR",
                      onClick: function () {
                        r(d, g), e();
                      },
                    },
                    "Report"
                  )
                ),
                i.createElement(
                  a.xu,
                  { marginTop: "50px", textAlign: u ? "left" : "center" },
                  i.createElement(
                    s.F,
                    { scale: "M", tag: "div" },
                    "Report",
                    " ",
                    i.createElement(
                      a.rU,
                      {
                        href: "https://medium.com/policy/mediums-copyright-and-dmca-policy-d126f73695",
                        linkStyle: "OBVIOUS",
                        target: "_blank",
                        inline: !0,
                      },
                      "copyright infringement"
                    ),
                    " ",
                    "or",
                    " ",
                    i.createElement(
                      a.rU,
                      {
                        href: "https://medium.com/policy/mediums-trademark-policy-e3bb53df59a7",
                        linkStyle: "OBVIOUS",
                        target: "_blank",
                        inline: !0,
                      },
                      "trademark infringement"
                    ),
                    ". ",
                    !u && i.createElement("br", null),
                    "Read",
                    " ",
                    i.createElement(
                      a.rU,
                      {
                        href: "https://medium.com/policy/medium-rules-30e5502c4eb4",
                        linkStyle: "OBVIOUS",
                        target: "_blank",
                        inline: !0,
                      },
                      "our rules"
                    ),
                    "."
                  )
                )
              ),
              !u &&
                i.createElement(a.PZ, {
                  onClick: e,
                  size: "LARGE",
                  absoluteOffset: "18px",
                })
            )
          );
        };
    },
    267: (t, n, e) => {
      "use strict";
      e.d(n, { XC: () => l, EI: () => c });
      var r = e(59713),
        o = e.n(r),
        i = e(67294);
      function a(t, n) {
        var e = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(t, n).enumerable;
            })),
            e.push.apply(e, r);
        }
        return e;
      }
      function s(t) {
        for (var n = 1; n < arguments.length; n++) {
          var e = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? a(Object(e), !0).forEach(function (n) {
                o()(t, n, e[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e))
            : a(Object(e)).forEach(function (n) {
                Object.defineProperty(
                  t,
                  n,
                  Object.getOwnPropertyDescriptor(e, n)
                );
              });
        }
        return t;
      }
      var u = i.createContext({}),
        l = function () {
          return i.useContext(u);
        },
        c = function (t) {
          var n = t.context,
            e = t.extendContext,
            r = void 0 !== e && e,
            o = t.children,
            a = l();
          return (
            r && a && (n = s(s({}, a), n)),
            i.createElement(u.Provider, { value: n }, o)
          );
        };
    },
    39171: (t, n, e) => {
      "use strict";
      function r(t, n) {
        var e;
        if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
          if (
            Array.isArray(t) ||
            (e = (function (t, n) {
              if (t) {
                if ("string" == typeof t) return o(t, n);
                var e = Object.prototype.toString.call(t).slice(8, -1);
                return (
                  "Object" === e && t.constructor && (e = t.constructor.name),
                  "Map" === e || "Set" === e
                    ? Array.from(t)
                    : "Arguments" === e ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                    ? o(t, n)
                    : void 0
                );
              }
            })(t)) ||
            (n && t && "number" == typeof t.length)
          ) {
            e && (t = e);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var a,
          s = !0,
          u = !1;
        return {
          s: function () {
            e = t[Symbol.iterator]();
          },
          n: function () {
            var t = e.next();
            return (s = t.done), t;
          },
          e: function (t) {
            (u = !0), (a = t);
          },
          f: function () {
            try {
              s || null == e.return || e.return();
            } finally {
              if (u) throw a;
            }
          },
        };
      }
      function o(t, n) {
        (null == n || n > t.length) && (n = t.length);
        for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];
        return r;
      }
      e.d(n, { B: () => i });
      var i = function () {
        for (var t = arguments.length, n = new Array(t), e = 0; e < t; e++)
          n[e] = arguments[e];
        return function () {
          var t,
            e = r(n);
          try {
            for (e.s(); !(t = e.n()).done; ) (0, t.value)();
          } catch (t) {
            e.e(t);
          } finally {
            e.f();
          }
        };
      };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/2176.52f46ba6.chunk.js.map
