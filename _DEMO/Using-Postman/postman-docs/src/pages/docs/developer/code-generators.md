---
title: "Code generator library"
order: 149.1
page_id: "code-generators"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Generating client code"
    url: "/docs/sending-requests/generate-code-snippets/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Capturing request data"
    url: "/docs/sending-requests/capturing-request-data/capturing-http-requests/"

warning: false

---

You can generate client code for your API collections in Postman. The node.js code generator module converts a request into client code for your target language in conjunction with the [Collection SDK](/docs/developer/collection-sdk/).

The code generator takes a Collection SDK [Request object](http://www.postmanlabs.com/postman-collection/Request.html) and turns it into code to make the same request in a client app using a specified language / framework.

You can install the code generator library from [NPM](https://www.npmjs.com/package/postman-code-generators) or by [cloning it from the repo](https://github.com/postmanlabs/postman-code-generators).

> If you just need to generate client code for a request or collection [you can do so in the Postman app](/docs/sending-requests/generate-code-snippets/).

## Using code generation programmatically

The code generator library allows you to generate client requests in your application code. The following simplified code excerpt demonstrates using `convert` to build a client code snippet from a Request object via the Collection SDK, targeting node.js:

```js
var codegen = require('postman-code-generators'),
  sdk = require('postman-collection'),
  request = new sdk.Request('https://www.google.com'),
  language = 'nodejs',
  variant = 'request',
  options = {
    indentCount: 3,
    indentType: 'Space',
    trimRequestBody: true,
    followRedirect: true
  };
codegen.convert(language, variant, request, options,
  function(error, snippet) {
    if (error) {
      //  handle error
    }
    //  handle snippet..
});
```

You can use the `getOptions` method to find config options for your target language:

```js
var codegen = require('postman-code-generators'),
  language = 'nodejs',
  variant = 'Request';

codegen.getOptions(language, variant, function (error, options) {
  if (error) {
    // handle error
  }
  console.log(options);
});
```

The `getLanguageList` method returns available languages your request client code can target:

```js
var codegen = require('postman-code-generators'),
  supportedCodegens = codegen.getLanguageList();
  console.log(supportedCodegens);
```

## Supported languages

Since the code generator module is an open source project, if there is a language or framework you would like to be able to generate client code for, but that isn't currently provided, you can add it yourself by [contributing to the project](https://github.com/postmanlabs/postman-code-generators/blob/master/CONTRIBUTING.md). This allows people to access your contribution not only by using the code utility, but also in the Postman app itself.

## Next steps

To get started using the code generator module, [check out the instructions for installation and usage in the project repo on GitHub](https://github.com/postmanlabs/postman-code-generators). If you're using Postman to work with client applications, you might also find it useful to [capture request data](/docs/sending-requests/capturing-request-data/capturing-http-requests/).
