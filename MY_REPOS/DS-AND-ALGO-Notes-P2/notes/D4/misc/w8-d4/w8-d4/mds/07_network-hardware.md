# Networking Hardware: Getting Physical
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Three levels of control](#three-levels-of-control)
  - [Hubs: keeping it simple](#hubs-keeping-it-simple)
  - [Switches: traffic control](#switches-traffic-control)
  - [Routers: thinking globally](#routers-thinking-globally)
- [A practical example of network hardware](#a-practical-example-of-network-hardware)
- [Integrated devices](#integrated-devices)
- [What we've learned](#what-weve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

We've discussed a lot of data- and internal-communication protocols, but what
supports these? Let's examine some of the most important hardware you'll see
while examining computer networks!

We'll cover:

- networking hardware devices and how they differ,
- use cases for each type of device,
- and specialized cases with integrated devices

## Three levels of control

Network protocols mean very little if we don't have a physical way of connecting
computers together! Whether it's via copper cables, fiber optics, or wireless
networks, we need ways of managing communications to put those protocols into
action. A quick search for "networking hardware" will yield a slew of results,
but don't get overwhelmed! We can boil many of these devices down to three
types: _hubs_, _switches_, and _routers_.

### Hubs: keeping it simple

<p>
  <img src="images/image-ip-networking-hub.svg" style="width: 100%; height: auto;">
</p>

A _hub_ is the simplest networking device you're likely to find in service. It
performs no network management and might be better known as a "signal splitter".
When a hub receives data, it duplicates that data and broadcasts it to all
connected devices. That's it!

Hubs tend to be cheap and are often found in older networks. They are usually
small metal boxes with a handful of physical connectors. You can get hubs with
lots of connectors, but they're usually a little smaller - think 5 or 10 instead
of 30 or 40. This is due to the natural limitations a hub possesses.

> Heads up! We'll refer to the physical sockets that cables plug into as
> _connectors_, but you'll often hear them called _ports_ instead. This can get
> **very** confusing, so be sure you're clear about the difference between
> virtual ports used by transport protocols and physical ports used by hardware.
> When in doubt, use a clearer term, like "connector" or "jack".

For one, a hub can't do any sort of filtering. This means every single data
packet is sent to every single device, all the time. This creates a lot of
unnecessary load on the network. Imagine if every time you called a friend, all
of your other friends' phones rang too. Yikes! Additionally, hubs share
bandwidth across devices, so heavy traffic can result in lower speeds. We'll
sometimes see this problem on overloaded networks with other devices, but on a
hub it's guaranteed.

Hubs were a helpful and necessary piece of hardware for a long time, but today
there's little reason to use them. They may still be slightly cheaper than a
switch, but the limitations outweigh most cost concerns. The best use for a hub
now is as a temporary replacement while replacing a broken device.

### Switches: traffic control

<p>
  <img src="images/image-ip-networking-switch.svg" style="width: 100%; height:
  auto;">
</p>

A step up from the hub, we find a network _switch_. Switches are "intelligent"
hubs: they track devices connected to them, help manage network load, and can
manage separate internal networks with ease! The biggest thing that separates a
switch from a hub is the _MAC address table_.

A network switch maintains an internal address book containing the MAC addresses
of the devices connected to it. Remember that data frames contain both a source
and destination MAC address? This is how the switch stays up to date! It uses
this data to perform one of three actions with each piece of data it receives:

- _flood_: When a destination address is unknown, the switch will _flood_
  received data out to all connected devices **except where the data came
  from**. When the intended recipient responds, the switch will update its MAC
  address table accordingly. This is how switches learn about connected devices,
  and it's significantly more efficient than a hub's behavior of flooding all
  the time!

- _forward_: When a switch already has the destination MAC address in its
  internal table, it can send data directly to that device. This is called
  _forwarding_ the data. No other devices connected to the switch are made aware
  of this data.

- _filter_: Sometimes a switch will receive data on the same connector the data
  is destined for. In these cases, the switch will _filter_, or drop, the data
  entirely. This can be a little confusing to think about! If data arrives on
  the same connector it would later be sent out of, then we can assume the data
  was handled by some other part of our network, and the receiving switch can't
  do anything to help. Remember that this is very specifically related to the
  physical connector the data is received on: a switch will never act on data
  that comes in and goes out the same connector.

Switches often look just like hubs, but come in a much larger range of sizes.
They can be chained together to cover large networks, or a 5-connector switch
might be used for a small home network. Switches have improved on hubs'
limitations: they don't share bandwidth, so you'll see less impact on speed
through a switch than you might through a hub.

If you're building a home or single-location office network today, switches are
your friend. They provide lots of simple management functionality for not much
cash, and they're easy to keep around.

### Routers: thinking globally

<p>
  <img src="images/image-ip-networking-router.svg" style="width: 100%; height:
  auto;">
</p>

Here's a thought experiment: let's think about what a switch for a national
network might look like. Since switches can be chained together, we wouldn't
need thousands of connectors - but we would need _lots_ of memory! The MAC
address table would need to hold entries for every computer in the country. No
way!

Instead of trying to solve this problem with switches, we have a higher-level
device: the _router_. Routers connect separate networks with each other. Instead
of identifying devices via MAC address, they use IP addresses to make decisions
about data.

A router, like a switch, maintains an internal table of addresses. This _routing
table_ is used to pass received data on through the network. Data may move on to
another router, or the router may recognize the data and pass it to an internal
switch.

Routers also participate in an important process called _NAT_, short for
_Network Address Translation_. NAT helps minimize IP address overload by giving
the router a single IP address to use for all external communication. The router
then uses IP ports to map incoming data to internal device IP addresses in its
routing table. Imagine living in an apartment complex with a mail office. The
postal service could bring packages with your apartment number to the front
desk, and the mail officer would dole those packages out, but the sender would
never actually have to know your name or exactly where your apartment is
located! NAT provides a tiny bit of security and allows significantly more
computers to coexist on the Internet simultaneously.

Because of the extra processing power required to handle large routing tables &
filtering, routers tend to cost substantially more than switches. However, most
networks only need one router! We sometimes describe routers as being our
_gateway_ to the Internet.

Physically, routers come in all shapes and sizes. They only need two connectors
(one incoming, one outgoing), but they often come as part of an integrated
device with multiple connectors and functions.

## A practical example of network hardware

That's enough theory! Let's think through a practical example of each of the
pieces of network hardware we've discussed.

Imagine you need to get a message to a friend across the room. There are lots of
people between you and your friend: how might you communicate?

One way might be to shout. If you shout your message to the room, the rest of
the people in the room could repeat it to make sure it's heard! This is going to
result in some ringing ears, but your friend will definitely hear the message.
This is how _hubs_ work: broadcast to everyone, no matter who's listening.

An alternative might be to whisper. You could pass a message to the person right
next to you. Of course, they won't know everyone in the room, so they'll have to
ask the people close to them to pass it along. It may take a bit to get to your
friend the first time, but any responses will be lightning-fast since everyone
now knows who to talk to. This is a _switched_ model: _flood_ the message once
to learn how to get to the destination, then use what we've learned to _forward_
& _filter_ appropriately.

Finally, imagine your friend has left the room. Uh oh! We could still use the
shouting or whispering approach, but none of that matters since we now need to
find the correct room your friend is in. To do this, we'd need people familiar
with each room. We could pass our message to those gatekeepers, who could pass
the message for us from room to room until it reaches the correct one. At that
point, the process will reverse in the new room: the gatekeeper will whisper or
shout, the room will respond accordingly, and responses will come back via the
gatekeepers. The gatekeepers are acting as our _routers_ here: they pass our
messages between rooms, but don't necessarily care how the room communicates
internally.

Notice in this example that each type of communication has a purpose, and all of
them work together. We're simplifying things, but it's easy to concoct an
example where we need all three types, or where we only need one. This is true
of hardware was well. You should choose the correct devices for the network
you're building. Not thinking through your needs may result in a steep cost,
both in terms of performance and in terms of money!

## Integrated devices

It's easiest to think of these three classes of hardware as separate, distinct
devices. However, this won't always be the case. Let's discuss some situations
where these devices exist in unfamiliar packages.

When you set up Internet at a new home, you usually get a modem from your ISP.
Years ago, this modem was dead simple: one inbound connection for your phone
line or cable, and one outbound connection for your home PC. Today, however, our
homes have multiple devices! Consumers became increasingly frustrated with
getting a modem from one company but still needing a router and/or switch to
connect all their computers.

In response, ISPs upped their game by integrating extra devices in their
"modems". The average home gateway today includes:

- a modem to translate the physical signal from the cable/phone line,
- a router to manage your internal and external IP addresses,
- a wireless antenna for wi-fi connections,
- and a 5-connector switch for wired connections.

Woah! That's a lot of hardware in one device. This behavior has blurred the
lines between types of hardware and made communication about networked devices
more difficult. Your ISP might call that single device a "modem", a "router", a
"gateway", or an "access point". All of these are true!

Before making decisions about a network you're investigating, make sure you
understand what each device is doing. Does that router include a switch? Is the
modem a simple modem or does it include a hub as well? As always, make sure
you're using the right tool for the job.

## What we've learned

There are lots of different types of network hardware out there, but most of
them fall into three separate categories. Hopefully, the next time you see
inside a messy server closet, you'll be curious about which parts you can
identify!

After this reading, you should be comfortable with:

- the difference between hubs, switches, and routers,
- identifying each type of device,
- switched internal networking,
- and the basic concept of routing on interconnected networks.
