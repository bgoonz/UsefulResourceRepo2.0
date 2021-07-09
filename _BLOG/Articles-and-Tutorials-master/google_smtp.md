# How to Configure Google's SMTP Server on a Digitalocean Cloud Server

Do you need to send e-mail from your DigitalOcean droplet? A little-known feature about Gmail and Google Apps e-mail is Google's portable SMTP server. Instead of having to manage your own outgoing mail server on your DigitalOcean droplet, you can simply configure Google's SMTP server settings into whatever script or program you wish to send e-mail from. All you need is either a (i) [free Gmail account](https://accounts.google.com/SignUp?service=mail&hl=en_us&continue=http%3A%2F%2Fmail.google.com%2Fmail%2F%3Fpc%3Den-ha-na-us-bk&utm_campaign=en&utm_source=en-ha-na-us-bk&utm_medium=ha "Click here to create a new (free) account") or (ii) paid [Google Apps](http://www.google.com/enterprise/apps/business/pricing.html "Pricing | Google Apps for Business | United States") account.

## Benefits

---

In using Google's SMTP server in this manner (outside of Gmail's web interface), you have the option of having Google store and index the e-mails you send via its SMTP server, so all your sent e-mails will be searchable and backed-up on Google's servers. If you elect to use your Gmail or Google Apps account for your incoming e-mail as well, you'll have all your e-mail in one convenient place. In addition, since Google's SMTP server does not use Port 25, you'll reduce the probability that an ISP might block your e-mail or flag it as spam.

## Settings

---

Google's SMTP server **requires authentication**, so here's how to set it up:

<table><tbody><tr class="odd"><td>Server address<br />
(i.e., outgoing mail):</td><td><strong>smtp.gmail.com</strong></td></tr><tr class="even"><td>Username:</td><td><strong>Your <strong>full</strong> Gmail or Google Apps e-mail address</strong><br />
(e.g. example@gmail.com or example@yourdomain.com)</td></tr><tr class="odd"><td>Password:</td><td><strong>Your Gmail or Google Apps e-mail password</strong></td></tr><tr class="even"><td>Port:</td><td><strong>465</strong></td></tr><tr class="odd"><td>TLS/SSL required?:</td><td><strong>yes</strong></td></tr></tbody></table>

In order to store a copy of outgoing e-mails in your Gmail or Google Apps _Sent_ folder, log into your Gmail or Google Apps e-mail _Settings_ and:

1.  Click on the _Forwarding/IMAP_ tab; and
2.  scroll down to the _IMAP Access_ section;
3.  IMAP must be **enabled** in order for e-mails to be properly copied to your _Sent_ folder.

**NOTE:** Google automatically rewrites the FROM: field of any e-mail you send via its SMTP server to the default **Send mail as** e-mail address in your Gmail or Google Apps e-mail account _Settings_. You need to be aware of this nuance because it affects the presentation of your e-mail, from the point of view of the recepient, and it may also affect the Reply-To setting of some programs.

- **Workaround:** In your Google e-mail _Settings_, go to the _Accounts_ tab/section and make "default" an account other than your Gmail account. This will cause Google's SMTP server to re-write the FROM: field with whatever address you enabled as the default **Send mail as** address.

## Sending Limits

---

Google limits the amount of mail a user can send, via its portable SMTP server. This limit restricts the number of messages sent per day to 99 e-mails; and the restriction is automatically removed within 24 hours after the limit was reached.

## Additional Resources

---

- [How To Install iRedMail On Ubuntu 12.10 x64](https://www.digitalocean.com/community/articles/how-to-install-iredmail-on-ubuntu-12-10-x64);
- [How to Install and Setup Postfix on Ubuntu 12.04](https://www.digitalocean.com/community/articles/how-to-install-and-setup-postfix-on-ubuntu-12-04);
- [How to Install Postfix on CentOS 6](https://www.digitalocean.com/community/articles/how-to-install-postfix-on-centos-6);
- How to Protect Your Domain From Getting Spoofed & Improve Your E-mail's Reliability with an SPF Record;
- How to Configure Office 365 DNS Records on DigitalOcean's DNS Manager.

As always, if you need help with the steps in this HowTo, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article Submitted by: [Pablo Carranza](http://vdevices.com "of vDevices, LLC | Wisconsin")
