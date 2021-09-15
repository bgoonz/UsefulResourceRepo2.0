# How to Use CircleCI and Code Climate for Better Testing

> How CircleCI and Code Climate have given us the tools we need to better use our test results.

Over the past few years, we’ve spent a lot of time working to improve our testing tools. Lately, we’ve been using Jasmine to write tests for our JavaScript and have added additional metrics for greater visibility into our projects—but we were lacking code quality and test-coverage monitoring. That’s where CircleCI and Code Climate save the day. This post will show you what these services offer and how to use them within your Gulp and GitHub workflow.

CircleCI
--------

[CircleCI](https://circleci.com/) aims to help developers “ship better code, faster" with continuous integrations and deployments. I love that CircleCI integrates so nicely with GitHub. I can see right there in a pull request whether the tests for that code are passing, and the setup is pretty simple too.

### Setup

#### Step 1:

CircleCI will watch for updates to your GitHub repo by default, so you simply need to include a circle.yml file in the root of your project, and you should be good to go:

    test:
     override:
       - ./node_modules/.bin/gulp ci
    

#### Step 2:

Your gulpfile.coffee also gets a new task:

    gulp.task("ci", ['build', 'test'])
    

#### Step 3:

Log in to [CircleCI.com](https://circleci.com/), click the “Add Projects" link in the left-hand nav. You should now see a list of your GitHub repos on the page, each with a button to tell CircleCI to follow that repo.

### Success

Now, whenever code gets pushed to the GitHub repo, CircleCI will run the test suite and insert a message on any pull requests to let us know if everything is passing.

Code Climate
------------

[Code Climate](https://codeclimate.com/) offers “hosted static analysis for Ruby, PHP, and JavaScript source code." I like Code Climate because it provides a quick, easy-to-read grade of our code and identifies areas that need more attention. Grades are assigned to code using a scale similar to a standard [US grading system](https://en.wikipedia.org/wiki/Academic_grading_in_the_United_States#Grade_point_average).

![](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/code_grade.gif)

### Setup

#### Step 1:

The first thing to do is to log into [codeclimate.com](https://codeclimate.com/) and click the “Add a Repo" button in the top right.

![](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/uploads/article_uploads/add_repo_button.gif)

#### Step 2:

Select your repo and then give it a minute to process.

#### Step 3:

Once it’s ready, click on the “Settings" link (gear icon) next to the repo name (#1) and then select Analysis (#2).

![](https://lh6.googleusercontent.com/2K0QkpORhEyaKwLcFGQ_iWs47SSOlJyMDSmO4YzMNfQK1iISbdDKPLBNzaQwNeGTR3ANInAJjEKkXWULWz91p2FtQiDc7UfQ4MFeoP0gGGWHeaf-kIGbSnLzAlcrSXHTyKbI_pc)

#### Step 4:

Select which languages you want to test (#3).

#### Step 5:

Under Analysis, you’ll also find the ability to exclude third-party libraries and code that should not be evaluated (#4). Something like this is probably appropriate to be ignored:

    Exclude patterns
     js/lib/*
     specs/lib/*
    

#### Step 6:

Now you can click on Integrations and select GitHub Pull Requests. This will add a message from CodeClimate into your pull request. If you use Slack to communicate amongst your team, you can also turn on the Slack notification to drop messages into a project chat room.

#### Step 7:

Next, you can grab the code from the Badges section and drop a nifty little badge into your project’s README.md file.

### Success

You’re now grading our JavaScript. Bask in the glory of your good grades.

Test Coverage Report
--------------------

It’s nice to know how much of your code you are testing. To do this, we’re going to set up CircleCI to work with Code Climate.

### Setup

I like using [Karma](https://www.npmjs.com/package/karma) and [karma-coverage](https://www.npmjs.com/package/karma-coverage) for a really easy way to get a code coverage report.

#### Step 1:

    module.exports = (gulp, cfg, env) ->
     karma = require('karma').server
     gulp.task 'karma', (done) ->
       karma.start
         configFile: cfg.karmaConfig
         singleRun: true
       , done
    

#### Step 2:

You’ll also need to update the `ci` task in `gulpfile.coffee` to use Karma:

    gulp.task("ci", ['build', 'karma'])
    

#### Step 3:

Updating the circle.yml file to also send the lcov file to Code Climate.

    test:
     override:
       - ./node_modules/.bin/gulp ci
       - CODECLIMATE_REPO_TOKEN=$CodeClimateToken ./node_modules/.bin/codeclimate < reports/coverage/lcov.info
    

#### Step 4:

You probably noticed the `$CodeClimateToken` in circle.yml. We don’t want to store our token in plain text, or check it into GitHub. So, CircleCI gives us the ability to store environment variables that we can access from our tasks—+1 for security.

CircleCI will now send our code coverage numbers to Code Climate, so we can see our coverage numbers on the dashboard.

#### Step 5:

Click on the Code tab at the top, and then find a file that has a coverage number listed on the right. Click on the file name, then Source, and finally select Coverage at the top right.

### Success

Now you can see what parts of your code aren’t being hit by your tests.

Conclusion
----------

Adding these services has given us greater visibility into the quality of the code that we are creating. It has also given our project managers and other stakeholders greater confidence in what we are producing using proven tools to track code quality. I don’t know about you, but I consider helping us stay on top of writing the best possible code a major win.

I’m really excited about the direction that these services are moving in. If you’re looking for more ways to up your build process game, check out this article from Adam about [some other tools that we have added to our toolchain](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/we_heart_good_tools_an_update_on_our_build_process).


[Source](https://sparkbox.com/foundry/code_quality_tools)
