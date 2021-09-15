(self.webpackChunklite = self.webpackChunklite || []).push([
  [2846],
  {
    56308: (e, t, n) => {
      "use strict";
      n.d(t, { bz: () => K, rz: () => $, ik: () => ee });
      var r = n(28655),
        a = n.n(r),
        o = n(34575),
        i = n.n(o),
        u = n(93913),
        c = n.n(u),
        s = n(2205),
        l = n.n(s),
        f = n(78585),
        g = n.n(f),
        p = n(29754),
        d = n.n(p),
        h = n(59713),
        m = n.n(h),
        v = n(71439),
        y = n(67294),
        E = n(28859),
        b = n(10515),
        P = n(50391),
        w = n(319),
        x = n.n(w),
        O = n(7647),
        _ = n(95064),
        S = n(22091),
        k = n(28309),
        N = n(14391),
        I = n(65441);
      function T() {
        var e = a()([
          "\n  fragment ParagraphLayoutGrouping_privateNote on Note {\n    ...ParagraphStyleGrouping_privateNote\n  }\n  ",
          "\n",
        ]);
        return (
          (T = function () {
            return e;
          }),
          e
        );
      }
      function R() {
        var e = a()([
          "\n  fragment ParagraphLayoutGrouping_highlight on Quote {\n    ...ParagraphStyleGrouping_highlight\n  }\n  ",
          "\n",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      function B(e, t) {
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
      function L(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? B(Object(n), !0).forEach(function (t) {
                m()(e, t, n[t]);
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
      var j = { clear: "both" },
        F = { clear: "both", width: "100%" },
        G = function (e) {
          var t,
            n,
            r = e.layoutGroup,
            a = e.postBodyInserts,
            o = e.isEmbedded,
            i = (0, k.Iq)(),
            u = r.styleGroups[0].paragraphViewModels[0].richTextStyle,
            c = r.styleGroups.map(function (e, t) {
              var n = y.createElement(_.ZQ, {
                key: t,
                styleGroup: e,
                postBodyInserts: a,
                richTextStyle: u,
              });
              return "FULL_PAGE" === u && t < 3
                ? y.createElement(O.R, { key: t }, n)
                : n;
            });
          if ((0, I.jH)(u) || o) return y.createElement(y.Fragment, null, c);
          switch (r.effectiveLayout) {
            case "OUTSET_CENTER":
            case "OUTSET_ROW":
              return y.createElement(
                "div",
                { className: i(j) },
                y.createElement(
                  S.Pm,
                  {
                    size: {
                      xs: "full",
                      sm: "full",
                      md: "full",
                      lg: "outset",
                      xl: "outset",
                    },
                  },
                  c
                )
              );
            case "FULL_WIDTH":
              return y.createElement("div", { className: i(F) }, c);
            default:
              return "FULL_PAGE" === u
                ? y.createElement(S.Pm, { size: "inset" }, c)
                : y.createElement(
                    "div",
                    {
                      className: i(
                        ((t = r.effectiveLayout),
                        (n = {
                          boxSizing: "border-box",
                          margin: "0 auto",
                          width: "100%",
                        }),
                        "INSET_CENTER" === t
                          ? L(
                              L({}, n),
                              {},
                              { maxWidth: "700px", padding: "0 1.25em" }
                            )
                          : n)
                      ),
                    },
                    c
                  );
          }
        },
        M = y.memo(G),
        C = (0, v.Ps)(R(), _.PL),
        A = (0, v.Ps)(T(), _.NR),
        D = n(85432),
        z = n(80637),
        U = { ":after": { display: "block", content: '""', clear: "both" } },
        W = n(90038),
        H = n(534);
      function V() {
        var e = a()([
          "\n      fragment PostBodySection_paragraphs on Paragraph {\n        name\n        ...PostBodyParagraph_paragraph\n      }\n      ",
          "\n    ",
        ]);
        return (
          (V = function () {
            return e;
          }),
          e
        );
      }
      function Y() {
        var e = a()([
          "\n  fragment PostBodySection_privateNote on Note {\n    ...ParagraphLayoutGrouping_privateNote\n  }\n  ",
          "\n",
        ]);
        return (
          (Y = function () {
            return e;
          }),
          e
        );
      }
      function q() {
        var e = a()([
          "\n  fragment PostBodySection_highlight on Quote {\n    ...ParagraphLayoutGrouping_highlight\n  }\n  ",
          "\n",
        ]);
        return (
          (q = function () {
            return e;
          }),
          e
        );
      }
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
                m()(e, t, n[t]);
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
      var Z = function () {
        return {
          display: "table-cell",
          paddingBottom: "32px",
          verticalAlign: "bottom",
        };
      };
      function J(e) {
        var t,
          n,
          r,
          a,
          o = e.bgImage,
          i = e.children,
          u = e.isFullPage,
          c = e.paragraphName,
          s = (0, k.Iq)();
        return o && o.id && u
          ? y.createElement(
              E.TA,
              { name: c, type: "bgimage" },
              y.createElement(
                "div",
                {
                  className: s(
                    ((t = o),
                    (n = t.id),
                    (r = t.originalWidth),
                    (a = t.originalHeight),
                    function () {
                      var e = [400, 600, 800, 1e3, 1200, 1400, 1600, 1800, 2e3],
                        t = {
                          miroId: n,
                          strategy: W._S.Resample,
                          verticalGradient: { start: 29, end: 81, opacity: 40 },
                        },
                        o = e.reduce(function (n, o, i) {
                          var u = (0, W.W6)(
                            X(X({}, t), {}, { width: o, height: (o / r) * a })
                          );
                          return i === e.length - 1
                            ? ((n.backgroundImage = "url(".concat(u, ")")), n)
                            : ((n["@media (min-width: ".concat(o, "px)")] = {
                                backgroundImage: "url(".concat(u, ")"),
                              }),
                              n);
                        }, {});
                      return X(
                        {
                          backgroundColor: "rgba(0, 0, 0, 0.9)",
                          backgroundPosition: "50% 50%",
                          backgroundSize: "cover",
                          display: "table",
                          minHeight: "100vh",
                          width: "100%",
                        },
                        o
                      );
                    })
                  ),
                },
                y.createElement(
                  "div",
                  { className: s(Z) },
                  y.createElement(D.Yi, null, function (e) {
                    return y.createElement(D.f6, { theme: (0, H.GV)(e) }, i);
                  })
                )
              )
            )
          : i;
      }
      var K = (function (e) {
        l()(a, e);
        var t,
          n,
          r =
            ((t = a),
            (n = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                );
              } catch (e) {
                return !1;
              }
            })()),
            function () {
              var e,
                r = d()(t);
              if (n) {
                var a = d()(this).constructor;
                e = Reflect.construct(r, arguments, a);
              } else e = r.apply(this, arguments);
              return g()(this, e);
            });
        function a() {
          return i()(this, a), r.apply(this, arguments);
        }
        return (
          c()(a, [
            {
              key: "render",
              value: function () {
                var e = this.props,
                  t = e.paragraphViewModels,
                  n = e.postBodyInserts,
                  r = e.section;
                if (0 === t.length) return null;
                var a = (function (e) {
                  var t = [],
                    n = [];
                  e.forEach(function (e) {
                    var r = (function (e, t) {
                        switch (t) {
                          case N.ms.INSET_LEFT:
                          case N.ms.OUTSET_LEFT:
                            return "IMG" === e || "IFRAME" === e
                              ? N.ms.INSET_CENTER
                              : t;
                          case N.ms.OUTSET_ROW_CONTINUE:
                            return N.ms.OUTSET_ROW;
                          default:
                            return t || N.ms.INSET_CENTER;
                        }
                      })(e.paragraphStyle, e.paragraph.layout),
                      a = t[t.length - 1];
                    if (a && a.effectiveLayout === r) n.push(e);
                    else {
                      if (a) {
                        var o,
                          i = (0, _.lD)(n);
                        (o = a.styleGroups).push.apply(o, x()(i));
                      }
                      (n.length = 0),
                        n.push(e),
                        t.push({ styleGroups: [], effectiveLayout: r });
                    }
                  });
                  var r = t[t.length - 1];
                  if (r) {
                    var a,
                      o = (0, _.lD)(n);
                    (a = r.styleGroups).push.apply(a, x()(o));
                  }
                  return t;
                })(t);
                return y.createElement(b.M.Consumer, null, function (e) {
                  return y.createElement(k.hS, null, function (o) {
                    return y.createElement(
                      "section",
                      {
                        className: o(function (e) {
                          return X(
                            X(
                              {},
                              (function (e, t) {
                                switch (e) {
                                  case "SERIES":
                                    return {
                                      paddingTop: "32px",
                                      paddingBottom: "32px",
                                      margin: "auto 0",
                                      width: "100%",
                                    };
                                  case "STREAM":
                                  case "CARD":
                                  case "FULL_PAGE":
                                    return {
                                      wordBreak: "break-word",
                                      wordWrap: "break-word",
                                    };
                                  case "SHORTFORM_CARD":
                                    return m()(
                                      {
                                        wordBreak: "break-word",
                                        wordWrap: "break-word",
                                        position: "relative",
                                        overflow: "hidden",
                                        height: "340px",
                                      },
                                      z.md(t),
                                      { height: "218px" }
                                    );
                                  default:
                                    return {};
                                }
                              })(t[0].richTextStyle, e)
                            ),
                            U
                          );
                        }),
                      },
                      y.createElement(
                        J,
                        {
                          bgImage: r.backgroundImage,
                          isFullPage: "FULL_PAGE" === t[0].richTextStyle,
                          paragraphName: t[0].paragraph.name,
                        },
                        a.map(function (t, r) {
                          return y.createElement(M, {
                            key: r,
                            layoutGroup: t,
                            postBodyInserts: n,
                            isEmbedded: e,
                          });
                        })
                      )
                    );
                  });
                });
              },
            },
          ]),
          a
        );
      })(y.Component);
      K.fragments = { paragraphs: (0, v.Ps)(V(), P.ph.fragments.paragraph) };
      var $ = (0, v.Ps)(q(), C),
        ee = (0, v.Ps)(Y(), A);
    },
    72846: (e, t, n) => {
      "use strict";
      n.d(t, {
        yO: () => ue,
        Pk: () => ce,
        v: () => le,
        XV: () => se,
        w6: () => fe,
      });
      var r = n(28655),
        a = n.n(r),
        o = n(67154),
        i = n.n(o),
        u = n(319),
        c = n.n(u),
        s = n(71439),
        l = n(67294),
        f = n(28859),
        g = n(28309),
        p = {
          display: "flex",
          justifyContent: "center",
          marginTop: "32px",
          marginBottom: "14px",
          paddingTop: "24px",
          paddingBottom: "10px",
        },
        d = function (e) {
          return {
            backgroundColor: e.baseColor.text.darker,
            borderRadius: "50%",
            display: "inline-block",
            height: "3px",
            width: "3px",
          };
        },
        h = { marginRight: "20px" };
      function m() {
        var e = (0, g.Iq)();
        return l.createElement(
          "div",
          { className: e(p), role: "separator" },
          l.createElement("span", { className: e([d, h]) }),
          l.createElement("span", { className: e([d, h]) }),
          l.createElement("span", { className: e(d) })
        );
      }
      var v = n(56308),
        y = n(63038),
        E = n.n(y),
        b = n(50008),
        P = n.n(b),
        w = n(23450),
        x = n.n(w),
        O = n(98281),
        _ = n(85432),
        S = n(86021),
        k = n(72955);
      function N() {
        var e = a()([
          "\n  fragment PostNotesDetails_user on User {\n    id\n    imageId\n    name\n    username\n    ...UserAvatar_user\n  }\n  ",
          "\n",
        ]);
        return (
          (N = function () {
            return e;
          }),
          e
        );
      }
      function I(e) {
        var t = e.grid.xStep;
        return {
          padding: ""
            .concat(3 * t, "px ")
            .concat(4 * t, "px ")
            .concat(3 * t, "px"),
          width: "400px",
        };
      }
      function T(e) {
        var t = e.close,
          n = e.users,
          r = (0, g.Iq)(),
          a = l.useRef(null),
          o = (0, g.Fg)(),
          i = o.grid.xStep;
        return (
          l.useEffect(function () {
            function e() {
              var e = a.current;
              if (e && e.getBoundingClientRect) {
                var n = e.getBoundingClientRect(),
                  r = n.bottom,
                  i = n.top < 0 || r > window.innerHeight,
                  u = window.innerWidth < o.breakpoints.xl;
                (i || u) && t();
              }
            }
            return (
              k.V6.on("scroll_end", e),
              k.V6.on("resize_throttled", e),
              function () {
                k.V6.off("scroll_end", e), k.V6.off("resize_throttled", e);
              }
            );
          }, []),
          l.createElement(
            "section",
            { ref: a, className: r(I) },
            l.createElement(
              _.xu,
              {
                borderBottom: "BASE_LIGHTER",
                marginBottom: "-".concat(i, "px"),
                paddingBottom: "".concat(2 * i, "px"),
              },
              l.createElement(S.Lh, null, "Highlights (".concat(n.length, ")"))
            ),
            l.createElement(
              _.xu,
              { marginLeft: "3px" },
              n.length &&
                n.map(function (e) {
                  return l.createElement(
                    _.xu,
                    {
                      display: "inline-block",
                      key: e.id,
                      marginTop: "".concat(5 * i, "px"),
                      marginRight: "".concat(5 * i, "px"),
                      width: "".concat(8 * i, "px"),
                    },
                    l.createElement(O.Yt, {
                      hasPopover: !0,
                      link: !0,
                      user: e,
                      scale: "XS",
                    })
                  );
                })
            )
          )
        );
      }
      var R = l.memo(T),
        B = (0, s.Ps)(N(), O.WQ),
        L = n(91442),
        j = n(16803),
        F = n(93340),
        G = n(34675),
        M = n(98024),
        C = n(24438),
        A = n(11642);
      function D() {
        var e = a()([
          "\n  fragment PostNotesMarkers_creator on User {\n    id\n    name\n    viewerEdge {\n      isFollowing\n    }\n  }\n",
        ]);
        return (
          (D = function () {
            return e;
          }),
          e
        );
      }
      function z() {
        var e = a()([
          "\n  fragment PostNotesMarkers_highlight on Quote {\n    id\n    endOffset\n    paragraphs {\n      id\n      name\n    }\n    startOffset\n    userId\n    user {\n      id\n      name\n      ...PostNotesDetails_user\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (z = function () {
            return e;
          }),
          e
        );
      }
      function U() {
        return {
          border: "none",
          cursor: "pointer",
          display: "block",
          padding: "0px",
          textAlign: "left",
          width: "100%",
        };
      }
      function W() {
        return { left: "100%", position: "absolute", top: 0 };
      }
      function H(e, t) {
        return {
          marginTop: "6px",
          maxWidth: "100%",
          position: "absolute",
          top: "".concat(e - (t || 0), "px"),
          whiteSpace: "nowrap",
          width: "100%",
        };
      }
      function V(e) {
        return {
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "".concat((0, C.G)(e, 8, !0), "px"),
          position: "relative",
        };
      }
      function Y() {
        return {
          display: "inline-block",
          maxWidth: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        };
      }
      function q(e, t) {
        return "number" == typeof e.startOffset &&
          "number" == typeof t.startOffset
          ? e.startOffset < t.startOffset
            ? -1
            : 1
          : -1;
      }
      function Q(e, t) {
        var n = t.startOffset,
          r = t.endOffset,
          a = t.paragraphs[0].name;
        if (!a || "number" != typeof n || "number" != typeof r) return e;
        var o = !1,
          i = e[a] || [];
        return (
          i.length &&
            (i = i.map(function (e) {
              var a = n <= e.endOffset + 1,
                i = e.startOffset,
                u = e.endOffset;
              return (
                a &&
                  ((o = !0),
                  e.highlights.push(t),
                  (u = Math.max(r, e.endOffset)),
                  (i = Math.min(n, e.startOffset))),
                { highlights: e.highlights, endOffset: u, startOffset: i }
              );
            })),
          o || i.push({ highlights: [t], endOffset: r, startOffset: n }),
          (e[a] = i),
          e
        );
      }
      function X(e) {
        var t = e.children,
          n = e.highlightString,
          r = e.toggle,
          a = (0, g.Iq)();
        return "Top highlight" === n
          ? l.createElement(l.Fragment, null, t)
          : l.createElement(
              "button",
              {
                className: a(U),
                onClick: function () {
                  return r();
                },
                onMouseDown: function (e) {
                  return e.preventDefault();
                },
              },
              t
            );
      }
      function Z(e) {
        var t = e.creator,
          n = e.positionMap,
          r = e.yPosOffset,
          a = (0, g.Iq)();
        if ("number" != typeof r) return null;
        var o = Array.from(n.entries());
        return l.createElement(G.I8, { nonBlocking: !0 }, function (e) {
          return l.createElement(
            l.Fragment,
            null,
            o.map(function (n, o) {
              var i = E()(n, 2),
                u = i[0],
                c = i[1],
                s = (function (e, t, n) {
                  if (1 === e.length) {
                    if ("anon" === e[0].userId) return "Top highlight";
                    if (!t) return null;
                    if (
                      n &&
                      n.id === e[0].userId &&
                      t.id !== n.id &&
                      !n.viewerEdge.isFollowing
                    )
                      return null;
                    if (t && t.id === e[0].userId) return "You highlighted";
                    if (e[0].user && e[0].user.name) return e[0].user.name;
                  }
                  var r = [];
                  if (
                    (e.forEach(function (e) {
                      if (e.user) {
                        var a = t && t.id === e.userId,
                          o = e.user.name,
                          i =
                            n &&
                            n.id === e.userId &&
                            (!t ||
                              (t.id !== n.id && !n.viewerEdge.isFollowing));
                        a
                          ? (r.length && "You" === r[0]) || r.unshift("You")
                          : i || !o || r.includes(o) || r.push(o);
                      }
                    }),
                    !r.length)
                  )
                    return "Top highlight";
                  if (1 === r.length)
                    return "You" === r[0] ? "You highlighted" : r[0];
                  if (2 === r.length)
                    return "".concat(r[0], " and ").concat(r[1]);
                  var a = r.slice(0, 2),
                    o = r.length - a.length;
                  return ""
                    .concat(a[0], ", ")
                    .concat(a[1], ", and ")
                    .concat(o, " ")
                    .concat(x()("other", o));
                })(c, e, t);
              return s
                ? l.createElement(
                    "div",
                    { className: a(H(u, r)), key: o },
                    l.createElement(_.Bn, null, function (e) {
                      var t = e.isVisible,
                        n = e.hide,
                        r = e.toggle;
                      return l.createElement(
                        l.Fragment,
                        null,
                        l.createElement(
                          X,
                          { toggle: r, highlightString: s },
                          l.createElement(
                            M.F,
                            { scale: "S" },
                            l.createElement("span", { className: a(Y) }, s)
                          )
                        ),
                        t &&
                          l.createElement(
                            j.G,
                            {
                              boundariesElement: "document",
                              isVisible: !0,
                              hide: n,
                              placement: "right",
                              popoverRenderFn: function () {
                                var e = new Set(),
                                  t = c
                                    .map(function (t) {
                                      var n = t.user;
                                      return n && n.id && !e.has(n.id)
                                        ? (e.add(n.id), n)
                                        : null;
                                    })
                                    .filter(A.b);
                                return l.createElement(R, {
                                  close: n,
                                  users: t,
                                });
                              },
                            },
                            l.createElement(l.Fragment, null)
                          )
                      );
                    })
                  )
                : null;
            })
          );
        });
      }
      var J = l.forwardRef(function (e, t) {
          var n = e.creator,
            r = e.highlights,
            a = l.useContext(L.Vc).highlightSegments,
            o = l.useRef(null),
            i = l.useState(null),
            u = E()(i, 2),
            s = u[0],
            f = u[1],
            p = (0, g.Iq)(),
            d = (0, g.Fg)(),
            h = l.useState(null),
            m = E()(h, 2),
            v = m[0],
            y = m[1],
            b = l.useState(null),
            w = E()(b, 2),
            x = w[0],
            O = w[1];
          return (
            l.useEffect(
              function () {
                var e = function () {
                  var e = (function (e, t, n) {
                    var r = new Map();
                    if (e.size && t.length) {
                      var a = (function (e) {
                          var t = c()(e).sort(q).reduce(Q, {});
                          return Object.values(t).reduce(function (e, t) {
                            return t && "object" === P()(t) && t.length
                              ? (e.push.apply(e, c()(t)), e)
                              : e;
                          }, []);
                        })(t),
                        o = [];
                      a.forEach(function (t) {
                        var a = t.highlights[0],
                          i = a.paragraphs[0].name;
                        if (a && "number" == typeof a.startOffset && i) {
                          var u = e.get(
                            "".concat(i, "_").concat(a.startOffset)
                          );
                          if (u && u.ref && u.ref.current) {
                            var c,
                              s =
                                u.ref.current.getBoundingClientRect().top +
                                window.pageYOffset;
                            o.length &&
                              (c = o.find(function (e) {
                                return (
                                  (s < e + n.newFonts.body.lineHeight.M &&
                                    s > e) ||
                                  (s > e - n.newFonts.body.lineHeight.M &&
                                    s < e)
                                );
                              }));
                            var l = c || s,
                              f = r.get(l) || [];
                            f.length || o.push(l);
                            var g = f.concat(t.highlights);
                            g.length && r.set(l, g);
                          }
                        }
                      });
                    }
                    return r;
                  })(a, r, d);
                  if (
                    (f(e),
                    "function" != typeof t &&
                      null != t &&
                      t.current &&
                      O(t.current.offsetTop),
                    null != o && o.current)
                  ) {
                    var n = o.current.getBoundingClientRect().left,
                      i = window.innerWidth - n - 8 * d.grid.xStep;
                    y(i);
                  }
                };
                k.V6.on("resize_throttled", e);
                var n = (0, F.x)(function (t) {
                  ("iframe.resize" !== t.context &&
                    "player.js" !== t.context) ||
                    e();
                }).destructor;
                return (
                  e(),
                  function () {
                    k.V6.off("resize_throttled", e), n();
                  }
                );
              },
              [r, a]
            ),
            l.createElement(
              "div",
              { className: p(V) },
              l.createElement(
                _.xu,
                {
                  display: "block",
                  xs: { display: "none" },
                  sm: { display: "none" },
                  md: { display: "none" },
                  lg: { display: "none" },
                },
                l.createElement(
                  "aside",
                  {
                    className: p(W),
                    ref: o,
                    style: { width: v ? "".concat(v, "px") : void 0 },
                  },
                  s &&
                    l.createElement(Z, {
                      creator: n,
                      highlights: r,
                      positionMap: s,
                      yPosOffset: x,
                      width: v,
                    })
                )
              )
            )
          );
        }),
        K = l.memo(J),
        $ = (0, s.Ps)(z(), B),
        ee = (0, s.Ps)(D()),
        te = n(25415),
        ne = n(65441);
      function re() {
        var e = a()([
          "\n  fragment PostBody_privateNote on Note {\n    ...normalizedBodyModel_privateNote\n    ...PostBodySection_privateNote\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (re = function () {
            return e;
          }),
          e
        );
      }
      function ae() {
        var e = a()([
          "\n  fragment PostBody_creator on User {\n    ...PostNotesMarkers_creator\n  }\n  ",
          "\n",
        ]);
        return (
          (ae = function () {
            return e;
          }),
          e
        );
      }
      function oe() {
        var e = a()([
          "\n  fragment PostBody_highlight on Quote {\n    paragraphs {\n      id\n    }\n    ...normalizedBodyModel_highlight\n    ...PostBodySection_highlight\n    ...PostNotesMarkers_highlight\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (oe = function () {
            return e;
          }),
          e
        );
      }
      function ie() {
        var e = a()([
          "\n  fragment PostBody_bodyModel on RichText {\n    sections {\n      name\n      startIndex\n      textLayout\n      imageLayout\n      backgroundImage {\n        id\n        originalHeight\n        originalWidth\n      }\n      videoLayout\n      backgroundVideo {\n        videoId\n        originalHeight\n        originalWidth\n        previewImageId\n      }\n    }\n    paragraphs {\n      id\n      ...PostBodySection_paragraphs\n    }\n    ...normalizedBodyModel_richText\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (ie = function () {
            return e;
          }),
          e
        );
      }
      var ue = l.forwardRef(function (e, t) {
          var n,
            r,
            a = e.bodyModel,
            o = e.creator,
            u = e.highlights,
            s = e.isAuroraPostPageEnabled,
            p = e.privateNotes,
            d = e.postBodyInserts,
            h = e.richTextStyle,
            y = void 0 === h ? "FULL_PAGE" : h,
            E = (0, g.Iq)(),
            b =
              null === (n = l.useContext(f.u6).watchedBounds.get("byline")) ||
              void 0 === n ||
              null === (r = n.ref) ||
              void 0 === r
                ? void 0
                : r.current,
            P = b ? b.offsetTop - 48 : 100,
            w = {
              position: "absolute",
              left: 0,
              top: "calc(100vh + ".concat(P, "px)"),
              bottom: "calc(100vh + ".concat(100, "px)"),
              width: "10px",
              pointerEvents: "none",
            },
            x = (0, te.Zx)().privateNoteSelection,
            O = l.useMemo(
              function () {
                return u && x ? [].concat(c()(u), [x]) : u;
              },
              [u, x]
            ),
            _ = d
              ? (function (e) {
                  var t;
                  return (
                    Object.keys(e).some(function (n) {
                      return (
                        !!e[n].find(function (e) {
                          return "BYLINE" === e.insertType;
                        }) && ((t = n), !0)
                      );
                    }),
                    t
                  );
                })(d)
              : void 0,
            S = l.useMemo(
              function () {
                return (0, ne.fj)(a, {
                  bylineParagraphName: _,
                  highlights: O,
                  isAuroraPostPageEnabled: s,
                  isPostPage: !0,
                  privateNotes: p,
                  richTextStyle: y,
                });
              },
              [a, O, p, y]
            ),
            k = d && d.first;
          return l.createElement(
            "div",
            { ref: t },
            l.createElement(
              l.Fragment,
              null,
              l.createElement(f.TA, {
                name: "ghost-track",
                type: "ghost",
                className: E(w),
              }),
              "FULL_PAGE" === y &&
                u &&
                u.length > 0 &&
                l.createElement(K, { creator: o, highlights: c()(u), ref: t }),
              !!k &&
                k.map(function (e, t) {
                  return e.component
                    ? l.createElement(
                        "section",
                        { key: "postBodyInsertFirst_".concat(t) },
                        e.component
                      )
                    : null;
                })
            ),
            S.map(function (e, t) {
              if ("HR" === e) {
                var n,
                  r,
                  a = S[t - 1],
                  o = S[t + 1],
                  u =
                    "HR" !== a &&
                    (null == a || null === (n = a.section) || void 0 === n
                      ? void 0
                      : n.backgroundImage),
                  c =
                    "HR" !== o &&
                    (null == o || null === (r = o.section) || void 0 === r
                      ? void 0
                      : r.backgroundImage);
                return u || c ? null : l.createElement(m, { key: t });
              }
              return l.createElement(
                v.bz,
                i()({ key: e.section.name || t, postBodyInserts: d }, e)
              );
            })
          );
        }),
        ce = (0, s.Ps)(ie(), ne.gd, v.bz.fragments.paragraphs),
        se = (0, s.Ps)(oe(), ne.Cn, v.rz, $),
        le = (0, s.Ps)(ae(), ee),
        fe = (0, s.Ps)(re(), ne.EH, v.ik);
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/2846.012d369f.chunk.js.map
