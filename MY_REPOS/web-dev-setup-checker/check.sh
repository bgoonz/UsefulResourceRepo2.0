#!/bin/bash
source ./helpers/colors.sh
source ./helpers/utils.sh

IS_MACOS=$(uname -a | awk '{ print $1 }' | grep -c Darwin 2> /dev/null)
IS_WINDOWS=$(which cmd.exe | grep -c -v 'not found' 2> /dev/null)
LSB_RELEASE=$(which lsb_release | grep -c -v 'not found' 2> /dev/null)
if [ $LSB_RELEASE = 1 ]; then
    IS_UBUNTU=$(lsb_release -s -i | grep -c "Ubuntu" 2> /dev/null)
    IS_DEBIAN=$(lsb_release -s -i | grep -c "Debian" 2> /dev/null)
    IS_RASPBIAN=$(lsb_release -s -i | grep -c "Raspbian" 2> /dev/null)
fi

success() {
    hr
    c_green "Congratulations, you have everything installed properly!"
    hr
}

if [ $IS_MACOS = 1 ]; then
    $SHELL -l ./helpers/macos-checker.sh
    if [ $? -eq 1 ]; then
        exit 1
    fi
    success
    exit 0
elif [ $IS_WINDOWS = 1 ]; then
    $SHELL -l ./helpers/windows-checker.sh
    if [ $? -eq 1 ]; then
        exit 1
    fi
    success
    exit 0
elif [ $IS_UBUNTU = 1 ]; then
    $SHELL ./helpers/ubuntu-checker.sh
    if [ $? -eq 1 ]; then
        exit 1
    fi
    success
    exit 0
elif [ $IS_DEBIAN = 1 ]; then
    $SHELL ./helpers/debian-checker.sh
    if [ $? -eq 1 ]; then
        exit 1
    fi
    success
    exit 0
elif [ $IS_RASPBIAN = 1 ]; then
    $SHELL ./helpers/raspbian-checker.sh
    if [ $? -eq 1 ]; then
        exit 1
    fi
    success
    exit 0
elif [ -e /etc/fedora-release ]; then
    $SHELL ./helpers/fedora-checker.sh
    if [ $? -eq 1 ]; then
        exit 1
    fi
    success
    exit 0
else
    c_red "Unknown Operating System, checker script not supported"
fi
