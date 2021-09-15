from datetime import timezone
import git
from pydriller import RepositoryMining
import pathlib
import sqlite_utils


root = pathlib.Path(__file__).parent.resolve()


def created_changed_times(repo_path, ref="master"):
    created_changed_times = {}
    for commit in RepositoryMining(
        "https://github.com/ashishdotme/practice-problems/"
    ).traverse_commits():
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
        title = fp.readline().lstrip("#").strip()
        body = fp.read().strip()
        path = str(filepath.relative_to(root))
        url = "https://github.com/ashishdotme/practice-problems/blob/master/{}".format(
            path
        )
        record = {
            "path": path.replace("/", "_"),
            "topic": path.split("/")[0],
            "title": filepath.name,
            "url": url,
            "body": body,
        }
        record.update(all_times[path])
        table.insert(record)
    if "problems_fts" not in db.table_names():
        table.enable_fts(["title", "body"])


if __name__ == "__main__":
    build_database(root)
