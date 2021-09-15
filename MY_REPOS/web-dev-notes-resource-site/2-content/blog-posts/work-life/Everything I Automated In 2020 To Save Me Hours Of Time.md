# Everything I Automated In 2020 To Save Me Hours Of Time

> Quick automations that I profit from each and every day.

Quick automations that I profit from each and every day.
--------------------------------------------------------

[

![keypressingmonkey](https://miro.medium.com/fit/c/96/96/1*CHnrMntDNLyOq30R_3DTYQ.jpeg)



](https://keypressingmonkey.medium.com/?source=post_page-----14510a1a17d0--------------------------------)

![](https://miro.medium.com/max/60/0*r20jNek_BvxqtLGU?q=20)

![](https://miro.medium.com/max/12032/0*r20jNek_BvxqtLGU)

Photo by [Nathan McBride](https://unsplash.com/@nathan_mcb?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

2020 was a great year for me — this little annoyance of a global pandemic aside. I moved out of the city, have five months left at my job, automated my life, sit here now with an uncertain future and all the freedom I could wish for.

Life’s a tumble, but overall I kind of like it — and having the mind space that automation affords me plays a great role in that. So here is what I automated this year to save me hours of time, effort, menial work.

The most important thing that I did in 2020 was to go one step further and made sure to run all my scripts at system startup. Having automations is nice and all, but if you still need to click the script, worse even need to navigate through the console and run a python script you end up wasting time — and more importantly you waste mind-space.

And it is all so easy, all you need is a single .bat file that contains a couple lines like this: start “path\\to\\file.py/.bat/.exe” “parameters” “you may” “need”.

Then place that file into your autostart folder — or better still: Have it in your Google drive folder and just place a shortcut to it on every device you use.

Most scripts do not take a long time to run, or they can easily run in the background on modern computers. For example I have a whole bunch of Selenium automations that can run “headless”, meaning that they are invisible and you can keep working like normal, just with slightly reduced power.

On my desktop computer I do not even notice a slow-down when I get to work even though my scripts take the first five or ten minutes to run — it is just a no-brainer that saves me a lot of time and mental capacity. Set things up once, keep running everything automatically ever after.

![](https://miro.medium.com/max/60/0*eM0oW3NyRrzWdxCs?q=20)

![](https://miro.medium.com/max/9704/0*eM0oW3NyRrzWdxCs)

Photo by [Quinten de Graaf](https://unsplash.com/@quinten149?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

Now to get to the first real automation: An automated content creation pipeline. What this does for me is to keep all my writing projects organized, set them up, structure them and back them up — and that all took just an afternoon to set up.

I use a Trello board as my main contact point, each time I add a new card with a post title I trigger a zapier job that will create a text file in Google Drive for me. Depending on the board the subfolder will be different, but they are all part of my Git project that I use to save all my writing files. Just place that git repository inside your Google Drive and the new files will be automatically added to your change list, that is very convenient.

The text file is already named like my Trello card, then I have a Python script that creates a subfolder of the same name and moves the .txt file inside, renames it to Markdown format (great for writing and sharing!) and puts the title as the first line with a headline Markdown notation for me.

As you can probably tell this already saves me a great deal of time for every single post that I create — at least five to ten minutes of super annoying, menial work. It also allows me to place all images directly with the post inside that subfolder — plus I know that I never forget to turn an idea into a project skeleton.

The more I write, the more useful this becomes — and as I said it only took me a lazy afternoon to figure out and set up so I am already deep in the profit zone on that.

If you are like me you have a lot of different things going on — something new and shiny always comes along. Checking stats is an important part of keeping track — but it costs a ton of time to do manually.

However it is very simple to automate the pulling of statistics using Python and Selenium — and now you can suddenly push them all to a daily spreadsheet, even send out an email to yourself so that you can read your stats on the train to work.

I work between different devices a lot, either my main computer or my Microsoft Surface tablet. This works almost fluently using either Github or Google Drive — but I often found that I would bring my tablet out of the bag as the train sets off and realize that I forgot to push my changes from my desktop computer the night before. That is annoying, and it does not have to be like that — just automate the git commit / git push with a simple script that runs on a delayed endless loop.

This is not good if you collaborate on projects with others — but if, say you had an automated writing repository, one that you alone work on, then it makes no real sense to do proper commit messages. All I would ever write in there would be “did some writing yo” anyway.

So I just use a batch file that runs commit and push every ten minutes on that repo, that is enough to ensure that 99% of the time I am up to date on all my devices.

On system startup I run fetch and pull once, this is enough as I always shut down my devices when they are not in use.

This automation step has nothing to do with regular programming — but man is it useful. I stopped having money issues after I stopped looking at my bank account some two years ago, that is not exaggerated. Sure, other parts play a role in that — but honestly this is an area where I save so much mind space by a “lack of knowledge” that it’s almost unreal. I pretty much live on a cash-only basis for all non-recurring cost, everything that I have to pay monthly is just automatically withdrawn.

My rent, internet, power and heating, water and insurances, retirement plan contributions — I do not care about any of those, I do not want to see them, hear them talk, whisper dark thoughts into my ears.

In the same way I automated my income as well, meaning that I automatically withdraw from paypal, payoneer, stripe or at least do that manually once a month with an automated reminder. Seriously Paypal, get your stuff together and make auto-withdraw a non-business-account feature. Anyway, all my direct income sources are also automated, from Patreon, Amazon Affiliate, Kindle, freelance sites — they all pay me in some way and in some way the money lands in my account.

I have literally not even glanced at my bank account this month and I do it maybe once every other month to check if something looks odd. So far this has served me well and saved me a lot of stress.

The great part here is that I am far from rich, but I can actually live like I don’t care about money anymore. I live cheap, healthy, happily and when I do need a 500€-per-mile taxi to get home when somebody threw furniture on the train tracks (again) I can just suck it up and spend the money more or less without worry.

Image handling, editing, uploading — they all are a huge waste of time that I would rather not deal with. I like the “Instagram filter” approach to image editing where you click through a couple options, choose the one you like best and call it a day. Chances are you won’t try to win a picture contest when all you do is upload an image to a blog post on your website.

However this last part is where you will feel the effects of improper image sizing and a lack of optimization — your average 8mb smartphone image is at least eight times larger than it has to be. Your page loads (much) slower, your site gets penalized by google, people on mobile connections will see their bandwidth being eaten up — all for no reason.

So I just run a python script over my images folder that automatically optimizes and renames every image that does not have a file name starting with “optimized\_”. This is seriously quick to run even over whole folders containing large amounts of images — and if you just upload a handful of images a day or a week you won’t even notice it.

Of course I revert to the first point here and have this script run automatically whenever my computer starts — and since I keep all my images synched in google drive I just need to run it recursively over a single folder. You can choose to create a backup of each image, I don’t. I know it works flawlessly, has pretty much no possible source of errors and if I ever need to Google Drive has a rudimentary version control to step back to an earlier version.

You know what really costs a lot of time? Waiting for postal services to deliver my monk halloween costume that was such a smart financial decision this month.

I am so glad that these delivery boxes exist here in Germany now, that has made everything so much simpler, streamlined, comfortable for everyone. I’m sure the delivery folks live just as fine without talking to me and I can take my bicycle at midnight to get my package if I feel like it.

It’s such a great invention and it works flawlessly. You get automated texts when something is delivered, if you have a job without homeoffice work you save a full vacation day on every single delivery — it’s just great.

Living in a small town now I rely on deliveries for any non-standard goods and this system pays for itself the first or second time that you use it.

I hope this post could showcase some optimization and automation potential in a pretty regular life — and that is still only scratching the surface. This becomes even more true when you look at semi-automation like for example finding an easy way to quickly sort through emails and push them into folders. I could see a system like the Tumblr app where you long-press a button on your phone and a little circle menu opens with all your blogs under that account, then you swipe to one and the email gets added there.

With something like that you can save a lot of time on tasks that can not be fully automated — another great example is anything you can do with AutoHotkey scripts.

This whole post was written using [my autocorrection script](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/type-three-times-faster-with-less-strain-and-errors-217908f09a47) and I saved at least an hour on this post alone by typing much quicker, having it correct all my typos and expand custom abbreviations into full words, thereby saving me time and strain on my fingers. When I press Win-T my currently selected sentence will be converted to title case, Win-G selects the last-typed word and searches for that term on Google — so many small quick hacks that save a great deal of time over the course of a workday.


[Source](https://levelup.gitconnected.com/everything-i-automated-in-2020-to-save-me-hours-of-time-14510a1a17d0)