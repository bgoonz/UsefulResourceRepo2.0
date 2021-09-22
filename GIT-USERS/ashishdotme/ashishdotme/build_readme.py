import feedparser
import httpx
import json
import pathlib
import re
import os

root = pathlib.Path(__file__).parent.resolve()


def replace_chunk(content, marker, chunk, inline=False):
    r = re.compile(
        r"<!\-\- {} starts \-\->.*<!\-\- {} ends \-\->".format(marker, marker),
        re.DOTALL,
    )
    if not inline:
        chunk = "\n{}\n".format(chunk)
    chunk = "<!-- {} starts -->{}<!-- {} ends -->".format(marker, chunk, marker)
    return r.sub(chunk, content)


def replace_chunk_no_space(content, marker, chunk, inline=False):
    r = re.compile(
        r"<!\-\- {} starts \-\->.*<!\-\- {} ends \-\->".format(marker, marker),
        re.DOTALL,
    )
    if not inline:
        chunk = "\n{}\n".format(chunk)
    chunk = "<!-- {} starts -->`{}`<!-- {} ends -->".format(marker, chunk, marker)
    return r.sub(chunk, content)


def fetch_tils():
    sql = "select title, url, created_utc from til order by created_utc desc limit 5"
    return httpx.get(
        "https://til.ashish.me/til.json", params={"sql": sql, "_shape": "array"}
    ).json()


def fetch_repos():
    response = httpx.get(
        "https://api.github.com/users/ashishdotme/repos?sort=created&per_page=10"
    ).json()
    return response


def fetch_movie():
    movie = httpx.get("https://api.ashish.me/movies").json()[0]["title"]
    return movie


def fetch_tv():
    tv = httpx.get("https://api.ashish.me/shows").json()[0]["title"]
    return tv


def fetch_blog_entries():
    entries = feedparser.parse("https://ashish.me/blog/feed.xml")["entries"]
    return [
        {
            "title": entry["title"],
            "url": entry["link"].split("#")[0],
            "published": entry["published"].split("00")[0],
        }
        for entry in entries
    ]


if __name__ == "__main__":
    readme = root / "README.md"
    readme_contents = readme.open().read()

    tils = fetch_tils()
    tils_md = "\n".join(
        [
            "- [{title}]({url}) - {created_at}".format(
                title=til["title"],
                url=til["url"],
                created_at=til["created_utc"].split("T")[0],
            )
            for til in tils
        ]
    )
    rewritten = replace_chunk(readme_contents, "tils", tils_md)

    movie = fetch_movie()
    rewritten = replace_chunk_no_space(rewritten, "movie", movie, True)

    tv = fetch_tv()
    rewritten = replace_chunk_no_space(rewritten, "tv", tv, True)

    repos = fetch_repos()[:7]
    repos_md = "\n".join(
        [
            "- [{title}]({url}) - {published}".format(
                title=repo["name"],
                url=repo["svn_url"],
                published=repo["created_at"].split("T")[0],
            )
            for repo in repos
        ]
    )
    rewritten = replace_chunk(rewritten, "repos", repos_md)

    entries = fetch_blog_entries()[:5]
    entries_md = "\n".join(
        ["- [{title}]({url}) - {published}".format(**entry) for entry in entries]
    )
    rewritten = replace_chunk(rewritten, "blog", entries_md)

    readme.open("w").write(rewritten)
