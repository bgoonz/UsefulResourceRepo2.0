import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import styles from './AppFooter.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

export const AppFooter = () => (
  <footer className={styles.footer}>
    Copyright © 2016 Springtik, tous droits réservés.
  </footer>
);

export default compose(
  withStyles(styles),
  pure,
)(AppFooter);
