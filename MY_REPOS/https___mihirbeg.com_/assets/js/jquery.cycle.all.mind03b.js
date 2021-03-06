(function (f, e) {
  function g(h) {
    f.fn.cycle.debug && a(h);
  }
  function a() {
    window.console &&
      console.log &&
      console.log("[cycle] " + Array.prototype.join.call(arguments, " "));
  }
  function l(a, b, o) {
    var c = f(a).data("cycle.opts"),
      e = !!a.cyclePause;
    e && c.paused
      ? c.paused(a, c, b, o)
      : !e && c.resumed && c.resumed(a, c, b, o);
  }
  function j(h, b, c) {
    function j(b, d, h) {
      if (!b && !0 === d) {
        b = f(h).data("cycle.opts");
        if (!b) return a("options not found, can not resume"), !1;
        h.cycleTimeout && (clearTimeout(h.cycleTimeout), (h.cycleTimeout = 0));
        r(b.elements, b, 1, !b.backwards);
      }
    }
    h.cycleStop === e && (h.cycleStop = 0);
    if (b === e || null === b) b = {};
    if (b.constructor == String)
      switch (b) {
        case "destroy":
        case "stop":
          c = f(h).data("cycle.opts");
          if (!c) return !1;
          h.cycleStop++;
          h.cycleTimeout && clearTimeout(h.cycleTimeout);
          h.cycleTimeout = 0;
          c.elements && f(c.elements).stop();
          f(h).removeData("cycle.opts");
          if ("destroy" == b) {
            b = c;
            b.next && f(b.next).unbind(b.prevNextEvent);
            b.prev && f(b.prev).unbind(b.prevNextEvent);
            if (b.pager || b.pagerAnchorBuilder)
              f.each(b.pagerAnchors || [], function () {
                this.unbind().remove();
              });
            b.pagerAnchors = null;
            f(h).unbind("mouseenter.cycle mouseleave.cycle");
            b.destroy && b.destroy(b);
          }
          return !1;
        case "toggle":
          return (
            (h.cyclePause = 1 === h.cyclePause ? 0 : 1),
            j(h.cyclePause, c, h),
            l(h),
            !1
          );
        case "pause":
          return (h.cyclePause = 1), l(h), !1;
        case "resume":
          return (h.cyclePause = 0), j(!1, c, h), l(h), !1;
        case "prev":
        case "next":
          c = f(h).data("cycle.opts");
          if (!c) return a('options not found, "prev/next" ignored'), !1;
          f.fn.cycle[b](c);
          return !1;
        default:
          b = { fx: b };
      }
    else if (b.constructor == Number) {
      var p = b,
        b = f(h).data("cycle.opts");
      if (!b) return a("options not found, can not advance slide"), !1;
      if (0 > p || p >= b.elements.length)
        return a("invalid slide index: " + p), !1;
      b.nextSlide = p;
      h.cycleTimeout && (clearTimeout(h.cycleTimeout), (h.cycleTimeout = 0));
      "string" == typeof c && (b.oneTimeFx = c);
      r(b.elements, b, 1, p >= b.currSlide);
      return !1;
    }
    return b;
  }
  function c(a, b) {
    if (!f.support.opacity && b.cleartype && a.style.filter)
      try {
        a.style.removeAttribute("filter");
      } catch (c) {}
  }
  function u(h, b, o, j, p) {
    var i,
      d = f.extend(
        {},
        f.fn.cycle.defaults,
        j || {},
        f.metadata ? h.metadata() : f.meta ? h.data() : {}
      ),
      k = f.isFunction(h.data) ? h.data(d.metaAttr) : null;
    k && (d = f.extend(d, k));
    d.autostop && (d.countdown = d.autostopCount || o.length);
    var u = h[0];
    h.data("cycle.opts", d);
    d.$cont = h;
    d.stopCount = u.cycleStop;
    d.elements = o;
    d.before = d.before ? [d.before] : [];
    d.after = d.after ? [d.after] : [];
    !f.support.opacity &&
      d.cleartype &&
      d.after.push(function () {
        c(this, d);
      });
    d.continuous &&
      d.after.push(function () {
        r(o, d, 0, !d.backwards);
      });
    var s = d;
    s.original = { before: [], after: [] };
    s.original.cssBefore = f.extend({}, s.cssBefore);
    s.original.cssAfter = f.extend({}, s.cssAfter);
    s.original.animIn = f.extend({}, s.animIn);
    s.original.animOut = f.extend({}, s.animOut);
    f.each(s.before, function () {
      s.original.before.push(this);
    });
    f.each(s.after, function () {
      s.original.after.push(this);
    });
    !f.support.opacity && d.cleartype && !d.cleartypeNoBg && B(b);
    "static" == h.css("position") && h.css("position", "relative");
    d.width && h.width(d.width);
    d.height && "auto" != d.height && h.height(d.height);
    d.startingSlide !== e
      ? ((d.startingSlide = parseInt(d.startingSlide, 10)),
        d.startingSlide >= o.length || 0 > d.startSlide
          ? (d.startingSlide = 0)
          : (i = !0))
      : (d.startingSlide = d.backwards ? o.length - 1 : 0);
    if (d.random) {
      d.randomMap = [];
      for (k = 0; k < o.length; k++) d.randomMap.push(k);
      d.randomMap.sort(function () {
        return Math.random() - 0.5;
      });
      if (i)
        for (i = 0; i < o.length; i++)
          d.startingSlide == d.randomMap[i] && (d.randomIndex = i);
      else (d.randomIndex = 1), (d.startingSlide = d.randomMap[1]);
    } else d.startingSlide >= o.length && (d.startingSlide = 0);
    d.currSlide = d.startingSlide || 0;
    var t = d.startingSlide;
    b.css({ position: "absolute", top: 0, left: 0 })
      .hide()
      .each(function (b) {
        b = d.backwards
          ? t
            ? b <= t
              ? o.length + (b - t)
              : t - b
            : o.length - b
          : t
          ? b >= t
            ? o.length - (b - t)
            : t - b
          : o.length - b;
        f(this).css("z-index", b);
      });
    f(o[t]).css("opacity", 1).show();
    c(o[t], d);
    d.fit &&
      (d.aspect
        ? b.each(function () {
            var b = f(this),
              a = d.aspect === true ? b.width() / b.height() : d.aspect;
            if (d.width && b.width() != d.width) {
              b.width(d.width);
              b.height(d.width / a);
            }
            if (d.height && b.height() < d.height) {
              b.height(d.height);
              b.width(d.height * a);
            }
          })
        : (d.width && b.width(d.width),
          d.height && "auto" != d.height && b.height(d.height)));
    d.center &&
      (!d.fit || d.aspect) &&
      b.each(function () {
        var b = f(this);
        b.css({
          "margin-left": d.width ? (d.width - b.width()) / 2 + "px" : 0,
          "margin-top": d.height ? (d.height - b.height()) / 2 + "px" : 0,
        });
      });
    d.center &&
      !d.fit &&
      !d.slideResize &&
      b.each(function () {
        var b = f(this);
        b.css({
          "margin-left": d.width ? (d.width - b.width()) / 2 + "px" : 0,
          "margin-top": d.height ? (d.height - b.height()) / 2 + "px" : 0,
        });
      });
    if (d.containerResize && !h.innerHeight()) {
      for (var n = (k = i = 0); n < o.length; n++) {
        var w = f(o[n]),
          y = w[0],
          z = w.outerWidth(),
          A = w.outerHeight();
        z || (z = y.offsetWidth || y.width || w.attr("width"));
        A || (A = y.offsetHeight || y.height || w.attr("height"));
        i = z > i ? z : i;
        k = A > k ? A : k;
      }
      0 < i && 0 < k && h.css({ width: i + "px", height: k + "px" });
    }
    var C = !1;
    d.pause &&
      h
        .bind("mouseenter.cycle", function () {
          C = true;
          this.cyclePause++;
          l(u, true);
        })
        .bind("mouseleave.cycle", function () {
          C && this.cyclePause--;
          l(u, true);
        });
    var q;
    a: {
      i = d;
      n = f.fn.cycle.transitions;
      if (0 < i.fx.indexOf(",")) {
        i.multiFx = !0;
        i.fxs = i.fx.replace(/\s*/g, "").split(",");
        for (q = 0; q < i.fxs.length; q++)
          if (
            ((w = i.fxs[q]),
            (k = n[w]),
            !k || !n.hasOwnProperty(w) || !f.isFunction(k))
          )
            a("discarding unknown transition: ", w), i.fxs.splice(q, 1), q--;
        if (!i.fxs.length) {
          a("No valid transitions named; slideshow terminating.");
          q = !1;
          break a;
        }
      } else if ("all" == i.fx)
        for (q in ((i.multiFx = !0), (i.fxs = []), n))
          n.hasOwnProperty(q) &&
            ((k = n[q]),
            n.hasOwnProperty(q) && f.isFunction(k) && i.fxs.push(q));
      if (i.multiFx && i.randomizeEffects) {
        k = Math.floor(20 * Math.random()) + 30;
        for (q = 0; q < k; q++)
          (n = Math.floor(Math.random() * i.fxs.length)),
            i.fxs.push(i.fxs.splice(n, 1)[0]);
        g("randomized fx sequence: ", i.fxs);
      }
      q = !0;
    }
    if (!1 === q) return !1;
    var D = !1;
    j.requeueAttempts = j.requeueAttempts || 0;
    b.each(function () {
      var b = f(this);
      this.cycleH =
        d.fit && d.height
          ? d.height
          : b.height() ||
            this.offsetHeight ||
            this.height ||
            b.attr("height") ||
            0;
      this.cycleW =
        d.fit && d.width
          ? d.width
          : b.width() || this.offsetWidth || this.width || b.attr("width") || 0;
      if (b.is("img")) {
        var b =
            f.browser.mozilla &&
            this.cycleW == 34 &&
            this.cycleH == 19 &&
            !this.complete,
          h =
            f.browser.opera &&
            ((this.cycleW == 42 && this.cycleH == 19) ||
              (this.cycleW == 37 && this.cycleH == 17)) &&
            !this.complete,
          c = this.cycleH === 0 && this.cycleW === 0 && !this.complete;
        if (
          (f.browser.msie &&
            this.cycleW == 28 &&
            this.cycleH == 30 &&
            !this.complete) ||
          b ||
          h ||
          c
        ) {
          if (p.s && d.requeueOnImageNotLoaded && ++j.requeueAttempts < 100) {
            a(
              j.requeueAttempts,
              " - img slide not loaded, requeuing slideshow: ",
              this.src,
              this.cycleW,
              this.cycleH
            );
            setTimeout(function () {
              f(p.s, p.c).cycle(j);
            }, d.requeueTimeout);
            D = true;
            return false;
          }
          a(
            "could not determine size of image: " + this.src,
            this.cycleW,
            this.cycleH
          );
        }
      }
      return true;
    });
    if (D) return !1;
    d.cssBefore = d.cssBefore || {};
    d.cssAfter = d.cssAfter || {};
    d.cssFirst = d.cssFirst || {};
    d.animIn = d.animIn || {};
    d.animOut = d.animOut || {};
    b.not(":eq(" + t + ")").css(d.cssBefore);
    f(b[t]).css(d.cssFirst);
    if (d.timeout) {
      d.timeout = parseInt(d.timeout, 10);
      d.speed.constructor == String &&
        (d.speed = f.fx.speeds[d.speed] || parseInt(d.speed, 10));
      d.sync || (d.speed /= 2);
      for (
        q = "none" == d.fx ? 0 : "shuffle" == d.fx ? 500 : 250;
        d.timeout - d.speed < q;

      )
        d.timeout += d.speed;
    }
    d.easing && (d.easeIn = d.easeOut = d.easing);
    d.speedIn || (d.speedIn = d.speed);
    d.speedOut || (d.speedOut = d.speed);
    d.slideCount = o.length;
    d.currSlide = d.lastSlide = t;
    d.random
      ? (++d.randomIndex == o.length && (d.randomIndex = 0),
        (d.nextSlide = d.randomMap[d.randomIndex]))
      : (d.nextSlide = d.backwards
          ? 0 === d.startingSlide
            ? o.length - 1
            : d.startingSlide - 1
          : d.startingSlide >= o.length - 1
          ? 0
          : d.startingSlide + 1);
    if (!d.multiFx)
      if (((q = f.fn.cycle.transitions[d.fx]), f.isFunction(q))) q(h, b, d);
      else if ("custom" != d.fx && !d.multiFx)
        return a("unknown transition: " + d.fx, "; slideshow terminating"), !1;
    h = b[t];
    d.skipInitializationCallbacks ||
      (d.before.length && d.before[0].apply(h, [h, h, d, !0]),
      d.after.length && d.after[0].apply(h, [h, h, d, !0]));
    d.next &&
      f(d.next).bind(d.prevNextEvent, function () {
        return v(d, 1);
      });
    d.prev &&
      f(d.prev).bind(d.prevNextEvent, function () {
        return v(d, 0);
      });
    if (d.pager || d.pagerAnchorBuilder) {
      var x = d,
        E = f(x.pager);
      f.each(o, function (b, a) {
        f.fn.cycle.createPagerAnchor(b, a, E, o, x);
      });
      x.updateActivePagerLink(x.pager, x.startingSlide, x.activePagerClass);
    }
    var m = d;
    m.addSlide = function (b, a) {
      var d = f(b),
        h = d[0];
      m.autostopCount || m.countdown++;
      o[a ? "unshift" : "push"](h);
      if (m.els) m.els[a ? "unshift" : "push"](h);
      m.slideCount = o.length;
      if (m.random) {
        m.randomMap.push(m.slideCount - 1);
        m.randomMap.sort(function () {
          return Math.random() - 0.5;
        });
      }
      d.css("position", "absolute");
      d[a ? "prependTo" : "appendTo"](m.$cont);
      if (a) {
        m.currSlide++;
        m.nextSlide++;
      }
      !f.support.opacity && m.cleartype && !m.cleartypeNoBg && B(d);
      m.fit && m.width && d.width(m.width);
      m.fit && m.height && m.height != "auto" && d.height(m.height);
      h.cycleH = m.fit && m.height ? m.height : d.height();
      h.cycleW = m.fit && m.width ? m.width : d.width();
      d.css(m.cssBefore);
      (m.pager || m.pagerAnchorBuilder) &&
        f.fn.cycle.createPagerAnchor(o.length - 1, h, f(m.pager), o, m);
      if (f.isFunction(m.onAddSlide)) m.onAddSlide(d);
      else d.hide();
    };
    return d;
  }
  function r(a, b, c, j) {
    function l() {
      var d = 0;
      b.timeout && !b.continuous
        ? ((d = n(a[b.currSlide], a[b.nextSlide], b, j)),
          "shuffle" == b.fx && (d -= b.speedOut))
        : b.continuous && i.cyclePause && (d = 10);
      0 < d &&
        (i.cycleTimeout = setTimeout(function () {
          r(a, b, 0, !b.backwards);
        }, d));
    }
    var i = b.$cont[0],
      d = a[b.currSlide],
      k = a[b.nextSlide];
    c &&
      b.busy &&
      b.manualTrump &&
      (g("manualTrump in go(), stopping active transition"),
      f(a).stop(!0, !0),
      (b.busy = 0),
      clearTimeout(i.cycleTimeout));
    if (b.busy) g("transition active, ignoring new tx request");
    else if (!(i.cycleStop != b.stopCount || (0 === i.cycleTimeout && !c)))
      if (
        !c &&
        !i.cyclePause &&
        !b.bounce &&
        ((b.autostop && 0 >= --b.countdown) ||
          (b.nowrap && !b.random && b.nextSlide < b.currSlide))
      )
        b.end && b.end(b);
      else {
        var u = !1;
        if ((c || !i.cyclePause) && b.nextSlide != b.currSlide) {
          var u = !0,
            s = b.fx;
          d.cycleH = d.cycleH || f(d).height();
          d.cycleW = d.cycleW || f(d).width();
          k.cycleH = k.cycleH || f(k).height();
          k.cycleW = k.cycleW || f(k).width();
          if (b.multiFx) {
            if (j && (b.lastFx === e || ++b.lastFx >= b.fxs.length))
              b.lastFx = 0;
            else if (!j && (b.lastFx === e || 0 > --b.lastFx))
              b.lastFx = b.fxs.length - 1;
            s = b.fxs[b.lastFx];
          }
          b.oneTimeFx && ((s = b.oneTimeFx), (b.oneTimeFx = null));
          f.fn.cycle.resetState(b, s);
          b.before.length &&
            f.each(b.before, function (a, f) {
              i.cycleStop == b.stopCount && f.apply(k, [d, k, b, j]);
            });
          var t = function () {
            b.busy = 0;
            f.each(b.after, function (a, f) {
              i.cycleStop == b.stopCount && f.apply(k, [d, k, b, j]);
            });
            i.cycleStop || l();
          };
          g(
            "tx firing(" +
              s +
              "); currSlide: " +
              b.currSlide +
              "; nextSlide: " +
              b.nextSlide
          );
          b.busy = 1;
          if (b.fxFn) b.fxFn(d, k, b, t, j, c && b.fastOnEvent);
          else if (f.isFunction(f.fn.cycle[b.fx]))
            f.fn.cycle[b.fx](d, k, b, t, j, c && b.fastOnEvent);
          else f.fn.cycle.custom(d, k, b, t, j, c && b.fastOnEvent);
        } else l();
        if (u || b.nextSlide == b.currSlide)
          if (((b.lastSlide = b.currSlide), b.random)) {
            if (
              ((b.currSlide = b.nextSlide),
              ++b.randomIndex == a.length &&
                ((b.randomIndex = 0),
                b.randomMap.sort(function () {
                  return Math.random() - 0.5;
                })),
              (b.nextSlide = b.randomMap[b.randomIndex]),
              b.nextSlide == b.currSlide)
            )
              b.nextSlide =
                b.currSlide == b.slideCount - 1 ? 0 : b.currSlide + 1;
          } else
            b.backwards
              ? (c = 0 > b.nextSlide - 1) && b.bounce
                ? ((b.backwards = !b.backwards),
                  (b.nextSlide = 1),
                  (b.currSlide = 0))
                : ((b.nextSlide = c ? a.length - 1 : b.nextSlide - 1),
                  (b.currSlide = c ? 0 : b.nextSlide + 1))
              : (c = b.nextSlide + 1 == a.length) && b.bounce
              ? ((b.backwards = !b.backwards),
                (b.nextSlide = a.length - 2),
                (b.currSlide = a.length - 1))
              : ((b.nextSlide = c ? 0 : b.nextSlide + 1),
                (b.currSlide = c ? a.length - 1 : b.nextSlide - 1));
        u &&
          b.pager &&
          b.updateActivePagerLink(b.pager, b.currSlide, b.activePagerClass);
      }
  }
  function n(a, b, f, c) {
    if (f.timeoutFn) {
      for (
        a = f.timeoutFn.call(a, a, b, f, c);
        "none" != f.fx && 250 > a - f.speed;

      )
        a += f.speed;
      g("calculated timeout: " + a + "; speed: " + f.speed);
      if (!1 !== a) return a;
    }
    return f.timeout;
  }
  function v(a, b) {
    var c = b ? 1 : -1,
      j = a.elements,
      e = a.$cont[0],
      l = e.cycleTimeout;
    l && (clearTimeout(l), (e.cycleTimeout = 0));
    if (a.random && 0 > c)
      a.randomIndex--,
        -2 == --a.randomIndex
          ? (a.randomIndex = j.length - 2)
          : -1 == a.randomIndex && (a.randomIndex = j.length - 1),
        (a.nextSlide = a.randomMap[a.randomIndex]);
    else if (a.random) a.nextSlide = a.randomMap[a.randomIndex];
    else if (((a.nextSlide = a.currSlide + c), 0 > a.nextSlide)) {
      if (a.nowrap) return !1;
      a.nextSlide = j.length - 1;
    } else if (a.nextSlide >= j.length) {
      if (a.nowrap) return !1;
      a.nextSlide = 0;
    }
    e = a.onPrevNextEvent || a.prevNextClick;
    f.isFunction(e) && e(0 < c, a.nextSlide, j[a.nextSlide]);
    r(j, a, 1, b);
    return !1;
  }
  function B(a) {
    function b(a) {
      a = parseInt(a, 10).toString(16);
      return 2 > a.length ? "0" + a : a;
    }
    function c(a) {
      for (; a && "html" != a.nodeName.toLowerCase(); a = a.parentNode) {
        var h = f.css(a, "background-color");
        if (h && 0 <= h.indexOf("rgb"))
          return (a = h.match(/\d+/g)), "#" + b(a[0]) + b(a[1]) + b(a[2]);
        if (h && "transparent" != h) return h;
      }
      return "#ffffff";
    }
    g("applying clearType background-color hack");
    a.each(function () {
      f(this).css("background-color", c(this));
    });
  }
  f.support === e && (f.support = { opacity: !f.browser.msie });
  f.expr[":"].paused = function (a) {
    return a.cyclePause;
  };
  f.fn.cycle = function (c, b) {
    var e = { s: this.selector, c: this.context };
    if (this.length === 0 && c != "stop") {
      if (!f.isReady && e.s) {
        a("DOM not ready, queuing slideshow");
        f(function () {
          f(e.s, e.c).cycle(c, b);
        });
        return this;
      }
      a(
        "terminating; zero elements found by selector" +
          (f.isReady ? "" : " (DOM not ready)")
      );
      return this;
    }
    return this.each(function () {
      var l = j(this, c, b);
      if (l !== false) {
        l.updateActivePagerLink =
          l.updateActivePagerLink || f.fn.cycle.updateActivePagerLink;
        this.cycleTimeout && clearTimeout(this.cycleTimeout);
        this.cycleStop = this.cycleTimeout = this.cyclePause = 0;
        var p = f(this),
          i = l.slideExpr ? f(l.slideExpr, this) : p.children(),
          d = i.get();
        if (d.length < 2) a("terminating; too few slides: " + d.length);
        else {
          var k = u(p, i, d, l, e);
          if (k !== false)
            if (
              (p = k.continuous
                ? 10
                : n(d[k.currSlide], d[k.nextSlide], k, !k.backwards))
            ) {
              p = p + (k.delay || 0);
              p < 10 && (p = 10);
              g("first timeout: " + p);
              this.cycleTimeout = setTimeout(function () {
                r(d, k, 0, !l.backwards);
              }, p);
            }
        }
      }
    });
  };
  f.fn.cycle.resetState = function (a, b) {
    b = b || a.fx;
    a.before = [];
    a.after = [];
    a.cssBefore = f.extend({}, a.original.cssBefore);
    a.cssAfter = f.extend({}, a.original.cssAfter);
    a.animIn = f.extend({}, a.original.animIn);
    a.animOut = f.extend({}, a.original.animOut);
    a.fxFn = null;
    f.each(a.original.before, function () {
      a.before.push(this);
    });
    f.each(a.original.after, function () {
      a.after.push(this);
    });
    var c = f.fn.cycle.transitions[b];
    f.isFunction(c) && c(a.$cont, f(a.elements), a);
  };
  f.fn.cycle.updateActivePagerLink = function (a, b, c) {
    f(a).each(function () {
      f(this).children().removeClass(c).eq(b).addClass(c);
    });
  };
  f.fn.cycle.next = function (a) {
    v(a, 1);
  };
  f.fn.cycle.prev = function (a) {
    v(a, 0);
  };
  f.fn.cycle.createPagerAnchor = function (a, b, c, j, e) {
    if (f.isFunction(e.pagerAnchorBuilder)) {
      b = e.pagerAnchorBuilder(a, b);
      g("pagerAnchorBuilder(" + a + ", el) returned: " + b);
    } else b = '<a href="#">' + (a + 1) + "</a>";
    if (b) {
      var i = f(b);
      if (i.parents("body").length === 0) {
        var d = [];
        if (c.length > 1) {
          c.each(function () {
            var a = i.clone(true);
            f(this).append(a);
            d.push(a[0]);
          });
          i = f(d);
        } else i.appendTo(c);
      }
      e.pagerAnchors = e.pagerAnchors || [];
      e.pagerAnchors.push(i);
      c = function (b) {
        b.preventDefault();
        e.nextSlide = a;
        var b = e.$cont[0],
          d = b.cycleTimeout;
        if (d) {
          clearTimeout(d);
          b.cycleTimeout = 0;
        }
        b = e.onPagerEvent || e.pagerClick;
        f.isFunction(b) && b(e.nextSlide, j[e.nextSlide]);
        r(j, e, 1, e.currSlide < a);
      };
      /mouseenter|mouseover/i.test(e.pagerEvent)
        ? i.hover(c, function () {})
        : i.bind(e.pagerEvent, c);
      !/^click/.test(e.pagerEvent) &&
        !e.allowPagerClickBubble &&
        i.bind("click.cycle", function () {
          return false;
        });
      var k = e.$cont[0],
        n = false;
      e.pauseOnPagerHover &&
        i.hover(
          function () {
            n = true;
            k.cyclePause++;
            l(k, true, true);
          },
          function () {
            n && k.cyclePause--;
            l(k, true, true);
          }
        );
    }
  };
  f.fn.cycle.hopsFromLast = function (a, b) {
    var f = a.lastSlide,
      c = a.currSlide;
    return b
      ? c > f
        ? c - f
        : a.slideCount - f
      : c < f
      ? f - c
      : f + a.slideCount - c;
  };
  f.fn.cycle.commonReset = function (a, b, c, e, j, l) {
    f(c.elements).not(a).hide();
    if (typeof c.cssBefore.opacity == "undefined") c.cssBefore.opacity = 1;
    c.cssBefore.display = "block";
    if (c.slideResize && e !== false && b.cycleW > 0)
      c.cssBefore.width = b.cycleW;
    if (c.slideResize && j !== false && b.cycleH > 0)
      c.cssBefore.height = b.cycleH;
    c.cssAfter = c.cssAfter || {};
    c.cssAfter.display = "none";
    f(a).css("zIndex", c.slideCount + (l === true ? 1 : 0));
    f(b).css("zIndex", c.slideCount + (l === true ? 0 : 1));
  };
  f.fn.cycle.custom = function (a, b, c, e, j, l) {
    var d = f(a),
      k = f(b),
      g = c.speedIn,
      a = c.speedOut,
      n = c.easeIn,
      b = c.easeOut;
    k.css(c.cssBefore);
    if (l) {
      g = typeof l == "number" ? (a = l) : (a = 1);
      n = b = null;
    }
    var u = function () {
      k.animate(c.animIn, g, n, function () {
        e();
      });
    };
    d.animate(c.animOut, a, b, function () {
      d.css(c.cssAfter);
      c.sync || u();
    });
    c.sync && u();
  };
  f.fn.cycle.transitions = {
    fade: function (a, b, c) {
      b.not(":eq(" + c.currSlide + ")").css("opacity", 0);
      c.before.push(function (a, b, c) {
        f.fn.cycle.commonReset(a, b, c);
        c.cssBefore.opacity = 0;
      });
      c.animIn = { opacity: 1 };
      c.animOut = { opacity: 0 };
      c.cssBefore = { top: 0, left: 0 };
    },
  };
  f.fn.cycle.ver = function () {
    return "2.9999.5";
  };
  f.fn.cycle.defaults = {
    activePagerClass: "activeSlide",
    after: null,
    allowPagerClickBubble: !1,
    animIn: null,
    animOut: null,
    aspect: !1,
    autostop: 0,
    autostopCount: 0,
    backwards: !1,
    before: null,
    center: null,
    cleartype: !f.support.opacity,
    cleartypeNoBg: !1,
    containerResize: 1,
    continuous: 0,
    cssAfter: null,
    cssBefore: null,
    delay: 0,
    easeIn: null,
    easeOut: null,
    easing: null,
    end: null,
    fastOnEvent: 0,
    fit: 0,
    fx: "fade",
    fxFn: null,
    height: "auto",
    manualTrump: !0,
    metaAttr: "cycle",
    next: null,
    nowrap: 0,
    onPagerEvent: null,
    onPrevNextEvent: null,
    pager: null,
    pagerAnchorBuilder: null,
    pagerEvent: "click.cycle",
    pause: 0,
    pauseOnPagerHover: 0,
    prev: null,
    prevNextEvent: "click.cycle",
    random: 0,
    randomizeEffects: 1,
    requeueOnImageNotLoaded: !0,
    requeueTimeout: 250,
    rev: 0,
    shuffle: null,
    skipInitializationCallbacks: !1,
    slideExpr: null,
    slideResize: 1,
    speed: 1e3,
    speedIn: null,
    speedOut: null,
    startingSlide: e,
    sync: 1,
    timeout: 4e3,
    timeoutFn: null,
    updateActivePagerLink: null,
    width: null,
  };
})(jQuery);
(function (f) {
  f.fn.cycle.transitions.none = function (e, g, a) {
    a.fxFn = function (a, e, c, g) {
      f(e).show();
      f(a).hide();
      g();
    };
  };
  f.fn.cycle.transitions.fadeout = function (e, g, a) {
    g.not(":eq(" + a.currSlide + ")").css({ display: "block", opacity: 1 });
    a.before.push(function (a, e, c, g, r, n) {
      f(a).css("zIndex", c.slideCount + (!0 !== n ? 1 : 0));
      f(e).css("zIndex", c.slideCount + (!0 !== n ? 0 : 1));
    });
    a.animIn.opacity = 1;
    a.animOut.opacity = 0;
    a.cssBefore.opacity = 1;
    a.cssBefore.display = "block";
    a.cssAfter.zIndex = 0;
  };
  f.fn.cycle.transitions.scrollUp = function (e, g, a) {
    e.css("overflow", "hidden");
    a.before.push(f.fn.cycle.commonReset);
    e = e.height();
    a.cssBefore.top = e;
    a.cssBefore.left = 0;
    a.cssFirst.top = 0;
    a.animIn.top = 0;
    a.animOut.top = -e;
  };
  f.fn.cycle.transitions.scrollDown = function (e, g, a) {
    e.css("overflow", "hidden");
    a.before.push(f.fn.cycle.commonReset);
    e = e.height();
    a.cssFirst.top = 0;
    a.cssBefore.top = -e;
    a.cssBefore.left = 0;
    a.animIn.top = 0;
    a.animOut.top = e;
  };
  f.fn.cycle.transitions.scrollLeft = function (e, g, a) {
    e.css("overflow", "hidden");
    a.before.push(f.fn.cycle.commonReset);
    e = e.width();
    a.cssFirst.left = 0;
    a.cssBefore.left = e;
    a.cssBefore.top = 0;
    a.animIn.left = 0;
    a.animOut.left = 0 - e;
  };
  f.fn.cycle.transitions.scrollRight = function (e, g, a) {
    e.css("overflow", "hidden");
    a.before.push(f.fn.cycle.commonReset);
    e = e.width();
    a.cssFirst.left = 0;
    a.cssBefore.left = -e;
    a.cssBefore.top = 0;
    a.animIn.left = 0;
    a.animOut.left = e;
  };
  f.fn.cycle.transitions.scrollHorz = function (e, g, a) {
    e.css("overflow", "hidden").width();
    a.before.push(function (a, e, c, g) {
      c.rev && (g = !g);
      f.fn.cycle.commonReset(a, e, c);
      c.cssBefore.left = g ? e.cycleW - 1 : 1 - e.cycleW;
      c.animOut.left = g ? -a.cycleW : a.cycleW;
    });
    a.cssFirst.left = 0;
    a.cssBefore.top = 0;
    a.animIn.left = 0;
    a.animOut.top = 0;
  };
  f.fn.cycle.transitions.scrollVert = function (e, g, a) {
    e.css("overflow", "hidden");
    a.before.push(function (a, e, c, g) {
      c.rev && (g = !g);
      f.fn.cycle.commonReset(a, e, c);
      c.cssBefore.top = g ? 1 - e.cycleH : e.cycleH - 1;
      c.animOut.top = g ? a.cycleH : -a.cycleH;
    });
    a.cssFirst.top = 0;
    a.cssBefore.left = 0;
    a.animIn.top = 0;
    a.animOut.left = 0;
  };
  f.fn.cycle.transitions.slideX = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f(c.elements).not(a).hide();
      f.fn.cycle.commonReset(a, e, c, !1, !0);
      c.animIn.width = e.cycleW;
    });
    a.cssBefore.left = 0;
    a.cssBefore.top = 0;
    a.cssBefore.width = 0;
    a.animIn.width = "show";
    a.animOut.width = 0;
  };
  f.fn.cycle.transitions.slideY = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f(c.elements).not(a).hide();
      f.fn.cycle.commonReset(a, e, c, !0, !1);
      c.animIn.height = e.cycleH;
    });
    a.cssBefore.left = 0;
    a.cssBefore.top = 0;
    a.cssBefore.height = 0;
    a.animIn.height = "show";
    a.animOut.height = 0;
  };
  f.fn.cycle.transitions.shuffle = function (e, g, a) {
    e = e.css("overflow", "visible").width();
    g.css({ left: 0, top: 0 });
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !0, !0, !0);
    });
    a.speedAdjusted || ((a.speed /= 2), (a.speedAdjusted = !0));
    a.random = 0;
    a.shuffle = a.shuffle || { left: -e, top: 15 };
    a.els = [];
    for (e = 0; e < g.length; e++) a.els.push(g[e]);
    for (e = 0; e < a.currSlide; e++) a.els.push(a.els.shift());
    a.fxFn = function (a, e, c, g, r) {
      c.rev && (r = !r);
      var n = r ? f(a) : f(e);
      f(e).css(c.cssBefore);
      var v = c.slideCount;
      n.animate(c.shuffle, c.speedIn, c.easeIn, function () {
        for (var e = f.fn.cycle.hopsFromLast(c, r), j = 0; j < e; j++)
          r ? c.els.push(c.els.shift()) : c.els.unshift(c.els.pop());
        if (r) {
          e = 0;
          for (j = c.els.length; e < j; e++)
            f(c.els[e]).css("z-index", j - e + v);
        } else {
          e = f(a).css("z-index");
          n.css("z-index", parseInt(e, 10) + 1 + v);
        }
        n.animate({ left: 0, top: 0 }, c.speedOut, c.easeOut, function () {
          f(r ? this : a).hide();
          g && g();
        });
      });
    };
    f.extend(a.cssBefore, { display: "block", opacity: 1, top: 0, left: 0 });
  };
  f.fn.cycle.transitions.turnUp = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !0, !1);
      c.cssBefore.top = e.cycleH;
      c.animIn.height = e.cycleH;
      c.animOut.width = e.cycleW;
    });
    a.cssFirst.top = 0;
    a.cssBefore.left = 0;
    a.cssBefore.height = 0;
    a.animIn.top = 0;
    a.animOut.height = 0;
  };
  f.fn.cycle.transitions.turnDown = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !0, !1);
      c.animIn.height = e.cycleH;
      c.animOut.top = a.cycleH;
    });
    a.cssFirst.top = 0;
    a.cssBefore.left = 0;
    a.cssBefore.top = 0;
    a.cssBefore.height = 0;
    a.animOut.height = 0;
  };
  f.fn.cycle.transitions.turnLeft = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !1, !0);
      c.cssBefore.left = e.cycleW;
      c.animIn.width = e.cycleW;
    });
    a.cssBefore.top = 0;
    a.cssBefore.width = 0;
    a.animIn.left = 0;
    a.animOut.width = 0;
  };
  f.fn.cycle.transitions.turnRight = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !1, !0);
      c.animIn.width = e.cycleW;
      c.animOut.left = a.cycleW;
    });
    f.extend(a.cssBefore, { top: 0, left: 0, width: 0 });
    a.animIn.left = 0;
    a.animOut.width = 0;
  };
  f.fn.cycle.transitions.zoom = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !1, !1, !0);
      c.cssBefore.top = e.cycleH / 2;
      c.cssBefore.left = e.cycleW / 2;
      f.extend(c.animIn, {
        top: 0,
        left: 0,
        width: e.cycleW,
        height: e.cycleH,
      });
      f.extend(c.animOut, {
        width: 0,
        height: 0,
        top: a.cycleH / 2,
        left: a.cycleW / 2,
      });
    });
    a.cssFirst.top = 0;
    a.cssFirst.left = 0;
    a.cssBefore.width = 0;
    a.cssBefore.height = 0;
  };
  f.fn.cycle.transitions.fadeZoom = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !1, !1);
      c.cssBefore.left = e.cycleW / 2;
      c.cssBefore.top = e.cycleH / 2;
      f.extend(c.animIn, {
        top: 0,
        left: 0,
        width: e.cycleW,
        height: e.cycleH,
      });
    });
    a.cssBefore.width = 0;
    a.cssBefore.height = 0;
    a.animOut.opacity = 0;
  };
  f.fn.cycle.transitions.blindX = function (e, g, a) {
    e = e.css("overflow", "hidden").width();
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c);
      c.animIn.width = e.cycleW;
      c.animOut.left = a.cycleW;
    });
    a.cssBefore.left = e;
    a.cssBefore.top = 0;
    a.animIn.left = 0;
    a.animOut.left = e;
  };
  f.fn.cycle.transitions.blindY = function (e, g, a) {
    e = e.css("overflow", "hidden").height();
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c);
      c.animIn.height = e.cycleH;
      c.animOut.top = a.cycleH;
    });
    a.cssBefore.top = e;
    a.cssBefore.left = 0;
    a.animIn.top = 0;
    a.animOut.top = e;
  };
  f.fn.cycle.transitions.blindZ = function (e, g, a) {
    g = e.css("overflow", "hidden").height();
    e = e.width();
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c);
      c.animIn.height = e.cycleH;
      c.animOut.top = a.cycleH;
    });
    a.cssBefore.top = g;
    a.cssBefore.left = e;
    a.animIn.top = 0;
    a.animIn.left = 0;
    a.animOut.top = g;
    a.animOut.left = e;
  };
  f.fn.cycle.transitions.growX = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !1, !0);
      c.cssBefore.left = this.cycleW / 2;
      c.animIn.left = 0;
      c.animIn.width = this.cycleW;
      c.animOut.left = 0;
    });
    a.cssBefore.top = 0;
    a.cssBefore.width = 0;
  };
  f.fn.cycle.transitions.growY = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !0, !1);
      c.cssBefore.top = this.cycleH / 2;
      c.animIn.top = 0;
      c.animIn.height = this.cycleH;
      c.animOut.top = 0;
    });
    a.cssBefore.height = 0;
    a.cssBefore.left = 0;
  };
  f.fn.cycle.transitions.curtainX = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !1, !0, !0);
      c.cssBefore.left = e.cycleW / 2;
      c.animIn.left = 0;
      c.animIn.width = this.cycleW;
      c.animOut.left = a.cycleW / 2;
      c.animOut.width = 0;
    });
    a.cssBefore.top = 0;
    a.cssBefore.width = 0;
  };
  f.fn.cycle.transitions.curtainY = function (e, g, a) {
    a.before.push(function (a, e, c) {
      f.fn.cycle.commonReset(a, e, c, !0, !1, !0);
      c.cssBefore.top = e.cycleH / 2;
      c.animIn.top = 0;
      c.animIn.height = e.cycleH;
      c.animOut.top = a.cycleH / 2;
      c.animOut.height = 0;
    });
    a.cssBefore.height = 0;
    a.cssBefore.left = 0;
  };
  f.fn.cycle.transitions.cover = function (e, g, a) {
    var l = a.direction || "left",
      j = e.css("overflow", "hidden").width(),
      c = e.height();
    a.before.push(function (a, e, g) {
      f.fn.cycle.commonReset(a, e, g);
      "right" == l
        ? (g.cssBefore.left = -j)
        : "up" == l
        ? (g.cssBefore.top = c)
        : "down" == l
        ? (g.cssBefore.top = -c)
        : (g.cssBefore.left = j);
    });
    a.animIn.left = 0;
    a.animIn.top = 0;
    a.cssBefore.top = 0;
    a.cssBefore.left = 0;
  };
  f.fn.cycle.transitions.uncover = function (e, g, a) {
    var l = a.direction || "left",
      j = e.css("overflow", "hidden").width(),
      c = e.height();
    a.before.push(function (a, e, g) {
      f.fn.cycle.commonReset(a, e, g, !0, !0, !0);
      "right" == l
        ? (g.animOut.left = j)
        : "up" == l
        ? (g.animOut.top = -c)
        : "down" == l
        ? (g.animOut.top = c)
        : (g.animOut.left = -j);
    });
    a.animIn.left = 0;
    a.animIn.top = 0;
    a.cssBefore.top = 0;
    a.cssBefore.left = 0;
  };
  f.fn.cycle.transitions.toss = function (e, g, a) {
    var l = e.css("overflow", "visible").width(),
      j = e.height();
    a.before.push(function (a, e, g) {
      f.fn.cycle.commonReset(a, e, g, !0, !0, !0);
      !g.animOut.left && !g.animOut.top
        ? f.extend(g.animOut, { left: 2 * l, top: -j / 2, opacity: 0 })
        : (g.animOut.opacity = 0);
    });
    a.cssBefore.left = 0;
    a.cssBefore.top = 0;
    a.animIn.left = 0;
  };
  f.fn.cycle.transitions.wipe = function (e, g, a) {
    var l = e.css("overflow", "hidden").width(),
      j = e.height();
    a.cssBefore = a.cssBefore || {};
    var c;
    a.clip &&
      (/l2r/.test(a.clip)
        ? (c = "rect(0px 0px " + j + "px 0px)")
        : /r2l/.test(a.clip)
        ? (c = "rect(0px " + l + "px " + j + "px " + l + "px)")
        : /t2b/.test(a.clip)
        ? (c = "rect(0px " + l + "px 0px 0px)")
        : /b2t/.test(a.clip)
        ? (c = "rect(" + j + "px " + l + "px " + j + "px 0px)")
        : /zoom/.test(a.clip) &&
          ((e = parseInt(j / 2, 10)),
          (g = parseInt(l / 2, 10)),
          (c = "rect(" + e + "px " + g + "px " + e + "px " + g + "px)")));
    a.cssBefore.clip = a.cssBefore.clip || c || "rect(0px 0px 0px 0px)";
    var e = a.cssBefore.clip.match(/(\d+)/g),
      u = parseInt(e[0], 10),
      r = parseInt(e[1], 10),
      n = parseInt(e[2], 10),
      v = parseInt(e[3], 10);
    a.before.push(function (a, c, b) {
      if (a != c) {
        var e = f(a),
          g = f(c);
        f.fn.cycle.commonReset(a, c, b, true, true, false);
        b.cssAfter.display = "block";
        var p = 1,
          i = parseInt(b.speedIn / 13, 10) - 1;
        (function k() {
          var a = u ? u - parseInt(p * (u / i), 10) : 0,
            b = v ? v - parseInt(p * (v / i), 10) : 0,
            c = n < j ? n + parseInt(p * ((j - n) / i || 1), 10) : j,
            f = r < l ? r + parseInt(p * ((l - r) / i || 1), 10) : l;
          g.css({
            clip: "rect(" + a + "px " + f + "px " + c + "px " + b + "px)",
          });
          p++ <= i ? setTimeout(k, 13) : e.css("display", "none");
        })();
      }
    });
    f.extend(a.cssBefore, { display: "block", opacity: 1, top: 0, left: 0 });
    a.animIn = { left: 0 };
    a.animOut = { left: 0 };
  };
})(jQuery);
