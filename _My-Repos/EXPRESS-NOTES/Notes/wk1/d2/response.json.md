# Response.json() - Web APIs | MDN

> The json() method of the Response interface takes
> a Response stream and reads it to completion. It returns a promise which
> resolves with the result of parsing the body text as JSON.

The **`json()`** method of the [`Response`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/API/Response) interface takes a [`Response`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/API/Response) stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as [`JSON`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

Note that despite the method being named `json()`, the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.

## [Syntax](#syntax "Permalink to Syntax")

    response.json().then(data => {

    });

### [Parameters](#parameters "Permalink to Parameters")

None.

### [Return value](#return_value "Permalink to Return value")

A [`Promise`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to a JavaScript object. This object could be anything that can be represented by JSON — an object, an array, a string, a number...

## [Example](#example "Permalink to Example")

In our [fetch json example](https://github.com/mdn/fetch-examples/tree/master/fetch-json) (run [fetch json live](https://mdn.github.io/fetch-examples/fetch-json/)), we create a new request using the [`Request()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/en-US/docs/Web/API/Request/Request "Request()") constructor, then use it to fetch a `.json` file. When the fetch is successful, we read and parse the data using `json()`, then read values out of the resulting objects as you'd expect and insert them into list items to display our product data.

    const myList = document.querySelector('ul');
    const myRequest = new Request('products.json');

    fetch(myRequest)
      .then(response => response.json())
      .then(data => {
        for (const product of data.products) {
          let listItem = document.createElement('li');
          listItem.appendChild(
            document.createElement('strong')
          ).textContent = product.Name;
          listItem.append(
            ` can be found in ${
              product.Location
            }. Cost: `
          );
          listItem.appendChild(
            document.createElement('strong')
          ).textContent = `£${product.Price}`;
          myList.appendChild(listItem);
        }
      })
      .catch(console.error);

## [Specifications](#specifications "Permalink to Specifications")

| Specification |
| ------------- |

| [Fetch Standard (Fetch)  
\# ref-for-dom-body-json①](https://fetch.spec.whatwg.org/#ref-for-dom-body-json%E2%91%A0) |

## [Browser compatibility](#browser_compatibility "Permalink to Browser compatibility")

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?body=%3C%21--+Tips%3A+where+applicable%2C+specify+browser+name%2C+browser+version%2C+and+mobile+operating+system+version+--%3E%0A%0A%23%23%23%23+What+information+was+incorrect%2C+unhelpful%2C+or+incomplete%3F%0A%0A%23%23%23%23+What+did+you+expect+to+see%3F%0A%0A%23%23%23%23+Did+you+test+this%3F+If+so%2C+how%3F%0A%0A%0A%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60api.Response.json%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FResponse%2Fjson%0A*+Report+started%3A+2021-07-06T17%3A44%3A38.270Z%0A%0A%3C%2Fdetails%3E&title=api.Response.json+-+%3CPUT+TITLE+HERE%3E "Report an issue with this compatibility data")

|     | desktop | mobile |
| --- | ------- | ------ | ------- | ----------------- | ----- | ------ | --------------- | -------------- | ------------------- | ------------- | ------------- | ---------------- |
|     | Chrome  | Edge   | Firefox | Internet Explorer | Opera | Safari | WebView Android | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet |
| --- | ---     | ---    | ---     | ---               | ---   | ---    | ---             | ---            | ---                 | ---           | ---           | ---              |

|
`json`

| ChromeFull support42 | EdgeFull support14 | FirefoxFull support39 | Internet ExplorerNo supportNo | OperaFull support29 | SafariFull support10.1 | WebView AndroidFull support42 | Chrome AndroidFull support42 | Firefox for AndroidFull support39 | Opera AndroidFull support29 | Safari on iOSFull support10.3 | Samsung InternetFull support4.0 |

### Legend

Full support

Full support

No support

No support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out [https://github.com/mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) and send us a pull request.

## [See also](#see_also "Permalink to See also")

[Source](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
