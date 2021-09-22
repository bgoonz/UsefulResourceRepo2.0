from datetime import timezone
import httpx
import git
import os
import pathlib
from urllib.parse import urlencode
import sqlite_utils
from pydriller import RepositoryMining
from sqlite_utils.db import NotFoundError
import time


root = pathlib.Path(__file__).parent.resolve()


def created_changed_times(repo_path, ref="master"):
    created_changed_times = {}
    for commit in RepositoryMining("https://github.com/ashishdotme/code.ashish.me/").traverse_commits():
        dt = commit.committer_date
        for modified_file in commit.modifications:
            filepath = modified_file.new_path
            if filepath not in created_changed_times:
                created_changed_times[filepath] = {
                    "created": dt.isoformat(),
                    "created_utc": dt.astimezone(timezone.utc).isoformat(),
                }
            created_changed_times[filepath].update(
                {
                    "updated": dt.isoformat(),
                    "updated_utc": dt.astimezone(timezone.utc).isoformat(),
                }
            )
    return created_changed_times


def build_database(repo_path):
    all_times = created_changed_times(repo_path)
    db = sqlite_utils.Database(repo_path / "problems.db")
    table = db.table("problems", pk="path")
    for filepath in root.glob("*/**/*.js"):
        fp = filepath.open()
        if not ("node_modules" or "docs") in fp.name:
            body = "```js  \n" + fp.read().strip() + "\n```"
            path = str(filepath.relative_to(root))
            url = "https://github.com/ashishdotme/code.ashish.me/blob/master/{}".format(
                path)
            slug = filepath.stem
            title = filepath.stem
            path_slug = path.replace("/", "_")
            try:
                row = table.get(path_slug)
                previous_body = row["body"]
                previous_html = row["html"]
            except (NotFoundError, KeyError):
                previous_body = None
                previous_html = None
            record = {
                "path": path_slug,
                "topic": path.split("/")[0],
                "title": filepath.name,
                "url": url,
                "slug": slug,
                "body": body,
            }
            if (body != previous_body) or not previous_html:
                retries = 0
                response = None
                while retries < 1:
                    headers = {}
                    if os.environ.get("GITHUB_TOKEN"):
                        headers = {
                            "authorization": "Bearer {}".format(os.environ["GITHUB_TOKEN"])
                        }
                    response = httpx.post(
                        "https://api.github.com/markdown",
                        json={
                            # mode=gfm would expand #13 issue links and suchlike
                            "mode": "markdown",
                            "text": body,
                        },
                        headers=headers,
                    )
                    if response.status_code == 200:
                        record["html"] = response.text
                        print("Rendered HTML for {}".format(path))
                        break
                    else:
                        print("  sleeping 60s")
                        time.sleep(60)
                        retries += 1
            record.update(all_times[path])
            with db.conn:
                table.upsert(record, alter=True)
    table.enable_fts(
        ["title", "body"], tokenize="porter", create_triggers=True, replace=True
    )


if __name__ == "__main__":
    build_database(root)
