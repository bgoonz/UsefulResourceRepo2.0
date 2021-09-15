from flask import Flask
from app.config import Config # `app` here relates to the name of the module

# This `app` is not related to `app` from line 2
app = Flask(__name__)
app.config.from_object(Config)
# print(app.config['SECRET_KEY'])


@app.route('/')
def index():
    return '<h1>Sample App</h1>'
