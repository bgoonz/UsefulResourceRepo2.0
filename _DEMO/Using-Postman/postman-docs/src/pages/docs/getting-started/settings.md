---
title: "Setting up Postman"
order: 8.1
page_id: "settings"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Download and Install"
    url: "https://www.postman.com/downloads/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Speeding up workflows with keyboard shortcuts"
    url: "https://blog.postman.com/speeding-up-workflows-with-keyboard-shortcuts/"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Keyboard Shortcuts | Postman Level Up"
    url: "https://youtu.be/J3kuTxNItD0"
  - type: link
    name: "Dark Mode | Postman Level Up"
    url: "https://youtu.be/rZySZm9XaLM"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Sending your first request"
    url: "/docs/getting-started/sending-the-first-request/"

warning: false

---

## Getting to the Settings

In the header of Postman, click the gear icon and select "Settings" to open the **SETTINGS** modal. You can also use the keyboard shortcut (**CMD/CTRL + ,**) to open the modal.

[![Settings dropdown](https://assets.postman.com/postman-docs/overview-settings-v8.jpg)](https://assets.postman.com/postman-docs/overview-settings-v8.jpg)

## General Settings

Postman tries to minimize the number of settings you have to change, so some defaults are automatically set. You can customize your settings based on your use case.

[![Settings details](https://assets.postman.com/postman-docs/settings-detail-v8.jpg)](https://assets.postman.com/postman-docs/settings-detail-v8.jpg)

### Request

* **Trim keys and values in request body:** If you’re using the form-data or url-encoded modes to send data to the server, switching this to "ON" will cause any parameters to be trimmed.
* **SSL certificate verification** (native apps only): Prevents Postman from checking validity of SSL certificates while making a request.
* **Always open requests in new tab:** Set this option to ON to open requests in a new tab. This option is, by default, set to OFF. Which means each time you click a request in the side bar, Postman opens the request in the preview tab.
* **Always ask when closing unsaved tabs:** If you set this option to OFF, Postman does not prompt you to save changes in your unsaved tabs. By default, this option is set to "ON".
* **Language detection:** Setting this to JSON will force a JSON rendering, irrespective of the response Content-Type header.
* **Request Timeout in ms (0 for infinity):**  Set how long the Postman should wait for a response before saying that the server isn’t responding. A value of 0 indicates infinity - Postman will wait for a response forever.
* **Max response size:** Option to limit the size of response (in Megabytes) that is rendered by Postman. If the limit is exceeded, Postman will inform you that the received response is large (default limit: 50 MB) and provide options to increase the size limit or download the response. Note that rendering large responses can impact Postman's performance.
* **Disable Request Validation:** Switch off request validation if you do not want Postman to attempt to validate your requests.

### Working Directory

If you want Postman to persist your file paths, then you must save your files in Postman's default working directory. When you work with files in form-data request bodies and binary file bodies, save them to this directory to let Postman persist your file's path relative to the working directory. This means your files loaded from within the working directory run smoothly across devices if other users use the same files on their devices. It also allows you to run collections that require file uploads with [Newman](https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/).

Postman flags a warning for files that are not stored in this directory.

However, delimiting the working directory can have some unintended security issues as follows:

  1. It is against the general principle of security to give system-wide access to a program as it exposes a user's system to all types of threats.
  2. Restricting the working directory would prevent safety issues arising when files obtained from external/anonymous sources are used. For example, a collection that the user has obtained from the internet. The user may or may not have proper information about the collection and as such may not understand if the collection serves some other hidden function.
  3. Absolute file path can also be given to postman, but when sharing it may not work for the user it is shared to as absolute paths can vary between systems.

To learn more about this feature, refer to [Sending body data](/docs/sending-requests/requests/#sending-body-data).

* **Location:** Path to local directory containing postman files. The default path populated as a placeholder is `~/Postman/files`.
* **Allow reading files outside working directory:** Set this option to ON if you want Postman to read files from outside the Postman working directory. Postman persists your file paths for binary file and form-data request bodies. To learn more about this feature, refer to [Sending body data](/docs/sending-requests/requests/#sending-body-data).

You may encounter errors for file reference:

1. Mini warning ⚠️ icons will be appear when the specified file reference does not exist or the setting to read it from outside PWD is disabled.

2. The [Postman console](/docs/sending-requests/troubleshooting-api-requests/#using-the-console) will display a warning for file reading errors. It will also display errors if a  collection wants to read a file outside the working directory and the setting for it is disabled.

3. For Newman, it will read from the default working directory and can be modified using CLI options. File reading errors are displayed as console errors. You can utilize Newman [verbose mode](https://github.com/postmanlabs/newman#command-line-options) to find more information about these errors.

### Headers

* **Send no-cache header** (recommended): Sending a no-cache header makes sure you get the up-to-date response from your server.
* **Send Postman Token header:** If an XmlHttpRequest is pending and another request is sent with the same parameters then some browsers returning the same response for both of them. Sending a random token avoids this. This can also help you distinguish between requests on the server side.
* **Retain headers when clicking on links:** If you click on a link in a response, Postman creates a new GET request with that URL. If you want to retain the headers that you set in the previous request set **ON** here. This is useful if you are accessing mainly protected resources.
* **Automatically follow redirects:** Prevent requests that return a 300-series response from being automatically redirected.
* **Send anonymous usage data to Postman:** Option to disable sending basic anonymous usage data (button clicks and app events) to Postman. Postman feeds usage data into product improvements.

### User Interface

* **Two-pane view:** Toggle between showing the response below, or beside, the request.
* **Variable autocomplete:** Enable this to turn on autocomplete feature for your variables.

[![General settings](https://assets.postman.com/postman-docs/editor-settings-v8.jpg)](https://assets.postman.com/postman-docs/editor-settings-v8.jpg)

### Editor Settings

* **Font Family:** Select the font family for the text that appears in Postman. You can revert the changes at any point by clicking **Reset**.
* **Font Size:** Adjust the font size in pixels for the text that appears in Postman. Note that this setting impacts only the Test Scripts, Pre-request Scripts, and Response Pretty View.

## Themes

Pick your pleasure: choose a light or dark theme for Postman.

[![Themes in settings](https://assets.postman.com/postman-docs/themes-settings-v8.jpg)](https://assets.postman.com/postman-docs/themes-settings-v8.jpg)

## Keyboard Shortcuts

This is where you can view keyboard shortcuts available for your operating system here.

## Data Import / Export

Import and export data in bulk inside Postman.  This will overwrite your existing collections and environments so be a little careful. It always helps to take a backup before you are importing other files. Learn more about [importing and exporting data](/docs/getting-started/importing-and-exporting-data/) in Postman.

## Add-ons

Download Newman, Postman's command-line companion, to integrate Postman collections with your build system or run automated tests for your API through a cron job. Learn more about [Newman](/docs/running-collections/using-newman-cli/command-line-integration-with-newman/).

## Sync

If you are signed in to Postman, your data is synced with the server, making sure you have it all next time you use Postman (and not just locally). You can also manually perform sync using the Sync icon in the header toolbar of Postman. Learn more about [syncing](/docs/getting-started/syncing/).

## Certificates

Add and view client certificates on a per domain basis. Learn more about [setting certificates](/docs/sending-requests/certificates/).

## Proxy

Configure your proxy settings in Postman using this tab. For more information on Proxy, see [How to configure proxy in Postman](/docs/sending-requests/capturing-request-data/proxy/).

## About

This is where you can verify your current version of Postman. There are also some helpful support links to reference.
