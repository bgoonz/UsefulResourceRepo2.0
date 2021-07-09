# Do nothing for non-interactive shells.
[ -z "$PS1" ] && return

echo '    ___       ___       ___      ___   '
echo '   /\  \     /\  \     /\__\    /\  \  '
echo '   \:\  \   _\:\  \   /:/  /    \:\  \ '
echo '   /::\__\ /\/::\__\ /:/__/     /::\__\'
echo '  /:/\/__/ \::/\/__/ \:\  \    /:/\/__/'
echo '  \/__/     \:\__\    \:\__\   \/__/   '
echo '             \/__/     \/__/           '
echo '                                       '
echo '                                       '

#  Misc Aliases.
alias '..'='cd ..'
alias 'cd2'='cd ../..'
alias 'cd3'='cd ../../..'
alias 'cd4'='cd ../../../..'
alias 'll'='ls -alFhS'
alias 'la'='ls -A'
alias 'grep'='grep -i'
alias 'alert'='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
alias 'hs'='history | grep '
alias 'cp'='cp -iv'
alias 'rm'='rm -i'
alias 'mv'='mv -iv'
alias 'lc'='wc -l'
alias 'df'='df -h'
alias 'du'='du -h'
alias 'cls'='clear'
alias 'fhere'='find . -name '

# Git Aliases.
alias 'gs'='git status'
alias 'gb'='git branch --all'
alias 'gbs'='git branch --all | grep '
alias 'gaa'='git add -A'
alias 'gcm'='git commit -m '

# Rust Cargo.
export PATH="$PATH:$HOME/.cargo/bin"

# Global stuff.
export PATH=$HOME/bin:$PATH
export EDITOR=emacs

# History stuff.
export HISTCONTROL=ignoreboth:erasedups
export HISTTIMEFORMAT="%Y-%m-%d %H:%M:%S "
shopt -s histappend
export HISTSIZE=1000
export HISTFILESIZE=2000

shopt -s checkwinsize

# Homebrew stuff.
export PATH=$HOME/homebrew/bin:$PATH
export LD_LIBRARY_PATH=$HOME/homebrew/lib:$LD_LIBRARY_PATH

# Make less more friendly for non-text input files.
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# PS1 SETUP
# get current branch in git repo
function parse_git_branch() {
	BRANCH=`git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'`
        if [ ! "${BRANCH}" == "" ]
        then
                STAT=`parse_git_dirty`
                echo "[${BRANCH}${STAT}]"
        else
                echo ""
        fi
}

# get current status of git repo
function parse_git_dirty {
        status=`git status 2>&1 | tee`
        dirty=`echo -n "${status}" 2> /dev/null | grep "modified:" &> /dev/null; echo "$?"`
        untracked=`echo -n "${status}" 2> /dev/null | grep "Untracked files" &> /dev/null; echo "$?"`
        ahead=`echo -n "${status}" 2> /dev/null | grep "Your branch is ahead of" &> /dev/null; echo "$?"`
        newfile=`echo -n "${status}" 2> /dev/null | grep "new file:" &> /dev/null; echo "$?"`
        renamed=`echo -n "${status}" 2> /dev/null | grep "renamed:" &> /dev/null; echo "$?"`
        deleted=`echo -n "${status}" 2> /dev/null | grep "deleted:" &> /dev/null; echo "$?"`
        bits=''
        if [ "${renamed}" == "0" ]; then
                bits=">${bits}"
        fi
        if [ "${ahead}" == "0" ]; then
                bits="*${bits}"
        fi
        if [ "${newfile}" == "0" ]; then
                bits="+${bits}"
        fi
        if [ "${untracked}" == "0" ]; then
                bits="?${bits}"
        fi
        if [ "${deleted}" == "0" ]; then
                bits="x${bits}"
        fi
        if [ "${dirty}" == "0" ]; then
                bits="!${bits}"
        fi
        if [ ! "${bits}" == "" ]; then
                echo " ${bits}"
        else
                echo ""
        fi
}

export PS1="\[\e[33m\][\[\e[m\]\[\e[33m\]\t\[\e[m\]\[\e[33m\]]\[\e[m\]\[\e[31m\]\`parse_git_branch\`\[\e[m\]:\[\e[35m\]\w\[\e[m\]\n\[\e[33m\]λ\[\e[m\] "
