(self.webpackChunklite = self.webpackChunklite || []).push([
  [2955],
  {
    43915: (e, t, n) => {
      "use strict";
      n.d(t, { Z: () => a });
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
      var i = r.createElement("path", {
        d: "M19.07 21.12a6.33 6.33 0 0 1-3.53-1.1 7.8 7.8 0 0 1-.7-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.66 0 8.46 3.5 8.46 7.8 0 2.06-.85 3.99-2.4 5.45a6.28 6.28 0 0 0 1.14 2.59c.15.21.17.48.06.7a.69.69 0 0 1-.62.38h-.03zm0-1v.5l.03-.5h-.03zm-3.92-1.64l.21.2a6.09 6.09 0 0 0 3.24 1.54 7.14 7.14 0 0 1-.83-1.84 5.15 5.15 0 0 1-.16-.75 2.4 2.4 0 0 1-.02-.29v-.23l.18-.15a6.6 6.6 0 0 0 2.3-4.96c0-3.82-3.4-6.93-7.6-6.93-4.19 0-7.6 3.11-7.6 6.93 0 3.83 3.41 6.94 7.6 6.94.83 0 1.64-.12 2.41-.35l.28-.08z",
        fillRule: "evenodd",
      });
      const a = function (e) {
        return r.createElement("svg", o({ width: 25, height: 25 }, e), i);
      };
    },
    2955: (e, t, n) => {
      "use strict";
      n.d(t, { Xc: () => ke, Dn: () => Be, Dc: () => Oe });
      var r = n(28655),
        o = n.n(r),
        i = n(67154),
        a = n.n(i),
        l = n(59713),
        s = n.n(l),
        c = n(71439),
        u = n(67294),
        d = n(63038),
        p = n.n(d),
        m = n(93653),
        f = n(71245),
        v = n(78820),
        g = n(73232),
        h = n(32262),
        E = n(85432),
        x = n(64504),
        b = n(28309),
        P = n(14391),
        y = n(67297),
        C = n(93394),
        R = n(39171),
        T = n(51064),
        w = n(27952);
      function I() {
        var e = o()([
          "\n  fragment TruncatedPostCardEditorWriterButton_post on Post {\n    id\n    collection {\n      id\n      name\n      slug # Needed for rejectPostFromPub (not currently exposed as a reusable fragment)\n    }\n    responseDistribution\n    ...useIsPinnedInContext_post\n  }\n  ",
          "\n",
        ]);
        return (
          (I = function () {
            return e;
          }),
          e
        );
      }
      var k = function (e) {
          return {
            fill: e.baseColor.fill.normal,
            ":hover": { fill: e.baseColor.fill.darker },
            ":focus": { fill: e.baseColor.fill.darker },
          };
        },
        _ = function (e) {
          var t = e.post,
            n = e.publisherContext,
            r = e.isEditor,
            o = e.isWriter,
            i = (0, b.Iq)(),
            l = (0, y.v9)(function (e) {
              return e.config.authDomain;
            }),
            s = t.id,
            c = t.collection,
            d = t.responseDistribution,
            I = c || { id: "", name: "" },
            _ = I.id,
            O = I.name,
            M = (0, T.O)(!1),
            S = p()(M, 3),
            B = S[0],
            U = S[1],
            D = S[2],
            A = (0, v.n_)(t, n),
            j = p()(A, 2),
            L = j[0],
            F = j[1],
            N = u.useState(""),
            V = p()(N, 2),
            W = V[0],
            z = V[1],
            H = u.useCallback(
              function () {
                D(),
                  F().then(function (e) {
                    var t = e.errors;
                    t && t.length && t[0].message
                      ? z(t[0].message)
                      : window.location.reload();
                  });
              },
              [D, F, z]
            ),
            J = (0, f.yb)(t),
            K = (0, T.O)(!1),
            G = p()(K, 3),
            Z = G[0],
            q = G[1],
            Q = G[2],
            X = u.useCallback(
              function () {
                J(c).then(function () {
                  return window.location.reload();
                });
              },
              [_, J]
            ),
            $ = (0, m.j)(s),
            Y = p()($, 1)[0],
            ee = (0, T.O)(!1),
            te = p()(ee, 3),
            ne = te[0],
            re = te[1],
            oe = te[2],
            ie = u.useCallback(
              function () {
                Y().then(function () {
                  return window.location.reload();
                });
              },
              [Y]
            ),
            ae = d === P.Et.DISTRIBUTED,
            le = (0, T.O)(!1),
            se = p()(le, 3),
            ce = se[0],
            ue = se[1],
            de = se[2],
            pe = { buttonStyle: "ERROR", cancelText: "Cancel" },
            me = "truncatedPostCardEditorWriterMenu",
            fe = "Delete story".concat(ae ? " and response" : ""),
            ve = ae ? g.Q : "Are you sure you want to delete this story?";
          return u.createElement(
            u.Fragment,
            null,
            u.createElement(
              E.QH,
              a()({}, pe, {
                isVisible: Z,
                onConfirm: X,
                hide: Q,
                titleText: "Remove story",
                confirmText: "Remove",
                isDestructiveAction: !0,
              }),
              "Are you sure you want to remove this story from ",
              O,
              "?"
            ),
            u.createElement(
              E.QH,
              a()({}, pe, {
                isVisible: ne,
                onConfirm: ie,
                hide: oe,
                titleText: fe,
                confirmText: "Delete",
                isDestructiveAction: !0,
              }),
              ve
            ),
            u.createElement(
              E.QH,
              {
                buttonStyle: "STRONG",
                cancelText: "Cancel",
                isVisible: ce,
                onConfirm: function () {
                  var e = (0, w.d0A)(l, s);
                  window.location.replace(e);
                },
                hide: de,
                titleText: "Edit story and response",
                confirmText: "Continue",
                isDestructiveAction: !1,
              },
              g.t
            ),
            u.createElement(
              E.J2,
              {
                ariaId: me,
                hide: D,
                isVisible: B,
                popoverRenderFn: function () {
                  return u.createElement(
                    h.mX,
                    null,
                    (r || (o && "User" === n)) &&
                      u.createElement(
                        h.Sl,
                        null,
                        u.createElement(
                          E.rU,
                          { onClick: H },
                          L ? "Unpin" : "Pin",
                          " story"
                        )
                      ),
                    u.createElement(
                      h.Sl,
                      null,
                      ae
                        ? u.createElement(
                            E.rU,
                            { linkStyle: "SUBTLE", onClick: (0, R.B)(D, ue) },
                            "Edit story"
                          )
                        : u.createElement(
                            E.rU,
                            { linkStyle: "SUBTLE", href: (0, w.d0A)(l, s) },
                            "Edit story"
                          )
                    ),
                    u.createElement(h.oK, null),
                    u.createElement(
                      h.Sl,
                      null,
                      u.createElement(
                        E.rU,
                        { href: (0, w.KIb)(l, s) },
                        "Story settings"
                      )
                    ),
                    u.createElement(
                      h.Sl,
                      null,
                      u.createElement(
                        E.rU,
                        { href: (0, w.T0G)(l, s) },
                        "View stats"
                      )
                    ),
                    u.createElement(h.oK, null),
                    _ &&
                      u.createElement(
                        h.Sl,
                        null,
                        u.createElement(
                          E.rU,
                          { onClick: q },
                          "Remove story from publication"
                        )
                      ),
                    o &&
                      u.createElement(
                        h.Sl,
                        null,
                        u.createElement(
                          E.rU,
                          { onClick: (0, R.B)(D, re) },
                          "Delete story"
                        )
                      )
                  );
                },
              },
              u.createElement(
                E.rU,
                {
                  ariaControls: me,
                  ariaExpanded: B ? "true" : "false",
                  ariaLabel: "More options",
                  onClick: U,
                },
                u.createElement(C.Z, { className: i(k) })
              )
            ),
            u.createElement(
              E.FN,
              {
                isVisible: !!W,
                hide: function () {
                  return z("");
                },
                duration: 5e3,
              },
              u.createElement(x.F, { scale: "M" }, W)
            )
          );
        },
        O = (0, c.Ps)(I(), v.xt),
        M = n(28774),
        S = n(33241),
        B = n(885),
        U = n(97292),
        D = n(34675),
        A = n(32589),
        j = n(18970),
        L = n(90639);
      function F() {
        var e = o()([
          "\n  fragment TruncatedPostCardReaderButton_post on Post {\n    id\n    collection {\n      id\n    }\n    creator {\n      id\n    }\n  }\n",
        ]);
        return (
          (F = function () {
            return e;
          }),
          e
        );
      }
      var N = function (e) {
          return {
            fill: e.baseColor.fill.normal,
            ":hover": { fill: e.baseColor.fill.darker },
            ":focus": { fill: e.baseColor.fill.darker },
          };
        },
        V = function (e) {
          var t = e.post,
            n = e.viewer,
            r = (0, b.Iq)(),
            o = t.id,
            i = t.creator,
            a = t.collection,
            l = null == i ? void 0 : i.id,
            s = null == a ? void 0 : a.id,
            c = (0, T.O)(!1),
            d = p()(c, 3),
            m = d[0],
            f = d[1],
            v = d[2],
            g = (0, U.l)(l, s),
            x = g.muteAuthor,
            P = g.unmuteAuthor,
            y = "truncatedPostCardReaderMenu",
            w = (0, D.rZ)().viewerId,
            I = (0, A.P)(l).viewerEdge,
            k = !(null == I || !I.isBlocking),
            _ = !(null == I || !I.isMuting),
            O = (0, T.O)(!1),
            F = p()(O, 3),
            V = F[0],
            W = F[1],
            z = F[2],
            H = (0, T.O)(!1),
            J = p()(H, 3),
            K = J[0],
            G = J[1],
            Z = J[2];
          return s && l
            ? u.createElement(
                u.Fragment,
                null,
                u.createElement(
                  S.H,
                  {
                    targetAuthorId: l,
                    targetPostId: o,
                    isBlocking: k,
                    onOptimisticComplete: Z,
                    viewerId: w,
                  },
                  function (e) {
                    var t = e.mutate;
                    return u.createElement(L.$, {
                      onSubmit: t,
                      isVisible: K,
                      hide: Z,
                    });
                  }
                ),
                k
                  ? null
                  : u.createElement(
                      M.z,
                      { targetUserId: l, viewerId: n.id, onCompleted: z },
                      function (e) {
                        var t = e.mutate;
                        return u.createElement(j.r, {
                          onConfirm: t,
                          isVisible: V,
                          hide: z,
                        });
                      }
                    ),
                u.createElement(
                  E.J2,
                  {
                    ariaId: y,
                    hide: v,
                    isVisible: m,
                    popoverRenderFn: function () {
                      return u.createElement(
                        h.mX,
                        null,
                        u.createElement(
                          h.Sl,
                          null,
                          u.createElement(
                            E.rU,
                            { onClick: (0, R.B)(v, _ ? P : x) },
                            _ ? "Unmute" : "Mute",
                            " this author"
                          )
                        ),
                        u.createElement(
                          h.Sl,
                          null,
                          k
                            ? u.createElement(
                                B.E,
                                { targetUserId: l, viewerId: n.id },
                                function (e) {
                                  var t = e.mutate;
                                  return u.createElement(
                                    E.rU,
                                    { onClick: (0, R.B)(v, t) },
                                    "Unblock this author"
                                  );
                                }
                              )
                            : u.createElement(
                                E.rU,
                                { onClick: (0, R.B)(v, W) },
                                "Block this author"
                              )
                        ),
                        u.createElement(
                          h.Sl,
                          null,
                          u.createElement(
                            E.rU,
                            { onClick: (0, R.B)(v, G) },
                            "Report this story"
                          )
                        )
                      );
                    },
                  },
                  u.createElement(
                    E.rU,
                    {
                      ariaControls: y,
                      ariaExpanded: m ? "true" : "false",
                      ariaLabel: "More options",
                      onClick: f,
                    },
                    u.createElement(C.Z, { className: r(N) })
                  )
                )
              )
            : null;
        },
        W = (0, c.Ps)(F()),
        z = n(73891);
      function H() {
        var e = o()([
          "\n  fragment TruncatedPostCardOverflowButton_post on Post {\n    creator {\n      id\n    }\n    ...TruncatedPostCardEditorWriterButton_post\n    ...TruncatedPostCardReaderButton_post\n  }\n  ",
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
      var J = function (e) {
          var t,
            n,
            r = e.post,
            o = e.publisherContext,
            i = (0, D.Hk)().value,
            a = (0, z.g)(
              null === (t = r.collection) || void 0 === t ? void 0 : t.id
            ).viewerEdge,
            l = !(null == a || !a.isEditor),
            s =
              (null == i ? void 0 : i.id) ===
              (null === (n = r.creator) || void 0 === n ? void 0 : n.id);
          return i
            ? l || s
              ? u.createElement(_, {
                  post: r,
                  isEditor: l,
                  isWriter: s,
                  publisherContext: o,
                })
              : u.createElement(V, { post: r, viewer: i })
            : null;
        },
        K = (0, c.Ps)(H(), O, W),
        G = (n(50361), n(4743));
      function Z() {
        var e = o()([
          "\n  fragment NormalizeSequenceBodyModel_bodyModel on RichText {\n    ...GetFeaturedImageIndex_bodyModel\n    ...GetTitleIndexMap_bodyModel\n    sections {\n      name\n      startIndex\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (Z = function () {
            return e;
          }),
          e
        );
      }
      (0, c.Ps)(Z(), G.ke, G.k);
      var q = n(43198);
      function Q(e, t) {
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
      function X(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Q(Object(n), !0).forEach(function (t) {
                s()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Q(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var $ = function (e, t) {
          var n,
            r =
              null !== (n = (0, G.LI)(e).titleIndex) && void 0 !== n
                ? n
                : (0, q.s)(e, q.j);
          return e.map(function (e, n) {
            return e.type === P.NJ.IMG
              ? (function (e, t) {
                  return t ? X(X({}, e), {}, { href: t }) : e;
                })(e, t)
              : n === r
              ? (function (e, t) {
                  var n;
                  return t
                    ? X(
                        X({}, e),
                        {},
                        {
                          markups: [
                            {
                              anchorType: P.yG.LINK,
                              type: P.Jh.A,
                              start: 0,
                              end:
                                (null == e ||
                                null === (n = e.text) ||
                                void 0 === n
                                  ? void 0
                                  : n.length) || 0,
                              href: t,
                              userId: null,
                              linkMetadata: null,
                            },
                          ],
                        }
                      )
                    : e;
                })(e, t)
              : e;
          });
        },
        Y = n(78415),
        ee = n(72846),
        te = n(88065),
        ne = n(85828),
        re = n(99046),
        oe = n(93912),
        ie = n(50077),
        ae = n(33819),
        le = n(53976),
        se = n(27572),
        ce = n(72955);
      n(95760);
      var ue = u.createContext(null),
        de = function (e) {
          var t = e.event,
            n = e.children;
          return u.createElement(ue.Provider, { value: { event: t } }, n);
        },
        pe = n(96879),
        me = n(27390);
      function fe() {
        var e = o()([
          "\n  fragment TruncatedPostCard_post on Post {\n    id\n    creator {\n      ...TruncatedPostCard_user\n    }\n    collection {\n      ...CardByline_collection\n    }\n    extendedPreviewContent(\n      truncationConfig: {\n        previewParagraphsWordCountThreshold: 100\n        minimumWordLengthForTruncation: 150\n        truncateAtEndOfSentence: true\n        showFullImageCaptions: true\n        shortformPreviewParagraphsWordCountThreshold: 30\n        shortformMinimumWordLengthForTruncation: 30\n      }\n    ) {\n      bodyModel {\n        ...TruncatedPostCard_bodyModel\n      }\n      isFullContent\n    }\n    firstPublishedAt\n    isLocked\n    isShortform\n    latestPublishedAt\n    mediumUrl\n    postResponses {\n      count\n    }\n    previewContent {\n      subtitle\n    }\n    previewImage {\n      id\n      focusPercentX\n      focusPercentY\n    }\n    readingTime\n    title\n    visibility\n    inResponseToPostResult {\n      ...TruncatedPostCard_inResponseToPostPreview_postResult\n    }\n    ...CardByline_post\n    ...TruncatedPostCardOverflowButton_post\n    ...MultiVote_post\n    ...ResponsesIconButton_post\n    ...PostFooterSocialPopover_post\n    ...BookmarkButton_post\n    ...PostPresentationTracker_post\n    ...PostScrollTracker_post\n    ...TruncatedPostCard_inResponseToPostPreview_mediaResource\n  }\n  ",
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
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (fe = function () {
            return e;
          }),
          e
        );
      }
      function ve() {
        var e = o()([
          "\n  fragment TruncatedPostCard_inResponseToPostPreview_mediaResource on Post {\n    ...InResponseToPostPreview_mediaResource\n  }\n  ",
          "\n",
        ]);
        return (
          (ve = function () {
            return e;
          }),
          e
        );
      }
      function ge() {
        var e = o()([
          "\n  fragment TruncatedPostCard_inResponseToPostPreview_postResult on PostResult {\n    ...InResponseToPostPreview_postResult\n  }\n  ",
          "\n",
        ]);
        return (
          (ge = function () {
            return e;
          }),
          e
        );
      }
      function he() {
        var e = o()([
          "\n  fragment TruncatedPostCard_user on User {\n    __typename\n    name\n    username\n    ...CardByline_user\n  }\n  ",
          "\n",
        ]);
        return (
          (he = function () {
            return e;
          }),
          e
        );
      }
      function Ee() {
        var e = o()([
          "\n  fragment TruncatedPostCard_bodyModel on RichText {\n    ...PostBody_bodyModel\n  }\n  ",
          "\n",
        ]);
        return (
          (Ee = function () {
            return e;
          }),
          e
        );
      }
      function xe(e, t) {
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
      function be(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? xe(Object(n), !0).forEach(function (t) {
                s()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : xe(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var Pe = function (e) {
          return {
            border: 0,
            height: "1px",
            backgroundColor: e.baseColor.border.lighter,
            margin: 0,
          };
        },
        ye = {
          xs: { marginTop: "32px" },
          sm: { marginTop: "32px" },
          md: { marginTop: "40px" },
          lg: { marginTop: "40px" },
          xl: { marginTop: "40px" },
        },
        Ce = {
          xs: { marginTop: "30px", marginBottom: "30px" },
          sm: { marginTop: "30px", marginBottom: "30px" },
          md: { marginTop: "50px", marginBottom: "50px" },
          lg: { marginTop: "50px", marginBottom: "50px" },
          xl: { marginTop: "50px", marginBottom: "50px" },
        },
        Re = [P.NJ.H3, P.NJ.H4],
        Te = [P.NJ.IMG, P.NJ.IFRAME],
        we = function (e) {
          var t = e.isShortformMeteredWithMedia,
            n = e.onReadMore,
            r = e.showReadMore,
            o = e.post,
            i = e.publisher,
            a = (0, le.V)({ name: "enable_inline_expansion", placeholder: !1 });
          if (!r) return null;
          var l = o.mediumUrl,
            s = o.readingTime;
          if (!l) return null;
          var c = "".concat((0, me.Vd)(s || 0), " min read"),
            d =
              "Collection" !== i.__typename && o.collection && !a
                ? "Read more in ".concat(o.collection.name)
                : "Read more",
            p = (0, pe.Rk)(l, { readmore: "1" });
          return u.createElement(
            E.xu,
            { marginTop: t ? "24px" : "34px" },
            u.createElement(
              E.rU,
              { href: p, onClick: n },
              u.createElement(
                x.F,
                { color: "ACCENT", scale: "M" },
                d,
                " ",
                c ? " · ".concat(c) : ""
              )
            )
          );
        },
        Ie = u.forwardRef(function (e, t) {
          var n,
            r = e.cardByline,
            o = e.onReadMore,
            i = e.postLink,
            a = e.markedUpBodyModel,
            l = (0, b.Iq)(),
            c = a.paragraphs[0],
            d = a.paragraphs[1],
            p = { insertType: "BYLINE", order: "before", component: r },
            m = {
              insertType: "MEDIA_OVERLAY",
              order: "after",
              component: u.createElement(
                E.rU,
                { href: i, onClick: o },
                u.createElement("div", {
                  className: l(function (e) {
                    return {
                      position: "absolute",
                      top: 0,
                      backgroundColor: e.backgroundColor,
                      height: "100%",
                      width: "100%",
                      opacity: "80%",
                      zIndex: "1",
                    };
                  }),
                })
              ),
            },
            f =
              null != d && d.name && null != c && c.name
                ? ((n = {}), s()(n, d.name, [p]), s()(n, c.name, [m]), n)
                : {};
          return u.createElement(ee.yO, {
            ref: t,
            bodyModel: a,
            postBodyInserts: f,
            isAuroraPostPageEnabled: !0,
            richTextStyle: "SHORTFORM_CARD",
          });
        }),
        ke = function (e) {
          var t,
            n,
            r,
            o = e.excludeMargin,
            i = void 0 !== o && o,
            l = e.includeTopDivider,
            s = void 0 === l || l,
            c = e.includeBottomDivider,
            d = void 0 !== c && c,
            p = e.isFirst,
            m = void 0 !== p && p,
            f = e.publisher,
            v = e.post,
            g = e.hideAuthor,
            h = void 0 !== g && g,
            x = e.index,
            P = e.maxWidthSize,
            y = void 0 === P ? "inset" : P,
            C = e.showInResponseToPostPreview,
            R = void 0 !== C && C,
            T = e.mayShowPinned,
            w = void 0 !== T && T,
            I = e.onReadMore,
            k = e.customPostBody,
            _ = e.showReadMore,
            O = void 0 === _ || _,
            M = (0, b.Iq)(),
            S = u.useRef(null);
          (0, ce.Vj)(S, v);
          var B,
            U =
              (null == v || null === (t = v.postResponses) || void 0 === t
                ? void 0
                : t.count) || 0,
            D = v.id,
            A = v.clapCount,
            j = v.collection,
            L = v.extendedPreviewContent,
            F = v.isLocked,
            N = v.firstPublishedAt,
            V = v.latestPublishedAt,
            W = v.mediumUrl,
            z = v.pinnedAt,
            H = v.pinnedByCreatorAt,
            K = v.visibility,
            G = v.inResponseToPostResult,
            Z = v.inResponseToMediaResource,
            q = (0, se.Lk)(),
            Q = (0, se.f0)(be(be({}, q), {}, { index: x }));
          W && q && (B = (0, pe.Rk)(W, { source: Q }));
          var X =
            null == v || null === (n = v.extendedPreviewContent) || void 0 === n
              ? void 0
              : n.bodyModel;
          if (!X) return null;
          var le = be(be({}, X), {}, { paragraphs: $(X.paragraphs, B || W) }),
            ue = !!z && !!V,
            me = ue ? V : N,
            fe = ue ? "Updated " : "",
            ve = !(
              null == v ||
              null === (r = v.extendedPreviewContent) ||
              void 0 === r ||
              !r.isFullContent
            ),
            ge = !ve,
            he = s && !m && u.createElement("hr", { className: M(Pe) }),
            Ee = d && u.createElement("hr", { className: M(Pe) }),
            xe = m ? ye : Ce,
            ke = {
              postId: D,
              collectionId: null == j ? void 0 : j.id,
              isFullPost: null == L ? void 0 : L.isFullContent,
              postVisibility: (0, oe.z)(K),
              context: 2,
              pinned: Boolean(z),
            },
            _e =
              "User" === (null == f ? void 0 : f.__typename) && v.collection
                ? v.collection
                : v.creator,
            Oe = "User" === (null == f ? void 0 : f.__typename) ? H : z,
            Me = u.createElement(
              u.Fragment,
              null,
              _e &&
                u.createElement(ie.u_, {
                  publisher: _e,
                  hideAuthor: h,
                  href: W || void 0,
                  isOneLine: !0,
                  datePrefix: fe,
                  publishedAt: me,
                  showStar: !!F,
                  showPinned: w && !!Oe,
                  post: v,
                }),
              R &&
                u.createElement(Y.CV, {
                  inResponseToPostResult: G,
                  inResponseToMediaResource: Z,
                  padding: "42px 0 0",
                })
            ),
            Se =
              le.paragraphs[0] &&
              Te.includes(le.paragraphs[0].type) &&
              le.paragraphs[0].name,
            Be =
              le.paragraphs[1] &&
              Re.includes(le.paragraphs[1].type) &&
              le.paragraphs[1].name,
            Ue = f || v.creator,
            De =
              F &&
              (2 === le.paragraphs.length || 3 === le.paragraphs.length) &&
              1 === X.sections.length &&
              Be &&
              Se;
          return u.createElement(
            se.cW,
            { source: { index: x }, extendSource: !0 },
            u.createElement(
              E.xu,
              a()(
                {
                  boxSizing: "content-box",
                  marginLeft: "auto",
                  marginRight: "auto",
                },
                i ? {} : xe
              ),
              u.createElement(
                se.cW,
                { source: { index: x }, extendSource: !0 },
                u.createElement(
                  E.Pm,
                  { size: i ? "full" : y },
                  he,
                  u.createElement(
                    ce.ot,
                    {
                      post: v,
                      presentationContext: "POST_PREVIEW",
                      isDisplayingFullPost: !ge,
                      suppressedEvents: ve ? "VIEWED" : void 0,
                      reportClientViewedOnFullPost: !0,
                      postClientViewedContext: 2,
                      pinned: !!z,
                    },
                    u.createElement(
                      E.xu,
                      {
                        sm: { marginTop: he ? (De ? "48px" : "24px") : void 0 },
                        marginTop: he ? (De ? "72px" : "24px") : void 0,
                      },
                      _e && !De && Me,
                      u.createElement(
                        E.xu,
                        { marginTop: De ? "" : "12px", ref: S },
                        u.createElement(
                          de,
                          {
                            event: {
                              eventName: "post.permalinkClicked",
                              data: be(
                                be({}, ke),
                                {},
                                { interfaceElement: "title" }
                              ),
                            },
                          },
                          De
                            ? u.createElement(Ie, {
                                cardByline: Me,
                                markedUpBodyModel: le,
                                onReadMore: I,
                                postLink: B || W,
                              })
                            : u.createElement(
                                u.Fragment,
                                null,
                                k
                                  ? u.createElement(u.Fragment, null, k)
                                  : u.createElement(ee.yO, {
                                      bodyModel: le,
                                      isAuroraPostPageEnabled: !0,
                                      richTextStyle: "CARD",
                                    })
                              )
                        )
                      )
                    ),
                    ge &&
                      W &&
                      Ue &&
                      u.createElement(we, {
                        isShortformMeteredWithMedia: !!De,
                        onReadMore: I,
                        post: v,
                        publisher: Ue,
                        showReadMore: O,
                      }),
                    v &&
                      u.createElement(
                        E.xu,
                        {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: De ? "32px" : "36px",
                        },
                        u.createElement(
                          E.xu,
                          { display: "flex", alignItems: "center" },
                          u.createElement(re.S, {
                            post: v,
                            buttonStyle: "SUBTLE",
                            susiEntry: "clap_preview",
                            hasDialog: !0,
                            shouldHideClapsText: !0,
                          }),
                          u.createElement(
                            E.xu,
                            {
                              display: "flex",
                              alignItems: "center",
                              xl: { marginLeft: A ? "24px" : "12px" },
                              lg: { marginLeft: A ? "24px" : "12px" },
                              md: { marginLeft: A ? "16px" : "8px" },
                              sm: { marginLeft: A ? "16px" : "8px" },
                              xs: { marginLeft: A ? "16px" : "8px" },
                              paddingTop: "3px",
                            },
                            u.createElement(
                              E.rU,
                              { href: W + "?responsesOpen=true" },
                              u.createElement(ae.h, {
                                location: "preview",
                                postId: v.id,
                                responsesCount: U,
                                showResponsesSidebar: function () {},
                                allowResponses: v.allowResponses,
                                isLimitedState: v.isLimitedState,
                                responsesCountColor: "DARKER",
                              })
                            )
                          )
                        ),
                        u.createElement(
                          E.xu,
                          {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          },
                          u.createElement(
                            E.xu,
                            { marginRight: "8px" },
                            u.createElement(ne.$, {
                              post: v,
                              source: { name: "collection_home" },
                            })
                          ),
                          u.createElement(
                            E.xu,
                            { marginRight: "8px" },
                            u.createElement(te.e, {
                              post: v,
                              susiEntry: "bookmark_preview",
                            })
                          ),
                          (null == f ? void 0 : f.__typename) &&
                            u.createElement(
                              E.xu,
                              { marginRight: "-4px" },
                              u.createElement(J, {
                                post: v,
                                publisherContext: f.__typename,
                              })
                            )
                        )
                      )
                  )
                )
              )
            ),
            d && u.createElement(E.Pm, { size: i ? "full" : y }, Ee)
          );
        },
        _e = (0, c.Ps)(Ee(), ee.Pk),
        Oe = (0, c.Ps)(he(), ie.br),
        Me = (0, c.Ps)(ge(), Y.zJ),
        Se = (0, c.Ps)(ve(), Y.KI),
        Be = (0, c.Ps)(
          fe(),
          ie.yu,
          _e,
          Oe,
          K,
          re.x,
          ae.K,
          ne.u,
          te.z,
          ce.h_,
          ce.kH,
          ie.We,
          Me,
          Se
        );
    },
    93653: (e, t, n) => {
      "use strict";
      n.d(t, { j: () => c });
      var r = n(28655),
        o = n.n(r),
        i = n(71439),
        a = n(46829);
      function l() {
        var e = o()([
          "\n  mutation DeletePostMutation($targetPostId: ID!) {\n    deletePost(targetPostId: $targetPostId)\n  }\n",
        ]);
        return (
          (l = function () {
            return e;
          }),
          e
        );
      }
      var s = (0, i.Ps)(l()),
        c = function (e) {
          var t = e ? { variables: { targetPostId: e } } : {};
          return (0, a.useMutation)(s, t);
        };
    },
    33819: (e, t, n) => {
      "use strict";
      n.d(t, { h: () => v, K: () => g });
      var r = n(28655),
        o = n.n(r),
        i = n(71439),
        a = n(67294),
        l = n(85432),
        s = n(33914),
        c = n(64504),
        u = n(27599),
        d = n(27572),
        p = n(28309),
        m = n(43915);
      function f() {
        var e = o()([
          "\n  fragment ResponsesIconButton_post on Post {\n    allowResponses\n    postResponses {\n      count\n    }\n  }\n",
        ]);
        return (
          (f = function () {
            return e;
          }),
          e
        );
      }
      var v = function (e) {
          var t = e.allowResponses,
            n = e.responsesCount,
            r = e.location,
            o = e.showResponsesSidebar,
            i = e.postId,
            f = e.isLimitedState,
            v = e.shouldHideResponsesCount,
            g = void 0 !== v && v,
            h = e.responsesCountColor,
            E = void 0 === h ? "LIGHTER" : h,
            x = (0, p.Iq)(),
            b = (0, u.Av)(),
            P = (0, d.pK)();
          if (!t) return null;
          var y = "sidebar" === r,
            C = "preview" === r,
            R = "footer" === r,
            T = !g && !!n,
            w = function (e) {
              return {
                fill: e.baseColor.fill.normal,
                opacity: f ? 0.4 : 1,
                cursor: f ? "not-allowed" : "pointer",
                ":hover": { fill: f ? void 0 : e.baseColor.fill.lighter },
              };
            },
            I = function () {
              return a.createElement(
                a.Fragment,
                null,
                a.createElement(
                  l.xu,
                  {
                    sm: { marginLeft: "-4px" },
                    marginLeft: "-1px",
                    tag: "span",
                  },
                  a.createElement(m.Z, {
                    className: x(w),
                    "aria-label": "responses",
                  })
                )
              );
            },
            k = R
              ? a.createElement(I, null)
              : a.createElement(m.Z, {
                  className: x(w),
                  "aria-label": "responses",
                }),
            _ = a.createElement(
              s._,
              {
                tooltipText: "This feature is temporarily disabled.",
                targetDistance: 15,
              },
              R
                ? a.createElement(I, null)
                : a.createElement(m.Z, {
                    className: x(w),
                    "aria-label": "responses",
                  })
            ),
            O = {
              paddingLeft: y ? "6px" : "7px",
              top: y ? void 0 : C ? "1px" : "3px",
            },
            M = { paddingLeft: y ? "6px" : "3px", top: C ? "-1px" : "3px" };
          return a.createElement(
            "button",
            {
              onClick: f
                ? void 0
                : function () {
                    o(),
                      b.event("responses.viewAllClicked", {
                        postId: i,
                        source: P,
                      });
                  },
              className: x({ cursor: "pointer", border: 0, padding: 0 }),
            },
            a.createElement(
              l.xu,
              {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingRight: !g && n ? "9px" : "4px",
              },
              f ? _ : k,
              a.createElement(
                l.xu,
                { position: "relative", xs: M, sm: M, md: M, lg: O, xl: O },
                T && a.createElement(c.F, { scale: "M", color: E }, n, " ")
              )
            )
          );
        },
        g = (0, i.Ps)(f());
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/2955.54cefaa6.chunk.js.map
