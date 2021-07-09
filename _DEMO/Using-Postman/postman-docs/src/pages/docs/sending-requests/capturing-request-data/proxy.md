---
title: "Using a proxy"
order: 33
page_id: "proxy"
search_keyword: "HTTP_PROXY, NO_PROXY"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Setting up Postman"
    url: "/docs/getting-started/settings/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Client proxy settings in Postman"
    url: "https://blog.postman.com/client-proxy-settings-in-postman/"

warning: false

---

A proxy server acts as a security barrier between your internal network and the Internet, keeping others on the Internet from accessing information on your internal network.

## What is a proxy?

In basic web speak, a client makes a request to the server, and the server sends back a response.

[![Standard request flow](https://assets.postman.com/postman-docs/proxy-request-flow.jpg)](https://assets.postman.com/postman-docs/proxy-request-flow.jpg)

A proxy server is an application or system that acts as an intermediary between your computer and the internet, or more specifically, the client and server. The proxy makes requests on your behalf to websites, servers, and other internet services.

[![Standard web proxy flow](https://assets.postman.com/postman-docs/proxy-standard-flow.jpg)](https://assets.postman.com/postman-docs/proxy-standard-flow.jpg)

The proxy can reside on your local machine, somewhere in your network, or at any point between your client and the destination server on the internet.

Similar to the way parents might speak to each other through a child, the child is a proxy relaying all communications between the 2 parents.

>**Parent 1**:  _Ask your father if he can pick you up after school._
>>**Timmy**:  _Can you pick me up after school._
>>>**Parent 2**:  _Yeah._
>>>>**Timmy**:  _Dad says yeah._

In this analogy, the child forwards the information on behalf of each parent. Besides just relaying information, [proxies can do much more](https://en.wikipedia.org/wiki/Proxy_server).

* Record all traffic between your machine and the internet
* Reveal the contents of all requests, responses, cookies, and headers
* Route traffic to specified internet locations
* Debugging
* Security from direct attacks
* DevOps load balancing

A proxy acts like a go-between to perform various functions. Postman has a [built-in web proxy to capture API requests](/docs/sending-requests/capturing-request-data/capturing-http-requests/), the [Postman Interceptor to intercept network traffic](/docs/sending-requests/capturing-request-data/interceptor/), and proxy settings to direct API requests.

### Configuring proxy settings

This article describes how to configure the proxy settings in Postman to direct all requests made in Postman to route through a proxy server. This is different from [capturing network traffic](/docs/sending-requests/capturing-request-data/capturing-http-requests/) with the built-in proxy which allows Postman to intercept network traffic.

Postman's native apps for Mac, Windows, and Linux support configuring proxies. You can either specify to use a **custom proxy** or to use the **system proxy** defined in the operating system.

Use the **custom proxy** if all of your applications need to use the same proxy. Turn **custom proxy** _on_ if you want to direct the requests from Postman go through a custom proxy server. Turning it off will direct the
requests to not use the proxy server.

To configure the proxy settings, click the gear icon on the right side of the header toolbar, choose **Settings**, and select the **Proxy** tab.

[![Proxy settings modal](https://assets.postman.com/postman-docs/proxy-settings-overview-modal.jpg)](https://assets.postman.com/postman-docs/proxy-settings-overview-modal.jpg)

### Using a custom proxy

Postman allows you to configure **Custom Proxy Configuration** that direct Postman to forward your HTTP or HTTPS requests through a proxy server. This will route all requests sent by Postman through a proxy server of your choosing.

1. Postman is the client that sends a request through the selected proxy.
1. The proxy server sends the request to the server.
1. The server returns a response back through the proxy server.

[![Enable custom proxy](https://assets.postman.com/postman-docs/custom-proxy-flow.jpg)](https://assets.postman.com/postman-docs/custom-proxy-flow.jpg)

Custom proxy settings are disabled by default and can be turned on using the toggle switch.

Choose the type of proxy server by checking the appropriate checkboxes beside **Proxy Type**. By default, both `HTTP` and `HTTPS` are checked. This means that both HTTP and HTTPS requests will go through the proxy server.

The first field under **Proxy Type** is **Proxy Server**. Here, enter the **host** or **IP address** (without protocol) of the proxy server. The next field to **Proxy Server** is where the **port** of the proxy server is provided.

The field below **Proxy Server** is **Proxy Auth**. Postman uses the system's proxy configurations by default. To send API requests, select the option **This proxy requires authentication.** Turning this on makes the requests use Basic Authentication method, which requires a username and a password.

<img alt="Default proxy authentication" src="https://assets.postman.com/postman-docs/enable-default-proxy-configuration.jpg"/>

The **Proxy Bypass** setting is below the **Proxy Server** option. A number of comma-separated hosts can be provided here for which the requests do not use the proxy settings.

[![Custom proxy configuration](https://assets.postman.com/postman-docs/enable-custom-proxy-configuration.jpg)](https://assets.postman.com/postman-docs/enable-custom-proxy-configuration.jpg)

### Using a system proxy

The **Use the system proxy** option allows Postman to use the system's default proxy configuration. It contains an option to use `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY` environment variables.

If all of your applications need to use the same proxy, you might need to use a default proxy configured at the Operating System level. Use the **system proxy settings** to forward your HTTP or HTTPS requests in Postman through your OS’s default configuration. In other words, you are telling the Postman and all requests sent using Postman to follow your OS's default configuration.

1. Postman is the client that sends a request through your Operating System’s default configuration, which forwards the request to the proxy server.
1. The system proxy server sends the request to the server.
1. The server returns a response back through the proxy server.

[![System proxy](https://assets.postman.com/postman-docs/system-proxy-flow.jpg)](https://assets.postman.com/postman-docs/system-proxy-flow.jpg)

System proxy settings are enabled by default. Any request made through Postman will go through the system proxy.

You can select or unselect the option "**Use the system proxy**" to enable or disable the system proxy. When it is unchecked, all the requests are made directly. However, regardless of the proxy setting in the app, Postman will still use the system proxy if there is an environment variable set.

[![Use system proxy](https://assets.postman.com/postman-docs/use-system-proxy.jpg)](https://assets.postman.com/postman-docs/use-system-proxy.jpg)

**Note:** If the **Use System Proxy** and the **Custom Proxy Configuration** are both turned on, then the **Custom Proxy Configuration** will take precedence.

### Troubleshooting proxy configurations

If you are unable to send any requests through Postman and your network requires a proxy, take the following steps:

* Enable the system proxy and make sure the proxy is added to the operating system:
    * **Windows**: Click **Start**, then click on the gear icon (**Settings**) at the far left. In Settings, click **Network & Internet**. In the left-hand pane, click **Proxy** at the bottom. **Manual Proxy Setup** > use a Proxy **(ON)**.

    * **Mac**: Open System Preferences and click **Network**. On the left-hand side, make sure to select the connected or active network connection. You can have different proxy settings for each type of network connection. At the bottom, click **Advanced**. Select the **Proxies** tab and you will see a bunch of different protocols you can configure. If you click **Web Proxy (HTTP)**, you will be able to enter the proxy server IP address, port number, username, and password.

    * **Linux**: System Settings > scroll down to Hardware and then click on Networking. Click on **Network Proxy**, you can choose from **Automatic** or **Manual**.

If you are unable to send any requests through Postman and your network does not require a proxy, take the following steps:

* Ensure you have both proxies (Custom/System) disabled. If you are still not able to send the request, it might be due to the environment variables setup in your system. There are two solutions to solve this:

    * Remove the environment variables http&#95;proxy, https&#95;proxy, HTTP&#95;PROXY, and HTTPS&#95;PROXY.
    * Start Postman with these "variables" turned off:

        * **Windows** –  create a `postman.bat` file with the following contents:

        ```shell
        set HTTP_PROXY=''
        set HTTPS_PROXY=''
        set http_proxy=''
        set https_proxy=''
        start C:\path\to\Postman.exe
        ```

        Double-clicking this bat file should open Postman without any of the proxy environment variables set.

        * **Mac/Linux** – http&#95;proxy= '' https&#95;proxy= '' HTTP&#95;PROXY= '' HTTPS&#95;PROXY= '' /path/to/postman

If your proxy has basic auth, take the following steps:

* Start Postman with the appropriate environment variables:
    * **Windows** — create a `postman.bat` file with the following contents:

    ```shell
    set HTTP_PROXY=http://USER:PASS@host:port
    set HTTPS_PROXY=https://USER:PASS@host:port
    start C:\path\to\Postman.exe
    ```

  Double-clicking this `.bat` file should open Postman without any of the proxy environment variables set.

    * **Mac/Linux** - create the `.sh` file with the following contents:

    ```shell
    `HTTP_PROXY`=`http://USER:PASS@host:port`
    `HTTPS_PROXY`=`https://USER:PASS@host:port` /path/to/postman
    ```

    * Create this file and save it in a convenient location. When you open this file, the set environment variables will only apply to the Postman process.

For troubleshooting configuration or request issues, see [Troubleshooting using console](/docs/sending-requests/troubleshooting-api-requests/).
