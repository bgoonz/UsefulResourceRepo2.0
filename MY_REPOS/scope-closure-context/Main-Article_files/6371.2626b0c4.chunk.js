(self.webpackChunklite = self.webpackChunklite || []).push([
  [6371],
  {
    94093: (e, t, n) => {
      "use strict";
      n.d(t, { I: () => m });
      var r,
        o = n(59713),
        i = n.n(o),
        a = n(67294),
        s = n(85432),
        l = n(64504);
      !(function (e) {
        (e.S = "S"), (e.L = "L");
      })(r || (r = {}));
      var c = n(28309),
        u = n(80637),
        d = n(67122),
        m = function (e) {
          var t = e.children,
            n = e.scale,
            o = void 0 === n ? r.L : n,
            m = e.alpha,
            p = void 0 === m ? 0.05 : m,
            f = e.verticalMargins,
            g = void 0 === f ? { normal: "24px", small: "24px" } : f,
            E = (0, c.Iq)();
          return a.createElement(
            "div",
            {
              className: E(function (e) {
                return i()(
                  {
                    background: (0, d.Uy)(p),
                    borderRadius: "4px",
                    margin: "".concat(g.normal, " -16px"),
                    position: "relative",
                  },
                  u.sm(e),
                  { margin: "".concat(g.small, " -12px 0") }
                );
              }),
            },
            a.createElement(
              s.xu,
              {
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "740px",
                padding: "16px",
                sm: { padding: "12px" },
              },
              a.createElement(l.F, { scale: o, color: "DARKER" }, t)
            )
          );
        };
    },
    66371: (e, t, n) => {
      "use strict";
      n.d(t, { Cs: () => $, Dj: () => z });
      var r = n(28655),
        o = n.n(r),
        i = n(71439),
        a = n(67294),
        s = n(28859),
        l = n(63038),
        c = n.n(l),
        u = n(46829),
        d = n(94093),
        m = n(64235),
        p = n(85432),
        f = n(27599),
        g = n(27572),
        E = n(28309),
        x = n(72955);
      function v() {
        var e = o()([
          "\n  fragment DigestReferredPostBodyCreatorPromo_user on User {\n    id\n    name\n    viewerEdge {\n      id\n      isFollowing\n    }\n  }\n",
        ]);
        return (
          (v = function () {
            return e;
          }),
          e
        );
      }
      var _ = (0, i.Ps)(v()),
        h = function (e) {
          var t = e.creator,
            n = e.postId,
            r = a.useRef(null),
            o = (0, E.Iq)(),
            i = (0, u.useMutation)(m.L, { variables: { targetUserId: t.id } }),
            s = c()(i, 1)[0],
            l = (0, u.useMutation)(m.g, { variables: { targetUserId: t.id } }),
            v = c()(l, 1)[0],
            _ = (0, f.Av)(),
            h = "post_body_cta",
            I = a.useCallback(
              function () {
                return (
                  _.event("user.followed", {
                    targetUserId: t.id,
                    followSource: h,
                  }),
                  s()
                );
              },
              [t.id, h, s]
            ),
            y = a.useCallback(
              function () {
                return (
                  _.event("user.unfollowed", {
                    targetUserId: t.id,
                    followSource: h,
                  }),
                  v()
                );
              },
              [t.id, h, v]
            ),
            b = (0, g.pK)(),
            R = !1,
            T = function () {
              !R &&
                P() &&
                (_.event("post.digestReferredFollowCreatorPromoViewed", {
                  postId: n,
                  targetUserId: t.id,
                  source: b,
                }),
                (R = !0));
            },
            P = function () {
              var e;
              if (!r.current) return !1;
              var t =
                  null === (e = r.current) || void 0 === e
                    ? void 0
                    : e.getBoundingClientRect(),
                n = t.top + t.height / 2;
              return n >= 0 && n <= window.innerHeight;
            };
          a.useEffect(function () {
            return (
              T(),
              window && x.V6.on("scroll", T),
              function () {
                x.V6.off("scroll", T);
              }
            );
          }, []);
          var w = t.viewerEdge.isFollowing;
          return a.createElement(
            "div",
            { ref: r },
            a.createElement(
              d.I,
              {
                alpha: 0.02,
                verticalMargins: { normal: "42px", small: "28px" },
              },
              w
                ? a.createElement(
                    a.Fragment,
                    null,
                    "You’re now following ",
                    t.name,
                    ".",
                    " ",
                    a.createElement(
                      p.rU,
                      { onClick: y, inline: !0, linkStyle: "OBVIOUS" },
                      "Unfollow"
                    )
                  )
                : a.createElement(
                    a.Fragment,
                    null,
                    "You've read a few stories by this writer.",
                    " ",
                    a.createElement(
                      "span",
                      { className: o({ fontWeight: "bold" }) },
                      a.createElement(
                        p.rU,
                        { onClick: I, linkStyle: "OBVIOUS" },
                        "Follow ",
                        t.name
                      )
                    ),
                    " ",
                    "to see more of their stories across Medium."
                  )
            )
          );
        },
        I = n(78415),
        y = n(4743),
        b = n(47875),
        R = n(50493),
        T = n(88065),
        P = n(47713),
        w = n(57131),
        L = n(85828),
        C = n(50077),
        S = n(49925),
        B = n(85740),
        k = n(55077),
        M = n(98281),
        N = n(41832),
        O = n(22091),
        D = n(6688),
        U = n(27390);
      function A() {
        var e = o()([
          "\n  fragment PostBodyInserts_post on Post {\n    collection {\n      ...auroraHooks_publisher\n    }\n    creator {\n      ...auroraHooks_publisher\n      ...DigestReferredPostBodyCreatorPromo_user\n      ...UserMentionTooltip_user\n    }\n    isPublished\n    isShortform\n    # please note that postMeteringOptions is defined in PostHandler, which uses PostBodyInserts\n    content(postMeteringOptions: $postMeteringOptions) {\n      bodyModel {\n        paragraphs {\n          name\n          text\n          type\n        }\n      }\n    }\n    ...CardByline_post\n    ...PostByline_post\n    ...PostFooterSocialPopover_post\n    ...ShareButtons_post\n    ...BookmarkButton_post\n    ...CreatorActionOverflowPopover_post\n  }\n  ",
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
          (A = function () {
            return e;
          }),
          e
        );
      }
      var F = function () {
        return null;
      };
      function G(e) {
        var t = e.post,
          n = (0, D.I)(),
          r = (0, S.GT)(t.collection || t.creator),
          o = { marginTop: "32px" },
          i = { post: t, source: { name: "post_actions_header" } };
        return a.createElement(
          s.TA,
          {
            className: n(o),
            name: "byline",
            type: "byline",
            offset: { left: -600 },
          },
          a.createElement(
            p.xu,
            {
              display: "flex",
              justifyContent: "space-between",
              xs: { marginTop: o.marginTop },
              sm: { flexDirection: "column-reverse", marginTop: o.marginTop },
            },
            r && t.creator
              ? a.createElement(C.u_, {
                  avatar: a.createElement(M.Yt, {
                    user: t.creator,
                    scale: "XXS",
                    link: !0,
                    withHalo: !0,
                  }),
                  publisher: t.creator,
                  href: t.mediumUrl || void 0,
                  isOneLine: !0,
                  publishedAt: t.firstPublishedAt,
                  showStar: !!t.isLocked,
                  timeToRead:
                    !t.isShortform && t.readingTime
                      ? "".concat((0, U.Vd)(t.readingTime), " min read")
                      : void 0,
                  post: t,
                })
              : a.createElement(b.G, {
                  scale: "M",
                  post: t,
                  showBio: !1,
                  hideCollection: !0,
                }),
            a.createElement(
              p.xu,
              {
                display: "flex",
                alignItems: "flex-end",
                print: { display: "none" },
                xs: { marginLeft: "0px", marginBottom: "30px" },
                sm: { marginLeft: "0px", marginBottom: "30px" },
                md: { marginLeft: "30px" },
                lg: { marginLeft: "30px" },
                xl: { marginLeft: "30px" },
              },
              a.createElement(
                p.xu,
                { display: "flex", alignItems: "center" },
                t.isPublished &&
                  (!r || !t.isShortform) &&
                  a.createElement(
                    a.Fragment,
                    null,
                    r
                      ? a.createElement(
                          p.xu,
                          { paddingRight: "8px" },
                          a.createElement(L.$, i)
                        )
                      : a.createElement(k.n, i),
                    a.createElement(
                      p.xu,
                      { marginRight: "8px" },
                      a.createElement(
                        g.cW,
                        { source: { name: "post_actions_header" } },
                        a.createElement(P.o, {
                          post: t,
                          susiEntry: "bookmark_preview",
                        })
                      )
                    ),
                    t &&
                      a.createElement(
                        p.xu,
                        { flexGrow: "1" },
                        a.createElement(p.Bn, null, function (e) {
                          var n = e.show;
                          return a.createElement(w.Z, {
                            creator: null == t ? void 0 : t.creator,
                            post: t,
                            collection: null == t ? void 0 : t.collection,
                            showLoadingIndicator: n,
                          });
                        })
                      )
                  )
              )
            )
          )
        );
      }
      function K(e, t) {
        return "".concat(t, "_").concat(e[t] ? e[t].length : 0);
      }
      function V(e, t, n, r, o) {
        e[t] || (e[t] = []),
          e[t].push({ order: n, component: r, insertType: o });
      }
      function W(e, t, n) {
        return function (r) {
          var o = "number" == typeof n.titleIndex,
            i = n.subtitleIndex || n.titleIndex || 0,
            s = t[i] && t[i].name,
            l = !(!e.inResponseToPostResult && !e.inResponseToMediaResource);
          if (s && 0 === i && !o) {
            var c = a.createElement(
              p.xu,
              null,
              a.createElement(G, {
                post: e,
                key: "insert_postBylineGroupComponent_".concat(K(r, "first")),
              }),
              l &&
                a.createElement(I.CV, {
                  inResponseToPostResult: e.inResponseToPostResult,
                  inResponseToMediaResource: e.inResponseToMediaResource,
                  padding: "42px 0 0",
                })
            );
            V(
              r,
              "first",
              "before",
              a.createElement(
                O.Pm,
                {
                  size: "inset",
                  key: "insert_MaxWidth_PostBylineGroupComponent_".concat(
                    K(r, "first")
                  ),
                },
                c
              ),
              "BYLINE"
            );
          } else if (
            s &&
            (V(
              r,
              s,
              "after",
              a.createElement(G, {
                post: e,
                key: "insert_PostBylineGroupComponent_".concat(K(r, s)),
              }),
              "BYLINE"
            ),
            l)
          ) {
            var u = a.createElement(I.CV, {
              inResponseToPostResult: e.inResponseToPostResult,
              inResponseToMediaResource: e.inResponseToMediaResource,
              padding: "42px 0 0",
            });
            V(
              r,
              "first",
              "before",
              a.createElement(
                O.Pm,
                {
                  size: "inset",
                  key: "insert_MaxWidth_ResponseMixtapeComponent_".concat(
                    K(r, "first")
                  ),
                },
                u
              ),
              "RESPONSE_MIXTAPE"
            );
          }
          return r;
        };
      }
      function H(e, t, n) {
        return (0, R.tE)(e)
          ? function (r) {
              var o = "number" == typeof n.titleIndex,
                i = Math.max(
                  n.bannerImageIndex || n.subtitleIndex || n.titleIndex || 0,
                  n.subtitleIndex || n.titleIndex || 0
                ),
                s = t[i] && t[i].name;
              if (s && 0 === i && !o) {
                var l = a.createElement(R.o5, {
                  post: e,
                  mode: "INLINE",
                  key: "insert_TOC_".concat(K(r, "first")),
                });
                V(
                  r,
                  "first",
                  "before",
                  a.createElement(
                    O.Pm,
                    {
                      size: "inset",
                      key: "insert_MaxWidth_TableOfContents_".concat(
                        K(r, "first")
                      ),
                    },
                    l
                  ),
                  "TABLE_OF_CONTENTS"
                );
              } else
                s &&
                  V(
                    r,
                    s,
                    "after",
                    a.createElement(R.o5, {
                      post: e,
                      mode: "INLINE",
                      key: "insert_TableOfContents_".concat(K(r, s)),
                    }),
                    "TABLE_OF_CONTENTS"
                  );
              return r;
            }
          : function (e) {
              return e;
            };
      }
      function Y(e, t, n) {
        var r = (0, y.ZV)(t),
          o = r.index,
          i = r.ordering;
        return "number" == typeof o && n
          ? function (n) {
              var r = t[o] && t[o].name,
                s = a.createElement(h, {
                  creator: e.creator,
                  postId: e.id,
                  key: "insert_DigestReferredPostBodyCreatorPromo_".concat(
                    K(n, r)
                  ),
                }),
                l = a.createElement(
                  B.bZ,
                  {
                    name: "enable_digest_referred_follow_cta",
                    placeholder: F,
                    key: "insert_WithClientFlag_DigestReferredPostBodyCreatorPromo_".concat(
                      K(n, r)
                    ),
                  },
                  function (e) {
                    return e ? s : null;
                  }
                );
              return V(n, r, i, l, "DIGEST_REFERRED_CREATOR_PROMO"), n;
            }
          : function (e) {
              return e;
            };
      }
      function z(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n =
            (e &&
              e.content &&
              e.content.bodyModel &&
              e.content.bodyModel.paragraphs) ||
            void 0;
        if (n) {
          var r = (0, y.LI)(n);
          return [W(e, n, r), H(e, n, r), Y(e, n, t)].reduce(function (e, t) {
            return t(e);
          }, {});
        }
      }
      var $ = (0, i.Ps)(A(), S.C5, _, C.yu, b.H, L.u, k.$, T.z, w.G, N.OJ);
    },
    55077: (e, t, n) => {
      "use strict";
      n.d(t, { $: () => d, n: () => m });
      var r = n(28655),
        o = n.n(r),
        i = n(71439),
        a = n(67294),
        s = n(51607),
        l = n(85432),
        c = n(27572);
      function u() {
        var e = o()([
          "\n  fragment ShareButtons_post on Post {\n    id\n    isLimitedState\n    visibility\n    ...ShareButton_post\n  }\n  ",
          "\n",
        ]);
        return (
          (u = function () {
            return e;
          }),
          e
        );
      }
      var d = (0, i.Ps)(u(), s.M);
      function m(e) {
        var t = e.post,
          n = e.source,
          r = "UNLISTED" === t.visibility;
        return a.createElement(
          c.cW,
          { source: n },
          a.createElement(
            l.xu,
            { flexGrow: "0", paddingRight: "6px" },
            !r &&
              a.createElement(s.T, {
                socialPlatform: "TWITTER",
                buttonStyle: t.isLimitedState ? "LINK_DISABLED" : "LINK",
                post: t,
              })
          ),
          a.createElement(
            l.xu,
            { flexGrow: "0", paddingRight: "6px" },
            !r &&
              a.createElement(s.T, {
                socialPlatform: "LINKEDIN",
                buttonStyle: t.isLimitedState ? "LINK_DISABLED" : "LINK",
                post: t,
              })
          ),
          a.createElement(
            l.xu,
            { flexGrow: "0", paddingRight: "6px" },
            !r &&
              a.createElement(s.T, {
                socialPlatform: "FACEBOOK",
                buttonStyle: t.isLimitedState ? "LINK_DISABLED" : "LINK",
                post: t,
              })
          )
        );
      }
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/6371.2626b0c4.chunk.js.map
