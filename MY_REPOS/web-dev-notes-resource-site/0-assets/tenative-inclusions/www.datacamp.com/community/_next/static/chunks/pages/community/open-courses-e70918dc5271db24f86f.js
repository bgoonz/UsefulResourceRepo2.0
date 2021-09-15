_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [50],
  {
    "2UCx": function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return L;
      });
      var n = a("fGyu"),
        i = a("9fIP"),
        o = a("pWxA"),
        s = a("8K1b"),
        r = a("K/z8"),
        c = a("sRHE"),
        l = a("zjfJ"),
        p = a("ERkP"),
        x = a.n(p),
        u = a("JBtm"),
        d = a.n(u),
        f = a("yFcC"),
        h = a.n(f),
        g = a("ysqo"),
        m = a.n(g),
        b = a("jvFD"),
        v = a.n(b),
        j = a("O94r"),
        w = a.n(j),
        k = a("iLAp"),
        y = [
          ".Paginator{padding:30px 0;text-align:center;white-space:nowrap;}",
          ".Paginator ul{display:inline-block;padding-left:6px;padding-right:6px;}",
          ".Paginator li{display:inline-block;width:20px;height:20px;border-radius:10px;text-align:center;margin:0 4px;font-size:13px;line-height:1.6;cursor:pointer;}",
          ".Paginator li a{outline-style:none;color:".concat(
            k.a.grey,
            ";-webkit-text-decoration:none;text-decoration:none;}"
          ),
          ".Paginator li.selected{background-color:".concat(k.a.blue, ";}"),
          ".Paginator li.selected a{color:".concat(k.a.white, ";}"),
        ];
      y.__hash = "1311234595";
      var _ = y,
        P = x.a.createElement,
        O = function (e) {
          var t = e.links;
          return P(
            "div",
            { className: "Paginator" },
            P(
              m.a,
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
                    v.a,
                    { href: t.firstHref.href },
                    P("a", null, t.firstHref.page)
                  )
                ),
              t.firstHref && P("li", null, "..."),
              t.links.map(function (e) {
                return P(
                  "li",
                  { key: e.page, className: w()({ selected: e.selected }) },
                  P(v.a, { href: e.href }, P("a", null, e.page))
                );
              }),
              t.lastHref && P("li", null, "..."),
              t.lastHref &&
                P(
                  "li",
                  null,
                  P(
                    v.a,
                    { href: t.lastHref.href },
                    P("a", null, t.lastHref.page)
                  )
                )
            ),
            P(h.a, { id: _.__hash }, _)
          );
        },
        C = a("rouc"),
        R = a("00EI"),
        U = x.a.createElement;
      function N(e) {
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
          return Object(r.a)(this, a);
        };
      }
      var L = (function (e) {
        Object(s.a)(a, e);
        var t = N(a);
        function a() {
          var e;
          Object(i.a)(this, a);
          for (var s = arguments.length, r = new Array(s), c = 0; c < s; c++)
            r[c] = arguments[c];
          return (
            (e = t.call.apply(t, [this].concat(r))),
            Object(l.a)(Object(o.a)(e), "getHref", function (e) {
              var t = e.tag,
                a = e.mustRead,
                n = e.trending,
                i = e.baseHref,
                o = e.page,
                s = {
                  tag: Object(C.b)(t) || void 0,
                  posts_selected_tab: a
                    ? "must_read"
                    : "/community" === i
                    ? n
                      ? void 0
                      : "latest"
                    : void 0,
                  page: o > 1 ? o : void 0,
                },
                r = d.a.stringify(s);
              return i + (r ? "?" + r : "");
            }),
            Object(l.a)(Object(o.a)(e), "getPageCount", function (e) {
              var t = e.itemsCount,
                a = e.itemsPerPage;
              return Math.floor(t / a) + Number(t % a > 0);
            }),
            Object(l.a)(Object(o.a)(e), "getPageNumbers", function (t) {
              var a = t.itemsCount,
                i = t.itemsPerPage,
                o = t.currentPage,
                s = e.getPageCount({ itemsCount: a, itemsPerPage: i }),
                r = Math.min(s, R.PAGINATOR_PAGE_LIMIT),
                c = Math.floor(r / 2);
              return {
                min: Math.min(Math.max(o - c, 1), s - r + 1),
                pageNumbers: Object(n.a)(Array(r).keys()),
              };
            }),
            Object(l.a)(Object(o.a)(e), "getLink", function (t) {
              var a = t.number,
                n = t.min,
                i = t.currentPage,
                o = t.tag,
                s = t.mustRead,
                r = t.trending,
                c = t.baseHref,
                l = a + n;
              return {
                page: l,
                selected: i === l,
                href: e.getHref({
                  tag: o,
                  mustRead: s,
                  trending: r,
                  baseHref: c,
                  page: l,
                }),
              };
            }),
            Object(l.a)(Object(o.a)(e), "buildLinks", function (t) {
              var a = t.itemsCount,
                n = t.itemsPerPage,
                i = t.currentPage,
                o = t.tag,
                s = t.mustRead,
                r = t.trending,
                c = t.baseHref,
                l = "",
                p = "",
                x = e.getPageNumbers({
                  itemsCount: a,
                  itemsPerPage: n,
                  currentPage: i,
                }),
                u = x.pageNumbers,
                d = x.min,
                f = u.map(function (t) {
                  var a = e.getLink({
                    number: t,
                    min: d,
                    currentPage: i,
                    tag: o,
                    mustRead: s,
                    trending: r,
                    baseHref: c,
                  });
                  return (
                    i - 1 === a.page && (l = a.href),
                    i + 1 === a.page && (p = a.href),
                    a
                  );
                }),
                h = e.getPageCount({ itemsCount: a, itemsPerPage: n });
              return {
                firstHref:
                  u[0] + d === 1
                    ? ""
                    : e.getLink({
                        number: 1,
                        min: 0,
                        currentPage: i,
                        tag: o,
                        mustRead: s,
                        trending: r,
                        baseHref: c,
                      }),
                lastHref:
                  u[u.length - 1] + d === h
                    ? ""
                    : e.getLink({
                        number: h,
                        min: 0,
                        currentPage: i,
                        tag: o,
                        mustRead: s,
                        trending: r,
                        baseHref: c,
                      }),
                prevHref: l,
                nextHref: p,
                links: f,
              };
            }),
            Object(l.a)(Object(o.a)(e), "render", function () {
              return U(O, { links: e.buildLinks(e.props) });
            }),
            e
          );
        }
        return a;
      })(p.Component);
    },
    C06M: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a("VtSi"),
        i = a.n(n),
        o = a("QsI/"),
        s = a("9fIP"),
        r = a("MMYH"),
        c = a("pWxA"),
        l = a("8K1b"),
        p = a("K/z8"),
        x = a("sRHE"),
        u = a("zjfJ"),
        d = a("ERkP"),
        f = a.n(d),
        h = a("aWzz"),
        g = a.n(h),
        m = a("p/5q"),
        b = a.n(m),
        v = a("yFcC"),
        j = a.n(v),
        w = a("ug5E"),
        k = a("JLdz"),
        y = a("PiLd"),
        _ = a("kMdX"),
        P = a("2UCx"),
        O = a("2lh8"),
        C = a("2A9Z"),
        R = [
          ".OpenCourses.jsx-2075260648{margin:0 auto;}",
          ".OpenCourses.jsx-2075260648 .CourseCard{margin:0 10px 30px;}",
          "@media (min-width:800px){.OpenCourses.jsx-2075260648{padding:0 15px;max-width:1065px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;}.OpenCourses.jsx-2075260648 .CourseCard{-webkit-flex-basis:calc((100% - 60px) / 2);-ms-flex-preferred-size:calc((100% - 60px) / 2);flex-basis:calc((100% - 60px) / 2);margin:0 15px 30px;}}",
        ];
      R.__hash = "2075260648";
      var U = R,
        N = a("xU+W"),
        L = a("00EI"),
        A = f.a.createElement,
        z = function (e) {
          return A(
            "svg",
            e,
            A("path", {
              d: "M28.5 26h-23A5.51 5.51 0 0 1 0 20.5v-15A5.51 5.51 0 0 1 5.5 0h23A5.51 5.51 0 0 1 34 5.5v15a5.51 5.51 0 0 1-5.5 5.5zM5.5 3A2.5 2.5 0 0 0 3 5.5v15A2.5 2.5 0 0 0 5.5 23h23a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 28.5 3z",
            }),
            A("path", {
              d: "M13.5 26a1.5 1.5 0 0 1-1.5-1.5v-22a1.5 1.5 0 0 1 3 0v22a1.5 1.5 0 0 1-1.5 1.5zM27 11h-8a1.5 1.5 0 0 1 0-3h8a1.5 1.5 0 0 1 0 3zM27 18h-8a1.5 1.5 0 0 1 0-3h8a1.5 1.5 0 0 1 0 3z",
            })
          );
        };
      z.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 34 26",
      };
      var H = function (e) {
        return A(
          "svg",
          e,
          A("path", {
            d: "M83.393 33.573a5.357 5.357 0 0 0 0-10.714H69.19l2.729-15.478A5.358 5.358 0 0 0 61.367 5.52L58.31 22.858H36.832L39.561 7.38A5.359 5.359 0 0 0 29.008 5.52l-3.057 17.338H10.179a5.358 5.358 0 0 0 0 10.714h13.884l-3.149 17.857H6.607a5.357 5.357 0 0 0 0 10.714h12.417l-2.729 15.48a5.357 5.357 0 0 0 10.552 1.858l3.058-17.338h21.479l-2.729 15.48a5.357 5.357 0 1 0 10.552 1.859l3.058-17.339h17.559a5.357 5.357 0 0 0 0-10.714h-15.67l3.149-17.857h16.09zM53.272 51.43H31.793l3.149-17.857h21.479L53.272 51.43z",
            id: "path4200",
          })
        );
      };
      H.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 90 85",
        width: "90",
        height: "85",
      };
      var E = function (e) {
          var t = e.list,
            a = (t.isFetching, t.isFetched, t.OpenCourse),
            n = t.OpenCourseTotal,
            i = e.mustRead,
            o = e.page,
            s = e.tag,
            r = (e.url, e.asPath);
          return A(
            w.a,
            {
              title: Object(N.a)("seo.openCourses.title"),
              description: Object(N.a)("seo.openCourses.description"),
              uri: r,
              analytics: {
                contentTitle: "all courses",
                contentType: "community-open-course",
              },
              pageType: "list",
            },
            A(
              O.a,
              null,
              A(
                k.a,
                {
                  title: A(y.a, {
                    icon: s ? A(H, { width: 25 }) : A(z, null),
                    text: s || Object(N.a)("menus.openCourses"),
                    h1: !0,
                  }),
                },
                A(C.a, null)
              ),
              n > 0 &&
                A(
                  "div",
                  { className: "jsx-".concat(U.__hash) + " OpenCourses" },
                  a.map(function (e) {
                    return A(_.a, {
                      key: e.id,
                      tagLine: {
                        mustRead: e.mustRead,
                        tags: e.tags,
                        url: "".concat(L.LOCAL_PART_PREFIX, "/open-courses"),
                      },
                      upvote: {
                        upvoted: e.upvoting.voted,
                        count: e.upvoting.voteCount,
                        votedId: e.id,
                        votedModel: "OpenCourse",
                      },
                      title: e.title,
                      description: e.description,
                      programmingLanguage: e.programmingLanguage,
                      publishDate: e.publishDate,
                      href: "open-course",
                      as: "open-courses",
                      slug: e.slug,
                      contentUrl: e.contentUrl,
                    });
                  })
                ),
              n > 0 &&
                A(P.a, {
                  baseHref: "".concat(L.LOCAL_PART_PREFIX, "/open-courses"),
                  itemsCount: n,
                  itemsPerPage: L.POST_LIMIT.OpenCourse,
                  currentPage: o,
                  tag: s,
                  mustRead: i,
                })
            ),
            A(j.a, { id: U.__hash }, U)
          );
        },
        M = a("Ij73"),
        T = a("Xp8U"),
        I = a("dio+"),
        D = a("rouc"),
        S = f.a.createElement;
      function F(e) {
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
            n = Object(x.a)(e);
          if (t) {
            var i = Object(x.a)(this).constructor;
            a = Reflect.construct(n, arguments, i);
          } else a = n.apply(this, arguments);
          return Object(p.a)(this, a);
        };
      }
      var B = (function (e) {
        Object(l.a)(a, e);
        var t = F(a);
        function a() {
          var e;
          Object(s.a)(this, a);
          for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
            i[o] = arguments[o];
          return (
            (e = t.call.apply(t, [this].concat(i))),
            Object(u.a)(Object(c.a)(e), "render", function () {
              return S(E, e.props);
            }),
            e
          );
        }
        return (
          Object(r.a)(
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
                  var e = Object(o.a)(
                    i.a.mark(function e(t) {
                      var a, n, o, s, r, c, l;
                      return i.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (a = t.store),
                                (n = t.asPath),
                                (o = t.query),
                                (s = t.req),
                                (e.next = 3),
                                Object(I.a)({ store: a, req: s })
                              );
                            case 3:
                              return (
                                (r = "must_read" === o.posts_selected_tab),
                                (c = parseInt(o.page, 10) || 1),
                                (l = Object(D.a)(o.tag)),
                                (e.next = 8),
                                a.dispatch(
                                  Object(T.n)({
                                    modelName: "OpenCourse",
                                    mustRead: r,
                                    page: c,
                                    tag: l,
                                  })
                                )
                              );
                            case 8:
                              return (
                                a.dispatch(Object(T.w)()),
                                e.abrupt("return", {
                                  asPath: n,
                                  mustRead: r,
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
      })(d.Component);
      Object(u.a)(B, "childContextTypes", { asPath: g.a.string });
      t.default = b()(
        M.a,
        function (e) {
          return { list: e.list };
        },
        function () {
          return {};
        }
      )(B);
    },
    HSPt: function (e, t, a) {
      "use strict";
      var n = a("uDfI"),
        i = a("9OUN"),
        o = a("Xp8U"),
        s = a("cxan"),
        r = a("9fIP"),
        c = a("MMYH"),
        l = a("pWxA"),
        p = a("8K1b"),
        x = a("K/z8"),
        u = a("sRHE"),
        d = a("zjfJ"),
        f = a("ERkP"),
        h = a.n(f),
        g = a("yFcC"),
        m = a.n(g),
        b = a("O94r"),
        v = a.n(b),
        j = a("iLAp"),
        w = [
          ".Upvote.jsx-1727309017{position:relative;width:54px;height:54px;overflow:hidden;border-radius:4px;border:1px solid "
            .concat(j.a.lighterGrey, ";background-color:")
            .concat(j.a.blueGrey, ";cursor:pointer;}"),
          ".Upvote.news.jsx-1727309017{width:45px;height:35px;border:none;background-color:transparent;}",
          ".Upvote.comment.jsx-1727309017{width:45px;height:25px;border:none;background-color:transparent;}",
          ".Upvote.jsx-1727309017>div.jsx-1727309017{position:absolute;top:0;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;}",
          ".Upvote.upvoted.jsx-1727309017>div.jsx-1727309017{top:-54px;}",
          ".Upvote.upvoted.news.jsx-1727309017>div.jsx-1727309017{top:-35px;}",
          ".Upvote.upvoted.comment.jsx-1727309017>div.jsx-1727309017{top:-25px;}",
          ".Upvote.jsx-1727309017>div.jsx-1727309017>div.jsx-1727309017{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:54px;height:54px;}",
          ".Upvote.news.jsx-1727309017>div.jsx-1727309017>div.jsx-1727309017{width:45px;height:35px;}",
          ".Upvote.comment.jsx-1727309017>div.jsx-1727309017>div.jsx-1727309017{width:45px;height:25px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}",
          ".Upvote.jsx-1727309017 .icon.jsx-1727309017{font-size:13px;line-height:0;color:".concat(
            j.a.blue,
            ";}"
          ),
          ".Upvote.comment.jsx-1727309017 .icon.jsx-1727309017{padding-right:5px;}",
          ".Upvote.comment.jsx-1727309017 .count.jsx-1727309017{padding-bottom:1px;}",
          ".Upvote.jsx-1727309017 .icon.jsx-1727309017 svg{width:12px;height:12px;fill:".concat(
            j.a.blue,
            ";}"
          ),
          ".Upvote.jsx-1727309017 .count.jsx-1727309017{font-size:13px;font-weight:bold;-webkit-letter-spacing:0.2px;-moz-letter-spacing:0.2px;-ms-letter-spacing:0.2px;letter-spacing:0.2px;color:".concat(
            j.a.grey,
            ";}"
          ),
          ".Upvote.jsx-1727309017:hover{background-color:".concat(
            j.a.white,
            ";}"
          ),
          ".Upvote.news.jsx-1727309017:hover,.Upvote.comment.jsx-1727309017:hover{background-color:#ebf4f7;}",
          ".Upvote.news.jsx-1727309017:hover .count.jsx-1727309017,.Upvote.comment.jsx-1727309017:hover .count.jsx-1727309017{color:".concat(
            j.a.blue,
            ";}"
          ),
          ".Upvote.jsx-1727309017 .voted.jsx-1727309017{background-color:"
            .concat(j.a.blue, ";border-color:")
            .concat(j.a.blue, ";}"),
          ".Upvote.news.jsx-1727309017 .voted.jsx-1727309017,.Upvote.comment.jsx-1727309017 .voted.jsx-1727309017{background-color:".concat(
            j.a.white,
            ";border:none;}"
          ),
          ".Upvote.jsx-1727309017 .voted.jsx-1727309017 .icon.jsx-1727309017 svg{fill:".concat(
            j.a.darkBlue,
            ";}"
          ),
          ".Upvote.news.jsx-1727309017 .voted.jsx-1727309017 .icon.jsx-1727309017 svg,.Upvote.comment.jsx-1727309017 .voted.jsx-1727309017 .icon.jsx-1727309017 svg{fill:".concat(
            j.a.green,
            ";}"
          ),
          ".Upvote.jsx-1727309017 .voted.jsx-1727309017 .count.jsx-1727309017{color:".concat(
            j.a.white,
            ";}"
          ),
          ".Upvote.news.jsx-1727309017 .voted.jsx-1727309017 .count.jsx-1727309017,.Upvote.comment.jsx-1727309017 .voted.jsx-1727309017 .count.jsx-1727309017{color:".concat(
            j.a.green,
            ";}"
          ),
          "@media (min-width:800px){.Upvote.news.jsx-1727309017{height:45px;}.Upvote.comment.jsx-1727309017{height:25px;}.Upvote.upvoted.news.jsx-1727309017>div.jsx-1727309017{top:-45px;}.Upvote.upvoted.comment.jsx-1727309017>div.jsx-1727309017{top:-25px;}.Upvote.news.jsx-1727309017>div.jsx-1727309017>div.jsx-1727309017{height:45px;}.Upvote.comment.jsx-1727309017>div.jsx-1727309017>div.jsx-1727309017{height:25px;}}",
        ];
      w.__hash = "1727309017";
      var k = w,
        y = h.a.createElement,
        _ = function (e) {
          return y(
            "svg",
            e,
            y("path", {
              id: "a",
              d: "M9.769.435a1.255 1.255 0 0 1 1.81-.094 1.35 1.35 0 0 1 .09 1.865l-6.457 7.36a1.257 1.257 0 0 1-1.934-.04l-2.98-3.68a1.348 1.348 0 0 1 .162-1.86 1.255 1.255 0 0 1 1.805.168L4.3 6.667 9.77.435z",
            })
          );
        };
      _.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "12",
        height: "12",
        viewBox: "0 0 12 12",
      };
      var P = function (e) {
        return y("svg", e, y("path", { d: "M1 10L6 0l5 10z" }));
      };
      P.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "12",
        height: "12",
        viewBox: "0 0 12 12",
      };
      var O = function (e) {
        var t = e.upvoted,
          a = e.count,
          n = e.onClick,
          i = e.skin;
        return y(
          "div",
          {
            onClick: n,
            className:
              "jsx-".concat(k.__hash) +
              " " +
              (v()("Upvote", Object(d.a)({ upvoted: t }, i, i)) || ""),
          },
          y(
            "div",
            { className: "jsx-".concat(k.__hash) },
            y(
              "div",
              { className: "jsx-".concat(k.__hash) + " normal" },
              y(
                "span",
                { className: "jsx-".concat(k.__hash) + " icon" },
                y(P, null)
              ),
              y(
                "span",
                { className: "jsx-".concat(k.__hash) + " count" },
                t ? a - 1 : a
              )
            ),
            y(
              "div",
              { className: "jsx-".concat(k.__hash) + " voted" },
              y(
                "span",
                { className: "jsx-".concat(k.__hash) + " icon" },
                y(i ? _ : P, null)
              ),
              y("span", { className: "jsx-".concat(k.__hash) + " count" }, a)
            )
          ),
          y(m.a, { id: k.__hash }, k)
        );
      };
      O.defaultProps = { count: 0, upvoted: !1, skin: "" };
      var C = O,
        R = a("xU+W"),
        U = h.a.createElement;
      function N(e) {
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
            n = Object(u.a)(e);
          if (t) {
            var i = Object(u.a)(this).constructor;
            a = Reflect.construct(n, arguments, i);
          } else a = n.apply(this, arguments);
          return Object(x.a)(this, a);
        };
      }
      var L = (function (e) {
        Object(p.a)(a, e);
        var t = N(a);
        function a(e) {
          var n;
          return (
            Object(r.a)(this, a),
            (n = t.call(this, e)),
            Object(d.a)(Object(l.a)(n), "handleClick", function (e) {
              var t = n.props,
                a = t.votedId,
                i = t.votedModel,
                o = t.removeVote,
                s = t.addVote;
              e.preventDefault(),
                e.stopPropagation(),
                n.setState(function (e) {
                  return (
                    (e.upvoted ? o : s)({ votedId: a, votedModel: i }),
                    {
                      upvoted: !e.upvoted,
                      count: e.count + (e.upvoted ? -1 : 1),
                    }
                  );
                });
            }),
            Object(d.a)(Object(l.a)(n), "showLoginModal", function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                n.props.toggleModal({
                  isLogin: !1,
                  loginTitle: Object(R.a)("auth.loginUpvote"),
                  signUpTitle: Object(R.a)("auth.signUpUpvote"),
                });
            }),
            (n.state = { upvoted: e.upvoted, count: e.count }),
            n
          );
        }
        return (
          Object(c.a)(a, [
            {
              key: "render",
              value: function () {
                return U(
                  C,
                  Object(s.a)({}, this.state, {
                    onClick: this.props.isAuthorized
                      ? this.handleClick
                      : this.showLoginModal,
                    skin: this.props.skin,
                  })
                );
              },
            },
          ]),
          a
        );
      })(h.a.Component);
      t.a = Object(n.connect)(
        function (e) {
          return { isAuthorized: e.auth.isAuthorized };
        },
        function (e) {
          return {
            toggleModal: Object(i.b)(o.J, e),
            addVote: Object(i.b)(o.b, e),
            removeVote: Object(i.b)(o.B, e),
          };
        }
      )(L);
    },
    JLdz: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return x;
      });
      var n = a("yFcC"),
        i = a.n(n),
        o = a("ERkP"),
        s = a.n(o),
        r = a("iLAp"),
        c = [
          ".TitleBar.jsx-1615743782{height:50px;padding:0 5px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;line-height:50px;background-color:"
            .concat(r.a.white, ";border-bottom:1px solid ")
            .concat(r.a.border, ";margin-bottom:65px;}"),
          ".filter.jsx-1615743782{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:48px;}",
          ".action.jsx-1615743782{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;line-height:normal;}",
          ".title.jsx-1615743782{height:65px;line-height:65px;-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;-webkit-order:1;-ms-flex-order:1;order:1;text-align:center;}",
          "h1.jsx-1615743782{margin:0 0;}",
          ".Page.content .TitleBar{display:none;}",
          "@media (min-width:800px){.TitleBar.jsx-1615743782{height:50px;padding:0 25px;display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:29px;margin-top:50px;background-color:"
            .concat(r.a.white, ";border-bottom:1px solid ")
            .concat(
              r.a.border,
              ";}.filter.jsx-1615743782{-webkit-flex:0 0 33%;-ms-flex:0 0 33%;flex:0 0 33%;line-height:normal;}.action.jsx-1615743782{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;line-height:normal;-webkit-flex:0 0 33%;-ms-flex:0 0 33%;flex:0 0 33%;}.action.jsx-1615743782 a{line-height:0;}.title.jsx-1615743782{-webkit-order:0;-ms-flex-order:0;order:0;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;text-align:center;}h1.jsx-1615743782{margin:0 0;}}"
            ),
        ];
      c.__hash = "1615743782";
      var l = c,
        p = s.a.createElement,
        x = function (e) {
          var t = e.children,
            a = e.title,
            n = e.action;
          return p(
            "div",
            { className: "jsx-".concat(l.__hash) + " TitleBar" },
            p("div", { className: "jsx-".concat(l.__hash) + " filter" }, t),
            p("div", { className: "jsx-".concat(l.__hash) + " title" }, a),
            p("div", { className: "jsx-".concat(l.__hash) + " action" }, n),
            p(i.a, { id: l.__hash }, l)
          );
        };
    },
    Oybk: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return f;
      });
      var n = a("yFcC"),
        i = a.n(n),
        o = a("ERkP"),
        s = a.n(o),
        r = a("PxVe"),
        c = a("MTRj"),
        l = a("iLAp"),
        p = a("ET7V"),
        x = s.a.createElement,
        u = function (e, t) {
          return e.map(function (e) {
            return x("div", { key: e }, x(c.a, { title: e, url: t }));
          });
        },
        d = function (e) {
          var t = e.mustRead,
            a = e.tags,
            n = e.url;
          return x(
            "div",
            {
              onClick: function (e) {
                return e.stopPropagation();
              },
              className: "jsx-3846131586 TagLine",
            },
            t ? x(c.a, { mustRead: t, url: n }) : null,
            a.length ? x(c.a, { key: a[0], title: a[0], url: n }) : null,
            a.length > 1
              ? (function (e, t) {
                  return x(
                    r.a,
                    {
                      placement: "bottom",
                      overlay: x(
                        "div",
                        { className: "jsx-3074590885 tooltipInner" },
                        u(e.slice(1), t),
                        x(i.a, { id: "3074590885" }, [
                          ".tooltipInner.jsx-3074590885 .Tag{margin:4px;}",
                        ])
                      ),
                      arrowContent: x("div", {
                        className: "rc-tooltip-arrow-inner",
                      }),
                      trigger: ["click"],
                      align: { offset: [0, 10] },
                    },
                    x(
                      "a",
                      {
                        className:
                          i.a.dynamic([["1698315267", [l.a.grey]]]) + " more",
                      },
                      "+",
                      e.length - 1,
                      x(i.a, { id: "1698315267", dynamic: [l.a.grey] }, [
                        ".more.__jsx-style-dynamic-selector{font-size:11px;cursor:default;color:".concat(
                          l.a.grey,
                          ";}"
                        ),
                        ".more.__jsx-style-dynamic-selector:hover{-webkit-text-decoration:underline;text-decoration:underline;}",
                      ]),
                      x(i.a, { id: p.a.__hash }, p.a)
                    )
                  );
                })(a, n)
              : null,
            x(i.a, { id: "3846131586" }, [
              ".TagLine.jsx-3846131586{display:inline-block;white-space:nowrap;}",
              ".TagLine.jsx-3846131586>.Tag{margin-right:10px;}",
              ".more.jsx-3846131586{font-size:11px;}",
            ])
          );
        };
      d.defaultProps = { tags: [] };
      var f = d;
    },
    PiLd: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return x;
      });
      var n = a("yFcC"),
        i = a.n(n),
        o = a("ERkP"),
        s = a.n(o),
        r = a("iLAp"),
        c = [
          ".Title.jsx-1582297868{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}",
          ".Title.jsx-1582297868 .icon.jsx-1582297868{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;min-width:18px;height:18px;}",
          ".icon.jsx-1582297868 svg{-webkit-flex:1 1 0;-ms-flex:1 1 0;flex:1 1 0;height:18px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;fill:".concat(
            r.a.blue,
            ";}"
          ),
          ".Title.jsx-1582297868 .h1.jsx-1582297868,.Title.jsx-1582297868 h1.jsx-1582297868{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;margin:auto 0 auto 9px;font-size:22px;text-transform:capitalize;}",
          ".Title.jsx-1582297868 .status.jsx-1582297868{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:10px;}",
        ];
      c.__hash = "1582297868";
      var l = c,
        p = s.a.createElement,
        x = function (e) {
          var t = e.icon,
            a = e.text,
            n = e.h1,
            o = e.status;
          return p(
            "div",
            { className: "jsx-".concat(l.__hash) + " Title" },
            p("div", { className: "jsx-".concat(l.__hash) + " icon" }, t),
            n
              ? p("h1", { className: "jsx-".concat(l.__hash) }, a)
              : p("div", { className: "jsx-".concat(l.__hash) + " h1" }, a),
            o &&
              p("div", { className: "jsx-".concat(l.__hash) + " status" }, o),
            p(i.a, { id: l.__hash }, l)
          );
        };
    },
    SRlQ: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return c;
      });
      var n = a("ERkP"),
        i = a.n(n).a.createElement,
        o = function (e) {
          return i(
            "svg",
            e,
            i(
              "defs",
              null,
              i(
                "style",
                null,
                ".cls-1",
                "{",
                "fill:url(#D\xe9grad\xe9_sans_nom_41)",
                "}",
                ".cls-2",
                "{",
                "fill:#fff",
                "}"
              ),
              i(
                "linearGradient",
                {
                  id: "D\xe9grad\xe9_sans_nom_41",
                  x1: "48.62",
                  y1: "13.02",
                  x2: "145.89",
                  y2: "181.49",
                  gradientUnits: "userSpaceOnUse",
                },
                i("stop", { offset: "0", stopColor: "#67c840" }),
                i("stop", { offset: ".32", stopColor: "#65c33f" }),
                i("stop", { offset: ".69", stopColor: "#60b43d" }),
                i("stop", { offset: "1", stopColor: "#59a33b" })
              )
            ),
            i("title", null, "python_1"),
            i("circle", {
              className: "cls-1",
              cx: "97.25",
              cy: "97.25",
              r: "97.25",
            }),
            i("path", {
              className: "cls-2",
              d: "M88.58 145a25.28 25.28 0 0 1-10.36-4.22 10.5 10.5 0 0 1-4.49-8.94c.06-7 0-14 0-21a13.76 13.76 0 0 1 .19-2.57 11.73 11.73 0 0 1 11.79-9.73h22a16.34 16.34 0 0 0 2.86-.18 14.82 14.82 0 0 0 12.3-14.6v-9.09-1h9.8a7 7 0 0 1 1.51.25c3.73.87 5.91 3.46 7.4 6.76a38.55 38.55 0 0 1 2.67 9.94c.36 2.29.53 4.61.78 6.92v1.15s.17 6.66-4 15.52c-2.05 4.42-5.42 6.53-10.39 6.48-10.84-.12-21.69 0-32.54 0-.4 0-.79 0-1.18.05v2.92h23v9.38a7.31 7.31 0 0 1-.13 1.23 10.71 10.71 0 0 1-5.36 7.33 27.58 27.58 0 0 1-9.37 3.42c-10.37 1.37-16.48-.02-16.48-.02zm17-11.11a4.33 4.33 0 1 0 8.66 0 4.33 4.33 0 1 0-8.66 0z",
            }),
            i("path", {
              className: "cls-2",
              d: "M50.3 86.62a16.4 16.4 0 0 1 4.07-8.51 14.39 14.39 0 0 1 10.91-4.47h31.53v-2.92H74.73c-.51 0-1 .11-1-.72.06-3.51 0-7 .14-10.52a8.26 8.26 0 0 1 3.72-7 18.32 18.32 0 0 1 6.5-2.41 65.46 65.46 0 0 1 19.14-.89 38.54 38.54 0 0 1 7.7 1.32c6 1.82 9.09 6.29 9.09 12.5 0 6.86-.09 13.72 0 20.58a11.87 11.87 0 0 1-12.15 12.12c-7.49-.16-15-.06-22.49 0a14.57 14.57 0 0 0-14.46 13.45c-.23 3.43-.08 6.89-.1 10.33v1.21h-7.59a15.4 15.4 0 0 1-2.66-.22c-4-.76-6.59-3.36-8.33-6.91-4.81-12.22-1.94-26.94-1.94-26.94zm29.24-26.2a4.33 4.33 0 1 0 4.3-4.42 4.35 4.35 0 0 0-4.3 4.42z",
            })
          );
        };
      o.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 194.51 194.51",
      };
      var s = function (e) {
        return i(
          "svg",
          e,
          i(
            "defs",
            null,
            i(
              "style",
              null,
              ".cls-3",
              "{",
              "fill:url(#D\xe9grad\xe9_sans_nom_73)",
              "}",
              ".cls-4",
              "{",
              "fill:#fff",
              "}"
            ),
            i(
              "linearGradient",
              {
                id: "D\xe9grad\xe9_sans_nom_73",
                x1: "48.62",
                y1: "13.02",
                x2: "145.89",
                y2: "181.49",
                gradientUnits: "userSpaceOnUse",
              },
              i("stop", { offset: "0", stopColor: "#3ac" }),
              i("stop", { offset: ".26", stopColor: "#31a6c8" }),
              i("stop", { offset: ".54", stopColor: "#2b99be" }),
              i("stop", { offset: ".77", stopColor: "#2388b0" })
            )
          ),
          i("title", null, "R"),
          i("circle", {
            className: "cls-3",
            cx: "97.25",
            cy: "97.25",
            r: "97.25",
          }),
          i("path", {
            className: "cls-4",
            d: "M141 81a23.07 23.07 0 0 1-4.56 13.46 37.64 37.64 0 0 1-10.69 9.77 56.06 56.06 0 0 1-13.39 6 64.89 64.89 0 0 1-14.62 2.67c-9.94.63-20.35-.8-29.77-5.6a37.63 37.63 0 0 1-12.61-10.16 28.1 28.1 0 0 1-4.22-7.48 24.63 24.63 0 0 1 0-17.41 27.68 27.68 0 0 1 4.22-7.49 33.89 33.89 0 0 1 5.84-5.84 40.52 40.52 0 0 1 6.74-4.31c9.42-4.8 19.83-6.24 29.78-5.6a64.74 64.74 0 0 1 14.62 2.68 56 56 0 0 1 13.39 6 37.65 37.65 0 0 1 10.68 9.78A23.08 23.08 0 0 1 141 81zm0 0a21.28 21.28 0 0 0-1.3-7 23.06 23.06 0 0 0-3.54-6.21 32.87 32.87 0 0 0-11.07-8.81 47.24 47.24 0 0 0-13.4-4.33 60 60 0 0 0-27.42 1.92A51 51 0 0 0 72.13 62 32.64 32.64 0 0 0 63 70.44a17.23 17.23 0 0 0 0 21 32.48 32.48 0 0 0 9.17 8.45 50.75 50.75 0 0 0 12.1 5.52 59.88 59.88 0 0 0 27.43 1.91 47.22 47.22 0 0 0 13.4-4.34 32.87 32.87 0 0 0 11.07-8.82 23 23 0 0 0 3.49-6.16 21.28 21.28 0 0 0 1.34-7z",
          }),
          i("path", {
            className: "cls-4",
            d: "M106 112.41h-5.19v27.23H85.59V69.72h25c12.1 0 23.13 4.22 23.13 20 0 9.4-5.08 16.21-12.64 19.78l18.16 30.15h-17zm1.62-11.67c6.05 0 9.73-3.35 9.73-9.83 0-7-3.67-9.08-9.73-9.08h-6.92v18.91z",
          })
        );
      };
      s.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 194.51 194.51",
      };
      var r = function (e) {
        return i(
          "svg",
          e,
          i(
            "defs",
            null,
            i(
              "style",
              null,
              ".cls-5",
              "{",
              "fill:url(#D\xe9grad\xe9_sans_nom_35)",
              "}",
              ".cls-6",
              "{",
              "fill:#fff",
              "}"
            ),
            i(
              "linearGradient",
              {
                id: "D\xe9grad\xe9_sans_nom_35",
                x1: "48.62",
                y1: "13.02",
                x2: "145.89",
                y2: "181.49",
                gradientUnits: "userSpaceOnUse",
              },
              i("stop", { offset: ".11", stopColor: "#be96de" }),
              i("stop", { offset: ".68", stopColor: "#a478c6" })
            )
          ),
          i("title", null, "SQL"),
          i("circle", {
            className: "cls-5",
            cx: "97.25",
            cy: "97.25",
            r: "97.25",
          }),
          i("path", {
            className: "cls-6",
            d: "M69.28 80.4a2.24 2.24 0 0 1-.77.93 1.93 1.93 0 0 1-1 .27 2.63 2.63 0 0 1-1.35-.47q-.75-.47-1.77-1a14.61 14.61 0 0 0-2.39-1 10.07 10.07 0 0 0-3.23-.47 9.49 9.49 0 0 0-2.93.41 6.2 6.2 0 0 0-2.11 1.13 4.51 4.51 0 0 0-1.28 1.73 5.69 5.69 0 0 0-.45 2.14 3.84 3.84 0 0 0 .86 2.56 7.15 7.15 0 0 0 2.27 1.75 21.09 21.09 0 0 0 3.22 1.29q1.8.57 3.68 1.22a35.6 35.6 0 0 1 3.69 1.5 12.79 12.79 0 0 1 3.22 2.17 9.83 9.83 0 0 1 2.27 3.2 11.13 11.13 0 0 1 .86 4.6 15 15 0 0 1-1 5.52 12.76 12.76 0 0 1-2.95 4.48 13.9 13.9 0 0 1-4.74 3 17.45 17.45 0 0 1-6.41 1.1 20.67 20.67 0 0 1-4.09-.41A21.45 21.45 0 0 1 49 114.9a20.11 20.11 0 0 1-3.46-1.8 17 17 0 0 1-2.87-2.35l2.33-3.88a3 3 0 0 1 .8-.71 2 2 0 0 1 1-.29 2.88 2.88 0 0 1 1.62.62q.87.62 2.06 1.37a15.76 15.76 0 0 0 2.8 1.37 10.79 10.79 0 0 0 3.87.62 7.93 7.93 0 0 0 5.35-1.64 5.89 5.89 0 0 0 1.9-4.71 4.37 4.37 0 0 0-.86-2.8 6.92 6.92 0 0 0-2.27-1.82 17 17 0 0 0-3.22-1.25q-1.8-.51-3.67-1.11a31.53 31.53 0 0 1-3.67-1.44 11.88 11.88 0 0 1-3.22-2.2 10 10 0 0 1-2.27-3.38 12.88 12.88 0 0 1-.86-5 12 12 0 0 1 3.71-8.63 13.66 13.66 0 0 1 4.47-2.8 16.27 16.27 0 0 1 6-1.05 20.31 20.31 0 0 1 7.1 1.2 16 16 0 0 1 5.54 3.37zM120 94.24a25.29 25.29 0 0 1-.6 5.58 22.8 22.8 0 0 1-1.73 5 20.78 20.78 0 0 1-2.75 4.26 19.63 19.63 0 0 1-3.7 3.41l11 12h-6.68a8.1 8.1 0 0 1-2.6-.39 5.09 5.09 0 0 1-2.12-1.44l-6.38-7a23.26 23.26 0 0 1-3.14.63 25.81 25.81 0 0 1-3.35.21 23.55 23.55 0 0 1-9-1.67 20.41 20.41 0 0 1-7-4.65 20.88 20.88 0 0 1-4.5-7.05 25.42 25.42 0 0 1 0-17.72A20.88 20.88 0 0 1 82 78.32a20.41 20.41 0 0 1 7-4.65A23.55 23.55 0 0 1 98 72a23.26 23.26 0 0 1 9 1.68 20.59 20.59 0 0 1 6.95 4.65 20.83 20.83 0 0 1 4.48 7 24.12 24.12 0 0 1 1.57 8.91zm-8.3 0a20.25 20.25 0 0 0-.95-6.42A13.58 13.58 0 0 0 108 83a11.73 11.73 0 0 0-4.32-3 16.16 16.16 0 0 0-11.48 0 11.83 11.83 0 0 0-4.35 3 13.64 13.64 0 0 0-2.75 4.83 21.9 21.9 0 0 0 0 12.85 13.48 13.48 0 0 0 2.75 4.81 11.92 11.92 0 0 0 4.35 3 16.16 16.16 0 0 0 11.48 0 11.81 11.81 0 0 0 4.32-3 13.43 13.43 0 0 0 2.72-4.81 20.25 20.25 0 0 0 .94-6.44zM134.44 109.31h17.42V116h-25.52V72.49h8.09z",
          })
        );
      };
      r.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 194.51 194.51",
      };
      var c = function (e) {
        var t = e.programmingLanguage;
        return i(
          "div",
          { className: "CourseCardLogo" },
          "Python" === t && i(o, null),
          "R" === t && i(s, null),
          "SQL" === t && i(r, null)
        );
      };
    },
    kMdX: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return j;
      });
      var n = a("yFcC"),
        i = a.n(n),
        o = a("ERkP"),
        s = a.n(o),
        r = a("jvFD"),
        c = a.n(r),
        l = a("00EI"),
        p = a("SRlQ"),
        x = a("Oybk"),
        u = a("n+Gg"),
        d = a("wAaO"),
        f = a("HSPt"),
        h = a("/dbq"),
        g = a("iLAp"),
        m = [
          ".CourseCard.jsx-2809911334{position:relative;padding-top:20px;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;}",
          ".CourseCard.jsx-2809911334:hover{".concat(g.a.cardShadow, ";}"),
          ".logo.jsx-2809911334{position:absolute;width:42px;height:42px;top:0;left:calc(50% - 21px);}",
          ".content.jsx-2809911334{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:40px 20px 25px;text-align:center;background-color:"
            .concat(g.a.white, ";border:solid 1px ")
            .concat(g.a.border, ";border-radius:4px;cursor:pointer;}"),
          ".date.jsx-2809911334{font-size:11px;line-height:11px;}",
          ".title.jsx-2809911334{margin:12px 0;max-height:60px;overflow:hidden;color:pink;}",
          ".title.jsx-2809911334 h2.jsx-2809911334{margin:0 60px;font-size:22px;line-height:30px;color:".concat(
            g.a.blue,
            ";}"
          ),
          ".title.jsx-2809911334 h2.jsx-2809911334 a.jsx-2809911334{display:block;}",
          ".description.jsx-2809911334{margin:20px 0 30px;max-height:88px;line-height:22px;overflow:hidden;font-weight:300;}",
          ".voteAndSocial.jsx-2809911334{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:flex-end;-webkit-box-align:flex-end;-ms-flex-align:flex-end;align-items:flex-end;}",
          "@media (min-width:800px){.title.jsx-2809911334{margin:12px 0;height:60px;overflow:hidden;}.title.jsx-2809911334 h2.jsx-2809911334{margin:0 30px;}.description.jsx-2809911334{height:66px;}}",
        ];
      m.__hash = "2809911334";
      var b = m,
        v = s.a.createElement,
        j = function (e) {
          var t = e.tagLine,
            a = e.upvote,
            n = e.title,
            o = e.description,
            s = e.publishDate,
            r = e.programmingLanguage,
            g = e.href,
            m = e.as,
            j = e.slug,
            w = e.contentUrl;
          return v(
            c.a,
            {
              href: ""
                .concat(l.LOCAL_PART_PREFIX, "/")
                .concat(g, "?slug=")
                .concat(j),
              as: "".concat(l.LOCAL_PART_PREFIX, "/").concat(m, "/").concat(j),
            },
            v(
              "div",
              { className: "jsx-".concat(b.__hash) + " CourseCard" },
              v(
                "div",
                { className: "jsx-".concat(b.__hash) + " content" },
                v(
                  "div",
                  { className: "jsx-".concat(b.__hash) + " date" },
                  v(d.a, { date: s })
                ),
                v(
                  "div",
                  { className: "jsx-".concat(b.__hash) + " title" },
                  v(
                    "h2",
                    {
                      onClick: function (e) {
                        return e.stopPropagation();
                      },
                      className: "jsx-".concat(b.__hash),
                    },
                    v(
                      c.a,
                      {
                        href: ""
                          .concat(l.LOCAL_PART_PREFIX, "/")
                          .concat(g, "?slug=")
                          .concat(j),
                        as: ""
                          .concat(l.LOCAL_PART_PREFIX, "/")
                          .concat(m, "/")
                          .concat(j),
                      },
                      v(
                        "a",
                        {
                          style: { color: h.a.blueDark },
                          className: "jsx-".concat(b.__hash),
                        },
                        n
                      )
                    )
                  )
                ),
                v(
                  "div",
                  { className: "jsx-".concat(b.__hash) + " tags" },
                  v(x.a, t)
                ),
                v(
                  "div",
                  { className: "jsx-".concat(b.__hash) + " description" },
                  o
                ),
                v(
                  "div",
                  { className: "jsx-".concat(b.__hash) + " voteAndSocial" },
                  v(f.a, a),
                  v(u.a, { url: w })
                )
              ),
              v(
                "div",
                { className: "jsx-".concat(b.__hash) + " logo" },
                v(p.a, { programmingLanguage: r })
              ),
              v(i.a, { id: b.__hash }, b)
            )
          );
        };
    },
    ydJU: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/community/open-courses",
        function () {
          return a("C06M");
        },
      ]);
    },
  },
  [["ydJU", 0, 2, 1, 4, 3, 5]],
]);
