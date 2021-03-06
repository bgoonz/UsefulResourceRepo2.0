/*
 * tools.tooltip 1.1.3 - Tooltips done right.
 *
 * Copyright (c) 2009 Tero Piirainen
 * http://flowplayer.org/tools/tooltip.html
 *
 * Dual licensed under MIT and GPL 2+ licenses
 * http://www.opensource.org/licenses
 *
 * Launch  : November 2008
 * Date: ${date}
 * Revision: ${revision}
 */
(function (c) {
  var d = [];
  c.tools = c.tools || {};
  c.tools.tooltip = {
    version: "1.1.3",
    conf: {
      effect: "toggle",
      fadeOutSpeed: "fast",
      tip: null,
      predelay: 0,
      delay: 30,
      opacity: 1,
      lazy: undefined,
      position: ["top", "center"],
      offset: [0, 0],
      cancelDefault: true,
      relative: false,
      oneInstance: true,
      events: {
        def: "mouseover,mouseout",
        input: "focus,blur",
        widget: "focus mouseover,blur mouseout",
        tooltip: "mouseover,mouseout",
      },
      api: false,
    },
    addEffect: function (e, g, f) {
      b[e] = [g, f];
    },
  };
  var b = {
    toggle: [
      function (e) {
        var f = this.getConf(),
          g = this.getTip(),
          h = f.opacity;
        if (h < 1) {
          g.css({ opacity: h });
        }
        g.show();
        e.call();
      },
      function (e) {
        this.getTip().hide();
        e.call();
      },
    ],
    fade: [
      function (e) {
        this.getTip().fadeIn(this.getConf().fadeInSpeed, e);
      },
      function (e) {
        this.getTip().fadeOut(this.getConf().fadeOutSpeed, e);
      },
    ],
  };
  function a(f, g) {
    var p = this,
      k = c(this);
    f.data("tooltip", p);
    var l = f.next();
    if (g.tip) {
      l = c(g.tip);
      if (l.length > 1) {
        l = f.nextAll(g.tip).eq(0);
        if (!l.length) {
          l = f.parent().nextAll(g.tip).eq(0);
        }
      }
    }
    function o(u) {
      var t = g.relative ? f.position().top : f.offset().top,
        s = g.relative ? f.position().left : f.offset().left,
        v = g.position[0];
      t -= l.outerHeight() - g.offset[0];
      s += f.outerWidth() + g.offset[1];
      var q = l.outerHeight() + f.outerHeight();
      if (v == "center") {
        t += q / 2;
      }
      if (v == "bottom") {
        t += q;
      }
      v = g.position[1];
      var r = l.outerWidth() + f.outerWidth();
      if (v == "center") {
        s -= r / 2;
      }
      if (v == "left") {
        s -= r;
      }
      return { top: t, left: s };
    }
    var i = f.is(":input"),
      e = i && f.is(":checkbox, :radio, select, :button"),
      h = f.attr("type"),
      n = g.events[h] || g.events[i ? (e ? "widget" : "input") : "def"];
    n = n.split(/,\s*/);
    if (n.length != 2) {
      throw "Tooltip: bad events configuration for " + h;
    }
    f.bind(n[0], function (r) {
      if (g.oneInstance) {
        c.each(d, function () {
          this.hide();
        });
      }
      var q = l.data("trigger");
      if (q && q[0] != this) {
        l.hide().stop(true, true);
      }
      r.target = this;
      p.show(r);
      n = g.events.tooltip.split(/,\s*/);
      l.bind(n[0], function () {
        p.show(r);
      });
      if (n[1]) {
        l.bind(n[1], function () {
          p.hide(r);
        });
      }
    });
    f.bind(n[1], function (q) {
      p.hide(q);
    });
    if (!c.browser.msie && !i && !g.predelay) {
      f.mousemove(function () {
        if (!p.isShown()) {
          f.triggerHandler("mouseover");
        }
      });
    }
    if (g.opacity < 1) {
      l.css("opacity", g.opacity);
    }
    var m = 0,
      j = f.attr("title");
    if (j && g.cancelDefault) {
      f.removeAttr("title");
      f.data("title", j);
    }
    c.extend(p, {
      show: function (r) {
        if (r) {
          f = c(r.target);
        }
        clearTimeout(l.data("timer"));
        if (l.is(":animated") || l.is(":visible")) {
          return p;
        }
        function q() {
          l.data("trigger", f);
          var t = o(r);
          if (g.tip && j) {
            l.html(f.data("title"));
          }
          r = r || c.Event();
          r.type = "onBeforeShow";
          k.trigger(r, [t]);
          if (r.isDefaultPrevented()) {
            return p;
          }
          t = o(r);
          l.css({ position: "absolute", top: t.top, left: t.left });
          var s = b[g.effect];
          if (!s) {
            throw 'Nonexistent effect "' + g.effect + '"';
          }
          s[0].call(p, function () {
            r.type = "onShow";
            k.trigger(r);
          });
        }
        if (g.predelay) {
          clearTimeout(m);
          m = setTimeout(q, g.predelay);
        } else {
          q();
        }
        return p;
      },
      hide: function (r) {
        clearTimeout(l.data("timer"));
        clearTimeout(m);
        if (!l.is(":visible")) {
          return;
        }
        function q() {
          r = r || c.Event();
          r.type = "onBeforeHide";
          k.trigger(r);
          if (r.isDefaultPrevented()) {
            return;
          }
          b[g.effect][1].call(p, function () {
            r.type = "onHide";
            k.trigger(r);
          });
        }
        if (g.delay && r) {
          l.data("timer", setTimeout(q, g.delay));
        } else {
          q();
        }
        return p;
      },
      isShown: function () {
        return l.is(":visible, :animated");
      },
      getConf: function () {
        return g;
      },
      getTip: function () {
        return l;
      },
      getTrigger: function () {
        return f;
      },
      bind: function (q, r) {
        k.bind(q, r);
        return p;
      },
      onHide: function (q) {
        return this.bind("onHide", q);
      },
      onBeforeShow: function (q) {
        return this.bind("onBeforeShow", q);
      },
      onShow: function (q) {
        return this.bind("onShow", q);
      },
      onBeforeHide: function (q) {
        return this.bind("onBeforeHide", q);
      },
      unbind: function (q) {
        k.unbind(q);
        return p;
      },
    });
    c.each(g, function (q, r) {
      if (c.isFunction(r)) {
        p.bind(q, r);
      }
    });
  }
  c.prototype.tooltip = function (e) {
    var f = this.eq(typeof e == "number" ? e : 0).data("tooltip");
    if (f) {
      return f;
    }
    var g = c.extend(true, {}, c.tools.tooltip.conf);
    if (c.isFunction(e)) {
      e = { onBeforeShow: e };
    } else {
      if (typeof e == "string") {
        e = { tip: e };
      }
    }
    e = c.extend(true, g, e);
    if (typeof e.position == "string") {
      e.position = e.position.split(/,?\s/);
    }
    if (e.lazy !== false && (e.lazy === true || this.length > 20)) {
      this.one("mouseover", function (h) {
        f = new a(c(this), e);
        f.show(h);
        d.push(f);
      });
    } else {
      this.each(function () {
        f = new a(c(this), e);
        d.push(f);
      });
    }
    return e.api ? f : this;
  };
})(jQuery);
