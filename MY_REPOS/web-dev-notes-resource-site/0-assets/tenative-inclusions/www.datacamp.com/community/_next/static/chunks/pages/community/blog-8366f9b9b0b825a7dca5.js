_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [41],
  {
    "2UCx": function (t, e, a) {
      "use strict";
      a.d(e, "a", function () {
        return I;
      });
      var n = a("fGyu"),
        r = a("9fIP"),
        i = a("pWxA"),
        o = a("8K1b"),
        c = a("K/z8"),
        u = a("sRHE"),
        s = a("zjfJ"),
        l = a("ERkP"),
        g = a.n(l),
        f = a("JBtm"),
        p = a.n(f),
        d = a("yFcC"),
        h = a.n(d),
        m = a("ysqo"),
        b = a.n(m),
        v = a("jvFD"),
        P = a.n(v),
        j = a("O94r"),
        x = a.n(j),
        y = a("iLAp"),
        O = [
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
      O.__hash = "1311234595";
      var _ = O,
        H = g.a.createElement,
        R = function (t) {
          var e = t.links;
          return H(
            "div",
            { className: "Paginator" },
            H(
              b.a,
              null,
              e.nextHref && H("link", { rel: "next", href: e.nextHref }),
              e.prevHref && H("link", { rel: "prev", href: e.prevHref })
            ),
            H(
              "ul",
              null,
              e.firstHref &&
                H(
                  "li",
                  null,
                  H(
                    P.a,
                    { href: e.firstHref.href },
                    H("a", null, e.firstHref.page)
                  )
                ),
              e.firstHref && H("li", null, "..."),
              e.links.map(function (t) {
                return H(
                  "li",
                  { key: t.page, className: x()({ selected: t.selected }) },
                  H(P.a, { href: t.href }, H("a", null, t.page))
                );
              }),
              e.lastHref && H("li", null, "..."),
              e.lastHref &&
                H(
                  "li",
                  null,
                  H(
                    P.a,
                    { href: e.lastHref.href },
                    H("a", null, e.lastHref.page)
                  )
                )
            ),
            H(h.a, { id: _.__hash }, _)
          );
        },
        w = a("rouc"),
        k = a("00EI"),
        C = g.a.createElement;
      function E(t) {
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
            n = Object(u.a)(t);
          if (e) {
            var r = Object(u.a)(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return Object(c.a)(this, a);
        };
      }
      var I = (function (t) {
        Object(o.a)(a, t);
        var e = E(a);
        function a() {
          var t;
          Object(r.a)(this, a);
          for (var o = arguments.length, c = new Array(o), u = 0; u < o; u++)
            c[u] = arguments[u];
          return (
            (t = e.call.apply(e, [this].concat(c))),
            Object(s.a)(Object(i.a)(t), "getHref", function (t) {
              var e = t.tag,
                a = t.mustRead,
                n = t.trending,
                r = t.baseHref,
                i = t.page,
                o = {
                  tag: Object(w.b)(e) || void 0,
                  posts_selected_tab: a
                    ? "must_read"
                    : "/community" === r
                    ? n
                      ? void 0
                      : "latest"
                    : void 0,
                  page: i > 1 ? i : void 0,
                },
                c = p.a.stringify(o);
              return r + (c ? "?" + c : "");
            }),
            Object(s.a)(Object(i.a)(t), "getPageCount", function (t) {
              var e = t.itemsCount,
                a = t.itemsPerPage;
              return Math.floor(e / a) + Number(e % a > 0);
            }),
            Object(s.a)(Object(i.a)(t), "getPageNumbers", function (e) {
              var a = e.itemsCount,
                r = e.itemsPerPage,
                i = e.currentPage,
                o = t.getPageCount({ itemsCount: a, itemsPerPage: r }),
                c = Math.min(o, k.PAGINATOR_PAGE_LIMIT),
                u = Math.floor(c / 2);
              return {
                min: Math.min(Math.max(i - u, 1), o - c + 1),
                pageNumbers: Object(n.a)(Array(c).keys()),
              };
            }),
            Object(s.a)(Object(i.a)(t), "getLink", function (e) {
              var a = e.number,
                n = e.min,
                r = e.currentPage,
                i = e.tag,
                o = e.mustRead,
                c = e.trending,
                u = e.baseHref,
                s = a + n;
              return {
                page: s,
                selected: r === s,
                href: t.getHref({
                  tag: i,
                  mustRead: o,
                  trending: c,
                  baseHref: u,
                  page: s,
                }),
              };
            }),
            Object(s.a)(Object(i.a)(t), "buildLinks", function (e) {
              var a = e.itemsCount,
                n = e.itemsPerPage,
                r = e.currentPage,
                i = e.tag,
                o = e.mustRead,
                c = e.trending,
                u = e.baseHref,
                s = "",
                l = "",
                g = t.getPageNumbers({
                  itemsCount: a,
                  itemsPerPage: n,
                  currentPage: r,
                }),
                f = g.pageNumbers,
                p = g.min,
                d = f.map(function (e) {
                  var a = t.getLink({
                    number: e,
                    min: p,
                    currentPage: r,
                    tag: i,
                    mustRead: o,
                    trending: c,
                    baseHref: u,
                  });
                  return (
                    r - 1 === a.page && (s = a.href),
                    r + 1 === a.page && (l = a.href),
                    a
                  );
                }),
                h = t.getPageCount({ itemsCount: a, itemsPerPage: n });
              return {
                firstHref:
                  f[0] + p === 1
                    ? ""
                    : t.getLink({
                        number: 1,
                        min: 0,
                        currentPage: r,
                        tag: i,
                        mustRead: o,
                        trending: c,
                        baseHref: u,
                      }),
                lastHref:
                  f[f.length - 1] + p === h
                    ? ""
                    : t.getLink({
                        number: h,
                        min: 0,
                        currentPage: r,
                        tag: i,
                        mustRead: o,
                        trending: c,
                        baseHref: u,
                      }),
                prevHref: s,
                nextHref: l,
                links: d,
              };
            }),
            Object(s.a)(Object(i.a)(t), "render", function () {
              return C(R, { links: t.buildLinks(t.props) });
            }),
            t
          );
        }
        return a;
      })(l.Component);
    },
    IYUc: function (t, e, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/community/blog",
        function () {
          return a("i2XN");
        },
      ]);
    },
    i2XN: function (t, e, a) {
      "use strict";
      a.r(e);
      var n = a("VtSi"),
        r = a.n(n),
        i = a("QsI/"),
        o = a("9fIP"),
        c = a("MMYH"),
        u = a("pWxA"),
        s = a("8K1b"),
        l = a("K/z8"),
        g = a("sRHE"),
        f = a("zjfJ"),
        p = a("ERkP"),
        d = a.n(p),
        h = a("aWzz"),
        m = a.n(h),
        b = a("p/5q"),
        v = a.n(b),
        P = a("yFcC"),
        j = a.n(P),
        x = a("ug5E"),
        y = a("JLdz"),
        O = a("PiLd"),
        _ = a("vQwQ"),
        H = a("2UCx"),
        R = a("2lh8"),
        w = a("2A9Z"),
        k = [
          ".Blog.jsx-2569366592{margin:0 auto;}",
          ".Blog.jsx-2569366592 .BlogCard{margin:0 10px 30px;}",
          "@media (min-width:800px){.Blog.jsx-2569366592{max-width:1065px;}.Blog.jsx-2569366592 .BlogCard{margin:0 30px 30px;}}",
        ];
      k.__hash = "2569366592";
      var C = k,
        E = a("xU+W"),
        I = a("00EI"),
        L = a("MGc7"),
        N = a("/dbq"),
        A = d.a.createElement,
        B = function (t) {
          return A(
            "svg",
            t,
            A("path", {
              d: "M83.393 33.573a5.357 5.357 0 0 0 0-10.714H69.19l2.729-15.478A5.358 5.358 0 0 0 61.367 5.52L58.31 22.858H36.832L39.561 7.38A5.359 5.359 0 0 0 29.008 5.52l-3.057 17.338H10.179a5.358 5.358 0 0 0 0 10.714h13.884l-3.149 17.857H6.607a5.357 5.357 0 0 0 0 10.714h12.417l-2.729 15.48a5.357 5.357 0 0 0 10.552 1.858l3.058-17.338h21.479l-2.729 15.48a5.357 5.357 0 1 0 10.552 1.859l3.058-17.339h17.559a5.357 5.357 0 0 0 0-10.714h-15.67l3.149-17.857h16.09zM53.272 51.43H31.793l3.149-17.857h21.479L53.272 51.43z",
              id: "path4200",
            })
          );
        };
      B.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 90 85",
        width: "90",
        height: "85",
      };
      var M = function (t) {
          var e = t.list,
            a = (e.isFetching, e.isFetched, e.Blog),
            n = e.BlogTotal,
            r = t.mustRead,
            i = t.page,
            o = t.tag,
            c = t.asPath;
          return A(
            x.a,
            {
              title: Object(E.a)("seo.blog.title"),
              description: Object(E.a)("seo.blog.description"),
              uri: c,
              analytics: {
                contentTitle: "all posts",
                contentType: "community-blog",
              },
              pageType: "list",
            },
            A(
              R.a,
              null,
              A(
                y.a,
                {
                  title: A(O.a, {
                    icon: o
                      ? A(B, { width: 25 })
                      : A(L.a, { logomarkColor: N.a.navy }),
                    text: o || Object(E.a)("menus.officialBlog"),
                    h1: !0,
                  }),
                },
                A(w.a, null)
              ),
              n > 0 &&
                A(
                  "div",
                  { className: "jsx-".concat(C.__hash) + " Blog" },
                  a.map(function (t) {
                    return A(_.a, {
                      key: t.id,
                      tagLine: {
                        mustRead: t.mustRead,
                        tags: t.tags,
                        url: "".concat(I.LOCAL_PART_PREFIX, "/blog"),
                      },
                      author: {
                        avatarSrc: t.author.avatarUrlSquare,
                        name: t.author.fullName,
                        href: t.authorId,
                        date: t.publishDate,
                      },
                      upvote: {
                        upvoted: t.upvoting.voted,
                        count: t.upvoting.voteCount,
                        votedId: t.id,
                        votedModel: "Blog",
                      },
                      title: t.title,
                      description: t.description,
                      href: "blogpost",
                      as: "blog",
                      slug: t.slug,
                    });
                  })
                ),
              n > 0 &&
                A(H.a, {
                  baseHref: "".concat(I.LOCAL_PART_PREFIX, "/blog"),
                  itemsCount: n,
                  itemsPerPage: I.POST_LIMIT.Blog,
                  currentPage: i,
                  tag: o,
                  mustRead: r,
                })
            ),
            A(j.a, { id: C.__hash }, C)
          );
        },
        T = a("Ij73"),
        z = a("Xp8U"),
        q = a("dio+"),
        F = a("rouc"),
        U = d.a.createElement;
      function X(t) {
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
            n = Object(g.a)(t);
          if (e) {
            var r = Object(g.a)(this).constructor;
            a = Reflect.construct(n, arguments, r);
          } else a = n.apply(this, arguments);
          return Object(l.a)(this, a);
        };
      }
      var D = (function (t) {
        Object(s.a)(a, t);
        var e = X(a);
        function a() {
          var t;
          Object(o.a)(this, a);
          for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
            r[i] = arguments[i];
          return (
            (t = e.call.apply(e, [this].concat(r))),
            Object(f.a)(Object(u.a)(t), "render", function () {
              return U(M, t.props);
            }),
            t
          );
        }
        return (
          Object(c.a)(
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
                  var t = Object(i.a)(
                    r.a.mark(function t(e) {
                      var a, n, i, o, c, u, s;
                      return r.a.wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (a = e.store),
                                (n = e.asPath),
                                (i = e.query),
                                (o = e.req),
                                (t.next = 3),
                                Object(q.a)({ store: a, req: o })
                              );
                            case 3:
                              return (
                                (c = "must_read" === i.posts_selected_tab),
                                (u = parseInt(i.page, 10) || 1),
                                (s = Object(F.a)(i.tag)),
                                (t.next = 8),
                                a.dispatch(
                                  Object(z.n)({
                                    modelName: "Blog",
                                    mustRead: c,
                                    page: u,
                                    tag: s,
                                  })
                                )
                              );
                            case 8:
                              return (
                                a.dispatch(Object(z.w)()),
                                t.abrupt("return", {
                                  asPath: n,
                                  mustRead: c,
                                  page: u,
                                  tag: s,
                                })
                              );
                            case 10:
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
      Object(f.a)(D, "childContextTypes", { asPath: m.a.string });
      e.default = v()(
        T.a,
        function (t) {
          return { list: t.list };
        },
        function () {
          return {};
        }
      )(D);
    },
  },
  [["IYUc", 0, 2, 1, 4, 3, 5, 16]],
]);
