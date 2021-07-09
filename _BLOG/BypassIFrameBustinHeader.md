# Bypass IFrame Busting Header - Requestly

> Any technique which prevents a website from being rendered inside Iframe comes under Iframe Busting Techniques. Due to Security issues like clickjacking, various types of Iframe busting techniques are used. Simple Iframe Busting (JS Code) This is one…

Any technique which prevents a website from being rendered inside Iframe comes under Iframe Busting Techniques. Due to Security issues like [clickjacking](https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet), various types of Iframe busting techniques are used.

### Simple Iframe Busting (JS Code)

    <script>
      if(top != window) {
        top.location = window.location
      }
    </script>

This is one of the simple Iframe Busting techniques which just says

> If current `window` is not `top` window, change the url of top window.

This technique is considered week as there are easy options to bypass it.

### Bypass Iframe Code Busters

1.  [Using HTML5 sandbox attribute](https://developer.mozilla.org/en/docs/Web/HTML/Element/iframe)
2.  [Using onBeforeUnload handler](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload)

`sandbox` attribute can be used on iframe to allow forms, popups and scripts but block parent navigation. So the frame won’t be able to change Url of parent window. It just throws an error in console. Checkout this [demo on Jsbin](http://jsbin.com/vokacihihu/1/edit?html,output). You should see the following error in developer tools.

&gt; Unsafe JavaScript attempt to initiate navigation for frame with URL “http://null.jsbin.com/runner” from frame with URL “http://go.sap.com/index.html”. The frame attempting navigation is \`sandboxed\`, and is therefore disallowed from navigating its ancestors.

## Reliable Iframe Busting (X-Frame-Options)

[X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) response header is very reliable approach for busting Iframes. Its not easy to bypass this HTTP response header. One may need to setup a proxy server to fetch the content from website and return the response to browser.

### X-Frame-Options Values

There are three possible values for X-Frame-Options:

1.  **DENY**: Browser will not render page inside frame irrespective of the domain of parent page.
2.  **SAMEORIGIN**: Browser will render page inside iframe only if page domain is same as domain of parent page.
3.  **ALLOW-FROM uri**: Browser will render page inside iframe only if domain of parent page is same as specified as `uri`.

Checkout this [demo on Jsbin](http://jsbin.com/harefaluyu/1/edit?html,output). You should see the following error in developer tools.

> Refused to display ‘[https://in.yahoo.com/?p=us’](https://in.yahoo.com/?p=us%E2%80%99) in a frame because it set ‘X-Frame-Options’ to ‘DENY’.

There is no simple way to circumvent this response header. This is why this is considered as one of the most reliable Iframe Busting techniques.

### Bypass X-Frame-Options header on your machine

There are tools available to bypass HTTP response header on your machine though.

1.  [Charles Proxy](http://www.charlesproxy.com/)
2.  [Fiddler](http://www.telerik.com/fiddler)
3.  Browser extensions like [Requestly](https://chrome.google.com/webstore/detail/requestly/mdnleldcmiljblolnjhpnblkcekpdkpa) for Chrome, [Modify Response Headers](https://addons.mozilla.org/en-us/firefox/addon/modify-response-headers/) for Firefox

### Using Requestly (Chrome) to modify Headers

[Requestly](https://chrome.google.com/webstore/detail/requestly/mdnleldcmiljblolnjhpnblkcekpdkpa) is a popular Chrome Extension which allows you to modify HTTP(s) requests. It can be used to remove HTTP response header like this:

### ![](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wp-content/uploads/2018/06/requestly_header_modification-1.png)Import Requestly Rule

Requestly also provides another great feature to export/import rules.You can [download above rule here and import in your extension](https://app.requestly.in/content/assets/rules/remove-x-frame-options-header-requestly-rule.txt)

### Using Modify Response Header (Firefox)

[Modify Response Headers](https://addons.mozilla.org/en-us/firefox/addon/modify-response-headers/) is a firefox add-on which allows you to modify HTTP(s) response headers. It can be used to remove HTTP response header like this:

### ![](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wp-content/uploads/2018/06/modify_response_headers.png)Further Reading

- <https://www.owasp.org/index.php/Clickjacking>
- [http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/](https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/)
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options>

[Source](https://requestly.io/blog/2018/06/16/bypass-iframe-busting-header/)
