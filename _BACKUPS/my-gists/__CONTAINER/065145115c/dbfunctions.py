import sqlite3

def execute_query(sql_query):
    with sqlite3.connect("todo.db") as conn:
        cur = conn.cursor()
        result = cur.execute(sql_query)
        conn.commit()
    return result


def add_new_task(task):
    sql_query = "INSERT INTO Todo(task, complete) VALUES('%s', %s) " %(task, 0)
    execute_query(sql_query)


def get_complete_tasks():
    sql_query = "SELECT task FROM Todo WHERE complete=%s " %(1)
    complete = execute_query(sql_query)
    return [task[0] for task in complete.fetchall()]


def get_incomplete_tasks():
    sql_query = "SELECT task FROM Todo WHERE complete=%s " %(0)
    incomplete = execute_query(sql_query)
    return [task[0] for task in incomplete.fetchall()]


def mark_task_complete(task):
    sql_query = "UPDATE Todo SET complete=%s WHERE task='%s' and complete=%s" %(1, task, 0)
    execute_query(sql_query)