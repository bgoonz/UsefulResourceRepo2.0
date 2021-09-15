# Git Flow

```bash
git init            # initiates git in the current directory
git clone <address> # creates a git repo from given address (get the address from your git-server)
git clone <address> -b <branch_name> <path/to/directory>  # clones a git repo from the address into the given directory and checkout's the given branch
git clone <address> -b <branch_name> --single-branch  # Clones a single branch

git add file.txt   # adds(stages) file.txt to the git
git add *          # adds(stages) all new modifications, deletions, creations to the git
git reset file.txt # Removes file.txt from the stage
git reset --hard   # Throws away all your uncommitted changes, hard reset files to HEAD
git rm file.txt    # removes file.txt both from git and file system
git rm --cached file.txt # only removes file.txt both from git index
git status         # shows the modifications and stuff that are not staged yet

git branch                         # shows all the branches (current branch is shown with a star)
git branch my-branch               # creates my-branch
git branch -d my-branch            # deletes my-branch
git checkout my-branch         	   # switches to my-branch
git merge my-branch                # merges my-branch to current branch
git push origin --delete my-branch # delete remote branch
git branch -m <new-branch-name>    # rename the branch
git checkout --orphan <branch_name> # checkout a branch with no commit history
git branch -vv                     # list all branches and their upstreams, as well as last commit on branch
git branch -a                      # List all local and remote branches

git cherry-pick <commit_id>                     # merge the specified commit
git cherry-pick <commit_id_A>^..<commit_id_B>   # pick the entire range of commits where A is older than B ( the ^ is for including A as well )

git remote                         # shows the remotes
git remote -v                      # shows the remote for pull and push
git remote add my-remote <address> # creates a remote (get the address from your git-server)
git remote rm my-remote            # Remove a remote

git log                      # shows the log of commits
git log --oneline            # shows the log of commits, each commit in a single line
git log -p <file_name>       # change over time for a specific file
git log <Branch1> ^<Branch2> # lists commit(s) in branch1 that are not in branch2
git log -n <x>               # lists the last x commits
git log -n <x> --oneline     # lists the last x commits, each commit in single line
git grep --heading --line-number '<string/regex>' # Find lines matching the pattern in tracked files
git log --grep='<string/regex>'                   # Search Commit log

git commit -m "msg"          # commit changes with a msg
git commit --amend           # combine staged changes with the previous commit, or edit the previous commit message without changing its snapshot
git commit --amend --no-edit # amends a commit without changing its commit message
git commit --amend --author='Author Name <email@address.com>'    # Amend the author of a commit
git push my-remote my-branch # pushes the commits to the my-remote in my-branch (does not push the tags)
git revert <commit-id>       # Undo a commit by creating a new commit

git show                     # shows one or more objects (blobs, trees, tags and commits).
git diff                     # show changes between commits, commit and working tree
git diff --color             # show colored diff
git diff --staged            # Shows changes staged for commit

git tag                           # shows all the tags
git tag -a v1.0 -m "msg"          # creates an annotated tag
git show v1.0                     # shows the description of version-1.0 tag
git tag --delete v1.0             # deletes the tag in local directory
git push --delete my-remote v1.0  # deletes the tag in my-remote (be carefore to not delete a branch)
git push my-remote my-branch v1.0 # push v1.0 tag to my-remote in my-branch
git fetch --tags                  # pulls the tags from remote

git pull my-remote my-branch         # pulls and tries to merge my-branch from my-remote to the current branch

git stash                            # stashes the staged and unstaged changes (git status will be clean after it)
git stash -u                         # stash everything including new untracked files (but not .gitignore)
git stash save "msg"                 # stash with a msg
git stash list                       # list all stashes
git stash pop                        # delete the recent stash and applies it
git stash pop stash@{2}              # delete the {2} stash and applies it
git stash show                       # shows the description of stash
git stash apply                      # keep the stash and applies it to the git
git stash branch my-branch stash@{1} # creates a branch from your stash
git stash drop stash@{1}             # deletes the {1} stash
git stash clear                      # clears all the stash

git rebase -i <commit_id>         # Rebase commits from a commit ID
git rebase --abort                # Abort a running rebase
git rebase --continue             # Continue rebasing after fixing all conflicts

git clean -f                      # clean untracked files permanently
git clean -f -d/git clean -fd     # To remove directories permanently
git clean -f -X/git clean -fX     # To remove ignored files permanently
git clean -f -x/git clean -fx     # To remove ignored and non-ignored files permanently

git config --global --list                   # lists the git configuration for all repos
git config --global --edit                   # opens an editor to edit the git config file
git config --global alias.<handle> <command> # add git aliases to speed up workflow , eg. if  handle is st and command is status then running git st would execute git status 


.gitignore
# is a file including names of stuff that you don"t want to be staged or tracked.
# You usually keep your local files like database, media, and etc here.
# You can find good resources online about ignoring specific files in your project files.
# .gitignore is also get ignored 
.git
# is a hidden directory in repo directory including git files. It is created after "git init".



```

## Table of Contents

**[Cloning a repo and changing the remote url](#Cloning-a-repo-and-changing-the-remote-url)**<br>
**[Basic Git Workflow](#Basic-git-work-flow)**

## Cloning a repo and changing the remote url

(These steps are only for when you initially clone a project repo. Not when you clone your partners repo to collaborate together. To do that, you only have to complete step 1!)

### 1. The first step is to clone the repo!

- Navigate to the repo you want to clone and hit the big green code button. Copy the link given.

![clone-repo](./clone-repo.png)

- Navigate in your terminal to the directory where you want this repo to live. I chose ~/Documents/appAcademy
- `git clone HTTPS://LINKTOURL/THATYOUCOPIED`

![git-clone](./git-clone.png)

### 2. Sweet, you have the cloned repo in your preferred directory. Now lets make your own repo. On github, create a new repository.

- Default settings are fine. Hit the big green button `Create Repository`

![create-repo](./create-repo.png)

### 3. Next, copy the .git link that is on the next page. Do not do any other steps on this page - That is for when you do not clone a repo.

![your-dotgit](./your-dotgit.png)

### 4. Whenver you clone a repo it already has a .git directory with certain configurations set up. To be able to push this repo to your newly created GitHub repo we have to change the remote origin.

- To do that, just run this command: (Make sure you are inside the repo you cloned)

  - `git remote set-url origin https://LINK/TO/YOUR/GIT/THAT/YOU/COPIED/FROM/PREVIOUS/STEP.git`

  ![set-url](./set-url.png)

### 5. Thats its! You can now run `git push` and it will push to your newly created repo. Try it out :)

---

## Basic Git work flow.

- After making changes to a file and you are ready to commit / push to your repo you can run the following commands:

  - `git add .` - stages modifed files to be committed.
  - `git status` - displays files that have been modified
  - `git commit -m 'A hopefully helpful commit message'` - commits the changes to your local repo. Get in the habit now of making helpfull commit messages
  - `git push` - pushes your local commits to your github repo!

- To pull down changes that your partner pushed to the repo you simply have to run:
  - `git pull` - this will fetch the most recent updates!





## **Gitting Started with Git**

- Version Control Systems help us keep track of changes over time.

  - VCS tools abstract the work of keeping projects and programmers in sync with one another.

- **`Git`** is the most popular VCS in use today.

* **`Repository`** : Comprises all the source code for a particular project.

* **`Commits`** : collection of changes grouped towards a shared purpose.

  ![msg and hash](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-timeline.svg)

* **`Commit Messages & Commit Hashes`** :
  Git id's your commits with a specially generated series of letters and numbers called a Hash, and a detailed message describing the commit.

  - They are 40 characters long, but by default Git abbreivates hashes to 7 characters.

* **`References`** : Way to alias a commit in plain english.

  - **`HEAD`** : default reference that points to the most recent commit.

* Git maintains three lists of changes:
  - **`Working Directory`**
    - Keeps all of your in-progress changes.
  - **`Staging Area`**
    - Reserved for changes you're ready to commit.
  - **`Commit History`**
    - Made up of changes you've already committed.

**Tracking Changes in a Repository**

- **`Git Init`** : Allows you to start a repository in your current directory.

- **`Git Add`** : Adds content to your repository.

- **`Git Status`** : Used to check what has been staged in your repository.

- **`Git Commit -m`** : Used to commit your changes/additions into the commit history - flag is used to add a message to your commit.

- **`Git Log`** : Used to check your repo's commit history.

**Branches and Workflow**

- **`Branch`** : Basically a seperate timeline in Git, reserved for it's own changes - Master is the default branch.

- **`Git branch [name of branch]`** : Used to reate a new branch.
  ![img of branch](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-branch.svg)

- **`Git Checkout`** : Used to switch to an existing branch.

**Bringing it Back Together**

- **`Git Merge`** : Used to integrate one branch into another.

**Connecting with the world via Github**

- **`DCVS`** : Distributed Version Control System - built in support for managing code both locally and from a distant source.

- We typically refer to the primary remote of a repo as the **`origin`**.

- We `clone` a distant repo once, use `pull` to update it and `push` our own code into it.

**Collaboration via Git and Github**

```js
> git branch add-my-new-file
> git add my-new-file.js
> git commit -m "Add new file"
> git push -u origin add-my-new-file
```

This is the typical push workflow.

- **`-u`** flag stands for **`--set-upstream`**.
- **`Git Pull`** : Used to update your files from remote repo - behind the scenes this is a combination of Git Fetch and Git Merge.
  ![git pull behind](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-pull-parts.svg)

- **Pull Request** : Feature specific to Github, used as a safety net to prevent bugs and is a critical aspect of collaboration workflow.
  1. Push your code to GH on it's own branch.
  2. Open pull request via a base branch.
  3. GH creates a comparison page for your new code vs existing.
  4. Your teammates review for errors.
  5. Make changes based on feedback and push new commits upwards.
  6. PR automatically makes changes.
  7. If everyone is satisfied, a repo maintainer will merge your branch.
  8. Your code is now on the main branch - nice!

---

## **Managing your Github Repository**

- **`Git Diff`** : Used to visualize any tracked differences in our repository.
  ![img of diff](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-diff-output.svg)

* **`---`** & **`+++`** : let's us know there are both additions & subtractions in our js file.
* **`@@`** : shows use where our chunk of changes are line-wise.

**Diff Options**

- By default git diff compares the cwd to the last commit.
  - If we append **--staged** we can compare the staging area instead of the cwd.
- There are many other ways to use git diff to compare as well!

```js
# See differences between the 'feature'
# branch and the 'master' branch.
> git diff master feature

# Compare two different commits
> git diff 1fc345a 2e3dff

# Compare a specific file across separate commits
> git diff 1fc345a 2e3dff my-file.js
```

**Time Travel**
![checkout](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-checkout.svg)

- Using Git Checkout is entirely non-destructive.
- Git checkout has a few special characters and reserved references.

```js
# You can checkout a branch name.
# You'll be using this particular branch a lot!
> git checkout master

# You can also use commit hashes directly
> git checkout 7d3e2f1

# Using a hyphen instead of a hash will take
# you to the last branch you checked out
> git checkout -

# You can use "HEAD~N" to move N commits prior
# to the current HEAD
> git checkout HEAD~3
```

---

## **Git Do-over: Reset and Rebase**

- **Git Reset** : Can be used to travel back in time before a bug or error occured.
  - **--soft** : appended to reset to move our HEAD ref to the commit we specified - does not touch our code, only resets commit messages.(least dangerous!)
  - **--mixed** : Default state of Git reset, changes are preserved but they are removed from the commit history straight to the working directory.
  - **--hard** : Adjust head ref and totally destroy any interim code changes

**Rebase: An Alternative Form of Time Travel**

- **Git Rebase** : Involves changing your current branch's base branch.
  - Rebasing is a dangerous process that involves re-writing history.
    ![diagram of rebase](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-rebase-before-and-after.svg)

**The Golden Rule of Git**

> Never change the history of a branch that's shared with others.

- This rule refers to git reset and git rebase.
- Just don't use these on any branch that is shared with others!!!

---

## **Git Merge Conflicts & You**

- **Merge Conflict** : Special state that Git presents to us when two branches have code changes that are incompatible with each other.
  ![conflict img](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-merge-conflict.svg)

**Conflict Resolution**
![img of conflict](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/git/assets/image-git-merge-conflict-inline-operators.svg)

- The <<< === >>> signs are delimiters to indicate we are separating two pieces of conflicting code.
- The first piece is from our Base Branch.
- The second piece is from our incoming branch.

---
