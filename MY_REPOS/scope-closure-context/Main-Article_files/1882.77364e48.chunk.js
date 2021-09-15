(self.webpackChunklite = self.webpackChunklite || []).push([
  [1882],
  {
    59116: (e, t, n) => {
      "use strict";
      n.d(t, { Te: () => o, _M: () => r, ed: () => s });
      var o = function (e) {
          if (!e) return !1;
          var t = e.graphQLErrors;
          return (
            !!t &&
            !!t.find(function (e) {
              return 2 === e.type && 1 === e.path.length;
            })
          );
        },
        r = function (e) {
          if (!e) return !1;
          var t = e.graphQLErrors;
          return (
            !!t &&
            !!t.find(function (e) {
              var t;
              return (
                "RESPONSE_LOCKED" ===
                (null === (t = e.extensions) || void 0 === t ? void 0 : t.code)
              );
            })
          );
        },
        s = function (e) {
          return !(
            !e ||
            0 === e.length ||
            !e.find(function (e) {
              var t;
              return (
                "TOO_MANY_REQUESTS" ===
                (null === (t = e.extensions) || void 0 === t ? void 0 : t.code)
              );
            })
          );
        };
    },
    78067: (e, t, n) => {
      "use strict";
      var o;
      n.d(t, { r: () => o }),
        (function (e) {
          (e.FULL = "web-full"),
            (e.INLINE_HOMEPAGE_TOP = "web-inline-homepage-top"),
            (e.INLINE_POST_RESPONSE = "web-inline-post-response"),
            (e.INLINE_NEWSLETTER = "web-inline-newsletter"),
            (e.INLINE_QUOTE_RESPONSES = "web-inline-quote-responses");
        })(o || (o = {}));
    },
    99642: (e, t, n) => {
      "use strict";
      n.d(t, { X: () => u });
      var o = n(18156),
        r = n(67294),
        s = n(84792),
        i = n(26600),
        a = n(54803),
        l = {
          "mod+b": "bold",
          "mod+i": "italic",
          "mod+k": "link",
          "mod+alt+1": "title",
          "mod+alt+5": "bq",
        },
        u = function (e) {
          var t = (0, i.c8)(),
            n = t.setBackgroundSelection,
            u = t.setMode;
          return r.useCallback(
            function (t) {
              for (var r in l)
                if ((0, o.default)(r, t)) {
                  t.preventDefault();
                  var c = (0, a.t$)(e, "title"),
                    d = l[r];
                  switch (d) {
                    case "title":
                      return (0, a.th)(e, d);
                    case "link":
                      if (c) return;
                      if ((0, a.t$)(e, d)) return (0, a.Nx)(e);
                      var p = e.selection,
                        f = (0, a.St)(),
                        m = s.Editor.rangeRef(e, p);
                      if (!f || !n || !u) return;
                      return n(new i.qk(m, f)), u(a.AR.Link);
                    case "bq":
                      if (c) return;
                      return (0, a.th)(e, d);
                    default:
                      if (c) return;
                      return (0, a.w9)(e, d);
                  }
                }
            },
            [e]
          );
        };
    },
    9471: (e, t, n) => {
      "use strict";
      n.d(t, { Z: () => V });
      var o = n(87757),
        r = n.n(o),
        s = n(48926),
        i = n.n(s),
        a = n(67294),
        l = n(12291),
        u = n(59116),
        c = n(78067),
        d = n(14267),
        p = n(54260),
        f = n(30049),
        m = n(319),
        h = n.n(m),
        v = n(59713),
        E = n.n(v),
        b = n(28655),
        g = n.n(b),
        R = n(71439),
        x = n(80439),
        y = n(43522),
        S = n(58992);
      function P(e, t) {
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
      function I(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? P(Object(n), !0).forEach(function (t) {
                E()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : P(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function T() {
        var e = g()([
          "\n  mutation publishPostThreadedResponse(\n    $inResponseToPostId: ID!\n    $deltas: [Delta!]!\n    $inResponseToQuoteId: ID\n    $responseDistribution: ResponseDistributionType\n    $sortType: ResponseSortType\n  ) {\n    publishPostThreadedResponse(\n      inResponseToPostId: $inResponseToPostId\n      deltas: $deltas\n      inResponseToQuoteId: $inResponseToQuoteId\n      responseDistribution: $responseDistribution\n    ) {\n      id\n      ... on Post {\n        ...StoryResponse_threadedStoryResponse_post\n        ...SimpleResponse_threadedSimpleResponse_post\n        ...SimpleResponse_threadedSimpleResponse_defaultPostResponses\n      }\n    }\n  }\n  ",
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
      var w = (0, R.Ps)(T(), y.D, S.t, y.K),
        O = function (e) {
          var t = e.children,
            n = e.parentPostId,
            o = a.useContext(d.D).responseSortType;
          return a.createElement(
            x.mm,
            {
              mutation: w,
              update: function (e, t) {
                var r = (function (e, t) {
                  if (!t || !e.data) return null;
                  var n = e.data.publishPostThreadedResponse;
                  return I(
                    I({}, t),
                    {},
                    {
                      postResponses: { count: t.postResponses.count + 1 },
                      threadedPostResponses: I(
                        I({}, t.threadedPostResponses),
                        {},
                        {
                          posts: [n].concat(h()(t.threadedPostResponses.posts)),
                        }
                      ),
                    }
                  );
                })(
                  t,
                  e.readFragment({
                    id: "Post:".concat(n),
                    fragment: y.K,
                    fragmentName:
                      "SimpleResponse_threadedSimpleResponse_defaultPostResponses",
                    variables: { sortType: o },
                  })
                );
                null !== r &&
                  e.writeFragment({
                    id: "Post:".concat(n),
                    fragment: y.K,
                    fragmentName:
                      "SimpleResponse_threadedSimpleResponse_defaultPostResponses",
                    variables: { sortType: o },
                    data: I({}, r),
                  });
              },
            },
            function (e, n) {
              return t({
                publishResponse: e,
                loading: n.loading,
                error: n.error,
              });
            }
          );
        };
      function D() {
        var e = g()([
          "\n  mutation savePostResponse(\n    $inResponseToPostId: ID!\n    $deltas: [Delta!]!\n    $inResponseToQuoteId: ID\n  ) {\n    savePostResponse(\n      inResponseToPostId: $inResponseToPostId\n      deltas: $deltas\n      inResponseToQuoteId: $inResponseToQuoteId\n    ) {\n      ... on Post {\n        id\n      }\n    }\n  }\n",
        ]);
        return (
          (D = function () {
            return e;
          }),
          e
        );
      }
      var C = (0, R.Ps)(D()),
        k = function (e) {
          var t = e.children;
          return a.createElement(x.mm, { mutation: C }, function (e) {
            return t({ saveResponse: e });
          });
        },
        N = n(19537),
        L = n(64435),
        _ = n(64504),
        B = n(27599),
        M = n(27572),
        j = n(28309),
        A = n(14391),
        H = n(85277),
        V = function (e) {
          var t = e.parentPostId,
            n = e.placeholder,
            o = e.hideReplyEditing,
            s = void 0 === o ? function () {} : o,
            m = e.editorOpenByDefault,
            h = void 0 === m || m,
            v = e.showEditorHeader,
            E = void 0 === v || v,
            b = a.useContext(d.D),
            g = b.setIsSavingResponse,
            R = b.responsesLocked,
            x = b.inResponseToQuote,
            y = b.setInResponseToQuote,
            S = b.responseDistribution,
            P = b.setResponseDistribution,
            I = b.responseSortType,
            T = b.rootPostId,
            w = a.useContext(p.H),
            D = w.showThreadedResponses,
            C = w.isThreadedResponsesQueryLoading,
            V = w.threadDepthFromRootPost,
            Q = function () {
              S === A.Et.DISTRIBUTED
                ? P(A.Et.NOT_DISTRIBUTED)
                : P(A.Et.DISTRIBUTED);
            },
            F = (0, M.pK)(),
            U = (0, B.Av)(),
            z = (0, l.I0)(),
            q = (0, j.Iq)(),
            K = a.useRef(null);
          a.useEffect(function () {
            var e;
            null != K &&
              null !== (e = K.current) &&
              void 0 !== e &&
              e.getBoundingClientRect &&
              K.current.getBoundingClientRect().bottom > window.innerHeight &&
              K.current.scrollIntoView({ behavior: "smooth", block: "end" });
          }, []);
          var $ = function (e) {
            return (function () {
              var n = i()(
                r().mark(function n(o, s) {
                  var i;
                  return r().wrap(function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          return (
                            (n.next = 2),
                            e({
                              variables: {
                                inResponseToPostId: t,
                                deltas: o,
                                inResponseToQuoteId: null == x ? void 0 : x.id,
                              },
                            })
                          );
                        case 2:
                          (i = n.sent), s(i.data.savePostResponse.id);
                        case 4:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              );
              return function (e, t) {
                return n.apply(this, arguments);
              };
            })();
          };
          return a.createElement(O, { parentPostId: t }, function (e) {
            var o = e.publishResponse,
              l = e.loading,
              d = e.error;
            return (0, u._M)(d) || R
              ? (g(!1), a.createElement(f.R, { message: L.x }))
              : a.createElement(k, null, function (e) {
                  var d,
                    p = e.saveResponse;
                  return a.createElement(
                    "div",
                    { ref: K },
                    a.createElement(
                      _.F,
                      { scale: "M", color: "DARKER", tag: "div" },
                      a.createElement(
                        "div",
                        { className: q({ lineHeight: "24px" }) },
                        a.createElement(L.j, {
                          postId: t,
                          isPublishingResponse: l,
                          publishResponse:
                            ((d = o),
                            function (e, n) {
                              return (
                                g(!0),
                                d({
                                  variables: {
                                    inResponseToPostId: t,
                                    deltas: e,
                                    inResponseToQuoteId:
                                      null == x ? void 0 : x.id,
                                    responseDistribution: S,
                                    responseSortType: I,
                                  },
                                }).then(function (e) {
                                  var o =
                                      e.data &&
                                      e.data.publishPostThreadedResponse,
                                    r = (0, u.ed)(e.errors);
                                  if (o)
                                    return (
                                      U.event("inlineEditor.publish", {
                                        postId: t,
                                        context: c.r.INLINE_POST_RESPONSE,
                                        source: F,
                                      }),
                                      U.event("response.created", {
                                        postId: o.id,
                                        parentPostId: t,
                                        rootPostId: T,
                                        threadDepth: V + 1,
                                        context: c.r.INLINE_POST_RESPONSE,
                                        source: F,
                                      }),
                                      o.responseDistribution ===
                                        A.Et.DISTRIBUTED &&
                                        U.event("response.distributed", {
                                          postId: o.id,
                                          parentPostId: t,
                                          rootPostId: T,
                                          threadDepth: V + 1,
                                          context: c.r.INLINE_POST_RESPONSE,
                                          source: F,
                                        }),
                                      g(!1),
                                      D(),
                                      S === A.Et.DISTRIBUTED &&
                                        (z(
                                          (0, H.Dx)({
                                            message: "",
                                            toastStyle: "PUBLISH_RESPONSE",
                                            extraParams: { response: o },
                                            duration: 5e3,
                                          })
                                        ),
                                        P(A.Et.NOT_DISTRIBUTED)),
                                      n()
                                    );
                                  r &&
                                    (g(!1),
                                    z(
                                      (0, H.Dx)({
                                        message:
                                          "You’ve reached the limit for stories that can be published in one day. Please try again tomorrow.",
                                        toastStyle: "ERROR",
                                      })
                                    ));
                                })
                              );
                            }),
                          saveResponse: $(p),
                          type: N.H.create,
                          inResponseToQuote: x,
                          onClose: i()(
                            r().mark(function e() {
                              return r().wrap(function (e) {
                                for (;;)
                                  switch ((e.prev = e.next)) {
                                    case 0:
                                      return (
                                        y(void 0), s(), e.abrupt("return", {})
                                      );
                                    case 3:
                                    case "end":
                                      return e.stop();
                                  }
                              }, e);
                            })
                          ),
                          editorOpenByDefault: h,
                          placeholder: n,
                          showEditorHeader: E,
                          disableReplyButton: C,
                          showPublishCheckbox: !h,
                          responseDistribution: S,
                          toggleResponseDistribution: Q,
                        })
                      )
                    )
                  );
                });
          });
        };
    },
    30049: (e, t, n) => {
      "use strict";
      n.d(t, { R: () => a });
      var o = n(67294),
        r = n(85432),
        s = n(64504),
        i = n(27952),
        a = function (e) {
          var t =
            e.message || "The author has closed discussion for this story.";
          return o.createElement(
            r.xu,
            {
              backgroundColor: "BASE_NORMAL",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "16px",
            },
            o.createElement(
              s.F,
              { scale: "M", tag: "span", color: "DARKER" },
              t,
              " ",
              o.createElement(
                r.rU,
                {
                  href: (0, i.VGH)(),
                  target: "_blank",
                  inline: !0,
                  linkStyle: "OBVIOUS",
                },
                "Learn more."
              )
            )
          );
        };
    },
    19537: (e, t, n) => {
      "use strict";
      var o;
      n.d(t, { H: () => o }),
        (function (e) {
          (e.edit = "EDIT"), (e.create = "CREATE");
        })(o || (o = {}));
    },
    64435: (e, t, n) => {
      "use strict";
      n.d(t, { x: () => ge, j: () => Ie });
      var o = n(63038),
        r = n.n(o),
        s = n(87757),
        i = n.n(s),
        a = n(48926),
        l = n.n(a),
        u = n(59713),
        c = n.n(u),
        d = n(18446),
        p = n.n(d),
        f = n(67294),
        m = n(84792),
        h = n(10143),
        v = n(26600),
        E = n(25772),
        b = n(78067),
        g = n(22470),
        R = n(54803),
        x = n(9735),
        y = n(99642),
        S = n(24548),
        P = n(42963),
        I = n(54260),
        T = n(32262),
        w = n(85432),
        O = n(28309),
        D = n(74465),
        C = n(93394),
        k = function (e) {
          return {
            cursor: "pointer",
            border: 0,
            fill: e.baseColor.fill.light,
            ":hover": { fill: e.baseColor.fill.dark },
          };
        },
        N = function (e) {
          var t = e.isEdit,
            n = e.saveResponse,
            o = e.setDraftResponseId,
            r = (0, O.Iq)(),
            s = "editorPopoverMenu";
          return f.createElement(w.Bn, null, function (e) {
            var i = e.isVisible,
              a = e.toggle,
              l = e.hide;
            return f.createElement(
              w.J2,
              {
                ariaId: s,
                isVisible: i,
                hide: l,
                customZIndex: D.ZP.responseSidebarPopover,
                noArrow: !0,
                placement: "bottom-end",
                popoverRenderFn: function () {
                  return f.createElement(
                    T.mX,
                    null,
                    f.createElement(
                      T.Sl,
                      null,
                      f.createElement(
                        w.rU,
                        {
                          onClick: t && o ? o : n,
                          "data-testid": "saveResponseMenuItem",
                        },
                        "Make this response a story"
                      )
                    )
                  );
                },
              },
              f.createElement(
                w.rU,
                {
                  ariaControls: s,
                  ariaExpanded: i ? "true" : "false",
                  onClick: a,
                  className: r(k),
                  "data-testid": "editorMenu",
                },
                f.createElement(C.Z, null)
              )
            );
          });
        },
        L = n(19692),
        _ = n(14391),
        B = n(83024),
        M = function (e) {
          var t = e.quote,
            n = (0, O.Iq)();
          if (!t) return null;
          var o = (0, B.eu)(t);
          return o
            ? f.createElement(
                "div",
                {
                  className: n({
                    boxShadow: "0px 1px 4px rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "3px",
                    padding: "20px 16px",
                    margin: "10px 14px 0 14px",
                    "& mark": { cursor: "text" },
                  }),
                },
                f.createElement(L.Do, {
                  paragraph: o,
                  paragraphStyle: _.NJ.P,
                  spaceTop: 4,
                  richTextStyle: "STREAM",
                })
              )
            : null;
        },
        j = function (e) {
          var t = e.onFocus,
            n = e.responseContent,
            o = e.setResponseContent,
            r = e.setIsEmpty,
            s = e.isEditorOpen,
            i = (0, O.Iq)();
          return f.createElement("textarea", {
            placeholder: "What are your thoughts?",
            value: n,
            onChange: function (e) {
              var t = e.target.value;
              r(!t), o(t);
            },
            onFocus: t,
            className: i({
              width: "100%",
              padding: "14px",
              resize: "none",
              minHeight: s ? "100px" : "0",
              height: s ? "auto" : "47px",
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
              outline: "0",
              border: "0",
            }),
          });
        },
        A = n(22091),
        H = n(33914),
        V = n(64504),
        Q = n(67122),
        F = n(13779);
      function U() {
        return (U =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      var z = f.createElement("path", {
        d: "M5.82 6.22L4.04 11.2h3.63l-1.85-5zm-.28-1.9h1.19l4.31 11.27 1.08.22v.74H8.03v-.74l1.12-.08.13-.26-1.3-3.44H3.74l-1.29 3.44.19.26 1.17.08v.74H.28v-.74l1.04-.22L5.54 4.33zM17.95 14.9v-3.17c-1.5.41-2.5.8-2.97 1.14-.47.34-.7.8-.7 1.36 0 .45.12.81.38 1.08.27.27.62.4 1.06.4.28 0 .6-.07.96-.2.37-.14.8-.34 1.27-.61zm0 .6c-.58.4-1.11.7-1.6.9-.48.18-.93.27-1.35.27-.7 0-1.26-.2-1.68-.63a2.28 2.28 0 0 1-.63-1.67c0-.77.32-1.37.94-1.8.64-.45 2.07-.94 4.32-1.48v-.57c0-.75-.12-1.28-.37-1.57-.25-.3-.67-.44-1.28-.44-.23 0-.46.02-.68.07-.22.05-.45.12-.7.21v1.51H13.7c-.22 0-.37-.04-.45-.11-.08-.08-.12-.23-.12-.44 0-.59.34-1.07 1.01-1.46a5.27 5.27 0 0 1 2.63-.58c.95 0 1.63.2 2.06.61.43.41.64 1.07.64 1.98v5.22l.3.3.96.08v.65h-2.53l-.24-1.04z",
        fill: "#000",
      });
      const q = function (e) {
        return f.createElement(
          "svg",
          U({ width: 21, height: 21, viewBox: "0 0 21 21", fill: "none" }, e),
          z
        );
      };
      var K = n(63671),
        $ = n(25343),
        W = function (e, t, n) {
          var o = t && !e;
          return {
            margin: "0 4px",
            cursor: e ? "default" : "pointer",
            opacity: e ? "0.3" : "1",
            padding: "6px",
            borderRadius: "4px",
            display: "inline-flex",
            justifyContent: "center",
            backgroundColor: o ? Q.aE : null,
            ":hover": {
              backgroundColor: e
                ? null
                : t
                ? Q.aE
                : n.baseColor.background.normal,
            },
            "> svg > path": { fill: o ? Q.r$ : Q.wU },
            "> span > svg > path": { fill: o ? Q.r$ : Q.wU },
          };
        },
        Z = function (e) {
          var t = e.editor,
            n = e.buttonKeys,
            o = e.showSubMenu,
            r = e.disabled,
            s = e.setShowSubMenu,
            i = (0, O.Iq)();
          return t && n && n.length > 0
            ? f.createElement(
                A.J2,
                {
                  disablePortalOverlay: !0,
                  isVisible: o && !r,
                  noArrow: !0,
                  noPortal: !0,
                  hide: function () {},
                  placement: "top",
                  targetDistance: 10,
                  popoverRenderFn: function () {
                    return f.createElement(
                      V.F,
                      { tag: "span", scale: "M" },
                      f.createElement(
                        "span",
                        {
                          className: i({ display: "flex", padding: "8px 4px" }),
                        },
                        n.map(function (e) {
                          return f.createElement(G, {
                            key: e,
                            format: e,
                            disabled: r,
                            slateEditor: t,
                            showSubMenu: o,
                            setShowSubMenu: s,
                          });
                        })
                      )
                    );
                  },
                  customZIndex: D.ZP.selectionMenu,
                  referenceHeight: "100%",
                  refTag: "span",
                  shouldAnimateOpen: !0,
                },
                f.createElement(q, null)
              )
            : null;
        },
        G = function (e) {
          var t = e.format,
            n = e.disabled,
            o = e.slateEditor,
            r = e.subMenuKeys,
            s = void 0 === r ? [] : r,
            i = e.showSubMenu,
            a = e.setShowSubMenu,
            l = (0, O.Iq)(),
            u = (0, O.Fg)(),
            c = (0, v.c8)(),
            d = c.setBackgroundSelection,
            p = c.setMode,
            h = t === ee ? i : (0, R.t$)(o, t);
          if (!d || !p) return null;
          var E = o.selection,
            b = (function (e) {
              switch (e) {
                case X:
                  return "Bold (⌘B)";
                case Y:
                  return "Italic (⌘I)";
                case J:
                  return "Link (⌘K)";
                case ee:
                  return "Formatting options";
                default:
                  return "Click to format";
              }
            })(t);
          return f.createElement(
            H._,
            { tooltipText: b, targetDistance: 10, isVisible: !(t === ee && i) },
            f.createElement(
              "span",
              {
                onMouseDown: function (e) {
                  e.preventDefault();
                },
                onClick: function (e) {
                  if ((e.stopPropagation(), !n))
                    switch (t) {
                      case J:
                        if (h) return (0, R.Nx)(o);
                        var r = (0, R.St)();
                        if (!r || !E) return null;
                        var s = m.Editor.rangeRef(o, E);
                        return d(new v.qk(s, r)), p(R.AR.Link);
                      case "title":
                      case "bq":
                        return (0, R.th)(o, t);
                      case ee:
                        return void a(!i);
                      default:
                        return (0, R.w9)(o, t);
                    }
                },
                className: l(W(n, h, u)),
              },
              (function (e, t, n, o, r, s) {
                switch (e) {
                  case X:
                    return f.createElement(F.Z, null);
                  case Y:
                    return f.createElement(K.Z, null);
                  case J:
                    return f.createElement($.Z, null);
                  case ee:
                    return f.createElement(Z, {
                      editor: n,
                      buttonKeys: o,
                      showSubMenu: t,
                      disabled: r,
                      setShowSubMenu: s,
                    });
                }
              })(t, h, o, s, n, a)
            )
          );
        },
        X = "bold",
        Y = "italic",
        J = "link",
        ee = "format",
        te = function (e) {
          var t = e.editor,
            n = e.disabled,
            o = e.showSubMenu,
            r = e.setShowSubMenu;
          return 3 === e.editorDepth
            ? f.createElement(
                V.F,
                { tag: "span", scale: "M" },
                f.createElement(G, {
                  key: ee,
                  format: ee,
                  disabled: n,
                  slateEditor: t,
                  subMenuKeys: [X, Y],
                  showSubMenu: o,
                  setShowSubMenu: r,
                })
              )
            : f.createElement(
                V.F,
                { tag: "span", scale: "M" },
                f.createElement(
                  w.xu,
                  { display: "flex" },
                  f.createElement(G, {
                    key: X,
                    format: X,
                    disabled: n,
                    slateEditor: t,
                    showSubMenu: o,
                    setShowSubMenu: r,
                  }),
                  f.createElement(G, {
                    key: Y,
                    format: Y,
                    disabled: n,
                    slateEditor: t,
                    showSubMenu: o,
                    setShowSubMenu: r,
                  })
                )
              );
        },
        ne = n(19537),
        oe = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : { includeInitialDeltas: !0 },
            n = t.includeInitialDeltas,
            o = [],
            r = e.split("\n");
          return (
            n &&
              (o = [
                { type: 8, index: 0, section: { name: re(), startIndex: 0 } },
              ]),
            r.forEach(function (e, t) {
              o.push({
                type: 1,
                paragraph: { markups: [], name: re(), text: e, type: 1 },
                verifySameName: !1,
                index: t,
              });
            }),
            o
          );
        },
        re = function () {
          return Math.round(65535 * Math.random())
            .toString(16)
            .padStart(4, "0");
        },
        se = n(53976),
        ie = n(34675),
        ae = n(62181),
        le = n(98281),
        ue = n(42933),
        ce = n(36544),
        de = function (e) {
          var t = e.isVisible,
            n = e.hide,
            o = (0, ie.Hk)().value;
          return f.createElement(ce.C, null, function (e) {
            var r = e.mutate;
            return f.createElement(
              w.QH,
              {
                confirmText: "Resend verification email",
                hide: n,
                isVisible: t,
                isDestructiveAction: !1,
                onConfirm: function () {
                  r();
                },
                showCancelButton: !1,
                titleText: "Commenting requires a verified email address",
              },
              "Click below to send a new verification email to ",
              null == o ? void 0 : o.unverifiedEmail,
              "."
            );
          });
        },
        pe = n(27599),
        fe = n(27572),
        me = n(67297),
        he = n(27952),
        ve = n(29035);
      function Ee(e, t) {
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
      function be(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Ee(Object(n), !0).forEach(function (t) {
                c()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Ee(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var ge =
          "The author has closed discussion for this story. We are unable to save changes to your response.",
        Re = function () {
          return { "& button": { border: "none" } };
        },
        xe = "400ms",
        ye = "300ms",
        Se = function (e, t) {
          var n = be(be({}, t), {}, { display: "flex" });
          return be(
            be({}, n),
            {},
            e
              ? {
                  transition: "opacity ".concat(xe, ", max-height ").concat(xe),
                  opacity: 1,
                  maxHeight: "100px",
                }
              : {
                  transition: "opacity ".concat(xe, ", max-height ").concat(xe),
                  opacity: 0,
                  maxHeight: 0,
                }
          );
        },
        Pe = function (e) {
          return e
            ? { transition: "min-height ".concat(xe), minHeight: "100px" }
            : { transition: "min-height ".concat(xe), minHeight: "15px" };
        },
        Ie = function (e) {
          var t,
            n = e.postId,
            o = e.responseId,
            s = e.createdAt,
            a = e.isPublishingResponse,
            u = e.disableReplyButton,
            c = void 0 !== u && u,
            d = e.publishResponse,
            T = e.saveResponse,
            D =
              void 0 === T
                ? function () {
                    return Promise.resolve();
                  }
                : T,
            C = e.type,
            k = void 0 === C ? ne.H.create : C,
            L = e.onClose,
            B =
              void 0 === L
                ? l()(
                    i().mark(function e() {
                      return i().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return e.abrupt("return", {});
                            case 1:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  )
                : L,
            A = e.inResponseToQuote,
            H = e.initialValue,
            Q = e.placeholder,
            F = void 0 === Q ? "What are your thoughts?" : Q,
            U = e.editorOpenByDefault,
            z = void 0 !== U && U,
            q = e.showEditorHeader,
            K = void 0 === q || q,
            $ = e.showPublishCheckbox,
            W = void 0 !== $ && $,
            Z = e.responseDistribution,
            G = void 0 === Z ? _.Et.NOT_DISTRIBUTED : Z,
            X = e.toggleResponseDistribution,
            Y = void 0 === X ? function () {} : X,
            J = k === ne.H.edit,
            ee = (0, O.Iq)(),
            re = (0, pe.Av)(),
            ce = (0, fe.pK)(),
            Ee = (0, O.Fg)(),
            ge = !!(0, se.V)({
              name: "enable_lite_response_markup",
              placeholder: !1,
            }),
            Ie = (0, ve.rO)(navigator.userAgent),
            Te = k === ne.H.edit,
            we = (0, v.c8)().value,
            Oe = (0, x.Vz)([x.Fm]),
            De = Oe.editor,
            Ce = Oe.renderLeaf,
            ke = Oe.renderElement,
            Ne = (0, y.X)(De),
            Le = null === De.selection,
            _e = f.useState(!1),
            Be = r()(_e, 2),
            Me = Be[0],
            je = Be[1],
            Ae = f.useContext(I.H).threadDepthOnPage + +!J,
            He = f.useState(J || z),
            Ve = r()(He, 2),
            Qe = Ve[0],
            Fe = Ve[1],
            Ue = f.useState(!0),
            ze = r()(Ue, 2),
            qe = ze[0],
            Ke = ze[1],
            $e = f.useState(null),
            We = r()($e, 2),
            Ze = We[0],
            Ge = We[1],
            Xe = f.useState(!1),
            Ye = r()(Xe, 2),
            Je = Ye[0],
            et = Ye[1],
            tt = f.useState(
              (t = H)
                ? t.paragraphs
                    .map(function (e) {
                      return e.text;
                    })
                    .join("\n")
                : ""
            ),
            nt = r()(tt, 2),
            ot = nt[0],
            rt = nt[1],
            st = f.useRef(m.Node.string(De)),
            it = f.useState(void 0),
            at = r()(it, 2),
            lt = at[0],
            ut = at[1],
            ct = f.useState(!1),
            dt = r()(ct, 2),
            pt = dt[0],
            ft = dt[1],
            mt = f.useCallback(function () {
              return ft(!1);
            }, []),
            ht = (0, me.v9)(function (e) {
              return e.config.authDomain;
            }),
            vt = (0, ie.Hk)().value,
            Et = f.useCallback(
              function () {
                B().then(function (e) {
                  e.preventStateUpdate || (Fe(!1), Ie ? rt("") : (0, R.oe)(De));
                });
              },
              [Fe]
            ),
            bt = f.useCallback(
              function () {
                return Ie
                  ? oe(ot, J ? { includeInitialDeltas: !1 } : void 0)
                  : (0, R.wB)(De, J ? { includeInitialDeltas: !1 } : void 0);
              },
              [ot, J]
            );
          if (
            (f.useEffect(
              function () {
                A && Fe(!0);
              },
              [A]
            ),
            f.useEffect(
              function () {
                var e = m.Node.string(De);
                Ke(e.trim().length <= 0);
                var t = bt();
                et(!p()(Ze, t)), e !== st.current && je(!1), (st.current = e);
              },
              [we]
            ),
            f.useEffect(
              function () {
                var e = bt();
                Ge(e);
              },
              [H]
            ),
            f.useEffect(
              function () {
                Qe &&
                  !Ie &&
                  (z || Te || h.F3.blur(De),
                  setTimeout(function () {
                    return h.F3.focus(De);
                  }, 0));
              },
              [Qe]
            ),
            lt)
          )
            return (
              re.event("inlineEditor.expand", {
                postId: n,
                context: b.r.INLINE_POST_RESPONSE,
                source: ce,
              }),
              f.createElement(P.l, { to: (0, he.d0A)(ht, lt) })
            );
          var gt,
            Rt,
            xt,
            yt = f.createElement(
              "div",
              {
                className: ee(
                  Se(Qe, { padding: "0 14px", alignSelf: "flex-end" })
                ),
              },
              (ge || !W) &&
                f.createElement(
                  "div",
                  { className: ee(Re) },
                  f.createElement(
                    w.zx,
                    {
                      buttonStyle: "SUBTLE",
                      size: "SMALL",
                      onClick: function () {
                        return Et();
                      },
                    },
                    "Cancel"
                  )
                ),
              f.createElement(
                w.zx,
                {
                  buttonStyle: "STRONG",
                  size: "SMALL",
                  disabled: qe || a || !Je || c,
                  onClick: function () {
                    var e = Ie
                      ? oe(ot, J ? { includeInitialDeltas: !1 } : void 0)
                      : (0, R.wB)(
                          De,
                          J ? { includeInitialDeltas: !1 } : void 0
                        );
                    null != vt && vt.unverifiedEmail ? ft(!0) : d(e, Et);
                  },
                },
                J ? "Update" : "Respond"
              )
            ),
            St = f.createElement(te, {
              editor: De,
              disabled: Le,
              showSubMenu: Me,
              setShowSubMenu: je,
              editorDepth: Ae,
            }),
            Pt = f.createElement(
              "span",
              {
                role: "checkbox",
                "aria-checked": G === _.Et.DISTRIBUTED,
                tabIndex: 0,
                onMouseDown: function (e) {
                  e.preventDefault(), Le || Y();
                },
                onKeyDown: function (e) {
                  !Le && e && "Enter" === e.key && Y();
                },
              },
              f.createElement(
                w.XZ,
                {
                  checked: G === _.Et.DISTRIBUTED,
                  textColor: "LIGHTER",
                  textScale: "S",
                  checkboxStyle: "OBVIOUS",
                  marginRight: "8px",
                  disabled: Le,
                },
                "Also publish to my profile"
              )
            );
          return f.createElement(
            ue.x,
            { marginBottom: z ? "0" : "20px", padding: J ? "0" : "0 24px" },
            f.createElement(
              "div",
              {
                className: ee({
                  backgroundColor: "white",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: Qe ? "14px" : "0",
                  paddingBottom: Qe ? "14px" : "0",
                  transition: "padding-top "
                    .concat(xe, ", padding-bottom ")
                    .concat(xe),
                }),
              },
              vt &&
                K &&
                f.createElement(
                  "div",
                  {
                    className: ee(
                      ((Rt = Qe),
                      (xt = {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                        padding: "0 14px",
                      }),
                      be(
                        be({}, xt),
                        {},
                        Rt
                          ? {
                              transition: "opacity "
                                .concat(xe, ", max-height ")
                                .concat(xe, ", margin-bottom ")
                                .concat(xe),
                              opacity: 1,
                              maxHeight: "100px",
                              marginBottom: "6px",
                            }
                          : {
                              transition: "opacity "
                                .concat(ye, ", max-height ")
                                .concat(ye, ", margin-bottom ")
                                .concat(ye),
                              opacity: 0,
                              maxHeight: 0,
                              marginBottom: "0",
                            }
                      ))
                    ),
                  },
                  f.createElement(
                    ue.x,
                    { display: "flex", alignItems: "center" },
                    f.createElement(le.Yt, { scale: "XS", user: vt }),
                    f.createElement(
                      ue.x,
                      {
                        marginLeft: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      },
                      f.createElement(
                        V.F,
                        { scale: "M", color: "DARKER" },
                        vt.name
                      ),
                      J &&
                        s &&
                        f.createElement(
                          V.F,
                          { scale: "M", color: "LIGHTER" },
                          f.createElement(S.b, { timestamp: s })
                        )
                    )
                  ),
                  Qe &&
                    !W &&
                    f.createElement(
                      ue.x,
                      { display: "flex", justifyContent: "flex-end" },
                      f.createElement(N, {
                        isEdit: J,
                        setDraftResponseId: (function (e) {
                          function t() {
                            return e.apply(this, arguments);
                          }
                          return (
                            (t.toString = function () {
                              return e.toString();
                            }),
                            t
                          );
                        })(function () {
                          return ut(o);
                        }),
                        saveResponse: function () {
                          var e = Ie ? oe(ot) : (0, R.wB)(De);
                          return D(e, ut);
                        },
                      })
                    )
                ),
              Qe && f.createElement(M, { quote: A }),
              f.createElement(
                ue.x,
                { display: "flex", flexDirection: "column" },
                vt
                  ? f.createElement(
                      "div",
                      { className: ee(Pe(Qe)) },
                      Ie
                        ? f.createElement(j, {
                            onFocus: function () {
                              return Fe(!0);
                            },
                            responseContent: ot,
                            setIsEmpty: Ke,
                            setResponseContent: rt,
                            isEditorOpen: Qe,
                          })
                        : f.createElement(
                            ue.x,
                            { padding: "14px" },
                            f.createElement(
                              g.c,
                              { editor: De },
                              f.createElement(E.O, {
                                onFocus: function () {
                                  return Fe(!0);
                                },
                                onBlur: function () {
                                  return je(!1);
                                },
                                onClick: function () {
                                  return je(!1);
                                },
                                renderLeaf: Ce,
                                renderElement: ke,
                                placeholder: F,
                                onKeyDown: function (e) {
                                  ge && Ne(e);
                                },
                              })
                            )
                          )
                    )
                  : f.createElement(
                      ae.R9,
                      { operation: "register", susiEntry: "respond_sidebar" },
                      f.createElement(
                        ue.x,
                        { padding: "14px" },
                        f.createElement(
                          V.F,
                          { scale: "M", color: "LIGHTER" },
                          "What are your thoughts?"
                        )
                      )
                    ),
                (gt = ge ? St : W ? Pt : null)
                  ? f.createElement(
                      "div",
                      {
                        className: ee(
                          Se(Qe, {
                            justifyContent: "space-between",
                            marginLeft: "10px",
                            color: Ee.baseColor.text.lighter,
                          })
                        ),
                      },
                      gt,
                      yt
                    )
                  : yt
              )
            ),
            f.createElement(de, { isVisible: pt, hide: mt }),
            ge &&
              W &&
              f.createElement(
                "div",
                { className: ee(Se(Qe, { marginTop: "14px" })) },
                Pt
              )
          );
        };
    },
    41882: (e, t, n) => {
      "use strict";
      n.r(t),
        n.d(t, {
          WithResponsesSidebar: () => dt,
          WithResponsesSidebar_post: () => pt,
        });
      var o = n(28655),
        r = n.n(o),
        s = n(319),
        i = n.n(s),
        a = n(63038),
        l = n.n(a),
        u = n(38125),
        c = n.n(u),
        d = n(71439),
        p = n(67294),
        f = n(86156),
        m = n(45893),
        h = n(59713),
        v = n.n(h),
        E = n(46829),
        b = n(2074),
        g = n(23450),
        R = n.n(g),
        x = n(26600),
        y = n(78067),
        S = n(54803),
        P = n(51176),
        I = n(14267),
        T = n(78873),
        w = n(19537),
        O = n(68356),
        D = n.n(O),
        C = n(52383),
        k = n(90320);
      function N(e, t) {
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
      function L(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? N(Object(n), !0).forEach(function (t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : N(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var _ = {
          delay: 1e3,
          timeout: 2e4,
          loading: function (e) {
            return e.error
              ? p.createElement(C.C, { error: e.error })
              : e.timedOut
              ? p.createElement(C.C, {
                  error: new Error("Loadable Screen component has timed out"),
                })
              : e.pastDelay
              ? p.createElement(k.a, null)
              : null;
          },
        },
        B = D()(
          L(
            L({}, _),
            {},
            {
              loader: function () {
                return n.e(6635).then(n.bind(n, 91229));
              },
              modules: [
                "src/components/responses/editor/ThreadedInlineResponseEditor",
              ],
              webpack: function () {
                return [91229];
              },
              render: function (e, t) {
                var n = e.ThreadedInlineResponseEditor;
                return p.createElement(n, t);
              },
            }
          )
        ),
        M = function (e) {
          var t = e.parentPostId,
            n = e.responseId,
            o = e.type,
            r = void 0 === o ? w.H.create : o,
            s = e.initialValue;
          return p.createElement(B, {
            parentPostId: t,
            responseId: n,
            type: r,
            initialValue: s,
          });
        },
        j = n(27572);
      function A() {
        var e = r()([
          "\n  fragment ReadOrEditSimpleResponse_post on Post {\n    id\n    ...SimpleResponse_post\n  }\n  ",
          "\n",
        ]);
        return (
          (A = function () {
            return e;
          }),
          e
        );
      }
      var H = function (e) {
          var t,
            n = e.responsePost,
            o = e.index,
            r = e.parentPost,
            s = e.omitBottomBorder,
            a = p.useState(!1),
            u = l()(a, 2),
            c = u[0],
            d = u[1],
            f = p.useState(null),
            m = l()(f, 2),
            h = m[0],
            v = m[1],
            E = p.useContext(I.D),
            b = E.editingResponsesAtIndices,
            g = E.setEditingResponsesAtIndices;
          return (
            p.useEffect(
              function () {
                if (
                  (c && !b.includes(o) && g([].concat(i()(b), [o])),
                  !c && b.includes(o))
                ) {
                  var e = b.filter(function (e) {
                    return e !== o;
                  });
                  g(e);
                }
              },
              [c, b, g]
            ),
            n
              ? c
                ? p.createElement(
                    P.Q.Provider,
                    {
                      value: {
                        isEditing: c,
                        setIsEditing: d,
                        latestRev: null == n ? void 0 : n.latestRev,
                        createdAt: null == n ? void 0 : n.createdAt,
                        setEditingQuote: v,
                        editingQuote: h,
                      },
                    },
                    p.createElement(
                      j.cW,
                      { source: { index: o }, key: n.id, extendSource: !0 },
                      p.createElement(M, {
                        type: w.H.edit,
                        parentPostId: r.id,
                        responseId: n.id,
                        initialValue:
                          null == n || null === (t = n.content) || void 0 === t
                            ? void 0
                            : t.bodyModel,
                      })
                    )
                  )
                : p.createElement(
                    P.Q.Provider,
                    {
                      value: {
                        isEditing: c,
                        setIsEditing: d,
                        setEditingQuote: v,
                        editingQuote: h,
                      },
                    },
                    p.createElement(
                      j.cW,
                      { source: { index: o }, key: n.id, extendSource: !0 },
                      p.createElement(T.OT, {
                        parentPost: r,
                        simpleResponse: n,
                        omitBottomBorder: s,
                      })
                    )
                  )
              : null
          );
        },
        V = (0, d.Ps)(A(), T.DM),
        Q = n(85432),
        F = n(28309),
        U = {
          "0%": { opacity: "0.8" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "0.8" },
        },
        z = function () {
          var e = (0, F.om)({ shimmerKeyframesName: U }).shimmerKeyframesName,
            t = (0, F.Iq)();
          return p.createElement(
            "div",
            {
              className: t(function () {
                return {
                  animation: "".concat(e, " 1.2s ease-in-out infinite"),
                  padding: "32px 0",
                };
              }),
            },
            p.createElement(
              Q.xu,
              { display: "flex", flexDirection: "row" },
              p.createElement(Q.xu, {
                height: "32px",
                width: "32px",
                borderRadius: "100%",
                backgroundColor: "BASE_NORMAL",
              }),
              p.createElement(
                Q.xu,
                { marginLeft: "8px", marginTop: "4px" },
                p.createElement(Q.xu, {
                  height: "8px",
                  width: "120px",
                  marginBottom: "8px",
                  backgroundColor: "BASE_NORMAL",
                }),
                p.createElement(Q.xu, {
                  height: "8px",
                  width: "80px",
                  backgroundColor: "BASE_NORMAL",
                })
              )
            ),
            p.createElement(
              Q.xu,
              { marginTop: "12px" },
              p.createElement(Q.xu, {
                height: "10px",
                width: "100%",
                marginBottom: "8px",
                backgroundColor: "BASE_NORMAL",
              }),
              p.createElement(Q.xu, {
                height: "10px",
                width: "100%",
                marginBottom: "8px",
                backgroundColor: "BASE_NORMAL",
              }),
              p.createElement(Q.xu, {
                height: "10px",
                width: "90%",
                backgroundColor: "BASE_NORMAL",
              })
            )
          );
        },
        q = n(3714),
        K = n(9216),
        $ = n(64504),
        W = n(15699),
        Z = n(14391),
        G = n(81162),
        X = n(14349),
        Y = n(27390),
        J = n(27952),
        ee = n(51151),
        te = n(26912);
      function ne() {
        var e = r()([
          "\n  fragment StoryResponse_post on Post {\n    id\n    ...ResponseHeader_post\n  }\n  ",
          "\n",
        ]);
        return (
          (ne = function () {
            return e;
          }),
          e
        );
      }
      function oe(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
        return o;
      }
      var re = function (e) {
          return { fill: e.baseColor.fill.lighter, float: "right" };
        },
        se = function (e) {
          var t,
            n,
            o = e.storyResponse,
            r = e.parentPost,
            s = e.omitBottomBorder,
            i = (0, F.Iq)(),
            a = (0, F.Fg)(),
            l = o.creator,
            u = o.previewContent,
            c = o.mediumUrl,
            d = o.clapCount,
            f = o.responsesCount,
            m =
              null == u || null === (t = u.bodyModel) || void 0 === t
                ? void 0
                : t.paragraphs;
          if (!(l && u && u.bodyModel && c && m)) return null;
          var h = (function (e) {
            var t,
              n = [],
              o = (function (e, t) {
                var n;
                if (
                  "undefined" == typeof Symbol ||
                  null == e[Symbol.iterator]
                ) {
                  if (
                    Array.isArray(e) ||
                    (n = (function (e, t) {
                      if (e) {
                        if ("string" == typeof e) return oe(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return (
                          "Object" === n &&
                            e.constructor &&
                            (n = e.constructor.name),
                          "Map" === n || "Set" === n
                            ? Array.from(e)
                            : "Arguments" === n ||
                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                            ? oe(e, t)
                            : void 0
                        );
                      }
                    })(e)) ||
                    (t && e && "number" == typeof e.length)
                  ) {
                    n && (e = n);
                    var o = 0,
                      r = function () {};
                    return {
                      s: r,
                      n: function () {
                        return o >= e.length
                          ? { done: !0 }
                          : { done: !1, value: e[o++] };
                      },
                      e: function (e) {
                        throw e;
                      },
                      f: r,
                    };
                  }
                  throw new TypeError(
                    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                  );
                }
                var s,
                  i = !0,
                  a = !1;
                return {
                  s: function () {
                    n = e[Symbol.iterator]();
                  },
                  n: function () {
                    var e = n.next();
                    return (i = e.done), e;
                  },
                  e: function (e) {
                    (a = !0), (s = e);
                  },
                  f: function () {
                    try {
                      i || null == n.return || n.return();
                    } finally {
                      if (a) throw s;
                    }
                  },
                };
              })(e);
            try {
              for (o.s(); !(t = o.n()).done; ) {
                var r = t.value;
                if (r.text && (n.push(r), n.length >= 2)) break;
              }
            } catch (e) {
              o.e(e);
            } finally {
              o.f();
            }
            return { title: n[0], subtitle: n[1] };
          })(m);
          if (!h.title && !h.subtitle) return null;
          var v,
            E =
              null !==
              (null === (n = o.inResponseToMediaResource) || void 0 === n
                ? void 0
                : n.mediumQuote),
            b = f || 0;
          return p.createElement(
            W.o,
            {
              post: o,
              presentationContext: "POST_PREVIEW",
              isDisplayingFullPost: !1,
            },
            p.createElement(
              Q.xu,
              {
                paddingTop: "25px",
                paddingBottom: "20px",
                borderBottom: s ? void 0 : "BASE_LIGHTER",
              },
              p.createElement(q.E, {
                response: o,
                responseType: te.Q.STORY,
                parentPost: r,
              }),
              p.createElement(ee.J, {
                inResponseToMediaResource: o.inResponseToMediaResource,
              }),
              p.createElement(
                Q.P3,
                { href: (0, J.jVf)(o) },
                p.createElement(
                  "div",
                  {
                    className: i({
                      boxShadow: "0px 1px 4px rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "3px",
                      padding: "12px",
                      marginTop: E ? "12px" : "16px",
                      backgroundColor: a.backgroundColor,
                    }),
                  },
                  p.createElement(
                    "div",
                    { className: i(re) },
                    p.createElement(
                      $.F,
                      { scale: "S", color: "LIGHTER", tag: "div" },
                      p.createElement(
                        Q.xu,
                        {
                          display: "flex",
                          flexGrow: "0",
                          alignItems: "center",
                          marginLeft: d > 0 || b > 0 ? "20px" : "0",
                        },
                        d > 0
                          ? p.createElement(
                              Q.xu,
                              { display: "flex", alignItems: "center" },
                              p.createElement(Q.xu, {
                                tag: G.Z,
                                marginRight: "2px",
                              }),
                              p.createElement("div", null, (0, Y.pY)(d))
                            )
                          : null,
                        b > 0
                          ? p.createElement(
                              Q.xu,
                              { display: "flex", alignItems: "center" },
                              p.createElement(Q.xu, {
                                tag: X.Z,
                                marginLeft: d ? "8px" : "0",
                                marginRight: "2px",
                              }),
                              p.createElement("div", null, (0, Y.pY)(b))
                            )
                          : null
                      )
                    )
                  ),
                  p.createElement(
                    $.F,
                    { scale: "M", clamp: 2, color: "DARKER" },
                    h.title && p.createElement(Q.xu, null, h.title.text),
                    h.subtitle &&
                      p.createElement(
                        "div",
                        {
                          className: i(
                            ((v = h.title.type),
                            function (e) {
                              return {
                                color:
                                  v === Z.NJ.H3
                                    ? e.baseColor.text.lighter
                                    : e.baseColor.text.normal,
                              };
                            })
                          ),
                        },
                        h.subtitle.text
                      )
                  )
                )
              )
            )
          );
        },
        ie = (0, d.Ps)(ne(), K.F),
        ae = n(54260),
        le = n(9471),
        ue = n(22091),
        ce = n(27599);
      function de(e, t) {
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
      function pe(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? de(Object(n), !0).forEach(function (t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : de(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var fe = function (e, t) {
          return {
            marginBottom: t ? "0px" : "24px",
            marginLeft: "12px",
            borderLeft: "3px solid ".concat(e.baseColor.border.lighter),
          };
        },
        me = function (e) {
          var t,
            n,
            o,
            r,
            s,
            a,
            u = e.reply,
            c = e.parentPost,
            d = e.bottomBorder,
            m = e.index,
            h = e.inResponseToPostId,
            v = e.threadDepthOnPage,
            g = void 0 === v ? 1 : v,
            P = e.threadDepthFromRootPost,
            T = e.showCreateReplyEditor,
            w = void 0 !== T && T,
            O = (0, F.Iq)(),
            D = (0, F.Fg)(),
            C = (0, j.pK)(),
            k = (0, ce.Av)(),
            N =
              null !== (t = u.threadedPostResponses) &&
              void 0 !== t &&
              t.autoExpandedPostIds
                ? i()(u.threadedPostResponses.autoExpandedPostIds)
                : [],
            L = p.useState(Boolean(N.length)),
            _ = l()(L, 2),
            B = _[0],
            M = _[1],
            A = p.useContext(I.D),
            V = A.responsesLocked,
            Q = A.isLockedResponse,
            U = A.inResponseToQuote,
            q = A.setInResponseToQuote,
            K = A.setIsSavingResponse,
            W = A.sidebarRef,
            Z = A.responseDistribution,
            G = A.setResponseDistribution,
            X = A.responseSortType,
            Y = A.rootPostId,
            J = A.isResponsesSidebarVisible,
            ee = p.useContext(f.f).addContinueThisThreadSidebar,
            te = p.useState([]),
            ne = l()(te, 2),
            oe = ne[0],
            re = ne[1],
            ie = p.useRef(null),
            de = null === (n = u.creator) || void 0 === n ? void 0 : n.name;
          de && (a = "Replying to ".concat(de));
          var pe = (0, E.useLazyQuery)(b.A, {
              variables: {
                postId: u.id,
                postResponsesPaging: { limit: 10 },
                sortType: X,
              },
              ssr: !1,
            }),
            me = l()(pe, 2),
            Ee = me[0],
            be = me[1],
            ge = be.called,
            Re = be.data,
            xe = be.loading,
            ye = be.fetchMore;
          p.useEffect(function () {
            var e;
            null != ie &&
              null !== (e = ie.current) &&
              void 0 !== e &&
              e.getBoundingClientRect &&
              ie.current.getBoundingClientRect().bottom > window.innerHeight &&
              ie.current.scrollIntoView({ behavior: "smooth", block: "end" });
          }, []);
          var Se =
            null == Re || null === (o = Re.post) || void 0 === o
              ? void 0
              : o.threadedPostResponses;
          B && !ge && Ee();
          var Pe,
            Ie = (null == Se ? void 0 : Se.posts) || [],
            Te =
              (null === (r = u.postResponses) || void 0 === r
                ? void 0
                : r.count) || 0,
            we = (function (e, t, n, o) {
              var r = t.length,
                s = n.length;
              return r && e ? o - r : s ? o - s : 0;
            })(B, N, Ie, Te),
            Oe = we > 0,
            De =
              null == Se || null === (s = Se.pagingInfo) || void 0 === s
                ? void 0
                : s.next;
          return (
            De &&
              (Pe = function () {
                ye &&
                  ye({
                    variables: {
                      postId: u.id,
                      postResponsesPaging: { limit: De.limit, to: De.to },
                    },
                    updateQuery: function (e, t) {
                      var n = t.fetchMoreResult;
                      return he(e, n);
                    },
                  });
              }),
            p.createElement(ue.Bn, { initialVisibility: B }, function (e) {
              var t = e.isVisible,
                n = e.toggle,
                o = e.show;
              return p.createElement(
                ue.Bn,
                { initialVisibility: w },
                function (e) {
                  var r,
                    s = e.isVisible,
                    i = e.hide,
                    l = e.toggle;
                  return p.createElement(
                    ue.xu,
                    {
                      borderBottom: d ? "BASE_LIGHTER" : "NONE",
                      marginLeft: "24px",
                      marginRight: g > 1 ? "0" : "24px",
                    },
                    p.createElement(
                      ae.H.Provider,
                      {
                        value: {
                          inResponseToPostId: h,
                          isThreadedResponsesVisible: t,
                          toggleThreadedResponses: function () {
                            ge || Ee(), M(!1), n();
                          },
                          showThreadedResponses: function () {
                            ge ||
                              (Ee(),
                              k.event("response.expanded", {
                                postId: u.id,
                                parentPostId: h,
                                rootPostId: Y,
                                threadDepth: P,
                                context: y.r.INLINE_POST_RESPONSE,
                                source: C,
                              })),
                              M(!1),
                              o();
                          },
                          threadDepthFromRootPost: P,
                          threadDepthOnPage: g,
                          hideCreateReply: i,
                          toggleCreateReply: l,
                          loadThreadedResponses: Ee,
                          isThreadedResponsesQueryCalled: ge,
                          isThreadedResponsesQueryLoading: xe,
                          showContinueThisThreadSidebar: function () {
                            ee(u);
                          },
                        },
                      },
                      p.createElement(
                        "div",
                        { ref: 0 === m ? ie : void 0 },
                        (0, S.qW)(u)
                          ? p.createElement(H, {
                              responsePost: u,
                              index: m,
                              parentPost: c,
                              omitBottomBorder: !0,
                            })
                          : p.createElement(
                              j.cW,
                              {
                                source: { index: m },
                                key: u.id,
                                extendSource: !0,
                              },
                              p.createElement(se, {
                                storyResponse: u,
                                parentPost: c,
                                omitBottomBorder: !0,
                              })
                            )
                      ),
                      s &&
                        p.createElement(
                          "div",
                          { className: O(fe(D, t)) },
                          p.createElement(
                            j.cW,
                            {
                              source: { susiEntry: "respond_sidebar" },
                              extendSource: !0,
                            },
                            p.createElement(
                              x.zg,
                              null,
                              p.createElement(le.Z, {
                                parentPostId: u.id,
                                hideReplyEditing: i,
                                placeholder: a,
                                showEditorHeader: !1,
                              })
                            )
                          )
                        )
                    ),
                    t &&
                      p.createElement(
                        "div",
                        { className: O(fe(D, Oe)) },
                        xe &&
                          p.createElement(
                            ue.xu,
                            { marginLeft: "24px" },
                            p.createElement(z, null)
                          ),
                        (null == Se ? void 0 : Se.posts) &&
                          (null == Se || null === (r = Se.posts) || void 0 === r
                            ? void 0
                            : r.length) > 0 &&
                          p.createElement(
                            I.D.Provider,
                            {
                              value: {
                                setIsSavingResponse: K,
                                responsesLocked: V,
                                isLockedResponse: Q,
                                editingResponsesAtIndices: oe,
                                setEditingResponsesAtIndices: re,
                                inResponseToQuote: U,
                                setInResponseToQuote: q,
                                sidebarRef: W,
                                responseDistribution: Z,
                                setResponseDistribution: G,
                                responseSortType: X,
                                rootPostId: Y,
                                isResponsesSidebarVisible: J,
                              },
                            },
                            p.createElement(ve, {
                              replies: Se,
                              parentPost: c,
                              inResponseToPostId: u.id,
                              threadDepthOnPage: g + 1,
                              threadDepthFromRootPost: P + 1,
                              isShowAutoExpandedResponse: B,
                              autoExpandedResponseIds: N,
                            })
                          )
                      ),
                    Oe &&
                      (t || B) &&
                      p.createElement(
                        ue.xu,
                        {
                          marginTop: "10px",
                          marginLeft: "24px",
                          marginBottom: "24px",
                        },
                        p.createElement(
                          $.F,
                          { color: "ACCENT", scale: "M" },
                          p.createElement(
                            ue.rU,
                            {
                              linkStyle: "OBVIOUS",
                              onClick: function () {
                                B ? (M(!1), o()) : Pe();
                              },
                            },
                            (function (e, t) {
                              return e
                                ? "Show "
                                    .concat(t, " more ")
                                    .concat(R()("reply", t))
                                : "Load more replies (".concat(t, ")");
                            })(B, we)
                          )
                        )
                      )
                  );
                }
              );
            })
          );
        },
        he = function (e, t) {
          var n,
            o,
            r,
            s,
            a,
            l,
            u =
              null == t || null === (n = t.post) || void 0 === n
                ? void 0
                : n.threadedPostResponses,
            c = null == t ? void 0 : t.post,
            d =
              null == t || null === (o = t.post) || void 0 === o
                ? void 0
                : o.threadedPostResponses;
          if (!(c && u && u.posts && d)) return e;
          var p =
              (null == e ||
              null === (r = e.post) ||
              void 0 === r ||
              null === (s = r.threadedPostResponses) ||
              void 0 === s
                ? void 0
                : s.posts) || [],
            f =
              (null == t ||
              null === (a = t.post) ||
              void 0 === a ||
              null === (l = a.threadedPostResponses) ||
              void 0 === l
                ? void 0
                : l.posts) || [];
          return {
            post: pe(
              pe({}, c),
              {},
              {
                threadedPostResponses: pe(
                  pe({}, d),
                  {},
                  { posts: [].concat(i()(p), i()(f)) }
                ),
              }
            ),
          };
        },
        ve = function (e) {
          var t = e.replies,
            n = e.parentPost,
            o = e.inResponseToPostId,
            r = e.threadDepthFromRootPost,
            s = e.threadDepthOnPage,
            a = void 0 === s ? 1 : s,
            l = e.displayBottomBorder,
            u = void 0 !== l && l,
            c = e.isShowAutoExpandedResponse,
            d = void 0 !== c && c,
            f = e.autoExpandedResponseIds,
            m = void 0 === f ? [] : f,
            h = (0, ce.Av)(),
            v = (0, j.pK)(),
            E = p.useContext(I.D),
            b = E.rootPostId,
            g = E.isResponsesSidebarVisible,
            R = E.showCreateReplyEditor,
            x = i()((null == t ? void 0 : t.posts) || []);
          return (
            d &&
              (x = x.filter(function (e) {
                return m.some(function (t) {
                  return t === e.id;
                });
              })),
            p.useEffect(function () {
              d &&
                g &&
                x.forEach(function (e) {
                  h.event("response.autoExpanded", {
                    postId: e.id,
                    parentPostId: o,
                    rootPostId: b,
                    threadDepth: r,
                    context: y.r.INLINE_POST_RESPONSE,
                    source: v,
                  });
                });
            }, []),
            x && 0 !== x.length
              ? p.createElement(
                  ue.xu,
                  null,
                  x.map(function (e, t, s) {
                    if (!e) return null;
                    var i = t !== s.length - 1 || u;
                    return p.createElement(me, {
                      reply: e,
                      parentPost: n,
                      bottomBorder: i,
                      index: t,
                      inResponseToPostId: o,
                      key: e.id,
                      threadDepthFromRootPost: r,
                      threadDepthOnPage: a,
                      showCreateReplyEditor: R && 0 === t,
                    });
                  })
                )
              : null
          );
        },
        Ee = n(85094),
        be = n(33914);
      function ge() {
        return (ge =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      var Re = p.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M11.99 5.04c.26-.21.64-.22.91-.01.97.72 1.77 1.21 2.6 1.54.83.32 1.72.48 2.89.5.41.01.74.35.74.76-.02 3.62-.43 6.26-1.45 8.21-1.03 1.98-2.66 3.21-4.97 4.08a.75.75 0 0 1-.53 0c-2.25-.87-3.86-2.1-4.9-4.07-1.02-1.95-1.46-4.59-1.48-8.22 0-.41.33-.75.75-.76 1.19-.02 2.1-.18 2.92-.5.82-.32 1.6-.81 2.52-1.53zm.46.9c-.9.69-1.71 1.21-2.62 1.56a8.9 8.9 0 0 1-3.02.57c.03 3.45.46 5.82 1.36 7.51.88 1.69 2.25 2.77 4.28 3.57 2.1-.8 3.47-1.89 4.34-3.57.89-1.7 1.3-4.07 1.34-7.51a8.8 8.8 0 0 1-3-.57 11.8 11.8 0 0 1-2.68-1.56zm0 9.15a2.67 2.67 0 1 0 0-5.34 2.67 2.67 0 0 0 0 5.34zm0 1a3.67 3.67 0 1 0 0-7.34 3.67 3.67 0 0 0 0 7.34zm-1.82-3.77l.53-.53.91.92 1.63-1.63.52.53-2.15 2.15-1.44-1.44z",
      });
      const xe = function (e) {
        return p.createElement(
          "svg",
          ge({ width: 25, height: 25, viewBox: "0 0 25 25" }, e),
          Re
        );
      };
      var ye,
        Se = function () {
          var e = (0, F.Iq)();
          return p.createElement(
            be._,
            { tooltipText: "View community guidelines" },
            p.createElement(
              Q.rU,
              {
                href: "https://policy.medium.com/medium-rules-30e5502c4eb4",
                target: "_blank",
                className: e(function (e) {
                  return {
                    fill: e.baseColor.fill.light,
                    ":hover": { fill: e.baseColor.fill.dark },
                  };
                }),
              },
              p.createElement(xe, null)
            )
          );
        };
      function Pe() {
        var e = r()([
          "\n  fragment ThreadedReplies_post on Post {\n    id\n    ...ThreadedReply_post\n  }\n  ",
          "\n",
        ]);
        return (
          (Pe = function () {
            return e;
          }),
          e
        );
      }
      function Ie() {
        var e = r()([
          "\n  fragment ThreadedReply_post on Post {\n    id\n    ...ReadOrEditSimpleResponse_post\n    ...StoryResponse_post\n  }\n  ",
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
      !(function (e) {
        e.RESPONSES_SIDEBAR = "web-inline-responses-sidebar";
      })(ye || (ye = {}));
      var Te = (0, d.Ps)(Ie(), V, ie),
        we = (0, d.Ps)(Pe(), Te),
        Oe = n(34675),
        De = n(6688),
        Ce = n(93394),
        ke = n(32262),
        Ne = n(67297),
        Le = n(31078),
        _e = {
          position: "absolute !important",
          right: "0",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "4px",
          zIndex: "1000",
          backgroundColor: "rgba(255, 255, 255, 1)",
          minWidth: "200px",
        },
        Be = function (e) {
          var t = e.parentPostId,
            n = e.responsesLocked,
            o = e.isPopoverMenuVisible,
            r = e.hidePopoverMenu,
            s = (0, De.I)(),
            i = (0, Ne.v9)(function (e) {
              return e.config.authDomain;
            }),
            a = p.useRef(null);
          return (
            p.useEffect(
              function () {
                var e = function (e) {
                  var t;
                  (null != a &&
                    null !== (t = a.current) &&
                    void 0 !== t &&
                    t.contains(e.target)) ||
                    r();
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
            p.createElement(
              "div",
              { className: s(_e), ref: a },
              p.createElement(
                ke.mX,
                null,
                p.createElement(
                  ke.Sl,
                  null,
                  p.createElement(
                    Q.rU,
                    { href: (0, J.t$b)(i, t) },
                    "Manage responses"
                  )
                ),
                p.createElement(Le.Eq, {
                  parentPostId: t,
                  responsesLocked: n,
                  hidePopoverMenu: r,
                })
              )
            )
          );
        };
      function Me() {
        var e = r()([
          "\n  fragment ManagementPopoverMenuLauncher_post on Post {\n    id\n    collection {\n      id\n      viewerEdge {\n        id\n        isEditor\n      }\n    }\n    creator {\n      id\n    }\n  }\n",
        ]);
        return (
          (Me = function () {
            return e;
          }),
          e
        );
      }
      var je = function (e) {
          return {
            cursor: "pointer",
            border: 0,
            fill: e.baseColor.fill.light,
            ":hover": { fill: e.baseColor.fill.dark },
            ":focus": { outline: "none" },
          };
        },
        Ae = function (e) {
          var t,
            n,
            o = e.parentPost,
            r = e.responsesLocked,
            s = (0, De.I)(),
            i = (0, Oe.Hk)().value,
            a = "managementPopoverMenu",
            u = p.useState(!1),
            c = l()(u, 2),
            d = c[0],
            f = c[1],
            m =
              (null == i ? void 0 : i.id) ===
              (null === (t = o.creator) || void 0 === t ? void 0 : t.id),
            h =
              null == o || null === (n = o.collection) || void 0 === n
                ? void 0
                : n.viewerEdge.isEditor;
          return m || h
            ? p.createElement(
                Q.xu,
                null,
                p.createElement(
                  Q.rU,
                  {
                    ariaControls: a,
                    ariaExpanded: d ? "true" : "false",
                    onClick: function (e) {
                      e.nativeEvent.stopPropagation(), f(!d);
                    },
                    inline: !0,
                    className: s(je),
                  },
                  p.createElement(Ce.Z, null)
                ),
                d &&
                  p.createElement(
                    "div",
                    { id: a, className: s({ position: "relative" }) },
                    p.createElement(
                      j.cW,
                      {
                        source: { susiEntry: "respond_sidebar" },
                        extendSource: !0,
                      },
                      p.createElement(Be, {
                        parentPostId: o.id,
                        responsesLocked: r,
                        isPopoverMenuVisible: d,
                        hidePopoverMenu: function () {
                          return f(!1);
                        },
                      })
                    )
                  )
              )
            : null;
        },
        He = (0, d.Ps)(Me()),
        Ve = n(3149),
        Qe = n(31235);
      function Fe() {
        return (Fe =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      var Ue = p.createElement("path", {
        d: "M13.4 16.96l-6.48-6.48L13.4 4l.8.71-5.77 5.77 5.77 5.77z",
        fillRule: "evenodd",
      });
      const ze = function (e) {
        return p.createElement("svg", Fe({ width: 21, height: 21 }, e), Ue);
      };
      function qe() {
        var e = r()([
          "\n  fragment ThreadedResponsesSidebarContent_post on Post {\n    id\n    postResponses {\n      count\n    }\n    ...ManagementPopoverMenuLauncher_post\n    ...ThreadedReplies_post\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (qe = function () {
            return e;
          }),
          e
        );
      }
      var Ke = {
          height: "80vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontStyle: "italic",
          fontWeight: 200,
        },
        $e = { fontSize: "12px", textTransform: "uppercase" },
        We = function (e) {
          var t,
            n,
            o,
            r,
            s = e.responses,
            i = e.parentPost,
            a = e.responsesLocked,
            u = e.isLockedResponse,
            c = e.isLoadingInitialContent,
            d = e.isFetchingNextSetOfResponses,
            f = e.isResponsesSidebarVisible,
            h = e.closeSidebar,
            E = e.inResponseToQuote,
            b = e.setInResponseToQuote,
            g = e.sidebarRef,
            R = e.responseDistribution,
            x = e.setResponseDistribution,
            y = e.responseSortType,
            S = e.setResponseSortType,
            P = e.rootPostId,
            T = e.postDepth,
            w = e.isContinueThisThread,
            O = e.showPreviousSidebar,
            D = e.showCreateReplyEditor,
            C = void 0 !== D && D,
            k = (0, F.Iq)(),
            N = (0, ce.Av)(),
            L = (0, j.pK)(),
            _ = (0, Qe.xg)(),
            B = p.useState(!1),
            A = l()(B, 2),
            H = A[0],
            V = A[1],
            U = p.useState([]),
            q = l()(U, 2),
            K = q[0],
            W = q[1],
            G = i.id,
            X =
              (null === (t = i.postResponses) || void 0 === t
                ? void 0
                : t.count) || 0,
            Y = w
              ? "Replies"
              : "Responses" + (X > 0 ? " (".concat(X, ")") : ""),
            J = s,
            ee =
              null == s || null === (n = s.pagingInfo) || void 0 === n
                ? void 0
                : n.next,
            te = (null == s ? void 0 : s.posts) && X && s.posts.length < X,
            ne = Boolean(d && ee && te),
            oe =
              ((o = {}),
              v()(o, Z.sV.TOP, "Most relevant"),
              v()(o, Z.sV.REVERSE_CHRON, "Most recent"),
              o),
            re = [
              { label: oe[Z.sV.TOP], value: Z.sV.TOP, index: 0 },
              {
                label: oe[Z.sV.REVERSE_CHRON],
                value: Z.sV.REVERSE_CHRON,
                index: 1,
              },
            ],
            se = re.findIndex(function (e) {
              return e.value === y;
            }),
            ie = p.useState(re[se]),
            ae = l()(ie, 2),
            le = ae[0],
            ue = ae[1];
          return p.createElement(
            I.D.Provider,
            {
              value: {
                setIsSavingResponse: V,
                responsesLocked: a,
                isLockedResponse: u,
                editingResponsesAtIndices: K,
                setEditingResponsesAtIndices: W,
                inResponseToQuote: E,
                setInResponseToQuote: b,
                sidebarRef: g,
                responseDistribution: R,
                setResponseDistribution: x,
                responseSortType: y,
                rootPostId: P,
                isResponsesSidebarVisible: f,
                showCreateReplyEditor: C,
              },
            },
            f &&
              H &&
              p.createElement(Q.TF, {
                horizontalOverride: { left: "calc(100vw - ".concat(m.ZR, ")") },
              }),
            p.createElement(
              Q.xu,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
                paddingBottom: "18px",
              },
              p.createElement(
                Q.xu,
                { display: "flex", flexDirection: "row" },
                w &&
                  p.createElement(
                    Q.xu,
                    { paddingRight: "18px" },
                    p.createElement(
                      $.X6,
                      { scale: "S" },
                      p.createElement(
                        Q.rU,
                        {
                          onClick: O,
                          "data-testid": "back-button",
                          "aria-label": "back",
                        },
                        p.createElement(ze, { height: "26px", width: "26px" })
                      )
                    )
                  ),
                p.createElement($.X6, { scale: "S" }, Y)
              ),
              p.createElement(
                Q.xu,
                { display: "flex", flexDirection: "row" },
                p.createElement(Se, null),
                p.createElement(Ae, { parentPost: i, responsesLocked: a }),
                p.createElement(
                  Q.xu,
                  { position: "relative", right: "-7px" },
                  p.createElement(Ve.P, {
                    onClick: h,
                    size: "REGULAR",
                    isPositionAbsolute: !1,
                  })
                )
              )
            ),
            c
              ? p.createElement(
                  Q.xu,
                  { padding: "0 24px" },
                  p.createElement(z, null)
                )
              : p.createElement(
                  p.Fragment,
                  null,
                  w || (_ && !f)
                    ? null
                    : p.createElement(
                        p.Fragment,
                        null,
                        p.createElement(M, { parentPostId: G }),
                        s &&
                          p.createElement(
                            Q.xu,
                            {
                              borderBottom: "BASE_LIGHTER",
                              padding: "20px 20px 12px 20px",
                              marginBottom: "16px",
                            },
                            p.createElement(Ee.T, {
                              activeStyle: "CHECK",
                              onSelect: function (e) {
                                ue(e),
                                  S(e.value),
                                  N.event("responses.sort", {
                                    postId: G,
                                    context: ye.RESPONSES_SIDEBAR,
                                    sortType: e.value,
                                    source: L,
                                  });
                              },
                              options: re,
                              savedOption: le,
                              inactiveLabelComponent:
                                le &&
                                p.createElement(
                                  Q.xu,
                                  null,
                                  p.createElement(
                                    "strong",
                                    { className: k($e) },
                                    le.label
                                  )
                                ),
                              width: "max-content",
                            })
                          )
                      ),
                  s &&
                    0 !==
                      (null == J || null === (r = J.posts) || void 0 === r
                        ? void 0
                        : r.length)
                    ? p.createElement(
                        Q.xu,
                        null,
                        p.createElement(ve, {
                          replies: s,
                          inResponseToPostId: i.id,
                          parentPost: i,
                          displayBottomBorder: ne,
                          threadDepthFromRootPost: T + 1,
                        }),
                        ne &&
                          p.createElement(
                            Q.xu,
                            { margin: "0 24px" },
                            p.createElement(z, null)
                          )
                      )
                    : p.createElement(
                        "div",
                        { className: k(Ke) },
                        p.createElement(
                          $.F,
                          { scale: "L", color: "LIGHTER" },
                          "There are currently no responses for this story."
                        ),
                        p.createElement(
                          $.F,
                          { scale: "L", color: "LIGHTER" },
                          "Be the first to respond."
                        )
                      )
                )
          );
        },
        Ze = (0, d.Ps)(qe(), He, we),
        Ge = n(324),
        Xe = n(80637);
      function Ye() {
        var e = r()([
          "\n  fragment ThreadedResponsesSidebar_post on Post {\n    id\n    ...ThreadedResponsesSidebarContent_post\n  }\n  ",
          "\n",
        ]);
        return (
          (Ye = function () {
            return e;
          }),
          e
        );
      }
      function Je(e, t) {
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
      function et(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Je(Object(n), !0).forEach(function (t) {
                v()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Je(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var tt = function (e) {
          var t = {
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            zIndex: 510,
            cursor: "pointer",
            opacity: 0,
            pointerEvents: "none",
          };
          return (
            e &&
              (t.transition = "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s"),
            t
          );
        },
        nt = function (e, t) {
          return function (n) {
            var o = v()(
              {
                width: m.ZR,
                position: "fixed",
                zIndex: 520,
                backgroundColor: "white",
                left: "100%",
                top: "0px",
                height: "100%",
                boxSizing: "border-box",
                overflow: "auto",
                "-ms-overflow-style": "-ms-autohiding-scrollbar",
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 12px",
                opacity: 1,
                transform: "translateX(0px)",
                transition:
                  "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s, opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s",
              },
              (0, Xe.sm)(n),
              {
                left: 0,
                width: "100%",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                transform: "translateY(100%)",
                "-webkit-overflow-scrolling": "touch",
              }
            );
            return (
              e || (o.visibility = "hidden"),
              t ||
                (o.transition =
                  "transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0s, opacity 0s cubic-bezier(0.23, 1, 0.32, 1) 0s"),
              o
            );
          };
        },
        ot = function (e, t) {
          return function (n) {
            if (e) {
              var o = n.breakpoints.md - 0.02;
              return t <= o
                ? { transform: "translateY(30px) !important" }
                : { transform: "translateX(-415px)" };
            }
            return {};
          };
        },
        rt = function (e) {
          return e ? { opacity: 1, pointerEvents: "all" } : {};
        },
        st = function (e) {
          var t,
            n,
            o,
            r,
            s,
            i,
            a,
            u,
            c,
            d,
            f = e.isResponsesSidebarVisible,
            m = e.inResponseToQuote,
            h = e.setInResponseToQuote,
            v = e.parentPost,
            g = e.continueThisThreadPost,
            R = e.continueThisThreadPostDepth,
            x = e.showPreviousSidebar,
            y = e.cleanupSidebar,
            S = e.initialSidebarRender,
            P = (0, F.Iq)(),
            I = (0, Qe.xg)(),
            T = p.useState(Z.sV.TOP),
            w = l()(T, 2),
            O = w[0],
            D = w[1],
            C = p.useRef(null),
            k = (0, E.useLazyQuery)(b.A, {
              variables: {
                postId: v.id,
                postResponsesPaging: { limit: 10 },
                sortType: O,
              },
              ssr: !1,
            }),
            N = l()(k, 2),
            L = N[0],
            _ = N[1],
            B = _.called,
            M = _.loading,
            A = _.data,
            H = _.fetchMore;
          B || g || (I && !f) || L();
          var V =
              null == A || null === (t = A.post) || void 0 === t
                ? void 0
                : t.responsesLocked,
            U =
              null == A || null === (n = A.post) || void 0 === n
                ? void 0
                : n.isLockedResponse,
            z =
              null == A || null === (o = A.post) || void 0 === o
                ? void 0
                : o.threadedPostResponses,
            q = !1;
          if (g) {
            var K,
              $,
              W,
              G =
                (null === (K = g.threadedPostResponses) || void 0 === K
                  ? void 0
                  : K.posts) || [];
            (q = G.length < 1),
              (z = {
                posts: [
                  et(
                    et({}, g),
                    {},
                    {
                      threadedPostResponses: {
                        posts: G,
                        autoExpandedPostIds:
                          null !== ($ = g.threadedPostResponses) &&
                          void 0 !== $ &&
                          $.posts
                            ? null === (W = g.threadedPostResponses) ||
                              void 0 === W
                              ? void 0
                              : W.posts.map(function (e) {
                                  return e.id;
                                })
                            : [],
                        pagingInfo: null,
                        __typename: "ThreadedPostResponseConnection",
                      },
                    }
                  ),
                ],
                pagingInfo: null,
                autoExpandedPostIds: null,
                __typename: "ThreadedPostResponseConnection",
              });
          }
          !f &&
            S &&
            (z = {
              posts: [],
              pagingInfo: null,
              autoExpandedPostIds: null,
              __typename: "ThreadedPostResponseConnection",
            });
          var X,
            Y =
              (null == A ||
              null === (r = A.post) ||
              void 0 === r ||
              null === (s = r.responseRootPost) ||
              void 0 === s ||
              null === (i = s.post) ||
              void 0 === i
                ? void 0
                : i.id) || "",
            J =
              R ||
              (null == A ||
              null === (a = A.post) ||
              void 0 === a ||
              null === (u = a.responseRootPost) ||
              void 0 === u
                ? void 0
                : u.responseDepth) ||
              0,
            ee = p.useState(0),
            te = l()(ee, 2),
            ne = te[0],
            oe = te[1],
            re = p.useState(!1),
            se = l()(re, 2),
            ie = se[0],
            ae = se[1],
            le = p.useState(Z.Et.NOT_DISTRIBUTED),
            ue = l()(le, 2),
            ce = ue[0],
            de = ue[1];
          p.useEffect(function () {
            ne || oe(window.innerWidth);
          }, []);
          var pe =
            null === (c = z) ||
            void 0 === c ||
            null === (d = c.pagingInfo) ||
            void 0 === d
              ? void 0
              : d.next;
          pe &&
            !g &&
            (X = function () {
              H &&
                H({
                  variables: {
                    postId: v.id,
                    postResponsesPaging: { limit: pe.limit, to: pe.to },
                  },
                  updateQuery: function (e, t) {
                    var n = t.fetchMoreResult;
                    return ae(!1), he(e, n);
                  },
                });
            });
          var fe = function () {
            de(Z.Et.NOT_DISTRIBUTED), y();
          };
          return p.createElement(
            Ge.N8,
            null,
            p.createElement(
              j.cW,
              { source: { name: "responses", postId: v.id }, extendSource: !0 },
              p.createElement(
                Q.xu,
                { print: { display: "none" } },
                p.createElement("div", {
                  className: P([tt(S), rt(f)]),
                  onClick: fe,
                  onKeyUp: function (e) {
                    13 === e.keyCode && fe();
                  },
                  "aria-hidden": !f,
                  role: "presentation",
                }),
                p.createElement(
                  "div",
                  {
                    className: P([nt(f, S), ot(f, ne)]),
                    "aria-hidden": !f,
                    onScroll: function (e) {
                      return it(e, pe, ie, ae, X);
                    },
                    ref: C,
                  },
                  p.createElement(We, {
                    responses: z,
                    parentPost: v,
                    responsesLocked: V,
                    isLockedResponse: U,
                    isLoadingInitialContent: M,
                    isFetchingNextSetOfResponses: ie,
                    isResponsesSidebarVisible: f,
                    closeSidebar: fe,
                    showPreviousSidebar: x,
                    inResponseToQuote: m,
                    setInResponseToQuote: h,
                    sidebarRef: C,
                    responseDistribution: ce,
                    setResponseDistribution: de,
                    responseSortType: O,
                    setResponseSortType: D,
                    rootPostId: Y,
                    postDepth: J,
                    isContinueThisThread: !!g,
                    showCreateReplyEditor: q,
                  })
                )
              )
            )
          );
        },
        it = function (e, t, n, o, r) {
          e.preventDefault();
          var s = e.currentTarget;
          s.scrollHeight - s.scrollTop - s.clientHeight <
            1.5 * s.clientHeight &&
            t &&
            !n &&
            (o(!0), r());
        },
        at = (0, d.Ps)(Ye(), Ze),
        lt = n(72955),
        ut = n(8403);
      function ct() {
        var e = r()([
          "\n  fragment WithResponsesSidebar_post on Post {\n    id\n    ...ThreadedResponsesSidebar_post\n  }\n  ",
          "\n",
        ]);
        return (
          (ct = function () {
            return e;
          }),
          e
        );
      }
      var dt = function (e) {
          var t = e.children,
            n = e.post,
            o = p.useState(!1),
            r = l()(o, 2),
            s = r[0],
            a = r[1],
            u = (0, F.Fg)(),
            d = !!(0, ut.Wd)("responsesOpen"),
            h = p.useState(!1),
            v = l()(h, 2),
            E = v[0],
            b = v[1],
            g = p.useRef(!0),
            R = p.useState(void 0),
            x = l()(R, 2),
            y = x[0],
            S = x[1],
            P = p.useRef(0),
            I = p.useState(!1),
            T = l()(I, 2),
            w = T[0],
            O = T[1],
            D = p.useState([]),
            C = l()(D, 2),
            k = C[0],
            N = C[1],
            L = function () {
              N(c()(k));
            },
            _ = function () {
              b(!1), N([]), (g.current = !0);
            };
          p.useEffect(
            function () {
              O(!0), b(d);
            },
            [d]
          );
          var B = function () {
            window.innerWidth < u.breakpoints.md && a(!0);
          };
          return (
            p.useEffect(function () {
              return (
                B(),
                lt.V6.on("resize", B),
                function () {
                  return lt.V6.off("resize", B);
                }
              );
            }, []),
            p.useEffect(
              function () {
                var e,
                  t,
                  n =
                    null === (e = window) ||
                    void 0 === e ||
                    null === (t = e.document) ||
                    void 0 === t
                      ? void 0
                      : t.documentElement;
                return (
                  s &&
                    null != n &&
                    n.style &&
                    (E
                      ? ((n.style.top = "-".concat(P.current, "px")),
                        (P.current = n.scrollTop),
                        (n.style.overflow = "hidden"),
                        (n.style.position = "fixed"))
                      : ((n.style.overflow = ""),
                        (n.style.position = ""),
                        (n.style.top = ""),
                        (n.scrollTop = P.current))),
                  function () {
                    s &&
                      null != n &&
                      n.style &&
                      ((n.style.overflow = ""),
                      (n.style.position = ""),
                      (n.style.top = ""),
                      (n.scrollTop = P.current));
                  }
                );
              },
              [E]
            ),
            p.createElement(
              f.f.Provider,
              {
                value: {
                  openSidebarToRespondToHighlight: function (e) {
                    S(e), b(!0);
                  },
                  addContinueThisThreadSidebar: function (e) {
                    (g.current = !1), N([].concat(i()(k), [e]));
                  },
                },
              },
              w &&
                p.createElement(st, {
                  isResponsesSidebarVisible: E && 0 === k.length,
                  parentPost: n,
                  inResponseToQuote: y,
                  setInResponseToQuote: S,
                  showPreviousSidebar: L,
                  cleanupSidebar: _,
                  initialSidebarRender: g.current,
                }),
              w &&
                k.map(function (e, t, o) {
                  var r,
                    s = ((r = t), (m.yo - 1) * (r + 1));
                  return p.createElement(st, {
                    key: n.id,
                    isResponsesSidebarVisible: E && t === o.length - 1,
                    parentPost: n,
                    inResponseToQuote: y,
                    setInResponseToQuote: S,
                    continueThisThreadPost: e,
                    continueThisThreadPostDepth: s,
                    showPreviousSidebar: L,
                    cleanupSidebar: _,
                    initialSidebarRender: g.current,
                  });
                }),
              t({
                show: function () {
                  return b(!0);
                },
                hide: _,
              })
            )
          );
        },
        pt = (0, d.Ps)(ct(), at);
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/1882.77364e48.chunk.js.map
