# Hello World in flask
from flask import Flask
<<<<<<< HEAD
app = Flask(__name__)

=======

app = Flask(__name__)


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
@app.route("/")
def hello():
    return "Hello CSEU2!"

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
@app.route("/sum")
def sum():
    return f"2 * 4 = {2 * 4}"

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# take in an argument
@app.route("/api/<argument>")
def run_stuff(argument):
    return f"Some {argument}!"

<<<<<<< HEAD
if __name__ == '__main__':
    app.run()
=======

if __name__ == "__main__":
    app.run()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
