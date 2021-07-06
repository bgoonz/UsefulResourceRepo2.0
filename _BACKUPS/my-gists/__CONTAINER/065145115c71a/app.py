from flask import Flask, render_template, request, redirect, url_for
from dbfunctions import add_new_task, get_complete_tasks, get_incomplete_tasks, mark_task_complete

app = Flask(
        __name__,
        template_folder = 'client/templates'
    )

@app.route('/')
def index():
    complete = get_complete_tasks()
    incomplete = get_incomplete_tasks()
    return render_template('index.html', complete=complete, incomplete=incomplete)

@app.route('/add', methods=["POST"])
def add():
    task = request.form["todoitem"]
    add_new_task(task)
    return redirect(url_for('index'))

@app.route('/complete/<task>')
def complete(task):
    mark_task_complete(task)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)