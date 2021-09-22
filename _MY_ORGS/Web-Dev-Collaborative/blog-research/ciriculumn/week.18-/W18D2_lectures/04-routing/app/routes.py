from app import app


@app.route('/')
def index():
    return '<h1>Sample App</h1><h2>Welcome</h2>'


@app.route('/help')
def help():
    return '<h1>Sample App</h1><h2>Help</h2>'


@app.route('/item/<int:id>')
def item(id):
    if (id > 0 and id < 100):
        return f'<h1>Sample App</h1><h2>Item {id}</h2>'
    else:
        return '<h1>Sample App</h1><h2>Item Not Found</h2>'
