_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [51],
  {
    "2UCx": function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return E;
      });
      var n = a("fGyu"),
        i = a("9fIP"),
        s = a("pWxA"),
        r = a("8K1b"),
        o = a("K/z8"),
        c = a("sRHE"),
        l = a("zjfJ"),
        x = a("ERkP"),
        d = a.n(x),
        f = a("JBtm"),
        p = a.n(f),
        u = a("yFcC"),
        h = a.n(u),
        m = a("ysqo"),
        g = a.n(m),
        b = a("jvFD"),
        w = a.n(b),
        j = a("O94r"),
        k = a.n(j),
        y = a("iLAp"),
        _ = [
          ".Paginator{padding:30px 0;text-align:center;white-space:nowrap;}",
          ".Paginator ul{display:inline-block;padding-left:6px;padding-right:6px;}",
          ".Paginator li{display:inline-block;width:20px;height:20px;border-radius:10px;text-align:center;margin:0 4px;font-size:13px;line-height:1.6;cursor:pointer;}",
          ".Paginator li a{outline-style:none;color:".concat(
            y.a.grey,
            ";-webkit-text-decoration:none;text-decoration:none;}"
          ),
          ".Paginator li.selected{background-color:".concat(y.a.blue, ";}"),
          ".Paginator li.selected a{color:".concat(y.a.white, ";}"),
        ];
      _.__hash = "1311234595";
      var v = _,
        P = d.a.createElement,
        N = function (e) {
          var t = e.links;
          return P(
            "div",
            { className: "Paginator" },
            P(
              g.a,
              null,
              t.nextHref && P("link", { rel: "next", href: t.nextHref }),
              t.prevHref && P("link", { rel: "prev", href: t.prevHref })
            ),
            P(
              "ul",
              null,
              t.firstHref &&
                P(
                  "li",
                  null,
                  P(
                    w.a,
                    { href: t.firstHref.href },
                    P("a", null, t.firstHref.page)
                  )
                ),
              t.firstHref && P("li", null, "..."),
              t.links.map(function (e) {
                return P(
                  "li",
                  { key: e.page, className: k()({ selected: e.selected }) },
                  P(w.a, { href: e.href }, P("a", null, e.page))
                );
              }),
              t.lastHref && P("li", null, "..."),
              t.lastHref &&
                P(
                  "li",
                  null,
                  P(
                    w.a,
                    { href: t.lastHref.href },
                    P("a", null, t.lastHref.page)
                  )
                )
            ),
            P(h.a, { id: v.__hash }, v)
          );
        },
        O = a("rouc"),
        R = a("00EI"),
        C = d.a.createElement;
      function L(e) {
        var t = (function () {
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
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var a,
            n = Object(c.a)(e);
          if (t) {
            var i = Object(c.a)(this).constructor;
            a = Reflect.construct(n, arguments, i);
          } else a = n.apply(this, arguments);
          return Object(o.a)(this, a);
        };
      }
      var E = (function (e) {
        Object(r.a)(a, e);
        var t = L(a);
        function a() {
          var e;
          Object(i.a)(this, a);
          for (var r = arguments.length, o = new Array(r), c = 0; c < r; c++)
            o[c] = arguments[c];
          return (
            (e = t.call.apply(t, [this].concat(o))),
            Object(l.a)(Object(s.a)(e), "getHref", function (e) {
              var t = e.tag,
                a = e.mustRead,
                n = e.trending,
                i = e.baseHref,
                s = e.page,
                r = {
                  tag: Object(O.b)(t) || void 0,
                  posts_selected_tab: a
                    ? "must_read"
                    : "/community" === i
                    ? n
                      ? void 0
                      : "latest"
                    : void 0,
                  page: s > 1 ? s : void 0,
                },
                o = p.a.stringify(r);
              return i + (o ? "?" + o : "");
            }),
            Object(l.a)(Object(s.a)(e), "getPageCount", function (e) {
              var t = e.itemsCount,
                a = e.itemsPerPage;
              return Math.floor(t / a) + Number(t % a > 0);
            }),
            Object(l.a)(Object(s.a)(e), "getPageNumbers", function (t) {
              var a = t.itemsCount,
                i = t.itemsPerPage,
                s = t.currentPage,
                r = e.getPageCount({ itemsCount: a, itemsPerPage: i }),
                o = Math.min(r, R.PAGINATOR_PAGE_LIMIT),
                c = Math.floor(o / 2);
              return {
                min: Math.min(Math.max(s - c, 1), r - o + 1),
                pageNumbers: Object(n.a)(Array(o).keys()),
              };
            }),
            Object(l.a)(Object(s.a)(e), "getLink", function (t) {
              var a = t.number,
                n = t.min,
                i = t.currentPage,
                s = t.tag,
                r = t.mustRead,
                o = t.trending,
                c = t.baseHref,
                l = a + n;
              return {
                page: l,
                selected: i === l,
                href: e.getHref({
                  tag: s,
                  mustRead: r,
                  trending: o,
                  baseHref: c,
                  page: l,
                }),
              };
            }),
            Object(l.a)(Object(s.a)(e), "buildLinks", function (t) {
              var a = t.itemsCount,
                n = t.itemsPerPage,
                i = t.currentPage,
                s = t.tag,
                r = t.mustRead,
                o = t.trending,
                c = t.baseHref,
                l = "",
                x = "",
                d = e.getPageNumbers({
                  itemsCount: a,
                  itemsPerPage: n,
                  currentPage: i,
                }),
                f = d.pageNumbers,
                p = d.min,
                u = f.map(function (t) {
                  var a = e.getLink({
                    number: t,
                    min: p,
                    currentPage: i,
                    tag: s,
                    mustRead: r,
                    trending: o,
                    baseHref: c,
                  });
                  return (
                    i - 1 === a.page && (l = a.href),
                    i + 1 === a.page && (x = a.href),
                    a
                  );
                }),
                h = e.getPageCount({ itemsCount: a, itemsPerPage: n });
              return {
                firstHref:
                  f[0] + p === 1
                    ? ""
                    : e.getLink({
                        number: 1,
                        min: 0,
                        currentPage: i,
                        tag: s,
                        mustRead: r,
                        trending: o,
                        baseHref: c,
                      }),
                lastHref:
                  f[f.length - 1] + p === h
                    ? ""
                    : e.getLink({
                        number: h,
                        min: 0,
                        currentPage: i,
                        tag: s,
                        mustRead: r,
                        trending: o,
                        baseHref: c,
                      }),
                prevHref: l,
                nextHref: x,
                links: u,
              };
            }),
            Object(l.a)(Object(s.a)(e), "render", function () {
              return C(N, { links: e.buildLinks(e.props) });
            }),
            e
          );
        }
        return a;
      })(x.Component);
    },
    BlPp: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("VtSi"),
        i = a.n(n),
        s = a("QsI/"),
        r = a("9fIP"),
        o = a("MMYH"),
        c = a("pWxA"),
        l = a("8K1b"),
        x = a("K/z8"),
        d = a("sRHE"),
        f = a("zjfJ"),
        p = a("ERkP"),
        u = a.n(p),
        h = a("aWzz"),
        m = a.n(h),
        g = a("p/5q"),
        b = a.n(g),
        w = a("yFcC"),
        j = a.n(w),
        k = a("ug5E"),
        y = a("JLdz"),
        _ = a("PiLd"),
        v = a("R9C2"),
        P = a("CBJU"),
        N = a("2UCx"),
        O = a("2lh8"),
        R = a("2A9Z"),
        C = a("iLAp"),
        L = [
          ".Podcast.jsx-2540232026{margin:0 auto;}",
          ".header.jsx-2540232026{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;margin:10px 10px 20px;}",
          ".header.jsx-2540232026 .text.jsx-2540232026{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;}",
          ".header.jsx-2540232026 .title.jsx-2540232026{margin:0;font-size:30px;}",
          ".header.jsx-2540232026 .subTitle.jsx-2540232026{margin:0 0 16px;font-size:15px;font-weight:400;font-style:italic;}",
          ".header.jsx-2540232026 .subTitle.jsx-2540232026 span.jsx-2540232026{display:inline-block;}",
          ".header.jsx-2540232026 .details.jsx-2540232026{line-height:22px;margin-bottom:20px;}",
          ".header.jsx-2540232026 .image.jsx-2540232026{display:none;}",
          ".Podcast.jsx-2540232026 .PodcastCard{margin:0 10px 30px;}",
          "@media (min-width:800px){.Podcast.jsx-2540232026{max-width:1085px;}.header.jsx-2540232026{margin:0 auto 20px;max-width:1085px;padding:0 30px;}.header.jsx-2540232026 .text.jsx-2540232026{-webkit-flex:0 1 62%;-ms-flex:0 1 62%;flex:0 1 62%;}.header.jsx-2540232026 .image.jsx-2540232026{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;display:block;width:200px;height:200px;background-color:".concat(
            C.a.darkGrey,
            ";background-position:center top;border-radius:50%;}.Podcast.jsx-2540232026 .PodcastCard{margin:0 30px 30px;}}"
          ),
        ];
      L.__hash = "2540232026";
      var E = L,
        H = a("xU+W"),
        T = a("00EI"),
        A = a("/dbq"),
        z = u.a.createElement,
        I = function (e) {
          return z(
            "svg",
            e,
            z("path", {
              d: "M9.415 11.077h-.369a2.777 2.777 0 0 1-2.769-2.77V2.77A2.777 2.777 0 0 1 9.047 0h.368a2.777 2.777 0 0 1 2.77 2.77v5.538a2.777 2.777 0 0 1-2.77 2.769zm5.008-7.615c.573 0 1.039.464 1.039 1.038v3.462c0 3.08-2.25 5.64-5.193 6.136v1.825h2.077a1.038 1.038 0 1 1 0 2.077h-6.23a1.038 1.038 0 1 1 0-2.077h2.076v-1.825C5.25 13.602 3 11.042 3 7.962V4.5a1.038 1.038 0 1 1 2.077 0v3.462a4.158 4.158 0 0 0 4.154 4.153 4.158 4.158 0 0 0 4.154-4.153V4.5c0-.574.465-1.038 1.038-1.038z",
            })
          );
        };
      I.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "18",
        height: "18",
        viewBox: "0 0 18 18",
      };
      var F = function (e) {
        return z(
          "svg",
          e,
          z("path", {
            d: "M83.393 33.573a5.357 5.357 0 0 0 0-10.714H69.19l2.729-15.478A5.358 5.358 0 0 0 61.367 5.52L58.31 22.858H36.832L39.561 7.38A5.359 5.359 0 0 0 29.008 5.52l-3.057 17.338H10.179a5.358 5.358 0 0 0 0 10.714h13.884l-3.149 17.857H6.607a5.357 5.357 0 0 0 0 10.714h12.417l-2.729 15.48a5.357 5.357 0 0 0 10.552 1.858l3.058-17.338h21.479l-2.729 15.48a5.357 5.357 0 1 0 10.552 1.859l3.058-17.339h17.559a5.357 5.357 0 0 0 0-10.714h-15.67l3.149-17.857h16.09zM53.272 51.43H31.793l3.149-17.857h21.479L53.272 51.43z",
            id: "path4200",
          })
        );
      };
      F.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 90 85",
        width: "90",
        height: "85",
      };
      var D = function (e) {
          var t = e.list,
            a = (t.isFetching, t.isFetched, t.Episode),
            n = t.EpisodeTotal,
            i = e.mustRead,
            s = e.page,
            r = e.tag,
            o = e.asPath;
          return z(
            k.a,
            {
              title: Object(H.a)("seo.podcast.title"),
              description: Object(H.a)("seo.podcast.description"),
              uri: o,
              analytics: {
                contentTitle: "all episodes",
                contentType: "community-podcast",
              },
            },
            z(
              O.a,
              null,
              z(
                y.a,
                {
                  title: z(_.a, {
                    icon: r ? z(F, { width: 25 }) : z(I, null),
                    text: r || Object(H.a)("menus.podcast"),
                    h1: !0,
                  }),
                },
                z(R.a, null)
              ),
              z(
                "div",
                { className: "jsx-".concat(E.__hash) + " Podcast" },
                z(
                  "div",
                  { className: "jsx-".concat(E.__hash) + " header" },
                  z(
                    "div",
                    { className: "jsx-".concat(E.__hash) + " text" },
                    z(
                      "h2",
                      { className: "jsx-".concat(E.__hash) + " title" },
                      "DataFramed"
                    ),
                    z(
                      "h3",
                      { className: "jsx-".concat(E.__hash) + " subTitle" },
                      "DataCamp\u2019s official podcast.",
                      " ",
                      z(
                        "span",
                        { className: "jsx-".concat(E.__hash) },
                        "Presented by",
                        " ",
                        z(
                          "a",
                          {
                            target: "_blank",
                            style: { color: A.a.blueDark },
                            rel: "noopener noreferrer",
                            href: "https://twitter.com/hugobowne",
                            className: "jsx-".concat(E.__hash),
                          },
                          "Hugo Bowne-Anderson."
                        )
                      )
                    ),
                    z(
                      "div",
                      { className: "jsx-".concat(E.__hash) + " details" },
                      "Data Science is one of the fastest growing industries and has been called the \xab Sexiest job of the 21st Century \xbb. But what exactly is Data Science? In the podcast by DataCamp, Hugo Bowne-Anderson approaches this question from the perspective of what problems Data Science tries to solve instead of what definition fits it best. From automated medical diagnosis and self-driving cars to recommendation systems and climate change, come on a journey with industry and academic experts to explore the inner workings of the industry that will color the 21st century."
                    ),
                    z(P.a, null)
                  ),
                  z("img", {
                    src: "https://s3.amazonaws.com/datacamp-community-prod/host.jpg",
                    className: "jsx-".concat(E.__hash) + " image",
                  })
                ),
                n > 0 &&
                  z(
                    "div",
                    { className: "jsx-".concat(E.__hash) + " Podcast" },
                    a.map(function (e) {
                      return z(v.a, {
                        key: e.id,
                        tagLine: {
                          mustRead: e.mustRead,
                          tags: e.tags,
                          url: "".concat(T.LOCAL_PART_PREFIX, "/podcast"),
                        },
                        title: e.title,
                        externalUrl: e.externalUrl,
                        episode: e.episode,
                        isLatest: e.isLatest,
                        guestName: e.guests[0].guestName,
                        date: e.publishDate,
                        href: "episode",
                        as: "podcast",
                        slug: e.slug,
                        upvote: {
                          upvoted: e.upvoting.voted,
                          count: e.upvoting.voteCount,
                          votedId: e.id,
                          votedModel: "Episode",
                        },
                      });
                    })
                  )
              ),
              n > 0 &&
                z(N.a, {
                  baseHref: "".concat(T.LOCAL_PART_PREFIX, "/podcast"),
                  itemsCount: n,
                  itemsPerPage: T.POST_LIMIT.Episode,
                  currentPage: s,
                  tag: r,
                  mustRead: i,
                })
            ),
            z(j.a, { id: E.__hash }, E)
          );
        },
        M = a("Ij73"),
        B = a("Xp8U"),
        S = a("dio+"),
        U = a("rouc"),
        X = u.a.createElement;
      function J(e) {
        var t = (function () {
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
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var a,
            n = Object(d.a)(e);
          if (t) {
            var i = Object(d.a)(this).constructor;
            a = Reflect.construct(n, arguments, i);
          } else a = n.apply(this, arguments);
          return Object(x.a)(this, a);
        };
      }
      var V = (function (e) {
        Object(l.a)(a, e);
        var t = J(a);
        function a() {
          var e;
          Object(r.a)(this, a);
          for (var n = arguments.length, i = new Array(n), s = 0; s < n; s++)
            i[s] = arguments[s];
          return (
            (e = t.call.apply(t, [this].concat(i))),
            Object(f.a)(Object(c.a)(e), "render", function () {
              return X(D, e.props);
            }),
            e
          );
        }
        return (
          Object(o.a)(
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
                  var e = Object(s.a)(
                    i.a.mark(function e(t) {
                      var a, n, s, r, o, c, l;
                      return i.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (a = t.store),
                                (n = t.asPath),
                                (s = t.query),
                                (r = t.req),
                                (e.next = 3),
                                Object(S.a)({ store: a, req: r })
                              );
                            case 3:
                              return (
                                (o = "must_read" === s.posts_selected_tab),
                                (c = parseInt(s.page, 10) || 1),
                                (l = Object(U.a)(s.tag)),
                                (e.next = 8),
                                a.dispatch(
                                  Object(B.n)({
                                    modelName: "Episode",
                                    mustRead: o,
                                    page: c,
                                    tag: l,
                                  })
                                )
                              );
                            case 8:
                              return (
                                a.dispatch(Object(B.w)()),
                                e.abrupt("return", {
                                  asPath: n,
                                  mustRead: o,
                                  page: c,
                                  tag: l,
                                })
                              );
                            case 10:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })(),
              },
            ]
          ),
          a
        );
      })(p.Component);
      Object(f.a)(V, "childContextTypes", { asPath: m.a.string });
      t.default = b()(M.a, function (e) {
        return { list: e.list };
      })(V);
    },
    JLdz: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return d;
      });
      var n = a("yFcC"),
        i = a.n(n),
        s = a("ERkP"),
        r = a.n(s),
        o = a("iLAp"),
        c = [
          ".TitleBar.jsx-1615743782{height:50px;padding:0 5px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;line-height:50px;background-color:"
            .concat(o.a.white, ";border-bottom:1px solid ")
            .concat(o.a.border, ";margin-bottom:65px;}"),
          ".filter.jsx-1615743782{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:48px;}",
          ".action.jsx-1615743782{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;line-height:normal;}",
          ".title.jsx-1615743782{height:65px;line-height:65px;-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;-webkit-order:1;-ms-flex-order:1;order:1;text-align:center;}",
          "h1.jsx-1615743782{margin:0 0;}",
          ".Page.content .TitleBar{display:none;}",
          "@media (min-width:800px){.TitleBar.jsx-1615743782{height:50px;padding:0 25px;display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:29px;margin-top:50px;background-color:"
            .concat(o.a.white, ";border-bottom:1px solid ")
            .concat(
              o.a.border,
              ";}.filter.jsx-1615743782{-webkit-flex:0 0 33%;-ms-flex:0 0 33%;flex:0 0 33%;line-height:normal;}.action.jsx-1615743782{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;line-height:normal;-webkit-flex:0 0 33%;-ms-flex:0 0 33%;flex:0 0 33%;}.action.jsx-1615743782 a{line-height:0;}.title.jsx-1615743782{-webkit-order:0;-ms-flex-order:0;order:0;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;text-align:center;}h1.jsx-1615743782{margin:0 0;}}"
            ),
        ];
      c.__hash = "1615743782";
      var l = c,
        x = r.a.createElement,
        d = function (e) {
          var t = e.children,
            a = e.title,
            n = e.action;
          return x(
            "div",
            { className: "jsx-".concat(l.__hash) + " TitleBar" },
            x("div", { className: "jsx-".concat(l.__hash) + " filter" }, t),
            x("div", { className: "jsx-".concat(l.__hash) + " title" }, a),
            x("div", { className: "jsx-".concat(l.__hash) + " action" }, n),
            x(i.a, { id: l.__hash }, l)
          );
        };
    },
    Oybk: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return u;
      });
      var n = a("yFcC"),
        i = a.n(n),
        s = a("ERkP"),
        r = a.n(s),
        o = a("PxVe"),
        c = a("MTRj"),
        l = a("iLAp"),
        x = a("ET7V"),
        d = r.a.createElement,
        f = function (e, t) {
          return e.map(function (e) {
            return d("div", { key: e }, d(c.a, { title: e, url: t }));
          });
        },
        p = function (e) {
          var t = e.mustRead,
            a = e.tags,
            n = e.url;
          return d(
            "div",
            {
              onClick: function (e) {
                return e.stopPropagation();
              },
              className: "jsx-3846131586 TagLine",
            },
            t ? d(c.a, { mustRead: t, url: n }) : null,
            a.length ? d(c.a, { key: a[0], title: a[0], url: n }) : null,
            a.length > 1
              ? (function (e, t) {
                  return d(
                    o.a,
                    {
                      placement: "bottom",
                      overlay: d(
                        "div",
                        { className: "jsx-3074590885 tooltipInner" },
                        f(e.slice(1), t),
                        d(i.a, { id: "3074590885" }, [
                          ".tooltipInner.jsx-3074590885 .Tag{margin:4px;}",
                        ])
                      ),
                      arrowContent: d("div", {
                        className: "rc-tooltip-arrow-inner",
                      }),
                      trigger: ["click"],
                      align: { offset: [0, 10] },
                    },
                    d(
                      "a",
                      {
                        className:
                          i.a.dynamic([["1698315267", [l.a.grey]]]) + " more",
                      },
                      "+",
                      e.length - 1,
                      d(i.a, { id: "1698315267", dynamic: [l.a.grey] }, [
                        ".more.__jsx-style-dynamic-selector{font-size:11px;cursor:default;color:".concat(
                          l.a.grey,
                          ";}"
                        ),
                        ".more.__jsx-style-dynamic-selector:hover{-webkit-text-decoration:underline;text-decoration:underline;}",
                      ]),
                      d(i.a, { id: x.a.__hash }, x.a)
                    )
                  );
                })(a, n)
              : null,
            d(i.a, { id: "3846131586" }, [
              ".TagLine.jsx-3846131586{display:inline-block;white-space:nowrap;}",
              ".TagLine.jsx-3846131586>.Tag{margin-right:10px;}",
              ".more.jsx-3846131586{font-size:11px;}",
            ])
          );
        };
      p.defaultProps = { tags: [] };
      var u = p;
    },
    PiLd: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return d;
      });
      var n = a("yFcC"),
        i = a.n(n),
        s = a("ERkP"),
        r = a.n(s),
        o = a("iLAp"),
        c = [
          ".Title.jsx-1582297868{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}",
          ".Title.jsx-1582297868 .icon.jsx-1582297868{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;min-width:18px;height:18px;}",
          ".icon.jsx-1582297868 svg{-webkit-flex:1 1 0;-ms-flex:1 1 0;flex:1 1 0;height:18px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;fill:".concat(
            o.a.blue,
            ";}"
          ),
          ".Title.jsx-1582297868 .h1.jsx-1582297868,.Title.jsx-1582297868 h1.jsx-1582297868{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;margin:auto 0 auto 9px;font-size:22px;text-transform:capitalize;}",
          ".Title.jsx-1582297868 .status.jsx-1582297868{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:10px;}",
        ];
      c.__hash = "1582297868";
      var l = c,
        x = r.a.createElement,
        d = function (e) {
          var t = e.icon,
            a = e.text,
            n = e.h1,
            s = e.status;
          return x(
            "div",
            { className: "jsx-".concat(l.__hash) + " Title" },
            x("div", { className: "jsx-".concat(l.__hash) + " icon" }, t),
            n
              ? x("h1", { className: "jsx-".concat(l.__hash) }, a)
              : x("div", { className: "jsx-".concat(l.__hash) + " h1" }, a),
            s &&
              x("div", { className: "jsx-".concat(l.__hash) + " status" }, s),
            x(i.a, { id: l.__hash }, l)
          );
        };
    },
    R9C2: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return b;
      });
      var n = a("yFcC"),
        i = a.n(n),
        s = a("ERkP"),
        r = a.n(s),
        o = a("jvFD"),
        c = a.n(o),
        l = a("wAaO"),
        x = a("Oybk"),
        d = a("tCgw"),
        f = a("00EI"),
        p = a("xU+W"),
        u = a("iLAp"),
        h = [
          ".PodcastCard.jsx-1602457376{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background-color:".concat(
            u.a.white,
            ";border-radius:4px;border:solid 1px #e3e7e8;overflow:hidden;padding:15px 15px 20px;cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;}"
          ),
          ".PodcastCard.jsx-1602457376:hover{".concat(u.a.cardShadow, ";}"),
          ".episode.jsx-1602457376{font-size:11px;font-weight:700;-webkit-letter-spacing:2px;-moz-letter-spacing:2px;-ms-letter-spacing:2px;letter-spacing:2px;text-transform:uppercase;color:".concat(
            u.a.darkGrey,
            ";}"
          ),
          "h2.jsx-1602457376{margin:5px 0 10px;font-size:22px;}",
          "h2.jsx-1602457376 a.jsx-1602457376{display:block;}",
          ".infoHead.jsx-1602457376{margin-bottom:20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-align-content:center;-ms-flex-line-pack:center;align-content:center;}",
          ".date.jsx-1602457376{margin-right:10px;font-size:11px;line-height:23px;}",
          ".header.jsx-1602457376{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;}",
          ".headerTitle.jsx-1602457376{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;}",
          ".infoVoteAndSocial.jsx-1602457376{width:52x;margin-left:20px;-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;}",
          "@media (min-width:800px){}",
        ];
      h.__hash = "1602457376";
      var m = h,
        g = r.a.createElement,
        b = function (e) {
          var t = e.tagLine,
            a = e.title,
            n = e.externalUrl,
            s = e.episode,
            r = e.isLatest,
            o = e.guestName,
            u = e.date,
            h = e.href,
            b = e.as,
            w = e.slug;
          e.upvote, e.hideUpvote;
          return g(
            c.a,
            {
              href: ""
                .concat(f.LOCAL_PART_PREFIX, "/")
                .concat(h, "?slug=")
                .concat(w),
              as: "".concat(f.LOCAL_PART_PREFIX, "/").concat(b, "/").concat(w),
            },
            g(
              "div",
              { className: "jsx-".concat(m.__hash) + " PodcastCard" },
              g(
                "div",
                { className: "jsx-".concat(m.__hash) + " header" },
                g(
                  "div",
                  { className: "jsx-".concat(m.__hash) + " headerTitle" },
                  g(
                    "div",
                    { className: "jsx-".concat(m.__hash) + " episode" },
                    Object(p.a)("podcastPage.episode", s, r)
                  ),
                  g(
                    "h2",
                    {
                      onClick: function (e) {
                        return e.stopPropagation();
                      },
                      className: "jsx-".concat(m.__hash),
                    },
                    g(
                      c.a,
                      {
                        href: ""
                          .concat(f.LOCAL_PART_PREFIX, "/")
                          .concat(h, "?slug=")
                          .concat(w),
                        as: ""
                          .concat(f.LOCAL_PART_PREFIX, "/")
                          .concat(b, "/")
                          .concat(w),
                      },
                      g(
                        "a",
                        { className: "jsx-".concat(m.__hash) },
                        Object(p.a)("podcastPage.title", a, o)
                      )
                    )
                  ),
                  g(
                    "div",
                    { className: "jsx-".concat(m.__hash) + " infoHead" },
                    g(
                      "div",
                      { className: "jsx-".concat(m.__hash) + " date" },
                      g(l.a, { date: u })
                    ),
                    g(x.a, t)
                  )
                ),
                g(
                  "div",
                  { className: "jsx-".concat(m.__hash) },
                  g("div", {
                    className: "jsx-".concat(m.__hash) + " infoVoteAndSocial",
                  })
                )
              ),
              g(
                "div",
                { className: "jsx-".concat(m.__hash) + " player" },
                g(d.a, { url: n })
              ),
              g(i.a, { id: m.__hash }, m)
            )
          );
        };
    },
    SbnU: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/community/podcast",
        function () {
          return a("BlPp");
        },
      ]);
    },
  },
  [["SbnU", 0, 2, 1, 4, 3, 5, 10, 17]],
]);
