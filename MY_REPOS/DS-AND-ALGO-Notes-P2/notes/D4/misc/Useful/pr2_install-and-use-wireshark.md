# Use Wireshark To Capture Network Traffic

Wireshark, a network analysis tool formerly known as Ethereal, captures packets
in real time and display them in human-readable format. Wireshark includes
filters, color coding, and other features that let you dig deep into network
traffic and inspect individual packets.

This tutorial will get you up to speed with the basics of capturing packets,
filtering them, and inspecting them. You can use Wireshark to inspect a
suspicious program’s network traffic, analyze the traffic flow on your network,
or troubleshoot network problems.

## Installing Wireshark

You can download Wireshark for Windows or macOS from its [official website]. If
you’re using Linux or another UNIX-like system, you’ll probably find Wireshark
in its package repositories. For example, if you’re using Ubuntu, you’ll find
Wireshark in the Ubuntu Software Center.

Just a quick warning: Many organizations don’t allow Wireshark and similar tools
on their networks. Don’t use this tool at work unless you have permission.

## Capturing packets

After downloading and installing Wireshark, you can launch it and double-click
the name of a network interface under Capture to start capturing packets on that
interface. For example, if you want to capture traffic on your wireless network,
click your wireless interface. You can configure advanced features by clicking
Capture > Options, but this isn’t necessary for now.

![capturing 1](https://assets.aaonline.io/Module-Web/network/wireshark-01.png)

As soon as you click the interface’s name, you’ll see the packets start to
appear in real time. Wireshark captures each packet sent to or from your system.

If you have promiscuous mode enabled—it’s enabled by default—you’ll also see all
the other packets on the network instead of only packets addressed to your
network adapter. To check if promiscuous mode is enabled, click Capture >
Options and verify the “Enable promiscuous mode on all interfaces” checkbox is
activated at the bottom of this window.

![capturing 2](https://assets.aaonline.io/Module-Web/network/wireshark-02.png)

Click the red “Stop” button near the top left corner of the window when you want
to stop capturing traffic.

![capturing 3](https://assets.aaonline.io/Module-Web/network/wireshark-03.png)

The packet list pane, located at the top of the window, shows all packets found
in the active capture file. Each packet has its own row and corresponding number
assigned to it, along with each of these data points:

* **No**: This field indicates which packets are part of the same conversation.
  It remains blank until you select a packet.
* **Time**: The timestamp of when the packet was captured is displayed in this
  column. The default format is the number of seconds or partial seconds since
  this specific capture file was first created.
* **Source**: This column contains the address (IP or other) where the packet
  originated.
* **Destination**: This column contains the address that the packet is being
  sent to.
* **Protocol**: The packet's protocol name, such as TCP, can be found in this
  column.
* **Length**: The packet length, in bytes, is displayed in this column.
* **Info**: Additional details about the packet are presented here. The contents
  of this column can vary greatly depending on packet contents.

When a packet is selected in the top pane, you may notice one or more symbols
appear in the No. column. Open or closed brackets and a straight horizontal
line indicate whether a packet or group of packets are part of the same
back-and-forth conversation on the network. A broken horizontal line signifies
that a packet is not part of the conversation.

## Color coding

You’ll probably see packets highlighted in a variety of different colors.
Wireshark uses colors to help you identify the types of traffic at a glance. By
default, light purple is TCP traffic, light blue is UDP traffic, and black
identifies packets with errors—for example, they could have been delivered out
of order.

To view exactly what the color codes mean, click View > Coloring Rules. You can
also customize and modify the coloring rules from here, if you like.

## Sample captures

If there’s nothing interesting on your own network to inspect, Wireshark’s wiki
has you covered. The wiki contains a [page of sample capture] files that you can
load and inspect. Click File > Open in Wireshark and browse for your downloaded
file to open one.

Download, open, and inspect each of these capture files so you can see what it
looks like for that communication to have occurred over a network.

* [http.cap](https://wiki.wireshark.org/SampleCaptures?action=AttachFile&do=get&target=http.cap) A simple HTTP request and response
* [dns.cap](https://wiki.wireshark.org/SampleCaptures?action=AttachFile&do=get&target=dns.cap) Various DNS lookups
* [wpa.cap](https://wiki.wireshark.org/SampleCaptures?action=AttachFile&do=get&target=wpa-Induction.pcap) 802.11 capture with WPA data encrypted using the password "Induction"

You can also save your own captures in Wireshark and open them later. Click the
File > Save to save your captured packets.

## Filtering packets

If you’re trying to inspect something specific, such as the traffic a program
sends when phoning home, it helps to close down all other applications using the
network so you can narrow down the traffic. Still, you’ll likely have a large
amount of packets to sift through. That’s where Wireshark’s filters come in.

The most basic way to apply a filter is by typing it into the filter box at the
top of the window and clicking Apply (or pressing Enter). For example, type
“dns” and you’ll see only DNS packets. When you start typing, Wireshark will
help you autocomplete your filter.

![capturing 4](https://assets.aaonline.io/Module-Web/network/wireshark-04.png)

You can also click Analyze > Display Filters to choose a filter from among the
default filters included in Wireshark. From here, you can add your own custom
filters and save them to easily access them in the future.

Another interesting thing you can do is right-click a packet and select Follow >
TCP Stream.

You’ll see the full TCP conversation between the client and the server. You can
also click other protocols in the Follow menu to see the full conversations for
other protocols, if applicable.

## Inspecting packets

Click a packet to select it and you can dig down to view its details.

![capturing 5](https://assets.aaonline.io/Module-Web/network/wireshark-05.png)

You can also create filters from here — just right-click one of the details and
use the Apply as Filter submenu to create a filter based on it.

![capturing 6](https://assets.aaonline.io/Module-Web/network/wireshark-06.png)

Wireshark is an extremely powerful tool, and this tutorial is just scratching
the surface of what you can do with it. Professionals use it to debug network
protocol implementations, examine security problems and inspect network protocol
internals.

## Assignment

Now, start Wireshark, start capturing network traffic, and perform various
tasks on your computer using different applications. You will be surprised by
the number of network requests made by your computer. See if you can identify
the application that makes each request and the significance of each request.

[official website]: https://www.wireshark.org/
[page of sample capture]: https://wiki.wireshark.org/SampleCaptures
