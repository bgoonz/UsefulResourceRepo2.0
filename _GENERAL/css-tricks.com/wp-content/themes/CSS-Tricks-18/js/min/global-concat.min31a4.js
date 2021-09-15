!(function (e) {
  "use strict";
  (e.fn.fitVids = function (t) {
    var n = { customSelector: null, ignore: null };
    if (!document.getElementById("fit-vids-style")) {
      var a = document.head || document.getElementsByTagName("head")[0],
        i = document.createElement("div");
      (i.innerHTML =
        '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed, .fluid-width-video-wrapper video {position:absolute;top:0;left:0;width:100%;height:100% !important;}</style>'),
        a.appendChild(i.childNodes[1]);
    }
    return (
      t && e.extend(n, t),
      this.each(function () {
        var t = [
          'iframe[src*="player.vimeo.com"]',
          'iframe[src*="youtube.com"]',
          'iframe[src*="youtube-nocookie.com"]',
          'iframe[src*="kickstarter.com"][src*="video.html"]',
          "object",
          "embed",
        ];
        n.customSelector && t.push(n.customSelector);
        var a = ".fitvidsignore";
        n.ignore && (a = a + ", " + n.ignore);
        var i = e(this).find(t.join(","));
        (i = (i = i.not("object object")).not(a)).each(function () {
          var t = e(this);
          if (
            !(
              t.parents(a).length > 0 ||
              ("embed" === this.tagName.toLowerCase() &&
                t.parent("object").length) ||
              t.parent(".fluid-width-video-wrapper").length
            )
          ) {
            t.css("height") ||
              t.css("width") ||
              (!isNaN(t.attr("height")) && !isNaN(t.attr("width"))) ||
              (t.attr("height", 9), t.attr("width", 16));
            var n =
              ("object" === this.tagName.toLowerCase() ||
              (t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)))
                ? parseInt(t.attr("height"), 10)
                : t.height()) /
              (isNaN(parseInt(t.attr("width"), 10))
                ? t.width()
                : parseInt(t.attr("width"), 10));
            if (!t.attr("name")) {
              var i = "fitvid" + e.fn.fitVids._count;
              t.attr("name", i), e.fn.fitVids._count++;
            }
            t
              .wrap('<div class="fluid-width-video-wrapper"></div>')
              .parent(".fluid-width-video-wrapper")
              .css("padding-top", 100 * n + "%"),
              t.removeAttr("height").removeAttr("width");
          }
        });
      })
    );
  }),
    (e.fn.fitVids._count = 0);
})(window.jQuery || window.Zepto),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e(require("jquery")))
      : e(jQuery);
  })(function (e, t) {
    e.fn.resizable ||
      (e.fn.resizable = function (t) {
        var n = {
          handleSelector: null,
          resizeWidth: !0,
          resizeHeight: !0,
          resizeWidthFrom: "right",
          resizeHeightFrom: "bottom",
          onDragStart: null,
          onDragEnd: null,
          onDrag: null,
          touchActionNone: !0,
        };
        return (
          "object" == typeof t && (n = e.extend(n, t)),
          this.each(function () {
            var t,
              a,
              i = e(this),
              s = (function (t, n) {
                return t && ">" === t.trim()[0]
                  ? ((t = t.trim().replace(/^>\s*/, "")), n.find(t))
                  : t
                  ? e(t)
                  : n;
              })(n.handleSelector, i);
            function r(e) {
              e.stopPropagation(), e.preventDefault();
            }
            function o(e) {
              var a,
                s,
                r = c(e);
              (a =
                "left" === n.resizeWidthFrom
                  ? t.width - r.x + t.x
                  : t.width + r.x - t.x),
                (s =
                  "top" === n.resizeHeightFrom
                    ? t.height - r.y + t.y
                    : t.height + r.y - t.y),
                (n.onDrag && !1 === n.onDrag(e, i, a, s, n)) ||
                  (n.resizeHeight && i.height(s), n.resizeWidth && i.width(a));
            }
            function l(t) {
              return (
                t.stopPropagation(),
                t.preventDefault(),
                e(document).unbind("mousemove.rsz", n.dragFunc),
                e(document).unbind("mouseup.rsz", l),
                (window.Touch || navigator.maxTouchPoints) &&
                  (e(document).unbind("touchmove.rsz", n.dragFunc),
                  e(document).unbind("touchend.rsz", l)),
                e(document).unbind("selectstart.rsz", r),
                i.css("transition", a),
                n.onDragEnd && n.onDragEnd(t, i, n),
                !1
              );
            }
            function c(e) {
              var t = { x: 0, y: 0, width: 0, height: 0 };
              if ("number" == typeof e.clientX)
                (t.x = e.clientX), (t.y = e.clientY);
              else {
                if (!e.originalEvent.touches) return null;
                (t.x = e.originalEvent.touches[0].clientX),
                  (t.y = e.originalEvent.touches[0].clientY);
              }
              return t;
            }
            n.touchActionNone && s.css("touch-action", "none"),
              i.addClass("resizable"),
              s.bind("mousedown.rsz touchstart.rsz", function (s) {
                s.preventDefault && s.preventDefault();
                if (
                  (((t = c(s)).width = parseInt(i.width(), 10)),
                  (t.height = parseInt(i.height(), 10)),
                  (a = i.css("transition")),
                  i.css("transition", "none"),
                  n.onDragStart && !1 === n.onDragStart(s, i, n))
                )
                  return;
                (n.dragFunc = o),
                  e(document).bind("mousemove.rsz", n.dragFunc),
                  e(document).bind("mouseup.rsz", l),
                  (window.Touch || navigator.maxTouchPoints) &&
                    (e(document).bind("touchmove.rsz", n.dragFunc),
                    e(document).bind("touchend.rsz", l));
                e(document).bind("selectstart.rsz", r);
              });
          })
        );
      });
  });
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function () {
    var e = /\blang(?:uage)?-([\w-]+)\b/i,
      t = 0,
      n = (_self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler:
          _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function (e) {
            return e instanceof a
              ? new a(e.type, n.util.encode(e.content), e.alias)
              : "Array" === n.util.type(e)
              ? e.map(n.util.encode)
              : e
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id
            );
          },
          clone: function (e, t) {
            var a = n.util.type(e);
            switch (((t = t || {}), a)) {
              case "Object":
                if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                var i = {};
                for (var s in ((t[n.util.objId(e)] = i), e))
                  e.hasOwnProperty(s) && (i[s] = n.util.clone(e[s], t));
                return i;
              case "Array":
                if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                i = [];
                return (
                  (t[n.util.objId(e)] = i),
                  e.forEach(function (e, a) {
                    i[a] = n.util.clone(e, t);
                  }),
                  i
                );
            }
            return e;
          },
        },
        languages: {
          extend: function (e, t) {
            var a = n.util.clone(n.languages[e]);
            for (var i in t) a[i] = t[i];
            return a;
          },
          insertBefore: function (e, t, a, i) {
            var s = (i = i || n.languages)[e],
              r = {};
            for (var o in s)
              if (s.hasOwnProperty(o)) {
                if (o == t)
                  for (var l in a) a.hasOwnProperty(l) && (r[l] = a[l]);
                a.hasOwnProperty(o) || (r[o] = s[o]);
              }
            var c = i[e];
            return (
              (i[e] = r),
              n.languages.DFS(n.languages, function (t, n) {
                n === c && t != e && (this[t] = r);
              }),
              r
            );
          },
          DFS: function (e, t, a, i) {
            for (var s in ((i = i || {}), e))
              e.hasOwnProperty(s) &&
                (t.call(e, s, e[s], a || s),
                "Object" !== n.util.type(e[s]) || i[n.util.objId(e[s])]
                  ? "Array" !== n.util.type(e[s]) ||
                    i[n.util.objId(e[s])] ||
                    ((i[n.util.objId(e[s])] = !0),
                    n.languages.DFS(e[s], t, s, i))
                  : ((i[n.util.objId(e[s])] = !0),
                    n.languages.DFS(e[s], t, null, i)));
          },
        },
        plugins: {},
        highlightAll: function (e, t) {
          n.highlightAllUnder(document, e, t);
        },
        highlightAllUnder: function (e, t, a) {
          var i = {
            callback: a,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          n.hooks.run("before-highlightall", i);
          for (
            var s, r = i.elements || e.querySelectorAll(i.selector), o = 0;
            (s = r[o++]);

          )
            n.highlightElement(s, !0 === t, i.callback);
        },
        highlightElement: function (t, a, i) {
          for (var s, r, o = t; o && !e.test(o.className); ) o = o.parentNode;
          o &&
            ((s = (o.className.match(e) || [, ""])[1].toLowerCase()),
            (r = n.languages[s])),
            (t.className =
              t.className.replace(e, "").replace(/\s+/g, " ") +
              " language-" +
              s),
            t.parentNode &&
              ((o = t.parentNode),
              /pre/i.test(o.nodeName) &&
                (o.className =
                  o.className.replace(e, "").replace(/\s+/g, " ") +
                  " language-" +
                  s));
          var l = { element: t, language: s, grammar: r, code: t.textContent };
          if ((n.hooks.run("before-sanity-check", l), !l.code || !l.grammar))
            return (
              l.code &&
                (n.hooks.run("before-highlight", l),
                (l.element.textContent = l.code),
                n.hooks.run("after-highlight", l)),
              void n.hooks.run("complete", l)
            );
          if ((n.hooks.run("before-highlight", l), a && _self.Worker)) {
            var c = new Worker(n.filename);
            (c.onmessage = function (e) {
              (l.highlightedCode = e.data),
                n.hooks.run("before-insert", l),
                (l.element.innerHTML = l.highlightedCode),
                n.hooks.run("after-highlight", l),
                n.hooks.run("complete", l),
                i && i.call(l.element);
            }),
              c.postMessage(
                JSON.stringify({
                  language: l.language,
                  code: l.code,
                  immediateClose: !0,
                })
              );
          } else
            (l.highlightedCode = n.highlight(l.code, l.grammar, l.language)),
              n.hooks.run("before-insert", l),
              (l.element.innerHTML = l.highlightedCode),
              n.hooks.run("after-highlight", l),
              n.hooks.run("complete", l),
              i && i.call(t);
        },
        highlight: function (e, t, i) {
          var s = { code: e, grammar: t, language: i };
          return (
            n.hooks.run("before-tokenize", s),
            (s.tokens = n.tokenize(s.code, s.grammar)),
            n.hooks.run("after-tokenize", s),
            a.stringify(n.util.encode(s.tokens), s.language)
          );
        },
        matchGrammar: function (e, t, a, i, s, r, o) {
          var l = n.Token;
          for (var c in a)
            if (a.hasOwnProperty(c) && a[c]) {
              if (c == o) return;
              var u = a[c];
              u = "Array" === n.util.type(u) ? u : [u];
              for (var d = 0; d < u.length; ++d) {
                var g = u[d],
                  p = g.inside,
                  m = !!g.lookbehind,
                  f = !!g.greedy,
                  h = 0,
                  b = g.alias;
                if (f && !g.pattern.global) {
                  var v = g.pattern.toString().match(/[imuy]*$/)[0];
                  g.pattern = RegExp(g.pattern.source, v + "g");
                }
                g = g.pattern || g;
                for (var y = i, w = s; y < t.length; w += t[y].length, ++y) {
                  var k = t[y];
                  if (t.length > e.length) return;
                  if (!(k instanceof l)) {
                    if (f && y != t.length - 1) {
                      if (((g.lastIndex = w), !(j = g.exec(e)))) break;
                      for (
                        var P = j.index + (m ? j[1].length : 0),
                          x = j.index + j[0].length,
                          F = y,
                          S = w,
                          $ = t.length;
                        $ > F && (x > S || (!t[F].type && !t[F - 1].greedy));
                        ++F
                      )
                        P >= (S += t[F].length) && (++y, (w = S));
                      if (t[y] instanceof l) continue;
                      (A = F - y), (k = e.slice(w, S)), (j.index -= w);
                    } else {
                      g.lastIndex = 0;
                      var j = g.exec(k),
                        A = 1;
                    }
                    if (j) {
                      m && (h = j[1] ? j[1].length : 0);
                      x = (P = j.index + h) + (j = j[0].slice(h)).length;
                      var _ = k.slice(0, P),
                        C = k.slice(x),
                        z = [y, A];
                      _ && (++y, (w += _.length), z.push(_));
                      var N = new l(c, p ? n.tokenize(j, p) : j, b, j, f);
                      if (
                        (z.push(N),
                        C && z.push(C),
                        Array.prototype.splice.apply(t, z),
                        1 != A && n.matchGrammar(e, t, a, y, w, !0, c),
                        r)
                      )
                        break;
                    } else if (r) break;
                  }
                }
              }
            }
        },
        tokenize: function (e, t) {
          var a = [e],
            i = t.rest;
          if (i) {
            for (var s in i) t[s] = i[s];
            delete t.rest;
          }
          return n.matchGrammar(e, a, t, 0, 0, !1), a;
        },
        hooks: {
          all: {},
          add: function (e, t) {
            var a = n.hooks.all;
            (a[e] = a[e] || []), a[e].push(t);
          },
          run: function (e, t) {
            var a = n.hooks.all[e];
            if (a && a.length) for (var i, s = 0; (i = a[s++]); ) i(t);
          },
        },
      }),
      a = (n.Token = function (e, t, n, a, i) {
        (this.type = e),
          (this.content = t),
          (this.alias = n),
          (this.length = 0 | (a || "").length),
          (this.greedy = !!i);
      });
    if (
      ((a.stringify = function (e, t, i) {
        if ("string" == typeof e) return e;
        if ("Array" === n.util.type(e))
          return e
            .map(function (n) {
              return a.stringify(n, t, e);
            })
            .join("");
        var s = {
          type: e.type,
          content: a.stringify(e.content, t, i),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: t,
          parent: i,
        };
        if (e.alias) {
          var r = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(s.classes, r);
        }
        n.hooks.run("wrap", s);
        var o = Object.keys(s.attributes)
          .map(function (e) {
            return (
              e + '="' + (s.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            );
          })
          .join(" ");
        return (
          "<" +
          s.tag +
          ' class="' +
          s.classes.join(" ") +
          '"' +
          (o ? " " + o : "") +
          ">" +
          s.content +
          "</" +
          s.tag +
          ">"
        );
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (n.disableWorkerMessageHandler ||
            _self.addEventListener(
              "message",
              function (e) {
                var t = JSON.parse(e.data),
                  a = t.language,
                  i = t.code,
                  s = t.immediateClose;
                _self.postMessage(n.highlight(i, n.languages[a], a)),
                  s && _self.close();
              },
              !1
            ),
          _self.Prism)
        : _self.Prism;
    var i =
      document.currentScript ||
      [].slice.call(document.getElementsByTagName("script")).pop();
    return (
      i &&
        ((n.filename = i.src),
        n.manual ||
          i.hasAttribute("data-manual") ||
          ("loading" !== document.readyState
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(n.highlightAll)
              : window.setTimeout(n.highlightAll, 16)
            : document.addEventListener("DOMContentLoaded", n.highlightAll))),
      _self.Prism
    );
  })();
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism),
  (Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern:
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
        },
        "attr-value": {
          pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
          inside: {
            punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }],
          },
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: { namespace: /^[^\s>\/:]+:/ },
        },
      },
    },
    entity: /&#?[\da-z]{1,8};/i,
  }),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add("wrap", function (e) {
    "entity" === e.type &&
      (e.attributes.title = e.content.replace(/&amp;/, "&"));
  }),
  (Prism.languages.xml = Prism.languages.markup),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+?[\s\S]*?(?:;|(?=\s*\{))/i,
      inside: { rule: /@[\w-]+/ },
    },
    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
    string: {
      pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
  (Prism.languages.css.atrule.inside.rest = Prism.languages.css),
  Prism.languages.markup &&
    (Prism.languages.insertBefore("markup", "tag", {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
        greedy: !0,
      },
    }),
    Prism.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": {
              pattern: /^\s*style/i,
              inside: Prism.languages.markup.tag.inside,
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: Prism.languages.css },
          },
          alias: "language-css",
        },
      },
      Prism.languages.markup.tag
    )),
  (Prism.languages.clike = {
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
    },
    "class-name": {
      pattern:
        /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
    },
    keyword:
      /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/,
  }),
  (Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [
      Prism.languages.clike["class-name"],
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0,
      },
    ],
    keyword: [
      { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
      /\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    ],
    number:
      /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    function:
      /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\(|\.(?:apply|bind|call)\()/,
    operator:
      /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
  })),
  (Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
      lookbehind: !0,
      greedy: !0,
    },
    "function-variable": {
      pattern:
        /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)[^\s()][^()]*?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)[^\s()][^()]*?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)[^\s()][^()]*?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z][A-Z\d_]*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\${[^}]+}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.insertBefore("markup", "tag", {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript",
        greedy: !0,
      },
    }),
  (Prism.languages.js = Prism.languages.javascript),
  (Prism.languages.css.selector = {
    pattern: Prism.languages.css.selector,
    inside: {
      "pseudo-element":
        /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
      "pseudo-class": /:[-\w]+(?:\(.*\))?/,
      class: /\.[-:.\w]+/,
      id: /#[-:.\w]+/,
      attribute: /\[[^\]]+\]/,
    },
  }),
  Prism.languages.insertBefore("css", "property", {
    variable: {
      pattern: /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
      lookbehind: !0,
    },
  }),
  Prism.languages.insertBefore("css", "function", {
    operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
    hexcode: /#[\da-f]{3,8}/i,
    entity: /\\[\da-f]{1,8}/i,
    unit: { pattern: /(\d)(?:%|[a-z]+)/, lookbehind: !0 },
    number: /-?[\d.]+/,
  }),
  (Prism.languages["markup-templating"] = {}),
  Object.defineProperties(Prism.languages["markup-templating"], {
    buildPlaceholders: {
      value: function (e, t, n, a) {
        e.language === t &&
          ((e.tokenStack = []),
          (e.code = e.code.replace(n, function (n) {
            if ("function" == typeof a && !a(n)) return n;
            for (
              var i = e.tokenStack.length;
              -1 !== e.code.indexOf("___" + t.toUpperCase() + i + "___");

            )
              ++i;
            return (e.tokenStack[i] = n), "___" + t.toUpperCase() + i + "___";
          })),
          (e.grammar = Prism.languages.markup));
      },
    },
    tokenizePlaceholders: {
      value: function (e, t) {
        if (e.language === t && e.tokenStack) {
          e.grammar = Prism.languages[t];
          var n = 0,
            a = Object.keys(e.tokenStack),
            i = function (s) {
              if (!(n >= a.length))
                for (var r = 0; r < s.length; r++) {
                  var o = s[r];
                  if (
                    "string" == typeof o ||
                    (o.content && "string" == typeof o.content)
                  ) {
                    var l = a[n],
                      c = e.tokenStack[l],
                      u = "string" == typeof o ? o : o.content,
                      d = u.indexOf("___" + t.toUpperCase() + l + "___");
                    if (d > -1) {
                      ++n;
                      var g,
                        p = u.substring(0, d),
                        m = new Prism.Token(
                          t,
                          Prism.tokenize(c, e.grammar, t),
                          "language-" + t,
                          c
                        ),
                        f = u.substring(
                          d + ("___" + t.toUpperCase() + l + "___").length
                        );
                      if (
                        (p || f
                          ? ((g = [p, m, f].filter(function (e) {
                              return !!e;
                            })),
                            i(g))
                          : (g = m),
                        "string" == typeof o
                          ? Array.prototype.splice.apply(s, [r, 1].concat(g))
                          : (o.content = g),
                        n >= a.length)
                      )
                        break;
                    }
                  } else
                    o.content && "string" != typeof o.content && i(o.content);
                }
            };
          i(e.tokens);
        }
      },
    },
  }),
  (Prism.languages.json = {
    comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
    number: /-?\d+\.?\d*(e[+-]?\d+)?/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: /\bnull\b/,
  }),
  (Prism.languages.jsonp = Prism.languages.json),
  (function (e) {
    (e.languages.php = e.languages.extend("clike", {
      keyword:
        /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
      boolean: { pattern: /\b(?:false|true)\b/i, alias: "constant" },
      constant: [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
      },
    })),
      e.languages.insertBefore("php", "string", {
        "shell-comment": {
          pattern: /(^|[^\\])#.*/,
          lookbehind: !0,
          alias: "comment",
        },
      }),
      e.languages.insertBefore("php", "keyword", {
        delimiter: { pattern: /\?>|<\?(?:php|=)?/i, alias: "important" },
        variable: /\$+(?:\w+\b|(?={))/i,
        package: {
          pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
          lookbehind: !0,
          inside: { punctuation: /\\/ },
        },
      }),
      e.languages.insertBefore("php", "operator", {
        property: { pattern: /(->)[\w]+/, lookbehind: !0 },
      });
    var t = {
      pattern:
        /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
      lookbehind: !0,
      inside: { rest: e.languages.php },
    };
    e.languages.insertBefore("php", "string", {
      "nowdoc-string": {
        pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
        greedy: !0,
        alias: "string",
        inside: {
          delimiter: {
            pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: { punctuation: /^<<<'?|[';]$/ },
          },
        },
      },
      "heredoc-string": {
        pattern:
          /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
        greedy: !0,
        alias: "string",
        inside: {
          delimiter: {
            pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: { punctuation: /^<<<"?|[";]$/ },
          },
          interpolation: t,
        },
      },
      "single-quoted-string": {
        pattern: /'(?:\\[\s\S]|[^\\'])*'/,
        greedy: !0,
        alias: "string",
      },
      "double-quoted-string": {
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        greedy: !0,
        alias: "string",
        inside: { interpolation: t },
      },
    }),
      delete e.languages.php.string,
      e.hooks.add("before-tokenize", function (t) {
        if (/(?:<\?php|<\?)/gi.test(t.code)) {
          e.languages["markup-templating"].buildPlaceholders(
            t,
            "php",
            /(?:<\?php|<\?)[\s\S]*?(?:\?>|$)/gi
          );
        }
      }),
      e.hooks.add("after-tokenize", function (t) {
        e.languages["markup-templating"].tokenizePlaceholders(t, "php");
      });
  })(Prism),
  (Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: !0,
    },
    atrule: {
      pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
      inside: { rule: /@[\w-]+/ },
    },
    url: /(?:[-a-z]+-)*url(?=\()/i,
    selector: {
      pattern:
        /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
      inside: {
        parent: { pattern: /&/, alias: "important" },
        placeholder: /%[-\w]+/,
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
      },
    },
    property: {
      pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
      inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
    },
  })),
  Prism.languages.insertBefore("scss", "atrule", {
    keyword: [
      /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
      { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
    ],
  }),
  Prism.languages.insertBefore("scss", "important", {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/,
  }),
  Prism.languages.insertBefore("scss", "function", {
    placeholder: { pattern: /%[-\w]+/, alias: "selector" },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
    boolean: /\b(?:true|false)\b/,
    null: /\bnull\b/,
    operator: {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
      lookbehind: !0,
    },
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss),
  (function (e) {
    var t = e.util.clone(e.languages.javascript);
    (e.languages.jsx = e.languages.extend("markup", t)),
      (e.languages.jsx.tag.pattern =
        /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
      (e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
      (e.languages.jsx.tag.inside["attr-value"].pattern =
        /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
      (e.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*$/),
      e.languages.insertBefore(
        "inside",
        "attr-name",
        {
          spread: {
            pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
            inside: { punctuation: /\.{3}|[{}.]/, "attr-value": /\w+/ },
          },
        },
        e.languages.jsx.tag
      ),
      e.languages.insertBefore(
        "inside",
        "attr-value",
        {
          script: {
            pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
            inside: {
              "script-punctuation": {
                pattern: /^=(?={)/,
                alias: "punctuation",
              },
              rest: e.languages.jsx,
            },
            alias: "language-javascript",
          },
        },
        e.languages.jsx.tag
      );
    var n = function (e) {
        return e
          ? "string" == typeof e
            ? e
            : "string" == typeof e.content
            ? e.content
            : e.content.map(n).join("")
          : "";
      },
      a = function (t) {
        for (var i = [], s = 0; s < t.length; s++) {
          var r = t[s],
            o = !1;
          if (
            ("string" != typeof r &&
              ("tag" === r.type && r.content[0] && "tag" === r.content[0].type
                ? "</" === r.content[0].content[0].content
                  ? i.length > 0 &&
                    i[i.length - 1].tagName === n(r.content[0].content[1]) &&
                    i.pop()
                  : "/>" === r.content[r.content.length - 1].content ||
                    i.push({
                      tagName: n(r.content[0].content[1]),
                      openedBraces: 0,
                    })
                : i.length > 0 && "punctuation" === r.type && "{" === r.content
                ? i[i.length - 1].openedBraces++
                : i.length > 0 &&
                  i[i.length - 1].openedBraces > 0 &&
                  "punctuation" === r.type &&
                  "}" === r.content
                ? i[i.length - 1].openedBraces--
                : (o = !0)),
            (o || "string" == typeof r) &&
              i.length > 0 &&
              0 === i[i.length - 1].openedBraces)
          ) {
            var l = n(r);
            s < t.length - 1 &&
              ("string" == typeof t[s + 1] || "plain-text" === t[s + 1].type) &&
              ((l += n(t[s + 1])), t.splice(s + 1, 1)),
              s > 0 &&
                ("string" == typeof t[s - 1] ||
                  "plain-text" === t[s - 1].type) &&
                ((l = n(t[s - 1]) + l), t.splice(s - 1, 1), s--),
              (t[s] = new e.Token("plain-text", l, null, l));
          }
          r.content && "string" != typeof r.content && a(r.content);
        }
      };
    e.hooks.add("after-tokenize", function (e) {
      ("jsx" === e.language || "tsx" === e.language) && a(e.tokens);
    });
  })(Prism),
  (function () {
    function e(e, t) {
      return Array.prototype.slice.call((t || document).querySelectorAll(e));
    }
    function t(e, t) {
      return (
        (t = " " + t + " "),
        (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
      );
    }
    function n(e, n, a) {
      for (
        var s,
          r = (n = "string" == typeof n ? n : e.getAttribute("data-line"))
            .replace(/\s+/g, "")
            .split(","),
          o = +e.getAttribute("data-line-offset") || 0,
          l = (i() ? parseInt : parseFloat)(getComputedStyle(e).lineHeight),
          c = t(e, "line-numbers"),
          u = 0;
        (s = r[u++]);

      ) {
        var d = s.split("-"),
          g = +d[0],
          p = +d[1] || g,
          m =
            e.querySelector('.line-highlight[data-range="' + s + '"]') ||
            document.createElement("div");
        if (
          (m.setAttribute("aria-hidden", "true"),
          m.setAttribute("data-range", s),
          (m.className = (a || "") + " line-highlight"),
          c && Prism.plugins.lineNumbers)
        ) {
          var f = Prism.plugins.lineNumbers.getLine(e, g),
            h = Prism.plugins.lineNumbers.getLine(e, p);
          f && (m.style.top = f.offsetTop + "px"),
            h &&
              (m.style.height =
                h.offsetTop - f.offsetTop + h.offsetHeight + "px");
        } else
          m.setAttribute("data-start", g),
            p > g && m.setAttribute("data-end", p),
            (m.style.top = (g - o - 1) * l + "px"),
            (m.textContent = new Array(p - g + 2).join(" \n"));
        c ? e.appendChild(m) : (e.querySelector("code") || e).appendChild(m);
      }
    }
    function a() {
      var t = location.hash.slice(1);
      e(".temporary.line-highlight").forEach(function (e) {
        e.parentNode.removeChild(e);
      });
      var a = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
      if (a && !document.getElementById(t)) {
        var i = t.slice(0, t.lastIndexOf(".")),
          s = document.getElementById(i);
        s &&
          (s.hasAttribute("data-line") || s.setAttribute("data-line", ""),
          n(s, a, "temporary "),
          document.querySelector(".temporary.line-highlight").scrollIntoView());
      }
    }
    if (
      "undefined" != typeof self &&
      self.Prism &&
      self.document &&
      document.querySelector
    ) {
      var i = (function () {
          var e;
          return function () {
            if (void 0 === e) {
              var t = document.createElement("div");
              (t.style.fontSize = "13px"),
                (t.style.lineHeight = "1.5"),
                (t.style.padding = 0),
                (t.style.border = 0),
                (t.innerHTML = "&nbsp;<br />&nbsp;"),
                document.body.appendChild(t),
                (e = 38 === t.offsetHeight),
                document.body.removeChild(t);
            }
            return e;
          };
        })(),
        s = 0;
      Prism.hooks.add("before-sanity-check", function (t) {
        var n = t.element.parentNode,
          a = n && n.getAttribute("data-line");
        if (n && a && /pre/i.test(n.nodeName)) {
          var i = 0;
          e(".line-highlight", n).forEach(function (e) {
            (i += e.textContent.length), e.parentNode.removeChild(e);
          }),
            i &&
              /^( \n)+$/.test(t.code.slice(-i)) &&
              (t.code = t.code.slice(0, -i));
        }
      }),
        Prism.hooks.add("complete", function e(i) {
          var r = i.element.parentNode,
            o = r && r.getAttribute("data-line");
          if (r && o && /pre/i.test(r.nodeName)) {
            clearTimeout(s);
            var l = Prism.plugins.lineNumbers,
              c = i.plugins && i.plugins.lineNumbers;
            t(r, "line-numbers") && l && !c
              ? Prism.hooks.add("line-numbers", e)
              : (n(r, o), (s = setTimeout(a, 1)));
          }
        });
    }
  })(),
  $(
    "pre.lang-html, pre[rel='HTML'], pre.language-markup:not([rel]), pre.language-html"
  )
    .removeClass("language-markup")
    .attr("rel", "HTML")
    .addClass("language-html")
    .find("code")
    .addClass("language-html"),
  $(".pre"),
  $("code.html, code.lang-html")
    .removeClass()
    .addClass("language-html")
    .parent()
    .addClass("language-html")
    .attr("rel", "HTML"),
  $("pre.lang-js, pre.JavaScript, pre.language-js")
    .attr("rel", "JavaScript")
    .addClass("language-javascript")
    .find("code")
    .removeClass()
    .addClass("language-javascript"),
  $("pre[rel=jQuery], pre[rel=JavaScript], pre.language-javascript")
    .addClass("language-javascript")
    .find("code")
    .removeClass()
    .addClass("language-javascript"),
  $("code.javascript").removeClass().addClass("language-javascript"),
  $("pre[rel='CSS'], pre.language-css", "pre.lang-css")
    .attr("rel", "CSS")
    .addClass("language-css")
    .find("code")
    .removeClass()
    .addClass("language-css"),
  $("code.css, code.lang-css")
    .removeClass()
    .addClass("language-css")
    .parent()
    .attr("rel", "CSS"),
  $(
    "pre[rel='Sass'], pre[rel='SASS'], pre[rel='SCSS'], pre.language-scss, pre.language-sass"
  )
    .removeClass()
    .addClass("language-scss"),
  $("pre[rel='PHP'], pre.language-php")
    .addClass("language-javascript")
    .find("code")
    .removeClass()
    .addClass("language-javascript"),
  $("code.php")
    .removeClass()
    .addClass("language-javascript")
    .parent()
    .attr("rel", "PHP");
var csstricks = {
  el: {
    videoWrappers: $("main, article, .single-video-wrapper, .article-content"),
  },
  searchOpen: !1,
  init: function () {
    screen.width > 800 &&
      !1 === window.activeMember &&
      (csstricks.getAds(), csstricks.getScrollAds()),
      csstricks.makeVideosFluidWidth(),
      csstricks.mobilizeBrowserSupportTables(),
      csstricks.sortingControls(),
      csstricks.navigationSelect(),
      csstricks.backToTopLogic(),
      setTimeout(function () {
        window.already_embedded_pens || csstricks.makeCodePenEmbedsResizeable();
      }, 1999),
      $("#comment").attr(
        "placeholder",
        "New Comment! Use `backticks` for code."
      );
  },
  makeVideosFluidWidth: function () {
    csstricks.el.videoWrappers.fitVids({
      customSelector:
        'video, iframe[src^="https://noti.st/"], iframe[src^="https://player.cloudinary.com/"]',
    });
  },
  makeCodePenEmbedsResizeable: function () {
    var e = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (screen.width > 625 && !e) {
      var t = 1e3,
        n = $(".page-wrap");
      $(".cp_embed_wrapper").each(function () {
        var e = $(this),
          a = e.find("iframe");
        e.append("<div class='win-size-grip'></div>");
        var i = a.outerHeight();
        e.css("height", i),
          a.css("height", "100%"),
          e.resizable({
            handleSelector: "> .win-size-grip",
            onDragStart: function (e, a, i) {
              a.addClass("dragging"), (t = n.width());
            },
            onDragEnd: function (e, t, n) {
              t.removeClass("dragging");
            },
            onDrag: function (e, n, a, i, s) {
              return (
                a > t && (a = t),
                a < 320 && (a = 320),
                i < 150 && (i = 150),
                n.width(a),
                n.height(i),
                !1
              );
            },
          });
      });
    }
  },
  mobilizeBrowserSupportTables: function () {
    $(".browser-support-table").each(function (e, t) {
      var n = [];
      $(t)
        .find("th")
        .each(function (e, t) {
          n.push($(t).text());
        })
        .end()
        .find("td")
        .each(function (e, t) {
          $(t).attr("data-browser-name", n[e]);
        });
    });
  },
  getAds: function () {
    var e, t;
    $("#all-modules").length
      ? $.when(
          $.ajax({
            url: "/wp-content/themes/CSS-Tricks-18/parts/modules.php?cache_bust=1607027860665",
            cache: !0,
          }).done(function (t) {
            e = $(t);
          }),
          $.ajax({
            url: "https://srv.buysellads.com/ads/CK7I6237.json",
            dataType: "jsonp",
          }).done(function (e) {
            var n = e.ads,
              a = "";
            n.map(function (e) {
              var t = [],
                n = "";
              e.pixel &&
                (e.pixel.includes("||")
                  ? (t = e.pixel.split("||"))
                  : (t[0] = e.pixel)),
                t.length &&
                  t.forEach(function (e) {
                    n += '<img src="'.concat(e, '" alt="">');
                  }),
                e.statlink &&
                  e.image &&
                  e.description &&
                  "1" == e.active &&
                  (a +=
                    '\n                <div class="single-module single-module-'
                      .concat(
                        e.company,
                        '">\n                  <div class="module">\n                    <a href="'
                      )
                      .concat(
                        e.statlink,
                        '">\n                      <img src="'
                      )
                      .concat(e.image, '" alt="Ad for ')
                      .concat(
                        e.company,
                        '">\n                    </a>\n                  </div>\n                  <div class="interlude">\n                    <a class="spon-title" href="https://www.notion.so/csstricks/Sponsorship-Possibilities-cb5b33a3f6f64c239220547fe7965d78">Sponsored</a>\n                    <a href="'
                      )
                      .concat(e.statlink, '">')
                      .concat(
                        e.description,
                        "</a>\n                  </div>\n                  "
                      )
                      .concat(n, "\n                </div>\n              "));
            }),
              (t = a);
          })
        ).then(function () {
          e.append($(t)),
            e.find(".single-module").length < 5
              ? $.ajax({
                  url: "https://srv.buysellads.com/ads/CE7DEKQ7.json",
                  dataType: "jsonp",
                }).done(function (t) {
                  var n = "",
                    a = t.ads[0],
                    i = [],
                    s = "";
                  a.pixel &&
                    (a.pixel.includes("||")
                      ? (i = a.pixel.split("||"))
                      : (i[0] = a.pixel)),
                    i.length &&
                      i.forEach(function (e) {
                        s += '<img src="'.concat(e, '" alt="">');
                      }),
                    a.statlink &&
                      a.logo &&
                      a.description &&
                      "1" == a.active &&
                      (n +=
                        '\n                <div class="single-module single-module-backfill">\n                  <div class="module" style="background-color: '
                          .concat(
                            a.backgroundColor,
                            ';">\n                    <a href="'
                          )
                          .concat(
                            a.statlink,
                            '">\n                      <img src="https://res.cloudinary.com/css-tricks/image/fetch/w_250,q_auto,f_auto/'
                          )
                          .concat(a.logo, '" alt="Ad for ')
                          .concat(
                            a.company,
                            '">\n                    </a>\n                  </div>\n                  <div class="interlude">\n                    <a href="'
                          )
                          .concat(a.statlink, '">')
                          .concat(
                            a.description,
                            "</a>\n                  </div>\n                  "
                          )
                          .concat(
                            s,
                            "\n                </div>\n              "
                          )),
                    e.append($(n)),
                    csstricks.shuffleAndInsertAds(e);
                })
              : csstricks.shuffleAndInsertAds(e);
        })
      : csstricks.kickOffBSA();
  },
  shuffleAndInsertAds: function (e) {
    var t = $("#all-modules"),
      n = e.find(".single-module"),
      a = $.map(n, function () {
        var e,
          t = ((e = n.length), Math.floor(Math.random() * e)),
          a = $(n[t])
            .clone(!0)
            .addClass("module-" + n.length)[0];
        return n.splice(t, 1), a;
      });
    t.prepend(a), csstricks.kickOffBSA();
  },
  kickOffBSA: function () {
    var e = document.createElement("script");
    (e.async = !0),
      (e.src = "//s3.buysellads.com/ac/bsa.js"),
      (
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0]
      ).appendChild(e);
  },
  kickOffCarbon: function () {
    var e = document.createElement("script");
    (e.src =
      "//cdn.carbonads.com/carbon.js?serve=CK7DK2QU&placement=csstrickscom"),
      (e.id = "_carbonads_js"),
      document.body.appendChild(e),
      (csstricks.carbonLoaded = !0),
      setTimeout(function () {
        $("#carbonads").appendTo("#sticky-sidebar-stuff");
      }, 1500),
      setTimeout(function () {
        $("#carbonads").addClass("showing");
      }, 1600);
  },
  getScrollAds: function () {
    $("#scroll-ad-position").length &&
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype &&
      new IntersectionObserver(function (e) {
        e[0].boundingClientRect.y < e[0].rootBounds.y
          ? csstricks.carbonLoaded
            ? $("#sticky-sidebar-stuff").addClass("showing")
            : (csstricks.kickOffCarbon(),
              $("#sticky-sidebar-stuff").addClass("showing"))
          : $("#sticky-sidebar-stuff").removeClass("showing");
      }).observe($("#scroll-ad-position")[0]);
  },
  sortingControls: function () {
    var e = $("#sorting-controls");
    e.find("select").on("change", function () {
      e.submit();
    }),
      $("#sorting-button").on("click", function () {
        e.toggleClass("open");
      });
  },
  navigationSelect: function () {
    var e = $("#select-navigator");
    e.find("select").on("change", function () {
      window.location = e.find(":selected").val();
    });
  },
  backToTopLogic: function () {
    var e = !0,
      t = document.querySelector(".top-of-site-link"),
      n = document.querySelector(".icon-logo-star");
    new IntersectionObserver(function (a) {
      a[0].boundingClientRect.y < 0
        ? ((t.dataset.visible = !0), (n.dataset.spinMe = !1))
        : ((t.dataset.visible = !1), e || (n.dataset.spinMe = !0), (e = !1));
    }).observe(document.querySelector("#top-of-site-pixel-anchor"));
  },
};
function __CodePenIFrameAddedToPage() {
  csstricks.makeCodePenEmbedsResizeable(), (window.already_embedded_pens = !0);
}
function BSACallback() {
  $(".single-module").each(function (e, t) {
    -1 != t.innerHTML.indexOf("\x3c!-- no ad --\x3e") && $(t).remove();
  });
}
csstricks.init();
