(self.webpackChunklite = self.webpackChunklite || []).push([
  [1429],
  {
    90194: (e, t, n) => {
      "use strict";
      n.d(t, { w: () => c });
      var r = n(67294),
        i = n(85432),
        l = n(27599),
        o = n(27572),
        s = n(28309),
        u = n(16139),
        c = function (e) {
          var t = e.buttonSize,
            n = void 0 === t ? "LARGE" : t,
            c = e.buttonStyle,
            a = void 0 === c ? "STRONG" : c,
            d = e.newsletterV3Id,
            b = e.showMailIcon,
            w = void 0 === b || b,
            m = e.onClick,
            v = e.width,
            E = e.buttonText,
            f = void 0 === E ? "Get this newsletter" : E,
            g = e.redirectUrl,
            S = (0, o.Qi)(),
            p = (0, l.Av)(),
            V = (0, s.Iq)();
          return r.createElement(
            i.zx,
            {
              buttonStyle: a,
              onClick: function () {
                p.event("newsletterV3.subscribeClicked", {
                  newsletterV3Id: d,
                  source: S,
                }),
                  m();
              },
              size: n,
              width: v,
              href: g,
            },
            w &&
              r.createElement(
                "span",
                {
                  className: V(function () {
                    return { marginRight: "8px" };
                  }),
                  "aria-hidden": "true",
                },
                r.createElement(u.Z, null)
              ),
            f
          );
        };
    },
    31429: (e, t, n) => {
      "use strict";
      n.d(t, { x: () => F, B: () => D });
      var r = n(67154),
        i = n.n(r),
        l = n(63038),
        o = n.n(l),
        s = n(28655),
        u = n.n(s),
        c = n(71439),
        a = n(67294),
        d = n(9972),
        b = n(90194),
        w = n(59713),
        m = n.n(w),
        v = n(46829),
        E = n(27599),
        f = n(85277);
      function g(e, t) {
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
      function S(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? g(Object(n), !0).forEach(function (t) {
                m()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : g(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function p() {
        var e = u()([
          "\n  mutation unsubscribeNewsletterV3($newsletterV3Id: ID!) {\n    unsubscribeNewsletterV3(newsletterV3Id: $newsletterV3Id)\n  }\n",
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      function V() {
        var e = u()([
          "\n  mutation subscribeNewsletterV3($newsletterV3Id: ID!, $shouldRecordConsent: Boolean) {\n    subscribeNewsletterV3(\n      newsletterV3Id: $newsletterV3Id\n      shouldRecordConsent: $shouldRecordConsent\n    )\n  }\n",
        ]);
        return (
          (V = function () {
            return e;
          }),
          e
        );
      }
      function h() {
        var e = u()([
          "\n  fragment useNewsletterV3Subscription_newsletterV3 on NewsletterV3 {\n    id\n    viewerEdge {\n      isSubscribed\n    }\n  }\n",
        ]);
        return (
          (h = function () {
            return e;
          }),
          e
        );
      }
      var y = (0, c.Ps)(h()),
        N = (0, c.Ps)(V()),
        C = (0, c.Ps)(p()),
        T = n(34675),
        O = n(81474),
        I = n(62181),
        R = n(85432),
        x = n(25597),
        P = n(64504),
        _ = n(27572),
        k = n(51512),
        L = n(14391),
        A = n(8403),
        B = n(67297),
        U = n(51064),
        G = n(27952),
        j = n(534);
      function M() {
        var e = u()([
          "\n  fragment NewsletterV3SubscribeButton_newsletterV3 on NewsletterV3 {\n    id\n    name\n    slug\n    type\n    user {\n      name\n      username\n    }\n    collection {\n      slug\n      ...CollectionMetabar_collection\n      ...SusiClickable_collection\n      ...collectionDefaultBackgroundTheme_collection\n    }\n    ...SusiClickable_newsletterV3\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (M = function () {
            return e;
          }),
          e
        );
      }
      var $ = "newsletter_v3_promo",
        D = (0, c.Ps)(M(), d.JE, I.Os, I.GB, j.Gi),
        F = function (e) {
          var t,
            n,
            r,
            l = e.newsletterV3,
            s = e.buttonLayout,
            u = void 0 === s ? "MULTI-LINE" : s,
            c = e.helperTextColor,
            d = void 0 === c ? "LIGHTER" : c,
            w = e.showHelperText,
            m = void 0 === w || w,
            g = e.showMailIcon,
            p = void 0 === g || g,
            V = e.buttonSize,
            h = void 0 === V ? "LARGE" : V,
            M = e.buttonStyle,
            D = void 0 === M ? "STRONG" : M,
            F = e.redirectUrl,
            z = (0, T.Hk)().value,
            Y = l.id,
            W = l.slug,
            H = l.collection ? l.collection : void 0,
            Q = l.user ? l.user : void 0,
            q = (0, f.w)(),
            X = (0, A.PM)(),
            Z = (0, B.v9)(function (e) {
              return e.config.productName;
            }),
            J = (0, U.O)(!1),
            K = o()(J, 3),
            ee = K[0],
            te = K[1],
            ne = K[2],
            re = (0, O.T)({
              newsletterSlug: W,
              collectionSlug: null == H ? void 0 : H.slug,
              username: null == Q ? void 0 : Q.username,
            }).viewerEdge;
          switch (l.type) {
            case L.Rr.NEWSLETTER_TYPE_COLLECTION:
              (t = l.name),
                (n = "Get this newsletter"),
                (r = "You’re signed up for ".concat(t, "."));
              break;
            case L.Rr.NEWSLETTER_TYPE_AUTHOR:
              (t = null == Q ? void 0 : Q.name),
                (n = "Subscribe"),
                (r = "You’re subscribed to ".concat(t));
          }
          var ie = (function (e, t, n) {
              var r = a.useState(n),
                i = o()(r, 2),
                l = i[0],
                s = i[1],
                u = a.useState(!1),
                c = o()(u, 2),
                d = c[0],
                b = c[1],
                w = (0, E.Av)(),
                m = (0, f.w)();
              d &&
                w.event("newsletterV3.subscribe.error", { newsletterV3Id: e });
              var g = (0, v.useMutation)(N, {
                  variables: { newsletterV3Id: e, shouldRecordConsent: !1 },
                  onCompleted: function (e) {
                    var t = e.subscribeNewsletterV3;
                    b(!t), t && s(!0);
                  },
                  update: function (t, n) {
                    var r,
                      i = {
                        id: "NewsletterV3:".concat(e),
                        fragment: y,
                        fragmentName:
                          "useNewsletterV3Subscription_newsletterV3",
                      },
                      l = t.readFragment(i);
                    t.writeFragment(
                      S(
                        S({}, i),
                        {},
                        {
                          data: S(
                            S({}, l),
                            {},
                            {
                              viewerEdge: {
                                isSubscribed:
                                  null === (r = n.data) || void 0 === r
                                    ? void 0
                                    : r.subscribeNewsletterV3,
                              },
                            }
                          ),
                        }
                      )
                    );
                  },
                }),
                p = o()(g, 1)[0],
                V = (0, v.useMutation)(C, {
                  variables: { newsletterV3Id: e },
                  onCompleted: function (e) {
                    var n = e.unsubscribeNewsletterV3;
                    b(!n),
                      n &&
                        (s(!1),
                        m({
                          duration: "NEXTPAGE",
                          message: "",
                          toastStyle: "NEWSLETTER_UNSUBSCRIBE",
                          extraParams: { newsletterName: t },
                        }));
                  },
                  update: function (t, n) {
                    var r,
                      i = {
                        id: "NewsletterV3:".concat(e),
                        fragment: y,
                        fragmentName:
                          "useNewsletterV3Subscription_newsletterV3",
                      },
                      l = t.readFragment(i);
                    t.writeFragment(
                      S(
                        S({}, i),
                        {},
                        {
                          data: S(
                            S({}, l),
                            {},
                            {
                              viewerEdge: {
                                isSubscribed: !(
                                  null !== (r = n.data) &&
                                  void 0 !== r &&
                                  r.unsubscribeNewsletterV3
                                ),
                              },
                            }
                          ),
                        }
                      )
                    );
                  },
                }),
                h = o()(V, 1)[0];
              return {
                isSubscribed: l,
                hasError: d,
                setSubscribe: function (t) {
                  var n =
                    arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1];
                  b(!1),
                    t
                      ? p({
                          variables: {
                            newsletterV3Id: e,
                            shouldRecordConsent: n,
                          },
                        })
                      : h();
                },
              };
            })(l.id, t, !(null == re || !re.isSubscribed)),
            le = ie.isSubscribed,
            oe = ie.hasError,
            se = ie.setSubscribe;
          a.useEffect(
            function () {
              if (X) {
                var e = (0, k.P7)(X || "").susiEntry;
                [
                  "collection_newsletter_v3_landing",
                  "newsletter_v3_promo",
                ].includes(void 0 === e ? "" : e) &&
                  le &&
                  q({
                    duration: "NEXTPAGE",
                    message: "",
                    toastStyle: "NEWSLETTER_SUBSCRIBE",
                    extraParams: {
                      newsletterName: null == l ? void 0 : l.name,
                      unsubscribeFn: function () {
                        return se(!1);
                      },
                    },
                  });
              }
            },
            [X]
          );
          var ue = function (e) {
              var t = e.children;
              return a.createElement(
                R.xu,
                {
                  margin: "COMPACT" === u ? "10px 20px 10px 0" : "",
                  xs: { margin: "10px 0 0 0" },
                },
                t
              );
            },
            ce = function (e) {
              var t = e.children;
              return a.createElement(
                R.xu,
                {
                  maxWidth: "COMPACT" === u ? "380px" : "",
                  margin: "COMPACT" === u ? "10px 0 10px 0" : "10px 0 0 0",
                },
                a.createElement(P.F, { scale: "S", color: d }, t)
              );
            },
            ae = function () {
              var e = (0, G.Zul)(Y),
                r = {
                  buttonSize: h,
                  buttonStyle: D,
                  newsletterV3Id: l.id,
                  onClick: function () {
                    z &&
                      (z && z.allowEmailAddressSharingEditorWriter
                        ? se(!0, !1)
                        : te());
                  },
                  showMailIcon: p,
                  buttonText: n,
                  redirectUrl: F,
                };
              return a.createElement(
                ue,
                null,
                z
                  ? a.createElement(
                      a.Fragment,
                      null,
                      a.createElement(b.w, r),
                      a.createElement(
                        R.QH,
                        {
                          onConfirm: function () {
                            return se(!0, !0);
                          },
                          isVisible: ee,
                          hide: ne,
                          titleText: "Confirm your subscription to ".concat(t),
                          confirmText: "Confirm now",
                          buttonStyle: "STRONG",
                          buttonSize: "LARGE",
                          showCancelButton: !1,
                          withCloseButton: !1,
                          isDestructiveAction: !1,
                        },
                        "By confirming, you agree to share your email address with the editors of newsletters and writers you've subscribed to so they can stay in contact with you outside of ".concat(
                          Z,
                          ". You can opt out of sharing your email address by unsubscribing in your Settings."
                        )
                      )
                    )
                  : a.createElement(
                      I.R9,
                      {
                        operation: "register",
                        newsletterV3: l,
                        collection: H,
                        actionUrl: e,
                        susiEntry: $,
                        redirectTo: F,
                      },
                      a.createElement(b.w, i()({}, r, { redirectUrl: void 0 }))
                    )
              );
            };
          return a.createElement(
            a.Fragment,
            null,
            a.createElement(R.Yi, null, function (e) {
              return a.createElement(
                R.f6,
                { theme: (0, j.jN)(H, e) },
                le
                  ? a.createElement(
                      a.Fragment,
                      null,
                      a.createElement(
                        ue,
                        null,
                        a.createElement(
                          R.zx,
                          {
                            buttonStyle: "SUBTLE",
                            size: "SMALL",
                            onClick: function () {
                              return se(!1);
                            },
                          },
                          "Unsubscribe"
                        )
                      ),
                      m && a.createElement(ce, null, r)
                    )
                  : a.createElement(
                      _.cW,
                      { source: { newsletterV3Id: l.id }, extendSource: !0 },
                      a.createElement(ae, null),
                      m &&
                        (z
                          ? a.createElement(
                              ce,
                              null,
                              "Emails will be sent to ",
                              z.email,
                              ".",
                              a.createElement(
                                R.xu,
                                null,
                                a.createElement(
                                  I.R9,
                                  {
                                    operation: "login",
                                    newsletterV3: l,
                                    collection: H,
                                    susiEntry: $,
                                  },
                                  a.createElement(
                                    R.rU,
                                    {
                                      onClick: function () {},
                                      linkStyle: "OBVIOUS",
                                      inline: !0,
                                      target: "_blank",
                                    },
                                    "Not you?"
                                  )
                                )
                              )
                            )
                          : a.createElement(
                              ce,
                              null,
                              "You'll need to sign in or create an account to receive this newsletter."
                            ))
                    )
              );
            }),
            oe &&
              a.createElement(x.F, {
                toastStyle: "RETRYABLE_ERROR",
                isVisible: oe,
                hide: function () {},
              })
          );
        };
    },
    81474: (e, t, n) => {
      "use strict";
      n.d(t, { T: () => u });
      var r = n(28655),
        i = n.n(r),
        l = n(46829),
        o = n(71439);
      function s() {
        var e = i()([
          "\n  query NewsletterV3ViewerEdge($newsletterSlug: ID!, $collectionSlug: ID, $username: ID) {\n    newsletterV3(\n      newsletterSlug: $newsletterSlug\n      collectionSlug: $collectionSlug\n      username: $username\n    ) {\n      ... on NewsletterV3 {\n        id\n        viewerEdge {\n          id\n          isSubscribed\n        }\n      }\n    }\n  }\n",
        ]);
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      var u = function (e) {
          var t,
            n = e.newsletterSlug,
            r = void 0 === n ? "" : n,
            i = e.collectionSlug,
            o = e.username,
            s = (0, l.useQuery)(c, {
              variables: { newsletterSlug: r, collectionSlug: i, username: o },
              ssr: !1,
              skip: !r,
            }),
            u = s.loading,
            a = s.error,
            d = s.data;
          return u
            ? { loading: u }
            : a
            ? { error: a }
            : {
                viewerEdge:
                  null == d || null === (t = d.newsletterV3) || void 0 === t
                    ? void 0
                    : t.viewerEdge,
              };
        },
        c = (0, o.Ps)(s());
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/1429.c3aa1c70.chunk.js.map
