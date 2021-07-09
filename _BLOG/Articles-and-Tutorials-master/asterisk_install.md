#### ~~~ WIP ~ Draft ~ WIP ~~~

_[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls)_ gladly accepted How to Install the Asterisk 11 LTS PBX Server on Ubuntu 12.04 =

### Introduction

Asterisk is an open source, software implementation of a Private Branch Exchange (PBX). Asterisk is used by small & medium sized businesses and large enterprises – in addition to call centers, carriers, and government agencies.

## Pre-deployment Planning

First, you must make a few structural decisions, before you deploy your cloud PBX.

#### Location of VoIP Server

Voice quality on VoIP calls is affected by network latency, among other factors. Thus, it is advisable to select a datacenter that is closest to the general, geographic location of the majority of your anticipated calls.

## Server Setup

Follow the steps outlined in:

- [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server)

  > For increased security, it is advisable that you create your droplet with pre-installed SSH keys. _See_ [How To Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-digitalocean-droplets). **Windows users:** Refer [How To Create SSH Keys with PuTTY to Connect to a VPS](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps)

- [Initial Server Setup with Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04). &gt;\* For added security, it is advisable that you disable password logins. _See_.

#### Hostname & FQDN

Set your server’s hostname and Fully Qualified Domain Name by implementing the steps in [Setting the Hostname & Fully Qualified Domain Name (FQDN) on Ubuntu 12.04 or CentOS 6.4](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/blob/master/set_hostname_fqdn_on_ubuntu_centos.md).

#### Timezone

You can change your server’s timezone to whatever you want; altough it may be best to set it to the same timezone of most of your users. To do so, simply execute, in a terminal:

    sudo dpkg-reconfigure tzdata

and follow the instructions in the ensuing, on-screen prompts.

## Update Your System

To make sure that your server operating system (OS) is up to date, execute:

    sudo apt-get update && sudo apt-get -y dist-upgrade && sudo apt-get -y autoremove && sudo reboot now

When the update completes, the server will reboot to make sure that all of the software upgrades take effect.

## Download Source Files

Even though Asterisk is packaged in Ubuntu’s software repositories, the Asterisk release housed in the repos is out-dated. To download and extract the source files of the most-recent Long Term Support (LTS) version of Asterisk:

    cd /usr/src/ && sudo wget -O - "http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-11-current.tar.gz" | sudo tar xzf -

## Install Asterisk Dependencies

Asterisk is prepackaged with scripts that will install most of the needed dependencies. To use the scripts included with the Asterisk source files, execute:

    cd asterisk*/contrib/scripts && sudo ./install_prereq install && sudo ./install_prereq install-unpackaged

#### Select Country Code

During the installation of the dependencies, you will be prompted to enter the code for the country from which your phone system will be operating, as depicted below:

![Enter your country code](http://i.imgur.com/37iznpU.png)

Enter the number `1` for North America, including the United States or Canada; tap on the `Tab` key, to highlight `<Ok>`; and press `Enter`.

> Wikipedia maintains a [list of country codes](http://en.wikipedia.org/wiki/List_of_country_calling_codes).

## Install Asterisk

Now, execute:

    cd /usr/src/asterisk* && sudo ./configure && sudo make menuselect && sudo make && sudo make install && sudo make config && sudo make samples

> During the installation, the system will present an `Asterisk Module and Build Option Selection` menu. For a default install, tap on the `Tab` to highlight `Save & Exit`, and press `Enter` to allow the install to continue. For more about using Menuselect, please refer to the Asterisk Wiki: [Using Menuselect to Select Asterisk Options](https://wiki.asterisk.org/wiki/display/AST/Using+Menuselect+to+Select+Asterisk+Options).

## Start PBX Services

To start Asterisk, execute:

    sudo service asterisk start

Asterisk should now be running in the background.

## Verify Successful Install

To connect to the Asterisk command-line interface (CLI), execute:

    asterisk -rvvv

> The `-r` parameter tells the system that you want to re-connect to the Asterisk service. Each `v` parameter increases the verbosity level when you connect to the Asterisk CLI.

For help in the CLI mode, execute:

    help

If you would like to exit the Asterisk console and return to your shell, execute:

    quit

## Sample Configuration Files

Sample configuration files can be found in the default directory: `/etc/asterisk/`. Create backups of these files:

> Execute each line individually.

    cd /etc/asterisk
    sudo mv modules.conf modules.conf.sample
    sudo mv extensions.conf extensions.conf.sample
    sudo mv sip.conf sip.conf.sample
    sudo mv iax.conf iax.conf.sample

and use them as templates to create new configurations for testing or production purposes.

## Configure Outgoing-Mail Server

To receive email notifications from your Asterisk server, follow the steps outlined in [How To Install a Send-Only Mail Server with Exim on Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-install-the-send-only-mail-server-exim-on-ubuntu-12-04).

## Security

Any server accessible from the public Internet should be security hardened, and an Asterisk IP-PBX is no exception. Security best practices, however, are not within the scope of this article.

## Additional Resources

- [Asterisk Documentation](http://www.asterisk.org/community/documentation)
- [Asterisk Forums](http://forums.asterisk.org/)
- [Asterisk Mailing Lists & Chat Channels on IRC](http://www.asterisk.org/community/discuss)
- [Asterisk Wiki](https://wiki.asterisk.org/wiki/display/AST/Home)

As always, if you need help with the steps outlined in this How-to, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • DATE

```WIP ~ DRAFT ~ WIP ~~~
=========================

*[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls)* gladly accepted
```
