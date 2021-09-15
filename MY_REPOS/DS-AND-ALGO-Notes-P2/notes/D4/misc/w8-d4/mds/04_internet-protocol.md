# Internet Protocol
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [History of IP](#history-of-ip)
  - [The great divide](#the-great-divide)
- [So what is the Internet, exactly?](#so-what-is-the-internet-exactly)
- [Packet-Switching](#packet-switching)
- [IP Versions](#ip-versions)
  - [IPv4](#ipv4)
  - [IPv4 Addresses](#ipv4-addresses)
  - [IPv6](#ipv6)
  - [IPv6 Addresses](#ipv6-addresses)
  - [Special addresses](#special-addresses)
- [What we've learned](#what-weve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

As we dive deeper into understanding how computers communicate, a common
question keeps coming up: what is "the Internet", exactly? To answer this, let's
discuss the _Internet Protocol_, also known as _IP_.

We'll cover:
- What IP is and why it matters to us,
- different protocol versions and when to use them,
- and how to identify IP data by its formatting.

## History of IP

To understand where we are today, we need to look back to where we came from.
Picture yourself in the United States in the late 1960s. The country is nearing
the end of the "space race" and technology is booming. There are numerous
technical teams and physical networks created as a result of recent research,
but communication between them is limited. There's also a rise of different
proprietary standards which are hampering growth: not every team can afford a
separate terminal of each available type! How can we facilitate better
collaboration with less investment required?

By 1974, two researchers working for [DARPA][1] think they have the answer. They
propose something called the _Transmission Control Program_. It's a complex
process that defines exactly how multiple networks can communicate with each
other. This protocol stands out because it is:

- *fault tolerant*: data transmitted between networks can be cached and re-sent
  if it fails the first time.
- *end-to-end*: there are no single central systems that can take the whole
  network down; each host can send/receive to others.

These highlights are critical because DARPA is a military organization. They're
looking for technology that could theoretically withstand a nuclear attack - and
the Transmission Control Program fits the bill!

### The great divide

It became quickly apparent that that Transmission Control Program was too dense.
The process was complicated and involved many moving parts, and other engineers
raised concerns that it should be extracted into separate parts. Soon, the
Transmission Control Program was divided into two separate sections:
_Transmission Control Protocol (TCP)_, which was responsible for the
fault-tolerance of joined networks, and _Internet Protocol (IP)_, which was
responsible for the end-to-end nature of joined networks.

The protocols we use today have been improved over time, but still carry those
names and general purposes. It's amazing to think that modern social media,
video gaming, and streaming content is all dependent on 50+ year old technology!

## So what is the Internet, exactly?

The Internet can be loosely defined as "a series of _internetworked_ systems".
Here's a practical example of what we mean by that:

> Imagine every building in your town has a parking garage. Each garage is owned
>by a different company and uses custom entry sensors. These sensors prefer
>certain vehicle types: one garage for luxury sports cars only, another that will
>only allow motorcycles. You may need to park in the garage for the vehicle you
>own, then walk a lot. Otherwise, you'd have to own a different vehicle for each
>garage! Oh no! We'd consider this an "isolated" model: each garage works fine
>by itself, but patrons of one garage may not park elsewhere, and none of the
>garages are really meeting their full potential.
>
>Now imagine the garages remove their sensors. Suddenly you can park anywhere
>you'd like. Your motorcycle and your neighbor's school bus can exist
>harmoniously in any garage, and you can travel from garage to garage in any
>vehicle you'd like. We'd consider this an "internetworked" model: each garage's
>patrons may travel to any other garage and while the particular entrance/exit
>policies may differ, drivers can rest assured knowing they'll fit anywhere.

The Internet Protocol opened the door for this internetworked model in
computing. Now a network in New York City using one vendor's computers could
seamlessly communicate with a network in London from a different vendor! This
connectivity led to the birth of the Internet, which is itself _a series of
interconnected networks sharing data_.

## Packet-Switching

IP data is transmitted in a format known as a _packet_. A packet uses a data
format we've seen before: metadata in _headers_, and a _body_ with content. The
headers are used to get the packet to its destination, while the body contains
the information we'd like to transfer.

We refer to IP's communication style as _packet-switching_. This is when a
message is split up into separate "packets", delivered to a destination, and
reassembled as appropriate. Remember that IP's primary responsibility as part of
the Internet's "double threat", TCP/IP, is maintaining an _end-to-end_ state.
For this reason, IP isn't concerned about whether packets are received by the
client in sequential order, and may sometimes even lose packets altogether while
in transit!

> ### A crash course in bits & bytes
>
> Most of the protocols we'll cover measure their data in _bits_. We represent a
> bit as a single binary digit, either 1 or 0. Since data gets long, we have
> some larger units available as well! We'll sometimes describe data sizes in
> _bytes_. A byte is eight bits.
>
> For example, "01001" is five bits, and a piece of data that's 32 bits long
> could also be described as "4 bytes".

## IP Versions

The Internet Protocol has evolved over time, but two versions stand out as the
most used & important to us: version 4 and version 6. We often refer to these as
_IPvX_, where _X_, is the version number.

### IPv4

The best known version of the Internet Protocol is _IPv4_. This version was
used when TCP/IP was finalized by DARPA in 1983, and it's still the most-used
protocol version online.

An IPv4 packet's header consists of at least 13 _fields_, or sequences of binary
bits. These fields start with a version identifier (`0100`, or "4" in binary),
continue with 10 sequences that define things like the length of the header and
protocol type contained in the body, and wrap up with source and destination
addresses for the packet. IPv4 also includes an allowance for a 14th optional
header field called "Options" that can contain extra metadata about the packet's
content, but it's not often used. An IPv4 header without options will be 20
bytes (160 bits).

It's hard to visualize a header since it's essentially just a long string of 1s
and 0s. Instead of trying to cram it all into one line to study, we can split
it into specified widths and stack them. Here's a stacked diagram of the IPv4
header:

<p>
  <img src="images/image-ip-ipv4-headers.svg" style="width: 100%; height: auto;">
</p>

### IPv4 Addresses

IPv4 addresses are composed of 4 _octets_, or 8-bit binary numbers. We usually
represent them like this:

```
192.18.1.1
```

This is the same as `11000000.00010010.00000001.00000001` in binary notation,
but that's a lot harder to read! IPv4 supports around 4 billion unique
addresses.

### IPv6

The "4 billion unique address" limit seemed almost infinite in the earliest days
of the Internet, but today it's easy to see how we might use up that few
addresses! Seeing this _address exhaustion_ on the horizon, Internet researchers
began concocting a new protocol version, one that would allow more addresses, in
the mid 1990's. By 2017, the new protocol was an official standard: _IPv6_.

IPv6 uses a totally different packet header format than IPv4, though they share
a few fields. It only uses 8 header fields, and supports optional "extension
headers" that come after these 8 fields, as opposed to IPv4's large "Options"
block.

The 8 fields IPv6 uses, in order, are:

<p>
  <img src="images/image-ip-ipv6-headers.svg" style="width: 100%; height: auto;">
</p>

- _Version_
    - `0110`, or "6" in binary notation
- _Traffic Class_
    - used to identify different types of packets, like video or phone data
- _Flow Label_
    - an experimental option used for adding packet sequencing into IP
- _Payload Length_
    - lets the reciever know how large the data in the packet will be
- _Next Header_
    - Usually identifies the protocol type of the packet's data, but may
      indicate the first extension header (if present)
- _Hop Limit_
    - A means of preventing packets from being passed around routers forever,
      this field will be decremented by 1 every time the packet passes through
      an intermediary (like a router)
- _Source Address_
    - Where the packet originated
- _Destination Address_
    - Where the packet is heading

These headers have a fixed length of 40 bytes (320 bits).

### IPv6 Addresses

Notice that IPv6 packets have fewer headers, but are double the length of IPv4
headers! This is primarily due to IPv6 addressing, which allows **dramatically**
more address space than IPv4. How many more addresses?

IPv4 supports **~4 billion (4x10<sup>9</sup>)** addresses.

IPv6 supports **~350 undecillion (3.5×10<sup>38</sup>)** addresses.

That's a billion times a billion more addresses! It's even more addresses than
grains of sand in all the world's beaches & deserts (7.5x10<sup>18</sup>,
according to [the University of Hawaii][2]).

It handles this by quadrupling the number of bits in an address. IPv4 uses 32
bits, while IPv6 uses 128 bits. Remember that these bits are binary, so adding
additional bits exponentially increases the number of permutations.

This new address space also required a new notation. Instead of the "four dotted
decimal" notation of IPv4, IPv6 uses "eight colon-ed hexadecimal". Here's an
example IPv6 address:

```
2600:6c5e:157f:d48c:138f:e0ba:6fa7:d859
```

The same address in binary is:

```
0010011000000000:0110110001011110:0001010101111111:1101010010001100:0001001110001111:1110000010111010:0110111110100111:1101100001011001
```

It's easy to see how we added so many extra addresses! That said, IPv6 is much
more difficult to read by humans. You can read some neat rules for making IPv6
addresses easier to read on [Wikipedia][3].

### Special addresses

Both popular versions of the Internet Protocol include space for some special
addresses that you should quickly recognize. The main one you'll encounter is
called the _loopback_ address. This is the identifier for your current machine.
You'll see it repeatedly while developing because you'll navigate your browser
there to access your own servers! You may also hear this referred to as
_localhost_.

In IPv4 the loopback address is `127.0.0.1`. In IPv6, the loopback is `::1`.

There's also an _"all interfaces"_ address. This address is used to catch any
incoming requests regardless of intended destination. It's only used by the
local machine: you would never send a packet to the "all interfaces" address,
but a server that is listening on that address would see all incoming packets.

For IPv4, the "all interfaces" address is `0.0.0.0`. For IPv6, it's simply `::`.

Remember that the loopback and "all interfaces" address are not interchangeable!
This is a common misconception you may encounter in tutorials online, and might
be a trick question during a technical interview. If you're ever asked to
connect to `localhost`, make sure you use the loopback.

## What we've learned

Whew! The Internet Protocol is a dense topic, but a little familiarity will go a
long way when you're debugging server connections. After reading this lesson,
you should be able to:

- provide a rough history of where the Internet Protocol came from,
- compare/contrast the two most popular IP versions (4 & 6),
- identify an IP packet's version by its headers,
- and name the localhost addresses for both versions.

[1]: https://en.wikipedia.org/wiki/DARPA
[2]: https://www.npr.org/sections/krulwich/2012/09/17/161096233/which-is-greater-the-number-of-sand-grains-on-earth-or-stars-in-the-sky
[3]: https://en.wikipedia.org/wiki/IPv6#Address_representation
