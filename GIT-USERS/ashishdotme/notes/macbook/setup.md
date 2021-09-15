---
id: setup
title: Setup
---

#### Show path bar

`defaults write com.apple.finder ShowPathbar -bool true`

#### XCode

`xcode-select --install`

#### Homebrew

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

#### Tools

```
brew tap caskroom/cask
brew install git
brew cask install google-chrome
brew cask install spectacle
brew cask install iterm2
```

#### Git

```
git config --global user.name "Ashish Patel"
git config --global user.email "ashishsushilpatel@gmail.com"
```

#### SHell

zsh

```shell
# Install zsh
brew install zsh zsh-completions

# oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# Change shell
chsh -s /bin/zsh

# Restart iterm
# Install auto suggestions plugin
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestion

# Install poweling font
# Change font to Meslo LG L for powerline
https://github.com/powerline/fonts

# Use following config in zshrc
plugins=(git colored-man colorize github jira vagrant virtualenv pip python brew osx zsh-syntax-highlighting zsh-autosuggestions)
ZSH_THEME="agnoster"
DEFAULT_USER=$(whoami)

```

### Nodejs

```shell
# Install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
# Install latest lts nodeks
nvm install -lts
brew install yarn --without-node
```

### Docker

```shell
brew cask install docker
```

### VS Code

```shell
# Press command + shift + p and click on Shell Command : Install code in PATH
```
