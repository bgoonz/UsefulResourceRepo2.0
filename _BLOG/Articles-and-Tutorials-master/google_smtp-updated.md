# How To Use Google’s SMTP Server

### Introduction

A little-known feature about Gmail and Google Apps email is Google’s portable SMTP server. Instead of having to manage your own outgoing mail server on your DigitalOcean VPS, you can simply configure Google’s SMTP server settings into whatever script or program you wish to send email from. All you need is either a (i) free Gmail account or (ii) paid Google Apps account.

## Benefits

You have the option of having Google store and index the emails you send via its SMTP server, so all your sent emails will be searchable and backed-up on Google’s servers. If you elect to use your Gmail or Google Apps account for your incoming email as well, you’ll have all your email in one convenient place. Also, since Google’s SMTP server does not use Port 25, you’ll reduce the probability that an ISP might block your email or flag it as SPAM.

## Settings

Google’s SMTP server **requires** authentication, so here’s how to set it up:

<table><tbody><tr class="odd"><td>Server address<br />
(i.e., outgoing mail):</td><td><strong>smtp.gmail.com</strong></td></tr><tr class="even"><td>Username:</td><td><strong>Your <strong>full</strong> Gmail or Google Apps e-mail address</strong><br />
(e.g. example@gmail.com or example@yourdomain.com)</td></tr><tr class="odd"><td>Password:</td><td><strong>Your Gmail or Google Apps e-mail password</strong></td></tr><tr class="even"><td>Port:</td><td><strong>465</strong></td></tr><tr class="odd"><td>TLS/SSL required?:</td><td><strong>yes</strong></td></tr></tbody></table>

In order to store a copy of outgoing e-mails in your Gmail or Google Apps _Sent_ folder, log into your Gmail or Google Apps e-mail _Settings_ and:

1.  Click on the _Forwarding/IMAP_ tab; and
2.  scroll down to the _IMAP Access_ section;
3.  IMAP must be **enabled** in order for e-mails to be properly copied to your _Sent_ folder.

**NOTE:** Google automatically rewrites the FROM: field of any e-mail you send via its SMTP server to the default **Send mail as** e-mail address in your Gmail or Google Apps e-mail account _Settings_. You need to be aware of this nuance because it affects the presentation of your e-mail, from the point of view of the recepient, and it may also affect the Reply-To setting of some programs.

**Workaround:** In your Google e-mail _Settings_, go to the _Accounts_ tab/section and make “default” an account other than your Gmail account. This will cause Google’s SMTP server to re-write the FROM: field with whatever address you enabled as the default **Send mail as** address.

## Sending Limits

Google limits the amount of mail a user can send, via its portable SMTP server. This limit restricts the number of messages sent per day to 99 emails; and the restriction is automatically removed within 24 hours after the limit was reached.

## Additional Resources

- [How To use an SPF Record to Prevent Spoofing & Improve E-mail Reliability](https://www.digitalocean.com/community/articles/how-to-use-an-spf-record-to-prevent-spoofing-improve-e-mail-reliability)

As always, if you need help with the steps outlined in this How-To, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article submitted by: [Pablo Carranza](https://plus.google.com/107285164064863645881?rel=author) • Updated 12/10/2013
