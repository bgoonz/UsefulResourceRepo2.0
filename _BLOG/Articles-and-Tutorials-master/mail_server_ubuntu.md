#### ~~~ WIP ~ Draft ~ WIP ~~~

_[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls)_ gladly accepted How to Deploy a Dovecot-Postfix Mail Server on Ubuntu 12.04 =

### Introduction

There are many, many ways in which to setup and configure a mail server. This article aims to outline a quick, and simple, way of deploying a mail server with the Postfix and Dovecot backends.

## Server Setup

Follow the steps outlined in:

1.  [How To Create Your First DigitalOcean Droplet Virtual Server](https://www.digitalocean.com/community/articles/how-to-create-your-first-digitalocean-droplet-virtual-server)

    > For increased security, it is advisable that you create your droplet with pre-installed SSH keys. _See_ [How To Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/articles/how-to-use-ssh-keys-with-digitalocean-droplets). **Windows users:** Refer to [How To Create SSH Keys with PuTTY to Connect to a VPS | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps)

2.  [Initial Server Setup with Ubuntu 12.04 | DigitalOcean](https://www.digitalocean.com/community/articles/initial-server-setup-with-ubuntu-12-04). &gt;\* For added security, it is advisable that you disable password logins. _See_ [How To Create SSH Keys with PuTTY to Connect to a VPS | DigitalOcean](https://www.digitalocean.com/community/articles/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps).

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

## Install Mail Server Packages

The `mail-stack-delivery` package will install Dovecot and configure Postfix to use it for both SASL authentication and as a Mail Delivery Agent (MDA). The package also configures Dovecot for IMAP, IMAPS, POP3, and POP3S. To install the package, execute:

    sudo apt-get -y install mail-stack-delivery

### Configuration Options

1.  During the installation, you will presented a prompt, asking you to “select the mail server configuration type that best meets your needs.” Leave the default option set (`Internet Site`), tap on the `Tab` key, on your keyboard, to highlight `<Ok>`, and tap on the `Enter` key.

2.  You will then be asked to provide the Fully Qualified Domain Name (FQDN) of your mail server. If you configured your `/etc/hosts` file correctly, your servers FQDN should be prefilled. Tap on the `Tab` key, on your keyboard, to highlight `<Ok>`, and tap on the `Enter` key.

Congratulations, you now have a working mail server.

**Note:** The `mail-stack-delivery` package uses the certificate and key from the `ssl-cert` package and is more than adequate for testing purposes.

## SSL Certificate

To use your new mail server in a production environment, you should create a custom SSL certificate and key generated specifically for your mail server. You can obtain a free SSL certificate from the StartCom Certification Authority (CA), at [StartSSL.com](http://www.startssl.com/) or you may create a self-signed certificate.

#### Generating a Certificate Signing Request (CSR)

To obtain an SSL certificate from a commercial CA, you will need to provide the CA with a CSR. To generate a CSR, execute:

    sudo openssl req -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/mail.key -out mail.csr

### Self-signed Certificate

To create a self-signed certificate, execute:

    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/mail.key -out /etc/ssl/certs/mail.pem

### Add Certificate Details to the Postfix & Dovecot Configuration Files

Once you have a customized certificate and key for your mail server, execute:

    sudo vim /etc/postfix/main.cf

and change the following directives to reflect the locations of your certificate and private key:

    smtpd_tls_cert_file = /etc/ssl/certs/mail.pem
    smtpd_tls_key_file = /etc/ssl/private/mail.key

Then, do the same for Dovecot:

    sudo vim /etc/dovecot/conf.d/01-mail-stack-delivery.conf

Finally, restart Postfix:

    sudo /etc/init.d/postfix restart

## Limiting Mail Delivery to Secure Protocols

Now that you have the benefits of SSL security available, make sure that secure protocols are always used:

    sudo vim /etc/dovecot/dovecot.conf

Look for the `protocols` directive and limit the protocols to the following:

    protocols = imaps pop3s

Then, execute:

    sudo vim /etc/dovecot/conf.d/01-mail-stack-delivery.conf

and do the same:

    protocols = imaps pop3s

In addition, uncomment the `inet_listener imaps` section by removing the `#` character, i.e.

    inet_listener imaps

## Limit Sending Mail to Secure Protocol

Execute:

    sudo vim /etc/postfix/master.cf

Uncomment the `smtps inet` line and all the `-o` options that follow.

## Security

Any server accessible from the public Internet should be security hardened, and a mail server is no exception. While security best practices are not within the scope of this article – at a minimum – add a firewall. _See_ [How to Setup a Firewall with UFW on an Ubuntu and Debian Cloud Server](https://www.digitalocean.com/community/articles/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server).

## Additional Resources

---

As always, if you need help with the steps outlined in this How-to, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • DATE

```WIP ~ DRAFT ~ WIP ~~~
=========================

*[Pull Requests](https://github.com/DigitalOcean-User-Projects/Articles-and-Tutorials/pulls)* gladly accepted
```
