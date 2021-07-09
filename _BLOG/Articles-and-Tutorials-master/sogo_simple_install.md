```WIP ~ DRAFT ~ WIP ~~~
=========================

*[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls) gladly accepted*

Share your Calendars, Address Books & Mail with SOGo Groupware Server on Ubuntu 12.04
=====================================================================================

### Introduction

SOGo is an open-source, modern, scalable groupware server. It offers shared calendars, address books, and emails through your favorite web browser, desktop client, and mobile device.

Requirements
------------

SOGo is **not** an all-in-one solution like Microsoft Exchange (this is a good thing!). Instead, SOGo reuses many components in an infrastructure; particularly, the:

-   SMTP server (e.g. Postfix);
-   IMAP server (e.g. Cyrus or Dovecot);
-   Database server (e.g. MySQL or PostgreSQL);

#### User Authentication

SOGo places an emphasis on scalability. Thus, several user-authentication methods are supported, whether:

-   You are hosting a groupware server for a small workgroup and want to use your server’s system accounts; or
-   Work in a medium-sized workgroup that utilize a local database for user-athentication; or
-   A large organization that utilizes OpenLDAP; or
-   Need an enterprise solution that incorporates an open-source iteration of Active Directory, such as Samba4 or FreeIPA.

SOGo will literally transform these loosely-coupled components into an efficient, integrated groupware solution, which can be accessed from (i) your favorite web browser; (ii) a variety of desktop clients; and (iii) mobile devices.

Server Setup
------------

1.  Follow the steps outlined in [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server) to deploy the latest release of an `Ubuntu 12.04 server`.

    > #### SSH Keys
    >
    > For increased security, it is advisable that you:
    >
    > -   Create your droplet with pre-installed SSH keys. *See* [How To Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-digitalocean-droplets) (**Windows users:** Refer to the article cited, next); **and**
    > -   Disable password logins. *See* [How To Create SSH Keys with PuTTY to Connect to a VPS](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps).

2.  Follow the steps in [Initial Server Setup with Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04).

### Hostname & FQDN

Set your server’s hostname and Fully Qualified Domain Name by implementing the steps in [Setting the Hostname & Fully Qualified Domain Name (FQDN) on Ubuntu 12.04 or CentOS 6.4](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/blob/master/set_hostname_fqdn_on_ubuntu_centos.md).

### Timezone

You can change your server’s timezone to whatever you want; altough it may be best to set it to the same timezone of most of your users. To do so, simply execute, in a terminal:

    sudo dpkg-reconfigure tzdata

and follow the instructions in the ensuing on-screen prompts.

### Add SOGo Repository & GPG Public Key

Add the SOGo repository to your `apt-sources list`, by copying & pasting both lines, below, into the command line and pressing `Enter`:

    echo -e "deb http://inverse.ca/ubuntu precise precise \n\
    deb-src http://inverse.ca/ubuntu precise precise" | sudo tee /etc/apt/sources.list.d/SOGo.list

Next, you must add SOGo’s GPG public key to Ubuntu’s `apt keyring`. To do so, execute the following commands:

    sudo apt-key adv --keyserver keys.gnupg.net --recv-key 0x810273C4

Then, update your lists of available software packages, by executing:

    sudo apt-get update && sudo apt-get -y dist-upgrade && sudo apt-get -y autoremove && sudo reboot now

Postfix & Dovecot Installation
------------------------------

A convenient option for installing and configuring Postfix for SMTP-AUTH is to use Ubuntu’s `mail-stack-delivery` package. The mail stack provides fully operational delivery with safe defaults and additional options.

Out of the box, the mail stack supports IMAP, POP3 and SMTP services with SASL authentication and Maildir as default storage engine. This package will install Dovecot and configure Postfix to use it for both SASL authentication and as a Mail Delivery Agent (MDA). The package also configures Dovecot for IMAP, IMAPS, POP3, and POP3S.

    sudo apt-get -y install mail-stack-delivery

SSL Certificate
---------------

If you do not own a commercial SSL Certificate, you have two options:

-   Obtain a free certificate from StartSSL, *see* [How To Set Up Apache with a Free Signed SSL Certificate on a VPS | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-set-up-apache-with-a-free-signed-ssl-certificate-on-a-vps); or
-   Create a self-signed certificate. *See* [How To Create a SSL Certificate on Apache for Ubuntu 12.04](https://www.digitalocean.com/community/articles/how-to-create-a-ssl-certificate-on-apache-for-ubuntu-12-04).

#### SSL Directories

Once you have an SSL certificate and key, execute:

    sudo vim /etc/postfix/main.cf

> Then, tap on the `i` key (on your keyboard) to enter the Vim text editor’s “insert mode.”

and change the following options:

    smtpd_tls_cert_file = /etc/ssl/certs/mail.pem
    smtpd_tls_key_file = /etc/ssl/private/mail.key

> To save your edit, and exit, tap the following keys: `Esc`,`:`, `w`, `q`, `Enter`.

Finally, restart Postfix & Dovecot:

    sudo service postfix restart && sudo service dovecot restart

SOGo Installation
-----------------

Install SOGo by executing:

    sudo apt-get -y install sogo

Install PostgreSQL Database
---------------------------

Next, execute:

    sudo apt-get -y install postgresql sope4.9-gdl1-postgresql postfix-pgsql

Next, create the SOGo database in PostgreSQL. Start by switching to the PostgreSQL user:

    sudo su - postgres

Then, execute:

    createuser --no-superuser --no-createdb --no-createrole --encrypted --pwprompt sogo

The system will respond with the following request: `Enter password for new role:`

To which, enter `sogo`. The system will then ask you to `Enter it again:`. Do so and press the `Enter` key. Then, execute:

    createdb -O sogo sogo

Now, exit the `postgres` user mode:

    exit

Then, execute:

    echo "host sogo sogo 127.0.0.1/32 md5" | sudo tee -a /etc/postgresql/9.1/main/pg_hba.conf

Now, execute:

    sudo vim /etc/postgresql/9.1/main/pg_ident.conf

Append the following to the end of that file:

    mailmap         dovecot                 mailreader
    mailmap         postfix                 mailreader
    mailmap         root                    mailreader

Then, execute:

    sudo vim /etc/postgresql/9.1/main/pg_hba.conf

and look for the line that reads `Put your actual configuration here`. Add the following, immediate after that line:

    local       mail    all     peer map=mailmap

Restart PostgreSQL:

    sudo service postgresql restart

### Set Up the Database

Switch to the PostgreSQL user:

    sudo su - postgres

Execute the following commands, individually:

    CREATE USER mailreader;
    REVOKE CREATE ON SCHEMA public FROM PUBLIC;
    REVOKE USAGE ON SCHEMA public FROM PUBLIC;
    GRANT CREATE ON SCHEMA public TO postgres;
    GRANT USAGE ON SCHEMA public TO postgres;
    CREATE DATABASE mail WITH OWNER mailreader;
    \q
    sudo psql -U mailreader -d mail
    \c mail

    CREATE TABLE aliases (
        alias text NOT NULL,
        email text NOT NULL
    );
    CREATE TABLE users (
        email text NOT NULL,
        password text NOT NULL,
        maildir text NOT NULL,
        created timestamp with time zone DEFAULT now()
    );
    ALTER TABLE aliases OWNER TO mailreader;
    ALTER TABLE users OWNER TO mailreader;
    \q

You can now add virtual mailboxes, from the command line:

    doveadm pw -s sha512 -r 100
    Enter new password: ...
    Retype new password: ...
    {SHA512}.............................................................==
    psql -U mailreader -d mail
    INSERT INTO users (
        email,
        password,
        maildir
    ) VALUES (
        'foo@yourdomain.tld',
        '{SHA512}.............................................................==',
        'foo/'
    );

Configure SOGo
--------------

Next, modify the SOGo configuration file to reflect the database settings, by entering each of the following commands individually:

    sudo su - sogo -s /bin/bash
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

Logout of the `sogo` user & return to your system user

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

Security Hardening
------------------

Any server accessible from the public Internet should be security hardened, and a groupware server is no exception. While security best practices are not within the scope of this article,

-   Change your SSH port from the default Port 22, as described in **Step Five** of [Initial Server Setup with Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04), to a random port **below 1024**;

-   Configure a [firewall](https://www.digitalocean.com/community/articles/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server) and make sure to open your **custom SSH port** and **TCP Ports 25 & 465**;
-   The default firewall configuration tool for Ubuntu is `ufw`. To open the necessary ports, simply execute:

             sudo ufw allow [custom SSH port below 1024]/tcp
             sudo ufw allow 143/tcp
             sudo ufw allow 587/tcp
             sudo ufw enable
             sudo ufw status verbose

-   Either [disable password logins](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps) or deploy [Fail2ban](https://www.digitalocean.com/community/articles/how-to-protect-ssh-with-fail2ban-on-ubuntu-12-04).

Additional Resources
--------------------

-   SOGo [Installation and Configuration Guide](http://www.sogo.nu/files/docs/SOGo%20Installation%20Guide.pdf)
-   SOGo [mailing list](https://lists.inverse.ca/sogo/subscribe/users)

As always, if you need help with the steps outlined in this How-To, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • DATE

~~~ WIP ~ DRAFT ~ WIP ~~~
=========================

*[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls) gladly accepted*
```
