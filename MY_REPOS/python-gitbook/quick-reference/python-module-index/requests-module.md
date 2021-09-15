# Requests Module



**Requests** is an elegant and simple HTTP library for Python, built for human beings.

**Behold, the power of Requests**:

```text
>>> r = requests.get('https://api.github.com/user', auth=('user', 'pass'))
>>> r.status_code
200
>>> r.headers['content-type']
'application/json; charset=utf8'
>>> r.encoding
'utf-8'
>>> r.text
'{"type":"User"...'
>>> r.json()
{'private_gists': 419, 'total_private_repos': 77, ...}
```

See [similar code, sans Requests](https://gist.github.com/973705).

**Requests** allows you to send HTTP/1.1 requests extremely easily. There’s no need to manually add query strings to your URLs, or to form-encode your POST data. Keep-alive and HTTP connection pooling are 100% automatic, thanks to [urllib3](https://github.com/urllib3/urllib3).

### Beloved Features

Requests is ready for today’s web.

* Keep-Alive & Connection Pooling
* International Domains and URLs
* Sessions with Cookie Persistence
* Browser-style SSL Verification
* Automatic Content Decoding
* Basic/Digest Authentication
* Elegant Key/Value Cookies
* Automatic Decompression
* Unicode Response Bodies
* HTTP\(S\) Proxy Support
* Multipart File Uploads
* Streaming Downloads
* Connection Timeouts
* Chunked Requests
* `.netrc` Support

Requests officially supports Python 2.7 & 3.6+, and runs great on PyPy.

### The User Guide

This part of the documentation, which is mostly prose, begins with some background information about Requests, then focuses on step-by-step instructions for getting the most out of Requests.

* [Installation of Requests](https://docs.python-requests.org/en/master/user/install/)
  * [$ python -m pip install requests](https://docs.python-requests.org/en/master/user/install/#python-m-pip-install-requests)
  * [Get the Source Code](https://docs.python-requests.org/en/master/user/install/#get-the-source-code)
* [Quickstart](https://docs.python-requests.org/en/master/user/quickstart/)
  * [Make a Request](https://docs.python-requests.org/en/master/user/quickstart/#make-a-request)
  * [Passing Parameters In URLs](https://docs.python-requests.org/en/master/user/quickstart/#passing-parameters-in-urls)
  * [Response Content](https://docs.python-requests.org/en/master/user/quickstart/#response-content)
  * [Binary Response Content](https://docs.python-requests.org/en/master/user/quickstart/#binary-response-content)
  * [JSON Response Content](https://docs.python-requests.org/en/master/user/quickstart/#json-response-content)
  * [Raw Response Content](https://docs.python-requests.org/en/master/user/quickstart/#raw-response-content)
  * [Custom Headers](https://docs.python-requests.org/en/master/user/quickstart/#custom-headers)
  * [More complicated POST requests](https://docs.python-requests.org/en/master/user/quickstart/#more-complicated-post-requests)
  * [POST a Multipart-Encoded File](https://docs.python-requests.org/en/master/user/quickstart/#post-a-multipart-encoded-file)
  * [Response Status Codes](https://docs.python-requests.org/en/master/user/quickstart/#response-status-codes)
  * [Response Headers](https://docs.python-requests.org/en/master/user/quickstart/#response-headers)
  * [Cookies](https://docs.python-requests.org/en/master/user/quickstart/#cookies)
  * [Redirection and History](https://docs.python-requests.org/en/master/user/quickstart/#redirection-and-history)
  * [Timeouts](https://docs.python-requests.org/en/master/user/quickstart/#timeouts)
  * [Errors and Exceptions](https://docs.python-requests.org/en/master/user/quickstart/#errors-and-exceptions)
* [Advanced Usage](https://docs.python-requests.org/en/master/user/advanced/)
  * [Session Objects](https://docs.python-requests.org/en/master/user/advanced/#session-objects)
  * [Request and Response Objects](https://docs.python-requests.org/en/master/user/advanced/#request-and-response-objects)
  * [Prepared Requests](https://docs.python-requests.org/en/master/user/advanced/#prepared-requests)
  * [SSL Cert Verification](https://docs.python-requests.org/en/master/user/advanced/#ssl-cert-verification)
  * [Client Side Certificates](https://docs.python-requests.org/en/master/user/advanced/#client-side-certificates)
  * [CA Certificates](https://docs.python-requests.org/en/master/user/advanced/#ca-certificates)
  * [Body Content Workflow](https://docs.python-requests.org/en/master/user/advanced/#body-content-workflow)
  * [Keep-Alive](https://docs.python-requests.org/en/master/user/advanced/#keep-alive)
  * [Streaming Uploads](https://docs.python-requests.org/en/master/user/advanced/#streaming-uploads)
  * [Chunk-Encoded Requests](https://docs.python-requests.org/en/master/user/advanced/#chunk-encoded-requests)
  * [POST Multiple Multipart-Encoded Files](https://docs.python-requests.org/en/master/user/advanced/#post-multiple-multipart-encoded-files)
  * [Event Hooks](https://docs.python-requests.org/en/master/user/advanced/#event-hooks)
  * [Custom Authentication](https://docs.python-requests.org/en/master/user/advanced/#custom-authentication)
  * [Streaming Requests](https://docs.python-requests.org/en/master/user/advanced/#streaming-requests)
  * [Proxies](https://docs.python-requests.org/en/master/user/advanced/#proxies)
  * [Compliance](https://docs.python-requests.org/en/master/user/advanced/#compliance)
  * [HTTP Verbs](https://docs.python-requests.org/en/master/user/advanced/#http-verbs)
  * [Custom Verbs](https://docs.python-requests.org/en/master/user/advanced/#custom-verbs)
  * [Link Headers](https://docs.python-requests.org/en/master/user/advanced/#link-headers)
  * [Transport Adapters](https://docs.python-requests.org/en/master/user/advanced/#transport-adapters)
  * [Blocking Or Non-Blocking?](https://docs.python-requests.org/en/master/user/advanced/#blocking-or-non-blocking)
  * [Header Ordering](https://docs.python-requests.org/en/master/user/advanced/#header-ordering)
  * [Timeouts](https://docs.python-requests.org/en/master/user/advanced/#timeouts)
* [Authentication](https://docs.python-requests.org/en/master/user/authentication/)
  * [Basic Authentication](https://docs.python-requests.org/en/master/user/authentication/#basic-authentication)
  * [Digest Authentication](https://docs.python-requests.org/en/master/user/authentication/#digest-authentication)
  * [OAuth 1 Authentication](https://docs.python-requests.org/en/master/user/authentication/#oauth-1-authentication)
  * [OAuth 2 and OpenID Connect Authentication](https://docs.python-requests.org/en/master/user/authentication/#oauth-2-and-openid-connect-authentication)
  * [Other Authentication](https://docs.python-requests.org/en/master/user/authentication/#other-authentication)
  * [New Forms of Authentication](https://docs.python-requests.org/en/master/user/authentication/#new-forms-of-authentication)

### The Community Guide

This part of the documentation, which is mostly prose, details the Requests ecosystem and community.

* [Recommended Packages and Extensions](https://docs.python-requests.org/en/master/community/recommended/)
  * [Certifi CA Bundle](https://docs.python-requests.org/en/master/community/recommended/#certifi-ca-bundle)
  * [CacheControl](https://docs.python-requests.org/en/master/community/recommended/#cachecontrol)
  * [Requests-Toolbelt](https://docs.python-requests.org/en/master/community/recommended/#requests-toolbelt)
  * [Requests-Threads](https://docs.python-requests.org/en/master/community/recommended/#requests-threads)
  * [Requests-OAuthlib](https://docs.python-requests.org/en/master/community/recommended/#requests-oauthlib)
  * [Betamax](https://docs.python-requests.org/en/master/community/recommended/#betamax)
* [Frequently Asked Questions](https://docs.python-requests.org/en/master/community/faq/)
  * [Encoded Data?](https://docs.python-requests.org/en/master/community/faq/#encoded-data)
  * [Custom User-Agents?](https://docs.python-requests.org/en/master/community/faq/#custom-user-agents)
  * [Why not Httplib2?](https://docs.python-requests.org/en/master/community/faq/#why-not-httplib2)
  * [Python 3 Support?](https://docs.python-requests.org/en/master/community/faq/#python-3-support)
  * [Python 2 Support?](https://docs.python-requests.org/en/master/community/faq/#python-2-support)
  * [What are “hostname doesn’t match” errors?](https://docs.python-requests.org/en/master/community/faq/#what-are-hostname-doesn-t-match-errors)
* [Integrations](https://docs.python-requests.org/en/master/community/out-there/)
  * [Python for iOS](https://docs.python-requests.org/en/master/community/out-there/#python-for-ios)
* [Articles & Talks](https://docs.python-requests.org/en/master/community/out-there/#articles-talks)
* [Support](https://docs.python-requests.org/en/master/community/support/)
  * [Stack Overflow](https://docs.python-requests.org/en/master/community/support/#stack-overflow)
  * [File an Issue](https://docs.python-requests.org/en/master/community/support/#file-an-issue)
  * [Send a Tweet](https://docs.python-requests.org/en/master/community/support/#send-a-tweet)
* [Vulnerability Disclosure](https://docs.python-requests.org/en/master/community/vulnerabilities/)
  * [Process](https://docs.python-requests.org/en/master/community/vulnerabilities/#process)
  * [Previous CVEs](https://docs.python-requests.org/en/master/community/vulnerabilities/#previous-cves)
* [Release Process and Rules](https://docs.python-requests.org/en/master/community/release-process/)
  * [Major Releases](https://docs.python-requests.org/en/master/community/release-process/#major-releases)
  * [Minor Releases](https://docs.python-requests.org/en/master/community/release-process/#minor-releases)
  * [Hotfix Releases](https://docs.python-requests.org/en/master/community/release-process/#hotfix-releases)
  * [Reasoning](https://docs.python-requests.org/en/master/community/release-process/#reasoning)
* [Community Updates](https://docs.python-requests.org/en/master/community/updates/)
* [Release History](https://docs.python-requests.org/en/master/community/updates/#release-history)

### The API Documentation / Guide

If you are looking for information on a specific function, class, or method, this part of the documentation is for you.

* [Developer Interface](https://docs.python-requests.org/en/master/api/)
  * [Main Interface](https://docs.python-requests.org/en/master/api/#main-interface)
  * [Exceptions](https://docs.python-requests.org/en/master/api/#exceptions)
  * [Request Sessions](https://docs.python-requests.org/en/master/api/#request-sessions)
  * [Lower-Level Classes](https://docs.python-requests.org/en/master/api/#lower-level-classes)
  * [Lower-Lower-Level Classes](https://docs.python-requests.org/en/master/api/#lower-lower-level-classes)
  * [Authentication](https://docs.python-requests.org/en/master/api/#authentication)
  * [Encodings](https://docs.python-requests.org/en/master/api/#encodings)
  * [Cookies](https://docs.python-requests.org/en/master/api/#cookies)
  * [Status Code Lookup](https://docs.python-requests.org/en/master/api/#status-code-lookup)
  * [Migrating to 1.x](https://docs.python-requests.org/en/master/api/#migrating-to-1-x)
  * [Migrating to 2.x](https://docs.python-requests.org/en/master/api/#migrating-to-2-x)





### Main Interface

All of Requests’ functionality can be accessed by these 7 methods. They all return an instance of the [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.`requests.request`\(_method_, _url_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/api/#request)

Constructs and sends a [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request).

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>method</b> &#x2013; method for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object: <code>GET</code>, <code>OPTIONS</code>, <code>HEAD</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>,
            or <code>DELETE</code>.</li>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>params</b> &#x2013; (optional) Dictionary, list of tuples or bytes to
            send in the query string for the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>data</b> &#x2013; (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>json</b> &#x2013; (optional) A JSON serializable Python object to send
            in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>headers</b> &#x2013; (optional) Dictionary of HTTP Headers to send with
            the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>cookies</b> &#x2013; (optional) Dict or CookieJar object to send with
            the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>files</b> &#x2013; (optional) Dictionary of <code>&apos;name&apos;: file-like-objects</code> (or <code>{&apos;name&apos;: file-tuple}</code>)
            for multipart encoding upload. <code>file-tuple</code> can be a 2-tuple <code>(&apos;filename&apos;, fileobj)</code>,
            3-tuple <code>(&apos;filename&apos;, fileobj, &apos;content_type&apos;)</code> or
            a 4-tuple <code>(&apos;filename&apos;, fileobj, &apos;content_type&apos;, custom_headers)</code>,
            where <code>&apos;content-type&apos;</code> is a string defining the content
            type of the given file and <code>custom_headers</code> a dict-like object
            containing additional headers to add for the file.</li>
          <li><b>auth</b> &#x2013; (optional) Auth tuple to enable Basic/Digest/Custom
            HTTP Auth.</li>
          <li><b>timeout</b> (<a href="https://docs.python.org/3/library/functions.html#float"><em>float</em></a><em> or </em>
            <a
            href="https://docs.python.org/3/library/stdtypes.html#tuple"><em>tuple</em>
              </a>) &#x2013; (optional) How many seconds to wait for the server to send
              data before giving up, as a float, or a <a href="https://docs.python-requests.org/en/master/user/advanced/#timeouts">(connect timeout, read timeout)</a> tuple.</li>
          <li><b>allow_redirects</b> (<a href="https://docs.python.org/3/library/functions.html#bool"><em>bool</em></a>)
            &#x2013; (optional) Boolean. Enable/disable GET/OPTIONS/POST/PUT/PATCH/DELETE/HEAD
            redirection. Defaults to <code>True</code>.</li>
          <li><b>proxies</b> &#x2013; (optional) Dictionary mapping protocol to the URL
            of the proxy.</li>
          <li><b>verify</b> &#x2013; (optional) Either a boolean, in which case it controls
            whether we verify the server&#x2019;s TLS certificate, or a string, in
            which case it must be a path to a CA bundle to use. Defaults to <code>True</code>.</li>
          <li><b>stream</b> &#x2013; (optional) if <code>False</code>, the response content
            will be immediately downloaded.</li>
          <li><b>cert</b> &#x2013; (optional) if String, path to ssl client cert file
            (.pem). If Tuple, (&#x2018;cert&#x2019;, &#x2018;key&#x2019;) pair.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Returns:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response"><code>Response</code></a> object</td>
    </tr>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

Usage:

```text
>>> import requests
>>> req = requests.request('GET', 'https://httpbin.org/get')
>>> req
<Response [200]>
```

`requests.head`\(_url_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/api/#head)

Sends a HEAD request.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.
            If allow_redirects is not provided, it will be set to False (as opposed
            to the default <a href="https://docs.python-requests.org/en/master/api/#requests.request"><code>request</code></a> behavior).</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Returns:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response"><code>Response</code></a> object</td>
    </tr>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`requests.get`\(_url_, _params=None_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/api/#get)

Sends a GET request.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>params</b> &#x2013; (optional) Dictionary, list of tuples or bytes to
            send in the query string for the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Returns:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response"><code>Response</code></a> object</td>
    </tr>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`requests.post`\(_url_, _data=None_, _json=None_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/api/#post)

Sends a POST request.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>data</b> &#x2013; (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>json</b> &#x2013; (optional) json data to send in the body of the
            <a
            href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code>
              </a>.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Returns:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response"><code>Response</code></a> object</td>
    </tr>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`requests.put`\(_url_, _data=None_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/api/#put)

Sends a PUT request.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>data</b> &#x2013; (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>json</b> &#x2013; (optional) json data to send in the body of the
            <a
            href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code>
              </a>.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Returns:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response"><code>Response</code></a> object</td>
    </tr>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`requests.patch`\(_url_, _data=None_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/api/#patch)

Sends a PATCH request.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>data</b> &#x2013; (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>json</b> &#x2013; (optional) json data to send in the body of the
            <a
            href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code>
              </a>.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Returns:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response"><code>Response</code></a> object</td>
    </tr>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`requests.delete`\(_url_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/api/#delete)

Sends a DELETE request.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Returns:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response"><code>Response</code></a> object</td>
    </tr>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

### Exceptions

_exception_ `requests.RequestException`\(_\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/exceptions/#RequestException)

There was an ambiguous exception that occurred while handling your request._exception_ `requests.ConnectionError`\(_\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/exceptions/#ConnectionError)

A Connection error occurred._exception_ `requests.HTTPError`\(_\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/exceptions/#HTTPError)

An HTTP error occurred._exception_ `requests.URLRequired`\(_\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/exceptions/#URLRequired)

A valid URL is required to make a request._exception_ `requests.TooManyRedirects`\(_\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/exceptions/#TooManyRedirects)

Too many redirects._exception_ `requests.ConnectTimeout`\(_\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/exceptions/#ConnectTimeout)

The request timed out while trying to connect to the remote server.

Requests that produced this error are safe to retry._exception_ `requests.ReadTimeout`\(_\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/exceptions/#ReadTimeout)

The server did not send any data in the allotted amount of time._exception_ `requests.Timeout`\(_\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/exceptions/#Timeout)

The request timed out.

Catching this error will catch both `ConnectTimeout` and `ReadTimeout` errors.

### Request Sessions

_class_ `requests.Session`[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session)

A Requests session.

Provides cookie persistence, connection-pooling, and configuration.

Basic Usage:

```text
>>> import requests
>>> s = requests.Session()
>>> s.get('https://httpbin.org/get')
<Response [200]>
```

Or as a context manager:

```text
>>> with requests.Session() as s:
...     s.get('https://httpbin.org/get')
<Response [200]>
```

`auth` _= None_

Default Authentication tuple or object to attach to [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request).`cert` _= None_

SSL client certificate default, if String, path to ssl client cert file \(.pem\). If Tuple, \(‘cert’, ‘key’\) pair.`close`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.close)

Closes all adapters and as such the session`cookies` _= None_

A CookieJar containing all currently outstanding cookies set on this session. By default it is a [`RequestsCookieJar`](https://docs.python-requests.org/en/master/api/#requests.cookies.RequestsCookieJar), but may be any other `cookielib.CookieJar` compatible object.`delete`\(_url_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.delete)

Sends a DELETE request. Returns [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`get`\(_url_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.get)

Sends a GET request. Returns [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`get_adapter`\(_url_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.get_adapter)

Returns the appropriate connection adapter for the given URL.

| Return type: | [requests.adapters.BaseAdapter](https://docs.python-requests.org/en/master/api/#requests.adapters.BaseAdapter) |
| :--- | :--- |


`get_redirect_target`\(_resp_\)

Receives a Response. Returns a redirect URI or `Nonehead`\(_url_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.head)

Sends a HEAD request. Returns [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`headers` _= None_

A case-insensitive dictionary of headers to be sent on each [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request) sent from this [`Session`](https://docs.python-requests.org/en/master/api/#requests.Session).`hooks` _= None_

Event-handling hooks.`max_redirects` _= None_

Maximum number of redirects allowed. If the request exceeds this limit, a [`TooManyRedirects`](https://docs.python-requests.org/en/master/api/#requests.TooManyRedirects) exception is raised. This defaults to requests.models.DEFAULT\_REDIRECT\_LIMIT, which is 30.`merge_environment_settings`\(_url_, _proxies_, _stream_, _verify_, _cert_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.merge_environment_settings)

Check the environment and merge it with some settings.

| Return type: | [dict](https://docs.python.org/3/library/stdtypes.html#dict) |
| :--- | :--- |


`mount`\(_prefix_, _adapter_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.mount)

Registers a connection adapter to a prefix.

Adapters are sorted in descending order by prefix length.`options`\(_url_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.options)

Sends a OPTIONS request. Returns [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`params` _= None_

Dictionary of querystring data to attach to each [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request). The dictionary values may be lists for representing multivalued query parameters.`patch`\(_url_, _data=None_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.patch)

Sends a PATCH request. Returns [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>data</b> &#x2013; (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`post`\(_url_, _data=None_, _json=None_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.post)

Sends a POST request. Returns [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>data</b> &#x2013; (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>json</b> &#x2013; (optional) json to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`prepare_request`\(_request_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.prepare_request)

Constructs a [`PreparedRequest`](https://docs.python-requests.org/en/master/api/#requests.PreparedRequest) for transmission and returns it. The [`PreparedRequest`](https://docs.python-requests.org/en/master/api/#requests.PreparedRequest) has settings merged from the [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request) instance and those of the [`Session`](https://docs.python-requests.org/en/master/api/#requests.Session).

| Parameters: | **request** – [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request) instance to prepare with this session’s settings. |
| :--- | :--- |
| Return type: | [requests.PreparedRequest](https://docs.python-requests.org/en/master/api/#requests.PreparedRequest) |

`proxies` _= None_

Dictionary mapping protocol or protocol and host to the URL of the proxy \(e.g. {‘http’: ‘foo.bar:3128’, ‘http://host.name’: ‘foo.bar:4012’}\) to be used on each [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request).`put`\(_url_, _data=None_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.put)

Sends a PUT request. Returns [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>data</b> &#x2013; (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>**kwargs</b> &#x2013; Optional arguments that <code>request</code> takes.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`rebuild_auth`\(_prepared\_request_, _response_\)

When being redirected we may want to strip authentication from the request to avoid leaking credentials. This method intelligently removes and reapplies authentication where possible to avoid credential loss.`rebuild_method`\(_prepared\_request_, _response_\)

When being redirected we may want to change the method of the request based on certain specs or browser behavior.`rebuild_proxies`\(_prepared\_request_, _proxies_\)

This method re-evaluates the proxy configuration by considering the environment variables. If we are redirected to a URL covered by NO\_PROXY, we strip the proxy configuration. Otherwise, we set missing proxy keys for this URL \(in case they were stripped by a previous redirect\).

This method also replaces the Proxy-Authorization header where necessary.

| Return type: | [dict](https://docs.python.org/3/library/stdtypes.html#dict) |
| :--- | :--- |


`request`\(_method_, _url_, _params=None_, _data=None_, _headers=None_, _cookies=None_, _files=None_, _auth=None_, _timeout=None_, _allow\_redirects=True_, _proxies=None_, _hooks=None_, _stream=None_, _verify=None_, _cert=None_, _json=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.request)

Constructs a [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request), prepares it and sends it. Returns [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>method</b> &#x2013; method for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>url</b> &#x2013; URL for the new <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a> object.</li>
          <li><b>params</b> &#x2013; (optional) Dictionary or bytes to be sent in the
            query string for the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>data</b> &#x2013; (optional) Dictionary, list of tuples, bytes, or file-like
            object to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>json</b> &#x2013; (optional) json to send in the body of the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>headers</b> &#x2013; (optional) Dictionary of HTTP Headers to send with
            the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>cookies</b> &#x2013; (optional) Dict or CookieJar object to send with
            the <a href="https://docs.python-requests.org/en/master/api/#requests.Request"><code>Request</code></a>.</li>
          <li><b>files</b> &#x2013; (optional) Dictionary of <code>&apos;filename&apos;: file-like-objects</code> for
            multipart encoding upload.</li>
          <li><b>auth</b> &#x2013; (optional) Auth tuple or callable to enable Basic/Digest/Custom
            HTTP Auth.</li>
          <li><b>timeout</b> (<a href="https://docs.python.org/3/library/functions.html#float"><em>float</em></a><em> or </em>
            <a
            href="https://docs.python.org/3/library/stdtypes.html#tuple"><em>tuple</em>
              </a>) &#x2013; (optional) How long to wait for the server to send data before
              giving up, as a float, or a <a href="https://docs.python-requests.org/en/master/user/advanced/#timeouts">(connect timeout, read timeout)</a> tuple.</li>
          <li><b>allow_redirects</b> (<a href="https://docs.python.org/3/library/functions.html#bool"><em>bool</em></a>)
            &#x2013; (optional) Set to True by default.</li>
          <li><b>proxies</b> &#x2013; (optional) Dictionary mapping protocol or protocol
            and hostname to the URL of the proxy.</li>
          <li><b>stream</b> &#x2013; (optional) whether to immediately download the response
            content. Defaults to <code>False</code>.</li>
          <li><b>verify</b> &#x2013; (optional) Either a boolean, in which case it controls
            whether we verify the server&#x2019;s TLS certificate, or a string, in
            which case it must be a path to a CA bundle to use. Defaults to <code>True</code>.
            When set to <code>False</code>, requests will accept any TLS certificate
            presented by the server, and will ignore hostname mismatches and/or expired
            certificates, which will make your application vulnerable to man-in-the-middle
            (MitM) attacks. Setting verify to <code>False</code> may be useful during
            local development or testing.</li>
          <li><b>cert</b> &#x2013; (optional) if String, path to ssl client cert file
            (.pem). If Tuple, (&#x2018;cert&#x2019;, &#x2018;key&#x2019;) pair.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`resolve_redirects`\(_resp_, _req_, _stream=False_, _timeout=None_, _verify=True_, _cert=None_, _proxies=None_, _yield\_requests=False_, _\*\*adapter\_kwargs_\)

Receives a Response. Returns a generator of Responses or Requests.`send`\(_request_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/sessions/#Session.send)

Send a given PreparedRequest.

| Return type: | [requests.Response](https://docs.python-requests.org/en/master/api/#requests.Response) |
| :--- | :--- |


`should_strip_auth`\(_old\_url_, _new\_url_\)

Decide whether Authorization header should be removed when redirecting`stream` _= None_

Stream response content default.`trust_env` _= None_

Trust environment settings for proxy configuration, default authentication and similar.`verify` _= None_

SSL Verification default. Defaults to True, requiring requests to verify the TLS certificate at the remote end. If verify is set to False, requests will accept any TLS certificate presented by the server, and will ignore hostname mismatches and/or expired certificates, which will make your application vulnerable to man-in-the-middle \(MitM\) attacks. Only set this to False for testing.

### Lower-Level Classes

_class_ `requests.Request`\(_method=None_, _url=None_, _headers=None_, _files=None_, _data=None_, _params=None_, _auth=None_, _cookies=None_, _hooks=None_, _json=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#Request)

A user-created [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request) object.

Used to prepare a [`PreparedRequest`](https://docs.python-requests.org/en/master/api/#requests.PreparedRequest), which is sent to the server.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>method</b> &#x2013; HTTP method to use.</li>
          <li><b>url</b> &#x2013; URL to send.</li>
          <li><b>headers</b> &#x2013; dictionary of headers to send.</li>
          <li><b>files</b> &#x2013; dictionary of {filename: fileobject} files to multipart
            upload.</li>
          <li><b>data</b> &#x2013; the body to attach to the request. If a dictionary
            or list of tuples <code>[(key, value)]</code> is provided, form-encoding
            will take place.</li>
          <li><b>json</b> &#x2013; json for the body to attach to the request (if files
            or data is not specified).</li>
          <li><b>params</b> &#x2013; URL parameters to append to the URL. If a dictionary
            or list of tuples <code>[(key, value)]</code> is provided, form-encoding
            will take place.</li>
          <li><b>auth</b> &#x2013; Auth handler or (user, pass) tuple.</li>
          <li><b>cookies</b> &#x2013; dictionary or CookieJar of cookies to attach to
            this request.</li>
          <li><b>hooks</b> &#x2013; dictionary of callback hooks, for internal usage.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

Usage:

```text
>>> import requests
>>> req = requests.Request('GET', 'https://httpbin.org/get')
>>> req.prepare()
<PreparedRequest [GET]>
```

`deregister_hook`\(_event_, _hook_\)

Deregister a previously registered hook. Returns True if the hook existed, False if not.`prepare`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#Request.prepare)

Constructs a [`PreparedRequest`](https://docs.python-requests.org/en/master/api/#requests.PreparedRequest) for transmission and returns it.`register_hook`\(_event_, _hook_\)

Properly register a hook._class_ `requests.Response`[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#Response)

The [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object, which contains a server’s response to an HTTP request.`apparent_encoding`

The apparent encoding, provided by the charset\_normalizer or chardet libraries.`close`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#Response.close)

Releases the connection back to the pool. Once this method has been called the underlying `raw` object must not be accessed again.

_Note: Should not normally need to be called explicitly._`content`

Content of the response, in bytes.`cookies` _= None_

A CookieJar of Cookies the server sent back.`elapsed` _= None_

The amount of time elapsed between sending the request and the arrival of the response \(as a timedelta\). This property specifically measures the time taken between sending the first byte of the request and finishing parsing the headers. It is therefore unaffected by consuming the response content or the value of the `stream` keyword argument.`encoding` _= None_

Encoding to decode with when accessing r.text.`headers` _= None_

Case-insensitive Dictionary of Response Headers. For example, `headers['content-encoding']` will return the value of a `'Content-Encoding'` response header.`history` _= None_

A list of [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) objects from the history of the Request. Any redirect responses will end up here. The list is sorted from the oldest to the most recent request.`is_permanent_redirect`

True if this Response one of the permanent versions of redirect.`is_redirect`

True if this Response is a well-formed HTTP redirect that could have been processed automatically \(by [`Session.resolve_redirects`](https://docs.python-requests.org/en/master/api/#requests.Session.resolve_redirects)\).`iter_content`\(_chunk\_size=1_, _decode\_unicode=False_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#Response.iter_content)

Iterates over the response data. When stream=True is set on the request, this avoids reading the content at once into memory for large responses. The chunk size is the number of bytes it should read into memory. This is not necessarily the length of each item returned as decoding can take place.

chunk\_size must be of type int or None. A value of None will function differently depending on the value of stream. stream=True will read data as it arrives in whatever size the chunks are received. If stream=False, data is returned as a single chunk.

If decode\_unicode is True, content will be decoded using the best available encoding based on the response.`iter_lines`\(_chunk\_size=512_, _decode\_unicode=False_, _delimiter=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#Response.iter_lines)

Iterates over the response data, one line at a time. When stream=True is set on the request, this avoids reading the content at once into memory for large responses.

Note

This method is not reentrant safe.`json`\(_\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#Response.json)

Returns the json-encoded content of a response, if any.

| Parameters: | **\*\*kwargs** – Optional arguments that `json.loads` takes. |
| :--- | :--- |
| Raises: | **requests.exceptions.JSONDecodeError** – If the response body does not contain valid json. |

`links`

Returns the parsed header links of the response, if any.`next`

Returns a PreparedRequest for the next request in a redirect chain, if there is one.`ok`

Returns True if [`status_code`](https://docs.python-requests.org/en/master/api/#requests.Response.status_code) is less than 400, False if not.

This attribute checks if the status code of the response is between 400 and 600 to see if there was a client error or a server error. If the status code is between 200 and 400, this will return True. This is **not** a check to see if the response code is `200 OK`.`raise_for_status`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#Response.raise_for_status)

Raises [`HTTPError`](https://docs.python-requests.org/en/master/api/#requests.HTTPError), if one occurred.`raw` _= None_

File-like object representation of response \(for advanced usage\). Use of `raw` requires that `stream=True` be set on the request. This requirement does not apply for use internally to Requests.`reason` _= None_

Textual reason of responded HTTP Status, e.g. “Not Found” or “OK”.`request` _= None_

The [`PreparedRequest`](https://docs.python-requests.org/en/master/api/#requests.PreparedRequest) object to which this is a response.`status_code` _= None_

Integer Code of responded HTTP Status, e.g. 404 or 200.`text`

Content of the response, in unicode.

If Response.encoding is None, encoding will be guessed using `charset_normalizer` or `chardet`.

The encoding of the response content is determined based solely on HTTP headers, following RFC 2616 to the letter. If you can take advantage of non-HTTP knowledge to make a better guess at the encoding, you should set `r.encoding` appropriately before accessing this property.`url` _= None_

Final URL location of Response.

### Lower-Lower-Level Classes

_class_ `requests.PreparedRequest`[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest)

The fully mutable [`PreparedRequest`](https://docs.python-requests.org/en/master/api/#requests.PreparedRequest) object, containing the exact bytes that will be sent to the server.

Instances are generated from a [`Request`](https://docs.python-requests.org/en/master/api/#requests.Request) object, and should not be instantiated manually; doing so may produce undesirable effects.

Usage:

```text
>>> import requests
>>> req = requests.Request('GET', 'https://httpbin.org/get')
>>> r = req.prepare()
>>> r
<PreparedRequest [GET]>

>>> s = requests.Session()
>>> s.send(r)
<Response [200]>
```

`body` _= None_

request body to send to the server.`deregister_hook`\(_event_, _hook_\)

Deregister a previously registered hook. Returns True if the hook existed, False if not.`headers` _= None_

dictionary of HTTP headers.`hooks` _= None_

dictionary of callback hooks, for internal usage.`method` _= None_

HTTP verb to send to the server.`path_url`

Build the path URL to use.`prepare`\(_method=None_, _url=None_, _headers=None_, _files=None_, _data=None_, _params=None_, _auth=None_, _cookies=None_, _hooks=None_, _json=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare)

Prepares the entire request with the given parameters.`prepare_auth`\(_auth_, _url=''_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare_auth)

Prepares the given HTTP auth data.`prepare_body`\(_data_, _files_, _json=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare_body)

Prepares the given HTTP body data.`prepare_content_length`\(_body_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare_content_length)

Prepare Content-Length header based on request method and body`prepare_cookies`\(_cookies_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare_cookies)

Prepares the given HTTP cookie data.

This function eventually generates a `Cookie` header from the given cookies using cookielib. Due to cookielib’s design, the header will not be regenerated if it already exists, meaning this function can only be called once for the life of the [`PreparedRequest`](https://docs.python-requests.org/en/master/api/#requests.PreparedRequest) object. Any subsequent calls to `prepare_cookies` will have no actual effect, unless the “Cookie” header is removed beforehand.`prepare_headers`\(_headers_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare_headers)

Prepares the given HTTP headers.`prepare_hooks`\(_hooks_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare_hooks)

Prepares the given hooks.`prepare_method`\(_method_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare_method)

Prepares the given HTTP method.`prepare_url`\(_url_, _params_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/models/#PreparedRequest.prepare_url)

Prepares the given HTTP URL.`register_hook`\(_event_, _hook_\)

Properly register a hook.`url` _= None_

HTTP URL to send the request to._class_ `requests.adapters.BaseAdapter`[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#BaseAdapter)

The Base Transport Adapter`close`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#BaseAdapter.close)

Cleans up adapter specific items.`send`\(_request_, _stream=False_, _timeout=None_, _verify=True_, _cert=None_, _proxies=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#BaseAdapter.send)

Sends PreparedRequest object. Returns Response object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>request</b> &#x2013; The <code>PreparedRequest</code> being sent.</li>
          <li><b>stream</b> &#x2013; (optional) Whether to stream the request content.</li>
          <li><b>timeout</b> (<a href="https://docs.python.org/3/library/functions.html#float"><em>float</em></a><em> or </em>
            <a
            href="https://docs.python.org/3/library/stdtypes.html#tuple"><em>tuple</em>
              </a>) &#x2013; (optional) How long to wait for the server to send data before
              giving up, as a float, or a <a href="https://docs.python-requests.org/en/master/user/advanced/#timeouts">(connect timeout, read timeout)</a> tuple.</li>
          <li><b>verify</b> &#x2013; (optional) Either a boolean, in which case it controls
            whether we verify the server&#x2019;s TLS certificate, or a string, in
            which case it must be a path to a CA bundle to use</li>
          <li><b>cert</b> &#x2013; (optional) Any user-provided SSL certificate to be
            trusted.</li>
          <li><b>proxies</b> &#x2013; (optional) The proxies dictionary to apply to the
            request.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

_class_ `requests.adapters.HTTPAdapter`\(_pool\_connections=10_, _pool\_maxsize=10_, _max\_retries=0_, _pool\_block=False_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter)

The built-in HTTP Adapter for urllib3.

Provides a general-case interface for Requests sessions to contact HTTP and HTTPS urls by implementing the Transport Adapter interface. This class will usually be created by the `Session` class under the covers.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>pool_connections</b> &#x2013; The number of urllib3 connection pools
            to cache.</li>
          <li><b>pool_maxsize</b> &#x2013; The maximum number of connections to save
            in the pool.</li>
          <li><b>max_retries</b> &#x2013; The maximum number of retries each connection
            should attempt. Note, this applies only to failed DNS lookups, socket connections
            and connection timeouts, never to requests where data has made it to the
            server. By default, Requests does not retry failed connections. If you
            need granular control over the conditions under which we retry a request,
            import urllib3&#x2019;s <code>Retry</code> class and pass that instead.</li>
          <li><b>pool_block</b> &#x2013; Whether the connection pool should block for
            connections.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

Usage:

```text
>>> import requests
>>> s = requests.Session()
>>> a = requests.adapters.HTTPAdapter(max_retries=3)
>>> s.mount('http://', a)
```

`add_headers`\(_request_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.add_headers)

Add any headers needed by the connection. As of v2.0 this does nothing by default, but is left for overriding by users that subclass the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter).

This should not be called from user code, and is only exposed for use when subclassing the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter).

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>request</b> &#x2013; The <code>PreparedRequest</code> to add headers to.</li>
          <li><b>kwargs</b> &#x2013; The keyword arguments from the call to send().</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

`build_response`\(_req_, _resp_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.build_response)

Builds a [`Response`](https://docs.python-requests.org/en/master/api/#requests.Response) object from a urllib3 response. This should not be called from user code, and is only exposed for use when subclassing the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter)

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>req</b> &#x2013; The <code>PreparedRequest</code> used to generate the
            response.</li>
          <li><b>resp</b> &#x2013; The urllib3 response object.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

`cert_verify`\(_conn_, _url_, _verify_, _cert_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.cert_verify)

Verify a SSL certificate. This method should not be called from user code, and is only exposed for use when subclassing the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter).

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>conn</b> &#x2013; The urllib3 connection object associated with the
            cert.</li>
          <li><b>url</b> &#x2013; The requested URL.</li>
          <li><b>verify</b> &#x2013; Either a boolean, in which case it controls whether
            we verify the server&#x2019;s TLS certificate, or a string, in which case
            it must be a path to a CA bundle to use</li>
          <li><b>cert</b> &#x2013; The SSL certificate to verify.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

`close`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.close)

Disposes of any internal state.

Currently, this closes the PoolManager and any active ProxyManager, which closes any pooled connections.`get_connection`\(_url_, _proxies=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.get_connection)

Returns a urllib3 connection for the given URL. This should not be called from user code, and is only exposed for use when subclassing the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter).

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>url</b> &#x2013; The URL to connect to.</li>
          <li><b>proxies</b> &#x2013; (optional) A Requests-style dictionary of proxies
            used on this request.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left">urllib3.ConnectionPool</td>
    </tr>
  </tbody>
</table>

`init_poolmanager`\(_connections_, _maxsize_, _block=False_, _\*\*pool\_kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.init_poolmanager)

Initializes a urllib3 PoolManager.

This method should not be called from user code, and is only exposed for use when subclassing the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter).

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>connections</b> &#x2013; The number of urllib3 connection pools to cache.</li>
          <li><b>maxsize</b> &#x2013; The maximum number of connections to save in the
            pool.</li>
          <li><b>block</b> &#x2013; Block when no free connections are available.</li>
          <li><b>pool_kwargs</b> &#x2013; Extra keyword arguments used to initialize
            the Pool Manager.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

`proxy_headers`\(_proxy_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.proxy_headers)

Returns a dictionary of the headers to add to any request sent through a proxy. This works with urllib3 magic to ensure that they are correctly sent to the proxy, rather than in a tunnelled request if CONNECT is being used.

This should not be called from user code, and is only exposed for use when subclassing the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter).

| Parameters: | **proxy** – The url of the proxy being used for this request. |
| :--- | :--- |
| Return type: | [dict](https://docs.python.org/3/library/stdtypes.html#dict) |

`proxy_manager_for`\(_proxy_, _\*\*proxy\_kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.proxy_manager_for)

Return urllib3 ProxyManager for the given proxy.

This method should not be called from user code, and is only exposed for use when subclassing the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter).

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>proxy</b> &#x2013; The proxy to return a urllib3 ProxyManager for.</li>
          <li><b>proxy_kwargs</b> &#x2013; Extra keyword arguments used to configure
            the Proxy Manager.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Returns:</td>
      <td style="text-align:left">ProxyManager</td>
    </tr>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://urllib3.readthedocs.io/en/latest/reference/urllib3.poolmanager.html#urllib3.ProxyManager">urllib3.ProxyManager</a>
      </td>
    </tr>
  </tbody>
</table>

`request_url`\(_request_, _proxies_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.request_url)

Obtain the url to use when making the final request.

If the message is being sent through a HTTP proxy, the full URL has to be used. Otherwise, we should only use the path portion of the URL.

This should not be called from user code, and is only exposed for use when subclassing the [`HTTPAdapter`](https://docs.python-requests.org/en/master/api/#requests.adapters.HTTPAdapter).

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>request</b> &#x2013; The <code>PreparedRequest</code> being sent.</li>
          <li><b>proxies</b> &#x2013; A dictionary of schemes or schemes and hosts to
            proxy URLs.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python.org/3/library/stdtypes.html#str">str</a>
      </td>
    </tr>
  </tbody>
</table>

`send`\(_request_, _stream=False_, _timeout=None_, _verify=True_, _cert=None_, _proxies=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/adapters/#HTTPAdapter.send)

Sends PreparedRequest object. Returns Response object.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>request</b> &#x2013; The <code>PreparedRequest</code> being sent.</li>
          <li><b>stream</b> &#x2013; (optional) Whether to stream the request content.</li>
          <li><b>timeout</b> (<a href="https://docs.python.org/3/library/functions.html#float"><em>float</em></a><em> or </em>
            <a
            href="https://docs.python.org/3/library/stdtypes.html#tuple"><em>tuple</em>
              </a><em> or urllib3 Timeout object</em>) &#x2013; (optional) How long to wait
              for the server to send data before giving up, as a float, or a <a href="https://docs.python-requests.org/en/master/user/advanced/#timeouts">(connect timeout, read timeout)</a> tuple.</li>
          <li><b>verify</b> &#x2013; (optional) Either a boolean, in which case it controls
            whether we verify the server&#x2019;s TLS certificate, or a string, in
            which case it must be a path to a CA bundle to use</li>
          <li><b>cert</b> &#x2013; (optional) Any user-provided SSL certificate to be
            trusted.</li>
          <li><b>proxies</b> &#x2013; (optional) The proxies dictionary to apply to the
            request.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left"><a href="https://docs.python-requests.org/en/master/api/#requests.Response">requests.Response</a>
      </td>
    </tr>
  </tbody>
</table>

### Authentication

_class_ `requests.auth.AuthBase`[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/auth/#AuthBase)

Base class that all auth implementations derive from_class_ `requests.auth.HTTPBasicAuth`\(_username_, _password_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/auth/#HTTPBasicAuth)

Attaches HTTP Basic Authentication to the given Request object._class_ `requests.auth.HTTPProxyAuth`\(_username_, _password_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/auth/#HTTPProxyAuth)

Attaches HTTP Proxy Authentication to a given Request object._class_ `requests.auth.HTTPDigestAuth`\(_username_, _password_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/auth/#HTTPDigestAuth)

Attaches HTTP Digest Authentication to the given Request object.

### Encodings

`requests.utils.get_encodings_from_content`\(_content_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/utils/#get_encodings_from_content)

Returns encodings from given content string.

| Parameters: | **content** – bytestring to extract encodings from. |
| :--- | :--- |


`requests.utils.get_encoding_from_headers`\(_headers_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/utils/#get_encoding_from_headers)

Returns encodings from given HTTP Header Dict.

| Parameters: | **headers** – dictionary to extract encoding from. |
| :--- | :--- |
| Return type: | [str](https://docs.python.org/3/library/stdtypes.html#str) |

`requests.utils.get_unicode_from_response`\(_r_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/utils/#get_unicode_from_response)

Returns the requested content back in unicode.

| Parameters: | **r** – Response object to get unicode content from. |
| :--- | :--- |


Tried:

1. charset from content-type
2. fall back and replace all unicode characters

| Return type: | [str](https://docs.python.org/3/library/stdtypes.html#str) |
| :--- | :--- |


### Cookies

`requests.utils.dict_from_cookiejar`\(_cj_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/utils/#dict_from_cookiejar)

Returns a key/value dictionary from a CookieJar.

| Parameters: | **cj** – CookieJar object to extract cookies from. |
| :--- | :--- |
| Return type: | [dict](https://docs.python.org/3/library/stdtypes.html#dict) |

`requests.utils.add_dict_to_cookiejar`\(_cj_, _cookie\_dict_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/utils/#add_dict_to_cookiejar)

Returns a CookieJar from a key/value dictionary.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>cj</b> &#x2013; CookieJar to insert cookies into.</li>
          <li><b>cookie_dict</b> &#x2013; Dict of key/values to insert into CookieJar.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left">CookieJar</td>
    </tr>
  </tbody>
</table>

`requests.cookies.cookiejar_from_dict`\(_cookie\_dict_, _cookiejar=None_, _overwrite=True_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#cookiejar_from_dict)

Returns a CookieJar from a key/value dictionary.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Parameters:</th>
      <th style="text-align:left">
        <ul>
          <li><b>cookie_dict</b> &#x2013; Dict of key/values to insert into CookieJar.</li>
          <li><b>cookiejar</b> &#x2013; (optional) A cookiejar to add the cookies to.</li>
          <li><b>overwrite</b> &#x2013; (optional) If False, will not replace cookies
            already in the jar with new ones.</li>
        </ul>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Return type:</td>
      <td style="text-align:left">CookieJar</td>
    </tr>
  </tbody>
</table>

_class_ `requests.cookies.RequestsCookieJar`\(_policy=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar)

Compatibility class; is a cookielib.CookieJar, but exposes a dict interface.

This is the CookieJar we create by default for requests and sessions that don’t specify one, since some clients may expect response.cookies and session.cookies to support dict operations.

Requests does not use the dict interface internally; it’s just for compatibility with external client code. All requests code should work out of the box with externally provided instances of `CookieJar`, e.g. `LWPCookieJar` and `FileCookieJar`.

Unlike a regular CookieJar, this class is pickleable.

Warning

dictionary operations that are normally O\(1\) may be O\(n\).`add_cookie_header`\(_request_\)

Add correct Cookie: header to request \(urllib2.Request object\).

The Cookie2 header is also added unless policy.hide\_cookie2 is true.`clear`\(_domain=None_, _path=None_, _name=None_\)

Clear some cookies.

Invoking this method without arguments will clear all cookies. If given a single argument, only cookies belonging to that domain will be removed. If given two arguments, cookies belonging to the specified path within that domain are removed. If given three arguments, then the cookie with the specified name, path and domain is removed.

Raises KeyError if no matching cookie exists.`clear_expired_cookies`\(\)

Discard all expired cookies.

You probably don’t need to call this method: expired cookies are never sent back to the server \(provided you’re using DefaultCookiePolicy\), this method is called by CookieJar itself every so often, and the .save\(\) method won’t save expired cookies anyway \(unless you ask otherwise by passing a true ignore\_expires argument\).`clear_session_cookies`\(\)

Discard all session cookies.

Note that the .save\(\) method won’t save session cookies anyway, unless you ask otherwise by passing a true ignore\_discard argument.`copy`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.copy)

Return a copy of this RequestsCookieJar.`extract_cookies`\(_response_, _request_\)

Extract cookies from response, where allowable given the request.`get`\(_name_, _default=None_, _domain=None_, _path=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.get)

Dict-like get\(\) that also supports optional domain and path args in order to resolve naming collisions from using one cookie jar over multiple domains.

Warning

operation is O\(n\), not O\(1\).`get_dict`\(_domain=None_, _path=None_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.get_dict)

Takes as an argument an optional domain and path and returns a plain old Python dict of name-value pairs of cookies that meet the requirements.

| Return type: | [dict](https://docs.python.org/3/library/stdtypes.html#dict) |
| :--- | :--- |


`get_policy`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.get_policy)

Return the CookiePolicy instance used.`items`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.items)

Dict-like items\(\) that returns a list of name-value tuples from the jar. Allows client-code to call `dict(RequestsCookieJar)` and get a vanilla python dict of key value pairs.

See also

keys\(\) and values\(\).`iteritems`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.iteritems)

Dict-like iteritems\(\) that returns an iterator of name-value tuples from the jar.

See also

iterkeys\(\) and itervalues\(\).`iterkeys`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.iterkeys)

Dict-like iterkeys\(\) that returns an iterator of names of cookies from the jar.

See also

itervalues\(\) and iteritems\(\).`itervalues`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.itervalues)

Dict-like itervalues\(\) that returns an iterator of values of cookies from the jar.

See also

iterkeys\(\) and iteritems\(\).`keys`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.keys)

Dict-like keys\(\) that returns a list of names of cookies from the jar.

See also

values\(\) and items\(\).`list_domains`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.list_domains)

Utility method to list all the domains in the jar.`list_paths`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.list_paths)

Utility method to list all the paths in the jar.`make_cookies`\(_response_, _request_\)

Return sequence of Cookie objects extracted from response object.`multiple_domains`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.multiple_domains)

Returns True if there are multiple domains in the jar. Returns False otherwise.

| Return type: | [bool](https://docs.python.org/3/library/functions.html#bool) |
| :--- | :--- |


`pop`\(_k_\[, _d_\]\) → v, remove specified key and return the corresponding value.

If key is not found, d is returned if given, otherwise KeyError is raised.`popitem`\(\) → \(k, v\), remove and return some \(key, value\) pair

as a 2-tuple; but raise KeyError if D is empty.`set`\(_name_, _value_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.set)

Dict-like set\(\) that also supports optional domain and path args in order to resolve naming collisions from using one cookie jar over multiple domains.`set_cookie`\(_cookie_, _\*args_, _\*\*kwargs_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.set_cookie)

Set a cookie, without checking whether or not it should be set.`set_cookie_if_ok`\(_cookie_, _request_\)

Set a cookie if policy says it’s OK to do so.`setdefault`\(_k_\[, _d_\]\) → D.get\(k,d\), also set D\[k\]=d if k not in D`update`\(_other_\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.update)

Updates this jar with cookies from another CookieJar or dict-like`values`\(\)[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#RequestsCookieJar.values)

Dict-like values\(\) that returns a list of values of cookies from the jar.

See also

keys\(\) and items\(\)._class_ `requests.cookies.CookieConflictError`[\[source\]](https://docs.python-requests.org/en/master/_modules/requests/cookies/#CookieConflictError)

There are two cookies that meet the criteria specified in the cookie jar. Use .get and .set and include domain and path args in order to be more specific.

### Status Code Lookup

`requests.codes`

The `codes` object defines a mapping from common names for HTTP statuses to their numerical codes, accessible either as attributes or as dictionary items.

Example:

```text
>>> import requests
>>> requests.codes['temporary_redirect']
307
>>> requests.codes.teapot
418
>>> requests.codes['\o/']
200
```

Some codes have multiple names, and both upper- and lower-case versions of the names are allowed. For example, `codes.ok`, `codes.OK`, and `codes.okay` all correspond to the HTTP status code 200.

* 100: `continue`
* 101: `switching_protocols`
* 102: `processing`
* 103: `checkpoint`
* 122: `uri_too_long`, `request_uri_too_long`
* 200: `ok`, `okay`, `all_ok`, `all_okay`, `all_good`, `\o/`, `✓`
* 201: `created`
* 202: `accepted`
* 203: `non_authoritative_info`, `non_authoritative_information`
* 204: `no_content`
* 205: `reset_content`, `reset`
* 206: `partial_content`, `partial`
* 207: `multi_status`, `multiple_status`, `multi_stati`, `multiple_stati`
* 208: `already_reported`
* 226: `im_used`
* 300: `multiple_choices`
* 301: `moved_permanently`, `moved`, `\o-`
* 302: `found`
* 303: `see_other`, `other`
* 304: `not_modified`
* 305: `use_proxy`
* 306: `switch_proxy`
* 307: `temporary_redirect`, `temporary_moved`, `temporary`
* 308: `permanent_redirect`, `resume_incomplete`, `resume`
* 400: `bad_request`, `bad`
* 401: `unauthorized`
* 402: `payment_required`, `payment`
* 403: `forbidden`
* 404: `not_found`, `-o-`
* 405: `method_not_allowed`, `not_allowed`
* 406: `not_acceptable`
* 407: `proxy_authentication_required`, `proxy_auth`, `proxy_authentication`
* 408: `request_timeout`, `timeout`
* 409: `conflict`
* 410: `gone`
* 411: `length_required`
* 412: `precondition_failed`, `precondition`
* 413: `request_entity_too_large`
* 414: `request_uri_too_large`
* 415: `unsupported_media_type`, `unsupported_media`, `media_type`
* 416: `requested_range_not_satisfiable`, `requested_range`, `range_not_satisfiable`
* 417: `expectation_failed`
* 418: `im_a_teapot`, `teapot`, `i_am_a_teapot`
* 421: `misdirected_request`
* 422: `unprocessable_entity`, `unprocessable`
* 423: `locked`
* 424: `failed_dependency`, `dependency`
* 425: `unordered_collection`, `unordered`
* 426: `upgrade_required`, `upgrade`
* 428: `precondition_required`, `precondition`
* 429: `too_many_requests`, `too_many`
* 431: `header_fields_too_large`, `fields_too_large`
* 444: `no_response`, `none`
* 449: `retry_with`, `retry`
* 450: `blocked_by_windows_parental_controls`, `parental_controls`
* 451: `unavailable_for_legal_reasons`, `legal_reasons`
* 499: `client_closed_request`
* 500: `internal_server_error`, `server_error`, `/o\`, `✗`
* 501: `not_implemented`
* 502: `bad_gateway`
* 503: `service_unavailable`, `unavailable`
* 504: `gateway_timeout`
* 505: `http_version_not_supported`, `http_version`
* 506: `variant_also_negotiates`
* 507: `insufficient_storage`
* 509: `bandwidth_limit_exceeded`, `bandwidth`
* 510: `not_extended`
* 511: `network_authentication_required`, `network_auth`, `network_authentication`

