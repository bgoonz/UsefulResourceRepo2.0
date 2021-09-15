(self.webpackChunklite = self.webpackChunklite || []).push([
  [8873],
  {
    5399: (e, n, t) => {
      "use strict";
      t.d(n, { I: () => i });
      var r = t(28655),
        o = t.n(r);
      function s() {
        var e = o()([
          "\n  fragment getSlateBodyFromPostBodyModel_bodyModel on RichText {\n    paragraphs {\n      id\n      name\n      text\n      type\n      markups {\n        type\n        start\n        end\n        href\n        anchorType\n        userId\n        linkMetadata {\n          httpStatus\n        }\n      }\n    }\n  }\n",
        ]);
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      var i = (0, t(71439).Ps)(s());
    },
    51176: (e, n, t) => {
      "use strict";
      t.d(n, { Q: () => r });
      var r = t(67294).createContext({
        isEditing: !1,
        setIsEditing: function () {
          return null;
        },
        setEditingQuote: function () {
          return null;
        },
      });
    },
    3714: (e, n, t) => {
      "use strict";
      t.d(n, { E: () => te });
      var r = t(63038),
        o = t.n(r),
        s = t(67294),
        i = t(24548),
        a = t(28309),
        l = function (e) {
          var n = e.title,
            t = e.backgroundColor,
            r = (0, a.Iq)();
          return s.createElement(
            "div",
            {
              className: r(function () {
                return {
                  color: "white",
                  backgroundColor: t,
                  borderRadius: "2px",
                  fontSize: "11px",
                  padding: "0px 6px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "8px",
                  marginTop: "2px",
                };
              }),
            },
            n
          );
        },
        u = t(85740),
        c = t(34675),
        p = t(98281),
        d = t(41832),
        m = t(85432),
        f = t(64504),
        g = t(27572),
        v = t(67297),
        y = t(93394),
        P = t(27952),
        b = t(28033),
        h = t(59713),
        E = t.n(h),
        R = t(28655),
        O = t.n(R),
        x = t(46829),
        S = t(71439),
        I = t(12291),
        D = t(14267),
        C = t(43522),
        w = t(54260),
        _ = t(98829),
        T = t(32262),
        k = t(27599),
        j = t(85277),
        M = function (e) {
          var n = e.isDialogOpen,
            t = e.dialogHeading,
            r = e.dialogDescription,
            o = e.cancelDialogAction,
            i = e.confirmDialogAction,
            a = e.confirmDialogButtonText,
            l = e.confirmButtonStyle,
            u = void 0 === l ? "STRONG" : l,
            c = e.hide,
            p = void 0 === c ? function () {} : c,
            d = s.useContext(D.D).sidebarRef,
            g = function (e) {
              var n;
              null != d &&
                null !== (n = d.current) &&
                void 0 !== n &&
                n.style &&
                (d.current.style.overflowY = e ? "hidden" : "");
            };
          return (
            s.useEffect(
              function () {
                return (
                  g(n),
                  function () {
                    g(!1);
                  }
                );
              },
              [n]
            ),
            s.createElement(
              m.Vq,
              {
                isVisible: n,
                hide: p,
                withCloseButton: !1,
                noPortal: !0,
                padding: 50,
              },
              s.createElement(
                m.xu,
                {
                  display: "flex",
                  margin: "auto",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                },
                s.createElement(f.X6, { scale: "M" }, t),
                s.createElement(
                  m.xu,
                  {
                    display: "flex",
                    width: "100%",
                    paddingRight: "5px",
                    marginTop: "10px",
                    marginBottom: "40px",
                    textAlign: "center",
                  },
                  s.createElement(f.F, { scale: "M", color: "DARKER" }, r)
                ),
                s.createElement(
                  m.xu,
                  { display: "flex", marginBottom: "20px" },
                  s.createElement(
                    m.rU,
                    { onClick: o },
                    s.createElement(
                      f.F,
                      { scale: "M", color: "DARKER" },
                      "Cancel"
                    )
                  ),
                  s.createElement(
                    m.xu,
                    { marginLeft: "25px" },
                    s.createElement(
                      m.zx,
                      {
                        buttonStyle: u,
                        onClick: i,
                        "data-test-id": "close-discussion-button",
                      },
                      a
                    )
                  )
                )
              )
            )
          );
        },
        A = t(14391),
        U = function (e) {
          var n = e.isDialogOpen,
            t = e.cancelDialogAction,
            r = e.confirmDialogAction,
            o = e.responseDistribution,
            i = e.hide,
            a = o === A.Et.DISTRIBUTED,
            l = a ? "Delete response and story" : "Delete",
            u = a
              ? "This response is also a story on your profile. Are you sure you want to delete this response?"
              : s.createElement(
                  "div",
                  null,
                  "Deleted responses are gone forever.",
                  s.createElement("br", null),
                  "Are you sure?"
                );
          return s.createElement(M, {
            isDialogOpen: n,
            dialogHeading: l,
            dialogDescription: u,
            cancelDialogAction: t,
            confirmDialogAction: r,
            confirmDialogButtonText: "Delete Response",
            confirmButtonStyle: "ERROR",
            hide: i,
          });
        };
      function B(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            t.push.apply(t, r);
        }
        return t;
      }
      function F(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? B(Object(t), !0).forEach(function (n) {
                E()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : B(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      function N() {
        var e = O()([
          "\n  mutation DeleteResponseMutation($responseId: ID!) {\n    deletePost(targetPostId: $responseId)\n  }\n",
        ]);
        return (
          (N = function () {
            return e;
          }),
          e
        );
      }
      var H = (0, S.Ps)(N()),
        L = function (e) {
          var n,
            t,
            r = e.response,
            i = e.hidePopoverMenu,
            a = s.useState(!1),
            l = o()(a, 2),
            u = l[0],
            p = l[1],
            d = (0, k.Av)(),
            f = (0, g.pK)(),
            v = (0, I.I0)(),
            y = (0, c.Hk)().value,
            P = s.useContext(w.H).inResponseToPostId,
            b = s.useContext(D.D),
            h = b.responseSortType,
            E = b.sidebarRef,
            R = (0, x.useMutation)(H, {
              variables: { responseId: r.id },
              update: function (e) {
                var n,
                  t = e.readFragment({
                    id: "Post:".concat(P),
                    fragment: C.K,
                    fragmentName:
                      "SimpleResponse_threadedSimpleResponse_defaultPostResponses",
                    variables: { sortType: h },
                  });
                null !== (n = (0, _.Z)(t, r.id)) &&
                  (e.writeFragment({
                    id: "Post:".concat(P),
                    fragment: C.K,
                    fragmentName:
                      "SimpleResponse_threadedSimpleResponse_defaultPostResponses",
                    data: F({}, n),
                    variables: { sortType: h },
                  }),
                  d.event("responses.removed", { postId: r.id, source: f }),
                  v((0, j.Dx)({ message: "Successfully deleted response." })),
                  i());
              },
            }),
            O = o()(R, 1)[0];
          return null != y &&
            y.id &&
            (null == y ? void 0 : y.id) ===
              (null === (n = r.creator) || void 0 === n ? void 0 : n.id)
            ? (null != E && E.current && (t = E.current.scrollTop),
              s.createElement(
                s.Fragment,
                null,
                s.createElement(
                  T.Sl,
                  null,
                  s.createElement(
                    m.rU,
                    {
                      onClick: function () {
                        return p(!0);
                      },
                    },
                    "Delete"
                  )
                ),
                u &&
                  s.createElement(U, {
                    isDialogOpen: u,
                    cancelDialogAction: function () {
                      p(!1),
                        null != E && E.current && (E.current.scrollTop = t);
                    },
                    confirmDialogAction: O,
                    responseDistribution: r.responseDistribution,
                    hide: function () {
                      return p(!1);
                    },
                  })
              ))
            : null;
        },
        $ = t(51176),
        Q = function (e) {
          var n = e.isDialogOpen,
            t = e.cancelDialogAction,
            r = e.confirmDialogAction;
          return s.createElement(M, {
            isDialogOpen: n,
            dialogHeading: "Edit response and story",
            dialogDescription:
              "This response is also a story on your profile. Any edits are applied to both.",
            cancelDialogAction: t,
            confirmDialogAction: r,
            confirmDialogButtonText: "Continue",
            confirmButtonStyle: "STRONG",
          });
        },
        K = function (e) {
          var n,
            t,
            r = e.response,
            i = (0, c.Hk)().value,
            a = s.useState(!1),
            l = o()(a, 2),
            u = l[0],
            p = l[1],
            d = s.useContext($.Q),
            f = d.setIsEditing,
            g = d.isEditing,
            v = d.setEditingQuote,
            y =
              (null === (n = r.creator) || void 0 === n ? void 0 : n.id) ===
              (null == i ? void 0 : i.id),
            P = s.useContext(D.D).sidebarRef;
          if ((null != P && P.current && (t = P.current.scrollTop), !y))
            return null;
          var b = r.responseDistribution === A.Et.DISTRIBUTED;
          return s.createElement(
            s.Fragment,
            null,
            s.createElement(
              T.Sl,
              null,
              s.createElement(
                m.rU,
                {
                  onClick: function () {
                    b
                      ? p(!0)
                      : (r.inResponseToMediaResource &&
                          v(r.inResponseToMediaResource.mediumQuote),
                        f(!g));
                  },
                },
                "Edit this response"
              )
            ),
            u &&
              s.createElement(Q, {
                isDialogOpen: u,
                cancelDialogAction: function () {
                  p(!1), null != P && P.current && (P.current.scrollTop = t);
                },
                confirmDialogAction: function () {
                  p(!1),
                    null != P && P.current && (P.current.scrollTop = t),
                    r.inResponseToMediaResource &&
                      v(r.inResponseToMediaResource.mediumQuote),
                    f(!g);
                },
              })
          );
        },
        q = t(47894),
        J = t(56975),
        V = t(965),
        Z = t(65347),
        W = t(55573),
        Y = function (e) {
          var n = e.response,
            t = e.hidePopoverMenu,
            r = (0, V.CP)(),
            o = (0, k.Av)(),
            i = (0, c.Hk)().value,
            a = (0, g.pK)(),
            l = (0, v.b$)(function (e) {
              return e.multiVote.clapsPerPost;
            }),
            u = (0, I.I0)(),
            p = s.useCallback(
              function (e) {
                return u((0, Z.at)(e));
              },
              [u]
            ),
            d = (0, W.l)(l, n),
            f = d.clapCount,
            y = d.viewerClapCount;
          return null != i && i.id && 0 !== f && 0 !== y
            ? s.createElement(
                T.Sl,
                null,
                s.createElement(
                  m.rU,
                  {
                    onClick: function () {
                      r(n, (null == i ? void 0 : i.id) || "", -y),
                        p({
                          postId: n.id,
                          clapCount: f - y,
                          viewerClapCount: 0,
                          viewerHasClappedSinceFetch: !0,
                        }),
                        o.event("post.clientUnvote", {
                          postId: n.id,
                          postIds: [n.id],
                          unvoteCount: y,
                          source: a,
                        }),
                        t();
                    },
                  },
                  "Undo applause for this response"
                )
              )
            : null;
        },
        z = t(26912),
        G = t(6688),
        X = {
          position: "absolute !important",
          top: "-16px",
          right: "0",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "4px",
          zIndex: "1000",
          backgroundColor: "rgba(255, 255, 255, 1)",
          minWidth: "150px",
        },
        ee = function (e) {
          var n = e.response,
            t = e.responseType,
            r = e.parentPost,
            o = e.isPopoverMenuVisible,
            i = e.hidePopoverMenu,
            a = (0, G.I)(),
            l = n.creator,
            u = s.useRef(null);
          return (
            s.useEffect(
              function () {
                var e = function (e) {
                  var n;
                  (null != u &&
                    null !== (n = u.current) &&
                    void 0 !== n &&
                    n.contains(e.target)) ||
                    i();
                };
                if (o)
                  return (
                    document.addEventListener("click", e),
                    function () {
                      document.removeEventListener("click", e);
                    }
                  );
              },
              [o]
            ),
            n && l
              ? s.createElement(
                  "div",
                  { className: a(X), ref: u },
                  s.createElement(
                    T.mX,
                    null,
                    s.createElement(J.Q, {
                      response: n,
                      parentPost: r,
                      hidePopoverMenu: i,
                    }),
                    s.createElement(q.n, {
                      responseToBeHidden: n,
                      parentPost: r,
                      hidePopoverMenu: i,
                    }),
                    s.createElement(b.RZ, {
                      response: n,
                      parentPost: r,
                      hidePopoverMenu: i,
                    }),
                    t === z.Q.SIMPLE &&
                      s.createElement(Y, { response: n, hidePopoverMenu: i }),
                    t === z.Q.SIMPLE && s.createElement(K, { response: n }),
                    s.createElement(L, { response: n, hidePopoverMenu: i })
                  )
                )
              : null
          );
        },
        ne = function (e) {
          return {
            cursor: "pointer",
            border: 0,
            fill: e.baseColor.fill.light,
            ":hover": { fill: e.baseColor.fill.dark },
            ":focus": { outline: "none" },
          };
        },
        te = function (e) {
          var n,
            t = e.response,
            r = e.responseType,
            b = e.parentPost,
            h = (0, c.Hk)().value,
            E = (0, a.Iq)(),
            R = (0, a.Fg)(),
            O = t.creator,
            x = t.mediumUrl,
            S = t.createdAt,
            I = s.useState(!1),
            D = o()(I, 2),
            C = D[0],
            w = D[1],
            _ = (0, v.v9)(function (e) {
              return e.config.authDomain;
            });
          if (!t || !O || !x) return null;
          var T =
              (null === (n = b.creator) || void 0 === n ? void 0 : n.id) ===
              O.id,
            k = (null == h ? void 0 : h.id) === O.id,
            j =
              (function (e, n) {
                return e && n === z.Q.SIMPLE;
              })(t, r) &&
              (null == t ? void 0 : t.firstPublishedAt) !==
                (null == t ? void 0 : t.latestPublishedAt),
            M = s.createElement(
              m.rU,
              { href: (0, P.AWr)(O, _) },
              s.createElement(f.F, { scale: "M", color: "DARKER" }, O.name)
            );
          return s.createElement(
            s.Fragment,
            null,
            s.createElement(
              m.xu,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              },
              s.createElement(
                m.xu,
                { display: "flex", flexDirection: "row", alignItems: "center" },
                s.createElement(p.Yt, { scale: "XS", user: O }),
                s.createElement(
                  m.xu,
                  { paddingLeft: "12px" },
                  s.createElement(
                    m.xu,
                    { display: "flex", flexDirection: "row" },
                    s.createElement(
                      u.bZ,
                      {
                        name: "enable_author_cards_byline",
                        placeholder: function () {
                          return M;
                        },
                      },
                      function (e) {
                        return e
                          ? s.createElement(
                              m.$W,
                              {
                                placement: "top",
                                targetDistance: 15,
                                mouseLeaveDelay: 200,
                                popoverRenderFn: function () {
                                  return s.createElement(d.K$, { user: O });
                                },
                              },
                              s.createElement(
                                m.rU,
                                { href: (0, P.AWr)(O, _) },
                                s.createElement(
                                  f.F,
                                  { scale: "M", color: "DARKER" },
                                  O.name
                                )
                              )
                            )
                          : M;
                      }
                    ),
                    T
                      ? s.createElement(l, {
                          title: "AUTHOR",
                          backgroundColor: R.brandColor.sage.dark,
                        })
                      : k
                      ? s.createElement(l, {
                          title: "YOU",
                          backgroundColor: "#A8A8A8",
                        })
                      : null
                  ),
                  s.createElement(
                    m.rU,
                    { href: x, linkStyle: "SUBTLE", inline: !0, noFollow: !0 },
                    s.createElement(
                      f.F,
                      { scale: "M" },
                      s.createElement(i.b, { timestamp: S }),
                      j && s.createElement(s.Fragment, null, " (edited)")
                    )
                  )
                )
              ),
              s.createElement(
                m.rU,
                {
                  onClick: function (e) {
                    e.nativeEvent.stopPropagation(), w(!C);
                  },
                  inline: !0,
                  className: E(ne),
                },
                s.createElement(y.Z, null)
              )
            ),
            C &&
              s.createElement(
                "div",
                { className: E({ position: "relative" }) },
                s.createElement(
                  g.cW,
                  {
                    source: { susiEntry: "respond_sidebar" },
                    extendSource: !0,
                  },
                  s.createElement(ee, {
                    response: t,
                    responseType: r,
                    parentPost: b,
                    isPopoverMenuVisible: C,
                    hidePopoverMenu: function () {
                      return w(!1);
                    },
                  })
                )
              )
          );
        };
    },
    9216: (e, n, t) => {
      "use strict";
      t.d(n, { F: () => d });
      var r = t(28655),
        o = t.n(r),
        s = t(71439),
        i = t(28033),
        a = t(47894),
        l = t(56975);
      function u() {
        var e = o()([
          "\n  fragment ResponsePopoverMenu_post on Post {\n    id\n    ...ReportUserMenuItem_post\n    ...HideResponseMenuItem_post\n    ...BlockUserMenuItem_post\n  }\n  ",
          "\n  ",
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
      var c = (0, s.Ps)(u(), l.x, a.i, i.Kv);
      function p() {
        var e = o()([
          "\n  fragment ResponseHeader_post on Post {\n    id\n    creator {\n      id\n    }\n    ...ResponsePopoverMenu_post\n  }\n  ",
          "\n",
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      var d = (0, s.Ps)(p(), c);
    },
    13704: (e, n, t) => {
      "use strict";
      t.d(n, { J: () => l });
      var r = t(28655),
        o = t.n(r),
        s = t(71439),
        i = t(98281);
      function a() {
        var e = o()([
          "\n  fragment ResponseHeader_postHacky on Post {\n    createdAt\n    creator {\n      ...UserAvatar_user\n      viewerEdge {\n        id\n        isBlocking\n      }\n    }\n    mediumUrl\n  }\n  ",
          "\n",
        ]);
        return (
          (a = function () {
            return e;
          }),
          e
        );
      }
      var l = (0, s.Ps)(a(), i.WQ);
    },
    51151: (e, n, t) => {
      "use strict";
      t.d(n, { J: () => y, u: () => P });
      var r = t(28655),
        o = t.n(r),
        s = t(59713),
        i = t.n(s),
        a = t(71439),
        l = t(67294),
        u = t(19692),
        c = t(28309),
        p = t(14391),
        d = t(58357),
        m = t(83024);
      function f() {
        var e = o()([
          "\n  fragment ResponseQuote_post on Post {\n    inResponseToMediaResource {\n      href\n      mediumQuote {\n        quoteId\n        startOffset\n        endOffset\n        paragraphs {\n          ...TextParagraph_paragraph\n        }\n        ...buildQuotePreviewParagraph_quote\n      }\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (f = function () {
            return e;
          }),
          e
        );
      }
      function g(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            t.push.apply(t, r);
        }
        return t;
      }
      function v(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? g(Object(t), !0).forEach(function (n) {
                i()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : g(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      var y = function (e) {
          var n = e.inResponseToMediaResource,
            t = (0, c.Iq)(),
            r = (0, c.Fg)(),
            o = (0, d.r)(
              function () {
                var e = null == n ? void 0 : n.href;
                if (e) {
                  var t = null == e ? void 0 : e.split("#")[1];
                  if (t) {
                    var r = t.split("--")[0];
                    if (r) {
                      var o = document.getElementById(r);
                      if (o) {
                        var s = (null == o ? void 0 : o.offsetTop) - 100;
                        s && window.scrollTo({ top: s, behavior: "smooth" });
                      }
                    }
                  }
                }
              },
              [null == n ? void 0 : n.href]
            ),
            s = null == n ? void 0 : n.mediumQuote;
          if (!s) return null;
          var i = (0, m.eu)(s);
          if (!i || !i.type) return null;
          var a = i.type;
          return a === p.NJ.IMG ||
            a === p.NJ.IFRAME ||
            a === p.NJ.COVER_TITLE ||
            a === p.NJ.HR ||
            a === p.NJ.MIXTAPE_EMBED ||
            a === p.NJ.SECTION_CAPTION
            ? null
            : l.createElement(
                "div",
                {
                  onClick: o,
                  onKeyDown: o,
                  role: "button",
                  tabIndex: 0,
                  className: t({
                    boxShadow: "0px 1px 4px rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "3px",
                    marginTop: "22px",
                    marginBottom: "3px",
                    padding: "20px 16px",
                    cursor: "pointer",
                    backgroundColor: r.backgroundColor,
                  }),
                },
                l.createElement(u.Do, {
                  paragraph: v(
                    v({}, i),
                    {},
                    {
                      name: "embedded-quote-"
                        .concat(s.quoteId, "-")
                        .concat(i.name),
                    }
                  ),
                  paragraphStyle: a,
                  spaceTop: 4,
                  richTextStyle: "STREAM",
                })
              );
        },
        P = (0, a.Ps)(f(), m.Sz, u.Rg);
    },
    2074: (e, n, t) => {
      "use strict";
      t.d(n, { A: () => h, g: () => b });
      var r = t(28655),
        o = t.n(r),
        s = t(71439),
        i = t(8011),
        a = t(43522),
        l = t(41832),
        u = t(15699),
        c = t(27952),
        p = t(13704),
        d = t(51151);
      function m() {
        var e = o()([
          "\n  fragment StoryResponse_storyResponse on StreamItemPostStoryResponse {\n    post {\n      ...ResponseHeader_postHacky\n      ...ResponseQuote_post\n      id\n      responsesCount\n      createdAt\n      creator {\n        viewerEdge {\n          id\n          isBlocking\n        }\n        ...userUrl_user\n        ...UserMentionTooltip_user\n      }\n      clapCount\n      responseDistribution\n      ...PostPresentationTracker_post\n      previewContent {\n        bodyModel {\n          paragraphs {\n            text\n            type\n          }\n        }\n      }\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (m = function () {
            return e;
          }),
          e
        );
      }
      var f = (0, s.Ps)(m(), p.J, u.h, d.u, c.$mN, l.OJ),
        g = t(58992),
        v = t(31078);
      function y() {
        var e = o()([
          "\n  query PagedThreadedPostResponsesQuery(\n    $postId: ID!\n    $postResponsesPaging: PagingOptions\n    $sortType: ResponseSortType\n  ) {\n    post(id: $postId) {\n      id\n      ...CloseDiscussion_post\n      responsesCount\n      postResponses {\n        count\n      }\n      responseRootPost {\n        post {\n          id\n        }\n        responseDepth\n      }\n      threadedPostResponses(paging: $postResponsesPaging, sortType: $sortType) {\n        __typename\n        autoExpandedPostIds\n        pagingInfo {\n          next {\n            limit\n            to\n          }\n        }\n        posts {\n          ... on Post {\n            ...StoryResponse_threadedStoryResponse_post\n            ...SimpleResponse_threadedSimpleResponse_post\n            ...SimpleResponse_threadedSimpleResponse_defaultPostResponses\n          }\n        }\n      }\n    }\n  }\n  ",
          "\n  ",
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
      function P() {
        var e = o()([
          '\n  query PostResponsesQuery($postId: ID!, $postResponsesPaging: PagingOptions) {\n    post(id: $postId) {\n      id\n      ...CloseDiscussion_post\n      postResponses {\n        count\n        responsesConnection(paging: $postResponsesPaging) @connection(key: "responsesConnection") {\n          pagingInfo {\n            next {\n              limit\n              to\n            }\n          }\n          stream {\n            itemType {\n              __typename\n              ... on StreamItemPostStoryResponse {\n                ...StoryResponse_storyResponse\n              }\n              ... on StreamItemPostSimpleResponse {\n                ...SimpleResponse_simpleResponse\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n  ',
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (P = function () {
            return e;
          }),
          e
        );
      }
      var b = (0, s.Ps)(P(), v.Z, f, i.y),
        h = (0, s.Ps)(y(), v.Z, a.D, g.t, a.K);
    },
    78873: (e, n, t) => {
      "use strict";
      t.d(n, { OT: () => Q, DM: () => K, sG: () => L });
      var r = t(28655),
        o = t.n(r),
        s = t(63038),
        i = t.n(s),
        a = t(71439),
        l = t(67294),
        u = t(2277),
        c = t(3714),
        p = t(9216),
        d = t(51151),
        m = t(14267),
        f = t(39382),
        g = t(59713),
        v = t.n(g),
        y = t(99046),
        P = t(54260),
        b = t(45893),
        h = t(53976),
        E = t(85432),
        R = t(64504),
        O = t(27599),
        x = t(27572),
        S = t(28309);
      function I() {
        return (I =
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
      var D = l.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.56 6.14L13 10.5l-4.43 4.36-.55-.55 3.8-3.81-3.8-3.8",
      });
      const C = function (e) {
        return l.createElement(
          "svg",
          I({ width: 21, height: 21, viewBox: "0 0 21 21", fill: "none" }, e),
          D
        );
      };
      function w() {
        return (w =
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
      var _ = l.createElement("path", {
        d: "M21.27 20.06a9.04 9.04 0 0 0 2.75-6.68C24.02 8.21 19.67 4 14.1 4S4 8.21 4 13.38c0 5.18 4.53 9.39 10.1 9.39 1 0 2-.14 2.95-.41.28.25.6.49.92.7a7.46 7.46 0 0 0 4.19 1.3c.27 0 .5-.13.6-.35a.63.63 0 0 0-.05-.65 8.08 8.08 0 0 1-1.29-2.58 5.42 5.42 0 0 1-.15-.75zm-3.85 1.32l-.08-.28-.4.12a9.72 9.72 0 0 1-2.84.43c-4.96 0-9-3.71-9-8.27 0-4.55 4.04-8.26 9-8.26 4.95 0 8.77 3.71 8.77 8.27 0 2.25-.75 4.35-2.5 5.92l-.24.21v.32a5.59 5.59 0 0 0 .21 1.29c.19.7.49 1.4.89 2.08a6.43 6.43 0 0 1-2.67-1.06c-.34-.22-.88-.48-1.16-.74z",
      });
      const T = function (e) {
        return l.createElement("svg", w({ width: 29, height: 29 }, e), _);
      };
      function k(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            t.push.apply(t, r);
        }
        return t;
      }
      function j(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? k(Object(t), !0).forEach(function (n) {
                v()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : k(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      var M = "Show more replies",
        A = function (e) {
          var n = e.response,
            t = n.postResponses,
            r = n.id,
            o = (null == t ? void 0 : t.count) || 0,
            s = l.useContext(P.H),
            i = s.inResponseToPostId,
            a = s.isThreadedResponsesVisible,
            u = s.toggleThreadedResponses,
            c = s.threadDepthOnPage,
            p = s.toggleCreateReply,
            d = s.loadThreadedResponses,
            f = s.isThreadedResponsesQueryCalled,
            g = s.showContinueThisThreadSidebar,
            v = s.threadDepthFromRootPost,
            I = l.useContext(m.D).rootPostId,
            D = (0, O.Av)(),
            w = (0, x.pK)(),
            _ = (0, S.Iq)(),
            k = function (e) {
              return function (n) {
                return {
                  fill: e ? n.accentColor.fill.normal : n.baseColor.fill.normal,
                  height: "25px",
                  width: "25px",
                };
              };
            },
            A = !!(0, h.V)({
              name: "enable_lite_continue_this_thread",
              placeholder: !1,
            }),
            U = c >= b.yo,
            B = U && o > 0,
            F = function (e, n) {
              return l.createElement(
                E.xu,
                { display: "flex", alignItems: "center" },
                l.createElement(T, {
                  className: _(k(B)),
                  "aria-label": "responses",
                }),
                l.createElement(
                  E.xu,
                  { tag: "div", marginLeft: "8px", marginTop: "2px" },
                  l.createElement(R.F, { color: e, tag: "p", scale: "M" }, n)
                )
              );
            },
            N = {
              postId: r,
              parentPostId: i,
              rootPostId: I,
              threadDepth: v,
              source: w,
            },
            H = n.mediumUrl
              ? l.createElement(
                  E.rU,
                  { linkStyle: "SUBTLE", href: n.mediumUrl },
                  F("ACCENT", M)
                )
              : null,
            L = function () {
              g(), D.event("response.continue", j({}, N));
            },
            $ = A
              ? l.createElement(
                  E.rU,
                  { linkStyle: "SUBTLE", onClick: L },
                  F("ACCENT", M)
                )
              : H;
          return l.createElement(
            E.xu,
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "14px",
            },
            l.createElement(
              E.xu,
              { display: "flex", alignItems: "center" },
              l.createElement(y.S, {
                buttonStyle: "SUBTLE_THREADED_RESPONSE",
                post: n,
                shouldShowResponsiveLabelText: !0,
                susiEntry: "respond_sidebar",
              }),
              l.createElement(
                E.xu,
                {
                  marginLeft: "12px",
                  display: "flex",
                  alignItems: "center",
                  height: "25px",
                },
                B
                  ? $
                  : o > 0 &&
                      l.createElement(
                        E.rU,
                        {
                          linkStyle: "SUBTLE",
                          onClick: function () {
                            !(function (e) {
                              e
                                ? D.event("response.collapsed", j({}, N))
                                : e || D.event("response.expanded", j({}, N));
                            })(a),
                              u();
                          },
                        },
                        F(
                          "DARKER",
                          (function (e, n) {
                            return n
                              ? "Hide replies"
                              : ""
                                  .concat(e, " ")
                                  .concat(1 === e ? "reply" : "replies");
                          })(o, a)
                        )
                      )
              )
            ),
            B
              ? l.createElement(
                  E.xu,
                  { marginTop: "5px" },
                  l.createElement(
                    E.rU,
                    { linkStyle: "SUBTLE", onClick: L },
                    l.createElement(C, {
                      className: _(k(!0)),
                      height: "26px",
                      width: "26px",
                    })
                  )
                )
              : l.createElement(
                  E.xu,
                  { paddingRight: "6px" },
                  l.createElement(
                    R.F,
                    { color: "DARKER", scale: "M" },
                    l.createElement(
                      E.rU,
                      {
                        onClick: function () {
                          U ? L() : (f || d(), p());
                        },
                        inline: !0,
                      },
                      "Reply"
                    )
                  )
                )
          );
        },
        U = t(26912),
        B = t(72955),
        F = t(15699),
        N = t(29035);
      function H() {
        var e = o()([
          "\n  fragment SimpleResponse_post on Post {\n    id\n    ...ResponseHeader_post\n  }\n  ",
          "\n",
        ]);
        return (
          (H = function () {
            return e;
          }),
          e
        );
      }
      var L = function (e) {
          return e.join("").length > 320
            ? "char"
            : e.join("\n").split("\n").length > f._W
            ? "line"
            : "none";
        },
        $ = function () {
          return { border: "none", padding: "0 0 5px", cursor: "pointer" };
        },
        Q = function (e) {
          var n,
            t = e.simpleResponse,
            r = e.parentPost,
            o = e.omitBottomBorder,
            s = t.creator,
            a = t.content,
            p = t.mediumUrl,
            g = l.useState(!1),
            v = i()(g, 2),
            y = v[0],
            P = v[1],
            b = l.useRef(null),
            h = (0, S.Iq)(),
            O = l.useContext(m.D).sidebarRef;
          (0, B.Vj)(b, t, O);
          var x =
            null == a || null === (n = a.bodyModel) || void 0 === n
              ? void 0
              : n.paragraphs;
          if (!(s && a && x && p)) return null;
          var I = x.map(function (e) {
              return e.text || "";
            }),
            D = L(I),
            C = "none" !== D,
            w = C && !y,
            _ = (0, N.ic)(navigator && navigator.userAgent);
          return l.createElement(
            F.o,
            {
              post: t,
              presentationContext: "POST_PREVIEW",
              isDisplayingFullPost: !C,
            },
            l.createElement(
              E.xu,
              {
                paddingTop: "25px",
                paddingBottom: _ && o ? "48px" : "16px",
                borderBottom: o ? void 0 : "BASE_LIGHTER",
                ref: b,
              },
              l.createElement(c.E, {
                response: t,
                responseType: U.Q.SIMPLE,
                parentPost: r,
              }),
              l.createElement(d.J, {
                inResponseToMediaResource: t.inResponseToMediaResource,
              }),
              l.createElement(
                E.xu,
                { marginTop: "5px" },
                l.createElement(
                  u.c.Provider,
                  { value: !0 },
                  l.createElement(f.YN, {
                    paragraphs: x,
                    truncateStrategy: D,
                    isExpanded: y,
                  })
                )
              ),
              w &&
                l.createElement(
                  "button",
                  {
                    onClick: function () {
                      return P(!0);
                    },
                    className: h($),
                  },
                  l.createElement(
                    R.F,
                    { scale: "S", color: "ACCENT", tag: "span" },
                    "Read More"
                  )
                ),
              l.createElement(A, { response: t })
            )
          );
        },
        K = (0, a.Ps)(H(), p.F);
    },
    39382: (e, n, t) => {
      "use strict";
      t.d(n, { _W: () => f, YN: () => v });
      var r = t(59713),
        o = t.n(r),
        s = t(67294),
        i = t(3011),
        a = t(85432),
        l = t(64504),
        u = t(28309),
        c = t(14391),
        p = t(50993);
      function d(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            t.push.apply(t, r);
        }
        return t;
      }
      function m(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? d(Object(t), !0).forEach(function (n) {
                o()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : d(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      var f = 5;
      function g(e, n, t) {
        return ("char" === e && n > 250) || ("line" === e && t > f);
      }
      function v(e) {
        var n = e.paragraphs,
          t = e.truncateStrategy,
          r = e.isExpanded,
          o = (0, u.Iq)(),
          d = 0,
          f = 0,
          v = "none" !== t && !r;
        return s.createElement(
          "pre",
          { className: o({ whiteSpace: "pre-wrap" }) },
          n
            .map(function (e) {
              if (!r && g(t, d, f)) return null;
              var n = (null == e ? void 0 : e.text) || "";
              (d += n.length || 0), (f += n.split("\n").length || 0);
              var u = m(m({}, e), {}, { dropCapImage: null, hasDropCap: null }),
                y = !r && g(t, d, f);
              if (y && "char" === t) {
                var P = 250 - (d - n.length || 0);
                (u.markups = u.markups.reduce(function (e, n) {
                  if (n.start < P) {
                    var t = m({}, n);
                    t.end > P && (t.end = P), e.push(t);
                  }
                  return e;
                }, [])),
                  (u.text = (0, p.N8)(n, P));
              }
              return s.createElement(
                a.xu,
                { padding: "5px 0px", key: e.name || e.id },
                s.createElement(
                  l.F,
                  { scale: "M", color: "DARKER", tag: "div" },
                  s.createElement(
                    "div",
                    { className: o({ lineHeight: "24px" }) },
                    s.createElement(i.T2, {
                      paragraph: u,
                      richTextStyle: "FULL_PAGE",
                      paragraphStyle: c.NJ.P,
                    }),
                    v && y && "..."
                  )
                )
              );
            })
            .filter(function (e) {
              return !!e;
            })
        );
      }
    },
    8011: (e, n, t) => {
      "use strict";
      t.d(n, { y: () => d });
      var r = t(28655),
        o = t.n(r),
        s = t(71439),
        i = t(5399),
        a = t(51151),
        l = t(41832),
        u = t(72955),
        c = t(27952);
      function p() {
        var e = o()([
          "\n  fragment SimpleResponse_simpleResponse on StreamItemPostSimpleResponse {\n    post {\n      id\n      createdAt\n      firstPublishedAt\n      latestPublishedAt\n      title\n      creator {\n        id\n        name\n        username\n        imageId\n        mediumMemberAt\n        viewerEdge {\n          isBlocking\n        }\n        ...userUrl_user\n        ...UserMentionTooltip_user\n      }\n      clapCount\n      viewerEdge {\n        id\n        clapCount\n      }\n      isPublished\n      voterCount\n      responsesCount\n      allowResponses\n      latestRev\n      recommenders {\n        id\n        name\n      }\n      mediumUrl\n      content {\n        bodyModel {\n          paragraphs {\n            text\n          }\n          ...getSlateBodyFromPostBodyModel_bodyModel\n        }\n      }\n      collection {\n        id\n        slug\n      }\n      isLimitedState\n      responseDistribution\n      ...PostPresentationTracker_post\n      ...PostScrollTracker_post\n      ...ResponseQuote_post\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      var d = (0, s.Ps)(p(), u.h_, u.kH, a.u, i.I, c.$mN, l.OJ);
    },
    43522: (e, n, t) => {
      "use strict";
      t.d(n, { D: () => f, K: () => g });
      var r = t(28655),
        o = t.n(r),
        s = t(71439),
        i = t(5399),
        a = t(51151),
        l = t(58992),
        u = t(41832),
        c = t(72955),
        p = t(27952);
      function d() {
        var e = o()([
          "\n  fragment SimpleResponse_threadedSimpleResponse_defaultPostResponses on Post {\n    responsesCount\n    postResponses {\n      count\n    }\n    threadedPostResponses(paging: {limit: 10}, sortType: $sortType) {\n      __typename\n      autoExpandedPostIds\n      pagingInfo {\n        next {\n          limit\n          to\n        }\n      }\n      posts {\n        ... on Post {\n          ...StoryResponse_threadedStoryResponse_post\n          ...SimpleResponse_threadedSimpleResponse_post\n        }\n      }\n    }\n  }\n  ",
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
        var e = o()([
          "\n  fragment SimpleResponse_threadedSimpleResponse_post on Post {\n    id\n    createdAt\n    firstPublishedAt\n    latestPublishedAt\n    title\n    creator {\n      id\n      name\n      username\n      imageId\n      mediumMemberAt\n      viewerEdge {\n        id\n        isBlocking\n      }\n      ...userUrl_user\n      ...UserMentionTooltip_user\n    }\n    clapCount\n    viewerEdge {\n      id\n      clapCount\n    }\n    isPublished\n    voterCount\n    responsesCount\n    postResponses {\n      count\n    }\n    allowResponses\n    latestRev\n    recommenders {\n      id\n      name\n    }\n    mediumUrl\n    content {\n      bodyModel {\n        paragraphs {\n          text\n        }\n        ...getSlateBodyFromPostBodyModel_bodyModel\n      }\n    }\n    collection {\n      id\n      slug\n    }\n    isLimitedState\n    inResponseToType\n    responseDistribution\n    ...PostPresentationTracker_post\n    ...PostScrollTracker_post\n    ...ResponseQuote_post\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (m = function () {
            return e;
          }),
          e
        );
      }
      var f = (0, s.Ps)(m(), c.h_, c.kH, a.u, i.I, p.$mN, u.OJ),
        g = (0, s.Ps)(d(), l.t, f);
    },
    58992: (e, n, t) => {
      "use strict";
      t.d(n, { t: () => d });
      var r = t(28655),
        o = t.n(r),
        s = t(71439),
        i = t(41832),
        a = t(15699),
        l = t(27952),
        u = t(13704),
        c = t(51151);
      function p() {
        var e = o()([
          "\n  fragment StoryResponse_threadedStoryResponse_post on Post {\n    id\n    responsesCount\n    postResponses {\n      count\n    }\n    creator {\n      viewerEdge {\n        id\n        isBlocking\n      }\n      ...userUrl_user\n      ...UserMentionTooltip_user\n    }\n    clapCount\n\n    previewContent {\n      bodyModel {\n        paragraphs {\n          text\n          type\n        }\n      }\n    }\n    responseDistribution\n    ...PostPresentationTracker_post\n    ...ResponseHeader_postHacky\n    ...ResponseQuote_post\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      var d = (0, s.Ps)(p(), u.J, a.h, c.u, l.$mN, i.OJ);
    },
    31078: (e, n, t) => {
      "use strict";
      t.d(n, { Eq: () => D, Z: () => w });
      var r = t(59713),
        o = t.n(r),
        s = t(63038),
        i = t.n(s),
        a = t(28655),
        l = t.n(a),
        u = t(71439),
        c = t(46829),
        p = t(67294),
        d = t(32262),
        m = t(85432),
        f = t(64504),
        g = t(27599),
        v = t(27572),
        y = t(28309);
      function P() {
        var e = l()([
          "\n  query FetchPostResponsesLockedQuery($postId: ID!) {\n    post(id: $postId) {\n      id\n      ...CloseDiscussion_post\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (P = function () {
            return e;
          }),
          e
        );
      }
      function b() {
        var e = l()([
          "\n  fragment CloseDiscussion_post on Post {\n    id\n    responsesLocked\n    isLockedResponse\n  }\n",
        ]);
        return (
          (b = function () {
            return e;
          }),
          e
        );
      }
      function h(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            t.push.apply(t, r);
        }
        return t;
      }
      function E(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? h(Object(t), !0).forEach(function (n) {
                o()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : h(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      function R() {
        var e = l()([
          "\n  mutation UnlockResponsesOnPostMutation($postId: ID!) {\n    unlockResponsesOnPost(postId: $postId)\n  }\n",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      function O() {
        var e = l()([
          "\n  mutation LockResponsesOnPostMutation($postId: ID!) {\n    lockResponsesOnPost(postId: $postId)\n  }\n",
        ]);
        return (
          (O = function () {
            return e;
          }),
          e
        );
      }
      var x = function () {
          return { fontStyle: "italic", textAlign: "center" };
        },
        S = (0, u.Ps)(O()),
        I = (0, u.Ps)(R()),
        D = function (e) {
          var n,
            t = e.parentPostId,
            r = e.responsesLocked,
            o = e.hidePopoverMenu,
            s = (0, y.Iq)(),
            a = (0, g.Av)(),
            l = (0, v.pK)(),
            u = p.useState(!1),
            P = i()(u, 2),
            b = P[0],
            h = P[1],
            E = (0, c.useMutation)(S, {
              variables: { postId: t },
              update: function (e) {
                a.event("responses.locked", { postId: t, source: l }),
                  C(e, t, !0, o);
              },
            }),
            R = i()(E, 1)[0],
            O = (0, c.useMutation)(I, {
              variables: { postId: t },
              update: function (e) {
                C(e, t, !1, o);
              },
            }),
            D = i()(O, 1)[0];
          return (
            (n =
              !0 === r
                ? p.createElement(
                    m.rU,
                    {
                      onClick: function () {
                        return D();
                      },
                    },
                    "Open discussion"
                  )
                : p.createElement(
                    m.rU,
                    {
                      onClick: function () {
                        return h(!0);
                      },
                    },
                    "Close discussion"
                  )),
            p.createElement(
              p.Fragment,
              null,
              p.createElement(d.Sl, null, n),
              b &&
                p.createElement(
                  m.Vq,
                  {
                    isVisible: b,
                    hide: function () {
                      return h(!1);
                    },
                    withCloseButton: !1,
                    noPortal: !0,
                    padding: 50,
                  },
                  p.createElement(
                    m.xu,
                    {
                      display: "flex",
                      margin: "auto",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                    },
                    p.createElement(f.X6, { scale: "M" }, "Close Discussion"),
                    p.createElement(
                      m.xu,
                      {
                        display: "flex",
                        width: "100%",
                        paddingRight: "5px",
                        marginTop: "10px",
                        marginBottom: "70px",
                        textAlign: "center",
                      },
                      p.createElement(
                        f.F,
                        { scale: "M", color: "DARKER" },
                        "Closing a discussion prevents responses from being added or edited on your story. Existing responses will remain on your story."
                      )
                    ),
                    p.createElement(
                      m.xu,
                      { display: "flex", marginBottom: "20px" },
                      p.createElement(
                        m.rU,
                        {
                          onClick: function () {
                            return h(!1);
                          },
                        },
                        p.createElement(
                          f.F,
                          { scale: "M", color: "DARKER" },
                          "Cancel"
                        )
                      ),
                      p.createElement(
                        m.xu,
                        { marginLeft: "25px" },
                        p.createElement(
                          m.zx,
                          {
                            buttonStyle: "ERROR",
                            onClick: function () {
                              return R();
                            },
                            "data-test-id": "close-discussion-button",
                          },
                          "Close discussion"
                        )
                      )
                    ),
                    p.createElement(
                      "div",
                      { className: s(x) },
                      p.createElement(
                        f.F,
                        { scale: "M" },
                        "You can reopen the discussion at any time."
                      )
                    )
                  )
                )
            )
          );
        },
        C = function (e, n, t, r) {
          var o = e.readQuery({ query: _, variables: { postId: n } });
          o &&
            (e.writeQuery({
              query: _,
              data: Object.assign({}, o, {
                post: E(E({}, o.post), {}, { responsesLocked: t }),
              }),
              variables: { postId: n },
            }),
            r());
        },
        w = (0, u.Ps)(b()),
        _ = (0, u.Ps)(P(), w);
    },
    28033: (e, n, t) => {
      "use strict";
      t.d(n, { RZ: () => S, Kv: () => D });
      var r = t(28655),
        o = t.n(r),
        s = t(59713),
        i = t.n(s),
        a = t(63038),
        l = t.n(a),
        u = t(46829),
        c = t(71439),
        p = t(67294),
        d = t(12291),
        m = t(28774),
        f = t(2074),
        g = t(34675),
        v = t(32262),
        y = t(18970),
        P = t(85432),
        b = t(27599),
        h = t(27572),
        E = t(85277);
      function R() {
        var e = o()([
          "\n  fragment BlockUserMenuItem_post on Post {\n    id\n    creator {\n      id\n    }\n  }\n",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      function O(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            t.push.apply(t, r);
        }
        return t;
      }
      function x(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? O(Object(t), !0).forEach(function (n) {
                i()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : O(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      var S = function (e) {
          var n,
            t,
            r = e.response,
            o = e.parentPost,
            s = e.hidePopoverMenu,
            i = (0, g.Hk)().value,
            a = (0, b.Av)(),
            c = (0, h.pK)(),
            R = (0, d.I0)(),
            O = p.useState(!1),
            x = l()(O, 2),
            S = x[0],
            D = x[1],
            C = function () {
              return D(!1);
            },
            w =
              null == r || null === (n = r.creator) || void 0 === n
                ? void 0
                : n.id,
            _ = (0, u.useMutation)(m.O, {
              variables: { targetUserId: w, userId: null == i ? void 0 : i.id },
              update: function (e) {
                var n = { postId: o.id, postResponsesPaging: { limit: 10 } },
                  t = e.readQuery({ query: f.g, variables: n }),
                  r = I(t, w);
                null !== r &&
                  e.writeQuery({ query: f.g, data: r, variables: n });
              },
              optimisticResponse: {
                __typename: "Mutation",
                blockUser: {
                  __typename: "User",
                  id: w,
                  viewerEdge: {
                    id: "userId:"
                      .concat(w, ":viewerId:")
                      .concat(null == i ? void 0 : i.id),
                    isBlocking: !0,
                  },
                },
              },
              onCompleted: function () {
                C(),
                  R(
                    (0, E.Dx)({
                      message:
                        "Responses by this user have been hidden from this story.",
                    })
                  );
              },
            }),
            T = l()(_, 1)[0],
            k = null === (t = o.creator) || void 0 === t ? void 0 : t.id,
            j = (null == i ? void 0 : i.id) === k;
          return (null == i ? void 0 : i.id) === w
            ? null
            : i && w && j
            ? p.createElement(
                p.Fragment,
                null,
                p.createElement(
                  v.Sl,
                  null,
                  p.createElement(
                    P.rU,
                    {
                      onClick: function () {
                        D(!0);
                      },
                    },
                    "Block this author"
                  )
                ),
                S &&
                  p.createElement(y.r, {
                    onConfirm: function () {
                      a.event("user.blocked", { userId: w, source: c }), T();
                    },
                    isVisible: S,
                    isInResponsesSidebar: !0,
                    hide: function () {
                      C(), s();
                    },
                  })
              )
            : null;
        },
        I = function (e, n) {
          var t,
            r =
              null == e || null === (t = e.post) || void 0 === t
                ? void 0
                : t.postResponses;
          if (
            !e ||
            !n ||
            null == r ||
            !r.responsesConnection ||
            null === (null == r ? void 0 : r.count)
          )
            return null;
          var o = r.responsesConnection.stream,
            s = o.filter(function (e) {
              var t, r;
              return (
                (null === (t = e.itemType.post) ||
                void 0 === t ||
                null === (r = t.creator) ||
                void 0 === r
                  ? void 0
                  : r.id) !== n
              );
            });
          if (s.length === o.length) return null;
          var i = o.length - s.length;
          return x(
            x({}, e),
            {},
            {
              post: x(
                x({}, e.post),
                {},
                {
                  postResponses: x(
                    x({}, r),
                    {},
                    {
                      count: r.count - i,
                      responsesConnection: x(
                        x({}, r.responsesConnection),
                        {},
                        { stream: s }
                      ),
                    }
                  ),
                }
              ),
            }
          );
        },
        D = (0, c.Ps)(R());
    },
    47894: (e, n, t) => {
      "use strict";
      t.d(n, { n: () => C, i: () => w });
      var r = t(59713),
        o = t.n(r),
        s = t(63038),
        i = t.n(s),
        a = t(28655),
        l = t.n(a),
        u = t(71439),
        c = t(46829),
        p = t(67294),
        d = t(12291),
        m = t(14267),
        f = t(43522),
        g = t(54260),
        v = t(98829),
        y = t(34675),
        P = t(32262),
        b = t(85432),
        h = t(27599),
        E = t(27572),
        R = t(85277);
      function O() {
        var e = l()([
          "\n  fragment HideResponseMenuItem_post on Post {\n    id\n    collection {\n      id\n      viewerEdge {\n        id\n        isEditor\n      }\n    }\n    creator {\n      id\n    }\n  }\n",
        ]);
        return (
          (O = function () {
            return e;
          }),
          e
        );
      }
      function x(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            t.push.apply(t, r);
        }
        return t;
      }
      function S(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? x(Object(t), !0).forEach(function (n) {
                o()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : x(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      function I() {
        var e = l()([
          "\n  mutation HidePostResponseOnParentMutation($parentPostId: ID!, $postResponseId: ID!) {\n    hidePostResponseOnParentPost(parentPostId: $parentPostId, postResponseId: $postResponseId)\n  }\n",
        ]);
        return (
          (I = function () {
            return e;
          }),
          e
        );
      }
      var D = (0, u.Ps)(I()),
        C = function (e) {
          var n,
            t,
            r,
            o = e.responseToBeHidden,
            s = e.parentPost,
            a = e.hidePopoverMenu,
            l = (0, y.Hk)().value,
            u = (0, d.I0)(),
            O = (0, h.Av)(),
            x = (0, E.pK)(),
            I = p.useContext(g.H).inResponseToPostId,
            C = p.useContext(m.D).responseSortType,
            w = I,
            _ =
              (null == l ? void 0 : l.id) ===
              (null === (n = s.creator) || void 0 === n ? void 0 : n.id),
            T =
              null == s || null === (t = s.collection) || void 0 === t
                ? void 0
                : t.viewerEdge.isEditor,
            k =
              (null == l ? void 0 : l.id) ===
              (null === (r = o.creator) || void 0 === r ? void 0 : r.id),
            j = (0, c.useMutation)(D, {
              variables: { postResponseId: o.id, parentPostId: w },
              update: function (e) {
                var n,
                  t = e.readFragment({
                    id: "Post:".concat(I),
                    fragment: f.K,
                    fragmentName:
                      "SimpleResponse_threadedSimpleResponse_defaultPostResponses",
                    variables: { sortType: C },
                  });
                null !== (n = (0, v.Z)(t, o.id)) &&
                  (e.writeFragment({
                    id: "Post:".concat(I),
                    fragment: f.K,
                    fragmentName:
                      "SimpleResponse_threadedSimpleResponse_defaultPostResponses",
                    data: S({}, n),
                    variables: { sortType: C },
                  }),
                  O.event("response.hidden", { postId: o.id, source: x }),
                  u(
                    (0, R.Dx)({
                      message: "",
                      toastStyle: "HIDE_POST_RESPONSE",
                      extraParams: { responseId: o.id, parentPostId: w },
                    })
                  ),
                  a());
              },
            }),
            M = i()(j, 1)[0];
          return k
            ? null
            : _ || T
            ? p.createElement(
                P.Sl,
                null,
                p.createElement(
                  b.rU,
                  {
                    onClick: function () {
                      return M();
                    },
                  },
                  "Hide this response"
                )
              )
            : null;
        },
        w = (0, u.Ps)(O());
    },
    56975: (e, n, t) => {
      "use strict";
      t.d(n, { Q: () => E, x: () => R });
      var r = t(28655),
        o = t.n(r),
        s = t(63038),
        i = t.n(s),
        a = t(71439),
        l = t(67294),
        u = t(46829),
        c = t(12291),
        p = t(33241),
        d = t(34675),
        m = t(85277),
        f = t(62181),
        g = t(32262),
        v = t(90639),
        y = t(85432),
        P = t(27599),
        b = t(27572);
      function h() {
        var e = o()([
          "\n  fragment ReportUserMenuItem_post on Post {\n    id\n    ...SusiClickable_post\n  }\n  ",
          "\n",
        ]);
        return (
          (h = function () {
            return e;
          }),
          e
        );
      }
      var E = function (e) {
          var n,
            t = e.response,
            r = e.parentPost,
            o = e.hidePopoverMenu,
            s = (0, d.Hk)().value,
            a = (0, P.Av)(),
            h = (0, b.pK)(),
            E = l.useState(!1),
            R = i()(E, 2),
            O = R[0],
            x = R[1],
            S = (function (e) {
              var n,
                t,
                r = e.response,
                o = r.id,
                s = null === (n = r.creator) || void 0 === n ? void 0 : n.id,
                a =
                  null === (t = r.creator) || void 0 === t
                    ? void 0
                    : t.viewerEdge.isBlocking,
                f = (0, c.I0)(),
                g = (0, d.rZ)().viewerId,
                v = (0, u.useMutation)(p.g, {
                  variables: {
                    targetPostId: o,
                    targetAuthorId: s,
                    alsoBlockAuthor: !1,
                    reason: "Spam",
                  },
                  onCompleted: function () {
                    f((0, m.Dx)({ message: "Successfully reported post." }));
                  },
                }),
                y = i()(v, 2),
                P = y[0],
                b = y[1];
              return {
                reportStory: l.useCallback(
                  function (e) {
                    var n = e.alsoBlockAuthor,
                      t = void 0 !== n && n,
                      r = e.reportReason;
                    return P({
                      variables: {
                        targetPostId: o,
                        targetAuthorId: s,
                        alsoBlockAuthor: t,
                        reason: void 0 === r ? "Spam" : r,
                      },
                      optimisticResponse: {
                        __typename: "Mutation",
                        reportStoryAndMaybeBlockAuthor: {
                          __typename: "User",
                          id: s,
                          viewerEdge: {
                            id: "userId:".concat(s, "-viewerId:").concat(g),
                            isBlocking: a || t,
                          },
                        },
                      },
                    });
                  },
                  [r, P]
                ),
                error: null == b ? void 0 : b.error,
                loading: null == b ? void 0 : b.loading,
              };
            })({ response: t }).reportStory,
            I =
              (null == s ? void 0 : s.id) ===
              (null === (n = t.creator) || void 0 === n ? void 0 : n.id);
          return !t.creator || I
            ? null
            : l.createElement(
                l.Fragment,
                null,
                l.createElement(
                  g.Sl,
                  null,
                  null != s && s.id
                    ? l.createElement(
                        y.rU,
                        {
                          onClick: function () {
                            return x(!0);
                          },
                        },
                        "Report this response"
                      )
                    : l.createElement(
                        f.R9,
                        {
                          operation: "register",
                          post: r,
                          susiEntry: "respond_sidebar",
                        },
                        "Report this response"
                      )
                ),
                l.createElement(v.$, {
                  onSubmit: function (e, n) {
                    return (
                      a.event("response.flagged", {
                        postId: t.id,
                        reason: n,
                        source: h,
                      }),
                      S({ alsoBlockAuthor: e, reportReason: n })
                    );
                  },
                  isVisible: O,
                  hide: function () {
                    x(!1), o();
                  },
                  isResponse: !0,
                })
              );
        },
        R = (0, a.Ps)(h(), f.qU);
    },
    98829: (e, n, t) => {
      "use strict";
      t.d(n, { Z: () => a });
      var r = t(59713),
        o = t.n(r);
      function s(e, n) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          n &&
            (r = r.filter(function (n) {
              return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            t.push.apply(t, r);
        }
        return t;
      }
      function i(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? s(Object(t), !0).forEach(function (n) {
                o()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : s(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      var a = function (e, n) {
        var t,
          r,
          o,
          s,
          a = e;
        return a &&
          null !== (t = a.threadedPostResponses) &&
          void 0 !== t &&
          null !== (r = t.posts) &&
          void 0 !== r &&
          r.some(function (e) {
            return e.id === n;
          })
          ? i(
              i({}, a),
              {},
              {
                postResponses: {
                  count:
                    ((null === (o = a.postResponses) || void 0 === o
                      ? void 0
                      : o.count) || 1) - 1,
                },
                threadedPostResponses: i(
                  i({}, a.threadedPostResponses),
                  {},
                  {
                    posts: (
                      (null === (s = a.threadedPostResponses) || void 0 === s
                        ? void 0
                        : s.posts) || []
                    ).filter(function (e) {
                      return e.id !== n;
                    }),
                  }
                ),
              }
            )
          : null;
      };
    },
    26912: (e, n, t) => {
      "use strict";
      var r;
      t.d(n, { Q: () => r }),
        (function (e) {
          (e.SIMPLE = "SIMPLE"), (e.STORY = "STORY");
        })(r || (r = {}));
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/8873.c13e151d.chunk.js.map
