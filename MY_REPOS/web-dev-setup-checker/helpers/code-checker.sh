source ./helpers/colors.sh

CODE=$(which code)
CODE_VERSION=$(code --version | head -n 1)

hr
title "Checking VSCode"
hr
echo "Code Binary: ${CODE}"
echo "Version: ${CODE_VERSION}"

if [ -z "$CODE" ]; then
    c_red "You don't have Visual Studio Code installed properly"
    c_red "Please reinstall it"
    exit 1;
fi

c_green "VSCode is OK"
