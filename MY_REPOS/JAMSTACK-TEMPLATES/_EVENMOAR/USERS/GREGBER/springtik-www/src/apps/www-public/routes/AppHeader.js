import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import Link from 'react-router/lib/Link';
import styles from './AppHeader.scss';
import Logo from '~/modules/ui-components/Logo';

export const AppHeader = ({
  background,
}) => (
  <header
    className={classNames(styles.header, {
      [styles.background]: background,
    })}
  >
    <Link to="/">
      <Logo height={30} />
    </Link>
  </header>
);

AppHeader.propTypes = {
  background: PropTypes.bool,
};

export default compose(
  withStyles(styles),
  pure,
)(AppHeader);
