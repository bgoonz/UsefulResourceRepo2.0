(self.webpackChunklite = self.webpackChunklite || []).push([
  [7526],
  {
    81162: (e, n, t) => {
      "use strict";
      t.d(n, { Z: () => l });
      var r = t(67294);
      function a() {
        return (a =
          Object.assign ||
          function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      var o = r.createElement(
        "g",
        { fillRule: "evenodd" },
        r.createElement("path", {
          d: "M6.93 15.34l-2.06-2.06c-2.16-2.16-3.53-3.15-2.9-3.79.33-.32.8-.39 1.2 0l2.13 2.2c.08.08.16.07.38.13.21.05.36-.05.54-.23.17-.16.07-.6-.09-.77L3.5 8.2c-.37-.36-.5-1-.1-1.39.37-.37.8-.19 1.14.15.39.38 2.7 2.76 2.7 2.76a.42.42 0 0 0 .3.13.54.54 0 0 0 .33-.16c.17-.16.25-.46.09-.63 0 0-1.34-1.4-1.82-1.88-.71-.72-.77-1.22-.46-1.54.45-.44 1.05-.3 1.86.62l3.58 3.89-.75-1.95s-.47-1.25 0-1.5.84.4 1.17.9l1.86 3.34c1.01 1.65.69 3.8-.73 5.19-1.87 1.87-4.07.87-5.73-.78zM10.26.04H8.73l.77 3.3zM13.93 1.2L12.5.7l-.4 3.36zM6.5.57l-1.44.52L6.9 3.93z",
        }),
        r.createElement("path", {
          d: "M14.3 7.03c-.34-.5-.9-.52-1.25-.24-.25.19-.21.6-.2.9l1.51 2.64c1.17 1.9 1.33 3.66 0 5.45.4-.19.52-.23.9-.61 1.52-1.52 1.86-3.32.85-4.96l-1.8-3.18z",
        })
      );
      const l = function (e) {
        return r.createElement(
          "svg",
          a({ width: 19, height: 19, viewBox: "0 0 19 19" }, e),
          o
        );
      };
    },
    14349: (e, n, t) => {
      "use strict";
      t.d(n, { Z: () => l });
      var r = t(67294);
      function a() {
        return (a =
          Object.assign ||
          function (e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      var o = r.createElement("path", {
        d: "M16.19 9.42c0 1.67-.72 2.84-2.03 4l-.1.09v.13a4.3 4.3 0 0 0 .15.85c.17.6.46 1.2.86 1.8a4.94 4.94 0 0 1-2.46-.84c-.26-.17-.33-.2-.54-.4l-.13-.12-.16.05c-.68.2-2.75.46-4.88-.16a5.9 5.9 0 0 1-4.1-5.4c0-3.37 3-6.12 6.7-6.12s6.69 2.75 6.69 6.12z",
        fillRule: "evenodd",
      });
      const l = function (e) {
        return r.createElement(
          "svg",
          a({ width: 19, height: 19, viewBox: "0 0 19 19" }, e),
          o
        );
      };
    },
    32523: (e, n, t) => {
      "use strict";
      t.d(n, { g: () => o });
      var r = t(67294),
        a = t(85432),
        o = function (e) {
          var n = e.children,
            t = e.className,
            o = void 0 === t ? "" : t,
            l = e.href,
            i = e.onClick;
          return l
            ? r.createElement(a.P3, { className: o, href: l, onClick: i }, n)
            : n;
        };
    },
    78415: (e, n, t) => {
      "use strict";
      t.d(n, { CV: () => P, zJ: () => I, KI: () => R });
      var r = t(28655),
        a = t.n(r),
        o = t(71439),
        l = t(67294),
        i = t(19692),
        u = t(48537),
        c = t(86244),
        s = t(85432),
        f = t(64504),
        p = t(28309),
        d = t(14391),
        m = t(81162),
        h = t(14349),
        g = t(27390),
        v = t(83024),
        y = t(27952);
      function E() {
        var e = a()([
          "\n  fragment InResponseToPostPreview_mediaResource on Post {\n    inResponseToMediaResource {\n      mediumQuote {\n        ...Quote_quote\n      }\n    }\n  }\n  ",
          "\n",
        ]);
        return (
          (E = function () {
            return e;
          }),
          e
        );
      }
      function x() {
        var e = a()([
          "\n  fragment InResponseToPostPreview_postResult on PostResult {\n    __typename\n    ... on Post {\n      id\n      title\n      mediumUrl\n      creator {\n        id\n        name\n      }\n      clapCount\n      responsesCount\n    }\n  }\n",
        ]);
        return (
          (x = function () {
            return e;
          }),
          e
        );
      }
      var b = function (e) {
          return { fill: e.baseColor.fill.lighter };
        },
        P = function (e) {
          var n,
            t = e.inResponseToPostResult,
            r = e.inResponseToMediaResource,
            a = e.padding,
            o = (0, p.Iq)();
          if (t)
            switch (t.__typename) {
              case "Post":
                n = t;
            }
          if (!n) return null;
          var u = n.title,
            E = n.creator && n.creator.name,
            x = parseInt(n.clapCount, 10),
            P = n.responsesCount || 0,
            I = r && r.mediumQuote && (0, v.Gj)(r.mediumQuote),
            R = I && I.type;
          if (
            R === d.NJ.IMG ||
            R === d.NJ.IFRAME ||
            R === d.NJ.COVER_TITLE ||
            R === d.NJ.HR ||
            R === d.NJ.MIXTAPE_EMBED ||
            R === d.NJ.SECTION_CAPTION
          )
            return null;
          var C = l.createElement(
            s.P3,
            { href: (0, y.jVf)(n) },
            l.createElement(
              c.Z,
              null,
              l.createElement(
                s.xu,
                { paddingLeft: "20px", paddingRight: "20px" },
                I &&
                  R &&
                  l.createElement(
                    s.xu,
                    { paddingBottom: "20px" },
                    l.createElement(i.Do, {
                      paragraph: I,
                      paragraphStyle: R,
                      spaceTop: 10,
                      richTextStyle: "STREAM",
                    })
                  ),
                l.createElement(
                  s.xu,
                  { display: "flex" },
                  l.createElement(
                    s.xu,
                    {
                      display: "flex",
                      flexGrow: "1",
                      flexShrink: "1",
                      alignItems: "center",
                    },
                    l.createElement(
                      f.F,
                      { scale: "M", color: "DARKER", clamp: 1, tag: "span" },
                      u
                    )
                  ),
                  l.createElement(
                    s.xu,
                    { display: "flex", flexGrow: "0", alignItems: "center" },
                    x > 0
                      ? l.createElement(
                          s.xu,
                          { display: "flex", alignItems: "center" },
                          l.createElement(
                            "span",
                            { className: o(b) },
                            l.createElement(s.xu, {
                              tag: m.Z,
                              marginRight: "4px",
                            })
                          ),
                          l.createElement(
                            f.F,
                            { scale: "M", tag: "div" },
                            (0, g.pY)(x)
                          )
                        )
                      : null,
                    P > 0
                      ? l.createElement(
                          s.xu,
                          { display: "flex", alignItems: "center" },
                          l.createElement(
                            "span",
                            { className: o(b) },
                            l.createElement(s.xu, {
                              tag: h.Z,
                              marginLeft: "8px",
                              marginRight: "4px",
                            })
                          ),
                          l.createElement(
                            f.F,
                            { scale: "M", tag: "div" },
                            (0, g.pY)(P)
                          )
                        )
                      : null
                  )
                ),
                l.createElement(f.F, { scale: "M" }, E)
              )
            )
          );
          return a ? l.createElement(s.xu, { padding: a }, C) : C;
        },
        I = (0, o.Ps)(x()),
        R = (0, o.Ps)(E(), u.Q);
    },
    4743: (e, n, t) => {
      "use strict";
      t.d(n, { LI: () => f, k: () => p, ke: () => d, ZV: () => m });
      var r = t(28655),
        a = t.n(r),
        o = t(71439),
        l = t(14391),
        i = t(50993);
      function u() {
        var e = a()([
          "\n  fragment GetDigestReferredCreatorPromoIndex_bodyModel on RichText {\n    paragraphs {\n      type\n      text\n    }\n  }\n",
        ]);
        return (
          (u = function () {
            return e;
          }),
          e
        );
      }
      function c() {
        var e = a()([
          "\n  fragment GetFeaturedImageIndex_bodyModel on RichText {\n    paragraphs {\n      type\n      text\n      metadata {\n        isFeatured\n      }\n    }\n  }\n",
        ]);
        return (
          (c = function () {
            return e;
          }),
          e
        );
      }
      function s() {
        var e = a()([
          "\n  fragment GetTitleIndexMap_bodyModel on RichText {\n    paragraphs {\n      type\n      text\n    }\n  }\n",
        ]);
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      var f = function (e) {
          for (
            var n = null, t = null, r = null, a = null, o = 0;
            o <= e.length;
            o++
          ) {
            var l = e[o];
            if (!l) break;
            if (null != n) {
              "H4" === l.type && (t = o),
                null === r && "IMG" === l.type && (r = o);
              break;
            }
            if ("H3" === l.type || "H2" === l.type) n = o;
            else {
              if (null != a) break;
              if ("H4" !== l.type) {
                if ("IMG" === l.type) {
                  null === r && (r = o);
                  continue;
                }
                if (
                  "IFRAME" === l.type ||
                  ("P" === l.type &&
                    "string" == typeof l.text &&
                    (0, i.vV)(l.text))
                )
                  continue;
                break;
              }
              a = o;
            }
          }
          return { titleIndex: n, subtitleIndex: t, bannerImageIndex: r };
        },
        p = (0, o.Ps)(s()),
        d = (0, o.Ps)(c()),
        m = function (e) {
          for (var n = null, t = [], r = 0; r < e.length; r++)
            h(e[r]) &&
              (n || (n = r), r < e.length - 1 && h(e[r + 1]) && t.push(r));
          return 0 === t.length
            ? { index: n, ordering: "before" }
            : { index: t[Math.min(t.length - 1, 1)], ordering: "after" };
        },
        h = function (e) {
          return (
            e.type === l.NJ.P && "string" == typeof e.text && !(0, i.vV)(e.text)
          );
        };
      (0, o.Ps)(u());
    },
    50077: (e, n, t) => {
      "use strict";
      t.d(n, {
        u_: () => N,
        yu: () => k,
        br: () => D,
        We: () => j,
        Gk: () => F,
      });
      var r = t(28655),
        a = t.n(r),
        o = t(63038),
        l = t.n(o),
        i = t(71439),
        u = t(67294),
        c = t(10734),
        s = t(32523),
        f = t(95482),
        p = t(92013),
        d = t(31635),
        m = t(9292),
        h = t(41832),
        g = t(22091),
        v = t(64504),
        y = t(98701),
        E = t(28309),
        x = t(67297),
        b = t(7650),
        P = t(27952);
      function I() {
        var e = a()([
          "\n  fragment CardByline_publisher on Publisher {\n    __typename\n    ... on User {\n      id\n      ...CardByline_user\n    }\n    ... on Collection {\n      id\n      ...CardByline_collection\n    }\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (I = function () {
            return e;
          }),
          e
        );
      }
      function R() {
        var e = a()([
          "\n  fragment CardByline_collection on Collection {\n    __typename\n    id\n    name\n    ...collectionUrl_collection\n  }\n  ",
          "\n",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      function C() {
        var e = a()([
          "\n  fragment CardByline_user on User {\n    __typename\n    id\n    name\n    username\n    mediumMemberAt\n    socialStats {\n      followerCount\n    }\n    viewerEdge {\n      createdAt\n      lastPostCreatedAt\n    }\n    ...userUrl_user\n    ...UserMentionTooltip_user\n  }\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (C = function () {
            return e;
          }),
          e
        );
      }
      function O() {
        var e = a()([
          "\n  fragment CardByline_post on Post {\n    ...DraftStatus_post\n  }\n  ",
          "\n",
        ]);
        return (
          (O = function () {
            return e;
          }),
          e
        );
      }
      var _ = function (e) {
        return {
          fill: e.baseColor.fill.light,
          marginTop: "-2px",
          paddingLeft: "4px",
        };
      };
      function M(e, n) {
        return n && (0, y.nE)(e) ? e[n] : e;
      }
      var w = function (e) {
          var n = e.author,
            t = e.forceSize,
            r = e.scale,
            a = void 0 === r ? "M" : r,
            o = (0, x.v9)(function (e) {
              return e.config.authDomain;
            }),
            i = u.useState(0),
            c = l()(i, 2),
            f = c[0],
            p = c[1],
            d = (0, E.Fg)();
          if (
            (u.useEffect(function () {
              f || p(window.innerWidth);
            }, []),
            !n || !n.name)
          )
            return null;
          var m = f <= d.breakpoints.sm,
            y = u.createElement(
              s.g,
              { href: (0, P.AWr)(n, o) },
              u.createElement(v.F, { color: "ACCENT", scale: M(a, t) }, n.name)
            );
          return m
            ? y
            : u.createElement(
                g.$W,
                {
                  placement: "right",
                  targetDistance: 15,
                  mouseLeaveDelay: 200,
                  popoverRenderFn: function () {
                    return u.createElement(h.K$, { user: n });
                  },
                },
                y
              );
        },
        T = function (e) {
          var n = e.collection,
            t = e.forceSize,
            r = e.scale,
            a = void 0 === r ? "M" : r,
            o = (0, x.v9)(function (e) {
              return e.config.authDomain;
            }),
            l = (0, x.v9)(function (e) {
              return e.navigation.currentLocation;
            });
          if (!n) return null;
          var i = (0, P.WGd)(n, l, o);
          return u.createElement(
            s.g,
            { href: i },
            u.createElement(
              v.F,
              { scale: M(a, t), color: "DARKER" },
              "Published in ",
              u.createElement(c.t, { collection: n })
            )
          );
        },
        S = function (e) {
          var n = e.small,
            t = void 0 !== n && n,
            r = e.hideDot,
            a = void 0 !== r && r,
            o = (0, E.Iq)();
          return u.createElement(
            "span",
            { className: o({ margin: "0 ".concat(t ? 4 : 7, "px") }) },
            a ? null : "·"
          );
        },
        A = function (e) {
          var n = e.datePrefix,
            t = void 0 === n ? "" : n,
            r = e.forceSize,
            a = e.isOneLine,
            o = e.withMidDot,
            l = void 0 === o || o,
            i = e.href,
            c = e.onClick,
            m = e.publishedAt,
            h = e.scale,
            g = void 0 === h ? "M" : h,
            y = e.showStar,
            x = void 0 !== y && y,
            P = e.showPinned,
            I = void 0 !== P && P,
            R = e.timeColor,
            C = void 0 === R ? "LIGHTER" : R,
            O = e.timeToRead,
            w = e.post,
            T = (0, E.Iq)();
          if (!m && !O) return null;
          var A = a ? p.h : f.E;
          return u.createElement(
            s.g,
            { href: i, onClick: c },
            u.createElement(
              v.F,
              { color: C, scale: M(g, r) },
              a && l && u.createElement(S, { small: !0, hideDot: !!O && !!m }),
              m && !I
                ? u.createElement(
                    u.Fragment,
                    null,
                    t,
                    u.createElement(A, {
                      hasPrefix: !(!a || !t) || void 0,
                      timestamp: m,
                    })
                  )
                : null,
              I ? u.createElement("span", null, "Pinned") : null,
              m && O ? u.createElement(S, null) : null,
              O || null,
              !m &&
                u.createElement(
                  u.Fragment,
                  null,
                  u.createElement(S, { small: a }),
                  u.createElement(
                    v.F,
                    { color: "DARKER", scale: M(g, r), tag: "span" },
                    u.createElement(d.FV, { post: w })
                  )
                ),
              x && u.createElement(b.Z, { className: T(_) })
            )
          );
        },
        N = function (e) {
          var n = e.avatar,
            t = void 0 === n ? null : n,
            r = e.datePrefix,
            a = e.forceSize,
            o = e.hideAuthor,
            l = void 0 !== o && o,
            i = e.href,
            c = e.onClick,
            s = e.isOneLine,
            f = void 0 !== s && s,
            p = e.publisher,
            d = e.publishedAt,
            h = e.scale,
            g = e.showStar,
            v = void 0 !== g && g,
            y = e.showPinned,
            E = void 0 !== y && y,
            x = e.timeColor,
            b = e.timeToRead,
            P = e.post,
            I =
              "Collection" === p.__typename
                ? u.createElement(T, { collection: p, forceSize: a, scale: h })
                : l
                ? null
                : u.createElement(w, { author: p, forceSize: a, scale: h }),
            R = "Collection" === p.__typename || !l;
          return u.createElement(m.Y, {
            avatar: l ? null : t,
            isOneLine: f,
            title: I,
            description: u.createElement(A, {
              datePrefix: r,
              publishedAt: d,
              timeToRead: b,
              withMidDot: R,
              href: i,
              onClick: c,
              showStar: v,
              showPinned: E,
              forceSize: a,
              scale: h,
              timeColor: x,
              isOneLine: f,
              post: P,
            }),
          });
        },
        k = (0, i.Ps)(O(), d.tV),
        D = (0, i.Ps)(C(), P.$mN, h.OJ),
        j = (0, i.Ps)(R(), P.nfI),
        F = (0, i.Ps)(I(), D, j);
    },
    48537: (e, n, t) => {
      "use strict";
      t.d(n, { p: () => O, Q: () => _ });
      var r = t(28655),
        a = t.n(r),
        o = t(34575),
        l = t.n(o),
        i = t(93913),
        u = t.n(i),
        c = t(2205),
        s = t.n(c),
        f = t(78585),
        p = t.n(f),
        d = t(29754),
        m = t.n(d),
        h = t(71439),
        g = t(67294),
        v = t(12291),
        y = t(19692),
        E = t(85432),
        x = t(64504),
        b = t(14391),
        P = t(83024),
        I = t(27952);
      function R() {
        var e = a()([
          "\n  fragment Quote_quote on Quote {\n    quoteId\n    userId\n    post {\n      id\n      title\n      mediumUrl\n      creator {\n        id\n        username\n        name\n        ...userUrl_user\n      }\n    }\n    startOffset\n    endOffset\n    paragraphs {\n      text\n      type\n      markups {\n        anchorType\n        end\n        href\n        rel\n        start\n        title\n        type\n        userId\n      }\n      ...TextParagraph_paragraph\n    }\n    ...buildQuotePreviewParagraph_quote\n  }\n  ",
          "\n  ",
          "\n  ",
          "\n",
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      var C = (function (e) {
          s()(a, e);
          var n,
            t,
            r =
              ((n = a),
              (t = (function () {
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
                  r = m()(n);
                if (t) {
                  var a = m()(this).constructor;
                  e = Reflect.construct(r, arguments, a);
                } else e = r.apply(this, arguments);
                return p()(this, e);
              });
          function a() {
            return l()(this, a), r.apply(this, arguments);
          }
          return (
            u()(a, [
              {
                key: "render",
                value: function () {
                  var e = this.props,
                    n = e.quote,
                    t = e.authDomain;
                  if (
                    !n ||
                    null == n.startOffset ||
                    null == n.endOffset ||
                    !n.post ||
                    !n.post.id
                  )
                    return null;
                  var r = n.post.title,
                    a = n.post.creator && n.post.creator.name,
                    o = n.post.creator && n.post.creator.username;
                  if (!a || !o) return null;
                  var l = (0, P.Gj)(n),
                    i = l && l.type;
                  return l && i
                    ? i === b.NJ.IMG ||
                      i === b.NJ.IFRAME ||
                      i === b.NJ.COVER_TITLE ||
                      i === b.NJ.HR ||
                      i === b.NJ.MIXTAPE_EMBED ||
                      i === b.NJ.SECTION_CAPTION
                      ? null
                      : g.createElement(
                          E.xu,
                          { paddingLeft: "20px", paddingRight: "20px" },
                          g.createElement(
                            x.F,
                            { scale: "M", tag: "span" },
                            "From",
                            " ",
                            g.createElement(
                              E.rU,
                              { href: (0, I.jVf)(n.post), inline: !0 },
                              r
                            ),
                            " ",
                            "by",
                            " ",
                            g.createElement(
                              E.rU,
                              {
                                href: (0, I.AWr)(n.post.creator, t),
                                inline: !0,
                              },
                              a
                            )
                          ),
                          g.createElement(
                            E.P3,
                            { href: (0, I.jVf)(n.post) },
                            g.createElement(y.Do, {
                              paragraph: l,
                              paragraphStyle: i,
                              spaceTop: 30,
                              richTextStyle: "STREAM",
                            })
                          )
                        )
                    : null;
                },
              },
            ]),
            a
          );
        })(g.Component),
        O = (0, v.$j)(function (e) {
          return { authDomain: e.config.authDomain };
        })(C),
        _ = (0, h.Ps)(R(), y.Rg, P.Sz, I.$mN);
    },
    86244: (e, n, t) => {
      "use strict";
      t.d(n, { Z: () => l });
      var r = t(67294),
        a = t(85432),
        o = t(28309),
        l = function (e) {
          var n = e.children,
            t = (0, o.Fg)();
          return r.createElement(
            a.xu,
            {
              backgroundColor: "BACKGROUND",
              border: "BASE_LIGHTER",
              borderRadius: "5px",
              boxShadow: "0 1px 4px ".concat(t.baseColor.border.lighter),
              marginBottom: "24px",
              padding: "23px 0",
            },
            n
          );
        };
    },
    83024: (e, n, t) => {
      "use strict";
      t.d(n, { Gj: () => h, eu: () => g, Sz: () => v });
      var r = t(28655),
        a = t.n(r),
        o = t(59713),
        l = t.n(o),
        i = t(50361),
        u = t.n(i),
        c = t(71439),
        s = t(14391);
      function f() {
        var e = a()([
          "\n  fragment buildQuotePreviewParagraph_quote on Quote {\n    paragraphs {\n      id\n      text\n      type\n      markups {\n        end\n        start\n        type\n      }\n    }\n    startOffset\n    endOffset\n  }\n",
        ]);
        return (
          (f = function () {
            return e;
          }),
          e
        );
      }
      function p(e, n) {
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
      function d(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? p(Object(t), !0).forEach(function (n) {
                l()(e, n, t[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
            : p(Object(t)).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(t, n)
                );
              });
        }
        return e;
      }
      function m(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
        return r;
      }
      var h = function (e) {
          var n = 100;
          if (1 !== e.paragraphs.length) return null;
          var t = u()(e.paragraphs[0]),
            r = t.text || "",
            a = 0,
            o = e.startOffset || 0,
            l = e.endOffset || r.length;
          if ((r.length - l > n && (r = r.substring(0, l + n) + "…"), o > n)) {
            var i = o - n;
            (r = "…" + r.substring(i)), (a = i - 1);
          }
          (t.text = r),
            (t.type = s.NJ.P),
            t.markups.unshift({ end: l, start: o, type: s.Jh.HIGHLIGHT });
          var c,
            f = (function (e, n) {
              var t;
              if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
                if (
                  Array.isArray(e) ||
                  (t = (function (e, n) {
                    if (e) {
                      if ("string" == typeof e) return m(e, n);
                      var t = Object.prototype.toString.call(e).slice(8, -1);
                      return (
                        "Object" === t &&
                          e.constructor &&
                          (t = e.constructor.name),
                        "Map" === t || "Set" === t
                          ? Array.from(e)
                          : "Arguments" === t ||
                            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                          ? m(e, n)
                          : void 0
                      );
                    }
                  })(e)) ||
                  (n && e && "number" == typeof e.length)
                ) {
                  t && (e = t);
                  var r = 0,
                    a = function () {};
                  return {
                    s: a,
                    n: function () {
                      return r >= e.length
                        ? { done: !0 }
                        : { done: !1, value: e[r++] };
                    },
                    e: function (e) {
                      throw e;
                    },
                    f: a,
                  };
                }
                throw new TypeError(
                  "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                );
              }
              var o,
                l = !0,
                i = !1;
              return {
                s: function () {
                  t = e[Symbol.iterator]();
                },
                n: function () {
                  var e = t.next();
                  return (l = e.done), e;
                },
                e: function (e) {
                  (i = !0), (o = e);
                },
                f: function () {
                  try {
                    l || null == t.return || t.return();
                  } finally {
                    if (i) throw o;
                  }
                },
              };
            })(t.markups);
          try {
            for (f.s(); !(c = f.n()).done; ) {
              var p = c.value;
              (p.start -= a), (p.end -= a);
            }
          } catch (e) {
            f.e(e);
          } finally {
            f.f();
          }
          return t;
        },
        g = function (e) {
          if (1 !== e.paragraphs.length) return null;
          var n = e.paragraphs[0].text || "",
            t = e.startOffset || 0,
            r = e.endOffset || n.length,
            a = n.slice(t, r);
          return (
            a.length >= 185 && (a = a.substring(0, 185) + "..."),
            d(
              d({}, e.paragraphs[0]),
              {},
              {
                text: a,
                type: s.NJ.P,
                markups: [
                  {
                    end: a.length,
                    start: 0,
                    type: s.Jh.HIGHLIGHT,
                    anchorType: null,
                    href: null,
                    linkMetadata: null,
                    userId: null,
                  },
                ],
                hasDropCap: null,
                dropCapImage: null,
              }
            )
          );
        },
        v = (0, c.Ps)(f());
    },
    50993: (e, n, t) => {
      "use strict";
      t.d(n, { vV: () => r, N8: () => a });
      var r = function (e) {
          return /^[\s\xa0]*$/.test(e);
        },
        a = function (e, n) {
          if (e.length < n) return e;
          var t = e.substr(0, n),
            r = t.charCodeAt(t.length - 1),
            a = t.charCodeAt(t.length - 2);
          return (
            r >= 55296 &&
              r <= 57343 &&
              !(a >= 55296 && a <= 57343) &&
              (t = t.substr(0, t.length - 1)),
            (t = (t = t.replace(/(\s+\S+|\s+)$/, "")).replace(
              /[.,:;?!-]+$/,
              ""
            )) + "…"
          );
        };
    },
  },
]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/7526.fc3aa41e.chunk.js.map
