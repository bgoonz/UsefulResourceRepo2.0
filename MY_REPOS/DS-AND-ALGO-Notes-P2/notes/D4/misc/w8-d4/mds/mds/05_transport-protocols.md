# Transport Protocols
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [What exactly are we transporting?](#what-exactly-are-we-transporting)
  - [Ports](#ports)
- [TCP](#tcp)
- [UDP](#udp)
- [What we've learned](#what-weve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

Between HTTP and IP, we find an extra layer of information. We often refer to
this as the _transport layer_ of communication, and protocols used in it are
referred to as _transport protocols_.

There are myriad of transport protocols available, but we're going to cover the
two biggest: _TCP_ and _UDP_. We'll dive into:

- why we need transport protocols,
- the differences between TCP and UDP,
- and where each protocol is used today.

## What exactly are we transporting?

We've already briefly mentioned the _Transmission Control Protocol (TCP)_ when
discussing the history of the _Internet Protocol (IP)_. Both TCP & IP made up
the original _Transmission Control Program_ developed at DARPA in the 1970s.
We've dug deep into IP now, and we have some understanding of HTTP. Why do we
need more protocols?

Let's provide a practical example. Think about the process of delivering a
package. Floor pickers take your package from a warehouse onto the back of a
truck, and a dispatcher sends that truck to your house. There's a place on your
porch just waiting for that package. How, then, does your package make it across
the very last leg of its journey? Whoops - we forgot the delivery person!

Transport protocols act as our "delivery person". IP is concerned with
machine-to-machine communication, and HTTP is designed for
application-to-application communication. Transport protocols bridge the gap and
help our data cover the last mile between the network and software.

### Ports 

Like every other part of the internetworking process, transport protocols use
their own unique form of addressing. We call these _ports_. Ports are virtual
interfaces that allow a single device to host lots of different applications &
services. By lots, we mean a whole bunch - there are 65536 separate ports
available to each transport protocol!

Ports are represented by numbers: `port 80`, `port 51234`, etc. If we know both
the IP address and port we'd like to connect to, we can use a special notation
where both are joined by a colon:

```sh
192.168.1.1:8080
```

This would point to port `8080` on a network interface with an IP address of
`192.168.1.1`. We refer to an IP address & port written together in this way as
a _socket_.

## TCP

The most common transport protocol used is _TCP_. TCP is a connection-oriented
protocol, meaning it establishes a connection between two sockets. This
connection acts as safeguard from other error-prone protocols underneath it,
including _IP_ and _Ethernet_. Pieces of data sent via TCP (referred to as
_segments_) respect a strict order and verify when they have been received. This
means that data can't be "lost" across a TCP connection: if a segment is
received out of order, the receiver will ask the transmitter to re-send the
missing segment. This behavior makes TCP a _reliable_ protocol.

We'll dive deeper into exactly how TCP verifies data & forms connections in a
future lesson. For now, remember that "TCP == reliability". Any time it's
critical that data arrives ordered and in full, TCP's the way to go! You'll see
TCP used as the underlying connection for HTTP, file transfers, and media
streaming. In all of these cases, missing data would result in corrupt files and
unreadable data.

Because of everything TCP offers us, it's a relatively "heavy" protocol to use.
Messages may take a bit longer to transfer than they would via other protocols,
but you can be confident that your message has been received the way you
intended it. This inherent slowness means applications using TCP may _buffer_
data, or wait until a certain amount has been received before passing it to the
user. You've probably seen this happen on your favorite video sharing sites!

## UDP

The _User Datagram Protocol (UDP)_ arrived on the scene a few years after TCP.
Scientists working with TCP found that they sometimes didn't need all the order
and reliability that TCP provided, and they were willing to trade that for raw
speed. UDP is connection-less and provides no verification for whether data is
received. Because of this, we refer to it as an _unreliable_ protocol.

Hold on, though! By "unreliable", we certainly don't mean "useless". UDP is used
in lots of familiar places: real-time video sharing, voice-over-IP phone calls,
and DNS all rely on UDP as their transport protocol of choice. These services
prioritize speed over reliability, so it makes sense that they would forego
TCP's additional lag. If some data is lost along the way, that's okay - for
example, you might just see lower-quality video for a moment.

Unreliable systems are valuable outside the world of transport protocols as
well! Consider the postal service: most letters are sent without any sort of
delivery confirmation or guarantee of arrival. It's up to the sender and/or
recipient to manage expectations of when a letter ought to have arrived. This is
similar to UDP. Data will be transmitted, and most will arrive, but if either
side needs more reliability than that they will have to implement it themselves.

## What we've learned

Transport protocols fill a gap in our current understanding of networks. They
help us get data up from the network to our applications, and they give us a few
options for fault-tolerance versus performance.

After reading this lesson, you should feel comfortable:
- explaining what transport protocols are and why we need them,
- comparing & contrasting TCP & UDP,
- and discussing use cases for each of these two major protocols.
