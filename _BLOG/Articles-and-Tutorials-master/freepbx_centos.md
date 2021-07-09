# How To Install FreePBX on CentOS 6.4

### Introduction

Since the introduction of the private branch exchange (PBX) in the 1970s, companies have become dependent on the many features that were introduced over time. Today, businesses have a variety of options when it comes to telephone systems. Many are choosing the cloud with a hosted PBX solution in order to reduce capital expenses, maintenance & upgrade costs – while still reaping the benefits of the latest PBX features.

This article aims to provide a guide through the (initial) planning and deployment of a [FreePBX](http://www.freepbx.org/) & [Asterisk](http://www.asterisk.org/) VoIP server and assumes you will be starting from a base install of `CentOS 6.4`.

## What is a PBX?

A PBX is a system that connects internal telephone extensions to outside public & mobile telephone networks. An IP (Internet Protocol) PBX is a PBX that provides audio, video, and instant messaging communication through data networks connected with the Public Switched Telephone Network (PSTN) for worldwide telephony communication.

In addition to the traditional PSTN (i.e. landline), modern PBX systems also utilize the Voice over Internet Protocol (VoIP). VoIP gateways enable businesses to use their managed intranets to help reduce long-distance expenses; and enjoy the benefits of a single network for voice and data communication.

## Asterisk IP PBX

Asterisk is an open source software implementation of a telephone PBX. Like any PBX, it allows connected telephones to make calls to one another, and to connect to other telephone services, such as traditional landlines (i.e. PSTN) and VoIP networks.

The Asterisk software includes many features available in proprietary PBX systems:

- Voice mail
- Conference calling
- Interactive voice response (IVR or _phone menus_)
- Automatic call distribution (ACD)
- Fax-to-email
- SIP Trunks
- and much, much more

In addition, users can create new functionality by writing dial-plan scripts in several of Asterisk’s own extensions languages or by adding custom, loadable modules.

## FreePBX

FreePBX is an open source graphical user interface (GUI) that controls and manages Asterisk. Without FreePBX, Asterisk’s configuration files could only be modified via the command line. FreePBX can be installed manually or as part of a pre-configured Distro.

#### FreePBX Distro

The FreePBX Distro is an open source Unified Communications (UC) Server that includes the Asterisk VoIP server, the FreePBX GUI, and assorted dependencies, which include (but are not limited to):

- Apache HTTP Server
- Cyrus SASL (Simple Authentication Security Layer)
- Dnsmasq
- Fail2ban
- iptables (Firewall)
- Mailx
- MySQL Server
- Network Time Protocol (NTP)
- OpenVPN Server (_although **not** pre-configured to start on boot, by default_)
- Postfix
- Prosody XMPP Server
- TFTP Server
- Very Secure FTP Daemon (vsfptd)
- Vim text editor (you may be interested in [How To Use Vim for Advanced Editing of Plain Text or Code on a VPS | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-use-vim-for-advanced-editing-of-plain-text-or-code-on-a-vps--2))

The FreePBX Distro is based on CentOS, which has binary compatibility with Red Hat Enterprise Linux. FreePBX is a very large part of why Asterisk has been as successful as it has.

## Preparatory Steps

First, you must make a few structural decisions, before you deploy your cloud PBX.

### Location of VoIP Server

Voice quality on VoIP calls is affected by network latency, among other factors. Thus, it is advisable to select a datacenter that is closest to the general, geographic location of the majority of your anticipated calls.

### Accessing VoIP Server After Deployment

To access your IP PBX server after deployment, you will need to open a web browser and navigate to your cloud server’s IP address or fully qualified domain name (FQDN). If you wish to assign a FQDN to your VoIP server, make sure that you assign a FQDN as your server’s hostname – when you create your DigitalOcean cloud server in the next step – via the [DigitalOcean Control Panel](https://www.digitalocean.com/community/articles/the-digitalocean-control-panel).

### Server Specifications

Deciding on the best size machine for your cloud IP-PBX server is not an exact science. Try to best anticipate your average call volume; and then follow the steps outlined in: [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server) to deploy a `CentOS 6.4` virtual private server (VPS).

> #### SSH Keys
>
> For increased security, it is advisable that you:
>
> - Create your droplet with pre-installed SSH keys. _See_ [How To Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-digitalocean-droplets) (**Windows users:** Refer to the article cited, next); **_and_**
> - Disable password logins. _See_ [How To Create SSH Keys with PuTTY to Connect to a VPS](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps).

Generally speaking, a VPS with:

<table><thead><tr class="header"><th>Memory</th><th>Concurrent Calls</th></tr></thead><tbody><tr class="odd"><td>512 MB</td><td>Supports approx. 5-15</td></tr><tr class="even"><td>1 GB</td><td>Supports approx. 15-25</td></tr><tr class="odd"><td>2 GB</td><td>Supports approx. 25-50</td></tr><tr class="even"><td>4 GB</td><td>Supports approx. 50-100</td></tr><tr class="odd"><td>8 GB</td><td>Supports approx. 100-175</td></tr><tr class="even"><td>16 GB</td><td>Supports approx. 175+</td></tr></tbody></table>

**NOTE:** It is safe to “guess low.” If you underestimate your call volume, try adding swap space. _See_ [How To Add Swap on CentOS 6 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-add-swap-on-centos-6). In addition, DigitalOcean makes it easy to resize your cloud server, later.

### Set the Hostname and FQDN in `/etc/hosts`

Next, follow the steps outlined in [Setting the Hostname & Fully Qualified Domain Name (FQDN) on Ubuntu 12.04 or CentOS 6.4](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/blob/master/set_hostname_fqdn_on_ubuntu_centos.md). If entered properly at the time that your cloud server was created, the machine’s `hostname` should already be formatted as a FQDN. If so, feel free to skip to the section titled [Setting the Fully Qualified Domain Name (FQDN)](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/blob/master/set_hostname_fqdn_on_ubuntu_centos.md#setting-the-fully-qualified-domain-name-fqdn).

### Setting the Timezone

You can set your server’s timezone to whatever you want. It may be best to set it to the same timezone as most of your callers. If you are unsure which timezone would be best, consider using universal coordinated time (UTC) – also known as `Greenwich Mean Time`.

To view the current timezone, execute:

    date

To change your CentOS server’s timezone, you need to create a symbolic link from a zone file in `/usr/share/zoneinfo/` to `/etc/localtime`. To do so, you first need to find the zone file for your timezone (see the examples below for common possibilities):

#### Eastern Standard Time:

    ln -sf /usr/share/zoneinfo/EST /etc/localtime

#### American Central:

    ln -sf /usr/share/zoneinfo/US/Central /etc/localtime

#### American Pacific:

    ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime

#### Universal Coordinated Time:

    ln -sf /usr/share/zoneinfo/UTC /etc/localtime

### Update Current Software

Now you need to install the available software updates for your CentOS server. Doing so patches security holes in packages and helps protect your droplet against unauthorized access.

    yum update

## Installation

First, navigate to your server’s `/tmp` directory by executing the following command:

    cd /tmp

Next, download the FreePBX Distro installation script by executing:

    wget http://upgrades.freepbxdistro.org/blank-centos-installer/4.211.64-track/4.211.64-1-Installer-Script.sh

> This script assumes you have a base install of CentOS 6.4. It will convert your system to a FreePBX Distro.

Then, make the script executable:

    chmod +x 4.211.64-1-Installer-Script.sh

Run the installer script, by executing:

    ./4.211.64-1-Installer-Script.sh

Once completed, you should have a full-functioning IP-PBX server, based on the FreePBX Distro. (If you encountered any problems, feel free to create a post in the FreePBX [Distro Discussion & Help](http://www.freepbx.org/forums/freepbx-distro/distro-discussion-help) forum.)

## Update your FreePBX Distro

FreePBX publishes update scripts for new FreePBX Distro releases on its [website](http://wiki.freepbx.org/display/FD/FreePBX-Distro-4.211.64). It is advisable that you bookmark that page and refer to it on a regular basis to obtain any recent upgrade scripts that may have been made available.

To update your FreePBX Distro to the most recent release, you will need to execute a _series of individual_ shell scripts **AND** do so in _sequential order_.

### Version Numbering System

The FreePBX Version Numbering System tells you at a glance which versions of core components a particular FreePBX Distro release is comprised of.

For example, FreePBX Distro **4.211.64-1** means:

- **4**.211.64-1 = The first number (**4**) represents the Major Track Number
- 4.**211**.64-1 = The second number (**211**) refers to the FreePBX **GUI version 2.11**
- 4.211.**64**-1 = The third number (**64**) refers to **CentOS version 6.4**
- 4.211.64-**1** = The final number (**1**) is used as the _minor release revision_ of this Major Track Number

### Check Current FreePBX Distro Version

In a terminal, execute:

    cat /etc/schmooze/pbx-version

As mentioned above, the FreePBX Distro release identifier is the final number. For example, in this article’s previous steps, you deployed the following script: `4.211.64-1-Installer-Script.sh`. Notice the final numerical digit: The number `1` in this example.

### Download & Execute Applicable Upgrade Script

The first time you, ever, execute an update script, enter the following commands in a terminal window (to create a directory in which to store all future Distro-update scripts):

    cd
    mkdir -p ~/FreePBX/UpdateScripts
    cd ~/FreePBX/UpdateScripts

**Upgrade Step 1:** Execute, in a terminal window:

    wget http://upgrades.freepbxdistro.org/stable/4.211.64/upgrade-4.211.64-2.sh

**Upgrade Step 2:** Make the file executable:

    chmod +x upgrade-4.211.64-2.sh

**Upgrade Step 3:** Execute:

    ./upgrade-4.211.64-2.sh

The Distro upgrade script will update both FreePBX components (Asterisk & the FreePBX web GUI) and all base CentOS components.

**Upgrade Step 4:** Specific Script Instructions

Note or carry out any special instructions displayed (if any) at the end of the upgrade, such as to reboot the system.

**Upgrade Step 5:** Confirm the New FreePBX Distro Version

Check the updated (now current) version file – again, by executing `cat /etc/schmooze/pbx-version` – to confirm the current installed version of the FreePBX Distro is the expected newer version.

**Upgrade Step 6:** Repeat `Upgrade Steps 1-5` for each individual update script, in sequential order, found below.

    http://upgrades.freepbxdistro.org/stable/4.211.64/upgrade-4.211.64-3.sh
    http://upgrades.freepbxdistro.org/stable/4.211.64/upgrade-4.211.64-4.sh
    http://upgrades.freepbxdistro.org/stable/4.211.64/upgrade-4.211.64-5.sh
    http://upgrades.freepbxdistro.org/stable/4.211.64/upgrade-4.211.64-6.sh
    http://upgrades.freepbxdistro.org/stable/4.211.64/upgrade-4.211.64-7.sh
    http://upgrades.freepbxdistro.org/stable/4.211.64/upgrade-4.211.64-8.sh

Make sure to save each upgrade-script in `~/FreePBX/UpdateScripts`.

### Confirm Successful Installation

To confirm that FreePBX & Asterisk were installed successfully, open a web browser and navigate – via `https://` – to your cloud server’s FQDN or IP address, and you should be greeted by the FreePBX administrator-account setup screen.

![FreePBX Account Setup](http://i.imgur.com/AQPW20I.png)

### Create a FreePBX Admin User & Password

That username and password will be used in the future to access the FreePBX configuration screen, via the web GUI.

**Note:** This password does **not** change the underlying operating system’s root password, if any. It is _only_ used for access to the FreePBX web interface.

## Configure Mail Server

To configure Postfix & Cyrus SASL, begin with **Step Two** of this article: [How To Install Postfix on CentOS 6 | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-install-postfix-on-centos-6); but skip the section related to editing the `/etc/imapd.conf` file.

## Security

Any server accessible from the public Internet should be security hardened, and an Asterisk IP-PBX is no exception. Security best practices, however, are not within the scope of this article.

## Additional Configuration

To continue tailoring your Asterisk VoIP server to your specific environment, check out the FreePBX Distro [First Steps After Installation](http://wiki.freepbx.org/display/FD/FreePBX+Distro+First+Steps+After+Installation) guide.

## Additional Resources

- [Asterisk & FreePBX Deployment Questionnaire](http://wiki.freepbx.org/display/HTGS/Asterisk+and+FreePBX+Deployment+Questionnaire#AsteriskandFreePBXDeploymentQuestionnaire-SystemGreetings)
- [FreePBX Wiki](http://wiki.freepbx.org/)
- [FreePBX Forums](http://www.freepbx.org/forums)
- [New FreePBX Users | Guide to Diagnosing Problems](http://www.freepbx.org/support/documentation/howtos/howto-new-freepbx-users-guide-to-diagnosing-problems)

As always, if you need help with the steps outlined in this How-to, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • Updated 12/19/2013
