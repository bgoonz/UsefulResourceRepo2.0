_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [56],
  {
    "8s4c": function (t, e, a) {
      "use strict";
      a.r(e);
      var n = a("VtSi"),
        i = a.n(n),
        o = a("QsI/"),
        c = a("9fIP"),
        s = a("MMYH"),
        r = a("pWxA"),
        l = a("8K1b"),
        u = a("K/z8"),
        d = a("sRHE"),
        x = a("zjfJ"),
        p = a("ERkP"),
        f = a.n(p),
        m = a("aWzz"),
        h = a.n(m),
        b = a("p/5q"),
        v = a.n(b),
        j = a("StS/"),
        w = a("Ij73"),
        _ = a("Xp8U"),
        g = a("dio+"),
        y = f.a.createElement;
      function k(t) {
        var e = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var a,
            n = Object(d.a)(t);
          if (e) {
            var i = Object(d.a)(this).constructor;
            a = Reflect.construct(n, arguments, i);
          } else a = n.apply(this, arguments);
          return Object(u.a)(this, a);
        };
      }
      var T = (function (t) {
        Object(l.a)(a, t);
        var e = k(a);
        function a() {
          var t;
          Object(c.a)(this, a);
          for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
            i[o] = arguments[o];
          return (
            (t = e.call.apply(e, [this].concat(i))),
            Object(x.a)(Object(r.a)(t), "render", function () {
              return y(j.a, t.props);
            }),
            t
          );
        }
        return (
          Object(s.a)(
            a,
            [
              {
                key: "getChildContext",
                value: function () {
                  return { asPath: this.props.asPath };
                },
              },
            ],
            [
              {
                key: "getInitialProps",
                value: (function () {
                  var t = Object(o.a)(
                    i.a.mark(function t(e) {
                      var a, n, o, c, s;
                      return i.a.wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (a = e.store),
                                (n = e.query),
                                (o = e.asPath),
                                (c = e.req),
                                (s = e.res),
                                (t.next = 3),
                                Object(g.a)({ store: a, req: c })
                              );
                            case 3:
                              return (
                                (t.next = 5),
                                a.dispatch(
                                  Object(_.m)({
                                    modelName: "Tutorial",
                                    slug: n.slug,
                                    res: s,
                                  })
                                )
                              );
                            case 5:
                              return (
                                a.dispatch(Object(_.F)()),
                                t.abrupt("return", { asPath: o })
                              );
                            case 7:
                            case "end":
                              return t.stop();
                          }
                      }, t);
                    })
                  );
                  return function (e) {
                    return t.apply(this, arguments);
                  };
                })(),
              },
            ]
          ),
          a
        );
      })(p.Component);
      Object(x.a)(T, "childContextTypes", { asPath: h.a.string });
      e.default = v()(
        w.a,
        function (t) {
          var e = t.content;
          t.auth;
          return { content: e };
        },
        function (t) {
          return {};
        }
      )(T);
    },
    "StS/": function (t, e, a) {
      "use strict";
      a.d(e, "a", function () {
        return E;
      });
      var n = a("yFcC"),
        i = a.n(n),
        o = a("ERkP"),
        c = a.n(o),
        s = a("jvFD"),
        r = a.n(s),
        l = a("O94r"),
        u = a.n(l),
        d = a("4/WF"),
        x = a("PJI/"),
        p = a("co3k"),
        f = a("ug5E"),
        m = a("Oybk"),
        h = a("JLdz"),
        b = a("PiLd"),
        v = a("n+Gg"),
        j = a("boDD"),
        w = a("2lh8"),
        _ = a("dHuf"),
        g = a("HSPt"),
        y = a("bdUv"),
        k = a("jscJ"),
        T = a("iLAp"),
        N = [
          ".Tutorial.jsx-1851940463{margin:0 0px 30px;padding:20px 0 0;background-color:".concat(
            T.a.white,
            ";display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}"
          ),
          ".preface.jsx-1851940463{margin:0 20px;}",
          ".author.jsx-1851940463{margin-bottom:10px;}",
          "h1.jsx-1851940463{margin-top:20px;}",
          ".illustration.jsx-1851940463{margin-bottom:30px;}",
          ".illustration.jsx-1851940463 img.jsx-1851940463{max-width:100%;}",
          ".Tutorial.jsx-1851940463 .social__top .voteAndSocial,.social__bottom.jsx-1851940463 .voteAndSocial.jsx-1851940463{padding:40px 20px 20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:flex-end;-webkit-box-align:flex-end;-ms-flex-align:flex-end;align-items:flex-end;}",
          ".Tutorial.jsx-1851940463 .voteAndSocial.jsx-1851940463>div.jsx-1851940463{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}",
          ".Tutorial.jsx-1851940463 .voteAndSocial.jsx-1851940463>div.jsx-1851940463 .CommentCounter{margin-left:10px;}",
          "@media (min-width:800px){.Tutorial.jsx-1851940463{margin:0 auto 30px;padding:30px 100px 100px;max-width:1120px;border-radius:4px;border:1px solid ".concat(
            T.a.border,
            ";}.preface.jsx-1851940463{margin:0;}.Tutorial.jsx-1851940463 .social__top{position:absolute;margin-top:220px;}.Tutorial.jsx-1851940463 .social__top .voteAndSocial{position:absolute;left:-100px;top:0;width:100px;height:auto;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.Tutorial.jsx-1851940463 .voteAndSocial.jsx-1851940463>div.jsx-1851940463{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.Tutorial.jsx-1851940463 .voteAndSocial > div .CommentCounter{margin-left:0;margin-bottom:10px;}}"
          ),
        ];
      N.__hash = "1851940463";
      var O = N,
        P = a("xU+W"),
        S = a("00EI"),
        A = c.a.createElement,
        R = function (t) {
          return A(
            "svg",
            t,
            A("path", {
              d: "M16.23 24.22a2 2 0 0 1-.73-.14L7 20.79a2 2 0 0 1-1.29-1.88v-4a1.5 1.5 0 0 1 3 0v3.36l7.54 2.92 7.54-2.92v-3.45a1.5 1.5 0 0 1 3 0v4.09a2 2 0 0 1-1.29 1.88L17 24.08a2 2 0 0 1-.77.14zm-.35-2.94zm.7 0z",
            }),
            A("path", {
              d: "M16.23 13.35a2 2 0 0 1-.62-.1C9.17 11.16 2.36 9 1.61 8.76a2 2 0 0 1-.25-3.87l14-4.78a2 2 0 0 1 1.3 0l14 4.78a2 2 0 0 1 0 3.81l-13.8 4.55a2 2 0 0 1-.63.1zm-.31-3zM5.21 6.74c3.49 1.11 9.07 2.92 11 3.56l10.68-3.53L16 3.05z",
            })
          );
        };
      R.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 32 24.22",
      };
      var C = function (t) {
        return A(
          "svg",
          t,
          A("path", {
            id: "path-1_1_",
            d: "M5.9 0c.4 0 .9.3 1 .7s.1.9-.2 1.2L2.7 6l4 4.1c.3.5.3 1.1-.1 1.6s-1.1.4-1.5.1l-4.8-5c-.4-.4-.4-1.2 0-1.6L5.1.3c.2-.2.5-.3.8-.3z",
          })
        );
      };
      C.defaultProps = {
        id: "R\xe9teg_1",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 7 12",
      };
      var E = function (t) {
        var e = t.content,
          a = (e.isFetching, e.isFetched),
          n = e.content;
        return A(
          f.a,
          {
            title: n.seoTitle || n.title,
            keywords: n.seoKeyword,
            description: n.seoMetaDescription || n.description,
            type: "article",
            image: n.illustrationUrl,
            uri: n.contentUrl,
            authorName: n.author.fullName,
            publishDate: n.publishDate,
            analytics: {
              contentType: "community-tutorial",
              contentTitle: n.title,
            },
            pageType: "content",
          },
          A(
            w.a,
            null,
            A(
              h.a,
              {
                title: A(b.a, {
                  icon: A(R, null),
                  text: Object(P.a)("menus.tutorials"),
                }),
              },
              A(
                r.a,
                { href: "".concat(S.LOCAL_PART_PREFIX, "/tutorials") },
                A(
                  p.a,
                  { icon: A(C, null), className: "iconButton" },
                  Object(P.a)("buttons.backToTutorials")
                )
              )
            ),
            a &&
              A(
                "div",
                {
                  className:
                    "jsx-".concat(O.__hash) +
                    " " +
                    (u()("Tutorial", {
                      withRecommend: n.recommendedArticles.length > 1,
                    }) || ""),
                },
                A(
                  d.StickyContainer,
                  null,
                  A(d.Sticky, { bottomOffset: 410 }, function (t) {
                    var e = t.style;
                    return A(
                      "div",
                      {
                        style: e,
                        className:
                          "jsx-".concat(e.__hash) + " social__top desktopOnly",
                      },
                      A(
                        "div",
                        {
                          className: "jsx-".concat(e.__hash) + " voteAndSocial",
                        },
                        A(
                          "div",
                          { className: "jsx-".concat(e.__hash) },
                          A(y.a, null),
                          A(g.a, {
                            upvoted: n.upvoting.voted,
                            count: n.upvoting.voteCount,
                            votedId: n.id,
                            votedModel: "Tutorial",
                          })
                        ),
                        A(v.a, { url: n.contentUrl, vertical: !0 })
                      )
                    );
                  }),
                  A(
                    "div",
                    { className: "jsx-".concat(O.__hash) + " preface" },
                    A(
                      "div",
                      { className: "jsx-".concat(O.__hash) + " author" },
                      A(x.a, {
                        avatarSrc: n.author.avatarUrlSquare,
                        name: n.author.fullName,
                        href: n.authorId,
                        date: n.publishDate,
                      })
                    ),
                    A(
                      "div",
                      { className: "jsx-".concat(O.__hash) + " tags" },
                      A(m.a, {
                        mustRead: n.mustRead,
                        tags: n.tags,
                        url: "".concat(S.LOCAL_PART_PREFIX, "/tutorials"),
                      })
                    ),
                    A(
                      "h1",
                      { className: "jsx-".concat(O.__hash) + " pageTitle" },
                      n.title
                    ),
                    A(
                      "div",
                      {
                        className:
                          "jsx-".concat(O.__hash) +
                          " description pageDescription",
                      },
                      n.description
                    )
                  ),
                  A(j.a, {
                    style: { "div a": { color: "pink" } },
                    content: n.contentHtml,
                  }),
                  A(
                    "div",
                    {
                      className:
                        "jsx-".concat(O.__hash) + " social__bottom mobileOnly",
                    },
                    A(
                      "div",
                      { className: "jsx-".concat(O.__hash) + " voteAndSocial" },
                      A(
                        "div",
                        { className: "jsx-".concat(O.__hash) },
                        A(g.a, {
                          upvoted: n.upvoting.voted,
                          count: n.upvoting.voteCount,
                          votedId: n.id,
                          votedModel: "Tutorial",
                        }),
                        A(y.a, null)
                      ),
                      A(v.a, { url: n.contentUrl })
                    )
                  )
                )
              ),
            A(k.a, { articles: n.recommendedArticles }),
            a && A(_.a, { contentId: n.id, contentUrl: n.contentUrl })
          ),
          A(i.a, { id: O.__hash }, O)
        );
      };
    },
    cRb1: function (t, e, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/community/tutorial",
        function () {
          return a("8s4c");
        },
      ]);
    },
  },
  [["cRb1", 0, 2, 8, 11, 12, 1, 4, 3, 5, 9, 14]],
]);
