#! /bin/bash

INTERVAL=$1



echo >> report.txt
echo ==== Running speedtest every $INTERVAL seconds ====================================== >> report.txt 
echo >> report.txt
while true; do ./speedtest.sh; sleep 60; done