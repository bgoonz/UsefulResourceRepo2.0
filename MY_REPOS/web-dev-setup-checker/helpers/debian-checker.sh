source ./helpers/colors.sh

DEBIAN_VERSION=$(lsb_release -r -s)

hr
title "Checking Debian"
hr
echo "Debian Version: $DEBIAN_VERSION"

# Check Linux
echo
$SHELL ./helpers/linux-checker.sh
if [ $? -eq 1 ]; then
  exit 1;
fi
