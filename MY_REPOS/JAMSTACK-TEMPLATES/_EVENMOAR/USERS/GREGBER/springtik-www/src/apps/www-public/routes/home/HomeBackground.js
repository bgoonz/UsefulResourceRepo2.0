import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './HomeBackground.scss';

export const HomeBackground = () => (
  <div className={styles.background}>
    <div className={styles.image} />
  </div>
);

export default compose(
  withStyles(styles),
  pure,
)(HomeBackground);
