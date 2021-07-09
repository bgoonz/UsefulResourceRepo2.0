---
title: "Importing data files"
order: 58
page_id: "working_with_data_files"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Using the Collection Runner"
    url: "/docs/running-collections/intro-to-collection-runs/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Loop Through a Data File | Postman Level Up"
    url: "https://youtu.be/RH8b3gbujPY"

warning: false

---

You can use data files to pass Postman sets of values to use in a collection run. By selecting a JSON or CSV data file in the Collection Runner, you can test your requests with multiple different values as part of a single run.

## Running collections with data files

When you [initiate a collection run](/docs/running-collections/intro-to-collection-runs/) you will see an option to select a data file. Click __Runner__ at bottom right of Postman.

![Collection Runner](https://assets.postman.com/postman-docs/collection-runner-for-v8.gif)

Select your collection, then click __Select File__ next to __Data__ on the right to select your data file.

<img alt="Data File Select" src="https://assets.postman.com/postman-docs/select-data-file-v8.jpg" height="350px"/>

You will see an option to __Preview__ the data in the file before starting the run.

![Data File Preview](https://assets.postman.com/postman-docs/preview-data-file.jpg)

Click __Run using data files__ to begin the run with the values from the file.

> * You can try out the steps in this page by first importing [the sample collection](https://assets.postman.com/postman-docs/58533790.json)—download and import it into Postman using the __Import__ button at the top left.
> ![Import Collection](https://assets.postman.com/postman-docs/collection-import-file-v8.jpg)
> * In the Collection Runner, choose the collection you imported. Download [the sample data file](https://assets.postman.com/postman-docs/58702589.json) and select it in the __Runner__ also.
> * Note that the sample collection contains a `POST` request which uses a `path` variable in the URL. This path variable is specified in each record in the data file. The request also uses a `value` variable in the body which is also pulled from the data file for each iteration. _The example request is to the [Postman Echo API](https://docs.postman-echo.com/), a learning resource that returns the data you send it._

The Collection Runner will run the collection requests for each iteration in the data file. The output you see will indicate the results for any tests you have defined in your collection requests.

![Tests](https://assets.postman.com/postman-docs/data-file-tests-tab-v8.jpg)

Click a request in the Collection Runner results to see more detail on its data.

![Collection Run Results](https://assets.postman.com/postman-docs/data-file-collection-run-v8.jpg)

Any data you have defined in the requests will be used when the collection runs, and your request data can reference values defined in the data file.

![Data File Value](https://assets.postman.com/postman-docs/request-body-data-run-v8.jpg)

## Accessing data file values

You can reference values defined in the data file throughout your requests, however to access them in scripts, you need to use a different technique. To use values from the data file in your __Tests__ or __Pre-request Script__ code, use the `iterationData`, which provides access to the current data file record being used to run the request.

```js
//get the 'value' field from the data file for this request run
pm.iterationData.get("value")
```

See the [Sandbox Reference](/docs/writing-scripts/script-references/postman-sandbox-api-reference/) for more on what you can do with iteration data.

## Errors when reading data files

You may encounter errors when Postman attempts to read your data file during a collection run. If this happens, you can take the following steps.

1. Ensure your data file is formatted correctly, as either CSV or JSON.

2. Confirm your data file is encoded properly, by opening your data file in a text editor and saving the file in a different format.

If the errors persist, [contact the Postman support team](https://support.getpostman.com/).

## Next steps

To continue learning to leverage collection runs, check out the following resources:

* [Building workflows](/docs/running-collections/building-workflows/)
* [Command-line integration with Newman](/docs/running-collections/using-newman-cli/command-line-integration-with-newman/)
