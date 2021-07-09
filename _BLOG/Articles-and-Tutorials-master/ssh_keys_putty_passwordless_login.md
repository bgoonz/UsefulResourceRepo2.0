# How to Create SSH Keys with PuTTY (on Windows) to Connect to DigitalOcean Cloud Servers

### Benefits of Public & Private SSH Keys

If your headless, or remote, server is visible over the Internet, you should use public key authentication instead of passwords, if at all possible; because SSH keys provide a more secure way of logging in – compared to using a password alone. While a password can eventually be cracked with a [brute-force attack](http://en.wikipedia.org/wiki/Brute-force_attack), SSH keys are nearly impossible to decipher by brute force, alone. With public key authentication, every computer has (i) a public and (ii) a private “key” (two mathematically-linked algorithms that are effectively impossible to crack).

Today, [OpenSSH](http://www.openssh.org) is the default SSH implementaion on Unix-like systems such as Linux and OS X. Key-based authentication is the most secure of several modes of authentication usable with OpenSSH, such as plain passwords and Kerberos tickets. Other authentication methods are only used in very specific situations. SSH can use either “RSA” (Rivest-Shamir-Adleman) or “DSA” (“Digital Signature Algorithm”) keys. Both of these were considered state-of-the-art algorithms when SSH was invented, but DSA has come to be seen as less secure in recent years. RSA is the only recommended choice for new keys, so this tutorial uses “RSA key” and “SSH key” interchangeably.

When you log in to your DigitalOcean droplet, the SSH server uses the public key to “lock” messages in a way that can only be “unlocked” by your private key – this means that even the most resourceful attacker cannot snoop on, or interfere with, your session. As an extra security measure, some users and most SSH programs store the private key in a passphrase-protected format, to provide a window of time in which you can disable your compromised public key, should your computer be stolen or broken in to. For these reasons, public key authentication is a much better solution than passwords for most people. In fact, by not employing a passphrase on your private key, you will have the ability to automate parts of your configuration management with secure, automatic log-ins – such as incremental, off-site backups; managing your DigitalOcean assets via the DigitalOcean API; and more.

## Key-Based SSH Logins

You can save the same public key on as many servers as you’d like, while your private key is saved on a client from which you log in to the server. Then, you can disable the normal username/ password login procedure, which means that only people with a valid private/ public key pair can log in; making your system more secure, because it will be impervious to brute-force attacks.

## Automate the Creation of New Droplets

Another useful purpose that SSH keys can serve is in the creation of DigitalOcean droplets. As you know, when you spin up a droplet, you have to wait for an e-mail with your password. Although this email is very convenient, there is a more secure (and faster) way of gaining access to your new cloud server without the need for email. This can be done by saving your public key in the [DigitalOcean Control Panel](https://www.digitalocean.com/community/articles/the-digitalocean-control-panel). To accomplish this,

- first complete the section in this tutorial titled **Generating OpenSSH-compatible Keys for Use with PuTTY**;
- then, skip to **Step Three** of [How to Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-digitalocean-droplets).

## Prerequisite

This tutorial assumes that you are familiar with DigitalOcean’s guide on [How to Log Into Your Droplet with PuTTY (for windows users)](https://www.digitalocean.com/community/articles/how-to-log-into-your-droplet-with-putty-for-windows-users).

## PuTTY Key Generator (a.k.a. PuTTYgen)

While PuTTY is a client program for SSH (in addition to Telnet and Rlogin), it is not a port of or otherwise based on OpenSSH. Consequently, PuTTY does not have native support for reading OpenSSH’s SSH-2 private key files. However, PuTTY does have a companion named PuTTYgen (an RSA and DSA key generation utility), that can convert OpenSSH private key files into PuTTY’s format; allowing you to connect to your cloud server from a Windows machine, with the added security that SSH keys provide.

PuTTYgen is a (free) open-source utility and can be downloaded from the [maintainer’s website](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html). PuTTYgen is what you will use to generate your SSH keys for use in PuTTY. To start, all you need to do is download the exectuable files (`.exe`) and save them on the computer that you’ll use to connect to your server, e.g. on the desktop. You will _not_ need to “install” PuTTYgen, because it is a standalone application.

## Generating OpenSSH-compatible Keys for Use with PuTTY

To generate a set of RSA keys with PuTTYgen:

1.  Start the PuTTYgen utility, by double-clicking on its `.exe` file;
2.  For `Type of key to generate`, select `SSH-2 RSA`;
3.  In the `Number of bits in a generated key` field, specify either `2048` or `4096` (increasing the bits makes it harder to crack the key by brute-force methods);
4.  Click the `Generate` button;
5.  Move your mouse pointer around in the blank area of the `Key` section, below the progress bar (to generate some randomness) until the progress bar is full;
6.  A private/ public key pair has now been generated;
7.  In the `Key comment` field, enter _any_ comment you’d like, to help you identify this key pair, later (e.g. your e-mail address; home; office; etc.) – the key comment is particularly useful in the event you end up creating more than one key pair;
8.  <span class="underline">Optional</span>: Type a passphrase in the `Key passphrase` field & re-type the same passphrase in the `Confirm passphrase` field (if you would like to use your keys for automated processes, however, you should _not_ create a passphrase);
9.  Click the `Save public key` button & choose whatever filename you’d like (some users create a folder in their computer named _my_keys_);
10. Click the `Save private key` button & choose whatever filename you’d like (you can save it in the same location as the public key, but it should be a location that only you can access and that you will NOT lose! If you lose your keys and have disabled username/ password logins, you will no longer be able log in!);
11. Right-click in the text field labeled `Public key for pasting into OpenSSH authorized_keys file` and choose `Select All`;
12. Right-click again in the same text field and choose `Copy`.

**NOTE:** PuTTY and OpenSSH use different formats for public SSH keys. If the **SSH Key** you copied starts with `“—- BEGIN SSH2 PUBLIC KEY …”`, it is in the wrong format. Be sure to follow the instructions carefully. Your key should start with

    ssh-rsa AAAA ...

## Save The Public Key On The Server

Now, you need to paste the copied public key in the file `~/.ssh/authorized_keys` on your server.

1.  Log in to your destination server; _see_ [How to Log Into Your Droplet with PuTTY (for windows users)](https://www.digitalocean.com/community/articles/how-to-log-into-your-droplet-with-putty-for-windows-users)
2.  If your SSH folder does not yet exist, create it manually:

    \#\#\#\# Ubuntu

         mkdir ~/.ssh
         chmod 0700 ~/.ssh
         touch ~/.ssh/authorized_keys
         chmod 0644 ~/.ssh/authorized_keys

    \#\#\#\# CentOS

         mkdir ~/.ssh
         chmod 0700 ~/.ssh
         touch ~/.ssh/authorized_keys
         chmod 0600 ~/.ssh/authorized_keys

3.  Paste the SSH public key into your `~/.ssh/authorized_keys` file ( _see_ [Installing and Using the Vim Text Editor on an Cloud Server | DigitalOcean](https://www.digitalocean.com/community/articles/installing-and-using-the-vim-text-editor-on-an-cloud-server)):
4.  Tap the `i` key on your keyboard & right-click your mouse to paste.
5.  To save, tap the following keys on your keyboard (in this order): `Esc`, `:`, `w`, `q`, `Enter`.

## Create a PuTTY Profile to Save Your Server’s Settings

In PuTTY, you can create (and save) profiles for connections to your various SSH servers, so you don’t have to remember, and continually re-type, redundant information.

1.  Start PuTTY by double-clicking its executable file;
2.  PuTTY’s initial window is the _Session_ Category (navigate PuTTY’s various categories, along the left-hand side of the window);
3.  In the **Host Name** field, enter the IP address of your droplet or its fully qualified domain name (FQDN); _see_ [How to Set Up a Host Name with DigitalOcean](https://www.digitalocean.com/community-articles/how-to-set-up-a-host-name-with-digitalocean)
4.  Enter the port number in the **Port** field (for added security, consider changing your server’s SSH port to a non-standard port. _See_ Step Five of [Initial Server Setup with Ubuntu 12.04](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04 "Making SSH More Secure by Changing the Port to a Non-Standard Port")
5.  Select **SSH** under **Protocol**;
6.  Along the left-hand side of the window, select the _Data_ sub-category, under _Connection_;
7.  Specify the username that you plan on using, when logging in to the SSH server, and whose profile you’re saving, in the **Auto-login username** field;
8.  Expand the _SSH_ sub-category, under _Connection_;
9.  Highlight the _Auth_ sub-category and click the **Browse** button, on the right-hand side of the PuTTY window;
10. Browse your file system and select your previously-created private key;
11. Return to the _Session_ Category and enter a name for this profile in the **Saved Sessions** field, e.g. user@123.456.78.9 or user@host.yourdomain.tld;
12. Click the **Save** button for the **Load, save or delete a stored session** area.

Now you can go ahead and log in to _user_<span class="citation" data-cites="1.2.3.4">@1.2.3.4</span> and you will **not** be prompted for a password. However, if you had set a passphrase on your public key, you _will_ be asked to enter the passphrase at that time (and every time you log in, in the future).

## Disable Username/ Password Logins

Once you have verified that your key-based logins are working, you may elect to disable username/ password logins to achieve better security. To do this, you need to edit your SSH server’s configuration file. On Debian/ Ubuntu systems, this file is located at `/etc/ssh/sshd_config`.

    sudo vim /etc/ssh/sshd_config

Tap the `i` key on your keyboard and edit the lines, referenced below:

    [...]
    PasswordAuthentication no
    [...]
    UsePAM no
    [...]

To save, tap the following keys on your keyboard (in this order): `Esc`, `:`, `w`, `q`, `Enter`. Now, reload the SSH server’s configuration:

#### Ubuntu

    sudo reload ssh

#### CentOS

    sudo service sshd restart

## Additional Resources

- [How to Set Up SSH Keys | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-set-up-ssh-keys--2)
- [Public-key cryptography | Wikipedia](http://en.wikipedia.org/wiki/Public-key_cryptography)
- [PuTTY FAQ | Simon Tatham](http://www.chiark.greenend.org.uk/~sgtatham/putty/faq.html)

As always, if you need help with the steps in this How-to, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article Submitted by: [Pablo Carranza](http://vdevices.com "of vDevices, LLC | Wisconsin") • Updated 12/19/2013
