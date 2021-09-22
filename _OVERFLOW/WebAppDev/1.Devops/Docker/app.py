from flask import Flask
import os
import socket


app = Flask(__name__)


@app.route("/")
def hello():
    return "hello-world"


if __name__ == "__main__":
    app.run()
