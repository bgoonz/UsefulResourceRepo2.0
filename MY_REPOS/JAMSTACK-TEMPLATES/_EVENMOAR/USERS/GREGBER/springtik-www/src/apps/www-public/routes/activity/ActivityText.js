import React, {PropTypes} from 'react';
import ReactMarkdown from 'react-markdown';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ActivityText.scss';

export const ActivityText = ({
  children,
}) => (
  children ? (
    <ReactMarkdown
      tagName="section"
      className={styles.activityText}
      source={children}
    />
  ) : null
);

ActivityText.propTypes = {
  children: PropTypes.string,
};

export default compose(
  withStyles(styles),
  pure,
)(ActivityText);
