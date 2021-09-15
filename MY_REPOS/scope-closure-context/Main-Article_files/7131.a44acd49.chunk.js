(self.webpackChunklite = self.webpackChunklite || []).push([
  [7131],
  {
    57131: (e, n, t) => {
      "use strict";
      t.d(n, { Z: () => ae, G: () => se });
      var o = t(28655),
        i = t.n(o),
        r = t(63038),
        l = t.n(r),
        a = t(71439),
        s = t(67294),
        c = t(12291),
        u = t(46829);
      function d() {
        var e = i()([
          "\n  mutation DismissPostMutation($postId: ID!) {\n    dismissPost(postId: $postId)\n  }\n",
        ]);
        return (
          (d = function () {
            return e;
          }),
          e
        );
      }
      var m = (0, a.Ps)(d()),
        p = t(80439),
        f = t(85277);
      function E() {
        var e = i()([
          "\n  mutation PostAllowResponsesMutation($targetPostId: ID!, $allowResponses: Boolean!) {\n    setPostAllowResponses(targetPostId: $targetPostId, allowResponses: $allowResponses) {\n      id\n      allowResponses\n    }\n  }\n",
        ]);
        return (
          (E = function () {
            return e;
          }),
          e
        );
      }
      var v = (0, a.Ps)(E()),
        h = (0, c.$j)()(function (e) {
          var n = e.children,
            t = e.dispatch,
            o = e.onCompleted,
            i = e.targetPostId;
          return s.createElement(
            p.mm,
            {
              mutation: v,
              onCompleted: function () {
                t(
                  (0, f.Dx)({
                    message: "Responses are now hidden for this post.",
                  })
                ),
                  o && o();
              },
              variables: { targetPostId: i, allowResponses: !1 },
              optimisticResponse: {
                __typename: "Mutation",
                setPostAllowResponses: {
                  __typename: "Post",
                  id: i,
                  allowResponses: !1,
                },
              },
            },
            function (e) {
              return n({ mutate: e });
            }
          );
        }),
        g = (0, c.$j)()(function (e) {
          var n = e.children,
            t = e.dispatch,
            o = e.onCompleted,
            i = e.targetPostId;
          return s.createElement(
            p.mm,
            {
              mutation: v,
              onCompleted: function () {
                t(
                  (0, f.Dx)({
                    message: "Responses are now shown for this post.",
                  })
                ),
                  o && o();
              },
              variables: { targetPostId: i, allowResponses: !0 },
              optimisticResponse: {
                __typename: "Mutation",
                setPostAllowResponses: {
                  __typename: "Post",
                  id: i,
                  allowResponses: !0,
                },
              },
            },
            function (e) {
              return n({ mutate: e });
            }
          );
        }),
        b = t(28774),
        C = t(33241),
        x = t(885),
        w = t(35848),
        y = t(42963),
        P = t(85432),
        S = function (e) {
          var n = e.onConfirm,
            t = e.isVisible,
            o = e.hide;
          return s.createElement(
            P.QH,
            {
              onConfirm: n,
              isVisible: t,
              hide: o,
              titleText: "Hide responses",
              confirmText: "Confirm",
              isDestructiveAction: !1,
            },
            "People will still be able to respond, but the link to see responses will not be displayed at the bottom of your post."
          );
        },
        I = t(1506),
        R = t(73882),
        k = t(71245),
        D = t(74871),
        _ = t(32262),
        M = t(64504),
        A = "manageSubmissionPopover",
        U = function (e) {
          var n = e.viewer,
            t = e.show,
            o = e.post;
          return n &&
            "PENDING" === o.statusForCollection &&
            ((0, D.DM)(o) || (0, D.py)(o, n))
            ? s.createElement(
                _.Sl,
                null,
                s.createElement(
                  P.rU,
                  { ariaControls: A, ariaExpanded: "false", onClick: t },
                  "Manage submission"
                )
              )
            : null;
        },
        F = function (e) {
          var n = e.children,
            t = e.isVisible,
            o = e.post,
            i = e.hide,
            r = e.showLoadingIndicator,
            l = (0, k.h3)(o),
            a = (0, k.yb)(o),
            u = (0, c.I0)(),
            d = o.pendingCollection;
          return d
            ? s.createElement(
                P.J2,
                {
                  ariaId: A,
                  isVisible: t,
                  hide: i,
                  popoverRenderFn: function () {
                    return s.createElement(
                      P.xu,
                      { padding: "16px", maxWidth: "280px" },
                      s.createElement(
                        P.xu,
                        {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        },
                        s.createElement(
                          P.xu,
                          { paddingRight: "8px" },
                          s.createElement(R.v, { collection: d, size: 40 })
                        ),
                        s.createElement(
                          M.F,
                          { scale: "S" },
                          "This draft is submitted to ",
                          d.name,
                          "."
                        )
                      ),
                      s.createElement(
                        P.xu,
                        {
                          flexDirection: "row",
                          display: "flex",
                          paddingTop: "16px",
                        },
                        s.createElement(
                          P.xu,
                          { paddingRight: "8px" },
                          s.createElement(
                            P.zx,
                            {
                              buttonStyle: "OBVIOUS",
                              onClick: function () {
                                i(),
                                  r(),
                                  l(o.pendingCollection).then(function () {
                                    window.location.reload(!1);
                                  });
                              },
                            },
                            "Accept"
                          )
                        ),
                        s.createElement(
                          P.zx,
                          {
                            buttonStyle: "SUBTLE",
                            onClick: function () {
                              a(o.pendingCollection).then(function () {
                                u(
                                  (0, f.Dx)({
                                    message: "Story removed from ".concat(
                                      d.name || "publication"
                                    ),
                                  })
                                );
                              }),
                                i();
                            },
                          },
                          "Don't accept"
                        )
                      )
                    );
                  },
                },
                n
              )
            : n;
        },
        T = "removeFromPublicationPopover",
        V = function (e) {
          var n = e.viewer,
            t = e.show,
            o = e.post;
          return n &&
            (("APPROVED" === o.statusForCollection &&
              ((0, D.DM)(o) || (0, D.py)(o, n) || (0, D.Hj)(o, n))) ||
              ("PENDING" === o.statusForCollection && (0, D.Hj)(o, n)))
            ? s.createElement(
                _.Sl,
                null,
                s.createElement(
                  P.rU,
                  { ariaControls: T, ariaExpanded: "false", onClick: t },
                  "Remove story from publication"
                )
              )
            : null;
        },
        O = function (e) {
          var n = e.children,
            t = e.isVisible,
            o = e.hide,
            i = e.post,
            r = e.viewer,
            l = (0, c.I0)(),
            a = (0, k.yb)(i),
            u = i.collection || i.pendingCollection;
          return u
            ? s.createElement(
                P.J2,
                {
                  ariaId: T,
                  isVisible: t,
                  hide: o,
                  popoverRenderFn: function () {
                    return s.createElement(
                      P.xu,
                      { padding: "16px", maxWidth: "280px" },
                      s.createElement(
                        P.xu,
                        {
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        },
                        s.createElement(
                          P.xu,
                          { paddingRight: "8px" },
                          s.createElement(R.v, { collection: u, size: 40 })
                        ),
                        "APPROVED" === i.statusForCollection
                          ? s.createElement(
                              M.F,
                              { scale: "S" },
                              (0, D.Hj)(i, r) ? "Your" : "This",
                              " story is published in",
                              " ",
                              u.name,
                              "."
                            )
                          : "PENDING" === i.statusForCollection
                          ? s.createElement(
                              M.F,
                              { scale: "S" },
                              "Your story is being reviewed by ",
                              u.name,
                              " editors."
                            )
                          : s.createElement(
                              M.F,
                              { scale: "S" },
                              "This draft is submitted to ",
                              u.name
                            )
                      ),
                      s.createElement(
                        P.xu,
                        {
                          flexDirection: "row",
                          display: "flex",
                          paddingTop: "16px",
                        },
                        s.createElement(
                          P.xu,
                          { paddingRight: "8px" },
                          s.createElement(
                            P.zx,
                            {
                              buttonStyle: "SUBTLE",
                              onClick: function () {
                                a(u).then(
                                  function () {
                                    l(
                                      (0, f.Dx)({
                                        message: "Story removed from ".concat(
                                          u.name || "publication"
                                        ),
                                      })
                                    );
                                  },
                                  function () {
                                    l(
                                      (0, f.Dx)({
                                        message:
                                          "There was a problem removing the story from ".concat(
                                            u.name || "publication"
                                          ),
                                        toastStyle: "ERROR",
                                      })
                                    );
                                  }
                                ),
                                  o();
                              },
                            },
                            "PENDING" === i.statusForCollection
                              ? "Cancel submission"
                              : "Remove from ".concat(u.name || "")
                          )
                        )
                      )
                    );
                  },
                },
                n
              )
            : n;
        },
        L = t(965),
        B = t(49925),
        H = t(78820),
        N = t(73232),
        z = t(85740),
        j = t(34675),
        G = t(62181),
        Q = t(18970),
        K = t(90639),
        $ = t(14391),
        J = t(65347),
        W = t(67297),
        q = t(93394),
        X = t(76579),
        Y = t(39171),
        Z = t(51064),
        ee = t(95614),
        ne = t(96879),
        te = t(55573),
        oe = t(27952);
      function ie() {
        var e = i()([
          "\n  fragment CreatorActionOverflowPopover_post on Post {\n    allowResponses\n    id\n    statusForCollection\n    isLocked\n    isPublished\n    clapCount\n    mediumUrl\n    pinnedAt\n    pinnedByCreatorAt\n    curationEligibleAt\n    mediumUrl\n    responseDistribution\n    visibility\n    ...useIsPinnedInContext_post\n    pendingCollection {\n      id\n      name\n      creator {\n        id\n      }\n      avatar {\n        id\n      }\n      viewerEdge {\n        id\n        isEditor\n      }\n      domain\n      slug\n    }\n    creator {\n      id\n      viewerEdge {\n        id\n        isBlocking\n      }\n      ...MutePopoverOptions_creator\n      ...auroraHooks_publisher\n    }\n    collection {\n      id\n      name\n      creator {\n        id\n      }\n      avatar {\n        id\n      }\n      viewerEdge {\n        id\n        isEditor\n      }\n      domain\n      slug\n      ...MutePopoverOptions_collection\n      ...auroraHooks_publisher\n    }\n    viewerEdge {\n      clapCount\n      id\n      shareKey\n    }\n    ...ClapMutation_post\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n  ",
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
      var re = function (e) {
        return {
          fill: e.baseColor.fill.normal,
          ":hover": { fill: e.baseColor.fill.darker },
          ":focus": { fill: e.baseColor.fill.darker },
        };
      };
      function le() {
        return s.createElement(P.hS, null, function (e) {
          return s.createElement(q.Z, { className: e(re) });
        });
      }
      var ae = function (e) {
          var n,
            t,
            o = e.creator,
            i = e.post,
            r = e.collection,
            a = e.showLoadingIndicator,
            d = e.setIsAuthorOrPubMuted,
            p = e.setMutedAuthorId,
            E = e.setMutedPubId,
            v = e.onPostDismissed,
            R = e.isMutingFromHomeFeed,
            k = e.isDismissDisabled,
            D = e.isMuteDisabled,
            M = s.useState(!1),
            A = l()(M, 2),
            T = A[0],
            q = A[1],
            ie = s.useState(!1),
            re = l()(ie, 2),
            ae = re[0],
            se = re[1],
            ce = s.useState(!1),
            ue = l()(ce, 2),
            de = ue[0],
            me = ue[1],
            pe = (0, W.b$)(function (e) {
              return e.multiVote.clapsPerPost;
            }),
            fe = (0, c.I0)(),
            Ee = s.useCallback(
              function (e) {
                return fe((0, J.at)(e));
              },
              [fe]
            ),
            ve = (0, te.l)(pe, i, i.viewerEdge),
            he = ve.clapCount,
            ge = ve.viewerClapCount,
            be = (0, f.w)(),
            Ce = (0, j.Hk)().value,
            xe = null == Ce ? void 0 : Ce.id,
            we = (0, L.CP)(),
            ye = (function (e) {
              return (0, u.useMutation)(m, { variables: { postId: e } });
            })(i.id),
            Pe = l()(ye, 1)[0],
            Se = (0, H.KQ)(i),
            Ie = l()(Se, 2),
            Re = Ie[0],
            ke = Ie[1],
            De = (0, B.UL)(i.collection),
            _e = (0, B.UL)(i.creator),
            Me = s.useCallback(
              function (e) {
                var n;
                be({
                  extraParams: {
                    collectionName:
                      (null === (n = i.collection) || void 0 === n
                        ? void 0
                        : n.name) || "",
                    becamePinned: !!e.data.setPinnedAt.pinnedAt,
                  },
                  message: "",
                  toastStyle: "POST_PINNED_TO_COLLECTION_HOMEPAGE",
                });
              },
              [null === (n = i.collection) || void 0 === n ? void 0 : n.name]
            ),
            Ae = s.useCallback(function (e) {
              be({
                message: e.data.postSetPinnedByCreatorAt.pinnedByCreatorAt
                  ? "This story has been pinned to your profile's homepage"
                  : "This story has been unpinned from your profile's homepage",
              });
            }, []),
            Ue = s.useCallback(
              function () {
                ke().then(Me);
              },
              [
                ke,
                Me,
                null == i || null === (t = i.collection) || void 0 === t
                  ? void 0
                  : t.name,
              ]
            ),
            Fe = (0, H.In)(i),
            Te = l()(Fe, 2),
            Ve = Te[0],
            Oe = Te[1],
            Le = s.useCallback(
              function () {
                Oe().then(Ae);
              },
              [Oe, Ae]
            ),
            Be = !(0, ee.T)(),
            He = (0, W.v9)(function (e) {
              return e.config.authDomain;
            }),
            Ne = s.useState(!1),
            ze = l()(Ne, 2),
            je = ze[0],
            Ge = ze[1],
            Qe = i.responseDistribution === $.Et.DISTRIBUTED,
            Ke = function () {
              Ge(!0);
            },
            $e = (0, Z.O)(!1),
            Je = l()($e, 3),
            We = Je[0],
            qe = Je[1],
            Xe = Je[2],
            Ye = (0, Z.O)(!1),
            Ze = l()(Ye, 4),
            en = Ze[0],
            nn = Ze[2],
            tn = Ze[3],
            on = (0, Z.O)(!1),
            rn = l()(on, 3),
            ln = rn[0],
            an = rn[1],
            sn = rn[2],
            cn = (0, Z.O)(!1),
            un = l()(cn, 3),
            dn = un[0],
            mn = un[1],
            pn = un[2],
            fn = (0, Z.O)(!1),
            En = l()(fn, 3),
            vn = En[0],
            hn = En[1],
            gn = En[2],
            bn = (0, z.P5)("can_edit_members_only_posts");
          if (!o || !Ce) return null;
          var Cn = i.allowResponses,
            xn = i.id,
            wn = i.pendingCollection,
            yn = i.mediumUrl,
            Pn = i.viewerEdge.shareKey,
            Sn = i.visibility,
            In =
              (null == r ? void 0 : r.viewerEdge.isEditor) ||
              (null == wn ? void 0 : wn.viewerEdge.isEditor),
            Rn = xe === o.id || In,
            kn = bn && i && i.isLocked,
            Dn = Rn || kn,
            _n = !!i.curationEligibleAt,
            Mn = "UNLISTED" === Sn,
            An = "creatorActionOverflowMenu",
            Un = null == o ? void 0 : o.viewerEdge.isBlocking;
          return je
            ? s.createElement(y.l, { to: (0, oe.d0A)(He, i.id) })
            : s.createElement(
                b.z,
                {
                  targetUserId: null == o ? void 0 : o.id,
                  viewerId: Ce.id,
                  onCompleted: sn,
                },
                function (e) {
                  var n = e.mutate;
                  return s.createElement(
                    x.E,
                    {
                      targetUserId: null == o ? void 0 : o.id,
                      viewerId: Ce.id,
                    },
                    function (e) {
                      var t = e.mutate;
                      return s.createElement(
                        C.H,
                        {
                          targetAuthorId: null == o ? void 0 : o.id,
                          targetPostId: i.id,
                          isBlocking: Un,
                          viewerId: Ce.id,
                        },
                        function (e) {
                          var l = e.mutate;
                          return s.createElement(
                            g,
                            { targetPostId: xn },
                            function (e) {
                              var c = e.mutate;
                              return s.createElement(
                                h,
                                { targetPostId: xn },
                                function (e) {
                                  var u = e.mutate;
                                  return s.createElement(
                                    s.Fragment,
                                    null,
                                    s.createElement(
                                      P.QH,
                                      {
                                        buttonStyle: "STRONG",
                                        cancelText: "Cancel",
                                        isVisible: We,
                                        onConfirm: Ke,
                                        hide: Xe,
                                        titleText: "Edit story and response",
                                        confirmText: "Continue",
                                        isDestructiveAction: !1,
                                      },
                                      N.t
                                    ),
                                    s.createElement(
                                      P.J2,
                                      {
                                        ariaId: An,
                                        isVisible: en,
                                        hide: nn,
                                        popoverRenderFn: function () {
                                          var e;
                                          return s.createElement(
                                            _.mX,
                                            null,
                                            s.createElement(
                                              s.Fragment,
                                              null,
                                              r &&
                                                In &&
                                                De &&
                                                s.createElement(
                                                  _.Sl,
                                                  null,
                                                  s.createElement(
                                                    P.rU,
                                                    { onClick: Ue },
                                                    Re
                                                      ? "Unpin this story from "
                                                      : "Pin this story to ",
                                                    r.name
                                                  )
                                                ),
                                              xe && !k
                                                ? s.createElement(
                                                    _.Sl,
                                                    null,
                                                    s.createElement(
                                                      P.rU,
                                                      {
                                                        onClick: function () {
                                                          Pe({
                                                            variables: {
                                                              postId: i.id,
                                                            },
                                                          }),
                                                            v && v(i.id),
                                                            nn();
                                                        },
                                                      },
                                                      "Dismiss this story"
                                                    )
                                                  )
                                                : null,
                                              (null === (e = i.creator) ||
                                              void 0 === e
                                                ? void 0
                                                : e.id) === Ce.id &&
                                                _e &&
                                                s.createElement(
                                                  _.Sl,
                                                  null,
                                                  s.createElement(
                                                    P.rU,
                                                    { onClick: Le },
                                                    Ve
                                                      ? "Unpin this story from your profile"
                                                      : "Pin this story to your profile"
                                                  )
                                                ),
                                              Be && Dn
                                                ? s.createElement(
                                                    s.Fragment,
                                                    null,
                                                    s.createElement(
                                                      _.Sl,
                                                      null,
                                                      Qe
                                                        ? s.createElement(
                                                            P.rU,
                                                            {
                                                              linkStyle:
                                                                "SUBTLE",
                                                              onClick: (0, Y.B)(
                                                                nn,
                                                                qe
                                                              ),
                                                            },
                                                            "Edit story"
                                                          )
                                                        : s.createElement(
                                                            P.rU,
                                                            {
                                                              linkStyle:
                                                                "SUBTLE",
                                                              href: (0, oe.d0A)(
                                                                He,
                                                                i.id
                                                              ),
                                                            },
                                                            "Edit story"
                                                          )
                                                    ),
                                                    s.createElement(_.oK, null)
                                                  )
                                                : null,
                                              Rn &&
                                                s.createElement(
                                                  _.Sl,
                                                  null,
                                                  s.createElement(
                                                    P.rU,
                                                    {
                                                      href: (0, oe.KIb)(
                                                        He,
                                                        i.id
                                                      ),
                                                    },
                                                    "Story settings"
                                                  )
                                                ),
                                              Rn &&
                                                s.createElement(
                                                  _.Sl,
                                                  null,
                                                  s.createElement(
                                                    P.rU,
                                                    {
                                                      href: (0, oe.T0G)(
                                                        He,
                                                        i.id
                                                      ),
                                                    },
                                                    "View stats"
                                                  )
                                                ),
                                              _n &&
                                                !Mn &&
                                                yn &&
                                                Pn &&
                                                s.createElement(
                                                  _.Sl,
                                                  null,
                                                  s.createElement(
                                                    X.b,
                                                    {
                                                      url: (0, ne.Rk)(
                                                        (0, oe.jVf)(i),
                                                        { sk: Pn }
                                                      ),
                                                      linkStyle: "SUBTLE",
                                                    },
                                                    function (e) {
                                                      return e
                                                        ? "Copied!"
                                                        : "Copy Friend Link";
                                                    }
                                                  )
                                                ),
                                              !D &&
                                                s.createElement(w.qT, {
                                                  hidePopover: nn,
                                                  creator: o,
                                                  collection: r,
                                                  postId: i.id,
                                                  setIsAuthorOrPubMuted: d,
                                                  setMutedAuthorId: p,
                                                  setMutedPubId: E,
                                                  isMutingFromHomeFeed: R,
                                                }),
                                              s.createElement(I.yi, {
                                                post: i,
                                                show: function () {
                                                  se(!0), nn();
                                                },
                                              }),
                                              s.createElement(V, {
                                                viewer: Ce,
                                                post: i,
                                                show: function () {
                                                  me(!0), nn();
                                                },
                                              }),
                                              s.createElement(U, {
                                                viewer: Ce,
                                                post: i,
                                                show: function () {
                                                  q(!0), nn();
                                                },
                                              })
                                            ),
                                            xe === o.id || In
                                              ? s.createElement(
                                                  s.Fragment,
                                                  null,
                                                  s.createElement(
                                                    _.Sl,
                                                    null,
                                                    s.createElement(
                                                      P.rU,
                                                      {
                                                        onClick: function () {
                                                          Cn ? hn() : c(), nn();
                                                        },
                                                      },
                                                      Cn
                                                        ? "Hide responses"
                                                        : "Show responses"
                                                    )
                                                  ),
                                                  s.createElement(_.oK, null)
                                                )
                                              : null,
                                            xe && he && ge && ge > 0
                                              ? s.createElement(
                                                  _.Sl,
                                                  null,
                                                  s.createElement(
                                                    P.rU,
                                                    {
                                                      onClick: function () {
                                                        we(
                                                          i,
                                                          (null == Ce
                                                            ? void 0
                                                            : Ce.id) || "",
                                                          -ge
                                                        ),
                                                          Ee({
                                                            postId: xn,
                                                            clapCount: he - ge,
                                                            viewerClapCount: 0,
                                                            viewerHasClappedSinceFetch:
                                                              !0,
                                                          }),
                                                          nn();
                                                      },
                                                    },
                                                    "Undo applause for this post"
                                                  )
                                                )
                                              : null,
                                            s.createElement(
                                              _.Sl,
                                              null,
                                              xe
                                                ? s.createElement(
                                                    P.rU,
                                                    {
                                                      onClick: function () {
                                                        mn(), nn();
                                                      },
                                                    },
                                                    "Report this story"
                                                  )
                                                : s.createElement(
                                                    G.R9,
                                                    {
                                                      operation: "register",
                                                      post: i,
                                                      susiEntry:
                                                        "report_footer",
                                                    },
                                                    "Report this story"
                                                  )
                                            ),
                                            xe
                                              ? s.createElement(
                                                  _.Sl,
                                                  null,
                                                  s.createElement(
                                                    P.rU,
                                                    {
                                                      onClick: function () {
                                                        Un ? t() : an(), nn();
                                                      },
                                                    },
                                                    Un
                                                      ? "Unblock this author"
                                                      : "Block this author"
                                                  )
                                                )
                                              : null
                                          );
                                        },
                                      },
                                      s.createElement(
                                        I.jB,
                                        {
                                          post: i,
                                          isVisible: ae,
                                          hide: function () {
                                            se(!1);
                                          },
                                          showLoadingIndicator: a,
                                        },
                                        s.createElement(
                                          O,
                                          {
                                            viewer: Ce,
                                            post: i,
                                            isVisible: de,
                                            hide: function () {
                                              me(!1);
                                            },
                                          },
                                          s.createElement(
                                            F,
                                            {
                                              post: i,
                                              isVisible: T,
                                              hide: function () {
                                                q(!1);
                                              },
                                              showLoadingIndicator: a,
                                            },
                                            s.createElement(
                                              P.xu,
                                              {
                                                flexGrow: "0",
                                                marginRight: "-4px",
                                              },
                                              s.createElement(
                                                P.rU,
                                                {
                                                  ariaControls: An,
                                                  ariaExpanded: en
                                                    ? "true"
                                                    : "false",
                                                  ariaLabel: "More options",
                                                  onClick: tn,
                                                },
                                                s.createElement(le, null)
                                              )
                                            )
                                          )
                                        )
                                      )
                                    ),
                                    s.createElement(S, {
                                      onConfirm: u,
                                      isVisible: vn,
                                      hide: gn,
                                    }),
                                    s.createElement(Q.r, {
                                      onConfirm: n,
                                      isVisible: ln,
                                      hide: sn,
                                    }),
                                    s.createElement(K.$, {
                                      onSubmit: l,
                                      isVisible: dn,
                                      hide: pn,
                                    })
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
        },
        se = (0, a.Ps)(ie(), w.mz, w.Gj, L.JP, H.xt, B.C5);
    },
    1506: (e, n, t) => {
      "use strict";
      t.d(n, { x7: () => D, yi: () => U, jB: () => V });
      var o = t(63038),
        i = t.n(o),
        r = t(28655),
        l = t.n(r),
        a = t(71439),
        s = t(80439),
        c = t(67294),
        u = t(73882),
        d = t(71245),
        m = t(74871),
        p = t(34675),
        f = t(32262),
        E = t(85432),
        v = t(64504),
        h = t(72955);
      function g() {
        var e = l()([
          "\n  fragment CollectionSubmission_post on Post {\n    id\n    ...CollectionSubmissionPopover_post\n    ...CollectionSubmissionPopoverMenuItem_post\n  }\n  ",
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
      function b() {
        var e = l()([
          "\n  fragment CollectionSubmissionPopover_post on Post {\n    id\n    isPublished\n    creator {\n      id\n    }\n  }\n",
        ]);
        return (
          (b = function () {
            return e;
          }),
          e
        );
      }
      function C() {
        var e = l()([
          "\n  fragment CollectionSubmissionPopoverMenuItem_post on Post {\n    id\n    statusForCollection\n    isPublished\n    creator {\n      id\n    }\n  }\n",
        ]);
        return (
          (C = function () {
            return e;
          }),
          e
        );
      }
      function x() {
        var e = l()([
          "\n  query CollectionSubmissionPopoverQuery {\n    viewer {\n      id\n      writerCollections {\n        ...CollectionSubmissionPopoverQuery_collection\n      }\n      adminCollections {\n        ...CollectionSubmissionPopoverQuery_collection\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (x = function () {
            return e;
          }),
          e
        );
      }
      function w() {
        var e = l()([
          "\n  fragment CollectionSubmissionPopoverQuery_collection on Collection {\n    ...CollectionSubmissionOption_collection\n    ...ManageSubmission_collection\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (w = function () {
            return e;
          }),
          e
        );
      }
      function y() {
        var e = l()([
          "\n  fragment CollectionSubmissionOption_collection on Collection {\n    id\n    name\n    slug\n    ...CollectionAvatar_collection\n  }\n  ",
          "\n",
        ]);
        return (
          (y = function () {
            return e;
          }),
          e
        );
      }
      var P = (0, a.Ps)(y(), u.d),
        S = (0, a.Ps)(w(), P, m.a6),
        I = (0, a.Ps)(x(), S),
        R = (0, a.Ps)(C()),
        k = (0, a.Ps)(b()),
        D = (0, a.Ps)(g(), k, R),
        _ = "collectionSubmissionPopover",
        M = [
          {
            name: "",
            value: "No publication",
            content: c.createElement(
              E.xu,
              {
                height: "32px",
                display: "flex",
                alignItems: "center",
                marginLeft: "5px",
              },
              c.createElement(
                v.F,
                { scale: "M", color: "DARKER" },
                "No publication"
              )
            ),
          },
        ];
      function A(e) {
        var n = e.collection;
        return n.name
          ? c.createElement(
              E.xu,
              {
                display: "flex",
                justifyContent: "space-between",
                width: "200px",
                alignItems: "center",
                marginLeft: "5px",
              },
              c.createElement(v.F, { scale: "M", color: "DARKER" }, n.name),
              c.createElement(u.v, { collection: n, size: 32 })
            )
          : null;
      }
      function U(e) {
        var n = e.show,
          t = e.post,
          o = t.statusForCollection,
          r = t.isPublished,
          l = c.useState(!1),
          a = i()(l, 2),
          s = a[0],
          u = a[1];
        return (
          s ||
            h.V6.on("load", function () {
              return u(!0);
            }),
          !o && r && s
            ? c.createElement(
                T,
                { post: t, noQueryReturn: null },
                function (e) {
                  var o = e.loading,
                    i = e.error,
                    r = e.data;
                  if (o || i) return null;
                  var l = (void 0 === r ? { viewer: void 0 } : r).viewer,
                    a = t.creator;
                  if (!l || !a || l.id !== a.id) return null;
                  var s = l.adminCollections,
                    u = l.writerCollections;
                  return 0 === s.length && 0 === u.length
                    ? null
                    : c.createElement(
                        f.Sl,
                        null,
                        c.createElement(
                          E.rU,
                          {
                            ariaControls: _,
                            ariaExpanded: "false",
                            onClick: n,
                          },
                          "Add to publication"
                        )
                      );
                }
              )
            : null
        );
      }
      function F(e) {
        var n = e.isVisible,
          t = e.hide;
        return c.createElement(
          E.Vq,
          { isVisible: n, hide: t, withCloseButton: !0 },
          c.createElement(
            E.xu,
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "480px",
            },
            c.createElement(v.X6, { scale: "M", tag: "h3" }, "Story submitted"),
            c.createElement(
              E.xu,
              { paddingTop: "8px", paddingBottom: "24px" },
              c.createElement(
                v.QE,
                { scale: "M" },
                "We’ll email you when the publication editor has reviewed your submission."
              )
            ),
            c.createElement(E.zx, { buttonStyle: "OBVIOUS", onClick: t }, "OK")
          )
        );
      }
      var T = function (e) {
          var n = e.children,
            t = e.post,
            o = e.noQueryReturn,
            i = t.creator;
          return i
            ? c.createElement(p.I8, null, function (e) {
                return e
                  ? e.id !== i.id
                    ? o
                    : c.createElement(
                        s.AE,
                        { query: I, ssr: !1 },
                        function (e) {
                          var t = e.loading,
                            o = e.error,
                            i = e.data;
                          return n({ loading: t, error: o, data: i });
                        }
                      )
                  : o;
              })
            : o;
        },
        V = function (e) {
          var n = e.post,
            t = e.hide,
            o = e.showLoadingIndicator,
            r = e.isVisible,
            l = e.children,
            a = c.useState(!1),
            s = i()(a, 2),
            u = s[0],
            m = s[1],
            p = c.useState(""),
            f = i()(p, 2),
            g = f[0],
            b = f[1],
            C = (0, d.h3)(n),
            x = (0, d.Lf)(n);
          return (
            u ||
              h.V6.on("load", function () {
                return m(!0);
              }),
            n.isPublished && u
              ? c.createElement(E.Bn, null, function (e) {
                  var i = e.isVisible,
                    a = e.hide,
                    s = e.show;
                  return c.createElement(
                    c.Fragment,
                    null,
                    c.createElement(F, { hide: a, isVisible: i }),
                    c.createElement(
                      T,
                      { post: n, noQueryReturn: l },
                      function (e) {
                        var i = e.loading,
                          a = e.error,
                          u = e.data;
                        if (i || a) return l;
                        var d = (void 0 === u ? { viewer: void 0 } : u).viewer,
                          m = n.creator;
                        if (!d || !m || d.id !== m.id) return l;
                        var p = d.adminCollections,
                          f = d.writerCollections;
                        if (0 === p.length && 0 === f.length) return l;
                        var h = p
                            .concat(f)
                            .filter(function (e) {
                              return !!e && !!e.slug && !!e.name;
                            })
                            .map(function (e) {
                              return {
                                name: e.slug || "",
                                value: e.name || "",
                                content: c.createElement(A, { collection: e }),
                              };
                            }),
                          w = M.concat(h),
                          y = p.reduce(function (e, n) {
                            return (e[n.slug || ""] = n), e;
                          }, {}),
                          P = f.reduce(function (e, n) {
                            return (e[n.slug || ""] = n), e;
                          }, {}),
                          S = "";
                        if (g) {
                          var I = w.find(function (e) {
                            return e.name === g;
                          });
                          I && (S = I.value);
                        }
                        return c.createElement(
                          E.J2,
                          {
                            ariaId: _,
                            hide: t,
                            isVisible: r,
                            popoverRenderFn: function () {
                              return c.createElement(
                                E.xu,
                                {
                                  padding: "20px",
                                  width: "280px",
                                  display: "flex",
                                  flexDirection: "column",
                                },
                                c.createElement(
                                  v.F,
                                  { scale: "M", color: "DARKER" },
                                  "Add your story to a publication:"
                                ),
                                c.createElement(
                                  E.xu,
                                  { marginTop: "10px", position: "relative" },
                                  c.createElement(E.xu, {
                                    position: "absolute",
                                    height: "16px",
                                    width: "100%",
                                    bottom: "0",
                                    zIndex: "100",
                                    backgroundImage:
                                      "linear-gradient(transparent, #ffffff)",
                                  }),
                                  c.createElement(
                                    E.xu,
                                    { maxHeight: "160px", overflow: "auto" },
                                    c.createElement(E.Ee, {
                                      value: S,
                                      onChange: b,
                                      options: w,
                                    })
                                  )
                                ),
                                c.createElement(
                                  E.xu,
                                  { display: "flex", marginTop: "20px" },
                                  g in y
                                    ? c.createElement(
                                        E.zx,
                                        {
                                          onClick: function () {
                                            var e = y[g];
                                            t(),
                                              o(),
                                              C(e).then(function () {
                                                window.location.reload(!1);
                                              });
                                          },
                                          buttonStyle: "OBVIOUS",
                                        },
                                        "Add story"
                                      )
                                    : c.createElement(
                                        E.zx,
                                        {
                                          onClick: function () {
                                            var e = P[g];
                                            x(e), t(), s();
                                          },
                                          disabled: !g,
                                        },
                                        "Submit"
                                      ),
                                  c.createElement(
                                    E.xu,
                                    { marginLeft: "10px" },
                                    c.createElement(
                                      v.F,
                                      { scale: "M", color: "LIGHTER" },
                                      c.createElement(
                                        E.rU,
                                        { onClick: t },
                                        c.createElement(
                                          E.xu,
                                          { padding: "10px" },
                                          "Cancel"
                                        )
                                      )
                                    )
                                  )
                                ),
                                c.createElement(
                                  E.xu,
                                  { marginTop: "10px" },
                                  c.createElement(
                                    v.F,
                                    { scale: "M" },
                                    "This story will be automatically submitted to the publication. When you submit your story, the publication's editors will be notified and will be able to edit your story."
                                  )
                                )
                              );
                            },
                          },
                          l
                        );
                      }
                    )
                  );
                })
              : l
          );
        };
    },
    74871: (e, n, t) => {
      "use strict";
      t.d(n, {
        Hj: () => c,
        py: () => u,
        DM: () => d,
        a6: () => m,
        En: () => p,
      });
      var o = t(28655),
        i = t.n(o),
        r = t(71439),
        l = t(73882);
      function a() {
        var e = i()([
          "\n  fragment ManageSubmission_post on Post {\n    id\n    statusForCollection\n    collection {\n      ...ManageSubmission_collection\n    }\n    pendingCollection {\n      ...ManageSubmission_collection\n    }\n    creator {\n      id\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (a = function () {
            return e;
          }),
          e
        );
      }
      function s() {
        var e = i()([
          "\n  fragment ManageSubmission_collection on Collection {\n    name\n    creator {\n      id\n    }\n    viewerEdge {\n      id\n      isEditor\n    }\n    ...CollectionAvatar_collection\n  }\n  ",
          "\n",
        ]);
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      var c = function (e, n) {
          return n && e.creator && n.id === e.creator.id;
        },
        u = function (e, n) {
          var t = e.pendingCollection || e.collection;
          return t && t.creator && n.id === t.creator.id;
        },
        d = function (e) {
          var n = e.pendingCollection || e.collection;
          return null == n ? void 0 : n.viewerEdge.isEditor;
        },
        m = (0, r.Ps)(s(), l.d),
        p = (0, r.Ps)(a(), m);
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/7131.a44acd49.chunk.js.map
