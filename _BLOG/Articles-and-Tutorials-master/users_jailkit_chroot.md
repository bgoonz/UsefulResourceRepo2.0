# How to Create Isolated File Directories For Ubuntu 12.04 Users with Jailkit

### Introduction

Of particular interest to hosting providers, resellers, and those that manage a server for friends & family, the `chroot` (short for “change root directory”) system provides a way of isolating users from other parts of your server – by putting them in (what is commonly referred to as) a jail. In other words, a `chroot` jail can be used to section off, or isolate, a particular user from entire sections of your server’s filesystem. Without a `chroot` jail, nothing would prevent a user with even limited file permissions from being able to navigate up to system-critical, top-level directories.

## The Basic `chroot` Environment

A `chroot` jail is a directory tree that you create within your filesystem, where the user cannot see any directories or files that are outside the `chroot` jail directories. The user is said to be “jailed” in that directory and its subdirectories. If you want a user to be able to do just one task, you can set up a `chroot` jail so that the user is able to only do that one task. The fewer executables you have in a `chroot` jail (and the more their capabilities are limited with strict configurations), the more work a hacker, or malicious worm, needs to break out of the `chroot` jail to move on to your filesystem at large.

Many control panels that reconfigure web servers for shared hosting will automatically create `chroot` directories for user accounts. Even if you trust your users to not intentionally attempt anything malicious, Brute-Force Attacks are an unwelcome reality in today’s IT world and isolating your users’ file directories provides an added layer of defense in the event that a user’s system account should become compromised.

To create a `chroot` jail, simply create a folder that has a replication of the directory structure of a typical Linux server. The difference is that you _only_ copy, in that `chroot` directory, the bare minimum of what is needed by your user. This process can be carried out manually, with several commands, or you can automate the process with Jailkit.

## About Jailkit

Jailkit is a set of utilities that can be used to set up a `chroot`-based, restricted environment where users have limited access to the server’s filesystem and the commands they run. The Jailkit utilities also make it easy to set up a restricted shell or to run services or programs inside such a restricted environment.

> Project website:  
> <http://olivier.sessink.nl/jailkit/>

## Scope of this Article

Jailkit is a robust program. This article, however, is limited to the scenario where a server administrator wishes to grant some users shell access, but aims to contain users’ files (e.g. web or app) in a `chroot` jail; so that users can do what they wish with their content, without exposing the rest of the server to the risk of breakage.

As will become evident, as you work through this article, there is _much_ more that one can do with Jailkit. Once you become comfortable with the basic concepts of a `chroot` jail and Jailkit’s utilities, you are encouraged to explore the various HowTos published on the Jailkit website.

## Prerequisites

- This article assumes that you have completed the steps outlined in [Initial Server Setup with Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04).

- Jailkit needs to be compiled from source. To install the tools needed for that process, execute the following command in a terminal window:

        sudo apt-get -y install build-essential

## Compile & Install Jailkit

Download the latest version of the Jailkit source files and extract the archive in your server’s `/tmp` directory, by executing the following command:

> **Note:** Check the Jailkit project website to ensure that you are installing the most recent release, i.e.
>
>       http://olivier.sessink.nl/jailkit/jailkit-<VERSION>.tar.gz

    cd /tmp && sudo wget -O - "http://olivier.sessink.nl/jailkit/jailkit-2.16.tar.gz" | tar xzvf -

Next, execute:

    cd jailkit-*

Finally, compile and install Jailkit, by executing:

    ./configure && make && sudo make install

## Jailkit Utilities

Jailkit is comprised of various pre-configured scripts, templates and configuration files that you can mix-and-match, to build the perfect `chroot` jail. If none of the existing Jailkit utilities meet your needs, you can customize them or create new ones. By default, Jailkit installs its utilities in `/usr/sbin/` and its configuration and template files in `/etc/jailkit/`.

**Note:** In some cases, the configuration files must be replicated in the `chroot` directory and edited appropriately (usually done so, automatically, by the `jk_init` utility), because a Jailkit utility that is run within a `chroot` environment is able to read its configuration **only** from within the jailed `chroot` directory. Jailkit’s utilities are prefixed with `jk_`.

    non-root_user@server:/usr/sbin/$
    [...]   jk_addjailuser  jk_chec jk_chrootlaunch jk_chrootsh jk_cp
    jk_init jk_jailuser jk_list jk_lsh  jk_socketd  jk_update   [...]

These utilities include a launcher that can start a daemon in a `chroot` jail; a `chroot` shell tool; a tool to limit binary execution; a tool to update and clean up a jail based on changes already made on the system at large; and more. All of Jailkit’s utilities have `man` pages which contain more information on how to use them; and can be accessed from any directory on your server by executing:

    man jailkit

You may also read more about the utilities not touched on, in this article, on Jailkit’s website.

## Setting up a `chroot` Jail Environment

There needs to be a directory where the entire jail environment will be setup. Jailed users will see this directory as the root directory of the server. You are free to choose whatever directory structure you wish, e.g. `/home/jail/`, `/var/chroot/`, `/jail`, etc.

### The `jk_init` utility

With Jailkit’s `jk_init` utility, you can automate the process of creating a `chroot` jail, while retaining the ability of specifying the jail’s location and what programs you want included in the jail. For example, execute:

> Feel free to substitute `/chroot` with a directory of your choice.

    sudo jk_init -v -j /chroot basicshell editors extendedshell jk_lsh netutils ssh sftp

## Creating & Jailing a User

_Skip down to the **Jail the user** section to add existing users to a `chroot` jail._

To create a new user, execute (substituting `username` with one of your choosing):

    sudo adduser username

Follow the prompts to specify a password and provide the user information requested by the system.

**Note:** This is a normal user that is created and is **_not_** inside the `chroot` jail, yet.

### Jail the user

The `jk_jailuser` utility is a tool that moves an existing user account – the user’s entire home directory and subdirectories – into a `chroot` jail. In the following example, the `-s` option grants the soon-to-be jailed user bash shell access, i.e. `/bin/bash`:

    sudo jk_jailuser -m -s /bin/bash -j /chroot username

> For a more restricted account, leave out `-s /bin/bash` (to create, for example, an SFTP-only user account with no shell access).

Then, copy bash and its libraries into the `chroot` jail using the `jk_cp` utility:

    sudo jk_cp -v -f /chroot /bin/bash

> Bash and its libraries need to be copied into the `chroot` environment, only once; and they’ll be available to future jailed-users to whom you wish to grant shell access.

Finally, edit the SSH configuration file to allow access for the additional user:

    sudo vim /etc/ssh/sshd_config

> Then, tap on the `i` key (on your keyboard) to enter the Vim text editor’s “insert mode.”

and add the jailed user to the following directive:

    [...]
    AllowUsers your_username new_username

> To save your edit, and exit, tap the following keys: `Esc`,`:`, `w`, `q`, `Enter`.

Reload SSH to incorporate the modified setting:

    sudo reload ssh

#### Confirm the transfer of the user account into the `chroot` jail

To confirm that the user was jailed, check the user’s `/etc/passwd` file, by executing:

    cat /etc/passwd

Review the line that pertains to the newly-jailed user and inspect the last two elements to make sure that the user’s:

1.  home directory is now nested inside the `chroot` jail; and
2.  shell is now a special utility named `jk_chrootsh`:

         username:x:[UserID]:[PrimaryGroupID]:[Full Name],,,:/path/to/jail/./home/username:/usr/sbin/jk_chrootsh

In addition to the modifications to the jailed-user’s `/etc/passwd` file, the `jk_jailuser` utility also adds the user to a stripped-down `passwd` file located at `/path/to/jail/etc/passwd` and adds the user’s group(s) to a stripped-down group file located at `/path/to/jail/etc/group`.

### Confirm SSH access

Now, it’s time to verify that the newly-jailed user has SSH access. If you encounter any connection problems, check for errors:

    sudo cat tail /var/log/auth.log

If successful, your user now has a fully-functioning bash shell, but inside the `chroot` jail. Feel free to move around the `chroot` environment. Notice that the root of the jailed-environment appears to be the normal `/`, even though it is `/chroot` on the actual filesystem.

## Maintenance

Refer to the Jailkit [website](http://olivier.sessink.nl/jailkit/jk_update.8.html) to learn about using the `jk_update` utility to update and cleanup a `chroot` jail according to changes, e.g. program software updates, on the main filesystem.

## Security Considerations

The Jailkit Team: &gt;A badly configured jail is a security risk!

The server’s super user (i.e., root), or any process running with root privileges, can always break out of a jail.

#### No directory inside a `chroot` jail, except for a jailed-user’s home or `/tmp`, directories should be writable by the jailed-user. Otherwise, a jailed-user can bypass security checks and gain root privileges.

Refer to the Jailkit website for other security best practices and Jailkit utilities, not discussed in this article, e.g., [jk_check](http://olivier.sessink.nl/jailkit/jk_check.8.html) that can be used to perform some basic checks to verify that a `chroot` jail is secure.

## Conclusion

As you can see, creating and administering `chroot` jails is reduced to a much simpler process with Jailkit. While `chroot` is very useful for basic, preventative security, it is not designed to prevent deliberate attempts to gain root access for purposes of attacking a server. For that threat, there are other security measures you can employ. Nevertheless, `chroot` helps, tremendously, to at least make it more difficult to exploit your virtual private server.

## Additional Resources

- Jailkit-users [mailing list](https://lists.nongnu.org/mailman/listinfo/jailkit-users)
- [Jailkit Docs | FAQs | HowTos](http://olivier.sessink.nl/jailkit/)

As always, if you need help with the steps outlined in this How-To, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • December 6, 2013
