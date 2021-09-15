---
title: Launching Jekyll 3.0
presenter: Parker Moore
presenter_title: "Software engineer & prime maintainer of Jekyll"
location: Wikia
description: "The worldwide launch of Jekyll 3.0 with Parker Moore, live from Wikia in SF"
cover: /img/presentations/parker-moore.jpg
youtube: "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/sPZK8w55cBQ?rel=0\" frameborder=\"0\" allowfullscreen></iframe>"
speakerdeck: " "
cmsUserSlug: launching-jekyll-30
date: "2015-10-26"
---

Parker Moore actually launched the biggest release yet of Jekyll (3.0), the most popular static site generator in the World.

Great session, great Q&A, and awesome to see it live.  And we got the whole thing on tape! After the jump, read the full transcript.

To celebrate the release, we hustled and got a tutorial together on [how to host a Jekyll 3.0 site](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-30-on-netlify) with automatic builds from a GitHub repo on netlify.

[Read it here](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-30-on-netlify).


<!-- excerpt -->
- [Christian Bach] Welcome to our third meetup, of Static Web Tech Meetup. We are super excited to be able to launch Jekyll 3.0. It will actually be launched today, so you're seeing it go live in a few minutes. Parker Moore is the prime maintainer and has written pretty much all of Jekyll. And we're super excited to have him here today. Without further ado, welcome to Parker Moore.

- [Parker Moore] That was very gracious, thank you. As Christian said, I'm here to talk about Jekyll 3. Which I'm really excited for, and has been 10 months, 11 months almost, in the making. The last release of Jekyll was in December of 2014, so it's long awaited. And I'm really excited to share it with you, so thanks so much for being here. I'm really, really grateful for your time.

As Christian said, I'm Parker. I'm @parkr on things. So there's me during a photo walk with my company, which is VSCO. VSCO makes art and technology, or, is a art and technology company. We build a series of different products. Our most popular being VSCO Cam, which is a way you can make your photographs extraordinary. More extraordinary than they already were. I do server side things here, and I really love it. So if you're interested, come talk to me about VSCO too.

It's been a journey, you know? But I didn't stop believin'. And I'm excited, I'm really excited. So Jekyll, Jekyll/Jekyll, the main repo, has nearly 500 contributors. As of today, it was like almost 490, 488 contributors. 488 different user accounts on GitHub, which, amounts, basically, to people in this case, have contributed to Jekyll. Which is, to me, huge. And absolutely, I had no...I did not...I thought Jekyll was gonna die when I took it over. I was like "Oh, I'll bring it back to life." But I thought everyone was gonna be like "Ruby, it's slow, it's horrible." etc. But people have stuck around and I'm really happy and grateful for that. As you can see, people are excited about contributing back and making Jekyll better. And there are also lots of bugs, so people find those.

The community is very strong as well. Jekyll Talk was created a few months ago. Talk.jekyllrb.com, you should check it out if you're not already on it. It's a great discussion forum, it's a Discourse instance where you can ask questions and you can answer questions. It's sort of like our own little mini Stack Overflow just for Jekyll. There's a post to share the sites that you've created, to share plugins you've created. We're really trying to make it as easy as possible to connect, and get answers, and get inspired about static sites in general.

It's still popular. Like I said, had no idea that it was gonna have almost 22,000 stars. And have 4600 forks. It's just, it's twice as, I mean, I just don't know how that's possible. So, thanks to everyone who uses it. I means a lot to me. And I hope this release is something that you enjoy.

The core team is four people, four guys. @envygeeks, Jordan Bedwell. @alfredxing, Alfred Xing. @mattr, Matt Rodgers. And myself. We're always looking to expand the core team, so if you have spare time. We're especially looking to add some diversity to the faces here. So if anyone has extra time, even three or four hours a week, and is interested in getting their hands dirty and maybe taking over an aspect of the core: plugins, or site generation, or reading, or anything, then get in touch with me and I'd love to see you guys join the core team. We have about 6,000 commits, most of which happened recently. Over 4,000 issues and pull requests, which still boggles my mind. I was looking this up today, and between all of the, the Jekyll gem proper, which is only like 1.6 million downloads, which is still decent, but all of the plugins too, add up to 6.5 million downloads of Jekyll-related stuff. Which, again, just blows my mind. And is really just humbling.

It's used by heaps of people every day, through GitHub pages, Netlify, Surge, CloudCannon, any of these wonderful companies and services that are offering you access to Jekyll's power without having to deal with the installation process, or without having to deal with too many changes locally.

It started out, primarily, as a way, it was originally called autoblog, if you go to the very first commit of Jekyll, I found this out a couple months ago and thought it was hilarious. The very first commit of Jekyll is like module autoblog, it was supposed to generate blogs. That's what the original purpose was. So it's been used for many blogs since and still is, my personal site is Jekyll. But now it's being used for serious business.

This is policy.cio.gov, this is from the Office of Management and Budget in The White House in the United States. This, to me, is absolutely insane. People are interested in collaborating in over Prose and using Jekyll to present it. To me that just is absolutely incredible. I'm really interested in making it stronger, more powerful, making it more flexible, and a better experience for everyone. Today is the best release yet. Steve Jobs always said "Today we have the best x yet." "This is the best Mac yet." And Tim Cook still uses that. I think it's great because every iteration is gonna be the best, unless you go backwards I guess.

- [Voiceover] No regressions.

- [Parker] Hopefully no digressions, yeah, or regressions. I'm gonna talk about the features real quick. There's this feature called incremental regeneration. What that basically means is we keep a cache of the last time we built your site. And we check the cache against your local, whatever is locally, and we see what's changed, then we only build what's changed. This is kind of experimental at the moment. It works pretty well, but there are some dependency, you have to build this whole big dependency graph, and some of those dependencies aren't quite complete. But it works for me for the most part. It's disabled by default in 3.0, but easily accessible with the incremental flag, and or -I. I hope you check it out and file bug reports and hopefully pull requests as well, and make it better. This is, probably, the most requested feature, I think issue 405 or something like that, some very early issue, from six or seven years ago, was "Hey, you built a site, you know how it ended up. "Can you possibly build only the things that I change? "It's getting slower when I have 1,000 posts." We're really excited about that.

This is a feature that randomly showed up one day in the pull requests, but it's probably, I would argue, the most powerful feature in Jekyll 3. This is the Liquid profiler. So if you pass --profile to jekyll build or jekyll serve, you'll get an understanding of how much time, how many bites were generated, and how many times a given file was run through Liquid. We're in plans to move this as well to any converters you have: Markdown, or Textile, or Sass, or whatever you have. So you also get that time factored in, so you can see if maybe, something in Markdown is really slow. Maybe you're outputting something very big, and because it's not in HTML then it has to crawl the whole thing, and it's taking three or four seconds for one post, when it shouldn't. So this is really, really powerful. This was made by a guy, fw42 is Florian Weingarten, a Shopify guy who has worked on Liquid for a while and is really great. So check this out. If you're site's slow, first thing you should do is run --profile and check to see the timings and check to see if you're getting massive, massive, massive output anywhere. If you're generating 3 megabites on a file, then, A) that's a lot to serve to your users, to your visitors, but also, it takes a while to generate and to write to disk and to read from disk, etc.

We have this new plugin API, Hooks. This is probably the most powerful change that plugin developers will notice. There's some other changes as well. This basically allows you to plug into, to hook into, various parts in the generation pipeline. So, Jekyll reads and then it renders and then it outputs, right? Sort of this three step process. Now you get access to a series of different hooks, series of different actions, before and after. For example, there's site-post-init, that's triggered at the end of the init method in the site. So if you are interested in modifying a site or adding pages, or doing anything, right after that initialization step, modifying anything, then this is the hook for you, etc. They're all listed under docs/plugins/#hooks in the documentation. I highly recommend this. This has saved a lot of time. I know Jordan, envygeeks, has rewritten Jekyll assets to use a lot of this for 3.0, because it makes it so much easier to plug into the rendering process, and to get to modify your content at the time that you want, instead of just monkey patching, and going crazy that way. So that's exciting.

And there are lots and lots and lots of other changes. We've dropped support for Ruby 1.9.3. We've added support for Ruby 2.2 which made some timezone changes. I wrote a blog post about that if you're interested. Windows support is way better. All the dependencies have been pared down significantly. So there's no C by default, I mentioned this earlier. There's no C by default, so Windows users should be a lot happier. It should install a lot more quickly and painlessly.

You can use extension-less URLs. What that basically means, and I use this on my personal site, is you don't need to include the extension for HTML pages. It generates a .html file in the output site, but when you type like post.url, or page.url, you won't have that extension. And that's activated via the permalink configuration option.

The default highlighter is now Rouge instead of Pygments. Pygments is a Python library and it can get slow or be weird. Right now to install Jekyll, you need myriad dependencies. You need Python, you need NodeJS, or therubyracer, or something, you just need a lot of stuff. And Rouge is pure Ruby, it's a new lexer for code highlighting. So it's been much, much better. And a little faster as well. So we're excited to announce that that's the new default.

There're 15 or 20 pull requests that went into the process of Jekyll 3, or that are going into Jekyll 3, that are about performance improvements. The number one complaint that we hear from our users about Jekyll 3, or about Jekyll in general, Jekyll 2 in particular, is that it's slow. If you have a thousand posts, it can take three or five minutes if you have lots of includes, then what you're doing is you're hitting the disk every time you need that file. So it can be kinda slow. We've done a lot of work to optimize the performance of Jekyll to make things smarter, to cache things. Incremental regeneration makes things so much faster. Please do check that out.

I took very little time to talk about everything. My request to all of you wonderful people, is to contribute to Jekyll if you can. Whether it's the jekyll new template has been modified significantly and has been, hopefully, improved. So anytime you generate some new basic Jekyll site, you'll get this new improved version. That's all in the core, so if you see any changes you could possibly make to make that better, to make it simpler, make it easier for newcomers etc., then please do contribute. Documentation as well. You'll see on the top of any documentation page, "Improve this page," it's a button. It's a link that you can click and it'll go into GitHub and allow you to edit that content and send us a pull request. I look at every single issue or pull request that comes in. And would love to see your faces in the pull requests.

There are lots and lots of ways to learn about Jekyll, to talk with us, and to get involved in the community. I would like to take your questions on the features, because I know I didn't explain everything, but I tried to give a kind of high level so that I could spur questions.

That's a great question. The question, for anyone who's listening to the recording, was "Are there any parts of Jekyll that you think could use "some eyes, any parts in particular that could use some work? The whole thing, generally. But in particular, our pipeline is pretty basic, it's just serial. We read, we generate, we render, and we write. So it's input/output wrapped around the regeneration process which is also serial, first it does your Liquid, then it does your Markdown or your Textile or your CSS or whatever. So I'd love to see improvements there. There've been suggestions around using something called, or using Liquid's drop class. Which allows, only when you ask for do we generate it, kind of, and then they cache it as well. So that could be a way of sort of of improving the process, instead of being very naive, which is the way the core is.

 We've really wanted for 3.0 to make everything as compatible, backwards compatible, as possible. Because, and I'm sure you can sympathize with this, the worst thing in the world is to write something one day that doesn't work the next because some jerk like me released some change that broke your site. I notice that all the time whenever there are changes with any of the tools that I use. And tools that you depend on shouldn't break you without your consent, at the very least. Which is why we're doing Jekyll 3, because there's that one site.collections change where, when you iterate over it, that's the collection itself instead of an array containing the label in the collection.

 So I would say, if you're interested in something meaty? The generation process, the renderer class, could use a lot of love. That would speed up everyone's sites, site generation, as well. Then, any of the dependencies. We're always looking to speed it up. We're always looking to make it faster. Always looking to make it smarter. Incremental regeneration definitely needs a lot of love around building the dependency graph. So if you have any knowledge of that, and of how that works, then that would be terrific. Does that answer your question?

- [Voiceover] Yeah,

- Cool, cool. Yeah. And you can always reach out to me, my email's on my GitHub profile. I deleted my Twitter, 'cause it was too much noise for me. But you can also @mention jekyllrb on Twitter to get a hold of us. What other questions might you have?

- [Voiceover] Do you think there's a place where needs more attention than any other place?

- I think, as a missing feature, templates is a big piece. It's a gigantic thing that we've talked about, and just hasn't made it in yet. Templates is hard. If you've used Octopress at all, Octopress is a great example of Brian Mathis running a bulldozer, who's a great guy, @imathis, running a bulldozer through Jekyll and making it work. Not "bulldozer" destructively, but "bulldozer" constructively, in that he's made themes work. So you can release an Octopress, I think it's called an Octopress Ink, you can release an Octopress Ink gemified theme that then your Jekyll users or any of your site builders, can use automatically with just jekyll build, it just hooks in. I think you add it to the gem file. He's making a lot of improvements. Octopress is a wonderful test bed for a lot of Jekyll changes, a lot of Jekyll modifications, Jekyll improvements. Any commands, any, you know, this sort of thing. I would love to see that fold into Jekyll at some point, theming.

I think people are already making themes right now, things like Jekyll Bootstrap, that's really popular and really wonderful because it sort of gives you everything right there and you run bundle install and then you run bundle exec jekyll build, or jekyll serve, and you go to localhost:4000 and you're good.

So I'd love to see improvement there. I would really love to see improvement there. It's just not, the concept's not built into core yet. And we're not quite sure how to do, you kind of have to, you have to understand where all the files are that you have to copy over to the site. Or when you give it a theme, I mean, this is a big rabbit hole obviously. So I won't go too far! Won't shave the yak too far, but. You have to kind of understand how you're gonna generate the site, is it a Git repo that you clone like right now? Or should it be something that is pure and is kind of like jekyll new right now. But you're about to give it some theme URL or something. An easy place to start would be, if you give jekyll new a theme flag, and you give it some argument like a Git repository, like Jekyll Bootstrap for example, Github.com/, is it mmistakes who does that? Then it could clone that into some temporary directory, pull out all the files that you need, and then put it in the new directory that you want. But it's a little convoluted.

If you have any thoughts on themes, there's an issue that you can find, just search "themes" in the issues and add your thoughts. Needs a lot of work, we'd love to see it in Jekyll 4. Who knows if it's gonna happen? The future is the contributors' to behold. I only kind of occasionally nudge the ship by accident.

- [Voiceover] What's your greatest wish for 4.0? Like, if time wasn't an issue?

- If time wasn't an issue, I would rebuild the whole thing. As most developers would say about anything that they wish that they could improve.

- [Voiceover] Puts to rest that assumption.

- Yeah! So if I have all the time in the world, then I would rebuild it. I'd rebuild it in a way that makes it way faster. And makes it way more extensible. I would love to be able to, like, if you could ship a jekyll - binary, the way that you have git -something, then you could ship your own subcommands that way. I would love to be able to use plugins that are executables. That just like, take in like, a protobuf, or some structured, like JSON or something, and then you can de-serialize that and then you can modify the site and then you send it back in some, you send it back and it sends it back into a serialized way back to Jekyll, and then it just like, I would love to be able to see a way to to make a lot of the user interface better. And make plugins easier. I'd love to see themes. There are so many things that Jekyll can do to improve. And if I had all the time in the world, I would love to take on one or two of them.

- Doing a major release?

- [Voiceover] Major release once

- We're interested in doing a major release any time there are, definitely sooner. Yeah, yeah, yeah. I tried to release Jekyll 3 in April. And then there was this one pull request, posts, we've changed the site.post, instead of an array, it's now a collection. So it behaves just like any other collection you might have. That one change I did on Sunday, yesterday, so I hope it works. I tested a lot. So I was just waiting on that. 'Cause that can be a breaking change in a lot of ways. That changes access patterns, that's a deprecation. If it weren't for that, you would've had Jekyll 3 way earlier.

- [Voiceover]before something else?

- That's a great question. Something imminent, that could be 4.0. We tend to release new features as minors, minor bumps, so it'd be 3.1, 3.2, 3.3, etc. So anything that breaks sites would be 4.0, or any major upheaval of core that would break most plugins, for example, as well.

- [Voiceover] So solution oriented, because backward compatibility is what drives that.

- Right.

- [Voiceover] It depends on what you have to do.

- Right. So I'm interested in avoiding Python 2.7 vs. Python 3's experience, where no one's upgraded to Python 3. "No one," people have upgraded. But you might not upgrade an old Django site, for example, to Python 3 because it's just too big a task. And it's just silly things like print changes from, print requires parenthesis now, and you're like "Okay." Or you know, whatever changes they might have added. I'm interested in avoiding major breaking changes such that no one wants to use it. Or that people don't want to upgrade what they already have to it. So I tried to avoid things like that in 3.0. If I could break things, and if everyone in the world was so excited about Jekyll 4, like they're excited about iPhone 6s, which didn't really change very much anyway, then I would probably do this gigantic refactor, I think I could do it within a year, of the render pipeline, and make it all the more powerful. It would break probably every plugin, ever. But I would love to do that.

- [Voiceover] It might be possible to build you know, conversion scripts that would work for most people to just go through and find the things you had to recode, stuff like that.

- That's true, that's true. Conversion scripts would be possible. We have a jekyll doctor command. Did you guys know that there was a jekyll doctor command? The way that there's like Brew doctor? So basically, whenever we decide to maintain it, it'll go through your site and it'll say, it'll read your site and it'll process your site and it'll say "Something crazy happened!" Or like, "There are two posts, two pages going into "the same directory, one's gonna overwrite the other. "Fix that." I would love to be able to use that for "Hey, collection[0] is now collection. "You might want to fix that." But I'd have to be able to tap into the Liquid pipeline, I'm not sure I would be able to do that. At any rate. Yes.

- [Voiceover]

- So the question, as I understand it, is basically, is there some sort of taller end to the long tail? There are all these tiny little issues.

- [Voiceover] Yeah, yeah. Something above just the changes or fixes?

- Not that I can think of. We try to do a pretty good job of saying like, "There are three issues that have come in for this, "people are hitting the same problem "from different directions, let's fix this soon." So I can't think of one off hand. I'm sure something's there. And I just haven't looked through the old issues in a while. That's another, if you would like to be an issue archaeologist, that would also help me a lot. 'Cause I do get every notification, I look at every notification I get from GitHub. If you are interested in creating a cluster or something. I can add you as a member of Jekyll such that you can add tags and labels and such.

- Yeah, so the comment was, JRuby every few weeks does a release where they discuss the simple beginner issues that people can dive into. You can check that out and then whether or not you know the code they might help you around. That seems like a great idea. I would love to do something like that. It's just a matter of time. If anyone's interested in doing more of the meta stuff on top of Jekyll, like collecting issues, and triaging, we need a lot more help than you might know.

- I really like help.github.com. Which is a Jekyll site. I helped a little bit with them, buidling it out. But they have this search integration which works really well. Where you can type in like, "jekyll," I can't type Jekyll. And you get a series of things that pop up. I think this is a wonderful site to start out with. That said, it's closed source. If you're interested in an open source site, I would recommend, not my work. There's this sites page in the wiki. Have you guys seen this before? You guys have? Cool. I think the best way to learn about Jekyll is to read other sites, and to just like poke around and see what's going on. This is a long list of sites and their sources, and their respective sources. So you can look at the code on github.com, or Bitbucket, I think it's all GitHub, but.

In this case, they've forked Jekyll and made their own changes to Jekyll so that they can generate their site. And they link to that as well. I think this is a great place to get started to learn more about sites and to see some of the best. GitHub guides, guides.github.com, is great. Then things like Project Open Data. What I like about a lot of these sites, especially Project Open Data, and anything that The White House or 18F are doing, is that they're generally, like, simply powerful. They're not using too many plugins, they're just sort using the features that Jekyll has built in. And doing so to great effect, I think. Does that answer your question?

- [Voiceover] Yeah.

- One weird thing that we did with Jekyll was, at work we send emails using a service that I helped build, so when your forgotten password, or something like that, for VSCO, all of those email templates are built with Jekyll and run through a Jekyll plugin that runs it all through premailer and outputs it and does all that gunk. Then it builds this Go template source so then our Go program can slurp it in and fill in the blanks and send it out to you. That's probably the weirdest thing I've ever used Jekyll for, personally.

I can't speak to anything all that weird. People use it to generate configuration files. Because you can use Liquid really easily, and because you can go from A to B, if you write a plugin that takes like, Builder, and outputs XML with that, Builder's a common XML generation DSL kind of, from railsland, that I've used in railsland. Then you can generate your Jenkins configury, I don't even know! You can do anything you want. Because it's basically: take this, here's my data, here's my templates, and like, squash and fill it out. It's such a basic idea, and there are 800 static site generators as you can see, so it's an idea that people really like and people wanna tailor to their own needs. You can do quite literally anything with it. You can generate, there's a Jekyll Opal plugin you can generate, you can write Ruby and output your JavaScript for your website. If you're interested in using Jekyll as a build pipeline for front-end JavaScript. You can do anything.

I think what I like about it as well, and what makes it powerful is that because it's just HTML, CSS, and JavaScript, you can kind of get those three things, then you can build, depending upon your static site generator, you can build plugins and stuff for it, and it makes it more powerful. Because you just sort of get those three technologies, HTML, CSS, and JavaScript, you can use JavaScript to do pretty much anything you want. You can use Jekyll to slurp up CSV input, or JSON input, or YAML input from campaign finance reports, and you can output that in your layout or in your file or whatever, and then have D3 come in and animate it and present it in a beautiful, wonderful way. It's this simple sort of input, transformation, output that I think makes it so powerful.

- [Voice] Who is creator of Jekyll?

- Who is the creator of Jekyll? Jekyll was created originally by Tom Preston-Werner, who is a cofounder of GitHub. He quickly took on one of his, I think at the time, colleagues, Nic Quaranto, qrush, "crush," on GitHub, and they built it for the first several months with some other help from other GitHubbers. But, I would say Tom Preston-Werner is the original creator. He was the guy that has the first commit.

- [Voiceover] What was the year it was?

- 2008.

- [Voiceover] When did you join the team?

- I joined in December of 2013. So, it was a number of years after he had built it. I joined when it was 0.12.1, I think. So it was before the 1.0 release. I was about to go do an internship in Germany where I had all of a sudden, this free time, because I wasn't in school anymore, I didn't have to do like homework assignment after homework assignment. So, wrote Tom three or four emails. Including one which was an open letter, and I sent him a link to it. So, speaks to, persistence will get you anything you want. Including the maintainership of a large open source project. He said come to, I was coming to San Francisco for a week to visit my sister who lives here, and said come in and hang out. So we did. And then he gave me access. So it's only in the last two years that we, less than two years, that we've shipped 1.0, 2.0, and now 3.0. So we're really excited it sped up. If you look at that contributions graph, too. You see a lot of the changes happened in 2013, 2014, 2015. Where some like, young naive schoolkid was like "I'll just spend every waking moment on this thing!" My escape from homework was to build Jekyll.

- [Voiceover] Did you end up changing the _posts collection to just be another collection in Jekyll 3?

- We did, we did, yeah. So we changed it to be another collection, but there was one major hitch. Which is, right now you can categorize posts by putting it in a subfolder. Say you're writing a multilingual site. You have English and you have Spanish. You can write an en/, you can have a directory en/_posts, and then es/_posts and put your respective posts in there and have it automatically apply en and es respectively as a category to your posts in those directories. That was a major breaking change that collections right now do not support. So instead of possibly breaking a lot of sites that may have used underscore to hide something or whatever, we've used the collection as the back-end but it still works exactly as it was. There might be some deprecation warnings from plugins that's like "Hey, instead of using "site.post.each, you used site.post.docs.each." Because the docs is now the array of your documents, of your posts. But other than that, it's all pretty much, it's all identical. I really, I really dislike and feel really bad every time someone writes an issue that's like "Hey, I upgraded to the new version, I was really excited about it. You totally squashed my happiness because I just got this big red blob of text that told me something was wrong and I didn't really understand why." Part of that's error messaging, but part of it's also just, don't break sites please. Like, move very slowly and don't break anything, is kind of how I've done Jekyll 3 at least, with the exception of the one change with site.collections. Does that answer your question?

- [Voiceover] Yeah.

- [Parker] Awesome. In the spirit of doing fun things with my friends here, I'm gonna release Jekyll 3 right now. With you all here.

- [Voiceover] Whoop whoop!

- You guys excited?

- [Voiceover] Yeah.

- [Voiceover] Yeah.

- [Parker] Woo!

- [Voiceover] Whoa.

- Okay. So to do a release...

- [Voiceover] Do you wanna check the issues before you do it? There might be a problem.

- [Parker] Shh! That's true, that's true! This guy Paul Robert Lloyd has been doing a lot of wonderful work today. Like there's some defaults bug. And I was like "I just gotta fix it." Or, "I just gotta release it." It might be a teensy bit buggy, but like, pretty much everything will work. If you notice something though, please search the issues and please, if you don't see anything, file something. The only way that I know your sites are broken is if you tell me. Because my site is super basic and doesn't do anything interesting. Because I don't wanna spend that much time talking about myself.

- [Voiceover] Do you guys have a suite of really complicated sites that you test against, or is it just the user test?

- [Parker] We do not currently we don't have a suite of tests, or a suite of sites that we test against. One thought, if I had all the infrastructure in the world, would be to take that sites list, that wiki sites page, which has like 8 or 900, if not a thousand, sites on it, take their source, if they have one, and pull it down and run it. And see what breaks. And just yeah, see what happens. It's a pretty big time commitment. Just in terms of running it, would take a long time, and then parsing through the output and fixing things. People are pretty vocal about, like when you break stuff people love complaining on the internet. This is a thing, this is kind of a secret. It's a hidden secret of the internet: people love complaining. So, writing an issue, people are pretty good about generally telling me when I've done something bad. And I say I'm sorry. And then, hopefully, fix it. That's one thing that the Liquid team, from Shopify, were interested in. Like "Hey! You say Liquid's really slow but like "do you have any sites that we could use to make it faster?" So they're changing some of their sites to be Jekyll internally. And the Shopify guy Florian, like I mentioned, built that profiler. So he was like "Now we can tell, this is how much time "each file individually is taking."

We're gonna add this. Whatever. How often does Git complain to you guys? It's the worst! The worst! Once I've done that, I make sure that the history looks okay. The worst thing in the world is to have a Git tag, and to have a gem pushed out that you can't pull. You can yank it, but then you have to change the version. And then notice that your site was bad or something. So that works. If I go to the... Okay, there's version 3.0. What's this link here? 3-0-0 with hyphens. See? I knew I would catch something! This is probably the most boring thing you've ever watched.

- [Voiceover] This is the best part.

- [Parker] This is the best part? I'm honored. So instead of dots, it wants me to use hyphens. Because reasons So we're just gonna do that. Now I can do bundle exec rake release. I'm crossing my fingers

- [Parker] ♫ I hope it works ♫

- [Parker] Nope.

- Command failed git tag. Oh, because I didn't update the version. Silly head. "To release a new version, please update the version." Lib, commit, amend. I'm the worst about changing my commits after I make them. Everything you know on github.com is a lie. At least in this repo. Push the changes. Pushed version 3.0. Gem push! Dun duh duh daa! It's done, woo!

Just to finish up, I want to thank everyone here for showing up, because you took an hour of your life that you didn't have to to come listen to me jabber? Yam-? Speak? About Jekyll 3. And thanks everyone who has contributed and who's ever used Jekyll. You are the heart and the soul of this project. And you guys rock. And you gals rock. And everyone rocks. So, thanks so much! Can you close it out?

- [Christian Bach] Yup. That was really exciting, man. You got to see that live? Way you did the whole thing, and there was a little error, and I was like. When we make the video, we'll put some music under it Anyway, that was. Thank you so much, guys, for coming. That was really exciting, thank you so much to Parker, for coming and doing this live with us. That was so cool, man. Thanks so much to Wikia for hosting us, once again. And yeah, have a great evening, and I hope to see you again next time. Cheers.