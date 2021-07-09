"""
You have a large log file.
Each log entry has the date  and time and a log message
in some simple format:
(tab-seperated: iso8601-time\tmessage).
Some messages are multi-line.
Find all the log messages with timestamps within a specified range.
"""

# Enter your code here. Read input from STDIN. Print output to STDOUT

import sys
import re

inputfile = open("input.txt","r")
file = inputfile.readlines()

inputVars = []
mySet = []
timestamps = []
msgs = []
num = None

def read():
    for line in file:
        inputVars.append(line)

def checkSet():
    mySet = inputVars[3:num]
    for i in mySet:
        words = i.split("\t")
        msgs.append(words[1].rstrip())
        timestamps.append(words[0])

def finder():
    time1 = inputVars[0].rstrip()
    time2 = inputVars[1].rstrip()
    bound1 = 0
    bound2 = 0
    count = 0
    for i in timestamps:
        if i == time1:
            bound1 = count
        if i == time2:
            bound2 = count-1

        count += 1

    counter = bound1
    while counter <= bound2:
        #answer = inputVars[counter].rstrip()
        # print(answer)
        times = timestamps[counter]
        print(times + "\t" + msgs[counter])
        counter += 1


def main():
    read()

    num = inputVars[2]

    checkSet()
    finder()



if __name__ == '__main__':
    main()



"""
def read():
    for line in sys.stdin.readlines():
        inputVars.append(line)
"""