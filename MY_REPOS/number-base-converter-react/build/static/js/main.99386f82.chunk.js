(this["webpackJsonpnumber-base-converter"] =
  this["webpackJsonpnumber-base-converter"] || []).push([
  [0],
  {
    14: function (e, n, t) {},
    15: function (e, n, t) {
      "use strict";
      t.r(n);
      var a = t(0),
        r = t.n(a),
        c = t(3),
        o = t.n(c),
        i = (t(14), t(4)),
        l = t(5),
        u = t(1),
        s = t(8),
        m = t(7),
        v = t(6),
        b = function (e) {
          var n = e.base,
            t = e.pattern,
            a = e.number,
            c = e.onChange;
          return r.a.createElement(
            "div",
            { class: "numberBlock" },
            r.a.createElement("label", null, "Base ", n),
            r.a.createElement("input", {
              pattern: t,
              id: n,
              value: a,
              onChange: c,
            })
          );
        },
        h = function (e) {
          var n = String.fromCharCode
              .apply(String, Object(v.a)(Array(103).keys()))
              .slice(97),
            t = e - 1,
            a = "[0-".concat(t, "]");
          return (
            e > 10 &&
              ((t = 9),
              (n = n.slice(0, e - 10)),
              (a = "[0-".concat(t).concat(n).concat(n.toUpperCase(), "]"))),
            a
          );
        },
        d = (function (e) {
          Object(s.a)(t, e);
          var n = Object(m.a)(t);
          function t(e) {
            var a;
            return (
              Object(i.a)(this, t),
              ((a = n.call(this, e)).state = { numberInDecimal: NaN }),
              (a.onChange = a.onChange.bind(Object(u.a)(a))),
              a
            );
          }
          return (
            Object(l.a)(t, [
              {
                key: "onChange",
                value: function (e) {
                  var n = e.target,
                    t = n.value,
                    a = n.id;
                  this.setState(function (e) {
                    return {
                      numberInDecimal: (function (e, n) {
                        return parseInt(e, n);
                      })(t, a),
                    };
                  });
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this,
                    n = Array.from(Array(15), function (n, t) {
                      var a = t + 2,
                        c = (function (e, n) {
                          return isNaN(e) ? "" : e.toString(n);
                        })(e.state.numberInDecimal, a);
                      return r.a.createElement(b, {
                        key: t,
                        base: a,
                        number: c,
                        pattern: h(a),
                        onChange: e.onChange,
                      });
                    });
                  return r.a.createElement("div", null, n);
                },
              },
            ]),
            t
          );
        })(r.a.Component),
        f = function () {
          return r.a.createElement(
            "div",
            { className: "App base-converter" },
            r.a.createElement(
              "div",
              { className: "title" },
              "Number Base Converter"
            ),
            r.a.createElement("div", null, r.a.createElement(d, null))
          );
        };
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      o.a.render(
        r.a.createElement(r.a.StrictMode, null, r.a.createElement(f, null)),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            });
    },
    9: function (e, n, t) {
      e.exports = t(15);
    },
  },
  [[9, 1, 2]],
]);
//# sourceMappingURL=main.99386f82.chunk.js.map
