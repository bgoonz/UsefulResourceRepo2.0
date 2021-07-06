import sys
from sys import stdin
import csv
import collections
import socket
import re

def readInput(data):

    data_list = []

    for i in data:
        data_list.append(i)

    frames = []

    for i in data_list:
        frame = i.split(",")
        frames.append(frame)

    attack_type(frames)

def attack_type(frames):

    protocol_list = []

    for p in frames:
        protocol_list.append(p[4])

    protocol_count = collections.Counter(protocol_list)
    items = sorted(protocol_count.items(), key=lambda item: (-item[1]))
    protocol = items[0][0]

    if protocol == "TCP":
        tcp_attack(frames)

    elif protocol == "UDP":
        udp_attack(frames)

    elif protocol == "HTTP":
        http_attack(frames)

    elif protocol == "ICMP":
        icmp_attack(frames)

    else:
        print("None of the above")


def tcp_attack(frames):

    flags = []

    for f in frames:
        flags.append(f[6])

    msg = []

    for j in flags:
        m = re.search(r"\[(\w+)\]", j).group(1)
        msg.append(m)

    counter = collections.Counter(msg)
    items = sorted(counter.items(), key=lambda item: (-item[1]))

    types = []
    for i in items:
        types.append(i[0])

    # SYN flood - multiple hosts send SYN requests, and then never follows up with an ACK
    if (types[0] == "SYN") and ("ACK" not in types):
        tcp_frequency(frames)
        print("SYN Flood")


def udp_attack(frames):
    flags = []

    for f in frames:
        flags.append(f[4])

    counter = collections.Counter(flags)
    items = sorted(counter.items(), key=lambda item: (-item[1]))

    types = []
    for i in items:
        types.append(i[0])

    # UDP flood - single host sends IP packets containing UDP datagrams to random ports on target.
    if (types[0] == "UDP"):
        udp_frequency(frames)
        print("UDP Flood")


def icmp_attack(frames):
    flags = []
    lengths = []

    for f in frames:
        flags.append(f[6])
        lengths.append(f[5])

    count_length = collections.Counter(lengths)
    length_items = sorted(count_length.items(), key=lambda item: (-item[1]))

    # Ping of Death - Increase the size of ping packet when sending to cause buffer overflow when put together on target
    if (int(length_items[0][0]) > 84):
        icmp_frequency(frames)
        print("Ping of Death")

    else:
        msg = []

        for j in flags:
            m = re.search(r"\[(\w+)\]", j).group(1)
            msg.append(m)

        counter = collections.Counter(msg)
        items = sorted(counter.items(), key=lambda item: (-item[1]))

        types = []
        for i in items:
            types.append(i[0])

        # ICMP flood - When the attacker attempts to overwhelm a target with ICMP echo-request packets
        if (types[0] == "ECHO"):
            icmp_frequency(frames)
            print("ICMP Flood")


def http_attack(frames):
    flags = []

    for f in frames:
        flags.append(f[6])

    msg = []

    for j in flags:
        m = re.search(r"\[(\w+)\]", j).group(1)
        msg.append(m)

    counter = collections.Counter(msg)
    items = sorted(counter.items(), key=lambda item: (-item[1]))

    types = []
    for i in items:
        types.append(i[0])

    # HTTP flood - When the attacker attempts to overwhelm a target with HTTP GET or POST requests
    if (types[0] == "GET") or (types[0] == "POST"):
        http_frequency(frames)
        print("ICMP Flood")

def http_frequency(frames):
    addresses = []

    for i in frames:
        if i[4] == "HTTP":
            addresses.append(i[2])

    counter = collections.Counter(addresses)
    items = sorted(counter.items(), key=lambda item: (item[1], socket.inet_aton(item[0])))

    results = []
    for i in items:
        results.append(i[0])

    top = results[-5:]
    top.reverse()
    for i in top:
        print(i)

def icmp_frequency(frames):
    addresses = []

    for i in frames:
        if i[4] == "ICMP":
            addresses.append(i[2])

    counter = collections.Counter(addresses)
    items = sorted(counter.items(), key=lambda item: (item[1], socket.inet_aton(item[0])))

    results = []
    for i in items:
        results.append(i[0])

    top = results[-5:]
    top.reverse()
    for i in top:
        print(i)

def tcp_frequency(frames):

    addresses = []

    for i in frames:
        if i[4] == "TCP":
            addresses.append(i[2])

    counter = collections.Counter(addresses)
    items = sorted(counter.items(), key=lambda item: (item[1], socket.inet_aton(item[0])))

    results = []
    for i in items:
        results.append(i[0])

    top = results[-5:]
    top.reverse()
    for i in top:
        print(i)


def udp_frequency(frames):

    addresses = []

    for i in frames:
        if i[4] == "UDP":
            addresses.append(i[2])

    counter = collections.Counter(addresses)
    items = sorted(counter.items(), key=lambda item: (item[1], socket.inet_aton(item[0])))

    results = []
    for i in items:
        results.append(i[0])

    top = results[-5:]
    top.reverse()
    for i in top:
        print(i)


def main():

    file = open('input004.txt')

    contents = []

    for i in file:
        contents.append(i)
            
    readInput(contents)


main()