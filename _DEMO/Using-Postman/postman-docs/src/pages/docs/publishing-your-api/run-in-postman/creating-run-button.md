---
title: "Creating Run in Postman buttons"
order: 109
page_id: "creating_run_button"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Case Studies"
  - type: link
    name: "Intuit"
    url: "https://www.postman.com/case-studies/intuit/"
  - type: subtitle
    name: "Videos"
  - type: link
    name: "Generate a Run in Postman Button | Postman Level Up"
    url: "https://www.youtube.com/watch?v=r2DGy4jSuUE&list=PLM-7VG-sgbtC5tNXxd28cmePSa9BYwqeU&index=8"
  - type: link
    name: "API documentation with Postman"
    url: "https://www.youtube.com/watch?v=Ayo_KdLLcTA"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "Introducing the All-New Run in Postman Button"
    url: "https://blog.postman.com/new-run-in-postman//"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Documenting your API"
    url: "/docs/publishing-your-api/documenting-your-api/"
  - type: link
    name: "Managing environments"
    url: "/docs/sending-requests/managing-environments/"

---

One way to [share your Postman Collections](/docs/collaborating-in-postman/sharing/) is to create a stand-alone Run in Postman button.  The new **Run in Postman** button allows you to fork the collections. You can embed the button in your website or a README to let developers interact with your API more quickly.

> Being a user, you can still create the **Run in Postman** button from API specification formats like OpenAPI and RAML. To create a button for the standard you use, first convert the file to a collection by [importing it into Postman](/docs/getting-started/importing-and-exporting-data/) or by [authoring your specification in Postman](/docs/designing-and-developing-your-api/the-api-workflow/) to generate a collection.

## Contents

* [Creating a Run in Postman button](#creating-a-run-in-postman-button)
* [Next steps](#next-steps)

## Creating a Run in Postman button

Make sure you're signed in to your Postman account, and that you have a collection in a public workspace to share.

> Note: If the collection is present in a public workpspace, you can directly embed the copied code where you would like the button to be displayed. If the collection is present in a team or a personal workspace, [share the collection to a public workspace](/docs/collaborating-in-postman/using-workspaces/managing-workspaces/#adding-elements-to-workspaces) to create the **Run in Postman** button.

* In Postman, open the collection you want to share.
* Next to the collection name, click **...** to expand the collection details and select **Share collection** to open a modal.

* Tab over to **Via Run in Postman**.
* Choose a dynamic or static button:
    * **Dynamic button**: This button uses JavaScript, HTML and CSS, so you can customize the button for a website. You can also access the [Run in Postman API](/docs/publishing-your-api/run-in-postman/run-button-API/) to dynamically create and update environments.
    > To create a dynamic button, you need to share the collection to a public workspace. If you do not have a public workspace to share to, you can create a new one within the modal. For users on Enterprise plans, you need to have a [community manager](/docs/collaborating-in-postman/roles-and-permissions/#team-roles) role to [create a new public workspace](/docs/collaborating-in-postman/public-workspaces/).
    * **Static button**: This button uses Markdown, so you can display it in a README, blog, or other Markdown document.

* You can optionally include an environment to embed with your collection. On the left, click the **Environment** drop-down and choose the environment.
* Click **Copy Code**.

![How to create a run in postman](https://assets.postman.com/postman-docs/how-to-create-run-in-postman-button.jpg)

Your embed code will include your collection's ID. In the examples below, **:collection_id** is a placeholder for that ID and **:collection_url** is a placeholder for url. If you choose to include an environment in your button, the code will also have the environment parameter.

**Sample markdown snippet:**

```markdown
[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/:collection_id)
```

**Sample HTML snippet:**

```html
<div class="postman-run-button"
data-postman-action="collection/fork"
data-postman-var-1=":collection_id"
data-postman-collection-url=":collection_url"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>
```

* Embed the code where you would like the button to be displayed.

![Run in postman](https://assets.postman.com/postman-docs/new-run-in-postman-button.gif)

> You can include an environment along with a collection in your Run in Postman button. The dynamic button gives you access to the [Run in Postman API](/docs/publishing-your-api/run-in-postman/run-button-API/) to create and modify environments.

Clicking **Run in Postman** button navigates to the page where you can fork the collection to your workspace. [Forking the collection](/docs/collaborating-in-postman/version-control-for-collections/) into your workspace will enable you to contribute to the source collection using pull requests. You can also view the collection in a public workspace if you like and even import a copy of the collection using the links present on the screen. All collections shared with the new Run in postman buttons come with [Fork counts](/docs/collaborating-in-postman/version-control-for-collections/#forking-information), that help you and your consumers understand how the API is being used.

<img alt="Fork collection for run in postman" src="https://assets.postman.com/postman-docs/fork-collection-for-run-in-postman.jpg" height="400px"/>

> Note: The live Run in Postman buttons automatically stay updated with changes in the original collection, so your consumers always get the most recent version of your collection without publishers having to manually update the collection's link.

## Next steps

Read more about the [Run in Postman API](/docs/publishing-your-api/run-in-postman/run-button-API/) and learn how to add and update environments with your button.
