#### ~~~ WIP ~ Draft ~ WIP ~~~

_[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls)_ gladly accepted How to Set Up DKIM (DomainKeys Identified Mail) with Postfix on Ubuntu 12.04 =

### Introduction

In the ongoing effort to combat spam, DomainKeys Identified Mail (DKIM) has risen as a popular method for email authentication. DKIM associates a particular domain name with an email message. The need for key-based authentication arose because spam often has forged headers.

## Prerequisite

This article assumes that you have completed the steps outlined in [How To Install and Setup Postfix on Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-install-and-setup-postfix-on-ubuntu-12-04).

1.  Select `Internet Site`.
2.  Add all domain name

## Server Setup

Follow the steps outlined in [Setting the Hostname & Fully Qualified Domain Name (FQDN) on Ubuntu 12.04 or CentOS 6.4 | GitHub](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/blob/master/set_hostname_fqdn_on_ubuntu_centos.md).

Then, open a terminal and update the local package index on your server with the latest changes made in the software repositories and upgrade the software packages already installed on your system:

    sudo apt-get update && sudo apt-get -y upgrade && sudo apt-get -y dist-upgrade && sudo apt-get -y autoremove

The configuration outlined in this tutorial will rely on [OpenDKIM](http://www.opendkim.org/), an open source implementation of the DKIM sender authentication system.

## Installation

To install OpenDKIM, execute:

    sudo apt-get -y install opendkim opendkim-tools

## Additional Resources

As always, if you need help with the steps outlined in this How-to, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • DATE

```WIP ~ DRAFT ~ WIP ~~~
=========================

*[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls)* gladly accepted
```
