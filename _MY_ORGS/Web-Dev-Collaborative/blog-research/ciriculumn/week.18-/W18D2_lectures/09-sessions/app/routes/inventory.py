from flask import Blueprint, render_template

bp = Blueprint('inventory', __name__, url_prefix='/inventory')


@bp.route('/item/<int:id>')
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
