# The OSI Network Model
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [More layers, ~~more~~ fewer problems?](#more-layers-~~more~~-fewer-problems)
- [The layers of the OSI model](#the-layers-of-the-osi-model)
  - [Application](#application)
  - [Presentation](#presentation)
  - [Session](#session)
  - [Transport](#transport)
  - [Network](#network)
  - [Data Link](#data-link)
  - [Physical](#physical)
- [Which model do I use?](#which-model-do-i-use)
- [What we've learned](#what-weve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

One challenge with mental models is that everyone thinks about things
differently! While we've discussed the _TCP/IP reference model_ at length, we
haven't introduced any others. Let's take a look at one other very well-known
reference model for networks: the _OSI Model_.

We'll cover:

- the origin of the OSI reference model,
- each OSI layer and its properties,
- and how to choose between OSI & TCP/IP.

## More layers, ~~more~~ fewer problems?

Around the same time computer scientists in the United States were hammering out
the layers of the TCP/IP reference model, a similar discussion was happening a
world away in the United Kingdom. Researchers in the UK decided that a clear
reference model needed to be available to others worldwide, so they began
working with the [International Standards Organization (ISO)][1]. The ISO
published a document called **The Basic Reference Model for Open Systems
Interconnection** (or [**ISO 7498**][2]), including a seven layer reference
model for networking, in the early 1980s.

The _Open Systems Interconnection (OSI)_ reference model differs from the TCP/IP
model by its focus on standardization. The TCP/IP model is mostly focused on
practical networking concepts and isn't tightly tied to particular protocols
(other than those for which it's named). The OSI model, however, has both
conceptual layers **and** suggested protocols for each. This idea was
well-intentioned: make these protocols the standard so that computer scientists
have less to think about! This standardization could help prevent _vendor
lock-in_ as well, since all major vendors would (hopefully) follow the
standards.

## The layers of the OSI model

Here's an overview of the seven layers of the OSI model, along with some
well-known protocols for each layer:

<p>
  <img src="images/image-network-models-osi.svg" style="width: 100%; height: auto;">
</p>

Let's dig into each layer, starting from the top.

### Application

The OSI _Application Layer_ includes information used by client-side software.
Data transmitted on this layer will interact directly with applications, as the
name suggests, and can be displayed to the user with limited translation.
**HTTP** is an example of a common Application Layer protocol.

### Presentation

The OSI _Presentation Layer_ is where data gets translated into a presentable
format. This is often called the _syntax layer_ since data is converted between
machine-readable & human-readable syntax here as well. As a result, the
Presentation Layer may include data compression, encryption, and character
encoding. Many image formats, including **JPEG** and **GIF**, use well-known
Presentation Layer protocols.

### Session

The OSI _Session Layer_ includes protocols responsible for authentication and
data continuity. Session Layer protocols may authorize a client with the server
or re-establish a dropped connection. An example protocol you may find on this
layer is **RPC (Remote Procedure Call)**, a mechanism for one device to initiate
a command on another.

### Transport

Now we're on familiar turf! The OSI _Transport Layer_, like the layer of the
same name in the TCP/IP reference model, utilizes transport protocols. Processes
here are focused on data integrity and connectivity. Our old friends **TCP** and
**UDP** are the two most-used transport protocols.

### Network

The OSI _Network Layer_ mirrors TCP/IP's _Internet Layer_. This layer manages
connections between remote networks, transferring packets across intermediary
devices. The best-known protocol at the Network Layer is **IP**.

### Data Link

Protocols at the OSI _Data Link Layer_ deal with connections directly from one
machine's network interface to another. Frames targeting different MAC addresses
are transferred here, and the Data Link Layer is primarily used by machines in
local networks. The most recognizable protocol on this layer is **Ethernet**.

### Physical

OSI's _Physical Layer_ goes a little deeper than the TCP/IP reference model.
Physical Layer protocols have to do with translating from raw electrical signals
to bits & bytes of data. You may recognize **Wi-Fi** (technically known as
**802.11**) and **DSL** as common Physical Layer protocols.

## Which model do I use?

That's a lot of layers! It can be a little overwhelming to think of networks
from the two complementary but differing perspectives of the TCP/IP and OSI
reference models. Let's discuss when we might want to use each.

The OSI model is _conceptual_, meaning its practical uses are limited. We can
see this when we look at protocols that cross layers. For example, HTTP
primarily works on the OSI Application Layer, but includes the ability to manage
character encoding, a Presentation Layer concern. Uh-oh! This makes OSI good for
**understanding concepts**, but too restrictive for **building new protocols**.

The TCP/IP reference model, on the other hand, is almost purely practical.  It
was extracted from real, functional networks used by DARPA in the 1970s. Instead
of concerns with minutiae like signal-to-data conversions, TCP/IP focuses on the
core of networking: getting data from one place to another. For this reason,
it's most often used when **building new systems** or **analyzing real
networks**.

Of course, two popular models means most engineers will flip-flop between them!
You'll often hear both models used in the same conversation. We'll discuss some
techniques to differentiate between these two models in an upcoming lesson.

## What we've learned

We've examined two ways of thinking about network design & functionality: first,
the TCP/IP reference model, and now the OSI model. Next up, we'll compare these
two models in greater detail.

After this lesson, you should feel comfortable:

- describing the layers of the OSI reference model,
- giving examples of protocols used at each layer,
- and explaining where one model may be more applicable than the other.

[1]: https://www.iso.org/home.html
[2]: https://standards.iso.org/ittf/PubliclyAvailableStandards/index.html
