import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivityTitle.scss';

export const ActivityTitle = ({
  children,
}) => (
  <h1 className={styles.activityTitle}>
    {children}
  </h1>
);

ActivityTitle.propTypes = {
  children: PropTypes.node,
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityTitle);
