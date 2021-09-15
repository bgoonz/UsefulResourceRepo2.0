#!/usr/bin/env python

import json
import argparse
import logging
from datetime import datetime, timedelta
from utils import validateWebsites, validateRepositories

staleDate = datetime.now() - timedelta(weeks=26)

parser = argparse.ArgumentParser(
    description="A script to check starter & showcase sites on gatsbyjs.com. The input needs to be a JSON file with a specific format. You can check the JSON against the starter OR showcase validation.")
parser.add_argument("select", help="Select whether the 'input' is a list of starter or showcase sites.",
                    choices=["starter", "showcase"])
parser.add_argument("input", help="Your JSON file.")
parser.add_argument("-v", "--verbose",
                    help="Log out the current URL when checking status.", action="store_true")
parser.add_argument(
    "-d", "--date", help="The date that will mark everything older as stale", default=staleDate, type=datetime.fromisoformat)

args = parser.parse_args()

if args.verbose:
    logging.basicConfig(level=logging.INFO)


with open(args.input, encoding='utf-8') as f:
    data = json.load(f)


def validateStarter(input, referenceDate):
    validateRepositories(input, referenceDate)
    validateWebsites(input)


def validateShowcase(input):
    validateWebsites(input)


if args.select == 'starter':
    validateStarter(data, args.date)

if args.select == 'showcase':
    validateShowcase(data)
