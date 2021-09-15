_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [57],
  {
    "2UCx": function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return N;
      });
      var i = a("fGyu"),
        n = a("9fIP"),
        o = a("pWxA"),
        r = a("8K1b"),
        s = a("K/z8"),
        l = a("sRHE"),
        c = a("zjfJ"),
        x = a("ERkP"),
        u = a.n(x),
        p = a("JBtm"),
        d = a.n(p),
        f = a("yFcC"),
        h = a.n(f),
        m = a("ysqo"),
        b = a.n(m),
        g = a("jvFD"),
        j = a.n(g),
        w = a("O94r"),
        v = a.n(w),
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
        P = u.a.createElement,
        C = function (e) {
          var t = e.links;
          return P(
            "div",
            { className: "Paginator" },
            P(
              b.a,
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
                    j.a,
                    { href: t.firstHref.href },
                    P("a", null, t.firstHref.page)
                  )
                ),
              t.firstHref && P("li", null, "..."),
              t.links.map(function (e) {
                return P(
                  "li",
                  { key: e.page, className: v()({ selected: e.selected }) },
                  P(j.a, { href: e.href }, P("a", null, e.page))
                );
              }),
              t.lastHref && P("li", null, "..."),
              t.lastHref &&
                P(
                  "li",
                  null,
                  P(
                    j.a,
                    { href: t.lastHref.href },
                    P("a", null, t.lastHref.page)
                  )
                )
            ),
            P(h.a, { id: _.__hash }, _)
          );
        },
        O = a("rouc"),
        T = a("00EI"),
        R = u.a.createElement;
      function U(e) {
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
            i = Object(l.a)(e);
          if (t) {
            var n = Object(l.a)(this).constructor;
            a = Reflect.construct(i, arguments, n);
          } else a = i.apply(this, arguments);
          return Object(s.a)(this, a);
        };
      }
      var N = (function (e) {
        Object(r.a)(a, e);
        var t = U(a);
        function a() {
          var e;
          Object(n.a)(this, a);
          for (var r = arguments.length, s = new Array(r), l = 0; l < r; l++)
            s[l] = arguments[l];
          return (
            (e = t.call.apply(t, [this].concat(s))),
            Object(c.a)(Object(o.a)(e), "getHref", function (e) {
              var t = e.tag,
                a = e.mustRead,
                i = e.trending,
                n = e.baseHref,
                o = e.page,
                r = {
                  tag: Object(O.b)(t) || void 0,
                  posts_selected_tab: a
                    ? "must_read"
                    : "/community" === n
                    ? i
                      ? void 0
                      : "latest"
                    : void 0,
                  page: o > 1 ? o : void 0,
                },
                s = d.a.stringify(r);
              return n + (s ? "?" + s : "");
            }),
            Object(c.a)(Object(o.a)(e), "getPageCount", function (e) {
              var t = e.itemsCount,
                a = e.itemsPerPage;
              return Math.floor(t / a) + Number(t % a > 0);
            }),
            Object(c.a)(Object(o.a)(e), "getPageNumbers", function (t) {
              var a = t.itemsCount,
                n = t.itemsPerPage,
                o = t.currentPage,
                r = e.getPageCount({ itemsCount: a, itemsPerPage: n }),
                s = Math.min(r, T.PAGINATOR_PAGE_LIMIT),
                l = Math.floor(s / 2);
              return {
                min: Math.min(Math.max(o - l, 1), r - s + 1),
                pageNumbers: Object(i.a)(Array(s).keys()),
              };
            }),
            Object(c.a)(Object(o.a)(e), "getLink", function (t) {
              var a = t.number,
                i = t.min,
                n = t.currentPage,
                o = t.tag,
                r = t.mustRead,
                s = t.trending,
                l = t.baseHref,
                c = a + i;
              return {
                page: c,
                selected: n === c,
                href: e.getHref({
                  tag: o,
                  mustRead: r,
                  trending: s,
                  baseHref: l,
                  page: c,
                }),
              };
            }),
            Object(c.a)(Object(o.a)(e), "buildLinks", function (t) {
              var a = t.itemsCount,
                i = t.itemsPerPage,
                n = t.currentPage,
                o = t.tag,
                r = t.mustRead,
                s = t.trending,
                l = t.baseHref,
                c = "",
                x = "",
                u = e.getPageNumbers({
                  itemsCount: a,
                  itemsPerPage: i,
                  currentPage: n,
                }),
                p = u.pageNumbers,
                d = u.min,
                f = p.map(function (t) {
                  var a = e.getLink({
                    number: t,
                    min: d,
                    currentPage: n,
                    tag: o,
                    mustRead: r,
                    trending: s,
                    baseHref: l,
                  });
                  return (
                    n - 1 === a.page && (c = a.href),
                    n + 1 === a.page && (x = a.href),
                    a
                  );
                }),
                h = e.getPageCount({ itemsCount: a, itemsPerPage: i });
              return {
                firstHref:
                  p[0] + d === 1
                    ? ""
                    : e.getLink({
                        number: 1,
                        min: 0,
                        currentPage: n,
                        tag: o,
                        mustRead: r,
                        trending: s,
                        baseHref: l,
                      }),
                lastHref:
                  p[p.length - 1] + d === h
                    ? ""
                    : e.getLink({
                        number: h,
                        min: 0,
                        currentPage: n,
                        tag: o,
                        mustRead: r,
                        trending: s,
                        baseHref: l,
                      }),
                prevHref: c,
                nextHref: x,
                links: f,
              };
            }),
            Object(c.a)(Object(o.a)(e), "render", function () {
              return R(C, { links: e.buildLinks(e.props) });
            }),
            e
          );
        }
        return a;
      })(x.Component);
    },
    HSPt: function (e, t, a) {
      "use strict";
      var i = a("uDfI"),
        n = a("9OUN"),
        o = a("Xp8U"),
        r = a("cxan"),
        s = a("9fIP"),
        l = a("MMYH"),
        c = a("pWxA"),
        x = a("8K1b"),
        u = a("K/z8"),
        p = a("sRHE"),
        d = a("zjfJ"),
        f = a("ERkP"),
        h = a.n(f),
        m = a("yFcC"),
        b = a.n(m),
        g = a("O94r"),
        j = a.n(g),
        w = a("iLAp"),
        v = [
          ".Upvote.jsx-1727309017{position:relative;width:54px;height:54px;overflow:hidden;border-radius:4px;border:1px solid "
            .concat(w.a.lighterGrey, ";background-color:")
            .concat(w.a.blueGrey, ";cursor:pointer;}"),
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
            w.a.blue,
            ";}"
          ),
          ".Upvote.comment.jsx-1727309017 .icon.jsx-1727309017{padding-right:5px;}",
          ".Upvote.comment.jsx-1727309017 .count.jsx-1727309017{padding-bottom:1px;}",
          ".Upvote.jsx-1727309017 .icon.jsx-1727309017 svg{width:12px;height:12px;fill:".concat(
            w.a.blue,
            ";}"
          ),
          ".Upvote.jsx-1727309017 .count.jsx-1727309017{font-size:13px;font-weight:bold;-webkit-letter-spacing:0.2px;-moz-letter-spacing:0.2px;-ms-letter-spacing:0.2px;letter-spacing:0.2px;color:".concat(
            w.a.grey,
            ";}"
          ),
          ".Upvote.jsx-1727309017:hover{background-color:".concat(
            w.a.white,
            ";}"
          ),
          ".Upvote.news.jsx-1727309017:hover,.Upvote.comment.jsx-1727309017:hover{background-color:#ebf4f7;}",
          ".Upvote.news.jsx-1727309017:hover .count.jsx-1727309017,.Upvote.comment.jsx-1727309017:hover .count.jsx-1727309017{color:".concat(
            w.a.blue,
            ";}"
          ),
          ".Upvote.jsx-1727309017 .voted.jsx-1727309017{background-color:"
            .concat(w.a.blue, ";border-color:")
            .concat(w.a.blue, ";}"),
          ".Upvote.news.jsx-1727309017 .voted.jsx-1727309017,.Upvote.comment.jsx-1727309017 .voted.jsx-1727309017{background-color:".concat(
            w.a.white,
            ";border:none;}"
          ),
          ".Upvote.jsx-1727309017 .voted.jsx-1727309017 .icon.jsx-1727309017 svg{fill:".concat(
            w.a.darkBlue,
            ";}"
          ),
          ".Upvote.news.jsx-1727309017 .voted.jsx-1727309017 .icon.jsx-1727309017 svg,.Upvote.comment.jsx-1727309017 .voted.jsx-1727309017 .icon.jsx-1727309017 svg{fill:".concat(
            w.a.green,
            ";}"
          ),
          ".Upvote.jsx-1727309017 .voted.jsx-1727309017 .count.jsx-1727309017{color:".concat(
            w.a.white,
            ";}"
          ),
          ".Upvote.news.jsx-1727309017 .voted.jsx-1727309017 .count.jsx-1727309017,.Upvote.comment.jsx-1727309017 .voted.jsx-1727309017 .count.jsx-1727309017{color:".concat(
            w.a.green,
            ";}"
          ),
          "@media (min-width:800px){.Upvote.news.jsx-1727309017{height:45px;}.Upvote.comment.jsx-1727309017{height:25px;}.Upvote.upvoted.news.jsx-1727309017>div.jsx-1727309017{top:-45px;}.Upvote.upvoted.comment.jsx-1727309017>div.jsx-1727309017{top:-25px;}.Upvote.news.jsx-1727309017>div.jsx-1727309017>div.jsx-1727309017{height:45px;}.Upvote.comment.jsx-1727309017>div.jsx-1727309017>div.jsx-1727309017{height:25px;}}",
        ];
      v.__hash = "1727309017";
      var k = v,
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
      var C = function (e) {
        var t = e.upvoted,
          a = e.count,
          i = e.onClick,
          n = e.skin;
        return y(
          "div",
          {
            onClick: i,
            className:
              "jsx-".concat(k.__hash) +
              " " +
              (j()("Upvote", Object(d.a)({ upvoted: t }, n, n)) || ""),
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
                y(n ? _ : P, null)
              ),
              y("span", { className: "jsx-".concat(k.__hash) + " count" }, a)
            )
          ),
          y(b.a, { id: k.__hash }, k)
        );
      };
      C.defaultProps = { count: 0, upvoted: !1, skin: "" };
      var O = C,
        T = a("xU+W"),
        R = h.a.createElement;
      function U(e) {
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
            i = Object(p.a)(e);
          if (t) {
            var n = Object(p.a)(this).constructor;
            a = Reflect.construct(i, arguments, n);
          } else a = i.apply(this, arguments);
          return Object(u.a)(this, a);
        };
      }
      var N = (function (e) {
        Object(x.a)(a, e);
        var t = U(a);
        function a(e) {
          var i;
          return (
            Object(s.a)(this, a),
            (i = t.call(this, e)),
            Object(d.a)(Object(c.a)(i), "handleClick", function (e) {
              var t = i.props,
                a = t.votedId,
                n = t.votedModel,
                o = t.removeVote,
                r = t.addVote;
              e.preventDefault(),
                e.stopPropagation(),
                i.setState(function (e) {
                  return (
                    (e.upvoted ? o : r)({ votedId: a, votedModel: n }),
                    {
                      upvoted: !e.upvoted,
                      count: e.count + (e.upvoted ? -1 : 1),
                    }
                  );
                });
            }),
            Object(d.a)(Object(c.a)(i), "showLoginModal", function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                i.props.toggleModal({
                  isLogin: !1,
                  loginTitle: Object(T.a)("auth.loginUpvote"),
                  signUpTitle: Object(T.a)("auth.signUpUpvote"),
                });
            }),
            (i.state = { upvoted: e.upvoted, count: e.count }),
            i
          );
        }
        return (
          Object(l.a)(a, [
            {
              key: "render",
              value: function () {
                return R(
                  O,
                  Object(r.a)({}, this.state, {
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
      t.a = Object(i.connect)(
        function (e) {
          return { isAuthorized: e.auth.isAuthorized };
        },
        function (e) {
          return {
            toggleModal: Object(n.b)(o.J, e),
            addVote: Object(n.b)(o.b, e),
            removeVote: Object(n.b)(o.B, e),
          };
        }
      )(N);
    },
    JLdz: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return u;
      });
      var i = a("yFcC"),
        n = a.n(i),
        o = a("ERkP"),
        r = a.n(o),
        s = a("iLAp"),
        l = [
          ".TitleBar.jsx-1615743782{height:50px;padding:0 5px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;line-height:50px;background-color:"
            .concat(s.a.white, ";border-bottom:1px solid ")
            .concat(s.a.border, ";margin-bottom:65px;}"),
          ".filter.jsx-1615743782{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:48px;}",
          ".action.jsx-1615743782{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;line-height:normal;}",
          ".title.jsx-1615743782{height:65px;line-height:65px;-webkit-flex:0 0 100%;-ms-flex:0 0 100%;flex:0 0 100%;-webkit-order:1;-ms-flex-order:1;order:1;text-align:center;}",
          "h1.jsx-1615743782{margin:0 0;}",
          ".Page.content .TitleBar{display:none;}",
          "@media (min-width:800px){.TitleBar.jsx-1615743782{height:50px;padding:0 25px;display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:29px;margin-top:50px;background-color:"
            .concat(s.a.white, ";border-bottom:1px solid ")
            .concat(
              s.a.border,
              ";}.filter.jsx-1615743782{-webkit-flex:0 0 33%;-ms-flex:0 0 33%;flex:0 0 33%;line-height:normal;}.action.jsx-1615743782{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;line-height:normal;-webkit-flex:0 0 33%;-ms-flex:0 0 33%;flex:0 0 33%;}.action.jsx-1615743782 a{line-height:0;}.title.jsx-1615743782{-webkit-order:0;-ms-flex-order:0;order:0;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;text-align:center;}h1.jsx-1615743782{margin:0 0;}}"
            ),
        ];
      l.__hash = "1615743782";
      var c = l,
        x = r.a.createElement,
        u = function (e) {
          var t = e.children,
            a = e.title,
            i = e.action;
          return x(
            "div",
            { className: "jsx-".concat(c.__hash) + " TitleBar" },
            x("div", { className: "jsx-".concat(c.__hash) + " filter" }, t),
            x("div", { className: "jsx-".concat(c.__hash) + " title" }, a),
            x("div", { className: "jsx-".concat(c.__hash) + " action" }, i),
            x(n.a, { id: c.__hash }, c)
          );
        };
    },
    JlRj: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/community/tutorials",
        function () {
          return a("bDn0");
        },
      ]);
    },
    Oybk: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return f;
      });
      var i = a("yFcC"),
        n = a.n(i),
        o = a("ERkP"),
        r = a.n(o),
        s = a("PxVe"),
        l = a("MTRj"),
        c = a("iLAp"),
        x = a("ET7V"),
        u = r.a.createElement,
        p = function (e, t) {
          return e.map(function (e) {
            return u("div", { key: e }, u(l.a, { title: e, url: t }));
          });
        },
        d = function (e) {
          var t = e.mustRead,
            a = e.tags,
            i = e.url;
          return u(
            "div",
            {
              onClick: function (e) {
                return e.stopPropagation();
              },
              className: "jsx-3846131586 TagLine",
            },
            t ? u(l.a, { mustRead: t, url: i }) : null,
            a.length ? u(l.a, { key: a[0], title: a[0], url: i }) : null,
            a.length > 1
              ? (function (e, t) {
                  return u(
                    s.a,
                    {
                      placement: "bottom",
                      overlay: u(
                        "div",
                        { className: "jsx-3074590885 tooltipInner" },
                        p(e.slice(1), t),
                        u(n.a, { id: "3074590885" }, [
                          ".tooltipInner.jsx-3074590885 .Tag{margin:4px;}",
                        ])
                      ),
                      arrowContent: u("div", {
                        className: "rc-tooltip-arrow-inner",
                      }),
                      trigger: ["click"],
                      align: { offset: [0, 10] },
                    },
                    u(
                      "a",
                      {
                        className:
                          n.a.dynamic([["1698315267", [c.a.grey]]]) + " more",
                      },
                      "+",
                      e.length - 1,
                      u(n.a, { id: "1698315267", dynamic: [c.a.grey] }, [
                        ".more.__jsx-style-dynamic-selector{font-size:11px;cursor:default;color:".concat(
                          c.a.grey,
                          ";}"
                        ),
                        ".more.__jsx-style-dynamic-selector:hover{-webkit-text-decoration:underline;text-decoration:underline;}",
                      ]),
                      u(n.a, { id: x.a.__hash }, x.a)
                    )
                  );
                })(a, i)
              : null,
            u(n.a, { id: "3846131586" }, [
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
        return u;
      });
      var i = a("yFcC"),
        n = a.n(i),
        o = a("ERkP"),
        r = a.n(o),
        s = a("iLAp"),
        l = [
          ".Title.jsx-1582297868{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}",
          ".Title.jsx-1582297868 .icon.jsx-1582297868{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;min-width:18px;height:18px;}",
          ".icon.jsx-1582297868 svg{-webkit-flex:1 1 0;-ms-flex:1 1 0;flex:1 1 0;height:18px;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;fill:".concat(
            s.a.blue,
            ";}"
          ),
          ".Title.jsx-1582297868 .h1.jsx-1582297868,.Title.jsx-1582297868 h1.jsx-1582297868{-webkit-flex:0 0 auto;-ms-flex:0 0 auto;flex:0 0 auto;margin:auto 0 auto 9px;font-size:22px;text-transform:capitalize;}",
          ".Title.jsx-1582297868 .status.jsx-1582297868{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:10px;}",
        ];
      l.__hash = "1582297868";
      var c = l,
        x = r.a.createElement,
        u = function (e) {
          var t = e.icon,
            a = e.text,
            i = e.h1,
            o = e.status;
          return x(
            "div",
            { className: "jsx-".concat(c.__hash) + " Title" },
            x("div", { className: "jsx-".concat(c.__hash) + " icon" }, t),
            i
              ? x("h1", { className: "jsx-".concat(c.__hash) }, a)
              : x("div", { className: "jsx-".concat(c.__hash) + " h1" }, a),
            o &&
              x("div", { className: "jsx-".concat(c.__hash) + " status" }, o),
            x(n.a, { id: c.__hash }, c)
          );
        };
    },
    RVif: function (e, t, a) {
      "use strict";
      a.d(t, "a", function () {
        return k;
      });
      var i = a("yFcC"),
        n = a.n(i),
        o = a("ERkP"),
        r = a.n(o),
        s = a("jvFD"),
        l = a.n(s),
        c = a("O94r"),
        x = a.n(c),
        u = a("00EI"),
        p = a("PJI/"),
        d = a("Oybk"),
        f = a("n+Gg"),
        h = a("HSPt"),
        m = a("iLAp"),
        b = [
          ".TutorialCard.jsx-2625178925{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background-color:".concat(
            m.a.white,
            ";border-radius:4px;border:solid 1px #e3e7e8;overflow:hidden;cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;}"
          ),
          ".TutorialCard.jsx-2625178925:hover{".concat(m.a.cardShadow, ";}"),
          "h2.jsx-2625178925{overflow:hidden;font-size:20px;}",
          "h2.jsx-2625178925 a.jsx-2625178925{display:block;height:52px;}",
          ".image.jsx-2625178925{background-size:cover;background-position:center;height:144px;}",
          ".info.jsx-2625178925{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:20px;}",
          ".info.jsx-2625178925 .description.jsx-2625178925{display:inline-block;height:65px;max-height:65px;overflow:hidden;font-weight:300;}",
          ".infoVoteAndSocial.jsx-2625178925{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:flex-end;-webkit-box-align:flex-end;-ms-flex-align:flex-end;align-items:flex-end;}",
          ".space.jsx-2625178925{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;}",
          ".authorWrapper.jsx-2625178925{margin:16px 0;}",
          ".authorWrapper.jsx-2625178925 .TagLine{display:none;}",
          ".TutorialCard.jsx-2625178925 .Author{display:inline-block;}",
          "@media (min-width:800px) and (min-height:650px){.TutorialCard.jsx-2625178925 .info.noImage.jsx-2625178925{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;}.TutorialCard.landscape.jsx-2625178925{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;}.TutorialCard.jsx-2625178925:not(.landscape) h2.jsx-2625178925{margin-bottom:0px;}.TutorialCard.jsx-2625178925:not(.landscape):not(.topCard) .description.jsx-2625178925{display:none !important;}.TutorialCard.landscape.jsx-2625178925 .image.jsx-2625178925{height:auto;min-width:200px;}.topCard.jsx-2625178925 .image.jsx-2625178925{height:170px;}.topCard.jsx-2625178925 .info.jsx-2625178925{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.topCard.jsx-2625178925 .infoHead.jsx-2625178925{padding:0 70px;}.topCard.jsx-2625178925 .infoHead.jsx-2625178925 h2.jsx-2625178925{margin-top:0;}.topCard.jsx-2625178925 .description.jsx-2625178925{display:block;height:auto;}.topCard.jsx-2625178925 .infoHead.jsx-2625178925 .TagLine{display:none;}.topCard.jsx-2625178925 .authorWrapper.jsx-2625178925{margin:0;-webkit-order:-1;-ms-flex-order:-1;order:-1;}.topCard.jsx-2625178925 .authorWrapper.jsx-2625178925 .Author{margin-bottom:10px;}.topCard.jsx-2625178925 .authorWrapper.jsx-2625178925 .TagLine{display:block;}.topCard.jsx-2625178925 .infoVoteAndSocial.jsx-2625178925{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:flex-end;-webkit-box-align:flex-end;-ms-flex-align:flex-end;align-items:flex-end;}}",
        ];
      b.__hash = "2625178925";
      var g = b,
        j = a("/dbq"),
        w = r.a.createElement,
        v = function (e) {
          var t = e.landscape,
            a = e.tagLine,
            i = e.author,
            o = e.title,
            r = e.description,
            s = e.illustrationSrc,
            c = e.upvote,
            m = e.slug,
            b = e.contentUrl,
            v = e.className,
            k = e.hideUpvote;
          return w(
            l.a,
            {
              href: "".concat(u.LOCAL_PART_PREFIX, "/tutorial?slug=").concat(m),
              as: "".concat(u.LOCAL_PART_PREFIX, "/tutorials/").concat(m),
            },
            w(
              "div",
              {
                className:
                  "jsx-".concat(g.__hash) +
                  " " +
                  (x()("TutorialCard", v, { landscape: t }) || ""),
              },
              s
                ? w("div", {
                    style: { backgroundImage: "url(".concat(s, ")") },
                    className: "jsx-".concat(g.__hash) + " image",
                  })
                : null,
              w(
                "div",
                {
                  className:
                    "jsx-".concat(g.__hash) +
                    " " +
                    (x()("info", { noImage: !s }) || ""),
                },
                w(
                  "div",
                  { className: "jsx-".concat(g.__hash) + " infoHead" },
                  w(d.a, a),
                  w(
                    "h2",
                    {
                      onClick: function (e) {
                        return e.stopPropagation();
                      },
                      className: "jsx-".concat(g.__hash) + " blue",
                    },
                    w(
                      l.a,
                      {
                        href: ""
                          .concat(u.LOCAL_PART_PREFIX, "/tutorial?slug=")
                          .concat(m),
                        as: ""
                          .concat(u.LOCAL_PART_PREFIX, "/tutorials/")
                          .concat(m),
                      },
                      w(
                        "a",
                        {
                          style: { color: j.a.blueDark },
                          className: "jsx-".concat(g.__hash),
                        },
                        o
                      )
                    )
                  ),
                  w(
                    "span",
                    {
                      className:
                        "jsx-".concat(g.__hash) + " blocText description",
                    },
                    r
                  )
                ),
                w("div", { className: "jsx-".concat(g.__hash) + " space" }),
                w(
                  "div",
                  { className: "jsx-".concat(g.__hash) + " authorWrapper" },
                  w(p.a, i),
                  w(d.a, a)
                ),
                k
                  ? w("div", {
                      className: "jsx-".concat(g.__hash) + " infoVoteAndSocial",
                    })
                  : w(
                      "div",
                      {
                        className:
                          "jsx-".concat(g.__hash) + " infoVoteAndSocial",
                      },
                      w(h.a, c),
                      w(f.a, { url: b })
                    )
              ),
              w(n.a, { id: g.__hash }, g)
            )
          );
        };
      v.defaultProps = {
        author: {},
        title: "",
        description: "",
        landscape: !1,
      };
      var k = v;
    },
    bDn0: function (e, t, a) {
      "use strict";
      a.r(t);
      var i = a("VtSi"),
        n = a.n(i),
        o = a("QsI/"),
        r = a("cxan"),
        s = a("9fIP"),
        l = a("MMYH"),
        c = a("pWxA"),
        x = a("8K1b"),
        u = a("K/z8"),
        p = a("sRHE"),
        d = a("zjfJ"),
        f = a("ERkP"),
        h = a.n(f),
        m = a("aWzz"),
        b = a.n(m),
        g = a("7xIC"),
        j = a("p/5q"),
        w = a.n(j),
        v = a("yFcC"),
        k = a.n(v),
        y = a("O94r"),
        _ = a.n(y),
        P = a("ug5E"),
        C = a("JLdz"),
        O = a("PiLd"),
        T = a("RVif"),
        R = a("2UCx"),
        U = a("2lh8"),
        N = a("2A9Z"),
        L = [
          ".Tutorials{margin:0 auto;}",
          ".Tutorials .TutorialCard,.Tutorials .TutorialTopCard{margin:0 10px 30px;}",
          "@media (min-width:800px){.Tutorials{padding:0 15px;max-width:1065px;}.Tutorials .TutorialTopCard{margin:0 15px 30px;}.list{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;}.topcard .TutorialCard{-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%;margin:0 15px 30px;}.twoColumns .TutorialCard{-webkit-flex-basis:calc((100% - 60px) / 2);-ms-flex-preferred-size:calc((100% - 60px) / 2);flex-basis:calc((100% - 60px) / 2);margin:0 15px 30px;}.threeColumns{-webkit-align-items:stretch;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;}.threeColumns .TutorialCard{-webkit-flex-basis:calc((100% - 90px) / 3);-ms-flex-preferred-size:calc((100% - 90px) / 3);flex-basis:calc((100% - 90px) / 3);margin:0 15px 30px;}}",
        ];
      L.__hash = "625975047";
      var H = L,
        A = a("xU+W"),
        E = a("00EI"),
        z = h.a.createElement,
        I = function (e) {
          return z(
            "svg",
            e,
            z("path", {
              d: "M16.23 24.22a2 2 0 0 1-.73-.14L7 20.79a2 2 0 0 1-1.29-1.88v-4a1.5 1.5 0 0 1 3 0v3.36l7.54 2.92 7.54-2.92v-3.45a1.5 1.5 0 0 1 3 0v4.09a2 2 0 0 1-1.29 1.88L17 24.08a2 2 0 0 1-.77.14zm-.35-2.94zm.7 0z",
            }),
            z("path", {
              d: "M16.23 13.35a2 2 0 0 1-.62-.1C9.17 11.16 2.36 9 1.61 8.76a2 2 0 0 1-.25-3.87l14-4.78a2 2 0 0 1 1.3 0l14 4.78a2 2 0 0 1 0 3.81l-13.8 4.55a2 2 0 0 1-.63.1zm-.31-3zM5.21 6.74c3.49 1.11 9.07 2.92 11 3.56l10.68-3.53L16 3.05z",
            })
          );
        };
      I.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 32 24.22",
      };
      var M = function (e) {
        return z(
          "svg",
          e,
          z("path", {
            d: "M83.393 33.573a5.357 5.357 0 0 0 0-10.714H69.19l2.729-15.478A5.358 5.358 0 0 0 61.367 5.52L58.31 22.858H36.832L39.561 7.38A5.359 5.359 0 0 0 29.008 5.52l-3.057 17.338H10.179a5.358 5.358 0 0 0 0 10.714h13.884l-3.149 17.857H6.607a5.357 5.357 0 0 0 0 10.714h12.417l-2.729 15.48a5.357 5.357 0 0 0 10.552 1.858l3.058-17.338h21.479l-2.729 15.48a5.357 5.357 0 1 0 10.552 1.859l3.058-17.339h17.559a5.357 5.357 0 0 0 0-10.714h-15.67l3.149-17.857h16.09zM53.272 51.43H31.793l3.149-17.857h21.479L53.272 51.43z",
            id: "path4200",
          })
        );
      };
      M.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 90 85",
        width: "90",
        height: "85",
      };
      var F = function (e, t, a) {
          return z(T.a, {
            className: _()({ topCard: t }),
            key: e.id,
            tagLine: {
              mustRead: e.mustRead,
              tags: e.tags,
              url: "".concat(E.LOCAL_PART_PREFIX, "/tutorials"),
            },
            author: {
              avatarSrc: e.author.avatarUrlSquare,
              name: e.author.fullName,
              href: e.authorId,
              date: e.publishDate,
            },
            upvote: {
              upvoted: e.upvoting.voted,
              count: e.upvoting.voteCount,
              votedId: e.id,
              votedModel: "Tutorial",
            },
            title: e.title,
            illustrationSrc: e.illustrationUrl
              ? ""
                  .concat(E.CLOUDINARY_PREFIX.tutorial)
                  .concat(e.illustrationUrl)
              : null,
            description: e.description,
            landscape: a,
            slug: e.slug,
            contentUrl: e.contentUrl,
          });
        },
        S = function (e, t, a, i) {
          return z(
            "div",
            { className: _()("list", { twoColumns: i, threeColumns: !i }) },
            e.slice(t, t + a).map(function (e) {
              return F(e, !1, i);
            })
          );
        },
        D = function (e) {
          var t = e.list,
            a = (t.isFetching, t.isFetched, t.Tutorial),
            i = t.TutorialTotal,
            n = e.mustRead,
            o = e.page,
            r = e.tag,
            s = e.url,
            l = e.asPath;
          e.isTwoColumn;
          return z(
            P.a,
            {
              title: Object(A.a)("seo.tutorials.title"),
              description: Object(A.a)("seo.tutorials.description"),
              uri: l,
              analytics: {
                contentTitle: "all tutorials",
                contentType: "community-tutorial",
              },
              pageType: "list",
            },
            z(
              U.a,
              null,
              z(
                C.a,
                {
                  title: z(O.a, {
                    icon: r ? z(M, { width: 25 }) : z(I, null),
                    text: r || Object(A.a)("menus.tutorials"),
                    h1: !0,
                  }),
                },
                z(N.a, {
                  showLatest: !0,
                  showMustRead: !0,
                  url: s,
                  mustRead: n,
                })
              ),
              z(
                "div",
                { className: "Tutorials" },
                a.length > 0 &&
                  z("div", { className: _()("list topcard") }, F(a[0], !0, !1)),
                a.length > 1 ? S(a, 1, 2, !0) : null,
                a.length > 3 ? S(a, 3, 3, !1) : null,
                a.length > 6 ? S(a, 6, 4, !0) : null,
                a.length > 10 ? S(a, 10, 3, !1) : null,
                a.length > 13 ? S(a, 13, 2, !0) : null,
                i > 0 &&
                  z(R.a, {
                    baseHref: "".concat(E.LOCAL_PART_PREFIX, "/tutorials"),
                    itemsCount: i,
                    itemsPerPage: E.POST_LIMIT.Tutorial,
                    currentPage: o,
                    tag: r,
                    mustRead: n,
                  })
              )
            ),
            z(k.a, { id: H.__hash }, H)
          );
        },
        V = a("Ij73"),
        J = a("Xp8U"),
        W = a("dio+"),
        B = a("rouc"),
        X = h.a.createElement;
      function q(e) {
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
            i = Object(p.a)(e);
          if (t) {
            var n = Object(p.a)(this).constructor;
            a = Reflect.construct(i, arguments, n);
          } else a = i.apply(this, arguments);
          return Object(u.a)(this, a);
        };
      }
      var G = (function (e) {
        Object(x.a)(a, e);
        var t = q(a);
        function a() {
          var e;
          Object(s.a)(this, a);
          for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++)
            n[o] = arguments[o];
          return (
            (e = t.call.apply(t, [this].concat(n))),
            Object(d.a)(Object(c.a)(e), "render", function () {
              return X(D, Object(r.a)({}, e.props, { url: e.props.router }));
            }),
            e
          );
        }
        return (
          Object(l.a)(
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
                    n.a.mark(function e(t) {
                      var a, i, o, r, s, l, c;
                      return n.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (a = t.store),
                                (i = t.asPath),
                                (o = t.query),
                                (r = t.req),
                                (e.next = 3),
                                Object(W.a)({ store: a, req: r })
                              );
                            case 3:
                              return (
                                (s = "must_read" === o.posts_selected_tab),
                                (l = parseInt(o.page, 10) || 1),
                                (c = Object(B.a)(o.tag)),
                                (e.next = 8),
                                a.dispatch(
                                  Object(J.n)({
                                    modelName: "Tutorial",
                                    mustRead: s,
                                    page: l,
                                    tag: c,
                                  })
                                )
                              );
                            case 8:
                              return (
                                a.dispatch(Object(J.w)()),
                                e.abrupt("return", {
                                  asPath: i,
                                  mustRead: s,
                                  page: l,
                                  tag: c,
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
      })(f.Component);
      Object(d.a)(G, "childContextTypes", { asPath: b.a.string });
      t.default = w()(
        V.a,
        function (e) {
          return { list: e.list };
        },
        function (e) {
          return {};
        }
      )(Object(g.withRouter)(G));
    },
  },
  [["JlRj", 0, 2, 1, 4, 3, 5]],
]);
