# TCP/IP: Four Layers
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [A layered approach](#a-layered-approach)
- [Layers of the TCP/IP model](#layers-of-the-tcpip-model)
  - [Application](#application)
  - [Transport](#transport)
  - [Internet](#internet)
  - [Link](#link)
- [Translating layers to data](#translating-layers-to-data)
- [What we've learned](#what-weve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

We've investigated TCP/IP in great detail, and we've seen how broad a scope it
covers. Now let's step back and think about the whole networking process. We're
breaking the TCP/IP stack down and categorizing our protocols - are you ready?

We'll cover:

- The TCP/IP four-layer reference model,
- separation of concerns in networking,
- and data encapsulation.

## A layered approach

Remember that when TCP/IP was first being crafted, researchers felt it was too
large and separated the _Transmission Control Protocol_ from the _Internet
Protocol_. This separation was a boon; it made the protocols easier to implement
individually and led to the Internet we know and love today!

We sometimes refer to this approach as _separation of concerns_. We divide up
complex processes so that many connected concepts can work independently. This
makes it easier to consider each concept in detail on its own and means each
concept can grow at its own unique pace.

The developers of TCP/IP took this separation even farther in 1989 when they
published [RFC 1122][1]. This spec, also titled "Requirements for Internet Hosts
-- Communication Layers", provided a new way of thinking about the whole TCP/IP
process. According to the RFC, we can separate the connection out into four
distinct _layers_, or separate areas of interest. These are:

-  _Application_
-  _Transport_
- _Internet_
- and _Link_

We refer to this as a _reference model_: a high-level overview of a complex
topic provided by an organization that manages it. The four-layer model
presented in RFC 112 is often called the _TCP/IP reference model_, simply
_TCP/IP model_, or even the _Department of Defense (DoD) model_, referring to
the original research being done at DARPA.

## Layers of the TCP/IP model

Here's a visual summary of the four layers of the TCP/IP reference model, along
with some well-known protocols for each layer:

<p>
  <img src="images/image-network-models-tcp-ip.svg" style="width: 100%; height:
  auto;">
</p>

Let's look at what each layer of the reference model includes.

### Application

The _Application Layer_ includes protocols related to user-facing data. Some of
the protocols that's we've discussed, like _HTTP_ and _FTP_, operate in this
layer. The TCP/IP model doesn't care what type of application data is used;
**whatever** is transmitted from the Transport Layer is considered Application
Layer data.

### Transport

The _Transport Layer_ includes (you guessed it) transport protocols! We've
already discussed the two best-known: _TCP_ and _UDP_. This layer focuses on
connectivity between clients and servers, and relies on the lower layers to
establish network connectivity.

### Internet

The _Internet Layer_ is where IP lives. Data is processed in _packets_ on this
layer, and routing is primarily handled with IP addresses. The Internet layer
focuses mostly on connecting separate networks together.

### Link

The _Link Layer_ includes our lower-level communication standards. Link Layer
protocols aren't concerned with the type of data being transported, but instead
focus on getting data from one local network resource to another. We jump up to
the Internet layer when dealing with resources on other networks.

> ### Fifth layer?
> Despite the RFC specifying four layers for the TCP/IP model, you may encounter
> resources detailing a five layer model for TCP/IP instead! The "fifth layer"
> is usually the _Physical_ layer. This helps us separate electrical concepts
> like transmission across wires from data-oriented concepts like MAC addresses,
> but isn't an official reference model from the IETF. TCP/IP doesn't explicitly
> include any physical mediums, so thinking of this as a fifth layer can be
> helpful.

## Translating layers to data

Layers provide a mental model we can use to think about how interactions across
networks occur. It's important to remember that these are "best fit" models,
though: they translate loosely to our actual data. Some protocols may cross
layers, and some companies will adjust these models to fit their own internal
implementations. Ultimately, these layers provide a form of shared communication
between professionals. You can count on another engineer understanding what an
"Application Layer issue" means, even if your own definitions differ slightly!

We often refer to _encapsulation_ when describing how layers map to our data.
This means higher layers are _encapsulated_, or wrapped, in lower layers. For
example, a Transport Layer _segment_ includes Application Layer data in its
payload, and a Link Layer _frame_ includes the whole stack! Here's an example:

<p>
  <img src="images/image-network-models-encapsulation.svg" style="width: 100%;
  height: auto;">
</p>

As we'll see, alternative networking reference models may define layers as
beginning/ending at different points in our data. However, the general idea is
shared across models: lower layer data units include data for higher layers in
their payloads.

## What we've learned

When it comes to technical concepts, it's ["reference models all the way
down"][2]! These new ways of thinking about topics we've already explored will
help you communicate the concepts more clearly, and help you navigate problems
that may be deeper than your own code.

You should feel confident:

- naming each of the four canonical TCP/IP reference model layers,
- explaining why these layers were defined,
- and relating these layers to the data being transferred on a network.

[1]: https://tools.ietf.org/html/rfc1122
[2]: https://en.wikipedia.org/wiki/Turtles_all_the_way_down
