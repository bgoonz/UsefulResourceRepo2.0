---
title: "Working with certificates"
order: 29
page_id: "certificates"
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
    name: "Set and view SSL certificates with Postman"
    url: "https://blog.postman.com/set-and-view-ssl-certificates-with-postman/"

warning: false

---

Postman provides a way to view and set SSL certificates on a per domain basis.

To manage your client certificates, click the gear icon on the right side of the header toolbar, choose **Settings**, and select the **Certificates** tab.

[![certificates tab](https://assets.postman.com/postman-docs/WS-certificates.png)](https://assets.postman.com/postman-docs/WS-certificates.png)

## Adding a Client Certificate

To add a new client certificate, click the **Add Certificate** link.

In the **Host** field, enter the domain (without protocol) of the request URL for which you want to use the certificate, for example, `https://postman-echo.com` ([view Collection for Postman Echo](https://www.postman.com/postman/workspace/published-postman-templates/documentation/631643-f695cab7-6878-eb55-7943-ad88e1ccfd65)).

You can also specify a custom port to associate with this domain in the **Port** field. This is optional. If left empty, the default HTTPS port (443) will be used.

Choose your client certificate file in the **CRT file** field. Currently, Postman only supports the CRT format. Support for other formats (like PFX) will come soon.

Choose your client certificate key file in the **KEY file** field.

If you used a passphrase while generating the client certificate, you’ll need to supply the passphrase in the **Passphrase** field. Otherwise, leave it blank.

[![add certificate](https://assets.postman.com/postman-docs/addcertificate.png)](https://assets.postman.com/postman-docs/addcertificate.png)

Once your certificate is added, it should appear in the client certificates list.

[![client certificates list](https://assets.postman.com/postman-docs/clientcertificateslist.png)](https://assets.postman.com/postman-docs/clientcertificateslist.png)

**NOTE:** You should not have multiple certificates set for the same domain. If you have multiple ones set, only the last one added will be used.

## Using a Certificate

You do not have to perform any extra steps to use a client certificate if it has been added. If you make a request to a configured domain, the certificate will automatically be sent with the request, provided you make the request over HTTPS.

You can verify this. To do so, open up your Postman console (**CMD/CTRL + ALT + C**). You can read more about the [Postman Console](/docs/sending-requests/troubleshooting-api-requests/). A new window will open up.

Now, send a request to `https://postman-echo.com/get`. Keep the Postman Console open if Postman version is lower than `v7.10`. Notice we’re using `https` to make sure the certificate is sent. Once the response arrives, switch over to the Postman console to see your request. If you expand your request, you will be able to see which certificate was sent along with the request.

[![Postman console view](https://assets.postman.com/postman-docs/postmanconsoleviewcertificates.png)](https://assets.postman.com/postman-docs/postmanconsoleviewcertificates.png)

## Removing a Certificate

To remove a certificate, use the **Remove** link next to the certificate under the **Certificates** tab in the Settings.

[![remove certificate](https://assets.postman.com/postman-docs/removecertificate.png)](https://assets.postman.com/postman-docs/removecertificate.png)

## Editing a Certificate

You cannot edit a certificate after it has been created. To make changes to it, you will need to remove the certificate and create a new one.

> Let's Encrypt SSL certificates renew automatically—you do not need to carry out any manual steps. When a certificate is generated it has a 90 day expiry date and will renew seven days before it expires

## Certificate data

Postman will indicate certificate information in the __Network__ response pop-up for any HTTPS requests you send, including warnings and errors such as self-signed and expired certificates.

[![Network info](https://assets.postman.com/postman-docs/network-info-response.jpg)](https://assets.postman.com/postman-docs/network-info-response.jpg)

You can also see certificate info in the [console](/docs/sending-requests/troubleshooting-api-requests/).

<img alt="Certificate info in console" src="https://assets.postman.com/postman-docs/certificate-info-in-console.jpg" width="300px"/>

If certificate verification fails, Postman will display an error message.

<img alt="Certificate verification fail" src="https://assets.postman.com/postman-docs/certificate-verification-fail.jpg" width="500px"/>

You will see the error in the response area if you have SSL verification turned on. __Disable SSL Verification__ to disable the setting globally and rerun the request.

<img alt="Verification error" src="https://assets.postman.com/postman-docs/response-error-disable-ssl.jpg" width="300px"/>

If you have SSL verification switched off either globally or for the individual request, you will see the detail of any errors or warnings in the response __Network__ information.

<img alt="Certificate error" src="https://assets.postman.com/postman-docs/certificate-error-in-network-info.jpg" width="400px"/>

You can find more information about failed certification in the [console](/docs/sending-requests/troubleshooting-api-requests/).

<img alt="Certificate fail in console" src="https://assets.postman.com/postman-docs/console-certificate-fail.jpg" width="600px"/>

You can toggle SSL verification on and off by default in the Postman __Settings__ (click the gear icon at the top right) or for a specific request in the __Settings__ tab.

[![Request SSL](https://assets.postman.com/postman-docs/request-ssl-toggle.jpg)](https://assets.postman.com/postman-docs/request-ssl-toggle.jpg)
