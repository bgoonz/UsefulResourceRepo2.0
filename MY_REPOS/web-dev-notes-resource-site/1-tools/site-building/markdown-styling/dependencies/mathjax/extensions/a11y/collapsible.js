!(function (a) {
  var b,
    c = a.config.menuSettings,
    d = {},
    e = "data-semantic-complexity",
    f = MathJax.Ajax.config.path;
  f.a11y || (f.a11y = a.config.root + "/extensions/a11y");
  var g = (MathJax.Extension.collapsible = {
    version: "1.5.0",
    config: a.CombineConfig("collapsible", { disabled: !1 }),
    dependents: [],
    COMPLEXATTR: e,
    COMPLEXITY: {
      TEXT: 0.5,
      TOKEN: 0.5,
      CHILD: 1,
      SCRIPT: 0.8,
      SQRT: 2,
      SUBSUP: 2,
      UNDEROVER: 2,
      FRACTION: 2,
      ACTION: 2,
      PHANTOM: 0,
      XML: 2,
      GLYPH: 2,
    },
    COLLAPSE: {
      identifier: 3,
      number: 3,
      text: 10,
      infixop: 15,
      relseq: 15,
      multirel: 15,
      fenced: 18,
      bigop: 20,
      integral: 20,
      fraction: 12,
      sqrt: 9,
      root: 12,
      vector: 15,
      matrix: 15,
      cases: 15,
      superscript: 9,
      subscript: 9,
      subsup: 9,
      punctuated: { endpunct: 1e7, startpunct: 1e7, value: 12 },
    },
    MARKER: {
      identifier: "x",
      number: "#",
      text: "...",
      appl: { "limit function": "lim", value: "f()" },
      fraction: "/",
      sqrt: "\u221a",
      root: "\u221a",
      superscript: "\u25fd\u02d9",
      subscript: "\u25fd.",
      subsup: "\u25fd:",
      vector: { binomial: "(:)", determinant: "|:|", value: "\u27e8:\u27e9" },
      matrix: {
        squarematrix: "[::]",
        rowvector: "\u27e8\u22ef\u27e9",
        columnvector: "\u27e8\u22ee\u27e9",
        determinant: "|::|",
        value: "(::)",
      },
      cases: "{:",
      infixop: {
        addition: "+",
        subtraction: "\u2212",
        multiplication: "\u22c5",
        implicit: "\u22c5",
        value: "+",
      },
      punctuated: { text: "...", value: "," },
    },
    Enable: function (b, e) {
      (c.collapsible = !0),
        e && (d.collapsible = !0),
        (this.config.disabled = !1),
        MathJax.Extension["semantic-enrich"].Enable(!1, e),
        b && a.Queue(["Reprocess", a]);
    },
    Disable: function (b, e) {
      (c.collapsible = !1),
        e && (d.collapsible = !1),
        (this.config.disabled = !0);
      for (var f = this.dependents.length - 1; f >= 0; f--) {
        var g = this.dependents[f];
        g.Disable && g.Disable(!1, e);
      }
      b && a.Queue(["Reprocess", a]);
    },
    Dependent: function (a) {
      this.dependents.push(a);
    },
    Startup: function () {
      b = MathJax.ElementJax.mml;
      var c = MathJax.Extension["semantic-enrich"];
      c && c.Dependent(this), a.postInputHooks.Add(["Filter", g], 100);
    },
    Filter: function (a, b, c) {
      a.enriched &&
        !this.config.disabled &&
        ((a.root = a.root.Collapse()), (a.root.inputID = c.id));
    },
    Marker: function (a) {
      return b
        .mtext("\u25c2" + a + "\u25b8")
        .With({ mathcolor: "blue", attr: {}, attrNames: [] });
    },
    MakeAction: function (a, c) {
      var d = b
        .maction(a)
        .With({
          id: this.getActionID(),
          actiontype: "toggle",
          complexity: a.getComplexity(),
          collapsible: !0,
          attrNames: ["id", "actiontype", "selection", e],
          attr: {},
          selection: 2,
        });
      if (((d.attr[e] = d.complexity), "math" === c.type)) {
        var f = b
          .mrow()
          .With({ complexity: c.complexity, attrNames: [], attr: {} });
        f.Append.apply(f, c.data);
        for (var g, h = c.attrNames.length - 1; (g = c.attrNames[h]); h--)
          "data-semantic-" === g.substr(0, 14) &&
            ((f.attr[g] = c.attr[g]),
            f.attrNames.push(g),
            delete c.attr[g],
            c.attrNames.splice(h, 1));
        (f.complexity = c.complexity),
          d.Append(f),
          (c.data = []),
          c.Append(d),
          (c.complexity = d.complexity),
          (d = c);
      } else d.Append(c);
      return d;
    },
    actionID: 1,
    getActionID: function () {
      return "MJX-Collapse-" + this.actionID++;
    },
    Collapse: function (a) {
      a.getComplexity();
      var b = (a.attr || {})["data-semantic-type"];
      if (b)
        if (this["Collapse_" + b]) a = this["Collapse_" + b](a);
        else if (this.COLLAPSE[b] && this.MARKER[b]) {
          var c = a.attr["data-semantic-role"],
            d = this.COLLAPSE[b];
          if (
            ("number" != typeof d && (d = d[c] || d.value), a.complexity > d)
          ) {
            var e = this.MARKER[b];
            "string" != typeof e && (e = e[c] || e.value),
              (a = this.MakeAction(this.Marker(e), a));
          }
        }
      return a;
    },
    UncollapseChild: function (a, b, c) {
      if (
        (null == c && (c = 1), this.SplitAttribute(a, "children").length === c)
      ) {
        var d = 1 === a.data.length && a.data[0].inferred ? a.data[0] : a;
        if (d && d.data[b] && d.data[b].collapsible)
          return (
            d.SetData(b, d.data[b].data[1]),
            (a.complexity = d.complexity = null),
            a.getComplexity(),
            1
          );
      }
      return 0;
    },
    FindChildText: function (a, b) {
      var c = this.FindChild(a, b);
      return c ? (c.CoreMO() || c).data.join("") : "?";
    },
    FindChild: function (a, b) {
      if (a) {
        if (a.attr && a.attr["data-semantic-id"] === b) return a;
        if (!a.isToken)
          for (var c = 0, d = a.data.length; c < d; c++) {
            var e = this.FindChild(a.data[c], b);
            if (e) return e;
          }
      }
      return null;
    },
    SplitAttribute: function (a, b) {
      return (a.attr["data-semantic-" + b] || "").split(/,/);
    },
    Collapse_fenced: function (a) {
      if (
        (this.UncollapseChild(a, 1),
        a.complexity > this.COLLAPSE.fenced &&
          "leftright" === a.attr["data-semantic-role"])
      ) {
        var b =
          a.data[0].data.join("") + a.data[a.data.length - 1].data.join("");
        a = this.MakeAction(this.Marker(b), a);
      }
      return a;
    },
    Collapse_appl: function (a) {
      if (this.UncollapseChild(a, 2, 2)) {
        var b = this.MARKER.appl;
        (b = b[a.attr["data-semantic-role"]] || b.value),
          (a = this.MakeAction(this.Marker(b), a));
      }
      return a;
    },
    Collapse_sqrt: function (a) {
      return (
        this.UncollapseChild(a, 0),
        a.complexity > this.COLLAPSE.sqrt &&
          (a = this.MakeAction(this.Marker(this.MARKER.sqrt), a)),
        a
      );
    },
    Collapse_root: function (a) {
      return (
        this.UncollapseChild(a, 0),
        a.complexity > this.COLLAPSE.sqrt &&
          (a = this.MakeAction(this.Marker(this.MARKER.sqrt), a)),
        a
      );
    },
    Collapse_enclose: function (a) {
      if (1 === this.SplitAttribute(a, "children").length) {
        var b = 1 === a.data.length && a.data[0].inferred ? a.data[0] : a;
        if (b.data[0] && b.data[0].collapsible) {
          var c = b.data[0];
          b.SetData(0, c.data[1]), c.SetData(1, a), (a = c);
        }
      }
      return a;
    },
    Collapse_bigop: function (a) {
      if (a.complexity > this.COLLAPSE.bigop || "mo" !== a.data[0].type) {
        var b = this.SplitAttribute(a, "content").pop(),
          c = g.FindChildText(a, b);
        a = this.MakeAction(this.Marker(c), a);
      }
      return a;
    },
    Collapse_integral: function (a) {
      if (a.complexity > this.COLLAPSE.integral || "mo" !== a.data[0].type) {
        var b = this.SplitAttribute(a, "content")[0],
          c = g.FindChildText(a, b);
        a = this.MakeAction(this.Marker(c), a);
      }
      return a;
    },
    Collapse_relseq: function (a) {
      if (a.complexity > this.COLLAPSE.relseq) {
        var b = this.SplitAttribute(a, "content"),
          c = g.FindChildText(a, b[0]);
        b.length > 1 && (c += "\u22ef"),
          (a = this.MakeAction(this.Marker(c), a));
      }
      return a;
    },
    Collapse_multirel: function (a) {
      if (a.complexity > this.COLLAPSE.multirel) {
        var b = this.SplitAttribute(a, "content"),
          c = g.FindChildText(a, b[0]) + "\u22ef";
        a = this.MakeAction(this.Marker(c), a);
      }
      return a;
    },
    Collapse_superscript: function (a) {
      return (
        this.UncollapseChild(a, 0, 2),
        a.complexity > this.COLLAPSE.superscript &&
          (a = this.MakeAction(this.Marker(this.MARKER.superscript), a)),
        a
      );
    },
    Collapse_subscript: function (a) {
      return (
        this.UncollapseChild(a, 0, 2),
        a.complexity > this.COLLAPSE.subscript &&
          (a = this.MakeAction(this.Marker(this.MARKER.subscript), a)),
        a
      );
    },
    Collapse_subsup: function (a) {
      return (
        this.UncollapseChild(a, 0, 3),
        a.complexity > this.COLLAPSE.subsup &&
          (a = this.MakeAction(this.Marker(this.MARKER.subsup), a)),
        a
      );
    },
  });
  a.Register.StartupHook(
    "End Extensions",
    function () {
      null == c.collapsible
        ? (c.collapsible = !g.config.disabled)
        : (g.config.disabled = !c.collapsible),
        a.Register.StartupHook(
          "MathMenu Ready",
          function () {
            d = MathJax.Menu.cookie;
            var a,
              b = function (a) {
                g[c.collapsible ? "Enable" : "Disable"](!0, !0),
                  MathJax.Menu.saveCookie();
              },
              e = MathJax.Menu.ITEM,
              f = MathJax.Menu.menu,
              h = e.CHECKBOX(
                ["CollapsibleMath", "Collapsible Math"],
                "collapsible",
                { action: b }
              ),
              i = (f.FindId("Accessibility") || {}).submenu;
            i
              ? ((a = i.IndexOfId("CollapsibleMath")),
                null !== a ? (i.items[a] = h) : i.items.push(e.RULE(), h))
              : ((a = f.IndexOfId("About")), f.items.splice(a, 0, h, e.RULE()));
          },
          15
        );
    },
    15
  );
})(MathJax.Hub),
  MathJax.Ajax.Require("[a11y]/semantic-enrich.js"),
  MathJax.Hub.Register.StartupHook("Semantic Enrich Ready", function () {
    var a = MathJax.ElementJax.mml,
      b = MathJax.Extension.collapsible,
      c = b.COMPLEXITY,
      d = b.COMPLEXATTR;
    b.Startup(),
      a.mbase.Augment({
        Collapse: function () {
          return b.Collapse(this);
        },
        getComplexity: function () {
          if (null == this.complexity) {
            var a = 0;
            if (this.isToken) a = c.TEXT * this.data.join("").length + c.TOKEN;
            else {
              for (var b = 0, e = this.data.length; b < e; b++)
                this.data[b] &&
                  (this.SetData(b, this.data[b].Collapse()),
                  (a += this.data[b].complexity));
              e > 1 && (a += e * c.CHILD);
            }
            !this.attrNames || "complexity" in this || this.attrNames.push(d),
              this.attr && (this.attr[d] = a),
              (this.complexity = a);
          }
          return this.complexity;
        },
        reportComplexity: function () {
          !this.attr ||
            !this.attrNames ||
            d in this.attr ||
            (this.attrNames.push(d), (this.attr[d] = this.complexity));
        },
      }),
      a.mfrac.Augment({
        getComplexity: function () {
          return (
            null == this.complexity &&
              (this.SUPER(arguments).getComplexity.call(this),
              (this.complexity *= c.SCRIPT),
              (this.complexity += c.FRACTION),
              (this.attr[d] = this.complexity)),
            this.complexity
          );
        },
      }),
      a.msqrt.Augment({
        getComplexity: function () {
          return (
            null == this.complexity &&
              (this.SUPER(arguments).getComplexity.call(this),
              (this.complexity += c.SQRT),
              (this.attr[d] = this.complexity)),
            this.complexity
          );
        },
      }),
      a.mroot.Augment({
        getComplexity: function () {
          return (
            null == this.complexity &&
              (this.SUPER(arguments).getComplexity.call(this),
              (this.complexity -=
                (1 - c.SCRIPT) * this.data[1].getComplexity()),
              (this.complexity += c.SQRT),
              (this.attr[d] = this.complexity)),
            this.complexity
          );
        },
      }),
      a.msubsup.Augment({
        getComplexity: function () {
          if (null == this.complexity) {
            var a = 0;
            this.data[this.sub] &&
              (a = this.data[this.sub].getComplexity() + c.CHILD),
              this.data[this.sup] &&
                (a = Math.max(this.data[this.sup].getComplexity(), a)),
              (a *= c.SCRIPT),
              this.data[this.sub] && (a += c.CHILD),
              this.data[this.sup] && (a += c.CHILD),
              this.data[this.base] &&
                (a += this.data[this.base].getComplexity() + c.CHILD),
              (this.complexity = a + c.SUBSUP),
              this.reportComplexity();
          }
          return this.complexity;
        },
      }),
      a.munderover.Augment({
        getComplexity: function () {
          if (null == this.complexity) {
            var a = 0;
            this.data[this.sub] &&
              (a = this.data[this.sub].getComplexity() + c.CHILD),
              this.data[this.sup] &&
                (a = Math.max(this.data[this.sup].getComplexity(), a)),
              (a *= c.SCRIPT),
              this.data[this.base] &&
                (a = Math.max(this.data[this.base].getComplexity(), a)),
              this.data[this.sub] && (a += c.CHILD),
              this.data[this.sup] && (a += c.CHILD),
              this.data[this.base] && (a += c.CHILD),
              (this.complexity = a + c.UNDEROVER),
              this.reportComplexity();
          }
          return this.complexity;
        },
      }),
      a.mphantom.Augment({
        getComplexity: function () {
          return (
            (this.complexity = c.PHANTOM),
            this.reportComplexity(),
            this.complexity
          );
        },
      }),
      a.ms.Augment({
        getComplexity: function () {
          return (
            this.SUPER(arguments).getComplexity.call(this),
            (this.complexity += this.Get("lquote").length * c.TEXT),
            (this.complexity += this.Get("rquote").length * c.TEXT),
            (this.attr[d] = this.complexity),
            this.complexity
          );
        },
      }),
      a.menclose.Augment({
        getComplexity: function () {
          return (
            null == this.complexity &&
              (this.SUPER(arguments).getComplexity.call(this),
              (this.complexity += c.ACTION),
              (this.attr[d] = this.complexity)),
            this.complexity
          );
        },
      }),
      a.maction.Augment({
        getComplexity: function () {
          return (
            (this.complexity = (
              this.collapsible ? this.data[0] : this.selected()
            ).getComplexity()),
            this.reportComplexity(),
            this.complexity
          );
        },
      }),
      a.semantics.Augment({
        getComplexity: function () {
          return (
            null == this.complexity &&
              ((this.complexity = this.data[0]
                ? this.data[0].getComplexity()
                : 0),
              this.reportComplexity()),
            this.complexity
          );
        },
      }),
      a["annotation-xml"].Augment({
        getComplexity: function () {
          return (
            (this.complexity = c.XML), this.reportComplexity(), this.complexity
          );
        },
      }),
      a.annotation.Augment({
        getComplexity: function () {
          return (
            (this.complexity = c.XML), this.reportComplexity(), this.complexity
          );
        },
      }),
      a.mglyph.Augment({
        getComplexity: function () {
          return (
            (this.complexity = c.GLYPH),
            this.reportComplexity(),
            this.complexity
          );
        },
      }),
      MathJax.Hub.Startup.signal.Post("Collapsible Ready"),
      MathJax.Ajax.loadComplete("[a11y]/collapsible.js");
  });
