# App Academy Open

> Learn to code online with access to App Academy’s entire full-stack course for free

*   ⏱ 10 minutes
    

*   Catalog
*   Js Py Sep 2020 Online
*   Week 8 Sep 2020 Online
*   Dns

We've covered how connected devices communicate with each other, but we're missing a key piece: where humans fit into the equation! After all, the Internet would be a much more boring place if we had to remember the IP address of every website we chose to visit.

Let's look into the _Domain Name System_, a method of translating long numeric identifiers into friendly, human-readable addresses. We'll cover:

*   how the Domain Name System came to be,
*   how a URL gets translated to an IP address,
*   and the different types of information stored by the system.

What is DNS?
------------

The _Domain Name System_ (often just referred to as _DNS_) is a distributed approach to providing easily-understood names for internetworked devices. Practically, it's similar to a phone book: DNS allows us to look up a specific IP address by its _domain_.

In the early days of computer networking, connecting to another computer was a manual, complex process. A user would need very specific addresses to find the networked resource they were looking for, and those addresses were difficult to read/remember! A scientist named [Elizabeth Feinler](https://en.wikipedia.org/wiki/Elizabeth_J._Feinler), working with ARPA in the early 1970's, saw a way to help. She started out with a simple text file listing computer names by their numeric addresses. This file grew in size as more systems joined ARPANET, and Elizabeth expanded her operation from a text file to a whole organization dedicated to keeping an up-to-date list of hostnames & IP addresses.

By the 1980's, it was clear that one organization wasn't enough to manage the growing Internet. The Domain Name System was invented as a way to distribute the work to numerous organizations, lightening the load and allowing much more rapid growth. The first DNS name server was written in 1984, and the rest is history!

DNS is one of the most important parts of allowing the Internet to grow so rapidly. It's perfect for quick scaling because it is both simple (relying on specifically-formatted text files) and distributed (redundant across numerous servers).

### Domains?

We've mentioned domains before today, but without much detail. Let's dive a little deeper into that term. A website's _domain_ refers to the "friendly" name for the website's _host_, or the server providing the site's content. A domain differs from a URL in that the domain is only the server's identifier, not other application or protocol-related data in the URL.

Here's a breakdown of an average URL. We've highlighted the domain in green and labelled each part of the URL underneath:

![](https://assets.aaonline.io/Module-Web/network/image-ip-dns-domain.svg)

A _domain name_ can be split into a few parts:

*   The _top-level domain (TLD)_ is the last part of the domain, appearing just before the URL begins pointing at application routes (usually indicated with `/`'s) or query parameters (indicated with a `?` and `&`'s). The best known TLDs are `.com`, `.net`, and `.org`. TLDs are managed by special organizations that have demonstrated the ability to handle the immense workload involved, often known as _domain registries_. These registries may be government entities (for example, `.gov` is managed by the [General Services Agency](https://www.gsa.gov/)) or private companies that were awarded the privilege by [ICANN](https://www.icann.org/).
    
*   To the left of the TLD, separated by a dot, is the _second-level domain_. You'll often hear the TLD & second-level domain lumped together as "the domain". This is the name most people associate with the website. Through _domain registrars_, consumers can purchase second-level domains. The registrar maintains a listing of each purchase.
    
*   Some websites will have additional domains to the left of the second-level domain. These can be referred to by their formal names (_third-level domain_, _fourth-level domain_, etc.) but are often informally referred to as _subdomains_. The best-known subdomain is `www`, though this is less-used on newer sites. Subdomains can usually be freely created by the consumer.
    

How The Magic Happens
---------------------

DNS does one thing really well: identifying connected devices by friendly names. How exactly does this work?

It all goes back to the magic word: _domain_. Each individual domain is represented by a set of _name servers_, which store information about the domain's registered subdomains. Name servers will direct a client where they need to go - even if that's another name server! We refer to this process of working out which name server we need as _resolution_. Eventually, we'll reach a name server that can tell us the specific IP address for the full domain. We refer to this as the _authoritative name server_ for our domain. It has the final say!

When trying to resolve a domain name, we start from the rightmost part (the TLD) and work our way to the left. We'll stop once we've reached an authoritative server that can give a direct address for the domain we're seeking. Intermediate servers should be able to point us to the most-relevant name server to continue our search (usually, the next domain to the left). We can think of this as a conversation between the client and the available name servers for our domain, each one moving us closer to our goal.

Here's a practical example of how DNS is used to discover the authoritative name server for the fictional URL `https://students.appacademy.io`:

![](https://assets.aaonline.io/Module-Web/network/image-ip-dns-resolution-chat.svg)

Looking for something a little more whimsical? [DNSimple](https://dnsimple.com/) has a [fantastic webcomic](https://howdns.works/ep1/) detailing the journey of a domain resolver. Check it out!

DNS Records
-----------

We can see how DNS works, but what does it actually look like? It's not much different than it was at the very beginning! Each name server maintains a _zone file_: a text file containing host names, IP addresses, and resource types. Here's an example of a simple zone file:

    $TTL 299
    my-site.com.    IN  SOA     ns1.cloudflare.com. dns.cloudflare.com. 2032032092 10000 2400 604800 3600
    my-site.com.    IN  NS      ns1.my-site.com.
    my-site.com.    IN  NS      ns2.my-site.com.
    my-site.com.    IN  A       104.28.31.159
    my-site.com.    IN  A       104.28.30.159
    my-site.com.    IN  AAAA    2606:4700:30::681c:1f9f
    my-site.com.    IN  AAAA    2606:4700:30::681c:1e9f
    www             IN  CNAME   my-site.com.
    ns1             IN  A       104.28.31.150
    ns2             IN  A       104.28.30.150
    my-site.com.    IN  MX      10 mail.google.com.

Each line in a zone file includes the affected domain, type of record on that line, and the data for that record. Let's discuss some of the most common DNS record types in the order we see them above:

### `SOA`

The _SOA_ record represents the **S**tart **O**f **A**uthority. This record lets us know which name server is the _master_, or primary authority, for the domain we're querying. The SOA record is the minimum requirement in a zone file - every name server will return this record, if nothing else!

### `NS`

_NS_ records point to name servers for the zone. Most zones will have at least two NS records for redundancy. Remember that one of DNS's strengths is that it's distributed. If one name server loses power or becomes disconnected, we don't lose access to the zone.

### `A` / `AAAA`

_A_ records are the most important DNS records present. They map a resource directly to an IP address. This is the core of what DNS is for: connecting the domain directly to a machine. `A` records are used for IPv4 addresses, while `AAAA` records perform the same function for IPv6.

### `CNAME`

The _CNAME_ record acts as an alias, linking one domain to another. In our example above, we're saying that `www.my-site.com` should point at the same resource as `my-site.com`. Notice that the `www` doesn't have a `.` after it. This means it's a _relative_ reference, and the additional parts of the domain for this zone (`my-site.com.`) are implied. When a domain in zone file ends in a `.` we can treat it as an _absolute_ reference with no unwritten subdomains.

### `MX`

DNS: It's not **just** for websites! _MX_ records, short for **M**ail E**x**changer, are used by e-mail clients to direct messages to the appropriate mail servers. These records let you send messages to "friend@gmail.com" instead of having to remember "friend@123.45.67.89"!

### Metadata

There's one piece we've overlooked in our example zone file above: the first line. `$TTL 299` refers to the _Time to Live (TTL)_ for our records. This is a measure of how long a record should be _cached_ by a DNS name server.

We cache DNS queries because reading from a file can be slow! When a query comes in for a particular domain, the name server will cache the result in memory so that subsequent requests are much faster. However, this in-memory copy won't be updated if the zone file changes - yikes! The TTL lets us set how often a cached record should be discarded and read from the zone file again. This is especially important if we are pointing at a service where the IP might change frequently, like a local development environment or shared hosting service.

In our example, we've set the TTL for all records in the zone file to 299 seconds. This means that if your current web host goes offline and you have to point your domain at a new server, the downtime won't last more than approximately five minutes. This **also** means that you'll be re-checking your zone file for that domain at least once every five minutes. If you're confident in your hosting and aren't making infrastructure changes, longer TTLs can result in slightly increased performance.

What we've learned
------------------

The Domain Name System is a great example of a simple process (linking names to locations) evolving over time to support greater and greater needs. It's frightening to think of how difficult navigating around the Internet would be if we didn't have DNS to make websites easily accessible!

Before we move on, here's a quick tip: **DNS questions are popular fodder for technical interviews.** You may be asked to define a particular record type or to walk through a rough outline of what happens when you type a URL into your browser and click "Go". Try thinking through this process with your new knowledge!

After reading this lesson, you should have a better understanding of:

*   the history and intent of DNS,
*   how to read & break down a domain name,
*   and what's involved in translating domains into IP addresses.

Did you find this lesson helpful?


[Source](https://open.appacademy.io/learn/js-py---sep-2020-online/week-8-sep-2020-online/dns)