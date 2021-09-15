# GitHub Protips: Tips, tricks, hacks, and secrets from Luke Hefson

> With Luke Hefson’s many different roles at GitHub, he’s learned about tons of hacks and protips that he can’t wait to share with you.

![](https://github.blog/wp-content/uploads/2020/05/github-protips-luke-hefson.png?fit=1200%2C630)

_This is a part of a series of posts featuring protips from GitHubbers for improving productivity, efficiency, and more._

* * *

Hey yo!

At one time during my career at GitHub I was lucky enough to work on a project called [Paper Cuts](https://github.blog/2018-08-28-announcing-paper-cuts/). During that time I had lots of wonderful users reach out to me about how they use GitHub. I discovered a ton of existing hacks and protips for using the website that I didn’t yet know—as well as some great ideas that we ended up working on that were really cool, if not a little low-key. Here are some of those existing tips, paper cut solutions, and newer features that we hope you love.

Issue template config options[](#issue-template-config-options)
---------------------------------------------------------------

Perfecting the planning and tracking process on GitHub can make all the difference between "oh gawd how can I possibly triage all of the things" and "I can actually bear to look at my open source projects."

We’ve got a bunch of cool new things in store for you in the planning and tracking space coming soon, but in the meantime, here are some cool things you can do using the [issue template config](https://help.github.com/en/github/building-a-strong-community/configuring-issue-templates-for-your-repository#configuring-the-template-chooser) to make sure that issues coming _into_ your repositories are concise and helpful. Some fantastic projects such as [VS Code](https://github.com/microsoft/vscode/blob/master/.github/ISSUE_TEMPLATE/config.yml), [Homebrew](https://github.com/Homebrew/brew/issues/new/choose), and [React](https://github.com/facebook/react/blob/master/.github/ISSUE_TEMPLATE/config.yml) are already using them.

A plethora of deep links[](#a-plethora-of-deep-links)
-----------------------------------------------------

One day I’m going to sit down and write my magnum opus, "The Art of Deep Linking on GitHub", but until that day, here are a few ways you can use IDs hidden within GitHub to share a link with someone that goes _directly_ to the most-relevant content:

Other links for sharing[](#other-links-for-sharing)
---------------------------------------------------

The following are some little-known search queries that I find super useful.

*   You can use `@me` to share search queries that resolve to the current user and combine that with different code review states. This is great for [sharing](https://github.com/pulls?q=is%3Apr+review-requested%3A%40me) with the rest of your team so that everyone can check in on their own progress.
*   Sometimes a keyword search across the contents of all issues and pull requests can return too many results. Scope it down by just searching for an issue or pull request’s title using [`in:title`](https://github.com/search?q=baby+shark+in%3Atitle+is%3Aissue).
*   Forgot what _kind_ of interaction you had with an issue or pull request? I use [`involves:@me`](https://github.com/search?q=involves%3A%40me) ALL. THE. TIME.

I loved [Lee’s must-have Markdown formatting](https://github.blog/2020-04-09-github-protips-tips-tricks-hacks-and-secrets-from-lee-reilly/#6-must-have-markdown-formatting-tips) tips from a previous post. A couple of extra ones that I like are:

*   Adding a simple, nicely-styled line between chunks of text with `---`. I find this useful when I want to make a few unrelated points in the same comment thread without having to drop a new comment (and therefore new notifications to anyone watching). I just drop in a line between points in the same comment.
*   Often overlooked, if you have write access to a repository, you can create a new issue from a comment by clicking on the comment’s kebab icon and selecting `Reference in new issue`. GitHub even automatically pre-fills the placeholder text with a reference to the issue comment and who originally posted it!  
    [![](https://i1.wp.com/user-images.githubusercontent.com/1469659/81556328-0ceb4c00-9382-11ea-9468-12074762bdea.gif?resize=1200%2C630&ssl=1)](https://i1.wp.com/user-images.githubusercontent.com/1469659/81556328-0ceb4c00-9382-11ea-9468-12074762bdea.gif?ssl=1)

It’s so much fun to share these with you. I hope you find some use out of them. Stay groovy! ![👋](https://s.w.org/images/core/emoji/13.0.1/svg/1f44b.svg)

Do you have a GitHub Protip?[](#do-you-have-a-github-protip)
------------------------------------------------------------

Do you have a tip, trick, or hack that makes your daily life easier on GitHub? Share it with us on social media with [#GitHubProtips](https://twitter.com/search?q=%23GitHubProtips&src=typed_query).


[Source](https://github.blog/2020-05-14-github-protips-tips-tricks-hacks-and-secrets-from-luke-hefson/)
