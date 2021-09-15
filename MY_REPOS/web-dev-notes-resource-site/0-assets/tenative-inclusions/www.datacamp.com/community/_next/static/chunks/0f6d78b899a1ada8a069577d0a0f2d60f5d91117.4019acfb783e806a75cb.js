(window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [14],
  {
    "4/WF": function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.StickyContainer = e.Sticky = void 0);
      var o = a(n("O2mD")),
        r = a(n("gB0z"));
      function a(t) {
        return t && t.__esModule ? t : { default: t };
      }
      (e.Sticky = o.default),
        (e.StickyContainer = r.default),
        (e.default = o.default);
    },
    O2mD: function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = (function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var o = e[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(t, o.key, o);
            }
          }
          return function (e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
          };
        })(),
        r = n("ERkP"),
        a = l(r),
        i = l(n("7nmT")),
        c = l(n("aWzz"));
      function l(t) {
        return t && t.__esModule ? t : { default: t };
      }
      function s(t, e) {
        if (!t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !e || ("object" !== typeof e && "function" !== typeof e) ? t : e;
      }
      var d = (function (t) {
        function e() {
          var t, n, o;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e);
          for (var r = arguments.length, a = Array(r), i = 0; i < r; i++)
            a[i] = arguments[i];
          return (
            (n = o =
              s(
                this,
                (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(
                  t,
                  [this].concat(a)
                )
              )),
            (o.state = { isSticky: !1, wasSticky: !1, style: {} }),
            (o.handleContainerEvent = function (t) {
              var e = t.distanceFromTop,
                n = t.distanceFromBottom,
                r = t.eventSource,
                a = o.context.getParent(),
                i = !1;
              o.props.relative &&
                ((i = r !== a),
                (e = -(r.scrollTop + r.offsetTop) + o.placeholder.offsetTop));
              var c = o.placeholder.getBoundingClientRect(),
                l = o.content.getBoundingClientRect().height,
                s = n - o.props.bottomOffset - l,
                d = !!o.state.isSticky,
                u = i
                  ? d
                  : e <= -o.props.topOffset && n > -o.props.bottomOffset;
              n = (o.props.relative ? a.scrollHeight - a.scrollTop : n) - l;
              var f = u
                ? {
                    position: "fixed",
                    top:
                      s > 0
                        ? o.props.relative
                          ? a.offsetTop - a.offsetParent.scrollTop
                          : 0
                        : s,
                    left: c.left,
                    width: c.width,
                  }
                : {};
              o.props.disableHardwareAcceleration ||
                (f.transform = "translateZ(0)"),
                o.setState({
                  isSticky: u,
                  wasSticky: d,
                  distanceFromTop: e,
                  distanceFromBottom: n,
                  calculatedHeight: l,
                  style: f,
                });
            }),
            s(o, n)
          );
        }
        return (
          (function (t, e) {
            if ("function" !== typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof e
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              e &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, e)
                  : (t.__proto__ = e));
          })(e, t),
          o(e, [
            {
              key: "componentWillMount",
              value: function () {
                if (!this.context.subscribe)
                  throw new TypeError(
                    "Expected Sticky to be mounted within StickyContainer"
                  );
                this.context.subscribe(this.handleContainerEvent);
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                this.context.unsubscribe(this.handleContainerEvent);
              },
            },
            {
              key: "componentDidUpdate",
              value: function () {
                this.placeholder.style.paddingBottom = this.props
                  .disableCompensation
                  ? 0
                  : (this.state.isSticky ? this.state.calculatedHeight : 0) +
                    "px";
              },
            },
            {
              key: "render",
              value: function () {
                var t = this,
                  e = a.default.cloneElement(
                    this.props.children({
                      isSticky: this.state.isSticky,
                      wasSticky: this.state.wasSticky,
                      distanceFromTop: this.state.distanceFromTop,
                      distanceFromBottom: this.state.distanceFromBottom,
                      calculatedHeight: this.state.calculatedHeight,
                      style: this.state.style,
                    }),
                    {
                      ref: function (e) {
                        t.content = i.default.findDOMNode(e);
                      },
                    }
                  );
                return a.default.createElement(
                  "div",
                  null,
                  a.default.createElement("div", {
                    ref: function (e) {
                      return (t.placeholder = e);
                    },
                  }),
                  e
                );
              },
            },
          ]),
          e
        );
      })(r.Component);
      (d.propTypes = {
        topOffset: c.default.number,
        bottomOffset: c.default.number,
        relative: c.default.bool,
        children: c.default.func.isRequired,
      }),
        (d.defaultProps = {
          relative: !1,
          topOffset: 0,
          bottomOffset: 0,
          disableCompensation: !1,
          disableHardwareAcceleration: !1,
        }),
        (d.contextTypes = {
          subscribe: c.default.func,
          unsubscribe: c.default.func,
          getParent: c.default.func,
        }),
        (e.default = d);
    },
    boDD: function (t, e, n) {
      "use strict";
      var o = n("uDfI"),
        r = n("9fIP"),
        a = n("pWxA"),
        i = n("8K1b"),
        c = n("K/z8"),
        l = n("sRHE"),
        s = n("zjfJ"),
        d = n("ERkP"),
        u = n.n(d),
        f = n("foZj"),
        m = n.n(f),
        p = n("yFcC"),
        h = n.n(p),
        b = n("iLAp"),
        w = n("/dbq"),
        g = [
          '.markdown{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;font-family:"Lora",serif;font-size:16px;padding:1.5em;}',
          ".markdown [data-datacamp-exercise]{overflow:hidden;}",
          ".markdown>div{width:100%;}",
          ".markdown div{outline:none;}",
          ".markdown hr{border:0;border-bottom:1px solid ".concat(
            b.a.lighterGrey,
            ";margin:3em 0;}"
          ),
          '.markdown div[data-type="mathjax"]{margin:1.5em 0;}',
          '.markdown p{font-family:"Lora",serif;font-size:1em;line-height:1.8em;color:'.concat(
            b.a.darkGrey,
            ";}"
          ),
          ".markdown .powered-by-datacamp+p{margin-top:1.5em !important;}",
          ".markdown p+p,.markdown p+img,.markdown p+div,.markdown p+table,.markdown p+ol,.markdown p+ul,.markdown p+nav,.markdown div+p,.markdown p+iframe,.markdown iframe+p,.markdown pre+img,.markdown pre+p{margin-top:1.5em !important;}",
          '.markdown h2{font-family:"Lato",sans-serif;font-size:1.5em;font-weight:700;color:'.concat(
            b.a.darkGrey,
            ";line-height:1.3em;margin:1.5em 0 0.5em;}"
          ),
          '.markdown h3{font-family:"Lato",sans-serif;font-size:1.1em;font-weight:700;color:'.concat(
            b.a.darkGrey,
            ";line-height:1.2em;margin:1.5em 0 0.5em;}"
          ),
          '.markdown h4{font-family:"Lato",sans-serif;font-size:1em;font-weight:700;color:'.concat(
            b.a.darkGrey,
            ";line-height:1.2em;margin:1.5em 0 0.5em;}"
          ),
          ".markdown .videoWrapper{position:relative;padding-bottom:47.25%;padding-top:25px;height:0;margin-bottom:1.5em;}",
          ".markdown .videoWrapper iframe{position:absolute;top:0;left:0;width:100%;height:100%;}",
          '.markdown p code,.markdown li code{display:inline-block;padding:0 5px;border-radius:4px;font-family:"Roboto Mono",monospace;font-size:0.9em;line-height:1.6em;color:'
            .concat(b.a.darkGrey, ";background-color:")
            .concat(b.a.lighterGrey, ";}"),
          ".markdown a code{color:".concat(w.a.blueDark, ";}"),
          '.markdown pre{padding:1em 1.5em;font-family:"Roboto Mono",monospace;font-size:0.9em;background-color:'.concat(
            b.a.code,
            " !important;border-radius:4px;overflow-x:auto;-webkit-overflow-scrolling:touch;}"
          ),
          ".markdown pre code{padding:0;font-size:0.9em;line-height:2em;background-color:".concat(
            b.a.code,
            ";overflow-x:visible;-webkit-overflow-scrolling:touch;}"
          ),
          ".markdown img{display:block;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;margin:auto;max-width:100%;height:auto !important;}",
          ".markdown img+p{margin-top:1.5em !important;}",
          ".markdown nav+p,.markdown nav+div{margin-top:1.5em !important;}",
          ".markdown iframe{width:100%;}",
          '.markdown ul,.markdown ol{font-family:"Lora",serif;color:'.concat(
            b.a.darkGrey,
            ";padding:0 0 0 1em;}"
          ),
          ".markdown ul+p,.markdown ol+p,.markdown ul+div,.markdown ol+div,.markdown ul+pre,.markdown ol+pre{margin-top:1.5em !important;}",
          ".markdown div.datacamp-exercise ul,.markdown div.datacamp-exercise ol{background-color:initial;margin:initial;padding:initial;width:initial;list-style-position:initial;line-height:initial;}",
          ".markdown ul.oneliner,.markdown ol.oneliner{padding:0;list-style-position:inside;line-height:1.5em;}",
          ".markdown li{line-height:1.8em;}",
          ".markdown li+li{margin-top:1em;}",
          ".markdown div.datacamp-exercise li{padding-left:initial;background-color:initial;font-size:initial;font-weight:initial;line-height:initial;}",
          ".markdown li p{margin:0;font-size:1em;line-height:1.8em;}",
          ".markdown ul.oneliner li,.markdown ol.oneliner li{padding-left:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}",
          ".markdown ul ul{margin:0;list-style:circle;}",
          ".markdown ol ol{margin:0;}",
          ".markdown ol ul,.markdown ul ol{margin:0;}",
          ".markdown a{font-weight:400;-webkit-text-decoration:none;text-decoration:none;color:".concat(
            w.a.blueDark,
            ";}"
          ),
          ".markdown a:hover{-webkit-text-decoration:underline;text-decoration:underline;}",
          ".markdown div.datacamp-exercise a{font-weight:initial;-webkit-text-decoration:initial;text-decoration:initial;}",
          ".markdown div.datacamp-exercise a:hover{-webkit-text-decoration:initial;text-decoration:initial;}",
          ".markdown div.datacamp-exercise li+li{margin-top:unset;}",
          '.markdown blockquote{margin:1.5em 0;font-family:"Lato",sans-serif;color:'.concat(
            b.a.darkGrey,
            ";font-weight:300;font-size:1.5em;font-style:italic;line-height:2em;}"
          ),
          '.markdown blockquote::before{display:block;margin-bottom:15px;width:35px;height:35px;font-family:"Lora",serif;font-size:36px;font-weight:bold;font-style:normal;line-height:60px;text-align:center;color:'
            .concat(b.a.blue, ';content:"\u201c";border:1px solid ')
            .concat(b.a.border, ";border-radius:50%;}"),
          ".markdown table{width:100% !important;border:1px solid ".concat(
            b.a.border,
            ";border-radius:4px;overflow:hidden;border-collapse:separate;border-spacing:0;}"
          ),
          ".markdown table th,.markdown table td{padding:0.75em;}",
          ".markdown table tr th,.markdown table tr td{border:1px solid ".concat(
            b.a.border,
            ";vertical-align:middle;}"
          ),
          '.markdown table thead tr th{font-family:"Lato",sans-serif;background-color:'.concat(
            b.a.blueGrey,
            ";}"
          ),
          ".markdown table tr:nth-child(even){background-color:".concat(
            b.a.blueGrey,
            ";}"
          ),
          ".markdown table+p{margin-top:1.5em !important;}",
          ".markdown table+img{margin-top:1.5em !important;}",
          ".markdown table+div{margin-top:1.5em !important;}",
          ".markdown .dcl-content--tab-body{margin-top:0 !important;}",
          "@media (min-width:800px){.markdown{font-size:20px;padding:0;}.markdown h2,.markdown h3,.markdown h4{margin:1.5em 0 0.5em;}.markdown p{margin:0;}.markdown li p{font-size:inherit;line-height:inherit;}.markdown ul+p,.markdown ol+p,.markdown ul+div,.markdown ol+div,.markdown ul+pre,.markdown ol+pre{margin-top:1.5em !important;}.markdown blockquote{position:relative;margin:50px 55px;}.markdown blockquote::before{position:absolute;left:-55px;}}",
          ".output_wrapper{overflow-x:auto;-webkit-overflow-scrolling:touch;}",
        ];
      g.__hash = "1575957864";
      var y = g,
        x = u.a.createElement,
        k = function (t) {
          var e = t.finalContent;
          return x(
            "div",
            { className: "markdown" },
            x("div", { dangerouslySetInnerHTML: { __html: e } }),
            x("link", {
              href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/solarized-dark.min.css",
              rel: "stylesheet",
            }),
            x("link", {
              href: "https://fonts.googleapis.com/css?family=Lora",
              rel: "stylesheet",
            }),
            x("link", {
              href: "https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,700,700i",
              rel: "stylesheet",
            }),
            x(h.a, { id: y.__hash }, y)
          );
        },
        v = u.a.createElement;
      function j(t, e) {
        var n;
        if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (!t) return;
              if ("string" === typeof t) return _(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return _(t, e);
            })(t)) ||
            (e && t && "number" === typeof t.length)
          ) {
            n && (t = n);
            var o = 0,
              r = function () {};
            return {
              s: r,
              n: function () {
                return o >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[o++] };
              },
              e: function (t) {
                throw t;
              },
              f: r,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var a,
          i = !0,
          c = !1;
        return {
          s: function () {
            n = t[Symbol.iterator]();
          },
          n: function () {
            var t = n.next();
            return (i = t.done), t;
          },
          e: function (t) {
            (c = !0), (a = t);
          },
          f: function () {
            try {
              i || null == n.return || n.return();
            } finally {
              if (c) throw a;
            }
          },
        };
      }
      function _(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n];
        return o;
      }
      function O(t) {
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
          var n,
            o = Object(l.a)(t);
          if (e) {
            var r = Object(l.a)(this).constructor;
            n = Reflect.construct(o, arguments, r);
          } else n = o.apply(this, arguments);
          return Object(c.a)(this, n);
        };
      }
      var S = (function (t) {
        Object(i.a)(o, t);
        var e = O(o);
        function o(t) {
          var i;
          Object(r.a)(this, o),
            (i = e.call(this, t)),
            Object(s.a)(Object(a.a)(i), "shouldComponentUpdate", function () {
              return !1;
            }),
            Object(s.a)(Object(a.a)(i), "buildQuerySelector", function () {
              return [
                "'youtube.com'",
                "'youtu.be'",
                "'facebook.com'",
                "'vimeo.com'",
              ]
                .map(function (t) {
                  return "iframe[src*=".concat(t, "]");
                })
                .join(",");
            }),
            Object(s.a)(Object(a.a)(i), "resizeIframes", function () {
              var t,
                e = document.querySelector(".markdown").offsetWidth || 500,
                n = j(document.querySelectorAll(i.buildQuerySelector()));
              try {
                for (n.s(); !(t = n.n()).done; ) {
                  var o = t.value;
                  (o.width = e), (o.height = 0.56 * e);
                }
              } catch (r) {
                n.e(r);
              } finally {
                n.f();
              }
            }),
            Object(s.a)(Object(a.a)(i), "componentDidMount", function () {
              setTimeout(i.loadScripts, 500),
                i.resizeIframes(),
                window.addEventListener("resize", i.resizeIframes);
            }),
            Object(s.a)(Object(a.a)(i), "componentWillUnmount", function () {
              window.removeEventListener("resize", i.resizeIframes);
            }),
            Object(s.a)(Object(a.a)(i), "ensureBootstrap", function () {
              try {
                window.initAddedDCLightExercises();
              } catch (t) {
                console.log("Couldn't init DCLight exercises.", t);
              }
            }),
            Object(s.a)(Object(a.a)(i), "highlightCode", function () {
              window.jQuery("pre code[class]").each(function (t, e) {
                window.hljs.highlightBlock(e);
              });
            }),
            Object(s.a)(Object(a.a)(i), "loadScripts", function () {
              var t = n("h9IM"),
                e = function () {
                  (window.bootstrapDCLightExercises &&
                    window.initAddedDCLightExercises) ||
                  !i.props.DC_LIGHT_URL
                    ? i.ensureBootstrap()
                    : (t(i.props.DC_LIGHT_URL, "dclight"),
                      t.ready("dclight", i.ensureBootstrap));
                },
                o = function () {
                  window.hljs
                    ? i.highlightCode()
                    : (t.order(
                        [
                          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js",
                          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/r.min.js",
                        ],
                        "hljs"
                      ),
                      t.ready("hljs", i.highlightCode));
                };
              window.jQuery
                ? (e(), o())
                : ((window.$ = window.jQuery = n("GtyH")), e(), o()),
                window.MathJax &&
                window.MathJax.Hub &&
                window.MathJax.Hub.Typeset
                  ? window.MathJax.Hub.Typeset()
                  : (t(
                      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML",
                      "mathjax"
                    ),
                    t.ready("mathjax", function () {
                      window.MathJax.Hub.Config({
                        tex2jax: {
                          inlineMath: [
                            ["$", "$"],
                            ["\\(", "\\)"],
                          ],
                          displayMath: [
                            ["$$", "$$"],
                            ["\\[", "\\]"],
                          ],
                          processEscapes: !0,
                          processEnvironments: !0,
                          ignoreClass: "no-mathjax",
                        },
                        displayAlign: "center",
                        "HTML-CSS": {
                          styles: { ".MathJax_Display": { margin: 0 } },
                          linebreaks: { automatic: !0 },
                        },
                      });
                    }));
            }),
            Object(s.a)(Object(a.a)(i), "removeScripts", function (t) {
              return t.replace(/<script.*?>[\s\S]*?<\/script>/gim, "");
            }),
            Object(s.a)(Object(a.a)(i), "getContent", function (t) {
              var e = /<body.*?>([\s\S]*?)<\/body>/gim.exec(t);
              return m()(e ? e[1] : t, {
                allowedTags: !1,
                allowedAttributes: !1,
                allowedSchemes: ["http", "https", "ftp", "mailto", "data"],
              });
            }),
            Object(s.a)(Object(a.a)(i), "render", function () {
              return v(k, { finalContent: i.finalContent });
            });
          var c = i.removeScripts(i.props.content || "");
          return (i.finalContent = i.getContent(c)), i;
        }
        return o;
      })(d.Component);
      e.a = Object(o.connect)(function (t) {
        return { DC_LIGHT_URL: t.clientConfig.DC_LIGHT_URL };
      })(S);
    },
    gB0z: function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
            return t;
          },
        r = (function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var o = e[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(t, o.key, o);
            }
          }
          return function (e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
          };
        })(),
        a = n("ERkP"),
        i = s(a),
        c = s(n("aWzz")),
        l = s(n("0xii"));
      function s(t) {
        return t && t.__esModule ? t : { default: t };
      }
      function d(t, e) {
        if (!t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !e || ("object" !== typeof e && "function" !== typeof e) ? t : e;
      }
      var u = (function (t) {
        function e() {
          var t, n, o;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, e);
          for (var r = arguments.length, a = Array(r), i = 0; i < r; i++)
            a[i] = arguments[i];
          return (
            (n = o =
              d(
                this,
                (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(
                  t,
                  [this].concat(a)
                )
              )),
            (o.events = [
              "resize",
              "scroll",
              "touchstart",
              "touchmove",
              "touchend",
              "pageshow",
              "load",
            ]),
            (o.subscribers = []),
            (o.rafHandle = null),
            (o.subscribe = function (t) {
              o.subscribers = o.subscribers.concat(t);
            }),
            (o.unsubscribe = function (t) {
              o.subscribers = o.subscribers.filter(function (e) {
                return e !== t;
              });
            }),
            (o.notifySubscribers = function (t) {
              if (!o.framePending) {
                var e = t.currentTarget;
                (o.rafHandle = (0, l.default)(function () {
                  o.framePending = !1;
                  var t = o.node.getBoundingClientRect(),
                    n = t.top,
                    r = t.bottom;
                  o.subscribers.forEach(function (t) {
                    return t({
                      distanceFromTop: n,
                      distanceFromBottom: r,
                      eventSource: e === window ? document.body : o.node,
                    });
                  });
                })),
                  (o.framePending = !0);
              }
            }),
            (o.getParent = function () {
              return o.node;
            }),
            d(o, n)
          );
        }
        return (
          (function (t, e) {
            if ("function" !== typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function, not " +
                  typeof e
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              e &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, e)
                  : (t.__proto__ = e));
          })(e, t),
          r(e, [
            {
              key: "getChildContext",
              value: function () {
                return {
                  subscribe: this.subscribe,
                  unsubscribe: this.unsubscribe,
                  getParent: this.getParent,
                };
              },
            },
            {
              key: "componentDidMount",
              value: function () {
                var t = this;
                this.events.forEach(function (e) {
                  return window.addEventListener(e, t.notifySubscribers);
                });
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                var t = this;
                this.rafHandle &&
                  (l.default.cancel(this.rafHandle), (this.rafHandle = null)),
                  this.events.forEach(function (e) {
                    return window.removeEventListener(e, t.notifySubscribers);
                  });
              },
            },
            {
              key: "render",
              value: function () {
                var t = this;
                return i.default.createElement(
                  "div",
                  o({}, this.props, {
                    ref: function (e) {
                      return (t.node = e);
                    },
                    onScroll: this.notifySubscribers,
                    onTouchStart: this.notifySubscribers,
                    onTouchMove: this.notifySubscribers,
                    onTouchEnd: this.notifySubscribers,
                  })
                );
              },
            },
          ]),
          e
        );
      })(a.PureComponent);
      (u.childContextTypes = {
        subscribe: c.default.func,
        unsubscribe: c.default.func,
        getParent: c.default.func,
      }),
        (e.default = u);
    },
    h9IM: function (t, e, n) {
      var o, r, a;
      (a = function () {
        var t,
          e,
          n = document,
          o = n.getElementsByTagName("head")[0],
          r = !1,
          a = "push",
          i = "readyState",
          c = "onreadystatechange",
          l = {},
          s = {},
          d = {},
          u = {};
        function f(t, e) {
          for (var n = 0, o = t.length; n < o; ++n) if (!e(t[n])) return r;
          return 1;
        }
        function m(t, e) {
          f(t, function (t) {
            return e(t), 1;
          });
        }
        function p(e, n, o) {
          e = e[a] ? e : [e];
          var r = n && n.call,
            i = r ? n : o,
            c = r ? e.join("") : n,
            b = e.length;
          function w(t) {
            return t.call ? t() : l[t];
          }
          function g() {
            if (!--b)
              for (var t in ((l[c] = 1), i && i(), d))
                f(t.split("|"), w) && !m(d[t], w) && (d[t] = []);
          }
          return (
            setTimeout(function () {
              m(e, function e(n, o) {
                return null === n
                  ? g()
                  : (o ||
                      /^https?:\/\//.test(n) ||
                      !t ||
                      (n = -1 === n.indexOf(".js") ? t + n + ".js" : t + n),
                    u[n]
                      ? (c && (s[c] = 1),
                        2 == u[n]
                          ? g()
                          : setTimeout(function () {
                              e(n, !0);
                            }, 0))
                      : ((u[n] = 1), c && (s[c] = 1), void h(n, g)));
              });
            }, 0),
            p
          );
        }
        function h(t, r) {
          var a,
            l = n.createElement("script");
          (l.onload =
            l.onerror =
            l[c] =
              function () {
                (l[i] && !/^c|loade/.test(l[i])) ||
                  a ||
                  ((l.onload = l[c] = null), (a = 1), (u[t] = 2), r());
              }),
            (l.async = 1),
            (l.src = e ? t + (-1 === t.indexOf("?") ? "?" : "&") + e : t),
            o.insertBefore(l, o.lastChild);
        }
        return (
          (p.get = h),
          (p.order = function (t, e, n) {
            !(function o(r) {
              (r = t.shift()), t.length ? p(r, o) : p(r, e, n);
            })();
          }),
          (p.path = function (e) {
            t = e;
          }),
          (p.urlArgs = function (t) {
            e = t;
          }),
          (p.ready = function (t, e, n) {
            t = t[a] ? t : [t];
            var o,
              r = [];
            return (
              !m(t, function (t) {
                l[t] || r[a](t);
              }) &&
              f(t, function (t) {
                return l[t];
              })
                ? e()
                : ((o = t.join("|")),
                  (d[o] = d[o] || []),
                  d[o][a](e),
                  n && n(r)),
              p
            );
          }),
          (p.done = function (t) {
            p([null], t);
          }),
          p
        );
      }),
        t.exports
          ? (t.exports = a())
          : void 0 ===
              (r = "function" === typeof (o = a) ? o.call(e, n, e, t) : o) ||
            (t.exports = r);
    },
    jscJ: function (t, e, n) {
      "use strict";
      n.d(e, "a", function () {
        return S;
      });
      var o = n("yFcC"),
        r = n.n(o),
        a = n("ERkP"),
        i = n.n(a),
        c = n("cxan"),
        l = n("jvFD"),
        s = n.n(l),
        d = n("O94r"),
        u = n.n(d),
        f = n("00EI"),
        m = n("PJI/"),
        p = n("Oybk"),
        h = n("iLAp"),
        b = [
          ".RecommendedCard.jsx-978361741{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;background-color:".concat(
            h.a.white,
            ";border-radius:4px;border:solid 1px #e3e7e8;overflow:hidden;cursor:pointer;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out;}"
          ),
          ".RecommendedCard.jsx-978361741:hover{".concat(h.a.cardShadow, ";}"),
          "h2.jsx-978361741{height:52px;overflow:hidden;font-size:20px;}",
          ".image.jsx-978361741{background-size:cover;background-position:center;height:144px;}",
          ".info.jsx-978361741{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:20px;}",
          ".space.jsx-978361741{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;}",
          ".authorWrapper.jsx-978361741{margin:16px 0;}",
          "@media (min-width:800px){.info.noImage.jsx-978361741{-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;}h2.jsx-978361741{margin-bottom:0px;}.topCard.jsx-978361741 .image.jsx-978361741{height:170px;}}",
        ];
      b.__hash = "978361741";
      var w = b,
        g = i.a.createElement,
        y = {
          OfficialBlogPost: { href: "blogpost", as: "blog" },
          Tutorial: { href: "tutorial", as: "tutorials" },
          Episode: { href: "episode", as: "podcast" },
          default: { href: "", as: "" },
        },
        x = function (t) {
          var e = t.type,
            n = y[e] || y.default;
          return "".concat(f.LOCAL_PART_PREFIX, "/").concat(n.as);
        },
        k = function (t) {
          var e = t.type,
            n = t.author,
            o = t.authorId,
            a = t.title,
            i = t.illustrationSrc,
            l = t.slug,
            d = t.tagLine;
          return g(
            s.a,
            (function (t) {
              var e = t.type,
                n = t.slug,
                o = y[e] || y.default;
              return {
                href: ""
                  .concat(f.LOCAL_PART_PREFIX, "/")
                  .concat(o.href, "?slug=")
                  .concat(n),
                as: ""
                  .concat(f.LOCAL_PART_PREFIX, "/")
                  .concat(o.as, "/")
                  .concat(n),
              };
            })({ type: e, slug: l }),
            g(
              "div",
              { className: "jsx-".concat(w.__hash) + " RecommendedCard" },
              i
                ? g("div", {
                    style: { backgroundImage: "url(".concat(i, ")") },
                    className: "jsx-".concat(w.__hash) + " image",
                  })
                : null,
              g(
                "div",
                {
                  className:
                    "jsx-".concat(w.__hash) +
                    " " +
                    (u()("info", { noImage: !i }) || ""),
                },
                g(
                  "div",
                  { className: "jsx-".concat(w.__hash) + " infoHead" },
                  g(p.a, Object(c.a)({}, d, { url: x({ type: e }) })),
                  g(
                    "h2",
                    {
                      onClick: function (t) {
                        return t.stopPropagation();
                      },
                      className: "jsx-".concat(w.__hash),
                    },
                    g(
                      s.a,
                      {
                        href: ""
                          .concat(f.LOCAL_PART_PREFIX, "/")
                          .concat((y[e] || y.default).href, "?slug=")
                          .concat(l),
                        as: ""
                          .concat(f.LOCAL_PART_PREFIX, "/")
                          .concat((y[e] || y.default).as, "/")
                          .concat(l),
                      },
                      a
                    )
                  )
                ),
                g("div", { className: "jsx-".concat(w.__hash) + " space" }),
                o &&
                  n &&
                  g(
                    "div",
                    { className: "jsx-".concat(w.__hash) + " authorWrapper" },
                    g(m.a, n)
                  )
              ),
              g(r.a, { id: w.__hash }, w)
            )
          );
        },
        v = n("xU+W"),
        j = [
          ".RecommendedArticles.jsx-4199956389{margin:0 10px 30px;}",
          ".articleWrapper.jsx-4199956389{margin-bottom:20px;}",
          ".title.jsx-4199956389{text-transform:uppercase;font-size:13px;font-weight:bold;-webkit-letter-spacing:1px;-moz-letter-spacing:1px;-ms-letter-spacing:1px;letter-spacing:1px;text-align:left;color:".concat(
            h.a.grey,
            ";margin-bottom:10px;}"
          ),
          ".articleWrapper.jsx-4199956389 .description{display:none !important;}",
          "@media (min-width:800px){.articleWrapper.jsx-4199956389 .description{display:inline-block;}.RecommendedArticles.jsx-4199956389{max-width:"
            .concat(
              1120,
              "px;margin:0 auto;padding-bottom:30px;}.articleLayout.jsx-4199956389{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:stretch;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;}.articleWrapper.jsx-4199956389{margin:0;-webkit-flex-basis:"
            )
            .concat(346, "px;-ms-flex-preferred-size:")
            .concat(346, "px;flex-basis:")
            .concat(
              346,
              "px;}.articleWrapper.jsx-4199956389:nth-child(2){margin:0 "
            )
            .concat(
              41,
              "px;}.articleWrapper.jsx-4199956389>div{height:100%;}}"
            ),
        ];
      j.__hash = "4199956389";
      var _ = j,
        O = i.a.createElement,
        S = function (t) {
          var e = t.articles;
          return e && e.length
            ? O(
                "div",
                { className: "jsx-".concat(_.__hash) + " RecommendedArticles" },
                O(
                  "div",
                  { className: "jsx-".concat(_.__hash) + " title" },
                  Object(v.a)("recommendedArticles.title")
                ),
                O(
                  "div",
                  { className: "jsx-".concat(_.__hash) + " articleLayout" },
                  e.map(function (t, e) {
                    return O(
                      "div",
                      {
                        key: "".concat(t.id),
                        style: {},
                        className: "jsx-".concat(_.__hash) + " articleWrapper",
                      },
                      (function (t) {
                        return O(k, {
                          author: {
                            avatarSrc: t.author.avatarUrlSquare,
                            name: t.author.fullName,
                            href: t.authorId,
                            date: t.publishDate,
                          },
                          authorId: t.authorId,
                          slug: t.slug,
                          illustrationSrc: t.illustrationUrl
                            ? ""
                                .concat(f.CLOUDINARY_PREFIX.tutorial)
                                .concat(t.illustrationUrl)
                            : null,
                          title: t.title,
                          tagLine: { mustRead: t.mustRead, tags: t.tags },
                          type: t.type,
                        });
                      })(t)
                    );
                  })
                ),
                O(r.a, { id: _.__hash }, _)
              )
            : null;
        };
    },
  },
]);
