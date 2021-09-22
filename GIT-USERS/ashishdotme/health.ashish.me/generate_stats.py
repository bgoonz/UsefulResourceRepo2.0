import pathlib
import string
import sqlite_utils
import sys
import re
import sqlite3

root = pathlib.Path(__file__).parent.resolve()

index_re = re.compile(r"<!\-\- index starts \-\->.*<!\-\- index ends \-\->", re.DOTALL)

if __name__ == "__main__":
    index = ["<!-- index starts -->"]
    try:
        sqliteConnection = sqlite3.connect("ashish.db")
        cursor = sqliteConnection.cursor()
        sqlite_select_query = """SELECT day, sum(stepcount) FROM steps GROUP BY day ORDER BY day desc LIMIT 30"""
        cursor.execute(sqlite_select_query)
        records = cursor.fetchall()
        for row in records:
            index.append(
                "- **{value}** steps - *{date}*".format(date=row[0], value=row[1])
            )
        cursor.close()
    except sqlite3.Error as error:
        print("Failed to read data from sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")
    if index[-1] == "":
        index.pop()
    index.append("<!-- index ends -->")
    if "--rewrite" in sys.argv:
        readme = root / "README.md"
        index_txt = "\n".join(index).strip()
        readme_contents = readme.open().read()
        readme.open("w").write(index_re.sub(index_txt, readme_contents))
    else:
        print("\n".join(index))
