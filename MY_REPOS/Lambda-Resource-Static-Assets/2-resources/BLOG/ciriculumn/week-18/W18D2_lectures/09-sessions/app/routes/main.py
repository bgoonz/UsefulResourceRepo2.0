from flask import Blueprint, render_template, redirect, session
from app.forms.login import LoginForm

bp = Blueprint('', __name__)


def track_views():
    if 'views' in session:
        session['views'] = session.get('views') + 1
    else:
        session['views'] = 1


@bp.route('/')
def index():
    track_views()
    return render_template('page.html', title='Welcome')


@bp.route('/views')
def views():
    return f'Total views: {session.get("views")}'


@bp.route('/views/reset')
def reset_views():
    views = session.pop('views', None)
    return f'Reset views (previous {views})'


@bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        return redirect('/')
    return render_template('login.html', form=form)


@bp.route('/help')
def help():
    track_views()
    return render_template('page.html', title='Help')
