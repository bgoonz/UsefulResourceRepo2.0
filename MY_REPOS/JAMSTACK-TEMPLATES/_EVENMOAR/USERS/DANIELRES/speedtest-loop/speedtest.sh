#! /bin/bash

date >> report.txt
nmcli -t -f active,ssid dev wifi | egrep '^yes' | cut -d\' -f2 >> report.txt
echo >> report.txt
speedtest-cli >> report.txt
echo >> report.txt
echo ================================= >> report.txt
echo >> report.txt