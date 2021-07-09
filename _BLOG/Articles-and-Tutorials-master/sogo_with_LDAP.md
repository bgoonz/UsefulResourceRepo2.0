```WIP ~ DRAFT ~ WIP ~~~
=========================

*[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls) gladly accepted*

Share your Calendars, Address Books & Mail with SOGo Groupware Server on Ubuntu 12.04
=====================================================================================

### Introduction

SOGo is an open source, modern, scalable groupware server. It offers shared calendars, address books, and emails through your favorite Web browser and by using a native client such as Mozilla Thunderbird and Lightning.

SOGo Features
-------------

-   Scalable architecture suitable for deployments from dozens to many thousands of users
-   Rich web-based interface that shares the look and feel, the features and the data of Mozilla Thunderbird and Lightning
-   Improved integration with Mozilla Thunderbird and Lightning by using the SOGo Connector and the SOGo Integrator
-   Two-way synchronization support with any SyncML-capable devices (BlackBerry, Palm, Windows CE, etc.) by using the Funambol SOGo Connector

SOGo is standard-compliant. It supports CalDAV, CardDAV, GroupDAV, iMIP and iTIP and reuses existing IMAP, SMTP and database servers – making the solution easy to deploy and interoperable with many applications. Mobile devices supporting the SyncML standard use the Funambol middleware to synchronize information.

Requirements
------------

SOGo reuses many components in an infrastructure:

-   LDAP server (e.g. OpenLDAP);
-   Database server (e.g. MySQL or PostgreSQL);
-   SMTP server (e.g. Postfix);
-   IMAP server (e.g. Cyrus or Dovecot).

Prerequisites
-------------

Follow the steps outlined in [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server) to deploy the latest release of an `Ubuntu 12.04 64-bit` virtual private server (VPS).

> #### SSH Keys
>
> For increased security, it is advisable that you:
>
> 1.  Create your droplet with pre-installed SSH keys. *See* [How To Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-digitalocean-droplets) (**Windows users:** Refer to the article cited, next); **and**
> 2.  Disable password logins. *See* [How To Create SSH Keys with PuTTY to Connect to a VPS](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps).

#### Hostname & FQDN

Set your server’s hostname and Fully Qualified Domain Name by implementing the steps in [Setting the Hostname & Fully Qualified Domain Name (FQDN) on Ubuntu 12.04 or CentOS 6.4](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/blob/master/set_hostname_fqdn_on_ubuntu_centos.md).

#### Timezone

You can change your server’s timezone to whatever you want; altough it may be best to set it to the same timezone of most of your users. To do so, simply execute, in a terminal:

    sudo dpkg-reconfigure tzdata

and follow the instructions in the ensuing on-screen prompts.

Install LDAP Server
-------------------

OpenLDAP is used by many to manage groups and users. While SOGo can function perfectly without an LDAP server, it is not practical to do so in environments with more than a handful of users. Thus, if you hope to use SOGo for more than family and a few friend, follow the steps outlined in [How To Install and Configure a Basic LDAP Server on an Ubuntu 12.04 VPS](https://www.digitalocean.com/community/articles/how-to-install-and-configure-a-basic-ldap-server-on-an-ubuntu-12-04-vps).

### Configure LDAP for SOGo Integration

#### Provision the Frontend

Execute (obviously, you can use whichever text editor you wish; but this guide assumes that you have installed the [vim text editor](https://www.digitalocean.com/community/articles/installing-and-using-the-vim-text-editor-on-a-cloud-server)):

    sudo vim frontend.yourdomain.tld.ldif

Now, on your keyboard, tap on the `i` key; use the arrow keys to navigate the text area; and copy & paste, or create your frontend file so that it resembles, the example below (replacing `yourdomain.tld` with the FQDN of your groupware server):

    dn: ou=Users,dc=yourdomain,dc=tld
    objectClass: organizationalUnit
    ou: Users

    dn: ou=Groups,dc=yourdomain,dc=tld
    objectClass: organizationalUnit
    ou: Groups

Now we add the LDIF and provision the server by executing the following command:

    sudo ldapadd -x -D cn=admin,dc=yourdomain,dc=tld -W -f frontend.yourdomain.tld.ldif

The system will respond with `Enter LDAP Password:`. Enter your root LDAP password (the one you set during `slapd` installation).

If provisioned correctly, the system will display:

    adding new entry "ou=Users,dc=yourdomain,dc=tld"

    adding new entry "ou=Groups,dc=yourdomain,dc=tld"

#### Create the SOGo Administrative Account

First, create the SOGo administrative account in your LDAP server. The following LDIF file (sogo.ldif) can be used as an example:

    dn: uid=sogo,ou=Users,dc=yourdomain,dc=tld
    objectClass: top
    objectClass: inetOrgPerson
    objectClass: person
    objectClass: organizationalPerson
    uid: sogo
    cn: SOGo Administrator
    mail: sogo@yourdomain.tld
    sn: Administrator
    givenName: SOGo

Load the LDIF file inside your LDAP server using the following command:

    sudo ldapadd -f sogo.ldif -x -w qwerty -D cn=admin,dc=yourdomain,dc=tld

If successful, the system will respond with `adding new entry "uid=sogo,ou=Users,dc=yourdomain,dc=tld"`.

Next, execute (replacing `LDAPpassword`):

    sudo ldappasswd -h localhost -x -w LDAPpassword -D cn=admin,dc=yourdomain,dc=tld uid=sogo,ou=Users,dc=yourdomain,dc=tld -s LDAPpassword

### Add SOGo Repository & GPG Public Key

Append the SOGo repository to your `apt source list`, by copying & pasting both lines, below, into the command line and pressing `Enter`:

    echo -e "deb http://inverse.ca/ubuntu precise precise \n\
    deb-src http://inverse.ca/ubuntu precise precise" | sudo tee /etc/apt/sources.list.d/SOGo.list

Next, you must add SOGo’s GPG public key to Ubuntu’s `apt keyring`. To do so, execute the following commands:

    sudo apt-key adv --keyserver keys.gnupg.net --recv-key 0x810273C4

Then, update your lists of available software packages, by executing:

    sudo apt-get update

SOGo Installation
-----------------

Install SOGo by executing:

    sudo apt-get -y install sogo

Install PostgreSQL Database
---------------------------

Next, execute:

    sudo apt-get -y install postgresql sope4.9-gdl1-postgresql

Next, create the SOGo database in PostgreSQL:

    su - postgres
    createuser --no-superuser --no-createdb --no-createrole --encrypted --pwprompt sogo

The system will respond with the following: `Enter password for new role:`

To which, enter `sogo`. The system will then ask you to `Enter it again:`. Do so and press the `Enter` key. Then, execute:

    createdb -O sogo sogo
    exit
    echo "host sogo sogo 127.0.0.1/32 md5" >> /etc/postgresql/9.1/main/pg_hba.conf

Finally, restart PostgreSQL:

    sudo service postgresql restart

Configure SOGo
--------------

Next, modify the SOGo configuration file to reflect the database settings, by entering each of the following commands individually:

    su - sogo -s /bin/bash
    defaults write sogod SOGoProfileURL "postgresql://sogo:sogo@localhost:5432/sogo/sogo_user_profile"
    defaults write sogod OCSFolderInfoURL "postgresql://sogo:sogo@localhost:5432/sogo/sogo_folder_info"
    defaults write sogod OCSSessionsFolderURL "postgresql://sogo:sogo@localhost:5432/sogo/sogo_sessions_folder"
    defaults write sogod OCSEMailAlarmsFolderURL "postgresql://sogo:sogo@localhost:5432/sogo/sogo_alarm_folder"

While still logged in as the `sogo` user, we’ll continue configuring SOGo:

    defaults write sogod SOGoTimeZone "America/Chicago"
    defaults write sogod SOGoDraftsFolderName "Drafts"
    defaults write sogod SOGoSentFolderName "Sent"
    defaults write sogod SOGoTrashFolderName "Trash"
    defaults write sogod SOGoIMAPServer "localhost:144"
    defaults write sogod SOGoSieveServer "sieve://127.0.0.1:4190"
    defaults write sogod SOGoSieveScriptsEnabled "YES"

#### Optional

If you want to allow users to add their own IMAP account in SOGo, add the following command:

    defaults write sogod SOGoMailAuxiliaryUserAccountsEnabled YES

Logout of the `sogo` user & return to the `root` user

    exit

SOGo Web UI Setup
-----------------

    sudo apt-get -y install apache2

### Apache Configuration

You have now to configure Apache2 by executing:

    sudo vim /etc/apache2/conf.d/SOGo.conf

Next, add a hash to the following lines:

    # RequestHeader set "x-webobjects-server-port" "443"
    # RequestHeader set "x-webobjects-server-name" "yourhostname"
    # RequestHeader set "x-webobjects-server-url" "https://yourhostname"

Enable the necessary modules for Apache2:

    sudo a2enmod proxy
    sudo a2enmod proxy_http
    sudo a2enmod headers
    sudo a2enmod rewrite
    sudo a2dismod reqtimeout

Restart Apache2

    sudo service apache2 restart

There is a small bug in the `init.d` of Sogo that holds up the start-up process. You must edit the `init` file:

    sudo vim /etc/init.d/sogo

and add the `-b` argument at lines 70 and 88:

    #Line 70
    if ! start-stop-daemon -b -c $USER --quiet --start --pidfile $PIDFILE --exec $DAEMON -- $DAEMON_OPTS
    # Line 88
    start-stop-daemon -b -c $USER --quiet --start --pidfile $PIDFILE --exec $DAEMON -- $DAEMON_OPTS

#### Restart SOGo:

    sudo service sogo restart

Postfix & Dovecot Installation
------------------------------

Install Postfix

    sudo apt-get -y install postfix postfix-ldap

Let as usual the default options, then give the following parameter to Postfix to use maildir format.

    postconf -e "home_mailbox=.Maildir/"

Next, execute:

    postconf -e "mailbox_transport = lmtp:unix:/var/run/cyrus/socket/lmtp"

It’s also necessary to indicate to Postfix do not use ltmp in a chroot mode as it will not able to communicate with Cyrus-Imap.

    sudo vim /etc/postfix/master.cf

And change the line to add the “n” letter in the right placement like the following line.

    lmtp      unix  -       -       n       -       -       lmtp

Then restart Postfix

    sudo service postfix restart

Installation
------------

To install Dovecot, execute:

    sudo apt-get install dovecot-imapd

Configure Dovecot by creating a new file:

    sudo vim /etc/dovecot/local.conf

and paste the following text:

    mail_location = maildir:~/.Maildir
    disable_plaintext_auth = no

    passdb {
    driver = static
    args = nopassword=y host=127.0.0.1
    }

Restart Dovecot:

    sudo service dovecot restart

### Security Hardening

Any server accessible from the public Internet should be security hardened, and a groupware server is no exception. While security best practices are not within the scope of this article,

-   Change your SSH port from the default Port 22 to a random port **below 1024**, as described in **Step Five** of [Initial Server Setup with Ubuntu 12.04](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04);

-   Configure a [firewall](https://www.digitalocean.com/community/articles/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server) and make sure to open your **custom SSH port** and **TCP Ports 25 & 465**;
-   The default firewall configuration tool for Ubuntu is `ufw`. To open the necessary ports, simply execute:

             sudo ufw allow [custom SSH port below 1024]/tcp
             sudo ufw allow
             sudo ufw enable
             sudo ufw status verbose

-   Either [disable password logins](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps) or deploy [Fail2ban](https://www.digitalocean.com/community/articles/how-to-protect-ssh-with-fail2ban-on-ubuntu-12-04).

As always, if you need help with the steps outlined in this How-To, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • DATE

~~~ WIP ~ DRAFT ~ WIP ~~~
=========================

*[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls) gladly accepted*
```
