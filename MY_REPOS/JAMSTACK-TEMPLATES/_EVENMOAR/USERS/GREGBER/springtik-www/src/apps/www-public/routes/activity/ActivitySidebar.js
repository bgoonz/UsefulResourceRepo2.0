import React, {PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivitySidebar.scss';

export const ActivitySidebar = ({
  children,
}) => (
  <div className={styles.activitySidebar}>
    {children}
  </div>
);

ActivitySidebar.propTypes = {
  children: PropTypes.node,
};

export default withStyles(styles)(ActivitySidebar);
