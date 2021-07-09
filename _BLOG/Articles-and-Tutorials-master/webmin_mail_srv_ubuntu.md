#### ~~~ WIP ~~~

_Pull requests gladly accepted_

# How to Configure a Mail Server with Webmin on Ubuntu 12.04

### Introduction

Webmin is a web-based, server configuration tool – or, control panel, like cPanel and Plesk – and its versatility allows even novice Linux users to deploy, and administer, a full-fledged mail server.

## Server Setup

First, follow the steps outlined in [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server) to deploy the latest release of `Ubuntu 12.04 Server`.

#### 32-bit vs. 64-bit systems

A 32-bit operating system is recommended for cloud servers with less than 3 GB of RAM – this is _especially_ true for servers with 1 GB, or less, of RAM. Processes can require significantly more memory on the 64-bit architecture. On servers with a limited amount of RAM, any performance benefits that one might gain from a 64-bit operating system would be diluted by having less memory available for buffers and caching.

> #### SSH Keys
>
> For increased security, it is advisable that you:
>
> 1.  Create your droplet with pre-installed SSH keys. _See_ [How To Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-digitalocean-droplets) (**Windows users:** Refer to the article cited, next); **and**
> 2.  Disable password logins. _See_ [How To Create SSH Keys with PuTTY to Connect to a VPS | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps).

Then, complete the steps outlined in [Initial Server Setup with Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04).

> #### For low-memory systems

> If you deployed a cloud server with 512MB of RAM, you’re best advised to add swap. _See_ [How To Add Swap on Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-add-swap-on-ubuntu-12-04). Allowing Webmin to swap out infrequently-used processes, and data, leaves more memory available for active processes.

### Set the Hostname and FQDN in `/etc/hosts`

Next, follow the steps outlined in [Setting the Hostname & Fully Qualified Domain Name (FQDN) on Ubuntu 12.04 or CentOS 6.4](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/blob/master/set_hostname_fqdn_on_ubuntu_centos.md).

## Deploy Webmin

Now, follow the steps in [How to Install Webmin on an Ubuntu Cloud Server | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-install-webmin-on-an-ubuntu-cloud-server) to deploy the Webmin control panel.

## Assumption

This article assumes that you do **not** wish to manage your DNS records via Webmin.

## Webmin Modules

One of Webmin’s benefits is that its capabilities can be expanded via modules. Modules make it easy to add new functionality to your server.

### Configure Postfix Module

### Configure Dovecot Module

## DNS Records

#### MX record

In order for mail to start flowing through your new mail server, an `MX record` needs to be added to your DNS records. _See_ [How To Set Up a Host Name with DigitalOcean](https://www.digitalocean.com/community/articles/how-to-set-up-a-host-name-with-digitalocean).

#### SPF record

[How To use an SPF Record to Prevent Spoofing & Improve E-mail Reliability | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-use-an-spf-record-to-prevent-spoofing-improve-e-mail-reliability)

## Additional Resources

- [Webmin FAQs](http://www.webmin.com/faq.html)
- [Webmin Wiki](http://doxfer.webmin.com/Webmin)
- [Webmin Module Documentation](http://doxfer.webmin.com/Webmin/Modules)
- [Webmin Forum](http://sourceforge.net/p/webadmin/discussion/600155)

As always, if you need help with the steps outlined in this How-To, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • DATE

#### ~~ WIP ~~~

_Pull requests gladly accepted_
