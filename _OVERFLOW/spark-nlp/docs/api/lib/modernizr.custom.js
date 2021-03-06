/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-inlinesvg
 */
window.Modernizr = (function (a, b, c) {
  function u(a) {
    i.cssText = a;
  }
  function v(a, b) {
    return u(prefixes.join(a + ";") + (b || ""));
  }
  function w(a, b) {
    return typeof a === b;
  }
  function x(a, b) {
    return !!~("" + a).indexOf(b);
  }
  function y(a, b, d) {
    for (var e in a) {
      var f = b[a[e]];
      if (f !== c)
        return d === !1 ? a[e] : w(f, "function") ? f.bind(d || b) : f;
    }
    return !1;
  }
  var d = "2.5.3",
    e = {},
    f = b.documentElement,
    g = "modernizr",
    h = b.createElement(g),
    i = h.style,
    j,
    k = {}.toString,
    l = { svg: "http://www.w3.org/2000/svg" },
    m = {},
    n = {},
    o = {},
    p = [],
    q = p.slice,
    r,
    s = {}.hasOwnProperty,
    t;
  !w(s, "undefined") && !w(s.call, "undefined")
    ? (t = function (a, b) {
        return s.call(a, b);
      })
    : (t = function (a, b) {
        return b in a && w(a.constructor.prototype[b], "undefined");
      }),
    Function.prototype.bind ||
      (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function") throw new TypeError();
        var d = q.call(arguments, 1),
          e = function () {
            if (this instanceof e) {
              var a = function () {};
              a.prototype = c.prototype;
              var f = new a(),
                g = c.apply(f, d.concat(q.call(arguments)));
              return Object(g) === g ? g : f;
            }
            return c.apply(b, d.concat(q.call(arguments)));
          };
        return e;
      }),
    (m.inlinesvg = function () {
      var a = b.createElement("div");
      return (
        (a.innerHTML = "<svg/>"),
        (a.firstChild && a.firstChild.namespaceURI) == l.svg
      );
    });
  for (var z in m)
    t(m, z) &&
      ((r = z.toLowerCase()), (e[r] = m[z]()), p.push((e[r] ? "" : "no-") + r));
  return u(""), (h = j = null), (e._version = d), e;
})(this, this.document);
