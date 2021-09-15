source ./helpers/colors.sh

UBUNTU_VERSION=$(lsb_release -r -s)

hr
title "Checking Ubuntu"
hr
echo "Ubuntu Version: $UBUNTU_VERSION"

# Check Linux
echo
$SHELL ./helpers/linux-checker.sh
if [ $? -eq 1 ]; then
  exit 1;
fi
