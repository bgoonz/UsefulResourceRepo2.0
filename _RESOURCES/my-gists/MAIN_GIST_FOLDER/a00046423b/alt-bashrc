# .bashrc

# Source global definitions
if [ -f ~/fbStuff.sh ]; then
  . ~/fbStuff.sh
fi

export EDITOR=vim
source ~/git-completion.bash

function parse_git_branch {
    git symbolic-ref HEAD 2> /dev/null | cut -d '/' -f 3
}

function proml {
  local        BLUE="\[\033[0;34m\]"
  local         RED="\[\033[0;31m\]"
  local   LIGHT_RED="\[\033[1;31m\]"
  local       GREEN="\[\033[0;32m\]"
  local LIGHT_GREEN="\[\033[1;32m\]"
  local       WHITE="\[\033[1;37m\]"
  local  LIGHT_GRAY="\[\033[0;37m\]"
  case $TERM in
    xterm*)
    TITLEBAR='\[\033]0;\u@\h:\w\007\]'
    ;;
    *)
    TITLEBAR=""
    ;;
  esac

PS1="${TITLEBAR}\
$GREEN[$GREEN\u:\w$LIGHT_GRAY:\$(parse_git_branch)$GREEN]\
$GREEN\$ "
PS2='> '
PS4='+ '
}
proml

if [ -d /usr/local/share/npm/lib/node_modules ]; then
  export PATH="/usr/local/share/npm/bin/:$PATH"
  export PATH="/usr/local/share/npm/lib/node_modules/jasmine-node/bin:$PATH"
fi

if [ -d ~/ztools ]; then
  PATH=$PATH:$HOME/ztools/bins/search
  PATH=$PATH:$HOME/ztools/bins/searchpath
  PATH=$PATH:$HOME/ztools/bins/searchdiff
  PATH=$PATH:$HOME/ztools/bins/searchedit
  PATH=$PATH:$HOME/ztools/bins/arc
  PATH=$PATH:$HOME/ztools/bins/misc
fi

if [ -d /usr/local/bin ]; then
  export PATH="/usr/local/bin/:$PATH"
fi

alias oneline="git log --pretty=oneline"
alias onelinedates="git log --pretty=format:'%h was %an, %ai, message: %s'"

# pushin and pullin'
alias gitrage="git pull --rebase; git push"
alias hrage="git push heroku master; git push"
alias slime='open -a "Sublime Text 2"'
alias ghrage="grunt lint && git checkout master && git push && git checkout gh-pages && git merge master -m 'merge master' && grunt build && git commit -am 'rebuild for prod' && git push origin gh-pages && git branch -f trunk gh-pages && git checkout master && grunt fastBuild"
alias ghrageContinue="grunt build && git commit -am 'rebuild for prod' && git push origin gh-pages && git branch -f trunk gh-pages && git checkout master && grunt fastBuild"
alias gmrage="git push && git checkout gh-pages && git rebase master && git push && git checkout master"
alias pathRage="git checkout gh-pages && git merge master --no-edit && git push && git checkout master"

# git
alias ga="git add"
alias go="git checkout"
alias gr="git rebase"
alias gs="git status -sb"
alias gsh="git show --stat=200 | fp"
alias gss="git show --stat=200 "
alias gdh="git diff HEAD"
alias gdhs="git diff HEAD --stat=200 | fp"
alias gat="git commit -a --amend --no-edit"
alias gb='git branch'
alias ab='arc branch --by-status --view-all'
alias grm="git rebase master"
alias grc="git rebase --continue"
alias ftrunk="git branch -f trunk master"

alias cdc="pwd > ~/.dircopy; echo 'Changing dir clipboard to:'; cat ~/.dircopy"
alias cdp="cd \"\$(cat ~/.dircopy)\""

alias wwwmode="echo 'devtunnel' > ~/.devModeOn"
alias otherwwwmode="echo 'otherdev' > ~/.devModeOn"
alias localmode="rm ~/.devModeOn"

# nonessential 
alias macros="cat ~/Dropbox\ \(Facebook\)/Default\ Sync\ Folder/macros.txt"
alias addmacro="~/.addmacro.sh"
alias di="cd ~/Desktop; rm *.png *.mov *.swf *.jpg *.JPG *.JPEG; cd -"

# bridge stuff
alias a="arc build"
alias ad="arc diff"
alias al="arc lint"
alias test="t"
alias ge="grep -E \"exports|provides|class \""
alias gt="grep \"__tests__"\"
alias www="cd ~/www"

# tmux and things
alias ltmux="tmux list-sessions"
alias ttmux="tmux attach-session -t"
alias trmux="tmux rename-session -t"
alias tnmux="tmux new-session -t"
alias up="git checkout master; git pull; arc build"
alias gfind='git svn find-rev'
alias swpkill="find . -iname \".*.swp*\" -exec rm '{}' \;"
alias logkill="sudo rm -f /private/var/log/asl/*.asl"
alias odkill="sudo killall opendirectoryd"

# tools
alias h="hphpd -h localhost"
alias hh="hh_client"
alias cstart="cd ~/fbobjc/Libraries/FBReactKit/; ./runServerHere.sh"

# stolen from jingc
alias files="cut -d: -f1 | uniq"
alias seven='git log --oneline --since=7days --author=pcottle'
alias vo="vim -O ./*"
alias sdev="ssh dev"

_git_branches()
{
  local curw
  COMPREPLY=()
  curw=${COMP_WORDS[COMP_CWORD]}
  COMPREPLY=($(compgen -W "`git branch 2> /dev/null | cut -c 3-`" -- "$curw"))
  return 0
}

# Usage: glhf <branch>(HEAD)
# Lists and describes all commits on <branch> ahead of trunk. thanks yungsters
function glhf {
  git log --pretty=format:'%Cred%h%Creset %s %Cgreen(%cr)%Creset' --abbrev-commit --stat=150,150 trunk..$1
}

# Usage: gg
# Lists each branch and its commits ahead of trunk.
if [ -f ~/.git.bash ]; then
  . ~/.git.bash
fi

function f(){ find . -iname "*$@*.*" | grep "$@"; }

ado() {                    
    echo '----------------------------------------------' >> ~/backups/addo.log 
    date >> ~/backups/addo.log 2>&1; 
    echo $1 >> ~/backups/addo.log;  
    arc diff --only | tee -a ~/backups/addo.log;                  
}                                                                

# devserver
if [ -d ~/www ]; then
  cd ~/www
fi

# local
if [ -f ~/.devModeOn ]; then
  echo "Going to dev server if you dont quit"
  sleep 0.5
  ssh $(cat ~/.devModeOn)
fi
PATH=$PATH:~/src/devtools/arcanist/bin
alias sql="/usr/local/Cellar/sqlite/3.8.2/bin/sqlite3"

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"
export VISUAL=vim
