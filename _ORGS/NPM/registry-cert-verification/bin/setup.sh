#! /bin/bash

declare -a arr=(\
  "http://nodejs.org/dist/npm/npm-1.1.58.tgz"\
  "http://nodejs.org/dist/npm/npm-1.1.62.tgz"\
  "http://nodejs.org/dist/npm/npm-1.3.24.tgz"\
  "http://nodejs.org/dist/npm/npm-1.4.6.tgz"\
  "http://registry.npmjs.org/npm/-/npm-1.4.14.tgz"\
  "http://registry.npmjs.org/npm/-/npm-2.1.18.tgz")

mkdir -p ./npms
cd ./npms
for i in "${arr[@]}"
do
  [[ "$i" =~ .*\/(.*)\.tgz ]]
  x=${BASH_REMATCH[1]}
  echo "$x"
  mkdir "$x"
  cd "$x"
  curl -O "$i" > "$x.tgz"
  tar zxvf "$x.tgz" --strip=1
  cd ..
done
