---
title: Wordpress to Middleman
presenter: James Stone
presenter_title: "Author & Blogger"
location: Wikia
description: "Lessons Learned, Switching from WordPress to Middleman, a Static Site Generator"
cover: /img/upcoming/james-stone.png
cmsUserSlug: wordpress-to-middleman
date: "2015-09-29"
---

### Interview with Author / Blogger James Stone on coming from Wordpress to a Static Site Generator.

This Tuesday Sept 29th, James Stone will be giving a talk on migrating from Wordpress to Middleman at the [Static Web Tech Meetup](http://www.meetup.com/sf-static-web-tech/events/225453139/) here in San Francisco at Wikia’s headquarters. (We highly recommend going to see him. Free entrance, Free food, lot’s of static web techies, what’s not to like).

So we thought we’d interview him a bit about his experience with Modern Static websites. We wrote it down too, so here goes:

__N: Hi James, thanks for joining us.__

J: Thanks for having me.

__N: First off. Who are you?__

J: I’m an author, blogger, video blogger and web developer.

__N: Awesome. When did you start coding?__

J: So my mum thought it was a great idea to teach me to code. This was the 1980s. I started on an Atari XL 1600 with a tape drive for audiocassettes and I kept going through junior high school and onwards. First developer job was at a startup in Seattle where I did Java.

__N: When the Internet took off, where you onboard from day 1?__

J: I was using Gopher (alternative protocol to http), and off the bat wasn’t too impressed, thinking it was just Gopher with images… Then of course soon after it exploded and I was all onboard.

__N: When was your first experience with Modern Static Web Tech?__

J: A couple of years ago I got really interested in performance. I was hosting Wordpress sites. I started with frontend improvement, but quickly got into tweaking the hosting server, going from Apache to Nginx and such. What I found was that even with manually optimizing caching with Wordpress, there is only so much performance you can get. So I started researching using static files, as I knew from early tests that I was getting 12 times better performance over Wordpress. That was without plugins or anything.
That led me to Octopress (static site generator build on top of Jekyll), which provides a very clear path for people coming from Wordpress.
However I’m very involved with Zurb’s Foundation (a CSS framework) and found the structure and theming to be a little too limiting.
That led me to Middleman, which was a good compromise to me as it on one hand had a pre-built blogging engine where you can just put down a lot of markdown files and Yaml, but on the other hand still gave me a lot of flexibility to build my own layouts and partials and just quickly get moving, as I already understood the front-end and where I wanted to go.

__N: Was getting started with Middleman hard?__

J: There are tutorials that make it really easy to get a basic blog up and running.
The next step is building templates and that was definitely easy as well.
But where I hit a strong learning curve, was when I needed to build back out the functionalities that I used and liked in Wordpress, like featured images, etc…
Fortunately tools like this are constantly being developed on.

__N: Which was the biggest jump - Wordpress to Octopress or Octopress to Middleman.__

J: Octopress and Middleman are in many ways similar, so the original shift from Wordpress was where I needed to learn the most.
From Wordpress to a static site generator there is a little bit of a disconnect because you no longer have a CMS.
All of your articles are like this weird markdown file with Yaml on top and if you make small mistakes it will break the build sometimes, so you do have to be a bit careful.

__N: All right, won’t go into more detail here as that’s for Tuesdays talk!
To take a step back again. What are your wishes for this new category of Modern Static Web Tech?__

J: From the point of view of a blogger, content creator and businessman my biggest wish is for a proper CMS. If you are a developer it’s easy to work with things as markdown and command line tools, but it’s not really super intuitive for most other people.
I can teach a non-tech guy to use Wordpress in a short time, and I don’t have to be around as the gatekeeper of the technology.
Without a CMS, it’s a hard sell. You can preach the amazing performance, but I often hear people say ’that’s great, but how do I update it?’
So I hope for an easy way of handing things of to editors and content contributors, etc.

__N: What is your biggest concern for the category of Modern Static Web Tech?__

J: Probably whether the projects such as Middleman or Assemble.io will stay active.

__N: Without going in too deep, what is your favorite project made with a static site generator?__

J: I think if I had to pick one, I’d probably pick [Discover Meteor](https://www.discovermeteor.com/) which is a book and a website by Sacha Greif. It’s really interesting to me for a couple of reasons.

First off, he is a designer by trade who then learned to code and got really into Meteor (javascript framework) but then chose Middleman as the tool to develop things like multilingual documentation for his book, as well as all the marketing pages for it.

Secondly, the site is very well designed. Often if you look at sites like Octopress sites, they are OK, but not very refined or polished design. So this site proved to me that Middleman could be used to make pixel perfect beautifully designed sites, and that static engines can be used for a lot more than just blog templates.

Thirdly, Sacha blogs about all the things he is doing with Middleman that are less obvious and more customized. So to me the site becomes a great tool for learning as well.

__N: Any parting words?__

J: Hopefully lots of people will come on Tuesday (Sept. 29, 7pm, Wikia HQ, San Francisco) and hear me talk about going from Wordpress to a Static Site Generator. I’ll be showing code examples, and will tell about my approach that might be quite a bit different from what most people are used to.

__N: Thanks for taking the time to talk with us, and see you Tuesday!__

J: No problem, see you then!
