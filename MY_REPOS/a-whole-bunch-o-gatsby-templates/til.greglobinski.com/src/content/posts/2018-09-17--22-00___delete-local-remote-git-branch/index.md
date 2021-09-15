---
title: Delete a local or remote Git branch
categories:
  - dev
tags:
  - git
---

### Deleting a local branch

I remove local Git branches pretty often so I remember the commands pretty well.

```bash
git branch -d [branch-name]
# -d is a shortcut of --delete
git branch --delete [branch-name]
```

These delete a local branch, but only if it's been already merged with a remote branch.

```bash
git branch -D [branch-name]
# -D is a shortcut of --delete --force
git branch --delete --force [branch-name]
```

These delete a local branch, doesn't matter it's 'fully merged' or not, so be careful. :cactus:

### Deleting a remote branch

To delete a remote branch use the `push` command with the `--delete` flag instead of `branch`.

```bash
git push [remote-name] --delete [branch-name]
```

The different command makes it hard to remember, I search for it again and again. Maybe noting down will help. :smile:

But maybe it's only because I delete remote branches much less often than the local ones. :confused:
