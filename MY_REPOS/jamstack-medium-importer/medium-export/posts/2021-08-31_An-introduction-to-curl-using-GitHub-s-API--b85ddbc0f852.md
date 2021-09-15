# An introduction to curl using GitHub’s API.

An introduction to curl using GitHub's API.

---

### An introduction to curl using GitHub’s API.

#### An introduction to `curl `using <a href="https://gist.github.com/bgoonz/bc5d219c0cccbba674e232f5dab8f357" class="markup--anchor markup--h4-anchor">GitHub's API.</a>

**_CURL GIT_** <a href="https://github.com/curl/curl/" class="markup--anchor markup--p-anchor"><strong><em>REPO</em></strong></a>

<figure><img src="https://cdn-images-1.medium.com/max/800/0*MORqHd-XjD6oKRuq.gif" class="graf-image" /></figure>### The Basics

Makes a basic GET request to the specifed URI

    curl https://api.github.com/users/bgoonz

Includes HTTP-Header information in the output

    curl --include https://api.github.com/users/bgoonz

Pass user credential to basic auth to access protected resources like a users starred gists, or private info associated with their profile

    curl --user "bgoonz:PASSWD" https://api.github.com/gists/starred
    curl --user "bgoonz:PASSWD" https://api.github.com/users/bgoonz

Passing just the username without the colon (`:`) will cause you to be prompted for your account password. This avoids having your password in your command line history

    curl --user "bgoonz" https://api.github.com/users/bgoonz

### POST

Use the `--request` (`-X`) flag along with `--data` (`-d`) to POST data

    curl --user "bgoonz" --request POST --data '{"description":"Created via API","public":"true","files":{"file1.txt":{"content":"Demo"}}' https://api.github.com/gists

    curl --user "bgoonz" -X POST --data '{"description":"Created via API","public":"true","files":{"file1.txt":{"content":"Demo"}}' https://api.github.com/gists

Of course `--data` implies POST so you don't have to also specify the `--request` flag

    curl --user "bgoonz" --data '{"description":"Created via API","public":"true","files":{"file1.txt":{"content":"Demo"}}' https://api.github.com/gists

Here is an example that uses the old GitHub API (v2). You can use multiple `--data` flags

    curl --data "login=bgoonz" --data "token=TOKEN" https://github.com/api/v2/json/user/show/bgoonz

The post data gets combined into one so you can also just combine them yourself into a single `--data` flag

    curl --data "login=bgoonz&token=TOKEN" https://github.com/api/v2/json/user/show/bgoonz

You can tell curl to read from a file (`@`) to POST data

    curl --user "bgoonz" --data @data.txt https://api.github.com/gists

Or it can read from STDIN (`@-`)

    curl --user "bgoonz" --data @- https://api.github.com/gists
    {
      "description":"Test",
      "public":false,
      "files": {
        "file1.txt": {
          "content":"Demo"
        }
      }
    }
    end with ctrl+d

### Headers

Often when POSTing data you’ll need to add headers for things like auth tokens or setting the content type. You can set a header using `-H`.

    curl -H "Content-Type: application/json" -H "authToken: 349ab29a-xtab-423b-a5hc-5623bc39b8c8" --data '{}' https://api.example.com/endpoint

### Dealing with HTTPS

If an API doens’t have an SSL cert but is using HTTPS you can tell curl to ignore the security by using `--insecure`. Be warned this is a very "insecure" thing to do and is only listed here for "educational purposes".

    curl --insecure https://api.example.com/endpoint

For my own reference mostly, here is where I first learned about using `--insecure` <a href="https://github.com/wayneeseguin/rvm/issues/1684" class="markup--anchor markup--p-anchor">https://github.com/wayneeseguin/rvm/issues/1684</a>

### OAuth

The first thing to know is that your API Token (found in <a href="https://github.com/settings/admin" class="markup--anchor markup--p-anchor">https://github.com/settings/admin</a>) is not the same token used by OAuth. They are different tokens and you will need to generate an OAuth token to be authorized.

Follow the API’s instructions at <a href="http://developer.github.com/v3/oauth/" class="markup--anchor markup--p-anchor">http://developer.github.com/v3/oauth/</a> under the sections “Non-Web Application Flow” and “Create a new authorization” to become authorized.

Note: Use Basic Auth once to create an OAuth2 token <a href="http://developer.github.com/v3/oauth/#oauth-authorizations-api" class="markup--anchor markup--p-anchor">http://developer.github.com/v3/oauth/#oauth-authorizations-api</a>

    curl https://api.github.com/authorizations \
    --user "bgoonz" \
    --data '{"scopes":["gist"],"note":"Demo"}'

This will prompt you for your GitHub password and return your OAuth token in the response. It will also create a new Authorized application in your account settings <a href="https://github.com/settings/applications" class="markup--anchor markup--p-anchor">https://github.com/settings/applications</a>

Now that you have the OAuth token there are two ways to use the token to make requests that require authentication (replace “OAUTH-TOKEN” with your actual token)

    curl https://api.github.com/gists/starred?access_token=OAUTH-TOKEN
    curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com/gists/starred

List the authorizations you already have

    curl --user "bgoonz" https://api.github.com/authorizations

### Resources

- <span id="6a9d">HTTParty — Ruby library that makes it easy to create HTTP requests <a href="https://github.com/jnunemaker/httparty" class="markup--anchor markup--li-anchor">https://github.com/jnunemaker/httparty</a></span>
- <span id="1ba9">Hurl IT — An open source web application to play with curl options <a href="http://hurl.it/" class="markup--anchor markup--li-anchor">http://hurl.it</a></span>

By <a href="https://medium.com/@bryanguner" class="p-author h-card">Bryan Guner</a> on [August 31, 2021](https://medium.com/p/b85ddbc0f852).

<a href="https://medium.com/@bryanguner/an-introduction-to-curl-using-githubs-api-b85ddbc0f852" class="p-canonical">Canonical link</a>

Exported from [Medium](https://medium.com) on September 12, 2021.
