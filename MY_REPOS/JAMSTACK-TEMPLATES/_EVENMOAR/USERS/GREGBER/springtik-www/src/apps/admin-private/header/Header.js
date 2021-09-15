import React, {PropTypes, Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import compose from 'recompose/compose';
import connect from '~/modules/observo/connect';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'react-router/lib/Link';
import styles from './header.scss';

export class Header extends Component {
  state = {showNav: false};

  handleUserFocus = () => {
    this.setState({showNav: true});
  };

  handleUserBlur = () => {
    this.setState({showNav: false});
  };

  render() {
    const {me} = this.props;
    const userStyle = me ? {
      backgroundImage: `url(${me.avatar200x200})`,
    } : null;

    return (
      <header className={styles.header}>
        <Link to="/">
          <div className={styles.logo} />
          <div className={styles.admin}>
            admin
          </div>
        </Link>
        <div
          tabIndex={-1}
          className={styles.user}
          onFocus={this.handleUserFocus}
          onBlur={this.handleUserBlur}
          style={userStyle}
        />
        <ReactCSSTransitionGroup
          transitionName="opacity"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}
        >
          {this.state.showNav ? <nav className={styles.nav}>
            <ul>
              <li>
                <a href="/logout">
                  <i className="fa fa-power-off" />Déconnexion
                </a>
              </li>
            </ul>
          </nav> : null}
        </ReactCSSTransitionGroup>
      </header>
    );
  }
}

Header.propTypes = {
  me: PropTypes.shape({
    avatar200x200: PropTypes.string.isRequired,
  }),
};

export default compose(
  withStyles(styles),
  connect(({me$}) => ({
    me: me$,
  }))
)(Header);
