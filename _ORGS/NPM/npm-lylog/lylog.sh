#!/bin/bash

set -e
token=$(cat token.txt)

lylog -t "$token" -e -l 514
