---
title: "Echo API"
order: 147
page_id: "echo_api"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Sending your first request"
    url: "/docs/getting-started/sending-the-first-request/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Discovering Templates"
    url: "/docs/getting-started/importing-templates/"

warning: false

---

You can use the Postman Echo API to try out requests in Postman. The API echoes back what you sent it, including each of the data items you included in the request as part of the response. Check out the [Echo API documentation](https://www.postman.com/postman/workspace/published-postman-templates/documentation/631643-f695cab7-6878-eb55-7943-ad88e1ccfd65?ctx=documentation) to see the available endpoints.

Lots of Postman learning resources (including templates and docs here in the Learning Center) use the Postman Echo API, because it provides a quick way to send a request without worrying about authentication or request configuration. If you just want to learn how to do something in Postman without connecting to a "real" API, feel free to use the Postman Echo API at any time.

For example, in Postman, open a new request and enter the following URL:

```http
postman-echo.com/get
```

Make sure `GET` is selected in the method drop-down, and click __Send__.

[![Postman Echo response](https://assets.postman.com/postman-docs/postman-echo-api-response.jpg)](https://assets.postman.com/postman-docs/postman-echo-api-response.jpg)

The API returns a JSON response including the detail from the request you sent. If you use parameters and/or body data, it will also return those.

[![Postman Echo post response](https://assets.postman.com/postman-docs/echo-post-data-returned.jpg)](https://assets.postman.com/postman-docs/echo-post-data-returned.jpg)

The Echo API includes endpoints to try different request methods, parameters, authentication, and a variety of supporting utilities.

## Next steps

You can import the [Echo template](https://docs.postman-echo.com/) to use some pre-built requests to the API—when you import the collection into your own Postman app you can also edit the requests to suit your needs. You will find many other useful collections for learning about Postman and APIs in the [templates](/docs/getting-started/importing-templates/).
