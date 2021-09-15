(self.webpackChunklite = self.webpackChunklite || []).push([
  [3507],
  {
    66443: (e, t, n) => {
      "use strict";
      n.d(t, { Z: () => c });
      var o = n(67294);
      function r() {
        return (r =
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
      var a = o.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M4.47 9.95h17v-3h-17v3zm16 1h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-17a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9zm-1 0h-13v9h13v-9z",
        }),
        i = o.createElement("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M9.47 12.45c0-.28.21-.5.48-.5h6.04c.27 0 .48.22.48.5 0 .27-.21.5-.48.5H9.95a.49.49 0 0 1-.48-.5z",
        });
      const c = function (e) {
        return o.createElement(
          "svg",
          r(
            { width: 25, height: 25, viewBox: "0 1 25 25", fill: "#757575" },
            e
          ),
          a,
          i
        );
      };
    },
    17298: (e, t, n) => {
      "use strict";
      n.d(t, { Z: () => i });
      var o = n(67294);
      function r() {
        return (r =
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
      var a = o.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M20.48 7.45H3.46v10.13H16a.47.47 0 1 1 0 .94H3.46c-.54 0-.99-.42-.99-.94V7.45c0-.52.45-.93 1-.93h17c.55 0 1 .41 1 .93v5.57a.5.5 0 0 1-1 0V7.45zM5.47 10.02c0-.28.22-.5.5-.5h9.11a.5.5 0 1 1 0 1H5.97a.5.5 0 0 1-.5-.5zm.51 2.5a.5.5 0 0 0-.51.5c0 .27.23.5.51.5h5.98a.5.5 0 0 0 .51-.5.5.5 0 0 0-.51-.5H5.98zm12.52 3.02c.2-.2.5-.2.7 0l1.77 1.77 1.77-1.77a.5.5 0 1 1 .7.7l-1.76 1.78 1.76 1.76a.5.5 0 1 1-.7.71l-1.77-1.77-1.77 1.77a.5.5 0 0 1-.7-.7l1.76-1.77-1.76-1.77a.5.5 0 0 1 0-.7z",
      });
      const i = function (e) {
        return o.createElement(
          "svg",
          r(
            { width: 25, height: 25, viewBox: "0 0 25 25", fill: "#757575" },
            e
          ),
          a
        );
      };
    },
    50493: (e, t, n) => {
      "use strict";
      n.d(t, { o5: () => b, tA: () => x, tE: () => R });
      var o = n(28655),
        r = n.n(o),
        a = n(71439),
        i = n(67294),
        c = n(4743),
        l = n(51684),
        s = n(82318),
        u = n(98024),
        d = n(28309),
        p = {
          INLINE: {
            padding: "8px 0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
          SIDEBAR: {
            padding: "8px 0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "".concat(l.ZR, "px"),
            ":hover": { width: "200px" },
          },
        };
      function m(e) {
        var t = (0, d.Iq)();
        return i.createElement(
          "li",
          { className: t({ overflow: "hidden" }) },
          i.createElement(
            u.F,
            { scale: "M", color: "DARKER" },
            i.createElement(
              s.r,
              {
                href: "#".concat(e.destination),
                onClick: function (t) {
                  t.preventDefault(),
                    (function (e) {
                      var t = document.getElementById(e);
                      if (t) {
                        var n = t.offsetTop - 56;
                        window.scrollTo({
                          left: 0,
                          top: n,
                          behavior: "smooth",
                        }),
                          window.history.pushState({}, "", "#".concat(e));
                      }
                    })(e.destination);
                },
                disableSourceParam: !0,
                noFollow: !0,
                inline: !0,
              },
              i.createElement(
                "div",
                { className: t(p[e.mode]), title: e.text },
                e.text
              )
            )
          )
        );
      }
      var f = n(7654),
        h = n(42933),
        E = n(86021),
        v = n(14391),
        g = n(67122),
        I = n(25885);
      function w() {
        var e = r()([
          "\n  fragment TableOfContents_post on Post {\n    id\n    collection {\n      id\n    }\n    content(postMeteringOptions: $postMeteringOptions) {\n      bodyModel {\n        paragraphs {\n          id\n          name\n          type\n          text\n        }\n      }\n    }\n  }\n",
        ]);
        return (
          (w = function () {
            return e;
          }),
          e
        );
      }
      var x = (0, a.Ps)(w()),
        R = function (e) {
          return (
            !!(
              e.collection &&
              e.collection.id &&
              ["3ec9f38ac0bd", "3f6ecf56618", "8d6b8a439e32"].includes(
                e.collection.id
              )
            ) || ["8135e6744d59", "21f0e9818b3a"].includes(e.id)
          );
        },
        N = {
          INLINE: {
            display: {
              xs: "block",
              sm: "block",
              md: "block",
              lg: "block",
              xl: "none",
            },
            marginTop: "35px",
          },
          SIDEBAR: {
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "none",
              xl: "block",
            },
            margin: "50px 0",
            fontSize: "16px",
            ":hover": { width: "200px" },
          },
        },
        b = function (e) {
          var t = e.post,
            n = e.mode,
            o = e.heightRef,
            r = (0, d.Iq)(),
            a = (0, d.Fg)().backgroundColor,
            l = (function (e) {
              var t = (e || { content: { bodyModel: { paragraphs: null } } })
                .content.bodyModel.paragraphs;
              if (!t) throw new Error("Expected post to have paragraphs.");
              var n = (0, c.LI)(t),
                o = t.filter(function (e) {
                  return (function (e) {
                    switch (e) {
                      case v.NJ.H1:
                      case v.NJ.H2:
                      case v.NJ.H3:
                        return !0;
                    }
                    return !1;
                  })(e.type);
                });
              return (
                null !== n.titleIndex && o.splice(0, 1), o.length > 1 ? o : []
              );
            })(t);
          if (!R(t) || null == l || !l.length) return null;
          var s,
            u,
            p = i.createElement(
              h.x,
              { overflow: "hidden", marginTop: "16px" },
              i.createElement(
                "ol",
                { className: r({ marginTop: "5px" }) },
                l.map(function (e) {
                  return i.createElement(m, {
                    key: "toc_".concat(e.name),
                    text: e.text || "",
                    destination: e.name || "",
                    mode: n,
                  });
                })
              )
            ),
            w = (0, I.n2)(a),
            x = function (e) {
              return "rgba("
                .concat(w[0], ", ")
                .concat(w[1], ", ")
                .concat(w[2], ", ")
                .concat(e, ")");
            };
          switch (n) {
            case "INLINE":
              var b = i.createElement(
                E.Lh,
                { scale: "M", color: "LIGHTER" },
                i.createElement(
                  "div",
                  { className: r({ marginRight: "7px" }) },
                  "Jump To Section"
                )
              );
              return i.createElement(
                "div",
                { className: r(N[n]) },
                i.createElement(
                  h.x,
                  { borderBottom: "BASE_LIGHTER", paddingBottom: "10px" },
                  i.createElement(
                    f.$,
                    {
                      titleComponent: b,
                      width: "auto",
                      arrowFill: (0, g.Uy)(0.54),
                    },
                    p
                  )
                )
              );
            case "SIDEBAR":
              return i.createElement(
                "div",
                { className: r(N[n]) },
                i.createElement(
                  E.Lh,
                  { scale: "S", color: "LIGHTER" },
                  i.createElement(
                    "div",
                    { className: r({ whiteSpace: "nowrap" }) },
                    "Table of Contents"
                  )
                ),
                i.createElement(
                  h.x,
                  { position: "relative" },
                  i.createElement("div", {
                    className: r(function () {
                      return {
                        background: "linear-gradient("
                          .concat(x(1), ",\n      ")
                          .concat(x(0.5), ",\n      ")
                          .concat(x(0), ")"),
                        width: "100%",
                        height: "".concat(35, "px"),
                      };
                    }),
                  }),
                  i.createElement(
                    "div",
                    {
                      className: r({
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        "-ms-overflow-style": "none",
                        "::-webkit-scrollbar": { display: "none" },
                        height:
                          ((s =
                            null != o && o.current
                              ? o.current.offsetHeight
                              : 0),
                          (u = Math.max(
                            "undefined" != typeof window
                              ? window.innerHeight - s - 106 - 100
                              : 150,
                            150
                          )),
                          "".concat(u, "px")),
                        paddingBottom: "".concat(35, "px"),
                        position: "relative",
                        top: "-".concat(35, "px"),
                      }),
                    },
                    p
                  ),
                  i.createElement("div", {
                    className: r(function () {
                      return {
                        background: "linear-gradient("
                          .concat(x(0), ",\n      ")
                          .concat(x(0.5), ",\n      ")
                          .concat(x(1), ")"),
                        position: "relative",
                        width: "100%",
                        height: "".concat(35, "px"),
                        top: "-".concat(35, "px"),
                      };
                    }),
                  })
                )
              );
            default:
              return null;
          }
        };
    },
    47713: (e, t, n) => {
      "use strict";
      n.d(t, { o: () => L });
      var o = n(63038),
        r = n.n(o),
        a = n(67294),
        i = n(86753),
        c = n(9482),
        l = n(3021),
        s = n(34675),
        u = n(62181),
        d = n(85432),
        p = n(33914),
        m = n(27599),
        f = n(27572),
        h = n(28309),
        E = n(14391),
        v = n(67297),
        g = n(71254),
        I = n(66443),
        w = n(17298),
        x = n(27952),
        R = function (e, t) {
          return (
            e &&
            {
              READING_LIST_QUEUE: "READING_LIST_ARCHIVE",
              READING_LIST_ARCHIVE: "READING_LIST_NONE",
            }[t]
          );
        },
        N = function (e) {
          return { fill: e.baseColor.fill.lighter };
        },
        b = function (e) {
          var t = e.currentReadingListType,
            n = (0, h.Iq)();
          return {
            READING_LIST_QUEUE: a.createElement(I.Z, { className: n(N) }),
            READING_LIST_ARCHIVE: a.createElement(w.Z, { className: n(N) }),
          }[t];
        },
        L = function (e) {
          var t = e.post,
            n = e.withTooltip,
            o = void 0 === n || n,
            I = e.susiEntry,
            w = t.id,
            L = t.viewerEdge.readingList,
            A = (0, h.Iq)(),
            y = (0, v.v9)(function (e) {
              return e.config.authDomain;
            }),
            T = (0, m.Av)(),
            S = (0, f.pK)(),
            _ = a.useContext(c.Q),
            C = _.isFirstLoadAndInReadingList,
            D = _.setIsFirstLoadAndInReadingList,
            k = a.useState(o),
            H = r()(k, 2),
            G = H[0],
            O = H[1],
            B = a.useCallback(
              function (e, t) {
                if (L) {
                  if (
                    (T.event(
                      {
                        READING_LIST_QUEUE: "post.addedArchive",
                        READING_LIST_ARCHIVE: "post.removedBookmark",
                      }[L],
                      { postId: w, source: S }
                    ),
                    t(R(e, L))(),
                    R(e, L) === E.sx.READING_LIST_NONE)
                  )
                    return void D(!1);
                  o && O(!1);
                }
              },
              [w, L, C, D, o, S]
            ),
            M = a.useCallback(
              function () {
                o && O(!0);
              },
              [o]
            );
          return a.createElement(s.I8, null, function (e) {
            return e
              ? L &&
                  a.createElement(
                    "div",
                    null,
                    !C ||
                      (L !== E.sx.READING_LIST_QUEUE &&
                        L !== E.sx.READING_LIST_ARCHIVE)
                      ? a.createElement(i.e, { post: t, susiEntry: I })
                      : a.createElement(l.sN, { post: t }, function (t) {
                          return a.createElement(
                            p._,
                            {
                              isVisible: G,
                              targetDistance: 10,
                              tooltipText:
                                ((n = L),
                                {
                                  READING_LIST_QUEUE: "Archive Story",
                                  READING_LIST_ARCHIVE:
                                    "Remove story from reading list",
                                }[n]),
                              onMouseLeave: M,
                            },
                            a.createElement(
                              d.rU,
                              {
                                onClick: function () {
                                  return B(e, t);
                                },
                              },
                              a.createElement(b, { currentReadingListType: L })
                            )
                          );
                          var n;
                        })
                  )
              : a.createElement(
                  "div",
                  { className: A(N) },
                  a.createElement(
                    u.R9,
                    {
                      post: t,
                      operation: "register",
                      actionUrl: (0, x.XET)(y, w),
                      susiEntry: I,
                    },
                    a.createElement(g.Z, null)
                  )
                );
          });
        };
    },
    9482: (e, t, n) => {
      "use strict";
      n.d(t, { Q: () => r });
      var o = {
          isFirstLoadAndInReadingList: !0,
          setIsFirstLoadAndInReadingList: function () {
            return null;
          },
        },
        r = n(67294).createContext(o);
    },
    7654: (e, t, n) => {
      "use strict";
      n.d(t, { $: () => m });
      var o = n(63038),
        r = n.n(o),
        a = n(67294),
        i = n(85432),
        c = n(64504),
        l = n(28309),
        s = n(8403),
        u = n(73004),
        d = n(51064),
        p = 300,
        m = function (e) {
          var t,
            n = e.children,
            o = e.title,
            m = e.titleComponent,
            f = e.width,
            h = e.arrowFill,
            E =
              null === (t = (0, s.Wd)("unfold")) || void 0 === t
                ? void 0
                : t.toLowerCase(),
            v = !!o && E === o.toLowerCase(),
            g = (0, l.Iq)(),
            I = (0, d.O)(!1),
            w = r()(I, 4),
            x = w[0],
            R = w[3],
            N = (function (e) {
              var t = a.useRef(null),
                n = a.useState("0px"),
                o = r()(n, 2),
                i = o[0],
                c = o[1],
                l = a.useState(!1),
                s = r()(l, 2),
                u = s[0],
                d = s[1];
              return (
                a.useEffect(
                  function () {
                    var n = t.current;
                    n &&
                      (e
                        ? (c("".concat(n.getBoundingClientRect().height, "px")),
                          d(!0),
                          setTimeout(function () {
                            c("auto"), d(!1);
                          }, p))
                        : "auto" === i &&
                          (c("".concat(n.getBoundingClientRect().height, "px")),
                          d(!0),
                          setTimeout(function () {
                            return c("0px");
                          }, 50),
                          setTimeout(function () {
                            return d(!1);
                          }, p)));
                  },
                  [e]
                ),
                { height: i, isAnimating: u, ref: t }
              );
            })(x),
            b = N.ref,
            L = N.height,
            A = N.isAnimating;
          return (
            a.useEffect(function () {
              v && R();
            }, []),
            a.createElement(
              a.Fragment,
              null,
              a.createElement(
                "button",
                {
                  className: g({
                    width: f || "100%",
                    height: "100%",
                    border: "none",
                    textAlign: "left",
                    outline: "none",
                    cursor: "pointer",
                    padding: "0px",
                  }),
                  onClick: R,
                  disabled: A,
                },
                a.createElement(
                  i.xu,
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                  m || a.createElement(c.X6, { scale: "XS" }, o || ""),
                  a.createElement(u.Z, {
                    className: g(function (e) {
                      return {
                        transition: "".concat(p, "ms transform"),
                        transform: x ? "rotate(180deg)" : "rotate(0)",
                        fill: h || e.baseColor.fill.normal,
                      };
                    }),
                  })
                )
              ),
              a.createElement(
                "div",
                {
                  className: g({
                    transition: "".concat(p, "ms height"),
                    height: L,
                    overflow: !x || A ? "hidden" : "visible",
                    opacity: x ? 1 : 0,
                  }),
                },
                a.createElement(
                  "div",
                  {
                    ref: b,
                    className: g({
                      opacity: x ? 1 : 0,
                      transition: "".concat(p, "ms opacity"),
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      flexFlow: "wrap",
                    }),
                  },
                  n
                )
              )
            )
          );
        };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/3507.12fcd912.chunk.js.map
