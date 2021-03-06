MathJax.Hub.Register.StartupHook("Sre Ready", function () {
  var a,
    b,
    c = MathJax.Hub.config.menuSettings,
    d = {};
  MathJax.Hub.Register.StartupHook("MathEvents Ready", function () {
    (a = MathJax.Extension.MathEvents.Event.False),
      (b = MathJax.Extension.MathEvents.Event.KEY);
  });
  var e = (MathJax.Extension.explorer = {
      version: "1.5.0",
      dependents: [],
      defaults: {
        walker: "table",
        highlight: "none",
        background: "blue",
        foreground: "black",
        speech: !0,
        generation: "lazy",
        subtitle: !1,
        ruleset: "mathspeak-default",
      },
      eagerComplexity: 80,
      prefix: "Assistive-",
      hook: null,
      locHook: null,
      oldrules: null,
      addMenuOption: function (a, b) {
        c[e.prefix + a] = b;
      },
      addDefaults: function () {
        for (
          var a,
            b = MathJax.Hub.CombineConfig("explorer", e.defaults),
            d = Object.keys(b),
            f = 0;
          (a = d[f]);
          f++
        )
          void 0 === c[e.prefix + a] && e.addMenuOption(a, b[a]);
        e.setSpeechOption(), h.Reset();
      },
      setOption: function (a, b) {
        c[e.prefix + a] !== b && (e.addMenuOption(a, b), h.Reset());
      },
      getOption: function (a) {
        return c[e.prefix + a];
      },
      speechOption: function (a) {
        e.oldrules !== a.value && (e.setSpeechOption(), h.Regenerate());
      },
      setSpeechOption: function () {
        var a = c[e.prefix + "ruleset"],
          b = a.split("-");
        sre.System.getInstance().setupEngine({
          locale: MathJax.Localization.locale,
          domain: e.Domain(b[0]),
          style: b[1],
          rules: e.RuleSet(b[0]),
        }),
          (e.oldrules = a);
      },
      Domain: function (a) {
        switch (a) {
          case "chromevox":
            return "default";
          case "mathspeak":
          default:
            return "mathspeak";
        }
      },
      RuleSet: function (a) {
        switch (a) {
          case "chromevox":
            return ["AbstractionRules", "SemanticTreeRules"];
          case "mathspeak":
          default:
            return [
              "AbstractionRules",
              "AbstractionSpanish",
              "MathspeakRules",
              "MathspeakSpanish",
            ];
        }
      },
      hook: null,
      locHook: null,
      Enable: function (a, b) {
        (c.explorer = !0),
          b && (d.explorer = !0),
          MathJax.Extension.collapsible.Enable(!1, b),
          MathJax.Extension.AssistiveMML &&
            ((MathJax.Extension.AssistiveMML.config.disabled = !0),
            (c.assistiveMML = !1),
            b && (d.assistiveMML = !1)),
          this.DisableMenus(!1),
          this.hook ||
            (this.hook = MathJax.Hub.Register.MessageHook("New Math", [
              "Register",
              this.Explorer,
            ])),
          this.locHook ||
            (this.locHook = MathJax.Hub.Register.MessageHook("Locale Reset", [
              "RemoveSpeech",
              this.Explorer,
            ])),
          a && MathJax.Hub.Queue(["Reprocess", MathJax.Hub]);
      },
      Disable: function (a, b) {
        (c.explorer = !1),
          b && (d.explorer = !1),
          this.DisableMenus(!0),
          this.hook &&
            (MathJax.Hub.UnRegister.MessageHook(this.hook), (this.hook = null));
        for (var e = this.dependents.length - 1; e >= 0; e--) {
          var f = this.dependents[e];
          f.Disable && f.Disable(!1, b);
        }
      },
      DisableMenus: function (a) {
        if (MathJax.Menu) {
          var b = MathJax.Menu.menu.FindId("Accessibility", "Explorer");
          if (b) {
            b = b.submenu;
            for (var d, f = b.items, g = 2; (d = f[g]); g++) d.disabled = a;
            a ||
              !b.FindId("SpeechOutput") ||
              c[e.prefix + "speech"] ||
              (b.FindId("Subtitles").disabled = !0);
          }
        }
      },
      Dependent: function (a) {
        this.dependents.push(a);
      },
    }),
    f = MathJax.Object.Subclass(
      {
        div: null,
        inner: null,
        Init: function () {
          (this.div = f.Create("assertive")),
            (this.inner = MathJax.HTML.addElement(this.div, "div"));
        },
        Add: function () {
          f.added || (document.body.appendChild(this.div), (f.added = !0));
        },
        Show: function (a, b) {
          this.div.classList.add("MJX_LiveRegion_Show");
          var c = a.getBoundingClientRect(),
            d = c.bottom + 10 + window.pageYOffset,
            e = c.left + window.pageXOffset;
          (this.div.style.top = d + "px"), (this.div.style.left = e + "px");
          var f = b.colorString();
          (this.inner.style.backgroundColor = f.background),
            (this.inner.style.color = f.foreground);
        },
        Hide: function (a) {
          this.div.classList.remove("MJX_LiveRegion_Show");
        },
        Clear: function () {
          this.Update(""),
            (this.inner.style.top = ""),
            (this.inner.style.backgroundColor = "");
        },
        Update: function (a) {
          e.getOption("speech") && f.Update(this.inner, a);
        },
      },
      {
        ANNOUNCE:
          "Navigatable Math in page. Explore with shift space and arrow keys. Expand or collapse elements hitting enter.",
        announced: !1,
        added: !1,
        styles: {
          ".MJX_LiveRegion": {
            position: "absolute",
            top: "0",
            height: "1px",
            width: "1px",
            padding: "1px",
            overflow: "hidden",
          },
          ".MJX_LiveRegion_Show": {
            top: "0",
            position: "absolute",
            width: "auto",
            height: "auto",
            padding: "0px 0px",
            opacity: 1,
            "z-index": "202",
            left: 0,
            right: 0,
            margin: "0 auto",
            "background-color": "white",
            "box-shadow": "0px 10px 20px #888",
            border: "2px solid #CCCCCC",
          },
        },
        Create: function (a) {
          var b = MathJax.HTML.Element("div", { className: "MJX_LiveRegion" });
          return b.setAttribute("aria-live", a), b;
        },
        Update: MathJax.Hub.Browser.isPC
          ? function (a, b) {
              (a.textContent = ""),
                setTimeout(function () {
                  a.textContent = b;
                }, 100);
            }
          : function (a, b) {
              (a.textContent = ""), (a.textContent = b);
            },
        Announce: function () {
          if (e.getOption("speech")) {
            (f.announced = !0), MathJax.Ajax.Styles(f.styles);
            var a = f.Create("polite");
            document.body.appendChild(a),
              f.Update(a, f.ANNOUNCE),
              setTimeout(function () {
                document.body.removeChild(a);
              }, 1e3);
          }
        },
      }
    );
  MathJax.Extension.explorer.LiveRegion = f;
  var g = MathJax.Ajax.fileURL(MathJax.Ajax.config.path.a11y),
    h = (MathJax.Extension.explorer.Explorer = {
      liveRegion: f(),
      walker: null,
      highlighter: null,
      hoverer: null,
      flamer: null,
      speechDiv: null,
      earconFile:
        g +
        "/invalid_keypress" +
        (-1 !== ["Firefox", "Chrome", "Opera"].indexOf(MathJax.Hub.Browser.name)
          ? ".ogg"
          : ".mp3"),
      expanded: !1,
      focusoutEvent: MathJax.Hub.Browser.isFirefox ? "blur" : "focusout",
      focusinEvent: "focus",
      ignoreFocusOut: !1,
      jaxCache: {},
      messageID: null,
      Reset: function () {
        h.FlameEnriched();
      },
      Register: function (a) {
        if (e.hook) {
          var b = document.getElementById(a[1]);
          if (b && b.id) {
            var c = MathJax.Hub.getJaxFor(b.id);
            c &&
              c.enriched &&
              (h.StateChange(b.id, c), h.liveRegion.Add(), h.AddEvent(b));
          }
        }
      },
      StateChange: function (a, b) {
        h.GetHighlighter(0.2);
        var c = h.jaxCache[a];
        (c && c === b.root) ||
          (c && h.highlighter.resetState(a + "-Frame"),
          (h.jaxCache[a] = b.root));
      },
      AddAria: function (a) {
        a.setAttribute("role", "application"),
          a.setAttribute("aria-label", "Math");
      },
      AddHook: function (a) {
        h.RemoveHook(),
          (h.hook = MathJax.Hub.Register.MessageHook("End Math", function (b) {
            var c = b[1].id + "-Frame",
              d = document.getElementById(c);
            a &&
              c === h.expanded &&
              (h.ActivateWalker(d, a), d.focus(), (h.expanded = !1));
          }));
      },
      RemoveHook: function () {
        h.hook && (MathJax.Hub.UnRegister.MessageHook(h.hook), (h.hook = null));
      },
      AddMessage: function () {
        return MathJax.Message.Set("Generating Speech Output");
      },
      RemoveMessage: function (a) {
        a && MathJax.Message.Clear(a);
      },
      AddEvent: function (a) {
        var b = a.id + "-Frame",
          c = a.previousSibling;
        if (c) {
          var d = c.id !== b ? c.firstElementChild : c;
          h.AddAria(d),
            h.AddMouseEvents(d),
            "MathJax_MathML" === d.className && (d = d.firstElementChild),
            d &&
              ((d.onkeydown = h.Keydown),
              h.Flame(d),
              d.addEventListener(h.focusinEvent, function (a) {
                e.hook && (f.announced || f.Announce());
              }),
              d.addEventListener(h.focusoutEvent, function (a) {
                if (e.hook)
                  return h.ignoreFocusOut &&
                    ((h.ignoreFocusOut = !1), "enter" === h.walker.moved)
                    ? void a.target.focus()
                    : void (h.walker && h.DeactivateWalker());
              }),
              e.getOption("speech") && h.AddSpeech(d));
        }
      },
      AddSpeech: function (a) {
        var b = a.id,
          c = MathJax.Hub.getJaxFor(b),
          d = c.root.toMathML();
        if (
          (a.getAttribute("haslabel") || h.AddMathLabel(d, b),
          !a.getAttribute("hasspeech"))
        )
          switch (MathJax.Hub.config.explorer.generation) {
            case "eager":
              h.AddSpeechEager(d, b);
              break;
            case "mixed":
              a.querySelectorAll("[data-semantic-complexity]").length >=
                e.eagerComplexity && h.AddSpeechEager(d, b);
          }
      },
      AddSpeechLazy: function (a) {
        var b = new sre.TreeSpeechGenerator();
        b.setRebuilt(h.walker.rebuilt),
          b.getSpeech(h.walker.rootNode, h.walker.xml),
          a.setAttribute("hasspeech", "true");
      },
      AddSpeechEager: function (a, b) {
        h.MakeSpeechTask(
          a,
          b,
          sre.TreeSpeechGenerator,
          function (a, b) {
            a.setAttribute("hasspeech", "true");
          },
          5
        );
      },
      AddMathLabel: function (a, b) {
        h.MakeSpeechTask(
          a,
          b,
          sre.SummarySpeechGenerator,
          function (a, b) {
            a.setAttribute("haslabel", "true"), a.setAttribute("aria-label", b);
          },
          5
        );
      },
      MakeSpeechTask: function (a, b, c, d, e) {
        var f = h.AddMessage();
        setTimeout(function () {
          var e = new c(),
            g = document.getElementById(b),
            i = new sre.DummyWalker(g, e, h.highlighter, a),
            j = i.speech();
          j && d(g, j), h.RemoveMessage(f);
        }, e);
      },
      Keydown: function (c) {
        if (c.keyCode === b.ESCAPE) {
          if (!h.walker) return;
          return h.RemoveHook(), h.DeactivateWalker(), void a(c);
        }
        if (h.walker && h.walker.isActive()) {
          void 0 !== h.walker.modifier && (h.walker.modifier = c.shiftKey);
          var d = h.walker.move(c.keyCode);
          if (null === d) return;
          if (d) {
            if ("expand" === h.walker.moved) {
              if (((h.expanded = h.walker.node.id), MathJax.Hub.Browser.isEdge))
                return (h.ignoreFocusOut = !0), void h.DeactivateWalker();
              if (MathJax.Hub.Browser.isFirefox || MathJax.Hub.Browser.isMSIE)
                return void h.DeactivateWalker();
            }
            h.liveRegion.Update(h.walker.speech()), h.Highlight();
          } else h.PlayEarcon();
          return void a(c);
        }
        var f = c.target;
        if (c.keyCode === b.SPACE) {
          if (c.shiftKey && e.hook) {
            var g = MathJax.Hub.getJaxFor(f);
            h.ActivateWalker(f, g), h.AddHook(g);
          } else MathJax.Extension.MathEvents.Event.ContextMenu(c, f);
          return void a(c);
        }
      },
      GetHighlighter: function (a) {
        h.highlighter = sre.HighlighterFactory.highlighter(
          { color: e.getOption("background"), alpha: a },
          { color: e.getOption("foreground"), alpha: 1 },
          {
            renderer: MathJax.Hub.outputJax["jax/mml"][0].id,
            browser: MathJax.Hub.Browser.name,
          }
        );
      },
      AddMouseEvents: function (a) {
        sre.HighlighterFactory.addEvents(
          a,
          { mouseover: h.MouseOver, mouseout: h.MouseOut },
          {
            renderer: MathJax.Hub.outputJax["jax/mml"][0].id,
            browser: MathJax.Hub.Browser.name,
          }
        );
      },
      MouseOver: function (b) {
        if ("none" !== e.getOption("highlight")) {
          if ("hover" === e.getOption("highlight")) {
            var c = b.currentTarget;
            h.GetHighlighter(0.1),
              h.highlighter.highlight([c]),
              (h.hoverer = !0);
          }
          a(b);
        }
      },
      MouseOut: function (b) {
        return (
          h.hoverer && (h.highlighter.unhighlight(), (h.hoverer = !1)), a(b)
        );
      },
      Flame: function (a) {
        if ("flame" === e.getOption("highlight"))
          return (
            h.GetHighlighter(0.05),
            h.highlighter.highlightAll(a),
            void (h.flamer = !0)
          );
      },
      UnFlame: function () {
        h.flamer && (h.highlighter.unhighlightAll(), (h.flamer = null));
      },
      FlameEnriched: function () {
        h.UnFlame();
        for (var a, b = 0, c = MathJax.Hub.getAllJax(); (a = c[b]); b++)
          h.Flame(a.SourceElement().previousSibling);
      },
      Walkers: {
        syntactic: sre.SyntaxWalker,
        table: sre.TableWalker,
        semantic: sre.SemanticWalker,
        none: sre.DummyWalker,
      },
      ActivateWalker: function (a, b) {
        var c = e.getOption("speech"),
          d = e.getOption("walker")
            ? h.Walkers[MathJax.Hub.config.explorer.walker]
            : h.Walkers.none,
          f = c
            ? new sre.DirectSpeechGenerator()
            : new sre.DummySpeechGenerator();
        h.GetHighlighter(0.2),
          (h.walker = new d(a, f, h.highlighter, b.root.toMathML())),
          c && !a.getAttribute("hasspeech") && h.AddSpeechLazy(a),
          h.walker.activate(),
          c &&
            (e.getOption("subtitle") && h.liveRegion.Show(a, h.highlighter),
            h.liveRegion.Update(h.walker.speech())),
          h.Highlight(),
          h.ignoreFocusOut &&
            setTimeout(function () {
              h.ignoreFocusOut = !1;
            }, 500);
      },
      DeactivateWalker: function () {
        h.liveRegion.Clear(),
          h.liveRegion.Hide(),
          h.Unhighlight(),
          (h.currentHighlight = null),
          h.walker.deactivate(),
          (h.walker = null);
      },
      Highlight: function () {
        h.Unhighlight(),
          h.highlighter.highlight(h.walker.getFocus().getNodes());
      },
      Unhighlight: function () {
        h.highlighter.unhighlight();
      },
      PlayEarcon: function () {
        new Audio(h.earconFile).play();
      },
      SpeechOutput: function () {
        h.Reset(),
          ["Subtitles"].forEach(function (a) {
            var b = MathJax.Menu.menu.FindId("Accessibility", "Explorer", a);
            b && (b.disabled = !b.disabled);
          }),
          h.Regenerate();
      },
      RemoveSpeech: function () {
        e.setSpeechOption();
        for (var a, b = 0, c = MathJax.Hub.getAllJax(); (a = c[b]); b++) {
          var d = document.getElementById(a.inputID + "-Frame");
          d && (d.removeAttribute("hasspeech"), d.removeAttribute("haslabel"));
        }
      },
      Regenerate: function () {
        for (var a, b = 0, c = MathJax.Hub.getAllJax(); (a = c[b]); b++) {
          var d = document.getElementById(a.inputID + "-Frame");
          d && (d.removeAttribute("hasspeech"), h.AddSpeech(d));
        }
      },
      Startup: function () {
        var a = MathJax.Extension.collapsible;
        a && a.Dependent(e), e.addDefaults();
      },
    });
  MathJax.Hub.Register.StartupHook(
    "End Extensions",
    function () {
      e[!1 === c.explorer ? "Disable" : "Enable"](),
        MathJax.Hub.Startup.signal.Post("Explorer Ready"),
        MathJax.Hub.Register.StartupHook(
          "MathMenu Ready",
          function () {
            d = MathJax.Menu.cookie;
            var a,
              b = function (a) {
                e[c.explorer ? "Enable" : "Disable"](!0, !0),
                  MathJax.Menu.saveCookie();
              },
              f = MathJax.Menu.ITEM,
              g = MathJax.Menu.menu,
              i = { action: h.Reset },
              j = { action: e.speechOption },
              k = f.SUBMENU(
                ["Explorer", "Explorer"],
                f.CHECKBOX(["Active", "Active"], "explorer", { action: b }),
                f.RULE(),
                f.CHECKBOX(["Walker", "Walker"], "Assistive-walker"),
                f.SUBMENU(
                  ["Highlight", "Highlight"],
                  f.RADIO(["none", "None"], "Assistive-highlight", i),
                  f.RADIO(["hover", "Hover"], "Assistive-highlight", i),
                  f.RADIO(["flame", "Flame"], "Assistive-highlight", i)
                ),
                f.SUBMENU(
                  ["Background", "Background"],
                  f.RADIO(["blue", "Blue"], "Assistive-background", i),
                  f.RADIO(["red", "Red"], "Assistive-background", i),
                  f.RADIO(["green", "Green"], "Assistive-background", i),
                  f.RADIO(["yellow", "Yellow"], "Assistive-background", i),
                  f.RADIO(["cyan", "Cyan"], "Assistive-background", i),
                  f.RADIO(["magenta", "Magenta"], "Assistive-background", i),
                  f.RADIO(["white", "White"], "Assistive-background", i),
                  f.RADIO(["black", "Black"], "Assistive-background", i)
                ),
                f.SUBMENU(
                  ["Foreground", "Foreground"],
                  f.RADIO(["black", "Black"], "Assistive-foreground", i),
                  f.RADIO(["white", "White"], "Assistive-foreground", i),
                  f.RADIO(["magenta", "Magenta"], "Assistive-foreground", i),
                  f.RADIO(["cyan", "Cyan"], "Assistive-foreground", i),
                  f.RADIO(["yellow", "Yellow"], "Assistive-foreground", i),
                  f.RADIO(["green", "Green"], "Assistive-foreground", i),
                  f.RADIO(["red", "Red"], "Assistive-foreground", i),
                  f.RADIO(["blue", "Blue"], "Assistive-foreground", i)
                ),
                f.RULE(),
                f.CHECKBOX(
                  ["SpeechOutput", "Speech Output"],
                  "Assistive-speech",
                  { action: h.SpeechOutput }
                ),
                f.CHECKBOX(["Subtitles", "Subtitles"], "Assistive-subtitle", {
                  disabled: !c["Assistive-speech"],
                }),
                f.RULE(),
                f.SUBMENU(
                  ["Mathspeak", "Mathspeak Rules"],
                  f.RADIO(
                    ["mathspeak-default", "Verbose"],
                    "Assistive-ruleset",
                    j
                  ),
                  f.RADIO(["mathspeak-brief", "Brief"], "Assistive-ruleset", j),
                  f.RADIO(
                    ["mathspeak-sbrief", "Superbrief"],
                    "Assistive-ruleset",
                    j
                  )
                ),
                f.SUBMENU(
                  ["Chromevox", "ChromeVox Rules"],
                  f.RADIO(
                    ["chromevox-default", "Verbose"],
                    "Assistive-ruleset",
                    j
                  ),
                  f.RADIO(["chromevox-short", "Short"], "Assistive-ruleset", j),
                  f.RADIO(
                    ["chromevox-alternative", "Alternative"],
                    "Assistive-ruleset",
                    j
                  )
                )
              ),
              l = (g.FindId("Accessibility") || {}).submenu;
            l
              ? ((a = l.IndexOfId("Explorer")),
                null !== a
                  ? (l.items[a] = k)
                  : ((a = l.IndexOfId("CollapsibleMath")),
                    l.items.splice(a + 1, 0, k)))
              : ((a = g.IndexOfId("CollapsibleMath")),
                g.items.splice(a + 1, 0, k)),
              c.explorer || e.DisableMenus(!0);
          },
          20
        );
    },
    20
  );
}),
  MathJax.Hub.Register.StartupHook("SVG Jax Ready", function () {
    MathJax.Hub.Config({ SVG: { addMMLclasses: !0 } });
    var a = MathJax.OutputJax.SVG;
    if (parseFloat(a.version) < 2.7) {
      var b = a.getJaxFromMath;
      a.Augment({
        getJaxFromMath: function (a) {
          return (
            a.parentNode.className.match(/MathJax_SVG_Display/) &&
              (a = a.parentNode),
            b.call(this, a)
          );
        },
      });
    }
  }),
  MathJax.Ajax.config.path.a11y ||
    (MathJax.Ajax.config.path.a11y =
      MathJax.Hub.config.root + "/extensions/a11y"),
  MathJax.Ajax.Require("[a11y]/collapsible.js"),
  MathJax.Hub.Register.StartupHook("Collapsible Ready", function () {
    MathJax.Extension.explorer.Explorer.Startup(),
      MathJax.Ajax.loadComplete("[a11y]/explorer.js");
  });
