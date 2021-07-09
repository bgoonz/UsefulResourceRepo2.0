# Setting the Hostname & Fully Qualified Domain Name (FQDN) on Ubuntu 12.04 or CentOS 6.4

### Introduction

A hostname is a label or nickname that is assigned to a computer connected to a network and that is used to identify the machine in various forms of electronic communication within an internal network. Hostnames are also important because they form part of a computer’s Fully Qualified Domain Name (FQDN). Assigning a FQDN to a computer makes it reachable via the public [Domain Name System (DNS)](http://en.wikipedia.org/wiki/Domain_Name_System), i.e. the Internet.

## Hostname Requirements

Internet standards for protocols mandate that component local host names may contain, **only**:

- the [ASCII](http://en.wikipedia.org/wiki/ASCII) letters `a` through `z` (in a case-insensitive manner);
- the digits `0` through `9`; and
- the hyphen (`-`).

No other symbols, punctuation characters, or white space are permitted.

**Practice Tip:** In addition to the above technical requirements, the only practical requirement of a server’s hostname, for your environment(s), is that it should be something unique to the other servers within a particular domain.

### Restrictions on valid host names

Hostnames are composed of series of labels concatenated with dots, as are all domain names. For example, let’s break `mail.google.com` into its component parts:

- `mail` is the host or local hostname; and
- `google.com` is the domain or parent domain name.

Each label **must**:

- be between 1 and 63 characters long; and
- the entire hostname (including the domain & delimiting dots) has a maximum of 255 characters.

## Checking Current Hostname & FQDN

This article assumes that you are familiar with `Step Seven — Log In To Your Droplet` of [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server).

To check your hostname, open a terminal or shell session and execute:

    hostname

The current hostname, if any, will be displayed. Then, to check the existing FQDN, if any, execute:

    hostname -f

which should yield a result such as `localhost` (which signifies that no FQDN is set) or `pbx.yourdomain.tld`.

## Naming Conventions

So long as the above parameters are complied with, one can use just about any name as a hostname. Many server admins. use planets, places or loosely-labeled abbreviations of a particular server’s basic purpose, e.g., `pbx`, `web1`, `web2`, `mail`, `ns1` (for nameserver) and so on. Feel free to have fun with hostnames, if you’d like.

## Setting the Hostname

A particular computer’s hostname can be changed at any time. To set the initial hostname or subsequently change it, execute the following commands in a terminal or shell session (obviously, you can use whichever text editor you wish; but this guide assumes that you have installed the [vim text editor](https://www.digitalocean.com/community/articles/installing-and-using-the-vim-text-editor-on-a-cloud-server)):

#### Ubuntu 12.04

    sudo vim /etc/hostname

#### CentOS 6.4

    sudo vim /etc/sysconfig/network

- Then, tap on the `i` key and use the arrow keys on your keyboard to navigate the text area;
- Next, enter the hostname of your choice; and
- To save & exit, tap the `Esc` key, on your keyboard, followed by these keystrokes: `:`, `w`, `q`, and, finally, `Enter`.

> _If_ it exists, edit the file `/etc/default/dhcpcd` and comment out the `SET_HOSTNAME` directive, by executing:
>
> sudo vim /etc/default/dhcpcd
>
> Then, insert the `#` symbol at the beginning of the line that begins with `SET_HOSTNAME=`, as shown, below:
>
> \#SET_HOSTNAME=‘yes’

Finally, execute:

    sudo service hostname restart

You can verify that the hostname was properly set by, again, executing:

    hostname

## Setting the Fully Qualified Domain Name (FQDN)

In a terminal or shell, execute:

    sudo vim /etc/hosts

Then, tap on the `i` key and use the arrow keys on your keyboard to navigate the text area. Modify your `hosts` file so that it resembles the following (**obviously,** substituting the `hostname`, `yourdomain`, `tld`, and `YourIP` values with your own):

    127.0.0.1   localhost.localdomain   localhost
    127.0.1.1   hostname.yourdomain.tld hostname
    YourIP      hostname.yourdomain.tld hostname

To save & exit, tap the `Esc` key, on your keyboard, followed by these keystrokes: `:`, `w`, `q`, and, finally, `Enter`.

You can verify that the FQDN was properly set by, again, executing:

    hostname -f

## DNS Records

If you want your remote server to be reachable over the internet via its FQDN, then you need to create the relevant DNS records. _See_ [How To Set Up a Host Name with DigitalOcean](https://www.digitalocean.com/community/articles/how-to-set-up-a-host-name-with-digitalocean).

## Additional Resources

- [Initial Server Setup with Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04)
- [Ubuntu Server 12.04 LTS Guide](https://help.ubuntu.com/12.04/serverguide/index.html)
- [Initial Server Setup with CentOS 6](https://www.digitalocean.com/community/articles/initial-server-setup-with-centos-6)
- [CentOS Wiki](http://wiki.centos.org/)

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • Updated November 12, 2013
