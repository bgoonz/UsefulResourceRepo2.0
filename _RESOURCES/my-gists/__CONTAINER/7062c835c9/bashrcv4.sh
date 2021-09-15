# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi


function fileSize {
for filesize in $(ls -l . | grep "^-" | awk '{print $5}')
do
  let totalsize=$totalsize+$filesize
done
ps aux | "$totalsize"
echo -n "$totalsize"
}
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# ------------------------------------------------------------------------------
# ---- controls what displays on every line of terminal that is not the output log-----------
#--- the \W outputs the current working directory
# ------------------------------------------------------------------------------
# export PS1="\[\033[00m\]\D{%Y-%m-%d-%I:%M%p} \[\033[44m\]\[\033[31m\]\j\w\u_dir:\W_exitstatus:\$?\[$(tput sgr0)\][\033[00m\]=================================================>\h [\$(totalfilesize.sh) bytes]>\n\n"

if [ "`id -u`" -eq 0 ]; then
    PS1="\[\033[m\]|\[\033[1;35m\]\t\[\033[m\]|\[\e[1;31m\]\u\[\e[1;36m\]\[\033[m\]@\[\e[1;36m\]\h\[\033[m\]:\[\e[0m\]\[\e[1;32m\][\W]\[\033[1;31m\] \W_exitstatus:\$?\[$(tput sgr0)\][\033[00m\]__________________________________________________________o>\n\n"
else
    PS1="\[\033[m\]|\[\033[1;35m\]\t\[\033[m\]|\[\e[1m\]\u\[\e[1;36m\]\[\033[m\]@\[\e[1;36m\]\h\[\033[m\]:\[\e[0m\]\[\e[1;32m\][\W] \W_exitstatus:\[\033[1;31m\]\$?\[$(tput sgr0)\][\033[00m\]__________________________________________________________o>\n\n"
fi
#--------------------function that ls's every time I cd into a new directory-----------
#   i.e.)       home ====>cd ..
#bin   dev  home  lib    lib64   lost+found  mnt  proc  run   snap  sys  usr
#boot  etc  init  lib32  libx32  media       opt  root  sbin  srv   tmp  var
#/ ====>
#------------------------------------------------------------------------------------------------
function cd {
    if [ -z "$1" ]; then
        builtin cd
    else
        builtin cd "$1"
    fi
    if [ $? -eq 0 ]; then
    printf '\n'
        ls
        find -type d -name '[!.]*' -exec du -sh {} + 
    fi
}
myPandoc () {
    find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;


for f in *.html; do printf '%s\n' 0a '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
<link rel="stylesheet" href="./prism.css">
<script async defer src="./prism.js"></script>
</head>
<body>;' . x | ex "$f"; done
echo "</body></html>" | tee -a *.html
}



### virtualenv prompt
prompt_virtualenv() {
    if [[ -n $VIRTUAL_ENV ]]; then
        # Python could output the version information in both stdout and
        # stderr (e.g. if using pyenv, the output goes to stderr).
        VERSION_OUTPUT=$($VIRTUAL_ENV/bin/python --version 2>&1)

        # The last word of the output of `python --version`
        # corresponds to the version number.
        VENV_VERSION=$(echo $VERSION_OUTPUT | awk '{print $NF}')

        color=cyan
        prompt_segment $color $PRIMARY_FG
        prompt_segment $color white "$(basename $VENV_VERSION)"
    fi
}

### Prompt components
# Each component will draw itself, and hide itself if no information needs to be shown

# Context: user@hostname (who am I and where am I)
prompt_context() {
    local user=`whoami`

    if [[ $user != $DEFAULT_USER || -n $SSH_CLIENT ]]; then
        prompt_segment black default "$user@\h"
    fi
}

# prints history followed by HH:MM, useful for remembering what
# we did previously
prompt_histdt() {
    prompt_segment black default "\! [\A]"
}


git_status_dirty() {
    dirty=$(git status -s 2> /dev/null | tail -n 1)
    [[ -n $dirty ]] && echo " ●"
}

# Git: branch/detached head, dirty status
prompt_git() {
    local ref dirty
    if $(git rev-parse --is-inside-work-tree >/dev/null 2>&1); then
        ZSH_THEME_GIT_PROMPT_DIRTY='±'
        dirty=$(git_status_dirty)
        ref=$(git symbolic-ref HEAD 2> /dev/null) || ref="➦ $(git show-ref --head -s --abbrev |head -n1 2> /dev/null)"
        if [[ -n $dirty ]]; then
            prompt_segment yellow black
        else
            prompt_segment green black
        fi
        PR="$PR${ref/refs\/heads\// }$dirty"
    fi
}

# Dir: current working directory
prompt_dir() {
    prompt_segment blue black '\w'
}

# Status:
# - was there an error
# - am I root
# - are there background jobs?
prompt_status() {
    local symbols
    symbols=()
    [[ $RETVAL -ne 0 ]] && symbols+="$(ansi_single $(fg_color red))✘"
    [[ $UID -eq 0 ]] && symbols+="$(ansi_single $(fg_color yellow))⚡"
    [[ $(jobs -l | wc -l) -gt 0 ]] && symbols+="$(ansi_single $(fg_color cyan))⚙"

    [[ -n "$symbols" ]] && prompt_segment black default "$symbols"
}

rightprompt() {
    printf "%*s" $COLUMNS "$PRIGHT"
}

# quick right prompt I grabbed to test things.
__command_rprompt() {
    local times= n=$COLUMNS tz
    for tz in ZRH:Europe/Zurich PIT:US/Eastern \
              MTV:US/Pacific TOK:Asia/Tokyo; do
        [ $n -gt 40 ] || break
        times="$times ${tz%%:*}\e[30;1m:\e[0;36;1m"
        times="$times$(TZ=${tz#*:} date +%H:%M)\e[0m"
        n=$(( $n - 10 ))
    done
    [ -z "$times" ] || printf "%${n}s$times\\r" ''
}
# PROMPT_COMMAND=__command_rprompt

# this doens't wrap code in \[ \]
ansi_r() {
    local seq
    declare -a mycodes2=("${!1}")

    debug "ansi: ${!1} all: $* aka ${mycodes2[@]}"

    seq=""
    for ((i = 0; i < ${#mycodes2[@]}; i++)); do
        if [[ -n $seq ]]; then
            seq="${seq};"
        fi
        seq="${seq}${mycodes2[$i]}"
    done
    debug "ansi debug:" '\\[\\033['${seq}'m\\]'
    echo -ne '\033['${seq}'m'
    # PR="$PR\[\033[${seq}m\]"
}

# Begin a segment on the right
# Takes two arguments, background and foreground. Both can be omitted,
# rendering default background/foreground.
prompt_right_segment() {
    local bg fg
    declare -a codes

    debug "Prompt right"
    debug "Prompting $1 $2 $3"

    # if commented out from kruton's original... I'm not clear
    # if it did anything, but it messed up things like
    # prompt_status - Erik 1/14/17

    #    if [[ -z $1 || ( -z $2 && $2 != default ) ]]; then
    codes=("${codes[@]}" $(text_effect reset))
    #    fi
    if [[ -n $1 ]]; then
        bg=$(bg_color $1)
        codes=("${codes[@]}" $bg)
        debug "Added $bg as background to codes"
    fi
    if [[ -n $2 ]]; then
        fg=$(fg_color $2)
        codes=("${codes[@]}" $fg)
        debug "Added $fg as foreground to codes"
    fi

    debug "Right Codes: "
    # declare -p codes

    # right always has a separator
    # if [[ $CURRENT_RBG != NONE && $1 != $CURRENT_RBG ]]; then
    #     $CURRENT_RBG=
    # fi
    declare -a intermediate2=($(fg_color $1) $(bg_color $CURRENT_RBG) )
    # PRIGHT="$PRIGHT---"
    debug "pre prompt " $(ansi_r intermediate2[@])
    PRIGHT="$PRIGHT$(ansi_r intermediate2[@])$RIGHT_SEPARATOR"
    debug "post prompt " $(ansi_r codes[@])
    PRIGHT="$PRIGHT$(ansi_r codes[@]) "
    # else
    #     debug "no current BG, codes is $codes[@]"
    #     PRIGHT="$PRIGHT$(ansi codes[@]) "
    # fi
    CURRENT_RBG=$1
    [[ -n $3 ]] && PRIGHT="$PRIGHT$3"
}


# ------------------------------------------------------------------------------
# ---------------------------- general shortcuts--------------------------------
# ------------------------------------------------------------------------------

# -- easy reverse cd --

alias .1='cd ..'
alias .2='cd ../../'
alias .3='cd ../../../'
alias .4='cd ../../../../'
alias .5='cd ../../../../../'



alias cp='cp -iv'                           # Preferred 'cp' implementation
alias mv='mv -iv'                           # Preferred 'mv' implementation
alias mkdir='mkdir -pv'                     # Preferred 'mkdir' implementation
alias ll='ls -lAFh'                         # Preferred 'ls' implementation
alias less='less -FSRXc'                    # Preferred 'less' implementation
alias nano='nano -W'                        # Preferred 'nano' implementation
alias wget='wget -c'                        # Preferred 'wget' implementation (resume download)
alias c='clear'                             # c:            Clear terminal display
alias path='echo -e ${PATH//:/\\n}'         # path:         Echo all executable Paths
# -- easy ls with color--

alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'

#order by size
alias lt='ls --human-readable --size -1 -S --classify'

#only show hidden files
alias lh='ls -lisAd .[^.]*'

# -- grep with color --

alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'

# -- safety nets --

alias mv='mv -i'
alias rm='rm -i'

# -- system checks --

alias meminfo='free -m -l -t'
alias topmem='ps auxf | sort -nr -k 4'
alias gpumeminfo='grep -i --color memory /var/log/Xorg.0.log'
alias  getipe='curl ipinfo.io/ip'
alias speed='speedtest-cli --server 2406 --simple'

# -- true laziness --

alias c='clear'
alias update='sudo apt update && sudo apt upgrade'
alias install='sudo apt install'
alias change-terminal='sudo update-alternatives --config x-terminal-emulator'
alias pip="pip3"
alias www='python -m SimpleHTTPServer 8000'
alias vim='nvim'


# ------------------------------------------------------------------------------
# ------------------------------ git shortcuts----------------------------------
# ------------------------------------------------------------------------------

alias commit='git commit -m'
alias gc='git checkout'
alias log='git log --oneline'
alias status='git status'
alias setremote='git remote set-url origin'


# ------------------------------------------------------------------------------
# ------------------------------ psql shortcuts---------------------------------
# ------------------------------------------------------------------------------

alias psql='psql -h localhost'
alias sc='npx sequelize-cli'
alias sc-init='npx sequelize-cli init'

alias sc-makedb='npx sequelize-cli db:create'
alias sc-makemodel='npx sequelize-cli model:generate'

alias sc-migrate='npx sequelize-cli db:migrate'

alias sc-genseed='npx sequelize-cli seed:generate'
alias sc-seed='npm sequelize-cli db:seed:all'
###-begin-npm-completion-###
#
# npm command completion script
#
# Installation: npm completion >> ~/.bashrc  (or ~/.zshrc)
# Or, maybe: npm completion > /usr/local/etc/bash_completion.d/npm
#

if type complete &>/dev/null; then
  _npm_completion () {
    local words cword
    if type _get_comp_words_by_ref &>/dev/null; then
      _get_comp_words_by_ref -n = -n @ -n : -w words -i cword
    else
      cword="$COMP_CWORD"
      words=("${COMP_WORDS[@]}")
    fi

    local si="$IFS"
    IFS=$'\n' COMPREPLY=($(COMP_CWORD="$cword" \
                           COMP_LINE="$COMP_LINE" \
                           COMP_POINT="$COMP_POINT" \
                           npm completion -- "${words[@]}" \
                           2>/dev/null)) || return $?
    IFS="$si"
    if type __ltrim_colon_completions &>/dev/null; then
      __ltrim_colon_completions "${words[cword]}"
    fi
  }
  complete -o default -F _npm_completion npm
elif type compdef &>/dev/null; then
  _npm_completion() {
    local si=$IFS
    compadd -- $(COMP_CWORD=$((CURRENT-1)) \
                 COMP_LINE=$BUFFER \
                 COMP_POINT=0 \
                 npm completion -- "${words[@]}" \
                 2>/dev/null)
    IFS=$si
  }
  compdef _npm_completion npm
elif type compctl &>/dev/null; then
  _npm_completion () {
    local cword line point words si
    read -Ac words
    read -cn cword
    let cword-=1
    read -l line
    read -ln point
    si="$IFS"
    IFS=$'\n' reply=($(COMP_CWORD="$cword" \
                       COMP_LINE="$line" \
                       COMP_POINT="$point" \
                       npm completion -- "${words[@]}" \
                       2>/dev/null)) || return $?
    IFS="$si"
  }
  compctl -K _npm_completion npm
fi
###-end-npm-completion-###
# Install Ruby Gems to ~/gems
export GEM_HOME="$HOME/gems"
export PATH="$HOME/gems/bin:$PATH"
