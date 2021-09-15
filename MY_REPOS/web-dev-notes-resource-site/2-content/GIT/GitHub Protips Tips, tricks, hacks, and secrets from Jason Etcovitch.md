# GitHub Protips: Tips, tricks, hacks, and secrets from Jason Etcovitch

> From GitHub Actions and magic URLs to gists, check out Jason Etcovich’s top ten tips and tricks to help you hack your GitHub experience.

_This is the third in a series of posts featuring protips from GitHubbers for improving productivity, efficiency, and more._

* * *

Hello ![👋](https://s.w.org/images/core/emoji/13.0.1/svg/1f44b.svg)! I’m a big proponent of the GitHub API, and building integrations to extend your workflows. I’m sharing a few features, tools, and projects to help you explore a ton of awesome potential for building on top of GitHub, and customizing it to your needs.

GitHub Actions and Probot[](#github-actions-and-probot)
-------------------------------------------------------

While this is more of a topic than a tip,  you’ll be hooked once you start building automation tools. GitHub Actions and Probot are separate projects with the shared goal to enable developers to extend GitHub functionality by eliminating boilerplate (like authentication and handling webhook events) and providing helpful abstractions. If you’re interested in learning more, I wrote a few [blog posts](https://jasonet.co/) about the specific features of each, but here’s a quick description of the two:

### Run your automation tool with Actions[](#run-your-automation-tool-with-actions)

GitHub Actions is a runtime for "doing stuff" when things happen in your repository. It’s really that vague, because you can run whatever code you want in a virtual machine, run by GitHub. A standard example is CI, but I like to focus on the more interesting bits, like tweaking and improving your workflows with the help of robots. For example, my team uses [JasonEtco/create-an-issue](https://github.com/JasonEtco/create-an-issue) to create a weekly meeting notes issue every Monday morning. There are a ton of amazing GitHub Actions out there—and tools to help you build them. If you’re interested in building Actions, check out [actions-toolkit](https://github.com/JasonEtco/actions-toolkit), an opinionated toolkit that I created for building Actions. I’ve even used it to create a few different Actions like [is-sponsor-label-action](https://github.com/JasonEtco/is-sponsor-label-action) and [action-record](https://github.com/JasonEtco/action-record/).

![](https://i2.wp.com/user-images.githubusercontent.com/10660468/79356022-6fc8ff00-7f0c-11ea-8eab-85569d63ac51.png?ssl=1)

You should also check out [actions/github-script](http://github.com/actions/github-script), an awesome action that lets you write JavaScript, with an authenticated GitHub API client, directly in your workflow YAML file.

### Build GitHub Apps with Probot[](#build-github-apps-with-probot)

Next, Probot is a framework for building GitHub Apps, integrations on top of GitHub. There are a few use-cases when you might [choose Probot instead of Actions](https://jasonet.co/posts/probot-app-or-github-action-v2/). It focuses on webhook-driven events, so when something happens on GitHub, your Probot app can take action. Here’s a little-known fact for you: The [official GitHub/Slack integration](https://slack.github.com/) is actually a Probot app! But there are way more scoped examples, including [congratulating first-time contributors](https://github.com/behaviorbot/welcome), [drafting release notes](https://github.com/release-drafter/release-drafter), or [turning your TODO comments into issues](https://github.com/JasonEtco/todo).

![](https://i2.wp.com/user-images.githubusercontent.com/121322/79163388-d4ad1980-7d93-11ea-92d8-f72fea81fb11.png?ssl=1)

Magic URL extensions[](#magic-url-extensions)
---------------------------------------------

### Get a user or organization’s avatar[](#get-a-user-or-organizations-avatar)

You can get the avatar of any GitHub user or organization by visiting `https://github.com/<username>.png`! This is useful when you’re building websites or designs that rely on GitHub accounts, like [All Contributor’s table view](https://github.com/all-contributors/all-contributors#contributors-), or [Probot’s app catalog](https://probot.github.io/apps/stale/).

![](https://i1.wp.com/user-images.githubusercontent.com/10660468/79352857-5b830300-7f08-11ea-944e-5f3e34544cf9.png?ssl=1)

**Fun fact:** This actually returns a JPEG, not a PNG, but nothing on the Internet appears broken (yet).

### Get the patch or diff of a commit or pull request[](#get-the-patch-or-diff-of-a-commit-or-pull-request)

When I was first building [todo](https://github.com/JasonEtco/todo), I needed a way to get a particular commit or pull request’s diff. As it turns out, that’s super easy to do—in your browser, you can even add a couple of characters to the end of a URL:

    https://github.com/<owner>/<repo>/commit/<sha>.diff
    https://github.com/<owner>/<repo>/commit/<sha>.patch

And you can do the same with pull requests—check out [this example](https://github.com/integrations/snappydoo/pull/8.diff).

Pinned Gists are portals to Narnia[](#pinned-gists-are-portals-to-narnia)
-------------------------------------------------------------------------

Last year, we added support for pinning Gists to your user profile. And since Gists have an API, we can use that feature in really interesting ways to pin "dynamic" content to your profile. Using GitHub Actions, we can update a Gist on a schedule. Here are several examples:

*   [activity-box](https://github.com/JasonEtco/activity-box)
*   [bird-box](https://github.com/matchai/bird-box)
*   [waka-box](https://github.com/matchai/waka-box)

![](https://i1.wp.com/user-images.githubusercontent.com/10660468/79355434-a4888680-7f0b-11ea-8d80-8fabf3f6543f.png?ssl=1)

### Build your own pinned Gists[](#build-your-own-pinned-gists)

I built a helper library called [gist-box](https://github.com/JasonEtco/gist-box), and if you want to build your own, check out [awesome-pinned-gists](https://github.com/matchai/awesome-pinned-gists) for more.

**Fun fact:** The GitHub Education team launched the [Pins to Win competition](https://github.blog/2019-06-03-pin-gists-to-win-a-github-education-backpack/) last year, encouraging students to promote themselves and their projects on their profiles through pinned gists. There were [tons of great entries](https://github.blog/2019-06-03-pin-gists-to-win-a-github-education-backpack/).

Delete branches when they’re merged to master[](#delete-branches-when-theyre-merged-to-master)
----------------------------------------------------------------------------------------------

This isn’t a tip so much as a really great feature, but since it’s fairly new I want to highlight it. In your repository settings, you can enable **Automatically delete head branches**, which deletes the head branch of pull requests that are merged. Unless you rely on long-lived branches that also get merged in pull requests, this is a quick improvement. You can always restore the branch if you want, so there’s no risk. Personally, I always delete my branches right away, so why not automate it.

Get "anything" through the GraphQL API[](#get-anything-through-the-graphql-api)
-------------------------------------------------------------------------------

This is a bit of a niche trick, but it can be extremely helpful when you’re building integrations on top of the GitHub API. If you have a URL to a resource (like a repository or an issue) then you can write one GraphQL query to return a bunch of information about it:

    query ($url: String!) {
      resource (url: $url) {
        __typename
        
        ... on Repository {
          nameWithOwner
        }
        
        ... on Issue {
          title
        }
      }
    }

If the `url` is for a repository, it returns an object with the `nameWithOwner` property. If it’s an issue, it returns the title. This can be useful when you only have a URL. Note that this doesn’t work with every single URL on GitHub—check out the [docs for `resource`](https://developer.github.com/v4/interface/uniformresourcelocatable/)!

If you aren’t familiar with GraphQL, get started with the [GitHub API docs](https://developer.github.com/v4/). You can also play around with GitHub’s GraphQL API with the [GraphQL Explorer](https://developer.github.com/v4/explorer/).

Thanks for reading, I hope this assortment of cool stuff is helpful! Feel free to reach out on [Twitter](https://twitter.com/JasonEtco) if you have any questions or ideas you want to chat about ![✨](https://s.w.org/images/core/emoji/13.0.1/svg/2728.svg)

Do you have a tip, trick, or hack that makes your daily life easier? Share it with us on social media with [#GitHubProtips](https://twitter.com/hashtag/GitHubProtips).


[Source](https://github.blog/2020-04-16-github-protips-tips-tricks-hacks-and-secrets-from-jason-etcovitch/)
