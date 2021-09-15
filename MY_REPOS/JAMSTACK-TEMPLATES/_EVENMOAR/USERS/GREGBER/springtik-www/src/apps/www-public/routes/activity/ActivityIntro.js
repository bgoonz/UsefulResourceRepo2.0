import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivityIntro.scss';

export const ActivityIntro = ({
  children,
}) => (
  <p className={styles.activityIntro}>
    {children}
  </p>
);

ActivityIntro.propTypes = {
  children: PropTypes.node,
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityIntro);
