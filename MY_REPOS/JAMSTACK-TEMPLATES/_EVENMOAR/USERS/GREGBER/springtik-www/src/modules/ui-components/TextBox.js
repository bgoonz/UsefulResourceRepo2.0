import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import pure from 'recompose/pure';
import classNames from 'classnames';
import styles from './TextBox.scss';

export const TextBox = ({
  bordered,
  block,
  icon,
  lgGroupedLeft,
  size,
  smBlock,
  smSpaced,
  spaced,
  ...props,
}) => (
  <span
    className={classNames(styles.textBox, {
      [styles.block]: block,
      [styles.bordered]: bordered,
      [styles.lgGroupedLeft]: lgGroupedLeft,
      [styles.smBlock]: smBlock,
      [styles.smSpaced]: smSpaced,
      [styles.spaced]: spaced,
      [styles[`${size}Size`]]: size,
      [styles.withIcon]: icon,
    })}
  >
    {icon ? (
      <div className={styles.icon}>
        {icon}
      </div>
    ) : null}
    <input
      className={styles.input}
      {...props}
    />
  </span>
);

TextBox.propTypes = {
  bordered: PropTypes.bool,
  block: PropTypes.bool,
  icon: PropTypes.node,
  lgGroupedLeft: PropTypes.bool,
  size: PropTypes.oneOf(['xl']),
  smBlock: PropTypes.bool,
  smSpaced: PropTypes.bool,
  spaced: PropTypes.bool,
};

export default compose(
  withStyles(styles),
  pure
)(TextBox);
