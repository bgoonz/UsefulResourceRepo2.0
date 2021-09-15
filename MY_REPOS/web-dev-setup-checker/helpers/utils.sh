source ./helpers/colors.sh

shell_startup_file() {
    if [ $SHELL = '/bin/bash' ]; then
        if [ -e $HOME/.bash_profile ]; then
           BASHRC_IN_BASH_PROFILE=$(cat $HOME/.bash_profile | grep -c '\$HOME/.bashrc')
            if [ -e $HOME/.bashrc ] && [ $BASHRC_IN_BASH_PROFILE != 1 ]; then
                echo "$HOME/.bashrc"
            else
                echo "$HOME/.bash_profile"
            fi
            exit 0
        elif [ -e $HOME/.profile ]; then
            BASHRC_IN_PROFILE=$(cat $HOME/.profile | grep -c '\$HOME/.bashrc')
            if [ -e $HOME/.bashrc ] && [ $BASHRC_IN_PROFILE != 1 ];then
                echo "$HOME/.bashrc"
            else
                echo "$HOME/.profile"
            fi
            exit 0;
        fi
    elif [ $SHELL = '/bin/zsh' ]; then
            echo "$HOME/.zshrc"
    else
        echo "I couldn't figure out what shell you are using, please use a supported shell"
        exit 1;
    fi
}

shell_startup_file_message() {

    if [ $(shell_startup_file) = '~/.bashrc' ]; then
        echo "Your startup file is ~/.bashrc"
        echo "Use this command to edit it"
        echo
        f_bold "code ~/.bashrc"
    fi

    if [ $(shell_startup_file) = '~/.zshrc' ]; then
        echo "Your startup file is ~/.zshrc"
        echo "Use this command to edit it"
        echo
        f_bold "code ~/.zshrc"
    fi
}