#!/bin/python3

import sys
import re
import os

def checkIP():
    try:
        x = int(sys.stdin.readline())
    except EOFError :
        x = None

    ipv4r = r'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'
    ipv6r = r'^([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$'

    while x > 0:
        try:
            line = sys.stdin.readline()
        except EOFError:
            break

        ipv4 = re.search(ipv4r, line)
        ipv6 = re.search(ipv6r, line)

        if ipv4:
            print("IPv4")
        elif ipv6:
            print("IPv6")
        else:
            print("Neither")

        x -= 1

checkIP()
