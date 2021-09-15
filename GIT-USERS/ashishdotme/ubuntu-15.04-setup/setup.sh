#Create Directories
cd ~
mkdir software
mkdir installations
mkdir projects

#Delete unwanted directories
cd ~
rmdir Templates
rmdir Documents
rmdir Music
rmdir Pictures
rmdir Videos
rmdir Public

#Update Repositories
sudo apt-get update;

#Remove unwanted programs
sudo apt-get purge thunderbird totem empathy unity-webapps-common libreoffice-* aisleriot rhythmbox  gnome-sudoku gnome-mahjongg gnome-contacts -y

#Autoremove unwanted software
sudo apt-get autoremove -y

#Update System
sudo apt-get upgrade -y

#install vlc
sudo apt-get install vlc

#install sublime
sudo add-apt-repository ppa:webupd8team/sublime-text-3
sudo apt-get update
sudo apt-get install sublime-text-installer

#install flash plugin
sudo apt-get install flashplugin-installer

#chrome
sudo apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

#install atom
sudo add-apt-repository ppa:webupd8team/atom
sudo apt-get update
sudo apt-get install atom

#install popcorn time
sudo add-apt-repository ppa:webupd8team/popcorntime
sudo apt-get update
sudo apt-get install popcorn-time

#install essential tools
sudo apt-get install python-software-properties curl git build-essential

#setup git
git config --global user.name "Ashish Patel"
git config --global user.email "email@ashishpatel.in"

ssh-keygen -t rsa -C "email@ashishpatel.in"
cat ~/.ssh/id_rsa.pub


#install oh my zsh
sudo apt-get install zsh
curl -L http://install.ohmyz.sh | zsh
chsh -s `which zsh`

#setup theme of zsh
$ sudo nano ~/.zshrc

#setup zsh
sudo chown -R root /usr/local/share/zsh/site-functions

#install lamp
sudo apt-get update
sudo apt-get install lamp-server^
#sql password is blank
sudo apt-get -y install phpmyadmin

# Create websites folder in your home directory
cd
mkdir websites

# Create symlink in /var/www folder
cd /var/www/html
sudo ln -s /home/ashish/websites

#Setting Up Ownership and Permissions
sudo chown -R $USER:$USER /var/www/html/
sudo chmod -R 777 /var/www/html/

#create virtual host file
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/ashish.dev.conf
sudo atom /etc/apache2/sites-available/ashish.dev.conf
     #   ServerAdmin webmaster@ashish.dev
     #   ServerName ashish.dev
     #   ServerAlias www.ashish.dev
     #   DocumentRoot /var/www/html/websites
     
#enable new virtual host
sudo a2dissite 000-default.conf
sudo a2ensite ashish.dev.conf

# Enable Apache Rewrite Module
sudo a2enmod rewrite

#restart apache
sudo systemctl restart apache2

#install node.js using nvm
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 0.10
nvm use 0.10
nvm alias default stable
sudo apt-get install nodejs

#install ruby on rails
$ sudo apt-get update
curl -L https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
rvm requirements
rvm install ruby
rvm use ruby --default
rvm rubygems current
gem install rails

### install 
>sudo apt-get install rar

### extract
>rar e XXX.rar

#install tomate
RELEASE=`sed -n 's/VERSION_ID="\(.*\)"/\1/p' /etc/os-release`
sudo wget -O- http://download.opensuse.org/repositories/home:/eliostvs:/tomate/xUbuntu_$RELEASE/Release.key | sudo apt-key add -
sudo bash -c "echo 'deb http://download.opensuse.org/repositories/home:/eliostvs:/tomate/xUbuntu_$RELEASE/ ./' > /etc/apt/sources.list.d/tomate.list"
sudo apt-get update && sudo apt-get install python-tomate

#gems
gem install sass

#install npm
# Note the new setup script name for Node.js v0.12
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -

# Then install with:
sudo apt-get install -y nodejs
npm install -g yo
sudo npm install -g bower
sudo npm install -g grunt-cli
sudo npm install -g gulp




