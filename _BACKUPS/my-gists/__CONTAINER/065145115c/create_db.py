import sqlite3

sql_query = """
    CREATE TABLE IF NOT EXISTS Todo(
        id INTEGER PRIMARY KEY,
        task TEXT,
        complete boolean
    );
"""

def execute_query(sql_query):
    with sqlite3.connect("todo.db") as conn:
        cur = conn.cursor()
        result = cur.execute(sql_query)
        conn.commit()
    return result

if __name__ == '__main__':
    execute_query(sql_query)