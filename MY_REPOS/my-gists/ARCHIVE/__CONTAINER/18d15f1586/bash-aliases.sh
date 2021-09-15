# ------------------------------------------------------------------------------
# ---------------------------- general shortcuts--------------------------------
# ------------------------------------------------------------------------------

# -- easy reverse cd --

alias .1='cd ..'
alias .2='cd ../../'
alias .3='cd ../../../'
alias .4='cd ../../../../'
alias .5='cd ../../../../../'

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



##------------------------------------

alias ls='ls --color=auto'

alias ..='cd ..'
alias ...='cd ../..'
alias back='cd -'

alias l='ls'
alias sl='ls'

alias ini="git init && git add . && git commit -m 'initial commit'"
alias norm="git add . && git commit -m 'update'"
alias commit='git commit'
alias check='git checkout'
alias status='git status'
alias push='git push'
alias pull='git pull'
alias stash='git stash'
alias pop='git stash pop'



alias unzipa='find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;'


alias run='./manage.py runserver 0.0.0.0:8000'
alias syncdb='./manage.py syncdb'
alias numFiles='echo $(ls -1 | wc -l)'       # numFiles:     Count of non-hidden files in current dir
alias make1mb='truncate -s 1m ./1MB.dat'     # make1mb:      Creates a file of 1mb size (all zeros)
alias make5mb='truncate -s 5m ./5MB.dat'     # make5mb:      Creates a file of 5mb size (all zeros)
alias make10mb='truncate -s 10m ./10MB.dat'  # make10mb:     Creates a file of 10mb size (all zeros)


#   ---------------------------
#   2.  SEARCHING
#   ---------------------------

alias qfind="find . -name "                 # qfind:    Quickly search for file


#   ---------------------------
#   3.  PROCESS MANAGEMENT
#   ---------------------------

#   memHogsTop, memHogsPs:  Find memory hogs
#   -----------------------------------------------------
    alias memHogsTop='top -l 1 -o rsize | head -20'
    alias memHogsPs='ps wwaxm -o pid,stat,vsize,rss,time,command | head -10'

#   cpuHogs:  Find CPU hogs
#   -----------------------------------------------------
    alias cpu_hogs='ps wwaxr -o pid,stat,%cpu,time,command | head -10'

#   topForever:  Continual 'top' listing (every 10 seconds)
#   -----------------------------------------------------
    alias topForever='top -l 9999999 -s 10 -o cpu'

#   ttop:  Recommended 'top' invocation to minimize resources
#   ------------------------------------------------------------
#       Taken from this macosxhints article
#       http://www.macosxhints.com/article.php?story=20060816123853639
#   ------------------------------------------------------------
    alias ttop="top -R -F -s 10 -o rsize"


#   ---------------------------
#   4.  NETWORKING
#   ---------------------------

alias netCons='lsof -i'                                   # netCons:      Show all open TCP/IP sockets
alias lsock='sudo /usr/sbin/lsof -i -P'                   # lsock:        Display open sockets
alias lsockU='sudo /usr/sbin/lsof -nP | grep UDP'         # lsockU:       Display only open UDP sockets
alias lsockT='sudo /usr/sbin/lsof -nP | grep TCP'         # lsockT:       Display only open TCP sockets
alias ipInfo0='ifconfig getpacket en0'                    # ipInfo0:      Get info on connections for en0
alias ipInfo1='ifconfig getpacket en1'                    # ipInfo1:      Get info on connections for en1
alias openPorts='sudo lsof -i | grep LISTEN'              # openPorts:    All listening connections
alias showBlocked='sudo ipfw list'                        # showBlocked:  All ipfw rules inc/ blocked IPs


#   ---------------------------------------
#   5.  SYSTEMS OPERATIONS & INFORMATION
#   ---------------------------------------

alias mountReadWrite='/sbin/mount -uw /'    # mountReadWrite:   For use when booted into single-user


#   ---------------------------------------
#   6.  DATE & TIME MANAGEMENT
#   ---------------------------------------

alias bdate="date '+%a, %b %d %Y %T %Z'"
alias cal3='cal -3'
alias da='date "+%Y-%m-%d %A    %T %Z"'
alias daysleft='echo "There are $(($(date +%j -d"Dec 31, $(date +%Y)")-$(date +%j))) left in year $(date +%Y)."'
alias epochtime='date +%s'
alias mytime='date +%H:%M:%S'
alias secconvert='date -d@1234567890'
alias stamp='date "+%Y%m%d%a%H%M"'
alias timestamp='date "+%Y%m%dT%H%M%S"'
alias today='date +"%A, %B %-d, %Y"'
alias weeknum='date +%V'
# Example aliases
# alias bashconfig="mate ~/.bashrc"
# alias ohmybash="mate ~/.oh-my-bash"
# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.
