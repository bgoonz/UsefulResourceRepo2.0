from flask import Flask, render_template
from data import Projects

app = Flask(__name__)

projects = Projects()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/projects")
def contact():
    return render_template("projects.html", projects=projects)


if __name__ == "__main__":
    app.run(debug=True)
