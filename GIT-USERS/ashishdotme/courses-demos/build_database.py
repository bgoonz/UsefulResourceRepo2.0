from datetime import timezone
import string
import git
import pathlib
import sqlite_utils


root = pathlib.Path(__file__).parent.resolve()


def created_changed_times(repo_path, ref="master"):
    created_changed_times = {}
    repo = git.Repo(repo_path, odbt=git.GitDB)
    commits = reversed(list(repo.iter_commits(ref)))
    for commit in commits:
        dt = commit.committed_datetime
        affected_files = list(commit.stats.files.keys())
        for filepath in affected_files:
            if filepath not in created_changed_times:
                created_changed_times[filepath.split("/")[0]] = {
                    "created": dt.isoformat(),
                    "created_utc": dt.astimezone(timezone.utc).isoformat(),
                }
            created_changed_times[filepath.split("/")[0]].update(
                {
                    "updated": dt.isoformat(),
                    "updated_utc": dt.astimezone(timezone.utc).isoformat(),
                }
            )
    return created_changed_times


def build_database(repo_path):
    all_times = created_changed_times(repo_path)
    db = sqlite_utils.Database(repo_path / "courses.db")
    table = db.table("courses", pk="title")
    for directory in root.iterdir():
        if (
            directory.is_dir()
            and directory.name != ".git"
            and directory.name != ".github"
        ):
            url = "https://github.com/ashishdotme/courses-demos/blob/master/{}".format(
                directory.name
            )
            record = {
                "title": string.capwords(directory.name.replace("-", " ")),
                "url": url,
            }
            record.update(all_times[directory.name])
            table.insert(record)
    if "courses_fts" not in db.table_names():
        table.enable_fts(["title"])


if __name__ == "__main__":
    build_database(root)
