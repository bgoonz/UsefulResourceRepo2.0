from flask import Flask
from app.config import Config
from app import routes

app = Flask(__name__)
app.config.from_object(Config)
# print(app.config['SECRET_KEY'])

app.register_blueprint(routes.inventory.bp)
app.register_blueprint(routes.main.bp)
