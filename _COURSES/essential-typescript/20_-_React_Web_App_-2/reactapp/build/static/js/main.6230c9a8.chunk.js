(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    42: function (e, t, a) {
      e.exports = a(71);
    },
    47: function (e, t, a) {},
    71: function (e, t, a) {
      "use strict";
      a.r(t);
      var r,
        n = a(0),
        c = a.n(n),
        o = a(19),
        l = a.n(o),
        i = (a(47), a(4)),
        u = a(2),
        s = a(10),
        d = a(9),
        m = a(11),
        p = a(22),
        b = a(23);
      !(function (e) {
        (e[(e.ADD_PRODUCTS = 0)] = "ADD_PRODUCTS"),
          (e[(e.MODIFY_ORDER = 1)] = "MODIFY_ORDER"),
          (e[(e.RESET_ORDER = 2)] = "RESET_ORDER");
      })(r || (r = {}));
      var h = a(3),
        O = (function () {
          function e(t, a) {
            Object(u.a)(this, e), (this.product = t), (this.quantity = a);
          }
          return (
            Object(h.a)(e, [
              {
                key: "total",
                get: function () {
                  return this.product.price * this.quantity;
                },
              },
            ]),
            e
          );
        })(),
        f = (function () {
          function e(t) {
            var a = this;
            Object(u.a)(this, e),
              (this.lines = new Map()),
              t &&
                t.forEach(function (e) {
                  return a.lines.set(e.product.id, e);
                });
          }
          return (
            Object(h.a)(e, [
              {
                key: "addProduct",
                value: function (e, t) {
                  this.lines.has(e.id)
                    ? 0 === t
                      ? this.removeProduct(e.id)
                      : (this.lines.get(e.id).quantity += t)
                    : this.lines.set(e.id, new O(e, t));
                },
              },
              {
                key: "removeProduct",
                value: function (e) {
                  this.lines.delete(e);
                },
              },
              {
                key: "orderLines",
                get: function () {
                  return Object(i.a)(this.lines.values());
                },
              },
              {
                key: "productCount",
                get: function () {
                  return Object(i.a)(this.lines.values()).reduce(function (
                    e,
                    t
                  ) {
                    return e + t.quantity;
                  },
                  0);
                },
              },
              {
                key: "total",
                get: function () {
                  return Object(i.a)(this.lines.values()).reduce(function (
                    e,
                    t
                  ) {
                    return e + t.total;
                  },
                  0);
                },
              },
            ]),
            e
          );
        })(),
        E = Object(p.b)(function (e, t) {
          switch (((e = e || { products: [], order: new f() }), t.type)) {
            case r.ADD_PRODUCTS:
              return Object(b.a)({}, e, {
                products: [].concat(
                  Object(i.a)(e.products),
                  Object(i.a)(t.payload)
                ),
              });
            case r.MODIFY_ORDER:
              return (
                e.order.addProduct(t.payload.product, t.payload.quantity),
                Object(b.a)({}, e)
              );
            case r.RESET_ORDER:
              return Object(b.a)({}, e, { order: new f() });
            default:
              return e;
          }
        }),
        y = a(16),
        j = a(27),
        g = a.n(j),
        v = "/api/products",
        k = "/api/orders",
        C = (function () {
          function e() {
            Object(u.a)(this, e);
          }
          return (
            Object(h.a)(e, [
              {
                key: "loadProducts",
                value: function (e) {
                  g.a.get(v).then(function (t) {
                    return e(t.data);
                  });
                },
              },
              {
                key: "storeOrder",
                value: function (e, t) {
                  var a = {
                    lines: Object(i.a)(e.orderLines.values()).map(function (e) {
                      return {
                        productId: e.product.id,
                        productName: e.product.name,
                        quantity: e.quantity,
                      };
                    }),
                  };
                  g.a.post(k, a).then(function (e) {
                    return t(e.data.id);
                  });
                },
              },
            ]),
            e
          );
        })(),
        N = function () {
          for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
            t[a] = arguments[a];
          return { type: r.ADD_PRODUCTS, payload: t };
        },
        w = a(14),
        D = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(s.a)(this, Object(d.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(m.a)(t, e),
            Object(h.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props.order.productCount;
                  return c.a.createElement(
                    "div",
                    { className: "p-1 bg-secondary text-white text-right" },
                    0 === e
                      ? "(No Selection)"
                      : ""
                          .concat(e, " product(s), $")
                          .concat(this.props.order.total.toFixed(2)),
                    c.a.createElement(
                      w.b,
                      { to: "/order", className: "btn btn-sm btn-primary m-1" },
                      "Submit Order"
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        R = a(41),
        x = function (e) {
          var t = Object(n.useState)(1),
            a = Object(R.a)(t, 2),
            r = a[0],
            o = a[1];
          return c.a.createElement(
            "div",
            { className: "card m-1 p-1 bg-light" },
            c.a.createElement(
              "h4",
              null,
              e.product.name,
              c.a.createElement(
                "span",
                { className: "badge badge-pill badge-primary float-right" },
                "$",
                e.product.price.toFixed(2)
              )
            ),
            c.a.createElement(
              "div",
              { className: "card-text bg-white p-1" },
              e.product.description,
              c.a.createElement(
                "button",
                {
                  className: "btn btn-success btn-sm float-right",
                  onClick: function () {
                    return e.callback(e.product, r);
                  },
                },
                "Add To Cart"
              ),
              c.a.createElement(
                "select",
                {
                  className: "form-control-inline float-right m-1",
                  onChange: function (e) {
                    return o(Number(e.target.value));
                  },
                },
                c.a.createElement("option", null, "1"),
                c.a.createElement("option", null, "2"),
                c.a.createElement("option", null, "3")
              )
            )
          );
        },
        S = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(s.a)(this, Object(d.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(m.a)(t, e),
            Object(h.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this;
                  return c.a.createElement(
                    "div",
                    null,
                    ["All"]
                      .concat(Object(i.a)(this.props.categories))
                      .map(function (t) {
                        var a =
                          e.props.selected === t
                            ? "btn-primary"
                            : "btn-secondary";
                        return c.a.createElement(
                          "button",
                          {
                            key: t,
                            className: "btn btn-block ".concat(a),
                            onClick: function () {
                              return e.props.selectCategory(t);
                            },
                          },
                          t
                        );
                      })
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        T = (function (e) {
          function t(e) {
            var a;
            return (
              Object(u.a)(this, t),
              ((a = Object(s.a)(
                this,
                Object(d.a)(t).call(this, e)
              )).selectCategory = function (e) {
                a.setState({ selectedCategory: e });
              }),
              (a.state = { selectedCategory: "All" }),
              a
            );
          }
          return (
            Object(m.a)(t, e),
            Object(h.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this;
                  return c.a.createElement(
                    "div",
                    null,
                    c.a.createElement(D, { order: this.props.order }),
                    c.a.createElement(
                      "div",
                      { className: "container-fluid" },
                      c.a.createElement(
                        "div",
                        { className: "row" },
                        c.a.createElement(
                          "div",
                          { className: "col-3 p-2" },
                          c.a.createElement(S, {
                            categories: this.props.categories,
                            selected: this.state.selectedCategory,
                            selectCategory: this.selectCategory,
                          })
                        ),
                        c.a.createElement(
                          "div",
                          { className: "col-9 p-2" },
                          this.products.map(function (t) {
                            return c.a.createElement(x, {
                              key: t.id,
                              product: t,
                              callback: e.props.addToOrder,
                            });
                          })
                        )
                      )
                    )
                  );
                },
              },
              {
                key: "products",
                get: function () {
                  var e = this;
                  return this.props.products.filter(function (t) {
                    return (
                      "All" === e.state.selectedCategory ||
                      t.category === e.state.selectedCategory
                    );
                  });
                },
              },
            ]),
            t
          );
        })(n.Component),
        P = {
          addToOrder: function (e, t) {
            return {
              type: r.MODIFY_ORDER,
              payload: { product: e, quantity: t },
            };
          },
        },
        _ = Object(y.b)(function (e) {
          return {
            products: e.products,
            categories: Object(i.a)(
              new Set(
                e.products.map(function (e) {
                  return e.category;
                })
              )
            ),
            order: e.order,
          };
        }, P)(T),
        A = a(15),
        q = Object(y.b)(function (e) {
          return { order: e.order };
        })(
          (function (e) {
            function t() {
              return (
                Object(u.a)(this, t),
                Object(s.a)(this, Object(d.a)(t).apply(this, arguments))
              );
            }
            return (
              Object(m.a)(t, e),
              Object(h.a)(t, [
                {
                  key: "render",
                  value: function () {
                    return c.a.createElement(
                      "div",
                      null,
                      c.a.createElement(
                        "h3",
                        { className: "text-center bg-primary text-white p-2" },
                        "Order Summary"
                      ),
                      c.a.createElement(
                        "div",
                        { className: "p-3" },
                        c.a.createElement(
                          "table",
                          { className: "table table-sm table-striped" },
                          c.a.createElement(
                            "thead",
                            null,
                            c.a.createElement(
                              "tr",
                              null,
                              c.a.createElement("th", null, "Quantity"),
                              c.a.createElement("th", null, "Product"),
                              c.a.createElement(
                                "th",
                                { className: "text-right" },
                                "Price"
                              ),
                              c.a.createElement(
                                "th",
                                { className: "text-right" },
                                "Subtotal"
                              )
                            )
                          ),
                          c.a.createElement(
                            "tbody",
                            null,
                            this.props.order.orderLines.map(function (e) {
                              return c.a.createElement(
                                "tr",
                                { key: e.product.id },
                                c.a.createElement("td", null, e.quantity),
                                c.a.createElement("td", null, e.product.name),
                                c.a.createElement(
                                  "td",
                                  { className: "text-right" },
                                  "$",
                                  e.product.price.toFixed(2)
                                ),
                                c.a.createElement(
                                  "td",
                                  { className: "text-right" },
                                  "$",
                                  e.total.toFixed(2)
                                )
                              );
                            })
                          ),
                          c.a.createElement(
                            "tfoot",
                            null,
                            c.a.createElement(
                              "tr",
                              null,
                              c.a.createElement(
                                "th",
                                { className: "text-right", colSpan: 3 },
                                "Total:"
                              ),
                              c.a.createElement(
                                "th",
                                { className: "text-right" },
                                "$",
                                this.props.order.total.toFixed(2)
                              )
                            )
                          )
                        )
                      ),
                      c.a.createElement(
                        "div",
                        { className: "text-center" },
                        c.a.createElement(
                          w.b,
                          {
                            to: "/products",
                            className: "btn btn-secondary m-1",
                          },
                          "Back"
                        ),
                        c.a.createElement(
                          "button",
                          {
                            className: "btn btn-primary m-1",
                            onClick: this.props.submitCallback,
                          },
                          "Submit Order"
                        )
                      )
                    );
                  },
                },
              ]),
              t
            );
          })(n.Component)
        ),
        F = (function (e) {
          function t() {
            return (
              Object(u.a)(this, t),
              Object(s.a)(this, Object(d.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(m.a)(t, e),
            Object(h.a)(t, [
              {
                key: "render",
                value: function () {
                  var e = this.props.match.params.id;
                  return c.a.createElement(
                    "div",
                    { className: "m-2 text-center" },
                    c.a.createElement("h2", null, "Thanks!"),
                    c.a.createElement(
                      "p",
                      null,
                      "Thanks for placing your order."
                    ),
                    c.a.createElement("p", null, "Your order is #", e),
                    c.a.createElement(
                      "p",
                      null,
                      "We'll ship your goods as soon as possible."
                    ),
                    c.a.createElement(
                      w.b,
                      { to: "/products", className: "btn btn-primary" },
                      "OK"
                    )
                  );
                },
              },
            ]),
            t
          );
        })(n.Component),
        I = (function (e) {
          function t(e) {
            var a;
            return (
              Object(u.a)(this, t),
              ((a = Object(s.a)(
                this,
                Object(d.a)(t).call(this, e)
              )).httpHandler = new C()),
              (a.render = function () {
                return c.a.createElement(
                  "div",
                  { className: "App" },
                  c.a.createElement(
                    y.a,
                    { store: E },
                    c.a.createElement(
                      w.a,
                      null,
                      c.a.createElement(
                        A.d,
                        null,
                        c.a.createElement(A.b, {
                          path: "/products",
                          component: _,
                        }),
                        c.a.createElement(A.b, {
                          path: "/order",
                          render: function (e) {
                            return c.a.createElement(
                              q,
                              Object.assign({}, e, {
                                submitCallback: function () {
                                  return a.submitCallback(e);
                                },
                              })
                            );
                          },
                        }),
                        c.a.createElement(A.b, {
                          path: "/summary/:id",
                          component: F,
                        }),
                        c.a.createElement(A.a, { to: "/products" })
                      )
                    )
                  )
                );
              }),
              (a.submitCallback = function (e) {
                a.httpHandler.storeOrder(E.getState().order, function (t) {
                  return e.history.push("/summary/".concat(t));
                });
              }),
              a.httpHandler.loadProducts(function (e) {
                return E.dispatch(N.apply(void 0, Object(i.a)(e)));
              }),
              a
            );
          }
          return Object(m.a)(t, e), t;
        })(n.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      a(70);
      l.a.render(c.a.createElement(I, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function (e) {
            e.unregister();
          });
    },
  },
  [[42, 1, 2]],
]);
//# sourceMappingURL=main.6230c9a8.chunk.js.map
