(self.webpackChunklite = self.webpackChunklite || []).push([
  [4697],
  {
    4697: (e, n, t) => {
      "use strict";
      t.d(n, { Xw: () => A, e0: () => O, Rf: () => N });
      var r = t(59713),
        o = t.n(r),
        i = t(28655),
        l = t.n(i),
        a = t(71439),
        c = t(67294),
        u = t(90194),
        s = t(85432),
        m = t(27572),
        d = t(534);
      function p() {
        var e = l()([
          "\n  fragment NewsletterV3AmpButton_newsletterV3 on NewsletterV3 {\n    id\n    collection {\n      ...collectionDefaultBackgroundTheme_collection\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      var f = (0, a.Ps)(p(), d.Gi),
        g = function (e) {
          var n = e.newsletterV3,
            t = e.buttonLayout,
            r = void 0 === t ? "MULTI-LINE" : t,
            o = e.buttonSize,
            i = void 0 === o ? "LARGE" : o,
            l = e.buttonStyle,
            a = void 0 === l ? "STRONG" : l,
            p = e.redirectUrl;
          return c.createElement(s.Yi, null, function (e) {
            return c.createElement(
              s.f6,
              { theme: (0, d.jN)(null == n ? void 0 : n.collection, e) },
              c.createElement(
                m.cW,
                { source: { newsletterV3Id: n.id }, extendSource: !0 },
                c.createElement(
                  s.xu,
                  {
                    margin: "COMPACT" === r ? "10px 20px 10px 0" : "",
                    xs: { margin: "10px 0 0 0" },
                  },
                  c.createElement(u.w, {
                    buttonSize: i,
                    buttonStyle: a,
                    newsletterV3Id: null == n ? void 0 : n.id,
                    onClick: function () {
                      return null;
                    },
                    showMailIcon: !1,
                    buttonText: "Learn more",
                    redirectUrl: p,
                  })
                )
              )
            );
          });
        },
        w = t(31429),
        E = t(55346),
        x = t(53976),
        b = t(34675),
        v = t(73891),
        h = t(64504),
        y = t(27599),
        V = t(28309),
        S = t(72955),
        T = t(14391),
        C = t(67297),
        _ = t(80637),
        R = t(27952);
      function k() {
        var e = l()([
          "\n  fragment NewsletterV3Promo_publisher on Publisher {\n    __typename\n    ... on User {\n      id\n      username\n      name\n      viewerIsUser\n      newsletterV3 {\n        id\n        ...NewsletterV3Promo_newsletterV3\n      }\n    }\n    ... on Collection {\n      id\n      slug\n      domain\n      name\n      newsletterV3 {\n        id\n        ...NewsletterV3Promo_newsletterV3\n      }\n      viewerEdge {\n        id\n        isEditor\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (k = function () {
            return e;
          }),
          e
        );
      }
      function L() {
        var e = l()([
          "\n  fragment NewsletterV3Promo_newsletterV3 on NewsletterV3 {\n    slug\n    name\n    description\n    ...NewsletterV3AmpButton_newsletterV3\n    ...NewsletterV3SubscribeButton_newsletterV3\n    ...NewsletterV3SubscribeByEmail_newsletterV3\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (L = function () {
            return e;
          }),
          e
        );
      }
      var O = (0, a.Ps)(L(), f, w.B, E.Lh),
        N = (0, a.Ps)(k(), O),
        I = function (e) {
          return o()(
            {
              borderTop: "3px solid ".concat(e.accentColor.border.normal),
              padding: "32px 32px 26px 32px",
              marginTop: "8px",
              marginBottom: "25px",
              backgroundColor: e.baseColor.background.light,
            },
            _.sm(e),
            { padding: "24px 24px 28px 24px" }
          );
        },
        P = function (e) {
          var n = e.isAmp,
            t = e.viewer,
            r = e.newsletterV3,
            o = e.newsletterV3LandingUrl,
            i = e.useCustomDomainLOFlow;
          return n
            ? r &&
                c.createElement(g, {
                  newsletterV3: r,
                  buttonLayout: "COMPACT",
                  redirectUrl: o,
                })
            : t || i
            ? r &&
              c.createElement(w.x, {
                newsletterV3: r,
                buttonLayout: "COMPACT",
                helperTextColor: "DARKER",
                redirectUrl: i ? o : void 0,
              })
            : r && c.createElement(E.QL, { newsletterV3: r });
        },
        A = function (e) {
          var n,
            t,
            r,
            o,
            i,
            l = e.postId,
            a = e.publisher,
            u = c.useRef(null),
            d = (0, C.v9)(function (e) {
              return e.config.authDomain;
            }),
            p = (0, C.p9)(function (e) {
              return e.config.isAmp;
            }),
            f = (0, y.Av)(),
            g = (0, V.Iq)(),
            w = (0, b.Hk)().value,
            E = !!(0, x.V)({
              name: "enable_newsletter_lo_flow_custom_domains",
              placeholder: !1,
            }),
            _ =
              null ==
              (0, C.v9)(function (e) {
                return e.navigation.currentLocation;
              }).match("http[s]?://[^/]*".concat(d)),
            k = !w && _ && E,
            L = a.newsletterV3,
            O = null == L ? void 0 : L.type,
            N = a.username,
            A = void 0 === N ? "" : N,
            B = (0, R.iBn)(
              null !== (n = null == L ? void 0 : L.slug) && void 0 !== n
                ? n
                : "",
              d,
              O === T.Rr.NEWSLETTER_TYPE_COLLECTION ? a : void 0,
              O === T.Rr.NEWSLETTER_TYPE_AUTHOR && A ? A : void 0
            ),
            D = "Collection" === a.__typename ? a.id : void 0,
            U = (0, v.g)(D).viewerEdge;
          switch (O) {
            case T.Rr.NEWSLETTER_TYPE_COLLECTION:
              (t = "Sign up for ".concat(null == L ? void 0 : L.name)),
                (r = "0px"),
                (o = "You're an editor of ".concat(
                  null == L ? void 0 : L.name
                )),
                (i = null == U ? void 0 : U.isEditor);
              break;
            case T.Rr.NEWSLETTER_TYPE_AUTHOR:
              (t = "Get ".concat(a.name, "'s stories in your inbox")),
                (r = "6px"),
                (o = "You cannot subscribe to yourself"),
                (i = a.viewerIsUser);
          }
          var M = !1,
            W = function () {
              !M &&
                j() &&
                (f.event("newsletterV3.promoViewed", {
                  newsletterV3Id: null == L ? void 0 : L.id,
                  postId: l,
                }),
                (M = !0));
            },
            j = function () {
              var e;
              if (!u.current) return !1;
              var n =
                  null === (e = u.current) || void 0 === e
                    ? void 0
                    : e.getBoundingClientRect(),
                t = n.top + n.height / 2;
              return t >= 0 && t <= window.innerHeight;
            };
          return (
            c.useEffect(function () {
              return (
                W(),
                window && S.V6.on("scroll", W),
                function () {
                  S.V6.off("scroll", W);
                }
              );
            }, []),
            L &&
              c.createElement(
                m.cW,
                {
                  source: {
                    name: "newsletter_v3_promo",
                    susiEntry: "newsletter_v3_promo",
                  },
                },
                c.createElement(
                  "div",
                  { ref: u, className: g(I) },
                  c.createElement(
                    s.xu,
                    { paddingBottom: r },
                    c.createElement(
                      h.X6,
                      {
                        scale: { xs: "S", sm: "S", md: "M", lg: "M", xl: "M" },
                      },
                      t
                    )
                  ),
                  O === T.Rr.NEWSLETTER_TYPE_COLLECTION &&
                    c.createElement(
                      c.Fragment,
                      null,
                      c.createElement(
                        s.xu,
                        { paddingTop: "4px" },
                        c.createElement(
                          h.F,
                          { tag: "h3", scale: "S", color: "DARKER" },
                          "By ".concat(a.name)
                        )
                      ),
                      c.createElement(
                        s.xu,
                        { paddingTop: "8px", paddingBottom: "10px" },
                        c.createElement(
                          h.F,
                          {
                            scale: {
                              xs: "M",
                              sm: "M",
                              md: "L",
                              lg: "L",
                              xl: "L",
                            },
                            color: "DARKER",
                          },
                          null == L ? void 0 : L.description,
                          " ",
                          !p &&
                            c.createElement(
                              s.rU,
                              { inline: !0, linkStyle: "OBVIOUS", href: B },
                              "Take a look."
                            )
                        )
                      )
                    ),
                  i
                    ? c.createElement(
                        s.xu,
                        { paddingTop: "10px" },
                        c.createElement(h.F, { scale: "M", color: "DARKER" }, o)
                      )
                    : c.createElement(
                        s.xu,
                        { display: "flex", flexWrap: "wrap" },
                        c.createElement(P, {
                          viewer: w,
                          isAmp: p,
                          useCustomDomainLOFlow: k,
                          newsletterV3: L,
                          newsletterV3LandingUrl: B,
                        })
                      )
                )
              )
          );
        };
    },
    55346: (e, n, t) => {
      "use strict";
      t.d(n, { QL: () => P, Lh: () => B });
      var r = t(28655),
        o = t.n(r),
        i = t(59713),
        l = t.n(i),
        a = t(63038),
        c = t.n(a),
        u = t(46829),
        s = t(71439),
        m = t(67294),
        d = t(90194),
        p = t(85432),
        f = t(28309),
        g = {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        w = function (e) {
          return function (n) {
            return {
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: ""
                .concat(n.baseColor.border.light, " transparent ")
                .concat(n.baseColor.border.light, " ")
                .concat(n.baseColor.border.light),
              animation: "".concat(e, " 1s infinite linear;"),
            };
          };
        },
        E = function (e) {
          var n = e.buttonSize,
            t = void 0 === n ? "LARGE" : n,
            r = e.buttonStyle,
            o = void 0 === r ? "STRONG" : r,
            i = (0, f.Iq)(),
            l = function () {
              var e = (0, f.om)({ keyframesName: g }).keyframesName;
              return m.createElement("div", { className: i(w(e)) });
            },
            a = function () {
              return m.createElement(
                p.xu,
                null,
                m.createElement(
                  p.xu,
                  {
                    display: "inline-block",
                    float: "left",
                    marginRight: "8px",
                  },
                  m.createElement(l, null)
                ),
                m.createElement(p.xu, { float: "left" }, "Loading..")
              );
            };
          return m.createElement(
            "div",
            { style: { cursor: "wait" } },
            m.createElement(
              p.zx,
              {
                buttonStyle: o,
                onClick: function () {
                  return null;
                },
                size: t,
                width: "207px",
                disabled: !0,
              },
              m.createElement(a, null)
            )
          );
        },
        x = t(90738),
        b = t(14414),
        v = t(31285),
        h = t(7462),
        y = t(64504),
        V = t(27572),
        S = t(37581),
        T = t(67297),
        C = t(49456),
        _ = t(51299),
        R = t(27952),
        k = t(534);
      function L() {
        var e = o()([
          "\n  fragment NewsletterV3SubscribeByEmail_newsletterV3 on NewsletterV3 {\n    id\n    slug\n    collection {\n      ...collectionDefaultBackgroundTheme_collection\n      ...collectionUrl_collection\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (L = function () {
            return e;
          }),
          e
        );
      }
      function O() {
        var e = o()([
          "\n  mutation SendNewsletterSubscriptionAcctAuthEmail(\n    $newsletterV3Id: String!\n    $email: String!\n    $redirect: String\n    $captchaValue: String\n    $operation: String\n  ) {\n    sendNewsletterSubscriptionAcctAuthEmail(\n      newsletterV3Id: $newsletterV3Id\n      email: $email\n      redirect: $redirect\n      captchaValue: $captchaValue\n      operation: $operation\n    ) {\n      ... on SusiMethod {\n        value\n      }\n      ... on BadRequest {\n        message\n      }\n      ... on FailedChallenge {\n        message\n      }\n      ... on NotFound {\n        message\n      }\n    }\n  }\n",
        ]);
        return (
          (O = function () {
            return e;
          }),
          e
        );
      }
      function N(e, n) {
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
      function I(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? N(Object(t), !0).forEach(function (n) {
                l()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : N(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      var P = function (e) {
          var n = e.centerContent,
            t = void 0 !== n && n,
            r = e.newsletterV3,
            o = (0, f.Fg)(),
            i = (0, V.pK)(),
            l = (0, V.hp)(),
            a = (0, T.v9)(function (e) {
              return e.config.authDomain;
            }),
            s = (0, T.v9)(function (e) {
              return e.navigation.currentLocation;
            }),
            g = (0, T.v9)(function (e) {
              return e.config.productName;
            }),
            w = m.useState(""),
            L = c()(w, 2),
            O = L[0],
            N = L[1],
            P = m.useState(""),
            B = c()(P, 2),
            D = B[0],
            U = B[1],
            M = m.useState(!1),
            W = c()(M, 2),
            j = W[0],
            F = W[1],
            $ = m.useState(!1),
            z = c()($, 2),
            Y = z[0],
            G = z[1],
            K = m.useState(!1),
            q = c()(K, 2),
            H = q[0],
            Q = q[1],
            X = m.useState(!1),
            J = c()(X, 2),
            Z = J[0],
            ee = J[1],
            ne = m.useState(""),
            te = c()(ne, 2),
            re = te[0],
            oe = te[1],
            ie = "register",
            le = null == s.match("http[s]?://[^/]*".concat(a)),
            ae = r.collection,
            ce = r.id,
            ue = r.slug,
            se = (0, R.Zul)(ce),
            me = ae ? (0, R.iBn)(ue, a, ae) : s;
          (0, u.useQuery)(v.qz, {
            fetchPolicy: "no-cache",
            skip: !se || le,
            onCompleted: function (e) {
              var n = e.accountToken;
              return n && oe((0, b.hQ)(me, i, l, se, n));
            },
          });
          var de = function (e) {
              N(e),
                F(!0),
                setTimeout(function () {
                  return F(!1);
                }, h.zn),
                G(!1),
                Q(!1);
            },
            pe = function () {
              (0, C.J)(D) ? (Q(!0), G(!0)) : de("Enter a valid email address.");
            },
            fe = function () {
              de(
                "We couldn't process your request. Try again, or contact our support team."
              );
            },
            ge = (0, u.useMutation)(A, {
              onCompleted: function (e) {
                switch (e.sendNewsletterSubscriptionAcctAuthEmail.__typename) {
                  case "SusiMethod":
                    U(D), ee(!0);
                    break;
                  case "BadRequest":
                    de("Enter a valid email address.");
                    break;
                  case "FailedChallenge":
                  case "NotFound":
                  default:
                    fe();
                }
              },
              onError: fe,
            }),
            we = c()(ge, 1)[0],
            Ee = { newsletterV3Id: ce, email: D, operation: ie, redirect: re },
            xe = (0, _.U)();
          return m.createElement(
            p.f6,
            { theme: (0, k.jN)(ae, o) },
            m.createElement(
              p.xu,
              {
                alignItems: t ? "center" : "flex-start",
                display: "flex",
                flexDirection: "column",
                justifyContent: t ? "center" : "flex-start",
              },
              m.createElement(x.k, {
                callback: function (e) {
                  we({ variables: I({ captchaValue: e }, Ee) });
                },
                shouldExecuteRecaptcha: Y,
              }),
              m.createElement(
                p.xu,
                { display: Z ? "none" : "inline" },
                m.createElement(
                  p.xu,
                  {
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    sm: {
                      alignItems: t ? "center" : "flex-start",
                      flexDirection: "column",
                      height: "130px",
                      paddingTop: "16px",
                    },
                    height: "56px",
                  },
                  m.createElement(
                    p.xu,
                    { marginTop: O && "25px", sm: { marginTop: "0" } },
                    m.createElement(h.II, {
                      errorMessage: O,
                      handleInputChange: function (e) {
                        U(e.target.value.trim());
                      },
                      handleSubmit: pe,
                      input: D,
                      inputType: h.n$.EMAIL,
                      isAnimating: j,
                      textAlign: "start",
                      placeholder: "Your email",
                      width: "".concat(
                        {
                          xl: 375,
                          lg: 375,
                          md: 325,
                          sm: 450,
                          xs: 200,
                          "": 200,
                        }[xe],
                        "px"
                      ),
                    })
                  ),
                  m.createElement(
                    p.xu,
                    {
                      marginBottom: "auto",
                      marginLeft: "15px",
                      sm: { marginLeft: "0px", marginTop: "15px" },
                    },
                    H
                      ? m.createElement(E, { newsletterV3Id: ce })
                      : m.createElement(
                          S.$,
                          { eventData: { operation: ie } },
                          m.createElement(d.w, {
                            newsletterV3Id: ce,
                            onClick: pe,
                          })
                        )
                  )
                ),
                m.createElement(
                  p.xu,
                  {
                    paddingTop: O && "20px",
                    marginTop: "10px",
                    sm: { marginTop: "0" },
                  },
                  m.createElement(
                    y.F,
                    { color: "DARKER", scale: "XS" },
                    "By signing up, you will create a ",
                    g,
                    " account if you don’t already have one. Review our",
                    " ",
                    m.createElement(
                      p.rU,
                      {
                        href: (0, R.wob)(),
                        linkStyle: "OBVIOUS",
                        inline: !0,
                        target: "_blank",
                      },
                      "Privacy Policy"
                    ),
                    " ",
                    "for more information about our privacy practices."
                  )
                )
              ),
              m.createElement(
                p.xu,
                {
                  display: Z ? "inline" : "none",
                  marginBottom: "15px",
                  marginTop: "5px",
                },
                m.createElement(
                  y.F,
                  { color: "DARKER", scale: "M" },
                  m.createElement("b", null, "Check your inbox"),
                  m.createElement("br", null),
                  g,
                  " sent you an email at ",
                  D,
                  " to complete your subscription."
                )
              )
            )
          );
        },
        A = (0, s.Ps)(O()),
        B = (0, s.Ps)(L(), k.Gi, R.nfI);
    },
    51299: (e, n, t) => {
      "use strict";
      t.d(n, { U: () => c });
      var r = t(63038),
        o = t.n(r),
        i = t(67294),
        l = t(28309),
        a = t(72955),
        c = function () {
          var e = (0, l.Fg)(),
            n = i.useState("lg"),
            t = o()(n, 2),
            r = t[0],
            c = t[1],
            u = function () {
              window.innerWidth >= e.breakpoints.xl
                ? c("xl")
                : e.breakpoints.lg <= window.innerWidth &&
                  window.innerWidth < e.breakpoints.xl
                ? c("lg")
                : e.breakpoints.md <= window.innerWidth &&
                  window.innerWidth < e.breakpoints.lg
                ? c("md")
                : e.breakpoints.sm <= window.innerWidth &&
                  window.innerWidth < e.breakpoints.md
                ? c("sm")
                : c("xs");
            };
          return (
            i.useEffect(function () {
              return (
                u(),
                a.V6.on("resize", u),
                function () {
                  return a.V6.off("resize", u);
                }
              );
            }, []),
            r
          );
        };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/4697.b016ecd1.chunk.js.map
