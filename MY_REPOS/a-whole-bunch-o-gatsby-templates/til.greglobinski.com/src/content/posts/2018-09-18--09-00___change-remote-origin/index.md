---
title: Change a Git repository's remote origin url
categories:
  - dev
tags:
  - git
---

Before changing anything it's always worth to make sure how things look. The command below list all of the repository's existing remotes.

```bash
git remote -v
```

To change one of them use the `set-url` command.

```bash
git remote set-url [remote-name] [repository-url]
```

So in case we want to change `origin`, the command will look like below.

```bash
git remote set-url origin [repository-url]
```
