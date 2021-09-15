from flask import render_template, redirect
from app import app
from app.forms.login import LoginForm


@app.route('/')
def index():
    return render_template('page.html', title='Welcome')


@app.route('/help')
def help():
    return render_template('page.html', title='Help')


@app.route('/item/<int:id>')
def item(id):
    if (id > 0 and id < 100):
        item = {
            "id": id,
            "name": f"Fancy Item {id}",
            "description": "Coming soon!",
        }
        return render_template('item.html', item=item)
    else:
        return '<h1>Sample App</h1><h2>Item Not Found</h2>'
