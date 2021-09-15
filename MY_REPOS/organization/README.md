


# FT-Potluck-Planner-5

<div align="center">


  ![trello](./trello-board.PNG?raw=true)
  
  ---
  
  
## ✅  **MVP**

1. As an `organizer` I can create an upcoming `potluck` and invite my friends to attend

2. As an `organizer` I can adjust `date`s, `time`s and `location`s of the potluck

3. As an `organizer` I can use the list feature in my app to add food `items` that we'd like to see at the potluck

4. As a `guest` to a potluck I want to be able to confirm that I'm going to the upcoming `event`

5. As a `guest` I'd like to be able to select which `item`s I'd like to be responsible for bringing

**NOTE: All of the user stories above should only require a single user type. Users can create "potlucks" and add other users to them.**
  
  
  
  
  
  ---
![snooplion](https://thumbs.gfycat.com/AdmiredAdventurousCaiman-size_restricted.gif)

|   |   |   |   |   |
|---|---|---|---|---|
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
  
  
  
  </div>


---
---

# Build Week Student Guide (Full-time)

### The Essentials

---

[Full Time Schedule and Milestones](https://www.notion.so/c53bc03f390842b6a8a72b26956a48f4)

[Build Week Rubrics & Role Descriptions ](https://www.notion.so/Build-Week-Rubrics-Role-Descriptions-2f62fa64913b4cfe9861865dd7b47833)

[Git for Build Sprint](https://www.notion.so/Git-for-Build-Sprint-98bbbc0113cf4efda6b63a9416900379)

### Getting Set Up

---

[How to set up Trello board for Build Weeks](https://www.notion.so/How-to-set-up-Trello-board-for-Build-Weeks-4688651060a44ae4ae5100c7b25c96cc)

- If you're new to Trello, [here's a basic guide to using it.](https://trello.com/en-US/guide/trello-101)

[How to setup Github Organization for Build Weeks](https://www.notion.so/How-to-setup-Github-Organization-for-Build-Weeks-a863ec588d7c440a886547e037a5f9c9)

[Web & DS Scaffolding](https://www.notion.so/Web-DS-Scaffolding-946b8ced1aae4f19aa0fc66006ca3495)

### Planning Your Project as a Team

---

[Product Vision Document](https://www.notion.so/Product-Vision-Document-06ed217577004381908ec9b46c8218a6)

[Product Vision Document (example)](https://www.notion.so/Product-Vision-Document-example-5efed83c7c0a44aebca3020261017bc3)

### What's New in Build Week Since You Were Here Last

---

[FT Build Week Change Log](https://www.notion.so/80e952b7e29840c8a31bd19a1d566e71)

### Peer Reviews

---

[Peer Reviews in Build Week](https://www.notion.so/Peer-Reviews-in-Build-Week-7b5e56af022d4e549249f5972cb9748f)

### Product Information

---

[FT Build Week Product Catalog](https://www.notion.so/FT-Build-Week-Product-Catalog-b48b9a4bd72b434c888c6894589520c4)

### Front End Marketing Pages

---

Find your product here: [https://github.com/LambdaSchoolBuildWeeks/Unit1Marketing](https://github.com/LambdaSchoolBuildWeeks/Unit1Marketing)

---
---

# Potluck Planner

## ☝️ **Pitch**

If you have ever tried to organize a potluck through text messages, online to-do lists or spreadsheets, you'll understand why this app is essential. 

In the world of social gatherings and potlucks the "Potluck Planner" is king. This is your place for all things pot luck.


## 🏃‍♀️ **Stretch**

1. Add a reminders functionality that allows users to link up their upcoming `date`s to their Google calendar.

2. Ability to upload multiple `photos` from the potluck gathering, like a photo gallery for a past event.


---
---





# Git for Build Sprint

# Git MVP

Git MVP includes 4 main requirements:

## 1. Use `main` as your primary branch

You must use `main` as your primary branch, which is the default when creating a new repository. 

**Why?**

- Branching from the branches other than the `main` branch can create opportunities for merge conflicts.

## 2. Feature Branch Naming

Feature branches must be named: `feature/<descriptive name>`

For example, if you're working on a feature that allows users to change the email address in their profile, the branch should be named `feature/change-email`

More info on branches and how to create a branch can be found [here](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).

**Why**?

- Without a good naming convention, it is very easy to lose track of the purpose of a branch.

## 3. Delete Merged Branches

After a branch has been merged to the `main` branch, it must be immediately deleted.

**Why?**

- Short-lived branches are a best-practice for minimizing merge conflicts. Leaving many branches active in a repository makes it difficult for team members to navigate the on-going work. Once a branch has been reviewed, approved, and merged into the `main` branch, it should be immediately deleted.
- A healthy Git repository has a minimum of active branches.
- This is [easy to comply with using GitHub](https://help.github.com/en/github/administering-a-repository/managing-the-automatic-deletion-of-branches).

## 4. Build Sprint Git Workflow

*Following this workflow make it easier to collaborate with your teammates. It will also help prepare you for Labs, since it is very similar to the Git workflow you will use in Labs!* 

**The idea is that each Trello card should be on its own pull request as a feature!**

The Build Sprint Git Workflow is designed to prepare you for your Labs experience. You can learn more about Git & GitHub in Labs, check out the [Engineering Standards](https://labs.lambdaschool.com/) and [Labs Git Workflow.](https://docs.labs.lambdaschool.com/guides/coding/git-workflow)

## Getting Started

You're ready to work on a new Trello card - let's get started!

**WITHOUT FORKING,** clone your team's repository. 
After that always make sure you start with a recent copy of the repo.

### `> git checkout main`

### `> git pull origin main`

- To get started on your first task let’s make a branch. Making sure you are on the `main` branch, start a new branch with a name that matches or correlates to the task you are about to begin.
- The trick here is to think beyond yourself when naming the branch, stay aligned with your Trello board so you ***and*** others can easily make sense of it.

```jsx
git checkout -b [*feature/<descriptive name>*]
```

## Sharing Is Good

Now you have a branch to make all your awesome commits to! 

- Copying the description from the Trello card, which should summarize the actual work in the PR, create a **Draft Pull Request** using the `main`branch as the **base** after you have made your first commit.

Github created pull request drafts so that notifications will be turned off by default until you decide you are ready for review.  

![Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/draftPR.gif](Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/draftPR.gif)

## We have lift off!   🚀

Now we’re ready to make some awesome software. Committing and pushing our code regularly are habits worth having. Before we know it, we’ll be ready to take the PR out of draft mode.

Tip: do your best to be a great team member by making commit messages as clear as possible. They don’t have to be elaborate- keep it to the point.

### One small step  👨🏾‍🚀

When you feel you’ve completed the task you’ve been working on, it's time to: 

- Update the description
- Take the PR out of Draft Mode
- Make it "**ready for review**".

Ask someone in your team's channel to review your work. 

 

![Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/github-ready-pr.png](Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/github-ready-pr.png)

The team will then be notified of the PR and they can begin a review before merging it to the `main` branch.

Tip: Follow the team policy regarding the number of reviewers required before merging. It’s great practice to take the time and make comments in the code, even if just positive notes on good work your teammate did.

## Merging to `main`

If there are no conflicts to be resolved in the code choose `Rebase and merge` or `Squash and merge` from the `Merge` button.

![Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/github-merge.png](Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/github-merge.png)

If you find yourself with a merge conflict, there are a number of ways to solve it. The Github tools are very handy. You can also do it locally. When going down the local path, there is a good set of instructions [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges).

Your code changes are now on the `main` branch, ready to *wow!* users with your updates. 

Deploy your code (if not otherwise handled by Github Events) and be ready to support and address any issues that arise.

![Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/git_comic.png](Git%20for%20Build%20Sprint%201709b932890047dbbfdfef39267cf81b/git_comic.png)

Humor Break! 



---
---


# Architecture Overview

# Description

Describe the software component being documented here. What does it do? 

### Diagram

Include a diagram if it's helpful. 

# Client

Describe relevant codepaths in the client codebase. 

- 

# Server

Describe relevant codepaths in the server codebase.  

- 

# Database

Describe relevant tables and views in the database. 

-# Friday

- All Students
- [ ]  Careers Module!

- Revision History

    October 24, 2019, shared with students October 25, 2019

Copyright Lambda School 2020, All Rights Reserved# Kickoff Friday 🎉

- **All Team members** Kick-off checklist
    - [ ]  Make a copy of the Product Vision Document and work together as a team to fill it out.
        - [ ]  Pin the completed PVD to your Slack channel
        - [ ]  Link the completed PVD in your front end README in your GitHub org.
    - [ ]  Ensure GitHub org is created and all team members are added
    - [ ]  Ensure Trello board is created and all team members contribute user stories, based on PVD planning
    - [ ]  As a team, determine whether you want to use your regular track team Slack channel for Build Week collaboration

    NOTE: Review the [Track Team Roles in Build Week](https://www.notion.so/Build-Week-Rubrics-Role-Descriptions-c0783f6d9b7e435f9ce47e8cd2d0ee3b) to verify who's responsible for creating your Trello and GitHub.

    - Revision History

        October 24, 2019, shared with students October 25, 2019

    Copyright Lambda School 2020, All Rights Reserved# Monday

- **Web Unit 2**

    Individual work:

    - [ ]  Use React and front end styling platforms such as Material UI, Reactstrap, or something like Styled-Components chosen and implemented as your technology choice (to be done and listed during your additions to the PVD)
    - [ ]  Front end is pulling in some data from backend
    - [ ]  User Login/Signup Pages built and ready to handle the token being sent between backend and front end
    - [ ]  React app and Backend App talking to one another, focus on CORS issues
    - [ ]  Complete your module checklist in Canvas

    Group work: 

    - [ ]  Together with your team, populate backlog on Trello with user stories
    - [ ]  Together with your team, finish up Product Vision Document (don't skimp on planning)
    - [ ]  The team project was deployed to Netlify or Heroku by the end of the day
    - [ ]  All Project's file structures scaffolded and project architecture decided

- **Web Unit 3**

    Individual work:

    - [ ]  Use React and front end styling platforms such as Material UI, Reactstrap, or something like Styled-Components chosen and implemented as your technology choice (to be done and listed during your additions to the Product Canvas)
    - [ ]  Front end is pulling in some data from backend
    - [ ]  User Login/Signup Pages built and ready to handle the token being sent between backend and front end
    - [ ]  React app and Backend App talking to one another, focus on CORS issues
    - [ ]  Complete your module checklist in Canvas

    Grop work: 

    - [ ]  Together with your team, populate backlog on Trello with user stories
    - [ ]  Together with your team, finish up Product Vision Document (don't skimp on planning)
    - [ ]  The team project was deployed to Netlify or Heroku by the end of the day
    - [ ]  All Project's file structures scaffolded and project architecture decided

- **Web Unit 4**

    Individual work:

    - [ ]  Node/Express and all required packages for things like CORS, Body-Parser, JWT installed
    - [ ]  User Login/Signup endpoints built out including the User Models Use JWT/Sessions strategies learned in Authentication
    - [ ]  React app and Backend App talking to one another, focus on CORS issues
    - [ ]  Data Migrations and Seeds set up for mock data
    - [ ]  Complete your module checklist in Canvas

    Group work: 

    - [ ]  Together with your team, populate backlog on Trello with user stories
    - [ ]  Together with your team, finish up Product Vision Document (don't skimp on planning)
    - [ ]  The team project was deployed to Netlify or Heroku by the end of the day
    - [ ]  All Project's file structures scaffolded and project architecture decided

- **DS Unit 3**

    Individual work:

    - [ ]  Load initial (possibly sampled/manual) data
    - [ ]  Create exploratory notebook considering appropriate methods to address business problem
    - [ ]  Complete your module checklist in Canvas

    Group work: 

    - [ ]  Together with your team, populate backlog on Trello with user stories
    - [ ]  Together with your team, finish up Product Vision Document (don't skimp on planning)
    - [ ]  The team project was deployed to Netlify or Heroku by the end of the day
    - [ ]  All Project's file structures scaffolded and project architecture decided

- **DS Unit 4**

    Individual work:

    - [ ]  Load initial (possibly sampled/manual) data
    - [ ]  Create exploratory notebook considering appropriate methods to address business problem
    - [ ]  Complete your module checklist in Canvas

    Group work: 

    - [ ]  Together with your team, populate backlog on Trello with user stories
    - [ ]  Together with your team, finish up Product Vision Document (don't skimp on planning)
    - [ ]  The team project was deployed to Netlify or Heroku by the end of the day
    - [ ]  All Project's file structures scaffolded and project architecture decided

- Revision History

    October 24, 2019, shared with students October 25, 2019

Copyright Lambda School 2020, All Rights Reserved# Project Kickoff

# Overview

What is the project? Why are we working on this? 

### Problem Statement

- 

### Proposed Solution

- 

# Success Criteria

1-3 sentences on what success for the project looks like. Include metrics and qualitative descriptors if relevant. 

# User Stories

What will the user be able to do after the solution is shipped? 

- 

# Scope

Define what will be done and what will not be done as part of this project.  

- 

### Requirements

- 

### Non-Requirements

-# Re-attempt Deadline

If you self-assess a single '1' on your Build Sprint based on the Technical Mastery portion of the rubric you may reattempt turning that 1 into a 2 or higher to pass the week. If you self-assess more than one '1' in the Technical Mastery portion of the rubric, you are encouraged to consider flexing.

Reattempts will take place on **Friday afternoon (Full-time) and due by 5 PM Pacific.**

Please submit your reattempt via Canvas.# Thursday

- **Web Unit 2**

    Individual Work:

    - [ ]  Focused on bugs & polish
    - [ ]  Complete your module checklist in Canvas
    - [ ]  Submit your project in Canvas and complete the Sprint Retrospective

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans
    - [ ]  Mob program to complete any front end work. All web members in the group could be able to contribute to finalizing the styles
    - [ ]  Document your projects within the Readme files in their Github repositories. Without having to talk to you specifically, any developer should be able to install, contribute to, and run your project based on the descriptions found in your readme

- **Web Unit 3**

    Individual Work:

    - [ ]  Focused on bugs & polish
    - [ ]  Complete your module checklist in Canvas
    - [ ]  Submit your project in Canvas and complete the Sprint Retrospective

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans
    - [ ]  Mob program to complete any front end work. All web members in the group could be able to contribute to finalizing the styles
    - [ ]  Document your projects within the Readme files in their Github repositories. Without having to talk to you specifically, any developer should be able to install, contribute to, and run your project based on the descriptions found in your readme

- **Web Unit 4**

    Individual Work:

    - [ ]  Focused on bugs & polish
    - [ ]  Complete your module checklist in Canvas
    - [ ]  Submit your project in Canvas and complete the Sprint Retrospective

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans
    - [ ]  Mob program to complete any front end work. All web members in the group could be able to contribute to finalizing the styles
    - [ ]  Document your projects within the Readme files in their Github repositories. Without having to talk to you specifically, any developer should be able to install, contribute to, and run your project based on the descriptions found in your readme

- **DS Unit 3**

    Individual Work:

    - [ ]  Focused on bugs & polish
    - [ ]  Complete your module checklist in Canvas
    - [ ]  Submit your project in Canvas and complete the Sprint Retrospective

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans
    - [ ]  All deployments and models must be finalized and deployed for all inputs / outputs so that they can be utilized completely on both ends
    - [ ]  Document your projects within the Readme files in their Github repositories. Without having to talk to you specifically, any developer should be able to install, contribute to, and run your project based on the descriptions found in your readme

- **DS Unit 4**

    Individual Work:

    - [ ]  Focused on bugs & polish
    - [ ]  Complete your module checklist in Canvas
    - [ ]  Submit your project in Canvas and complete the Sprint Retrospective

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans
    - [ ]  All deployments and models must be finalized and deployed for all inputs / outputs so that they can be utilized completely on both ends
    - [ ]  Document your projects within the Readme files in their Github repositories. Without having to talk to you specifically, any developer should be able to install, contribute to, and run your project based on the descriptions found in your readme# Tuesday

- **Web Unit 2**

    Individual Work:

    - [ ]  80% of Front end features & UI Components, built and consuming data from the backend (Functionality over form for now)
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans

- **Web Unit 3**

    Individual Work:

    - [ ]  80% of Front end features & UI Components, built and consuming data from the backend (Functionality over form for now)
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans

- **Web Unit 4**

    Individual Work:

    - [ ]  By lunchtime: have minimum of three of your most essential GET endpoints in place. They can be serving dummy data, but need to be available for the team to work with.
    - [ ]  All data models fully fleshed out
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans

- **DS Unit 3**

    Individual Work:

    - [ ]  Deliver output data (insights from input data to inform application) the app can use, in JSON or otherwise encoded (coordinate with backend architect)
    - [ ]  Dummy data is deployed via Heroku that allows Web the ability to access
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans

- **DS Unit 4**

    Individual Work:

    - [ ]  Model should be running- using either NLP or Neural Network- that can implement the model provided by the Data Engineer (DS Unit 3)
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans

- Revision History

    October 24, 2019, shared with students October 25, 2019

Copyright Lambda School 2019, All Rights Reserved# Wednesday - "95% Feature Complete"

***Most* features should be in place by the end of the day.  Be sure to make plenty of time to address bugs, and get your app looking like something you'd want to show off.  Focus on MVP.  Adding stretch features after today is discouraged.**

- **Web Unit 2**

    Individual Work:

    - [ ]  100% of Front end features & UI Components, built and consuming data from the backend (Now is the time to focus on Form).
    - [ ]  Front end is pulling in all data necessary from backend, users can interact with ALL CRUD operations on the Project data.
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans

- **Web Unit 3**

    Individual Work:

    - [ ]  100% of Front end features & UI Components, built and consuming data from the backend (Now is the time to focus on Form).
    - [ ]  Front end is pulling in all data necessary from backend, users can interact with ALL CRUD operations on the Project data.
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans

- **Web Unit 4**

    Individual Work:

    - [ ]  100% of endpoints built (Backend).
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans

- **DS Unit 3**

    Individual Work:

    - [ ]  Student(s) should have a fully-functioning application that can deploy JSON back to the team.
    - [ ]  Student(s) should be working with the Machine Learning Engineer's model that they've developed to work with data.
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans
    - [ ]  Gather feedback on how data is performing in app
    - [ ]  Leverage feedback to go back and iterate data science model/pipeline

- **DS Unit 4**

    Individual Work:

    - [ ]  Model should be finalized- both inputs and outputs- to produce desired results.
    - [ ]  Student(s) will work with the Data Engineer to ensure the data they are sending from their deployment will work with the model.
    - [ ]  Complete your module checklist in Canvas

    Group Work:

    - [ ]  Held a morning standup reviewing Trello board, yesterday's progress and today's plans
    - [ ]  Gather feedback on how data is performing in app
    - [ ]  Leverage feedback to go back and iterate data science model/pipeline

Copyright Lambda School 2020, All Rights Reserved//APPEND-DIR.js

const fs = require("fs");
let cat = require("child_process").execSync("cat *").toString("UTF-8");
fs.writeFile("output.md", cat, (err) => {
  if (err) throw err;
});





---
---








---
---









---
---








---
---



