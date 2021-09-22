Netlify comes with built-in form handling that’s enabled by default. Our build bots do it by parsing your HTML files directly at deploy time, so there’s no need for you to make an API call or include extra JavaScript on your site.

## [#](https://docs.netlify.com/forms/setup/#html-forms) HTML forms

Code an HTML form into any page on your site, add `data-netlify="true"` or a `netlify` attribute to the `<form>` tag, and you can start receiving [submissions](https://docs.netlify.com/forms/submissions) in your Netlify site admin panel.

Your form’s `name` attribute determines what we call the form in the Netlify app interface. If you have more than one form on a site, each form should have a different `name` attribute.

Here’s an example:

When Netlify bots parse the static HTML for a form you’ve added, they automatically strip the `data-netlify="true"` or `netlify` attribute from the `<form>` tag and inject a hidden input named `form-name`. In the resulting HTML that’s deployed, the `data-netlify="true"` or `netlify` attribute is gone, and the hidden `form-name` input’s `value` matches the `name` attribute of `<form>` like this:

### [#](https://docs.netlify.com/forms/setup/#submit-html-forms-with-ajax) Submit HTML forms with AJAX

You don’t have to, but you can submit static HTML forms using AJAX.

A static HTML form submitted this way must have `data-netlify=true` or a `netlify` attribute inside its `<form>` tag.

Here’s an AJAX form submission example using the `fetch` API for a static HTML form:

Requirements for the request:

-   The body of the request must be URL-encoded. In the above example, the form is passed to a `FormData` constructor. That object is then encoded using the `URLSearchParams` constructor and converted to a string. Note that Netlify forms do not support JSON form data at this time.
-   If the form accepts alphanumeric data only, the request should include the header `"Content-Type": "application/x-www-form-urlencoded"`. If the form accepts [file uploads](https://docs.netlify.com/forms/setup/#file-uploads), the request should instead include the header `"Content-Type": "multipart/form-data"`.

## [#](https://docs.netlify.com/forms/setup/#javascript-forms) JavaScript forms

You don’t need to include extra JavaScript on your site to use Netlify Forms. But, if you want to, you can use JavaScript to render a form client-side. You can also submit JavaScript-rendered forms over AJAX.

### [#](https://docs.netlify.com/forms/setup/#work-with-javascript-rendered-forms) Work with JavaScript-rendered forms

Our buildbots find your forms by parsing the HTML of your site when the build completes. This means that if you’re using JavaScript to render a form client-side, our buildbots won’t find it in the pre-built files. You can work around this:

-   Create a hidden HTML form with the `data-netlify="true"` attribute or a `netlify` attribute and input fields with `name` attributes to match the inputs of your JavaScript-rendered form. You need to apply the same work around if you want to use our [reCAPTCHA 2 integration](https://docs.netlify.com/forms/spam-filters/#recaptcha-2-challenge), and create a `div` element in the hidden HTML with the `data-netlify-recaptcha="true"` attribute.
    
-   Add a hidden input to the JavaScript-rendered form or JSX form:
    

You can also find related tutorials on our blog:

-   [How to Integrate Netlify’s Form Handling in a React App](https://www.netlify.com/blog/2017/07/19/how-to-integrate-netlifys-form-handling-in-a-react-app/)
-   [How to Integrate Netlify forms in a Vue App](https://www.netlify.com/blog/2018/09/07/how-to-integrate-netlify-forms-in-a-vue-app/)

While the two articles are fairly framework-specific, the code demonstrates how to prerender forms when working with them in a web application.

### [#](https://docs.netlify.com/forms/setup/#submit-javascript-rendered-forms-with-ajax) Submit JavaScript-rendered forms with AJAX

To submit a JavaScript-rendered form built with a framework like Gatsby or Nuxt, you can send an AJAX `POST` request to any path on your site. Requirements for the request:

-   You need a function to URL-encode your form data in the body of the request.
-   If you haven’t added a hidden `form-name` input to your JavaScript-rendered form, you need to send a `form-name` attribute in the AJAX `POST` request body.
-   If the form accepts alphanumeric data only, the request should include the header `"Content-Type": "application/x-www-form-urlencoded"`. If the form accepts [file uploads](https://docs.netlify.com/forms/setup/#file-uploads), the request should instead include the header `"Content-Type": "multipart/form-data"`.

Here’s an AJAX form submission code sample using the `fetch` API for a JavaScript-rendered form. It uses Gatsby’s `navigate` function to redirect to a custom page on form submission success.

For a JavaScript-rendered form, you need to add a hidden `input` with `name="form-name"` to the returned form elements. Here’s an example:

In the code sample above, a `handleChange` function updates the form’s state, which ultimately gets sent in a `POST` request to Netlify.

## [#](https://docs.netlify.com/forms/setup/#success-messages) Success messages

By default, when visitors complete a form, they will see a generically styled success message with a link back to the form page. You can replace the default success message with a custom page you create by adding an `action` attribute to the `<form>` tag, entering the path of your custom page (like `"/pages/success"`) as the value. The path must be relative to the site root, starting with a `/`.

## [#](https://docs.netlify.com/forms/setup/#file-uploads) File uploads

Netlify Forms can receive files uploaded with form submissions. To do this, add an input with `type="file"` to any form.

Here’s a sample HTML form with a file upload field:

### [#](https://docs.netlify.com/forms/setup/#limitations) Limitations

Keep the following considerations in mind when working with file uploads in forms.

-   Only one file upload per field is supported. For multiple file uploads, use multiple fields.
-   There is no file size limit, but file uploads time out after 30 seconds.

### [#](https://docs.netlify.com/forms/setup/#submit-file-uploads-with-ajax) Submit file uploads with AJAX

To submit a form with file uploads over AJAX, the request headers should include `"Content-Type": "multipart/form-data"` instead of `"Content-Type": "application/x-www-form-urlencoded"`. This applies to both HTML forms that you submit with AJAX and JavaScript-rendered forms that you submit with AJAX.

Here’s an AJAX form submission code sample using the `fetch` API for the above HTML form with file upload:

## [#](https://docs.netlify.com/forms/setup/#more-forms-resources) More Forms resources

-   [Spam filters](https://docs.netlify.com/forms/spam-filters)
-   [Form submissions](https://docs.netlify.com/forms/submissions)
-   [Form notifications](https://docs.netlify.com/forms/notifications)
-   [Troubleshooting tips](https://docs.netlify.com/forms/troubleshooting-tips)
-   [Forms usage and billing](https://docs.netlify.com/forms/usage-and-billing)