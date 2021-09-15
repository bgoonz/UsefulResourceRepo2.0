# How to Protect Your Domain From Getting Spoofed & Improve Your E-mail's Reliability with an SPF Record

A carefully tailored SPF record will (i) reduce the likelihood of your domain name getting fraudulently spoofed and (ii) keep your messages from getting flagged as spam before they reach your recipients. Email spoofing is the creation of email messages with a forged sender address; something that is simple to do because many mail servers do not perform authentication. Spam and phishing emails typically use such spoofing to mislead the recipient about the origin of the message. A number of measures to address spoofing, however, have developed over the years: [SPF](http://www.openspf.org), [Sender ID](http://www.microsoft.com/mscorp/safety/technologies/senderid/default.mspx), [DKIM](http://www.dkim.org), and [DMARC](http://www.dmarc.org).

Sender Policy Framework (SPF) is an email validation system designed to prevent spam by detecting email spoofing. Today, nearly all abusive e-mail messages carry fake sender addresses. The victims whose addresses are being abused often suffer from the consequences, because their reputation gets diminished, they have to waste their time sorting out misdirected bounce messages, or (worse) their IP addresses get blacklisted.

The SPF is an open standard specifying a technical method to prevent sender-address forgery. SPF allows administrators to specify which hosts are allowed to send mail on behalf of a given domain by creating a specific SPF record (or TXT record) in the Domain Name System (DNS). Mail exchangers use DNS records to check that mail from a given domain is being sent by a host sanctioned by that domain's administrators.

## Benefits

---

Adding an SPF record to your DNS zone file is the best way to stop spammers from spoofing your domain. In addition, an SPF Record will reduce the number of legitimate e-mail messages that are flagged as spam or bounced back by your recipients' mail servers. The SPF record is not 100% effective, unfortunately, because not all mail providers check for it. Many do, however, so you should notice a significant decrease in the amount of bounce-backs you receive.

## [Example SPF Record](http://www.openspf.org/svn/project/specs/rfc4408.html#examples)

---

An SPF record is added to your domain's DNS zone file as a TXT record and it identifies authorized SMTP servers for your domain.

`TXT @ "v=spf1 a include:_spf.google.com ~all"`

If you are utilizing the [DigitalOcean DNS Manager](https://www.digitalocean.com/community/articles/how-to-set-up-a-host-name-with-digitalocean), make sure to wrap the SPF record with quotes. The following table provides an explanation of the various components of the Example SPF Record:

<table><tbody><tr class="odd"><td>TXT</td><td>The DNS zone record type; SPF records are written as TXT records</td></tr><tr class="even"><td>@</td><td>In a DNS file, the "@" symbol is a placeholder used to represent "the current domain"</td></tr><tr class="odd"><td>v=spf1</td><td>Identifies the TXT record as an SPF record, utilizing SPF Version 1</td></tr><tr class="even"><td>a</td><td>Authorizes the host(s) identified in the domain's A record(s) to send e-mail</td></tr><tr class="odd"><td>include:</td><td>Authorizes mail to be sent on behalf of the domain from google.com</td></tr><tr class="even"><td>~all</td><td>Denotes that this list is all inclusive, and no other servers are allowed to send e-mail</td></tr></tbody></table>

## Components of an SPF Record

---

An SPF record consists of the SPF version number followed by strings comprised of (i) mechanisms, (ii) qualifiers, and (sometimes) (iii) modifiers. SPF clients ignore TXT records that do not start with the version string `"v=spf1 ..."`.

SPF records may define zero or more **mechanisms**. Mechanisms can be used to describe the set of hosts which are designated as authorized, outbound mailers for the domain. The following list are common mechanisms included in an SPF record:

`all | ip4 | ip6 | a | mx | ptr | exists | include`

Mechanisms can be prefixed with one of four **qualifiers**:

<table><thead><tr class="header"><th style="text-align: center;">Qualifier</th><th>Description</th></tr></thead><tbody><tr class="odd"><td style="text-align: center;">+</td><td>Pass = The address passed the test; accept the message. Example: "v=spf1 +all"</td></tr><tr class="even"><td style="text-align: center;">-</td><td>(Hard) Fail = The address failed the test; bounce any e-mail that does not comply. Example: "v=spf1 -all"</td></tr><tr class="odd"><td style="text-align: center;">~</td><td>Soft Fail = The address failed the test, but the result is not definitive; accept &amp; tag any non-compliant mail. Example: "v=spf1 ~all"</td></tr><tr class="even"><td style="text-align: center;">?</td><td>Neutral = The address did not pass or fail the test; do whatever (probably accept the mail). Example: "v=spf1 ?all"</td></tr></tbody></table>

If a qualifier is not included, the `+` qualifier is implied.

SPF records may also define 1 of 2 **modifiers**; or, no modifier at all. Each modifier, however, can appear only once.

`redirect | exp`

SPF records are evaluated in a two-pass process: (i) First, all mechanisms and qualifiers are evaluated; then, (ii) all modifiers are evaluated:

1.  Mechanisms are evaluated from left to right;
2.  Modifiers are evaluated on the second pass and can occur anywhere in the record.

### [Mechanisms](http://www.openspf.org/svn/project/specs/rfc4408.html#mechanisms)

---

<table><thead><tr class="header"><th>Mechanism</th><th>Description</th></tr></thead><tbody><tr class="odd"><td>all</td><td>Matches all local and remote IPs and goes at the end of the SPF record. Example: "v=spf1 +all"</td></tr><tr class="even"><td>ip4</td><td>Specifies a single IPv4 address or an acceptable IPv4 address range. A mask of /32 is assumed if no prefix-length is included. Example: "v=spf1 ip4:192.168.0.1/16 -all"</td></tr><tr class="odd"><td>ip6</td><td>Same concept found in ip4, but, obviously, with IPv6 addresses, instead. If no prefix-length is given, /128 is assumed (singling out an individual host address). Example: "v=spf1 ip6:1080::8:800:200C:417A/96 -all"</td></tr><tr class="even"><td>a</td><td>Specifies all IPs in the DNS A record. Example: "v=spf1 a:domain.com -all"</td></tr><tr class="odd"><td>mx</td><td>Specifies all A records for each host's MX record. Example: "v=spf1 mx mx:domain.com -all"</td></tr><tr class="even"><td>ptr</td><td>Specifies all A records for each host's PTR record. Example: "v=spf1 ptr:domain.com -all"</td></tr><tr class="odd"><td>exists</td><td>Specifies one or more domains normally singled out as exceptions to the SPF definitions. An A query is performed on the provided domain; if a result is found a match occurs. Example: "v=spf1 exists:domain.com -all"</td></tr><tr class="even"><td>include</td><td>Specifies other domains that are authorized domains. Example: "v=spf1 include:outlook.microsoft.com -all"</td></tr></tbody></table>

#### The "all" mechanism

The `all` mechanism usually goes at the end of the SPF record; and it is prefixed with a qualifier, e.g.

<table><thead><tr class="header"><th>Examples</th><th>Description</th></tr></thead><tbody><tr class="odd"><td>"v=spf1 mx -all"</td><td>Allows the domain's MX hosts to send mail for the domain, and prohibits all other hosts.</td></tr><tr class="even"><td>"v=spf1 -all"</td><td>The domain sends no mail at all.</td></tr><tr class="odd"><td>"v=spf1 +all"</td><td>This SPF is useless, as it does not limit the hosts that are authorized to send e-mail.</td></tr></tbody></table>

### [Modifiers](http://www.openspf.org/svn/project/specs/rfc4408.html#modifiers)

---

Modifiers are optional and a modifier may appear only once per record. Unknown modifiers are ignored.

#### The "[redirect](http://www.openspf.org/svn/project/specs/rfc4408.html#mod-redirect)" modifier sends the inquiry to another domain.

`redirect=example.com`

That is, the SPF record for _example.com_ replaces the SPF record for the current domain. The redirect modifier is useful to those that wish to apply the same record to multiple domains. For example:

<table><tbody><tr class="odd"><td>Sample entry in ny.yourdomain.com's zone file:</td><td>TXT @ "v=spf1 redirect=_spf.yourdomain.com"</td></tr><tr class="even"><td>Sample entry in sf.yourdomain.com's zone file:</td><td>TXT @ "v=spf1 redirect=_spf.yourdomain.com"</td></tr><tr class="odd"><td>Sample entry in am.yourdomain.com's zone file:</td><td>TXT @ "v=spf1 redirect=_spf.yourdomain.com"</td></tr><tr class="even"><td>Sample entry in _spf.yourdomain.com's zone file:</td><td>TXT @ "v=spf1 mx:yourdomain.com -all"</td></tr></tbody></table>

For clarity, it is RECOMMENDED that any "redirect" modifier appear as the very last term in a record.

#### The "[exp](http://www.openspf.org/svn/project/specs/rfc4408.html#mod-exp)" modifier sets up an explanation in the SPF record.

`exp=[macro-string]`

If an SPF query produces a FAIL result, the explanation is queried and the explanation string provides more information to the nonconforming user. The explanation is typically placed in an SPF log. Example: exp=spf-error. An SPF publisher can specify the explanation string that senders see. This way, an ISP can direct nonconforming users to a web page that provides further instructions.

## Putting it all together

---

Although you do not need an SPF record on your DNS server to evaluate incoming email against SPF policies published on other DNS servers, the best practice is to set up an SPF record on your DNS server. Setting up an SPF record lets other email servers use SPF filtering (if the feature is available on the mail server) to protect against incoming email from spoofed, or forged, email addresses that may be associated with your domain. As SPF records are implemented more widely, SPF filtering will become more effective at identifying spoofed email messages.

As always, if you need help setting up your SPF record, look to the DigitalOcean Community for assistance by posing your question(s), below.

Article Submitted by: [Pablo Carranza](http://vdevices.com)
