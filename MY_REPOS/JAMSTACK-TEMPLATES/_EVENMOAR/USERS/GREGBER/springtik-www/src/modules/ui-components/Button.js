import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import styles from './Button.scss';

export const Button = ({
  block,
  lgGroupedRight,
  size,
  smBlock,
  theme,
  ...props,
}) => (
  <button
    className={classNames(styles.button, {
      [styles.block]: block,
      [styles.smBlock]: smBlock,
      [styles.lgGroupedRight]: lgGroupedRight,
      [styles[`${styles.size}Size`]]: size,
      [styles[`${theme}Theme`]]: theme,
    })}
    {...props}
  />
);

Button.propTypes = {
  block: PropTypes.bool,
  lgGroupedRight: PropTypes.bool,
  size: PropTypes.oneOf(['xl']),
  smBlock: PropTypes.bool,
  theme: PropTypes.oneOf(['admin']),
};

export default compose(
  withStyles(styles),
  pure
)(Button);
