!(function (e) {
  var t = {};
  function n(a) {
    if (t[a]) return t[a].exports;
    var r = (t[a] = { i: a, l: !1, exports: {} });
    return e[a].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, a) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (n.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            a,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return a;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = "/"),
    n((n.s = 0));
})([
  function (e, t, n) {
    n(1), (e.exports = n(5));
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    n(2), n(3);
  },
  function (e, t) {
    var n = algoliasearch(
      "7V5EBRZWFF",
      "8a58d6caba2a81878b26e24c1028624d"
    ).initIndex("prod_JS-HOWTO");
    autocomplete("#autocomplete", { hint: !0, autoselect: !0 }, [
      {
        source: autocomplete.sources.hits(n, { hitsPerPage: 50 }),
        displayKey: "question",
        templates: {
          suggestion: function (e) {
            return e._highlightResult.question.value;
          },
          empty: function (e) {
            return '<div class="aa-suggestion aa-notfound" role="option">\n        <div>No results found.</div>\n        <div>\n            <svg width="11" height="11" fill="var(--gray-800)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm12.5 28H28v11a2 2 0 0 1-4 0V28H13.5a2 2 0 0 1 0-4H24V14a2 2 0 0 1 4 0v10h10.5a2 2 0 0 1 0 4z"/></svg>\n            <em style="white-space: normal;">Click here to contribute</em>\n        </div>\n        </div>';
          },
        },
      },
    ]).on("autocomplete:selected", function (e, t, n) {
      if (t && t.url) window.location.href = "/".concat(t.url);
      else {
        var a = document.querySelector("#contribute").href;
        window.open("".concat(a, " ").concat(e.currentTarget.value));
      }
    }),
      document.querySelector("#autocomplete").focus({ preventScroll: !0 });
  },
  function (e, t, n) {
    (function (t) {
      var n = (function (e) {
        var t = /\blang(?:uage)?-([\w-]+)\b/i,
          n = 0,
          a = {
            manual: e.Prism && e.Prism.manual,
            disableWorkerMessageHandler:
              e.Prism && e.Prism.disableWorkerMessageHandler,
            util: {
              encode: function (e) {
                return e instanceof r
                  ? new r(e.type, a.util.encode(e.content), e.alias)
                  : Array.isArray(e)
                  ? e.map(a.util.encode)
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
                  e.__id || Object.defineProperty(e, "__id", { value: ++n }),
                  e.__id
                );
              },
              clone: function e(t, n) {
                var r,
                  i,
                  s = a.util.type(t);
                switch (((n = n || {}), s)) {
                  case "Object":
                    if (((i = a.util.objId(t)), n[i])) return n[i];
                    for (var o in ((r = {}), (n[i] = r), t))
                      t.hasOwnProperty(o) && (r[o] = e(t[o], n));
                    return r;
                  case "Array":
                    return (
                      (i = a.util.objId(t)),
                      n[i]
                        ? n[i]
                        : ((r = []),
                          (n[i] = r),
                          t.forEach(function (t, a) {
                            r[a] = e(t, n);
                          }),
                          r)
                    );
                  default:
                    return t;
                }
              },
              getLanguage: function (e) {
                for (; e && !t.test(e.className); ) e = e.parentElement;
                return e
                  ? (e.className.match(t) || [, "none"])[1].toLowerCase()
                  : "none";
              },
              currentScript: function () {
                if ("undefined" == typeof document) return null;
                if ("currentScript" in document) return document.currentScript;
                try {
                  throw new Error();
                } catch (a) {
                  var e = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(a.stack) ||
                    [])[1];
                  if (e) {
                    var t = document.getElementsByTagName("script");
                    for (var n in t) if (t[n].src == e) return t[n];
                  }
                  return null;
                }
              },
            },
            languages: {
              extend: function (e, t) {
                var n = a.util.clone(a.languages[e]);
                for (var r in t) n[r] = t[r];
                return n;
              },
              insertBefore: function (e, t, n, r) {
                var i = (r = r || a.languages)[e],
                  s = {};
                for (var o in i)
                  if (i.hasOwnProperty(o)) {
                    if (o == t)
                      for (var l in n) n.hasOwnProperty(l) && (s[l] = n[l]);
                    n.hasOwnProperty(o) || (s[o] = i[o]);
                  }
                var u = r[e];
                return (
                  (r[e] = s),
                  a.languages.DFS(a.languages, function (t, n) {
                    n === u && t != e && (this[t] = s);
                  }),
                  s
                );
              },
              DFS: function e(t, n, r, i) {
                i = i || {};
                var s = a.util.objId;
                for (var o in t)
                  if (t.hasOwnProperty(o)) {
                    n.call(t, o, t[o], r || o);
                    var l = t[o],
                      u = a.util.type(l);
                    "Object" !== u || i[s(l)]
                      ? "Array" !== u ||
                        i[s(l)] ||
                        ((i[s(l)] = !0), e(l, n, o, i))
                      : ((i[s(l)] = !0), e(l, n, null, i));
                  }
              },
            },
            plugins: {},
            highlightAll: function (e, t) {
              a.highlightAllUnder(document, e, t);
            },
            highlightAllUnder: function (e, t, n) {
              var r = {
                callback: n,
                container: e,
                selector:
                  'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
              };
              a.hooks.run("before-highlightall", r),
                (r.elements = Array.prototype.slice.apply(
                  r.container.querySelectorAll(r.selector)
                )),
                a.hooks.run("before-all-elements-highlight", r);
              for (var i, s = 0; (i = r.elements[s++]); )
                a.highlightElement(i, !0 === t, r.callback);
            },
            highlightElement: function (n, r, i) {
              var s = a.util.getLanguage(n),
                o = a.languages[s];
              n.className =
                n.className.replace(t, "").replace(/\s+/g, " ") +
                " language-" +
                s;
              var l = n.parentNode;
              l &&
                "pre" === l.nodeName.toLowerCase() &&
                (l.className =
                  l.className.replace(t, "").replace(/\s+/g, " ") +
                  " language-" +
                  s);
              var u = {
                element: n,
                language: s,
                grammar: o,
                code: n.textContent,
              };
              function c(e) {
                (u.highlightedCode = e),
                  a.hooks.run("before-insert", u),
                  (u.element.innerHTML = u.highlightedCode),
                  a.hooks.run("after-highlight", u),
                  a.hooks.run("complete", u),
                  i && i.call(u.element);
              }
              if ((a.hooks.run("before-sanity-check", u), !u.code))
                return (
                  a.hooks.run("complete", u), void (i && i.call(u.element))
                );
              if ((a.hooks.run("before-highlight", u), u.grammar))
                if (r && e.Worker) {
                  var g = new Worker(a.filename);
                  (g.onmessage = function (e) {
                    c(e.data);
                  }),
                    g.postMessage(
                      JSON.stringify({
                        language: u.language,
                        code: u.code,
                        immediateClose: !0,
                      })
                    );
                } else c(a.highlight(u.code, u.grammar, u.language));
              else c(a.util.encode(u.code));
            },
            highlight: function (e, t, n) {
              var i = { code: e, grammar: t, language: n };
              return (
                a.hooks.run("before-tokenize", i),
                (i.tokens = a.tokenize(i.code, i.grammar)),
                a.hooks.run("after-tokenize", i),
                r.stringify(a.util.encode(i.tokens), i.language)
              );
            },
            matchGrammar: function (e, t, n, i, s, o, l) {
              for (var u in n)
                if (n.hasOwnProperty(u) && n[u]) {
                  var c = n[u];
                  c = Array.isArray(c) ? c : [c];
                  for (var g = 0; g < c.length; ++g) {
                    if (l && l == u + "," + g) return;
                    var p = c[g],
                      d = p.inside,
                      f = !!p.lookbehind,
                      h = !!p.greedy,
                      m = 0,
                      y = p.alias;
                    if (h && !p.pattern.global) {
                      var v = p.pattern.toString().match(/[imsuy]*$/)[0];
                      p.pattern = RegExp(p.pattern.source, v + "g");
                    }
                    p = p.pattern || p;
                    for (
                      var b = i, w = s;
                      b < t.length;
                      w += t[b].length, ++b
                    ) {
                      var F = t[b];
                      if (t.length > e.length) return;
                      if (!(F instanceof r)) {
                        if (h && b != t.length - 1) {
                          if (((p.lastIndex = w), !($ = p.exec(e)))) break;
                          for (
                            var k = $.index + (f && $[1] ? $[1].length : 0),
                              x = $.index + $[0].length,
                              A = b,
                              j = w,
                              S = t.length;
                            A < S &&
                            (j < x || (!t[A].type && !t[A - 1].greedy));
                            ++A
                          )
                            (j += t[A].length) <= k && (++b, (w = j));
                          if (t[b] instanceof r) continue;
                          (_ = A - b), (F = e.slice(w, j)), ($.index -= w);
                        } else {
                          p.lastIndex = 0;
                          var $ = p.exec(F),
                            _ = 1;
                        }
                        if ($) {
                          f && (m = $[1] ? $[1].length : 0),
                            (x =
                              (k = $.index + m) + ($ = $[0].slice(m)).length);
                          var O = F.slice(0, k),
                            P = F.slice(x),
                            z = [b, _];
                          O && (++b, (w += O.length), z.push(O));
                          var B = new r(u, d ? a.tokenize($, d) : $, y, $, h);
                          if (
                            (z.push(B),
                            P && z.push(P),
                            Array.prototype.splice.apply(t, z),
                            1 != _ &&
                              a.matchGrammar(e, t, n, b, w, !0, u + "," + g),
                            o)
                          )
                            break;
                        } else if (o) break;
                      }
                    }
                  }
                }
            },
            tokenize: function (e, t) {
              var n = [e],
                r = t.rest;
              if (r) {
                for (var i in r) t[i] = r[i];
                delete t.rest;
              }
              return a.matchGrammar(e, n, t, 0, 0, !1), n;
            },
            hooks: {
              all: {},
              add: function (e, t) {
                var n = a.hooks.all;
                (n[e] = n[e] || []), n[e].push(t);
              },
              run: function (e, t) {
                var n = a.hooks.all[e];
                if (n && n.length) for (var r, i = 0; (r = n[i++]); ) r(t);
              },
            },
            Token: r,
          };
        function r(e, t, n, a, r) {
          (this.type = e),
            (this.content = t),
            (this.alias = n),
            (this.length = 0 | (a || "").length),
            (this.greedy = !!r);
        }
        if (
          ((e.Prism = a),
          (r.stringify = function (e, t) {
            if ("string" == typeof e) return e;
            if (Array.isArray(e))
              return e
                .map(function (e) {
                  return r.stringify(e, t);
                })
                .join("");
            var n = {
              type: e.type,
              content: r.stringify(e.content, t),
              tag: "span",
              classes: ["token", e.type],
              attributes: {},
              language: t,
            };
            if (e.alias) {
              var i = Array.isArray(e.alias) ? e.alias : [e.alias];
              Array.prototype.push.apply(n.classes, i);
            }
            a.hooks.run("wrap", n);
            var s = Object.keys(n.attributes)
              .map(function (e) {
                return (
                  e +
                  '="' +
                  (n.attributes[e] || "").replace(/"/g, "&quot;") +
                  '"'
                );
              })
              .join(" ");
            return (
              "<" +
              n.tag +
              ' class="' +
              n.classes.join(" ") +
              '"' +
              (s ? " " + s : "") +
              ">" +
              n.content +
              "</" +
              n.tag +
              ">"
            );
          }),
          !e.document)
        )
          return (
            e.addEventListener &&
              (a.disableWorkerMessageHandler ||
                e.addEventListener(
                  "message",
                  function (t) {
                    var n = JSON.parse(t.data),
                      r = n.language,
                      i = n.code,
                      s = n.immediateClose;
                    e.postMessage(a.highlight(i, a.languages[r], r)),
                      s && e.close();
                  },
                  !1
                )),
            a
          );
        var i = a.util.currentScript();
        if (
          (i &&
            ((a.filename = i.src),
            i.hasAttribute("data-manual") && (a.manual = !0)),
          !a.manual)
        ) {
          var s = function () {
              a.manual || a.highlightAll();
            },
            o = document.readyState;
          "loading" === o || ("interactive" === o && i && i.defer)
            ? document.addEventListener("DOMContentLoaded", s)
            : window.requestAnimationFrame
            ? window.requestAnimationFrame(s)
            : window.setTimeout(s, 16);
        }
        return a;
      })(
        "undefined" != typeof window
          ? window
          : "undefined" != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope
          ? self
          : {}
      );
      e.exports && (e.exports = n),
        void 0 !== t && (t.Prism = n),
        (n.languages.markup = {
          comment: /<!--[\s\S]*?-->/,
          prolog: /<\?[\s\S]+?\?>/,
          doctype: {
            pattern:
              /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
            greedy: !0,
          },
          cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
          tag: {
            pattern:
              /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
            greedy: !0,
            inside: {
              tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
              },
              "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                inside: {
                  punctuation: [
                    /^=/,
                    { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
                  ],
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
        (n.languages.markup.tag.inside["attr-value"].inside.entity =
          n.languages.markup.entity),
        n.hooks.add("wrap", function (e) {
          "entity" === e.type &&
            (e.attributes.title = e.content.replace(/&amp;/, "&"));
        }),
        Object.defineProperty(n.languages.markup.tag, "addInlined", {
          value: function (e, t) {
            var a = {};
            (a["language-" + t] = {
              pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
              lookbehind: !0,
              inside: n.languages[t],
            }),
              (a.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var r = {
              "included-cdata": {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: a,
              },
            };
            r["language-" + t] = { pattern: /[\s\S]+/, inside: n.languages[t] };
            var i = {};
            (i[e] = {
              pattern: RegExp(
                "(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)".replace(
                  /__/g,
                  e
                ),
                "i"
              ),
              lookbehind: !0,
              greedy: !0,
              inside: r,
            }),
              n.languages.insertBefore("markup", "cdata", i);
          },
        }),
        (n.languages.xml = n.languages.extend("markup", {})),
        (n.languages.html = n.languages.markup),
        (n.languages.mathml = n.languages.markup),
        (n.languages.svg = n.languages.markup),
        (function (e) {
          var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
          (e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
              pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
              inside: { rule: /@[\w-]+/ },
            },
            url: {
              pattern: RegExp("url\\((?:" + t.source + "|[^\n\r()]*)\\)", "i"),
              inside: { function: /^url/i, punctuation: /^\(|\)$/ },
            },
            selector: RegExp(
              "[^{}\\s](?:[^{};\"']|" + t.source + ")*?(?=\\s*\\{)"
            ),
            string: { pattern: t, greedy: !0 },
            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/,
          }),
            (e.languages.css.atrule.inside.rest = e.languages.css);
          var n = e.languages.markup;
          n &&
            (n.tag.addInlined("style", "css"),
            e.languages.insertBefore(
              "inside",
              "attr-value",
              {
                "style-attr": {
                  pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                  inside: {
                    "attr-name": {
                      pattern: /^\s*style/i,
                      inside: n.tag.inside,
                    },
                    punctuation: /^\s*=\s*['"]|['"]\s*$/,
                    "attr-value": { pattern: /.+/i, inside: e.languages.css },
                  },
                  alias: "language-css",
                },
              },
              n.tag
            ));
        })(n),
        (n.languages.clike = {
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
              /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
          },
          keyword:
            /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
          boolean: /\b(?:true|false)\b/,
          function: /\w+(?=\()/,
          number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
          operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
          punctuation: /[{}[\];(),.:]/,
        }),
        (n.languages.javascript = n.languages.extend("clike", {
          "class-name": [
            n.languages.clike["class-name"],
            {
              pattern:
                /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
              lookbehind: !0,
            },
          ],
          keyword: [
            { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
            {
              pattern:
                /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
              lookbehind: !0,
            },
          ],
          number:
            /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
          function:
            /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
          operator:
            /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/,
        })),
        (n.languages.javascript["class-name"][0].pattern =
          /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
        n.languages.insertBefore("javascript", "keyword", {
          regex: {
            pattern:
              /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
          },
          "function-variable": {
            pattern:
              /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
            alias: "function",
          },
          parameter: [
            {
              pattern:
                /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
              lookbehind: !0,
              inside: n.languages.javascript,
            },
            {
              pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
              inside: n.languages.javascript,
            },
            {
              pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
              lookbehind: !0,
              inside: n.languages.javascript,
            },
            {
              pattern:
                /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
              lookbehind: !0,
              inside: n.languages.javascript,
            },
          ],
          constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
        }),
        n.languages.insertBefore("javascript", "string", {
          "template-string": {
            pattern:
              /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
              "template-punctuation": { pattern: /^`|`$/, alias: "string" },
              interpolation: {
                pattern:
                  /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: !0,
                inside: {
                  "interpolation-punctuation": {
                    pattern: /^\${|}$/,
                    alias: "punctuation",
                  },
                  rest: n.languages.javascript,
                },
              },
              string: /[\s\S]+/,
            },
          },
        }),
        n.languages.markup &&
          n.languages.markup.tag.addInlined("script", "javascript"),
        (n.languages.js = n.languages.javascript),
        (function (e) {
          var t = e.util.clone(e.languages.javascript);
          (e.languages.jsx = e.languages.extend("markup", t)),
            (e.languages.jsx.tag.pattern =
              /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:$-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i),
            (e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
            (e.languages.jsx.tag.inside["attr-value"].pattern =
              /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
            (e.languages.jsx.tag.inside.tag.inside["class-name"] =
              /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
            e.languages.insertBefore(
              "inside",
              "attr-name",
              {
                spread: {
                  pattern:
                    /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/,
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
                  pattern: /=(?:\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
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
          var n = function e(t) {
            return t
              ? "string" == typeof t
                ? t
                : "string" == typeof t.content
                ? t.content
                : t.content.map(e).join("")
              : "";
          };
          e.hooks.add("after-tokenize", function (t) {
            ("jsx" !== t.language && "tsx" !== t.language) ||
              (function t(a) {
                for (var r = [], i = 0; i < a.length; i++) {
                  var s = a[i],
                    o = !1;
                  if (
                    ("string" != typeof s &&
                      ("tag" === s.type &&
                      s.content[0] &&
                      "tag" === s.content[0].type
                        ? "</" === s.content[0].content[0].content
                          ? 0 < r.length &&
                            r[r.length - 1].tagName ===
                              n(s.content[0].content[1]) &&
                            r.pop()
                          : "/>" === s.content[s.content.length - 1].content ||
                            r.push({
                              tagName: n(s.content[0].content[1]),
                              openedBraces: 0,
                            })
                        : 0 < r.length &&
                          "punctuation" === s.type &&
                          "{" === s.content
                        ? r[r.length - 1].openedBraces++
                        : 0 < r.length &&
                          0 < r[r.length - 1].openedBraces &&
                          "punctuation" === s.type &&
                          "}" === s.content
                        ? r[r.length - 1].openedBraces--
                        : (o = !0)),
                    (o || "string" == typeof s) &&
                      0 < r.length &&
                      0 === r[r.length - 1].openedBraces)
                  ) {
                    var l = n(s);
                    i < a.length - 1 &&
                      ("string" == typeof a[i + 1] ||
                        "plain-text" === a[i + 1].type) &&
                      ((l += n(a[i + 1])), a.splice(i + 1, 1)),
                      0 < i &&
                        ("string" == typeof a[i - 1] ||
                          "plain-text" === a[i - 1].type) &&
                        ((l = n(a[i - 1]) + l), a.splice(i - 1, 1), i--),
                      (a[i] = new e.Token("plain-text", l, null, l));
                  }
                  s.content && "string" != typeof s.content && t(s.content);
                }
              })(t.tokens);
          });
        })(n);
    }.call(this, n(4)));
  },
  function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function (e, t) {},
]);
