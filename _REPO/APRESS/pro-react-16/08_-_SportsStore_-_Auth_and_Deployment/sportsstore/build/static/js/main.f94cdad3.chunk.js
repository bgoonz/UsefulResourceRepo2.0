(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    20: function (t, e, a) {
      "use strict";
      a.d(e, "b", function () {
        return o;
      }),
        a.d(e, "a", function () {
          return s;
        }),
        a.d(e, "c", function () {
          return i;
        });
      var n,
        r = a(13),
        c = a(7),
        o =
          ((n = {}),
          Object(r.a)(n, c.b.PRODUCTS, "/api/products"),
          Object(r.a)(n, c.b.CATEGORIES, "/api/categories"),
          Object(r.a)(n, c.b.ORDERS, "/api/orders"),
          n),
        s = "/graphql",
        i = "/login";
    },
    33: function (t, e, a) {
      "use strict";
      a.d(e, "a", function () {
        return m;
      });
      var n = a(2),
        r = a(6),
        c = a(4),
        o = a(3),
        s = a(5),
        i = a(0),
        l = a.n(i),
        u = a(121),
        p = a(122),
        m = (function (t) {
          function e() {
            return (
              Object(n.a)(this, e),
              Object(c.a)(this, Object(o.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(s.a)(e, t),
            Object(r.a)(e, [
              {
                key: "render",
                value: function () {
                  var t = this;
                  return l.a.createElement(u.a, {
                    path: this.props.to,
                    exact: this.props.exact,
                    children: function (e) {
                      var a = t.props.className || "m-2 btn btn-block",
                        n = t.props.activeClass || "btn-primary",
                        r = t.props.inActiveClass || "btn-secondary",
                        c = "".concat(a, " ").concat(e.match ? n : r);
                      return l.a.createElement(
                        p.a,
                        { to: t.props.to, className: c },
                        t.props.children
                      );
                    },
                  });
                },
              },
            ]),
            e
          );
        })(i.Component);
    },
    34: function (t, e, a) {
      "use strict";
      var n = a(13),
        r = a(16),
        c = a(9),
        o = a(2),
        s = a(6),
        i = a(4),
        l = a(3),
        u = a(5),
        p = a(0),
        m = a.n(p),
        d = (function (t) {
          function e() {
            return (
              Object(o.a)(this, e),
              Object(i.a)(this, Object(l.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(u.a)(e, t),
            Object(s.a)(e, [
              {
                key: "render",
                value: function () {
                  return this.props.errors
                    ? this.props.errors.map(function (t) {
                        return m.a.createElement(
                          "h6",
                          { className: "text-danger", key: t },
                          t
                        );
                      })
                    : null;
                },
              },
            ]),
            e
          );
        })(p.Component),
        h = function (t) {
          var e = [];
          return (
            t.validity.valueMissing && e.push("Value required"),
            t.validity.typeMismatch && e.push("Invalid ".concat(t.type)),
            e
          );
        };
      a.d(e, "a", function () {
        return b;
      });
      var b = (function (t) {
        function e(t) {
          var a;
          return (
            Object(o.a)(this, e),
            ((a = Object(i.a)(
              this,
              Object(l.a)(e).call(this, t)
            )).handleSubmit = function () {
              a.setState(
                function (t) {
                  var e = Object(c.a)({}, t, { validationErrors: {} });
                  return (
                    Object.values(a.formElements).forEach(function (t) {
                      t.checkValidity() || (e.validationErrors[t.name] = h(t));
                    }),
                    e
                  );
                },
                function () {
                  if (0 === Object.keys(a.state.validationErrors).length) {
                    var t = Object.assign.apply(
                      Object,
                      Object(r.a)(
                        Object.entries(a.formElements).map(function (t) {
                          return Object(n.a)({}, t[0], t[1].value);
                        })
                      )
                    );
                    a.props.submitCallback(t);
                  }
                }
              );
            }),
            (a.registerRef = function (t) {
              null !== t && (a.formElements[t.name] = t);
            }),
            (a.renderElement = function (t) {
              var e = t.name || t.label.toLowerCase();
              return m.a.createElement(
                "div",
                { className: "form-group", key: t.label },
                m.a.createElement("label", null, t.label),
                m.a.createElement(d, { errors: a.state.validationErrors[e] }),
                m.a.createElement(
                  "input",
                  Object.assign(
                    { className: "form-control", name: e, ref: a.registerRef },
                    a.props.defaultAttrs,
                    t.attrs
                  )
                )
              );
            }),
            (a.state = { validationErrors: {} }),
            (a.formElements = {}),
            a
          );
        }
        return (
          Object(u.a)(e, t),
          Object(s.a)(e, [
            {
              key: "render",
              value: function () {
                var t = this;
                return m.a.createElement(
                  m.a.Fragment,
                  null,
                  this.props.formModel.map(function (e) {
                    return t.renderElement(e);
                  }),
                  m.a.createElement(
                    "div",
                    { className: "text-center" },
                    m.a.createElement(
                      "button",
                      {
                        className: "btn btn-secondary m-1",
                        onClick: this.props.cancelCallback,
                      },
                      this.props.cancelText || "Cancel"
                    ),
                    m.a.createElement(
                      "button",
                      {
                        className: "btn btn-primary m-1",
                        onClick: this.handleSubmit,
                      },
                      this.props.submitText || "Submit"
                    )
                  )
                );
              },
            },
          ]),
          e
        );
      })(p.Component);
    },
    35: function (t, e, a) {
      "use strict";
      var n = a(2),
        r = a(6),
        c = a(4),
        o = a(3),
        s = a(5),
        i = a(0),
        l = a.n(i),
        u = a(16),
        p = (function (t) {
          function e() {
            var t, a;
            Object(n.a)(this, e);
            for (var r = arguments.length, s = new Array(r), i = 0; i < r; i++)
              s[i] = arguments[i];
            return (
              ((a = Object(c.a)(
                this,
                (t = Object(o.a)(e)).call.apply(t, [this].concat(s))
              )).getPageNumbers = function () {
                return a.props.pageCount < 4
                  ? Object(u.a)(Array(a.props.pageCount + 1).keys()).slice(1)
                  : a.props.currentPage <= 4
                  ? [1, 2, 3, 4, 5]
                  : a.props.currentPage > a.props.pageCount - 4
                  ? Object(u.a)(Array(5).keys())
                      .reverse()
                      .map(function (t) {
                        return a.props.pageCount - t;
                      })
                  : [
                      a.props.currentPage - 1,
                      a.props.currentPage,
                      a.props.currentPage + 1,
                    ];
              }),
              a
            );
          }
          return (
            Object(s.a)(e, t),
            Object(r.a)(e, [
              {
                key: "render",
                value: function () {
                  var t = this.props.currentPage,
                    e = this.props.pageCount,
                    a = this.props.navigate;
                  return l.a.createElement(
                    l.a.Fragment,
                    null,
                    l.a.createElement(
                      "button",
                      {
                        onClick: function () {
                          return a(t - 1);
                        },
                        disabled: 1 === t,
                        className: "btn btn-secondary mx-1",
                      },
                      "Previous"
                    ),
                    t > 4 &&
                      l.a.createElement(
                        l.a.Fragment,
                        null,
                        l.a.createElement(
                          "button",
                          {
                            className: "btn btn-secondary mx-1",
                            onClick: function () {
                              return a(1);
                            },
                          },
                          "1"
                        ),
                        l.a.createElement("span", { className: "h4" }, "...")
                      ),
                    this.getPageNumbers().map(function (e) {
                      return l.a.createElement(
                        "button",
                        {
                          className: "btn mx-1 ".concat(
                            e === t ? "btn-primary" : "btn-secondary"
                          ),
                          onClick: function () {
                            return a(e);
                          },
                          key: e,
                        },
                        e
                      );
                    }),
                    t <= e - 4 &&
                      l.a.createElement(
                        l.a.Fragment,
                        null,
                        l.a.createElement("span", { className: "h4" }, "..."),
                        l.a.createElement(
                          "button",
                          {
                            className: "btn btn-secondary mx-1",
                            onClick: function () {
                              return a(e);
                            },
                          },
                          e
                        )
                      ),
                    l.a.createElement(
                      "button",
                      {
                        onClick: function () {
                          return a(t + 1);
                        },
                        disabled: t === e,
                        className: "btn btn-secondary mx-1",
                      },
                      "Next"
                    )
                  );
                },
              },
            ]),
            e
          );
        })(i.Component);
      a.d(e, "a", function () {
        return m;
      });
      var m = (function (t) {
        function e(t) {
          var a;
          return (
            Object(n.a)(this, e),
            ((a = Object(c.a)(
              this,
              Object(o.a)(e).call(this, t)
            )).handlePageSizeChange = function (t) {
              a.props.setPageSize(t.target.value);
            }),
            (a.handleSortPropertyChange = function (t) {
              a.props.setSortProperty(t.target.value);
            }),
            (a.pageSizes = a.props.sizes || [5, 10, 25, 100]),
            (a.sortKeys = a.props.keys || ["Name", "Price"]),
            a
          );
        }
        return (
          Object(s.a)(e, t),
          Object(r.a)(e, [
            {
              key: "render",
              value: function () {
                return l.a.createElement(
                  "div",
                  { className: "m-2" },
                  l.a.createElement(
                    "div",
                    { className: "text-center m-1" },
                    l.a.createElement(p, {
                      currentPage: this.props.currentPage,
                      pageCount: this.props.pageCount,
                      navigate: this.props.navigateToPage,
                    })
                  ),
                  l.a.createElement(
                    "div",
                    { className: "form-inline justify-content-center" },
                    l.a.createElement(
                      "select",
                      {
                        className: "form-control",
                        onChange: this.handlePageSizeChange,
                        value: this.props.pageSize || this.pageSizes[0],
                      },
                      this.pageSizes.map(function (t) {
                        return l.a.createElement(
                          "option",
                          { value: t, key: t },
                          t,
                          " per page"
                        );
                      })
                    ),
                    l.a.createElement(
                      "select",
                      {
                        className: "form-control",
                        onChange: this.handleSortPropertyChange,
                        value: this.props.sortKey || this.sortKeys[0],
                      },
                      this.sortKeys.map(function (t) {
                        return l.a.createElement(
                          "option",
                          { value: t.toLowerCase(), key: t },
                          "Sort By ",
                          t
                        );
                      })
                    )
                  )
                );
              },
            },
          ]),
          e
        );
      })(i.Component);
    },
    42: function (t, e, a) {
      "use strict";
      a.d(e, "a", function () {
        return r;
      });
      var n = a(0),
        r = a.n(n).a.createContext({
          isAuthenticated: !1,
          webToken: null,
          authenticate: function (t, e) {},
          signout: function () {},
        });
    },
    47: function (t, e, a) {
      t.exports = a(81);
    },
    52: function (t, e, a) {},
    7: function (t, e, a) {
      "use strict";
      a.d(e, "b", function () {
        return n;
      }),
        a.d(e, "a", function () {
          return r;
        });
      var n = {
          PRODUCTS: "products",
          CATEGORIES: "categories",
          ORDERS: "orders",
        },
        r = {
          DATA_LOAD: "data_load",
          DATA_STORE: "data_store",
          DATA_SET_SORT_PROPERTY: "data_set_sort",
          DATA_SET_PAGESIZE: "data_set_pagesize",
          CART_ADD: "cart_add",
          CART_UPDATE: "cart_update",
          CART_REMOVE: "cart_delete",
          CART_CLEAR: "cart_clear",
        };
    },
    81: function (t, e, a) {
      "use strict";
      a.r(e);
      var n = {};
      a.r(n),
        a.d(n, "loadData", function () {
          return P;
        }),
        a.d(n, "setPageSize", function () {
          return _;
        }),
        a.d(n, "setSortProperty", function () {
          return D;
        }),
        a.d(n, "placeOrder", function () {
          return w;
        });
      var r = {};
      a.r(r),
        a.d(r, "addToCart", function () {
          return Q;
        }),
        a.d(r, "updateCartQuantity", function () {
          return V;
        }),
        a.d(r, "removeFromCart", function () {
          return Z;
        }),
        a.d(r, "clearCart", function () {
          return B;
        });
      var c,
        o = a(0),
        s = a.n(o),
        i = a(43),
        l = a.n(i),
        u = (a(52), a(2)),
        p = a(6),
        m = a(4),
        d = a(3),
        h = a(5),
        b = a(27),
        f = a(13),
        E = a(9),
        y = a(7),
        O = a(16),
        g = Object(b.c)(
          (function () {
            for (var t = arguments.length, e = new Array(t), a = 0; a < t; a++)
              e[a] = arguments[a];
            return function (t, a) {
              for (var n = 0; n < e.length; n++) {
                var r = e[n](t, a);
                if (r !== t) return r;
              }
              return t;
            };
          })(
            function (t, e) {
              var a;
              switch (e.type) {
                case y.a.DATA_LOAD:
                  return Object(E.a)(
                    {},
                    t,
                    ((a = {}),
                    Object(f.a)(a, e.payload.dataType, e.payload.data),
                    Object(f.a)(
                      a,
                      "".concat(e.payload.dataType, "_total"),
                      e.payload.total
                    ),
                    Object(f.a)(
                      a,
                      "".concat(e.payload.dataType, "_params"),
                      e.payload.params
                    ),
                    a)
                  );
                case y.a.DATA_SET_PAGESIZE:
                  return Object(E.a)({}, t, { pageSize: e.payload });
                case y.a.DATA_SET_SORT_PROPERTY:
                  return Object(E.a)({}, t, { sortKey: e.payload });
                case y.a.DATA_STORE:
                  if (e.payload.dataType === y.b.ORDERS)
                    return Object(E.a)({}, t, { order: e.payload.data });
                  break;
                default:
                  return t || {};
              }
            },
            function (t, e) {
              var a = Object(E.a)({ cart: [], cartItems: 0, cartPrice: 0 }, t);
              switch (e.type) {
                case y.a.CART_ADD:
                  var n = e.payload.product,
                    r = e.payload.quantity,
                    c = a.cart.find(function (t) {
                      return t.product.id === n.id;
                    });
                  return (
                    c
                      ? (c.quantity += r)
                      : (a.cart = [].concat(Object(O.a)(a.cart), [e.payload])),
                    (a.cartItems += r),
                    (a.cartPrice += n.price * r),
                    a
                  );
                case y.a.CART_UPDATE:
                  return (
                    (a.cart = a.cart.map(function (t) {
                      if (t.product.id === e.payload.product.id) {
                        var n = e.payload.quantity - t.quantity;
                        return (
                          (a.cartItems += n),
                          (a.cartPrice += t.product.price * n),
                          e.payload
                        );
                      }
                      return t;
                    })),
                    a
                  );
                case y.a.CART_REMOVE:
                  var o = a.cart.find(function (t) {
                    return t.product.id === e.payload.id;
                  });
                  return (
                    (a.cartItems -= o.quantity),
                    (a.cartPrice -= o.quantity * o.product.price),
                    (a.cart = a.cart.filter(function (t) {
                      return t !== o;
                    })),
                    a
                  );
                case y.a.CART_CLEAR:
                  return Object(E.a)({}, t, {
                    cart: [],
                    cartItems: 0,
                    cartPrice: 0,
                  });
                default:
                  return t || {};
              }
            }
          ),
          Object(b.a)(function () {
            return function (t) {
              return function (e) {
                var a;
                ("object" !== typeof (a = e.payload) &&
                  "function" !== typeof a) ||
                "function" !== typeof a.then
                  ? t(e)
                  : e.payload.then(function (a) {
                      return t(Object(E.a)({}, e, { payload: a }));
                    });
              };
            };
          })
        ),
        v = a(26),
        j = a(125),
        C = a(127),
        T = a(121),
        A = a(124),
        S = a(28),
        k = a.n(S),
        N = a(20),
        R = new (function t(e) {
          var a = this;
          Object(u.a)(this, t),
            (this.GetData = function (t, e) {
              return a.SendRequest("get", N.b[t], e);
            }),
            (this.StoreData = function (t, e) {
              return a.SendRequest("post", N.b[t], {}, e);
            }),
            (this.SendRequest = function (t, e, a, n) {
              return k.a.request({ method: t, url: e, params: a, data: n });
            }),
            (this.error_handler = e || function () {});
        })(),
        P = function (t, e) {
          return {
            type: y.a.DATA_LOAD,
            payload: R.GetData(t, e).then(function (a) {
              return {
                dataType: t,
                data: a.data,
                total: Number(a.headers["x-total-count"]),
                params: e,
              };
            }),
          };
        },
        _ = function (t) {
          return { type: y.a.DATA_SET_PAGESIZE, payload: t };
        },
        D = function (t) {
          return { type: y.a.DATA_SET_SORT_PROPERTY, payload: t };
        },
        w = function (t) {
          return {
            type: y.a.DATA_STORE,
            payload: R.StoreData(y.b.ORDERS, t).then(function (t) {
              return { dataType: y.b.ORDERS, data: t.data };
            }),
          };
        },
        x = a(33),
        q = a(122),
        I = (function (t) {
          function e() {
            return (
              Object(u.a)(this, e),
              Object(m.a)(this, Object(d.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  var t = this;
                  return s.a.createElement(
                    s.a.Fragment,
                    null,
                    s.a.createElement(
                      x.a,
                      { to: "".concat(this.props.baseUrl, "/all"), exact: !1 },
                      "All"
                    ),
                    this.props.categories &&
                      this.props.categories.map(function (e) {
                        return s.a.createElement(
                          x.a,
                          {
                            key: e,
                            to: ""
                              .concat(t.props.baseUrl, "/")
                              .concat(e.toLowerCase()),
                          },
                          e
                        );
                      }),
                    s.a.createElement(
                      q.a,
                      {
                        className:
                          "btn btn-block btn-secondary fixed-bottom m-2 col-3",
                        to: "/admin",
                      },
                      "Administration"
                    )
                  );
                },
              },
            ]),
            e
          );
        })(o.Component),
        z = (function (t) {
          function e() {
            return (
              Object(u.a)(this, e),
              Object(m.a)(this, Object(d.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  var t = this;
                  return null == this.props.products ||
                    0 === this.props.products.length
                    ? s.a.createElement(
                        "h5",
                        { className: "p-2" },
                        "No Products"
                      )
                    : this.props.products.map(function (e) {
                        return s.a.createElement(
                          "div",
                          { className: "card m-1 p-1 bg-light", key: e.id },
                          s.a.createElement(
                            "h4",
                            null,
                            e.name,
                            s.a.createElement(
                              "span",
                              {
                                className:
                                  "badge badge-pill badge-primary float-right",
                              },
                              "$",
                              e.price.toFixed(2)
                            )
                          ),
                          s.a.createElement(
                            "div",
                            { className: "card-text bg-white p-1" },
                            e.description,
                            s.a.createElement(
                              "button",
                              {
                                className: "btn btn-success btn-sm float-right",
                                onClick: function () {
                                  return t.props.addToCart(e);
                                },
                              },
                              "Add To Cart"
                            )
                          )
                        );
                      });
                },
              },
            ]),
            e
          );
        })(o.Component),
        F = (function (t) {
          function e() {
            var t, a;
            Object(u.a)(this, e);
            for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
              r[c] = arguments[c];
            return (
              ((a = Object(m.a)(
                this,
                (t = Object(d.a)(e)).call.apply(t, [this].concat(r))
              )).getSummary = function () {
                return a.props.cartItems > 0
                  ? s.a.createElement(
                      "span",
                      null,
                      a.props.cartItems,
                      " item(s), $",
                      a.props.cartPrice.toFixed(2)
                    )
                  : s.a.createElement("span", null, "Your cart: (empty) ");
              }),
              (a.getLinkClasses = function () {
                return "btn btn-sm bg-dark text-white \n            ".concat(
                  0 === a.props.cartItems ? "disabled" : ""
                );
              }),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    "div",
                    { className: "float-right" },
                    s.a.createElement(
                      "small",
                      null,
                      this.getSummary(),
                      s.a.createElement(
                        q.a,
                        { className: this.getLinkClasses(), to: "/shop/cart" },
                        s.a.createElement("i", {
                          className: "fa fa-shopping-cart",
                        })
                      )
                    )
                  );
                },
              },
            ]),
            e
          );
        })(o.Component),
        L = a(126),
        M = function (t) {
          return t;
        },
        U = { setPageSize: _, setSortProperty: D },
        G = function (t, e, a) {
          return Object(E.a)({}, t, a, e, {
            currentPage: Number(a.match.params.page),
            pageCount: Math.ceil(
              (t.products_total | t.pageSize || 5) / (t.pageSize || 5)
            ),
            navigateToPage: function (t) {
              return a.history.push(
                "/shop/products/".concat(a.match.params.category, "/").concat(t)
              );
            },
          });
        },
        Y = a(35),
        K = ((c = Y.a), Object(L.a)(Object(v.b)(M, U, G)(c))),
        $ = (function (t) {
          function e() {
            var t, a;
            Object(u.a)(this, e);
            for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
              r[c] = arguments[c];
            return (
              ((a = Object(m.a)(
                this,
                (t = Object(d.a)(e)).call.apply(t, [this].concat(r))
              )).handleAddToCart = function () {
                var t;
                (t = a.props).addToCart.apply(t, arguments),
                  a.props.history.push("/shop/cart");
              }),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    "div",
                    { className: "container-fluid" },
                    s.a.createElement(
                      "div",
                      { className: "row" },
                      s.a.createElement(
                        "div",
                        { className: "col bg-dark text-white" },
                        s.a.createElement(
                          "div",
                          { className: "navbar-brand" },
                          "SPORTS STORE"
                        ),
                        s.a.createElement(F, this.props)
                      )
                    ),
                    s.a.createElement(
                      "div",
                      { className: "row" },
                      s.a.createElement(
                        "div",
                        { className: "col-3 p-2" },
                        s.a.createElement(I, {
                          baseUrl: "/shop/products",
                          categories: this.props.categories,
                        })
                      ),
                      s.a.createElement(
                        "div",
                        { className: "col-9 p-2" },
                        s.a.createElement(K, null),
                        s.a.createElement(z, {
                          products: this.props.products,
                          addToCart: this.handleAddToCart,
                        })
                      )
                    )
                  );
                },
              },
            ]),
            e
          );
        })(o.Component),
        Q = function (t, e) {
          return {
            type: y.a.CART_ADD,
            payload: { product: t, quantity: e || 1 },
          };
        },
        V = function (t, e) {
          return {
            type: y.a.CART_UPDATE,
            payload: { product: t, quantity: e },
          };
        },
        Z = function (t) {
          return { type: y.a.CART_REMOVE, payload: t };
        },
        B = function () {
          return { type: y.a.CART_CLEAR };
        },
        W = (function (t) {
          function e() {
            var t, a;
            Object(u.a)(this, e);
            for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
              r[c] = arguments[c];
            return (
              ((a = Object(m.a)(
                this,
                (t = Object(d.a)(e)).call.apply(t, [this].concat(r))
              )).handleChange = function (t, e) {
                a.props.updateQuantity(t, e.target.value);
              }),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  var t = this;
                  return this.props.cart && 0 !== this.props.cart.length
                    ? s.a.createElement(
                        s.a.Fragment,
                        null,
                        this.props.cart.map(function (e) {
                          return s.a.createElement(
                            "tr",
                            { key: e.product.id },
                            s.a.createElement(
                              "td",
                              null,
                              s.a.createElement("input", {
                                type: "number",
                                value: e.quantity,
                                onChange: function (a) {
                                  return t.handleChange(e.product, a);
                                },
                              })
                            ),
                            s.a.createElement("td", null, e.product.name),
                            s.a.createElement(
                              "td",
                              null,
                              "$",
                              e.product.price.toFixed(2)
                            ),
                            s.a.createElement(
                              "td",
                              null,
                              "$",
                              (e.quantity * e.product.price).toFixed(2)
                            ),
                            s.a.createElement(
                              "td",
                              null,
                              s.a.createElement(
                                "button",
                                {
                                  className: "btn btn-sm btn-danger",
                                  onClick: function () {
                                    return t.props.removeFromCart(e.product);
                                  },
                                },
                                "Remove"
                              )
                            )
                          );
                        }),
                        s.a.createElement(
                          "tr",
                          null,
                          s.a.createElement(
                            "th",
                            { colSpan: "3", className: "text-right" },
                            "Total:"
                          ),
                          s.a.createElement(
                            "th",
                            { colSpan: "2" },
                            "$",
                            this.props.cartPrice.toFixed(2)
                          )
                        )
                      )
                    : s.a.createElement(
                        "tr",
                        null,
                        s.a.createElement(
                          "td",
                          { colSpan: "5" },
                          "Your cart is empty"
                        )
                      );
                },
              },
            ]),
            e
          );
        })(o.Component),
        J = (function (t) {
          function e() {
            var t, a;
            Object(u.a)(this, e);
            for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
              r[c] = arguments[c];
            return (
              ((a = Object(m.a)(
                this,
                (t = Object(d.a)(e)).call.apply(t, [this].concat(r))
              )).getLinkClasses = function () {
                return "btn btn-secondary m-1 \n        ".concat(
                  0 === a.props.cartItems ? "disabled" : ""
                );
              }),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    "div",
                    { className: "m-3" },
                    s.a.createElement(
                      "h2",
                      { className: "text-center" },
                      "Your Cart"
                    ),
                    s.a.createElement(
                      "table",
                      { className: "table table-bordered table-striped" },
                      s.a.createElement(
                        "thead",
                        null,
                        s.a.createElement(
                          "tr",
                          null,
                          s.a.createElement("th", null, "Quantity"),
                          s.a.createElement("th", null, "Product"),
                          s.a.createElement(
                            "th",
                            { className: "text-right" },
                            "Price"
                          ),
                          s.a.createElement(
                            "th",
                            { className: "text-right" },
                            "Subtotal"
                          ),
                          s.a.createElement("th", null)
                        )
                      ),
                      s.a.createElement(
                        "tbody",
                        null,
                        s.a.createElement(W, {
                          cart: this.props.cart,
                          cartPrice: this.props.cartPrice,
                          updateQuantity: this.props.updateCartQuantity,
                          removeFromCart: this.props.removeFromCart,
                        })
                      )
                    ),
                    s.a.createElement(
                      "div",
                      { className: "text-center" },
                      s.a.createElement(
                        q.a,
                        { className: "btn btn-primary m-1", to: "/shop" },
                        "Continue Shopping"
                      ),
                      s.a.createElement(
                        q.a,
                        {
                          className: this.getLinkClasses(),
                          to: "/shop/checkout",
                        },
                        "Checkout"
                      )
                    )
                  );
                },
              },
            ]),
            e
          );
        })(o.Component),
        H = (function (t) {
          function e() {
            var t, a;
            Object(u.a)(this, e);
            for (var n = arguments.length, r = new Array(n), c = 0; c < n; c++)
              r[c] = arguments[c];
            return (
              ((a = Object(m.a)(
                this,
                (t = Object(d.a)(e)).call.apply(t, [this].concat(r))
              )).componentDidUpdate = function () {
                return a.getData();
              }),
              (a.componentDidMount = function () {
                return a.getData();
              }),
              (a.getData = function () {
                var t = a.props.products_params || {},
                  e = {
                    _limit: a.props.pageSize || 5,
                    _sort: a.props.sortKey || "name",
                    _page: a.props.match.params.page || 1,
                    category_like:
                      "all" === (a.props.match.params.category || "")
                        ? ""
                        : a.props.match.params.category,
                  };
                Object.keys(e).find(function (a) {
                  return t[a] !== e[a];
                }) && a.props.loadData(y.b.PRODUCTS, e);
              }),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    s.a.Fragment,
                    null,
                    this.props.children
                  );
                },
              },
            ]),
            e
          );
        })(o.Component),
        X = a(34),
        tt = (function (t) {
          function e(t) {
            var a;
            return (
              Object(u.a)(this, e),
              ((a = Object(m.a)(
                this,
                Object(d.a)(e).call(this, t)
              )).handleSubmit = function (t) {
                var e = Object(E.a)({}, t, {
                  products: a.props.cart.map(function (t) {
                    return { quantity: t.quantity, product_id: t.product.id };
                  }),
                });
                a.props.placeOrder(e),
                  a.props.clearCart(),
                  a.props.history.push("/shop/thanks");
              }),
              (a.handleCancel = function () {
                a.props.history.push("/shop/cart");
              }),
              (a.defaultAttrs = { type: "text", required: !0 }),
              (a.formModel = [
                { label: "Name" },
                { label: "Email", attrs: { type: "email" } },
                { label: "Address" },
                { label: "City" },
                { label: "Zip/Postal Code", name: "zip" },
                { label: "Country" },
              ]),
              a
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    "div",
                    { className: "container-fluid" },
                    s.a.createElement(
                      "div",
                      { className: "row" },
                      s.a.createElement(
                        "div",
                        { className: "col bg-dark text-white" },
                        s.a.createElement(
                          "div",
                          { className: "navbar-brand" },
                          "SPORTS STORE"
                        )
                      )
                    ),
                    s.a.createElement(
                      "div",
                      { className: "row" },
                      s.a.createElement(
                        "div",
                        { className: "col m-2" },
                        s.a.createElement(X.a, {
                          formModel: this.formModel,
                          defaultAttrs: this.defaultAttrs,
                          submitCallback: this.handleSubmit,
                          cancelCallback: this.handleCancel,
                          submitText: "Place Order",
                          cancelText: "Return to Cart",
                        })
                      )
                    )
                  );
                },
              },
            ]),
            e
          );
        })(o.Component),
        et = (function (t) {
          function e() {
            return (
              Object(u.a)(this, e),
              Object(m.a)(this, Object(d.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    "div",
                    null,
                    s.a.createElement(
                      "div",
                      { className: "col bg-dark text-white" },
                      s.a.createElement(
                        "div",
                        { className: "navbar-brand" },
                        "SPORTS STORE"
                      )
                    ),
                    s.a.createElement(
                      "div",
                      { className: "m-2 text-center" },
                      s.a.createElement("h2", null, "Thanks!"),
                      s.a.createElement(
                        "p",
                        null,
                        "Thanks for placing your order."
                      ),
                      s.a.createElement(
                        "p",
                        null,
                        "Your order is #",
                        this.props.order ? this.props.order.id : 0
                      ),
                      s.a.createElement(
                        "p",
                        null,
                        "We'll ship your goods as soon as possible."
                      ),
                      s.a.createElement(
                        q.a,
                        { to: "/shop", className: "btn btn-primary" },
                        "Return to Store"
                      )
                    )
                  );
                },
              },
            ]),
            e
          );
        })(o.Component),
        at = Object(E.a)({}, n, r),
        nt = Object(v.b)(function (t) {
          return t;
        }, at)(
          (function (t) {
            function e() {
              var t, a;
              Object(u.a)(this, e);
              for (
                var n = arguments.length, r = new Array(n), c = 0;
                c < n;
                c++
              )
                r[c] = arguments[c];
              return (
                ((a = Object(m.a)(
                  this,
                  (t = Object(d.a)(e)).call.apply(t, [this].concat(r))
                )).selectComponent = function (t) {
                  var e = function e(n, r) {
                    return s.a.createElement(
                      n,
                      Object.assign({}, a.props, t),
                      r && e(r)
                    );
                  };
                  switch (t.match.params.section) {
                    case "products":
                      return e(H, $);
                    case "cart":
                      return e(J);
                    case "checkout":
                      return e(tt);
                    case "thanks":
                      return e(et);
                    default:
                      return s.a.createElement(A.a, {
                        to: "/shop/products/all/1",
                      });
                  }
                }),
                (a.componentDidMount = function () {
                  return a.props.loadData(y.b.CATEGORIES);
                }),
                a
              );
            }
            return (
              Object(h.a)(e, t),
              Object(p.a)(e, [
                {
                  key: "render",
                  value: function () {
                    var t = this;
                    return s.a.createElement(
                      C.a,
                      null,
                      s.a.createElement(A.a, {
                        from: "/shop/products/:category",
                        to: "/shop/products/:category/1",
                        exact: !0,
                      }),
                      s.a.createElement(T.a, {
                        path: "/shop/:section?/:category?/:page?",
                        render: function (e) {
                          return t.selectComponent(e);
                        },
                      })
                    );
                  },
                },
              ]),
              e
            );
          })(o.Component)
        ),
        rt = a(42),
        ct = (function (t) {
          function e(t) {
            var a;
            return (
              Object(u.a)(this, e),
              ((a = Object(m.a)(
                this,
                Object(d.a)(e).call(this, t)
              )).authenticate = function (t) {
                return k.a.post(N.c, t).then(function (t) {
                  if (!0 === t.data.success)
                    return (
                      a.setState({
                        isAuthenticated: !0,
                        webToken: t.data.token,
                      }),
                      !0
                    );
                  throw new Error("Invalid Credentials");
                });
              }),
              (a.signout = function () {
                a.setState({ isAuthenticated: !1, webToken: null });
              }),
              (a.render = function () {
                return s.a.createElement(
                  rt.a.Provider,
                  {
                    value: Object(E.a)({}, a.state, {
                      authenticate: a.authenticate,
                      signout: a.signout,
                    }),
                  },
                  a.props.children
                );
              }),
              (a.state = { isAuthenticated: !1, webToken: null }),
              a
            );
          }
          return Object(h.a)(e, t), e;
        })(o.Component),
        ot = Object(o.lazy)(function () {
          return Promise.all([a.e(3), a.e(1)]).then(a.bind(null, 123));
        }),
        st = (function (t) {
          function e() {
            return (
              Object(u.a)(this, e),
              Object(m.a)(this, Object(d.a)(e).apply(this, arguments))
            );
          }
          return (
            Object(h.a)(e, t),
            Object(p.a)(e, [
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    v.a,
                    { store: g },
                    s.a.createElement(
                      ct,
                      null,
                      s.a.createElement(
                        j.a,
                        null,
                        s.a.createElement(
                          C.a,
                          null,
                          s.a.createElement(T.a, {
                            path: "/shop",
                            component: nt,
                          }),
                          s.a.createElement(T.a, {
                            path: "/admin",
                            render: function (t) {
                              return s.a.createElement(
                                o.Suspense,
                                {
                                  fallback: s.a.createElement(
                                    "h3",
                                    null,
                                    "Loading..."
                                  ),
                                },
                                s.a.createElement(ot, t)
                              );
                            },
                          }),
                          s.a.createElement(A.a, { to: "/shop" })
                        )
                      )
                    )
                  );
                },
              },
            ]),
            e
          );
        })(o.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      a(77), a(79);
      l.a.render(s.a.createElement(st, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function (t) {
            t.unregister();
          });
    },
  },
  [[47, 4, 2]],
]);
//# sourceMappingURL=main.f94cdad3.chunk.js.map
