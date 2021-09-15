(self.webpackChunklite = self.webpackChunklite || []).push([
  [2332],
  {
    69100: (e, t, n) => {
      var r = n(99489),
        o = n(57067);
      function a(t, n, i) {
        return (
          o()
            ? (e.exports = a = Reflect.construct)
            : (e.exports = a =
                function (e, t, n) {
                  var o = [null];
                  o.push.apply(o, t);
                  var a = new (Function.bind.apply(e, o))();
                  return n && r(a, n.prototype), a;
                }),
          a.apply(null, arguments)
        );
      }
      e.exports = a;
    },
    70430: (e) => {
      e.exports = function (e) {
        return -1 !== Function.toString.call(e).indexOf("[native code]");
      };
    },
    57067: (e) => {
      e.exports = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
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
      };
    },
    65957: (e, t, n) => {
      var r = n(29754),
        o = n(99489),
        a = n(70430),
        i = n(69100);
      function u(t) {
        var n = "function" == typeof Map ? new Map() : void 0;
        return (
          (e.exports = u =
            function (e) {
              if (null === e || !a(e)) return e;
              if ("function" != typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== n) {
                if (n.has(e)) return n.get(e);
                n.set(e, t);
              }
              function t() {
                return i(e, arguments, r(this).constructor);
              }
              return (
                (t.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                o(t, e)
              );
            }),
          u(t)
        );
      }
      e.exports = u;
    },
    6672: (e, t, n) => {
      "use strict";
      n.d(t, { Ij: () => D, iT: () => C, rK: () => w });
      var r = n(28655),
        o = n.n(r),
        a = n(71439),
        i = n(67294),
        u = n(49768),
        c = n(34575),
        l = n.n(c),
        s = n(2205),
        p = n.n(s),
        d = n(78585),
        f = n.n(d),
        m = n(29754),
        v = n.n(m),
        h = n(65957);
      var y = (function (e) {
          p()(o, e);
          var t,
            n,
            r =
              ((t = o),
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
                  r = v()(t);
                if (n) {
                  var o = v()(this).constructor;
                  e = Reflect.construct(r, arguments, o);
                } else e = r.apply(this, arguments);
                return f()(this, e);
              });
          function o() {
            return (
              l()(this, o),
              r.call(
                this,
                "Expected postResult to exist.\n       For more detail, try checking for GraphQL server errors with the same x-request-id."
              )
            );
          }
          return o;
        })(n.n(h)()(Error)),
        g = n(41254),
        E = n(52383),
        b = n(80177),
        x = n(47266);
      function P() {
        var e = o()([
          "\n  fragment UnavailableForLegalReasonsScreen_unavailableForLegalReasons on UnavailableForLegalReasons {\n    lumenId\n  }\n",
        ]);
        return (
          (P = function () {
            return e;
          }),
          e
        );
      }
      function I(e) {
        var t = e.errorData;
        return i.createElement(
          g.q,
          {
            code: 451,
            title: "451 Not available — Medium",
            lumenId: t.lumenId,
          },
          "This story is subject to a DMCA copyright or other legal or government claim."
        );
      }
      var _ = (0, a.Ps)(P());
      function R() {
        var e = o()([
          "\n  fragment WithheldInCountryScreen_withheldInCountry on WithheldInCountry {\n    lumenId\n  }\n",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      function O(e) {
        var t = e.errorData;
        return i.createElement(
          g.q,
          {
            code: 451,
            title: "451 Not available in your country — Medium",
            lumenId: t.lumenId,
          },
          "This page is not available in your country."
        );
      }
      var k = (0, a.Ps)(R()),
        S = n(19732);
      function M() {
        var e = o()([
          "\n  fragment PostResultError_postResult on PostResult {\n    __typename\n    ... on Post {\n      id\n    }\n    ... on UnavailableForLegalReasons {\n      ...UnavailableForLegalReasonsScreen_unavailableForLegalReasons\n    }\n    ... on WithheldInCountry {\n      ...WithheldInCountryScreen_withheldInCountry\n    }\n  }\n  ",
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
      var w = function (e) {
          return !(0, S.f)(e);
        },
        D = function (e) {
          var t = e.postResult;
          if (!t) return i.createElement(E.C, { error: new y() });
          switch (t.__typename) {
            case "Unauthorized":
              return i.createElement(u.N, { opt_isDraft: !0 });
            case "NotFound":
              return i.createElement(b.$, null);
            case "AccountDeleted":
              return i.createElement(
                g.q,
                { code: 410, title: "410 Deleted by author — Medium" },
                "User deactivated or deleted their account."
              );
            case "AccountSuspended":
              return i.createElement(x.y, { suspension: "account" });
            case "PostSuspended":
              return i.createElement(x.y, { suspension: "post" });
            case "Blocked":
              return i.createElement(
                g.q,
                { code: 403, title: "403 Blocked — Medium" },
                "This user had blocked you from following them or viewing their stories."
              );
            case "RemovedByUser":
              return i.createElement(
                g.q,
                { code: 410, title: "410 Deleted by author — Medium" },
                "The author deleted this Medium story."
              );
            case "UnavailableForLegalReasons":
              return i.createElement(I, { errorData: t });
            case "WithheldInCountry":
              return i.createElement(O, { errorData: t });
            default:
              return i.createElement(E.C, {
                error: new Error(
                  "Unsupported postResult: ".concat(t.__typename)
                ),
              });
          }
        },
        C = (0, a.Ps)(M(), _, k);
    },
    1250: (e, t, n) => {
      "use strict";
      n.d(t, { k: () => f });
      var r = n(28655),
        o = n.n(r),
        a = n(71439),
        i = n(46829),
        u = n(67294),
        c = n(42963),
        l = n(85740),
        s = n(8403);
      function p() {
        var e = o()([
          "\n  query InlineExpandingPostCanonicalizer($postId: ID!) {\n    post(id: $postId) {\n      mediumUrl\n    }\n  }\n",
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      var d = (0, a.Ps)(p()),
        f = function (e) {
          var t,
            n = e.children,
            r = (0, s.Wd)("p"),
            o = Boolean((0, l.P5)("enable_inline_expansion")),
            a = (0, i.useQuery)(d, {
              variables: { postId: r || "" },
              skip: !r || !o,
            }).data;
          return null != a &&
            null !== (t = a.post) &&
            void 0 !== t &&
            t.mediumUrl
            ? u.createElement(c.l, { to: a.post.mediumUrl, replace: !0 })
            : n;
        };
    },
    49768: (e, t, n) => {
      "use strict";
      n.d(t, { N: () => s });
      var r = n(67294),
        o = n(42963),
        a = n(14414),
        i = n(27572),
        u = n(67297),
        c = n(96879),
        l = n(27952),
        s = function (e) {
          var t = e.opt_isDraft,
            n = e.opt_params,
            s = e.operation,
            p = (0, u.v9)(function (e) {
              return e.config.authDomain;
            }),
            d = (0, u.v9)(function (e) {
              return e.navigation.currentLocation;
            }),
            f = (0, i.pK)(),
            m = (0, i.hp)(),
            v = (0, c.Rk)((0, l.Kkz)(p), {
              operation: s || "login",
              redirect: (0, a.hQ)(d, f, m, null, null, n),
              isDraft: t ? "1" : "0",
            });
          return r.createElement(o.l, { to: v, temporary: !0 });
        };
    },
    37620: (e, t, n) => {
      "use strict";
      n.r(t), n.d(t, { PostHandler: () => W });
      var r = n(28655),
        o = n.n(r),
        a = n(46829),
        i = n(71439),
        u = n(67294),
        c = n(6672),
        l = n(1250),
        s = n(59713),
        p = n.n(s),
        d = n(8575),
        f = n(42963),
        m = n(8403),
        v = n(67297),
        h = n(96879);
      function y(e, t) {
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
      function g(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? y(Object(n), !0).forEach(function (t) {
                p()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : y(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function E() {
        var e = o()([
          "\n  fragment PostCanonicalizer_post on Post {\n    mediumUrl\n  }\n",
        ]);
        return (
          (E = function () {
            return e;
          }),
          e
        );
      }
      var b = (0, i.Ps)(E()),
        x = function (e) {
          var t = e.post,
            n = e.matchedPath,
            r = e.children,
            o = (0, v.v9)(function (e) {
              return e.navigation.currentHash;
            }),
            a = (0, m.Wd)("showDomainSetup"),
            i = (0, m.Wd)("postPublishedType"),
            c = (0, m.PM)(),
            l = (0, m.G1)(),
            s = (0, v.v9)(function (e) {
              return e.navigation.host;
            }),
            p = t.mediumUrl;
          if (!p) return r;
          var y = d.parse(decodeURIComponent(p)),
            E = g(
              g(
                g(g({}, c ? { source: c } : {}), l ? { sk: l } : {}),
                i ? { postPublishedType: i } : {}
              ),
              a ? { showDomainSetup: a } : {}
            );
          return s !== y.host
            ? u.createElement(f.l, { to: (0, h.Rk)(p, E, o), replace: !0 })
            : y.path && n !== y.path
            ? u.createElement(f.l, { to: (0, h.Rk)(y.path, E, o), replace: !0 })
            : r;
        },
        P = n(25537),
        I = n(32149),
        _ = n(85740),
        R = n(95760),
        O = n(31235),
        k = n(53976),
        S = n(27599),
        M = n(27572),
        w = n(96890),
        D = n(2874),
        C = n(52383),
        T = n(90320),
        U = n(80177),
        j = n(95200),
        L = n(27952);
      function $() {
        var e = o()([
          "\n  query PostMeter($postId: ID!, $postMeteringOptions: PostMeteringOptions) {\n    meterPost(postId: $postId, postMeteringOptions: $postMeteringOptions) {\n      __typename\n      ... on MeteringInfo {\n        ...PostScreen_meteringInfo\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          ($ = function () {
            return e;
          }),
          e
        );
      }
      function N() {
        var e = o()([
          "\n  query PostHandler(\n    $postId: ID!\n    $postMeteringOptions: PostMeteringOptions\n    $includePostInternalLinks: Boolean!\n    $includePostRecirc: Boolean = false\n    $postRecircPaging: PaginationLimit\n  ) {\n    postResult(id: $postId) {\n      __typename\n      ...PostResultError_postResult\n      ... on Post {\n        ...PostScreen_post\n        ...PostCanonicalizer_post\n        creator {\n          ...useShouldShowEntityDrivenSubscription_creator\n        }\n      }\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (N = function () {
            return e;
          }),
          e
        );
      }
      var q = (0, i.Ps)(N(), c.iT, b, j.m6, I.G),
        A = (0, i.Ps)($(), j.De),
        W = function (e) {
          var t = e.match,
            n = (0, P.o)(),
            r = (0, v.v9)(function (e) {
              var t,
                r,
                o = e.config.recircOptions;
              return n
                ? null == o || null === (t = o.v2) || void 0 === t
                  ? void 0
                  : t.limit
                : null == o || null === (r = o.v1) || void 0 === r
                ? void 0
                : r.limit;
            }),
            o = (0, v.v9)(function (e) {
              return e.navigation.referrer;
            }),
            i = (0, m.G1)(),
            s = (0, m.PM)(),
            p = (0, S.Av)(),
            d = (0, O.xg)();
          !(function () {
            var e = (0, _.Vb)(),
              t = (0, O.xg)(),
              n = (0, O.Wj)(),
              r = (0, R.Av)(),
              o = JSON.stringify(e);
            u.useEffect(
              function () {
                var o, a;
                e &&
                  Object.keys(e).length &&
                  t &&
                  ((o = e),
                  (a = new TextEncoder().encode(JSON.stringify(o))),
                  crypto.subtle.digest("SHA-256", a).then(function (e) {
                    return Array.prototype.map
                      .call(new Uint8Array(e), function (e) {
                        return ("00" + e.toString(16)).slice(-2);
                      })
                      .join("");
                  })).then(function (e) {
                    e !== n && r.event("client.edgeCacheVariantMismatch", {});
                  });
              },
              [o]
            );
          })();
          var f = (0, L.mrd)(t) || "",
            h = { referrer: o, sk: i, source: s },
            y = (0, a.useQuery)(A, {
              variables: { postId: f, postMeteringOptions: h },
              ssr: !d,
            }).data,
            g = (y = void 0 === y ? {} : y).meterPost,
            E = (0, a.useQuery)(q, {
              variables: {
                postId: f,
                includePostInternalLinks: n,
                postRecircPaging: r || 3,
                postMeteringOptions: d ? void 0 : h,
              },
              skip: !f,
            }),
            b = E.loading,
            $ = E.error,
            N = E.data,
            W = (N = void 0 === N ? {} : N).postResult,
            z = E.refetch,
            F = E.fetchMore,
            B = (0, I.$)(
              "entity_driven_subscription_milestone_2",
              "Post" === (null == W ? void 0 : W.__typename) ? W.creator : null
            ),
            Q =
              (0, k.V)({
                name: "eds_public_story_to_membership_landing_page",
                placeholder: !1,
              }) && B;
          u.useEffect(
            function () {
              B && p.event("experiment.eligible", { experimentId: D.EA });
            },
            [B]
          );
          var H = u.useMemo(
              function () {
                return { name: "post_page", postId: f };
              },
              [f]
            ),
            K = u.useMemo(
              function () {
                return f
                  ? (0, c.rK)(W)
                    ? null
                    : Q && W.creator && !s && !W.isLocked
                    ? u.createElement(D.d0, {
                        user: W.creator,
                        redirectExperiment: !0,
                        postId: f,
                      })
                    : u.createElement(
                        l.k,
                        null,
                        u.createElement(
                          x,
                          { post: W, matchedPath: t.url, key: f },
                          u.createElement(
                            M.cW,
                            { source: H },
                            u.createElement(j.gc, { meteringInfo: g, post: W })
                          )
                        )
                      )
                  : null;
              },
              [H, t.url, f, JSON.stringify(W), JSON.stringify(g)]
            );
          return f
            ? b
              ? u.createElement(T.a, null)
              : $
              ? u.createElement(C.C, { error: $ })
              : (0, c.rK)(W)
              ? u.createElement(c.Ij, { postResult: W })
              : u.createElement(
                  w.x.Provider,
                  { value: { refetch: z, fetchMore: F, postId: f } },
                  K
                )
            : u.createElement(U.$, null);
        };
    },
    41254: (e, t, n) => {
      "use strict";
      n.d(t, { q: () => E });
      var r = n(67294),
        o = n(70405),
        a = n(5977),
        i = n(59713),
        u = n.n(i),
        c = n(85432),
        l = n(67995),
        s = n(28309),
        p = n(80637),
        d = { fontSize: "20px", textTransform: "uppercase" },
        f = function (e) {
          return u()(
            { display: "block", fontSize: "192px", lineHeight: "200px" },
            p.sm(e),
            { fontSize: "150px" }
          );
        },
        m = function (e) {
          var t = e.errorCode,
            n = (0, s.Iq)(),
            o = (0, l.n)({ name: "marketing", scale: "XXXL" });
          return r.createElement(
            c.xu,
            { display: "flex", flexDirection: "column" },
            r.createElement("div", { className: n(d) }, "Error"),
            r.createElement("div", { className: n([o, f]) }, t)
          );
        },
        v = n(26463),
        h = n(44786),
        y = n(5955),
        g = { fontSize: "24px" };
      function E(e) {
        var t = e.code,
          n = e.title,
          i = e.children,
          u = e.lumenId,
          l = (0, s.Iq)();
        return (
          (0, h.N)(new Error("[".concat(t, "]: ").concat(n)), { status: t }),
          r.createElement(a.AW, {
            render: function (e) {
              var a = e.staticContext;
              return (
                a && (a.statusCode = t),
                r.createElement(
                  "div",
                  null,
                  r.createElement(o.q, null, r.createElement("title", null, n)),
                  r.createElement(v.kw, null),
                  r.createElement(
                    c.xu,
                    {
                      tag: "section",
                      paddingTop: "60px",
                      paddingBottom: "60px",
                    },
                    r.createElement(
                      c.Pm,
                      { size: "inset" },
                      r.createElement(
                        c.xu,
                        {
                          display: "flex",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                        },
                        r.createElement(m, { errorCode: t }),
                        r.createElement(
                          "div",
                          { className: l((0, y.rJ)()) },
                          r.createElement(
                            c.xu,
                            { marginBottom: "28px" },
                            r.createElement("div", { className: l(g) }, i)
                          ),
                          u
                            ? r.createElement(
                                "div",
                                { className: l(g) },
                                "A report is available on",
                                " ",
                                r.createElement(
                                  c.rU,
                                  {
                                    href: "https://lumendatabase.org/notices/".concat(
                                      u
                                    ),
                                    display: "inline-block",
                                    inline: !0,
                                    target: "_blank",
                                    linkStyle: "OBVIOUS",
                                  },
                                  "Lumen"
                                ),
                                "."
                              )
                            : null
                        )
                      )
                    )
                  )
                )
              );
            },
          })
        );
      }
    },
    47266: (e, t, n) => {
      "use strict";
      n.d(t, { y: () => l });
      var r = n(67294),
        o = n(85432),
        a = n(64504),
        i = n(27599),
        u = n(41254),
        c = n(27952),
        l = function (e) {
          var t = e.suspension,
            n = (0, i.Av)();
          return r.createElement(
            u.q,
            { code: 410, title: "410 ".concat(t, " suspended — Medium") },
            r.createElement(
              o.xu,
              { display: "flex", marginTop: "-30px" },
              r.createElement(
                a.QE,
                { scale: "S" },
                "This ",
                t,
                " is under investigation or was found in violation of the Medium Rules.",
                " "
              )
            ),
            r.createElement(
              o.xu,
              { display: "flex", marginTop: "80px" },
              r.createElement(
                a.QE,
                { color: "DARKER", scale: "M" },
                "There are thousands of stories to read on Medium. Visit our homepage ",
                r.createElement("br", null),
                " to find one that’s right for you."
              )
            ),
            r.createElement(
              o.xu,
              { display: "flex", marginTop: "15px" },
              r.createElement(
                o.zx,
                {
                  buttonStyle: "SUBTLE",
                  href: (0, c.$x3)(),
                  onClick: function () {
                    n.event("suspendedPage.backToHomeClicked", {});
                  },
                },
                "Take me to Medium"
              )
            )
          );
        };
    },
    14259: (e) => {
      e.exports = function (e, t, n) {
        var r = -1,
          o = e.length;
        t < 0 && (t = -t > o ? 0 : o + t),
          (n = n > o ? o : n) < 0 && (n += o),
          (o = t > n ? 0 : (n - t) >>> 0),
          (t >>>= 0);
        for (var a = Array(o); ++r < o; ) a[r] = e[r + t];
        return a;
      };
    },
    38125: (e, t, n) => {
      var r = n(14259);
      e.exports = function (e) {
        return null != e && e.length ? r(e, 0, -1) : [];
      };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/Post.8f0dfdc1.chunk.js.map
