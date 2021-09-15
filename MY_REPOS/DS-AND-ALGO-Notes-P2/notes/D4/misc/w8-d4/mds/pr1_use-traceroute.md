# Following The Trail With `traceroute` Exercise
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Where are we going?](#where-are-we-going)
- [Reading a trace](#reading-a-trace)
  - [Metadata](#metadata)
  - [The Hop](#the-hop)
  - [Special cases](#special-cases)
- [When should I run a trace?](#when-should-i-run-a-trace)
- [What we've learned](#what-weve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

Remember that the Internet is a "network of networks"[1]. This can make it tough
to _debug_ problems between networks: how do we identify the culprit? Enter
_traceroute_! Let's explore this utility and learn how to find problems with
inter-network connections.

We'll cover:
- what `traceroute` is and when to use it,
- how to read `traceroute` output,
- and how to use `traceroute` to solve problems.

## Where are we going?

When we create connections between networks, they're rarely direct. We've
already discussed how the IP protocol works to connect devices across multiple
intermediaries. While the theory and addressing makes sense, it raises a new
challenge: how do we solve problems when we can't get access to the other
networks involved?

Thankfully, there's a utility that lets us peek at devices along the way. It's
called `traceroute`. The `traceroute` utility runs on the command line and uses
UDP packets to monitor each device that data passes through as it moves from the
source location to the target location. Using this utility, we can determine
where a network failure or slowdown might be occurring.

> `traceroute` vs. `tracert`
>
>If you do some research of your own, you may find `traceroute` referred to as
>`tracert`. These utilities  work slightly differently. `tracert` is included
>with the Windows operating system, and uses _ICMP_ (an alternative protocol
>also used by the `ping` utility) to trace data. `traceroute` is on Unix-based
>operating systems, including macOS, and uses UDP. We'll prefer `traceroute`
>here, but the output of both utilities is almost identical! If you find
>yourself investigating network problems on a Windows computer, the skills
>covered here will translate seamlessly.

You'll sometimes hear using `traceroute` referred to as "running a trace".
Running a trace of your own is easy - enter the following on your command line:

```sh
> traceroute appacademy.io
```

Boom! Your first trace! So what does all that gibberish mean? Let's break it
down.

## Reading a trace

Here's a screenshot of `traceroute appacademy.io` from my terminal:

<p>
  <img src="images/image-network-tools-traceroute-screenshot.svg" style="width:
  auto;">
</p>

### Metadata

First, let's look at the overall breakdown. At the top of the trace, you'll see
some general info. There's a warning about "multiple addresses", meaning that
`appacademy.io` resolves to more than one IP address. This is common for popular
websites that use multiple servers to reduce traffic and keep speeds high. Next,
you'll see the true beginning of the trace, including the domain we're tracing
to, the IP address it resolved to, and a maximum number of _hops_ ("64") and
_packet size_ "(52 byte").

We mentioned _hops_ when discussing networking protocols, but here's a quick
review: a "hop" is one connection to another server. Think of the houses on your
street or apartments on your hall. A single hop would walking to your next door
neighbor's home. Three hops would be walking three doors down. When we run
`traceroute`, it tracks the location of each hop, but it limits the number of
hops to make sure we're not searching for an unavailable address forever! Our
`traceroute` won't go more than 64 hops, though this default may differ across
systems.

Below the general info, we see a numbered list of addresses. Each line
represents one hop, and includes some important info about that destination.
Let's check it out!

### The Hop

Here's our first hop:

<p>
  <img src="images/image-network-tools-traceroute-single-hop-screenshot.svg"
  style="width: auto;">
</p>

We know it's the first because of the `1` on the left side. Each hop is preceded
by a number indicating how many hops it took to get there.

Next, we see two IP addresses. These identify the network location our trace has
reached. In this case, the location has no resolvable DNS name so we just see
the IP address. If you look ahead a bit, you can see that addresses with a
resolvable name will show that name first instead.

Finally, we see three numbers. These are time intervals, (indicated by the "ms",
short for "milliseconds") that let us know how long it took us to reach this
location from our system. When we run a trace, `traceroute` attempts each hop
three times. This is because UDP (and the Internet beneath it!) is inherently
unreliable. Testing the hop three times ensures we get truly representative data
and not a false reading due to a dropped packet or network congestion. Each of
the three numbers we see is the response time from one of those attempts.
They'll always vary slightly, but we can get a good idea of the average response
time. In this case, the numbers are **very** small: two tenths of a millisecond!
Wow!.

> This first hop is my home internet router! We can tell this not only because
> it's the first device reached beyond my own computer, but also because the IP
> address is within one of IPv4's _reserved ranges_, meant for private networks
> inside homes and businesses. It's unlikely you'll see reserved addresses
> outside of your current network.

Hops proceed from our own device to the _gateway_ for the device we're trying to
reach. We can analyze each hop using the same breakdown.

The first hop in our trace is straightforward, but that's not always the case!
Let's take a look at a few not-so-standard situations you may see come up.

### Special cases

Notice that our second hop doesn't have any of the info we expect from
`traceroute`. Instead, it has three asterisks:

<p>
  <img src="images/image-network-tools-traceroute-empty-hop-screenshot.svg"
  style="width: auto;">
</p>

In `traceroute`-speak, an asterisk (`*`) represents a hop with no response. This
doesn't necessarily mean the hop failed, just that our system didn't get a
response back! This could be due to server configuration or a slow connection.
By default, a hop will return a `*` if there's no response for five seconds.
There are three asterisks in this case to indicate that all three attempts went
unanswered.

Let's also take a look at our eighth hop:

<p>
  <img src="images/image-network-tools-traceroute-load-balanced-hop-screenshot.svg"
  style="width: auto;">
</p>

This one entry has multiple addresses! What's going on? This is an example of
_load balancing_ in action. In this case, the router at our seventh hop is
directing traffic to multiple locations. This _balances_ the _load_ and ensures
that one single router isn't handling too much.

In this case, one of our hop attempts went to the `atln.ga` (Atlanta, Georgia)
router, while the other two went to the `snjs.ca` (San Jose, California) router.
We still see timestamps for all three hop attempts.

Because of load balancing, your connection to `appacademy.io` isn't guaranteed
to be the same each time. Try running `traceroute appacademy.io` again - do you
see the exact same addresses as before?

## When should I run a trace?

Tracing is most useful for diagnosing network connectivity issues. Imagine your
internet at home suddenly goes down! You can `traceroute` to a familiar domain
to see if the connection fails before it gets to your own router (in which case,
it's likely a problem on your device), or it fails at a network outside yours.

You can also diagnose slow connections this way! If a hop has a very long
response time (> 50 ms), then it's possible that a previous device in line is
experiencing downtime or network congestion.

`traceroute` is simple to use without them, but does include some command line
arguments that can enhance its abilities. Check out `man traceroute` to learn
more about what it can do!

## What we've learned

When in doubt, `trace-` the `-route`! Tracing network traffic using the
`traceroute` utility is a great way to identify what's happening outside your
own network.

After this lesson, you should be comfortable:
- using `traceroute` to diagnose connection problems,
- reading the output of a `traceroute` command,
- and knowing when `traceroute` is the correct tool for the job.


[1]:
https://www.encyclopedia.com/computing/news-wires-white-papers-and-books/network-networks
