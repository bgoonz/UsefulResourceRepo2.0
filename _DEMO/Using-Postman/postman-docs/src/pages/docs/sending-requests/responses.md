---
title: "Receiving responses"
order: 23
page_id: "responses"
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
    name: "HTTP protocol explained"
    url:  "https://www.youtube.com/watch?v=FAnuh0_BU4c&list=PLM-7VG-sgbtBBnWb2Jc5kufgtWYEmiMAw"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Inspecting Postman Requests"
    url: "https://blog.postman.com/debugging-postman-requests/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"

warning: false

---

The Postman response viewer helps to ensure the correctness of API responses. An API response consists of the body, headers, and the status code. Postman organizes body and headers in different tabs. The status code and the completion time of the API call is visible next to the tabs.

The response also contains the HTTP specification default description. However, API authors can also add custom messages.

## Saving responses

[![save response button](https://assets.postman.com/postman-docs/58538745.png)](https://assets.postman.com/postman-docs/58538745.png)

If a request has been saved in a collection, you can save responses for that request. Once the response has been returned, click the **Save Response** button. Enter a name to call your saved response. All responses saved for a request will be available as an [example](/docs/sending-requests/examples/) whenever you load the request. Click the **Examples** dropdown in the top right to view and select the saved examples.

[![access saved responses](https://assets.postman.com/postman-docs/examplesDropdown.png)](https://assets.postman.com/postman-docs/examplesDropdown.png)

## Viewing responses

The Postman **Body** tab gives you several tools to help you understand the response quickly. You can view the body in one of three views - pretty, raw, and preview.

### Pretty

[![pretty view](https://assets.postman.com/postman-docs/58538803.png)](https://assets.postman.com/postman-docs/58538803.png)

The pretty mode formats JSON or XML responses so they are easier to view. Nobody wants to scroll through a minified single line JSON response looking for that elusive string! Links inside the pretty mode are highlighted and clicking on them can load a GET request in Postman with the link URL. For navigating large responses, click on the down-pointing triangles (▼) on the left to collapse large sections of the response.

For Postman to automatically format the body, make sure the appropriate Content-Type header is returned. If not, you can force formatting through JSON or XML. You can force JSON formatting under the **General** tab in the **SETTINGS** modal. To do so. select "JSON" from the "Language detection" dropdown.

**Finding items in responses:** You can use **CMD/CTRL + F** to open the search bar, and **CMD/CTRL + G** to scroll through results.

### Raw

[![raw view](https://assets.postman.com/postman-docs/58538811.png)](https://assets.postman.com/postman-docs/58538811.png)

The raw view is a large text area with the response body. It can indicate whether your response is minified.

### Preview

[![view as preview](https://assets.postman.com/postman-docs/58538940.png)](https://assets.postman.com/postman-docs/58538940.png)

The preview tab renders the response in a sandboxed iframe. Some web frameworks by default return HTML errors and the preview mode is especially helpful. Due to iframe sandbox restrictions, JavaScript and images are disabled in the iframe.

You can maximize the body to occupy the whole Postman window. Use this view if you plan to work with the response for an extended period of time.

If your API endpoint returns an image, Postman will detect and render it automatically. For binary response types, you should select “Send and download” which will let you save the response to your hard disk. You can then view it using the appropriate viewer. This gives you the flexibility to test audio files, PDFs, zip files, or anything that the API throws at you.

## Headers

[![headers tab](https://assets.postman.com/postman-docs/58539000.png)](https://assets.postman.com/postman-docs/58539000.png)

Headers are displayed as key-value pairs under the **Headers** tab. Hovering over the header name can give you a description of the header according to the HTTP spec. If you are sending a HEAD request, Postman will show the headers tab by default.

## Network information

Postman will display network data when your API returns a response.

[![Network info](https://assets.postman.com/postman-docs/network-info-non-https.jpg)](https://assets.postman.com/postman-docs/network-info-non-https.jpg)

Hover over the globe icon to see the local and remote IP addresses for the request you sent.

[![Network info](https://assets.postman.com/postman-docs/network-info-response.jpg)](https://assets.postman.com/postman-docs/network-info-response.jpg)

When you make `https` requests, the __Network__ information will display a padlock and will include detail of any [certificate verification](/docs/sending-requests/certificates/).

If you have __SSL verification__ enabled in the global settings and verification fails, Postman will indicate the error in the response area. Click the link to disable verification globally and immediately run the request again. _If SSL is disabled globally but enabled for your request, you will see the error and a link to open the console._

<img alt="Verification error" src="https://assets.postman.com/postman-docs/response-error-disable-ssl.jpg" width="300px"/>

> Note that if you click __Disable SSL Verification__ you will need to turn it back on if you want to verify certificates for future requests. To enable it globally, open __Settings__ (click the gear icon at the top right of Postman) and use the switch in the __General__ section. To enable it just for the current request, use the request __Settings__ tab.

If you have __SSL verification__ turned off and your request returns a certificate verification error, you will see the detail in the __Network__ information pop-up.

<img alt="Certificate error" src="https://assets.postman.com/postman-docs/certificate-error-in-network-info.jpg" width="400px"/>

For requests that return data successfully but with a certificate verification failure, the [console](/docs/sending-requests/troubleshooting-api-requests/) will display a warning.

[![Certification warning](https://assets.postman.com/postman-docs/self-signed-warning-console-pane.jpg)](https://assets.postman.com/postman-docs/self-signed-warning-console-pane.jpg)

## Response time

Postman automatically calculates the time it took for the response to arrive from the server. This is useful for some preliminary testing for performance.

## Response size

Postman breaks down the response size into body and headers. The response sizes are approximate.

## Cookies

Cookies sent by the server are visible in a dedicated tab. To [manage cookies](/docs/sending-requests/cookies/) in Postman the native apps, use the **MANAGE COOKIES** modal. If you're working in the Postman Chrome app, you can use the [Interceptor extension](/docs/sending-requests/capturing-request-data/interceptor/) to help manage cookies.

## Tests

You can also see the results of the tests that were run against the request. Learn more about [testing](/docs/writing-scripts/test-scripts/) in Postman.
