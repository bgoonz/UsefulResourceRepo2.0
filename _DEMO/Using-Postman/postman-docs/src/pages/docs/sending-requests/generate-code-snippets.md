---
title: "Generating client code"
order: 29.1
page_id: "generate_code_snippets"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Sending requests"
    url: "/docs/sending-requests/requests/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Generating Code Snippets | Postman Level Up"
    url: "https://www.youtube.com/watch?v=yYwkvtSvpHI"
  - type: subtitle
    name: "Case Studies"
  - type: link
    name: "Intuit"
    url: "https://www.postman.com/case-studies/intuit/"
  - type: link
    name: "BigCommerce"
    url: "https://www.postman.com/case-studies/bigcommerce/"
  - type: subtitle
    name: "Blog Posts"
  - type: link
    name: "Generate Code for Your Front-end Apps"
    url: "https://blog.postman.com/use-your-work-in-postman-to-generate-code-for-your-apps/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Capturing HTTP requests"
    url:  "/docs/sending-requests/capturing-request-data/capturing-http-requests/"
  - type: link
    name: "Interceptor"
    url:  "/docs/sending-requests/capturing-request-data/interceptor/"

warning: false

---

You can generate code snippets in various languages and frameworks within Postman.

## Contents

* [Generating code snippets in Postman](#generating-code-snippets-in-postman)

* [Supported languages/frameworks](#supported-languagesframeworks)

* [Next steps](#next-steps)

## Generating code snippets in Postman

In Postman, select the request under your collection and click **Code** icon on the right panel to open the **Code snippet** tab.

<img src="https://assets.postman.com/postman-docs/context-menu-icon-v8.jpg" width="400px" alt="User Menu"/>

Select a language to view and copy your generated code snippet.

![Code Language](https://assets.postman.com/postman-docs/code-language-v8.jpg)

Click the **Gear** icon to find additional configuration options based on your chosen language.

![Code settings](https://assets.postman.com/postman-docs/code-settings-v8.jpg)

## Supported languages/frameworks

Postman currently supports the following options:

| **Language**  | **Framework** |
| --- | --- |
| C | [LibCurl](https://curl.se/libcurl/c/) |
| C# | [RestSharp](http://restsharp.org/) |
| cURL |[cURL](https://curl.se/) |
| Dart | [Dart](https://dart.dev/) |
| Go   | [http package](https://golang.org/pkg/net/http/) |
| HTTP | (Raw HTTP request) |
| Java | [OkHttp](https://github.com/square/okhttp) |
| Java | [Unirest](https://github.com/Kong/unirest-java) |
| JavaScript | [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) |
| JavaScript | [jQuery](https://api.jquery.com/jquery.ajax/) |
| JavaScript | [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) |
| NodeJS | [Axios](https://github.com/axios/axios) |
| NodeJS | [Native](https://nodejs.org/api/http.html) |
| NodeJS | [Request](https://github.com/request/request) |
| NodeJS | [Unirest](https://github.com/Kong/unirest-nodejs) |
| Objective-C | [NSURLSession](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSURLSession_class/) |
| OCaml | [Cohttp](https://github.com/mirage/ocaml-cohttp) |
| PHP | [cURL](https://www.php.net/manual/en/ref.curl.php) |
| PHP | [Http_Request2](https://www.php.net/manual/en/reserved.variables.request.php)|
| PHP | [pecl_http](https://mdref.m6w6.name/http) |
| PowerShell | [RestMethod](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod?view=powershell-7) |
| Python | [http.client](https://docs.python.org/3/library/http.client.html) (Python 3) |
| Python | [Requests](https://requests.readthedocs.io/en/master/)|
| Ruby | [NET::Http](https://docs.ruby-lang.org/en/2.0.0/Net/HTTP.html) |
| Shell | [Httpie](https://github.com/httpie/httpie) |
| Shell | [wget](https://www.gnu.org/software/wget/) |
| Swift | [URLSession](https://developer.apple.com/documentation/foundation/urlsession) |

> If your language isn't currently offered, or if there is a setting that you'd find useful, click **Contribute on GitHub** to contribute to [Postman's open source project](https://github.com/postmanlabs/postman-code-generators).

## Next steps

Learn about [Capturing HTTP requests](/docs/sending-requests/capturing-request-data/capturing-http-requests/) and [Interceptor](/docs/sending-requests/capturing-request-data/interceptor/).
