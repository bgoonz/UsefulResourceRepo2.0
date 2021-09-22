#!/bin/bash -l

if [ -d $HOME/setup-checker ]; then
   rm -rf $HOME/setup-checker
fi

mkdir $HOME/setup-checker
git clone -q https://github.com/bgoonz/web-dev-setup-checker.git ~/setup-checker

cd ~/setup-checker
./check.sh
cd -
