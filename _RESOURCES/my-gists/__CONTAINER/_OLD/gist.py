"""Download all gists for a specific user in a local directory using git.
Make a directory for a <user> and copy this file there before running.
mkdir <user> 
cd <user> 

python3 get_gists.py user
"""


import sys
import os
import re
import subprocess
import json
from urllib.request import urlopen


comments_url = "https://api.github.com/gists/c0bdc9511c18ebd45d719609d2f71fc8/comments"


def get_json(url):
    return json.load(urlopen(url))


def make_url(user: str) -> str:
    """Make URL for gist *user*."""
    return f"https://api.github.com/users/{user}/gists"


def make_comments_url(gist_id: str) -> str:
    pass


def user_json(user: str) -> dict:
    """Retrieve information about *user* gists."""
    url = make_url(user)
    return get_json(url)


def get_valid_filename(s: str):
    """
    Return the given string converted to a string that can be used for a clean
    filename. Remove leading and trailing spaces; convert other spaces to
    underscores; and remove anything that is not an alphanumeric, dash,
    underscore, or dot.
    >>> get_valid_filename("john's portrait in 2004.jpg")
    'johns_portrait_in_2004.jpg'
    Based on https://github.com/django/django/blob/83b04d4f88dd65ae630a45385de34e275899dc41/django/utils/text.py#L218-L229
    """
    s = str(s).strip().replace(" ", "_")
    return re.sub(r"(?u)[^-\w.]", "", s)


def clone(link: str, folder: str = ""):
    """Call git to clone *link* repo in *folder*."""
    subprocess.call(["git", "clone", link, folder])


def main(user: str):
    items = user_json(user)
    for item in items:
        link = item["git_pull_url"]
        folder = get_valid_filename(item["description"])
        print("Creating", folder)
        clone(link, folder)


def this_folder():
    """Return file's directory."""
    return os.path.dirname(os.path.abspath(__file__))


if __name__ == "__main__":
    user = sys.argv[1]
    folder = this_folder()
    print("User:", user)
    print("Creating gists in folder:", folder)
    main(user)
