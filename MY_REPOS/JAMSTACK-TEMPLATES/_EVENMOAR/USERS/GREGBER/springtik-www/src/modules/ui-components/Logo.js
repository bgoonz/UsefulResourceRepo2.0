import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Logo.scss';
import Shield from './Shield';

export const Logo = () => (
  <div className={styles.logo}>
    <Shield />
    <span className={styles.text}>Springtik</span>
  </div>
);

export default compose(
  withStyles(styles),
  pure
)(Logo);
