(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    123: function (e, t, a) {
      "use strict";
      a.r(t);
      var r = a(2),
        n = a(6),
        c = a(4),
        o = a(3),
        i = a(5),
        l = a(0),
        s = a.n(l),
        u = a(117),
        p = a(85),
        d = a(20),
        m = a(99),
        b = a(86),
        f = a.n(b);
      function h() {
        var e = Object(m.a)([
          "\n    query($id: ID!) {\n        product(id: $id) {\n            id, name, description, category, price\n        }\n    }",
        ]);
        return (
          (h = function () {
            return e;
          }),
          e
        );
      }
      function g() {
        var e = Object(m.a)([
          "\n    query($page: Int, $pageSize: Int, $sort: String) {\n        products {\n            totalSize, \n            products(page: $page, pageSize: $pageSize, sort: $sort) {\n                id, name, category, price\n            }\n        }\n    }",
        ]);
        return (
          (g = function () {
            return e;
          }),
          e
        );
      }
      function E() {
        var e = Object(m.a)([
          "\n    query($onlyShipped: Boolean, $page:Int, $pageSize:Int, $sort:String) {\n        orders(onlyUnshipped: $onlyShipped) {\n            totalSize, \n            orders(page: $page, pageSize: $pageSize, sort: $sort) {\n                id, name, email, shipped \n                products {\n                    quantity, product { price }\n                } \n            }\n        }\n    }",
        ]);
        return (
          (E = function () {
            return e;
          }),
          e
        );
      }
      var v = f()(E()),
        O = f()(g()),
        j = f()(h()),
        S = (function (e) {
          function t() {
            var e, a;
            Object(r.a)(this, t);
            for (var n = arguments.length, i = new Array(n), l = 0; l < n; l++)
              i[l] = arguments[l];
            return (
              ((a = Object(c.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(i))
              )).calcTotal = function (e) {
                return e
                  .reduce(function (e, t) {
                    return e + t.quantity * t.product.price;
                  }, 0)
                  .toFixed(2);
              }),
              (a.getShipping = function (e) {
                return e.shipped
                  ? s.a.createElement("i", {
                      className: "fa fa-shipping-fast text-success",
                    })
                  : s.a.createElement("i", {
                      className: "fa fa-exclamation-circle text-danger",
                    });
              }),
              (a.render = function () {
                return s.a.createElement(
                  "tr",
                  null,
                  s.a.createElement("td", null, a.props.order.id),
                  s.a.createElement("td", null, a.props.order.name),
                  s.a.createElement("td", null, a.props.order.email),
                  s.a.createElement(
                    "td",
                    { className: "text-right" },
                    "$",
                    a.calcTotal(a.props.order.products)
                  ),
                  s.a.createElement(
                    "td",
                    { className: "text-center" },
                    s.a.createElement(
                      "button",
                      {
                        className: "btn btn-sm btn-block bg-muted",
                        onClick: a.props.toggleShipped,
                      },
                      a.getShipping(a.props.order),
                      s.a.createElement(
                        "span",
                        null,
                        a.props.order.shipped ? " Shipped" : " Pending"
                      )
                    )
                  )
                );
              }),
              a
            );
          }
          return Object(i.a)(t, e), t;
        })(l.Component),
        y = a(35),
        N = (function (e) {
          function t() {
            var e, a;
            Object(r.a)(this, t);
            for (var n = arguments.length, i = new Array(n), l = 0; l < n; l++)
              i[l] = arguments[l];
            return (
              ((a = Object(c.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(i))
              )).render = function () {
                return s.a.createElement(
                  "div",
                  null,
                  s.a.createElement(
                    "h4",
                    { className: "bg-info text-white text-center p-2" },
                    a.props.totalSize,
                    " Orders"
                  ),
                  s.a.createElement(
                    y.a,
                    Object.assign({ keys: ["ID", "Name"] }, a.props)
                  ),
                  s.a.createElement(
                    "table",
                    { className: "table table-sm table-striped" },
                    s.a.createElement(
                      "thead",
                      null,
                      s.a.createElement(
                        "tr",
                        null,
                        s.a.createElement("th", null, "ID"),
                        s.a.createElement("th", null, "Name"),
                        s.a.createElement("th", null, "Email"),
                        s.a.createElement(
                          "th",
                          { className: "text-right" },
                          "Total"
                        ),
                        s.a.createElement(
                          "th",
                          { className: "text-center" },
                          "Shipped"
                        )
                      )
                    ),
                    s.a.createElement(
                      "tbody",
                      null,
                      a.props.orders.map(function (e) {
                        return s.a.createElement(S, {
                          key: e.id,
                          order: e,
                          toggleShipped: function () {
                            return a.props.toggleShipped(e.id, !e.shipped);
                          },
                        });
                      })
                    )
                  )
                );
              }),
              a
            );
          }
          return Object(i.a)(t, e), t;
        })(l.Component);
      function w() {
        var e = Object(m.a)([
          "\n    mutation($id: ID!) {\n        deleteProduct(id: $id) {\n            id\n        }\n    }",
        ]);
        return (
          (w = function () {
            return e;
          }),
          e
        );
      }
      function x() {
        var e = Object(m.a)([
          "\n    mutation($product: productUpdate) {\n        updateProduct(product: $product) {\n            id, name, category, description, price\n        }\n    }",
        ]);
        return (
          (x = function () {
            return e;
          }),
          e
        );
      }
      function z() {
        var e = Object(m.a)([
          "\n    mutation($product: productStore) {\n        storeProduct(product: $product) {\n            id, name, category, description, price\n        }\n    }",
        ]);
        return (
          (z = function () {
            return e;
          }),
          e
        );
      }
      function $() {
        var e = Object(m.a)([
          "\n    mutation($id: ID!, $shipped: Boolean!) {\n        shipOrder(id: $id, shipped: $shipped) {\n            id, shipped\n        }\n    }",
        ]);
        return (
          ($ = function () {
            return e;
          }),
          e
        );
      }
      var C = f()($()),
        P = f()(z()),
        k = f()(x()),
        A = f()(w()),
        T = { onlyShipped: !1, page: 1, pageSize: 10, sort: "id" },
        M = Object(p.compose)(
          Object(p.graphql)(v, {
            options: function (e) {
              return { variables: T };
            },
            props: function (e) {
              var t = e.data,
                a = t.loading,
                r = t.orders,
                n = t.refetch;
              return {
                totalSize: a ? 0 : r.totalSize,
                orders: a ? [] : r.orders,
                currentPage: T.page,
                pageCount: a ? 0 : Math.ceil(r.totalSize / T.pageSize),
                navigateToPage: function (e) {
                  (T.page = Number(e)), n(T);
                },
                pageSize: T.pageSize,
                setPageSize: function (e) {
                  (T.pageSize = Number(e)), n(T);
                },
                sortKey: T.sort,
                setSortProperty: function (e) {
                  (T.sort = e), n(T);
                },
              };
            },
          }),
          Object(p.graphql)(C, {
            props: function (e) {
              var t = e.mutate;
              return {
                toggleShipped: function (e, a) {
                  return t({ variables: { id: e, shipped: a } });
                },
              };
            },
          })
        )(N),
        q = a(127),
        I = a(121),
        D = a(124),
        R = a(33),
        B = a(9),
        L = a(122),
        Q = (function (e) {
          function t() {
            var e, a;
            Object(r.a)(this, t);
            for (var n = arguments.length, i = new Array(n), l = 0; l < n; l++)
              i[l] = arguments[l];
            return (
              ((a = Object(c.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(i))
              )).render = function () {
                return s.a.createElement(
                  "tr",
                  null,
                  s.a.createElement("td", null, a.props.product.id),
                  s.a.createElement("td", null, a.props.product.name),
                  s.a.createElement("td", null, a.props.product.category),
                  s.a.createElement(
                    "td",
                    { className: "text-right" },
                    "$",
                    a.props.product.price.toFixed(2)
                  ),
                  s.a.createElement(
                    "td",
                    { className: "text-center" },
                    s.a.createElement(
                      "button",
                      {
                        className: "btn btn-sm btn-danger mx-1",
                        onClick: function () {
                          return a.props.deleteProduct(a.props.product.id);
                        },
                      },
                      "Delete"
                    ),
                    s.a.createElement(
                      L.a,
                      {
                        to: "/admin/products/".concat(a.props.product.id),
                        className: "btn btn-sm btn-warning",
                      },
                      "Edit"
                    )
                  )
                );
              }),
              a
            );
          }
          return Object(i.a)(t, e), t;
        })(l.Component),
        U = (function (e) {
          function t() {
            var e, a;
            Object(r.a)(this, t);
            for (var n = arguments.length, i = new Array(n), l = 0; l < n; l++)
              i[l] = arguments[l];
            return (
              ((a = Object(c.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(i))
              )).render = function () {
                return s.a.createElement(
                  "div",
                  null,
                  s.a.createElement(
                    "h4",
                    { className: "bg-info text-white text-center p-2" },
                    a.props.totalSize,
                    " Products"
                  ),
                  s.a.createElement(
                    y.a,
                    Object.assign({ keys: ["ID", "Name", "Category"] }, a.props)
                  ),
                  s.a.createElement(
                    "table",
                    { className: "table table-sm table-striped" },
                    s.a.createElement(
                      "thead",
                      null,
                      s.a.createElement(
                        "tr",
                        null,
                        s.a.createElement("th", null, "ID"),
                        s.a.createElement("th", null, "Name"),
                        s.a.createElement("th", null, "Category"),
                        s.a.createElement(
                          "th",
                          { className: "text-right" },
                          "Price"
                        ),
                        s.a.createElement("th", { className: "text-center" })
                      )
                    ),
                    s.a.createElement(
                      "tbody",
                      null,
                      a.props.products.map(function (e) {
                        return s.a.createElement(Q, {
                          key: e.id,
                          product: e,
                          deleteProduct: a.props.deleteProduct,
                        });
                      })
                    )
                  ),
                  s.a.createElement(
                    "div",
                    { className: "text-center" },
                    s.a.createElement(
                      L.a,
                      {
                        to: "/admin/products/create",
                        className: "btn btn-primary",
                      },
                      "Create Product"
                    )
                  )
                );
              }),
              a
            );
          }
          return Object(i.a)(t, e), t;
        })(l.Component),
        F = { page: 1, pageSize: 10, sort: "id" },
        J = Object(p.compose)(
          Object(p.graphql)(O, {
            options: function (e) {
              return { variables: F };
            },
            props: function (e) {
              var t = e.data,
                a = t.loading,
                r = t.products,
                n = t.refetch;
              return {
                totalSize: a ? 0 : r.totalSize,
                products: a ? [] : r.products,
                currentPage: F.page,
                pageCount: a ? 0 : Math.ceil(r.totalSize / F.pageSize),
                navigateToPage: function (e) {
                  (F.page = Number(e)), n(F);
                },
                pageSize: F.pageSize,
                setPageSize: function (e) {
                  (F.pageSize = Number(e)), n(F);
                },
                sortKey: F.sort,
                setSortProperty: function (e) {
                  (F.sort = e), n(F);
                },
              };
            },
          }),
          Object(p.graphql)(A, {
            options: {
              update: function (e, t) {
                var a = t.data.deleteProduct.id,
                  r = { query: O, variables: F },
                  n = e.readQuery(r);
                (n.products.products = n.products.products.filter(function (e) {
                  return e.id !== a;
                })),
                  (n.products.totalSize = n.products.totalSize - 1),
                  e.writeQuery(Object(B.a)({}, r, { data: n }));
              },
            },
            props: function (e) {
              var t = e.mutate;
              return {
                deleteProduct: function (e) {
                  return t({ variables: { id: e } });
                },
              };
            },
          })
        )(U),
        K = a(16),
        V = a(34),
        G = (function (e) {
          function t(e) {
            var a;
            return (
              Object(r.a)(this, t),
              ((a = Object(c.a)(this, Object(o.a)(t).call(this, e))).navigate =
                function () {
                  return a.props.history.push("/admin/products");
                }),
              (a.render = function () {
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
                      s.a.createElement(
                        p.Mutation,
                        { mutation: a.mutation },
                        function (e, t) {
                          var r = t.client;
                          return s.a.createElement(V.a, {
                            formModel: a.formModel,
                            defaultAttrs: a.defaultAttrs,
                            submitCallback: function (t) {
                              e({
                                variables: {
                                  product: Object(B.a)({}, t, {
                                    price: Number(t.price),
                                  }),
                                },
                              }),
                                "edit" !== a.props.mode && r.resetStore(),
                                a.navigate();
                            },
                            cancelCallback: a.navigate,
                            submitText: "Save",
                            cancelText: "Cancel",
                          });
                        }
                      )
                    )
                  )
                );
              }),
              (a.defaultAttrs = { type: "text", required: !0 }),
              (a.formModel = [
                { label: "Name" },
                { label: "Description" },
                { label: "Category" },
                { label: "Price", attrs: { type: "number" } },
              ]),
              (a.mutation = P),
              "edit" === a.props.mode &&
                ((a.mutation = k),
                (a.formModel = [{ label: "Id", attrs: { disabled: !0 } }]
                  .concat(Object(K.a)(a.formModel))
                  .map(function (e) {
                    return Object(B.a)({}, e, {
                      attrs: Object(B.a)({}, e.attrs, {
                        defaultValue: a.props.product[e.label.toLowerCase()],
                      }),
                    });
                  }))),
              a
            );
          }
          return Object(i.a)(t, e), t;
        })(l.Component),
        H = (function (e) {
          function t() {
            var e, a;
            Object(r.a)(this, t);
            for (var n = arguments.length, i = new Array(n), l = 0; l < n; l++)
              i[l] = arguments[l];
            return (
              ((a = Object(c.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(i))
              )).render = function () {
                return s.a.createElement(
                  p.Query,
                  { query: j, variables: { id: a.props.match.params.id } },
                  function (e) {
                    var t = e.loading,
                      r = e.data;
                    return t
                      ? null
                      : s.a.createElement(
                          G,
                          Object.assign({}, a.props, {
                            product: r.product,
                            mode: "edit",
                          })
                        );
                  }
                );
              }),
              a
            );
          }
          return Object(i.a)(t, e), t;
        })(l.Component),
        W = a(126),
        X = a(42),
        Y = function (e) {
          return (function (t) {
            function a() {
              var t, n;
              Object(r.a)(this, a);
              for (
                var i = arguments.length, l = new Array(i), u = 0;
                u < i;
                u++
              )
                l[u] = arguments[u];
              return (
                ((n = Object(c.a)(
                  this,
                  (t = Object(o.a)(a)).call.apply(t, [this].concat(l))
                )).render = function () {
                  return s.a.createElement(X.a.Consumer, null, function (t) {
                    return s.a.createElement(e, Object.assign({}, n.props, t));
                  });
                }),
                n
              );
            }
            return Object(i.a)(a, t), a;
          })(l.Component);
        },
        Z = Object(W.a)(
          Y(
            (function (e) {
              function t(e) {
                var a;
                return (
                  Object(r.a)(this, t),
                  ((a = Object(c.a)(
                    this,
                    Object(o.a)(t).call(this, e)
                  )).authenticate = function (e) {
                    a.props
                      .authenticate(e)
                      .catch(function (e) {
                        return a.setState({ errorMessage: e.message });
                      })
                      .then(a.props.history.push("/admin"));
                  }),
                  (a.render = function () {
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
                          null != a.state.errorMessage &&
                            s.a.createElement(
                              "h4",
                              {
                                className:
                                  "bg-danger text-center text-white m-1 p-2",
                              },
                              a.state.errorMessage
                            ),
                          s.a.createElement(V.a, {
                            formModel: a.formModel,
                            defaultAttrs: a.defaultAttrs,
                            submitCallback: a.authenticate,
                            submitText: "Login",
                            cancelCallback: function () {
                              return a.props.history.push("/");
                            },
                            cancelText: "Cancel",
                          })
                        )
                      )
                    );
                  }),
                  (a.state = { errorMessage: null }),
                  (a.defaultAttrs = { required: !0 }),
                  (a.formModel = [
                    { label: "Username", attrs: { defaultValue: "admin" } },
                    { label: "Password", attrs: { type: "password" } },
                  ]),
                  a
                );
              }
              return Object(i.a)(t, e), t;
            })(l.Component)
          )
        );
      t.default = Y(
        (function (e) {
          function t(e) {
            var a;
            return (
              Object(r.a)(this, t),
              ((a = Object(c.a)(this, Object(o.a)(t).call(this, e))).client =
                new u.a({
                  uri: d.a,
                  request: function (e) {
                    return e.setContext({
                      headers: {
                        Authorization: "Bearer<".concat(a.props.webToken, ">"),
                      },
                    });
                  },
                })),
              a
            );
          }
          return (
            Object(i.a)(t, e),
            Object(n.a)(t, [
              {
                key: "render",
                value: function () {
                  return s.a.createElement(
                    p.ApolloProvider,
                    { client: this.client },
                    s.a.createElement(
                      "div",
                      { className: "container-fluid" },
                      s.a.createElement(
                        "div",
                        { className: "row" },
                        s.a.createElement(
                          "div",
                          { className: "col bg-info text-white" },
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
                          { className: "col-3 p-2" },
                          s.a.createElement(
                            R.a,
                            { to: "/admin/orders" },
                            "Orders"
                          ),
                          s.a.createElement(
                            R.a,
                            { to: "/admin/products" },
                            "Products"
                          ),
                          this.props.isAuthenticated &&
                            s.a.createElement(
                              "button",
                              {
                                onClick: this.props.signout,
                                className:
                                  "btn btn-block btn-secondary m-2 fixed-bottom col-3",
                              },
                              "Log Out"
                            )
                        ),
                        s.a.createElement(
                          "div",
                          { className: "col-9 p-2" },
                          s.a.createElement(
                            q.a,
                            null,
                            !this.props.isAuthenticated &&
                              s.a.createElement(I.a, { component: Z }),
                            s.a.createElement(I.a, {
                              path: "/admin/orders",
                              component: M,
                            }),
                            s.a.createElement(I.a, {
                              path: "/admin/products/create",
                              component: G,
                            }),
                            s.a.createElement(I.a, {
                              path: "/admin/products/:id",
                              component: H,
                            }),
                            s.a.createElement(I.a, {
                              path: "/admin/products",
                              component: J,
                            }),
                            s.a.createElement(D.a, { to: "/admin/orders" })
                          )
                        )
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(l.Component)
      );
    },
  },
]);
//# sourceMappingURL=1.d16e242f.chunk.js.map
