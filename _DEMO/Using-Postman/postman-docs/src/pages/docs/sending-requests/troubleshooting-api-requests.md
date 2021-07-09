---
title: "Troubleshooting requests"
order: 29.2
page_id: "troubleshooting_api_requests"
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
    name: "Debugging with the Console | Postman Level Up"
    url: "https://www.youtube.com/watch?v=YCsURct9wCk&list=PLM-7VG-sgbtC5tNXxd28cmePSa9BYwqeU&index=9"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Powerful Debugging with the Postman Console"
    url: "https://blog.postman.com/powerful-debugging-with-the-postman-console/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Using the Collection Runner"
    url: "/docs/running-collections/intro-to-collection-runs/"

warning: false
---

There are many possible reasons for your API requests not behaving as expected. You will see a message if Postman is not able to send your request, or if it does not receive a response from the API you sent the request to. The message will include an overview of the issue and a link to the Console, where you can access detailed info about the request.

![Request not sent](https://assets.postman.com/postman-docs/response-error-console-link-v8.jpg)

Click __View in Console__ to see the request detail in the Console and find out more about what went wrong.

![Error in Console](https://assets.postman.com/postman-docs/console-pane-opened-from-response-v8.jpg)

## Contents

* [Common issues](#common-issues)
* [Debugging and logs](#debugging-and-logs)
    * [Using the console](#using-the-console)
    * [Accessing console logs](#accessing-console-logs)
* [Getting help](#getting-help)

## Common issues

* __Connectivity__
    * If Postman fails to send your request, you may be experiencing connectivity issues. Check your connection by attempting to open a page in your web browser.
* __Firewalls__
    * Some firewalls may be configured to block non-browser connections. If this happens you will need to contact your network administrators for Postman to work.
* __Proxy configuration__
    * If you are using a proxy server to make requests, check your configuration. By default, Postman uses the proxy settings configured in your operating system's network settings. The Postman Console will provide debugging information regarding proxy servers.
* __SSL certificates__
    * You may experience issues using HTTPS connections. You can turn off SSL verification in the Postman Settings. If that does not help, your server might be using a client-side SSL connection, which you can configure in [Postman Settings](/docs/getting-started/settings/). Use the Postman Console to ensure that the correct SSL certificate is being sent to the server.
* __Client certificates__
    * Client certificates may be required for your API server. You can [add a client certificate](/docs/sending-requests/certificates/) in the [Postman Settings](/docs/getting-started/settings/).
* __Incorrect request URLs__
    * If you are using variables or path parameters with your request, make sure the final address is structure correctly by opening the Console, which will display the URL your request was sent to when it executed. Unresolved request variables can result in invalid server addresses.
* __Incorrect protocol__
    * Check whether you're accidentally using `https://` instead of `http://` in your URL (or vice versa).
* __Postman errors__
    * It is possible that Postman might be making invalid requests to your API server. You can confirm this by checking your server logs (if available). If you believe this is happening, get in touch with the Postman team on the [GitHub issue tracker](https://github.com/postmanlabs/postman-app-support/issues).
* __Very short timeouts__
    * If you configure a very short timeout in Postman, the request could be timing out before completion, resulting in an error. Try increasing the timeout to avoid this issue.
* __Invalid responses__
    * If your server sends incorrect response encoding errors, or invalid headers, Postman may fail to interpret the response.

> Postman supports TLS version 1.2 or higher, which [may not be supported if you are using an older browser or operating system](https://support.postman.com/hc/en-us/articles/360041392573-Deprecating-TLS-1-0-and-TLS-1-1).

## Debugging and logs

The Postman console helps debug your requests when an API is not behaving as you expect. If you think the issue may be with Postman itself, the DevTools console provides internal debugging information you can also check out.

## Using the console

Every request sent by Postman is logged in the console, so you can view the detail of what happened when you sent a request.

The Postman console logs the following information:

* The primary request that was sent, including all underlying request headers, variable values, redirects, etc.
* The raw response sent by the server before it is processed by Postman
* The proxy configuration and certificates used for the request
* The network information such as IP addresses, ciphers, and protocols used
* Logs from `console.log()`, `console.info()`, `console.warn()` and `console.error()` and asynchronous requests from test or pre-request scripts

Using log statements at appropriate locations in your test scripts will help you identify the source of any issues.

You can open the console from the button on the bottom left of Postman, by clicking `(CMD/CTRL + ALT + C)`, or selecting __View__ &gt; __Show Postman Console__.

<img alt="Open the console" src="https://assets.postman.com/postman-docs/console-pane-button.jpg" width="350px"/>

The console pane will open. You will see network information, request and response headers and body for each request, together with any console output messages coming from your scripts.

[![Console info](https://assets.postman.com/postman-docs/console-logs-in-pane-v8.jpg)](https://assets.postman.com/postman-docs/console-logs-in-pane-v8.jpg)

You can filter by log message type under **All Logs**, or toggle timestamps / network info.

<img alt="Console options" src="https://assets.postman.com/postman-docs/console-pane-log-options-v8.jpg" width="350px"/>

Keeping the console open will increase the visibility of your network calls and log messages while debugging. The console will log the last 5000 messages and 24 hours by default. Select __Clear__ to empty the list.

### Accessing console logs

The DevTools console provides additional internal debugging entries for the Postman app.

To access the DevTools console logs, open the __View__ menu and select __Show DevTools__. In the DevTools window, click __Console__ to see the app debug logs.

## Getting help

If you still can't get your requests to work, you can ask for help in the [Postman forum](https://community.postman.com/). If you've tried troubleshooting and think the problem is with Postman, search the [issue tracker](https://github.com/postmanlabs/postman-app-support/issues) on GitHub to check if someone has already reported the issue (and whether there is a known solution that you can use). If you're reporting a new issue, check out the [guidelines](https://github.com/postmanlabs/postman-app-support/#guidelines-for-reporting-issues). If you need to include confidential data, you can file a ticket with Postman [support](https://support.getpostman.com/hc), including your console logs to help troubleshoot.
