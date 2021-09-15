(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    14: function (e, t, a) {
      e.exports = a(26);
    },
    19: function (e, t, a) {},
    20: function (e, t, a) {},
    26: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        l = a.n(n),
        r = a(8),
        c = a.n(r),
        s = (a(19), a(9)),
        o = a(10),
        i = a(12),
        m = a(11),
        u = a(5),
        h = a(13);
      a(20);
      var d = function (e) {
          return l.a.createElement(
            "div",
            { className: "row col-sm-12 col-md-6 mt-5" },
            e.imgUrl
              ? l.a.createElement(
                  "div",
                  { className: "imgdiv" },
                  l.a.createElement("img", {
                    className: "img-fluid",
                    src: e.imgUrl.thumbnail,
                    alt: "",
                  })
                )
              : l.a.createElement("p", null, "No image available"),
            l.a.createElement(
              "div",
              { className: "card border-0", style: { width: "20rem" } },
              l.a.createElement(
                "div",
                { className: "card-body text-left p-1" },
                l.a.createElement("h5", { className: "card-title" }, e.title),
                e.authors
                  ? l.a.createElement(
                      "div",
                      null,
                      e.authors.map(function (e) {
                        return l.a.createElement(
                          "h6",
                          { className: "card-subtitle mb-2 text-muted" },
                          e
                        );
                      })
                    )
                  : l.a.createElement(
                      "h6",
                      { className: "card-subtitle mb-2 text-muted" },
                      "No Authors listed"
                    ),
                l.a.createElement("p", { className: "card-text" }, e.publisher),
                l.a.createElement(
                  "a",
                  {
                    id: "seymour",
                    href: e.info,
                    className: "card-link btn btn-warning position-relative",
                    role: "button",
                  },
                  "See More"
                ),
                l.a.createElement("hr", { className: "base" })
              )
            )
          );
        },
        b = a(3),
        v = a(6),
        f = a(2);
      var E = function () {
        return l.a.createElement(
          "div",
          null,
          l.a.createElement("hr", { className: "mt-5" }),
          l.a.createElement(
            "p",
            { className: "text-center" },
            "Powered by ",
            l.a.createElement(
              "a",
              { href: "https://developers.google.com/books/" },
              "Google Books"
            )
          ),
          l.a.createElement(
            "p",
            { className: "text-center mt-5" },
            l.a.createElement(v.a, { icon: f.b }),
            " 2019 willjw3. All Rights Reserved"
          )
        );
      };
      b.b.add(f.c), b.b.add(f.a);
      var g = (function (e) {
        function t(e) {
          var a;
          return (
            Object(s.a)(this, t),
            ((a = Object(i.a)(this, Object(m.a)(t).call(this, e))).state = {
              value: "",
              items: [],
              searchWord: "",
            }),
            (a.handleChange = a.handleChange.bind(Object(u.a)(a))),
            (a.handleSubmit = a.handleSubmit.bind(Object(u.a)(a))),
            a
          );
        }
        return (
          Object(h.a)(t, e),
          Object(o.a)(t, [
            {
              key: "handleChange",
              value: function (e) {
                this.setState({ value: e.target.value });
              },
            },
            {
              key: "handleSubmit",
              value: function (e) {
                var t = this;
                fetch(
                  "https://www.googleapis.com/books/v1/volumes?q=" +
                    this.state.value
                )
                  .then(function (e) {
                    return e.json();
                  })
                  .then(function (e) {
                    for (var a = [], n = 0; n < e.items.length; n += 2)
                      a.push(e.items.slice(n, n + 2));
                    t.setState({ items: a });
                  }),
                  this.setState({ value: "", searchWord: this.state.value }),
                  e.preventDefault();
              },
            },
            {
              key: "render",
              value: function () {
                var e = this.state.items;
                return l.a.createElement(
                  "div",
                  { className: "" },
                  l.a.createElement(
                    "h1",
                    { className: "text-center d-block" },
                    "Book Finder ",
                    l.a.createElement(v.a, { icon: f.a })
                  ),
                  l.a.createElement(
                    "div",
                    { id: "top-bar", className: "container mb-5" },
                    l.a.createElement(
                      "div",
                      { className: "row justify-content-center" },
                      l.a.createElement(
                        "form",
                        {
                          id: "search-form",
                          className: "col-xs-6 col-sm-4 d-block",
                          onSubmit: this.handleSubmit,
                        },
                        l.a.createElement("input", {
                          className: "d-block form-control mt-3",
                          type: "text",
                          value: this.state.value,
                          placeholder: "Enter search keyword",
                          onChange: this.handleChange,
                        }),
                        l.a.createElement(
                          "div",
                          null,
                          l.a.createElement(
                            "button",
                            {
                              id: "get-btn",
                              type: "submit",
                              value: "Submit",
                              className:
                                "btn btn-success d-block form-control mt-3",
                            },
                            l.a.createElement(v.a, { icon: f.c }),
                            " Get Books"
                          )
                        )
                      )
                    )
                  ),
                  e.length
                    ? l.a.createElement(
                        "div",
                        null,
                        l.a.createElement(
                          "h6",
                          { className: "sticky text-right mr-5" },
                          l.a.createElement(
                            "a",
                            { href: "#top-bar" },
                            l.a.createElement(
                              "span",
                              { className: "badge badge-warning" },
                              "Search Again"
                            )
                          )
                        ),
                        l.a.createElement(
                          "h4",
                          { className: "mb-5 text-center" },
                          'Displaying results for "',
                          this.state.searchWord,
                          '"'
                        ),
                        l.a.createElement(
                          "div",
                          { id: "bookshelf", className: "container mt-3" },
                          e.map(function (e) {
                            return l.a.createElement(
                              "div",
                              { className: "row justify-content-center shelf" },
                              e.map(function (e) {
                                return l.a.createElement(d, {
                                  imgUrl: e.volumeInfo.imageLinks,
                                  title: e.volumeInfo.title,
                                  authors: e.volumeInfo.authors,
                                  publisher: e.volumeInfo.publisher,
                                  info: e.volumeInfo.infoLink,
                                });
                              })
                            );
                          })
                        )
                      )
                    : l.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "No Books to Display Yet"
                      ),
                  l.a.createElement(E, null)
                );
              },
            },
          ]),
          t
        );
      })(n.Component);
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      c.a.render(l.a.createElement(g, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function (e) {
            e.unregister();
          });
    },
  },
  [[14, 1, 2]],
]);
//# sourceMappingURL=main.c5b6028d.chunk.js.map
