/*! For license information please see usersite-ff3b56ae7dfd0704a36b.js.LICENSE.txt */
!(t => {
  const e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    const o = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = (t, e, r) => {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = t => {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = (t, e) => {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      const r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (const o in t)
          n.d(
            r,
            o,
            (e => {
              return t[e];
            }).bind(null, o)
          );
      return r;
    }),
    (n.n = t => {
      const e =
        t && t.__esModule
          ? () => {
              return t.default;
            }
          : () => {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = (t, e) => {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = "/packs/"),
    n((n.s = 559));
})({
  0: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return I;
    }),
      n.d(e, "b", () => {
        return F;
      });
    const r = (() => {
      function t(t, e) {
        (this.eventTarget = t),
          (this.eventName = e),
          (this.unorderedBindings = new Set());
      }
      return (t.prototype.connect = function () {
        this.eventTarget.addEventListener(this.eventName, this, !1);
      }),
      (t.prototype.disconnect = function () {
        this.eventTarget.removeEventListener(this.eventName, this, !1);
      }),
      (t.prototype.bindingConnected = function (t) {
        this.unorderedBindings.add(t);
      }),
      (t.prototype.bindingDisconnected = function (t) {
        this.unorderedBindings.delete(t);
      }),
      (t.prototype.handleEvent = function (t) {
        for (
          let e = (t => {
                  if (("immediatePropagationStopped" in t)) return t;
                  const e = t.stopImmediatePropagation;
                  return Object.assign(t, {
                    immediatePropagationStopped: !1,
                    stopImmediatePropagation() {
                      (this.immediatePropagationStopped = !0), e.call(this);
                    },
                  });
                })(t),
              n = 0,
              r = this.bindings;
          n < r.length;
          n++
        ) {
          const o = r[n];
          if (e.immediatePropagationStopped) break;
          o.handleEvent(e);
        }
      }),
      Object.defineProperty(t.prototype, "bindings", {
        get() {
          return Array.from(this.unorderedBindings).sort((t, e) => {
            const n = t.index, r = e.index;
            return n < r ? -1 : n > r ? 1 : 0;
          });
        },
        enumerable: !0,
        configurable: !0,
      }),
      t;
    })();
    const o = (() => {
              function t(t) {
                (this.application = t),
                  (this.eventListenerMaps = new Map()),
                  (this.started = !1);
              }
              return (t.prototype.start = function () {
                this.started ||
                  ((this.started = !0),
                  this.eventListeners.forEach(t => {
                    return t.connect();
                  }));
              }),
              (t.prototype.stop = function () {
                this.started &&
                  ((this.started = !1),
                  this.eventListeners.forEach(t => {
                    return t.disconnect();
                  }));
              }),
              Object.defineProperty(t.prototype, "eventListeners", {
                get() {
                  return Array.from(this.eventListenerMaps.values()).reduce(
                    (t, e) => {
                      return t.concat(Array.from(e.values()));
                    },
                    []
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.bindingConnected = function (t) {
                this.fetchEventListenerForBinding(t).bindingConnected(t);
              }),
              (t.prototype.bindingDisconnected = function (t) {
                this.fetchEventListenerForBinding(t).bindingDisconnected(t);
              }),
              (t.prototype.handleError = function (t, e, n) {
                void 0 === n && (n = {}),
                  this.application.handleError(t, "Error " + e, n);
              }),
              (t.prototype.fetchEventListenerForBinding = function (t) {
                const e = t.eventTarget, n = t.eventName;
                return this.fetchEventListener(e, n);
              }),
              (t.prototype.fetchEventListener = function (t, e) {
                const n = this.fetchEventListenerMapForEventTarget(t);
                let r = n.get(e);
                return r || ((r = this.createEventListener(t, e)), n.set(e, r)), r;
              }),
              (t.prototype.createEventListener = function (t, e) {
                const n = new r(t, e);
                return this.started && n.connect(), n;
              }),
              (t.prototype.fetchEventListenerMapForEventTarget = function (t) {
                let e = this.eventListenerMaps.get(t);
                return e || ((e = new Map()), this.eventListenerMaps.set(t, e)), e;
              }),
              t;
            })(),
          i = /^((.+?)(@(window|document))?->)?(.+?)(#(.+))?$/;
    function a(t) {
      return "window" == t ? window : "document" == t ? document : void 0;
    }
    const s = (() => {
              function t(t, e, n) {
                (this.element = t),
                  (this.index = e),
                  (this.eventTarget = n.eventTarget || t),
                  (this.eventName =
                    n.eventName || (t => {
                      const e = t.tagName.toLowerCase();
                      if (e in u) return u[e](t);
                    })(t) ||
                    c("missing event name")),
                  (this.identifier = n.identifier || c("missing identifier")),
                  (this.methodName = n.methodName || c("missing method name"));
              }
              return (t.forToken = function (t) {
                return new this(
                  t.element,
                  t.index,
                  ((e = t.content),
                  {
                    eventTarget: a((n = e.trim().match(i) || [])[4]),
                    eventName: n[2],
                    identifier: n[5],
                    methodName: n[7],
                  })
                );
                var e, n;
              }),
              (t.prototype.toString = function () {
                const t = this.eventTargetName ? "@" + this.eventTargetName : "";
                return (
                  "" +
                  this.eventName +
                  t +
                  "->" +
                  this.identifier +
                  "#" +
                  this.methodName
                );
              }),
              Object.defineProperty(t.prototype, "eventTargetName", {
                get() {
                  return (t = this.eventTarget) == window
                    ? "window"
                    : t == document
                    ? "document"
                    : void 0;
                  var t;
                },
                enumerable: !0,
                configurable: !0,
              }),
              t
            ;
            })(),
          u = {
            a(t) {
              return "click";
            },
            button(t) {
              return "click";
            },
            form(t) {
              return "submit";
            },
            input(t) {
              return "submit" == t.getAttribute("type") ? "click" : "change";
            },
            select(t) {
              return "change";
            },
            textarea(t) {
              return "change";
            },
          };
    function c(t) {
      throw new Error(t);
    }
    const l = (() => {
              function t(t, e) {
                (this.context = t), (this.action = e);
              }
              return Object.defineProperty(t.prototype, "index", {
                get() {
                  return this.action.index;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "eventTarget", {
                get() {
                  return this.action.eventTarget;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "identifier", {
                get() {
                  return this.context.identifier;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.handleEvent = function (t) {
                this.willBeInvokedByEvent(t) && this.invokeWithEvent(t);
              }),
              Object.defineProperty(t.prototype, "eventName", {
                get() {
                  return this.action.eventName;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "method", {
                get() {
                  const t = this.controller[this.methodName];
                  if ("function" == typeof t) return t;
                  throw new Error(
                    'Action "' +
                      this.action +
                      '" references undefined method "' +
                      this.methodName +
                      '"'
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.invokeWithEvent = function (t) {
                try {
                  this.method.call(this.controller, t);
                } catch (c) {
                  const e = {
                    identifier: this.identifier,
                    controller: this.controller,
                    element: this.element,
                    index: this.index,
                    event: t,
                  };
                  this.context.handleError(
                    c,
                    'invoking action "' + this.action + '"',
                    e
                  );
                }
              }),
              (t.prototype.willBeInvokedByEvent = function (t) {
                const e = t.target;
                return (
                  this.element === e ||
                  !(e instanceof Element && this.element.contains(e)) ||
                  this.scope.containsElement(e)
                );
              }),
              Object.defineProperty(t.prototype, "controller", {
                get() {
                  return this.context.controller;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "methodName", {
                get() {
                  return this.action.methodName;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "element", {
                get() {
                  return this.scope.element;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "scope", {
                get() {
                  return this.context.scope;
                },
                enumerable: !0,
                configurable: !0,
              }),
              t
            ;
            })(),
          f = (() => {
            function t(t, e) {
              const n = this;
              (this.element = t),
                (this.started = !1),
                (this.delegate = e),
                (this.elements = new Set()),
                (this.mutationObserver = new MutationObserver(t => {
                  return n.processMutations(t);
                }));
            }
            return (t.prototype.start = function () {
              this.started ||
                ((this.started = !0),
                this.mutationObserver.observe(this.element, {
                  attributes: !0,
                  childList: !0,
                  subtree: !0,
                }),
                this.refresh());
            }),
            (t.prototype.stop = function () {
              this.started &&
                (this.mutationObserver.takeRecords(),
                this.mutationObserver.disconnect(),
                (this.started = !1));
            }),
            (t.prototype.refresh = function () {
              if (this.started) {
                for (
                  var t = new Set(this.matchElementsInTree()),
                    e = 0,
                    n = Array.from(this.elements);
                  e < n.length;
                  e++
                ) {
                  var r = n[e];
                  t.has(r) || this.removeElement(r);
                }
                for (let o = 0, i = Array.from(t); o < i.length; o++) {
                  r = i[o];
                  this.addElement(r);
                }
              }
            }),
            (t.prototype.processMutations = function (t) {
              if (this.started)
                for (let e = 0, n = t; e < n.length; e++) {
                  const r = n[e];
                  this.processMutation(r);
                }
            }),
            (t.prototype.processMutation = function (t) {
              "attributes" == t.type
                ? this.processAttributeChange(t.target, t.attributeName)
                : "childList" == t.type &&
                  (this.processRemovedNodes(t.removedNodes),
                  this.processAddedNodes(t.addedNodes));
            }),
            (t.prototype.processAttributeChange = function (t, e) {
              const n = t;
              this.elements.has(n)
                ? this.delegate.elementAttributeChanged && this.matchElement(n)
                  ? this.delegate.elementAttributeChanged(n, e)
                  : this.removeElement(n)
                : this.matchElement(n) && this.addElement(n);
            }),
            (t.prototype.processRemovedNodes = function (t) {
              for (let e = 0, n = Array.from(t); e < n.length; e++) {
                const r = n[e], o = this.elementFromNode(r);
                o && this.processTree(o, this.removeElement);
              }
            }),
            (t.prototype.processAddedNodes = function (t) {
              for (let e = 0, n = Array.from(t); e < n.length; e++) {
                const r = n[e], o = this.elementFromNode(r);
                o &&
                  this.elementIsActive(o) &&
                  this.processTree(o, this.addElement);
              }
            }),
            (t.prototype.matchElement = function (t) {
              return this.delegate.matchElement(t);
            }),
            (t.prototype.matchElementsInTree = function (t) {
              return (
                void 0 === t && (t = this.element),
                this.delegate.matchElementsInTree(t)
              );
            }),
            (t.prototype.processTree = function (t, e) {
              for (
                let n = 0, r = this.matchElementsInTree(t);
                n < r.length;
                n++
              ) {
                const o = r[n];
                e.call(this, o);
              }
            }),
            (t.prototype.elementFromNode = t => {
              if (t.nodeType == Node.ELEMENT_NODE) return t;
            }),
            (t.prototype.elementIsActive = function (t) {
              return (
                t.isConnected == this.element.isConnected &&
                this.element.contains(t)
              );
            }),
            (t.prototype.addElement = function (t) {
              this.elements.has(t) ||
                (this.elementIsActive(t) &&
                  (this.elements.add(t),
                  this.delegate.elementMatched &&
                    this.delegate.elementMatched(t)));
            }),
            (t.prototype.removeElement = function (t) {
              this.elements.has(t) &&
                (this.elements.delete(t),
                this.delegate.elementUnmatched &&
                  this.delegate.elementUnmatched(t));
            }),
            t;
          })(),
          d = (() => {
            function t(t, e, n) {
              (this.attributeName = e),
                (this.delegate = n),
                (this.elementObserver = new f(t, this));
            }
            return Object.defineProperty(t.prototype, "element", {
              get() {
                return this.elementObserver.element;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "selector", {
              get() {
                return "[" + this.attributeName + "]";
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.start = function () {
              this.elementObserver.start();
            }),
            (t.prototype.stop = function () {
              this.elementObserver.stop();
            }),
            (t.prototype.refresh = function () {
              this.elementObserver.refresh();
            }),
            Object.defineProperty(t.prototype, "started", {
              get() {
                return this.elementObserver.started;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.matchElement = function (t) {
              return t.hasAttribute(this.attributeName);
            }),
            (t.prototype.matchElementsInTree = function (t) {
              const e = this.matchElement(t) ? [t] : [], n = Array.from(t.querySelectorAll(this.selector));
              return e.concat(n);
            }),
            (t.prototype.elementMatched = function (t) {
              this.delegate.elementMatchedAttribute &&
                this.delegate.elementMatchedAttribute(t, this.attributeName);
            }),
            (t.prototype.elementUnmatched = function (t) {
              this.delegate.elementUnmatchedAttribute &&
                this.delegate.elementUnmatchedAttribute(t, this.attributeName);
            }),
            (t.prototype.elementAttributeChanged = function (t, e) {
              this.delegate.elementAttributeValueChanged &&
                this.attributeName == e &&
                this.delegate.elementAttributeValueChanged(t, e);
            }),
            t
          ;
          })();
    function p(t, e, n) {
      y(t, e).add(n);
    }
    function h(t, e, n) {
      y(t, e).delete(n), ((t, e) => {
        const n = t.get(e);
        null != n && 0 == n.size && t.delete(e);
      })(t, e);
    }
    function y(t, e) {
      let n = t.get(e);
      return n || ((n = new Set()), t.set(e, n)), n;
    }
    let m;

    const v = (() => {
      function t() {
        this.valuesByKey = new Map();
      }
      return Object.defineProperty(t.prototype, "values", {
        get() {
          return Array.from(this.valuesByKey.values()).reduce((t, e) => {
            return t.concat(Array.from(e));
          },
          []);
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "size", {
        get() {
          return Array.from(this.valuesByKey.values()).reduce((t, e) => {
            return t + e.size;
          },
          0);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.add = function (t, e) {
        p(this.valuesByKey, t, e);
      }),
      (t.prototype.delete = function (t, e) {
        h(this.valuesByKey, t, e);
      }),
      (t.prototype.has = function (t, e) {
        const n = this.valuesByKey.get(t);
        return null != n && n.has(e);
      }),
      (t.prototype.hasKey = function (t) {
        return this.valuesByKey.has(t);
      }),
      (t.prototype.hasValue = function (t) {
        return Array.from(this.valuesByKey.values()).some(e => {
          return e.has(t);
        });
      }),
      (t.prototype.getValuesForKey = function (t) {
        const e = this.valuesByKey.get(t);
        return e ? Array.from(e) : [];
      }),
      (t.prototype.getKeysForValue = function (t) {
        return Array.from(this.valuesByKey)
          .filter(e => {
            e[0];
            return e[1].has(t);
          })
          .map(t => {
            const e = t[0];
            t[1];
            return e;
          });
      }),
      t;
    })();

    const g =
      ((m =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        })),
      (t, e) => {
        function n() {
          this.constructor = t;
        }
        m(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      });

    const b =
      ((t => {
        function e() {
          const e = t.call(this) || this;
          return (e.keysByValue = new Map()), e;
        }
        g(e, t),
          Object.defineProperty(e.prototype, "values", {
            get() {
              return Array.from(this.keysByValue.keys());
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.add = function (e, n) {
            t.prototype.add.call(this, e, n), p(this.keysByValue, n, e);
          }),
          (e.prototype.delete = function (e, n) {
            t.prototype.delete.call(this, e, n), h(this.keysByValue, n, e);
          }),
          (e.prototype.hasValue = function (t) {
            return this.keysByValue.has(t);
          }),
          (e.prototype.getKeysForValue = function (t) {
            const e = this.keysByValue.get(t);
            return e ? Array.from(e) : [];
          });
      })(v), (() => {
      function t(t, e, n) {
        (this.attributeObserver = new d(t, e, this)),
          (this.delegate = n),
          (this.tokensByElement = new v());
      }
      return Object.defineProperty(t.prototype, "started", {
        get() {
          return this.attributeObserver.started;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.start = function () {
        this.attributeObserver.start();
      }),
      (t.prototype.stop = function () {
        this.attributeObserver.stop();
      }),
      (t.prototype.refresh = function () {
        this.attributeObserver.refresh();
      }),
      Object.defineProperty(t.prototype, "element", {
        get() {
          return this.attributeObserver.element;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "attributeName", {
        get() {
          return this.attributeObserver.attributeName;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.elementMatchedAttribute = function (t) {
        this.tokensMatched(this.readTokensForElement(t));
      }),
      (t.prototype.elementAttributeValueChanged = function (t) {
        const e = this.refreshTokensForElement(t), n = e[0], r = e[1];
        this.tokensUnmatched(n), this.tokensMatched(r);
      }),
      (t.prototype.elementUnmatchedAttribute = function (t) {
        this.tokensUnmatched(this.tokensByElement.getValuesForKey(t));
      }),
      (t.prototype.tokensMatched = function (t) {
        const e = this;
        t.forEach(t => {
          return e.tokenMatched(t);
        });
      }),
      (t.prototype.tokensUnmatched = function (t) {
        const e = this;
        t.forEach(t => {
          return e.tokenUnmatched(t);
        });
      }),
      (t.prototype.tokenMatched = function (t) {
        this.delegate.tokenMatched(t),
          this.tokensByElement.add(t.element, t);
      }),
      (t.prototype.tokenUnmatched = function (t) {
        this.delegate.tokenUnmatched(t),
          this.tokensByElement.delete(t.element, t);
      }),
      (t.prototype.refreshTokensForElement = function (t) {
        let e;
        let n;
        let r;
        const o = this.tokensByElement.getValuesForKey(t);
        const i = this.readTokensForElement(t);

        const a = ((e = o),
        (n = i),
        (r = Math.max(e.length, n.length)),
        Array.from({ length: r }, (t, r) => {
          return [e[r], n[r]];
        })).findIndex(t => {
          return !((t, e) => {
            return (
              t && e && t.index == e.index && t.content == e.content
            );
          })(t[0], t[1]);
        });

        return -1 == a ? [[], []] : [o.slice(a), i.slice(a)];
      }),
      (t.prototype.readTokensForElement = function (t) {
        const e = this.attributeName;
        return ((t, e, n) => {
          return t
            .trim()
            .split(/\s+/)
            .filter(t => {
              return t.length;
            })
            .map((t, r) => {
              return {
                element: e,
                attributeName: n,
                content: t,
                index: r,
              };
            });
        })(t.getAttribute(e) || "", t, e);
      }),
      t;
    })());

    const w = (() => {
              function t(t, e, n) {
                (this.tokenListObserver = new b(t, e, this)),
                  (this.delegate = n),
                  (this.parseResultsByToken = new WeakMap()),
                  (this.valuesByTokenByElement = new WeakMap());
              }
              return Object.defineProperty(t.prototype, "started", {
                get() {
                  return this.tokenListObserver.started;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.start = function () {
                this.tokenListObserver.start();
              }),
              (t.prototype.stop = function () {
                this.tokenListObserver.stop();
              }),
              (t.prototype.refresh = function () {
                this.tokenListObserver.refresh();
              }),
              Object.defineProperty(t.prototype, "element", {
                get() {
                  return this.tokenListObserver.element;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "attributeName", {
                get() {
                  return this.tokenListObserver.attributeName;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.tokenMatched = function (t) {
                const e = t.element, n = this.fetchParseResultForToken(t).value;
                n &&
                  (this.fetchValuesByTokenForElement(e).set(t, n),
                  this.delegate.elementMatchedValue(e, n));
              }),
              (t.prototype.tokenUnmatched = function (t) {
                const e = t.element, n = this.fetchParseResultForToken(t).value;
                n &&
                  (this.fetchValuesByTokenForElement(e).delete(t),
                  this.delegate.elementUnmatchedValue(e, n));
              }),
              (t.prototype.fetchParseResultForToken = function (t) {
                let e = this.parseResultsByToken.get(t);
                return (
                  e ||
                    ((e = this.parseToken(t)), this.parseResultsByToken.set(t, e)),
                  e
                );
              }),
              (t.prototype.fetchValuesByTokenForElement = function (t) {
                let e = this.valuesByTokenByElement.get(t);
                return (
                  e || ((e = new Map()), this.valuesByTokenByElement.set(t, e)), e
                );
              }),
              (t.prototype.parseToken = function (t) {
                try {
                  return { value: this.delegate.parseValueForToken(t) };
                } catch (c) {
                  return { error: c };
                }
              }),
              t
            ;
            })(),
          _ = (() => {
            function t(t, e) {
              (this.context = t),
                (this.delegate = e),
                (this.bindingsByAction = new Map());
            }
            return (t.prototype.start = function () {
              this.valueListObserver ||
                ((this.valueListObserver = new w(
                  this.element,
                  this.actionAttribute,
                  this
                )),
                this.valueListObserver.start());
            }),
            (t.prototype.stop = function () {
              this.valueListObserver &&
                (this.valueListObserver.stop(),
                delete this.valueListObserver,
                this.disconnectAllActions());
            }),
            Object.defineProperty(t.prototype, "element", {
              get() {
                return this.context.element;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "identifier", {
              get() {
                return this.context.identifier;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "actionAttribute", {
              get() {
                return this.schema.actionAttribute;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "schema", {
              get() {
                return this.context.schema;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "bindings", {
              get() {
                return Array.from(this.bindingsByAction.values());
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.connectAction = function (t) {
              const e = new l(this.context, t);
              this.bindingsByAction.set(t, e), this.delegate.bindingConnected(e);
            }),
            (t.prototype.disconnectAction = function (t) {
              const e = this.bindingsByAction.get(t);
              e &&
                (this.bindingsByAction.delete(t),
                this.delegate.bindingDisconnected(e));
            }),
            (t.prototype.disconnectAllActions = function () {
              const t = this;
              this.bindings.forEach(e => {
                return t.delegate.bindingDisconnected(e);
              }),
                this.bindingsByAction.clear();
            }),
            (t.prototype.parseValueForToken = function (t) {
              const e = s.forToken(t);
              if (e.identifier == this.identifier) return e;
            }),
            (t.prototype.elementMatchedValue = function (t, e) {
              this.connectAction(e);
            }),
            (t.prototype.elementUnmatchedValue = function (t, e) {
              this.disconnectAction(e);
            }),
            t;
          })(),
          O = (() => {
            function t(t, e) {
              (this.module = t),
                (this.scope = e),
                (this.controller = new t.controllerConstructor(this)),
                (this.bindingObserver = new _(this, this.dispatcher));
              try {
                this.controller.initialize();
              } catch (c) {
                this.handleError(c, "initializing controller");
              }
            }
            return (t.prototype.connect = function () {
              this.bindingObserver.start();
              try {
                this.controller.connect();
              } catch (c) {
                this.handleError(c, "connecting controller");
              }
            }),
            (t.prototype.disconnect = function () {
              try {
                this.controller.disconnect();
              } catch (c) {
                this.handleError(c, "disconnecting controller");
              }
              this.bindingObserver.stop();
            }),
            Object.defineProperty(t.prototype, "application", {
              get() {
                return this.module.application;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "identifier", {
              get() {
                return this.module.identifier;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "schema", {
              get() {
                return this.application.schema;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dispatcher", {
              get() {
                return this.application.dispatcher;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "element", {
              get() {
                return this.scope.element;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "parentElement", {
              get() {
                return this.element.parentElement;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.handleError = function (t, e, n) {
              void 0 === n && (n = {});
              const r = this.identifier, o = this.controller, i = this.element;
              (n = Object.assign(
                { identifier: r, controller: o, element: i },
                n
              )),
                this.application.handleError(t, "Error " + e, n);
            }),
            t
          ;
          })(),
          S = (() => {
            const t =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                ((t, e) => {
                  t.__proto__ = e;
                })) ||
              ((t, e) => {
                for (const n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
              });
            return (e, n) => {
              function r() {
                this.constructor = e;
              }
              t(e, n),
                (e.prototype =
                  null === n
                    ? Object.create(n)
                    : ((r.prototype = n.prototype), new r()));
            };
          })();
    function P(t) {
      const e = E(t);
      return e.bless(), e;
    }

    var E = (() => {
        function t(t) {
          function e() {
            const n = this && this instanceof e ? this.constructor : void 0;
            return Reflect.construct(t, arguments, n);
          }
          return (
            (e.prototype = Object.create(t.prototype, {
              constructor: { value: e },
            })),
            Reflect.setPrototypeOf(e, t),
            e
          );
        }
        try {
          return ((e = t(function () {
            this.a.call(this);
          })).prototype.a = () => {}),
          new e(),
          t
        ;
        } catch (c) {
          return t => {
            return (t => {
              function e() {
                return (null !== t && t.apply(this, arguments)) || this;
              }
              return S(e, t), e;
            })(t);
          };
        }
        var e;
      })();

    const T = (() => {
      function t(t, e) {
        (this.application = t),
          (this.definition = (t => {
            return {
              identifier: t.identifier,
              controllerConstructor: P(t.controllerConstructor),
            };
          })(e)),
          (this.contextsByScope = new WeakMap()),
          (this.connectedContexts = new Set());
      }
      return Object.defineProperty(t.prototype, "identifier", {
        get() {
          return this.definition.identifier;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "controllerConstructor", {
        get() {
          return this.definition.controllerConstructor;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "contexts", {
        get() {
          return Array.from(this.connectedContexts);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.connectContextForScope = function (t) {
        const e = this.fetchContextForScope(t);
        this.connectedContexts.add(e), e.connect();
      }),
      (t.prototype.disconnectContextForScope = function (t) {
        const e = this.contextsByScope.get(t);
        e && (this.connectedContexts.delete(e), e.disconnect());
      }),
      (t.prototype.fetchContextForScope = function (t) {
        let e = this.contextsByScope.get(t);
        return (
          e || ((e = new O(this, t)), this.contextsByScope.set(t, e)), e
        );
      }),
      t
    ;
    })();

    const k = (() => {
      function t(t) {
        this.scope = t;
      }
      return Object.defineProperty(t.prototype, "element", {
        get() {
          return this.scope.element;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "identifier", {
        get() {
          return this.scope.identifier;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.get = function (t) {
        return (t = this.getFormattedKey(t)), this.element.getAttribute(t);
      }),
      (t.prototype.set = function (t, e) {
        return (
          (t = this.getFormattedKey(t)),
          this.element.setAttribute(t, e),
          this.get(t)
        );
      }),
      (t.prototype.has = function (t) {
        return (t = this.getFormattedKey(t)), this.element.hasAttribute(t);
      }),
      (t.prototype.delete = function (t) {
        return (
          !!this.has(t) &&
          ((t = this.getFormattedKey(t)),
          this.element.removeAttribute(t),
          !0)
        );
      }),
      (t.prototype.getFormattedKey = function (t) {
        return "data-" +
        this.identifier +
        "-" +
        t.replace(/([A-Z])/g, (t, e) => {
          return "-" + e.toLowerCase();
        });
      }),
      t
    ;
    })();

    function A(t, e) {
      return "[" + t + '~="' + e + '"]';
    }

    const j = (() => {
        function t(t) {
          this.scope = t;
        }
        return Object.defineProperty(t.prototype, "element", {
          get() {
            return this.scope.element;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "identifier", {
          get() {
            return this.scope.identifier;
          },
          enumerable: !0,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "schema", {
          get() {
            return this.scope.schema;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (t.prototype.has = function (t) {
          return null != this.find(t);
        }),
        (t.prototype.find = function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          const n = this.getSelectorForTargetNames(t);
          return this.scope.findElement(n);
        }),
        (t.prototype.findAll = function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          const n = this.getSelectorForTargetNames(t);
          return this.scope.findAllElements(n);
        }),
        (t.prototype.getSelectorForTargetNames = function (t) {
          const e = this;
          return t
            .map(t => {
              return e.getSelectorForTargetName(t);
            })
            .join(", ");
        }),
        (t.prototype.getSelectorForTargetName = function (t) {
          const e = this.identifier + "." + t;
          return A(this.schema.targetAttribute, e);
        }),
        t;
      })();

    const L = (() => {
      function t(t, e, n) {
        (this.schema = t),
          (this.identifier = e),
          (this.element = n),
          (this.targets = new j(this)),
          (this.data = new k(this));
      }
      return (t.prototype.findElement = function (t) {
        return this.findAllElements(t)[0];
      }),
      (t.prototype.findAllElements = function (t) {
        const e = this.element.matches(t) ? [this.element] : [],
              n = this.filterElements(
                Array.from(this.element.querySelectorAll(t))
              );
        return e.concat(n);
      }),
      (t.prototype.filterElements = function (t) {
        const e = this;
        return t.filter(t => {
          return e.containsElement(t);
        });
      }),
      (t.prototype.containsElement = function (t) {
        return t.closest(this.controllerSelector) === this.element;
      }),
      Object.defineProperty(t.prototype, "controllerSelector", {
        get() {
          return A(this.schema.controllerAttribute, this.identifier);
        },
        enumerable: !0,
        configurable: !0,
      }),
      t;
    })();

    const M = (() => {
      function t(t, e, n) {
        (this.element = t),
          (this.schema = e),
          (this.delegate = n),
          (this.valueListObserver = new w(
            this.element,
            this.controllerAttribute,
            this
          )),
          (this.scopesByIdentifierByElement = new WeakMap()),
          (this.scopeReferenceCounts = new WeakMap());
      }
      return (t.prototype.start = function () {
        this.valueListObserver.start();
      }),
      (t.prototype.stop = function () {
        this.valueListObserver.stop();
      }),
      Object.defineProperty(t.prototype, "controllerAttribute", {
        get() {
          return this.schema.controllerAttribute;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.parseValueForToken = function (t) {
        const e = t.element;
        const n = t.content;
        const r = this.fetchScopesByIdentifierForElement(e);
        let o = r.get(n);
        return o || ((o = new L(this.schema, n, e)), r.set(n, o)), o;
      }),
      (t.prototype.elementMatchedValue = function (t, e) {
        const n = (this.scopeReferenceCounts.get(e) || 0) + 1;
        this.scopeReferenceCounts.set(e, n),
          1 == n && this.delegate.scopeConnected(e);
      }),
      (t.prototype.elementUnmatchedValue = function (t, e) {
        const n = this.scopeReferenceCounts.get(e);
        n &&
          (this.scopeReferenceCounts.set(e, n - 1),
          1 == n && this.delegate.scopeDisconnected(e));
      }),
      (t.prototype.fetchScopesByIdentifierForElement = function (t) {
        let e = this.scopesByIdentifierByElement.get(t);
        return (
          e ||
            ((e = new Map()), this.scopesByIdentifierByElement.set(t, e)),
          e
        );
      }),
      t
    ;
    })();

    const x = (() => {
      function t(t) {
        (this.application = t),
          (this.scopeObserver = new M(this.element, this.schema, this)),
          (this.scopesByIdentifier = new v()),
          (this.modulesByIdentifier = new Map());
      }
      return Object.defineProperty(t.prototype, "element", {
        get() {
          return this.application.element;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "schema", {
        get() {
          return this.application.schema;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "controllerAttribute", {
        get() {
          return this.schema.controllerAttribute;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "modules", {
        get() {
          return Array.from(this.modulesByIdentifier.values());
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "contexts", {
        get() {
          return this.modules.reduce((t, e) => {
            return t.concat(e.contexts);
          }, []);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.start = function () {
        this.scopeObserver.start();
      }),
      (t.prototype.stop = function () {
        this.scopeObserver.stop();
      }),
      (t.prototype.loadDefinition = function (t) {
        this.unloadIdentifier(t.identifier);
        const e = new T(this.application, t);
        this.connectModule(e);
      }),
      (t.prototype.unloadIdentifier = function (t) {
        const e = this.modulesByIdentifier.get(t);
        e && this.disconnectModule(e);
      }),
      (t.prototype.getContextForElementAndIdentifier = function (t, e) {
        const n = this.modulesByIdentifier.get(e);
        if (n)
          return n.contexts.find(e => {
            return e.element == t;
          });
      }),
      (t.prototype.handleError = function (t, e, n) {
        this.application.handleError(t, e, n);
      }),
      (t.prototype.scopeConnected = function (t) {
        this.scopesByIdentifier.add(t.identifier, t);
        const e = this.modulesByIdentifier.get(t.identifier);
        e && e.connectContextForScope(t);
      }),
      (t.prototype.scopeDisconnected = function (t) {
        this.scopesByIdentifier.delete(t.identifier, t);
        const e = this.modulesByIdentifier.get(t.identifier);
        e && e.disconnectContextForScope(t);
      }),
      (t.prototype.connectModule = function (t) {
        this.modulesByIdentifier.set(t.identifier, t),
          this.scopesByIdentifier
            .getValuesForKey(t.identifier)
            .forEach(e => {
              return t.connectContextForScope(e);
            });
      }),
      (t.prototype.disconnectModule = function (t) {
        this.modulesByIdentifier.delete(t.identifier),
          this.scopesByIdentifier
            .getValuesForKey(t.identifier)
            .forEach(e => {
              return t.disconnectContextForScope(e);
            });
      }),
      t;
    })();

    const R = {
      controllerAttribute: "data-controller",
      actionAttribute: "data-action",
      targetAttribute: "data-target",
    };

    const D = (t, e, n, r) => {
      return new (n || (n = Promise))((o, i) => {
        function a(t) {
          try {
            u(r.next(t));
          } catch (e) {
            i(e);
          }
        }
        function s(t) {
          try {
            u(r.throw(t));
          } catch (e) {
            i(e);
          }
        }
        function u(t) {
          t.done
            ? o(t.value)
            : new n(e => {
                e(t.value);
              }).then(a, s);
        }
        u((r = r.apply(t, e || [])).next());
      });
    };

    const C = (t, e) => {
      let n,
          r,
          o,
          i,
          a = {
            label: 0,
            sent() {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
      return (
        (i = { next: s(0), throw: s(1), return: s(2) }),
        "function" === typeof Symbol &&
          (i[Symbol.iterator] = function () {
            return this;
          }),
        i
      );
      function s(i) {
        return s => {
          return (i => {
            if (n) throw new TypeError("Generator is already executing.");
            for (; a; )
              try {
                if (
                  ((n = 1),
                  r &&
                    (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) &&
                    !(o = o.call(r, i[1])).done)
                )
                  return o;
                switch (((r = 0), o && (i = [0, o.value]), i[0])) {
                  case 0:
                  case 1:
                    o = i;
                    break;
                  case 4:
                    return a.label++, { value: i[1], done: !1 };
                  case 5:
                    a.label++, (r = i[1]), (i = [0]);
                    continue;
                  case 7:
                    (i = a.ops.pop()), a.trys.pop();
                    continue;
                  default:
                    if (
                      !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                      (6 === i[0] || 2 === i[0])
                    ) {
                      a = 0;
                      continue;
                    }
                    if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                      a.label = i[1];
                      break;
                    }
                    if (6 === i[0] && a.label < o[1]) {
                      (a.label = o[1]), (o = i);
                      break;
                    }
                    if (o && a.label < o[2]) {
                      (a.label = o[2]), a.ops.push(i);
                      break;
                    }
                    o[2] && a.ops.pop(), a.trys.pop();
                    continue;
                }
                i = e.call(t, a);
              } catch (s) {
                (i = [6, s]), (r = 0);
              } finally {
                n = o = 0;
              }
            if (5 & i[0]) throw i[1];
            return { value: i[0] ? i[1] : void 0, done: !0 };
          })([i, s]);
        };
      }
    };

    var I = (() => {
      function t(t, e) {
        void 0 === t && (t = document.documentElement),
          void 0 === e && (e = R),
          (this.element = t),
          (this.schema = e),
          (this.dispatcher = new o(this)),
          (this.router = new x(this));
      }
      return (t.start = (e, n) => {
        const r = new t(e, n);
        return r.start(), r;
      }),
      (t.prototype.start = function () {
        return D(this, void 0, void 0, function () {
          return C(this, function (t) {
            switch (t.label) {
              case 0:
                return [
                  4,
                  new Promise(t => {
                    "loading" == document.readyState
                      ? document.addEventListener("DOMContentLoaded", t)
                      : t();
                  }),
                ];
              case 1:
                return (
                  t.sent(),
                  this.router.start(),
                  this.dispatcher.start(),
                  [2]
                );
            }
          });
        });
      }),
      (t.prototype.stop = function () {
        this.router.stop(), this.dispatcher.stop();
      }),
      (t.prototype.register = function (t, e) {
        this.load({ identifier: t, controllerConstructor: e });
      }),
      (t.prototype.load = function (t) {
        for (var e = this, n = [], r = 1; r < arguments.length; r++)
          n[r - 1] = arguments[r];
        const o = Array.isArray(t) ? t : [t].concat(n);
        o.forEach(t => {
          return e.router.loadDefinition(t);
        });
      }),
      (t.prototype.unload = function (t) {
        for (var e = this, n = [], r = 1; r < arguments.length; r++)
          n[r - 1] = arguments[r];
        const o = Array.isArray(t) ? t : [t].concat(n);
        o.forEach(t => {
          return e.router.unloadIdentifier(t);
        });
      }),
      Object.defineProperty(t.prototype, "controllers", {
        get() {
          return this.router.contexts.map(t => {
            return t.controller;
          });
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.getControllerForElementAndIdentifier = function (t, e) {
        const n = this.router.getContextForElementAndIdentifier(t, e);
        return n ? n.controller : null;
      }),
      (t.prototype.handleError = (t, e, n) => {
        console.error("%s\n\n%o\n\n%o", e, t, n);
      }),
      t;
    })();

    function N(t) {
      const e = t.prototype;
      (t => {
        const e = (t => {
          const e = [];
          for (; t; ) e.push(t), (t = Object.getPrototypeOf(t));
          return e;
        })(t);
        return Array.from(
          e.reduce((t, e) => {
            return (t => {
              const e = t.targets;
              return Array.isArray(e) ? e : [];
            })(e).forEach(e => {
              return t.add(e);
            }),
            t;
          }, new Set())
        );
      })(t).forEach(t => {
        let n, r, o;
        return (r = e),
        ((n = {})[t + "Target"] = {
          get() {
            const e = this.targets.find(t);
            if (e) return e;
            throw new Error(
              'Missing target element "' + this.identifier + "." + t + '"'
            );
          },
        }),
        (n[t + "Targets"] = {
          get() {
            return this.targets.findAll(t);
          },
        }),
        (n[
          "has" + (t => {
            return t.charAt(0).toUpperCase() + t.slice(1);
          })(t) +
            "Target"
        ] = {
          get() {
            return this.targets.has(t);
          },
        }),
        (o = n),
        void Object.keys(o).forEach(t => {
          if (!(t in r)) {
            const e = o[t];
            Object.defineProperty(r, t, e);
          }
        });
      });
    }
    var F = (() => {
      function t(t) {
        this.context = t;
      }
      return (t.bless = function () {
        N(this);
      }),
      Object.defineProperty(t.prototype, "application", {
        get() {
          return this.context.application;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "scope", {
        get() {
          return this.context.scope;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "element", {
        get() {
          return this.scope.element;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "identifier", {
        get() {
          return this.scope.identifier;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "targets", {
        get() {
          return this.scope.targets;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t.prototype, "data", {
        get() {
          return this.scope.data;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.initialize = () => {}),
      (t.prototype.connect = () => {}),
      (t.prototype.disconnect = () => {}),
      (t.targets = []),
      t
    ;
    })();
  },
  1: function (t, e, n) {
    t.exports = n(49);
  },
  10: function (t, e) {
    t.exports = t => {
      return t.webpackPolyfill ||
        ((t.deprecate = () => {}),
        (t.paths = []),
        t.children || (t.children = []),
        Object.defineProperty(t, "loaded", {
          enumerable: !0,
          get() {
            return t.l;
          },
        }),
        Object.defineProperty(t, "id", {
          enumerable: !0,
          get() {
            return t.i;
          },
        }),
        (t.webpackPolyfill = 1)),
      t
    ;
    };
  },
  105: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return v;
    });
    const r = n(0);
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    const i = (() => {
              function t(e, n) {
                if (
                  (((t, e) => {
                    if (!(t instanceof e))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t), this.NAMESPACE = "zoogleMedia", window.soundManager)
                ) {
                  (this.url = e.dataset.dest),
                    void 0 === this.url && (this.url = e.href);
                  const r = this;
                  window.soundManager.enabled
                    ? r.setup(e, n)
                    : document.addEventListener("soundManagerLoaded", () => {
                        r.setup(e, n);
                      });
                }
              }
              let e, n, r;
              return (e = t),
              (n = [
                {
                  key: "setup",
                  value(t, e) {
                    const n = this;
                    (this.sound = window.soundManager.createSound({
                      id: "playable".concat((window.zoogleMedia.mediaCount += 1)),
                      url: n.url,
                      type: "audio/mp3",
                      whileplaying() {
                        n.fireEvent("whileplaying");
                      },
                      onplay() {
                        window.zoogleMedia.setActive(e),
                          window.zoogleMedia.handleStats(t, "Play"),
                          n.fireEvent("play");
                      },
                      onresume() {
                        window.zoogleMedia.setActive(e), n.fireEvent("play");
                      },
                      onpause() {
                        n.fireEvent("pause");
                      },
                      onstop() {
                        n.fireEvent("pause"), n.sound.setPosition(0);
                      },
                      onfinish() {
                        "Previews" !== n.element.dataset.category &&
                          window.zoogleMedia.handleStats(t, "Finish"),
                          n.fireEvent("finish");
                      },
                    })),
                      (this.sound.parent = t),
                      (this.element = t),
                      (t.playable = this.sound),
                      (t.player = e);
                  },
                },
                {
                  key: "fireEvent",
                  value(t) {
                    const e = new CustomEvent(
                      "".concat(t, ".").concat(this.NAMESPACE),
                      {
                        bubbles: !0,
                        cancelable: !0,
                        detail: {
                          sound: this.sound,
                          el: this.element,
                          type: "".concat(t, ".media"),
                        },
                      }
                    );
                    this.element.dispatchEvent(e);
                  },
                },
              ]) && o(e.prototype, n),
              r && o(e, r),
              t
            ;
            })(),
          a = n(39),
          s = n(31),
          u = n(2);
    function c(t, e) {
      return (t => {
        if (Array.isArray(t)) return t;
      })(t) || ((t, e) => {
        if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(t)))
          return;
        const n = [];
        let r = !0;
        let o = !1;
        let i = void 0;
        try {
          for (
            var a, s = t[Symbol.iterator]();
            !(r = (a = s.next()).done) &&
            (n.push(a.value), !e || n.length !== e);
            r = !0
          );
        } catch (u) {
          (o = !0), (i = u);
        } finally {
          try {
            r || null == s.return || s.return();
          } finally {
            if (o) throw i;
          }
        }
        return n;
      })(t, e) || ((t, e) => {
        if (!t) return;
        if ("string" === typeof t) return l(t, e);
        let n = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === n && t.constructor && (n = t.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(t);
        if (
          "Arguments" === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return l(t, e);
      })(t, e) || (() => {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })();
    }
    function l(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function f(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function d(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function p(t, e) {
      return (p =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function h(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = m(t);
        if (e) {
          const o = m(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return y(this, n);
      };
    }
    function y(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function m(t) {
      return (m = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var v = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && p(t, e);
      })(l, t);
      let e;
      let n;
      let r;
      const o = h(l);
      function l() {
        let t;
        f(this, l);
        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
          n[r] = arguments[r];
        return (
          ((t = o.call.apply(o, [this].concat(n))).NAMESPACE = "zoogleMedia"),
          (t.MUSIC_FEATURE_INTERSECTION_CLASS = ".track-list li:last-child"),
          (t.MUSIC_FEATURE_OBSERVED_CLASS = "track-list-observed"),
          (t.PLAYLIST_OBSERVER_CONFIG = {
            rootMargin: "100px 0px 0px 0px",
            threshold: 0,
          }),
          (t.SESSION_KEY = "player"),
          (t.SOUND_EVENTS = [
            "whileplaying",
            "play",
            "pause",
            "finish",
            "loadMore",
          ]),
          (t.SOUND_EVENT_CALLBACKS = [
            t.onWhilePlaying,
            t.onPlay,
            t.onPause,
            t.onFinish,
            t.onLoadMore,
          ]),
          t
        );
      }
      return (e = l),
      (n = [
        {
          key: "connect",
          value() {
            Object(a.a)(),
              (this.wrapper = this.element.closest(".feature")),
              this.wrapper
                ? (this.featureId = this.wrapper.dataset.featureId)
                : ((this.featureId = 0),
                  (this.wrapper = this.element.closest(".pane")));
            for (let t = 0; t < this.SOUND_EVENTS.length; t += 1)
              this.element.addEventListener(
                "".concat(this.SOUND_EVENTS[t], ".").concat(this.NAMESPACE),
                this.SOUND_EVENT_CALLBACKS[t]
              );
            const e = this.element.querySelectorAll("a.play:not(.initialized)");
            e.length > 0 &&
              (this.loadSounds(e),
              this.updateTrackDisplay(e[0], !1),
              this.setupDeferredPlaylist()),
              (this.element.player = this),
              (this.element.pause = this.pause);
          },
        },
        {
          key: "disconnect",
          value() {
            for (let t = 0; t < this.SOUND_EVENTS.length; t += 1)
              this.element.removeEventListener(
                "".concat(this.SOUND_EVENTS[t], ".").concat(this.NAMESPACE),
                this.SOUND_EVENT_CALLBACKS[t]
              );
          },
        },
        {
          key: "onWhilePlaying",
          value(t) {
            const e = this.player, n = t.detail.sound, r = Math.ceil((n.position / n.durationEstimate) * 100);
            e.updateProgress(n.position, r), e.updatePosition(n);
          },
        },
        {
          key: "onPlay",
          value(t) {
            const e = this.player, n = t.detail.el;
            e.updateTrackDisplay(n), e.setUIState("playing");
          },
        },
        {
          key: "onPause",
          value(t) {
            const e = this.player, n = t.detail.el;
            e.updateTrackDisplay(n), e.setUIState("paused");
          },
        },
        {
          key: "onFinish",
          value(t) {
            const e = this.player;
            let n = e.nextTrack();
            const r = e.currentSound();
            t.preventDefault(),
              void 0 === n
                ? (e.setUIState("paused"),
                  e.updateProgress(0, 0),
                  r &&
                    (r.stop(),
                    r.setPosition(0),
                    e.element
                      .querySelector(".current")
                      .classList.remove("current")),
                  (n = e.element.querySelector("a.play:first-child")),
                  e.updateTrackDisplay(n, !1),
                  e.element.classList.remove("playing"))
                : window.zoogleMedia.toggle(n);
          },
        },
        {
          key: "onLoadMore",
          value() {
            this.player.loadMoreSounds();
          },
        },
        {
          key: "setUIState",
          value(t) {
            "playing" === t
              ? (this.element.classList.add("loading"),
                this.element.classList.add("playing"),
                this.element.classList.remove("paused"))
              : "paused" === t &&
                (this.element.classList.add("paused"),
                this.element.classList.remove("playing"));
          },
        },
        {
          key: "currentTrackLink",
          value(t) {
            let e = this.element.querySelector("a.play.current");
            return (
              null === e &&
                (!0 === t
                  ? (e = this.element.querySelector("a.play:first-child"))
                  : "true" === this.element.dataset.shuffle &&
                    (e = this.seekTrack())),
              e
            );
          },
        },
        {
          key: "seekTrack",
          value(t) {
            let e, n;
            if (
              ("undefined" === typeof t && (t = "prev"),
              "true" === this.element.dataset.shuffle)
            )
              e = (n = this.element.querySelectorAll(
                "li:not(.current) a.play"
              ))[Math.floor(Math.random() * n.length)];
            else {
              let r;
              let o;
              const i = this.currentTrackLink();
              i && (r = i.closest("li")),
                r &&
                  (o =
                    "next" === t
                      ? r.nextElementSibling
                      : r.previousElementSibling) &&
                  (e = o.querySelector("a.play")),
                void 0 === e &&
                  "true" === this.element.dataset.loopPlaylist &&
                  ((n = this.element.querySelectorAll("a.play")),
                  (e = "prev" === t ? n[n.length - 1] : c(n, 1)[0]));
            }
            const a = new CustomEvent("loadMore.".concat(this.NAMESPACE), {
              bubbles: !0,
              cancelable: !0,
              detail: { el: this.element, type: "loadMore.media" },
            });
            return this.element.dispatchEvent(a), e;
          },
        },
        {
          key: "previousTrack",
          value() {
            return this.seekTrack("prev");
          },
        },
        {
          key: "nextTrack",
          value() {
            return this.seekTrack("next");
          },
        },
        {
          key: "currentSound",
          value() {
            const t = this.element.querySelector("a.play.current");
            return null === t ? null : t.playable;
          },
        },
        {
          key: "seekTo",
          value(t) {
            const e = this.currentSound();
            if (null !== e) {
              let n = e.duration;
              e.bytesTotal > e.bytesLoaded && (n = e.durationEstimate),
                e.setPosition(t * n);
            }
          },
        },
        {
          key: "loadSounds",
          value(t) {
            for (let e = 0; e < t.length; e += 1)
              t[e].classList.add("initialized"), new i(t[e], this.element);
          },
        },
        {
          key: "updateArtistToPlayer",
          value(t) {
            this.element
              .querySelectorAll("[data-target=artist]")
              .forEach(e => {
                t
                  ? (e.classList.remove("empty"),
                    (e.innerHTML = "<span>".concat(
                      Object(u.b)(t),
                      "</span>"
                    )))
                  : (e.classList.add("empty"), (e.innerHTML = ""));
              });
          },
        },
        {
          key: "getTrackContainer",
          value(t) {
            return t.closest("li");
          },
        },
        {
          key: "copyActionsToPlayer",
          value(t, e, n) {
            const r = this.element.querySelector(n);
            if (r) {
              for (
                var o = this.getTrackContainer(t).querySelector(e);
                r.firstChild;

              )
                r.removeChild(r.firstChild);
              o && r.appendChild(o.cloneNode(!0));
            }
          },
        },
        {
          key: "copyBuyButtonToPlayer",
          value(t) {
            this.copyActionsToPlayer(
              t,
              ".track-action",
              ".player .actions .action"
            ),
              this.copyActionsToPlayer(
                t,
                ".track-action",
                ".swmp-header .action"
              );
            const e = this.element.querySelector(".swmp-header .actions");
            e &&
              e.classList.toggle(
                "hide",
                "" === e.innerText.replace(/\s/g, "")
              );
          },
        },
        {
          key: "copyArtworkToPlayer",
          value(t) {
            const e = this.element, n = e.querySelector("[data-target=album-artwork]");
            if (n) {
              const r = e.querySelector(
                  "[data-target=album-artwork-background]"
                );

              let o =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

              let i = !1;
              const a = this.getTrackContainer(t).dataset.albumImageUrl;
              if (a && "" !== a) (i = !0), (o = a), n.setAttribute("src", a);
              else {
                const s = document.querySelector(".page-photo-background");
                s &&
                  (o = getComputedStyle(s).backgroundImage.replace(
                    /url\("(.*)"\)/,
                    "$1"
                  ));
              }
              r.setAttribute(
                "style",
                "background-image: url(".concat(o, ")")
              ),
                e
                  .querySelector(".album-artwork")
                  .classList.toggle("placeholder", !i);
            }
          },
        },
        {
          key: "updateProgress",
          value(t, e) {
            const n = Object(u.f)(t),
                  r = this.element.querySelectorAll(
                    ".swmp-header .progress .cur, .player .progress .cur, .player .time-actions-wrapper .cur, .current .progress .cur"
                  ),
                  o = this.element.querySelectorAll(
                    ".swmp-header .progress .position, .player .progress .position, .current .progress .position"
                  );
            this.element.classList.remove("loading"),
              r.forEach(t => {
                t.innerHTML = n;
              }),
              o.forEach(t => {
                t.style.width = "".concat(Math.min(100, e), "%");
              });
          },
        },
        {
          key: "updateTrackDisplay",
          value(t) {
            const e = this, n = this.element, r = t.dataset;
            r.title || (r.title = t.innerHTML),
              null !== n.querySelector(".player") &&
                (n
                  .querySelectorAll("[data-target=player-title]")
                  .forEach(t => {
                    (t.innerHTML = r.title), e.applyMarquee(t);
                  }),
                n
                  .querySelectorAll(
                    ".player .progress .duration, .player .time-actions-wrapper .duration, .swmp-header .progress .duration"
                  )
                  .forEach(t => {
                    t.innerHTML = r.duration;
                  }),
                n
                  .querySelectorAll(
                    ".progress .cur, .time-actions-wrapper .cur"
                  )
                  .forEach(t => {
                    t.innerHTML = "0:00";
                  }),
                this.updateArtistToPlayer(r.artist),
                this.copyBuyButtonToPlayer(t),
                this.copyArtworkToPlayer(t));
          },
        },
        {
          key: "applyMarquee",
          value(t) {
            (window.jQuery && !0 === window.jQuery.fx.off) ||
              !t.classList.contains("marquee") ||
              Object(s.a)(t);
          },
        },
        {
          key: "resizeApplyMarquee",
          value() {
            this.element
              .querySelectorAll("[data-target=player-title]")
              .forEach(t => {
                Object(s.a)(t);
              });
          },
        },
        {
          key: "setupDeferredPlaylist",
          value() {
            const t = this, e = this.wrapper.querySelector(".track-list").dataset.loadMore;
            if (!0 === e || "true" === e) {
              const n = this.element.querySelectorAll(
                ""
                  .concat(this.MUSIC_FEATURE_INTERSECTION_CLASS, ":not(.")
                  .concat(this.MUSIC_FEATURE_OBSERVED_CLASS, ")")
              );
              if (
                "undefined" === typeof IntersectionObserver ||
                !0 === IntersectionObserver.polyfill
              )
                this.loadMoreSounds(!0);
              else {
                this.observer = new IntersectionObserver(e => {
                  return t.onPlaylistIntersection(e);
                }, this.PLAYLIST_OBSERVER_CONFIG);
                for (let r = 0; r < n.length; r += 1)
                  n[r].classList.add(this.MUSIC_FEATURE_OBSERVED_CLASS),
                    this.observer.observe(n[r]);
              }
            }
          },
        },
        {
          key: "onPlaylistIntersection",
          value(t) {
            for (let e = 0; e < t.length; e += 1) {
              const n = t[e];
              n.isIntersecting &&
                (this.observer.unobserve(n.target),
                n.target.classList.remove(this.MUSIC_FEATURE_OBSERVED_CLASS),
                this.loadMoreSounds());
            }
          },
        },
        {
          key: "loadMoreSounds",
          value(t) {
            const e = this.wrapper.querySelector(".track-list").dataset
              .loadMore;
            if (void 0 !== e) {
              const n = this.wrapper.querySelector(".track-list").dataset
                  .offset;

              const r = this.wrapper.querySelector("[data-album-id]").dataset
                .albumId;

              let o = "/go/albums/".concat(r, "/tracks?offset=").concat(n);
              void 0 !== this.featureId &&
                (o = ""
                  .concat(o, "&music_feature_id=")
                  .concat(this.featureId));
              const i = this.element.querySelector(".track-list"), a = new XMLHttpRequest();
              if (!0 === e || "true" === e) {
                !0 === t && (o += "&amount=1000");
                const s = this;
                a.open("GET", o, !0),
                  (a.onload = () => {
                    if (a.status >= 200 && a.status < 400) {
                      const t = a.responseText, e = Object(u.g)(t);
                      (i.dataset.offset = e.dataset.offset),
                        (i.dataset.loadMore = e.dataset.loadMore);
                      for (
                        let n = e.querySelectorAll("li"), r = 0;
                        r < n.length;
                        r += 1
                      )
                        i.appendChild(n[r]);
                      document.dispatchEvent(new CustomEvent("pageLoad")),
                        s.loadSounds(
                          i.querySelectorAll("a.play:not(.initialized)")
                        ),
                        s.setupDeferredPlaylist();
                    }
                  }),
                  a.send();
              }
            }
          },
        },
        {
          key: "pause",
          value() {
            const t = this.player, e = t.currentSound();
            e && e.pause(), t.setUIState("paused");
          },
        },
        {
          key: "updatePosition",
          value(t) {
            sessionStorage.setItem(this.SESSION_KEY, this.featureId),
              sessionStorage.setItem(
                "".concat(this.SESSION_KEY, "_position"),
                t.position
              ),
              sessionStorage.setItem(
                "".concat(this.SESSION_KEY, "_url"),
                t.url
              );
          },
        },
      ]) && d(e.prototype, n),
      r && d(e, r),
      l;
    })(r.b);
  },
  108: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return i;
    });
    const r = n(16);
    const o = new WeakMap();

    var i = Object(r.c)(t => {
      return e => {
        if (
          !(e instanceof r.a) ||
          e instanceof r.b ||
          "style" !== e.committer.name ||
          e.committer.parts.length > 1
        )
          throw new Error(
            "The `styleMap` directive must be used in the style attribute and must be the only part in the attribute."
          );
        const n = e.committer;
        const i = n.element.style;
        let a = o.get(e);
        for (const s in (void 0 === a &&
          ((i.cssText = n.strings.join(" ")), o.set(e, (a = new Set()))),
        a.forEach(e => {
          e in t ||
            (a.delete(e),
            !e.includes("-") ? (i[e] = null) : i.removeProperty(e));
        }),
        t))
          a.add(s), !s.includes("-") ? (i[s] = t[s]) : i.setProperty(s, t[s]);
      };
    });
  },
  11: function (t, e, n) {
    "use strict";
    function r(t) {
      return (r =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function o() {
      if (!(this instanceof o)) return new o();
      (this.size = 0),
        (this.uid = 0),
        (this.selectors = []),
        (this.selectorObjects = {}),
        (this.indexes = Object.create(this.indexes)),
        (this.activeIndexes = []);
    }
    n.d(e, "a", () => {
      return A;
    }),
      n.d(e, "b", () => {
        return k;
      });
    const i = window.document.documentElement,
          a =
            i.matches ||
            i.webkitMatchesSelector ||
            i.mozMatchesSelector ||
            i.oMatchesSelector ||
            i.msMatchesSelector;
    (o.prototype.matchesSelector = (t, e) => {
      return a.call(t, e);
    }),
      (o.prototype.querySelectorAll = (t, e) => {
        return e.querySelectorAll(t);
      }),
      (o.prototype.indexes = []);
    const s = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    o.prototype.indexes.push({
      name: "ID",
      selector(t) {
        let e;
        if ((e = t.match(s))) return e[0].slice(1);
      },
      element(t) {
        if (t.id) return [t.id];
      },
    });
    const u = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    o.prototype.indexes.push({
      name: "CLASS",
      selector(t) {
        let e;
        if ((e = t.match(u))) return e[0].slice(1);
      },
      element(t) {
        const e = t.className;
        if (e) {
          if ("string" === typeof e) return e.split(/\s/);
          if ("object" === r(e) && "baseVal" in e) return e.baseVal.split(/\s/);
        }
      },
    });
    let c;
    const l = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
    o.prototype.indexes.push({
      name: "TAG",
      selector(t) {
        let e;
        if ((e = t.match(l))) return e[0].toUpperCase();
      },
      element(t) {
        return [t.nodeName.toUpperCase()];
      },
    }),
      (o.prototype.indexes.default = {
        name: "UNIVERSAL",
        selector() {
          return !0;
        },
        element() {
          return [!0];
        },
      }),
      (c =
        "function" === typeof window.Map ? window.Map : (() => {
              function t() {
                this.map = {};
              }
              return (
                (t.prototype.get = function (t) {
                  return this.map[t + " "];
                }),
                (t.prototype.set = function (t, e) {
                  this.map[t + " "] = e;
                }),
                t
              );
            })());
    const f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
    function d(t, e) {
      let n;
      let r;
      let o;
      let i;
      let a;
      let s;
      const u = (t = t.slice(0).concat(t.default)).length;
      let c = e;
      const l = [];
      do {
        if ((f.exec(""), (o = f.exec(c)) && ((c = o[3]), o[2] || !c)))
          for (n = 0; n < u; n++)
            if ((a = (s = t[n]).selector(o[1]))) {
              for (r = l.length, i = !1; r--; )
                if (l[r].index === s && l[r].key === a) {
                  i = !0;
                  break;
                }
              i || l.push({ index: s, key: a });
              break;
            }
      } while (o);
      return l;
    }
    function p(t, e) {
      let n, r, o;
      for (n = 0, r = t.length; n < r; n++)
        if (((o = t[n]), e.isPrototypeOf(o))) return o;
    }
    function h(t, e) {
      return t.id - e.id;
    }
    (o.prototype.logDefaultIndexUsed = () => {}),
      (o.prototype.add = function (t, e) {
      let n;
      let r;
      let o;
      let i;
      let a;
      let s;
      let u;
      let l;
      const f = this.activeIndexes;
      const h = this.selectors;
      const y = this.selectorObjects;
      if ("string" === typeof t) {
        for (
          y[(n = { id: this.uid++, selector: t, data: e }).id] = n,
            u = d(this.indexes, t),
            r = 0;
          r < u.length;
          r++
        )
          (i = (l = u[r]).key),
            (a = p(f, (o = l.index))) ||
              (((a = Object.create(o)).map = new c()), f.push(a)),
            o === this.indexes.default && this.logDefaultIndexUsed(n),
            (s = a.map.get(i)) || ((s = []), a.map.set(i, s)),
            s.push(n);
        this.size++, h.push(t);
      }
    }),
      (o.prototype.remove = function (t, e) {
        if ("string" === typeof t) {
          let n;
          let r;
          let o;
          let i;
          let a;
          let s;
          let u;
          let c;
          const l = this.activeIndexes;
          const f = (this.selectors = []);
          const p = this.selectorObjects;
          const h = {};
          const y = 1 === arguments.length;
          for (n = d(this.indexes, t), o = 0; o < n.length; o++)
            for (r = n[o], i = l.length; i--; )
              if (((s = l[i]), r.index.isPrototypeOf(s))) {
                if ((u = s.map.get(r.key)))
                  for (a = u.length; a--; )
                    (c = u[a]).selector !== t ||
                      (!y && c.data !== e) ||
                      (u.splice(a, 1), (h[c.id] = !0));
                break;
              }
          for (o in h) delete p[o], this.size--;
          for (o in p) f.push(p[o].selector);
        }
      }),
      (o.prototype.queryAll = function (t) {
      if (!this.selectors.length) return [];
      let e;
      let n;
      let r;
      let o;
      let i;
      let a;
      let s;
      let u;
      const c = {};
      const l = [];
      const f = this.querySelectorAll(this.selectors.join(", "), t);
      for (e = 0, r = f.length; e < r; e++)
        for (i = f[e], n = 0, o = (a = this.matches(i)).length; n < o; n++)
          c[(u = a[n]).id]
            ? (s = c[u.id])
            : ((s = {
                id: u.id,
                selector: u.selector,
                data: u.data,
                elements: [],
              }),
              (c[u.id] = s),
              l.push(s)),
            s.elements.push(i);
      return l.sort(h);
    }),
      (o.prototype.matches = function (t) {
      if (!t) return [];
      let e;
      let n;
      let r;
      let o;
      let i;
      let a;
      let s;
      let u;
      let c;
      let l;
      let f;
      const d = this.activeIndexes;
      const p = {};
      const y = [];
      for (e = 0, o = d.length; e < o; e++)
        if ((u = (s = d[e]).element(t)))
          for (n = 0, i = u.length; n < i; n++)
            if ((c = s.map.get(u[n])))
              for (r = 0, a = c.length; r < a; r++)
                !p[(f = (l = c[r]).id)] &&
                  this.matchesSelector(t, l.selector) &&
                  ((p[f] = !0), y.push(l));
      return y.sort(h);
    });
    const y = {}, m = {}, v = new WeakMap(), g = new WeakMap(), b = new WeakMap(), w = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function _(t, e, n) {
      const r = t[e];
      return (
        (t[e] = function () {
          return n.apply(t, arguments), r.apply(t, arguments);
        }),
        t
      );
    }
    function O() {
      v.set(this, !0);
    }
    function S() {
      v.set(this, !0), g.set(this, !0);
    }
    function P() {
      return b.get(this) || null;
    }
    function E(t, e) {
      w &&
        Object.defineProperty(t, "currentTarget", {
          configurable: !0,
          enumerable: !0,
          get: e || w.get,
        });
    }
    function T(t) {
      if ((t => {
        try {
          return t.eventPhase, !0;
        } catch (e) {
          return !1;
        }
      })(t)) {
        var e = (1 === t.eventPhase ? m : y)[t.type];
        if (e) {
          const n = ((t, e, n) => {
            const r = [];
            let o = e;
            do {
              if (1 !== o.nodeType) break;
              const i = t.matches(o);
              if (i.length) {
                const a = { node: o, observers: i };
                n ? r.unshift(a) : r.push(a);
              }
            } while ((o = o.parentElement));
            return r;
          })(e, t.target, 1 === t.eventPhase);
          if (n.length) {
            _(t, "stopPropagation", O),
              _(t, "stopImmediatePropagation", S),
              E(t, P);
            for (let r = 0, o = n.length; r < o && !v.get(t); r++) {
              const i = n[r];
              b.set(t, i.node);
              for (let a = 0, s = i.observers.length; a < s && !g.get(t); a++)
                i.observers[a].data.call(i.node, t);
            }
            b.delete(t), E(t);
          }
        }
      }
    }
    function k(t, e, n) {
      const r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};

      const i = !!r.capture;
      const a = i ? m : y;
      let s = a[t];
      s || ((s = new o()), (a[t] = s), document.addEventListener(t, T, i)),
        s.add(e, n);
    }
    function A(t, e, n) {
      const r =
                arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            o = !!r.capture,
            i = o ? m : y,
            a = i[t];
      a &&
        (a.remove(e, n),
        a.size || (delete i[t], document.removeEventListener(t, T, o)));
    }
  },
  13: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return S;
    }),
      n.d(e, "b", () => {
        return P;
      }),
      n.d(e, "e", () => {
        return E;
      }),
      n.d(e, "c", () => {
        return T;
      }),
      n.d(e, "f", () => {
        return k;
      }),
      n.d(e, "g", () => {
        return A;
      }),
      n.d(e, "d", () => {
        return L;
      });
    const r = n(41), o = n(23), i = n(15), a = n(55), s = n(47), u = n(9);
    function c(t, e, n) {
      return (c =
        "undefined" !== typeof Reflect && Reflect.get
          ? Reflect.get
          : (t, e, n) => {
              const r = ((t, e) => {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = h(t));

                );
                return t;
              })(t, e);
              if (r) {
                const o = Object.getOwnPropertyDescriptor(r, e);
                return o.get ? o.get.call(n) : o.value;
              }
            })(t, e, n || t);
    }
    function l(t, e) {
      if ("function" !== typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        e && f(t, e);
    }
    function f(t, e) {
      return (f =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function d(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = h(t);
        if (e) {
          const o = h(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return p(this, n);
      };
    }
    function p(t, e) {
      return !e || ("object" !== w(e) && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function h(t) {
      return (h = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function y(t, e) {
      let n;
      if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
        if (
          Array.isArray(t) ||
          (n = ((t, e) => {
            if (!t) return;
            if ("string" === typeof t) return m(t, e);
            let n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return m(t, e);
          })(t)) ||
          (e && t && "number" === typeof t.length)
        ) {
          n && (t = n);
          let r = 0;
          const o = () => {};
          return {
            s: o,
            n() {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
            },
            e(t) {
              throw t;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      let i, a = !0, s = !1;
      return {
        s() {
          n = t[Symbol.iterator]();
        },
        n() {
          const t = n.next();
          return (a = t.done), t;
        },
        e(t) {
          (s = !0), (i = t);
        },
        f() {
          try {
            a || null == n.return || n.return();
          } finally {
            if (s) throw i;
          }
        },
      };
    }
    function m(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function v(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function g(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function b(t, e, n) {
      return e && g(t.prototype, e), n && g(t, n), t;
    }
    function w(t) {
      return (w =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }

    const _ = t => {
        return null === t || !("object" === w(t) || "function" === typeof t);
      };

    const O = t => {
      return Array.isArray(t) || !(!t || !t[Symbol.iterator]);
    };

    var S = (() => {
      function t(e, n, r) {
        v(this, t),
          (this.dirty = !0),
          (this.element = e),
          (this.name = n),
          (this.strings = r),
          (this.parts = []);
        for (let o = 0; o < r.length - 1; o++)
          this.parts[o] = this._createPart();
      }
      return b(t, [
        {
          key: "_createPart",
          value() {
            return new P(this);
          },
        },
        {
          key: "_getValue",
          value() {
            const t = this.strings, e = t.length - 1, n = this.parts;
            if (1 === e && "" === t[0] && "" === t[1]) {
              const r = n[0].value;
              if ("symbol" === w(r)) return String(r);
              if ("string" === typeof r || !O(r)) return r;
            }
            for (var o = "", i = 0; i < e; i++) {
              o += t[i];
              const a = n[i];
              if (void 0 !== a) {
                const s = a.value;
                if (_(s) || !O(s))
                  o += "string" === typeof s ? s : String(s);
                else {
                  let u;
                  const c = y(s);
                  try {
                    for (c.s(); !(u = c.n()).done; ) {
                      const l = u.value;
                      o += "string" === typeof l ? l : String(l);
                    }
                  } catch (f) {
                    c.e(f);
                  } finally {
                    c.f();
                  }
                }
              }
            }
            return (o += t[e]);
          },
        },
        {
          key: "commit",
          value() {
            this.dirty &&
              ((this.dirty = !1),
              this.element.setAttribute(this.name, this._getValue()));
          },
        },
      ]),
      t
    ;
    })();

    var P = (() => {
      function t(e) {
        v(this, t), (this.value = void 0), (this.committer = e);
      }
      return b(t, [
        {
          key: "setValue",
          value(t) {
            t === i.a ||
              (_(t) && t === this.value) ||
              ((this.value = t),
              Object(r.b)(t) || (this.committer.dirty = !0));
          },
        },
        {
          key: "commit",
          value() {
            for (; Object(r.b)(this.value); ) {
              const t = this.value;
              (this.value = i.a), t(this);
            }
            this.value !== i.a && this.committer.commit();
          },
        },
      ]),
      t
    ;
    })();

    var E = (() => {
      function t(e) {
        v(this, t),
          (this.value = void 0),
          (this.__pendingValue = void 0),
          (this.options = e);
      }
      return b(t, [
        {
          key: "appendInto",
          value(t) {
            (this.startNode = t.appendChild(Object(u.c)())),
              (this.endNode = t.appendChild(Object(u.c)()));
          },
        },
        {
          key: "insertAfterNode",
          value(t) {
            (this.startNode = t), (this.endNode = t.nextSibling);
          },
        },
        {
          key: "appendIntoPart",
          value(t) {
            t.__insert((this.startNode = Object(u.c)())),
              t.__insert((this.endNode = Object(u.c)()));
          },
        },
        {
          key: "insertAfterPart",
          value(t) {
            t.__insert((this.startNode = Object(u.c)())),
              (this.endNode = t.endNode),
              (t.endNode = this.startNode);
          },
        },
        {
          key: "setValue",
          value(t) {
            this.__pendingValue = t;
          },
        },
        {
          key: "commit",
          value() {
            if (null !== this.startNode.parentNode) {
              for (; Object(r.b)(this.__pendingValue); ) {
                const t = this.__pendingValue;
                (this.__pendingValue = i.a), t(this);
              }
              const e = this.__pendingValue;
              e !== i.a &&
                (_(e)
                  ? e !== this.value && this.__commitText(e)
                  : e instanceof s.b
                  ? this.__commitTemplateResult(e)
                  : e instanceof Node
                  ? this.__commitNode(e)
                  : O(e)
                  ? this.__commitIterable(e)
                  : e === i.b
                  ? ((this.value = i.b), this.clear())
                  : this.__commitText(e));
            }
          },
        },
        {
          key: "__insert",
          value(t) {
            this.endNode.parentNode.insertBefore(t, this.endNode);
          },
        },
        {
          key: "__commitNode",
          value(t) {
            this.value !== t &&
              (this.clear(), this.__insert(t), (this.value = t));
          },
        },
        {
          key: "__commitText",
          value(t) {
            const e = this.startNode.nextSibling,
                  n =
                    "string" === typeof (t = null == t ? "" : t)
                      ? t
                      : String(t);
            e === this.endNode.previousSibling && 3 === e.nodeType
              ? (e.data = n)
              : this.__commitNode(document.createTextNode(n)),
              (this.value = t);
          },
        },
        {
          key: "__commitTemplateResult",
          value(t) {
            const e = this.options.templateFactory(t);
            if (this.value instanceof a.a && this.value.template === e)
              this.value.update(t.values);
            else {
              const n = new a.a(e, t.processor, this.options), r = n._clone();
              n.update(t.values), this.__commitNode(r), (this.value = n);
            }
          },
        },
        {
          key: "__commitIterable",
          value(e) {
            Array.isArray(this.value) || ((this.value = []), this.clear());
            let n;
            let r;
            const o = this.value;
            let i = 0;
            const a = y(e);
            try {
              for (a.s(); !(r = a.n()).done; ) {
                const s = r.value;
                void 0 === (n = o[i]) &&
                  ((n = new t(this.options)),
                  o.push(n),
                  0 === i
                    ? n.appendIntoPart(this)
                    : n.insertAfterPart(o[i - 1])),
                  n.setValue(s),
                  n.commit(),
                  i++;
              }
            } catch (u) {
              a.e(u);
            } finally {
              a.f();
            }
            i < o.length && ((o.length = i), this.clear(n && n.endNode));
          },
        },
        {
          key: "clear",
          value() {
            const t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : this.startNode;
            Object(o.b)(
              this.startNode.parentNode,
              t.nextSibling,
              this.endNode
            );
          },
        },
      ]),
      t
    ;
    })();

    var T = (() => {
      function t(e, n, r) {
        if (
          (v(this, t),
          (this.value = void 0),
          (this.__pendingValue = void 0),
          2 !== r.length || "" !== r[0] || "" !== r[1])
        )
          throw new Error(
            "Boolean attributes can only contain a single expression"
          );
        (this.element = e), (this.name = n), (this.strings = r);
      }
      return b(t, [
        {
          key: "setValue",
          value(t) {
            this.__pendingValue = t;
          },
        },
        {
          key: "commit",
          value() {
            for (; Object(r.b)(this.__pendingValue); ) {
              const t = this.__pendingValue;
              (this.__pendingValue = i.a), t(this);
            }
            if (this.__pendingValue !== i.a) {
              const e = !!this.__pendingValue;
              this.value !== e &&
                (e
                  ? this.element.setAttribute(this.name, "")
                  : this.element.removeAttribute(this.name),
                (this.value = e)),
                (this.__pendingValue = i.a);
            }
          },
        },
      ]),
      t
    ;
    })();

    var k = (t => {
      l(n, t);
      const e = d(n);
      function n(t, r, o) {
        let i;
        return (
          v(this, n),
          ((i = e.call(this, t, r, o)).single =
            2 === o.length && "" === o[0] && "" === o[1]),
          i
        );
      }
      return (
        b(n, [
          {
            key: "_createPart",
            value() {
              return new A(this);
            },
          },
          {
            key: "_getValue",
            value() {
              return this.single
                ? this.parts[0].value
                : c(h(n.prototype), "_getValue", this).call(this);
            },
          },
          {
            key: "commit",
            value() {
              this.dirty &&
                ((this.dirty = !1),
                (this.element[this.name] = this._getValue()));
            },
          },
        ]),
        n
      );
    })(S);

    var A = (t => {
      l(n, t);
      const e = d(n);
      function n() {
        return v(this, n), e.apply(this, arguments);
      }
      return n;
    })(P);

    let j = !1;
    !(() => {
      try {
        const t = {
          get capture() {
            return (j = !0), !1;
          },
        };
        window.addEventListener("test", t, t),
          window.removeEventListener("test", t, t);
      } catch (e) {}
    })();

    var L = (() => {
        function t(e, n, r) {
          const o = this;
          v(this, t),
            (this.value = void 0),
            (this.__pendingValue = void 0),
            (this.element = e),
            (this.eventName = n),
            (this.eventContext = r),
            (this.__boundHandleEvent = t => {
              return o.handleEvent(t);
            });
        }
        return b(t, [
          {
            key: "setValue",
            value(t) {
              this.__pendingValue = t;
            },
          },
          {
            key: "commit",
            value() {
              for (; Object(r.b)(this.__pendingValue); ) {
                const t = this.__pendingValue;
                (this.__pendingValue = i.a), t(this);
              }
              if (this.__pendingValue !== i.a) {
                const e = this.__pendingValue,
                      n = this.value,
                      o =
                        null == e ||
                        (null != n &&
                          (e.capture !== n.capture ||
                            e.once !== n.once ||
                            e.passive !== n.passive)),
                      a = null != e && (null == n || o);
                o &&
                  this.element.removeEventListener(
                    this.eventName,
                    this.__boundHandleEvent,
                    this.__options
                  ),
                  a &&
                    ((this.__options = M(e)),
                    this.element.addEventListener(
                      this.eventName,
                      this.__boundHandleEvent,
                      this.__options
                    )),
                  (this.value = e),
                  (this.__pendingValue = i.a);
              }
            },
          },
          {
            key: "handleEvent",
            value(t) {
              "function" === typeof this.value
                ? this.value.call(this.eventContext || this.element, t)
                : this.value.handleEvent(t);
            },
          },
        ]),
        t
      ;
      })();

    const M = t => {
      return (
        t &&
        (j
          ? { capture: t.capture, passive: t.passive, once: t.once }
          : t.capture)
      );
    };
  },
  131: function (t, e, n) {
    "use strict";
    const r = n(11);
    Object(r.b)("click", ".toggle-edit", t => {
      const e = t.target.dataset.toggleHide;
      const n = t.target.dataset.toggleShow;
      let r = 0;
      t.preventDefault();
      let o = document.querySelectorAll(e);
      for (r = 0; r < o.length; r += 1)
        o[r].classList.add("hide", "visibility", "-hidden");
      for (o = document.querySelectorAll(n), r = 0; r < o.length; r += 1)
        o[r].classList.remove("hide", "-hidden");
    }),
      Object(r.b)("click", ".toggle-expanded", t => {
        const e = t.currentTarget.dataset.target;
        const n = t.currentTarget.dataset.class;
        let r = 0;
        t.preventDefault();
        const o = document.querySelectorAll(e);
        for (r = 0; r < o.length; r += 1) o[r].classList.toggle(n);
      });
  },
  15: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return r;
    }),
      n.d(e, "b", () => {
        return o;
      });
    var r = {},
      o = {};
  },
  16: function (t, e, n) {
    "use strict";
    n.d(e, "c", () => {
      return s.a;
    }),
      n.d(e, "a", () => {
        return r.b;
      }),
      n.d(e, "b", () => {
        return r.g;
      }),
      n.d(e, "d", () => {
        return u;
      });
    var r = n(13);
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }

    const i = new ((() => {
        function t() {
          !((t, e) => {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
        }
        let e, n, i;
        return (e = t),
        (n = [
          {
            key: "handleAttributeExpressions",
            value(t, e, n, o) {
              const i = e[0];
              return "." === i
                ? new r.f(t, e.slice(1), n).parts
                : "@" === i
                ? [new r.d(t, e.slice(1), o.eventContext)]
                : "?" === i
                ? [new r.c(t, e.slice(1), n)]
                : new r.a(t, e, n).parts;
            },
          },
          {
            key: "handleTextExpression",
            value(t) {
              return new r.e(t);
            },
          },
        ]) && o(e.prototype, n),
        i && o(e, i),
        t
      ;
      })())();

    const a = n(47);
    var s = n(41);
    n(23), n(15), n(40), n(38), n(55), n(9);
    "undefined" !== typeof window &&
      (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.3.0");
    var u = function (t) {
      for (
        var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
        r < e;
        r++
      )
        n[r - 1] = arguments[r];
      return new a.b(t, n, "html", i);
    };
  },
  19: function (t, e, n) {
    "use strict";
    n.d(e, "c", () => {
      return N;
    }),
      n.d(e, "d", () => {
        return f.d;
      }),
      n.d(e, "b", () => {
        return z;
      }),
      n.d(e, "a", () => {
        return tt;
      });
    const r = n(23), o = n(9);
    function i(t, e) {
      for (
        var n = t.element.content,
          r = t.parts,
          o = document.createTreeWalker(n, 133, null, !1),
          i = s(r),
          a = r[i],
          u = -1,
          c = 0,
          l = [],
          f = null;
        o.nextNode();

      ) {
        u++;
        const d = o.currentNode;
        for (
          d.previousSibling === f && (f = null),
            e.has(d) && (l.push(d), null === f && (f = d)),
            null !== f && c++;
          void 0 !== a && a.index === u;

        )
          (a.index = null !== f ? -1 : a.index - c), (a = r[(i = s(r, i))]);
      }
      l.forEach(t => {
        return t.parentNode.removeChild(t);
      });
    }

    const a = t => {
        for (
          var e = 11 === t.nodeType ? 0 : 1,
            n = document.createTreeWalker(t, 133, null, !1);
          n.nextNode();

        )
          e++;
        return e;
      };

    var s = function (t) {
      for (
        let e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : -1,
            n = e + 1;
        n < t.length;
        n++
      ) {
        const r = t[n];
        if (Object(o.d)(r)) return n;
      }
      return -1;
    };

    const u = n(40);
    const c = n(38);
    const l = n(55);
    var f = n(16);
    function d(t) {
      return (d =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }

    const p = (t, e) => {
        return "".concat(t, "--").concat(e);
      };

    let h = !0;
    "undefined" === typeof window.ShadyCSS
      ? (h = !1)
      : "undefined" === typeof window.ShadyCSS.prepareTemplateDom &&
        (console.warn(
          "Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."
        ),
        (h = !1));
    const y = t => {
              return e => {
                const n = p(e.type, t);
                let r = c.a.get(n);
                void 0 === r &&
                  ((r = { stringsArray: new WeakMap(), keyString: new Map() }),
                  c.a.set(n, r));
                let i = r.stringsArray.get(e.strings);
                if (void 0 !== i) return i;
                const a = e.strings.join(o.f);
                if (void 0 === (i = r.keyString.get(a))) {
                  const s = e.getTemplateElement();
                  h && window.ShadyCSS.prepareTemplateDom(s, t),
                    (i = new o.a(e, s)),
                    r.keyString.set(a, i);
                }
                return r.stringsArray.set(e.strings, i), i;
              };
            },
          m = ["html", "svg"],
          v = new Set(),
          g = (t, e, n) => {
            v.add(t);
            const r = n ? n.element : document.createElement("template"), o = e.querySelectorAll("style"), u = o.length;
            if (0 !== u) {
              for (var l = document.createElement("style"), f = 0; f < u; f++) {
                const d = o[f];
                d.parentNode.removeChild(d), (l.textContent += d.textContent);
              }
              !(t => {
                m.forEach(e => {
                  const n = c.a.get(p(e, t));
                  void 0 !== n &&
                    n.keyString.forEach(t => {
                      const e = t.element.content, n = new Set();
                      Array.from(e.querySelectorAll("style")).forEach(t => {
                        n.add(t);
                      }),
                        i(t, n);
                    });
                });
              })(t);
              const h = r.content;
              n
                ? (function (t, e) {
                    const n =
                              arguments.length > 2 && void 0 !== arguments[2]
                                ? arguments[2]
                                : null,
                          r = t.element.content,
                          o = t.parts;
                    if (null !== n && void 0 !== n)
                      for (
                        let i = document.createTreeWalker(r, 133, null, !1), u = s(o), c = 0, l = -1;
                        i.nextNode();

                      ) {
                        for (
                          l++,
                            i.currentNode === n &&
                              ((c = a(e)), n.parentNode.insertBefore(e, n));
                          -1 !== u && o[u].index === l;

                        ) {
                          if (c > 0) {
                            for (; -1 !== u; ) (o[u].index += c), (u = s(o, u));
                            return;
                          }
                          u = s(o, u);
                        }
                      }
                    else r.appendChild(e);
                  })(n, l, h.firstChild)
                : h.insertBefore(l, h.firstChild),
                window.ShadyCSS.prepareTemplateStyles(r, t);
              const y = h.querySelector("style");
              if (window.ShadyCSS.nativeShadow && null !== y)
                e.insertBefore(y.cloneNode(!0), e.firstChild);
              else if (n) {
                h.insertBefore(l, h.firstChild);
                const g = new Set();
                g.add(l), i(n, g);
              }
            } else window.ShadyCSS.prepareTemplateStyles(r, t);
          },
          b = n(1),
          w = n.n(b);
    function _(t) {
      return (t => {
        if (Array.isArray(t)) return S(t);
      })(t) || (t => {
        if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t))
          return Array.from(t);
      })(t) ||
      O(t) || (() => {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })();
    }
    function O(t, e) {
      if (t) {
        if ("string" === typeof t) return S(t, e);
        let n = Object.prototype.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? S(t, e)
            : void 0
        );
      }
    }
    function S(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function P(t) {
      return (P =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function E(t, e, n, r, o, i, a) {
      try {
        var s = t[i](a),
          u = s.value;
      } catch (c) {
        return void n(c);
      }
      s.done ? e(u) : Promise.resolve(u).then(r, o);
    }
    function T(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function k(t, e) {
      return !e || ("object" !== P(e) && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function A(t) {
      const e = "function" === typeof Map ? new Map() : void 0;
      return (A = t => {
        if (
          null === t ||
          ((n = t), !Function.toString.call(n).includes("[native code]"))
        )
          return t;
        var n;
        if ("function" !== typeof t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        if ("undefined" !== typeof e) {
          if (e.has(t)) return e.get(t);
          e.set(t, r);
        }
        function r() {
          return j(t, arguments, x(this).constructor);
        }
        return (
          (r.prototype = Object.create(t.prototype, {
            constructor: {
              value: r,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          M(r, t)
        );
      })(t);
    }
    function j(t, e, n) {
      return (j = L()
        ? Reflect.construct
        : (t, e, n) => {
            const r = [null];
            r.push.apply(r, e);
            const o = new (Function.bind.apply(t, r))();
            return n && M(o, n.prototype), o;
          }).apply(null, arguments);
    }
    function L() {
      if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" === typeof Proxy) return !0;
      try {
        return Date.prototype.toString.call(
          Reflect.construct(Date, [], () => {})
        ),
        !0
      ;
      } catch (t) {
        return !1;
      }
    }
    function M(t, e) {
      return (M =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function x(t) {
      return (x = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    window.JSCompiler_renameProperty = (t, e) => {
      return t;
    };
    const R = {
              toAttribute(t, e) {
                switch (e) {
                  case Boolean:
                    return t ? "" : null;
                  case Object:
                  case Array:
                    return null == t ? t : JSON.stringify(t);
                }
                return t;
              },
              fromAttribute(t, e) {
                switch (e) {
                  case Boolean:
                    return null !== t;
                  case Number:
                    return null === t ? null : Number(t);
                  case Object:
                  case Array:
                    return JSON.parse(t);
                }
                return t;
              },
            },
          D = (t, e) => {
            return e !== t && (e === e || t === t);
          },
          C = {
            attribute: !0,
            type: String,
            converter: R,
            reflect: !1,
            hasChanged: D,
          },
          I = (t => {
            !((t, e) => {
              if ("function" !== typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 },
              })),
                e && M(t, e);
            })(c, t);
            let e;
            let n;
            let r;
            let o;
            let i;
            let a;
            let s;

            const u =
              ((e = c),
              (n = L()),
              function () {
                let t;
                const r = x(e);
                if (n) {
                  const o = x(this).constructor;
                  t = Reflect.construct(r, arguments, o);
                } else t = r.apply(this, arguments);
                return k(this, t);
              });

            function c() {
              let t;
              return ((t, e) => {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, c), (t = u.call(this)).initialize(), t;
            }
            return (r = c),
            (o = [
              {
                key: "initialize",
                value() {
                  const t = this;
                  (this._updateState = 0),
                    (this._updatePromise = new Promise(e => {
                      return (t._enableUpdatingResolver = e);
                    })),
                    (this._changedProperties = new Map()),
                    this._saveInstanceProperties(),
                    this.requestUpdateInternal();
                },
              },
              {
                key: "_saveInstanceProperties",
                value() {
                  const t = this;
                  this.constructor._classProperties.forEach((e, n) => {
                    if (t.hasOwnProperty(n)) {
                      const r = t[n];
                      delete t[n],
                        t._instanceProperties ||
                          (t._instanceProperties = new Map()),
                        t._instanceProperties.set(n, r);
                    }
                  });
                },
              },
              {
                key: "_applyInstanceProperties",
                value() {
                  const t = this;
                  this._instanceProperties.forEach((e, n) => {
                    return (t[n] = e);
                  }),
                    (this._instanceProperties = void 0);
                },
              },
              {
                key: "connectedCallback",
                value() {
                  this.enableUpdating();
                },
              },
              {
                key: "enableUpdating",
                value() {
                  void 0 !== this._enableUpdatingResolver &&
                    (this._enableUpdatingResolver(),
                    (this._enableUpdatingResolver = void 0));
                },
              },
              { key: "disconnectedCallback", value() {} },
              {
                key: "attributeChangedCallback",
                value(t, e, n) {
                  e !== n && this._attributeToProperty(t, n);
                },
              },
              {
                key: "_propertyToAttribute",
                value(t, e) {
                  const n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : C,
                        r = this.constructor,
                        o = r._attributeNameForProperty(t, n);
                  if (void 0 !== o) {
                    const i = r._propertyValueToAttribute(e, n);
                    if (void 0 === i) return;
                    (this._updateState = 8 | this._updateState),
                      null == i
                        ? this.removeAttribute(o)
                        : this.setAttribute(o, i),
                      (this._updateState = -9 & this._updateState);
                  }
                },
              },
              {
                key: "_attributeToProperty",
                value(t, e) {
                  if (!(8 & this._updateState)) {
                    const n = this.constructor, r = n._attributeToPropertyMap.get(t);
                    if (void 0 !== r) {
                      const o = n.getPropertyOptions(r);
                      (this._updateState = 16 | this._updateState),
                        (this[r] = n._propertyValueFromAttribute(e, o)),
                        (this._updateState = -17 & this._updateState);
                    }
                  }
                },
              },
              {
                key: "requestUpdateInternal",
                value(t, e, n) {
                  let r = !0;
                  if (void 0 !== t) {
                    const o = this.constructor;
                    (n = n || o.getPropertyOptions(t)),
                      o._valueHasChanged(this[t], e, n.hasChanged)
                        ? (this._changedProperties.has(t) ||
                            this._changedProperties.set(t, e),
                          !0 !== n.reflect ||
                            16 & this._updateState ||
                            (void 0 === this._reflectingProperties &&
                              (this._reflectingProperties = new Map()),
                            this._reflectingProperties.set(t, n)))
                        : (r = !1);
                  }
                  !this._hasRequestedUpdate &&
                    r &&
                    (this._updatePromise = this._enqueueUpdate());
                },
              },
              {
                key: "requestUpdate",
                value(t, e) {
                  return this.requestUpdateInternal(t, e), this.updateComplete;
                },
              },
              {
                key: "_enqueueUpdate",
                value:
                  ((a = w.a.mark(function t() {
                    let e;
                    return w.a.wrap(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (this._updateState = 4 | this._updateState),
                                (t.prev = 1),
                                (t.next = 4),
                                this._updatePromise
                              );
                            case 4:
                              t.next = 8;
                              break;
                            case 6:
                              (t.prev = 6), (t.t0 = t.catch(1));
                            case 8:
                              if (null == (e = this.performUpdate())) {
                                t.next = 12;
                                break;
                              }
                              return (t.next = 12), e;
                            case 12:
                              return t.abrupt(
                                "return",
                                !this._hasRequestedUpdate
                              );
                            case 13:
                            case "end":
                              return t.stop();
                          }
                      },
                      t,
                      this,
                      [[1, 6]]
                    );
                  })),
                  (s = function () {
                    const t = this, e = arguments;
                    return new Promise((n, r) => {
                      const o = a.apply(t, e);
                      function i(t) {
                        E(o, n, r, i, s, "next", t);
                      }
                      function s(t) {
                        E(o, n, r, i, s, "throw", t);
                      }
                      i(void 0);
                    });
                  }),
                  function () {
                    return s.apply(this, arguments);
                  }),
              },
              {
                key: "performUpdate",
                value() {
                  if (this._hasRequestedUpdate) {
                    this._instanceProperties && this._applyInstanceProperties();
                    let t = !1;
                    const e = this._changedProperties;
                    try {
                      (t = this.shouldUpdate(e))
                        ? this.update(e)
                        : this._markUpdated();
                    } catch (n) {
                      throw ((t = !1), this._markUpdated(), n);
                    }
                    t &&
                      (1 & this._updateState ||
                        ((this._updateState = 1 | this._updateState),
                        this.firstUpdated(e)),
                      this.updated(e));
                  }
                },
              },
              {
                key: "_markUpdated",
                value() {
                  (this._changedProperties = new Map()),
                    (this._updateState = -5 & this._updateState);
                },
              },
              {
                key: "_getUpdateComplete",
                value() {
                  return this._updatePromise;
                },
              },
              {
                key: "shouldUpdate",
                value(t) {
                  return !0;
                },
              },
              {
                key: "update",
                value(t) {
                  const e = this;
                  void 0 !== this._reflectingProperties &&
                    this._reflectingProperties.size > 0 &&
                    (this._reflectingProperties.forEach((t, n) => {
                      return e._propertyToAttribute(n, e[n], t);
                    }),
                    (this._reflectingProperties = void 0)),
                    this._markUpdated();
                },
              },
              { key: "updated", value(t) {} },
              { key: "firstUpdated", value(t) {} },
              {
                key: "_hasRequestedUpdate",
                get() {
                  return 4 & this._updateState;
                },
              },
              {
                key: "hasUpdated",
                get() {
                  return 1 & this._updateState;
                },
              },
              {
                key: "updateComplete",
                get() {
                  return this._getUpdateComplete();
                },
              },
            ]),
            (i = [
              {
                key: "_ensureClassProperties",
                value() {
                  const t = this;
                  if (
                    !this.hasOwnProperty(
                      JSCompiler_renameProperty("_classProperties", this)
                    )
                  ) {
                    this._classProperties = new Map();
                    const e = Object.getPrototypeOf(this)._classProperties;
                    void 0 !== e &&
                      e.forEach((e, n) => {
                        return t._classProperties.set(n, e);
                      });
                  }
                },
              },
              {
                key: "createProperty",
                value(t) {
                  const e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : C;
                  if (
                    (this._ensureClassProperties(),
                    this._classProperties.set(t, e),
                    !e.noAccessor && !this.prototype.hasOwnProperty(t))
                  ) {
                    const n = "symbol" === P(t) ? Symbol() : "__".concat(t), r = this.getPropertyDescriptor(t, n, e);
                    void 0 !== r && Object.defineProperty(this.prototype, t, r);
                  }
                },
              },
              {
                key: "getPropertyDescriptor",
                value(t, e, n) {
                  return {
                    get() {
                      return this[e];
                    },
                    set(r) {
                      const o = this[t];
                      (this[e] = r), this.requestUpdateInternal(t, o, n);
                    },
                    configurable: !0,
                    enumerable: !0,
                  };
                },
              },
              {
                key: "getPropertyOptions",
                value(t) {
                  return (
                    (this._classProperties && this._classProperties.get(t)) || C
                  );
                },
              },
              {
                key: "finalize",
                value() {
                  const t = Object.getPrototypeOf(this);
                  if (
                    (t.hasOwnProperty("finalized") || t.finalize(),
                    (this.finalized = !0),
                    this._ensureClassProperties(),
                    (this._attributeToPropertyMap = new Map()),
                    this.hasOwnProperty(
                      JSCompiler_renameProperty("properties", this)
                    ))
                  ) {
                    let e;
                    const n = this.properties;

                    const r = ((t, e) => {
                      let n;
                      if (
                        "undefined" === typeof Symbol ||
                        null == t[Symbol.iterator]
                      ) {
                        if (
                          Array.isArray(t) ||
                          (n = O(t)) ||
                          (e && t && "number" === typeof t.length)
                        ) {
                          n && (t = n);
                          let r = 0;
                          const o = () => {};
                          return {
                            s: o,
                            n() {
                              return r >= t.length
                                ? { done: !0 }
                                : { done: !1, value: t[r++] };
                            },
                            e(t) {
                              throw t;
                            },
                            f: o,
                          };
                        }
                        throw new TypeError(
                          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                        );
                      }
                      let i, a = !0, s = !1;
                      return {
                        s() {
                          n = t[Symbol.iterator]();
                        },
                        n() {
                          const t = n.next();
                          return (a = t.done), t;
                        },
                        e(t) {
                          (s = !0), (i = t);
                        },
                        f() {
                          try {
                            a || null == n.return || n.return();
                          } finally {
                            if (s) throw i;
                          }
                        },
                      };
                    })([].concat(
                      _(Object.getOwnPropertyNames(n)),
                      _(
                        "function" === typeof Object.getOwnPropertySymbols
                          ? Object.getOwnPropertySymbols(n)
                          : []
                      )
                    ));

                    try {
                      for (r.s(); !(e = r.n()).done; ) {
                        const o = e.value;
                        this.createProperty(o, n[o]);
                      }
                    } catch (i) {
                      r.e(i);
                    } finally {
                      r.f();
                    }
                  }
                },
              },
              {
                key: "_attributeNameForProperty",
                value(t, e) {
                  const n = e.attribute;
                  return !1 === n
                    ? void 0
                    : "string" === typeof n
                    ? n
                    : "string" === typeof t
                    ? t.toLowerCase()
                    : void 0;
                },
              },
              {
                key: "_valueHasChanged",
                value(t, e) {
                  const n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : D;
                  return n(t, e);
                },
              },
              {
                key: "_propertyValueFromAttribute",
                value(t, e) {
                  const n = e.type, r = e.converter || R, o = "function" === typeof r ? r : r.fromAttribute;
                  return o ? o(t, n) : t;
                },
              },
              {
                key: "_propertyValueToAttribute",
                value(t, e) {
                  if (void 0 !== e.reflect) {
                    const n = e.type, r = e.converter;
                    return ((r && r.toAttribute) || R.toAttribute)(t, n);
                  }
                },
              },
              {
                key: "observedAttributes",
                get() {
                  const t = this;
                  this.finalize();
                  const e = [];
                  return this._classProperties.forEach((n, r) => {
                    const o = t._attributeNameForProperty(r, n);
                    void 0 !== o &&
                      (t._attributeToPropertyMap.set(o, r), e.push(o));
                  }),
                  e;
                },
              },
            ]),
            o && T(r.prototype, o),
            i && T(r, i),
            c;
          })(A(HTMLElement));
    I.finalized = !0;
    var N = t => {
      return e => {
        return "function" === typeof e ? ((t, e) => {
              return window.customElements.define(t, e), e;
            })(t, e) : ((t, e) => {
              return {
                kind: e.kind,
                elements: e.elements,
                finisher(e) {
                  window.customElements.define(t, e);
                },
              };
            })(t, e);
      };
    };
    const F = Element.prototype;
    F.msMatchesSelector || F.webkitMatchesSelector;
    function B(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }

    const U =
        window.ShadowRoot &&
        (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
        "adoptedStyleSheets" in Document.prototype &&
        "replace" in CSSStyleSheet.prototype;

    const H = Symbol();

    const V = (() => {
      function t(e, n) {
        if (
          (((t, e) => {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t), n !== H)
        )
          throw new Error(
            "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
          );
        this.cssText = e;
      }
      let e, n, r;
      return (
        (e = t),
        (n = [
          {
            key: "toString",
            value() {
              return this.cssText;
            },
          },
          {
            key: "styleSheet",
            get() {
              return (
                void 0 === this._styleSheet &&
                  (U
                    ? ((this._styleSheet = new CSSStyleSheet()),
                      this._styleSheet.replaceSync(this.cssText))
                    : (this._styleSheet = null)),
                this._styleSheet
              );
            },
          },
        ]) && B(e.prototype, n),
        r && B(e, r),
        t
      );
    })();

    const q = t => {
      if (t instanceof V) return t.cssText;
      if ("number" === typeof t) return t;
      throw new Error(
        "Value passed to 'css' function must be a 'css' function result: ".concat(
          t,
          ". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."
        )
      );
    };

    var z = function (t) {
      for (
        var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
        r < e;
        r++
      )
        n[r - 1] = arguments[r];
      const o = n.reduce((e, n, r) => {
        return e + q(n) + t[r + 1];
      }, t[0]);
      return new V(o, H);
    };

    function W(t) {
      return (W =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function K(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function G(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function $(t, e, n) {
      return ($ =
        "undefined" !== typeof Reflect && Reflect.get
          ? Reflect.get
          : (t, e, n) => {
              const r = ((t, e) => {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = Q(t));

                );
                return t;
              })(t, e);
              if (r) {
                const o = Object.getOwnPropertyDescriptor(r, e);
                return o.get ? o.get.call(n) : o.value;
              }
            })(t, e, n || t);
    }
    function X(t, e) {
      return (X =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function Y(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = Q(t);
        if (e) {
          const o = Q(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return J(this, n);
      };
    }
    function J(t, e) {
      return !e || ("object" !== W(e) && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function Q(t) {
      return (Q = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    (window.litElementVersions || (window.litElementVersions = [])).push(
      "2.4.0"
    );
    const Z = {};

    var tt = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && X(t, e);
      })(i, t);
      let e;
      let n;
      let r;
      const o = Y(i);
      function i() {
        return K(this, i), o.apply(this, arguments);
      }
      return (e = i),
      (r = [
        {
          key: "getStyles",
          value() {
            return this.styles;
          },
        },
        {
          key: "_getUniqueStyles",
          value() {
            if (
              !this.hasOwnProperty(
                JSCompiler_renameProperty("_styles", this)
              )
            ) {
              const t = this.getStyles();
              if (Array.isArray(t)) {
                const e = (function t(e, n) {
                          return e.reduceRight((e, n) => {
                            return Array.isArray(n) ? t(n, e) : (e.add(n), e);
                          }, n);
                        })(t, new Set()),
                      n = [];
                e.forEach(t => {
                  return n.unshift(t);
                }),
                  (this._styles = n);
              } else this._styles = void 0 === t ? [] : [t];
              this._styles = this._styles.map(t => {
                if (t instanceof CSSStyleSheet && !U) {
                  const e = Array.prototype.slice
                    .call(t.cssRules)
                    .reduce((t, e) => {
                      return t + e.cssText;
                    }, "");
                  return new V(String(e), H);
                }
                return t;
              });
            }
          },
        },
      ]),
      (n = [
        {
          key: "initialize",
          value() {
            $(Q(i.prototype), "initialize", this).call(this),
              this.constructor._getUniqueStyles(),
              (this.renderRoot = this.createRenderRoot()),
              window.ShadowRoot &&
                this.renderRoot instanceof window.ShadowRoot &&
                this.adoptStyles();
          },
        },
        {
          key: "createRenderRoot",
          value() {
            return this.attachShadow({ mode: "open" });
          },
        },
        {
          key: "adoptStyles",
          value() {
            const t = this.constructor._styles;
            0 !== t.length &&
              (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
                ? U
                  ? (this.renderRoot.adoptedStyleSheets = t.map(t => {
                      return t instanceof CSSStyleSheet ? t : t.styleSheet;
                    }))
                  : (this._needsShimAdoptedStyleSheets = !0)
                : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
                    t.map(t => {
                      return t.cssText;
                    }),
                    this.localName
                  ));
          },
        },
        {
          key: "connectedCallback",
          value() {
            $(Q(i.prototype), "connectedCallback", this).call(this),
              this.hasUpdated &&
                void 0 !== window.ShadyCSS &&
                window.ShadyCSS.styleElement(this);
          },
        },
        {
          key: "update",
          value(t) {
            const e = this, n = this.render();
            $(Q(i.prototype), "update", this).call(this, t),
              n !== Z &&
                this.constructor.render(n, this.renderRoot, {
                  scopeName: this.localName,
                  eventContext: this,
                }),
              this._needsShimAdoptedStyleSheets &&
                ((this._needsShimAdoptedStyleSheets = !1),
                this.constructor._styles.forEach(t => {
                  const n = document.createElement("style");
                  (n.textContent = t.cssText), e.renderRoot.appendChild(n);
                }));
          },
        },
        {
          key: "render",
          value() {
            return Z;
          },
        },
      ]) && G(e.prototype, n),
      r && G(e, r),
      i;
    })(I);

    (tt.finalized = !0),
      (tt.render = (t, e, n) => {
        if (!n || "object" !== d(n) || !n.scopeName)
          throw new Error("The `scopeName` option is required.");
        const o = n.scopeName, i = u.a.has(e), a = h && 11 === e.nodeType && !!e.host, s = a && !v.has(o), c = s ? document.createDocumentFragment() : e;
        if (
          (Object(u.b)(t, c, Object.assign({ templateFactory: y(o) }, n)), s)
        ) {
          const f = u.a.get(c);
          u.a.delete(c);
          const p = f.value instanceof l.a ? f.value.template : void 0;
          g(o, c, p),
            Object(r.b)(e, e.firstChild),
            e.appendChild(c),
            u.a.set(e, f);
        }
        !i && a && window.ShadyCSS.styleElement(e.host);
      });
  },
  2: function (t, e, n) {
    "use strict";
    function r(t, e) {
      const n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        let r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(e => {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function o(t) {
      for (let e = 1; e < arguments.length; e++) {
        const n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? r(Object(n), !0).forEach(e => {
              i(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : r(Object(n)).forEach(e => {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    function i(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function a(t) {
      const e = document.createElement("template");
      return (
        (e.innerHTML = t.trim()),
        e.content ? e.content.firstChild : e.firstChild
      );
    }
    function s() {
      const t = document.querySelector('meta[name="csrf-token"]');
      return null !== t ? t.content : null;
    }
    function u(t, e) {
      const n =
                arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = n.headers,
            i = void 0 === r ? {} : r;
      return {
        method: t,
        headers: o(
          { "X-Requested-With": "XMLHttpRequest", "X-CSRF-Token": s() },
          i
        ),
        credentials: "same-origin",
        body: e,
      };
    }
    function c(t, e) {
      return u(t, e, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
    }
    function l(t) {
      const e = document.createElement("pre"), n = document.createTextNode(t);
      return e.appendChild(n), e.innerHTML;
    }
    function f(t) {
      const e = Math.floor(t / 1e3), n = Math.floor(e / 60), r = e - 60 * n;
      return "".concat(n, ":").concat(r < 10 ? "0".concat(r) : r);
    }
    function d(t, e) {
      if (0 === t) return "0 Bytes";
      const n = e || 2, r = Math.floor(Math.log(t) / Math.log(1e3));
      return ""
        .concat(parseFloat((t / Math.pow(1e3, r)).toFixed(n)), " ")
        .concat(["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][r]);
    }
    function p(t) {
      return "".concat(t ? "add" : "remove", "EventListener");
    }
    function h(t, e, n, r) {
      t[p(r)](e, n);
    }
    function y(t, e, n) {
      document.querySelector(
        "#".concat(t, ' [name="').concat(e, '"]')
      ).required = n;
    }
    n.d(e, "g", () => {
      return a;
    }),
      n.d(e, "a", () => {
        return s;
      }),
      n.d(e, "c", () => {
        return u;
      }),
      n.d(e, "d", () => {
        return c;
      }),
      n.d(e, "b", () => {
        return l;
      }),
      n.d(e, "f", () => {
        return f;
      }),
      n.d(e, "e", () => {
        return d;
      }),
      n.d(e, "i", () => {
        return p;
      }),
      n.d(e, "h", () => {
        return h;
      }),
      n.d(e, "j", () => {
        return y;
      });
  },
  23: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return r;
    }),
      n.d(e, "c", () => {
        return o;
      }),
      n.d(e, "b", () => {
        return i;
      });
    var r =
        "undefined" !== typeof window &&
        null != window.customElements &&
        void 0 !== window.customElements.polyfillWrapFlushCallback,
      o = function (t, e) {
        for (
          const n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : null,
                r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : null;
          e !== n;

        ) {
          const o = e.nextSibling;
          t.insertBefore(e, r), (e = o);
        }
      },
      i = function (t, e) {
        for (
          const n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : null;
          e !== n;

        ) {
          const r = e.nextSibling;
          t.removeChild(e), (e = r);
        }
      };
  },
  3: function (t, e, n) {
    "use strict";
    function r(t) {
      return (r =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    const o =
              ("undefined" !== typeof globalThis && globalThis) ||
              ("undefined" !== typeof self && self) ||
              ("undefined" !== typeof o && o),
          i = "URLSearchParams" in o,
          a = "Symbol" in o && "iterator" in Symbol,
          s =
            "FileReader" in o &&
            "Blob" in o && (() => {
              try {
                return new Blob(), !0;
              } catch (t) {
                return !1;
              }
            })(),
          u = "FormData" in o,
          c = "ArrayBuffer" in o;
    if (c)
      const l = [
                "[object Int8Array]",
                "[object Uint8Array]",
                "[object Uint8ClampedArray]",
                "[object Int16Array]",
                "[object Uint16Array]",
                "[object Int32Array]",
                "[object Uint32Array]",
                "[object Float32Array]",
                "[object Float64Array]",
              ],
            f =
              ArrayBuffer.isView ||
              (t => {
                return t && l.includes(Object.prototype.toString.call(t));
              });
    function d(t) {
      if (
        ("string" !== typeof t && (t = String(t)),
        /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t) || "" === t)
      )
        throw new TypeError(
          'Invalid character in header field name: "' + t + '"'
        );
      return t.toLowerCase();
    }
    function p(t) {
      return "string" !== typeof t && (t = String(t)), t;
    }
    function h(t) {
      const e = {
        next() {
          const e = t.shift();
          return { done: void 0 === e, value: e };
        },
      };
      return a &&
        (e[Symbol.iterator] = () => {
          return e;
        }),
      e
    ;
    }
    function y(t) {
      (this.map = {}),
        t instanceof y
          ? t.forEach(function (t, e) {
              this.append(e, t);
            }, this)
          : Array.isArray(t)
          ? t.forEach(function (t) {
              this.append(t[0], t[1]);
            }, this)
          : t &&
            Object.getOwnPropertyNames(t).forEach(function (e) {
              this.append(e, t[e]);
            }, this);
    }
    function m(t) {
      if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
      t.bodyUsed = !0;
    }
    function v(t) {
      return new Promise((e, n) => {
        (t.onload = () => {
          e(t.result);
        }),
          (t.onerror = () => {
            n(t.error);
          });
      });
    }
    function g(t) {
      const e = new FileReader(), n = v(e);
      return e.readAsArrayBuffer(t), n;
    }
    function b(t) {
      if (t.slice) return t.slice(0);
      const e = new Uint8Array(t.byteLength);
      return e.set(new Uint8Array(t)), e.buffer;
    }
    function w() {
      return (this.bodyUsed = !1),
      (this._initBody = function (t) {
        let e;
        (this.bodyUsed = this.bodyUsed),
          (this._bodyInit = t),
          t
            ? "string" === typeof t
              ? (this._bodyText = t)
              : s && Blob.prototype.isPrototypeOf(t)
              ? (this._bodyBlob = t)
              : u && FormData.prototype.isPrototypeOf(t)
              ? (this._bodyFormData = t)
              : i && URLSearchParams.prototype.isPrototypeOf(t)
              ? (this._bodyText = t.toString())
              : c && s && (e = t) && DataView.prototype.isPrototypeOf(e)
              ? ((this._bodyArrayBuffer = b(t.buffer)),
                (this._bodyInit = new Blob([this._bodyArrayBuffer])))
              : c && (ArrayBuffer.prototype.isPrototypeOf(t) || f(t))
              ? (this._bodyArrayBuffer = b(t))
              : (this._bodyText = t = Object.prototype.toString.call(t))
            : (this._bodyText = ""),
          this.headers.get("content-type") ||
            ("string" === typeof t
              ? this.headers.set("content-type", "text/plain;charset=UTF-8")
              : this._bodyBlob && this._bodyBlob.type
              ? this.headers.set("content-type", this._bodyBlob.type)
              : i &&
                URLSearchParams.prototype.isPrototypeOf(t) &&
                this.headers.set(
                  "content-type",
                  "application/x-www-form-urlencoded;charset=UTF-8"
                ));
      }),
      s &&
        ((this.blob = function () {
          const t = m(this);
          if (t) return t;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer)
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData)
            throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]));
        }),
        (this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            const t = m(this);
            return (
              t ||
              (ArrayBuffer.isView(this._bodyArrayBuffer)
                ? Promise.resolve(
                    this._bodyArrayBuffer.buffer.slice(
                      this._bodyArrayBuffer.byteOffset,
                      this._bodyArrayBuffer.byteOffset +
                        this._bodyArrayBuffer.byteLength
                    )
                  )
                : Promise.resolve(this._bodyArrayBuffer))
            );
          }
          return this.blob().then(g);
        })),
      (this.text = function () {
        let t;
        let e;
        let n;
        const r = m(this);
        if (r) return r;
        if (this._bodyBlob)
          return (
            (t = this._bodyBlob),
            (e = new FileReader()),
            (n = v(e)),
            e.readAsText(t),
            n
          );
        if (this._bodyArrayBuffer)
          return Promise.resolve((t => {
            for (
              var e = new Uint8Array(t), n = new Array(e.length), r = 0;
              r < e.length;
              r++
            )
              n[r] = String.fromCharCode(e[r]);
            return n.join("");
          })(this._bodyArrayBuffer));
        if (this._bodyFormData)
          throw new Error("could not read FormData body as text");
        return Promise.resolve(this._bodyText);
      }),
      u &&
        (this.formData = function () {
          return this.text().then(S);
        }),
      (this.json = function () {
        return this.text().then(JSON.parse);
      }),
      this;
    }
    (y.prototype.append = function (t, e) {
      (t = d(t)), (e = p(e));
      const n = this.map[t];
      this.map[t] = n ? n + ", " + e : e;
    }),
      (y.prototype.delete = function (t) {
        delete this.map[d(t)];
      }),
      (y.prototype.get = function (t) {
        return (t = d(t)), this.has(t) ? this.map[t] : null;
      }),
      (y.prototype.has = function (t) {
        return this.map.hasOwnProperty(d(t));
      }),
      (y.prototype.set = function (t, e) {
        this.map[d(t)] = p(e);
      }),
      (y.prototype.forEach = function (t, e) {
        for (const n in this.map)
          this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
      }),
      (y.prototype.keys = function () {
        const t = [];
        return this.forEach((e, n) => {
          t.push(n);
        }),
        h(t)
      ;
      }),
      (y.prototype.values = function () {
        const t = [];
        return this.forEach(e => {
          t.push(e);
        }),
        h(t)
      ;
      }),
      (y.prototype.entries = function () {
        const t = [];
        return this.forEach((e, n) => {
          t.push([n, e]);
        }),
        h(t)
      ;
      }),
      a && (y.prototype[Symbol.iterator] = y.prototype.entries);
    const _ = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
    function O(t, e) {
      if (!(this instanceof O))
        throw new TypeError(
          'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
        );
      let n, r, o = (e = e || {}).body;
      if (t instanceof O) {
        if (t.bodyUsed) throw new TypeError("Already read");
        (this.url = t.url),
          (this.credentials = t.credentials),
          e.headers || (this.headers = new y(t.headers)),
          (this.method = t.method),
          (this.mode = t.mode),
          (this.signal = t.signal),
          o || null == t._bodyInit || ((o = t._bodyInit), (t.bodyUsed = !0));
      } else this.url = String(t);
      if (
        ((this.credentials =
          e.credentials || this.credentials || "same-origin"),
        (!e.headers && this.headers) || (this.headers = new y(e.headers)),
        (this.method =
          ((n = e.method || this.method || "GET"),
          (r = n.toUpperCase()),
          _.includes(r) ? r : n)),
        (this.mode = e.mode || this.mode || null),
        (this.signal = e.signal || this.signal),
        (this.referrer = null),
        ("GET" === this.method || "HEAD" === this.method) && o)
      )
        throw new TypeError("Body not allowed for GET or HEAD requests");
      if (
        (this._initBody(o),
        ("GET" === this.method || "HEAD" === this.method) &&
          ("no-store" === e.cache || "no-cache" === e.cache))
      ) {
        const i = /([?&])_=[^&]*/;
        if (i.test(this.url))
          this.url = this.url.replace(i, "$1_=" + new Date().getTime());
        else {
          this.url +=
            (/\?/.test(this.url) ? "&" : "?") + "_=" + new Date().getTime();
        }
      }
    }
    function S(t) {
      const e = new FormData();
      return t
        .trim()
        .split("&")
        .forEach(t => {
          if (t) {
            const n = t.split("="), r = n.shift().replace(/\+/g, " "), o = n.join("=").replace(/\+/g, " ");
            e.append(decodeURIComponent(r), decodeURIComponent(o));
          }
        }),
      e;
    }
    function P(t, e) {
      if (!(this instanceof P))
        throw new TypeError(
          'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
        );
      e || (e = {}),
        (this.type = "default"),
        (this.status = void 0 === e.status ? 200 : e.status),
        (this.ok = this.status >= 200 && this.status < 300),
        (this.statusText = void 0 === e.statusText ? "" : "" + e.statusText),
        (this.headers = new y(e.headers)),
        (this.url = e.url || ""),
        this._initBody(t);
    }
    (O.prototype.clone = function () {
      return new O(this, { body: this._bodyInit });
    }),
      w.call(O.prototype),
      w.call(P.prototype),
      (P.prototype.clone = function () {
        return new P(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new y(this.headers),
          url: this.url,
        });
      }),
      (P.error = () => {
        const t = new P(null, { status: 0, statusText: "" });
        return (t.type = "error"), t;
      });
    const E = [301, 302, 303, 307, 308];
    P.redirect = (t, e) => {
      if (!E.includes(e)) throw new RangeError("Invalid status code");
      return new P(null, { status: e, headers: { location: t } });
    };
    let T = o.DOMException;
    try {
      new T();
    } catch (A) {
      ((T = function (t, e) {
        (this.message = t), (this.name = e);
        const n = Error(t);
        this.stack = n.stack;
      }).prototype = Object.create(Error.prototype)),
        (T.prototype.constructor = T);
    }
    function k(t, e) {
      return new Promise((n, i) => {
        const a = new O(t, e);
        if (a.signal && a.signal.aborted)
          return i(new T("Aborted", "AbortError"));
        const u = new XMLHttpRequest();
        function l() {
          u.abort();
        }
        (u.onload = () => {
          let t;
          let e;

          const r = {
            status: u.status,
            statusText: u.statusText,
            headers:
              ((t = u.getAllResponseHeaders() || ""),
              (e = new y()),
              t
                .replace(/\r?\n[\t ]+/g, " ")
                .split("\r")
                .map(t => {
                  return 0 === t.indexOf("\n") ? t.substr(1, t.length) : t;
                })
                .forEach(t => {
                  const n = t.split(":"), r = n.shift().trim();
                  if (r) {
                    const o = n.join(":").trim();
                    e.append(r, o);
                  }
                }),
              e),
          };

          r.url =
            "responseURL" in u ? u.responseURL : r.headers.get("X-Request-URL");
          const o = "response" in u ? u.response : u.responseText;
          setTimeout(() => {
            n(new P(o, r));
          }, 0);
        }),
          (u.onerror = () => {
            setTimeout(() => {
              i(new TypeError("Network request failed"));
            }, 0);
          }),
          (u.ontimeout = () => {
            setTimeout(() => {
              i(new TypeError("Network request failed"));
            }, 0);
          }),
          (u.onabort = () => {
            setTimeout(() => {
              i(new T("Aborted", "AbortError"));
            }, 0);
          }),
          u.open(a.method, (t => {
            try {
              return "" === t && o.location.href ? o.location.href : t;
            } catch (e) {
              return t;
            }
          })(a.url), !0),
          "include" === a.credentials
            ? (u.withCredentials = !0)
            : "omit" === a.credentials && (u.withCredentials = !1),
          "responseType" in u &&
            (s
              ? (u.responseType = "blob")
              : c &&
                a.headers.get("Content-Type") &&
                a.headers
                  .get("Content-Type")
                  .includes("application/octet-stream") &&
                (u.responseType = "arraybuffer")),
          !e || "object" !== r(e.headers) || e.headers instanceof y
            ? a.headers.forEach((t, e) => {
                u.setRequestHeader(e, t);
              })
            : Object.getOwnPropertyNames(e.headers).forEach(t => {
                u.setRequestHeader(t, p(e.headers[t]));
              }),
          a.signal &&
            (a.signal.addEventListener("abort", l),
            (u.onreadystatechange = () => {
              4 === u.readyState && a.signal.removeEventListener("abort", l);
            })),
          u.send("undefined" === typeof a._bodyInit ? null : a._bodyInit);
      });
    }
    (k.polyfill = !0),
      o.fetch ||
        ((o.fetch = k), (o.Headers = y), (o.Request = O), (o.Response = P));
  },
  31: function (t, e, n) {
    "use strict";
    function r(t) {
      const e = t.scrollWidth, n = t.parentNode.offsetWidth;
      if (e > n) {
        const o = 50 * (e - n);
        window
          .$(t)
          .animate({ dummy: 1 }, 500)
          .animate({ scrollLeft: e - n }, o)
          .animate({ scrollLeft: 0 }, o / 2, () => {
            return r(t);
          });
      }
    }
    n.d(e, "a", () => {
      return r;
    });
  },
  327: function (t, e, n) {
    const r = {
      "./airbit_feature_controller.js": 328,
      "./fb_video_controller.js": 329,
      "./hit_counter_feature_controller.js": 330,
      "./image_and_text_feature_controller.js": 331,
      "./live_text_controller.js": 332,
      "./minimum_value_controller.js": 333,
      "./recaptcha_controller.js": 334,
      "./store_features_controller.js": 335,
      "./subscriptions_dropdown_controller.js": 336,
      "./tip_jar_feature_controller.js": 337,
      "./truncation_controller.js": 338,
      "./twitch_parent_controller.js": 339,
      "./variations_range_controller.js": 340,
      "./video_thumbnail_controller.js": 341,
      "./zoogle_media_player_controller.js": 342,
      "./zoogle_video_controller.js": 343,
    };
    function o(t) {
      const e = i(t);
      return n(e);
    }
    function i(t) {
      if (!n.o(r, t)) {
        const e = new Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      return r[t];
    }
    (o.keys = () => {
      return Object.keys(r);
    }),
      (o.resolve = i),
      (t.exports = o),
      (o.id = 327);
  },
  328: function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "default", () => {
        return f;
      });
    const r = n(0), o = n(39);
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function s(t, e) {
      return (s =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function u(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = l(t);
        if (e) {
          const o = l(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return c(this, n);
      };
    }
    function c(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function l(t) {
      return (l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var f = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && s(t, e);
      })(l, t);
      let e;
      let n;
      let r;
      const c = u(l);
      function l() {
        return i(this, l), c.apply(this, arguments);
      }
      return (e = l),
      (n = [
        {
          key: "connect",
          value() {
            Object(o.a)(), this.registerWithZoogleMedia();
          },
        },
        {
          key: "disconnect",
          value() {
            this.unregisterWithZoogleMedia();
          },
        },
        {
          key: "registerWithZoogleMedia",
          value() {
            const t = this.element;
            (t.pause = () => {
              t.contentWindow.postMessage("pause", "https://airbit.com");
            }),
              window.zoogleMedia.register(t);
          },
        },
        {
          key: "handleAirbitPostMessage",
          value(t) {
            "https://airbit.com" === t.origin &&
              "pause" === t.data &&
              window.zoogleMedia.setActive(this.element);
          },
        },
        {
          key: "unregisterWithZoogleMedia",
          value() {
            const t = this.element, e = window.zoogleMedia.players.indexOf(t);
            window.zoogleMedia.players.remove(e), this.clearCurrentPlayer(t);
          },
        },
        {
          key: "clearCurrentPlayer",
          value(t) {
            window.zoogleMedia.currentPlayer === t &&
              (window.zoogleMedia.currentPlayer = void 0);
          },
        },
      ]) && a(e.prototype, n),
      r && a(e, r),
      l;
    })(r.b);
  },
  329: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      return (o =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function i(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = s(t);
        if (e) {
          const o = s(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return a(this, n);
      };
    }
    function a(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function s(t) {
      return (s = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return u;
      });
    var u = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && o(t, e);
      })(n, t);
      const e = i(n);
      function n() {
        return r(this, n), e.apply(this, arguments);
      }
      return n;
    })(n(96).a);
  },
  330: function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "default", () => {
        return f;
      });
    const r = n(0), o = (n(3), n(2));
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function s(t, e) {
      return (s =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function u(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = l(t);
        if (e) {
          const o = l(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return c(this, n);
      };
    }
    function c(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function l(t) {
      return (l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var f = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && s(t, e);
      })(l, t);
      let e;
      let n;
      let r;
      const c = u(l);
      function l() {
        return i(this, l), c.apply(this, arguments);
      }
      return (
        (e = l),
        (n = [
          {
            key: "connect",
            value() {
              document.querySelector(".wysiwyg") ||
                void 0 === this.element.dataset.id ||
                this.ping();
            },
          },
          {
            key: "ping",
            value() {
              window.fetch(
                "/go/hit_counter_features/".concat(this.element.dataset.id),
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "text/html",
                    "X-CSRF-Token": Object(o.a)(),
                  },
                  credentials: "same-origin",
                }
              );
            },
          },
        ]) && a(e.prototype, n),
        r && a(e, r),
        l
      );
    })(r.b);
  },
  331: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return c;
      });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        return r(this, c), u.apply(this, arguments);
      }
      return (
        (e = c),
        (n = [
          {
            key: "onTextContainerClick",
            value(t) {
              (this.isCollageDisplayFormat ||
                this.isTextOnImageDisplayFormat) &&
                this.imageLinkElement &&
                this._clickOnImageLinkIfNeeded(t.target);
            },
          },
          {
            key: "_clickOnImageLinkIfNeeded",
            value(t) {
              t.closest(".text-container-wrapper") ||
                this.imageLinkElement.click();
            },
          },
          {
            key: "isCollageDisplayFormat",
            get() {
              return this.element.classList.contains("display-format-collage");
            },
          },
          {
            key: "isTextOnImageDisplayFormat",
            get() {
              return this.element.classList.contains(
                "display-format-text_on_image"
              );
            },
          },
          {
            key: "imageLinkElement",
            get() {
              return this.element.querySelector(".image-container a");
            },
          },
        ]) && o(e.prototype, n),
        s && o(e, s),
        c
      );
    })(n(0).b);
  },
  332: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return c;
      });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        return r(this, c), u.apply(this, arguments);
      }
      return (e = c),
      (n = [
        {
          key: "connect",
          value() {
            const t = this.element.dataset.liveAt, e = this.element.dataset.liveUntil, n = this.element.dataset.liveText, r = new Date().getTime();
            r >= t && r <= e && (this.element.innerHTML = n);
          },
        },
      ]) && o(e.prototype, n),
      s && o(e, s),
      c
    ;
    })(n(0).b);
  },
  333: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return c;
      });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        return r(this, c), u.apply(this, arguments);
      }
      return (e = c),
      (n = [
        {
          key: "check",
          value() {
            return this.isValid()
              ? (this.warningTarget.classList.add("hide"), !0)
              : (this.warningTarget.classList.remove("hide"), !1);
          },
        },
        {
          key: "submit",
          value(t) {
            const e = new URL(this.submitTarget.href), n = this.userValue;
            this.isValid()
              ? (Number.isNaN(n) || e.searchParams.set("amount", n),
                (this.submitTarget.href = e))
              : t.preventDefault();
          },
        },
        {
          key: "isValid",
          value() {
            const t = this.userValue, e = parseFloat(this.priceTarget.dataset.minPrice, 10);
            return "" === this.priceTarget.value || Number.isNaN(t) || t >= e;
          },
        },
        {
          key: "userValue",
          get() {
            return parseFloat(this.priceTarget.value, 10);
          },
        },
      ]) && o(e.prototype, n),
      s && o(e, s),
      c
    ;
    })(n(0).b);
    c.targets = ["warning", "price", "submit"];
  },
  334: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      return (o =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function i(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = s(t);
        if (e) {
          const o = s(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return a(this, n);
      };
    }
    function a(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function s(t) {
      return (s = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return u;
      });
    var u = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && o(t, e);
      })(n, t);
      const e = i(n);
      function n() {
        return r(this, n), e.apply(this, arguments);
      }
      return n;
    })(n(46).a);
  },
  335: function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "default", () => {
        return f;
      });
    const r = n(0), o = n(2);
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function s(t, e) {
      return (s =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function u(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = l(t);
        if (e) {
          const o = l(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return c(this, n);
      };
    }
    function c(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function l(t) {
      return (l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var f = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && s(t, e);
      })(l, t);
      let e;
      let n;
      let r;
      const c = u(l);
      function l() {
        let t;
        i(this, l);
        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
          n[r] = arguments[r];
        return (
          ((t = c.call.apply(c, [this].concat(n))).INTERSECTION_CLASS =
            ".store-wrapper article:last-child"),
          (t.OBSERVED_CLASS = "store-wrapper-observed"),
          (t.OBSERVER_CONFIG = {
            rootMargin: "100px 0px 0px 0px",
            threshold: 0,
          }),
          t
        );
      }
      return (e = l),
      (n = [
        {
          key: "connect",
          value() {
            (this.wrapper = this.element.closest(".feature")),
              (this.featureId = this.wrapper.dataset.featureId),
              this.setupDeferredPagination();
          },
        },
        {
          key: "disconnect",
          value() {
            this.observer &&
              this.observer.disconnect &&
              this.observer.disconnect();
          },
        },
        {
          key: "setupDeferredPagination",
          value() {
            const t = this,
                  e = this.wrapper.querySelector(".store-wrapper").dataset
                    .loadMore;
            if (!0 === e || "true" === e)
              if (
                "undefined" !== typeof IntersectionObserver &&
                !0 !== IntersectionObserver.polyfill
              ) {
                const n = this.element.querySelectorAll(
                  ""
                    .concat(this.INTERSECTION_CLASS, ":not(.")
                    .concat(this.OBSERVED_CLASS, ")")
                );
                this.observer = new IntersectionObserver(e => {
                  return t.onIntersection(e);
                }, this.OBSERVER_CONFIG);
                for (let r = 0; r < n.length; r += 1)
                  n[r].classList.add(this.OBSERVED_CLASS),
                    this.observer.observe(n[r]);
              } else this.loadMore(!0);
          },
        },
        {
          key: "onIntersection",
          value(t) {
            for (let e = 0; e < t.length; e += 1) {
              const n = t[e];
              n.isIntersecting &&
                (this.observer.unobserve(n.target),
                n.target.classList.remove(this.OBSERVED_CLASS),
                this.loadMore());
            }
          },
        },
        {
          key: "loadMore",
          value(t) {
            const e = this.element.dataset, n = e.loadMore, r = e.storeId, i = e.offset;
            if (void 0 !== n) {
              let a = "/go/stores/"
                .concat(r, "/store_items?offset=")
                .concat(i);
              void 0 !== this.featureId &&
                (a = ""
                  .concat(a, "&store_feature_id=")
                  .concat(this.featureId));
              const s = this.element;
              if (!0 === n || "true" === n) {
                !0 === t && (a += "&amount=1000");
                const u = new XMLHttpRequest(), c = this;
                u.open("GET", a, !0),
                  (u.onload = () => {
                    if (u.status >= 200 && u.status < 400) {
                      const t = u.responseText, e = Object(o.g)(t);
                      (s.dataset.offset = e.dataset.offset),
                        (s.dataset.loadMore = e.dataset.loadMore);
                      const n = s.querySelectorAll("article.empty");
                      Array.prototype.forEach.call(n, t => {
                        t.parentNode.removeChild(t);
                      });
                      for (
                        let r = e.querySelectorAll("article"), i = 0;
                        i < r.length;
                        i += 1
                      )
                        s.appendChild(r[i]);
                      document.dispatchEvent(new CustomEvent("pageLoad")),
                        c.setupDeferredPagination();
                    }
                  }),
                  u.send();
              }
            }
          },
        },
      ]) && a(e.prototype, n),
      r && a(e, r),
      l;
    })(r.b);
  },
  336: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return c;
      });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        let t;
        r(this, c);
        for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++)
          n[o] = arguments[o];
        return (
          ((t = u.call.apply(u, [this].concat(n))).CLOSED_CLASS = "-is-closed"),
          t
        );
      }
      return (e = c),
      (n = [
        {
          key: "connect",
          value() {
            this.isMobile() ? this.close() : this.open();
          },
        },
        {
          key: "isClosed",
          value() {
            return this.element.classList.contains(this.CLOSED_CLASS);
          },
        },
        {
          key: "open",
          value() {
            const t = this;
            if (this.hasContentTarget) {
              this.element.classList.remove(this.CLOSED_CLASS);
              const e = this.contentTarget, n = e.scrollHeight;
              (e.style.height = "".concat(n, "px")),
                e.addEventListener("transitioned", () => {
                  e.removeEventListener("transitioned", t.open),
                    (e.style.height = null);
                });
            }
          },
        },
        {
          key: "close",
          value() {
            if (this.hasContentTarget) {
              this.element.classList.add(this.CLOSED_CLASS);
              const t = this.contentTarget, e = t.scrollHeight;
              requestAnimationFrame(() => {
                (t.style.height = "".concat(e, "px")),
                  requestAnimationFrame(() => {
                    t.style.height = "0px";
                  });
              });
            }
          },
        },
        {
          key: "isMobile",
          value() {
            return document
              .getElementById("usersite-container")
              .classList.contains("mobile-view");
          },
        },
        {
          key: "toggle",
          value() {
            this.isClosed() ? this.open() : this.close();
          },
        },
        {
          key: "toggleDesktop",
          value() {
            this.isMobile() || this.open();
          },
        },
      ]) && o(e.prototype, n),
      s && o(e, s),
      c;
    })(n(0).b);
    c.targets = ["content"];
  },
  337: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return c;
      });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        return r(this, c), u.apply(this, arguments);
      }
      return (e = c),
      (n = [
        {
          key: "connect",
          value() {
            const t = this;
            (this.observer = new MutationObserver(() => {
              t.addToCartButtonTarget.classList.contains("in-cart") &&
                t.toggleForm();
            }, this)),
              this.observer.observe(this.addToCartButtonTarget, {
                attributes: !0,
              });
          },
        },
        {
          key: "toggleForm",
          value() {
            this.descriptionWrapperTarget.classList.add("hide"),
              this.formWrapperTarget.classList.remove("hide");
          },
        },
        {
          key: "disconnect",
          value() {
            this.observer.disconnect();
          },
        },
      ]) && o(e.prototype, n),
      s && o(e, s),
      c;
    })(n(0).b);
    c.targets = ["addToCartButton", "descriptionWrapper", "formWrapper"];
  },
  338: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return c;
      });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        return r(this, c), u.apply(this, arguments);
      }
      return (e = c),
      (n = [
        {
          key: "connect",
          value() {
            "" !== this.areaMaxHeight &&
              this.isOverflown &&
              (this.truncated = this.truncationEnabled);
          },
        },
        {
          key: "detruncate",
          value(t) {
            t.preventDefault(), (this.truncated = !1);
          },
        },
        {
          key: "retruncate",
          value(t) {
            t.preventDefault(), (this.truncated = !0);
          },
        },
        {
          key: "truncationEnabled",
          get() {
            return (
              "true" !== this.data.get("skipForPdf") ||
              !document.body.classList.contains("pdf")
            );
          },
        },
        {
          key: "isOverflown",
          get() {
            const t = parseInt(this.areaMaxHeight, 10);
            return (
              this.areaTarget.scrollHeight > t ||
              this.areaTarget.scrollWidth > this.areaTarget.clientWidth
            );
          },
        },
        {
          key: "areaMaxHeight",
          get() {
            return window.getComputedStyle(this.areaTarget).maxHeight;
          },
        },
        {
          key: "truncated",
          set(t) {
            this.areaTarget.classList.toggle("truncate-long", t),
              this.areaTarget.classList.toggle("truncated", !t),
              this.retruncateTarget.classList.toggle("hide", t),
              this.detruncateTarget.classList.toggle("hide", !t);
          },
        },
      ]) && o(e.prototype, n),
      s && o(e, s),
      c
    ;
    })(n(0).b);
    c.targets = ["area", "detruncate", "retruncate"];
  },
  339: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      return (o =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function i(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = s(t);
        if (e) {
          const o = s(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return a(this, n);
      };
    }
    function a(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function s(t) {
      return (s = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return u;
      });
    var u = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && o(t, e);
      })(n, t);
      const e = i(n);
      function n() {
        return r(this, n), e.apply(this, arguments);
      }
      return n;
    })(n(99).a);
  },
  340: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return c;
      });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        return r(this, c), u.apply(this, arguments);
      }
      return (e = c),
      (n = [
        {
          key: "connect",
          value() {
            const t = [];
            JSON.parse(this.element.dataset.variations).forEach(e => {
              const n = e.price;
              t.push([n, parseFloat(n.replace(/[^\d.-]/g, ""))]);
            });
            let e = t[0], n = t[0];
            if (
              (t.forEach(t => {
                t[1] < e[1] && (e = t), t[1] > n[1] && (n = t);
              }),
              e[1] !== n[1])
            ) {
              const r = this.hintTarget.innerHTML, o = "".concat(e[0], " - ").concat(n[0]);
              !r.includes(o) &&
                ((this.hintTarget.innerHTML = "".concat(r, " ").concat(o)),
                this.hintTarget.classList.remove("hide"));
            }
          },
        },
      ]) && o(e.prototype, n),
      s && o(e, s),
      c;
    })(n(0).b);
    c.targets = ["hint"];
  },
  341: function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "default", () => {
        return l;
      });
    const r = n(0);
    n(3);
    function o(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function a(t, e) {
      return (a =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function s(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = c(t);
        if (e) {
          const o = c(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return u(this, n);
      };
    }
    function u(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function c(t) {
      return (c = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var l = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && a(t, e);
      })(c, t);
      let e;
      let n;
      let r;
      const u = s(c);
      function c() {
        return o(this, c), u.apply(this, arguments);
      }
      return (e = c),
      (n = [
        {
          key: "connect",
          value() {
            const t = this, e = this.data.get("id");
            switch (this.data.get("type")) {
              case "youtube":
                this.src = "//img.youtube.com/vi/".concat(
                  e,
                  "/maxresdefault.jpg"
                );
                break;
              case "vimeo":
                window
                  .fetch("http://vimeo.com/api/v2/video/".concat(e, ".json"))
                  .then(t => {
                    return t.json();
                  })
                  .then(e => {
                    t.src = e[0].thumbnail_large;
                  })
                  .catch(() => {
                    t.visible = !1;
                  });
                break;
              default:
                this.visible = !1;
            }
          },
        },
        {
          key: "visible",
          set(t) {
            this.element.classList.toggle("pdf__hide", !t);
          },
        },
        {
          key: "url",
          set(t) {
            this.element.setAttribute("href", t);
          },
        },
        {
          key: "src",
          set(t) {
            this.imageTarget.setAttribute("src", t);
          },
        },
      ]) && i(e.prototype, n),
      r && i(e, r),
      c;
    })(r.b);
    l.targets = ["image"];
  },
  342: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      return (o =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function i(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = s(t);
        if (e) {
          const o = s(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return a(this, n);
      };
    }
    function a(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function s(t) {
      return (s = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.r(e),
      n.d(e, "default", () => {
        return u;
      });
    var u = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && o(t, e);
      })(n, t);
      const e = i(n);
      function n() {
        return r(this, n), e.apply(this, arguments);
      }
      return n;
    })(n(105).a);
  },
  343: function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "default", () => {
        return f;
      });
    const r = n(0), o = n(39);
    function i(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function s(t, e) {
      return (s =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function u(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = l(t);
        if (e) {
          const o = l(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return c(this, n);
      };
    }
    function c(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function l(t) {
      return (l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var f = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && s(t, e);
      })(l, t);
      let e;
      let n;
      let r;
      const c = u(l);
      function l() {
        let t;
        i(this, l);
        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
          n[r] = arguments[r];
        return (
          ((t = c.call.apply(c, [this].concat(n))).VIMEO_SELECTOR =
            'iframe[src*="player.vimeo.com"]'),
          (t.YOUTUBE_SELECTOR = 'iframe[src*="youtube.com/embed"]'),
          (t.VIDEO_SELECTORS =
            'iframe[src*="player.vimeo.com"],iframe[src*="youtube.com/embed"]'),
          (t.HANDLED_CLASS = "zoogle-handled"),
          t
        );
      }
      return (e = l),
      (n = [
        {
          key: "connect",
          value() {
            this.element.querySelector(this.VIDEO_SELECTORS) &&
              (Object(o.a)(),
              this.element.querySelector(this.VIMEO_SELECTOR) &&
                this.setupVimeoVideos(),
              this.element.querySelector(this.YOUTUBE_SELECTOR) &&
                this.setupYoutubeVideos(),
              this.wrapUnwrappedVideos());
          },
        },
        {
          key: "disconnect",
          value() {
            this.unregisterYoutubePlayers(), this.unregisterVimeoPlayers();
          },
        },
        {
          key: "setupVimeoVideos",
          value() {
            const t = this;
            this.element
              .querySelectorAll(this.VIMEO_SELECTOR)
              .forEach(e => {
                if (!e.id) {
                  for (
                    var n = 0, r = "vimeo".concat(n);
                    document.getElementById(r);

                  )
                    r = "vimeo".concat((n += 1));
                  e.id = r;
                }
                e.classList.add(t.HANDLED_CLASS),
                  t.registerVimeoPlayerWithZoogleMedia(e);
              });
          },
        },
        {
          key: "handleVimeoPostMessage",
          value(t) {
            if (
              void 0 !== t.data &&
              '{"event":"ready"}' !== !t.data &&
              '{"event":"play"}' !== !t.data
            ) {
              let e;
              try {
                e = JSON.parse(t.data);
              } catch (n) {
                e = {};
              }
              e.player_id &&
                this.element.querySelector("#".concat(e.player_id)) &&
                ("ready" === e.event
                  ? this.postToVimeo(e.player_id, {
                      method: "addEventListener",
                      value: "play",
                    })
                  : "play" === e.event &&
                    window.zoogleMedia.setActive(
                      this.element.querySelector("#".concat(e.player_id))
                    ));
            }
          },
        },
        {
          key: "postToVimeo",
          value(t, e) {
            const n = this.element.querySelector("#".concat(t));
            if (n) {
              const r = n.src.split("?")[0];
              n.contentWindow.postMessage(JSON.stringify(e), r);
            }
          },
        },
        {
          key: "registerVimeoPlayerWithZoogleMedia",
          value(t) {
            const e = this;
            (t.pause = () => {
              e.postToVimeo(t.id, { method: "pause" });
            }),
              window.zoogleMedia.register(t);
          },
        },
        {
          key: "setupYoutubeVideos",
          value() {
            const t = this;
            if (window.ytLoaded) this.registerYouTubeEvents();
            else {
              const e = document.createElement("script");
              e.src = "https://www.youtube.com/iframe_api";
              const n = document.getElementsByTagName("script")[0];
              n.parentNode.insertBefore(e, n),
                window.YT_ready(() => {
                  t.registerYouTubeEvents();
                });
            }
          },
        },
        {
          key: "registerYouTubeEvents",
          value() {
            const t = this,
                  e = t => {
                    t.data === window.YT.PlayerState.PLAYING &&
                      window.zoogleMedia.setActive(t.target);
                  };
            this.element
              .querySelectorAll(
                ""
                  .concat(this.YOUTUBE_SELECTOR, ":not(.")
                  .concat(this.HANDLED_CLASS, ")")
              )
              .forEach(n => {
                const r = n.src;
                if (r.match(/enablejsapi=1/i)) {
                  if (
                    (n.classList.add(t.HANDLED_CLASS),
                    r.match("^http://") &&
                      (n.src = r.replace(/^http:\/\//i, "https://")),
                    !n.id)
                  ) {
                    for (
                      var o = 0, i = "yt-".concat(o);
                      document.getElementById(i);

                    )
                      i = "yt-".concat((o += 1));
                    n.id = i;
                  }
                  const a = new window.YT.Player(n.id, {
                    events: { onStateChange: e },
                  });
                  (a.pause = () => {
                    a.pauseVideo && a.pauseVideo();
                  }),
                    (a.classList = n.classList),
                    window.zoogleMedia.register(a);
                }
              });
          },
        },
        {
          key: "wrapUnwrappedVideos",
          value() {
            this.element
              .querySelectorAll(this.VIDEO_SELECTORS)
              .forEach(t => {
                if (!t.classList.contains([".skip-wrapper", ".wrapped"])) {
                  t.classList.add("wrapped");
                  const e = document.createElement("div");
                  (e.className = "video-container"),
                    t.parentNode.insertBefore(e, t),
                    t.parentNode.removeChild(t),
                    e.appendChild(t);
                }
              });
          },
        },
        {
          key: "unregisterYoutubePlayers",
          value() {
            const t = this;
            this.element
              .querySelectorAll(
                ""
                  .concat(this.YOUTUBE_SELECTOR, ".")
                  .concat(this.HANDLED_CLASS)
              )
              .forEach(e => {
                const n = window.zoogleMedia.players.findIndex(t => {
                  return t.a === e;
                });
                window.zoogleMedia.players.remove(n), t.clearCurrentPlayer(e);
              });
          },
        },
        {
          key: "unregisterVimeoPlayers",
          value() {
            const t = this;
            this.element
              .querySelectorAll(
                "".concat(this.VIMEO_SELECTOR, ".").concat(this.HANDLED_CLASS)
              )
              .forEach(e => {
                const n = window.zoogleMedia.players.indexOf(e);
                window.zoogleMedia.players.remove(n), t.clearCurrentPlayer(e);
              });
          },
        },
        {
          key: "clearCurrentPlayer",
          value(t) {
            window.zoogleMedia.currentPlayer === t &&
              (window.zoogleMedia.currentPlayer = void 0);
          },
        },
      ]) && a(e.prototype, n),
      r && a(e, r),
      l;
    })(r.b);
  },
  344: function (t, e, n) {
    let r;
    (r = n(345)).keys().forEach(r);
  },
  345: function (t, e, n) {
    const r = {
      "./media_background.js": 551,
      "./media_background_container.js": 346,
      "./media_background_debug.js": 347,
    };
    function o(t) {
      const e = i(t);
      return n(e);
    }
    function i(t) {
      if (!n.o(r, t)) {
        const e = new Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      return r[t];
    }
    (o.keys = () => {
      return Object.keys(r);
    }),
      (o.resolve = i),
      (t.exports = o),
      (o.id = 345);
  },
  346: function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "default", () => {
        return m;
      });
    let r;
    let o;
    let i;
    const a = n(19);
    function s(t) {
      return (s =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function u() {
      const t = ((t, e) => {
        e || (e = t.slice(0));
        return Object.freeze(
          Object.defineProperties(t, { raw: { value: Object.freeze(e) } })
        );
      })(["<slot></slot>"]);
      return (u = () => {
        return t;
      }),
      t
    ;
    }
    function c(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function l(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function f(t, e, n) {
      return (f =
        "undefined" !== typeof Reflect && Reflect.get
          ? Reflect.get
          : (t, e, n) => {
              const r = ((t, e) => {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = y(t));

                );
                return t;
              })(t, e);
              if (r) {
                const o = Object.getOwnPropertyDescriptor(r, e);
                return o.get ? o.get.call(n) : o.value;
              }
            })(t, e, n || t);
    }
    function d(t, e) {
      return (d =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function p(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = y(t);
        if (e) {
          const o = y(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return h(this, n);
      };
    }
    function h(t, e) {
      return !e || ("object" !== s(e) && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function y(t) {
      return (y = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var m =
      Object(a.c)("media-background-container")(
        ((i = o = (t => {
        !((t, e) => {
          if ("function" !== typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && d(t, e);
        })(i, t);
        let e;
        let n;
        let r;
        const o = p(i);
        function i() {
          let t;
          c(this, i);
          for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
            n[r] = arguments[r];
          return ((t = o.call.apply(
            o,
            [this].concat(n)
          )).onUpdateComplete = () => {
            0 == t.slottedChildren.length
              ? setTimeout(() => {
                  return t.onUpdateComplete();
                }, 1)
              : ((t.activeIndex = t.activeIndex || 0), t.start());
          }),
          (t.onTransitionEnd = () => {
            t.removeEvents(), t.queueNext();
          }),
          (t.gotoNextSlide = () => {
            let e = t.activeIndex + 1;
            e >= t.slides.length && (e = 0), (t.activeIndex = e);
          }),
          t;
        }
        return (e = i),
        (r = [
          {
            key: "properties",
            get() {
              return {
                interval: { attribute: "interval" },
                activeIndex: { attribute: "active-index", reflect: !0 },
                state: { attribute: "state" },
              };
            },
          },
        ]),
        (n = [
          {
            key: "connectedCallback",
            value() {
              f(y(i.prototype), "connectedCallback", this).call(this),
                this.updateComplete.then(this.onUpdateComplete);
            },
          },
          {
            key: "attributeChangedCallback",
            value(t, e, n) {
              switch (
                (f(y(i.prototype), "attributeChangedCallback", this).call(
                  this,
                  t,
                  e,
                  n
                ),
                t)
              ) {
                case "active-index":
                  this.activateSlide(n, e);
                  break;
                case "state":
                  "paused" === n ? this.stop() : this.start();
              }
            },
          },
          {
            key: "start",
            value() {
              this.queueNext();
            },
          },
          {
            key: "stop",
            value() {
              clearTimeout(this.timer), this.removeEvents();
            },
          },
          {
            key: "queueNext",
            value() {
              this.playing &&
                this.slides.length > 1 &&
                (clearTimeout(this.timer),
                (this.timer = setTimeout(
                  this.gotoNextSlide,
                  this.intervalTime
                )));
            },
          },
          {
            key: "removeEvents",
            value() {
              const t = this;
              this.slides.forEach(e => {
                return e.removeEventListener(
                  "animationend",
                  t.onTransitionEnd
                );
              });
            },
          },
          {
            key: "activateSlide",
            value(t, e) {
              const n = this, r = null !== e && e !== t;
              this.slides.forEach((o, i) => {
                const a = o.classList.contains("-transition-in");
                if (
                  (o.classList.toggle("-is-active", i == t),
                  r || (!a && i === t))
                ) {
                  const s = i == t || i == e;
                  o.classList.toggle("-transition-in", i == t),
                    o.classList.toggle("-transition-out", i == e),
                    s &&
                      ("hidden" === window.document.visibilityState
                        ? (n.timer = setTimeout(n.onTransitionEnd, 1e3))
                        : o.addEventListener(
                            "animationend",
                            n.onTransitionEnd
                          ));
                }
              });
            },
          },
          {
            key: "render",
            value() {
              return Object(a.d)(u());
            },
          },
          {
            key: "intervalTime",
            get() {
              const t = this.constructor.intervals;
              return t[this.interval] || t.default;
            },
          },
          {
            key: "slottedChildren",
            get() {
              const t = this.shadowRoot.querySelector("slot");
              if (!t) return [];
              const e = t.assignedNodes({ flatten: !0 });
              return Array.prototype.filter.call(e, t => {
                return t.nodeType == Node.ELEMENT_NODE;
              });
            },
          },
          {
            key: "slides",
            get() {
              return this.slottedChildren.filter(t => {
                return "MEDIA-BACKGROUND" === t.nodeName;
              });
            },
          },
          {
            key: "playing",
            get() {
              return "paused" !== this.state;
            },
          },
        ]) && l(e.prototype, n),
        r && l(e, r),
        i;
      })(a.a)),
        (o.intervals = { slow: 6e3, medium: 4e3, fast: 2e3, default: 4e3 }),
        (r = i))
      ) || r;
  },
  347: function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "default", () => {
        return m;
      });
    let r;
    const o = n(19);
    const i = n(108);
    function a(t) {
      return (a =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function s() {
      const t = c([
        "\n      .container {\n        width: 250px;\n      }\n\n      img {\n        width: 100%;\n        height: auto;\n      }\n\n      .crop-rect {\n        outline: 1px solid blue;\n        position: absolute;\n        top: var(--rect-top, 0);\n        left: var(--rect-left, 0);\n        width: var(--rect-width, 0);\n        height: var(--rect-height, 0);\n      }\n\n      .focal-point {\n        top: var(--focal-top, 0);\n        left: var(--focal-left, 0);\n        width: 15px;\n        height: 15px;\n        background-color: rgba(0,0,255,0.5);\n        position: absolute;\n        border-radius: 50%;\n        transform: translate(-50%, -50%);\n      }\n\n      .focal-rect {\n        position: absolute;\n        top: var(--focal-rect-top, 0);\n        left: var(--focal-rect-left, 0);\n        width: var(--focal-rect-width, 0);\n        height: var(--focal-rect-height, 0);\n        background: rgba(255,255,0,0.25);\n      }\n    ",
      ]);
      return (s = () => {
        return t;
      }),
      t
    ;
    }
    function u() {
      const t = c([
        '\n      <div class="container" style="',
        '">\n        <img src="',
        '">\n        <div class="crop-rect">\n          <div class="focal-rect"></div>\n          <div class="focal-point"></div>\n        </div>\n      </div>\n    ',
      ]);
      return (u = () => {
        return t;
      }),
      t
    ;
    }
    function c(t, e) {
      return (
        e || (e = t.slice(0)),
        Object.freeze(
          Object.defineProperties(t, { raw: { value: Object.freeze(e) } })
        )
      );
    }
    function l(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function f(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function d(t, e) {
      return (d =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function p(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = y(t);
        if (e) {
          const o = y(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return h(this, n);
      };
    }
    function h(t, e) {
      return !e || ("object" !== a(e) && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function y(t) {
      return (y = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var m =
      Object(o.c)("media-background-debug")(
        (r = (t => {
        !((t, e) => {
          if ("function" !== typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && d(t, e);
        })(c, t);
        let e;
        let n;
        let r;
        const a = p(c);
        function c() {
          return l(this, c), a.apply(this, arguments);
        }
        return (e = c),
        (r = [
          {
            key: "properties",
            get() {
              return {
                src: {},
                cropRect: { type: Object },
                focalPoint: { type: Object },
                originalWidth: { type: Number },
                originalHeight: { type: Number },
                focalRect: { type: Object },
                containerRect: { type: Object },
              };
            },
          },
          {
            key: "styles",
            get() {
              return Object(o.b)(s());
            },
          },
        ]),
        (n = [
          {
            key: "render",
            value() {
              const t = 250 / this.originalWidth,
                    e = {
                      "--rect-top": this.cropRect.y,
                      "--rect-left": this.cropRect.x,
                      "--rect-width": this.cropRect.w,
                      "--rect-height": this.cropRect.h,
                      "--focal-top": this.focalPoint.y,
                      "--focal-left": this.focalPoint.x,
                      "--focal-rect-top": this.focalRect.y,
                      "--focal-rect-left": this.focalRect.x,
                      "--focal-rect-width": this.focalRect.w,
                      "--focal-rect-height": this.focalRect.h,
                    };
              return Object.keys(e).forEach(n => {
                e[n] = "".concat(e[n] * t, "px");
              }),
              Object(o.d)(u(), Object(i.a)(e), this.src)
            ;
            },
          },
        ]) && f(e.prototype, n),
        r && f(e, r),
        c;
      })(o.a))
      ) || r;
  },
  348: function (t, e, n) {},
  38: function (t, e, n) {
    "use strict";
    n.d(e, "b", () => {
      return o;
    }),
      n.d(e, "a", () => {
        return i;
      });
    const r = n(9);
    function o(t) {
      let e = i.get(t.type);
      void 0 === e &&
        ((e = { stringsArray: new WeakMap(), keyString: new Map() }),
        i.set(t.type, e));
      let n = e.stringsArray.get(t.strings);
      if (void 0 !== n) return n;
      const o = t.strings.join(r.f);
      return (
        void 0 === (n = e.keyString.get(o)) &&
          ((n = new r.a(t, t.getTemplateElement())), e.keyString.set(o, n)),
        e.stringsArray.set(t.strings, n),
        n
      );
    }
    var i = new Map();
  },
  39: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return d;
    });
    n(84);
    const r = n(45);
    function o(t, e) {
      const n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        let r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(e => {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function i(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function a(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    const s = (() => {
              function t() {
                const e = this;
                !((t, e) => {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, t),
                  (this.WRAPPER_CLASS = ".zoogle-music-player"),
                  (this.players = []),
                  (this.currentPlayer = void 0),
                  (window.zoogleMedia = this),
                  (window.zoogleMedia.mediaCount = 0),
                  (window.zoogleMedia.handleStats = this.handleStats),
                  (this.players.remove = t => {
                    e.players.splice(t, t + 1);
                  }),
                  this.setup();
                const n = this;
                document.addEventListener("pageLoad", () => {
                  n.setup();
                }),
                  window.$(document).on("pjax:popstate", () => {
                    window.zoogleMedia.needsReset = !0;
                  });
              }
              let e, n, s;
              return (e = t),
              (n = [
                {
                  key: "handleStats",
                  value(t, e, n) {
                    const r = t.dataset;
                    window.zoogleStats &&
                      r.category &&
                      ("undefined" === typeof n && (n = {}),
                      (n = (function (t) {
                        for (let e = 1; e < arguments.length; e++) {
                          const n = null != arguments[e] ? arguments[e] : {};
                          e % 2
                            ? o(Object(n), !0).forEach(e => {
                                i(t, e, n[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(
                                t,
                                Object.getOwnPropertyDescriptors(n)
                              )
                            : o(Object(n)).forEach(e => {
                                Object.defineProperty(
                                  t,
                                  e,
                                  Object.getOwnPropertyDescriptor(n, e)
                                );
                              });
                        }
                        return t;
                      })({ id: r.id, title: r.title, type: r.category }, n)),
                      window.zoogleStats[e](n));
                  },
                },
                {
                  key: "tearDown",
                  value() {
                    document
                      .querySelectorAll(".registered-player")
                      .forEach(t => {
                        t.classList.remove("registered-player");
                      });
                  },
                },
                {
                  key: "resetIfNeeded",
                  value() {
                    this.needsReset && (this.tearDown(), (this.needsReset = !1));
                  },
                },
                {
                  key: "addPlayers",
                  value() {
                    for (
                      let t = document.querySelectorAll(this.WRAPPER_CLASS), e = 0;
                      e < t.length;
                      e += 1
                    ) {
                      const n = t[e];
                      if (!n.classList.contains("registered-player")) {
                        n.classList.add("registered-player");
                        const r = new CustomEvent("playerAdded", {
                          detail: { player: n },
                        });
                        document.dispatchEvent(r);
                      }
                    }
                  },
                },
                {
                  key: "setup",
                  value() {
                    this.resetIfNeeded();
                    const t = this;
                    "undefined" !== typeof window.soundManager &&
                    "undefined" === typeof window.SOUNDMANAGER_IS_SETUP
                      ? ((window.SOUNDMANAGER_IS_SETUP = !0),
                        (window.soundManager = new r.SoundManager()),
                        window.soundManager.setup({
                          preferFlash: !1,
                          flashVersion: 9,
                          forceUseGlobalHTML5Audio: !0,
                          deferSoundCreateHTML5Setup: !0,
                          useHTML5Audio: !0,
                          waitForWindowLoad: !0,
                          debugMode: !1,
                          onready() {
                            (t.isLoaded = !0), t.addPlayers();
                            const e = new CustomEvent("soundManagerLoaded");
                            document.dispatchEvent(e);
                          },
                          ontimeout() {
                            (t.isLoaded = !1),
                              document.addEventListener("click", t => {
                                (t.target.classList.contains("play") ||
                                  t.target.classList.contains("play-button")) &&
                                  t.preventDefault();
                              });
                          },
                        }),
                        window.soundManager.beginDelayedInit())
                      : this.addPlayers();
                  },
                },
                {
                  key: "findSoundWrapper",
                  value(t) {
                    const e = t.closest("li");
                    return e || t.closest("td");
                  },
                },
                {
                  key: "register",
                  value(t) {
                    this.players.push(t);
                  },
                },
                {
                  key: "getPlayers",
                  value() {
                    return this.players;
                  },
                },
                {
                  key: "current",
                  value() {
                    return this.currentPlayer;
                  },
                },
                {
                  key: "pause",
                  value() {
                    this.currentPlayer && this.currentPlayer.pause();
                  },
                },
                {
                  key: "pauseOnExit",
                  value() {
                    (this.currentPlayer &&
                      this.currentPlayer.classList.contains("continue-on-exit")) ||
                      this.pause();
                  },
                },
                {
                  key: "setActive",
                  value(t) {
                    this.currentPlayer !== t &&
                      (this.pause(), (this.currentPlayer = t));
                  },
                },
                {
                  key: "toggle",
                  value(t) {
                    let e;
                    let n = this.currentTrack;
                    const r = document.querySelector("a.play.current");
                    if (
                      (r &&
                        ((e = this.findSoundWrapper(r)),
                        r.classList.remove("current"),
                        e.classList.remove("current")),
                      void 0 !== t)
                    ) {
                      const o = t.playable, i = t.player;
                      return (
                        this.setActive(i),
                        t.classList.add("current"),
                        (e = this.findSoundWrapper(t)).classList.add("current"),
                        o === n
                          ? 0 === n.position && 3 === n.readyState
                            ? (this.pauseAllPlayers(), n.play())
                            : n.position >= n.duration && 1 !== n.readyState
                            ? n.setPosition(0)
                            : n.paused
                            ? (this.pauseAllPlayers(), n.resume())
                            : n.pause()
                          : (this.pauseAllPlayers(),
                            n &&
                              n.position > 0 &&
                              window.zoogleMedia.handleStats(n.parent, "Skip", {
                                position: n.position,
                                duration: n.duration,
                              }),
                            (n = o).setPosition(0),
                            n.play()),
                        (this.currentTrack = n),
                        !n.paused
                      );
                    }
                    this.pauseAllPlayers();
                  },
                },
                {
                  key: "pauseAllPlayers",
                  value() {
                    window.soundManager.pauseAll(),
                      this.players.forEach(t => {
                        t.pause();
                      });
                  },
                },
              ]) && a(e.prototype, n),
              s && a(e, s),
              t;
            })(),
          u = n(11),
          c = n(31);
    function l(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    const f = (() => {
      function t() {
        !((t, e) => {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.LISTENER_TARGETS = [
            "a.play",
            "a.previous-button",
            "a.next-button",
            "a.play-button",
            ".progress",
            ".track-title a",
            "a.toggle-info",
          ]),
          (this.LISTENER_CALLBACKS = [
            this.onPlay,
            this.onPrevious,
            this.onNext,
            this.onPlayButton,
            this.onProgress,
            this.onTrackTitle,
            this.onToggleInfo,
          ]);
        for (let e = 0; e < this.LISTENER_TARGETS.length; e += 1)
          Object(u.b)(
            "click",
            this.LISTENER_TARGETS[e],
            this.LISTENER_CALLBACKS[e]
          );
        document.addEventListener("playerAdded", this.addMarquee);
      }
      let e, n, r;
      return (e = t),
      (n = [
        {
          key: "onPlay",
          value(t) {
            let e = t.target;
            t.preventDefault(),
              window.zoogleMedia &&
                window.zoogleMedia.isLoaded &&
                (e.classList.contains(".play") || (e = e.closest(".play")),
                window.zoogleMedia.toggle(e));
          },
        },
        {
          key: "onPrevious",
          value(t) {
            const e = t.target
              .closest(window.zoogleMedia.WRAPPER_CLASS)
              .player.previousTrack();
            t.preventDefault(),
              window.zoogleMedia &&
                window.zoogleMedia.isLoaded &&
                window.zoogleMedia.toggle(e);
          },
        },
        {
          key: "onNext",
          value(t) {
            const e = t.target
              .closest(window.zoogleMedia.WRAPPER_CLASS)
              .player.nextTrack();
            t.preventDefault(),
              window.zoogleMedia &&
                window.zoogleMedia.isLoaded &&
                window.zoogleMedia.toggle(e);
          },
        },
        {
          key: "onPlayButton",
          value(t) {
            if (
              (t.preventDefault(),
              window.zoogleMedia && window.zoogleMedia.isLoaded)
            ) {
              const e = t.target
                .closest(window.zoogleMedia.WRAPPER_CLASS)
                .player.currentTrackLink(!0);
              e && e.click();
            }
          },
        },
        {
          key: "onProgress",
          value(t) {
            if (
              (t.preventDefault(),
              window.zoogleMedia && window.zoogleMedia.isLoaded)
            ) {
              const e = t.target.closest(window.zoogleMedia.WRAPPER_CLASS)
                        .player,
                    n =
                      t.offsetX ||
                      t.clientX - t.target.getBoundingClientRect().left,
                    r = t.target.closest(".progress").offsetWidth;
              e.seekTo(n / r);
            }
          },
        },
        {
          key: "onTrackTitle",
          value(t) {
            if (
              (t.preventDefault(),
              window.zoogleMedia && window.zoogleMedia.isLoaded)
            ) {
              const e = t.target.closest("li").querySelector("a.play");
              e && e.click();
            }
          },
        },
        {
          key: "onToggleInfo",
          value(t) {
            t.preventDefault(),
              window.zoogleMedia &&
                window.zoogleMedia.isLoaded &&
                t.target
                  .closest(window.zoogleMedia.WRAPPER_CLASS)
                  .player.toggleTrackInfo(t.target);
          },
        },
        {
          key: "addMarquee",
          value(t) {
            if (!window.jQuery || !0 !== window.jQuery.fx.off) {
              const e = t.detail.player.querySelector(".marquee");
              e && Object(c.a)(e);
            }
          },
        },
      ]) && l(e.prototype, n),
      r && l(e, r),
      t
    ;
    })();
    function d() {
      void 0 === window.zoogleMedia && (window.zoogleMedia = new s()),
        void 0 === window.zoogleMusic && (window.zoogleMusic = new f());
    }
  },
  40: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return a;
    }),
      n.d(e, "b", () => {
        return s;
      });
    const r = n(23);
    const o = n(13);
    const i = n(38);
    var a = new WeakMap();

    var s = (t, e, n) => {
      let s = a.get(e);
      void 0 === s &&
        (Object(r.b)(e, e.firstChild),
        a.set(e, (s = new o.e(Object.assign({ templateFactory: i.b }, n)))),
        s.appendInto(e)),
        s.setValue(t),
        s.commit();
    };
  },
  41: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return o;
    }),
      n.d(e, "b", () => {
        return i;
      });
    const r = new WeakMap();

    var o = t => {
      return function () {
        const e = t.apply(void 0, arguments);
        return r.set(e, !0), e;
      };
    };

    var i = t => {
      return "function" === typeof t && r.has(t);
    };
  },
  45: function (t, e, n) {
    ((t => {
      let r;
      function o(t) {
        return (o =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? t => {
                return typeof t;
              }
            : t => {
                return t &&
                  "function" === typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      !((i, a) => {
        "use strict";
        if (!i || !i.document)
          throw new Error(
            "SoundManager requires a browser with window and document objects."
          );
        let s = null;
        function u(t, e) {
          (this.setupOptions = {
            url: t || null,
            flashVersion: 8,
            debugMode: !0,
            debugFlash: !1,
            useConsole: !0,
            consoleOnly: !0,
            waitForWindowLoad: !1,
            bgColor: "#ffffff",
            useHighPerformance: !1,
            flashPollingInterval: null,
            html5PollingInterval: null,
            flashLoadTimeout: 1e3,
            wmode: null,
            allowScriptAccess: "always",
            useFlashBlock: !1,
            useHTML5Audio: !0,
            forceUseGlobalHTML5Audio: !1,
            ignoreMobileRestrictions: !1,
            html5Test: /^(probably|maybe)$/i,
            preferFlash: !1,
            noSWFCache: !1,
            idPrefix: "sound",
            deferSoundCreateHTML5Setup: !1,
          }),
            (this.defaultOptions = {
              autoLoad: !1,
              autoPlay: !1,
              from: null,
              loops: 1,
              onid3: null,
              onerror: null,
              onload: null,
              whileloading: null,
              onplay: null,
              onpause: null,
              onresume: null,
              whileplaying: null,
              onposition: null,
              onstop: null,
              onfinish: null,
              multiShot: !0,
              multiShotEvents: !1,
              position: null,
              pan: 0,
              playbackRate: 1,
              stream: !0,
              to: null,
              type: null,
              usePolicyFile: !1,
              volume: 100,
            }),
            (this.flash9Options = {
              onfailure: null,
              isMovieStar: null,
              usePeakData: !1,
              useWaveformData: !1,
              useEQData: !1,
              onbufferchange: null,
              ondataerror: null,
            }),
            (this.movieStarOptions = {
              bufferTime: 3,
              serverURL: null,
              onconnect: null,
              duration: null,
            }),
            (this.audioFormats = {
              mp3: {
                type: [
                  'audio/mpeg; codecs="mp3"',
                  "audio/mpeg",
                  "audio/mp3",
                  "audio/MPA",
                  "audio/mpa-robust",
                ],
                required: !0,
              },
              mp4: {
                related: ["aac", "m4a", "m4b"],
                type: [
                  'audio/mp4; codecs="mp4a.40.2"',
                  "audio/aac",
                  "audio/x-m4a",
                  "audio/MP4A-LATM",
                  "audio/mpeg4-generic",
                ],
                required: !1,
              },
              ogg: { type: ["audio/ogg; codecs=vorbis"], required: !1 },
              opus: {
                type: ["audio/ogg; codecs=opus", "audio/opus"],
                required: !1,
              },
              wav: {
                type: [
                  'audio/wav; codecs="1"',
                  "audio/wav",
                  "audio/wave",
                  "audio/x-wav",
                ],
                required: !1,
              },
              flac: { type: ["audio/flac"], required: !1 },
            }),
            (this.movieID = "sm2-container"),
            (this.id = e || "sm2movie"),
            (this.debugID = "soundmanager-debug"),
            (this.debugURLParam = /([#?&])debug=1/i),
            (this.versionNumber = "V2.97a.20170601"),
            (this.version = null),
            (this.movieURL = null),
            (this.altURL = null),
            (this.swfLoaded = !1),
            (this.enabled = !1),
            (this.oMC = null),
            (this.sounds = {}),
            (this.soundIDs = []),
            (this.muted = !1),
            (this.didFlashBlock = !1),
            (this.filePattern = null),
            (this.filePatterns = {
              flash8: /\.mp3(\?.*)?$/i,
              flash9: /\.mp3(\?.*)?$/i,
            }),
            (this.features = {
              buffering: !1,
              peakData: !1,
              waveformData: !1,
              eqData: !1,
              movieStar: !1,
            }),
            (this.sandbox = {
              type: null,
              types: {
                remote: "remote (domain-based) rules",
                localWithFile: "local with file access (no internet access)",
                localWithNetwork:
                  "local with network (internet access only, no local access)",
                localTrusted: "local, trusted (local+internet access)",
              },
              description: null,
              noRemote: null,
              noLocal: null,
            }),
            (this.html5 = { usingFlash: null }),
            (this.flash = {}),
            (this.html5Only = !1),
            (this.ignoreFlash = !1);
          let n;
          let r;
          let s;
          let u;
          let c;
          let l;
          let f;
          let d;
          let p;
          let h;
          let y;
          let m;
          let v;
          let g;
          let b;
          let w;
          let _;
          let O;
          let S;
          let P;
          let E;
          let T;
          let k;
          let A;
          let j;
          let L;
          let M;
          let x;
          let R;
          let D;
          let C;
          let I;
          let N;
          let F;
          let B;
          let U;
          let H;
          let V;
          let q;
          let z;
          let W;
          let K;
          let G;
          let $;
          let X;
          let Y;
          let J;
          let Q;
          let Z;
          let tt;
          let et;
          let nt;
          let rt;
          let ot;
          let it;
          let at;
          let st;
          let ut;
          let ct;
          let lt;
          let ft;
          let dt;
          let pt;
          let ht;
          let yt;
          const mt = this;
          let vt = null;
          let gt = null;
          const bt = "soundManager";
          const wt = bt + ": ";
          const _t = navigator.userAgent;
          const Ot = i.location.href.toString();
          const St = document;
          let Pt = [];
          let Et = !0;
          let Tt = !1;
          let kt = !1;
          let At = !1;
          let jt = !1;
          let Lt = !1;
          let Mt = 0;
          const xt = ["log", "info", "warn", "error"];
          let Rt = null;
          let Dt = null;
          let Ct = !1;
          let It = !1;
          let Nt = 0;
          let Ft = null;
          let Bt = [];
          let Ut = null;
          const Ht = Array.prototype.slice;
          let Vt = !1;
          let qt = 0;
          const zt = _t.match(/(ipad|iphone|ipod)/i);
          const Wt = _t.match(/android/i);
          const Kt = _t.match(/msie|trident/i);
          const Gt = _t.match(/webkit/i);
          const $t = _t.match(/safari/i) && !_t.match(/chrome/i);
          const Xt = _t.match(/opera/i);
          const Yt = _t.match(/(mobile|pre\/|xoom)/i) || zt || Wt;

          const Jt =
            !Ot.match(/usehtml5audio/i) &&
            !Ot.match(/sm2-ignorebadua/i) &&
            $t &&
            !_t.match(/silk/i) &&
            _t.match(/OS\sX\s10_6_([3-7])/i);

          const Qt = i.console !== a && console.log !== a;
          let Zt = St.hasFocus !== a ? St.hasFocus() : null;
          let te = $t && (St.hasFocus === a || !St.hasFocus());
          let ee = !te;
          const ne = /(mp3|mp4|mpa|m4a|m4b)/i;
          const re = St.location ? St.location.protocol.match(/http/i) : null;
          const oe = re ? "" : "//";
          const ie = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4|m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i;

          const ae = [
            "mpeg4",
            "aac",
            "flv",
            "mov",
            "mp4",
            "m4v",
            "f4v",
            "m4a",
            "m4b",
            "mp4v",
            "3gp",
            "3g2",
          ];

          const se = new RegExp("\\.(" + ae.join("|") + ")(\\?.*)?$", "i");
          function ue(t) {
            return (
              mt.preferFlash &&
              ut &&
              !mt.ignoreFlash &&
              mt.flash[t] !== a &&
              mt.flash[t]
            );
          }
          function ce(t) {
            return function (e) {
              let n;
              const r = this._s;
              return (
                r && r._a
                  ? (n = t.call(this, e))
                  : (r && r.id
                      ? mt._wD(r.id + ": Ignoring " + e.type)
                      : mt._wD("HTML5::Ignoring " + e.type),
                    (n = null)),
                n
              );
            };
          }
          (this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i),
            (this.useAltURL = !re),
            (H = {
              swfBox: "sm2-object-box",
              swfDefault: "movieContainer",
              swfError: "swf_error",
              swfTimedout: "swf_timedout",
              swfLoaded: "swf_loaded",
              swfUnblocked: "swf_unblocked",
              sm2Debug: "sm2_debug",
              highPerf: "high_performance",
              flashDebug: "flash_debug",
            }),
            (et = [
              null,
              "MEDIA_ERR_ABORTED",
              "MEDIA_ERR_NETWORK",
              "MEDIA_ERR_DECODE",
              "MEDIA_ERR_SRC_NOT_SUPPORTED",
            ]),
            (this.hasHTML5 = (() => {
              try {
                return (
                  Audio !== a &&
                  (Xt && opera !== a && opera.version() < 10
                    ? new Audio(null)
                    : new Audio()
                  ).canPlayType !== a
                );
              } catch (t) {
                return !1;
              }
            })()),
            (this.setup = t => {
              const e = !mt.url;
              return (
                t !== a &&
                  At &&
                  Ut &&
                  mt.ok() &&
                  (t.flashVersion !== a || t.url !== a || t.html5Test !== a) &&
                  W(F("setupLate")),
                y(t),
                Vt ||
                  (Yt
                    ? (mt.setupOptions.ignoreMobileRestrictions &&
                        !mt.setupOptions.forceUseGlobalHTML5Audio) ||
                      (Bt.push(E.globalHTML5), (Vt = !0))
                    : mt.setupOptions.forceUseGlobalHTML5Audio &&
                      (Bt.push(E.globalHTML5), (Vt = !0))),
                !yt &&
                  Yt &&
                  (mt.setupOptions.ignoreMobileRestrictions
                    ? Bt.push(E.ignoreMobile)
                    : ((mt.setupOptions.useHTML5Audio &&
                        !mt.setupOptions.preferFlash) ||
                        mt._wD(E.mobileUA),
                      (mt.setupOptions.useHTML5Audio = !0),
                      (mt.setupOptions.preferFlash = !1),
                      zt
                        ? (mt.ignoreFlash = !0)
                        : ((Wt && !_t.match(/android\s2\.3/i)) || !Wt) &&
                          (mt._wD(E.globalHTML5), (Vt = !0)))),
                t &&
                  (e && j && t.url !== a && mt.beginDelayedInit(),
                  j ||
                    t.url === a ||
                    "complete" !== St.readyState ||
                    setTimeout(k, 1)),
                (yt = !0),
                mt
              );
            }),
            (this.ok = () => {
              return Ut ? At && !jt : mt.useHTML5Audio && mt.hasHTML5;
            }),
            (this.supported = this.ok),
            (this.getMovie = t => {
              return r(t) || St[t] || i[t];
            }),
            (this.createSound = (t, e) => {
              let r, o, i, s = null;
              if (
                ((o =
                  (r = bt + ".createSound(): ") + F(At ? "notOK" : "notReady")),
                !At || !mt.ok())
              )
                return W(o), !1;
              if (
                (e !== a && (t = { id: t, url: e }),
                ((i = h(t)).url = Y(i.url)),
                i.id === a && (i.id = mt.setupOptions.idPrefix + qt++),
                i.id
                  .toString()
                  .charAt(0)
                  .match(/^[0-9]$/) && mt._wD(r + F("badID", i.id), 2),
                mt._wD(r + i.id + (i.url ? " (" + i.url + ")" : ""), 1),
                K(i.id, !0))
              )
                return mt._wD(r + i.id + " exists", 1), mt.sounds[i.id];
              function u() {
                return (
                  (i = q(i)),
                  (mt.sounds[i.id] = new n(i)),
                  mt.soundIDs.push(i.id),
                  mt.sounds[i.id]
                );
              }
              if (Z(i))
                (s = u()),
                  mt.html5Only || mt._wD(i.id + ": Using HTML5"),
                  mt.setupOptions.deferSoundCreateHTML5Setup ||
                    s._setup_html5(i);
              else {
                if (mt.html5Only)
                  return (
                    mt._wD(
                      i.id +
                        ": No HTML5 support for this sound, and no Flash. Exiting."
                    ),
                    u()
                  );
                if (mt.html5.usingFlash && i.url && i.url.match(/data:/i))
                  return (
                    mt._wD(
                      i.id + ": data: URIs not supported via Flash. Exiting."
                    ),
                    u()
                  );
                l > 8 &&
                  (null === i.isMovieStar &&
                    (i.isMovieStar = !!(
                      i.serverURL ||
                      (i.type && i.type.match(ie)) ||
                      (i.url && i.url.match(se))
                    )),
                  i.isMovieStar &&
                    (mt._wD(r + "using MovieStar handling"),
                    i.loops > 1 && d("noNSLoop"))),
                  (i = z(i, r)),
                  (s = u()),
                  8 === l
                    ? gt._createSound(i.id, i.loops || 1, i.usePolicyFile)
                    : (gt._createSound(
                        i.id,
                        i.url,
                        i.usePeakData,
                        i.useWaveformData,
                        i.useEQData,
                        i.isMovieStar,
                        !!i.isMovieStar && i.bufferTime,
                        i.loops || 1,
                        i.serverURL,
                        i.duration || null,
                        i.autoPlay,
                        !0,
                        i.autoLoad,
                        i.usePolicyFile
                      ),
                      i.serverURL ||
                        ((s.connected = !0),
                        i.onconnect && i.onconnect.apply(s))),
                  i.serverURL || (!i.autoLoad && !i.autoPlay) || s.load(i);
              }
              return !i.serverURL && i.autoPlay && s.play(), s;
            }),
            (this.destroySound = (t, e) => {
              if (!K(t)) return !1;
              let n, r = mt.sounds[t];
              for (
                r.stop(), r._iO = {}, r.unload(), n = 0;
                n < mt.soundIDs.length;
                n++
              )
                if (mt.soundIDs[n] === t) {
                  mt.soundIDs.splice(n, 1);
                  break;
                }
              return e || r.destruct(!0), (r = null), delete mt.sounds[t], !0;
            }),
            (this.load = (t, e) => {
              return !!K(t) && mt.sounds[t].load(e);
            }),
            (this.unload = t => {
              return !!K(t) && mt.sounds[t].unload();
            }),
            (this.onPosition = (t, e, n, r) => {
              return !!K(t) && mt.sounds[t].onposition(e, n, r);
            }),
            (this.onposition = this.onPosition),
            (this.clearOnPosition = (t, e, n) => {
              return !!K(t) && mt.sounds[t].clearOnPosition(e, n);
            }),
            (this.play = (t, e) => {
            let n = null;
            const r = e && !(e instanceof Object);
            if (!At || !mt.ok())
              return W(bt + ".play(): " + F(At ? "notOK" : "notReady")), !1;
            if (K(t, r)) r && (e = { url: e });
            else {
              if (!r) return !1;
              r && (e = { url: e }),
                e &&
                  e.url &&
                  (mt._wD(
                    bt + '.play(): Attempting to create "' + t + '"',
                    1
                  ),
                  (e.id = t),
                  (n = mt.createSound(e).play()));
            }
            return null === n && (n = mt.sounds[t].play(e)), n;
          }),
            (this.start = this.play),
            (this.setPlaybackRate = (t, e, n) => {
              return !!K(t) && mt.sounds[t].setPlaybackRate(e, n);
            }),
            (this.setPosition = (t, e) => {
              return !!K(t) && mt.sounds[t].setPosition(e);
            }),
            (this.stop = t => {
              return (
                !!K(t) &&
                (mt._wD(bt + ".stop(" + t + ")", 1), mt.sounds[t].stop())
              );
            }),
            (this.stopAll = () => {
              let t;
              for (t in (mt._wD(bt + ".stopAll()", 1), mt.sounds))
                mt.sounds.hasOwnProperty(t) && mt.sounds[t].stop();
            }),
            (this.pause = t => {
              return !!K(t) && mt.sounds[t].pause();
            }),
            (this.pauseAll = () => {
              let t;
              for (t = mt.soundIDs.length - 1; t >= 0; t--)
                mt.sounds[mt.soundIDs[t]].pause();
            }),
            (this.resume = t => {
              return !!K(t) && mt.sounds[t].resume();
            }),
            (this.resumeAll = () => {
              let t;
              for (t = mt.soundIDs.length - 1; t >= 0; t--)
                mt.sounds[mt.soundIDs[t]].resume();
            }),
            (this.togglePause = t => {
              return !!K(t) && mt.sounds[t].togglePause();
            }),
            (this.setPan = (t, e) => {
              return !!K(t) && mt.sounds[t].setPan(e);
            }),
            (this.setVolume = (t, e) => {
              let n, r;
              if (t !== a && !isNaN(t) && e === a) {
                for (n = 0, r = mt.soundIDs.length; n < r; n++)
                  mt.sounds[mt.soundIDs[n]].setVolume(t);
                return !1;
              }
              return !!K(t) && mt.sounds[t].setVolume(e);
            }),
            (this.mute = t => {
              let e = 0;
              if ((t instanceof String && (t = null), t))
                return (
                  !!K(t) &&
                  (mt._wD(bt + '.mute(): Muting "' + t + '"'),
                  mt.sounds[t].mute())
                );
              for (
                mt._wD(bt + ".mute(): Muting all sounds"),
                  e = mt.soundIDs.length - 1;
                e >= 0;
                e--
              )
                mt.sounds[mt.soundIDs[e]].mute();
              return (mt.muted = !0), !0;
            }),
            (this.muteAll = () => {
              mt.mute();
            }),
            (this.unmute = t => {
              let e;
              if ((t instanceof String && (t = null), t))
                return (
                  !!K(t) &&
                  (mt._wD(bt + '.unmute(): Unmuting "' + t + '"'),
                  mt.sounds[t].unmute())
                );
              for (
                mt._wD(bt + ".unmute(): Unmuting all sounds"),
                  e = mt.soundIDs.length - 1;
                e >= 0;
                e--
              )
                mt.sounds[mt.soundIDs[e]].unmute();
              return (mt.muted = !1), !0;
            }),
            (this.unmuteAll = () => {
              mt.unmute();
            }),
            (this.toggleMute = t => {
              return !!K(t) && mt.sounds[t].toggleMute();
            }),
            (this.getMemoryUse = () => {
              let t = 0;
              return gt && 8 !== l && (t = parseInt(gt._getMemoryUse(), 10)), t;
            }),
            (this.disable = t => {
              let e;
              if ((t === a && (t = !1), jt)) return !1;
              for (
                jt = !0, d("shutdown", 1), e = mt.soundIDs.length - 1;
                e >= 0;
                e--
              )
                C(mt.sounds[mt.soundIDs[e]]);
              return C(mt), p(t), at.remove(i, "load", b), !0;
            }),
            (this.canPlayMIME = t => {
              let e;
              return (
                mt.hasHTML5 && (e = tt({ type: t })),
                !e &&
                  Ut &&
                  (e =
                    t && mt.ok()
                      ? !!((l > 8 && t.match(ie)) || t.match(mt.mimePattern))
                      : null),
                e
              );
            }),
            (this.canPlayURL = t => {
              let e;
              return (
                mt.hasHTML5 && (e = tt({ url: t })),
                !e &&
                  Ut &&
                  (e = t && mt.ok() ? !!t.match(mt.filePattern) : null),
                e
              );
            }),
            (this.canPlayLink = t => {
              return (
                !(t.type === a || !t.type || !mt.canPlayMIME(t.type)) ||
                mt.canPlayURL(t.href)
              );
            }),
            (this.getSoundById = (t, e) => {
              if (!t) return null;
              const n = mt.sounds[t];
              return (
                n ||
                  e ||
                  mt._wD(
                    bt + '.getSoundById(): Sound "' + t + '" not found.',
                    2
                  ),
                n
              );
            }),
            (this.onready = (t, e) => {
              if ("function" !== typeof t) throw F("needFunction", "onready");
              return (
                At && mt._wD(F("queue", "onready")),
                e || (e = i),
                v("onready", t, e),
                g(),
                !0
              );
            }),
            (this.ontimeout = (t, e) => {
              const n = "ontimeout";
              if ("function" !== typeof t) throw F("needFunction", n);
              return (
                At && mt._wD(F("queue", n)),
                e || (e = i),
                v(n, t, e),
                g({ type: n }),
                !0
              );
            }),
            (this._writeDebug = (t, e) => {
              let n, i;
              return (
                !!mt.setupOptions.debugMode &&
                (!!(
                  Qt &&
                  mt.useConsole &&
                  (e && "object" === o(e)
                    ? console.log(t, e)
                    : xt[e] !== a
                    ? console[xt[e]](t)
                    : console.log(t),
                  mt.consoleOnly)
                ) ||
                  (!!(n = r("soundmanager-debug")) &&
                    ((i = St.createElement("div")),
                    ++Mt % 2 === 0 && (i.className = "sm2-alt"),
                    (e = e === a ? 0 : parseInt(e, 10)),
                    i.appendChild(St.createTextNode(t)),
                    e &&
                      (e >= 2 && (i.style.fontWeight = "bold"),
                      3 === e && (i.style.color = "#ff3333")),
                    n.insertBefore(i, n.firstChild),
                    (n = null),
                    !0)))
              );
            }),
            Ot.includes("sm2-debug=alert") &&
              (this._writeDebug = t => {
                i.alert(t);
              }),
            (this._wD = this._writeDebug),
            (this._debug = () => {
              let t, e;
              for (
                d("currentObj", 1), t = 0, e = mt.soundIDs.length;
                t < e;
                t++
              )
                mt.sounds[mt.soundIDs[t]]._debug();
            }),
            (this.reboot = (t, e) => {
              let n, r, o;
              for (
                mt.soundIDs.length &&
                  mt._wD(
                    "Destroying " +
                      mt.soundIDs.length +
                      " SMSound object" +
                      (1 !== mt.soundIDs.length ? "s" : "") +
                      "..."
                  ),
                  n = mt.soundIDs.length - 1;
                n >= 0;
                n--
              )
                mt.sounds[mt.soundIDs[n]].destruct();
              if (gt)
                try {
                  Kt && (Dt = gt.innerHTML),
                    (Rt = gt.parentNode.removeChild(gt));
                } catch (a) {
                  d("badRemove", 2);
                }
              if (
                ((Dt = Rt = Ut = gt = null),
                (mt.enabled = j = At = Ct = It = Tt = kt = jt = Vt = mt.swfLoaded = !1),
                (mt.soundIDs = []),
                (mt.sounds = {}),
                (qt = 0),
                (yt = !1),
                t)
              )
                Pt = [];
              else
                for (n in Pt)
                  if (Pt.hasOwnProperty(n))
                    for (r = 0, o = Pt[n].length; r < o; r++)
                      Pt[n][r].fired = !1;
              return e || mt._wD(bt + ": Rebooting..."),
              (mt.html5 = { usingFlash: null }),
              (mt.flash = {}),
              (mt.html5Only = !1),
              (mt.ignoreFlash = !1),
              i.setTimeout(() => {
                e || mt.beginDelayedInit();
              }, 20),
              mt
            ;
            }),
            (this.reset = () => {
              return d("reset"), mt.reboot(!0, !0);
            }),
            (this.getMoviePercent = () => {
              return gt && "PercentLoaded" in gt ? gt.PercentLoaded() : null;
            }),
            (this.beginDelayedInit = () => {
              (Lt = !0),
                k(),
                setTimeout(() => {
                  return !It && (M(), T(), (It = !0), !0);
                }, 20),
                w();
            }),
            (this.destruct = () => {
              mt._wD(bt + ".destruct()"), mt.disable(!0);
            }),
            (n = function (t) {
            let e;
            let n;
            let r;
            let o;
            let i;
            let s;
            let u;
            let c;
            let p;
            let y;
            const m = this;
            let v = !1;
            let g = [];
            let b = 0;
            let w = null;
            (p = { duration: null, time: null }),
              (this.id = t.id),
              (this.sID = this.id),
              (this.url = t.url),
              (this.options = h(t)),
              (this.instanceOptions = this.options),
              (this._iO = this.instanceOptions),
              (this.pan = this.options.pan),
              (this.volume = this.options.volume),
              (this.isHTML5 = !1),
              (this._a = null),
              (y = !this.url),
              (this.id3 = {}),
              (this._debug = () => {
                mt._wD(m.id + ": Merged options:", m.options);
              }),
              (this.load = t => {
                let e;
                if (
                  (t !== a
                    ? (m._iO = h(t, m.options))
                    : ((t = m.options),
                      (m._iO = t),
                      w &&
                        w !== m.url &&
                        (d("manURL"), (m._iO.url = m.url), (m.url = null))),
                  m._iO.url || (m._iO.url = m.url),
                  (m._iO.url = Y(m._iO.url)),
                  (m.instanceOptions = m._iO),
                  (e = m._iO),
                  mt._wD(m.id + ": load (" + e.url + ")"),
                  !e.url && !m.url)
                )
                  return (
                    mt._wD(m.id + ": load(): url is unassigned. Exiting.", 2),
                    m
                  );
                if (
                  (m.isHTML5 ||
                    8 !== l ||
                    m.url ||
                    e.autoPlay ||
                    mt._wD(
                      m.id +
                        ": Flash 8 load() limitation: Wait for onload() before calling play().",
                      1
                    ),
                  e.url === m.url && 0 !== m.readyState && 2 !== m.readyState)
                )
                  return d("onURL", 1),
                  3 === m.readyState &&
                    e.onload &&
                    ht(m, () => {
                      e.onload.apply(m, [!!m.duration]);
                    }),
                  m
                ;
                if (
                  ((m.loaded = !1),
                  (m.readyState = 1),
                  (m.playState = 0),
                  (m.id3 = {}),
                  Z(e))
                )
                  m._setup_html5(e)._called_load
                    ? mt._wD(m.id + ": Ignoring request to load again")
                    : ((m._html5_canplay = !1),
                      m.url !== e.url &&
                        (mt._wD(d("manURL") + ": " + e.url),
                        (m._a.src = e.url),
                        m.setPosition(0)),
                      (m._a.autobuffer = "auto"),
                      (m._a.preload = "auto"),
                      (m._a._called_load = !0));
                else {
                  if (mt.html5Only)
                    return mt._wD(m.id + ": No flash support. Exiting."), m;
                  if (m._iO.url && m._iO.url.match(/data:/i))
                    return (
                      mt._wD(
                        m.id +
                          ": data: URIs not supported via Flash. Exiting."
                      ),
                      m
                    );
                  try {
                    (m.isHTML5 = !1),
                      (m._iO = z(q(e))),
                      m._iO.autoPlay &&
                        (m._iO.position || m._iO.from) &&
                        (mt._wD(
                          m.id +
                            ": Disabling autoPlay because of non-zero offset case"
                        ),
                        (m._iO.autoPlay = !1)),
                      (e = m._iO),
                      8 === l
                        ? gt._load(
                            m.id,
                            e.url,
                            e.stream,
                            e.autoPlay,
                            e.usePolicyFile
                          )
                        : gt._load(
                            m.id,
                            e.url,
                            !!e.stream,
                            !!e.autoPlay,
                            e.loops || 1,
                            !!e.autoLoad,
                            e.usePolicyFile
                          );
                  } catch (n) {
                    d("smError", 2),
                      f("onload", !1),
                      x({ type: "SMSOUND_LOAD_JS_EXCEPTION", fatal: !0 });
                  }
                }
                return (m.url = e.url), m;
              }),
              (this.unload = () => {
                return (
                  0 !== m.readyState &&
                    (mt._wD(m.id + ": unload()"),
                    m.isHTML5
                      ? (o(), m._a && (m._a.pause(), (w = rt(m._a))))
                      : 8 === l
                      ? gt._unload(m.id, "about:blank")
                      : gt._unload(m.id),
                    e()),
                  m
                );
              }),
              (this.destruct = t => {
                mt._wD(m.id + ": Destruct"),
                  m.isHTML5
                    ? (o(),
                      m._a &&
                        (m._a.pause(),
                        rt(m._a),
                        Vt || r(),
                        (m._a._s = null),
                        (m._a = null)))
                    : ((m._iO.onfailure = null), gt._destroySound(m.id)),
                  t || mt.destroySound(m.id, !0);
              }),
              (this.play = (t, e) => {
                let n, r, o, u, f, d, p = !0;
                if (
                  ((n = m.id + ": play(): "),
                  (e = e === a || e),
                  t || (t = {}),
                  m.url && (m._iO.url = m.url),
                  (m._iO = h(m._iO, m.options)),
                  (m._iO = h(t, m._iO)),
                  (m._iO.url = Y(m._iO.url)),
                  (m.instanceOptions = m._iO),
                  !m.isHTML5 && m._iO.serverURL && !m.connected)
                )
                  return (
                    m.getAutoPlay() ||
                      (mt._wD(
                        n + " Netstream not connected yet - setting autoPlay"
                      ),
                      m.setAutoPlay(!0)),
                    m
                  );
                if (
                  (Z(m._iO) && (m._setup_html5(m._iO), i()),
                  1 === m.playState && !m.paused)
                ) {
                  if (!m._iO.multiShot)
                    return (
                      mt._wD(n + "Already playing (one-shot)", 1),
                      m.isHTML5 && m.setPosition(m._iO.position),
                      m
                    );
                  mt._wD(n + "Already playing (multi-shot)", 1);
                }
                if (
                  (t.url &&
                    t.url !== m.url &&
                    (m.readyState || m.isHTML5 || 8 !== l || !y
                      ? m.load(m._iO)
                      : (y = !1)),
                  m.loaded)
                )
                  mt._wD(n.substr(0, n.lastIndexOf(":")));
                else if (0 === m.readyState) {
                  if (
                    (mt._wD(n + "Attempting to load"),
                    m.isHTML5 || mt.html5Only)
                  ) {
                    if (!m.isHTML5)
                      return mt._wD(n + "Unsupported type. Exiting."), m;
                    m.load(m._iO);
                  } else (m._iO.autoPlay = !0), m.load(m._iO);
                  m.instanceOptions = m._iO;
                } else {
                  if (2 === m.readyState)
                    return mt._wD(n + "Could not load - exiting", 2), m;
                  mt._wD(n + "Loading - attempting to play...");
                }
                return !m.isHTML5 &&
                  9 === l &&
                  m.position > 0 &&
                  m.position === m.duration &&
                  (mt._wD(n + "Sound at end, resetting to position: 0"),
                  (t.position = 0)),
                m.paused &&
                m.position >= 0 &&
                (!m._iO.serverURL || m.position > 0)
                  ? (mt._wD(n + "Resuming from paused state", 1),
                    m.resume())
                  : ((m._iO = h(t, m._iO)),
                    ((!m.isHTML5 &&
                      null !== m._iO.position &&
                      m._iO.position > 0) ||
                      (null !== m._iO.from && m._iO.from > 0) ||
                      null !== m._iO.to) &&
                      0 === m.instanceCount &&
                      0 === m.playState &&
                      !m._iO.serverURL &&
                      ((o = () => {
                        (m._iO = h(t, m._iO)), m.play(m._iO);
                      }),
                      m.isHTML5 && !m._html5_canplay
                        ? (mt._wD(
                            n + "Beginning load for non-zero offset case"
                          ),
                          m.load({ _oncanplay: o }))
                        : m.isHTML5 ||
                          m.loaded ||
                          (m.readyState && 2 === m.readyState) ||
                          (mt._wD(
                            n + "Preloading for non-zero offset case"
                          ),
                          m.load({ onload: o })),
                      (m._iO = c())),
                    (!m.instanceCount ||
                      m._iO.multiShotEvents ||
                      (m.isHTML5 && m._iO.multiShot && !Vt) ||
                      (!m.isHTML5 && l > 8 && !m.getAutoPlay())) &&
                      m.instanceCount++,
                    m._iO.onposition && 0 === m.playState && s(m),
                    (m.playState = 1),
                    (m.paused = !1),
                    (m.position =
                      m._iO.position === a || isNaN(m._iO.position)
                        ? 0
                        : m._iO.position),
                    m.isHTML5 || (m._iO = z(q(m._iO))),
                    m._iO.onplay && e && (m._iO.onplay.apply(m), (v = !0)),
                    m.setVolume(m._iO.volume, !0),
                    m.setPan(m._iO.pan, !0),
                    1 !== m._iO.playbackRate &&
                      m.setPlaybackRate(m._iO.playbackRate),
                    m.isHTML5
                      ? m.instanceCount < 2
                        ? (i(),
                          (r = m._setup_html5()),
                          m.setPosition(m._iO.position),
                          r.play())
                        : (mt._wD(
                            m.id +
                              ": Cloning Audio() for instance #" +
                              m.instanceCount +
                              "..."
                          ),
                          (u = new Audio(m._iO.url)),
                          (f = () => {
                            at.remove(u, "ended", f),
                              m._onfinish(m),
                              rt(u),
                              (u = null);
                          }),
                          (d = () => {
                            at.remove(u, "canplay", d);
                            try {
                              u.currentTime = m._iO.position / 1e3;
                            } catch (t) {
                              W(
                                m.id +
                                  ": multiShot play() failed to apply position of " +
                                  m._iO.position / 1e3
                              );
                            }
                            u.play();
                          }),
                          at.add(u, "ended", f),
                          m._iO.volume !== a &&
                            (u.volume = Math.max(
                              0,
                              Math.min(1, m._iO.volume / 100)
                            )),
                          m.muted && (u.muted = !0),
                          m._iO.position
                            ? at.add(u, "canplay", d)
                            : u.play())
                      : ((p = gt._start(
                          m.id,
                          m._iO.loops || 1,
                          9 === l ? m.position : m.position / 1e3,
                          m._iO.multiShot || !1
                        )),
                        9 !== l ||
                          p ||
                          (mt._wD(
                            n +
                              "No sound hardware, or 32-sound ceiling hit",
                            2
                          ),
                          m._iO.onplayerror &&
                            m._iO.onplayerror.apply(m)))),
                m
              ;
              }),
              (this.start = this.play),
              (this.stop = t => {
              let e;
              const n = m._iO;
              return (
                1 === m.playState &&
                  (mt._wD(m.id + ": stop()"),
                  m._onbufferchange(0),
                  m._resetOnPosition(0),
                  (m.paused = !1),
                  m.isHTML5 || (m.playState = 0),
                  u(),
                  n.to && m.clearOnPosition(n.to),
                  m.isHTML5
                    ? m._a &&
                      ((e = m.position),
                      m.setPosition(0),
                      (m.position = e),
                      m._a.pause(),
                      (m.playState = 0),
                      m._onTimer(),
                      o())
                    : (gt._stop(m.id, t), n.serverURL && m.unload()),
                  (m.instanceCount = 0),
                  (m._iO = {}),
                  n.onstop && n.onstop.apply(m)),
                m
              );
            }),
              (this.setAutoPlay = t => {
                mt._wD(m.id + ": Autoplay turned " + (t ? "on" : "off")),
                  (m._iO.autoPlay = t),
                  m.isHTML5 ||
                    (gt._setAutoPlay(m.id, t),
                    t &&
                      (m.instanceCount ||
                        1 !== m.readyState ||
                        (m.instanceCount++,
                        mt._wD(
                          m.id +
                            ": Incremented instance count to " +
                            m.instanceCount
                        ))));
              }),
              (this.getAutoPlay = () => {
                return m._iO.autoPlay;
              }),
              (this.setPlaybackRate = t => {
                const e = Math.max(0.5, Math.min(4, t));
                if (
                  (e !== t &&
                    mt._wD(
                      m.id +
                        ": setPlaybackRate(" +
                        t +
                        "): limiting rate to " +
                        e,
                      2
                    ),
                  m.isHTML5)
                )
                  try {
                    (m._iO.playbackRate = e), (m._a.playbackRate = e);
                  } catch (n) {
                    mt._wD(
                      m.id +
                        ": setPlaybackRate(" +
                        e +
                        ") failed: " +
                        n.message,
                      2
                    );
                  }
                return m;
              }),
              (this.setPosition = t => {
              t === a && (t = 0);
              let e;
              let n;

              const r = m.isHTML5
                ? Math.max(t, 0)
                : Math.min(m.duration || m._iO.duration, Math.max(t, 0));

              if (
                ((m.position = r),
                (n = m.position / 1e3),
                m._resetOnPosition(m.position),
                (m._iO.position = r),
                m.isHTML5)
              ) {
                if (m._a) {
                  if (m._html5_canplay) {
                    if (m._a.currentTime.toFixed(3) !== n.toFixed(3)) {
                      mt._wD(m.id + ": setPosition(" + n + ")");
                      try {
                        (m._a.currentTime = n),
                          (0 === m.playState || m.paused) && m._a.pause();
                      } catch (o) {
                        mt._wD(
                          m.id +
                            ": setPosition(" +
                            n +
                            ") failed: " +
                            o.message,
                          2
                        );
                      }
                    }
                  } else if (n)
                    return (
                      mt._wD(
                        m.id +
                          ": setPosition(" +
                          n +
                          "): Cannot seek yet, sound not ready",
                        2
                      ),
                      m
                    );
                  m.paused && m._onTimer(!0);
                }
              } else
                (e = 9 === l ? m.position : n),
                  m.readyState &&
                    2 !== m.readyState &&
                    gt._setPosition(
                      m.id,
                      e,
                      m.paused || !m.playState,
                      m._iO.multiShot
                    );
              return m;
            }),
              (this.pause = t => {
                return (
                  m.paused ||
                    (0 === m.playState && 1 !== m.readyState) ||
                    (mt._wD(m.id + ": pause()"),
                    (m.paused = !0),
                    m.isHTML5
                      ? (m._setup_html5().pause(), o())
                      : (t || t === a) && gt._pause(m.id, m._iO.multiShot),
                    m._iO.onpause && m._iO.onpause.apply(m)),
                  m
                );
              }),
              (this.resume = () => {
                const t = m._iO;
                return m.paused
                  ? (mt._wD(m.id + ": resume()"),
                    (m.paused = !1),
                    (m.playState = 1),
                    m.isHTML5
                      ? (m._setup_html5().play(), i())
                      : (t.isMovieStar &&
                          !t.serverURL &&
                          m.setPosition(m.position),
                        gt._pause(m.id, t.multiShot)),
                    !v && t.onplay
                      ? (t.onplay.apply(m), (v = !0))
                      : t.onresume && t.onresume.apply(m),
                    m)
                  : m;
              }),
              (this.togglePause = () => {
                return (
                  mt._wD(m.id + ": togglePause()"),
                  0 === m.playState
                    ? (m.play({
                        position:
                          9 !== l || m.isHTML5
                            ? m.position / 1e3
                            : m.position,
                      }),
                      m)
                    : (m.paused ? m.resume() : m.pause(), m)
                );
              }),
              (this.setPan = (t, e) => {
                return (
                  t === a && (t = 0),
                  e === a && (e = !1),
                  m.isHTML5 || gt._setPan(m.id, t),
                  (m._iO.pan = t),
                  e || ((m.pan = t), (m.options.pan = t)),
                  m
                );
              }),
              (this.setVolume = (t, e) => {
                return (
                  t === a && (t = 100),
                  e === a && (e = !1),
                  m.isHTML5
                    ? m._a &&
                      (mt.muted &&
                        !m.muted &&
                        ((m.muted = !0), (m._a.muted = !0)),
                      (m._a.volume = Math.max(0, Math.min(1, t / 100))))
                    : gt._setVolume(
                        m.id,
                        (mt.muted && !m.muted) || m.muted ? 0 : t
                      ),
                  (m._iO.volume = t),
                  e || ((m.volume = t), (m.options.volume = t)),
                  m
                );
              }),
              (this.mute = () => {
                return (
                  (m.muted = !0),
                  m.isHTML5
                    ? m._a && (m._a.muted = !0)
                    : gt._setVolume(m.id, 0),
                  m
                );
              }),
              (this.unmute = () => {
                m.muted = !1;
                const t = m._iO.volume !== a;
                return (
                  m.isHTML5
                    ? m._a && (m._a.muted = !1)
                    : gt._setVolume(
                        m.id,
                        t ? m._iO.volume : m.options.volume
                      ),
                  m
                );
              }),
              (this.toggleMute = () => {
                return m.muted ? m.unmute() : m.mute();
              }),
              (this.onPosition = (t, e, n) => {
                return (
                  g.push({
                    position: parseInt(t, 10),
                    method: e,
                    scope: n !== a ? n : m,
                    fired: !1,
                  }),
                  m
                );
              }),
              (this.onposition = this.onPosition),
              (this.clearOnPosition = (t, e) => {
                let n;
                if (((t = parseInt(t, 10)), !isNaN(t)))
                  for (n = 0; n < g.length; n++)
                    t === g[n].position &&
                      ((e && e !== g[n].method) ||
                        (g[n].fired && b--, g.splice(n, 1)));
              }),
              (this._processOnPosition = () => {
                let t, e, n = g.length;
                if (!n || !m.playState || b >= n) return !1;
                for (t = n - 1; t >= 0; t--)
                  !(e = g[t]).fired &&
                    m.position >= e.position &&
                    ((e.fired = !0),
                    b++,
                    e.method.apply(e.scope, [e.position]),
                    (n = g.length));
                return !0;
              }),
              (this._resetOnPosition = t => {
              let e;
              let n;
              const r = g.length;
              if (!r) return !1;
              for (e = r - 1; e >= 0; e--)
                (n = g[e]).fired &&
                  t <= n.position &&
                  ((n.fired = !1), b--);
              return !0;
            }),
              (c = () => {
              let t;
              let e;
              const n = m._iO;
              const r = n.from;
              const o = n.to;
              return (e = () => {
                mt._wD(m.id + ': "To" time of ' + o + " reached."),
                  m.clearOnPosition(o, e),
                  m.stop();
              }),
              (t = () => {
                mt._wD(m.id + ': Playing "from" ' + r),
                  null === o || isNaN(o) || m.onPosition(o, e);
              }),
              null === r ||
                isNaN(r) ||
                ((n.position = r), (n.multiShot = !1), t()),
              n
            ;
            }),
              (s = () => {
              let t;
              const e = m._iO.onposition;
              if (e)
                for (t in e)
                  e.hasOwnProperty(t) &&
                    m.onPosition(parseInt(t, 10), e[t]);
            }),
              (u = () => {
              let t;
              const e = m._iO.onposition;
              if (e)
                for (t in e)
                  e.hasOwnProperty(t) && m.clearOnPosition(parseInt(t, 10));
            }),
              (i = () => {
                m.isHTML5 && G(m);
              }),
              (o = () => {
                m.isHTML5 && $(m);
              }),
              (e = t => {
                t || ((g = []), (b = 0)),
                  (v = !1),
                  (m._hasTimer = null),
                  (m._a = null),
                  (m._html5_canplay = !1),
                  (m.bytesLoaded = null),
                  (m.bytesTotal = null),
                  (m.duration =
                    m._iO && m._iO.duration ? m._iO.duration : null),
                  (m.durationEstimate = null),
                  (m.buffered = []),
                  (m.eqData = []),
                  (m.eqData.left = []),
                  (m.eqData.right = []),
                  (m.failures = 0),
                  (m.isBuffering = !1),
                  (m.instanceOptions = {}),
                  (m.instanceCount = 0),
                  (m.loaded = !1),
                  (m.metadata = {}),
                  (m.readyState = 0),
                  (m.muted = !1),
                  (m.paused = !1),
                  (m.peakData = { left: 0, right: 0 }),
                  (m.waveformData = { left: [], right: [] }),
                  (m.playState = 0),
                  (m.position = null),
                  (m.id3 = {});
              })(),
              (this._onTimer = t => {
              let e;
              let n;
              let r = !1;
              const o = {};
              return (
                (m._hasTimer || t) &&
                  m._a &&
                  (t ||
                    ((m.playState > 0 || 1 === m.readyState) &&
                      !m.paused)) &&
                  ((e = m._get_html5_duration()) !== p.duration &&
                    ((p.duration = e), (m.duration = e), (r = !0)),
                  (m.durationEstimate = m.duration),
                  (n = 1e3 * m._a.currentTime || 0) !== p.time &&
                    ((p.time = n), (r = !0)),
                  (r || t) && m._whileplaying(n, o, o, o, o)),
                r
              );
            }),
              (this._get_html5_duration = () => {
                const t = m._iO,
                      e =
                        m._a && m._a.duration
                          ? 1e3 * m._a.duration
                          : t && t.duration
                          ? t.duration
                          : null;
                return e && !isNaN(e) && e !== 1 / 0 ? e : null;
              }),
              (this._apply_loop = (t, e) => {
                !t.loop &&
                  e > 1 &&
                  mt._wD("Note: Native HTML5 looping is infinite.", 1),
                  (t.loop = e > 1 ? "loop" : "");
              }),
              (this._setup_html5 = t => {
              let r;
              const o = h(m._iO, t);
              let i = Vt ? vt : m._a;
              const a = decodeURI(o.url);
              if (
                (Vt
                  ? a === decodeURI(st) && (r = !0)
                  : a === decodeURI(w) && (r = !0),
                i)
              ) {
                if (i._s)
                  if (Vt) i._s && i._s.playState && !r && i._s.stop();
                  else if (!Vt && a === decodeURI(w))
                    return m._apply_loop(i, o.loops), i;
                r ||
                  (w && e(!1),
                  (i.src = o.url),
                  (m.url = o.url),
                  (w = o.url),
                  (st = o.url),
                  (i._called_load = !1));
              } else
                o.autoLoad || o.autoPlay
                  ? ((m._a = new Audio(o.url)), m._a.load())
                  : (m._a =
                      Xt && opera.version() < 10
                        ? new Audio(null)
                        : new Audio()),
                  ((i = m._a)._called_load = !1),
                  Vt && (vt = i);
              return (
                (m.isHTML5 = !0),
                (m._a = i),
                (i._s = m),
                n(),
                m._apply_loop(i, o.loops),
                o.autoLoad || o.autoPlay
                  ? m.load()
                  : ((i.autobuffer = !1), (i.preload = "auto")),
                i
              );
            }),
              (n = () => {
                if (m._a._added_events) return !1;
                let t, e, n, r;
                for (t in ((m._a._added_events = !0), ft))
                  ft.hasOwnProperty(t) &&
                    ((e = t),
                    (n = ft[t]),
                    (r = void 0),
                    m._a && m._a.addEventListener(e, n, r || !1));
                return !0;
              }),
              (r = () => {
                let t, e, n, r;
                for (t in (mt._wD(m.id + ": Removing event listeners"),
                (m._a._added_events = !1),
                ft))
                  ft.hasOwnProperty(t) &&
                    ((e = t),
                    (n = ft[t]),
                    (r = void 0),
                    m._a && m._a.removeEventListener(e, n, r || !1));
              }),
              (this._onload = t => {
              let e;
              const n = !!t || (!m.isHTML5 && 8 === l && m.duration);
              return (e = m.id + ": "),
              mt._wD(
                e +
                  (n
                    ? "onload()"
                    : "Failed to load / invalid sound?" +
                      (m.duration
                        ? " -"
                        : " Zero-length duration reported.") +
                      " (" +
                      m.url +
                      ")"),
                n ? 1 : 2
              ),
              n ||
                m.isHTML5 ||
                (!0 === mt.sandbox.noRemote && mt._wD(e + F("noNet"), 1),
                !0 === mt.sandbox.noLocal && mt._wD(e + F("noLocal"), 1)),
              (m.loaded = n),
              (m.readyState = n ? 3 : 2),
              m._onbufferchange(0),
              n || m.isHTML5 || m._onerror(),
              m._iO.onload &&
                ht(m, () => {
                  m._iO.onload.apply(m, [n]);
                }),
              !0
            ;
            }),
              (this._onerror = (t, e) => {
                m._iO.onerror &&
                  ht(m, () => {
                    m._iO.onerror.apply(m, [t, e]);
                  });
              }),
              (this._onbufferchange = t => {
                return (
                  0 !== m.playState &&
                  !((t && m.isBuffering) || (!t && !m.isBuffering)) &&
                  ((m.isBuffering = 1 === t),
                  m._iO.onbufferchange &&
                    (mt._wD(m.id + ": Buffer state change: " + t),
                    m._iO.onbufferchange.apply(m, [t])),
                  !0)
                );
              }),
              (this._onsuspend = () => {
                return (
                  m._iO.onsuspend &&
                    (mt._wD(m.id + ": Playback suspended"),
                    m._iO.onsuspend.apply(m)),
                  !0
                );
              }),
              (this._onfailure = (t, e, n) => {
                m.failures++,
                  mt._wD(m.id + ": Failure (" + m.failures + "): " + t),
                  m._iO.onfailure && 1 === m.failures
                    ? m._iO.onfailure(t, e, n)
                    : mt._wD(m.id + ": Ignoring failure");
              }),
              (this._onwarning = (t, e, n) => {
                m._iO.onwarning && m._iO.onwarning(t, e, n);
              }),
              (this._onfinish = () => {
                const t = m._iO.onfinish;
                m._onbufferchange(0),
                  m._resetOnPosition(0),
                  m.instanceCount &&
                    (m.instanceCount--,
                    m.instanceCount ||
                      (u(),
                      (m.playState = 0),
                      (m.paused = !1),
                      (m.instanceCount = 0),
                      (m.instanceOptions = {}),
                      (m._iO = {}),
                      o(),
                      m.isHTML5 && (m.position = 0)),
                    (m.instanceCount && !m._iO.multiShotEvents) ||
                      (t &&
                        (mt._wD(m.id + ": onfinish()"),
                        ht(m, () => {
                          t.apply(m);
                        }))));
              }),
              (this._whileloading = (t, e, n, r) => {
                const o = m._iO;
                (m.bytesLoaded = t),
                  (m.bytesTotal = e),
                  (m.duration = Math.floor(n)),
                  (m.bufferLength = r),
                  m.isHTML5 || o.isMovieStar
                    ? (m.durationEstimate = m.duration)
                    : o.duration
                    ? (m.durationEstimate =
                        m.duration > o.duration ? m.duration : o.duration)
                    : (m.durationEstimate = parseInt(
                        (m.bytesTotal / m.bytesLoaded) * m.duration,
                        10
                      )),
                  m.isHTML5 || (m.buffered = [{ start: 0, end: m.duration }]),
                  (3 !== m.readyState || m.isHTML5) &&
                    o.whileloading &&
                    o.whileloading.apply(m);
              }),
              (this._whileplaying = (t, e, n, r, o) => {
              let i;
              const s = m._iO;
              return (
                !isNaN(t) &&
                null !== t &&
                ((m.position = Math.max(0, t)),
                m._processOnPosition(),
                !m.isHTML5 &&
                  l > 8 &&
                  (s.usePeakData &&
                    e !== a &&
                    e &&
                    (m.peakData = { left: e.leftPeak, right: e.rightPeak }),
                  s.useWaveformData &&
                    n !== a &&
                    n &&
                    (m.waveformData = {
                      left: n.split(","),
                      right: r.split(","),
                    }),
                  s.useEQData &&
                    o !== a &&
                    o &&
                    o.leftEQ &&
                    ((i = o.leftEQ.split(",")),
                    (m.eqData = i),
                    (m.eqData.left = i),
                    o.rightEQ !== a &&
                      o.rightEQ &&
                      (m.eqData.right = o.rightEQ.split(",")))),
                1 === m.playState &&
                  (m.isHTML5 ||
                    8 !== l ||
                    m.position ||
                    !m.isBuffering ||
                    m._onbufferchange(0),
                  s.whileplaying && s.whileplaying.apply(m)),
                !0)
              );
            }),
              (this._oncaptiondata = t => {
                mt._wD(m.id + ": Caption data received."),
                  (m.captiondata = t),
                  m._iO.oncaptiondata && m._iO.oncaptiondata.apply(m, [t]);
              }),
              (this._onmetadata = (t, e) => {
              mt._wD(m.id + ": Metadata received.");
              let n;
              let r;
              const o = {};
              for (n = 0, r = t.length; n < r; n++) o[t[n]] = e[n];
              (m.metadata = o),
                m._iO.onmetadata && m._iO.onmetadata.call(m, m.metadata);
            }),
              (this._onid3 = (t, e) => {
              mt._wD(m.id + ": ID3 data received.");
              let n;
              let r;
              const o = [];
              for (n = 0, r = t.length; n < r; n++) o[t[n]] = e[n];
              (m.id3 = h(m.id3, o)), m._iO.onid3 && m._iO.onid3.apply(m);
            }),
              (this._onconnect = t => {
                (t = 1 === t),
                  mt._wD(
                    m.id +
                      ": " +
                      (t ? "Connected." : "Failed to connect? - " + m.url),
                    t ? 1 : 2
                  ),
                  (m.connected = t),
                  t &&
                    ((m.failures = 0),
                    K(m.id) &&
                      (m.getAutoPlay()
                        ? m.play(a, m.getAutoPlay())
                        : m._iO.autoLoad && m.load()),
                    m._iO.onconnect && m._iO.onconnect.apply(m, [t]));
              }),
              (this._ondataerror = t => {
                m.playState > 0 &&
                  (mt._wD(m.id + ": Data error: " + t),
                  m._iO.ondataerror && m._iO.ondataerror.apply(m));
              }),
              this._debug();
          }),
            (L = () => {
              return St.body || St.getElementsByTagName("div")[0];
            }),
            (r = t => {
              return St.getElementById(t);
            }),
            (h = (t, e) => {
            let n;
            let r;
            const i = t || {};
            for (r in (n = e === a ? mt.defaultOptions : e))
              n.hasOwnProperty(r) &&
                i[r] === a &&
                ("object" !== o(n[r]) || null === n[r]
                  ? (i[r] = n[r])
                  : (i[r] = h(i[r], n[r])));
            return i;
          }),
            (ht = (t, e) => {
              t.isHTML5 || 8 !== l ? e() : i.setTimeout(e, 0);
            }),
            (m = {
              onready: 1,
              ontimeout: 1,
              defaultOptions: 1,
              flash9Options: 1,
              movieStarOptions: 1,
            }),
            (y = (t, e) => {
            let n;
            let r = !0;
            const i = e !== a;
            const s = mt.setupOptions;
            const u = m;
            if (t === a) {
              for (n in ((r = []), s)) s.hasOwnProperty(n) && r.push(n);
              for (n in u)
                u.hasOwnProperty(n) &&
                  ("object" === o(mt[n])
                    ? r.push(n + ": {...}")
                    : mt[n] instanceof Function
                    ? r.push(n + ": function() {...}")
                    : r.push(n));
              return mt._wD(F("setup", r.join(", "))), !1;
            }
            for (n in t)
              if (t.hasOwnProperty(n))
                if (
                  "object" !== o(t[n]) ||
                  null === t[n] ||
                  t[n] instanceof Array ||
                  t[n] instanceof RegExp
                )
                  i && u[e] !== a
                    ? (mt[e][n] = t[n])
                    : s[n] !== a
                    ? ((mt.setupOptions[n] = t[n]), (mt[n] = t[n]))
                    : u[n] === a
                    ? (W(F(mt[n] === a ? "setupUndef" : "setupError", n), 2),
                      (r = !1))
                    : mt[n] instanceof Function
                    ? mt[n].apply(mt, t[n] instanceof Array ? t[n] : [t[n]])
                    : (mt[n] = t[n]);
                else {
                  if (u[n] !== a) return y(t[n], n);
                  W(F(mt[n] === a ? "setupUndef" : "setupError", n), 2),
                    (r = !1);
                }
            return r;
          }),
            (at = (() => {
              const t = i.attachEvent,
                    e = {
                      add: t ? "attachEvent" : "addEventListener",
                      remove: t ? "detachEvent" : "removeEventListener",
                    };
              function n(e) {
                const n = Ht.call(e), r = n.length;
                return (
                  t
                    ? ((n[1] = "on" + n[1]), r > 3 && n.pop())
                    : 3 === r && n.push(!1),
                  n
                );
              }
              function r(n, r) {
                const o = n.shift(), i = [e[r]];
                t ? o[i](n[0], n[1]) : o[i].apply(o, n);
              }
              return {
                add() {
                  r(n(arguments), "add");
                },
                remove() {
                  r(n(arguments), "remove");
                },
              };
            })()),
            (ft = {
              abort: ce(function () {
                mt._wD(this._s.id + ": abort");
              }),
              canplay: ce(function () {
                let t;
                const e = this._s;
                if (!e._html5_canplay) {
                  if (
                    ((e._html5_canplay = !0),
                    mt._wD(e.id + ": canplay"),
                    e._onbufferchange(0),
                    (t =
                      e._iO.position === a || isNaN(e._iO.position)
                        ? null
                        : e._iO.position / 1e3),
                    this.currentTime !== t)
                  ) {
                    mt._wD(e.id + ": canplay: Setting position to " + t);
                    try {
                      this.currentTime = t;
                    } catch (n) {
                      mt._wD(
                        e.id +
                          ": canplay: Setting position of " +
                          t +
                          " failed: " +
                          n.message,
                        2
                      );
                    }
                  }
                  e._iO._oncanplay && e._iO._oncanplay();
                }
              }),
              canplaythrough: ce(function () {
                const t = this._s;
                t.loaded ||
                  (t._onbufferchange(0),
                  t._whileloading(
                    t.bytesLoaded,
                    t.bytesTotal,
                    t._get_html5_duration()
                  ),
                  t._onload(!0));
              }),
              durationchange: ce(function () {
                let t;
                const e = this._s;
                (t = e._get_html5_duration()),
                  isNaN(t) ||
                    t === e.duration ||
                    (mt._wD(
                      this._s.id +
                        ": durationchange (" +
                        t +
                        ")" +
                        (e.duration ? ", previously " + e.duration : "")
                    ),
                    (e.durationEstimate = e.duration = t));
              }),
              ended: ce(function () {
                const t = this._s;
                mt._wD(t.id + ": ended"), t._onfinish();
              }),
              error: ce(function () {
                const t = et[this.error.code] || null;
                mt._wD(
                  this._s.id +
                    ": HTML5 error, code " +
                    this.error.code +
                    (t ? " (" + t + ")" : "")
                ),
                  this._s._onload(!1),
                  this._s._onerror(this.error.code, t);
              }),
              loadeddata: ce(function () {
                const t = this._s;
                mt._wD(t.id + ": loadeddata"),
                  t._loaded || $t || (t.duration = t._get_html5_duration());
              }),
              loadedmetadata: ce(function () {
                mt._wD(this._s.id + ": loadedmetadata");
              }),
              loadstart: ce(function () {
                mt._wD(this._s.id + ": loadstart"), this._s._onbufferchange(1);
              }),
              play: ce(function () {
                this._s._onbufferchange(0);
              }),
              playing: ce(function () {
                mt._wD(this._s.id + ": playing " + String.fromCharCode(9835)),
                  this._s._onbufferchange(0);
              }),
              progress: ce(function (t) {
                let e;
                let n;
                let r;
                const o = this._s;
                let i = 0;
                const a = "progress" === t.type;
                const s = t.target.buffered;
                let u = t.loaded || 0;
                const c = t.total || 1;
                if (((o.buffered = []), s && s.length)) {
                  for (e = 0, n = s.length; e < n; e++)
                    o.buffered.push({
                      start: 1e3 * s.start(e),
                      end: 1e3 * s.end(e),
                    });
                  if (
                    ((i = 1e3 * (s.end(0) - s.start(0))),
                    (u = Math.min(1, i / (1e3 * t.target.duration))),
                    a && s.length > 1)
                  ) {
                    for (r = [], n = s.length, e = 0; e < n; e++)
                      r.push(
                        1e3 * t.target.buffered.start(e) +
                          "-" +
                          1e3 * t.target.buffered.end(e)
                      );
                    mt._wD(
                      this._s.id + ": progress, timeRanges: " + r.join(", ")
                    );
                  }
                  a &&
                    !isNaN(u) &&
                    mt._wD(
                      this._s.id +
                        ": progress, " +
                        Math.floor(100 * u) +
                        "% loaded"
                    );
                }
                isNaN(u) ||
                  (o._whileloading(u, c, o._get_html5_duration()),
                  u && c && u === c && ft.canplaythrough.call(this, t));
              }),
              ratechange: ce(function () {
                mt._wD(this._s.id + ": ratechange");
              }),
              suspend: ce(function (t) {
                const e = this._s;
                mt._wD(this._s.id + ": suspend"),
                  ft.progress.call(this, t),
                  e._onsuspend();
              }),
              stalled: ce(function () {
                mt._wD(this._s.id + ": stalled");
              }),
              timeupdate: ce(function () {
                this._s._onTimer();
              }),
              waiting: ce(function () {
                const t = this._s;
                mt._wD(this._s.id + ": waiting"), t._onbufferchange(1);
              }),
            }),
            (Z = t => {
              return (
                !(!t || !(t.type || t.url || t.serverURL)) &&
                !(t.serverURL || (t.type && ue(t.type))) &&
                (t.type
                  ? tt({ type: t.type })
                  : tt({ url: t.url }) || mt.html5Only || t.url.match(/data:/i))
              );
            }),
            (rt = t => {
              let e;
              return (
                t &&
                  ((e = $t
                    ? "about:blank"
                    : mt.html5.canPlayType("audio/wav")
                    ? "data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w=="
                    : "about:blank"),
                  (t.src = e),
                  t._called_unload !== a && (t._called_load = !1)),
                Vt && (st = null),
                e
              );
            }),
            (tt = t => {
            if (!mt.useHTML5Audio || !mt.hasHTML5) return !1;
            let e;
            let n;
            let r;
            let o;
            const i = t.url || null;
            let s = t.type || null;
            const u = mt.audioFormats;
            if (s && mt.html5[s] !== a) return mt.html5[s] && !ue(s);
            if (!nt) {
              for (o in ((nt = []), u))
                u.hasOwnProperty(o) &&
                  (nt.push(o),
                  u[o].related && (nt = nt.concat(u[o].related)));
              nt = new RegExp("\\.(" + nt.join("|") + ")(\\?.*)?$", "i");
            }
            return (
              (r = i ? i.toLowerCase().match(nt) : null) && r.length
                ? (r = r[1])
                : s
                ? (r = (-1 !== (n = s.indexOf(";"))
                    ? s.substr(0, n)
                    : s
                  ).substr(6))
                : (e = !1),
              r && mt.html5[r] !== a
                ? (e = mt.html5[r] && !ue(r))
                : ((s = "audio/" + r),
                  (e = mt.html5.canPlayType({ type: s })),
                  (mt.html5[r] = e),
                  (e = e && mt.html5[s] && !ue(s))),
              e
            );
          }),
            (it = () => {
            if (!mt.useHTML5Audio || !mt.hasHTML5)
              return (mt.html5.usingFlash = !0), (Ut = !0), !1;
            let t;
            let e;
            let n;
            let r;

            const o =
              Audio !== a
                ? Xt && opera.version() < 10
                  ? new Audio(null)
                  : new Audio()
                : null;

            const i = {};
            function s(t) {
              let e, n, i = !1, a = !1;
              if (!o || "function" !== typeof o.canPlayType) return i;
              if (t instanceof Array) {
                for (r = 0, n = t.length; r < n; r++)
                  (mt.html5[t[r]] ||
                    o.canPlayType(t[r]).match(mt.html5Test)) &&
                    ((a = !0),
                    (mt.html5[t[r]] = !0),
                    (mt.flash[t[r]] = !!t[r].match(ne)));
                i = a;
              } else
                i = !(
                  !(e =
                    !(!o || "function" !== typeof o.canPlayType) &&
                    o.canPlayType(t)) || !e.match(mt.html5Test)
                );
              return i;
            }
            for (t in (n = mt.audioFormats))
              if (
                n.hasOwnProperty(t) &&
                ((e = "audio/" + t),
                (i[t] = s(n[t].type)),
                (i[e] = i[t]),
                t.match(ne)
                  ? ((mt.flash[t] = !0), (mt.flash[e] = !0))
                  : ((mt.flash[t] = !1), (mt.flash[e] = !1)),
                n[t] && n[t].related)
              )
                for (r = n[t].related.length - 1; r >= 0; r--)
                  (i["audio/" + n[t].related[r]] = i[t]),
                    (mt.html5[n[t].related[r]] = i[t]),
                    (mt.flash[n[t].related[r]] = i[t]);
            return (
              (i.canPlayType = o ? s : null),
              (mt.html5 = h(mt.html5, i)),
              (mt.html5.usingFlash = Q()),
              (Ut = mt.html5.usingFlash),
              !0
            );
          }),
            (E = {
              notReady: "Unavailable - wait until onready() has fired.",
              notOK: "Audio support is not available.",
              domError: bt + "exception caught while appending SWF to DOM.",
              spcWmode: "Removing wmode, preventing known SWF loading issue(s)",
              swf404: wt + "Verify that %s is a valid path.",
              tryDebug:
                "Try " +
                bt +
                ".debugFlash = true for more security details (output goes to SWF.)",
              checkSWF: "See SWF output for more debug info.",
              localFail:
                wt +
                "Non-HTTP page (" +
                St.location.protocol +
                " URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
              waitFocus:
                wt +
                "Special case: Waiting for SWF to load with window focus...",
              waitForever:
                wt +
                "Waiting indefinitely for Flash (will recover if unblocked)...",
              waitSWF: wt + "Waiting for 100% SWF load...",
              needFunction: wt + "Function object expected for %s",
              badID:
                'Sound ID "%s" should be a string, starting with a non-numeric character',
              currentObj: wt + "_debug(): Current sound objects",
              waitOnload: wt + "Waiting for window.onload()",
              docLoaded: wt + "Document already loaded",
              onload: wt + "initComplete(): calling soundManager.onload()",
              onloadOK: bt + ".onload() complete",
              didInit: wt + "init(): Already called?",
              secNote:
                "Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
              badRemove: wt + "Failed to remove Flash node.",
              shutdown: bt + ".disable(): Shutting down",
              queue: wt + "Queueing %s handler",
              smError:
                "SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
              fbTimeout:
                "No flash response, applying ." + H.swfTimedout + " CSS...",
              fbLoaded: "Flash loaded",
              fbHandler: wt + "flashBlockHandler()",
              manURL: "SMSound.load(): Using manually-assigned URL",
              onURL: bt + ".load(): current URL already assigned.",
              badFV:
                bt +
                '.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
              as2loop:
                "Note: Setting stream:false so looping can work (flash 8 limitation)",
              noNSLoop: "Note: Looping not implemented for MovieStar formats",
              needfl9: "Note: Switching to flash 9, required for MP4 formats.",
              mfTimeout:
                "Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
              needFlash:
                wt +
                "Fatal error: Flash is needed to play some required formats, but is not available.",
              gotFocus: wt + "Got window focus.",
              policy: "Enabling usePolicyFile for data access",
              setup: bt + ".setup(): allowed parameters: %s",
              setupError:
                bt + '.setup(): "%s" cannot be assigned with this method.',
              setupUndef: bt + '.setup(): Could not find option "%s"',
              setupLate:
                bt +
                ".setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
              noURL:
                wt +
                "Flash URL required. Call soundManager.setup({url:...}) to get started.",
              sm2Loaded: "SoundManager 2: Ready. " + String.fromCharCode(10003),
              reset: bt + ".reset(): Removing event callbacks",
              mobileUA: "Mobile UA detected, preferring HTML5 by default.",
              globalHTML5:
                "Using singleton HTML5 Audio() pattern for this device.",
              ignoreMobile: "Ignoring mobile restrictions for this device.",
            }),
            (F = function () {
              let t, e, n, r, o;
              if (
                ((r = (t = Ht.call(arguments)).shift()),
                (o = E && E[r] ? E[r] : "") && t && t.length)
              )
                for (e = 0, n = t.length; e < n; e++) o = o.replace("%s", t[e]);
              return o;
            }),
            (q = t => {
              return (
                8 === l &&
                  t.loops > 1 &&
                  t.stream &&
                  (d("as2loop"), (t.stream = !1)),
                t
              );
            }),
            (z = (t, e) => {
              return (
                t &&
                  !t.usePolicyFile &&
                  (t.onid3 ||
                    t.usePeakData ||
                    t.useWaveformData ||
                    t.useEQData) &&
                  (mt._wD((e || "") + F("policy")), (t.usePolicyFile = !0)),
                t
              );
            }),
            (W = t => {
              Qt && console.warn !== a ? console.warn(t) : mt._wD(t);
            }),
            (s = () => {
              return !1;
            }),
            (C = t => {
              let e;
              for (e in t)
                t.hasOwnProperty(e) && "function" === typeof t[e] && (t[e] = s);
              e = null;
            }),
            (I = t => {
              t === a && (t = !1), (jt || t) && mt.disable(t);
            }),
            (N = t => {
              let e;
              if (t)
                if (t.match(/\.swf(\?.*)?$/i)) {
                  if (t.substr(t.toLowerCase().lastIndexOf(".swf?") + 4))
                    return t;
                } else t.lastIndexOf("/") !== t.length - 1 && (t += "/");
              return (
                (e =
                  (t && -1 !== t.lastIndexOf("/")
                    ? t.substr(0, t.lastIndexOf("/") + 1)
                    : "./") + mt.movieURL),
                mt.noSWFCache && (e += "?ts=" + new Date().getTime()),
                e
              );
            }),
            (S = () => {
              8 !== (l = parseInt(mt.flashVersion, 10)) &&
                9 !== l &&
                (mt._wD(F("badFV", l, 8)), (mt.flashVersion = l = 8));
              const t = mt.debugMode || mt.debugFlash ? "_debug.swf" : ".swf";
              mt.useHTML5Audio &&
                !mt.html5Only &&
                mt.audioFormats.mp4.required &&
                l < 9 &&
                (mt._wD(F("needfl9")), (mt.flashVersion = l = 9)),
                (mt.version =
                  mt.versionNumber +
                  (mt.html5Only
                    ? " (HTML5-only mode)"
                    : 9 === l
                    ? " (AS3/Flash 9)"
                    : " (AS2/Flash 8)")),
                l > 8
                  ? ((mt.defaultOptions = h(
                      mt.defaultOptions,
                      mt.flash9Options
                    )),
                    (mt.features.buffering = !0),
                    (mt.defaultOptions = h(
                      mt.defaultOptions,
                      mt.movieStarOptions
                    )),
                    (mt.filePatterns.flash9 = new RegExp(
                      "\\.(mp3|" + ae.join("|") + ")(\\?.*)?$",
                      "i"
                    )),
                    (mt.features.movieStar = !0))
                  : (mt.features.movieStar = !1),
                (mt.filePattern =
                  mt.filePatterns[8 !== l ? "flash9" : "flash8"]),
                (mt.movieURL = (8 === l
                  ? "soundmanager2.swf"
                  : "soundmanager2_flash9.swf"
                ).replace(".swf", t)),
                (mt.features.peakData = mt.features.waveformData = mt.features.eqData =
                  l > 8);
            }),
            (R = (t, e) => {
              gt && gt._setPolling(t, e);
            }),
            (D = () => {
              if (
                (mt.debugURLParam.test(Ot) &&
                  (mt.setupOptions.debugMode = mt.debugMode = !0),
                !r(mt.debugID))
              ) {
                let t, e, n, o, i;
                if (
                  mt.debugMode &&
                  !r(mt.debugID) &&
                  (!Qt || !mt.useConsole || !mt.consoleOnly)
                ) {
                  for (i in (((t = St.createElement("div")).id =
                    mt.debugID + "-toggle"),
                  (o = {
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    width: "1.2em",
                    height: "1.2em",
                    lineHeight: "1.2em",
                    margin: "2px",
                    textAlign: "center",
                    border: "1px solid #999",
                    cursor: "pointer",
                    background: "#fff",
                    color: "#333",
                    zIndex: 10001,
                  }),
                  t.appendChild(St.createTextNode("-")),
                  (t.onclick = V),
                  (t.title = "Toggle SM2 debug console"),
                  _t.match(/msie 6/i) &&
                    ((t.style.position = "absolute"),
                    (t.style.cursor = "hand")),
                  o))
                    o.hasOwnProperty(i) && (t.style[i] = o[i]);
                  if (
                    (((e = St.createElement("div")).id = mt.debugID),
                    (e.style.display = mt.debugMode ? "block" : "none"),
                    mt.debugMode && !r(t.id))
                  ) {
                    try {
                      (n = L()).appendChild(t);
                    } catch (a) {
                      throw new Error(F("domError") + " \n" + a.toString());
                    }
                    n.appendChild(e);
                  }
                }
                n = null;
              }
            }),
            (K = this.getSoundById),
            (d = (t, e) => {
              return t ? mt._wD(F(t), e) : "";
            }),
            (V = () => {
              const t = r(mt.debugID), e = r(mt.debugID + "-toggle");
              t &&
                (Et
                  ? ((e.innerHTML = "+"), (t.style.display = "none"))
                  : ((e.innerHTML = "-"), (t.style.display = "block")),
                (Et = !Et));
            }),
            (f = (t, e, n) => {
              if (i.sm2Debugger !== a)
                try {
                  sm2Debugger.handleEvent(t, e, n);
                } catch (r) {
                  return !1;
                }
              return !0;
            }),
            (U = () => {
              const t = [];
              return (
                mt.debugMode && t.push(H.sm2Debug),
                mt.debugFlash && t.push(H.flashDebug),
                mt.useHighPerformance && t.push(H.highPerf),
                t.join(" ")
              );
            }),
            (B = () => {
              const t = F("fbHandler"), e = mt.getMoviePercent(), n = H, r = { type: "FLASHBLOCK" };
              mt.html5Only ||
                (mt.ok()
                  ? (mt.didFlashBlock && mt._wD(t + ": Unblocked"),
                    mt.oMC &&
                      (mt.oMC.className = [
                        U(),
                        n.swfDefault,
                        n.swfLoaded +
                          (mt.didFlashBlock ? " " + n.swfUnblocked : ""),
                      ].join(" ")))
                  : (Ut &&
                      ((mt.oMC.className =
                        U() +
                        " " +
                        n.swfDefault +
                        " " +
                        (null === e ? n.swfTimedout : n.swfError)),
                      mt._wD(
                        t +
                          ": " +
                          F("fbTimeout") +
                          (e ? " (" + F("fbLoaded") + ")" : "")
                      )),
                    (mt.didFlashBlock = !0),
                    g({ type: "ontimeout", ignoreInit: !0, error: r }),
                    x(r)));
            }),
            (v = (t, e, n) => {
              Pt[t] === a && (Pt[t] = []),
                Pt[t].push({ method: e, scope: n || null, fired: !1 });
            }),
            (g = function (t) {
            if (
              (t || (t = { type: mt.ok() ? "onready" : "ontimeout" }),
              !At && t && !t.ignoreInit)
            )
              return !1;
            if ("ontimeout" === t.type && (mt.ok() || (jt && !t.ignoreInit)))
              return !1;
            let e;
            let n;
            const r = { success: t && t.ignoreInit ? mt.ok() : !jt };
            const o = (t && t.type && Pt[t.type]) || [];
            const i = [];
            const a = [r];
            const s = Ut && !mt.ok();
            for (
              t.error && (a[0].error = t.error), e = 0, n = o.length;
              e < n;
              e++
            )
              !0 !== o[e].fired && i.push(o[e]);
            if (i.length)
              for (e = 0, n = i.length; e < n; e++)
                i[e].scope
                  ? i[e].method.apply(i[e].scope, a)
                  : i[e].method.apply(this, a),
                  s || (i[e].fired = !0);
            return !0;
          }),
            (b = () => {
              i.setTimeout(() => {
                mt.useFlashBlock && B(),
                  g(),
                  "function" === typeof mt.onload &&
                    (d("onload", 1), mt.onload.apply(i), d("onloadOK", 1)),
                  mt.waitForWindowLoad && at.add(i, "load", b);
              }, 1);
            }),
            (ct = () => {
            if (ut !== a) return ut;
            let t;
            let e;
            let n;
            let r;
            let o = !1;
            const s = navigator;
            const u = i.ActiveXObject;
            try {
              r = s.plugins;
            } catch (c) {
              r = void 0;
            }
            if (r && r.length)
              (e = "application/x-shockwave-flash"),
                (n = s.mimeTypes) &&
                  n[e] &&
                  n[e].enabledPlugin &&
                  n[e].enabledPlugin.description &&
                  (o = !0);
            else if (u !== a && !_t.match(/MSAppHost/i)) {
              try {
                t = new u("ShockwaveFlash.ShockwaveFlash");
              } catch (c) {
                t = null;
              }
              (o = !!t), (t = null);
            }
            return (ut = o), o;
          }),
            (Q = () => {
            let t;
            let e;
            const n = mt.audioFormats;
            if (
              (zt && !!_t.match(/os (1|2|3_0|3_1)\s/i)
                ? ((mt.hasHTML5 = !1),
                  (mt.html5Only = !0),
                  mt.oMC && (mt.oMC.style.display = "none"))
                : mt.useHTML5Audio &&
                  ((mt.html5 && mt.html5.canPlayType) ||
                    (mt._wD(
                      "SoundManager: No HTML5 Audio() support detected."
                    ),
                    (mt.hasHTML5 = !1)),
                  Jt &&
                    mt._wD(
                      wt +
                        "Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - " +
                        (ut
                          ? "will use flash fallback for MP3/MP4, if available"
                          : " would use flash fallback for MP3/MP4, but none detected."),
                      1
                    )),
              mt.useHTML5Audio && mt.hasHTML5)
            )
              for (e in ((J = !0), n))
                n.hasOwnProperty(e) &&
                  n[e].required &&
                  (mt.html5.canPlayType(n[e].type)
                    ? mt.preferFlash &&
                      (mt.flash[e] || mt.flash[n[e].type]) &&
                      (t = !0)
                    : ((J = !1), (t = !0)));
            return (
              mt.ignoreFlash && ((t = !1), (J = !0)),
              (mt.html5Only = mt.hasHTML5 && mt.useHTML5Audio && !t),
              !mt.html5Only
            );
          }),
            (Y = t => {
              let e, n, r, o = 0;
              if (t instanceof Array) {
                for (e = 0, n = t.length; e < n; e++)
                  if (t[e] instanceof Object) {
                    if (mt.canPlayMIME(t[e].type)) {
                      o = e;
                      break;
                    }
                  } else if (mt.canPlayURL(t[e])) {
                    o = e;
                    break;
                  }
                t[o].url && (t[o] = t[o].url), (r = t[o]);
              } else r = t;
              return r;
            }),
            (G = t => {
              t._hasTimer ||
                ((t._hasTimer = !0),
                !Yt &&
                  mt.html5PollingInterval &&
                  (null === Ft &&
                    0 === Nt &&
                    (Ft = setInterval(X, mt.html5PollingInterval)),
                  Nt++));
            }),
            ($ = t => {
              t._hasTimer &&
                ((t._hasTimer = !1), !Yt && mt.html5PollingInterval && Nt--);
            }),
            (X = () => {
              let t;
              if (null !== Ft && !Nt)
                return clearInterval(Ft), void (Ft = null);
              for (t = mt.soundIDs.length - 1; t >= 0; t--)
                mt.sounds[mt.soundIDs[t]].isHTML5 &&
                  mt.sounds[mt.soundIDs[t]]._hasTimer &&
                  mt.sounds[mt.soundIDs[t]]._onTimer();
            }),
            (x = t => {
              (t = t !== a ? t : {}),
                "function" === typeof mt.onerror &&
                  mt.onerror.apply(i, [{ type: t.type !== a ? t.type : null }]),
                t.fatal !== a && t.fatal && mt.disable();
            }),
            (lt = () => {
              if (Jt && ct()) {
                let t;
                let e;
                const n = mt.audioFormats;
                for (e in n)
                  if (
                    n.hasOwnProperty(e) &&
                    ("mp3" === e || "mp4" === e) &&
                    (mt._wD(bt + ": Using flash fallback for " + e + " format"),
                    (mt.html5[e] = !1),
                    n[e] && n[e].related)
                  )
                    for (t = n[e].related.length - 1; t >= 0; t--)
                      mt.html5[n[e].related[t]] = !1;
              }
            }),
            (this._setSandboxType = t => {
              const e = mt.sandbox;
              (e.type = t),
                (e.description = e.types[e.types[t] !== a ? t : "unknown"]),
                "localWithFile" === e.type
                  ? ((e.noRemote = !0), (e.noLocal = !1), d("secNote", 2))
                  : "localWithNetwork" === e.type
                  ? ((e.noRemote = !1), (e.noLocal = !0))
                  : "localTrusted" === e.type &&
                    ((e.noRemote = !1), (e.noLocal = !1));
            }),
            (this._externalInterfaceOK = t => {
              if (!mt.swfLoaded) {
                let e;
                if (
                  (f("swf", !0),
                  f("flashtojs", !0),
                  (mt.swfLoaded = !0),
                  (te = !1),
                  Jt && lt(),
                  !t ||
                    t.replace(/\+dev/i, "") !==
                      mt.versionNumber.replace(/\+dev/i, ""))
                )
                  return (e =
                    bt +
                    ': Fatal: JavaScript file build "' +
                    mt.versionNumber +
                    '" does not match Flash SWF build "' +
                    t +
                    '" at ' +
                    mt.url +
                    ". Ensure both are up-to-date."),
                  void setTimeout(() => {
                    throw new Error(e);
                  }, 0)
                ;
                setTimeout(c, Kt ? 100 : 1);
              }
            }),
            (M = (t, e) => {
            if (Tt && kt) return !1;
            function n() {
              let t;
              const e = [];
              let n = [];
              (t =
                "SoundManager " +
                mt.version +
                (!mt.html5Only && mt.useHTML5Audio
                  ? mt.hasHTML5
                    ? " + HTML5 audio"
                    : ", no HTML5 audio support"
                  : "")),
                mt.html5Only
                  ? mt.html5PollingInterval &&
                    e.push(
                      "html5PollingInterval (" +
                        mt.html5PollingInterval +
                        "ms)"
                    )
                  : (mt.preferFlash && e.push("preferFlash"),
                    mt.useHighPerformance && e.push("useHighPerformance"),
                    mt.flashPollingInterval &&
                      e.push(
                        "flashPollingInterval (" +
                          mt.flashPollingInterval +
                          "ms)"
                      ),
                    mt.html5PollingInterval &&
                      e.push(
                        "html5PollingInterval (" +
                          mt.html5PollingInterval +
                          "ms)"
                      ),
                    mt.wmode && e.push("wmode (" + mt.wmode + ")"),
                    mt.debugFlash && e.push("debugFlash"),
                    mt.useFlashBlock && e.push("flashBlock")),
                e.length && (n = n.concat([e.join(" + ")])),
                mt._wD(t + (n.length ? " + " + n.join(", ") : ""), 1),
                dt();
            }
            if (mt.html5Only)
              return (
                S(),
                n(),
                (mt.oMC = r(mt.movieID)),
                c(),
                (Tt = !0),
                (kt = !0),
                !1
              );
            let o;
            let i;
            let s;
            let u;
            let l;
            let f;
            let d;
            let p;
            let h;
            const y = e || mt.url;
            const m = mt.altURL || y;
            let v = L();
            let g = U();
            const b = St.getElementsByTagName("html")[0];
            function w(t, e) {
              return '<param name="' + t + '" value="' + e + '" />';
            }
            if (
              ((o = b && b.dir && b.dir.match(/rtl/i)),
              (t = t === a ? mt.id : t),
              S(),
              (mt.url = N(re ? y : m)),
              (e = mt.url),
              (mt.wmode =
                !mt.wmode && mt.useHighPerformance
                  ? "transparent"
                  : mt.wmode),
              null !== mt.wmode &&
                (_t.match(/msie 8/i) || (!Kt && !mt.useHighPerformance)) &&
                navigator.platform.match(/win32|win64/i) &&
                (Bt.push(E.spcWmode), (mt.wmode = null)),
              (i = {
                name: t,
                id: t,
                src: e,
                quality: "high",
                allowScriptAccess: mt.allowScriptAccess,
                bgcolor: mt.bgColor,
                pluginspage: oe + "www.macromedia.com/go/getflashplayer",
                title: "JS/Flash audio component (SoundManager 2)",
                type: "application/x-shockwave-flash",
                wmode: mt.wmode,
                hasPriority: "true",
              }),
              mt.debugFlash && (i.FlashVars = "debug=1"),
              mt.wmode || delete i.wmode,
              Kt)
            )
              (s = St.createElement("div")),
                (l = [
                  '<object id="' +
                    t +
                    '" data="' +
                    e +
                    '" type="' +
                    i.type +
                    '" title="' +
                    i.title +
                    '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',
                  w("movie", e),
                  w("AllowScriptAccess", mt.allowScriptAccess),
                  w("quality", i.quality),
                  mt.wmode ? w("wmode", mt.wmode) : "",
                  w("bgcolor", mt.bgColor),
                  w("hasPriority", "true"),
                  mt.debugFlash ? w("FlashVars", i.FlashVars) : "",
                  "</object>",
                ].join(""));
            else
              for (u in ((s = St.createElement("embed")), i))
                i.hasOwnProperty(u) && s.setAttribute(u, i[u]);
            if ((D(), (g = U()), (v = L())))
              if (
                ((mt.oMC = r(mt.movieID) || St.createElement("div")),
                mt.oMC.id)
              )
                (h = mt.oMC.className),
                  (mt.oMC.className =
                    (h ? h + " " : H.swfDefault) + (g ? " " + g : "")),
                  mt.oMC.appendChild(s),
                  Kt &&
                    (((f = mt.oMC.appendChild(
                      St.createElement("div")
                    )).className = H.swfBox),
                    (f.innerHTML = l)),
                  (kt = !0);
              else {
                if (
                  ((mt.oMC.id = mt.movieID),
                  (mt.oMC.className = H.swfDefault + " " + g),
                  (d = null),
                  (f = null),
                  mt.useFlashBlock ||
                    (mt.useHighPerformance
                      ? (d = {
                          position: "fixed",
                          width: "8px",
                          height: "8px",
                          bottom: "0px",
                          left: "0px",
                          overflow: "hidden",
                        })
                      : ((d = {
                          position: "absolute",
                          width: "6px",
                          height: "6px",
                          top: "-9999px",
                          left: "-9999px",
                        }),
                        o &&
                          (d.left = Math.abs(parseInt(d.left, 10)) + "px"))),
                  Gt && (mt.oMC.style.zIndex = 1e4),
                  !mt.debugFlash)
                )
                  for (p in d)
                    d.hasOwnProperty(p) && (mt.oMC.style[p] = d[p]);
                try {
                  Kt || mt.oMC.appendChild(s),
                    v.appendChild(mt.oMC),
                    Kt &&
                      (((f = mt.oMC.appendChild(
                        St.createElement("div")
                      )).className = H.swfBox),
                      (f.innerHTML = l)),
                    (kt = !0);
                } catch (_) {
                  throw new Error(F("domError") + " \n" + _.toString());
                }
              }
            return (Tt = !0), n(), !0;
          }),
            (T = () => {
              return mt.html5Only
                ? (M(), !1)
                : !gt &&
                    (mt.url
                      ? ((gt = mt.getMovie(mt.id)) ||
                          (Rt
                            ? (Kt
                                ? (mt.oMC.innerHTML = Dt)
                                : mt.oMC.appendChild(Rt),
                              (Rt = null),
                              (Tt = !0))
                            : M(mt.id, mt.url),
                          (gt = mt.getMovie(mt.id))),
                        "function" === typeof mt.oninitmovie &&
                          setTimeout(mt.oninitmovie, 1),
                        pt(),
                        !0)
                      : (d("noURL"), !1));
            }),
            (w = () => {
              setTimeout(_, 1e3);
            }),
            (O = () => {
              i.setTimeout(() => {
                W(
                  wt +
                    "useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false..."
                ),
                  mt.setup({ preferFlash: !1 }).reboot(),
                  (mt.didFlashBlock = !0),
                  mt.beginDelayedInit();
              }, 1);
            }),
            (_ = () => {
              let t, e = !1;
              mt.url &&
                (Ct ||
                  ((Ct = !0),
                  at.remove(i, "load", w),
                  ut && te && !Zt
                    ? d("waitFocus")
                    : (At ||
                        ((t = mt.getMoviePercent()) > 0 && t < 100 && (e = !0)),
                      setTimeout(() => {
                        if (((t = mt.getMoviePercent()), e))
                          return (
                            (Ct = !1),
                            mt._wD(F("waitSWF")),
                            void i.setTimeout(w, 1)
                          );
                        At ||
                          (mt._wD(
                            bt +
                              ": No Flash response within expected time. Likely causes: " +
                              (0 === t ? "SWF load failed, " : "") +
                              "Flash blocked or JS-Flash security error." +
                              (mt.debugFlash ? " " + F("checkSWF") : ""),
                            2
                          ),
                          !re &&
                            t &&
                            (d("localFail", 2),
                            mt.debugFlash || d("tryDebug", 2)),
                          0 === t && mt._wD(F("swf404", mt.url), 1),
                          f(
                            "flashtojs",
                            !1,
                            ": Timed out" +
                              (re
                                ? " (Check flash security or flash blockers)"
                                : " (No plugin/missing SWF?)")
                          )),
                          !At &&
                            ee &&
                            (null === t
                              ? mt.useFlashBlock || 0 === mt.flashLoadTimeout
                                ? (mt.useFlashBlock && B(), d("waitForever"))
                                : !mt.useFlashBlock && J
                                ? O()
                                : (d("waitForever"),
                                  g({
                                    type: "ontimeout",
                                    ignoreInit: !0,
                                    error: { type: "INIT_FLASHBLOCK" },
                                  }))
                              : 0 === mt.flashLoadTimeout
                              ? d("waitForever")
                              : !mt.useFlashBlock && J
                              ? O()
                              : I(!0));
                      }, mt.flashLoadTimeout))));
            }),
            (P = () => {
              function t() {
                at.remove(i, "focus", P);
              }
              return Zt || !te
                ? (t(), !0)
                : ((ee = !0),
                  (Zt = !0),
                  d("gotFocus"),
                  (Ct = !1),
                  w(),
                  t(),
                  !0);
            }),
            (pt = () => {
              Bt.length &&
                (mt._wD("SoundManager 2: " + Bt.join(" "), 1), (Bt = []));
            }),
            (dt = () => {
            pt();
            let t;
            const e = [];
            if (mt.useHTML5Audio && mt.hasHTML5) {
              for (t in mt.audioFormats)
                mt.audioFormats.hasOwnProperty(t) &&
                  e.push(
                    t +
                      " = " +
                      mt.html5[t] +
                      (!mt.html5[t] && Ut && mt.flash[t]
                        ? " (using flash)"
                        : mt.preferFlash && mt.flash[t] && Ut
                        ? " (preferring flash)"
                        : mt.html5[t]
                        ? ""
                        : " (" +
                          (mt.audioFormats[t].required ? "required, " : "") +
                          "and no flash support)")
                  );
              mt._wD("SoundManager 2 HTML5 support: " + e.join(", "), 1);
            }
          }),
            (p = t => {
              if (At) return !1;
              if (mt.html5Only)
                return d("sm2Loaded", 1), (At = !0), b(), f("onload", !0), !0;
              let e, n = !0;
              return (
                (mt.useFlashBlock &&
                  mt.flashLoadTimeout &&
                  !mt.getMoviePercent()) ||
                  (At = !0),
                (e = { type: !ut && Ut ? "NO_FLASH" : "INIT_TIMEOUT" }),
                mt._wD(
                  "SoundManager 2 " +
                    (jt ? "failed to load" : "loaded") +
                    " (" +
                    (jt ? "Flash security/load error" : "OK") +
                    ") " +
                    String.fromCharCode(jt ? 10006 : 10003),
                  jt ? 2 : 1
                ),
                jt || t
                  ? (mt.useFlashBlock &&
                      mt.oMC &&
                      (mt.oMC.className =
                        U() +
                        " " +
                        (null === mt.getMoviePercent()
                          ? H.swfTimedout
                          : H.swfError)),
                    g({ type: "ontimeout", error: e, ignoreInit: !0 }),
                    f("onload", !1),
                    x(e),
                    (n = !1))
                  : f("onload", !0),
                jt ||
                  (mt.waitForWindowLoad && !Lt
                    ? (d("waitOnload"), at.add(i, "load", b))
                    : (mt.waitForWindowLoad && Lt && d("docLoaded"), b())),
                n
              );
            }),
            (u = () => {
            let t;
            const e = mt.setupOptions;
            for (t in e)
              e.hasOwnProperty(t) &&
                (mt[t] === a
                  ? (mt[t] = e[t])
                  : mt[t] !== e[t] && (mt.setupOptions[t] = mt[t]));
          }),
            (c = () => {
              if (At) return d("didInit"), !1;
              function t() {
                at.remove(i, "load", mt.beginDelayedInit);
              }
              if (mt.html5Only) return At || (t(), (mt.enabled = !0), p()), !0;
              T();
              try {
                gt._externalInterfaceTest(!1),
                  R(
                    !0,
                    mt.flashPollingInterval || (mt.useHighPerformance ? 10 : 50)
                  ),
                  mt.debugMode || gt._disableDebug(),
                  (mt.enabled = !0),
                  f("jstoflash", !0),
                  mt.html5Only || at.add(i, "unload", s);
              } catch (e) {
                return (
                  mt._wD("js/flash exception: " + e.toString()),
                  f("jstoflash", !1),
                  x({ type: "JS_TO_FLASH_EXCEPTION", fatal: !0 }),
                  I(!0),
                  p(),
                  !1
                );
              }
              return p(), t(), !0;
            }),
            (k = () => {
              return (
                !j &&
                ((j = !0),
                u(),
                D(),
                !ut &&
                  mt.hasHTML5 &&
                  (mt._wD(
                    "SoundManager 2: No Flash detected" +
                      (mt.useHTML5Audio
                        ? ". Trying HTML5-only mode."
                        : ", enabling HTML5."),
                    1
                  ),
                  mt.setup({ useHTML5Audio: !0, preferFlash: !1 })),
                it(),
                !ut &&
                  Ut &&
                  (Bt.push(E.needFlash), mt.setup({ flashLoadTimeout: 1 })),
                St.removeEventListener &&
                  St.removeEventListener("DOMContentLoaded", k, !1),
                T(),
                !0)
              );
            }),
            (ot = () => {
              return (
                "complete" === St.readyState &&
                  (k(), St.detachEvent("onreadystatechange", ot)),
                !0
              );
            }),
            (A = () => {
              (Lt = !0), k(), at.remove(i, "load", A);
            }),
            ct(),
            at.add(i, "focus", P),
            at.add(i, "load", w),
            at.add(i, "load", A),
            St.addEventListener
              ? St.addEventListener("DOMContentLoaded", k, !1)
              : St.attachEvent
              ? St.attachEvent("onreadystatechange", ot)
              : (f("onload", !1), x({ type: "NO_DOM2_EVENTS", fatal: !0 }));
        }
        (i.SM2_DEFER !== a && SM2_DEFER) || (s = new u()),
          "object" === o(t) && t && "object" === o(t.exports)
            ? ((t.exports.SoundManager = u), (t.exports.soundManager = s))
            : void 0 ===
                (r = (() => {
                  return {
                    constructor: u,
                    getInstance(t) {
                      if (!i.soundManager && t instanceof Function) {
                        const e = t(u);
                        e instanceof u && (i.soundManager = e);
                      }
                      return i.soundManager;
                    },
                  };
                }).call(e, n, e, t)) || (t.exports = r),
          (i.SoundManager = u),
          (i.soundManager = s);
      })(window);
    }).call(this, n(10)(t)));
  },
  46: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return p;
    });
    const r = n(0), o = (n(3), n(2));
    function i(t) {
      return (t => {
        if (Array.isArray(t)) return a(t);
      })(t) || (t => {
        if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t))
          return Array.from(t);
      })(t) || ((t, e) => {
        if (!t) return;
        if ("string" === typeof t) return a(t, e);
        let n = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === n && t.constructor && (n = t.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(t);
        if (
          "Arguments" === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return a(t, e);
      })(t) || (() => {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })();
    }
    function a(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function s(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function u(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function c(t, e) {
      return (c =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function l(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = d(t);
        if (e) {
          const o = d(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return f(this, n);
      };
    }
    function f(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function d(t) {
      return (d = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    (window.captchaIsLoading = !1), (window.captchaIsReady = !1);
    var p = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && c(t, e);
      })(f, t);
      let e;
      let n;
      let r;
      const a = l(f);
      function f() {
        let t;
        s(this, f);
        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
          n[r] = arguments[r];
        return ((t = a.call.apply(
          a,
          [this].concat(n)
        )).$ = document.querySelector.bind(t.element)),
        (t.$$ = function (e) {
          const n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : t.element;
          return i(n.querySelectorAll(e));
        }),
        t
      ;
      }
      return (e = f),
      (n = [
        {
          key: "connect",
          value() {
            const t = this;
            if (!this.inWysiwig) {
              (this.token = document.createElement("input")),
                this.token.setAttribute("type", "hidden"),
                this.token.setAttribute("name", "recaptcha_token"),
                this.element.appendChild(this.token),
                (this.tokenAge = 0),
                this.loadCaptchaJS(this.element, this),
                this.element.addEventListener("focusin", () => {
                  t.toggleBadge(!0);
                }),
                this.element.addEventListener("focusout", () => {
                  t.toggleBadge(!1);
                });
              const e = this.scoreBeforeSubmit.bind(this);
              this.$$("button,input[type=submit]").forEach(t => {
                t.addEventListener("click", e);
              });
            }
          },
        },
        {
          key: "reloadImage",
          value(t) {
            t.preventDefault();
            const e = t.target.parentElement.parentElement.parentElement;
            return window
              .fetch("/captcha/new", {
                method: "GET",
                headers: {
                  "Content-Type": "text/html",
                  "X-Requested-With": "XMLHttpRequest",
                  "X-CSRF-Token": Object(o.a)(),
                },
                credentials: "same-origin",
              })
              .then(t => {
                return t.text();
              })
              .then(t => {
                e.innerHTML = t;
              });
          },
        },
        {
          key: "toggleBadge",
          value(t) {
            const e = document.querySelector(".grecaptcha-badge");
            e &&
              (t ? e.classList.add("active") : e.classList.remove("active"));
          },
        },
        {
          key: "loadCaptchaJS",
          value(t, e) {
            const n = this;
            if (!e.captchaIsLoaded)
              if (window.captchaIsLoading)
                setTimeout(() => {
                  return n.loadCaptchaJS(t, e);
                }, 500);
              else {
                window.captchaIsLoading = !0;
                const r = t.dataset.sitekey, o = document.createElement("script");
                (o.type = "text/javascript"),
                  (o.async = !0),
                  (o.id = "recaptcha-js"),
                  (o.src = "https://www.google.com/recaptcha/api.js?render=".concat(
                    r
                  )),
                  (o.onload = () => {
                    window.captchaIsReady = !0;
                  });
                const i = document.getElementsByTagName("script")[0];
                i.parentNode.insertBefore(o, i);
              }
          },
        },
        {
          key: "scoreBeforeSubmit",
          value(t) {
            const e = this;
            return !!(this.token.value && this.tokenAge >= Date.now() - 12e4) ||
            (grecaptcha
              ? (t.preventDefault(),
                t.stopImmediatePropagation(),
                grecaptcha
                  .execute(this.element.dataset.sitekey, { action: "form" })
                  .then(
                    n => {
                      e.token.setAttribute("value", n),
                        (e.tokenAge = Date.now()),
                        t.target.click();
                    },
                    n => {
                      console.log("recaptcha error:", n),
                        e.token.setAttribute("value", "none"),
                        t.target.click();
                    }
                  ),
                !1)
              : (console.log("no recaptcha, lets jet"), !0));
          },
        },
        {
          key: "inWysiwig",
          get() {
            return document.querySelectorAll(".wysiwyg").length > 0;
          },
        },
        {
          key: "captchaIsLoaded",
          get() {
            return "undefined" !== typeof grecaptcha;
          },
        },
      ]) && u(e.prototype, n),
      r && u(e, r),
      f;
    })(r.b);
  },
  47: function (t, e, n) {
    "use strict";
    n.d(e, "b", () => {
      return m;
    }),
      n.d(e, "a", () => {
        return v;
      });
    const r = n(23), o = n(9);
    function i(t) {
      return (i =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function a(t, e, n) {
      return (a =
        "undefined" !== typeof Reflect && Reflect.get
          ? Reflect.get
          : (t, e, n) => {
              const r = ((t, e) => {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = l(t));

                );
                return t;
              })(t, e);
              if (r) {
                const o = Object.getOwnPropertyDescriptor(r, e);
                return o.get ? o.get.call(n) : o.value;
              }
            })(t, e, n || t);
    }
    function s(t, e) {
      return (s =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function u(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = l(t);
        if (e) {
          const o = l(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return c(this, n);
      };
    }
    function c(t, e) {
      return !e || ("object" !== i(e) && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function l(t) {
      return (l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function f(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function d(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function p(t, e, n) {
      return e && d(t.prototype, e), n && d(t, n), t;
    }

    const h =
        window.trustedTypes &&
        trustedTypes.createPolicy("lit-html", {
          createHTML(t) {
            return t;
          },
        });

    const y = " ".concat(o.f, " ");

    var m = (() => {
      function t(e, n, r, o) {
        f(this, t),
          (this.strings = e),
          (this.values = n),
          (this.type = r),
          (this.processor = o);
      }
      return p(t, [
        {
          key: "getHTML",
          value() {
            for (
              var t = this.strings.length - 1, e = "", n = !1, r = 0;
              r < t;
              r++
            ) {
              const i = this.strings[r], a = i.lastIndexOf("\x3c!--");
              n = (a > -1 || n) && -1 === i.indexOf("--\x3e", a + 1);
              const s = o.e.exec(i);
              e +=
                null === s
                  ? i + (n ? y : o.g)
                  : i.substr(0, s.index) + s[1] + s[2] + o.b + s[3] + o.f;
            }
            return (e += this.strings[t]);
          },
        },
        {
          key: "getTemplateElement",
          value() {
            const t = document.createElement("template");
            let e = this.getHTML();
            return (
              void 0 !== h && (e = h.createHTML(e)), (t.innerHTML = e), t
            );
          },
        },
      ]),
      t
    ;
    })();

    var v = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && s(t, e);
      })(n, t);
      const e = u(n);
      function n() {
        return f(this, n), e.apply(this, arguments);
      }
      return p(n, [
        {
          key: "getHTML",
          value() {
            return "<svg>".concat(
              a(l(n.prototype), "getHTML", this).call(this),
              "</svg>"
            );
          },
        },
        {
          key: "getTemplateElement",
          value() {
            const t = a(l(n.prototype), "getTemplateElement", this).call(
                      this
                    ),
                  e = t.content,
                  o = e.firstChild;
            return e.removeChild(o), Object(r.c)(e, o.firstChild), t;
          },
        },
      ]),
      n
    ;
    })(m);
  },
  49: function (t, e, n) {
    const r = (t => {
      "use strict";
      const e = Object.prototype, n = e.hasOwnProperty, r = "function" === typeof Symbol ? Symbol : {}, o = r.iterator || "@@iterator", i = r.asyncIterator || "@@asyncIterator", a = r.toStringTag || "@@toStringTag";
      function s(t, e, n, r) {
        const o = e && e.prototype instanceof l ? e : l, i = Object.create(o.prototype), a = new O(r || []);
        return (i._invoke = ((t, e, n) => {
          let r = "suspendedStart";
          return (o, i) => {
            if ("executing" === r)
              throw new Error("Generator is already running");
            if ("completed" === r) {
              if ("throw" === o) throw i;
              return P();
            }
            for (n.method = o, n.arg = i; ; ) {
              const a = n.delegate;
              if (a) {
                const s = b(a, n);
                if (s) {
                  if (s === c) continue;
                  return s;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg;
              else if ("throw" === n.method) {
                if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              r = "executing";
              const l = u(t, e, n);
              if ("normal" === l.type) {
                if (
                  ((r = n.done ? "completed" : "suspendedYield"), l.arg === c)
                )
                  continue;
                return { value: l.arg, done: n.done };
              }
              "throw" === l.type &&
                ((r = "completed"), (n.method = "throw"), (n.arg = l.arg));
            }
          };
        })(t, n, a)),
        i;
      }
      function u(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (r) {
          return { type: "throw", arg: r };
        }
      }
      t.wrap = s;
      var c = {};
      function l() {}
      function f() {}
      function d() {}
      let p = {};
      p[o] = function () {
        return this;
      };
      const h = Object.getPrototypeOf, y = h && h(h(S([])));
      y && y !== e && n.call(y, o) && (p = y);
      const m = (d.prototype = l.prototype = Object.create(p));
      function v(t) {
        ["next", "throw", "return"].forEach(e => {
          t[e] = function (t) {
            return this._invoke(e, t);
          };
        });
      }
      function g(t, e) {
        let r;
        this._invoke = (o, i) => {
          function a() {
            return new e((r, a) => {
              !(function r(o, i, a, s) {
                const c = u(t[o], t, i);
                if ("throw" !== c.type) {
                  const l = c.arg, f = l.value;
                  return f && "object" === typeof f && n.call(f, "__await")
                    ? e.resolve(f.__await).then(
                        t => {
                          r("next", t, a, s);
                        },
                        t => {
                          r("throw", t, a, s);
                        }
                      )
                    : e.resolve(f).then(
                        t => {
                          (l.value = t), a(l);
                        },
                        t => {
                          return r("throw", t, a, s);
                        }
                      );
                }
                s(c.arg);
              })(o, i, r, a);
            });
          }
          return (r = r ? r.then(a, a) : a());
        };
      }
      function b(t, e) {
        const n = t.iterator[e.method];
        if (undefined === n) {
          if (((e.delegate = null), "throw" === e.method)) {
            if (
              t.iterator.return &&
              ((e.method = "return"),
              (e.arg = undefined),
              b(t, e),
              "throw" === e.method)
            )
              return c;
            (e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a 'throw' method"
              ));
          }
          return c;
        }
        const r = u(n, t.iterator, e.arg);
        if ("throw" === r.type)
          return (e.method = "throw"), (e.arg = r.arg), (e.delegate = null), c;
        const o = r.arg;
        return o
          ? o.done
            ? ((e[t.resultName] = o.value),
              (e.next = t.nextLoc),
              "return" !== e.method &&
                ((e.method = "next"), (e.arg = undefined)),
              (e.delegate = null),
              c)
            : o
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            c);
      }
      function w(t) {
        const e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function _(t) {
        const e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function O(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(w, this),
          this.reset(!0);
      }
      function S(t) {
        if (t) {
          const e = t[o];
          if (e) return e.call(t);
          if ("function" === typeof t.next) return t;
          if (!isNaN(t.length)) {
            let r = -1;

            const i = function e() {
              for (; ++r < t.length; )
                if (n.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
              return (e.value = undefined), (e.done = !0), e;
            };

            return (i.next = i);
          }
        }
        return { next: P };
      }
      function P() {
        return { value: undefined, done: !0 };
      }
      return (f.prototype = m.constructor = d),
      (d.constructor = f),
      (d[a] = f.displayName = "GeneratorFunction"),
      (t.isGeneratorFunction = t => {
        const e = "function" === typeof t && t.constructor;
        return (
          !!e &&
          (e === f || "GeneratorFunction" === (e.displayName || e.name))
        );
      }),
      (t.mark = t => {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, d)
            : ((t.__proto__ = d), a in t || (t[a] = "GeneratorFunction")),
          (t.prototype = Object.create(m)),
          t
        );
      }),
      (t.awrap = t => {
        return { __await: t };
      }),
      v(g.prototype),
      (g.prototype[i] = function () {
        return this;
      }),
      (t.AsyncIterator = g),
      (t.async = (e, n, r, o, i) => {
        void 0 === i && (i = Promise);
        const a = new g(s(e, n, r, o), i);
        return t.isGeneratorFunction(n)
          ? a
          : a.next().then(t => {
              return t.done ? t.value : a.next();
            });
      }),
      v(m),
      (m[a] = "Generator"),
      (m[o] = function () {
        return this;
      }),
      (m.toString = () => {
        return "[object Generator]";
      }),
      (t.keys = t => {
        const e = [];
        for (const n in t) e.push(n);
        return e.reverse(),
        function n() {
          for (; e.length; ) {
            const r = e.pop();
            if (r in t) return (n.value = r), (n.done = !1), n;
          }
          return (n.done = !0), n;
        }
      ;
      }),
      (t.values = S),
      (O.prototype = {
        constructor: O,
        reset(t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = undefined),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = undefined),
            this.tryEntries.forEach(_),
            !t)
          )
            for (const e in this)
              "t" === e.charAt(0) &&
                n.call(this, e) &&
                !isNaN(+e.slice(1)) &&
                (this[e] = undefined);
        },
        stop() {
          this.done = !0;
          const t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException(t) {
          if (this.done) throw t;
          const e = this;
          function r(n, r) {
            return (
              (a.type = "throw"),
              (a.arg = t),
              (e.next = n),
              r && ((e.method = "next"), (e.arg = undefined)),
              !!r
            );
          }
          for (let o = this.tryEntries.length - 1; o >= 0; --o) {
            const i = this.tryEntries[o];
            var a = i.completion;
            if ("root" === i.tryLoc) return r("end");
            if (i.tryLoc <= this.prev) {
              const s = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc");
              if (s && u) {
                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return r(i.finallyLoc);
              } else if (s) {
                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
              } else {
                if (!u)
                  throw new Error("try statement without catch or finally");
                if (this.prev < i.finallyLoc) return r(i.finallyLoc);
              }
            }
          }
        },
        abrupt(t, e) {
          for (let r = this.tryEntries.length - 1; r >= 0; --r) {
            const o = this.tryEntries[r];
            if (
              o.tryLoc <= this.prev &&
              n.call(o, "finallyLoc") &&
              this.prev < o.finallyLoc
            ) {
              var i = o;
              break;
            }
          }
          i &&
            ("break" === t || "continue" === t) &&
            i.tryLoc <= e &&
            e <= i.finallyLoc &&
            (i = null);
          const a = i ? i.completion : {};
          return (
            (a.type = t),
            (a.arg = e),
            i
              ? ((this.method = "next"), (this.next = i.finallyLoc), c)
              : this.complete(a)
          );
        },
        complete(t, e) {
          if ("throw" === t.type) throw t.arg;
          return (
            "break" === t.type || "continue" === t.type
              ? (this.next = t.arg)
              : "return" === t.type
              ? ((this.rval = this.arg = t.arg),
                (this.method = "return"),
                (this.next = "end"))
              : "normal" === t.type && e && (this.next = e),
            c
          );
        },
        finish(t) {
          for (let e = this.tryEntries.length - 1; e >= 0; --e) {
            const n = this.tryEntries[e];
            if (n.finallyLoc === t)
              return this.complete(n.completion, n.afterLoc), _(n), c;
          }
        },
        catch(t) {
          for (let e = this.tryEntries.length - 1; e >= 0; --e) {
            const n = this.tryEntries[e];
            if (n.tryLoc === t) {
              const r = n.completion;
              if ("throw" === r.type) {
                var o = r.arg;
                _(n);
              }
              return o;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield(t, e, n) {
          return (
            (this.delegate = { iterator: S(t), resultName: e, nextLoc: n }),
            "next" === this.method && (this.arg = undefined),
            c
          );
        },
      }),
      t;
    })(t.exports);
    try {
      regeneratorRuntime = r;
    } catch (o) {
      Function("r", "regeneratorRuntime = r")(r);
    }
  },
  55: function (t, e, n) {
    "use strict";
    n.d(e, "a", () => {
      return l;
    });
    const r = n(23), o = n(9);
    function i(t) {
      return (t => {
        if (Array.isArray(t)) return u(t);
      })(t) || (t => {
        if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t))
          return Array.from(t);
      })(t) ||
      s(t) || (() => {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })();
    }
    function a(t, e) {
      let n;
      if ("undefined" === typeof Symbol || null == t[Symbol.iterator]) {
        if (
          Array.isArray(t) ||
          (n = s(t)) ||
          (e && t && "number" === typeof t.length)
        ) {
          n && (t = n);
          let r = 0;
          const o = () => {};
          return {
            s: o,
            n() {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
            },
            e(t) {
              throw t;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      let i, a = !0, u = !1;
      return {
        s() {
          n = t[Symbol.iterator]();
        },
        n() {
          const t = n.next();
          return (a = t.done), t;
        },
        e(t) {
          (u = !0), (i = t);
        },
        f() {
          try {
            a || null == n.return || n.return();
          } finally {
            if (u) throw i;
          }
        },
      };
    }
    function s(t, e) {
      if (t) {
        if ("string" === typeof t) return u(t, e);
        let n = Object.prototype.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? u(t, e)
            : void 0
        );
      }
    }
    function u(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function c(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    var l = (() => {
      function t(e, n, r) {
        !((t, e) => {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.__parts = []),
          (this.template = e),
          (this.processor = n),
          (this.options = r);
      }
      let e, n, s;
      return (e = t),
      (n = [
        {
          key: "update",
          value(t) {
            let e;
            let n = 0;
            const r = a(this.__parts);
            try {
              for (r.s(); !(e = r.n()).done; ) {
                const o = e.value;
                void 0 !== o && o.setValue(t[n]), n++;
              }
            } catch (c) {
              r.e(c);
            } finally {
              r.f();
            }
            let i;
            const s = a(this.__parts);
            try {
              for (s.s(); !(i = s.n()).done; ) {
                const u = i.value;
                void 0 !== u && u.commit();
              }
            } catch (c) {
              s.e(c);
            } finally {
              s.f();
            }
          },
        },
        {
          key: "_clone",
          value() {
            for (
              var t,
                e = r.a
                  ? this.template.element.content.cloneNode(!0)
                  : document.importNode(this.template.element.content, !0),
                n = [],
                a = this.template.parts,
                s = document.createTreeWalker(e, 133, null, !1),
                u = 0,
                c = 0,
                l = s.nextNode();
              u < a.length;

            )
              if (((t = a[u]), Object(o.d)(t))) {
                for (; c < t.index; )
                  c++,
                    "TEMPLATE" === l.nodeName &&
                      (n.push(l), (s.currentNode = l.content)),
                    null === (l = s.nextNode()) &&
                      ((s.currentNode = n.pop()), (l = s.nextNode()));
                if ("node" === t.type) {
                  const f = this.processor.handleTextExpression(this.options);
                  f.insertAfterNode(l.previousSibling), this.__parts.push(f);
                } else {
                  let d;
                  (d = this.__parts).push.apply(
                    d,
                    i(
                      this.processor.handleAttributeExpressions(
                        l,
                        t.name,
                        t.strings,
                        this.options
                      )
                    )
                  );
                }
                u++;
              } else this.__parts.push(void 0), u++;
            return (
              r.a && (document.adoptNode(e), customElements.upgrade(e)), e
            );
          },
        },
      ]) && c(e.prototype, n),
      s && c(e, s),
      t
    ;
    })();
  },
  551: function (t, e, n) {
    "use strict";
    n.r(e),
      n.d(e, "default", () => {
        return ft;
      });
    let r;
    const o = n(19);
    const i = n(16);
    const a = new WeakMap();

    const s =
      (Object(i.c)(t => {
        return e => {
          const n = a.get(e);
          if (void 0 === t && e instanceof i.a) {
            if (void 0 !== n || !a.has(e)) {
              const r = e.committer.name;
              e.committer.element.removeAttribute(r);
            }
          } else t !== n && e.setValue(t);
          a.set(e, t);
        };
      }),
      n(108));

    const u = [];
    const c = "ResizeObserver loop completed with undelivered notifications.";
    !(t => {
      (t.BORDER_BOX = "border-box"),
        (t.CONTENT_BOX = "content-box"),
        (t.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box");
    })(r || (r = {}));
    let l;

    const f = (() => {
      function t(t, e, n, r) {
        return (
          (this.x = t),
          (this.y = e),
          (this.width = n),
          (this.height = r),
          (this.top = this.y),
          (this.left = this.x),
          (this.bottom = this.top + this.height),
          (this.right = this.left + this.width),
          Object.freeze(this)
        );
      }
      return (t.prototype.toJSON = function () {
        const t = this;
        return {
          x: t.x,
          y: t.y,
          top: t.top,
          right: t.right,
          bottom: t.bottom,
          left: t.left,
          width: t.width,
          height: t.height,
        };
      }),
      (t.fromRect = e => {
        return new t(e.x, e.y, e.width, e.height);
      }),
      t;
    })();

    const d = t => {
      return t instanceof SVGElement && "getBBox" in t;
    };

    const p = t => {
      if (d(t)) {
        const e = t.getBBox(), n = e.width, r = e.height;
        return !n && !r;
      }
      const o = t, i = o.offsetWidth, a = o.offsetHeight;
      return !(i || a || t.getClientRects().length);
    };

    const h = t => {
      let e;
      let n;

      const r =
        null ===
          (n =
            null === (e = t) || void 0 === e ? void 0 : e.ownerDocument) ||
        void 0 === n
          ? void 0
          : n.defaultView;

      return !!(r && t instanceof r.Element);
    };

    const y = "undefined" !== typeof window ? window : {};
    const m = new WeakMap();
    const v = /auto|scroll/;
    const g = /^tb|vertical/;
    const b = /msie|trident/i.test(y.navigator && y.navigator.userAgent);

    const w = t => {
      return parseFloat(t || "0");
    };

    const _ = (t, e, n) => {
      return (
        void 0 === t && (t = 0),
        void 0 === e && (e = 0),
        void 0 === n && (n = !1),
        Object.freeze({
          inlineSize: (n ? e : t) || 0,
          blockSize: (n ? t : e) || 0,
        })
      );
    };

    const O = Object.freeze({
      devicePixelContentBoxSize: _(),
      borderBoxSize: _(),
      contentBoxSize: _(),
      contentRect: new f(0, 0, 0, 0),
    });

    const S = (t, e) => {
      if ((void 0 === e && (e = !1), m.has(t) && !e)) return m.get(t);
      if (p(t)) return m.set(t, O), O;
      const n = getComputedStyle(t),
            r = d(t) && t.ownerSVGElement && t.getBBox(),
            o = !b && "border-box" === n.boxSizing,
            i = g.test(n.writingMode || ""),
            a = !r && v.test(n.overflowY || ""),
            s = !r && v.test(n.overflowX || ""),
            u = r ? 0 : w(n.paddingTop),
            c = r ? 0 : w(n.paddingRight),
            l = r ? 0 : w(n.paddingBottom),
            h = r ? 0 : w(n.paddingLeft),
            y = r ? 0 : w(n.borderTopWidth),
            S = r ? 0 : w(n.borderRightWidth),
            P = r ? 0 : w(n.borderBottomWidth),
            E = h + c,
            T = u + l,
            k = (r ? 0 : w(n.borderLeftWidth)) + S,
            A = y + P,
            j = s ? t.offsetHeight - A - t.clientHeight : 0,
            L = a ? t.offsetWidth - k - t.clientWidth : 0,
            M = o ? E + k : 0,
            x = o ? T + A : 0,
            R = r ? r.width : w(n.width) - M - L,
            D = r ? r.height : w(n.height) - x - j,
            C = R + E + L + k,
            I = D + T + j + A,
            N = Object.freeze({
              devicePixelContentBoxSize: _(
                Math.round(R * devicePixelRatio),
                Math.round(D * devicePixelRatio),
                i
              ),
              borderBoxSize: _(C, I, i),
              contentBoxSize: _(R, D, i),
              contentRect: new f(h, u, R, D),
            });
      return m.set(t, N), N;
    };

    const P = (t, e, n) => {
      const o = S(t, n), i = o.borderBoxSize, a = o.contentBoxSize, s = o.devicePixelContentBoxSize;
      switch (e) {
        case r.DEVICE_PIXEL_CONTENT_BOX:
          return s;
        case r.BORDER_BOX:
          return i;
        default:
          return a;
      }
    };

    const E = function (t) {
      const e = S(t);
      (this.target = t),
        (this.contentRect = e.contentRect),
        (this.borderBoxSize = [e.borderBoxSize]),
        (this.contentBoxSize = [e.contentBoxSize]),
        (this.devicePixelContentBoxSize = [e.devicePixelContentBoxSize]);
    };

    const T = t => {
      if (p(t)) return 1 / 0;
      for (var e = 0, n = t.parentNode; n; ) (e += 1), (n = n.parentNode);
      return e;
    };

    const k = () => {
      let t = 1 / 0;
      const e = [];
      u.forEach(n => {
        if (0 !== n.activeTargets.length) {
          const r = [];
          n.activeTargets.forEach(e => {
            const n = new E(e.target), o = T(e.target);
            r.push(n),
              (e.lastReportedSize = P(e.target, e.observedBox)),
              o < t && (t = o);
          }),
            e.push(() => {
              n.callback.call(n.observer, r, n.observer);
            }),
            n.activeTargets.splice(0, n.activeTargets.length);
        }
      });
      for (let n = 0, r = e; n < r.length; n++) {
        (0, r[n])();
      }
      return t;
    };

    const A = t => {
      u.forEach(e => {
        e.activeTargets.splice(0, e.activeTargets.length),
          e.skippedTargets.splice(0, e.skippedTargets.length),
          e.observationTargets.forEach(n => {
            n.isActive() &&
              (T(n.target) > t
                ? e.activeTargets.push(n)
                : e.skippedTargets.push(n));
          });
      });
    };

    const j = () => {
      let t, e = 0;
      for (
        A(e);
        u.some(t => {
          return t.activeTargets.length > 0;
        });

      )
        (e = k()), A(e);
      return u.some(t => {
        return t.skippedTargets.length > 0;
      }) &&
        ("function" === typeof ErrorEvent
          ? (t = new ErrorEvent("error", { message: c }))
          : ((t = document.createEvent("Event")).initEvent("error", !1, !1),
            (t.message = c)),
        window.dispatchEvent(t)),
      e > 0
    ;
    };

    const L = [];

    const M = t => {
      if (!l) {
        let e = 0;
        const n = document.createTextNode("");
        new MutationObserver(() => {
          return L.splice(0).forEach(t => {
            return t();
          });
        }).observe(n, { characterData: !0 }),
          (l = () => {
            n.textContent = "" + (e ? e-- : e++);
          });
      }
      L.push(t), l();
    };

    let x = 0;
    const R = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };

    const D = [
      "resize",
      "load",
      "transitionend",
      "animationend",
      "animationstart",
      "animationiteration",
      "keyup",
      "keydown",
      "mouseup",
      "mousedown",
      "mouseover",
      "mouseout",
      "blur",
      "focus",
    ];

    const C = t => {
      return void 0 === t && (t = 0), Date.now() + t;
    };

    let I = !1;

    const N = new ((() => {
      function t() {
        const t = this;
        (this.stopped = !0),
          (this.listener = () => {
            return t.schedule();
          });
      }
      return (t.prototype.run = function (t) {
        const e = this;
        if ((void 0 === t && (t = 250), !I)) {
          I = !0;
          let n;
          const r = C(t);
          (n = () => {
            let n = !1;
            try {
              n = j();
            } finally {
              if (((I = !1), (t = r - C()), !x)) return;
              n ? e.run(1e3) : t > 0 ? e.run(t) : e.start();
            }
          }),
            M(() => {
              requestAnimationFrame(n);
            });
        }
      }),
      (t.prototype.schedule = function () {
        this.stop(), this.run();
      }),
      (t.prototype.observe = function () {
        const t = this,
              e = () => {
                return t.observer && t.observer.observe(document.body, R);
              };
        document.body ? e() : y.addEventListener("DOMContentLoaded", e);
      }),
      (t.prototype.start = function () {
        const t = this;
        this.stopped &&
          ((this.stopped = !1),
          (this.observer = new MutationObserver(this.listener)),
          this.observe(),
          D.forEach(e => {
            return y.addEventListener(e, t.listener, !0);
          }));
      }),
      (t.prototype.stop = function () {
        const t = this;
        this.stopped ||
          (this.observer && this.observer.disconnect(),
          D.forEach(e => {
            return y.removeEventListener(e, t.listener, !0);
          }),
          (this.stopped = !0));
      }),
      t;
    })())();

    const F = t => {
      !x && t > 0 && N.start(), !(x += t) && N.stop();
    };

    const B = (() => {
      function t(t, e) {
        (this.target = t),
          (this.observedBox = e || r.CONTENT_BOX),
          (this.lastReportedSize = { inlineSize: 0, blockSize: 0 });
      }
      return (t.prototype.isActive = function () {
        let t;
        const e = P(this.target, this.observedBox, !0);
        return (t = this.target),
        d(t) || (t => {
          switch (t.tagName) {
            case "INPUT":
              if ("image" !== t.type) break;
            case "VIDEO":
            case "AUDIO":
            case "EMBED":
            case "OBJECT":
            case "CANVAS":
            case "IFRAME":
            case "IMG":
              return !0;
          }
          return !1;
        })(t) ||
          "inline" !== getComputedStyle(t).display ||
          (this.lastReportedSize = e),
        this.lastReportedSize.inlineSize !== e.inlineSize ||
          this.lastReportedSize.blockSize !== e.blockSize
      ;
      }),
      t;
    })();

    const U = function (t, e) {
      (this.activeTargets = []),
        (this.skippedTargets = []),
        (this.observationTargets = []),
        (this.observer = t),
        (this.callback = e);
    };

    const H = new WeakMap();

    const V = (t, e) => {
      for (let n = 0; n < t.length; n += 1) if (t[n].target === e) return n;
      return -1;
    };

    const q = (() => {
      function t() {}
      return (t.connect = (t, e) => {
        const n = new U(t, e);
        H.set(t, n);
      }),
      (t.observe = (t, e, n) => {
        const r = H.get(t), o = 0 === r.observationTargets.length;
        V(r.observationTargets, e) < 0 &&
          (o && u.push(r),
          r.observationTargets.push(new B(e, n && n.box)),
          F(1),
          N.schedule());
      }),
      (t.unobserve = (t, e) => {
        const n = H.get(t), r = V(n.observationTargets, e), o = 1 === n.observationTargets.length;
        r >= 0 &&
          (o && u.splice(u.indexOf(n), 1),
          n.observationTargets.splice(r, 1),
          F(-1));
      }),
      (t.disconnect = function (t) {
        const e = this, n = H.get(t);
        n.observationTargets.slice().forEach(n => {
          return e.unobserve(t, n.target);
        }),
          n.activeTargets.splice(0, n.activeTargets.length);
      }),
      t;
    })();

    const z = (() => {
      function t(t) {
        if (0 === arguments.length)
          throw new TypeError(
            "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
          );
        if ("function" !== typeof t)
          throw new TypeError(
            "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
          );
        q.connect(this, t);
      }
      return (t.prototype.observe = function (t, e) {
        if (0 === arguments.length)
          throw new TypeError(
            "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
          );
        if (!h(t))
          throw new TypeError(
            "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
          );
        q.observe(this, t, e);
      }),
      (t.prototype.unobserve = function (t) {
        if (0 === arguments.length)
          throw new TypeError(
            "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
          );
        if (!h(t))
          throw new TypeError(
            "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
          );
        q.unobserve(this, t);
      }),
      (t.prototype.disconnect = function () {
        q.disconnect(this);
      }),
      (t.toString = () => {
        return "function ResizeObserver () { [polyfill code] }";
      }),
      t
    ;
    })();

    function W(t, e) {
      const n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        let r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(e => {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function K(t) {
      for (let e = 1; e < arguments.length; e++) {
        const n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? W(Object(n), !0).forEach(e => {
              G(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : W(Object(n)).forEach(e => {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    function G(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function $(t, e) {
      return (t => {
        if (Array.isArray(t)) return t;
      })(t) || ((t, e) => {
        if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(t)))
          return;
        const n = [];
        let r = !0;
        let o = !1;
        let i = void 0;
        try {
          for (
            var a, s = t[Symbol.iterator]();
            !(r = (a = s.next()).done) &&
            (n.push(a.value), !e || n.length !== e);
            r = !0
          );
        } catch (u) {
          (o = !0), (i = u);
        } finally {
          try {
            r || null == s.return || s.return();
          } finally {
            if (o) throw i;
          }
        }
        return n;
      })(t, e) || ((t, e) => {
        if (!t) return;
        if ("string" === typeof t) return X(t, e);
        let n = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === n && t.constructor && (n = t.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(t);
        if (
          "Arguments" === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return X(t, e);
      })(t, e) || (() => {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })();
    }
    function X(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    let Y;
    function J(t) {
      return (J =
        "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
          ? t => {
              return typeof t;
            }
          : t => {
              return t &&
                "function" === typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function Q() {
      const t = et([
        "\n      media-background-debug {\n        position: fixed;\n        top: 0;\n        right: 0;\n      }\n    ",
      ]);
      return (Q = () => {
        return t;
      }),
      t
    ;
    }
    function Z() {
      const t = et([
        '<media-background-debug\n        .src="',
        '"\n        .cropRect="',
        '"\n        .focalPoint="',
        '"\n        .originalWidth="',
        '"\n        .originalHeight="',
        '"\n        .focalRect="',
        '"\n        .containerRect="',
        '"\n      ></media-background-debug>',
      ]);
      return (Z = () => {
        return t;
      }),
      t
    ;
    }
    function tt() {
      const t = et([
        '\n      <media-background-content style="',
        '">\n        <slot></slot>\n      </media-background-content>\n      ',
        "\n    ",
      ]);
      return (tt = () => {
        return t;
      }),
      t
    ;
    }
    function et(t, e) {
      return (
        e || (e = t.slice(0)),
        Object.freeze(
          Object.defineProperties(t, { raw: { value: Object.freeze(e) } })
        )
      );
    }
    function nt(t, e) {
      const n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        let r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(e => {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function rt(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function ot(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function it(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function at(t, e, n) {
      return (at =
        "undefined" !== typeof Reflect && Reflect.get
          ? Reflect.get
          : (t, e, n) => {
              const r = ((t, e) => {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = lt(t));

                );
                return t;
              })(t, e);
              if (r) {
                const o = Object.getOwnPropertyDescriptor(r, e);
                return o.get ? o.get.call(n) : o.value;
              }
            })(t, e, n || t);
    }
    function st(t, e) {
      return (st =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function ut(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = lt(t);
        if (e) {
          const o = lt(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return ct(this, n);
      };
    }
    function ct(t, e) {
      return !e || ("object" !== J(e) && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function lt(t) {
      return (lt = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    var ft =
      Object(o.c)("media-background")(
        (Y = (t => {
        !((t, e) => {
          if ("function" !== typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            e && st(t, e);
        })(a, t);
        let e;
        let n;
        let r;
        const i = ut(a);
        function a() {
          return ot(this, a), i.apply(this, arguments);
        }
        return (e = a),
        (r = [
          {
            key: "properties",
            get() {
              return {
                cropRect: { attribute: "crop-rect", type: Object },
                focalPoint: { attribute: "focal-point", type: Object },
                originalWidth: {
                  attribute: "original-width",
                  type: Number,
                },
                originalHeight: {
                  attribute: "original-height",
                  type: Number,
                },
                mode: {},
                debug: { type: Boolean },
              };
            },
          },
          {
            key: "styles",
            get() {
              return Object(o.b)(Q());
            },
          },
        ]),
        (n = [
          {
            key: "connectedCallback",
            value() {
              const t = this;
              at(lt(a.prototype), "connectedCallback", this).call(this),
                (this.containerRect = this.getBoundingClientRect()),
                (this.resizeObserver = new z(this.onResize.bind(this))),
                this.resizeObserver.observe(this),
                this.refresh(),
                this.updateComplete.then(() => {
                  window.requestAnimationFrame(() => {
                    t.img.complete && t.onImageLoad(),
                      t.img.addEventListener("load", t.onImageLoad.bind(t));
                  });
                });
            },
          },
          {
            key: "disconnectedCallback",
            value() {
              this.resizeObserver.disconnect();
            },
          },
          {
            key: "onImageLoad",
            value() {
              this.style.setProperty(
                "--image-url",
                "url(".concat(this.img.currentSrc, ")")
              ),
                this.refresh();
            },
          },
          {
            key: "onResize",
            value(t) {
              const e = t[0].borderBoxSize[0], n = e.inlineSize, r = e.blockSize;
              (this.containerRect = { width: n, height: r }),
                this.refresh();
            },
          },
          {
            key: "transformCropRectToCSS",
            value() {
              let t;
              let e;
              const n = this.targetScale;
              const r = this.imageDimensions.width * (n / this.imageScale);

              let o = {
                width: "".concat(r, "px"),
                height: "auto",
                y: this.cropRect.y,
                x: this.cropRect.x,
              };

              return ((o = this.applyFocalPoint(o)).y *= n),
              (o.x *= n),
              (t = o),
              (e = (t, e) => {
                return "--".concat(e);
              }),
              Object.entries(t).reduce((t, n) => {
                const r = $(n, 2), o = r[0], i = r[1];
                return K(K({}, t), {}, G({}, e(i, o), i));
              }, {});
            },
          },
          {
            key: "applyFocalPoint",
            value(t) {
              const e = this,
                    n = this.focalPointRect,
                    r = this.targetScale,
                    o = (function (t) {
                      for (let e = 1; e < arguments.length; e++) {
                        const n = null != arguments[e] ? arguments[e] : {};
                        e % 2
                          ? nt(Object(n), !0).forEach(e => {
                              rt(t, e, n[e]);
                            })
                          : Object.getOwnPropertyDescriptors
                          ? Object.defineProperties(
                              t,
                              Object.getOwnPropertyDescriptors(n)
                            )
                          : nt(Object(n)).forEach(e => {
                              Object.defineProperty(
                                t,
                                e,
                                Object.getOwnPropertyDescriptor(n, e)
                              );
                            });
                      }
                      return t;
                    })({}, t);
              ["x", "y", "x2", "y2"].forEach(t => {
                n[t] += e.cropRect[t[0]];
              });
              const i = o.x + this.containerRect.width / r, a = o.y + this.containerRect.height / r;
              return (
                n.x2 > i && (o.x += n.x2 - i),
                n.y2 > a && (o.y += n.y2 - a),
                (o.x = Math.max(0, o.x)),
                (o.y = Math.max(0, o.y)),
                o
              );
            },
          },
          {
            key: "refresh",
            value() {
              this.img && this.setAttribute("fit", this.fitDirection),
                this.requestUpdate();
            },
          },
          {
            key: "render",
            value() {
              return Object(o.d)(
                tt(),
                Object(s.a)(this.positionStyle),
                this.debugHtml
              );
            },
          },
          {
            key: "imageDimensions",
            get() {
              let t = this.originalWidth, e = this.originalHeight;
              return (
                this.img &&
                  ((t = this.img.naturalWidth),
                  (e = this.img.naturalHeight)),
                { width: t, height: e }
              );
            },
          },
          {
            key: "img",
            get() {
              return this.querySelector("img");
            },
          },
          {
            key: "fitWidthScale",
            get() {
              return this.imageDimensions.width / this.containerRect.width;
            },
          },
          {
            key: "fitHeightScale",
            get() {
              return (
                this.imageDimensions.height / this.containerRect.height
              );
            },
          },
          {
            key: "fitDirection",
            get() {
              return this.fitWidthScale > this.fitHeightScale
                ? "vertical"
                : "horizontal";
            },
          },
          {
            key: "positionStyle",
            get() {
              return "contained" === this.mode
                ? {}
                : this.transformCropRectToCSS();
            },
          },
          {
            key: "targetScale",
            get() {
              const t = this.containerRect.width / this.cropRect.w, e = this.containerRect.height / this.cropRect.h;
              return Math.max(t, e);
            },
          },
          {
            key: "imageScale",
            get() {
              return this.imageDimensions.width / this.originalWidth;
            },
          },
          {
            key: "focalPointRect",
            get() {
              const t = this.targetScale,
                    e = this.containerRect,
                    n = e.width / t / 2,
                    r = e.height / t / 2,
                    o = {
                      x: Math.max(0, this.focalPoint.x - n),
                      y: Math.max(0, this.focalPoint.y - r),
                    };
              return (
                (o.x2 = Math.min(this.focalPoint.x + n, this.cropRect.w)),
                (o.y2 = Math.min(this.focalPoint.y + r, this.cropRect.h)),
                (o.w = o.x2 - o.x),
                (o.h = o.y2 - o.y),
                o
              );
            },
          },
          {
            key: "debugHtml",
            get() {
              return this.debug && "cropped" === this.mode
                ? Object(o.d)(
                    Z(),
                    this.img.getAttribute("src"),
                    this.cropRect,
                    this.focalPoint,
                    this.originalWidth,
                    this.originalHeight,
                    this.focalPointRect,
                    this.containerRect
                  )
                : null;
            },
          },
        ]) && it(e.prototype, n),
        r && it(e, r),
        a;
      })(o.a))
      ) || Y;
  },
  559: function (t, e, n) {
    "use strict";
    n.r(e);
    const r = n(0), o = n(6), i = r.a.start(), a = n(327);
    i.load(Object(o.a)(a));
    n(131), n(344), n(348);
  },
  6: function (t, e, n) {
    "use strict";
    function r(t) {
      return t
        .keys()
        .map(e => {
          return ((t, e) => {
            const n = (t => {
              const e = (t.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/) ||
                [])[1];
              if (e) return e.replace(/_/g, "-").replace(/\//g, "--");
            })(e);
            if (n)
              return ((t, e) => {
                const n = t.default;
                if ("function" == typeof n)
                  return { identifier: e, controllerConstructor: n };
              })(t(e), n);
          })(t, e);
        })
        .filter(t => {
          return t;
        });
    }
    n.d(e, "a", () => {
      return r;
    });
  },
  84: function (t, e) {
    window.SM2_DEFER = !0;
  },
  9: function (t, e, n) {
    "use strict";
    n.d(e, "f", () => {
      return r;
    }),
      n.d(e, "g", () => {
        return o;
      }),
      n.d(e, "b", () => {
        return a;
      }),
      n.d(e, "a", () => {
        return s;
      }),
      n.d(e, "d", () => {
        return c;
      }),
      n.d(e, "c", () => {
        return l;
      }),
      n.d(e, "e", () => {
        return f;
      });
    var r = "{{lit-".concat(String(Math.random()).slice(2), "}}");
    var o = "\x3c!--".concat(r, "--\x3e");
    const i = new RegExp("".concat(r, "|").concat(o));
    var a = "$lit$";

    var s = function t(e, n) {
      !((t, e) => {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this, t),
        (this.parts = []),
        (this.element = n);
      for (
        var o = [],
          s = [],
          c = document.createTreeWalker(n.content, 133, null, !1),
          d = 0,
          p = -1,
          h = 0,
          y = e.strings,
          m = e.values.length;
        h < m;

      ) {
        const v = c.nextNode();
        if (null !== v) {
          if ((p++, 1 === v.nodeType)) {
            if (v.hasAttributes()) {
              for (
                var g = v.attributes, b = g.length, w = 0, _ = 0;
                _ < b;
                _++
              )
                u(g[_].name, a) && w++;
              for (; w-- > 0; ) {
                const O = y[h], S = f.exec(O)[2], P = S.toLowerCase() + a, E = v.getAttribute(P);
                v.removeAttribute(P);
                const T = E.split(i);
                this.parts.push({
                  type: "attribute",
                  index: p,
                  name: S,
                  strings: T,
                }),
                  (h += T.length - 1);
              }
            }
            "TEMPLATE" === v.tagName &&
              (s.push(v), (c.currentNode = v.content));
          } else if (3 === v.nodeType) {
            const k = v.data;
            if (k.includes(r)) {
              for (
                var A = v.parentNode, j = k.split(i), L = j.length - 1, M = 0;
                M < L;
                M++
              ) {
                let x = void 0, R = j[M];
                if ("" === R) x = l();
                else {
                  const D = f.exec(R);
                  null !== D &&
                    u(D[2], a) &&
                    (R =
                      R.slice(0, D.index) +
                      D[1] +
                      D[2].slice(0, -a.length) +
                      D[3]),
                    (x = document.createTextNode(R));
                }
                A.insertBefore(x, v),
                  this.parts.push({ type: "node", index: ++p });
              }
              "" === j[L]
                ? (A.insertBefore(l(), v), o.push(v))
                : (v.data = j[L]),
                (h += L);
            }
          } else if (8 === v.nodeType)
            if (v.data === r) {
              const C = v.parentNode;
              (null !== v.previousSibling && p !== d) ||
                (p++, C.insertBefore(l(), v)),
                (d = p),
                this.parts.push({ type: "node", index: p }),
                null === v.nextSibling ? (v.data = "") : (o.push(v), p--),
                h++;
            } else
              for (let I = -1; -1 !== (I = v.data.indexOf(r, I + 1)); )
                this.parts.push({ type: "node", index: -1 }), h++;
        } else c.currentNode = s.pop();
      }
      for (let N = 0, F = o; N < F.length; N++) {
        const B = F[N];
        B.parentNode.removeChild(B);
      }
    };

    const u = (t, e) => {
      const n = t.length - e.length;
      return n >= 0 && t.slice(n) === e;
    };

    var c = t => {
      return -1 !== t.index;
    };

    var l = () => {
      return document.createComment("");
    };

    var f = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
  },
  96: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.d(e, "a", () => {
      return c;
    });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        return r(this, c), u.apply(this, arguments);
      }
      return (e = c),
      (n = [
        {
          key: "connect",
          value() {
            if (!document.querySelector("#fb-root")) {
              const t = document.createElement("div");
              (t.id = "fb-root"), document.body.appendChild(t);
            }
            if (!document.querySelector("#fb-sdk")) {
              const e = document.createElement("script");
              (e.id = "fb-sdk"),
                (e.src =
                  "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"),
                document.body.appendChild(e);
            }
            window.FB && window.FB.XFBML.parse();
          },
        },
      ]) && o(e.prototype, n),
      s && o(e, s),
      c
    ;
    })(n(0).b);
  },
  99: function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function i(t, e) {
      return (i =
        Object.setPrototypeOf ||
        ((t, e) => {
          return (t.__proto__ = e), t;
        }))(t, e);
    }
    function a(t) {
      const e = (() => {
        if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" === typeof Proxy) return !0;
        try {
          return Date.prototype.toString.call(
            Reflect.construct(Date, [], () => {})
          ),
          !0
        ;
        } catch (t) {
          return !1;
        }
      })();
      return function () {
        let n;
        const r = u(t);
        if (e) {
          const o = u(this).constructor;
          n = Reflect.construct(r, arguments, o);
        } else n = r.apply(this, arguments);
        return s(this, n);
      };
    }
    function s(t, e) {
      return !e || ("object" !== typeof e && "function" !== typeof e) ? (t => {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t) : e;
    }
    function u(t) {
      return (u = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : t => {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    n.d(e, "a", () => {
      return c;
    });
    var c = (t => {
      !((t, e) => {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          e && i(t, e);
      })(c, t);
      let e;
      let n;
      let s;
      const u = a(c);
      function c() {
        return r(this, c), u.apply(this, arguments);
      }
      return (
        (e = c),
        (n = [
          {
            key: "connect",
            value() {
              this.element.src = ""
                .concat(this.element.dataset.src, "&parent=")
                .concat(window.location.hostname);
            },
          },
        ]) && o(e.prototype, n),
        s && o(e, s),
        c
      );
    })(n(0).b);
  },
});
//# sourceMappingURL=usersite-ff3b56ae7dfd0704a36b.js.map
