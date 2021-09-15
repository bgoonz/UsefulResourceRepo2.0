import requests
import os
import logging
from datetime import datetime
from urllib.parse import urlparse
from github import Github, GithubException
from dotenv import load_dotenv
from tqdm import tqdm
from terminaltables import AsciiTable

load_dotenv()

token = os.getenv("GITHUB_TOKEN")
g = Github(token)

divider_length = 15


def websiteIsOnline(url):
    try:
        r = requests.head(url)
        return r.status_code == 200
    except requests.exceptions.ConnectionError:
        return False


def getRepo(url):
    try:
        return g.get_repo(url)
    except GithubException:
        return False


def isStale(repoDate, referenceDate):
    return repoDate < referenceDate


def validateWebsites(json):
    entries = tqdm(json, desc="Checking websites")
    invalid_entries = []
    for entry in entries:
        title = entry["title"]
        url = entry["meta"]["url"]
        logging.info("Checking %s" % url)
        websiteOnline = websiteIsOnline(url)
        if not websiteOnline:
            o = [title, "offline"]
            invalid_entries.append(o)
            continue
    print("\n")
    if invalid_entries:
        invalid_entries.insert(0, ["Title", "Status"])
        table = AsciiTable(invalid_entries)
        print(table.table)
    print("All websites checked.\n")


def validateRepositories(json, referenceDate):
    entries = tqdm(json, desc="Checking repositories")
    invalid_entries = []
    stale_entries = []
    for entry in entries:
        title = entry["title"]
        repoUrl = entry["meta"]["repoUrl"]
        logging.info("Checking %s" % repoUrl)
        cleanedRepoUrl = urlparse(repoUrl).path.strip("/").replace(".git", "")
        repo = getRepo(cleanedRepoUrl)
        if not repo:
            o = [title, "Offline"]
            invalid_entries.append(o)
            continue
        pushed_at = repo.pushed_at
        stale = isStale(pushed_at, referenceDate)
        if stale:
            o = [title, pushed_at]
            stale_entries.append(o)
            continue
    print("\n")
    if invalid_entries:
        invalid_entries.insert(0, ["Title", "Status"])
        table = AsciiTable(invalid_entries)
        print(table.table)
    if stale_entries:
        print("Stale repositories. Reference date: %s" % referenceDate)
        stale_entries.insert(0, ["Title", "Last pushed_at"])
        table = AsciiTable(stale_entries)
        print(table.table)
    print("All repositories checked.\n")
