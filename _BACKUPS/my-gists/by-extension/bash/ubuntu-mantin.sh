sudo apt-get update --fix-missing
sudo apt-get install -f
sudo apt-get update
sudo apt-get clean
sudo apt-get autoremove
sudo dpkg --remove -force --force-remove-reinstreq Package_Name
sudo dpkg --configure -a
sudo apt-get clean
 sudo apt-get update