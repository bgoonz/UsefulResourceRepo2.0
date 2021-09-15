import React, {PropTypes} from 'react';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './styles/form-group.scss';

const cx = classNames.bind(styles);

export const FormGroup = ({
  className: propClassName,
  children,
}) => {
  const className = cx('form-group', propClassName);
  return (
    <div {...{className}}>
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(styles)(FormGroup);
