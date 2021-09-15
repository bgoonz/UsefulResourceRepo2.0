from flask import Flask
from app.config import Config
from app import routes

app = Flask(__name__)
app.config.from_object(Config)
# print(app.config['SECRET_KEY'])

app.register_blueprint(routes.inventory.bp)

# @app.route('/inventory')
# def inventory():
#     pass


# @app.route('/inventory/item/<int:id>')
# def item(id):
#     if (id > 0 and id < 100):
#         item = {
#             "id": id,
#             "name": f"Fancy Item {id}",
#             "description": "Coming soon!",
#         }
#         return render_template('item.html', item=item)
#     else:
#         return '<h1>Sample App</h1><h2>Item Not Found</h2>'



app.register_blueprint(routes.main.bp)

# @app.route('/')
# def index():
#     return render_template('page.html', title='Welcome')


# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     form = LoginForm()
#     if form.validate_on_submit():
#         return redirect('/')
#     return render_template('login.html', form=form)


# @app.route('/help')
# def help():
#     return render_template('page.html', title='Help')