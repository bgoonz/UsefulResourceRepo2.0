# Performance Budgets During the Web Development Process

> How can we stick to our ideals in the midst of a project when reality hits? Read why you should also care about performance mitigation.

As the art of “developing the internet" evolves, we are continually reminded that performance, [design](https://bradfrost.com/blog/post/performance-as-design/), [revenue](https://neilpatel.com/blog/loading-time/), and user satisfaction are all [tightly linked](https://wpostats.com/). Some of us try to plan for these things by setting up [performance budgets](https://timkadlec.com/2013/01/setting-a-performance-budget/) and tracking [budget metrics](https://timkadlec.com/2014/11/performance-budget-metrics/). These are all great proactive things that you should be doing now. Seriously, go do them! They help align project goals, set clear benchmarks, and help us all make decisions around how—_or if_—features are added.

What happens after you make your performance budget? How do you “stick with it?" Often times as projects continue, our ideals begin to fade into the past and become more flexible. The goals we proudly stake on a hill suddenly look far away and become, “Oh, those kickoff goals? I remember those…" Our pages become heavier as more features are piled onto the original concept. Scope creep begins to set in, and the next thing you know, your beautiful creation feels more like it just ate [two Thanksgiving feasts](https://giphy.com/gifs/n0qlD0snofyq4) and is eating [Swedish Fish Oreos](https://www.today.com/food/we-tried-swedish-fish-oreos-here-s-what-we-thought-t101768) on the couch.

So, how can we manage this? How can we stick to our ideals when reality hits? What tools have we seen or used that help mitigate the onslaught of “code-coma?" At Sparkbox, we have adopted the concept of performance mitigation. Really, what that means is that we use tools and services to ensure that our code stays lean and fast, both during and after development has happened.

Whistle While You Work
----------------------

One of the easiest (and quickest) ways to help enforce performance budgets while you develop is to integrate them into your [favorite](https://github.com/tkadlec/grunt-perfbudget) [task](https://www.npmjs.com/package/gulp-louis) runner or [npm script](https://www.npmjs.com/package/loadtest). Automated performance testing is easy to set up and goes a long way in preventing our “code-coma" feeling. [Adam Simpson](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/author/adam_simpson) wrote a great article on [how to get a quick version of WebPageTest and Gulp playing nicely together](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/automating_performance_testing_with_gulp). Integrating these simple tasks will help keep you mindful of performance goals and get you started toward a performance-oriented workflow.

However, testing user flows, page load time, asset compilation size, and regression testing are all things you don’t want running every time you save a file. Instead, integrate performance testing into your normal development workflow by utilizing git hooks and CI tasks.

### Hook Me Up

Creating [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) allows you to ensure that before or after you do any git-related action (commit, push, pull, rebase, etc.) a certain thing happens. This way, you will never push up code that will break your [performance budgets](https://media1.giphy.com/media/3o7WTJMjG44pEebcJy/200.gif)! There are a [few](https://elijahmanor.com/npm-precommit-scripts/) [ways](https://gist.github.com/dflynn15/00b5ffdee1163eea8e3129c1b96f0528) to do this, and you should do whatever gets you to flagging failing builds quickest. Even if your team doesn’t use a continuous integration system, or if they are hesitant to do any “major overhaul," git hooks can provide the easiest first step toward adopting performance mitigation!

### Stop, Wait a Minute!

Similarly to git hooks, you can use your CI to prevent deployment, prevent PR’s from being merged, or email [sad](https://media3.giphy.com/media/ranYEm93P1Tl6/200.gif) [panda](https://media2.giphy.com/media/NGeLmk28cxthS/200.gif) [gifs](https://giphy.com/gifs/BLQCL4p78lRcc) to the perpetrator. Regardless of what CI you use ([Jenkins](https://jenkins.io/), [Travis](https://travis-ci.org/), [Circle CI](https://circleci.com/), etc.), adding a simple check before deployments is a quick, easy way to utilize existing workflows to flag bad performance. We have used Circle CI at Sparkbox for a long time in [continuous deployments](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/better_products_through_continuous_delivery) and to ensure code quality. It’s [easy to setup](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/code_quality_tools), and with Github’s ability to [prevent branches from being merged](https://github.blog/2015-09-03-protected-branches-and-required-status-checks/) without passing tests, we always know that our `master` branch is [lean and kicking](https://giphy.com/gifs/OjlJMu3Z1v2Eg)!

Get by with a Little Help from Our Friends
------------------------------------------

Immediate responses to performance hits are super helpful, but they rarely occur that way in real life. Normally, we see a progressively slow intake of more features, more code, more styles, more… wait. Yep, we are back on the couch with the oreos. This is an inevitable scenario even if we are diligently alert for benchmark breakers.

What we need is a tool that can monitor our sites, show us when things started becoming slower, and (if we are lucky) we could even give some cool analytics on how it’s performing over time. Great news! There are plenty of tools (like [SpeedCurve](https://speedcurve.com/)) that can help you do [just that](https://media0.giphy.com/media/26tnjM0YMVVNrXi5a/200.gif)!

SpeedCurve is a feature-packed service that helps pinpoint breakdowns in performance over time. Having comparative analytics from [different devices](https://speedcurve.com/?d=30&m=speedindex&r=us-west-1&s=299&u=906), places in the world, and even how your site [compares to your competitors](https://speedcurve.com/?b=apple-ipad&d=30&m=speedindex&r=us-west-1&u=906) can help you begin to see where your weaknesses are.

Getting empirical data over a long period of time can help you make smart decisions without making assumptions on why your site has become slow. As you begin to make changes to improve performance, SpeedCurve can help show how iterations have helped certain metrics while potentially hurting others.

More importantly, setting it up is simple and provides another easy tool to keep fighting the “code coma!" Oh, and did I mention it has Slack integration?

All Around the World People Want to Be Loved
--------------------------------------------

While this is all super helpful, pretty much everything we have been talking about has involved a single user’s load time. What about when you have a bunch of users all accessing your site at once? Ever had a child jump on your belly after said Thanksgiving feast? Yeah, it’s kinda [like that](https://media1.giphy.com/media/Gg5Osgm0FgogM/200.gif) if we don’t also consider performance from heavy load. After all, a ton of users on your site is everyone’s dream problem, so let’s make sure we are ready when we get [Reddit famous](https://media3.giphy.com/media/26AHBF6lObXvlwkFi/200.gif)!

Even when we are the most diligent about making wise, performance-minded frontend decisions, we can still have a [painfully slow](https://media0.giphy.com/media/l2JHVUriDGEtWOx0c/200.gif) site if we have ignored the backend response! There are [a lot of amazing tools](https://tools.pingdom.com/) out there to help load-test a backend configuration, so instead of letting you [drown](https://media3.giphy.com/media/xT5LMwK8Cgz6zYw4mY/200.gif) in Google results, we’ll [pull out a few](https://media0.giphy.com/media/g5ovwSjzj69Hi/200.gif).

For an easy-install CLI with more flags than the Olympics, you can’t get much better than [Apache Benchmark](http://httpd.apache.org/docs/current/programs/ab.html) (otherwise fondly referred to as `ab`). This amazing tool allows you to concurrently request page(s) and gives you a report back detailing the weight and time it took to render a page per request. So, in order to test how your website would respond to 500 users suddenly hitting your page, all you have to do is `ab -c 500 http://www.yoursite.com`.

While this seems kind of boring, the information it gives back can start to tell you how many users your site can take before it begins to drown in requests and potentially not return any response at all. Better yet, try this same test after you clear any caches. If you are caching your responses, you’ll see the first few requests be slower, and then response times will [speed up](https://media4.giphy.com/media/VvsiMcXscqoyQ/200.gif)! It’s a little thing, but it is empirical evidence that your cache is actually working and helping you serve up quick sites!

Lastly, I would be remiss if we didn’t talk about [Load Impact](https://loadimpact.com/). At Sparkbox, we use Load Impact to load test sites before we ever deploy live. Their tool allows us to test concurrent users in many geographical areas (very, very difficult with `ab`), playback a user scenario or action path, and then dump out a response in our Slack channels! Did I mention it has a CLI that you can use to hook into the CLI tasks we talked about before?

Money, Money, Money
-------------------

Hopefully, this will get you started in finding actionable items to mitigate the “code coma" and begin to adopt a performance-mitigation workflow. While setting up these tasks and watchers are easy, powerful steps, we still need to continue being educated on how our technology decisions and practices affect performance. If you are not already, make sure you follow [Tim Kadlec](https://timkadlec.com/) ([go watch his Maker Series video](https://buildright.io/maker-series/2015/tim-kadlec?_ga=2.125374158.590831522.1570450256-237861656.1563387832#video)), [Katie Kovalcin](http://kovalc.in/), [Lara Hogan](https://larahogan.me/), [Sophie Shepherd](http://sophieshepherd.com/), and anyone who ever comes on [Path to Performance](https://pathtoperf.com/).

Much like we said last month, performance, like [progressive enhancement](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/Progressive_Enhancement_Is_A_Team_Sport), is a great weapon that can help or hurt you without a team helping mitigate the onslaught of “code coma." Take time to educate yourself and the people around you. Collaborate and encourage each other as you battle the great code bloat!

Oh, and remember: take simple, easy steps toward adopting a performance-minded workflow. There’s no need to go implement every single thing listed right now. Adopt each piece one at a time, evaluate how it helps your team, and remember no site can become performant overnight! It’s the little things that will help you move toward performance mitigation and eventually help you save [so](https://www.youtube.com/watch?v=ai-6qwT6ES8&feature=youtu.be&t=462) [much](https://medium.com/ft-product-technology) [money](http://radar.oreilly.com/2008/08/radar-theme-web-ops.html) and create [better](https://instagram-engineering.com/performance-usage-at-instagram-d2ba0347e442#.u3py6x7m6) [experiences](http://glinden.blogspot.com/2006/11/marissa-mayer-at-web-20.html) for your users.


[Source](https://sparkbox.com/foundry/performance_during_development)
