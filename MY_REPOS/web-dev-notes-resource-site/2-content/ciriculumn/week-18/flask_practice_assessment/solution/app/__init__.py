from flask import Flask, redirect, render_template
from flask_migrate import Migrate
from .config import Configuration
from .models import db, SimplePerson
from .forms import SimpleForm

app = Flask(__name__)
app.config.from_object(Configuration)
db.init_app(app)
Migrate(app, db)


@app.route("/")
def main_page():
    return render_template("main_page.html")


@app.route("/simple-form")
def simple_form():
    form = SimpleForm()
    return render_template("simple_form.html", form=form)


@app.route("/simple-form", methods=["POST"])
def simple_data():
    form = SimpleForm()
    if form.validate_on_submit():
        data = SimplePerson()
        form.populate_obj(data)
        db.session.add(data)
        db.session.commit()
        return redirect("/")
    print(form.errors)
    return "Bad Data"


@app.route("/simple-form-data")
def simple_form_data():
    result = SimplePerson.query.filter(SimplePerson.name.like("M%")).all()
    return render_template("simple_form_data.html", result=result)
