#!/bin/sh

set -e

if [ -n "$NPM_AUTH_TOKEN" ]; then
  echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" > ~/.npmrc
fi

yarn
sh -c "yarn $*"
