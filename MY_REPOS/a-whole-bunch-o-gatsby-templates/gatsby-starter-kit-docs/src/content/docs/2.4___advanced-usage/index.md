---
title: Advanced usage
categories: ['general']
---

The '**advanced**' relates to your **Git** :octocat: experience. You need some of that to really benefit from **Advanced usage**, otherwise you are looking for trouble.

You do not need to be a git master, but you should know what `git merge` and `git rebase` are. You should be able to resolve Git conflicts which sometimes come into being after using the mentioned commands.

The **Advanced usage** installation process is much longer and sweaty than the **Default** one. But it could be really beneficial afterwards, during the website maintaining.

## What's the difference?

With **Advanced usage** you cannot use `gatsby new`. The command installs Gatsby website but does not copy git **repository** to your localhost and there is no **Advanced usage** without the Git repository.

With a cloned git repository you will be able to upgrade your localhost code if I refactor codebase in the `upstream` repo. Sure, sometimes it will not work without resolving **conflicts** but still.

With **Advanced usage** you will be able launch your site as a **Website** starter and later, when the time comes, upgrade it to **Blog** by merging the `blog` branch into your `master`.

## Git clone

Instead of `gatsby new` use the `git clone` command.

But first you have to make your own fork of the Kit's [repository](https://github.com/greglobinski/gatsby-starter-kit).

:bangbang: :hand: **Do not clone the original repo!**

```shell
git clone https://github.com/[your-github-name]/gatsby-starter-kit.git [NEW_DIRECTORY_FOR_YOUR_SITE]
```

Move into the newly created folder.

```shell
cd [NEW_DIRECTORY_FOR_YOUR_SITE]
```

List branches of the repo.

```shell
git branch -a
```

As you see there is a lot of branches but only one is tracked locally `master` the rest are remote branches.

```
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/blog
  remotes/origin/blog-with-content
  remotes/origin/content-for-blog
  remotes/origin/content-for-equipped
  remotes/origin/content-for-minimal
  remotes/origin/content-for-themed
  remotes/origin/content-for-website
  remotes/origin/equipped
  remotes/origin/equipped-with-content
  remotes/origin/master
  remotes/origin/minimal
  remotes/origin/minimal-with-content
  remotes/origin/testing
  remotes/origin/themed
  remotes/origin/themed-with-content
  remotes/origin/website
  remotes/origin/website-with-content
  remotes/origin/zero
```

Let's assume that you want to install the **Website** starter. You have to tell git to track the proper branch.

```shell
git checkout --track origin/website-with-content
```

You should see the output.

```shell
>>> Switched to a new branch 'website-with-content'
>>> Branch 'website-with-content' set up to track remote branch 'website-with-content' from 'origin'.
```

List the branches again.

```shell
git branch -a
```

Now, two branches `master` and `website-with-content` are tracked locally and `website-with-content` is the current branch `*`.

```
  master
* website-with-content
  remotes/origin/HEAD -> origin/master
  remotes/origin/blog
  remotes/origin/blog-with-content
  remotes/origin/content-for-blog
  remotes/origin/content-for-equipped
  remotes/origin/content-for-minimal
  remotes/origin/content-for-themed
  remotes/origin/content-for-website
  remotes/origin/equipped
  remotes/origin/equipped-with-content
  remotes/origin/master
  remotes/origin/minimal
  remotes/origin/minimal-with-content
  remotes/origin/testing
  remotes/origin/themed
  remotes/origin/themed-with-content
  remotes/origin/website
  remotes/origin/website-with-content
  remotes/origin/zero
```

You are ready to install dependencies.

```shell
yarn install
```

When installation ends launch the web server using the `gatsby develop` command.

```shell
gatsby develop
```

Done. You have a working website built on the **Website** starter.

## Developing

I strongly suggest to create a new local branch based on the starter branch before you start making any changes in the code. Let's call it `my-website`.

```
git checkout -b my-website
```

More guides soon. Follow [me](https://twitter.com/greglobinski) to be informed about updates.
