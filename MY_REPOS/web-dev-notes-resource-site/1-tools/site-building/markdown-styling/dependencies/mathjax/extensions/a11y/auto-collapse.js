!(function (a) {
  var b = a.config.menuSettings,
    c = {},
    d = MathJax.Ajax.config.path;
  d.a11y || (d.a11y = a.config.root + "/extensions/a11y");
  var e = (MathJax.Extension["auto-collapse"] = {
    version: "1.5.0",
    config: a.CombineConfig("auto-collapse", { disabled: !1 }),
    dependents: [],
    Enable: function (d, e) {
      (b.autocollapse = !0),
        e && (c.autocollapse = !0),
        (this.config.disabled = !1),
        MathJax.Extension.collapsible.Enable(!1, e),
        d && a.Queue(["Reprocess", a], ["CollapseWideMath", this]);
    },
    Disable: function (d, e) {
      (b.autocollapse = !1),
        e && (c.autocollapse = !1),
        (this.config.disabled = !0);
      for (var f = this.dependents.length - 1; f >= 0; f--) {
        var g = this.dependents[f];
        g.Disable && g.Disable(!1, e);
      }
      d && a.Queue(["Rerender", a]);
    },
    Dependent: function (a) {
      this.dependents.push(a);
    },
    Startup: function () {
      var b = MathJax.Extension.collapsible;
      b && b.Dependent(this),
        a.postInputHooks.Add(["Filter", e], 150),
        a.Queue(function () {
          return e.CollapseWideMath();
        }),
        window.addEventListener
          ? window.addEventListener("resize", e.resizeHandler, !1)
          : window.attachEvent
          ? window.attachEvent("onresize", e.resizeHandler)
          : (window.onresize = e.resizeHandler);
    },
    Filter: function (a, b, c) {
      a.enriched &&
        !this.config.disabled &&
        ("block" === a.root.Get("display") ||
          c.parentNode.childNodes.length <= 3) &&
        (a.root.SRE = { action: this.Actions(a.root) });
    },
    Actions: function (a) {
      var b = [];
      return this.getActions(a, 0, b), this.sortActions(b);
    },
    getActions: function (a, b, c) {
      if (!a.isToken && a.data) {
        b++;
        for (var d = 0, e = a.data.length; d < e; d++)
          if (a.data[d]) {
            var f = a.data[d];
            f.collapsible
              ? (c[b] || (c[b] = []),
                c[b].push(f),
                this.getActions(f.data[1], b, c))
              : this.getActions(f, b, c);
          }
      }
    },
    sortActions: function (a) {
      for (var b = [], c = 0, d = a.length; c < d; c++)
        a[c] && (b = b.concat(a[c].sort(this.sortActionsBy)));
      return b;
    },
    sortActionsBy: function (a, b) {
      return (
        (a = a.data[1].complexity),
        (b = b.data[1].complexity),
        a < b ? -1 : a > b ? 1 : 0
      );
    },
    CollapseWideMath: function (b) {
      if (!this.config.disabled) {
        this.GetContainerWidths(b);
        var c = a.getAllJax(b),
          d = { collapse: [], jax: c, m: c.length, i: 0, changed: !1 };
        return this.collapseState(d);
      }
    },
    collapseState: function (b) {
      for (var c = b.collapse; b.i < b.m; ) {
        var d = b.jax[b.i],
          e = d.root.SRE;
        if (
          ((b.changed = !1),
          e && e.action.length && (e.cwidth < e.m || e.cwidth > e.M))
        ) {
          var f = this.getActionWidths(d, b);
          if (f) return f;
          this.collapseActions(e, b), b.changed && c.push(d.SourceElement());
        }
        b.i++;
      }
      if (0 !== c.length) return 1 === c.length && (c = c[0]), a.Rerender(c);
    },
    collapseActions: function (a, b) {
      for (
        var c = a.width, d = c, e = 1e6, f = a.action.length - 1;
        f >= 0;
        f--
      ) {
        var g = a.action[f],
          h = g.selection;
        c > a.cwidth
          ? ((g.selection = 1), (d = g.SREwidth), (e = c))
          : (g.selection = 2),
          (c = g.SREwidth),
          a.DOMupdate
            ? document
                .getElementById(g.id)
                .setAttribute("selection", g.selection)
            : g.selection !== h && (b.changed = !0);
      }
      (a.m = d), (a.M = e);
    },
    getActionWidths: function (a, b) {
      if (!a.root.SRE.actionWidths) {
        MathJax.OutputJax[a.outputJax].getMetrics(a);
        try {
          this.computeActionWidths(a);
        } catch (a) {
          if (!a.restart) throw a;
          return MathJax.Callback.After(["collapseState", this, b], a.restart);
        }
        b.changed = !0;
      }
      return null;
    },
    computeActionWidths: function (a) {
      var b,
        c = a.root.SRE,
        d = c.action,
        e = {};
      for (c.width = a.sreGetRootWidth(e), b = d.length - 1; b >= 0; b--)
        d[b].selection = 2;
      for (b = d.length - 1; b >= 0; b--) {
        var f = d[b];
        null == f.SREwidth &&
          ((f.selection = 1), (f.SREwidth = a.sreGetActionWidth(e, f)));
      }
      c.actionWidths = !0;
    },
    GetContainerWidths: function (b) {
      var c,
        d,
        e,
        f,
        g,
        h = a.getAllJax(b),
        i = MathJax.HTML.Element("span", { style: { display: "block" } }),
        j = [];
      for (c = 0, d = h.length; c < d; c++)
        (f = h[c]),
          (g = f.root),
          (SRE = g.SRE),
          SRE &&
            SRE.action.length &&
            (null == SRE.width &&
              (f.sreGetMetrics(), (SRE.m = SRE.width), (SRE.M = 1e6)),
            (e = f.SourceElement()),
            (e.previousSibling.style.display = "none"),
            e.parentNode.insertBefore(i.cloneNode(!1), e),
            j.push([f, e]));
      for (c = 0, d = j.length; c < d; c++)
        (f = j[c][0]),
          (e = j[c][1]),
          e.previousSibling.offsetWidth &&
            (f.root.SRE.cwidth = e.previousSibling.offsetWidth * f.root.SRE.em);
      for (c = 0, d = j.length; c < d; c++)
        (f = j[c][0]),
          (e = j[c][1]),
          e.parentNode.removeChild(e.previousSibling),
          (e.previousSibling.style.display = "");
    },
    timer: null,
    running: !1,
    retry: !1,
    saved_delay: 0,
    resizeHandler: function (a) {
      if (!e.config.disabled) {
        if (e.running) return void (e.retry = !0);
        e.timer && clearTimeout(e.timer),
          (e.timer = setTimeout(e.resizeAction, 100));
      }
    },
    resizeAction: function () {
      (e.timer = null),
        (e.running = !0),
        a.Queue(
          function () {
            (e.saved_delay = a.processSectionDelay),
              (a.processSectionDelay = 0);
          },
          ["CollapseWideMath", e],
          ["resizeCheck", e]
        );
    },
    resizeCheck: function () {
      (e.running = !1),
        (a.processSectionDelay = e.saved_delay),
        e.retry && ((e.retry = !1), setTimeout(e.resizeHandler, 0));
    },
  });
  a.Register.StartupHook(
    "End Extensions",
    function () {
      null == b.autocollapse
        ? (b.autocollapse = !e.config.disabled)
        : (e.config.disabled = !b.autocollapse),
        a.Register.StartupHook(
          "MathMenu Ready",
          function () {
            c = MathJax.Menu.cookie;
            var a,
              d = function (a) {
                e[b.autocollapse ? "Enable" : "Disable"](!0, !0),
                  MathJax.Menu.saveCookie();
              },
              f = MathJax.Menu.ITEM,
              g = MathJax.Menu.menu,
              h = f.CHECKBOX(
                ["AutoCollapse", "Auto Collapse"],
                "autocollapse",
                { action: d }
              ),
              i = (g.FindId("Accessibility") || {}).submenu;
            i
              ? ((a = i.IndexOfId("AutoCollapse")),
                null !== a
                  ? (i.items[a] = h)
                  : ((a = i.IndexOfId("CollapsibleMath")),
                    i.items.splice(a + 1, 0, h)))
              : ((a = g.IndexOfId("CollapsibleMath")),
                g.items.splice(a + 1, 0, h));
            var j = function () {
              e[b.autocollapse ? "Enable" : "Disable"]();
            };
            MathJax.Extension.collapse
              ? j()
              : MathJax.Hub.Register.StartupHook("Auto Collapse Ready", j);
          },
          25
        );
    },
    25
  );
})(MathJax.Hub),
  MathJax.ElementJax.Augment({
    sreGetMetrics: function () {
      MathJax.OutputJax[this.outputJax].sreGetMetrics(this, this.root.SRE);
    },
    sreGetRootWidth: function (a) {
      return MathJax.OutputJax[this.outputJax].sreGetRootWidth(this, a);
    },
    sreGetActionWidth: function (a, b) {
      return MathJax.OutputJax[this.outputJax].sreGetActionWidth(this, a, b);
    },
  }),
  MathJax.OutputJax.Augment({
    getMetrics: function () {},
    sreGetMetrics: function (a, b) {
      (b.cwidth = 1e6), (b.width = 0), (b.em = 12);
    },
    sreGetRootWidth: function (a, b) {
      return 0;
    },
    sreGetActionWidth: function (a, b, c) {
      return 0;
    },
  }),
  MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function () {
    MathJax.OutputJax["HTML-CSS"].Augment({
      sreGetMetrics: function (a, b) {
        (b.width = a.root.data[0].HTMLspanElement().parentNode.bbox.w),
          (b.em = 1 / a.HTMLCSS.em / a.HTMLCSS.scale);
      },
      sreGetRootWidth: function (a, b) {
        var c = a.root.data[0].HTMLspanElement();
        return (b.box = c.parentNode), b.box.bbox.w;
      },
      sreGetActionWidth: function (a, b, c) {
        return a.root.data[0].toHTML(b.box).bbox.w;
      },
    });
  }),
  MathJax.Hub.Register.StartupHook("SVG Jax Ready", function () {
    MathJax.OutputJax.SVG.Augment({
      getMetrics: function (a) {
        (this.em = MathJax.ElementJax.mml.mbase.prototype.em = a.SVG.em),
          (this.ex = a.SVG.ex),
          (this.linebreakWidth = a.SVG.lineWidth),
          (this.cwidth = a.SVG.cwidth);
      },
      sreGetMetrics: function (a, b) {
        (b.width = a.root.SVGdata.w / 1e3), (b.em = 1 / a.SVG.em);
      },
      sreGetRootWidth: function (a, b) {
        return (
          (b.span = document.getElementById(a.inputID + "-Frame")),
          a.root.SVGdata.w / 1e3
        );
      },
      sreGetActionWidth: function (a, b, c) {
        (this.mathDiv = b.span), b.span.appendChild(this.textSVG);
        try {
          a.root.data[0].toSVG();
        } catch (a) {
          var d = a;
        }
        if ((b.span.removeChild(this.textSVG), d)) throw d;
        return a.root.data[0].SVGdata.w / 1e3;
      },
    });
  }),
  MathJax.Hub.Register.StartupHook("CommonHTML Jax Ready", function () {
    MathJax.OutputJax.CommonHTML.Augment({
      sreGetMetrics: function (a, b) {
        (b.width = a.root.CHTML.w), (b.em = 1 / a.CHTML.em / a.CHTML.scale);
      },
      sreGetRootWidth: function (a, b) {
        return (
          (b.span = document.getElementById(a.inputID + "-Frame").firstChild),
          (b.tmp = document.createElement("span")),
          (b.tmp.className = b.span.className),
          a.root.CHTML.w / a.CHTML.scale
        );
      },
      sreGetActionWidth: function (a, b, c) {
        b.span.parentNode.replaceChild(b.tmp, b.span),
          (MathJax.OutputJax.CommonHTML.CHTMLnode = b.tmp);
        try {
          a.root.data[0].toCommonHTML(b.tmp);
        } catch (a) {
          var d = a;
        }
        if ((b.tmp.parentNode.replaceChild(b.span, b.tmp), d)) throw d;
        return a.root.data[0].CHTML.w / a.CHTML.scale;
      },
    });
  }),
  MathJax.Hub.Register.StartupHook("NativeMML Jax Ready", function () {
    MathJax.OutputJax.NativeMML.Augment({
      sreGetMetrics: function (a, b) {
        var c = document.getElementById(a.inputID + "-Frame");
        (b.width = c.offsetWidth), (b.em = 1), (b.DOMupdate = !0);
      },
      sreGetRootWidth: function (a, b) {
        return (
          (b.span = document.getElementById(a.inputID + "-Frame").firstChild),
          b.span.offsetWidth
        );
      },
      sreGetActionWidth: function (a, b, c) {
        return (
          document.getElementById(c.id).setAttribute("selection", 1),
          b.span.offsetWidth
        );
      },
    });
  }),
  MathJax.Ajax.Require("[a11y]/collapsible.js"),
  MathJax.Hub.Register.StartupHook("Collapsible Ready", function () {
    MathJax.Extension["auto-collapse"].Startup(),
      MathJax.Hub.Startup.signal.Post("Auto Collapse Ready"),
      MathJax.Ajax.loadComplete("[a11y]/auto-collapse.js");
  });
