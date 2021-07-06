---
title: "Coding with Run in Postman"
order: 110
page_id: "run_button_API"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Intro to Postman API"
    url: "/docs/developer/intro-api/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Intro to scripts"
    url: "/docs/writing-scripts/intro-to-scripts/"
---

Some API publishers use Run in Postman buttons alongside their own API documentation. If users input data in a developer portal, for example, the Run in Postman API can dynamically inject this provided information as environment variable values into the embedded Run in Postman button.

The Run in Postman API uses the `_pm()` method to create or modify environments in your website's client-side code through existing dynamic Run in Postman buttons.

As another example, you can use the API to pass login credentials to Postman:

```javascript
_pm('env.create', 'Spotify', {
  user_id: 'spotifyuser',
  authorization: 'Bearer 1234xyzd'
});
```

## Contents

* [Creating a new environment](#creating-a-new-environment)

* [Editing an existing environment](#editing-an-existing-environment)

* [Replacing an existing environment](#replacing-an-existing-environment)

* [Using multiple buttons](#using-multiple-buttons-with-separate-environments)

* [Next steps](#next-steps)

## Creating a new environment

Use the `env.create` method to create a new environment:

```javascript
_pm('env.create', 'environment_name', {key: value}, runButtonIndex);
```

> `env.create` cannot be used to create duplicate environments. Calls made with existing environment names will fail.  

Create a new environment using API keys entered by your user:

```javascript
function () {
  var stagingKey = document.getElementById('staging-key-input').value,
    productionKey = document.getElementById('production-key-input').value,
    runButtonIndex = 0,
    envData = {
      stagingKey: stagingKey,
      productionKey: productionKey
    };

  _pm('env.create', 'API Keys', envData, runButtonIndex);
}
```

The `env.create` action will return true on success, false on failure.

## Editing an existing environment

Use the `env.assign` method to modify an environment:

```javascript
_pm('env.assign', 'environment_name', {key: new_value, new_key: value}, preventDefault, runButtonIndex)
```

> The `env.assign` method works for environments that were included in the Run in Postman button when it was created, or environments that were added using the `env.create` method.
> `env.assign` cannot be used to create new environments. Calls made using `env.assign` will fail if an environment does not already exist.

Update an environment's API keys:

```javascript
function () {
  var stagingKey = document.getElementById('staging-key-input').value,
    productionKey = document.getElementById('production-key-input').value,
    preventOveride = true;
    runButtonIndex = 0,
    envData = {
      stagingKey: stagingKey,
      productionKey: productionKey
    };

  _pm('env.assign', 'API Keys', envData, preventOveride, runButtonIndex);
}
```

The `env.assign` action will return true on success, false on failure.

## Replacing an existing environment

Use the `env.replace` method to replace an entire environment:

```javascript
_pm('env.replace', 'environment_name', {key: value}, runButtonIndex)
```

> `env.replace` cannot be used to replace an environment which does not exist.

Replace an environment:

```javascript
// Existing environment named 'user_data'
{
   auth_token: 'q4yugoiwqu4habddef3897ryq3891s',
   user_id: '823',
   session_data: {}
}

// Replace the 'user_data' environment
_pm('env.replace', 'user_data', {});
```

The `env.replace` method will return true on success, false on failure.

## Using multiple buttons with separate environments

You can embed multiple buttons on a single page. If you want to include a different environment in each button, enable the `segregateEnvironments` property.

```javascript
_pm('_property.set', 'segregateEnvironments', true);
```

> If `segregateEnvironments` is enabled, you will have to use `runButtonIndex` in all pm() methods to reference each button according to its position in your page [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). Because `segregateEnvironments` is disabled by default, `runButtonIndex` is optional by default.

### Including the index

If `segregateEnvironments` is enabled, you'll have to use `runButtonIndex` in all pm() methods to reference each button according to its position in your page [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). The `runButtonIndex` is represented by an integer.

```javascript
var runButtons = Array.prototype.slice.call(document.getElementsByClassName('postman-run-button')),
  runButtonIndex = runButtons.indexOf(elem);
```

### Using the index for jQuery

```javascript
var runButtonIndex = $('postman-run-button').index(elem);
```

## Next steps

Learn how to [create API documentation](/docs/publishing-your-api/documenting-your-api/) from Postman, and then add your documentation to your [public workspaces](/docs/publishing-your-api/publishing-your-docs/).
