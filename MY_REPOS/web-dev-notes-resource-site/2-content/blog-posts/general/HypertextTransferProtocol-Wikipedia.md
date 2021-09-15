# Hypertext Transfer Protocol - Wikipedia

> RFC 2616 HTTP/1.1 (1999)
RFC 7540 HTTP/2 (2015)
RFC 7541 Header Compression (2, 2015)
RFC 7230 Message Syntax and Routing (1.1, 2014)
RFC 7231 Semantics and Content (1.1, 2014)
RFC 7232 Conditional Requests (1.1, 2014)
RFC 7233 Range Requests (1.1, 2014)
RFC 7234 Caching (1.1, 2014)

<table><caption>Hypertext Transfer Protocol</caption><tbody><tr><td colspan="2"><a href="chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/File:HTTP_logo.svg"><img alt="HTTP logo.svg" src="chrome-extension://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/220px-HTTP_logo.svg.png" decoding="async" width="220" height="118" srcset="chrome-extension://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/330px-HTTP_logo.svg.png 1.5x, chrome-extension://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/440px-HTTP_logo.svg.png 2x" data-file-width="512" data-file-height="274"></a></td></tr><tr><th scope="row">International standard</th><td><a rel="nofollow" href="https://tools.ietf.org/html/rfc1945">RFC 1945</a> HTTP/1.0 <small>(1996)</small><p><a rel="nofollow" href="https://tools.ietf.org/html/rfc2616">RFC 2616</a> HTTP/1.1 <small>(1999)</small><br><a rel="nofollow" href="https://tools.ietf.org/html/rfc7540">RFC 7540</a> HTTP/2 <small>(2015)</small><br><a rel="nofollow" href="https://tools.ietf.org/html/rfc7541">RFC 7541</a> Header Compression <small>(2, 2015)</small><br><a rel="nofollow" href="https://tools.ietf.org/html/rfc7230">RFC 7230</a> Message Syntax and Routing <small>(1.1, 2014)</small><br><a rel="nofollow" href="https://tools.ietf.org/html/rfc7231">RFC 7231</a> Semantics and Content <small>(1.1, 2014)</small><br><a rel="nofollow" href="https://tools.ietf.org/html/rfc7232">RFC 7232</a> Conditional Requests <small>(1.1, 2014)</small><br><a rel="nofollow" href="https://tools.ietf.org/html/rfc7233">RFC 7233</a> Range Requests <small>(1.1, 2014)</small><br><a rel="nofollow" href="https://tools.ietf.org/html/rfc7234">RFC 7234</a> Caching <small>(1.1, 2014)</small><br></p><a rel="nofollow" href="https://tools.ietf.org/html/rfc7235">RFC 7235</a> Authentication <small>(1.1, 2014)</small></td></tr><tr><th scope="row">Developed by</th><td>initially <a href="chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/CERN" title="CERN">CERN</a>; <a href="chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/IETF" title="IETF">IETF</a>, <a href="chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/W3C" title="W3C">W3C</a></td></tr><tr><th scope="row">Introduced</th><td>1991<span>; 30&nbsp;years ago</span></td></tr></tbody></table>

The **Hypertext Transfer Protocol** (**HTTP**) is an [application layer](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Application_layer "Application layer") protocol for distributed, collaborative, [hypermedia](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Hypermedia "Hypermedia") information systems.[\[1\]](#cite_note-ietf2616-1) HTTP is the foundation of data communication for the [World Wide Web](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/World_Wide_Web "World Wide Web"), where [hypertext](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Hypertext "Hypertext") documents include [hyperlinks](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Hyperlink "Hyperlink") to other resources that the user can easily access, for example by a [mouse](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Computer_mouse "Computer mouse") click or by tapping the screen in a web browser.

Development of HTTP was initiated by [Tim Berners-Lee](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Tim_Berners-Lee "Tim Berners-Lee") at [CERN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/CERN "CERN") in 1989. Development of early HTTP [Requests for Comments](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Requests_for_Comments "Requests for Comments") (RFCs) was a coordinated effort by the [Internet Engineering Task Force](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Internet_Engineering_Task_Force "Internet Engineering Task Force") (IETF) and the [World Wide Web Consortium](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/World_Wide_Web_Consortium "World Wide Web Consortium") (W3C), with work later moving to the IETF.

HTTP/1.1 was first documented in [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2068](https://tools.ietf.org/html/rfc2068) in 1997, and as of 2021, it (plus older versions) is less popular (used by less than 45% of web sites; it's always a backup protocol) for web serving than its successors. That specification was obsoleted by [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2616](https://tools.ietf.org/html/rfc2616) in 1999, which was likewise replaced by the [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7230](https://tools.ietf.org/html/rfc7230) family of RFCs in 2014.

[HTTP/2](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP/2 "HTTP/2") is a more efficient expression of HTTP's semantics "on the wire", and was published in 2015, and is used by over 50% of websites; it is now supported by virtually all web browsers[\[2\]](#cite_note-2) and major web servers over [Transport Layer Security](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Transport_Layer_Security "Transport Layer Security") (TLS) using an [Application-Layer Protocol Negotiation](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Application-Layer_Protocol_Negotiation "Application-Layer Protocol Negotiation") (ALPN) extension[\[3\]](#cite_note-rfc7301-3) where [TLS 1.2](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/TLS_1.2 "TLS 1.2") or newer is required.[\[4\]](#cite_note-4)[\[5\]](#cite_note-5)

[HTTP/3](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP/3 "HTTP/3") is the proposed successor to HTTP/2,[\[6\]](#cite_note-6)[\[7\]](#cite_note-7) which is already in use by over 5.8% of websites; and is used by over 7.5% of desktop computers (enabled by default in latest [macOS](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/MacOS "MacOS")), using [UDP](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/User_Datagram_Protocol "User Datagram Protocol") instead of [TCP](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Transmission_Control_Protocol "Transmission Control Protocol") for the underlying transport protocol. Like HTTP/2, it does not obsolete previous major versions of the protocol. Support for HTTP/3 was added to [Cloudflare](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Cloudflare "Cloudflare") and [Google Chrome](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Google_Chrome "Google Chrome") in September 2019,[\[8\]](#cite_note-8)[\[9\]](#cite_note-9) and can be enabled in the stable versions of Chrome and Firefox.[\[10\]](#cite_note-10)

Technical overview\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=1 "Edit section: Technical overview")\]
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[![](chrome-extension://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Internet1.svg/220px-Internet1.svg.png)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/File:Internet1.svg)

[URL](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/URL "URL") beginning with the HTTP scheme and the [WWW](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/World_Wide_Web "World Wide Web") domain name label

HTTP functions as a [request–response](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Request%E2%80%93response "Request–response") protocol in the client–server computing model. A [web browser](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_browser "Web browser"), for example, may be the _client_ and an application running on a computer [hosting](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Host_(network) "Host (network)") a [website](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Website "Website") may be the _server_. The client submits an HTTP _request_ message to the server. The server, which provides _resources_ such as [HTML](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTML "HTML") files and other content, or performs other functions on behalf of the client, returns a _response_ message to the client. The response contains completion status information about the request and may also contain requested content in its message body.

A web browser is an example of a _[user agent](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/User_agent "User agent")_ (UA). Other types of user agent include the indexing software used by search providers ([web crawlers](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_crawler "Web crawler")), [voice browsers](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Voice_browser "Voice browser"), [mobile apps](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Mobile_app "Mobile app"), and other [software](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Software "Software") that accesses, consumes, or displays web content.

HTTP is designed to permit intermediate network elements to improve or enable communications between clients and servers. High-traffic websites often benefit from [web cache](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_cache "Web cache") servers that deliver content on behalf of [upstream servers](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Upstream_server "Upstream server") to improve response time. Web browsers cache previously accessed web resources and reuse them, when possible, to reduce network traffic. HTTP [proxy servers](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Proxy_server "Proxy server") at [private network](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Private_network "Private network") boundaries can facilitate communication for clients without a globally routable address, by relaying messages with external servers.

HTTP is an [application layer](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Application_layer "Application layer") protocol designed within the framework of the [Internet protocol suite](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Internet_protocol_suite "Internet protocol suite"). Its definition presumes an underlying and reliable [transport layer](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Transport_layer "Transport layer") protocol,[\[11\]](#cite_note-11) and [Transmission Control Protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Transmission_Control_Protocol "Transmission Control Protocol") (TCP) is commonly used. However, HTTP can be adapted to use unreliable protocols such as the [User Datagram Protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/User_Datagram_Protocol "User Datagram Protocol") (UDP), for example in [HTTPU](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTPU "HTTPU") and [Simple Service Discovery Protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Simple_Service_Discovery_Protocol "Simple Service Discovery Protocol") (SSDP).

[HTTP resources](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_resource "Web resource") are identified and located on the network by [Uniform Resource Locators](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Uniform_Resource_Locator "Uniform Resource Locator") (URLs), using the [Uniform Resource Identifiers](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Uniform_Resource_Identifier "Uniform Resource Identifier") (URI's) schemes _http_ and _[https](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Https "Https")_. As defined in [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [3986](https://tools.ietf.org/html/rfc3986), URIs are encoded as [hyperlinks](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Hyperlink "Hyperlink") in [HTML](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTML "HTML") documents, so as to form interlinked [hypertext](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Hypertext "Hypertext") documents.

HTTP/1.1 is a revision of the original HTTP (HTTP/1.0). In HTTP/1.0 a separate [connection](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Connection-oriented_communication "Connection-oriented communication") to the same server is made for every resource request. HTTP/1.1 can reuse a connection multiple times to download images, [scripts](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Client-side_scripting "Client-side scripting"), [stylesheets](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Cascading_Style_Sheets "Cascading Style Sheets"), _etc_ after the page has been delivered. HTTP/1.1 communications therefore experience less [latency](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Latency_(engineering) "Latency (engineering)") as the establishment of TCP connections presents considerable overhead.[\[12\]](#cite_note-12)

History\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=2 "Edit section: History")\]
------------------------------------------------------------------------------------------------------------------------------------------------------------------

[![](chrome-extension://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Tim_Berners-Lee_CP_2.jpg/220px-Tim_Berners-Lee_CP_2.jpg)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/File:Tim_Berners-Lee_CP_2.jpg)

The term [hypertext](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Hypertext "Hypertext") was coined by [Ted Nelson](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Ted_Nelson "Ted Nelson") in 1965 in the [Xanadu Project](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Xanadu_Project "Xanadu Project"), which was in turn inspired by [Vannevar Bush](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Vannevar_Bush "Vannevar Bush")'s 1930s vision of the microfilm-based information retrieval and management "[memex](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Memex "Memex")" system described in his 1945 essay "[As We May Think](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/As_We_May_Think "As We May Think")". [Tim Berners-Lee](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Tim_Berners-Lee "Tim Berners-Lee") and his team at [CERN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/CERN "CERN") are credited with inventing the original HTTP, along with HTML and the associated technology for a web server and a text-based web browser. Berners-Lee first proposed the "WorldWideWeb" project in 1989—now known as the [World Wide Web](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/World_Wide_Web "World Wide Web"). The first version of the protocol had only one method, namely GET, which would request a page from a server.[\[13\]](#cite_note-13) The response from the server was always an HTML page.[\[14\]](#cite_note-14)

The first documented version of HTTP was **[HTTP V0.9](https://www.w3.org/pub/WWW/Protocols/HTTP/AsImplemented.html)** (1991). [Dave Raggett](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Dave_Raggett "Dave Raggett") led the HTTP Working Group (HTTP WG) in 1995 and wanted to expand the protocol with extended operations, extended negotiation, richer meta-information, tied with a security protocol which became more efficient by adding additional methods and [header fields](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/List_of_HTTP_header_fields "List of HTTP header fields").[\[15\]](#cite_note-raggettprofile-15)[\[16\]](#cite_note-16) [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [1945](https://tools.ietf.org/html/rfc1945) officially introduced and recognized HTTP V1.0 in 1996.

The HTTP WG planned to publish new standards in December 1995[\[17\]](#cite_note-17) and the support for pre-standard HTTP/1.1 based on the then developing [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2068](https://tools.ietf.org/html/rfc2068) (called HTTP-NG) was rapidly adopted by the major browser developers in early 1996. End-user adoption of the new browsers was rapid. In March 1996, one web hosting company reported that over 40% of browsers in use on the Internet were HTTP 1.1 compliant. That same web hosting company reported that by June 1996, 65% of all browsers accessing their servers were HTTP/1.1 compliant.[\[18\]](#cite_note-18) The HTTP/1.1 standard as defined in [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2068](https://tools.ietf.org/html/rfc2068) was officially released in January 1997. Improvements and updates to the HTTP/1.1 standard were released under [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2616](https://tools.ietf.org/html/rfc2616) in June 1999.

In 2007, the **[HTTP Working Group](https://httpwg.org/)** was formed, in part, to revise and clarify the HTTP/1.1 specification. In June 2014, the WG released an updated six-part specification obsoleting [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2616](https://tools.ietf.org/html/rfc2616):

*   [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7230](https://tools.ietf.org/html/rfc7230), _HTTP/1.1: Message Syntax and Routing_
*   [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231), _HTTP/1.1: Semantics and Content_
*   [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7232](https://tools.ietf.org/html/rfc7232), _HTTP/1.1: Conditional Requests_
*   [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7233](https://tools.ietf.org/html/rfc7233), _HTTP/1.1: Range Requests_
*   [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7234](https://tools.ietf.org/html/rfc7234), _HTTP/1.1: Caching_
*   [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7235](https://tools.ietf.org/html/rfc7235), _HTTP/1.1: Authentication_

[HTTP/2](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP/2 "HTTP/2") was published as [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7540](https://tools.ietf.org/html/rfc7540) in May 2015.

| Year | HTTP Version |
| --- | --- |
| 1991 | 0.9 |
| 1996 | 1.0 |
| 1997 | 1.1 |
| 2015 | [2.0](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP/2 "HTTP/2") |
| Draft (2020) | [3.0](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP/3 "HTTP/3") |

HTTP session\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=3 "Edit section: HTTP session")\]
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

An HTTP session is a sequence of network request–response transactions. An HTTP client initiates a request by establishing a [Transmission Control Protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Transmission_Control_Protocol "Transmission Control Protocol") (TCP) connection to a particular [port](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/TCP_and_UDP_port "TCP and UDP port") on a server (typically port 80, occasionally port 8080; see [List of TCP and UDP port numbers](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/List_of_TCP_and_UDP_port_numbers "List of TCP and UDP port numbers")). An HTTP server listening on that port waits for a client's request message. Upon receiving the request, the server sends back a status line, such as "HTTP/1.1 200 OK", and a message of its own. The body of this message is typically the requested resource, although an error message or other information may also be returned.[\[1\]](#cite_note-ietf2616-1)

### Persistent connections\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=4 "Edit section: Persistent connections")\]

In HTTP/0.9 and 1.0, the connection is closed after a single request/response pair. In HTTP/1.1 a keep-alive-mechanism was introduced, where a connection could be reused for more than one request. Such _persistent connections_ reduce request [latency](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Latency_(engineering) "Latency (engineering)") perceptibly because the client does not need to re-negotiate the TCP 3-Way-Handshake connection after the first request has been sent. Another positive side effect is that, in general, the connection becomes faster with time due to TCP's [slow-start](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/TCP_congestion_control#Slow_start "TCP congestion control")\-mechanism.

Version 1.1 of the protocol also made bandwidth optimization improvements to HTTP/1.0. For example, HTTP/1.1 introduced [chunked transfer encoding](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Chunked_transfer_encoding "Chunked transfer encoding") to allow content on persistent connections to be streamed rather than buffered. [HTTP pipelining](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_pipelining "HTTP pipelining") further reduces lag time, allowing clients to send multiple requests before waiting for each response. Another addition to the protocol was [byte serving](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Byte_serving "Byte serving"), where a server transmits just the portion of a resource explicitly requested by a client.

### HTTP session state\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=5 "Edit section: HTTP session state")\]

HTTP is a [stateless protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Stateless_protocol "Stateless protocol"). A stateless protocol does not require the [HTTP server](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_server "HTTP server") to retain information or status about each user for the duration of multiple requests. However, some [web applications](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_application "Web application") implement states or [server side sessions](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Session_(computer_science) "Session (computer science)") using for instance [HTTP cookies](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_cookie "HTTP cookie") or hidden [variables](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Variable_(computer_science) "Variable (computer science)") within [web forms](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Form_(web) "Form (web)").

HTTP authentication\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=6 "Edit section: HTTP authentication")\]
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

HTTP provides multiple authentication schemes such as [basic access authentication](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Basic_access_authentication "Basic access authentication") and [digest access authentication](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Digest_access_authentication "Digest access authentication") which operate via a challenge–response mechanism whereby the server identifies and issues a challenge before serving the requested content.

HTTP provides a general framework for access control and authentication, via an extensible set of challenge–response authentication schemes, which can be used by a server to challenge a client request and by a client to provide authentication information.[\[19\]](#cite_note-ietf7235-19)

### Authentication realms\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=7 "Edit section: Authentication realms")\]

The HTTP Authentication specification also provides an arbitrary, implementation-specific construct for further dividing resources common to a given root [URI](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Uniform_Resource_Identifier "Uniform Resource Identifier"). The realm value string, if present, is combined with the canonical root URI to form the protection space component of the challenge. This in effect allows the server to define separate authentication scopes under one root URI.[\[19\]](#cite_note-ietf7235-19)

Message format\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=8 "Edit section: Message format")\]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The client sends **requests** to the server and the server sends **responses**.

### Request message\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=9 "Edit section: Request message")\]

The request message consists of the following:

*   a request line (e.g., _GET /images/logo.png HTTP/1.1_, which requests a resource called `/images/logo.png` from the server)
*   [request header fields](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_request_header_field "HTTP request header field") (e.g., _Accept-Language: en_)
*   an empty line
*   an optional [message body](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_message_body "HTTP message body")

The request line and other header fields must each end with <CR><LF> (that is, a [carriage return](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Carriage_return "Carriage return") character followed by a [line feed](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Line_feed "Line feed") character). The empty line must consist of only <CR><LF> and no other [whitespace](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Whitespace_(computer_science) "Whitespace (computer science)").[\[20\]](#cite_note-ietf2616sec4-20) In the HTTP/1.1 protocol, all header fields except _Host_ are optional.

A request line containing only the path name is accepted by servers to maintain compatibility with HTTP clients before the HTTP/1.0 specification in [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [1945](https://tools.ietf.org/html/rfc1945).[\[21\]](#cite_note-apacheweek_com-http11-21)

#### Request methods\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=10 "Edit section: Request methods")\]

[![](chrome-extension://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Http_request_telnet_ubuntu.png/220px-Http_request_telnet_ubuntu.png)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/File:Http_request_telnet_ubuntu.png)

An HTTP/1.1 request made using telnet. The [request](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_request "HTTP request") message, [response](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_response "HTTP response") header section, and response body are highlighted.

HTTP defines methods (sometimes referred to as _verbs_, but nowhere in the specification does it mention _verb_, nor is OPTIONS or HEAD a verb) to indicate the desired action to be performed on the identified resource. What this resource represents, whether pre-existing data or data that is generated dynamically, depends on the implementation of the server. Often, the resource corresponds to a file or the output of an executable residing on the server. The HTTP/1.0 specification[\[22\]](#cite_note-22) defined the GET, HEAD and POST methods and the HTTP/1.1 specification[\[23\]](#cite_note-23) added five new methods: OPTIONS, PUT, DELETE, TRACE and CONNECT. By being specified in these documents, their semantics are well-known and can be depended on. Any client can use any method and the server can be configured to support any combination of methods. If a method is unknown to an intermediate, it will be treated as an unsafe and [non-idempotent](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Idempotence "Idempotence") method. There is no limit to the number of methods that can be defined and this allows for future methods to be specified without breaking existing infrastructure. For example, [WebDAV](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/WebDAV "WebDAV") defined seven new methods and [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [5789](https://tools.ietf.org/html/rfc5789) specified the [PATCH](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Patch_verb "Patch verb") method.

Method names are case sensitive.[\[24\]](#cite_note-24)[\[25\]](#cite_note-25) This is in contrast to HTTP header field names which are case-insensitive.[\[26\]](#cite_note-26)

GET

The GET method requests a representation of the specified resource. Requests using GET should only [retrieve data](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Data_retrieval "Data retrieval") and should have no other effect. (This is also true of some other HTTP methods.)[\[1\]](#cite_note-ietf2616-1) The [W3C](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/W3C "W3C") has published guidance principles on this distinction, saying, "[Web application](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_application "Web application") design should be informed by the above principles, but also by the relevant limitations."[\[27\]](#cite_note-27) See [safe methods](#Safe_methods) below.

HEAD

The HEAD method asks for a response identical to that of a GET request, but without the response body. This is useful for retrieving meta-information written in response headers, without having to transport the entire content.

POST

The [POST method](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/POST_(HTTP) "POST (HTTP)") requests that the server accept the entity enclosed in the request as a new subordinate of the [web resource](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_resource "Web resource") identified by the URI. The data POSTed might be, for example, an annotation for existing resources; a message for a bulletin board, newsgroup, mailing list, or comment thread; a block of data that is the result of submitting a [web form](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Form_(HTML) "Form (HTML)") to a data-handling process; or an item to add to a database.[\[28\]](#cite_note-28)

PUT

The PUT method requests that the enclosed entity be stored under the supplied [URI](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Uniform_Resource_Identifier "Uniform Resource Identifier"). If the URI refers to an already existing resource, it is modified; if the URI does not point to an existing resource, then the server can create the resource with that URI.[\[29\]](#cite_note-29)

DELETE

The DELETE method deletes the specified resource.

TRACE

The TRACE method echoes the received request so that a client can see what (if any) changes or additions have been made by intermediate servers.

OPTIONS

The OPTIONS method returns the HTTP methods that the server supports for the specified [URL](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/URL "URL"). This can be used to check the functionality of a web server by requesting '\*' instead of a specific resource.

CONNECT

[\[30\]](#cite_note-rfc2616.9.9-30) The CONNECT method converts the request connection to a transparent [TCP/IP tunnel](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Tunneling_protocol "Tunneling protocol"), usually to facilitate [SSL](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Transport_Layer_Security "Transport Layer Security")\-encrypted communication (HTTPS) through an unencrypted [HTTP proxy](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_proxy "HTTP proxy").[\[31\]](#cite_note-31)[\[32\]](#cite_note-32) See [HTTP CONNECT method](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_tunnel#HTTP_CONNECT_method "HTTP tunnel").

PATCH

The PATCH method applies partial modifications to a resource.[\[33\]](#cite_note-33)

All general-purpose HTTP servers are required to implement at least the GET and HEAD methods, and all other methods are considered optional by the specification.[\[34\]](#cite_note-34)

##### Safe methods\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=11 "Edit section: Safe methods")\]

Some of the methods (for example, GET, HEAD, OPTIONS and TRACE) are, by convention, defined as _safe_, which means they are [intended only for information retrieval](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Command%E2%80%93query_separation "Command–query separation") and should not change the state of the server. In other words, they should not have [side effects](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Side_effect_(computer_science) "Side effect (computer science)"), beyond relatively harmless effects such as [logging](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Server_log "Server log"), web caching, the serving of [banner advertisements](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_banner "Web banner") or incrementing a [web counter](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_counter "Web counter"). Making arbitrary GET requests without regard to the context of the application's state should therefore be considered safe. However, this is not mandated by the standard, and it is explicitly acknowledged that it cannot be guaranteed.

By contrast, methods such as POST, PUT, DELETE and PATCH are intended for actions that may cause side effects either on the server, or external side effects such as [financial transactions](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/ECommerce "ECommerce") or transmission of [email](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Email "Email"). Such methods are therefore not usually used by conforming [web robots](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Internet_bot "Internet bot") or web crawlers; some that do not conform tend to make requests without regard to context or consequences.

Despite the prescribed safety of _GET_ requests, in practice their handling by the server is not technically limited in any way. Therefore, careless or deliberate programming can cause non-trivial changes on the server. This is discouraged, because it can cause problems for [web caching](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_caching "Web caching"), [search engines](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Search_engines "Search engines") and other automated agents, which can make unintended changes on the server. For example, a website might allow deletion of a resource through a URL such as _http://example.com/article/1234/delete_, which, if arbitrarily fetched, even using _GET_, would simply delete the article.[\[35\]](#cite_note-oreilly-get-rails-35)

One example of this occurring in practice was during the short-lived [Google Web Accelerator](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Google_Web_Accelerator "Google Web Accelerator") [beta](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Beta_test "Beta test"), which prefetched arbitrary URLs on the page a user was viewing, causing records to be automatically altered or deleted _en masse_. The beta was suspended only weeks after its first release, following widespread criticism.[\[36\]](#cite_note-36)[\[35\]](#cite_note-oreilly-get-rails-35)

##### Idempotent methods and web applications\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=12 "Edit section: Idempotent methods and web applications")\]

Methods PUT and DELETE are defined to be [idempotent](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Idempotent#Computer_science_meaning "Idempotent"), meaning that multiple identical requests should have the same effect as a single request. Methods GET, HEAD, OPTIONS and TRACE, being prescribed as safe, should also be idempotent, as HTTP is a [stateless protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Stateless_protocol "Stateless protocol").[\[1\]](#cite_note-ietf2616-1)

In contrast, the POST method is not necessarily idempotent, and therefore sending an identical POST request multiple times may further affect state or cause further side effects (such as [financial transactions](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Ecommerce "Ecommerce")). In some cases this may be desirable, but in other cases this could be due to an accident, such as when a user does not realize that their action will result in sending another request, or they did not receive adequate feedback that their first request was successful. While [web browsers](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_browser "Web browser") may show [alert dialog boxes](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Alert_dialog_box "Alert dialog box") to warn users in some cases where reloading a page may re-submit a POST request, it is generally up to the web application to handle cases where a POST request should not be submitted more than once.

Note that whether a method is idempotent is not enforced by the protocol or web server. It is perfectly possible to write a web application in which (for example) a database insert or other non-idempotent action is triggered by a GET or other request. Ignoring this recommendation, however, may result in undesirable consequences, if a [user agent](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/User_agent "User agent") assumes that repeating the same request is safe when it is not.

##### Security\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=13 "Edit section: Security")\]

The TRACE method can be used as part of a class of attacks known as [cross-site tracing](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Cross-site_tracing "Cross-site tracing"); for that reason, common security advice is for it to be disabled in the server configuration.[\[37\]](#cite_note-OWASP-XST-37) Microsoft [IIS](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Internet_Information_Services "Internet Information Services") supports a proprietary "TRACK" method, which behaves similarly, and which is likewise recommended to be disabled.[\[37\]](#cite_note-OWASP-XST-37)

Security of HTTP methods
| HTTP method | RFC | Request has Body | Response has Body | Safe | Idempotent | Cacheable |
| --- | --- | --- | --- | --- | --- | --- |
| GET | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231) | Optional | Yes | Yes | Yes | Yes |
| HEAD | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231) | Optional | No | Yes | Yes | Yes |
| POST | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231) | Yes | Yes | No | No | Yes |
| PUT | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231) | Yes | Yes | No | Yes | No |
| DELETE | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231) | Optional | Yes | No | Yes | No |
| CONNECT | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231) | Optional | Yes | No | No | No |
| OPTIONS | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231) | Optional | Yes | Yes | Yes | No |
| TRACE | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7231](https://tools.ietf.org/html/rfc7231) | No | Yes | Yes | Yes | No |
| PATCH | [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [5789](https://tools.ietf.org/html/rfc5789) | Yes | Yes | No | No | No |

### Response message\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=14 "Edit section: Response message")\]

The response message consists of the following:

*   a status line which includes the [status code](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/List_of_HTTP_status_codes "List of HTTP status codes") and reason message (e.g., _HTTP/1.1 200 OK_, which indicates that the client's request succeeded)
*   response header fields (e.g., _Content-Type: text/html_)
*   an empty line
*   an optional [message body](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_message_body "HTTP message body")

The status line and other header fields must all end with <CR><LF>. The empty line must consist of only <CR><LF> and no other [whitespace](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Whitespace_character "Whitespace character").[\[20\]](#cite_note-ietf2616sec4-20) This strict requirement for <CR><LF> is relaxed somewhat within message bodies for consistent use of other system linebreaks such as <CR> or <LF> alone.[\[38\]](#cite_note-38)

#### Status codes\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=15 "Edit section: Status codes")\]

In HTTP/1.0 and since, the first line of the HTTP response is called the _status line_ and includes a numeric _status code_ (such as "[404](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_404 "HTTP 404")") and a textual _reason phrase_ (such as "Not Found"). The way the [user agent](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/User_agent "User agent") handles the response depends primarily on the code, and secondarily on the other [response header fields](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_response_header_field "HTTP response header field"). Custom status codes can be used, for if the user agent encounters a code it does not recognize, it can use the first digit of the code to determine the general class of the response.[\[39\]](#cite_note-39)

The standard _reason phrases_ are only recommendations, and can be replaced with "local equivalents" at the [web developer](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_developer "Web developer")'s discretion. If the status code indicated a problem, the user agent might display the _reason phrase_ to the user to provide further information about the nature of the problem. The standard also allows the user agent to attempt to interpret the _reason phrase_, though this might be unwise since the standard explicitly specifies that status codes are machine-readable and _reason phrases_ are human-readable. HTTP status code is primarily divided into five groups for better explanation of request and responses between client and server as named:

*   Informational `1XX`
*   Successful `2XX`
*   Redirection `3XX`
*   Client Error `4XX`
*   Server Error `5XX`

Encrypted connections\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=16 "Edit section: Encrypted connections")\]
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The most popular way of establishing an encrypted HTTP connection is [HTTPS](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTPS "HTTPS").[\[40\]](#cite_note-40) Two other methods for establishing an encrypted HTTP connection also exist: [Secure Hypertext Transfer Protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Secure_Hypertext_Transfer_Protocol "Secure Hypertext Transfer Protocol"), and using the [HTTP/1.1 Upgrade header](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP/1.1_Upgrade_header "HTTP/1.1 Upgrade header") to specify an upgrade to TLS. Browser support for these two is, however, nearly non-existent.[\[41\]](#cite_note-41)[\[42\]](#cite_note-42)[\[43\]](#cite_note-43)

Example session\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=17 "Edit section: Example session")\]
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Below is a sample conversation between an HTTP client and an HTTP server running on [www.example.com](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Example.com "Example.com"), port 80.

### Client request\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=18 "Edit section: Client request")\]

GET / HTTP/1.1
Host: www.example.com

A client request (consisting in this case of the request line and only one header field) is followed by a blank line, so that the request ends with a double newline, each in the form of a [carriage return](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Carriage_return "Carriage return") followed by a [line feed](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Line_feed "Line feed"). The "Host" field distinguishes between various [DNS](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Domain_Name_System "Domain Name System") names sharing a single [IP address](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/IP_address "IP address"), allowing name-based [virtual hosting](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Virtual_hosting "Virtual hosting"). While optional in HTTP/1.0, it is mandatory in HTTP/1.1. (The "/" means /index.html if there is one.)

### Server response\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=19 "Edit section: Server response")\]

HTTP/1.1 200 OK
Date: Mon, 23 May 2005 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 155
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

<html\>
  <head\>
    <title\>An Example Page</title\>
  </head\>
  <body\>
    <p\>Hello World, this is a very simple HTML document.</p\>
  </body\>
</html\>

The [ETag](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_ETag "HTTP ETag") (entity tag) header field is used to determine if a cached version of the requested resource is identical to the current version of the resource on the server. _Content-Type_ specifies the [Internet media type](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Internet_media_type "Internet media type") of the data conveyed by the HTTP message, while _Content-Length_ indicates its length in bytes. The HTTP/1.1 [webserver](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Webserver "Webserver") publishes its ability to respond to requests for certain byte ranges of the document by setting the field _Accept-Ranges: bytes_. This is useful, if the client needs to have only certain portions[\[44\]](#cite_note-44) of a resource sent by the server, which is called [byte serving](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Byte_serving "Byte serving"). When _Connection: close_ is sent, it means that the [web server](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_server "Web server") will close the [TCP](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Transmission_Control_Protocol "Transmission Control Protocol") connection immediately after the transfer of this response.

Most of the header lines are optional. When _Content-Length_ is missing the length is determined in other ways. Chunked transfer encoding uses a chunk size of 0 to mark the end of the content. _Identity_ encoding without _Content-Length_ reads content until the socket is closed.

A _Content-Encoding_ like _[gzip](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Gzip "Gzip")_ can be used to compress the transmitted data.

Similar protocols\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=20 "Edit section: Similar protocols")\]
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*   The [Gopher protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Gopher_(protocol) "Gopher (protocol)") is a content delivery protocol that was displaced by HTTP in the early 1990s.
*   The [SPDY](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/SPDY "SPDY") protocol is an alternative to HTTP developed at [Google](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Google "Google"), superseded by [HTTP/2](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP/2 "HTTP/2").

See also\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=21 "Edit section: See also")\]
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

*   [Comparison of file transfer protocols](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Comparison_of_file_transfer_protocols "Comparison of file transfer protocols")
*   [Constrained Application Protocol](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Constrained_Application_Protocol "Constrained Application Protocol") – a semantically similar protocol to HTTP but used UDP or UDP-like messages targeted for devices with limited processing capability; re-uses HTTP and other internet concepts like [Internet media type](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Internet_media_type "Internet media type") and web linking (RFC 5988)[\[45\]](#cite_note-45)
*   [Content negotiation](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Content_negotiation "Content negotiation")
*   [Digest access authentication](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Digest_access_authentication "Digest access authentication")
*   [HTTP compression](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP_compression "HTTP compression")
*   [HTTP/2](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/HTTP/2 "HTTP/2") – developed by the IETF's Hypertext Transfer Protocol (httpbis) working group[\[46\]](#cite_note-46)
*   HTTP-MPLEX – A backwards compatible enhancement to HTTP to improve page and web object retrieval time in congested networks proposed by Robert Mattson
*   [List of HTTP header fields](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/List_of_HTTP_header_fields "List of HTTP header fields")
*   [List of HTTP status codes](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/List_of_HTTP_status_codes "List of HTTP status codes")
*   [Representational state transfer](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Representational_state_transfer "Representational state transfer") (REST)
*   [Variant object](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Variant_object "Variant object")
*   [Web cache](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Web_cache "Web cache")
*   [WebSocket](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/WebSocket "WebSocket")

References\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=22 "Edit section: References")\]
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1.  ^ [Jump up to: _**a**_](#cite_ref-ietf2616_1-0) [_**b**_](#cite_ref-ietf2616_1-1) [_**c**_](#cite_ref-ietf2616_1-2) [_**d**_](#cite_ref-ietf2616_1-3) Fielding, Roy T.; Gettys, James; Mogul, Jeffrey C.; Nielsen, Henrik Frystyk; Masinter, Larry; Leach, Paul J.; Berners-Lee, Tim (June 1999). [_Hypertext Transfer Protocol – HTTP/1.1_](https://tools.ietf.org/html/rfc2616). [IETF](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Internet_Engineering_Task_Force "Internet Engineering Task Force"). [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2616](https://tools.ietf.org/html/rfc2616).
2.  **[^](#cite_ref-2 "Jump up")** ["Can I use... Support tables for HTML5, CSS3, etc"](https://caniuse.com/#search=http2). _caniuse.com_. Retrieved 2020-06-02.
3.  **[^](#cite_ref-rfc7301_3-0 "Jump up")** ["Transport Layer Security (TLS) Application-Layer Protocol Negotiation Extension"](https://tools.ietf.org/html/rfc7301). IETF. July 2014. [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7301](chrome-extension://tools.ietf.org/html/rfc7301).
4.  **[^](#cite_ref-4 "Jump up")** Belshe, M.; Peon, R.; Thomson, M. ["Hypertext Transfer Protocol Version 2, Use of TLS Features"](https://http2.github.io/http2-spec/#TLSUsage). Retrieved 2015-02-10.
5.  **[^](#cite_ref-5 "Jump up")** Benjamin, David. ["Using TLS 1.3 with HTTP/2"](https://tools.ietf.org/html/rfc8740.html). _tools.ietf.org_. Retrieved 2020-06-02. This lowers the barrier for deploying TLS 1.3, a major security improvement over TLS 1.2.
6.  **[^](#cite_ref-6 "Jump up")** Bishop, Mike (July 9, 2019). ["Hypertext Transfer Protocol Version 3 (HTTP/3)"](https://tools.ietf.org/html/draft-ietf-quic-http-22). _tools.ietf.org_. draft-ietf-quic-http-22. Retrieved 2019-08-16.
7.  **[^](#cite_ref-7 "Jump up")** Cimpanu, Catalin. ["HTTP-over-QUIC to be renamed HTTP/3 | ZDNet"](https://www.zdnet.com/article/http-over-quic-to-be-renamed-http3/). _ZDNet_. Retrieved 2018-11-19.
8.  **[^](#cite_ref-8 "Jump up")** Cimpanu, Catalin (26 September 2019). ["Cloudflare, Google Chrome, and Firefox add HTTP/3 support"](https://www.zdnet.com/article/cloudflare-google-chrome-and-firefox-add-http3-support/). _ZDNet_. Retrieved 27 September 2019.
9.  **[^](#cite_ref-9 "Jump up")** ["HTTP/3: the past, the present, and the future"](https://blog.cloudflare.com/http3-the-past-present-and-future/). _The Cloudflare Blog_. 2019-09-26. Retrieved 2019-10-30.
10.  **[^](#cite_ref-10 "Jump up")** ["Firefox Nightly supports HTTP 3 - General - Cloudflare Community"](https://community.cloudflare.com/t/firefox-nightly-supports-http-3/127778). 2019-11-19. Retrieved 2020-01-23.
11.  **[^](#cite_ref-11 "Jump up")** ["Overall Operation"](https://tools.ietf.org/html/rfc2616#section-1.4). [_RFC 2616_](https://tools.ietf.org/html/rfc2616). p. 12. sec. 1.4. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC 2616](#IETF_RFC_2616).
12.  **[^](#cite_ref-12 "Jump up")** ["Classic HTTP Documents"](https://www.w3.org/Protocols/Classic.html). W3.org. 1998-05-14. Retrieved 2010-08-01.
13.  **[^](#cite_ref-13 "Jump up")** Berners-Lee, Tim. ["HyperText Transfer Protocol"](https://www.w3.org/History/19921103-hypertext/hypertext/WWW/Protocols/HTTP.html). [World Wide Web Consortium](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/World_Wide_Web_Consortium "World Wide Web Consortium"). Retrieved 31 August 2010.
14.  **[^](#cite_ref-14 "Jump up")** [Tim Berners-Lee](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Tim_Berners-Lee "Tim Berners-Lee"). ["The Original HTTP as defined in 1991"](https://www.w3.org/Protocols/HTTP/AsImplemented.html). World Wide Web Consortium. Retrieved 24 July 2010.
15.  **[^](#cite_ref-raggettprofile_15-0 "Jump up")** Raggett, Dave. ["Dave Raggett's Bio"](https://www.w3.org/People/Raggett/profile.html). World Wide Web Consortium. Retrieved 11 June 2010.
16.  **[^](#cite_ref-16 "Jump up")** Raggett, Dave; Berners-Lee, Tim. ["Hypertext Transfer Protocol Working Group"](https://www.w3.org/Arena/webworld/httpwgcharter.html). World Wide Web Consortium. Retrieved 29 September 2010.
17.  **[^](#cite_ref-17 "Jump up")** Raggett, Dave. ["HTTP WG Plans"](https://www.w3.org/Arena/webworld/httpwgplans.html). World Wide Web Consortium. Retrieved 29 September 2010.
18.  **[^](#cite_ref-18 "Jump up")** ["HTTP/1.1"](http://webarchive.loc.gov/all/20011121001051/https://www.webcom.com/glossary/http1.1.shtml). _Webcom.com Glossary entry_. Archived from [the original](https://www.webcom.com/glossary/http1.1.shtml) on 2001-11-21. Retrieved 2009-05-29.
19.  ^ [Jump up to: _**a**_](#cite_ref-ietf7235_19-0) [_**b**_](#cite_ref-ietf7235_19-1) Fielding, Roy T.; Reschke, Julian F. (June 2014). [_Hypertext Transfer Protocol (HTTP/1.1): Authentication_](https://tools.ietf.org/html/rfc7235). IETF. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC7235](https://doi.org/10.17487%2FRFC7235). [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [7235](https://tools.ietf.org/html/rfc7235).
20.  ^ [Jump up to: _**a**_](#cite_ref-ietf2616sec4_20-0) [_**b**_](#cite_ref-ietf2616sec4_20-1) ["HTTP Message"](https://tools.ietf.org/html/rfc2616#section-4). [_RFC 2616_](https://tools.ietf.org/html/rfc2616). p. 31. sec. 4. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC 2616](#IETF_RFC_2616).
21.  **[^](#cite_ref-apacheweek_com-http11_21-0 "Jump up")** ["Apache Week. HTTP/1.1"](http://www.apacheweek.com/features/http11). 090502 apacheweek.com
22.  **[^](#cite_ref-22 "Jump up")** Berners-Lee, Tim; Fielding, Roy T.; Nielsen, Henrik Frystyk. ["Method Definitions"](https://tools.ietf.org/html/rfc1945#section-8). [_Hypertext Transfer Protocol – HTTP/1.0_](https://tools.ietf.org/html/rfc1945). IETF. pp. 30–32. sec. 8. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC1945](https://doi.org/10.17487%2FRFC1945). [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [1945](https://tools.ietf.org/html/rfc1945).
23.  **[^](#cite_ref-23 "Jump up")** ["Method Definitions"](https://tools.ietf.org/html/rfc2616#section-9). [_RFC 2616_](https://tools.ietf.org/html/rfc2616). pp. 51–57. sec. 9. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC 2616](#IETF_RFC_2616).
24.  **[^](#cite_ref-24 "Jump up")** ["RFC-7210 section 3.1.1"](https://tools.ietf.org/html/rfc7230#section-3.1.1). Tools.ietf.org. Retrieved 2019-06-26.
25.  **[^](#cite_ref-25 "Jump up")** ["RFC-7231 section 4.1"](https://tools.ietf.org/html/rfc7231#section-4.1). Tools.ietf.org. Retrieved 2019-06-26.
26.  **[^](#cite_ref-26 "Jump up")** ["RFC-7230 section 3.2"](https://tools.ietf.org/html/rfc7230#section-3.2). Tools.ietf.org. Retrieved 2019-06-26.
27.  **[^](#cite_ref-27 "Jump up")** Jacobs, Ian (2004). ["URIs, Addressability, and the use of HTTP GET and POST"](https://www.w3.org/2001/tag/doc/whenToUseGet.html#checklist). _Technical Architecture Group finding_. W3C. Retrieved 26 September 2010.
28.  **[^](#cite_ref-28 "Jump up")** ["POST"](https://tools.ietf.org/html/rfc2616#section-9.5). [_RFC 2616_](https://tools.ietf.org/html/rfc2616). p. 54. sec. 9.5. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC 2616](#IETF_RFC_2616).
29.  **[^](#cite_ref-29 "Jump up")** ["PUT"](https://tools.ietf.org/html/rfc2616#section-9.6). [_RFC 2616_](https://tools.ietf.org/html/rfc2616). p. 55. sec. 9.6. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC 2616](#IETF_RFC_2616).
30.  **[^](#cite_ref-rfc2616.9.9_30-0 "Jump up")** ["CONNECT"](https://tools.ietf.org/html/rfc2616#section-9.9). [_Hypertext Transfer Protocol – HTTP/1.1_](https://tools.ietf.org/html/rfc2616). IETF. June 1999. p. 57. sec. 9.9. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2616](https://tools.ietf.org/html/rfc2616). Retrieved 23 February 2014.
31.  **[^](#cite_ref-31 "Jump up")** Khare, Rohit; Lawrence, Scott (May 2000). [_Upgrading to TLS Within HTTP/1.1_](https://tools.ietf.org/html/rfc2817). IETF. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2817](https://doi.org/10.17487%2FRFC2817). [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [2817](https://tools.ietf.org/html/rfc2817).
32.  **[^](#cite_ref-32 "Jump up")** ["Vulnerability Note VU#150227: HTTP proxy default configurations allow arbitrary TCP connections"](https://www.kb.cert.org/vuls/id/150227). [US-CERT](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/CERT_Coordination_Center "CERT Coordination Center"). 2002-05-17. Retrieved 2007-05-10.
33.  **[^](#cite_ref-33 "Jump up")** Dusseault, Lisa; Snell, James M. (March 2010). [_PATCH Method for HTTP_](https://tools.ietf.org/html/rfc5789). IETF. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC5789](https://doi.org/10.17487%2FRFC5789). [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [5789](https://tools.ietf.org/html/rfc5789).
34.  **[^](#cite_ref-34 "Jump up")** ["Method"](https://tools.ietf.org/html/rfc2616#section-5.1.1). [_RFC 2616_](https://tools.ietf.org/html/rfc2616). p. 36. sec. 5.1.1. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC 2616](#IETF_RFC_2616).
35.  ^ [Jump up to: _**a**_](#cite_ref-oreilly-get-rails_35-0) [_**b**_](#cite_ref-oreilly-get-rails_35-1) Ediger, Brad (2007-12-21). [_Advanced Rails: Building Industrial-Strength Web Apps in Record Time_](https://shop.oreilly.com/product/9780596510329.do). O'Reilly Media, Inc. p. 188. [ISBN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/ISBN_(identifier) "ISBN (identifier)") [978-0596519728](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Special:BookSources/978-0596519728 "Special:BookSources/978-0596519728"). A common mistake is to use GET for an action that updates a resource. \[...\] This problem came into the Rails public eye in 2005, when the Google Web Accelerator was released.
36.  **[^](#cite_ref-36 "Jump up")** Cantrell, Christian (2005-06-01). ["What Have We Learned From the Google Web Accelerator?"](https://web.archive.org/web/20170819161233/http://blogs.adobe.com/cantrell/archives/2005/06/what_have_we_le.html). _Adobe Blogs_. Adobe. Archived from [the original](https://blogs.adobe.com/cantrell/archives/2005/06/what_have_we_le.html) on 2017-08-19. Retrieved 2018-11-19.
37.  ^ [Jump up to: _**a**_](#cite_ref-OWASP-XST_37-0) [_**b**_](#cite_ref-OWASP-XST_37-1) ["Cross Site Tracing"](https://www.owasp.org/index.php/Cross_Site_Tracing). [OWASP](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/OWASP "OWASP"). Retrieved 2016-06-22.
38.  **[^](#cite_ref-38 "Jump up")** ["Canonicalization and Text Defaults"](https://tools.ietf.org/html/rfc2616#section-3.7.1). [_RFC 2616_](https://tools.ietf.org/html/rfc2616). sec. 3.7.1. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC 2616](#IETF_RFC_2616).
39.  **[^](#cite_ref-39 "Jump up")** ["Status-Line"](https://tools.ietf.org/html/rfc2616#section-6.1). [_RFC 2616_](https://tools.ietf.org/html/rfc2616). p. 39. sec. 6.1. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC2616](https://doi.org/10.17487%2FRFC2616). [RFC 2616](#IETF_RFC_2616).
40.  **[^](#cite_ref-40 "Jump up")** Canavan, John (2001). _Fundamentals of Networking Security_. Norwood, MA: Artech House. pp. 82–83. [ISBN](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/ISBN_(identifier) "ISBN (identifier)") [9781580531764](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Special:BookSources/9781580531764 "Special:BookSources/9781580531764").
41.  **[^](#cite_ref-41 "Jump up")** Zalewski, Michal. ["Browser Security Handbook"](https://code.google.com/p/browsersec/wiki/Part1#True_URL_schemes). Retrieved 30 April 2015.
42.  **[^](#cite_ref-42 "Jump up")** ["Chromium Issue 4527: implement RFC 2817: Upgrading to TLS Within HTTP/1.1"](https://code.google.com/p/chromium/issues/detail?id=4527). Retrieved 30 April 2015.
43.  **[^](#cite_ref-43 "Jump up")** ["Mozilla Bug 276813 – \[RFE\] Support RFC 2817 / TLS Upgrade for HTTP 1.1"](https://bugzilla.mozilla.org/show_bug.cgi?id=276813). Retrieved 30 April 2015.
44.  **[^](#cite_ref-44 "Jump up")** Luotonen, Ari; Franks, John (February 22, 1996). [_Byte Range Retrieval Extension to HTTP_](https://tools.ietf.org/html/draft-ietf-http-range-retrieval-00). IETF. I-D draft-ietf-http-range-retrieval-00.
45.  **[^](#cite_ref-45 "Jump up")** Nottingham, Mark (October 2010). [_Web Linking_](https://tools.ietf.org/html/rfc5988). IETF. [doi](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/Doi_(identifier) "Doi (identifier)"):[10.17487/RFC5988](https://doi.org/10.17487%2FRFC5988). [RFC](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/wiki/RFC_(identifier) "RFC (identifier)") [5988](https://tools.ietf.org/html/rfc5988).
46.  **[^](#cite_ref-46 "Jump up")** ["Hypertext Transfer Protocol Bis (httpbis) – Charter"](https://datatracker.ietf.org/wg/httpbis/charter/). IETF. 2012.

External links\[[edit](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/w/index.php?title=Hypertext_Transfer_Protocol&action=edit&section=23 "Edit section: External links")\]
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*   ["Change History for HTTP"](https://www.w3.org/Protocols/History.html). W3.org. Retrieved 2010-08-01. A detailed technical history of HTTP.
*   ["Design Issues for HTTP"](https://www.w3.org/Protocols/DesignIssues.html). W3.org. Retrieved 2010-08-01. Design Issues by Berners-Lee when he was designing the protocol.
*   [HTTP 0.9 – As Implemented in 1991](https://www.w3.org/Protocols/HTTP/AsImplemented.html)


[Source](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)