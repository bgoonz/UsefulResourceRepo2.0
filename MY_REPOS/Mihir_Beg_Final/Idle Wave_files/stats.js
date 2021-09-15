!(() => {
  "use strict";
  function e(t) {
    return (e =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? e => {
            return typeof e;
          }
        : e => {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(t);
  }
  function t(t, n, o, i, r, a, c) {
    void 0 === o && (o = null),
      void 0 === i && (i = "/"),
      void 0 === r && (r = null),
      void 0 === a && (a = !1),
      void 0 === c && (c = "Strict");
    const u = new Date();
    const l = e(n);
    let s = "";
    let f = "";
    let d = "";
    let m = "";
    let p = "";
    o &&
      (u.setTime(u.getTime() + 24 * o * 60 * 60 * 1e3),
      (s = "; expires=" + u.toUTCString())),
      (f =
        "object" === l && "undefined" !== l
          ? encodeURIComponent(JSON.stringify({ value: n }))
          : encodeURIComponent(n)),
      c && ((p = "; SameSite=" + c), "none" === c.toLowerCase() && (a = !0)),
      a && (d = "; secure"),
      r && (m = "; domain=" + encodeURIComponent(r));
    const v = t
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9_-]/gi, "");
    if (!v)
      throw new Error(
        "Invalid cookie name, only alphanumeric values, '-' and '_' are accepted"
      );
    document.cookie = v + "=" + f + s + "; path=" + i + d + m + p;
  }
  function n(e) {
    const t = e + "=";
    const n = document.cookie.split(";");
    let o = null;
    return n.forEach(e => {
      const n = e.trim();
      if (0 === n.indexOf(t)) {
        if (
          "{" ===
          (o = decodeURIComponent(n.substring(t.length, n.length))).substring(
            0,
            1
          )
        )
          try {
            o = (o = JSON.parse(o)).value || null;
          } catch (e) {
            return;
          }
        "undefined" === o && (o = void 0);
      }
    }),
    o;
  }
  if (
    ("object" !== e(window._zaq) && (window._zaq = []),
    "object" !== ("undefined" == typeof ZStats ? "undefined" : e(ZStats)))
  ) {
    !(() => {
      let e;
      const o = window;
      const i = navigator;
      const r = document;
      const a = i.doNotTrack || o.doNotTrack || i.msDoNotTrack;
      function c() {
        let t, n, o;
        for (t = 0; t < arguments.length; t += 1)
          (n = (o = arguments[t]).shift()), e[n].apply(e, o);
      }
      e = new ((e, i, c) => {
        let u;
        let l;
        let s;
        let f;
        let d;

        const m =
          ((f = r.getElementById("zstats").src),
          ((d = r.createElement("a")).href = f),
          d);

        const p = m.protocol + "//" + m.host + "/visits";
        function v(e, i, c) {
          if (window.fetch) {
            const f = "uid_" + u, d = "sid_" + u, m = null === n(f), v = null === n(d);
            !0 !== a && "1" !== a
              ? (t(f, 1, 120, "/", null, !0, "None"),
                t(d, 1, 1, "/", null, !0, "None"),
                fetch(p, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    website_id: u,
                    hash: l,
                    zone: s,
                    target_id: e,
                    target_type: i,
                    action: c,
                    path: o.location.href,
                    host: o.location.host,
                    referer: r.referrer,
                    visit: v,
                    visitor: m,
                  }),
                }))
              : console.log("Not logging your visit, have a nice day!");
          }
        }
        return {
          _setWebsite(e) {
            u = e;
          },
          _setZone(e) {
            const t = new DOMParser().parseFromString(e, "text/html");
            void 0 !== t &&
              void 0 !== t.documentElement &&
              ((e = t.documentElement.textContent), (s = e));
          },
          _setHash(e) {
            l = e;
          },
          _setTimezone(e) {
            s = e;
          },
          _trackPage(e) {
            v(e, "page", "hit");
          },
          _track(e, t, n) {
            v(e, t, n);
          },
        };
      })();
      for (let u = 0; u < _zaq.length; u++) _zaq[u] && c(_zaq[u]);
      _zaq = new (() => {
        return { push: c };
      })();
    })();
  }
})();
