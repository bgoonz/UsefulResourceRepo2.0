# GitHub Protips: Tips, tricks, hacks, and secrets from Brian Douglas

> Make better contributions, triage your issues efficiently, save time with saved replies, and more with @bdougie’s protips.

_This is the fifth in a series of posts featuring protips from GitHubbers for improving productivity, efficiency, and more._

* * *

Hi, I’m Brian Douglas and you may know me from my _All Things Open_ talk on [finding your next open source contribution](https://www.youtube.com/watch?v=lSb5GCA2jxA&list=PLpURC3VhaQD0QkE1uRsGX7gMayocniv5s&index=28) or [being GitHub’s #1 Beyonce fan](https://www.youtube.com/watch?v=Ei0no8s84EM&list=PLpURC3VhaQD0QkE1uRsGX7gMayocniv5s&index=20).

So many repositories on GitHub depend on open-source, so I’m sharing some tips and tricks on how you too can get involved and position your projects to be more approachable for contributors.

Contributing[](#contributing)
-----------------------------

Today open source is ubiquitous and comprises nearly 80% to 90% of the code in a typical application. Based on [GitHub’s 2019 Octoverse](https://github.blog/2019-11-06-the-state-of-the-octoverse-2019/), the average project is dependent and built on roughly 180 open source packages. There’s a clear need to use open source to stay competitive, and I’ll begin by focusing on how contributors can become better contributors—even if it’s their first time contributing.

### Join the conversation[](#join-the-conversation)

There are established steps for [orienting yourself to a new project](https://opensource.guide/how-to-contribute/#orienting-yourself-to-a-new-project), and I recommend all of them. Above all, locating the project’s preferred platform or channel for synchronous communication with contributors can improve and even fast-track your way to your first or next contribution.

Approaching open source can be ambiguous, especially when lacking person-to-person interaction. My tip is to meet the people behind the project prior to contributing. Your introduction and mentorship into the codebase will be much easier after having established a personal connection. Speaking from experience, this is the best way to prevent yourself from working on something that’s no longer valid.

Consider following the project’s public Twitter and joining their Discord. Ultimately, be sure to build rapport and community.

### Finding contributions using "/contribute"[](#finding-contributions-using-contribute)

The [good-first-issue](https://github.blog/2020-01-22-how-we-built-good-first-issues/) label is a feature that’s somewhat known among contributors to find their next contribution. These labels are applied by maintainers to draw the attention of individuals looking for new contributions, but what if I told you there’s an easier way to find issues like these?

[GitHub launched the contribute feature](https://github.blog/2020-01-22-browse-good-first-issues-to-start-contributing-to-open-source/) earlier this year to provide a cohesive list of unassigned introductory issues that are ready for engagement, even if they have yet to be labeled good-first-issues. Visit any GitHub project using the `github.com/<owner>/<repository>/contribute` URL, where you can find beginner-friendly issues for that project. For example, you can find ways to make your first contribution to `nodejs/node` at [github.com/nodejs/node/contribute](https://github.com/nodejs/node/contribute).

![](https://i2.wp.com/user-images.githubusercontent.com/5713670/80671119-c3376300-8a5d-11ea-84ef-fd94860986fa.png?ssl=1)

### Use project boards to triage issues[](#use-project-boards-to-triage-issues)

[GitHub project boards](https://github.com/features/project-management/) are mostly associated with…GitHub projects, but you might not be aware that you can make a project board for your GitHub profile. Navigate to the projects tab on your profile to create a project that tracks open source issues you’d like to work on by pasting the issue URLs into a card.

![](https://i1.wp.com/user-images.githubusercontent.com/5713670/80671122-c7638080-8a5d-11ea-9d11-44a2a2b782e1.png?ssl=1)

This can be super useful if you spend a lot of time triaging and forget which issues you were looking at yesterday.

### Smash that star and click subscribe[](#smash-that-star-and-click-subscribe)

Leveraging the subscribe button on issues of interest can be helpful in locating conversations you may want to follow up on. This also helps if you are using the [GitHub for mobile app](https://github.com/mobile) or the new Notifications dashboard. By default, subscribed issues populate your dashboard.

You can adjust filters on the notification tab by showing only issues you participate in using `reason: participating` or issues you’ve opened by using `reason:author`.

The Notification search bar is powerful and can be leveraged in a number of ways. [Find plenty of in depth examples in the Help Docs.](https://help.github.com/en/github/managing-subscriptions-and-notifications-on-github/managing-notifications-from-your-inbox#custom-filter-limitations)

Maintaining[](#maintaining)
---------------------------

Maintaining an open source project can require a unique set of skills. There are ways to level up those skills while building a path for contributions.

Automation is a tool that just keeps giving. The wonder of focusing on the things you want to do and removing focus from the things you don’t want to do is the maintainer’s dream. Perhaps you can join me on the path to enlightenment and get back to work on interesting problems after you have automated common tasks away.

![](https://i2.wp.com/user-images.githubusercontent.com/5713670/80671138-d5b19c80-8a5d-11ea-8ae1-96b0859ab568.png?resize=497%2C437&ssl=1)  
Photo credit goes to [xkcd/1319](https://xkcd.com/1319/)

### Automate your project administration with GitHub Actions[](#automate-your-project-administration-with-github-actions)

GitHub Actions is a powerful tool that provides space to conduct automation to your heart’s desire. Whether you’re trying to trigger events based on labels, or auto-merge pull requests when your unique CI passes, consider leveraging a GitHub Action.

The [github-script](https://github.com/marketplace/actions/github-script) action allows you to write JavaScript directly in your workflow files, which is pretty powerful. GitHub provides a **GITHUB\_TOKEN** to access read-only and limited write permissions.

[Release Drafter](https://github.com/marketplace/actions/release-drafter) is my preferred way to stay up to date on what pull requests are merged and who contributed, a chore I now automate thanks to this particular GitHub Action.

### Curate topics on your repository[](#curate-topics-on-your-repository)

Gaining new contributors and growing a community for your project can be mysterious. With the topics feature, you can grow engagement organically by having the project appear in a curated list of your choice. As mentioned in [Lee’s previous tip](https://github.blog/2020-04-09-github-protips-tips-tricks-hacks-and-secrets-from-lee-reilly/#7-url-hacking-topics), you can apply topics to your repository, but I encourage you to consider curating a topic by adding a pull request to [github/explore](https://github.com/github/explore/blob/master/CONTRIBUTING.md).

Sometimes, conversations between maintainers and contributors are optimal for a canned response. For projects just getting started, or with limited bandwidth to invest in automation, consider creating saved replies. Saved replies tackle your most frequently asked questions.

![](https://i1.wp.com/user-images.githubusercontent.com/5713670/80671147-dcd8aa80-8a5d-11ea-974d-1de4922c2e28.png?ssl=1)

### Triage role[](#triage-role)

Last year [GitHub unveiled additional roles](https://github.blog/changelog/2019-05-23-triage-and-maintain-roles-beta/) for organization management. This change gave us the triage role, which can be used in our open source projects as an introduction to contributing. Not all projects have the same documentation or approach to code contributions, which is why triaging issues and pull requests can be the perfect way to onboard new contributors. If you’re interested in how a project incorporates this role into their onboarding, check out the [expressjs/express](https://github.com/expressjs/express) onboards new triage contributors in this [OpenJS office hours](https://www.youtube.com/watch?v=OfFpI3vZlhY&feature=youtu.be).

* * *

Thanks for reading my tips for both open source contributors and maintainers, and I hope that you solve at least one problem with the tools I shared!

**Bonus tip:** If you’re interested in diving deeper into how to optimize the perfect open source workflow with Code Search, Security Advisories, or Advanced GitHub Actions tips, join me at the first-ever virtual [GitHub Satellite](https://githubsatellite.com/), where I’ll go into more detail on [how to leverage GitHub as a project maintainer](https://githubsatellite.com/speakers/#brian-douglas).

[![](https://i1.wp.com/user-images.githubusercontent.com/5713670/80671212-098cc200-8a5e-11ea-95cc-ca1dbcb9ff28.png?ssl=1)](https://githubsatellite.com/speakers/#brian-douglas)

Do you have a GitHub Protip?[](#do-you-have-a-github-protip)
------------------------------------------------------------

Do you have a tip, trick, or hack that makes your daily life easier on GitHub? Share it with us on social media with [#GitHubProtips](https://twitter.com/search?q=%23GitHubProtips&src=typed_query).


[Source](https://github.blog/2020-04-30-github-protips-tips-tricks-hacks-and-secrets-from-brian-douglas/)
