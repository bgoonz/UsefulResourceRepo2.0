# import flask
from flask import Flask

# initialize an app variable
app = Flask(__name__)

# decorator route traffic from a specific url to the function below
# can be used to trigger different funtions when user visits different part of the application
@app.route("/")
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run()
