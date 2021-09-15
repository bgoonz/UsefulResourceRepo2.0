(self.webpackChunklite = self.webpackChunklite || []).push([
  [3170, 3874],
  {
    68387: (e, t, n) => {
      "use strict";
      n.d(t, { Qw: () => P, Qj: () => I, w7: () => O });
      var r = n(28655),
        i = n.n(r),
        o = n(67154),
        a = n.n(o),
        l = n(59713),
        c = n.n(l),
        s = n(71439),
        u = n(67294),
        m = n(32149),
        d = n(34675),
        p = n(62181),
        g = n(22091),
        f = n(64504),
        v = n(27599),
        h = n(28309),
        E = n(85277),
        y = n(67297),
        b = n(82482),
        x = n(96879),
        S = n(27952);
      function w() {
        var e = i()([
          "\n  fragment EntityDrivenSubscriptionCallToAction_creator on User {\n    __typename\n    id\n    name\n    ...useShouldShowEntityDrivenSubscription_creator\n  }\n  ",
          "\n",
        ]);
        return (
          (w = function () {
            return e;
          }),
          e
        );
      }
      var P = "entity_driven_subscription",
        I = function (e) {
          var t,
            n,
            r,
            i,
            o = e.creator,
            l = e.position,
            s = void 0 === l ? "bottom" : l,
            w = (0, E.w)(),
            P = (0, v.Av)(),
            I = (0, h.Iq)(),
            O = (0, y.v9)(function (e) {
              return e.config.authDomain;
            }),
            _ = (0, y.v9)(function (e) {
              return e.config.productName;
            }),
            A = (0, d.Hk)().value,
            k = null == o ? void 0 : o.viewerEdge.isAllowEdsEnabled,
            D =
              null !== (t = null == A ? void 0 : A.mediumMemberAt) &&
              void 0 !== t &&
              t,
            T =
              null !== (n = null == o ? void 0 : o.viewerIsUser) &&
              void 0 !== n &&
              n,
            C = (0, m.$)("entity_driven_subscription_milestone_1", o),
            R = T && k && D,
            L =
              null !== (r = null == o ? void 0 : o.name) && void 0 !== r
                ? r
                : "",
            U =
              null !== (i = null == o ? void 0 : o.id) && void 0 !== i ? i : "",
            M = u.useCallback(
              function () {
                P.event("entityDrivenSubCallToAction.clicked", {
                  userId: null == A ? void 0 : A.id,
                  entityId: null == o ? void 0 : o.id,
                }),
                  R &&
                    w({
                      message: "You're already a ".concat(_, " member."),
                      toastStyle: "MESSAGE",
                    });
              },
              [o, A, O]
            );
          u.useEffect(
            function () {
              k &&
                P.event("experiment.eligible", {
                  experimentId: "65da28af5652",
                });
            },
            [k]
          );
          var B = (0, x.Rk)((0, S.c5p)(O), { subscribeToUserId: U });
          return C
            ? u.createElement(
                "div",
                {
                  className: I(function (e) {
                    var t;
                    return (
                      (t = {
                        borderTop: "4px solid ".concat(
                          e.accentColor.border.normal
                        ),
                        backgroundColor: e.baseColor.background.light,
                      }),
                      c()(t, b.xl(e), {
                        padding: "38px",
                        marginTop: "40px",
                        marginBottom: "top" === s ? "13px" : "40px",
                      }),
                      c()(t, b.lg(e), {
                        padding: "38px",
                        marginTop: "40px",
                        marginBottom: "top" === s ? "13px" : "40px",
                      }),
                      c()(t, b.md(e), {
                        padding: "38px",
                        marginTop: "32px",
                        marginBottom: "top" === s ? "5px" : "40px",
                      }),
                      c()(t, b.sm(e), {
                        padding: "24px 24px 28px 24px",
                        marginTop: "32px",
                        marginBottom: "top" === s ? "5px" : "40px",
                      }),
                      c()(t, b.xs(e), {
                        padding: "24px 24px 28px 24px",
                        marginTop: "32px",
                        marginBottom: "top" === s ? "5px" : "40px",
                      }),
                      t
                    );
                  }),
                },
                u.createElement(
                  g.xu,
                  null,
                  u.createElement(
                    f.X6,
                    { scale: { xs: "S", sm: "S", md: "M", lg: "M", xl: "M" } },
                    "Read everything from ",
                    L,
                    " — and more."
                  )
                ),
                u.createElement(
                  g.xu,
                  { paddingTop: "10px", paddingBottom: "30px" },
                  u.createElement(
                    f.F,
                    {
                      scale: { xs: "M", sm: "M", md: "L", lg: "L", xl: "L" },
                      color: "DARKER",
                    },
                    "Upgrade to Medium membership to directly support independent writers and get unlimited access to everything on Medium."
                  )
                ),
                u.createElement(
                  g.xu,
                  { display: "flex", flexDirection: "row" },
                  u.createElement(
                    g.zx,
                    a()(
                      { onClick: M, buttonStyle: "STRONG" },
                      D ? void 0 : { href: B }
                    ),
                    "Become a member"
                  ),
                  !A &&
                    u.createElement(
                      u.Fragment,
                      null,
                      u.createElement(
                        f.F,
                        {
                          scale: {
                            xs: "S",
                            sm: "S",
                            md: "M",
                            lg: "M",
                            xl: "M",
                          },
                          color: "DARKER",
                        },
                        u.createElement(
                          g.xu,
                          {
                            marginLeft: "12px",
                            display: "flex",
                            flexDirection: "column",
                          },
                          "Already a member?",
                          u.createElement(
                            p.R9,
                            {
                              operation: "login",
                              linkStyle: "OBVIOUS",
                              inline: !0,
                              susiEntry: "entity_driven_subscription_cta",
                            },
                            "Sign In"
                          )
                        )
                      )
                    )
                )
              )
            : null;
        },
        O = (0, s.Ps)(w(), m.G);
    },
    32149: (e, t, n) => {
      "use strict";
      n.d(t, { $: () => s, G: () => u });
      var r = n(28655),
        i = n.n(r),
        o = n(71439),
        a = n(53976),
        l = n(34675);
      function c() {
        var e = i()([
          "\n  fragment useShouldShowEntityDrivenSubscription_creator on User {\n    viewerIsUser\n    viewerEdge {\n      isAllowEdsEnabled\n    }\n  }\n",
        ]);
        return (
          (c = function () {
            return e;
          }),
          e
        );
      }
      var s = function (e, t) {
          var n,
            r,
            i = (0, l.Hk)().value,
            o = (0, a.V)({ name: e, placeholder: !1 }),
            c =
              null !== (n = null == i ? void 0 : i.mediumMemberAt) &&
              void 0 !== n &&
              n,
            s = null == t ? void 0 : t.viewerEdge.isAllowEdsEnabled,
            u =
              null !== (r = null == t ? void 0 : t.viewerIsUser) &&
              void 0 !== r &&
              r;
          return (
            !!t && ((s && !(null != i && i.id)) || (s && u) || (!!o && s && !c))
          );
        },
        u = (0, o.Ps)(c());
    },
    85714: (e, t, n) => {
      "use strict";
      n.d(t, { Lv: () => m, v: () => d, QX: () => p });
      var r = n(28655),
        i = n.n(r),
        o = n(71439),
        a = n(67294),
        l = n(12291),
        c = n(85277);
      function s() {
        var e = i()([
          "\n  fragment SuspendedBannerLoader_post on Post {\n    id\n    isSuspended\n  }\n",
        ]);
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      function u() {
        var e = i()([
          "\n  fragment SuspendedBannerLoader_user on User {\n    id\n    isSuspended\n  }\n",
        ]);
        return (
          (u = function () {
            return e;
          }),
          e
        );
      }
      var m = (0, l.$j)()(function (e) {
          var t = e.dispatch,
            n = e.user,
            r = e.post;
          return (
            a.useEffect(function () {
              n && n.isSuspended
                ? t(
                    (0, c.Dx)({
                      duration: "NEXTPAGE",
                      message: "",
                      toastStyle: "USER_SUSPENDED",
                    })
                  )
                : r &&
                  r.isSuspended &&
                  t(
                    (0, c.Dx)({
                      duration: "NEXTPAGE",
                      message: "",
                      toastStyle: "POST_SUSPENDED",
                      extraParams: {
                        postId: (null == r ? void 0 : r.id) || "",
                      },
                    })
                  );
            }, []),
            null
          );
        }),
        d = (0, o.Ps)(u()),
        p = (0, o.Ps)(s());
    },
    93874: (e, t, n) => {
      "use strict";
      n.d(t, { h: () => ie, k: () => oe });
      var r,
        i = n(28655),
        o = n.n(i),
        a = n(63038),
        l = n.n(a),
        c = n(71439),
        s = n(67294),
        u = n(42963),
        m = n(46829),
        d = n(58875),
        p = n.n(d),
        g = n(34675),
        f = n(85432),
        v = n(64504),
        h = n(27599),
        E = n(28309),
        y = n(79208),
        b = n(90038),
        x = function (e) {
          return {
            backgroundColor: e.baseColor.background.light,
            borderColor: e.baseColor.border.light,
            borderRadius: "3px",
            borderWidth: "1px",
            alignItems: "center",
            padding: "25px 20px 25px 20px",
            marginTop: "",
            borderStyle: "solid",
          };
        },
        S = function () {
          var e = (0, E.Iq)();
          return s.createElement(
            "div",
            { className: e([I, x]) },
            s.createElement(
              f.xu,
              { textAlign: "center" },
              s.createElement(f.xu, null, "1000 x 1000"),
              s.createElement(f.xu, null, "pixels")
            )
          );
        },
        w = function () {
          return s.createElement(
            f.xu,
            { marginRight: "5px", display: "inline-block" },
            s.createElement(
              v.F,
              { scale: "S", color: "ERROR" },
              "That file doesn't meet our requirements. Try another."
            )
          );
        },
        P = function () {
          return s.createElement(
            f.xu,
            { marginTop: "8px" },
            s.createElement(
              f.xu,
              { marginRight: "5px", display: "inline-block" },
              s.createElement(
                v.F,
                { scale: "S", color: "ERROR" },
                "We couldn't process your request."
              )
            ),
            s.createElement(
              f.xu,
              { marginRight: "5px", display: "inline-block" },
              s.createElement(
                v.F,
                { scale: "S" },
                "Try again, or",
                " ",
                s.createElement(
                  f.rU,
                  {
                    inline: !0,
                    linkStyle: "OBVIOUS",
                    href: "https://help.medium.com/hc/en-us",
                  },
                  "search our help center for support."
                )
              )
            )
          );
        };
      !(function (e) {
        (e.Success = "success"),
          (e.UploadError = "uploadError"),
          (e.InvalidError = "invalidError");
      })(r || (r = {}));
      var I = {
          height: "132px",
          width: "132px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        },
        O = function (e) {
          var t = e.setImageId,
            n = e.initialImageId,
            i = e.source,
            o = (0, E.Iq)(),
            a = (0, h.Av)(),
            c = (0, g.Hk)().value,
            u = s.useState({ imageId: n, imageWidth: 0, imageHeight: 0 }),
            m = l()(u, 2),
            d = m[0],
            p = m[1],
            v = s.useState(null),
            x = l()(v, 2),
            O = x[0],
            _ = x[1],
            A = function (e) {
              _(e),
                a.event("user.updateAvatarResult", {
                  userId: null == c ? void 0 : c.id,
                  source: i,
                  uploadResult: e,
                });
            },
            k = (0, y.JA)(
              function (e, n, i) {
                var o = n.height,
                  a = n.width,
                  l = e.value.fileId;
                p({ imageId: l, imageHeight: o, imageWidth: a }),
                  o < parseInt("1000px", 10) || a < parseInt("1000px", 10)
                    ? (A(r.InvalidError), R())
                    : (t(l), A(r.Success), i());
              },
              function () {
                A(r.UploadError);
              },
              function () {
                A(r.InvalidError);
              }
            ),
            D = k.inputRef,
            T = k.fireClick,
            C = function () {
              a.event("user.updateAvatarClick", {
                userId: null == c ? void 0 : c.id,
                source: i,
                hasImage: !!d.imageId,
              }),
                T();
            },
            R = function () {
              p({ imageId: "", imageWidth: 0, imageHeight: 0 }), t("");
            },
            L = s.useCallback(
              function () {
                return s.createElement(
                  f.xu,
                  { marginBottom: "10px" },
                  s.createElement("input", {
                    type: "file",
                    "aria-hidden": "true",
                    ref: D,
                    className: o({ display: "none" }),
                  }),
                  s.createElement(
                    f.rU,
                    { inline: !0, linkStyle: "OBVIOUS", onClick: C },
                    "Add photo"
                  )
                );
              },
              [o, C, D]
            ),
            U = s.useCallback(
              function () {
                return s.createElement(
                  "div",
                  { className: o([I]) },
                  s.createElement("div", {
                    className: o(function () {
                      return {
                        backgroundImage: "url(".concat(
                          (0, b.W6)({
                            miroId: d.imageId || "",
                            width: d.imageWidth || 0,
                            height: d.imageHeight || 0,
                          }),
                          ")"
                        ),
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        height: "100%",
                        width: "100%",
                        borderRadius: "3px",
                        display: "flex",
                        flexDirection: "row",
                      };
                    }),
                  })
                );
              },
              [o, d]
            ),
            M = s.useCallback(
              function () {
                return s.createElement(
                  f.xu,
                  { display: "inline-block", marginBottom: "15px" },
                  d.imageId
                    ? s.createElement(U, null)
                    : s.createElement(S, null)
                );
              },
              [d]
            );
          return s.createElement(
            f.xu,
            { display: "flex", flexDirection: "column", maxWidth: "132px" },
            s.createElement(
              f.xu,
              { display: "inline-block", float: "right" },
              s.createElement(M, null)
            ),
            s.createElement(L, null),
            O === r.UploadError && s.createElement(P, null),
            O === r.InvalidError && s.createElement(w, null)
          );
        },
        _ = function (e) {
          var t = e.label,
            n = e.onChangeFn,
            r = e.onBlurFn,
            i = e.value,
            o = e.errorMessage,
            a = e.characterCountLimit;
          return s.createElement(
            s.Fragment,
            null,
            s.createElement(
              f.xu,
              { marginBottom: "15px", textAlign: "left" },
              s.createElement(v.F, { scale: "L", tag: "h4" }, t)
            ),
            s.createElement(f.nv, {
              scale: "L",
              onChange: n,
              value: i,
              errorMessage: o,
              onBlur: r,
              ariaLabel: t,
              characterCountLimit: a,
            })
          );
        },
        A = n(22091),
        k = n(29035);
      function D() {
        var e = o()([
          "\n  mutation userCompleteProfileMutation(\n    $userId: ID!\n    $name: String!\n    $bio: String!\n    $imageId: String!\n  ) {\n    userCompleteProfile(userId: $userId, name: $name, bio: $bio, imageId: $imageId)\n  }\n",
        ]);
        return (
          (D = function () {
            return e;
          }),
          e
        );
      }
      function T() {
        var e = o()([
          "\n  fragment UserCompleteProfileDialog_user on User {\n    id\n    name\n    bio\n    imageId\n    hasCompletedProfile\n  }\n",
        ]);
        return (
          (T = function () {
            return e;
          }),
          e
        );
      }
      var C = {
          min: 3,
          max: 50,
          message:
            "Please try another name that’s between 3 and 50 characters.",
        },
        R = {
          min: 10,
          max: 160,
          message:
            "Please try another description that’s between 10 and 160 characters.",
        },
        L = function (e, t) {
          var n = e.min,
            r = e.max,
            i = e.message;
          return function (e) {
            var o = e.target.value;
            t(o.length < n || o.length > r ? i : void 0);
          };
        },
        U = function (e) {
          var t = (0, g.Hk)().value;
          return {
            shouldShowDialog:
              p().canUseDOM &&
              !(0, k.ic)(navigator.userAgent) &&
              (null == t ? void 0 : t.id) === e.id,
          };
        },
        M = function (e) {
          var t = e.setHasCompletedProfile,
            n = e.user,
            r = (0, h.Av)(),
            i = (0, g.Hk)().value,
            o = s.useState(!1),
            a = l()(o, 2),
            c = a[0],
            u = a[1],
            m = j(),
            d = l()(m, 1)[0],
            p = s.useState((null == n ? void 0 : n.imageId) || ""),
            f = l()(p, 2),
            E = f[0],
            y = f[1],
            b = s.useState((null == n ? void 0 : n.name) || ""),
            x = l()(b, 2),
            S = x[0],
            w = x[1],
            P = s.useState((null == n ? void 0 : n.bio) || ""),
            I = l()(P, 2),
            k = I[0],
            D = I[1],
            T = s.useState(),
            M = l()(T, 2),
            B = M[0],
            N = M[1],
            F = s.useState(),
            H = l()(F, 2),
            W = H[0],
            G = H[1],
            V = L(C, N),
            z = L(R, G),
            $ = s.useCallback(
              function () {
                i &&
                  (u(!0),
                  r.event("user.completedProfile", {
                    userId: i.id,
                    changedName: (null == n ? void 0 : n.name) !== S,
                    changedBio: (null == n ? void 0 : n.bio) !== k,
                    changedImage: (null == n ? void 0 : n.imageId) !== E,
                    hasName: !!S,
                    hasBio: !!k,
                    hasImage: !!E,
                  }),
                  d({
                    variables: { userId: i.id, name: S, bio: k, imageId: E },
                  }).then(function () {
                    u(!1), t(!0);
                  }));
              },
              [i, d, u, n, S, k, E]
            ),
            Y = U(n).shouldShowDialog;
          return (
            s.useEffect(
              function () {
                Y &&
                  r.event("user.presentedCompleteProfileDialog", {
                    userId: null == i ? void 0 : i.id,
                  });
              },
              [Y]
            ),
            Y
              ? s.createElement(
                  s.Fragment,
                  null,
                  s.createElement(
                    A.QH,
                    {
                      confirmText: "Continue",
                      titleText: "Complete your profile",
                      isDestructiveAction: !1,
                      onConfirm: $,
                      isVisible: !0,
                      hide: function () {},
                      withCloseButton: !1,
                      showCancelButton: !1,
                      disableConfirm: c,
                    },
                    s.createElement(
                      v.F,
                      { scale: "L", color: "DARKER" },
                      "Readers like learning a bit more about their writers"
                    ),
                    s.createElement(
                      A.xu,
                      {
                        marginTop: "48px",
                        marginBottom: "28px",
                        display: "flex",
                        flexDirection: "row",
                      },
                      s.createElement(
                        A.xu,
                        { overflow: "visible", maxHeight: "200px" },
                        s.createElement(O, {
                          setImageId: y,
                          initialImageId: E,
                          source: "userCompleteProfileDialog",
                        })
                      ),
                      s.createElement(
                        A.xu,
                        { marginLeft: "48px", textAlign: "left" },
                        s.createElement(
                          A.xu,
                          { key: "name" },
                          s.createElement(_, {
                            label: "Full name",
                            onChangeFn: function (e) {
                              return w(e.target.value);
                            },
                            onBlurFn: V,
                            value: S,
                            errorMessage: B,
                          })
                        ),
                        s.createElement(
                          A.xu,
                          { key: "bio", marginTop: "40px" },
                          s.createElement(_, {
                            label: "Bio (optional, max 160 characters)",
                            onChangeFn: function (e) {
                              return D(e.target.value);
                            },
                            onBlurFn: z,
                            value: k,
                            errorMessage: W,
                            characterCountLimit: 160,
                          })
                        )
                      )
                    )
                  )
                )
              : null
          );
        },
        B = (0, c.Ps)(T()),
        j = function () {
          return (0, m.useMutation)(N);
        },
        N = (0, c.Ps)(D()),
        F = n(23279),
        H = n.n(F),
        W = n(67297),
        G = n(51064),
        V = n(27952);
      function z() {
        var e = o()([
          "\n  query userDomainValidityQuery($domain: String!) {\n    userDomainValidity(domain: $domain)\n  }\n",
        ]);
        return (
          (z = function () {
            return e;
          }),
          e
        );
      }
      function $() {
        var e = o()([
          "\n  mutation createUserDomainMutation($domain: String!) {\n    userDomainLink(domain: $domain) {\n      __typename\n      ... on CustomDomainFailure {\n        reason\n      }\n    }\n  }\n",
        ]);
        return (
          ($ = function () {
            return e;
          }),
          e
        );
      }
      function Y() {
        var e = o()([
          "\n  fragment UserSubdomainOnboardingDialog_user on User {\n    id\n    customDomainState {\n      pending {\n        status\n      }\n      live {\n        status\n      }\n    }\n    username\n  }\n",
        ]);
        return (
          (Y = function () {
            return e;
          }),
          e
        );
      }
      var q = function (e) {
          var t,
            n,
            r = e.user,
            i = e.isVisible,
            o = e.hide,
            a = e.redirectTo,
            c = e.redirectOnHide,
            u = void 0 !== c && c,
            m = e.refreshOnHide,
            d = void 0 !== m && m,
            f = (0, E.Iq)(),
            y = (0, h.Av)(),
            b = (0, g.Hk)().value,
            x =
              null != b && b.username
                ? (function (e) {
                    return e
                      .toLowerCase()
                      .replace(/[_.]/g, "-")
                      .replace(/[^a-z0-9-]/g, "")
                      .replace(/-+/g, "-")
                      .replace(/^-/, "")
                      .replace(/-$/, "");
                  })(b.username)
                : "",
            S = s.useState(x),
            w = l()(S, 2),
            P = w[0],
            I = w[1],
            O = (0, G.O)(!1),
            _ = l()(O, 3),
            k = _[0],
            D = _[1],
            T = _[2],
            C = s.useState(!1),
            R = l()(C, 2),
            L = R[0],
            U = R[1],
            M = s.useState(!1),
            B = l()(M, 2),
            j = B[0],
            N = B[1],
            F = ee(P),
            z = te(P),
            $ = s.useState(null),
            Y = l()($, 2),
            q = Y[0],
            K = Y[1],
            X = (0, W.v9)(function (e) {
              return e.config.productName;
            }),
            Z = Q(),
            ne = l()(Z, 1)[0],
            re = J(F),
            ie = re.isValidityLoading,
            oe = re.validityResult,
            ae = re.checkValidity,
            le = s.useCallback(
              H()(function (e) {
                ae(e), U(!1);
              }, 500),
              []
            ),
            ce = s.useCallback(
              function (e) {
                var t = e.target.value;
                L || U(!0), K(null), le({ domain: t }), I(t);
              },
              [ae, L]
            ),
            se = s.useCallback(
              function () {
                N(!0),
                  y.event("user.claimedSubdomain", {
                    userId: null == b ? void 0 : b.id,
                    source: "subdomain_dialog",
                    changedUsername: (null == b ? void 0 : b.username) !== P,
                  }),
                  ne({ variables: { domain: F } }).then(function (e) {
                    var t,
                      n,
                      r,
                      i,
                      a =
                        "Something went wrong. Please try again with a different name.";
                    if (
                      "CustomDomain" ===
                      (null === (t = e.data) ||
                      void 0 === t ||
                      null === (n = t.userDomainLink) ||
                      void 0 === n
                        ? void 0
                        : n.__typename)
                    )
                      D(), o();
                    else if (
                      "CustomDomainFailure" ===
                      (null === (r = e.data) ||
                      void 0 === r ||
                      null === (i = r.userDomainLink) ||
                      void 0 === i
                        ? void 0
                        : i.__typename)
                    ) {
                      var l = e.data.userDomainLink.reason || a;
                      K(l);
                    } else K(a);
                    N(!1);
                  });
              },
              [ne, y, b, F, P]
            ),
            ue = s.useCallback(
              function () {
                u && a(z), T(), d && window.location.reload();
              },
              [z, u, d]
            ),
            me =
              !(
                null == r ||
                null === (t = r.customDomainState) ||
                void 0 === t ||
                !t.pending
              ) ||
              !(
                null == r ||
                null === (n = r.customDomainState) ||
                void 0 === n ||
                !n.live
              ),
            de = !!b && r.id === b.id && !me && p().canUseDOM;
          if (
            (s.useEffect(
              function () {
                i &&
                  de &&
                  y.event("user.presentedClaimSubdomainDialog", {
                    userId: null == b ? void 0 : b.id,
                  });
              },
              [i, de]
            ),
            !de)
          )
            return null;
          var pe = !L && !ie && (null == oe ? void 0 : oe.userDomainValidity);
          return s.createElement(
            s.Fragment,
            null,
            s.createElement(
              A.QH,
              {
                confirmText: "Claim URL",
                titleText: "Claim your ".concat(X, " URL"),
                isDestructiveAction: !1,
                onConfirm: se,
                isVisible: i,
                hide: o,
                withCloseButton: !1,
                showCancelButton: !1,
                secondaryButton: s.createElement(
                  A.zx,
                  { href: (0, V.mcw)(), size: "REGULAR" },
                  "Learn More"
                ),
                hideOnConfirm: !1,
                disableConfirm: j || !!q || !pe,
              },
              "All your stories show up on your profile, and it now comes with a personalized URL. The name you pick below will also be your username on ",
              X,
              ".",
              s.createElement(
                A.xu,
                {
                  marginBottom: "14px",
                  marginTop: "32px",
                  display: "flex",
                  flexDirection: "column",
                },
                s.createElement(A.nv, {
                  ariaLabel: "Profile domain",
                  onChange: ce,
                  value: P,
                  errorMessage: null != q ? q : void 0,
                  hideErrorIcon: !0,
                }),
                !q &&
                  s.createElement(
                    A.xu,
                    { display: "inline-block", marginTop: "8px" },
                    s.createElement(
                      "table",
                      {
                        className: f({
                          display: "table",
                          marginLeft: "auto",
                          marginRight: "auto",
                          textAlign: "left",
                          borderSpacing: "4px",
                          tableLayout: "fixed",
                          maxWidth: "100%",
                        }),
                      },
                      s.createElement(
                        "tbody",
                        null,
                        s.createElement(
                          "tr",
                          null,
                          s.createElement(
                            "td",
                            {
                              className: f({
                                paddingRight: "4px",
                                verticalAlign: "top",
                              }),
                            },
                            s.createElement(
                              v.F,
                              { color: "LIGHTER", scale: "M", tag: "h4" },
                              s.createElement("strong", null, "URL")
                            )
                          ),
                          s.createElement(
                            "td",
                            null,
                            s.createElement(
                              v.F,
                              { color: "LIGHTER", scale: "M" },
                              F
                            )
                          )
                        ),
                        s.createElement(
                          "tr",
                          null,
                          s.createElement(
                            "td",
                            {
                              className: f({
                                paddingRight: "4px",
                                verticalAlign: "top",
                              }),
                            },
                            s.createElement(
                              v.F,
                              { color: "LIGHTER", scale: "M", tag: "h4" },
                              s.createElement("strong", null, "Username")
                            )
                          ),
                          s.createElement(
                            "td",
                            {
                              className: f({
                                marginBottom: "12px",
                                marginTop: "10px",
                              }),
                            },
                            s.createElement(
                              v.F,
                              { color: "LIGHTER", scale: "M" },
                              "@",
                              P
                            )
                          )
                        ),
                        s.createElement(
                          "tr",
                          null,
                          s.createElement("td", null),
                          s.createElement(
                            "td",
                            {
                              className: f({
                                visibility:
                                  P === r.username ? "hidden" : "visible",
                              }),
                            },
                            s.createElement(
                              v.F,
                              { color: "LIGHTER", scale: "M" },
                              "@",
                              r.username,
                              " will no longer be valid"
                            )
                          )
                        )
                      )
                    )
                  )
              )
            ),
            s.createElement(
              A.QH,
              {
                confirmText: "Done",
                titleText: "You're all set.",
                isDestructiveAction: !1,
                onConfirm: function () {},
                isVisible: k,
                hide: ue,
                withCloseButton: !1,
                showCancelButton: !1,
              },
              "Your profile is now available at your ",
              X,
              " URL.",
              s.createElement(
                A.xu,
                null,
                s.createElement(
                  A.xu,
                  { display: "inline-block", marginTop: "28px" },
                  s.createElement(
                    "table",
                    {
                      className: f({
                        display: "table",
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "left",
                        tableLayout: "fixed",
                        maxWidth: "100%",
                      }),
                    },
                    s.createElement(
                      "tbody",
                      null,
                      s.createElement(
                        "tr",
                        null,
                        s.createElement(
                          "td",
                          {
                            className: f({
                              marginBottom: "12px",
                              paddingRight: "8px",
                              verticalAlign: "top",
                            }),
                          },
                          s.createElement(
                            v.F,
                            { color: "LIGHTER", scale: "M", tag: "h4" },
                            s.createElement("strong", null, "URL")
                          )
                        ),
                        s.createElement(
                          "td",
                          null,
                          s.createElement(
                            v.F,
                            { color: "LIGHTER", scale: "M", tag: "h4" },
                            F
                          )
                        )
                      ),
                      s.createElement(
                        "tr",
                        { className: f({ paddingTop: "8px" }) },
                        s.createElement(
                          "td",
                          {
                            className: f({
                              paddingRight: "8px",
                              verticalAlign: "top",
                            }),
                          },
                          s.createElement(
                            v.F,
                            { color: "LIGHTER", scale: "M", tag: "h4" },
                            s.createElement("strong", null, "Username")
                          )
                        ),
                        s.createElement(
                          "td",
                          { className: f({ marginBottom: "12px" }) },
                          s.createElement(
                            v.F,
                            { color: "LIGHTER", scale: "M", tag: "h4" },
                            "@",
                            P
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          );
        },
        K = (0, c.Ps)(Y()),
        Q = function () {
          return (0, m.useMutation)(X);
        },
        X = (0, c.Ps)($()),
        J = function (e) {
          var t = (0, m.useQuery)(Z, { variables: { domain: e }, ssr: !1 });
          return {
            isValidityLoading: t.loading,
            validityResult: t.data,
            checkValidity: t.refetch,
          };
        },
        Z = (0, c.Ps)(z()),
        ee = function (e) {
          var t = (0, W.v9)(function (e) {
            return e.config.authDomain;
          }).split(":")[0];
          return "".concat(e, ".").concat(t);
        },
        te = function (e) {
          var t = (0, W.v9)(function (e) {
            return e.config.authDomain;
          });
          return "https://".concat(e, ".").concat(t);
        },
        ne = n(8403);
      function re() {
        var e = o()([
          "\n  fragment UserSubdomainFlow_user on User {\n    id\n    hasCompletedProfile\n    name\n    bio\n    imageId\n    ...UserCompleteProfileDialog_user\n    ...UserSubdomainOnboardingDialog_user\n  }\n  ",
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
      var ie = function (e) {
          var t = e.user,
            n = e.redirectOnComplete,
            r = void 0 !== n && n,
            i = e.refreshOnComplete,
            o = void 0 !== i && i,
            a = e.forceVisible,
            c = void 0 !== a && a,
            m = "true" === (0, ne.Wd)("showDomainSetup") || c,
            d = (0, G.O)(m),
            p = l()(d, 3),
            g = p[0],
            f = p[2],
            v = s.useState(t.hasCompletedProfile),
            h = l()(v, 2),
            E = h[0],
            y = h[1],
            b = s.useState(null),
            x = l()(b, 2),
            S = x[0],
            w = x[1],
            P =
              U(t).shouldShowDialog && !E && (!t.name || !t.bio || !t.imageId);
          return S
            ? s.createElement(u.l, { to: S, replace: !0 })
            : s.createElement(
                s.Fragment,
                null,
                s.createElement(q, {
                  isVisible: g && !P,
                  hide: c ? function () {} : f,
                  user: t,
                  redirectTo: w,
                  redirectOnHide: r,
                  refreshOnHide: o,
                }),
                g && P
                  ? s.createElement(M, { user: t, setHasCompletedProfile: y })
                  : null
              );
        },
        oe = (0, c.Ps)(re(), B, K);
    },
    18839: (e, t, n) => {
      "use strict";
      n.d(t, { _: () => c });
      var r = n(67294),
        i = n(70405),
        o = n(12291),
        a = n(68254),
        l = n.n(a),
        c = (0, o.$j)(function (e) {
          return { isCustomDomain: e.client.isCustomDomain };
        })(function (e) {
          var t = e.isCustomDomain,
            n = e.isHomePage,
            o = e.imageUrl,
            a = e.card,
            c = void 0 === a ? (o ? "summary_large_image" : "summary") : a,
            s = e.title,
            u = e.description,
            m = e.seoTitle,
            d = e.seoDescription,
            p = e.pageUrl,
            g = e.publicationName,
            f = e.publicationTwitterHandle,
            v = void 0 === f ? "@Medium" : f,
            h = e.creatorTwitterHandle,
            E = void 0 === h ? v : h,
            y = e.pageType,
            b = {
              "@context": "http://schema.org",
              "@type": "Organization",
              url: "https://medium.com",
              name: "Medium",
              description: d || u,
              publishingPrinciples:
                "https://policy.medium.com/medium-terms-of-service-9db0094a1e0f",
              logo: {
                "@type": "ImageObject",
                url: "https://miro.medium.com/max/968/1*F6SrJR7_s95r6oCF3ugMZw.png",
                width: 484,
                height: 168,
              },
            };
          return r.createElement(
            i.q,
            null,
            r.createElement("title", null, m || s),
            r.createElement("meta", { name: "title", content: m || s }),
            d || u
              ? r.createElement("meta", {
                  name: "description",
                  content: d || u,
                })
              : null,
            !t &&
              n &&
              r.createElement(
                r.Fragment,
                null,
                r.createElement(
                  "script",
                  { type: "application/ld+json" },
                  l()(b, { isJSON: !0 })
                ),
                r.createElement("link", { rel: "canonical", href: p })
              ),
            r.createElement("meta", { name: "twitter:card", content: c }),
            r.createElement("meta", { name: "twitter:creator", content: E }),
            u
              ? r.createElement("meta", {
                  name: "twitter:description",
                  content: u,
                })
              : null,
            o
              ? r.createElement("meta", {
                  name: "twitter:image:src",
                  content: o,
                })
              : null,
            r.createElement("meta", { name: "twitter:site", content: v }),
            r.createElement("meta", { name: "twitter:title", content: s }),
            u
              ? r.createElement("meta", {
                  property: "og:description",
                  content: u,
                })
              : null,
            o
              ? r.createElement("meta", { property: "og:image", content: o })
              : null,
            r.createElement("meta", { property: "og:site_name", content: g }),
            r.createElement("meta", { property: "og:title", content: s }),
            r.createElement("meta", { property: "og:type", content: y }),
            r.createElement("meta", { property: "og:url", content: p }),
            r.createElement("meta", { name: "parsely-link", content: p })
          );
        });
    },
    2874: (e, t, n) => {
      "use strict";
      n.d(t, { k1: () => _, EA: () => A, d0: () => C, _k: () => R });
      var r = n(28655),
        i = n.n(r),
        o = n(71439),
        a = n(67294),
        l = n(60046),
        c = n(62872),
        s = n(43689),
        u = n(51562),
        m = n(47578),
        d = n(71542),
        p = n(34675),
        g = n(62181),
        f = n(8558),
        v = n(22091),
        h = n(64504),
        E = n(27599),
        y = n(27572),
        b = n(18839),
        x = n(67297),
        S = n(6522),
        w = n(90038),
        P = n(96879),
        I = n(27952);
      function O() {
        var e = i()([
          "\n  fragment EntityDrivenSubscriptionLandingPageScreen_writer on User {\n    name\n    imageId\n    id\n    username\n    ...userUrl_user\n  }\n  ",
          "\n",
        ]);
        return (
          (O = function () {
            return e;
          }),
          e
        );
      }
      var _ = "f73713ca13c3",
        A = "a2ace5bcce17",
        k = "entity-driven-sub-landing-page",
        D = function () {
          return a.createElement(
            c.l,
            { borderColor: "rgb(230 230 230)", height: s.Je, heightSm: s.R2 },
            a.createElement(
              v.Pm,
              null,
              a.createElement(
                v.xu,
                {
                  display: "flex",
                  alignItems: "center",
                  height: "".concat(s.Je, "px"),
                  sm: { height: "".concat(s.R2, "px") },
                  flexDirection: "row",
                },
                a.createElement(
                  v.xu,
                  { justifySelf: "flex-start", flexGrow: "1" },
                  a.createElement(l.Rv, { size: "S" })
                ),
                a.createElement(T, null)
              )
            )
          );
        },
        T = function () {
          return (0, p.Hk)().value
            ? null
            : a.createElement(
                v.xu,
                { justifySelf: "flex-end" },
                a.createElement(
                  h.F,
                  { scale: "L" },
                  a.createElement(
                    v.xu,
                    {
                      display: "flex",
                      flexDirection: "row",
                      sm: { flexDirection: "column" },
                    },
                    a.createElement(
                      v.xu,
                      { paddingRight: "4px" },
                      "Already a member?"
                    ),
                    a.createElement(
                      g.R9,
                      {
                        operation: "login",
                        linkStyle: "OBVIOUS",
                        susiEntry: "entity_driven_subscription_lp",
                      },
                      "Sign in"
                    )
                  )
                )
              );
        },
        C = function (e) {
          var t,
            n,
            r,
            i = e.user,
            o = e.redirectExperiment,
            l = e.postId,
            c = (0, x.v9)(function (e) {
              return e.config.authDomain;
            }),
            s = (0, x.v9)(function (e) {
              return e.config.productName;
            }),
            g = (0, p.Hk)().value,
            O = (0, E.Av)(),
            _ = a.useCallback(
              function () {
                O.event("entityDrivenSubCallToAction.clicked", {
                  userId: null == g ? void 0 : g.id,
                  entityId: null == i ? void 0 : i.id,
                });
              },
              [i, null == g ? void 0 : g.id, c]
            );
          if (!i) return null;
          var A = null !== (t = i.name) && void 0 !== t ? t : "",
            T = null !== (n = i.username) && void 0 !== n ? n : "",
            C = null !== (r = i.imageId) && void 0 !== r ? r : S.gG,
            R = i.id,
            L = (0, I.AWr)(i, c),
            U = (0, P.Rk)((0, I.c5p)(c), { subscribeToUserId: R }),
            M = l ? (0, I.o2w)(c, l) : L,
            B = null != g && g.mediumMemberAt ? L : U;
          return (
            (0, m.KQ)({}, A),
            a.createElement(
              a.Fragment,
              null,
              a.createElement(b._, {
                card: "summary_large_image",
                title: "Read every story from "
                  .concat(A, " (and thousands of other writers on ")
                  .concat(s, ")"),
                description: "As a "
                  .concat(
                    s,
                    " member, a portion of your membership fee goes to writers you read, and you get full access to every story on "
                  )
                  .concat(s, "."),
                imageUrl: (0, w.W6)({
                  miroId: C,
                  width: 1200,
                  strategy: w._S.Resample,
                  ignorePixelRatio: !0,
                }),
                pageType: "website",
                pageUrl: (0, I.h3G)(c, T),
                publicationName: s,
                publicationTwitterHandle: "@Medium",
              }),
              a.createElement(
                y.cW,
                { source: { name: "entity_driven_subscription", userId: R } },
                a.createElement(
                  v.xu,
                  { display: "flex", height: "100vh", flexDirection: "column" },
                  a.createElement(D, null),
                  a.createElement(
                    v.xu,
                    {
                      display: "flex",
                      height: "0",
                      flexGrow: "1",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    },
                    a.createElement(
                      v.Pm,
                      { size: "inset" },
                      a.createElement(
                        v.xu,
                        {
                          display: "flex",
                          paddingBottom: "32px",
                          justifyContent: "center",
                        },
                        a.createElement(
                          d.s,
                          null,
                          a.createElement(f.zN, {
                            miroId: C,
                            alt: A || "",
                            diameter: 128,
                            freezeGifs: !1,
                          })
                        ),
                        a.createElement(
                          d.e,
                          null,
                          a.createElement(f.zN, {
                            miroId: C,
                            alt: A || "",
                            diameter: 80,
                            freezeGifs: !1,
                          })
                        )
                      ),
                      a.createElement(
                        v.xu,
                        { paddingBottom: "20px" },
                        a.createElement(
                          h.F1,
                          {
                            scale: {
                              xs: "S",
                              sm: "S",
                              md: "L",
                              lg: "L",
                              xl: "L",
                            },
                          },
                          a.createElement(
                            u.W,
                            { featureString: k, target: "title-copy" },
                            "Read every story from ",
                            A,
                            " (and thousands of other writers on Medium)."
                          )
                        )
                      ),
                      a.createElement(
                        v.xu,
                        { paddingBottom: "20px" },
                        a.createElement(
                          h.F,
                          { scale: "L", color: "DARKER" },
                          a.createElement(
                            u.W,
                            { featureString: k, target: "description-copy" },
                            "As a Medium member, a portion of your membership fee goes to the writers you read, and you get full access to every story on Medium."
                          )
                        )
                      ),
                      a.createElement(
                        v.xu,
                        {
                          display: "flex",
                          paddingBottom: "20px",
                          flexDirection: {
                            xs: o ? "column-reverse" : void 0,
                            sm: o ? "column-reverse" : void 0,
                            md: void 0,
                            lg: void 0,
                            xl: void 0,
                          },
                          justifyContent: "center",
                        },
                        o &&
                          a.createElement(
                            v.xu,
                            {
                              paddingRight: {
                                xs: void 0,
                                sm: void 0,
                                md: "12px",
                                lg: "12px",
                                xl: "12px",
                              },
                              paddingTop: {
                                xs: "12px",
                                sm: "12px",
                                md: void 0,
                                lg: void 0,
                                xl: void 0,
                              },
                            },
                            a.createElement(
                              v.zx,
                              {
                                href: M,
                                buttonStyle: "OBVIOUS",
                                size: "LARGE",
                              },
                              "Not now"
                            )
                          ),
                        a.createElement(
                          v.xu,
                          null,
                          a.createElement(
                            v.zx,
                            {
                              onClick: _,
                              href: B,
                              buttonStyle: "STRONG",
                              size: "LARGE",
                            },
                            a.createElement(
                              u.W,
                              {
                                featureString: k,
                                target: "logged-in-button-copy",
                              },
                              "Become a member"
                            )
                          )
                        )
                      ),
                      !o &&
                        a.createElement(
                          h.F,
                          { scale: "L", color: "DARKER", tag: "span" },
                          a.createElement(
                            v.rU,
                            { linkStyle: "SUBTLE", href: L },
                            a.createElement(
                              u.W,
                              { featureString: k, target: "link-copy" },
                              "Visit ",
                              A,
                              "'s profile"
                            )
                          )
                        )
                    )
                  )
                )
              )
            )
          );
        },
        R = (0, o.Ps)(O(), I.$mN);
    },
    95200: (e, t, n) => {
      "use strict";
      n.d(t, { gc: () => Vn, De: () => $n, m6: () => Yn });
      var r = n(28655),
        i = n.n(r),
        o = n(67154),
        a = n.n(o),
        l = n(59713),
        c = n.n(l),
        s = n(63038),
        u = n.n(s),
        m = n(71439),
        d = n(67294),
        p = n(12291),
        g = n(28859),
        f = n(68254),
        v = n.n(f);
      function h(e, t) {
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
      function E(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? h(Object(n), !0).forEach(function (t) {
                c()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : h(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var y = (0, p.$j)(function (e) {
          return { googleAnalyticsCode: e.config.googleAnalyticsCode };
        })(function (e) {
          var t = e.googleAnalyticsCode,
            n = e.collectionGoogleAnalyticsId,
            r = n
              ? {
                  trackCollectionPageview: {
                    on: "visible",
                    request: "pageview",
                    vars: { account: n },
                  },
                }
              : {},
            i = {
              triggers: E(
                E(
                  {},
                  {
                    trackPageview: {
                      on: "visible",
                      request: "pageview",
                      vars: { account: t },
                    },
                  }
                ),
                r
              ),
            },
            o = {
              __html: '<script type="application/json">'.concat(
                v()(i, { isJSON: !0 }),
                "</script>"
              ),
            };
          return d.createElement("amp-analytics", {
            type: "googleanalytics",
            id: "google-analytics",
            dangerouslySetInnerHTML: o,
          });
        }),
        b = n(85549),
        x = n(638),
        S = n(45113),
        w = n(9972),
        P = n(2955),
        I = n(94132),
        O = n(26463),
        _ = n(62872),
        A = n(85432),
        k = n(67122),
        D = function (e) {
          var t = e.children;
          return d.createElement(
            d.Fragment,
            null,
            d.createElement(A.xu, {
              marginTop: "-240px",
              background: "linear-gradient("
                .concat((0, k.l9)(0), ",\n        ")
                .concat((0, k.l9)(0.5), ",\n        ")
                .concat((0, k.l9)(1), ")"),
              height: "250px",
              position: "relative",
              width: "100%",
            }),
            d.createElement(
              A.xu,
              { backgroundColor: "BACKGROUND" },
              d.createElement(
                A.xu,
                {
                  margin: "auto",
                  maxWidth: "760px",
                  sm: { margin: "0 24px 0" },
                },
                t
              )
            )
          );
        },
        T = n(51562),
        C = n(32149),
        R = n(71542),
        L = n(34675),
        U = n(324),
        M = n(62181),
        B = n(8558),
        j = n(64504),
        N = n(98024),
        F = n(27599),
        H = n(27572),
        W = n(2874),
        G = n(85277),
        V = n(67297),
        z = n(6522),
        $ = n(96879),
        Y = n(27952);
      function q() {
        var e = i()([
          "\n  fragment MemberOnlyWall_post on Post {\n    id\n    creator {\n      id\n      name\n      username\n      ...useShouldShowEntityDrivenSubscription_creator\n      ...EntityDrivenSubscriptionLandingPageScreen_writer\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (q = function () {
            return e;
          }),
          e
        );
      }
      var K = "entity-driven-sub-member-only-wall",
        Q = function (e) {
          return (0, L.Hk)().value
            ? null
            : d.createElement(
                A.xu,
                { display: "flex", justifyContent: "center" },
                d.createElement(
                  N.F,
                  { scale: "L" },
                  d.createElement(
                    A.xu,
                    {
                      display: "flex",
                      flexDirection: "row",
                      xs: { paddingBottom: "20px" },
                      sm: { paddingBottom: "20px" },
                      md: { paddingBottom: "40px" },
                      lg: { paddingBottom: "40px" },
                      xl: { paddingBottom: "40px" },
                    },
                    d.createElement(
                      A.xu,
                      { paddingRight: "4px" },
                      "Already a member?"
                    ),
                    d.createElement(
                      M.R9,
                      {
                        operation: "login",
                        linkStyle: "OBVIOUS",
                        susiEntry:
                          "entity_driven_subscription_member_only_wall",
                        post: e,
                      },
                      "Sign in"
                    )
                  )
                )
              );
        },
        X = function (e) {
          var t,
            n,
            r,
            i = e.post,
            o = (0, G.w)(),
            a = (0, F.Av)(),
            l = (0, V.v9)(function (e) {
              return e.config.authDomain;
            }),
            c = (0, V.v9)(function (e) {
              return e.config.productName;
            }),
            s = (0, L.Hk)().value,
            u = null == i ? void 0 : i.creator,
            m = null == u ? void 0 : u.viewerEdge.isAllowEdsEnabled,
            p =
              null !== (t = null == s ? void 0 : s.mediumMemberAt) &&
              void 0 !== t &&
              t,
            g =
              null !== (n = null == u ? void 0 : u.viewerIsUser) &&
              void 0 !== n &&
              n,
            f = (null == u ? void 0 : u.id) || "",
            v = null == u ? void 0 : u.name,
            h = (0, Y.o2w)(l, null == i ? void 0 : i.id),
            E =
              null !== (r = null == u ? void 0 : u.imageId) && void 0 !== r
                ? r
                : z.gG,
            y = g && m && p,
            b = d.useCallback(
              function () {
                a.event("entityDrivenSubCallToAction.clicked", {
                  userId: null == s ? void 0 : s.id,
                  entityId: f,
                }),
                  y &&
                    o({
                      message: "You're already a ".concat(c, " member."),
                      toastStyle: "MESSAGE",
                    });
              },
              [u, s, l]
            ),
            x = (0, $.Rk)((0, Y.c5p)(l), { subscribeToUserId: f }),
            S = null != s && s.mediumMemberAt ? h : x,
            w = s ? "li-".concat(K) : "lo-".concat(K);
          return d.createElement(
            U.N8,
            null,
            d.createElement(
              D,
              null,
              d.createElement(
                H.cW,
                {
                  source: {
                    name: "entity_driven_subscription_member_only_wall",
                    postId: i.id,
                    susiEntry: "entity_driven_subscription_member_only_wall",
                  },
                },
                d.createElement(
                  A.xu,
                  {
                    display: "flex",
                    minHeight: "350px",
                    justifyContent: "center",
                    textAlign: "center",
                    sm: { flexDirection: "column" },
                  },
                  d.createElement(
                    A.xu,
                    {
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px 0",
                      sm: {
                        paddingTop: "28px",
                        paddingBottom: "32px",
                        textAlign: "center",
                      },
                      maxWidth: "680px",
                    },
                    d.createElement(
                      A.Pm,
                      { size: "full" },
                      d.createElement(
                        A.xu,
                        {
                          display: "flex",
                          paddingBottom: "32px",
                          justifyContent: "center",
                        },
                        d.createElement(
                          R.s,
                          null,
                          d.createElement(B.zN, {
                            miroId: E,
                            alt: v || "",
                            diameter: 80,
                            freezeGifs: !1,
                          })
                        ),
                        d.createElement(
                          R.e,
                          null,
                          d.createElement(B.zN, {
                            miroId: E,
                            alt: v || "",
                            diameter: 80,
                            freezeGifs: !1,
                          })
                        )
                      ),
                      d.createElement(
                        A.xu,
                        { paddingBottom: "20px" },
                        d.createElement(
                          j.F1,
                          {
                            scale: {
                              xs: "S",
                              sm: "S",
                              md: "M",
                              lg: "M",
                              xl: "M",
                            },
                          },
                          d.createElement(
                            T.W,
                            { featureString: w, target: "title-copy" },
                            s
                              ? ""
                                  .concat(s.name, ", read more from ")
                                  .concat(
                                    v,
                                    " — and everything else on Medium."
                                  )
                              : "Read more from ".concat(
                                  v,
                                  " — and everything else on Medium."
                                )
                          )
                        )
                      ),
                      d.createElement(
                        A.xu,
                        { paddingBottom: "20px" },
                        d.createElement(
                          N.F,
                          { scale: "L", color: "DARKER" },
                          d.createElement(
                            T.W,
                            { featureString: w, target: "description-copy" },
                            v,
                            " has made this story exclusive to members. Upgrade to keep reading."
                          )
                        )
                      ),
                      d.createElement(
                        A.xu,
                        { paddingBottom: "20px" },
                        d.createElement(
                          A.zx,
                          {
                            size: "LARGE",
                            onClick: b,
                            buttonStyle: "STRONG",
                            href: S,
                          },
                          "Upgrade"
                        )
                      ),
                      d.createElement(Q, { post: i })
                    )
                  )
                )
              )
            )
          );
        },
        J = ((0, m.Ps)(q(), C.G, W._k), n(53976)),
        Z = n(80439),
        ee = n(85740),
        te = n(90738),
        ne = n(14414),
        re = n(11348);
      function ie() {
        var e = i()([
          "\n  mutation SendAcctAuthEmailByUserId(\n    $userId: String!\n    $redirect: String\n    $fullName: String\n    $captchaValue: String\n  ) {\n    sendAcctAuthEmailByUserId(\n      userId: $userId\n      redirect: $redirect\n      fullName: $fullName\n      captchaValue: $captchaValue\n    ) {\n      ... on SusiMethod {\n        value\n      }\n      ... on BadRequest {\n        message\n      }\n      ... on FailedChallenge {\n        message\n      }\n      ... on NotFound {\n        message\n      }\n    }\n  }\n",
        ]);
        return (
          (ie = function () {
            return e;
          }),
          e
        );
      }
      var oe = (0, m.Ps)(ie()),
        ae = function (e) {
          var t = e.actionUrl,
            n = e.children,
            r = e.onSuccess,
            i = e.token,
            o = e.userId,
            a = (0, F.Av)(),
            l = !!(0, ee.P5)("skip_sign_in_recaptcha"),
            c = d.useState(!1),
            s = u()(c, 2),
            m = s[0],
            p = s[1],
            g = (0, V.v9)(function (e) {
              return e.navigation.currentLocation;
            }),
            f = function () {
              p(!1);
            },
            v = (0, H.pK)(),
            h = (0, H.hp)(),
            E = t && i ? (0, ne.hQ)(g, v, h, t, i) : (0, ne.hQ)(g, v, h),
            y = (0, L.rZ)(),
            b = y.loading,
            x = y.error,
            S = y.viewerId;
          return b || x
            ? null
            : d.createElement(
                Z.mm,
                {
                  mutation: oe,
                  onCompleted: function (e) {
                    switch (e.sendAcctAuthEmailByUserId.__typename) {
                      case "SusiMethod":
                        a.event("site.loginLinkSent", {}), r && r();
                        break;
                      case "FailedChallenge":
                        a.event("site.loginByEmailCaptchaFailure", {}), p(!1);
                        break;
                      case "BadRequest":
                      case "NotFound":
                      default:
                        f();
                    }
                  },
                  onError: f,
                },
                function (e) {
                  var t = function (t) {
                    (0, re.Zs)(!0, S, o, "Email", !1);
                    var n = "medium";
                    a.event("susi.methodClicked", {
                      entryPoint: h,
                      operation: "login",
                      susiMethod: n.toLowerCase(),
                      alternateUserSuggestionShown: !0,
                      alternateUserSuggestionAccountType: n.toLowerCase(),
                      alternateUserSuggestionTargetUserId: o,
                      alternateUserSuggestionSourceUserId: S,
                    }),
                      e({
                        variables: { userId: o, redirect: E, captchaValue: t },
                      });
                  };
                  return d.createElement(
                    d.Fragment,
                    null,
                    !l &&
                      d.createElement(te.k, {
                        callback: t,
                        shouldExecuteRecaptcha: m,
                      }),
                    n({
                      handleSubmit: function () {
                        return l ? t(null) : p(!0);
                      },
                    })
                  );
                }
              );
        },
        le = n(90174),
        ce = n(4134),
        se = n(70146),
        ue = n(37581),
        me = function (e) {
          var t = e.actionUrl,
            n = e.token,
            r = e.userSocialLogins,
            i = {
              actionUrl: t || "",
              operation: "login",
              token: n || "",
              targetUserId: r.userId,
              alternateUserSuggestion: !0,
            };
          return d.createElement(
            ue.$,
            { eventData: { operation: i.operation } },
            r.google
              ? d.createElement(ce.x, i)
              : r.facebook
              ? d.createElement(le.q, i)
              : r.twitter
              ? d.createElement(se.G, i)
              : d.createElement(d.Fragment, null)
          );
        };
      function de(e, t) {
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
      var pe = function (e) {
          var t = e.declineSuggestedAccount,
            n = e.isSocial,
            r = (0, V.v9)(function (e) {
              return e.navigation.hasRenderedAlternateUserBanner;
            }),
            i = (0, H.hp)(),
            o = (0, p.I0)(),
            a = (0, L.Hk)(),
            l = a.loading,
            s = a.error,
            u = a.value;
          if (l || s) return d.createElement(d.Fragment, null);
          var m = function (e) {
              return e
                ? d.createElement(
                    A.rU,
                    {
                      onClick: function () {
                        return g("SIGNIN_OPTIONS");
                      },
                      linkStyle: "OBVIOUS",
                    },
                    "See all login options"
                  )
                : d.createElement(
                    d.Fragment,
                    null,
                    "Not you?",
                    " ",
                    d.createElement(
                      A.rU,
                      {
                        onClick: function () {
                          return g("SIGNIN_OPTIONS");
                        },
                        linkStyle: "OBVIOUS",
                      },
                      "Sign in"
                    ),
                    " or ",
                    d.createElement(
                      A.rU,
                      {
                        onClick: function () {
                          return g("SIGNUP_OPTIONS");
                        },
                        linkStyle: "OBVIOUS",
                      },
                      "create an account"
                    )
                  );
            },
            g = function (e) {
              var n = "SIGNIN_OPTIONS" === e ? "login" : "register";
              t(),
                o(
                  (0, G.Pc)(
                    (function (e) {
                      for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                          ? de(Object(n), !0).forEach(function (t) {
                              c()(e, t, n[t]);
                            })
                          : Object.getOwnPropertyDescriptors
                          ? Object.defineProperties(
                              e,
                              Object.getOwnPropertyDescriptors(n)
                            )
                          : de(Object(n)).forEach(function (t) {
                              Object.defineProperty(
                                e,
                                t,
                                Object.getOwnPropertyDescriptor(n, t)
                              );
                            });
                      }
                      return e;
                    })({ operation: n, step: e }, !!i && { susiEntry: i })
                  )
                );
            };
          return r
            ? m(u)
            : u
            ? d.createElement(
                A.rU,
                {
                  onClick: function () {
                    return t();
                  },
                },
                "Not me"
              )
            : m(n);
        },
        ge = n(51512);
      function fe(e) {
        if ((e.match(/ /g) || []).length > 1) return "";
        var t = e.indexOf(" ");
        return e.substring(0, t);
      }
      function ve(e) {
        return e.google
          ? "google"
          : e.facebook
          ? "facebook"
          : e.twitter
          ? "twitter"
          : "medium";
      }
      var he = n(8403);
      function Ee() {
        var e = i()([
          "\n  query UserSocialLoginsQuery($userId: String!) {\n    userSocialLogins(userId: $userId) {\n      userId\n      twitter\n      facebook\n      google\n      redactedEmailAddress\n      isMember\n      emailAddress\n      userAvatar {\n        __typename\n        username\n        name\n        imageId\n        mediumMemberAt\n      }\n    }\n  }\n",
        ]);
        return (
          (Ee = function () {
            return e;
          }),
          e
        );
      }
      function ye(e, t) {
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
            ? ye(Object(n), !0).forEach(function (t) {
                c()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ye(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var xe = function (e) {
          var t = e.children,
            n = e.postRenderCallback,
            r = (0, F.Av)(),
            i = (0, H.hp)(),
            o = (0, he.PM)(),
            a = (0, ge.P7)(o || ""),
            l = a.userId,
            c = a.name,
            s = d.useState({
              shouldRun: !1,
              showSuggestedAccount: !1,
              userSocialLogins: {
                facebook: !1,
                google: !1,
                twitter: !1,
                redactedEmailAddress: "",
                emailAddress: "",
                userAvatar: {
                  __typename: "UserAvatar",
                  username: "",
                  name: "",
                  imageId: "",
                  mediumMemberAt: 0,
                },
                userId: "",
                isMember: !1,
              },
            }),
            m = u()(s, 2),
            p = m[0],
            g = m[1];
          d.useEffect(
            function () {
              var e = p.shouldRun,
                t = p.showSuggestedAccount,
                r = p.userSocialLogins;
              e && n(f, t, r);
            },
            [p.shouldRun]
          );
          var f = (0, L.Hk)().value,
            v = (0, L.rZ)(),
            h = v.loading,
            E = v.error,
            y = v.viewerId;
          if (h || E) return null;
          var b = !("email" !== c || (f && f.mediumMemberAt) || !l);
          return b && l
            ? d.createElement(
                Z.AE,
                { query: Se, variables: { userId: l } },
                function (e) {
                  var o = e.loading,
                    a = e.error,
                    l = e.data,
                    c = (l = void 0 === l ? {} : l).userSocialLogins,
                    s = !(
                      o ||
                      a ||
                      !c ||
                      (f && !c.isMember) ||
                      (!c.facebook &&
                        !c.google &&
                        !c.twitter &&
                        !c.redactedEmailAddress)
                    ),
                    u = be(
                      { loading: o, showSuggestedAccount: s },
                      s && {
                        userSocialLogins: c,
                        declineSuggestedAccount: function () {
                          var e = ve(c);
                          r.event("susi.suggestNotYou", {
                            entryPoint: i,
                            susiMethod: e,
                            alternateUserSuggestionAccountType: e,
                            alternateUserSuggestionTargetUserId:
                              null == c ? void 0 : c.userId,
                            alternateUserSuggestionSourceUserId: y,
                          });
                        },
                      }
                    );
                  return (
                    !n ||
                      o ||
                      p.shouldRun ||
                      g({
                        shouldRun: !0,
                        showSuggestedAccount: s,
                        userSocialLogins: c,
                      }),
                    t(u)
                  );
                }
              )
            : (n && !p.shouldRun && g(be(be({}, p), {}, { shouldRun: !0 })),
              t({ showSuggestedAccount: b, loading: !1 }));
        },
        Se = (0, m.Ps)(Ee()),
        we = n(62876),
        Pe = n(96907);
      function Ie() {
        var e = i()([
          "\n  fragment PayWall_post on Post {\n    id\n    creator {\n      name\n    }\n  }\n",
        ]);
        return (
          (Ie = function () {
            return e;
          }),
          e
        );
      }
      var Oe = function (e) {
          var t = e.optimizelyFeatureString,
            n = e.post,
            r = e.showTrialPaywall,
            i = e.authDomain,
            o = (0, L.Hk)().value;
          return d.createElement(
            H.cW,
            {
              source: {
                dimension: "post_limit",
                name: "upgrade_membership",
                postId: n.id,
              },
            },
            d.createElement(
              Pe.M,
              null,
              d.createElement(
                A.xu,
                { display: "inline-block", textAlign: "center" },
                d.createElement(
                  T.W,
                  {
                    featureString: t,
                    target: r
                      ? "trial-upsell-button"
                      : "upsell-button-".concat(
                          o && o.hasPastMemberships
                            ? "resume-membership"
                            : "upgrade"
                        ),
                  },
                  d.createElement(
                    we.a,
                    {
                      isButton: !0,
                      buttonStyle: r ? "BRAND" : "STRONG",
                      width:
                        r || (o && o.hasPastMemberships) ? "182px" : "104px",
                      redirectUrl: (0, Y.c5p)(i),
                    },
                    r
                      ? "Start your free trial"
                      : o && o.hasPastMemberships
                      ? "Resume membership"
                      : "Upgrade"
                  )
                )
              )
            )
          );
        },
        _e = function (e) {
          var t = e.declineSuggestedAccount,
            n = e.userSocialLogins,
            r = (0, p.I0)();
          return d.createElement(
            H.cW,
            { source: { susiEntry: "post_paywall" }, extendSource: !0 },
            d.createElement(
              A.xu,
              { display: "flex", sm: { flexDirection: "column" } },
              d.createElement(
                A.xu,
                {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                },
                n.facebook || n.google || n.twitter
                  ? d.createElement(me, { userSocialLogins: n })
                  : d.createElement(
                      ae,
                      {
                        onSuccess: function () {
                          return r(
                            (0, G.Pc)({
                              step: "CHECK_YOUR_INBOX",
                              operation: "login",
                              susiEntry: "post_paywall",
                            })
                          );
                        },
                        userId: n.userId,
                      },
                      function (e) {
                        var t = e.handleSubmit;
                        return d.createElement(
                          A.zx,
                          {
                            buttonStyle: "SOCIAL",
                            size: "REGULAR",
                            onClick: t,
                          },
                          "Send login link"
                        );
                      }
                    )
              )
            ),
            t &&
              d.createElement(
                A.xu,
                {
                  marginTop: "10px",
                  marginRight: "5px",
                  sm: { marginTop: "20px" },
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                },
                d.createElement(
                  N.F,
                  { scale: "M" },
                  d.createElement(pe, {
                    declineSuggestedAccount: t,
                    isSocial: !!n && !!(n.facebook || n.google || n.twitter),
                  })
                )
              )
          );
        },
        Ae = function (e) {
          var t = e.declineSuggestedAccount,
            n = e.userSocialLogins,
            r = e.suggestedAccountEventData,
            i = e.showSuggestedAccount,
            o = e.postId;
          return d.createElement(
            H.cW,
            {
              source: {
                dimension: "post_limit_suggestion",
                name: "upgrade_membership",
                postId: o,
              },
            },
            d.createElement(
              Pe.M,
              { eventData: r },
              d.createElement(
                A.xu,
                { display: "inline-block", textAlign: "center" },
                d.createElement(_e, {
                  declineSuggestedAccount: t,
                  showSuggestedAccount: i,
                  userSocialLogins: n,
                }),
                d.createElement(
                  A.xu,
                  {
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                    sm: { justifyContent: "center" },
                  },
                  d.createElement(
                    N.F,
                    { scale: "L" },
                    d.createElement(
                      we.a,
                      { eventData: r, linkStyle: "OBVIOUS" },
                      "Learn more about membership"
                    )
                  )
                )
              )
            )
          );
        },
        ke = function (e) {
          var t = e.post,
            n = (0, V.v9)(function (e) {
              return e.config.authDomain;
            }),
            r = (0, V.v9)(function (e) {
              return e.config.productName;
            }),
            i = (0, L.Hk)().value,
            o = (0, L.rZ)().viewerId,
            a = (0, F.Av)(),
            l = null == i ? void 0 : i.isMembershipTrialEligible,
            c = !(
              !(0, J.V)({ name: "enable_trial_upsell", placeholder: !1 }) || !l
            ),
            s = !!(0, J.V)({ name: "optimizely_holdback", placeholder: !1 });
          d.useEffect(
            function () {
              l &&
                a.event("experiment.eligible", {
                  experimentId: "6797776ba4cf",
                });
            },
            [l]
          );
          var u = "paywall";
          return d.createElement(
            U.N8,
            null,
            d.createElement(
              D,
              null,
              d.createElement(
                xe,
                { postRenderCallback: function () {} },
                function (e) {
                  var a,
                    l = e.loading,
                    m = e.showSuggestedAccount,
                    p = e.declineSuggestedAccount,
                    g = e.userSocialLogins;
                  return l
                    ? d.createElement(d.Fragment, null)
                    : (m && (u = "suggested-account-paywall"),
                      m &&
                        (a = {
                          alternateUserSuggestionShown: m,
                          alternateUserSuggestionAccountType: ve(g),
                          alternateUserSuggestionTargetUserId: !!g && g.userId,
                          alternateUserSuggestionSourceUserId: o,
                        }),
                      d.createElement(
                        d.Fragment,
                        null,
                        d.createElement(
                          T.W,
                          {
                            featureString: u,
                            target: c
                              ? "trial-background-color"
                              : "background-color",
                          },
                          d.createElement(
                            A.xu,
                            {
                              display: "flex",
                              minHeight: "350px",
                              justifyContent: "center",
                              textAlign: "center",
                              sm: { flexDirection: "column" },
                            },
                            d.createElement(
                              A.xu,
                              {
                                display: "flex",
                                flexDirection: "column",
                                padding: "48px 50px",
                                sm: {
                                  padding: "28px 16px 32px",
                                  textAlign: "center",
                                },
                              },
                              d.createElement(
                                T.W,
                                {
                                  featureString: u,
                                  target: c
                                    ? "webCCTrialHeading"
                                    : "fewerClicksHeading",
                                },
                                d.createElement(
                                  j.F1,
                                  {
                                    scale: {
                                      xs: "S",
                                      sm: "S",
                                      md: "M",
                                      lg: "M",
                                      xl: "M",
                                    },
                                  },
                                  (function (e, t, n, r) {
                                    var i = r.showSuggestedAccount,
                                      o = r.showTrialPaywall,
                                      a = r.inHoldback,
                                      l = t ? fe(t) : null;
                                    return (
                                      (l = l && l.length <= 13 ? l : null),
                                      i
                                        ? "Switch to your member account for unlimited reading."
                                        : o
                                        ? d.createElement(
                                            A.xu,
                                            {
                                              textAlign: "center",
                                              sm: {
                                                marginBottom: "5px",
                                                textAlign: "center",
                                              },
                                            },
                                            l
                                              ? "".concat(l, ", keep reading.")
                                              : "Keep reading."
                                          )
                                        : d.createElement(
                                            A.xu,
                                            {
                                              textAlign: "left",
                                              sm: {
                                                marginBottom: "5px",
                                                textAlign: "center",
                                              },
                                            },
                                            a
                                              ? "How to read this story — and everything else on ".concat(
                                                  e,
                                                  "."
                                                )
                                              : l
                                              ? n
                                                ? ""
                                                    .concat(
                                                      l,
                                                      ", read more from "
                                                    )
                                                    .concat(
                                                      n,
                                                      " — and everyone else on "
                                                    )
                                                    .concat(e, ".")
                                                : ""
                                                    .concat(
                                                      l,
                                                      ", here's how to read this story — and everything else on "
                                                    )
                                                    .concat(e, ".")
                                              : n
                                              ? "How to read this story from "
                                                  .concat(
                                                    n,
                                                    " — and everything else on "
                                                  )
                                                  .concat(e, ".")
                                              : "How to read this story — and everything else on ".concat(
                                                  e,
                                                  "."
                                                )
                                          )
                                    );
                                  })(
                                    r,
                                    i && i.name,
                                    t.creator && t.creator.name,
                                    {
                                      showSuggestedAccount: m,
                                      showTrialPaywall: c,
                                      inHoldback: s,
                                    }
                                  )
                                )
                              ),
                              d.createElement(
                                N.F,
                                {
                                  scale: {
                                    xs: "M",
                                    sm: "M",
                                    md: "L",
                                    lg: "L",
                                    xl: "L",
                                  },
                                  color: "DARKER",
                                  tag: "div",
                                },
                                !m &&
                                  !c &&
                                  d.createElement(
                                    d.Fragment,
                                    null,
                                    d.createElement(
                                      T.W,
                                      {
                                        featureString: u,
                                        target: "second-header-fewer-clicks",
                                      },
                                      d.createElement(
                                        A.xu,
                                        {
                                          marginTop: "8px",
                                          marginBottom: "28px",
                                          textAlign: "left",
                                          sm: {
                                            display: "inline-block",
                                            textAlign: "center",
                                          },
                                        },
                                        "You’ve read all your free member-only stories. Become a member to get unlimited access and support the voices you want to hear more from."
                                      )
                                    ),
                                    d.createElement(
                                      A.xu,
                                      {
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        sm: { justifyContent: "center" },
                                      },
                                      d.createElement(Oe, {
                                        optimizelyFeatureString: u,
                                        post: t,
                                        showTrialPaywall: c,
                                        authDomain: n,
                                      })
                                    )
                                  ),
                                d.createElement(
                                  T.W,
                                  {
                                    featureString: u,
                                    target: c
                                      ? "subtitle-copy-web-cc-trial"
                                      : "subtitle-copy-fewer-clicks",
                                  },
                                  d.createElement(
                                    A.xu,
                                    {
                                      marginTop: m ? "28px" : "8px",
                                      marginBottom: "28px",
                                      paddingRight: "6px",
                                      paddingLeft: "6px",
                                      sm: { display: "inline-block" },
                                    },
                                    (function (e, t, n, r) {
                                      var i = n.showTrialPaywall;
                                      if (n.showSuggestedAccount && t) {
                                        var o = t.isMember,
                                          a = t.redactedEmailAddress;
                                        return d.createElement(
                                          d.Fragment,
                                          null,
                                          "Looks like you're coming from the ",
                                          o && "member ",
                                          "account",
                                          " ",
                                          d.createElement("b", null, a),
                                          " but you’re signed in as ",
                                          d.createElement(
                                            "b",
                                            null,
                                            null == r ? void 0 : r.email
                                          ),
                                          ". Switch to your",
                                          o
                                            ? " member account for unlimited access"
                                            : " account",
                                          "."
                                        );
                                      }
                                      return d.createElement(
                                        A.xu,
                                        {
                                          marginTop: "28px",
                                          marginBottom: "28px",
                                          textAlign: i ? "center" : "left",
                                        },
                                        i
                                          ? "Start your 1 month free trial for unlimited access to everything on ".concat(
                                              e,
                                              ". If it’s not for you, cancel anytime."
                                            )
                                          : d.createElement(
                                              d.Fragment,
                                              null,
                                              d.createElement(
                                                "b",
                                                null,
                                                "Read any story. "
                                              ),
                                              "Access everything on ",
                                              e,
                                              " across all your devices with no limits or ads.",
                                              d.createElement("br", null),
                                              d.createElement("br", null),
                                              d.createElement(
                                                "b",
                                                null,
                                                "Reward great writing. "
                                              ),
                                              "A portion of your membership fee will go toward the writers you read most."
                                            )
                                      );
                                    })(
                                      r,
                                      g,
                                      {
                                        showSuggestedAccount: m,
                                        showTrialPaywall: c,
                                      },
                                      i
                                    )
                                  )
                                )
                              ),
                              !!m &&
                                g &&
                                d.createElement(Ae, {
                                  declineSuggestedAccount: p,
                                  userSocialLogins: g,
                                  suggestedAccountEventData: a,
                                  showSuggestedAccount: m,
                                  postId: t.id,
                                }),
                              c &&
                                !m &&
                                d.createElement(Oe, {
                                  optimizelyFeatureString: u,
                                  post: t,
                                  showTrialPaywall: c,
                                  authDomain: n,
                                })
                            )
                          )
                        )
                      ));
                }
              )
            )
          );
        },
        De = (0, m.Ps)(Ie()),
        Te = n(6401),
        Ce = n(5731),
        Re = n(59317),
        Le = n(81405);
      function Ue() {
        var e = i()([
          "\n  fragment RegWall_meteringInfo on MeteringInfo {\n    postIds\n  }\n",
        ]);
        return (
          (Ue = function () {
            return e;
          }),
          e
        );
      }
      function Me() {
        var e = i()([
          "\n  fragment RegWall_post on Post {\n    id\n    lockedSource\n    ...SusiClickable_post\n  }\n  ",
          "\n",
        ]);
        return (
          (Me = function () {
            return e;
          }),
          e
        );
      }
      var Be = "post_regwall",
        je = function (e) {
          var t = e.enablePasswords,
            n = e.meterCount,
            r = e.optimizelyFeatureString,
            i = e.postId,
            o = { operation: "register" },
            a = (0, Re.j)().openModal,
            l = function (e) {
              var n = e.children;
              return t
                ? d.createElement(
                    T.W,
                    { featureString: r, target: "google-button" },
                    n
                  )
                : n;
            };
          return d.createElement(
            A.xu,
            {
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              sm: { flexDirection: "column" },
            },
            d.createElement(
              T.W,
              { featureString: r, target: "google-button" },
              d.createElement(
                A.xu,
                {
                  margin: "".concat(t ? "32px" : "62px", " 0 10px"),
                  sm: { margin: "40px 0 12px 0" },
                },
                d.createElement(
                  ue.$,
                  {
                    eventData: {
                      meterCount: n,
                      operation: o.operation,
                      postId: i,
                    },
                  },
                  d.createElement(ce.x, o)
                )
              )
            ),
            d.createElement(
              l,
              null,
              d.createElement(
                A.xu,
                {
                  marginBottom: t ? "32px" : "52px",
                  sm: { marginBottom: "40px" },
                },
                d.createElement(
                  ue.$,
                  {
                    eventData: {
                      meterCount: n,
                      operation: o.operation,
                      postId: i,
                    },
                  },
                  t
                    ? d.createElement(Le.R, {
                        goToEmailAuthStep: function () {
                          a({
                            step: "ENTER_EMAIL",
                            susiEntry: Be,
                            operation: "register",
                          });
                        },
                        operation: "register",
                      })
                    : d.createElement(le.q, o)
                )
              )
            )
          );
        },
        Ne = function (e) {
          var t = e.meteringInfo,
            n = e.post,
            r = (0, F.Av)(),
            i = !!(0, ee.P5)("enable_passwords"),
            o = "LOCKED_POST_SOURCE_SYNDICATED" === n.lockedSource,
            a = "".concat(o ? "syndicated-" : "", "regwall");
          return (
            d.useEffect(function () {
              r.event("meter.viewed", {
                meterCount: null == t ? void 0 : t.postIds.length,
                postId: n.id,
                uiType: o ? Ce.j.SyndicatedRegwall : Ce.j.RegWall,
              });
            }, []),
            d.createElement(
              U.N8,
              null,
              d.createElement(
                H.cW,
                { source: { postId: n.id, susiEntry: Be } },
                d.createElement(
                  D,
                  null,
                  d.createElement(
                    T.W,
                    { featureString: a, target: "background-color" },
                    d.createElement(
                      A.xu,
                      {
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        sm: { flexDirection: "column", textAlign: "center" },
                      },
                      d.createElement(
                        A.xu,
                        {
                          padding: "48px 56px",
                          sm: { padding: "28px 16px 48px" },
                        },
                        d.createElement(
                          T.W,
                          { featureString: a, target: "heading" },
                          d.createElement(
                            j.F1,
                            {
                              scale: {
                                xs: "S",
                                sm: "S",
                                md: "M",
                                lg: "M",
                                xl: "M",
                              },
                            },
                            d.createElement(
                              A.xu,
                              { display: "none", sm: { display: "block" } },
                              "To keep reading this story, get the free app or log in."
                            ),
                            d.createElement(
                              A.xu,
                              { display: "block", sm: { display: "none" } },
                              "Read the rest of this story with a free account."
                            )
                          )
                        ),
                        d.createElement(
                          j.F,
                          {
                            color: "DARKER",
                            scale: {
                              xs: "M",
                              sm: "M",
                              md: "L",
                              lg: "L",
                              xl: "L",
                            },
                            tag: "div",
                          },
                          d.createElement(
                            A.xu,
                            {
                              display: "none",
                              margin: "auto",
                              paddingTop: "10px",
                              width: "500px",
                            },
                            "You’ll also discover more fresh thinking personalized to your interests and can follow your favorite authors, publications, and topics."
                          ),
                          d.createElement(
                            A.xu,
                            { display: "none", sm: { display: "block" } },
                            d.createElement(
                              A.xu,
                              { margin: "".concat(i ? "40px" : "42px", " 0") },
                              d.createElement(Te.a, {
                                isButton: !0,
                                postId: n.id,
                                appEntry: "regwall",
                              })
                            ),
                            d.createElement(
                              T.W,
                              { featureString: a, target: "skip-app-copy" },
                              d.createElement(
                                A.xu,
                                { marginBottom: "-20px" },
                                "Or, continue in mobile web"
                              )
                            )
                          ),
                          d.createElement(je, {
                            meterCount: null == t ? void 0 : t.postIds.length,
                            optimizelyFeatureString: a,
                            postId: n.id,
                            enablePasswords: i,
                          }),
                          d.createElement(
                            T.W,
                            {
                              featureString: a,
                              target: "sign-in-copy",
                              tag: "span",
                            },
                            "Already have an account?",
                            " "
                          ),
                          d.createElement(
                            T.W,
                            {
                              featureString: a,
                              target: "sign-in-link",
                              tag: "span",
                            },
                            d.createElement(
                              M.R9,
                              {
                                linkStyle: "OBVIOUS",
                                operation: "login",
                                post: n,
                                susiEntry: Be,
                              },
                              "Sign in"
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          );
        },
        Fe = (0, m.Ps)(Me(), M.qU),
        He = (0, m.Ps)(Ue()),
        We = n(46829);
      function Ge() {
        var e = i()([
          "\n  mutation AddCollaboratorMutation($postId: ID!) {\n    addCollaborator(postId: $postId)\n  }\n",
        ]);
        return (
          (Ge = function () {
            return e;
          }),
          e
        );
      }
      function Ve() {
        var e = i()([
          "\n  fragment AddCollaborator_post on Post {\n    isPublished\n    id\n  }\n",
        ]);
        return (
          (Ve = function () {
            return e;
          }),
          e
        );
      }
      var ze = (0, m.Ps)(Ve()),
        $e = (0, m.Ps)(Ge()),
        Ye = n(47578),
        qe = n(30570),
        Ke = n(42963);
      function Qe() {
        var e = i()([
          "\n  fragment MaybeRedirectToEditor_post on Post {\n    id\n    isPublished\n    collection {\n      id\n      viewerEdge {\n        id\n        canEditOwnPosts\n        canEditPosts\n        isEditor\n      }\n    }\n    creator {\n      id\n    }\n  }\n",
        ]);
        return (
          (Qe = function () {
            return e;
          }),
          e
        );
      }
      var Xe = function (e) {
          var t = e.children,
            n = e.post,
            r = (0, V.v9)(function (e) {
              return e.config.authDomain;
            }),
            i = (0, L.Hk)().value,
            o = n.collection,
            a = n.creator && i && n.creator.id === i.id;
          return !n.isPublished &&
            ((!o && a) ||
              (a && null != o && o.viewerEdge.canEditOwnPosts) ||
              (null != o && o.viewerEdge.isEditor) ||
              (null != o && o.viewerEdge.canEditPosts))
            ? d.createElement(Ke.l, { to: (0, Y.d0A)(r, n.id) })
            : d.createElement(d.Fragment, null, t);
        },
        Je = (0, m.Ps)(Qe()),
        Ze = n(66371),
        et = n(55253),
        tt = n(70405),
        nt = n(319),
        rt = n.n(nt),
        it = n(82492),
        ot = n.n(it),
        at = n(90038),
        lt = n(22744);
      function ct() {
        var e = i()([
          "\n  fragment PostJsonLd_post on Post {\n    id\n    title\n    seoTitle\n    mediumUrl\n    creator {\n      name\n      username\n      ...userUrl_user\n    }\n    collection {\n      id\n      name\n      domain\n      slug\n      logo {\n        id\n        originalWidth\n        originalHeight\n      }\n    }\n    previewImage {\n      id\n      focusPercentX\n      focusPercentY\n      originalWidth\n      originalHeight\n    }\n    isLocked\n    firstPublishedAt\n    updatedAt\n    tags {\n      displayTitle\n    }\n    sequence {\n      slug\n    }\n    lockedSource\n    layerCake\n    isShortform\n    shortformType\n    structuredData\n    ...getTitleForPost_post\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (ct = function () {
            return e;
          }),
          e
        );
      }
      function st(e, t) {
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
      function ut(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? st(Object(n), !0).forEach(function (t) {
                c()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : st(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function mt(e) {
        var t = e.id,
          n = e.originalWidth,
          r = e.originalHeight;
        if (!t || !n || !r) return null;
        var i = Math.min(r, 60),
          o = i / r,
          a = Math.floor(n * o);
        return dt({
          width: a,
          height: i,
          url: (0, at.W6)({
            miroId: t,
            width: a,
            freezeGifs: !0,
            strategy: at._S.Resample,
          }),
        });
      }
      function dt(e) {
        return ut({ "@type": "ImageObject" }, e);
      }
      function pt(e, t) {
        return "".concat(e, ":").concat(t);
      }
      var gt = (0, p.$j)(function (e) {
          var t = e.config,
            n = t.productName,
            r = t.defaultImages,
            i = t.collectionStructuredData,
            o = e.navigation;
          return {
            currentLocation: o.currentLocation,
            host: o.host,
            productName: n,
            defaultImages: r,
            collectionStructuredData: i,
          };
        })(function (e) {
          var t = e.currentLocation,
            n = e.host,
            r = e.post,
            i = e.postDescription,
            o = e.productName,
            a = e.defaultImages,
            l = e.collectionStructuredData,
            c = r.collection,
            s = r.creator,
            u = r.id,
            m = r.mediumUrl,
            p = r.isLocked,
            g = r.previewImage,
            f = r.firstPublishedAt,
            h = r.updatedAt,
            E = r.tags,
            y = r.sequence,
            b = r.lockedSource,
            x = r.layerCake,
            S = r.structuredData,
            w = (0, lt._t)(r, o),
            P = {
              id: a.postLogo.imageId,
              originalWidth: a.postLogo.width,
              originalHeight: a.postLogo.height,
            },
            I = {
              id: a.orgLogo.imageId,
              originalWidth: a.orgLogo.width,
              originalHeight: a.orgLogo.height,
            },
            O = c
              ? {
                  "@type": "Organization",
                  name: c.name,
                  url: c.domain || (0, $.l1)(n, (0, Y.WGd)(c, t)),
                  logo: (function (e) {
                    if (!e || !e.logo || !e.logo.id) return mt(I);
                    var t = mt(e.logo);
                    return t && 60 === t.height && t.width <= 600 ? t : mt(I);
                  })(c),
                }
              : {
                  "@type": "Organization",
                  name: o,
                  url: (0, $.l1)(n, "/"),
                  logo: mt(I),
                };
          c && l && l[c.id] && ot()(O, l[c.id].data);
          var _ = [pt("Lite", "true")];
          E &&
            E.forEach(function (e) {
              e.displayTitle && _.push(pt("Tag", e.displayTitle));
            }),
            c && c.slug && _.push(pt("Publication", c.slug)),
            _.push(pt("Elevated", (!!y).toString())),
            y && y.slug && _.push(pt("Sequence", y.slug)),
            b && _.push(pt("LockedPostSource", b)),
            null != x && _.push(pt("LayerCake", x.toString()));
          var A = i || "",
            k = p
              ? {
                  isAccessibleForFree: "False",
                  hasPart: {
                    "@type": "WebPageElement",
                    isAccessibleForFree: "False",
                    cssSelector: ".meteredContent",
                  },
                }
              : {},
            D = { "@context": "http://schema.org" },
            T = ut(
              {
                "@type": "NewsArticle",
                image:
                  g && g.id
                    ? (function (e) {
                        var t = e.id,
                          n = e.originalWidth,
                          r = e.originalHeight,
                          i = e.focusPercentX,
                          o = e.focusPercentY;
                        if (!t) return null;
                        var a = 1200,
                          l = (0, at.vz)({
                            miroId: t,
                            aspectRatio: 16 / 9,
                            croppedWidth: a,
                            originalWidth: n,
                            originalHeight: r,
                            focusPercentX: i,
                            focusPercentY: o,
                          }),
                          c = (0, at.vz)({
                            miroId: t,
                            aspectRatio: 4 / 3,
                            croppedWidth: a,
                            originalWidth: n,
                            originalHeight: r,
                            focusPercentX: i,
                            focusPercentY: o,
                          }),
                          s = (0, at.vz)({
                            miroId: t,
                            aspectRatio: 1,
                            croppedWidth: a,
                            originalWidth: n,
                            originalHeight: r,
                            focusPercentX: i,
                            focusPercentY: o,
                          }),
                          u = new Set([l, c, s]);
                        return Array.from(u);
                      })(g)
                    : dt({
                        url: (0, at.W6)({
                          miroId: P.id,
                          width: P.originalWidth,
                        }),
                        height: P.originalHeight,
                        width: P.originalWidth,
                      }),
                url: m,
                dateCreated: f && new Date(f).toISOString(),
                datePublished: f && new Date(f).toISOString(),
                dateModified: h && new Date(h).toISOString(),
                headline: w,
                name: w,
                description: A,
                identifier: u,
                keywords: _.length ? _ : null,
                author:
                  s && s.name && s.username
                    ? {
                        "@type": "Person",
                        name: s.name || s.username,
                        url: (0, Y.AWr)(s, n),
                      }
                    : null,
                creator: s && [s.name],
                publisher: O,
                mainEntityOfPage: m,
              },
              k
            ),
            C = ut(ut({}, D), T);
          if (S && S.length > 0)
            try {
              var R = JSON.parse(S);
              if (
                R &&
                null != R &&
                R["@graph"] &&
                (null == R ? void 0 : R["@graph"].length) > 0
              ) {
                var L = ((null == R ? void 0 : R["@graph"]) || []).filter(
                  function (e) {
                    return (
                      (null == e ? void 0 : e["@type"]) &&
                      "NewsArticle" !== (null == e ? void 0 : e["@type"])
                    );
                  }
                );
                L &&
                  L.length > 0 &&
                  (C = ut(ut({}, D), {}, { "@graph": [T].concat(rt()(L)) }));
              }
            } catch (e) {}
          return d.createElement(
            tt.q,
            null,
            d.createElement(
              "script",
              { type: "application/ld+json" },
              v()(C, { isJSON: !0 })
            )
          );
        }),
        ft = (0, m.Ps)(ct(), lt.bq, Y.$mN),
        vt = n(27390),
        ht = n(71794);
      function Et() {
        var e = i()([
          "\n  fragment PostMetadata_post on Post {\n    id\n    socialTitle\n    socialDek\n    noIndex\n    curationStatus\n    canonicalUrl\n    mediumUrl\n    metaDescription\n    latestPublishedAt\n    visibility\n    isLimitedState\n    readingTime\n    creator {\n      name\n      twitterScreenName\n      ...userUrl_user\n    }\n    collection {\n      ampEnabled\n      twitterUsername\n      facebookPageId\n    }\n    previewContent {\n      subtitle\n    }\n    previewImage {\n      id\n      focusPercentX\n      focusPercentY\n      originalHeight\n      originalWidth\n    }\n    isShortform\n    noIndex\n    curationStatus\n    ...PostJsonLd_post\n    ...postMetaDescription_post\n    ...shortformPostMetaDescription_post\n    ...shouldIndexPost_post\n    ...shortformPostTitle_post\n    ...getTitleDetails_post\n    ...getTitleForPost_post\n  }\n  ",
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
          (Et = function () {
            return e;
          }),
          e
        );
      }
      function yt(e, t) {
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
      function bt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? yt(Object(n), !0).forEach(function (t) {
                c()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : yt(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var xt = (0, p.$j)(function (e) {
          return {
            authDomain: e.config.authDomain,
            host: e.navigation.host,
            productName: e.config.productName,
          };
        })(function (e) {
          var t,
            n,
            r = e.isAmp,
            i = e.host,
            o = e.authDomain,
            a = e.productName,
            l = e.post,
            c = l.canonicalUrl,
            s = l.collection,
            u = l.creator,
            m = l.id,
            p = l.latestPublishedAt,
            g = l.mediumUrl,
            f = l.previewContent,
            v = l.socialTitle,
            h = l.socialDek,
            E = l.visibility,
            y = l.isShortform,
            b = s && s.ampEnabled,
            x = u && u.name,
            S = (0, lt.yB)(l),
            w = l.title || "",
            P = S.latestTitle || w;
          if (y) {
            var I = bt(bt({}, l), {}, { title: P });
            (t = (0, lt.oS)(I, a, S.hasTitleGraf).trim()),
              (n = (0, ht.OO)(l, S.hasTitleGraf));
          } else (t = (0, lt._t)(l, a, S, !0).trim()), (n = (0, ht.j7)(l));
          var O,
            _,
            A = h || (f && f.subtitle) || n;
          if (l && l.previewImage && l.previewImage.id && !l.isLimitedState) {
            var k = l.previewImage;
            O = (0, at.vz)({
              miroId: k.id,
              aspectRatio: 1.9,
              croppedWidth: k.originalWidth
                ? Math.min(k.originalWidth, 1200)
                : 1200,
              originalWidth: k.originalWidth,
              originalHeight: k.originalHeight,
              focusPercentX: k.focusPercentX,
              focusPercentY: k.focusPercentY,
            });
          } else if (l.isLimitedState) {
            var D = {
              id: "1*3SjgcTt7wCYYS10ff6-0JQ.png",
              originalWidth: 748,
              originalHeight: 390,
              focusPercentX: 50,
              focusPercentY: 40,
            };
            O = (0, at.vz)({
              miroId: D.id,
              aspectRatio: 1.9,
              croppedWidth: D.originalWidth
                ? Math.min(D.originalWidth, 1200)
                : 1200,
              originalWidth: D.originalWidth,
              originalHeight: D.originalHeight,
              focusPercentX: D.focusPercentX,
              focusPercentY: D.focusPercentY,
            });
          }
          u && u.username && (_ = (0, Y.AWr)(u, o));
          var T = (0, Y.CK_)(m),
            C = !(0, lt.c_)(l),
            R = p && new Date(p).toISOString(),
            L = (0, vt.Vd)(l.readingTime || 0),
            U = u && u.twitterScreenName,
            M = (s && s.twitterUsername) || "Medium",
            B = s && s.facebookPageId,
            j = v || w || P;
          l.isLimitedState && (j = "");
          var N = l.isLimitedState ? "" : A,
            F = d.useMemo(
              function () {
                var e;
                return d.createElement(
                  tt.q,
                  { htmlAttributes: r ? { amp: void 0 } : {} },
                  d.createElement("meta", {
                    property: "og:type",
                    content: "article",
                  }),
                  R &&
                    d.createElement("meta", {
                      property: "article:published_time",
                      content: R,
                    }),
                  b && !r
                    ? d.createElement("link", {
                        rel: "amphtml",
                        href: (0, Y.VcI)(i, m),
                      })
                    : null,
                  d.createElement("title", null, t),
                  d.createElement("meta", { name: "title", content: t }),
                  d.createElement("meta", { property: "og:title", content: j }),
                  d.createElement("meta", {
                    property: "twitter:title",
                    content: j,
                  }),
                  B &&
                    d.createElement("meta", {
                      property: "fb:pages",
                      content: B,
                    }),
                  d.createElement("meta", {
                    name: "twitter:site",
                    content: "@".concat(M),
                  }),
                  d.createElement("meta", {
                    name: "twitter:app:url:iphone",
                    content: T,
                  }),
                  d.createElement("meta", {
                    property: "al:android:url",
                    content: T,
                  }),
                  d.createElement("meta", {
                    property: "al:ios:url",
                    content: T,
                  }),
                  d.createElement("meta", {
                    property: "al:android:app_name",
                    content: "Medium",
                  }),
                  n &&
                    d.createElement("meta", {
                      name: "description",
                      content: n,
                    }),
                  A &&
                    d.createElement("meta", {
                      property: "og:description",
                      content: N,
                    }),
                  A &&
                    d.createElement("meta", {
                      property: "twitter:description",
                      content: N,
                    }),
                  d.createElement("meta", {
                    property: "og:url",
                    content: null != g ? g : void 0,
                  }),
                  d.createElement("meta", {
                    property: "al:web:url",
                    content: null != g ? g : void 0,
                  }),
                  O &&
                    d.createElement("meta", {
                      property: "og:image",
                      content: O,
                    }),
                  O &&
                    d.createElement("meta", {
                      name: "twitter:image:src",
                      content: O,
                    }),
                  d.createElement("meta", {
                    name: "twitter:card",
                    content: O ? "summary_large_image" : "summary",
                  }),
                  _ &&
                    d.createElement("meta", {
                      property: "article:author",
                      content: _,
                    }),
                  _ && d.createElement("link", { rel: "author", href: _ }),
                  U &&
                    d.createElement("meta", {
                      name: "twitter:creator",
                      content: "@".concat(U),
                    }),
                  x && d.createElement("meta", { name: "author", content: x }),
                  d.createElement("link", {
                    rel: "canonical",
                    href: null !== (e = c || g) && void 0 !== e ? e : void 0,
                  }),
                  d.createElement("link", {
                    rel: "alternate",
                    href: (0, Y.zix)((0, Y.o2w)("medium.com", l.id)),
                  }),
                  d.createElement("meta", {
                    name: "robots",
                    content: "".concat(
                      C ? "noindex" : "index",
                      ",follow,max-image-preview:large"
                    ),
                  }),
                  d.createElement("meta", {
                    name: "referrer",
                    content: "UNLISTED" !== E ? "unsafe-url" : "origin",
                  }),
                  r
                    ? null
                    : d.createElement("meta", {
                        name: "twitter:label1",
                        content: "Reading time",
                      }),
                  r
                    ? null
                    : d.createElement("meta", {
                        name: "twitter:data1",
                        content: "".concat(L, " min read"),
                      }),
                  d.createElement("meta", {
                    name: "parsely-post-id",
                    content: m,
                  })
                );
              },
              [r, t, c, g, O, b, m, v, n, _, x, U, T, C, R]
            );
          return d.createElement(
            d.Fragment,
            null,
            F,
            d.createElement(gt, { post: l, postDescription: n })
          );
        }),
        St = (0, m.Ps)(
          Et(),
          ft,
          ht.iI,
          ht.m3,
          lt.HF,
          lt.Pz,
          lt.dm,
          lt.bq,
          Y.$mN
        ),
        wt = n(51607),
        Pt = n(72955),
        It = n(14391),
        Ot = n(76579);
      function _t() {
        var e = i()([
          "\n  fragment PostPublishedDialog_prerequisite_post on Post {\n    id\n    creator {\n      id\n    }\n    collection {\n      id\n      viewerEdge {\n        id\n        isEditor\n      }\n    }\n    viewerEdge {\n      id\n      creatorPartnerProgramEnrollmentStatus\n    }\n  }\n",
        ]);
        return (
          (_t = function () {
            return e;
          }),
          e
        );
      }
      function At() {
        var e = i()([
          "\n  query PostPublishedDialogQuery($postId: ID!) {\n    post(id: $postId) {\n      id\n      ...PostPublishedDialog_post\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (At = function () {
            return e;
          }),
          e
        );
      }
      function kt() {
        var e = i()([
          "\n  fragment PostPublishedDialog_post on Post {\n    id\n    inResponseToPostResult {\n      __typename\n    }\n    visibility\n    curationEligibleAt\n    mediumUrl\n    viewerEdge {\n      id\n      creatorPartnerProgramEnrollmentStatus\n      shareKey\n    }\n    ...ShareButton_post\n    isNewsletter\n    isPublishToEmail\n    creator {\n      id\n    }\n    isMarkedPaywallOnly\n  }\n  ",
          "\n",
        ]);
        return (
          (kt = function () {
            return e;
          }),
          e
        );
      }
      var Dt = function () {
        return d.createElement(
          A.xu,
          null,
          d.createElement(
            A.rU,
            { inline: !0, linkStyle: "OBVIOUS", href: (0, Y.Scj)() },
            "Learn more"
          ),
          " ",
          "about what happens to your post when you publish."
        );
      };
      var Tt,
        Ct = (0, m.Ps)(kt(), wt.M),
        Rt = (0, m.Ps)(At(), Ct),
        Lt = function (e) {
          var t = e.url,
            n = e.label;
          return d.createElement(Ot.b, { url: t }, function (e) {
            return d.createElement(
              A.xu,
              { marginBottom: "8px" },
              d.createElement(
                A.zx,
                {
                  buttonStyle: "SOCIAL",
                  size: "REGULAR",
                  width: "212px",
                  onClick: function (e) {
                    return e;
                  },
                },
                d.createElement(
                  A.xu,
                  {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  e ? "Copied!" : n
                )
              )
            );
          });
        },
        Ut = function (e) {
          var t = e.post,
            n = e.isUnlisted,
            r = e.postPath;
          return d.createElement(
            A.xu,
            { display: "flex", flexDirection: "column", alignItems: "center" },
            d.createElement(
              j.F,
              { color: "DARKER", scale: "L" },
              (function (e) {
                return e
                  ? "Share your story outside Medium."
                  : "Share your story with the world.";
              })(n)
            ),
            d.createElement(
              A.xu,
              { marginTop: "20px" },
              !n &&
                d.createElement(
                  d.Fragment,
                  null,
                  d.createElement(
                    A.xu,
                    { marginBottom: "8px" },
                    d.createElement(wt.T, {
                      socialPlatform: "FACEBOOK",
                      buttonStyle: "BUTTON_BRANDED",
                      post: t,
                    })
                  ),
                  d.createElement(
                    A.xu,
                    { marginBottom: "8px" },
                    d.createElement(wt.T, {
                      socialPlatform: "TWITTER",
                      buttonStyle: "BUTTON_BRANDED",
                      post: t,
                    })
                  ),
                  d.createElement(
                    A.xu,
                    { marginBottom: "8px" },
                    d.createElement(wt.T, {
                      socialPlatform: "LINKEDIN",
                      buttonStyle: "BUTTON_BRANDED",
                      post: t,
                    })
                  )
                ),
              d.createElement(Lt, { url: r, label: "Copy story link" })
            )
          );
        },
        Mt = function (e) {
          var t = e.viewerId,
            n = e.isVisible,
            r = e.hide,
            i = e.post,
            o = i.id,
            a = i.visibility,
            l = i.curationEligibleAt,
            c = i.mediumUrl,
            s = i.viewerEdge,
            u = s.shareKey,
            m = s.creatorPartnerProgramEnrollmentStatus,
            p = i.isNewsletter,
            g = i.isPublishToEmail,
            f = i.isMarkedPaywallOnly,
            v = i.creator,
            h = "UNLISTED" === a,
            E = !!l,
            y = m === It.iR.ENROLLED,
            b = (0, V.v9)(function (e) {
              return e.config.productName;
            }),
            x = "Your story is published!";
          return (
            g && t === (null == v ? void 0 : v.id)
              ? (x = "Your story has been published and sent!")
              : p && (x = "Your newsletter is on its way!"),
            d.createElement(
              A.Vq,
              { isVisible: n, hide: r, withAnimation: !0, withCloseButton: !1 },
              d.createElement(
                A.xu,
                {
                  background: k.ix,
                  borderRadius: "4px",
                  boxShadow: "0 2px 10px ".concat((0, k.Uy)(0.15)),
                  position: "relative",
                  width: "900px",
                  textAlign: "center",
                  md: { width: "600px" },
                  sm: { width: "calc(100vw - 128px)" },
                },
                d.createElement(
                  A.xu,
                  {
                    padding: "56px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "485px",
                  },
                  d.createElement(
                    A.xu,
                    {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    d.createElement(j.F1, { scale: "L", tag: "h3" }, x),
                    d.createElement(
                      A.xu,
                      { maxWidth: "520px", marginTop: "20px" },
                      d.createElement(
                        j.F,
                        { color: "DARKER", scale: "L" },
                        (function (e, t, n, r, i, o) {
                          return r
                            ? (function (e, t) {
                                return e
                                  ? "Your email will be delivered to your newsletter subscribers and editors, but will not appear publicly on ".concat(
                                      t,
                                      "."
                                    )
                                  : d.createElement(
                                      d.Fragment,
                                      null,
                                      "Your subscribers and editors should have it soon. It’ll also show up on ",
                                      t,
                                      " readers’ homepages and Digest emails depending on their interests.",
                                      " ",
                                      d.createElement(
                                        A.rU,
                                        {
                                          inline: !0,
                                          linkStyle: "OBVIOUS",
                                          href: "https://help.medium.com/hc/en-us/articles/115004682167-How-to-use-Newsletters",
                                        },
                                        "Learn more"
                                      )
                                    );
                              })(e, o)
                            : e
                            ? "Your unlisted story will not appear publicly on ".concat(
                                o,
                                ", but you can still share it."
                              )
                            : i
                            ? "You've chosen this story to be member-only. Anyone can see a short preview but only paying members can read the full story."
                            : n
                            ? t
                              ? d.createElement(
                                  d.Fragment,
                                  null,
                                  "As a member of the Partner Program, you’ve chosen to make this story eligible to earn money. It will be part of ",
                                  o,
                                  "’s metered paywall.",
                                  d.createElement(Dt, null)
                                )
                              : d.createElement(
                                  d.Fragment,
                                  null,
                                  "You did not choose to make this story eligible to earn money. It will not be part of",
                                  " ",
                                  o,
                                  "’s metered paywall.",
                                  d.createElement(Dt, null)
                                )
                            : d.createElement(
                                d.Fragment,
                                null,
                                "This story isn’t currently eligible to earn money. To make this story eligible, join the",
                                " ",
                                o,
                                " Partner Program.",
                                " ",
                                d.createElement(
                                  A.rU,
                                  {
                                    inline: !0,
                                    linkStyle: "OBVIOUS",
                                    href: "https://medium.com/earn",
                                  },
                                  "Learn more."
                                )
                              );
                        })(h, E, y, p, null != f && f, b)
                      )
                    ),
                    d.createElement(
                      A.xu,
                      { paddingTop: "20px" },
                      E &&
                        !h &&
                        c &&
                        u &&
                        d.createElement(Lt, {
                          url: (0, $.Rk)((0, Y.jVf)(i), { sk: u }),
                          label: "Copy Friend Link",
                        })
                    ),
                    d.createElement(A.xu, {
                      borderBottom: "BASE_LIGHTER",
                      width: "100%",
                      margin: "20px 0",
                    })
                  ),
                  o &&
                    c &&
                    d.createElement(Ut, {
                      post: i,
                      isUnlisted: h,
                      postPath: (0, Y.jVf)(i),
                    })
                ),
                d.createElement(A.PZ, { onClick: r, size: "LARGE" })
              )
            )
          );
        };
      !(function (e) {
        (e.initial = "initial"), (e.repub = "repub");
      })(Tt || (Tt = {}));
      var Bt = function (e) {
          var t = e.post,
            n = d.useState(!1),
            r = u()(n, 2),
            i = r[0],
            o = r[1],
            a = d.useCallback(
              function () {
                return o(!1);
              },
              [o]
            ),
            l = (0, p.I0)(),
            c = (0, he.Wd)("postPublishedType");
          d.useEffect(
            function () {
              switch (c) {
                case Tt.initial:
                  o(!0);
                  break;
                case Tt.repub:
                  l(
                    (0, G.Dx)({
                      duration: 3e3,
                      message: "Your changes have been published.",
                    })
                  );
              }
            },
            [c]
          );
          var s = d.useState(!1),
            m = u()(s, 2),
            g = m[0],
            f = m[1];
          return g
            ? d.createElement(L.I8, null, function (e) {
                return null != e &&
                  e.id &&
                  (e.id === (t.creator && t.creator.id) ||
                    (t.collection && t.collection.viewerEdge.isEditor))
                  ? d.createElement(
                      Z.AE,
                      { ssr: !1, query: Rt, variables: { postId: t.id } },
                      function (t) {
                        var n = t.loading,
                          r = t.data,
                          o = (r = void 0 === r ? {} : r).post;
                        return n || !o || o.inResponseToPostResult
                          ? null
                          : d.createElement(Mt, {
                              isVisible: i,
                              hide: a,
                              post: o,
                              viewerId: e.id,
                            });
                      }
                    )
                  : null;
              })
            : (Pt.V6.on("load", function () {
                return f(!0);
              }),
              null);
        },
        jt = (0, m.Ps)(_t()),
        Nt = n(49925),
        Ft = n(10103),
        Ht = n(59877);
      function Wt() {
        var e = i()([
          "\n  fragment PostScreenThemeProvider_post on Post {\n    collection {\n      ...CustomThemeProvider_publisher\n      ...auroraHooks_publisher\n    }\n    creator {\n      ...CustomThemeProvider_publisher\n      ...auroraHooks_publisher\n    }\n    customStyleSheet {\n      ...CustomThemeProvider_customStyleSheet\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (Wt = function () {
            return e;
          }),
          e
        );
      }
      var Gt = function (e) {
          var t = e.children,
            n = e.post,
            r = n.collection || n.creator,
            i = (0, Nt.GT)(r),
            o = n.customStyleSheet;
          return i
            ? d.createElement(Ft.G8, { customStyleSheet: o, publisher: r }, t)
            : d.createElement(
                Ft.G8,
                { customStyleSheet: null, publisher: r },
                d.createElement(Ht.r, null, t)
              );
        },
        Vt = (0, m.Ps)(Wt(), Ft.Kc, Ft.Ps, Nt.C5),
        zt = n(62182),
        $t = n(50493),
        Yt = n(15789),
        qt = n(9482),
        Kt = n(40501),
        Qt = n(50188),
        Xt = n(82712),
        Jt = n(55127),
        Zt = n(56365),
        en = n(28309),
        tn = function (e) {
          var t = e.children,
            n = e.rule,
            r = (0, en.Iq)(),
            i = n ? r(n) : "";
          return i
            ? d.createElement("div", { className: i }, t)
            : d.createElement(d.Fragment, null, t);
        },
        nn = n(85489),
        rn = n(41882);
      function on() {
        return (on =
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
      var an = d.createElement("path", { fill: "#fff", d: "M0 0h49v57H0z" }),
        ln = d.createElement("path", {
          d: "M45.95 17.53v-.04l-.05-1.55a5.32 5.32 0 0 0-5.04-5.17c-5.8-.32-10.3-2.2-14.13-5.89l-.03-.03a3.26 3.26 0 0 0-4.4 0l-.03.03c-3.84 3.7-8.33 5.57-14.13 5.89-2.79.15-5 2.42-5.04 5.18l-.05 1.54v.1c-.11 5.84-.25 13.12 2.21 19.73 1.36 3.63 3.41 6.79 6.1 9.38 3.07 2.96 7.09 5.3 11.94 6.98a3.74 3.74 0 0 0 2.4 0c4.85-1.68 8.86-4.03 11.93-6.98 2.69-2.6 4.74-5.76 6.1-9.39 2.47-6.63 2.33-13.92 2.22-19.78zm-5 18.77c-2.6 6.96-7.9 11.74-16.23 14.62a.67.67 0 0 1-.45 0c-8.32-2.87-13.63-7.65-16.23-14.61-2.27-6.1-2.14-12.78-2.03-18.67v-.03c.03-.5.04-1.04.05-1.62.02-1.22 1-2.23 2.24-2.3 3.29-.18 6.17-.81 8.83-1.92 2.64-1.1 5-2.67 7.19-4.77.1-.1.25-.1.36 0a23.11 23.11 0 0 0 7.2 4.77 26.27 26.27 0 0 0 8.82 1.92 2.36 2.36 0 0 1 2.24 2.3c0 .58.02 1.12.05 1.62.11 5.9.24 12.59-2.04 18.69z",
          fill: "#757575",
        }),
        cn = d.createElement("path", {
          d: "M24.5 17.76c-7.11 0-12.9 5.4-12.9 12.04 0 6.64 5.79 12.04 12.9 12.04s12.9-5.4 12.9-12.04c0-6.64-5.79-12.04-12.9-12.04zm0 21.25c-5.44 0-9.86-4.13-9.86-9.2 0-5.08 4.42-9.21 9.86-9.21 5.44 0 9.86 4.13 9.86 9.2 0 5.08-4.42 9.2-9.86 9.2z",
          fill: "#757575",
        }),
        sn = d.createElement("path", {
          d: "M28.08 25.1l-5.64 6.12-1.53-1.66c-.56-.6-1.46-.6-2.02 0-.55.6-.55 1.59 0 2.2l2.54 2.75c.28.3.65.45 1.01.45.37 0 .73-.15 1.01-.45l6.65-7.22c.55-.6.55-1.59 0-2.2-.56-.6-1.47-.6-2.02 0z",
          fill: "#757575",
        });
      const un = function (e) {
        return d.createElement(
          "svg",
          on({ width: 49, height: 57, viewBox: "0 0 49 57", fill: "none" }, e),
          an,
          ln,
          cn,
          sn
        );
      };
      var mn = (0, p.$j)()(function (e) {
        var t = e.dispatch,
          n = e.isVisible,
          r = e.hide,
          i = "limitedStateInterstitialDialogPopover";
        return d.createElement(
          A.Vq,
          {
            isVisible: n,
            hide: r,
            withCloseButton: !1,
            customBackgroundColor: "rgba(255, 255, 255, 0.94)",
          },
          d.createElement(
            A.xu,
            { display: "flex", justifyContent: "center", paddingTop: "100px" },
            d.createElement(
              A.xu,
              {
                height: "550px",
                width: "900px",
                background: k.ix,
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: "0 2px 10px ".concat((0, k.Uy)(0.15)),
                paddingBottom: "14px",
                md: { width: "600px", height: "auto", padding: "14px 8px" },
                sm: { width: "95vw !important", padding: "14px 8px" },
              },
              d.createElement(
                A.xu,
                {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                },
                d.createElement(
                  A.xu,
                  { paddingBottom: "24px" },
                  d.createElement(un, null)
                ),
                d.createElement(
                  A.xu,
                  {
                    paddingBottom: "24px",
                    paddingRight: "24px",
                    paddingLeft: "24px",
                  },
                  d.createElement(
                    j.X6,
                    { scale: "L" },
                    "The following content was reported as a potential violation of Medium’s rules and is under investigation."
                  )
                ),
                d.createElement(
                  A.xu,
                  { padding: "0 0 24px 0" },
                  d.createElement(
                    A.zx,
                    {
                      buttonStyle: "BRAND",
                      size: "REGULAR",
                      onClick: function () {
                        r(),
                          t(
                            (0, G.Dx)({
                              duration: "FOREVER",
                              message: "",
                              toastStyle: "LIMITED_STATE_BANNER",
                            })
                          );
                      },
                    },
                    "I understand and want to proceed anyway"
                  ),
                  d.createElement(A.Bn, null, function (e) {
                    var t = e.isVisible,
                      n = e.toggle,
                      r = e.hide;
                    return d.createElement(
                      A.J2,
                      {
                        ariaId: i,
                        isVisible: t,
                        hide: r,
                        display: "block",
                        customZIndex: 800,
                        popoverRenderFn: function () {
                          return d.createElement(
                            A.xu,
                            { padding: "15px 20px", width: "400px" },
                            d.createElement(
                              j.F,
                              { scale: "S" },
                              "Anyone can publish on Medium, provided the content adheres to Medium’s rules and policies. When Medium is made aware of potential violations, the content is manually evaluated and appropriate action taken. Some features may be disabled while the content is under review."
                            )
                          );
                        },
                        placement: "top",
                        targetDistance: 15,
                      },
                      d.createElement(
                        A.xu,
                        { paddingTop: "10px" },
                        d.createElement(
                          A.rU,
                          {
                            ariaControls: i,
                            ariaExpanded: t ? "true" : "false",
                            onClick: n,
                          },
                          d.createElement(
                            "u",
                            null,
                            d.createElement(
                              j.F,
                              { scale: "S" },
                              "Why am I seeing this?"
                            )
                          )
                        )
                      )
                    );
                  })
                )
              ),
              d.createElement(
                A.xu,
                { display: "flex", justifyContent: "center" },
                d.createElement(
                  j.F,
                  { scale: "M" },
                  "View our",
                  " ",
                  d.createElement(
                    A.rU,
                    {
                      href: "https://medium.com/policy/medium-rules-30e5502c4eb4",
                      linkStyle: "OBVIOUS",
                      inline: !0,
                    },
                    "Rules,"
                  ),
                  " ",
                  d.createElement(
                    A.rU,
                    {
                      href: "https://medium.com/policy/medium-terms-of-service-9db0094a1e0f",
                      linkStyle: "OBVIOUS",
                      inline: !0,
                    },
                    "Terms of Service"
                  ),
                  " ",
                  "&",
                  " ",
                  d.createElement(
                    A.rU,
                    {
                      href: "https://medium.com/policy/medium-partner-program-terms-fcfe9cf777b8",
                      linkStyle: "OBVIOUS",
                      inline: !0,
                    },
                    "Partner Program Terms"
                  )
                )
              )
            )
          )
        );
      });
      function dn() {
        var e = i()([
          "\n  fragment LimitedStateInterstitial_post on Post {\n    creator {\n      id\n    }\n    isLimitedState\n  }\n",
        ]);
        return (
          (dn = function () {
            return e;
          }),
          e
        );
      }
      var pn = function (e) {
        return function () {
          return { filter: e ? "blur(10px)" : "blur(0)" };
        };
      };
      function gn(e) {
        var t = e.post,
          n = t.creator,
          r = t.isLimitedState,
          i = e.children,
          o = (0, L.Hk)().value,
          a = null == o ? void 0 : o.id,
          l = (0, en.Iq)(),
          c = d.useState(!1),
          s = u()(c, 2),
          m = s[0],
          p = s[1];
        return (
          d.useEffect(function () {
            p(!0);
          }, []),
          r && (n && n.id) !== a
            ? d.createElement(A.Bn, { initialVisibility: !0 }, function (e) {
                var t = e.isVisible,
                  n = e.hide;
                return d.createElement(
                  d.Fragment,
                  null,
                  d.createElement("div", { className: l(pn(t)) }, i),
                  m && d.createElement(mn, { isVisible: t, hide: n })
                );
              })
            : i
        );
      }
      var fn = (0, m.Ps)(dn()),
        vn = n(85714),
        hn = function (e) {
          var t = e.children,
            n = e.onClose,
            r = d.useRef(null),
            i = d.useContext(g.u6).updateWatchedBounds;
          return d.createElement(A.Bn, { initialVisibility: !0 }, function (e) {
            var o = e.isVisible,
              a = e.hide;
            return (
              o &&
              d.createElement(
                A.xu,
                {
                  backgroundColor: "BASE_LIGHT",
                  borderBottom: "BASE_LIGHTER",
                  borderTop: "BASE_LIGHTER",
                },
                d.createElement(
                  A.Pm,
                  null,
                  d.createElement(
                    A.xu,
                    {
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: "20px",
                      paddingTop: "20px",
                    },
                    t,
                    d.createElement(A.PZ, {
                      onClick: function () {
                        n && n(), i("byline", r, { type: "header" }), a();
                      },
                      isPositionAbsolute: !1,
                      size: "REGULAR",
                    })
                  )
                )
              )
            );
          });
        },
        En = n(98281),
        yn = n(81591),
        bn = n(69332),
        xn = "alternate_user_top_banner",
        Sn = function (e) {
          var t = e.userSocialLogins,
            n = (0, Re.j)().openModal;
          return t.facebook || t.google || t.twitter
            ? d.createElement(me, { userSocialLogins: t })
            : d.createElement(
                ae,
                {
                  onSuccess: function () {
                    return n({
                      step: "CHECK_YOUR_INBOX",
                      operation: "login",
                      susiEntry: xn,
                    });
                  },
                  userId: t.userId,
                },
                function (e) {
                  var t = e.handleSubmit;
                  return d.createElement(
                    A.zx,
                    { buttonStyle: "SOCIAL", size: "REGULAR", onClick: t },
                    "Send login link"
                  );
                }
              );
        },
        wn = function () {
          var e = (0, L.Hk)().value,
            t = (0, L.rZ)().viewerId,
            n = (0, p.I0)(),
            r = (0, F.Av)(),
            i = d.useState(!1),
            o = u()(i, 2),
            a = o[0],
            l = o[1],
            c = d.useState("loading"),
            s = u()(c, 2),
            m = s[0],
            g = s[1];
          return (
            d.useEffect(function () {
              n((0, bn.e6)(!0)), l(!0);
            }, []),
            d.useEffect(
              function () {
                "rendered" === m && n((0, yn.T)(!0)),
                  "not_eligible" === m && n((0, bn.e6)(!1));
              },
              [m]
            ),
            d.createElement(
              H.cW,
              { source: { susiEntry: xn } },
              d.createElement(
                xe,
                {
                  postRenderCallback: function (e, n, i) {
                    g(n ? "rendered" : "not_eligible"),
                      n &&
                        (r.event("experiment.eligible", {
                          experimentId: "358323e239a2",
                        }),
                        r.event("alternateUserBanner.viewed", {
                          alternateUserSuggestionAccountType: ve(i),
                          alternateUserSuggestionTargetUserId: i.userId,
                          alternateUserSuggestionSourceUserId: t,
                        }));
                  },
                },
                function (n) {
                  var i,
                    o = n.showSuggestedAccount,
                    l = n.declineSuggestedAccount,
                    c = n.userSocialLogins;
                  return a && o && l && c
                    ? d.createElement(
                        U.N8,
                        null,
                        d.createElement(
                          hn,
                          {
                            onClose: function () {
                              return r.event("alternateUserBanner.dismissed", {
                                alternateUserSuggestionAccountType: ve(c),
                                alternateUserSuggestionTargetUserId: c.userId,
                                alternateUserSuggestionSourceUserId: t,
                              });
                            },
                          },
                          d.createElement(
                            A.xu,
                            {
                              alignItems: "flex-start",
                              display: "flex",
                              flexDirection: "column",
                              sm: { alignItems: "center" },
                            },
                            d.createElement(
                              A.xu,
                              {
                                alignItems: "center",
                                display: "flex",
                                marginBottom: "21px",
                                sm: {
                                  flexDirection: "column",
                                  margin: "0 21px 21px",
                                  textAlign: "center",
                                },
                              },
                              !e &&
                                (null === (i = c.userAvatar) || void 0 === i
                                  ? void 0
                                  : i.imageId) &&
                                d.createElement(
                                  A.xu,
                                  {
                                    display: "flex",
                                    marginRight: "20px",
                                    sm: {
                                      marginBottom: "18px",
                                      marginRight: "0",
                                    },
                                  },
                                  d.createElement(En.Yt, {
                                    scale: "S",
                                    user: c.userAvatar,
                                  })
                                ),
                              d.createElement(
                                T.W,
                                {
                                  featureString: "alternate-user-top-banner",
                                  target: "header",
                                },
                                d.createElement(
                                  j.F,
                                  { color: "DARKER", scale: "M" },
                                  (function (e, t) {
                                    var n = t.isMember,
                                      r = t.redactedEmailAddress;
                                    return d.createElement(
                                      d.Fragment,
                                      null,
                                      e ? "Switch" : "Sign in",
                                      " to your ",
                                      n ? "member " : "",
                                      "account (",
                                      d.createElement("b", null, r),
                                      ") for",
                                      n
                                        ? " unlimited access"
                                        : " your personalized experience",
                                      "."
                                    );
                                  })(e, c)
                                )
                              )
                            ),
                            d.createElement(
                              A.xu,
                              {
                                alignItems: "center",
                                display: "flex",
                                sm: { flexDirection: "column" },
                              },
                              d.createElement(Sn, { userSocialLogins: c }),
                              d.createElement(
                                A.xu,
                                {
                                  margin: "0 12px",
                                  sm: { margin: "24px 0 0" },
                                },
                                d.createElement(pe, {
                                  declineSuggestedAccount: l,
                                  isSocial: !!(
                                    c.facebook ||
                                    c.google ||
                                    c.twitter
                                  ),
                                })
                              )
                            )
                          )
                        )
                      )
                    : d.createElement(d.Fragment, null);
                }
              )
            )
          );
        },
        Pn = n(87757),
        In = n.n(Pn),
        On = n(48926),
        _n = n.n(On),
        An = "signin_confirmation_banner",
        kn = function () {
          var e = (0, F.Av)(),
            t = (0, Re.j)().openModal,
            n = d.useState(!1),
            r = u()(n, 2),
            i = r[0],
            o = r[1],
            a = d.useState(!1),
            l = u()(a, 2),
            c = l[0],
            s = l[1],
            m = d.useState(!0),
            p = u()(m, 2),
            g = p[0],
            f = p[1],
            v = (0, L.Hk)().value,
            h = (0, V.p9)(function (e) {
              return e.session.xsrf;
            }),
            E = (0, he.PM)(),
            y = (0, ge.P7)(E || "").name;
          return (
            d.useEffect(function () {
              return o(!0);
            }, []),
            d.useEffect(
              function () {
                i &&
                  v &&
                  (e.event("experiment.eligible", {
                    experimentId: "b4152480e71c",
                  }),
                  (function () {
                    var e = _n()(
                      In().mark(function e() {
                        var t;
                        return In().wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  (0, re.vA)(null == v ? void 0 : v.id, h)
                                );
                              case 2:
                                (t = e.sent), f(t);
                              case 4:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    );
                    return function () {
                      return e.apply(this, arguments);
                    };
                  })()(),
                  (0, re.oy)(v.id, h));
              },
              [i, v]
            ),
            d.useEffect(
              function () {
                c && e.event("signInConfirmationBanner.viewed", {});
              },
              [c]
            ),
            !i ||
            !v ||
            !y ||
            "login" !== y ||
            !v.createdAt ||
            Date.now() - v.createdAt <= 5 * z.uD ||
            g
              ? null
              : (c || s(!0),
                d.createElement(
                  H.cW,
                  { source: { susiEntry: An }, extendSource: !0 },
                  d.createElement(
                    U.N8,
                    null,
                    d.createElement(
                      hn,
                      {
                        onClose: function () {
                          return e.event(
                            "signInConfirmationBanner.dismissed",
                            {}
                          );
                        },
                      },
                      d.createElement(
                        A.xu,
                        { display: "flex", alignItems: "center" },
                        d.createElement(
                          A.xu,
                          {
                            display: "none",
                            marginRight: "20px",
                            sm: { display: "flex" },
                          },
                          d.createElement(En.Yt, { scale: "S", user: v })
                        ),
                        d.createElement(
                          j.F,
                          { color: "DARKER", scale: "M" },
                          d.createElement(
                            T.W,
                            {
                              featureString: "confirm-sign-in-banner",
                              target: "header",
                              tag: "span",
                            },
                            "Welcome back. You are signed",
                            " ",
                            v.mediumMemberAt
                              ? "into your member account "
                              : "in as ",
                            d.createElement("b", null, v.email),
                            ".",
                            " "
                          ),
                          d.createElement(
                            A.rU,
                            {
                              onClick: function () {
                                e.event(
                                  "signInConfirmationBanner.notYouClicked",
                                  {}
                                ),
                                  t({
                                    operation: "login",
                                    step: "SIGNIN_OPTIONS",
                                    susiEntry: An,
                                  });
                              },
                              linkStyle: "OBVIOUS",
                            },
                            "Not you?"
                          )
                        )
                      )
                    )
                  )
                ))
          );
        },
        Dn = n(93874),
        Tn = n(22091),
        Cn = n(31517),
        Rn = n(172);
      function Ln(e) {
        var t = {
          __html: '<script type="application/json">'.concat(
            v()(e.json, { isJSON: !0 }),
            "</script>"
          ),
        };
        return d.createElement("amp-analytics", {
          id: "medium-analytics",
          dangerouslySetInnerHTML: t,
        });
      }
      function Un() {
        var e = {
          __html: '<script type="application/json">'.concat(
            v()({ vars: { apikey: "medium.com" } }, { isJSON: !0 }),
            "</script>"
          ),
        };
        return d.createElement("amp-analytics", {
          type: "parsely",
          id: "parsely-amp-analytics",
          dangerouslySetInnerHTML: e,
        });
      }
      var Mn = n(30389),
        Bn = n(27140),
        jn = n(65441);
      function Nn() {
        var e = i()([
          "\n  fragment PostScreen_post on Post {\n    id\n    canonicalUrl\n    collection {\n      id\n      domain\n      googleAnalyticsId\n      slug\n      ...CollectionMetabar_collection\n      ...MetaHeader_publisher\n      ...auroraHooks_publisher\n    }\n    # please note that the postMeteringOptions are defined in the postHandler file\n    content(postMeteringOptions: $postMeteringOptions) {\n      isLockedPreviewOnly\n      validatedShareKey\n    }\n    creator {\n      viewerIsUser\n      customStyleSheet {\n        id\n        ...PostSidebar_customStyleSheet\n      }\n      viewerEdge {\n        id\n        isFollowing\n        readPostsCount\n      }\n      ...SuspendedBannerLoader_user\n      ...MetaHeader_publisher\n      ...UserSubdomainFlow_user\n      ...auroraHooks_publisher\n      ...TruncatedPostCard_user\n    }\n    customStyleSheet {\n      id\n      postBody {\n        ...SupportedContainerStyles_styleNode\n      }\n      ...CustomBackgroundWrapper_customStyleSheet\n      ...MetaHeader_customStyleSheet\n      ...PostSidebar_customStyleSheet\n    }\n    firstPublishedAt\n    isLocked\n    isPublished\n    isShortform\n    layerCake\n    primaryTopic {\n      name\n      slug\n    }\n    viewerEdge {\n      id\n      readingList\n    }\n    title\n    isMarkedPaywallOnly\n    ...AddCollaborator_post\n    ...InteractivePostBody_post\n    ...LimitedStateInterstitial_post\n    ...MaybeRedirectToEditor_post\n    ...Metabar_post\n    ...PayWall_post\n    ...PostBodyInserts_post\n    ...PostFooter_post\n    ...PostHeader_post\n    ...PostMetadata_post\n    ...PostPublishedDialog_prerequisite_post\n    ...PostReadTracker_post\n    ...PostScreenThemeProvider_post\n    ...PostScrollTracker_post\n    ...PostSidebar_post\n    ...RegWall_post\n    ...SuspendedBannerLoader_post\n    ...buildBranchViewData_post\n    ...optimizelyData_post\n    ...TableOfContents_post\n  }\n  ",
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
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (Nn = function () {
            return e;
          }),
          e
        );
      }
      function Fn() {
        var e = i()([
          "\n  fragment PostScreen_meteringInfo on MeteringInfo {\n    __typename\n    postIds\n    maxUnlockCount\n    unlocksRemaining\n    ...PostHeader_meteringInfo\n    ...RegWall_meteringInfo\n    ...buildBranchViewData_meteringInfo\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (Fn = function () {
            return e;
          }),
          e
        );
      }
      function Hn(e, t) {
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
      function Wn(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Hn(Object(n), !0).forEach(function (t) {
                c()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Hn(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var Gn = function () {
        return null;
      };
      function Vn(e) {
        var t,
          n,
          r,
          i,
          o,
          a,
          l,
          c,
          s,
          m = e.meteringInfo,
          f = e.post,
          v = f.id,
          h = f.isPublished,
          E = f.isLocked,
          w = f.isShortform,
          P = f.content,
          O = f.collection,
          _ = f.canonicalUrl,
          A = f.isMarkedPaywallOnly,
          k = (0, p.I0)(),
          D = (0, F.Av)(),
          T = (0, he.PM)(),
          R = (0, V.v9)(function (e) {
            return e.config.authDomain;
          }),
          U = (0, V.v9)(function (e) {
            return e.navigation.currentHash;
          }),
          M = (0, V.p9)(function (e) {
            return e.config.isAmp;
          }),
          B = (0, V.v9)(function (e) {
            return e.navigation.referrer;
          }),
          j = (0, Mn.P)(),
          N = j.inAppBrowser,
          H = j.loading,
          W = d.useState(
            f.viewerEdge.readingList === It.sx.READING_LIST_QUEUE ||
              f.viewerEdge.readingList === It.sx.READING_LIST_ARCHIVE
          ),
          G = u()(W, 2),
          z = G[0],
          $ = G[1],
          q = d.useRef(null),
          K = (0, L.Hk)().value;
        M && (K = void 0);
        var Q = !!K,
          Z = O || {},
          te = Z.id,
          ne = Z.slug,
          ie = Z.googleAnalyticsId,
          oe = P || {},
          ae = oe.isLockedPreviewOnly,
          le = oe.validatedShareKey,
          ce = ie ? [ie] : null;
        (0, b.t)({ ids: ce, isAmp: M }),
          (0, Pt.Vj)(q, f),
          (0, Pt.t2)(Q, q, f),
          (function (e) {
            var t = (0, L.Hk)().value,
              n = (0, We.useMutation)($e, { variables: { postId: e.id } }),
              r = u()(n, 2),
              i = r[0],
              o = r[1].called;
            d.useEffect(
              function () {
                e.isPublished || null == t || !t.id || o || i();
              },
              [t]
            );
          })(f);
        var se = (0, Nt.GT)(O || f.creator),
          ue = w && se,
          me = (0, Bn.D)(se),
          de = (0, ge.P7)(T || "").dimension,
          pe =
            !("digest.reader" !== (void 0 === de ? "" : de)) &&
            !ae &&
            Q &&
            !(null !== (t = f.creator) && void 0 !== t && t.viewerIsUser) &&
            !(
              null !== (n = f.creator) &&
              void 0 !== n &&
              n.viewerEdge.isFollowing
            ) &&
            ((null === (r = f.creator) || void 0 === r
              ? void 0
              : r.viewerEdge.readPostsCount) || 0) >= 3,
          ve = d.useState(pe),
          Ee = u()(ve, 2),
          ye = Ee[0],
          be = Ee[1];
        d.useEffect(function () {
          be(pe);
        }, []);
        var xe = (0, Ze.Dj)(f, ye),
          Se = (0, L.rZ)(),
          we = Se.loading,
          Pe = Se.viewerId;
        d.useEffect(
          function () {
            if (!we && Pe && !H) {
              if (h) {
                Q || (f.isLocked ? (0, re.yB)() : (0, re.B8)());
                var e = (0, S.RD)({
                  inAppBrowser: N,
                  post: f,
                  meteringInfo: m,
                  referrer: B,
                  referrerSource: T,
                  viewer: K,
                  currentUserId: Pe,
                });
                O && O.domain && (e.data.$canonical_url = (0, Y.o2w)(R, f.id));
                var t = K && K.name ? fe(K.name) : void 0;
                (0, Ye.KQ)({ post: f }, t),
                  (0, S.Pu)(e),
                  k((0, Rn.aj)(e)),
                  k((0, Rn.QZ)()),
                  D.event("post.clientViewed", {
                    postId: v,
                    collectionId: te,
                    collectionSlug: ne,
                    context: 1,
                    isFriendLink: !!le,
                  });
              } else D.event("post.draftViewed", { postId: v });
              return (
                Q || (0, Qt.kD)(v),
                function () {
                  k((0, Rn.Uo)());
                }
              );
            }
          },
          [v, h, we, Pe, H, N, K]
        );
        var Ie = (0, he.Wd)("readmore");
        d.useEffect(
          function () {
            var e;
            if (Ie) {
              var t = document.getElementById(jn.W);
              if (t) {
                var n =
                  window.matchMedia &&
                  (null ===
                    (e = window.matchMedia(
                      "(prefers-reduced-motion: reduce)"
                    )) || void 0 === e
                    ? void 0
                    : e.matches);
                setTimeout(function () {
                  var e = Math.max(t.offsetTop - window.innerHeight / 2, 0);
                  window.scrollY <= e &&
                    window.scrollTo({
                      top: e,
                      behavior: n ? void 0 : "smooth",
                    });
                });
              }
            }
          },
          [Ie]
        ),
          me !== se && k((0, Cn.t)(se));
        var Oe = (0, J.V)({
            name: "enable_member_only_paywall",
            placeholder: !1,
          }),
          _e = (0, C.$)(
            "entity_driven_subscription_milestone_2",
            null == f ? void 0 : f.creator
          );
        d.useEffect(
          function () {
            var e;
            !_e ||
              (null !== (e = K) && void 0 !== e && e.mediumMemberAt) ||
              D.event("experiment.eligible", { experimentId: "302c03fdc015" });
          },
          [_e, K]
        );
        var Ae,
          De,
          Te =
            ae &&
            ((A || E) && _e && Oe
              ? d.createElement(X, { post: f })
              : Q
              ? d.createElement(ke, { post: f })
              : d.createElement(Ne, { post: f, meteringInfo: m })),
          Ce = E ? { className: "meteredContent" } : {};
        if (U) {
          var Re = U.split("-");
          (Ae = Re[0]), (De = Re[1]);
        }
        var Le =
          O &&
          f.customStyleSheet &&
          null != f &&
          null !== (i = f.creator) &&
          void 0 !== i &&
          null !== (o = i.customStyleSheet) &&
          void 0 !== o &&
          o.blogroll
            ? Wn(
                Wn({}, f.customStyleSheet),
                {},
                {
                  blogroll:
                    null == f ||
                    null === (a = f.creator) ||
                    void 0 === a ||
                    null === (l = a.customStyleSheet) ||
                    void 0 === l
                      ? void 0
                      : l.blogroll,
                }
              )
            : f.customStyleSheet;
        return d.createElement(
          d.Fragment,
          null,
          d.createElement(x.u, null),
          d.createElement(
            Xe,
            { post: f },
            d.createElement(xt, { isAmp: M, post: f }),
            (null === (c = K) || void 0 === c ? void 0 : c.id) ===
              (null === (s = f.creator) || void 0 === s ? void 0 : s.id)
              ? d.createElement(vn.Lv, { post: f, user: f.creator })
              : d.createElement(
                  ee.bZ,
                  { name: "can_view_suspended_content", placeholder: Gn },
                  function (e) {
                    return e
                      ? d.createElement(vn.Lv, { post: f, user: f.creator })
                      : null;
                  }
                ),
            d.createElement(
              Gt,
              { post: f },
              d.createElement(
                Zt.f,
                { customStyleSheet: f.customStyleSheet },
                d.createElement(zn, { post: f }),
                d.createElement(
                  rn.WithResponsesSidebar,
                  { post: f },
                  function (e) {
                    var t,
                      n = e.show;
                    return d.createElement(
                      tn,
                      {
                        rule:
                          ((t = f.customStyleSheet),
                          (0, nn.fl)(null == t ? void 0 : t.postBody)),
                      },
                      d.createElement(
                        g.Am,
                        null,
                        d.createElement(
                          qe.L0,
                          null,
                          d.createElement(
                            qt.Q.Provider,
                            {
                              value: {
                                isFirstLoadAndInReadingList: z,
                                setIsFirstLoadAndInReadingList: $,
                              },
                            },
                            d.createElement(wn, null),
                            d.createElement(kn, null),
                            d.createElement(
                              "article",
                              Ce,
                              d.createElement(et.mV, {
                                post: f,
                                meteringInfo: m,
                              }),
                              d.createElement(
                                gn,
                                { post: f },
                                d.createElement(Yt.bl, {
                                  activeGrafId: Ae,
                                  activeNoteId: De,
                                  isAuroraPostPageEnabled: se,
                                  post: f,
                                  postBodyInserts: xe,
                                  ref: q,
                                })
                              )
                            ),
                            !ae &&
                              !!h &&
                              !ue &&
                              d.createElement(zt.PostSidebar, {
                                customStyleSheet: Le,
                                showResponsesSidebar: n,
                                post: f,
                                extraWide: !0,
                              }),
                            Te,
                            !ae &&
                              d.createElement(Kt.zX, {
                                post: f,
                                showResponsesSidebar: n,
                              })
                          )
                        )
                      )
                    );
                  }
                ),
                d.createElement(Bt, { post: f }),
                !!h && d.createElement(I.T, { slimFooter: se })
              )
            ),
            M &&
              d.createElement(
                d.Fragment,
                null,
                d.createElement(Ln, {
                  json: {
                    requests: {
                      base: (0, Y.vuB)(R),
                      pageview: (0, Y.CXS)(),
                      scrollPing: (0, Y.y4K)(),
                    },
                    vars: {
                      postId: v,
                      collectionId: te,
                      canonicalUrl: _,
                      referrer: B,
                    },
                    triggers: {
                      defaultPageview: { on: "visible", request: "pageview" },
                      scrollDepths: {
                        on: "scroll",
                        scrollSpec: {
                          verticalBoundaries: [
                            0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
                            65, 70, 75, 80, 85, 90, 95, 100,
                          ],
                        },
                        request: "scrollPing",
                      },
                    },
                    transport: { beacon: !1, xhrpost: !1, image: !0 },
                  },
                }),
                d.createElement(y, { collectionGoogleAnalyticsId: ie }),
                d.createElement(Un, null)
              )
          ),
          !!f.creator &&
            !f.collection &&
            d.createElement(Dn.h, { user: f.creator, refreshOnComplete: !0 })
        );
      }
      var zn = function (e) {
          var t,
            n,
            r = e.post,
            i = r.collection,
            o = r.content,
            l = i || r.creator,
            c = (0, Nt.GT)(l),
            s = (0, V.p9)(function (e) {
              return e.config.isAmp;
            }),
            u = o.bodyModel && o.bodyModel.paragraphs[0],
            m = u && u.type === It.NJ.IMG && u.layout === It.ms.FULL_WIDTH;
          if (l && c)
            return d.createElement(
              Tn.xu,
              {
                marginBottom: m ? "0" : "36px",
                sm: { marginBottom: m ? "0" : "20px" },
              },
              d.createElement(Xt.Go, {
                publisher: l,
                customStyleSheet: r.customStyleSheet,
                post: r,
                forceSmall: !0,
              }),
              d.createElement(Jt.z, {
                headerScale:
                  null === (t = r.customStyleSheet) ||
                  void 0 === t ||
                  null === (n = t.header) ||
                  void 0 === n
                    ? void 0
                    : n.headerScale,
                post: r,
                publisher: l,
              })
            );
          var p = { behavior: _.W.Aggressive, isAmp: s, isFixed: !1, post: r };
          if (i) return d.createElement(w.NL, a()({}, p, { collection: i }));
          var g = r.layerCake,
            f = r.primaryTopic,
            v = g && (1 === g || 2 === g || 3 === g),
            h = v ? f : null;
          return d.createElement(
            O.kw,
            a()({}, p, {
              isMonogramOnly: !v,
              marginBottom: 0,
              marginBottomSm: 0,
              topic: h,
            })
          );
        },
        $n = (0, m.Ps)(Fn(), et.Xc, He, S.PI),
        Yn = (0, m.Ps)(
          Nn(),
          ze,
          w.JE,
          Zt.w,
          Yt.Uw,
          fn,
          Je,
          O.v7,
          Xt.aU,
          Xt.Mv,
          zt.PostSidebar_customStyleSheet,
          De,
          Ze.Cs,
          Kt.F9,
          et.Z3,
          St,
          jt,
          Pt.WZ,
          Vt,
          Pt.kH,
          zt.PostSidebar_post,
          Fe,
          nn._3,
          vn.QX,
          vn.v,
          Dn.k,
          Nt.C5,
          S.ir,
          Ye.ne,
          $t.tA,
          P.Dc
        );
    },
    71794: (e, t, n) => {
      "use strict";
      n.d(t, { j7: () => m, OO: () => d, iI: () => p, m3: () => g });
      var r = n(28655),
        i = n.n(r),
        o = n(71439),
        a = n(14391),
        l = n(22744),
        c = n(50993);
      function s() {
        var e = i()([
          "\n  fragment shortformPostMetaDescription_post on Post {\n    id\n    metaDescription\n    seoDescription\n    shortformType\n    title\n    ...getPostContentAsString_post\n  }\n  ",
          "\n",
        ]);
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      function u() {
        var e = i()([
          "\n  fragment postMetaDescription_post on Post {\n    id\n    title\n    seoDescription\n    metaDescription\n    creator {\n      id\n      name\n    }\n    collection {\n      id\n      name\n    }\n    previewContent {\n      subtitle\n    }\n    ...getPostContentAsString_post\n  }\n  ",
          "\n",
        ]);
        return (
          (u = function () {
            return e;
          }),
          e
        );
      }
      var m = function (e) {
          return (function (e) {
            var t = e.metaDescription,
              n = e.seoDescription,
              r = e.title || "";
            if (n) return n;
            if (t) return t;
            var i = (function (e) {
              var t = (0, l.r4)(e, 250);
              return t && (0, c.N8)(t, 200);
            })(e);
            if (i.length > 150) return i;
            var o = (e.previewContent && e.previewContent.subtitle) || "";
            if (o.length > 140) return o;
            o.length > 0 && (o += ".");
            var a = (r.length ? r + ". " : "") + o;
            if (a.length > 140) return a;
            var s = "“".concat(r, "” is published");
            return (
              e.creator &&
                e.creator.name &&
                (s += " by ".concat(e.creator.name)),
              e.collection &&
                e.collection.name &&
                (s += " in ".concat(e.collection.name)),
              "".concat(o, " ").concat(s, ".")
            );
          })(e).trim();
        },
        d = function (e, t) {
          var n = e.metaDescription,
            r = e.seoDescription,
            i = e.shortformType,
            o = i === a.po.SHORTFORM_TYPE_NOTE || !i;
          if (r) return r;
          if (n) return n;
          if (o && t) {
            var s = (0, l.r4)(e, 350, 0);
            return (0, c.N8)(s, 300);
          }
          return "";
        },
        p = (0, o.Ps)(u(), l.bh),
        g = (0, o.Ps)(s(), l.bh);
    },
    22744: (e, t, n) => {
      "use strict";
      n.d(t, {
        r4: () => _,
        bh: () => A,
        yB: () => k,
        dm: () => D,
        lO: () => R,
        Bg: () => L,
        _t: () => U,
        bq: () => M,
        oS: () => B,
        Pz: () => j,
        c_: () => N,
        HF: () => F,
      });
      var r = n(59713),
        i = n.n(r),
        o = n(28655),
        a = n.n(o),
        l = n(71439),
        c = n(90584),
        s = n(4743),
        u = n(14391),
        m = n(398),
        d = n(50993);
      function p() {
        var e = a()([
          "\n  fragment shouldIndexPost_post on Post {\n    id\n    firstPublishedAt\n    isLimitedState\n    isShortform\n    shortformType\n    visibility\n    curationStatus\n    creator {\n      name\n      atsQualifiedAt\n      customDomainState {\n        live {\n          status\n          isSubdomain\n        }\n      }\n    }\n    collection {\n      customDomainState {\n        live {\n          status\n          isSubdomain\n        }\n      }\n      creator {\n        atsQualifiedAt\n      }\n      ptsQualifiedAt\n    }\n    noIndex\n    ...getPostContentAsString_post\n  }\n  ",
          "\n",
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      function g() {
        var e = a()([
          "\n  fragment shortformPostTitle_post on Post {\n    id\n    title\n    seoTitle\n    ...getPostContentAsString_post\n    ...appendPostContext_post\n    collection {\n      ...maybeAppendProductName_collection\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (g = function () {
            return e;
          }),
          e
        );
      }
      function f() {
        var e = a()([
          "\n  fragment getTitleForPost_post on Post {\n    id\n    title\n    ...postTitle_post\n    ...getTitleDetails_post\n  }\n  ",
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
      function v(e, t) {
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
      function h(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? v(Object(n), !0).forEach(function (t) {
                i()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : v(Object(n)).forEach(function (t) {
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
        var e = a()([
          "\n  fragment postTitle_post on Post {\n    id\n    title\n    seoTitle\n    firstPublishedAt\n    ...getPostContentAsString_post\n    ...appendPostContext_post\n    collection {\n      id\n      name\n      domain\n      ...maybeAppendProductName_collection\n    }\n    creator {\n      name\n    }\n    previewContent {\n      subtitle\n    }\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (E = function () {
            return e;
          }),
          e
        );
      }
      function y() {
        var e = a()([
          "\n  fragment maybeAppendProductName_collection on Collection {\n    id\n    domain\n  }\n",
        ]);
        return (
          (y = function () {
            return e;
          }),
          e
        );
      }
      function b() {
        var e = a()([
          "\n  fragment getTitleDetails_post on Post {\n    id\n    content(postMeteringOptions: $postMeteringOptions) {\n      bodyModel {\n        ...GetTitleIndexMap_bodyModel\n      }\n    }\n    ...getPostContentAsString_post\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (b = function () {
            return e;
          }),
          e
        );
      }
      function x() {
        var e = a()([
          "\n  fragment getPostContentAsString_post on Post {\n    content(postMeteringOptions: $postMeteringOptions) {\n      bodyModel {\n        paragraphs {\n          text\n          type\n          mixtapeMetadata {\n            href\n          }\n        }\n      }\n    }\n  }\n",
        ]);
        return (
          (x = function () {
            return e;
          }),
          e
        );
      }
      function S(e, t) {
        var n;
        if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
          if (
            Array.isArray(e) ||
            (n = (function (e, t) {
              if (e) {
                if ("string" == typeof e) return w(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return (
                  "Object" === n && e.constructor && (n = e.constructor.name),
                  "Map" === n || "Set" === n
                    ? Array.from(e)
                    : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? w(e, t)
                    : void 0
                );
              }
            })(e)) ||
            (t && e && "number" == typeof e.length)
          ) {
            n && (e = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[r++] };
              },
              e: function (e) {
                throw e;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          a = !0,
          l = !1;
        return {
          s: function () {
            n = e[Symbol.iterator]();
          },
          n: function () {
            var e = n.next();
            return (a = e.done), e;
          },
          e: function (e) {
            (l = !0), (o = e);
          },
          f: function () {
            try {
              a || null == n.return || n.return();
            } finally {
              if (l) throw o;
            }
          },
        };
      }
      function w(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function P() {
        var e = a()([
          "\n  fragment appendPostContext_post on Post {\n    id\n    sequence {\n      title\n    }\n    collection {\n      name\n    }\n    creator {\n      name\n    }\n  }\n",
        ]);
        return (
          (P = function () {
            return e;
          }),
          e
        );
      }
      function I(e, t) {
        var n, r, i;
        return (
          null !== (n = t.sequence) && void 0 !== n && n.title
            ? (e += " - ".concat(t.sequence.title))
            : null !== (r = t.collection) && void 0 !== r && r.name
            ? (e += " - ".concat(t.collection.name))
            : null !== (i = t.creator) &&
              void 0 !== i &&
              i.name &&
              (e += " - ".concat(t.creator.name)),
          e
        );
      }
      var O = (0, l.Ps)(P());
      function _(e) {
        var t,
          n,
          r,
          i =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 250,
          o =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : 100,
          a =
            arguments.length > 3 && void 0 !== arguments[3]
              ? arguments[3]
              : { includeMixtapeHref: !1 },
          l = a.includeMixtapeHref,
          c =
            (null === (t = e.content) ||
            void 0 === t ||
            null === (n = t.bodyModel) ||
            void 0 === n
              ? void 0
              : n.paragraphs) || [],
          s = "",
          u = S(c);
        try {
          for (u.s(); !(r = u.n()).done; ) {
            var m = r.value,
              d = m.mixtapeMetadata,
              p = m.text,
              g = m.type;
            if (
              (l && null != d && d.href
                ? (s += s ? " ".concat(d.href) : d.href)
                : "P" === g &&
                  p &&
                  p.length > o &&
                  (s += s ? " ".concat(p) : p),
              s.length > i)
            )
              break;
          }
        } catch (e) {
          u.e(e);
        } finally {
          u.f();
        }
        return s;
      }
      var A = (0, l.Ps)(x());
      function k(e) {
        var t = !1,
          n = "";
        if (
          e.content &&
          e.content.bodyModel &&
          e.content.bodyModel.paragraphs
        ) {
          var r = e.content.bodyModel.paragraphs,
            i = (0, s.LI)(r).titleIndex;
          "number" == typeof i && ((n = r[i].text || ""), (t = !0));
        }
        return { hasTitleGraf: t, latestTitle: n };
      }
      var D = (0, l.Ps)(b(), A, s.k);
      function T(e, t, n) {
        return null != n && n.domain ? e : "".concat(e, " - ").concat(t);
      }
      var C = (0, l.Ps)(y());
      function R(e, t) {
        var n,
          r,
          i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          o = e.seoTitle,
          a = e.title || "",
          l =
            (null === (n = e.previewContent) || void 0 === n
              ? void 0
              : n.subtitle) || "";
        if (o) return (0, m.p)(o, e.collection && e.collection.name, t);
        if (!i)
          return a.length > 50 ? a : (a = T((a = I(a, e)), t, e.collection));
        a.length < 33 && l && ((l = (0, d.N8)(l, 40)), (a += ". ".concat(l))),
          null !== (r = e.creator) &&
            void 0 !== r &&
            r.name &&
            (a += " | by ".concat(e.creator.name));
        var s = "",
          u = Date.now() - 5184e6;
        e.firstPublishedAt >= u &&
          (s = " | ".concat((0, c.Z)(e.firstPublishedAt, "LLL, yyyy")));
        var p = e.collection;
        return (
          p
            ? p.domain
              ? (a += "".concat(s, " | ").concat(p.name))
              : (a += " | ".concat(p.name).concat(s, " | ").concat(t))
            : (a += "".concat(s, " | ").concat(t)),
          a
        );
      }
      var L = (0, l.Ps)(E(), A, O, C);
      function U(e, t) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : k(e),
          r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
          i = e.title || "",
          o = n.latestTitle || i,
          a = h(h({}, e), {}, { title: o });
        return R(a, t, r).trim();
      }
      var M = (0, l.Ps)(f(), L, D);
      function B(e, t, n) {
        var r = e.seoTitle,
          i = e.title || "";
        return r
          ? (0, m.p)(r, e.collection && e.collection.name, t)
          : (i = T(
              (i = I(
                (i = (function (e, t, n) {
                  var r = t.shortformType,
                    i = r === u.po.SHORTFORM_TYPE_NOTE || !r;
                  return (
                    n ||
                      (i
                        ? (e = _(t, 250, 0))
                        : r === u.po.SHORTFORM_TYPE_LINK &&
                          (e = _(t, 250, 0, { includeMixtapeHref: !0 }))),
                    (0, d.N8)(e, 200)
                  );
                })(i, e, n)),
                e
              )),
              t,
              e.collection
            ));
      }
      var j = (0, l.Ps)(g(), A, O, C);
      function N(e) {
        var t,
          n,
          r,
          i,
          o = e.noIndex,
          a = e.collection,
          l = e.curationStatus,
          c = e.firstPublishedAt,
          s = e.isLimitedState,
          m = e.isShortform,
          d = e.shortformType,
          p = e.visibility,
          g = d === u.po.SHORTFORM_TYPE_NOTE || !d;
        if (o) return !1;
        if (!c) return !1;
        if ("PUBLIC" !== p && "LOCKED" !== p) return !1;
        if (s) return !1;
        if (m)
          if (g) {
            if (_(e, 10, 0).length <= 10) return !1;
          } else if (0 === _(e, 10, 0).length) return !1;
        if (
          (null === (t = e.creator) || void 0 === t
            ? void 0
            : t.atsQualifiedAt) > 0 ||
          (a && a.ptsQualifiedAt > 0)
        )
          return !0;
        if (
          l &&
          (l === u.Xg.CURATION_STATUS_DISTRIBUTED ||
            l === u.Xg.CURATION_STATUS_DISTRIBUTED_AND_DISABLED)
        )
          return !0;
        var f = ["DELETED", "FAILED", "UNSPECIFIED"],
          v =
            null == a || null === (n = a.customDomainState) || void 0 === n
              ? void 0
              : n.live,
          h =
            null === (r = e.creator) ||
            void 0 === r ||
            null === (i = r.customDomainState) ||
            void 0 === i
              ? void 0
              : i.live;
        return !(
          (!v || v.isSubdomain || f.includes(v.status)) &&
          (!h || h.isSubdomain || f.includes(h.status))
        );
      }
      var F = (0, l.Ps)(p(), A);
    },
    398: (e, t, n) => {
      "use strict";
      n.d(t, { N: () => r, p: () => i });
      var r = function (e) {
          return e || "Untitled story";
        },
        i = function (e, t, n) {
          return t
            ? "".concat(e, " | ").concat(t)
            : n
            ? "".concat(e, " | ").concat(n)
            : e;
        };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/3170.5198d6c9.chunk.js.map
