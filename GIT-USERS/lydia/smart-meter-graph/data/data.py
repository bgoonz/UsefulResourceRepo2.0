#!/usr/bin/env python

import serial
import time
import sys
import pymongo
from pymongo import MongoClient
from key import *

client = MongoClient(MONGO_KEY)

db = client["arduino-graph"]
collection = db["current-usage"]

ser = serial.Serial(
        port="/dev/ttyS0",
        baudrate = 115200,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1
)


if ser.isOpen():
    print("Serial port is open.")

day_kwh = ""
night_kwh = ""
gas = ""
actual_usage = ""
data = {}

while True:
    p1_raw = ser.readline() 

    p1_str = str(p1_raw)
    p1_line = p1_str.strip()

    daykwh = p1_line.startswith("1-0:1.8.1")
    nightkwh = p1_line.startswith("1-0:1.8.2")
    actualkw = p1_line.startswith("1-0:1.7.0")
    gas = p1_line.startswith("0-1:24.2.1")

    if daykwh:
        print("Day kWh", p1_line[10:24])
        day_kwh = p1_line[10:24] 

		if nightkwh:
				print("Night kWh", p1_line[10:24])
				night_kwh = p1_line[10:24]

		if actualkw:
				print("Actual kW", p1_line[10:24])
				actual_usage = p1_line[10:23]
				
    if gas:
        print("Gas", p1_line[26:38])
        gas = p1_line[26:38]

    if gas != False:       	
        data = {"day_kwh": day_kwh, "night_kwh": night_kwh, "usage": actual_usage, "gas": gas}
        collection.insert_one(data).inserted_id

    time.sleep(300/18)

