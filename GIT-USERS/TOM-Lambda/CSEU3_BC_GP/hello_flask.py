# install flask (pip install flask)


# import the flask class
from flask import Flask, jsonify


# set an app name
app = Flask(__name__)

# create a route
@app.route("/")
def my_hello_function():
<<<<<<< HEAD
    my_list = [{"id": 0, "data": "Hello Everyone"}, {"id": 1, "data": "Hello Everyone"}, {"id": 2, "data": "Hello Everyone"}, {"id": 3, "data": "Hello Everyone"}]
    response = {"data": my_list}
    return jsonify(response)

=======
    my_list = [
        {"id": 0, "data": "Hello Everyone"},
        {"id": 1, "data": "Hello Everyone"},
        {"id": 2, "data": "Hello Everyone"},
        {"id": 3, "data": "Hello Everyone"},
    ]
    response = {"data": my_list}
    return jsonify(response)


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
@app.route("/bob")
def my_bob_function():

    return "Hello Bob"


<<<<<<< HEAD

# main entry point
if __name__ == "__main__":
    app.run()
=======
# main entry point
if __name__ == "__main__":
    app.run()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
