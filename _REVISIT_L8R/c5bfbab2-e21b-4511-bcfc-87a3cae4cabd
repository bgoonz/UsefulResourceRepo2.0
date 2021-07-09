# myrepos

> You have a lot of version control repositories. Sometimes you want to
update them all at once. Or push out all your local changes. You use
special command lines in some repositories to implement specific workflows.
Myrepos provides a mr command, which is a tool to manage all your version
control repositories.

You have a lot of version control repositories. Sometimes you want to update them all at once. Or push out all your local changes. You use special command lines in some repositories to implement specific workflows. Myrepos provides a `mr` command, which is a tool to manage all your version control repositories.

getting started
---------------

All you need to get started is some already checked out repos. These could be using git, or bzr, mercurial or darcs, or many other version control systems. Doesn't matter, they're all supported!

Inside each of your repositories, run `mr register`. That sets up a `~/.mrconfig` file listing your repositories.

Now you can run `mr update` in your home directory, and it'll update every one of your repositories that you've registered with myrepos.

Want to update repositories in parallel? `mr -j5 update` will run 5 concurrent jobs!

If you run `mr update` inside a repository, it'll only act on that repository. In general, any `mr` command runs recursively over any repository located somewhere in or under the current directory.

You can also run `mr commit`, `mr push`, `mr status`, `mr diff`, and a lot of other commands. These work no matter which version control system is used for a repository. Of course, you can still use the native version control commands too.

Oh, and you can abbreviate any command to any unambiguous abbreviation. `mr up`, `mr pu`, etc.

Now, maybe you find that you always want to update one repository using `git pull --rebase`, instead of the default `git pull` that `mr update` runs. No problem: The `~/.mrconfig` file makes it easy to override the command run for any repository. It's like a `Makefile` for repositories.

    [foo]
    checkout = git@github.com:joeyh/foo.git
    update = git pull --rebase
    

You can make up your own commands too:

    [bar]
    # This repository has an upstream, which I've forked;
    # set up a remote on checkout.
    checkout =
        git clone git@github.com:joeyh/bar.git
        cd bar
        git remote add upstream git@github.com:barbar/bar.git
    # make `mr zap` integrate from upstream
    zap =
        git pull upstream
        git merge upstream/master
        git push origin master
    

You can even define commands globally, so `mr` can use them in all repositories.

    [DEFAULT]
    # Teach mr how to `mr gc` in git repos.
    git_gc = git gc "$@"
    

This only scratches the surface of the ways you can use myrepos to automate and manage your repositories!

Some more examples of things it can do include:

*   Update a repository no more frequently than once every twelve hours.
*   Run an arbitrary command before committing to a repository.
*   Remember actions that failed due to a laptop being offline, so they can be retried when it comes back online.
*   Combine several related repositories into a single logical repository, with its own top-level `.mrconfig` file that lists them and can be chain loaded from `~/.mrconfig`.
*   Manage your whole home directory in version control. (See [VCS-Home](https://vcs-home.branchable.com/))

extensions
----------

*   [drupal](https://github.com/wimleers/mr-drupal): simple way to manage drupal websites
*   [freeze](https://bitbucket.org/mforbes/mmfhg#rst-header-mr-un-freeze): record and restore VCS revision details
*   [github2mr](https://github.com/skx/github2mr): add your github repos to myrepos

related software
----------------

*   [repo](https://android.googlesource.com/tools/repo): git repository management tool
*   [gita](https://github.com/nosarthur/gita): manage multiple git repos
*   [gitbatch](https://github.com/isacikgoz/gitbatch): manage multiple git repos in one place
*   [git-plus](https://github.com/tkrajina/git-plus) multi: run commands in multiple git repos
*   [git-repo-updater](https://github.com/earwig/git-repo-updater) gitup: update multiple git repos at once
*   [mu-repo](https://fabioz.github.io/mu-repo/): help working with multiple git repos
*   [mgitstatus](https://github.com/fboender/multi-git-status): show status in multiple git repos
*   [ghq](https://github.com/motemen/ghq): manage remote repository clones
*   [uncommitted](https://github.com/brandon-rhodes/uncommitted): find uncommitted changes in VCS directories
*   [kas](https://github.com/siemens/kas): bitbake repository management tool
*   [VCS](https://www.greenend.org.uk/rjk/vcs/): a wrapper for version control systems
*   [vcstool](https://github.com/dirk-thomas/vcstool): work with multiple repositories
*   [vcstools](https://github.com/vcstools/vcstools): Python API wrapping version control systems
*   [rosinstall](https://github.com/vcstools/rosinstall): source code workspace management tool
*   [wstool](https://github.com/vcstools/wstool): maintain workspace of projects from multiple VCSes
*   [vcs-repo-mgr](https://github.com/xolox/python-vcs-repo-mgr): version control repository manager
*   [go-vcs](https://github.com/Masterminds/vcs): version control repository management for Golang
*   [v](https://github.com/ChristophBerg/dotfiles/blob/master/bin/v): version control subcommand wrapper
*   [silver-platter](https://www.jelmer.uk/silver-platter-intro.html): make automated changes in different version control repositories

news
----

[forum-fixed](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/news/forum-fixed/)  
Posted 1 year and 2 months ago by

[version 1.20180726](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/news/version_1.20180726/)  
Posted 2 years and 11 months ago

[version 1.20171231](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/news/version_1.20171231/)  
Posted 3 years and 6 months ago

[version 1.20170129](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/news/version_1.20170129/)  
Posted 4 years and 5 months ago


[Source](http://myrepos.branchable.com/)