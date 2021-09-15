(self.webpackChunklite = self.webpackChunklite || []).push([
  [5064],
  {
    28859: (e, t, r) => {
      "use strict";
      r.d(t, { u6: () => c, Am: () => u, TA: () => l });
      var a = r(63038),
        n = r.n(a),
        i = r(67294),
        o = { updateWatchedBounds: function () {}, watchedBounds: new Map() },
        c = i.createContext(o),
        u = function (e) {
          var t = new Map(),
            r = i.useState(t),
            a = n()(r, 2),
            o = a[0],
            u = a[1],
            l = { offset: { left: 0, right: 0, top: 0, bottom: 0 } },
            p = {
              watchedBounds: o,
              updateWatchedBounds: function (e, t) {
                var r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : l;
                u(function (a) {
                  var n = new Map(a);
                  return n.set(e, { ref: t, opts: r }), n;
                });
              },
            };
          return i.createElement(c.Provider, { value: p }, e.children);
        },
        l = function (e) {
          var t = e.children,
            r = e.className,
            a = e.name,
            n = e.type,
            o = e.offset,
            u = i.useContext(c).updateWatchedBounds,
            l = i.useRef(null);
          return (
            i.useEffect(function () {
              u && u(a, l, { type: n, offset: o });
            }, []),
            i.createElement("div", { className: r, ref: l }, t)
          );
        };
    },
    50391: (e, t, r) => {
      "use strict";
      r.d(t, { ph: () => qe, Jj: () => Ne, _V: () => ke });
      var a = r(28655),
        n = r.n(a),
        i = r(34575),
        o = r.n(i),
        c = r(93913),
        u = r.n(c),
        l = r(2205),
        p = r.n(l),
        h = r(78585),
        s = r.n(h),
        g = r(29754),
        d = r.n(g),
        f = r(71439),
        m = r(67294),
        E = r(28859),
        v = r(59713),
        x = r.n(v),
        y = r(63038),
        S = r.n(y),
        T = r(12291),
        b = r(3011),
        R = r(93340),
        w = r(25309),
        P = r(319),
        _ = r.n(P),
        I = r(67995),
        W = r(24438),
        O = r(28309),
        q = r(80637),
        N = function (e) {
          return function (t) {
            return x()(
              {
                marginTop: "10px",
                textAlign: e,
                maxWidth: "".concat((0, W.G)(t, 8, !0), "px"),
                marginLeft: "left" === e ? "0" : "auto",
                marginRight: "auto",
              },
              q.lg(t),
              { marginLeft: "auto", textAlign: "center" }
            );
          };
        },
        k = function (e) {
          return function () {
            var t = e && 100 * e;
            return {
              width: "".concat(t, "%"),
              position: "relative",
              left: "calc(".concat(100 - t / 2, "% - 8px)"),
              transform: "translateX(-50%)",
            };
          };
        },
        C = m.forwardRef(function (e, t) {
          var r = e.children,
            a = e.richTextStyle,
            n = e.textAlign,
            i = void 0 === n ? "center" : n,
            o = e.extendLeftRatio,
            c = (0, O.Iq)(),
            u = (0, I.n)({
              name: "detail",
              scale: "CARD" === a || "SHORTFORM_CARD" === a ? "S" : "M",
              color: "LIGHTER",
            });
          return m.createElement(
            "figcaption",
            { className: c([N(i), u].concat(_()(o ? [k(o)] : []))), ref: t },
            r
          );
        });
      function L(e) {
        var t = e.children,
          r = e.figCaption,
          a = e.className,
          n = e.figureRef;
        return m.createElement("figure", { className: a, ref: n }, t, r);
      }
      var B = r(67154),
        M = r.n(B),
        A = r(72955),
        H = r(41331),
        F = r(53006),
        U = function (e) {
          return { backgroundColor: e.baseColor.background.normal };
        },
        j = function () {
          return { width: "1px", minWidth: "100%", "*width": "100%" };
        },
        D = (0, T.$j)(function (e) {
          return { isAmp: e.config.isAmp };
        })(function (e) {
          var t,
            r = e.src,
            a = e.title,
            n = e.height,
            i = e.width,
            o = e.allowFullScreen,
            c = e.frameBorder,
            u = e.thumbnailUrl,
            l = e.rules,
            p = e.placeholderRef,
            h = e.iframeRef,
            s = e.isAmp,
            g = (0, O.Iq)(),
            d = {
              src: r,
              allowFullScreen: o,
              frameBorder: c,
              height: n,
              width: i,
            },
            f = m.useState(!1),
            E = S()(f, 2),
            v = E[0],
            x = E[1],
            y = m.useState(!1),
            T = S()(y, 2),
            b = T[0],
            R = T[1];
          if (
            (b ||
              A.V6.on("load", function () {
                return R(!0);
              }),
            null != h &&
              null !== (t = h.current) &&
              void 0 !== t &&
              t.parentElement &&
              h.current.parentElement.offsetWidth < h.current.offsetWidth &&
              !v &&
              x(!0),
            s)
          ) {
            var w,
              P = { allowFullScreen: o };
            for (var _ in P) d[_] = d[_] ? "" : null;
            return (
              (w = u
                ? m.createElement("amp-img", {
                    placeholder: "",
                    src: u,
                    layout: "fill",
                  })
                : m.createElement("div", {
                    placeholder: "",
                    className: g([F.m, U]),
                  })),
              m.createElement(
                "amp-iframe",
                M()({}, d, {
                  class: g(l),
                  placeholder: "",
                  resizable: "",
                  layout: "responsive",
                  sandbox:
                    "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox",
                }),
                w,
                m.createElement(
                  "div",
                  { tabIndex: 0, role: "button", "aria-label": "Read more" },
                  "Read more"
                )
              )
            );
          }
          return b
            ? m.createElement(
                H.v,
                { rootMargin: "200px 0px", target: p },
                function (e) {
                  return e
                    ? m.createElement(
                        "iframe",
                        M()({}, d, {
                          ref: h,
                          title: a,
                          className: g(v ? [l, j] : l),
                          scrolling: v ? "no" : "auto",
                        })
                      )
                    : null;
                }
              )
            : null;
        }),
        z = r(69703),
        G = r(65441),
        X = r(27952);
      function Q() {
        var e = n()([
          "\n  fragment IframeParagraph_paragraph on Paragraph {\n    iframe {\n      mediaResource {\n        id\n        iframeSrc\n        iframeHeight\n        iframeWidth\n        title\n      }\n    }\n    layout\n    ...getEmbedlyCardUrlParams_paragraph\n    ...Markups_paragraph\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (Q = function () {
            return e;
          }),
          e
        );
      }
      var V = function (e) {
          var t = e.host,
            r = e.isAmp,
            a = e.paragraph,
            n = e.paragraphStyle,
            i = e.richTextStyle,
            o = e.spaceTop,
            c = e.updateWatchedBounds,
            u = (0, O.Iq)(),
            l = m.useRef(null),
            p = (a.iframe || {}).mediaResource,
            h = p || {},
            s = h.id,
            g = h.iframeSrc,
            d = h.iframeHeight,
            f = h.iframeWidth,
            E = h.title,
            v = g;
          v || (v = s ? (0, X.jU$)(t, s) : "");
          var y = (function (e) {
              var t = e.src,
                r = e.initialHeight,
                a = e.initialWidth,
                n = m.useRef(null),
                i = m.useState(r),
                o = S()(i, 2),
                c = o[0],
                u = o[1],
                l = m.useState(a),
                p = S()(l, 2),
                h = p[0],
                s = p[1];
              return (
                m.useEffect(
                  function () {
                    if ("" !== t) {
                      var e = (0, R.x)(function (e, r) {
                        n.current &&
                          "MEASURE" === e.type &&
                          e.details.height > 0 &&
                          (s(n.current.offsetWidth),
                          n.current.contentWindow === r && u(e.details.height)),
                          "iframe.resize" === e.context &&
                            e.src === t &&
                            e.height > 0 &&
                            (n.current && s(n.current.offsetWidth),
                            u(e.height));
                      }).destructor;
                      return function () {
                        e();
                      };
                    }
                  },
                  [t, r]
                ),
                [c, h, n]
              );
            })({ src: v, initialHeight: d || 0, initialWidth: f || 0 }),
            T = S()(y, 3),
            P = T[0],
            _ = T[1],
            I = T[2],
            W = m.useRef(null);
          if (
            (m.useEffect(function () {
              if (c && p && p.id && _ && P) {
                var e = "";
                l.current && (e = l.current.offsetTop.toString()),
                  c("".concat(p.id, "-").concat(e), l, { type: "image" });
              }
            }, []),
            !v)
          )
            return null;
          var N = a.text
              ? m.createElement(
                  C,
                  { richTextStyle: i },
                  m.createElement(b.T2, {
                    paragraph: a,
                    paragraphStyle: n,
                    richTextStyle: i,
                  })
                )
              : null,
            k = [(0, z.qB)(o)];
          k.push(function () {
            return { clear: "both" };
          }),
            "OUTSET_LEFT" === (a.layout || void 0) &&
              "STREAM" !== i &&
              k.push(function (e) {
                var t;
                return (
                  (t = {
                    background: e.backgroundColor,
                    borderWidth: e.borderWidthThick + "px",
                    borderStyle: e.borderStyle,
                    borderColor: e.backgroundColor,
                    float: "left",
                    marginLeft: "-150px",
                    marginRight: "30px",
                    width: "75%",
                    padding: "0",
                    paddingBottom: "10px",
                  }),
                  x()(t, q.md(e), {
                    float: "none",
                    marginLeft: "0",
                    marginRight: "0",
                    width: "100%",
                  }),
                  x()(t, "marginBottom", "16px"),
                  t
                );
              });
          var B = r ? (0, G.XC)(a) : null;
          return m.createElement(
            L,
            { className: u(k), figCaption: N, figureRef: l },
            B
              ? m.createElement(
                  m.Fragment,
                  null,
                  m.createElement("amp-embedly-card", {
                    "data-url": B.url,
                    layout: "responsive",
                    width: _,
                    height: P,
                    "data-card-controls": "0",
                  })
                )
              : m.createElement(
                  w.G,
                  { height: P, width: _, backgroundColor: "NONE", ref: W },
                  m.createElement(D, {
                    placeholderRef: W,
                    iframeRef: I,
                    src: v,
                    title: E || "",
                    height: P,
                    width: _,
                    allowFullScreen: !0,
                    frameBorder: "0",
                    rules: F.m,
                  })
                )
          );
        },
        Y = m.memo(V),
        J = (0, T.$j)(function (e) {
          return { isAmp: e.config.isAmp, host: e.navigation.host };
        })(Y),
        Z = (0, f.Ps)(Q(), G.Zp, b.Zr),
        $ = r(59854),
        K = r.n($),
        ee = r(7647),
        te = r(69677),
        re = r(24219),
        ae = r(65922),
        ne = r(85432),
        ie = r(90038),
        oe = function (e) {
          return { backgroundColor: e.brandColor.sage.light };
        },
        ce = function (e, t) {
          var r = (0, ie.W6)({
              freezeGifs: !1,
              miroId: e,
              strategy: ie._S.Resample,
              width: t.breakpoints.sm,
            }),
            a = (0, ie.W6)({
              freezeGifs: !1,
              miroId: e,
              strategy: ie._S.Resample,
              width: t.breakpoints.md,
            }),
            n = (0, ie.W6)({
              freezeGifs: !1,
              miroId: e,
              strategy: ie._S.Resample,
              width: t.breakpoints.lg,
            }),
            i = (0, ie.W6)({
              freezeGifs: !1,
              miroId: e,
              strategy: ie._S.Resample,
              width: t.breakpoints.xl,
            });
          return {
            xl: "url('".concat(i, "')"),
            lg: "url('".concat(i, "')"),
            md: "url('".concat(n, "')"),
            sm: "url('".concat(a, "')"),
            xs: "url('".concat(r, "')"),
          };
        };
      function ue(e) {
        var t = e.metadata,
          r = (0, O.Iq)();
        return m.createElement(ne.Yi, null, function (e) {
          return m.createElement(
            "div",
            { className: r(oe) },
            m.createElement(ae.B, {
              backgroundImage: ce(t.id, e),
              miroId: t.id,
              height: "60vh",
              width: "100%",
              minHeight: { xl: 500, lg: 400, md: 400, sm: 300, xs: 300 },
              imgHeight: 500,
              imgWidth: 2e3,
              focusPercent:
                null === t.focusPercentX ||
                void 0 === t.focusPercentX ||
                null === t.focusPercentY ||
                void 0 === t.focusPercentY
                  ? void 0
                  : [t.focusPercentX, t.focusPercentY],
            })
          );
        });
      }
      var le = r(8558),
        pe = r(62031),
        he = r(8667);
      function se() {
        var e = n()([
          "\n  fragment ImageParagraph_privateNote on Note {\n    ...PostAnnotationsMarker_privateNote\n  }\n  ",
          "\n",
        ]);
        return (
          (se = function () {
            return e;
          }),
          e
        );
      }
      function ge() {
        var e = n()([
          "\n  fragment ImageParagraph_highlight on Quote {\n    id\n    ...Markups_highlight\n  }\n  ",
          "\n",
        ]);
        return (
          (ge = function () {
            return e;
          }),
          e
        );
      }
      function de() {
        var e = n()([
          "\n  fragment ImageParagraph_paragraph on Paragraph {\n    href\n    layout\n    metadata {\n      id\n      originalHeight\n      originalWidth\n      focusPercentX\n      focusPercentY\n      alt\n    }\n    ...Markups_paragraph\n    ...ParagraphRefsMapContext_paragraph\n    ...PostAnnotationsMarker_paragraph\n  }\n  ",
          "\n  ",
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
      var fe = function (e) {
          var t = e.width,
            r = e.isCard,
            a = e.paragraphLayout,
            n = e.originalWidth,
            i = e.imageProps,
            o = (0, O.Iq)(),
            c = {};
          return (
            t > 0 && (c.maxWidth = "".concat(t, "px")),
            r &&
              ("INSET_CENTER" === a || "OUTSET_LEFT" === a) &&
              n &&
              ((c.marginLeft = "auto"), (c.marginRight = "auto")),
            m.createElement(
              "div",
              { className: o(c) },
              m.createElement(le.Fh, i)
            )
          );
        },
        me = function (e) {
          var t = e.highlights,
            r = e.isSequenceCover,
            a = void 0 !== r && r,
            n = e.marginTopOverride,
            i = e.paragraph,
            o = e.paragraphStyle,
            c = e.privateNotes,
            u = e.richTextStyle,
            l = e.sequenceAspectRatio,
            p = e.spaceTop,
            h = e.updateWatchedBounds,
            s = (0, O.Iq)(),
            g = m.useRef(null),
            d = (0, te.CF)(i, o),
            f = m.useContext(ee.U);
          return (
            m.useEffect(function () {
              if (h) {
                var e = i.name,
                  t = i.metadata && i.metadata.id;
                if (e && t) {
                  var r = "";
                  g.current && (r = g.current.offsetTop.toString()),
                    h("".concat(e, "-").concat(t, "-").concat(r), g, {
                      type: "image",
                    });
                }
              }
            }, []),
            m.useMemo(
              function () {
                var e = i.metadata,
                  r = i.layout;
                if (!e) return null;
                var h,
                  E = e.id,
                  v = e.originalHeight,
                  y = e.originalWidth,
                  S = e.alt,
                  T = (0, ie.JI)(E),
                  R = "CARD" === u || "SHORTFORM_CARD" === u,
                  w = (0, he.jg)({
                    layout: r,
                    originalWidth: y || 0,
                    originalHeight: v || 0,
                    sequenceAspectRatio: l,
                    richTextStyle: u,
                  }),
                  P = w.width,
                  _ = w.height,
                  I = w.strategy,
                  W = w.otherWidths;
                if ("OUTSET_ROW_CONTINUE" === r && y && v && l) {
                  var O = y / v;
                  h = K()(l / O, 2);
                }
                var N,
                  k = i.text
                    ? m.createElement(
                        C,
                        {
                          ref: d,
                          richTextStyle: u,
                          textAlign: a ? "left" : "center",
                          extendLeftRatio: h,
                        },
                        c &&
                          m.createElement(re.A7, {
                            paragraph: i,
                            privateNotes: c,
                          }),
                        m.createElement(b.T2, {
                          highlights: t,
                          paragraph: i,
                          paragraphStyle: o,
                          richTextStyle: u,
                        })
                      )
                    : null;
                if (a)
                  N = m.createElement(ue, {
                    metadata: {
                      id: E,
                      focusPercentX: e.focusPercentX,
                      focusPercentY: e.focusPercentY,
                    },
                  });
                else {
                  var B = {
                    isAmp: !1,
                    alt: S || "",
                    miroId: E,
                    height: _,
                    width: P,
                    rules: f
                      ? [{ width: "100%", maxWidth: "100%", height: "auto" }]
                      : _
                      ? [F.m]
                      : [{ maxWidth: "100%" }],
                    maxWidth: _ ? void 0 : "100%",
                    strategy: I,
                    freezeGifs: "STREAM" === u || "RESAMPLE" !== I,
                    focusPercentX: e.focusPercentX,
                    focusPercentY: e.focusPercentY,
                    expectedWidth: P,
                    otherWidths: W,
                  };
                  if ((0, G.jH)(u)) {
                    if (!P || !_)
                      return m.createElement(
                        "div",
                        { className: s((0, z.qB)(p)) },
                        m.createElement(fe, {
                          width: P,
                          originalWidth: y,
                          imageProps: B,
                          isCard: R,
                          paragraphLayout: r,
                        })
                      );
                    N = m.createElement(fe, {
                      width: P,
                      originalWidth: y,
                      imageProps: B,
                      isCard: R,
                      paragraphLayout: r,
                    });
                  } else if (
                    "OUTSET_LEFT" === r ||
                    "INSET_LEFT" === r ||
                    ("INSET_CENTER" === r && y) ||
                    ("OUTSET_CENTER" === r && y)
                  ) {
                    var A = y && (T ? y / 2 : y);
                    N = m.createElement(
                      pe.X1,
                      {
                        isLinked: !!i.href,
                        width: B.width,
                        height: B.height,
                        originalHeight: e.originalHeight,
                        originalWidth: e.originalWidth,
                        paragraphRef: g,
                      },
                      m.createElement(
                        "div",
                        {
                          className: s(function (e) {
                            return {
                              marginLeft: "auto",
                              marginRight: "auto",
                              maxWidth:
                                "OUTSET_CENTER" === r &&
                                A &&
                                A < e.maxWidths.outset
                                  ? "".concat(e.maxWidths.outset, "px")
                                  : "".concat(A, "px"),
                            };
                          }),
                        },
                        m.createElement(
                          le.Fh,
                          M()({}, B, {
                            height: e.originalHeight || B.height,
                            width: e.originalWidth || B.width,
                          })
                        )
                      )
                    );
                  } else
                    N =
                      y && "INSET_CENTER" !== r
                        ? m.createElement(
                            pe.X1,
                            {
                              isLinked: !!i.href,
                              width: B.width,
                              height: B.height,
                              originalHeight: e.originalHeight,
                              originalWidth: e.originalWidth,
                              paragraphRef: g,
                            },
                            m.createElement(
                              le.Fh,
                              M()({}, B, {
                                height: e.originalHeight || B.height,
                                width: e.originalWidth || B.width,
                              })
                            )
                          )
                        : m.createElement(
                            ne.xu,
                            {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              sm: { display: "block" },
                            },
                            m.createElement(
                              pe.X1,
                              {
                                isLinked: !!i.href,
                                width: B.width,
                                height: B.height,
                                originalHeight: e.originalHeight,
                                originalWidth: e.originalWidth,
                                paragraphRef: g,
                              },
                              m.createElement(
                                le.Fh,
                                M()({}, B, {
                                  width: null,
                                  maxWidth: "100%",
                                  strategy: null,
                                })
                              )
                            )
                          );
                  i.href && (N = m.createElement("a", { href: i.href }, N));
                }
                var H =
                  "SHORTFORM_CARD" === u
                    ? []
                    : [n ? (0, z.qB)(n) : (0, z.qB)(p)];
                if ((H.push({ clear: "both" }), a))
                  H.push(function (e) {
                    return x()({}, q.lg(e), {
                      paddingLeft: "0px",
                      paddingRight: "0px",
                    });
                  });
                else if (
                  ("OUTSET_ROW" === r || "OUTSET_ROW_CONTINUE" === r) &&
                  y &&
                  v &&
                  l
                ) {
                  var U = y / v,
                    j = K()((U / l) * 100, 2);
                  H.push({
                    width: "".concat(j, "%"),
                    marginRight: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    ":last-of-type": { marginRight: 0 },
                  });
                } else
                  "OUTSET_CENTER" === r
                    ? H.push({ paddingBottom: "5px", paddingTop: "5px" })
                    : "OUTSET_LEFT" === r && R
                    ? H.push({ marginLeft: "auto", marginRight: "auto" })
                    : "OUTSET_LEFT" !== r || R
                    ? "INSET_LEFT" === r
                      ? H.push({
                          float: "left",
                          width: "50%",
                          paddingBottom: "10px",
                          paddingRight: "30px",
                          marginBottom: "16px",
                        })
                      : "FULL_WIDTH" === r
                      ? H.push({ width: "100%" })
                      : "INSET_CENTER" === r &&
                        H.push({ marginLeft: "auto", marginRight: "auto" })
                    : H.push(function (e) {
                        var t;
                        return (
                          (t = {
                            background: e.backgroundColor,
                            borderWidth: e.borderWidthThick + "px",
                            borderStyle: e.borderStyle,
                            borderColor: e.backgroundColor,
                            float: "left",
                            marginLeft: "-150px",
                            marginRight: "30px",
                            width: "75%",
                            padding: "0",
                            paddingBottom: "10px",
                          }),
                          x()(t, q.lg(e), {
                            float: "none",
                            marginLeft: "0",
                            marginRight: "0",
                            width: "100%",
                          }),
                          x()(t, "marginBottom", "16px"),
                          t
                        );
                      });
                return m.createElement(
                  L,
                  {
                    className: "".concat(s(H), " paragraph-image"),
                    figCaption: k,
                    figureRef: g,
                  },
                  N
                );
              },
              [JSON.stringify(i), JSON.stringify(c)]
            )
          );
        },
        Ee = m.memo(me),
        ve = (0, f.Ps)(de(), b.Zr, te.pK, re.Mx),
        xe = (0, f.Ps)(ge(), b.DV),
        ye = (0, f.Ps)(se(), re.uR),
        Se = r(64504);
      function Te() {
        var e = n()([
          "\n  fragment MixtapeParagraph_paragraph on Paragraph {\n    text\n    type\n    mixtapeMetadata {\n      href\n      thumbnailImageId\n    }\n    markups {\n      start\n      end\n      type\n      href\n    }\n  }\n",
        ]);
        return (
          (Te = function () {
            return e;
          }),
          e
        );
      }
      var be = function (e) {
          return {
            boxShadow: "inset 0 0 0 1px ".concat(e.baseColor.border.lighter),
          };
        },
        Re = function (e) {
          var t = e.paragraph,
            r = e.spaceTop,
            a = e.structuredMarkup,
            n = (0, O.Iq)(),
            i = t.mixtapeMetadata,
            o = t.type;
          if (!i || !i.href || !o) return null;
          var c = i.href,
            u =
              a ||
              (function (e) {
                var t = e.text,
                  r = e.markups;
                if (!t) return null;
                var a = r.find(function (e) {
                  return "STRONG" === e.type;
                });
                if (!a) return null;
                var n = r.find(function (e) {
                    return "EM" === e.type;
                  }),
                  i = a.end,
                  o = n ? n.end : a.end;
                return {
                  title: t.slice(a.start, i).trim(),
                  description: n ? t.slice(n.start, n.end).trim() : null,
                  domain: t.slice(o).trim() || null,
                };
              })(t);
          if (!u) return null;
          var l = u.title,
            p = u.description,
            h = u.domain,
            s = [(0, z.qB)(r), be];
          return m.createElement(
            "div",
            { className: n(s) },
            m.createElement(
              ne.P3,
              { href: c || "", disableSourceParam: !0, target: "_blank" },
              m.createElement(
                ne.xu,
                { display: "flex", flexShrink: "0", padding: "0px" },
                m.createElement(
                  ne.xu,
                  {
                    padding: "16px 20px",
                    flexShrink: "1",
                    flexGrow: "1",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    sm: { padding: "10px 12px 10px" },
                  },
                  m.createElement(Se.Dx, { scale: "XS", clamp: 2 }, l),
                  p &&
                    m.createElement(
                      ne.xu,
                      { marginTop: "8px" },
                      m.createElement(Se.QE, { scale: "S", clamp: 2 }, p)
                    ),
                  h &&
                    m.createElement(
                      ne.xu,
                      { marginTop: "12px" },
                      m.createElement(Se.F, { scale: "S", clamp: 2 }, h)
                    )
                ),
                i &&
                  i.thumbnailImageId &&
                  m.createElement(
                    ne.xu,
                    { width: "160px" },
                    m.createElement(ae.B, {
                      boxShadowRules: be,
                      miroId: i.thumbnailImageId,
                      width: 160,
                      height: 167,
                      strategy: ie._S.Resample,
                      focusPercent: [50, 50],
                      imgHeight: 167,
                      imgWidth: 160,
                    })
                  )
              )
            )
          );
        },
        we = (0, f.Ps)(Te()),
        Pe = r(19692),
        _e = r(11642);
      function Ie() {
        var e = n()([
          "\n      fragment PostBodyParagraph_paragraph on Paragraph {\n        name\n        type\n        ...ImageParagraph_paragraph\n        ...TextParagraph_paragraph\n        ...IframeParagraph_paragraph\n        ...MixtapeParagraph_paragraph\n      }\n      ",
          "\n      ",
          "\n      ",
          "\n      ",
          "\n    ",
        ]);
        return (
          (Ie = function () {
            return e;
          }),
          e
        );
      }
      function We() {
        var e = n()([
          "\n  fragment PostBodyParagraph_privateNote on Note {\n    ...TextParagraph_privateNote\n    ...ImageParagraph_privateNote\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (We = function () {
            return e;
          }),
          e
        );
      }
      function Oe() {
        var e = n()([
          "\n  fragment PostBodyParagraph_highlight on Quote {\n    ...TextParagraph_highlight\n    ...ImageParagraph_highlight\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (Oe = function () {
            return e;
          }),
          e
        );
      }
      var qe = (function (e) {
        p()(n, e);
        var t,
          r,
          a =
            ((t = n),
            (r = (function () {
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
                a = d()(t);
              if (r) {
                var n = d()(this).constructor;
                e = Reflect.construct(a, arguments, n);
              } else e = a.apply(this, arguments);
              return s()(this, e);
            });
        function n() {
          return o()(this, n), a.apply(this, arguments);
        }
        return (
          u()(n, [
            {
              key: "render",
              value: function () {
                var e,
                  t = this.props,
                  r = t.highlights,
                  a = t.inserts,
                  n = t.marginTopOverride,
                  i = t.paragraph,
                  o = t.paragraphStyle,
                  c = t.privateNotes,
                  u = t.richTextStyle,
                  l = t.sequenceAspectRatio,
                  p = t.spaceTop;
                switch (o) {
                  case G.qq.IMG:
                    e = m.createElement(E.u6.Consumer, null, function (e) {
                      var t = e.updateWatchedBounds;
                      return m.createElement(Ee, {
                        highlights: r,
                        marginTopOverride: n,
                        paragraph: i,
                        paragraphStyle: o,
                        privateNotes: c,
                        richTextStyle: u,
                        sequenceAspectRatio: l,
                        spaceTop: p,
                        updateWatchedBounds: t,
                      });
                    });
                    break;
                  case G.qq.P:
                  case G.qq.BQ:
                  case G.qq.PQ:
                  case G.qq.H1:
                  case G.qq.H2:
                  case G.qq.H3:
                  case G.qq.H4:
                  case G.qq.ULI:
                  case G.qq.OLI:
                  case G.qq.PRE:
                  case G.qq.Kicker:
                  case G.qq.Subtitle:
                  case G.qq.Title:
                    e = m.createElement(Pe.Do, {
                      highlights: r,
                      marginTopOverride: n,
                      paragraph: i,
                      paragraphStyle: o,
                      privateNotes: c,
                      richTextStyle: u,
                      spaceTop: p,
                    });
                    break;
                  case G.qq.IFRAME:
                    e = m.createElement(E.u6.Consumer, null, function (e) {
                      var t = e.updateWatchedBounds;
                      return m.createElement(J, {
                        paragraph: i,
                        paragraphStyle: o,
                        richTextStyle: u,
                        spaceTop: p,
                        updateWatchedBounds: t,
                      });
                    });
                    break;
                  case G.qq.MIXTAPE_EMBED:
                    e = m.createElement(Re, {
                      paragraph: i,
                      paragraphStyle: o,
                      richTextStyle: u,
                      spaceTop: p,
                    });
                    break;
                  case G.qq.COVER_TITLE:
                  case G.qq.SECTION_CAPTION:
                  case G.qq.HR:
                    e = null;
                    break;
                  default:
                    (0, _e.v)(o), (e = null);
                }
                return a && a.length
                  ? m.createElement(
                      m.Fragment,
                      null,
                      a.map(function (e) {
                        return "before" === e.order && e.component;
                      }),
                      e,
                      a.map(function (e) {
                        return "after" === e.order && e.component;
                      })
                    )
                  : e;
              },
            },
          ]),
          n
        );
      })(m.Component);
      qe.fragments = { paragraph: (0, f.Ps)(Ie(), Z, ve, Pe.Rg, we) };
      var Ne = (0, f.Ps)(Oe(), Pe.m8, xe),
        ke = (0, f.Ps)(We(), Pe.hz, ye);
    },
    95064: (e, t, r) => {
      "use strict";
      r.d(t, {
        ZQ: () => P,
        PL: () => _,
        NR: () => I,
        lD: () => W,
        l: () => q,
      });
      var a = r(63038),
        n = r.n(a),
        i = r(28655),
        o = r.n(i),
        c = r(59713),
        u = r.n(c),
        l = r(67154),
        p = r.n(l),
        h = r(71439),
        s = r(67294),
        g = r(28859),
        d = r(10515),
        f = r(50391),
        m = r(19692),
        E = r(98701),
        v = r(28309),
        x = r(80637),
        y = r(65441);
      function S(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          t &&
            (a = a.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, a);
        }
        return r;
      }
      function T(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? S(Object(r), !0).forEach(function (t) {
                u()(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : S(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function b() {
        var e = o()([
          "\n  fragment ParagraphStyleGrouping_privateNote on Note {\n    ...PostBodyParagraph_privateNote\n  }\n  ",
          "\n",
        ]);
        return (
          (b = function () {
            return e;
          }),
          e
        );
      }
      function R() {
        var e = o()([
          "\n  fragment ParagraphStyleGrouping_highlight on Quote {\n    ...PostBodyParagraph_highlight\n  }\n  ",
          "\n",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      function w(e) {
        var t = e.styleGroup,
          r = e.postBodyInserts,
          a = e.richTextStyle,
          n = (0, v.Iq)(),
          i = N(t),
          o = t.paragraphViewModels.map(function (e) {
            var i = e.paragraph.name,
              o = r && r[i],
              c = s.createElement(
                f.ph,
                p()({ key: e.paragraph.name, inserts: o }, e)
              );
            return "Title" === e.paragraphStyle ||
              "Subtitle" === e.paragraphStyle
              ? s.createElement(
                  g.TA,
                  {
                    name: "title",
                    type: "byline",
                    offset: { left: -600 },
                    key: "".concat(e.paragraph.name, "-wb"),
                    className:
                      "SHORTFORM_CARD" === a
                        ? n(function (e) {
                            return u()(
                              {
                                zIndex: 2,
                                position: "absolute",
                                bottom: "".concat(
                                  t.paragraphViewModels[0]
                                    .marginBottomOverride || 0,
                                  "px"
                                ),
                                margin: "48px 40px",
                              },
                              x.md(e),
                              { margin: "32px 24px" }
                            );
                          })
                        : "",
                  },
                  c
                )
              : c;
          });
        return i
          ? s.createElement(d.M.Consumer, null, function (e) {
              return s.createElement(
                i,
                {
                  className: n([
                    q({
                      paragraphStyle: t.paragraphStyle,
                      topSpacing: t.topSpacing,
                      paragraphLayout: t.paragraphLayout,
                      richTextStyle: t.paragraphViewModels[0].richTextStyle,
                      isEmbedded: e,
                    }),
                  ]),
                },
                o
              );
            })
          : o;
      }
      var P = s.memo(w),
        _ = (0, h.Ps)(R(), f.Jj),
        I = (0, h.Ps)(b(), f._V),
        W = function (e) {
          var t = [];
          return (
            e.forEach(function (e) {
              var r = e.paragraphStyle,
                a = e.paragraph.layout,
                n = t[t.length - 1];
              n && O(n, e)
                ? n.paragraphViewModels.push(e)
                : t.push({
                    paragraphStyle: r,
                    paragraphLayout: a,
                    topSpacing: e.sequenceSpaceTop || 0,
                    paragraphViewModels: [e],
                  });
            }),
            t
          );
        },
        O = function (e, t) {
          if (e.paragraphStyle !== t.paragraphStyle) return !1;
          var r = t.paragraph.layout;
          return "OUTSET_ROW" === e.paragraphLayout
            ? "OUTSET_ROW_CONTINUE" === r
            : e.paragraphLayout === r;
        },
        q = function (e) {
          var t = e.paragraphStyle,
            r = e.topSpacing,
            a = e.paragraphLayout,
            i = e.richTextStyle,
            o = e.isEmbedded;
          return function (e) {
            var c = {};
            switch (
              (r &&
                (c.marginTop = (0, E.mu)(function (e) {
                  var t = n()(e, 1)[0];
                  return "".concat(t, "px");
                }, r)),
              t)
            ) {
              case "BQ":
                var u = e.baseColor.border.darker || "";
                return T(
                  T({}, c),
                  {},
                  {
                    boxShadow: "inset ".concat(3, "px 0 0 0 ").concat(u),
                    paddingLeft: "".concat(23, "px"),
                    marginLeft: (0, y.jH)(i) ? "0px" : "-20px",
                  }
                );
              case "PRE":
                return T(
                  T({}, c),
                  {},
                  {
                    padding: "20px",
                    background: e.baseColor.background.normal,
                    overflowX: "auto",
                  }
                );
              case "PQ":
                return T(
                  T({}, c),
                  {},
                  { paddingLeft: "SERIES" === i ? "0px" : "30px" }
                );
              case "ULI":
                if (o) return m.Pq;
            }
            switch (a) {
              case "OUTSET_ROW":
                return T(
                  T({}, c),
                  {},
                  { display: "flex", flexDirection: "row" }
                );
            }
            return c;
          };
        },
        N = function (e) {
          var t = e.paragraphStyle,
            r = e.paragraphLayout;
          switch (t) {
            case "OLI":
              return "ol";
            case "ULI":
              return "ul";
            case "BQ":
            case "PQ":
              return "blockquote";
            case "PRE":
              return "pre";
          }
          switch (r) {
            case "OUTSET_ROW":
              return "div";
          }
          return null;
        };
    },
    93340: (e, t, r) => {
      "use strict";
      function a(e) {
        e &&
          e.iframe &&
          e.height &&
          e.iframe.getAttribute &&
          "number" == typeof e.height &&
          o({
            context: "iframe.resize",
            height: e.height,
            src: e.iframe.getAttribute("src") || "",
          });
      }
      function n(e) {
        if (e.data && "string" == typeof e.data) {
          var t;
          try {
            t = JSON.parse(e.data);
          } catch (e) {
            return;
          }
          o(t, e.source);
        }
      }
      r.d(t, { x: () => c });
      var i = [];
      function o(e, t) {
        i.forEach(function (r) {
          return r(e, t);
        });
      }
      function c(e) {
        return (
          window._resizeIframe ||
            ((window._resizeIframe = a), window.addEventListener("message", n)),
          i.push(e),
          {
            destructor: function () {
              0 ===
                (i = i.filter(function (t) {
                  return e !== t;
                })).length &&
                "undefined" != typeof window &&
                ((window._resizeIframe = null),
                window.removeEventListener("message", n));
            },
          }
        );
      }
    },
    65922: (e, t, r) => {
      "use strict";
      r.d(t, { B: () => s });
      var a = r(63038),
        n = r.n(a),
        i = r(67294),
        o = r(98701),
        c = r(28309),
        u = r(90038),
        l = function (e) {
          var t = n()(e, 1)[0];
          return "number" == typeof t ? "".concat(t, "px") : t;
        },
        p = function (e) {
          var t = n()(e, 1)[0];
          return "".concat(t[0], "% ").concat(t[1], "%");
        },
        h = function (e) {
          return n()(e, 1)[0];
        };
      function s(e) {
        var t = e.backgroundImage,
          r = e.boxShadowRules,
          a = e.miroId,
          n = e.height,
          s = e.width,
          g = e.minHeight,
          d = e.minWidth,
          f = e.imgHeight,
          m = e.imgWidth,
          E = e.focusPercent,
          v = e.strategy,
          x = void 0 === v ? u._S.Resample : v,
          y = e.darken,
          S = e.freezeGifs,
          T = (0, c.Iq)(),
          b = t;
        if (!b) {
          var R = (0, u.W6)({
            miroId: a,
            height: f,
            width: m,
            strategy: x,
            darken: y,
            freezeGifs: S,
          });
          b = "url(".concat(R, ")");
        }
        var w = (0, o.mu)(l, n),
          P = (0, o.mu)(l, s),
          _ = g && (0, o.mu)(l, g),
          I = d && (0, o.mu)(l, d),
          W = (0, o.mu)(p, E),
          O = {
            backgroundImage: (0, o.mu)(h, b),
            display: "block",
            backgroundOrigin: "border-box",
            backgroundSize: "cover",
            height: w,
            width: P,
            minHeight: _,
            minWidth: I,
            backgroundPosition: W,
            maxWidth: "100%",
          };
        return i.createElement("div", { className: T([O, r]) });
      }
      s.defaultProps = { focusPercent: [50, 50] };
    },
    41331: (e, t, r) => {
      "use strict";
      r.d(t, { v: () => c });
      var a = r(63038),
        n = r.n(a),
        i = r(67294),
        o = r(72955),
        c = function (e) {
          var t = e.rootMargin,
            r = e.children,
            a = e.target,
            c = i.useState(!1),
            u = n()(c, 2),
            l = u[0],
            p = u[1],
            h = i.useCallback(
              function (e) {
                !l && e.isIntersecting && p(!0);
              },
              [l]
            );
          return (
            (0, o.S1)(
              {
                onIntersect: h,
                target: a,
                disconnect: function () {
                  return l;
                },
                rootMargin: t,
              },
              [l]
            ),
            "function" == typeof r
              ? i.createElement(i.Fragment, null, r(l))
              : l
              ? i.createElement(i.Fragment, null, r)
              : null
          );
        };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/5064.7974654b.chunk.js.map
