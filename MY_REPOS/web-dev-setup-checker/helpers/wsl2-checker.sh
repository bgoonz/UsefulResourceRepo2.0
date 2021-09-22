source ./helpers/colors.sh
WSL=$(which wsl.exe)
WSL_VERSION=$(wsl.exe -l -v | tr -d '\0' | grep Ubuntu | awk '{print $4}' | tr -d '\n\r')
#testing
hr
title "Checking WSL"
hr
echo "WSL Version: $WSL_VERSION"

if [ -z "$WSL" ]; then
    c_red "WSL doesn't appear to be installed."
    exit 1;
fi

if [ $WSL_VERSION != "2" ]; then
    c_red "WSL for Ubuntu is not version 2."
    c_red "It is highly recommended you use WSL 1"
    c_red "Please run 'wsl --set-version Ubuntu 2' from Powershell"
fi

c_green "WSL is OK"
