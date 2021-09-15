source ./helpers/colors.sh
source ./helpers/utils.sh
hr
title "Checking Shell"
hr
c_green "Shell: $SHELL"
c_green "Shell Startup File: $(shell_startup_file)"

if [ $SHELL = "/bin/bash" ]; then
    if [ -f ~/.bash_profile ]; then
        c_green "~/.bash_profile exists: true"
    else
        c_green "~/.bash_profile exists: false"
    fi
    if [ -f ~/.profile ]; then
        c_green "~/.profile exists: true"
    else
        c_green "~/.profile exists: false"
    fi

    # Check for .bash_profile that might be hiding your .profile and .bashrc
    if [ -f $HOME/.bash_profile ]; then
        BASH_PROFILE_LINES=$(wc -l $HOME/.bash_profile | awk '{print $1}')
        if [ "$BASH_PROFILE_LINES" -eq "0" ]; then
            c_red "You have an empty .bash_profile!"
            c_red "This will cause your .profile and .bashrc to not be executed"
            c_red "You probably want to remove this"
            exit 1
        fi
        if [ -f $HOME/.profile ]; then
            c_red "You have both a ~/.bash_profile and a ~/.profile file"
            c_red "This probably isn't what you intended."
            c_red "if ~/.bash_profile exists, bash will not run the ~/.profile file."
            c_red "You should consolidate the lines into a single file."
            exit 1
        fi
    fi

    # Check for .bashrc and no lines calling it in either .profile or .bash_profile

    bashrc_error() {
        c_red "It doesn't appear that your ~/.bashrc is running from either"
        c_red "your ~/.bash_profile or your ~/.profile files"
        c_red "This probably isn't what you want as non-login shells"
        c_red "Won't run your ~/.bashrc file"
        echo 
        c_red "Here's an example of what you probably want in one"
        c_red "of your bash startup files"
        echo
        c_red "if [ -n \"\$BASH_VERSION\" ]; then"
        c_red "    # include .bashrc if it exists"
        c_red "    if [ -f \"\$HOME/.bashrc\" ]; then"
        c_red "        . \"\$HOME/.bashrc\""
        c_red "    fi"
        c_red "fi"
    }

    if [ -f $HOME/.bashrc ]; then
        if [ -f $HOME/.bash_profile ]; then 
            BASHRC_IN_BASH_PROFILE=$(cat $HOME/.bash_profile | grep -c ".bashrc");
            if (( $BASHRC_IN_BASH_PROFILE == 0 )); then
                bashrc_error;
                exit 1;
            fi
        fi

        if [ -f $HOME/.profile ]; then
            BASHRC_IN_PROFILE=$(cat $HOME/.profile | grep -c ".bashrc");
            if (( $BASHRC_IN_PROFILE == 0 )); then
                bashrc_error;
                exit 1;
            fi
        fi
    fi
fi