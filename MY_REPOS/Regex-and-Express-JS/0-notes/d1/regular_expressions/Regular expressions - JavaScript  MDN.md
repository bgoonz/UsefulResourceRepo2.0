# Regular expressions - JavaScript | MDN

> Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the exec() and test() methods of RegExp, and with the match(), matchAll(), replace(), replaceAll(), search(), and split() methods of String. This chapter describes JavaScript regular expressions.

`RegExp`

ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support4OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`RegExp()` constructor](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support4OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`compile`

Deprecated

](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/compile)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support4OperaFull support6SafariFull support3.1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support2Samsung InternetFull support1.0Node.jsFull support0.10.0[`dotAll`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll)ChromeFull support62EdgeFull support79FirefoxFull support78Internet ExplorerNo supportNoOperaFull support49SafariFull support12WebView AndroidFull support62Chrome AndroidFull support62Firefox AndroidNo supportNoOpera AndroidFull support46iOS SafariFull support12Samsung InternetFull support8.0Node.jsFull support8.10.0[`exec`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support4OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`flags`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags)ChromeFull support49EdgeFull support79FirefoxFull support37Internet ExplorerNo supportNoOperaFull support39SafariFull support9WebView AndroidFull support49Chrome AndroidFull support49Firefox AndroidFull support37Opera AndroidFull support41iOS SafariFull support9Samsung InternetFull support5.0Node.jsFull support6.0.0[`global`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0

Prototype accessor property (ES2015)

ChromeFull support48EdgeFull support12FirefoxFull support38Internet ExplorerFull support5.5OperaFull support35SafariFull support1.3WebView AndroidFull support48Chrome AndroidFull support48Firefox AndroidFull support38Opera AndroidFull support35iOS SafariFull support1Samsung InternetFull support5.0Node.jsFull support6.0.0[`ignoreCase`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0

Prototype accessor property (ES2015)

ChromeFull support48EdgeFull support12FirefoxFull support38Internet ExplorerFull support5.5OperaFull support35SafariFull support1.3WebView AndroidFull support48Chrome AndroidFull support48Firefox AndroidFull support38Opera AndroidFull support35iOS SafariFull support1Samsung InternetFull support5.0Node.jsFull support6.0.0[`RegExp.input` (`$_`)

Non-standard

](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/input)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support15SafariFull support3WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support14iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`lastIndex`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`RegExp.lastMatch` (`$&`)

Non-standard

](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support10.5SafariFull support3WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support11iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`RegExp.lastParen` (`$+`)

Non-standard

](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastParen)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support10.5SafariFull support3WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support11iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`RegExp.leftContext` (``$` ``)

Non-standard

](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/leftContext)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support8SafariFull support3WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0

lookbehind assertions (`(?<= )` and `(?<! )`)

ChromeFull support62EdgeFull support79FirefoxFull support78Internet ExplorerNo supportNoOperaFull support49SafariNo supportNoWebView AndroidFull support62Chrome AndroidFull support62Firefox AndroidNo supportNo

footnote

Opera AndroidFull support46iOS SafariNo supportNoSamsung InternetFull support8.0Node.jsFull support8.10.0[`multiline`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0

Prototype accessor property (ES2015)

ChromeFull support48EdgeFull support12FirefoxFull support38Internet ExplorerFull support5.5OperaFull support35SafariFull support1.3WebView AndroidFull support48Chrome AndroidFull support48Firefox AndroidFull support38Opera AndroidFull support35iOS SafariFull support1Samsung InternetFull support5.0Node.jsFull support6.0.0[`RegExp.$1-$9`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/n)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support4OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0

Named capture groups

ChromeFull support64EdgeFull support79FirefoxFull support78Internet ExplorerNo supportNoOperaFull support51SafariFull support11.1WebView AndroidFull support64Chrome AndroidFull support64Firefox AndroidNo supportNoOpera AndroidFull support47iOS SafariFull support11.3Samsung InternetFull support9.0Node.jsFull support10.0.0

Unicode property escapes (`\p{...}`)

ChromeFull support64EdgeFull support79FirefoxFull support78Internet ExplorerNo supportNoOperaFull support51SafariFull support11.1WebView AndroidFull support64Chrome AndroidFull support64Firefox AndroidNo supportNoOpera AndroidFull support47iOS SafariFull support11.3Samsung InternetFull support9.0Node.jsFull support10.0.0[`RegExp.rightContext` (`$'`)

Non-standard

](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/rightContext)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support5.5OperaFull support8SafariFull support3WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`source`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support4OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0

"(?:)" for empty regexps

ChromeFull support6EdgeFull support12FirefoxFull support38Internet ExplorerNo supportNoOperaFull support15SafariFull support5WebView AndroidFull support≤37Chrome AndroidFull support18Firefox AndroidFull support38Opera AndroidFull support14iOS SafariFull support4.2Samsung InternetFull support1.0Node.jsFull support0.10.0

Escaping

ChromeFull support73EdgeFull support12FirefoxFull support38Internet ExplorerFull support10OperaFull support60SafariFull support6WebView AndroidFull support73Chrome AndroidFull support73Firefox AndroidFull support38Opera AndroidFull support52iOS SafariFull support6Samsung InternetNo supportNoNode.jsFull support12.0.0

Prototype accessor property (ES2015)

ChromeFull support48EdgeFull support12FirefoxFull support41Internet ExplorerFull support4OperaFull support35SafariFull support1.3WebView AndroidFull support48Chrome AndroidFull support48Firefox AndroidFull support41Opera AndroidFull support35iOS SafariFull support1Samsung InternetFull support5.0Node.jsFull support6.0.0[`sticky`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky)ChromeFull support49EdgeFull support13FirefoxFull support3Internet ExplorerNo supportNoOperaFull support36SafariFull support10WebView AndroidFull support49Chrome AndroidFull support49Firefox AndroidFull support4Opera AndroidFull support36iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.0.0

Anchored sticky flag behavior per ES2015

ChromeFull support49EdgeFull support13FirefoxFull support44Internet ExplorerNo supportNoOperaFull support36SafariFull support10WebView AndroidFull support49Chrome AndroidFull support49Firefox AndroidFull support44Opera AndroidFull support36iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.0.0

Prototype accessor property (ES2015)

ChromeFull support49EdgeFull support13FirefoxFull support38Internet ExplorerNo supportNoOperaFull support36SafariFull support10WebView AndroidFull support49Chrome AndroidFull support49Firefox AndroidFull support38Opera AndroidFull support36iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.0.0[`test`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support4OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0[`toSource`

Non-standard

](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toSource)ChromeNo supportNoEdgeNo supportNoFirefoxNo support1 — 74

footnote

Internet ExplorerNo supportNoOperaNo supportNoSafariNo supportNoWebView AndroidNo supportNoChrome AndroidNo supportNoFirefox AndroidFull support4Opera AndroidNo supportNoiOS SafariNo supportNoSamsung InternetNo supportNoNode.jsNo supportNo[`toString`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toString)ChromeFull support1EdgeFull support12FirefoxFull support1Internet ExplorerFull support4OperaFull support5SafariFull support1WebView AndroidFull support1Chrome AndroidFull support18Firefox AndroidFull support4Opera AndroidFull support10.1iOS SafariFull support1Samsung InternetFull support1.0Node.jsFull support0.10.0

Escaping

ChromeFull support73EdgeFull support12FirefoxFull support38Internet ExplorerFull support9OperaFull support60SafariFull support6WebView AndroidFull support73Chrome AndroidFull support73Firefox AndroidFull support38Opera AndroidFull support52iOS SafariFull support6Samsung InternetNo supportNoNode.jsFull support12.0.0[`unicode`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode)ChromeFull support50EdgeFull support12

footnote

FirefoxFull support46Internet ExplorerNo supportNoOperaFull support37SafariFull support10WebView AndroidFull support50Chrome AndroidFull support50Firefox AndroidFull support46Opera AndroidFull support37iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.0.0

footnote

[`@@match`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match)ChromeFull support50EdgeFull support13FirefoxFull support49Internet ExplorerNo supportNoOperaFull support37SafariFull support10WebView AndroidFull support50Chrome AndroidFull support50Firefox AndroidFull support49Opera AndroidFull support37iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.0.0[`@@matchAll`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@matchAll)ChromeFull support73EdgeFull support79FirefoxFull support67Internet ExplorerNo supportNoOperaFull support60SafariFull support13WebView AndroidFull support73Chrome AndroidFull support73Firefox AndroidFull support67Opera AndroidFull support52iOS SafariFull support13Samsung InternetFull support5.0Node.jsFull support12.0.0[`@@replace`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@replace)ChromeFull support50EdgeFull support79FirefoxFull support49Internet ExplorerNo supportNoOperaFull support37SafariFull support10WebView AndroidFull support50Chrome AndroidFull support50Firefox AndroidFull support49Opera AndroidFull support37iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.0.0[`@@search`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@search)ChromeFull support50EdgeFull support13FirefoxFull support49Internet ExplorerNo supportNoOperaFull support37SafariFull support10WebView AndroidFull support50Chrome AndroidFull support50Firefox AndroidFull support49Opera AndroidFull support37iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.0.0[`@@species`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@species)ChromeFull support50EdgeFull support13FirefoxFull support49Internet ExplorerNo supportNoOperaFull support37SafariFull support10WebView AndroidFull support50Chrome AndroidFull support50Firefox AndroidFull support49Opera AndroidFull support37iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.5.0[`@@split`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@split)ChromeFull support50EdgeFull support79FirefoxFull support49Internet ExplorerNo supportNoOperaFull support37SafariFull support10WebView AndroidFull support50Chrome AndroidFull support50Firefox AndroidFull support49Opera AndroidFull support37iOS SafariFull support10Samsung InternetFull support5.0Node.jsFull support6.0.0


[Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)