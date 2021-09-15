import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivityMain.scss';

export const ActivityMain = ({
  children,
}) => (
  <div className={styles.activityMain}>
    {children}
  </div>
);

ActivityMain.propTypes = {
  children: PropTypes.node,
};

export default withStyles(styles)(ActivityMain);
