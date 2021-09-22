

Windows Subsytem for Linux (WSL) and Ubuntu
-------------------------------------------



1.  In the application search box in the bottom bar, type "PowerShell" to find the application named "Windows PowerShell"
2.  Right-click on "Windows PowerShell" and choose "Run as administrator" from the popup menu
3.  In the blue PowerShell window, type the following: `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
4.  Restart your computer
5.  In the application search box in the bottom bar, type "Store" to find the application named "Microsoft Store"
6.  Click "Microsoft Store"
7.  Click the "Search" button in the upper-right corner of the window
8.  Type in "Ubuntu"
9.  Click "Run Linux on Windows (Get the apps)"
10.  Click the orange tile labeled **"Ubuntu 18.04 LTS"** UBUNTU VERSION MUST BE 18.04 OR GREATER
11.  Click "Install"
12.  After it downloads, click "Launch"
13.  If you get the option, pin the application to the task bar. Otherwise, right-click on the orange Ubuntu icon in the task bar and choose "Pin to taskbar"
14.  Wait for it to install the local files
15.  When prompted to "Enter new UNIX username", type your first name with no spaces
16.  When prompted, enter and retype a password for this UNIX user (it can be the same as your Windows password)
17.  Confirm your installation by typing the command `whoami` followed by Enter at the prompt (it should print your first name)
18.  You need to update your packages, so type `sudo apt update` (if prompted for your password, enter it)
19.  You need to upgrade your packages, so type `sudo apt upgrade` (if prompted for your password, enter it)

Git
---

Git comes with Ubuntu, so there's nothing to install. However, you should configure it using the following instructions.

1.  Open an Ubuntu terminal if you don't have one open already.
2.  You need to configure Git, so type `git config --global user.name "Your Name"` with replacing "Your Name" with your real name.
3.  You need to configure Git, so type `git config --global user.email your@email.com` with replacing "your@email.com" with your real email.

Google Chrome
-------------

Test if you have Chrome installed by typing "Chrome" in the search box in the bottom app bar that reads "Type here to search". If you see a search result that reads "Chrome" with "App" under it, then you have it installed. Otherwise, follow these instructions to install Google Chrome.

1.  Open Microsoft Edge, the blue "e" in the task bar, and type in [http://chrome.google.com](http://chrome.google.com/). Click the "Download Chrome" button. Click the "Accept and Install" button after reading the terms of service. Click "Save" in the "What do you want to do with ChromeSetup.exe" dialog at the bottom of the window. When you have the option to "Run" it, do so. Answer the questions as you'd like. Set it as the default browser.
2.  Right-click on the Chrome icon in the task bar and choose "Pin to taskbar".

Node.js
-------

Test if you have Node.js installed by opening an Ubuntu terminal and typing `node --version`. If it reports "Command 'node' not found", then you need to follow these directions.

1.  In the Ubuntu terminal, type `sudo apt update` and press Enter
2.  In the Ubuntu terminal, type `sudo apt install build-essential` and press Enter
3.  In the Ubuntu terminal, type `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash` and press Enter
4.  In the Ubuntu terminal, type `. ./.bashrc` and press Enter
5.  In the Ubuntu terminal, type `nvm install --lts` and press Enter
6.  Confirm that **node** is installed by typing `node --version` and seeing it print something that is not "Command not found"!

Unzip
-----

For your projects you will often have to download a zip file and unzip it. It is easier to do this from the command line. So we need to install a linux unzip utility.

In the Ubuntu terminal type: `sudo apt install unzip` and press Enter

Mocha.js
--------

Test if you have Mocha.js installed by opening an Ubuntu terminal and typing `which mocha`. If it prints a path, then you're good. Otherwise, if it prints nothing, install Mocha.js by typing `npm install -g mocha`.

Python 3
--------

Ubuntu does not come with Python 3. Install it using the command `sudo apt install python3`. Test it by typing `python3 --version` and seeing it print a number.

_Note about WSL_
----------------

As of the time of writing of this document, WSL has an issue renaming or deleting files if Visual Studio Code is open. So before doing any linux commands which manipulate files, make sure you **close** Visual Studio Code before running those commands in the Ubuntu terminal.

