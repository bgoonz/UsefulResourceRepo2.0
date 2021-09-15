import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivityMapLoader.scss';
import FaSpinner from 'react-icons/lib/fa/spinner';

export const ActivityMapLoader = () => (
  <div className={styles.activityMapLoader}>
    <FaSpinner className={styles.spinner} />
  </div>
);

export default compose(
  withStyles(styles),
  pure,
)(ActivityMapLoader);
