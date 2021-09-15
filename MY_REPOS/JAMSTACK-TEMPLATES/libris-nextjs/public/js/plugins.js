/*
  reframe.js - Reframe.js: responsive iframes for embedded content
  @version v3.0.2
  @link https://github.com/yowainwright/reframe.ts#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (http://jeffry.in)
  @license MIT
 */
!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define(t)
        : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).noframe = t());
})(this, function () {
    'use strict';
    function t() {
        for (var e = 0, t = 0, o = arguments.length; t < o; t++) e += arguments[t].length;
        for (var n = Array(e), i = 0, t = 0; t < o; t++) for (var f = arguments[t], r = 0, d = f.length; r < d; r++, i++) n[i] = f[r];
        return n;
    }
    return function (e, a) {
        return ('string' == typeof e ? t(document.querySelectorAll(e)) : 'length' in e ? t(e) : [e]).forEach(function (e) {
            var t,
                o,
                n,
                i = void 0 !== a && document.querySelector(a),
                f = i ? document.querySelector(a) : e.parentElement,
                r = e.offsetHeight,
                d = e.offsetWidth,
                l = e.style;
            i
                ? ((t = window.getComputedStyle(f, null).getPropertyValue('max-width')),
                  (l.width = '100%'),
                  (l.maxHeight = 'calc(' + t + ' * ' + r + ' / ' + d + ')'))
                : ((l.display = 'block'),
                  (l.marginLeft = 'auto'),
                  (l.marginRight = 'auto'),
                  (o = d > f.offsetWidth ? f.offsetWidth : d),
                  (n = d > f.offsetWidth ? (o * r) / d : d * (r / d)),
                  (l.maxHeight = n + 'px'),
                  (l.width = o + 'px'));
            var u = (100 * r) / d;
            (l.height = u + 'vw'), (l.maxWidth = '100%');
        });
    };
});

/*! gumshoejs v5.1.2 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/gumshoe */
!(function (e, t) {
    'function' == typeof define && define.amd
        ? define([], function () {
              return t(e);
          })
        : 'object' == typeof exports
        ? (module.exports = t(e))
        : (e.Gumshoe = t(e));
})('undefined' != typeof global ? global : 'undefined' != typeof window ? window : this, function (e) {
    'use strict';
    var t = { navClass: 'active', contentClass: 'active', nested: !1, nestedClass: 'active', offset: 0, reflow: !1, events: !0 },
        n = function (e, t, n) {
            if (n.settings.events) {
                var o = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
                t.dispatchEvent(o);
            }
        },
        o = function (e) {
            var t = 0;
            if (e.offsetParent) for (; e; ) (t += e.offsetTop), (e = e.offsetParent);
            return t >= 0 ? t : 0;
        },
        s = function (e) {
            e &&
                e.sort(function (e, t) {
                    return o(e.content) < o(t.content) ? -1 : 1;
                });
        },
        c = function (t, n, o) {
            var s = t.getBoundingClientRect(),
                c = (function (e) {
                    return 'function' == typeof e.offset ? parseFloat(e.offset()) : parseFloat(e.offset);
                })(n);
            return o ? parseInt(s.bottom, 10) < (e.innerHeight || document.documentElement.clientHeight) : parseInt(s.top, 10) <= c;
        },
        i = function () {
            return (
                e.innerHeight + e.pageYOffset >=
                Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                )
            );
        },
        r = function (e, t) {
            var n = e[e.length - 1];
            if (
                (function (e, t) {
                    return !(!i() || !c(e.content, t, !0));
                })(n, t)
            )
                return n;
            for (var o = e.length - 1; o >= 0; o--) if (c(e[o].content, t)) return e[o];
        },
        a = function (e, t) {
            if (t.nested && e.parentNode) {
                var n = e.parentNode.closest('li');
                n && (n.classList.remove(t.nestedClass), a(n, t));
            }
        },
        l = function (e, t) {
            if (e) {
                var o = e.nav.closest('li');
                o &&
                    (o.classList.remove(t.navClass),
                    e.content.classList.remove(t.contentClass),
                    a(o, t),
                    n('gumshoeDeactivate', o, { link: e.nav, content: e.content, settings: t }));
            }
        },
        u = function (e, t) {
            if (t.nested) {
                var n = e.parentNode.closest('li');
                n && (n.classList.add(t.nestedClass), u(n, t));
            }
        };
    return function (o, c) {
        var i,
            a,
            f,
            d,
            v,
            m = {};
        (m.setup = function () {
            (i = document.querySelectorAll(o)),
                (a = []),
                Array.prototype.forEach.call(i, function (e) {
                    var t = document.getElementById(decodeURIComponent(e.hash.substr(1)));
                    t && a.push({ nav: e, content: t });
                }),
                s(a);
        }),
            (m.detect = function () {
                var e = r(a, v);
                e
                    ? (f && e.content === f.content) ||
                      (l(f, v),
                      (function (e, t) {
                          if (e) {
                              var o = e.nav.closest('li');
                              o &&
                                  (o.classList.add(t.navClass),
                                  e.content.classList.add(t.contentClass),
                                  u(o, t),
                                  n('gumshoeActivate', o, { link: e.nav, content: e.content, settings: t }));
                          }
                      })(e, v),
                      (f = e))
                    : f && (l(f, v), (f = null));
            });
        var p = function (t) {
                d && e.cancelAnimationFrame(d), (d = e.requestAnimationFrame(m.detect));
            },
            h = function (t) {
                d && e.cancelAnimationFrame(d),
                    (d = e.requestAnimationFrame(function () {
                        s(a), m.detect();
                    }));
            };
        m.destroy = function () {
            f && l(f, v),
                e.removeEventListener('scroll', p, !1),
                v.reflow && e.removeEventListener('resize', h, !1),
                (a = null),
                (i = null),
                (f = null),
                (d = null),
                (v = null);
        };
        return (
            (v = (function () {
                var e = {};
                return (
                    Array.prototype.forEach.call(arguments, function (t) {
                        for (var n in t) {
                            if (!t.hasOwnProperty(n)) return;
                            e[n] = t[n];
                        }
                    }),
                    e
                );
            })(t, c || {})),
            m.setup(),
            m.detect(),
            e.addEventListener('scroll', p, !1),
            v.reflow && e.addEventListener('resize', h, !1),
            m
        );
    };
});

/*!
 * clipboard.js v2.0.8
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
!(function (t, e) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define([], e)
        : 'object' == typeof exports
        ? (exports.ClipboardJS = e())
        : (t.ClipboardJS = e());
})(this, function () {
    return (
        (n = {
            134: function (t, e, n) {
                'use strict';
                n.d(e, {
                    default: function () {
                        return r;
                    }
                });
                var e = n(279),
                    i = n.n(e),
                    e = n(370),
                    a = n.n(e),
                    e = n(817),
                    o = n.n(e);
                function c(t) {
                    return (c =
                        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
                              })(t);
                }
                function u(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                    }
                }
                var l = (function () {
                    function e(t) {
                        !(function (t) {
                            if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                        })(this),
                            this.resolveOptions(t),
                            this.initSelection();
                    }
                    var t, n, r;
                    return (
                        (t = e),
                        (n = [
                            {
                                key: 'resolveOptions',
                                value: function () {
                                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                                    (this.action = t.action),
                                        (this.container = t.container),
                                        (this.emitter = t.emitter),
                                        (this.target = t.target),
                                        (this.text = t.text),
                                        (this.trigger = t.trigger),
                                        (this.selectedText = '');
                                }
                            },
                            {
                                key: 'initSelection',
                                value: function () {
                                    this.text ? this.selectFake() : this.target && this.selectTarget();
                                }
                            },
                            {
                                key: 'createFakeElement',
                                value: function () {
                                    var t = 'rtl' === document.documentElement.getAttribute('dir');
                                    (this.fakeElem = document.createElement('textarea')),
                                        (this.fakeElem.style.fontSize = '12pt'),
                                        (this.fakeElem.style.border = '0'),
                                        (this.fakeElem.style.padding = '0'),
                                        (this.fakeElem.style.margin = '0'),
                                        (this.fakeElem.style.position = 'absolute'),
                                        (this.fakeElem.style[t ? 'right' : 'left'] = '-9999px');
                                    t = window.pageYOffset || document.documentElement.scrollTop;
                                    return (
                                        (this.fakeElem.style.top = ''.concat(t, 'px')),
                                        this.fakeElem.setAttribute('readonly', ''),
                                        (this.fakeElem.value = this.text),
                                        this.fakeElem
                                    );
                                }
                            },
                            {
                                key: 'selectFake',
                                value: function () {
                                    var t = this,
                                        e = this.createFakeElement();
                                    (this.fakeHandlerCallback = function () {
                                        return t.removeFake();
                                    }),
                                        (this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || !0),
                                        this.container.appendChild(e),
                                        (this.selectedText = o()(e)),
                                        this.copyText(),
                                        this.removeFake();
                                }
                            },
                            {
                                key: 'removeFake',
                                value: function () {
                                    this.fakeHandler &&
                                        (this.container.removeEventListener('click', this.fakeHandlerCallback),
                                        (this.fakeHandler = null),
                                        (this.fakeHandlerCallback = null)),
                                        this.fakeElem && (this.container.removeChild(this.fakeElem), (this.fakeElem = null));
                                }
                            },
                            {
                                key: 'selectTarget',
                                value: function () {
                                    (this.selectedText = o()(this.target)), this.copyText();
                                }
                            },
                            {
                                key: 'copyText',
                                value: function () {
                                    var e;
                                    try {
                                        e = document.execCommand(this.action);
                                    } catch (t) {
                                        e = !1;
                                    }
                                    this.handleResult(e);
                                }
                            },
                            {
                                key: 'handleResult',
                                value: function (t) {
                                    this.emitter.emit(t ? 'success' : 'error', {
                                        action: this.action,
                                        text: this.selectedText,
                                        trigger: this.trigger,
                                        clearSelection: this.clearSelection.bind(this)
                                    });
                                }
                            },
                            {
                                key: 'clearSelection',
                                value: function () {
                                    this.trigger && this.trigger.focus(), document.activeElement.blur(), window.getSelection().removeAllRanges();
                                }
                            },
                            {
                                key: 'destroy',
                                value: function () {
                                    this.removeFake();
                                }
                            },
                            {
                                key: 'action',
                                set: function () {
                                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 'copy';
                                    if (((this._action = t), 'copy' !== this._action && 'cut' !== this._action))
                                        throw new Error('Invalid "action" value, use either "copy" or "cut"');
                                },
                                get: function () {
                                    return this._action;
                                }
                            },
                            {
                                key: 'target',
                                set: function (t) {
                                    if (void 0 !== t) {
                                        if (!t || 'object' !== c(t) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                        if ('copy' === this.action && t.hasAttribute('disabled'))
                                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                        if ('cut' === this.action && (t.hasAttribute('readonly') || t.hasAttribute('disabled')))
                                            throw new Error(
                                                'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
                                            );
                                        this._target = t;
                                    }
                                },
                                get: function () {
                                    return this._target;
                                }
                            }
                        ]) && u(t.prototype, n),
                        r && u(t, r),
                        e
                    );
                })();
                function s(t) {
                    return (s =
                        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
                              })(t);
                }
                function f(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                    }
                }
                function h(t, e) {
                    return (h =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function d(n) {
                    var r = (function () {
                        if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
                        if (Reflect.construct.sham) return !1;
                        if ('function' == typeof Proxy) return !0;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                        } catch (t) {
                            return !1;
                        }
                    })();
                    return function () {
                        var t,
                            e = p(n);
                        return (
                            (t = r ? ((t = p(this).constructor), Reflect.construct(e, arguments, t)) : e.apply(this, arguments)),
                            (e = this),
                            !(t = t) || ('object' !== s(t) && 'function' != typeof t)
                                ? (function (t) {
                                      if (void 0 !== t) return t;
                                      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                  })(e)
                                : t
                        );
                    };
                }
                function p(t) {
                    return (p = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                function y(t, e) {
                    t = 'data-clipboard-'.concat(t);
                    if (e.hasAttribute(t)) return e.getAttribute(t);
                }
                var r = (function () {
                    !(function (t, e) {
                        if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function');
                        (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), e && h(t, e);
                    })(o, i());
                    var t,
                        e,
                        n,
                        r = d(o);
                    function o(t, e) {
                        var n;
                        return (
                            (function (t) {
                                if (!(t instanceof o)) throw new TypeError('Cannot call a class as a function');
                            })(this),
                            (n = r.call(this)).resolveOptions(e),
                            n.listenClick(t),
                            n
                        );
                    }
                    return (
                        (t = o),
                        (n = [
                            {
                                key: 'isSupported',
                                value: function () {
                                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ['copy', 'cut'],
                                        t = 'string' == typeof t ? [t] : t,
                                        e = !!document.queryCommandSupported;
                                    return (
                                        t.forEach(function (t) {
                                            e = e && !!document.queryCommandSupported(t);
                                        }),
                                        e
                                    );
                                }
                            }
                        ]),
                        (e = [
                            {
                                key: 'resolveOptions',
                                value: function () {
                                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                                    (this.action = 'function' == typeof t.action ? t.action : this.defaultAction),
                                        (this.target = 'function' == typeof t.target ? t.target : this.defaultTarget),
                                        (this.text = 'function' == typeof t.text ? t.text : this.defaultText),
                                        (this.container = 'object' === s(t.container) ? t.container : document.body);
                                }
                            },
                            {
                                key: 'listenClick',
                                value: function (t) {
                                    var e = this;
                                    this.listener = a()(t, 'click', function (t) {
                                        return e.onClick(t);
                                    });
                                }
                            },
                            {
                                key: 'onClick',
                                value: function (t) {
                                    t = t.delegateTarget || t.currentTarget;
                                    this.clipboardAction && (this.clipboardAction = null),
                                        (this.clipboardAction = new l({
                                            action: this.action(t),
                                            target: this.target(t),
                                            text: this.text(t),
                                            container: this.container,
                                            trigger: t,
                                            emitter: this
                                        }));
                                }
                            },
                            {
                                key: 'defaultAction',
                                value: function (t) {
                                    return y('action', t);
                                }
                            },
                            {
                                key: 'defaultTarget',
                                value: function (t) {
                                    t = y('target', t);
                                    if (t) return document.querySelector(t);
                                }
                            },
                            {
                                key: 'defaultText',
                                value: function (t) {
                                    return y('text', t);
                                }
                            },
                            {
                                key: 'destroy',
                                value: function () {
                                    this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), (this.clipboardAction = null));
                                }
                            }
                        ]) && f(t.prototype, e),
                        n && f(t, n),
                        o
                    );
                })();
            },
            828: function (t) {
                var e;
                'undefined' == typeof Element ||
                    Element.prototype.matches ||
                    ((e = Element.prototype).matches =
                        e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector),
                    (t.exports = function (t, e) {
                        for (; t && 9 !== t.nodeType; ) {
                            if ('function' == typeof t.matches && t.matches(e)) return t;
                            t = t.parentNode;
                        }
                    });
            },
            438: function (t, e, n) {
                var a = n(828);
                function i(t, e, n, r, o) {
                    var i = function (e, n, t, r) {
                        return function (t) {
                            (t.delegateTarget = a(t.target, n)), t.delegateTarget && r.call(e, t);
                        };
                    }.apply(this, arguments);
                    return (
                        t.addEventListener(n, i, o),
                        {
                            destroy: function () {
                                t.removeEventListener(n, i, o);
                            }
                        }
                    );
                }
                t.exports = function (t, e, n, r, o) {
                    return 'function' == typeof t.addEventListener
                        ? i.apply(null, arguments)
                        : 'function' == typeof n
                        ? i.bind(null, document).apply(null, arguments)
                        : ('string' == typeof t && (t = document.querySelectorAll(t)),
                          Array.prototype.map.call(t, function (t) {
                              return i(t, e, n, r, o);
                          }));
                };
            },
            879: function (t, n) {
                (n.node = function (t) {
                    return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;
                }),
                    (n.nodeList = function (t) {
                        var e = Object.prototype.toString.call(t);
                        return (
                            void 0 !== t && ('[object NodeList]' === e || '[object HTMLCollection]' === e) && 'length' in t && (0 === t.length || n.node(t[0]))
                        );
                    }),
                    (n.string = function (t) {
                        return 'string' == typeof t || t instanceof String;
                    }),
                    (n.fn = function (t) {
                        return '[object Function]' === Object.prototype.toString.call(t);
                    });
            },
            370: function (t, e, n) {
                var l = n(879),
                    s = n(438);
                t.exports = function (t, e, n) {
                    if (!t && !e && !n) throw new Error('Missing required arguments');
                    if (!l.string(e)) throw new TypeError('Second argument must be a String');
                    if (!l.fn(n)) throw new TypeError('Third argument must be a Function');
                    if (l.node(t))
                        return (
                            (c = e),
                            (u = n),
                            (a = t).addEventListener(c, u),
                            {
                                destroy: function () {
                                    a.removeEventListener(c, u);
                                }
                            }
                        );
                    if (l.nodeList(t))
                        return (
                            (r = t),
                            (o = e),
                            (i = n),
                            Array.prototype.forEach.call(r, function (t) {
                                t.addEventListener(o, i);
                            }),
                            {
                                destroy: function () {
                                    Array.prototype.forEach.call(r, function (t) {
                                        t.removeEventListener(o, i);
                                    });
                                }
                            }
                        );
                    if (l.string(t)) return (t = t), (e = e), (n = n), s(document.body, t, e, n);
                    throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
                    var r, o, i, a, c, u;
                };
            },
            817: function (t) {
                t.exports = function (t) {
                    var e,
                        n =
                            'SELECT' === t.nodeName
                                ? (t.focus(), t.value)
                                : 'INPUT' === t.nodeName || 'TEXTAREA' === t.nodeName
                                ? ((e = t.hasAttribute('readonly')) || t.setAttribute('readonly', ''),
                                  t.select(),
                                  t.setSelectionRange(0, t.value.length),
                                  e || t.removeAttribute('readonly'),
                                  t.value)
                                : (t.hasAttribute('contenteditable') && t.focus(),
                                  (n = window.getSelection()),
                                  (e = document.createRange()).selectNodeContents(t),
                                  n.removeAllRanges(),
                                  n.addRange(e),
                                  n.toString());
                    return n;
                };
            },
            279: function (t) {
                function e() {}
                (e.prototype = {
                    on: function (t, e, n) {
                        var r = this.e || (this.e = {});
                        return (r[t] || (r[t] = [])).push({ fn: e, ctx: n }), this;
                    },
                    once: function (t, e, n) {
                        var r = this;
                        function o() {
                            r.off(t, o), e.apply(n, arguments);
                        }
                        return (o._ = e), this.on(t, o, n);
                    },
                    emit: function (t) {
                        for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), r = 0, o = n.length; r < o; r++)
                            n[r].fn.apply(n[r].ctx, e);
                        return this;
                    },
                    off: function (t, e) {
                        var n = this.e || (this.e = {}),
                            r = n[t],
                            o = [];
                        if (r && e) for (var i = 0, a = r.length; i < a; i++) r[i].fn !== e && r[i].fn._ !== e && o.push(r[i]);
                        return o.length ? (n[t] = o) : delete n[t], this;
                    }
                }),
                    (t.exports = e),
                    (t.exports.TinyEmitter = e);
            }
        }),
        (o = {}),
        (r.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return r.d(e, { a: e }), e;
        }),
        (r.d = function (t, e) {
            for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
        }),
        (r.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        r(134).default
    );
    function r(t) {
        if (o[t]) return o[t].exports;
        var e = (o[t] = { exports: {} });
        return n[t](e, e.exports, r), e.exports;
    }
    var n, o;
});
