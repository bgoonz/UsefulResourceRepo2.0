from flask import Flask, render_template, request
from company import Company

app = Flask(__name__)


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/search", methods=["POST"])
def search():
    name = request.form["name"]
    if name:
        return render_template("company.html", company=Company(name))
    else:
        return "Company not found."


if __name__ == "__main__":
    app.run()
